import fs from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap.xml');

if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  console.log(`Sitemap.xml istnieje. Rozmiar: ${content.length} bajtów.`);
  
  // Sprawdźmy czy zawiera odniesienia do innych sitemap
  const matches = content.match(/<loc>(.*?)<\/loc>/g);
  if (matches) {
    console.log(`Znaleziono ${matches.length} adresów URL w głównym sitemap.xml:`);
    matches.forEach(m => console.log(m.replace(/<\/?loc>/g, '')));
  }
} else {
  console.log('Plik sitemap.xml nie istnieje w katalogu dist.');
}
