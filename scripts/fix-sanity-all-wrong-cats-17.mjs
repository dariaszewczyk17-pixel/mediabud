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
    
    if (name.includes('płyta betard') || name.includes('płyta brukowa')) {
      newCatSlug = 'galanteria-betonowa';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('klej semin') || name.includes('pasta epoksydowa')) {
      newCatSlug = 'kleje-montazowe';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('sprężynka dociskowa')) {
      newCatSlug = 'mocowania-do-sufitow-podwieszanych';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('pas transportowy') || name.includes('drut montażowy') || name.includes('drut wiązałkowy') || name.includes('koło fi') || name.includes('kółko do kluczy') || name.includes('identyfikator') || name.includes('cyfra') || name.includes('alfabet')) {
      newCatSlug = 'elementy-mocujace-uniwersalne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('gogle') || name.includes('hełm') || name.includes('kask') || name.includes('półbuty')) {
      newCatSlug = 'odziez-ochronna';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('wąż do palników')) {
      newCatSlug = 'akcesoria-do-elektronarzedzi';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('dren-') || name.includes('rura dren')) {
      newCatSlug = 'elementy-kanalizacyjne';
      newRootSlug = 'dachy';
    } else if (name.includes('klamka') || name.includes('blokada do wc')) {
      newCatSlug = 'drzwi-i-akcesoria-do-drzwi';
      newRootSlug = 'stolarka-otworowa';
    } else if (name.includes('czyściwo')) {
      newCatSlug = 'srodki-czyszczaco-pielegnacyjne';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('kit mapei')) {
      newCatSlug = 'narzedzia-i-akcesoria-glazurnicze';
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
