#!/usr/bin/env python3
"""
bechcicki_sync.py
Pipeline: bechcicki.pl kategoria → produkty → EAN match → update Sanity

Użycie:
  python3 bechcicki_sync.py                    # wszystkie kategorie
  python3 bechcicki_sync.py welny-fasadowe     # konkretna kategoria (slug)
"""
import sys, re, json, time, os, requests, asyncio, unicodedata
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

# TOKEN bezpiecznie z environment variable — NIE hardcode w kodzie
# Ustaw: export SANITY_TOKEN="sk..." przed uruchomieniem
TOKEN = os.environ.get('SANITY_TOKEN', '')
if not TOKEN:
    print("BŁĄD: Brak zmiennej środowiskowej SANITY_TOKEN.")
    print("Ustaw: export SANITY_TOKEN='sk...'")
    sys.exit(1)

SAN_BASE  = "https://nzcwegq7.api.sanity.io/v2021-06-07/data"
SAN_HDR   = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
REQ_HDR   = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0"}
BAD_ASSET = "image-64aeb66968a6ba126888f09a972ada28c2b0b53a-1200x1200-webp"

# Normalizacja nazw do porównywania (eliminuje problemy z polskimi znakami)
# Zapewnia że "Wełna fasadowa" == "Welna fasadowa" == "wełna fasadowa"
_PL_CHARS = str.maketrans('ąćęłńóśźżĄĆĘŁŃÓŚŹŻ', 'acelnoszzACELNOSZZ')

def normalize_name(s: str) -> str:
    """Normalizuje nazwę do porównania: lowercase + bez polskich znaków diakrytycznych."""
    if not s:
        return ''
    # Krok 1: konwersja przez tabelę bezpośrednich zamian (ł→l, ą→a, etc.)
    result = s.translate(_PL_CHARS)
    # Krok 2: NFD decomposition dla pozostałych znaków diakrytycznych
    result = unicodedata.normalize('NFD', result)
    result = ''.join(c for c in result if unicodedata.category(c) != 'Mn')
    # Krok 3: lowercase i usunięcie nadmiarowych spacji
    return re.sub(r'\s+', ' ', result.lower().strip())

LOG_FILE  = os.path.join(os.path.dirname(__file__), "bechcicki_sync_log.json")

# Mapowanie kategorii bechcicki.pl URL → slug Sanity
CATEGORIES = [
    # (bechcicki_path, sanity_slug)
    ("izolacje/welny/welny-fasadowe",              "welny-fasadowe"),
    ("izolacje/welny/welny-do-poddaszy",           "welny-do-poddaszy"),
    ("izolacje/welny/welny-do-dachow-plaskich",    "welny-do-dachow-plaskich"),
    ("izolacje/welny/welny-do-stropow-i-podlog",   "welny-do-stropow-i-podlog"),
    ("izolacje/welny/welny-do-suchej-zabudowy-i-scian-dzialowych", "welny-do-suchej-zabudowy-i-scian-dzialowych"),
    ("izolacje/styropiany/styropiany-fasadowe-eps","styropiany-fasadowe"),
    ("izolacje/styropiany/styropian-dach-podloga-eps","styropian-dach-podloga"),
    ("izolacje/plyty-xps",                         "plyty-xps"),
    ("chemia-budowlana/tynki/tynki-elewacyjne",    "tynki-elewacyjne"),
    ("chemia-budowlana/tynki/tynki-gipsowe",       "tynki-gipsowe"),
    ("chemia-budowlana/tynki/tynki-cementowo-wapienne","tynki-cementowo-wapienne"),
    ("chemia-budowlana/kleje/kleje-do-styropianu-i-styroduru","kleje-do-styropianu-i-styroduru"),
    ("chemia-budowlana/kleje/kleje-do-glazury",    "kleje-do-glazury"),
    ("chemia-budowlana/kleje/kleje-do-welen",      "kleje-do-welen"),
    ("chemia-budowlana/grunty/grunty-uniwersalne", "grunty-uniwersalne"),
    ("farby-i-rozpuszczalniki/farby-elewacyjne/farby-elewacyjne-silikonowe","farby-elewacyjne-silikonowe"),
    ("farby-i-rozpuszczalniki/farby-do-drewna",    "farby-do-drewna"),
    ("sucha-zabudowa/plyty/plyty-gipsowo-kartonowe","plyty-gipsowo-kartonowe"),
    ("stropy-i-sciany/materialy-konstrukcyjne/bloczki","bloczki"),
]

def san_query(q):
    r = requests.get(f"{SAN_BASE}/query/production", params={"query": q}, headers=SAN_HDR, timeout=30)
    return r.json().get("result")

def san_mutate(mutations):
    r = requests.post(f"{SAN_BASE}/mutate/production", headers=SAN_HDR,
                      json={"mutations": mutations}, timeout=30)
    return r.status_code in [200, 201]

def upload_image(url):
    """Pobierz obraz z URL i uploaduj do Sanity. Zwraca asset _id lub None."""
    if not url or 'placeholder' in url.lower():
        return None
    try:
        r = requests.get(url, headers=REQ_HDR, timeout=20)
        if r.status_code != 200:
            return None
        ext = 'jpg'
        ct = r.headers.get('Content-Type','')
        if 'png' in ct or url.endswith('.png'):  ext = 'png'
        elif 'webp' in ct or url.endswith('.webp'): ext = 'webp'
        resp = requests.post(
            f"https://nzcwegq7.api.sanity.io/v2021-06-07/assets/images/production",
            data=r.content,
            headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": f"image/{ext}"},
            timeout=60
        )
        if resp.status_code in [200, 201]:
            return resp.json().get("document", {}).get("_id")
    except Exception as e:
        print(f"    upload_image error: {e}")
    return None

def scrape_product_page(url):
    """Scrape danych produktu ze strony bechcicki.pl (server-side JSON-LD)."""
    try:
        r = requests.get(url, headers=REQ_HDR, timeout=20)
        if r.status_code != 200:
            return None
        soup = BeautifulSoup(r.text, 'html.parser')
        data = {}

        # 1. JSON-LD Product
        for script in soup.find_all('script', type='application/ld+json'):
            try:
                obj = json.loads(script.string or '{}')
                if isinstance(obj, list):
                    obj = next((o for o in obj if o.get('@type')=='Product'), {})
                if obj.get('@type') == 'Product':
                    data['name']  = obj.get('name','').strip()
                    data['desc']  = obj.get('description','').strip()
                    data['ean']   = (obj.get('gtin13') or obj.get('gtin') or obj.get('gtin8','') or '').strip()
                    data['sku']   = obj.get('sku','').strip()
                    imgs = obj.get('image', [])
                    if isinstance(imgs, str): imgs = [imgs]
                    data['images'] = [i if isinstance(i,str) else i.get('url','') for i in imgs][:3]
                    brand = obj.get('brand', {})
                    data['brand'] = (brand.get('name','') if isinstance(brand,dict) else str(brand)).strip()
            except: pass

        # 2. Tabela atrybutów WooCommerce
        specs = []
        tbl = soup.find('table', class_=re.compile('woocommerce-product-attributes'))
        if tbl:
            for row in tbl.find_all('tr'):
                th = row.find('th'); td = row.find('td')
                if th and td:
                    label = th.get_text(strip=True)
                    value = re.sub(r'\s+', ' ', td.get_text(' ', strip=True))
                    if label and value:
                        specs.append({'label': label, 'value': value})
        data['specs'] = specs

        # 3. Fallback EAN z tekstu
        if not data.get('ean'):
            m = re.search(r'\b(\d{13})\b', r.text)
            if m: data['ean'] = m.group(1)

        # 4. Zdjęcie fallback
        if not data.get('images'):
            og = soup.find('meta', property='og:image')
            if og and og.get('content'):
                data['images'] = [og['content']]

        return data if data.get('name') or data.get('ean') else None
    except Exception as e:
        print(f"    scrape error ({url}): {e}")
        return None

async def get_product_urls_from_category(browser, bech_path, max_pages=20):
    """Używa Playwright żeby pobrać URL produktów ze stron kategorii (JS rendering)."""
    page = await browser.new_page()
    all_urls = []
    try:
        for page_num in range(1, max_pages + 1):
            url = f"https://www.bechcicki.pl/{bech_path}"
            if page_num > 1:
                url += f"?page={page_num}"
            await page.goto(url, wait_until='networkidle', timeout=30000)
            await page.wait_for_timeout(1500)

            urls = await page.evaluate("""() => {
                const links = Array.from(document.querySelectorAll('a[href]'))
                    .map(a => a.href)
                    .filter(h => /bechcicki\\.pl\\/[a-z0-9-]+-id-p-\\d+/.test(h));
                return [...new Set(links)];
            }""")

            if not urls:
                break
            all_urls.extend(urls)
            # Sprawdź czy jest kolejna strona
            has_next = await page.evaluate("""() => {
                return !!document.querySelector('a[href*="page=' + (""" + str(page_num + 1) + """) + '"]');
            }""")
            if not has_next:
                break
            time.sleep(0.5)
    except Exception as e:
        print(f"  Playwright error: {e}")
    finally:
        await page.close()
    return list(set(all_urls))

async def sync_category(browser, bech_path, sanity_slug, log):
    """Sync jednej kategorii: pobierz produkty z bechcicki → dopasuj EAN → update Sanity."""
    print(f"\n{'='*60}")
    print(f"Kategoria: {bech_path} → {sanity_slug}")

    # Pobierz URLe produktów
    prod_urls = await get_product_urls_from_category(browser, bech_path)
    print(f"  Znaleziono {len(prod_urls)} produktów na bechcicki.pl")

    # Pobierz produkty z tej kategorii w Sanity
    san_prods = san_query(f'''*[_type=="product" && category->slug.current=="{sanity_slug}" && !(name match "P-*")]
        {{_id,name,ean,"imgRef":mainImage.asset._ref}}[0..500]''') or []
    san_by_ean = {p['ean']: p for p in san_prods if p.get('ean')}
    # Klucze znormalizowane: "Wełna fasadowa" → "welna fasadowa"
    # Dzięki temu match działa nawet gdy bechcicki i Sanity mają różne kodowanie ł/ą/ę
    san_by_name = {normalize_name(p['name']): p for p in san_prods if p.get('name')}
    print(f"  Produktów w Sanity: {len(san_prods)} ({len(san_by_ean)} z EAN, {len(san_by_name)} z nazwą)")

    updated = skipped = errors = 0

    for i, url in enumerate(prod_urls):
        print(f"  [{i+1}/{len(prod_urls)}] {url.split('/')[-1][:50]}...", end=' ', flush=True)

        bech = scrape_product_page(url)
        if not bech:
            print("SKIP (brak danych)")
            skipped += 1
            log.append({'url': url, 'status': 'skip_no_data', 'cat': sanity_slug})
            time.sleep(0.3)
            continue

        # Dopasuj po EAN lub nazwie (znormalizowanej — bez polskich znaków)
        san_prod = None
        if bech.get('ean'):
            san_prod = san_by_ean.get(bech['ean'])
        if not san_prod and bech.get('name'):
            san_prod = san_by_name.get(normalize_name(bech['name']))

        if not san_prod:
            print("SKIP (brak w Sanity)")
            skipped += 1
            log.append({'url': url, 'status': 'skip_not_in_sanity', 'name': bech.get('name',''), 'ean': bech.get('ean',''), 'cat': sanity_slug})
            time.sleep(0.3)
            continue

        # Zbuduj patch
        patch = {}

        # Nazwa — z bechcicki.pl jest lepsza (poprawna)
        if bech.get('name') and len(bech['name']) > 5:
            patch['name'] = bech['name']

        # Opis
        if bech.get('desc') and len(bech['desc']) > 20:
            patch['shortDescription'] = bech['desc'][:500]

        # Parametry techniczne
        if bech.get('specs') and len(bech['specs']) >= 2:
            patch['technicalSpec'] = bech['specs']

        # Zdjęcie — uploaduj tylko jeśli brak lub złe
        current_img = san_prod.get('imgRef','') or ''
        if bech.get('images') and (not current_img or BAD_ASSET in current_img):
            asset_id = upload_image(bech['images'][0])
            if asset_id:
                patch['mainImage'] = {'_type':'image','asset':{'_type':'reference','_ref':asset_id}}

        if not patch:
            print("OK (bez zmian)")
            continue

        ok = san_mutate([{"patch": {"id": san_prod['_id'], "set": patch}}])
        if ok:
            fields = ', '.join(k for k in patch)
            print(f"UPDATED ({fields})")
            updated += 1
            log.append({'url': url, 'status': 'updated', 'id': san_prod['_id'], 'name': bech.get('name',''), 'fields': fields})
        else:
            print("ERR (Sanity)")
            errors += 1
            log.append({'url': url, 'status': 'error', 'id': san_prod['_id']})

        time.sleep(0.8)

    print(f"\n  Wynik: updated={updated}, skipped={skipped}, errors={errors}")

    # VERIFY: ponowne zapytanie do Sanity — sprawdź ile produktów ma teraz dane pola
    if updated > 0:
        verify = san_query(f'''*[_type=="product" && category->slug.current=="{sanity_slug}"] {{
            "hasName": name != null,
            "hasDesc": shortDescription != null,
            "hasSpecs": count(technicalSpec) > 0,
            "hasImg": mainImage != null
        }}''') or []
        if verify:
            has_desc  = sum(1 for p in verify if p.get('hasDesc'))
            has_specs = sum(1 for p in verify if p.get('hasSpecs'))
            has_img   = sum(1 for p in verify if p.get('hasImg'))
            total_v   = len(verify)
            print(f"  VERIFY [{sanity_slug}]: {total_v} produktów | "
                  f"opisy: {has_desc}/{total_v} | "
                  f"specs: {has_specs}/{total_v} | "
                  f"zdjęcia: {has_img}/{total_v}")

    return updated, skipped, errors

async def main():
    filter_slug = sys.argv[1] if len(sys.argv) > 1 else None
    cats = [(p, s) for p, s in CATEGORIES if not filter_slug or filter_slug in s or filter_slug in p]
    print(f"Sync {len(cats)} kategorii z bechcicki.pl → Sanity")

    log = []
    total_upd = total_skip = total_err = 0

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        try:
            for bech_path, sanity_slug in cats:
                upd, skip, err = await sync_category(browser, bech_path, sanity_slug, log)
                total_upd += upd; total_skip += skip; total_err += err
        finally:
            await browser.close()

    # Zapisz log
    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.dump({'updated': total_upd, 'skipped': total_skip, 'errors': total_err, 'log': log}, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"GOTOWE: updated={total_upd}, skipped={total_skip}, errors={total_err}")
    print(f"Log: {LOG_FILE}")

if __name__ == '__main__':
    asyncio.run(main())
