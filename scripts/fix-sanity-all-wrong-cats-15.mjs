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
    
    if (name.includes('płyta nastudzienna') || name.includes('płyta ażurowa') || name.includes('płytka peronowa') || name.includes('daszek') || name.includes('płyta prostokątna') || name.includes('płyta skarpowa') || name.includes('zadaszenie') || name.includes('opornik') || name.includes('płyty ogrodowe') || name.includes('płyty brukowe')) {
      newCatSlug = 'galanteria-betonowa';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('mieszadło')) {
      newCatSlug = 'mieszadla';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('kieszeń') || name.includes('torba na narzędzia') || name.includes('torba ogrodowa')) {
      newCatSlug = 'paski-i-kabury-narzedziowe';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('szufelka') || name.includes('przyssawka') || name.includes('blok ścierny') || name.includes('zbieracz pyłu')) {
      newCatSlug = 'narzedzia-reczne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('pasta bhp')) {
      newCatSlug = 'srodki-czyszczaco-pielegnacyjne';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('klej bripox')) {
      newCatSlug = 'kleje-montazowe';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('profil f') || name.includes('zacisk zabezpieczający') || name.includes('zatyczka') || name.includes('wymian') || name.includes('noniusz') || name.includes('profil zaciskowy')) {
      newCatSlug = 'mocowania-do-sufitow-podwieszanych';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('hak koelner')) {
      newCatSlug = 'elementy-mocujace-uniwersalne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('aceton') || name.includes('preparat do usuwania')) {
      newCatSlug = 'rozpuszczalniki';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('farba fluoroscencyjna')) {
      newCatSlug = 'farby-specjalistyczne';
      newRootSlug = 'farby-i-rozpuszczalniki';
    } else if (name.includes('okulary')) {
      newCatSlug = 'odziez-ochronna';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('okno dachowe')) {
      newCatSlug = 'okna-dachowe';
      newRootSlug = 'dachy';
    } else if (name.includes('membrana izolacyjna')) {
      newCatSlug = 'membrany-dachowe';
      newRootSlug = 'dachy';
    } else if (name.includes('drut z oczkiem') || name.includes('kliny montażowe')) {
      newCatSlug = 'mocowania-do-suchej-zabudowy';
      newRootSlug = 'sucha-zabudowa';
    } else if (name.includes('środek grzybobójczy')) {
      newCatSlug = 'srodki-grzybobojcze';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('płyta humancare') || name.includes('płyta gipsowo-włóknowa')) {
      newCatSlug = 'plyty-sufitowe';
      newRootSlug = 'sufity-podwieszane';
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
