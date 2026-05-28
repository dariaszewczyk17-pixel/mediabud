import type { Product } from "@/data/products";

export interface RankedProductResult {
  product: Product;
  score: number;
}

export function scoreProductAgainstQuery(product: Product, rawQuery: string): number {
  const q = rawQuery.toLowerCase().trim();
  if (!q) return 0;

  const tokens = q.split(/\s+/).filter(Boolean);
  const name = product.name.toLowerCase();
  const brand = product.brand.toLowerCase();
  const sku = product.sku.toLowerCase();
  const shortDescription = product.shortDescription.toLowerCase();
  const description = product.description.toLowerCase();
  const application = product.application.toLowerCase();
  const tags = product.tags.map((tag) => tag.toLowerCase());
  const technicalSpecText = product.technicalSpec
    .map((spec) => `${spec.label} ${spec.value}`.toLowerCase())
    .join(" ");

  let score = 0;

  if (name.startsWith(q)) score += 140;
  if (name.includes(q)) score += 90;
  if (brand.startsWith(q)) score += 55;
  if (brand.includes(q)) score += 35;
  if (sku.includes(q)) score += 80;
  if (shortDescription.includes(q)) score += 35;
  if (description.includes(q)) score += 20;
  if (application.includes(q)) score += 20;
  if (technicalSpecText.includes(q)) score += 15;
  if (tags.some((tag) => tag === q)) score += 70;
  if (tags.some((tag) => tag.includes(q))) score += 25;

  for (const token of tokens) {
    if (name.startsWith(token)) score += 40;
    if (name.includes(token)) score += 22;
    if (brand.includes(token)) score += 12;
    if (sku.includes(token)) score += 18;
    if (shortDescription.includes(token)) score += 10;
    if (description.includes(token)) score += 6;
    if (application.includes(token)) score += 6;
    if (technicalSpecText.includes(token)) score += 5;
    if (tags.some((tag) => tag === token)) score += 15;
    if (tags.some((tag) => tag.includes(token))) score += 8;
  }

  return score;
}

export function searchProducts(products: Product[], rawQuery: string, limit?: number): Product[] {
  const ranked = products
    .map((product) => ({ product, score: scoreProductAgainstQuery(product, rawQuery) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name, "pl"));

  const sliced = typeof limit === "number" ? ranked.slice(0, limit) : ranked;
  return sliced.map(({ product }) => product);
}
