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
    
    if (name.includes('sem.') || name.includes('la linia') || name.includes('bruk klasyczny') || name.includes('nardo') || name.includes('pastella') || name.includes('riva') || name.includes('nobla') || name.includes('pavimo') || name.includes('torenti')) {
      newCatSlug = 'galanteria-betonowa';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('skrzydło') || name.includes('skrz.') || name.includes('drzwi') || name.includes('gałka') || name.includes('łańcuch do drzwi')) {
      newCatSlug = 'drzwi-i-akcesoria-do-drzwi';
      newRootSlug = 'stolarka-otworowa';
    } else if (name.includes('profil suf.') || name.includes('profil kątownik') || name.includes('profil poprzecz.')) {
      newCatSlug = 'profile-do-sufitow-podwieszanych';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('piana pistoletowa')) {
      newCatSlug = 'piany-montazowe-pistoletowe';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('farba silikonowa')) {
      newCatSlug = 'farby-elewacyjne-silikonowe';
      newRootSlug = 'farby-i-rozpuszczalniki';
    } else if (name.includes('tabletki do pochłaniacz') || name.includes('tabletka do pochłan')) {
      newCatSlug = 'srodki-czyszczaco-pielegnacyjne';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('żel do mycia rąk')) {
      newCatSlug = 'bhp';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('rewizja rury')) {
      newCatSlug = 'systemy-rynnowe-pvc';
      newRootSlug = 'dachy';
    } else if (name.includes('dzwonek')) {
      newCatSlug = 'akcesoria-instalacyjne';
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
