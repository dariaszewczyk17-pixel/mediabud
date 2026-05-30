/**
 * generate-sitemap.mjs  v2
 * ─────────────────────────────────────────────────────────────────────────────
 * Mechanizmy:
 *  1. Quality score   — priorytet URL na podstawie kompletności danych produktu
 *  2. Dynamiczny changefreq — na bazie _updatedAt (daily/weekly/monthly/yearly)
 *  3. Sitemap index   — 4 oddzielne pliki zamiast jednego 5 MB molocha
 *  4. Raport JSON     — coverage%, statystyki jakości przy każdym buildzie
 *  5. Google ping     — powiadomienie Googlebota po wygenerowaniu
 *
 * Uruchamiany przez: npm run postbuild  lub  node scripts/generate-sitemap.mjs
 */

import fs   from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── Ścieżki ─────────────────────────────────────────────────────────────────
const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const ROOT       = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR   = path.join(ROOT, 'dist');

// ─── Konfiguracja ─────────────────────────────────────────────────────────────
const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || 'nzcwegq7';
const DATASET    = process.env.VITE_SANITY_DATASET    || 'production';
const TOKEN      = process.env.SANITY_TOKEN || process.env.VITE_SANITY_TOKEN || '';
const BASE_URL   = (process.env.SITE_URL || 'https://mediabud.pl').replace(/\/$/, '');
const API_VER    = '2024-01-01';

// Próg jakości do podziału na full / partial
const SCORE_FULL_MIN    = 5;   // score ≥ 5 → pełny opis → sitemap-products-full
const SCORE_PARTIAL_MIN = 1;   // score 1–4 → częściowy → sitemap-products-partial
                                // score 0   → wykluczone ze sitemapki

// ─── Sanity helpers ──────────────────────────────────────────────────────────
const SANITY_BASE = `https://${PROJECT_ID}.api.sanity.io/v${API_VER}/data/query/${DATASET}`;

async function sanityQuery(query) {
  const url = `${SANITY_BASE}?query=${encodeURIComponent(query)}`;
  const headers = { 'Content-Type': 'application/json' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Sanity HTTP ${res.status}: ${await res.text()}`);
  return (await res.json()).result ?? [];
}

async function fetchAllPaginated(baseQuery, pageSize = 1000) {
  const results = [];
  let offset = 0;
  while (true) {
    const batch = await sanityQuery(`${baseQuery}[${offset}...${offset + pageSize}]`);
    results.push(...batch);
    if (batch.length < pageSize) break;
    offset += pageSize;
    process.stdout.write(`  pobrano ${results.length}...\r`);
  }
  return results;
}

// ─── Mechanizm 1: Quality score ──────────────────────────────────────────────
/**
 * Oblicza score kompletności produktu (0–8).
 * Każde brakujące pole to utrata punktów → niższy priorytet / wykluczenie.
 */
function calcScore(prod) {
  let score = 0;
  if (prod.hasDescription)  score += 2;  // shortDescription > 50 znaków
  if (prod.hasLongDesc)     score += 2;  // description > 200 znaków
  if (prod.hasImage)        score += 1;  // zdjęcie
  if (prod.hasTechSpec)     score += 1;  // technicalSpec[] niepuste
  if (prod.hasValidName)    score += 1;  // name > 10 znaków (nie SKU-only)
  if (prod.hasCategory)     score += 1;  // przypisana kategoria
  return score;                          // max: 8
}

function scoreToPriority(score) {
  if (score >= 7) return '0.9';
  if (score >= 5) return '0.7';
  if (score >= 3) return '0.5';
  if (score >= 1) return '0.3';
  return '0.1';
}

// ─── Mechanizm 2: Dynamiczny changefreq ──────────────────────────────────────
/**
 * Szacuje jak często Google powinien wracać na stronę,
 * na podstawie tego kiedy ją ostatnio aktualizowaliśmy.
 */
function calcChangefreq(updatedAt) {
  if (!updatedAt) return 'monthly';
  const daysSince = (Date.now() - new Date(updatedAt).getTime()) / 86_400_000;
  if (daysSince < 7)   return 'daily';    // świeżo po pipeline / aktualizacji
  if (daysSince < 30)  return 'weekly';
  if (daysSince < 180) return 'monthly';
  return 'yearly';
}

// ─── XML helpers ─────────────────────────────────────────────────────────────
function escapeXml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(iso) {
  if (!iso) return new Date().toISOString().slice(0, 10);
  return iso.slice(0, 10);
}

function xmlHeader() {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
  ].join('\n');
}

function urlEntry({ loc, lastmod, changefreq = 'monthly', priority = '0.7' }) {
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ];
  return lines.filter(Boolean).join('\n');
}

function buildUrlset(entries) {
  return [xmlHeader(), '', ...entries, '', '</urlset>'].join('\n');
}

// Zapisuje plik do public/ i (jeśli istnieje) do dist/
async function writeXml(filename, content) {
  await fs.writeFile(path.join(PUBLIC_DIR, filename), content, 'utf-8');
  try {
    await fs.access(DIST_DIR);
    await fs.writeFile(path.join(DIST_DIR, filename), content, 'utf-8');
  } catch { /* dist/ nie istnieje w trybie standalone */ }
  const kb = (Buffer.byteLength(content, 'utf-8') / 1024).toFixed(0);
  console.log(`  ✓ ${filename.padEnd(34)} (${String(kb).padStart(5)} KB)`);
}

// ─── Mechanizm 5: Google ping ────────────────────────────────────────────────
// UWAGA: Google deprecated ping endpoint w czerwcu 2023.
// Zgłoś sitemapę raz ręcznie w Google Search Console:
//   https://search.google.com/search-console → Sitemaps → Dodaj sitemapę
// GSC sam sprawdza zmiany regularnie po pierwszym zgłoszeniu.
async function pingGoogle(_sitemapUrl) {
  console.log('  ℹ Google ping pominięty (deprecated od 2023 — użyj GSC)');
}

// ─── Dane statyczne ──────────────────────────────────────────────────────────
const STATIC_PAGES = [
  { path: '/',          changefreq: 'weekly',  priority: '1.0' },
  { path: '/produkty',  changefreq: 'weekly',  priority: '0.9' },
  { path: '/kategoria', changefreq: 'weekly',  priority: '0.9' },
  { path: '/o-nas',     changefreq: 'monthly', priority: '0.7' },
  { path: '/kontakt',   changefreq: 'monthly', priority: '0.7' },
  { path: '/blog',      changefreq: 'weekly',  priority: '0.8' },
];

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const today    = new Date().toISOString().slice(0, 10);
  const nowIso   = new Date().toISOString();
  console.log(`\n🗺️  Sitemap generator v2 — ${today}`);

  // ── Pobierz kategorie ──────────────────────────────────────────────────────
  console.log('\n📂 Pobieranie kategorii...');
  let categories = [];
  try {
    categories = await fetchAllPaginated(
      `*[_type=="category" && defined(slug.current)]{slug, _updatedAt, depth}`
    );
    console.log(`  ✓ ${categories.length} kategorii`);
  } catch (e) {
    console.warn(`  ⚠ Błąd kategorii: ${e.message}`);
  }

  // ── Pobierz produkty z quality flags ──────────────────────────────────────
  console.log('\n📦 Pobieranie produktów z quality flags...');
  let rawProducts = [];
  try {
    // Mechanizm 1: GROQ zwraca flagi jakości — bez dodatkowych requestów
    rawProducts = await fetchAllPaginated(
      `*[_type=="product" && defined(slug.current) && !(name match "P-*")]{
        slug,
        _updatedAt,
        "hasDescription": defined(shortDescription) && length(shortDescription) > 50,
        "hasLongDesc":    defined(description)       && length(description) > 200,
        "hasImage":       defined(image),
        "hasTechSpec":    defined(technicalSpec)     && count(technicalSpec) > 0,
        "hasValidName":   defined(name)              && length(name) > 10,
        "hasCategory":    defined(category)
      }`
    );
    console.log(`  ✓ ${rawProducts.length} produktów pobrano`);
  } catch (e) {
    console.warn(`  ⚠ Błąd produktów: ${e.message}`);
  }

  // ── Klasyfikacja produktów wg score ───────────────────────────────────────
  const full     = [];   // score ≥ SCORE_FULL_MIN
  const partial  = [];   // score SCORE_PARTIAL_MIN – (SCORE_FULL_MIN-1)
  const excluded = [];   // score 0

  // Liczniki changefreq do raportu
  const freqCount = { daily: 0, weekly: 0, monthly: 0, yearly: 0 };

  for (const prod of rawProducts) {
    const score = calcScore(prod);
    prod._score = score;
    if (score >= SCORE_FULL_MIN)    full.push(prod);
    else if (score >= SCORE_PARTIAL_MIN) partial.push(prod);
    else excluded.push(prod);

    const freq = calcChangefreq(prod._updatedAt);
    freqCount[freq] = (freqCount[freq] ?? 0) + 1;
  }

  console.log(`\n  Klasyfikacja produktów:`);
  console.log(`  ✅ pełny opis   (score ≥ ${SCORE_FULL_MIN}): ${String(full.length).padStart(6)} → sitemap-products-full.xml`);
  console.log(`  ⚠️  częściowy   (score 1–${SCORE_FULL_MIN-1}): ${String(partial.length).padStart(6)} → sitemap-products-partial.xml`);
  console.log(`  ❌ wykluczony  (score 0): ${String(excluded.length).padStart(6)} → poza sitemapą`);
  console.log(`\n  Rozkład changefreq:`);
  console.log(`  daily: ${freqCount.daily}  weekly: ${freqCount.weekly}  monthly: ${freqCount.monthly}  yearly: ${freqCount.yearly}`);

  // ── Buduj pliki XML ────────────────────────────────────────────────────────
  console.log('\n✍️  Generowanie plików XML...');

  // 1. sitemap-core.xml — strony statyczne
  const coreEntries = STATIC_PAGES.map(p => urlEntry({
    loc:        `${BASE_URL}${p.path}`,
    lastmod:    today,
    changefreq: p.changefreq,
    priority:   p.priority,
  }));
  await writeXml('sitemap-core.xml', buildUrlset(coreEntries));

  // 2. sitemap-categories.xml — wszystkie kategorie
  const catEntries = categories
    .map(cat => {
      const slug = cat.slug?.current;
      if (!slug) return null;
      const depth = cat.depth ?? 2;
      return urlEntry({
        loc:        `${BASE_URL}/kategoria/${escapeXml(slug)}`,
        lastmod:    formatDate(cat._updatedAt),
        changefreq: 'weekly',
        priority:   depth <= 1 ? '0.9' : depth <= 2 ? '0.8' : '0.7',
      });
    })
    .filter(Boolean);
  await writeXml('sitemap-categories.xml', buildUrlset(catEntries));

  // 3. sitemap-products-full.xml — produkty z pełnymi opisami
  const fullEntries = full.map(prod => {
    const slug = prod.slug?.current;
    if (!slug) return null;
    return urlEntry({
      loc:        `${BASE_URL}/produkt/${escapeXml(slug)}`,
      lastmod:    formatDate(prod._updatedAt),
      changefreq: calcChangefreq(prod._updatedAt),
      priority:   scoreToPriority(prod._score),
    });
  }).filter(Boolean);
  await writeXml('sitemap-products-full.xml', buildUrlset(fullEntries));

  // 4. sitemap-products-partial.xml — produkty z częściowymi opisami
  const partialEntries = partial.map(prod => {
    const slug = prod.slug?.current;
    if (!slug) return null;
    return urlEntry({
      loc:        `${BASE_URL}/produkt/${escapeXml(slug)}`,
      lastmod:    formatDate(prod._updatedAt),
      changefreq: calcChangefreq(prod._updatedAt),
      priority:   scoreToPriority(prod._score),
    });
  }).filter(Boolean);
  await writeXml('sitemap-products-partial.xml', buildUrlset(partialEntries));

  // ── Mechanizm 3: sitemap index ─────────────────────────────────────────────
  const totalInSitemap = STATIC_PAGES.length + catEntries.length + fullEntries.length + partialEntries.length;

  const indexContent = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '',
    `  <!-- Wygenerowano: ${nowIso} | Łącznie URL: ${totalInSitemap} | Wykluczone: ${excluded.length} -->`,
    '',
    `  <sitemap><loc>${BASE_URL}/sitemap-core.xml</loc><lastmod>${today}</lastmod></sitemap>`,
    `  <sitemap><loc>${BASE_URL}/sitemap-categories.xml</loc><lastmod>${today}</lastmod></sitemap>`,
    `  <sitemap><loc>${BASE_URL}/sitemap-products-full.xml</loc><lastmod>${today}</lastmod></sitemap>`,
    `  <sitemap><loc>${BASE_URL}/sitemap-products-partial.xml</loc><lastmod>${today}</lastmod></sitemap>`,
    '',
    '</sitemapindex>',
  ].join('\n');

  await writeXml('sitemap.xml', indexContent);

  // ── Mechanizm 4: Raport JSON ───────────────────────────────────────────────
  const coveragePct = rawProducts.length > 0
    ? ((full.length / rawProducts.length) * 100).toFixed(1)
    : '0.0';

  const report = {
    generated:  nowIso,
    base_url:   BASE_URL,
    products: {
      total:              rawProducts.length,
      full_quality:       full.length,
      partial_quality:    partial.length,
      excluded:           excluded.length,
      coverage_pct:       parseFloat(coveragePct),
      score_thresholds: {
        full_min:    SCORE_FULL_MIN,
        partial_min: SCORE_PARTIAL_MIN,
      },
    },
    categories: {
      total: categories.length,
    },
    changefreq_distribution: freqCount,
    sitemap_files: {
      'sitemap.xml':                   '(index)',
      'sitemap-core.xml':              STATIC_PAGES.length,
      'sitemap-categories.xml':        catEntries.length,
      'sitemap-products-full.xml':     fullEntries.length,
      'sitemap-products-partial.xml':  partialEntries.length,
    },
    total_urls_in_sitemap: totalInSitemap,
    excluded_urls:         excluded.length,
  };

  const reportPath = path.join(PUBLIC_DIR, 'sitemap-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`  ✓ sitemap-report.json`);

  try {
    await fs.access(DIST_DIR);
    await fs.writeFile(path.join(DIST_DIR, 'sitemap-report.json'), JSON.stringify(report, null, 2), 'utf-8');
  } catch { /* dist/ nie istnieje */ }

  // ── Podsumowanie ───────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(56));
  console.log(`✅ Sitemap gotowy:`);
  console.log(`   URL w sitemapie:   ${totalInSitemap}`);
  console.log(`   Pełne opisy:       ${full.length}  (${coveragePct}% katalogu)`);
  console.log(`   Częściowe opisy:   ${partial.length}`);
  console.log(`   Wykluczone:        ${excluded.length}`);
  console.log('─'.repeat(56));

  // ── Mechanizm 5: Google ping ───────────────────────────────────────────────
  console.log('\n📡 Google ping...');
  await pingGoogle(`${BASE_URL}/sitemap.xml`);

  console.log('');
}

main().catch(err => {
  console.error('\n❌ Błąd generatora sitemap:', err);
  process.exit(1);
});
