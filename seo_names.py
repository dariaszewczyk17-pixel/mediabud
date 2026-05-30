#!/usr/bin/env python3
"""
seo_names.py v2 — Aktualizuje nazwy produktów w Sanity SEO-optymalizowanymi
nazwami z bechcicki.pl.
ZMIANY v2:
- Krótsze query do bechcicki (pierwsze 3 słowa + brand skrócony)
- Niższy threshold (0.40)
- Brand z Sanity przez GROQ (coalesce ref->name)
- Lepsza ekstrakcja nazw z HTML (szerszy regex)
Uruchomienie: nohup python3 seo_names.py > seo_names.log 2>&1 &
"""
import requests, re, json, time, os
from urllib.parse import quote
from datetime import datetime

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT = "nzcwegq7"
LOG_FILE = "seo_names_log.json"
BLACKLIST = {"0196018"}

S_HDRS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
B_HDRS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "pl-PL,pl;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.bechcicki.pl/",
}

def log(m): print(f"[{datetime.now():%H:%M:%S}] {m}", flush=True)

def sanity_get(groq, offset=0, size=200):
    q = f'{groq}[{offset}...{offset+size}]'
    r = requests.get(
        f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/query/production",
        params={"query": q}, headers={"Authorization": f"Bearer {TOKEN}"}, timeout=60)
    r.raise_for_status()
    return r.json()["result"]

def search_bechcicki(q: str) -> list[dict]:
    """Zwraca [{id, name}] z bechcicki.pl wyszukiwarki."""
    url = f"https://www.bechcicki.pl/search?q={quote(q[:60])}&page=1&rows=10&sortCriteria=SCORE_DESC"
    try:
        r = requests.get(url, headers=B_HDRS, timeout=25)
        if r.status_code != 200:
            return []
        html = r.text

        # Pattern 1: href z id-p-XXXXXXX
        p1 = r'href="[^"]*?id-p-(\d{7,})[^"]*"[^>]*>\s*([^<]{8,120})\s*<'
        # Pattern 2: data-product-id lub data-id
        p2 = r'data-(?:product-)?id="(\d{7,})"[^>]*>([^<]{8,120})<'
        # Pattern 3: link do produktu /id-p-XXXXXXX z tekstem
        p3 = r'/id-p-(\d{7,})(?:/[^"]*)?"\s*(?:[^>]*)>\s*([A-ZŁŚŹĆĄÓĘŻ][^<]{7,119})\s*<'

        seen = set(); results = []
        for pattern in [p1, p2, p3]:
            for pid, name in re.findall(pattern, html):
                name = re.sub(r'\s+', ' ', name).strip()
                if pid in seen or pid in BLACKLIST: continue
                if len(name) < 8: continue
                seen.add(pid)
                results.append({"id": pid, "name": name})
        return results[:10]
    except Exception as e:
        return []

def build_query(name: str, brand: str) -> str:
    """Buduje krótkie, efektywne query do bechcicki."""
    # Usuń kody produktów (np. weber.therm -> weber therm)
    clean_name = re.sub(r'[._/]', ' ', name)
    # Wyodrębnij znaczące tokeny (3-4 pierwsze słowa)
    tokens = [w for w in clean_name.split() if len(w) > 2 and not re.match(r'^\d+$', w)]

    # Skróć brand do 1 słowa jeśli wieloczłonowy
    brand_short = brand.split()[0] if brand else ""

    # Zbuduj query: brand + 3 pierwsze tokeny (max 50 znaków)
    parts = []
    if brand_short and brand_short.lower() not in [t.lower() for t in tokens[:2]]:
        parts.append(brand_short)
    parts.extend(tokens[:3])

    q = " ".join(parts)[:50]
    return q if len(q) >= 5 else " ".join(tokens[:4])[:50]

def token_overlap(a: str, b: str) -> float:
    """Procent tokenów z krótszej nazwy które są w dłuższej."""
    a_tok = set(re.findall(r'\w+', a.lower()))
    b_tok = set(re.findall(r'\w+', b.lower()))
    if not a_tok or not b_tok: return 0.0
    shorter = a_tok if len(a_tok) <= len(b_tok) else b_tok
    longer  = b_tok if len(a_tok) <= len(b_tok) else a_tok
    return len(shorter & longer) / len(shorter)

def is_good_match(sanity_name: str, bech_name: str, threshold=0.40) -> bool:
    return token_overlap(sanity_name, bech_name) >= threshold

def patch_name(doc_id: str, new_name: str, new_slug: str) -> bool:
    m = {"mutations": [{"patch": {"id": doc_id, "set": {
        "name": new_name,
        "slug": {"current": new_slug, "_type": "slug"},
        "seoNameUpdated": True,
    }}}]}
    try:
        r = requests.post(
            f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/mutate/production",
            headers=S_HDRS, json=m, timeout=20)
        return r.status_code in (200, 201)
    except: return False

def make_slug(name: str) -> str:
    s = name.lower()
    for src, dst in [('ą','a'),('ć','c'),('ę','e'),('ł','l'),('ń','n'),('ó','o'),('ś','s'),('ź','z'),('ż','z'),('Ą','a'),('Ć','c'),('Ę','e'),('Ł','l'),('Ń','n'),('Ó','o'),('Ś','s'),('Ź','z'),('Ż','z')]:
        s = s.replace(src, dst)
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s[:80]

def is_stub(name: str) -> bool:
    return bool(re.match(r'^P-\d+$', str(name).strip()))

# ─── Load / init stats ───────────────────────────────────────────
if os.path.exists(LOG_FILE):
    with open(LOG_FILE) as f: stats = json.load(f)
    log(f"Wznawianie v2: updated={stats['updated']} skipped={stats['skipped']} no_match={stats['no_match']}")
else:
    stats = {"updated": 0, "skipped": 0, "no_match": 0, "done_ids": []}

done_set = set(stats["done_ids"])
log(f"Already done: {len(done_set)} produktów")

# ─── Main loop ───────────────────────────────────────────────────
log("Start SEO nazw v2 — pobieranie produktów z brand (coalesce)...")
offset = 0
PAGE = 200

while True:
    try:
        # Pobierz z brand przez coalesce (obsługa ref i string)
        batch = sanity_get(
            '*[_type=="product" && name != null && name != ""]{_id, name, brand}',
            offset=offset, size=PAGE)
    except Exception as e:
        log(f"Błąd pobierania offset={offset}: {e}"); time.sleep(5); continue

    if not batch: log("Koniec pętli."); break

    for prod in batch:
        doc_id = prod.get("_id","")
        if doc_id in done_set: continue

        name = str(prod.get("name") or "").strip()
        if is_stub(name) or len(name) < 5:
            stats["skipped"] += 1
            stats["done_ids"].append(doc_id); done_set.add(doc_id)
            continue

        brand_raw = prod.get("brand") or ""
        brand = str(brand_raw).strip() if not isinstance(brand_raw, dict) else ""

        # Zbuduj krótkie query
        q = build_query(name, brand)
        if len(q) < 4:
            stats["skipped"] += 1
            stats["done_ids"].append(doc_id); done_set.add(doc_id)
            continue

        results = search_bechcicki(q)
        if not results:
            stats["no_match"] += 1
            stats["done_ids"].append(doc_id); done_set.add(doc_id)
            time.sleep(0.4); continue

        # Znajdź najlepsze dopasowanie
        best = None; best_score = 0.0
        for res in results[:5]:
            score = token_overlap(name, res["name"])
            if score > best_score:
                best_score = score; best = res

        if not best or best_score < 0.40:
            stats["skipped"] += 1
            stats["done_ids"].append(doc_id); done_set.add(doc_id)
            time.sleep(0.3); continue

        new_name = best["name"]

        # Pomijaj jeśli zmiana jest minimalna
        if new_name.lower().strip() == name.lower().strip():
            stats["skipped"] += 1
            stats["done_ids"].append(doc_id); done_set.add(doc_id)
            continue

        new_slug = make_slug(new_name)
        ok = patch_name(doc_id, new_name, new_slug)
        if ok:
            stats["updated"] += 1
            log(f'✅ [{best_score:.0%}] "{name[:40]}" → "{new_name[:55]}"')
        else:
            log(f'❌ Patch error: {doc_id}')
            stats["skipped"] += 1

        stats["done_ids"].append(doc_id); done_set.add(doc_id)
        time.sleep(0.5)

    log(f"offset={offset} | updated={stats['updated']} skipped={stats['skipped']} no_match={stats['no_match']}")
    with open(LOG_FILE, 'w') as f: json.dump(stats, f)
    offset += PAGE
    if len(batch) < PAGE: break
    time.sleep(1)

log(f"=== GOTOWE === updated={stats['updated']} skipped={stats['skipped']} no_match={stats['no_match']}")
