import fs from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap-products-full.xml');

if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const lines = content.split('\n');
  
  const nullifireLines = lines.filter((line, i) => {
    if (line.includes('nullifire')) {
      console.log(`Linia ${i+1}: ${line.trim()}`);
      return true;
    }
    return false;
  });
}
