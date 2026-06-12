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
      newCatSlug = 'odziez-ochronna';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('worek') || name.includes('worki') || name.includes('kermazyt') || name.includes('półmaska') || name.includes('maska')) {
      newCatSlug = 'odkurzacze-worki-rury';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('obrzeż') || name.includes('obrzez') || name.includes('krawężnik') || name.includes('kraweznik')) {
      newCatSlug = 'palisady-krawezniki-i-obrzeza';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('koronka') || name.includes('wiertł') || name.includes('wiertl')) {
      newCatSlug = 'akcesoria-do-elektronarzedzi';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('pas narzędziowy')) {
      newCatSlug = 'paski-i-kabury-narzedziowe';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('kausza') || name.includes('karabińczyk') || name.includes('karabinczyk')) {
      newCatSlug = 'elementy-mocujace-uniwersalne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('moskitiera')) {
      newCatSlug = 'okna-dachowe-i-akcesoria';
      newRootSlug = 'dachy';
    } else if (name.includes('mata kompensacyjna')) {
      newCatSlug = 'narzedzia-i-akcesoria-glazurnicze';
      newRootSlug = 'plytki';
    } else if (name.includes('uszczelka')) {
      newCatSlug = 'okna-i-akcesoria-do-okien';
      newRootSlug = 'stolarka-otworowa';
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
      } else {
        console.log(`Nie znaleziono kategorii dla: ${name} (oczekiwane: ${newCatSlug}, ${newRootSlug})`);
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
