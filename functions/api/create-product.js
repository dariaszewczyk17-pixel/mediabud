/**
 * Cloudflare Pages Function — /api/create-product
 * POST { name, brand?, category?, unit?, ean?, description?, shortDescription?, isActive? }
 * Creates a new product document in Sanity and returns { success, productId }
 */

const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";
const API_VER    = "v2021-06-07";
const SANITY_MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/mutate/${DATASET}`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[ąàáâãäå]/g, "a").replace(/[ćčç]/g, "c").replace(/[ęèéêë]/g, "e")
    .replace(/[łľĺ]/g, "l").replace(/[ńñň]/g, "n").replace(/[óòôõö]/g, "o")
    .replace(/[śšş]/g, "s").replace(/[ťţ]/g, "t").replace(/[úùûüů]/g, "u")
    .replace(/[ýÿ]/g, "y").replace(/[źżž]/g, "z").replace(/[đ]/g, "d")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 96);
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: CORS });

  if (request.method !== "POST")
    return json({ error: "Metoda nieobsługiwana" }, 405);

  const token = env.SANITY_TOKEN;
  if (!token) return json({ error: "Brak SANITY_TOKEN" }, 500);

  let body;
  try { body = await request.json(); }
  catch { return json({ error: "Nieprawidłowy JSON" }, 400); }

  const { name, brandRef, categoryRef, unit, ean, description, shortDescription, isActive, imageAssetIds } = body;

  if (!name || !name.trim())
    return json({ error: "Nazwa produktu jest wymagana" }, 400);

  const slug = slugify(name);

  /* Build document */
  const doc = {
    _type: "product",
    name: name.trim(),
    slug: { _type: "slug", current: slug },
    unit: unit || "",
    ean: ean || "",
    description: description || "",
    shortDescription: shortDescription || "",
    isActive: isActive !== false,
  };

  /* Category reference */
  if (categoryRef) {
    doc.category = { _type: "reference", _ref: categoryRef };
  }

  /* Brand reference */
  if (brandRef) {
    doc.brand = { _type: "reference", _ref: brandRef };
  }

  /* Images */
  if (Array.isArray(imageAssetIds) && imageAssetIds.length > 0) {
    doc.images = imageAssetIds.map((assetId, i) => ({
      _type: "image",
      _key: `img${i}`,
      asset: { _type: "reference", _ref: assetId },
    }));
  }

  const mutation = { mutations: [{ create: doc }] };

  const res = await fetch(SANITY_MUTATE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mutation),
  });

  if (!res.ok) {
    const err = await res.text();
    return json({ error: "Błąd tworzenia w Sanity: " + err }, 502);
  }

  const result = await res.json();
  const createdId = result.results?.[0]?.id;

  return json({ success: true, productId: createdId, slug });
}
