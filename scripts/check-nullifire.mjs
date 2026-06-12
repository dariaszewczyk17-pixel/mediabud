import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J'
});

async function check() {
  const product = await client.fetch(`*[_type == "product" && slug.current == "nullifire-sc803-25-kg"]{
    name, "slug": slug.current, _id, sku
  }`);
  
  console.log("Status produktu 'nullifire-sc803-25-kg':");
  console.log(JSON.stringify(product, null, 2));
}

check().catch(console.error);
