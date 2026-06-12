import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), 'src', 'data', 'products.ts');
const content = fs.readFileSync(productsPath, 'utf-8');

// Szukamy produktu nullifire
const lines = content.split('\n');
const nullifireLines = lines.filter(line => line.toLowerCase().includes('nullifire'));

console.log(`Znaleziono ${nullifireLines.length} linii z 'nullifire' w products.ts:`);
nullifireLines.forEach(line => console.log(line.trim()));
