#!/usr/bin/env node
/**
 * Migracja technicalSpec: dodaje key, unit, priority na podstawie label
 * 
 * Uruchomienie:
 *   SANITY_TOKEN=xxx node scripts/migrate-tech-specs.mjs
 */

const SANITY_PROJECT = 'nzcwegq7';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = process.env.SANITY_TOKEN;

if (!SANITY_TOKEN) {
  console.error('❌ Brak SANITY_TOKEN w zmiennych środowiskowych');
  process.exit(1);
}

// Mapowanie etykiet → kanoniczny key + unit + priority
const SPEC_MAP = {
  // === IZOLACJE (priorytet 1-10) ===
  'lambda':                    { key: 'lambda',        unit: 'W/(m·K)', priority: 1 },
  'lambda λ':                  { key: 'lambda',        unit: 'W/(m·K)', priority: 1 },
  'współczynnik lambda':       { key: 'lambda',        unit: 'W/(m·K)', priority: 1 },
  'współczynnik przewodzenia': { key: 'lambda',        unit: 'W/(m·K)', priority: 1 },
  'przewodność cieplna':       { key: 'lambda',        unit: 'W/(m·K)', priority: 1 },
  
  'grubość':                   { key: 'grubosc',       unit: 'mm',      priority: 2 },
  'grubość płyty':             { key: 'grubosc',       unit: 'mm',      priority: 2 },
  'grubość izolacji':          { key: 'grubosc',       unit: 'mm',      priority: 2 },
  
  'klasa reakcji na ogień':    { key: 'klasa_ogniowa', unit: null,      priority: 3 },
  'klasa ogniowa':             { key: 'klasa_ogniowa', unit: null,      priority: 3 },
  'reakcja na ogień':          { key: 'klasa_ogniowa', unit: null,      priority: 3 },
  
  'wymiar płyty':              { key: 'wymiar_plyty',  unit: 'mm',      priority: 4 },
  'wymiary':                   { key: 'wymiar_plyty',  unit: 'mm',      priority: 4 },
  'wymiary płyty':             { key: 'wymiar_plyty',  unit: 'mm',      priority: 4 },
  
  'opór cieplny':              { key: 'opor_cieplny',  unit: 'm²K/W',   priority: 5 },
  'r':                         { key: 'opor_cieplny',  unit: 'm²K/W',   priority: 5 },
  
  // === CHEMIA BUDOWLANA (priorytet 10-20) ===
  'zużycie':                   { key: 'zuzycie',       unit: 'kg/m²',   priority: 10 },
  'zużycie kleju':             { key: 'zuzycie',       unit: 'kg/m²',   priority: 10 },
  'zużycie zaprawy':           { key: 'zuzycie',       unit: 'kg/m²',   priority: 10 },
  
  'czas schnięcia':            { key: 'czas_schniec',  unit: 'h',       priority: 11 },
  'czas wysychania':           { key: 'czas_schniec',  unit: 'h',       priority: 11 },
  
  'czas otwarty':              { key: 'czas_otwarty',  unit: 'min',     priority: 12 },
  
  'temperatura stosowania':    { key: 'temp_stosow',   unit: '°C',      priority: 13 },
  'temperatura aplikacji':     { key: 'temp_stosow',   unit: '°C',      priority: 13 },
  
  'granulacja':                { key: 'granulacja',    unit: 'mm',      priority: 14 },
  'uziarnienie':               { key: 'granulacja',    unit: 'mm',      priority: 14 },
  
  // === OGÓLNE (priorytet 20-30) ===
  'waga':                      { key: 'waga',          unit: 'kg',      priority: 20 },
  'masa':                      { key: 'waga',          unit: 'kg',      priority: 20 },
  'gramatura':                 { key: 'waga',          unit: 'kg',      priority: 20 },
  
  'pojemność':                 { key: 'pojemnosc',     unit: 'l',       priority: 21 },
  'objętość':                  { key: 'pojemnosc',     unit: 'l',       priority: 21 },
  
  'kolor':                     { key: 'kolor',         unit: null,      priority: 22 },
  'barwa':                     { key: 'kolor',         unit: null,      priority: 22 },
  
  'materiał':                  { key: 'material',      unit: null,      priority: 23 },
  'tworzywo':                  { key: 'material',      unit: null,      priority: 23 },
  
  'zastosowanie':              { key: 'zastosowanie',  unit: null,      priority: 24 },
  'przeznaczenie':             { key: 'zastosowanie',  unit: null,      priority: 24 },
  
  'wydajność':                 { key: 'wydajnosc',     unit: 'm²',      priority: 25 },
  
  'długość':                   { key: 'dlugosc',       unit: 'mm',      priority: 26 },
  'szerokość':                 { key: 'szerokosc',     unit: 'mm',      priority: 27 },
  'wysokość':                  { key: 'wysokosc',      unit: 'mm',      priority: 28 },
};

// Normalizuj etykietę do lowercase bez spacji na końcach
function normalizeLabel(label) {
  return (label || '').toLowerCase().trim();
}

// Znajdź mapowanie dla etykiety
function findMapping(label) {
  const norm = normalizeLabel(label);
  
  // Dokładne dopasowanie
  if (SPEC_MAP[norm]) return SPEC_MAP[norm];
  
  // Częściowe dopasowanie (etykieta zawiera klucz)
  for (const [pattern, mapping] of Object.entries(SPEC_MAP)) {
    if (norm.includes(pattern) || pattern.includes(norm)) {
      return mapping;
    }
  }
  
  // Brak mapowania — zwróć domyślne
  return { key: norm.replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''), unit: null, priority: 99 };
}

async function query(groq) {
  const url = `https://${SANITY_PROJECT}.api.sanity.io/v2021-06-07/data/query/${SANITY_DATASET}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${SANITY_TOKEN}` },
    method: 'GET',
  });
  const params = new URLSearchParams({ query: groq });
  const fullUrl = `${url}?${params}`;
  const r = await fetch(fullUrl, { headers: { Authorization: `Bearer ${SANITY_TOKEN}` } });
  return (await r.json()).result;
}

async function mutate(mutations) {
  const url = `https://${SANITY_PROJECT}.api.sanity.io/v2021-06-07/data/mutate/${SANITY_DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SANITY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
  });
  return res.status === 200;
}

async function main() {
  console.log('🔄 Migracja technicalSpec — dodawanie key/unit/priority...\n');
  
  // Pobierz produkty z technicalSpec (bez key)
  const products = await query(`
    *[_type == "product" && count(technicalSpec) > 0 && !defined(technicalSpec[0].key)][0...500]{
      _id, name, technicalSpec
    }
  `);
  
  console.log(`📦 Produktów do migracji: ${products?.length || 0}`);
  
  if (!products?.length) {
    console.log('✅ Wszystkie produkty już zmigowane lub brak danych.');
    return;
  }
  
  let migrated = 0;
  const batchSize = 50;
  
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const mutations = [];
    
    for (const product of batch) {
      const newSpecs = (product.technicalSpec || []).map(spec => {
        const mapping = findMapping(spec.label);
        return {
          _type: 'specItem',
          _key: spec._key || Math.random().toString(36).slice(2, 10),
          key: mapping.key,
          label: spec.label,
          value: spec.value,
          unit: mapping.unit,
          priority: mapping.priority,
        };
      });
      
      mutations.push({
        patch: {
          id: product._id,
          set: { technicalSpec: newSpecs },
        },
      });
    }
    
    const ok = await mutate(mutations);
    if (ok) {
      migrated += batch.length;
      console.log(`  ✅ Batch ${Math.floor(i/batchSize)+1}: ${batch.length} produktów`);
    } else {
      console.log(`  ❌ Batch ${Math.floor(i/batchSize)+1}: błąd`);
    }
    
    // Rate limiting
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`\n✅ Zmigowano: ${migrated} produktów`);
  console.log('💡 Uruchom ponownie jeśli jest więcej niż 500 produktów.');
}

main().catch(console.error);
