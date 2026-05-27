// Zapytania GROQ dla wszystkich typów danych

// ─── Kategorie ──────────────────────────────────────────────
export const ALL_CATEGORIES_QUERY = `
  *[_type == "category" && !defined(parent)] | order(order asc) {
    _id,
    name,
    slug,
    icon,
    image,
    description,
    "children": *[_type == "category" && references(^._id)] | order(order asc) {
      _id, name, slug, icon
    }
  }
`

export const CATEGORY_BY_SLUG_QUERY = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    icon,
    image,
    description,
    "children": *[_type == "category" && references(^._id)] | order(order asc) {
      _id, name, slug, icon
    }
  }
`

// ─── Produkty ───────────────────────────────────────────────
export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(name asc) {
    _id,
    name,
    slug,
    brand,
    unit,
    priceMin,
    priceMax,
    featured,
    inStock,
    shortDescription,
    images,
    tags,
    "categorySlug": category->slug.current,
    "categoryName": category->name
  }
`

export const PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && category->slug.current == $slug] | order(name asc) {
    _id,
    name,
    slug,
    brand,
    unit,
    priceMin,
    priceMax,
    featured,
    inStock,
    shortDescription,
    images,
    tags,
    "categorySlug": category->slug.current,
    "categoryName": category->name
  }
`

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    sku,
    brand,
    unit,
    priceMin,
    priceMax,
    featured,
    inStock,
    shortDescription,
    description,
    images,
    specs,
    tags,
    metaTitle,
    metaDescription,
    "categorySlug": category->slug.current,
    "categoryName": category->name
  }
`

export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(_createdAt desc)[0..11] {
    _id,
    name,
    slug,
    brand,
    unit,
    priceMin,
    images,
    "categorySlug": category->slug.current
  }
`

// ─── Blog ────────────────────────────────────────────────────
export const ALL_BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    categories,
    readingTime
  }
`

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    content,
    publishedAt,
    categories,
    readingTime,
    metaTitle,
    metaDescription
  }
`

// ─── Ustawienia witryny ──────────────────────────────────────
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    phone,
    email,
    address,
    nip,
    logo,
    ogImage,
    socials,
    metaTitle,
    metaDescription
  }
`
