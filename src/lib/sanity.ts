import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'nzcwegq7',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,          // ← CDN edge cache — kluczowe dla szybkości!
  perspective: 'published',
})

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: any) => builder.image(source)

// SWR in-memory cache — stale-while-revalidate pattern
// Zwraca stale data natychmiast, odświeża w tle po wygaśnięciu TTL.
// Eliminuje loading spinnery przy powrocie do kategorii.
const queryCache = new Map<string, { data: any; ts: number }>()
const CACHE_TTL = 5 * 60 * 1000        // 5 min — dane uznawane za świeże
const STALE_TTL = 30 * 60 * 1000       // 30 min — dane stale (serwowane natychmiast, odświeżane w tle)

// Subscribers notyfikowani gdy background revalidation przyniesie nowe dane
type Listener = () => void
const revalidationListeners = new Map<string, Set<Listener>>()

export function onRevalidate(query: string, params: Record<string, any> | undefined, cb: Listener): () => void {
  const key = query + JSON.stringify(params ?? {})
  if (!revalidationListeners.has(key)) revalidationListeners.set(key, new Set())
  revalidationListeners.get(key)!.add(cb)
  return () => { revalidationListeners.get(key)?.delete(cb) }
}

function notifyRevalidation(key: string) {
  revalidationListeners.get(key)?.forEach(cb => { try { cb() } catch {} })
}

export async function sanityFetch<T = any>(query: string, params?: Record<string, any>): Promise<T> {
  const key = query + JSON.stringify(params ?? {})
  const cached = queryCache.get(key)

  if (cached) {
    const age = Date.now() - cached.ts
    if (age < CACHE_TTL) {
      // Fresh — zwróć natychmiast
      return cached.data as T
    }
    if (age < STALE_TTL) {
      // Stale — zwróć natychmiast, odśwież w tle (SWR)
      sanityClient.fetch<T>(query, params ?? {})
        .then(freshData => {
          queryCache.set(key, { data: freshData, ts: Date.now() })
          notifyRevalidation(key)
        })
        .catch(() => {}) // background fail — stale data nadal ważne
      return cached.data as T
    }
    // Expired (>30 min) — pełny refetch
  }

  // Cold miss lub expired — normalny fetch z await
  try {
    const data = await sanityClient.fetch<T>(query, params ?? {})
    queryCache.set(key, { data, ts: Date.now() })
    return data
  } catch (error) {
    // Jeśli mamy stale data i fetch się nie udał — zwróć stale (graceful degradation)
    if (cached) {
      console.warn('[Sanity] Fetch failed, returning stale data')
      return cached.data as T
    }
    console.error('[Sanity] Fetch error:', error)
    throw error
  }
}

/**
 * Rozgrzewa cache bez blokowania — wywołaj na hover linka kategorii.
 * Jeśli dane już są w cache → no-op. Błędy ignorowane (fire & forget).
 */
export function prefetchSanity(query: string, params?: Record<string, any>): void {
  const key = query + JSON.stringify(params ?? {})
  if (queryCache.has(key)) return          // już w cache — nic nie rób
  sanityFetch(query, params).catch(() => {}) // fire & forget
}
