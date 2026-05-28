/**
 * Skrypt migracji: src/data/products.ts + categories.ts → Sanity NDJSON
 * Uruchom: node seed/migrate-to-sanity.mjs
 * Wyniki:  seed/sanity-brands.ndjson
 *          seed/sanity-categories.ndjson
 *          seed/sanity-products.ndjson
 */

import { readFileSync, writeFileSync } from 'fs'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir   = path.resolve(__dirname, '..')

// ── 1. Wczytaj products.ts jako tekst i wyciągnij tablicę ────────────────────
const productsRaw = readFileSync(path.join(rootDir, 'src/data/products.ts'), 'utf8')
// Usuń importy TypeScript i wyodrębnij zawartość tablicy
const arrMatch = productsRaw.match(/export const products[^=]*=\s*(\[[\s\S]*\]);?\s*$/)
if (!arrMatch) { console.error('Nie znaleziono tablicy products'); process.exit(1) }

// Konwersja TypeScript → JSON-compatible JS (usuń type assertions, itp.)
let arrText = arrMatch[1]
  .replace(/\/\/.*/g, '')            // usuń komentarze
  .replace(/,\s*\]/g, ']')          // usuń trailing commas przed ]
  .replace(/,\s*\}/g, '}')          // usuń trailing commas przed }

let products
try {
  // eval w izolowanym kontekście
  const fn = new Function(`return ${arrText}`)
  products = fn()
  console.log(`✅ Wczytano ${products.length} produktów`)
} catch(e) {
  console.error('Błąd parsowania products.ts:', e.message)
  process.exit(1)
}

// ── 2. Wyciągnij unikalne marki i kategorie ───────────────────────────────────
const brandsMap  = new Map()  // brandName → sanityId
const catsMap    = new Map()  // categorySlug → sanityId

products.forEach(p => {
  if (p.brand && !brandsMap.has(p.brand)) {
    const id = `brand-${p.brand.toLowerCase().replace(/[^a-z0-9]/g,'-')}`
    brandsMap.set(p.brand, id)
  }
  if (p.categorySlug && !catsMap.has(p.categorySlug)) {
    const id = `category-${p.categorySlug}`
    catsMap.set(p.categorySlug, id)
  }
})

// ── 3. Generuj NDJSON – marki ─────────────────────────────────────────────────
const brandsNDJSON = [...brandsMap.entries()].map(([name, id]) => JSON.stringify({
  _id:   id,
  _type: 'brand',
  name,
  slug:  { _type: 'slug', current: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
  featured: false,
})).join('\n')

writeFileSync(path.join(__dirname, 'sanity-brands.ndjson'), brandsNDJSON)
console.log(`✅ Wygenerowano ${brandsMap.size} marek → seed/sanity-brands.ndjson`)

// ── 4. Generuj NDJSON – kategorie ────────────────────────────────────────────
const catsNDJSON = [...catsMap.entries()].map(([slug, id]) => JSON.stringify({
  _id:   id,
  _type: 'category',
  name:  slug.split('-').map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' '),
  slug:  { _type: 'slug', current: slug },
  order: 0,
})).join('\n')

writeFileSync(path.join(__dirname, 'sanity-categories.ndjson'), catsNDJSON)
console.log(`✅ Wygenerowano ${catsMap.size} kategorii → seed/sanity-categories.ndjson`)

// ── 5. Generuj NDJSON – produkty ─────────────────────────────────────────────
const productsNDJSON = products.map(p => {
  const doc = {
    _id:   `product-${p.id}`,
    _type: 'product',
    name:  p.name,
    slug:  { _type: 'slug', current: p.slug },
    sku:   p.sku   || undefined,
    unit:  p.unit  || undefined,
    featured: p.isFeatured || false,
    inStock:  true,
    // Referencja do kategorii
    category: p.categorySlug ? { _type: 'reference', _ref: `category-${p.categorySlug}` } : undefined,
    // Referencja do marki
    brand:    p.brand ? { _type: 'reference', _ref: brandsMap.get(p.brand) } : undefined,
    // Treść SEO
    shortDescription: p.shortDescription || undefined,
    description:      p.description      || undefined,
    application:      p.application      || undefined,
    advantages:       p.advantages?.length ? p.advantages : undefined,
    warnings:         p.warnings?.length  ? p.warnings  : undefined,
    faq:              p.faq?.length ? p.faq.map(f => ({
      _key: Math.random().toString(36).slice(2),
      _type: 'faqItem', q: f.q, a: f.a,
    })) : undefined,
    // Dane techniczne
    technicalSpec: p.technicalSpec?.length ? p.technicalSpec.map(s => ({
      _key: Math.random().toString(36).slice(2),
      _type: 'specItem', label: s.label, value: s.value,
    })) : undefined,
    tags: p.tags?.length ? p.tags : undefined,
    // SEO
    seoDescription: p.seoDescription || undefined,
  }
  // Usuń undefined
  Object.keys(doc).forEach(k => doc[k] === undefined && delete doc[k])
  return JSON.stringify(doc)
}).join('\n')

writeFileSync(path.join(__dirname, 'sanity-products.ndjson'), productsNDJSON)
console.log(`✅ Wygenerowano ${products.length} produktów → seed/sanity-products.ndjson`)
console.log('\n🚀 Import do Sanity:')
console.log('   npx sanity@latest dataset import seed/sanity-brands.ndjson production')
console.log('   npx sanity@latest dataset import seed/sanity-categories.ndjson production')
console.log('   npx sanity@latest dataset import seed/sanity-products.ndjson production')
