/**
 * Cloudflare Pages Middleware — SEO meta injection + Prerendering dla crawlerów
 *
 * /produkt/* — wstrzykuje title, meta description, OG tags i Product JSON-LD
 *              do surowego HTML (widoczne bez renderowania JS).
 * /kategoria/* — canonical + BreadcrumbList dla WSZYSTKICH + prerender dla botów.
 */

const BOT_UA_REGEX = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|petalbot/i;

const PROJECT_ID = "nzcwegq7";
const DATASET = "production";
const API_VER = "v2021-06-07";
const SANITY_QUERY_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`;
const SITE_URL = "https://mediabud.pl";
const CACHE_TTL = 3600;

function isBot(request) {
  const ua = request.headers.get("user-agent") || "";
  return BOT_UA_REGEX.test(ua);
}

function esc(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function trunc(str, max) {
  if (!str) return "";
  const s = str.replace(/\s+/g, " ").trim();
  return s.length <= max ? s : s.slice(0, max - 3).trim() + "...";
}

async function fetchProduct(slug) {
  const q = encodeURIComponent(
    `*[_type=="product" && slug.current=="${slug.replace(/"/g, "")}"][0]{name,shortDescription,"category":category->name,"brand":brand->name,"imageUrl":images[0].asset->url}`
  );
  const res = await fetch(`${SANITY_QUERY_URL}?query=${q}`, {
    cf: { cacheTtl: CACHE_TTL, cacheEverything: true },
  });
  if (!res.ok) return null;
  const { result } = await res.json();
  return result || null;
}

async function fetchCategoryProducts(catSlug, token) {
  const query = encodeURIComponent(
    `*[_type == "product" && (category->slug.current == "${catSlug}" || rootCategory->slug.current == "${catSlug}") && !(name match "P-*")] | order(name asc) [0...48] {_id, name, "slug": slug.current, "brand": brand->name, "categorySlug": category->slug.current, "image": images[0].asset->url, shortDescription}`
  );
  const res = await fetch(`${SANITY_QUERY_URL}?query=${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) return [];
  const { result } = await res.json();
  return result || [];
}

async function fetchCategoryMeta(catSlug, token) {
  const query = encodeURIComponent(
    `*[_type == "category" && slug.current == "${catSlug}"][0]{name, description, "parentName": parent->name, "parentSlug": parent->slug.current}`
  );
  const res = await fetch(`${SANITY_QUERY_URL}?query=${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) return null;
  const { result } = await res.json();
  return result;
}

async function fetchCategoryCount(catSlug, token) {
  const query = encodeURIComponent(
    `count(*[_type == "product" && (category->slug.current == "${catSlug}" || rootCategory->slug.current == "${catSlug}") && !(name match "P-*")])`
  );
  const res = await fetch(`${SANITY_QUERY_URL}?query=${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cf: { cacheTtl: 3600, cacheEverything: true },
  });
  if (!res.ok) return null;
  const { result } = await res.json();
  return typeof result === "number" ? result : null;
}

function generateBotHTML(pathname, category, products) {
  const catName = category?.name || pathname.split("/").pop().replace(/-/g, " ");
  const catDesc = category?.description || `Materialy budowlane - ${catName}. Sprawdz oferte Media Bud.`;
  const canonical = `${SITE_URL}${pathname}`;

  const breadcrumbs = [
    { name: "Strona glowna", url: SITE_URL },
    ...(category?.parentName ? [{ name: category.parentName, url: `${SITE_URL}/kategoria/${category.parentSlug}` }] : []),
    { name: catName, url: canonical },
  ];

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((bc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: bc.name,
      item: bc.url,
    })),
  };

  const collectionLD = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${catName} - Media Bud`,
    description: catDesc,
    url: canonical,
    numberOfItems: products.length,
  };

  const productCards = products.map((p) => {
    const pUrl = `${SITE_URL}/produkt/${p.slug}`;
    return `<div class="product-card"><a href="${pUrl}">${p.image ? `<img src="${p.image}" alt="${esc(p.name)}" loading="lazy" width="250" height="188" />` : ""}<h3>${esc(p.name)}</h3>${p.brand ? `<span>${esc(p.brand)}</span>` : ""}${p.shortDescription ? `<p>${esc(p.shortDescription.substring(0, 100))}...</p>` : ""}</a></div>`;
  }).join("");

  const title = `${catName} - Materialy Budowlane | Media Bud Lublin`;

  return `<!DOCTYPE html><html lang="pl"><head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(catDesc.substring(0, 160))}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(catDesc.substring(0, 160))}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="Media Bud - Sklad Budowlany Lublin" />
  <script type="application/ld+json">${JSON.stringify(breadcrumbLD)}</script>
  <script type="application/ld+json">${JSON.stringify(collectionLD)}</script>
  <style>body{font-family:system-ui,sans-serif;margin:0;padding:20px;background:#0d0d0d;color:#fff}h1{font-size:1.5rem;border-bottom:2px solid #f81828;padding-bottom:8px}.products{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}.product-card{background:#141414;border:1px solid #222;border-radius:8px;padding:12px}.product-card a{color:#fff;text-decoration:none}.product-card h3{font-size:.9rem;margin:8px 0 4px}.product-card span{font-size:.75rem;color:#f81828}.product-card p{font-size:.8rem;color:#999;margin:4px 0 0}.product-card img{width:100%;height:auto;border-radius:4px;background:#1a1a1a}nav.breadcrumbs{font-size:.8rem;margin-bottom:16px}nav.breadcrumbs a{color:#f81828;text-decoration:none}nav.breadcrumbs span{color:#666;margin:0 4px}.count{color:#888;font-size:.85rem;margin-bottom:16px}</style>
</head><body>
  <nav class="breadcrumbs">${breadcrumbs.map((bc, i) => i < breadcrumbs.length - 1 ? `<a href="${bc.url}">${esc(bc.name)}</a><span>›</span>` : `<strong>${esc(bc.name)}</strong>`).join("")}</nav>
  <h1>${esc(catName)}</h1>
  <p class="count">${products.length} produktow</p>
  <div class="products">${productCards}</div>
  <footer style="margin-top:40px;padding-top:20px;border-top:1px solid #333;font-size:.75rem;color:#666;"><p>Media Bud - Sklad Budowlany | ul. Chemiczna 8d, 20-329 Lublin | tel: +48 533 553 344</p></footer>
</body></html>`;
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // ── /produkt/* — wstrzykuj meta tagi SEO dla WSZYSTKICH uzytkownikow ──
  if (pathname.startsWith("/produkt/")) {
    const slug = pathname.replace(/^\/produkt\/?/, "").replace(/\/$/, "");
    if (!slug) return next();

    let response = await next();
    // /produkt/* jest w _routes.json include → _redirects nie działa automatycznie → explicit SPA fallback
    if (response.status === 404) {
      try { response = await env.ASSETS.fetch(new Request(`${url.origin}/index.html`)); } catch (_e) {}
    }
    const status = 200;
    const ct = response.headers.get("content-type") || "";
    if (!ct.includes("text/html")) return next();

    try {
      const p = await fetchProduct(slug);
      if (!p || !p.name) {
        return new Response(response.body, { status, headers: response.headers });
      }

      const pageTitle = esc(`${p.name} - Media Bud | Sklad Budowlany Lublin`);
      const rawDesc = p.shortDescription
        ? trunc(p.shortDescription, 160)
        : `${p.name} dostepny w Media Bud - skladzie budowlanym w Lublinie. Zapytaj o oferte.`;
      const desc = esc(rawDesc);
      const canonical = `${SITE_URL}${pathname}`;
      const img = esc(p.imageUrl || "https://mediabud.pl/images/placeholder-product_2.png");

      const ld = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        description: rawDesc,
        url: canonical,
        image: [p.imageUrl || "https://mediabud.pl/images/placeholder-product_2.png"],
        offers: {
          "@type": "Offer",
          priceCurrency: "PLN",
          price: "0.00",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          url: canonical,
          seller: { "@type": "Organization", name: "Media Bud", url: "https://mediabud.pl" },
        },
      };
      if (p.brand) ld.brand = { "@type": "Brand", name: p.brand };
      if (p.category) ld.category = p.category;

      const inject = `
  <title>${pageTitle}</title>
  <meta name="description" content="${desc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="product" />
  <meta property="og:title" content="${pageTitle}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${img}" />
  <meta property="og:site_name" content="Media Bud" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${pageTitle}" />
  <meta name="twitter:description" content="${desc}" />
  <script type="application/ld+json">${JSON.stringify(ld)}</script>`;

      let html = await response.text();
      html = html
        .replace(/<title>[^<]*<\/title>/gi, "")
        .replace(/<meta\s+name="description"[^>]*>/gi, "")
        .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "")
        .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, "");
      html = html.replace("</head>", inject + "\n</head>");

      return new Response(html, {
        status,
        headers: {
          "content-type": "text/html;charset=UTF-8",
          "cache-control": "public, max-age=300, stale-while-revalidate=3600",
        },
      });
    } catch (e) {
      console.error("[meta-inject] error:", e);
      const response2 = await fetch(request);
      return new Response(response2.body, { status, headers: response2.headers });
    }
  }

  // ── /kategoria/* — canonical + BreadcrumbList dla wszystkich + prerender dla botów ──
  if (!pathname.startsWith("/kategoria/")) {
    const spaRes = await next();
    // next() zwraca 404 + body=index.html (przez _redirects rewrite) — konwertuj na 200
    if (spaRes.status === 404) {
      return new Response(spaRes.body, { status: 200, headers: spaRes.headers });
    }
    return spaRes;
  }

  const catSlug = pathname.replace("/kategoria/", "").replace(/\/$/, "");
  if (!catSlug) return next();

  // Ostatni segment dla fetch (np. /kategoria/tynki/tynk-silikonowy → "tynk-silikonowy")
  const leafSlug = catSlug.split("/").pop();
  const token = env.SANITY_TOKEN || "";

  // ── BOT: pełny prerender z cache ──
  if (isBot(request)) {
    const cacheKey = new Request(`${url.origin}/prerender${pathname}`, request);
    const cache = caches.default;
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) return cachedResponse;

    const [category, products] = await Promise.all([
      fetchCategoryMeta(leafSlug, token),
      fetchCategoryProducts(leafSlug, token),
    ]);

    if (!category) return next();

    const html = generateBotHTML(pathname, category, products);
    const response = new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=7200`,
        "X-Prerender": "bot",
      },
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  }

  // ── REGULAR USER: wstrzykuj canonical + BreadcrumbList + meta ──
  try {
    const [category, productCount] = await Promise.all([
      fetchCategoryMeta(leafSlug, token),
      fetchCategoryCount(leafSlug, token),
    ]);
    let response = await next();
    // /kategoria/* jest w _routes.json include → _redirects nie działa automatycznie → explicit SPA fallback
    if (response.status === 404) {
      try { response = await env.ASSETS.fetch(new Request(`${url.origin}/index.html`)); } catch (_e) {}
    }
    if (!category) return new Response(response.body, { status: 200, headers: { "content-type": "text/html;charset=UTF-8" } });

    const status = 200;
    const ct = response.headers.get("content-type") || "";
    if (!ct.includes("text/html")) return next();

    const canonical = `${SITE_URL}${pathname}`;
    const catName = category.name;
    const pageTitle = esc(`${catName} - Media Bud | Sklep Budowlany Lublin`);
    const count = productCount ?? 0;
    const rawDesc = category.description
      ? trunc(category.description, 160)
      : count > 0
        ? `${catName} - ${count} produktow w ofercie Media Bud. Sklep budowlany Lublin - zapytaj o cene.`
        : `Produkty kategorii ${catName} w ofercie Media Bud - skladu budowlanego w Lublinie. Zapytaj o oferte.`;
    const desc = esc(rawDesc);

    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: "Strona glowna", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Produkty", item: `${SITE_URL}/produkty` },
    ];
    let pos = 3;
    if (category.parentName) {
      breadcrumbItems.push({ "@type": "ListItem", position: pos++, name: category.parentName, item: `${SITE_URL}/kategoria/${category.parentSlug}` });
    }
    breadcrumbItems.push({ "@type": "ListItem", position: pos, name: catName, item: canonical });

    const ld = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    };

    const inject = `
  <title>${pageTitle}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${pageTitle}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="Media Bud" />
  <script type="application/ld+json">${JSON.stringify(ld)}</script>`;

    let html = await response.text();
    html = html
      .replace(/<title>[^<]*<\/title>/gi, "")
      .replace(/<meta\s+name="description"[^>]*>/gi, "")
      .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "");
    html = html.replace("</head>", inject + "\n</head>");

    return new Response(html, {
      status,
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "public, max-age=300, stale-while-revalidate=3600",
      },
    });
  } catch (e) {
    console.error("[cat-meta-inject] error:", e);
    return next();
  }
}
