#!/usr/bin/env python3
"""
fix_damaged_v3.py — standalone, odporny na restarty.
Sprawdź postęp: cat fix_damaged_progress.json
Logi: tail -f fix_damaged_run3.log
"""
import json, time, os, io, sys, signal, urllib.request, urllib.parse
from PIL import Image
import numpy as np
import concurrent.futures

WORKDIR = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud"
TOKEN   = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT = "nzcwegq7"; DATASET = "production"
BASE_Q  = f"https://{PROJECT}.api.sanity.io/v2023-08-01/data/query/{DATASET}"
BASE_M  = f"https://{PROJECT}.api.sanity.io/v2023-08-01/data/mutate/{DATASET}"
BASE_A  = f"https://{PROJECT}.api.sanity.io/v2023-08-01/assets/images/{DATASET}"

# Parametry
DAMAGE_THRESH = 0.28
DARK_THRESH   = 40
INNER_MARGIN  = 0.18
THUMB_SIZE    = 128
MAX_WORKERS   = 10     # więcej równoległych połączeń
BATCH         = 100    # większe batche = mniej overhead
SAVE_EVERY    = 1      # zapisuj progress po każdym batchu

LOG_FILE  = f"{WORKDIR}/fix_damaged_log.jsonl"
PROG_FILE = f"{WORKDIR}/fix_damaged_progress.json"

def log_print(msg):
    print(msg, flush=True)

# Graceful shutdown
running = True
def _sig(sig, frame):
    global running
    log_print("\n[SIGNAL] Zatrzymuję po bieżącym batchu...")
    running = False
signal.signal(signal.SIGTERM, _sig)
signal.signal(signal.SIGINT, _sig)

# ── Sanity ────────────────────────────────────────────────────────────────────

def sanity_query(groq):
    url = BASE_Q + "?query=" + urllib.parse.quote(groq)
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {TOKEN}"})
    with urllib.request.urlopen(req, timeout=120) as r:
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
    with urllib.request.urlopen(req, timeout=45) as r:
        return json.loads(r.read())["document"]["_id"]

# ── Analiza ───────────────────────────────────────────────────────────────────

def inner_dark_ratio(img_bytes):
    try:
        img  = Image.open(io.BytesIO(img_bytes)).convert("RGB").resize(
               (THUMB_SIZE, THUMB_SIZE), Image.LANCZOS)
        arr  = np.array(img)
        dark = (arr.max(axis=2) < DARK_THRESH)
        m    = int(THUMB_SIZE * INNER_MARGIN)
        inner = dark[m:THUMB_SIZE-m, m:THUMB_SIZE-m]
        return float(inner.sum()) / inner.size
    except Exception:
        return 0.0

def download_thumb(url):
    try:
        req = urllib.request.Request(
            url + f"?w={THUMB_SIZE}&h={THUMB_SIZE}&fit=fill",
            headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.read()
    except Exception:
        return None

def analyze_one(p):
    data = download_thumb(p.get("imgUrl") or "")
    if data is None:
        return p, 0.0
    return p, inner_dark_ratio(data)

# ── JSONL map ─────────────────────────────────────────────────────────────────

def build_jsonl_map():
    sku_map = {}; id_map = {}
    with open(f"{WORKDIR}/reimport_scraped.jsonl") as f:
        for line in f:
            p = json.loads(line)
            sku = (p.get("sku") or "").strip()
            img = (p.get("imageUrl") or "").strip()
            if not img: continue
            if sku: sku_map[sku.upper()] = img
            if sku.upper().startswith("P-"):
                id_map[f"product-p{sku[2:]}"] = img
    return sku_map, id_map

# ── Progress ──────────────────────────────────────────────────────────────────

def load_prog():
    if os.path.exists(PROG_FILE):
        with open(PROG_FILE) as f:
            return json.load(f)
    return {"checked":0,"damaged":0,"reverted":0,"img_removed":0,"errors":0,"next_idx":0}

def save_prog(prog):
    with open(PROG_FILE, "w") as f:
        json.dump(prog, f)

def append_log(entry):
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")

# ── MAIN ──────────────────────────────────────────────────────────────────────

def main():
    prog = load_prog()
    start = prog.get("next_idx", 0)
    log_print(f"[START v3] next_idx={start} checked={prog['checked']} reverted={prog['reverted']}")

    log_print("[1/3] Budowanie mapy JSONL...")
    sku_map, id_map = build_jsonl_map()
    log_print(f"       {len(sku_map)} SKU, {len(id_map)} ID")

    log_print("[2/3] Pobieranie produktów z Sanity...")
    all_products = sanity_query(
        '*[_type=="product" && defined(images[0])] | order(_id asc) [0...20000]'
        '{ _id, sku, "imgUrl": images[0].asset->url }'
    )
    total = len(all_products)
    products = all_products[start:]
    log_print(f"       {total} łącznie, od {start} → {len(products)} do sprawdzenia")

    t0 = time.time()
    log_print(f"[3/3] Analiza (threshold={DAMAGE_THRESH:.0%}, workers={MAX_WORKERS}, batch={BATCH})...")

    for b in range(0, len(products), BATCH):
        if not running:
            break

        batch    = products[b:b+BATCH]
        abs_idx  = start + b

        # Równoległe pobieranie + analiza
        with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
            results = list(ex.map(analyze_one, batch))

        mut_revert = []; mut_remove = []

        for p, ratio in results:
            prog["checked"] += 1
            if ratio <= DAMAGE_THRESH:
                continue
            prog["damaged"] += 1
            pid = p["_id"]
            sku = (p.get("sku") or "").upper()
            orig_url = id_map.get(pid) or sku_map.get(sku)

            if orig_url:
                try:
                    req = urllib.request.Request(orig_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(req, timeout=20) as r:
                        img_data = r.read()
                    ct  = "image/webp" if orig_url.endswith(".webp") else "image/jpeg"
                    aid = upload_image(img_data, ct)
                    mut_revert.append({"patch": {"id": pid, "set": {"images": [
                        {"_type":"image","_key":"main","asset":{"_type":"reference","_ref":aid}}]}}})
                    append_log({"id": pid, "ratio": round(ratio,3), "status": "reverted"})
                    prog["reverted"] += 1
                except Exception as e:
                    append_log({"id": pid, "ratio": round(ratio,3), "status": "error", "err": str(e)[:100]})
                    prog["errors"] += 1
            else:
                mut_remove.append({"patch": {"id": pid, "set": {"images": []}}})
                append_log({"id": pid, "ratio": round(ratio,3), "status": "removed"})
                prog["img_removed"] += 1

        # Patchuj Sanity
        for mut_list in [mut_revert, mut_remove]:
            for i in range(0, len(mut_list), 50):
                try:
                    sanity_mutate(mut_list[i:i+50])
                except Exception as e:
                    log_print(f"  ⚠️ mutate error: {e}")

        prog["next_idx"] = abs_idx + len(batch)
        save_prog(prog)

        # Raport
        done_pct = (abs_idx + len(batch)) / total * 100
        elapsed  = time.time() - t0
        rate     = prog["checked"] / elapsed * 60 if elapsed > 0 else 0
        eta_min  = (total - abs_idx - len(batch)) / max(rate, 1)
        log_print(
            f"  [{abs_idx+len(batch)}/{total}] {done_pct:.1f}% | "
            f"damaged={prog['damaged']} rev={prog['reverted']} rm={prog['img_removed']} | "
            f"{rate:.0f}/min ETA {eta_min:.0f}min"
        )

    log_print(f"\n{'='*55}")
    log_print(f"✅ Sprawdzono:   {prog['checked']}")
    log_print(f"🔴 Uszkodzone:  {prog['damaged']}")
    log_print(f"✅ Przywrócone: {prog['reverted']}")
    log_print(f"🗑️  Usunięto:    {prog['img_removed']}")
    log_print(f"❌ Błędy:       {prog['errors']}")
    if running:
        log_print("GOTOWE")
    else:
        log_print("ZATRZYMANO — uruchom ponownie aby kontynuować")

if __name__ == "__main__":
    main()
