#!/usr/bin/env python3
"""
fix_images.py — czyści błędne zdjęcia i uploaduje prawidłowe
dla produktów naprawionych przez fix_names.py.

Uruchomienie: python3 fix_images.py > fix_images.log 2>&1
"""
import requests, re, json, time, os
from urllib.parse import quote
from datetime import datetime

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT = "nzcwegq7"
BASE = f"https://{PROJECT}.api.sanity.io/v2024-01-01"
LOG_FILE = "fix_images_log.json"
BLACKLIST = {"0196018"}

S_HDRS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
B_HDRS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0) Chrome/124",
          "Accept": "text/html", "Accept-Language": "pl-PL,pl;q=0.9",
          "Referer": "https://www.bechcicki.pl/"}
I_HDRS = {"User-Agent": "Mozilla/5.0", "Referer": "https://www.bechcicki.pl/"}

def log(m): print(f"[{datetime.now():%H:%M:%S}] {m}", flush=True)

def slugify_safe(n):
    s = n.lower()
    for src, dst in [('ą','a'),('ć','c'),('ę','e'),('ł','l'),('ń','n'),
                     ('ó','o'),('ś','s'),('ź','z'),('ż','z')]:
        s = s.replace(src, dst)
    return re.sub(r'[^a-z0-9]', '-', s)[:40]

def get_fixed_products():
    """Pobiera produkty naprawione przez fix_names.py (seoNameFixed=true)."""
    all_prods = []
    offset = 0
    while True:
        q = (f'*[_type=="product" && seoNameFixed==true]'
             f'[{offset}...{offset+200}]'
             f'{{_id, name, "brand": coalesce(brand->name, brand)}}')
        r = requests.get(f"{BASE}/data/query/production",
                         params={"query": q},
                         headers={"Authorization": f"Bearer {TOKEN}"}, timeout=60)
        r.raise_for_status()
        batch = r.json()["result"]
        if not batch:
            break
        all_prods.extend(batch)
        if len(batch) < 200:
            break
        offset += 200
        time.sleep(0.5)
    return all_prods

def search_bechcicki(name: str, brand: str) -> list:
    """Szuka produktu na bechcicki.pl po poprawnej nazwie."""
    words = name.split()
    meaningful = [w for w in words if len(w) > 2 and not re.match(r'^\d+[\.\,]?\d*$', w)]
    bs = brand.split()[0] if brand else ""
    if bs and bs.lower() not in [t.lower() for t in meaningful[:2]]:
        parts = [bs] + meaningful[:4]
    else:
        parts = meaningful[:4]
    q_str = " ".join(parts)[:60]
    if len(q_str) < 4:
        return []

    url = f"https://www.bechcicki.pl/search?q={quote(q_str)}&page=1&rows=10&sortCriteria=SCORE_DESC"
    try:
        r = requests.get(url, headers=B_HDRS, timeout=20)
        if r.status_code != 200:
            return []
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
                          headers={"Authorization": f"Bearer {TOKEN}"},
                          data=data, params={"filename": fname}, timeout=45)
        if r.status_code in (200, 201):
            return r.json().get("document", {}).get("_id")
    except Exception as e:
        log(f"  upload err: {e}")
    return None

def patch_images(doc_id: str, asset_id: str) -> bool:
    """Zastępuje images[] prawidłowym zdjęciem."""
    m = {"mutations": [{"patch": {"id": doc_id, "set": {
        "images": [{"_type": "image", "_key": asset_id[-8:],
                    "asset": {"_type": "reference", "_ref": asset_id}}],
        "seoNameFixed": None  # kasujemy flagę po naprawieniu obrazu
    }}}]}
    try:
        r = requests.post(f"{BASE}/data/mutate/production",
                          headers=S_HDRS, json=m, timeout=20)
        return r.status_code in (200, 201)
    except:
        return False

def clear_images(doc_id: str) -> bool:
    """Czyści istniejące złe zdjęcia."""
    m = {"mutations": [{"patch": {"id": doc_id, "unset": ["images"]}}]}
    try:
        r = requests.post(f"{BASE}/data/mutate/production",
                          headers=S_HDRS, json=m, timeout=20)
        return r.status_code in (200, 201)
    except:
        return False

# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
stats = json.load(open(LOG_FILE)) if os.path.exists(LOG_FILE) else {
    "fixed": 0, "no_id": 0, "no_img": 0, "fail": 0, "done_ids": []
}
done_set = set(stats["done_ids"])

log("Pobieranie produktów z seoNameFixed=true...")
products = get_fixed_products()
log(f"Znaleziono {len(products)} produktów do naprawienia zdjęć.")

for prod in products:
    doc_id = prod["_id"]
    if doc_id in done_set:
        continue

    name = str(prod.get("name") or "").strip()
    brand_raw = prod.get("brand") or ""
    brand = str(brand_raw).strip() if not isinstance(brand_raw, dict) else ""

    ids = search_bechcicki(name, brand) if brand else []
    if not ids:
        ids = search_bechcicki(name, "")

    if not ids:
        stats["no_id"] += 1
        done_set.add(doc_id)
        log(f"  ❌ no_id: {name[:55]}")
        time.sleep(0.3)
        continue

    img = download_img(ids[0])
    if not img:
        stats["no_img"] += 1
        done_set.add(doc_id)
        log(f"  ⚠️  no_img: {name[:55]}")
        time.sleep(0.3)
        continue

    aid = upload_asset(img, f"{slugify_safe(name)}.webp")
    if not aid:
        stats["fail"] += 1
        done_set.add(doc_id)
        log(f"  ⚠️  upload fail: {name[:55]}")
        time.sleep(0.5)
        continue

    ok = patch_images(doc_id, aid)
    if ok:
        stats["fixed"] += 1
        log(f"  ✅ {name[:65]}")
    else:
        stats["fail"] += 1
        log(f"  ⚠️  patch fail: {doc_id}")

    done_set.add(doc_id)
    stats["done_ids"] = list(done_set)
    time.sleep(0.7)

    if stats["fixed"] % 20 == 0:
        with open(LOG_FILE, 'w') as f:
            json.dump(stats, f)

stats["done_ids"] = list(done_set)
with open(LOG_FILE, 'w') as f:
    json.dump(stats, f)

log(f"=== GOTOWE === fixed={stats['fixed']} no_id={stats['no_id']} "
    f"no_img={stats['no_img']} fail={stats['fail']}")
