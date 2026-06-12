import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J'
});

async function check() {
  const categories = await client.fetch(`*[_type == "category"]{
    name, "slug": slug.current
  }`);
  
  console.log("Dostępne kategorie (przykłady):");
  categories.filter(c => c.slug.includes('rekawic') || c.slug.includes('worki') || c.slug.includes('beton') || c.slug.includes('narzedzia')).forEach(c => console.log(`- ${c.name} (${c.slug})`));
}

check().catch(console.error);
