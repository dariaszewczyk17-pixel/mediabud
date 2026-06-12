/**
 * CATEGORY_HERO_SPECS — kluczowe parametry wyświetlane na karcie produktu
 * CATEGORY_FILTERS — filtry dostępne na stronie kategorii
 * 
 * Zaprojektowane na podstawie analizy 42 typów parametrów technicznych
 * i best practices z Baymard Institute, NN/g, ASOS
 */

// ─── TYPY ────────────────────────────────────────────────────────────────────

export type HeroSpecConfig = {
  key: string;           // klucz w techSpecs produktu
  label: string;         // etykieta wyświetlana
  unit?: string;         // jednostka (opcjonalna)
  icon?: string;         // emoji ikona
  highlight?: boolean;   // czy wyróżnić (np. lambda)
};

export type FilterConfig = {
  key: string;           // klucz w techSpecs
  label: string;         // etykieta filtra
  type: "select" | "range" | "checkbox";
  options?: string[];    // dla select/checkbox
  min?: number;          // dla range
  max?: number;          // dla range
  unit?: string;         // jednostka
};

export type CategoryConfig = {
  heroSpecs: HeroSpecConfig[];
  filters: FilterConfig[];
  variantKey?: string;   // klucz do grupowania wariantów (np. "grubosc")
};

// ─── KONFIGURACJA PER KATEGORIA ──────────────────────────────────────────────

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // IZOLACJE — styropian, wełna, XPS
  // ═══════════════════════════════════════════════════════════════════════════
  "izolacje": {
    heroSpecs: [
      { key: "grubosc", label: "Grubość", unit: "cm", icon: "📏", highlight: true },
      { key: "lambda", label: "Lambda λ", unit: "W/mK", icon: "🔥", highlight: true },
      { key: "gestosc", label: "Gęstość", unit: "kg/m³", icon: "⚖️" },
      { key: "opor_sciskania", label: "Wytrzymałość", unit: "kPa", icon: "💪" },
    ],
    filters: [
      { key: "grubosc", label: "Grubość", type: "select", options: ["5 cm", "8 cm", "10 cm", "12 cm", "15 cm", "20 cm"], unit: "cm" },
      { key: "lambda", label: "Lambda", type: "select", options: ["0.031", "0.033", "0.036", "0.038", "0.040"] },
      { key: "typ", label: "Typ izolacji", type: "checkbox", options: ["EPS", "Grafit", "XPS", "Wełna mineralna", "Wełna skalna"] },
      { key: "zastosowanie", label: "Zastosowanie", type: "checkbox", options: ["Ściany", "Dach", "Podłoga", "Fundament"] },
    ],
    variantKey: "grubosc",
  },

  "styropian": {
    heroSpecs: [
      { key: "grubosc", label: "Grubość", unit: "cm", icon: "📏", highlight: true },
      { key: "lambda", label: "Lambda λ", unit: "W/mK", icon: "🔥", highlight: true },
      { key: "gestosc", label: "Gęstość", unit: "kg/m³", icon: "⚖️" },
      { key: "klasa_reakcji_na_ogien", label: "Klasa ogniowa", icon: "🔥" },
    ],
    filters: [
      { key: "grubosc", label: "Grubość", type: "select", options: ["5 cm", "8 cm", "10 cm", "12 cm", "15 cm", "20 cm"] },
      { key: "lambda", label: "Lambda", type: "select", options: ["0.031", "0.033", "0.036", "0.038"] },
      { key: "typ", label: "Typ", type: "checkbox", options: ["Biały EPS", "Grafitowy", "Fasadowy", "Podłogowy"] },
    ],
    variantKey: "grubosc",
  },

  "welna-mineralna": {
    heroSpecs: [
      { key: "grubosc", label: "Grubość", unit: "cm", icon: "📏", highlight: true },
      { key: "lambda", label: "Lambda λ", unit: "W/mK", icon: "🔥", highlight: true },
      { key: "gestosc", label: "Gęstość", unit: "kg/m³", icon: "⚖️" },
      { key: "opor_ogniowy", label: "Odporność ogniowa", icon: "🛡️" },
    ],
    filters: [
      { key: "grubosc", label: "Grubość", type: "select", options: ["5 cm", "10 cm", "15 cm", "20 cm", "25 cm"] },
      { key: "lambda", label: "Lambda", type: "select", options: ["0.033", "0.035", "0.037", "0.039"] },
      { key: "typ", label: "Typ", type: "checkbox", options: ["Skalna", "Szklana", "W rolce", "W płytach"] },
    ],
    variantKey: "grubosc",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHEMIA BUDOWLANA — tynki, kleje, zaprawy
  // ═══════════════════════════════════════════════════════════════════════════
  "chemia-budowlana": {
    heroSpecs: [
      { key: "zuzycie", label: "Zużycie", unit: "kg/m²", icon: "📊", highlight: true },
      { key: "wydajnosc", label: "Wydajność", unit: "m²/op", icon: "📐" },
      { key: "czas_schnięcia", label: "Czas schnięcia", unit: "h", icon: "⏱️" },
      { key: "waga", label: "Waga opakowania", unit: "kg", icon: "⚖️" },
    ],
    filters: [
      { key: "typ", label: "Typ produktu", type: "checkbox", options: ["Klej", "Tynk", "Zaprawa", "Gładź", "Grunt"] },
      { key: "zastosowanie", label: "Zastosowanie", type: "checkbox", options: ["Wewnętrzne", "Zewnętrzne", "Mokre pomieszczenia"] },
      { key: "waga", label: "Opakowanie", type: "select", options: ["5 kg", "10 kg", "20 kg", "25 kg"] },
    ],
  },

  "tynki": {
    heroSpecs: [
      { key: "granulacja", label: "Granulacja", unit: "mm", icon: "🔬", highlight: true },
      { key: "zuzycie", label: "Zużycie", unit: "kg/m²", icon: "📊", highlight: true },
      { key: "wydajnosc", label: "Wydajność", unit: "m²/op", icon: "📐" },
      { key: "typ_tynku", label: "Typ", icon: "🏠" },
    ],
    filters: [
      { key: "granulacja", label: "Granulacja", type: "select", options: ["1.0 mm", "1.5 mm", "2.0 mm", "2.5 mm", "3.0 mm"] },
      { key: "typ", label: "Typ tynku", type: "checkbox", options: ["Silikonowy", "Akrylowy", "Silikatowy", "Mineralny", "Mozaikowy"] },
      { key: "faktura", label: "Faktura", type: "checkbox", options: ["Baranek", "Kornik", "Rustykalny"] },
    ],
    variantKey: "granulacja",
  },

  "kleje-budowlane": {
    heroSpecs: [
      { key: "zuzycie", label: "Zużycie", unit: "kg/m²", icon: "📊", highlight: true },
      { key: "czas_otwarty", label: "Czas otwarty", unit: "min", icon: "⏱️" },
      { key: "klasa", label: "Klasa", icon: "🏆" },
      { key: "waga", label: "Opakowanie", unit: "kg", icon: "⚖️" },
    ],
    filters: [
      { key: "zastosowanie", label: "Zastosowanie", type: "checkbox", options: ["Do styropianu", "Do płytek", "Do wełny", "Uniwersalny"] },
      { key: "klasa", label: "Klasa", type: "select", options: ["C1", "C2", "C2S1", "C2S2"] },
      { key: "waga", label: "Opakowanie", type: "select", options: ["5 kg", "20 kg", "25 kg"] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FARBY
  // ═══════════════════════════════════════════════════════════════════════════
  "farby-i-rozpuszczalniki": {
    heroSpecs: [
      { key: "wydajnosc", label: "Wydajność", unit: "m²/l", icon: "📐", highlight: true },
      { key: "pojemnosc", label: "Pojemność", unit: "l", icon: "🪣", highlight: true },
      { key: "czas_schnięcia", label: "Schnięcie", unit: "h", icon: "⏱️" },
      { key: "kolor", label: "Kolor", icon: "🎨" },
    ],
    filters: [
      { key: "typ", label: "Typ farby", type: "checkbox", options: ["Akrylowa", "Lateksowa", "Silikonowa", "Ceramiczna", "Emulsyjna"] },
      { key: "pojemnosc", label: "Pojemność", type: "select", options: ["1 l", "2.5 l", "5 l", "10 l", "15 l"] },
      { key: "zastosowanie", label: "Zastosowanie", type: "checkbox", options: ["Wewnętrzne", "Zewnętrzne", "Kuchnia/łazienka"] },
      { key: "wykonczenie", label: "Wykończenie", type: "checkbox", options: ["Matowe", "Satynowe", "Półmat"] },
    ],
    variantKey: "pojemnosc",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PŁYTKI
  // ═══════════════════════════════════════════════════════════════════════════
  "plytki": {
    heroSpecs: [
      { key: "format", label: "Format", unit: "cm", icon: "📐", highlight: true },
      { key: "grubosc", label: "Grubość", unit: "mm", icon: "📏" },
      { key: "klasa_antypoślizgowości", label: "Antypoślizg", icon: "🦶" },
      { key: "nasiakliwosc", label: "Nasiąkliwość", unit: "%", icon: "💧" },
    ],
    filters: [
      { key: "format", label: "Format", type: "select", options: ["20×20", "30×30", "30×60", "60×60", "60×120", "80×80"] },
      { key: "typ", label: "Typ", type: "checkbox", options: ["Gres", "Terakota", "Mozaika", "Klinkier"] },
      { key: "zastosowanie", label: "Zastosowanie", type: "checkbox", options: ["Podłoga", "Ściana", "Taras", "Schody"] },
      { key: "wykonczenie", label: "Wykończenie", type: "checkbox", options: ["Matowe", "Polerowane", "Lappato", "Strukturalne"] },
    ],
    variantKey: "format",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SUCHA ZABUDOWA
  // ═══════════════════════════════════════════════════════════════════════════
  "sucha-zabudowa": {
    heroSpecs: [
      { key: "grubosc", label: "Grubość", unit: "mm", icon: "📏", highlight: true },
      { key: "wymiary", label: "Wymiary", unit: "cm", icon: "📐" },
      { key: "typ_plyty", label: "Typ płyty", icon: "🔲" },
      { key: "odpornosc_ogniowa", label: "Odporność ogniowa", icon: "🔥" },
    ],
    filters: [
      { key: "grubosc", label: "Grubość", type: "select", options: ["9.5 mm", "12.5 mm", "15 mm", "18 mm"] },
      { key: "typ", label: "Typ płyty", type: "checkbox", options: ["Standardowa", "Wodoodporna (H2)", "Ognioodporna (F)", "Akustyczna"] },
      { key: "marka", label: "Marka", type: "checkbox", options: ["Knauf", "Rigips", "Norgips", "Siniat"] },
    ],
    variantKey: "grubosc",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DACHY
  // ═══════════════════════════════════════════════════════════════════════════
  "dachy": {
    heroSpecs: [
      { key: "typ_pokrycia", label: "Typ pokrycia", icon: "🏠", highlight: true },
      { key: "wymiary", label: "Wymiary", unit: "cm", icon: "📐" },
      { key: "waga", label: "Waga", unit: "kg/m²", icon: "⚖️" },
      { key: "kolor", label: "Kolor", icon: "🎨" },
    ],
    filters: [
      { key: "typ", label: "Typ pokrycia", type: "checkbox", options: ["Dachówka ceramiczna", "Dachówka betonowa", "Blachodachówka", "Papa", "Gont"] },
      { key: "kolor", label: "Kolor", type: "checkbox", options: ["Ceglasty", "Grafitowy", "Brązowy", "Czarny", "Zielony"] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STROPY I ŚCIANY
  // ═══════════════════════════════════════════════════════════════════════════
  "stropy-i-sciany": {
    heroSpecs: [
      { key: "wymiary", label: "Wymiary", unit: "cm", icon: "📐", highlight: true },
      { key: "wytrzymalosc", label: "Wytrzymałość", unit: "MPa", icon: "💪" },
      { key: "gestosc", label: "Gęstość", unit: "kg/m³", icon: "⚖️" },
      { key: "klasa_mrozoodpornosci", label: "Mrozoodporność", icon: "❄️" },
    ],
    filters: [
      { key: "typ", label: "Typ", type: "checkbox", options: ["Pustak", "Bloczek", "Cegła", "Beton komórkowy"] },
      { key: "marka", label: "Marka", type: "checkbox", options: ["Porotherm", "Ytong", "Solbet", "Silka"] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NARZĘDZIA
  // ═══════════════════════════════════════════════════════════════════════════
  "narzedzia-i-mocowania": {
    heroSpecs: [
      { key: "typ", label: "Typ", icon: "🔧", highlight: true },
      { key: "rozmiar", label: "Rozmiar", icon: "📏" },
      { key: "material", label: "Materiał", icon: "🔩" },
    ],
    filters: [
      { key: "typ", label: "Typ", type: "checkbox", options: ["Ręczne", "Elektryczne", "Pomiarowe", "Mocowania"] },
      { key: "marka", label: "Marka", type: "checkbox", options: ["Bosch", "Makita", "DeWalt", "Stanley"] },
    ],
  },
};

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

/**
 * Pobiera konfigurację dla kategorii (z fallback do parent)
 */
export function getCategoryConfig(categorySlug: string): CategoryConfig | null {
  // Dokładne dopasowanie
  if (CATEGORY_CONFIG[categorySlug]) {
    return CATEGORY_CONFIG[categorySlug];
  }
  
  // Fallback do parent kategorii (np. "styropian-grafitowy" → "styropian" → "izolacje")
  const parts = categorySlug.split("-");
  for (let i = parts.length - 1; i > 0; i--) {
    const parentSlug = parts.slice(0, i).join("-");
    if (CATEGORY_CONFIG[parentSlug]) {
      return CATEGORY_CONFIG[parentSlug];
    }
  }
  
  // Fallback do głównych kategorii
  const mainCategories = ["izolacje", "chemia-budowlana", "farby-i-rozpuszczalniki", "plytki", "sucha-zabudowa", "dachy", "stropy-i-sciany", "narzedzia-i-mocowania"];
  for (const main of mainCategories) {
    if (categorySlug.includes(main.split("-")[0])) {
      return CATEGORY_CONFIG[main] || null;
    }
  }
  
  return null;
}

/**
 * Pobiera Hero Specs dla kategorii
 */
export function getHeroSpecs(categorySlug: string): HeroSpecConfig[] {
  const config = getCategoryConfig(categorySlug);
  return config?.heroSpecs || [];
}

/**
 * Pobiera filtry dla kategorii
 */
export function getCategoryFilters(categorySlug: string): FilterConfig[] {
  const config = getCategoryConfig(categorySlug);
  return config?.filters || [];
}

/**
 * Pobiera klucz wariantów dla kategorii
 */
export function getVariantKey(categorySlug: string): string | null {
  const config = getCategoryConfig(categorySlug);
  return config?.variantKey || null;
}

/**
 * Formatuje wartość parametru z jednostką
 */
export function formatSpecValue(value: string | number, unit?: string): string {
  if (unit) {
    return `${value} ${unit}`;
  }
  return String(value);
}
// Build trigger 1781290822
// Force rebuild 1781292147
