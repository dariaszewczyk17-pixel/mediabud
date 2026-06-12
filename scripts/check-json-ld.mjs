import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexHtmlPath = path.join(__dirname, '../index.html');
const localBusinessPath = path.join(__dirname, '../src/lib/localBusiness.ts');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
const localBusiness = fs.readFileSync(localBusinessPath, 'utf-8');

// Sprawdzamy czy NIP/VAT ID jest spójny
const indexVat = indexHtml.match(/"vatID":\s*"([^"]+)"/g);
const localVat = localBusiness.match(/"vatID":\s*"([^"]+)"/g);

console.log('--- Weryfikacja NIP/VAT ID ---');
console.log('index.html:', indexVat);
console.log('localBusiness.ts:', localVat);

// Sprawdzamy czy sameAs nie zawiera własnej domeny
const indexSameAs = indexHtml.match(/"sameAs":\s*\[(.*?)\]/s);
const localSameAs = localBusiness.match(/"sameAs":\s*NAP_SAME_AS/);
const napSameAs = localBusiness.match(/export const NAP_SAME_AS = \[\s*(.*?)\s*\];/s);

console.log('\n--- Weryfikacja sameAs ---');
if (indexSameAs) console.log('index.html sameAs:', indexSameAs[1].trim());
if (napSameAs) console.log('localBusiness.ts NAP_SAME_AS:', napSameAs[1].trim());

// Sprawdzamy czy offerCount jest liczbą (integer)
const indexOfferCount = indexHtml.match(/"numberOfItems":\s*([0-9]+|"[0-9]+")/);
const localOfferCount = localBusiness.match(/"numberOfItems":\s*([0-9]+|"[0-9]+")/);

console.log('\n--- Weryfikacja numberOfItems/offerCount ---');
if (indexOfferCount) console.log('index.html numberOfItems:', indexOfferCount[1]);
if (localOfferCount) console.log('localBusiness.ts numberOfItems:', localOfferCount[1]);

