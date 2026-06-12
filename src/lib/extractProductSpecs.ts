/**
 * extractProductSpecs — ekstrakcja parametrów technicznych z nazwy/opisu produktu
 * 
 * Każda kategoria ma inne kluczowe parametry:
 * - Izolacje: grubość, lambda, wymiary
 * - Tynki: granulacja, zużycie, typ
 * - Farby: pojemność, wydajność
 * - Płytki: format, grubość
 * - Sucha zabudowa: grubość, wymiary, typ
 * - Kleje: waga, klasa
 * - Dachy: wymiary, typ
 */

export type ExtractedSpec = {
  key: string;
  label: string;
  value: string;
  icon?: string;
  highlight?: boolean;
};

// ─── REGEX PATTERNS ─────────────────────────────────────────────────────────

const PATTERNS = {
  // Grubość: "150 mm", "10cm", "150mm"
  grubosc: /(\d+)\s*(mm|cm)\b/i,
  
  // Lambda: "031", "0,031", "0.031", "λ=0,031"
  lambda: /(?:lambda|λ|l)\s*[=:]?\s*0?[,.]?(\d{2,3})|(\d{3})\s*(?=\s|\/|$)/i,
  
  // Wymiary: "1200/600", "1200x600", "120×60"
  wymiary: /(\d{2,4})\s*[\/x×]\s*(\d{2,4})(?:\s*[\/x×]\s*(\d{2,4}))?/i,
  
  // Granulacja: "1,5 mm", "2.0mm", "ziarno 1,5"
  granulacja: /(?:granulacja|ziarno|ziarnisto[śc][ćc]?)\s*[=:]?\s*(\d[,.]?\d?)\s*mm|(\d[,.]?\d?)\s*mm\s*(?:ziarno|grain)/i,
  
  // Pojemność: "10 l", "2,5l", "15L"
  pojemnosc: /(\d+[,.]?\d*)\s*l(?:itr[óo]w?)?/i,
  
  // Waga opakowania: "25 kg", "20kg"
  waga: /(\d+)\s*kg\b/i,
  
  // Format płytek: "60x60", "30×60"
  format: /(\d{2,3})\s*[x×]\s*(\d{2,3})\s*(?:cm)?/i,
  
  // Wydajność: "10-12 m²/l", "8m2/l"
  wydajnosc: /(\d+(?:[,.-]\d+)?)\s*m[²2]?\s*\/\s*[lL]/i,
  
  // Zużycie: "2,5 kg/m²", "3-4 kg/m2"
  zuzycie: /(\d+[,.]?\d*(?:\s*-\s*\d+[,.]?\d*)?)\s*kg\s*\/\s*m[²2]/i,
  
  // Klasa kleju: C1, C2, C2S1, C2TE
  klasa: /\b(C[12](?:T?E?)?(?:S[12])?)\b/i,
  
  // Typ tynku: silikonowy, akrylowy, mineralny
  typ_tynku: /\b(silikonow[ya]|akrylow[ya]|mineraln[ya]|silikatow[ya]|mozaikow[ya])\b/i,
  
  // Typ izolacji: EPS, XPS, grafitowy, wełna
  typ_izolacji: /\b(EPS|XPS|grafit(?:owy)?|we[łl]na?\s*(?:skalna|szklana|mineralna)?|styropian)\b/i,
  
  // Typ płyty g-k: H2, GKB, GKBI, ognioodporna
  typ_plyty: /\b(GKB|GKBI?|GKF|H2|wodoodporn[ya]|ognioodporn[ya]|akustyczn[ya])\b/i,
  
  // Opakowanie m²: "2,16 m²", "opak. 3,6m2"
  powierzchnia_opak: /(\d+[,.]?\d*)\s*m[²2]/i,
};

// ─── CATEGORY SPEC DEFINITIONS ──────────────────────────────────────────────

type CategorySpecDef = {
  specs: Array<{
    key: keyof typeof PATTERNS;
    label: string;
    icon: string;
    highlight?: boolean;
    format?: (match: RegExpMatchArray, text: string) => string | null;
  }>;
};

const CATEGORY_SPECS: Record<string, CategorySpecDef> = {
  // ═══ IZOLACJE ═══
  "izolacje": {
    specs: [
      { key: "grubosc", label: "Grubość", icon: "📏", highlight: true, 
        format: (m) => m[2] === 'cm' ? `${m[1]} cm` : `${m[1]} mm` },
      { key: "lambda", label: "λ", icon: "🔥", highlight: true,
        format: (m) => {
          const val = m[1] || m[2];
          if (!val) return null;
          const num = parseInt(val);
          return num > 100 ? `0.0${val}` : `0.${val.padStart(3, '0')}`;
        }},
      { key: "wymiary", label: "Wymiary", icon: "📐",
        format: (m) => m[3] ? `${m[1]}×${m[2]}×${m[3]}` : `${m[1]}×${m[2]}` },
      { key: "typ_izolacji", label: "Typ", icon: "🏷️" },
    ],
  },
  
  "styropian": {
    specs: [
      { key: "grubosc", label: "Grubość", icon: "📏", highlight: true,
        format: (m) => m[2] === 'cm' ? `${m[1]} cm` : `${m[1]} mm` },
      { key: "lambda", label: "λ", icon: "🔥", highlight: true,
        format: (m) => {
          const val = m[1] || m[2];
          if (!val) return null;
          const num = parseInt(val);
          return num > 100 ? `0.0${val}` : `0.${val.padStart(3, '0')}`;
        }},
      { key: "typ_izolacji", label: "Typ", icon: "🏷️" },
    ],
  },
  // Aliasy styropianu
  "styropian-grafitowy": { specs: [] }, // fallback do "styropian"
  "styropian-bialy": { specs: [] },
  "styropian-fasadowy": { specs: [] },
  "styropian-podlogowy": { specs: [] },
  
  "welna-mineralna": {
    specs: [
      { key: "grubosc", label: "Grubość", icon: "📏", highlight: true,
        format: (m) => m[2] === 'cm' ? `${m[1]} cm` : `${m[1]} mm` },
      { key: "lambda", label: "λ", icon: "🔥", highlight: true,
        format: (m) => {
          const val = m[1] || m[2];
          if (!val) return null;
          return `0.${val.padStart(3, '0')}`;
        }},
      { key: "powierzchnia_opak", label: "Opak.", icon: "📦",
        format: (m) => `${m[1]} m²` },
    ],
  },
  // Aliasy wełny
  "welna-skalna": { specs: [] },
  "welna-szklana": { specs: [] },
  
  // ═══ CHEMIA BUDOWLANA ═══
  "chemia-budowlana": {
    specs: [
      { key: "waga", label: "Waga", icon: "⚖️", highlight: true,
        format: (m) => `${m[1]} kg` },
      { key: "zuzycie", label: "Zużycie", icon: "📊",
        format: (m) => `${m[1]} kg/m²` },
    ],
  },
  
  "tynki": {
    specs: [
      { key: "granulacja", label: "Ziarno", icon: "🔬", highlight: true,
        format: (m) => `${m[1] || m[2]} mm` },
      { key: "waga", label: "Waga", icon: "⚖️",
        format: (m) => `${m[1]} kg` },
      { key: "typ_tynku", label: "Typ", icon: "🏠" },
    ],
  },
  // Aliasy tynków
  "tynki-silikonowe": {
    specs: [
      { key: "granulacja", label: "Ziarno", icon: "🔬", highlight: true,
        format: (m) => `${m[1] || m[2]} mm` },
      { key: "waga", label: "Waga", icon: "⚖️",
        format: (m) => `${m[1]} kg` },
    ],
  },
  "tynki-akrylowe": {
    specs: [
      { key: "granulacja", label: "Ziarno", icon: "🔬", highlight: true,
        format: (m) => `${m[1] || m[2]} mm` },
      { key: "waga", label: "Waga", icon: "⚖️",
        format: (m) => `${m[1]} kg` },
    ],
  },
  "tynki-mineralne": {
    specs: [
      { key: "granulacja", label: "Ziarno", icon: "🔬", highlight: true,
        format: (m) => `${m[1] || m[2]} mm` },
      { key: "waga", label: "Waga", icon: "⚖️",
        format: (m) => `${m[1]} kg` },
    ],
  },
  "tynki-gipsowe": {
    specs: [
      { key: "waga", label: "Waga", icon: "⚖️", highlight: true,
        format: (m) => `${m[1]} kg` },
      { key: "zuzycie", label: "Zużycie", icon: "📊",
        format: (m) => `${m[1]} kg/m²` },
    ],
  },
  "tynki-mozaikowe": {
    specs: [
      { key: "waga", label: "Waga", icon: "⚖️", highlight: true,
        format: (m) => `${m[1]} kg` },
    ],
  },
  
  "kleje-budowlane": {
    specs: [
      { key: "waga", label: "Waga", icon: "⚖️", highlight: true,
        format: (m) => `${m[1]} kg` },
      { key: "klasa", label: "Klasa", icon: "🏆", highlight: true },
      { key: "zuzycie", label: "Zużycie", icon: "📊",
        format: (m) => `${m[1]} kg/m²` },
    ],
  },
  // Aliasy klejów
  "kleje-styropian": {
    specs: [
      { key: "waga", label: "Waga", icon: "⚖️", highlight: true,
        format: (m) => `${m[1]} kg` },
      { key: "zuzycie", label: "Zużycie", icon: "📊",
        format: (m) => `${m[1]} kg/m²` },
    ],
  },
  "kleje-do-plytek": {
    specs: [
      { key: "waga", label: "Waga", icon: "⚖️", highlight: true,
        format: (m) => `${m[1]} kg` },
      { key: "klasa", label: "Klasa", icon: "🏆", highlight: true },
    ],
  },
  "kleje-montazowe": {
    specs: [
      { key: "waga", label: "Waga", icon: "⚖️", highlight: true,
        format: (m) => `${m[1]} kg` },
    ],
  },
  
  // ═══ FARBY ═══
  "farby-i-rozpuszczalniki": {
    specs: [
      { key: "pojemnosc", label: "Poj.", icon: "🪣", highlight: true,
        format: (m) => `${m[1]} l` },
      { key: "wydajnosc", label: "Wydajność", icon: "📐",
        format: (m) => `${m[1]} m²/l` },
    ],
  },
  // Aliasy farb
  "farby-elewacyjne": {
    specs: [
      { key: "pojemnosc", label: "Poj.", icon: "🪣", highlight: true,
        format: (m) => `${m[1]} l` },
      { key: "wydajnosc", label: "Wydajność", icon: "📐",
        format: (m) => `${m[1]} m²/l` },
    ],
  },
  "farby-wewnetrzne": {
    specs: [
      { key: "pojemnosc", label: "Poj.", icon: "🪣", highlight: true,
        format: (m) => `${m[1]} l` },
    ],
  },
  
  // ═══ PŁYTKI ═══
  "plytki": {
    specs: [
      { key: "format", label: "Format", icon: "📐", highlight: true,
        format: (m) => `${m[1]}×${m[2]} cm` },
      { key: "grubosc", label: "Grubość", icon: "📏",
        format: (m) => `${m[1]} mm` },
    ],
  },
  
  // ═══ SUCHA ZABUDOWA ═══
  "sucha-zabudowa": {
    specs: [
      { key: "grubosc", label: "Grubość", icon: "📏", highlight: true,
        format: (m) => `${m[1]} mm` },
      { key: "wymiary", label: "Wymiary", icon: "📐",
        format: (m) => `${m[1]}×${m[2]}` },
      { key: "typ_plyty", label: "Typ", icon: "🔲" },
    ],
  },
  // Aliasy suchej zabudowy
  "plyty-gipsowo-kartonowe": {
    specs: [
      { key: "grubosc", label: "Grubość", icon: "📏", highlight: true,
        format: (m) => `${m[1]} mm` },
      { key: "wymiary", label: "Wymiary", icon: "📐",
        format: (m) => `${m[1]}×${m[2]}` },
    ],
  },
  
  // ═══ DACHY ═══
  "dachy": {
    specs: [
      { key: "wymiary", label: "Wymiary", icon: "📐", highlight: true,
        format: (m) => `${m[1]}×${m[2]}` },
      { key: "waga", label: "Waga", icon: "⚖️",
        format: (m) => `${m[1]} kg` },
    ],
  },
  
  // ═══ STROPY I ŚCIANY ═══
  "stropy-i-sciany": {
    specs: [
      { key: "wymiary", label: "Wymiary", icon: "📐", highlight: true,
        format: (m) => `${m[1]}×${m[2]}` },
      { key: "waga", label: "Waga", icon: "⚖️",
        format: (m) => `${m[1]} kg` },
    ],
  },
  
  // ═══ NARZĘDZIA ═══
  "narzedzia-i-mocowania": {
    specs: [
      { key: "wymiary", label: "Rozmiar", icon: "📏",
        format: (m) => `${m[1]}×${m[2]}` },
    ],
  },
};

// ─── MAIN EXTRACTION FUNCTION ───────────────────────────────────────────────

/**
 * Wyciąga parametry techniczne z nazwy i opisu produktu
 * na podstawie kategorii produktu
 */
export function extractProductSpecs(
  productName: string,
  productDescription: string | undefined,
  categorySlug: string | undefined
): ExtractedSpec[] {
  if (!categorySlug) return [];
  
  // Znajdź konfigurację dla kategorii (z fallback)
  let specDef = CATEGORY_SPECS[categorySlug];
  
  // Jeśli kategoria ma puste specs, szukaj parent
  if (!specDef || specDef.specs.length === 0) {
    // Fallback do parent kategorii (np. "tynki-silikonowe" → "tynki")
    const parts = categorySlug.split("-");
    for (let i = parts.length - 1; i > 0; i--) {
      const parentSlug = parts.slice(0, i).join("-");
      if (CATEGORY_SPECS[parentSlug] && CATEGORY_SPECS[parentSlug].specs.length > 0) {
        specDef = CATEGORY_SPECS[parentSlug];
        break;
      }
    }
  }
  
  // Jeśli nadal brak, fallback do głównych kategorii
  if (!specDef || specDef.specs.length === 0) {
    const mainCategories = ["izolacje", "chemia-budowlana", "farby-i-rozpuszczalniki", "plytki", "sucha-zabudowa", "dachy", "stropy-i-sciany", "narzedzia-i-mocowania"];
    for (const main of mainCategories) {
      if (categorySlug.includes(main.split("-")[0])) {
        specDef = CATEGORY_SPECS[main];
        if (specDef && specDef.specs.length > 0) break;
      }
    }
  }
  
  if (!specDef || specDef.specs.length === 0) return [];
  
  // Połącz nazwę i opis do przeszukania
  const searchText = `${productName} ${productDescription || ""}`;
  const results: ExtractedSpec[] = [];
  
  for (const spec of specDef.specs) {
    const pattern = PATTERNS[spec.key];
    if (!pattern) continue;
    
    const match = searchText.match(pattern);
    if (!match) continue;
    
    let value: string | null;
    if (spec.format) {
      value = spec.format(match, searchText);
    } else {
      value = match[1] || match[0];
    }
    
    if (value) {
      results.push({
        key: spec.key,
        label: spec.label,
        value,
        icon: spec.icon,
        highlight: spec.highlight,
      });
    }
    
    // Limit do 3 parametrów na karcie
    if (results.length >= 3) break;
  }
  
  return results;
}

/**
 * Pobiera slug kategorii z produktu
 */
export function getCategorySlugFromProduct(product: {
  categorySlug?: string;
  category?: string | { slug?: string; name?: string };
  breadcrumbs?: Array<{ slug?: string; name?: string }>;
}): string | undefined {
  // Bezpośrednio z categorySlug (główne źródło w Media Bud)
  if (product.categorySlug) {
    return product.categorySlug;
  }
  
  // Z breadcrumbs (pierwszy element to główna kategoria)
  if (product.breadcrumbs && product.breadcrumbs.length > 0) {
    return product.breadcrumbs[0].slug;
  }
  
  // Z category
  if (product.category) {
    if (typeof product.category === 'string') {
      return product.category.toLowerCase().replace(/\s+/g, '-');
    }
    return product.category.slug;
  }
  
  return undefined;
}
