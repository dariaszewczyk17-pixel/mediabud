import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/components/Commerce.tsx',
  'src/pages/ProductDetail.tsx',
  'src/components/Header.tsx',
  'src/pages/Pages.tsx'
];

let updatedCount = 0;

for (const file of filesToUpdate) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Szukamy starego placeholdera i zamieniamy na nowy
    if (content.includes('/placeholder.svg')) {
      content = content.replace(/\/placeholder\.svg/g, '/images/placeholder-product_2.png');
      
      fs.writeFileSync(filePath, content);
      console.log(`Zaktualizowano ${file}`);
      updatedCount++;
    }
  }
}

console.log(`Zaktualizowano ${updatedCount} plików.`);
