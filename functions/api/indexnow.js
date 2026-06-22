/**
 * POST /api/indexnow
 * Zgłasza URL do Bing IndexNow API.
 * Body: { urls: string[] } | pusty = zgłoś kluczowe URL
 */
const KEY = "7d5eef87f5474e9898a36db5d69f1a76";
const SITE = "https://mediabud.pl";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

const PRIORITY_URLS = [
  "https://mediabud.pl/",
  "https://mediabud.pl/kontakt",
  "https://mediabud.pl/uslugi",
  "https://mediabud.pl/o-firmie",
  "https://mediabud.pl/blog",
  "https://mediabud.pl/marki",
  "https://mediabud.pl/produkty",
  "https://mediabud.pl/bestsellery",
  "https://mediabud.pl/kalkulator",
];

export async function onRequestPost(context) {
  const { request } = context;

  let urls = PRIORITY_URLS;
  try {
    const body = await request.json();
    if (Array.isArray(body.urls) && body.urls.length > 0) {
      urls = body.urls.slice(0, 100); // max 100 per request
    }
  } catch (_) { /* użyj domyślnych */ }

  const payload = {
    host: "mediabud.pl",
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  return new Response(JSON.stringify({
    status: r.status,
    submitted: urls.length,
    urls,
  }), {
    status: r.ok ? 200 : 502,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestGet() {
  return new Response(JSON.stringify({
    info: "POST /api/indexnow z body {urls:[...]} lub bez body = priorytetowe URL",
    key: KEY,
    keyFile: KEY_LOCATION,
  }), { headers: { "Content-Type": "application/json" } });
}
