import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J'
});

async function fix() {
  // Sprawdźmy czy produkt ma jakieś braki w danych
  const product = await client.fetch(`*[_type == "product" && slug.current == "nullifire-sc803-25-kg"][0]`);
  
  console.log("Pełne dane produktu:");
  console.log(JSON.stringify(product, null, 2));
  
  // Jeśli produkt jest niekompletny lub uszkodzony, możemy go usunąć lub naprawić
  // W tym przypadku wygląda na to, że produkt jest w Sanity, ale nie ma go w products.ts
  // Sitemap generator może mieć problem z tym produktem, jeśli brakuje mu jakichś wymaganych pól
  
  if (product) {
    console.log("Produkt istnieje. Sprawdzam czy ma wymagane pola...");
    const missingFields = [];
    if (!product.name) missingFields.push('name');
    if (!product.slug || !product.slug.current) missingFields.push('slug');
    if (!product.category) missingFields.push('category');
    
    console.log(`Brakujące pola: ${missingFields.length > 0 ? missingFields.join(', ') : 'brak'}`);
  }
}

fix().catch(console.error);
