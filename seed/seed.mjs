/**
 * Seed script – tworzy przykładowe kategorie i produkty w Sanity CMS.
 * Uruchom: SANITY_TOKEN=skXxx... node seed/seed.mjs
 *
 * Token musi mieć uprawnienia Editor lub wyższe.
 * Pobierz token: https://www.sanity.io/manage → projekt nzcwegq7 → API → Tokens
 */

import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('\n❌  Brak tokena Sanity!');
  console.error('   Ustaw: SANITY_TOKEN=skXxx... node seed/seed.mjs\n');
  process.exit(1);
}

const client = createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function cat(id, name, slug, order, parentId, description = '', icon = '') {
  const doc = {
    _id: id,
    _type: 'category',
    name,
    slug: { _type: 'slug', current: slug },
    order,
    description: description || undefined,
    icon: icon || undefined,
  };
  if (parentId) doc.parent = { _type: 'reference', _ref: parentId };
  return doc;
}

function ref(id) {
  return { _type: 'reference', _ref: id };
}

function prod(id, name, slug, sku, brand, catId, unit, shortDesc, specs = [], tags = [], featured = false) {
  return {
    _id: id,
    _type: 'product',
    name,
    slug: { _type: 'slug', current: slug },
    sku,
    brand,
    category: ref(catId),
    unit,
    shortDescription: shortDesc,
    featured,
    inStock: true,
    specs: specs.map(([k, v]) => ({ _key: k.replace(/\s+/g, '-'), key: k, value: v })),
    tags,
  };
}

// ─── Kategorie ────────────────────────────────────────────────────────────────

const categories = [
  // Poziom 1 – główne
  cat('cat-chemia',   'Chemia budowlana',       'chemia-budowlana',     1, null,
      'Kompletna oferta chemii budowlanej: tynki, kleje, gipsy, grunty, zaprawy i więcej.'),
  cat('cat-izolacje', 'Izolacje',               'izolacje',             2, null,
      'Styropian EPS, wełna mineralna, styrodur XPS i systemy ociepleń ETICS.'),
  cat('cat-farby',    'Farby i rozpuszczalniki', 'farby-rozpuszczalniki', 3, null,
      'Farby elewacyjne, wewnętrzne, impregnaty do drewna i metalu.'),
  cat('cat-dachy',    'Dachy',                  'dachy',                4, null,
      'Papa bitumiczna, gonty, rynny PVC/ocynk, membrany dachowe.'),
  cat('cat-narzedzia','Narzędzia i mocowania',   'narzedzia-mocowania',  5, null,
      'Wiertarki, szlifierki, wkręty, kołki rozporowe i akcesoria montażowe.'),
  cat('cat-plytki',   'Płytki',                 'plytki',               6, null,
      'Płytki ceramiczne, gresowe, ścienne i podłogowe.'),
  cat('cat-stropy',   'Ściany i stropy',        'stropy-sciany',        7, null,
      'Bloczki betonowe, ceramika, pustaki i zaprawy murarskie.'),
  cat('cat-sucha',    'Sucha zabudowa',         'sucha-zabudowa',       8, null,
      'Płyty GK, profile stalowe CD/CW/UW i akcesoria montażowe.'),
  cat('cat-posadzki', 'Posadzki',               'posadzki',             9, null,
      'Wylewki, masy samopoziomujące, kleje do paneli i podłogi.'),

  // Poziom 2 – Chemia budowlana
  cat('cat-tynki',    'Tynki',                  'tynki',                1, 'cat-chemia',
      'Tynki elewacyjne i wewnętrzne: silikonowe, gipsowe, mineralne, akrylowe.'),
  cat('cat-kleje',    'Kleje',                  'kleje',                2, 'cat-chemia',
      'Kleje do styropianu, glazury, drewna i montażu.'),
  cat('cat-gipsy',    'Gipsy i gładzie',        'gipsy-gladzie',        3, 'cat-chemia'),
  cat('cat-grunty',   'Grunty',                 'grunty',               4, 'cat-chemia'),
  cat('cat-zaprawy',  'Zaprawy murarskie',      'zaprawy-murarskie',    5, 'cat-chemia'),
  cat('cat-hydro',    'Hydroizolacje',          'hydroizolacje',        6, 'cat-chemia'),

  // Poziom 2 – Izolacje
  cat('cat-styropian','Styropian EPS',           'styropian',            1, 'cat-izolacje',
      'Styropian grafitowy i biały EPS do ociepleń fasad, podłóg i dachów.'),
  cat('cat-welna',    'Wełna mineralna',        'welna-mineralna',      2, 'cat-izolacje',
      'Wełna skalna i szklana do ociepleń fasad, dachów i ścian działowych.'),
  cat('cat-styrodur', 'Styrodur XPS',           'styrodur',             3, 'cat-izolacje'),

  // Poziom 2 – Farby
  cat('cat-farby-el', 'Farby elewacyjne',       'farby-elewacyjne',     1, 'cat-farby'),
  cat('cat-farby-wn', 'Farby wewnętrzne',       'farby-wewnetrzne',     2, 'cat-farby'),
  cat('cat-impregnaty','Impregnaty',            'impregnaty',           3, 'cat-farby'),

  // Poziom 2 – Sucha zabudowa
  cat('cat-plyty-gk', 'Płyty gipsowo-kartonowe','plyty-gk',            1, 'cat-sucha'),
  cat('cat-profile',  'Profile stalowe',        'profile-stalowe',      2, 'cat-sucha'),

  // Poziom 3 – Tynki elewacyjne
  cat('cat-tynki-sil', 'Tynki elewacyjne silikonowe',  'tynki-silikonowe',  1, 'cat-tynki'),
  cat('cat-tynki-sik', 'Tynki elewacyjne silikatowe',  'tynki-silikatowe',  2, 'cat-tynki'),
  cat('cat-tynki-ak',  'Tynki elewacyjne akrylowe',    'tynki-akrylowe',    3, 'cat-tynki'),
  cat('cat-tynki-min', 'Tynki elewacyjne mineralne',   'tynki-mineralne',   4, 'cat-tynki'),
  cat('cat-tynki-gip', 'Tynki gipsowe',                'tynki-gipsowe',     5, 'cat-tynki'),
  cat('cat-tynki-cem', 'Tynki cementowo-wapienne',     'tynki-cementowo-wapienne', 6, 'cat-tynki'),

  // Poziom 3 – Kleje
  cat('cat-kleje-sty', 'Kleje do styropianu',          'kleje-styropian',   1, 'cat-kleje'),
  cat('cat-kleje-glaz','Kleje do glazury',              'kleje-glazura',     2, 'cat-kleje'),
  cat('cat-kleje-mont','Kleje montażowe',               'kleje-montazowe',   3, 'cat-kleje'),
  cat('cat-kleje-welna','Kleje do wełen',               'kleje-welna',       4, 'cat-kleje'),
];

// ─── Produkty ─────────────────────────────────────────────────────────────────

const products = [
  prod(
    'prod-tynk-silikonowy-weber-dr1',
    'Tynk silikonowy weber.pas DR1 15kg',
    'tynk-silikonowy-weber-pas-dr1',
    'WEB-SIL-DR1-15',
    'Weber',
    'cat-tynki-sil',
    'worek 15kg',
    'Gotowy tynk elewacyjny silikonowy o strukturze drapany/kornik, odporny na zabrudzenia. Doskonały do systemów ociepleń ETICS.',
    [
      ['Granulacja', '1,5 mm lub 2,0 mm'],
      ['Zużycie', '2,5–3,5 kg/m²'],
      ['Temperatura aplikacji', '+5°C do +25°C'],
      ['Czas schnięcia', '24–48 h'],
    ],
    ['tynk silikonowy', 'elewacja', 'etics', 'weber', 'kornik'],
    true,
  ),
  prod(
    'prod-tynk-gipsowy-knauf-goldband',
    'Tynk gipsowy Knauf Goldband 25kg',
    'tynk-gipsowy-knauf-goldband-25kg',
    'KNF-GB-25',
    'Knauf',
    'cat-tynki-gip',
    'worek 25kg',
    'Tynk gipsowy maszynowy i ręczny do wnętrz na mury i sufity. Wysoka biała powierzchnia, łatwy w obróbce.',
    [
      ['Zużycie', '8,5 kg/m² (przy 10 mm)'],
      ['Grubość warstwy', '8–50 mm'],
      ['Czas schnięcia', 'ok. 2 h'],
      ['Temperatura aplikacji', '+5°C do +30°C'],
    ],
    ['tynk gipsowy', 'knauf', 'goldband', 'wnętrze', 'maszynowy'],
    true,
  ),
  prod(
    'prod-klej-styropian-weber-therm',
    'Zaprawa klejąca weber.therm extra 25kg',
    'zaprawa-klejaca-weber-therm-extra-25kg',
    'WEB-THERM-EX-25',
    'Weber',
    'cat-kleje-sty',
    'worek 25kg',
    'Zaprawa klejąca do styropianu i wełny mineralnej w systemach ETICS. Wysoka przyczepność, odporność na warunki atmosferyczne.',
    [
      ['Zużycie', '4–6 kg/m²'],
      ['Czas korekty', '10 min'],
      ['Temperatura aplikacji', '+5°C do +30°C'],
      ['Klasa reakcji na ogień', 'A1'],
    ],
    ['klej do styropianu', 'etics', 'weber', 'zaprawa klejąca'],
    true,
  ),
  prod(
    'prod-styropian-swisspor-eps70',
    'Styropian grafitowy Swisspor EPS 70-031 Fasada 15cm',
    'styropian-grafitowy-swisspor-eps70-031-fasada-15cm',
    'SWP-EPS70-031-15',
    'Swisspor',
    'cat-styropian',
    'm²',
    'Styropian grafitowy EPS 70-031 do ociepleń fasad budynków. Niski współczynnik przewodzenia ciepła λ=0,031 W/(mK).',
    [
      ['Grubość', '15 cm'],
      ['Lambda λ', '0,031 W/(mK)'],
      ['Klasa reakcji na ogień', 'E'],
      ['Format płyty', '100×50 cm'],
      ['Krawędź', 'frezowana'],
    ],
    ['styropian', 'eps 70', 'grafitowy', 'swisspor', 'fasada', 'ocieplenie'],
    true,
  ),
  prod(
    'prod-welna-rockwool-frontrock',
    'Wełna mineralna Rockwool Frontrock MAX E 15cm',
    'welna-mineralna-rockwool-frontrock-max-e-15cm',
    'RCK-FRM-150',
    'Rockwool',
    'cat-welna',
    'm²',
    'Wełna skalna do ociepleń fasad metodą ETICS. Wysoka odporność ogniowa A1, doskonałe parametry akustyczne i termoizolacyjne.',
    [
      ['Grubość', '15 cm'],
      ['Lambda λ', '0,036 W/(mK)'],
      ['Klasa reakcji na ogień', 'A1 (niepalna)'],
      ['Naprężenie ściskające', '≥ 80 kPa'],
      ['Format płyty', '100×60 cm'],
    ],
    ['wełna mineralna', 'rockwool', 'frontrock', 'etics', 'fasada', 'ognioodporny'],
    true,
  ),
  prod(
    'prod-grunt-ceresit-ct16',
    'Grunt głęboko penetrujący Ceresit CT 16 10L',
    'grunt-gleboko-penetrujacy-ceresit-ct16-10l',
    'CRS-CT16-10L',
    'Ceresit',
    'cat-grunty',
    'kanister 10L',
    'Grunt głęboko penetrujący wzmacniający chłonne podłoża mineralne przed tynkowaniem, klejeniem i malowaniem.',
    [
      ['Wydajność', '100–200 ml/m²'],
      ['Rozcieńczenie', '1:3 wodą'],
      ['Czas schnięcia', '1–4 h'],
      ['Temperatura aplikacji', '+5°C do +25°C'],
    ],
    ['grunt', 'ceresit', 'CT16', 'penetrujący', 'podkład'],
    false,
  ),
  prod(
    'prod-hydroizolacja-ceresit-cl50',
    'Elastyczna hydroizolacja Ceresit CL 50 15kg',
    'elastyczna-hydroizolacja-ceresit-cl50-15kg',
    'CRS-CL50-15',
    'Ceresit',
    'cat-hydro',
    'wiadro 15kg',
    'Elastyczna, dwuskładnikowa powłoka uszczelniająca do łazienek, basenów i tarasów. Gotowa do użycia, nakładana pędzlem lub wałkiem.',
    [
      ['Wydajność', '3–5 kg/m² (2 warstwy)'],
      ['Czas schnięcia', '2–6 h'],
      ['Temperatura aplikacji', '+5°C do +30°C'],
      ['Klasa', 'CM2S'],
    ],
    ['hydroizolacja', 'ceresit', 'CL50', 'uszczelnienie', 'łazienka'],
    false,
  ),
];

// ─── Zapis do Sanity ──────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Rozpoczynam seedowanie Sanity CMS...\n');

  // Kategorie
  console.log(`📁 Tworzę ${categories.length} kategorii...`);
  const catTx = client.transaction();
  for (const doc of categories) {
    catTx.createOrReplace(doc);
  }
  await catTx.commit({ visibility: 'async' });
  console.log('   ✅ Kategorie zapisane\n');

  // Małe opóźnienie żeby referencje były widoczne
  await new Promise(r => setTimeout(r, 1500));

  // Produkty
  console.log(`📦 Tworzę ${products.length} produktów...`);
  const prodTx = client.transaction();
  for (const doc of products) {
    prodTx.createOrReplace(doc);
  }
  await prodTx.commit({ visibility: 'async' });
  console.log('   ✅ Produkty zapisane\n');

  console.log('🎉 Seedowanie zakończone!');
  console.log('   Otwórz Studio: https://mediabud-studio.pages.dev/structure');
  console.log('   Sprawdź Kategorie i Produkty\n');
}

seed().catch(err => {
  console.error('❌ Błąd seedowania:', err.message);
  process.exit(1);
});
