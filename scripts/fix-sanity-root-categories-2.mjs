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
  
  console.log('Pobieranie produktów z błędnym rootCategory...');
  const products = await client.fetch(`*[_type == "product" && rootCategory->slug.current == "sufity-podwieszane" && (name match "Styropian*" || name match "Środek*")]{
    _id, name, "catId": category->_id
  }`);
  
  console.log(`Znaleziono ${products.length} produktów do poprawy.`);
  
  if (products.length === 0) return;
  
  // Przygotuj mutacje
  const mutations = products.map(p => {
    const correctRootId = getRootCategory(p.catId);
    return {
      patch: {
        id: p._id,
        set: {
          rootCategory: { _type: 'reference', _ref: correctRootId }
        }
      }
    };
  });
  
  console.log('Przykładowa mutacja:', JSON.stringify(mutations[0], null, 2));
  
  // Wykonaj mutacje w paczkach
  const BATCH_SIZE = 100;
  for (let i = 0; i < mutations.length; i += BATCH_SIZE) {
    const batch = mutations.slice(i, i + BATCH_SIZE);
    console.log(`Wysyłanie paczki ${i / BATCH_SIZE + 1}...`);
    await client.mutate(batch);
  }
  
  console.log('Zakończono poprawianie rootCategory.');
}

fix().catch(console.error);
