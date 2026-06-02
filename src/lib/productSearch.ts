import type { Product } from "@/data/products";

export interface RankedProductResult {
  product: Product;
  score: number;
}

/**
 * Normalizuje tekst do porównań: lowercase + usunięcie polskich znaków diakrytycznych.
 * "klejący" → "klejacy", "Farby Elewacyjne" → "farby elewacyjne"
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // usuwa znaki diakrytyczne (å→a, ę→e, ł→l itd.)
    .replace(/ł/g, "l")                // ł nie rozkłada się przez NFD
    .replace(/\u0142/g, "l");          // zapasowo dla ł w innym kodowaniu
}

export function scoreProductAgainstQuery(product: Product, rawQuery: string): number {
  const qRaw  = rawQuery.toLowerCase().trim();
  const q     = normalize(rawQuery);
  if (!q) return 0;

  const tokens    = q.split(/\s+/).filter(Boolean);
  const tokensRaw = qRaw.split(/\s+/).filter(Boolean);

  // Normalizowane pola
  const name        = normalize(product.name);
  const brand       = normalize(product.brand);
  const sku         = product.sku.toLowerCase();
  const shortDesc   = normalize(product.shortDescription);
  const desc        = normalize(product.description);
  const application = normalize(product.application);
  const tags        = product.tags.map(normalize);
  const specText    = product.technicalSpec
    .map(s => normalize(`${s.label} ${s.value}`))
    .join(" ");

  // Oryginalne pola (dla dokładnych dopasowań z bonusem)
  const nameRaw  = product.name.toLowerCase();
  const brandRaw = product.brand.toLowerCase();

  let score = 0;

  // — Pełna fraza (bonus za dokładność) —
  if (nameRaw.startsWith(qRaw))  score += 30;   // dokładne dopasowanie z akcentami
  if (name.startsWith(q))        score += 140;
  if (name.includes(q))          score += 90;
  if (brand.startsWith(q))       score += 55;
  if (brand.includes(q))         score += 35;
  if (brandRaw.includes(qRaw))   score += 15;   // bonus za dokładną markę
  if (sku.includes(qRaw))        score += 80;   // SKU zawsze raw
  if (shortDesc.includes(q))     score += 35;
  if (desc.includes(q))          score += 20;
  if (application.includes(q))   score += 20;
  if (specText.includes(q))      score += 15;
  if (tags.some(t => t === q))   score += 70;
  if (tags.some(t => t.includes(q))) score += 25;

  // — Tokeny (każde słowo osobno) —
  for (let i = 0; i < tokens.length; i++) {
    const token    = tokens[i];
    const tokenRaw = tokensRaw[i] ?? token;
    if (name.startsWith(token))          score += 40;
    if (name.includes(token))            score += 22;
    if (brand.includes(token))           score += 12;
    if (brandRaw.includes(tokenRaw))     score += 5;   // bonus za dokładne słowo marki
    if (sku.includes(tokenRaw))          score += 18;
    if (shortDesc.includes(token))       score += 10;
    if (desc.includes(token))            score += 6;
    if (application.includes(token))     score += 6;
    if (specText.includes(token))        score += 5;
    if (tags.some(t => t === token))     score += 15;
    if (tags.some(t => t.includes(token))) score += 8;
  }

  // — Bonus za liczbę pasujących tokenów —
  const matchedTokens = tokens.filter(t =>
    name.includes(t) || brand.includes(t) || shortDesc.includes(t)
  ).length;
  if (tokens.length > 1 && matchedTokens === tokens.length) score += 50; // wszystkie słowa trafione

  return score;
}

export function searchProducts(products: Product[], rawQuery: string, limit?: number): Product[] {
  const ranked = products
    .map(product => ({ product, score: scoreProductAgainstQuery(product, rawQuery) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name, "pl"));

  const sliced = typeof limit === "number" ? ranked.slice(0, limit) : ranked;
  return sliced.map(({ product }) => product);
}
