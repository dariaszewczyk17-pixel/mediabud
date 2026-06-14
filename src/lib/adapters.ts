/**
 * Typy danych Sanity i adaptery konwertujące do legacy typów
 * używanych przez istniejące komponenty (ProductCard, CategoryPage, itp.)
 */

import type { Category } from '@/data/categories'
import type { Product } from '@/data/products'

// ─── Typy Sanity ─────────────────────────────────────────────────────────────

export interface SanitySlug { current: string }

export interface SanityCategory {
  _id: string
  name: string
  slug: string          // GROQ zwraca "slug": slug.current — już string, nie obiekt
  icon?: string
  description?: string
  parent?: SanityCategory
  children?: SanityCategory[]
  order?: number
}

export interface SanityProduct {
  _id: string
  name: string
  slug: string          // GROQ zwraca slug.current (string), nie obiekt SanitySlug
  sku?: string
  brand?: string
  unit?: string
  shortDescription?: string
  description?: string  // GROQ zwraca pole description (tekst lub bloki)
  application?: string
  advantages?: string[]
  warnings?: string[]
  faq?: { q: string; a: string }[]
  seoDescription?: string
  tags?: string[]
  featured?: boolean
  inStock?: boolean
  priceMin?: number
  priceMax?: number
  metaTitle?: string
  metaDescription?: string
  categorySlug?: string
  categoryName?: string
  categoryParentSlug?: string
  categoryChain?: SanityCategory
  technicalSpec?: { label: string; value: string }[]
  images?: (string | null)[]
}

// ─── Konwertery ───────────────────────────────────────────────────────────────

const normalizeCategoryKey = (value?: string) =>
  (value ?? '')
    .toLocaleLowerCase('pl-PL')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const categoryDedupeKey = (c: SanityCategory) =>
  normalizeCategoryKey(c.name) || normalizeCategoryKey(c.slug) || c._id

const pickPreferredCategory = (a: SanityCategory, b: SanityCategory) => {
  // Rekordy z kontrolowanym order zwykle pochodzą z nowszego, kanonicznego drzewa.
  if (a.order == null && b.order != null) return b
  return a
}

function dedupeSanityCategorySiblings(children: SanityCategory[] = []): SanityCategory[] {
  const merged = new Map<string, SanityCategory>()

  for (const child of children) {
    const key = categoryDedupeKey(child)
    const existing = merged.get(key)

    if (!existing) {
      merged.set(key, {
        ...child,
        children: dedupeSanityCategorySiblings(child.children ?? []),
      })
      continue
    }

    const preferred = pickPreferredCategory(existing, child)
    const fallback = preferred === existing ? child : existing
    merged.set(key, {
      ...preferred,
      icon: preferred.icon ?? fallback.icon,
      description: preferred.description ?? fallback.description,
      children: dedupeSanityCategorySiblings([
        ...(preferred.children ?? []),
        ...(fallback.children ?? []),
      ]),
    })
  }

  return Array.from(merged.values()).map(child => ({
    ...child,
    children: child.children && child.children.length > 0 ? child.children : undefined,
  }))
}

/** Sanity category → legacy Category (dla istniejących komponentów) */
export function sanityCategoryToLegacy(c: SanityCategory): Category {
  const children = dedupeSanityCategorySiblings(c.children ?? [])
    .map(sanityCategoryToLegacy)

  return {
    id: c._id,
    slug: c.slug,
    name: c.name,
    icon: c.icon,
    description: c.description,
    children: children.length > 0 ? children : undefined,
  }
}

/** Sanity product → legacy Product (dla ProductCard, useWycena, itp.) */
export function sanityProductToLegacy(p: SanityProduct): Product {
  const images = (p.images ?? []).filter((u): u is string => !!u)
  return {
    id: p._id,
    slug: p.slug,
    name: p.name,
    categorySlug: p.categorySlug ?? '',
    brand: p.brand ?? '',
    sku: p.sku ?? p._id.slice(-8).toUpperCase(),
    unit: p.unit ?? 'szt',
    description: typeof p.description === 'string' ? p.description : (p.shortDescription ?? ''),
    shortDescription: p.shortDescription ?? '',
    application: p.application ?? '',
    technicalSpec: (p.technicalSpec ?? []),
    advantages: p.advantages ?? [],
    warnings: p.warnings ?? [],
    faq: p.faq ?? [],
    seoDescription: p.seoDescription ?? '',
    images: (images.length && !images.some(img => img.includes("placeholder") || img.includes("3907a0b3a13f08c233374a46960c3c76d175b4af"))) ? images : ['/images/placeholder-product_2.png'],
    tags: p.tags ?? [],
    related: [],
    isNew: false,
    isFeatured: p.featured ?? false,
  }
}

// ─── Pomocniki ────────────────────────────────────────────────────────────────

/**
 * Buduje okruszki (breadcrumbs) z łańcucha rodziców kategorii Sanity.
 * Zwraca tablicę od korzenia do bieżącej kategorii (włącznie).
 */
export function buildBreadcrumbs(
  cat: SanityCategory,
): Array<{ id: string; name: string; slug: string }> {
  const chain: SanityCategory[] = []
  let cur: SanityCategory | undefined = cat
  while (cur) {
    chain.unshift(cur)
    cur = cur.parent
  }
  return chain.map(c => ({ id: c._id, name: c.name, slug: c.slug }))
}

/**
 * Zbiera slug bieżącej kategorii i wszystkich potomków (rekurencyjnie).
 * Używane do filtrowania produktów w CategoryPage.
 */
export function collectAllSlugs(cat: SanityCategory): string[] {
  const slugs: string[] = [cat.slug]
  for (const child of cat.children ?? []) {
    slugs.push(...collectAllSlugs(child))
  }
  return slugs
}
