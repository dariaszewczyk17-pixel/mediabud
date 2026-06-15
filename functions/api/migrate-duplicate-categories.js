/**
 * POST /api/migrate-duplicate-categories
 * v2: Przepina parent._ref w 61 podkategoriach + produkty ze starych 29 duplikatów na kanoniczne,
 *     potem usuwa stare duplikaty.
 */
const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";
const API_VER    = "v2021-06-07";
const MUTATE     = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/mutate/${DATASET}`;
const QUERY_URL  = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`;

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonRes(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status, headers: { "Content-Type": "application/json", ...CORS },
  });
}

// 29 starych parent duplikatów → kanoniczne
const PARENT_MAP = {
  // Runda 1 (29 parent duplikatów — większość już usunięta)
  "cat-akcesoria-malarskie-i-tynkarskie": "cat-l2-akcesoria-malarskie-i-tynkar",
  "cat-artykuy-scierne": "cat-l2-artykuly-scierne",
  "cat-farby-el": "cat-farby-do-drewna",
  "cat-farby-wn": "cat-farby-do-metalu",
  "cat-farby-elewacyjne": "cat-l2-farby-elewacyjne",
  "cat-farby-pozostae": "cat-plyty-gk",
  "cat-gipsy-i-gadzie": "cat-styrodur",
  "cat-izolacje-dachow-paskich": "cat-l3-izolacje-dachow-plaskich",
  "cat-izolacje-fasadowe": "cat-l3-izolacje-fasadowe",
  "cat-komunikacja-dachowa": "category-komunikacja-dachowa",
  "cat-materiay-konstrukcyjne": "cat-l2-materialy-konstrukcyjne",
  "cat-mocowania-do-suchej-zabudowy": "cat-l2-mocowania-do-suchej-zabudowy",
  "cat-narozniki-i-listwy": "cat-l2-narozniki-i-listwy",
  "cat-narzedzia-malarskie": "cat-l2-narzedzia-malarskie",
  "cat-okna-dachowe-i-akcesoria": "cat-l2-okna-dachowe-i-akcesoria",
  "cat-panele-scienne-i-tapety": "cat-l2-panele-scienne-i-tapety",
  "cat-piany-montazowe": "cat-l2-piany-montazowe",
  "cat-pokrycia-dachowe": "cat-l2-pokrycia-dachowe",
  "cat-profile-do-suchej-zabudowy": "cat-l2-profile-do-suchej-zabudowy",
  "cat-pytki-ceramiczne": "cat-l2-plytki-ceramiczne",
  "cat-pytki-dekoracyjne": "cat-l2-plytki-dekoracyjne",
  "cat-pyty": "cat-plyty",
  "cat-schody-i-akcesoria-strychowe": "cat-l2-schody-i-akcesoria-strychowe",
  "cat-systemy-kominowe": "cat-l2-systemy-kominowe",
  "cat-uszczelniacze-i-silikony": "cat-l2-uszczelniacze-i-silikony",
  "cat-weny-fasadowe": "cat-l3-welny-fasadowe",
  "cat-wieszaki-do-suchej-zabudowy": "cat-l2-wieszaki-do-suchej-zabudowy",
  "cat-zabezpieczenia-przeciwsniegowe": "cat-l2-zabezpieczenia-przeciwsniego",
  "cat-zaprawy": "cat-l2-zaprawy",
  // Runda 2 (23 duplikatów drugiej generacji)
  "cat-artykuy-scierne-do-suchej-zabudowy": "cat-artykuly-scierne-do-suchej-zabudowy",
  "cat-belki-stropowe-betonowe": "category-belki-stropowe-betonowe",
  "cat-belki-stropowe-ceramiczne": "cat-l3-belki-stropowe-ceramiczne",
  "cat-bloczki": "cat-l3-bloczki",
  "cat-farby-do-betonu": "cat-l3-farby-do-betonu",
  "cat-farby-zaprawkowe": "cat-l3-farby-zaprawkowe",
  "cat-gadzie-gipsowe-w-proszku": "cat-l3-gladzie-gipsowe-w-proszku",
  "cat-gadzie-masy-gotowe": "cat-l3-gladzie-masy-gotowe",
  "cat-gipsy-budowlane": "cat-l3-gipsy-budowlane",
  "cat-gipsy-szpachlowe": "cat-l3-gipsy-szpachlowe",
  "cat-kleje-gipsowe": "cat-l3-kleje-gipsowe",
  "cat-kostki-scierne": "cat-l3-kostki-scierne",
  "cat-panele-i-dekory-scienne": "cat-l3-panele-i-dekory-scienne",
  "cat-papier-scierny": "cat-l3-papier-scierny",
  "cat-pigmenty": "cat-l3-pigmenty",
  "cat-pilniki": "cat-l3-pilniki",
  "cat-pustaki": "cat-l3-pustaki",
  "cat-pytki-elewacyjne": "category-plytki-elewacyjne",
  "cat-pytki-scienne": "category-plytki-scienne",
  "cat-pytki-tarasowe": "category-plytki-tarasowe",
  "cat-pyty-cementowe": "category-plyty-cementowe",
  "cat-pyty-gipsowo-kartonowe": "category-plyty-gipsowo-kartonowe",
};

export async function onRequest({ request, env }) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (!env.SANITY_TOKEN) return jsonRes({ error: "Brak SANITY_TOKEN" }, 500);
  if (request.method !== "POST") return jsonRes({ error: "Tylko POST" }, 405);

  const h = { "Content-Type": "application/json", Authorization: `Bearer ${env.SANITY_TOKEN}` };
  const oldIds = Object.keys(PARENT_MAP);
  const idsStr = oldIds.map(id => `"${id}"`).join(",");
  const log = [];

  try {
    // KROK 1: Przepnij parent._ref w podkategoriach
    const q1 = encodeURIComponent(`*[_type=="category" && parent._ref in [${idsStr}]]{_id, "parentRef": parent._ref}`);
    const r1 = await fetch(`${QUERY_URL}?query=${q1}`, { headers: h });
    const children = (await r1.json()).result ?? [];
    log.push(`Podkategorii do przepięcia: ${children.length}`);

    if (children.length > 0) {
      const mutations = children.map(c => ({
        patch: { id: c._id, set: { parent: { _type: "reference", _ref: PARENT_MAP[c.parentRef] } } }
      }));
      const res = await fetch(MUTATE, { method: "POST", headers: h, body: JSON.stringify({ mutations }) });
      if (!res.ok) return jsonRes({ error: "Błąd przepięcia parent", detail: await res.text(), log }, 500);
      log.push(`Przepięto parent w ${children.length} podkategoriach`);
    }

    // KROK 2: Przepnij produkty category._ref (safety — mogły zostać)
    const q2 = encodeURIComponent(`*[_type=="product" && category._ref in [${idsStr}]]{_id, "catRef": category._ref}`);
    const r2 = await fetch(`${QUERY_URL}?query=${q2}`, { headers: h });
    const prods = (await r2.json()).result ?? [];
    log.push(`Produktów (category) do przepięcia: ${prods.length}`);

    if (prods.length > 0) {
      const mutations = prods.map(p => ({
        patch: { id: p._id, set: { category: { _type: "reference", _ref: PARENT_MAP[p.catRef] } } }
      }));
      for (let i = 0; i < mutations.length; i += 100) {
        const batch = mutations.slice(i, i + 100);
        await fetch(MUTATE, { method: "POST", headers: h, body: JSON.stringify({ mutations: batch }) });
      }
      log.push(`Przepięto ${prods.length} produktów (category)`);
    }

    // KROK 2b: Przepnij produkty rootCategory._ref
    const q2b = encodeURIComponent(`*[_type=="product" && rootCategory._ref in [${idsStr}]]{_id, "rootRef": rootCategory._ref}`);
    const r2b = await fetch(`${QUERY_URL}?query=${q2b}`, { headers: h });
    const rootProds = (await r2b.json()).result ?? [];
    log.push(`Produktów (rootCategory) do przepięcia: ${rootProds.length}`);

    if (rootProds.length > 0) {
      const mutations = rootProds.map(p => ({
        patch: { id: p._id, set: { rootCategory: { _type: "reference", _ref: PARENT_MAP[p.rootRef] } } }
      }));
      for (let i = 0; i < mutations.length; i += 100) {
        const batch = mutations.slice(i, i + 100);
        await fetch(MUTATE, { method: "POST", headers: h, body: JSON.stringify({ mutations: batch }) });
      }
      log.push(`Przepięto ${rootProds.length} produktów (rootCategory)`);
    }

    // KROK 3: Usuń stare duplikaty (safety check — tylko bez referencji)
    const q3 = encodeURIComponent(`*[_id in [${idsStr}] && count(*[references(^._id)]) == 0]{_id}`);
    const r3 = await fetch(`${QUERY_URL}?query=${q3}`, { headers: h });
    const safeIds = ((await r3.json()).result ?? []).map(d => d._id);

    if (safeIds.length > 0) {
      const mutations = safeIds.map(id => ({ delete: { id } }));
      await fetch(MUTATE, { method: "POST", headers: h, body: JSON.stringify({ mutations }) });
      log.push(`Usunięto ${safeIds.length} duplikatów`);
    }

    const still = oldIds.filter(id => !safeIds.includes(id));
    if (still.length > 0) log.push(`Nadal pominięto ${still.length}: ${still.join(", ")}`);

    return jsonRes({
      success: true,
      summary: { childrenReassigned: children.length, productsReassigned: prods.length, deleted: safeIds.length, stillSkipped: still.length },
      log,
    });
  } catch (err) {
    return jsonRes({ error: err.message, log }, 500);
  }
}
