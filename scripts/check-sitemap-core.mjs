import fs from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap-core.xml');

if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const matches = content.match(/<loc>(.*?)<\/loc>/g);
  
  if (matches) {
    const urls = matches.map(m => m.replace(/<\/?loc>/g, ''));
    console.log(`Znaleziono ${urls.length} adresów URL w sitemap-core.xml.`);
    
    // Szukamy podejrzanych URL-i (np. z undefined, null, podwójnymi ukośnikami)
    const suspicious = urls.filter(url => 
      url.includes('undefined') || 
      url.includes('null') || 
      url.includes('//') && !url.startsWith('https://') ||
      url.includes('[') ||
      url.includes(']')
    );
    
    if (suspicious.length > 0) {
      console.log('Podejrzane adresy URL:');
      suspicious.forEach(url => console.log(url));
    } else {
      console.log('Nie znaleziono podejrzanych adresów URL w sitemap-core.xml.');
    }
  }
}
