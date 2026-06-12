import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J'
});

async function check() {
  const product = await client.fetch(`*[_type == "product" && slug.current == "nullifire-sc803-25-kg"][0]{
    name, "slug": slug.current, _id, sku
  }`);
  
  console.log("Produkt z Sanity:");
  console.log(JSON.stringify(product, null, 2));
  
  // Sprawdźmy jak wygląda URL w aplikacji
  // W ProductDetail.tsx URL to /produkt/:slug
  console.log(`\nOczekiwany URL: https://mediabud.pl/produkt/${product.slug}`);
  
  // Sprawdźmy czy są inne produkty z "null" w nazwie
  const nullProducts = await client.fetch(`*[_type == "product" && slug.current match "*null*"]{
    name, "slug": slug.current
  }`);
  
  console.log(`\nZnaleziono ${nullProducts.length} produktów z 'null' w slugu:`);
  nullProducts.slice(0, 5).forEach(p => console.log(`- ${p.name} (${p.slug})`));
}

check().catch(console.error);
