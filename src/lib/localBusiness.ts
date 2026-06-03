/**
 * LocalBusiness JSON-LD — schema.org/HomeAndConstructionBusiness
 * Wstrzykiwany globalnie w Layout.tsx na każdej podstronie.
 * Źródło prawdy dla NAP (Name-Address-Phone) całej witryny.
 *
 * HomeAndConstructionBusiness → podtyp LocalBusiness właściwy
 * dla składów budowlanych, hurtowni materiałów budowlanych.
 */

const BASE_URL  = "https://mediabud.pl";
const ORG_ID    = `${BASE_URL}/#organization`;
const LOCAL_ID  = `${BASE_URL}/#localbusiness`;

export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    /* ── Organization (encja nadrzędna) ─────────────────────── */
    {
      "@type": "Organization",
      "@id": ORG_ID,
      "name": "Media Bud – Skład Budowlany",
      "alternateName": ["MediaBud", "Media Bud Lublin"],
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/images/logo-mediabud.png`,
        "width": 180,
        "height": 60,
      },
      "image": `${BASE_URL}/images/hero-materialy_2.png`,
      "telephone": "+48533553344",
      "email": "sprzedaz@mediabud.pl",
      "taxID": "9462743421",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ul. Chemiczna 8d",
        "addressLocality": "Lublin",
        "addressRegion": "lubelskie",
        "postalCode": "20-329",
        "addressCountry": "PL",
      },
      "sameAs": [
        "https://www.facebook.com/mediabud",
        "https://www.instagram.com/mediabud",
      ],
    },

    /* ── LocalBusiness / HomeAndConstructionBusiness ─────────── */
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": LOCAL_ID,
      "name": "Media Bud – Skład Budowlany Lublin",
      "description":
        "Profesjonalny skład budowlany w Lublinie. Oferujemy ponad 15 000 produktów: " +
        "materiały budowlane, izolacje, tynki, chemia budowlana, farby elewacyjne. " +
        "Doradztwo techniczne, dostawa na teren Lublina i województwa lubelskiego.",
      "url": BASE_URL,
      "telephone": "+48533553344",
      "email": "sprzedaz@mediabud.pl",
      "parentOrganization": { "@id": ORG_ID },

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ul. Chemiczna 8d",
        "addressLocality": "Lublin",
        "addressRegion": "lubelskie",
        "postalCode": "20-329",
        "addressCountry": "PL",
      },

      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.2375,
        "longitude": 22.6016,
      },

      "hasMap": "https://www.openstreetmap.org/?mlat=51.2375&mlon=22.6016#map=16/51.2375/22.6016",

      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:00",
          "closes": "16:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "07:00",
          "closes": "13:00",
        },
      ],

      "priceRange": "$$",
      "currenciesAccepted": "PLN",
      "paymentAccepted": "Cash, Invoice, Bank Transfer",

      "areaServed": [
        {
          "@type": "City",
          "name": "Lublin",
          "sameAs": "https://www.wikidata.org/wiki/Q102073",
        },
        {
          "@type": "AdministrativeArea",
          "name": "województwo lubelskie",
        },
      ],

      "knowsAbout": [
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
      ],

      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Katalog materiałów budowlanych Media Bud",
        "url": `${BASE_URL}/produkty`,
        "numberOfItems": 15000,
      },

      "sameAs": [
        "https://www.facebook.com/mediabud",
        "https://www.instagram.com/mediabud",
      ],
    },
  ],
} as const;
