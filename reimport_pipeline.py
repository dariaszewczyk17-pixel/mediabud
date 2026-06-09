#!/usr/bin/env python3
"""
reimport_pipeline.py  —  Pełny reimport produktów P-* z bechcicki.pl do Sanity
Opcja A: oryginalne zdjęcia BIG.webp, bez przetwarzania

Etapy:
  1. Scraping bechcicki.pl (8 wątków) → reimport_scraped.jsonl
  2. Utwórz/zaktualizuj kategorie i marki w Sanity
  3. Usuń wszystkie P-* produkty z Sanity
  4. Importuj produkty (8 wątków)

Użycie:
  python3 reimport_pipeline.py [--scrape-only] [--import-only] [--workers N]
"""

import json, io, re, time, os, sys, requests, threading, unicodedata
from queue import Queue
from threading import Lock
from bs4 import BeautifulSoup

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
PROJECT = "nzcwegq7"
DATASET = "production"
SAN_BASE = f"https://{PROJECT}.api.sanity.io/v2021-06-07/data"
SAN_HDR = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
WEB_HDR = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36"}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ALL_SKUS_FILE    = os.path.join(BASE_DIR, "all_skus.json")
SCRAPED_FILE     = os.path.join(BASE_DIR, "reimport_scraped.jsonl")
IMPORT_LOG_FILE  = os.path.join(BASE_DIR, "reimport_import_log.json")
SCRAPE_ERR_FILE  = os.path.join(BASE_DIR, "reimport_scrape_errors.json")

WORKERS = 8
SCRAPE_ONLY = False
IMPORT_ONLY = False

for arg in sys.argv[1:]:
    if arg == "--scrape-only":   SCRAPE_ONLY = True
    elif arg == "--import-only": IMPORT_ONLY = True
    elif arg.startswith("--workers="): WORKERS = int(arg.split("=")[1])
    elif arg.isdigit(): WORKERS = int(arg)


# ── Helpers ──────────────────────────────────────────────────────────────────

def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[^\w\s-]", "", text.lower())
    text = re.sub(r"[\s_-]+", "-", text).strip("-")
    return text[:96]

def pid_to_img_url(pid_str):
    """P-0026479 → https://static.www.bechcicki.pl/P-/00/26/47/9/1/BIG.webp"""
    n = pid_str.zfill(7)
    return f"https://static.www.bechcicki.pl/P-/{n[0:2]}/{n[2:4]}/{n[4:6]}/{n[6]}/1/BIG.webp"


# ── Scraper ───────────────────────────────────────────────────────────────────

def scrape_product(sku):
    """Scrapuje stronę bechcicki.pl i zwraca dict z danymi produktu lub None."""
    pid_str = sku[2:]  # P-0026479 → 0026479
    url = f"https://www.bechcicki.pl/{pid_str}-id-p-{pid_str}"
    try:
        r = requests.get(url, headers=WEB_HDR, timeout=20, allow_redirects=True)
        if r.status_code == 404:
            return {"sku": sku, "status": "404"}
        if r.status_code != 200:
            return {"sku": sku, "status": f"http_{r.status_code}"}
        soup = BeautifulSoup(r.text, "html.parser")

        # Nazwa produktu
        h1 = soup.select_one("h1")
        name = h1.get_text(strip=True) if h1 else ""

        # JSON-LD dane
        category_path = []
        params = []
        brand = None
        description = ""
        ean = ""
        img_url = pid_to_img_url(pid_str)  # domyślny z formatu URL

        for s in soup.find_all("script", type="application/ld+json"):
            try:
                ld = json.loads(s.string or "")
                t = ld.get("@type", "")

                if t == "BreadcrumbList":
                    items = ld.get("itemListElement", [])
                    # Ostatni element to nazwa produktu - pomijamy
                    category_path = [it["name"] for it in items[:-1] if "name" in it]

                elif t == "Product":
                    # Parametry techniczne
                    for p in ld.get("additionalProperty", []):
                        lbl = p.get("unitText") or p.get("name", "")
                        val = p.get("value", "")
                        if lbl and val != "":
                            params.append({"label": str(lbl), "value": str(val)})
                    # Marka
                    brand_obj = ld.get("brand", {})
                    if isinstance(brand_obj, dict):
                        brand = brand_obj.get("name", "")
                    # Opis
                    description = ld.get("description", "")
                    # EAN
                    ean = str(ld.get("gtin13", ld.get("gtin", ld.get("ean", "")))).strip()
                    if ean == "None": ean = ""
                    # Zdjęcie
                    img_ld = ld.get("image")
                    if img_ld:
                        img_url = img_ld if isinstance(img_ld, str) else img_ld[0]

            except Exception:
                pass

        # Marka z breadcrumb (Producent:KNAUF) jeśli brak z JSON-LD
        if not brand:
            for a in soup.select("a"):
                href = a.get("href", "")
                txt = a.get_text(strip=True)
                if "producent" in href.lower() or "producer" in href.lower():
                    brand = txt
                    break

        # Zdjęcie - jeśli brak, skonstruuj ze wzorca
        if not img_url or "BIG.webp" not in img_url:
            img = soup.select_one('img[src*="BIG.webp"], img[src*="bechcicki"]')
            if img:
                src = img.get("src") or img.get("data-src") or ""
                if "BIG.webp" in src:
                    img_url = src.split("?")[0]

        return {
            "sku": sku,
            "name": name,
            "categoryPath": category_path,
            "brand": brand or "",
            "technicalSpec": params,
            "description": description,
            "ean": ean,
            "imageUrl": img_url,
            "status": "ok"
        }
    except Exception as e:
        return {"sku": sku, "status": f"error:{str(e)[:60]}"}


# ── Scrape Stage ──────────────────────────────────────────────────────────────

def run_scrape(skus_to_scrape):
    total = len(skus_to_scrape)
    print(f"\n📡 ETAP 1: Scraping {total} produktów ({WORKERS} wątków)")
    
    q = Queue(maxsize=WORKERS * 8)
    lock = Lock()
    counters = {"ok": 0, "err": 0, "done": 0}
    errors = []

    scrape_file = open(SCRAPED_FILE, "a", encoding="utf-8")

    def worker():
        while True:
            sku = q.get()
            if sku is None:
                q.task_done(); break
            result = scrape_product(sku)
            with lock:
                counters["done"] += 1
                if result.get("status") == "ok":
                    counters["ok"] += 1
                    scrape_file.write(json.dumps(result, ensure_ascii=False) + "\n")
                    scrape_file.flush()
                else:
                    counters["err"] += 1
                    errors.append(result)
                if counters["done"] % 200 == 0:
                    pct = counters["done"] * 100 // total
                    print(f"  [{counters['done']}/{total}] {pct}% ✅{counters['ok']} ❌{counters['err']}", flush=True)
            q.task_done()

    threads = [threading.Thread(target=worker, daemon=True) for _ in range(WORKERS)]
    for t in threads: t.start()
    t0 = time.time()
    for sku in skus_to_scrape: q.put(sku)
    for _ in range(WORKERS): q.put(None)
    q.join()
    scrape_file.close()

    elapsed = int(time.time() - t0)
    with open(SCRAPE_ERR_FILE, "w") as f:
        json.dump(errors, f, indent=2, ensure_ascii=False)

    print(f"\n  ✅ Scraped: {counters['ok']}  ❌ Błędy: {counters['err']}  ⏱ {elapsed}s")
    return counters["ok"]


# ── Sanity Helpers ────────────────────────────────────────────────────────────

def sanity_query(q):
    import urllib.parse
    r = requests.get(f"{SAN_BASE}/query/{DATASET}?query={urllib.parse.quote(q)}",
                     headers={"Authorization": f"Bearer {TOKEN}"}, timeout=30)
    return r.json().get("result", [])

def sanity_mutate(mutations, verbose=False):
    r = requests.post(f"{SAN_BASE}/mutate/{DATASET}",
                      json={"mutations": mutations}, headers=SAN_HDR, timeout=60)
    res = r.json()
    if verbose: print("  Mutate result:", str(res)[:200])
    return res

def upload_image_from_url(img_url):
    """Pobiera obraz i wgrywa do Sanity CDN. Zwraca asset _id lub None."""
    try:
        r = requests.get(img_url, headers=WEB_HDR, timeout=20)
        if r.status_code != 200: return None
        content_type = r.headers.get("content-type", "image/webp")
        if "jpeg" in content_type or "jpg" in content_type: ct = "image/jpeg"
        elif "png" in content_type: ct = "image/png"
        else: ct = "image/webp"
        up = requests.post(
            f"https://{PROJECT}.api.sanity.io/v2021-06-07/assets/images/{DATASET}",
            headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": ct},
            data=r.content, timeout=60)
        return up.json().get("document", {}).get("_id")
    except:
        return None


# ── Categories & Brands Stage ─────────────────────────────────────────────────

def upsert_categories_brands(scraped_products):
    print("\n🗂  ETAP 2: Tworzę kategorie i marki w Sanity")

    # Zbierz unikalne kategorie (pełne ścieżki)
    all_cat_paths = set()
    all_brands = set()
    for p in scraped_products:
        path = p.get("categoryPath", [])
        for i in range(len(path)):
            all_cat_paths.add(tuple(path[:i+1]))
        b = p.get("brand", "")
        if b: all_brands.add(b)

    print(f"  Unikalne węzły kategorii: {len(all_cat_paths)}")
    print(f"  Unikalne marki: {len(all_brands)}")

    # Utwórz kategorie (od najwyższego do najniższego poziomu)
    sorted_paths = sorted(all_cat_paths, key=lambda x: len(x))
    mutations = []
    for path in sorted_paths:
        title = path[-1]
        cat_id = "cat-" + slugify(title)
        parent_id = "cat-" + slugify(path[-2]) if len(path) > 1 else None
        doc = {
            "_id": cat_id,
            "_type": "category",
            "title": title,
            "slug": {"_type": "slug", "current": slugify(title)},
        }
        if parent_id:
            doc["parentCategory"] = {"_type": "reference", "_ref": parent_id}
        mutations.append({"createOrReplace": doc})

    # Utwórz marki
    for b in all_brands:
        b_slug = slugify(b)
        if not b_slug: continue
        mutations.append({"createOrReplace": {
            "_id": f"brand-{b_slug}",
            "_type": "brand",
            "name": b,
            "slug": {"_type": "slug", "current": b_slug}
        }})

    # Wyślij w paczkach po 200
    total_mut = len(mutations)
    sent = 0
    for i in range(0, total_mut, 200):
        batch = mutations[i:i+200]
        sanity_mutate(batch)
        sent += len(batch)
    print(f"  Zaktualizowano {sent} kategorii/marek")


# ── Delete Stage ──────────────────────────────────────────────────────────────

def delete_all_products():
    print("\n🗑  ETAP 3: Usuwam wszystkie P-* produkty z Sanity")
    with open(ALL_SKUS_FILE) as f:
        all_ids = [p["_id"] for p in json.load(f)]

    total = len(all_ids)
    deleted = 0
    BATCH = 200
    t0 = time.time()
    for i in range(0, total, BATCH):
        batch_ids = all_ids[i:i+BATCH]
        mutations = [{"delete": {"id": pid}} for pid in batch_ids]
        sanity_mutate(mutations)
        deleted += len(batch_ids)
        if deleted % 1000 == 0:
            print(f"  Usunięto {deleted}/{total}...", flush=True)

    print(f"  ✅ Usunięto {deleted} produktów ({int(time.time()-t0)}s)")


# ── Import Stage ──────────────────────────────────────────────────────────────

def import_product(product):
    """Importuje jeden produkt do Sanity. Zwraca status string."""
    sku = product["sku"]
    pid = sku[2:]  # 0026479

    # Upload zdjęcia
    img_url = product.get("imageUrl", "")
    asset_id = None
    if img_url:
        asset_id = upload_image_from_url(img_url)

    name = product.get("name", "").strip()
    if not name:
        return "skip_no_name"

    # Slug
    slug = slugify(name)

    # Kategoria (ostatni element ścieżki)
    cat_path = product.get("categoryPath", [])
    cat_ref = None
    if cat_path:
        cat_id = "cat-" + slugify(cat_path[-1])
        cat_ref = {"_type": "reference", "_ref": cat_id}

    # Marka
    brand_name = product.get("brand", "")
    brand_ref = None
    if brand_name:
        brand_ref = {"_type": "reference", "_ref": f"brand-{slugify(brand_name)}"}

    # Zbuduj dokument
    doc = {
        "_id": f"product-p{pid}",
        "_type": "product",
        "name": name,
        "sku": sku,
        "slug": {"_type": "slug", "current": slug},
        "technicalSpec": product.get("technicalSpec", []),
        "description": product.get("description", ""),
        "shortDescription": "",
        "inStock": True,
        "featured": False,
    }

    # categoryPath jako tablica stringów (dla breadcrumb/filtry na frontendzie)
    if cat_path:
        doc["categoryPath"] = cat_path

    if cat_ref:
        doc["category"] = cat_ref
    if brand_ref:
        doc["brand"] = brand_ref
    if product.get("ean"):
        doc["ean"] = product["ean"]

    # Zdjęcia
    if asset_id:
        img_obj = {"_type": "image", "asset": {"_type": "reference", "_ref": asset_id}}
        key = asset_id.split("-")[1][:8] if "-" in asset_id else pid[:8]
        doc["images"] = [{"_key": key, "_type": "image", "asset": {"_type": "reference", "_ref": asset_id}}]
        doc["mainImage"] = img_obj

    try:
        result = sanity_mutate([{"createOrReplace": doc}])
        if result.get("results"):
            return f"ok_{'img' if asset_id else 'noimg'}"
        return "error_mutate"
    except Exception as e:
        return f"error:{str(e)[:40]}"


def run_import(scraped_products):
    total = len(scraped_products)
    print(f"\n📥 ETAP 4: Importuję {total} produktów ({WORKERS} wątków)")

    q = Queue(maxsize=WORKERS * 8)
    lock = Lock()
    counters = {"ok": 0, "err": 0, "done": 0}
    results_list = []

    def worker():
        while True:
            product = q.get()
            if product is None:
                q.task_done(); break
            status = import_product(product)
            with lock:
                counters["done"] += 1
                if "ok" in status:   counters["ok"] += 1
                else:                counters["err"] += 1
                results_list.append({"sku": product["sku"], "status": status})
                if counters["done"] % 200 == 0:
                    pct = counters["done"] * 100 // total
                    print(f"  [{counters['done']}/{total}] {pct}% ✅{counters['ok']} ❌{counters['err']}", flush=True)
            q.task_done()

    threads = [threading.Thread(target=worker, daemon=True) for _ in range(WORKERS)]
    for t in threads: t.start()
    t0 = time.time()
    for p in scraped_products: q.put(p)
    for _ in range(WORKERS): q.put(None)
    q.join()

    elapsed = int(time.time() - t0)
    with open(IMPORT_LOG_FILE, "w") as f:
        json.dump(results_list, f, indent=2, ensure_ascii=False)

    print(f"\n  ✅ Zaimportowano: {counters['ok']}  ❌ Błędy: {counters['err']}  ⏱ {elapsed}s")
    print(f"  📄 Log: {IMPORT_LOG_FILE}")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  REIMPORT PRODUKTÓW 1:1 Z BECHCICKI.PL → SANITY")
    print("  Opcja A: oryginalne zdjęcia BIG.webp")
    print("=" * 60)

    with open(ALL_SKUS_FILE) as f:
        all_skus_data = json.load(f)
    all_skus = [p["sku"] for p in all_skus_data]
    print(f"\nŁącznie SKU do przetworzenia: {len(all_skus)}")

    # Sprawdź które już scraped (wznowienie)
    scraped_skus = set()
    if os.path.exists(SCRAPED_FILE):
        with open(SCRAPED_FILE, encoding="utf-8") as f:
            for line in f:
                try:
                    d = json.loads(line)
                    scraped_skus.add(d["sku"])
                except: pass
        print(f"Już scrapowanych: {len(scraped_skus)}")

    # ── ETAP 1: Scraping ─────────────────────────────────────────────────────
    if not IMPORT_ONLY:
        remaining = [s for s in all_skus if s not in scraped_skus]
        if remaining:
            run_scrape(remaining)
        else:
            print("\n✅ Scraping już zakończony — pomijam")

    # Załaduj wszystkie scraped
    scraped_products = []
    with open(SCRAPED_FILE, encoding="utf-8") as f:
        for line in f:
            try:
                d = json.loads(line)
                if d.get("status") == "ok":
                    scraped_products.append(d)
            except: pass
    print(f"\nScraped produktów gotowych do importu: {len(scraped_products)}")

    if SCRAPE_ONLY:
        print("--scrape-only: kończę po scrapingu")
        return

    # ── ETAP 2: Kategorie i marki ────────────────────────────────────────────
    upsert_categories_brands(scraped_products)

    # ── ETAP 3: Usuń produkty ────────────────────────────────────────────────
    print("\n⚠️  UWAGA: Zaraz usunę wszystkie P-* produkty!")
    print("   Wpisuję 'TAK' automatycznie po 5s...")
    time.sleep(5)
    delete_all_products()

    # ── ETAP 4: Import ───────────────────────────────────────────────────────
    run_import(scraped_products)

    print("\n🏁 PIPELINE ZAKOŃCZONY!")


if __name__ == "__main__":
    main()
