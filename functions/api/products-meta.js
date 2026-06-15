/**
 * Cloudflare Pages Function — /api/products-meta
 * GET → { categories, brands, quality }
 * categories: [{slug, name, count}]
 * brands:     [{name, count}]
 * quality:    { noImage, noDesc, noEan, noCat, total }
 */

const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";
const API_VER    = "v2021-06-07";
const SANITY_QUERY_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

async function sanityFetch(query, token) {
  const res = await fetch(`${SANITY_QUERY_URL}?query=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Sanity error ${res.status}`);
  const data = await res.json();
  return data.result;
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: CORS });

  if (request.method !== "GET")
    return json({ error: "Metoda nieobsługiwana" }, 405);

  const token = env.SANITY_TOKEN;
  if (!token) return json({ error: "Brak SANITY_TOKEN" }, 500);

  try {
    const [categories, brands, quality] = await Promise.all([
      /* Kategorie z liczbą produktów */
      sanityFetch(
        `*[_type == "category" && defined(slug.current)] | order(name asc) {
          _id, "slug": slug.current, name,
          "count": count(*[_type == "product" && references(^._id)])
        }`,
        token
      ),

      /* Marki z liczbą produktów */
      sanityFetch(
        `*[_type == "brand"] | order(name asc) {
          _id, name,
          "count": count(*[_type == "product" && references(^._id)])
        }`,
        token
      ),

      /* Statystyki jakości */
      sanityFetch(
        `{
          "total":   count(*[_type == "product"]),
          "noImage": count(*[_type == "product" && (!(defined(images)) || count(images) == 0)]),
          "noDesc":  count(*[_type == "product" && (!(defined(description)) || description == "")]),
          "noShort": count(*[_type == "product" && (!(defined(shortDescription)) || shortDescription == "")]),
          "noEan":   count(*[_type == "product" && !(defined(ean))]),
          "noCat":   count(*[_type == "product" && !(defined(category))]),
          "inactive": count(*[_type == "product" && (isActive == false || !(defined(isActive)))])
        }`,
        token
      ),
    ]);

    return json({ categories: categories || [], brands: brands || [], quality: quality || {} });
  } catch (e) {
    return json({ error: "Błąd pobierania meta danych: " + e.message }, 502);
  }
}
