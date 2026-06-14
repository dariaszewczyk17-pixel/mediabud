/**
 * generate-sitemap.mjs  v2
 * Uruchamiany przez: npm run postbuild  lub  node scripts/generate-sitemap.mjs
 */

import fs   from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const ROOT       = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR   = path.join(ROOT, 'dist');

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || 'nzcwegq7';
const DATASET    = process.env.VITE_SANITY_DATASET    || 'production';
const TOKEN      = process.env.SANITY_TOKEN || process.env.VITE_SANITY_TOKEN || '';
const BASE_URL   = (process.env.SITE_URL || 'https://mediabud.pl').replace(/\/$/, '');
const API_VER    = '2024-01-01';

const SCORE_FULL_MIN    = 5;
const SCORE_PARTIAL_MIN = 1;

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

function calcScore(prod) {
  let score = 0;
  if (prod.hasDescription)  score += 2;
  if (prod.hasLongDesc)     score += 2;
  if (prod.hasImage)        score += 1;
  if (prod.hasTechSpec)     score += 1;
  if (prod.hasValidName)    score += 1;
  if (prod.hasCategory)     score += 1;
  return score;
}

function scoreToPriority(score) {
  if (score >= 7) return '0.9';
  if (score >= 5) return '0.7';
  if (score >= 3) return '0.5';
  if (score >= 1) return '0.3';
  return '0.1';
}

function calcChangefreq(updatedAt) {
  if (!updatedAt) return 'monthly';
  const daysSince = (Date.now() - new Date(updatedAt).getTime()) / 86_400_000;
  if (daysSince < 7)   return 'daily';
  if (daysSince < 30)  return 'weekly';
  if (daysSince < 180) return 'monthly';
  return 'yearly';
}

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

const CATEGORY_SLUG_ALIASES = {
  'gipsy-gladzie': 'gipsy-i-gladzie',
  'gladzie-proszek': 'gladzie-gipsowe-w-proszku',
  'gladzie-gotowe': 'gladzie-masy-gotowe',
  'masy-szpachlowe': 'masy-szpachlowe-gotowe',
  'aczniki-do-izolacji-fasadowych': 'laczniki-do-izolacji-fasadowych',
  'aczniki-do-profili': 'laczniki-do-profili',
  'akcesoria-do-potkow-przeciwsniegowe': 'akcesoria-do-plotkow-przeciwsniegowe',
  'artykuy-scierne': 'artykuly-scierne',
  'artykuy-scierne-do-suchej-zabudowy': 'artykuly-scierne-do-suchej-zabudowy',
  'farby-pozostae': 'farby-pozostale',
  'farby-przemysowe': 'farby-przemyslowe',
  'farby-wewnetrzne-biae': 'farby-wewnetrzne-biale',
  'gadzie-gipsowe-w-proszku': 'gladzie-gipsowe-w-proszku',
  'gadzie-masy-gotowe': 'gladzie-masy-gotowe',
  'gipsy-i-gadzie': 'gipsy-i-gladzie',
  'izolacje-dachow-paskich': 'izolacje-dachow-plaskich',
  'izolacje-przemysowe': 'izolacje-przemyslowe',
  'izolacje-stropow-i-podog': 'izolacje-stropow-i-podlog',
  'kleje-do-ween': 'kleje-do-welen',
  'koki-i-wkrety-uniwersalne': 'kolki-i-wkrety-uniwersalne',
  'listwy-przypodogowe': 'listwy-przypodlogowe',
  'materiay-konstrukcyjne': 'materialy-konstrukcyjne',
  'mieszada': 'mieszadla',
  'motki-budowlane': 'mlotki-budowlane',
  'okadziny-z-wokna-szklanego': 'okladziny-z-wlokna-szklanego',
  'oowkikredy-i-markery': 'olowki-kredy-i-markery',
  'podkady-wypeniajace': 'podklady-wypelniajace',
  'potki-przeciwsniegowe': 'plotki-przeciwsniegowe',
  'powoki-epoksydowe': 'powloki-epoksydowe',
  'pytki-elewacyjne': 'plytki-elewacyjne',
  'pytki-scienne': 'plytki-scienne',
  'pytki-tarasowe': 'plytki-tarasowe',
  'pyty-cementowe': 'plyty-cementowe',
  'pyty-gipsowo-kartonowe': 'plyty-gipsowo-kartonowe',
  'pyty-xps': 'plyty-xps',
  'spoiny-zwyke': 'spoiny-zwykle',
  'styropian-dach-podoga-eps': 'styropian-dach-podloga-eps',
  'tasmy-i-folie-pozostae': 'tasmy-i-folie-pozostale',
  'waki-malarskie': 'walki-malarskie',
  'weny': 'welny',
  'weny-do-dachow-paskich': 'welny-do-dachow-plaskich',
  'weny-do-poddaszy': 'welny-do-poddaszy',
  'weny-fasadowe': 'welny-fasadowe',
  'welna-fasadowa': 'welny-fasadowe',
  'welna-sucha-zabudowa': 'welny-do-suchej-zabudowy-i-scian-dzialowych',
  'welna-stropy': 'welny-do-stropow-i-podlog',
  'welna-dachy-plaskie': 'welny-do-dachow-plaskich',
  'welna-poddasza': 'welny-do-poddaszy',
  'welna-akustyczna': 'welny-do-suchej-zabudowy-i-scian-dzialowych',
  'welna-kominkowa': 'welny',
  'plyty-welna-mineralna': 'plyty-sufitowe-z-welny-mineralnej',
  'plyty-welna-szklana': 'plyty-sufitowe-z-welny-szklanej',
  'kleje-welna': 'kleje-do-welen',
  'akcesoria-izolacji': 'akcesoria-do-izolacji',
  'akcesoria-kominy': 'akcesoria-do-kominow',
  'akcesoria-malarskie': 'akcesoria-malarskie-i-tynkarskie',
  'akcesoria-rynny': 'akcesoria-do-systemow-rynnowych',
  'bazy-koloranty': 'bazy-i-koloranty',
  'bloczki-betonowe': 'bloczki-betonowe-i-fundamentowe',
  'czysciki-pian': 'czysciki-do-pian-montazowych',
  'dodatki-tynki': 'tynki-specjalne',
  'dodatki-zaprawy': 'dodatki-do-zapraw-i-betonu',
  'druty-hakiem': 'druty-z-hakiem',
  'drzwi-akcesoria': 'drzwi-i-akcesoria-do-drzwi',
  'elementy-mocujace': 'elementy-mocujace-uniwersalne',
  'farby-biale': 'farby-wewnetrzne-biale',
  'farby-drewno': 'farby-do-drewna',
  'farby-elaw-akrylowe': 'farby-elewacyjne-akrylowe',
  'farby-elaw-emulsyjne': 'farby-elewacyjne-emulsyjne',
  'farby-elaw-silikatowe': 'farby-elewacyjne-silikatowe',
  'farby-elaw-silikatowo-akrylowe': 'farby-elewacyjne-akrylowe',
  'farby-elaw-silikatowo-silikonowe': 'farby-elewacyjne-silikonowe',
  'farby-elaw-silikonowe': 'farby-elewacyjne-silikonowe',
  'farby-kolorowe': 'farby-wewnetrzne-kolorowe',
  'farby-metal': 'farby-do-metalu',
  'gipsy-wapienne': 'tynki-wapienne',
  'grunty-posadzki': 'grunty-do-posadzek',
  'gwozdzie-budowlane': 'gwozdzie-i-podkladki-dociskowe-do-pap',
  'impregnaty-drewno': 'impregnaty',
  'katowniki': 'katowniki-i-katomierze',
  'kleje-drewno': 'kleje-do-drewna',
  'kleje-gkb': 'kleje-do-gips-karton',
  'kleje-glazura': 'kleje-do-glazury',
  'kleje-styropian': 'kleje-do-styropianu-i-styroduru',
  'klipsy-mocujace-sufity': 'klipsy-mocujace-do-sufitow-podwieszanych',
  'klucze-narzedzia': 'klucze',
  'kolki-beton': 'kotwy-chemiczne',
  'kolki-rozpozowe': 'kolki-do-suchej-zabudowy',
  'kolki-wkrety-uniwersalne': 'kolki-i-wkrety-uniwersalne',
  'kruszywa-tynki': 'tynki-mozaikowe',
  'lakiery-drewno': 'lakiery-do-drewna',
  'lamele-dekoracyjne': 'plytki-dekoracyjne',
  'listwy-akcesoria': 'listwy-i-akcesoria',
  'listwy-podtynkowe': 'listwy-przypodlogowe',
  'masy-bitumiczne': 'masy-bitumiczne-gruntujace',
  'mocowania-sufity': 'mocowania-do-sufitow-podwieszanych',
  'narozniki-aluminiowe': 'narozniki-do-suchej-zabudowy-aluminiowe',
  'narozniki-listwy': 'narozniki-i-listwy',
  'narozniki-pvc': 'narozniki-do-suchej-zabudowy-pvc',
  'narozniki-tynki-mokre': 'narozniki-do-tynkow-mokrych',
  'okna-akcesoria': 'okna-dachowe-i-akcesoria',
  'okna-dachowe-std': 'okna-dachowe',
  'oleje-drewno': 'oleje',
  'opalarki-palniki': 'opalarki-i-palniki',
  'pace-budowlane': 'pace',
  'palisady-krawezniki': 'palisady-krawezniki-i-obrzeza',
  'panele-dekory': 'panele-i-dekory-scienne',
  'panele-scienne-tapety': 'panele-scienne-i-tapety',
  'papy-dachowe': 'papy',
  'piany-pistoletowe': 'piany-montazowe-pistoletowe',
  'piany-wezyk': 'piany-montazowe-wezykowe',
  'pilarki': 'pily-i-pilarki',
  'pistolety-budowlane': 'pistolety',
  'plyty-chodnikowe': 'plyty-chodnikowe-i-tarasowe',
  'plyty-drewniane-sufitowe': 'plyty-sufitowe-drewniane',
  'plyty-gipsowe-sufitowe': 'plyty-gipsowo-kartonowe',
  'plyty-metalowe-sufitowe': 'plyty-sufitowe-metalowe',
  'plyty-specjalistyczne-gk': 'plyty-gipsowo-kartonowe',
  'plyty-sucha-zabudowa': 'sucha-zabudowa',
  'podbitki-dachowe': 'pokrycia-dachowe',
  'pokrycia-blacha': 'pokrycia-dachowe-z-blachy',
  'profile-nosne-glowne': 'profile-nosne-glowne-do-sufitow-podwieszanych',
  'profile-oscieznicowe': 'profile-do-suchej-zabudowy-oscieznicowe',
  'profile-poprzeczne': 'profile-poprzeczne-do-sufitow-podwieszanych',
  'profile-przysc-sufity': 'profile-przyscienne-do-sufitow-podwieszanych',
  'profile-sciana': 'profile-do-suchej-zabudowy-konstrukcja-scienna',
  'profile-specjalne-suf': 'profile-specjalne-do-sufitow-podwieszanych',
  'profile-sucha-zabudowa': 'profile-do-suchej-zabudowy',
  'profile-sufit': 'profile-do-suchej-zabudowy-konstrukcja-sufitowa',
  'profile-sufity-podwieszane': 'profile-do-sufitow-podwieszanych',
  'pustaki-wentylacyjne': 'pustaki-wentylacyjne-i-dymne',
  'rynny-blacha': 'systemy-rynnowe-z-blachy-powlekanej',
  'rynny-ocynkowane': 'systemy-rynnowe-ocynkowane',
  'rynny-pvc': 'systemy-rynnowe-pvc',
  'schody-akcesoria': 'schody-i-akcesoria-strychowe',
  'silikony-wysokotemp': 'silikony-wysokotemperaturowe',
  'srodki-czyszczace': 'srodki-czyszczaco-pielegnacyjne',
  'sruby-podkladki': 'sruby-i-podkladki-do-srub',
  'styropian-akustyczny': 'styropiany-akustyczne',
  'styropian-dach-podloga': 'styropian-dach-podloga-eps',
  'styropian-fasadowy-eps': 'styropiany-fasadowe-eps',
  'styropian-fundamenty': 'styropiany-do-fundamentow',
  'swietliki-dachowe': 'balkony-dachowe',
  'szpachle': 'szpachle-i-szpachelki',
  'tasmy-sucha-zabudowa': 'tasmy-do-suchej-zabudowy',
  'tasmy-uszczelniajace': 'tasmy-uszczelniajace-do-hydroizolacji',
  'tynki-akrylowe': 'tynki-elewacyjne-akrylowe',
  'tynki-mineralne': 'tynki-elewacyjne-mineralne',
  'tynki-ozdobne': 'tynki-elewacyjne-ozdobne',
  'tynki-silikatowe': 'tynki-elewacyjne-silikonowo-silikatowe',
  'tynki-silikonowe': 'tynki-elewacyjne-silikonowe',
  'tynki-silikonowo-silikatowe': 'tynki-elewacyjne-silikonowo-silikatowe',
  'uszcz-akrylowe': 'uszczelniacze-i-silikony',
  'uszcz-dekarskie': 'uszczelniacze-dekarskie',
  'uszcz-poliuretanowe': 'uszczelniacze-poliuretanowe',
  'uszczelniacze-silikony': 'uszczelniacze-i-silikony',
  'wiadra-pojemniki': 'wiadra-i-pojemniki-budowlane',
  'wiertarki-mloty': 'wiertarko-wkretarki',
  'wieszaki-bezposrednie': 'wieszaki-do-suchej-zabudowy-bezposrednie',
  'wieszaki-noniusz': 'wieszaki-do-suchej-zabudowy-z-noniuszem',
  'wieszaki-poddasze': 'wieszaki-do-suchej-zabudowy-poddaszy',
  'wieszaki-sucha-zabudowa': 'wieszaki-do-suchej-zabudowy',
  'wylewki-betonowe': 'zaprawy-posadzkowe-masy-samopoziomujace',
  'zabezpieczenia-sniegu': 'zabezpieczenia-przeciwsniegowe',
  'zaprawy-jastrych': 'zaprawy-posadzkowe-masy-samopoziomujace',
  'zaprawy-montazowe': 'kotwy-montazowe',
  'zaprawy-murarskie': 'zaprawy-murarskie-ogolnego-zastosowania',
  'zaprawy-posadzkowe': 'zaprawy-posadzkowe-masy-samopoziomujace',
  'zaprawy-tynkarskie': 'tynki-cementowo-wapienne',
  'wsporniki-potkow-przeciwsniegowych': 'wsporniki-plotkow-przeciwsniegowych',
};

function resolveCategorySlug(slug) {
  return CATEGORY_SLUG_ALIASES[slug] ?? slug;
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

async function writeXml(filename, content) {
  await fs.writeFile(path.join(PUBLIC_DIR, filename), content, 'utf-8');
  try {
    await fs.access(DIST_DIR);
    await fs.writeFile(path.join(DIST_DIR, filename), content, 'utf-8');
  } catch { }
  const kb = (Buffer.byteLength(content, 'utf-8') / 1024).toFixed(0);
  console.log(`  ✓ ${filename.padEnd(34)} (${String(kb).padStart(5)} KB)`);
}

async function pingGoogle(_sitemapUrl) {
  console.log('  ℹ Google ping pominięty (deprecated od 2023 — użyj GSC)');
}

const STATIC_PAGES = [
  { path: '/',          changefreq: 'weekly',  priority: '1.0' },
  { path: '/produkty',  changefreq: 'weekly',  priority: '0.9' },
  { path: '/o-firmie',  changefreq: 'monthly', priority: '0.7' },
  { path: '/kontakt',   changefreq: 'monthly', priority: '0.7' },
  { path: '/blog',      changefreq: 'weekly',  priority: '0.8' },
  { path: '/marki',     changefreq: 'weekly',  priority: '0.8' },
];

const CALCULATORS = [
  'tynk-elewacyjny', 'farba-elewacyjna', 'styropian-welna',
  'klej-do-plytek', 'plytki-ceramiczne', 'izolacja-fundamentow'
];

async function main() {
  const today    = new Date().toISOString().slice(0, 10);
  const nowIso   = new Date().toISOString();
  console.log(`\n🗺️  Sitemap generator v2 — ${today}`);

  console.log('\n📂 Pobieranie kategorii...');
  let categories = [];
  try {
    const rawCats = await fetchAllPaginated(
      `*[_type=="category" && defined(slug.current)]{slug, _updatedAt, depth}`
    );
    const catMap = new Map();
    for (const c of rawCats) {
      const rawSlug = c.slug?.current;
      const s = rawSlug ? resolveCategorySlug(rawSlug) : '';
      if (!s) continue;
      const normalizedCat = { ...c, slug: { ...c.slug, current: s } };
      if (!catMap.has(s) || new Date(c._updatedAt) > new Date(catMap.get(s)._updatedAt)) {
        catMap.set(s, normalizedCat);
      }
    }
    categories = Array.from(catMap.values());
    console.log(`  ✓ ${categories.length} unikalnych kategorii (z ${rawCats.length} pobranych)`);
  } catch (e) {
    console.warn(`  ⚠ Błąd kategorii: ${e.message}`);
  }

  console.log('\n📦 Pobieranie produktów...');
  let rawProducts = [];
  try {
    const rawProds = await fetchAllPaginated(
      `*[_type=="product" && defined(slug.current) && !(name match "P-*")]{
        slug, _updatedAt,
        "hasDescription": defined(shortDescription) && length(shortDescription) > 50,
        "hasLongDesc":    defined(description)       && length(description) > 200,
        "hasImage":       defined(image),
        "hasTechSpec":    defined(technicalSpec)     && count(technicalSpec) > 0,
        "hasValidName":   defined(name)              && length(name) > 10,
        "hasCategory":    defined(category)
      }`
    );
    const prodMap = new Map();
    for (const p of rawProds) {
      const s = p.slug?.current;
      if (!s) continue;
      if (!prodMap.has(s) || new Date(p._updatedAt) > new Date(prodMap.get(s)._updatedAt)) {
        prodMap.set(s, p);
      }
    }
    rawProducts = Array.from(prodMap.values());
    console.log(`  ✓ ${rawProducts.length} unikalnych produktów`);
  } catch (e) {
    console.warn(`  ⚠ Błąd produktów: ${e.message}`);
  }

  console.log('\n📝 Pobieranie lokalnych danych...');
  let brands = [];
  let blogPosts = [];
  try {
    const { execSync } = await import('child_process');
    execSync('npx esbuild src/data/brands.ts --bundle --format=esm --outfile=dist/temp-brands.mjs');
    execSync('npx esbuild src/data/blog.ts --bundle --format=esm --outfile=dist/temp-blog.mjs');
    const brandsModule = await import(path.join(ROOT, 'dist/temp-brands.mjs'));
    const blogModule = await import(path.join(ROOT, 'dist/temp-blog.mjs'));
    brands = brandsModule.BRANDS || [];
    blogPosts = blogModule.blogPosts || [];
    console.log(`  ✓ ${brands.length} marek, ${blogPosts.length} artykułów`);
  } catch (e) {
    console.warn(`  ⚠ Błąd lokalnych danych: ${e.message}`);
  }

  const full = [], partial = [], excluded = [];
  const freqCount = { daily: 0, weekly: 0, monthly: 0, yearly: 0 };

  for (const prod of rawProducts) {
    const score = calcScore(prod);
    prod._score = score;
    if (score >= SCORE_FULL_MIN)         full.push(prod);
    else if (score >= SCORE_PARTIAL_MIN) partial.push(prod);
    else                                 excluded.push(prod);
    const freq = calcChangefreq(prod._updatedAt);
    freqCount[freq] = (freqCount[freq] ?? 0) + 1;
  }

  console.log('\n✍️  Generowanie XML...');

  const coreEntries = [
    ...STATIC_PAGES.map(p => urlEntry({ loc: `${BASE_URL}${p.path}`, lastmod: today, changefreq: p.changefreq, priority: p.priority })),
    ...CALCULATORS.map(calc => urlEntry({ loc: `${BASE_URL}/kalkulator/${calc}`, lastmod: today, changefreq: 'monthly', priority: '0.8' })),
    ...brands.map(b => urlEntry({ loc: `${BASE_URL}/marki/${escapeXml(b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))}`, lastmod: today, changefreq: 'weekly', priority: '0.7' })),
    ...blogPosts.map(post => urlEntry({ loc: `${BASE_URL}/blog/${escapeXml(post.id)}`, lastmod: post.date || today, changefreq: 'monthly', priority: '0.7' }))
  ];
  await writeXml('sitemap-core.xml', buildUrlset(coreEntries));

  const catEntries = categories
    .map(cat => {
      const slug = cat.slug?.current;
      if (!slug) return null;
      const depth = cat.depth ?? 2;
      return urlEntry({ loc: `${BASE_URL}/kategoria/${escapeXml(slug)}`, lastmod: formatDate(cat._updatedAt), changefreq: 'weekly', priority: depth <= 1 ? '0.9' : depth <= 2 ? '0.8' : '0.7' });
    })
    .filter(Boolean);
  await writeXml('sitemap-categories.xml', buildUrlset(catEntries));

  const fullEntries = full.map(prod => {
    const slug = prod.slug?.current;
    if (!slug) return null;
    return urlEntry({ loc: `${BASE_URL}/produkt/${escapeXml(slug)}`, lastmod: formatDate(prod._updatedAt), changefreq: calcChangefreq(prod._updatedAt), priority: scoreToPriority(prod._score) });
  }).filter(Boolean);
  await writeXml('sitemap-products-full.xml', buildUrlset(fullEntries));

  const partialEntries = partial.map(prod => {
    const slug = prod.slug?.current;
    if (!slug) return null;
    return urlEntry({ loc: `${BASE_URL}/produkt/${escapeXml(slug)}`, lastmod: formatDate(prod._updatedAt), changefreq: calcChangefreq(prod._updatedAt), priority: scoreToPriority(prod._score) });
  }).filter(Boolean);
  await writeXml('sitemap-products-partial.xml', buildUrlset(partialEntries));

  const totalInSitemap = STATIC_PAGES.length + catEntries.length + fullEntries.length + partialEntries.length;

  const indexContent = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <sitemap><loc>${BASE_URL}/sitemap-core.xml</loc><lastmod>${today}</lastmod></sitemap>`,
    `  <sitemap><loc>${BASE_URL}/sitemap-categories.xml</loc><lastmod>${today}</lastmod></sitemap>`,
    `  <sitemap><loc>${BASE_URL}/sitemap-products-full.xml</loc><lastmod>${today}</lastmod></sitemap>`,
    `  <sitemap><loc>${BASE_URL}/sitemap-products-partial.xml</loc><lastmod>${today}</lastmod></sitemap>`,
    '</sitemapindex>',
  ].join('\n');
  await writeXml('sitemap.xml', indexContent);

  const report = {
    generated: nowIso, base_url: BASE_URL,
    products: { total: rawProducts.length, full_quality: full.length, partial_quality: partial.length, excluded: excluded.length, coverage_pct: rawProducts.length > 0 ? parseFloat(((full.length / rawProducts.length) * 100).toFixed(1)) : 0 },
    categories: { total: categories.length },
    changefreq_distribution: freqCount,
    total_urls_in_sitemap: totalInSitemap,
  };
  await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap-report.json'), JSON.stringify(report, null, 2), 'utf-8');
  console.log(`  ✓ sitemap-report.json`);

  try {
    await fs.access(DIST_DIR);
    await fs.writeFile(path.join(DIST_DIR, 'sitemap-report.json'), JSON.stringify(report, null, 2), 'utf-8');
    const indexHtml = path.join(DIST_DIR, 'index.html');
    await fs.copyFile(indexHtml, path.join(DIST_DIR, '404.html'));
    const categoryFallbackSlugs = new Set([
      ...categories.map(cat => cat.slug?.current).filter(Boolean),
      ...Object.keys(CATEGORY_SLUG_ALIASES),
      ...Object.values(CATEGORY_SLUG_ALIASES),
    ]);
    for (const slug of categoryFallbackSlugs) {
      if (!slug || slug.includes('/') || slug.includes('..')) continue;
      const categoryDir = path.join(DIST_DIR, 'kategoria', slug);
      await fs.mkdir(categoryDir, { recursive: true });
      await fs.copyFile(indexHtml, path.join(categoryDir, 'index.html'));
    }
    console.log(`  ✓ category SPA fallbacks (${categoryFallbackSlugs.size})`);
  } catch { }

  console.log(`\n✅ Sitemap gotowy: ${totalInSitemap} URL`);
  await pingGoogle(`${BASE_URL}/sitemap.xml`);
}

main().catch(err => {
  console.error('\n❌ Błąd generatora sitemap:', err);
  process.exit(1);
});
