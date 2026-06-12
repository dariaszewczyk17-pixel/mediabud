import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J'
});

async function check() {
  const cat = await client.fetch(`*[_type == "category" && slug.current == "sufity-podwieszane"][0]{
    name, "slug": slug.current, "children": *[_type == "category" && parent._ref == ^._id]{name, "slug": slug.current}
  }`);
  
  console.log(JSON.stringify(cat, null, 2));
}

check().catch(console.error);
