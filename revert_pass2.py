#!/usr/bin/env python3
"""
revert_pass2.py
Drugie przejście: wykrywa uszkodzenia INNEGO rodzaju niż pass1.
Pass1 wykrywał: interior holes (czarne pixele ODŁĄCZONE od granicy).
Pass2 wykrywa: deep border intrusion - czarne pixele POŁĄCZONE z granicą,
                ale wchodzące głęboko w środek obrazu (jak bloczek H+H).

Metryka: border_connected_black_pixels w strefie wewnętrznej (20%-80% obrazu)
         / total_pixels > DEEP_THRESHOLD → uszkodzony → revert
"""

import json, time, io, threading, requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image
import numpy as np
from scipy import ndimage

TOKEN       = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT_ID  = "nzcwegq7"
DATASET     = "production"
WS          = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud"

REVERT_LOG  = f"{WS}/revert_log.json"
JSONL_FILE  = f"{WS}/reimport_scraped.jsonl"
RESULT_LOG  = f"{WS}/revert_log_pass2.json"

DEEP_THRESHOLD = 0.04   # 4% pikseli wewnętrznych = wżeranie
THUMB_SIZE     = 128
WORKERS        = 12
BLACK_THRESH   = 40
INNER_MARGIN   = 0.20   # strefa wewnętrzna: 20%-80% od krawędzi

SANITY_UPLOAD = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/{DATASET}"
SANITY_API    = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/data"
HEADERS       = {"Authorization": f"Bearer {TOKEN}"}
UA            = {"User-Agent": "Mozilla/5.0 Chrome/120 Safari/537.36"}

lock     = threading.Lock()
counters = {"checked": 0, "damaged": 0, "reverted": 0, "errors": 0, "ok": 0}
results  = []

def log(msg):
    print(f"[{time.strftime('%H:%M:%S')}] {msg}", flush=True)

def id_to_sku(prod_id):
    s = prod_id.replace("product-p","").replace("product-","")
    if s and s[0].isdigit():
        return f"P-{s.upper()}"
    return s.upper()

def deep_intrusion_ratio(sanity_url):
    thumb = sanity_url + f"?w={THUMB_SIZE}&h={THUMB_SIZE}&fit=max&auto=format"
    r = requests.get(thumb, timeout=15, headers=HEADERS)
    r.raise_for_status()
    img = Image.open(io.BytesIO(r.content)).convert("RGB")
    arr = np.array(img)
    h, w = arr.shape[:2]

    is_black = np.all(arr < BLACK_THRESH, axis=2)

    # Border-connected black pixels
    struct = ndimage.generate_binary_structure(2, 2)
    labeled, _ = ndimage.label(is_black, structure=struct)
    border_labels = set()
    border_labels.update(labeled[0,:].tolist())
    border_labels.update(labeled[-1,:].tolist())
    border_labels.update(labeled[:,0].tolist())
    border_labels.update(labeled[:,-1].tolist())
    border_labels.discard(0)

    border_black = np.zeros_like(is_black)
    for lbl in border_labels:
        border_black[labeled == lbl] = True

    # Strefa wewnętrzna
    iy0, iy1 = int(h * INNER_MARGIN), int(h * (1 - INNER_MARGIN))
    ix0, ix1 = int(w * INNER_MARGIN), int(w * (1 - INNER_MARGIN))
    inner_mask = np.zeros_like(is_black)
    inner_mask[iy0:iy1, ix0:ix1] = True

    deep_pixels = (border_black & inner_mask).sum()
    ratio = float(deep_pixels) / (h * w)
    return ratio

def upload_to_sanity(img_bytes, filename):
    ext = filename.split(".")[-1].lower()
    ct = {"webp":"image/webp","jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png"}.get(ext,"image/jpeg")
    r = requests.post(SANITY_UPLOAD, headers={**HEADERS,"Content-Type":ct},
                      params={"filename":filename}, data=img_bytes, timeout=60)
    if r.status_code in (200,201):
        return r.json()["document"]["_id"]
    return None

def patch_product(prod_id, asset_id):
    mut = {"mutations":[{"patch":{"id":prod_id,"set":{
        "images":[{"_type":"image","asset":{"_type":"reference","_ref":asset_id}}]}}}]}
    r = requests.post(f"{SANITY_API}/mutate/{DATASET}",
                      headers={**HEADERS,"Content-Type":"application/json"},
                      json=mut, timeout=30)
    return r.status_code in (200,201)

def process_one(entry, bech_map):
    prod_id = entry["_id"]
    cdn_url  = entry["url"]
    try:
        ratio = deep_intrusion_ratio(cdn_url)
        damaged = ratio > DEEP_THRESHOLD
        with lock:
            counters["checked"] += 1
            if damaged: counters["damaged"] += 1
            else: counters["ok"] += 1

        if not damaged:
            return {"_id": prod_id, "status": "ok", "ratio": round(ratio,5)}

        sku = id_to_sku(prod_id)
        bd  = bech_map.get(sku)
        img_bytes = None
        if bd and bd.get("imageUrl"):
            try:
                rr = requests.get(bd["imageUrl"], timeout=20, headers=UA)
                if rr.status_code == 200 and len(rr.content) > 5000:
                    img_bytes = rr.content
            except: pass

        if not img_bytes:
            digits = sku.replace("P-","").zfill(7)
            if digits.isdigit():
                n = digits
                url = f"https://static.www.bechcicki.pl/P-/{n[0:2]}/{n[2:4]}/{n[4:6]}/{n[6]}/1/BIG.webp"
                try:
                    rr = requests.get(url, timeout=20, headers=UA)
                    if rr.status_code == 200 and len(rr.content) > 5000:
                        img_bytes = rr.content
                except: pass

        if not img_bytes:
            with lock: counters["errors"] += 1
            return {"_id": prod_id, "status": "no_original", "ratio": round(ratio,5)}

        asset_id = upload_to_sanity(img_bytes, f"{sku.lower()}_orig.webp")
        if not asset_id:
            with lock: counters["errors"] += 1
            return {"_id": prod_id, "status": "upload_failed", "ratio": round(ratio,5)}

        ok = patch_product(prod_id, asset_id)
        if ok:
            with lock: counters["reverted"] += 1
            return {"_id": prod_id, "status": "reverted", "ratio": round(ratio,5), "asset": asset_id}
        else:
            with lock: counters["errors"] += 1
            return {"_id": prod_id, "status": "patch_failed", "ratio": round(ratio,5)}
    except Exception as e:
        with lock: counters["errors"] += 1
        return {"_id": prod_id, "status": f"exception:{str(e)[:80]}", "ratio": -1}

def main():
    t0 = time.time()

    # Załaduj URL-e z updated_products.json (pass1 ok-wpisy nie mają url)
    UPDATED_JSON = f"{WS}/updated_products.json"
    with open(UPDATED_JSON) as f:
        all_updated = json.load(f)
    url_map = {e["_id"]: e["url"] for e in all_updated}

    # Tylko produkty oznaczone jako "ok" z pass1 — dołącz URL
    with open(REVERT_LOG) as f:
        pass1 = json.load(f)
    ok_items = []
    for e in pass1:
        if e["status"] == "ok" and e["_id"] in url_map:
            ok_items.append({**e, "url": url_map[e["_id"]]})
    log(f"Produkty 'ok' z pass1 do ponownego sprawdzenia: {len(ok_items)}")

    # Mapa SKU → bechcicki.pl data
    bech_map = {}
    with open(JSONL_FILE) as f:
        for line in f:
            try:
                d = json.loads(line)
                if d.get("sku"): bech_map[d["sku"]] = d
            except: pass
    log(f"JSONL: {len(bech_map)} produktów")
    log(f"Próg deep_intrusion: {DEEP_THRESHOLD*100:.0f}% pikseli wewnętrznych")

    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        futures = {ex.submit(process_one, e, bech_map): e for e in ok_items}
        done = 0
        for fut in as_completed(futures):
            res = fut.result()
            with lock:
                results.append(res)
                done += 1
            if done % 500 == 0:
                elapsed = time.time() - t0
                c = counters
                log(f"[{done}/{len(ok_items)}] {done/len(ok_items)*100:.0f}% | "
                    f"✅ok={c['ok']} ⚠️damaged={c['damaged']} "
                    f"↩️reverted={c['reverted']} ❌err={c['errors']} | {elapsed:.0f}s")

    elapsed = time.time() - t0
    log("="*60)
    log(f"ZAKOŃCZONO w {elapsed:.0f}s ({elapsed/60:.1f}min)")
    log(f"  Sprawdzono:  {counters['checked']}")
    log(f"  OK:          {counters['ok']}")
    log(f"  Uszkodzone:  {counters['damaged']}")
    log(f"  Przywrócone: {counters['reverted']}")
    log(f"  Błędy:       {counters['errors']}")
    log("="*60)

    with open(RESULT_LOG,"w") as f:
        json.dump(results, f, indent=2)
    log(f"Log: {RESULT_LOG}")

if __name__ == "__main__":
    main()
