/**
 * generate-sitemap.mjs
 * Pobiera wszystkie produkty + kategorie z Sanity i generuje public/sitemap.xml
 * Uruchamiany przez: npm run postbuild (lub standalone: node scripts/generate-sitemap.mjs)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const PUBLIC_DIR = path.join(ROOT, 'public');

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || 'nzcwegq7';
const DATASET    = process.env.VITE_SANITY_DATASET    || 'production';
const TOKEN      = process.env.SANITY_TOKEN || process.env.VITE_SANITY_TOKEN || '';
const BASE_URL   = process.env.SITE_URL || 'https://mediabud.pl';
const API_VER    = '2024-01-01';

const SANITY_BASE = `https://${PROJECT_ID}.api.sanity.io/v${API_VER}/data/query/${DATASET}`;

async function sanityQuery(query) {
  const url = `${SANITY_BASE}?query=${encodeURIComponent(query)}`;
  const headers = { 'Content-Type': 'application/json' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Sanity HTTP ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.result ?? [];
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

function urlEntry({ loc, lastmod, changefreq = 'monthly', priority = '0.7' }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].filter(Boolean).join('\n');
}

const STATIC_PAGES = [
  { path: '/',         changefreq: 'weekly',  priority: '1.0' },
  { path: '/produkty', changefreq: 'weekly',  priority: '0.9' },
  { path: '/kategoria',changefreq: 'weekly',  priority: '0.9' },
  { path: '/o-nas',    changefreq: 'monthly', priority: '0.7' },
  { path: '/kontakt',  changefreq: 'monthly', priority: '0.7' },
  { path: '/blog',     changefreq: 'weekly',  priority: '0.8' },
];

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  console.log(`\n🗺️  Sitemap generator — ${today}`);

  // --- Pobierz kategorie ---
  console.log('📂 Pobieranie kategorii...');
  let categories = [];
  try {
    categories = await fetchAllPaginated(
      `*[_type=="category" && defined(slug.current)]{slug, _updatedAt, depth}`
    );
    console.log(`  ✓ ${categories.length} kategorii`);
  } catch (e) {
    console.warn(`  ⚠ Nie udało się pobrać kategorii: ${e.message}`);
  }

  // --- Pobierz produkty ---
  console.log('📦 Pobieranie produktów...');
  let products = [];
  try {
    products = await fetchAllPaginated(
      `*[_type=="product" && defined(slug.current)]{slug, _updatedAt}`
    );
    console.log(`  ✓ ${products.length} produktów`);
  } catch (e) {
    console.warn(`  ⚠ Nie udało się pobrać produktów: ${e.message}`);
  }

  // --- Buduj XML ---
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    '',
    '  <!-- Strony statyczne -->',
  ];

  for (const p of STATIC_PAGES) {
    lines.push(urlEntry({
      loc: `${BASE_URL}${p.path}`,
      lastmod: today,
      changefreq: p.changefreq,
      priority: p.priority,
    }));
  }

  if (categories.length > 0) {
    lines.push('', `  <!-- Kategorie (${categories.length}) -->`);
    for (const cat of categories) {
      const slug = cat.slug?.current;
      if (!slug) continue;
      const depth = cat.depth ?? 2;
      lines.push(urlEntry({
        loc: `${BASE_URL}/kategoria/${escapeXml(slug)}`,
        lastmod: formatDate(cat._updatedAt),
        changefreq: 'weekly',
        priority: depth <= 1 ? '0.9' : depth <= 2 ? '0.8' : '0.7',
      }));
    }
  }

  if (products.length > 0) {
    lines.push('', `  <!-- Produkty (${products.length}) -->`);
    for (const prod of products) {
      const slug = prod.slug?.current;
      if (!slug) continue;
      lines.push(urlEntry({
        loc: `${BASE_URL}/produkt/${escapeXml(slug)}`,
        lastmod: formatDate(prod._updatedAt),
        changefreq: 'monthly',
        priority: '0.7',
      }));
    }
  }

  lines.push('', '</urlset>');
  const xml = lines.join('\n');

  // --- Zapis do dist/ i public/ ---
  const total = 6 + categories.length + products.length;
  console.log(`\n✍️  Generowanie sitemap.xml (${total} URL-i)...`);

  // Zapisz do public/ (źródło)
  await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf-8');
  console.log(`  ✓ public/sitemap.xml`);

  // Zapisz do dist/ jeśli istnieje (po buildzie)
  try {
    await fs.access(DIST_DIR);
    await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf-8');
    console.log(`  ✓ dist/sitemap.xml`);
  } catch {
    // dist/ nie istnieje — OK (tryb standalone)
  }

  console.log(`\n✅ Sitemap gotowy: ${total} URL-i (${categories.length} kategorii + ${products.length} produktów)\n`);
}

main().catch(err => {
  console.error('❌ Błąd generatora sitemap:', err);
  process.exit(1);
});
