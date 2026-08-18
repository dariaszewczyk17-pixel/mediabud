/** Statyczne metadane i JSON-LD dla tras bazowych oraz katalogu Sanity. */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const BASE_URL = "https://mediabud.pl";
const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || "nzcwegq7";
const DATASET = process.env.VITE_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_TOKEN || process.env.VITE_SANITY_TOKEN || "";
const SANITY_BASE = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}`;
const PAGE_SIZE = 1000;

const staticRoutes = [
  ["/", "Skład Budowlany Lublin – Materiały z Dostawą | Media Bud", "Skład budowlany Media Bud w Lublinie: styropian, tynki, zaprawy, sucha zabudowa, dachy i chemia budowlana. Dobór, odbiór lub ustalana indywidualnie dostawa."],
  ["/kontakt", "Media Bud Lublin – Kontakt, Dojazd i Godziny Otwarcia", "Media Bud, ul. Chemiczna 8d w Lublinie. Sprawdź dojazd i godziny otwarcia, zadzwoń lub poproś o wycenę materiałów budowlanych z dostawą."],
  ["/o-firmie", "Media Bud – Skład i Hurtownia Budowlana w Lublinie", "Poznaj Media Bud – lubelski skład materiałów budowlanych dla klientów indywidualnych, wykonawców i deweloperów. Doradztwo i dostawa na budowę."],
  ["/kategoria/sucha-zabudowa", "Sucha Zabudowa Lublin – Płyty GK i Profile | Media Bud", "Sucha zabudowa w Lublinie: płyty gipsowo-kartonowe, profile, wkręty, masy i akcesoria. Odbiór w Media Bud lub dostawa materiałów na budowę."],
  ["/kategoria/sufity-podwieszane", "Sufity Podwieszane Lublin – Płyty i Systemy | Media Bud", "Materiały do sufitów podwieszanych w Lublinie: płyty sufitowe, profile, wieszaki i akcesoria montażowe. Fachowy dobór oraz dostawa na budowę."],
  ["/kategoria/styropiany", "Styropian Lublin – Elewacyjny, Podłogowy i Fundamentowy", "Styropian w Lublinie do elewacji, podłóg i fundamentów. Porównaj parametry i dobierz kompletny system ocieplenia z doradztwem Media Bud i dostawą."],
  ["/kategoria/zaprawy", "Zaprawy Budowlane Lublin – Murarskie i Specjalistyczne", "Zaprawy budowlane w Lublinie: murarskie, tynkarskie, naprawcze i specjalistyczne. Oferta renomowanych producentów, doradztwo i dostawa Media Bud."],
  ["/kategoria/farby-elewacyjne", "Farby Elewacyjne Lublin – Silikonowe i Silikatowe", "Farby elewacyjne w Lublinie: silikonowe, silikatowe, akrylowe i gruntujące. Dobór systemu, kolorów oraz dostawa na budowę z Media Bud."],
  ["/kategoria/pokrycia-dachowe", "Pokrycia Dachowe Lublin – Dachówki i Akcesoria", "Pokrycia dachowe w Lublinie: dachówki, membrany, obróbki i akcesoria. Zapytaj Media Bud o dostępność, wycenę i dostawę kompletnego systemu."],
  ["/kategoria/materialy-konstrukcyjne", "Materiały Konstrukcyjne Lublin – Pustaki i Bloczki", "Materiały konstrukcyjne w Lublinie: pustaki ceramiczne, bloczki, nadproża i zaprawy. Wycena zamówienia oraz dostawa na budowę z Media Bud."],
  ["/materialy-budowlane-lublin", "Materiały budowlane Lublin | Media Bud", "Materiały budowlane w Lublinie z doradztwem, odbiorem osobistym lub dostawą na budowę. Prześlij listę, projekt albo dodaj produkty do wyceny."],
  ["/styropian-lublin", "Styropian Lublin | Media Bud", "Styropian w Lublinie do elewacji, podłóg, fundamentów i dachów. Pomożemy dobrać parametry, obliczyć ilość i przygotować wycenę z dostawą."],
  ["/welna-mineralna-lublin", "Wełna mineralna Lublin | Media Bud", "Wełna mineralna w Lublinie do poddaszy, elewacji, ścian działowych, stropów i dachów. Dobór parametrów, wycena oraz dostawa na inwestycję."],
  ["/chemia-budowlana-lublin", "Chemia budowlana Lublin | Media Bud", "Chemia budowlana w Lublinie: kleje, zaprawy, grunty, hydroizolacje, piany i uszczelniacze. Pomoc w doborze oraz wspólna wycena materiałów."],
  ["/dostawa-materialow-budowlanych-lublin", "Dostawa materiałów budowlanych Lublin | Media Bud", "Dostawa materiałów budowlanych na terenie Lublina i województwa lubelskiego. Prześlij listę materiałów, adres oraz informacje o rozładunku."],
  ["/kalkulator/system-ocieplenia-elewacji", "Konfigurator systemu ocieplenia ETICS | Media Bud Lublin", "Oblicz kompletną listę materiałów na ocieplenie elewacji: izolację, zaprawy, siatkę, łączniki, grunt, tynk oraz profile i prześlij zestaw do wyceny."],
].map(([routePath, title, description]) => ({ routePath, title, description }));

const cleanText = (value, max = 160) => {
  const text = String(value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${cut.slice(0, space > max * 0.7 ? space : cut.length).trim()}…`;
};
const esc = value => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const safeJson = value => JSON.stringify(value).replaceAll("<", "\\u003c");

async function sanityQuery(query) {
  const headers = { "Content-Type": "application/json" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const response = await fetch(`${SANITY_BASE}?query=${encodeURIComponent(query)}`, { headers });
  if (!response.ok) throw new Error(`Sanity HTTP ${response.status}`);
  return (await response.json()).result ?? [];
}
async function fetchAll(baseQuery) {
  const result = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const batch = await sanityQuery(`${baseQuery}[${offset}...${offset + PAGE_SIZE}]`);
    result.push(...batch);
    if (batch.length < PAGE_SIZE) return result;
  }
}
function ancestors(item) {
  const chain = [];
  for (let current = item; current && chain.length < 5; current = current.parent) {
    if (current.slug) chain.unshift({ name: current.name, slug: current.slug });
  }
  return chain;
}
function productIsIndexable(product) {
  let score = 0;
  if (String(product.shortDescription ?? "").length > 50) score += 2;
  if (String(product.description ?? "").length > 200) score += 2;
  if (product.image) score += 1;
  if (product.hasTechSpec) score += 1;
  if (String(product.name ?? "").length > 5) score += 1;
  if (product.category?.slug) score += 1;
  return score >= 5;
}
function productTitle(product) {
  if (product.metaTitle) return cleanText(product.metaTitle, 65);
  const name = cleanText(product.name, 54);
  const hasBrand = product.brand && name.toLocaleLowerCase("pl").includes(product.brand.toLocaleLowerCase("pl"));
  return `${name}${product.brand && !hasBrand ? ` – ${product.brand}` : ""} | Media Bud`;
}

function withMeta(html, route) {
  const canonical = `${BASE_URL}${route.routePath === "/" ? "/" : route.routePath}`;
  const image = route.image ? (route.image.startsWith("http") ? route.image : `${BASE_URL}${route.image}`) : `${BASE_URL}/og-image.jpg`;
  const replacements = [
    [/<title>[^<]*<\/title>/i, `<title>${esc(route.title)}</title>`],
    [/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${esc(route.description)}" />`],
    [/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${esc(route.title)}" />`],
    [/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${esc(route.description)}" />`],
    [/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonical}" />`],
    [/<meta property="og:image" content="[^"]*"\s*\/>/i, `<meta property="og:image" content="${esc(image)}" />`],
    [/<meta property="og:type" content="[^"]*"\s*\/>/i, `<meta property="og:type" content="${route.type === "product" ? "product" : "website"}" />`],
    [/<meta name="twitter:title" content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${esc(route.title)}" />`],
    [/<meta name="twitter:description" content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${esc(route.description)}" />`],
    [/<meta name="twitter:image" content="[^"]*"\s*\/>/i, `<meta name="twitter:image" content="${esc(image)}" />`],
  ];
  for (const [pattern, replacement] of replacements) html = html.replace(pattern, replacement);
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
  html = html.replace("<!-- Canonical jest dodawany per trasa przez statyczne SEO shells i useSEO. -->", canonicalTag);
  if (!html.includes(canonicalTag)) html = html.replace("</head>", `    ${canonicalTag}\n  </head>`);
  if (route.schema) html = html.replace("</head>", `    <script id="static-route-schema" type="application/ld+json">${safeJson(route.schema)}</script>\n  </head>`);
  return html;
}
async function writeRoute(template, route) {
  const output = route.routePath === "/" ? path.join(DIST, "index.html") : path.join(DIST, route.routePath.slice(1), "index.html");
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, withMeta(template, route), "utf8");
}

async function loadCatalogRoutes() {
  const categoryQuery = `*[_type=="category" && defined(slug.current)] | order(_id asc) {name, description, metaTitle, metaDescription, "slug": slug.current, "parent": parent->{name, "slug": slug.current, "parent": parent->{name, "slug": slug.current, "parent": parent->{name, "slug": slug.current}}}}`;
  const productQuery = `*[_type=="product" && defined(slug.current) && !(name match "P-*")] | order(_id asc) {name, shortDescription, description, metaTitle, metaDescription, sku, "slug": slug.current, "brand": brand->name, "image": coalesce(images[0].asset->url, image.asset->url), "hasTechSpec": count(technicalSpec) > 0, priceMin, priceMax, inStock, "category": category->{name, "slug": slug.current}}`;
  const [categories, products] = await Promise.all([fetchAll(categoryQuery), fetchAll(productQuery)]);
  const categoryRoutes = categories.map(category => {
    const crumbs = ancestors(category);
    const routePath = `/kategoria/${crumbs.map(item => item.slug).join("/") || category.slug}`;
    const description = cleanText(category.metaDescription || category.description || `${category.name} w Media Bud Lublin. Sprawdź produkty, parametry i poproś o indywidualną wycenę.`);
    return {
      routePath, title: cleanText(category.metaTitle || `${category.name} Lublin – Oferta i Dostawa | Media Bud`, 70), description,
      schema: {
        "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${BASE_URL}${routePath}#collection`, url: `${BASE_URL}${routePath}`,
        name: category.name, description, isPartOf: { "@id": `${BASE_URL}/#website` }, about: { "@id": `${BASE_URL}/#localbusiness` },
        breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Strona główna", item: `${BASE_URL}/` },
          ...crumbs.map((item, index) => ({ "@type": "ListItem", position: index + 2, name: item.name, item: `${BASE_URL}/kategoria/${crumbs.slice(0, index + 1).map(x => x.slug).join("/")}` })),
        ] },
      },
    };
  });
  const productRoutes = products.filter(productIsIndexable).map(product => {
    const routePath = `/produkt/${product.slug}`;
    const description = cleanText(product.metaDescription || product.shortDescription || product.description || `${product.name}. Sprawdź parametry i zapytaj Media Bud Lublin o dostępność, odbiór lub dostawę.`);
    return {
      routePath, title: productTitle(product), description, type: "product", image: product.image,
      schema: Number(product.priceMin) > 0 ? {
        "@context": "https://schema.org", "@type": "Product", "@id": `${BASE_URL}${routePath}#product`, url: `${BASE_URL}${routePath}`,
        name: product.name, description, ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
        ...(product.sku ? { sku: product.sku } : {}), ...(product.image ? { image: [product.image] } : {}),
        ...(product.category?.name ? { category: product.category.name } : {}), mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${routePath}` },
        offers: Number(product.priceMax) > Number(product.priceMin) ? {
          "@type": "AggregateOffer", priceCurrency: "PLN", lowPrice: Number(product.priceMin), highPrice: Number(product.priceMax), url: `${BASE_URL}${routePath}`,
          ...(product.inStock != null ? { availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } : {}),
        } : {
          "@type": "Offer", priceCurrency: "PLN", price: Number(product.priceMin), url: `${BASE_URL}${routePath}`,
          ...(product.inStock != null ? { availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } : {}),
          seller: { "@type": "Organization", name: "Media Bud" },
        },
      } : undefined,
    };
  });
  return { categoryRoutes, productRoutes, totalProducts: products.length };
}

const template = await fs.readFile(path.join(DIST, "index.html"), "utf8");
const routeMap = new Map(staticRoutes.map(route => [route.routePath, route]));
try {
  const catalog = await loadCatalogRoutes();
  for (const route of [...catalog.categoryRoutes, ...catalog.productRoutes]) if (!routeMap.has(route.routePath)) routeMap.set(route.routePath, route);
  console.log(`Static SEO katalog: ${catalog.categoryRoutes.length} kategorii, ${catalog.productRoutes.length}/${catalog.totalProducts} produktów spełniających próg jakości.`);
} catch (error) {
  console.warn(`Static SEO katalog pominięty — zachowano trasy bazowe: ${error.message}`);
}
for (const route of routeMap.values()) await writeRoute(template, route);
console.log(`Static SEO: wygenerowano ${routeMap.size} tras z unikalnymi metadanymi.`);
