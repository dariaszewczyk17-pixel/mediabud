// ââ Fragmenty GROQ âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

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

// Odchudzone pola karty produktu â bez categoryChain i technicalSpec
// To eliminuje dziesiÄtki tysiÄcy dodatkowych joinÃ³w przy duÅ¼ych listach
const PRODUCT_CARD_FIELDS = `{
  _id, "id": _id,
  "slug": slug.current,
  name, sku, unit, featured, inStock,
  shortDescription, tags,
  "categorySlug": category->slug.current,
  "categoryName": category->name,
  "brand": brand->name,
  "images": images[0..0].asset->url,
  technicalSpec[0...6]{ key, label, value, unit, priority }
}`

// PeÅne pola produktu (szczegÃ³Åy) â z wszystkimi joinami
const PRODUCT_FULL_FIELDS = `{
  _id, "id": _id,
  "slug": slug.current,
  name, sku, unit, featured, inStock,
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

// ââ Queries ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const ALL_CATEGORIES_QUERY =
  `*[_type == "category" && !defined(parent)] | order(order asc, name asc) ${CATEGORY_FIELDS}`

export const ALL_PRODUCTS_QUERY =
  `*[_type == "product" && ${NO_PLACEHOLDER}] | order(name asc) [0...10000] ${PRODUCT_CARD_FIELDS}`

export const FEATURED_PRODUCTS_QUERY =
  `*[_type == "product" && featured == true && ${NO_PLACEHOLDER}][0...12] ${PRODUCT_CARD_FIELDS}`

// â¡ Kluczowa optymalizacja: jeden join zamiast czterech poziomÃ³w parent->
// collectAllSlugs() po stronie frontu dostarcza juÅ¼ WSZYSTKIE podkategorie,
// wiÄc wystarczy sprawdziÄ bezpoÅredni slug kategorii produktu.
export const PRODUCTS_BY_CATEGORY_SLUGS_QUERY =
  `*[_type == "product" && category->slug.current in $slugs && ${NO_PLACEHOLDER}] | order(name asc) [0...$limit] ${PRODUCT_CARD_FIELDS}`

// â¡ Query A â metadane + pierwsze zdjÄcie + shortDescription produktÃ³w
// PeÅne pola (opisy, galeria) Åadowane dopiero w ProductDetail przez PRODUCT_BY_SLUG_QUERY.
// STARA wersja (array $slugs) â zachowana dla kompatybilnoÅci
export const PRODUCT_META_BY_CATEGORY_SLUGS_QUERY =
  `*[_type == "product" && category->slug.current in $slugs && ${NO_PLACEHOLDER}] | order(name asc) [0...10000] {
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
  "images": images[0..0].asset->url,
  technicalSpec[0...6]{ key, label, value, unit, priority }
}`

// â¡ Query B (FAST FIRST PAGE) â tylko pierwsze 48 produktÃ³w dla natychmiastowego wyÅwietlenia.
// UÅ¼ywa `in` subquery: lista ID kategorii obliczana RAZ, potem O(1) per produkt (zamiast O(4Ãn)).
export const PRODUCT_META_BY_CAT_FIRST_QUERY =
  `*[_type == "product" && ${NO_PLACEHOLDER} && rootCategory->slug.current == $catSlug] | order(featured desc) [0...48] {
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
  "images": images[0..0].asset->url,
  technicalSpec[0...6]{ key, label, value, unit, priority }
}`

// â¡ Query B FULL â wszystkie produkty kategorii, Åadowane w tle po wyÅwietleniu pierwszej strony.
// `in` subquery: O(m) obliczenie listy ID kategorii (mâ100), potem O(n) porÃ³wnanie ID per produkt.
// Bez ORDER BY â sortowanie po stronie klienta w CategoryPage (szybsze niÅ¼ server-side na 5000 wierszach).
export const PRODUCT_META_BY_ROOT_CAT_QUERY =
  `*[_type == "product" && ${NO_PLACEHOLDER} && rootCategory->slug.current == $catSlug] [0...10000] {
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
  "images": images[0..0].asset->url,
  technicalSpec[0...6]{ key, label, value, unit, priority }
}`

// ⚡ PAGINATED — ładuje stronę produktów (offset/limit) dla infinite scroll.
// Używa $offset i $end z params. Sortowanie server-side (name asc).
export const PRODUCT_META_PAGINATED_QUERY =
  `*[_type == "product" && ${NO_PLACEHOLDER} && rootCategory->slug.current == $catSlug] | order(name asc) [$offset...$end] {
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
  "images": images[0..0].asset->url,
  technicalSpec[0...6]{ key, label, value, unit, priority }
}`

// ⚡ COUNT — szybkie zliczenie produktów w kategorii (dla UI "X produktów")
export const PRODUCT_COUNT_BY_ROOT_CAT_QUERY =
  `count(*[_type == "product" && ${NO_PLACEHOLDER} && rootCategory->slug.current == $catSlug])`

export const PRODUCTS_BY_CATEGORY_QUERY =
  `*[_type == "product" && category->slug.current == $slug && ${NO_PLACEHOLDER}] | order(name asc) ${PRODUCT_CARD_FIELDS}`

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
