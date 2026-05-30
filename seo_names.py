#!/usr/bin/env python3
"""seo_names.py v3 — SEO nazwy z bechcicki.pl (prostszy regex)."""
import requests, re, json, time, os
from urllib.parse import quote
from datetime import datetime

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT  = "nzcwegq7"
LOG_FILE = "seo_names_log.json"
BLACKLIST = {"0196018"}
S_HDRS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
B_HDRS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0) Chrome/124", "Accept": "text/html", "Accept-Language": "pl-PL,pl;q=0.9", "Referer": "https://www.bechcicki.pl/"}

def log(m): print(f"[{datetime.now():%H:%M:%S}] {m}", flush=True)

def sanity_get(offset=0, size=200):
    q = f'*[_type=="product" && name != null && name != ""]{{_id, name, brand}}[{offset}...{offset+size}]'
    r = requests.get(f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/query/production",
        params={"query": q}, headers={"Authorization": f"Bearer {TOKEN}"}, timeout=60)
    r.raise_for_status()
    return r.json()["result"]

def search_bechcicki(q: str) -> list:
    url = f"https://www.bechcicki.pl/search?q={quote(q[:60])}&page=1&rows=10&sortCriteria=SCORE_DESC"
    try:
        r = requests.get(url, headers=B_HDRS, timeout=20)
        if r.status_code != 200: return []
        html = r.text
        # Wyciągnij id-p-XXXXXXX i otaczający slug
        pids = re.findall(r'id-p-(\d{7,})', html)
        seen = set(); results = []
        for pid in pids:
            if pid in seen or pid in BLACKLIST: continue
            seen.add(pid)
            idx = html.find(f"-id-p-{pid}")
            if idx < 0: continue
            before = html[max(0, idx-120):idx]
            sm = re.search(r'([a-z0-9][a-z0-9\-]{4,60})$', before)
            if not sm: continue
            name = sm.group(1).replace('-', ' ').title()
            results.append({"id": pid, "name": name})
        return results[:10]
    except: return []

def build_q(name: str, brand: str) -> str:
    tokens = [w for w in re.sub(r'[._/]', ' ', name).split() if len(w) > 2 and not re.match(r'^\d+$', w)]
    bs = brand.split()[0] if brand else ""
    parts = ([bs] if bs and bs.lower() not in [t.lower() for t in tokens[:2]] else []) + tokens[:3]
    return " ".join(parts)[:50] or " ".join(tokens[:4])[:50]

def overlap(a: str, b: str) -> float:
    at = set(re.findall(r'\w+', a.lower())); bt = set(re.findall(r'\w+', b.lower()))
    if not at or not bt: return 0.0
    sh, lo = (at, bt) if len(at) <= len(bt) else (bt, at)
    return len(sh & lo) / len(sh)

def patch_name(doc_id, new_name, slug):
    r = requests.post(f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/mutate/production",
        headers=S_HDRS, timeout=20,
        json={"mutations": [{"patch": {"id": doc_id, "set": {"name": new_name, "slug": {"current": slug, "_type": "slug"}, "seoNameUpdated": True}}}]})
    return r.status_code in (200, 201)

def slugify(n):
    s = n.lower()
    for src, dst in [('ą','a'),('ć','c'),('ę','e'),('ł','l'),('ń','n'),('ó','o'),('ś','s'),('ź','z'),('ż','z')]:
        s = s.replace(src, dst)
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')[:80]

def is_stub(n): return bool(re.match(r'^P-\d+$', str(n).strip()))

# Init stats
stats = json.load(open(LOG_FILE)) if os.path.exists(LOG_FILE) else {"updated":0,"skipped":0,"no_match":0,"done_ids":[]}
done_set = set(stats["done_ids"])
log(f"Start v3 | done={len(done_set)} updated={stats['updated']}")
offset = 0

while True:
    try: batch = sanity_get(offset)
    except Exception as e: log(f"GROQ err: {e}"); time.sleep(5); continue
    if not batch: log("Koniec."); break

    for p in batch:
        doc_id = p.get("_id","")
        if doc_id in done_set: continue
        name = str(p.get("name") or "").strip()
        if is_stub(name) or len(name) < 5:
            stats["skipped"] += 1; done_set.add(doc_id); continue
        brand = str(p.get("brand") or "") if not isinstance(p.get("brand"), dict) else ""
        q = build_q(name, brand.strip())
        if len(q) < 4:
            stats["skipped"] += 1; done_set.add(doc_id); continue
        results = search_bechcicki(q)
        if not results:
            stats["no_match"] += 1; done_set.add(doc_id); time.sleep(0.3); continue
        best = max(results[:5], key=lambda r: overlap(name, r["name"]), default=None)
        score = overlap(name, best["name"]) if best else 0
        if score < 0.38:
            stats["skipped"] += 1; done_set.add(doc_id); time.sleep(0.2); continue
        new_name = best["name"]
        if new_name.lower() == name.lower():
            stats["skipped"] += 1; done_set.add(doc_id); continue
        ok = patch_name(doc_id, new_name, slugify(new_name))
        if ok:
            stats["updated"] += 1
            log(f'✅ [{score:.0%}] "{name[:38]}" → "{new_name[:48]}"')
        else: stats["skipped"] += 1
        done_set.add(doc_id); time.sleep(0.4)

    stats["done_ids"] = list(done_set)
    log(f"offset={offset} | updated={stats['updated']} skipped={stats['skipped']} no_match={stats['no_match']}")
    with open(LOG_FILE,'w') as f: json.dump(stats, f)
    offset += 200
    if len(batch) < 200: break
    time.sleep(1)

stats["done_ids"] = list(done_set)
with open(LOG_FILE,'w') as f: json.dump(stats, f)
log(f"=== GOTOWE === updated={stats['updated']}")
