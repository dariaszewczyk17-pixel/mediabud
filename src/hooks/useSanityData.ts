import { useState, useEffect } from 'react'
import { sanityFetch } from '@/lib/sanity'
import {
  ALL_CATEGORIES_QUERY,
  ALL_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  ALL_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  FEATURED_PRODUCTS_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/lib/queries'

// Ogólny hook do pobierania danych z Sanity
function useSanityQuery<T>(query: string, params?: Record<string, any>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    sanityFetch<T>(query, params)
      .then((res) => { if (!cancelled) { setData(res); setLoading(false) } })
      .catch((err) => { if (!cancelled) { setError(err); setLoading(false) } })
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(params)])

  return { data, loading, error }
}

// ─── Eksportowane hooki ───────────────────────────────────────
export const useAllCategories = () => useSanityQuery(ALL_CATEGORIES_QUERY)
export const useAllProducts = () => useSanityQuery(ALL_PRODUCTS_QUERY)
export const useFeaturedProducts = () => useSanityQuery(FEATURED_PRODUCTS_QUERY)
export const useProductsByCategory = (slug: string) =>
  useSanityQuery(PRODUCTS_BY_CATEGORY_QUERY, { slug })
export const useProductBySlug = (slug: string) =>
  useSanityQuery(PRODUCT_BY_SLUG_QUERY, { slug })
export const useCategoryBySlug = (slug: string) =>
  useSanityQuery(CATEGORY_BY_SLUG_QUERY, { slug })
export const useAllBlogPosts = () => useSanityQuery(ALL_BLOG_POSTS_QUERY)
export const useBlogPostBySlug = (slug: string) =>
  useSanityQuery(BLOG_POST_BY_SLUG_QUERY, { slug })
export const useSiteSettings = () => useSanityQuery(SITE_SETTINGS_QUERY)
