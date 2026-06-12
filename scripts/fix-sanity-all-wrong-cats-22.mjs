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
    
    if (name.includes('korekta pro') || name.includes('karta podarunkowa') || name.includes('zestaw herbat') || name.includes('kawa mielona') || name.includes('usługa sprzętowa') || name.includes('materiały reklamowe') || name.includes('le koszt') || name.includes('testowy produkt')) {
      newCatSlug = 'pozostale';
      newRootSlug = 'pozostale';
    } else if (name.includes('torba foliowa')) {
      newCatSlug = 'worki-na-gruz-i-smieci';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('podbitka')) {
      newCatSlug = 'drewno-konstrukcyjne';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('piasek kwarcowy')) {
      newCatSlug = 'kruszywa-i-piaski';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('mata strukturalna') || name.includes('membrana')) {
      newCatSlug = 'membrany-dachowe';
      newRootSlug = 'dachy';
    } else if (name.includes('zaślepka wyczsztki')) {
      newCatSlug = 'akcesoria-do-kominow';
      newRootSlug = 'systemy-kominowe';
    } else if (name.includes('umywalka') || name.includes('wanna') || name.includes('bateria')) {
      newCatSlug = 'akcesoria-instalacyjne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('deska baumit')) {
      newCatSlug = 'narzedzia-budowlane';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('stal płaska')) {
      newCatSlug = 'materialy-konstrukcyjne';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('l-ka polbruk')) {
      newCatSlug = 'galanteria-betonowa';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('maski ochronne')) {
      newCatSlug = 'odziez-ochronna';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('płyta z wełny drzewnej')) {
      newCatSlug = 'plyty-sufitowe-drewniane';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('słupek balustrady')) {
      newCatSlug = 'elementy-ogrodzenia';
      newRootSlug = 'stropy-i-sciany';
    }
    
    if (newCatSlug && newRootSlug) {
      const cat = categories.find(c => c.slug === newCatSlug || c.slug.endsWith('-' + newCatSlug));
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
