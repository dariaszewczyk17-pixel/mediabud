import fs from 'fs';
import path from 'path';

const scriptPath = path.join(process.cwd(), 'scripts', 'generate-sitemap.mjs');
const content = fs.readFileSync(scriptPath, 'utf-8');

// Szukamy jak generowane są URL-e produktów
const lines = content.split('\n');
const urlLines = lines.filter((line, i) => {
  if (line.includes('<loc>') && line.includes('produkt')) {
    console.log(`Linia ${i+1}: ${line.trim()}`);
    return true;
  }
  return false;
});
