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
      newCatSlug = 'cat-l3-rekawice-robocze';
      newRootSlug = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('worek') || name.includes('worki')) {
      newCatSlug = 'cat-l3-worki-na-gruz-i-smieci';
      newRootSlug = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('obrzeż') || name.includes('obrzez') || name.includes('krawężnik') || name.includes('kraweznik')) {
      newCatSlug = 'cat-l3-elementy-betonowe';
      newRootSlug = 'cat-stropy-i-sciany';
    } else if (name.includes('koronka') || name.includes('wiertł') || name.includes('wiertl')) {
      newCatSlug = 'cat-l3-wiertla-i-koronki';
      newRootSlug = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('pas narzędziowy')) {
      newCatSlug = 'cat-l3-odziez-robocza';
      newRootSlug = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('kausza') || name.includes('karabińczyk') || name.includes('karabinczyk')) {
      newCatSlug = 'cat-l3-akcesoria-do-lin-i-lancuchow';
      newRootSlug = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('moskitiera')) {
      newCatSlug = 'cat-l3-akcesoria-do-okien-dachowych';
      newRootSlug = 'cat-dachy';
    } else if (name.includes('mata kompensacyjna')) {
      newCatSlug = 'cat-l3-akcesoria-do-plytek';
      newRootSlug = 'cat-plytki';
    } else if (name.includes('uszczelka')) {
      newCatSlug = 'cat-l3-uszczelki-do-okien-i-drzwi';
      newRootSlug = 'cat-stolarka-okienna-i-drzwiowa';
    } else if (name.includes('półmaska') || name.includes('maska')) {
      newCatSlug = 'cat-l3-odziez-robocza';
      newRootSlug = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('kermazyt')) {
      newCatSlug = 'cat-l3-kruszywa-i-piaski';
      newRootSlug = 'cat-stropy-i-sciany';
    }
    
    if (newCatSlug && newRootSlug) {
      const cat = categories.find(c => c.slug === newCatSlug || c.slug === newCatSlug.replace('cat-l3-', 'cat-'));
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
