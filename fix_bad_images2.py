#!/usr/bin/env python3
"""
fix_bad_images2.py — Poprawiona wersja (zawsze offset=0, bo wyzerowane znikają z query).
"""
import requests, json, time, os
from datetime import datetime

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT = "nzcwegq7"
BAD_ASSET = "image-50b437f254ca09397b817ee05d6c51eea04351b8-1200x1200-webp"
IMG_LOG = "img_pipeline_log.json"
HDRS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

def log(m): print(f"[{datetime.now():%H:%M:%S}] {m}", flush=True)

def get_bad_products():
    """Zawsze pierwsze 200 — po wyzerowaniu znikają z query"""
    q = f'*[_type=="product" && images[0].asset._ref=="{BAD_ASSET}"]{{_id}}[0...200]'
    r = requests.get(f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/query/production",
        params={"query": q}, headers={"Authorization": f"Bearer {TOKEN}"}, timeout=60)
    r.raise_for_status()
    return r.json()["result"]

def zero_images_batch(ids):
    mutations = [{"patch": {"id": did, "unset": ["images"]}} for did in ids]
    r = requests.post(f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/mutate/production",
        headers=HDRS, json={"mutations": mutations}, timeout=60)
    return r.status_code in (200, 201)

# Załaduj pipeline log
img_log = {"success": 0, "no_id": 0, "stub": 0, "no_img": 0, "fail": 0, "done_ids": []}
if os.path.exists(IMG_LOG):
    with open(IMG_LOG) as f: img_log = json.load(f)
done_set = set(img_log["done_ids"])

total_zeroed = 0
log("Start fix_bad_images2 — zawsze offset=0...")

while True:
    try:
        batch = get_bad_products()
    except Exception as e:
        log(f"Błąd: {e}"); time.sleep(5); continue

    if not batch:
        log("Koniec — brak produktów z bad image."); break

    ids = [p["_id"] for p in batch]
    ok = zero_images_batch(ids)
    if ok:
        total_zeroed += len(ids)
        log(f"✅ Wyzerowano {len(ids)} (łącznie: {total_zeroed})")
        # Usuń z done_ids pipeline
        for did in ids:
            done_set.discard(did)
    else:
        log(f"❌ Błąd mutacji"); time.sleep(5)
    time.sleep(0.5)

img_log["done_ids"] = list(done_set)
with open(IMG_LOG, 'w') as f: json.dump(img_log, f)
log(f"=== GOTOWE === Wyzerowano łącznie: {total_zeroed}")
