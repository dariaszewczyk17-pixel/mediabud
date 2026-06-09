#!/usr/bin/env python3
"""
revert_damaged.py
Wykrywa uszkodzone zdjęcia (artefakty flood-fill) i cofa je do oryginalnych
zdjęć z bechcicki.pl.

Algorytm detekcji:
  1. Pobierz miniaturę 128x128 z Sanity CDN
  2. Znajdź czarne piksele (R,G,B < 40)
  3. Wyznacz connected components czarnych pikseli od granicy obrazu
  4. Czarne piksele NIE połączone z granicą = artefakty wewnętrzne = uszkodzenie
  5. Jeśli > DAMAGE_THRESHOLD (0.5%) obrazu = uszkodzony → revert
"""

import json, time, io, os, sys, requests, threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image
import numpy as np
from scipy import ndimage

# ── config ─────────────────────────────────────────────────────────────────
TOKEN       = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT_ID  = "nzcwegq7"
DATASET     = "production"
WS          = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud"

UPDATED_JSON  = f"{WS}/updated_products.json"
JSONL_FILE    = f"{WS}/reimport_scraped.jsonl"
RESULT_LOG    = f"{WS}/revert_log.json"
STDOUT_LOG    = f"{WS}/revert_stdout.txt"

DAMAGE_THRESHOLD = 0.005   # 0.5% pikseli w artefaktach = uszkodzony
THUMB_SIZE       = 128
WORKERS          = 12
BLACK_THRESH     = 40      # piksel < 40 we wszystkich kanałach = czarny

SANITY_API  = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/data"
SANITY_UPLOAD = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/{DATASET}"
HEADERS     = {"Authorization": f"Bearer {TOKEN}"}
UA          = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) Chrome/120 Safari/537.36"}

lock = threading.Lock()
counters = {"checked": 0, "damaged": 0, "reverted": 0, "errors": 0, "ok": 0}
results  = []

# ── helpers ─────────────────────────────────────────────────────────────────

def log(msg):
    ts = time.strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)

def id_to_sku(prod_id: str) -> str:
    """product-p0000015 → P-0000015"""
    s = prod_id.replace("product-p", "").replace("product-", "")
    # Handle formats like "product-p0000015" or "prod-blah"
    if s and s[0].isdigit():
        return f"P-{s.upper()}"
    return s.upper()

def has_interior_damage(sanity_url: str) -> float:
    """
    Pobierz miniaturę i sprawdź czy są wewnętrzne czarne artefakty.
    Zwraca float = stosunek artefaktów do całego obrazu (0..1).
    """
    thumb_url = sanity_url + f"?w={THUMB_SIZE}&h={THUMB_SIZE}&fit=max&auto=format"
    r = requests.get(thumb_url, timeout=15, headers=HEADERS)
    r.raise_for_status()

    img = Image.open(io.BytesIO(r.content)).convert("RGB")
    arr = np.array(img)

    # Maska czarnych pikseli
    is_black = np.all(arr < BLACK_THRESH, axis=2)
    total_black = is_black.sum()
    if total_black == 0:
        return 0.0

    # Connected components czarnych pikseli
    struct = ndimage.generate_binary_structure(2, 2)  # 8-connectivity
    labeled, _ = ndimage.label(is_black, structure=struct)

    # Etykiety dotykające granicy obrazu
    h, w = labeled.shape
    border_labels = set()
    border_labels.update(labeled[0, :].tolist())
    border_labels.update(labeled[-1, :].tolist())
    border_labels.update(labeled[:, 0].tolist())
    border_labels.update(labeled[:, -1].tolist())
    border_labels.discard(0)

    # Piksele czarne NIE dotykające granicy = artefakty wewnętrzne
    interior_mask = is_black.copy()
    for lbl in border_labels:
        interior_mask[labeled == lbl] = False

    ratio = interior_mask.sum() / (arr.shape[0] * arr.shape[1])
    return float(ratio)


def download_bechcicki_image(sku: str) -> bytes | None:
    """Pobierz oryginalne zdjęcie z bechcicki.pl"""
    # SKU format: P-0000015 → digits: 0000015
    digits = sku.replace("P-", "").replace("ATL-", "").replace("-", "")
    if not digits.isdigit():
        return None
    n = digits.zfill(7)
    url = f"https://static.www.bechcicki.pl/P-/{n[0:2]}/{n[2:4]}/{n[4:6]}/{n[6]}/1/BIG.webp"
    try:
        r = requests.get(url, timeout=20, headers=UA)
        if r.status_code == 200 and len(r.content) > 5000:
            return r.content
    except:
        pass
    return None


def upload_to_sanity(img_bytes: bytes, filename: str) -> str | None:
    """Upload image bytes to Sanity and return asset _id"""
    ext = filename.split(".")[-1].lower()
    ct_map = {"webp": "image/webp", "jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png"}
    ct = ct_map.get(ext, "image/jpeg")
    headers = {**HEADERS, "Content-Type": ct}
    r = requests.post(
        SANITY_UPLOAD,
        headers=headers,
        params={"filename": filename},
        data=img_bytes,
        timeout=60
    )
    if r.status_code in (200, 201):
        return r.json()["document"]["_id"]
    return None


def patch_product_image(prod_id: str, asset_id: str) -> bool:
    """Patch product.images[0] in Sanity"""
    mutation = {
        "mutations": [{
            "patch": {
                "id": prod_id,
                "set": {
                    "images": [{"_type": "image", "asset": {"_type": "reference", "_ref": asset_id}}]
                }
            }
        }]
    }
    r = requests.post(
        f"{SANITY_API}/mutate/{DATASET}",
        headers={**HEADERS, "Content-Type": "application/json"},
        json=mutation,
        timeout=30
    )
    return r.status_code in (200, 201)


def process_one(entry: dict, bech_map: dict) -> dict:
    prod_id = entry["_id"]
    cdn_url  = entry["url"]

    try:
        # 1. Sprawdź damage
        ratio = has_interior_damage(cdn_url)
        is_damaged = ratio > DAMAGE_THRESHOLD

        with lock:
            counters["checked"] += 1
            if is_damaged:
                counters["damaged"] += 1
            else:
                counters["ok"] += 1

        if not is_damaged:
            return {"_id": prod_id, "status": "ok", "ratio": round(ratio, 5)}

        # 2. Pobierz SKU i oryginalne zdjęcie
        sku = id_to_sku(prod_id)
        bd  = bech_map.get(sku) or bech_map.get(sku.upper())
        orig_url = bd["imageUrl"] if bd else None

        img_bytes = None
        if orig_url:
            try:
                r = requests.get(orig_url, timeout=20, headers=UA)
                if r.status_code == 200 and len(r.content) > 5000:
                    img_bytes = r.content
            except:
                pass

        if not img_bytes:
            # Fallback: spróbuj przez sku pattern
            img_bytes = download_bechcicki_image(sku)

        if not img_bytes:
            with lock:
                counters["errors"] += 1
            return {"_id": prod_id, "status": "no_original", "ratio": round(ratio, 5)}

        # 3. Upload do Sanity
        fn = f"{sku.lower()}_orig.webp"
        asset_id = upload_to_sanity(img_bytes, fn)
        if not asset_id:
            with lock:
                counters["errors"] += 1
            return {"_id": prod_id, "status": "upload_failed", "ratio": round(ratio, 5)}

        # 4. Patch produktu
        ok = patch_product_image(prod_id, asset_id)
        if ok:
            with lock:
                counters["reverted"] += 1
            return {"_id": prod_id, "status": "reverted", "ratio": round(ratio, 5), "asset": asset_id}
        else:
            with lock:
                counters["errors"] += 1
            return {"_id": prod_id, "status": "patch_failed", "ratio": round(ratio, 5)}

    except Exception as e:
        with lock:
            counters["errors"] += 1
        return {"_id": prod_id, "status": f"exception:{str(e)[:80]}", "ratio": -1}


# ── main ───────────────────────────────────────────────────────────────────

def main():
    t0 = time.time()

    # Załaduj zaktualizowane produkty
    with open(UPDATED_JSON) as f:
        updated = json.load(f)
    log(f"Załadowano {len(updated)} zaktualizowanych produktów")

    # Załaduj mapę SKU → dane z bechcicki.pl
    bech_map = {}
    with open(JSONL_FILE) as f:
        for line in f:
            try:
                d = json.loads(line)
                if d.get("sku"):
                    bech_map[d["sku"]] = d
            except:
                pass
    log(f"Załadowano {len(bech_map)} produktów z JSONL")

    log(f"Uruchamiam analizę z {WORKERS} wątkami (próg={DAMAGE_THRESHOLD*100:.1f}%)...")

    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        futures = {ex.submit(process_one, e, bech_map): e for e in updated}
        done = 0
        for fut in as_completed(futures):
            res = fut.result()
            with lock:
                results.append(res)
                done += 1
            if done % 200 == 0:
                elapsed = time.time() - t0
                c = counters
                log(f"[{done}/{len(updated)}] "
                    f"{done/len(updated)*100:.0f}% | "
                    f"✅ok={c['ok']} ⚠️damaged={c['damaged']} "
                    f"↩️reverted={c['reverted']} ❌err={c['errors']} "
                    f"| {elapsed:.0f}s")

    elapsed = time.time() - t0
    log("=" * 60)
    log(f"ZAKOŃCZONO w {elapsed:.0f}s ({elapsed/60:.1f}min)")
    log(f"  Sprawdzono:     {counters['checked']}")
    log(f"  OK (brak uszk): {counters['ok']}")
    log(f"  Uszkodzone:     {counters['damaged']}")
    log(f"  Przywrócone:    {counters['reverted']}")
    log(f"  Błędy:          {counters['errors']}")
    log("=" * 60)

    with open(RESULT_LOG, "w") as f:
        json.dump(results, f, indent=2)
    log(f"Log wyników: {RESULT_LOG}")


if __name__ == "__main__":
    main()
