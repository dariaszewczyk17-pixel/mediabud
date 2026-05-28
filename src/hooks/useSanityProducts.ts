import { useState, useEffect } from 'react'
import { sanityFetch } from '@/lib/sanity'
import {
  getAllProducts,
  getProductsByCategory,
  getProductBySlug as queryBySlug,
  getFeaturedProducts as queryFeatured,
  searchProducts as querySearch,
  getAllCategories,
  getCategoryBySlug as queryCatBySlug,
} from '@/lib/queries'

// ── Generic fetch hook ───────────────────────────────────────────────────────
function useSanityQuery<T>(query: string | null) {
  const [data, setData]       = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<Error | null>(null)

  useEffect(() => {
    if (!query) { setLoading(false); return }
    setLoading(true)
    sanityFetch<T>(query)
      .then(d => { setData(d); setLoading(false) })
      .catch(e => { setError(e); setLoading(false) })
  }, [query])

  return { data, loading, error }
}

// ── Wyspecjalizowane hooki ───────────────────────────────────────────────────

export function useAllProducts() {
  return useSanityQuery<any[]>(getAllProducts())
}

export function useProductsByCategory(slug: string | null) {
  return useSanityQuery<any[]>(slug ? getProductsByCategory(slug) : null)
}

export function useProductBySlug(slug: string | null) {
  return useSanityQuery<any>(slug ? queryBySlug(slug) : null)
}

export function useFeaturedProducts(limit = 12) {
  return useSanityQuery<any[]>(queryFeatured(limit))
}

export function useSearchProducts(q: string) {
  return useSanityQuery<any[]>(q.length > 1 ? querySearch(q) : null)
}

export function useAllCategories() {
  return useSanityQuery<any[]>(getAllCategories())
}

export function useCategoryBySlug(slug: string | null) {
  return useSanityQuery<any>(slug ? queryCatBySlug(slug) : null)
}
