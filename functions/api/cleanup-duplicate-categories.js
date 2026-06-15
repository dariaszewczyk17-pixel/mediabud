/**
 * Cloudflare Pages Function — /api/cleanup-duplicate-categories
 * POST — migruje produkty ze starych duplikatów na kanoniczne kategorie, potem usuwa duplikaty.
 * 
 * v8: Pełna mapa 104 duplikatów. Przepina 6658 produktów, potem usuwa stare kategorie.
 * 
 * Krok 1: Przepina category._ref produktów (stary → kanoniczny)
 * Krok 2: Usuwa stare duplikaty kategorii (tylko te bez referencji po przepięciu)
 * 
 * Wymaga SANITY_TOKEN w env.
 */

const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";
const API_VER    = "v2021-06-07";

const SANITY_MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/mutate/${DATASET}`;
const SANITY_QUERY_URL  = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`;

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

// Pełna mapa: stary duplikat _id → kanoniczny _id (104 par)
const MIGRATION_MAP = {
  "cat-aczniki-do-izolacji-fasadowych": "cat-l3-laczniki-do-izolacji-fasadow",
  "cat-aczniki-do-profili": "cat-l3-laczniki-do-profili",
  "cat-akcesoria-do-kominow": "cat-l3-akcesoria-do-kominow",
  "cat-akcesoria-do-potkow-przeciwsniegowe": "cat-akcesoria-do-plotkow-przeciwsniegowe",
  "cat-akcesoria-malarskie-i-tynkarskie": "cat-l2-akcesoria-malarskie-i-tynkar",
  "cat-artykuy-scierne": "cat-l2-artykuly-scierne",
  "cat-czysciki-do-pian-montazowych": "cat-l3-czysciki-do-pian-montazowych",
  "cat-dachowki-ceramiczne": "category-dachowki-ceramiczne",
  "cat-drzwi-kolankowe": "cat-l3-drzwi-kolankowe",
  "cat-emalie-akrylowe": "category-emalie-akrylowe",
  "cat-emalie-chlorokauczukowe": "cat-l3-emalie-chlorokauczukowe",
  "cat-emalie-ftalowe": "category-emalie-ftalowe",
  "cat-emalie-poliuretanowe": "cat-l3-emalie-poliuretanowe",
  "cat-farby-el": "cat-farby-do-drewna",
  "cat-farby-wn": "cat-farby-do-metalu",
  "cat-farby-elewacyjne": "cat-l2-farby-elewacyjne",
  "cat-farby-elewacyjne-akrylowe": "cat-l3-farby-elewacyjne-akrylowe",
  "cat-farby-elewacyjne-emulsyjne": "cat-l3-farby-elewacyjne-emulsyjne",
  "cat-farby-elewacyjne-silikatowe": "cat-l3-farby-elewacyjne-silikatowe",
  "cat-farby-elewacyjne-silikonowe": "cat-l3-farby-elewacyjne-silikonowe",
  "cat-farby-elewacyjne-specjalne": "cat-l3-farby-elewacyjne-specjalne",
  "cat-farby-pozostae": "cat-plyty-gk",
  "cat-farby-wewnetrzne-biae": "cat-l3-farby-wewnetrzne-biale",
  "cat-farby-wewnetrzne-kolorowe": "cat-l3-farby-wewnetrzne-kolorowe",
  "cat-gipsy-i-gadzie": "cat-styrodur",
  "cat-hydroizolacje-bitumiczne": "category-hydroizolacje-bitumiczne",
  "cat-hydroizolacje-mineralne": "category-hydroizolacje-mineralne",
  "cat-izolacje-hvac": "cat-l3-izolacje-hvac",
  "cat-izolacje-akustyczne": "cat-l3-izolacje-akustyczne",
  "cat-izolacje-dachow-paskich": "cat-l3-izolacje-dachow-plaskich",
  "cat-izolacje-fasadowe": "cat-l3-izolacje-fasadowe",
  "cat-izolacje-przemysowe": "cat-l3-izolacje-przemyslowe",
  "cat-izolacje-stropow-i-podog": "cat-l3-izolacje-stropow-i-podlog",
  "cat-kominy-ceramiczne": "category-kominy-ceramiczne",
  "cat-kominy-stalowe": "cat-l3-kominy-stalowe",
  "cat-komunikacja-dachowa": "category-komunikacja-dachowa",
  "cat-katowniki-i-katomierze": "cat-l3-katowniki-i-katomierce",
  "cat-lakierobejce": "category-lakierobejce",
  "cat-lakiery-do-drewna": "cat-l3-lakiery-do-drewna",
  "cat-lakiery-do-metalu": "cat-l3-lakiery-do-metalu",
  "cat-lasery-i-dalmierze": "cat-l3-lasery-i-dalmierze",
  "cat-materiay-konstrukcyjne": "cat-l2-materialy-konstrukcyjne",
  "cat-membrany-dachowe": "category-membrany-dachowe",
  "cat-mieszada": "cat-mieszadla",
  "cat-mocowania-do-suchej-zabudowy": "cat-l2-mocowania-do-suchej-zabudowy",
  "cat-motki-budowlane": "cat-l3-mlotki-budowlane",
  "cat-narozniki-do-tynkow-mokrych": "cat-l3-narozniki-do-tynkow-mokrych",
  "cat-narozniki-i-listwy": "cat-l2-narozniki-i-listwy",
  "cat-narzedzia-malarskie": "cat-l2-narzedzia-malarskie",
  "cat-okna-dachowe": "cat-l3-okna-dachowe",
  "cat-okna-dachowe-i-akcesoria": "cat-l2-okna-dachowe-i-akcesoria",
  "cat-okadziny-z-wokna-szklanego": "cat-l3-okladziny-z-wlokna-szklanego",
  "cat-panele-scienne-i-tapety": "cat-l2-panele-scienne-i-tapety",
  "cat-piany-montazowe": "cat-l2-piany-montazowe",
  "cat-piany-montazowe-pistoletowe": "cat-l3-piany-montazowe-pistoletowe",
  "cat-piany-montazowe-wezykowe": "cat-l3-piany-montazowe-wezzykowe",
  "cat-podkady-wypeniajace": "cat-l3-podklady-wypelniajace",
  "cat-pokrycia-dachowe": "cat-l2-pokrycia-dachowe",
  "cat-pokrycia-dachowe-z-blachy": "cat-l3-pokrycia-dachowe-z-blachy",
  "cat-poziomnice": "category-poziomnice",
  "cat-profile-do-suchej-zabudowy": "cat-l2-profile-do-suchej-zabudowy",
  "cat-pedzle": "category-pedzle",
  "cat-potki-przeciwsniegowe": "cat-l3-plotki-przeciwsniegowe",
  "cat-pytki-ceramiczne": "cat-l2-plytki-ceramiczne",
  "cat-pytki-dekoracyjne": "cat-l2-plytki-dekoracyjne",
  "cat-pyty": "cat-plyty",
  "cat-schody-i-akcesoria-strychowe": "cat-l2-schody-i-akcesoria-strychowe",
  "cat-schody-strychowe": "cat-l3-schody-strychowe",
  "cat-siatki-elewacyjne": "cat-l3-siatki-elewacyjne",
  "cat-silikony-dekarskie": "cat-l3-silikony-dekarskie",
  "cat-silikony-sanitarne": "category-silikony-sanitarne",
  "cat-silikony-szklarskie": "cat-l3-silikony-szklarskie",
  "cat-silikony-uniwersalne": "cat-l3-silikony-uniwersalne",
  "cat-silikony-wysokotemperaturowe": "cat-l3-silikony-wysokotemperaturowe",
  "cat-spoiny-elastyczne": "cat-l3-spoiny-elastyczne",
  "cat-spoiny-specjalistyczne": "cat-l3-spoiny-specjalistyczne",
  "cat-spoiny-zwyke": "cat-l3-spoiny-zwykle",
  "cat-stopnie-kominiarskie": "cat-l3-stopnie-kominiarskie",
  "cat-styropiany-akustyczne": "cat-l3-styropiany-akustyczne",
  "cat-styropiany-do-fundamentow": "cat-l3-styropiany-do-fundamentow",
  "cat-styropiany-fasadowe-eps": "cat-l3-styropiany-fasadowe-eps",
  "cat-systemy-kominowe": "cat-l2-systemy-kominowe",
  "cat-szlifierki": "cat-l3-szlifierki",
  "cat-szpachle-i-szpachelki": "cat-l3-szpachle-i-szpachelki",
  "cat-tapety-scienne": "cat-l3-tapety-scienne",
  "cat-tasmy-i-folie-pozostae": "cat-tasmy-i-folie-pozostale",
  "cat-tasmy-malarskie": "category-tasmy-malarskie",
  "cat-tasmy-uszczelniajace-do-hydroizolacji": "cat-l3-tasmy-uszczelniajace-hydroiz",
  "cat-uszczelniacze-i-silikony": "cat-l2-uszczelniacze-i-silikony",
  "cat-waki-malarskie": "category-walki-malarskie",
  "cat-weny-do-dachow-paskich": "cat-l3-welny-do-dachow-plaskich",
  "cat-weny-do-poddaszy": "cat-l3-welny-do-poddaszy",
  "cat-weny-fasadowe": "cat-l3-welny-fasadowe",
  "cat-wiadra-i-pojemniki-budowlane": "cat-l3-wiadra-i-pojemniki-budowlane",
  "cat-wiertarko-wkretarki": "category-wiertarko-wkretarki",
  "cat-wieszaki-do-suchej-zabudowy": "cat-l2-wieszaki-do-suchej-zabudowy",
  "cat-wkrety-do-suchej-zabudowy": "cat-l3-wkrety-do-suchej-zabudowy",
  "cat-wsporniki-potkow-przeciwsniegowych": "cat-l3-wsporniki-plotkow-przeciwsni",
  "cat-zabezpieczenia-przeciwsniegowe": "cat-l2-zabezpieczenia-przeciwsniego",
  "cat-zaprawy": "cat-l2-zaprawy",
  "cat-zaprawy-do-spoin": "cat-l3-zaprawy-do-spoin",
  "cat-zaprawy-naprawcze": "cat-l3-zaprawy-naprawcze",
  "cat-zaprawy-specjalistyczne": "cat-l3-zaprawy-specjalistyczne",
  "cat-zaprawy-uszczelniajace": "category-zaprawy-uszczelniajace",
};

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (request.method !== "POST") return json({ error: "Tylko POST" }, 405);

  const token = env.SANITY_TOKEN;
  if (!token) return json({ error: "Brak SANITY_TOKEN" }, 500);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const oldIds = Object.keys(MIGRATION_MAP);
  const log = [];
  let totalMigrated = 0;

  try {
    // KROK 1: Przepnij produkty — batchami po 10 starych kategorii
    const BATCH = 10;
    for (let i = 0; i < oldIds.length; i += BATCH) {
      const batch = oldIds.slice(i, i + BATCH);
      const idsStr = batch.map(id => `"${id}"`).join(",");

      const q = encodeURIComponent(`*[_type=="product" && category._ref in [${idsStr}]]{_id, "catRef": category._ref}`);
      const qRes = await fetch(`${SANITY_QUERY_URL}?query=${q}`, { headers });
      const products = (await qRes.json()).result ?? [];

      if (products.length === 0) continue;

      // Buduj mutacje patch
      const mutations = products.map(p => ({
        patch: {
          id: p._id,
          set: { category: { _type: "reference", _ref: MIGRATION_MAP[p.catRef] } }
        }
      }));

      // Wykonaj w sub-batchach po 100 mutacji (limit Sanity API)
      for (let j = 0; j < mutations.length; j += 100) {
        const subBatch = mutations.slice(j, j + 100);
        const mRes = await fetch(SANITY_MUTATE_URL, {
          method: "POST", headers,
          body: JSON.stringify({ mutations: subBatch })
        });
        if (!mRes.ok) {
          const err = await mRes.text();
          return json({ error: `Błąd przepięcia batch ${i}/${j}`, detail: err, log }, 500);
        }
        totalMigrated += subBatch.length;
      }

      log.push(`Batch ${Math.floor(i/BATCH)+1}: ${products.length} produktów przepiętych`);
    }

    // KROK 2: Safety check — usuń tylko te bez referencji
    const idList = oldIds.map(id => `"${id}"`).join(",");
    const safetyQuery = encodeURIComponent(
      `*[_id in [${idList}] && count(*[references(^._id)]) == 0]{_id}`
    );
    const safetyRes = await fetch(`${SANITY_QUERY_URL}?query=${safetyQuery}`, { headers });
    const safeIds = ((await safetyRes.json()).result ?? []).map(d => d._id);
    const skipped = oldIds.filter(id => !safeIds.includes(id));

    // KROK 3: Usuń bezpieczne duplikaty
    let totalDeleted = 0;
    const DEL_BATCH = 50;
    for (let i = 0; i < safeIds.length; i += DEL_BATCH) {
      const batch = safeIds.slice(i, i + DEL_BATCH);
      const mutations = batch.map(id => ({ delete: { id } }));
      const res = await fetch(SANITY_MUTATE_URL, {
        method: "POST", headers,
        body: JSON.stringify({ mutations })
      });
      if (!res.ok) {
        const err = await res.text();
        return json({ error: `Błąd delete batch`, detail: err, log }, 500);
      }
      totalDeleted += batch.length;
    }

    log.push(`Usunięto ${totalDeleted} duplikatów. Pominięto ${skipped.length} (nadal mają referencje).`);

    return json({
      success: true,
      summary: {
        productsMigrated: totalMigrated,
        categoriesDeleted: totalDeleted,
        skippedCount: skipped.length,
      },
      skipped,
      log,
    });
  } catch (err) {
    return json({ error: err.message, log }, 500);
  }
}
