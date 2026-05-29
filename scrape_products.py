
"""
Pipeline scrapingu danych produktów MediaBud
============================================
Źródła: bechcicki.pl, strony producentów, konkurencja
Wynik: products_data.jsonl — name, shortDescription, description, technicalSpec[], brand, ean
"""

import asyncio
import json
import re
import time
import os
from pathlib import Path
from playwright.async_api import async_playwright

WORKSPACE = "/data/workspace/919fac5a-210e-47ca-8b62-27ddea343c50/mediabud"
OUT_FILE  = f"{WORKSPACE}/products_data.jsonl"
LOG_FILE  = f"{WORKSPACE}/scrape_log.txt"

# ─── Bechcicki L3 kategorie ───────────────────────────────────────────────────
# Kolejność: najpopularniejsze kategorie najpierw
BECHCICKI_CATS = [
    # Farby (duże wolumeny)
    "farby-i-rozpuszczalniki/farby-elewacyjne/farby-elewacyjne-akrylowe",
    "farby-i-rozpuszczalniki/farby-elewacyjne/farby-elewacyjne-silikatowe",
    "farby-i-rozpuszczalniki/farby-elewacyjne/farby-elewacyjne-silikonowe",
    "farby-i-rozpuszczalniki/farby-elewacyjne/farby-elewacyjne-emulsyjne",
    "farby-i-rozpuszczalniki/farby-elewacyjne/farby-elewacyjne-specjalne",
    "farby-i-rozpuszczalniki/farby-wewnetrzne/farby-wewnetrzne-biale",
    "farby-i-rozpuszczalniki/farby-wewnetrzne/farby-wewnetrzne-kolorowe",
    "farby-i-rozpuszczalniki/farby-do-metalu/emalie-akrylowe",
    "farby-i-rozpuszczalniki/farby-do-metalu/emalie-ftalowe",
    "farby-i-rozpuszczalniki/farby-do-metalu/emalie-chlorokauczukowe",
    "farby-i-rozpuszczalniki/farby-specjalistyczne/farby-proszkowe",
    "farby-i-rozpuszczalniki/farby-specjalistyczne/farby-przemyslowe",
    # Tynki
    "chemia-budowlana/tynki/tynki-gipsowe",
    "chemia-budowlana/tynki/tynki-cementowo-wapienne",
    "chemia-budowlana/tynki/tynki-elewacyjne",
    "chemia-budowlana/tynki/tynki-specjalne",
    # Kleje
    "chemia-budowlana/kleje/kleje-do-glazury",
    "chemia-budowlana/kleje/kleje-do-styropianu-i-styroduru",
    "chemia-budowlana/kleje/kleje-montazowe",
    "chemia-budowlana/kleje/kleje-do-welen",
    # Izolacje
    "izolacje/styropiany/styropiany-fasadowe-eps",
    "izolacje/styropiany/styropian-dach-podloga-eps",
    "izolacje/welny/welny-fasadowe",
    "izolacje/welny/welny-do-poddaszy",
    "izolacje/welny/welny-do-dachow-plaskich",
    "izolacje/hydroizolacje/hydroizolacje-bitumiczne",
    "izolacje/hydroizolacje/hydroizolacje-mineralne",
    # Narzędzia
    "narzedzia-i-mocowania/narzedzia-malarskie/walki-malarskie",
    "narzedzia-i-mocowania/narzedzia-malarskie/pedzle",
    "narzedzia-i-mocowania/elementy-mocujace-uniwersalne/kolki-i-wkrety-uniwersalne",
    # Dachy
    "dachy/pokrycia-dachowe/dachowki-ceramiczne",
    "dachy/systemy-kominowe/kominy-ceramiczne",
    "dachy/systemy-kominowe/kominy-stalowe",
    # Płytki
    "plytki/plytki-ceramiczne/plytki-scienne",
    "plytki/plytki-ceramiczne/plytki-tarasowe",
    # Sucha zabudowa
    "sucha-zabudowa/plyty/plyty-gipsowo-kartonowe",
    "sucha-zabudowa/mocowania-do-suchej-zabudowy/wkrety-do-suchej-zabudowy",
    "sucha-zabudowa/mocowania-do-suchej-zabudowy/laczniki-do-profili",
    # Stropy
    "stropy-i-sciany/systemy-kominowe/akcesoria-do-kominow",
    "stropy-i-sciany/schody-i-akcesoria-strychowe/schody-strychowe",
    # Sufity
    "sufity-podwieszane/profile-do-sufitow-podwieszanych/profile-nosne-glowne-do-sufitow-podwieszanych",
    # Zaprawy
    "chemia-budowlana/zaprawy/zaprawy-murarskie-ogolnego-zastosowania",
    "chemia-budowlana/gipsy-i-gladzie/gipsy-szpachlowe",
    "chemia-budowlana/grunty/grunty-uniwersalne",
]

def log(msg):
    ts = time.strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")

def save_products(products):
    """Zapisz produkty do JSONL (append)"""
    with open(OUT_FILE, "a") as f:
        for p in products:
            f.write(json.dumps(p, ensure_ascii=False) + "\n")

async def extract_products_from_page(page, url: str) -> list:
    """Wyciągnij dane produktów ze strony kategorii bechcicki.pl"""
    try:
        await page.goto(url, timeout=20000, wait_until="networkidle")
        await page.wait_for_timeout(2000)
        
        # Wyciągnij wszystkie dane produktów przez JS
        products = await page.evaluate("""
        () => {
            const results = [];
            // Szukaj elementów produktów
            const selectors = [
                '[class*="product-tile"]',
                '[class*="ProductTile"]',
                '[class*="product-card"]',
                '[class*="ProductCard"]',
                '[data-product-id]',
                '[data-sku]',
            ];
            
            let items = [];
            for (const sel of selectors) {
                items = document.querySelectorAll(sel);
                if (items.length > 0) break;
            }
            
            items.forEach(item => {
                const nameEl = item.querySelector('h2, h3, [class*="name"], [class*="title"]');
                const urlEl = item.querySelector('a[href*="id-bud"]');
                const eanEl = item.querySelector('[data-ean]');
                const skuEl = item.querySelector('[data-sku]');
                const descEl = item.querySelector('[class*="desc"], [class*="short"]');
                
                const name = nameEl?.textContent?.trim() || '';
                const href = urlEl?.getAttribute('href') || '';
                const ean = eanEl?.getAttribute('data-ean') || item.getAttribute('data-ean') || '';
                const sku = skuEl?.getAttribute('data-sku') || item.getAttribute('data-sku') || '';
                const desc = descEl?.textContent?.trim() || '';
                
                if (name && href) {
                    results.push({ name, url: href, ean, sku, shortDescription: desc });
                }
            });
            return results;
        }
        """)
        
        log(f"  → {len(products)} produktów na stronie (selektor DOM)")
        
        # Jeśli DOM nie zadziałał, próbuj __NUXT__ store
        if len(products) == 0:
            products = await extract_from_nuxt(page)
        
        return products
    except Exception as e:
        log(f"  ERROR: {e}")
        return []

async def extract_from_nuxt(page) -> list:
    """Wyciągnij dane z Nuxt store po wyrenderowaniu strony"""
    try:
        data = await page.evaluate("""
        () => {
            // Szukaj danych w Nuxt/Vue instance lub window state
            const nuxt = window.__NUXT__;
            if (!nuxt) return [];
            
            const results = [];
            
            // Rekursywnie przeszukaj obiekt w poszukiwaniu tablic produktów
            function findProducts(obj, depth=0) {
                if (depth > 6 || !obj) return;
                if (Array.isArray(obj)) {
                    // Sprawdź czy to tablica produktów (mają name i url/slug)
                    if (obj.length > 0 && obj[0] && typeof obj[0] === 'object') {
                        const first = obj[0];
                        if ((first.name || first.title) && 
                            (first.url || first.slug || first.id) &&
                            obj.length > 2) {
                            obj.forEach(p => {
                                if (typeof p !== 'object') return;
                                const name = p.name || p.title || '';
                                const url = p.url || p.slug || '';
                                const ean = p.ean || p.barcode || '';
                                const sku = p.sku || p.symbol || p.code || '';
                                const shortDesc = p.shortDescription || p.short_description || 
                                                  p.lead || p.excerpt || '';
                                if (name.length > 3) {
                                    results.push({ name, url, ean: String(ean), sku: String(sku), 
                                                   shortDescription: shortDesc });
                                }
                            });
                        }
                    }
                    obj.forEach(item => findProducts(item, depth+1));
                } else if (typeof obj === 'object') {
                    Object.values(obj).forEach(val => findProducts(val, depth+1));
                }
            }
            
            findProducts(nuxt);
            return results.slice(0, 500); // max 500 per strona
        }
        """)
        log(f"  → {len(data)} produktów z __NUXT__")
        return data
    except Exception as e:
        log(f"  NUXT ERROR: {e}")
        return []

async def scrape_product_page(page, url: str, name: str) -> dict:
    """Pobierz pełne dane ze strony produktu"""
    full_url = f"https://www.bechcicki.pl{url}" if url.startswith("/") else url
    try:
        await page.goto(full_url, timeout=20000, wait_until="networkidle")
        await page.wait_for_timeout(1500)
        
        data = await page.evaluate("""
        () => {
            // Opis
            const descSelectors = [
                '[class*="description"]', '[class*="Description"]',
                '[class*="product-desc"]', '[class*="ProductDesc"]',
                '.description', '#description', '[itemprop="description"]'
            ];
            let description = '';
            for (const sel of descSelectors) {
                const el = document.querySelector(sel);
                if (el && el.textContent.length > 50) {
                    description = el.textContent.trim();
                    break;
                }
            }
            
            // Short description
            const shortEl = document.querySelector(
                '[class*="short-desc"], [class*="shortDesc"], [class*="lead"], .product__lead'
            );
            const shortDescription = shortEl?.textContent?.trim() || '';
            
            // Parametry techniczne — tabele
            const specs = [];
            const tables = document.querySelectorAll('table, [class*="spec"], [class*="Spec"], [class*="param"], [class*="Param"]');
            tables.forEach(table => {
                const rows = table.querySelectorAll('tr, [class*="row"], li');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td, th, [class*="label"], [class*="value"], dt, dd');
                    if (cells.length >= 2) {
                        const label = cells[0].textContent.trim();
                        const value = cells[1].textContent.trim();
                        if (label && value && label.length < 100 && value.length < 200) {
                            specs.push({ label, value });
                        }
                    }
                });
            });
            
            // Próbuj też z Nuxt store dla specs
            const nuxtSpecs = [];
            try {
                const nuxt = window.__NUXT__;
                // Szukaj characteristics/parameters w Nuxt
                function findSpecs(obj, depth=0) {
                    if (depth > 8 || !obj) return;
                    if (Array.isArray(obj)) {
                        if (obj.length > 0 && obj[0]?.label && obj[0]?.value) {
                            obj.forEach(s => {
                                if (s.label && s.value) {
                                    nuxtSpecs.push({ label: String(s.label).trim(), value: String(s.value).trim() });
                                }
                            });
                            return;
                        }
                        if (obj.length > 0 && obj[0]?.name && obj[0]?.value) {
                            obj.forEach(s => {
                                if (s.name && s.value) {
                                    nuxtSpecs.push({ label: String(s.name).trim(), value: String(s.value).trim() });
                                }
                            });
                            return;
                        }
                        obj.forEach(i => findSpecs(i, depth+1));
                    } else if (typeof obj === 'object') {
                        Object.values(obj).forEach(v => findSpecs(v, depth+1));
                    }
                }
                findSpecs(nuxt);
            } catch(e) {}
            
            const finalSpecs = nuxtSpecs.length > 0 ? nuxtSpecs : specs;
            
            // EAN, SKU, nazwa
            const eanEl = document.querySelector('[itemprop="gtin13"], [data-ean], [class*="ean"]');
            const ean = eanEl?.textContent?.trim() || eanEl?.getAttribute('data-ean') || '';
            
            return { description, shortDescription, technicalSpec: finalSpecs.slice(0, 50), ean };
        }
        """)
        
        return data
    except Exception as e:
        log(f"  PROD ERROR {name}: {e}")
        return {}

async def scrape_manufacturer_site(page, product_name: str, brand: str) -> dict:
    """Szukaj danych produktu na stronie producenta lub Google"""
    brand_lower = brand.lower()
    
    # Mapowanie marek → domeny
    BRAND_SITES = {
        "ceresit":  "ceresit.pl",
        "knauf":    "knauf.pl", 
        "weber":    "pl.weber",
        "mapei":    "mapei.pl",
        "baumit":   "baumit.com/pl",
        "swisspor": "swisspor.pl",
        "isover":   "isover.pl",
        "rockwool": "rockwool.com/pl",
        "knauff":   "knauf.pl",
        "sopro":    "sopro.pl",
        "atlas":    "atlasbudowlany.pl",
        "tytan":    "e-tytan.pl",
        "caparol":  "caparol.pl",
    }
    
    site = BRAND_SITES.get(brand_lower, "")
    
    # Google search
    search_q = f"{product_name} {brand} opis techniczny"
    if site:
        search_q += f" site:{site}"
    
    try:
        search_url = f"https://www.google.pl/search?q={requests.utils.quote(search_q)}"
        await page.goto(search_url, timeout=15000, wait_until="networkidle")
        await page.wait_for_timeout(1000)
        
        # Pobierz snippety z wyników
        snippets = await page.evaluate("""
        () => {
            const results = [];
            document.querySelectorAll('[data-sncf], .g, [class*="result"]').forEach(r => {
                const title = r.querySelector('h3')?.textContent || '';
                const snippet = r.querySelector('[class*="snippet"], .IsZvec, [class*="VwiC3b"]')?.textContent || '';
                const link = r.querySelector('a')?.href || '';
                if (title && snippet) results.push({ title, snippet, link });
            });
            return results.slice(0, 5);
        }
        """)
        return {"google_snippets": snippets}
    except Exception as e:
        return {}


async def main_scrape():
    """Główny pipeline scrapingu"""
    log("=== START SCRAPINGU ===")
    
    # Wyczyść stary plik jeśli exists
    if os.path.exists(OUT_FILE):
        os.rename(OUT_FILE, OUT_FILE + ".bak")
    
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
        )
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            locale="pl-PL",
            viewport={"width": 1280, "height": 800}
        )
        page = await context.new_page()
        
        total_products = 0
        
        # ── FAZA 1: Scraping kategorii bechcicki.pl ──────────────────────────
        log(f"FAZA 1: {len(BECHCICKI_CATS)} kategorii bechcicki.pl")
        
        for cat_path in BECHCICKI_CATS:
            url = f"https://www.bechcicki.pl/{cat_path}"
            log(f"Kategoria: {cat_path}")
            
            products = await extract_products_from_page(page, url)
            
            if products:
                # Dla każdego produktu pobierz pełne dane
                enriched = []
                for p in products[:50]:  # max 50 per kategoria w fazie 1
                    if p.get("url"):
                        details = await scrape_product_page(page, p["url"], p.get("name",""))
                        merged = {**p, **details, "source": "bechcicki"}
                        enriched.append(merged)
                    else:
                        enriched.append({**p, "source": "bechcicki"})
                
                save_products(enriched)
                total_products += len(enriched)
                log(f"  Zapisano {len(enriched)} produktów (łącznie: {total_products})")
            
            await asyncio.sleep(1)  # pauza między kategoriami
        
        await browser.close()
    
    log(f"=== KONIEC. Łącznie: {total_products} produktów ===")
    return total_products


if __name__ == "__main__":
    import requests  # for quote
    asyncio.run(main_scrape())
