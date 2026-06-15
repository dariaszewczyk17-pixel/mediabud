/**
 * Cloudflare Pages Function — /api/products
 * GET  ?page=1&limit=25&search=...&category=...  → lista produktów z Sanity
 * PATCH body: { id, fields: { name?, description?, brand?, price? } } → mutacja Sanity
 */

const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";
const API_VER    = "v2021-06-07";

const SANITY_QUERY_URL  = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`;
const SANITY_MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/mutate/${DATASET}`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

/* ── GET /api/products ─────────────────────────────────────────────────── */
async function handleGet(request, env) {
  const token = env.SANITY_TOKEN;
  if (!token) return json({ error: "Brak SANITY_TOKEN w zmiennych środowiskowych" }, 500);

  const url    = new URL(request.url);
  const page   = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit  = Math.min(50, parseInt(url.searchParams.get("limit") || "25"));
  const search  = (url.searchParams.get("search") || "").trim();
  const cat     = (url.searchParams.get("category") || "").trim();
  const brand   = (url.searchParams.get("brand") || "").trim();
  const sortBy  = (url.searchParams.get("sort") || "name").trim();
  const sortDir = (url.searchParams.get("dir") || "asc").trim() === "desc" ? "desc" : "asc";
  const offset  = (page - 1) * limit;

  /* Budujemy filtr GROQ */
  let filter = `_type == "product"`;
  if (search) filter += ` && (name match "*${search}*" || brand->name match "*${search}*")`;
  if (cat)    filter += ` && category->slug.current == "${cat}"`;
  if (brand)  filter += ` && brand->name == "${brand}"`;

  /* Sortowanie */
  const SORT_MAP = { name: "name", brand: "brand->name", category: "category->name" };
  const sortField = SORT_MAP[sortBy] || "name";
  const sortExpr  = `${sortField} ${sortDir}`;

  const countQuery   = encodeURIComponent(`count(*[${filter}])`);
  const listQuery    = encodeURIComponent(
    `*[${filter}] | order(${sortExpr}) [${offset}...${offset + limit}] {
      _id, name, slug,
      "brand": brand->name,
      "category": category->{ name, "slug": slug.current },
      description, shortDescription,
      "images": images[0..0][].asset->url,
      ean, unit
    }`
  );

  const [countRes, listRes] = await Promise.all([
    fetch(`${SANITY_QUERY_URL}?query=${countQuery}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${SANITY_QUERY_URL}?query=${listQuery}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  if (!countRes.ok || !listRes.ok) {
    return json({ error: "Błąd zapytania Sanity", status: listRes.status }, 502);
  }

  const { result: total }    = await countRes.json();
  const { result: products } = await listRes.json();

  return json({
    products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

/* ── PATCH /api/products ───────────────────────────────────────────────── */
async function handlePatch(request, env) {
  const token = env.SANITY_TOKEN;
  if (!token) return json({ error: "Brak SANITY_TOKEN" }, 500);

  let body;
  try { body = await request.json(); }
  catch { return json({ error: "Nieprawidłowy JSON" }, 400); }

  const { id, fields } = body;
  if (!id || !fields || typeof fields !== "object")
    return json({ error: "Wymagane pola: id, fields" }, 400);

  /* Dozwolone pola do edycji */
  const ALLOWED = ["name", "description", "shortDescription", "brand", "unit", "ean"];
  const patch   = {};
  for (const key of ALLOWED) {
    if (key in fields) patch[key] = fields[key];
  }
  if (Object.keys(patch).length === 0)
    return json({ error: "Brak prawidłowych pól do aktualizacji" }, 400);

  const mutation = {
    mutations: [{ patch: { id, set: patch } }],
  };

  const res = await fetch(SANITY_MUTATE_URL, {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      Authorization:   `Bearer ${token}`,
    },
    body: JSON.stringify(mutation),
  });

  if (!res.ok) {
    const err = await res.text();
    return json({ error: "Błąd Sanity Mutations API", detail: err }, 502);
  }

  const result = await res.json();
  return json({ success: true, result });
}

/* ── Router ────────────────────────────────────────────────────────────── */
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: CORS });

  if (request.method === "GET")    return handleGet(request, env);
  if (request.method === "PATCH")  return handlePatch(request, env);

  return json({ error: "Metoda nieobsługiwana" }, 405);
}
