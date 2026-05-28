import type { Product } from "@/data/products";

export function getProductDedupKey(product: Pick<Product, "id" | "slug" | "sku">): string {
  const slugKey = product.slug?.trim().toLowerCase();
  const skuKey = product.sku?.trim().toLowerCase();
  return slugKey || skuKey || product.id;
}

export function mergeProductSources(
  primaryProduct: Product | null,
  secondaryProduct: Product | null,
): Product | null {
  if (!primaryProduct && !secondaryProduct) return null;
  if (!primaryProduct) return secondaryProduct;
  if (!secondaryProduct) return primaryProduct;

  return {
    ...primaryProduct,
    ...secondaryProduct,
    id: primaryProduct.id || secondaryProduct.id,
    slug: primaryProduct.slug || secondaryProduct.slug,
    name: primaryProduct.name || secondaryProduct.name,
    categorySlug: primaryProduct.categorySlug || secondaryProduct.categorySlug,
    brand: primaryProduct.brand || secondaryProduct.brand,
    sku: primaryProduct.sku || secondaryProduct.sku,
    unit: primaryProduct.unit || secondaryProduct.unit,
    shortDescription: secondaryProduct.shortDescription || primaryProduct.shortDescription,
    description: secondaryProduct.description || primaryProduct.description,
    application: secondaryProduct.application || primaryProduct.application,
    technicalSpec: secondaryProduct.technicalSpec?.length ? secondaryProduct.technicalSpec : primaryProduct.technicalSpec,
    images: primaryProduct.images?.length ? primaryProduct.images : secondaryProduct.images,
    tags: Array.from(new Set([...(primaryProduct.tags ?? []), ...(secondaryProduct.tags ?? [])])),
    related: secondaryProduct.related?.length ? secondaryProduct.related : primaryProduct.related,
    isFeatured: primaryProduct.isFeatured ?? secondaryProduct.isFeatured,
    isNew: secondaryProduct.isNew ?? primaryProduct.isNew,
    advantages: secondaryProduct.advantages ?? primaryProduct.advantages ?? [],
    warnings: secondaryProduct.warnings ?? primaryProduct.warnings ?? [],
    faq: secondaryProduct.faq ?? primaryProduct.faq ?? [],
    seoDescription: secondaryProduct.seoDescription || primaryProduct.seoDescription || "",
    metaTitle: secondaryProduct.metaTitle || primaryProduct.metaTitle || "",
    metaDesc: secondaryProduct.metaDesc || primaryProduct.metaDesc || "",
  };
}

export function mergeProductCollections(primaryProducts: Product[], secondaryProducts: Product[]): Product[] {
  const merged = new Map<string, Product>();

  for (const product of primaryProducts) {
    const key = getProductDedupKey(product);
    if (!key) continue;
    merged.set(key, product);
  }

  for (const product of secondaryProducts) {
    const key = getProductDedupKey(product);
    if (!key) continue;

    const existing = merged.get(key) ?? null;
    merged.set(key, mergeProductSources(existing, product) as Product);
  }

  return Array.from(merged.values());
}

export function dedupeProducts(products: Product[]): Product[] {
  const deduped = new Map<string, Product>();

  for (const product of products) {
    const key = getProductDedupKey(product);
    if (!key) continue;
    if (deduped.has(key)) continue;
    deduped.set(key, product);
  }

  return Array.from(deduped.values());
}
