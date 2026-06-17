// ── Fragmenty GROQ ─────────────────────────────────────────────────────────

const CATEGORY_CHAIN = `{
  _id, "slug": slug.current, name,
  "parent": parent->{
    _id, "slug": slug.current, name,
    "parent": parent->{
      _id, "slug": slug.current, name,
      "parent": parent->{ _id, "slug": slug.current, name }
    }
  }
}`

// Odchudzone pola karty produktu — bez categoryChain
const PRODUCT_CARD_FIELDS = `{
  _id, "id": _id,
  "slug": slug.current,
  name, sku, unit, featured, inStock, popularity,
  shortDescription, tags,
  "categorySlug": category->slug.current,
  "categoryName": category->name,
  "brand": brand->name,
  "images": images[0..0].asset->url,
  technicalSpec[0...6]{ key, label, value, unit, priority },
  _createdAt
}`

// Pełne pola produktu (szczegóły) — z wszystkimi joinami
const PRODUCT_FULL_FIELDS = `{
  _id, "id": _id,
  "slug": slug.current,
  name, sku, unit, featured, inStock, popularity,
  priceMin, priceMax,
  shortDescription, description, application,
  advantages, warnings, tags, seoDescription,
  technicalSpec[]{ key, label, value, unit, priority },
  faq[]{ q, a },
  "categorySlug": category->slug.current,
  "categoryName": category->name,
  "categoryChain": category->${CATEGORY_CHAIN},
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

const NO_PLACEHOLDER = `!(name match "P-*")`

// ── Zoptymalizowane pola dla kart (minimalne joiny) ────────────────────────
const PRODUCT_META_FIELDS = `{
  _id,
  "slug": slug.current,
  name,
  shortDescription,
  "categorySlug": category->slug.current,
  "brand": brand->name,
  unit,
  tags,
  featured,
  inStock,
  popularity,
  "images": images[0..0].asset->url,
  technicalSpec[0...6]{ key, label, value, unit, priority }
}`

// ── Queries ────────────────────────────────────────────────────────────────

export const ALL_CATEGORIES_QUERY =
  `*[_type == "category" && !defined(parent)] | order(order asc, name asc) ${CATEGORY_FIELDS}`

export const ALL_PRODUCTS_QUERY =
  `*[_type == "product" && ${NO_PLACEHOLDER}] | order(coalesce(popularity, 50) desc, name asc) [0...10000] ${PRODUCT_CARD_FIELDS}`

export const FEATURED_PRODUCTS_QUERY =
  `*[_type == "product" && featured == true && ${NO_PLACEHOLDER}][0...12] ${PRODUCT_CARD_FIELDS}`

// ⚡ Kluczowa optymalizacja: jeden join zamiast czterech poziomów parent->
export const PRODUCTS_BY_CATEGORY_SLUGS_QUERY =
  `*[_type == "product" && category->slug.current in $slugs && ${NO_PLACEHOLDER}] | order(coalesce(popularity, 50) desc, name asc) [0...$limit] ${PRODUCT_CARD_FIELDS}`

// ⚡ Query A — metadane produktów po slugach kategorii
// Sortowanie: popularity desc (najpopularniejsze na górze)
export const PRODUCT_META_BY_CATEGORY_SLUGS_QUERY =
  `*[_type == "product" && category->slug.current in $slugs && ${NO_PLACEHOLDER}] | order(coalesce(popularity, 50) desc, name asc) [0...10000] ${PRODUCT_META_FIELDS}`

// ⚡⚡ SUPER FAST — używa _ref zamiast joina (17x szybsze!)
// Pierwsza strona produktów dla natychmiastowego wyświetlenia
export const PRODUCT_META_FAST_QUERY =
  `*[_type == "product" && rootCategory._ref == $catId && ${NO_PLACEHOLDER}] | order(coalesce(popularity, 50) desc) [0...48] ${PRODUCT_META_FIELDS}`

// ⚡⚡ SUPER FAST PAGINATED — używa _ref zamiast joina
// Paginacja z offset/end dla infinite scroll
export const PRODUCT_META_FAST_PAGINATED_QUERY =
  `*[_type == "product" && rootCategory._ref == $catId && ${NO_PLACEHOLDER}] | order(coalesce(popularity, 50) desc) [$offset...$end] ${PRODUCT_META_FIELDS}`

// ⚡⚡ SUPER FAST COUNT — szybkie zliczenie bez joina
export const PRODUCT_COUNT_FAST_QUERY =
  `count(*[_type == "product" && rootCategory._ref == $catId && ${NO_PLACEHOLDER}])`

// ── Legacy queries (zachowane dla kompatybilności) ─────────────────────────

export const PRODUCT_META_BY_CAT_FIRST_QUERY =
  `*[_type == "product" && ${NO_PLACEHOLDER} && rootCategory->slug.current == $catSlug] | order(coalesce(popularity, 50) desc) [0...48] ${PRODUCT_META_FIELDS}`

export const PRODUCT_META_BY_ROOT_CAT_QUERY =
  `*[_type == "product" && ${NO_PLACEHOLDER} && rootCategory->slug.current == $catSlug] | order(coalesce(popularity, 50) desc, name asc) [0...10000] ${PRODUCT_META_FIELDS}`

export const PRODUCT_META_PAGINATED_QUERY =
  `*[_type == "product" && ${NO_PLACEHOLDER} && rootCategory->slug.current == $catSlug] | order(coalesce(popularity, 50) desc, name asc) [$offset...$end] ${PRODUCT_META_FIELDS}`

export const PRODUCT_COUNT_BY_ROOT_CAT_QUERY =
  `count(*[_type == "product" && ${NO_PLACEHOLDER} && rootCategory->slug.current == $catSlug])`

export const PRODUCTS_BY_CATEGORY_QUERY =
  `*[_type == "product" && category->slug.current == $slug && ${NO_PLACEHOLDER}] | order(coalesce(popularity, 50) desc, name asc) ${PRODUCT_CARD_FIELDS}`

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
