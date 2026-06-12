const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    }, (res) => {
      // Obsługa przekierowań
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHtml(res.headers.location).then(resolve).catch(reject);
      }
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function analyze() {
  console.log('Rozpoczynam analizę konkurencji (szukanie w HTML)...');
  
  const urls = [
    { name: 'Castorama (Kategoria)', url: 'https://www.castorama.pl/budowa-i-remont/materialy-budowlane/izolacja-i-ocieplenie.html' },
    { name: 'Leroy Merlin (Kategoria)', url: 'https://www.leroymerlin.pl/materialy-budowlane/izolacja-budynkow,a180.html' }
  ];
  
  for (const site of urls) {
    console.log(`\nAnaliza: ${site.name}`);
    try {
      const html = await fetchHtml(site.url);
      
      // Szukamy jakichkolwiek wzmianek o FAQ w HTML
      const hasFaqClass = html.includes('faq') || html.includes('FAQ');
      const hasQuestions = html.includes('Najczęściej zadawane pytania') || html.includes('Często zadawane pytania');
      
      console.log(`- Słowo "faq/FAQ" w HTML: ${hasFaqClass ? 'TAK' : 'NIE'}`);
      console.log(`- Fraza "Najczęściej zadawane pytania": ${hasQuestions ? 'TAK' : 'NIE'}`);
      
      // Szukamy schema.org w dowolnej formie
      const schemaMatches = html.match(/schema\.org/g);
      console.log(`- Wystąpienia "schema.org": ${schemaMatches ? schemaMatches.length : 0}`);
      
    } catch (error) {
      console.error(`Błąd podczas analizy ${site.name}:`, error.message);
    }
  }
}

analyze();
