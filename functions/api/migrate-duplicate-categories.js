/**
 * POST /api/migrate-duplicate-categories
 * Migruje zduplikowane kategorie: przepina dzieci i produkty na kanoniczne ID, usuwa duplikat.
 */
const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";
const API_VER    = "v2021-06-07";
const MUTATE     = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/mutate/${DATASET}`;
const QUERY_URL  = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`;

const MIGRATION_PAIRS = [
  { dup: "cat-weny",                can: "cat-welny" },
  { dup: "cat-hydroizolacje",       can: "cat-hydro" },
  { dup: "cat-izolacje-budowlane",  can: "cat-l2-izolacje-budowlane" },
  { dup: "cat-izolacje-techniczne", can: "cat-l2-izolacje-techniczne" },
  { dup: "cat-akcesoria-do-izolacji", can: "cat-l2-akcesoria-do-izolacji" },
  { dup: "cat-l2-styropiany",       can: "cat-styropiany" },
];

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonRes(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json", ...CORS },
  });
}

async function sanityQuery(query, headers) {
  const res = await fetch(`${QUERY_URL}?query=${encodeURIComponent(query)}`, { headers });
  return (await res.json()).result ?? [];
}

async function sanityMutate(mutations, headers) {
  const res = await fetch(MUTATE, {
    method: "POST", headers, body: JSON.stringify({ mutations }),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function onRequest({ request, env }) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (!env.SANITY_TOKEN) return jsonRes({ error: "Brak SANITY_TOKEN" }, 500);
  if (request.method !== "POST") return jsonRes({ error: "Tylko POST" }, 405);

  const h = { "Content-Type": "application/json", Authorization: `Bearer ${env.SANITY_TOKEN}` };
  const log = [];

  for (const { dup, can } of MIGRATION_PAIRS) {
    const entry = { dup, can, childCats: 0, products: 0, deleted: false, error: null };

    // 1. Przepnij pod-kategorie (parent._ref == dup → can)
    const childCats = await sanityQuery(`*[_type=="category" && parent._ref=="${dup}"]{_id}`, h);
    if (childCats.length > 0) {
      const r = await sanityMutate(childCats.map(c => ({
        patch: { id: c._id, set: { parent: { _type: "reference", _ref: can } } }
      })), h);
      if (!r.ok) { entry.error = `childCats patch failed`; log.push(entry); continue; }
      entry.childCats = childCats.length;
    }

    // 2. Przepnij produkty (category._ref == dup → can)
    const prods = await sanityQuery(`*[_type=="product" && category._ref=="${dup}"]{_id}`, h);
    if (prods.length > 0) {
      const r = await sanityMutate(prods.map(p => ({
        patch: { id: p._id, set: { category: { _type: "reference", _ref: can } } }
      })), h);
      if (!r.ok) { entry.error = `products patch failed`; log.push(entry); continue; }
      entry.products = prods.length;
    }

    // 3. Usun duplikat
    const del = await sanityMutate([{ delete: { id: dup } }], h);
    if (del.ok) {
      entry.deleted = true;
    } else {
      entry.error = `delete failed: ${JSON.stringify(del.data).slice(0, 200)}`;
    }

    log.push(entry);
  }

  const deleted = log.filter(e => e.deleted).length;
  const errors  = log.filter(e => e.error);
  return jsonRes({
    success: errors.length === 0,
    message: `Zmigrowalo: ${deleted}/${MIGRATION_PAIRS.length} par. Bledy: ${errors.length}.`,
    log,
  });
}
