#!/usr/bin/env python3
"""
image_pipeline.py — MediaBud: pobierz zdjęcia z bechcicki.pl i uploaduj do Sanity
Uruchomienie: python3 image_pipeline.py > img_pipeline.log 2>&1 &
"""
import requests, re, json, time, os, sys, traceback
from urllib.parse import quote
from datetime import datetime

SANITY_TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT = "nzcwegq7"
BASE = f"https://{PROJECT}.api.sanity.io/v2024-01-01"
LOG_FILE = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud/img_pipeline_log.json"

S_HDRS = {"Authorization": f"Bearer {SANITY_TOKEN}", "Content-Type": "application/json"}
B_HDRS = {"User-Agent": "Mozilla/5.0 Chrome/120", "Accept": "text/html",
          "Referer": "https://www.bechcicki.pl/", "Accept-Language": "pl-PL"}
I_HDRS = {"User-Agent": "Mozilla/5.0", "Referer": "https://www.bechcicki.pl/"}

BLACKLIST = {"0196018"}

def log(msg):
    print(f"[{datetime.now():%H:%M:%S}] {msg}", flush=True)

def sanity_get(groq):
    r = requests.get(f"{BASE}/data/query/production",
        params={"query": groq}, headers={"Authorization": f"Bearer {SANITY_TOKEN}"}, timeout=60)
    r.raise_for_status()
    return r.json()["result"]

def search_bechcicki(q: str) -> list:
    url = f"https://www.bechcicki.pl/search?q={quote(q[:80])}&page=1&rows=10&sortCriteria=SCORE_DESC"
    try:
        r = requests.get(url, headers=B_HDRS, timeout=20)
        ids = list(dict.fromkeys(re.findall(r'id-p-(\d{7,})', r.text)))
        return [x for x in ids if x not in BLACKLIST]
    except:
        return []

def download_img(pid: str) -> bytes | None:
    parts = []; i = 0
    while i < len(pid):
        parts.append(pid[i:i+2]); i += 2
    url = f"https://static.www.bechcicki.pl/P-/{'/'.join(parts)}/1/BIG.webp"
    try:
        r = requests.get(url, headers=I_HDRS, timeout=15)
        if r.status_code == 200 and len(r.content) > 5000:
            return r.content
    except:
        pass
    return None

def upload_asset(data: bytes, fname: str) -> str | None:
    try:
        r = requests.post(f"{BASE}/assets/images/production",
            headers={"Authorization": f"Bearer {SANITY_TOKEN}"},
            data=data, params={"filename": fname}, timeout=45)
        if r.status_code in (200, 201):
            return r.json().get("document", {}).get("_id")
    except Exception as e:
        log(f"  upload err: {e}")
    return None

def patch_product(doc_id: str, asset_id: str) -> bool:
    m = {"mutations": [{"patch": {"id": doc_id, "set": {"images": [
        {"_type": "image", "_key": asset_id[-8:],
         "asset": {"_type": "reference", "_ref": asset_id}}]}}}]}
    try:
        r = requests.post(f"{BASE}/data/mutate/production",
            headers=S_HDRS, json=m, timeout=20)
        return r.status_code in (200, 201)
    except:
        return False

def is_stub(name: str) -> bool:
    return bool(re.match(r'^P-\d+$', str(name).strip()))

def clean_brand(brand) -> str:
    if not brand or isinstance(brand, dict): return ""
    b = str(brand).strip()
    if len(b) < 3 or re.search(r'\d', b): return ""
    junk = {"akrylowa","niskoprężna","szt","zielony","biały","szary","czarny",
            "grafitowy","universal","folia","biała","różowy","beżowy","pow.klinkierow.",
            "pow.betonowej","czarna","brązowy","srebrny","kremowy"}
    return "" if b.lower() in junk else b

# --- load / init stats ---
if os.path.exists(LOG_FILE):
    with open(LOG_FILE) as f:
        stats = json.load(f)
    log(f"Wznawianie: ✅{stats['success']} stub:{stats['stub']} no_id:{stats['no_id']}")
else:
    stats = {"success": 0, "no_id": 0, "stub": 0, "no_img": 0, "fail": 0, "done_ids": []}

done_set = set(stats["done_ids"])

# --- main loop: paginate all products without images ---
PAGE = 200
offset = 0
total_processed = 0
start = time.time()

log("Start — pobieranie produktów bez zdjęć...")

while True:
    try:
        groq = (f'*[_type=="product"&&(images==null||count(images)==0)]'
                f'[{offset}...{offset+PAGE}]'
                f'{{_id,name,"brand":coalesce(brand->name,brand)}}')
        batch = sanity_get(groq)
    except Exception as e:
        log(f"Błąd pobierania strony offset={offset}: {e}")
        time.sleep(5)
        continue

    if not batch:
        log("Brak kolejnych produktów — koniec.")
        break

    new_in_batch = 0
    for prod in batch:
        try:
            doc_id = prod["_id"]
            if doc_id in done_set:
                continue

            name  = str(prod.get("name") or "").strip()
            brand = clean_brand(prod.get("brand"))

            if is_stub(name):
                stats["stub"] += 1
                stats["done_ids"].append(doc_id); done_set.add(doc_id)
                new_in_batch += 1
                continue

            # Szukaj na bechcicki.pl
            ids = search_bechcicki(f"{brand} {name}".strip()) if brand else []
            if not ids:
                ids = search_bechcicki(name)

            if not ids:
                stats["no_id"] += 1
                stats["done_ids"].append(doc_id); done_set.add(doc_id)
                new_in_batch += 1
                time.sleep(0.3); continue

            img = download_img(ids[0])
            if not img:
                stats["no_img"] += 1
                stats["done_ids"].append(doc_id); done_set.add(doc_id)
                new_in_batch += 1
                time.sleep(0.3); continue

            safe = re.sub(r'[^a-z0-9]', '-', name.lower())[:40]
            aid = upload_asset(img, f"{safe}.webp")
            if not aid:
                stats["fail"] += 1
                stats["done_ids"].append(doc_id); done_set.add(doc_id)
                new_in_batch += 1
                time.sleep(0.5); continue

            if patch_product(doc_id, aid):
                stats["success"] += 1
                log(f"✅ {name[:55]}")
            else:
                stats["fail"] += 1

            stats["done_ids"].append(doc_id); done_set.add(doc_id)
            new_in_batch += 1
            total_processed += 1
            time.sleep(0.7)

        except Exception as e:
            log(f"  ERR prod {prod.get('_id','?')}: {e}")
            traceback.print_exc()
            continue

    elapsed = time.time() - start
    rate = len(done_set) / elapsed * 60 if elapsed > 0 else 0
    log(f"Strona offset={offset}: {new_in_batch} elem | ✅{stats['success']} stub:{stats['stub']} "
        f"no_id:{stats['no_id']} | {rate:.0f}/min")

    # Zapisz po każdej stronie
    with open(LOG_FILE, 'w') as f:
        json.dump(stats, f)

    offset += PAGE
    if len(batch) < PAGE:
        log("Ostatnia strona — koniec.")
        break
    time.sleep(1)

with open(LOG_FILE, 'w') as f:
    json.dump(stats, f)

log(f"=== GOTOWE === ✅{stats['success']} stub:{stats['stub']} no_id:{stats['no_id']} "
    f"no_img:{stats['no_img']} fail:{stats['fail']}")
