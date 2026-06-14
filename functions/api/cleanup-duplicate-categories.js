/**
 * Cloudflare Pages Function — /api/cleanup-duplicate-categories
 * POST — usuwa zduplikowane rekordy kategorii z Sanity
 * v5: bez cat-l2-* (maja dzieci), batch 25, max ~12 subrequestow
 */

const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";
const API_VER    = "v2021-06-07";

const SANITY_MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/mutate/${DATASET}`;
const SANITY_QUERY_URL  = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`;

// Tylko bezpieczne leaf-node duplikaty (0 produktow, 0 dzieci)
// cat-l2-* WYKLUCZONE — maja podkategorie-dzieci
const DUPLICATE_IDS = [
  "cat-akcesoria-do-izolacji",
  "cat-artykuy-scierne","cat-gipsy",
  "cat-farby-do-drewna","cat-farby-do-metalu",
  "cat-farby-elewacyjne","cat-farby-pozostae",
  "cat-l3-folie-budowlane","cat-l3-folie-fundamentowe","category-folie-paroizolacyjne",
  "cat-gipsy-i-gadzie","cat-l3-grunty-do-posadzek","cat-l3-grunty-specjalistyczne",
  "cat-l3-grunty-uniwersalne","cat-hydroizolacje","cat-izolacje-budowlane",
  "cat-izolacje-techniczne","cat-l3-kleje-do-drewna","cat-kleje-welna",
  "cat-kleje-do-ween","cat-koki-i-wkrety-uniwersalne","cat-komunikacja-dachowa",
  "category-kotwy-chemiczne","cat-l3-kotwy-montazowe","cat-materiay-konstrukcyjne",
  "cat-mocowania-do-suchej-zabudowy","cat-narozniki-i-listwy","cat-narzedzia-malarskie",
  "cat-okna-dachowe-i-akcesoria","cat-panele-scienne-i-tapety",
  "cat-piany-montazowe","cat-pytki-ceramiczne","cat-pytki-dekoracyjne",
  "cat-pokrycia-dachowe","cat-powoki-epoksydowe","cat-profile-do-suchej-zabudowy",
  "cat-schody-i-akcesoria-strychowe","cat-systemy-kominowe",
  "cat-wieszaki-do-suchej-zabudowy",
  "cat-zaprawy","cat-listwy-przypodogowe",
  "cat-l3-tynki-specjalne","cat-l3-tynki-wapienne","cat-l3-wkrety-do-metalu",
  "cat-pyty","cat-pyty-xps","category-rozpuszczalniki","category-spoiny",
  "cat-tynki-cem","cat-weny",
];

// Produkty z tymi kategoriami wymagaja przepiecia przed usunieciem
const REASSIGN_MAP = {
  "category-grunty-pod-tynki":           "cat-grunty-pod-tynki",
  "cat-l3-kleje-do-glazury":             "cat-kleje-do-glazury",
  "cat-kleje-glaz":                      "cat-kleje-do-glazury",
  "cat-l3-kleje-do-styropianu-i-styrod": "cat-kleje-do-styropianu-i-styroduru",
  "cat-kleje-mont":                      "cat-kleje-montazowe",
  "cat-l2-narzedzia-budowlane":          "cat-narzedzia-budowlane",
  "cat-l3-masy-bitumiczne-gruntujace":   "cat-masy-bitumiczne-gruntujace",
  "cat-l3-tynki-elewacyjne":             "cat-tynki-elewacyjne",
  "cat-tynki-gip":                       "cat-tynki-gipsowe",
};

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const token = env.SANITY_TOKEN;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (!token) return json({ error: "Brak SANITY_TOKEN" }, 500);
  if (request.method !== "POST") return json({ error: "Tylko POST" }, 405);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  try {
    // Krok 1: Przepnij produkty ze starych kategorii na kanoniczne
    let reassigned = 0;
    for (const [oldId, newId] of Object.entries(REASSIGN_MAP)) {
      const q = encodeURIComponent(`*[_type=="product" && category._ref=="${oldId}"]{_id}`);
      const qRes = await fetch(`${SANITY_QUERY_URL}?query=${q}`, { headers });
      const prods = (await qRes.json()).result ?? [];
      if (prods.length === 0) continue;
      const mutations = prods.map(p => ({
        patch: { id: p._id, set: { category: { _type: "reference", _ref: newId } } }
      }));
      const mRes = await fetch(SANITY_MUTATE_URL, { method: "POST", headers, body: JSON.stringify({ mutations }) });
      if (!mRes.ok) return json({ error: `Blad przepiecia ${oldId}`, details: await mRes.json() }, 500);
      reassigned += prods.length;
    }

    // Krok 2: Usun duplikaty w batchach po 25 (max ~3 batche = 3 subrequesty)
    const allToDelete = [...DUPLICATE_IDS, ...Object.keys(REASSIGN_MAP)];
    const BATCH = 25;
    const results = [];

    for (let i = 0; i < allToDelete.length; i += BATCH) {
      const batch = allToDelete.slice(i, i + BATCH);
      const mutations = batch.map(id => ({ delete: { id } }));
      const res = await fetch(SANITY_MUTATE_URL, { method: "POST", headers, body: JSON.stringify({ mutations }) });
      const data = await res.json();
      results.push({ batch: i / BATCH + 1, ok: res.ok, count: batch.length, ids: batch });
      if (!res.ok) return json({ error: "Blad delete", details: data, results }, 500);
    }

    return json({
      success: true,
      message: `Przepieto ${reassigned} produktow. Usunieto ${allToDelete.length} zduplikowanych kategorii.`,
      reassigned,
      deleted: allToDelete.length,
      batches: results,
      note: "cat-l2-* pominiete (maja podkategorie wymagajace odrebnej migracji dzieci)",
    });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
