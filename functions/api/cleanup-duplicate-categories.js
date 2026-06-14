/**
 * Cloudflare Pages Function — /api/cleanup-duplicate-categories
 * POST → usuwa zduplikowane rekordy kategorii z Sanity
 */

const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";
const API_VER    = "v2021-06-07";
const SANITY_MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/mutate/${DATASET}`;

const DUPLICATE_IDS = [
  "cat-gipsy-i-gadzie","cat-kotwy-chemiczne","cat-piany-montazowe",
  "cat-powoki-epoksydowe","cat-spoiny","cat-uszczelniacze-i-silikony",
  "cat-zaprawy","cat-komunikacja-dachowa","cat-okna-dachowe-i-akcesoria",
  "cat-pokrycia-dachowe","cat-zabezpieczenia-przeciwsniegowe",
  "cat-kotwy-montazowe","cat-koki-i-wkrety-uniwersalne","cat-wkrety-do-metalu",
  "cat-bazy-i-koloranty","cat-farby-do-drewna","cat-farby-do-metalu",
  "cat-farby-elewacyjne","cat-farby-pozostae","cat-farby-wewnetrzne",
  "cat-rozpuszczalniki","cat-folie-budowlane","cat-folie-fundamentowe",
  "cat-folie-paroizolacyjne","cat-grunty-do-posadzek","cat-grunty-pod-tynki",
  "cat-grunty-specjalistyczne","cat-grunty-uniwersalne",
  "cat-masy-bitumiczne-gruntujace","cat-akcesoria-do-izolacji",
  "cat-hydroizolacje","cat-izolacje-budowlane","cat-izolacje-techniczne",
  "cat-pyty-xps","cat-styropiany","cat-weny","cat-kleje-do-drewna",
  "cat-l3-kleje-do-glazury","cat-kleje-do-glazury",
  "cat-kleje-do-styropianu-i-styroduru","cat-l3-kleje-do-welen",
  "cat-kleje-do-ween","cat-kleje-montazowe","cat-listwy-przypodogowe",
  "cat-akcesoria-malarskie-i-tynkarskie","cat-akcesoria-murarskie",
  "cat-artykuy-scierne","cat-elektronarzedzia","cat-narzedzia-budowlane",
  "cat-narzedzia-malarskie","cat-narzedzia-pomiarowe","cat-pytki-ceramiczne",
  "cat-pytki-dekoracyjne","cat-materiay-konstrukcyjne",
  "cat-panele-scienne-i-tapety","cat-schody-i-akcesoria-strychowe",
  "cat-systemy-kominowe","cat-mocowania-do-suchej-zabudowy",
  "cat-narozniki-i-listwy","cat-profile-do-suchej-zabudowy","cat-pyty",
  "cat-wieszaki-do-suchej-zabudowy","cat-tynki-cementowo-wapienne",
  "cat-tynki-elewacyjne","cat-tynki-gipsowe","cat-tynki-specjalne",
  "cat-tynki-wapienne",
];

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json", ...CORS },
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const token = env.SANITY_TOKEN;

  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: CORS });
  if (!token) return json({ error: "Brak SANITY_TOKEN" }, 500);
  if (request.method !== "POST") return json({ error: "Tylko POST" }, 405);

  try {
    const BATCH = 25;
    const results = [];

    for (let i = 0; i < DUPLICATE_IDS.length; i += BATCH) {
      const batch = DUPLICATE_IDS.slice(i, i + BATCH);
      const mutations = batch.map(id => ({ delete: { id } }));

      const res = await fetch(SANITY_MUTATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ mutations }),
      });

      const data = await res.json();
      results.push({ batch: i / BATCH + 1, ok: res.ok, count: batch.length });
      if (!res.ok) return json({ error: "Błąd Sanity", details: data, results }, 500);
    }

    return json({
      success: true,
      message: `Usunięto ${DUPLICATE_IDS.length} zduplikowanych kategorii`,
      deleted: DUPLICATE_IDS.length,
      batches: results,
    });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
