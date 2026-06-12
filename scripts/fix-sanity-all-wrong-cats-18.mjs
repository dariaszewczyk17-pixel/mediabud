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
    
    if (name.includes('sufit płyta') || name.includes('sufit thermatex') || name.includes('płyta termpir')) {
      newCatSlug = 'plyty-sufitowe';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('sufit profil') || name.includes('drut sufitowy')) {
      newCatSlug = 'profile-do-sufitow-podwieszanych';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('zamek') || name.includes('zatrzask') || name.includes('zakrętka') || name.includes('wizjer') || name.includes('kwadrat do klamki')) {
      newCatSlug = 'drzwi-i-akcesoria-do-drzwi';
      newRootSlug = 'stolarka-otworowa';
    } else if (name.includes('wąż igielit') || name.includes('wąż tech') || name.includes('wąż woda')) {
      newCatSlug = 'weze';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('tablica') || name.includes('znak zakazu')) {
      newCatSlug = 'bhp';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('lina') || name.includes('uchwyt c13')) {
      newCatSlug = 'elementy-mocujace-uniwersalne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('skrzynka narzędziowa')) {
      newCatSlug = 'wiadra-i-pojemniki-budowlane';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('opalarka')) {
      newCatSlug = 'opalarki-i-palniki';
      newRootSlug = 'elektronarzedzia';
    } else if (name.includes('rurka betonowa') || name.includes('korek betonowy') || name.includes('kostka blokujaca')) {
      newCatSlug = 'galanteria-betonowa';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('płytka klin')) {
      newCatSlug = 'plytki-elewacyjne';
      newRootSlug = 'plytki';
    } else if (name.includes('szkło spaw')) {
      newCatSlug = 'odziez-ochronna';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('torba foliowa')) {
      newCatSlug = 'worki-na-gruz-i-smieci';
      newRootSlug = 'narzedzia-i-mocowania';
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
