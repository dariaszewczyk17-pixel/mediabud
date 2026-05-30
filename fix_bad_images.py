#!/usr/bin/env python3
"""
fix_bad_images.py — Zeruje images dla produktów które dostały fallback asset
image-50b437f254ca09397b817ee05d6c51eea04351b8-1200x1200-webp (bechcicki ID 0196018).
Usuwa je też z img_pipeline_log.json done_ids żeby image_pipeline.py je przetworzyło.
Uruchomienie: nohup python3 fix_bad_images.py > fix_bad.log 2>&1 &
"""
import requests, json, time, os
from datetime import datetime

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT = "nzcwegq7"
BAD_ASSET = "image-50b437f254ca09397b817ee05d6c51eea04351b8-1200x1200-webp"
IMG_LOG = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud/img_pipeline_log.json"

HDRS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

def log(m): print(f"[{datetime.now():%H:%M:%S}] {m}", flush=True)

def get_bad_products(offset, size=200):
    q = f'*[_type=="product" && images[0].asset._ref=="{BAD_ASSET}"]{{_id}}[{offset}...{offset+size}]'
    r = requests.get(
        f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/query/production",
        params={"query": q},
        headers={"Authorization": f"Bearer {TOKEN}"},
        timeout=60)
    r.raise_for_status()
    return r.json()["result"]

def zero_images_batch(ids):
    """Zeruje images dla listy doc IDs w jednym batchu mutacji (max 200)."""
    mutations = [{"patch": {"id": did, "unset": ["images"]}} for did in ids]
    r = requests.post(
        f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/mutate/production",
        headers=HDRS,
        json={"mutations": mutations},
        timeout=60)
    return r.status_code in (200, 201)

# Załaduj istniejący img_pipeline_log
img_log = {"success": 0, "no_id": 0, "stub": 0, "no_img": 0, "fail": 0, "done_ids": []}
if os.path.exists(IMG_LOG):
    with open(IMG_LOG) as f:
        img_log = json.load(f)
    log(f"Pipeline log: {len(img_log['done_ids'])} done_ids")

done_set = set(img_log["done_ids"])
removed_from_done = 0
total_zeroed = 0
offset = 0
PAGE = 200

log(f"Start — zerowanie zdjęć dla produktów z fallback asset {BAD_ASSET[:20]}...")

while True:
    try:
        batch = get_bad_products(offset, PAGE)
    except Exception as e:
        log(f"Błąd pobierania offset={offset}: {e}"); time.sleep(5); continue

    if not batch:
        log(f"Koniec — brak więcej produktów z bad image.")
        break

    ids = [p["_id"] for p in batch]

    # Zeruj images
    ok = zero_images_batch(ids)
    if ok:
        total_zeroed += len(ids)
        log(f"✅ Wyzerowano {len(ids)} produktów (łącznie: {total_zeroed})")
    else:
        log(f"❌ Błąd mutacji dla batch offset={offset}")
        time.sleep(5)
        continue

    # Usuń z done_ids pipeline żeby zostały ponownie przetworzone
    for did in ids:
        if did in done_set:
            done_set.discard(did)
            removed_from_done += 1

    offset += PAGE
    if len(batch) < PAGE:
        break
    time.sleep(1)

# Zapisz poprawiony img_pipeline_log (bez bad IDs)
img_log["done_ids"] = list(done_set)
img_log["success"] = max(0, img_log["success"] - total_zeroed)
with open(IMG_LOG, 'w') as f:
    json.dump(img_log, f)

log(f"=== GOTOWE === Wyzerowano: {total_zeroed}, Usunieto z done_ids: {removed_from_done}")
log(f"Pipeline log zaktualizowany — {len(done_set)} done_ids pozostało")
log(f"image_pipeline.py (jeśli działa) powinien teraz pobrać {total_zeroed} produktów ponownie")
