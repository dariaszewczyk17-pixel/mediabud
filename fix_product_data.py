#!/usr/bin/env python3
"""
fix_product_data.py
Naprawia produkty z błędnymi parametrami technicznymi i kategoriami.
Dla każdego produktu z dim_mismatches.json szuka go na bechcicki.pl i aktualizuje dane w Sanity.
"""
import requests, json, re, time, os
from urllib.parse import quote_plus

TOKEN = "skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J"
SANITY_BASE = "https://nzcwegq7.api.sanity.io/v2021-06-07/data"
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
BECHCICKI = "https://www.bechcicki.pl"

LOG_FILE = "fix_products_log.json"
WORK_DIR = os.path.dirname(os.path.abspath(__file__))

def sq(query):
    r = requests.get(f"{SANITY_BASE}/query/production", params={"query": query}, headers=HEADERS, timeout=30)
    return r.json().get("result", [])

def sq_one(query):
    r = requests.get(f"{SANITY_BASE}/query/production", params={"query": query}, headers=HEADERS, timeout=30)
    return r.json().get("result")

def clean_name_for_search(name):
    """Wyciągnij kluczowe słowa z SEO-nazwy do wyszukiwania."""
    # Usuń nadmiarowe spacje i normalizuj
    name = re.sub(r'\s+', ' ', name).strip()
    # Weź pierwsze 5-7 słów - to zazwyczaj marka + produkt + kluczowy wymiar
    words = name.split()
    # Usuń słowa-śmieci
    stop_words = {'do', 'i', 'w', 'na', 'z', 'ze', 'dla', 'lub', 'oraz', 'opak', 'opakowanie', 'szt', 'sztuk'}
    words = [w for w in words if w.lower() not in stop_words]
    return ' '.join(words[:7])

def search_bechcicki(query):
    """Szukaj produktu na bechcicki.pl przez ich stronę wyszukiwarki."""
    try:
        url = f"{BECHCICKI}/?s={quote_plus(query)}&post_type=product"
        r = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code != 200:
            return None
        return r.text
    except Exception as e:
        print(f"  Search error: {e}")
        return None

def extract_product_url_from_search(html, name):
    """Wyciągnij URL pierwszego produktu z wyników wyszukiwania."""
    if not html:
        return None
    # Szukaj linków do produktów
    pattern = r'href="(https://www\.bechcicki\.pl/produkt/[^"]+)"'
    urls = re.findall(pattern, html)
    if urls:
        return urls[0]
    # Alternatywny wzorzec
    pattern2 = r'href="(https://www\.bechcicki\.pl/[^"]*produkt[^"]+)"'
    urls2 = re.findall(pattern2, html)
    if urls2:
        return urls2[0]
    return None

def get_product_data_from_bechcicki(product_url):
    """Pobierz dane produktu ze strony bechcicki.pl."""
    try:
        r = requests.get(product_url, timeout=20, headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code != 200:
            return None
        html = r.text
        data = {}

        # Wyciągnij JSON-LD (structured data)
        ld_matches = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
        for ld in ld_matches:
            try:
                obj = json.loads(ld)
                if isinstance(obj, dict) and obj.get('@type') == 'Product':
                    data['name'] = obj.get('name', '')
                    data['description'] = obj.get('description', '')
                    imgs = obj.get('image', [])
                    if isinstance(imgs, list) and imgs:
                        data['image_url'] = imgs[0] if isinstance(imgs[0], str) else imgs[0].get('url','')
                    elif isinstance(imgs, str):
                        data['image_url'] = imgs
                    # Brand
                    brand = obj.get('brand', {})
                    if isinstance(brand, dict):
                        data['brand'] = brand.get('name', '')
            except:
                pass

        # Wyciągnij parametry techniczne z tabeli
        specs = []
        # Wzorzec tabeli atrybutów WooCommerce
        table_match = re.search(r'<table[^>]*class="[^"]*woocommerce-product-attributes[^"]*"[^>]*>(.*?)</table>', html, re.DOTALL)
        if table_match:
            rows = re.findall(r'<tr[^>]*>(.*?)</tr>', table_match.group(1), re.DOTALL)
            for row in rows:
                label_m = re.search(r'<th[^>]*>(.*?)</th>', row, re.DOTALL)
                value_m = re.search(r'<td[^>]*>(.*?)</td>', row, re.DOTALL)
                if label_m and value_m:
                    label = re.sub(r'<[^>]+>', '', label_m.group(1)).strip()
                    value = re.sub(r'<[^>]+>', '', value_m.group(1)).strip()
                    if label and value:
                        specs.append({'label': label, 'value': value})

        # Szukaj też w sekcji "Specyfikacja" lub "Parametry techniczne"
        if not specs:
            spec_section = re.search(r'(?:Specyfikacja|Parametry techniczne|Dane techniczne)(.*?)(?:</section|</div>(?:\s*</div>){2})', html, re.DOTALL | re.IGNORECASE)
            if spec_section:
                rows = re.findall(r'<(?:dt|th)[^>]*>(.*?)</(?:dt|th)>.*?<(?:dd|td)[^>]*>(.*?)</(?:dd|td)>', spec_section.group(1), re.DOTALL)
                for label, value in rows:
                    label = re.sub(r'<[^>]+>', '', label).strip()
                    value = re.sub(r'<[^>]+>', '', value).strip()
                    if label and value:
                        specs.append({'label': label, 'value': value})

        data['technicalSpec'] = specs

        # Wyciągnij zdjęcia produktu
        if not data.get('image_url'):
            img_match = re.search(r'class="[^"]*woocommerce-product-gallery[^"]*".*?src="([^"]+)"', html, re.DOTALL)
            if img_match:
                data['image_url'] = img_match.group(1)

        return data if (data.get('name') or data.get('technicalSpec')) else None
    except Exception as e:
        print(f"  Error fetching product page: {e}")
        return None

def upload_image_to_sanity(image_url):
    """Pobierz obraz i uploaduj do Sanity."""
    try:
        r = requests.get(image_url, timeout=20, headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code != 200:
            return None
        ext = 'jpg'
        if 'png' in image_url.lower():
            ext = 'png'
        elif 'webp' in image_url.lower():
            ext = 'webp'
        
        upload_headers = {
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": f"image/{ext}"
        }
        resp = requests.post(
            f"https://nzcwegq7.api.sanity.io/v2021-06-07/assets/images/production",
            data=r.content,
            headers=upload_headers,
            timeout=60
        )
        if resp.status_code in [200, 201]:
            result = resp.json()
            asset_id = result.get('document', {}).get('_id')
            return asset_id
        return None
    except Exception as e:
        print(f"  Image upload error: {e}")
        return None

def update_product_in_sanity(product_id, patch):
    """Aktualizuj produkt w Sanity."""
    mutations = [{"patch": {"id": product_id, "set": patch}}]
    r = requests.post(
        f"{SANITY_BASE}/mutate/production",
        headers=HEADERS,
        json={"mutations": mutations},
        timeout=30
    )
    return r.status_code in [200, 201]

def fix_dimension_mismatches():
    """Napraw produkty z błędnymi wymiarami."""
    mismatch_file = os.path.join(WORK_DIR, 'dim_mismatches.json')
    with open(mismatch_file, 'r', encoding='utf-8') as f:
        mismatches = json.load(f)
    
    log = []
    fixed = 0
    skipped = 0
    
    print(f"Naprawianie {len(mismatches)} produktów z mismatch wymiarów...")
    
    for i, prod in enumerate(mismatches):
        pid = prod['_id']
        name = prod['name']
        print(f"\n[{i+1}/{len(mismatches)}] {name[:60]}...")
        print(f"  Wymiary w nazwie: {prod['name_dims']} | W spec: {prod['spec_dims']}")
        
        # Przygotuj query wyszukiwania
        search_query = clean_name_for_search(name)
        
        # Szukaj na bechcicki.pl
        search_html = search_bechcicki(search_query)
        if not search_html:
            print(f"  SKIP: brak wyników wyszukiwania")
            log.append({'id': pid, 'name': name, 'status': 'skip_no_search'})
            skipped += 1
            time.sleep(1)
            continue
        
        # Wyciągnij URL produktu
        product_url = extract_product_url_from_search(search_html, name)
        if not product_url:
            print(f"  SKIP: nie znaleziono URL produktu")
            log.append({'id': pid, 'name': name, 'status': 'skip_no_url'})
            skipped += 1
            time.sleep(1)
            continue
        
        print(f"  Znaleziono: {product_url[:80]}")
        
        # Pobierz dane ze strony produktu
        bech_data = get_product_data_from_bechcicki(product_url)
        if not bech_data or not bech_data.get('technicalSpec'):
            print(f"  SKIP: brak parametrów technicznych na stronie bechcicki.pl")
            log.append({'id': pid, 'name': name, 'status': 'skip_no_specs', 'url': product_url})
            skipped += 1
            time.sleep(1)
            continue
        
        # Sprawdź czy nowe specs mają właściwe wymiary
        new_specs = bech_data['technicalSpec']
        spec_text = json.dumps(new_specs, ensure_ascii=False).lower()
        new_dims = set(re.findall(r'\b(\d{2,4})\s*(?:cm|mm)\b', spec_text))
        name_dims = set(prod['name_dims'])
        
        if not (name_dims & new_dims):
            print(f"  WARN: nowe spec też nie pasują do nazwy (name_dims={name_dims}, new={new_dims})")
            log.append({'id': pid, 'name': name, 'status': 'warn_still_mismatch', 'url': product_url, 'new_dims': list(new_dims)})
            # Mimo to zaktualizuj - lepsze dane niż poprzednie
        
        # Zbuduj patch
        patch = {}
        if new_specs:
            patch['technicalSpec'] = new_specs
        
        # Krótki opis z bechcicki.pl
        if bech_data.get('description'):
            desc = bech_data['description'][:500].strip()
            if len(desc) > 50:
                patch['shortDescription'] = desc
        
        # Pełna nazwa z bechcicki.pl (jeśli sensowna)
        bech_name = bech_data.get('name', '').strip()
        if bech_name and 5 < len(bech_name) < 200:
            patch['nameFromBechcicki'] = bech_name  # Zapisz do oddzielnego pola - nie nadpisuj SEO name
        
        # Zdjęcie
        image_url = bech_data.get('image_url', '')
        if image_url and 'placeholder' not in image_url.lower():
            asset_id = upload_image_to_sanity(image_url)
            if asset_id:
                patch['mainImage'] = {
                    '_type': 'image',
                    'asset': {'_type': 'reference', '_ref': asset_id}
                }
                print(f"  Obraz uploadowany: {asset_id}")
        
        if not patch:
            print(f"  SKIP: brak danych do zaktualizowania")
            skipped += 1
            continue
        
        # Aktualizuj w Sanity
        success = update_product_in_sanity(pid, patch)
        if success:
            print(f"  OK: zaktualizowano ({len(new_specs)} spec, {'img' if 'mainImage' in patch else 'no img'})")
            log.append({'id': pid, 'name': name, 'status': 'fixed', 'url': product_url, 'specs_count': len(new_specs)})
            fixed += 1
        else:
            print(f"  ERR: błąd aktualizacji Sanity")
            log.append({'id': pid, 'name': name, 'status': 'error', 'url': product_url})
            skipped += 1
        
        time.sleep(1.5)  # Szanuj serwer bechcicki.pl
    
    # Zapisz log
    log_path = os.path.join(WORK_DIR, LOG_FILE)
    with open(log_path, 'w', encoding='utf-8') as f:
        json.dump({'fixed': fixed, 'skipped': skipped, 'log': log}, f, ensure_ascii=False, indent=2)
    
    print(f"\n=== GOTOWE ===")
    print(f"Naprawiono: {fixed}, Pominięto: {skipped}")
    print(f"Log: {log_path}")

if __name__ == '__main__':
    fix_dimension_mismatches()
