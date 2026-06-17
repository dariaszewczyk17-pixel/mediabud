import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
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
  PRODUCT_META_FAST_QUERY,
  PRODUCT_META_FAST_PAGINATED_QUERY,
  PRODUCT_COUNT_FAST_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  FEATURED_PRODUCTS_QUERY,
  RELATED_PRODUCTS_QUERY,
  ALL_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
  ALL_BRANDS_QUERY,
} from '@/lib/queries'

// ─── Query Keys ─────────────────────────────────────────────────────────────
// Centralizowane klucze dla cache invalidation i deduplication

export const queryKeys = {
  categories: {
    all: ['categories'] as const,
    bySlug: (slug: string) => ['categories', slug] as const,
  },
  products: {
    all: ['products'] as const,
    featured: ['products', 'featured'] as const,
    bySlug: (slug: string) => ['products', slug] as const,
    byCategory: (slug: string) => ['products', 'category', slug] as const,
    byCategorySlugs: (slugs: string[]) => ['products', 'categorySlugs', slugs.join(',')] as const,
    metaByCatSlug: (catSlug: string) => ['products', 'meta', catSlug] as const,
    metaByCatSlugFast: (catSlug: string) => ['products', 'metaFast', catSlug] as const,
    metaByCategorySlugs: (slugs: string[]) => ['products', 'metaSlugs', slugs.join(',')] as const,
    metaPaginated: (catSlug: string) => ['products', 'metaPaginated', catSlug] as const,
    related: (categorySlug: string, currentSlug: string) => ['products', 'related', categorySlug, currentSlug] as const,
  },
  blog: {
    all: ['blog'] as const,
    bySlug: (slug: string) => ['blog', slug] as const,
  },
  brands: {
    all: ['brands'] as const,
  },
  settings: ['settings'] as const,
}

// ─── Helper: mapowanie na stary format {data, loading, error} ───────────────

function useQueryCompat<T>(queryResult: ReturnType<typeof useQuery<T>>) {
  return {
    data: queryResult.data ?? null,
    loading: queryResult.isLoading,
    error: queryResult.error,
  }
}

// ─── Eksportowane hooki ─────────────────────────────────────────────────────

/** Wszystkie kategorie top-level z dziećmi */
export function useAllCategories() {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.categories.all,
      queryFn: () => sanityFetch(ALL_CATEGORIES_QUERY),
    })
  )
}

/** Wszystkie produkty */
export function useAllProducts() {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.products.all,
      queryFn: () => sanityFetch(ALL_PRODUCTS_QUERY),
    })
  )
}

/** Produkty polecane (featured: true) */
export function useFeaturedProducts() {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.products.featured,
      queryFn: () => sanityFetch(FEATURED_PRODUCTS_QUERY),
    })
  )
}

/** Produkty dla jednej kategorii (slug) */
export function useProductsByCategory(slug: string) {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.products.byCategory(slug),
      queryFn: () => sanityFetch(PRODUCTS_BY_CATEGORY_QUERY, { slug }),
      enabled: !!slug,
    })
  )
}

/**
 * Produkty dla wielu kategorii naraz (slug + wszystkie podkategorie).
 * Przekaż wynik collectAllSlugs(sanityCategory).
 * Hook jest wyłączony (skip) gdy slugs jest pustą tablicą.
 */
export function useProductsByCategorySlugs(slugs: string[]) {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.products.byCategorySlugs(slugs),
      queryFn: () => sanityFetch<any[]>(PRODUCTS_BY_CATEGORY_SLUGS_QUERY, { slugs, limit: 2000 }),
      enabled: slugs.length > 0,
    })
  )
}

/** Jeden produkt po slug */
export function useProductBySlug(slug: string) {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.products.bySlug(slug),
      queryFn: () => sanityFetch(PRODUCT_BY_SLUG_QUERY, { slug }),
      enabled: !!slug,
    })
  )
}

/** Jedna kategoria po slug (z łańcuchem rodziców + dziećmi) */
export function useCategoryBySlug(slug: string) {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.categories.bySlug(slug),
      queryFn: () => sanityFetch(CATEGORY_BY_SLUG_QUERY, { slug }),
      enabled: !!slug,
    })
  )
}

/** Produkty powiązane z tej samej kategorii */
export function useRelatedProducts(categorySlug: string, currentSlug: string) {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.products.related(categorySlug, currentSlug),
      queryFn: () => sanityFetch(RELATED_PRODUCTS_QUERY, { categorySlug, currentSlug }),
      enabled: !!categorySlug,
    })
  )
}

/** Wszystkie posty bloga */
export function useAllBlogPosts() {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.blog.all,
      queryFn: () => sanityFetch(ALL_BLOG_POSTS_QUERY),
    })
  )
}

/** Jeden post bloga po slug */
export function useBlogPostBySlug(slug: string) {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.blog.bySlug(slug),
      queryFn: () => sanityFetch(BLOG_POST_BY_SLUG_QUERY, { slug }),
      enabled: !!slug,
    })
  )
}

/** Ustawienia witryny */
export function useSiteSettings() {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.settings,
      queryFn: () => sanityFetch(SITE_SETTINGS_QUERY),
    })
  )
}

/** Wszystkie marki */
export function useAllBrands() {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.brands.all,
      queryFn: () => sanityFetch(ALL_BRANDS_QUERY),
    })
  )
}

// ─── Typ metadanych produktu (Query A) ──────────────────────────────────────

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
  popularity?: number
  technicalSpec?: { label: string; value: string }[]
}

/**
 * ⚡ FAST FIRST PAGE — pierwsze 48 produktów dla natychmiastowego wyświetlenia.
 * Wywołaj równolegle z useProductMetaByCatSlug. Zwraca dane w ~200-400ms.
 */
export function useProductMetaByCatSlugFast(catSlug: string | undefined) {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.products.metaByCatSlugFast(catSlug || ''),
      queryFn: () => sanityFetch<ProductMeta[]>(PRODUCT_META_BY_CAT_FIRST_QUERY, { catSlug }),
      enabled: !!catSlug,
    })
  )
}

/**
 * ⚡ Query B FULL — wszystkie produkty przez $catSlug, optymalizowane `in` subquery.
 * Ładuj w tle równolegle z useProductMetaByCatSlugFast.
 */
export function useProductMetaByCatSlug(catSlug: string | undefined) {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.products.metaByCatSlug(catSlug || ''),
      queryFn: () => sanityFetch<ProductMeta[]>(PRODUCT_META_BY_ROOT_CAT_QUERY, { catSlug }),
      enabled: !!catSlug,
    })
  )
}

/**
 * ⚡ Query A — metadane produktów + pierwsze zdjęcie + shortDescription.
 * Używany do kart produktów w CategoryPage (limit 500).
 * Pełna galeria i długi opis ładowane dopiero w ProductDetail.
 */
export function useProductMetaByCategorySlugs(slugs: string[]) {
  return useQueryCompat(
    useQuery({
      queryKey: queryKeys.products.metaByCategorySlugs(slugs),
      queryFn: () => sanityFetch<ProductMeta[]>(PRODUCT_META_BY_CATEGORY_SLUGS_QUERY, { slugs }),
      enabled: slugs.length > 0,
    })
  )
}

// ─── Paginated loading (infinite scroll) ────────────────────────────────────

const PAGE_SIZE = 48

/**
 * ⚡ Paginated product loading — ładuje produkty stronami po 48.
 * Zwraca accumulated products + loadMore() + hasMore + total count.
 * Używaj zamiast useProductMetaByCatSlug gdy kategoria ma >200 produktów.
 */
export function useProductMetaPaginated(catSlug: string | undefined) {
  // Pobierz total count osobno
  const countQuery = useQuery({
    queryKey: [...queryKeys.products.metaPaginated(catSlug || ''), 'count'],
    queryFn: () => sanityFetch<number>(PRODUCT_COUNT_BY_ROOT_CAT_QUERY, { catSlug }),
    enabled: !!catSlug,
  })

  // Infinite query dla stron produktów
  const infiniteQuery = useInfiniteQuery({
    queryKey: queryKeys.products.metaPaginated(catSlug || ''),
    queryFn: ({ pageParam = 0 }) =>
      sanityFetch<ProductMeta[]>(PRODUCT_META_PAGINATED_QUERY, {
        catSlug,
        offset: pageParam,
        end: pageParam + PAGE_SIZE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = countQuery.data ?? 0
      const loaded = allPages.flat().length
      return loaded < total ? loaded : undefined
    },
    enabled: !!catSlug,
  })

  const allProducts = infiniteQuery.data?.pages.flat() ?? []
  const total = countQuery.data ?? null
  const hasMore = total !== null && allProducts.length < total

  return {
    data: allProducts.length > 0 ? allProducts : null,
    loading: infiniteQuery.isLoading || countQuery.isLoading,
    loadingMore: infiniteQuery.isFetchingNextPage,
    hasMore,
    total,
    loadMore: () => infiniteQuery.fetchNextPage(),
    error: infiniteQuery.error || countQuery.error,
  }
}

// ─── SUPER FAST hooks (używają _ref zamiast joina — 17x szybsze!) ────────────

/**
 * ⚡⚡ SUPER FAST — pierwsza strona produktów (48) w ~300ms zamiast ~6s
 * Używa rootCategory._ref zamiast rootCategory->slug.current
 */
export function useProductMetaFast(catId: string | undefined) {
  return useQueryCompat(
    useQuery({
      queryKey: ['products', 'metaFast', catId || ''],
      queryFn: () => sanityFetch<ProductMeta[]>(PRODUCT_META_FAST_QUERY, { catId }),
      enabled: !!catId,
    })
  )
}

/**
 * ⚡⚡ SUPER FAST PAGINATED — infinite scroll z _ref
 * Ładuje produkty stronami po 48, każda strona w ~300ms
 */
export function useProductMetaFastPaginated(catId: string | undefined) {
  const countQuery = useQuery({
    queryKey: ['products', 'countFast', catId || ''],
    queryFn: () => sanityFetch<number>(PRODUCT_COUNT_FAST_QUERY, { catId }),
    enabled: !!catId,
  })

  const infiniteQuery = useInfiniteQuery({
    queryKey: ['products', 'metaFastPaginated', catId || ''],
    queryFn: ({ pageParam = 0 }) =>
      sanityFetch<ProductMeta[]>(PRODUCT_META_FAST_PAGINATED_QUERY, {
        catId,
        offset: pageParam,
        end: pageParam + PAGE_SIZE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = countQuery.data ?? 0
      const loaded = allPages.flat().length
      return loaded < total ? loaded : undefined
    },
    enabled: !!catId,
  })

  const allProducts = infiniteQuery.data?.pages.flat() ?? []
  const total = countQuery.data ?? null
  const hasMore = total !== null && allProducts.length < total

  return {
    data: allProducts.length > 0 ? allProducts : null,
    loading: infiniteQuery.isLoading || countQuery.isLoading,
    loadingMore: infiniteQuery.isFetchingNextPage,
    hasMore,
    total,
    loadMore: () => infiniteQuery.fetchNextPage(),
    error: infiniteQuery.error || countQuery.error,
  }
}

export function useProductMetaFastWithLimit(catId: string | undefined, limit: number) {
const countQuery = useQuery({
queryKey: ['products', 'countFast', catId || ''],
queryFn: () => sanityFetch<number>(PRODUCT_COUNT_FAST_QUERY, { catId }),
enabled: !!catId,
});
const query = useQuery({
queryKey: ['products', 'metaFastLimit', catId || '', limit],
queryFn: () => sanityFetch<ProductMeta[]>(PRODUCT_META_FAST_PAGINATED_QUERY, {
catId,
offset: 0,
end: limit,
}),
enabled: !!catId,
});
const total = countQuery.data ?? null;
const data = query.data ?? null;
const hasMore = total !== null && (data?.length ?? 0) < total;
return {
data: data && data.length > 0 ? data : null,
loading: query.isLoading || countQuery.isLoading,
loadingMore: query.isFetching && !query.isLoading,
hasMore,
total,
error: query.error || countQuery.error,
};
}
