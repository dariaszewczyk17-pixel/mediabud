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
    _id, name, "slug": slug.current
  }`);
  
  console.log('Pobieranie produktów z kategorii "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych"...');
  const products = await client.fetch(`*[_type == "product" && category->slug.current == "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych"]{
    _id, name
  }`);
  
  console.log(`Znaleziono ${products.length} produktów w tej kategorii.`);
  
  // Heurystyka do przypisywania kategorii
  const mutations = [];
  
  for (const p of products) {
    const name = p.name.toLowerCase();
    let newCatSlug = null;
    let newRootSlug = null;
    
    if (name.includes('rękawic') || name.includes('rekawic')) {
      newCatSlug = 'rekawice-robocze';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('worek') || name.includes('worki')) {
      newCatSlug = 'worki-na-gruz-i-smieci';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('obrzeż') || name.includes('obrzez')) {
      newCatSlug = 'elementy-betonowe';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('koronka') || name.includes('wiertł') || name.includes('wiertl')) {
      newCatSlug = 'wiertla-i-koronki';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('pas narzędziowy')) {
      newCatSlug = 'odziez-robocza';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('kausza') || name.includes('karabińczyk') || name.includes('karabinczyk')) {
      newCatSlug = 'akcesoria-do-lin-i-lancuchow';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('moskitiera')) {
      newCatSlug = 'akcesoria-do-okien-dachowych';
      newRootSlug = 'dachy';
    } else if (name.includes('mata kompensacyjna')) {
      newCatSlug = 'akcesoria-do-plytek';
      newRootSlug = 'plytki';
    }
    
    if (newCatSlug && newRootSlug) {
      const cat = categories.find(c => c.slug === newCatSlug);
      const root = categories.find(c => c.slug === newRootSlug);
      
      if (cat && root) {
        mutations.push({
          patch: {
            id: p._id,
            set: {
              category: { _type: 'reference', _ref: cat._id },
              rootCategory: { _type: 'reference', _ref: root._id }
            }
          }
        });
      }
    }
  }
  
  console.log(`Przygotowano ${mutations.length} mutacji.`);
  
  if (mutations.length === 0) return;
  
  // Wykonaj mutacje w paczkach
  const BATCH_SIZE = 100;
  for (let i = 0; i < mutations.length; i += BATCH_SIZE) {
    const batch = mutations.slice(i, i + BATCH_SIZE);
    console.log(`Wysyłanie paczki ${i / BATCH_SIZE + 1}...`);
    await client.mutate(batch);
  }
  
  console.log('Zakończono przenoszenie produktów do właściwych kategorii.');
}

fix().catch(console.error);
