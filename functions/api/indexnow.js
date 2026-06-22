/**
 * POST /api/indexnow  →  zgłasza URL do Bing IndexNow
 * GET  /api/indexnow  →  info + status
 *
 * Body (opcjonalne): { "urls": ["https://..."] }
 * Bez body → zgłasza PRIORITY_URLS (9 kluczowych stron)
 */
const KEY          = "7d5eef87f5474e9898a36db5d69f1a76";
const SITE         = "https://mediabud.pl";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const INDEXNOW_API = "https://api.indexnow.org/indexnow";

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

async function submitToIndexNow(urls) {
  const payload = {
    host: "mediabud.pl",
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls.slice(0, 100),
  };
  const r = await fetch(INDEXNOW_API, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return { bingStatus: r.status, bingOk: r.ok };
}

export async function onRequestPost(context) {
  const { request } = context;
  let urls = [...PRIORITY_URLS];
  try {
    const body = await request.json();
    if (Array.isArray(body?.urls) && body.urls.length > 0) {
      urls = body.urls.slice(0, 100);
    }
  } catch (_) { /* użyj domyślnych */ }

  try {
    const { bingStatus, bingOk } = await submitToIndexNow(urls);
    return new Response(JSON.stringify({
      ok: bingOk,
      bingStatus,
      submitted: urls.length,
      urls,
    }), {
      status: bingOk ? 200 : 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      ok: false,
      error: String(err),
      note: "Bing IndexNow fetch failed from CF Worker. Submit manually via curl.",
      curlExample: `curl -X POST https://api.indexnow.org/indexnow -H 'Content-Type: application/json' -d '{"host":"mediabud.pl","key":"${KEY}","keyLocation":"${KEY_LOCATION}","urlList":${JSON.stringify(urls)}}'`,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
}

export async function onRequestGet() {
  return new Response(JSON.stringify({
    info: "POST /api/indexnow — zgłoś URL do Bing IndexNow",
    key: KEY,
    keyFile: KEY_LOCATION,
    priorityUrls: PRIORITY_URLS,
    usage: 'POST /api/indexnow z body {"urls":["https://mediabud.pl/..."]} lub pusty body = priorytetowe URL',
  }), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
