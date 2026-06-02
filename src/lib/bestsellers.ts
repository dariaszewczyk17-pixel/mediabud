/**
 * BESTSELLER_SLUGS — ranking popularności materiałów budowlanych PL 2026.
 * Źródło: ASM Research (Budowlana Marka Roku 2025), dane sprzedażowe ETICS,
 * analiza trendów wyszukiwania dla kategorii izolacje / chemia / tynki / farby.
 * Używane w: Home.tsx (tab Bestsellery) + BestsellerPage.tsx (/bestsellery)
 */
export const BESTSELLER_SLUGS = [
  "klej-do-styropianu-atlas-stopter-k-20",      // #1 klej do ocieplenia fasad (ETICS)
  "styropian-fasadowy-eps-100-swisspor",         // #1 izolacja termiczna budynków PL
  "welna-fasadowa-rockwool-frontrock-max-e",     // wełna fasadowa klasa A1 — niepalność
  "tynk-silikonowy-weber-pas-dr1",              // tynk silikonowy elewacyjny — bestseller
  "tynk-gipsowy-knauf-goldband-25kg",           // #1 tynk gipsowy wnętrza w Polsce
  "klej-do-plytek-ceresit-cm11-25kg",           // #1 klej do płytek ceramicznych i gresu
  "farba-elewacyjna-caparol-silikoncolor-10l",  // farba elewacyjna silikonowa
  "siatka-elewacyjna-vertex-r131",              // siatka zbrojąca — element systemu ETICS
  "bloczek-beton-komorkowy-ytong-240",          // beton komórkowy — #1 materiał murarski
  "cement-portlandzki-cem-i-425r-25kg",         // cement CEM I — podstawa każdej budowy
  "zaprawa-murarska-baumit-manu2-25kg",         // zaprawa murarska — do bloczków i cegieł
  "hydroizolacja-bitumiczna-ceresit-cr-65",     // hydroizolacja — fundamenty i łazienki
] as const;

/** Filtry kategorii mapowane na categorySlug z products.ts */
export const BESTSELLER_CATEGORY_FILTERS = [
  { id: "wszystkie", label: "Wszystkie" },
  {
    id: "izolacje",
    label: "Izolacje termiczne",
    slugs: ["styropian-fasadowy-eps", "welna-fasadowa", "akcesoria-izolacji"],
  },
  {
    id: "chemia",
    label: "Chemia budowlana",
    slugs: ["kleje-styropian", "kleje-glazura", "hydroizolacje-mineralne", "zaprawy-murarskie", "cement"],
  },
  {
    id: "tynki",
    label: "Tynki",
    slugs: ["tynki-silikonowe", "tynki-gipsowe", "tynki-mineralne"],
  },
  {
    id: "farby",
    label: "Farby elewacyjne",
    slugs: ["farby-elaw-silikonowe", "farby-elaw-akrylowe", "farby-elaw-silikatowe"],
  },
  {
    id: "mury",
    label: "Mury i ściany",
    slugs: ["bloczki-beton-komorkowy", "bloczki-silikatowe", "bloczki-ceramiczne"],
  },
] as const;

export type BestsellerCategoryId = (typeof BESTSELLER_CATEGORY_FILTERS)[number]["id"];
