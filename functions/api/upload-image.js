/**
 * Cloudflare Pages Function — /api/upload-image
 * POST (multipart/form-data) → upload image to Sanity Assets API
 * Returns { assetId, url }
 */

const PROJECT_ID = "nzcwegq7";
const DATASET    = "production";

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

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: CORS });

  if (request.method !== "POST")
    return json({ error: "Metoda nieobsługiwana" }, 405);

  const token = env.SANITY_TOKEN;
  if (!token) return json({ error: "Brak SANITY_TOKEN" }, 500);

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File))
      return json({ error: "Brak pliku w polu 'file'" }, 400);

    /* Validate file type */
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowed.includes(file.type))
      return json({ error: `Niedozwolony typ pliku: ${file.type}. Dozwolone: JPG, PNG, WebP, GIF, SVG` }, 400);

    /* Max 10MB */
    if (file.size > 10 * 1024 * 1024)
      return json({ error: "Plik zbyt duży (max 10 MB)" }, 400);

    const buffer = await file.arrayBuffer();

    /* Upload to Sanity Assets API */
    const uploadUrl = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${DATASET}?filename=${encodeURIComponent(file.name)}`;

    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
        Authorization: `Bearer ${token}`,
      },
      body: buffer,
    });

    if (!res.ok) {
      const errText = await res.text();
      return json({ error: "Błąd uploadu do Sanity: " + errText }, 502);
    }

    const data = await res.json();
    const asset = data.document;

    return json({
      assetId: asset._id,
      url: asset.url,
      originalFilename: asset.originalFilename,
    });
  } catch (e) {
    return json({ error: "Błąd uploadu: " + e.message }, 500);
  }
}
