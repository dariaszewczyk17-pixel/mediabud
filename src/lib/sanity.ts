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

// Prosty in-memory cache — unika powtórnych zapytań podczas sesji
const queryCache = new Map<string, { data: any; ts: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minut

export async function sanityFetch<T = any>(query: string, params?: Record<string, any>): Promise<T> {
  const key = query + JSON.stringify(params ?? {})
  const cached = queryCache.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data as T
  }
  try {
    const data = await sanityClient.fetch<T>(query, params ?? {})
    queryCache.set(key, { data, ts: Date.now() })
    return data
  } catch (error) {
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
