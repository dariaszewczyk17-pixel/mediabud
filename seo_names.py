#!/usr/bin/env python3
"""
seo_names.py — Aktualizuje nazwy produktów w Sanity SEO-optymalizowanymi
nazwami z bechcicki.pl. TYLKO gdy dopasowanie jest pewne (product ID
bechcicki = ID z nazwy produktu Sanity lub wysoka zgodność tokeny).
Uruchomienie: python3 seo_names.py > seo_names.log 2>&1 &
"""
import requests, re, json, time, os
from urllib.parse import quote
from datetime import datetime

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT = "nzcwegq7"
LOG_FILE = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud/seo_names_log.json"
BLACKLIST = {"0196018"}

S_HDRS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
B_HDRS = {"User-Agent": "Mozilla/5.0 Chrome/120", "Accept": "text/html",
          "Referer": "https://www.bechcicki.pl/", "Accept-Language": "pl-PL"}

def log(m): print(f"[{datetime.now():%H:%M:%S}] {m}", flush=True)

def sanity_get(groq, offset=0, size=200):
    q = f'{groq}[{offset}...{offset+size}]'
    r = requests.get(
        f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/query/production",
        params={"query": q}, headers={"Authorization": f"Bearer {TOKEN}"}, timeout=60)
    r.raise_for_status()
    return r.json()["result"]

def search_bechcicki(q: str) -> list[dict]:
    """Zwraca [{id, name}] z bechcicki.pl — nazwy z tekstu linku."""
    url = f"https://www.bechcicki.pl/search?q={quote(q[:80])}&page=1&rows=10&sortCriteria=SCORE_DESC"
    try:
        r = requests.get(url, headers=B_HDRS, timeout=20)
        html = r.text
        # Wyciągnij href i anchor text: href="...id-p-XXXXX"...>NAZWA<
        pattern = r'href="([^"]*id-p-(\d{7,}))[^"]*"[^>]*>\s*([^<]{8,100})\s*<'
        matches = re.findall(pattern, html)
        seen = set(); results = []
        for _, pid, name in matches:
            if pid in seen or pid in BLACKLIST: continue
            seen.add(pid)
            results.append({"id": pid, "name": name.strip()})
        return results
    except: return []

def token_overlap(a: str, b: str) -> float:
    """Procent tokenów z nazwy Sanity które są w nazwie bechcicki."""
    a_tok = set(re.findall(r'\w+', a.lower()))
    b_tok = set(re.findall(r'\w+', b.lower()))
    if not a_tok: return 0.0
    return len(a_tok & b_tok) / len(a_tok)

def is_good_match(sanity_name: str, bech_name: str, threshold=0.6) -> bool:
    """Sprawdza czy nazwy są wystarczająco podobne."""
    overlap = token_overlap(sanity_name, bech_name)
    return overlap >= threshold

def patch_name(doc_id: str, new_name: str, new_slug: str) -> bool:
    m = {"mutations": [{"patch": {"id": doc_id, "set": {
        "name": new_name,
        "slug": {"current": new_slug, "_type": "slug"}
    }}}]}
    try:
        r = requests.post(
            f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/mutate/production",
            headers=S_HDRS, json=m, timeout=20)
        return r.status_code in (200, 201)
    except: return False

def make_slug(name: str) -> str:
    s = name.lower()
    s = re.sub(r'[ą]','a',s); s = re.sub(r'[ćč]','c',s)
    s = re.sub(r'[ę]','e',s); s = re.sub(r'[ł]','l',s)
    s = re.sub(r'[ńñ]','n',s); s = re.sub(r'[óö]','o',s)
    s = re.sub(r'[śš]','s',s); s = re.sub(r'[żźž]','z',s)
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s[:80]

def is_stub(name: str) -> bool:
    return bool(re.match(r'^P-\d+$', str(name).strip()))

# Load/init stats
if os.path.exists(LOG_FILE):
    with open(LOG_FILE) as f: stats = json.load(f)
    log(f"Wznawianie: updated={stats['updated']} skipped={stats['skipped']}")
else:
    stats = {"updated": 0, "skipped": 0, "no_match": 0, "done_ids": []}

done_set = set(stats["done_ids"])

log("Start SEO nazw — pobieranie produktów...")
offset = 0; PAGE = 200

while True:
    try:
        # Pobierz produkty bez stub-names
        batch = sanity_get(
            '*[_type=="product" && name != null && name != ""]',
            offset=offset, size=PAGE)
    except Exception as e:
        log(f"Błąd pobierania offset={offset}: {e}"); time.sleep(5); continue

    if not batch: log("Koniec."); break

    for prod in batch:
        doc_id = prod.get("_id","")
        if doc_id in done_set: continue

        name = str(prod.get("name") or "").strip()
        if is_stub(name) or len(name) < 5:
            stats["skipped"] += 1
            stats["done_ids"].append(doc_id); done_set.add(doc_id)
            continue

        brand = prod.get("brand") or ""
        if isinstance(brand, dict): brand = ""

        # Szukaj na bechcicki.pl
        results = search_bechcicki(f"{brand} {name}".strip() if brand else name)
        if not results:
            stats["no_match"] += 1
            stats["done_ids"].append(doc_id); done_set.add(doc_id)
            time.sleep(0.3); continue

        # Sprawdź dopasowanie
        best = None
        for res in results[:3]:
            if is_good_match(name, res["name"], threshold=0.55):
                best = res; break

        if not best:
            stats["skipped"] += 1
            stats["done_ids"].append(doc_id); done_set.add(doc_id)
            time.sleep(0.3); continue

        new_name = best["name"]

        # Nie aktualizuj jeśli zmiana minimalna (< 3 znaki różnicy)
        if len(new_name) - len(name) < 3 and new_name.lower() == name.lower():
            stats["skipped"] += 1
            stats["done_ids"].append(doc_id); done_set.add(doc_id)
            continue

        new_slug = make_slug(new_name)
        ok = patch_name(doc_id, new_name, new_slug)
        if ok:
            stats["updated"] += 1
            log(f'✅ "{name[:45]}" → "{new_name[:55]}"')
        else:
            stats["skipped"] += 1

        stats["done_ids"].append(doc_id); done_set.add(doc_id)
        time.sleep(0.5)

    log(f"offset={offset} | updated={stats['updated']} skipped={stats['skipped']} no_match={stats['no_match']}")
    with open(LOG_FILE, 'w') as f: json.dump(stats, f)
    offset += PAGE
    if len(batch) < PAGE: break
    time.sleep(1)

log(f"=== GOTOWE === updated={stats['updated']} skipped={stats['skipped']}")
