import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), 'src', 'data', 'products.ts');
const content = fs.readFileSync(productsPath, 'utf-8');

// Szukamy produktu po SKU
const lines = content.split('\n');
const skuLines = lines.filter(line => line.includes('P-0304237') || line.includes('p0304237'));

console.log(`Znaleziono ${skuLines.length} linii z SKU w products.ts:`);
skuLines.forEach(line => console.log(line.trim()));
