import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J'
});

async function fix() {
  console.log('Pobieranie kategorii "styropian"...');
  const styropianCat = await client.fetch(`*[_type == "category" && slug.current == "styropian"][0]{
    _id, name, "slug": slug.current
  }`);
  
  if (!styropianCat) {
    console.log('Nie znaleziono kategorii "styropian". Szukam podobnych...');
    const cats = await client.fetch(`*[_type == "category" && name match "Styropian*"]{
      _id, name, "slug": slug.current
    }`);
    console.log('Podobne kategorie:', cats);
    return;
  }
  
  console.log('Znaleziono kategorię styropian:', styropianCat);
  
  console.log('Pobieranie produktów ze słowem "Styropian" w nazwie, które są w złej kategorii...');
  const products = await client.fetch(`*[_type == "product" && name match "Styropian*" && category->slug.current == "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych"]{
    _id, name
  }`);
  
  console.log(`Znaleziono ${products.length} produktów styropianowych w złej kategorii.`);
  
  if (products.length === 0) return;
  
  // Przygotuj mutacje
  const mutations = products.map(p => {
    return {
      patch: {
        id: p._id,
        set: {
          category: { _type: 'reference', _ref: styropianCat._id },
          rootCategory: { _type: 'reference', _ref: 'cat-izolacje' } // Zakładam, że root to izolacje
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
  
  console.log('Zakończono przenoszenie styropianu do właściwej kategorii.');
}

fix().catch(console.error);
