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
  
  console.log('Pobieranie produktów z kategorii "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych"...');
  const products = await client.fetch(`*[_type == "product" && category->slug.current == "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych"]{
    _id, name
  }`);
  
  console.log(`Znaleziono ${products.length} produktów w tej kategorii.`);
  
  // Heurystyka do przypisywania kategorii
  const mutations = [];
  
  for (const p of products) {
    const name = p.name.toLowerCase();
    let newCatId = null;
    let newRootId = null;
    
    if (name.includes('rękawic') || name.includes('rekawic')) {
      newCatId = 'cat-l3-rekawice-robocze';
      newRootId = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('worek') || name.includes('worki')) {
      newCatId = 'cat-l3-worki-na-gruz-i-smieci';
      newRootId = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('obrzeż') || name.includes('obrzez')) {
      newCatId = 'cat-l3-elementy-betonowe';
      newRootId = 'cat-stropy-i-sciany';
    } else if (name.includes('koronka') || name.includes('wiertł') || name.includes('wiertl')) {
      newCatId = 'cat-l3-wiertla-i-koronki';
      newRootId = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('pas narzędziowy')) {
      newCatId = 'cat-l3-odziez-robocza';
      newRootId = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('kausza') || name.includes('karabińczyk') || name.includes('karabinczyk')) {
      newCatId = 'cat-l3-akcesoria-do-lin-i-lancuchow';
      newRootId = 'cat-narzedzia-i-mocowania';
    } else if (name.includes('moskitiera')) {
      newCatId = 'cat-l3-akcesoria-do-okien-dachowych';
      newRootId = 'cat-dachy';
    } else if (name.includes('mata kompensacyjna')) {
      newCatId = 'cat-l3-akcesoria-do-plytek';
      newRootId = 'cat-plytki';
    }
    
    // Sprawdźmy czy kategorie istnieją
    if (newCatId && newRootId && catMap.has(newCatId) && catMap.has(newRootId)) {
      mutations.push({
        patch: {
          id: p._id,
          set: {
            category: { _type: 'reference', _ref: newCatId },
            rootCategory: { _type: 'reference', _ref: newRootId }
          }
        }
      });
    } else if (newCatId && newRootId) {
      // Spróbujmy bez prefiksu cat-l3-
      const altCatId = newCatId.replace('cat-l3-', 'cat-');
      if (catMap.has(altCatId) && catMap.has(newRootId)) {
        mutations.push({
          patch: {
            id: p._id,
            set: {
              category: { _type: 'reference', _ref: altCatId },
              rootCategory: { _type: 'reference', _ref: newRootId }
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
