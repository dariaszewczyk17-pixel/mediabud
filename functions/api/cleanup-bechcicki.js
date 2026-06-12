/**
 * Cloudflare Pages Function — /api/cleanup-bechcicki
 * POST → usuwa logo BECHCICKI z produktów w Sanity
 * 
 * Logo BECHCICKI zostało błędnie zaimportowane jako zdjęcie produktu.
 * Ta funkcja usuwa te obrazy z produktów.
 */

const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";
const API_VER    = "v2021-06-07";

const SANITY_QUERY_URL  = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`;
const SANITY_MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/mutate/${DATASET}`;

// ID obrazu z logo BECHCICKI
const BECHCICKI_IMAGE_REF = "image-b488bf43433a77a051d95d3c8bf2b703ecbb0236-933x933-webp";

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

  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: CORS });

  if (!token) return json({ error: "Brak SANITY_TOKEN" }, 500);

  if (request.method !== "POST") {
    return json({ error: "Tylko metoda POST jest dozwolona" }, 405);
  }

  try {
    // 1. Znajdź wszystkie produkty z logo BECHCICKI
    const query = encodeURIComponent(
      `*[_type=="product" && references("${BECHCICKI_IMAGE_REF}")]{_id,name}`
    );
    
    const queryRes = await fetch(`${SANITY_QUERY_URL}?query=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    const queryData = await queryRes.json();
    const products = queryData.result || [];
    
    if (products.length === 0) {
      return json({ 
        success: true, 
        message: "Brak produktów z logo BECHCICKI do naprawy",
        count: 0 
      });
    }

    // 2. Przygotuj mutacje - dla każdego produktu usuń obrazy z logo bechcicki
    // Używamy unset z filtrem array
    const mutations = products.map(p => ({
      patch: {
        id: p._id,
        unset: ["images[asset._ref == \"image-b488bf43433a77a051d95d3c8bf2b703ecbb0236-933x933-webp\"]"]
      }
    }));

    // 3. Wykonaj mutacje
    const mutateRes = await fetch(SANITY_MUTATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mutations }),
    });

    const mutateData = await mutateRes.json();

    if (!mutateRes.ok) {
      return json({ 
        error: "Błąd podczas usuwania logo", 
        details: mutateData 
      }, 500);
    }

    return json({
      success: true,
      message: `Usunięto logo BECHCICKI z ${products.length} produktów`,
      count: products.length,
      products: products.map(p => ({ id: p._id, name: p.name }))
    });

  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
