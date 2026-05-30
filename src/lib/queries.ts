// ── Fragmenty GROQ ───────────────────────────────────────────────────────────

const PRODUCT_CARD_FIELDS = `{
  _id, "id": _id,
  "slug": slug.current,
  name, sku, unit, featured, inStock,
  shortDescription, tags,
  "categorySlug": category->slug.current,
  "categoryName": category->name,
  "brand": brand->name,
  "images": images[].asset->url
}`

const PRODUCT_FULL_FIELDS = `{
  _id, "id": _id,
  "slug": slug.current,
  name, sku, unit, featured, inStock,
  priceMin, priceMax,
  shortDescription, description, application,
  advantages, warnings, tags, seoDescription,
  technicalSpec[]{ label, value },
  faq[]{ q, a },
  "categorySlug": category->slug.current,
  "categoryName": category->name,
  "brand": brand->name,
  "images": images[].asset->url,
  "related": related[]->${PRODUCT_CARD_FIELDS}
}`

const CATEGORY_FIELDS = `{
  _id, "slug": slug.current, name, icon, description, order,
  "parentSlug": parent->slug.current,
  "parentName": parent->name,
  "children": *[_type=="category" && parent._ref == ^._id] | order(order asc, name asc) {
    _id, "slug": slug.current, name, order,
    "children": *[_type=="category" && parent._ref == ^._id] | order(order asc, name asc) {
      _id, "slug": slug.current, name, order,
      "children": *[_type=="category" && parent._ref == ^._id] | order(order asc, name asc) {
        _id, "slug": slug.current, name, order
      }
    }
  }
}`

// ── Filtr wykluczający puste placeholdery P-XXXXXXX ─────────────────────────
// Produkty z nazwą "P-XXXXXXX" to puste rekordy bez danych – nie pokazujemy ich na froncie
const NO_PLACEHOLDER = `!(name match "P-*")`

// ── Stałe queries (eksportowane dla useSanityData.ts) ───────────────────────

export const ALL_CATEGORIES_QUERY =
  `*[_type == "category" && !defined(parent)] | order(order asc, name asc) ${CATEGORY_FIELDS}`

export const ALL_PRODUCTS_QUERY =
  `*[_type == "product" && ${NO_PLACEHOLDER}] | order(name asc) [0...500] ${PRODUCT_CARD_FIELDS}`

export const FEATURED_PRODUCTS_QUERY =
  `*[_type == "product" && featured == true && ${NO_PLACEHOLDER}][0...12] ${PRODUCT_CARD_FIELDS}`

export const PRODUCTS_BY_CATEGORY_QUERY =
  `*[_type == "product" && category->slug.current == $slug && ${NO_PLACEHOLDER}] | order(name asc) ${PRODUCT_CARD_FIELDS}`

export const PRODUCTS_BY_CATEGORY_SLUGS_QUERY =
  `*[_type == "product" && category->slug.current in $slugs && ${NO_PLACEHOLDER}] | order(name asc) [0...600] ${PRODUCT_CARD_FIELDS}`

export const PRODUCT_BY_SLUG_QUERY =
  `*[_type == "product" && slug.current == $slug && ${NO_PLACEHOLDER}][0] ${PRODUCT_FULL_FIELDS}`

export const CATEGORY_BY_SLUG_QUERY =
  `*[_type == "category" && slug.current == $slug][0] ${CATEGORY_FIELDS}`

export const RELATED_PRODUCTS_QUERY =
  `*[_type == "product" && category->slug.current == $categorySlug && slug.current != $currentSlug && ${NO_PLACEHOLDER}][0...6] ${PRODUCT_CARD_FIELDS}`

export const ALL_BLOG_POSTS_QUERY =
  `*[_type == "blogPost"] | order(publishedAt desc) {
    _id, "slug": slug.current, title, excerpt,
    publishedAt, readingTime,
    "coverImage": coverImage.asset->url
  }`

export const BLOG_POST_BY_SLUG_QUERY =
  `*[_type == "blogPost" && slug.current == $slug][0] {
    _id, "slug": slug.current, title, excerpt,
    publishedAt, readingTime, categories,
    "coverImage": coverImage.asset->url,
    content, metaTitle, metaDescription
  }`

export const SITE_SETTINGS_QUERY =
  `*[_type == "siteSettings"][0] {
    siteName, tagline, phone, email, address, nip,
    "logo": logo.asset->url, socials, metaTitle, metaDescription
  }`

export const ALL_BRANDS_QUERY =
  `*[_type == "brand"] | order(name asc) {
    _id, "slug": slug.current, name, featured,
    "logo": logo.asset->url, website, country
  }`
