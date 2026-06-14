import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const BASE_URL = 'https://mediabud.pl';

const CATEGORY_SLUG_ALIASES = {
  'gipsy-gladzie': 'gipsy-i-gladzie',
  'gladzie-proszek': 'gladzie-gipsowe-w-proszku',
  'gladzie-gotowe': 'gladzie-masy-gotowe',
  'masy-szpachlowe': 'masy-szpachlowe-gotowe',
  'aczniki-do-izolacji-fasadowych': 'laczniki-do-izolacji-fasadowych',
  'aczniki-do-profili': 'laczniki-do-profili',
  'akcesoria-do-potkow-przeciwsniegowe': 'akcesoria-do-plotkow-przeciwsniegowe',
  'artykuy-scierne': 'artykuly-scierne',
  'artykuy-scierne-do-suchej-zabudowy': 'artykuly-scierne-do-suchej-zabudowy',
  'farby-pozostae': 'farby-pozostale',
  'farby-przemysowe': 'farby-przemyslowe',
  'farby-wewnetrzne-biae': 'farby-wewnetrzne-biale',
  'gadzie-gipsowe-w-proszku': 'gladzie-gipsowe-w-proszku',
  'gadzie-masy-gotowe': 'gladzie-masy-gotowe',
  'gipsy-i-gadzie': 'gipsy-i-gladzie',
  'izolacje-dachow-paskich': 'izolacje-dachow-plaskich',
  'izolacje-przemysowe': 'izolacje-przemyslowe',
  'izolacje-stropow-i-podog': 'izolacje-stropow-i-podlog',
  'kleje-do-ween': 'kleje-do-welen',
  'koki-i-wkrety-uniwersalne': 'kolki-i-wkrety-uniwersalne',
  'listwy-przypodogowe': 'listwy-przypodlogowe',
  'materiay-konstrukcyjne': 'materialy-konstrukcyjne',
  'mieszada': 'mieszadla',
  'motki-budowlane': 'mlotki-budowlane',
  'okadziny-z-wokna-szklanego': 'okladziny-z-wlokna-szklanego',
  'oowkikredy-i-markery': 'olowki-kredy-i-markery',
  'podkady-wypeniajace': 'podklady-wypelniajace',
  'potki-przeciwsniegowe': 'plotki-przeciwsniegowe',
  'powoki-epoksydowe': 'powloki-epoksydowe',
  'pytki-elewacyjne': 'plytki-elewacyjne',
  'pytki-scienne': 'plytki-scienne',
  'pytki-tarasowe': 'plytki-tarasowe',
  'pyty-cementowe': 'plyty-cementowe',
  'pyty-gipsowo-kartonowe': 'plyty-gipsowo-kartonowe',
  'pyty-xps': 'plyty-xps',
  'spoiny-zwyke': 'spoiny-zwykle',
  'styropian-dach-podoga-eps': 'styropian-dach-podloga-eps',
  'tasmy-i-folie-pozostae': 'tasmy-i-folie-pozostale',
  'waki-malarskie': 'walki-malarskie',
  'weny': 'welny',
  'weny-do-dachow-paskich': 'welny-do-dachow-plaskich',
  'weny-do-poddaszy': 'welny-do-poddaszy',
  'weny-fasadowe': 'welny-fasadowe',
  'wsporniki-potkow-przeciwsniegowych': 'wsporniki-plotkow-przeciwsniegowych',
};

const BASE_SPA_PATHS = [
  '/kategoria',
  '/produkty',
  '/blog',
  '/kontakt',
  '/o-firmie',
  '/uslugi',
  '/realizacje',
  '/szukaj',
  '/polityka-prywatnosci',
  '/rodo',
  '/regulamin',
  '/sitemap',
  '/kalkulator',
  '/marki',
  '/bestsellery',
  '/admin',
];

function fallbackHtml(targetPath) {
  const escaped = JSON.stringify(targetPath);
  return `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <title>Media Bud – przekierowanie</title>
    <script>
      (function () {
        try { sessionStorage.setItem('mb_pending_deep_link', ${escaped}); } catch (e) {}
        window.location.replace('/');
      })();
    </script>
  </head>
  <body>
    <p>Przekierowanie do Media Bud… <a href="/">Przejdź na stronę główną</a></p>
  </body>
</html>
`;
}

async function readXmlPaths(fileName, prefixFilter = '') {
  try {
    const xml = await fs.readFile(path.join(PUBLIC_DIR, fileName), 'utf-8');
    const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
    return matches
      .map(([, loc]) => loc.replace(BASE_URL, ''))
      .filter(pathname => pathname.startsWith(prefixFilter));
  } catch {
    return [];
  }
}

async function writeFallback(targetPath) {
  if (!targetPath.startsWith('/') || targetPath.includes('..')) return;
  const dir = path.join(PUBLIC_DIR, targetPath.replace(/^\//, ''));
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'index.html'), fallbackHtml(targetPath), 'utf-8');
}

async function main() {
  const paths = new Set(BASE_SPA_PATHS);

  for (const pathFromSitemap of await readXmlPaths('sitemap-categories.xml', '/kategoria/')) {
    paths.add(pathFromSitemap);
  }

  for (const slug of Object.keys(CATEGORY_SLUG_ALIASES)) {
    paths.add(`/kategoria/${slug}`);
  }
  for (const slug of Object.values(CATEGORY_SLUG_ALIASES)) {
    paths.add(`/kategoria/${slug}`);
  }

  // Core sitemap zawiera blog, marki i kalkulatory — bez produktów, żeby nie generować dziesiątek tysięcy plików.
  for (const pathFromSitemap of await readXmlPaths('sitemap-core.xml')) {
    if (
      pathFromSitemap.startsWith('/blog/') ||
      pathFromSitemap.startsWith('/marki/') ||
      pathFromSitemap.startsWith('/kalkulator/')
    ) {
      paths.add(pathFromSitemap);
    }
  }

  for (const targetPath of paths) {
    await writeFallback(targetPath);
  }

  console.log(`✓ static SPA fallbacks generated in public/ (${paths.size})`);
}

main().catch(err => {
  console.error('Błąd generatora statycznych fallbacków:', err);
  process.exit(1);
});
