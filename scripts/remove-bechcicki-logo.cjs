/**
 * Skrypt do usunięcia logo BECHCICKI z produktów w Sanity
 * Logo zostało błędnie zaimportowane jako zdjęcie produktu
 */

const https = require('https');

const PROJECT_ID = 'nzcwegq7';
const DATASET = 'production';
const BECHCICKI_IMAGE_REF = 'image-b488bf43433a77a051d95d3c8bf2b703ecbb0236-933x933-webp';

// Token z env
const TOKEN = process.env.SANITY_TOKEN;

if (!TOKEN) {
  console.error('❌ Brak SANITY_TOKEN w zmiennych środowiskowych');
  process.exit(1);
}

async function sanityQuery(query) {
  return new Promise((resolve, reject) => {
    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.result);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function sanityMutate(mutations) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ mutations });
    const options = {
      hostname: `${PROJECT_ID}.api.sanity.io`,
      path: `/v2021-06-07/data/mutate/${DATASET}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🔍 Szukam produktów z logo BECHCICKI...');
  
  // Pobierz wszystkie produkty z logo bechcicki
  const products = await sanityQuery(`*[_type=="product" && references("${BECHCICKI_IMAGE_REF}")]{_id,name,"imageCount":count(images)}`);
  
  console.log(`📦 Znaleziono ${products.length} produktów z logo BECHCICKI`);
  
  if (products.length === 0) {
    console.log('✅ Brak produktów do naprawy');
    return;
  }
  
  // Przygotuj mutacje - usuń obrazy z referencją do logo bechcicki
  const mutations = products.map(p => ({
    patch: {
      id: p._id,
      unset: [`images[_ref=="${BECHCICKI_IMAGE_REF}"]`]
    }
  }));
  
  console.log(`🔧 Usuwam logo BECHCICKI z ${mutations.length} produktów...`);
  
  // Wykonaj mutacje w batchach po 100
  const batchSize = 100;
  for (let i = 0; i < mutations.length; i += batchSize) {
    const batch = mutations.slice(i, i + batchSize);
    const result = await sanityMutate(batch);
    console.log(`  ✓ Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(mutations.length/batchSize)}: ${result.results?.length || 0} produktów zaktualizowanych`);
  }
  
  console.log('✅ Gotowe! Logo BECHCICKI usunięte z produktów.');
}

main().catch(console.error);
