/**
 * Cloudflare Pages Function — fallback dla tras SPA.
 *
 * Bezpośrednie wejścia na trasy BrowserRouter (/kategoria/:slug, /produkty,
 * /blog, /marki, /kontakt itd.) muszą zwrócić index.html aplikacji Media Bud,
 * a nie platformowe website-not-found. API pozostaje obsługiwane przez
 * dedykowane funkcje w functions/api/*.
 */

const SPA_ROUTES = [
  "/kategoria",
  "/produkty",
  "/produkt",
  "/blog",
  "/kontakt",
  "/o-firmie",
  "/uslugi",
  "/realizacje",
  "/szukaj",
  "/polityka-prywatnosci",
  "/rodo",
  "/regulamin",
  "/sitemap",
  "/kalkulator",
  "/marki",
  "/bestsellery",
  "/admin",
];

function isSpaRoute(pathname) {
  return SPA_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (!isSpaRoute(url.pathname)) {
    return env.ASSETS.fetch(request);
  }

  const indexUrl = new URL(request.url);
  indexUrl.pathname = "/index.html";
  indexUrl.search = "";

  const response = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
  return new Response(response.body, {
    status: 200,
    headers: {
      ...Object.fromEntries(response.headers),
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
