import { useState, useEffect } from 'react'
import { sanityFetch } from '@/lib/sanity'
import {
  ALL_CATEGORIES_QUERY,
  ALL_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCTS_BY_CATEGORY_SLUGS_QUERY,
  PRODUCT_META_BY_CATEGORY_SLUGS_QUERY,
  PRODUCT_META_BY_CAT_FIRST_QUERY,
  PRODUCT_META_BY_ROOT_CAT_QUERY,
  PRODUCT_META_PAGINATED_QUERY,
  PRODUCT_COUNT_BY_ROOT_CAT_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  FEATURED_PRODUCTS_QUERY,
  RELATED_PRODUCTS_QUERY,
  ALL_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
  ALL_BRANDS_QUERY,
} from '@/lib/queries'

// âââ Bazowy hook ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function useSanityQuery<T>(query: string, params?: Record<string, any>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    if (!query) { setData(null); setLoading(false); return }
    let cancelled = false
    setData(null)      // â czyÅÄ stare dane natychmiast przy zmianie zapytania
    setLoading(true)
    sanityFetch<T>(query, params)
      .then(res => { if (!cancelled) { setData(res); setLoading(false) } })
      .catch(err => { if (!cancelled) { setError(err); setLoading(false) } })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, paramsKey])

  return { data, loading, error }
}

// âââ Eksportowane hooki âââââââââââââââââââââââââââââââââââââââââââââââââââââââ

/** Wszystkie kategorie top-level z dzieÄmi */
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
 * PrzekaÅ´ wynik collectAllSlugs(sanityCategory).
 * Hook jest wyÅÄczony (skip) gdy slugs jest pustÄ tablicÄ.
 */
export function useProductsByCategorySlugs(slugs: string[]) {
  const [data, setData] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const slugsKey = slugs.join(',')

  useEffect(() => {
    if (!slugs.length) { setData(null); setLoading(false); return }
    let cancelled = false
    setData(null)      // â czyÅÄ stare dane natychmiast przy zmianie kategorii
    setLoading(true)
    sanityFetch<any[]>(PRODUCTS_BY_CATEGORY_SLUGS_QUERY, { slugs, limit: 2000 })
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

/** Jedna kategoria po slug (z ÅaÅcuchem rodzicÃ³w + dzieÄmi) */
export const useCategoryBySlug = (slug: string) =>
  useSanityQuery(CATEGORY_BY_SLUG_QUERY, { slug })

/** Produkty powiÄzane z tej samej kategorii */
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

/** Wszystkie marki */
export const useAllBrands = () =>
  useSanityQuery(ALL_BRANDS_QUERY)

// âââ Typ metadanych produktu (Query A) âââââââââââââââââââââââââââââââââââââââ

export interface ProductMeta {
  _id: string
  slug: string
  name: string
  shortDescription?: string
  images?: string[]
  categorySlug: string
  brand: string
  unit: string
  tags: string[]
  featured: boolean
  inStock: boolean
}

/**
 * â¡ FAST FIRST PAGE â pierwsze 48 produktÃ³w dla natychmiastowego wyÅwietlenia.
 * WywoÅaj rÃ³wnolegle z useProductMetaByCatSlug. Zwraca dane w~200-400ms.
 */
export function useProductMetaByCatSlugFast(catSlug: string | undefined) {
  const [data, setData] = useState<ProductMeta[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!catSlug) { setData(null); setLoading(false); return }
    let cancelled = false
    setData(null)
    setLoading(true)
    sanityFetch<ProductMeta[]>(PRODUCT_META_BY_CAT_FIRST_QUERY, { catSlug })
      .then(res => { if (!cancelled) { setData(res); setLoading(false) } })
      .catch(err => { if (!cancelled) { setError(err); setLoading(false) } })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catSlug])

  return { data, loading, error }
}

/**
 * â¡ Query B FULL â wszystkie produkty przez $catSlug, optymalizowane `in` subquery.
 * Åaduj w tle rÃ³wnolegle z useProductMetaByCatSlugFast.
 */
export function useProductMetaByCatSlug(catSlug: string | undefined) {
  const [data, setData] = useState<ProductMeta[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!catSlug) { setData(null); setLoading(false); return }
    let cancelled = false
    setData(null)
    setLoading(true)
    sanityFetch<ProductMeta[]>(PRODUCT_META_BY_ROOT_CAT_QUERY, { catSlug })
      .then(res => { if (!cancelled) { setData(res); setLoading(false) } })
      .catch(err => { if (!cancelled) { setError(err); setLoading(false) } })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catSlug])

  return { data, loading, error }
}

/**
 * â¡ Query A â metadane produktÃ³w + pierwsze zdjÄcie + shortDescription.
 * UÅ¼ywany do kart produktÃ³w w CategoryPage (limit 500).
 * PeÅna galeria i dÅugi opis Åadowane dopiero w ProductDetail.
 */
export function useProductMetaByCategorySlugs(slugs: string[]) {
  const [data, setData] = useState<ProductMeta[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const slugsKey = slugs.join(',')

  useEffect(() => {
    if (!slugs.length) { setData(null); setLoading(false); return }
    let cancelled = false
    setData(null)      // ← czyść stare dane natychmiast przy zmianie kategorii
    setLoading(true)
    sanityFetch<ProductMeta[]>(PRODUCT_META_BY_CATEGORY_SLUGS_QUERY, { slugs })
      .then(res => { if (!cancelled) { setData(res); setLoading(false) } })
      .catch(err => { if (!cancelled) { setError(err); setLoading(false) } })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugsKey])

  return { data, loading, error }
}

// ─── Paginated loading (infinite scroll) ─────────────────────────────────────

const PAGE_SIZE = 48

/**
 * ⚡ Paginated product loading — ładuje produkty stronami po 48.
 * Zwraca accumulated products + loadMore() + hasMore + total count.
 * Używaj zamiast useProductMetaByCatSlug gdy kategoria ma >200 produktów.
 */
export function useProductMetaPaginated(catSlug: string | undefined) {
  const [pages, setPages] = useState<ProductMeta[][]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [total, setTotal] = useState<number | null>(null)
  const [error, setError] = useState<Error | null>(null)

  // Reset przy zmianie kategorii
  useEffect(() => {
    if (!catSlug) { setPages([]); setTotal(null); return }
    let cancelled = false
    setPages([])
    setLoading(true)
    setError(null)

    // Ładuj pierwszą stronę + count równolegle
    Promise.all([
      sanityFetch<ProductMeta[]>(PRODUCT_META_PAGINATED_QUERY, {
        catSlug, offset: 0, end: PAGE_SIZE,
      }),
      sanityFetch<number>(PRODUCT_COUNT_BY_ROOT_CAT_QUERY, { catSlug }),
    ])
      .then(([firstPage, count]) => {
        if (cancelled) return
        setPages([firstPage])
        setTotal(count)
        setLoading(false)
      })
      .catch(err => {
        if (cancelled) return
        setError(err)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [catSlug])

  const allProducts = pages.flat()
  const hasMore = total !== null && allProducts.length < total

  const loadMore = async () => {
    if (!catSlug || loadingMore || !hasMore) return
    setLoadingMore(true)
    try {
      const offset = allProducts.length
      const nextPage = await sanityFetch<ProductMeta[]>(PRODUCT_META_PAGINATED_QUERY, {
        catSlug, offset, end: offset + PAGE_SIZE,
      })
      setPages(prev => [...prev, nextPage])
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoadingMore(false)
    }
  }

  return {
    data: allProducts.length > 0 ? allProducts : null,
    loading,
    loadingMore,
    hasMore,
    total,
    loadMore,
    error,
  }
}
