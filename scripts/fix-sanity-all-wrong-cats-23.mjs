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
    
    if (name.includes('olej antypoślizgowy') || name.includes('farba ceramiczna') || name.includes('farba silikatowa')) {
      newCatSlug = 'farby-wewnetrzne';
      newRootSlug = 'farby-i-rozpuszczalniki';
    } else if (name.includes('plecak narzędziowy') || name.includes('kosz ekspozycyjny')) {
      newCatSlug = 'wiadra-i-pojemniki-budowlane';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('kij do szczotki') || name.includes('kij do grabi')) {
      newCatSlug = 'narzedzia-reczne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('kłodka') || name.includes('klucz') || name.includes('korba') || name.includes('pistolet do konserwacji') || name.includes('szpachla') || name.includes('paca nierdzewna')) {
      newCatSlug = 'narzedzia-reczne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('rura spustowa') || name.includes('okapowy element')) {
      newCatSlug = 'systemy-rynnowe-pvc';
      newRootSlug = 'dachy';
    } else if (name.includes('ośka do koła')) {
      newCatSlug = 'elementy-mocujace-uniwersalne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('reflektor led')) {
      newCatSlug = 'oswietlenie-budowlane';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('siatka podp') || name.includes('siatka z włókna')) {
      newCatSlug = 'siatki-elewacyjne';
      newRootSlug = 'izolacje-fasadowe';
    } else if (name.includes('taśma malarska')) {
      newCatSlug = 'tasmy-malarskie';
      newRootSlug = 'narzedzia-malarskie';
    } else if (name.includes('silikon sanitarny')) {
      newCatSlug = 'silikony-sanitarne';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('płytka tarasowa')) {
      newCatSlug = 'plytki-tarasowe';
      newRootSlug = 'plytki';
    } else if (name.includes('profil sufitowy')) {
      newCatSlug = 'profile-do-sufitow-podwieszanych';
      newRootSlug = 'sufity-podwieszane';
    } else if (name.includes('belka nadprożowa')) {
      newCatSlug = 'belki-stropowe-betonowe';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('markiza zewnętrzna')) {
      newCatSlug = 'okna-dachowe-i-akcesoria';
      newRootSlug = 'dachy';
    } else if (name.includes('turmalin') || name.includes('klassik') || name.includes('gąsior')) {
      newCatSlug = 'dachowki-ceramiczne';
      newRootSlug = 'dachy';
    } else if (name.includes('pasta boll') || name.includes('pasta anti hologramm') || name.includes('pojemnik z podziałką')) {
      newCatSlug = 'akcesoria-malarskie-i-tynkarskie';
      newRootSlug = 'narzedzia-malarskie';
    } else if (name.includes('papier ścier') || name.includes('tarcza do cięc')) {
      newCatSlug = 'artykuly-scierne';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('usługa przepakowywania')) {
      newCatSlug = 'pozostale';
      newRootSlug = 'pozostale';
    } else if (name.includes('pierścień wyk')) {
      newCatSlug = 'akcesoria-do-kominow';
      newRootSlug = 'systemy-kominowe';
    } else if (name.includes('kontrs.styr') || name.includes('isofas')) {
      newCatSlug = 'styropiany-fasadowe-eps';
      newRootSlug = 'izolacje-fasadowe';
    } else if (name.includes('impr.ct721')) {
      newCatSlug = 'impregnaty';
      newRootSlug = 'chemia-budowlana';
    } else if (name.includes('dysperbit')) {
      newCatSlug = 'hydroizolacje-bitumiczne';
      newRootSlug = 'hydroizolacje';
    } else if (name.includes('zaprawka do poprawek')) {
      newCatSlug = 'farby-zaprawkowe';
      newRootSlug = 'farby-i-rozpuszczalniki';
    } else if (name.includes('torba foliowa')) {
      newCatSlug = 'worki-na-gruz-i-smieci';
      newRootSlug = 'narzedzia-i-mocowania';
    } else if (name.includes('podbitka')) {
      newCatSlug = 'drewno-konstrukcyjne';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('piasek kwarcowy')) {
      newCatSlug = 'kruszywa-i-piaski';
      newRootSlug = 'stropy-i-sciany';
    } else if (name.includes('rurka odskraplacza')) {
      newCatSlug = 'akcesoria-instalacyjne';
      newRootSlug = 'narzedzia-i-mocowania';
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
