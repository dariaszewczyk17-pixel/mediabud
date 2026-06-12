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
    
    if (name.includes('pianola') || name.includes('płyta brukowa') || name.includes('nakrywa') || name.includes('podstawa studni') || name.includes('ogranicznik') || name.includes('kształtka')) {
      newCatSlug = 'galanteria-betonowa';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('szampon') || name.includes('aktywna piana') || name.includes('ocet gospodarczy')) {
      newCatSlug = 'srodki-czyszczaco-pielegnacyjne';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('ubranie') || name.includes('kombinezon')) {
      newCatSlug = 'odziez-ochronna';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('profil specjalny') || name.includes('kątownik przyścienny') || name.includes('profil u') || name.includes('akcesoria przyścienne') || name.includes('zestaw rockfon') || name.includes('poprzeczka') || name.includes('profil omega') || name.includes('kątownik giętki') || name.includes('aluminiowy profil')) {
      newCatSlug = 'profile-do-sufitow-podwieszanych';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('klej metylan') || name.includes('klej gipsowy')) {
      newCatSlug = 'kleje-gipsowe';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('zestaw glazurniczy') || name.includes('multiszpachelka')) {
      newCatSlug = 'narzedzia-i-akcesoria-glazurnicze';
      newRootSlug = 'plytki';
    } else if (name.includes('szczotka') || name.includes('miotła') || name.includes('zmiotka')) {
      newCatSlug = 'narzedzia-reczne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('gładź szpachlowa')) {
      newCatSlug = 'gladzie-gipsowe-w-proszku';
      newRootSlug = 'sucha-zabudowa';
    } else if (name.includes('drabina')) {
      newCatSlug = 'drabiny';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('torba narzędziowa')) {
      newCatSlug = 'paski-i-kabury-narzedziowe';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('impregnat')) {
      newCatSlug = 'impregnaty';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('wąż ogrodowy')) {
      newCatSlug = 'nawadnianie';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('płyta mineralna')) {
      newCatSlug = 'plyty-sufitowe-z-welny-mineralnej';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('aplikator')) {
      newCatSlug = 'akcesoria-malarskie-i-tynkarskie';
      newRootSlug = 'narzedzia-malarskie';
    } else if (name.includes('odkurzacz')) {
      newCatSlug = 'odkurzacze-worki-rury';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('siatka spoinowa')) {
      newCatSlug = 'tasmy-do-suchej-zabudowy';
      newRootSlug = 'sucha-zabudowa';
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
