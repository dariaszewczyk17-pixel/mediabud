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
    `*[_type=="product" && slug.current=="${slug.replace(/"/g, "")}"][0]{name,shortDescription,description,ean,"category":category->name,"categorySlug":category->slug.current,"brand":brand->name,"imageUrl":images[0].asset->url,priceMin,priceMax,inStock,"specs":specs[]{key,value}}`
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
    `*[_type == "category" && slug.current == "${catSlug}"][0]{name, description, "parentName": parent->name, "parentSlug": parent->slug.current, "grandparentName": parent->parent->name, "grandparentSlug": parent->parent->slug.current, "greatgrandparentName": parent->parent->parent->name, "greatgrandparentSlug": parent->parent->parent->slug.current}`
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
    ...(category?.greatgrandparentName ? [{ name: category.greatgrandparentName, url: `${SITE_URL}/kategoria/${category.greatgrandparentSlug}` }] : []),
    ...(category?.grandparentName ? [{ name: category.grandparentName, url: `${SITE_URL}/kategoria/${category.grandparentSlug}` }] : []),
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
    return "<div class=\"product-card\"><a href=\"" + pUrl + "\">" + (p.image ? "<img src=\"" + p.image + "\" alt=\"" + esc(p.name) + "\" loading=\"lazy\" width=\"250\" height=\"188\" />" : "") + "<h3>" + esc(p.name) + "</h3>" + (p.brand ? "<span>" + esc(p.brand) + "</span>" : "") + (p.shortDescription ? "<p>" + esc(p.shortDescription.substring(0, 100)) + "...</p>" : "") + "</a></div>";
  }).join("");

  const title = `${catName} Lublin \u2013 ceny, dostawa 24h | Media Bud`;

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
  <nav class="breadcrumbs">${breadcrumbs.map((bc, i) => i < breadcrumbs.length - 1 ? "<a href=\"" + bc.url + "\">" + esc(bc.name) + "</a><span>›</span>" : "<strong>" + esc(bc.name) + "</strong>").join("")}</nav>
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

  // Trwałe przekierowania dawnych adresów wykrytych w Google Search Console.
  const legacyCategoryRedirects = {
    "/kategoria/plyty-do-suchej-zabudowy": "/kategoria/sucha-zabudowa/plyty-do-suchej-zabudowy",
    "/kategoria/rolety-wewnetrzne": "/kategoria/dachy/okna-dachowe/rolety-wewnetrzne",
    "/kategoria/rolety-zewnetrzne": "/kategoria/dachy/okna-dachowe/rolety-zewnetrzne",
    "/kategoria/okna-wylazowe": "/kategoria/dachy/okna-dachowe/okna-wylazowe",
  };
  const legacyCategoryTarget = legacyCategoryRedirects[pathname.replace(/\/$/, "")];
  if (legacyCategoryTarget) return Response.redirect(`${SITE_URL}${legacyCategoryTarget}/`, 301);

  if (pathname === "/szukaj") {
    const legacyBrandRedirects = {
      alpol: "alpol", sika: "sika", sopro: "sopro", koramic: "koramic", marazzi: "marazzi",
      velux: "velux", rockwool: "rockwool", bauder: "bauder", siniat: "siniat-etex-marki",
      protech: "protech", blue: "blue-dolphin", kreisel: "kreisel", dolina: "dolina-nidy",
      weber: "weber", ecophon: "ecophon",
    };
    const legacyBrand = (url.searchParams.get("brand") || "").trim().toLowerCase();
    if (legacyBrandRedirects[legacyBrand]) {
      return Response.redirect(`${SITE_URL}/marki/${legacyBrandRedirects[legacyBrand]}`, 301);
    }
  }

  // ── /produkt/* — prerender dla botów + inject meta dla użytkowników ──
  if (pathname.startsWith("/produkt/")) {
    const slug = pathname.replace(/^\/produkt\/?/, "").replace(/\/$/, "");
    if (!slug) return next();

    // ── BOT: pełny prerender HTML (Googlebot widzi treść bez JS) ──
    if (isBot(request)) {
      const cacheKey = new Request(`${url.origin}/prerender${pathname}`, request);
      const cache = caches.default;
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) return cachedResponse;

      const p = await fetchProduct(slug);
      if (p && p.name) {
        const canonicalPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
        const canonical = `${SITE_URL}${canonicalPath}`;
        const pageTitle = esc(`${p.name} - Media Bud | Sklad Budowlany Lublin`);
        const rawDesc = p.shortDescription
          ? trunc(p.shortDescription, 160)
          : `${p.name} dostepny w Media Bud - skladzie budowlanym w Lublinie. Zapytaj o oferte.`;
        const img = p.imageUrl || "https://mediabud.pl/images/placeholder-product_2.png";

        const ld = Number(p.priceMin) > 0 ? {
          "@context": "https://schema.org", "@type": "Product",
          name: p.name,
          description: p.description ? trunc(p.description.replace(/#{1,6}\s?/g, "").replace(/\n+/g, " "), 500) : rawDesc,
          url: canonical,
          image: [img],
          sku: slug,
        } : null;

        if (ld) ld.offers = Number(p.priceMax) > Number(p.priceMin)
          ? { "@type": "AggregateOffer", priceCurrency: "PLN", lowPrice: Number(p.priceMin), highPrice: Number(p.priceMax), url: canonical, ...(p.inStock != null ? { availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } : {}) }
          : { "@type": "Offer", priceCurrency: "PLN", price: Number(p.priceMin), url: canonical, ...(p.inStock != null ? { availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } : {}), seller: { "@type": "Organization", name: "Media Bud" } };

        // Brand
        if (ld && p.brand) ld.brand = { "@type": "Brand", name: p.brand };
        // Kategoria tekstowa
        if (ld && p.category) ld.category = p.category;
        // EAN/GTIN13
        if (ld && p.ean) ld.gtin13 = p.ean;
        // Parametry techniczne jako PropertyValue
        if (ld && p.specs && p.specs.length > 0) {
          ld.additionalProperty = p.specs
            .filter(s => s.key && s.value)
            .map(s => ({ "@type": "PropertyValue", name: s.key, value: s.value }));
        }

        const breadcrumbLD = {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Strona glowna", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Produkty", item: `${SITE_URL}/produkty` },
            ...(p.category && p.categorySlug ? [{ "@type": "ListItem", position: 3, name: p.category, item: `${SITE_URL}/kategoria/${p.categorySlug}` }] : []),
            { "@type": "ListItem", position: p.category ? 4 : 3, name: p.name, item: canonical },
          ],
        };

        const botHtml = `<!DOCTYPE html><html lang="pl"><head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <meta name="description" content="${esc(rawDesc)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="product" />
  <meta property="og:title" content="${pageTitle}" />
  <meta property="og:description" content="${esc(rawDesc)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${esc(img)}" />
  <meta property="og:site_name" content="Media Bud" />
  ${ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : ""}
  <script type="application/ld+json">${JSON.stringify(breadcrumbLD)}</script>
  <style>body{font-family:system-ui,sans-serif;margin:0;padding:20px;background:#0d0d0d;color:#fff}h1{font-size:1.4rem;border-bottom:2px solid #f81828;padding-bottom:8px}.product-img{max-width:400px;height:auto;border-radius:8px;background:#141414}.desc{color:#aaa;font-size:.9rem;margin:12px 0}.meta{font-size:.8rem;color:#888}nav.breadcrumbs{font-size:.8rem;margin-bottom:16px}nav.breadcrumbs a{color:#f81828;text-decoration:none}nav.breadcrumbs span{color:#666;margin:0 4px}</style>
</head><body>
  <nav class="breadcrumbs"><a href="${SITE_URL}">Strona glowna</a><span>›</span><a href="${SITE_URL}/produkty">Produkty</a>${p.category ? "<span>›</span><span>" + esc(p.category) + "</span>" : ""}<span>›</span><strong>${esc(p.name)}</strong></nav>
  <h1>${esc(p.name)}</h1>
  ${img !== "https://mediabud.pl/images/placeholder-product_2.png" ? "<img src=\"" + esc(img) + "\" alt=\"" + esc(p.name) + "\" width=\"400\" height=\"300\" loading=\"eager\" />" : ""}
  ${p.brand ? "<p class=\"meta\">Marka: <strong>" + esc(p.brand) + "</strong></p>" : ""}
  ${rawDesc ? "<p class=\"desc\">" + esc(rawDesc) + "</p>" : ""}
  <p class="meta">Zapytaj o cene: <a href="tel:+48533553344" style="color:#f81828">+48 533 553 344</a></p>
  <footer style="margin-top:40px;padding-top:20px;border-top:1px solid #333;font-size:.75rem;color:#666;"><p>Media Bud - Sklad Budowlany | ul. Chemiczna 8d, 20-329 Lublin | tel: +48 533 553 344</p></footer>
</body></html>`;

        const botResponse = new Response(botHtml, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=7200`,
            "X-Prerender": "bot-product",
          },
        });
        context.waitUntil(cache.put(cacheKey, botResponse.clone()));
        return botResponse;
      }
    }

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

      // Canonical bez trailing slash (zgodny z sitemap)
      const canonicalPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
      const canonical = `${SITE_URL}${canonicalPath}`;

      if (!p || !p.name) {
        // Brak danych — wstrzyknij przynajmniej poprawny canonical, usuń globalny z index.html
        let html = await response.text();
        html = html
          .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
          .replace(/<meta\s+property="og:url"[^>]*>/gi, "");
        html = html.replace("</head>", `  <link rel="canonical" href="${canonical}" />\n  <meta property="og:url" content="${canonical}" />\n</head>`);
        return new Response(html, { status, headers: { "content-type": "text/html;charset=UTF-8" } });
      }

      const pageTitle = esc(`${p.name} - Media Bud | Sklad Budowlany Lublin`);
      const rawDesc = p.shortDescription
        ? trunc(p.shortDescription, 160)
        : `${p.name} dostepny w Media Bud - skladzie budowlanym w Lublinie. Zapytaj o oferte.`;
      const desc = esc(rawDesc);
      const img = esc(p.imageUrl || "https://mediabud.pl/images/placeholder-product_2.png");

      const ld = Number(p.priceMin) > 0 ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        description: rawDesc,
        url: canonical,
        image: [p.imageUrl || "https://mediabud.pl/images/placeholder-product_2.png"],
      } : null;
      if (ld) ld.offers = Number(p.priceMax) > Number(p.priceMin)
        ? { "@type": "AggregateOffer", priceCurrency: "PLN", lowPrice: Number(p.priceMin), highPrice: Number(p.priceMax), url: canonical, ...(p.inStock != null ? { availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } : {}) }
        : { "@type": "Offer", priceCurrency: "PLN", price: Number(p.priceMin), url: canonical, ...(p.inStock != null ? { availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } : {}), seller: { "@type": "Organization", name: "Media Bud" } };
      if (ld && p.brand) ld.brand = { "@type": "Brand", name: p.brand };
      if (ld && p.category) ld.category = p.category;

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
  ${ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : ""}`;

      let html = await response.text();
      html = html
        .replace(/<title>[^<]*<\/title>/gi, "")
        .replace(/<meta\s+name="description"[^>]*>/gi, "")
        .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
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
    // _redirects serwuje index.html z błędnym statusem 404 gdy plik statyczny nie istnieje.
    // Dla WSZYSTKICH SPA tras: strippuj globalny canonical (mediabud.pl/) i wstrzyknij właściwy.
    const spaHtmlRaw = spaRes.status === 404 || (spaRes.headers.get("content-type") || "").includes("text/html");
    if (spaHtmlRaw) {
      try {
        // Canonical bez trailing slash; strona główna = SITE_URL + "/"
        const cleanPath = pathname.replace(/\/$/, "") || "/";
        const canonicalUrl = cleanPath === "/" ? SITE_URL + "/" : `${SITE_URL}${cleanPath}`;
        let html = await spaRes.text();
        html = html
          .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
          .replace(/<meta\s+property="og:url"[^>]*>/gi, "");
        html = html.replace(
          "</head>",
          `  <link rel="canonical" href="${canonicalUrl}" />\n  <meta property="og:url" content="${canonicalUrl}" />\n</head>`
        );
        return new Response(html, {
          status: 200,
          headers: new Headers({
            "content-type": "text/html;charset=UTF-8",
            "cache-control": "no-cache, no-store, must-revalidate",
            "x-spa-route": "1",
          }),
        });
      } catch (_e) {
        return spaRes;
      }
    }
    return spaRes;
  }

  // Strip trailing slash — 308 jest z Cloudflare, my serwujemy canonical bez trailing slash
  const canonicalPathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const catSlug = canonicalPathname.replace("/kategoria/", "").replace(/\/$/, "");
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

    const canonical = `${SITE_URL}${canonicalPathname}`;
    const catName = category.name;
    // Title SEO: {catName} Lublin – ceny, dostawa 24h | Media Bud
    const pageTitle = esc(`${catName} Lublin \u2013 ceny, dostawa 24h | Media Bud`);
    const count = productCount ?? 0;
    const rawDesc = category.description
      ? trunc(category.description, 160)
      : count > 0
        ? `Kup ${catName.toLowerCase()} w Lublinie. ${count} produktow w ofercie Media Bud. Dostawa na plac budowy, doradztwo techniczne gratis. Ul. Chemiczna 8d Lublin.`
        : `${catName} w ofercie Media Bud - skladu budowlanego w Lublinie. Szeroki wybor, konkurencyjne ceny, dostawa 24h. Zapytaj o oferte.`;
    const desc = esc(rawDesc);

    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: "Strona glowna", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Produkty", item: `${SITE_URL}/produkty` },
    ];
    let pos = 3;
    // Pelny lancuch: greatgrandparent (L1 dla L4) → grandparent (L1/L2) → parent → leaf
    if (category.greatgrandparentName) {
      breadcrumbItems.push({ "@type": "ListItem", position: pos++, name: category.greatgrandparentName, item: `${SITE_URL}/kategoria/${category.greatgrandparentSlug}` });
    }
    if (category.grandparentName) {
      breadcrumbItems.push({ "@type": "ListItem", position: pos++, name: category.grandparentName, item: `${SITE_URL}/kategoria/${category.grandparentSlug}` });
    }
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
      .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
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
