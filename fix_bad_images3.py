#!/usr/bin/env python3
"""
fix_bad_images3.py — czyści 2015 produktów ze złym zdjęciem (rozcieńczalnik)
i re-uploaduje prawidłowe zdjęcia z bechcicki.pl z WERYFIKACJĄ nazwy.

Root cause: image_pipeline.py brał ids[0] bez sprawdzenia czy wynik pasuje.
Ten skrypt dodaje overlap-check zanim uploaduje.

Uruchomienie: python3 fix_bad_images3.py > fix_bad3.log 2>&1 &
"""
import requests, re, json, time, os
from urllib.parse import quote
from datetime import datetime

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT = "nzcwegq7"
BASE = f"https://{PROJECT}.api.sanity.io/v2024-01-01"
LOG_FILE = "fix_bad3_log.json"
BLACKLIST = {"0196018"}
# Znany zły asset — rozcieńczalnik DOFLEX
BAD_ASSET = "image-64aeb66968a6ba126888f09a972ada28c2b0b53a-1200x1200-webp"

S_HDRS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
B_HDRS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124",
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

def get_bad_products(offset=0, size=200):
    q = (f'*[_type=="product" && images[0].asset._ref=="{BAD_ASSET}"]'
         f'[{offset}...{offset+size}]'
         f'{{_id, name, ean, manufacturerIndex, '
         f'"brand": coalesce(brand->name, brand)}}')
    r = requests.get(f"{BASE}/data/query/production",
                     params={"query": q},
                     headers={"Authorization": f"Bearer {TOKEN}"}, timeout=60)
    r.raise_for_status()
    return r.json()["result"]

def build_query(name: str, brand: str, ean=None, mfr=None) -> str:
    """Buduje precyzyjne zapytanie do bechcicki.pl"""
    # Użyj EAN jeśli dostępny
    if ean and str(ean).strip():
        return str(ean).strip()[:20]
    # Użyj indeksu producenta
    if mfr and str(mfr).strip() and len(str(mfr).strip()) > 3:
        return str(mfr).strip()[:30]
    # Fallback: brand + słowa kluczowe z nazwy
    words = name.split()
    meaningful = [w for w in words if len(w) > 2 and not re.match(r'^\d+[\.,]?\d*$', w)]
    bs = brand.split()[0] if brand else ""
    if bs and bs.lower() not in [t.lower() for t in meaningful[:2]]:
        parts = [bs] + meaningful[:4]
    else:
        parts = meaningful[:4]
    return " ".join(parts)[:55]

def overlap(a: str, b: str) -> float:
    """Overlap tokenów (ignoruje liczby i krótkie słowa)"""
    def tokens(s):
        return set(w for w in re.findall(r'[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]+', s.lower())
                   if len(w) > 1)
    at, bt = tokens(a), tokens(b)
    if not at or not bt:
        return 0.0
    sh = min(at, bt, key=len)
    lo = max(at, bt, key=len)
    return len(sh & lo) / len(sh)

def search_bechcicki(q_str: str):
    """Szuka na bechcicki.pl, zwraca listę (pid, name)"""
    url = f"https://www.bechcicki.pl/search?q={quote(q_str)}&page=1&rows=10&sortCriteria=SCORE_DESC"
    try:
        r = requests.get(url, headers=B_HDRS, timeout=20)
        if r.status_code != 200: return []
        html = r.text
        pids = list(dict.fromkeys(re.findall(r'id-p-(\d{7,})', html)))
        results = []
        for pid in pids:
            if pid in BLACKLIST: continue
            idx = html.find(f"-id-p-{pid}")
            if idx < 0: continue
            before = html[max(0, idx-160):idx]
            sm = re.search(r'([a-z0-9][a-z0-9\-]{4,200})$', before)
            if not sm: continue
            name = sm.group(1).replace('-', ' ').title()
            results.append((pid, name))
        return results[:8]
    except:
        return []

def download_img(pid: str):
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

def upload_asset(data: bytes, fname: str):
    r = requests.post(f"{BASE}/assets/images/production",
                      headers={"Authorization": f"Bearer {TOKEN}"},
                      data=data, params={"filename": fname}, timeout=45)
    if r.status_code in (200, 201):
        return r.json().get("document", {}).get("_id")
    return None

def clear_image(doc_id: str) -> bool:
    """Czyści złe zdjęcie"""
    m = {"mutations": [{"patch": {"id": doc_id, "unset": ["images"]}}]}
    r = requests.post(f"{BASE}/data/mutate/production",
                      headers=S_HDRS, json=m, timeout=20)
    return r.status_code in (200, 201)

def patch_image(doc_id: str, asset_id: str) -> bool:
    m = {"mutations": [{"patch": {"id": doc_id, "set": {
        "images": [{"_type": "image", "_key": asset_id[-8:],
                    "asset": {"_type": "reference", "_ref": asset_id}}]
    }}}]}
    r = requests.post(f"{BASE}/data/mutate/production",
                      headers=S_HDRS, json=m, timeout=20)
    return r.status_code in (200, 201)

# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
stats = json.load(open(LOG_FILE)) if os.path.exists(LOG_FILE) else {
    "fixed": 0, "cleared_only": 0, "no_match": 0, "low_score": 0,
    "fail": 0, "done_ids": []
}
done_set = set(stats["done_ids"])

log(f"Start fix_bad3 | done={len(done_set)} fixed={stats['fixed']}")

offset = 0
while True:
    try:
        batch = get_bad_products(offset)
    except Exception as e:
        log(f"GROQ err: {e}"); time.sleep(5); continue

    if not batch:
        log("Brak kolejnych złych produktów — koniec.")
        break

    for p in batch:
        doc_id = p["_id"]
        if doc_id in done_set:
            continue

        name  = str(p.get("name") or "").strip()
        brand_raw = p.get("brand") or ""
        brand = str(brand_raw).strip() if not isinstance(brand_raw, dict) else ""
        ean   = p.get("ean")
        mfr   = p.get("manufacturerIndex")

        # Zawsze najpierw wyczyść złe zdjęcie
        clear_image(doc_id)

        if not name or len(name) < 4:
            stats["cleared_only"] += 1
            done_set.add(doc_id)
            time.sleep(0.2)
            continue

        q_str = build_query(name, brand, ean, mfr)
        if len(q_str) < 3:
            stats["cleared_only"] += 1
            done_set.add(doc_id)
            continue

        results = search_bechcicki(q_str)

        if not results:
            # Próba z samą nazwą (bez brand)
            results = search_bechcicki(" ".join(name.split()[:4]))

        if not results:
            stats["no_match"] += 1
            done_set.add(doc_id)
            log(f"  ❌ no_match: {name[:55]}")
            time.sleep(0.3)
            continue

        # Weryfikacja: sprawdź overlap każdego wyniku z nazwą produktu
        best_pid, best_name, best_score = None, None, 0.0
        for pid, res_name in results[:5]:
            sc = overlap(name, res_name)
            if sc > best_score:
                best_score, best_pid, best_name = sc, pid, res_name

        # Minimalny próg weryfikacji (niższy niż seo_names bo nazwy mogą być polskie vs title-case)
        MIN_SCORE = 0.30
        if best_score < MIN_SCORE:
            stats["low_score"] += 1
            done_set.add(doc_id)
            log(f"  ⚠️  low [{best_score:.0%}] '{name[:40]}' → '{best_name[:40] if best_name else '?'}'")
            time.sleep(0.2)
            continue

        img = download_img(best_pid)
        if not img:
            stats["cleared_only"] += 1
            done_set.add(doc_id)
            log(f"  ⚠️  no_img: {name[:55]}")
            time.sleep(0.3)
            continue

        # Sprawdź czy to nie jest znów ten sam zły asset
        aid = upload_asset(img, f"{slugify_safe(name)}.webp")
        if not aid or aid == BAD_ASSET.replace("image-","").split("-")[0]:
            stats["cleared_only"] += 1
            done_set.add(doc_id)
            time.sleep(0.5)
            continue

        ok = patch_image(doc_id, aid)
        if ok:
            stats["fixed"] += 1
            log(f"  ✅ [{best_score:.0%}] {name[:55]}")
        else:
            stats["fail"] += 1

        done_set.add(doc_id)

        # Zapisz co 50 produktów
        if len(done_set) % 50 == 0:
            stats["done_ids"] = list(done_set)
            with open(LOG_FILE, 'w') as f: json.dump(stats, f)
            log(f"  → checkpoint: fixed={stats['fixed']} cleared={stats['cleared_only']} "
                f"no_match={stats['no_match']} low={stats['low_score']} done={len(done_set)}")

        time.sleep(0.5)

    offset += 200
    if len(batch) < 200:
        break
    time.sleep(1)

stats["done_ids"] = list(done_set)
with open(LOG_FILE, 'w') as f: json.dump(stats, f)
log(f"=== GOTOWE === fixed={stats['fixed']} cleared={stats['cleared_only']} "
    f"no_match={stats['no_match']} low_score={stats['low_score']} fail={stats['fail']}")
