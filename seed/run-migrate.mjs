import { createRequire } from 'module'
import { writeFileSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const { products } = require('./products.cjs')
console.log(`Wczytano ${products.length} produktów`)

const brandsMap = new Map()
const catsMap   = new Map()

products.forEach(p => {
  if (p.brand && !brandsMap.has(p.brand)) {
    brandsMap.set(p.brand, `brand-${p.brand.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`)
  }
  if (p.categorySlug && !catsMap.has(p.categorySlug)) {
    catsMap.set(p.categorySlug, `category-${p.categorySlug}`)
  }
})

// NDJSON: marki
writeFileSync(path.join(__dirname,'sanity-brands.ndjson'),
  [...brandsMap.entries()].map(([name,id]) => JSON.stringify({
    _id:id, _type:'brand', name,
    slug:{_type:'slug',current:name.toLowerCase().replace(/[^a-z0-9]+/g,'-')},
    featured:false
  })).join('\n'))
console.log(`Marki: ${brandsMap.size} → sanity-brands.ndjson`)

// NDJSON: kategorie
writeFileSync(path.join(__dirname,'sanity-categories.ndjson'),
  [...catsMap.entries()].map(([slug,id]) => JSON.stringify({
    _id:id, _type:'category',
    name:slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' '),
    slug:{_type:'slug',current:slug}, order:0
  })).join('\n'))
console.log(`Kategorie: ${catsMap.size} → sanity-categories.ndjson`)

// NDJSON: produkty
const lines = products.map(p => {
  const doc = {
    _id:`product-${p.id}`, _type:'product',
    name:p.name, slug:{_type:'slug',current:p.slug},
    ...(p.sku  && {sku:p.sku}),
    ...(p.unit && {unit:p.unit}),
    featured:!!p.isFeatured, inStock:true,
    category:{_type:'reference',_ref:`category-${p.categorySlug}`},
    ...(p.brand && {brand:{_type:'reference',_ref:brandsMap.get(p.brand)}}),
    ...(p.shortDescription && {shortDescription:p.shortDescription}),
    ...(p.description      && {description:p.description}),
    ...(p.application      && {application:p.application}),
    ...(p.advantages?.length && {advantages:p.advantages}),
    ...(p.warnings?.length   && {warnings:p.warnings}),
    ...(p.faq?.length && {faq:p.faq.map(f=>({_key:Math.random().toString(36).slice(2),_type:'faqItem',q:f.q,a:f.a}))}),
    ...(p.technicalSpec?.length && {technicalSpec:p.technicalSpec.map(s=>({_key:Math.random().toString(36).slice(2),_type:'specItem',label:s.label,value:s.value}))}),
    ...(p.tags?.length && {tags:p.tags}),
    ...(p.seoDescription && {seoDescription:p.seoDescription}),
  }
  return JSON.stringify(doc)
})
writeFileSync(path.join(__dirname,'sanity-products.ndjson'), lines.join('\n'))
console.log(`Produkty: ${products.length} → sanity-products.ndjson`)
console.log('✅ GOTOWE')
