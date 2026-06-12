import fs from 'fs';
import path from 'path';

function checkSitemap(filename) {
  const sitemapPath = path.join(process.cwd(), 'dist', filename);

  if (fs.existsSync(sitemapPath)) {
    const content = fs.readFileSync(sitemapPath, 'utf-8');
    const matches = content.match(/<loc>(.*?)<\/loc>/g);
    
    if (matches) {
      const urls = matches.map(m => m.replace(/<\/?loc>/g, ''));
      console.log(`Znaleziono ${urls.length} adresów URL w ${filename}.`);
      
      // Szukamy podejrzanych URL-i, ale ignorujemy "nullifire" bo to poprawna nazwa marki/produktu
      const suspicious = urls.filter(url => {
        if (url.includes('nullifire')) return false; // To jest poprawny produkt
        
        return url.includes('undefined') || 
               url.includes('null') || 
               url.includes('//') && !url.startsWith('https://') ||
               url.includes('[') ||
               url.includes(']') ||
               url.endsWith('-id-p-') ||
               url.endsWith('-id-p-undefined');
      });
      
      if (suspicious.length > 0) {
        console.log(`Podejrzane adresy URL w ${filename} (${suspicious.length}):`);
        suspicious.slice(0, 10).forEach(url => console.log(url));
        if (suspicious.length > 10) console.log(`...i ${suspicious.length - 10} więcej.`);
      } else {
        console.log(`Nie znaleziono podejrzanych adresów URL w ${filename}.`);
      }
    }
  }
}

checkSitemap('sitemap-products-full.xml');
checkSitemap('sitemap-products-partial.xml');
