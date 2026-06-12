import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J'
});

async function fix() {
  console.log('Pobieranie wszystkich kategorii...');
  const categories = await client.fetch(`*[_type == "category"]{
    _id, name, "slug": slug.current, "parent": parent->_id
  }`);
  
  const catMap = new Map(categories.map(c => [c._id, c]));
  
  // Funkcja do znajdowania rootCategory
  function getRootCategory(catId) {
    let current = catMap.get(catId);
    let depth = 0;
    while (current && current.parent && depth < 10) {
      current = catMap.get(current.parent);
      depth++;
    }
    return current ? current._id : null;
  }
  
  console.log('Pobieranie produktów z kategorii "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych"...');
  const products = await client.fetch(`*[_type == "product" && category->slug.current == "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych"]{
    _id, name, "catId": category->_id, "rootCat": rootCategory->_id
  }`);
  
  console.log(`Znaleziono ${products.length} produktów w tej kategorii.`);
  
  // Sprawdźmy, czy kategoria "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych" ma poprawnego rodzica
  const cat = categories.find(c => c.slug === "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych");
  console.log('Kategoria:', cat);
  
  if (cat && cat.parent) {
    const parent = catMap.get(cat.parent);
    console.log('Rodzic:', parent);
    
    const root = catMap.get(getRootCategory(cat._id));
    console.log('Root:', root);
  }
}

fix().catch(console.error);
