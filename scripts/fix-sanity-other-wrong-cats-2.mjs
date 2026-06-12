import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J'
});

async function fix() {
  console.log('Pobieranie pozostałych produktów z kategorii "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych"...');
  const products = await client.fetch(`*[_type == "product" && category->slug.current == "elementy-wykonczeniowe-do-mocowania-sufitow-podwieszanych"]{
    _id, name
  }`);
  
  console.log(`Znaleziono ${products.length} produktów w tej kategorii.`);
  
  // Sprawdźmy, czy są jeszcze jakieś produkty, które nie pasują do sufitów
  const suspicious = products.filter(p => 
    !p.name.toLowerCase().includes('sufit') && 
    !p.name.toLowerCase().includes('rockfon') && 
    !p.name.toLowerCase().includes('ecophon') && 
    !p.name.toLowerCase().includes('profil') && 
    !p.name.toLowerCase().includes('wieszak') && 
    !p.name.toLowerCase().includes('łącznik') && 
    !p.name.toLowerCase().includes('lacznik') && 
    !p.name.toLowerCase().includes('właz') && 
    !p.name.toLowerCase().includes('wlaz') && 
    !p.name.toLowerCase().includes('klips') && 
    !p.name.toLowerCase().includes('kcs') && 
    !p.name.toLowerCase().includes('owa') && 
    !p.name.toLowerCase().includes('amf') && 
    !p.name.toLowerCase().includes('armstrong')
  );
  
  console.log(`Znaleziono ${suspicious.length} potencjalnie podejrzanych produktów.`);
  
  if (suspicious.length > 0) {
    console.log('Przykładowe podejrzane produkty:');
    for (let i = 0; i < Math.min(20, suspicious.length); i++) {
      console.log(`- ${suspicious[i].name}`);
    }
  }
}

fix().catch(console.error);
