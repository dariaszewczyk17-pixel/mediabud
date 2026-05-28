import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Klient Sanity – dane są wstrzykiwane przez zmienne środowiskowe Vite
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'nzcwegq7',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // zawsze świeże dane (bez CDN cache)
})

// Builder do URL zdjęć z Sanity
const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: any) => builder.image(source)

// Pomocnik do pobierania danych GROQ z obsługą błędów
export async function sanityFetch<T = any>(query: string, params?: Record<string, any>): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, params ?? {})
  } catch (error) {
    console.error('[Sanity] Fetch error:', error)
    throw error
  }
}
