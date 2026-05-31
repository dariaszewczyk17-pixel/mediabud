#!/usr/bin/env python3
"""
fix_names.py — naprawia ~216 produktów z obciętymi nazwami (bug regex {4,60})
Wzorce błędów: "A Epoksydowa...", "Yta Gipsowo...", "Acja Cementowa...", itp.

Uruchomienie: python3 fix_names.py > fix_names.log 2>&1
"""
import requests, re, json, time, os
from urllib.parse import quote
from datetime import datetime

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT = "nzcwegq7"
BASE = f"https://{PROJECT}.api.sanity.io/v2024-01-01"
LOG_FILE = "fix_names_log.json"
BLACKLIST = {"0196018"}

S_HDRS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
B_HDRS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0) Chrome/124",
          "Accept": "text/html", "Accept-Language": "pl-PL,pl;q=0.9",
          "Referer": "https://www.bechcicki.pl/"}

def log(m): print(f"[{datetime.now():%H:%M:%S}] {m}", flush=True)

def slugify(n):
    s = n.lower()
    for src, dst in [('ą','a'),('ć','c'),('ę','e'),('ł','l'),('ń','n'),
                     ('ó','o'),('ś','s'),('ź','z'),('ż','z')]:
        s = s.replace(src, dst)
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')[:80]

def is_broken(name: str) -> bool:
    """Sprawdza czy nazwa wygląda na obciętą przez bug regex."""
    # Wzorce: jedna/dwie litery (koniec polskiego przymiotnika) + spacja
    broken_starts = re.compile(
        r'^(A |Yta |Acja |Talu |Acja |Dna |Nia |Ta |Na |Ka )', re.IGNORECASE
    )
    return bool(broken_starts.match(name))

def get_broken_products(offset=0, size=200):
    """Pobiera produkty z Sanity gdzie nazwa zaczyna się od podejrzanych wzorców."""
    # Pobieramy szeroki zestaw - filtrujemy w Pythonie
    q = (f'*[_type=="product" && defined(name) && ('
         f'name match "A *" || name match "Yta *" || name match "Acja *" || '
         f'name match "Talu *" || name match "Dna *" || name match "Nia *"'
         f')][{offset}...{offset+size}]'
         f'{{_id, name, slug, "brand": coalesce(brand->name, brand)}}')
    r = requests.get(f"{BASE}/data/query/production",
                     params={"query": q},
                     headers={"Authorization": f"Bearer {TOKEN}"}, timeout=60)
    r.raise_for_status()
    return r.json()["result"]

def search_bechcicki_fixed(name: str, brand: str) -> list:
    """
    Szuka na bechcicki.pl — pomija pierwsze słowo (może być obcięte) i używa
    naprawionego regex {4,200} dla pełnego sluga.
    """
    # Pomiń pierwsze słowo (może być "A", "Yta" itp.) — używaj od 2. słowa
    words = name.split()
    # Bierz tokeny dłuższe niż 2 znaki, nieczysto numeryczne
    meaningful = [w for w in words if len(w) > 2 and not re.match(r'^\d+[\.\,]?\d*$', w)]

    # Zapytanie: brand + pierwsze 4 znaczące słowa
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
        html = r.text
        # NAPRAWIONY regex: {4,200} zamiast {4,60}
        pids = re.findall(r'id-p-(\d{7,})', html)
        seen = set()
        results = []
        for pid in pids:
            if pid in seen or pid in BLACKLIST:
                continue
            seen.add(pid)
            idx = html.find(f"-id-p-{pid}")
            if idx < 0:
                continue
            before = html[max(0, idx-160):idx]  # dłuższy kontekst
            sm = re.search(r'([a-z0-9][a-z0-9\-]{4,200})$', before)  # NAPRAWIONY
            if not sm:
                continue
            new_name = sm.group(1).replace('-', ' ').title()
            results.append({"id": pid, "name": new_name})
        return results[:10]
    except Exception as e:
        log(f"  search err: {e}")
        return []

def overlap(a: str, b: str) -> float:
    at = set(re.findall(r'\w+', a.lower()))
    bt = set(re.findall(r'\w+', b.lower()))
    if not at or not bt:
        return 0.0
    sh, lo = (at, bt) if len(at) <= len(bt) else (bt, at)
    return len(sh & lo) / len(sh)

def patch_product(doc_id, new_name, new_slug):
    m = {"mutations": [{"patch": {"id": doc_id, "set": {
        "name": new_name,
        "slug": {"current": new_slug, "_type": "slug"},
        "seoNameFixed": True,
        "seoNameUpdated": True
    }}}]}
    r = requests.post(f"{BASE}/data/mutate/production",
                      headers=S_HDRS, json=m, timeout=20)
    return r.status_code in (200, 201)

# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
stats = json.load(open(LOG_FILE)) if os.path.exists(LOG_FILE) else {
    "fixed": 0, "no_match": 0, "low_score": 0, "unchanged": 0,
    "done_ids": [], "fixed_ids": []
}
done_set = set(stats["done_ids"])
fixed_ids = list(stats.get("fixed_ids", []))

log(f"Start fix_names | done={len(done_set)} fixed={stats['fixed']}")

offset = 0
while True:
    try:
        batch = get_broken_products(offset)
    except Exception as e:
        log(f"GROQ err: {e}"); time.sleep(5); continue

    if not batch:
        log("Brak kolejnych produktów — koniec.")
        break

    for p in batch:
        doc_id = p["_id"]
        if doc_id in done_set:
            continue

        name = str(p.get("name") or "").strip()
        brand_raw = p.get("brand") or ""
        brand = str(brand_raw).strip() if not isinstance(brand_raw, dict) else ""

        if not is_broken(name):
            stats["unchanged"] += 1
            done_set.add(doc_id)
            continue

        results = search_bechcicki_fixed(name, brand)
        if not results:
            stats["no_match"] += 1
            done_set.add(doc_id)
            log(f"  ❌ no_match: {name[:60]}")
            time.sleep(0.3)
            continue

        best = max(results[:5], key=lambda r: overlap(name, r["name"]), default=None)
        score = overlap(name, best["name"]) if best else 0

        if score < 0.35:
            stats["low_score"] += 1
            done_set.add(doc_id)
            log(f"  ⚠️  low_score {score:.0%}: '{name[:40]}' → '{best['name'][:40] if best else '?'}'")
            time.sleep(0.2)
            continue

        new_name = best["name"]
        new_slug = slugify(new_name)

        if new_name.lower() == name.lower():
            stats["unchanged"] += 1
            done_set.add(doc_id)
            continue

        ok = patch_product(doc_id, new_name, new_slug)
        if ok:
            stats["fixed"] += 1
            fixed_ids.append(doc_id)
            log(f"  ✅ [{score:.0%}] '{name[:40]}' → '{new_name[:55]}'")
        else:
            log(f"  ⚠️  patch fail: {doc_id}")

        done_set.add(doc_id)
        time.sleep(0.45)

    stats["done_ids"] = list(done_set)
    stats["fixed_ids"] = fixed_ids
    log(f"  offset={offset} | fixed={stats['fixed']} no_match={stats['no_match']} "
        f"low_score={stats['low_score']}")
    with open(LOG_FILE, 'w') as f:
        json.dump(stats, f)
    offset += 200
    if len(batch) < 200:
        break
    time.sleep(1)

stats["done_ids"] = list(done_set)
stats["fixed_ids"] = fixed_ids
with open(LOG_FILE, 'w') as f:
    json.dump(stats, f)
log(f"=== GOTOWE === fixed={stats['fixed']} no_match={stats['no_match']} "
    f"low_score={stats['low_score']} unchanged={stats['unchanged']}")
log(f"IDs naprawionych produktów → fix_names_log.json['fixed_ids'] ({len(fixed_ids)} szt.)")
