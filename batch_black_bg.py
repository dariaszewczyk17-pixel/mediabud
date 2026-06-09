#!/usr/bin/env python3
"""
batch_black_bg.py
Reprocess WSZYSTKICH produktów w Sanity:
  - Pobiera aktualne images[0] z Sanity CDN
  - Wykrywa białe tło (białe/jasne piksele > 60% obrazu)
  - Jeśli białe → usuwa tło (numpy mask) → czarne 1200×1200 → re-upload → update
  - Produkty z P-* SKU: najpierw próbuje bechcicki.pl BIG.webp (lepsza jakość)

Użycie:
  python3 batch_black_bg.py              # wszystkie produkty
  python3 batch_black_bg.py --ids "id1,id2"  # konkretne ID
  python3 batch_black_bg.py --limit 100  # pierwsze N produktów (test)
"""
import sys, os, re, json, time, io, requests
import numpy as np
from PIL import Image

TOKEN     = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
SAN_BASE  = "https://nzcwegq7.api.sanity.io/v2021-06-07/data"
SAN_HDR   = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
GET_HDR   = {"Authorization": f"Bearer {TOKEN}"}
WEB_HDR   = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0"}
BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
LOG_FILE  = os.path.join(BASE_DIR, "batch_black_bg_log.json")

IMG_SIZE  = (1200, 1200)
IMG_PAD   = 80
WHITE_THR = 218        # RGB ≥ tego → traktuj jako tło
WHITE_PCT = 0.55       # > 55% jasnych pikseli → obraz ma białe tło

PAGE_SIZE = 200        # produkty na stronę GROQ

# ── helpers ───────────────────────────────────────────────────────────────────

def sq(q):
    r = requests.get(f"{SAN_BASE}/query/production",
                     params={"query": q}, headers=GET_HDR, timeout=30)
    r.raise_for_status()
    return r.json().get("result", [])

def sm(muts):
    r = requests.post(f"{SAN_BASE}/mutate/production",
                      json={"mutations": muts}, headers=SAN_HDR, timeout=30)
    r.raise_for_status()
    return r.json()

# ── Pobieranie obrazu ──────────────────────────────────────────────────────────

def fetch_image(url: str) -> bytes | None:
    try:
        r = requests.get(url, headers=WEB_HDR, timeout=20)
        return r.content if r.status_code == 200 else None
    except Exception:
        return None

def fetch_bechcicki_image(sku: str) -> bytes | None:
    """Pobiera BIG.webp z bechcicki.pl używając SKU P-XXXXXXX."""
    if not sku or not sku.startswith("P-"):
        return None
    pid = sku[2:]
    url = f"https://www.bechcicki.pl/{pid}-id-p-{pid}"
    try:
        r = requests.get(url, headers=WEB_HDR, timeout=20, allow_redirects=True)
        if r.status_code != 200:
            return None
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(r.text, "html.parser")
        for img in soup.find_all("img"):
            src = img.get("src", "")
            if "/P-/" in src and "BIG" in src:
                return fetch_image(src.split("?")[0])
        for img in soup.find_all("img"):
            src = img.get("src", "")
            if "/P-/" in src:
                return fetch_image(src.split("?")[0])
    except Exception:
        pass
    return None

# ── Wykrywanie białego tła ─────────────────────────────────────────────────────

def has_white_bg(raw: bytes) -> bool:
    """
    Zwraca True jeśli obraz ma białe / bardzo jasne tło.
    Sprawdza środkowy pierścień pikseli (krawędzie obrazu = tło).
    """
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        arr = np.array(img, dtype=np.uint8)
        h, w = arr.shape[:2]

        # Piksele krawędziowe (tło)
        edge_size = max(5, h // 20)
        edge_pixels = np.concatenate([
            arr[:edge_size, :, :3].reshape(-1, 3),
            arr[-edge_size:, :, :3].reshape(-1, 3),
            arr[:, :edge_size, :3].reshape(-1, 3),
            arr[:, -edge_size:, :3].reshape(-1, 3),
        ])
        white_count = (
            (edge_pixels[:, 0] >= WHITE_THR) &
            (edge_pixels[:, 1] >= WHITE_THR) &
            (edge_pixels[:, 2] >= WHITE_THR)
        ).sum()
        return white_count / len(edge_pixels) > WHITE_PCT
    except Exception:
        return False

# ── Pipeline: usuń tło → czarne 1200×1200 ────────────────────────────────────

def make_black_bg(raw: bytes) -> bytes | None:
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        arr = np.array(img, dtype=np.uint8).copy()

        # Maska białego tła: piksele rgb ≥ WHITE_THR → alpha=0
        mask = (
            (arr[:, :, 3] > 0) &
            (arr[:, :, 0] >= WHITE_THR) &
            (arr[:, :, 1] >= WHITE_THR) &
            (arr[:, :, 2] >= WHITE_THR)
        )
        arr[mask, 3] = 0
        fg = Image.fromarray(arr, "RGBA")

        if (arr[:, :, 3] > 0).sum() < 200:
            return None   # prawie nic nie zostało

        canvas = Image.new("RGB", IMG_SIZE, (0, 0, 0))
        mw, mh = IMG_SIZE[0] - IMG_PAD*2, IMG_SIZE[1] - IMG_PAD*2
        ratio = fg.width / fg.height
        nw = mw if ratio >= 1 else max(1, int(mh * ratio))
        nh = max(1, int(nw / ratio)) if ratio >= 1 else mh
        fg_r = fg.resize((nw, nh), Image.LANCZOS)
        x = (IMG_SIZE[0] - nw) // 2
        y = (IMG_SIZE[1] - nh) // 2
        canvas.paste(fg_r, (x, y), fg_r.split()[3])

        buf = io.BytesIO()
        canvas.save(buf, format="JPEG", quality=92)
        return buf.getvalue()
    except Exception as e:
        print(f"    [bg ERR] {e}", flush=True)
        return None

def upload_jpg(data: bytes) -> str | None:
    try:
        resp = requests.post(
            f"https://nzcwegq7.api.sanity.io/v2021-06-07/assets/images/production",
            headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "image/jpeg"},
            data=data, timeout=60)
        return resp.json().get("document", {}).get("_id")
    except Exception:
        return None

# ── Przetwarzanie jednego produktu ────────────────────────────────────────────

def process_product(pid: str, img_url: str, sku: str) -> str:
    """Zwraca status: 'updated' | 'skip_no_white' | 'skip_no_img' | 'error_*'"""
    # Próbuj bechcicki.pl dla P-* SKU (lepsza jakość niż Sanity CDN)
    raw = None
    source = "cdn"
    if sku and sku.startswith("P-"):
        raw = fetch_bechcicki_image(sku)
        if raw:
            source = "bechcicki"

    if not raw:
        raw = fetch_image(img_url)
    if not raw:
        return "skip_no_img"

    if not has_white_bg(raw):
        return "skip_no_white"

    jpg = make_black_bg(raw)
    if not jpg:
        return "error_bg"

    asset_id = upload_jpg(jpg)
    if not asset_id:
        return "error_upload"

    key = asset_id.split("-")[1][:8] if "-" in asset_id else "img0"
    result = sm([{"patch": {"id": pid, "set": {
        "images": [{"_key": key, "_type": "image",
                    "asset": {"_type": "reference", "_ref": asset_id}}],
        "mainImage": {"_type": "image",
                      "asset": {"_type": "reference", "_ref": asset_id}}
    }}}])
    if result.get("results"):
        return f"updated({source},{len(jpg)//1024}KB)"
    return "error_mutate"

# ── Główna pętla ───────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    limit = None
    specific_ids = None

    for i, a in enumerate(args):
        if a == "--limit" and i+1 < len(args):
            limit = int(args[i+1])
        if a == "--ids" and i+1 < len(args):
            specific_ids = args[i+1].split(",")

    if specific_ids:
        products = sq(f'*[_id in {json.dumps(specific_ids)}]'
                      '{_id,sku,"img_url":images[0].asset->url}')
    else:
        # Pobierz wszystkie produkty z images[] (stronami)
        products = []
        offset = 0
        while True:
            batch = sq(f'*[count(images)>0 && !(name match "P-*")]'
                       f'[{offset}...{offset+PAGE_SIZE}]'
                       f'{{_id,sku,"img_url":images[0].asset->url}}')
            if not batch:
                break
            products.extend(batch)
            offset += PAGE_SIZE
            if limit and len(products) >= limit:
                products = products[:limit]
                break
            print(f"  Załadowano: {len(products)}...", flush=True)
            time.sleep(0.1)

    print(f"\n{'='*55}", flush=True)
    print(f"Produkty do sprawdzenia: {len(products)}", flush=True)
    if limit:
        print(f"(limit: {limit})", flush=True)
    print(f"{'='*55}\n", flush=True)

    log = []
    updated = skip_white = skip_img = errors = 0

    for i, p in enumerate(products):
        pid = p["_id"]
        img_url = p.get("img_url", "")
        sku = p.get("sku", "")

        if not img_url:
            log.append({"_id": pid, "status": "skip_no_img_url"})
            skip_img += 1
            continue

        status = process_product(pid, img_url, sku)

        if "updated" in status:   updated += 1
        elif "no_white" in status: skip_white += 1
        elif "no_img" in status:   skip_img += 1
        else:                       errors += 1

        log.append({"_id": pid, "status": status})

        # Postęp co 50
        if (i + 1) % 50 == 0:
            print(f"[{i+1}/{len(products)}] ✅{updated} ⏭{skip_white} ❌{errors}", flush=True)

        time.sleep(0.4)

    with open(LOG_FILE, "w") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    print(f"\n{'='*55}")
    print(f"✅ Zaktualizowano (białe→czarne): {updated}")
    print(f"⏭  Pominięto (już OK):            {skip_white}")
    print(f"⚠  Pominięto (brak img):          {skip_img}")
    print(f"❌ Błędy:                          {errors}")
    print(f"📄 Log: {LOG_FILE}")
    print(f"{'='*55}")

if __name__ == "__main__":
    main()
