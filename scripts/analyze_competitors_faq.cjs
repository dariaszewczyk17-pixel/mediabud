const fs = require('fs');
const https = require('https');

// Funkcja do pobierania HTML strony
function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Funkcja do wyciągania JSON-LD ze strony
function extractJsonLd(html) {
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const results = [];
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    try {
      const json = JSON.parse(match[1]);
      results.push(json);
    } catch (e) {
      // Ignoruj błędy parsowania
    }
  }
  
  return results;
}

async function analyze() {
  console.log('Rozpoczynam analizę konkurencji...');
  
  const urls = [
    { name: 'Castorama (Kategoria)', url: 'https://www.castorama.pl/budowa-i-remont/materialy-budowlane/izolacja-i-ocieplenie.html' },
    { name: 'Leroy Merlin (Kategoria)', url: 'https://www.leroymerlin.pl/materialy-budowlane/izolacja-budynkow,a180.html' }
  ];
  
  for (const site of urls) {
    console.log(`\nAnaliza: ${site.name} (${site.url})`);
    try {
      const html = await fetchHtml(site.url);
      const jsonLdArray = extractJsonLd(html);
      
      let foundFaq = false;
      
      for (const json of jsonLdArray) {
        // Sprawdzamy czy to FAQPage lub czy zawiera FAQPage w @graph
        const isFaq = json['@type'] === 'FAQPage' || 
                     (json['@graph'] && json['@graph'].some(item => item['@type'] === 'FAQPage'));
                     
        if (isFaq) {
          foundFaq = true;
          console.log('✅ Znaleziono FAQPage Schema!');
          
          let faqData = json['@type'] === 'FAQPage' ? json : json['@graph'].find(item => item['@type'] === 'FAQPage');
          
          if (faqData.mainEntity) {
            console.log(`Liczba pytań: ${faqData.mainEntity.length}`);
            console.log('Przykładowe pytania:');
            faqData.mainEntity.slice(0, 3).forEach((q, i) => {
              console.log(`  ${i+1}. ${q.name}`);
            });
          }
        }
      }
      
      if (!foundFaq) {
        console.log('❌ Nie znaleziono FAQPage Schema.');
      }
      
    } catch (error) {
      console.error(`Błąd podczas analizy ${site.name}:`, error.message);
    }
  }
}

analyze();
