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
    
    if (name.includes('kielnia')) {
      newCatSlug = 'kielnie';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('farba lateksowa') || name.includes('farba emulsyjna') || name.includes('farba do ścian')) {
      newCatSlug = 'farby-wewnetrzne';
      newRootSlug = 'farby-i-rozpuszczalniki';
    } else if (name.includes('taśma ogrodzeniowa') || name.includes('taśma ostrzegawcza')) {
      newCatSlug = 'tasmy-i-folie-ostrzegawcze';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('koryto') || name.includes('odpływ')) {
      newCatSlug = 'systemy-rynnowe-pvc';
      newRootSlug = 'dachy';
    } else if (name.includes('donica') || name.includes('zwężka') || name.includes('pustak wentylacyjny')) {
      newCatSlug = 'galanteria-betonowa';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('płaszcz') || name.includes('kamizelka') || name.includes('zatyczki')) {
      newCatSlug = 'odziez-ochronna';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('folia paroizolacyjna')) {
      newCatSlug = 'folie-paroizolacyjne';
      newRootSlug = 'dachy';
    } else if (name.includes('kij drewniany')) {
      newCatSlug = 'akcesoria-malarskie-i-tynkarskie';
      newRootSlug = 'narzedzia-malarskie';
    } else if (name.includes('odmrażacz') || name.includes('środek myjący') || name.includes('odkamieniacz') || name.includes('środek odtłuszczający') || name.includes('środek owadobójczy')) {
      newCatSlug = 'srodki-czyszczaco-pielegnacyjne';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('profil dystansowy') || name.includes('nakładka dystansowa') || name.includes('śruba montażowa') || name.includes('usztywniacz') || name.includes('przyrząd kcs') || name.includes('osłona sjmr') || name.includes('quick-lock')) {
      newCatSlug = 'mocowania-do-sufitow-podwieszanych';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('system pojemników')) {
      newCatSlug = 'wiadra-i-pojemniki-budowlane';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('pasek bagażowy')) {
      newCatSlug = 'elementy-mocujace-uniwersalne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('klej wikolowy') || name.includes('klej montażowy') || name.includes('zaprawa klejąca')) {
      newCatSlug = 'kleje-montazowe';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('hak budowlany')) {
      newCatSlug = 'narzedzia-reczne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('schody strychowe')) {
      newCatSlug = 'schody-strychowe';
      newRootSlug = 'schody-i-akcesoria-strychowe';
    } else if (name.includes('pigment')) {
      newCatSlug = 'pigmenty';
      newRootSlug = 'farby-i-rozpuszczalniki';
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
