#!/usr/bin/env python3
"""
fix_mismatch_products.py
Pipeline: SKU (P-XXXXXXX) → bechcicki.pl scrape → Sanity patch
  • Poprawia nazwę, parametry techniczne, opis (z JSON-LD + tabeli atrybutów)
  • Pobiera zdjęcie BIG.webp → usuwa białe tło (numpy mask) → czarne tło 1200×1200 → upload Sanity

Użycie:
  python3 fix_mismatch_products.py              # wszystkie z dim_mismatches.json
  python3 fix_mismatch_products.py P-0006426    # test jednego produktu
  python3 fix_mismatch_products.py --dry        # dry run (bez zapisu do Sanity)
"""
import sys, os, re, json, time, io, requests
import numpy as np
from bs4 import BeautifulSoup
from PIL import Image

TOKEN     = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
SAN_BASE  = "https://nzcwegq7.api.sanity.io/v2021-06-07/data"
SAN_HDR   = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
WEB_HDR   = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0"}
BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
LOG_FILE  = os.path.join(BASE_DIR, "fix_mismatch_log.json")
IMG_SIZE  = (1200, 1200)
IMG_PAD   = 80          # px margines dookoła produktu
WHITE_THR = 218         # próg RGB do uznania piksela za tło (≥218 → przezroczysty)

# ── Sanity helpers ─────────────────────────────────────────────────────────────

def san_query(q):
    r = requests.get(f"{SAN_BASE}/query/production",
                     params={"query": q}, headers=SAN_HDR, timeout=30)
    r.raise_for_status()
    return r.json().get("result", [])

def san_mutate(mutations):
    r = requests.post(f"{SAN_BASE}/mutate/production",
                      json={"mutations": mutations}, headers=SAN_HDR, timeout=30)
    r.raise_for_status()
    return r.json()

# ── bechcicki.pl scraper ───────────────────────────────────────────────────────

def scrape_bechcicki(pid_num: str) -> dict:
    """
    pid_num = cyfry z SKU, np. '0006426'
    Bechcicki.pl przekierowuje automatycznie do pełnego URL produktu.
    Zwraca: name, description, ean, brand, attrs (dict), img_url, final_url
    """
    url = f"https://www.bechcicki.pl/{pid_num}-id-p-{pid_num}"
    try:
        r = requests.get(url, headers=WEB_HDR, timeout=25, allow_redirects=True)
    except Exception as e:
        return {"error": str(e)}
    if r.status_code != 200:
        return {"error": f"HTTP {r.status_code}"}

    soup = BeautifulSoup(r.text, "html.parser")

    # 1. Nazwa (h1)
    h1 = soup.find("h1")
    name = h1.get_text(strip=True) if h1 else None

    # 2. JSON-LD schema.org Product
    ld = {}
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            d = json.loads(script.string or "")
            if isinstance(d, list):
                for item in d:
                    if isinstance(item, dict) and item.get("@type") == "Product":
                        d = item; break
            if isinstance(d, dict) and d.get("@type") == "Product":
                ld = d; break
        except Exception:
            pass

    # 3. Tabela atrybutów (parametry techniczne)
    attrs = {}
    for row in soup.find_all("tr"):
        cells = row.find_all(["td", "th"])
        if len(cells) >= 2:
            k = cells[0].get_text(strip=True).rstrip(":")
            v = cells[1].get_text(strip=True)
            if k and v and len(k) < 80 and len(v) < 200:
                attrs[k] = v

    # 4. URL zdjęcia BIG.webp (jedyna dostępna wersja)
    img_url = None
    for img in soup.find_all("img"):
        src = img.get("src", "")
        if "/P-/" in src and "BIG" in src:
            img_url = src.split("?")[0]   # bez query stringa
            break
    if not img_url:
        for img in soup.find_all("img"):
            src = img.get("src", "")
            if "/P-/" in src:
                img_url = src.split("?")[0]; break

    brand_raw = ld.get("brand", {})
    brand = (brand_raw.get("name") if isinstance(brand_raw, dict)
             else str(brand_raw) if brand_raw else None)

    return {
        "name":        name,
        "description": ld.get("description", ""),
        "ean":         ld.get("gtin13") or ld.get("gtin") or ld.get("gtin8"),
        "brand":       brand,
        "attrs":       attrs,
        "img_url":     img_url,
        "final_url":   r.url,
    }

# ── Pipeline zdjęcia: białe tło → czarne 1200×1200 ────────────────────────────

def make_black_bg_image(img_url: str) -> bytes | None:
    """
    Pobiera BIG.webp z bechcicki.pl.
    Usuwa białe tło (numpy mask: piksele RGB≥WHITE_THR → alpha=0).
    Kompozytuje na czarnym tle 1200×1200.
    Zwraca bytes JPEG lub None przy błędzie.
    """
    try:
        r = requests.get(img_url, headers=WEB_HDR, timeout=20)
        if r.status_code != 200:
            return None

        img = Image.open(io.BytesIO(r.content)).convert("RGBA")
        arr = np.array(img, dtype=np.uint8).copy()

        # Usuń piksele białego tła (alpha>0 i wszystkie kanały RGB ≥ próg)
        white_mask = (
            (arr[:, :, 3] > 0) &
            (arr[:, :, 0] >= WHITE_THR) &
            (arr[:, :, 1] >= WHITE_THR) &
            (arr[:, :, 2] >= WHITE_THR)
        )
        arr[white_mask, 3] = 0
        fg = Image.fromarray(arr, "RGBA")

        product_pixels = int((arr[:, :, 3] > 0).sum())
        if product_pixels < 100:
            return None   # obraz nie zawiera produktu

        # Kompozyt na czarnym tle
        canvas = Image.new("RGB", IMG_SIZE, (0, 0, 0))
        max_w = IMG_SIZE[0] - IMG_PAD * 2
        max_h = IMG_SIZE[1] - IMG_PAD * 2
        ratio = fg.width / fg.height
        if ratio >= 1:
            nw, nh = max_w, max(1, int(max_w / ratio))
        else:
            nh, nw = max_h, max(1, int(max_h * ratio))
        fg_r = fg.resize((nw, nh), Image.LANCZOS)
        x = (IMG_SIZE[0] - nw) // 2
        y = (IMG_SIZE[1] - nh) // 2
        canvas.paste(fg_r, (x, y), fg_r.split()[3])

        buf = io.BytesIO()
        canvas.save(buf, format="JPEG", quality=92)
        return buf.getvalue()

    except Exception as e:
        print(f"    [img ERR] {e}", flush=True)
        return None

def upload_jpg(data: bytes) -> str | None:
    """Wgrywa JPEG do Sanity Assets. Zwraca asset._id lub None."""
    try:
        resp = requests.post(
            f"https://nzcwegq7.api.sanity.io/v2021-06-07/assets/images/production",
            headers={"Authorization": f"Bearer {TOKEN}",
                     "Content-Type": "image/jpeg"},
            data=data, timeout=60
        )
        return resp.json().get("document", {}).get("_id")
    except Exception as e:
        print(f"    [upload ERR] {e}", flush=True)
        return None

# ── Przetwarzanie jednego produktu ────────────────────────────────────────────

def process_one(pid: str, san: dict, dry_run: bool = False) -> dict:
    sku = san.get("sku", "")
    if not sku or not sku.startswith("P-"):
        return {"_id": pid, "status": "skip_no_sku", "sku": sku}

    pid_num = sku[2:]

    data = scrape_bechcicki(pid_num)
    if "error" in data:
        return {"_id": pid, "status": "error", "error": data["error"]}
    if not data.get("name"):
        return {"_id": pid, "status": "no_name", "url": data.get("final_url")}

    patches = {}

    # Nazwa (poprawna z bechcicki.pl)
    if data["name"] and data["name"] != san.get("name"):
        patches["name"] = data["name"]

    # Opis krótki
    if data.get("description"):
        patches["shortDescription"] = data["description"][:500]

    # Parametry techniczne
    if data.get("attrs"):
        ts = [
            {"_key": re.sub(r"[^a-z0-9]", "_", k.lower())[:40],
             "label": k, "value": v}
            for k, v in list(data["attrs"].items())[:20]
        ]
        if ts:
            patches["technicalSpec"] = ts

    # Zdjęcie: czarne tło 1200×1200
    cur_asset = (san.get("mainImage") or {}).get("asset", {}).get("_ref", "")
    if data.get("img_url"):
        print(f"img...", end=" ", flush=True)
        jpg = make_black_bg_image(data["img_url"])
        if jpg:
            if not dry_run:
                asset_id = upload_jpg(jpg)
                if asset_id:
                    patches["mainImage"] = {
                        "_type": "image",
                        "asset": {"_type": "reference", "_ref": asset_id}
                    }
                    print(f"✓{len(jpg)//1024}KB ", end="", flush=True)
            else:
                print(f"DRY-img({len(jpg)//1024}KB) ", end="", flush=True)

    if not patches:
        return {"_id": pid, "status": "no_changes", "name": data["name"]}

    if dry_run:
        return {"_id": pid, "status": "dry_run", "name": data["name"],
                "patches": list(patches.keys())}

    result = san_mutate([{"patch": {"id": pid, "set": patches}}])
    if result.get("results"):
        return {"_id": pid, "status": "updated", "name": data["name"],
                "patches": list(patches.keys())}
    else:
        return {"_id": pid, "status": "mutate_error", "result": str(result)[:200]}

# ── Główna pętla ───────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    dry_run    = "--dry" in args
    single_sku = next((a for a in args if a.startswith("P-")), None)

    # Wczytaj listę mismatch produktów
    with open(os.path.join(BASE_DIR, "dim_mismatches.json")) as f:
        mismatches = json.load(f)

    ids = [m["_id"] for m in mismatches]

    # Pobierz dane Sanity hurtowo
    products = san_query(
        f'*[_id in {json.dumps(ids)}]{{_id,name,ean,sku,"asset":mainImage.asset._ref}}'
    )
    san_map = {p["_id"]: p for p in products}

    # Filtr dla single SKU (test)
    if single_sku:
        mismatches = [m for m in mismatches
                      if san_map.get(m["_id"], {}).get("sku") == single_sku]

    tag = " [DRY]" if dry_run else ""
    print(f"\n{'='*55}")
    print(f"Produkty do naprawy: {len(mismatches)}{tag}")
    print(f"Sanity records:      {len(san_map)}")
    print(f"{'='*55}\n", flush=True)

    log = []
    for i, m in enumerate(mismatches):
        pid = m["_id"]
        san = san_map.get(pid, {"_id": pid})
        sku = san.get("sku", "?")
        print(f"[{i+1:02}/{len(mismatches)}] {sku} ({pid[-8:]}) → ",
              end="", flush=True)
        entry = process_one(pid, san, dry_run=dry_run)
        status = entry.get("status", "?")
        name   = entry.get("name", "")[:45]
        patches = entry.get("patches", [])
        if   status == "updated":    print(f"✅ {patches} | {name}")
        elif status == "no_changes": print(f"= (bez zmian) {name}")
        elif status == "dry_run":    print(f"DRY {patches} | {name}")
        elif status == "error":      print(f"❌ ERR: {entry.get('error','')}")
        elif status == "skip_no_sku":print(f"⏭  brak SKU")
        else:                        print(f"⚠  {status}")
        log.append(entry)
        time.sleep(0.8)

    # Zapisz log
    with open(LOG_FILE, "w") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    updated  = sum(1 for l in log if l["status"] == "updated")
    errors   = sum(1 for l in log if "error" in l.get("status",""))
    skipped  = len(log) - updated - errors

    print(f"\n{'='*55}")
    print(f"✅ Zaktualizowano:  {updated}")
    print(f"❌ Błędy:           {errors}")
    print(f"⏭  Pominięto:       {skipped}")
    print(f"📄 Log: {LOG_FILE}")
    print(f"{'='*55}")

if __name__ == "__main__":
    main()
