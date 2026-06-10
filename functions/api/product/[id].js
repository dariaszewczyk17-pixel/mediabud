/**
 * Cloudflare Pages Function — /api/product/:id
 * GET   → pełne dane produktu z Sanity
 * PATCH → aktualizacja (alias do /api/products PATCH z id z URL)
 */

const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";
const API_VER    = "v2021-06-07";

const SANITY_QUERY_URL  = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`;
const SANITY_MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/mutate/${DATASET}`;

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const token = env.SANITY_TOKEN;
  const id    = params.id;

  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: CORS });

  if (!token) return json({ error: "Brak SANITY_TOKEN" }, 500);
  if (!id)    return json({ error: "Brak id produktu" }, 400);

  /* ── GET — pobierz pełne dane produktu ─── */
  if (request.method === "GET") {
    const query = encodeURIComponent(
      `*[_type == "product" && _id == "${id}"][0] {
        _id, name, slug, brand, ean, unit,
        description, shortDescription,
        "category": category->{ name, "slug": slug.current },
        "images": images[].asset->url
      }`
    );
    const res = await fetch(`${SANITY_QUERY_URL}?query=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return json({ error: "Błąd Sanity" }, 502);
    const { result } = await res.json();
    if (!result) return json({ error: "Produkt nie znaleziony" }, 404);
    return json({ product: result });
  }

  /* ── PATCH — aktualizuj produkt ─── */
  if (request.method === "PATCH") {
    let body;
    try { body = await request.json(); }
    catch { return json({ error: "Nieprawidłowy JSON" }, 400); }

    const ALLOWED = ["name", "description", "shortDescription", "brand", "unit", "ean"];
    const patch   = {};
    for (const key of ALLOWED) {
      if (key in body) patch[key] = body[key];
    }
    if (Object.keys(patch).length === 0)
      return json({ error: "Brak prawidłowych pól" }, 400);

    const res = await fetch(SANITY_MUTATE_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ mutations: [{ patch: { id, set: patch } }] }),
    });
    if (!res.ok) return json({ error: "Błąd zapisu Sanity" }, 502);
    return json({ success: true });
  }

  return json({ error: "Metoda nieobsługiwana" }, 405);
}
