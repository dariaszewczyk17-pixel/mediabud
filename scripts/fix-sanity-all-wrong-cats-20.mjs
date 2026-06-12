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
    
    if (name.includes('sufit kostka') || name.includes('płyta tonga') || name.includes('kaseton') || name.includes('sufit pruszyński')) {
      newCatSlug = 'plyty-sufitowe';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('profil poprze') || name.includes('drut oczko')) {
      newCatSlug = 'profile-do-sufitow-podwieszanych';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('klamko-pochwyt') || name.includes('rozeta')) {
      newCatSlug = 'drzwi-i-akcesoria-do-drzwi';
      newRootSlug = 'stolarka-otworowa';
    } else if (name.includes('ulicówka')) {
      newCatSlug = 'narzedzia-reczne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('pochłaniacz') || name.includes('filtr') || name.includes('część twarzowa')) {
      newCatSlug = 'odziez-ochronna';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('puszka z wieczkiem')) {
      newCatSlug = 'wiadra-i-pojemniki-budowlane';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('gładź gipsowa')) {
      newCatSlug = 'gladzie-masy-gotowe';
      newRootSlug = 'sucha-zabudowa';
    } else if (name.includes('farba poliestrowa')) {
      newCatSlug = 'farby-proszkowe-poliestrowe';
      newRootSlug = 'farby-i-rozpuszczalniki';
    } else if (name.includes('piasek kwarcowy')) {
      newCatSlug = 'kruszywa-i-piaski';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('płytka gres')) {
      newCatSlug = 'plytki-scienno-podlogowe';
      newRootSlug = 'plytki';
    } else if (name.includes('klej żelowy')) {
      newCatSlug = 'kleje-do-glazury';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('schodki')) {
      newCatSlug = 'drabiny';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('robot odkurzający')) {
      newCatSlug = 'odkurzacze-worki-rury';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('znacznik parkingowy')) {
      newCatSlug = 'galanteria-betonowa';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('podbitka')) {
      newCatSlug = 'drewno-konstrukcyjne';
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
