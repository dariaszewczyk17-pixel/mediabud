/**
 * Cloudflare Pages Function — /api/product/:id
 * GET   → pełne dane produktu z Sanity
 * PATCH → aktualizacja (text fields + images + category/brand refs + isActive)
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
        _id, name, slug, ean, unit,
        description, shortDescription, specs, isActive,
        "brand": brand->name,
        "brandRef": brand._ref,
        "category": category->{ _id, name, "slug": slug.current },
        "categoryRef": category._ref,
        "images": images[]{
          _key,
          "assetId": asset._ref,
          "url": asset->url
        }
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

    const patch = {};

    /* Simple text/scalar fields */
    const TEXT_FIELDS = ["name", "description", "shortDescription", "unit", "ean", "specs"];
    for (const key of TEXT_FIELDS) {
      if (key in body) patch[key] = body[key];
    }

    /* isActive (boolean) */
    if ("isActive" in body) {
      patch.isActive = !!body.isActive;
    }

    /* Category reference */
    if ("categoryRef" in body) {
      if (body.categoryRef) {
        patch.category = { _type: "reference", _ref: body.categoryRef };
      } else {
        /* unset category — handled via unset below */
      }
    }

    /* Brand reference */
    if ("brandRef" in body) {
      if (body.brandRef) {
        patch.brand = { _type: "reference", _ref: body.brandRef };
      }
    }

    /* Images — full replacement of images array */
    if ("images" in body && Array.isArray(body.images)) {
      patch.images = body.images.map((img, i) => ({
        _type: "image",
        _key: img._key || `img${Date.now()}_${i}`,
        asset: { _type: "reference", _ref: img.assetId },
      }));
    }

    /* Build mutations */
    const mutations = [];

    /* Unset fields */
    const unsetFields = [];
    if ("categoryRef" in body && !body.categoryRef) unsetFields.push("category");
    if ("brandRef" in body && !body.brandRef) unsetFields.push("brand");

    if (Object.keys(patch).length > 0) {
      mutations.push({ patch: { id, set: patch } });
    }
    if (unsetFields.length > 0) {
      mutations.push({ patch: { id, unset: unsetFields } });
    }

    if (mutations.length === 0)
      return json({ error: "Brak prawidłowych pól" }, 400);

    const res = await fetch(SANITY_MUTATE_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ mutations }),
    });

    if (!res.ok) {
      const err = await res.text();
      return json({ error: "Błąd zapisu Sanity: " + err }, 502);
    }

    return json({ success: true });
  }

  return json({ error: "Metoda nieobsługiwana" }, 405);
}
