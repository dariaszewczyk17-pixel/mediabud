/**
 * Generuje statyczne HTML-e z poprawnym title, description i canonicalem
 * dla najważniejszych tras. React nadal hydratuje aplikację po stronie klienta,
 * ale crawler od pierwszej odpowiedzi otrzymuje jednoznaczne metadane URL-a.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const BASE_URL = "https://mediabud.pl";

const routes = [
  ["/", "Skład Budowlany Lublin – Materiały z Dostawą | Media Bud", "Skład budowlany Media Bud w Lublinie. Ponad 15 000 materiałów: styropian, tynki, zaprawy, sucha zabudowa, dachy i chemia budowlana. Dostawa na budowę i fachowe doradztwo."],
  ["/kontakt", "Media Bud Lublin – Kontakt, Dojazd i Godziny Otwarcia", "Media Bud, ul. Chemiczna 8d w Lublinie. Sprawdź dojazd i godziny otwarcia, zadzwoń lub poproś o wycenę materiałów budowlanych z dostawą."],
  ["/o-firmie", "Media Bud – Skład i Hurtownia Budowlana w Lublinie", "Poznaj Media Bud – lubelski skład materiałów budowlanych dla klientów indywidualnych, wykonawców i deweloperów. Doradztwo i dostawa na budowę."],
  ["/kategoria/sucha-zabudowa", "Sucha Zabudowa Lublin – Płyty GK i Profile | Media Bud", "Sucha zabudowa w Lublinie: płyty gipsowo-kartonowe, profile, wkręty, masy i akcesoria. Odbiór w Media Bud lub dostawa materiałów na budowę."],
  ["/kategoria/sufity-podwieszane", "Sufity Podwieszane Lublin – Płyty i Systemy | Media Bud", "Materiały do sufitów podwieszanych w Lublinie: płyty sufitowe, profile, wieszaki i akcesoria montażowe. Fachowy dobór oraz dostawa na budowę."],
  ["/kategoria/styropiany", "Styropian Lublin – Elewacyjny, Podłogowy i Fundamentowy", "Styropian w Lublinie do elewacji, podłóg i fundamentów. Porównaj parametry i dobierz kompletny system ocieplenia z doradztwem Media Bud i dostawą."],
  ["/kategoria/zaprawy", "Zaprawy Budowlane Lublin – Murarskie i Specjalistyczne", "Zaprawy budowlane w Lublinie: murarskie, tynkarskie, naprawcze i specjalistyczne. Oferta renomowanych producentów, doradztwo i dostawa Media Bud."],
  ["/kategoria/farby-elewacyjne", "Farby Elewacyjne Lublin – Silikonowe i Silikatowe", "Farby elewacyjne w Lublinie: silikonowe, silikatowe, akrylowe i gruntujące. Dobór systemu, kolorów oraz dostawa na budowę z Media Bud."],
  ["/kategoria/pokrycia-dachowe", "Pokrycia Dachowe Lublin – Dachówki i Akcesoria", "Pokrycia dachowe w Lublinie: dachówki, membrany, obróbki i akcesoria. Zapytaj Media Bud o dostępność, wycenę i dostawę kompletnego systemu."],
  ["/kategoria/materialy-konstrukcyjne", "Materiały Konstrukcyjne Lublin – Pustaki i Bloczki", "Materiały konstrukcyjne w Lublinie: pustaki ceramiczne, bloczki, nadproża i zaprawy. Wycena zamówienia oraz dostawa na budowę z Media Bud."],
  ["/materialy-budowlane-lublin", "Materiały budowlane Lublin | Media Bud", "Materiały budowlane w Lublinie z doradztwem, odbiorem osobistym lub dostawą na budowę. Prześlij listę, projekt albo dodaj produkty do wyceny."],
  ["/styropian-lublin", "Styropian Lublin | Media Bud", "Styropian w Lublinie do elewacji, podłóg, fundamentów i dachów. Pomożemy dobrać parametry, obliczyć ilość i przygotować wycenę z dostawą."],
  ["/welna-mineralna-lublin", "Wełna mineralna Lublin | Media Bud", "Wełna mineralna w Lublinie do poddaszy, elewacji, ścian działowych, stropów i dachów. Dobór parametrów, wycena oraz dostawa na inwestycję."],
  ["/chemia-budowlana-lublin", "Chemia budowlana Lublin | Media Bud", "Chemia budowlana w Lublinie: kleje, zaprawy, grunty, hydroizolacje, piany i uszczelniacze. Pomoc w doborze oraz wspólna wycena materiałów."],
  ["/dostawa-materialow-budowlanych-lublin", "Dostawa materiałów budowlanych Lublin | Media Bud", "Dostawa materiałów budowlanych na terenie Lublina i województwa lubelskiego. Prześlij listę materiałów, adres oraz informacje o rozładunku."],
  ["/kalkulator/system-ocieplenia-elewacji", "Konfigurator systemu ocieplenia ETICS | Media Bud Lublin", "Oblicz kompletną listę materiałów na ocieplenie elewacji: izolację, zaprawy, siatkę, łączniki, grunt, tynk oraz profile i prześlij zestaw do wyceny."],
];

const esc = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

function withMeta(html, [routePath, title, description]) {
  const canonical = BASE_URL + (routePath === "/" ? "/" : routePath);
  const safeTitle = esc(title);
  const safeDescription = esc(description);
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${safeDescription}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${safeDescription}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${safeTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${safeDescription}" />`);
  const tag = `<link rel="canonical" href="${canonical}" />`;
  html = html.replace("<!-- Canonical jest dodawany per trasa przez statyczne SEO shells i useSEO. -->", tag);
  if (!html.includes(tag)) html = html.replace("</head>", `    ${tag}\n  </head>`);
  return html;
}

const template = await fs.readFile(path.join(DIST, "index.html"), "utf8");
for (const route of routes) {
  const output = route[0] === "/" ? path.join(DIST, "index.html") : path.join(DIST, route[0].slice(1), "index.html");
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, withMeta(template, route), "utf8");
}
console.log(`Static SEO: wygenerowano ${routes.length} tras z unikalnymi metadanymi.`);
