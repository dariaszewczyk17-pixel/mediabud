#!/usr/bin/env python3
"""
Detekcja i naprawa uszkodzonych zdjęć (texture-bleed flood-fill + inne).
Strategia:
  1. Pobierz wszystkie produkty z Sanity z URL zdjęcia
  2. Pobierz 100x100 thumbnail każdego zdjęcia
  3. Jeśli inner_dark_ratio (20-80% strefy) > DAMAGE_THRESH → uszkodzone
  4. Dla uszkodzonego: szukaj oryginału w JSONL → revert
  5. Brak oryginału → usuń zdjęcie (images=[])
"""
import sys, json, time, os, io, urllib.request, urllib.parse
from PIL import Image
import numpy as np
import concurrent.futures

WORKDIR  = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud"
TOKEN    = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT  = "nzcwegq7"
DATASET  = "production"
BASE_Q   = f"https://{PROJECT}.api.sanity.io/v2023-08-01/data/query/{DATASET}"
BASE_M   = f"https://{PROJECT}.api.sanity.io/v2023-08-01/data/mutate/{DATASET}"
BASE_A   = f"https://{PROJECT}.api.sanity.io/v2023-08-01/assets/images/{DATASET}"

DAMAGE_THRESH = 0.28   # inner zone dark ratio > 28% → uszkodzone
DARK_THRESH   = 40     # piksel ciemny jeśli max(R,G,B) < 40
INNER_MARGIN  = 0.18   # strefa wewnętrzna: 18-82% obrazu
THUMB_SIZE    = 128    # rozmiar thumbnail do analizy
MAX_WORKERS   = 8      # równoległe pobierania

LOG_FILE  = f"{WORKDIR}/fix_damaged_log.jsonl"
PROG_FILE = f"{WORKDIR}/fix_damaged_progress.json"

# ── Sanity helpers ────────────────────────────────────────────────────────────

def sanity_query(groq):
    url = BASE_Q + "?query=" + urllib.parse.quote(groq)
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {TOKEN}"})
    with urllib.request.urlopen(req, timeout=90) as r:
        return json.loads(r.read()).get("result", [])

def sanity_mutate(mutations):
    data = json.dumps({"mutations": mutations}).encode()
    req  = urllib.request.Request(BASE_M, data=data, headers={
        "Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

def upload_image(img_bytes, content_type="image/jpeg"):
    req = urllib.request.Request(BASE_A, data=img_bytes, headers={
        "Authorization": f"Bearer {TOKEN}", "Content-Type": content_type})
    with urllib.request.urlopen(req, timeout=40) as r:
        resp = json.loads(r.read())
    return resp["document"]["_id"]

# ── Analiza pikseli ──────────────────────────────────────────────────────────

def inner_dark_ratio(img_bytes):
    """Zwraca ratio ciemnych pikseli w strefie wewnętrznej."""
    try:
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB").resize(
            (THUMB_SIZE, THUMB_SIZE), Image.LANCZOS)
        arr = np.array(img)
        dark = (arr.max(axis=2) < DARK_THRESH)
        m    = int(THUMB_SIZE * INNER_MARGIN)
        inner = dark[m:THUMB_SIZE-m, m:THUMB_SIZE-m]
        return float(inner.sum()) / inner.size
    except Exception:
        return 0.0

def download_thumb(url):
    """Pobierz thumbnail (bez parametrów CDN — analizujemy oryginał)."""
    try:
        thumb_url = url + f"?w={THUMB_SIZE}&h={THUMB_SIZE}&fit=fill"
        req = urllib.request.Request(thumb_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.read()
    except Exception:
        return None

# ── Buduj mapę SKU/ID → imageUrl z JSONL ─────────────────────────────────────

def build_jsonl_map():
    sku_map = {}  # upper(sku) → imageUrl
    id_map  = {}  # "product-pXXXXX" → imageUrl  (jeśli SKU = P-XXXXXXX)
    with open(f"{WORKDIR}/reimport_scraped.jsonl") as f:
        for line in f:
            p   = json.loads(line)
            sku = (p.get("sku") or "").strip()
            img = (p.get("imageUrl") or "").strip()
            if not img:
                continue
            if sku:
                sku_map[sku.upper()] = img
            # bechcicki P-XXXXXXX → product-pXXXXXX
            if sku.upper().startswith("P-"):
                pid = "product-" + sku.lower()   # product-p-0000015 — NIE
                # Właściwy format: product-p0000015 (bez myślnika)
                num = sku[2:]  # "0000015"
                pid = f"product-p{num}"
                id_map[pid] = img
    return sku_map, id_map

# ── Progress ──────────────────────────────────────────────────────────────────

def load_progress():
    if os.path.exists(PROG_FILE):
        with open(PROG_FILE) as f:
            return json.load(f)
    return {"checked": 0, "damaged": 0, "reverted": 0, "img_removed": 0,
            "errors": 0, "next_idx": 0}

def save_progress(prog):
    with open(PROG_FILE, "w") as f:
        json.dump(prog, f)

def append_log(entry):
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")

# ── Główna logika ─────────────────────────────────────────────────────────────

def main():
    prog = load_progress()
    print(f"[START] Progress: checked={prog['checked']}, damaged={prog['damaged']}, next_idx={prog['next_idx']}")

    print("[1/4] Budowanie mapy JSONL...")
    sku_map, id_map = build_jsonl_map()
    print(f"       SKU map: {len(sku_map)}, ID map: {len(id_map)}")

    print("[2/4] Pobieranie listy produktów z Sanity...")
    products = sanity_query(
        '*[_type=="product" && defined(images[0])] | order(_id asc) [0...20000]'
        '{ _id, sku, "imgUrl": images[0].asset->url }'
    )
    total = len(products)
    print(f"       Produktów ze zdjęciem: {total}")

    # Resume
    start = prog["next_idx"]
    if start > 0:
        products = products[start:]
        print(f"[RESUME] od indeksu {start}, zostało {len(products)}")

    # Grupuj po 50 do parallel download
    BATCH = 50

    def analyze_product(p):
        """Pobierz thumbnail i oblicz damage ratio."""
        img_url = p.get("imgUrl") or ""
        if not img_url:
            return p, 0.0, None
        data = download_thumb(img_url)
        if data is None:
            return p, 0.0, None
        ratio = inner_dark_ratio(data)
        return p, ratio, data

    print(f"[3/4] Analiza {len(products)} produktów (threshold={DAMAGE_THRESH:.0%})...")

    for batch_start in range(0, len(products), BATCH):
        batch = products[batch_start:batch_start+BATCH]
        abs_idx = start + batch_start

        with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
            results = list(ex.map(analyze_product, batch))

        damaged_batch = []
        for p, ratio, _ in results:
            prog["checked"] += 1
            if ratio > DAMAGE_THRESH:
                damaged_batch.append((p, ratio))
                prog["damaged"] += 1

        # Napraw uszkodzone
        mutations_revert = []
        mutations_remove = []

        for p, ratio in damaged_batch:
            pid = p["_id"]
            sku = (p.get("sku") or "").strip().upper()

            # Szukaj oryginału
            orig_url = id_map.get(pid) or sku_map.get(sku)

            if orig_url:
                # Revert — pobierz oryginał i wgraj
                try:
                    req = urllib.request.Request(orig_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(req, timeout=20) as r:
                        img_data = r.read()
                    ct = "image/webp" if orig_url.endswith(".webp") else "image/jpeg"
                    asset_id = upload_image(img_data, ct)
                    mutations_revert.append({
                        "patch": {"id": pid, "set": {"images": [
                            {"_type": "image", "_key": "main",
                             "asset": {"_type": "reference", "_ref": asset_id}}
                        ]}}
                    })
                    append_log({"id": pid, "ratio": round(ratio,3), "status": "reverted", "orig": orig_url})
                    prog["reverted"] += 1
                except Exception as e:
                    append_log({"id": pid, "ratio": round(ratio,3), "status": "error", "err": str(e)})
                    prog["errors"] += 1
            else:
                # Brak oryginału → usuń zdjęcie
                mutations_remove.append({"patch": {"id": pid, "set": {"images": []}}})
                append_log({"id": pid, "ratio": round(ratio,3), "status": "img_removed"})
                prog["img_removed"] += 1

        # Patchuj Sanity
        if mutations_revert:
            try:
                sanity_mutate(mutations_revert)
            except Exception as e:
                print(f"  ❌ mutate revert error: {e}")
        if mutations_remove:
            try:
                sanity_mutate(mutations_remove)
            except Exception as e:
                print(f"  ❌ mutate remove error: {e}")

        prog["next_idx"] = abs_idx + len(batch)
        save_progress(prog)

        if batch_start % (BATCH*5) == 0:
            print(f"  [{abs_idx+len(batch)}/{total+start}] checked={prog['checked']} "
                  f"damaged={prog['damaged']} reverted={prog['reverted']} "
                  f"removed={prog['img_removed']}")
        time.sleep(0.2)

    print(f"\n{'='*55}")
    print(f"✅ Sprawdzono:    {prog['checked']}")
    print(f"🔴 Uszkodzone:   {prog['damaged']}")
    print(f"✅ Przywrócone:  {prog['reverted']}")
    print(f"🗑️  Bez zdjęcia:  {prog['img_removed']}")
    print(f"❌ Błędy:        {prog['errors']}")
    print(f"Log: {LOG_FILE}")

if __name__ == "__main__":
    main()
