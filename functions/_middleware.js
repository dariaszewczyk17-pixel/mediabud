/**
 * Cloudflare Pages Middleware — Prerendering dla crawlerów (SEO)
 * 
 * Wykrywa boty (Googlebot, Bingbot, etc.) i serwuje im pre-renderowany HTML
 * z produktami i meta tagami, zamiast pustego SPA shell.
 * 
 * Dla zwykłych użytkowników — passthrough do normalnego SPA.
 * 
 * Cache: KV binding PRERENDER_CACHE (opcjonalny) lub Cache API (domyślny).
 * TTL: 1 godzina (revalidation co godzinę).
 */

const BOT_UA_REGEX = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|petalbot/i;

const PROJECT_ID = "nzcwegq7";
const DATASET = "production";
const API_VER = "v2021-06-07";
const SANITY_QUERY_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`;

const SITE_URL = "https://mediabud.pl";
const CACHE_TTL = 3600; // 1 godzina

/**
 * Sprawdza czy request pochodzi od crawlera
 */
function isBot(request) {
  const ua = request.headers.get("user-agent") || "";
  return BOT_UA_REGEX.test(ua);
}

/**
 * Pobiera produkty z Sanity dla danej kategorii (server-side)
 */
async function fetchCategoryProducts(catSlug, token) {
  const query = encodeURIComponent(
    `*[_type == "product" && (category->slug.current == "${catSlug}" || rootCategory->slug.current == "${catSlug}") && !(name match "P-*")] | order(name asc) [0...48] {
      _id, name, "slug": slug.current,
      "brand": brand->name,
      "categorySlug": category->slug.current,
      "image": images[0].asset->url,
      shortDescription
    }`
  );

  const res = await fetch(`${SANITY_QUERY_URL}?query=${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) return [];
  const { result } = await res.json();
  return result || [];
}

/**
 * Pobiera metadane kategorii z Sanity
 */
async function fetchCategoryMeta(catSlug, token) {
  const query = encodeURIComponent(
    `*[_type == "category" && slug.current == "${catSlug}"][0] {
      name, description,
      "parentName": parent->name,
      "parentSlug": parent->slug.current
    }`
  );

  const res = await fetch(`${SANITY_QUERY_URL}?query=${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) return null;
  const { result } = await res.json();
  return result;
}

/**
 * Generuje pełny HTML dla crawlerów z produktami i structured data
 */
function generateBotHTML(pathname, category, products) {
  const catName = category?.name || pathname.split("/").pop().replace(/-/g, " ");
  const catDesc = category?.description || `Materiały budowlane - ${catName}. Sprawdź ofertę Media Bud.`;
  const title = `${catName} – Media Bud | Skład Budowlany Lublin`;
  const canonical = `${SITE_URL}${pathname}`;

  // Breadcrumbs
  const breadcrumbs = [];
  breadcrumbs.push({ name: "Strona główna", url: SITE_URL });
  if (category?.parentName) {
    breadcrumbs.push({ name: category.parentName, url: `${SITE_URL}/kategoria/${category.parentSlug}` });
  }
  breadcrumbs.push({ name: catName, url: canonical });

  // JSON-LD BreadcrumbList
  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((bc, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": bc.name,
      "item": bc.url,
    })),
  };

  // JSON-LD CollectionPage
  const collectionLD = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collection`,
    "name": title,
    "description": catDesc,
    "url": canonical,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": products.length,
      "itemListElement": products.slice(0, 20).map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${SITE_URL}/${p.slug}-id-p-${p._id}`,
        "name": p.name,
      })),
    },
  };

  // Product cards HTML
  const productCards = products.map(p => `
    <article class="product-card" itemscope itemtype="https://schema.org/Product">
      <a href="/${p.slug}-id-p-${p._id}">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" width="300" height="225" loading="lazy" itemprop="image" />` : ""}
        <h3 itemprop="name">${p.name}</h3>
        ${p.brand ? `<span itemprop="brand" itemscope itemtype="https://schema.org/Brand"><meta itemprop="name" content="${p.brand}" />${p.brand}</span>` : ""}
        ${p.shortDescription ? `<p itemprop="description">${p.shortDescription.substring(0, 160)}</p>` : ""}
      </a>
      <meta itemprop="offers" itemscope itemtype="https://schema.org/Offer" content="" />
      <link itemprop="availability" href="https://schema.org/InStock" />
    </article>
  `).join("\n");

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${catDesc.substring(0, 160)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${catDesc.substring(0, 160)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="Media Bud – Skład Budowlany Lublin" />
  <meta property="og:locale" content="pl_PL" />
  <script type="application/ld+json">${JSON.stringify(breadcrumbLD)}</script>
  <script type="application/ld+json">${JSON.stringify(collectionLD)}</script>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background: #0d0d0d; color: #fff; }
    h1 { font-size: 1.5rem; border-bottom: 2px solid #f81828; padding-bottom: 8px; }
    .products { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
    .product-card { background: #141414; border: 1px solid #222; border-radius: 8px; padding: 12px; }
    .product-card a { color: #fff; text-decoration: none; }
    .product-card h3 { font-size: 0.9rem; margin: 8px 0 4px; }
    .product-card span { font-size: 0.75rem; color: #f81828; }
    .product-card p { font-size: 0.8rem; color: #999; margin: 4px 0 0; }
    .product-card img { width: 100%; height: auto; border-radius: 4px; background: #1a1a1a; }
    nav.breadcrumbs { font-size: 0.8rem; margin-bottom: 16px; }
    nav.breadcrumbs a { color: #f81828; text-decoration: none; }
    nav.breadcrumbs span { color: #666; margin: 0 4px; }
    .count { color: #888; font-size: 0.85rem; margin-bottom: 16px; }
  </style>
</head>
<body>
  <nav class="breadcrumbs">
    ${breadcrumbs.map((bc, i) => i < breadcrumbs.length - 1
      ? `<a href="${bc.url}">${bc.name}</a><span>›</span>`
      : `<strong>${bc.name}</strong>`
    ).join("")}
  </nav>
  <h1>${catName}</h1>
  <p class="count">${products.length} produktów</p>
  <div class="products">
    ${productCards}
  </div>
  <footer style="margin-top:40px;padding-top:20px;border-top:1px solid #333;font-size:0.75rem;color:#666;">
    <p>Media Bud – Skład Budowlany | ul. Chemiczna 8d, 20-329 Lublin | tel: +48 533 553 344</p>
  </footer>
</body>
</html>`;
}

/**
 * Middleware — główna logika
 */
export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // ── /produkt/* — SPA fallback z kodem 200 (nie 404) ──
  // Cloudflare Pages domyślnie serwuje SPA shell jako 404 dla nieznanych ścieżek.
  // Musimy zwrócić 200 żeby GSC nie raportowało błędów w sitemap.
  if (pathname.startsWith("/produkt/")) {
    const response = await next();
    // Jeśli Cloudflare zwróciło 404 z SPA shell — zmień na 200
    if (response.status === 404) {
      return new Response(response.body, {
        status: 200,
        headers: response.headers,
      });
    }
    return response;
  }

  // Tylko dla stron kategorii i tylko dla botów
  if (!pathname.startsWith("/kategoria/") || !isBot(request)) {
    return next();
  }

  // Wyciągnij slug kategorii
  const catSlug = pathname.replace("/kategoria/", "").replace(/\/$/, "");
  if (!catSlug || catSlug.includes("/")) {
    return next();
  }

  // Sprawdź Cache API
  const cacheKey = new Request(`${url.origin}/prerender${pathname}`, request);
  const cache = caches.default;
  let cachedResponse = await cache.match(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Pobierz dane z Sanity
  const token = env.SANITY_TOKEN || "";
  const [category, products] = await Promise.all([
    fetchCategoryMeta(catSlug, token),
    fetchCategoryProducts(catSlug, token),
  ]);

  // Jeśli brak kategorii — passthrough do SPA (pokaże 404)
  if (!category) {
    return next();
  }

  // Generuj HTML
  const html = generateBotHTML(pathname, category, products);
  const response = new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=7200`,
      "X-Prerender": "bot",
      "X-Robots-Tag": "index, follow",
    },
  });

  // Zapisz w Cache API
  context.waitUntil(cache.put(cacheKey, response.clone()));

  return response;
}
