/**
 * LocalBusiness JSON-LD — schema.org/HomeAndConstructionBusiness
 * Wstrzykiwany globalnie w Layout.tsx na każdej podstronie.
 * Źródło prawdy dla NAP (Name-Address-Phone) całej witryny.
 *
 * HomeAndConstructionBusiness → podtyp LocalBusiness właściwy
 * dla składów budowlanych, hurtowni materiałów budowlanych.
 *
 * NAP_* constants są eksportowane do page-level schemas (Pages.tsx itp.)
 * — jeden punkt zmiany, spójność bez duplikacji danych.
 */

const BASE_URL = "https://mediabud.pl";
const ORG_ID   = `${BASE_URL}/#organization`;
const LOCAL_ID = `${BASE_URL}/#localbusiness`;

/* ─────────────────────────────────────────────────────────────────
   NAP constants — importuj w page-level schemas
───────────────────────────────────────────────────────────────── */

export const NAP_ADDRESS = {
  "@type": "PostalAddress",
  "streetAddress": "ul. Chemiczna 8d",
  "addressLocality": "Lublin",
  "addressRegion": "lubelskie",
  "postalCode": "20-329",
  "addressCountry": "PL",
};

/** Weryfikowane współrzędne ul. Chemiczna 8d, 20-329 Lublin */
export const NAP_GEO = {
  "@type": "GeoCoordinates",
  "latitude": 51.2375,
  "longitude": 22.6016,
};

export const NAP_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "07:00",
    "closes": "16:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Saturday"],
    "opens": "07:00",
    "closes": "13:00",
  },
];

/** String format openingHours dla LocalBusiness (Google oczekuje tego formatu) */
export const NAP_HOURS_STRING = [
  "Mo-Fr 07:00-16:00",
  "Sa 07:00-13:00",
];

export const NAP_AREA_SERVED = [
  {
    "@type": "City",
    "name": "Lublin",
    "sameAs": "https://www.wikidata.org/wiki/Q102073",
  },
  {
    "@type": "AdministrativeArea",
    "name": "województwo lubelskie",
  },
];

/**
 * Profile zewnętrzne firmy.
 * TODO: uzupełnij o faktyczny link Google Maps Business Profile
 * oraz katalogi branżowe (panoramafirm.pl, aleo.com) po weryfikacji URL.
 */
export const NAP_SAME_AS = [
  "https://www.facebook.com/mediabud",
  "https://www.instagram.com/mediabud",
];

export const NAP_LOGO = {
  "@type": "ImageObject",
  "url": `${BASE_URL}/images/logo-mediabud-main.png`,
  "width": 180,
  "height": 60,
};

/** OG image — absolutny URL dla meta og:image */
export const NAP_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export const NAP_AMENITIES = [
  { "@type": "LocationFeatureSpecification", "name": "Parking bezpłatny",              "value": true },
  { "@type": "LocationFeatureSpecification", "name": "Wjazd dla pojazdów ciężarowych", "value": true },
  { "@type": "LocationFeatureSpecification", "name": "Faktura VAT",                     "value": true },
  { "@type": "LocationFeatureSpecification", "name": "Doradztwo techniczne",            "value": true },
  { "@type": "LocationFeatureSpecification", "name": "Dostawa na budowę",               "value": true },
];

export const NAP_CONTACT_POINT = {
  "@type": "ContactPoint",
  "telephone": "+48533553344",
  "email": "sprzedaz@mediabud.pl",
  "contactType": "sales",
  "availableLanguage": "Polish",
  "hoursAvailable": NAP_HOURS,
};

export const NAP_KNOWS_ABOUT = [
  "materiały budowlane",
  "izolacje termiczne",
  "systemy ETICS",
  "tynki elewacyjne",
  "chemia budowlana",
  "styropian fasadowy",
  "wełna mineralna",
  "kleje budowlane",
  "farby elewacyjne",
  "hydroizolacje",
  "płyty gipsowo-kartonowe",
  "hurtownia budowlana Lublin",
];

/* ─────────────────────────────────────────────────────────────────
   Główny graf JSON-LD — wstrzykiwany globalnie przez Layout.tsx
───────────────────────────────────────────────────────────────── */

export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [

    /* ── Organization (encja nadrzędna) ───────────────────────── */
    {
      "@type": "Organization",
      "@id": ORG_ID,
      "name": "Media Bud – Skład Budowlany",
      "legalName": "Media Bud",
      "alternateName": ["MediaBud", "Media Bud Lublin"],
      "url": BASE_URL,
      "logo": NAP_LOGO,
      "image": NAP_OG_IMAGE,
      "telephone": "+48533553344",
      "email": "sprzedaz@mediabud.pl",
      "taxID": "9462743421",
      "vatID": "9462743421",
      "foundingDate": "2008",
      "address": NAP_ADDRESS,
      "sameAs": NAP_SAME_AS,
    },

    /* ── LocalBusiness / HomeAndConstructionBusiness ──────────── */
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": LOCAL_ID,
      "name": "Media Bud – Skład Budowlany Lublin",
      "legalName": "Media Bud",
      "description":
        "Profesjonalny skład budowlany w Lublinie. Oferujemy ponad 15 000 produktów: " +
        "materiały budowlane, izolacje, tynki, chemia budowlana, farby elewacyjne. " +
        "Doradztwo techniczne, dostawa na teren Lublina i województwa lubelskiego.",
      "url": BASE_URL,
      "telephone": "+48533553344",
      "email": "sprzedaz@mediabud.pl",
      "taxID": "9462743421",
      "vatID": "9462743421",
      "foundingDate": "2008",
      "parentOrganization": { "@id": ORG_ID },

      "address": NAP_ADDRESS,
      "geo": NAP_GEO,
      "hasMap": "https://maps.google.com/maps?q=ul.+Chemiczna+8d,+20-329+Lublin",

      /* openingHours jako string (dla Google Rich Results) */
      "openingHours": NAP_HOURS_STRING,
      /* openingHoursSpecification dla pełnej specyfikacji schema.org */
      "openingHoursSpecification": NAP_HOURS,

      "priceRange": "$$",
      "currenciesAccepted": "PLN",
      "paymentAccepted": "Gotówka, przelew bankowy, karta płatnicza, faktura VAT",

      "areaServed": NAP_AREA_SERVED,
      "amenityFeature": NAP_AMENITIES,
      "contactPoint": NAP_CONTACT_POINT,
      "knowsAbout": NAP_KNOWS_ABOUT,

      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Katalog materiałów budowlanych Media Bud",
        "url": `${BASE_URL}/produkty`,
        "numberOfItems": 15000,
      },

      "sameAs": NAP_SAME_AS,
    },
  ],
};
