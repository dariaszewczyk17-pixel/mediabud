// ─── Zapytania GROQ dla Sanity CMS ──────────────────────────────────────────

// ─── Kategorie ───────────────────────────────────────────────────────────────

/** Wszystkie kategorie top-level z dziećmi (3 poziomy) */
export const ALL_CATEGORIES_QUERY = `
  *[_type == "category" && !defined(parent)] | order(order asc) {
    _id, name, slug, icon, description,
    "children": *[_type == "category" && parent._ref == ^._id] | order(order asc) {
      _id, name, slug, icon,
      "children": *[_type == "category" && parent._ref == ^._id] | order(order asc) {
        _id, name, slug
      }
    }
  }
`

/** Jedna kategoria po slug – z łańcuchem rodziców (breadcrumbs) i dziećmi */
export const CATEGORY_BY_SLUG_QUERY = `
  *[_type == "category" && slug.current == $slug][0] {
    _id, name, slug, icon, description,
    "parent": parent-> {
      _id, name, slug,
      "parent": parent-> {
        _id, name, slug,
        "parent": parent-> { _id, name, slug }
      }
    },
    "children": *[_type == "category" && parent._ref == ^._id] | order(order asc) {
      _id, name, slug, icon,
      "children": *[_type == "category" && parent._ref == ^._id] | order(order asc) {
        _id, name, slug
      }
    }
  }
`

// ─── Produkty ─────────────────────────────────────────────────────────────────

/** Produkty dla jednej kategorii (po slug) */
export const PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && category->slug.current == $slug] | order(name asc) {
    _id, name, slug, brand, unit, priceMin, priceMax,
    featured, inStock, shortDescription, tags,
    "categorySlug": category->slug.current,
    "categoryName": category->name,
    "images": images[].asset->url,
    specs
  }
`

/** Produkty dla wielu kategorii jednocześnie (obejmuje podkategorie) */
export const PRODUCTS_BY_CATEGORY_SLUGS_QUERY = `
  *[_type == "product" && category->slug.current in $slugs] | order(name asc) {
    _id, name, slug, brand, unit, priceMin, priceMax,
    featured, inStock, shortDescription, tags,
    "categorySlug": category->slug.current,
    "categoryName": category->name,
    "images": images[].asset->url,
    specs
  }
`

/** Wszystkie produkty */
export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(name asc) {
    _id, name, slug, brand, unit, priceMin, priceMax,
    featured, inStock, shortDescription,
    "categorySlug": category->slug.current,
    "categoryName": category->name,
    "images": images[].asset->url,
    tags
  }
`

/** Polecane produkty (featured) */
export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(_createdAt desc)[0...8] {
    _id, name, slug, brand, unit, priceMin, priceMax,
    featured, inStock, shortDescription, tags,
    "categorySlug": category->slug.current,
    "images": images[].asset->url,
    specs
  }
`

/** Jeden produkt po slug – pełne dane */
export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id, name, slug, sku, brand, unit,
    shortDescription, description, tags, featured, inStock,
    priceMin, priceMax, metaTitle, metaDescription,
    "categorySlug": category->slug.current,
    "categoryName": category->name,
    "categoryParentSlug": category->parent->slug.current,
    "images": images[].asset->url,
    specs
  }
`

/** Produkty powiązane – z tej samej kategorii, max 4 */
export const RELATED_PRODUCTS_QUERY = `
  *[_type == "product"
    && category->slug.current == $categorySlug
    && slug.current != $currentSlug
  ] | order(_createdAt desc)[0...4] {
    _id, name, slug, brand, unit, priceMin,
    featured, inStock, shortDescription,
    "categorySlug": category->slug.current,
    "images": images[].asset->url,
    specs
  }
`

// ─── Blog ─────────────────────────────────────────────────────────────────────

export const ALL_BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id, title, slug, excerpt, coverImage,
    publishedAt, categories, readingTime
  }
`

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, excerpt, coverImage,
    content, publishedAt, categories, readingTime,
    metaTitle, metaDescription
  }
`

// ─── Ustawienia witryny ───────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteName, tagline, phone, email, address, nip,
    logo, ogImage, socials, metaTitle, metaDescription
  }
`
