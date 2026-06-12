import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J'
});

async function fix() {
  console.log('Pobieranie produktów z błędnym rootCategory...');
  
  // Pobierzmy produkty, które mają rootCategory "sufity-podwieszane", ale ich nazwa wskazuje na coś innego
  const products = await client.fetch(`*[_type == "product" && rootCategory->slug.current == "sufity-podwieszane" && (name match "Styropian*" || name match "Środek*")]{
    _id, name, "slug": slug.current, "cat": category->slug.current, "rootCat": rootCategory->slug.current
  }`);
  
  console.log(`Znaleziono ${products.length} błędnych produktów.`);
  
  if (products.length > 0) {
    console.log('Przykładowe:', products.slice(0, 3));
  }
}

fix().catch(console.error);
