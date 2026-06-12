const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/data/products.ts'), 'utf-8');

// Prosty regex do wyciągnięcia id, slug, name dla isFeatured: true
const regex = /id:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)"[\s\S]*?isFeatured:\s*true/g;
let match;
const featured = [];

while ((match = regex.exec(content)) !== null) {
  featured.push({ id: match[1], slug: match[2], name: match[3] });
}

console.log(JSON.stringify(featured, null, 2));
