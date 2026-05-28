import { useState, useEffect } from 'react'
import { sanityFetch } from '@/lib/sanity'
import {
  ALL_CATEGORIES_QUERY,
  ALL_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCTS_BY_CATEGORY_SLUGS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  FEATURED_PRODUCTS_QUERY,
  RELATED_PRODUCTS_QUERY,
  ALL_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/lib/queries'

// ─── Bazowy hook ──────────────────────────────────────────────────────────────

function useSanityQuery<T>(query: string, params?: Record<string, any>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    if (!query) { setData(null); setLoading(false); return }
    let cancelled = false
    setLoading(true)
    sanityFetch<T>(query, params)
      .then(res => { if (!cancelled) { setData(res); setLoading(false) } })
      .catch(err => { if (!cancelled) { setError(err); setLoading(false) } })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, paramsKey])

  return { data, loading, error }
}

// ─── Eksportowane hooki ───────────────────────────────────────────────────────

/** Wszystkie kategorie top-level z dziećmi */
export const useAllCategories = () =>
  useSanityQuery(ALL_CATEGORIES_QUERY)

/** Wszystkie produkty */
export const useAllProducts = () =>
  useSanityQuery(ALL_PRODUCTS_QUERY)

/** Produkty polecane (featured: true) */
export const useFeaturedProducts = () =>
  useSanityQuery(FEATURED_PRODUCTS_QUERY)

/** Produkty dla jednej kategorii (slug) */
export const useProductsByCategory = (slug: string) =>
  useSanityQuery(PRODUCTS_BY_CATEGORY_QUERY, { slug })

/**
 * Produkty dla wielu kategorii naraz (slug + wszystkie podkategorie).
 * Przekaż wynik collectAllSlugs(sanityCategory).
 * Hook jest wyłączony (skip) gdy slugs jest pustą tablicą.
 */
export function useProductsByCategorySlugs(slugs: string[]) {
  const [data, setData] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const slugsKey = slugs.join(',')

  useEffect(() => {
    if (!slugs.length) { setLoading(false); return }
    let cancelled = false
    setLoading(true)
    sanityFetch<any[]>(PRODUCTS_BY_CATEGORY_SLUGS_QUERY, { slugs })
      .then(res => { if (!cancelled) { setData(res); setLoading(false) } })
      .catch(err => { if (!cancelled) { setError(err); setLoading(false) } })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugsKey])

  return { data, loading, error }
}

/** Jeden produkt po slug */
export const useProductBySlug = (slug: string) =>
  useSanityQuery(PRODUCT_BY_SLUG_QUERY, { slug })

/** Jedna kategoria po slug (z łańcuchem rodziców + dziećmi) */
export const useCategoryBySlug = (slug: string) =>
  useSanityQuery(CATEGORY_BY_SLUG_QUERY, { slug })

/** Produkty powiązane z tej samej kategorii */
export const useRelatedProducts = (categorySlug: string, currentSlug: string) =>
  useSanityQuery(
    categorySlug ? RELATED_PRODUCTS_QUERY : '',
    categorySlug ? { categorySlug, currentSlug } : undefined,
  )

/** Wszystkie posty bloga */
export const useAllBlogPosts = () =>
  useSanityQuery(ALL_BLOG_POSTS_QUERY)

/** Jeden post bloga po slug */
export const useBlogPostBySlug = (slug: string) =>
  useSanityQuery(BLOG_POST_BY_SLUG_QUERY, { slug })

/** Ustawienia witryny */
export const useSiteSettings = () =>
  useSanityQuery(SITE_SETTINGS_QUERY)
