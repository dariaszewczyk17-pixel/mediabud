import fs from 'fs';
import { execSync } from 'child_process';

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || 'nzcwegq7';
const DATASET    = process.env.VITE_SANITY_DATASET    || 'production';
const SANITY_BASE = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}`;

async function sanityQuery(query) {
  const url = `${SANITY_BASE}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  return (await res.json()).result ?? [];
}

async function run() {
  const cats = await sanityQuery(`*[_type=="category" && slug.current match "*acznik*"]{name, "slug": slug.current}`);
  console.log("Kategorie z 'acznik':", cats);
}
run();
