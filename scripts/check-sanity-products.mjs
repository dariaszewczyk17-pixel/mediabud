import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function check() {
  const catSlug = 'sufity-podwieszane';
  
  // Sprawdźmy kategorię
  const cat = await client.fetch(`*[_type == "category" && slug.current == $catSlug][0]{
    _id, name, "slug": slug.current, "parent": parent->slug.current
  }`, { catSlug });
  
  console.log('Kategoria:', cat);
  
  // Sprawdźmy produkty z rootCategory
  const productsRoot = await client.fetch(`*[_type == "product" && rootCategory->slug.current == $catSlug][0...5]{
    name, "slug": slug.current, "cat": category->slug.current, "rootCat": rootCategory->slug.current
  }`, { catSlug });
  
  console.log('\nProdukty (rootCategory):', productsRoot);
  
  // Sprawdźmy produkty z category
  const productsCat = await client.fetch(`*[_type == "product" && category->slug.current == $catSlug][0...5]{
    name, "slug": slug.current, "cat": category->slug.current, "rootCat": rootCategory->slug.current
  }`, { catSlug });
  
  console.log('\nProdukty (category):', productsCat);
}

check().catch(console.error);
