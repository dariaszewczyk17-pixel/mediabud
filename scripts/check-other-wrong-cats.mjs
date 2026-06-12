import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J'
});

async function check() {
  // Sprawdźmy inne kategorie sufitów podwieszanych
  const categories = await client.fetch(`*[_type == "category" && parent->slug.current == "sufity-podwieszane"]{
    name, "slug": slug.current
  }`);
  
  console.log("Kategorie w 'sufity-podwieszane':");
  for (const cat of categories) {
    const count = await client.fetch(`count(*[_type == "product" && category->slug.current == "${cat.slug}"])`);
    console.log(`- ${cat.name} (${cat.slug}): ${count} produktów`);
    
    if (count > 0 && count < 100) {
      const sample = await client.fetch(`*[_type == "product" && category->slug.current == "${cat.slug}"]{name}[0...5]`);
      console.log(`  Przykłady: ${sample.map(s => s.name).join(', ')}`);
    }
  }
}

check().catch(console.error);
