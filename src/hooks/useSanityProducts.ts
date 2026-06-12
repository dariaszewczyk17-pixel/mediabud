// @ts-nocheck
import { useState, useEffect } from 'react'
import { sanityFetch } from '@/lib/sanity'
import {
  ALL_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  FEATURED_PRODUCTS_QUERY,
  ALL_CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
} from '@/lib/queries'

// ── Generic fetch hook ───────────────────────────────────────────────────────
function useSanityQuery<T>(query: string | null, params?: Record<string, any>) {
  const [data, setData]       = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<Error | null>(null)
  const paramsKey = JSON.stringify(params ?? {})

  useEffect(() => {
    if (!query) { setLoading(false); return }
    setLoading(true)
    sanityFetch<T>(query, params)
      .then(d => { setData(d); setLoading(false) })
      .catch(e => { setError(e); setLoading(false) })
  }, [query, paramsKey])

  return { data, loading, error }
}

// ── Wyspecjalizowane hooki ───────────────────────────────────────────────────

export function useAllProducts() {
  return useSanityQuery<any[]>(ALL_PRODUCTS_QUERY)
}

export function useProductsByCategory(slug: string | null) {
  return useSanityQuery<any[]>(slug ? PRODUCTS_BY_CATEGORY_QUERY : null, slug ? { slug } : undefined)
}

export function useProductBySlug(slug: string | null) {
  return useSanityQuery<any>(slug ? PRODUCT_BY_SLUG_QUERY : null, slug ? { slug } : undefined)
}

export function useFeaturedProducts(limit = 12) {
  return useSanityQuery<any[]>(FEATURED_PRODUCTS_QUERY, { limit })
}

export function useSearchProducts(q: string) {
  return useSanityQuery<any[]>(q.length > 1 ? ALL_PRODUCTS_QUERY : null)
}

export function useAllCategories() {
  return useSanityQuery<any[]>(ALL_CATEGORIES_QUERY)
}

export function useCategoryBySlug(slug: string | null) {
  return useSanityQuery<any>(slug ? CATEGORY_BY_SLUG_QUERY : null, slug ? { slug } : undefined)
}
