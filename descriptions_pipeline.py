#!/usr/bin/env python3
"""
descriptions_pipeline.py
Scrape shortDescription + technicalSpec z bechcicki.pl (SSR!) i patch Sanity.
Używa requests + BeautifulSoup — brak potrzeby headless browser.

Uruchomienie:
  pip install beautifulsoup4 lxml -q
  nohup python3 descriptions_pipeline.py > desc_pipeline.log 2>&1 &
"""

import json
import os
import re
import time
import sys
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# ──────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────
SANITY_PROJECT = "nzcwegq7"
SANITY_DATASET = "production"
SANITY_TOKEN   = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"

SANITY_QUERY_URL  = f"https://{SANITY_PROJECT}.api.sanity.io/v2024-01-01/data/query/{SANITY_DATASET}"
SANITY_MUTATE_URL = f"https://{SANITY_PROJECT}.api.sanity.io/v2024-01-01/data/mutate/{SANITY_DATASET}"

SANITY_HEADERS = {
    "Authorization": f"Bearer {SANITY_TOKEN}",
    "Content-Type": "application/json",
}

SCRIPT_DIR    = Path(__file__).parent
LOG_FILE      = SCRIPT_DIR / "desc_pipeline_log.json"
PROGRESS_FILE = SCRIPT_DIR / "PROGRESS.md"
IMG_LOG_FILE  = SCRIPT_DIR / "img_pipeline_log.json"
SEO_LOG_FILE  = SCRIPT_DIR / "seo_names_log.json"

REQUEST_DELAY  = 0.8   # s — między requestami do bechcicki
SANITY_BATCH   = 50    # mutacji na request
PAGE_SIZE      = 500   # produktów na query Sanity

BECHCICKI_BASE   = "https://www.bechcicki.pl"
BECHCICKI_SEARCH = "https://www.bechcicki.pl/search?q={query}&page=1&rows=10&sortCriteria=SCORE_DESC"

HTTP_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "pl-PL,pl;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# ──────────────────────────────────────────────
# LOGGING
# ──────────────────────────────────────────────
def log(msg: str):
    ts = time.strftime("%H:%M:%S")
    print(f"[{ts}] {msg}", flush=True)

# ──────────────────────────────────────────────
# STATE
# ──────────────────────────────────────────────
def load_log() -> dict:
    if LOG_FILE.exists():
        try:
            return json.loads(LOG_FILE.read_text())
        except Exception:
            pass
    return {"done_ids": [], "updated": 0, "skipped": 0, "errors": 0, "no_page": 0}

def save_log(state: dict):
    LOG_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False))

# ──────────────────────────────────────────────
# LOAD KNOWN BECHCICKI IDs
# ──────────────────────────────────────────────
def load_known_bechcicki_ids() -> dict:
    """Zwraca {sanity_id: bechcicki_id} z logów image_pipeline i seo_names."""
    result = {}

    for logfile in [IMG_LOG_FILE, SEO_LOG_FILE]:
        if not logfile.exists():
            continue
        try:
            data = json.loads(logfile.read_text())
            for key in ("done_ids", "product_bechcicki_map", "bechcicki_map"):
                val = data.get(key)
                if isinstance(val, dict):
                    result.update(val)
        except Exception as e:
            log(f"[WARN] {logfile.name}: {e}")

    log(f"Znane ID bechcicki z logów: {len(result)}")
    return result

# ──────────────────────────────────────────────
# SANITY: fetch products
# ──────────────────────────────────────────────
def fetch_products_needing_desc(done_set: set) -> list:
    """
    Pobierz produkty bez shortDescription LUB bez technicalSpec.
    Pomija placeholdery P-XXXXXXX i już przetworzone.
    """
    all_products = []
    offset = 0

    while True:
        q = (
            '*[_type == "product" && defined(name) && '
            '!(name match "P-*") && '
            '(shortDescription == null || shortDescription == "" || '
            'count(technicalSpec) == 0 || !defined(technicalSpec))] '
            f'| order(_id asc) [{offset}...{offset + PAGE_SIZE}] '
            '{ _id, name, brand }'
        )
        try:
            resp = requests.get(
                SANITY_QUERY_URL,
                params={"query": q},
                headers=SANITY_HEADERS,
                timeout=60,
            )
            resp.raise_for_status()
            batch = resp.json().get("result", [])
        except Exception as e:
            log(f"[ERROR] Sanity query offset={offset}: {e}")
            break

        if not batch:
            break

        new = [p for p in batch if p["_id"] not in done_set]
        all_products.extend(new)
        log(f"  Sanity page offset={offset}: {len(batch)} produktów ({len(new)} nowych)")

        if len(batch) < PAGE_SIZE:
            break
        offset += PAGE_SIZE

    return all_products

# ──────────────────────────────────────────────
# BECHCICKI: szukaj URL produktu
# ──────────────────────────────────────────────
def build_search_query(product: dict) -> str:
    name = product.get("name", "")
    brand = product.get("brand", "")
    if isinstance(brand, dict):
        brand = ""
    tokens = name.split()[:4]
    if brand and brand not in name:
        tokens = [brand] + tokens[:3]
    return " ".join(tokens)

def find_product_on_bechcicki(product: dict, known_bechcicki: dict) -> tuple:
    """
    Zwraca (page_url, bechcicki_id) lub (None, None).
    Priorytet: znany ID → szukaj po nazwie.
    """
    sanity_id = product["_id"]
    name = product.get("name", "")

    known_id = known_bechcicki.get(sanity_id)
    query = build_search_query(product)

    try:
        search_url = BECHCICKI_SEARCH.format(
            query=requests.utils.quote(query, safe="")
        )
        resp = requests.get(search_url, headers=HTTP_HEADERS, timeout=15)
        resp.raise_for_status()
    except Exception as e:
        log(f"  [ERR search] {name[:40]}: {e}")
        return None, None

    html = resp.text

    # URL-e są w JS jako unicode escapes: "\u002Fslug-id-p-0123456"
    # Wyciągnij slug + id z embedded JS (jak w seo_names.py)
    # Wzorzec: url:"\u002F...id-p-XXXXXXX"  lub  href="/...id-p-XXXXXXX"
    raw_urls = re.findall(
        r'(?:url|href)[:\s=]+["\'\\u002F/]*'
        r'([a-z0-9ąćęłńóśźż\-]+(?:\\u002F[a-z0-9ąćęłńóśźż\-]+)*'
        r'-id-p-(\d{7,}))["\']',
        html
    )
    if not raw_urls:
        # Fallback: znajdź samo id-p-XXXXXXX i zbuduj bezpośredni URL
        ids_found = re.findall(r'id-p-(\d{7,})', html)
        if not ids_found:
            return None, None
        bid = ids_found[0]
        # Szukaj pełnego slug przez bardziej ogólny wzorzec
        slug_match = re.search(
            r'["\\u002F/]([a-z0-9ąćęłńóśźż\-]+-id-p-' + re.escape(bid) + r')',
            html
        )
        slug = slug_match.group(1) if slug_match else f"produkt-id-p-{bid}"
        return BECHCICKI_BASE + "/" + slug, bid

    # Zdekoduj URL-e (usuń \u002F → /)
    def decode_url(raw: str) -> str:
        return raw.replace("\\u002F", "/").replace("\\u00", "")

    # Jeśli mamy znane ID — dopasuj
    if known_id:
        for raw_slug, bid in raw_urls:
            if bid == known_id:
                return BECHCICKI_BASE + "/" + decode_url(raw_slug), bid

    # Inaczej — weź pierwszy wynik
    raw_slug, bid = raw_urls[0]
    return BECHCICKI_BASE + "/" + decode_url(raw_slug), bid

# ──────────────────────────────────────────────
# BECHCICKI: pobierz stronę i wyciągnij dane
# ──────────────────────────────────────────────
def scrape_bechcicki_page(url: str) -> dict | None:
    """Pobierz stronę produktu i wyciągnij blok opisowy."""
    try:
        resp = requests.get(url, headers=HTTP_HEADERS, timeout=20)
        resp.raise_for_status()
    except Exception as e:
        log(f"  [ERR page] {url}: {e}")
        return None

    soup = BeautifulSoup(resp.text, "lxml")

    # Szukaj sekcji opisów
    desc_el = soup.find(
        class_=lambda c: c and "one-product-description-section" in c
    )
    if not desc_el:
        # Fallback selektory
        for cls_pat in ["product-description-section", "one-long-description", "product-section description"]:
            desc_el = soup.find(class_=lambda c: c and cls_pat in (c or ""))
            if desc_el:
                break

    if not desc_el:
        return None

    # get_text bezpośrednio — to jest SSR więc tekst jest w DOM
    raw = desc_el.get_text(separator="\n", strip=True)
    lines = [l.strip() for l in raw.split("\n") if l.strip()]

    return {"lines": lines, "url": url}

# ──────────────────────────────────────────────
# PARSE: linie → shortDescription + technicalSpec
# ──────────────────────────────────────────────
def parse_description_lines(lines: list) -> dict:
    """
    Format bechcicki:
      [ewentualny opis przed parametrami]
      "Parametry techniczne"
      Nazwa1
      Wartość1
      Nazwa2
      Wartość2
      ...
    """
    result = {"shortDescription": None, "technicalSpec": []}

    PT_MARKERS = {
        "Parametry techniczne", "Dane techniczne",
        "Specyfikacja techniczna", "Parametry:", "Parametry"
    }

    # Znajdź indeks nagłówka parametrów
    pt_idx = None
    for i, line in enumerate(lines):
        if line.strip() in PT_MARKERS:
            pt_idx = i
            break

    # Opis: linie przed nagłówkiem parametrów (lub cały tekst jeśli brak nagłówka)
    desc_lines = lines[:pt_idx] if pt_idx is not None else lines
    # Filtruj krótkie śmieciowe linie
    desc_clean = [l for l in desc_lines if len(l) > 5 and "Podmiot odpowiedzialny" not in l]
    if desc_clean:
        desc_text = " ".join(desc_clean)
        # Normalizuj spacje
        desc_text = re.sub(r"\s+", " ", desc_text).strip()
        result["shortDescription"] = desc_text[:700]

    # Parametry: linie po nagłówku, jako pary (label, value)
    if pt_idx is not None:
        spec_lines = lines[pt_idx + 1:]

        # Filtruj stopkę
        footer_markers = {
            "Podmiot odpowiedzialny", "Więcej", "Kod pocztowy",
            "Miasto", "Kraj", "Adres email", "Telefon"
        }
        filtered = []
        for line in spec_lines:
            if any(line.startswith(m) for m in footer_markers):
                break
            filtered.append(line)

        # Skondensuj linie — połącz wartości rozdzielone standalone "," linią
        # np. ["wałek", ",", "pędzel"] → ["wałek, pędzel"]
        condensed = []
        i = 0
        while i < len(filtered):
            line = filtered[i]
            if line == ",":
                # Dołącz do poprzedniego
                if condensed:
                    condensed[-1] = condensed[-1].rstrip(", ")
                    if i + 1 < len(filtered) and filtered[i + 1] != ",":
                        condensed[-1] += ", " + filtered[i + 1]
                        i += 2
                        continue
                i += 1
                continue
            condensed.append(line)
            i += 1

        # Heurystyka: czy linia wygląda jak label (nie wartość)?
        def looks_like_label(s: str) -> bool:
            if not s:
                return False
            # Jeśli zawiera ", " — to jest scalona wartość wieloczłonowa
            if ", " in s:
                return False
            # Zaczyna się od małej litery polskiego przyimka → wartość
            if re.match(r'^(do|na|w |ze?|po|przy|od|za|przez|z )', s, re.I):
                return False
            if re.search(r'\[.{1,5}\]', s):   # "Pojemność [l]"
                return True
            if len(s) > 30 and not re.search(r'\d', s):
                return True
            return False

        # Buduj pary label: value — obsługuj boolean flags (label bez wartości)
        specs = []
        j = 0
        while j < len(condensed):
            label = condensed[j].strip()

            if len(label) < 2 or label in PT_MARKERS or label.endswith(":"):
                j += 1
                continue

            if j + 1 >= len(condensed):
                j += 1
                continue

            next_line = condensed[j + 1].strip()

            # Jeśli następna linia to label → bieżąca to boolean flag
            if looks_like_label(next_line):
                specs.append({"label": label, "value": "tak"})
                j += 1
                continue

            specs.append({"label": label, "value": next_line})
            j += 2

        result["technicalSpec"] = specs[:35]

    return result

# ──────────────────────────────────────────────
# SANITY: patch
# ──────────────────────────────────────────────
def make_mutation(sanity_id: str, short_desc: str | None, tech_spec: list) -> dict:
    set_fields = {}
    if short_desc:
        set_fields["shortDescription"] = short_desc
    if tech_spec:
        set_fields["technicalSpec"] = tech_spec
    return {"patch": {"id": sanity_id, "set": set_fields}}

def flush_mutations(mutations: list) -> int:
    if not mutations:
        return 0
    try:
        resp = requests.post(
            SANITY_MUTATE_URL,
            headers=SANITY_HEADERS,
            json={"mutations": mutations},
            timeout=60,
        )
        resp.raise_for_status()
        results = resp.json().get("results", [])
        return len(results) or len(mutations)
    except Exception as e:
        log(f"[ERROR] Sanity mutate: {e}")
        return 0

# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
def main():
    state  = load_log()
    done_set = set(state["done_ids"])

    log("=== descriptions_pipeline START ===")
    log(f"Już przetworzonych: {len(done_set)}")

    known_bechcicki = load_known_bechcicki_ids()

    log("Pobieram produkty z Sanity...")
    products = fetch_products_needing_desc(done_set)
    log(f"Produktów do przetworzenia: {len(products)}")

    if not products:
        log("Nic do roboty. Koniec.")
        return

    pending_mutations = []
    session = requests.Session()
    session.headers.update(HTTP_HEADERS)

    try:
        for idx, product in enumerate(products, 1):
            sanity_id = product["_id"]
            name      = product.get("name", "")

            if idx % 50 == 0 or idx == 1:
                log(f"\n[{idx}/{len(products)}] updated={state['updated']} skip={state['skipped']} err={state['errors']}")

            # 1. Znajdź URL na bechcicki
            page_url, bechcicki_id = find_product_on_bechcicki(product, known_bechcicki)
            time.sleep(REQUEST_DELAY)

            if not page_url:
                log(f"  [-] Nie znaleziono: {name[:50]}")
                state["no_page"] += 1
                done_set.add(sanity_id)
                state["done_ids"] = list(done_set)
                if idx % 20 == 0:
                    save_log(state)
                continue

            # 2. Pobierz stronę produktu
            raw = scrape_bechcicki_page(page_url)
            time.sleep(REQUEST_DELAY)

            if not raw:
                log(f"  [-] Brak sekcji: {name[:40]} | {page_url}")
                state["skipped"] += 1
                done_set.add(sanity_id)
                state["done_ids"] = list(done_set)
                if idx % 20 == 0:
                    save_log(state)
                continue

            # 3. Parsuj
            parsed = parse_description_lines(raw["lines"])

            short_desc = parsed.get("shortDescription")
            tech_spec  = parsed.get("technicalSpec", [])

            if not short_desc and not tech_spec:
                log(f"  [-] Puste dane po parsowaniu: {name[:40]}")
                state["skipped"] += 1
                done_set.add(sanity_id)
                state["done_ids"] = list(done_set)
                if idx % 20 == 0:
                    save_log(state)
                continue

            log(f"  [OK] {name[:40]} | desc={len(short_desc or '')}ch specs={len(tech_spec)} bid={bechcicki_id}")
            state["updated"] += 1

            # 4. Dodaj mutację
            mut = make_mutation(sanity_id, short_desc, tech_spec)
            pending_mutations.append(mut)
            done_set.add(sanity_id)

            # 5. Flush co SANITY_BATCH
            if len(pending_mutations) >= SANITY_BATCH:
                ok = flush_mutations(pending_mutations)
                log(f"  >> Sanity flush: {ok} updates (łącznie: {state['updated']})")
                pending_mutations = []

            state["done_ids"] = list(done_set)
            save_log(state)

    except KeyboardInterrupt:
        log("\n[STOP] Przerwano przez użytkownika")

    # Ostatni flush
    if pending_mutations:
        ok = flush_mutations(pending_mutations)
        log(f"  >> Sanity final flush: {ok} updates")

    state["done_ids"] = list(done_set)
    save_log(state)

    log(f"\n=== KONIEC ===")
    log(f"  Updated  : {state['updated']}")
    log(f"  Skipped  : {state['skipped']}")
    log(f"  No page  : {state['no_page']}")
    log(f"  Errors   : {state['errors']}")
    log(f"  Done IDs : {len(done_set)}")

    try:
        with open(PROGRESS_FILE, "a") as f:
            f.write(
                f"\n[{time.strftime('%Y-%m-%d %H:%M')}] descriptions_pipeline: "
                f"updated={state['updated']} skipped={state['skipped']} "
                f"no_page={state['no_page']} errors={state['errors']}\n"
            )
    except Exception:
        pass

if __name__ == "__main__":
    main()
