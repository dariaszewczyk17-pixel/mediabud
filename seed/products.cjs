var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var products_exports = {};
__export(products_exports, {
  getAllBrands: () => getAllBrands,
  getFeaturedProducts: () => getFeaturedProducts,
  getNewProducts: () => getNewProducts,
  getProductBySlug: () => getProductBySlug,
  getProductsByCategory: () => getProductsByCategory,
  getRelatedProducts: () => getRelatedProducts,
  products: () => products
});
module.exports = __toCommonJS(products_exports);
const products = [
  // ─── TYNKI ─────────────────────────────────────────────────────────────────
  {
    id: "p001",
    slug: "tynk-silikonowy-weber-pas-dr1",
    name: "Tynk silikonowy weber.pas DR1 15kg",
    categorySlug: "tynki-silikonowe",
    brand: "Weber",
    sku: "WEB-SIL-DR1-15",
    unit: "worek 15kg",
    shortDescription: "Gotowy tynk elewacyjny silikonowy o strukturze drapany/kornik, odporny na zabrudzenia.",
    description: "Weber.pas DR1 to gotowy do u\u017Cycia tynk silikonowy do elewacji. Charakteryzuje si\u0119 wysok\u0105 odporno\u015Bci\u0105 na zabrudzenia dzi\u0119ki w\u0142a\u015Bciwo\u015Bciom hydrofobowym oraz elastyczno\u015Bci\u0105 zapewniaj\u0105c\u0105 odporno\u015B\u0107 na mikrop\u0119kni\u0119cia. Doskona\u0142y do system\xF3w ociepleniowych ETICS. Dost\u0119pny w szerokiej gamie kolor\xF3w z mieszalnika.",
    application: "Elewacje budynk\xF3w mieszkalnych i komercyjnych. Stosowany jako warstwa wyko\u0144czeniowa w systemach ocieple\u0144 ETICS na styropianie i we\u0142nie mineralnej.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "2,5\u20133,5 kg/m\xB2 (ziarno 1,5mm)" },
      { label: "Granulacja", value: "1,5 mm lub 2,0 mm" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +25\xB0C" },
      { label: "Czas schni\u0119cia", value: "24\u201348 h" },
      { label: "Wydajno\u015B\u0107 opakowania", value: "ok. 5\u20136 m\xB2" }
    ],
    images: ["/images/products/p001-tynk_2.jpg"],
    tags: ["tynk silikonowy", "elewacja", "etics", "weber", "kornik", "drapany"],
    related: ["p002", "p003", "p010"],
    isFeatured: true
  },
  {
    id: "p011",
    slug: "tynk-gipsowy-knauf-goldband-25kg",
    name: "Tynk gipsowy Knauf Goldband 25kg",
    categorySlug: "tynki-gipsowe",
    brand: "Knauf",
    sku: "KNF-GB-25",
    unit: "worek 25kg",
    shortDescription: "Tynk gipsowy maszynowy i r\u0119czny do wn\u0119trz na mury i sufity. Wysoka bia\u0142a powierzchnia.",
    description: "Knauf Goldband to tynk gipsowy przeznaczony do r\u0119cznego i maszynowego wykonywania wypraw tynkarskich na \u015Bcianach i sufitach wewn\u0105trz budynk\xF3w. Produkt charakteryzuje si\u0119 bardzo dobr\u0105 przyczepno\u015Bci\u0105 do pod\u0142o\u017Cy mineralnych, \u0142atwo\u015Bci\u0105 obr\xF3bki i doskona\u0142\u0105 bia\u0142o\u015Bci\u0105 powierzchni. Mo\u017Cliwo\u015B\u0107 przykrycia bardzo du\u017Cych nier\xF3wno\u015Bci pod\u0142o\u017Ca.",
    application: "Tynkowanie \u015Bcian i sufit\xF3w wewn\u0105trz budynk\xF3w. Pod\u0142o\u017Ce: ceg\u0142a, beton, bloczki silikatowe i z betonu kom\xF3rkowego. Grubo\u015B\u0107 warstwy 8\u201350mm.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "8,5 kg/m\xB2 (przy 10 mm)" },
      { label: "Czas schni\u0119cia", value: "ok. 2 h (w zale\u017Cno\u015Bci od grubo\u015Bci)" },
      { label: "Grubo\u015B\u0107 warstwy", value: "8\u201350 mm" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +30\xB0C" },
      { label: "Spoiwo", value: "Gips" }
    ],
    images: ["/images/products/p011-tynk-gipsowy_2.jpg"],
    tags: ["tynk gipsowy", "knauf", "goldband", "wn\u0119trze", "maszynowy", "r\u0119czny"],
    related: ["p006", "p005", "p022"],
    isFeatured: true
  },
  {
    id: "p012",
    slug: "tynk-mineralny-weber-pas-ma-25kg",
    name: "Tynk mineralny weber.pas MA 25kg",
    categorySlug: "tynki-mineralne",
    brand: "Weber",
    sku: "WEB-MA-25",
    unit: "worek 25kg",
    shortDescription: "Mineralny tynk elewacyjny do elewacji w systemach ETICS i na pod\u0142o\u017Cach mineralnych.",
    description: "Weber.pas MA to suchy, mineralny tynk elewacyjny do stosowania jako warstwa dekoracyjno-ochronna w systemach ocieple\u0144 ETICS oraz bezpo\u015Brednio na pod\u0142o\u017Cach mineralnych. Po na\u0142o\u017Ceniu i zatarciu uzyskuje struktur\u0119 mozaikow\u0105 lub drapany. Produkt odznacza si\u0119 wysok\u0105 paroprzepuszczalno\u015Bci\u0105 i odporno\u015Bci\u0105 na czynniki atmosferyczne.",
    application: "Elewacje w systemach ETICS na styropianie i we\u0142nie mineralnej. Bezpo\u015Brednie tynkowanie pod\u0142o\u017Cy mineralnych (beton, ceg\u0142a, bloczki). Tynkowanie r\u0119czne.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "2,8\u20134,5 kg/m\xB2" },
      { label: "Granulacja", value: "1,5 mm lub 2,0 mm" },
      { label: "Czas schni\u0119cia", value: "24\u201348 h" },
      { label: "Paroprzepuszczalno\u015B\u0107", value: "sd \u2264 0,014 m" },
      { label: "Klasa reakcji na ogie\u0144", value: "A1" }
    ],
    images: ["/images/products/p012-tynk-mineralny_2.jpg"],
    tags: ["tynk mineralny", "elewacja", "etics", "weber", "paroprzepuszczalny"],
    related: ["p001", "p005", "p002"]
  },
  // ─── KLEJE ─────────────────────────────────────────────────────────────────
  {
    id: "p002",
    slug: "klej-do-styropianu-atlas-stopter-k-20",
    name: "Klej do styropianu Atlas Stopter K-20 25kg",
    categorySlug: "kleje-styropian",
    brand: "Atlas",
    sku: "ATL-K20-25",
    unit: "worek 25kg",
    shortDescription: "Zaprawa klej\u0105ca do przyklejania styropianu i wykonywania warstwy zbrojonej w systemach ETICS.",
    description: "Atlas Stopter K-20 to specjalistyczna zaprawa klej\u0105ca przeznaczona do przyklejania p\u0142yt styropianowych i we\u0142ny mineralnej oraz do wykonywania warstwy zbrojonej siatk\u0105 w systemach ETICS. Produkt charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105 i elastyczno\u015Bci\u0105.",
    application: "Przyklejanie p\u0142yt styropianowych i we\u0142ny mineralnej. Wykonywanie warstwy zbroj\u0105cej w systemach ETICS.",
    technicalSpec: [
      { label: "Zu\u017Cycie (klejenie)", value: "4\u20136 kg/m\xB2" },
      { label: "Zu\u017Cycie (warstwa zbrojona)", value: "4\u20135 kg/m\xB2" },
      { label: "Czas schni\u0119cia", value: "min. 3 dni przed dalszymi pracami" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +25\xB0C" },
      { label: "Mrozoodporno\u015B\u0107", value: "Tak, po pe\u0142nym wi\u0105zaniu" }
    ],
    images: ["/images/products/p002-klej_2.jpg"],
    tags: ["klej styropian", "etics", "atlas", "warstwa zbrojona", "ocieplenie"],
    related: ["p001", "p003", "p004"],
    isFeatured: true
  },
  {
    id: "p015",
    slug: "klej-do-plytek-ceresit-cm11-25kg",
    name: "Klej do p\u0142ytek Ceresit CM 11 25kg",
    categorySlug: "kleje-glazura",
    brand: "Ceresit",
    sku: "CRS-CM11-25",
    unit: "worek 25kg",
    shortDescription: "Standardowy klej cementowy do p\u0142ytek ceramicznych na \u015Bciany i pod\u0142ogi wewn\u0105trz i na zewn\u0105trz.",
    description: "Ceresit CM 11 to standardowy klej cementowy przeznaczony do przyklejania p\u0142ytek ceramicznych na pod\u0142o\u017Cach mineralnych wewn\u0105trz i na zewn\u0105trz budynk\xF3w. Produkt wyr\xF3\u017Cnia si\u0119 dobr\u0105 przyczepno\u015Bci\u0105 do pod\u0142o\u017Ca i p\u0142ytek, \u0142atwo\u015Bci\u0105 mieszania oraz d\u0142ugim czasem otwartym. Certyfikowany wg EN 12004.",
    application: "Przyklejanie p\u0142ytek ceramicznych, gresu i kamienia naturalnego do pod\u0142o\u017Ca betonowego, cementowego, gipsowego i GK wewn\u0105trz budynk\xF3w. Zastosowanie zewn\u0119trzne na elewacjach.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "ok. 3\u20134 kg/m\xB2 (przy z\u0119bach 6mm)" },
      { label: "Czas otwarty", value: "ok. 20 min" },
      { label: "Czas korekty", value: "ok. 10 min" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +25\xB0C" },
      { label: "Klasa wg EN 12004", value: "C1T" }
    ],
    images: ["/images/products/p015-klej-plytek_2.jpg"],
    tags: ["klej do p\u0142ytek", "ceramika", "ceresit", "cm11", "glazura", "gres"],
    related: ["p016", "p024", "p025"],
    isFeatured: true
  },
  // ─── GIPSY I GŁADZIE ──────────────────────────────────────────────────────
  {
    id: "p006",
    slug: "gladz-gipsowa-knauf-multifinish-20kg",
    name: "G\u0142ad\u017A gipsowa Knauf Multifinish 20kg",
    categorySlug: "gladzie-proszek",
    brand: "Knauf",
    sku: "KNF-MUL-20",
    unit: "worek 20kg",
    shortDescription: "G\u0142ad\u017A gipsowa do wewn\u0119trznych prac szpachlarskich, doskonale bia\u0142a.",
    description: "Knauf Multifinish to wysokiej jako\u015Bci g\u0142ad\u017A gipsowa do wykonywania cienkich warstw wyg\u0142adzaj\u0105cych na tynkach gipsowych, cementowych i gipsowo-kartonowych. Gwarantuje doskonale g\u0142adk\u0105, bia\u0142\u0105 powierzchni\u0119 gotow\u0105 do malowania.",
    application: "Wyg\u0142adzanie i szpachlowanie powierzchni wewn\u0119trznych: \u015Bcian i sufit\xF3w. Wype\u0142nianie nier\xF3wno\u015Bci na tynkach gipsowych, cementowych i p\u0142ytach GK.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "1,2\u20131,8 kg/m\xB2/mm" },
      { label: "Grubo\u015B\u0107 warstwy", value: "0,5\u20133 mm" },
      { label: "Czas otwarty", value: "ok. 45 min" },
      { label: "Czas schni\u0119cia", value: "3\u20135 h" },
      { label: "Spoiwo", value: "Gips" }
    ],
    images: ["/images/products/p006-gladz_2.jpg"],
    tags: ["g\u0142ad\u017A gipsowa", "knauf", "multifinish", "szpachlowanie", "wyko\u0144czenie"],
    related: ["p007", "p008", "p005"]
  },
  // ─── GRUNTY ────────────────────────────────────────────────────────────────
  {
    id: "p005",
    slug: "grunt-gruntujacy-ceresit-ct-17",
    name: "Grunt g\u0142\u0119boko penetruj\u0105cy Ceresit CT 17 10L",
    categorySlug: "grunty-pod-tynki",
    brand: "Ceresit",
    sku: "CRS-CT17-10",
    unit: "kanister 10L",
    shortDescription: "Grunt g\u0142\u0119boko penetruj\u0105cy pod tynki mineralne, akrylowe, silikonowe i silikatowe.",
    description: "Ceresit CT 17 to grunt g\u0142\u0119boko penetruj\u0105cy przeznaczony do gruntowania ch\u0142onnych pod\u0142o\u017Cy przed aplikacj\u0105 tynk\xF3w organicznych i mineralnych. Doskonale wyr\xF3wnuje ch\u0142onno\u015B\u0107 pod\u0142o\u017Ca i poprawia przyczepno\u015B\u0107 tynku.",
    application: "Gruntowanie pod\u0142o\u017Cy przed aplikacj\u0105 tynk\xF3w elewacyjnych. Stosowa\u0107 na beton, tynki cementowo-wapienne, beton kom\xF3rkowy, ceg\u0142\u0119.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "100\u2013200 ml/m\xB2" },
      { label: "Wydajno\u015B\u0107 10L", value: "50\u2013100 m\xB2" },
      { label: "Czas schni\u0119cia", value: "ok. 4\u20136 h" },
      { label: "Baza", value: "Wodna dyspersja polimer\xF3w" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +25\xB0C" }
    ],
    images: ["/images/products/p005-grunt_2.jpg"],
    tags: ["grunt", "ceresit", "ct17", "penetruj\u0105cy", "pod\u0142o\u017Ce", "tynk"],
    related: ["p001", "p002", "p006"]
  },
  // ─── PIANY I USZCZELNIACZE ────────────────────────────────────────────────
  {
    id: "p009",
    slug: "piana-montazowa-hilti-cf-812-825ml",
    name: "Piana monta\u017Cowa pistoletowa Hilti CF 812 825ml",
    categorySlug: "piany-pistoletowe",
    brand: "Hilti",
    sku: "HLT-CF812-825",
    unit: "pistolet 825ml",
    shortDescription: "Jednosk\u0142adnikowa piana poliuretanowa pistoletowa do uszczelniania i monta\u017Cu.",
    description: "Hilti CF 812 to profesjonalna jednosk\u0142adnikowa piana poliuretanowa pistoletowa. Charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105 do wi\u0119kszo\u015Bci materia\u0142\xF3w budowlanych i wysok\u0105 elastyczno\u015Bci\u0105. Idealna do uszczelniania szczelin monta\u017Cowych okien i drzwi.",
    application: "Mocowanie i uszczelnianie okien, drzwi i o\u015Bcie\u017Cnic. Wype\u0142nianie otwor\xF3w i szczelin. Izolacja termiczna i akustyczna.",
    technicalSpec: [
      { label: "Obj\u0119to\u015B\u0107 naczynia", value: "825 ml" },
      { label: "Wydajno\u015B\u0107", value: "ok. 70 L (po ekspansji)" },
      { label: "Czas schni\u0119cia (powierzchniowe)", value: "ok. 10 min" },
      { label: "Czas pe\u0142nego utwardzenia", value: "ok. 4 h" },
      { label: "Temperatura aplikacji", value: "od -10\xB0C do +35\xB0C" }
    ],
    images: ["/images/products/p009-piana_2.jpg"],
    tags: ["piana monta\u017Cowa", "hilti", "pistoletowa", "okna", "drzwi", "uszczelnienie"],
    related: ["p020", "p006"]
  },
  {
    id: "p020",
    slug: "silikon-sanitarny-ceresit-cs25-bialy-310ml",
    name: "Silikon sanitarny Ceresit CS 25 Bia\u0142y 310ml",
    categorySlug: "silikony-sanitarne",
    brand: "Ceresit",
    sku: "CRS-CS25-B-310",
    unit: "tuba 310ml",
    shortDescription: "Neutralny silikon sanitarny do uszczelniania po\u0142\u0105cze\u0144 w \u0142azienkach i kuchniach.",
    description: "Ceresit CS 25 to neutralny, silikonowy uszczelniacz sanitarny o doskona\u0142ej przyczepno\u015Bci do ceramiki, emaliowanych wanien, umywalek, luster i stali nierdzewnej. Zawiera \u015Brodek grzybob\xF3jczy chroni\u0105cy przed ple\u015Bni\u0105 i algami. Odporny na detergenty i \u015Brodki czysto\u015Bci.",
    application: "Uszczelnianie po\u0142\u0105cze\u0144 w \u0142azienkach, kuchniach, WC. Fugowanie po\u0142\u0105cze\u0144 ceramiki, wanien, prysznic\xF3w. Uszczelnianie z\u0142\u0105czy w wilgotnych pomieszczeniach.",
    technicalSpec: [
      { label: "Kolor", value: "Bia\u0142y (dost\u0119pny te\u017C: szary, be\u017Cowy, br\u0105zowy)" },
      { label: "Czas utwardzania powierzchni", value: "ok. 30 min" },
      { label: "Pe\u0142ne utwardzenie", value: "ok. 24 h" },
      { label: "Temperatura stosowania", value: "-40\xB0C do +150\xB0C" },
      { label: "Ochrona antygrzybicza", value: "Tak" }
    ],
    images: ["/images/products/p020-silikon-sanitarny_2.jpg"],
    tags: ["silikon sanitarny", "ceresit", "cs25", "\u0142azienka", "uszczelnienie", "bia\u0142y"],
    related: ["p009", "p007", "p006"]
  },
  // ─── IZOLACJE ──────────────────────────────────────────────────────────────
  {
    id: "p003",
    slug: "styropian-fasadowy-eps-100-swisspor",
    name: "Styropian fasadowy EPS 100-038 Swisspor 10cm 0,5m\xB3",
    categorySlug: "styropian-fasadowy-eps",
    brand: "Swisspor",
    sku: "SWS-EPS100-10",
    unit: "paczka 0,5m\xB3",
    shortDescription: "Styropian fasadowy EPS 100 o grubo\u015Bci 10cm do izolacji termicznej elewacji.",
    description: "Styropian fasadowy Swisspor EPS 100-038 to produkt do izolacji termicznej elewacji budynk\xF3w w systemach ETICS. Wyr\xF3\u017Cnia si\u0119 doskona\u0142ym wsp\xF3\u0142czynnikiem \u03BB=0,038 W/(m\xB7K) i stabilno\u015Bci\u0105 wymiarow\u0105.",
    application: "Izolacja termiczna elewacji budynk\xF3w w systemach ETICS.",
    technicalSpec: [
      { label: "Lambda (\u03BB)", value: "0,038 W/(m\xB7K)" },
      { label: "Grubo\u015B\u0107", value: "10 cm (dost\u0119pne: 5-25 cm)" },
      { label: "Wymiar p\u0142yty", value: "100 x 50 cm" },
      { label: "Klasa reakcji na ogie\u0144", value: "E" },
      { label: "Napr\u0119\u017Cenie \u015Bciskaj\u0105ce", value: "CS(10)100 kPa" }
    ],
    images: ["/images/products/p003-styropian_2.jpg"],
    tags: ["styropian", "eps 100", "fasada", "ocieplenie", "swisspor", "etics"],
    related: ["p002", "p004", "p005"],
    isFeatured: true
  },
  {
    id: "p004",
    slug: "welna-fasadowa-rockwool-frontrock-max-e",
    name: "We\u0142na fasadowa Rockwool Frontrock MAX E 15cm m\xB2",
    categorySlug: "welna-fasadowa",
    brand: "Rockwool",
    sku: "RCK-FRE-15",
    unit: "m\xB2",
    shortDescription: "We\u0142na mineralna do izolacji fasad w systemach ETICS. Klasa reakcji na ogie\u0144 A1.",
    description: "Rockwool Frontrock MAX E to we\u0142na mineralna skalna do izolacji elewacji w systemach ETICS. Dwuwarstwowa budowa u\u0142atwia monta\u017C. Klasa A1 gwarantuje najwy\u017Csze bezpiecze\u0144stwo po\u017Carowe.",
    application: "Izolacja termiczna i akustyczna elewacji w systemach ETICS. Szczeg\xF3lnie dla budynk\xF3w o podwy\u017Cszonych wymaganiach po\u017Carowych.",
    technicalSpec: [
      { label: "Lambda (\u03BB)", value: "0,036 W/(m\xB7K)" },
      { label: "Grubo\u015B\u0107", value: "15 cm (dost\u0119pne: 8-25 cm)" },
      { label: "Wymiar p\u0142yty", value: "100 x 60 cm" },
      { label: "Klasa reakcji na ogie\u0144", value: "A1 (niepalna)" },
      { label: "Napr\u0119\u017Cenie \u015Bciskaj\u0105ce", value: "\u2265 15 kPa" }
    ],
    images: ["/images/products/p004-welna_2.jpg"],
    tags: ["we\u0142na fasadowa", "rockwool", "frontrock", "etics", "a1", "izolacja"],
    related: ["p002", "p003", "p005"],
    isFeatured: true
  },
  {
    id: "p007",
    slug: "hydroizolacja-bitumiczna-ceresit-cr-65",
    name: "Hydroizolacja mineralna Ceresit CR 65 25kg",
    categorySlug: "hydroizolacje-mineralne",
    brand: "Ceresit",
    sku: "CRS-CR65-25",
    unit: "worek 25kg",
    shortDescription: "Sztywna uszczelniaj\u0105ca zaprawa mineralna do hydroizolacji fundament\xF3w i piwnic.",
    description: "Ceresit CR 65 to mineralna sztywna zaprawa uszczelniaj\u0105ca do hydroizolacji podziemnych cz\u0119\u015Bci budynk\xF3w. Zapewnia skuteczn\u0105 ochron\u0119 przed wod\u0105 pod ci\u015Bnieniem i agresywn\u0105 wod\u0105 gruntow\u0105.",
    application: "Uszczelnianie fundament\xF3w, \u015Bcian piwnic, zbiornik\xF3w na wod\u0119, basen\xF3w. Ochrona przed wod\u0105 pod ci\u015Bnieniem hydrostatycznym.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "2\u20134 kg/m\xB2 (na 2 warstwy)" },
      { label: "Ci\u015Bnienie wody", value: "do 1,5 bar (z pozytywnej strony)" },
      { label: "Grubo\u015B\u0107 warstwy", value: "min. 2 mm (2 warstwy)" },
      { label: "Czas schni\u0119cia", value: "24\u201348 h" },
      { label: "Klasa wodoodporno\u015Bci", value: "W8" }
    ],
    images: ["/images/products/p007-hydroizolacja_2.jpg"],
    tags: ["hydroizolacja", "ceresit", "cr65", "fundament", "piwnica", "uszczelnienie"],
    related: ["p005", "p013", "p003"]
  },
  {
    id: "p010",
    slug: "siatka-elewacyjna-vertex-r131",
    name: "Siatka elewacyjna Vertex R131 160g 1x50m",
    categorySlug: "akcesoria-izolacji",
    brand: "Vertex",
    sku: "VTX-R131-50",
    unit: "rolka 50mb",
    shortDescription: "Siatka zbroj\u0105ca do system\xF3w ocieple\u0144 ETICS, 160g/m\xB2, oka 4x4mm.",
    description: "Vertex R131 to siatka z w\u0142\xF3kna szklanego pokryta alkalioodporn\u0105 pow\u0142ok\u0105, stosowana jako zbrojenie warstwy kleju w systemach ocieple\u0144 ETICS.",
    application: "Zbrojenie warstwy kleju w systemach ETICS na styropianie i we\u0142nie mineralnej.",
    technicalSpec: [
      { label: "Masa powierzchniowa", value: "160 g/m\xB2" },
      { label: "Wymiar oka", value: "4 x 4 mm" },
      { label: "Szeroko\u015B\u0107 rolki", value: "1 m" },
      { label: "D\u0142ugo\u015B\u0107 rolki", value: "50 m" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na rozci\u0105ganie", value: "\u2265 40 kN/m" }
    ],
    images: ["/images/products/p010-siatka_2.jpg"],
    tags: ["siatka elewacyjna", "vertex", "etics", "zbrojenie", "w\u0142\xF3kno szklane"],
    related: ["p002", "p003", "p004"]
  },
  {
    id: "p029",
    slug: "membrana-paroprzepuszczalna-delta-vent-n",
    name: "Membrana dachowa DELTA-VENT N 1,5x50m 150g",
    categorySlug: "folie-paroprzepuszczalne",
    brand: "D\xF6rken",
    sku: "DRK-DVN-150",
    unit: "rolka 75m\xB2",
    shortDescription: "Wysokoparoprzepuszczalna membrana dachowa do stosowania na krokwiach dach\xF3w sko\u015Bnych.",
    description: "DELTA-VENT N to tr\xF3jwarstwowa membrana dachowa o bardzo wysokiej paroprzepuszczalno\u015Bci (Sd \u2264 0,02 m). Stosowana na krokwiach dach\xF3w sko\u015Bnych jako warstwa wiatroizolacyjna i przeciwdeszczowa. Produkt charakteryzuje si\u0119 wysok\u0105 wytrzyma\u0142o\u015Bci\u0105 mechaniczn\u0105 i odporno\u015Bci\u0105 na UV przez czas monta\u017Cu.",
    application: "Pokrycie dach\xF3w sko\u015Bnych z pokoryciem dachowym. Stosowana bezpo\u015Brednio na krokwiach lub na deskowaniu. Chroni izolacj\u0119 termiczn\u0105 przed wilgoci\u0105 i wiatrem.",
    technicalSpec: [
      { label: "Masa powierzchniowa", value: "150 g/m\xB2" },
      { label: "Paroprzepuszczalno\u015B\u0107 Sd", value: "\u2264 0,02 m" },
      { label: "Szeroko\u015B\u0107 rolki", value: "1,5 m" },
      { label: "D\u0142ugo\u015B\u0107 rolki", value: "50 m" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na rozci\u0105ganie", value: "> 250/200 N/5cm" },
      { label: "Klasa reakcji na ogie\u0144", value: "E" }
    ],
    images: ["/images/products/p029-membrana_2.jpg"],
    tags: ["membrana dachowa", "paroprzepuszczalna", "d\xF6rken", "delta", "dach sko\u015Bny"],
    related: ["p030", "p004", "p003"]
  },
  // ─── FARBY ─────────────────────────────────────────────────────────────────
  {
    id: "p008",
    slug: "farba-elewacyjna-caparol-silikoncolor-10l",
    name: "Farba elewacyjna silikonowa Caparol SiliconColor 10L",
    categorySlug: "farby-elaw-silikonowe",
    brand: "Caparol",
    sku: "CAP-SIL-10",
    unit: "wiadro 10L",
    shortDescription: "Silikonowa farba elewacyjna z zabezpieczeniem przed algami i grzybami.",
    description: "Caparol SiliconColor to wysokiej jako\u015Bci silikonowa farba elewacyjna o doskona\u0142ych w\u0142a\u015Bciwo\u015Bciach odpychania wody i brudu. Zapewnia d\u0142ugotrwa\u0142\u0105 ochron\u0119 przed czynnikami atmosferycznymi.",
    application: "Malowanie nowych i renowacja starych elewacji budynk\xF3w na zewn\u0105trz.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "100\u2013150 ml/m\xB2 (jedna warstwa)" },
      { label: "Wydajno\u015B\u0107 10L", value: "60\u2013100 m\xB2" },
      { label: "Czas schni\u0119cia (dotyk)", value: "ok. 30 min" },
      { label: "Czas przeschni\u0119cia", value: "ok. 4 h" },
      { label: "Odporno\u015B\u0107 na algii i grzyby", value: "Tak" }
    ],
    images: ["/images/products/p008-farba_2.jpg"],
    tags: ["farba elewacyjna", "silikonowa", "caparol", "ochrona", "algi", "elewacja"],
    related: ["p001", "p005", "p009"],
    isFeatured: true
  },
  {
    id: "p017",
    slug: "farba-wewnetrzna-biala-dulux-10l",
    name: "Farba wewn\u0119trzna bia\u0142a Dulux Jedwabisty Matt 10L",
    categorySlug: "farby-biale",
    brand: "Dulux",
    sku: "DLX-JM-10W",
    unit: "wiadro 10L",
    shortDescription: "Bia\u0142a farba emulsyjna wewn\u0119trzna o jedwabistym macie. Odporna na szorowanie.",
    description: "Dulux Jedwabisty Matt to wysokiej jako\u015Bci farba emulsyjna do \u015Bcian i sufit\xF3w wewn\u0105trz pomieszcze\u0144. Tworzy przyjemn\u0105 w dotyku, jedwabist\u0105 matow\u0105 powierzchni\u0119 odporn\u0105 na szorowanie. Doskonale kryje \u2013 wystarcz\u0105 2 warstwy. Zawiera technologi\u0119 Stain Block chroni\u0105c\u0105 przed przenikaniem plam.",
    application: "Malowanie \u015Bcian i sufit\xF3w w salonach, sypialniach, korytarzach i kuchniach. Pod\u0142o\u017Ce: tynk, beton, GK, ceg\u0142a. Temperatura aplikacji min. +8\xB0C.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "ok. 100\u2013130 ml/m\xB2" },
      { label: "Wydajno\u015B\u0107 10L", value: "75\u2013100 m\xB2" },
      { label: "Czas schni\u0119cia (dotyk)", value: "ok. 30\u201360 min" },
      { label: "Ponowne malowanie", value: "po ok. 4 h" },
      { label: "Po\u0142ysk", value: "Jedwabisty mat (ok. 10% po\u0142ysku)" }
    ],
    images: ["/images/products/p017-farba-biala_2.jpg"],
    tags: ["farba bia\u0142a", "dulux", "emulsyjna", "wn\u0119trze", "jedwabisty mat"],
    related: ["p018", "p006", "p005"],
    isNew: true
  },
  {
    id: "p018",
    slug: "farba-lateksowa-caparol-amphibolin-10l",
    name: "Farba lateksowa Caparol Amphibolin 10L",
    categorySlug: "farby-kolorowe",
    brand: "Caparol",
    sku: "CAP-AMP-10",
    unit: "wiadro 10L",
    shortDescription: "Farba lateksowa do \u015Bcian i sufit\xF3w wewn\u0105trz i na zewn\u0105trz. Wysoka odporno\u015B\u0107 na zmywanie.",
    description: "Caparol Amphibolin to uniwersalna farba lateksowa przeznaczona do malowania \u015Bcian i sufit\xF3w wewn\u0105trz i na zewn\u0105trz budynk\xF3w. Wyr\xF3\u017Cnia si\u0119 wysok\u0105 odporno\u015Bci\u0105 na zmywanie i szorowanie, doskona\u0142\u0105 kryj\u0105c\u0105 zdolno\u015Bci\u0105 i paroprzepuszczalno\u015Bci\u0105. Dost\u0119pna w pe\u0142nej palecie kolor\xF3w RAL.",
    application: "Malowanie \u015Bcian i sufit\xF3w wewn\u0119trznych i zewn\u0119trznych. Tynki mineralne, cementowe, wapienne. Doskona\u0142a do pomieszcze\u0144 o podwy\u017Cszonej wilgotno\u015Bci.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "100\u2013150 ml/m\xB2" },
      { label: "Wydajno\u015B\u0107 10L", value: "65\u2013100 m\xB2" },
      { label: "Klasa odporno\u015Bci na zmywanie", value: "Klasa 2 (EN 13300)" },
      { label: "Czas schni\u0119cia (dotyk)", value: "ok. 30 min" },
      { label: "Baza", value: "Wodna dyspersja kopolimeru VAC/E" }
    ],
    images: ["/images/products/p018-farba-lateksowa_2.jpg"],
    tags: ["farba lateksowa", "caparol", "amphibolin", "wn\u0119trze", "zewn\u0119trze", "kolory"],
    related: ["p017", "p008", "p005"],
    isNew: true
  },
  {
    id: "p019",
    slug: "lakier-do-drewna-sadolin-extra-25l",
    name: "Lakier do drewna Sadolin Extra 2,5L Bezbarwny",
    categorySlug: "lakiery-drewno",
    brand: "Sadolin",
    sku: "SDL-EXT-25B",
    unit: "puszka 2,5L",
    shortDescription: "Alkidowy lakier do drewna wewn\u0105trz i na zewn\u0105trz. Wysoka odporno\u015B\u0107 na warunki atmosferyczne.",
    description: "Sadolin Extra to wysokiej jako\u015Bci alkidowy lakier do drewna przeznaczony do stosowania wewn\u0105trz i na zewn\u0105trz budynk\xF3w. Tworzy tward\u0105, b\u0142yszcz\u0105c\u0105 powierzchni\u0119 odporn\u0105 na \u015Bcieranie, wilgo\u0107 i zmiany temperatury. Doskona\u0142y na okna, drzwi, meble ogrodowe i inne drewniane elementy.",
    application: "Lakierowanie drewna wewn\u0105trz i na zewn\u0105trz. Okna, drzwi, pod\u0142ogi, meble drewniane. Nak\u0142ada\u0107 szczotk\u0105 lub wa\u0142kiem na szlifowane i oczyszczone drewno.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "ok. 10\u201312 m\xB2/L" },
      { label: "Czas schni\u0119cia (dotyk)", value: "ok. 2\u20134 h" },
      { label: "Czas mi\u0119dzy warstwami", value: "12\u201324 h" },
      { label: "Po\u0142ysk", value: "Wysoki po\u0142ysk / mat / p\xF3\u0142mat" },
      { label: "Baza", value: "Alkidowa (rozpuszczalnikowa)" }
    ],
    images: ["/images/products/p019-lakier-drewno_2.jpg"],
    tags: ["lakier drewno", "sadolin", "extra", "bezbarwny", "okna", "drzwi"],
    related: ["p033", "p008", "p005"]
  },
  {
    id: "p033",
    slug: "impregnat-do-drewna-sadolin-classic-25l",
    name: "Impregnat do drewna Sadolin Classic 2,5L",
    categorySlug: "impregnaty-drewno",
    brand: "Sadolin",
    sku: "SDL-CLS-25",
    unit: "puszka 2,5L",
    shortDescription: "Elastyczny impregnat ochronno-dekoracyjny do drewna zewn\u0119trznego.",
    description: "Sadolin Classic to elastyczny, ochronno-dekoracyjny impregnat do drewna zewn\u0119trznego. G\u0142\u0119boko penetruje w drewno, chroni\u0105c je przed gniciem, ple\u015Bni\u0105 i szkodnikami. Jednocze\u015Bnie pozwala drewnu naturalnie oddycha\u0107 i pracowa\u0107 bez p\u0119kni\u0119\u0107 i z\u0142uszczenia pow\u0142oki.",
    application: "Ochrona i dekoracja drewna zewn\u0119trznego: okleiny elewacyjne, deski tarasowe, altany, ogrodzenia, meble ogrodowe. Nie do pod\u0142\xF3g i schod\xF3w.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "ok. 8\u201312 m\xB2/L" },
      { label: "Czas schni\u0119cia (dotyk)", value: "ok. 2 h" },
      { label: "Ponowne powlekanie", value: "po ok. 4 h" },
      { label: "Ochrona przed grzybami", value: "Tak \u2013 EN 152" },
      { label: "Dost\u0119pne kolory", value: "Tek, Palisander, Orzech, Zielony itp." }
    ],
    images: ["/images/products/p033-impregnat-drewno_2.jpg"],
    tags: ["impregnat drewno", "sadolin", "classic", "elewacja drewniana", "ochrona"],
    related: ["p019", "p008"]
  },
  // ─── SUCHA ZABUDOWA ────────────────────────────────────────────────────────
  {
    id: "p021",
    slug: "plyta-gk-knauf-white-125mm",
    name: "P\u0142yta gipsowo-kartonowa Knauf White 12,5mm 1,2x2,6m",
    categorySlug: "plyty-gipsowo-kartonowe",
    brand: "Knauf",
    sku: "KNF-GKB-1226",
    unit: "p\u0142yta 3,12m\xB2",
    shortDescription: "Standardowa p\u0142yta GK do \u015Bcian i sufit\xF3w w suchej zabudowie. Wymiar 1200x2600mm.",
    description: "Knauf White to standardowa p\u0142yta gipsowo-kartonowa do stosowania w suchej zabudowie wn\u0119trz. Przeznaczona do budowy \u015Bcian dzia\u0142owych, sufit\xF3w podwieszanych i ok\u0142adzin \u015Bciennych w pomieszczeniach o normalnej wilgotno\u015Bci. Rdze\u0144 gipsowy obustronne oklejony kartonem. Kraw\u0119d\u017A AK (oblicowana, sko\u015Bna).",
    application: "\u015Aciany dzia\u0142owe, sufity podwieszane, ok\u0142adziny \u015Bcian. Pomieszczenia suche lub normalnie wilgotne. Monta\u017C na profilach stalowych lub kleju gipsowym.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "12,5 mm" },
      { label: "Wymiary", value: "1200 x 2600 mm" },
      { label: "Masa", value: "ok. 9,5 kg/m\xB2" },
      { label: "Typ kraw\u0119dzi", value: "AK (sko\u015Bna oblicowana)" },
      { label: "Klasa reakcji na ogie\u0144", value: "A2-s1, d0 (rdze\u0144)" }
    ],
    images: ["/images/products/p021-plyta-gk_2.jpg"],
    tags: ["p\u0142yta GK", "gipsowo-kartonowa", "knauf", "sucha zabudowa", "\u015Bciana"],
    related: ["p022", "p006", "p011"],
    isFeatured: true
  },
  {
    id: "p022",
    slug: "profil-cd-60-knauf-3m",
    name: "Profil CD 60/27 Knauf 3m",
    categorySlug: "profile-sufit",
    brand: "Knauf",
    sku: "KNF-CD60-3",
    unit: "szt. 3m",
    shortDescription: "Profil sufitowy CD 60/27 ocynkowany do budowy rusztu sufit\xF3w podwieszanych.",
    description: "Profil CD 60/27 Knauf to ocynkowany profil stalowy przeznaczony do budowy ruszt\xF3w sufit\xF3w podwieszanych oraz \u015Bcian dzia\u0142owych. Wykonany z ocynkowanej blachy stalowej o grubo\u015Bci 0,6 mm. Zapewnia stabiln\u0105 i trwa\u0142\u0105 konstrukcj\u0119 no\u015Bn\u0105 dla p\u0142yt GK.",
    application: "Ruszt sufit\xF3w podwieszanych. Szkielet \u015Bcian dzia\u0142owych z p\u0142yt GK. Ok\u0142adziny \u015Bcian. Monta\u017C przy u\u017Cyciu wieszak\xF3w bezpo\u015Brednich lub z noniuszem.",
    technicalSpec: [
      { label: "Wymiary profilu", value: "60 x 27 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "3 m (dost\u0119pne: 2,6; 3,0; 4,0 m)" },
      { label: "Grubo\u015B\u0107 blachy", value: "0,6 mm" },
      { label: "Materia\u0142", value: "Ocynkowana blacha stalowa" },
      { label: "Rozstaw profili", value: "co 40 lub 60 cm" }
    ],
    images: ["/images/products/p022-profil-cd_2.jpg"],
    tags: ["profil CD", "sucha zabudowa", "knauf", "sufity", "ruszt", "ocynkowany"],
    related: ["p021", "p011"]
  },
  // ─── STROPY I ŚCIANY ───────────────────────────────────────────────────────
  {
    id: "p023",
    slug: "bloczek-beton-komorkowy-ytong-240",
    name: "Bloczek z betonu kom\xF3rkowego Ytong PP2/0,4 240mm",
    categorySlug: "bloczki-beton-komorkowy",
    brand: "Ytong",
    sku: "YTG-PP2-240",
    unit: "szt.",
    shortDescription: "Bloczek z autoklawizowanego betonu kom\xF3rkowego PP2/0,4. \u039B=0,120 W/(m\xB7K).",
    description: "Ytong PP2/0,4 to bloczek \u015Bcienny z autoklawizowanego betonu kom\xF3rkowego (ABK) o doskona\u0142ych w\u0142a\u015Bciwo\u015Bciach termoizolacyjnych. Produkt wyr\xF3\u017Cnia si\u0119 nisk\u0105 wag\u0105, \u0142atw\u0105 obrabialno\u015Bci\u0105 (ci\u0119cie pi\u0142\u0105 r\u0119czn\u0105) i dobrymi w\u0142a\u015Bciwo\u015Bciami akustycznymi. Szeroko stosowany w budownictwie jednorodzinnym i wielorodzinnym.",
    application: "Budowa \u015Bcian zewn\u0119trznych i wewn\u0119trznych. \u015Aciany konstrukcyjne i dzia\u0142owe budynk\xF3w mieszkalnych i komercyjnych. Mury warstwowe. Piwnice i gara\u017Ce.",
    technicalSpec: [
      { label: "Klasa g\u0119sto\u015Bci", value: "400 kg/m\xB3" },
      { label: "Lambda (\u03BB)", value: "0,120 W/(m\xB7K)" },
      { label: "Wymiary (D\xD7W\xD7H)", value: "599 \xD7 240 \xD7 199 mm" },
      { label: "Waga", value: "ok. 9,5 kg/szt." },
      { label: "Wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie", value: "2,0 N/mm\xB2" }
    ],
    images: ["/images/products/p023-bloczek-gazobet_2.jpg"],
    tags: ["bloczek", "beton kom\xF3rkowy", "ytong", "abk", "gazobet", "\u015Bciany"],
    related: ["p013", "p014", "p011"],
    isFeatured: true
  },
  {
    id: "p013",
    slug: "zaprawa-murarska-baumit-manu2-25kg",
    name: "Zaprawa murarska Baumit MG 5 25kg",
    categorySlug: "zaprawy-murarskie",
    brand: "Baumit",
    sku: "BAU-MG5-25",
    unit: "worek 25kg",
    shortDescription: "Zaprawa murarska cementowo-wapienna MG 5 do murowania \u015Bcian z ceramiki i silikat\xF3w.",
    description: "Baumit MG 5 to zaprawa murarska cementowo-wapienna przeznaczona do murowania \u015Bcian z ceg\u0142y ceramicznej, bloczk\xF3w silikatowych i bloczk\xF3w z betonu kom\xF3rkowego. Produkt charakteryzuje si\u0119 bardzo dobr\u0105 plastyczno\u015Bci\u0105 i tiksotropi\u0105, u\u0142atwiaj\u0105c\u0105 nak\u0142adanie.",
    application: "Murowanie \u015Bcian z ceramiki pe\u0142nej i krat\xF3wki. Murowanie bloczk\xF3w silikatowych i z betonu kom\xF3rkowego. Uzupe\u0142nianie spoin i naprawy.",
    technicalSpec: [
      { label: "Klasa wytrzyma\u0142o\u015Bci", value: "M5" },
      { label: "Zu\u017Cycie", value: "ok. 5 kg/m\xB2 (przy spoinie 1cm)" },
      { label: "Czas otwarty", value: "ok. 2 h" },
      { label: "Czas schni\u0119cia", value: "24 h (chodzenie po stropie)" },
      { label: "Spoiwo", value: "Cementowo-wapienne" }
    ],
    images: ["/images/products/p013-zaprawa-murarska_2.jpg"],
    tags: ["zaprawa murarska", "baumit", "mg5", "ceg\u0142a", "mur", "ceramika"],
    related: ["p014", "p023", "p005"]
  },
  {
    id: "p014",
    slug: "cement-portlandzki-cem-i-425r-25kg",
    name: "Cement portlandzki CEM I 42,5R G\xF3ra\u017Cd\u017Ce 25kg",
    categorySlug: "cement",
    brand: "G\xF3ra\u017Cd\u017Ce",
    sku: "GRZ-CEM1-425-25",
    unit: "worek 25kg",
    shortDescription: "Cement portlandzki CEM I 42,5R do beton\xF3w konstrukcyjnych, zapraw i wylewek.",
    description: "Cement portlandzki G\xF3ra\u017Cd\u017Ce CEM I 42,5R to cement o wysokiej wytrzyma\u0142o\u015Bci wczesnej i ko\u0144cowej, przeznaczony do beton\xF3w konstrukcyjnych, zapraw murarskich, tynkarskich i posadzkowych. Produkt spe\u0142nia norm\u0119 EN 197-1.",
    application: "Betonowanie fundament\xF3w, strop\xF3w, s\u0142up\xF3w. Przygotowanie zapraw murarskich i tynkarskich. Wylewki posadzkowe. Prefabrykaty betonowe.",
    technicalSpec: [
      { label: "Klasa wytrzyma\u0142o\u015Bci", value: "42,5 R" },
      { label: "Wytrzyma\u0142o\u015B\u0107 po 2 dniach", value: "\u2265 20 MPa" },
      { label: "Wytrzyma\u0142o\u015B\u0107 po 28 dniach", value: "\u2265 42,5 MPa" },
      { label: "Pocz\u0105tek wi\u0105zania", value: "\u2265 60 min" },
      { label: "Norma", value: "EN 197-1" }
    ],
    images: ["/images/products/p014-cement_2.jpg"],
    tags: ["cement", "portlandzki", "g\xF3ra\u017Cd\u017Ce", "cem i", "42.5r", "beton"],
    related: ["p013", "p023", "p032"],
    isFeatured: true
  },
  // ─── PŁYTKI ────────────────────────────────────────────────────────────────
  {
    id: "p024",
    slug: "plytka-scienna-ceramiczna-biala-25x40",
    name: "P\u0142ytka \u015Bcienna ceramiczna Bia\u0142a Po\u0142ysk 25x40cm",
    categorySlug: "plytki-scienne",
    brand: "Opoczno",
    sku: "OPO-SC-B2540",
    unit: "m\xB2 (8 szt.)",
    shortDescription: "Bia\u0142e p\u0142ytki ceramiczne \u015Bcienne 25x40cm w po\u0142ysku do \u0142azienek i kuchni.",
    description: "Klasyczne bia\u0142e p\u0142ytki ceramiczne \u015Bcienne 25x40cm w po\u0142ysku. Idealne do \u0142azienek, kuchni i toalet. Wysoka jako\u015B\u0107 powierzchni, doskona\u0142a biel i trwa\u0142o\u015B\u0107. Kompatybilne ze standardowymi fugami i klejami cementowymi. Klasa I jako\u015Bci.",
    application: "Ok\u0142adanie \u015Bcian w \u0142azienkach, kuchniach, toaletach i innych pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci. Aplikacja na klej cementowy.",
    technicalSpec: [
      { label: "Wymiary", value: "25 x 40 cm" },
      { label: "Grubo\u015B\u0107", value: "6,5 mm" },
      { label: "Rodzaj powierzchni", value: "Po\u0142ysk" },
      { label: "Absorpcja wody", value: "> 10% (Klasa BIII)" },
      { label: "Zawarto\u015B\u0107 opakowania", value: "8 szt. = 0,8 m\xB2" }
    ],
    images: ["/images/products/p024-plytka-scienna_2.jpg"],
    tags: ["p\u0142ytka \u015Bcienna", "ceramika", "bia\u0142a", "po\u0142ysk", "\u0142azienka", "kuchnia"],
    related: ["p015", "p016", "p025"]
  },
  {
    id: "p025",
    slug: "plytka-gres-podlogowy-jasny-60x60",
    name: "P\u0142ytka gres polerowany Jasny Szary 60x60cm",
    categorySlug: "plytki-scienno-podlogowe",
    brand: "Atlas",
    sku: "ATL-GR-JS6060",
    unit: "m\xB2 (4 szt.)",
    shortDescription: "Gres polerowany jasny szary 60x60cm. Imitacja kamienia, rektyfikowane kraw\u0119dzie.",
    description: "Du\u017Ce p\u0142ytki gresowe 60x60cm w kolorze jasnego szarego kamienia z polerowaniem. Rektyfikowane kraw\u0119dzie umo\u017Cliwiaj\u0105 uk\u0142adanie z w\u0105sk\u0105 fug\u0105 od 1,5mm. Powierzchnia polierowana nadaje wn\u0119trzom elegancki, nowoczesny charakter. Klasa \u015Bcieralno\u015Bci PEI4 \u2013 nadaje si\u0119 do intensywnie u\u017Cytkowanych pod\u0142\xF3g.",
    application: "Pod\u0142ogi i \u015Bciany w salonach, holach, biurach, centrach handlowych. Pod\u0142ogi o umiarkowanym i intensywnym ruchu pieszym. Aplikacja na klej elastyczny.",
    technicalSpec: [
      { label: "Wymiary", value: "60 x 60 cm" },
      { label: "Grubo\u015B\u0107", value: "10 mm" },
      { label: "Rodzaj powierzchni", value: "Polerowany" },
      { label: "Klasa \u015Bcieralno\u015Bci", value: "PEI 4" },
      { label: "Rektyfikacja", value: "Tak" }
    ],
    images: ["/images/products/p025-plytka-gres_2.jpg"],
    tags: ["gres", "pod\u0142ogowy", "60x60", "szary", "polerowany", "rektyfikowany"],
    related: ["p015", "p016", "p024"],
    isNew: true
  },
  {
    id: "p016",
    slug: "fuga-atlas-grout-25kg-jasny-szary",
    name: "Fuga cementowa Atlas Grout+ 25kg Jasny Szary",
    categorySlug: "spoiny",
    brand: "Atlas",
    sku: "ATL-GRP-JS-25",
    unit: "worek 25kg",
    shortDescription: "Cementowa fuga do spoinowania p\u0142ytek ceramicznych i gresu na \u015Bcianach i pod\u0142ogach.",
    description: "Atlas Grout+ to cementowa zaprawa do spoinowania p\u0142ytek ceramicznych, gresu i kamienia naturalnego wewn\u0105trz i na zewn\u0105trz budynk\xF3w. Produkt zawiera w sk\u0142adzie \u015Brodki hydrofobowe i antimikrobiologiczne ograniczaj\u0105ce zabrudzenia spoin. Spoiny twarde, odporne na \u015Bcieranie.",
    application: "Spoinowanie p\u0142ytek ceramicznych i gresu na pod\u0142ogach i \u015Bcianach. Wn\u0119trza i elewacje zewn\u0119trzne. Szeroko\u015B\u0107 spoiny 2\u201320 mm.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "1,5\u20137 kg/m\xB2 (zale\u017Cnie od p\u0142ytki i spoiny)" },
      { label: "Szeroko\u015B\u0107 spoiny", value: "2\u201320 mm" },
      { label: "Czas schni\u0119cia", value: "24 h (chodzenie), 14 dni (pe\u0142na wytrzyma\u0142o\u015B\u0107)" },
      { label: "Klasa wg EN 13888", value: "CG2 WA" },
      { label: "Odporno\u015B\u0107 na \u015Bcieranie", value: "\u2265 1000 mg (EN 12808-2)" }
    ],
    images: ["/images/products/p016-fuga_2.jpg"],
    tags: ["fuga", "spoina", "atlas", "grout", "ceramika", "gres"],
    related: ["p015", "p024", "p025"]
  },
  // ─── NARZĘDZIA ─────────────────────────────────────────────────────────────
  {
    id: "p026",
    slug: "wiertarko-wkretarka-bosch-gsb-18v-55",
    name: "Wiertarko-wkr\u0119tarka udarowa Bosch GSB 18V-55 2\xD74Ah",
    categorySlug: "wiertarko-wkretarki",
    brand: "Bosch",
    sku: "BSH-GSB18V55",
    unit: "komplet",
    shortDescription: "Akumulatorowa wiertarko-wkr\u0119tarka udarowa 18V z 2 akumulatorami 4Ah i walizk\u0105.",
    description: "Bosch GSB 18V-55 to profesjonalna akumulatorowa wiertarko-wkr\u0119tarka udarowa z systemem 18V Professional. Moc 55 Nm zapewnia skuteczne wiercenie w drewnie, metalu i murze. Komplet zawiera 2 akumulatory 4,0 Ah i \u0142adowark\u0119 w walizce L-BOXX.",
    application: "Wiercenie w drewnie, metalu, tworzywie. Wiercenie udarowe w murze i betonie (bez SDS). Wkr\u0119canie wkr\u0119t\xF3w. U\u017Cytkowanie profesjonalne na budowie.",
    technicalSpec: [
      { label: "Napi\u0119cie akumulatora", value: "18 V" },
      { label: "Max moment obrotowy (twarde)", value: "55 Nm" },
      { label: "Pr\u0119dko\u015B\u0107 obrotowa biegu 1", value: "0\u2013480 obr/min" },
      { label: "Pr\u0119dko\u015B\u0107 obrotowa biegu 2", value: "0\u20131700 obr/min" },
      { label: "Masa (bez akumulatora)", value: "1,9 kg" },
      { label: "Wymiana szczotek", value: "Bezszczotkowy" }
    ],
    images: ["/images/products/p026-wiertarka_2.jpg"],
    tags: ["wiertarka", "bosch", "akumulatorowa", "18v", "udarowa", "profesjonalna"],
    related: ["p028", "p027"],
    isNew: true
  },
  {
    id: "p027",
    slug: "walek-malarski-purolan-wlochaty-25cm",
    name: "Wa\u0142ek malarski w\u0142ochaty Purolan 25cm z uchwytem",
    categorySlug: "walki-malarskie",
    brand: "Purolan",
    sku: "PRL-WL-25",
    unit: "komplet",
    shortDescription: "Wa\u0142ek malarski w\u0142ochaty 25cm z aluminiowym uchwytem. Do farb emulsyjnych i lateksowych.",
    description: "Wa\u0142ek malarski Purolan 25cm z w\u0142osiem ze specjalnej mieszanki syntetycznej i naturalnej. Zapewnia idealnie r\xF3wnomierny rozprowadzaj\u0105cy farb emulsyjnych, lateksowych i akrylowych. Aluminiowy trzon z obrotow\u0105 klatk\u0105 zapewnia komfort pracy. Kompatybilny z teleskopowymi trzonkami.",
    application: "Malowanie du\u017Cych powierzchni \u015Bcian i sufit\xF3w farbami emulsyjnymi, lateksowymi i akrylowymi. Do farb wodnych.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107 wa\u0142ka", value: "25 cm" },
      { label: "Rodzaj w\u0142osia", value: "Syntetyczno-naturalne (d\u0142ugo\u015B\u0107 12mm)" },
      { label: "Trzonek", value: "Aluminiowy, obrotowy" },
      { label: "\u015Arednica rury trzonka", value: "8 mm (standard)" },
      { label: "Zastosowanie", value: "Farby wodorozcie\u0144czalne" }
    ],
    images: ["/images/products/p027-walek-malarski_2.jpg"],
    tags: ["wa\u0142ek malarski", "purolan", "25cm", "emulsja", "malowanie"],
    related: ["p017", "p018", "p028"]
  },
  {
    id: "p028",
    slug: "kolek-rozporowy-fischer-8x60-100szt",
    name: "Ko\u0142ek rozporowy Fischer UX 8x60mm z wkr\u0119tem 100szt",
    categorySlug: "kolki-wkrety-uniwersalne",
    brand: "Fischer",
    sku: "FCH-UX860-100",
    unit: "opak. 100 szt.",
    shortDescription: "Nylonowy ko\u0142ek rozporowy UX 8\xD760mm z wkr\u0119tem. Do \u015Bcian pe\u0142nych i pustych.",
    description: "Fischer UX 8\xD760mm to nylonowy ko\u0142ek rozporowy do stosowania w wi\u0119kszo\u015Bci pod\u0142o\u017Cy budowlanych: betonie, cegle pe\u0142nej i krat\xF3wce, bloczkach, tynku i GK. Rozwini\u0119ta strefa rozporu zapewnia wysok\u0105 no\u015Bno\u015B\u0107. W komplecie wkr\u0119t stalowy ocynkowany.",
    application: "Mocowanie ram okiennych i drzwiowych, listew, mebli, profili, kabli, rur w betonie, cegle, tynku i GK. Pod\u0142o\u017Ca pe\u0142ne i dr\u0105\u017Cone.",
    technicalSpec: [
      { label: "\u015Arednica ko\u0142ka", value: "8 mm" },
      { label: "D\u0142ugo\u015B\u0107 ko\u0142ka", value: "60 mm" },
      { label: "\u015Arednica wiercenia", value: "8 mm" },
      { label: "G\u0142\u0119boko\u015B\u0107 kotwienia", value: "50 mm" },
      { label: "Materia\u0142", value: "Nylon (PA6) + wkr\u0119t Zn" }
    ],
    images: ["/images/products/p028-kolek-rozporowy_2.jpg"],
    tags: ["ko\u0142ek rozporowy", "fischer", "ux", "8x60", "mocowanie", "nylon"],
    related: ["p026", "p022"]
  },
  // ─── DACHY ─────────────────────────────────────────────────────────────────
  {
    id: "p030",
    slug: "gont-bitumiczny-katepal-jazzy",
    name: "Gont bitumiczny Katepal Jazzy 3,0mm 3m\xB2",
    categorySlug: "gonty-bitumiczne",
    brand: "Katepal",
    sku: "KTP-JZY-3",
    unit: "paczka 3m\xB2",
    shortDescription: "Samoprzylepny gont bitumiczny tr\xF3jwarstwowy o klasycznym kszta\u0142cie trapezoidalnym.",
    description: "Katepal Jazzy to tr\xF3jwarstwowy samoprzylepny gont bitumiczny do pokry\u0107 dachowych o nachyleniu min. 1:5. Rdze\u0144 szklany zapewnia stabilno\u015B\u0107 wymiarow\u0105, modyfikowany SBS bitum \u2013 wysok\u0105 elastyczno\u015B\u0107 w niskich temperaturach. Granulat mineralny ceramiczny tworz\u0105cy barwion\u0105 posypk\u0119.",
    application: "Pokrycia dach\xF3w sko\u015Bnych o nachyleniu od 1:5. Dachy dom\xF3w jednorodzinnych, gara\u017Cy, altanek i wiat. Instalacja przez przyklejenie i gwo\u017Adziowanie.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "3,0 mm" },
      { label: "Masa powierzchniowa", value: "ok. 10 kg/m\xB2" },
      { label: "Rdze\u0144", value: "Wzmocnienie z w\u0142\xF3kna szklanego" },
      { label: "Min. nachylenie dachu", value: "1:5 (11\xB0)" },
      { label: "Zakres temperatur monta\u017Cu", value: "+5\xB0C do +30\xB0C" }
    ],
    images: ["/images/products/p030-gont-bitumiczny_2.jpg"],
    tags: ["gont bitumiczny", "katepal", "dach", "pokrycie dachowe", "samoprzylepny"],
    related: ["p029", "p007"]
  },
  // ─── GALANTERIA BETONOWA ───────────────────────────────────────────────────
  {
    id: "p031",
    slug: "kostka-brukowa-holland-6cm-szara",
    name: "Kostka brukowa Holland 6cm Szara m\xB2",
    categorySlug: "kostka-brukowa",
    brand: "Bruk-Bet",
    sku: "BBT-HOL-6-SZ",
    unit: "m\xB2",
    shortDescription: "Betonowa kostka brukowa Holland 6cm szara do dojazd\xF3w, chodnik\xF3w i parking\xF3w.",
    description: "Kostka brukowa Holland Bruk-Bet to jeden z najpopularniejszych wzor\xF3w kostek brukowych. Prostok\u0105tny kszta\u0142t 200\xD7100mm i grubo\u015B\u0107 6cm umo\u017Cliwia uk\u0142adanie w wielu wzorach: cegie\u0142ka, jode\u0142ka, kosz. Wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie C40 i mrozoodporno\u015B\u0107 F4 zapewniaj\u0105 trwa\u0142o\u015B\u0107 przez dziesi\u0119ciolecia.",
    application: "Dojazdy i parkingi przy budynkach mieszkalnych. Chodniki, place i ci\u0105gi piesze. Ogrody i tarasowanie terenu. Monta\u017C na podsypce cementowo-piaskowej.",
    technicalSpec: [
      { label: "Wymiary (D\xD7W\xD7H)", value: "200 \xD7 100 \xD7 60 mm" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie", value: "\u2265 C40 (MPa)" },
      { label: "Mrozoodporno\u015B\u0107", value: "F4 (200 cykli)" },
      { label: "Nasi\u0105kliwo\u015B\u0107", value: "\u2264 5%" },
      { label: "Masa", value: "ok. 3,2 kg/szt." }
    ],
    images: ["/images/products/p031-kostka-brukowa_2.jpg"],
    tags: ["kostka brukowa", "holland", "szara", "bruk-bet", "dojazd", "chodnik"],
    related: ["p013", "p014"]
  },
  // ─── ZAPRAWY POSADZKOWE ────────────────────────────────────────────────────
  {
    id: "p032",
    slug: "masa-samopoziomujaca-knauf-boden-25kg",
    name: "Masa samopoziomuj\u0105ca Knauf Boden 25 25kg",
    categorySlug: "zaprawy-posadzkowe",
    brand: "Knauf",
    sku: "KNF-BD25-25",
    unit: "worek 25kg",
    shortDescription: "Masa samopoziomuj\u0105ca do wylewek grubo\u015Bci 2\u201325mm pod wyk\u0142adziny i p\u0142ytki.",
    description: "Knauf Boden 25 to cementowa masa samopoziomuj\u0105ca do wyr\xF3wnywania pod\u0142\xF3g wewn\u0105trz budynk\xF3w. Dzi\u0119ki specjalnej recepturze zaprawa samodzielnie si\u0119 poziomuje, tworz\u0105c r\xF3wn\u0105 i tward\u0105 posadzk\u0119 gotow\u0105 pod wyk\u0142adziny, panele, gres i inne pokrycia.",
    application: "Wyr\xF3wnywanie pod\u0142\xF3g betonowych przed u\u0142o\u017Ceniem p\u0142ytek, wyk\u0142adzin, paneli i parkietu. Grubo\u015B\u0107 warstwy 2\u201325 mm. Ogrzewanie pod\u0142ogowe.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "ok. 1,5 kg/m\xB2 przy 1mm" },
      { label: "Grubo\u015B\u0107 warstwy", value: "2\u201325 mm" },
      { label: "Czas schni\u0119cia", value: "3\u20135 h (chodzenie)" },
      { label: "Czas do u\u0142o\u017Cenia wyk\u0142adziny", value: "24 h" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie", value: "\u2265 20 MPa" }
    ],
    images: ["/images/products/p032-masa-samopoziomujaca_2.jpg"],
    tags: ["masa samopoziomuj\u0105ca", "knauf", "boden", "wylewka", "posadzka", "wyr\xF3wnanie"],
    related: ["p013", "p015", "p025"],
    isNew: true
  }
];
const getFeaturedProducts = () => products.filter((p) => p.isFeatured);
const getProductsByCategory = (slug) => products.filter((p) => p.categorySlug === slug);
const getProductBySlug = (slug) => products.find((p) => p.slug === slug) || null;
const getRelatedProducts = (slugs) => products.filter((p) => slugs.includes(p.id));
const getNewProducts = () => products.filter((p) => p.isNew);
const getAllBrands = () => [...new Set(products.map((p) => p.brand))].sort();
const newProducts = [
  // TYNKI CEMENTOWE
  {
    id: "p034",
    slug: "tynk-cementowo-wapienny-baumit-mpi-25-25kg",
    name: "Tynk cementowo-wapienny Baumit MPI 25 25kg",
    categorySlug: "tynki-cementowe",
    brand: "Baumit",
    sku: "BAU-MPI25-25",
    unit: "worek 25kg",
    shortDescription: "Maszynowy tynk cementowo-wapienny do \u015Bcian i sufit\xF3w wewn\u0105trz i na zewn\u0105trz.",
    description: "Baumit MPI 25 to maszynowy tynk cementowo-wapienny do stosowania wewn\u0105trz i na zewn\u0105trz budynk\xF3w. Produkt przeznaczony do nak\u0142adania maszynowego na \u015Bciany i sufity z ceg\u0142y ceramicznej, bloczk\xF3w silikatowych i betonu kom\xF3rkowego. Charakteryzuje si\u0119 doskona\u0142\u0105 plastyczno\u015Bci\u0105 i \u0142atwo\u015Bci\u0105 obr\xF3bki.",
    application: "Tynkowanie maszynowe \u015Bcian i sufit\xF3w wewn\u0105trz i na zewn\u0105trz. Pod\u0142o\u017Ce: ceg\u0142a, beton, bloczki. Grubo\u015B\u0107 warstwy 10\u201325 mm.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "ok. 13 kg/m\xB2 (przy 10mm)" },
      { label: "Grubo\u015B\u0107 warstwy", value: "10\u201325 mm" },
      { label: "Czas schni\u0119cia", value: "3 dni (min.)" },
      { label: "Spoiwo", value: "Cementowo-wapienne" },
      { label: "Klasa tynku", value: "GP CS IV" }
    ],
    images: ["/images/products/p034-tynk-cementowy_2.jpg"],
    tags: ["tynk cementowy", "cementowo-wapienny", "baumit", "maszynowy", "elewacja"],
    related: ["p012", "p005", "p013"]
  },
  // WEŁNA SZKLANA DO GK
  {
    id: "p035",
    slug: "welna-szklana-isover-akustik-50mm",
    name: "We\u0142na szklana Isover Akustik 50mm m\xB2",
    categorySlug: "welna-szklana",
    brand: "Isover",
    sku: "ISV-AKU-50",
    unit: "m\xB2",
    shortDescription: "We\u0142na szklana do izolacji akustycznej \u015Bcian GK i poddaszy. Klasa reakcji na ogie\u0144 A1.",
    description: "Isover Akustik to we\u0142na szklana o doskona\u0142ych w\u0142a\u015Bciwo\u015Bciach izolacji akustycznej, przeznaczona do wype\u0142niania szkieletowych \u015Bcian z p\u0142yt GK. Elastyczna struktura pozwala na \u0142atwy monta\u017C w przestrzeniach mi\u0119dzy profilami. Produkt niepalna (A1).",
    application: "Izolacja akustyczna \u015Bcian dzia\u0142owych z GK. Izolacja termiczna i akustyczna poddaszy. Ocieplenie wewn\u0119trzne \u015Bcian.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "50 mm (dost\u0119pne: 40, 60, 100 mm)" },
      { label: "Lambda (\u03BB)", value: "0,036 W/(m\xB7K)" },
      { label: "Klasa reakcji na ogie\u0144", value: "A1" },
      { label: "Poch\u0142anianie d\u017Awi\u0119ku", value: "\u03B1w = 1,00" },
      { label: "Wymiar p\u0142yty", value: "600 \xD7 1200 mm" }
    ],
    images: ["/images/products/p035-welna-szklana_2.jpg"],
    tags: ["we\u0142na szklana", "isover", "akustyczna", "GK", "izolacja", "\u015Bciana"],
    related: ["p021", "p022", "p004"],
    isNew: true
  },
  // RYNNY PVC
  {
    id: "p036",
    slug: "rynna-pvc-gamrat-125mm-3m-szara",
    name: "Rynna PVC Gamrat 125mm 3m Szara",
    categorySlug: "rynny-pvc",
    brand: "Gamrat",
    sku: "GAM-R125-3-SZ",
    unit: "szt. 3mb",
    shortDescription: "P\xF3\u0142okr\u0105g\u0142a rynna dachowa PVC 125mm o d\u0142ugo\u015Bci 3m w kolorze szarym.",
    description: "Rynna Gamrat PVC 125mm to element systemu rynnowego do odprowadzania wody deszczowej z dach\xF3w. Wykonana z trwa\u0142ego PVC odpornego na UV i czynniki atmosferyczne. Profil p\xF3\u0142okr\u0105g\u0142y, kompatybilny ze z\u0142\u0105czkami, naro\u017Cnikami i uchwytami systemu Gamrat 125/90.",
    application: "Odprowadzanie wody deszczowej z po\u0142aci dachowych. Monta\u017C przy okapie dachu na uchwytach. Systemy rynnowe dom\xF3w jednorodzinnych.",
    technicalSpec: [
      { label: "\u015Arednica nominalna", value: "125 mm (wewn\u0119trzna)" },
      { label: "D\u0142ugo\u015B\u0107 elementu", value: "3 m" },
      { label: "Materia\u0142", value: "PVC-U" },
      { label: "Kolor", value: "Szary (dost\u0119pny te\u017C: br\u0105zowy, antracyt)" },
      { label: "Odporno\u015B\u0107 na temp.", value: "-20\xB0C do +60\xB0C" }
    ],
    images: ["/images/products/p036-rynna-pvc_2.jpg"],
    tags: ["rynna", "pvc", "gamrat", "dach", "odprowadzenie wody", "125mm"],
    related: ["p029", "p030", "p037"],
    isNew: true
  },
  // PAPA BITUMICZNA
  {
    id: "p037",
    slug: "papa-bitumiczna-icopal-wentylacyjna-v60-s40",
    name: "Papa bitumiczna Icopal V60 S40 Wentylacyjna 10m\xB2",
    categorySlug: "papy-bitumiczne",
    brand: "Icopal",
    sku: "ICP-V60S40-10",
    unit: "rolka 10m\xB2",
    shortDescription: "Papa podk\u0142adowa zgrzewalna V60 S40 do uszczelniania dach\xF3w p\u0142askich i sko\u015Bnych.",
    description: "Icopal V60 S40 to papa bitumiczna modyfikowana SBS do uszczelniania pokry\u0107 dachowych. Przeznaczona jako podk\u0142adowa warstwa uszczelniaj\u0105ca na dachach p\u0142askich i jako podk\u0142ad pod gonty bitumiczne. Osnowa poliestrowa zapewnia stabilno\u015B\u0107 wymiarow\u0105.",
    application: "Podk\u0142ad uszczelniaj\u0105cy na dachach p\u0142askich i sko\u015Bnych. Warstwa pod gonty bitumiczne. Izolacja pozioma fundament\xF3w.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "4,0 mm" },
      { label: "Masa powierzchniowa", value: "ok. 4,2 kg/m\xB2" },
      { label: "Osnowa", value: "Poliestrowa 180 g/m\xB2" },
      { label: "Modyfikacja bitumu", value: "SBS" },
      { label: "Spos\xF3b \u0142\u0105czenia", value: "Zgrzewanie gazem" }
    ],
    images: ["/images/products/p037-papa-bitumiczna_2.jpg"],
    tags: ["papa bitumiczna", "icopal", "sbs", "dach p\u0142aski", "zgrzewana", "podk\u0142adowa"],
    related: ["p029", "p030", "p036"]
  },
  // PŁYTKI ELEWACYJNE KLINKIEROWE
  {
    id: "p038",
    slug: "plytka-elewacyjna-klinkierowa-lode-jula-czerwona",
    name: "P\u0142ytka elewacyjna klinkierowa Lode Jula Czerwona m\xB2",
    categorySlug: "plytki-elewacyjne",
    brand: "Lode",
    sku: "LDE-JUL-CZW",
    unit: "m\xB2",
    shortDescription: "Klinkierowa p\u0142ytka elewacyjna w kolorze ceglastej czerwieni. Odporno\u015B\u0107 na mr\xF3z F100.",
    description: "Lode Jula to klinkierowa p\u0142ytka elewacyjna o naturalnym, ceglastym wygl\u0105dzie. Produkt charakteryzuje si\u0119 wyj\u0105tkowo wysok\u0105 odporno\u015Bci\u0105 na mr\xF3z (F100), bardzo nisk\u0105 nasi\u0105kliwo\u015Bci\u0105 i doskona\u0142\u0105 trwa\u0142o\u015Bci\u0105. Idealna do nowoczesnych i tradycyjnych elewacji budynk\xF3w.",
    application: "Ok\u0142adziny elewacyjne budynk\xF3w. Kominki i grill zewn\u0119trzny. Mury oporowe i podmur\xF3wki. Monta\u017C na kleju do klinkieru.",
    technicalSpec: [
      { label: "Wymiary (D\xD7W\xD7H)", value: "250 \xD7 65 \xD7 10 mm" },
      { label: "Nasi\u0105kliwo\u015B\u0107", value: "< 6%" },
      { label: "Mrozoodporno\u015B\u0107", value: "F100 (100 cykli)" },
      { label: "Klasa wytrzyma\u0142o\u015Bci", value: "Klasa 1 EN 771-1" },
      { label: "Zu\u017Cycie", value: "ok. 53 szt./m\xB2" }
    ],
    images: ["/images/products/p038-plytka-elewacyjna_2.jpg"],
    tags: ["p\u0142ytka elewacyjna", "klinkier", "lode", "czerwona", "ceg\u0142a", "fasada"],
    related: ["p015", "p002", "p005"],
    isFeatured: true
  },
  // BLOCZKI SILIKATOWE
  {
    id: "p039",
    slug: "bloczek-silikatowy-silka-e24-240mm",
    name: "Bloczek silikatowy Silka E24 240mm",
    categorySlug: "bloczki-silikatowe",
    brand: "Xella",
    sku: "XEL-SLK-E24-240",
    unit: "szt.",
    shortDescription: "Bloczek silikatowy klasy 20/0,9 do murowania \u015Bcian konstrukcyjnych z wysok\u0105 izolacj\u0105 akustyczn\u0105.",
    description: "Silka E24 to bloczek silikatowy klasy wytrzyma\u0142o\u015Bci 20 do budowy \u015Bcian zewn\u0119trznych i wewn\u0119trznych. Charakteryzuje si\u0119 wysok\u0105 izolacyjno\u015Bci\u0105 akustyczn\u0105 (Rw = 54 dB dla \u015Bciany 24 cm), doskona\u0142\u0105 no\u015Bno\u015Bci\u0105 i r\xF3wnymi kraw\u0119dziami umo\u017Cliwiaj\u0105cymi murowanie na spoiny cienkowarstwowe.",
    application: "\u015Aciany zewn\u0119trzne i no\u015Bne wewn\u0119trzne. \u015Aciany wymagaj\u0105ce wysokiej izolacji akustycznej. Budynki mieszkalne i komercyjne.",
    technicalSpec: [
      { label: "Klasa wytrzyma\u0142o\u015Bci", value: "20 (20 N/mm\xB2)" },
      { label: "G\u0119sto\u015B\u0107 pozorna", value: "0,9 g/cm\xB3" },
      { label: "Wymiary (D\xD7W\xD7H)", value: "333 \xD7 240 \xD7 199 mm" },
      { label: "Izolacja akustyczna \u015Bciany", value: "Rw \u2248 54 dB (grubo\u015B\u0107 24cm)" },
      { label: "Lambda (\u03BB)", value: "0,44 W/(m\xB7K)" }
    ],
    images: ["/images/products/p039-bloczek-silikatowy_2.jpg"],
    tags: ["bloczek silikatowy", "silka", "xella", "akustyka", "\u015Bciana no\u015Bna", "24cm"],
    related: ["p013", "p023", "p014"],
    isFeatured: true
  },
  // SZLIFIERKA KĄTOWA
  {
    id: "p040",
    slug: "szlifierka-katowa-makita-dga-504-z-18v",
    name: "Szlifierka k\u0105towa Makita DGA 504Z 18V 125mm",
    categorySlug: "szlifierki-katowe",
    brand: "Makita",
    sku: "MAK-DGA504Z",
    unit: "szt. (bez akum.)",
    shortDescription: "Akumulatorowa szlifierka k\u0105towa 18V 125mm. Bezszczotkowa, 8500 obr/min. Bez akumulatora.",
    description: "Makita DGA 504Z to akumulatorowa szlifierka k\u0105towa 125mm z silnikiem bezszczotkowym BL\u2122 systemu LXT\xAE 18V. Silnik bezszczotkowy zapewnia o 50% d\u0142u\u017Csz\u0105 \u017Cywotno\u015B\u0107 narz\u0119dzia i wi\u0119ksz\u0105 wydajno\u015B\u0107 od typowych modeli. Idealna do ci\u0119cia i szlifowania metalu, betonu i ceramiki.",
    application: "Ci\u0119cie i szlifowanie metalu, betonu, kamienia i ceramiki. Profesjonalne prace budowlane i wyko\u0144czeniowe. System Makita LXT 18V.",
    technicalSpec: [
      { label: "Napi\u0119cie", value: "18 V LXT" },
      { label: "Tarcza", value: "125 mm" },
      { label: "Pr\u0119dko\u015B\u0107 obrotowa", value: "8500 obr/min" },
      { label: "Silnik", value: "Bezszczotkowy BL\u2122" },
      { label: "Masa (bez akum.)", value: "1,6 kg" }
    ],
    images: ["/images/products/p040-szlifierka-katowa_2.jpg"],
    tags: ["szlifierka k\u0105towa", "makita", "18v", "bezszczotkowa", "125mm", "lxt"],
    related: ["p026", "p028"],
    isNew: true
  },
  // WYLEWKA CEMENTOWA
  {
    id: "p041",
    slug: "wylewka-cementowa-atlas-postar-40-25kg",
    name: "Wylewka cementowa Atlas Postar 40 25kg",
    categorySlug: "wylewki-cementowe",
    brand: "Atlas",
    sku: "ATL-PST40-25",
    unit: "worek 25kg",
    shortDescription: "Cementowa masa podk\u0142adowa do wylewek i posadzek o grubo\u015Bci 20\u201380 mm.",
    description: "Atlas Postar 40 to cementowa masa podk\u0142adowa (jastrych) do wykonywania wylewek pod\u0142ogowych wewn\u0105trz budynk\xF3w. Stosowana pod p\u0142ytki ceramiczne, gres, wyk\u0142adziny PVC i panele pod\u0142ogowe. Mo\u017Cliwo\u015B\u0107 stosowania na ogrzewaniu pod\u0142ogowym.",
    application: "Wylewki pod\u0142ogowe pod p\u0142ytki, panele, parkiet i wyk\u0142adziny. Pod\u0142o\u017Ce: beton, ceramika, stare wylewki. Grubo\u015B\u0107 warstwy 20\u201380 mm.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "ok. 18 kg/m\xB2 (przy 10 mm)" },
      { label: "Grubo\u015B\u0107 warstwy", value: "20\u201380 mm" },
      { label: "Czas schni\u0119cia", value: "8 h (chodzenie)" },
      { label: "Czas do u\u0142o\u017Cenia ok\u0142adzin", value: "28 dni" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie", value: "\u2265 20 MPa" }
    ],
    images: ["/images/products/p041-wylewka-cementowa_2.jpg"],
    tags: ["wylewka", "cementowa", "atlas", "postar", "jastrych", "posadzka"],
    related: ["p032", "p015", "p025"]
  },
  // TAŚMA USZCZELNIAJĄCA
  {
    id: "p042",
    slug: "tasma-uszczelniajaca-ceresit-cl-82-10m",
    name: "Ta\u015Bma uszczelniaj\u0105ca Ceresit CL 82 10m",
    categorySlug: "izolacje-przeciwwilgoc",
    brand: "Ceresit",
    sku: "CRS-CL82-10",
    unit: "rolka 10mb",
    shortDescription: "Elastyczna ta\u015Bma uszczelniaj\u0105ca do izolacji po\u0142\u0105cze\u0144 \u015Bcian i pod\u0142\xF3g w \u0142azienkach.",
    description: "Ceresit CL 82 to elastyczna ta\u015Bma uszczelniaj\u0105ca do stosowania na po\u0142\u0105czeniach \u015Bciana-pod\u0142oga i naro\u017Cach \u015Bciennych w systemach izolacji przeciwwilgociowej. Idealna do stosowania razem z mas\u0105 uszczelniaj\u0105c\u0105 Ceresit CL 50/51. Gwarantuje trwa\u0142\u0105 wodoszczelno\u015B\u0107 po\u0142\u0105cze\u0144.",
    application: "Uszczelnianie po\u0142\u0105cze\u0144 \u015Bciana-pod\u0142oga w \u0142azienkach, kabinach prysznicowych. Naro\u017Cniki \u015Bcian w strefach mokrych. Stosowa\u0107 z masami KMB lub uszczelniaczami hybrydowymi.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107", value: "120 mm" },
      { label: "D\u0142ugo\u015B\u0107 rolki", value: "10 m" },
      { label: "Materia\u0142", value: "Poliester/w\u0142\xF3knina" },
      { label: "Grubo\u015B\u0107", value: "0,65 mm" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na rozci\u0105ganie", value: "> 100 N/50mm" }
    ],
    images: ["/images/products/p042-tasma-uszczelniajaca_2.jpg"],
    tags: ["ta\u015Bma uszczelniaj\u0105ca", "ceresit", "cl82", "\u0142azienka", "hydroizolacja", "naro\u017Cnik"],
    related: ["p007", "p020", "p024"]
  },
  // STYROPIAN PODŁOGOWY
  {
    id: "p043",
    slug: "styropian-podlogowy-eps-100-swisspor-5cm",
    name: "Styropian pod\u0142ogowy EPS 100-038 Swisspor 5cm m\xB2",
    categorySlug: "styropian-podlogowy",
    brand: "Swisspor",
    sku: "SWS-EPS100-5-POD",
    unit: "m\xB2",
    shortDescription: "Styropian do izolacji pod\u0142\xF3g na gruncie i strop\xF3w mi\u0119dzy kondygnacyjnych. Grubo\u015B\u0107 5cm.",
    description: "Swisspor EPS 100-038 Pod\u0142oga to styropian do izolacji termicznej pod\u0142\xF3g na gruncie, mi\u0119dzy kondygnacyjnych i dach\xF3w odwr\xF3conych. Charakteryzuje si\u0119 wysok\u0105 odporno\u015Bci\u0105 na \u015Bciskanie (CS(10)100 kPa), co pozwala na bezpo\u015Brednie obci\u0105\u017Cenie wylewk\u0105 betonow\u0105.",
    application: "Izolacja pod\u0142\xF3g na gruncie. Ocieplenie strop\xF3w mi\u0119dzy kondygnacyjnych. Pod\u0142o\u017Ce pod wylewki i ogrzewanie pod\u0142ogowe.",
    technicalSpec: [
      { label: "Lambda (\u03BB)", value: "0,038 W/(m\xB7K)" },
      { label: "Grubo\u015B\u0107", value: "5 cm (dost\u0119pne: 2-15 cm)" },
      { label: "Napr\u0119\u017Cenie \u015Bciskaj\u0105ce", value: "CS(10)100 kPa" },
      { label: "Wymiar p\u0142yty", value: "100 \xD7 50 cm" },
      { label: "Klasa reakcji na ogie\u0144", value: "E" }
    ],
    images: ["/images/products/p043-styropian-podlogowy_2.jpg"],
    tags: ["styropian pod\u0142ogowy", "eps 100", "swisspor", "izolacja pod\u0142ogi", "jastrych"],
    related: ["p003", "p032", "p041"]
  },
  // FOLIA PAROIZOLACYJNA
  {
    id: "p044",
    slug: "folia-paroizolacyjna-strotex-pe-200-75m2",
    name: "Folia paroizolacyjna Strotex PE 200\xB5 75m\xB2",
    categorySlug: "folie-paroizolacyjne",
    brand: "Strotex",
    sku: "STR-PE200-75",
    unit: "rolka 75m\xB2",
    shortDescription: "Folia paroizolacyjna polietylenowa 200 \xB5m do dach\xF3w i strop\xF3w. Rola 75m\xB2.",
    description: "Strotex PE 200\xB5 to folia paroizolacyjna wykonana z polietylenu o grubo\u015Bci 200 \xB5m. Stosowana jako warstwa paroizolacyjna w dachach sko\u015Bnych, stropach drewnianych i poddaszy u\u017Cytkowych. Zapobiega przenikaniu wilgoci z pomieszcze\u0144 do izolacji termicznej.",
    application: "Paroizolacja dach\xF3w sko\u015Bnych i poddaszy u\u017Cytkowych. Izolacja paroszczelna strop\xF3w drewnianych. Monta\u017C od strony ciep\u0142ej, przed warstw\u0105 izolacji.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "200 \xB5m" },
      { label: "Masa powierzchniowa", value: "188 g/m\xB2" },
      { label: "Paroprzepuszczalno\u015B\u0107 Sd", value: "\u2265 100 m" },
      { label: "Szeroko\u015B\u0107 rolki", value: "1,5 m" },
      { label: "D\u0142ugo\u015B\u0107 rolki", value: "50 m" }
    ],
    images: ["/images/products/p044-folia-paroizolacyjna_2.jpg"],
    tags: ["folia paroizolacyjna", "strotex", "pe200", "dach", "paroizolacja", "poddasze"],
    related: ["p029", "p004", "p003"]
  },
  // PROFIL UW
  {
    id: "p045",
    slug: "profil-uw-75-knauf-3m",
    name: "Profil UW 75/40 Knauf 3m",
    categorySlug: "profile-scian",
    brand: "Knauf",
    sku: "KNF-UW75-3",
    unit: "szt. 3m",
    shortDescription: "Profil stalowy UW 75/40mm do budowy \u015Bcian dzia\u0142owych z p\u0142yt GK.",
    description: "Profil UW 75/40 Knauf to ocynkowany profil stalowy do budowy \u015Bcian dzia\u0142owych z p\u0142yt gipsowo-kartonowych. Profil UW to poziomy element ograniczaj\u0105cy (g\xF3rny i dolny) szkieletu \u015Bciany, w kt\xF3rym montuje si\u0119 profile CW 75. Grubo\u015B\u0107 blachy 0,6 mm.",
    application: "Budowa \u015Bcian dzia\u0142owych z p\u0142yt GK. Element poziomy (g\xF3rny i dolny) szkieletu \u015Bcian. Monta\u017C na pod\u0142o\u017Cu i suficie za pomoc\u0105 ko\u0142k\xF3w.",
    technicalSpec: [
      { label: "Wymiary profilu", value: "75 \xD7 40 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "3 m (dost\u0119pne: 2,6; 3,0; 4,0 m)" },
      { label: "Grubo\u015B\u0107 blachy", value: "0,6 mm" },
      { label: "Materia\u0142", value: "Ocynkowana blacha stalowa" },
      { label: "System", value: "Knauf W111/W112 (\u015Bciana 75mm)" }
    ],
    images: ["/images/products/p045-profil-uw_2.jpg"],
    tags: ["profil UW", "75mm", "knauf", "sucha zabudowa", "\u015Bciana dzia\u0142owa"],
    related: ["p022", "p021", "p011"]
  },
  // BLOCZEK CERAMICZNY POROTHERM
  {
    id: "p046",
    slug: "bloczek-ceramiczny-wienerberger-porotherm-25",
    name: "Bloczek ceramiczny Wienerberger Porotherm 25 P+W",
    categorySlug: "ceramika-budowlana",
    brand: "Wienerberger",
    sku: "WNB-PTH25-PW",
    unit: "szt.",
    shortDescription: "Pustak ceramiczny szczelinowy Porotherm 25 P+W z pi\xF3rami i wpustami. \u03BB=0,26 W/(m\xB7K).",
    description: "Wienerberger Porotherm 25 P+W to ceramiczny pustak \u015Bcienny szczelinowy z systemem pi\xF3ro-wpust umo\u017Cliwiaj\u0105cym murowanie bez wype\u0142niania spoin pionowych. Wysoka precyzja wymiarowania eliminuje konieczno\u015B\u0107 tynkowania wewn\u0105trz pomieszcze\u0144 o normalnych wymaganiach. G\u0119sto\u015B\u0107 780 kg/m\xB3.",
    application: "\u015Aciany zewn\u0119trzne jednorodne i warstwowe. \u015Aciany no\u015Bne wewn\u0119trzne budynk\xF3w mieszkalnych. Murowanie z cienkowarstwow\u0105 zapraw\u0105 Porotherm Profi.",
    technicalSpec: [
      { label: "Wymiary (D\xD7W\xD7H)", value: "375 \xD7 250 \xD7 238 mm" },
      { label: "Lambda deklarowane (\u03BBD)", value: "0,26 W/(m\xB7K)" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie", value: "\u2265 10 N/mm\xB2" },
      { label: "G\u0119sto\u015B\u0107 bloczka", value: "780 kg/m\xB3" },
      { label: "System spoin pionowych", value: "Pi\xF3ro-wpust (bez zaprawy)" }
    ],
    images: ["/images/products/p046-bloczek-ceramiczny_2.jpg"],
    tags: ["pustak ceramiczny", "porotherm", "wienerberger", "25cm", "\u015Bciana", "ceramika"],
    related: ["p013", "p023", "p039"],
    isFeatured: true
  },
  // TYNK AKRYLOWY
  {
    id: "p047",
    slug: "tynk-akrylowy-weber-pas-ar3-15kg",
    name: "Tynk akrylowy weber.pas AR3 15kg",
    categorySlug: "tynki-akrylowe",
    brand: "Weber",
    sku: "WEB-AR3-15",
    unit: "wiadro 15kg",
    shortDescription: "Akrylowy tynk elewacyjny gotowy do u\u017Cycia, struktura drapana 1,5 mm lub 2 mm.",
    description: "Weber.pas AR3 to gotowy tynk akrylowy do elewacji o strukturze drapanej lub kornikowej. Produkt \u0142atwy w aplikacji r\u0119cznej, gotowy do u\u017Cycia po rozmieszaniu. Charakteryzuje si\u0119 elastyczno\u015Bci\u0105 i odporno\u015Bci\u0105 na zabrudzenia. Dost\u0119pny w gamie kolor\xF3w z mieszalnika Weber Color.",
    application: "Zewn\u0119trzne wyko\u0144czenie elewacji budynk\xF3w w systemach ETICS lub na pod\u0142o\u017Cach mineralnych. Renowacja i nowe budowy.",
    technicalSpec: [
      { label: "Granulacja", value: "1,5 mm lub 2,0 mm" },
      { label: "Zu\u017Cycie", value: "2,5\u20133,5 kg/m\xB2" },
      { label: "Czas schni\u0119cia", value: "24\u201348 h" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +25\xB0C" },
      { label: "Baza", value: "Dyspersja akrylowa" }
    ],
    images: ["/images/products/p047-tynk-akrylowy_2.jpg"],
    tags: ["tynk akrylowy", "weber", "elewacja", "drapany", "gotowy", "etics"],
    related: ["p001", "p005", "p008"],
    isNew: true
  },
  // FARBA SILIKATOWA
  {
    id: "p048",
    slug: "farba-silikatowa-caparol-capasil-10l",
    name: "Farba silikatowa elewacyjna Caparol CapaSil 10L",
    categorySlug: "farby-elaw-silikatowe",
    brand: "Caparol",
    sku: "CAP-CSL-10",
    unit: "wiadro 10L",
    shortDescription: "Silikatowa farba elewacyjna z dodatkiem silikonu, silnie kryj\u0105ca, odporna na UV.",
    description: "Caparol CapaSil to farba elewacyjna na bazie potasowego szk\u0142a wodnego z dodatkiem silikonu. Charakteryzuje si\u0119 wyj\u0105tkow\u0105 trwa\u0142o\u015Bci\u0105 i odporno\u015Bci\u0105 na UV, siln\u0105 wi\u0105zalno\u015Bci\u0105 z pod\u0142o\u017Cem i wysok\u0105 paroprzepuszczalno\u015Bci\u0105. Produkt przeznaczony do ochrony i dekoracji elewacji mineralnych.",
    application: "Malowanie elewacji mineralnych (tynki silikatowe, mineralne, cementowe). Renowacja elewacji. Stosowa\u0107 po gruntowaniu preparatem Caparol.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "150\u2013200 ml/m\xB2 (1 warstwa)" },
      { label: "Wydajno\u015B\u0107 10L", value: "50\u201365 m\xB2" },
      { label: "Czas schni\u0119cia (dotyk)", value: "ok. 1 h" },
      { label: "Pe\u0142ne wyschni\u0119cie", value: "ok. 24 h" },
      { label: "Klasa odporno\u015Bci na zmywanie", value: "W1" }
    ],
    images: ["/images/products/p048-farba-silikatowa_2.jpg"],
    tags: ["farba silikatowa", "caparol", "capasil", "elewacja", "paroprzepuszczalna"],
    related: ["p008", "p001", "p005"]
  },
  // KLEJ ELASTYCZNY C2
  {
    id: "p049",
    slug: "klej-elastyczny-ceresit-cm17-25kg",
    name: "Klej elastyczny Ceresit CM 17 25kg",
    categorySlug: "kleje-glazura",
    brand: "Ceresit",
    sku: "CRS-CM17-25",
    unit: "worek 25kg",
    shortDescription: "Klej cementowy elastyczny C2 do wielkoformatowych p\u0142ytek i gresu na pod\u0142ogach i \u015Bcianach.",
    description: "Ceresit CM 17 to wysoko elastyczny klej cementowy (C2TE S1) do przyklejania wielkoformatowych p\u0142ytek gresowych i ceramicznych na pod\u0142ogach ogrzewanych i elewacjach. D\u0142ugi czas otwarty (30 min) u\u0142atwia prac\u0119 z du\u017Cymi formatami. Certyfikowany wg EN 12004.",
    application: "Przyklejanie gres\xF3w wielkoformatowych 60\xD760 i 120\xD760 cm. Ogrzewanie pod\u0142ogowe. Elewacje zewn\u0119trzne. Pod\u0142o\u017Ca odkszta\u0142calne.",
    technicalSpec: [
      { label: "Klasa wg EN 12004", value: "C2TE S1" },
      { label: "Czas otwarty", value: "ok. 30 min" },
      { label: "Odporno\u015B\u0107 na po\u015Blizg", value: "T (pionowe, bez sp\u0142ywu)" },
      { label: "Odkszta\u0142calno\u015B\u0107 poprzeczna", value: "S1 (\u2265 2,5 mm)" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +25\xB0C" }
    ],
    images: ["/images/products/p049-klej-elastyczny_2.jpg"],
    tags: ["klej elastyczny", "c2", "ceresit", "cm17", "wielkoformatowy", "gres"],
    related: ["p015", "p025", "p016"],
    isNew: true
  },
  // ZAPRAWA WYRÓWNUJĄCA
  {
    id: "p050",
    slug: "zaprawa-wygladzajaca-atlas-uni-25kg",
    name: "Zaprawa wyr\xF3wnuj\u0105ca Atlas Uni 25kg",
    categorySlug: "tynki-gipsowe",
    brand: "Atlas",
    sku: "ATL-UNI-25",
    unit: "worek 25kg",
    shortDescription: "Cienkowarstwowa zaprawa gipsowo-cementowa do wyr\xF3wnywania \u015Bcian i sufit\xF3w.",
    description: "Atlas Uni to wielofunkcyjna zaprawa gipsowo-cementowa do szpachlowania i wyr\xF3wnywania powierzchni \u015Bcian i sufit\xF3w wewn\u0119trznych. \u0141\u0105czy zalety zapraw gipsowych (bia\u0142a powierzchnia, \u0142atwo\u015B\u0107 obr\xF3bki) i cementowych (wi\u0119ksza odporno\u015B\u0107 na wilgo\u0107). Idealna do napraw i wyr\xF3wnywania przed malowaniem.",
    application: "Wyr\xF3wnywanie nier\xF3wno\u015Bci \u015Bcian i sufit\xF3w przed malowaniem. Uzupe\u0142nianie p\u0119kni\u0119\u0107 i ubytk\xF3w. Pod\u0142o\u017Ca: tynk, beton, GK. Grubo\u015B\u0107 1\u201320 mm.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "ok. 1,0\u20131,4 kg/m\xB2/mm" },
      { label: "Grubo\u015B\u0107 warstwy", value: "1\u201320 mm" },
      { label: "Czas otwarty", value: "ok. 45 min" },
      { label: "Czas schni\u0119cia", value: "3\u20135 h" },
      { label: "Spoiwo", value: "Gipsowo-cementowe" }
    ],
    images: ["/images/products/p050-zaprawa-wygladzajaca_2.jpg"],
    tags: ["zaprawa wyr\xF3wnuj\u0105ca", "atlas", "uni", "szpachlowanie", "gips", "\u015Bciana"],
    related: ["p006", "p011", "p005"]
  },
  // ─── p051–p100 (chemia, izolacje, farby, sucha zabudowa) ───────────────────
  {
    id: "p051",
    slug: "tynk-silikatowy-caparol-amphisilan-15kg",
    name: "Tynk silikatowy Caparol AmphiSilan 15 kg",
    categorySlug: "tynki-silikatowe",
    brand: "Caparol",
    sku: "CAP-AMPH-SIL-15",
    unit: "wiadro 15 kg",
    shortDescription: "Tynk silikatowy Caparol AmphiSilan 15 kg to wysokiej jako\u015Bci wyprawa elewacyjna o wyj\u0105tkowej odporno\u015Bci na warunki atmosferyczne i paroprzepuszczalno\u015Bci, idealna do system\xF3w ETICS.",
    description: "Caparol AmphiSilan to nowoczesny tynk silikatowy o podwy\u017Cszonej odporno\u015Bci na dzia\u0142anie wody i zabrudzenia, przeznaczony do stosowania na zewn\u0105trz budynk\xF3w. Jego wyj\u0105tkowa paroprzepuszczalno\u015B\u0107 (sd \u2264 0,02 m) zapewnia zdrowy mikroklimat i skuteczn\u0105 ochron\u0119 przed wilgoci\u0105, co jest kluczowe w systemach ocieple\u0144 ETICS. Dost\u0119pny w granulacjach 1,5 mm i 2,0 mm, umo\u017Cliwia uzyskanie estetycznego wyko\u0144czenia elewacji. Tynk AmphiSilan charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105, trwa\u0142o\u015Bci\u0105 koloru i odporno\u015Bci\u0105 na glony oraz grzyby, co gwarantuje d\u0142ugoletni\u0105 estetyk\u0119 fasady. Klasa ogniowa A2 potwierdza jego bezpiecze\u0144stwo. Idealny do renowacji i nowych bud\xF3w.",
    application: "Stosuj na stabilnych i no\u015Bnych pod\u0142o\u017Cach elewacyjnych, zagruntowanych odpowiednim preparatem Caparol. Tynk nadaje si\u0119 do nak\u0142adania r\u0119cznego lub maszynowego, w temperaturze otoczenia i pod\u0142o\u017Ca od +5\xB0C do +30\xB0C. Unikaj aplikacji w pe\u0142nym s\u0142o\u0144cu, podczas silnego wiatru oraz w deszczu. Przed aplikacj\u0105 zapoznaj si\u0119 ze szczeg\xF3\u0142ow\u0105 instrukcj\u0105 producenta.",
    technicalSpec: [
      { label: "Granulacja", value: "1,5 mm lub 2,0 mm" },
      { label: "Zu\u017Cycie", value: "2,8\u20133,5 kg/m\xB2" },
      { label: "Czas schni\u0119cia", value: "24\u201348 h" },
      { label: "Paroprzepuszczalno\u015B\u0107", value: "sd \u2264 0,02 m" },
      { label: "Klasa ogniowa", value: "A2" }
    ],
    images: [],
    tags: [
      "tynk silikatowy",
      "caparol",
      "amphisilan",
      "elewacja",
      "paroprzepuszczalny",
      "etics"
    ],
    related: ["p001", "p012", "p002"],
    advantages: [
      "Wyj\u0105tkowa odporno\u015B\u0107 na warunki atmosferyczne i zabrudzenia.",
      "Wysoka paroprzepuszczalno\u015B\u0107 dla zdrowego mikroklimatu i ochrony \u015Bcian.",
      "D\u0142ugotrwa\u0142a trwa\u0142o\u015B\u0107 koloru i odporno\u015B\u0107 na rozw\xF3j glon\xF3w i grzyb\xF3w.",
      "Idealny do system\xF3w ocieple\u0144 ETICS oraz renowacji elewacji."
    ],
    warnings: [
      "Nie stosowa\u0107 na pod\u0142o\u017Cach niestabilnych, lu\u017Anych lub pyl\u0105cych.",
      "Nale\u017Cy chroni\u0107 \u015Bwie\u017Co na\u0142o\u017Con\u0105 warstw\u0119 przed opadami atmosferycznymi i nadmiernym nas\u0142onecznieniem."
    ],
    faq: [
      { q: "Jakie jest przeznaczenie tynku Caparol AmphiSilan?", a: "Tynk Caparol AmphiSilan jest przeznaczony do wykonywania dekoracyjnych i ochronnych warstw wierzchnich na elewacjach budynk\xF3w, szczeg\xF3lnie w systemach ocieple\u0144 ETICS. Doskonale sprawdza si\u0119 r\xF3wnie\u017C przy renowacji starych tynk\xF3w." },
      { q: "Jakie s\u0105 dost\u0119pne granulacje tynku AmphiSilan?", a: "Tynk Caparol AmphiSilan jest dost\u0119pny w dw\xF3ch popularnych granulacjach: 1,5 mm oraz 2,0 mm, co pozwala na uzyskanie r\xF3\u017Cnorodnych efekt\xF3w teksturalnych fasady." },
      { q: "Czy tynk jest odporny na rozw\xF3j mikroorganizm\xF3w?", a: "Tak, tynk Caparol AmphiSilan posiada zwi\u0119kszon\u0105 odporno\u015B\u0107 na rozw\xF3j glon\xF3w i grzyb\xF3w, co przyczynia si\u0119 do zachowania estetycznego wygl\u0105du elewacji przez d\u0142ugie lata." }
    ],
    seoDescription: "Szukasz trwa\u0142ego i estetycznego tynku elewacyjnego? Caparol AmphiSilan 15 kg to nowoczesny tynk silikatowy o doskona\u0142ej paroprzepuszczalno\u015Bci, idealny do system\xF3w ETICS. Wybierz tynk silikatowy Caparol o granulacji 1,5 mm lub 2,0 mm, kt\xF3ry zapewni Twojej elewacji wyj\u0105tkow\u0105 odporno\u015B\u0107 na warunki atmosferyczne i zabrudzenia. Paroprzepuszczalny tynk AmphiSilan gwarantuje d\u0142ugowieczno\u015B\u0107 i pi\u0119kny wygl\u0105d fasady. Sprawd\u017A zu\u017Cycie 2,8\u20133,5 kg/m\xB2 i czas schni\u0119cia 24\u201348 h. Najlepszy tynk silikatowy do ochrony i dekoracji \u015Bcian zewn\u0119trznych, klasa ogniowa A2 dla maksymalnego bezpiecze\u0144stwa. Kup teraz wysokiej jako\u015Bci tynk elewacyjny Caparol."
  },
  {
    id: "p052",
    slug: "tynk-silikonowo-silikatowy-weber-pas-sid-15kg",
    name: "Tynk silikonowo-silikatowy weber.pas SID 15 kg",
    categorySlug: "tynki-silikonowo-silikatowe",
    brand: "Weber",
    sku: "WEB-SID-15",
    unit: "wiadro 15 kg",
    shortDescription: "Tynk silikonowo-silikatowy Weber.pas SID to wysokiej jako\u015Bci wyprawa elewacyjna o efekcie lotosu. Zapewnia d\u0142ugotrwa\u0142\u0105 ochron\u0119 i estetyczny wygl\u0105d fasady.",
    description: "Odkryj innowacyjny tynk silikonowo-silikatowy Weber.pas SID, idealny do wyka\u0144czania elewacji i system\xF3w ETICS. Jego unikalna formu\u0142a oparta na po\u0142\u0105czeniu \u017Cywic silikonowych i krzemianowych zapewnia wyj\u0105tkow\u0105 odporno\u015B\u0107 na zabrudzenia dzi\u0119ki efektowi lotosu \u2013 woda i zanieczyszczenia sp\u0142ywaj\u0105 po powierzchni, pozostawiaj\u0105c j\u0105 czyst\u0105. Tynk jest wysoce paroprzepuszczalny, hydrofobowy i odporny na dzia\u0142anie czynnik\xF3w atmosferycznych, co gwarantuje trwa\u0142o\u015B\u0107 i estetyk\u0119 elewacji na lata. Dost\u0119pny w granulacji 1,5 mm i 2,0 mm, pozwala na uzyskanie r\xF3\u017Cnorodnych efekt\xF3w dekoracyjnych.",
    application: "Tynk Weber.pas SID przeznaczony jest do stosowania na zewn\u0105trz budynk\xF3w, na stabilnych i r\xF3wnych pod\u0142o\u017Cach, takich jak beton, zaprawy cementowe, cementowo-wapienne oraz jako warstwa wyko\u0144czeniowa w systemach ocieple\u0144 ETICS. Nale\u017Cy aplikowa\u0107 w temperaturze od +5\xB0C do +25\xB0C, chroni\u0105c przed bezpo\u015Brednim nas\u0142onecznieniem i opadami deszczu podczas schni\u0119cia.",
    technicalSpec: [
      { label: "Granulacja", value: "1,5 mm lub 2,0 mm" },
      { label: "Zu\u017Cycie", value: "2,5\u20133,2 kg/m\xB2" },
      { label: "Czas schni\u0119cia", value: "24\u201348 h" },
      { label: "Odporna na brud", value: "TAK \u2013 efekt lotosu" }
    ],
    images: [],
    tags: [
      "tynk silikonowo-silikatowy",
      "weber",
      "elewacja",
      "efekt lotosu",
      "etics",
      "hydrofobowy"
    ],
    related: ["p001", "p051", "p012"],
    advantages: [
      "Wyj\u0105tkowa odporno\u015B\u0107 na zabrudzenia dzi\u0119ki efektowi lotosu.",
      'Wysoka paroprzepuszczalno\u015B\u0107, zapewniaj\u0105ca "oddychalno\u015B\u0107" \u015Bcian.',
      "Doskona\u0142a hydrofobowo\u015B\u0107, chroni\u0105ca elewacj\u0119 przed wilgoci\u0105.",
      "D\u0142ugotrwa\u0142a estetyka i ochrona przed czynnikami atmosferycznymi."
    ],
    warnings: [
      "Nie stosowa\u0107 na przegrzane lub nas\u0142onecznione pod\u0142o\u017Ca.",
      "Chroni\u0107 \u015Bwie\u017Co na\u0142o\u017Cony tynk przed deszczem i mrozem."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety tynku silikonowo-silikatowego Weber.pas SID?", a: "G\u0142\xF3wne zalety to wyj\u0105tkowa odporno\u015B\u0107 na zabrudzenia dzi\u0119ki efektowi lotosu, wysoka paroprzepuszczalno\u015B\u0107, doskona\u0142a hydrofobowo\u015B\u0107 oraz odporno\u015B\u0107 na warunki atmosferyczne, co przek\u0142ada si\u0119 na d\u0142ugotrwa\u0142\u0105 estetyk\u0119 elewacji." },
      { q: "Na jakich pod\u0142o\u017Cach mo\u017Cna stosowa\u0107 tynk Weber.pas SID?", a: "Tynk nadaje si\u0119 do aplikacji na stabilnych i r\xF3wnych pod\u0142o\u017Cach, takich jak beton, zaprawy cementowe, cementowo-wapienne oraz jako wyko\u0144czenie system\xF3w ocieple\u0144 ETICS." },
      { q: "Jaki jest czas schni\u0119cia tynku Weber.pas SID?", a: "Czas schni\u0119cia tynku wynosi zazwyczaj od 24 do 48 godzin, w zale\u017Cno\u015Bci od warunk\xF3w atmosferycznych, takich jak temperatura i wilgotno\u015B\u0107 powietrza." }
    ],
    seoDescription: "Szukasz trwa\u0142ego i estetycznego tynku elewacyjnego? Tynk silikonowo-silikatowy Weber.pas SID to idealne rozwi\u0105zanie. Zastosowanie nowoczesnej technologii opartej na \u017Cywicach silikonowych i krzemianowych gwarantuje efekt lotosu \u2013 elewacja samooczyszczaj\u0105ca si\u0119 pod wp\u0142ywem deszczu. Ten hydrofobowy i wysoce paroprzepuszczalny tynk elewacyjny Weber doskonale sprawdzi si\u0119 w systemach ETICS, chroni\u0105c fasad\u0119 przed zabrudzeniami i warunkami atmosferycznymi. Dost\u0119pny w granulacji 1,5 mm i 2,0 mm, zapewnia d\u0142ugotrwa\u0142y, pi\u0119kny wygl\u0105d Twojego domu. Kupuj tynki silikonowo-silikatowe Weber online."
  },
  {
    id: "p053",
    slug: "tynk-akrylowy-atlas-cermit-n-25kg",
    name: "Tynk akrylowy Atlas CERMIT N-20 25 kg",
    categorySlug: "tynki-akrylowe",
    brand: "Atlas",
    sku: "ATL-CERMIT-N-25",
    unit: "worek 25 kg",
    shortDescription: "Wysokiej jako\u015Bci tynk akrylowy Atlas CERMIT N-20 o granulacji 2,0 mm, zapewniaj\u0105cy trwa\u0142e i estetyczne wyko\u0144czenie elewacji. Odporny na warunki atmosferyczne.",
    description: "Tynk akrylowy Atlas CERMIT N-20 to nowoczesny materia\u0142 wyko\u0144czeniowy przeznaczony do stosowania na zewn\u0105trz budynk\xF3w, zw\u0142aszcza w systemach ocieple\u0144 ETICS. Jego granulacja 2,0 mm pozwala na uzyskanie g\u0142adkiej, r\xF3wnomiernej powierzchni o estetycznym wygl\u0105dzie. Wysoka elastyczno\u015B\u0107 tynku minimalizuje ryzyko powstawania rys skurczowych, a doskona\u0142a przyczepno\u015B\u0107 do pod\u0142o\u017Ca gwarantuje trwa\u0142o\u015B\u0107 wykonanej elewacji. Preparat jest odporny na dzia\u0142anie czynnik\xF3w atmosferycznych, takich jak deszcz, mr\xF3z czy promieniowanie UV, co przek\u0142ada si\u0119 na d\u0142ugowieczno\u015B\u0107 wyko\u0144czenia. Idealny do dekoracyjnego i ochronnego wyka\u0144czania \u015Bcian zewn\u0119trznych.",
    application: "Atlas CERMIT N-20 przeznaczony jest do r\u0119cznego nak\u0142adania na pod\u0142o\u017Ca mineralne, takie jak tynki cementowe, cementowo-wapienne, a tak\u017Ce na p\u0142yty izolacyjne w systemach ETICS. Stosowa\u0107 na zagruntowanych powierzchniach no\u015Bnych, suchych i czystych. Optymalne warunki aplikacji to temperatura od +5\xB0C do +25\xB0C, przy czym nale\u017Cy unika\u0107 pracy w bezpo\u015Brednim nas\u0142onecznieniu i podczas opad\xF3w.",
    technicalSpec: [
      { label: "Granulacja", value: "2,0 mm" },
      { label: "Zu\u017Cycie", value: "3,0\u20134,0 kg/m\xB2" },
      { label: "Czas schni\u0119cia", value: "24 h" },
      { label: "Elastyczno\u015B\u0107", value: "wysoka" },
      { label: "Klasa ogniowa", value: "E" }
    ],
    images: [],
    tags: [
      "tynk akrylowy",
      "atlas",
      "cermit",
      "elewacja",
      "elastyczny",
      "etics"
    ],
    related: ["p001", "p051", "p052"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na warunki atmosferyczne i UV.",
      "Doskona\u0142a elastyczno\u015B\u0107, zapobiegaj\u0105ca powstawaniu rys.",
      "Trwa\u0142o\u015B\u0107 koloru i estetyczny wygl\u0105d elewacji.",
      "\u0141atwo\u015B\u0107 aplikacji i dobre w\u0142a\u015Bciwo\u015Bci robocze."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +5\xB0C.",
      "Chroni\u0107 \u015Bwie\u017Co na\u0142o\u017Con\u0105 warstw\u0119 przed deszczem i nadmiernym nas\u0142onecznieniem."
    ],
    faq: [
      { q: "Jaka jest zalecana grubo\u015B\u0107 warstwy tynku akrylowego Atlas CERMIT N-20?", a: "Grubo\u015B\u0107 warstwy tynku powinna by\u0107 zbli\u017Cona do wielko\u015Bci ziarna kruszywa, co w przypadku granulacji 2,0 mm oznacza oko\u0142o 2 mm. Nale\u017Cy zapewni\u0107 r\xF3wnomierne rozprowadzenie materia\u0142u na ca\u0142ej powierzchni." },
      { q: "Czy tynk akrylowy Atlas CERMIT N-20 nadaje si\u0119 do renowacji starych elewacji?", a: "Tak, tynk akrylowy Atlas CERMIT N-20 mo\u017Ce by\u0107 stosowany do renowacji starych elewacji, pod warunkiem odpowiedniego przygotowania pod\u0142o\u017Ca, tj. oczyszczenia, usuni\u0119cia lu\u017Anych fragment\xF3w i zagruntowania." },
      { q: "Jakie s\u0105 wymagania dotycz\u0105ce pod\u0142o\u017Ca przed na\u0142o\u017Ceniem tynku?", a: "Pod\u0142o\u017Ce musi by\u0107 stabilne, no\u015Bne, suche, wolne od kurzu, t\u0142uszczu i innych zanieczyszcze\u0144. Zaleca si\u0119 stosowanie odpowiedniego gruntu dedykowanego do tynk\xF3w akrylowych." }
    ],
    seoDescription: "Szukasz trwa\u0142ego i estetycznego wyko\u0144czenia elewacji? Poznaj tynk akrylowy Atlas CERMIT N-20 25 kg. Ten wysokiej jako\u015Bci tynk elewacyjny z granulacj\u0105 2,0 mm zapewnia doskona\u0142\u0105 elastyczno\u015B\u0107 i odporno\u015B\u0107 na czynniki atmosferyczne. Idealny do system\xF3w ocieple\u0144 ETICS. Monta\u017C tynku akrylowego na \u015Bcianach zewn\u0119trznych nigdy nie by\u0142 prostszy. Zapewnij swojej elewacji d\u0142ugotrwa\u0142y blask dzi\u0119ki sprawdzonej marce Atlas. Tynk Atlas CERMIT N-20 to gwarancja jako\u015Bci i satysfakcji. Sprawd\u017A zastosowanie, zalety i parametry techniczne tego elastycznego tynku."
  },
  {
    id: "p054",
    slug: "tynk-mozaikowy-baumit-mosaiktop-25kg",
    name: "Tynk mozaikowy Baumit MosaikTop 25 kg",
    categorySlug: "tynki-mozaikowe",
    brand: "Baumit",
    sku: "BAU-MOSAIKTOP-25",
    unit: "wiadro 25 kg",
    shortDescription: "Tynk mozaikowy Baumit MosaikTop to dekoracyjna, trwa\u0142a i odporna na warunki atmosferyczne zaprawa do wyka\u0144czania coko\u0142\xF3w i elewacji. Dost\u0119pny w wielu kolorach.",
    description: "Baumit MosaikTop to wysokiej jako\u015Bci tynk mozaikowy, idealny do estetycznego wyko\u0144czenia coko\u0142\xF3w budynk\xF3w oraz fragment\xF3w elewacji nara\u017Conych na zabrudzenia i uszkodzenia mechaniczne. Jego unikalna struktura oparta na drobnych kamyczkach kwarcowych zapewnia nie tylko atrakcyjny wygl\u0105d, ale tak\u017Ce doskona\u0142\u0105 odporno\u015B\u0107 na czynniki atmosferyczne, wilgo\u0107 i promieniowanie UV. Tynk jest \u0142atwy w aplikacji i tworzy jednolit\u0105, wytrzyma\u0142\u0105 powierzchni\u0119. Szeroka gama dost\u0119pnych kolor\xF3w pozwala na dopasowanie do ka\u017Cdej architektury. Baumit MosaikTop to synonim trwa\u0142o\u015Bci i nowoczesnego designu.",
    application: "Produkt przeznaczony jest do r\u0119cznego nak\u0142adania na stabilne pod\u0142o\u017Ca budowlane, takie jak beton, tynki cementowe czy cementowo-wapienne. Zalecany do stosowania na coko\u0142ach budynk\xF3w oraz na fragmentach elewacji, gdzie wymagana jest zwi\u0119kszona odporno\u015B\u0107 na zabrudzenia i uszkodzenia. Nale\u017Cy stosowa\u0107 w temperaturze otoczenia i pod\u0142o\u017Ca powy\u017Cej +5\xB0C, chroni\u0105c \u015Bwie\u017Co na\u0142o\u017Con\u0105 warstw\u0119 przed deszczem i bezpo\u015Brednim nas\u0142onecznieniem.",
    technicalSpec: [
      { label: "Granulacja", value: "1,0\u20132,0 mm" },
      { label: "Zu\u017Cycie", value: "3,0\u20134,0 kg/m\xB2" },
      { label: "Czas schni\u0119cia", value: "24 h" },
      { label: "Przeznaczenie", value: "cok\xF3\u0142, elewacja" }
    ],
    images: [],
    tags: [
      "tynk mozaikowy",
      "baumit",
      "mosaiktop",
      "cok\xF3\u0142",
      "elewacja",
      "kamyczki"
    ],
    related: ["p001", "p051", "p012"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na uszkodzenia mechaniczne i warunki atmosferyczne.",
      "Atrakcyjna, mozaikowa struktura nadaj\u0105ca elewacji unikalny charakter.",
      "\u0141atwo\u015B\u0107 aplikacji i obr\xF3bki.",
      "Szeroka gama kolorystyczna do indywidualnego dopasowania."
    ],
    warnings: [
      "Nie stosowa\u0107 poni\u017Cej +5\xB0C oraz podczas silnego nas\u0142onecznienia lub wiatru.",
      "Chro\u0144 \u015Bwie\u017Co na\u0142o\u017Con\u0105 warstw\u0119 przed deszczem do momentu ca\u0142kowitego wyschni\u0119cia."
    ],
    faq: [
      { q: "Jakie jest g\u0142\xF3wne zastosowanie tynku mozaikowego Baumit MosaikTop?", a: "Tynk mozaikowy Baumit MosaikTop jest przede wszystkim stosowany do dekoracyjnego i ochronnego wyka\u0144czania coko\u0142\xF3w budynk\xF3w oraz fragment\xF3w elewacji, gdzie wymagana jest zwi\u0119kszona odporno\u015B\u0107 na zabrudzenia i uszkodzenia mechaniczne." },
      { q: "Jakie s\u0105 dost\u0119pne granulacje tynku Baumit MosaikTop?", a: "Tynk mozaikowy Baumit MosaikTop jest dost\u0119pny w granulacji 1,0\u20132,0 mm, co zapewnia charakterystyczn\u0105, mozaikow\u0105 struktur\u0119 powierzchni." },
      { q: "Ile wynosi \u015Brednie zu\u017Cycie tynku mozaikowego Baumit MosaikTop na metr kwadratowy?", a: "\u015Arednie zu\u017Cycie tynku mozaikowego Baumit MosaikTop wynosi od 3,0 do 4,0 kg na metr kwadratowy, w zale\u017Cno\u015Bci od grubo\u015Bci warstwy i techniki aplikacji." }
    ],
    seoDescription: "Odkryj wyj\u0105tkowy tynk mozaikowy Baumit MosaikTop 25 kg, idealny do wyko\u0144czenia coko\u0142u i elewacji. Poznaj jego zastosowanie, zalety i parametry techniczne. Ten trwa\u0142y tynk mozaikowy z kamyczkami kwarcowymi o granulacji 1,0-2,0 mm zapewnia doskona\u0142\u0105 odporno\u015B\u0107 na warunki atmosferyczne i uszkodzenia mechaniczne. Baumit MosaikTop to synonim estetyki i d\u0142ugowieczno\u015Bci dla Twojego domu. \u0141atwy w aplikacji, dost\u0119pny w bogatej palecie kolor\xF3w. Sprawd\u017A, jak nada\u0107 swojemu budynkowi niepowtarzalny charakter z tynkiem mozaikowym Baumit."
  },
  {
    id: "p055",
    slug: "tynk-cementowo-wapienny-atlas-sm-25kg",
    name: "Tynk cementowo-wapienny Atlas SM 25 kg",
    categorySlug: "tynki-cementowo-wapienne",
    brand: "Atlas",
    sku: "ATL-SM-25",
    unit: "worek 25 kg",
    shortDescription: "Tynk cementowo-wapienny Atlas SM 25 kg to uniwersalna zaprawa tynkarska do zastosowa\u0144 wewn\u0119trznych i zewn\u0119trznych. Zapewnia wysok\u0105 wytrzyma\u0142o\u015B\u0107 i paroprzepuszczalno\u015B\u0107.",
    description: "Tynk cementowo-wapienny Atlas SM o wadze 25 kg to wysokiej jako\u015Bci, wszechstronna zaprawa przeznaczona do wykonywania tradycyjnych tynk\xF3w metod\u0105 r\u0119czn\u0105 i maszynow\u0105. Idealnie nadaje si\u0119 do stosowania zar\xF3wno wewn\u0105trz, jak i na zewn\u0105trz budynk\xF3w. Dzi\u0119ki odpowiednio dobranym sk\u0142adnikom, tynk charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105 do pod\u0142o\u017Ca, wysok\u0105 wytrzyma\u0142o\u015Bci\u0105 mechaniczn\u0105 (klasa CS IV) oraz bardzo dobr\u0105 paroprzepuszczalno\u015Bci\u0105, co sprzyja tworzeniu zdrowego mikroklimatu w pomieszczeniach. Jest to produkt szary, kt\xF3ry po na\u0142o\u017Ceniu stanowi idealne pod\u0142o\u017Ce pod malowanie, tapetowanie lub dalsze dekoracyjne wyko\u0144czenie.",
    application: "Tynk Atlas SM przeznaczony jest do nak\u0142adania na stabilne i trwa\u0142e pod\u0142o\u017Ca budowlane, takie jak beton, bloczki betonowe, ceg\u0142y czy pustaki. Mo\u017Ce by\u0107 stosowany na \u015Bcianach i stropach wewn\u0105trz pomieszcze\u0144 o normalnej i podwy\u017Cszonej wilgotno\u015Bci, a tak\u017Ce na elewacjach zewn\u0119trznych. Rekomendowana grubo\u015B\u0107 warstwy wynosi od 10 do 20 mm. Aplikacj\u0119 nale\u017Cy przeprowadza\u0107 w temperaturach od +5\xB0C do +30\xB0C.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107 warstwy", value: "10\u201320 mm" },
      { label: "Zu\u017Cycie", value: "13\u201317 kg/m\xB2 (15 mm)" },
      { label: "Czas schni\u0119cia", value: "ok. 7 dni" },
      { label: "Klasa tynku", value: "CS IV" }
    ],
    images: [],
    tags: [
      "tynk cementowo-wapienny",
      "atlas",
      "sm",
      "zewn\u0119trzny",
      "wewn\u0119trzny",
      "podk\u0142adowy"
    ],
    related: ["p011", "p012", "p051"],
    advantages: [
      "Wytrzyma\u0142o\u015B\u0107 i trwa\u0142o\u015B\u0107 dzi\u0119ki klasie CS IV.",
      "Uniwersalne zastosowanie wewn\u0105trz i na zewn\u0105trz budynk\xF3w.",
      "Bardzo dobra przyczepno\u015B\u0107 do r\xF3\u017Cnorodnych pod\u0142o\u017Cy budowlanych.",
      "Wysoka paroprzepuszczalno\u015B\u0107, zapewniaj\u0105ca zdrowy klimat pomieszcze\u0144."
    ],
    warnings: [
      "Nie stosowa\u0107 na pod\u0142o\u017Cach z p\u0142yt gipsowo-kartonowych i gipsowych.",
      "Chroni\u0107 \u015Bwie\u017Co na\u0142o\u017Con\u0105 zapraw\u0119 przed nadmiernym wysychaniem i opadami atmosferycznymi."
    ],
    faq: [
      { q: "Jaka jest rekomendowana grubo\u015B\u0107 warstwy tynku Atlas SM?", a: "Rekomendowana grubo\u015B\u0107 warstwy tynku cementowo-wapiennego Atlas SM wynosi od 10 do 20 mm. Grubo\u015B\u0107 warstwy nale\u017Cy dostosowa\u0107 do nier\xF3wno\u015Bci pod\u0142o\u017Ca." },
      { q: "Do jakich pomieszcze\u0144 mo\u017Cna stosowa\u0107 tynk Atlas SM?", a: "Tynk Atlas SM nadaje si\u0119 do stosowania w pomieszczeniach o normalnej i podwy\u017Cszonej wilgotno\u015Bci, takich jak kuchnie czy \u0142azienki, zar\xF3wno wewn\u0105trz, jak i na zewn\u0105trz budynk\xF3w." },
      { q: "Jakie jest zu\u017Cycie tynku Atlas SM na metr kwadratowy?", a: "Orientacyjne zu\u017Cycie tynku Atlas SM wynosi od 13 do 17 kg na metr kwadratowy przy grubo\u015Bci warstwy 15 mm. Dok\u0142adne zu\u017Cycie zale\u017Cy od r\xF3wno\u015Bci pod\u0142o\u017Ca i grubo\u015Bci nak\u0142adanej warstwy." }
    ],
    seoDescription: "Szukasz wysokiej jako\u015Bci tynku cementowo-wapiennego do \u015Bcian i sufit\xF3w? Tynk Atlas SM 25 kg to idealny wyb\xF3r do prac remontowych i budowlanych. Ten uniwersalny tynk, przeznaczony do u\u017Cytku wewn\u0119trznego i zewn\u0119trznego, charakteryzuje si\u0119 klas\u0105 wytrzyma\u0142o\u015Bci CS IV, co gwarantuje jego trwa\u0142o\u015B\u0107. Zaprawa tynkarska Atlas SM zapewnia doskona\u0142\u0105 przyczepno\u015B\u0107 do betonu, ceg\u0142y i innych pod\u0142o\u017Cy, tworz\u0105c jednocze\u015Bnie zdrowy mikroklimat dzi\u0119ki wysokiej paroprzepuszczalno\u015Bci. Idealny pod malowanie i inne wyko\u0144czenia. Sprawd\u017A cen\u0119 i opinie o tynku Atlas SM, tynku podk\u0142adowym cementowo-wapiennym do zastosowa\u0144 zewn\u0119trznych i wewn\u0119trznych."
  },
  {
    id: "p056",
    slug: "klej-montazowy-tytan-evo-290ml",
    name: "Klej monta\u017Cowy Tytan EVO 290 ml",
    categorySlug: "kleje-montazowe",
    brand: "Tytan",
    sku: "TYT-EVO-290",
    unit: "kartusze 290 ml",
    shortDescription: "Mocny, uniwersalny klej monta\u017Cowy Tytan EVO na bazie poliuretanowej. Szybkie mocowanie element\xF3w, wysoka odporno\u015B\u0107 temperaturowa i d\u0142ugotrwa\u0142e wi\u0105zanie.",
    description: "Klej monta\u017Cowy Tytan EVO to innowacyjne rozwi\u0105zanie dla profesjonalist\xF3w i majsterkowicz\xF3w. Jego poliuretanowa baza gwarantuje wyj\u0105tkow\u0105 si\u0142\u0119 wi\u0105zania, przekraczaj\u0105c\u0105 1,5 MPa, co zapewnia trwa\u0142e i pewne mocowanie element\xF3w konstrukcyjnych, dekoracyjnych oraz izolacyjnych. Kr\xF3tki czas otwarty (10-15 minut) pozwala na precyzyjne pozycjonowanie, a pe\u0142ne utwardzenie w ci\u0105gu 24 godzin minimalizuje czas przestoju. Klej jest odporny na ekstremalne temperatury od -40\xB0C do +100\xB0C, co czyni go idealnym do zastosowa\u0144 w zmiennych warunkach. Doskonale sprawdza si\u0119 przy monta\u017Cu drewna, metalu, tworzyw sztucznych, betonu, kamienia i wielu innych materia\u0142\xF3w.",
    application: "Klej monta\u017Cowy Tytan EVO przeznaczony jest do szybkiego i trwa\u0142ego klejenia r\xF3\u017Cnorodnych materia\u0142\xF3w budowlanych i wyko\u0144czeniowych. Stosuj na czystych, suchych i odt\u0142uszczonych powierzchniach. Nadaje si\u0119 do zastosowa\u0144 wewn\u0119trznych i zewn\u0119trznych, w tym w miejscach nara\u017Conych na zmiany temperatury i wilgotno\u015Bci. Sprawdza si\u0119 przy monta\u017Cu listew, paneli, prog\xF3w, element\xF3w dekoracyjnych, izolacji oraz drobnych napraw budowlanych.",
    technicalSpec: [
      { label: "Wytrzyma\u0142o\u015B\u0107 na rozci\u0105ganie", value: "> 1,5 MPa" },
      { label: "Czas otwarty", value: "10\u201315 min" },
      { label: "Czas schni\u0119cia", value: "24 h" },
      { label: "Odporno\u015B\u0107 temp.", value: "-40\xB0C do +100\xB0C" },
      { label: "Baza", value: "poliuretanowa" }
    ],
    images: [],
    tags: [
      "klej monta\u017Cowy",
      "tytan",
      "evo",
      "poliuretanowy",
      "mocowanie",
      "uniwersalny"
    ],
    related: ["p057", "p058", "p059"],
    advantages: [
      "Bardzo wysoka wytrzyma\u0142o\u015B\u0107 na rozci\u0105ganie ponad 1,5 MPa.",
      "Szybkie wi\u0105zanie z czasem otwartym 10-15 minut.",
      "Doskona\u0142a odporno\u015B\u0107 na temperatury od -40\xB0C do +100\xB0C.",
      "Uniwersalne zastosowanie do wielu materia\u0142\xF3w budowlanych."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej 5\xB0C.",
      "Chroni\u0107 przed bezpo\u015Brednim dzia\u0142aniem promieni s\u0142onecznych i wilgoci\u0105."
    ],
    faq: [
      { q: "Jakie materia\u0142y mo\u017Cna klei\u0107 klejem Tytan EVO?", a: "Klej Tytan EVO nadaje si\u0119 do klejenia drewna, metalu, tworzyw sztucznych, betonu, kamienia, ceramiki, gumy, styropianu i wielu innych materia\u0142\xF3w budowlanych oraz wyko\u0144czeniowych." },
      { q: "Jaki jest czas pe\u0142nego utwardzenia kleju?", a: "Pe\u0142ne utwardzenie kleju monta\u017Cowego Tytan EVO nast\u0119puje zazwyczaj w ci\u0105gu 24 godzin, w zale\u017Cno\u015Bci od warunk\xF3w otoczenia i grubo\u015Bci spoiny." },
      { q: "Czy klej Tytan EVO nadaje si\u0119 do zastosowa\u0144 zewn\u0119trznych?", a: "Tak, klej Tytan EVO dzi\u0119ki swojej wysokiej odporno\u015Bci temperaturowej i wodoodporno\u015Bci doskonale nadaje si\u0119 do zastosowa\u0144 zewn\u0119trznych." }
    ],
    seoDescription: "Szukasz mocnego kleju monta\u017Cowego do szybkich i trwa\u0142ych po\u0142\u0105cze\u0144? Wybierz klej poliuretanowy Tytan EVO 290 ml. Ten uniwersalny klej monta\u017Cowy oferuje wyj\u0105tkow\u0105 wytrzyma\u0142o\u015B\u0107 na rozci\u0105ganie (> 1,5 MPa) i kr\xF3tki czas otwarty (10-15 min), u\u0142atwiaj\u0105c monta\u017C element\xF3w. Doskona\u0142a odporno\u015B\u0107 temperaturowa od -40\xB0C do +100\xB0C sprawia, \u017Ce jest idealny do zastosowa\u0144 wewn\u0119trznych i zewn\u0119trznych. Sprawd\u017A, jak \u0142atwo zamocujesz listwy, panele, progi czy elementy dekoracyjne. Tytan EVO to profesjonalna si\u0142a wi\u0105zania dla ka\u017Cdego budowlanego projektu."
  },
  {
    id: "p057",
    slug: "klej-do-glazury-atlas-cerplast-25kg",
    name: "Klej do glazury i terakoty Atlas Cerplast 25 kg",
    categorySlug: "kleje-glazura",
    brand: "Atlas",
    sku: "ATL-CERPLAST-25",
    unit: "worek 25 kg",
    shortDescription: "Atlas Cerplast 25 kg to elastyczny klej cementowy klasy C1 do glazury i terakoty. Idealny do \u0142azienek, kuchni i taras\xF3w, zapewnia mocne i trwa\u0142e wi\u0105zanie.",
    description: "Atlas Cerplast, opakowanie 25 kg, to wysokiej jako\u015Bci klej cementowy klasy C1, stworzony z my\u015Bl\u0105 o trwa\u0142ym i estetycznym monta\u017Cu glazury i terakoty. Jego unikalna formu\u0142a zapewnia doskona\u0142\u0105 przyczepno\u015B\u0107 do r\xF3\u017Cnorodnych pod\u0142o\u017Cy budowlanych. Dzi\u0119ki optymalnemu czasowi otwarcia (30 minut) oraz mo\u017Cliwo\u015Bci regulacji grubo\u015Bci warstwy (2-5 mm), praca z klejem jest komfortowa i precyzyjna. Produkt ten jest wodoodporny i mrozoodporny, co czyni go doskona\u0142ym wyborem do zastosowa\u0144 wewn\u0119trznych i zewn\u0119trznych, w tym na tarasach i balkonach. Pe\u0142n\u0105 wytrzyma\u0142o\u015B\u0107 mechaniczn\u0105 klej osi\u0105ga po 24 godzinach, a pe\u0142n\u0105 wytrzyma\u0142o\u015B\u0107 robocz\u0105 po 7 dniach.",
    application: "Klej Atlas Cerplast przeznaczony jest do przyklejania p\u0142ytek ceramicznych, gresowych, terakotowych oraz kamiennych na pod\u0142o\u017Cach cementowych, cementowo-wapiennych i betonowych. Nadaje si\u0119 do stosowania wewn\u0105trz i na zewn\u0105trz budynk\xF3w. Mo\u017Ce by\u0107 u\u017Cywany na \u015Bcianach i pod\u0142ogach, w pomieszczeniach suchych, wilgotnych (\u0142azienki, kuchnie) oraz nara\u017Conych na zmiany temperatury (tarasy, balkony).",
    technicalSpec: [
      { label: "Czas otwarty", value: "30 min" },
      { label: "Grubo\u015B\u0107 warstwy", value: "2\u20135 mm" },
      { label: "Czas twardnienia", value: "24 h pe\u0142na wytrzyma\u0142o\u015B\u0107 7 dni" },
      { label: "Klasa kleju", value: "C1" }
    ],
    images: [],
    tags: [
      "klej do glazury",
      "atlas",
      "cerplast",
      "p\u0142ytki",
      "terakota",
      "\u015Bciana",
      "pod\u0142oga"
    ],
    related: ["p060", "p123", "p124"],
    advantages: [
      "Wysoka przyczepno\u015B\u0107 do r\xF3\u017Cnorodnych pod\u0142o\u017Cy.",
      "Optymalny czas otwarcia u\u0142atwiaj\u0105cy prac\u0119.",
      "Wodoodporny i mrozoodporny, idealny na zewn\u0105trz.",
      "Mo\u017Cliwo\u015B\u0107 stosowania na \u015Bcianach i pod\u0142ogach, wewn\u0105trz i na zewn\u0105trz."
    ],
    warnings: [
      "Nie stosowa\u0107 na pod\u0142o\u017Cach drewnianych, metalowych lub niestabilnych.",
      "Nale\u017Cy przestrzega\u0107 zalece\u0144 producenta dotycz\u0105cych proporcji mieszania i warunk\xF3w aplikacji."
    ],
    faq: [
      { q: "Do jakich rodzaj\xF3w p\u0142ytek nadaje si\u0119 klej Atlas Cerplast?", a: "Klej Atlas Cerplast 25 kg przeznaczony jest do przyklejania p\u0142ytek ceramicznych, gresowych, terakotowych, a tak\u017Ce kamiennych o niskiej nasi\u0105kliwo\u015Bci." },
      { q: "Jaki jest czas otwarty kleju Atlas Cerplast?", a: "Czas otwarty kleju wynosi 30 minut, co pozwala na swobodne u\u0142o\u017Cenie p\u0142ytek i ewentualn\u0105 korekt\u0119 ich po\u0142o\u017Cenia." },
      { q: "Czy klej Atlas Cerplast nadaje si\u0119 do \u0142azienki i na zewn\u0105trz?", a: "Tak, klej jest wodoodporny i mrozoodporny, co czyni go idealnym do stosowania w \u0142azienkach, kuchniach, na tarasach i balkonach." }
    ],
    seoDescription: "Szukasz niezawodnego kleju do glazury i terakoty? Atlas Cerplast 25 kg to cementowy klej klasy C1, doskona\u0142y do \u0142azienek, kuchni i taras\xF3w. Zapewnia mocne wi\u0105zanie p\u0142ytek na \u015Bcianach i pod\u0142ogach. Sprawd\u017A jego parametry: czas otwarty 30 min, grubo\u015B\u0107 warstwy 2-5 mm, pe\u0142na wytrzyma\u0142o\u015B\u0107 po 7 dniach. Kupuj online klej do p\u0142ytek Atlas Cerplast i ciesz si\u0119 trwa\u0142o\u015Bci\u0105 Twojej inwestycji. Idealny do uk\u0142adania glazury i terakoty na pod\u0142o\u017Cach cementowych i betonowych, tak\u017Ce w warunkach zewn\u0119trznych."
  },
  {
    id: "p058",
    slug: "klej-do-styropianu-ceresit-ct84-25kg",
    name: "Klej do styropianu i siatki Ceresit CT 84 25 kg",
    categorySlug: "kleje-styropian",
    brand: "Ceresit",
    sku: "CER-CT84-25",
    unit: "worek 25 kg",
    shortDescription: "Wysoce przyczepny klej Ceresit CT 84 do styropianu i siatki zbroj\u0105cej, idealny do system\xF3w ETICS. Zapewnia trwa\u0142e i mocne mocowanie p\u0142yt izolacyjnych.",
    description: "Ceresit CT 84 to innowacyjny klej cementowy przeznaczony do przyklejania p\u0142yt izolacyjnych ze styropianu (EPS) oraz zatapiania siatki zbroj\u0105cej w systemach ocieple\u0144 ETICS. Jego wysoka przyczepno\u015B\u0107 do pod\u0142o\u017Ca oraz odporno\u015B\u0107 na warunki atmosferyczne gwarantuj\u0105 trwa\u0142o\u015B\u0107 i bezpiecze\u0144stwo ocieplenia. Klej charakteryzuje si\u0119 optymalnym czasem otwartym, co u\u0142atwia prac\u0119 i pozwala na precyzyjne u\u0142o\u017Cenie materia\u0142u izolacyjnego. Idealny wyb\xF3r dla profesjonalist\xF3w poszukuj\u0105cych niezawodnych rozwi\u0105za\u0144 w budownictwie energooszcz\u0119dnym. Zapewnia doskona\u0142e parametry mechaniczne i d\u0142ugotrwa\u0142\u0105 ochron\u0119 elewacji.",
    application: "Stosuj na czystych, stabilnych i zagruntowanych pod\u0142o\u017Cach betonowych, cementowych, cementowo-wapiennych oraz tynkach. Klej nale\u017Cy nak\u0142ada\u0107 metod\u0105 obwodowo-punktow\u0105 na p\u0142yty styropianowe, a nast\u0119pnie zatopi\u0107 w nim siatk\u0119 zbroj\u0105c\u0105. Unikaj stosowania w temperaturach poni\u017Cej +5\xB0C i powy\u017Cej +30\xB0C.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "4\u20136 kg/m\xB2 (metoda obwodowo-punktowa)" },
      { label: "Czas otwarty", value: "30 min" },
      { label: "Przyczepno\u015B\u0107 do EPS", value: "> 0,12 MPa" },
      { label: "Klasa", value: "PCC" }
    ],
    images: [],
    tags: [
      "klej do styropianu",
      "ceresit",
      "ct84",
      "etics",
      "ocieplenie",
      "siatka"
    ],
    related: ["p066", "p067", "p071", "p002"],
    advantages: [
      "Wysoka przyczepno\u015B\u0107 do p\u0142yt styropianowych i pod\u0142o\u017Cy budowlanych.",
      "Doskona\u0142a do przyklejania styropianu i zatapiania siatki zbroj\u0105cej.",
      "Odporny na warunki atmosferyczne i wilgo\u0107.",
      "U\u0142atwia i przyspiesza proces ocieplania budynk\xF3w."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +5\xB0C.",
      "Chroni\u0107 przed nadmiernym nas\u0142onecznieniem i wysychaniem."
    ],
    faq: [
      { q: "Jak przygotowa\u0107 klej Ceresit CT 84?", a: "Klej nale\u017Cy wsypa\u0107 do odmierzonej ilo\u015Bci zimnej wody (ok. 4,5-5,5 litra na 25 kg suchej mieszanki) i dok\u0142adnie wymiesza\u0107, a\u017C do uzyskania jednorodnej masy bez grudek. Odstawi\u0107 na kilka minut, a nast\u0119pnie ponownie wymiesza\u0107." },
      { q: "Jaki jest czas otwarty kleju Ceresit CT 84?", a: "Czas otwarty kleju wynosi oko\u0142o 30 minut, co pozwala na swobodne manewrowanie i precyzyjne u\u0142o\u017Cenie p\u0142yt styropianowych oraz siatki." },
      { q: "Do jakich system\xF3w ocieple\u0144 nadaje si\u0119 Ceresit CT 84?", a: "Ceresit CT 84 jest idealnym rozwi\u0105zaniem do stosowania w systemach ETICS (External Thermal Insulation Composite Systems), czyli zewn\u0119trznych kompozytowych systemach izolacji termicznej \u015Bcian budynk\xF3w." }
    ],
    seoDescription: "Kupuj niezawodny klej do styropianu i siatki Ceresit CT 84 25 kg. Idealny klej do styropianu EPS i siatki zbroj\u0105cej w systemach ETICS. Wysoka przyczepno\u015B\u0107 kleju do styropianu, szybkie schni\u0119cie i trwa\u0142o\u015B\u0107 elewacji. Sprawd\u017A cen\u0119 i zastosowanie kleju Ceresit CT 84. Monta\u017C p\u0142yt izolacyjnych na elewacji, ocieplenie \u015Bcian zewn\u0119trznych. Najlepszy klej do styropianu od Ceresit. Trwa\u0142e mocowanie styropianu, odporny na warunki atmosferyczne klej budowlany."
  },
  {
    id: "p059",
    slug: "klej-do-welny-alpol-ag609-25kg",
    name: "Klej do we\u0142ny mineralnej Alpol AG 609 25 kg",
    categorySlug: "kleje-welna",
    brand: "Alpol",
    sku: "ALP-AG609-25",
    unit: "worek 25 kg",
    shortDescription: "Alpol AG 609 to uniwersalny klej do we\u0142ny mineralnej, idealny do system\xF3w ETICS. Zapewnia mocne wi\u0105zanie i odporno\u015B\u0107 na mr\xF3z.",
    description: "Alpol AG 609 to wysokiej jako\u015Bci klej przeznaczony do przyklejania p\u0142yt z we\u0142ny mineralnej do \u015Bcian zewn\u0119trznych w systemach izolacji cieplnej budynk\xF3w (ETICS). Charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105 do pod\u0142o\u017Ca oraz do we\u0142ny mineralnej (wi\u0119cej ni\u017C 0,08 MPa), co gwarantuje trwa\u0142o\u015B\u0107 i bezpiecze\u0144stwo fasady. Jest mrozoodporny, co pozwala na prowadzenie prac r\xF3wnie\u017C w ni\u017Cszych temperaturach. Szybki czas otwarty (30 minut) przyspiesza proces budowlany, a niskie zu\u017Cycie (4-6 kg/m\xB2) czyni go ekonomicznym rozwi\u0105zaniem dla profesjonalist\xF3w i majsterkowicz\xF3w ceni\u0105cych sobie jako\u015B\u0107 i niezawodno\u015B\u0107.",
    application: "Klej Alpol AG 609 nale\u017Cy stosowa\u0107 do mocowania p\u0142yt z we\u0142ny mineralnej (skalnej i szklanej) na pod\u0142o\u017Cach betonowych, murowanych oraz na tynkach cementowych i cementowo-wapiennych. Idealny do system\xF3w ETICS na nowych i termomodernizowanych budynkach. Stosowa\u0107 w temperaturach od +5\xB0C do +25\xB0C. Zapewni\u0107 odpowiedni\u0105 wentylacj\u0119 podczas aplikacji i wi\u0105zania.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "4\u20136 kg/m\xB2" },
      { label: "Czas otwarty", value: "30 min" },
      { label: "Przyczepno\u015B\u0107 do we\u0142ny", value: "> 0,08 MPa" },
      { label: "Mrozoodporno\u015B\u0107", value: "TAK" }
    ],
    images: [],
    tags: [
      "klej do we\u0142ny",
      "alpol",
      "ag 609",
      "we\u0142na mineralna",
      "etics",
      "fasada"
    ],
    related: ["p071", "p072", "p073", "p058"],
    advantages: [
      "Wyj\u0105tkowa przyczepno\u015B\u0107 do we\u0142ny mineralnej i pod\u0142o\u017Ca.",
      "Wysoka odporno\u015B\u0107 na warunki atmosferyczne, w tym mr\xF3z.",
      "Szybki czas otwarty przyspieszaj\u0105cy prace budowlane.",
      "Niskie zu\u017Cycie materia\u0142u, co przek\u0142ada si\u0119 na ekonomiczno\u015B\u0107."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +5\xB0C.",
      "Chroni\u0107 \u015Bwie\u017Co na\u0142o\u017Cony materia\u0142 przed deszczem i mrozem."
    ],
    faq: [
      { q: "Do jakich rodzaj\xF3w we\u0142ny mineralnej mo\u017Cna stosowa\u0107 Alpol AG 609?", a: "Klej Alpol AG 609 przeznaczony jest do przyklejania p\u0142yt z we\u0142ny mineralnej, zar\xF3wno skalnej, jak i szklanej, w ramach system\xF3w izolacji cieplnej budynk\xF3w ETICS." },
      { q: "Jaki jest przybli\u017Cony czas otwarty kleju Alpol AG 609?", a: "Czas otwarty kleju wynosi oko\u0142o 30 minut, co pozwala na swobodne pozycjonowanie p\u0142yt we\u0142ny mineralnej po na\u0142o\u017Ceniu kleju." },
      { q: "Czy klej jest odporny na dzia\u0142anie mrozu?", a: "Tak, klej Alpol AG 609 charakteryzuje si\u0119 mrozoodporno\u015Bci\u0105, co jest kluczowe przy pracach fasadowych prowadzonych w r\xF3\u017Cnych warunkach klimatycznych." }
    ],
    seoDescription: "Szukasz niezawodnego kleju do we\u0142ny mineralnej? Alpol AG 609 25 kg to idealny wyb\xF3r do system\xF3w ETICS. Ten mrozoodporny klej do we\u0142ny charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105 do we\u0142ny skalnej i szklanej, zapewniaj\u0105c trwa\u0142o\u015B\u0107 fasady. Z czasem otwartym 30 minut i zu\u017Cyciem 4-6 kg/m\xB2, praca przebiega sprawnie i ekonomicznie. Idealny do izolacji zewn\u0119trznych budynk\xF3w, mocowania we\u0142ny na betonowych i murowanych pod\u0142o\u017Cach. Wybierz klej Alpol AG 609 dla profesjonalnych rezultat\xF3w."
  },
  {
    id: "p060",
    slug: "spoina-atlas-ms-5kg-szara",
    name: "Spoina cementowa Atlas MS+ 5 kg szara",
    categorySlug: "spoiny",
    brand: "Atlas",
    sku: "ATL-MS-5-SZ",
    unit: "worek 5 kg",
    shortDescription: "Spoina cementowa Atlas MS+ 5 kg szara \u2013 elastyczna, odporna na \u015Bcieranie spoina do fug 2-20 mm. Idealna do p\u0142ytek ceramicznych i gresowych wewn\u0105trz i na zewn\u0105trz.",
    description: "Spoina cementowa Atlas MS+ 5 kg w kolorze szarym to nowoczesny produkt przeznaczony do fugowania p\u0142ytek ceramicznych, gresowych oraz kamiennych. Jej unikalna formu\u0142a zapewnia wysok\u0105 elastyczno\u015B\u0107 i odporno\u015B\u0107 na \u015Bcieranie (klasa A), co czyni j\u0105 idealnym rozwi\u0105zaniem do pomieszcze\u0144 o du\u017Cym nat\u0119\u017Ceniu ruchu oraz na zewn\u0105trz budynk\xF3w. Szeroko\u015B\u0107 fugi, kt\xF3r\u0105 mo\u017Cna wype\u0142ni\u0107, mie\u015Bci si\u0119 w przedziale 2-20 mm. Spoina Atlas MS+ charakteryzuje si\u0119 d\u0142ugim czasem otwartym (20-30 minut), co u\u0142atwia prac\u0119, a pe\u0142ne twardnienie nast\u0119puje po 24 godzinach. Doskonale sprawdzi si\u0119 w \u0142azienkach, kuchniach, na tarasach i balkonach, zapewniaj\u0105c trwa\u0142e i estetyczne wyko\u0144czenie.",
    application: "Spoina Atlas MS+ przeznaczona jest do fugowania ok\u0142adzin ceramicznych, gresowych, kamiennych oraz klinkierowych. Stosowa\u0107 na pod\u0142o\u017Cach stabilnych, oczyszczonych z kurzu, t\u0142uszczu i innych zanieczyszcze\u0144. Mo\u017Cna j\u0105 aplikowa\u0107 wewn\u0105trz i na zewn\u0105trz budynk\xF3w, w pomieszczeniach suchych i wilgotnych, na \u015Bcianach i pod\u0142ogach. Temperatura stosowania: od +5\xB0C do +30\xB0C.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107 spoiny", value: "2\u201320 mm" },
      { label: "Czas otwarty", value: "20\u201330 min" },
      { label: "Czas twardnienia", value: "24 h" },
      { label: "Odporno\u015B\u0107 na \u015Bcieranie", value: "klasa A" }
    ],
    images: [],
    tags: [
      "spoina",
      "atlas",
      "ms+",
      "fuga",
      "p\u0142ytki",
      "ceramika",
      "antypo\u015Blizgowa"
    ],
    related: ["p057", "p123", "p124", "p125"],
    advantages: [
      "Wysoka elastyczno\u015B\u0107 i odporno\u015B\u0107 na uszkodzenia mechaniczne.",
      "Doskona\u0142a przyczepno\u015B\u0107 do kraw\u0119dzi p\u0142ytek, zapobiega pyleniu.",
      "Odporna na \u015Bcieranie (klasa A) i warunki atmosferyczne.",
      "D\u0142ugi czas otwarty u\u0142atwia aplikacj\u0119 i pozwala na korekty."
    ],
    warnings: [
      "Nie stosowa\u0107 w przypadku pod\u0142o\u017Cy niestabilnych lub nadmiernie ch\u0142onnych.",
      "Chroni\u0107 przed nadmiernym zawilgoceniem i mrozem podczas wi\u0105zania."
    ],
    faq: [
      { q: "Jaka jest maksymalna szeroko\u015B\u0107 fugi, do kt\xF3rej mo\u017Cna zastosowa\u0107 Atlas MS+?", a: "Spoina cementowa Atlas MS+ przeznaczona jest do fug o szeroko\u015Bci od 2 mm do 20 mm. Pozwala to na jej wszechstronne zastosowanie przy r\xF3\u017Cnych rodzajach ok\u0142adzin." },
      { q: "Jakie s\u0105 warunki przechowywania produktu?", a: "Produkt nale\u017Cy przechowywa\u0107 w oryginalnych, szczelnie zamkni\u0119tych opakowaniach, w pomieszczeniach suchych, w temperaturze od +5\xB0C do +30\xB0C. Chroni\u0107 przed wilgoci\u0105 i mrozem." },
      { q: "Czy spoina Atlas MS+ nadaje si\u0119 do \u0142azienek i kuchni?", a: "Tak, spoina Atlas MS+ doskonale nadaje si\u0119 do stosowania w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci, takich jak \u0142azienki i kuchnie, dzi\u0119ki swojej odporno\u015Bci na wilgo\u0107 i \u0142atwo\u015Bci w utrzymaniu czysto\u015Bci." }
    ],
    seoDescription: "Szara spoina cementowa Atlas MS+ 5 kg to wysokiej jako\u015Bci produkt do fugowania p\u0142ytek ceramicznych, gresowych i kamiennych. Dedykowana do fug o szeroko\u015Bci 2-20 mm, oferuje klas\u0119 odporno\u015Bci na \u015Bcieranie A, co zapewnia trwa\u0142o\u015B\u0107 nawet w miejscach o intensywnym u\u017Cytkowaniu. Jej elastyczna formu\u0142a zapobiega p\u0119kaniu, a d\u0142ugi czas otwarty u\u0142atwia aplikacj\u0119. Idealna na \u015Bciany i pod\u0142ogi, do wn\u0119trz i na zewn\u0105trz, w \u0142azienkach, kuchniach, na tarasach. Kupuj fug\u0119 Atlas MS+ online i ciesz si\u0119 estetycznym oraz trwa\u0142ym wyko\u0144czeniem Twoich ok\u0142adzin."
  },
  {
    id: "p061",
    slug: "kotwa-chemiczna-hilti-hit-re500-330ml",
    name: "Kotwa chemiczna Hilti HIT-RE 500 330 ml",
    categorySlug: "kotwy-chemiczne",
    brand: "Hilti",
    sku: "HLT-HIT-RE500-330",
    unit: "kartusze 330 ml",
    shortDescription: "Hilti HIT-RE 500 to dwusk\u0142adnikowa kotwa chemiczna na bazie \u017Cywicy epoksydowo-aminowej. Idealna do ci\u0119\u017Ckich obci\u0105\u017Ce\u0144 w betonie i murze, nawet w trudnych warunkach.",
    description: "Hilti HIT-RE 500 to wysokowydajna kotwa chemiczna o unikalnej formule epoksydowo-aminowej, gwarantuj\u0105ca niezawodne i trwa\u0142e po\u0142\u0105czenia. Doskonale sprawdza si\u0119 przy mocowaniu element\xF3w konstrukcyjnych, balustrad, maszyn czy system\xF3w instalacyjnych w betonie, murze i kamieniu naturalnym. Jej zaawansowana formu\u0142a zapewnia doskona\u0142\u0105 przyczepno\u015B\u0107 i odporno\u015B\u0107 na obci\u0105\u017Cenia, a tak\u017Ce odporno\u015B\u0107 na agresywne \u015Brodowiska chemiczne i wilgo\u0107. Mo\u017Cliwo\u015B\u0107 aplikacji w szerokim zakresie temperatur od -5\xB0C do +40\xB0C sprawia, \u017Ce jest to wszechstronne rozwi\u0105zanie dla profesjonalist\xF3w.",
    application: "Kotwa Hilti HIT-RE 500 przeznaczona jest do stosowania w betonie zarysowanym i niezarysowanym, murze pe\u0142nym i dr\u0105\u017Conym oraz kamieniu naturalnym. Idealna do zastosowa\u0144 budowlanych, przemys\u0142owych i in\u017Cynieryjnych. Mo\u017Ce by\u0107 aplikowana w otworach wierconych lub udarowych, w warunkach suchych i wilgotnych, a tak\u017Ce pod wod\u0105. Kluczowe jest przestrzeganie zalece\u0144 producenta dotycz\u0105cych czyszczenia otwor\xF3w i czasu aplikacji.",
    technicalSpec: [
      { label: "Baza", value: "\u017Cywica epoksydowo-aminowa" },
      { label: "Temperatura aplikacji", value: "-5\xB0C do +40\xB0C" },
      { label: "Czas twardnienia", value: "przy +20\xB0C: 12 h" },
      { label: "Klasa korozji", value: "odporna na \u015Brodowisko agresywne" }
    ],
    images: [],
    tags: [
      "kotwa chemiczna",
      "hilti",
      "hit-re 500",
      "epoksyd",
      "kotwienie",
      "beton"
    ],
    related: ["p132", "p056", "p131"],
    advantages: [
      "Wyj\u0105tkowa wytrzyma\u0142o\u015B\u0107 i no\u015Bno\u015B\u0107 dla ci\u0119\u017Ckich obci\u0105\u017Ce\u0144.",
      "Odporno\u015B\u0107 na agresywne \u015Brodowiska chemiczne i wilgo\u0107.",
      "Szeroki zakres temperatur aplikacji od -5\xB0C do +40\xB0C.",
      "Mo\u017Cliwo\u015B\u0107 stosowania w betonie zarysowanym i niezarysowanym."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 odpowiednie \u015Brodki ochrony osobistej.",
      "Dok\u0142adnie przestrzega\u0107 instrukcji aplikacji i czasu wi\u0105zania."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety kotwy Hilti HIT-RE 500?", a: "Hilti HIT-RE 500 oferuje wyj\u0105tkow\u0105 wytrzyma\u0142o\u015B\u0107, odporno\u015B\u0107 na agresywne \u015Brodowiska, szeroki zakres temperatur aplikacji oraz mo\u017Cliwo\u015B\u0107 stosowania w betonie zarysowanym i niezarysowanym." },
      { q: "W jakich materia\u0142ach mo\u017Cna stosowa\u0107 kotw\u0119 HIT-RE 500?", a: "Kotw\u0119 mo\u017Cna stosowa\u0107 w betonie (zarysowanym i niezarysowanym), murze pe\u0142nym i dr\u0105\u017Conym oraz kamieniu naturalnym." },
      { q: "Jaki jest czas twardnienia kotwy przy temperaturze 20\xB0C?", a: "Przy temperaturze oko\u0142o 20\xB0C czas twardnienia kotwy Hilti HIT-RE 500 wynosi oko\u0142o 12 godzin." }
    ],
    seoDescription: "Hilti HIT-RE 500 330 ml to profesjonalna kotwa chemiczna na bazie \u017Cywicy epoksydowo-aminowej, zapewniaj\u0105ca najwy\u017Csz\u0105 no\u015Bno\u015B\u0107 i trwa\u0142o\u015B\u0107 mocowa\u0144. Idealna do kotwienia w betonie zarysowanym i niezarysowanym, a tak\u017Ce w murze oraz kamieniu naturalnym. Doskona\u0142a odporno\u015B\u0107 na agresywne \u015Brodowiska chemiczne, wilgo\u0107 i ekstremalne temperatury od -5\xB0C do +40\xB0C. Zastosowanie kotwy chemicznej Hilti HIT-RE 500 gwarantuje niezawodne mocowanie element\xF3w konstrukcyjnych, balustrad, maszyn i system\xF3w instalacyjnych. Szukasz efektywnego rozwi\u0105zania do trudnych warunk\xF3w? Wybierz kotw\u0119 Hilti HIT-RE 500 dla bezpiecze\u0144stwa i d\u0142ugowieczno\u015Bci."
  },
  {
    id: "p062",
    slug: "srodek-grzybobojczy-bolix-mf-5l",
    name: "\u015Arodek grzybob\xF3jczy Bolix MF 5 L",
    categorySlug: "srodki-grzybobojcze",
    brand: "Bolix",
    sku: "BOL-MF-5",
    unit: "pojemnik 5 L",
    shortDescription: "Skuteczny \u015Brodek grzybob\xF3jczy Bolix MF 5 L do usuwania ple\u015Bni, grzyb\xF3w i glon\xF3w. Zapewnia d\u0142ugotrwa\u0142\u0105 ochron\u0119 powierzchni.",
    description: "Bolix MF to profesjonalny biocyd przeznaczony do zwalczania i zapobiegania rozwojowi grzyb\xF3w, ple\u015Bni oraz glon\xF3w na r\xF3\u017Cnorodnych powierzchniach budowlanych. Preparat jest idealny do stosowania przed malowaniem, tynkowaniem lub innymi pracami renowacyjnymi, zapewniaj\u0105c czysto\u015B\u0107 i estetyk\u0119 fasad oraz wn\u0119trz. Jego innowacyjna formu\u0142a gwarantuje szybkie i skuteczne dzia\u0142anie, eliminuj\u0105c szkodliwe mikroorganizmy i przywracaj\u0105c pierwotny wygl\u0105d \u015Bcian. Niezast\u0105piony w utrzymaniu higieny i trwa\u0142o\u015Bci konstrukcji.",
    application: "Stosuj na czystych i suchych powierzchniach. Rozcie\u0144cz \u015Brodek wod\u0105 w proporcji 1:3 do 1:5. Nanie\u015B r\xF3wnomiernie za pomoc\u0105 p\u0119dzla, wa\u0142ka lub opryskiwacza. Unikaj stosowania w deszczu i przy silnym wietrze. Temperatura aplikacji od +5\xB0C do +25\xB0C. Po oko\u0142o 30 minutach od zastosowania mo\u017Cna przyst\u0105pi\u0107 do dalszych prac.",
    technicalSpec: [
      { label: "Rozcie\u0144czenie", value: "1:3 do 1:5 z wod\u0105" },
      { label: "Czas dzia\u0142ania", value: "ok. 30 min" },
      { label: "Skuteczno\u015B\u0107", value: "grzyby, ple\u015Bnie, glony" },
      { label: "Wydajno\u015B\u0107", value: "ok. 50 m\xB2/L" }
    ],
    images: [],
    tags: [
      "\u015Brodek grzybob\xF3jczy",
      "bolix",
      "mf",
      "ple\u015B\u0144",
      "glony",
      "biocyd",
      "renowacja"
    ],
    related: ["p051", "p055", "p083"],
    advantages: [
      "Skutecznie eliminuje grzyby, ple\u015Bnie i glony.",
      "Zapewnia d\u0142ugotrwa\u0142\u0105 ochron\u0119 przed ponownym rozwojem mikroorganizm\xF3w.",
      "Idealny do przygotowania powierzchni przed malowaniem i tynkowaniem.",
      "\u0141atwy w aplikacji i szybki czas dzia\u0142ania."
    ],
    warnings: [
      "Przed u\u017Cyciem zapoznaj si\u0119 z kart\u0105 charakterystyki produktu.",
      "Stosuj \u015Brodki ochrony osobistej: r\u0119kawice, okulary, odzie\u017C ochronn\u0105."
    ],
    faq: [
      { q: "Jak rozcie\u0144czy\u0107 \u015Brodek grzybob\xF3jczy Bolix MF?", a: "\u015Arodek nale\u017Cy rozcie\u0144czy\u0107 wod\u0105 w proporcji od 1:3 do 1:5, w zale\u017Cno\u015Bci od stopnia zanieczyszczenia powierzchni." },
      { q: "Na jakich powierzchniach mo\u017Cna stosowa\u0107 Bolix MF?", a: "Bolix MF mo\u017Cna stosowa\u0107 na r\xF3\u017Cnego rodzaju powierzchniach budowlanych, takich jak tynki, mury, beton, kamie\u0144, a tak\u017Ce w pomieszczeniach nara\u017Conych na wilgo\u0107." },
      { q: "Jak d\u0142ugo dzia\u0142a \u015Brodek Bolix MF?", a: "Pe\u0142ne dzia\u0142anie biob\xF3jcze obserwuje si\u0119 po oko\u0142o 30 minutach od aplikacji, zapewniaj\u0105c skuteczne usuni\u0119cie grzyb\xF3w, ple\u015Bni i glon\xF3w." }
    ],
    seoDescription: "Szukasz skutecznego \u015Brodka grzybob\xF3jczego do usuwania ple\u015Bni i glon\xF3w? Bolix MF 5 L to profesjonalny biocyd marki Bolix, idealny do renowacji i ochrony \u015Bcian zewn\u0119trznych i wewn\u0119trznych. Wydajno\u015B\u0107 ok. 50 m\xB2/L, czas dzia\u0142ania ok. 30 min. Rozcie\u0144czenie 1:3-1:5. Kup teraz \u015Brodek grzybob\xF3jczy Bolix MF, aby zapewni\u0107 d\u0142ugotrwa\u0142\u0105 ochron\u0119 przed ple\u015Bni\u0105 i grzybami na elewacji i w wilgotnych pomieszczeniach. Niezb\u0119dny w walce z nieestetycznymi wykwitami."
  },
  {
    id: "p063",
    slug: "zaprawa-uszczelniajaca-atlas-woder-b-25kg",
    name: "Zaprawa uszczelniaj\u0105ca Atlas Woder B 25 kg",
    categorySlug: "zaprawy-uszczelniajace",
    brand: "Atlas",
    sku: "ATL-WODER-B-25",
    unit: "worek 25 kg",
    shortDescription: "Elastyczna zaprawa uszczelniaj\u0105ca Atlas Woder B 25 kg zapewnia skuteczn\u0105 hydroizolacj\u0119 w \u0142azienkach, basenach i innych wilgotnych pomieszczeniach. Klasa CC 2 i wysoka przyczepno\u015B\u0107.",
    description: "Atlas Woder B to jednosk\u0142adnikowa, elastyczna zaprawa uszczelniaj\u0105ca przeznaczona do wykonywania izolacji przeciwwodnej w budownictwie. Dzi\u0119ki swojej formulacji opartej na cemencie, kruszywach i modyfikatorach, tworzy trwa\u0142\u0105 i odporn\u0105 na wod\u0119 pow\u0142ok\u0119. Zaprawa charakteryzuje si\u0119 klas\u0105 reakcji na ogie\u0144 A1 i klas\u0105 wodoszczelno\u015Bci CC 2, co potwierdza jej wysok\u0105 skuteczno\u015B\u0107. Jest idealnym rozwi\u0105zaniem do izolacji taras\xF3w, balkon\xF3w, \u0142azienek, kabin prysznicowych, piwnic oraz basen\xF3w. Lekko elastyczna (S1) zaprawa kompensuje niewielkie napr\u0119\u017Cenia pod\u0142o\u017Ca, zapewniaj\u0105c d\u0142ugotrwa\u0142\u0105 ochron\u0119 przed wilgoci\u0105.",
    application: "Stosuj na stabilnych i no\u015Bnych pod\u0142o\u017Cach. Przed aplikacj\u0105 oczy\u015B\u0107 pod\u0142o\u017Ce z kurzu, t\u0142uszczu i lu\u017Anych element\xF3w. Zapraw\u0119 mo\u017Cna nak\u0142ada\u0107 za pomoc\u0105 p\u0119dzla, wa\u0142ka lub kielni w dw\xF3ch warstwach. Minimalna grubo\u015B\u0107 izolacji powinna wynosi\u0107 1 mm. Optymalna temperatura aplikacji to od +5\xB0C do +25\xB0C. Unikaj aplikacji w bezpo\u015Brednim nas\u0142onecznieniu i przy silnym wietrze.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "1,5\u20132,0 kg/m\xB2 na 1 mm" },
      { label: "Elastyczno\u015B\u0107", value: "S1 \u2013 lekko elastyczna" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +25\xB0C" },
      { label: "Klasa", value: "CC 2" }
    ],
    images: [],
    tags: [
      "zaprawa uszczelniaj\u0105ca",
      "atlas",
      "woder",
      "hydroizolacja",
      "\u0142azienka",
      "basen"
    ],
    related: ["p076", "p077", "p058"],
    advantages: [
      "Wysoka przyczepno\u015B\u0107 do pod\u0142o\u017Cy betonowych, cementowych i tynk\xF3w.",
      "D\u0142ugotrwa\u0142a ochrona przed przenikaniem wody i wilgoci.",
      "Odporno\u015B\u0107 na dzia\u0142anie czynnik\xF3w atmosferycznych i promieniowanie UV.",
      "\u0141atwo\u015B\u0107 aplikacji i szybkie wi\u0105zanie materia\u0142u."
    ],
    warnings: [
      "Nie stosowa\u0107 na pod\u0142o\u017Cach niestabilnych, ruchomych lub zbudowanych z p\u0142yt gipsowo-kartonowych.",
      "Chroni\u0107 \u015Bwie\u017Co wykonan\u0105 hydroizolacj\u0119 przed opadami atmosferycznymi i mrozem."
    ],
    faq: [
      { q: "Jaka jest grubo\u015B\u0107 warstwy potrzebna do uzyskania pe\u0142nej ochrony przeciwwodnej?", a: "Dla uzyskania pe\u0142nej ochrony przeciwwodnej zaleca si\u0119 na\u0142o\u017Cenie zaprawy w minimalnej grubo\u015Bci 1 mm. Zu\u017Cycie wynosi od 1,5 do 2,0 kg/m\xB2 na ka\u017Cdy milimetr grubo\u015Bci warstwy." },
      { q: "Czy zaprawa Atlas Woder B nadaje si\u0119 do izolacji basen\xF3w?", a: "Tak, Atlas Woder B jest przeznaczony do izolacji basen\xF3w, \u0142azienek, taras\xF3w i innych miejsc nara\u017Conych na sta\u0142y kontakt z wod\u0105. Posiada klas\u0119 wodoszczelno\u015Bci CC 2." },
      { q: "W jakich warunkach temperaturowych mo\u017Cna aplikowa\u0107 zapraw\u0119?", a: "Zapraw\u0119 mo\u017Cna aplikowa\u0107 w temperaturze otoczenia i pod\u0142o\u017Ca od +5\xB0C do +25\xB0C. Nale\u017Cy unika\u0107 aplikacji w skrajnych temperaturach." }
    ],
    seoDescription: "Szukasz niezawodnej zaprawy uszczelniaj\u0105cej do \u0142azienki lub basenu? Atlas Woder B 25 kg to lekko elastyczna zaprawa hydroizolacyjna klasy CC 2, kt\xF3ra zapewni skuteczn\u0105 ochron\u0119 przed wod\u0105. Idealna do izolacji balkon\xF3w, taras\xF3w, piwnic i pomieszcze\u0144 mokrych. Wysoka przyczepno\u015B\u0107, \u0142atwa aplikacja p\u0119dzlem lub wa\u0142kiem. Zaprawa uszczelniaj\u0105ca Atlas Woder B gwarantuje trwa\u0142o\u015B\u0107 i bezpiecze\u0144stwo Twojej konstrukcji. Sprawd\u017A parametry: zu\u017Cycie 1,5\u20132,0 kg/m\xB2 na 1 mm, elastyczno\u015B\u0107 S1, temperatura aplikacji +5\xB0C do +25\xB0C."
  },
  {
    id: "p064",
    slug: "masa-bitumiczna-izohan-wm-grunt-10kg",
    name: "Masa bitumiczna gruntuj\u0105ca Izohan WM 10 kg",
    categorySlug: "masy-bitumiczne",
    brand: "Izohan",
    sku: "IZH-WM-GRUNT-10",
    unit: "wiadro 10 kg",
    shortDescription: "Izohan WM to wysokiej jako\u015Bci masa bitumiczna gruntuj\u0105ca, idealna do przygotowania pod\u0142o\u017Cy pod hydroizolacj\u0119 fundament\xF3w i piwnic. Zapewnia doskona\u0142\u0105 przyczepno\u015B\u0107 i ochron\u0119.",
    description: "Masa bitumiczna gruntuj\u0105ca Izohan WM to nowoczesny, jednosk\u0142adnikowy preparat na bazie emulsji asfaltowej, przeznaczony do gruntowania powierzchni przed na\u0142o\u017Ceniem izolacji przeciwwilgociowych i przeciwwodnych. Doskonale penetruje pod\u0142o\u017Ce, tworz\u0105c jednolit\u0105 i szczeln\u0105 warstw\u0119, kt\xF3ra znacz\u0105co poprawia przyczepno\u015B\u0107 kolejnych warstw hydroizolacji. Jest niezast\u0105piona przy pracach zwi\u0105zanych z izolacj\u0105 fundament\xF3w, piwnic, \u015Bcian zag\u0142\u0119bionych w gruncie oraz innych element\xF3w konstrukcji budowlanych nara\u017Conych na dzia\u0142anie wilgoci. Zapewnia d\u0142ugotrwa\u0142\u0105 ochron\u0119 przed wod\u0105 i wilgoci\u0105.",
    application: "Produkt przeznaczony jest do gruntowania i przygotowania pod\u0142o\u017Cy betonowych, cementowych, cementowo-wapiennych oraz asfaltowych przed aplikacj\u0105 mas bitumicznych, membran czy innych materia\u0142\xF3w hydroizolacyjnych. Stosowa\u0107 na suche i czyste pod\u0142o\u017Ce w temperaturach od +5\xB0C do +35\xB0C. Upewni\u0107 si\u0119, \u017Ce powierzchnia jest wolna od lu\u017Anych element\xF3w i zanieczyszcze\u0144.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "0,3\u20130,5 kg/m\xB2" },
      { label: "Czas schni\u0119cia", value: "1\u20133 h" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +35\xB0C" },
      { label: "Baza", value: "emulsja asfaltowa" }
    ],
    images: [],
    tags: [
      "masa bitumiczna",
      "izohan",
      "grunt",
      "hydroizolacja",
      "fundament",
      "piwnica"
    ],
    related: ["p063", "p076", "p078"],
    advantages: [
      "Zwi\u0119ksza przyczepno\u015B\u0107 kolejnych warstw hydroizolacji.",
      "Doskonale penetruje i wzmacnia pod\u0142o\u017Ce.",
      "Tworzy jednolit\u0105 i szczeln\u0105 barier\u0119 dla wilgoci.",
      "\u0141atwa aplikacja i szybkie schni\u0119cie."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +5\xB0C ani powy\u017Cej +35\xB0C.",
      "Przechowywa\u0107 w szczelnie zamkni\u0119tym opakowaniu, w miejscu niedost\u0119pnym dla dzieci."
    ],
    faq: [
      { q: "Jaka jest wydajno\u015B\u0107 masy bitumicznej gruntuj\u0105cej Izohan WM?", a: "Zu\u017Cycie masy bitumicznej gruntuj\u0105cej Izohan WM wynosi od 0,3 do 0,5 kg na metr kwadratowy, w zale\u017Cno\u015Bci od ch\u0142onno\u015Bci i struktury pod\u0142o\u017Ca." },
      { q: "Jak d\u0142ugo schnie masa bitumiczna gruntuj\u0105ca Izohan WM?", a: "Czas schni\u0119cia masy bitumicznej gruntuj\u0105cej Izohan WM wynosi zazwyczaj od 1 do 3 godzin, w zale\u017Cno\u015Bci od warunk\xF3w atmosferycznych i grubo\u015Bci na\u0142o\u017Conej warstwy." },
      { q: "Do jakich powierzchni mo\u017Cna stosowa\u0107 mas\u0119 bitumiczn\u0105 gruntuj\u0105c\u0105 Izohan WM?", a: "Mas\u0119 mo\u017Cna stosowa\u0107 na pod\u0142o\u017Ca betonowe, cementowe, cementowo-wapienne oraz asfaltowe, pod warunkiem, \u017Ce s\u0105 one suche, czyste i stabilne." }
    ],
    seoDescription: "Szukasz skutecznego gruntu pod hydroizolacj\u0119? Masa bitumiczna gruntuj\u0105ca Izohan WM 10 kg to profesjonalny preparat na bazie emulsji asfaltowej, kt\xF3ry zapewni doskona\u0142\u0105 przyczepno\u015B\u0107 i trwa\u0142o\u015B\u0107 izolacji fundament\xF3w, piwnic oraz \u015Bcian zag\u0142\u0119bionych. Niska cena, wysoka jako\u015B\u0107 i \u0142atwo\u015B\u0107 aplikacji \u2013 idealna do hydroizolacji budowlanych. Wydajno\u015B\u0107 0,3-0,5 kg/m\xB2, czas schni\u0119cia 1-3h, temperatura aplikacji +5\xB0C do +35\xB0C. Sprawd\u017A mas\u0119 bitumiczn\u0105 Izohan dla profesjonalnych i domowych zastosowa\u0144."
  },
  {
    id: "p065",
    slug: "pianka-montazowa-tytan-professional-750ml",
    name: "Pianka monta\u017Cowa Tytan Professional 750 ml",
    categorySlug: "piany-pistoletowe",
    brand: "Tytan",
    sku: "TYT-PRO-750",
    unit: "kartusze 750 ml",
    shortDescription: "Jednosk\u0142adnikowa pianka monta\u017Cowa Tytan Professional 750 ml, idealna do uszczelniania okien i drzwi. Wysoka wydajno\u015B\u0107 i doskona\u0142e w\u0142a\u015Bciwo\u015Bci izolacyjne.",
    description: "Tytan Professional to wysokiej jako\u015Bci jednosk\u0142adnikowa pianka monta\u017Cowa w puszce 750 ml, przeznaczona do profesjonalnych zastosowa\u0144 budowlanych. Doskonale nadaje si\u0119 do monta\u017Cu okien, drzwi, wype\u0142niania szczelin, izolacji termicznej i akustycznej. Dzi\u0119ki pistoletowemu aplikatorowi zapewnia precyzyjne dozowanie i doskona\u0142e przyleganie do r\xF3\u017Cnorodnych pod\u0142o\u017Cy. Charakteryzuje si\u0119 niskim przyrostem wt\xF3rnym, co minimalizuje ryzyko deformacji element\xF3w montowanych. Po utwardzeniu tworzy trwa\u0142\u0105 i elastyczn\u0105 spoin\u0119, odporn\u0105 na wilgo\u0107 i ple\u015B\u0144. Pianka Tytan Professional to gwarancja solidnego wykonania i d\u0142ugotrwa\u0142ej izolacji.",
    application: "Stosuj do monta\u017Cu okien, drzwi, parapet\xF3w, paneli izolacyjnych, wype\u0142niania luk i szczelin w budownictwie. Aplikuj za pomoc\u0105 pistoletu piankowego w temperaturze od +5\xB0C do +35\xB0C. Upewnij si\u0119, \u017Ce pod\u0142o\u017Ce jest czyste, suche i wolne od t\u0142uszczu. Przed u\u017Cyciem dok\u0142adnie wstrz\u0105\u015Bnij puszk\u0105.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "ok. 35\u201340 L pianki po rozpr\u0119\u017Ceniu" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +35\xB0C" },
      { label: "Czas ci\u0119cia", value: "ok. 1 h" },
      { label: "Izolacyjno\u015B\u0107", value: "\u03BB = 0,040 W/(m\xB7K)" }
    ],
    images: [],
    tags: [
      "pianka monta\u017Cowa",
      "tytan",
      "professional",
      "uszczelnienie",
      "okna",
      "drzwi",
      "pistoletowa"
    ],
    related: ["p056", "p058", "p097"],
    advantages: [
      "Wysoka wydajno\u015B\u0107 do 35-40 litr\xF3w piany po rozpr\u0119\u017Ceniu.",
      "Doskona\u0142a izolacyjno\u015B\u0107 termiczna i akustyczna (\u03BB = 0,040 W/(m\xB7K)).",
      "Niski przyrost wt\xF3rny zapobiega deformacji element\xF3w.",
      "Szybki czas ci\u0119cia (ok. 1 godzina) przyspiesza prace budowlane."
    ],
    warnings: [
      "Produkt \u0142atwopalny, stosuj w dobrze wentylowanych pomieszczeniach.",
      "Chro\u0144 sk\xF3r\u0119 i oczy przed kontaktem, u\u017Cywaj r\u0119kawic i okular\xF3w ochronnych."
    ],
    faq: [
      { q: "Do czego najlepiej nadaje si\u0119 pianka monta\u017Cowa Tytan Professional?", a: "Pianka Tytan Professional jest idealna do monta\u017Cu okien, drzwi, parapet\xF3w, paneli izolacyjnych, a tak\u017Ce do wype\u0142niania szczelin i izolacji termicznej oraz akustycznej w budownictwie." },
      { q: "Jaka jest temperatura aplikacji pianki Tytan Professional?", a: "Piank\u0119 mo\u017Cna aplikowa\u0107 w temperaturze otoczenia od +5\xB0C do +35\xB0C." },
      { q: "Jak du\u017Ca jest wydajno\u015B\u0107 puszki 750 ml?", a: "Puszka 750 ml pianki Tytan Professional zapewnia wydajno\u015B\u0107 oko\u0142o 35-40 litr\xF3w gotowej piany po jej rozpr\u0119\u017Ceniu." }
    ],
    seoDescription: "Wybierz piank\u0119 monta\u017Cow\u0105 Tytan Professional 750 ml \u2013 niezawodne rozwi\u0105zanie do uszczelniania okien, drzwi i izolacji. Pianka pistoletowa Tytan o wysokiej wydajno\u015Bci (do 40 L) i doskona\u0142ej izolacyjno\u015Bci termicznej (\u03BB = 0,040) sprawdzi si\u0119 w ka\u017Cdych warunkach. Niska deformacja i szybki czas ci\u0119cia (1h) to kluczowe zalety tej profesjonalnej pianki monta\u017Cowej. Idealna do zastosowa\u0144 budowlanych w temperaturach od +5\xB0C do +35\xB0C. Kup teraz piank\u0119 Tytan Professional i ciesz si\u0119 solidnym wykonaniem."
  },
  {
    id: "p066",
    slug: "styropian-fasadowy-eps70-031-swisspor-15cm",
    name: "Styropian fasadowy EPS 70\u2013031 Swisspor 15 cm",
    categorySlug: "styropian-fasadowy-eps",
    brand: "Swisspor",
    sku: "SWS-EPS70-031-15",
    unit: "m\xB2",
    shortDescription: "Nowoczesny styropian fasadowy Swisspor EPS 70-031 o grubo\u015Bci 15 cm zapewnia doskona\u0142\u0105 izolacj\u0119 termiczn\u0105 budynk\xF3w. Niska lambda \u03BB=0,031 W/(m\xB7K) gwarantuje energooszcz\u0119dno\u015B\u0107.",
    description: "Styropian fasadowy Swisspor EPS 70-031 o grubo\u015Bci 150 mm to wysoce efektywny materia\u0142 izolacyjny przeznaczony do termoizolacji \u015Bcian zewn\u0119trznych metod\u0105 ETICS. Dzi\u0119ki niskiemu wsp\xF3\u0142czynnikowi przewodzenia ciep\u0142a Lambda \u03BB=0,031 W/(m\xB7K), p\u0142yty te skutecznie minimalizuj\u0105 straty ciep\u0142a, przyczyniaj\u0105c si\u0119 do obni\u017Cenia rachunk\xF3w za ogrzewanie i zwi\u0119kszenia komfortu cieplnego w pomieszczeniach. Wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie CS(10) \u2265 70 kPa zapewnia trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 izolacji na uszkodzenia mechaniczne. Klasa ogniowa E \u015Bwiadczy o jego odpowiednim zachowaniu w warunkach po\u017Carowych. Jest to idealny wyb\xF3r dla budownictwa energooszcz\u0119dnego i pasywnego.",
    application: "Stosuj do izolacji termicznej \u015Bcian zewn\u0119trznych budynk\xF3w w systemie ETICS (metoda lekka mokra). P\u0142yty przeznaczone s\u0105 do przyklejania do pod\u0142o\u017Ca za pomoc\u0105 dedykowanych zapraw klej\u0105cych oraz dodatkowego mocowania mechanicznego. Zastosowanie na pod\u0142o\u017Cach betonowych, murowanych oraz bloczkach z betonu kom\xF3rkowego. Monta\u017C powinien odbywa\u0107 si\u0119 zgodnie z wytycznymi producenta systemu ETICS oraz obowi\u0105zuj\u0105cymi normami budowlanymi.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "150 mm" },
      { label: "Lambda \u03BB", value: "0,031 W/(m\xB7K)" },
      { label: "Nacisk CS(10)", value: "\u2265 70 kPa" },
      { label: "Klasa ogniowa", value: "E" },
      { label: "Wymiar p\u0142yty", value: "0,6 \xD7 1,0 m" }
    ],
    images: [],
    tags: [
      "styropian fasadowy",
      "swisspor",
      "eps 031",
      "ocieplenie",
      "etics",
      "izolacja termiczna"
    ],
    related: ["p067", "p058", "p071"],
    advantages: [
      "Doskona\u0142a izolacyjno\u015B\u0107 termiczna dzi\u0119ki niskiej warto\u015Bci Lambda.",
      "Wysoka wytrzyma\u0142o\u015B\u0107 mechaniczna i odporno\u015B\u0107 na uszkodzenia.",
      "D\u0142ugowieczno\u015B\u0107 i stabilno\u015B\u0107 parametr\xF3w izolacyjnych.",
      "Szerokie zastosowanie w systemach ETICS dla optymalnej termoizolacji."
    ],
    warnings: [
      "Przechowywa\u0107 w suchym miejscu, chroni\u0107 przed bezpo\u015Brednim dzia\u0142aniem promieni s\u0142onecznych.",
      "Stosowa\u0107 tylko z materia\u0142ami rekomendowanymi przez producenta systemu ETICS."
    ],
    faq: [
      { q: "Jaka jest g\u0142\xF3wna zaleta styropianu Swisspor EPS 70-031 15 cm?", a: "G\u0142\xF3wn\u0105 zalet\u0105 jest jego wyj\u0105tkowa zdolno\u015B\u0107 do izolacji termicznej, potwierdzona niskim wsp\xF3\u0142czynnikiem Lambda \u03BB=0,031 W/(m\xB7K), co przek\u0142ada si\u0119 na znacz\u0105ce oszcz\u0119dno\u015Bci energii." },
      { q: "Do jakich system\xF3w izolacji fasad mo\u017Cna stosowa\u0107 ten styropian?", a: "Styropian Swisspor EPS 70-031 15 cm jest przeznaczony g\u0142\xF3wnie do stosowania w systemach ETICS (metoda lekka mokra) na \u015Bcianach zewn\u0119trznych budynk\xF3w." },
      { q: "Jaka jest wytrzyma\u0142o\u015B\u0107 tego styropianu na \u015Bciskanie?", a: "Wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie przy 10% odkszta\u0142ceniu (CS(10)) wynosi co najmniej 70 kPa, co zapewnia jego stabilno\u015B\u0107 i odporno\u015B\u0107 mechaniczn\u0105 w systemie izolacyjnym." }
    ],
    seoDescription: "Wybierz styropian fasadowy Swisspor EPS 70-031 15 cm dla najwy\u017Cszej jako\u015Bci izolacji termicznej \u015Bcian zewn\u0119trznych. P\u0142yty o grubo\u015Bci 150 mm i wsp\xF3\u0142czynniku przewodzenia ciep\u0142a Lambda \u03BB=0,031 W/(m\xB7K) gwarantuj\u0105 energooszcz\u0119dno\u015B\u0107 i komfort cieplny Twojego domu. Styropian fasadowy Swisspor EPS 031 o wysokiej wytrzyma\u0142o\u015Bci CS(10) \u2265 70 kPa idealnie nadaje si\u0119 do system\xF3w ETICS, zapewniaj\u0105c trwa\u0142o\u015B\u0107 i ochron\u0119 przed utrat\u0105 ciep\u0142a. Inwestuj\u0105c w styropian Swisspor, stawiasz na nowoczesne rozwi\u0105zania izolacyjne, kt\xF3re obni\u017C\u0105 koszty ogrzewania i zwi\u0119ksz\u0105 warto\u015B\u0107 Twojej nieruchomo\u015Bci. Ocieplenie fasady styropianem to klucz do efektywnego zarz\u0105dzania energi\u0105."
  },
  {
    id: "p067",
    slug: "styropian-grafitowy-eps031-styropmin-15cm",
    name: "Styropian grafitowy EPS 031 Styropmin 15 cm",
    categorySlug: "styropian-fasadowy-eps",
    brand: "Styropmin",
    sku: "STY-GREY-031-15",
    unit: "m\xB2",
    shortDescription: "Styropian grafitowy Styropmin EPS 031 o grubo\u015Bci 15 cm. Wyj\u0105tkowa izolacja termiczna \u03BB=0,031 W/(m\xB7K) dla energooszcz\u0119dnych budynk\xF3w. Wysoka wytrzyma\u0142o\u015B\u0107 CS(10) \u2265 70 kPa.",
    description: "Styropian grafitowy Styropmin EPS 031 o grubo\u015Bci 15 cm to innowacyjny materia\u0142 termoizolacyjny, kt\xF3ry rewolucjonizuje rynek budowlany. Jego szary, grafitowy kolor i specjalna formu\u0142a zapewniaj\u0105 znacz\u0105co lepsze w\u0142a\u015Bciwo\u015Bci izolacyjne w por\xF3wnaniu do tradycyjnego styropianu. Niska warto\u015B\u0107 wsp\xF3\u0142czynnika przewodzenia ciep\u0142a (Lambda \u03BB = 0,031 W/(m\xB7K)) przek\u0142ada si\u0119 na realne oszcz\u0119dno\u015Bci energii w ogrzewaniu i ch\u0142odzeniu budynk\xF3w. Wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie (CS(10) \u2265 70 kPa) gwarantuje trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na uszkodzenia mechaniczne. Idealny do izolacji \u015Bcian zewn\u0119trznych metod\u0105 lekk\u0105 mokr\u0105 oraz do budownictwa energooszcz\u0119dnego i pasywnego.",
    application: "Styropian grafitowy Styropmin EPS 031 15 cm przeznaczony jest g\u0142\xF3wnie do izolacji termicznej \u015Bcian zewn\u0119trznych budynk\xF3w w systemach ETICS (metoda lekka mokra). Doskonale nadaje si\u0119 do zastosowania na tradycyjnych pod\u0142o\u017Cach budowlanych, takich jak beton, tynk cementowo-wapienny, bloczki silikatowe czy pustaki ceramiczne. Monta\u017C powinien odbywa\u0107 si\u0119 w temperaturach od +5\xB0C do +25\xB0C, z dala od bezpo\u015Bredniego nas\u0142onecznienia i opad\xF3w atmosferycznych.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "150 mm" },
      { label: "Lambda \u03BB", value: "0,031 W/(m\xB7K)" },
      { label: "Nacisk CS(10)", value: "\u2265 70 kPa" },
      { label: "Kolor", value: "szary \u2013 grafit" },
      { label: "Wymiar p\u0142yty", value: "0,6 \xD7 1,0 m" }
    ],
    images: [],
    tags: [
      "styropian grafitowy",
      "styropmin",
      "eps 031",
      "szary",
      "ocieplenie",
      "energooszcz\u0119dny"
    ],
    related: ["p066", "p058", "p071"],
    advantages: [
      "Wyj\u0105tkowa izolacyjno\u015B\u0107 termiczna dzi\u0119ki zawarto\u015Bci grafitu (\u03BB=0,031 W/(m\xB7K)).",
      "Zwi\u0119kszona odporno\u015B\u0107 na \u015Bciskanie (CS(10) \u2265 70 kPa) zapewnia trwa\u0142o\u015B\u0107 elewacji.",
      "Redukcja koszt\xF3w ogrzewania i ch\u0142odzenia dzi\u0119ki lepszej izolacji.",
      "\u0141atwo\u015B\u0107 monta\u017Cu i obr\xF3bki, sprawdzone rozwi\u0105zanie do fasad."
    ],
    warnings: [
      "Chroni\u0107 przed bezpo\u015Brednim dzia\u0142aniem promieni s\u0142onecznych podczas sk\u0142adowania i monta\u017Cu.",
      "Nie wystawia\u0107 na dzia\u0142anie rozpuszczalnik\xF3w organicznych, kt\xF3re mog\u0105 uszkodzi\u0107 struktur\u0119 materia\u0142u."
    ],
    faq: [
      { q: "Czym r\xF3\u017Cni si\u0119 styropian grafitowy od tradycyjnego bia\u0142ego styropianu?", a: "Styropian grafitowy zawiera drobinki grafitu, kt\xF3re odbijaj\u0105 promieniowanie cieplne, znacz\u0105co poprawiaj\u0105c jego w\u0142a\u015Bciwo\u015Bci izolacyjne w por\xF3wnaniu do bia\u0142ego styropianu. Dzi\u0119ki temu cie\u0144sza warstwa grafitowego materia\u0142u mo\u017Ce osi\u0105gn\u0105\u0107 por\xF3wnywalny efekt izolacyjny." },
      { q: "Czy styropian grafitowy nadaje si\u0119 do izolacji pod\u0142\xF3g?", a: "Styropian grafitowy Styropmin EPS 031 o wysokiej wytrzyma\u0142o\u015Bci na \u015Bciskanie jest odpowiedni do izolacji pod\u0142\xF3g, w tym pod\u0142\xF3g na gruncie oraz pod\u0142\xF3g na stropach, zw\u0142aszcza tam, gdzie wymagana jest wysoka izolacyjno\u015B\u0107 termiczna." },
      { q: "Jakie s\u0105 zalecane grubo\u015Bci p\u0142yt styropianowych do ocieplenia domu?", a: "Grubo\u015B\u0107 p\u0142yt styropianowych zale\u017Cy od wielu czynnik\xF3w, takich jak wsp\xF3\u0142czynnik przenikania ciep\u0142a przegrody, lokalizacja budynku oraz wymagania normowe. Dla budownictwa energooszcz\u0119dnego i pasywnego cz\u0119sto stosuje si\u0119 p\u0142yty o grubo\u015Bci od 15 cm do nawet 25 cm, zw\u0142aszcza styropian grafitowy." }
    ],
    seoDescription: "Szukasz wysokiej jako\u015Bci styropianu grafitowego do ocieplenia fasady? Styropian grafitowy Styropmin EPS 031 o grubo\u015Bci 15 cm to doskona\u0142y wyb\xF3r dla budownictwa energooszcz\u0119dnego. Jego wsp\xF3\u0142czynnik Lambda \u03BB=0,031 W/(m\xB7K) zapewnia znakomit\u0105 izolacyjno\u015B\u0107 termiczn\u0105, co przek\u0142ada si\u0119 na ni\u017Csze rachunki za ogrzewanie. Wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie CS(10) \u2265 70 kPa gwarantuje trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 elewacji. Idealny do system\xF3w ETICS, izolacji \u015Bcian zewn\u0119trznych, budynk\xF3w pasywnych. Zam\xF3w styropian grafitowy Styropmin 15 cm ju\u017C dzi\u015B i ciesz si\u0119 ciep\u0142em w swoim domu przez ca\u0142y rok. Ocieplenie fasady styropianem grafitowym to inwestycja w przysz\u0142o\u015B\u0107."
  },
  {
    id: "p068",
    slug: "styropian-podlogowy-eps100-swisspor-10cm",
    name: "Styropian pod\u0142ogowy EPS 100\u2013038 Swisspor 10 cm",
    categorySlug: "styropian-dach-podloga",
    brand: "Swisspor",
    sku: "SWS-EPS100-038-10",
    unit: "m\xB2",
    shortDescription: "Styropian pod\u0142ogowy Swisspor EPS 100\u2013038 o grubo\u015Bci 10 cm, zapewniaj\u0105cy doskona\u0142\u0105 izolacj\u0119 termiczn\u0105 i akustyczn\u0105 pod\u0142\xF3g oraz wylewek.",
    description: "Wysokiej jako\u015Bci styropian pod\u0142ogowy Swisspor EPS 100\u2013038 to idealny materia\u0142 izolacyjny do wszelkich zastosowa\u0144 pod\u0142ogowych. Dzi\u0119ki niskiej lambdzie wynosz\u0105cej 0,038 W/(m\xB7K) gwarantuje skuteczne ograniczenie strat ciep\u0142a, co przek\u0142ada si\u0119 na ni\u017Csze rachunki za ogrzewanie. Jego wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie (\u2265 100 kPa) sprawia, \u017Ce doskonale nadaje si\u0119 pod wylewki betonowe, p\u0142yty posadzkowe oraz systemy ogrzewania pod\u0142ogowego. Styropian Swisspor EPS 100\u2013038 to tak\u017Ce efektywna izolacja akustyczna, redukuj\u0105ca przenoszenie d\u017Awi\u0119k\xF3w mi\u0119dzy stropami. Jest \u0142atwy w obr\xF3bce i monta\u017Cu, stanowi\u0105c trwa\u0142e i niezawodne rozwi\u0105zanie dla nowoczesnego budownictwa.",
    application: "Styropian pod\u0142ogowy Swisspor EPS 100\u2013038 przeznaczony jest do izolacji termicznej i akustycznej pod\u0142\xF3g na gruncie, strop\xF3w, pod wylewki betonowe oraz betonowe p\u0142yty pod\u0142ogowe. Mo\u017Ce by\u0107 stosowany w budownictwie mieszkaniowym, komercyjnym oraz przemys\u0142owym, r\xF3wnie\u017C pod warunkiem zastosowania odpowiedniej warstwy rozk\u0142adaj\u0105cej obci\u0105\u017Cenia, np. folii budowlanej i zbrojonej wylewki.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "100 mm" },
      { label: "Lambda \u03BB", value: "0,038 W/(m\xB7K)" },
      { label: "Nacisk CS(10)", value: "\u2265 100 kPa" },
      { label: "Przeznaczenie", value: "pod\u0142ogi, wylewki" },
      { label: "Wymiar p\u0142yty", value: "0,5 \xD7 1,0 m" }
    ],
    images: [],
    tags: [
      "styropian pod\u0142ogowy",
      "swisspor",
      "eps 100",
      "wylewka",
      "ogrzewanie pod\u0142ogowe",
      "strop"
    ],
    related: ["p066", "p067", "p069"],
    advantages: [
      "Doskona\u0142a izolacja termiczna dzi\u0119ki niskiej lambdzie \u03BB = 0,038 W/(m\xB7K).",
      "Wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie (\u2265 100 kPa) idealna pod wylewki.",
      "Skuteczna izolacja akustyczna redukuj\u0105ca ha\u0142asy.",
      "\u0141atwo\u015B\u0107 obr\xF3bki i monta\u017Cu, przyspieszaj\u0105ca prace budowlane."
    ],
    warnings: [
      "Produkt nale\u017Cy chroni\u0107 przed bezpo\u015Brednim dzia\u0142aniem promieni s\u0142onecznych i wilgoci\u0105.",
      "Nale\u017Cy stosowa\u0107 zgodnie z zaleceniami producenta i przepisami budowlanymi."
    ],
    faq: [
      { q: "Jaka jest g\u0142\xF3wna zaleta styropianu Swisspor EPS 100\u2013038 na pod\u0142og\u0119?", a: "G\u0142\xF3wn\u0105 zalet\u0105 jest wysoka izolacyjno\u015B\u0107 termiczna (niska lambda 0,038) w po\u0142\u0105czeniu z dobr\u0105 wytrzyma\u0142o\u015Bci\u0105 na \u015Bciskanie (100 kPa), co czyni go idealnym wyborem pod wylewki i ogrzewanie pod\u0142ogowe." },
      { q: "Czy ten styropian nadaje si\u0119 pod ogrzewanie pod\u0142ogowe?", a: "Tak, styropian pod\u0142ogowy Swisspor EPS 100\u2013038 idealnie nadaje si\u0119 pod systemy ogrzewania pod\u0142ogowego dzi\u0119ki swojej wytrzyma\u0142o\u015Bci i w\u0142a\u015Bciwo\u015Bciom izolacyjnym." },
      { q: "Jakie s\u0105 wymiary p\u0142yty styropianowej?", a: "Wymiar p\u0142yty styropianowej wynosi 0,5 metra szeroko\u015Bci i 1,0 metra d\u0142ugo\u015Bci, co u\u0142atwia transport i monta\u017C." }
    ],
    seoDescription: "Szukasz efektywnego styropianu pod\u0142ogowego? Swisspor EPS 100\u2013038 10 cm to doskona\u0142y wyb\xF3r dla izolacji termicznej i akustycznej pod\u0142\xF3g, wylewek oraz system\xF3w ogrzewania pod\u0142ogowego. Dzi\u0119ki niskiej lambdzie \u03BB = 0,038 W/(m\xB7K) i wysokiej wytrzyma\u0142o\u015Bci na \u015Bciskanie CS(10) \u2265 100 kPa, ten styropian pod\u0142ogowy firmy Swisspor gwarantuje komfort cieplny i oszcz\u0119dno\u015B\u0107 energii. Idealny pod wylewki betonowe, p\u0142yty pod\u0142ogowe i na stropy. Sprawd\u017A ju\u017C dzi\u015B styropian Swisspor EPS 100 do izolacji pod\u0142\xF3g."
  },
  {
    id: "p069",
    slug: "styropian-fundamentowy-eps036-styropmin-10cm",
    name: "Styropian fundamentowy EPS 036 Styropmin 10 cm",
    categorySlug: "styropian-fundamenty",
    brand: "Styropmin",
    sku: "STY-FND-036-10",
    unit: "m\xB2",
    shortDescription: "Styropian fundamentowy EPS 036 Styropmin 10 cm to wysokiej jako\u015Bci izolacja termiczna o niskiej lambdzie, przeznaczona do ochrony fundament\xF3w przed wilgoci\u0105. Niezb\u0119dny do prawid\u0142owego ocieplenia przegr\xF3d zewn\u0119trznych poni\u017Cej poziomu terenu.",
    description: "Styropian fundamentowy EPS 036 marki Styropmin to gwarancja skutecznej i d\u0142ugotrwa\u0142ej izolacji termicznej fundament\xF3w oraz \u015Bcian piwnicznych. Dzi\u0119ki wsp\xF3\u0142czynnikowi przewodzenia ciep\u0142a lambda \u03BB = 0,036 W/(m\xB7K) zapewnia doskona\u0142\u0105 izolacyjno\u015B\u0107, minimalizuj\u0105c straty ciep\u0142a i chroni\u0105c konstrukcj\u0119 przed mrozem. Wysoka odporno\u015B\u0107 na wilgo\u0107 sprawia, \u017Ce produkt ten idealnie nadaje si\u0119 do zastosowa\u0144 w trudnych warunkach, gdzie wyst\u0119puje sta\u0142y kontakt z gruntem i wod\u0105. P\u0142yty o grubo\u015Bci 10 cm i wysokiej wytrzyma\u0142o\u015Bci na \u015Bciskanie CS(10) \u2265 100 kPa s\u0105 odporne na obci\u0105\u017Cenia mechaniczne, co zapewnia stabilno\u015B\u0107 izolacji. Styropmin EPS 036 to pewny wyb\xF3r dla profesjonalnych wykonawc\xF3w i inwestor\xF3w dbaj\u0105cych o jako\u015B\u0107 i energooszcz\u0119dno\u015B\u0107 budynk\xF3w.",
    application: "Produkt przeznaczony jest do izolacji termicznej \u015Bcian fundamentowych wykonanych z betonu, bloczk\xF3w betonowych oraz innych materia\u0142\xF3w budowlanych. Stosowany jest do izolacji pionowej poni\u017Cej poziomu terenu, w\u0142\u0105cznie z izolacj\u0105 przeciwwodn\u0105 \u015Bcian piwnic. Mo\u017Ce by\u0107 r\xF3wnie\u017C wykorzystywany do izolacji coko\u0142\xF3w oraz fundament\xF3w w budynkach podpiwniczonych i niepodpiwniczonych. Zaleca si\u0119 stosowanie w warunkach ci\u0105g\u0142ego nara\u017Cenia na wilgo\u0107.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "100 mm" },
      { label: "Lambda \u03BB", value: "0,036 W/(m\xB7K)" },
      { label: "Nacisk CS(10)", value: "\u2265 100 kPa" },
      { label: "Odporno\u015B\u0107 na wilgo\u0107", value: "wysoka" },
      { label: "Wymiar p\u0142yty", value: "0,5 \xD7 1,0 m" }
    ],
    images: [],
    tags: [
      "styropian fundamentowy",
      "styropmin",
      "eps 036",
      "fundament",
      "izolacja pionowa",
      "grunt"
    ],
    related: ["p070", "p064", "p078"],
    advantages: [
      "Doskona\u0142a izolacja termiczna dzi\u0119ki niskiej lambdzie \u03BB = 0,036 W/(m\xB7K).",
      "Wysoka odporno\u015B\u0107 na wilgo\u0107 i nasi\u0105kanie wod\u0105, idealny do kontaktu z gruntem.",
      "Wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie CS(10) \u2265 100 kPa, odporny na obci\u0105\u017Cenia.",
      "Trwa\u0142o\u015B\u0107 i stabilno\u015B\u0107 parametr\xF3w izolacyjnych przez wiele lat u\u017Cytkowania."
    ],
    warnings: [
      "Nale\u017Cy chroni\u0107 przed bezpo\u015Brednim dzia\u0142aniem promieni s\u0142onecznych i nadmiernym przegrzewaniem.",
      "Przed monta\u017Cem zapozna\u0107 si\u0119 z instrukcj\u0105 producenta dotycz\u0105c\u0105 sposobu klejenia i mocowania."
    ],
    faq: [
      { q: "Czy styropian fundamentowy EPS 036 nadaje si\u0119 do izolacji piwnic?", a: "Tak, styropian fundamentowy EPS 036 Styropmin jest idealnie przystosowany do izolacji termicznej \u015Bcian piwnicznych, zar\xF3wno od wewn\u0105trz, jak i od zewn\u0105trz, dzi\u0119ki swojej wysokiej odporno\u015Bci na wilgo\u0107 i \u015Bciskanie." },
      { q: "Jaka jest grubo\u015B\u0107 styropianu fundamentowego EPS 036 Styropmin?", a: "Podany produkt ma grubo\u015B\u0107 100 mm (10 cm)." },
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety stosowania styropianu fundamentowego EPS 036?", a: "G\u0142\xF3wne zalety to doskona\u0142a izolacja termiczna, wysoka odporno\u015B\u0107 na wilgo\u0107, wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie oraz d\u0142ugowieczno\u015B\u0107, co przek\u0142ada si\u0119 na oszcz\u0119dno\u015B\u0107 energii i ochron\u0119 fundament\xF3w." }
    ],
    seoDescription: "Szukasz wysokiej jako\u015Bci styropianu fundamentowego do izolacji piwnic i \u015Bcian poni\u017Cej poziomu terenu? Styropian fundamentowy EPS 036 Styropmin 10 cm to najlepszy wyb\xF3r. O niskiej lambdzie \u03BB=0,036 W/(m\xB7K) zapewnia doskona\u0142\u0105 izolacj\u0119 termiczn\u0105, a wysoka odporno\u015B\u0107 na wilgo\u0107 i nacisk CS(10) \u2265 100 kPa gwarantuje trwa\u0142o\u015B\u0107 i bezpiecze\u0144stwo. Idealny do izolacji pionowej grunt\xF3w, fundament\xF3w, coko\u0142\xF3w. Wybierz styropian Styropmin EPS 036 dla energooszcz\u0119dnego i chronionego domu. Kup teraz styropian fundamentowy 10cm o znakomitych parametrach."
  },
  {
    id: "p070",
    slug: "plyta-xps-fibran-gf-i-300-5cm",
    name: "P\u0142yta XPS Fibran GF I 300 5 cm",
    categorySlug: "plyty-xps",
    brand: "Fibran",
    sku: "FIB-GF300-5",
    unit: "m\xB2",
    shortDescription: "P\u0142yta XPS Fibran GF 300 o grubo\u015Bci 5 cm to wysokiej jako\u015Bci materia\u0142 izolacyjny z ekstrudowanego polistyrenu, idealny do izolacji fundament\xF3w, taras\xF3w i dach\xF3w odwr\xF3conych.",
    description: "P\u0142yta XPS Fibran GF 300 to innowacyjny materia\u0142 izolacyjny wykonany z ekstrudowanego polistyrenu (XPS), charakteryzuj\u0105cy si\u0119 doskona\u0142ymi parametrami termoizolacyjnymi. Grubo\u015B\u0107 50 mm i niski wsp\xF3\u0142czynnik przewodzenia ciep\u0142a lambda \u03BB = 0,033 W/(m\xB7K) zapewniaj\u0105 skuteczn\u0105 barier\u0119 termiczn\u0105, redukuj\u0105c straty energii i obni\u017Caj\u0105c koszty ogrzewania. Wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie (300 kPa) sprawia, \u017Ce p\u0142yta jest odporna na obci\u0105\u017Cenia mechaniczne, co czyni j\u0105 idealnym rozwi\u0105zaniem do izolacji pod\u0142\xF3g, fundament\xF3w, taras\xF3w oraz dach\xF3w odwr\xF3conych. Niska nasi\u0105kliwo\u015B\u0107 (< 0,3% obj.) gwarantuje zachowanie w\u0142a\u015Bciwo\u015Bci izolacyjnych nawet w wilgotnym \u015Brodowisku. Fibran GF 300 to synonim trwa\u0142o\u015Bci i efektywno\u015Bci.",
    application: "P\u0142yty Fibran GF 300 5 cm przeznaczone s\u0105 do izolacji termicznej w miejscach nara\u017Conych na wysokie obci\u0105\u017Cenia mechaniczne i wilgo\u0107. Idealnie nadaj\u0105 si\u0119 do izolacji pod\u0142\xF3g na gruncie, fundament\xF3w, coko\u0142\xF3w, taras\xF3w wentylowanych, balkon\xF3w oraz dach\xF3w odwr\xF3conych. Monta\u017C powinien odbywa\u0107 si\u0119 zgodnie z zaleceniami producenta, na suchym i stabilnym pod\u0142o\u017Cu.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "50 mm" },
      { label: "Lambda \u03BB", value: "0,033 W/(m\xB7K)" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie", value: "300 kPa" },
      { label: "Nasi\u0105kliwo\u015B\u0107", value: "< 0,3% obj." },
      { label: "Wymiar p\u0142yty", value: "0,6 \xD7 1,25 m" }
    ],
    images: [],
    tags: [
      "p\u0142yta xps",
      "fibran",
      "gf 300",
      "ekstrudowany",
      "taras",
      "dach odwr\xF3cony",
      "pod\u0142oga"
    ],
    related: ["p069", "p068", "p066"],
    advantages: [
      "Doskona\u0142a izolacja termiczna dzi\u0119ki niskiemu wsp\xF3\u0142czynnikowi lambda.",
      "Wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie, idealna do obci\u0105\u017Conych konstrukcji.",
      "Praktycznie zerowa nasi\u0105kliwo\u015B\u0107, odporna na wilgo\u0107 i mr\xF3z.",
      "Trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na czynniki chemiczne oraz biologiczne."
    ],
    warnings: [
      "Nie wystawia\u0107 na bezpo\u015Brednie dzia\u0142anie promieni UV przez d\u0142u\u017Cszy czas.",
      "Przechowywa\u0107 w miejscu chronionym przed uszkodzeniami mechanicznymi i wilgoci\u0105."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety stosowania p\u0142yt XPS Fibran GF 300?", a: "G\u0142\xF3wne zalety to doskona\u0142a izolacja termiczna, wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie, niska nasi\u0105kliwo\u015B\u0107 oraz odporno\u015B\u0107 na wilgo\u0107 i czynniki biologiczne, co przek\u0142ada si\u0119 na d\u0142ugotrwa\u0142\u0105 trwa\u0142o\u015B\u0107 i oszcz\u0119dno\u015B\u0107 energii." },
      { q: "Gdzie najcz\u0119\u015Bciej stosuje si\u0119 p\u0142yty XPS Fibran GF 300?", a: "P\u0142yty te s\u0105 idealne do izolacji fundament\xF3w, pod\u0142\xF3g na gruncie, taras\xF3w, dach\xF3w odwr\xF3conych, coko\u0142\xF3w oraz wsz\u0119dzie tam, gdzie wymagana jest wysoka odporno\u015B\u0107 na obci\u0105\u017Cenia i wilgo\u0107." },
      { q: "Czy p\u0142yty XPS Fibran GF 300 nadaj\u0105 si\u0119 do izolacji dach\xF3w p\u0142askich?", a: "Tak, p\u0142yty XPS Fibran GF 300 s\u0105 doskona\u0142ym wyborem do izolacji dach\xF3w odwr\xF3conych, gdzie ich wysoka wytrzyma\u0142o\u015B\u0107 na \u015Bciskanie i odporno\u015B\u0107 na wilgo\u0107 s\u0105 kluczowe dla trwa\u0142o\u015Bci konstrukcji dachowej." }
    ],
    seoDescription: "Szukasz wysokiej jako\u015Bci izolacji termicznej? P\u0142yta XPS Fibran GF 300 5 cm to ekstrudowany polistyren o lambda 0,033 W/(m\xB7K) i wytrzyma\u0142o\u015Bci 300 kPa. Idealna do izolacji fundament\xF3w, pod\u0142\xF3g na gruncie, taras\xF3w oraz dach\xF3w odwr\xF3conych. Niska nasi\u0105kliwo\u015B\u0107 < 0,3% zapewnia ochron\u0119 przed wilgoci\u0105. Fibran XPS GF 300 to gwarancja efektywnej i trwa\u0142ej izolacji. Kup p\u0142yt\u0119 XPS Fibran GF 300 50 mm w najlepszej cenie. Zastosowanie w budownictwie energooszcz\u0119dnym."
  },
  {
    id: "p071",
    slug: "welna-fasadowa-rockwool-frontrock-max-e-15cm",
    name: "We\u0142na fasadowa Rockwool Frontrock MAX E 15 cm",
    categorySlug: "welna-fasadowa",
    brand: "Rockwool",
    sku: "ROC-FRONTMAX-15",
    unit: "m\xB2",
    shortDescription: "We\u0142na fasadowa Rockwool Frontrock MAX E 15 cm to wysokiej jako\u015Bci izolacja mineralna zapewniaj\u0105ca doskona\u0142e w\u0142a\u015Bciwo\u015Bci termiczne i akustyczne oraz bezpiecze\u0144stwo ogniowe.",
    description: "We\u0142na fasadowa Rockwool Frontrock MAX E o grubo\u015Bci 150 mm to zaawansowany technologicznie produkt przeznaczony do izolacji termicznej \u015Bcian zewn\u0119trznych w systemach ETICS (metoda lekka mokra). Charakteryzuje si\u0119 niskim wsp\xF3\u0142czynnikiem przewodzenia ciep\u0142a (Lambda \u03BB = 0,036 W/(m\xB7K)), co gwarantuje skuteczne ograniczenie strat energii i obni\u017Cenie rachunk\xF3w za ogrzewanie. P\u0142yty z we\u0142ny skalnej Rockwool s\u0105 niepalne (klasa A1), odporne na wysokie temperatury i nie przyczyniaj\u0105 si\u0119 do rozprzestrzeniania ognia, zapewniaj\u0105c wysoki poziom bezpiecze\u0144stwa po\u017Carowego. Doskona\u0142a wytrzyma\u0142o\u015B\u0107 na odrywanie (\u2265 15 kPa) zapewnia trwa\u0142o\u015B\u0107 i stabilno\u015B\u0107 ocieplenia, a otwarta dyfuzyjnie struktura pozwala na swobodne oddychanie \u015Bcian.",
    application: "Produkt przeznaczony do izolacji termicznej \u015Bcian zewn\u0119trznych budynk\xF3w w systemach ETICS (metoda lekka mokra). Stosowany na pod\u0142o\u017Cach betonowych, murowanych oraz na istniej\u0105cych warstwach tynku, pod warunkiem zapewnienia odpowiedniej przyczepno\u015Bci warstwy zbrojonej. Mo\u017Ce by\u0107 stosowany zar\xF3wno w budownictwie mieszkaniowym, jak i u\u017Cyteczno\u015Bci publicznej, w warunkach atmosferycznych typowych dla prac budowlanych.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "150 mm" },
      { label: "Lambda \u03BB", value: "0,036 W/(m\xB7K)" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na odryw", value: "\u2265 15 kPa" },
      { label: "Klasa ogniowa", value: "A1" },
      { label: "Wymiar p\u0142yty", value: "0,6 \xD7 1,0 m" }
    ],
    images: [],
    tags: [
      "we\u0142na fasadowa",
      "rockwool",
      "frontrock max e",
      "etics",
      "mineralna",
      "ocieplenie",
      "ognioodporna"
    ],
    related: ["p072", "p059", "p067"],
    advantages: [
      "Doskona\u0142a izolacja termiczna i akustyczna",
      "Wysoka odporno\u015B\u0107 ogniowa - klasa A1",
      "Trwa\u0142o\u015B\u0107 i stabilno\u015B\u0107 mocowania dzi\u0119ki wysokiej wytrzyma\u0142o\u015Bci",
      'Otwarta dyfuzyjnie \u2013 umo\u017Cliwia "oddychanie" \u015Bcian'
    ],
    warnings: [
      "Przechowywa\u0107 w suchym miejscu, chroni\u0107 przed wilgoci\u0105.",
      "Nale\u017Cy stosowa\u0107 odpowiednie \u015Brodki ochrony osobistej podczas monta\u017Cu."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety we\u0142ny fasadowej Rockwool Frontrock MAX E 15 cm?", a: "G\u0142\xF3wne zalety to doskona\u0142a izolacja termiczna i akustyczna, wysoka klasa odporno\u015Bci ogniowej (A1), dobra wytrzyma\u0142o\u015B\u0107 na odrywanie zapewniaj\u0105ca trwa\u0142o\u015B\u0107 oraz otwarto\u015B\u0107 dyfuzyjna \u015Bcian." },
      { q: "Do jakich system\xF3w ocieple\u0144 nadaje si\u0119 we\u0142na fasadowa Rockwool Frontrock MAX E?", a: "Produkt przeznaczony jest g\u0142\xF3wnie do stosowania w systemach ETICS (metoda lekka mokra) na \u015Bcianach zewn\u0119trznych budynk\xF3w." },
      { q: "Jaki jest wsp\xF3\u0142czynnik przewodzenia ciep\u0142a dla tego produktu?", a: "Wsp\xF3\u0142czynnik przewodzenia ciep\u0142a (Lambda \u03BB) dla we\u0142ny fasadowej Rockwool Frontrock MAX E 15 cm wynosi 0,036 W/(m\xB7K)." }
    ],
    seoDescription: "Szukasz najlepszej we\u0142ny fasadowej do swojego domu? Rockwool Frontrock MAX E 15 cm to idealne rozwi\u0105zanie izolacyjne! Ta wysokiej jako\u015Bci we\u0142na mineralna z we\u0142ny skalnej o Lambda 0,036 W/(m\xB7K) zapewni rewelacyjn\u0105 izolacj\u0119 termiczn\u0105 i akustyczn\u0105. Spe\u0142nia najwy\u017Csze normy bezpiecze\u0144stwa ogniowego (klasa A1), chroni\u0105c Tw\xF3j budynek. Wytrzyma\u0142o\u015B\u0107 na odrywanie \u2265 15 kPa gwarantuje stabilno\u015B\u0107 i trwa\u0142o\u015B\u0107 ocieplenia ETICS. Idealna do izolacji \u015Bcian zewn\u0119trznych metod\u0105 lekk\u0105 mokr\u0105, pozwala \u015Bcianom oddycha\u0107. Kup we\u0142n\u0119 fasadow\u0105 Rockwool i ciesz si\u0119 komfortem oraz oszcz\u0119dno\u015Bci\u0105 energii przez lata. Niezawodne ocieplenie z Rockwool \u2013 wyb\xF3r profesjonalist\xF3w."
  },
  {
    id: "p072",
    slug: "welna-fasadowa-isover-tf-profi-15cm",
    name: "We\u0142na fasadowa Isover TF Profi 15 cm",
    categorySlug: "welna-fasadowa",
    brand: "Isover",
    sku: "ISV-TFPROFI-15",
    unit: "m\xB2",
    shortDescription: "We\u0142na fasadowa Isover TF Profi 15 cm to wysokiej jako\u015Bci materia\u0142 izolacyjny o doskona\u0142ych parametrach termicznych (\u03BB=0,035) i odporno\u015Bci ogniowej klasy A1, idealny do system\xF3w ETICS.",
    description: "We\u0142na fasadowa Isover TF Profi o grubo\u015Bci 15 cm to nowoczesne rozwi\u0105zanie do termoizolacji \u015Bcian zewn\u0119trznych budynk\xF3w w systemach ETICS (oikowanie \u015Bcian zewn\u0119trznych). Wykonana z we\u0142ny mineralnej, charakteryzuje si\u0119 niskim wsp\xF3\u0142czynnikiem przewodzenia ciep\u0142a lambda \u03BB=0,035 W/(m\xB7K), co gwarantuje skuteczne ocieplenie i znaczne oszcz\u0119dno\u015Bci energii. P\u0142yty o wymiarach 0,6 \xD7 1,2 m s\u0105 \u0142atwe w monta\u017Cu, a wysoka wytrzyma\u0142o\u015B\u0107 na odrywanie (\u2265 12,5 kPa) zapewnia trwa\u0142o\u015B\u0107 wykonanej izolacji. Produkt jest ca\u0142kowicie niepalny (klasa A1), co zwi\u0119ksza bezpiecze\u0144stwo po\u017Carowe obiektu. Wybieraj\u0105c Isover TF Profi, inwestujesz w komfort cieplny, energooszcz\u0119dno\u015B\u0107 i bezpiecze\u0144stwo na lata.",
    application: "We\u0142na fasadowa Isover TF Profi 15 cm przeznaczona jest do izolacji termicznej \u015Bcian zewn\u0119trznych wykonywanej w systemach ETICS. Stosowana na pod\u0142o\u017Cach betonowych, murowanych lub z element\xF3w drobnowymiarowych. Monta\u017C powinien odbywa\u0107 si\u0119 zgodnie z zaleceniami producenta systemu ETICS, przy u\u017Cyciu odpowiednich klej\xF3w i \u0142\u0105cznik\xF3w mechanicznych, w warunkach atmosferycznych zapewniaj\u0105cych prawid\u0142owe wi\u0105zanie zapraw.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "150 mm" },
      { label: "Lambda \u03BB", value: "0,035 W/(m\xB7K)" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na odryw", value: "\u2265 12,5 kPa" },
      { label: "Klasa ogniowa", value: "A1" },
      { label: "Wymiar p\u0142yty", value: "0,6 \xD7 1,2 m" }
    ],
    images: [],
    tags: [
      "we\u0142na fasadowa",
      "isover",
      "tf profi",
      "etics",
      "mineralna",
      "ocieplenie",
      "ognioodporna"
    ],
    related: ["p071", "p059", "p067"],
    advantages: [
      "Doskona\u0142a izolacja termiczna dzi\u0119ki niskiej lambdzie \u03BB=0,035 W/(m\xB7K).",
      "Wysoka odporno\u015B\u0107 ogniowa klasy A1 \u2013 bezpiecze\u0144stwo po\u017Carowe.",
      "Dobra wytrzyma\u0142o\u015B\u0107 mechaniczna na odrywanie (\u2265 12,5 kPa).",
      "\u0141atwo\u015B\u0107 i szybko\u015B\u0107 monta\u017Cu dzi\u0119ki standardowym wymiarom p\u0142yt."
    ],
    warnings: [
      "Chroni\u0107 przed zawilgoceniem podczas transportu, sk\u0142adowania i monta\u017Cu.",
      "Stosowa\u0107 odpowiednie \u015Brodki ochrony osobistej podczas pracy z we\u0142n\u0105 mineraln\u0105."
    ],
    faq: [
      { q: "Do jakich system\xF3w izolacji przeznaczona jest we\u0142na Isover TF Profi 15 cm?", a: "We\u0142na fasadowa Isover TF Profi 15 cm jest dedykowana do stosowania w zewn\u0119trznych systemach izolacji cieplnej \u015Bcian budynk\xF3w, znanych jako systemy ETICS (dawniej metoda lekko-mokra lub BSO)." },
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety stosowania we\u0142ny mineralnej Isover TF Profi?", a: "G\u0142\xF3wne zalety to wysoka izolacyjno\u015B\u0107 termiczna (niska lambda), niepalno\u015B\u0107 (klasa A1), dobra wytrzyma\u0142o\u015B\u0107 mechaniczna oraz \u0142atwo\u015B\u0107 obr\xF3bki i monta\u017Cu, co przek\u0142ada si\u0119 na energooszcz\u0119dno\u015B\u0107 i bezpiecze\u0144stwo budynku." },
      { q: "Czy we\u0142na fasadowa Isover TF Profi nadaje si\u0119 do izolacji poddaszy lub strop\xF3w?", a: "Produkt Isover TF Profi jest specjalnie zaprojektowany do izolacji fasad w systemach ETICS. Do izolacji poddaszy czy strop\xF3w zalecane s\u0105 inne rodzaje we\u0142ny Isover, dostosowane do specyfiki tych zastosowa\u0144." }
    ],
    seoDescription: "Szukasz efektywnej izolacji fasadowej? Wybierz we\u0142n\u0119 mineraln\u0105 Isover TF Profi 15 cm, klucz do energooszcz\u0119dnego budownictwa. Ta wysokiej jako\u015Bci we\u0142na fasadowa o grubo\u015Bci 150 mm posiada doskona\u0142y wsp\xF3\u0142czynnik przewodzenia ciep\u0142a lambda \u03BB=0,035 W/(m\xB7K), co gwarantuje minimalizacj\u0119 strat ciep\u0142a i ni\u017Csze rachunki za ogrzewanie. P\u0142yty we\u0142ny Isover TF Profi s\u0105 niepalne (klasa A1), zapewniaj\u0105c najwy\u017Cszy poziom bezpiecze\u0144stwa po\u017Carowego. Idealnie nadaj\u0105 si\u0119 do stosowania w systemach ETICS, oferuj\u0105c dobr\u0105 wytrzyma\u0142o\u015B\u0107 na odrywanie \u2265 12,5 kPa i \u0142atwo\u015B\u0107 monta\u017Cu. Ocieplenie fasady we\u0142n\u0105 Isover TF Profi to inwestycja w komfort, trwa\u0142o\u015B\u0107 i zdrowy mikroklimat wn\u0119trz. Kup ju\u017C dzi\u015B we\u0142n\u0119 fasadow\u0105 Isover TF Profi 15 cm."
  },
  {
    id: "p073",
    slug: "welna-akustyczna-rockwool-acoustic-5cm",
    name: "We\u0142na akustyczna Rockwool ACOUSTIC 5 cm",
    categorySlug: "welna-sucha-zabudowa",
    brand: "Rockwool",
    sku: "ROC-ACOUSTIC-5",
    unit: "m\xB2",
    shortDescription: "We\u0142na akustyczna Rockwool ACOUSTIC 5 cm to wysokiej jako\u015Bci materia\u0142 izolacyjny, zapewniaj\u0105cy doskona\u0142e poch\u0142anianie d\u017Awi\u0119ku i bezpiecze\u0144stwo ogniowe. Idealna do suchej zabudowy.",
    description: "We\u0142na mineralna Rockwool ACOUSTIC o grubo\u015Bci 5 cm to niezawodne rozwi\u0105zanie do poprawy izolacji akustycznej w Twoim domu lub biurze. Dzi\u0119ki wsp\xF3\u0142czynnikowi poch\u0142aniania d\u017Awi\u0119ku \u03B1w na poziomie 0,95, skutecznie redukuje niepo\u017C\u0105dane echa i ha\u0142asy, tworz\u0105c komfortowe wn\u0119trza. Materia\u0142 ten, o klasie ogniowej A1, jest niepalny, co podnosi bezpiecze\u0144stwo u\u017Cytkowania. Doskonale sprawdza si\u0119 w konstrukcjach \u015Bcian dzia\u0142owych, sufit\xF3w podwieszanych i pod\u0142\xF3g w systemach suchej zabudowy. Niska lambda \u03BB = 0,034 W/(m\xB7K) dodatkowo potwierdza jej w\u0142a\u015Bciwo\u015Bci izolacyjne. Wybierz Rockwool ACOUSTIC dla ciszy i bezpiecze\u0144stwa.",
    application: "We\u0142na akustyczna Rockwool ACOUSTIC 5 cm przeznaczona jest do stosowania w systemach suchej zabudowy, takich jak \u015Bciany dzia\u0142owe, sufity podwieszane, konstrukcje pod\u0142ogowe czy obudowy instalacji. Mo\u017Ce by\u0107 montowana w przestrzeniach mi\u0119dzy s\u0142upkami konstrukcji szkieletowej. Stosowa\u0107 wewn\u0105trz budynk\xF3w, w pomieszczeniach suchych.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "50 mm" },
      { label: "Lambda \u03BB", value: "0,034 W/(m\xB7K)" },
      { label: "Poch\u0142anianie d\u017Awi\u0119ku \u03B1w", value: "0,95" },
      { label: "Klasa ogniowa", value: "A1" }
    ],
    images: [],
    tags: [
      "we\u0142na akustyczna",
      "rockwool",
      "acoustic",
      "sucha zabudowa",
      "izolacja akustyczna",
      "\u015Bciany dzia\u0142owe"
    ],
    related: ["p093", "p097", "p074"],
    advantages: [
      "Wyj\u0105tkowa zdolno\u015B\u0107 poch\u0142aniania d\u017Awi\u0119ku (\u03B1w = 0,95).",
      "Najwy\u017Csza klasa reakcji na ogie\u0144 A1 - produkt niepalny.",
      "Dobre w\u0142a\u015Bciwo\u015Bci termoizolacyjne dzi\u0119ki niskiej lambdzie.",
      "\u0141atwo\u015B\u0107 monta\u017Cu i obr\xF3bki w systemach suchej zabudowy."
    ],
    warnings: [
      "Przed monta\u017Cem nale\u017Cy zapozna\u0107 si\u0119 z instrukcj\u0105 producenta.",
      "Podczas ci\u0119cia i monta\u017Cu stosowa\u0107 odpowiednie \u015Brodki ochrony osobistej."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety we\u0142ny akustycznej Rockwool ACOUSTIC?", a: "G\u0142\xF3wne zalety to wysokie poch\u0142anianie d\u017Awi\u0119ku (\u03B1w=0,95), niepalno\u015B\u0107 (klasa A1), dobre w\u0142a\u015Bciwo\u015Bci termoizolacyjne oraz \u0142atwo\u015B\u0107 monta\u017Cu w systemach suchej zabudowy." },
      { q: "Gdzie najcz\u0119\u015Bciej stosuje si\u0119 we\u0142n\u0119 Rockwool ACOUSTIC 5 cm?", a: "We\u0142na ta jest idealna do izolacji akustycznej \u015Bcian dzia\u0142owych, sufit\xF3w podwieszanych, pod\u0142\xF3g i obud\xF3w w budownictwie szkieletowym oraz systemach suchej zabudowy." },
      { q: "Czy we\u0142na Rockwool ACOUSTIC wp\u0142ywa na izolacj\u0119 termiczn\u0105?", a: "Tak, dzi\u0119ki niskiej lambdzie cieplnej (\u03BB=0,034 W/(m\xB7K)) we\u0142na akustyczna Rockwool ACOUSTIC zapewnia r\xF3wnie\u017C skuteczn\u0105 izolacj\u0119 termiczn\u0105, przyczyniaj\u0105c si\u0119 do oszcz\u0119dno\u015Bci energii." }
    ],
    seoDescription: "Szukasz skutecznej izolacji akustycznej do swojego projektu? We\u0142na akustyczna Rockwool ACOUSTIC 5 cm to profesjonalne rozwi\u0105zanie zapewniaj\u0105ce doskona\u0142e poch\u0142anianie d\u017Awi\u0119ku (\u03B1w=0,95) i bezpiecze\u0144stwo ogniowe (klasa A1). Idealna do suchych zabud\xF3w, takich jak \u015Bciany dzia\u0142owe, sufity podwieszane i pod\u0142ogi. Niska lambda (0,034 W/(m\xB7K)) gwarantuje r\xF3wnie\u017C dobre parametry termoizolacyjne. \u0141atwa w monta\u017Cu we\u0142na mineralna Rockwool ACOUSTIC to inwestycja w komfort i cisz\u0119 w Twoim domu lub biurze. Sprawd\u017A najlepsze ceny na we\u0142ny akustyczne Rockwool i materia\u0142y do suchej zabudowy."
  },
  {
    id: "p074",
    slug: "welna-stropowa-isover-aku-plate-10cm",
    name: "We\u0142na stropowa Isover Aku-Plate 10 cm",
    categorySlug: "welna-stropy",
    brand: "Isover",
    sku: "ISV-AKUPLATE-10",
    unit: "m\xB2",
    shortDescription: "We\u0142na mineralna Isover Aku-Plate 10 cm to doskona\u0142a izolacja akustyczna i termiczna strop\xF3w, zapewniaj\u0105ca komfort i oszcz\u0119dno\u015B\u0107 energii w Twoim domu. Klasa A1.",
    description: "We\u0142na Aku-Plate od Isover to innowacyjne rozwi\u0105zanie do izolacji strop\xF3w, \u0142\u0105cz\u0105ce wyj\u0105tkowe w\u0142a\u015Bciwo\u015Bci akustyczne z dobr\u0105 izolacj\u0105 termiczn\u0105. Grubo\u015B\u0107 10 cm i wsp\xF3\u0142czynnik lambda 0,038 W/(m\xB7K) gwarantuj\u0105 skuteczn\u0105 barier\u0119 dla ciep\u0142a i ha\u0142asu. Materia\u0142 jest niepalny (klasa A1), co podnosi bezpiecze\u0144stwo u\u017Cytkowania. Doskonale poch\u0142ania d\u017Awi\u0119ki (\u03B1w = 0,80), eliminuj\u0105c pog\u0142os i przenoszenie odg\u0142os\xF3w mi\u0119dzy kondygnacjami. Zastosowanie we\u0142ny Aku-Plate znacz\u0105co poprawia komfort akustyczny i termiczny pomieszcze\u0144, a tak\u017Ce przyczynia si\u0119 do redukcji strat energii.",
    application: "Produkt przeznaczony do izolacji akustycznej i termicznej strop\xF3w poddawanych obci\u0105\u017Ceniom mechanicznym, takich jak stropy nad nieogrzewanymi piwnicami lub gara\u017Cami, a tak\u017Ce stropy pomi\u0119dzy kondygnacjami w budynkach mieszkalnych i u\u017Cyteczno\u015Bci publicznej. Mo\u017Ce by\u0107 stosowana w systemach pod\u0142ogowych na legarach oraz jako izolacja strop\xF3w betonowych.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "100 mm" },
      { label: "Lambda \u03BB", value: "0,038 W/(m\xB7K)" },
      { label: "Klasa ogniowa", value: "A1" },
      { label: "Poch\u0142anianie d\u017Awi\u0119ku \u03B1w", value: "0,80" },
      { label: "Wymiar p\u0142yty", value: "0,6 \xD7 1,2 m" }
    ],
    images: [],
    tags: [
      "we\u0142na stropowa",
      "isover",
      "aku-plate",
      "strop",
      "izolacja akustyczna",
      "pod\u0142oga"
    ],
    related: ["p073", "p068", "p075"],
    advantages: [
      "Doskona\u0142e w\u0142a\u015Bciwo\u015Bci izolacji akustycznej, redukcja ha\u0142asu.",
      "Dobra izolacja termiczna, zmniejszenie strat ciep\u0142a.",
      "Materia\u0142 niepalny, wysoki poziom bezpiecze\u0144stwa ogniowego.",
      "\u0141atwo\u015B\u0107 monta\u017Cu i dopasowania do powierzchni stropu."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 podczas monta\u017Cu odpowiednie \u015Brodki ochrony indywidualnej.",
      "Produkt nale\u017Cy przechowywa\u0107 w suchym miejscu, chroni\u0107 przed wilgoci\u0105."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety stosowania we\u0142ny Isover Aku-Plate 10 cm?", a: "G\u0142\xF3wne zalety to doskona\u0142a izolacja akustyczna i termiczna, wysoka klasa reakcji na ogie\u0144 (A1) oraz \u0142atwo\u015B\u0107 monta\u017Cu. Produkt znacz\u0105co podnosi komfort u\u017Cytkowania pomieszcze\u0144." },
      { q: "Do jakich typ\xF3w strop\xF3w mo\u017Cna stosowa\u0107 t\u0119 we\u0142n\u0119?", a: "We\u0142na Aku-Plate 10 cm jest idealna do izolacji strop\xF3w poddawanych obci\u0105\u017Ceniom, np. strop\xF3w nad piwnicami, gara\u017Cami, a tak\u017Ce strop\xF3w mi\u0119dzykondygnacyjnych." },
      { q: "Czy we\u0142na Aku-Plate jest materia\u0142em bezpiecznym?", a: "Tak, we\u0142na Aku-Plate posiada klas\u0119 reakcji na ogie\u0144 A1, co oznacza, \u017Ce jest materia\u0142em niepalnym. Jest r\xF3wnie\u017C bezpieczna w u\u017Cytkowaniu po prawid\u0142owym monta\u017Cu." }
    ],
    seoDescription: "Inwestuj w komfort i energooszcz\u0119dno\u015B\u0107 z we\u0142n\u0105 stropow\u0105 Isover Aku-Plate 10 cm. Ta wysokiej jako\u015Bci we\u0142na mineralna o lambda 0,038 W/(m\xB7K) zapewnia skuteczn\u0105 izolacj\u0119 termiczn\u0105 i doskona\u0142e poch\u0142anianie d\u017Awi\u0119ku (\u03B1w = 0,80), eliminuj\u0105c ha\u0142as mi\u0119dzy kondygnacjami. Klasa ogniowa A1 gwarantuje bezpiecze\u0144stwo. Idealna do izolacji strop\xF3w poddawanych obci\u0105\u017Ceniom, strop\xF3w nad gara\u017Cami i piwnicami, a tak\u017Ce w systemach pod\u0142ogowych. Zam\xF3w we\u0142n\u0119 Isover Aku-Plate online dla lepszego komfortu akustycznego i termicznego Twojego domu. Sprawd\u017A wymiary p\u0142yty 0,6 \xD7 1,2 m i parametry techniczne."
  },
  {
    id: "p075",
    slug: "welna-poddasza-isover-uni-mata-20cm",
    name: "We\u0142na do poddasza Isover Uni-Mata 20 cm",
    categorySlug: "welna-poddasza",
    brand: "Isover",
    sku: "ISV-UNIMATA-20",
    unit: "m\xB2",
    shortDescription: "Isover Uni-Mata 20 cm to wysokiej jako\u015Bci we\u0142na mineralna w rolce, idealna do izolacji termicznej poddaszy. Zapewnia doskona\u0142\u0105 izolacyjno\u015B\u0107 i komfort cieplny.",
    description: "Isover Uni-Mata 20 cm to elastyczna we\u0142na mineralna w formie wygodnej rolki, stworzona z my\u015Bl\u0105 o efektywnej izolacji termicznej poddaszy. Jej grubo\u015B\u0107 200 mm oraz wsp\xF3\u0142czynnik przewodzenia ciep\u0142a \u03BB = 0,044 W/(m\xB7K) gwarantuj\u0105 minimalizacj\u0119 strat ciep\u0142a, co przek\u0142ada si\u0119 na ni\u017Csze rachunki za ogrzewanie i zwi\u0119kszony komfort u\u017Cytkowania pomieszcze\u0144 pod dachem. Produkt jest niepalny (klasa A1), co podnosi bezpiecze\u0144stwo po\u017Carowe budynku. \u0141atwo\u015B\u0107 monta\u017Cu mi\u0119dzy krokwiami sprawia, \u017Ce jest to idealne rozwi\u0105zanie zar\xF3wno dla profesjonalist\xF3w, jak i majsterkowicz\xF3w poszukuj\u0105cych skutecznej i energooszcz\u0119dnej izolacji poddaszy.",
    application: "We\u0142na Isover Uni-Mata 20 cm przeznaczona jest do izolacji termicznej poddaszy u\u017Cytkowych i nieu\u017Cytkowych, montowana mi\u0119dzy krokwiami. Stosowa\u0107 na suche i czyste pod\u0142o\u017Ce, zapewniaj\u0105c odpowiednie krycie materia\u0142u. Produkt nadaje si\u0119 do izolacji dach\xF3w sko\u015Bnych, strop\xF3w poddaszy oraz \u015Bcianek dzia\u0142owych na poddaszu.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "200 mm" },
      { label: "Lambda \u03BB", value: "0,044 W/(m\xB7K)" },
      { label: "Klasa ogniowa", value: "A1" },
      { label: "Forma", value: "rolka" },
      { label: "Szeroko\u015B\u0107", value: "600 mm" }
    ],
    images: [],
    tags: [
      "we\u0142na do poddasza",
      "isover",
      "uni-mata",
      "rolka",
      "izolacja termiczna",
      "krokwie"
    ],
    related: ["p074", "p073", "p079"],
    advantages: [
      "Doskona\u0142a izolacyjno\u015B\u0107 termiczna, obni\u017Ca koszty ogrzewania.",
      "Wysoka paroprzepuszczalno\u015B\u0107, pozwala budynkowi 'oddycha\u0107'.",
      "Niepalna, zwi\u0119ksza bezpiecze\u0144stwo po\u017Carowe obiektu.",
      "Elastyczno\u015B\u0107 i \u0142atwo\u015B\u0107 monta\u017Cu w rolkach, oszcz\u0119dno\u015B\u0107 czasu."
    ],
    warnings: [
      "Podczas monta\u017Cu stosowa\u0107 odpowiednie \u015Brodki ochrony osobistej (r\u0119kawice, maska, okulary).",
      "Przed monta\u017Cem upewni\u0107 si\u0119, \u017Ce konstrukcja dachu jest sucha i stabilna."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety stosowania we\u0142ny Isover Uni-Mata 20 cm?", a: "G\u0142\xF3wne zalety to doskona\u0142a izolacyjno\u015B\u0107 termiczna, wysoka paroprzepuszczalno\u015B\u0107, niepalno\u015B\u0107 oraz \u0142atwo\u015B\u0107 monta\u017Cu dzi\u0119ki formie rolki." },
      { q: "Czy we\u0142na mineralna Isover Uni-Mata jest bezpieczna?", a: "Tak, produkt posiada klas\u0119 ogniow\u0105 A1, co oznacza, \u017Ce jest niepalny. Nale\u017Cy jednak stosowa\u0107 \u015Brodki ochrony osobistej podczas monta\u017Cu." },
      { q: "Gdzie mo\u017Cna stosowa\u0107 we\u0142n\u0119 Isover Uni-Mata 20 cm?", a: "Jest idealna do izolacji termicznej poddaszy u\u017Cytkowych i nieu\u017Cytkowych, montowana mi\u0119dzy krokwiami, a tak\u017Ce do izolacji dach\xF3w sko\u015Bnych i strop\xF3w." }
    ],
    seoDescription: "Szukasz wydajnej izolacji poddasza? Isover Uni-Mata 20 cm w rolce to idealne rozwi\u0105zanie. We\u0142na mineralna o grubo\u015Bci 200 mm i lambda 0,044 W/(m\xB7K) zapewni Ci komfort termiczny i oszcz\u0119dno\u015Bci na ogrzewaniu. Niepalna izolacja poddasza Isover chroni Tw\xF3j dom. \u0141atwy monta\u017C mi\u0119dzy krokwiami. Sprawd\u017A we\u0142n\u0119 do poddasza Isover, kt\xF3ra redukuje straty ciep\u0142a. Najlepsza we\u0142na mineralna na dach sko\u015Bny. Kup teraz izolacj\u0119 termiczn\u0105 Uni-Mata 200 mm w rolce 600 mm."
  },
  {
    id: "p076",
    slug: "masa-kmb-botament-m21-20kg",
    name: "Masa hydroizolacyjna KMB Botament M 21 20 kg",
    categorySlug: "hydroizolacje-bitumiczne",
    brand: "Botament",
    sku: "BOT-M21-20",
    unit: "wiadro 20 kg",
    shortDescription: "Bitumiczna masa hydroizolacyjna Botament M 21 20 kg to dwusk\u0142adnikowa, modyfikowana polimerami emulsja do izolacji fundament\xF3w i piwnic. Zapewnia trwa\u0142\u0105 ochron\u0119 przed wod\u0105.",
    description: "Botament M 21 to wysokiej jako\u015Bci, dwusk\u0142adnikowa masa hydroizolacyjna na bazie bitumu, modyfikowana polimerami, przeznaczona do skutecznej ochrony budynk\xF3w przed wilgoci\u0105 i wod\u0105 gruntow\u0105. Produkt charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105 do r\xF3\u017Cnorodnych pod\u0142o\u017Cy budowlanych, takich jak beton, tynk czy stare pow\u0142oki bitumiczne. Po wyschni\u0119ciu tworzy elastyczn\u0105, bezspoinow\u0105 i wodoodporn\u0105 pow\u0142ok\u0119 o grubo\u015Bci 3-4 mm, kt\xF3ra skutecznie izoluje fundamenty, \u015Bciany piwnic oraz inne konstrukcje podziemne. Masa jest odporna na agresywne dzia\u0142anie soli i substancji chemicznych zawartych w gruncie. Dzi\u0119ki swojej wysokiej elastyczno\u015Bci (>80%, S1) doskonale radzi sobie z ruchami pod\u0142o\u017Ca i p\u0119kni\u0119ciami, zapewniaj\u0105c d\u0142ugotrwa\u0142\u0105 ochron\u0119.",
    application: "Botament M 21 stosuje si\u0119 do izolacji przeciwwodnej fundament\xF3w, \u015Bcian piwnic, p\u0142yt fundamentowych oraz innych element\xF3w konstrukcyjnych stykaj\u0105cych si\u0119 z gruntem. Mo\u017Ce by\u0107 aplikowana na suche i czyste pod\u0142o\u017Ca betonowe, tynkowe, murowane oraz istniej\u0105ce pow\u0142oki bitumiczne. Optymalna temperatura aplikacji wynosi od +5\xB0C do +35\xB0C. Produkt nale\u017Cy nak\u0142ada\u0107 w co najmniej dw\xF3ch warstwach, przy \u015Brednim zu\u017Cyciu 4-5 kg/m\xB2.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "4\u20135 kg/m\xB2 na 2 warstwy" },
      { label: "Grubo\u015B\u0107 po na\u0142o\u017Ceniu", value: "3\u20134 mm" },
      { label: "Elastyczno\u015B\u0107", value: "> 80% (S1)" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +35\xB0C" }
    ],
    images: [],
    tags: [
      "masa kmb",
      "botament",
      "m 21",
      "hydroizolacja",
      "fundament",
      "piwnica",
      "bitumiczna"
    ],
    related: ["p064", "p063", "p077"],
    advantages: [
      "Wysoka elastyczno\u015B\u0107 i odporno\u015B\u0107 na p\u0119kni\u0119cia.",
      "Doskona\u0142a przyczepno\u015B\u0107 do tradycyjnych pod\u0142o\u017Cy budowlanych.",
      "Trwa\u0142a ochrona przed wod\u0105 i wilgoci\u0105 gruntow\u0105.",
      "Odporno\u015B\u0107 na substancje chemiczne zawarte w gruncie."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +5\xB0C lub powy\u017Cej +35\xB0C.",
      "Zapewni\u0107 odpowiedni\u0105 wentylacj\u0119 podczas aplikacji i schni\u0119cia."
    ],
    faq: [
      { q: "Jakie jest przeznaczenie masy hydroizolacyjnej Botament M 21?", a: "Botament M 21 s\u0142u\u017Cy do kompleksowej izolacji przeciwwodnej fundament\xF3w, \u015Bcian piwnic, p\u0142yt fundamentowych oraz innych element\xF3w budowlanych nara\u017Conych na kontakt z wod\u0105 i wilgoci\u0105 gruntow\u0105. Zapewnia skuteczn\u0105 ochron\u0119 przed przenikaniem wody." },
      { q: "Jakie jest zu\u017Cycie masy Botament M 21 na metr kwadratowy?", a: "Zalecane zu\u017Cycie masy Botament M 21 wynosi 4\u20135 kg na metr kwadratowy, przy na\u0142o\u017Ceniu dw\xF3ch warstw. Dok\u0142adne zu\u017Cycie zale\u017Cy od r\xF3wno\u015Bci pod\u0142o\u017Ca i grubo\u015Bci warstwy." },
      { q: "W jakich temperaturach mo\u017Cna aplikowa\u0107 mas\u0119 Botament M 21?", a: "Mas\u0119 Botament M 21 mo\u017Cna aplikowa\u0107 w temperaturach otoczenia i pod\u0142o\u017Ca od +5\xB0C do +35\xB0C. Nale\u017Cy unika\u0107 aplikacji w zbyt niskich lub zbyt wysokich temperaturach, aby zapewni\u0107 prawid\u0142owe zwi\u0105zanie produktu." }
    ],
    seoDescription: "Szukasz niezawodnej hydroizolacji fundament\xF3w? Botament M 21 20 kg to dwusk\u0142adnikowa, modyfikowana polimerami masa bitumiczna, kt\xF3ra zapewni Twoim piwnicom i \u015Bcianom podziemnym skuteczn\u0105 ochron\u0119 przed wod\u0105. Ta elastyczna hydroizolacja bitumiczna tworzy trwa\u0142\u0105 barier\u0119 dla wilgoci, ma doskona\u0142\u0105 przyczepno\u015B\u0107 do betonu i tynku, a tak\u017Ce jest odporna na agresywne czynniki chemiczne w gruncie. Stosuj mas\u0119 KMB Botament M 21 dla budynk\xF3w nara\u017Conych na dzia\u0142anie wody gruntowej. Optymalna grubo\u015B\u0107 3-4 mm i zu\u017Cycie 4-5 kg/m\xB2 gwarantuj\u0105 wysok\u0105 jako\u015B\u0107 izolacji. Niezawodne rozwi\u0105zanie od Botament dla Twojej inwestycji."
  },
  {
    id: "p077",
    slug: "folia-w-plynie-sopro-fdf-522-5kg",
    name: "Folia w p\u0142ynie Sopro FDF 522 5 kg",
    categorySlug: "folie-w-plynie",
    brand: "Sopro",
    sku: "SPR-FDF522-5",
    unit: "wiadro 5 kg",
    shortDescription: "Elastyczna folia w p\u0142ynie Sopro FDF 522. Dwusk\u0142adnikowa, \u0142atwa w aplikacji, zapewnia doskona\u0142e uszczelnienie pod p\u0142ytki w \u0142azienkach i wilgotnych pomieszczeniach.",
    description: "Sopro FDF 522 to wysoce elastyczna, dwusk\u0142adnikowa folia w p\u0142ynie przeznaczona do tworzenia bezspoinowych pow\u0142ok uszczelniaj\u0105cych pod ok\u0142adziny ceramiczne. Idealna do stosowania w pomieszczeniach nara\u017Conych na wilgo\u0107, takich jak \u0142azienki, prysznice, pralnie czy kuchnie. Produkt charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105 do r\xF3\u017Cnorodnych pod\u0142o\u017Cy budowlanych, w tym betonu, jastrych\xF3w cementowych oraz tynk\xF3w. Prosta aplikacja p\u0119dzlem, wa\u0142kiem lub szpachl\u0105 pozwala na szybkie i skuteczne zabezpieczenie przed przenikaniem wody, zapobiegaj\u0105c powstawaniu uszkodze\u0144 i ple\u015Bni. Folia Sopro FDF 522 spe\u0142nia wymagania norm dotycz\u0105cych uszczelnie\u0144 pod ok\u0142adzinami.",
    application: "Stosuj na czyste, suche i stabilne pod\u0142o\u017Ca mineralne oraz betonowe wewn\u0105trz budynk\xF3w. Przed aplikacj\u0105 zagruntuj odpowiednim preparatem Sopro. Nak\u0142adaj minimum dwie warstwy, zachowuj\u0105c czas schni\u0119cia jednej warstwy (2-4 godziny). Unikaj aplikacji w temperaturach poni\u017Cej +5\xB0C i powy\u017Cej +35\xB0C. Pow\u0142oka musi by\u0107 odpowiednio zabezpieczona przed uszkodzeniami mechanicznymi przed monta\u017Cem ok\u0142adzin.",
    technicalSpec: [
      { label: "Zu\u017Cycie", value: "1,5\u20132,0 kg/m\xB2 na 2 warstwy" },
      { label: "Czas schni\u0119cia", value: "2\u20134 h na warstw\u0119" },
      { label: "Elastyczno\u015B\u0107", value: "S2 \u2013 wysoce elastyczna" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +35\xB0C" }
    ],
    images: [],
    tags: [
      "folia w p\u0142ynie",
      "sopro",
      "fdf 522",
      "\u0142azienka",
      "p\u0142ytki",
      "uszczelnienie",
      "podp\u0142ytkowa"
    ],
    related: ["p063", "p076", "p123"],
    advantages: [
      "Wysoce elastyczna pow\u0142oka uszczelniaj\u0105ca (klasa S2).",
      "\u0141atwo\u015B\u0107 aplikacji p\u0119dzlem, wa\u0142kiem lub szpachl\u0105.",
      "Doskona\u0142a przyczepno\u015B\u0107 do pod\u0142o\u017Cy budowlanych.",
      "Szybkie schni\u0119cie warstw (2-4 godziny na warstw\u0119)."
    ],
    warnings: [
      "Nie stosowa\u0107 w miejscach sta\u0142ego zanurzenia w wodzie.",
      "Nale\u017Cy przestrzega\u0107 zalece\u0144 producenta dotycz\u0105cych aplikacji i warunk\xF3w atmosferycznych."
    ],
    faq: [
      { q: "Jakie jest zu\u017Cycie folii Sopro FDF 522?", a: "Zu\u017Cycie folii Sopro FDF 522 wynosi oko\u0142o 1,5\u20132,0 kg/m\xB2 przy na\u0142o\u017Ceniu dw\xF3ch warstw. Dok\u0142adne zu\u017Cycie zale\u017Cy od ch\u0142onno\u015Bci pod\u0142o\u017Ca i techniki aplikacji." },
      { q: "W jakich warunkach mo\u017Cna aplikowa\u0107 foli\u0119 Sopro FDF 522?", a: "Foli\u0119 mo\u017Cna aplikowa\u0107 w temperaturach od +5\xB0C do +35\xB0C. Pod\u0142o\u017Ce musi by\u0107 suche, czyste i stabilne." },
      { q: "Czy folia Sopro FDF 522 nadaje si\u0119 do uszczelniania taras\xF3w?", a: "Produkt Sopro FDF 522 jest przeznaczony g\u0142\xF3wnie do stosowania wewn\u0105trz budynk\xF3w, w pomieszczeniach wilgotnych. Do uszczelniania taras\xF3w zalecane s\u0105 inne specjalistyczne produkty Sopro." }
    ],
    seoDescription: "Szukasz niezawodnego uszczelnienia pod p\u0142ytki? Wybierz dwusk\u0142adnikow\u0105 foli\u0119 w p\u0142ynie Sopro FDF 522 (5 kg). Ta wysoce elastyczna (S2) folia jest idealna do \u0142azienek, prysznic\xF3w i wilgotnych pomieszcze\u0144. Szybki czas schni\u0119cia (2-4h na warstw\u0119) i \u0142atwa aplikacja wa\u0142kiem, p\u0119dzlem lub szpachl\u0105 gwarantuj\u0105 skuteczne zabezpieczenie przed wilgoci\u0105. Doskona\u0142a przyczepno\u015B\u0107 do pod\u0142o\u017Cy budowlanych sprawia, \u017Ce Sopro FDF 522 to gwarancja jako\u015Bci i trwa\u0142o\u015Bci Twoich ok\u0142adzin. Sprawd\u017A nasz\u0105 ofert\u0119 - folia w p\u0142ynie Sopro FDF 522 to profesjonalne rozwi\u0105zanie dla Twojego domu."
  },
  {
    id: "p078",
    slug: "papa-termozgrzewalna-icopal-base-ev40",
    name: "Papa podk\u0142adowa termozgrzewalna Icopal Base EV 40",
    categorySlug: "papy-hydroizolacyjne",
    brand: "Icopal",
    sku: "ICP-BASE-EV40",
    unit: "rolka 10 m\xB2",
    shortDescription: "Papa podk\u0142adowa Icopal Base EV 40 to wysokiej jako\u015Bci materia\u0142 hydroizolacyjny z flizelin\u0105 PY 200, przeznaczony do pokry\u0107 dachowych. Zapewnia skuteczn\u0105 ochron\u0119 przed wilgoci\u0105 i wod\u0105.",
    description: "Papa podk\u0142adowa termozgrzewalna Icopal Base EV 40 to niezawodny produkt do izolacji dach\xF3w p\u0142askich i spadzistych. Wyposa\u017Cona w wytrzyma\u0142\u0105 wk\u0142adk\u0119 z flizeliny PY 200, zapewnia doskona\u0142\u0105 odporno\u015B\u0107 na rozci\u0105ganie i przetarcia. Grubo\u015B\u0107 4,0 mm gwarantuje skuteczn\u0105 barier\u0119 hydroizolacyjn\u0105. Papa jest \u0142atwa w monta\u017Cu metod\u0105 termozgrzewania w temperaturze 170-200\xB0C, co przyspiesza prace dekarskie. Idealna jako warstwa podk\u0142adowa pod papy wierzchniego krycia, zapewniaj\u0105c d\u0142ugotrwa\u0142\u0105 ochron\u0119 przed wilgoci\u0105. Doskonale sprawdzi si\u0119 w systemach hydroizolacyjnych na dachach o minimalnym spadku 1%.",
    application: "Papa Icopal Base EV 40 jest przeznaczona do wykonywania warstwy podk\u0142adowej hydroizolacji dach\xF3w p\u0142askich i sko\u015Bnych. Stosuje si\u0119 j\u0105 na stabilnym, suchym pod\u0142o\u017Cu. Niezb\u0119dne jest zastosowanie pod dedykowane papy wierzchniego krycia Icopal. Monta\u017C odbywa si\u0119 metod\u0105 termozgrzewania, zalecana temperatura to 170-200\xB0C. Minimalny spadek dachu powinien wynosi\u0107 1%.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "4,0 mm" },
      { label: "Wk\u0142adka zbroj\u0105ca", value: "flizelina PY 200" },
      { label: "Temperatura zgrzewania", value: "170\u2013200\xB0C" },
      { label: "Spadek min.", value: "1%" }
    ],
    images: [],
    tags: [
      "papa termozgrzewalna",
      "icopal",
      "base",
      "podk\u0142adowa",
      "dach",
      "hydroizolacja",
      "rolka"
    ],
    related: ["p105", "p109", "p064"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na uszkodzenia mechaniczne dzi\u0119ki wk\u0142adce z flizeliny PY 200.",
      "Skuteczna hydroizolacja dachu, chroni\u0105ca przed wilgoci\u0105 i wod\u0105.",
      "\u0141atwo\u015B\u0107 i szybko\u015B\u0107 monta\u017Cu metod\u0105 termozgrzewania.",
      "Trwa\u0142o\u015B\u0107 i d\u0142ugowieczno\u015B\u0107 pokrycia dachowego."
    ],
    warnings: [
      "Prace monta\u017Cowe nale\u017Cy prowadzi\u0107 w odpowiednich warunkach atmosferycznych, unikaj\u0105c deszczu i silnego wiatru.",
      "Nale\u017Cy przestrzega\u0107 zalece\u0144 producenta dotycz\u0105cych temperatury zgrzewania i przygotowania pod\u0142o\u017Ca."
    ],
    faq: [
      { q: "Jaka jest g\u0142\xF3wna funkcja papy Icopal Base EV 40?", a: "Papa Icopal Base EV 40 pe\u0142ni rol\u0119 warstwy podk\u0142adowej hydroizolacji dach\xF3w. Zapewnia skuteczn\u0105 barier\u0119 chroni\u0105c\u0105 przed wilgoci\u0105 i wod\u0105, stanowi\u0105c solidn\u0105 baz\u0119 pod papy wierzchniego krycia." },
      { q: "W jakich temperaturach nale\u017Cy zgrzewa\u0107 pap\u0119 Icopal Base EV 40?", a: "Zalecana temperatura zgrzewania papy Icopal Base EV 40 wynosi od 170\xB0C do 200\xB0C. Nale\u017Cy dok\u0142adnie kontrolowa\u0107 temperatur\u0119, aby zapewni\u0107 prawid\u0142owe po\u0142\u0105czenie." },
      { q: "Jaki jest minimalny zalecany spadek dachu dla tej papy?", a: "Minimalny zalecany spadek dachu dla papy Icopal Base EV 40 wynosi 1%. Zapewnia to prawid\u0142owe odprowadzanie wody z powierzchni dachowej." }
    ],
    seoDescription: "Papa podk\u0142adowa termozgrzewalna Icopal Base EV 40, o grubo\u015Bci 4,0 mm, z wk\u0142adk\u0105 z flizeliny PY 200, to doskona\u0142e rozwi\u0105zanie hydroizolacyjne dla ka\u017Cdego dachu. Idealna jako podk\u0142ad pod papy wierzchniego krycia, zapewnia niezawodn\u0105 ochron\u0119 przed wilgoci\u0105 i wod\u0105. \u0141atwy monta\u017C metod\u0105 termozgrzewania w temperaturze 170-200\xB0C przyspiesza prace dekarskie. Papa Icopal Base EV 40 sprawdzi si\u0119 na dachach p\u0142askich i sko\u015Bnych o minimalnym spadku 1%. Inwestycja w pap\u0119 Icopal to gwarancja trwa\u0142o\u015Bci i bezpiecze\u0144stwa Twojego dachu. Odkryj pe\u0142n\u0105 gam\u0119 produkt\xF3w Icopal do hydroizolacji dach\xF3w."
  },
  {
    id: "p079",
    slug: "folia-paroprzepuszczalna-fakro-amv-200-50m2",
    name: "Folia paroprzepuszczalna Fakro AMV 200 50 m\xB2",
    categorySlug: "folie-paroprzepuszczalne",
    brand: "Fakro",
    sku: "FAK-AMV200-50",
    unit: "rolka 50 m\xB2",
    shortDescription: "Folia paroprzepuszczalna Fakro AMV 200 o wymiarach 50 m\xB2 zapewnia skuteczn\u0105 ochron\u0119 dachu przed wilgoci\u0105, jednocze\u015Bnie umo\u017Cliwiaj\u0105c odprowadzanie pary wodnej z wn\u0119trza budynku. Idealna do poddaszy.",
    description: "Folia paroprzepuszczalna Fakro AMV 200 to wysokiej jako\u015Bci membrana dachowa przeznaczona do stosowania jako warstwa wst\u0119pnego krycia pod pokrycia dachowe. Dzi\u0119ki niskiej warto\u015Bci wsp\xF3\u0142czynnika Sd (< 0,02 m), skutecznie chroni konstrukcj\u0119 dachu przed wilgoci\u0105 z zewn\u0105trz, deszczem, \u015Bniegiem i wiatrem, a jednocze\u015Bnie pozwala na swobodne odprowadzanie pary wodnej z wn\u0119trza poddasza. Zapobiega to kondensacji pary wodnej i chroni materia\u0142y izolacyjne przed zawilgoceniem, co jest kluczowe dla trwa\u0142o\u015Bci i efektywno\u015Bci energetycznej budynku. Folia AMV 200 charakteryzuje si\u0119 du\u017C\u0105 wytrzyma\u0142o\u015Bci\u0105 na rozdzieranie (\u2265 450/350 N/5cm), co u\u0142atwia jej monta\u017C i zapewnia d\u0142ugotrwa\u0142\u0105 ochron\u0119.",
    application: "Folia Fakro AMV 200 jest przeznaczona do monta\u017Cu na dachach sko\u015Bnych, jako warstwa wst\u0119pnego krycia bezpo\u015Brednio na krokwiach lub \u0142atach. Mo\u017Ce by\u0107 stosowana pod r\xF3\u017Cnego rodzaju pokrycia dachowe, zapewniaj\u0105c skuteczn\u0105 ochron\u0119 przed czynnikami atmosferycznymi. Nale\u017Cy j\u0105 uk\u0142ada\u0107 z odpowiednim zak\u0142adem, zgodnie z zaleceniami producenta, zapewniaj\u0105c szczelno\u015B\u0107 po\u0142\u0105cze\u0144.",
    technicalSpec: [
      { label: "Paroprzepuszczalno\u015B\u0107 Sd", value: "< 0,02 m" },
      { label: "Wytrzyma\u0142o\u015B\u0107 na rozdzieranie", value: "\u2265 450/350 N/5cm" },
      { label: "Szeroko\u015B\u0107", value: "1,5 m" },
      { label: "Klasa ogniowa", value: "E" }
    ],
    images: [],
    tags: [
      "folia paroprzepuszczalna",
      "fakro",
      "amv 200",
      "dach",
      "poddasze",
      "membrana",
      "wst\u0119pne krycie"
    ],
    related: ["p109", "p075", "p080"],
    advantages: [
      "Doskona\u0142a ochrona przed wilgoci\u0105 z zewn\u0105trz.",
      "Wysoka paroprzepuszczalno\u015B\u0107, odprowadzanie pary z wn\u0119trza.",
      "Du\u017Ca wytrzyma\u0142o\u015B\u0107 mechaniczna na rozdzieranie.",
      "Zwi\u0119ksza trwa\u0142o\u015B\u0107 konstrukcji dachu i izolacji."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 zgodnie z instrukcj\u0105 monta\u017Cu producenta.",
      "Chroni\u0107 przed uszkodzeniami mechanicznymi podczas transportu i monta\u017Cu."
    ],
    faq: [
      { q: "Jaka jest g\u0142\xF3wna funkcja folii paroprzepuszczalnej Fakro AMV 200?", a: "G\u0142\xF3wn\u0105 funkcj\u0105 folii jest ochrona dachu przed wod\u0105 i wilgoci\u0105 z zewn\u0105trz, przy jednoczesnym umo\u017Cliwieniu odprowadzania pary wodnej z wn\u0119trza budynku, co zapobiega jej kondensacji." },
      { q: "Czy folia AMV 200 nadaje si\u0119 do ka\u017Cdego rodzaju dachu?", a: "Tak, folia jest przeznaczona do dach\xF3w sko\u015Bnych i mo\u017Ce by\u0107 stosowana pod wi\u0119kszo\u015B\u0107 popularnych pokry\u0107 dachowych." },
      { q: "Jakie s\u0105 wymiary rolki folii Fakro AMV 200?", a: "Rolka folii Fakro AMV 200 ma wymiary 1,5 m szeroko\u015Bci i pokrywa powierzchni\u0119 50 m\xB2." }
    ],
    seoDescription: "Szukasz wysokiej jako\u015Bci folii paroprzepuszczalnej do swojego dachu? Folia Fakro AMV 200 o wymiarach 50 m\xB2 to idealne rozwi\u0105zanie jako membrana wst\u0119pnego krycia na poddasze. Zapewnia doskona\u0142\u0105 ochron\u0119 przed deszczem, \u015Bniegiem i wiatrem, dzi\u0119ki niskiemu wsp\xF3\u0142czynnikowi Sd (< 0,02 m) skutecznie odprowadza wilgo\u0107 z wn\u0119trza budynku. Du\u017Ca wytrzyma\u0142o\u015B\u0107 na rozdzieranie (\u2265 450/350 N/5cm) gwarantuje \u0142atwy monta\u017C i d\u0142ugotrwa\u0142e u\u017Cytkowanie. Sprawd\u017A nasz\u0105 ofert\u0119 folii dachowych Fakro i zapewnij swojemu domowi komfort i bezpiecze\u0144stwo."
  },
  {
    id: "p080",
    slug: "folia-paroizolacyjna-foliarex-strotex-al-50m2",
    name: "Folia paroizolacyjna Foliarex Strotex AL 50 m\xB2",
    categorySlug: "folie-paroizolacyjne",
    brand: "Foliarex",
    sku: "FOL-STROTEX-AL-50",
    unit: "rolka 50 m\xB2",
    shortDescription: "Folia paroizolacyjna Foliarex Strotex AL to zaawansowana bariera parowa z warstw\u0105 refleksyjn\u0105 aluminium, idealna do izolacji poddaszy i strop\xF3w. Zapewnia doskona\u0142\u0105 ochron\u0119 przed wilgoci\u0105 i poprawia efektywno\u015B\u0107 energetyczn\u0105.",
    description: "Folia paroizolacyjna Foliarex Strotex AL to wysokiej jako\u015Bci materia\u0142 budowlany przeznaczony do skutecznej ochrony przed dyfuzj\u0105 pary wodnej w przegrodach budowlanych. Dzi\u0119ki zastosowaniu warstwy refleksyjnej aluminium, folia nie tylko stanowi barier\u0119 parow\u0105, ale r\xF3wnie\u017C odbija ciep\u0142o z powrotem do wn\u0119trza pomieszczenia, znacz\u0105co poprawiaj\u0105c efektywno\u015B\u0107 energetyczn\u0105 budynku. Jest to idealne rozwi\u0105zanie do izolacji poddaszy, dach\xF3w sko\u015Bnych oraz strop\xF3w. Produkt Strotex AL o wsp\xF3\u0142czynniku Sd 250 m zapewnia wyj\u0105tkowo nisk\u0105 paroprzepuszczalno\u015B\u0107, chroni\u0105c konstrukcj\u0119 dachu i izolacj\u0119 termiczn\u0105 przed szkodliwym dzia\u0142aniem wilgoci.",
    application: "Folia przeznaczona jest do stosowania od strony wewn\u0119trznej pomieszcze\u0144 w konstrukcjach dach\xF3w sko\u015Bnych i p\u0142askich, a tak\u017Ce w \u015Bcianach zewn\u0119trznych i stropach. Powinna by\u0107 montowana na styk z materia\u0142em izolacyjnym lub na elemencie konstrukcyjnym, z zachowaniem szczeliny wentylacyjnej od strony wewn\u0119trznej (nieizolowanej). Nale\u017Cy j\u0105 uk\u0142ada\u0107 z odpowiednim zak\u0142adem i uszczelnia\u0107 dedykowanymi ta\u015Bmami.",
    technicalSpec: [
      { label: "Paroizolacyjno\u015B\u0107 Sd", value: "250 m" },
      { label: "Aluminium", value: "TAK \u2013 warstwa refleksyjna" },
      { label: "Szeroko\u015B\u0107", value: "1,5 m" },
      { label: "Grubo\u015B\u0107", value: "0,12 mm" }
    ],
    images: [],
    tags: [
      "folia paroizolacyjna",
      "foliarex",
      "strotex al",
      "poddasze",
      "bariera parowa",
      "aluminium",
      "strop"
    ],
    related: ["p079", "p075", "p074"],
    advantages: [
      "Skuteczna bariera dla pary wodnej (Sd = 250 m) chroni\u0105ca konstrukcj\u0119.",
      "Warstwa aluminium odbija ciep\u0142o, poprawiaj\u0105c izolacyjno\u015B\u0107 termiczn\u0105.",
      "Wysoka wytrzyma\u0142o\u015B\u0107 mechaniczna i odporno\u015B\u0107 na uszkodzenia.",
      "Zapobiega powstawaniu mostk\xF3w termicznych i kondensacji wilgoci."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 zgodnie z zaleceniami producenta i specyfikacj\u0105 techniczn\u0105.",
      "Monta\u017C wymaga starannego uszczelnienia zak\u0142ad\xF3w i przej\u015B\u0107."
    ],
    faq: [
      { q: "Jaka jest g\u0142\xF3wna funkcja folii Foliarex Strotex AL?", a: "G\u0142\xF3wn\u0105 funkcj\u0105 folii Foliarex Strotex AL jest stworzenie szczelnej bariery parowej, kt\xF3ra zapobiega przenikaniu wilgoci z wn\u0119trza budynku do warstwy izolacji i konstrukcji dachu lub \u015Bciany." },
      { q: "Czy folia Strotex AL nadaje si\u0119 do wszystkich typ\xF3w dach\xF3w?", a: "Tak, folia Strotex AL jest wszechstronna i idealnie nadaje si\u0119 do izolacji poddaszy, dach\xF3w sko\u015Bnych, dach\xF3w p\u0142askich, a tak\u017Ce \u015Bcian zewn\u0119trznych i strop\xF3w." },
      { q: "Jakie s\u0105 korzy\u015Bci z zastosowania warstwy aluminium?", a: "Warstwa aluminium w folii dzia\u0142a jak ekran refleksyjny, odbijaj\u0105c ciep\u0142o z powrotem do pomieszczenia. Zmniejsza to straty ciep\u0142a, przyczyniaj\u0105c si\u0119 do oszcz\u0119dno\u015Bci energii i poprawy komfortu cieplnego w budynku." }
    ],
    seoDescription: "Szukasz skutecznej folii paroizolacyjnej z aluminium do swojego poddasza lub stropu? Foliarex Strotex AL 50 m\xB2 to profesjonalna bariera parowa o bardzo niskiej paroprzepuszczalno\u015Bci (Sd 250 m), kt\xF3ra skutecznie chroni konstrukcj\u0119 przed wilgoci\u0105. Innowacyjna warstwa refleksyjna aluminium znacz\u0105co poprawia bilans energetyczny budynku, odbijaj\u0105c ciep\u0142o do wn\u0119trza. Idealna do izolacji poddaszy u\u017Cytkowych i nieu\u017Cytkowych, dach\xF3w sko\u015Bnych, p\u0142askich, \u015Bcian i strop\xF3w. Wytrzyma\u0142a, \u0142atwa w monta\u017Cu folia budowlana Foliarex Strotex AL zapewni d\u0142ugotrwa\u0142\u0105 ochron\u0119 i komfort."
  },
  {
    id: "p081",
    slug: "farba-wewnetrzna-caparol-amphibolin-10l",
    name: "Farba wewn\u0119trzna bia\u0142a Caparol Amphibolin 10 L",
    categorySlug: "farby-biale",
    brand: "Caparol",
    sku: "CAP-AMPHIBOLIN-10",
    unit: "wiadro 10 L",
    shortDescription: "Wysokiej jako\u015Bci bia\u0142a farba wewn\u0119trzna Caparol Amphibolin 10 L. Klasa 1 odporno\u015Bci na zmywanie, idealna do pomieszcze\u0144 o wysokiej wilgotno\u015Bci.",
    description: "Farba wewn\u0119trzna Caparol Amphibolin w odcieniu czystej bieli to profesjonalne rozwi\u0105zanie do malowania \u015Bcian i sufit\xF3w wewn\u0105trz budynk\xF3w. Charakteryzuje si\u0119 wyj\u0105tkow\u0105 odporno\u015Bci\u0105 na zmywanie i szorowanie, potwierdzon\u0105 klas\u0105 1. Dzi\u0119ki temu idealnie nadaje si\u0119 do pomieszcze\u0144 nara\u017Conych na zabrudzenia i wilgo\u0107, takich jak kuchnie, \u0142azienki czy korytarze. Farba jest \u0142atwa w aplikacji, szybko schnie i tworzy matowe, estetyczne wyko\u0144czenie. Zapewnia doskona\u0142e krycie i d\u0142ugotrwa\u0142\u0105 ochron\u0119 powierzchni. Dost\u0119pna w praktycznym opakowaniu 10 litr\xF3w.",
    application: "Przeznaczona do malowania tynk\xF3w, tapet, betonu oraz p\u0142yt gipsowo-kartonowych wewn\u0105trz pomieszcze\u0144. Nale\u017Cy stosowa\u0107 na czyste, suche i no\u015Bne pod\u0142o\u017Ca. W przypadku chropowatych powierzchni zaleca si\u0119 gruntowanie. Farba mo\u017Ce by\u0107 rozcie\u0144czana wod\u0105 do 5% dla uzyskania optymalnej konsystencji. Stosowa\u0107 w temperaturze od +5\xB0C.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "8\u201310 m\xB2/L" },
      { label: "Rozcie\u0144czenie", value: "do 5% wody" },
      { label: "Czas schni\u0119cia", value: "1\u20132 h" },
      { label: "Odporno\u015B\u0107 na zmywanie", value: "klasa 1" }
    ],
    images: [],
    tags: [
      "farba wewn\u0119trzna",
      "caparol",
      "amphibolin",
      "bia\u0142a",
      "odporna na zmywanie",
      "lateksowa"
    ],
    related: ["p082", "p083", "p089"],
    advantages: [
      "Wyj\u0105tkowa odporno\u015B\u0107 na zmywanie i szorowanie (klasa 1).",
      "Idealna do pomieszcze\u0144 o podwy\u017Cszonej wilgotno\u015Bci i nara\u017Conych na zabrudzenia.",
      "Wysoka wydajno\u015B\u0107 i doskona\u0142e krycie.",
      "Szybkoschn\u0105ca, \u0142atwa w aplikacji farba lateksowa."
    ],
    warnings: [
      "Nie stosowa\u0107 na zewn\u0105trz ani na pod\u0142ogi.",
      "Chroni\u0107 przed mrozem i nadmiernym nagrzewaniem."
    ],
    faq: [
      { q: "Jaka jest klasa odporno\u015Bci na zmywanie farby Caparol Amphibolin?", a: "Farba Caparol Amphibolin posiada klas\u0119 1 odporno\u015Bci na zmywanie i szorowanie, co oznacza najwy\u017Csz\u0105 jako\u015B\u0107 i trwa\u0142o\u015B\u0107 pow\u0142oki malarskiej w warunkach intensywnego u\u017Cytkowania." },
      { q: "Do jakich pomieszcze\u0144 najlepiej nadaje si\u0119 ta farba?", a: "Ze wzgl\u0119du na wysok\u0105 odporno\u015B\u0107 na wilgo\u0107 i zmywanie, farba ta jest idealna do malowania kuchni, \u0142azienek, przedpokoi, a tak\u017Ce pomieszcze\u0144 u\u017Cyteczno\u015Bci publicznej." },
      { q: "Jak przygotowa\u0107 pod\u0142o\u017Ce przed malowaniem?", a: "Pod\u0142o\u017Ce powinno by\u0107 czyste, suche, wolne od kurzu i t\u0142uszczu. Zaleca si\u0119 gruntowanie porowatych powierzchni przed na\u0142o\u017Ceniem farby." }
    ],
    seoDescription: "Szukasz wysokiej jako\u015Bci bia\u0142ej farby wewn\u0119trznej? Postaw na Caparol Amphibolin 10 L! Ta profesjonalna farba lateksowa oferuje klas\u0119 1 odporno\u015Bci na zmywanie, co czyni j\u0105 idealnym wyborem do kuchni, \u0142azienek i korytarzy. Jej wyj\u0105tkowe w\u0142a\u015Bciwo\u015Bci kryj\u0105ce i szybkoschn\u0105ca formu\u0142a zapewniaj\u0105 estetyczne i trwa\u0142e wyko\u0144czenie \u015Bcian. Dost\u0119pna w du\u017Cym opakowaniu 10 litr\xF3w, zapewnia doskona\u0142e pokrycie powierzchni (8-10 m\xB2/L). Zastosuj Caparol Amphibolin, aby cieszy\u0107 si\u0119 czyst\u0105 biel\u0105 odporn\u0105 na codzienne wyzwania. Farba wewn\u0119trzna bia\u0142a, odporna na szorowanie, dla wymagaj\u0105cych u\u017Cytkownik\xF3w."
  },
  {
    id: "p082",
    slug: "farba-wewnetrzna-dulux-easycare-5l",
    name: "Farba lateksowa kolorowa Dulux EasyCare 5 L",
    categorySlug: "farby-kolorowe",
    brand: "Dulux",
    sku: "DUL-EASYCARE-5",
    unit: "wiadro 5 L",
    shortDescription: "Wysokiej jako\u015Bci farba lateksowa Dulux EasyCare 5 L w bogatej palecie kolor\xF3w. Zapewnia doskona\u0142e krycie i odporno\u015B\u0107 na szorowanie, idealna do wn\u0119trz.",
    description: "Odkryj pe\u0142ni\u0119 mo\u017Cliwo\u015Bci dekoracyjnych z farb\u0105 lateksow\u0105 Dulux EasyCare 5 L. Ta innowacyjna farba, dost\u0119pna w szerokiej gamie \u017Cywych i trwa\u0142ych kolor\xF3w, zosta\u0142a stworzona z my\u015Bl\u0105 o Twoim domu. Jej zaawansowana formu\u0142a gwarantuje doskona\u0142e krycie ju\u017C po pierwszej warstwie, a wysoka odporno\u015B\u0107 na szorowanie (klasa 1) sprawia, \u017Ce \u015Bciany pozostan\u0105 nieskazitelne nawet w najbardziej wymagaj\u0105cych pomieszczeniach, takich jak kuchnia czy \u0142azienka. \u0141atwa aplikacja i mo\u017Cliwo\u015B\u0107 rozcie\u0144czenia wod\u0105 u\u0142atwiaj\u0105 malowanie, a szybki czas schni\u0119cia pozwala cieszy\u0107 si\u0119 od\u015Bwie\u017Conym wn\u0119trzem w kr\xF3tkim czasie. Wybierz Dulux EasyCare i stw\xF3rz przestrze\u0144, kt\xF3ra zachwyca kolorem i trwa\u0142o\u015Bci\u0105.",
    application: "Farba przeznaczona do malowania \u015Bcian i sufit\xF3w wewn\u0105trz pomieszcze\u0144 mieszkalnych i u\u017Cyteczno\u015Bci publicznej. Doskonale sprawdza si\u0119 w kuchniach, \u0142azienkach, przedpokojach oraz pokojach dzieci\u0119cych. Na pod\u0142o\u017Ca zagruntowane lub pokryte farb\u0105 podk\u0142adow\u0105. Aplikowa\u0107 w temperaturze powy\u017Cej +5\xB0C, przy wilgotno\u015Bci powietrza poni\u017Cej 75%.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "10\u201312 m\xB2/L na warstw\u0119" },
      { label: "Rozcie\u0144czenie", value: "do 10% wody" },
      { label: "Czas schni\u0119cia", value: "2 h" },
      { label: "Odporno\u015B\u0107", value: "klasa 1 \u2013 wysoka" }
    ],
    images: [],
    tags: [
      "farba kolorowa",
      "dulux",
      "easycare",
      "lateksowa",
      "wn\u0119trze",
      "kuchnia",
      "\u0142azienka"
    ],
    related: ["p081", "p083", "p089"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na szorowanie i zmywanie.",
      "Doskona\u0142e krycie ju\u017C po pierwszej warstwie.",
      "Szeroka gama intensywnych i trwa\u0142ych kolor\xF3w.",
      "\u0141atwa aplikacja i szybkie schni\u0119cie."
    ],
    warnings: [
      "Nie malowa\u0107 w temperaturach poni\u017Cej +5\xB0C.",
      "Unika\u0107 kontaktu z oczami i sk\xF3r\u0105, stosowa\u0107 odpowiednie \u015Brodki ochrony."
    ],
    faq: [
      { q: "Jaka jest wydajno\u015B\u0107 farby Dulux EasyCare 5 L?", a: "Wydajno\u015B\u0107 farby wynosi od 10 do 12 m\xB2 na litr przy jednej warstwie, w zale\u017Cno\u015Bci od ch\u0142onno\u015Bci i struktury pod\u0142o\u017Ca." },
      { q: "Czy farb\u0119 mo\u017Cna rozcie\u0144cza\u0107?", a: "Tak, farb\u0119 mo\u017Cna rozcie\u0144czy\u0107 niewielk\u0105 ilo\u015Bci\u0105 wody (do 10%) w celu uzyskania optymalnej konsystencji podczas malowania." },
      { q: "Jakie pomieszczenia najlepiej nadaj\u0105 si\u0119 do malowania farb\u0105 Dulux EasyCare?", a: "Dzi\u0119ki wysokiej odporno\u015Bci na szorowanie, farba ta jest idealna do kuchni, \u0142azienek, przedpokoi, pokoj\xF3w dzieci\u0119cych oraz innych miejsc nara\u017Conych na zabrudzenia i intensywne u\u017Cytkowanie." }
    ],
    seoDescription: "Szukasz trwa\u0142ej i \u0142atwej w aplikacji farby kolorowej do wn\u0119trz? Dulux EasyCare 5 L w odcieniu [nazwa koloru] to idealny wyb\xF3r. Ta wysokiej jako\u015Bci farba lateksowa charakteryzuje si\u0119 klas\u0105 1 odporno\u015Bci na szorowanie, co oznacza, \u017Ce mo\u017Cesz j\u0105 bez obaw my\u0107 i zmywa\u0107. Zapewnia doskona\u0142e krycie, redukuj\u0105c potrzeb\u0119 malowania wielu warstw. Idealna do kuchni, \u0142azienek, pokoj\xF3w dzieci\u0119cych i wsz\u0119dzie tam, gdzie liczy si\u0119 odporno\u015B\u0107 na zabrudzenia. \u0141atwo\u015B\u0107 aplikacji i szybkie schni\u0119cie sprawi\u0105, \u017Ce od\u015Bwie\u017Cenie wn\u0119trza b\u0119dzie przyjemno\u015Bci\u0105. Odkryj bogat\u0105 palet\u0119 kolor\xF3w Dulux EasyCare i stw\xF3rz wymarzon\u0105 przestrze\u0144."
  },
  {
    id: "p083",
    slug: "farba-elewacyjna-silikonowa-caparol-amphisilan-10l",
    name: "Farba elewacyjna silikonowa Caparol AmphiSilan 10 L",
    categorySlug: "farby-elaw-silikonowe",
    brand: "Caparol",
    sku: "CAP-AMPH-SIL-FAR-10",
    unit: "wiadro 10 L",
    shortDescription: "Wytrzyma\u0142a farba elewacyjna silikonowa Caparol AmphiSilan 10 L. Charakteryzuje si\u0119 bardzo wysok\u0105 odporno\u015Bci\u0105 na brud i dobr\u0105 odporno\u015Bci\u0105 na warunki atmosferyczne, zapewniaj\u0105c d\u0142ugotrwa\u0142\u0105 ochron\u0119 fasady.",
    description: "Caparol AmphiSilan 10 L to wysokiej jako\u015Bci farba elewacyjna na bazie \u017Cywicy silikonowej, idealna do ochrony i dekoracji zewn\u0119trznych powierzchni budynk\xF3w. Dzi\u0119ki unikalnej technologii, farba ta wykazuje bardzo wysok\u0105 odporno\u015B\u0107 na zabrudzenia, co sprawia, \u017Ce fasady na d\u0142ugo zachowuj\u0105 sw\xF3j estetyczny wygl\u0105d. Jest wysoce paroprzepuszczalna i hydrofobowa, co skutecznie chroni budynek przed wilgoci\u0105 i jednocze\u015Bnie pozwala \u015Bcianom 'oddycha\u0107'. Doskona\u0142a przyczepno\u015B\u0107 i \u0142atwo\u015B\u0107 aplikacji sprawiaj\u0105, \u017Ce jest to wyb\xF3r profesjonalist\xF3w, a klasa ogniowa A zapewnia dodatkowe bezpiecze\u0144stwo. Idealna na nowe i renowacyjne pod\u0142o\u017Ca.",
    application: "Przeznaczona do malowania zewn\u0119trznych powierzchni budynk\xF3w, takich jak tynki mineralne, stare pow\u0142oki farb, beton, p\u0142yty cementowo-w\u0142\xF3knowe. Stosowa\u0107 na suche i czyste pod\u0142o\u017Ca, wolne od kurzu i lu\u017Anych element\xF3w. Zalecana temperatura aplikacji powy\u017Cej +5\xB0C. Farba jest odporna na trudne warunki atmosferyczne, deszcz i promieniowanie UV.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "6\u20138 m\xB2/L" },
      { label: "Czas schni\u0119cia", value: "2\u20134 h" },
      { label: "Odporno\u015B\u0107 na brud", value: "bardzo wysoka" },
      { label: "Klasa ogniowa", value: "A" }
    ],
    images: [],
    tags: [
      "farba elewacyjna",
      "caparol",
      "amphisilan",
      "silikonowa",
      "elewacja",
      "samoczyszcz\u0105ca"
    ],
    related: ["p081", "p051", "p084"],
    advantages: [
      "Bardzo wysoka odporno\u015B\u0107 na zabrudzenia i czynniki atmosferyczne.",
      "Doskona\u0142a paroprzepuszczalno\u015B\u0107 i hydrofobowo\u015B\u0107.",
      "D\u0142ugotrwa\u0142a ochrona i estetyczny wygl\u0105d fasady.",
      "\u0141atwo\u015B\u0107 aplikacji i dobra przyczepno\u015B\u0107 do pod\u0142o\u017Cy."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +5\xB0C oraz przy wysokiej wilgotno\u015Bci powietrza.",
      "Chroni\u0107 przed zamarzni\u0119ciem podczas przechowywania i transportu."
    ],
    faq: [
      { q: "Jaka jest wydajno\u015B\u0107 farby Caparol AmphiSilan 10 L?", a: "Wydajno\u015B\u0107 farby wynosi oko\u0142o 6-8 m\xB2 na litr, w zale\u017Cno\u015Bci od ch\u0142onno\u015Bci i struktury pod\u0142o\u017Ca. Zaleca si\u0119 wykonanie pr\xF3by na ma\u0142ej powierzchni, aby dok\u0142adnie okre\u015Bli\u0107 potrzebn\u0105 ilo\u015B\u0107." },
      { q: "Jak przygotowa\u0107 pod\u0142o\u017Ce przed malowaniem?", a: "Pod\u0142o\u017Ce musi by\u0107 suche, czyste, wolne od kurzu, lu\u017Anych cz\u0105stek oraz t\u0142uszczu. W razie potrzeby nale\u017Cy je zagruntowa\u0107 odpowiednim preparatem dedykowanym do system\xF3w elewacyjnych." },
      { q: "Czy farba AmphiSilan jest odporna na ple\u015B\u0144 i algi?", a: "Tak, dzi\u0119ki swoim w\u0142a\u015Bciwo\u015Bciom hydrofobowym i silikonowej bazie, farba ta charakteryzuje si\u0119 zwi\u0119kszon\u0105 odporno\u015Bci\u0105 na rozw\xF3j glon\xF3w i grzyb\xF3w na powierzchni fasady." }
    ],
    seoDescription: "Szukasz trwa\u0142ej i samoczyszcz\u0105cej farby elewacyjnej? Caparol AmphiSilan 10 L to innowacyjna farba silikonowa, kt\xF3ra zapewni Twojej fasadzie d\u0142ugotrwa\u0142\u0105 ochron\u0119 przed zabrudzeniami i warunkami atmosferycznymi. W\u0142a\u015Bciwo\u015Bci hydrofobowe i wysoka paroprzepuszczalno\u015B\u0107 sprawiaj\u0105, \u017Ce budynek jest chroniony przed wilgoci\u0105, a \u015Bciany mog\u0105 swobodnie oddycha\u0107. Idealna do malowania zewn\u0119trznych tynk\xF3w, betonu i starych pow\u0142ok. Sprawd\u017A wysok\u0105 jako\u015B\u0107 Caparol i d\u0142ugotrwa\u0142y efekt estetyczny. Klasa ogniowa A gwarantuje bezpiecze\u0144stwo. Kup teraz farb\u0119 elewacyjn\u0105 silikonow\u0105 Caparol AmphiSilan."
  },
  {
    id: "p084",
    slug: "farba-elewacyjna-atlas-fasada-eko-10l",
    name: "Farba elewacyjna emulsyjna Atlas Fasada EKO 10 L",
    categorySlug: "farby-elaw-emulsyjne",
    brand: "Atlas",
    sku: "ATL-FASADA-EKO-10",
    unit: "wiadro 10 L",
    shortDescription: "Farba elewacyjna emulsyjna Atlas Fasada EKO 10 L to ekologiczne i paroprzepuszczalne rozwi\u0105zanie do malowania fasad. Zapewnia trwa\u0142o\u015B\u0107 i estetyk\u0119.",
    description: 'Farba elewacyjna emulsyjna Atlas Fasada EKO w opakowaniu 10 L to nowoczesny produkt stworzony z my\u015Bl\u0105 o d\u0142ugotrwa\u0142ej ochronie i estetycznym wyko\u0144czeniu fasad budynk\xF3w. Jej wysoka paroprzepuszczalno\u015B\u0107 pozwala \u015Bcianom "oddycha\u0107", skutecznie odprowadzaj\u0105c wilgo\u0107 z wn\u0119trza, co zapobiega powstawaniu ple\u015Bni i grzyb\xF3w. Farba jest \u0142atwa w aplikacji, zapewnia dobre krycie i r\xF3wnomierne pokrycie powierzchni. Dost\u0119pna w szerokiej gamie kolor\xF3w, pozwala na realizacj\u0119 r\xF3\u017Cnorodnych projekt\xF3w architektonicznych. Jest odporna na warunki atmosferyczne, co gwarantuje d\u0142ugowieczno\u015B\u0107 pow\u0142oki malarskiej. Idealna do malowania tynk\xF3w cementowych, cementowo-wapiennych, akrylowych oraz beton\xF3w.',
    application: "Stosuj na czyste, suche i stabilne pod\u0142o\u017Ca budowlane, takie jak tynki cementowe, cementowo-wapienne, akrylowe, beton. Przed malowaniem upewnij si\u0119, \u017Ce pod\u0142o\u017Ce jest wolne od zanieczyszcze\u0144, lu\u017Anych fragment\xF3w i t\u0142uszczu. Optymalne warunki aplikacji to temperatura od +5\xB0C do +30\xB0C, przy wilgotno\u015Bci powietrza poni\u017Cej 75%.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "7\u20139 m\xB2/L" },
      { label: "Czas schni\u0119cia", value: "2\u20134 h" },
      { label: "Paroprzepuszczalno\u015B\u0107", value: "wysoka" },
      { label: "pH gotowej farby", value: "8\u20139" }
    ],
    images: [],
    tags: [
      "farba elewacyjna",
      "atlas",
      "fasada eko",
      "emulsyjna",
      "elewacja",
      "paroprzepuszczalna"
    ],
    related: ["p083", "p085", "p051"],
    advantages: [
      "Wysoka paroprzepuszczalno\u015B\u0107 zapobiega gromadzeniu si\u0119 wilgoci.",
      "Doskona\u0142e krycie i trwa\u0142o\u015B\u0107 koloru przez lata.",
      "Odporna na zmienne warunki atmosferyczne i promieniowanie UV.",
      "Ekologiczny sk\u0142ad, bezpieczny dla \u015Brodowiska i u\u017Cytkownik\xF3w."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +5\xB0C i powy\u017Cej +30\xB0C.",
      "Unika\u0107 malowania w bezpo\u015Brednim nas\u0142onecznieniu i podczas deszczu."
    ],
    faq: [
      { q: "Jaka jest wydajno\u015B\u0107 farby Atlas Fasada EKO?", a: "Wydajno\u015B\u0107 farby wynosi od 7 do 9 m\xB2 na litr, w zale\u017Cno\u015Bci od ch\u0142onno\u015Bci i struktury pod\u0142o\u017Ca oraz grubo\u015Bci na\u0142o\u017Conej warstwy." },
      { q: "Jak d\u0142ugo schnie farba Atlas Fasada EKO?", a: "Czas schni\u0119cia pow\u0142oki wynosi od 2 do 4 godzin, umo\u017Cliwiaj\u0105c szybkie przej\u015Bcie do kolejnego etapu prac." },
      { q: "Czy farba nadaje si\u0119 na stare pow\u0142oki malarskie?", a: "Tak, pod warunkiem, \u017Ce stare pow\u0142oki s\u0105 dobrze przyczepne do pod\u0142o\u017Ca. Nale\u017Cy je oczy\u015Bci\u0107 i w razie potrzeby zagruntowa\u0107 odpowiednim preparatem." }
    ],
    seoDescription: "Szukasz trwa\u0142ej i ekologicznej farby elewacyjnej? Atlas Fasada EKO 10 L to emulsyjna farba fasadowa o wysokiej paroprzepuszczalno\u015Bci. Idealna do malowania tynk\xF3w, betonu i akrylowych powierzchni zewn\u0119trznych. Zapewnia doskona\u0142e krycie i ochron\u0119 przed warunkami atmosferycznymi. Sprawd\u017A wydajno\u015B\u0107 i czas schni\u0119cia tej wysokiej jako\u015Bci farby elewacyjnej. Idealne rozwi\u0105zanie dla nowoczesnych elewacji, kt\xF3re dbaj\u0105 o \u015Brodowisko. Kup teraz farb\u0119 Atlas Fasada EKO i ciesz si\u0119 pi\u0119knym wygl\u0105dem swojego domu przez lata."
  },
  {
    id: "p085",
    slug: "farba-elewacyjna-akrylowa-bolix-a-10l",
    name: "Farba elewacyjna akrylowa Bolix A 10 L",
    categorySlug: "farby-elaw-akrylowe",
    brand: "Bolix",
    sku: "BOL-A-10",
    unit: "wiadro 10 L",
    shortDescription: "Trwa\u0142a farba elewacyjna akrylowa Bolix A 10 L. Zapewnia doskona\u0142\u0105 ochron\u0119 i estetyczny wygl\u0105d elewacji na lata. Odporna na warunki atmosferyczne.",
    description: "Farba elewacyjna akrylowa Bolix A o pojemno\u015Bci 10 litr\xF3w to wysokiej jako\u015Bci produkt przeznaczony do malowania zewn\u0119trznych \u015Bcian budynk\xF3w. Jej formu\u0142a oparta na \u017Cywicach akrylowych gwarantuje doskona\u0142\u0105 przyczepno\u015B\u0107 do r\xF3\u017Cnorodnych pod\u0142o\u017Cy, takich jak tynki cementowe, cementowo-wapienne, akrylowe czy beton. Farba cechuje si\u0119 wyj\u0105tkow\u0105 odporno\u015Bci\u0105 na zmienne warunki atmosferyczne, promieniowanie UV oraz wilgo\u0107, co przek\u0142ada si\u0119 na d\u0142ugotrwa\u0142\u0105 ochron\u0119 elewacji. Jasna kolorystyka i drobna granulacja (< 0,1 mm) pozwalaj\u0105 uzyska\u0107 g\u0142adkie, jednolite wyko\u0144czenie. Farba jest \u0142atwa w aplikacji, szybko schnie i jest odporna na mr\xF3z do -15\xB0C. Idealna do renowacji i ochrony fasad.",
    application: "Produkt przeznaczony jest do malowania pod\u0142o\u017Cy mineralnych (tynk\xF3w cementowych, cementowo-wapiennych, betonu) oraz starej farby elewacyjnej. Nale\u017Cy aplikowa\u0107 na suche, czyste i zagruntowane pod\u0142o\u017Ce, w temperaturze od +5\xB0C do +25\xB0C. Unika\u0107 malowania w pe\u0142nym s\u0142o\u0144cu, podczas silnego wiatru oraz deszczu. Zaleca si\u0119 stosowanie na fasadach budynk\xF3w mieszkalnych, us\u0142ugowych i przemys\u0142owych.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "6\u20138 m\xB2/L" },
      { label: "Czas schni\u0119cia", value: "2\u20134 h" },
      { label: "Odporno\u015B\u0107 na mr\xF3z", value: "do -15\xB0C" },
      { label: "Granulacja", value: "< 0,1 mm" }
    ],
    images: [],
    tags: [
      "farba elewacyjna",
      "bolix",
      "akrylowa",
      "elewacja",
      "mrozoodporna",
      "kolorowa"
    ],
    related: ["p083", "p084", "p051"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na czynniki atmosferyczne i promieniowanie UV.",
      "Doskona\u0142a przyczepno\u015B\u0107 do pod\u0142o\u017Cy mineralnych i akrylowych.",
      "Szybki czas schni\u0119cia i \u0142atwo\u015B\u0107 aplikacji.",
      "Estetyczne, jednolite wyko\u0144czenie elewacji."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +5\xB0C i powy\u017Cej +25\xB0C.",
      "Chroni\u0107 przed mrozem w transporcie i przechowywaniu."
    ],
    faq: [
      { q: "Jakie pod\u0142o\u017Ca nadaj\u0105 si\u0119 do malowania farb\u0105 Bolix A?", a: "Farba Bolix A nadaje si\u0119 do malowania pod\u0142o\u017Cy mineralnych, takich jak tynki cementowe, cementowo-wapienne, beton, a tak\u017Ce na istniej\u0105ce pow\u0142oki farb elewacyjnych, pod warunkiem ich dobrej przyczepno\u015Bci." },
      { q: "Jaka jest wydajno\u015B\u0107 farby Bolix A 10 L?", a: "Wydajno\u015B\u0107 farby wynosi od 6 do 8 m\xB2 z jednego litra, w zale\u017Cno\u015Bci od ch\u0142onno\u015Bci i struktury pod\u0142o\u017Ca oraz zastosowanej metody malowania." },
      { q: "Czy farba jest odporna na mr\xF3z?", a: "Tak, farba Bolix A jest odporna na mr\xF3z do temperatury -15\xB0C, co zapewnia jej trwa\u0142o\u015B\u0107 w warunkach zimowych po aplikacji." }
    ],
    seoDescription: "Szukasz wysokiej jako\u015Bci farby elewacyjnej akrylowej? Wybierz Bolix A 10 L! Ta mrozoodporna farba elewacyjna od renomowanej marki Bolix zapewnia d\u0142ugotrwa\u0142\u0105 ochron\u0119 i pi\u0119kny wygl\u0105d Twojej fasady. Idealna do malowania tynk\xF3w cementowych, betonowych i akrylowych. Oferujemy szerok\u0105 gam\u0119 kolor\xF3w. Sprawd\u017A wydajno\u015B\u0107 i czas schni\u0119cia farby akrylowej Bolix. Zastosuj nasze profesjonalne farby elewacyjne dla najlepszych rezultat\xF3w. Kup teraz farb\u0119 elewacyjn\u0105 Bolix A i zadbaj o trwa\u0142o\u015B\u0107 swojej elewacji."
  },
  {
    id: "p086",
    slug: "farba-elewacyjna-silikatowa-caparol-muresko-10l",
    name: "Farba elewacyjna silikatowa Caparol Muresko 10 L",
    categorySlug: "farby-elaw-silikatowe",
    brand: "Caparol",
    sku: "CAP-MURESKO-10",
    unit: "wiadro 10 L",
    shortDescription: "Wysokiej jako\u015Bci farba elewacyjna silikatowa Caparol Muresko 10 L, zapewniaj\u0105ca trwa\u0142\u0105 ochron\u0119 i estetyk\u0119 elewacji. Doskona\u0142a paroprzepuszczalno\u015B\u0107 i odporno\u015B\u0107 na warunki atmosferyczne.",
    description: 'Caparol Muresko to innowacyjna farba elewacyjna na bazie krzemian\xF3w, idealna do malowania tynk\xF3w zewn\u0119trznych. Charakteryzuje si\u0119 wyj\u0105tkowo wysok\u0105 paroprzepuszczalno\u015Bci\u0105 (V1), co pozwala \u015Bcianom "oddycha\u0107", zapobiegaj\u0105c gromadzeniu si\u0119 wilgoci i powstawaniu grzyb\xF3w. Farba silikatowa Muresko jest niezwykle trwa\u0142a, odporna na \u015Bcieranie i warunki atmosferyczne, co gwarantuje d\u0142ugotrwa\u0142y efekt estetyczny. \u0141atwa w aplikacji i szybkoschn\u0105ca, z czasem schni\u0119cia wynosz\u0105cym 4-6 godzin. Wydajno\u015B\u0107 farby wynosi 5-7 m\xB2/L, co czyni j\u0105 ekonomicznym wyborem dla profesjonalist\xF3w i majsterkowicz\xF3w. Wybierz Caparol Muresko dla pi\u0119knej i zdrowej elewacji na lata.',
    application: "Farba Caparol Muresko przeznaczona jest do malowania stabilnych tynk\xF3w zewn\u0119trznych, takich jak tynki wapienno-cementowe, mineralne oraz starych pow\u0142ok dyspersyjnych, kt\xF3re s\u0105 no\u015Bne. Nale\u017Cy aplikowa\u0107 na suche, czyste i odt\u0142uszczone pod\u0142o\u017Ce, wolne od lu\u017Anych cz\u0105stek. Temperatura stosowania powinna wynosi\u0107 powy\u017Cej +5\xB0C. Unika\u0107 aplikacji w bezpo\u015Brednim nas\u0142onecznieniu oraz podczas deszczu.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "5\u20137 m\xB2/L" },
      { label: "Czas schni\u0119cia", value: "4\u20136 h" },
      { label: "Paroprzepuszczalno\u015B\u0107", value: "bardzo wysoka (V1)" },
      { label: "pH", value: "> 11" }
    ],
    images: [],
    tags: [
      "farba silikatowa",
      "caparol",
      "muresko",
      "elewacja",
      "paroprzepuszczalna",
      "krzemianowa"
    ],
    related: ["p083", "p085", "p051"],
    advantages: [
      "Bardzo wysoka paroprzepuszczalno\u015B\u0107 (V1) zapobiega gromadzeniu si\u0119 wilgoci.",
      "Wyj\u0105tkowa trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na warunki atmosferyczne.",
      "Naturalne, krzemianowe spoiwo gwarantuje ekologiczne i zdrowe rozwi\u0105zanie.",
      "Szybki czas schni\u0119cia pozwala na efektywne wykonanie prac elewacyjnych."
    ],
    warnings: [
      "Nie stosowa\u0107 na pod\u0142o\u017Cach niestabilnych, pyl\u0105cych lub zagrzybionych.",
      "Chroni\u0107 przed mrozem podczas przechowywania i transportu."
    ],
    faq: [
      { q: "Jaka jest g\u0142\xF3wna zaleta farby silikatowej Caparol Muresko?", a: "G\u0142\xF3wn\u0105 zalet\u0105 jest bardzo wysoka paroprzepuszczalno\u015B\u0107 (V1), kt\xF3ra umo\u017Cliwia swobodne oddychanie \u015Bcian i zapobiega gromadzeniu si\u0119 wilgoci, co jest kluczowe dla zdrowia budynku." },
      { q: "Na jakich rodzajach tynk\xF3w mo\u017Cna stosowa\u0107 farb\u0119 Muresko?", a: "Farba Muresko jest idealna do malowania stabilnych tynk\xF3w zewn\u0119trznych, w tym wapienno-cementowych, mineralnych oraz starych, no\u015Bnych pow\u0142ok dyspersyjnych." },
      { q: "Jaka jest wydajno\u015B\u0107 farby elewacyjnej Caparol Muresko?", a: "Wydajno\u015B\u0107 farby wynosi oko\u0142o 5-7 m\xB2 na litr, co czyni j\u0105 ekonomicznym rozwi\u0105zaniem przy malowaniu du\u017Cych powierzchni elewacyjnych." }
    ],
    seoDescription: 'Szukasz trwa\u0142ej i paroprzepuszczalnej farby elewacyjnej? Caparol Muresko 10 L to wysokiej jako\u015Bci farba silikatowa, kt\xF3ra zapewni Twojej elewacji ochron\u0119 i estetyk\u0119 na lata. Dzi\u0119ki bardzo wysokiej paroprzepuszczalno\u015Bci (V1) \u015Bciany "oddychaj\u0105", a Ty unikasz problem\xF3w z wilgoci\u0105. Idealna na tynki mineralne i wapienno-cementowe. Szybkoschn\u0105ca (4-6h) i wydajna (5-7 m\xB2/L). Odkryj pe\u0142n\u0105 gam\u0119 kolor\xF3w i ciesz si\u0119 pi\u0119kn\u0105 elewacj\u0105. Kup teraz farb\u0119 krzemianow\u0105 Caparol Muresko, najlepsz\u0105 do ochrony Twojego domu przed warunkami atmosferycznymi.'
  },
  {
    id: "p087",
    slug: "lakier-drewno-sadolin-classic-5l",
    name: "Lakier do drewna zewn\u0119trznego Sadolin Classic 5 L",
    categorySlug: "lakiery-drewno",
    brand: "Sadolin",
    sku: "SAD-CLASSIC-5",
    unit: "wiadro 5 L",
    shortDescription: "Wysokiej jako\u015Bci lakier do drewna zewn\u0119trznego Sadolin Classic 5L zapewnia doskona\u0142\u0105 ochron\u0119 przed UV i warunkami atmosferycznymi, nadaj\u0105c drewnu elegancki wygl\u0105d.",
    description: "Sadolin Classic to nowoczesny, wodorozcie\u0144czalny lakier przeznaczony do ochrony i dekoracji drewna na zewn\u0105trz. Jego zaawansowana formu\u0142a gwarantuje wyj\u0105tkow\u0105 odporno\u015B\u0107 na promieniowanie UV, wilgo\u0107 i zmienne warunki pogodowe, zapobiegaj\u0105c szarzeniu i p\u0119kaniu drewna. Lakier tworzy trwa\u0142\u0105, elastyczn\u0105 pow\u0142ok\u0119, kt\xF3ra podkre\u015Bla naturalne pi\u0119kno drewna, jednocze\u015Bnie zapewniaj\u0105c d\u0142ugotrwa\u0142\u0105 ochron\u0119. Idealny do malowania elewacji drewnianych, altan, mebli ogrodowych i innych element\xF3w nara\u017Conych na dzia\u0142anie czynnik\xF3w zewn\u0119trznych. Wysoka wydajno\u015B\u0107 i \u0142atwo\u015B\u0107 aplikacji sprawiaj\u0105, \u017Ce jest to doskona\u0142y wyb\xF3r dla profesjonalist\xF3w i amator\xF3w.",
    application: "Stosowa\u0107 na czyste, suche i odt\u0142uszczone pod\u0142o\u017Ca drewniane. Przed malowaniem zaleca si\u0119 przeszlifowanie powierzchni i usuni\u0119cie py\u0142u. Lakier mo\u017Cna aplikowa\u0107 za pomoc\u0105 p\u0119dzla, wa\u0142ka lub natrysku. Dopuszcza si\u0119 rozcie\u0144czenie wod\u0105 w niewielkiej ilo\u015Bci w celu uzyskania odpowiedniej konsystencji. Malowa\u0107 w temperaturze od +5\xB0C do +25\xB0C, unikaj\u0105c bezpo\u015Bredniego nas\u0142onecznienia i silnego wiatru.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "10\u201312 m\xB2/L" },
      { label: "Rozcie\u0144czalnik", value: "woda" },
      { label: "Czas schni\u0119cia", value: "2\u20134 h" },
      { label: "Odporno\u015B\u0107 UV", value: "wysoka" }
    ],
    images: [],
    tags: [
      "lakier do drewna",
      "sadolin",
      "classic",
      "zewn\u0119trzny",
      "ochrona UV",
      "drewno",
      "impregnacja"
    ],
    related: ["p088", "p089", "p090"],
    advantages: [
      "Doskona\u0142a ochrona przed promieniowaniem UV i warunkami atmosferycznymi.",
      "Tworzy trwa\u0142\u0105 i elastyczn\u0105 pow\u0142ok\u0119 ochronno-dekoracyjn\u0105.",
      "Podkre\u015Bla naturalne pi\u0119kno drewna, nadaj\u0105c mu elegancki wygl\u0105d.",
      "\u0141atwa aplikacja i szybki czas schni\u0119cia, mo\u017Cliwo\u015B\u0107 rozcie\u0144czenia wod\u0105."
    ],
    warnings: [
      "Nie stosowa\u0107 w wilgotnych warunkach, podczas deszczu lub przy silnym wietrze.",
      "Przed u\u017Cyciem zapozna\u0107 si\u0119 z kart\u0105 techniczn\u0105 produktu."
    ],
    faq: [
      { q: "Jak przygotowa\u0107 drewno przed malowaniem lakierem Sadolin Classic?", a: "Drewno powinno by\u0107 czyste, suche, odt\u0142uszczone i pozbawione lu\u017Anych element\xF3w. Zaleca si\u0119 przeszlifowanie powierzchni i usuni\u0119cie py\u0142u po szlifowaniu." },
      { q: "Czy lakier Sadolin Classic mo\u017Cna rozcie\u0144cza\u0107?", a: "Tak, lakier mo\u017Cna rozcie\u0144cza\u0107 wod\u0105, ale nale\u017Cy to robi\u0107 w niewielkiej ilo\u015Bci, aby uzyska\u0107 odpowiedni\u0105 konsystencj\u0119 do aplikacji." },
      { q: "Jak d\u0142ugo schnie lakier Sadolin Classic?", a: "Czas schni\u0119cia pow\u0142oki lakierniczej wynosi zazwyczaj od 2 do 4 godzin, w zale\u017Cno\u015Bci od warunk\xF3w atmosferycznych (temperatury i wilgotno\u015Bci powietrza)." }
    ],
    seoDescription: "Szukasz skutecznego lakieru do drewna zewn\u0119trznego? Sadolin Classic 5L to Tw\xF3j wyb\xF3r! Ten wodorozcie\u0144czalny lakier zapewnia niezawodn\u0105 ochron\u0119 drewna na lata przed szkodliwym dzia\u0142aniem promieniowania UV, deszczu i mrozu. Idealny do malowania elewacji, mebli ogrodowych, altan i p\u0142ot\xF3w. Wysoka odporno\u015B\u0107 UV i szybkie schni\u0119cie to cechy, kt\xF3re doceni ka\u017Cdy. Podkre\u015Bl naturalne pi\u0119kno swojego drewna z lakierem Sadolin Classic. Kup teraz i ciesz si\u0119 trwa\u0142ym zabezpieczeniem!"
  },
  {
    id: "p088",
    slug: "lakierobejca-cetol-hls-sikkens-5l",
    name: "Lakierobejca Cetol HLS+ Sikkens 5 L",
    categorySlug: "lakierobejce",
    brand: "Sikkens",
    sku: "SIK-CETOL-HLS-5",
    unit: "wiadro 5 L",
    shortDescription: "Lakierobejca Cetol HLS+ Sikkens 5 L to wysokiej jako\u015Bci impregnat ochronno-dekoracyjny do drewna na zewn\u0105trz. Zapewnia doskona\u0142\u0105 ochron\u0119 przed promieniowaniem UV i wilgoci\u0105.",
    description: "Cetol HLS+ marki Sikkens to profesjonalna lakierobejca, kt\xF3ra skutecznie chroni drewno przed szkodliwymi czynnikami atmosferycznymi. Dzi\u0119ki zawarto\u015Bci filtra UV, zapobiega szarzeniu i degradacji drewna pod wp\u0142ywem s\u0142o\u0144ca. Produkt g\u0142\u0119boko penetruje struktur\u0119 drewna, impregnuj\u0105c je i nadaj\u0105c mu trwa\u0142y, estetyczny kolor. Idealnie nadaje si\u0119 do malowania elewacji drewnianych, ogrodze\u0144, altan, mebli ogrodowych oraz innych element\xF3w nara\u017Conych na dzia\u0142anie wilgoci i promieniowania UV. \u0141atwa aplikacja zapewnia r\xF3wnomierne krycie i d\u0142ugotrwa\u0142y efekt.",
    application: "Stosowa\u0107 na suche, czyste i odt\u0142uszczone pod\u0142o\u017Ca drewniane na zewn\u0105trz. Przed u\u017Cyciem dok\u0142adnie wymiesza\u0107. Aplikowa\u0107 za pomoc\u0105 p\u0119dzla, wa\u0142ka lub natrysku w temperaturze powy\u017Cej 5\xB0C. Zaleca si\u0119 na\u0142o\u017Cenie 2-3 cienkich warstw dla najlepszej ochrony i estetyki. Unika\u0107 aplikacji w pe\u0142nym s\u0142o\u0144cu i podczas deszczu.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "8\u201312 m\xB2/L" },
      { label: "Rozcie\u0144czalnik", value: "specjalny" },
      { label: "Czas schni\u0119cia", value: "8 h" },
      { label: "Filtr UV", value: "TAK" }
    ],
    images: [],
    tags: [
      "lakierobejca",
      "sikkens",
      "cetol hls",
      "drewno",
      "elewacja",
      "UV",
      "impregnacja barwi\u0105ca"
    ],
    related: ["p087", "p089", "p090"],
    advantages: [
      "Skuteczna ochrona drewna przed UV i wilgoci\u0105.",
      "G\u0142\u0119boka penetracja i impregnacja struktury drewna.",
      "D\u0142ugotrwa\u0142y efekt estetyczny i dekoracyjny.",
      "\u0141atwa aplikacja i szybkie schni\u0119cie."
    ],
    warnings: [
      "Nie stosowa\u0107 na powierzchnie maj\u0105ce kontakt z \u017Cywno\u015Bci\u0105.",
      "Przechowywa\u0107 w miejscu niedost\u0119pnym dla dzieci, w szczelnie zamkni\u0119tym opakowaniu."
    ],
    faq: [
      { q: "Jak przygotowa\u0107 drewno przed malowaniem lakierobejc\u0105 Cetol HLS+?", a: "Drewno powinno by\u0107 suche, czyste, wolne od kurzu, t\u0142uszczu i starych pow\u0142ok. W razie potrzeby nale\u017Cy je przeszlifowa\u0107 i odpyli\u0107." },
      { q: "Jaka jest wydajno\u015B\u0107 lakierobejcy Cetol HLS+?", a: "Wydajno\u015B\u0107 wynosi od 8 do 12 m\xB2 na litr, w zale\u017Cno\u015Bci od ch\u0142onno\u015Bci i rodzaju drewna." },
      { q: "Czy lakierobejca Cetol HLS+ nadaje si\u0119 do malowania drewna wewn\u0105trz pomieszcze\u0144?", a: "Produkt jest przeznaczony g\u0142\xF3wnie do zastosowa\u0144 zewn\u0119trznych. Do wn\u0119trz zaleca si\u0119 stosowanie dedykowanych lakierobejc." }
    ],
    seoDescription: "Szukasz skutecznej ochrony drewna na zewn\u0105trz? Wybierz lakierobejc\u0119 Cetol HLS+ marki Sikkens w opakowaniu 5 L. Ta zaawansowana impregnacja barwi\u0105ca z filtrem UV zabezpiecza drewno elewacyjne, ogrodzenia, meble ogrodowe i altany przed szarzeniem, wilgoci\u0105 i promieniowaniem s\u0142onecznym. Cetol HLS+ Sikkens zapewnia g\u0142\u0119bok\u0105 penetracj\u0119, d\u0142ugotrwa\u0142y kolor i estetyczny wygl\u0105d. Idealna do ochrony drewna na lata. Sprawd\u017A wydajno\u015B\u0107 8-12 m\xB2/L i \u0142atwo\u015B\u0107 aplikacji. Postaw na jako\u015B\u0107 Sikkens \u2013 profesjonalne rozwi\u0105zania dla Twojego domu."
  },
  {
    id: "p089",
    slug: "impregnat-drewno-remmers-wb-eco-10l",
    name: "Impregnat do drewna Remmers WB ECO 10 L",
    categorySlug: "impregnaty-drewno",
    brand: "Remmers",
    sku: "REM-WB-ECO-10",
    unit: "wiadro 10 L",
    shortDescription: "Impregnat Remmers WB ECO 10L to wodny, ekologiczny preparat ochronny do drewna. Skutecznie zabezpiecza przed grzybami, owadami i wilgoci\u0105, zapewniaj\u0105c d\u0142ugotrwa\u0142\u0105 ochron\u0119.",
    description: "Remmers WB ECO 10L to nowoczesny, ekologiczny impregnat do drewna na bazie wody, przeznaczony do kompleksowej ochrony r\xF3\u017Cnego rodzaju powierzchni drewnianych. Jego innowacyjna formu\u0142a, wolna od szkodliwych rozpuszczalnik\xF3w organicznych, zapewnia skuteczn\u0105 barier\u0119 ochronn\u0105 przed czynnikami biologicznymi, takimi jak grzyby oraz szkodniki \u017Ceruj\u0105ce w drewnie (owady). Dodatkowo, impregnat chroni drewno przed szkodliwym dzia\u0142aniem wilgoci, zapobiegaj\u0105c p\u0119cznieniu, kurczeniu si\u0119 i p\u0119kaniu materia\u0142u. WB ECO jest idealnym wyborem dla os\xF3b ceni\u0105cych sobie bezpiecze\u0144stwo i ekologi\u0119, a jednocze\u015Bnie wymagaj\u0105cych najwy\u017Cszej jako\u015Bci ochrony dla swoich drewnianych element\xF3w.",
    application: "Impregnat Remmers WB ECO 10L przeznaczony jest do stosowania na wszystkich rodzajach drewna budowlanego i konstrukcyjnego, zar\xF3wno wewn\u0105trz, jak i na zewn\u0105trz budynk\xF3w. Mo\u017Ce by\u0107 aplikowany na drewno lite, klejone, konstrukcyjne oraz elementy nara\u017Cone na kontakt z wilgoci\u0105. Preparat nale\u017Cy nanosi\u0107 na czyste i suche pod\u0142o\u017Ce, za pomoc\u0105 p\u0119dzla, wa\u0142ka lub natrysku. Optymalne warunki aplikacji to temperatura od +5\xB0C do +30\xB0C.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "8\u201310 m\xB2/L" },
      { label: "Rozcie\u0144czalnik", value: "woda" },
      { label: "Ochrona przed", value: "grzybem, owadami, wilgoci\u0105" },
      { label: "Czas schni\u0119cia", value: "2\u20134 h" }
    ],
    images: [],
    tags: [
      "impregnat",
      "remmers",
      "wb eco",
      "drewno",
      "ochrona",
      "biocyd",
      "wodny"
    ],
    related: ["p087", "p088", "p062"],
    advantages: [
      "Skuteczna ochrona przed grzybami, owadami i wilgoci\u0105.",
      "Ekologiczna formu\u0142a na bazie wody, bezpieczna dla u\u017Cytkownika i \u015Brodowiska.",
      "D\u0142ugotrwa\u0142a ochrona drewna, przed\u0142u\u017Caj\u0105ca jego \u017Cywotno\u015B\u0107.",
      "Szybkoschn\u0105cy preparat, umo\u017Cliwiaj\u0105cy szybkie przej\u015Bcie do kolejnych etap\xF3w prac."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +5\xB0C oraz podczas silnego nas\u0142onecznienia.",
      "Przed u\u017Cyciem zapozna\u0107 si\u0119 z kart\u0105 techniczn\u0105 produktu i \u015Brodkami ostro\u017Cno\u015Bci."
    ],
    faq: [
      { q: "Do jakiego rodzaju drewna mo\u017Cna stosowa\u0107 impregnat Remmers WB ECO 10L?", a: "Impregnat Remmers WB ECO 10L mo\u017Cna stosowa\u0107 do wszystkich rodzaj\xF3w drewna litego, klejonego, konstrukcyjnego, przeznaczonego do zastosowa\u0144 zewn\u0119trznych i wewn\u0119trznych, w tym element\xF3w nara\u017Conych na kontakt z wilgoci\u0105." },
      { q: "Jaka jest wydajno\u015B\u0107 impregnatu Remmers WB ECO 10L?", a: "Wydajno\u015B\u0107 impregnatu wynosi oko\u0142o 8-10 m\xB2 z jednego litra, w zale\u017Cno\u015Bci od ch\u0142onno\u015Bci i rodzaju drewna oraz metody aplikacji." },
      { q: "Czy impregnat Remmers WB ECO 10L jest bezpieczny dla zdrowia?", a: "Tak, impregnat Remmers WB ECO 10L jest preparatem ekologicznym na bazie wody, wolnym od rozpuszczalnik\xF3w organicznych, co czyni go bezpiecznym dla u\u017Cytkownika i \u015Brodowiska przy zachowaniu zalece\u0144 producenta." }
    ],
    seoDescription: "Szukasz skutecznego i ekologicznego impregnatu do drewna? Remmers WB ECO 10L to wodny preparat biocydowy, kt\xF3ry zapewni Twoim drewnianym elementom kompleksow\u0105 ochron\u0119 przed grzybami, owadami i wilgoci\u0105. Idealny do stosowania na zewn\u0105trz i wewn\u0105trz budynk\xF3w, na konstrukcje drewniane, tarasy, meble ogrodowe. Wydajno\u015B\u0107 8-10 m\xB2/L, czas schni\u0119cia 2-4 godziny. Wybierz impregnat Remmers WB ECO dla d\u0142ugotrwa\u0142ej ochrony i naturalnego pi\u0119kna drewna. Wodny impregnat do drewna, ochrona drewna przed wilgoci\u0105, impregnat biocydowy Remmers WB ECO."
  },
  {
    id: "p090",
    slug: "emalia-akrylowa-sniezka-profi-5l",
    name: "Emalia akrylowa \u015Anie\u017Cka Profi 5 L",
    categorySlug: "emalie-akrylowe",
    brand: "\u015Anie\u017Cka",
    sku: "SNZ-PROFI-AKR-5",
    unit: "wiadro 5 L",
    shortDescription: "Emalia akrylowa \u015Anie\u017Cka Profi 5L to p\xF3\u0142matowe, trwa\u0142e wyko\u0144czenie do drewna i metalu. Odporna na zmywanie i zarysowania, idealna do wn\u0119trz.",
    description: "Odkryj doskona\u0142e w\u0142a\u015Bciwo\u015Bci emalii akrylowej \u015Anie\u017Cka Profi 5L, stworzonej z my\u015Bl\u0105 o profesjonalnych wyko\u0144czeniach wn\u0119trz. Jej p\xF3\u0142matowe wyko\u0144czenie nadaje powierzchni elegancki, subtelny blask, jednocze\u015Bnie maskuj\u0105c drobne niedoskona\u0142o\u015Bci. Formu\u0142a na bazie wody sprawia, \u017Ce jest przyjazna dla u\u017Cytkownika, praktycznie bezzapachowa i szybko schnie, co znacznie skraca czas pracy. Emalia charakteryzuje si\u0119 wyj\u0105tkow\u0105 odporno\u015Bci\u0105 na \u015Bcieranie, zmywanie i zarysowania, co czyni j\u0105 idealnym wyborem do malowania element\xF3w drewnianych i metalowych nara\u017Conych na intensywne u\u017Cytkowanie, takich jak drzwi, meble, parapety czy grzejniki. Zapewnia d\u0142ugotrwa\u0142y efekt i estetyczny wygl\u0105d.",
    application: "Emalia \u015Anie\u017Cka Profi jest przeznaczona do dekoracyjno-ochronnego malowania pod\u0142o\u017Cy drewnianych i metalowych wewn\u0105trz pomieszcze\u0144. Idealnie nadaje si\u0119 do stosowania na wcze\u015Bniej zagruntowane lub pomalowane pod\u0142o\u017Ca. Przed aplikacj\u0105 zaleca si\u0119 dok\u0142adne oczyszczenie i odt\u0142uszczenie powierzchni. Temperatura otoczenia i malowanej powierzchni powinna wynosi\u0107 od +10\xB0C do +25\xB0C.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "8\u201310 m\xB2/L" },
      { label: "Po\u0142ysk", value: "p\xF3\u0142matowy" },
      { label: "Czas schni\u0119cia", value: "2\u20134 h" },
      { label: "Odporno\u015B\u0107", value: "zmywanie, zarysowania" }
    ],
    images: [],
    tags: [
      "emalia akrylowa",
      "\u015Bnie\u017Cka",
      "profi",
      "metal",
      "drewno",
      "wn\u0119trze",
      "po\u0142ysk"
    ],
    related: ["p091", "p087", "p081"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na zmywanie i zarysowania.",
      "Pi\u0119kne, p\xF3\u0142matowe wyko\u0144czenie.",
      "Przyjazna dla u\u017Cytkownika formu\u0142a, praktycznie bezzapachowa.",
      "Szybkie schni\u0119cie i \u0142atwa aplikacja."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +10\xB0C.",
      "Przechowywa\u0107 w oryginalnym, szczelnie zamkni\u0119tym opakowaniu."
    ],
    faq: [
      { q: "Jak przygotowa\u0107 pod\u0142o\u017Ce przed malowaniem emali\u0105 \u015Anie\u017Cka Profi?", a: "Pod\u0142o\u017Ce powinno by\u0107 czyste, suche i odt\u0142uszczone. Elementy drewniane nale\u017Cy zagruntowa\u0107 odpowiednim preparatem, a metalowe oczy\u015Bci\u0107 z rdzy i zabezpieczy\u0107 podk\u0142adem antykorozyjnym." },
      { q: "Jaka jest wydajno\u015B\u0107 emalii \u015Anie\u017Cka Profi?", a: "Wydajno\u015B\u0107 emalii wynosi oko\u0142o 8-10 m\xB2 z litra farby, przy jednokrotnym malowaniu." },
      { q: "Czy emalia nadaje si\u0119 do malowania grzejnik\xF3w?", a: "Tak, emalia \u015Anie\u017Cka Profi doskonale nadaje si\u0119 do malowania grzejnik\xF3w, ze wzgl\u0119du na swoj\u0105 odporno\u015B\u0107 na wysokie temperatury i zmywanie." }
    ],
    seoDescription: "Szukasz trwa\u0142ej i estetycznej emalii do wn\u0119trz? Emalia akrylowa \u015Anie\u017Cka Profi 5L w p\xF3\u0142matowym wyko\u0144czeniu to idealne rozwi\u0105zanie do malowania drewna i metalu. Ta wysokiej jako\u015Bci farba akrylowa, oznaczona jako \u015Bnie\u017Cka profi, gwarantuje doskona\u0142\u0105 przyczepno\u015B\u0107 i odporno\u015B\u0107 na zmywanie oraz zarysowania. Jej szybkoschn\u0105ca, wodna formu\u0142a sprawia, \u017Ce jest przyjazna dla u\u017Cytkownika i praktycznie bezzapachowa, co u\u0142atwia prace malarskie w pomieszczeniach. Doskonale sprawdzi si\u0119 do odnawiania mebli, drzwi, parapet\xF3w, kaloryfer\xF3w i innych element\xF3w metalowych oraz drewnianych w Twoim domu. Wybierz niezawodno\u015B\u0107 i profesjonalny efekt z emali\u0105 \u015Anie\u017Cka Profi."
  },
  {
    id: "p091",
    slug: "emalia-ftalowa-sniezka-enamel-5l",
    name: "Emalia ftalowa \u015Anie\u017Cka Enamel 5 L",
    categorySlug: "emalie-ftalowe",
    brand: "\u015Anie\u017Cka",
    sku: "SNZ-ENAMEL-FTL-5",
    unit: "wiadro 5 L",
    shortDescription: "Wysokiej jako\u015Bci emalia ftalowa \u015Anie\u017Cka Enamel 5L. Zapewnia trwa\u0142\u0105 ochron\u0119 i wysoki po\u0142ysk powierzchni metalowych i drewnianych. Idealna do zastosowa\u0144 wewn\u0119trznych i zewn\u0119trznych.",
    description: "\u015Anie\u017Cka Enamel to profesjonalna emalia ftalowa przeznaczona do malowania powierzchni metalowych i drewnianych. Charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105, wysok\u0105 odporno\u015Bci\u0105 na \u015Bcieranie i warunki atmosferyczne. Jej formu\u0142a na bazie \u017Cywic ftalowych gwarantuje d\u0142ugotrwa\u0142\u0105 ochron\u0119 przed korozj\u0105 i uszkodzeniami mechanicznymi. Emalia tworzy g\u0142adk\u0105, jednolit\u0105 pow\u0142ok\u0119 o intensywnym, wysokim po\u0142ysku, kt\xF3ra jest \u0142atwa w czyszczeniu. Szybkoschn\u0105ca formu\u0142a pozwala na szybkie uko\u0144czenie prac malarskich. Idealnie nadaje si\u0119 do renowacji mebli, element\xF3w konstrukcyjnych, balustrad, grzejnik\xF3w oraz innych powierzchni wymagaj\u0105cych estetycznego i trwa\u0142ego wyko\u0144czenia.",
    application: "Emalia \u015Anie\u017Cka Enamel przeznaczona jest do malowania zagruntowanych powierzchni metalowych (stalowych, \u017Celiwnych) oraz drewna i materia\u0142\xF3w drewnopochodnych. Doskonale sprawdzi si\u0119 wewn\u0105trz i na zewn\u0105trz pomieszcze\u0144. Przed malowaniem powierzchni\u0119 nale\u017Cy oczy\u015Bci\u0107, odt\u0142u\u015Bci\u0107 i zagruntowa\u0107 odpowiednim podk\u0142adem. Zaleca si\u0119 stosowanie w temperaturze od +5\xB0C do +30\xB0C, przy wilgotno\u015Bci powietrza poni\u017Cej 75%.",
    technicalSpec: [
      { label: "Wydajno\u015B\u0107", value: "6\u20138 m\xB2/L" },
      { label: "Po\u0142ysk", value: "wysoki" },
      { label: "Czas schni\u0119cia", value: "8\u201312 h" },
      { label: "Rozcie\u0144czalnik", value: "terpentyna lub Nitro" }
    ],
    images: [],
    tags: [
      "emalia ftalowa",
      "\u015Bnie\u017Cka",
      "enamel",
      "metal",
      "drewno",
      "wysoki po\u0142ysk",
      "alkidowa"
    ],
    related: ["p090", "p092", "p087"],
    advantages: [
      "Wysoki po\u0142ysk i estetyczny wygl\u0105d pow\u0142oki.",
      "Doskona\u0142a przyczepno\u015B\u0107 do pod\u0142o\u017Ca.",
      "Wysoka odporno\u015B\u0107 na \u015Bcieranie i uszkodzenia.",
      "Trwa\u0142a ochrona przed korozj\u0105 i czynnikami atmosferycznymi."
    ],
    warnings: [
      "Przed u\u017Cyciem zapozna\u0107 si\u0119 z kart\u0105 techniczn\u0105 produktu.",
      "Stosowa\u0107 w dobrze wentylowanych pomieszczeniach, u\u017Cywaj\u0105c \u015Brodk\xF3w ochrony osobistej."
    ],
    faq: [
      { q: "Jak przygotowa\u0107 pod\u0142o\u017Ce przed malowaniem emali\u0105 ftalow\u0105 \u015Anie\u017Cka Enamel?", a: "Pod\u0142o\u017Ce powinno by\u0107 czyste, suche, odt\u0142uszczone i wolne od lu\u017Ano zwi\u0105zanych element\xF3w. Nowe powierzchnie metalowe zaleca si\u0119 zagruntowa\u0107 antykorozyjnym podk\u0142adem ftalowym, a drewniane odpowiednim impregnatem lub podk\u0142adem." },
      { q: "Czym rozcie\u0144czy\u0107 emali\u0119 ftalow\u0105 \u015Anie\u017Cka Enamel?", a: "Emali\u0119 mo\u017Cna rozcie\u0144cza\u0107 terpentyn\u0105 lub rozcie\u0144czalnikiem typu Nitro w ilo\u015Bci nieprzekraczaj\u0105cej 5% obj\u0119to\u015Bci." },
      { q: "Jaka jest wydajno\u015B\u0107 emalii ftalowej \u015Anie\u017Cka Enamel?", a: "Wydajno\u015B\u0107 emalii wynosi od 6 do 8 m\xB2 na litr przy jednokrotnym malowaniu, w zale\u017Cno\u015Bci od ch\u0142onno\u015Bci i struktury pod\u0142o\u017Ca." }
    ],
    seoDescription: "Szukasz trwa\u0142ej i efektownej emalii do metalu i drewna? Wybierz \u015Anie\u017Cka Enamel 5L \u2013 wysokiej jako\u015Bci emali\u0119 ftalow\u0105 o wysokim po\u0142ysku. Idealna do malowania grzejnik\xF3w, mebli, ogrodze\u0144 i konstrukcji stalowych. Zapewnia doskona\u0142\u0105 ochron\u0119 antykorozyjn\u0105 i odporno\u015B\u0107 na \u015Bcieranie. Szybkoschn\u0105ca formu\u0142a u\u0142atwia prac\u0119. Odkryj pe\u0142n\u0105 gam\u0119 kolor\xF3w emalii alkidowych \u015Anie\u017Cka dost\u0119pnych w naszym sklepie. Kup teraz emali\u0119 ftalow\u0105 \u015Anie\u017Cka Enamel i ciesz si\u0119 estetycznym wyko\u0144czeniem na lata."
  },
  {
    id: "p092",
    slug: "rozpuszczalnik-nitro-1l",
    name: "Rozpuszczalnik Nitro 1 L",
    categorySlug: "rozpuszczalniki",
    brand: "\u015Anie\u017Cka",
    sku: "SNZ-NITRO-1",
    unit: "butelka 1 L",
    shortDescription: "Uniwersalny rozpuszczalnik nitro \u015Anie\u017Cka 1 L na bazie keton\xF3w i octan\xF3w. Idealny do rozcie\u0144czania lakier\xF3w nitro oraz mycia narz\u0119dzi malarskich.",
    description: "Rozpuszczalnik Nitro \u015Anie\u017Cka 1 L to profesjonalny produkt przeznaczony do rozcie\u0144czania wszelkiego rodzaju lakier\xF3w nitrocelulozowych. Skutecznie usuwa r\xF3wnie\u017C zaschni\u0119te farby i lakiery, a tak\u017Ce doskonale nadaje si\u0119 do mycia p\u0119dzli, wa\u0142k\xF3w i innych narz\u0119dzi malarskich z pozosta\u0142o\u015Bci po lakierach. Jego unikalna formu\u0142a oparta na mieszaninie keton\xF3w i octan\xF3w zapewnia szybkie i efektywne dzia\u0142anie. Niezb\u0119dny w ka\u017Cdym warsztacie i domu do prac wyko\u0144czeniowych i konserwacyjnych.",
    application: "Stosowa\u0107 w dobrze wentylowanych pomieszczeniach. Wymieszaj z lakierem nitro w odpowiednich proporcjach zgodnie z instrukcj\u0105 producenta farby. Do mycia narz\u0119dzi zanurz je w rozpuszczalniku i dok\u0142adnie wyczy\u015B\u0107. Unika\u0107 kontaktu ze sk\xF3r\u0105 i oczami. Stosowa\u0107 w temperaturze pokojowej.",
    technicalSpec: [
      { label: "Sk\u0142ad", value: "mieszanina octan\xF3w i keton\xF3w" },
      { label: "Temperatura zap\u0142onu", value: "< 21\xB0C" },
      { label: "Zastosowanie", value: "rozcie\u0144czanie lakier\xF3w nitro, mycie narz\u0119dzi" },
      { label: "Zapach", value: "intensywny" }
    ],
    images: [],
    tags: [
      "rozpuszczalnik",
      "nitro",
      "rozcie\u0144czalnik",
      "lakiery",
      "mycie p\u0119dzli",
      "aceton"
    ],
    related: ["p091", "p090", "p088"],
    advantages: [
      "Szybko rozcie\u0144cza lakiery nitrocelulozowe.",
      "Skutecznie usuwa zaschni\u0119te farby i lakiery.",
      "Idealny do mycia narz\u0119dzi malarskich.",
      "Wysoka jako\u015B\u0107 potwierdzona mark\u0105 \u015Anie\u017Cka."
    ],
    warnings: [
      "Produkt \u0142atwopalny, przechowywa\u0107 z dala od \u017Ar\xF3de\u0142 ciep\u0142a i ognia.",
      "Stosowa\u0107 r\u0119kawice ochronne i okulary, unika\u0107 wdychania opar\xF3w."
    ],
    faq: [
      { q: "Do jakich lakier\xF3w mo\u017Cna stosowa\u0107 rozpuszczalnik nitro \u015Anie\u017Cka?", a: "Rozpuszczalnik nitro \u015Anie\u017Cka przeznaczony jest przede wszystkim do rozcie\u0144czania lakier\xF3w nitrocelulozowych. Mo\u017Ce by\u0107 r\xF3wnie\u017C stosowany do usuwania innych pow\u0142ok lakierniczych." },
      { q: "Czy rozpuszczalnik nitro nadaje si\u0119 do mycia p\u0119dzli?", a: "Tak, rozpuszczalnik nitro \u015Anie\u017Cka doskonale nadaje si\u0119 do mycia p\u0119dzli, wa\u0142k\xF3w i innych narz\u0119dzi malarskich z resztek lakier\xF3w i farb." },
      { q: "Jakie s\u0105 \u015Brodki ostro\u017Cno\u015Bci podczas u\u017Cywania rozpuszczalnika nitro?", a: "Nale\u017Cy stosowa\u0107 go w dobrze wentylowanych pomieszczeniach, unika\u0107 wdychania opar\xF3w oraz kontaktu ze sk\xF3r\u0105 i oczami. Produkt jest \u0142atwopalny, wi\u0119c nale\u017Cy trzyma\u0107 go z dala od ognia i \u017Ar\xF3de\u0142 ciep\u0142a." }
    ],
    seoDescription: "Kup rozpuszczalnik nitro \u015Anie\u017Cka 1 L do lakier\xF3w nitro i mycia narz\u0119dzi. Ten uniwersalny rozcie\u0144czalnik na bazie keton\xF3w i octan\xF3w to must-have dla malarzy i majsterkowicz\xF3w. Skutecznie rozcie\u0144cza lakiery, usuwa farby i czy\u015Bci p\u0119dzle. Szukasz rozpuszczalnika do zada\u0144 specjalnych? Rozpuszczalnik nitro \u015Anie\u017Cka to najlepszy wyb\xF3r. \u015Awietny do rozcie\u0144czania lakier\xF3w, czyszczenia narz\u0119dzi malarskich, usuwania zaschni\u0119tych lakier\xF3w. Niezast\u0105piony przy pracach wyko\u0144czeniowych. Niska temperatura zap\u0142onu wymaga ostro\u017Cno\u015Bci. Zam\xF3w ju\u017C dzi\u015B!"
  },
  {
    id: "p093",
    slug: "plyta-gk-knauf-gkb-125mm",
    name: "P\u0142yta gipsowo-kartonowa Knauf GKB 12,5 mm (A) 2,6 m\xB2",
    categorySlug: "plyty-gipsowo-kartonowe",
    brand: "Knauf",
    sku: "KNF-GKB-1250",
    unit: "p\u0142yta 2,6 m\xB2",
    shortDescription: "Standardowa p\u0142yta gipsowo-kartonowa Knauf GKB 12,5 mm (A) o wymiarach 1200x2600 mm. Idealna do tworzenia \u015Bcianek dzia\u0142owych, sufit\xF3w podwieszanych i zabud\xF3w w systemach suchej zabudowy.",
    description: "P\u0142yta gipsowo-kartonowa Knauf GKB o grubo\u015Bci 12,5 mm to wszechstronny materia\u0142 budowlany klasy A, przeznaczony do zastosowania w systemach suchej zabudowy. Doskonale nadaje si\u0119 do szybkiego i efektywnego budowania \u015Bcian dzia\u0142owych, sufit\xF3w podwieszanych, obudowy poddaszy oraz tworzenia element\xF3w dekoracyjnych. Zapewnia g\u0142adk\u0105 powierzchni\u0119 gotow\u0105 do malowania, tapetowania lub innych form wyko\u0144czenia. Niska masa w\u0142asna (9,0 kg/m\xB2) u\u0142atwia monta\u017C, a klasa ogniowa A1 gwarantuje wysokie bezpiecze\u0144stwo po\u017Carowe. Wybieraj\u0105c p\u0142yty Knauf GKB, stawiasz na jako\u015B\u0107, trwa\u0142o\u015B\u0107 i \u0142atwo\u015B\u0107 obr\xF3bki.",
    application: "P\u0142yta Knauf GKB 12,5 mm przeznaczona jest do stosowania wewn\u0105trz budynk\xF3w w suchych pomieszczeniach. Idealnie nadaje si\u0119 do budowy \u015Bcianek dzia\u0142owych, sufit\xF3w podwieszanych, zabudowy poddaszy, a tak\u017Ce do renowacji i tworzenia element\xF3w dekoracyjnych. Mo\u017Ce by\u0107 montowana na stela\u017Cach metalowych lub drewnianych, a tak\u017Ce bezpo\u015Brednio na istniej\u0105cych \u015Bcianach przy u\u017Cyciu odpowiednich system\xF3w mocowania.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "12,5 mm" },
      { label: "Klasa p\u0142yty", value: "A \u2013 standardowa" },
      { label: "Wymiar", value: "1200 \xD7 2600 mm" },
      { label: "Masa", value: "9,0 kg/m\xB2" },
      { label: "Klasa ogniowa", value: "A1 \u2013 rdze\u0144 gipsowy" }
    ],
    images: [],
    tags: [
      "p\u0142yta gipsowo-kartonowa",
      "knauf",
      "gkb",
      "standard",
      "sucha zabudowa",
      "\u015Bciany",
      "sufity"
    ],
    related: ["p094", "p097", "p098"],
    advantages: [
      "Wszechstronne zastosowanie w systemach suchej zabudowy.",
      "\u0141atwy i szybki monta\u017C dzi\u0119ki niskiej masie i standardowym wymiarom.",
      "G\u0142adka powierzchnia gotowa do wyko\u0144czenia.",
      "Wysokie bezpiecze\u0144stwo po\u017Carowe (klasa A1)."
    ],
    warnings: [
      "Nie stosowa\u0107 w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci.",
      "Chroni\u0107 przed uszkodzeniami mechanicznymi podczas transportu i monta\u017Cu."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zastosowania p\u0142yty Knauf GKB 12,5 mm?", a: "P\u0142yta Knauf GKB 12,5 mm jest idealna do budowy \u015Bcianek dzia\u0142owych, sufit\xF3w podwieszanych, obudowy poddaszy oraz element\xF3w dekoracyjnych w suchych pomieszczeniach." },
      { q: "Czy p\u0142yta gipsowo-kartonowa Knauf nadaje si\u0119 do pomieszcze\u0144 wilgotnych?", a: "Nie, standardowa p\u0142yta gipsowo-kartonowa Knauf GKB (klasa A) nie jest przeznaczona do pomieszcze\u0144 o podwy\u017Cszonej wilgotno\u015Bci. W takich miejscach nale\u017Cy stosowa\u0107 p\u0142yty impregnowane (zielone)." },
      { q: "Jakie s\u0105 wymiary standardowej p\u0142yty Knauf GKB 12,5 mm?", a: "Standardowa p\u0142yta Knauf GKB 12,5 mm ma wymiary 1200 mm szeroko\u015Bci i 2600 mm d\u0142ugo\u015Bci, co daje powierzchni\u0119 2,6 m\xB2." }
    ],
    seoDescription: "Szukasz niezawodnych materia\u0142\xF3w do suchej zabudowy? P\u0142yta gipsowo-kartonowa Knauf GKB 12,5 mm (A) 2,6 m\xB2 to idealny wyb\xF3r do budowy \u015Bcian dzia\u0142owych, sufit\xF3w podwieszanych i renowacji wn\u0119trz. Ta standardowa p\u0142yta gipsowa o grubo\u015Bci 12,5 mm i wymiarach 1200x2600 mm charakteryzuje si\u0119 \u0142atwo\u015Bci\u0105 monta\u017Cu, nisk\u0105 mas\u0105 9,0 kg/m\xB2 oraz wysokim bezpiecze\u0144stwem po\u017Carowym klasy A1. Zapewnia g\u0142adk\u0105 powierzchni\u0119 gotow\u0105 do malowania czy tapetowania. Sprawd\u017A inne produkty Knauf i materia\u0142y budowlane dost\u0119pne w naszej ofercie. Buduj szybko i efektywnie ze sprawdzonymi rozwi\u0105zaniami dla \u015Bcian i sufit\xF3w."
  },
  {
    id: "p094",
    slug: "plyta-gk-rigips-rh-zielona-125mm",
    name: "P\u0142yta GK Rigips RH wilgocioodporna 12,5 mm (H2) 2,6 m\xB2",
    categorySlug: "plyty-gipsowo-kartonowe",
    brand: "Rigips",
    sku: "RGP-RH-1250",
    unit: "p\u0142yta 2,6 m\xB2",
    shortDescription: "Wilgocioodporna p\u0142yta gipsowo-kartonowa Rigips RH H2 o grubo\u015Bci 12,5 mm i wymiarach 1,2x2,6 m. Zielona kolorystyka, idealna do pomieszcze\u0144 o podwy\u017Cszonej wilgotno\u015Bci.",
    description: "P\u0142yta gipsowo-kartonowa Rigips RH H2 12,5 mm to specjalistyczny produkt przeznaczony do stosowania w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci, takich jak \u0142azienki, kuchnie czy pralnie. Jej zielona barwa u\u0142atwia identyfikacj\u0119 w systemach budowlanych. P\u0142yta charakteryzuje si\u0119 nisk\u0105 nasi\u0105kliwo\u015Bci\u0105 (< 5%), co zapewnia jej odporno\u015B\u0107 na dzia\u0142anie wilgoci i zapobiega powstawaniu ple\u015Bni. Grubo\u015B\u0107 12,5 mm gwarantuje odpowiedni\u0105 wytrzyma\u0142o\u015B\u0107 mechaniczn\u0105, a wymiary 1200 x 2600 mm pozwalaj\u0105 na efektywne i szybkie wykonanie prac. P\u0142yta Rigips RH jest \u0142atwa w obr\xF3bce, ci\u0119ciu i monta\u017Cu, co sprawia, \u017Ce jest ch\u0119tnie wybierana przez profesjonalist\xF3w i majsterkowicz\xF3w.",
    application: "P\u0142yta Rigips RH H2 12,5 mm przeznaczona jest do budowy \u015Bcian dzia\u0142owych, sufit\xF3w podwieszanych oraz zabud\xF3w w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci. Doskonale sprawdza si\u0119 w \u0142azienkach, kuchniach, pralniach i innych miejscach nara\u017Conych na kontakt z par\u0105 wodn\u0105. Mo\u017Ce by\u0107 stosowana zar\xF3wno w budownictwie mieszkaniowym, jak i komercyjnym. Monta\u017C powinien odbywa\u0107 si\u0119 na odpowiednio przygotowanych stela\u017Cach metalowych lub drewnianych.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "12,5 mm" },
      { label: "Klasa p\u0142yty", value: "H2 \u2013 wilgocioodporna" },
      { label: "Wymiar", value: "1200 \xD7 2600 mm" },
      { label: "Nasi\u0105kliwo\u015B\u0107", value: "< 5%" },
      { label: "Kolor", value: "zielona" }
    ],
    images: [],
    tags: [
      "p\u0142yta gipsowo-kartonowa",
      "rigips",
      "rh",
      "zielona",
      "\u0142azienka",
      "wilgocioodporna",
      "h2"
    ],
    related: ["p093", "p097", "p098"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na wilgo\u0107, idealna do \u0142azienek i kuchni.",
      "Niska nasi\u0105kliwo\u015B\u0107 (< 5%) zapobiega rozwojowi ple\u015Bni.",
      "Zielony kolor u\u0142atwia identyfikacj\u0119 i zastosowanie w specjalnych systemach.",
      "\u0141atwo\u015B\u0107 obr\xF3bki, ci\u0119cia i monta\u017Cu przyspiesza prace budowlane."
    ],
    warnings: [
      "Nie stosowa\u0107 w pomieszczeniach o ekstremalnej wilgotno\u015Bci (np. sauny).",
      "Zawsze nale\u017Cy stosowa\u0107 odpowiednie systemy wentylacyjne w pomieszczeniach z t\u0105 p\u0142yt\u0105."
    ],
    faq: [
      { q: "Do jakich pomieszcze\u0144 najlepiej nadaje si\u0119 p\u0142yta Rigips RH H2?", a: "P\u0142yta Rigips RH H2 jest optymalnym wyborem do pomieszcze\u0144 o podwy\u017Cszonej wilgotno\u015Bci, takich jak \u0142azienki, kuchnie, pralnie, a tak\u017Ce pomieszczenia techniczne, gdzie wyst\u0119puje ryzyko kontaktu z par\u0105 wodn\u0105." },
      { q: "Czym r\xF3\u017Cni si\u0119 p\u0142yta Rigips RH od standardowej p\u0142yty gipsowo-kartonowej?", a: "G\u0142\xF3wna r\xF3\u017Cnica polega na zwi\u0119kszonej odporno\u015Bci na wilgo\u0107. P\u0142yta RH (H2) ma specjaln\u0105 impregnowan\u0105 ok\u0142adzin\u0119 i rdze\u0144 gipsowy, co minimalizuje wch\u0142anianie wody w por\xF3wnaniu do standardowych p\u0142yt." },
      { q: "Czy mog\u0119 malowa\u0107 lub tapetowa\u0107 zielon\u0105 p\u0142yt\u0119 Rigips RH?", a: "Tak, zielona p\u0142yta Rigips RH H2 mo\u017Ce by\u0107 malowana, tapetowana lub wyka\u0144czana innymi materia\u0142ami wyko\u0144czeniowymi przeznaczonymi do wn\u0119trz, po odpowiednim zagruntowaniu i przygotowaniu powierzchni." }
    ],
    seoDescription: "Szukasz wilgocioodpornej p\u0142yty gipsowo-kartonowej do \u0142azienki? P\u0142yta Rigips RH H2 12,5 mm zielona to doskona\u0142e rozwi\u0105zanie. Oferujemy p\u0142yty gipsowe Rigips RH o wymiarach 1,2x2,6 m, charakteryzuj\u0105ce si\u0119 nisk\u0105 nasi\u0105kliwo\u015Bci\u0105 < 5%. Idealna do budowy \u015Bcian i sufit\xF3w w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci. P\u0142yty RH Rigips s\u0105 \u0142atwe w monta\u017Cu i obr\xF3bce, zapewniaj\u0105c trwa\u0142e i estetyczne wyko\u0144czenie. Sprawd\u017A nasze wilgocioodporne p\u0142yty GK Rigips, najlepsze do \u0142azienek i kuchni."
  },
  {
    id: "p095",
    slug: "plyta-gipsowo-wloknowa-fermacell-125mm",
    name: "P\u0142yta gipsowo-w\u0142\xF3knowa Fermacell 12,5 mm 1,5 m\xB2",
    categorySlug: "plyty-gipsowo-wloknowe",
    brand: "Fermacell",
    sku: "FRM-GW-1250",
    unit: "p\u0142yta 1,5 m\xB2",
    shortDescription: "P\u0142yta gipsowo-w\u0142\xF3knowa Fermacell 12,5 mm to innowacyjne rozwi\u0105zanie o wysokiej twardo\u015Bci i odporno\u015Bci na wilgo\u0107, idealne do budownictwa suchego.",
    description: "P\u0142yta gipsowo-w\u0142\xF3knowa Fermacell 12,5 mm to nowoczesny materia\u0142 budowlany ceniony za swoj\u0105 wszechstronno\u015B\u0107 i doskona\u0142e parametry techniczne. Wykonana z gipsu i celulozy, charakteryzuje si\u0119 wyj\u0105tkow\u0105 twardo\u015Bci\u0105 powierzchni, co czyni j\u0105 odporn\u0105 na uszkodzenia mechaniczne i uderzenia. Dodatkowo, p\u0142yta Fermacell wykazuje podwy\u017Cszon\u0105 odporno\u015B\u0107 na wilgo\u0107, co umo\u017Cliwia jej zastosowanie w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci, takich jak \u0142azienki czy kuchnie. Jest to materia\u0142 niepalny, posiadaj\u0105cy klas\u0119 reakcji na ogie\u0144 A2, co podnosi bezpiecze\u0144stwo po\u017Carowe budynku. Jej wysoka g\u0119sto\u015B\u0107 zapewnia r\xF3wnie\u017C dobre w\u0142a\u015Bciwo\u015Bci akustyczne i termiczne. P\u0142yta Fermacell to synonim trwa\u0142o\u015Bci i estetyki w suchej zabudowie, znajduj\u0105c zastosowanie w \u015Bcianach, sufitach i pod\u0142ogach.",
    application: "P\u0142yta gipsowo-w\u0142\xF3knowa Fermacell 12,5 mm przeznaczona jest do stosowania w systemach suchej zabudowy: \u015Bcian dzia\u0142owych, ok\u0142adzin \u015Bciennych, sufit\xF3w podwieszanych oraz suchych jastrych\xF3w pod\u0142ogowych. Monta\u017C na konstrukcjach drewnianych lub metalowych. Nadaje si\u0119 do pomieszcze\u0144 o standardowej i podwy\u017Cszonej wilgotno\u015Bci. Mo\u017Ce by\u0107 stosowana na istniej\u0105cych pod\u0142ogach jako warstwa wyr\xF3wnuj\u0105ca i wzmacniaj\u0105ca.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "12,5 mm" },
      { label: "Wymiar", value: "1200 \xD7 1250 mm" },
      { label: "Masa", value: "13,5 kg/m\xB2" },
      { label: "Klasa ogniowa", value: "A2" },
      { label: "Twardo\u015B\u0107 powierzchni", value: "wysoka" }
    ],
    images: [],
    tags: [
      "p\u0142yta gipsowo-w\u0142\xF3knowa",
      "fermacell",
      "twarda",
      "wodoodporna",
      "posadzka",
      "sucha zabudowa"
    ],
    related: ["p093", "p094", "p097"],
    advantages: [
      "Wysoka twardo\u015B\u0107 powierzchni, odporna na uszkodzenia mechaniczne.",
      "Podwy\u017Cszona odporno\u015B\u0107 na wilgo\u0107, idealna do \u0142azienek i kuchni.",
      "Doskona\u0142e w\u0142a\u015Bciwo\u015Bci akustyczne i termiczne.",
      "Niepalno\u015B\u0107 (klasa A2), zwi\u0119ksza bezpiecze\u0144stwo po\u017Carowe."
    ],
    warnings: [
      "Nale\u017Cy unika\u0107 d\u0142ugotrwa\u0142ego nara\u017Cenia na bezpo\u015Brednie dzia\u0142anie wody.",
      "Przed monta\u017Cem w pomieszczeniach o bardzo wysokiej wilgotno\u015Bci zaleca si\u0119 zastosowanie dodatkowej warstwy izolacji przeciwwilgociowej."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety p\u0142yt gipsowo-w\u0142\xF3knowych Fermacell?", a: "G\u0142\xF3wne zalety to wysoka twardo\u015B\u0107, odporno\u015B\u0107 na wilgo\u0107, dobre w\u0142a\u015Bciwo\u015Bci akustyczne i termiczne oraz niepalno\u015B\u0107. S\u0105 trwa\u0142e i estetyczne." },
      { q: "Czy p\u0142yty Fermacell nadaj\u0105 si\u0119 do \u0142azienki?", a: "Tak, p\u0142yty Fermacell 12,5 mm posiadaj\u0105 podwy\u017Cszon\u0105 odporno\u015B\u0107 na wilgo\u0107, co czyni je odpowiednimi do zastosowania w \u0142azienkach i kuchniach." },
      { q: "Jakie jest zastosowanie p\u0142yt gipsowo-w\u0142\xF3knowych Fermacell?", a: "Stosuje si\u0119 je w budownictwie szkieletowym, do budowy \u015Bcian dzia\u0142owych, ok\u0142adzin \u015Bciennych, sufit\xF3w podwieszanych oraz jako materia\u0142 na suche jastrychy pod\u0142ogowe." }
    ],
    seoDescription: "Szukasz wytrzyma\u0142ych i uniwersalnych p\u0142yt do suchej zabudowy? P\u0142yta gipsowo-w\u0142\xF3knowa Fermacell 12,5 mm to idealny wyb\xF3r. Oferuje wyj\u0105tkow\u0105 twardo\u015B\u0107 powierzchni, odporno\u015B\u0107 na uderzenia i podwy\u017Cszon\u0105 wodoodporno\u015B\u0107, co czyni j\u0105 doskona\u0142\u0105 do kuchni i \u0142azienek. Klasa ogniowa A2 gwarantuje bezpiecze\u0144stwo po\u017Carowe. Idealna do budowy \u015Bcian dzia\u0142owych, sufit\xF3w i suchych jastrych\xF3w. Sprawd\u017A jako\u015B\u0107 i trwa\u0142o\u015B\u0107 p\u0142yt Fermacell do Twojego projektu budowlanego."
  },
  {
    id: "p096",
    slug: "plyta-cementowa-aquapanel-knauf-125mm",
    name: "P\u0142yta cementowa Aquapanel Knauf Outdoor 12,5 mm",
    categorySlug: "plyty-cementowe",
    brand: "Knauf",
    sku: "KNF-AQUAPANEL-1250",
    unit: "p\u0142yta 0,9 m\xB2",
    shortDescription: "Wytrzyma\u0142a p\u0142yta cementowa Knauf Aquapanel Outdoor 12,5 mm do zastosowa\u0144 zewn\u0119trznych i w pomieszczeniach o wysokiej wilgotno\u015Bci. Odporna na warunki atmosferyczne i wilgo\u0107.",
    description: "P\u0142yta cementowa Knauf Aquapanel Outdoor 12,5 mm to innowacyjne rozwi\u0105zanie budowlane przeznaczone do wszechstronnych zastosowa\u0144 zewn\u0119trznych oraz w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci, takich jak \u0142azienki czy kuchnie. Jej wyj\u0105tkowa odporno\u015B\u0107 na wilgo\u0107, ple\u015B\u0144 oraz czynniki atmosferyczne sprawia, \u017Ce jest idealnym materia\u0142em na elewacje, fasady wentylowane, coko\u0142y, pod\u0142ogi na gruncie, tarasy, balkony oraz zabudowy w strefach mokrych. P\u0142yta jest \u0142atwa w obr\xF3bce, przycinaniu i monta\u017Cu, co znacz\u0105co przyspiesza prace budowlane. Niska masa w\u0142asna (16,5 kg/m\xB2) u\u0142atwia transport i instalacj\u0119, a klasa ogniowa A1 gwarantuje najwy\u017Cszy poziom bezpiecze\u0144stwa po\u017Carowego. Knauf Aquapanel Outdoor to gwarancja trwa\u0142o\u015Bci i estetyki na lata.",
    application: "Stosuj Knauf Aquapanel Outdoor 12,5 mm jako podk\u0142ad pod systemy elewacyjne, fasady wentylowane, ok\u0142adziny \u015Bcienne w strefach mokrych (\u0142azienki, sauny), zabudowy taras\xF3w, balkon\xF3w, coko\u0142\xF3w oraz pod\u0142\xF3g na gruncie. Monta\u017C na konstrukcji drewnianej lub metalowej. Zapewnij odpowiednie podparcie i mocowanie zgodnie z zaleceniami producenta. Minimalna grubo\u015B\u0107 izolacji termicznej 80 mm.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "12,5 mm" },
      { label: "Wymiar", value: "1200 \xD7 750 mm" },
      { label: "Masa", value: "16,5 kg/m\xB2" },
      { label: "Klasa ogniowa", value: "A1" },
      { label: "Zastosowanie", value: "zewn\u0119trzne i mokre" }
    ],
    images: [],
    tags: [
      "p\u0142yta cementowa",
      "knauf",
      "aquapanel",
      "zewn\u0119trzna",
      "mokre pomieszczenia",
      "elewacja",
      "taras"
    ],
    related: ["p093", "p095", "p077"],
    advantages: [
      "Wyj\u0105tkowa odporno\u015B\u0107 na wilgo\u0107 i warunki atmosferyczne.",
      "Stabilno\u015B\u0107 wymiarowa i wysoka wytrzyma\u0142o\u015B\u0107 mechaniczna.",
      "Niepalno\u015B\u0107 (klasa A1) - podwy\u017Cszone bezpiecze\u0144stwo.",
      "Prosty i szybki monta\u017C, \u0142atwa obr\xF3bka."
    ],
    warnings: [
      "Stosuj dedykowane wkr\u0119ty i akcesoria Knauf Aquapanel.",
      "Zapewnij odpowiednie warunki podczas transportu i sk\u0142adowania, chroni\u0105c przed uszkodzeniami mechanicznymi."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety stosowania p\u0142yt Knauf Aquapanel Outdoor?", a: "G\u0142\xF3wne zalety to ekstremalna odporno\u015B\u0107 na wilgo\u0107 i warunki atmosferyczne, wysoka wytrzyma\u0142o\u015B\u0107, niepalno\u015B\u0107 (klasa A1) oraz \u0142atwo\u015B\u0107 i szybko\u015B\u0107 monta\u017Cu, co czyni je idealnym materia\u0142em do zastosowa\u0144 zewn\u0119trznych i w strefach mokrych." },
      { q: "Czy p\u0142yty Knauf Aquapanel Outdoor nadaj\u0105 si\u0119 do pomieszcze\u0144 o wysokiej wilgotno\u015Bci?", a: "Tak, p\u0142yty Aquapanel Outdoor s\u0105 specjalnie zaprojektowane do stosowania w miejscach o podwy\u017Cszonej wilgotno\u015Bci, takich jak \u0142azienki, prysznice, sauny, kuchnie, a tak\u017Ce na zewn\u0105trz budynk\xF3w." },
      { q: "Jaki jest spos\xF3b monta\u017Cu p\u0142yt Knauf Aquapanel Outdoor?", a: "P\u0142yty montuje si\u0119 na drewnianej lub metalowej konstrukcji no\u015Bnej za pomoc\u0105 specjalnych wkr\u0119t\xF3w do p\u0142yt cementowych. Wa\u017Cne jest zachowanie odpowiednich odst\u0119p\xF3w mi\u0119dzy wkr\u0119tami i dba\u0142o\u015B\u0107 o prawid\u0142owe po\u0142\u0105czenia." }
    ],
    seoDescription: "Szukasz niezawodnych p\u0142yt cementowych do fasady lub \u0142azienki? P\u0142yta cementowa Knauf Aquapanel Outdoor 12,5 mm to doskona\u0142y wyb\xF3r. Oferujemy p\u0142yty Aquapanel w atrakcyjnej cenie, idealne do elewacji, taras\xF3w, balkon\xF3w oraz pomieszcze\u0144 mokrych. Poznaj zalety p\u0142yt knauf aquapanel outdoor: wodoodporno\u015B\u0107, odporno\u015B\u0107 na ple\u015B\u0144, niepalno\u015B\u0107 (klasa A1), wysoka wytrzyma\u0142o\u015B\u0107. Monta\u017C p\u0142yt cementowych knauf jest szybki i \u0142atwy. Sprawd\u017A wymiary i parametry techniczne: grubo\u015B\u0107 12,5 mm, wymiar 1200x750 mm, masa 16,5 kg/m\xB2. P\u0142yta cementowa knauf outdoor - trwa\u0142e i nowoczesne rozwi\u0105zanie budowlane."
  },
  {
    id: "p097",
    slug: "profil-scienny-cw75-knauf-3m",
    name: "Profil \u015Bcienny CW 75 Knauf 3 m",
    categorySlug: "profile-sciana",
    brand: "Knauf",
    sku: "KNF-CW75-300",
    unit: "szt. 3 m",
    shortDescription: "Profil \u015Bcienny Knauf CW 75 o d\u0142ugo\u015Bci 3 m, wykonany z ocynkowanej stali o grubo\u015Bci 0,6 mm. Niezb\u0119dny element system\xF3w suchej zabudowy Knauf do tworzenia \u015Bcian dzia\u0142owych i ok\u0142adzin.",
    description: "Profil \u015Bcienny Knauf CW 75 to kluczowy komponent do budowy stabilnych i wytrzyma\u0142ych konstrukcji szkieletowych w technologii suchej zabudowy. Wykonany z wysokiej jako\u015Bci, ocynkowanej ogniowo stali o grubo\u015Bci 0,6 mm, zapewnia doskona\u0142\u0105 odporno\u015B\u0107 na korozj\u0119 i d\u0142ugowieczno\u015B\u0107. Profil CW 75 jest przeznaczony do tworzenia \u015Bcian dzia\u0142owych, ok\u0142adzin \u015Bciennych oraz sufit\xF3w podwieszanych. Jego precyzyjne wymiary i \u0142atwo\u015B\u0107 obr\xF3bki znacz\u0105co przyspieszaj\u0105 prace budowlane, a kompatybilno\u015B\u0107 z innymi elementami systemu Knauf gwarantuje sp\xF3jno\u015B\u0107 i niezawodno\u015B\u0107 ca\u0142ej konstrukcji. Idealny do zastosowa\u0144 w budownictwie mieszkaniowym, komercyjnym oraz przemys\u0142owym.",
    application: "Profil \u015Bcienny Knauf CW 75 stosuje si\u0119 jako pionowy element konstrukcji \u015Bcian dzia\u0142owych, ok\u0142adzin \u015Bciennych oraz sufit\xF3w podwieszanych w systemach suchej zabudowy Knauf. Montowany do profili UW za pomoc\u0105 wkr\u0119t\xF3w. Stosowa\u0107 wewn\u0105trz pomieszcze\u0144 o standardowej wilgotno\u015Bci. Nadaje si\u0119 do pod\u0142o\u017Cy betonowych, murowanych oraz \u015Bcianek gipsowo-kartonowych.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107 profilu", value: "75 mm" },
      { label: "Grubo\u015B\u0107 blachy", value: "0,6 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "3000 mm" },
      { label: "Stal", value: "ocynkowana gor\u0105co" }
    ],
    images: [],
    tags: [
      "profil \u015Bcienny",
      "knauf",
      "cw75",
      "sucha zabudowa",
      "stal ocynkowana",
      "\u015Bciana dzia\u0142owa"
    ],
    related: ["p093", "p098", "p099"],
    advantages: [
      "Wysoka wytrzyma\u0142o\u015B\u0107 i stabilno\u015B\u0107 konstrukcji szkieletowej.",
      "Odporno\u015B\u0107 na korozj\u0119 dzi\u0119ki ocynkowanej ogniowo stali.",
      "Szybki i \u0142atwy monta\u017C, oszcz\u0119dno\u015B\u0107 czasu i pracy.",
      "Kompatybilno\u015B\u0107 z pe\u0142n\u0105 gam\u0105 akcesori\xF3w system\xF3w Knauf."
    ],
    warnings: [
      "Nie stosowa\u0107 w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci lub nara\u017Conych na bezpo\u015Brednie dzia\u0142anie wody.",
      "Nale\u017Cy u\u017Cywa\u0107 odpowiednich wkr\u0119t\xF3w systemowych Knauf do po\u0142\u0105cze\u0144 profili."
    ],
    faq: [
      { q: "Jaka jest g\u0142\xF3wna funkcja profilu CW 75 w systemach suchej zabudowy?", a: "Profil CW 75 stanowi pionowy element konstrukcyjny szkieletu \u015Bcian dzia\u0142owych, ok\u0142adzin \u015Bciennych oraz sufit\xF3w podwieszanych. Jest podstaw\u0105 do monta\u017Cu p\u0142yt gipsowo-kartonowych i zapewnia stabilno\u015B\u0107 ca\u0142ej konstrukcji." },
      { q: "Z jakiego materia\u0142u wykonany jest profil Knauf CW 75?", a: "Profil wykonany jest z wysokiej jako\u015Bci stali ocynkowanej ogniowo, co zapewnia mu doskona\u0142\u0105 odporno\u015B\u0107 na korozj\u0119 i d\u0142ug\u0105 \u017Cywotno\u015B\u0107." },
      { q: "Jakie s\u0105 wymiary profilu \u015Bciennego CW 75?", a: "Profil posiada szeroko\u015B\u0107 75 mm, grubo\u015B\u0107 blachy 0,6 mm i standardow\u0105 d\u0142ugo\u015B\u0107 3000 mm. Dost\u0119pne s\u0105 r\xF3wnie\u017C inne d\u0142ugo\u015Bci w zale\u017Cno\u015Bci od potrzeb projektu." }
    ],
    seoDescription: "Kup profil \u015Bcienny Knauf CW 75 3m \u2013 solidny element do suchej zabudowy. Profile CW Knauf o szeroko\u015Bci 75 mm i grubo\u015Bci 0,6 mm z ocynkowanej stali to gwarancja wytrzyma\u0142o\u015Bci \u015Bcian dzia\u0142owych i ok\u0142adzin. Idealny do budowy konstrukcji szkieletowych w budownictwie mieszkaniowym i komercyjnym. \u0141atwy monta\u017C, wysoka odporno\u015B\u0107 na korozj\u0119, systemowe rozwi\u0105zania Knauf. Znajd\u017A najlepsze profile do suchej zabudowy, profile stalowe CW, profile do \u015Bcianek gipsowo-kartonowych. Zastosowanie w nowoczesnym budownictwie. Sprawd\u017A ceny profili Knauf CW 75 i zam\xF3w online. Niezawodne profile do budowy wn\u0119trz."
  },
  {
    id: "p098",
    slug: "profil-sufitowy-cd60-knauf-3m",
    name: "Profil sufitowy CD 60 Knauf 3 m",
    categorySlug: "profile-sufit",
    brand: "Knauf",
    sku: "KNF-CD60-300",
    unit: "szt. 3 m",
    shortDescription: "Profil sufitowy CD 60 Knauf 3 m to kluczowy element system\xF3w suchej zabudowy, przeznaczony do tworzenia konstrukcji sufit\xF3w podwieszanych. Gwarantuje stabilno\u015B\u0107 i trwa\u0142o\u015B\u0107.",
    description: "Profil sufitowy Knauf CD 60 o d\u0142ugo\u015Bci 3 metr\xF3w to niezast\u0105piony komponent w budowie nowoczesnych wn\u0119trz. Wykonany z wysokiej jako\u015Bci ocynkowanej blachy o grubo\u015Bci 0,6 mm, zapewnia wyj\u0105tkow\u0105 odporno\u015B\u0107 na korozj\u0119 i doskona\u0142\u0105 wytrzyma\u0142o\u015B\u0107 mechaniczn\u0105. Jest podstaw\u0105 do tworzenia stabilnych i trwa\u0142ych konstrukcji sufit\xF3w podwieszanych w technologii suchej zabudowy. Profil CD 60 jest kompatybilny z innymi elementami system\xF3w Knauf, co u\u0142atwia monta\u017C i pozwala na realizacj\u0119 r\xF3\u017Cnorodnych projekt\xF3w, od prostych sufit\xF3w po skomplikowane formy architektoniczne.",
    application: "Profil sufitowy CD 60 Knauf stosuje si\u0119 do budowy g\u0142\xF3wnych element\xF3w konstrukcyjnych sufit\xF3w podwieszanych w systemach suchej zabudowy. Monta\u017C odbywa si\u0119 do stropu lub \u015Bcian za pomoc\u0105 odpowiednich wieszak\xF3w i \u0142\u0105cznik\xF3w. Produkt przeznaczony jest do stosowania wewn\u0105trz pomieszcze\u0144 o standardowej wilgotno\u015Bci.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107 profilu", value: "60 mm" },
      { label: "Grubo\u015B\u0107 blachy", value: "0,6 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "3000 mm" },
      { label: "Monta\u017C", value: "sufit podwieszany" }
    ],
    images: [],
    tags: [
      "profil sufitowy",
      "knauf",
      "cd60",
      "sufit podwieszany",
      "sucha zabudowa",
      "ocynkowany"
    ],
    related: ["p097", "p093", "p099", "p144"],
    advantages: [
      "Solidna konstrukcja z ocynkowanej blachy zapewnia d\u0142ugowieczno\u015B\u0107.",
      "U\u0142atwia tworzenie stabilnych i r\xF3wnych powierzchni sufitowych.",
      "Szerokie zastosowanie w systemach suchej zabudowy.",
      "Wysoka precyzja wykonania gwarantuje \u0142atwy monta\u017C."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 zgodnie z instrukcj\u0105 producenta i normami budowlanymi.",
      "Unika\u0107 nadmiernego obci\u0105\u017Cenia konstrukcji ponad dopuszczalne normy."
    ],
    faq: [
      { q: "Do czego s\u0142u\u017Cy profil sufitowy CD 60?", a: "Profil sufitowy CD 60 Knauf s\u0142u\u017Cy jako g\u0142\xF3wny element konstrukcyjny do budowy sufit\xF3w podwieszanych w systemach suchej zabudowy. Jest podstaw\u0105, do kt\xF3rej mocuje si\u0119 p\u0142yty gipsowo-kartonowe." },
      { q: "Z jakiego materia\u0142u wykonany jest profil CD 60?", a: "Profil CD 60 Knauf wykonany jest z wysokiej jako\u015Bci ocynkowanej blachy stalowej o grubo\u015Bci 0,6 mm, co zapewnia mu odporno\u015B\u0107 na korozj\u0119 i wytrzyma\u0142o\u015B\u0107." },
      { q: "Jakie s\u0105 wymiary profilu Knauf CD 60?", a: "Profil Knauf CD 60 ma szeroko\u015B\u0107 60 mm, grubo\u015B\u0107 blachy 0,6 mm i standardow\u0105 d\u0142ugo\u015B\u0107 3000 mm (3 metry)." }
    ],
    seoDescription: "Szukasz solidnego profilu do sufitu podwieszanego? Poznaj profil sufitowy CD 60 Knauf 3 m \u2013 kluczowy element konstrukcji suchej zabudowy. Wykonany z ocynkowanej blachy o grubo\u015Bci 0,6 mm, gwarantuje stabilno\u015B\u0107 i trwa\u0142o\u015B\u0107 Twojego sufitu. Idealny do tworzenia r\xF3wnych powierzchni, \u0142atwy w monta\u017Cu i kompatybilny z systemami Knauf. Zam\xF3w profil CD 60 do budowy nowoczesnych wn\u0119trz, zapewniaj\u0105c sobie jako\u015B\u0107 i bezpiecze\u0144stwo. Doskona\u0142y wyb\xF3r dla profesjonalist\xF3w i majsterkowicz\xF3w."
  },
  {
    id: "p099",
    slug: "tasma-zbroiaca-knauf-50mm-75m",
    name: "Ta\u015Bma zbroj\u0105ca papierowa Knauf 50 mm / 75 m",
    categorySlug: "tasmy-sucha-zabudowa",
    brand: "Knauf",
    sku: "KNF-TASMA-50-75",
    unit: "rolka 75 m",
    shortDescription: "Papierowa ta\u015Bma zbroj\u0105ca Knauf 50mm/75m do profesjonalnego spoinowania p\u0142yt gipsowo-kartonowych. Zapewnia wytrzyma\u0142e i estetyczne po\u0142\u0105czenia w technologii suchej zabudowy.",
    description: "Ta\u015Bma zbroj\u0105ca papierowa Knauf o szeroko\u015Bci 50 mm i d\u0142ugo\u015Bci 75 metr\xF3w to niezast\u0105piony produkt w ka\u017Cdej nowoczesnej budowie, szczeg\xF3lnie w systemach suchej zabudowy. Wykonana z wysokiej jako\u015Bci papieru, charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105 i wytrzyma\u0142o\u015Bci\u0105, co gwarantuje trwa\u0142e i estetyczne wyko\u0144czenie spoin p\u0142yt gipsowo-kartonowych. Jej struktura zapobiega p\u0119kaniu i tworzeniu si\u0119 rys na powierzchniach, zapewniaj\u0105c jednolit\u0105 i g\u0142adk\u0105 p\u0142aszczyzn\u0119. Idealna do stosowania z g\u0142adziami i masami szpachlowymi Knauf, tworz\u0105c zintegrowany system wyko\u0144czeniowy. Niezb\u0119dna przy budowie \u015Bcian dzia\u0142owych, sufit\xF3w podwieszanych i zabud\xF3w poddaszy.",
    application: "Stosowana do zbrojenia i wzmacniania spoin mi\u0119dzy p\u0142ytami gipsowo-kartonowymi podczas prac wyko\u0144czeniowych wewn\u0105trz budynk\xF3w. Mo\u017Ce by\u0107 u\u017Cywana na wszystkich rodzajach p\u0142yt GK, r\xF3wnie\u017C tych o fazowanych kraw\u0119dziach. Nale\u017Cy j\u0105 aplikowa\u0107 na suche i czyste pod\u0142o\u017Ce, po na\u0142o\u017Ceniu pierwszej warstwy masy szpachlowej, dociskaj\u0105c j\u0105 r\xF3wnomiernie i usuwaj\u0105c nadmiar produktu.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107", value: "50 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "75 m" },
      { label: "Materia\u0142", value: "papier zbrojony" },
      { label: "Zastosowanie", value: "\u0142\u0105czenia p\u0142yt GK" }
    ],
    images: [],
    tags: [
      "ta\u015Bma zbroj\u0105ca",
      "knauf",
      "papierowa",
      "spoiny p\u0142yt gk",
      "sucha zabudowa",
      "spoinowanie"
    ],
    related: ["p093", "p097", "p098"],
    advantages: [
      "Wysoka wytrzyma\u0142o\u015B\u0107 mechaniczna na rozci\u0105ganie i p\u0119kanie.",
      "Doskona\u0142a przyczepno\u015B\u0107 do mas szpachlowych i p\u0142yt GK.",
      "Zapobiega powstawaniu rys i p\u0119kni\u0119\u0107 na spoinach.",
      "\u0141atwo\u015B\u0107 aplikacji i precyzyjne dopasowanie do spoin."
    ],
    warnings: [
      "Nie stosowa\u0107 w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci bez odpowiedniego zabezpieczenia.",
      "Przechowywa\u0107 w suchym miejscu, chroni\u0107 przed wilgoci\u0105 i uszkodzeniami mechanicznymi."
    ],
    faq: [
      { q: "Jak prawid\u0142owo na\u0142o\u017Cy\u0107 ta\u015Bm\u0119 zbroj\u0105c\u0105 Knauf?", a: "Po na\u0142o\u017Ceniu pierwszej warstwy masy szpachlowej na spoin\u0119, nale\u017Cy wtopi\u0107 w ni\u0105 ta\u015Bm\u0119, dociskaj\u0105c j\u0105 punktowo i rozprowadzaj\u0105c mas\u0119 r\xF3wnomiernie od \u015Brodka na zewn\u0105trz." },
      { q: "Czy ta\u015Bma papierowa nadaje si\u0119 do ka\u017Cdego rodzaju p\u0142yt GK?", a: "Tak, ta\u015Bma zbroj\u0105ca papierowa Knauf jest uniwersalna i nadaje si\u0119 do wszystkich typ\xF3w p\u0142yt gipsowo-kartonowych stosowanych w systemach suchej zabudowy." },
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety stosowania ta\u015Bmy zbroj\u0105cej?", a: "G\u0142\xF3wne zalety to zapobieganie p\u0119kni\u0119ciom i rysom na spoinach, zwi\u0119kszenie wytrzyma\u0142o\u015Bci po\u0142\u0105cze\u0144 oraz u\u0142atwienie uzyskania idealnie g\u0142adkiej powierzchni po szpachlowaniu." }
    ],
    seoDescription: "Papierowa ta\u015Bma zbroj\u0105ca Knauf 50 mm x 75 m to kluczowy element systemu suchej zabudowy, przeznaczony do profesjonalnego spoinowania p\u0142yt gipsowo-kartonowych. Zapewnia niezawodne wzmocnienie spoin, zapobiegaj\u0105c powstawaniu nieestetycznych rys i p\u0119kni\u0119\u0107, co jest niezwykle wa\u017Cne przy budowie \u015Bcian dzia\u0142owych, sufit\xF3w podwieszanych i zabud\xF3w poddaszy. Ta\u015Bma Knauf charakteryzuje si\u0119 doskona\u0142\u0105 przyczepno\u015Bci\u0105 do mas szpachlowych oraz \u0142atwo\u015Bci\u0105 aplikacji, co usprawnia prace wyko\u0144czeniowe. Jej wysoka wytrzyma\u0142o\u015B\u0107 mechaniczna gwarantuje trwa\u0142o\u015B\u0107 po\u0142\u0105cze\u0144, a papierowa struktura pozwala na uzyskanie g\u0142adkiej i jednolitej powierzchni. Idealne rozwi\u0105zanie dla fachowc\xF3w szukaj\u0105cych sprawdzone produkty do suchych tynk\xF3w i wyko\u0144cze\u0144 wn\u0119trz."
  },
  {
    id: "p100",
    slug: "naroznik-aluminiowy-25x25-2500mm",
    name: "Naro\u017Cnik aluminiowy 25\xD725 mm 2,5 m",
    categorySlug: "narozniki-aluminiowe",
    brand: "Knauf",
    sku: "KNF-NAR-ALU-25",
    unit: "szt. 2,5 m",
    shortDescription: "Naro\u017Cnik aluminiowy Knauf 25x25 mm, 2,5 m, z perforowanym skrzyde\u0142kiem. Idealny do ochrony i wzmacniania naro\u017Cy w systemach suchej zabudowy i tynkach.",
    description: "Naro\u017Cnik aluminiowy Knauf o wymiarach 25x25 mm i d\u0142ugo\u015Bci 2,5 m to niezawodne rozwi\u0105zanie do zabezpieczania i wzmacniania naro\u017Cy \u015Bcian i sufit\xF3w. Wykonany z anodowanego aluminium, cechuje si\u0119 wysok\u0105 odporno\u015Bci\u0105 na korozj\u0119 i uszkodzenia mechaniczne. Perforowane skrzyde\u0142ka zapewniaj\u0105 doskona\u0142e wi\u0105zanie z mas\u0105 szpachlow\u0105 lub tynkiem, tworz\u0105c trwa\u0142e i estetyczne wyko\u0144czenie. Jest to kluczowy element w systemach suchej zabudowy, jak r\xF3wnie\u017C przy tradycyjnych pracach tynkarskich, gwarantuj\u0105c proste i r\xF3wne linie.",
    application: "Stosuj na wewn\u0119trznych naro\u017Cach \u015Bcian i sufit\xF3w w budownictwie mieszkaniowym i komercyjnym. Produkt przeznaczony do monta\u017Cu przed na\u0142o\u017Ceniem g\u0142adzi, tynku lub mas szpachlowych. Naro\u017Cnik nale\u017Cy przyci\u0105\u0107 do odpowiedniej d\u0142ugo\u015Bci, nast\u0119pnie zamocowa\u0107 do pod\u0142o\u017Ca za pomoc\u0105 masy szpachlowej, rozprowadzaj\u0105c j\u0105 r\xF3wnomiernie po perforowanych skrzyd\u0142ach.",
    technicalSpec: [
      { label: "Wymiar", value: "25 \xD7 25 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "2500 mm" },
      { label: "Materia\u0142", value: "aluminium anodowane" },
      { label: "Siatka", value: "z perforowanym skrzyde\u0142kiem" }
    ],
    images: [],
    tags: [
      "naro\u017Cnik aluminiowy",
      "knauf",
      "sucha zabudowa",
      "tynk",
      "ochrona naro\u017Cnika",
      "alu"
    ],
    related: ["p097", "p093", "p055"],
    advantages: [
      "Skuteczna ochrona naro\u017Cy przed uszkodzeniami mechanicznymi.",
      "Zapewnia idealnie proste i r\xF3wne linie wyko\u0144czenia.",
      "Wysoka odporno\u015B\u0107 na korozj\u0119 dzi\u0119ki anodowanemu aluminium.",
      "\u0141atwy monta\u017C i doskona\u0142e wi\u0105zanie z masami szpachlowymi."
    ],
    warnings: [
      "Nie stosowa\u0107 w miejscach nara\u017Conych na sta\u0142e dzia\u0142anie wilgoci.",
      "Przechowywa\u0107 w suchym miejscu, z dala od bezpo\u015Bredniego s\u0142o\u0144ca."
    ],
    faq: [
      { q: "Jak zamontowa\u0107 naro\u017Cnik aluminiowy?", a: "Naro\u017Cnik przyci\u0105\u0107 do potrzebnej d\u0142ugo\u015Bci, a nast\u0119pnie na\u0142o\u017Cy\u0107 mas\u0119 szpachlow\u0105 na jego skrzyd\u0142a. Wcisn\u0105\u0107 naro\u017Cnik w warstw\u0119 masy na naro\u017Cniku \u015Bciany, docisn\u0105\u0107 i wyr\xF3wna\u0107. Nast\u0119pnie na\u0142o\u017Cy\u0107 kolejn\u0105 warstw\u0119 masy szpachlowej." },
      { q: "Do jakich rodzaj\xF3w powierzchni nadaje si\u0119 naro\u017Cnik?", a: "Naro\u017Cnik aluminiowy Knauf jest przeznaczony do stosowania na standardowych pod\u0142o\u017Cach budowlanych, takich jak tynk, beton, p\u0142yty gipsowo-kartonowe w ramach system\xF3w suchej zabudowy." },
      { q: "Czym r\xF3\u017Cni si\u0119 ten naro\u017Cnik od innych?", a: "Ten model posiada perforowane skrzyde\u0142ka, kt\xF3re gwarantuj\u0105 lepsze i trwalsze po\u0142\u0105czenie z mas\u0105 szpachlow\u0105 lub tynkiem, zapewniaj\u0105c wi\u0119ksz\u0105 stabilno\u015B\u0107 i odporno\u015B\u0107 wyko\u0144czenia." }
    ],
    seoDescription: "Szukasz naro\u017Cnika aluminiowego 25x25 mm 2,5 m od sprawdzonej marki Knauf? Idealny do suchej zabudowy i tynkowania! Nasz naro\u017Cnik z perforowanym skrzyde\u0142kiem z anodowanego aluminium skutecznie chroni naro\u017Ca \u015Bcian i sufit\xF3w przed uszkodzeniami, zapewniaj\u0105c przy tym idealnie proste i estetyczne wyko\u0144czenie. Niezb\u0119dny element do wzmocnienia kraw\u0119dzi w systemach G-K. Kup teraz trwa\u0142e i \u0142atwe w monta\u017Cu profile aluminiowe do budownictwa od Knauf."
  },
  // ─── p101–p144 (dachy, stropy, płytki, narzędzia, sufity) ────────────────────
  {
    id: "p101",
    slug: "dachowka-ceramiczna-braas-frankfurter",
    name: "Dach\xF3wka ceramiczna Braas Frankfurter Pfanne",
    categorySlug: "dachowki-ceramiczne",
    brand: "Braas",
    sku: "BRA-FRANK-1SZT",
    unit: "szt.",
    shortDescription: "Dach\xF3wka ceramiczna Braas Frankfurter Pfanne \u2013 klasyczny wyb\xF3r dla Twojego dachu. Trwa\u0142a, estetyczna i odporna na warunki atmosferyczne. Zapewnia d\u0142ugoletni\u0105 ochron\u0119 i stylowy wygl\u0105d.",
    description: "Dach\xF3wka ceramiczna Braas Frankfurter Pfanne to synonim tradycji i nowoczesno\u015Bci. Wykonana z najwy\u017Cszej jako\u015Bci gliny, zapewnia wyj\u0105tkow\u0105 trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na czynniki zewn\u0119trzne, takie jak mr\xF3z, deszcz czy promieniowanie UV. Jej charakterystyczny profil gwarantuje doskona\u0142e odprowadzanie wody i skuteczn\u0105 ochron\u0119 przed wilgoci\u0105. Dach\xF3wka Braas Frankfurter Pfanne dost\u0119pna jest w szerokiej gamie kolorystycznej, co pozwala na dopasowanie jej do ka\u017Cdej architektury. Jest to idealne rozwi\u0105zanie dla os\xF3b ceni\u0105cych sobie estetyk\u0119, funkcjonalno\u015B\u0107 i d\u0142ugowieczno\u015B\u0107 pokrycia dachowego. Wybieraj\u0105c dach\xF3wki Braas Frankfurter Pfanne, inwestujesz w spok\xF3j i bezpiecze\u0144stwo na lata.",
    application: "Dach\xF3wka ceramiczna Braas Frankfurter Pfanne przeznaczona jest do krycia dach\xF3w stromych o minimalnym nachyleniu 40% (ok. 22\xB0). Mo\u017Ce by\u0107 stosowana na nowych budynkach oraz przy renowacji istniej\u0105cych dach\xF3w. Odpowiednia dla budownictwa mieszkaniowego jednorodzinnego, wielorodzinnego oraz budynk\xF3w u\u017Cyteczno\u015Bci publicznej. Monta\u017C powinien by\u0107 przeprowadzony zgodnie z zaleceniami producenta, na odpowiednio przygotowanym deskowaniu lub ruszcie.",
    technicalSpec: [
      { label: "Pokrycie", value: "ok. 10 szt./m\xB2" },
      { label: "Waga", value: "3,5 kg/szt." },
      { label: "Klasa mrozu", value: "F2" },
      { label: "Nasi\u0105kliwo\u015B\u0107", value: "< 6%" }
    ],
    images: [],
    tags: [
      "dach\xF3wka ceramiczna",
      "braas",
      "frankfurter",
      "dach",
      "pokrycie",
      "ceramika"
    ],
    related: ["p102", "p103", "p109"],
    advantages: [
      "Wyj\u0105tkowa trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na warunki atmosferyczne, mr\xF3z i promieniowanie UV.",
      "Doskona\u0142e w\u0142a\u015Bciwo\u015Bci izolacyjne akustyczne i termiczne.",
      "Estetyczny wygl\u0105d i szeroka gama kolorystyczna dopasowana do ka\u017Cdej architektury.",
      "D\u0142ugowieczno\u015B\u0107 i wysoka jako\u015B\u0107 potwierdzona wieloletni\u0105 tradycj\u0105 marki Braas."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 odpowiednie akcesoria monta\u017Cowe Braas, aby zapewni\u0107 szczelno\u015B\u0107 i trwa\u0142o\u015B\u0107 dachu.",
      "Unika\u0107 chodzenia bezpo\u015Brednio po dach\xF3wkach, aby nie spowodowa\u0107 ich uszkodzenia."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety dach\xF3wki ceramicznej Braas Frankfurter Pfanne?", a: "G\u0142\xF3wne zalety to wysoka trwa\u0142o\u015B\u0107, odporno\u015B\u0107 na czynniki atmosferyczne, doskona\u0142e w\u0142a\u015Bciwo\u015Bci izolacyjne, estetyczny wygl\u0105d oraz d\u0142ugowieczno\u015B\u0107. Jest to inwestycja na lata, kt\xF3ra zapewnia ochron\u0119 i pi\u0119kno dachu." },
      { q: "Jaki jest wsp\xF3\u0142czynnik nasi\u0105kliwo\u015Bci tej dach\xF3wki?", a: "Wsp\xF3\u0142czynnik nasi\u0105kliwo\u015Bci dach\xF3wki Braas Frankfurter Pfanne wynosi poni\u017Cej 6%, co zapewnia jej wysok\u0105 odporno\u015B\u0107 na mr\xF3z i wilgo\u0107." },
      { q: "Ile sztuk dach\xF3wek potrzeba na 1m\xB2 dachu?", a: "Na pokrycie 1m\xB2 dachu potrzeba oko\u0142o 10 sztuk dach\xF3wek ceramicznych Braas Frankfurter Pfanne, co u\u0142atwia kalkulacj\u0119 materia\u0142u." }
    ],
    seoDescription: "Szukasz trwa\u0142ego i estetycznego pokrycia dachowego? Wybierz dach\xF3wk\u0119 ceramiczn\u0105 Braas Frankfurter Pfanne \u2013 klasyczny model ceniony za jako\u015B\u0107 i odporno\u015B\u0107. Pokrycie ok. 10 szt./m\xB2, waga 3,5 kg/szt., klasa mrozu F2, nasi\u0105kliwo\u015B\u0107 < 6%. Idealna na dachy strome, zapewnia doskona\u0142\u0105 izolacj\u0119 i d\u0142ugowieczno\u015B\u0107. Dost\u0119pna w wielu kolorach dla unikalnego wygl\u0105du Twojego domu. Sprawd\u017A ceny i dost\u0119pno\u015B\u0107 dach\xF3wek Braas Frankfurter Pfanne. Profesjonalne pokrycia dachowe dla wymagaj\u0105cych inwestor\xF3w. Zabezpiecz sw\xF3j dom na lata z najlepszymi materia\u0142ami."
  },
  {
    id: "p102",
    slug: "dachowka-betonowa-creaton-titania-szara",
    name: "Dach\xF3wka betonowa Creaton Titania szara",
    categorySlug: "dachowki-betonowe",
    brand: "Creaton",
    sku: "CRE-TIT-SZ-1SZT",
    unit: "szt.",
    shortDescription: "Dach\xF3wka betonowa Creaton Titania w kolorze szarym to trwa\u0142e i estetyczne pokrycie dachowe. Oferuje doskona\u0142\u0105 ochron\u0119 przed czynnikami atmosferycznymi i nowoczesny wygl\u0105d.",
    description: "Dach\xF3wka betonowa Creaton Titania w eleganckim odcieniu szaro\u015Bci to innowacyjne rozwi\u0105zanie dla nowoczesnych budynk\xF3w. Wykonana z wysokiej jako\u015Bci barwionego w masie betonu, zapewnia wyj\u0105tkow\u0105 trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na warunki atmosferyczne, takie jak deszcz, \u015Bnieg, promieniowanie UV i mr\xF3z. Jej g\u0142adka powierzchnia u\u0142atwia odprowadzanie wody i zapobiega osadzaniu si\u0119 zanieczyszcze\u0144. Dach\xF3wka Titania jest lekka (4,1 kg/szt.), co u\u0142atwia monta\u017C i zmniejsza obci\u0105\u017Cenie konstrukcji dachu. Zapewnia doskona\u0142\u0105 izolacj\u0119 akustyczn\u0105 i termiczn\u0105. Jest to idealny wyb\xF3r dla os\xF3b ceni\u0105cych sobie po\u0142\u0105czenie nowoczesnego designu, funkcjonalno\u015Bci i d\u0142ugowieczno\u015Bci.",
    application: "Dach\xF3wka betonowa Creaton Titania szara przeznaczona jest do krycia dach\xF3w o konstrukcji drewnianej lub stalowej. Stosowa\u0107 mo\u017Cna na dachach o minimalnym nachyleniu zgodnym z zaleceniami producenta, uwzgl\u0119dniaj\u0105c warunki klimatyczne i lokalne przepisy budowlane. Idealna do budownictwa mieszkaniowego, komercyjnego oraz obiekt\xF3w u\u017Cyteczno\u015Bci publicznej.",
    technicalSpec: [
      { label: "Pokrycie", value: "ok. 11 szt./m\xB2" },
      { label: "Waga", value: "4,1 kg/szt." },
      { label: "Grubo\u015B\u0107 blachy", value: "beton barwiony w masie" },
      { label: "Klasa ogniowa", value: "A1" }
    ],
    images: [],
    tags: [
      "dach\xF3wka betonowa",
      "creaton",
      "titania",
      "dach",
      "pokrycie",
      "szara"
    ],
    related: ["p101", "p103", "p109"],
    advantages: [
      "Wytrzyma\u0142o\u015B\u0107 i odporno\u015B\u0107 na warunki atmosferyczne.",
      "Nowoczesny, minimalistyczny design w odcieniu szaro\u015Bci.",
      "Dobra izolacja akustyczna i termiczna.",
      "\u0141atwo\u015B\u0107 monta\u017Cu i mniejsze obci\u0105\u017Cenie konstrukcji."
    ],
    warnings: [
      "Nale\u017Cy przestrzega\u0107 zalece\u0144 producenta dotycz\u0105cych monta\u017Cu i minimalnego k\u0105ta nachylenia dachu.",
      "Przed monta\u017Cem sprawdzi\u0107 stan techniczny wi\u0119\u017Aby dachowej i akcesori\xF3w."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety dach\xF3wki betonowej Creaton Titania?", a: "G\u0142\xF3wne zalety to wysoka trwa\u0142o\u015B\u0107, odporno\u015B\u0107 na warunki atmosferyczne, nowoczesny wygl\u0105d w kolorze szarym, dobra izolacja akustyczna i termiczna oraz stosunkowo niewielka waga, u\u0142atwiaj\u0105ca monta\u017C." },
      { q: "Jaka jest waga jednej dach\xF3wki Creaton Titania?", a: "Waga jednej dach\xF3wki Creaton Titania wynosi 4,1 kg." },
      { q: "Ile dach\xF3wek betonowych potrzeba na 1 metr kwadratowy dachu?", a: "Na pokrycie 1 metra kwadratowego dachu potrzeba oko\u0142o 11 sztuk dach\xF3wek betonowych Creaton Titania." }
    ],
    seoDescription: "Szukasz nowoczesnego pokrycia dachowego? Poznaj dach\xF3wk\u0119 betonow\u0105 Creaton Titania w kolorze szarym. Ta wysokiej jako\u015Bci dach\xF3wka betonowa charakteryzuje si\u0119 wyj\u0105tkow\u0105 trwa\u0142o\u015Bci\u0105 i odporno\u015Bci\u0105 na warunki atmosferyczne, zapewniaj\u0105c d\u0142ugoletni\u0105 ochron\u0119 Twojego domu. Pokrycie dachowe Creaton Titania jest \u0142atwe w monta\u017Cu (ok. 11 szt./m\xB2, 4,1 kg/szt.), oferuje doskona\u0142\u0105 izolacj\u0119 termiczn\u0105 i akustyczn\u0105, a jej minimalistyczny design doskonale komponuje si\u0119 z nowoczesn\u0105 architektur\u0105. Klasa ogniowa A1 zapewnia dodatkowe bezpiecze\u0144stwo. Wybierz Creaton Titania - stylowe i funkcjonalne rozwi\u0105zanie dla wymagaj\u0105cych inwestor\xF3w szukaj\u0105cych solidnych dach\xF3wek betonowych szarych."
  },
  {
    id: "p103",
    slug: "blachodachowka-modulowa-ruukki-classic",
    name: "Blachodach\xF3wka modu\u0142owa Ruukki Classic 0,5 mm",
    categorySlug: "pokrycia-blacha",
    brand: "Ruukki",
    sku: "RUU-CLASSIC-05",
    unit: "m\xB2",
    shortDescription: "Blachodach\xF3wka modu\u0142owa Ruukki Classic 0,5 mm z pow\u0142ok\u0105 Pural Matt 35 \xB5m. Trwa\u0142e i estetyczne pokrycie dachowe z 40-letni\u0105 gwarancj\u0105 na pow\u0142ok\u0119.",
    description: "Blachodach\xF3wka modu\u0142owa Ruukki Classic to nowoczesne i stylowe pokrycie dachowe, kt\xF3re \u0142\u0105czy w sobie elegancj\u0119 tradycyjnej dach\xF3wki z zaletami stali. Grubo\u015B\u0107 blachy 0,5 mm zapewnia wysok\u0105 wytrzyma\u0142o\u015B\u0107, a pow\u0142oka Pural Matt 35 \xB5m gwarantuje doskona\u0142\u0105 odporno\u015B\u0107 na korozj\u0119, promieniowanie UV i warunki atmosferyczne. Modu\u0142owy system monta\u017Cu u\u0142atwia i przyspiesza prace dekarskie, minimalizuj\u0105c ilo\u015B\u0107 odpad\xF3w. Ruukki Classic to idealny wyb\xF3r dla os\xF3b ceni\u0105cych sobie trwa\u0142o\u015B\u0107, estetyk\u0119 i d\u0142ugowieczno\u015B\u0107 dachu. Produkt obj\u0119ty jest 40-letni\u0105 gwarancj\u0105 na pow\u0142ok\u0119.",
    application: "Przeznaczona do krycia dach\xF3w sko\u015Bnych o minimalnym nachyleniu 14 stopni. Doskonale nadaje si\u0119 do budownictwa mieszkaniowego, obiekt\xF3w u\u017Cyteczno\u015Bci publicznej oraz renowacji istniej\u0105cych dach\xF3w. Monta\u017C mo\u017Cliwy w r\xF3\u017Cnych warunkach atmosferycznych, wymaga przygotowania odpowiedniego pod\u0142o\u017Ca (np. deskowania lub membrany dachowej).",
    technicalSpec: [
      { label: "Grubo\u015B\u0107 blachy", value: "0,5 mm" },
      { label: "Pow\u0142oka", value: "Pural Matt 35 \xB5m" },
      { label: "Modu\u0142", value: "350 \xD7 1190 mm" },
      { label: "Gwarancja na pow\u0142ok\u0119", value: "40 lat" }
    ],
    images: [],
    tags: [
      "blachodach\xF3wka",
      "ruukki",
      "classic",
      "modu\u0142owa",
      "stalowa",
      "pow\u0142oka pural"
    ],
    related: ["p101", "p102", "p107"],
    advantages: [
      "Wysoka estetyka imituj\u0105ca tradycyjn\u0105 dach\xF3wk\u0119.",
      "Doskona\u0142a odporno\u015B\u0107 na korozj\u0119 i warunki atmosferyczne dzi\u0119ki pow\u0142oce Pural Matt.",
      "Szybki i \u0142atwy monta\u017C dzi\u0119ki modu\u0142owej konstrukcji.",
      "D\u0142uga \u017Cywotno\u015B\u0107 i 40-letnia gwarancja na pow\u0142ok\u0119."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 odpowiednie akcesoria monta\u017Cowe i uszczelniaj\u0105ce.",
      "Unika\u0107 kontaktu z agresywnymi \u015Brodkami chemicznymi podczas czyszczenia."
    ],
    faq: [
      { q: "Jaka jest grubo\u015B\u0107 blachy w blachodach\xF3wce Ruukki Classic?", a: "Blachodach\xF3wka modu\u0142owa Ruukki Classic ma grubo\u015B\u0107 0,5 mm, co zapewnia jej odpowiedni\u0105 wytrzyma\u0142o\u015B\u0107 i sztywno\u015B\u0107." },
      { q: "Jakie s\u0105 wymiary modu\u0142u blachodach\xF3wki Ruukki Classic?", a: "Wymiary modu\u0142u blachodach\xF3wki Ruukki Classic wynosz\u0105 350 \xD7 1190 mm." },
      { q: "Jaki jest okres gwarancji na pow\u0142ok\u0119 Pural Matt?", a: "Na pow\u0142ok\u0119 Pural Matt 35 \xB5m producent udziela 40-letniej gwarancji, co \u015Bwiadczy o jej wysokiej jako\u015Bci i trwa\u0142o\u015Bci." }
    ],
    seoDescription: "Szukasz trwa\u0142ego i estetycznego pokrycia dachowego? Blachodach\xF3wka modu\u0142owa Ruukki Classic 0,5 mm to doskona\u0142y wyb\xF3r. Charakteryzuje si\u0119 grubo\u015Bci\u0105 blachy 0,5 mm i wysokiej jako\u015Bci pow\u0142ok\u0105 Pural Matt 35 \xB5m, kt\xF3ra zapewnia wieloletni\u0105 ochron\u0119 przed korozj\u0105 i czynnikami atmosferycznymi. Modu\u0142owy system monta\u017Cu 350 \xD7 1190 mm u\u0142atwia i przyspiesza prace dekarskie, co przek\u0142ada si\u0119 na ni\u017Csze koszty budowy. Ruukki Classic to po\u0142\u0105czenie nowoczesno\u015Bci z klasycznym wygl\u0105dem, idealne do nowych bud\xF3w i remont\xF3w. Ciesz si\u0119 spokojem przez 40 lat dzi\u0119ki gwarancji na pow\u0142ok\u0119. Odkryj pe\u0142n\u0105 gam\u0119 kolorystyczn\u0105 i zam\xF3w blachodach\xF3wk\u0119 Ruukki Classic ju\u017C dzi\u015B."
  },
  {
    id: "p104",
    slug: "gonty-bitumiczne-icopal-standard-plus",
    name: "Gonty bitumiczne Icopal Standard Plus",
    categorySlug: "gonty-bitumiczne",
    brand: "Icopal",
    sku: "ICP-STDPL-3M2",
    unit: "opak. 3 m\xB2",
    shortDescription: "Gonty bitumiczne Icopal Standard Plus to trwa\u0142e i estetyczne pokrycie dachowe o prostok\u0105tnym kszta\u0142cie. Zapewniaj\u0105 doskona\u0142\u0105 ochron\u0119 przed warunkami atmosferycznymi i s\u0105 \u0142atwe w monta\u017Cu.",
    description: "Gonty bitumiczne Icopal Standard Plus to innowacyjne rozwi\u0105zanie dla Twojego dachu. Charakteryzuj\u0105 si\u0119 wysok\u0105 trwa\u0142o\u015Bci\u0105, odporno\u015Bci\u0105 na UV i zmienne warunki pogodowe, zapewniaj\u0105c d\u0142ugoletni\u0105 ochron\u0119. Ich prostok\u0105tny kszta\u0142t i bogata paleta kolorystyczna pozwalaj\u0105 na stworzenie estetycznego i nowoczesnego wygl\u0105du dachu. Gonty Standard Plus s\u0105 \u0142atwe w transporcie i monta\u017Cu, co przyspiesza prace dekarskie. Doskonale nadaj\u0105 si\u0119 do krycia dach\xF3w o skomplikowanych kszta\u0142tach i stromych po\u0142aciach, minimalny spadek 15\xB0.  Wybieraj\u0105c gonty bitumiczne Icopal Standard Plus, inwestujesz w jako\u015B\u0107, bezpiecze\u0144stwo i pi\u0119kno Twojego domu.",
    application: "Gonty bitumiczne Icopal Standard Plus przeznaczone s\u0105 do krycia dach\xF3w sko\u015Bnych o minimalnym spadku po\u0142aci dachowej wynosz\u0105cym 15\xB0. Mog\u0105 by\u0107 stosowane na budynkach mieszkalnych, gospodarczych oraz obiektach u\u017Cyteczno\u015Bci publicznej. Nale\u017Cy je montowa\u0107 na stabilnym i sztywnym pod\u0142o\u017Cu, takim jak p\u0142yta OSB lub deski, zgodnie z zaleceniami producenta.",
    technicalSpec: [
      { label: "Wymiar paska", value: "1000 \xD7 340 mm" },
      { label: "Masa", value: "9,3 kg/m\xB2" },
      { label: "Spadek min.", value: "15\xB0" },
      { label: "Klasa ogniowa", value: "Broof(t1)" }
    ],
    images: [],
    tags: [
      "gonty bitumiczne",
      "icopal",
      "standard plus",
      "dach",
      "pokrycie",
      "bitumiczne",
      "prostok\u0105tne"
    ],
    related: ["p105", "p078", "p109"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na warunki atmosferyczne i promieniowanie UV.",
      "Estetyczny, prostok\u0105tny kszta\u0142t i szeroka gama kolor\xF3w.",
      "\u0141atwo\u015B\u0107 i szybko\u015B\u0107 monta\u017Cu, redukcja koszt\xF3w robocizny.",
      "Dobra izolacyjno\u015B\u0107 akustyczna i termiczna."
    ],
    warnings: [
      "Nie stosowa\u0107 na dachach o spadku poni\u017Cej 15 stopni.",
      "Przechowywa\u0107 w suchym i przewiewnym miejscu, chroni\u0105c przed bezpo\u015Brednim nas\u0142onecznieniem."
    ],
    faq: [
      { q: "Jakie s\u0105 wymiary pojedynczego gontu bitumicznego Icopal Standard Plus?", a: "Wymiar paska gontu bitumicznego Icopal Standard Plus wynosi 1000 mm d\u0142ugo\u015Bci i 340 mm szeroko\u015Bci, co u\u0142atwia jego transport i monta\u017C." },
      { q: "Jaka jest minimalna dopuszczalna przyczepno\u015B\u0107 gont\xF3w bitumicznych Icopal Standard Plus?", a: "Gonty bitumiczne Icopal Standard Plus wymagaj\u0105 minimalnego spadku po\u0142aci dachowej wynosz\u0105cego 15 stopni." },
      { q: "Jakie s\u0105 zalety stosowania gont\xF3w bitumicznych Icopal Standard Plus?", a: "G\u0142\xF3wne zalety to wysoka trwa\u0142o\u015B\u0107, odporno\u015B\u0107 na warunki atmosferyczne, \u0142atwy monta\u017C, atrakcyjny wygl\u0105d oraz dobra izolacyjno\u015B\u0107." }
    ],
    seoDescription: "Wybierz gonty bitumiczne Icopal Standard Plus dla swojego dachu! Oferujemy trwa\u0142e, estetyczne pokrycia dachowe o wymiarach 1000x340 mm, idealne na dachy o minimalnym spadku 15\xB0. Nasze gonty bitumiczne Icopal Standard Plus, klasa ogniowa Broof(t1), zapewniaj\u0105 doskona\u0142\u0105 ochron\u0119 przed deszczem, \u015Bniegiem i s\u0142o\u0144cem. Prosty monta\u017C i szeroka gama kolor\xF3w sprawi\u0105, \u017Ce Tw\xF3j dach b\u0119dzie prezentowa\u0142 si\u0119 nowocze\u015Bnie i stylowo. Poznaj zalety pokry\u0107 bitumicznych Icopal i postaw na jako\u015B\u0107, kt\xF3ra przetrwa lata. Idealne rozwi\u0105zanie dla ka\u017Cdego buduj\u0105cego i remontuj\u0105cego."
  },
  {
    id: "p105",
    slug: "papa-wierzchnia-icopal-mineral-10m2",
    name: "Papa termozgrzewalna wierzchnia Icopal Mineral 5,2 kg/m\xB2",
    categorySlug: "papy-dachowe",
    brand: "Icopal",
    sku: "ICP-MIN-VW-10",
    unit: "rolka 10 m\xB2",
    shortDescription: "Papa termozgrzewalna wierzchnia Icopal Mineral 5,2 kg/m\xB2 z posypk\u0105 mineraln\u0105. Idealna do krycia dach\xF3w p\u0142askich i sko\u015Bnych, zapewnia trwa\u0142o\u015B\u0107 i ochron\u0119.",
    description: "Papa termozgrzewalna wierzchnia Icopal Mineral to wysokiej jako\u015Bci materia\u0142 hydroizolacyjny przeznaczony do krycia dach\xF3w p\u0142askich i sko\u015Bnych. Dzi\u0119ki zastosowaniu grubej osnowy PG200 i posypki z \u0142upka mineralnego, papa charakteryzuje si\u0119 doskona\u0142\u0105 odporno\u015Bci\u0105 na uszkodzenia mechaniczne, promieniowanie UV oraz zmienne warunki atmosferyczne. Jest \u0142atwa w monta\u017Cu metod\u0105 termozgrzewania, co gwarantuje szczelno\u015B\u0107 i d\u0142ugowieczno\u015B\u0107 pokrycia dachowego. Idealnie nadaje si\u0119 jako warstwa wierzchnia w systemach hydroizolacyjnych.",
    application: "Stosowana jako warstwa wierzchnia w systemach pokry\u0107 dachowych na dachach p\u0142askich i sko\u015Bnych. Mo\u017Ce by\u0107 montowana na zagruntowanym pod\u0142o\u017Cu betonowym, drewnianym lub z p\u0142yt OSB, z u\u017Cyciem palnika gazowego. Zalecana do stosowania w temperaturach od +5\xB0C.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "5,2 mm" },
      { label: "Masa", value: "5,2 kg/m\xB2" },
      { label: "Posypka", value: "\u0142upek mineralny" },
      { label: "Wk\u0142adka", value: "PG200" }
    ],
    images: [],
    tags: [
      "papa wierzchnia",
      "icopal",
      "mineral",
      "termozgrzewalna",
      "dach p\u0142aski",
      "posypka"
    ],
    related: ["p078", "p104", "p109"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na uszkodzenia mechaniczne i promieniowanie UV dzi\u0119ki posypce mineralnej.",
      "Doskona\u0142a przyczepno\u015B\u0107 i szczelno\u015B\u0107 po zgrzaniu dzi\u0119ki specjalnej masie asfaltowej.",
      "D\u0142ugotrwa\u0142a ochrona przed wod\u0105 i wilgoci\u0105.",
      "\u0141atwy i szybki monta\u017C metod\u0105 termozgrzewania."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 odpowiednie \u015Brodki ochrony osobistej podczas pracy z palnikiem.",
      "Przechowywa\u0107 w pozycji pionowej, z dala od \u017Ar\xF3de\u0142 ciep\u0142a i ognia."
    ],
    faq: [
      { q: "Jaka jest g\u0142\xF3wna zaleta papy Icopal Mineral?", a: "G\u0142\xF3wn\u0105 zalet\u0105 jest wysoka odporno\u015B\u0107 na uszkodzenia mechaniczne i promieniowanie UV, zapewniona przez grub\u0105 posypk\u0119 z \u0142upka mineralnego, co przek\u0142ada si\u0119 na d\u0142ugowieczno\u015B\u0107 pokrycia." },
      { q: "Jak montuje si\u0119 pap\u0119 termozgrzewaln\u0105?", a: "Pap\u0119 montuje si\u0119 metod\u0105 termozgrzewania za pomoc\u0105 palnika gazowego, co pozwala na uzyskanie szczelnego i trwa\u0142ego po\u0142\u0105czenia z pod\u0142o\u017Cem." },
      { q: "Czy papa Icopal Mineral nadaje si\u0119 na dachy p\u0142askie?", a: "Tak, papa Icopal Mineral jest przeznaczona do krycia dach\xF3w p\u0142askich i sko\u015Bnych, stanowi\u0105c skuteczn\u0105 hydroizolacj\u0119." }
    ],
    seoDescription: "Papa termozgrzewalna wierzchnia Icopal Mineral 5,2 kg/m\xB2 to niezawodne rozwi\u0105zanie do hydroizolacji dach\xF3w p\u0142askich i sko\u015Bnych. Wytrzyma\u0142a osnowa PG200 i naturalna posypka mineralna zapewniaj\u0105 odporno\u015B\u0107 na warunki atmosferyczne i uszkodzenia. Monta\u017C metod\u0105 termozgrzewania gwarantuje pe\u0142n\u0105 szczelno\u015B\u0107. Idealna papa wierzchnia dla wymagaj\u0105cych inwestor\xF3w szukaj\u0105cych trwa\u0142ego pokrycia dachowego. Wybierz pap\u0119 icopal mineral dla swojego dachu. Sprawd\u017A cen\u0119 i dost\u0119pno\u015B\u0107 papy dachowej icopal."
  },
  {
    id: "p106",
    slug: "okno-dachowe-velux-ggl-78x118",
    name: "Okno dachowe Velux GGL 78\xD7118 cm drewniane",
    categorySlug: "okna-dachowe-std",
    brand: "Velux",
    sku: "VEL-GGL-M06",
    unit: "szt.",
    shortDescription: "Drewniane okno dachowe Velux GGL 78x118 cm (M06) z szyb\u0105 P2A, obrotowe. Idealne do poddaszy ocieplonych, zapewniaj\u0105ce komfort i bezpiecze\u0144stwo.",
    description: "Odkryj okno dachowe Velux GGL w rozmiarze 78x118 cm (M06), wykonane z wysokiej jako\u015Bci drewna. Model GGL to synonim trwa\u0142o\u015Bci i estetyki, doskonale sprawdzaj\u0105cy si\u0119 na poddaszach ocieplonych. Dwuszybowa szyba P2A gwarantuje dobre w\u0142a\u015Bciwo\u015Bci termoizolacyjne (Uw: 1,3 W/(m\xB2\xB7K)) oraz zwi\u0119kszone bezpiecze\u0144stwo. Funkcja obrotowego otwierania u\u0142atwia zar\xF3wno monta\u017C, jak i p\xF3\u017Aniejsze u\u017Cytkowanie oraz mycie okna. To doskona\u0142y wyb\xF3r dla os\xF3b ceni\u0105cych naturalne materia\u0142y i funkcjonalne rozwi\u0105zania.",
    application: "Okno dachowe Velux GGL 78x118 cm przeznaczone jest do monta\u017Cu w dachach sko\u015Bnych o odpowiednim nachyleniu, zgodnie z instrukcj\u0105 producenta. Zalecane do stosowania w budynkach mieszkalnych i u\u017Cyteczno\u015Bci publicznej, na poddaszach ocieplonych. Monta\u017C wymaga zastosowania odpowiednich akcesori\xF3w monta\u017Cowych do dach\xF3w sko\u015Bnych.",
    technicalSpec: [
      { label: "Rozmiar", value: "78 \xD7 118 cm (M06)" },
      { label: "Szyba", value: "dwuszybowa P2A" },
      { label: "Uw", value: "1,3 W/(m\xB2\xB7K)" },
      { label: "Otwieranie", value: "obrotowe" }
    ],
    images: [],
    tags: [
      "okno dachowe",
      "velux",
      "ggl",
      "drewniane",
      "poddasze",
      "ocieplone"
    ],
    related: ["p107", "p109", "p079"],
    advantages: [
      "Wysokiej jako\u015Bci drewno sosnowe impregnowane ci\u015Bnieniowo.",
      "Dwuszybowa szyba P2A zapewniaj\u0105ca bezpiecze\u0144stwo i izolacj\u0119.",
      "Funkcjonalne otwieranie obrotowe u\u0142atwiaj\u0105ce obs\u0142ug\u0119 i mycie.",
      "Optymalna izolacyjno\u015B\u0107 termiczna dla komfortu na poddaszu."
    ],
    warnings: [
      "Przed monta\u017Cem zapoznaj si\u0119 z instrukcj\u0105 producenta.",
      "Wymaga zastosowania dedykowanych akcesori\xF3w do monta\u017Cu w dachu."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety okna Velux GGL 78x118 cm?", a: "G\u0142\xF3wne zalety to wysokiej jako\u015Bci drewniana konstrukcja, dwuszybowa szyba P2A zapewniaj\u0105ca bezpiecze\u0144stwo, funkcja obrotowego otwierania u\u0142atwiaj\u0105ca u\u017Cytkowanie oraz dobra izolacyjno\u015B\u0107 termiczna." },
      { q: "Czy okno nadaje si\u0119 do ka\u017Cdego typu dachu?", a: "Okno Velux GGL jest przeznaczone do monta\u017Cu w dachach sko\u015Bnych o odpowiednim nachyleniu. Wymaga zastosowania dedykowanych akcesori\xF3w monta\u017Cowych." },
      { q: "Jaki jest wsp\xF3\u0142czynnik przenikania ciep\u0142a okna?", a: "Wsp\xF3\u0142czynnik przenikania ciep\u0142a (Uw) dla tego okna wynosi 1,3 W/(m\xB2\xB7K), co \u015Bwiadczy o jego dobrych w\u0142a\u015Bciwo\u015Bciach termoizolacyjnych." }
    ],
    seoDescription: "Szukasz solidnego i estetycznego okna dachowego na poddasze? Okno dachowe Velux GGL 78x118 cm (M06) to idealny wyb\xF3r. Wykonane z naturalnego, impregnowanego drewna sosnowego, gwarantuje trwa\u0142o\u015B\u0107 i przyjemny klimat wn\u0119trza. Szyba dwuwarstwowa P2A zapewnia bezpiecze\u0144stwo u\u017Cytkowania, a wsp\xF3\u0142czynnik przenikania ciep\u0142a Uw = 1,3 W/(m\xB2\xB7K) dba o komfort termiczny. Obrotowy system otwierania u\u0142atwia konserwacj\u0119 i wietrzenie. Dedykowane do dach\xF3w ocieplonych, okna Velux GGL to synonim jako\u015Bci i funkcjonalno\u015Bci. Sprawd\u017A ju\u017C dzi\u015B okno dachowe drewniane GGL do swojego poddasza."
  },
  {
    id: "p107",
    slug: "rynna-stalowa-ruukki-125mm-antracyt-3m",
    name: "Rynna stalowa Ruukki 125 mm antracyt 3 m",
    categorySlug: "rynny-blacha",
    brand: "Ruukki",
    sku: "RUU-RYN-125-ANT-3",
    unit: "szt. 3 m",
    shortDescription: "Wytrzyma\u0142a rynna stalowa Ruukki 125 mm w kolorze antracytowym (RAL 7016). Wykonana z grubej blachy 0,6 mm z pow\u0142ok\u0105 Pural 35 \xB5m, zapewnia d\u0142ugotrwa\u0142\u0105 ochron\u0119 przed korozj\u0105.",
    description: "System rynnowy Ruukki 125 mm w eleganckim kolorze antracytowym (RAL 7016) to synonim trwa\u0142o\u015Bci i niezawodno\u015Bci. Wykonana z wysokiej jako\u015Bci stali o grubo\u015Bci 0,6 mm, rynna jest odporna na uszkodzenia mechaniczne i zmienne warunki atmosferyczne. Zaawansowana pow\u0142oka Pural o grubo\u015Bci 35 \xB5m gwarantuje doskona\u0142\u0105 ochron\u0119 antykorozyjn\u0105 i utrzymanie intensywnego koloru przez wiele lat. Ten system rynnowy to idealne rozwi\u0105zanie dla wymagaj\u0105cych inwestor\xF3w, ceni\u0105cych sobie estetyk\u0119 po\u0142\u0105czon\u0105 z d\u0142ugowieczno\u015Bci\u0105.",
    application: "Rynna stalowa Ruukki 125 mm antracyt znajduje zastosowanie w odprowadzaniu wody deszczowej z dach\xF3w budynk\xF3w mieszkalnych, gospodarczych i komercyjnych. Monta\u017C jest prosty i intuicyjny, najlepiej na stabilnych elementach konstrukcji dachu. System dzia\u0142a efektywnie w szerokim zakresie temperatur, zapewniaj\u0105c niezawodne dzia\u0142anie.",
    technicalSpec: [
      { label: "\u015Arednica", value: "125 mm" },
      { label: "Kolor", value: "antracyt RAL 7016" },
      { label: "Grubo\u015B\u0107 blachy", value: "0,6 mm" },
      { label: "Pow\u0142oka", value: "Pural 35 \xB5m" }
    ],
    images: [],
    tags: [
      "rynna stalowa",
      "ruukki",
      "125mm",
      "antracyt",
      "system rynnowy",
      "blacha powlekana"
    ],
    related: ["p108", "p103", "p106"],
    advantages: [
      "Wyj\u0105tkowa odporno\u015B\u0107 na korozj\u0119 i warunki atmosferyczne.",
      "Wysoka wytrzyma\u0142o\u015B\u0107 mechaniczna dzi\u0119ki grubo\u015Bci blachy 0,6 mm.",
      "Estetyczny, g\u0142\u0119boki kolor antracytowy (RAL 7016) pasuj\u0105cy do nowoczesnej architektury.",
      "D\u0142ugowieczno\u015B\u0107 i bezproblemowa eksploatacja przez wiele lat."
    ],
    warnings: [
      "Zaleca si\u0119 stosowanie oryginalnych akcesori\xF3w Ruukki do monta\u017Cu.",
      "Nale\u017Cy unika\u0107 kontaktu z agresywnymi \u015Brodkami chemicznymi i ostrymi narz\u0119dziami."
    ],
    faq: [
      { q: "Jaka jest grubo\u015B\u0107 blachy u\u017Cytej do produkcji rynny Ruukki?", a: "Rynna stalowa Ruukki 125 mm posiada grubo\u015B\u0107 blachy wynosz\u0105c\u0105 0,6 mm, co zapewnia jej wysok\u0105 wytrzyma\u0142o\u015B\u0107 i odporno\u015B\u0107 na odkszta\u0142cenia." },
      { q: "Jaki jest typ pow\u0142oki ochronnej rynny?", a: "Rynna jest pokryta pow\u0142ok\u0105 Pural o grubo\u015Bci 35 \xB5m, kt\xF3ra zapewnia doskona\u0142\u0105 ochron\u0119 antykorozyjn\u0105 i stabilno\u015B\u0107 koloru." },
      { q: "Czy kolor antracytowy jest standardowy?", a: "Tak, kolor antracytowy RAL 7016 jest popularnym i cz\u0119sto stosowanym kolorem w systemach rynnowych Ruukki, idealnie komponuj\u0105cym si\u0119 z nowoczesnymi fasadami." }
    ],
    seoDescription: "Szukasz solidnego i estetycznego systemu rynnowego? Rynna stalowa Ruukki 125 mm w kolorze antracyt RAL 7016 to doskona\u0142y wyb\xF3r. Wykonana z blachy o grubo\u015Bci 0,6 mm z pow\u0142ok\u0105 Pural 35 \xB5m, zapewnia niezawodn\u0105 ochron\u0119 przed korozj\u0105 i d\u0142ugotrwa\u0142y efekt wizualny. Idealna do odprowadzania wody z dach\xF3w, odporna na warunki atmosferyczne. Sprawd\u017A trwa\u0142e rynny stalowe Ruukki, systemy rynnowe antracyt, rynny 125mm, blach\u0119 powlekan\u0105 dla Twojego domu."
  },
  {
    id: "p108",
    slug: "rynna-pvc-gamrat-125mm-braz-3m",
    name: "Rynna PVC Gamrat 125 mm br\u0105z 3 m",
    categorySlug: "rynny-pvc",
    brand: "Gamrat",
    sku: "GAM-RYN-PVC-125-BRZ-3",
    unit: "szt. 3 m",
    shortDescription: "Trwa\u0142a rynna PVC Gamrat 125 mm w kolorze br\u0105zowym, o d\u0142ugo\u015Bci 3 metr\xF3w. Idealne rozwi\u0105zanie do efektywnego odprowadzania wody deszczowej z dach\xF3w.",
    description: "System rynnowy Gamrat w kolorze br\u0105zowym to wyb\xF3r, kt\xF3ry \u0142\u0105czy estetyk\u0119 z funkcjonalno\u015Bci\u0105. Wykonana z wysokiej jako\u015Bci PVC-U rynna o \u015Brednicy 125 mm i d\u0142ugo\u015Bci 3 metr\xF3w zapewnia doskona\u0142\u0105 odporno\u015B\u0107 na korozj\u0119, promieniowanie UV i zmienne warunki atmosferyczne. Jest to ekonomiczne i d\u0142ugowieczne rozwi\u0105zanie dla dom\xF3w jednorodzinnych, budynk\xF3w gospodarczych oraz obiekt\xF3w przemys\u0142owych. \u0141atwy monta\u017C i kompatybilno\u015B\u0107 z innymi elementami systemu Gamrat gwarantuj\u0105 szybkie i sprawne wykonanie instalacji odprowadzaj\u0105cej wod\u0119 deszczow\u0105, chroni\u0105c fundamenty i elewacj\u0119 przed zawilgoceniem.",
    application: "System rynnowy Gamrat 125 mm br\u0105zowy przeznaczony jest do monta\u017Cu na dachach budynk\xF3w mieszkalnych, gospodarczych i us\u0142ugowych. Stosowa\u0107 na stabilnych wi\u0119\u017Abach dachowych, z zachowaniem odpowiednich spadk\xF3w zapewniaj\u0105cych swobodny przep\u0142yw wody. Produkt nadaje si\u0119 do u\u017Cytku w zakresie temperatur od -40\xB0C do +60\xB0C. Monta\u017C zalecany na uchwytach dedykowanych do danego typu pokrycia dachowego i konstrukcji.",
    technicalSpec: [
      { label: "\u015Arednica", value: "125 mm" },
      { label: "Kolor", value: "br\u0105z" },
      { label: "Materia\u0142", value: "PVC-U" },
      { label: "Norma", value: "PN-EN 607" }
    ],
    images: [],
    tags: [
      "rynna pvc",
      "gamrat",
      "125mm",
      "br\u0105z",
      "system rynnowy",
      "plastikowa"
    ],
    related: ["p107", "p103", "p106"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na czynniki atmosferyczne i promieniowanie UV.",
      "Trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na korozj\u0119 dzi\u0119ki materia\u0142owi PVC-U.",
      "Estetyczny wygl\u0105d i uniwersalny br\u0105zowy kolor.",
      "Prosty i szybki monta\u017C, kompatybilno\u015B\u0107 z systemem Gamrat."
    ],
    warnings: [
      "Nie stosowa\u0107 w pobli\u017Cu \u017Ar\xF3de\u0142 otwartego ognia.",
      "Nale\u017Cy przestrzega\u0107 zalece\u0144 producenta dotycz\u0105cych monta\u017Cu."
    ],
    faq: [
      { q: "Jak prawid\u0142owo zamontowa\u0107 rynn\u0119 Gamrat 125 mm?", a: "Monta\u017C rynny Gamrat 125 mm powinien odbywa\u0107 si\u0119 zgodnie z instrukcj\u0105 producenta. Nale\u017Cy zapewni\u0107 odpowiedni spadek rynny w kierunku rury spustowej oraz u\u017Cy\u0107 dedykowanych uchwyt\xF3w." },
      { q: "Jaka jest odporno\u015B\u0107 rynny br\u0105zowej Gamrat na blakni\u0119cie?", a: "Rynny Gamrat wykonane z PVC-U charakteryzuj\u0105 si\u0119 wysok\u0105 odporno\u015Bci\u0105 na promieniowanie UV, co minimalizuje ryzyko blakni\u0119cia koloru br\u0105zowego pod wp\u0142ywem s\u0142o\u0144ca." },
      { q: "Czy rynna PVC Gamrat nadaje si\u0119 do monta\u017Cu w niskich temperaturach?", a: "Tak, system rynnowy Gamrat jest odporny na dzia\u0142anie niskich temperatur, zachowuj\u0105c swoje w\u0142a\u015Bciwo\u015Bci w zakresie od -40\xB0C do +60\xB0C." }
    ],
    seoDescription: "Szukasz trwa\u0142ego i estetycznego systemu rynnowego? Rynna PVC Gamrat 125 mm w kolorze br\u0105zowym to doskona\u0142y wyb\xF3r dla Twojego domu. Oferujemy wysokiej jako\u015Bci rynny plastikowe Gamrat o d\u0142ugo\u015Bci 3 metr\xF3w, wykonane z odpornego na warunki atmosferyczne PVC-U. Nasze systemy rynnowe zapewniaj\u0105 efektywne odprowadzanie wody deszczowej, chroni\u0105c fundamenty i elewacj\u0119. Sprawd\u017A niezawodne rozwi\u0105zania Gamrat dla dach\xF3w \u2013 rynny br\u0105zowe 125mm idealnie dopasuj\u0105 si\u0119 do Twojego budynku. Dost\u0119pne s\u0105 r\xF3wnie\u017C inne elementy systemu rynnowego Gamrat."
  },
  {
    id: "p109",
    slug: "membrana-dachowa-fakro-amv-200-75m2",
    name: "Membrana dachowa Fakro AMV 200 75 m\xB2",
    categorySlug: "membrany-dachowe",
    brand: "Fakro",
    sku: "FAK-AMV200-75",
    unit: "rolka 75 m\xB2",
    shortDescription: "Tr\xF3jwarstwowa membrana dachowa Fakro AMV 200 o gramaturze 200 g/m\xB2. Zapewnia doskona\u0142\u0105 paroprzepuszczalno\u015B\u0107 i ochron\u0119 dachu sko\u015Bnego. Idealna do krycia wst\u0119pnego.",
    description: "Membrana dachowa Fakro AMV 200 to wysokiej jako\u015Bci, tr\xF3jwarstwowa membrana dedykowana do dach\xF3w sko\u015Bnych. Jej wyj\u0105tkowa paroprzepuszczalno\u015B\u0107 (Sd < 0,02 m) umo\u017Cliwia efektywne odprowadzanie wilgoci z izolacji, zapobiegaj\u0105c jej zawilgoceniu i degradacji. Wysoka wytrzyma\u0142o\u015B\u0107 na rozci\u0105ganie (\u2265 500/400 N/5cm) gwarantuje trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na uszkodzenia mechaniczne podczas monta\u017Cu i u\u017Cytkowania. Membrana Fakro AMV 200 stanowi doskona\u0142e krycie wst\u0119pne, chroni\u0105c konstrukcj\u0119 dachu przed deszczem, \u015Bniegiem i wiatrem, jednocze\u015Bnie pozwalaj\u0105c na dyfuzj\u0119 pary wodnej na zewn\u0105trz. Jej szeroko\u015B\u0107 1,5 m u\u0142atwia monta\u017C, a 3-miesi\u0119czna stabilno\u015B\u0107 UV zapewnia bezpiecze\u0144stwo podczas prac dekarskich.",
    application: "Membrana Fakro AMV 200 przeznaczona jest do stosowania jako krycie wst\u0119pne pod pokrycia dachowe na dachach sko\u015Bnych. Mo\u017Ce by\u0107 uk\u0142adana bezpo\u015Brednio na krokwiach lub na izolacji termicznej. Zapewnia skuteczn\u0105 ochron\u0119 przed czynnikami atmosferycznymi w trakcie budowy i eksploatacji dachu. Nale\u017Cy j\u0105 montowa\u0107 zgodnie z zaleceniami producenta, zapewniaj\u0105c odpowiednie zak\u0142adki i uszczelnienie.",
    technicalSpec: [
      { label: "Sd", value: "< 0,02 m (tr\xF3jwarstwowa)" },
      { label: "Wytrzyma\u0142o\u015B\u0107", value: "\u2265 500/400 N/5cm" },
      { label: "Szeroko\u015B\u0107", value: "1,5 m" },
      { label: "UV-stabilno\u015B\u0107", value: "3 miesi\u0105ce" }
    ],
    images: [],
    tags: [
      "membrana dachowa",
      "fakro",
      "amv 200",
      "paroprzepuszczalna",
      "krycie wst\u0119pne",
      "dach sko\u015Bny"
    ],
    related: ["p079", "p106", "p075"],
    advantages: [
      "Wysoka paroprzepuszczalno\u015B\u0107, zapobiega kondensacji wilgoci w izolacji.",
      "Du\u017Ca wytrzyma\u0142o\u015B\u0107 mechaniczna, odporna na uszkodzenia podczas monta\u017Cu.",
      "Skuteczna ochrona przed deszczem, \u015Bniegiem i wiatrem.",
      "U\u0142atwia monta\u017C dzi\u0119ki optymalnej szeroko\u015Bci i gramaturze."
    ],
    warnings: [
      "Nale\u017Cy chroni\u0107 przed nadmiernym promieniowaniem UV po up\u0142ywie 3 miesi\u0119cy od monta\u017Cu.",
      "Unika\u0107 kontaktu z ostrymi narz\u0119dziami i substancjami chemicznymi."
    ],
    faq: [
      { q: "Jaka jest g\u0142\xF3wna funkcja membrany dachowej Fakro AMV 200?", a: "G\u0142\xF3wn\u0105 funkcj\u0105 membrany jest zapewnienie krycia wst\u0119pnego dachu sko\u015Bnego. Chroni konstrukcj\u0119 przed wilgoci\u0105 i zapewnia paroprzepuszczalno\u015B\u0107, odprowadzaj\u0105c wilgo\u0107 z izolacji na zewn\u0105trz." },
      { q: "Czy membrana AMV 200 jest odporna na warunki atmosferyczne?", a: "Tak, membrana AMV 200 jest odporna na deszcz, \u015Bnieg i wiatr. Posiada r\xF3wnie\u017C stabilno\u015B\u0107 UV przez 3 miesi\u0105ce, co jest istotne podczas prac dekarskich." },
      { q: "Jakie s\u0105 zalety stosowania tej membrany w por\xF3wnaniu do tradycyjnych rozwi\u0105za\u0144?", a: "Zalety to wysoka paroprzepuszczalno\u015B\u0107, kt\xF3ra zapobiega zawilgoceniu izolacji, du\u017Ca wytrzyma\u0142o\u015B\u0107 mechaniczna oraz \u0142atwo\u015B\u0107 monta\u017Cu. Zapewnia d\u0142ugotrwa\u0142\u0105 ochron\u0119 dachu." }
    ],
    seoDescription: "Szukasz solidnej membrany dachowej do swojego domu? Membrana dachowa Fakro AMV 200 to tr\xF3jwarstwowe rozwi\u0105zanie o gramaturze 200 g/m\xB2, kt\xF3re zapewni niezawodne krycie wst\u0119pne dla dach\xF3w sko\u015Bnych. Z parametrem Sd < 0,02 m, ta paroprzepuszczalna membrana efektywnie odprowadza wilgo\u0107, chroni\u0105c izolacj\u0119 i konstrukcj\u0119 dachu. Wytrzyma\u0142o\u015B\u0107 na rozci\u0105ganie \u2265 500/400 N/5cm gwarantuje jej trwa\u0142o\u015B\u0107. Szeroko\u015B\u0107 1,5 m u\u0142atwia monta\u017C, a stabilno\u015B\u0107 UV przez 3 miesi\u0105ce czyni j\u0105 praktyczn\u0105 w u\u017Cyciu. Idealna do zastosowania w nowoczesnym budownictwie, zapewniaj\u0105c d\u0142ugotrwa\u0142\u0105 ochron\u0119 i komfort cieplny. Kup ju\u017C dzi\u015B membran\u0119 Fakro AMV 200 i zadbaj o szczelno\u015B\u0107 swojego dachu!"
  },
  {
    id: "p110",
    slug: "podbitka-dachowa-pvc-200mm-biala-3m",
    name: "Podbitka dachowa PVC 200 mm bia\u0142a 3 m",
    categorySlug: "podbitki-dachowe",
    brand: "Gamrat",
    sku: "GAM-POD-PVC-200-3",
    unit: "szt. 3 m",
    shortDescription: "Podbitka dachowa PVC Gamrat 200 mm bia\u0142a 3 m to trwa\u0142e i estetyczne rozwi\u0105zanie do wyko\u0144czenia okapu dachu. Odporna na warunki atmosferyczne, \u0142atwa w monta\u017Cu.",
    description: "Podbitka dachowa PVC marki Gamrat w kolorze bia\u0142ym to idealny wyb\xF3r do profesjonalnego wyko\u0144czenia okapu Twojego domu. Z szeroko\u015Bci\u0105 200 mm i d\u0142ugo\u015Bci\u0105 3 m, panele te zapewniaj\u0105 szybki i efektywny monta\u017C, jednocze\u015Bnie nadaj\u0105c elewacji nowoczesny i schludny wygl\u0105d. Wykonana z wysokiej jako\u015Bci PVC, podbitka jest odporna na promieniowanie UV, wilgo\u0107 i zmiany temperatury, co gwarantuje jej d\u0142ugowieczno\u015B\u0107 i niezmienny kolor przez lata. To doskona\u0142a ochrona dla poddasza i wi\u0119\u017Aby dachowej przed czynnikami zewn\u0119trznymi, a tak\u017Ce stylowy element podkre\u015Blaj\u0105cy estetyk\u0119 budynku. Wybierz podbitk\u0119 Gamrat dla trwa\u0142ego i pi\u0119knego wyko\u0144czenia.",
    application: "Podbitka dachowa PVC Gamrat przeznaczona jest do monta\u017Cu pod okapami dach\xF3w sko\u015Bnych w budownictwie mieszkaniowym i komercyjnym. Stosowana na konstrukcjach drewnianych lub metalowych, zapewnia wentylacj\u0119 po\u0142aci dachowej oraz estetyczne wyko\u0144czenie. Nadaje si\u0119 do stosowania na zewn\u0105trz, w ka\u017Cdych warunkach atmosferycznych.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107", value: "200 mm" },
      { label: "Kolor", value: "bia\u0142y" },
      { label: "Grubo\u015B\u0107", value: "10 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "3000 mm" }
    ],
    images: [],
    tags: [
      "podbitka dachowa",
      "gamrat",
      "pvc",
      "bia\u0142a",
      "okap",
      "elewacja"
    ],
    related: ["p107", "p103", "p101"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na warunki atmosferyczne i promieniowanie UV.",
      "Estetyczny, bia\u0142y kolor zachowuj\u0105cy blask przez lata.",
      "Szybki i \u0142atwy monta\u017C dzi\u0119ki systemowi pi\xF3ro-wpust.",
      "Trwa\u0142o\u015B\u0107 i d\u0142ugowieczno\u015B\u0107 materia\u0142u PVC."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 zgodnie z zaleceniami producenta dotycz\u0105cymi monta\u017Cu.",
      "Unika\u0107 kontaktu z silnymi rozpuszczalnikami, kt\xF3re mog\u0105 uszkodzi\u0107 powierzchni\u0119."
    ],
    faq: [
      { q: "Jakie s\u0105 wymiary pojedynczego panelu podbitki?", a: "Pojedynczy panel podbitki dachowej PVC Gamrat ma szeroko\u015B\u0107 200 mm, grubo\u015B\u0107 10 mm i d\u0142ugo\u015B\u0107 3000 mm." },
      { q: "Czy podbitka jest odporna na blakni\u0119cie?", a: "Tak, podbitka wykonana z PVC jest odporna na promieniowanie UV, co zapobiega blakni\u0119ciu koloru bia\u0142ego i zapewnia jego trwa\u0142o\u015B\u0107 przez d\u0142ugie lata." },
      { q: "Jakie narz\u0119dzia s\u0105 potrzebne do monta\u017Cu podbitki?", a: "Do monta\u017Cu podbitki potrzebne s\u0105 podstawowe narz\u0119dzia, takie jak pi\u0142a do ci\u0119cia tworzyw, wkr\u0119tarka, miarka, poziomica oraz elementy monta\u017Cowe (wkr\u0119ty, listwy)." }
    ],
    seoDescription: "Szukasz trwa\u0142ej i estetycznej podbitki dachowej? Wybierz podbitk\u0119 dachow\u0105 PVC Gamrat 200 mm w kolorze bia\u0142ym, d\u0142ugo\u015B\u0107 3 m. Idealne rozwi\u0105zanie do wyko\u0144czenia okapu, chroni\u0105ce przed wilgoci\u0105 i zapewniaj\u0105ce wentylacj\u0119. Bia\u0142a podbitka PVC Gamrat to odporno\u015B\u0107 na warunki atmosferyczne, UV i \u0142atwo\u015B\u0107 monta\u017Cu. Doskonale sprawdzi si\u0119 w ka\u017Cdym domu, podkre\u015Blaj\u0105c jego elewacj\u0119. Znajd\u017A najlepsze panele podbitkowe PVC Gamrat do swojego projektu budowlanego. Podbitka dachowa bia\u0142a, Gamrat PVC, wyko\u0144czenie okapu, materia\u0142y budowlane, elewacja domu."
  },
  {
    id: "p111",
    slug: "bloczek-ytong-pp2-24cm",
    name: "Bloczek z betonu kom\xF3rkowego Ytong PP2-0,4 24 cm",
    categorySlug: "bloczki-beton-komorkowy",
    brand: "Ytong",
    sku: "YTG-PP2-24",
    unit: "szt.",
    shortDescription: "Bloczek Ytong PP2-0,4 o grubo\u015Bci 24 cm to lekki i wytrzyma\u0142y materia\u0142 budowlany, idealny do wznoszenia \u015Bcian no\u015Bnych i dzia\u0142owych. Zapewnia doskona\u0142\u0105 izolacyjno\u015B\u0107 termiczn\u0105 i akustyczn\u0105.",
    description: "Bloczek z betonu kom\xF3rkowego Ytong PP2-0,4 o wymiarach 600 \xD7 240 \xD7 200 mm to innowacyjne rozwi\u0105zanie dla nowoczesnego budownictwa. Charakteryzuje si\u0119 nisk\u0105 g\u0119sto\u015Bci\u0105 (400 kg/m\xB3) oraz bardzo dobrym wsp\xF3\u0142czynnikiem lambda \u03BB = 0,10 W/(m\xB7K), co przek\u0142ada si\u0119 na znakomit\u0105 izolacyjno\u015B\u0107 termiczn\u0105 i redukcj\u0119 koszt\xF3w ogrzewania. Klasa wytrzyma\u0142o\u015Bci CS 2,0 gwarantuje stabilno\u015B\u0107 konstrukcji, umo\u017Cliwiaj\u0105c stosowanie bloczk\xF3w Ytong do budowy \u015Bcian no\u015Bnych. Precyzyjne wymiary i g\u0142adkie powierzchnie u\u0142atwiaj\u0105 monta\u017C, przyspieszaj\u0105c prace budowlane i minimalizuj\u0105c zu\u017Cycie zaprawy. To ekologiczny i bezpieczny materia\u0142 budowlany.",
    application: "Bloczki Ytong PP2-0,4 24 cm przeznaczone s\u0105 do budowy \u015Bcian zewn\u0119trznych i wewn\u0119trznych no\u015Bnych oraz dzia\u0142owych w budownictwie jednorodzinnym i wielorodzinnym. Mog\u0105 by\u0107 stosowane w pomieszczeniach o r\xF3\u017Cnej wilgotno\u015Bci. Monta\u017C powinien odbywa\u0107 si\u0119 na zaprawie cienkowarstwowej do betonu kom\xF3rkowego, zgodnie z zaleceniami producenta.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "240 mm" },
      { label: "Wymiar", value: "600 \xD7 240 \xD7 200 mm" },
      { label: "G\u0119sto\u015B\u0107", value: "400 kg/m\xB3" },
      { label: "Lambda \u03BB", value: "0,10 W/(m\xB7K)" },
      { label: "Klasa wytrzyma\u0142o\u015Bci", value: "CS 2,0" }
    ],
    images: [],
    tags: [
      "bloczek ytong",
      "beton kom\xF3rkowy",
      "pp2",
      "\u015Bciana no\u015Bna",
      "izolacyjny",
      "gazobeton"
    ],
    related: ["p112", "p113", "p058"],
    advantages: [
      "Doskona\u0142a izolacyjno\u015B\u0107 termiczna i akustyczna.",
      "Wysoka wytrzyma\u0142o\u015B\u0107 przy niskiej g\u0119sto\u015Bci.",
      "Szybki i \u0142atwy monta\u017C dzi\u0119ki precyzyjnym wymiarom.",
      "Ekologiczny i przyjazny dla zdrowia materia\u0142 budowlany."
    ],
    warnings: [
      "Przechowywa\u0107 w suchym miejscu, chroni\u0107 przed wilgoci\u0105.",
      "Stosowa\u0107 zalecan\u0105 zapraw\u0119 cienkowarstwow\u0105 do betonu kom\xF3rkowego."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety bloczk\xF3w Ytong PP2-0,4 24 cm?", a: "G\u0142\xF3wne zalety to doskona\u0142a izolacyjno\u015B\u0107 termiczna i akustyczna, wysoka wytrzyma\u0142o\u015B\u0107 przy niskiej g\u0119sto\u015Bci, szybko\u015B\u0107 i \u0142atwo\u015B\u0107 monta\u017Cu oraz ekologiczny charakter produktu." },
      { q: "Do jakich typ\xF3w \u015Bcian mo\u017Cna zastosowa\u0107 bloczki Ytong PP2-0,4 24 cm?", a: "Bloczki te nadaj\u0105 si\u0119 do budowy \u015Bcian zewn\u0119trznych i wewn\u0119trznych no\u015Bnych oraz dzia\u0142owych." },
      { q: "Jaka zaprawa jest zalecana do monta\u017Cu bloczk\xF3w Ytong?", a: "Do monta\u017Cu bloczk\xF3w Ytong PP2-0,4 24 cm zalecana jest zaprawa cienkowarstwowa przeznaczona specjalnie do betonu kom\xF3rkowego." }
    ],
    seoDescription: "Kup bloczek z betonu kom\xF3rkowego Ytong PP2-0,4 o grubo\u015Bci 24 cm. Lekki gazobeton Ytong 600x240x200 mm (g\u0119sto\u015B\u0107 400 kg/m\xB3, lambda 0,10 W/(m\xB7K), klasa CS 2,0) to idealny materia\u0142 do budowy energooszcz\u0119dnych \u015Bcian no\u015Bnych i izolacyjnych. Zapewnia doskona\u0142\u0105 izolacj\u0119 termiczn\u0105, akustyczn\u0105 i szybki monta\u017C. Dost\u0119pne bloczki Ytong PP2 na \u015Bciany zewn\u0119trzne i wewn\u0119trzne. Sprawd\u017A cen\u0119 i opinie o bloczkach betonowych Ytong."
  },
  {
    id: "p112",
    slug: "bloczek-silikatowy-silka-e24",
    name: "Bloczek silikatowy Silka E24 24 cm",
    categorySlug: "bloczki-silikatowe",
    brand: "Silka",
    sku: "SLK-E24-240",
    unit: "szt.",
    shortDescription: "Bloczek silikatowy Silka E24 o grubo\u015Bci 24 cm, idealny do budowy \u015Bcian no\u015Bnych i dzia\u0142owych. Zapewnia doskona\u0142\u0105 izolacyjno\u015B\u0107 akustyczn\u0105 i termiczn\u0105.",
    description: "Bloczek silikatowy Silka E24 to nowoczesny materia\u0142 budowlany o grubo\u015Bci 240 mm, ceniony za wyj\u0105tkow\u0105 trwa\u0142o\u015B\u0107, wytrzyma\u0142o\u015B\u0107 i doskona\u0142e w\u0142a\u015Bciwo\u015Bci izolacyjne. Wykonany z naturalnych surowc\xF3w: piasku, wapna i wody, bloczek ten gwarantuje zdrowy mikroklimat w pomieszczeniach. Jego wysoka g\u0119sto\u015B\u0107 (1800 kg/m\xB3) przek\u0142ada si\u0119 na znakomit\u0105 izolacyjno\u015B\u0107 akustyczn\u0105, czyni\u0105c go idealnym wyborem dla \u015Bcian wymagaj\u0105cych t\u0142umienia ha\u0142asu. Klasa wytrzyma\u0142o\u015Bci CS 15 pozwala na stosowanie go w konstrukcjach no\u015Bnych. Bloczek Silka E24 to synonim solidno\u015Bci i energooszcz\u0119dno\u015Bci w budownictwie.",
    application: "Bloczek silikatowy Silka E24 przeznaczony jest do murowania \u015Bcian zewn\u0119trznych i wewn\u0119trznych, zar\xF3wno no\u015Bnych, jak i dzia\u0142owych. Doskonale sprawdza si\u0119 w budownictwie mieszkaniowym, u\u017Cyteczno\u015Bci publicznej oraz przemys\u0142owym. Mo\u017Ce by\u0107 stosowany w budynkach o r\xF3\u017Cnej konstrukcji, w tym jako element \u015Bcian akustycznych. Nadaje si\u0119 do stosowania w warunkach zewn\u0119trznych i wewn\u0119trznych, na pod\u0142o\u017Cach stabilnych i odpowiednio przygotowanych.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "240 mm" },
      { label: "Wymiar", value: "333 \xD7 240 \xD7 198 mm" },
      { label: "G\u0119sto\u015B\u0107", value: "1800 kg/m\xB3" },
      { label: "Klasa wytrzyma\u0142o\u015Bci", value: "CS 15" }
    ],
    images: [],
    tags: [
      "bloczek silikatowy",
      "silka",
      "e24",
      "\u015Bciana akustyczna",
      "szczelny",
      "wapienno-piaskowy"
    ],
    related: ["p111", "p113", "p058"],
    advantages: [
      "Wysoka wytrzyma\u0142o\u015B\u0107 mechaniczna i stabilno\u015B\u0107 konstrukcji.",
      "Doskona\u0142e w\u0142a\u015Bciwo\u015Bci izolacji akustycznej, t\u0142umi ha\u0142as.",
      "Bardzo dobra izolacyjno\u015B\u0107 termiczna, redukuje straty ciep\u0142a.",
      "Ekologiczny materia\u0142, przyjazny dla zdrowia i \u015Brodowiska."
    ],
    warnings: [
      "Przechowywa\u0107 w suchym miejscu, chroni\u0107 przed wilgoci\u0105.",
      "Stosowa\u0107 odpowiednie \u015Brodki ochrony osobistej podczas pracy."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety bloczk\xF3w silikatowych Silka E24?", a: "Bloczki Silka E24 charakteryzuj\u0105 si\u0119 wysok\u0105 wytrzyma\u0142o\u015Bci\u0105, doskona\u0142\u0105 izolacyjno\u015Bci\u0105 akustyczn\u0105 i termiczn\u0105, a tak\u017Ce s\u0105 ekologiczne i zdrowe dla u\u017Cytkownik\xF3w." },
      { q: "Do jakich rodzaj\xF3w \u015Bcian mo\u017Cna stosowa\u0107 bloczki Silka E24?", a: "Mo\u017Cna je stosowa\u0107 do budowy \u015Bcian no\u015Bnych zewn\u0119trznych i wewn\u0119trznych, \u015Bcian dzia\u0142owych oraz \u015Bcian akustycznych." },
      { q: "Jaka jest klasa wytrzyma\u0142o\u015Bci bloczk\xF3w Silka E24?", a: "Klasa wytrzyma\u0142o\u015Bci bloczk\xF3w Silka E24 wynosi CS 15, co pozwala na ich zastosowanie w konstrukcjach no\u015Bnych." }
    ],
    seoDescription: "Szukasz solidnych i energooszcz\u0119dnych materia\u0142\xF3w budowlanych? Bloczek silikatowy Silka E24 o grubo\u015Bci 24 cm to idealny wyb\xF3r. Oferuje wyj\u0105tkow\u0105 izolacyjno\u015B\u0107 akustyczn\u0105, chroni\u0105c przed ha\u0142asem, oraz dobr\u0105 izolacyjno\u015B\u0107 termiczn\u0105, zmniejszaj\u0105c rachunki za ogrzewanie. Naturalny sk\u0142ad bloczka wapienno-piaskowego zapewnia zdrowy mikroklimat. Klasa wytrzyma\u0142o\u015Bci CS 15 pozwala na budow\u0119 \u015Bcian no\u015Bnych. Zastosuj bloczki Silka E24 do \u015Bcian zewn\u0119trznych, wewn\u0119trznych, dzia\u0142owych i akustycznych. Trwa\u0142o\u015B\u0107, ekologia i wysoka jako\u015B\u0107 \u2013 to synonimy Silka E24."
  },
  {
    id: "p113",
    slug: "pustak-ceramiczny-max-25-pw",
    name: "Pustak ceramiczny MAX 25 P+W",
    categorySlug: "pustaki-ceramiczne",
    brand: "Porotherm",
    sku: "PTH-MAX25-PW",
    unit: "szt.",
    shortDescription: "Pustak ceramiczny Porotherm MAX 25 P+W o grubo\u015Bci 250 mm, \u0142\u0105czony na pi\xF3ro i wpust, idealny do budowy energooszcz\u0119dnych \u015Bcian zewn\u0119trznych.",
    description: "Pustak ceramiczny Porotherm MAX 25 P+W to innowacyjne rozwi\u0105zanie dla nowoczesnego budownictwa. Grubo\u015B\u0107 250 mm oraz niski wsp\xF3\u0142czynnik lambda \u03BB=0,17 W/(m\xB7K) zapewniaj\u0105 doskona\u0142e w\u0142a\u015Bciwo\u015Bci termoizolacyjne, redukuj\u0105c straty ciep\u0142a i koszty ogrzewania. System pi\xF3ra i wpustu (P+W) eliminuje potrzeb\u0119 stosowania zaprawy pionowej, co znacz\u0105co przyspiesza proces budowy i poprawia szczelno\u015B\u0107 muru. Klasa wytrzyma\u0142o\u015Bci CS 8 gwarantuje stabilno\u015B\u0107 konstrukcyjn\u0105. Idealny do budowy \u015Bcian zewn\u0119trznych no\u015Bnych i dzia\u0142owych w budownictwie jednorodzinnym i wielorodzinnym.",
    application: "Stosuj do budowy \u015Bcian zewn\u0119trznych no\u015Bnych oraz wewn\u0119trznych \u015Bcian dzia\u0142owych. Pod\u0142o\u017Ce powinno by\u0107 stabilne, suche i czyste. Przeznaczony do murowania na cienkowarstwow\u0105 zapraw\u0119 ceramiczn\u0105. Odpowiedni do budowy dom\xF3w jednorodzinnych, budynk\xF3w wielorodzinnych oraz obiekt\xF3w u\u017Cyteczno\u015Bci publicznej.",
    technicalSpec: [
      { label: "Grubo\u015B\u0107", value: "250 mm" },
      { label: "Wymiar", value: "250 \xD7 380 \xD7 238 mm" },
      { label: "Lambda \u03BB", value: "0,17 W/(m\xB7K)" },
      { label: "Klasa wytrzyma\u0142o\u015Bci", value: "CS 8" }
    ],
    images: [],
    tags: [
      "pustak ceramiczny",
      "porotherm",
      "max 25",
      "pi\xF3ro i wpust",
      "\u015Bciana zewn\u0119trzna",
      "blok ceramiczny"
    ],
    related: ["p111", "p112", "p116"],
    advantages: [
      "Doskona\u0142a izolacyjno\u015B\u0107 termiczna dzi\u0119ki niskiemu lambda.",
      "Szybko\u015B\u0107 i \u0142atwo\u015B\u0107 murowania dzi\u0119ki systemowi pi\xF3ro-wpust.",
      "Oszcz\u0119dno\u015B\u0107 materia\u0142u (brak zaprawy na spoinach pionowych).",
      "Wysoka wytrzyma\u0142o\u015B\u0107 i trwa\u0142o\u015B\u0107 konstrukcji."
    ],
    warnings: [
      "Przechowywa\u0107 w suchym miejscu, chroni\u0105c przed wilgoci\u0105.",
      "Stosowa\u0107 odpowiednie \u015Brodki ochrony indywidualnej podczas monta\u017Cu."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety pustaka Porotherm MAX 25 P+W?", a: "G\u0142\xF3wne zalety to wysoka izolacyjno\u015B\u0107 termiczna, szybko\u015B\u0107 monta\u017Cu dzi\u0119ki pi\xF3rom i wpustom, oszcz\u0119dno\u015B\u0107 zaprawy oraz wysoka wytrzyma\u0142o\u015B\u0107 konstrukcji." },
      { q: "Do jakich \u015Bcian najlepiej nadaje si\u0119 ten pustak?", a: "Pustak MAX 25 P+W jest idealny do budowy \u015Bcian zewn\u0119trznych no\u015Bnych oraz wewn\u0119trznych \u015Bcian dzia\u0142owych, zapewniaj\u0105c doskona\u0142e parametry cieplne." },
      { q: "Jaki rodzaj zaprawy nale\u017Cy stosowa\u0107 do murowania pustak\xF3w Porotherm?", a: "Zaleca si\u0119 stosowanie cienkowarstwowej zaprawy ceramicznej przeznaczonej do pustak\xF3w systemowych Porotherm, kt\xF3ra zapewnia optymalne parametry i szybko\u015B\u0107 prac." }
    ],
    seoDescription: "Pustak ceramiczny Porotherm MAX 25 P+W to nowoczesny blok ceramiczny o wymiarach 250 \xD7 380 \xD7 238 mm i grubo\u015Bci 250 mm. Doskona\u0142y do budowy energooszcz\u0119dnych \u015Bcian zewn\u0119trznych dzi\u0119ki niskiemu wsp\xF3\u0142czynnikowi lambda \u03BB=0,17 W/(m\xB7K). System pi\xF3ro-wpust (P+W) u\u0142atwia i przyspiesza murowanie, eliminuj\u0105c potrzeb\u0119 zaprawy pionowej. Blok ceramiczny o klasie wytrzyma\u0142o\u015Bci CS 8 zapewnia solidno\u015B\u0107 konstrukcji. Wybierz pustaki Porotherm dla trwa\u0142ego i ciep\u0142ego domu. Idealny wyb\xF3r dla buduj\u0105cych domy jednorodzinne oraz wielorodzinne."
  },
  {
    id: "p114",
    slug: "belka-stropowa-betonowa-bm14-600cm",
    name: "Belka stropowa betonowa BM 14 600 cm",
    categorySlug: "belki-stropowe-betonowe",
    brand: "Wienerberger",
    sku: "WIE-BM14-600",
    unit: "szt.",
    shortDescription: "Belka stropowa betonowa Wienerberger BM 14 o d\u0142ugo\u015Bci 600 cm. Solidne rozwi\u0105zanie konstrukcyjne do strop\xF3w g\u0119sto\u017Cebrowych, wykonane z betonu C25/30 i stali zbrojeniowej St 500.",
    description: "Belka stropowa betonowa Wienerberger BM 14 to niezawodny element konstrukcyjny przeznaczony do budowy strop\xF3w g\u0119sto\u017Cebrowych. D\u0142ugo\u015B\u0107 600 cm pozwala na elastyczne dopasowanie do projektowanych rozpi\u0119to\u015Bci. Wykonana z wysokiej jako\u015Bci betonu klasy C25/30 i wzmocniona stal\u0105 zbrojeniow\u0105 St 500, gwarantuje doskona\u0142\u0105 wytrzyma\u0142o\u015B\u0107 i trwa\u0142o\u015B\u0107. Belki te charakteryzuj\u0105 si\u0119 precyzyjnym wykonaniem, co u\u0142atwia monta\u017C i zapewnia stabilno\u015B\u0107 ca\u0142ej konstrukcji stropowej. Idealne rozwi\u0105zanie dla budownictwa mieszkaniowego i komercyjnego.",
    application: "Belka stropowa BM 14 przeznaczona jest do stosowania w stropach g\u0119sto\u017Cebrowych, zar\xF3wno w budownictwie jednorodzinnym, jak i wielorodzinnym. Monta\u017C powinien odbywa\u0107 si\u0119 zgodnie z projektem budowlanym, na odpowiednio przygotowanych podporach. Zaleca si\u0119 stosowanie w warunkach budowlanych z zachowaniem zasad bezpiecze\u0144stwa i ochrony pracy.",
    technicalSpec: [
      { label: "D\u0142ugo\u015B\u0107", value: "600 cm" },
      { label: "Rozstaw co", value: "600 mm" },
      { label: "Beton", value: "C25/30" },
      { label: "Stal zbrojeniowa", value: "St 500" }
    ],
    images: [],
    tags: [
      "belka stropowa",
      "betonowa",
      "bm 14",
      "strop g\u0119sto\u017Cebrowy",
      "wienerberger",
      "konstrukcja"
    ],
    related: ["p115", "p111", "p117"],
    advantages: [
      "Wysoka wytrzyma\u0142o\u015B\u0107 dzi\u0119ki zastosowaniu betonu C25/30 i stali St 500.",
      "Precyzyjne wymiary u\u0142atwiaj\u0105ce szybki i bezproblemowy monta\u017C.",
      "Solidna konstrukcja zapewniaj\u0105ca bezpiecze\u0144stwo i trwa\u0142o\u015B\u0107 stropu.",
      "Uniwersalne zastosowanie w stropach g\u0119sto\u017Cebrowych."
    ],
    warnings: [
      "Monta\u017C powinien by\u0107 przeprowadzany przez wykwalifikowany personel.",
      "Nale\u017Cy stosowa\u0107 si\u0119 do zalece\u0144 projektowych i norm budowlanych."
    ],
    faq: [
      { q: "Jakie jest g\u0142\xF3wne zastosowanie belki stropowej BM 14?", a: "Belka stropowa BM 14 jest przeznaczona g\u0142\xF3wnie do budowy strop\xF3w g\u0119sto\u017Cebrowych. Stanowi kluczowy element no\u015Bny w tego typu konstrukcjach." },
      { q: "Z jakich materia\u0142\xF3w wykonana jest belka BM 14?", a: "Belka wykonana jest z betonu klasy C25/30 oraz stali zbrojeniowej klasy St 500, co zapewnia jej wysok\u0105 wytrzyma\u0142o\u015B\u0107 i trwa\u0142o\u015B\u0107." },
      { q: "Czy belka BM 14 nadaje si\u0119 do wi\u0119kszych rozpi\u0119to\u015Bci?", a: "Dzi\u0119ki parametrom technicznym, belka o d\u0142ugo\u015Bci 600 cm mo\u017Ce by\u0107 stosowana do odpowiednio zaprojektowanych rozpi\u0119to\u015Bci, zgodnie z obliczeniami statycznymi." }
    ],
    seoDescription: "Szukasz solidnej belki stropowej betonowej do swojego projektu? Belka stropowa Wienerberger BM 14 o d\u0142ugo\u015Bci 600 cm to gwarancja jako\u015Bci i bezpiecze\u0144stwa. Idealna do strop\xF3w g\u0119sto\u017Cebrowych, wykonana z betonu C25/30 i stali zbrojeniowej St 500. Sprawd\u017A parametry techniczne i zastosowanie tej wysokiej jako\u015Bci belki konstrukcyjnej. Belka BM 14 od renomowanego producenta Wienerberger to pewny wyb\xF3r dla Twojego domu. Zapoznaj si\u0119 z zaletami i zastosowaniem belki stropowej BM 14 w budownictwie. Solidne belki betonowe do strop\xF3w."
  },
  {
    id: "p115",
    slug: "nadproze-prefabrykowane-np120-12cm",
    name: "Nadpro\u017Ce betonowe NP 120/12 cm 120 cm",
    categorySlug: "nadproza",
    brand: "Atlas",
    sku: "ATL-NP120-12",
    unit: "szt.",
    shortDescription: "Nadpro\u017Ce betonowe Atlas NP 120/12 cm to prefabrykowany element konstrukcyjny o d\u0142ugo\u015Bci 120 cm, przeznaczony do przenoszenia obci\u0105\u017Ce\u0144 nad otworami okiennymi i drzwiowymi w \u015Bcianach murowanych.",
    description: "Nadpro\u017Ce betonowe Atlas NP 120/12 cm to wysokiej jako\u015Bci prefabrykowany element konstrukcyjny, niezb\u0119dny przy budowie \u015Bcian no\u015Bnych i dzia\u0142owych. Wykonane z betonu klasy C20/25 i zbrojone zgodnie z norm\u0105 PN-EN 845, zapewnia niezawodne przenoszenie obci\u0105\u017Ce\u0144 nad otworami okiennymi i drzwiowymi. Jego prosty monta\u017C skraca czas budowy, a trwa\u0142o\u015B\u0107 materia\u0142u gwarantuje bezpiecze\u0144stwo i stabilno\u015B\u0107 konstrukcji na lata. Idealne rozwi\u0105zanie dla budownictwa mieszkaniowego i komercyjnego, stanowi\u0105ce kluczowy element zapewniaj\u0105cy integralno\u015B\u0107 architektoniczn\u0105.",
    application: "Nadpro\u017Ce betonowe NP 120/12 cm stosuje si\u0119 do wykonania nadpro\u017Cy nad otworami okiennymi i drzwiowymi w \u015Bcianach zewn\u0119trznych i wewn\u0119trznych budynk\xF3w. Mo\u017Ce by\u0107 stosowane na r\xF3\u017Cnorodnych pod\u0142o\u017Cach murowanych, takich jak bloczki betonowe, pustaki ceramiczne czy silikaty. Monta\u017C powinien odbywa\u0107 si\u0119 zgodnie z projektem budowlanym i zaleceniami producenta.",
    technicalSpec: [
      { label: "D\u0142ugo\u015B\u0107", value: "120 cm" },
      { label: "Przekr\xF3j", value: "120 \xD7 65 mm" },
      { label: "Beton", value: "C20/25" },
      { label: "Zbrojenie", value: "zgodne z PN-EN 845" }
    ],
    images: [],
    tags: [
      "nadpro\u017Ce",
      "betonowe",
      "np 120",
      "prefabrykowane",
      "okno",
      "drzwi",
      "\u015Bciana"
    ],
    related: ["p111", "p112", "p114"],
    advantages: [
      "Wysoka wytrzyma\u0142o\u015B\u0107 dzi\u0119ki betonowi C20/25.",
      "Bezpieczne i zgodne z norm\u0105 PN-EN 845 zbrojenie.",
      "Szybki i \u0142atwy monta\u017C, redukuj\u0105cy czas budowy.",
      "Trwa\u0142e i odporne na warunki atmosferyczne."
    ],
    warnings: [
      "Nie przekracza\u0107 dopuszczalnych obci\u0105\u017Ce\u0144 wskazanych w projekcie.",
      "Stosowa\u0107 odpowiednie \u015Brodki ochrony indywidualnej podczas monta\u017Cu."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zastosowania nadpro\u017Ca betonowego NP 120/12 cm?", a: "Nadpro\u017Ce to kluczowy element konstrukcyjny s\u0142u\u017C\u0105cy do przenoszenia obci\u0105\u017Ce\u0144 nad otworami w \u015Bcianach, takimi jak otwory drzwiowe i okienne. Zapewnia stabilno\u015B\u0107 i zapobiega p\u0119kaniu muru powy\u017Cej tych otwor\xF3w." },
      { q: "Z jakiego materia\u0142u wykonane jest nadpro\u017Ce Atlas NP 120/12 cm?", a: "Nadpro\u017Ce wykonane jest z betonu klasy C20/25, co gwarantuje wysok\u0105 wytrzyma\u0142o\u015B\u0107. Zbrojenie jest zgodne z wymogami normy PN-EN 845, co zapewnia bezpiecze\u0144stwo konstrukcji." },
      { q: "Czy nadpro\u017Ce betonowe nadaje si\u0119 do ka\u017Cdego rodzaju \u015Bciany?", a: "Tak, nadpro\u017Ce betonowe NP 120/12 cm jest uniwersalne i mo\u017Ce by\u0107 stosowane w \u015Bcianach wykonanych z r\xF3\u017Cnych materia\u0142\xF3w, takich jak bloczki betonowe, pustaki ceramiczne czy silikaty, pod warunkiem zgodno\u015Bci z projektem budowlanym." }
    ],
    seoDescription: "Szukasz solidnego nadpro\u017Ca betonowego do swojego projektu budowlanego? Nadpro\u017Ce prefabrykowane Atlas NP 120/12 cm to idealne rozwi\u0105zanie nad otwory okienne i drzwiowe. D\u0142ugo\u015B\u0107 120 cm, przekr\xF3j 120x65 mm i beton klasy C20/25 gwarantuj\u0105 niezawodno\u015B\u0107. Zbrojenie zgodne z PN-EN 845 zapewnia bezpiecze\u0144stwo konstrukcji. Szybki monta\u017C, wysoka wytrzyma\u0142o\u015B\u0107 i trwa\u0142o\u015B\u0107. Nadpro\u017Ca betonowe do \u015Bcian murowanych - sklep budowlany, ceny, opinie. Kup nadpro\u017Ce NP 120 online. Elementy konstrukcyjne, budowa domu, \u015Bciany no\u015Bne, okna, drzwi."
  },
  {
    id: "p116",
    slug: "cegla-pelna-ceramiczna-250x120x65",
    name: "Ceg\u0142a pe\u0142na ceramiczna 250\xD7120\xD765 mm",
    categorySlug: "cegly",
    brand: "Wienerberger",
    sku: "WIE-CEGLA-PELNA",
    unit: "szt.",
    shortDescription: "Klasyczna ceg\u0142a pe\u0142na ceramiczna Wienerberger 250x120x65 mm. Wytrzyma\u0142a, o g\u0119sto\u015Bci 1700-2000 kg/m\xB3 i klasie CS 15. Idealna do budowy \u015Bcian no\u015Bnych i dzia\u0142owych.",
    description: "Ceg\u0142a pe\u0142na ceramiczna Wienerberger o wymiarach 250x120x65 mm to sprawdzony materia\u0142 budowlany o wysokiej jako\u015Bci. Charakteryzuje si\u0119 g\u0119sto\u015Bci\u0105 w zakresie 1700\u20132000 kg/m\xB3 i klas\u0105 wytrzyma\u0142o\u015Bci CS 15, co zapewnia solidno\u015B\u0107 konstrukcji. Klasa ogniowa A1 gwarantuje bezpiecze\u0144stwo przeciwpo\u017Carowe. Idealnie nadaje si\u0119 do budowy \u015Bcian no\u015Bnych zewn\u0119trznych i wewn\u0119trznych, \u015Bcian dzia\u0142owych oraz fundament\xF3w. Jest to materia\u0142 paroprzepuszczalny, kt\xF3ry pozytywnie wp\u0142ywa na mikroklimat pomieszcze\u0144. Ceg\u0142a ceramiczna jest trwa\u0142a i odporna na czynniki atmosferyczne.",
    application: "Ceg\u0142a pe\u0142na ceramiczna Wienerberger przeznaczona jest do budowy mur\xF3w wewn\u0119trznych i zewn\u0119trznych, \u015Bcian no\u015Bnych oraz dzia\u0142owych. Doskonale sprawdzi si\u0119 r\xF3wnie\u017C przy wznoszeniu fundament\xF3w. Mo\u017Ce by\u0107 stosowana zar\xF3wno w budownictwie mieszkaniowym, jak i u\u017Cyteczno\u015Bci publicznej. Nadaje si\u0119 do murowania na zapraw\u0119 tradycyjn\u0105 lub cementowo-wapienn\u0105, w warunkach zewn\u0119trznych i wewn\u0119trznych.",
    technicalSpec: [
      { label: "Wymiar", value: "250 \xD7 120 \xD7 65 mm" },
      { label: "G\u0119sto\u015B\u0107", value: "1700\u20132000 kg/m\xB3" },
      { label: "Klasa wytrzyma\u0142o\u015Bci", value: "CS 15" },
      { label: "Klasa ogniowa", value: "A1" }
    ],
    images: [],
    tags: [
      "ceg\u0142a pe\u0142na",
      "ceramiczna",
      "wienerberger",
      "mur",
      "\u015Bciana",
      "klinkier",
      "fundament"
    ],
    related: ["p113", "p117", "p055"],
    advantages: [
      "Wysoka wytrzyma\u0142o\u015B\u0107 mechaniczna klasy CS 15.",
      "Doskona\u0142e w\u0142a\u015Bciwo\u015Bci termoizolacyjne i akustyczne.",
      "Niepalno\u015B\u0107 i wysoka odporno\u015B\u0107 ogniowa (klasa A1).",
      "Trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na wilgo\u0107 oraz czynniki atmosferyczne."
    ],
    warnings: [
      "Przed rozpocz\u0119ciem murowania nale\u017Cy zapozna\u0107 si\u0119 z instrukcj\u0105 producenta.",
      "Nale\u017Cy stosowa\u0107 odpowiedni\u0105 zapraw\u0119 murarsk\u0105 zgodn\u0105 z przeznaczeniem i warunkami aplikacji."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zastosowania ceg\u0142y pe\u0142nej ceramicznej Wienerberger?", a: "Ceg\u0142a pe\u0142na ceramiczna Wienerberger idealnie nadaje si\u0119 do budowy \u015Bcian no\u015Bnych zewn\u0119trznych i wewn\u0119trznych, \u015Bcian dzia\u0142owych, a tak\u017Ce do wznoszenia fundament\xF3w. Jest to wszechstronny materia\u0142 budowlany." },
      { q: "Jak\u0105 klas\u0119 wytrzyma\u0142o\u015Bci posiada ta ceg\u0142a?", a: "Ceg\u0142a pe\u0142na ceramiczna Wienerberger posiada klas\u0119 wytrzyma\u0142o\u015Bci CS 15, co oznacza, \u017Ce jest przeznaczona do konstrukcji wymagaj\u0105cych solidnego i wytrzyma\u0142ego materia\u0142u." },
      { q: "Czy ceg\u0142a ceramiczna jest dobrym izolatorem?", a: "Tak, ceg\u0142a ceramiczna charakteryzuje si\u0119 dobrymi w\u0142a\u015Bciwo\u015Bciami termoizolacyjnymi i akustycznymi, co przek\u0142ada si\u0119 na komfort cieplny i d\u017Awi\u0119kowy w pomieszczeniach." }
    ],
    seoDescription: "Szukasz solidnej ceg\u0142y pe\u0142nej ceramicznej? Ceg\u0142a pe\u0142na ceramiczna Wienerberger 250x120x65 mm to gwarancja jako\u015Bci i trwa\u0142o\u015Bci. Wytrzyma\u0142o\u015B\u0107 CS 15, g\u0119sto\u015B\u0107 1700-2000 kg/m\xB3 i klasa ogniowa A1 sprawiaj\u0105, \u017Ce jest to idealny materia\u0142 na \u015Bciany no\u015Bne, dzia\u0142owe oraz fundamenty. Sprawd\u017A, dlaczego ceg\u0142a ceramiczna jest tak ceniona w budownictwie. Materia\u0142 paroprzepuszczalny, zapewniaj\u0105cy zdrowy mikroklimat. Du\u017Cy wyb\xF3r cegie\u0142 budowlanych marki Wienerberger. Zastosowanie ceg\u0142y pe\u0142nej w budownictwie jednorodzinnym i wielorodzinnym. Trwa\u0142o\u015B\u0107 na lata."
  },
  {
    id: "p117",
    slug: "cement-portlandzki-cem-i-425r-25kg",
    name: "Cement portlandzki CEM I 42,5R 25 kg",
    categorySlug: "cement",
    brand: "Heidelberg Materials",
    sku: "HEI-CEM-I-425R-25",
    unit: "worek 25 kg",
    shortDescription: "Cement portlandzki CEM I 42,5R 25 kg marki Heidelberg Materials to uniwersalny materia\u0142 budowlany o wysokiej wytrzyma\u0142o\u015Bci wczesnej. Idealny do produkcji betonu i zapraw.",
    description: "Cement portlandzki CEM I 42,5R 25 kg od Heidelberg Materials to wysokiej jako\u015Bci spoiwo cementowe, charakteryzuj\u0105ce si\u0119 podwy\u017Cszon\u0105 wytrzyma\u0142o\u015Bci\u0105 wczesn\u0105 (klasa 42,5 R). Doskonale nadaje si\u0119 do produkcji betonu konstrukcyjnego, posadzek, wylewek samopoziomuj\u0105cych, a tak\u017Ce do sporz\u0105dzania zapraw murarskich i tynkarskich. Dzi\u0119ki swoim parametrom zapewnia szybkie uzyskanie wytrzyma\u0142o\u015Bci, co skraca czas prac budowlanych. Jest rekomendowany do stosowania w klasach ekspozycji od XC1 do XC4, co oznacza mo\u017Cliwo\u015B\u0107 wykorzystania go w r\xF3\u017Cnych warunkach \u015Brodowiskowych.",
    application: "Cement CEM I 42,5R znajduje zastosowanie w budownictwie mieszkaniowym, przemys\u0142owym i in\u017Cynieryjnym. Jest wykorzystywany do produkcji betonu na fundamenty, stropy, schody, a tak\u017Ce do wykonywania warstw wyr\xF3wnawczych i stabilizacyjnych. Mo\u017Ce by\u0107 stosowany na zewn\u0105trz i wewn\u0105trz budynk\xF3w, w warunkach suchych, wilgotnych oraz przy umiarkowanym dzia\u0142aniu czynnik\xF3w atmosferycznych.",
    technicalSpec: [
      { label: "Klasa wytrzyma\u0142o\u015Bci", value: "42,5 R" },
      { label: "Zu\u017Cycie w betonie", value: "300\u2013350 kg/m\xB3" },
      { label: "Czas wi\u0105zania", value: "ok. 2 h" },
      { label: "Klasa ekspozycji", value: "XC1-XC4" }
    ],
    images: [],
    tags: [
      "cement portlandzki",
      "cem i",
      "42,5r",
      "beton",
      "wylewka",
      "fundament",
      "zaprawy"
    ],
    related: ["p116", "p111", "p055"],
    advantages: [
      "Wysoka wytrzyma\u0142o\u015B\u0107 wczesna przyspiesza post\u0119p prac budowlanych.",
      "Uniwersalne zastosowanie do produkcji betonu i zapraw budowlanych.",
      "Dobra urabialno\u015B\u0107 i konsystencja mieszanek betonowych i zapraw.",
      "Odporno\u015B\u0107 na warunki \u015Brodowiskowe w klasach ekspozycji XC1-XC4."
    ],
    warnings: [
      "Nale\u017Cy przestrzega\u0107 zasad BHP podczas pracy z cementem, chroni\u0107 sk\xF3r\u0119 i drogi oddechowe.",
      "Przechowywa\u0107 w suchym miejscu, w oryginalnych, szczelnie zamkni\u0119tych opakowaniach, z dala od wilgoci."
    ],
    faq: [
      { q: "Jaka jest klasa wytrzyma\u0142o\u015Bci cementu CEM I 42,5R?", a: "Cement portlandzki CEM I 42,5R charakteryzuje si\u0119 klas\u0105 wytrzyma\u0142o\u015Bci 42,5 MPa po 28 dniach dojrzewania, z podwy\u017Cszon\u0105 wytrzyma\u0142o\u015Bci\u0105 wczesn\u0105." },
      { q: "Do czego najlepiej nadaje si\u0119 ten cement?", a: "Jest to uniwersalny cement doskona\u0142y do produkcji beton\xF3w konstrukcyjnych, wylewek, fundament\xF3w, a tak\u017Ce do sporz\u0105dzania zapraw murarskich i tynkarskich." },
      { q: "Jakie jest typowe zu\u017Cycie cementu w betonie?", a: "Typowe zu\u017Cycie cementu CEM I 42,5R w betonie wynosi od 300 do 350 kg na metr sze\u015Bcienny." }
    ],
    seoDescription: "Szukasz wysokiej jako\u015Bci cementu portlandzkiego do swoich projekt\xF3w budowlanych? Cement portlandzki CEM I 42,5R 25 kg od Heidelberg Materials to idealny wyb\xF3r. Oferuje on podwy\u017Cszon\u0105 wytrzyma\u0142o\u015B\u0107 wczesn\u0105 (klasa 42,5 R), co pozwala na szybsze post\u0119py prac. Ten uniwersalny cement budowlany nadaje si\u0119 do produkcji betonu na fundamenty, stropy, schody, a tak\u017Ce do wykonywania wytrzyma\u0142ych wylewek i zapraw murarskich. Doskona\u0142y do zastosowa\u0144 w warunkach XC1-XC4. Zam\xF3w cement CEM I 42,5R 25 kg ju\u017C dzi\u015B i przekonaj si\u0119 o jego niezawodno\u015Bci!"
  },
  {
    id: "p118",
    slug: "system-kominowy-schiedel-uni-200mm",
    name: "System kominowy Schiedel UNI 18\xD718 cm ceramiczny",
    categorySlug: "kominy-ceramiczne",
    brand: "Schiedel",
    sku: "SCH-UNI-1818",
    unit: "mb",
    shortDescription: "Ceramiczny system kominowy Schiedel UNI 18x18 cm. Odporny na korozj\u0119 i wysokie temperatury, uniwersalny do r\xF3\u017Cnych urz\u0105dze\u0144 grzewczych.",
    description: "Schiedel UNI to wysokiej jako\u015Bci ceramiczny system kominowy o przekroju kana\u0142u 18x18 cm, idealny do budowy nowych komin\xF3w oraz modernizacji istniej\u0105cych. Zapewnia bezpieczne odprowadzanie spalin z kot\u0142\xF3w na paliwa sta\u0142e, gazowych i olejowych. Wykonany z wytrzyma\u0142ej ceramiki, odporny na dzia\u0142anie kwas\xF3w i wysokich temperatur (klasa T400). Gwarantuje d\u0142ugowieczno\u015B\u0107 i niezawodno\u015B\u0107, spe\u0142niaj\u0105c najwy\u017Csze standardy bezpiecze\u0144stwa.",
    application: "System przeznaczony do odprowadzania spalin z urz\u0105dze\u0144 grzewczych na paliwa sta\u0142e, gazowe i olejowe. Stosowany w budownictwie mieszkaniowym jedno- i wielorodzinnym. Wymaga odpowiedniego zaizolowania i wyprowadzenia ponad dach zgodnie z projektem.",
    technicalSpec: [
      { label: "Przekr\xF3j kana\u0142u", value: "180 \xD7 180 mm" },
      { label: "Klasa temperatury", value: "T400" },
      { label: "Klasa ci\u015Bnienia", value: "P1" },
      { label: "Klasa nieszczelno\u015Bci", value: "N1" }
    ],
    images: [],
    tags: [
      "system kominowy",
      "schiedel",
      "uni",
      "ceramiczny",
      "komin",
      "T400",
      "wielofunkcyjny"
    ],
    related: ["p101", "p116", "p117"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na korozj\u0119 i kwasy.",
      "Trwa\u0142o\u015B\u0107 i d\u0142ugowieczno\u015B\u0107 dzi\u0119ki ceramicznym elementom.",
      "Uniwersalno\u015B\u0107 zastosowania z r\xF3\u017Cnymi typami kot\u0142\xF3w.",
      "Bezpiecze\u0144stwo u\u017Cytkowania potwierdzone certyfikatami."
    ],
    warnings: [
      "Monta\u017C systemu musi by\u0107 zgodny z instrukcj\u0105 producenta.",
      "Wymaga profesjonalnego wykonania i odpowiedniej izolacji."
    ],
    faq: [
      { q: "Do jakich urz\u0105dze\u0144 grzewczych mo\u017Cna stosowa\u0107 Schiedel UNI 18x18 cm?", a: "System Schiedel UNI 18x18 cm jest uniwersalny i mo\u017Ce by\u0107 stosowany do odprowadzania spalin z kot\u0142\xF3w na paliwa sta\u0142e (drewno, w\u0119giel), gazowych oraz olejowych." },
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety ceramicznego systemu kominowego?", a: "G\u0142\xF3wne zalety to wysoka odporno\u015B\u0107 na wysok\u0105 temperatur\u0119 (T400), kwasy oraz korozj\u0119, co zapewnia d\u0142ug\u0105 \u017Cywotno\u015B\u0107 i bezpiecze\u0144stwo u\u017Cytkowania." },
      { q: "Czy system Schiedel UNI nadaje si\u0119 do modernizacji istniej\u0105cych komin\xF3w?", a: "Tak, Schiedel UNI 18x18 cm jest cz\u0119sto wybierany do modernizacji i renowacji starych przewod\xF3w kominowych, dzi\u0119ki swojej konstrukcji i odporno\u015Bci." }
    ],
    seoDescription: "Wybierz niezawodny ceramiczny system kominowy Schiedel UNI 18x18 cm. Idealny do kot\u0142\xF3w na paliwa sta\u0142e, gazowych i olejowych. Klasa T400, P1, N1 gwarantuje bezpiecze\u0144stwo i d\u0142ugowieczno\u015B\u0107. Odporny na kwasy i korozj\u0119. System kominowy Schiedel do budowy nowych komin\xF3w i modernizacji starych. Najlepsze rozwi\u0105zanie dla Twojego domu jednorodzinnego. Poznaj zalety ceramicznych komin\xF3w Schiedel."
  },
  {
    id: "p119",
    slug: "plytka-scienna-tubadzin-domino-25x40-biala",
    name: "P\u0142ytka \u015Bcienna Tub\u0105dzin Domino 25\xD740 cm bia\u0142a",
    categorySlug: "plytki-scienne",
    brand: "Tub\u0105dzin",
    sku: "TUB-DOM-25-40-W",
    unit: "m\xB2",
    shortDescription: "Elegancka bia\u0142a p\u0142ytka \u015Bcienna Tub\u0105dzin Domino 25x40 cm. Idealna do \u0142azienki i kuchni, podkre\u015Bla nowoczesny styl wn\u0119trza. Trwa\u0142a i \u0142atwa w utrzymaniu czysto\u015Bci.",
    description: "Odkryj ponadczasow\u0105 elegancj\u0119 z p\u0142ytk\u0105 \u015Bcienn\u0105 Tub\u0105dzin Domino w rozmiarze 25x40 cm w kolorze bia\u0142ym. Ta wysokiej jako\u015Bci ceramika to doskona\u0142y wyb\xF3r do stworzenia jasnych i przestronnych wn\u0119trz \u0142azienkowych, kuchennych czy salonowych. Jej uniwersalny bia\u0142y kolor \u0142atwo dopasuje si\u0119 do ka\u017Cdej aran\u017Cacji, od minimalistycznej po klasyczn\u0105. P\u0142ytki Domino charakteryzuj\u0105 si\u0119 nisk\u0105 nasi\u0105kliwo\u015Bci\u0105 (\u2264 10%) oraz podwy\u017Cszon\u0105 odporno\u015Bci\u0105 na po\u015Blizg (R9), co czyni je bezpiecznym i praktycznym rozwi\u0105zaniem do wilgotnych pomieszcze\u0144. Monta\u017C jest prosty, a g\u0142adka powierzchnia u\u0142atwia utrzymanie czysto\u015Bci. Dodaj swojemu domowi blasku i stylu z p\u0142ytkami Tub\u0105dzin.",
    application: "P\u0142ytka \u015Bcienna Tub\u0105dzin Domino 25x40 cm bia\u0142a przeznaczona jest do stosowania na \u015Bcianach wewn\u0105trz pomieszcze\u0144, g\u0142\xF3wnie w \u0142azienkach, kuchniach, przedpokojach oraz salonach. Nadaje si\u0119 do stosowania na standardowych pod\u0142o\u017Cach budowlanych, takich jak tynki cementowo-wapienne, cementowe, gipsowe oraz p\u0142yty gipsowo-kartonowe, po odpowiednim przygotowaniu i zagruntowaniu. Rekomendowana do pomieszcze\u0144 o podwy\u017Cszonej wilgotno\u015Bci.",
    technicalSpec: [
      { label: "Wymiar", value: "250 \xD7 400 mm" },
      { label: "Grubo\u015B\u0107", value: "8 mm" },
      { label: "Nasi\u0105kliwo\u015B\u0107", value: "\u2264 10%" },
      { label: "Antypo\u015Blizgowo\u015B\u0107", value: "R9" }
    ],
    images: [],
    tags: [
      "p\u0142ytka \u015Bcienna",
      "tub\u0105dzin",
      "domino",
      "\u0142azienka",
      "bia\u0142a",
      "ceramika",
      "\u015Bciana"
    ],
    related: ["p120", "p057", "p060"],
    advantages: [
      "Uniwersalny bia\u0142y kolor pasuje do ka\u017Cdego wn\u0119trza.",
      "Niska nasi\u0105kliwo\u015B\u0107 zapewnia odporno\u015B\u0107 na wilgo\u0107 i plamy.",
      "Klasyfikacja antypo\u015Blizgowo\u015Bci R9 zwi\u0119ksza bezpiecze\u0144stwo u\u017Cytkowania.",
      "Trwa\u0142a i \u0142atwa w piel\u0119gnacji powierzchnia ceramiczna."
    ],
    warnings: [
      "Stosowa\u0107 wy\u0142\u0105cznie na \u015Bcianach, nie na pod\u0142ogach.",
      "Przed monta\u017Cem upewni\u0107 si\u0119 o odpowiednim przygotowaniu pod\u0142o\u017Ca."
    ],
    faq: [
      { q: "Jakie s\u0105 wymiary p\u0142ytki Tub\u0105dzin Domino?", a: "P\u0142ytka \u015Bcienna Tub\u0105dzin Domino dost\u0119pna jest w wymiarach 25 cm szeroko\u015Bci i 40 cm wysoko\u015Bci, co czyni j\u0105 uniwersalnym rozwi\u0105zaniem do r\xF3\u017Cnych przestrzeni." },
      { q: "Czy p\u0142ytka nadaje si\u0119 do \u0142azienki?", a: "Tak, p\u0142ytka posiada nisk\u0105 nasi\u0105kliwo\u015B\u0107 (\u2264 10%) i klasyfikacj\u0119 antypo\u015Blizgowo\u015Bci R9, co sprawia, \u017Ce jest doskona\u0142ym i bezpiecznym wyborem do \u0142azienki." },
      { q: "Jak piel\u0119gnowa\u0107 p\u0142ytki Tub\u0105dzin Domino?", a: "P\u0142ytki ceramiczne s\u0105 \u0142atwe w utrzymaniu czysto\u015Bci. Do codziennego mycia wystarczy woda z delikatnym detergentem. Unikaj agresywnych \u015Brodk\xF3w chemicznych." }
    ],
    seoDescription: "Szukasz eleganckich p\u0142ytek \u015Bciennych do \u0142azienki? P\u0142ytka \u015Bcienna Tub\u0105dzin Domino 25x40 cm bia\u0142a to idealne rozwi\u0105zanie. Ta wysokiej jako\u015Bci ceramika marki Tub\u0105dzin, z kolekcji Domino, w uniwersalnym bia\u0142ym kolorze, doskonale sprawdzi si\u0119 w nowoczesnych aran\u017Cacjach \u0142azienek, kuchni czy salon\xF3w. Niska nasi\u0105kliwo\u015B\u0107 (\u2264 10%) i klasa antypo\u015Blizgowo\u015Bci R9 zapewniaj\u0105 trwa\u0142o\u015B\u0107 i bezpiecze\u0144stwo u\u017Cytkowania w wilgotnych pomieszczeniach. Odkryj \u0142atwo\u015B\u0107 monta\u017Cu i piel\u0119gnacji bia\u0142ych p\u0142ytek ceramicznych Tub\u0105dzin. Kupuj p\u0142ytki \u015Bcienne Tub\u0105dzin Domino online i stw\xF3rz wymarzone wn\u0119trze."
  },
  {
    id: "p120",
    slug: "plytka-podlogowa-opoczno-stark-60x60-szara",
    name: "P\u0142ytka pod\u0142ogowa Opoczno Stark 60\xD760 cm szara",
    categorySlug: "plytki-scienno-podlogowe",
    brand: "Opoczno",
    sku: "OPO-STARK-60-SZ",
    unit: "m\xB2",
    shortDescription: "Elegancka szara p\u0142ytka pod\u0142ogowa Opoczno Stark 60x60 cm. Gres rektyfikowany o podwy\u017Cszonej antypo\u015Blizgowo\u015Bci R10, idealny do nowoczesnych wn\u0119trz.",
    description: "Nadaj swojemu wn\u0119trzu nowoczesnego charakteru z p\u0142ytk\u0105 pod\u0142ogow\u0105 Opoczno Stark w rozmiarze 60x60 cm. Ten szary gres rektyfikowany zachwyca minimalistycznym designem i wysok\u0105 jako\u015Bci\u0105 wykonania. Dzi\u0119ki niskiej nasi\u0105kliwo\u015Bci (\u2264 0,5%) i podwy\u017Cszonej klasie antypo\u015Blizgowo\u015Bci R10, p\u0142ytki Stark doskonale sprawdz\u0105 si\u0119 w pomieszczeniach o zwi\u0119kszonej wilgotno\u015Bci i nat\u0119\u017Ceniu ruchu, takich jak kuchnia, \u0142azienka czy przedpok\xF3j. Ich precyzyjne, rektyfikowane kraw\u0119dzie pozwalaj\u0105 na uzyskanie w\u0105skich fug, co pot\u0119guje efekt jednolitej i przestronnej powierzchni. Wybierz Opoczno Stark, by cieszy\u0107 si\u0119 pi\u0119knem i funkcjonalno\u015Bci\u0105 przez lata.",
    application: "P\u0142ytka pod\u0142ogowa Opoczno Stark 60x60 cm szara przeznaczona jest do stosowania na pod\u0142ogach wewn\u0105trz pomieszcze\u0144. Idealnie nadaje si\u0119 do kuchni, \u0142azienek, przedpokoi, salon\xF3w i innych pomieszcze\u0144 mieszkalnych o standardowym lub podwy\u017Cszonym nat\u0119\u017Ceniu ruchu. Mo\u017Cna j\u0105 uk\u0142ada\u0107 na tradycyjnych pod\u0142o\u017Cach cementowo-wapiennych i cementowych, po uprzednim zagruntowaniu i zastosowaniu odpowiedniego kleju.",
    technicalSpec: [
      { label: "Wymiar", value: "600 \xD7 600 mm" },
      { label: "Grubo\u015B\u0107", value: "9,5 mm" },
      { label: "Antypo\u015Blizgowo\u015B\u0107", value: "R10" },
      { label: "Nasi\u0105kliwo\u015B\u0107", value: "\u2264 0,5%" }
    ],
    images: [],
    tags: [
      "p\u0142ytka pod\u0142ogowa",
      "opoczno",
      "stark",
      "60x60",
      "szara",
      "gres",
      "rektyfikowana"
    ],
    related: ["p119", "p057", "p060"],
    advantages: [
      "Nowoczesny, uniwersalny szary kolor",
      "Du\u017Cy format 60x60 cm optycznie powi\u0119ksza przestrze\u0144",
      "Rektyfikowane kraw\u0119dzie dla w\u0105skich fug i jednolitego wygl\u0105du",
      "Podwy\u017Cszona antypo\u015Blizgowo\u015B\u0107 R10 zwi\u0119ksza bezpiecze\u0144stwo u\u017Cytkowania"
    ],
    warnings: [
      "Przed monta\u017Cem nale\u017Cy zapozna\u0107 si\u0119 z instrukcj\u0105 producenta.",
      "Stosowa\u0107 kleje i fugi przeznaczone do gres\xF3w rektyfikowanych."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety p\u0142ytek Opoczno Stark 60x60 cm szarych?", a: "G\u0142\xF3wne zalety to nowoczesny design, du\u017Cy format powi\u0119kszaj\u0105cy przestrze\u0144, rektyfikowane kraw\u0119dzie umo\u017Cliwiaj\u0105ce stosowanie w\u0105skich fug oraz wysoka klasa antypo\u015Blizgowo\u015Bci R10, kt\xF3ra zapewnia bezpiecze\u0144stwo." },
      { q: "Czy p\u0142ytki Opoczno Stark nadaj\u0105 si\u0119 do \u0142azienki?", a: "Tak, dzi\u0119ki niskiej nasi\u0105kliwo\u015Bci (\u2264 0,5%) i podwy\u017Cszonej antypo\u015Blizgowo\u015Bci R10, p\u0142ytki Opoczno Stark s\u0105 doskona\u0142ym wyborem do \u0142azienek, zapewniaj\u0105c bezpiecze\u0144stwo i odporno\u015B\u0107 na wilgo\u0107." },
      { q: "Co oznacza parametr 'rektyfikowana' w opisie p\u0142ytki?", a: "P\u0142ytka rektyfikowana zosta\u0142a precyzyjnie doci\u0119ta po wypaleniu, co sprawia, \u017Ce ma idealnie proste kraw\u0119dzie. Pozwala to na uk\u0142adanie jej z minimalnymi fugami, tworz\u0105c efekt jednolitej powierzchni." }
    ],
    seoDescription: "Szukasz idealnej p\u0142ytki pod\u0142ogowej do swojego domu? P\u0142ytka pod\u0142ogowa Opoczno Stark 60x60 cm szara to doskona\u0142y wyb\xF3r dla mi\u0142o\u015Bnik\xF3w nowoczesnego designu i wysokiej funkcjonalno\u015Bci. Ten szary gres rektyfikowany o wymiarach 60x60 cm i grubo\u015Bci 9,5 mm zachwyca minimalistycznym stylem. Niska nasi\u0105kliwo\u015B\u0107 (\u2264 0,5%) i podwy\u017Cszona klasa antypo\u015Blizgowo\u015Bci R10 czyni\u0105 j\u0105 bezpiecznym i praktycznym rozwi\u0105zaniem do kuchni, \u0142azienek oraz przedpokoj\xF3w. Rektyfikowane kraw\u0119dzie pozwalaj\u0105 na uzyskanie efektu jednolitej, przestronnej pod\u0142ogi z w\u0105skimi fugami. Odkryj pe\u0142ni\u0119 mo\u017Cliwo\u015Bci z p\u0142ytkami Opoczno Stark i stw\xF3rz wn\u0119trze swoich marze\u0144."
  },
  {
    id: "p121",
    slug: "plytka-tarasowa-cerrad-torstone-60x60",
    name: "P\u0142ytka tarasowa Cerrad Torstone Graphite 60\xD760 cm",
    categorySlug: "plytki-tarasowe",
    brand: "Cerrad",
    sku: "CER-TORS-60-GR",
    unit: "m\xB2",
    shortDescription: "Gres Cerrad Torstone Graphite 60x60 cm \u2013 stylowe i wytrzyma\u0142e p\u0142ytki tarasowe o antypo\u015Blizgowej powierzchni R11. Idealne na nowoczesne tarasy i balkony.",
    description: "Nowoczesne p\u0142ytki tarasowe Cerrad Torstone Graphite o wymiarach 60\xD760 cm to doskona\u0142y wyb\xF3r dla os\xF3b ceni\u0105cych sobie po\u0142\u0105czenie estetyki i funkcjonalno\u015Bci. Wykonane z wysokiej jako\u015Bci gresu, charakteryzuj\u0105 si\u0119 wyj\u0105tkow\u0105 trwa\u0142o\u015Bci\u0105 i odporno\u015Bci\u0105 na warunki atmosferyczne, w tym mr\xF3z. Antypo\u015Blizgowa powierzchnia klasy R11 zapewnia bezpiecze\u0144stwo u\u017Cytkowania, nawet w wilgotnych warunkach. Stonowana kolorystyka grafitu w kolekcji Torstone doskonale komponuje si\u0119 z nowoczesn\u0105 architektur\u0105, nadaj\u0105c tarasowi elegancki i minimalistyczny charakter. P\u0142ytki o grubo\u015Bci 20 mm s\u0105 \u0142atwe w monta\u017Cu i piel\u0119gnacji, stanowi\u0105c d\u0142ugoterminow\u0105 inwestycj\u0119 w estetyk\u0119 Twojej przestrzeni zewn\u0119trznej.",
    application: "P\u0142ytki Cerrad Torstone Graphite 60x60 cm przeznaczone s\u0105 do stosowania na zewn\u0119trznych powierzchniach, takich jak tarasy, balkony, patia czy \u015Bcie\u017Cki ogrodowe. Monta\u017C na pod\u0142o\u017Cu z podsypki piaskowej, \u017Cwirowej lub na wspornikach pozwala na stworzenie wentylowanej przestrzeni. Idealne do u\u017Cytku w zmiennych warunkach pogodowych, odporne na mr\xF3z i wilgo\u0107.",
    technicalSpec: [
      { label: "Wymiar", value: "600 \xD7 600 mm" },
      { label: "Grubo\u015B\u0107", value: "20 mm" },
      { label: "Antypo\u015Blizgowo\u015B\u0107", value: "R11" },
      { label: "Mrozoodporno\u015B\u0107", value: "TAK" }
    ],
    images: [],
    tags: [
      "p\u0142ytka tarasowa",
      "cerrad",
      "torstone",
      "20mm",
      "mrozoodporna",
      "ogr\xF3d",
      "taras",
      "gres"
    ],
    related: ["p120", "p057", "p060"],
    advantages: [
      "Wyj\u0105tkowa trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na warunki atmosferyczne.",
      "Wysoka klasa antypo\u015Blizgowo\u015Bci R11 zapewnia bezpiecze\u0144stwo.",
      "Nowoczesny design i uniwersalna kolorystyka grafitu.",
      "Grubo\u015B\u0107 20 mm u\u0142atwia monta\u017C i zapewnia stabilno\u015B\u0107."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 odpowiednie fugi i kleje przeznaczone do zastosowa\u0144 zewn\u0119trznych.",
      "Unika\u0107 stosowania ostrych narz\u0119dzi, kt\xF3re mog\u0105 porysowa\u0107 powierzchni\u0119."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety p\u0142ytek Cerrad Torstone Graphite 60x60 cm?", a: "G\u0142\xF3wne zalety to wysoka mrozoodporno\u015B\u0107, klasa antypo\u015Blizgowo\u015Bci R11, nowoczesny design oraz du\u017Cy format 60x60 cm, kt\xF3ry optycznie powi\u0119ksza przestrze\u0144 i u\u0142atwia monta\u017C." },
      { q: "Czy p\u0142ytki nadaj\u0105 si\u0119 na taras, kt\xF3ry jest intensywnie u\u017Cytkowany?", a: "Tak, p\u0142ytki gresowe Cerrad Torstone s\u0105 bardzo wytrzyma\u0142e i odporne na \u015Bcieranie, co czyni je idealnym wyborem na tarasy o intensywnym u\u017Cytkowaniu." },
      { q: "Jaki jest spos\xF3b monta\u017Cu tych p\u0142ytek tarasowych?", a: "P\u0142ytki o grubo\u015Bci 20 mm mo\u017Cna montowa\u0107 na podsypce piaskowej, \u017Cwirowej, na podk\u0142adach gumowych lub bezpo\u015Brednio na klej w przypadku stabilnego pod\u0142o\u017Ca betonowego." }
    ],
    seoDescription: "Szukasz nowoczesnych i funkcjonalnych p\u0142ytek na taras? Gres Cerrad Torstone Graphite 60x60 cm to idealne rozwi\u0105zanie! P\u0142ytki tarasowe o grubo\u015Bci 20 mm, charakteryzuj\u0105ce si\u0119 wysok\u0105 mrozoodporno\u015Bci\u0105 i antypo\u015Blizgowo\u015Bci\u0105 klasy R11, zapewni\u0105 bezpiecze\u0144stwo i komfort u\u017Cytkowania. Stonowany grafitowy kolor kolekcji Torstone doskonale wpasuje si\u0119 w ka\u017Cdy ogr\xF3d, tworz\u0105c eleganckie i minimalistyczne przestrzenie. Odkryj trwa\u0142e i estetyczne p\u0142ytki tarasowe Cerrad, kt\xF3re odmieni\u0105 Tw\xF3j taras, balkon czy patio. Idealne do tworzenia stylowych aran\u017Cacji zewn\u0119trznych, odporne na czynniki atmosferyczne."
  },
  {
    id: "p122",
    slug: "plytka-elewacyjna-cerrad-loft-30x60",
    name: "P\u0142ytka elewacyjna Cerrad Loft Brick 30\xD760 cm",
    categorySlug: "plytki-elewacyjne",
    brand: "Cerrad",
    sku: "CER-LOFTBR-30-60",
    unit: "m\xB2",
    shortDescription: "P\u0142ytka elewacyjna Cerrad Loft Brick 30x60 cm imituj\u0105ca ceg\u0142\u0119 klinkierow\u0105. Idealna do nowoczesnych i loftowych aran\u017Cacji fasad, odporna na mr\xF3z i wilgo\u0107.",
    description: "Odkryj wyj\u0105tkowy charakter p\u0142ytki elewacyjnej Cerrad Loft Brick 30x60 cm, kt\xF3ra doskonale imituje surowo\u015B\u0107 i autentyczno\u015B\u0107 ceg\u0142y klinkierowej. Ten nowoczesny materia\u0142 elewacyjny pozwoli Ci stworzy\u0107 niepowtarzalne fasady w stylu loftowym, industrialnym lub minimalistycznym. P\u0142ytki o wymiarach 300x600 mm i grubo\u015Bci 8,5 mm s\u0105 niezwykle trwa\u0142e i odporne na warunki atmosferyczne, w tym mr\xF3z, dzi\u0119ki czemu Twoja elewacja zachowa pi\u0119kny wygl\u0105d przez wiele lat. Niska nasi\u0105kliwo\u015B\u0107 (\u2264 3%) gwarantuje odporno\u015B\u0107 na wilgo\u0107 i \u0142atwo\u015B\u0107 w utrzymaniu czysto\u015Bci. Wybierz Cerrad Loft Brick, aby nada\u0107 swojemu budynkowi nowoczesny i designerski charakter.",
    application: "P\u0142ytka elewacyjna Cerrad Loft Brick 30x60 cm przeznaczona jest do stosowania na zewn\u0119trznych \u015Bcianach budynk\xF3w. Doskonale sprawdzi si\u0119 jako ok\u0142adzina elewacyjna na \u015Bcianach pe\u0142nych, coko\u0142ach, a tak\u017Ce jako element dekoracyjny wok\xF3\u0142 okien i drzwi. Mo\u017Ce by\u0107 montowana na tradycyjnych systemach elewacyjnych, z zastosowaniem odpowiednich klej\xF3w i fug do klinkieru, na zagruntowanych i stabilnych pod\u0142o\u017Cach.",
    technicalSpec: [
      { label: "Wymiar", value: "300 \xD7 600 mm" },
      { label: "Grubo\u015B\u0107", value: "8,5 mm" },
      { label: "Mrozoodporno\u015B\u0107", value: "TAK" },
      { label: "Nasi\u0105kliwo\u015B\u0107", value: "\u2264 3%" }
    ],
    images: [],
    tags: [
      "p\u0142ytka elewacyjna",
      "cerrad",
      "loft brick",
      "fasada",
      "klinkier",
      "dekoracyjna",
      "zewn\u0119trzna"
    ],
    related: ["p119", "p051", "p057"],
    advantages: [
      "Wyj\u0105tkowa imitacja ceg\u0142y klinkierowej w nowoczesnym formacie.",
      "Wysoka mrozoodporno\u015B\u0107 i niska nasi\u0105kliwo\u015B\u0107 zapewniaj\u0105 trwa\u0142o\u015B\u0107 fasady.",
      "Odporno\u015B\u0107 na warunki atmosferyczne i uszkodzenia mechaniczne.",
      "\u0141atwo\u015B\u0107 monta\u017Cu i piel\u0119gnacji, d\u0142ugotrwa\u0142y estetyczny wygl\u0105d."
    ],
    warnings: [
      "Stosowa\u0107 odpowiednie kleje i fugi przeznaczone do p\u0142ytek elewacyjnych i klinkieru.",
      "Przed monta\u017Cem zapozna\u0107 si\u0119 z instrukcj\u0105 producenta dotycz\u0105c\u0105 przygotowania pod\u0142o\u017Ca i aplikacji."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety p\u0142ytek elewacyjnych Cerrad Loft Brick?", a: "P\u0142ytki Cerrad Loft Brick wyr\xF3\u017Cniaj\u0105 si\u0119 realistycznym wygl\u0105dem ceg\u0142y klinkierowej, wysok\u0105 mrozoodporno\u015Bci\u0105, nisk\u0105 nasi\u0105kliwo\u015Bci\u0105 oraz odporno\u015Bci\u0105 na zmienne warunki atmosferyczne, co gwarantuje trwa\u0142o\u015B\u0107 i estetyk\u0119 elewacji na lata." },
      { q: "Czy p\u0142ytki Cerrad Loft Brick nadaj\u0105 si\u0119 do zastosowania na zewn\u0105trz?", a: "Tak, s\u0105 to p\u0142ytki elewacyjne przeznaczone specjalnie do stosowania na zewn\u0119trznych \u015Bcianach budynk\xF3w, charakteryzuj\u0105ce si\u0119 parametrami zapewniaj\u0105cymi odporno\u015B\u0107 na czynniki zewn\u0119trzne." },
      { q: "Jakie s\u0105 wymiary p\u0142ytki Cerrad Loft Brick?", a: "P\u0142ytka elewacyjna Cerrad Loft Brick ma wymiary 300x600 mm i grubo\u015B\u0107 8,5 mm, co pozwala na tworzenie nowoczesnych aran\u017Cacji elewacyjnych." }
    ],
    seoDescription: "Szukasz nowoczesnych rozwi\u0105za\u0144 dla swojej fasady? P\u0142ytka elewacyjna Cerrad Loft Brick 30x60 cm to doskona\u0142y wyb\xF3r! Ta wyj\u0105tkowa p\u0142ytka, imituj\u0105ca autentyczn\u0105 ceg\u0142\u0119 klinkierow\u0105, nada Twojemu budynkowi niepowtarzalny charakter w stylu loftowym i industrialnym. Wykonana z dba\u0142o\u015Bci\u0105 o detale, charakteryzuje si\u0119 imponuj\u0105c\u0105 mrozoodporno\u015Bci\u0105 i nisk\u0105 nasi\u0105kliwo\u015Bci\u0105 (\u2264 3%), co gwarantuje jej trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na zmienne warunki atmosferyczne. \u0141atwa w monta\u017Cu i piel\u0119gnacji, sprawi, \u017Ce Twoja elewacja b\u0119dzie prezentowa\u0107 si\u0119 nienagannie przez d\u0142ugie lata. Odkryj mo\u017Cliwo\u015Bci, jakie daje p\u0142ytka elewacyjna Cerrad Loft Brick 30x60 i stw\xF3rz unikaln\u0105, stylow\u0105 fasad\u0119 dla swojego domu."
  },
  {
    id: "p123",
    slug: "stopnica-paradyz-carrara-30x120",
    name: "Stopnica Parady\u017C Ceramica Carrara Bianco 30\xD7120 cm",
    categorySlug: "stopnice",
    brand: "Parady\u017C",
    sku: "PAR-CARR-30-120",
    unit: "szt.",
    shortDescription: "Stopnica Parady\u017C Ceramica Carrara Bianco 30x120 cm to eleganckie wyko\u0144czenie schod\xF3w z rektyfikowanego gresu. Klasyczny wygl\u0105d marmuru Carrara i wysoka trwa\u0142o\u015B\u0107.",
    description: "Podkre\u015Bl pi\u0119kno swoich schod\xF3w z rektyfikowan\u0105 stopnic\u0105 Parady\u017C Ceramica Carrara Bianco o wymiarach 30x120 cm. Ten wyj\u0105tkowy element wyko\u0144czeniowy, wykonany z wysokiej jako\u015Bci gresu, imituje szlachetny marmur Carrara, nadaj\u0105c wn\u0119trzu luksusowy charakter. Klasa antypo\u015Blizgowo\u015Bci R10 zapewnia bezpiecze\u0144stwo u\u017Cytkowania, a niska nasi\u0105kliwo\u015B\u0107 (\u2264 0,5%) gwarantuje odporno\u015B\u0107 na wilgo\u0107 i \u0142atwo\u015B\u0107 utrzymania w czysto\u015Bci. Idealna do nowoczesnych i klasycznych aran\u017Cacji, zar\xF3wno wewn\u0105trz, jak i na zewn\u0105trz.",
    application: "Stopnice Parady\u017C Ceramica Carrara Bianco s\u0105 przeznaczone do wyka\u0144czania stopni schod\xF3w wewn\u0119trznych i zewn\u0119trznych. Mog\u0105 by\u0107 stosowane na istniej\u0105ce pod\u0142o\u017Ca betonowe, drewniane lub stalowe, po odpowiednim przygotowaniu. Zaleca si\u0119 monta\u017C na klej do gresu, z uwzgl\u0119dnieniem warunk\xF3w atmosferycznych.",
    technicalSpec: [
      { label: "Wymiar", value: "300 \xD7 1200 mm" },
      { label: "Grubo\u015B\u0107", value: "9 mm" },
      { label: "Antypo\u015Blizgowo\u015B\u0107", value: "R10" },
      { label: "Nasi\u0105kliwo\u015B\u0107", value: "\u2264 0,5%" }
    ],
    images: [],
    tags: [
      "stopnica",
      "parady\u017C",
      "carrara",
      "schody",
      "bia\u0142a",
      "rektyfikowana",
      "gres"
    ],
    related: ["p120", "p119", "p060"],
    advantages: [
      "Elegancki design imituj\u0105cy marmur Carrara.",
      "Wysoka trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na uszkodzenia.",
      "Klasa antypo\u015Blizgowo\u015Bci R10 zwi\u0119ksza bezpiecze\u0144stwo.",
      "Rektyfikowane kraw\u0119dzie umo\u017Cliwiaj\u0105 precyzyjny monta\u017C z minimaln\u0105 fug\u0105."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 odpowiednie kleje do gresu i fugi.",
      "Przed monta\u017Cem sprawdzi\u0107 stan techniczny pod\u0142o\u017Ca."
    ],
    faq: [
      { q: "Jakie s\u0105 wymiary stopnicy Parady\u017C Ceramica Carrara Bianco?", a: "Stopnica ma wymiary 30 cm szeroko\u015Bci i 120 cm d\u0142ugo\u015Bci, co pozwala na estetyczne wyko\u0144czenie wi\u0119kszo\u015Bci stopni." },
      { q: "Czy stopnica jest odporna na warunki zewn\u0119trzne?", a: "Tak, dzi\u0119ki niskiej nasi\u0105kliwo\u015Bci i wysokiej mrozoodporno\u015Bci, stopnica nadaje si\u0119 do stosowania na zewn\u0105trz." },
      { q: "Jak dba\u0107 o czysto\u015B\u0107 stopnic?", a: "Powierzchni\u0119 stopnic mo\u017Cna czy\u015Bci\u0107 standardowymi \u015Brodkami do piel\u0119gnacji p\u0142ytek ceramicznych, unikaj\u0105c silnych kwas\xF3w i agresywnych detergent\xF3w." }
    ],
    seoDescription: "Kup rektyfikowan\u0105 stopnic\u0119 Parady\u017C Ceramica Carrara Bianco 30x120 cm z antypo\u015Blizgowo\u015Bci\u0105 R10. Eleganckie wyko\u0144czenie schod\xF3w bia\u0142ym gresem imituj\u0105cym marmur. Niska nasi\u0105kliwo\u015B\u0107, trwa\u0142o\u015B\u0107, \u0142atwo\u015B\u0107 monta\u017Cu. Idealna do wn\u0119trz i na zewn\u0105trz. Stopnice Parady\u017C do nowoczesnych aran\u017Cacji. Sprawd\u017A cen\u0119 i dost\u0119pno\u015B\u0107 na schody bia\u0142e, gresowe, z efektem marmuru Carrara."
  },
  {
    id: "p124",
    slug: "mozaika-szklana-dunin-30x30",
    name: "Mozaika szklana Dunin Vetro White 30\xD730 cm",
    categorySlug: "mozaiki",
    brand: "Dunin",
    sku: "DUN-VETRO-W-30",
    unit: "m\xB2",
    shortDescription: "Elegancka mozaika szklana Dunin Vetro White 30\xD730 cm. Idealna do \u0142azienek i kuchni, nadaje wn\u0119trzu blask. Wytrzyma\u0142a i \u0142atwa w utrzymaniu czysto\u015Bci.",
    description: "Odkryj wyj\u0105tkowe pi\u0119kno mozaiki szklanej Dunin Vetro White 30\xD730 cm. Ten produkt o wymiarach 300 \xD7 300 mm, z kostkami o boku 48 mm i grubo\u015Bci zaledwie 4 mm, wnosi subtelny blask i nowoczesny styl do ka\u017Cdego wn\u0119trza. Wykonana z wysokiej jako\u015Bci szk\u0142a, mozaika jest niezwykle trwa\u0142a, odporna na wilgo\u0107 i \u0142atwa do czyszczenia, co czyni j\u0105 idealnym wyborem do \u0142azienek, kuchni, a nawet jako dekoracja basen\xF3w. Siatka mesh na spodzie zapewnia \u0142atwo\u015B\u0107 monta\u017Cu i precyzyjne dopasowanie. Stw\xF3rz niepowtarzaln\u0105 atmosfer\u0119 z mozaik\u0105 Dunin Vetro White.",
    application: "Mozaika szklana Dunin Vetro White przeznaczona jest do dekoracji \u015Bcian wewn\u0119trznych i zewn\u0119trznych. Doskonale sprawdzi si\u0119 w \u0142azienkach (\u015Bciany prysznicowe, obudowa wanny), kuchniach (fartuchy) oraz jako element dekoracyjny w salonach. Mo\u017Cna j\u0105 r\xF3wnie\u017C stosowa\u0107 w \u015Brodowiskach o podwy\u017Cszonej wilgotno\u015Bci, np. przy basenach. Nale\u017Cy stosowa\u0107 na stabilnych i czystych pod\u0142o\u017Cach, z u\u017Cyciem odpowiednich klej\xF3w do mozaik szklanych i fug.",
    technicalSpec: [
      { label: "Wymiar arkusza", value: "300 \xD7 300 mm" },
      { label: "Modu\u0142 tesery", value: "48 \xD7 48 mm" },
      { label: "Grubo\u015B\u0107", value: "4 mm" },
      { label: "Podk\u0142ad", value: "siatka mesh" }
    ],
    images: [],
    tags: [
      "mozaika szklana",
      "dunin",
      "vetro",
      "bia\u0142a",
      "\u0142azienka",
      "dekoracja",
      "pool"
    ],
    related: ["p119", "p057", "p060"],
    advantages: [
      "Elegancki, po\u0142yskuj\u0105cy wygl\u0105d bia\u0142ego szk\u0142a.",
      "Wysoka odporno\u015B\u0107 na wilgo\u0107 i plamy.",
      "\u0141atwo\u015B\u0107 czyszczenia i konserwacji.",
      "Wszechstronne zastosowanie w r\xF3\u017Cnych pomieszczeniach i powierzchniach."
    ],
    warnings: [
      "Stosowa\u0107 wy\u0142\u0105cznie kleje rekomendowane do mozaik szklanych.",
      "Unika\u0107 stosowania agresywnych \u015Brodk\xF3w czyszcz\u0105cych mog\u0105cych uszkodzi\u0107 szk\u0142o."
    ],
    faq: [
      { q: "Jakie s\u0105 wymiary pojedynczej kostki tej mozaiki szklanej?", a: "Pojedyncza kostka (tesera) mozaiki Dunin Vetro White ma wymiar 48 \xD7 48 mm, co pozwala na tworzenie subtelnych i precyzyjnych wzor\xF3w." },
      { q: "Czy mozaika szklana nadaje si\u0119 do \u0142azienki?", a: "Tak, mozaika szklana jest doskona\u0142ym wyborem do \u0142azienek ze wzgl\u0119du na swoj\u0105 wodoodporno\u015B\u0107 i \u0142atwo\u015B\u0107 czyszczenia." },
      { q: "Jakie pod\u0142o\u017Ce jest zalecane do monta\u017Cu tej mozaiki?", a: "Zalecane jest stosowanie mozaiki na stabilnych, r\xF3wnych i czystych powierzchniach, takich jak zagruntowany tynk lub p\u0142yta wodoodporna, z u\u017Cyciem dedykowanych klej\xF3w." }
    ],
    seoDescription: "Elegancka mozaika szklana Dunin Vetro White 30\xD730 cm to doskona\u0142y wyb\xF3r do nowoczesnych wn\u0119trz. Bia\u0142a mozaika szklana o wymiarach 48x48 mm kostka i grubo\u015Bci 4 mm, idealnie sprawdzi si\u0119 jako dekoracja \u0142azienki, kuchni czy \u015Bciany prysznicowej. Wytrzyma\u0142a, \u0142atwa w czyszczeniu i monta\u017Cu dzi\u0119ki siatce mesh. Odkryj pi\u0119kno mozaiki Dunin Vetro White do stworzenia unikalnej przestrzeni. Mozaika szklana na basen, fartuch kuchenny, dekoracja \u015Bcienna. Dunin mozaika szklana bia\u0142a."
  },
  {
    id: "p125",
    slug: "listwa-dekoracyjna-aluminiowa-25x8-2500",
    name: "Listwa dekoracyjna aluminiowa przej\u015Bciowa 25\xD78 mm 2,5 m",
    categorySlug: "listwy-akcesoria",
    brand: "Schl\xFCter",
    sku: "SCH-RENO-25-250",
    unit: "szt. 2,5 m",
    shortDescription: "Listwa przej\u015Bciowa Schl\xFCter z anodowanego aluminium o wymiarach 25x8 mm i d\u0142ugo\u015Bci 2,5 m. Idealna do estetycznego i trwa\u0142ego wyko\u0144czenia po\u0142\u0105cze\u0144 pod\u0142ogowych.",
    description: "Listwa przej\u015Bciowa Schl\xFCter to wysokiej jako\u015Bci produkt wykonany z anodowanego aluminium, przeznaczony do profesjonalnego wyko\u0144czenia po\u0142\u0105cze\u0144 mi\u0119dzy r\xF3\u017Cnymi rodzajami ok\u0142adzin pod\u0142ogowych. Jej wymiary 25x8 mm sprawiaj\u0105, \u017Ce doskonale nadaje si\u0119 do tworzenia eleganckich przej\u015B\u0107 mi\u0119dzy p\u0142ytkami ceramicznymi, panelami czy wyk\u0142adzinami. Listwa ta pe\u0142ni funkcj\u0119 ochronn\u0105, zapobiegaj\u0105c uszkodzeniom kraw\u0119dzi ok\u0142adzin, a tak\u017Ce stanowi estetyczny element dekoracyjny. Anodowane aluminium zapewnia odporno\u015B\u0107 na \u015Bcieranie i korozj\u0119, gwarantuj\u0105c d\u0142ugotrwa\u0142y i nienaganny wygl\u0105d.",
    application: "Stosowana jako element przej\u015Bciowy i dylatacyjny na posadzkach, gdzie \u0142\u0105cz\u0105 si\u0119 r\xF3\u017Cne materia\u0142y ok\u0142adzinowe (np. p\u0142ytki z panelami). Montowana w jednej p\u0142aszczy\u017Anie z ok\u0142adzin\u0105. Nadaje si\u0119 do u\u017Cytku w pomieszczeniach mieszkalnych, biurowych i u\u017Cyteczno\u015Bci publicznej, zapewniaj\u0105c estetyczne i funkcjonalne wyko\u0144czenie.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107", value: "25 mm" },
      { label: "Wysoko\u015B\u0107", value: "8 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "2500 mm" },
      { label: "Materia\u0142", value: "aluminium anodowane" }
    ],
    images: [],
    tags: [
      "listwa aluminiowa",
      "schl\xFCter",
      "przej\u015Bciowa",
      "dylatacja",
      "p\u0142ytki",
      "wyko\u0144czenie"
    ],
    related: ["p120", "p057", "p060"],
    advantages: [
      "Eleganckie i estetyczne wyko\u0144czenie po\u0142\u0105cze\u0144 pod\u0142ogowych.",
      "Wykonana z wytrzyma\u0142ego, anodowanego aluminium.",
      "Chroni kraw\u0119dzie ok\u0142adzin przed uszkodzeniami.",
      "Prosty i szybki monta\u017C z r\xF3\u017Cnymi rodzajami ok\u0142adzin."
    ],
    warnings: [
      "Nie stosowa\u0107 w miejscach nara\u017Conych na silne \u015Brodki chemiczne.",
      "Unika\u0107 uszkodze\u0144 mechanicznych podczas monta\u017Cu i u\u017Cytkowania."
    ],
    faq: [
      { q: "Do czego s\u0142u\u017Cy listwa przej\u015Bciowa?", a: "Listwa przej\u015Bciowa s\u0142u\u017Cy do estetycznego i funkcjonalnego po\u0142\u0105czenia r\xF3\u017Cnych rodzaj\xF3w ok\u0142adzin pod\u0142ogowych, np. mi\u0119dzy p\u0142ytkami a panelami lub wyk\u0142adzin\u0105. Zapewnia p\u0142ynne przej\u015Bcie i chroni kraw\u0119dzie materia\u0142\xF3w." },
      { q: "Z jakiego materia\u0142u jest wykonana listwa?", a: "Listwa wykonana jest z anodowanego aluminium, co zapewnia jej wysok\u0105 odporno\u015B\u0107 na \u015Bcieranie, korozj\u0119 oraz atrakcyjny wygl\u0105d przez d\u0142ugi czas." },
      { q: "Jakie s\u0105 wymiary tej listwy?", a: "Listwa ma szeroko\u015B\u0107 25 mm, wysoko\u015B\u0107 8 mm i standardow\u0105 d\u0142ugo\u015B\u0107 2,5 metra, co u\u0142atwia jej dopasowanie do r\xF3\u017Cnych powierzchni." }
    ],
    seoDescription: "Listwa przej\u015Bciowa aluminiowa Schl\xFCter 25x8 mm, 2,5 m to idealne rozwi\u0105zanie do wyko\u0144czenia pod\u0142\xF3g. Oferujemy eleganckie listwy aluminiowe anodowane do \u0142\u0105czenia p\u0142ytek, paneli i wyk\u0142adzin. Listwa dylatacyjna Schl\xFCter zapewnia trwa\u0142e i estetyczne przej\u015Bcia pod\u0142ogowe. Zastosowanie listwy przej\u015Bciowej gwarantuje ochron\u0119 kraw\u0119dzi i nienaganny wygl\u0105d posadzki. Doskona\u0142a jako\u015B\u0107 i \u0142atwy monta\u017C listew akcesoryjnych Schl\xFCter do ka\u017Cdego wn\u0119trza."
  },
  {
    id: "p126",
    slug: "lamela-dekoracyjna-3d-biala-sciana",
    name: "Panel lamelowy 3D \u015Bcienny bia\u0142y MDF 30\xD7120 cm",
    categorySlug: "lamele-dekoracyjne",
    brand: "Orac Decor",
    sku: "ORAC-LAM-3D-W-120",
    unit: "szt.",
    shortDescription: "Elegancki bia\u0142y panel lamelowy 3D MDF Orac Decor 30x120 cm. Nadaje wn\u0119trzu nowoczesny charakter i tr\xF3jwymiarow\u0105 g\u0142\u0119bi\u0119. Idealny do salonu, sypialni i biura.",
    description: "Nadaj swojemu wn\u0119trzu niepowtarzalny, nowoczesny charakter z bia\u0142ym panelem lamelowym 3D MDF od Orac Decor. O wymiarach 30x120 cm, ten panel \u015Bcienny wykonany z wysokiej jako\u015Bci lakierowanego MDF-u zachwyca swoj\u0105 prostot\u0105 i elegancj\u0105. Tr\xF3jwymiarowa struktura lamel dodaje przestrzeni g\u0142\u0119bi i dynamiki, tworz\u0105c efektown\u0105 dekoracj\u0119 \u015Bcian. Doskonale sprawdzi si\u0119 w nowoczesnych aran\u017Cacjach, dodaj\u0105c im stylu i wyrafinowania. \u0141atwy monta\u017C za pomoc\u0105 kleju monta\u017Cowego sprawia, \u017Ce jest to praktyczne rozwi\u0105zanie do szybkiej metamorfozy wn\u0119trza.",
    application: "Panel lamelowy Orac Decor przeznaczony jest do stosowania wewn\u0105trz pomieszcze\u0144, na pionowych powierzchniach \u015Bcian. Idealnie nadaje si\u0119 do dekoracji salon\xF3w, sypialni, korytarzy, biur oraz przestrzeni komercyjnych. Monta\u017C powinien odbywa\u0107 si\u0119 na czystym, suchym i stabilnym pod\u0142o\u017Cu, przy u\u017Cyciu dedykowanego kleju monta\u017Cowego.",
    technicalSpec: [
      { label: "Wymiar", value: "300 \xD7 1200 mm" },
      { label: "Materia\u0142", value: "MDF lakierowany" },
      { label: "Kolor", value: "bia\u0142y" },
      { label: "Monta\u017C", value: "klej monta\u017Cowy" }
    ],
    images: [],
    tags: [
      "lamela dekoracyjna",
      "orac decor",
      "panel 3d",
      "\u015Bcienny",
      "mdf",
      "bia\u0142y",
      "nowoczesny"
    ],
    related: ["p119", "p056", "p093"],
    advantages: [
      "Nowoczesny design 3D dodaj\u0105cy g\u0142\u0119bi i charakteru.",
      "Wysokiej jako\u015Bci lakierowany MDF zapewniaj\u0105cy trwa\u0142o\u015B\u0107.",
      "Uniwersalny bia\u0142y kolor pasuj\u0105cy do wielu aran\u017Cacji.",
      "Prosty i szybki monta\u017C za pomoc\u0105 kleju monta\u017Cowego."
    ],
    warnings: [
      "Stosowa\u0107 wy\u0142\u0105cznie wewn\u0105trz pomieszcze\u0144, z dala od \u017Ar\xF3de\u0142 wilgoci.",
      "Upewni\u0107 si\u0119, \u017Ce pod\u0142o\u017Ce jest czyste, suche i stabilne przed monta\u017Cem."
    ],
    faq: [
      { q: "Jakie s\u0105 wymiary panelu?", a: "Panel lamelowy Orac Decor ma wymiary 30 cm szeroko\u015Bci i 120 cm d\u0142ugo\u015Bci, co u\u0142atwia jego dopasowanie do r\xF3\u017Cnych przestrzeni \u015Bciennych." },
      { q: "Z jakiego materia\u0142u wykonany jest panel?", a: "Panel wykonany jest z wysokiej jako\u015Bci lakierowanego MDF-u, co zapewnia mu trwa\u0142o\u015B\u0107 i estetyczny wygl\u0105d." },
      { q: "Jak montuje si\u0119 panel lamelowy?", a: "Monta\u017C panelu lamelowego odbywa si\u0119 za pomoc\u0105 dedykowanego kleju monta\u017Cowego. Nale\u017Cy upewni\u0107 si\u0119, \u017Ce powierzchnia \u015Bciany jest odpowiednio przygotowana." }
    ],
    seoDescription: "Bia\u0142y panel lamelowy 3D Orac Decor z MDF-u o wymiarach 30x120 cm to nowoczesna dekoracja \u015Bcienna. Wzboga\u0107 swoje wn\u0119trze o tr\xF3jwymiarowy efekt i elegancj\u0119. Idealny do salonu, sypialni, biura. \u0141atwy monta\u017C. Sprawd\u017A, jak lamele dekoracyjne Orac Decor odmieni\u0105 Tw\xF3j dom. Panel 3D MDF bia\u0142y, nowoczesne aran\u017Cacje \u015Bcienne, dekoracja \u015Bcian. Oryginalne panele \u015Bcienne Orac Decor dla wymagaj\u0105cych. Najlepsze rozwi\u0105zania dekoracyjne do wn\u0119trz. Kup ju\u017C dzi\u015B panele lamelowe."
  },
  {
    id: "p127",
    slug: "kolki-wkrety-wuerth-sx-plus-6x40-100szt",
    name: "Ko\u0142ki rozporowe z wkr\u0119tem W\xFCrth SX Plus 6\xD740 mm 100 szt.",
    categorySlug: "kolki-wkrety-uniwersalne",
    brand: "W\xFCrth",
    sku: "WUR-SX-6-40-100",
    unit: "opak. 100 szt.",
    shortDescription: "Uniwersalne ko\u0142ki rozporowe W\xFCrth SX Plus 6x40 mm z wkr\u0119tem, wykonane z wytrzyma\u0142ego nylonu PA6. Idealne do szybkiego i pewnego mocowania w r\xF3\u017Cnorodnych materia\u0142ach budowlanych.",
    description: "Ko\u0142ki rozporowe W\xFCrth SX Plus 6x40 mm to gwarancja solidnego i trwa\u0142ego monta\u017Cu. Wykonane z wysokiej jako\u015Bci nylonu PA6, charakteryzuj\u0105 si\u0119 doskona\u0142\u0105 odporno\u015Bci\u0105 na obci\u0105\u017Cenia i czynniki atmosferyczne. Ich innowacyjna konstrukcja zapewnia optymalne rozpieranie si\u0119 w pod\u0142o\u017Cu, co przek\u0142ada si\u0119 na maksymaln\u0105 si\u0142\u0119 ud\u017Awigu. Zestaw zawiera odpowiednio dobrany wkr\u0119t, u\u0142atwiaj\u0105c szybkie i bezproblemowe aplikacje. Ko\u0142ki te s\u0105 niezast\u0105pione przy wieszaniu p\xF3\u0142ek, uchwyt\xF3w, karniszy czy drobnego sprz\u0119tu RTV/AGD w budownictwie mieszkaniowym i komercyjnym.",
    application: "Ko\u0142ki W\xFCrth SX Plus 6x40 mm przeznaczone s\u0105 do stosowania w szerokiej gamie materia\u0142\xF3w budowlanych, takich jak beton, ceg\u0142a pe\u0142na, ceg\u0142a dziurawka, pustaki ceramiczne i gazobeton. Nale\u017Cy je aplikowa\u0107 w otworach wykonanych zgodnie z zaleceniami producenta, w warunkach typowych dla prac budowlanych i remontowych.",
    technicalSpec: [
      { label: "\u015Arednica ko\u0142ka", value: "6 mm" },
      { label: "D\u0142ugo\u015B\u0107 ko\u0142ka", value: "40 mm" },
      { label: "Wkr\u0119t", value: "4,5 \xD7 45 mm" },
      { label: "Materia\u0142", value: "nylon PA6" }
    ],
    images: [],
    tags: [
      "ko\u0142ek rozporowy",
      "w\xFCrth",
      "sx plus",
      "6x40",
      "mocowanie",
      "nylon",
      "mur beton"
    ],
    related: ["p128", "p129", "p061"],
    advantages: [
      "Wszechstronne zastosowanie w wielu rodzajach materia\u0142\xF3w budowlanych.",
      "Wytrzyma\u0142y nylon PA6 zapewnia d\u0142ugotrwa\u0142\u0105 stabilno\u015B\u0107 i odporno\u015B\u0107.",
      "Szybki i \u0142atwy monta\u017C dzi\u0119ki dopasowanemu wkr\u0119towi.",
      "Gwarancja pewnego i bezpiecznego mocowania element\xF3w.",
      "Optymalne rozpieranie dla maksymalnej si\u0142y ud\u017Awigu."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 odpowiednie narz\u0119dzia i przestrzega\u0107 instrukcji monta\u017Cu.",
      "Unika\u0107 stosowania w materia\u0142ach, do kt\xF3rych produkt nie jest przeznaczony."
    ],
    faq: [
      { q: "Do jakich materia\u0142\xF3w budowlanych mo\u017Cna stosowa\u0107 ko\u0142ki W\xFCrth SX Plus 6x40 mm?", a: "Ko\u0142ki SX Plus s\u0105 uniwersalne i nadaj\u0105 si\u0119 do monta\u017Cu w betonie, cegle pe\u0142nej i dziurawce, pustakach ceramicznych oraz gazobetonie. Zapewniaj\u0105 pewne mocowanie w wi\u0119kszo\u015Bci popularnych pod\u0142o\u017Cy budowlanych." },
      { q: "Jaki jest wymiar wkr\u0119ta do\u0142\u0105czonego do ko\u0142ka 6x40 mm?", a: "Do ko\u0142ka rozporowego W\xFCrth SX Plus o wymiarach 6x40 mm do\u0142\u0105czony jest wkr\u0119t o wymiarach 4,5 x 45 mm, idealnie dopasowany do jego konstrukcji." },
      { q: "Z jakiego materia\u0142u wykonane s\u0105 ko\u0142ki W\xFCrth SX Plus?", a: "Ko\u0142ki W\xFCrth SX Plus wykonane s\u0105 z wysokiej jako\u015Bci nylonu PA6, kt\xF3ry zapewnia im du\u017C\u0105 wytrzyma\u0142o\u015B\u0107, odporno\u015B\u0107 na obci\u0105\u017Cenia i warunki atmosferyczne." }
    ],
    seoDescription: "Kup ko\u0142ki rozporowe W\xFCrth SX Plus 6x40 mm z wkr\u0119tem 4,5x45 mm. Uniwersalne mocowanie w betonie, cegle, pustakach i gazobetonie. Wytrzyma\u0142y nylon PA6 gwarantuje pewne po\u0142\u0105czenie. Idealne do wieszania p\xF3\u0142ek, karniszy, uchwyt\xF3w. Szybki monta\u017C ko\u0142k\xF3w rozporowych W\xFCrth \u2013 zam\xF3w ju\u017C dzi\u015B! Sprawd\u017A opinie o ko\u0142kach SX Plus 6x40, por\xF3wnaj ceny i wybierz najlepsze rozwi\u0105zanie do Twojego domu. Profesjonalne ko\u0142ki do ci\u0119\u017Ckich obci\u0105\u017Ce\u0144."
  },
  {
    id: "p128",
    slug: "kolki-talerzowe-hilti-x-ie-str-10cm-50szt",
    name: "Ko\u0142ki talerzowe do izolacji HILTI X-IE 10 cm 50 szt.",
    categorySlug: "kolki-rozpozowe",
    brand: "Hilti",
    sku: "HLT-XIE-10-50",
    unit: "opak. 50 szt.",
    shortDescription: "Ko\u0142ki talerzowe Hilti X-IE 10 cm to niezawodne mocowanie mechaniczne do izolacji termicznej, idealne do styropianu i we\u0142ny mineralnej w systemach ETICS.",
    description: "Ko\u0142ki talerzowe Hilti X-IE o d\u0142ugo\u015Bci 10 cm to profesjonalne rozwi\u0105zanie do trwa\u0142ego mocowania materia\u0142\xF3w izolacyjnych, takich jak styropian czy we\u0142na mineralna, w systemach ocieple\u0144 ETICS. Ich specjalna konstrukcja z talerzykiem o \u015Brednicy 60 mm zapewnia r\xF3wnomierne roz\u0142o\u017Cenie obci\u0105\u017Cenia i zapobiega uszkodzeniu materia\u0142u izolacyjnego. G\u0142\u0119boko\u015B\u0107 zakotwienia 35 mm gwarantuje stabilno\u015B\u0107 i bezpiecze\u0144stwo po\u0142\u0105czenia. Ko\u0142ki Hilti X-IE to gwarancja szybkiego monta\u017Cu i d\u0142ugotrwa\u0142ej wytrzyma\u0142o\u015Bci, sprawdzaj\u0105c si\u0119 w ka\u017Cdych warunkach budowlanych.",
    application: "Ko\u0142ki talerzowe Hilti X-IE s\u0105 przeznaczone do mechanicznego mocowania p\u0142yt izolacyjnych (styropian, we\u0142na mineralna) do \u015Bcian zewn\u0119trznych i wewn\u0119trznych w ramach system\xF3w ETICS. Stosowa\u0107 na pod\u0142o\u017Cach betonowych, murowanych oraz z betonu kom\xF3rkowego. Monta\u017C powinien odbywa\u0107 si\u0119 zgodnie z zaleceniami producenta systemu ETICS oraz specyfikacj\u0105 techniczn\u0105 produktu.",
    technicalSpec: [
      { label: "D\u0142ugo\u015B\u0107 \u0142\u0105cznika", value: "100 mm" },
      { label: "G\u0142\u0119boko\u015B\u0107 zakotwienia", value: "35 mm" },
      { label: "\u015Ar. talerzyka", value: "60 mm" },
      { label: "Zastosowanie", value: "izolacja styropian/we\u0142na" }
    ],
    images: [],
    tags: [
      "ko\u0142ek talerzowy",
      "hilti",
      "izolacja",
      "styropian",
      "we\u0142na",
      "etics",
      "mocowanie mechaniczne"
    ],
    related: ["p066", "p071", "p127"],
    advantages: [
      "Szybki i \u0142atwy monta\u017C mechaniczny izolacji.",
      "Stabilne i pewne mocowanie p\u0142yt styropianowych i we\u0142nianych.",
      "R\xF3wnomierne roz\u0142o\u017Cenie si\u0142 nacisku dzi\u0119ki szerokiemu talerzykowi.",
      "Wysoka trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na warunki atmosferyczne."
    ],
    warnings: [
      "Stosowa\u0107 odpowiednie narz\u0119dzia do monta\u017Cu i przestrzega\u0107 instrukcji.",
      "Upewni\u0107 si\u0119, \u017Ce pod\u0142o\u017Ce jest stabilne i odpowiednio przygotowane."
    ],
    faq: [
      { q: "Do jakich materia\u0142\xF3w izolacyjnych mo\u017Cna stosowa\u0107 ko\u0142ki Hilti X-IE?", a: "Ko\u0142ki talerzowe Hilti X-IE s\u0105 przeznaczone do mocowania materia\u0142\xF3w izolacyjnych takich jak styropian (EPS) oraz we\u0142na mineralna (MW) w systemach ocieple\u0144." },
      { q: "Jaka jest g\u0142\u0119boko\u015B\u0107 zakotwienia tych ko\u0142k\xF3w?", a: "G\u0142\u0119boko\u015B\u0107 zakotwienia ko\u0142k\xF3w Hilti X-IE wynosi 35 mm, co zapewnia solidne i bezpieczne mocowanie w pod\u0142o\u017Cu." },
      { q: "Czy ko\u0142ki talerzowe nadaj\u0105 si\u0119 do ka\u017Cdego rodzaju pod\u0142o\u017Ca?", a: "Ko\u0142ki te s\u0105 zalecane do stosowania na pod\u0142o\u017Cach betonowych, murowanych oraz z betonu kom\xF3rkowego. Przed monta\u017Cem nale\u017Cy upewni\u0107 si\u0119, \u017Ce pod\u0142o\u017Ce jest odpowiednio wytrzyma\u0142e." }
    ],
    seoDescription: "Kup ko\u0142ki talerzowe Hilti X-IE 10 cm (50 szt.) do mechanicznego mocowania izolacji. Idealne do styropianu i we\u0142ny mineralnej w systemach ETICS. D\u0142ugo\u015B\u0107 100mm, \u015Brednica talerzyka 60mm, g\u0142\u0119boko\u015B\u0107 zakotwienia 35mm. Niezawodne rozwi\u0105zania Hilti dla fachowc\xF3w od termoizolacji. Szybki monta\u017C, trwa\u0142a konstrukcja, gwarancja jako\u015Bci. Sprawd\u017A nasze promocje na ko\u0142ki do izolacji fasadowej i akcesoria budowlane. Najlepsze ceny na ko\u0142ki rozporowe Hilti. Zapewnij sobie solidne ocieplenie budynku z produktami Hilti."
  },
  {
    id: "p129",
    slug: "wkrety-do-drewna-wuerth-4x70-200szt",
    name: "Wkr\u0119ty do drewna W\xFCrth ASSY 4\xD770 mm 200 szt.",
    categorySlug: "wkrety-drewno",
    brand: "W\xFCrth",
    sku: "WUR-ASSY-4-70-200",
    unit: "opak. 200 szt.",
    shortDescription: "Wkr\u0119ty do drewna W\xFCrth ASSY 4x70 mm (200 szt.) to stalowe, ocynkowane galwanicznie wkr\u0119ty z pe\u0142nym gwintem, idealne do stolarki i konstrukcji drewnianych.",
    description: "Wkr\u0119ty do drewna W\xFCrth ASSY o wymiarach 4x70 mm to niezawodne rozwi\u0105zanie dla profesjonalist\xF3w i majsterkowicz\xF3w. Wykonane ze stali ocynkowanej galwanicznie, zapewniaj\u0105 doskona\u0142\u0105 odporno\u015B\u0107 na korozj\u0119, co jest kluczowe w konstrukcjach drewnianych, takich jak wi\u0119\u017Aby dachowe czy elementy stolarki budowlanej. Pe\u0142ny gwint gwarantuje pewne i mocne po\u0142\u0105czenie, minimalizuj\u0105c ryzyko rozwarstwienia drewna. Opakowanie zawiera 200 sztuk, co czyni je ekonomicznym wyborem dla wi\u0119kszych projekt\xF3w. Wkr\u0119ty ASSY to synonim jako\u015Bci i trwa\u0142o\u015Bci, ceniony w bran\u017Cy budowlanej za \u0142atwo\u015B\u0107 monta\u017Cu i niezawodno\u015B\u0107.",
    application: "Przeznaczone do szybkiego i trwa\u0142ego monta\u017Cu element\xF3w drewnianych w budownictwie i stolarstwie. Idealne do \u0142\u0105czenia desek, belek, p\u0142yt drewnopochodnych oraz do budowy wi\u0119\u017Ab dachowych, szalunk\xF3w, mebli ogrodowych i element\xF3w konstrukcyjnych. Mog\u0105 by\u0107 stosowane zar\xF3wno wewn\u0105trz, jak i na zewn\u0105trz pomieszcze\u0144, pod warunkiem odpowiedniego zabezpieczenia drewna przed wilgoci\u0105.",
    technicalSpec: [
      { label: "\u015Arednica", value: "4,0 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "70 mm" },
      { label: "Stalowe", value: "ocynkowane galwanicznie" },
      { label: "Gwint", value: "pe\u0142ny" }
    ],
    images: [],
    tags: [
      "wkr\u0119t do drewna",
      "w\xFCrth",
      "assy",
      "4x70",
      "ocynkowany",
      "stolarka",
      "wi\u0119\u017Aba"
    ],
    related: ["p127", "p128", "p137"],
    advantages: [
      "Wysoka odporno\u015B\u0107 na korozj\u0119 dzi\u0119ki ocynkowaniu galwanicznemu.",
      "Pe\u0142ny gwint zapewnia mocne i stabilne po\u0142\u0105czenie bez rozwarstwiania drewna.",
      "\u0141atwy i szybki monta\u017C, oszcz\u0119dzaj\u0105cy czas pracy.",
      "Solidna konstrukcja stalowa gwarantuje trwa\u0142o\u015B\u0107 po\u0142\u0105czenia."
    ],
    warnings: [
      "Przed wierceniem w twardym drewnie zaleca si\u0119 wykonanie otworu pilotuj\u0105cego.",
      "Nale\u017Cy stosowa\u0107 odpowiednie narz\u0119dzia (wkr\u0119tarka z regulacj\u0105 momentu obrotowego)."
    ],
    faq: [
      { q: "Jaki jest materia\u0142 i rodzaj zabezpieczenia antykorozyjnego wkr\u0119t\xF3w W\xFCrth ASSY 4x70 mm?", a: "Wkr\u0119ty W\xFCrth ASSY 4x70 mm wykonane s\u0105 ze stali i posiadaj\u0105 pow\u0142ok\u0119 cynkowan\u0105 galwanicznie, kt\xF3ra zapewnia im dobr\u0105 ochron\u0119 przed korozj\u0105, szczeg\xF3lnie w zastosowaniach wewn\u0119trznych i os\u0142oni\u0119tych." },
      { q: "Czy te wkr\u0119ty nadaj\u0105 si\u0119 do konstrukcji zewn\u0119trznych?", a: "Tak, dzi\u0119ki ocynkowaniu galwanicznemu nadaj\u0105 si\u0119 do zastosowa\u0144 zewn\u0119trznych, ale dla maksymalnej trwa\u0142o\u015Bci zaleca si\u0119 dodatkowe zabezpieczenie drewna przed wilgoci\u0105 i warunkami atmosferycznymi." },
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety pe\u0142nego gwintu w tych wkr\u0119tach?", a: "Pe\u0142ny gwint zapewnia r\xF3wnomierne roz\u0142o\u017Cenie si\u0142 na ca\u0142ej d\u0142ugo\u015Bci wkr\u0119ta, co skutkuje mocniejszym i bardziej stabilnym po\u0142\u0105czeniem, a tak\u017Ce zapobiega rozwarstwianiu si\u0119 drewna podczas wkr\u0119cania." }
    ],
    seoDescription: "Szukasz niezawodnych wkr\u0119t\xF3w do drewna? Wkr\u0119ty W\xFCrth ASSY 4x70 mm (200 szt.) to idealny wyb\xF3r do stolarki i wi\u0119\u017Aby dachowej. Te ocynkowane galwanicznie wkr\u0119ty stalowe z pe\u0142nym gwintem gwarantuj\u0105 trwa\u0142o\u015B\u0107 i pewno\u015B\u0107 po\u0142\u0105cze\u0144 w ka\u017Cdej konstrukcji drewnianej. Znajd\u017A najlepsze wkr\u0119ty do drewna W\xFCrth online. Idealne do szybkiego monta\u017Cu, odporne na korozj\u0119. Kup teraz wkr\u0119ty do drewna 4x70 mm z pe\u0142nym gwintem W\xFCrth ASSY dla profesjonalist\xF3w i majsterkowicz\xF3w."
  },
  {
    id: "p130",
    slug: "walek-malarski-18cm-marolex-profi",
    name: "Wa\u0142ek malarski 18 cm Marolex Profi zestaw",
    categorySlug: "walki-malarskie",
    brand: "Marolex",
    sku: "MAR-WAL-18-PROFI",
    unit: "szt.",
    shortDescription: "Profesjonalny wa\u0142ek malarski Marolex Profi o szeroko\u015Bci 18 cm. Idealny do g\u0142adkich powierzchni, zapewnia r\xF3wnomierne krycie farb emulsyjnych i lateksowych.",
    description: "Wa\u0142ek malarski Marolex Profi 18 cm to niezast\u0105pione narz\u0119dzie dla ka\u017Cdego, kto ceni sobie jako\u015B\u0107 i precyzj\u0119 podczas malowania. Wykonany z wytrzyma\u0142ego w\u0142\xF3kna poliestrowego o d\u0142ugo\u015Bci runa 13 mm, doskonale sprawdzi si\u0119 przy malowaniu g\u0142adkich \u015Bcian i sufit\xF3w. Aluminiowy trzon gwarantuje lekko\u015B\u0107 i komfort u\u017Cytkowania, nawet podczas d\u0142ugotrwa\u0142ych prac. Wa\u0142ek jest kompatybilny z popularnymi farbami emulsyjnymi i lateksowymi, zapewniaj\u0105c jednolite krycie bez smug i zaciek\xF3w. Wybierz Marolex Profi dla profesjonalnych efekt\xF3w w Twoim domu.",
    application: "Wa\u0142ek Marolex Profi 18 cm przeznaczony jest do malowania g\u0142adkich powierzchni wewn\u0119trznych, takich jak \u015Bciany, sufity, tynki czy g\u0142adzie. Idealnie nadaje si\u0119 do aplikacji farb emulsyjnych, lateksowych, akrylowych oraz innych farb wodnych. Stosuj w temperaturze pokojowej, unikaj ekstremalnych warunk\xF3w.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107", value: "180 mm" },
      { label: "Ok\u0142adzina", value: "w\u0142\xF3kno z poliestru 13 mm" },
      { label: "Trzon", value: "aluminiowy" },
      { label: "Kompatybilny z", value: "farby emulsyjne, lateks" }
    ],
    images: [],
    tags: [
      "wa\u0142ek malarski",
      "marolex",
      "profi",
      "18cm",
      "malowanie",
      "emulsja",
      "poliester"
    ],
    related: ["p131", "p134", "p081"],
    advantages: [
      "Profesjonalna jako\u015B\u0107 wykonania dla idealnego wyko\u0144czenia.",
      "Szeroko\u015B\u0107 18 cm zapewnia szybkie pokrycie du\u017Cych powierzchni.",
      "Runo poliestrowe 13 mm gwarantuje r\xF3wnomierne nanoszenie farby.",
      "Lekki aluminiowy trzon u\u0142atwia prac\u0119 i zmniejsza zm\u0119czenie."
    ],
    warnings: [
      "Przed pierwszym u\u017Cyciem dok\u0142adnie oczy\u015B\u0107 wa\u0142ek z kurzu i lu\u017Anych w\u0142\xF3kien.",
      "Po ka\u017Cdym u\u017Cyciu umyj wa\u0142ek w ciep\u0142ej wodzie z dodatkiem detergentu i pozostaw do wyschni\u0119cia."
    ],
    faq: [
      { q: "Do jakich powierzchni nadaje si\u0119 wa\u0142ek Marolex Profi 18 cm?", a: "Wa\u0142ek Marolex Profi 18 cm jest idealny do malowania g\u0142adkich powierzchni, takich jak \u015Bciany, sufity, tynki, g\u0142adzie oraz p\u0142yty kartonowo-gipsowe." },
      { q: "Jakie rodzaje farb mo\u017Cna stosowa\u0107 z tym wa\u0142kiem?", a: "Wa\u0142ek jest kompatybilny z wi\u0119kszo\u015Bci\u0105 farb emulsyjnych, lateksowych, akrylowych oraz innych farb na bazie wody." },
      { q: "Jak dba\u0107 o wa\u0142ek malarski, aby s\u0142u\u017Cy\u0142 jak najd\u0142u\u017Cej?", a: "Po ka\u017Cdym malowaniu wa\u0142ek nale\u017Cy dok\u0142adnie umy\u0107 w ciep\u0142ej wodzie z \u0142agodnym detergentem, usun\u0105\u0107 nadmiar wody i pozostawi\u0107 do ca\u0142kowitego wyschni\u0119cia w pozycji pionowej." }
    ],
    seoDescription: "Odkryj profesjonalny wa\u0142ek malarski Marolex Profi 18 cm, idealny do malowania \u015Bcian i sufit\xF3w farbami emulsyjnymi i lateksowymi. Z szeroko\u015Bci\u0105 180 mm i runem z w\u0142\xF3kna poliestrowego o grubo\u015Bci 13 mm, zapewnia doskona\u0142e krycie i g\u0142adkie wyko\u0144czenie. Lekki aluminiowy trzon gwarantuje komfort pracy. Ten wysokiej jako\u015Bci wa\u0142ek malarski od Marolex to gwarancja profesjonalnych rezultat\xF3w w ka\u017Cdym domu. Zastosuj go do g\u0142adkich powierzchni, tynk\xF3w i g\u0142adzi. Sprawd\u017A nasz wa\u0142ek profi do malowania emulsj\u0105!"
  },
  {
    id: "p131",
    slug: "pedzel-malarski-100mm-wooster",
    name: "P\u0119dzel malarski p\u0142aski 100 mm Wooster Pro",
    categorySlug: "pedzle",
    brand: "Wooster",
    sku: "WOO-PRO-100",
    unit: "szt.",
    shortDescription: "Profesjonalny p\u0119dzel malarski p\u0142aski Wooster Pro o szeroko\u015Bci 100 mm, z syntetycznym w\u0142osiem poliestrowym. Idealny do malowania farbami wodorozcie\u0144czalnymi. Solidna, drewniana r\u0105czka zapewnia komfort pracy.",
    description: "Odkryj niezawodno\u015B\u0107 i precyzj\u0119 z p\u0119dzlem malarskim p\u0142askim Wooster Pro 100 mm. Zaprojektowany z my\u015Bl\u0105 o profesjonalistach i wymagaj\u0105cych amatorach, ten p\u0119dzel wyposa\u017Cono w wysokiej jako\u015Bci, syntetyczne w\u0142osie poliestrowe, kt\xF3re gwarantuje doskona\u0142e krycie i r\xF3wnomierne rozprowadzanie farb wodorozcie\u0144czalnych, takich jak emulsje i lateksy. Szeroko\u015B\u0107 100 mm sprawia, \u017Ce jest on idealny do szybkiego malowania wi\u0119kszych powierzchni, takich jak \u015Bciany, sufity czy elewacje, minimalizuj\u0105c smugi. Ergonomiczna, drewniana r\u0105czka zapewnia pewny chwyt i komfort u\u017Cytkowania nawet podczas d\u0142ugotrwa\u0142ego malowania. Wybierz p\u0119dzel Wooster Pro dla profesjonalnych rezultat\xF3w.",
    application: "P\u0119dzel Wooster Pro 100 mm przeznaczony jest do malowania powierzchni wewn\u0119trznych i zewn\u0119trznych farbami wodorozcie\u0144czalnymi (emulsje, lateksy). Stosuj na zagruntowanych \u015Bcianach, tynkach, betonie, drewnie oraz powierzchniach pokrytych farb\u0105 podk\u0142adow\u0105. Optymalne rezultaty uzyskasz w temperaturze od 5\xB0C do 30\xB0C, przy wilgotno\u015Bci powietrza poni\u017Cej 80%.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107", value: "100 mm" },
      { label: "W\u0142osie", value: "syntetyczne polyester" },
      { label: "Zastosowanie", value: "farby wodorozcie\u0144czalne" },
      { label: "R\u0105czka", value: "drewniana" }
    ],
    images: [],
    tags: [
      "p\u0119dzel malarski",
      "wooster",
      "100mm",
      "syntetyczny",
      "malowanie",
      "farba emulsyjna"
    ],
    related: ["p130", "p134", "p081"],
    advantages: [
      "Profesjonalna jako\u015B\u0107 syntetycznego w\u0142osia poliestrowego dla g\u0142adkiego krycia.",
      "Szeroko\u015B\u0107 100 mm umo\u017Cliwia szybkie malowanie du\u017Cych powierzchni.",
      "Odporno\u015B\u0107 na rozpuszczalniki zawarte w farbach wodorozcie\u0144czalnych.",
      "Ergonomiczna, drewniana r\u0105czka dla komfortu i precyzji pracy."
    ],
    warnings: [
      "Po ka\u017Cdym u\u017Cyciu dok\u0142adnie umyj p\u0119dzel wod\u0105 z myd\u0142em i pozostaw do wyschni\u0119cia.",
      "Nie pozostawiaj p\u0119dzla zanurzonego w wodzie ani farbie na d\u0142u\u017Cszy czas."
    ],
    faq: [
      { q: "Do jakich rodzaj\xF3w farb nadaje si\u0119 p\u0119dzel Wooster Pro 100 mm?", a: "P\u0119dzel ten zosta\u0142 zaprojektowany specjalnie do aplikacji farb wodorozcie\u0144czalnych, takich jak farby emulsyjne, lateksowe czy akrylowe. Syntetyczne w\u0142osie poliestrowe zapewnia doskona\u0142e krycie i minimalizuje smugi przy tego typu materia\u0142ach." },
      { q: "Czy p\u0119dzel nadaje si\u0119 do malowania drewna?", a: "Tak, p\u0119dzel Wooster Pro 100 mm \u015Bwietnie sprawdzi si\u0119 do malowania drewnianych powierzchni, zw\u0142aszcza je\u015Bli u\u017Cywasz farb wodorozcie\u0144czalnych. Jego szeroko\u015B\u0107 pozwala na szybkie pokrycie wi\u0119kszych element\xF3w, a w\u0142osie zapewnia g\u0142adkie wyko\u0144czenie." },
      { q: "Jak dba\u0107 o p\u0119dzel, aby s\u0142u\u017Cy\u0142 jak najd\u0142u\u017Cej?", a: "Po zako\u0144czeniu malowania nale\u017Cy natychmiast umy\u0107 p\u0119dzel w letniej wodzie z dodatkiem \u0142agodnego detergentu, starannie wyp\u0142uka\u0107 i uformowa\u0107 w\u0142osie. Nast\u0119pnie odstawi\u0107 do wyschni\u0119cia w pozycji pionowej w\u0142osiem do g\xF3ry." }
    ],
    seoDescription: "Profesjonalny p\u0119dzel malarski p\u0142aski Wooster Pro o szeroko\u015Bci 100 mm to idealne narz\u0119dzie do malowania farbami wodorozcie\u0144czalnymi. Wykonany z wysokiej jako\u015Bci syntetycznego w\u0142osia poliestrowego, zapewnia doskona\u0142e krycie i g\u0142adkie wyko\u0144czenie \u015Bcian, sufit\xF3w i elewacji. Drewniana r\u0105czka gwarantuje komfort pracy z farbami emulsyjnymi i lateksowymi. P\u0119dzel 100mm Wooster Pro to synonim precyzji i trwa\u0142o\u015Bci. Sprawd\u017A, jak \u0142atwo mo\u017Cesz uzyska\u0107 profesjonalne rezultaty malarskie dzi\u0119ki temu niezawodnemu p\u0119dzlowi. Idealny do szybkiego malowania du\u017Cych powierzchni. Zam\xF3w ju\u017C dzi\u015B p\u0119dzel Wooster Pro i ciesz si\u0119 efektywno\u015Bci\u0105 pracy."
  },
  {
    id: "p132",
    slug: "szpachla-malarska-150mm-stalowa",
    name: "Szpachla malarska stalowa 150 mm",
    categorySlug: "szpachle",
    brand: "Stalco",
    sku: "STA-SZPACH-150",
    unit: "szt.",
    shortDescription: "Szpachla malarska Stalco 150 mm ze spr\u0119\u017Cystej stali to idealne narz\u0119dzie do precyzyjnego szpachlowania i klejenia powierzchni. Ergonomiczna r\u0105czka PP zapewnia komfort pracy.",
    description: "Szukasz niezawodnego narz\u0119dzia do prac wyko\u0144czeniowych? Szpachla malarska Stalco o szeroko\u015Bci 150 mm to doskona\u0142y wyb\xF3r dla profesjonalist\xF3w i majsterkowicz\xF3w. Wykonana z wysokiej jako\u015Bci, spr\u0119\u017Cystej stali, gwarantuje elastyczno\u015B\u0107 i trwa\u0142o\u015B\u0107, co przek\u0142ada si\u0119 na precyzyjne nak\u0142adanie mas szpachlowych i klej\xF3w. R\u0105czka z tworzywa PP jest ergonomicznie zaprojektowana, zapewniaj\u0105c pewny chwyt i komfort nawet podczas d\u0142ugotrwa\u0142ego u\u017Cytkowania. Idealnie nadaje si\u0119 do wyg\u0142adzania \u015Bcian, sufit\xF3w oraz usuwania starych pow\u0142ok malarskich przed malowaniem lub tapetowaniem.",
    application: "Szpachla Stalco 150 mm przeznaczona jest do nak\u0142adania i rozprowadzania mas szpachlowych, klej\xF3w oraz do usuwania lu\u017Anych fragment\xF3w tynku i starej farby. Mo\u017Ce by\u0107 stosowana na r\xF3\u017Cnorodnych pod\u0142o\u017Cach budowlanych, takich jak tynki cementowo-wapienne, gipsowe, p\u0142yty kartonowo-gipsowe oraz drewno. Idealna do prac wewn\u0105trz pomieszcze\u0144.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107", value: "150 mm" },
      { label: "Materia\u0142 ostrza", value: "stal spr\u0119\u017Cysta" },
      { label: "R\u0105czka", value: "PP tworzywo" },
      { label: "Zastosowanie", value: "szpachlowanie, klejenie" }
    ],
    images: [],
    tags: [
      "szpachla malarska",
      "stalco",
      "150mm",
      "stal spr\u0119\u017Cysta",
      "szpachlowanie",
      "gips",
      "masa szpachlowa"
    ],
    related: ["p133", "p130", "p006"],
    advantages: [
      "Precyzyjne i r\xF3wne rozprowadzanie mas szpachlowych.",
      "Wykonana z elastycznej, spr\u0119\u017Cystej stali nierdzewnej.",
      "Ergonomiczna r\u0105czka z tworzywa PP dla maksymalnego komfortu.",
      "Wytrzyma\u0142o\u015B\u0107 i odporno\u015B\u0107 na uszkodzenia mechaniczne."
    ],
    warnings: [
      "Po ka\u017Cdym u\u017Cyciu nale\u017Cy dok\u0142adnie oczy\u015Bci\u0107 szpachl\u0119 z resztek materia\u0142\xF3w.",
      "Przechowywa\u0107 w miejscu niedost\u0119pnym dla dzieci, z dala od wilgoci."
    ],
    faq: [
      { q: "Do jakich prac budowlanych najlepiej nadaje si\u0119 szpachla Stalco 150 mm?", a: "Szpachla Stalco 150 mm jest idealna do precyzyjnego nak\u0142adania i rozprowadzania mas szpachlowych, klej\xF3w, a tak\u017Ce do przygotowania powierzchni przed malowaniem czy tapetowaniem poprzez usuwanie starych pow\u0142ok." },
      { q: "Z jakiego materia\u0142u wykonane jest ostrze szpachli?", a: "Ostrze szpachli wykonane jest ze spr\u0119\u017Cystej stali, co zapewnia jej elastyczno\u015B\u0107, wytrzyma\u0142o\u015B\u0107 i precyzj\u0119 pracy." },
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety szpachli malarskiej Stalco?", a: "G\u0142\xF3wne zalety to precyzja pracy dzi\u0119ki spr\u0119\u017Cystemu ostrzu, komfort u\u017Cytkowania dzi\u0119ki ergonomicznej r\u0105czce z tworzywa PP oraz wysoka wytrzyma\u0142o\u015B\u0107 i odporno\u015B\u0107 na uszkodzenia." }
    ],
    seoDescription: "Szpachla malarska Stalco 150 mm ze spr\u0119\u017Cystej stali to profesjonalne narz\u0119dzie do prac wyko\u0144czeniowych. Doskonale sprawdzi si\u0119 do szpachlowania \u015Bcian, sufit\xF3w i innych powierzchni gipsowych oraz betonowych. Szeroko\u015B\u0107 150 mm zapewnia efektywne pokrycie, a elastyczne ostrze z wysokogatunkowej stali nierdzewnej gwarantuje idealne wyg\u0142adzenie. Ergonomiczna r\u0105czka z tworzywa PP minimalizuje zm\u0119czenie d\u0142oni podczas d\u0142ugotrwa\u0142ego u\u017Cytkowania. Niezast\u0105piona przy pracach remontowych i budowlanych, zapewniaj\u0105c doskona\u0142e rezultaty. Kup szpachl\u0119 Stalco 150 mm do g\u0142adzi i mas szpachlowych."
  },
  {
    id: "p133",
    slug: "kielnia-murarska-stalco-200mm",
    name: "Kielnia murarska Stalco 200 mm",
    categorySlug: "kielnie",
    brand: "Stalco",
    sku: "STA-KIEL-200",
    unit: "szt.",
    shortDescription: "Kielnia murarska Stalco 200 mm ze stali nierdzewnej z drewnian\u0105 r\u0105czk\u0105. Idealna do nak\u0142adania zapraw, tynk\xF3w i klej\xF3w. Niezb\u0119dne narz\u0119dzie dla ka\u017Cdego budowla\u0144ca.",
    description: "Solidna kielnia murarska Stalco o d\u0142ugo\u015Bci 200 mm, wykonana z wysokiej jako\u015Bci stali nierdzewnej, gwarantuje trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na korozj\u0119. Ergonomiczna, drewniana r\u0105czka zapewnia komfort u\u017Cytkowania nawet podczas d\u0142ugotrwa\u0142ej pracy. To wszechstronne narz\u0119dzie, kt\xF3re sprawdzi si\u0119 w wielu pracach budowlanych, od murowania po nak\u0142adanie zapraw, tynk\xF3w czy klej\xF3w. Stal nierdzewna zapewnia \u0142atwo\u015B\u0107 czyszczenia i d\u0142ugowieczno\u015B\u0107, czyni\u0105c j\u0105 niezast\u0105pionym elementem wyposa\u017Cenia ka\u017Cdego fachowca.",
    application: "Kielnia przeznaczona jest do precyzyjnego nak\u0142adania i rozprowadzania zapraw murarskich, tynkarskich oraz klej\xF3w budowlanych. Doskonale sprawdza si\u0119 podczas prac remontowych i budowlanych wewn\u0105trz i na zewn\u0105trz budynk\xF3w. Mo\u017Ce by\u0107 stosowana na r\xF3\u017Cnego rodzaju pod\u0142o\u017Cach betonowych, ceglanych czy bloczkowych.",
    technicalSpec: [
      { label: "Wymiar", value: "200 mm" },
      { label: "Materia\u0142", value: "stal nierdzewna" },
      { label: "R\u0105czka", value: "drewniana" },
      { label: "Zastosowanie", value: "zaprawy, tynki, kleje" }
    ],
    images: [],
    tags: [
      "kielnia murarska",
      "stalco",
      "200mm",
      "murowanie",
      "zaprawy",
      "tynkowanie",
      "inox"
    ],
    related: ["p132", "p134", "p057"],
    advantages: [
      "Wykonana z trwa\u0142ej stali nierdzewnej, odpornej na rdz\u0119.",
      "Ergonomiczna, drewniana r\u0105czka zapewnia pewny chwyt i komfort.",
      "Idealna do aplikacji zapraw, tynk\xF3w i klej\xF3w.",
      "Solidna konstrukcja gwarantuje d\u0142ug\u0105 \u017Cywotno\u015B\u0107 narz\u0119dzia."
    ],
    warnings: [
      "Po u\u017Cyciu nale\u017Cy dok\u0142adnie oczy\u015Bci\u0107 kielni\u0119 z resztek materia\u0142u.",
      "Przechowywa\u0107 w suchym miejscu, aby zapobiec korozji."
    ],
    faq: [
      { q: "Jaki jest g\u0142\xF3wny atut kielni murarskiej Stalco 200 mm?", a: "G\u0142\xF3wnym atutem jest po\u0142\u0105czenie wysokiej jako\u015Bci stali nierdzewnej z wygodn\u0105, drewnian\u0105 r\u0105czk\u0105, co zapewnia trwa\u0142o\u015B\u0107, komfort pracy i wszechstronno\u015B\u0107 zastosowa\u0144." },
      { q: "Do jakich prac budowlanych najlepiej nadaje si\u0119 ta kielnia?", a: "Kielnia ta jest idealna do prac zwi\u0105zanych z murowaniem, tynkowaniem, nak\u0142adaniem zapraw oraz klej\xF3w budowlanych." },
      { q: "Czy stal nierdzewna jest lepsza od zwyk\u0142ej stali w kielniach?", a: "Tak, stal nierdzewna jest znacznie bardziej odporna na korozj\u0119 i \u0142atwiejsza w czyszczeniu, co przek\u0142ada si\u0119 na d\u0142u\u017Csz\u0105 \u017Cywotno\u015B\u0107 i lepsz\u0105 higien\u0119 pracy." }
    ],
    seoDescription: "Szukasz wytrzyma\u0142ej kielni murarskiej? Kielnia Stalco 200 mm ze stali nierdzewnej to idealny wyb\xF3r dla profesjonalist\xF3w i majsterkowicz\xF3w. Wygodna, drewniana r\u0105czka i ostrze o d\u0142ugo\u015Bci 200 mm zapewniaj\u0105 precyzj\u0119 podczas nak\u0142adania zapraw, tynk\xF3w czy klej\xF3w. Niezast\u0105piona przy murowaniu, tynkowaniu i wszelkich pracach wyko\u0144czeniowych. Kielnia Stalco inox gwarantuje trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na warunki atmosferyczne. Kup kielni\u0119 murarsk\u0105 Stalco 200mm i usprawnij swoj\u0105 prac\u0119 budowlan\u0105."
  },
  {
    id: "p134",
    slug: "wiertarko-wkretarka-bosch-gsr18v-55",
    name: "Wiertarko-wkr\u0119tarka Bosch GSR 18V-55 (bez akumulatora)",
    categorySlug: "wiertarko-wkretarki",
    brand: "Bosch",
    sku: "BSH-GSR18V55",
    unit: "szt.",
    shortDescription: "Profesjonalna wiertarko-wkr\u0119tarka Bosch GSR 18V-55 z silnikiem bezszczotkowym 18V, maksymalnym momentem 55 Nm i 13 mm uchwytem. Idealna do wymagaj\u0105cych prac.",
    description: "Bosch GSR 18V-55 to wydajna wiertarko-wkr\u0119tarka akumulatorowa 18V, stworzona z my\u015Bl\u0105 o profesjonalistach. Wyposa\u017Cona w wytrzyma\u0142y silnik bezszczotkowy, oferuje imponuj\u0105cy maksymalny moment obrotowy 55 Nm, co gwarantuje du\u017C\u0105 moc przy wierceniu i wkr\u0119caniu nawet w twardych materia\u0142ach. Dwa biegi pozwalaj\u0105 na precyzyjne dopasowanie pr\u0119dko\u015Bci do wykonywanego zadania, a solidny, 13 mm uchwyt bezkluczowy zapewnia szybk\u0105 i \u0142atw\u0105 wymian\u0119 akcesori\xF3w. Jest to niezawodne narz\u0119dzie do szerokiego zakresu prac budowlanych, monta\u017Cowych i remontowych. Produkt sprzedawany bez akumulatora i \u0142adowarki.",
    application: "Przeznaczona do wiercenia otwor\xF3w w drewnie, metalu, tworzywach sztucznych oraz do wkr\u0119cania i wykr\u0119cania wkr\u0119t\xF3w. Sprawdzi si\u0119 w pracach budowlanych, monta\u017Cowych, instalacyjnych i podczas remont\xF3w. Stosowa\u0107 w suchych warunkach, z zachowaniem zasad bezpiecze\u0144stwa.",
    technicalSpec: [
      { label: "Napi\u0119cie", value: "18 V" },
      { label: "Maks. moment", value: "55 Nm" },
      { label: "Biegi", value: "2" },
      { label: "Uchwyt", value: "13 mm bezkluczowy" }
    ],
    images: [],
    tags: [
      "wiertarko-wkr\u0119tarka",
      "bosch",
      "gsr 18v",
      "akumulatorowa",
      "profesjonalna",
      "bezszczotkowa"
    ],
    related: ["p129", "p127", "p135"],
    advantages: [
      "Mocny silnik bezszczotkowy zapewnia d\u0142ug\u0105 \u017Cywotno\u015B\u0107 i wydajno\u015B\u0107.",
      "Wysoki moment obrotowy 55 Nm do ci\u0119\u017Cszych zastosowa\u0144.",
      "Dwa biegi dla wszechstronno\u015Bci i precyzji.",
      "Solidny 13 mm uchwyt bezkluczowy dla szybkiej wymiany narz\u0119dzi."
    ],
    warnings: [
      "Przed u\u017Cyciem zapoznaj si\u0119 z instrukcj\u0105 obs\u0142ugi.",
      "Zawsze stosuj odpowiednie \u015Brodki ochrony osobistej (okulary, r\u0119kawice)."
    ],
    faq: [
      { q: "Czy zestaw zawiera akumulator i \u0142adowark\u0119?", a: "Nie, wiertarko-wkr\u0119tarka Bosch GSR 18V-55 jest sprzedawana bez akumulatora i \u0142adowarki. Jest to rozwi\u0105zanie dla os\xF3b posiadaj\u0105cych ju\u017C narz\u0119dzia z systemu Bosch Professional 18V." },
      { q: "Jaki jest maksymalny moment obrotowy tego narz\u0119dzia?", a: "Maksymalny moment obrotowy wiertarko-wkr\u0119tarki Bosch GSR 18V-55 wynosi 55 Nm." },
      { q: "Do jakich prac nadaje si\u0119 to narz\u0119dzie?", a: "Narz\u0119dzie jest idealne do wiercenia w drewnie, metalu i tworzywach, a tak\u017Ce do wkr\u0119cania i wykr\u0119cania \u015Brub. Sprawdzi si\u0119 w profesjonalnych zastosowaniach budowlanych i monta\u017Cowych." }
    ],
    seoDescription: "Szukasz profesjonalnej wiertarko-wkr\u0119tarki akumulatorowej 18V? Poznaj Bosch GSR 18V-55 z pot\u0119\u017Cnym silnikiem bezszczotkowym i momentem 55 Nm. Ten wszechstronny sprz\u0119t Bosch, z 13 mm uchwytem bezkluczowym, jest idealny do wiercenia i wkr\u0119cania w trudnych warunkach. Odkryj moc i niezawodno\u015B\u0107 narz\u0119dzi akumulatorowych Bosch Professional. Kup wiertarko-wkr\u0119tark\u0119 Bosch GSR 18V bez akumulatora i rozbuduj sw\xF3j system 18V. Idealna do prac budowlanych, remontowych i instalacyjnych. Sprawd\u017A opinie i specyfikacj\u0119 techniczn\u0105."
  },
  {
    id: "p135",
    slug: "poziomnica-aluminiowa-80cm",
    name: "Poziomnica aluminiowa Stabila 80 cm",
    categorySlug: "poziomnice",
    brand: "Stabila",
    sku: "STB-POZ-80",
    unit: "szt.",
    shortDescription: "Solidna poziomnica aluminiowa Stabila 80 cm z 3 libellami, idealna do precyzyjnych prac budowlanych i wyko\u0144czeniowych. Zapewnia dok\u0142adno\u015B\u0107 0,5 mm/m.",
    description: "Poziomnica aluminiowa Stabila o d\u0142ugo\u015Bci 80 cm to niezawodne narz\u0119dzie dla profesjonalist\xF3w i majsterkowicz\xF3w. Wykonana z wytrzyma\u0142ego, ekstrudowanego aluminium, gwarantuje d\u0142ugotrwa\u0142e u\u017Cytkowanie. Wyposa\u017Cona w trzy precyzyjne libelle (poziom\u0105 i dwie pionowe), umo\u017Cliwia dok\u0142adne sprawdzanie poziomu i pionu z dok\u0142adno\u015Bci\u0105 0,5 mm/m. Lekka konstrukcja u\u0142atwia transport i obs\u0142ug\u0119, a solidne wykonanie zapewnia odporno\u015B\u0107 na uszkodzenia mechaniczne. Niezb\u0119dna przy ka\u017Cdym remoncie, budowie czy pracach wyko\u0144czeniowych.",
    application: "Poziomnica Stabila 80 cm przeznaczona jest do precyzyjnego sprawdzania poziomu i pionu na budowie, podczas monta\u017Cu, prac murarskich, tynkarskich, stolarskich oraz innych prac wyko\u0144czeniowych. Stosowa\u0107 na stabilnych, r\xF3wnych powierzchniach.",
    technicalSpec: [
      { label: "D\u0142ugo\u015B\u0107", value: "800 mm" },
      { label: "Libelle", value: "3 libelle" },
      { label: "Dok\u0142adno\u015B\u0107", value: "0,5 mm/m" },
      { label: "Materia\u0142", value: "aluminium extrudowane" }
    ],
    images: [],
    tags: [
      "poziomnica",
      "stabila",
      "80cm",
      "aluminiowa",
      "budowlana",
      "murarka",
      "tynkarska"
    ],
    related: ["p134", "p132", "p133"],
    advantages: [
      "Wysoka dok\u0142adno\u015B\u0107 pomiaru dzi\u0119ki 3 precyzyjnym libellom.",
      "Wytrzyma\u0142a konstrukcja z ekstrudowanego aluminium.",
      "Lekka i por\u0119czna, u\u0142atwia prac\u0119.",
      "Odporna na uszkodzenia mechaniczne i warunki budowlane."
    ],
    warnings: [
      "Nie stosowa\u0107 w silnym polu magnetycznym, kt\xF3re mo\u017Ce wp\u0142ywa\u0107 na odczyt libelli.",
      "Poziomnicy nie nale\u017Cy u\u017Cywa\u0107 jako narz\u0119dzia do uderze\u0144 czy podwa\u017Cania."
    ],
    faq: [
      { q: "Jaka jest dok\u0142adno\u015B\u0107 tej poziomnicy?", a: "Poziomnica aluminiowa Stabila 80 cm charakteryzuje si\u0119 bardzo wysok\u0105 dok\u0142adno\u015Bci\u0105 pomiaru wynosz\u0105c\u0105 0,5 mm/m, co zapewnia precyzyjne wyniki." },
      { q: "Ile libelli posiada ta poziomnica?", a: "Poziomnica wyposa\u017Cona jest w trzy libelle: jedn\u0105 poziom\u0105 oraz dwie pionowe, co umo\u017Cliwia wszechstronne zastosowanie." },
      { q: "Z jakiego materia\u0142u jest wykonana poziomnica?", a: "Poziomnica wykonana jest z wytrzyma\u0142ego, ekstrudowanego aluminium, co zapewnia jej trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na uszkodzenia." }
    ],
    seoDescription: "Szukasz precyzyjnej poziomnicy aluminiowej 80 cm? Stabila 80 cm to profesjonalne narz\u0119dzie budowlane z 3 libellami, oferuj\u0105ce dok\u0142adno\u015B\u0107 0,5 mm/m. Idealna do murarki, tynkowania i prac wyko\u0144czeniowych. Wytrzyma\u0142a konstrukcja z aluminium zapewnia d\u0142ugotrwa\u0142e u\u017Cytkowanie. Niezb\u0119dna dla ka\u017Cdego fachowca ceni\u0105cego sobie jako\u015B\u0107 i precyzj\u0119. Kup teraz poziomnic\u0119 Stabila i wykonuj prace z idealnym poziomem i pionem!"
  },
  {
    id: "p136",
    slug: "tasma-malarska-tesa-38mm-50m",
    name: "Ta\u015Bma malarska Tesa Professional 38 mm \xD7 50 m",
    categorySlug: "tasmy-malarskie",
    brand: "Tesa",
    sku: "TES-PRO-38-50",
    unit: "rolka 50 m",
    shortDescription: "Profesjonalna ta\u015Bma malarska Tesa 38 mm \xD7 50 m z kauczukowym klejem. Idealna do precyzyjnego maskowania kraw\u0119dzi podczas malowania, zapewniaj\u0105c ostre linie.",
    description: "Ta\u015Bma malarska Tesa Professional 38 mm \xD7 50 m to niezawodne narz\u0119dzie dla profesjonalist\xF3w i hobbyst\xF3w. Wykonana z wysokiej jako\u015Bci materia\u0142u, wyposa\u017Cona w kauczukowy klej na naturalnej bazie, gwarantuje doskona\u0142e przyleganie do r\xF3\u017Cnorodnych powierzchni. Doskonale nadaje si\u0119 do precyzyjnego maskowania kraw\u0119dzi podczas prac malarskich, zapewniaj\u0105c czyste i ostre linie odci\u0119cia kolor\xF3w. Jej odporno\u015B\u0107 na rozpuszczalniki i \u0142atwo\u015B\u0107 usuwania bez pozostawiania \u015Blad\xF3w czyni\u0105 j\u0105 idealnym wyborem dla wymagaj\u0105cych projekt\xF3w.",
    application: "Stosuj na suchych, czystych i odt\u0142uszczonych powierzchniach. Ta\u015Bma przeznaczona jest do u\u017Cytku wewn\u0119trznego i zewn\u0119trznego. Optymalna temperatura aplikacji to od +5\xB0C do +35\xB0C. Docisnij ta\u015Bm\u0119 d\u0142oni\u0105 lub wa\u0142kiem, aby zapewni\u0107 pe\u0142ne przyleganie. Po zako\u0144czeniu malowania usu\u0144 ta\u015Bm\u0119, gdy farba jest jeszcze lekko wilgotna, pod k\u0105tem 45 stopni.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107", value: "38 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "50 m" },
      { label: "Klej", value: "kauczukowy na naturalnej bazie" },
      { label: "Temperatura aplikacji", value: "+5\xB0C do +35\xB0C" }
    ],
    images: [],
    tags: [
      "ta\u015Bma malarska",
      "tesa",
      "38mm",
      "professional",
      "malowanie",
      "maskowanie",
      "kraw\u0119d\u017A"
    ],
    related: ["p130", "p131", "p081"],
    advantages: [
      "Precyzyjne maskowanie i ostre linie odci\u0119cia.",
      "Kauczukowy klej zapewniaj\u0105cy mocne, ale bezpieczne przyleganie.",
      "Odporna na rozpuszczalniki i \u0142atwa do usuni\u0119cia bez \u015Blad\xF3w.",
      "Uniwersalne zastosowanie wewn\u0105trz i na zewn\u0105trz budynk\xF3w."
    ],
    warnings: [
      "Nie stosowa\u0107 na delikatnych lub niestabilnych powierzchniach, kt\xF3re mog\u0105 ulec uszkodzeniu.",
      "Przechowywa\u0107 w oryginalnym opakowaniu, z dala od wilgoci i bezpo\u015Bredniego \u015Bwiat\u0142a s\u0142onecznego."
    ],
    faq: [
      { q: "Do jakich powierzchni mog\u0119 u\u017Cy\u0107 ta\u015Bmy Tesa Professional 38 mm?", a: "Ta\u015Bma nadaje si\u0119 do wi\u0119kszo\u015Bci powierzchni, w tym \u015Bcian, sufit\xF3w, drewna, szk\u0142a, metalu i tworzyw sztucznych. Wa\u017Cne, aby powierzchnia by\u0142a czysta, sucha i odt\u0142uszczona." },
      { q: "Czy ta\u015Bma Tesa Professional pozostawia \u015Blady kleju?", a: "Nie, ta\u015Bma zosta\u0142a zaprojektowana tak, aby usuwa\u0107 si\u0119 czysto, bez pozostawiania resztek kleju, pod warunkiem usuni\u0119cia jej w odpowiednim czasie (lekko wilgotna farba)." },
      { q: "Jaka jest optymalna temperatura do aplikacji tej ta\u015Bmy?", a: "Najlepsze rezultaty uzyskasz, aplikuj\u0105c ta\u015Bm\u0119 w temperaturze od +5\xB0C do +35\xB0C. Unikaj aplikacji w ekstremalnych temperaturach." }
    ],
    seoDescription: "Szukasz profesjonalnej ta\u015Bmy malarskiej do precyzyjnych prac? Ta\u015Bma malarska Tesa Professional 38 mm \xD7 50 m to idealne rozwi\u0105zanie. Wyposa\u017Cona w mocny, ale \u0142atwy do usuni\u0119cia kauczukowy klej na naturalnej bazie, zapewnia perfekcyjne maskowanie kraw\u0119dzi. Niezast\u0105piona podczas malowania \u015Bcian, sufit\xF3w, mebli czy stolarki okiennej. Zapewnij sobie ostre linie i czyste odci\u0119cia kolor\xF3w. Ta\u015Bma Tesa 38mm jest odporna na rozpuszczalniki i sprawdzi si\u0119 zar\xF3wno w pracach domowych, jak i profesjonalnych. Kup teraz ta\u015Bm\u0119 malarsk\u0105 Tesa Professional i ciesz si\u0119 idealnym efektem malowania!"
  },
  {
    id: "p137",
    slug: "plyta-sufitowa-armstrong-dune-600x600",
    name: "P\u0142yta sufitowa Armstrong Dune Supreme 600\xD7600 mm",
    categorySlug: "plyty-welna-mineralna",
    brand: "Armstrong",
    sku: "ARM-DUNE-600",
    unit: "m\xB2",
    shortDescription: "P\u0142yta sufitowa Armstrong Dune Supreme 600x600 mm z we\u0142ny mineralnej. Doskona\u0142a akustyka (\u03B1w=0,90) i klasa ogniowa A2. Idealna do nowoczesnych przestrzeni biurowych.",
    description: "Odkryj p\u0142yty sufitowe Armstrong Dune Supreme 600x600 mm \u2013 innowacyjne rozwi\u0105zanie dla wymagaj\u0105cych wn\u0119trz. Wykonane z wysokiej jako\u015Bci we\u0142ny mineralnej, charakteryzuj\u0105 si\u0119 wyj\u0105tkowymi w\u0142a\u015Bciwo\u015Bciami akustycznymi, osi\u0105gaj\u0105c wsp\xF3\u0142czynnik poch\u0142aniania d\u017Awi\u0119ku \u03B1w na poziomie 0,90, co znacz\u0105co redukuje pog\u0142os i poprawia komfort s\u0142uchowy. Klasa ogniowa A2 gwarantuje bezpiecze\u0144stwo u\u017Cytkowania. Nowoczesny design serii Dune Supreme harmonijnie wkomponuje si\u0119 w estetyk\u0119 ka\u017Cdego biura, sali konferencyjnej czy przestrzeni komercyjnej, nadaj\u0105c jej profesjonalny wygl\u0105d. Monta\u017C na standardowych systemach podwieszanych jest szybki i \u0142atwy.",
    application: "P\u0142yty sufitowe Armstrong Dune Supreme 600x600 mm przeznaczone s\u0105 do monta\u017Cu w systemach podwieszanych wewn\u0105trz budynk\xF3w. Idealnie sprawdz\u0105 si\u0119 w biurach, salach konferencyjnych, plac\xF3wkach edukacyjnych, sklepach oraz innych przestrzeniach komercyjnych, gdzie kluczowe s\u0105 wysoka izolacyjno\u015B\u0107 akustyczna i estetyczny wygl\u0105d. Stosowa\u0107 w pomieszczeniach o normalnej wilgotno\u015Bci i temperaturze.",
    technicalSpec: [
      { label: "Wymiar", value: "600 \xD7 600 mm" },
      { label: "Grubo\u015B\u0107", value: "15 mm" },
      { label: "Poch\u0142anianie \u03B1w", value: "0,90" },
      { label: "Klasa ogniowa", value: "A2" }
    ],
    images: [],
    tags: [
      "p\u0142yta sufitowa",
      "armstrong",
      "dune",
      "we\u0142na mineralna",
      "600x600",
      "akustyczna",
      "biuro"
    ],
    related: ["p138", "p144", "p145"],
    advantages: [
      "Wyj\u0105tkowa absorpcja d\u017Awi\u0119ku dla komfortowej akustyki.",
      "Wysoka klasa reakcji na ogie\u0144 (A2) podnosi bezpiecze\u0144stwo.",
      "Elegancki, nowoczesny wygl\u0105d serii Dune Supreme.",
      "\u0141atwy i szybki monta\u017C w systemach podwieszanych."
    ],
    warnings: [
      "Nie stosowa\u0107 w pomieszczeniach o bardzo wysokiej wilgotno\u015Bci lub agresywnym \u015Brodowisku.",
      "Chroni\u0107 przed bezpo\u015Brednim dzia\u0142aniem wody i uszkodzeniami mechanicznymi."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety p\u0142yt Armstrong Dune Supreme?", a: "G\u0142\xF3wne zalety to doskona\u0142a izolacyjno\u015B\u0107 akustyczna (\u03B1w=0,90), wysokie bezpiecze\u0144stwo przeciwpo\u017Carowe (klasa A2) oraz estetyczny, nowoczesny design, kt\xF3ry odmieni ka\u017Cde wn\u0119trze." },
      { q: "Do jakich pomieszcze\u0144 najlepiej nadaj\u0105 si\u0119 te p\u0142yty?", a: "P\u0142yty doskonale sprawdz\u0105 si\u0119 w biurach, salach konferencyjnych, szko\u0142ach, sklepach i innych przestrzeniach komercyjnych, gdzie liczy si\u0119 komfort akustyczny i profesjonalny wygl\u0105d." },
      { q: "Czy monta\u017C p\u0142yt jest skomplikowany?", a: "Nie, p\u0142yty Armstrong Dune Supreme s\u0105 zaprojektowane do monta\u017Cu na standardowych systemach podwieszanych, co sprawia, \u017Ce instalacja jest szybka i prosta dla fachowc\xF3w." }
    ],
    seoDescription: "Szukasz wysokiej jako\u015Bci p\u0142yt sufitowych do biura? P\u0142yta sufitowa Armstrong Dune Supreme 600x600 mm to idealny wyb\xF3r. Oferuje rewelacyjne parametry akustyczne z poch\u0142anianiem d\u017Awi\u0119ku \u03B1w=0,90, co gwarantuje cisz\u0119 i spok\xF3j w miejscu pracy. Klasa ogniowa A2 zapewnia bezpiecze\u0144stwo, a subtelny design serii Dune podnosi estetyk\u0119 wn\u0119trza. Te p\u0142yty z we\u0142ny mineralnej s\u0105 \u0142atwe w monta\u017Cu na systemach podwieszanych i stanowi\u0105 doskona\u0142e uzupe\u0142nienie nowoczesnych aran\u017Cacji biurowych. Zainwestuj w komfort i styl z Armstrong Dune Supreme."
  },
  {
    id: "p138",
    slug: "plyta-sufitowa-ecophon-gedina-600x600",
    name: "P\u0142yta sufitowa Ecophon Gedina A 600\xD7600 mm",
    categorySlug: "plyty-welna-szklana",
    brand: "Ecophon",
    sku: "ECO-GED-A-600",
    unit: "m\xB2",
    shortDescription: "P\u0142yta sufitowa Ecophon Gedina A 600x600 mm wykonana z we\u0142ny szklanej, oferuj\u0105ca doskona\u0142\u0105 izolacj\u0119 akustyczn\u0105 (\u03B1w=0,95) i klas\u0119 ogniow\u0105 A1. Idealna do biur, sal konferencyjnych i edukacyjnych.",
    description: "Ecophon Gedina A to wysokiej jako\u015Bci p\u0142yta sufitowa przeznaczona do tworzenia nowoczesnych i funkcjonalnych przestrzeni. Wykonana z g\u0119stej we\u0142ny szklanej, zapewnia wyj\u0105tkowe w\u0142a\u015Bciwo\u015Bci akustyczne, znacz\u0105co poprawiaj\u0105c komfort d\u017Awi\u0119kowy w pomieszczeniach. Z wsp\xF3\u0142czynnikiem poch\u0142aniania d\u017Awi\u0119ku \u03B1w=0,95, skutecznie redukuje pog\u0142os i ha\u0142as, co czyni j\u0105 idealnym rozwi\u0105zaniem do biur, sal konferencyjnych, szk\xF3\u0142 i obiekt\xF3w medycznych. P\u0142yta posiada klas\u0119 reakcji na ogie\u0144 A1, co gwarantuje bezpiecze\u0144stwo. Estetyczne wyko\u0144czenie w kolorze bia\u0142ym doskonale komponuje si\u0119 z r\xF3\u017Cnymi aran\u017Cacjami wn\u0119trz, a wymiar 600x600 mm u\u0142atwia monta\u017C w standardowych systemach podwieszanych.",
    application: "P\u0142yty Ecophon Gedina A 600x600 mm przeznaczone s\u0105 do monta\u017Cu w widocznych systemach podwieszanych (np. Ecophon Connect\u2122). Idealnie nadaj\u0105 si\u0119 do wn\u0119trz biurowych, sal lekcyjnych, konferencyjnych, gabinet\xF3w, plac\xF3wek medycznych oraz wsz\u0119dzie tam, gdzie wymagana jest wysoka jako\u015B\u0107 d\u017Awi\u0119ku i bezpiecze\u0144stwo ogniowe. Monta\u017C powinien odbywa\u0107 si\u0119 zgodnie z instrukcj\u0105 producenta, w odpowiednich warunkach temperaturowo-wilgotno\u015Bciowych.",
    technicalSpec: [
      { label: "Wymiar", value: "600 \xD7 600 mm" },
      { label: "Grubo\u015B\u0107", value: "15 mm" },
      { label: "Poch\u0142anianie \u03B1w", value: "0,95" },
      { label: "Klasa ogniowa", value: "A1" }
    ],
    images: [],
    tags: [
      "p\u0142yta sufitowa",
      "ecophon",
      "gedina",
      "we\u0142na szklana",
      "akustyczna",
      "bia\u0142a",
      "600x600"
    ],
    related: ["p137", "p144", "p145"],
    advantages: [
      "Doskona\u0142e w\u0142a\u015Bciwo\u015Bci akustyczne, wysokie poch\u0142anianie d\u017Awi\u0119ku \u03B1w=0,95.",
      "Klasa ogniowa A1 - wysoki poziom bezpiecze\u0144stwa po\u017Carowego.",
      "Trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na uszkodzenia mechaniczne.",
      "Estetyczny wygl\u0105d i \u0142atwo\u015B\u0107 utrzymania czysto\u015Bci."
    ],
    warnings: [
      "Nie stosowa\u0107 w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci.",
      "Unika\u0107 bezpo\u015Bredniego kontaktu z wod\u0105 i agresywnymi chemikaliami."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety p\u0142yt Ecophon Gedina A?", a: "G\u0142\xF3wne zalety to doskona\u0142e w\u0142a\u015Bciwo\u015Bci akustyczne (\u03B1w=0,95), wysoka klasa odporno\u015Bci ogniowej A1, trwa\u0142o\u015B\u0107, estetyka oraz \u0142atwo\u015B\u0107 monta\u017Cu w systemach podwieszanych." },
      { q: "Do jakich pomieszcze\u0144 nadaj\u0105 si\u0119 p\u0142yty Ecophon Gedina A?", a: "P\u0142yty te s\u0105 idealne do biur, sal konferencyjnych, szk\xF3\u0142, plac\xF3wek medycznych i wsz\u0119dzie tam, gdzie wa\u017Cna jest poprawa akustyki i bezpiecze\u0144stwo po\u017Carowe." },
      { q: "Z jakiego materia\u0142u wykonane s\u0105 p\u0142yty Ecophon Gedina A?", a: "P\u0142yty Ecophon Gedina A wykonane s\u0105 z g\u0119stej we\u0142ny szklanej, kt\xF3ra zapewnia im znakomite w\u0142a\u015Bciwo\u015Bci d\u017Awi\u0119koch\u0142onne i ognioodporne." }
    ],
    seoDescription: "Szukasz wysokiej jako\u015Bci p\u0142yty sufitowej poprawiaj\u0105cej akustyk\u0119? Poznaj Ecophon Gedina A 600x600 mm! Ta p\u0142yta z we\u0142ny szklanej charakteryzuje si\u0119 rewelacyjnym poch\u0142anianiem d\u017Awi\u0119ku \u03B1w=0,95 i najwy\u017Csz\u0105 klas\u0105 ogniow\u0105 A1. Idealna do biur, szk\xF3\u0142, sal konferencyjnych i medycznych. Nowoczesne sufity podwieszane z Ecophon Gedina A zapewni\u0105 komfort akustyczny i bezpiecze\u0144stwo. Odkryj estetyczne bia\u0142e p\u0142yty 600x600 mm, kt\xF3re \u0142atwo zamontujesz w systemach Ecophon Connect. Popraw d\u017Awi\u0119k w swoim wn\u0119trzu z Gedina A \u2013 wyb\xF3r profesjonalist\xF3w."
  },
  {
    id: "p139",
    slug: "plyta-sufitowa-knauf-cleaneo-625x625",
    name: "P\u0142yta gipsowa perforowana Knauf Cleaneo 625\xD7625 mm",
    categorySlug: "plyty-gipsowe-sufitowe",
    brand: "Knauf",
    sku: "KNF-CLEAN-625",
    unit: "m\xB2",
    shortDescription: "P\u0142yta gipsowa Knauf Cleaneo 625x625 mm to innowacyjne rozwi\u0105zanie do budowy nowoczesnych sufit\xF3w. Zapewnia doskona\u0142\u0105 izolacj\u0119 akustyczn\u0105 i estetyczny wygl\u0105d.",
    description: "Odkryj Knauf Cleaneo 625x625 mm \u2013 rewolucyjn\u0105 p\u0142yt\u0119 gipsow\u0105 perforowan\u0105, kt\xF3ra odmieni Twoje wn\u0119trza. Idealna do tworzenia niebanalnych sufit\xF3w podwieszanych, charakteryzuje si\u0119 wyj\u0105tkowymi w\u0142a\u015Bciwo\u015Bciami akustycznymi, poch\u0142aniaj\u0105c d\u017Awi\u0119ki i poprawiaj\u0105c komfort pomieszcze\u0144. Jej precyzyjne wymiary 625x625 mm u\u0142atwiaj\u0105 monta\u017C, a klasa ogniowa A1 gwarantuje bezpiecze\u0144stwo. P\u0142yta Cleaneo to synonim nowoczesno\u015Bci, funkcjonalno\u015Bci i wysublimowanego designu.",
    application: "P\u0142yty Knauf Cleaneo 625x625 mm przeznaczone s\u0105 do monta\u017Cu sufit\xF3w podwieszanych w pomieszczeniach mieszkalnych, biurowych, u\u017Cyteczno\u015Bci publicznej oraz w obiektach wymagaj\u0105cych podwy\u017Cszonych parametr\xF3w akustycznych i estetycznych. Stosowa\u0107 wewn\u0105trz pomieszcze\u0144 o normalnej wilgotno\u015Bci.",
    technicalSpec: [
      { label: "Wymiar", value: "625 \xD7 625 mm" },
      { label: "Grubo\u015B\u0107", value: "12,5 mm" },
      { label: "Perforacja", value: "\xD8 8 mm" },
      { label: "Klasa ogniowa", value: "A1" }
    ],
    images: [],
    tags: [
      "p\u0142yta gipsowa sufitowa",
      "knauf",
      "cleaneo",
      "perforowana",
      "akustyczna",
      "sufit",
      "625x625"
    ],
    related: ["p137", "p093", "p144"],
    advantages: [
      "Doskona\u0142e w\u0142a\u015Bciwo\u015Bci akustyczne, redukcja pog\u0142osu.",
      "Estetyczne i nowoczesne wyko\u0144czenie sufit\xF3w.",
      "\u0141atwy i szybki monta\u017C dzi\u0119ki precyzyjnym wymiarom.",
      "Wysoka klasa reakcji na ogie\u0144 A1, zapewniaj\u0105ca bezpiecze\u0144stwo."
    ],
    warnings: [
      "Nie stosowa\u0107 w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci.",
      "Nale\u017Cy przestrzega\u0107 zalece\u0144 producenta dotycz\u0105cych monta\u017Cu."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zalety p\u0142yt gipsowych perforowanych Knauf Cleaneo?", a: "G\u0142\xF3wne zalety to doskona\u0142e w\u0142a\u015Bciwo\u015Bci akustyczne, nowoczesny wygl\u0105d, \u0142atwo\u015B\u0107 monta\u017Cu oraz wysoka klasa odporno\u015Bci ogniowej A1, co czyni je bezpiecznym i estetycznym rozwi\u0105zaniem." },
      { q: "Gdzie mog\u0119 zastosowa\u0107 p\u0142yty Knauf Cleaneo 625x625 mm?", a: "P\u0142yty te idealnie nadaj\u0105 si\u0119 do tworzenia sufit\xF3w podwieszanych w r\xF3\u017Cnego rodzaju wn\u0119trzach, od dom\xF3w mieszkalnych po biura i przestrzenie publiczne, szczeg\xF3lnie tam, gdzie liczy si\u0119 akustyka i design." },
      { q: "Czy p\u0142yty Knauf Cleaneo mo\u017Cna stosowa\u0107 w \u0142azienkach?", a: "Nie, p\u0142yty Knauf Cleaneo 625x625 mm nie s\u0105 przeznaczone do stosowania w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci, takich jak \u0142azienki czy kuchnie." }
    ],
    seoDescription: "Szukasz innowacyjnych p\u0142yt sufitowych? Knauf Cleaneo 625x625 mm to idealny wyb\xF3r! P\u0142yta gipsowa perforowana o grubo\u015Bci 12,5 mm, z perforacj\u0105 \xD8 8 mm, zapewnia znakomit\u0105 izolacj\u0119 akustyczn\u0105 i nowoczesny wygl\u0105d. Klasa ogniowa A1 gwarantuje bezpiecze\u0144stwo. Idealna do sufit\xF3w podwieszanych w biurach, domach i miejscach publicznych. Odkryj zalety p\u0142yt akustycznych Knauf Cleaneo 625x625 mm i stw\xF3rz niepowtarzalne wn\u0119trza. Kupuj p\u0142yty sufitowe Knauf online."
  },
  {
    id: "p140",
    slug: "profil-nosny-t24-3600mm",
    name: "Profil no\u015Bny g\u0142\xF3wny T24 3600 mm",
    categorySlug: "profile-nosne-glowne",
    brand: "Armstrong",
    sku: "ARM-T24-GN-360",
    unit: "szt. 3,6 m",
    shortDescription: "Profil no\u015Bny g\u0142\xF3wny Armstrong T24 o d\u0142ugo\u015Bci 3600 mm, wykonany z ocynkowanej ogniowo stali. Idealny do konstrukcji sufit\xF3w podwieszanych z no\u015Bno\u015Bci\u0105 do 5 kg/m\xB2.",
    description: "Profil no\u015Bny g\u0142\xF3wny Armstrong T24 3600 mm to kluczowy element ka\u017Cdej nowoczesnej konstrukcji sufitowej. Wykonany z wysokiej jako\u015Bci, ocynkowanej ogniowo stali, gwarantuje wytrzyma\u0142o\u015B\u0107 i d\u0142ugowieczno\u015B\u0107. Jego szeroko\u015B\u0107 ko\u0142nierza 24 mm zapewnia stabilne po\u0142\u0105czenie z profilami poprzecznymi, tworz\u0105c solidn\u0105 i r\xF3wnomiern\u0105 podstaw\u0119 dla p\u0142yt gipsowo-kartonowych czy kaseton\xF3w. System profili T24 jest powszechnie stosowany w budownictwie komercyjnym i mieszkaniowym, umo\u017Cliwiaj\u0105c \u0142atwy monta\u017C sufit\xF3w podwieszanych o no\u015Bno\u015Bci do 5 kg/m\xB2. Wybierz Armstrong T24 dla niezawodnego i estetycznego wyko\u0144czenia wn\u0119trz.",
    application: "Profil no\u015Bny g\u0142\xF3wny T24 Armstrong jest przeznaczony do monta\u017Cu wewn\u0105trz pomieszcze\u0144, tworz\u0105c g\u0142\xF3wn\u0105 konstrukcj\u0119 no\u015Bn\u0105 sufit\xF3w podwieszanych. Stosowany w systemach z p\u0142ytami gipsowo-kartonowymi, mineralnymi lub kasetonami. Wymaga stabilnego pod\u0142o\u017Ca do mocowania, np. stropu betonowego lub konstrukcji drewnianej/metalowej.",
    technicalSpec: [
      { label: "D\u0142ugo\u015B\u0107", value: "3600 mm" },
      { label: "Szeroko\u015B\u0107 ko\u0142nierza", value: "24 mm" },
      { label: "Stal", value: "ocynkowana galwanicznie" },
      { label: "No\u015Bno\u015B\u0107", value: "do 5 kg/m\xB2" }
    ],
    images: [],
    tags: [
      "profil no\u015Bny",
      "t24",
      "armstrong",
      "sufit podwieszany",
      "stalowy",
      "g\u0142\xF3wny"
    ],
    related: ["p141", "p137", "p147"],
    advantages: [
      "Wytrzyma\u0142a konstrukcja ze stali ocynkowanej ogniowo.",
      "System T24 zapewnia uniwersalno\u015B\u0107 i \u0142atwo\u015B\u0107 monta\u017Cu.",
      "Gwarantuje stabilno\u015B\u0107 i r\xF3wnomierno\u015B\u0107 sufitu podwieszanego.",
      "Odporny na korozj\u0119, zapewniaj\u0105c d\u0142ug\u0105 \u017Cywotno\u015B\u0107 produktu."
    ],
    warnings: [
      "Nie stosowa\u0107 w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci.",
      "Przestrzega\u0107 zalece\u0144 producenta dotycz\u0105cych maksymalnego obci\u0105\u017Cenia."
    ],
    faq: [
      { q: "Jaka jest no\u015Bno\u015B\u0107 profilu no\u015Bnego g\u0142\xF3wnego T24 Armstrong?", a: "Profil no\u015Bny g\u0142\xF3wny Armstrong T24 przeznaczony jest do konstrukcji sufit\xF3w podwieszanych o maksymalnej no\u015Bno\u015Bci do 5 kg/m\xB2. Nale\u017Cy jednak zawsze uwzgl\u0119dnia\u0107 specyfikacj\u0119 ca\u0142ego systemu." },
      { q: "Z jakiego materia\u0142u wykonany jest profil?", a: "Profil wykonany jest z wysokiej jako\u015Bci stali ocynkowanej ogniowo, co zapewnia mu odporno\u015B\u0107 na korozj\u0119 i wysok\u0105 wytrzyma\u0142o\u015B\u0107 mechaniczn\u0105." },
      { q: "Do jakiego typu sufit\xF3w mo\u017Cna zastosowa\u0107 ten profil?", a: "Profil no\u015Bny g\u0142\xF3wny Armstrong T24 jest idealny do monta\u017Cu standardowych sufit\xF3w podwieszanych z wykorzystaniem p\u0142yt gipsowo-kartonowych, p\u0142yt mineralnych lub kaseton\xF3w." }
    ],
    seoDescription: "Szukasz solidnego profilu no\u015Bnego do sufitu podwieszanego? Poznaj profil no\u015Bny g\u0142\xF3wny Armstrong T24 3600 mm. Wykonany z ocynkowanej ogniowo stali, ten 3,6 metrowy profil T24 zapewnia wytrzyma\u0142o\u015B\u0107 i stabilno\u015B\u0107 konstrukcji sufit\xF3w podwieszanych. Jego szeroko\u015B\u0107 ko\u0142nierza 24 mm idealnie wsp\xF3\u0142pracuje z systemem profili Armstrong. Idealny do system\xF3w sufitowych o no\u015Bno\u015Bci do 5 kg/m\xB2 w budownictwie mieszkaniowym i komercyjnym. Kup profil no\u015Bny stalowy Armstrong T24 online i stw\xF3rz trwa\u0142y sufit podwieszany."
  },
  {
    id: "p141",
    slug: "profil-poprzeczny-t24-600mm",
    name: "Profil poprzeczny T24 600 mm",
    categorySlug: "profile-poprzeczne",
    brand: "Armstrong",
    sku: "ARM-T24-PP-60",
    unit: "szt.",
    shortDescription: "Profil poprzeczny Armstrong T24 o d\u0142ugo\u015Bci 600 mm, wykonany z ocynkowanej stali. Idealny do budowy system\xF3w sufit\xF3w podwieszanych z rastrem 600x600 mm.",
    description: "Profil poprzeczny Armstrong T24 600 mm to kluczowy element system\xF3w sufit\xF3w podwieszanych, zapewniaj\u0105cy stabilno\u015B\u0107 i precyzj\u0119 konstrukcji. Wykonany z wysokiej jako\u015Bci ocynkowanej stali, gwarantuje odporno\u015B\u0107 na korozj\u0119 i trwa\u0142o\u015B\u0107 przez lata. Szeroko\u015B\u0107 ko\u0142nierza 24 mm oraz standardowy rozstaw 600x600 mm sprawiaj\u0105, \u017Ce profil ten jest kompatybilny z wi\u0119kszo\u015Bci\u0105 system\xF3w podwieszanych i p\u0142yt sufitowych. Jego modu\u0142owa budowa u\u0142atwia monta\u017C i demonta\u017C, umo\u017Cliwiaj\u0105c szybkie tworzenie przestrzeni o dowolnej konfiguracji. Wybierz profil Armstrong T24, aby zapewni\u0107 profesjonalne wyko\u0144czenie i d\u0142ugotrwa\u0142\u0105 funkcjonalno\u015B\u0107 Twojego sufitu.",
    application: "Profil poprzeczny Armstrong T24 600 mm przeznaczony jest do monta\u017Cu wewn\u0105trz pomieszcze\u0144, jako element no\u015Bny konstrukcji sufit\xF3w podwieszanych. Stosowany jest w biurach, sklepach, plac\xF3wkach edukacyjnych i medycznych, a tak\u017Ce w przestrzeniach mieszkalnych. Idealny do tworzenia sufit\xF3w z rastrem 600x600 mm, wymaga stabilnego i r\xF3wnego pod\u0142o\u017Ca do zamocowania system\xF3w no\u015Bnych.",
    technicalSpec: [
      { label: "D\u0142ugo\u015B\u0107", value: "600 mm" },
      { label: "Szeroko\u015B\u0107 ko\u0142nierza", value: "24 mm" },
      { label: "Rozstaw", value: "600 \xD7 600 mm" },
      { label: "Stal", value: "ocynkowana" }
    ],
    images: [],
    tags: [
      "profil poprzeczny",
      "t24",
      "armstrong",
      "sufit podwieszany",
      "600mm",
      "raster",
      "modu\u0142"
    ],
    related: ["p140", "p137", "p147"],
    advantages: [
      "Precyzyjne wymiary i stabilna konstrukcja systemu.",
      "Wysoka jako\u015B\u0107 ocynkowanej stali zapewnia odporno\u015B\u0107 na korozj\u0119.",
      "Szeroka kompatybilno\u015B\u0107 z p\u0142ytami i akcesoriami sufitowymi.",
      "\u0141atwy i szybki monta\u017C dzi\u0119ki modu\u0142owej budowie."
    ],
    warnings: [
      "Nie stosowa\u0107 w pomieszczeniach o podwy\u017Cszonej wilgotno\u015Bci lub agresywnym \u015Brodowisku.",
      "Monta\u017C powinien by\u0107 wykonany zgodnie z instrukcj\u0105 producenta i normami budowlanymi."
    ],
    faq: [
      { q: "Jakie s\u0105 g\u0142\xF3wne zastosowania profilu poprzecznego T24 600 mm?", a: "Profil T24 600 mm jest podstawowym elementem konstrukcyjnym sufit\xF3w podwieszanych, stosowanym do tworzenia stabilnego rusztu, na kt\xF3rym montowane s\u0105 p\u0142yty sufitowe. Umo\u017Cliwia uzyskanie r\xF3wnych i estetycznych powierzchni sufitowych w r\xF3\u017Cnego rodzaju obiektach." },
      { q: "Z jakiego materia\u0142u wykonany jest profil Armstrong T24 i jakie ma to zalety?", a: "Profil wykonany jest z wysokiej jako\u015Bci ocynkowanej stali, co zapewnia mu doskona\u0142\u0105 odporno\u015B\u0107 na korozj\u0119 i przed\u0142u\u017Ca \u017Cywotno\u015B\u0107 konstrukcji sufitu, nawet w zmiennych warunkach \u015Brodowiskowych." },
      { q: "Czy profil T24 600 mm pasuje do ka\u017Cdego systemu sufit\xF3w podwieszanych?", a: "Profil T24 600 mm jest standardowym elementem system\xF3w sufit\xF3w podwieszanych z rastrem 600x600 mm i jest kompatybilny z wi\u0119kszo\u015Bci\u0105 dost\u0119pnych na rynku p\u0142yt sufitowych oraz akcesori\xF3w monta\u017Cowych." }
    ],
    seoDescription: "Profil poprzeczny Armstrong T24 o d\u0142ugo\u015Bci 600 mm to niezawodny wyb\xF3r do budowy sufit\xF3w podwieszanych. Wykonany z ocynkowanej stali, zapewnia trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na korozj\u0119, co jest kluczowe w nowoczesnym budownictwie. Standardowy rozstaw 600x600 mm oraz szeroko\u015B\u0107 ko\u0142nierza 24 mm gwarantuj\u0105 idealne dopasowanie do systemu T24 i p\u0142yt sufitowych. Profile te s\u0105 fundamentem dla estetycznych i funkcjonalnych strop\xF3w w biurach, szko\u0142ach, sklepach. \u0141atwy monta\u017C i demonta\u017C, stabilno\u015B\u0107 konstrukcji oraz atrakcyjna cena to kolejne atuty. Wybieraj\u0105c profil Armstrong T24 600mm, inwestujesz w jako\u015B\u0107 i d\u0142ugowieczno\u015B\u0107 swojego sufitu podwieszanego, tworz\u0105c przestrze\u0144 zgodn\u0105 z najnowszymi trendami w aran\u017Cacji wn\u0119trz."
  },
  {
    id: "p142",
    slug: "profil-przyscienny-t24-katowy-3000mm",
    name: "Profil przy\u015Bcienny k\u0105towy T24 3000 mm",
    categorySlug: "profile-przysc-sufity",
    brand: "Armstrong",
    sku: "ARM-T24-KATOW-300",
    unit: "szt. 3 m",
    shortDescription: "Ocynkowany stalowy profil przy\u015Bcienny k\u0105towy Armstrong T24 o d\u0142ugo\u015Bci 3000 mm. Idealny do wyka\u0144czania kraw\u0119dzi sufit\xF3w podwieszanych przy \u015Bcianach.",
    description: "Profil przy\u015Bcienny k\u0105towy Armstrong T24 to kluczowy element konstrukcji sufit\xF3w podwieszanych, zapewniaj\u0105cy estetyczne i trwa\u0142e wyko\u0144czenie naro\u017Cnik\xF3w przy \u015Bcianach. Wykonany z wysokiej jako\u015Bci ocynkowanej stali, gwarantuje odporno\u015B\u0107 na korozj\u0119 i d\u0142ugowieczno\u015B\u0107. System T24 to standard w bran\u017Cy, gwarantuj\u0105cy kompatybilno\u015B\u0107 z innymi elementami konstrukcji sufit\xF3w podwieszanych. D\u0142ugo\u015B\u0107 3000 mm u\u0142atwia monta\u017C, minimalizuj\u0105c potrzeb\u0119 docinania i zwi\u0119kszaj\u0105c efektywno\u015B\u0107 pracy. Jest to niezast\u0105piony produkt dla wykonawc\xF3w szukaj\u0105cych profesjonalnych rozwi\u0105za\u0144 w budownictwie.",
    application: "Profil przy\u015Bcienny k\u0105towy T24 przeznaczony jest do monta\u017Cu na styku sufitu podwieszanego i \u015Bciany. Stosowany w systemach sufit\xF3w podwieszanych Armstrong T24. Idealny do zastosowania w pomieszczeniach biurowych, handlowych, edukacyjnych oraz mieszkalnych, wsz\u0119dzie tam, gdzie wymagane jest solidne i estetyczne wyko\u0144czenie kraw\u0119dzi sufitu.",
    technicalSpec: [
      { label: "D\u0142ugo\u015B\u0107", value: "3000 mm" },
      { label: "K\u0105t", value: "90\xB0" },
      { label: "Szeroko\u015B\u0107 ko\u0142nierza", value: "24 mm" },
      { label: "Stal", value: "ocynkowana" }
    ],
    images: [],
    tags: [
      "profil przy\u015Bcienny",
      "t24",
      "k\u0105towy",
      "armstrong",
      "sufit podwieszany",
      "\u015Bciana",
      "wyko\u0144czenie"
    ],
    related: ["p140", "p141", "p137"],
    advantages: [
      "Wytrzyma\u0142a konstrukcja z ocynkowanej stali.",
      "Estetyczne i precyzyjne wyko\u0144czenie kraw\u0119dzi sufitu.",
      "\u0141atwy monta\u017C dzi\u0119ki standardowemu systemowi T24.",
      "Odporno\u015B\u0107 na korozj\u0119 i wilgo\u0107, zapewniaj\u0105ca trwa\u0142o\u015B\u0107."
    ],
    warnings: [
      "Nale\u017Cy stosowa\u0107 zgodnie z zaleceniami producenta systemu sufit\xF3w podwieszanych.",
      "Chroni\u0107 przed uszkodzeniami mechanicznymi podczas transportu i monta\u017Cu."
    ],
    faq: [
      { q: "Do jakich system\xF3w sufit\xF3w podwieszanych pasuje profil T24?", a: "Profil przy\u015Bcienny k\u0105towy T24 firmy Armstrong jest zaprojektowany do wsp\xF3\u0142pracy z systemami profili no\u015Bnych Armstrong T24, stanowi\u0105cymi standard w budownictwie sufit\xF3w podwieszanych." },
      { q: "Jakie s\u0105 g\u0142\xF3wne zastosowania tego profilu?", a: "G\u0142\xF3wnym zastosowaniem jest estetyczne i stabilne wyko\u0144czenie kraw\u0119dzi sufitu podwieszanego na styku ze \u015Bcian\u0105, tworz\u0105c czyst\u0105 lini\u0119." },
      { q: "Z jakiego materia\u0142u wykonany jest profil i jaka jest jego d\u0142ugo\u015B\u0107?", a: "Profil wykonany jest z ocynkowanej stali, co zapewnia mu odporno\u015B\u0107 na korozj\u0119. Standardowa d\u0142ugo\u015B\u0107 wynosi 3000 mm." }
    ],
    seoDescription: "Kup profil przy\u015Bcienny k\u0105towy Armstrong T24 o d\u0142ugo\u015Bci 3000 mm. Najwy\u017Cszej jako\u015Bci ocynkowana stal zapewnia trwa\u0142o\u015B\u0107 i odporno\u015B\u0107 na korozj\u0119. Idealny do monta\u017Cu sufit\xF3w podwieszanych, precyzyjne wyko\u0144czenie przy \u015Bcianach. Profil T24 to gwarancja kompatybilno\u015Bci i \u0142atwo\u015Bci instalacji. Znajd\u017A profesjonalne rozwi\u0105zania dla budownictwa i wyko\u0144czenia wn\u0119trz. Szukaj 'profil k\u0105towy sufit podwieszany', 'akcesoria Armstrong', 'monta\u017C profili T24', 'stalowy profil przy\u015Bcienny cena'."
  },
  {
    id: "p143",
    slug: "wieszak-dwuhakowy-sufitowy-amf",
    name: "Wieszak dwuhakowy do sufit\xF3w AMF 25 szt.",
    categorySlug: "wieszaki-dwuhakowe",
    brand: "AMF",
    sku: "AMF-WIS-2H-25",
    unit: "opak. 25 szt.",
    shortDescription: "Wieszak dwuhakowy AMF (25 szt.) ze stali ocynkowanej. Idealny do monta\u017Cu sufit\xF3w podwieszanych i lekkich element\xF3w konstrukcyjnych. Maksymalna no\u015Bno\u015B\u0107 25 kg.",
    description: "Solidne wieszaki dwuhakowe marki AMF to niezawodne rozwi\u0105zanie do tworzenia stabilnych i trwa\u0142ych sufit\xF3w podwieszanych. Wykonane z wysokiej jako\u015Bci stali ocynkowanej, gwarantuj\u0105 odporno\u015B\u0107 na korozj\u0119 i d\u0142ug\u0105 \u017Cywotno\u015B\u0107. Dwustronny hak oraz drut o \u015Brednicy 4 mm zapewniaj\u0105 bezpieczne i pewne zawieszenie p\u0142yt sufitowych, kaseton\xF3w czy innych element\xF3w dekoracyjnych i konstrukcyjnych. Opakowanie zawiera 25 sztuk, co jest ekonomicznym wyborem dla profesjonalist\xF3w i majsterkowicz\xF3w. U\u0142atwiaj\u0105 szybki i precyzyjny monta\u017C sufitu modu\u0142owego, zapewniaj\u0105c estetyczny wygl\u0105d pomieszczenia.",
    application: "Wieszaki dwuhakowe AMF przeznaczone s\u0105 do monta\u017Cu sufit\xF3w podwieszanych wszelkiego typu, w tym sufit\xF3w kasetonowych, modu\u0142owych oraz system\xF3w z p\u0142yt gipsowo-kartonowych. Stosowa\u0107 mo\u017Cna je w pomieszczeniach o standardowej wilgotno\u015Bci. Nale\u017Cy upewni\u0107 si\u0119, \u017Ce pod\u0142o\u017Ce, do kt\xF3rego mocowany jest wieszak, jest odpowiednio wytrzyma\u0142e, aby ud\u017Awign\u0105\u0107 obci\u0105\u017Cenie do 25 kg.",
    technicalSpec: [
      { label: "Materia\u0142", value: "stal ocynkowana" },
      { label: "No\u015Bno\u015B\u0107", value: "do 25 kg/szt." },
      { label: "Hak", value: "dwustronny" },
      { label: "Drut", value: "\xD8 4 mm" }
    ],
    images: [],
    tags: [
      "wieszak dwuhakowy",
      "amf",
      "sufit podwieszany",
      "ocynkowany",
      "monta\u017C",
      "zawieszenie"
    ],
    related: ["p140", "p144", "p141"],
    advantages: [
      "Wytrzyma\u0142a stal ocynkowana odporna na korozj\u0119.",
      "Dwustronny hak zapewnia uniwersalne i pewne mocowanie.",
      "Maksymalna no\u015Bno\u015B\u0107 do 25 kg na sztuk\u0119.",
      "Idealne do szybkiego monta\u017Cu sufit\xF3w podwieszanych."
    ],
    warnings: [
      "Nie przekracza\u0107 maksymalnej dopuszczalnej no\u015Bno\u015Bci 25 kg.",
      "Przechowywa\u0107 w suchym miejscu, z dala od wilgoci."
    ],
    faq: [
      { q: "Do jakiego typu sufit\xF3w mo\u017Cna zastosowa\u0107 wieszaki dwuhakowe AMF?", a: "Wieszaki dwuhakowe AMF s\u0105 uniwersalnym rozwi\u0105zaniem, idealnym do monta\u017Cu sufit\xF3w podwieszanych, kasetonowych, modu\u0142owych, a tak\u017Ce system\xF3w z p\u0142yt gipsowo-kartonowych." },
      { q: "Jaka jest maksymalna no\u015Bno\u015B\u0107 jednego wieszaka?", a: "Ka\u017Cdy wieszak dwuhakowy AMF jest w stanie ud\u017Awign\u0105\u0107 maksymalne obci\u0105\u017Cenie do 25 kg." },
      { q: "Z jakiego materia\u0142u wykonane s\u0105 wieszaki?", a: "Wieszaki dwuhakowe AMF wykonane s\u0105 z wysokiej jako\u015Bci stali ocynkowanej, co zapewnia im du\u017C\u0105 wytrzyma\u0142o\u015B\u0107 i odporno\u015B\u0107 na rdz\u0119." }
    ],
    seoDescription: "Kup wieszaki dwuhakowe AMF 25 szt. w atrakcyjnej cenie. Solidne wieszaki ze stali ocynkowanej o no\u015Bno\u015Bci do 25 kg/szt. idealnie nadaj\u0105 si\u0119 do monta\u017Cu sufit\xF3w podwieszanych, sufit\xF3w kasetonowych i modu\u0142owych. Drut o \u015Brednicy 4 mm gwarantuje stabilne zawieszenie. Sprawd\u017A opinie i zastosowanie wieszak\xF3w dwuhakowych AMF do tworzenia trwa\u0142ych i estetycznych konstrukcji sufitowych. Szybki i \u0142atwy monta\u017C sufitu podwieszanego z wykorzystaniem akcesori\xF3w AMF. Najlepsze wieszaki do profesjonalnych i domowych zastosowa\u0144."
  },
  {
    id: "p145",
    slug: "okno-dachowe-fakro-ftp-v-u4-78x118",
    name: "Okno dachowe Fakro FTP-V U4 78x118 cm",
    categorySlug: "okna-dachowe-std",
    brand: "Fakro",
    sku: "FAK-FTPV-U4-78118",
    unit: "szt.",
    shortDescription: "Drewniane okno dachowe obrotowe Fakro z nawiewnikiem V40P i pakietem U4. Do dach\xF3w sko\u015Bnych.",
    description: "Fakro FTP-V U4 78x118 cm to popularne okno dachowe obrotowe do budownictwa mieszkaniowego i inwestycyjnego. Wykonane z drewna sosnowego impregnowanego pr\xF3\u017Cniowo, wyposa\u017Cone w automatyczny nawiewnik V40P oraz energooszcz\u0119dny pakiet szybowy U4. Rozwi\u0105zanie dobrze sprawdza si\u0119 w nowych realizacjach i przy modernizacjach poddaszy u\u017Cytkowych.",
    application: "Do dach\xF3w sko\u015Bnych o nachyleniu od 15\xB0 do 90\xB0. Monta\u017C w poddaszach mieszkalnych, pomieszczeniach u\u017Cytkowych i pokojach na poddaszu. Wymaga odpowiedniego ko\u0142nierza uszczelniaj\u0105cego dobranego do pokrycia dachowego.",
    technicalSpec: [
      { label: "Wymiar", value: "78 \xD7 118 cm" },
      { label: "Wsp\xF3\u0142czynnik Uw", value: "1,1 W/m\xB2K" },
      { label: "Pakiet szybowy", value: "U4, dwukomorowy" },
      { label: "Zakres monta\u017Cu", value: "15\xB0\u201390\xB0" },
      { label: "Nawiewnik", value: "V40P" }
    ],
    images: [],
    tags: ["okno dachowe", "fakro", "ftp-v", "poddasze", "dach sko\u015Bny", "u4"],
    related: ["p082", "p083", "p030"],
    isNew: true,
    advantages: [
      "Energooszcz\u0119dny pakiet szybowy U4 do nowoczesnych poddaszy.",
      "Automatyczny nawiewnik poprawiaj\u0105cy komfort u\u017Cytkowania.",
      "Sprawdzony format 78x118 cm cz\u0119sto wybierany przez wykonawc\xF3w."
    ],
    warnings: [
      "Do poprawnego monta\u017Cu wymagany jest ko\u0142nierz dopasowany do rodzaju pokrycia.",
      "Okno nale\u017Cy montowa\u0107 zgodnie z instrukcj\u0105 producenta i zasadami ciep\u0142ego monta\u017Cu."
    ],
    faq: [
      { q: "Do jakiego dachu pasuje okno Fakro FTP-V U4?", a: "Model przeznaczony jest do dach\xF3w sko\u015Bnych o nachyleniu od 15 do 90 stopni, z odpowiednio dobranym ko\u0142nierzem uszczelniaj\u0105cym." },
      { q: "Czy to okno ma nawiewnik?", a: "Tak, model FTP-V U4 wyposa\u017Cony jest w automatyczny nawiewnik V40P poprawiaj\u0105cy wymian\u0119 powietrza." }
    ],
    seoDescription: "Okno dachowe Fakro FTP-V U4 78x118 cm to energooszcz\u0119dne rozwi\u0105zanie do nowoczesnych poddaszy. Drewniane okno obrotowe z nawiewnikiem V40P i pakietem szybowym U4 sprawdza si\u0119 w domach jednorodzinnych, inwestycjach deweloperskich i modernizacjach poddaszy. Je\u015Bli szukasz okna dachowego Fakro 78x118 do dachu sko\u015Bnego, model FTP-V U4 zapewnia dobr\u0105 izolacyjno\u015B\u0107 ciepln\u0105, wygodn\u0105 obs\u0142ug\u0119 i trwa\u0142\u0105 konstrukcj\u0119."
  },
  {
    id: "p146",
    slug: "wylaz-dachowy-velux-gvt-0059z-54x83",
    name: "Wy\u0142az dachowy Velux GVT 0059Z 54x83 cm",
    categorySlug: "okna-wylazowe",
    brand: "Velux",
    sku: "VEL-GVT-0059Z-5483",
    unit: "szt.",
    shortDescription: "Wy\u0142az dachowy Velux do nieogrzewanych poddaszy, umo\u017Cliwiaj\u0105cy bezpieczne wyj\u015Bcie na dach.",
    description: "Velux GVT 0059Z to praktyczny wy\u0142az dachowy przeznaczony do pomieszcze\u0144 nieogrzewanych. Konstrukcja z aluminiowym oblachowaniem i skrzyd\u0142em otwieranym na bok u\u0142atwia dost\u0119p serwisowy do po\u0142aci dachowej. Model cz\u0119sto stosowany jest na poddaszach technicznych, w budynkach gospodarczych i przy obs\u0142udze instalacji dachowych.",
    application: "Do nieogrzewanych poddaszy i przestrzeni technicznych. Umo\u017Cliwia wyj\u015Bcie serwisowe na dach i dost\u0119p do komina, anten lub instalacji PV. Przeznaczony do pokry\u0107 dachowych zgodnych z zaleceniami producenta.",
    technicalSpec: [
      { label: "Wymiar", value: "54 \xD7 83 cm" },
      { label: "K\u0105t monta\u017Cu", value: "20\xB0\u201365\xB0" },
      { label: "Otwieranie", value: "Boczne" },
      { label: "Materia\u0142 skrzyd\u0142a", value: "Rdze\u0144 drewniany z oblachowaniem" },
      { label: "Zastosowanie", value: "Poddasza nieogrzewane" }
    ],
    images: [],
    tags: ["wy\u0142az dachowy", "velux", "gvt", "serwis dachu", "poddasze", "techniczne"],
    related: ["p145", "p082", "p030"],
    advantages: [
      "Bezpieczny dost\u0119p serwisowy do po\u0142aci dachowej.",
      "Prosty monta\u017C w dachach sko\u015Bnych.",
      "Sprawdzone rozwi\u0105zanie do przestrzeni technicznych i gospodarczych."
    ],
    warnings: [
      "Produkt przeznaczony do poddaszy nieogrzewanych.",
      "Nie zast\u0119puje pe\u0142nowarto\u015Bciowego okna dachowego w pomieszczeniach mieszkalnych."
    ],
    faq: [
      { q: "Czy wy\u0142az Velux GVT nadaje si\u0119 do pokoju na poddaszu?", a: "Nie, jest to rozwi\u0105zanie do poddaszy nieogrzewanych i zastosowa\u0144 technicznych, a nie do pomieszcze\u0144 mieszkalnych." },
      { q: "Do czego najcz\u0119\u015Bciej wykorzystuje si\u0119 wy\u0142az dachowy?", a: "Do wyj\u015Bcia serwisowego na dach, obs\u0142ugi komina, anten lub innych instalacji dachowych." }
    ],
    seoDescription: "Wy\u0142az dachowy Velux GVT 0059Z 54x83 cm to praktyczne rozwi\u0105zanie do nieogrzewanych poddaszy i wyj\u015B\u0107 serwisowych na dach. Je\u015Bli szukasz wy\u0142azu dachowego Velux do przestrzeni technicznej, model GVT zapewnia wygodny dost\u0119p do po\u0142aci dachowej, komina i instalacji dachowych."
  },
  {
    id: "p147",
    slug: "rynna-pcv-galeco-135-4m-grafit",
    name: "Rynna PVC Galeco 135 4 mb grafit",
    categorySlug: "rynny-pvc",
    brand: "Galeco",
    sku: "GAL-R135-4-GRA",
    unit: "szt. 4 m",
    shortDescription: "Rynna PVC Galeco 135 mm w kolorze grafitowym do dom\xF3w jednorodzinnych i obiekt\xF3w us\u0142ugowych.",
    description: "Galeco PVC 135 to nowoczesna rynna z tworzywa przeznaczona do systemowego odprowadzania wody deszczowej. Dzi\u0119ki stabilizatorom UV i wytrzyma\u0142emu PVC zachowuje trwa\u0142o\u015B\u0107 koloru oraz odporno\u015B\u0107 na warunki atmosferyczne. System Galeco jest cz\u0119sto wybierany do dach\xF3w dom\xF3w jednorodzinnych oraz mniejszych budynk\xF3w us\u0142ugowych.",
    application: "Do system\xF3w rynnowych dach\xF3w sko\u015Bnych i prostych po\u0142aci o typowych powierzchniach. Stosowa\u0107 z odpowiednimi hakami, z\u0142\u0105czkami, naro\u017Cnikami i rurami spustowymi Galeco.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107 systemu", value: "135 mm" },
      { label: "D\u0142ugo\u015B\u0107 elementu", value: "4 m" },
      { label: "Materia\u0142", value: "PVC" },
      { label: "Kolor", value: "Grafit" },
      { label: "Odporno\u015B\u0107 UV", value: "Tak" }
    ],
    images: [],
    tags: ["rynna pvc", "galeco", "135", "grafit", "system rynnowy", "dach"],
    related: ["p083", "p072", "p081"],
    advantages: [
      "Lekki i \u0142atwy w monta\u017Cu system rynnowy z PVC.",
      "Odporno\u015B\u0107 na promieniowanie UV i korozj\u0119.",
      "Popularny rozmiar dla budownictwa jednorodzinnego."
    ],
    warnings: [
      "Element powinien by\u0107 montowany w kompletnym systemie producenta.",
      "Nale\u017Cy zachowa\u0107 wymagane spadki i rozstaw uchwyt\xF3w zgodnie z instrukcj\u0105."
    ],
    faq: [
      { q: "Czy rynna Galeco PVC 135 nadaje si\u0119 do domu jednorodzinnego?", a: "Tak, jest to jeden z popularniejszych system\xF3w do dach\xF3w dom\xF3w jednorodzinnych i ma\u0142ych obiekt\xF3w." },
      { q: "Czy PVC koroduje jak metal?", a: "Nie, system PVC nie koroduje, dlatego dobrze sprawdza si\u0119 w typowych warunkach atmosferycznych." }
    ],
    seoDescription: "Rynna PVC Galeco 135 4 mb grafit to nowoczesny element systemu rynnowego do dom\xF3w jednorodzinnych i ma\u0142ych obiekt\xF3w us\u0142ugowych. Je\u015Bli szukasz trwa\u0142ej rynny PVC 135 mm w kolorze grafitowym, model Galeco zapewnia \u0142atwy monta\u017C, odporno\u015B\u0107 na UV i estetyczne wyko\u0144czenie dachu."
  },
  {
    id: "p148",
    slug: "hak-rynnowy-galeco-pcv-135-metalowy",
    name: "Hak rynnowy metalowy Galeco PVC 135",
    categorySlug: "akcesoria-rynny",
    brand: "Galeco",
    sku: "GAL-HAK-PVC135-MET",
    unit: "szt.",
    shortDescription: "Metalowy hak rynnowy do systemu Galeco PVC 135, zapewniaj\u0105cy stabilne mocowanie rynny.",
    description: "Hak rynnowy Galeco PVC 135 to podstawowy element monta\u017Cowy systemu rynnowego. Wykonany z odpowiednio zabezpieczonej stali, umo\u017Cliwia stabilne osadzenie rynny i zachowanie prawid\u0142owego spadku instalacji. Stosowany jest w nowych realizacjach oraz przy modernizacji odwodnienia dachu.",
    application: "Do monta\u017Cu rynien Galeco PVC 135 na okapie lub desce czo\u0142owej. Nale\u017Cy rozmie\u015Bci\u0107 zgodnie z wymaganym spadkiem i obci\u0105\u017Ceniem \u015Bniegiem dla danej strefy.",
    technicalSpec: [
      { label: "System", value: "Galeco PVC 135" },
      { label: "Materia\u0142", value: "Stal zabezpieczona antykorozyjnie" },
      { label: "Typ", value: "Hak rynnowy" },
      { label: "Monta\u017C", value: "Do deski czo\u0142owej lub okapu" }
    ],
    images: [],
    tags: ["hak rynnowy", "galeco", "pvc 135", "akcesoria rynnowe", "dach"],
    related: ["p147", "p072", "p081"],
    advantages: [
      "Stabilizuje rynn\u0119 i u\u0142atwia zachowanie w\u0142a\u015Bciwego spadku.",
      "Kompatybilny z popularnym systemem Galeco PVC 135.",
      "Niezb\u0119dny element poprawnego monta\u017Cu odwodnienia dachu."
    ],
    warnings: [
      "Rozstaw hak\xF3w nale\u017Cy dobra\u0107 zgodnie z instrukcj\u0105 systemow\u0105.",
      "Nie nale\u017Cy \u0142\u0105czy\u0107 z elementami innych system\xF3w bez weryfikacji kompatybilno\u015Bci."
    ],
    faq: [
      { q: "Czy hak rynnowy jest konieczny przy monta\u017Cu rynny?", a: "Tak, to podstawowy element no\u015Bny odpowiadaj\u0105cy za stabilne mocowanie i w\u0142a\u015Bciwe prowadzenie rynny." },
      { q: "Do jakiego systemu pasuje ten hak?", a: "Produkt jest przeznaczony do systemu Galeco PVC 135." }
    ],
    seoDescription: "Hak rynnowy metalowy Galeco PVC 135 to niezb\u0119dny element monta\u017Cowy systemu odwodnienia dachu. Je\u015Bli kompletujesz akcesoria do rynien PVC 135, hak Galeco zapewnia stabilne mocowanie i poprawny monta\u017C rynny na okapie lub desce czo\u0142owej."
  },
  {
    id: "p149",
    slug: "blachodachowka-modulowa-ruukki-finnera-plus",
    name: "Blachodach\xF3wka modu\u0142owa Ruukki Finnera Plus",
    categorySlug: "pokrycia-blacha",
    brand: "Ruukki",
    sku: "RUU-FINNERA-PLUS",
    unit: "m\xB2",
    shortDescription: "Modu\u0142owa blachodach\xF3wka Ruukki o podwy\u017Cszonej estetyce i wygodnym monta\u017Cu na dachach sko\u015Bnych.",
    description: "Ruukki Finnera Plus to modu\u0142owa blachodach\xF3wka przeznaczona do nowoczesnych i klasycznych dach\xF3w sko\u015Bnych. Profil t\u0142oczenia pozwala uzyska\u0107 estetyk\u0119 zbli\u017Con\u0105 do tradycyjnej dach\xF3wki przy ni\u017Cszej masie pokrycia. Produkt ceniony jest za wygod\u0119 transportu, prostszy monta\u017C i ograniczenie odpad\xF3w na skomplikowanych po\u0142aciach.",
    application: "Do dach\xF3w sko\u015Bnych w budownictwie jednorodzinnym, szeregowym i lekkich obiektach u\u017Cytkowych. Szczeg\xF3lnie polecana przy renowacji dach\xF3w, gdzie istotne jest ograniczenie ci\u0119\u017Caru pokrycia.",
    technicalSpec: [
      { label: "Typ", value: "Blachodach\xF3wka modu\u0142owa" },
      { label: "Materia\u0142", value: "Stal powlekana" },
      { label: "Zastosowanie", value: "Dachy sko\u015Bne" },
      { label: "Masa", value: "niska masa pokrycia" },
      { label: "Monta\u017C", value: "Modu\u0142owy" }
    ],
    images: [],
    tags: ["blachodach\xF3wka", "ruukki", "modu\u0142owa", "dach", "stal powlekana", "pokrycie"],
    related: ["p080", "p081", "p147"],
    isFeatured: true,
    advantages: [
      "Niska masa w\u0142asna u\u0142atwiaj\u0105ca renowacje i modernizacje dach\xF3w.",
      "Wygodny monta\u017C modu\u0142owy i ograniczenie odpad\xF3w.",
      "Estetyka zbli\u017Cona do tradycyjnej dach\xF3wki."
    ],
    warnings: [
      "Wymaga doboru kompletnych obr\xF3bek i akcesori\xF3w dachowych producenta.",
      "Monta\u017C powinien uwzgl\u0119dnia\u0107 zalecane rozstawy \u0142at i kontr\u0142at."
    ],
    faq: [
      { q: "Czy blachodach\xF3wka modu\u0142owa nadaje si\u0119 na skomplikowane po\u0142acie?", a: "Tak, modu\u0142owy format u\u0142atwia monta\u017C i pomaga ograniczy\u0107 odpady przy bardziej z\u0142o\u017Conych dachach." },
      { q: "Kiedy warto wybra\u0107 pokrycie blaszane zamiast ci\u0119\u017Ckiej dach\xF3wki?", a: "Zw\u0142aszcza przy renowacjach i tam, gdzie liczy si\u0119 ni\u017Csza masa pokrycia oraz szybszy monta\u017C." }
    ],
    seoDescription: "Blachodach\xF3wka modu\u0142owa Ruukki Finnera Plus to nowoczesne pokrycie dachowe do dom\xF3w jednorodzinnych i renowacji dach\xF3w. Je\u015Bli szukasz lekkiej blachodach\xF3wki modu\u0142owej o wysokiej estetyce, Ruukki Finnera zapewnia wygodny monta\u017C, trwa\u0142\u0105 pow\u0142ok\u0119 i elegancki wygl\u0105d po\u0142aci dachowej."
  },
  {
    id: "p150",
    slug: "pustak-ceramiczny-porotherm-30-pw",
    name: "Pustak ceramiczny Porotherm 30 P+W",
    categorySlug: "pustaki-ceramiczne",
    brand: "Porotherm",
    sku: "PTH-30-PW",
    unit: "szt.",
    shortDescription: "Ceramiczny pustak \u015Bcienny Porotherm 30 P+W do \u015Bcian no\u015Bnych i warstwowych.",
    description: "Porotherm 30 P+W to pustak ceramiczny do wykonywania \u015Bcian zewn\u0119trznych i wewn\u0119trznych no\u015Bnych. System pi\xF3ro-wpust przyspiesza murowanie i ogranicza zu\u017Cycie zaprawy w spoinach pionowych. Produkt jest powszechnie stosowany przez wykonawc\xF3w w budownictwie jednorodzinnym oraz w mniejszych inwestycjach deweloperskich.",
    application: "Do \u015Bcian no\u015Bnych zewn\u0119trznych i wewn\u0119trznych, \u015Bcian warstwowych oraz tradycyjnego budownictwa murowanego. Przeznaczony do wznoszenia przegr\xF3d w systemie ceramicznym.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107", value: "30 cm" },
      { label: "System", value: "Pi\xF3ro-wpust" },
      { label: "Materia\u0142", value: "Ceramika budowlana" },
      { label: "Zastosowanie", value: "\u015Aciany no\u015Bne" },
      { label: "Murowanie", value: "Spoiny pionowe bez zaprawy" }
    ],
    images: [],
    tags: ["pustak ceramiczny", "porotherm", "30", "\u015Bciana no\u015Bna", "ceramika", "p+w"],
    related: ["p046", "p039", "p013"],
    advantages: [
      "Przyspiesza murowanie dzi\u0119ki systemowi pi\xF3ro-wpust.",
      "Dobre parametry do \u015Bcian no\u015Bnych i warstwowych.",
      "Rozpoznawalny standard w budownictwie ceramicznym."
    ],
    warnings: [
      "Produkt nale\u017Cy stosowa\u0107 z odpowiednio dobran\u0105 zapraw\u0105 i systemowymi elementami nadpro\u017Cowymi.",
      "Wymaga w\u0142a\u015Bciwego sk\u0142adowania i ochrony przed zawilgoceniem na budowie."
    ],
    faq: [
      { q: "Do jakich \u015Bcian stosuje si\u0119 Porotherm 30 P+W?", a: "Najcz\u0119\u015Bciej do \u015Bcian no\u015Bnych zewn\u0119trznych i wewn\u0119trznych oraz przegr\xF3d warstwowych w budownictwie murowanym." },
      { q: "Co daje system pi\xF3ro-wpust?", a: "U\u0142atwia i przyspiesza murowanie oraz ogranicza potrzeb\u0119 wype\u0142niania spoin pionowych zapraw\u0105." }
    ],
    seoDescription: "Pustak ceramiczny Porotherm 30 P+W to sprawdzone rozwi\u0105zanie do \u015Bcian no\u015Bnych i warstwowych. Je\u015Bli szukasz pustaka ceramicznego 30 cm do budowy domu, system pi\xF3ro-wpust przyspiesza murowanie i poprawia organizacj\u0119 pracy na budowie."
  },
  {
    id: "p151",
    slug: "nadproze-porotherm-23-8-150",
    name: "Nadpro\u017Ce Porotherm 23,8 150 cm",
    categorySlug: "nadproza",
    brand: "Porotherm",
    sku: "PTH-NP-238-150",
    unit: "szt.",
    shortDescription: "Prefabrykowane nadpro\u017Ce ceramiczne do systemu Porotherm, przeznaczone nad otwory okienne i drzwiowe.",
    description: "Nadpro\u017Ce Porotherm 23,8 150 cm to systemowy element ceramiczny stosowany przy wykonywaniu otwor\xF3w okiennych i drzwiowych. U\u0142atwia przyspieszenie prac murarskich oraz zachowanie sp\xF3jno\u015Bci technologicznej \u015Bcian wykonywanych z ceramiki. Jest cz\u0119sto wybierane przez wykonawc\xF3w realizuj\u0105cych \u015Bciany w systemie Porotherm.",
    application: "Do wykonywania nadpro\u017Cy nad otworami drzwiowymi i okiennymi w \u015Bcianach z pustak\xF3w ceramicznych. Produkt powinien by\u0107 stosowany zgodnie z projektem oraz wytycznymi systemowymi.",
    technicalSpec: [
      { label: "D\u0142ugo\u015B\u0107", value: "150 cm" },
      { label: "System", value: "Porotherm" },
      { label: "Materia\u0142", value: "Ceramika" },
      { label: "Zastosowanie", value: "Nad otwory okienne i drzwiowe" }
    ],
    images: [],
    tags: ["nadpro\u017Ce", "porotherm", "ceramika", "otw\xF3r okienny", "otw\xF3r drzwiowy"],
    related: ["p150", "p046", "p039"],
    advantages: [
      "Przyspiesza wykonanie otwor\xF3w w \u015Bcianach ceramicznych.",
      "Zapewnia sp\xF3jno\u015B\u0107 systemow\u0105 z pustakami Porotherm.",
      "Ogranicza ilo\u015B\u0107 prac mokrych i deskowania na budowie."
    ],
    warnings: [
      "Dob\xF3r d\u0142ugo\u015Bci i liczby belek powinien wynika\u0107 z projektu konstrukcyjnego.",
      "Monta\u017C nale\u017Cy prowadzi\u0107 zgodnie z instrukcj\u0105 systemow\u0105 producenta."
    ],
    faq: [
      { q: "Do czego s\u0142u\u017Cy nadpro\u017Ce systemowe Porotherm?", a: "S\u0142u\u017Cy do wykonywania nadpro\u017Cy nad otworami okiennymi i drzwiowymi w \u015Bcianach z ceramiki budowlanej." },
      { q: "Czy mo\u017Cna dobiera\u0107 d\u0142ugo\u015B\u0107 nadpro\u017Ca dowolnie?", a: "Nie, dob\xF3r d\u0142ugo\u015Bci i konfiguracji powinien by\u0107 zgodny z projektem oraz wytycznymi producenta." }
    ],
    seoDescription: "Nadpro\u017Ce Porotherm 23,8 150 cm to systemowy element do \u015Bcian ceramicznych, stosowany nad otworami okiennymi i drzwiowymi. Je\u015Bli kompletujesz ceramik\u0119 Porotherm na budow\u0119 domu, prefabrykowane nadpro\u017Ce pomaga przyspieszy\u0107 prace murarskie i zachowa\u0107 sp\xF3jno\u015B\u0107 systemu."
  },
  {
    id: "p152",
    slug: "plytka-tarasowa-cerrad-mattina-2cm-60x60",
    name: "P\u0142ytka tarasowa Cerrad Mattina 2.0 60x60 cm",
    categorySlug: "plytki-tarasowe",
    brand: "Cerrad",
    sku: "CER-MATTINA-2CM-6060",
    unit: "m\xB2",
    shortDescription: "Gres tarasowy 2 cm do taras\xF3w wentylowanych, balkon\xF3w i \u015Bcie\u017Cek ogrodowych.",
    description: "Cerrad Mattina 2.0 to p\u0142yta gresowa tarasowa o grubo\u015Bci 2 cm, przeznaczona do zastosowa\u0144 zewn\u0119trznych. Sprawdza si\u0119 na tarasach wentylowanych, balkonach, alejkach oraz strefach przydomowych. Dzi\u0119ki zwi\u0119kszonej grubo\u015Bci i niskiej nasi\u0105kliwo\u015Bci dobrze radzi sobie z obci\u0105\u017Ceniami i warunkami atmosferycznymi.",
    application: "Do taras\xF3w, balkon\xF3w, \u015Bcie\u017Cek ogrodowych i stref wej\u015Bciowych. Mo\u017Cliwy monta\u017C na wspornikach, podsypce lub kleju zgodnie z przeznaczeniem systemu.",
    technicalSpec: [
      { label: "Format", value: "60 \xD7 60 cm" },
      { label: "Grubo\u015B\u0107", value: "20 mm" },
      { label: "Typ", value: "Gres zewn\u0119trzny" },
      { label: "Zastosowanie", value: "Tarasy i balkony" },
      { label: "Mrozoodporno\u015B\u0107", value: "Tak" }
    ],
    images: [],
    tags: ["p\u0142ytka tarasowa", "cerrad", "2 cm", "gres zewn\u0119trzny", "taras", "60x60"],
    related: ["p024", "p025", "p094"],
    advantages: [
      "Grubo\u015B\u0107 2 cm zwi\u0119kszaj\u0105ca stabilno\u015B\u0107 i mo\u017Cliwo\u015Bci monta\u017Cowe.",
      "Dobra odporno\u015B\u0107 na mr\xF3z i warunki zewn\u0119trzne.",
      "Nowoczesny format do taras\xF3w wentylowanych i stref ogrodowych."
    ],
    warnings: [
      "Spos\xF3b monta\u017Cu nale\u017Cy dobra\u0107 do przewidywanego obci\u0105\u017Cenia i systemu podbudowy.",
      "Przy uk\u0142adaniu na zewn\u0105trz nale\u017Cy zachowa\u0107 odpowiednie spadki i odwodnienie."
    ],
    faq: [
      { q: "Czy p\u0142ytka tarasowa 2 cm nadaje si\u0119 na wsporniki?", a: "Tak, to jedno z typowych zastosowa\u0144 p\u0142yt tarasowych 2 cm, o ile producent dopuszcza taki monta\u017C w danym systemie." },
      { q: "Gdzie mo\u017Cna stosowa\u0107 gres 2 cm?", a: "Na tarasach, balkonach, \u015Bcie\u017Ckach ogrodowych i innych nawierzchniach zewn\u0119trznych." }
    ],
    seoDescription: "P\u0142ytka tarasowa Cerrad Mattina 2.0 60x60 cm to gres zewn\u0119trzny o grubo\u015Bci 2 cm do taras\xF3w, balkon\xF3w i \u015Bcie\u017Cek ogrodowych. Je\u015Bli szukasz p\u0142ytki tarasowej 2 cm odpornej na warunki atmosferyczne, model Cerrad 60x60 sprawdzi si\u0119 w nowoczesnych realizacjach zewn\u0119trznych."
  },
  {
    id: "p153",
    slug: "stopnica-paradyz-semir-beige-30x120",
    name: "Stopnica Parady\u017C Semir Beige 30x120 cm",
    categorySlug: "stopnice",
    brand: "Parady\u017C",
    sku: "PAR-SEMIR-ST-30120",
    unit: "szt.",
    shortDescription: "Stopnica gresowa do schod\xF3w zewn\u0119trznych i wewn\u0119trznych, dopasowana do kolekcji Parady\u017C Semir.",
    description: "Parady\u017C Semir Beige 30x120 cm to stopnica gresowa przeznaczona do wyka\u0144czania schod\xF3w w obiektach mieszkalnych i komercyjnych. Format umo\u017Cliwia estetyczne prowadzenie biegu schodowego, a gresowa struktura dobrze sprawdza si\u0119 w strefach intensywnego u\u017Cytkowania. Produkt stosowany jest zar\xF3wno wewn\u0105trz, jak i na zewn\u0105trz, zgodnie z wymaganiami kolekcji.",
    application: "Do schod\xF3w wej\u015Bciowych, tarasowych, wewn\u0119trznych i ci\u0105g\xF3w komunikacyjnych. Monta\u017C na odpowiednio dobranym kleju elastycznym i przygotowanym pod\u0142o\u017Cu.",
    technicalSpec: [
      { label: "Format", value: "30 \xD7 120 cm" },
      { label: "Typ", value: "Stopnica gresowa" },
      { label: "Zastosowanie", value: "Schody wewn\u0119trzne i zewn\u0119trzne" },
      { label: "Kolekcja", value: "Parady\u017C Semir" }
    ],
    images: [],
    tags: ["stopnica", "parady\u017C", "gres", "schody", "30x120", "taras"],
    related: ["p152", "p025", "p016"],
    advantages: [
      "Sp\xF3jne wyko\u0144czenie schod\xF3w z kolekcj\u0105 gresow\u0105.",
      "Du\u017Cy format dobrze prezentuj\u0105cy si\u0119 w nowoczesnych realizacjach.",
      "Praktyczne zastosowanie na schodach wewn\u0119trznych i zewn\u0119trznych."
    ],
    warnings: [
      "Na zewn\u0105trz nale\u017Cy dobra\u0107 system monta\u017Cu odporny na mr\xF3z i wilgo\u0107.",
      "Pod\u0142o\u017Ce pod stopnice musi by\u0107 stabilne i prawid\u0142owo przygotowane."
    ],
    faq: [
      { q: "Czy stopnic\u0119 gresow\u0105 mo\u017Cna stosowa\u0107 na zewn\u0105trz?", a: "Tak, o ile parametry kolekcji oraz system monta\u017Cu s\u0105 odpowiednie do zastosowa\u0144 zewn\u0119trznych." },
      { q: "Do czego s\u0142u\u017Cy stopnica w kolekcji p\u0142ytek?", a: "Pozwala estetycznie i funkcjonalnie wyko\u0144czy\u0107 stopnie schodowe w tej samej stylistyce co reszta ok\u0142adziny." }
    ],
    seoDescription: "Stopnica Parady\u017C Semir Beige 30x120 cm to gresowy element do estetycznego wyko\u0144czenia schod\xF3w wewn\u0119trznych i zewn\u0119trznych. Je\u015Bli szukasz stopnicy Parady\u017C 30x120 dopasowanej do nowoczesnych aran\u017Cacji schod\xF3w i taras\xF3w, model Semir zapewnia sp\xF3jny wygl\u0105d i trwa\u0142e wyko\u0144czenie."
  },
  {
    id: "p154",
    slug: "wkret-do-metalu-wurth-din-7504k-48x19-250",
    name: "Wkr\u0119t samowierc\u0105cy do metalu W\xFCrth DIN 7504K 4,8x19 mm 250 szt.",
    categorySlug: "wkrety-metal",
    brand: "W\xFCrth",
    sku: "WUR-7504K-4.8-19-250",
    unit: "opak. 250 szt.",
    shortDescription: "Wkr\u0119t samowierc\u0105cy z \u0142bem sze\u015Bciok\u0105tnym do blach i cienko\u015Bciennych profili stalowych.",
    description: "Wkr\u0119t samowierc\u0105cy W\xFCrth DIN 7504K 4,8x19 mm to popularny \u0142\u0105cznik do monta\u017Cu obr\xF3bek blacharskich, lekkich konstrukcji stalowych i element\xF3w mocowanych do cienko\u015Bciennych profili. Ko\u0144c\xF3wka samowierc\u0105ca przyspiesza monta\u017C i ogranicza potrzeb\u0119 wst\u0119pnego nawiercania. Produkt sprawdza si\u0119 w pracach dachowych, elewacyjnych i warsztatowych.",
    application: "Do mocowania blach, obr\xF3bek, profili stalowych i akcesori\xF3w instalacyjnych. Stosowa\u0107 zgodnie z grubo\u015Bci\u0105 \u0142\u0105czonych element\xF3w oraz wymaganiami systemowymi producenta.",
    technicalSpec: [
      { label: "\u015Arednica", value: "4,8 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "19 mm" },
      { label: "Norma", value: "DIN 7504K" },
      { label: "\u0141eb", value: "Sze\u015Bciok\u0105tny" },
      { label: "Ko\u0144c\xF3wka", value: "Samowierc\u0105ca" }
    ],
    images: [],
    tags: ["wkr\u0119t do metalu", "w\xFCrth", "samowierc\u0105cy", "din 7504k", "blacha", "profil stalowy"],
    related: ["p149", "p140", "p141"],
    advantages: [
      "Szybki monta\u017C bez konieczno\u015Bci wst\u0119pnego wiercenia w wielu zastosowaniach.",
      "Popularny format do prac dekarskich i monta\u017Cowych.",
      "Dobra powtarzalno\u015B\u0107 i wygoda pracy na budowie."
    ],
    warnings: [
      "Dob\xF3r d\u0142ugo\u015Bci i typu wkr\u0119ta nale\u017Cy uzale\u017Cni\u0107 od grubo\u015Bci oraz rodzaju \u0142\u0105czonych element\xF3w.",
      "Do zastosowa\u0144 zewn\u0119trznych nale\u017Cy stosowa\u0107 w\u0142a\u015Bciw\u0105 klas\u0119 zabezpieczenia antykorozyjnego."
    ],
    faq: [
      { q: "Do czego s\u0142u\u017Cy wkr\u0119t samowierc\u0105cy do metalu?", a: "Do szybkiego \u0142\u0105czenia blach i cienko\u015Bciennych profili stalowych bez osobnego etapu nawiercania w wielu typowych zastosowaniach." },
      { q: "Czy ten wkr\u0119t nadaje si\u0119 do obr\xF3bek blacharskich?", a: "Tak, to jeden z typowych \u0142\u0105cznik\xF3w stosowanych przy monta\u017Cu lekkich element\xF3w blaszanych i akcesori\xF3w dachowych." }
    ],
    seoDescription: "Wkr\u0119t samowierc\u0105cy do metalu W\xFCrth DIN 7504K 4,8x19 mm 250 szt. to praktyczny \u0142\u0105cznik do blach, lekkich konstrukcji stalowych i obr\xF3bek. Je\u015Bli szukasz wkr\u0119t\xF3w do metalu samowierc\u0105cych do prac dachowych i monta\u017Cowych, model W\xFCrth zapewnia szybki monta\u017C i wysok\u0105 wygod\u0119 pracy."
  },
  {
    id: "p155",
    slug: "kotwa-mechaniczna-rawlplug-rbl-m12-10szt",
    name: "Kotwa mechaniczna Rawlplug RBL M12 10 szt.",
    categorySlug: "kotwy-mechaniczne",
    brand: "Rawlplug",
    sku: "RAW-RBL-M12-10",
    unit: "opak. 10 szt.",
    shortDescription: "Kotwa stalowa do mocowania konstrukcji stalowych, konsol, balustrad i element\xF3w instalacyjnych w betonie.",
    description: "Rawlplug RBL M12 to mechaniczna kotwa rozporowa przeznaczona do mocowania element\xF3w w pod\u0142o\u017Cach betonowych. Produkt wykorzystywany jest przy monta\u017Cu wspornik\xF3w, balustrad, konstrukcji stalowych, tras kablowych i ci\u0119\u017Cszych akcesori\xF3w technicznych. Prosty monta\u017C i szerokie zastosowanie czyni\u0105 z niej uniwersalny element wyposa\u017Cenia ekipy monta\u017Cowej.",
    application: "Do betonu niezarysowanego i typowych zastosowa\u0144 monta\u017Cowych w budownictwie. Stosowa\u0107 zgodnie z kart\u0105 techniczn\u0105, g\u0142\u0119boko\u015Bci\u0105 kotwienia i wymaganym momentem dokr\u0119cenia.",
    technicalSpec: [
      { label: "Typ", value: "Kotwa rozporowa" },
      { label: "Rozmiar", value: "M12" },
      { label: "Materia\u0142", value: "Stal ocynkowana" },
      { label: "Pod\u0142o\u017Ce", value: "Beton" },
      { label: "Opakowanie", value: "10 szt." }
    ],
    images: [],
    tags: ["kotwa mechaniczna", "rawlplug", "m12", "beton", "mocowanie", "kotwa rozporowa"],
    related: ["p154", "p140", "p141"],
    advantages: [
      "Szybki monta\u017C w betonie bez stosowania \u017Cywicy.",
      "Dobre rozwi\u0105zanie do wspornik\xF3w, konstrukcji i instalacji.",
      "Popularny standard dla ekip monta\u017Cowych i wykonawc\xF3w."
    ],
    warnings: [
      "Nale\u017Cy przestrzega\u0107 wymaganej g\u0142\u0119boko\u015Bci osadzenia i momentu dokr\u0119cania.",
      "Dob\xF3r kotwy musi by\u0107 zgodny z obci\u0105\u017Ceniem i klas\u0105 pod\u0142o\u017Ca."
    ],
    faq: [
      { q: "Do jakiego pod\u0142o\u017Ca stosuje si\u0119 kotw\u0119 mechaniczn\u0105 RBL?", a: "Przede wszystkim do betonu, zgodnie z kart\u0105 techniczn\u0105 i wymaganiami danego zastosowania." },
      { q: "Kiedy wybra\u0107 kotw\u0119 mechaniczn\u0105 zamiast chemicznej?", a: "Najcz\u0119\u015Bciej wtedy, gdy potrzebny jest szybki monta\u017C w odpowiednim pod\u0142o\u017Cu betonowym i nie ma potrzeby stosowania \u017Cywicy." }
    ],
    seoDescription: "Kotwa mechaniczna Rawlplug RBL M12 10 szt. to sprawdzone mocowanie do betonu dla konstrukcji stalowych, konsol, balustrad i instalacji. Je\u015Bli szukasz kotwy rozporowej M12 do zastosowa\u0144 monta\u017Cowych na budowie, model Rawlplug zapewnia szybki monta\u017C i szerokie mo\u017Cliwo\u015Bci u\u017Cycia."
  },
  {
    id: "p156",
    slug: "paca-zebata-stalco-280x130-8mm",
    name: "Paca z\u0119bata Stalco 280x130 mm z\u0105b 8 mm",
    categorySlug: "pace-gladzie",
    brand: "Stalco",
    sku: "STA-PACA-Z8-280",
    unit: "szt.",
    shortDescription: "Paca stalowa z z\u0119bem 8 mm do rozprowadzania klej\xF3w pod p\u0142ytki i ok\u0142adziny.",
    description: "Paca z\u0119bata Stalco 280x130 mm z z\u0119bem 8 mm to podstawowe narz\u0119dzie glazurnicze do nak\u0142adania kleju na pod\u0142o\u017Ce. Odpowiedni rozmiar z\u0119ba u\u0142atwia r\xF3wnomierne rozprowadzenie zaprawy klejowej pod p\u0142ytki \u015Bcienne i pod\u0142ogowe. Narz\u0119dzie sprawdza si\u0119 zar\xF3wno przy pracach wyko\u0144czeniowych w mieszkaniach, jak i w wi\u0119kszych realizacjach inwestycyjnych.",
    application: "Do rozprowadzania klej\xF3w cementowych i elastycznych pod p\u0142ytki ceramiczne, gresowe i ok\u0142adziny \u015Bcienne. Dob\xF3r wielko\u015Bci z\u0119ba powinien odpowiada\u0107 formatowi p\u0142ytki oraz zaleceniom producenta kleju.",
    technicalSpec: [
      { label: "Wymiar", value: "280 \xD7 130 mm" },
      { label: "Z\u0105b", value: "8 mm" },
      { label: "Materia\u0142 roboczy", value: "Stal" },
      { label: "Uchwyt", value: "Ergonomiczny" }
    ],
    images: [],
    tags: ["paca z\u0119bata", "stalco", "8 mm", "glazurnictwo", "klej do p\u0142ytek", "narz\u0119dzie"],
    related: ["p152", "p153", "p156"],
    advantages: [
      "U\u0142atwia r\xF3wnomierne rozprowadzenie kleju pod p\u0142ytki.",
      "Popularny z\u0105b 8 mm do wielu standardowych format\xF3w.",
      "Praktyczne narz\u0119dzie do prac glazurniczych i wyko\u0144czeniowych."
    ],
    warnings: [
      "Wielko\u015B\u0107 z\u0119ba nale\u017Cy dobra\u0107 do formatu p\u0142ytki i zalece\u0144 producenta kleju.",
      "Po pracy narz\u0119dzie nale\u017Cy oczy\u015Bci\u0107 przed zaschni\u0119ciem zaprawy."
    ],
    faq: [
      { q: "Do czego s\u0142u\u017Cy paca z\u0119bata 8 mm?", a: "Do r\xF3wnomiernego nak\u0142adania kleju pod p\u0142ytki i ok\u0142adziny, tak aby uzyska\u0107 odpowiedni\u0105 warstw\u0119 robocz\u0105." },
      { q: "Czy paca 8 mm nadaje si\u0119 do gresu?", a: "Tak, w wielu przypadkach tak, ale ostateczny dob\xF3r zale\u017Cy od formatu p\u0142ytki i zalece\u0144 systemowych." }
    ],
    seoDescription: "Paca z\u0119bata Stalco 280x130 mm z\u0105b 8 mm to praktyczne narz\u0119dzie do uk\u0142adania p\u0142ytek i rozprowadzania kleju. Je\u015Bli szukasz pacy z\u0119batej 8 mm do prac glazurniczych, model Stalco sprawdzi si\u0119 przy p\u0142ytkach \u015Bciennych, pod\u0142ogowych i standardowych pracach wyko\u0144czeniowych."
  },
  {
    id: "p157",
    slug: "przecinarka-reczna-rubi-speed-62",
    name: "Przecinarka r\u0119czna Rubi Speed-62",
    categorySlug: "narzedzia-glazurnicze",
    brand: "Rubi",
    sku: "RUB-SPEED-62",
    unit: "szt.",
    shortDescription: "R\u0119czna przecinarka do p\u0142ytek \u015Bciennych i pod\u0142ogowych do standardowych prac glazurniczych.",
    description: "Rubi Speed-62 to popularna przecinarka r\u0119czna przeznaczona do docinania p\u0142ytek ceramicznych i gresowych w pracach wyko\u0144czeniowych. Konstrukcja urz\u0105dzenia u\u0142atwia powtarzalne ci\u0119cia, a kompaktowy format sprawdza si\u0119 w mieszkaniach, lokalach us\u0142ugowych i na typowych budowach. Model ceniony jest przez glazurnik\xF3w za mobilno\u015B\u0107 i wygod\u0119 pracy.",
    application: "Do ci\u0119cia p\u0142ytek \u015Bciennych, pod\u0142ogowych oraz wybranych format\xF3w gresu zgodnie z mo\u017Cliwo\u015Bciami urz\u0105dzenia. Stosowa\u0107 z odpowiednim k\xF3\u0142kiem tn\u0105cym i technik\u0105 ci\u0119cia zalecan\u0105 przez producenta.",
    technicalSpec: [
      { label: "Typ", value: "Przecinarka r\u0119czna" },
      { label: "D\u0142ugo\u015B\u0107 ci\u0119cia", value: "do 62 cm" },
      { label: "Zastosowanie", value: "P\u0142ytki ceramiczne i gres" },
      { label: "Mobilno\u015B\u0107", value: "Do pracy na budowie i w wyko\u0144czeniach" }
    ],
    images: [],
    tags: ["przecinarka do p\u0142ytek", "rubi", "speed-62", "glazurnictwo", "gres", "narz\u0119dzie"],
    related: ["p152", "p153", "p156"],
    isFeatured: true,
    advantages: [
      "Wygodne docinanie p\u0142ytek na budowie bez zasilania elektrycznego.",
      "Sprawdzony model do typowych prac glazurniczych.",
      "Mobilna konstrukcja u\u0142atwiaj\u0105ca transport i prac\u0119 w pomieszczeniach."
    ],
    warnings: [
      "Zakres ci\u0119cia nale\u017Cy dopasowa\u0107 do formatu i twardo\u015Bci obrabianej p\u0142ytki.",
      "Do trudniejszych materia\u0142\xF3w mo\u017Ce by\u0107 potrzebne odpowiednie k\xF3\u0142ko lub przecinarka elektryczna."
    ],
    faq: [
      { q: "Do jakich p\u0142ytek nadaje si\u0119 Rubi Speed-62?", a: "Do typowych p\u0142ytek ceramicznych oraz wybranych format\xF3w gresu mieszcz\u0105cych si\u0119 w parametrach urz\u0105dzenia." },
      { q: "Czy przecinarka r\u0119czna wystarcza do prac mieszkaniowych?", a: "W wielu standardowych realizacjach tak, szczeg\xF3lnie przy klasycznych formatach p\u0142ytek i pracach wyko\u0144czeniowych." }
    ],
    seoDescription: "Przecinarka r\u0119czna Rubi Speed-62 to praktyczne narz\u0119dzie do docinania p\u0142ytek \u015Bciennych i pod\u0142ogowych. Je\u015Bli szukasz przecinarki do p\u0142ytek do prac glazurniczych na budowie lub podczas wyko\u0144cze\u0144 wn\u0119trz, model Rubi Speed-62 zapewnia mobilno\u015B\u0107, wygod\u0119 i powtarzalne ci\u0119cie."
  },
  {
    id: "p158",
    slug: "bloczek-komorkowy-solbet-24x24x59",
    name: "Bloczek z betonu kom\xF3rkowego Solbet 24x24x59 cm",
    categorySlug: "bloczek-komorkowy",
    brand: "Solbet",
    sku: "SOL-24-24-59",
    unit: "szt.",
    shortDescription: "Bloczek z betonu kom\xF3rkowego do \u015Bcian no\u015Bnych i dzia\u0142owych w budownictwie jednorodzinnym.",
    description: "Bloczek Solbet 24x24x59 cm to popularny element murowy z betonu kom\xF3rkowego, ch\u0119tnie wybierany przy budowie dom\xF3w jednorodzinnych. Dzi\u0119ki niewielkiej masie obj\u0119to\u015Bciowej i \u0142atwej obr\xF3bce przyspiesza prace murarskie oraz u\u0142atwia wykonywanie docinek na budowie. Produkt stosowany jest do \u015Bcian zewn\u0119trznych, wewn\u0119trznych i dzia\u0142owych zgodnie z projektem.",
    application: "Do wznoszenia \u015Bcian no\u015Bnych, os\u0142onowych i dzia\u0142owych w technologii betonu kom\xF3rkowego. Murowanie prowadzi\u0107 na odpowiednio dobr\u0105 zapraw\u0119 cienkowarstwow\u0105 lub systemow\u0105 zgodnie z wytycznymi producenta.",
    technicalSpec: [
      { label: "Wymiar", value: "24 \xD7 24 \xD7 59 cm" },
      { label: "Materia\u0142", value: "Beton kom\xF3rkowy" },
      { label: "Zastosowanie", value: "\u015Aciany no\u015Bne i dzia\u0142owe" },
      { label: "Obr\xF3bka", value: "\u0141atwa docinka" }
    ],
    images: [],
    tags: ["bloczek kom\xF3rkowy", "solbet", "24 cm", "beton kom\xF3rkowy", "\u015Bciana", "murowanie"],
    related: ["p150", "p151", "p039"],
    advantages: [
      "Lekki materia\u0142 u\u0142atwiaj\u0105cy transport i murowanie.",
      "\u0141atwa obr\xF3bka na budowie i szybkie wykonywanie docinek.",
      "Popularne rozwi\u0105zanie w budownictwie jednorodzinnym."
    ],
    warnings: [
      "Parametry \u015Bciany nale\u017Cy dobra\u0107 zgodnie z projektem i wymogami cieplnymi budynku.",
      "Bloczki trzeba chroni\u0107 przed nadmiernym zawilgoceniem podczas sk\u0142adowania."
    ],
    faq: [
      { q: "Do czego stosuje si\u0119 bloczki z betonu kom\xF3rkowego?", a: "Do budowy \u015Bcian no\u015Bnych, os\u0142onowych i dzia\u0142owych w domach jednorodzinnych oraz innych lekkich obiektach murowanych." },
      { q: "Jak\u0105 zalet\u0119 ma beton kom\xF3rkowy na budowie?", a: "Jest stosunkowo lekki, \u0142atwy w obr\xF3bce i przyspiesza prowadzenie rob\xF3t murarskich." }
    ],
    seoDescription: "Bloczek z betonu kom\xF3rkowego Solbet 24x24x59 cm to sprawdzony materia\u0142 do \u015Bcian no\u015Bnych i dzia\u0142owych. Je\u015Bli szukasz bloczk\xF3w Solbet 24 cm do budowy domu, beton kom\xF3rkowy zapewnia \u0142atw\u0105 obr\xF3bk\u0119, sprawne murowanie i wygod\u0119 pracy na budowie."
  },
  {
    id: "p159",
    slug: "ksztaltka-wiencowa-ytong-u-24",
    name: "Kszta\u0142tka wie\u0144cowa Ytong U 24 cm",
    categorySlug: "ksztaltki-wience",
    brand: "Ytong",
    sku: "YTO-U24",
    unit: "szt.",
    shortDescription: "Kszta\u0142tka U do wykonywania wie\u0144c\xF3w, belek i nadpro\u017Cy w systemie betonu kom\xF3rkowego.",
    description: "Kszta\u0142tka wie\u0144cowa Ytong U 24 cm to systemowy element do wykonywania wie\u0144c\xF3w, belek i innych wzmocnie\u0144 \u017Celbetowych w \u015Bcianach z betonu kom\xF3rkowego. U\u0142atwia prowadzenie prac z zachowaniem ci\u0105g\u0142o\u015Bci materia\u0142owej przegrody oraz przyspiesza przygotowanie deskowania traconego. Rozwi\u0105zanie cz\u0119sto stosowane jest w budownictwie jednorodzinnym.",
    application: "Do wykonywania wie\u0144c\xF3w obwodowych, nadpro\u017Cy i belek \u017Celbetowych w systemie Ytong lub kompatybilnych rozwi\u0105zaniach projektowych. Produkt stosowa\u0107 zgodnie z dokumentacj\u0105 konstrukcyjn\u0105.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107", value: "24 cm" },
      { label: "Typ", value: "Kszta\u0142tka U" },
      { label: "Materia\u0142", value: "Beton kom\xF3rkowy" },
      { label: "Zastosowanie", value: "Wie\u0144ce i nadpro\u017Ca" }
    ],
    images: [],
    tags: ["kszta\u0142tka wie\u0144cowa", "ytong", "u24", "wieniec", "nadpro\u017Ce", "beton kom\xF3rkowy"],
    related: ["p158", "p151", "p150"],
    advantages: [
      "U\u0142atwia wykonanie wie\u0144c\xF3w i belek w technologii betonu kom\xF3rkowego.",
      "Pozwala zachowa\u0107 systemow\u0105 sp\xF3jno\u015B\u0107 przegrody.",
      "Ogranicza ilo\u015B\u0107 tradycyjnego deskowania na budowie."
    ],
    warnings: [
      "Zbrojenie i betonowanie nale\u017Cy wykona\u0107 zgodnie z projektem konstrukcyjnym.",
      "Nie wolno stosowa\u0107 elementu poza zakresem przewidzianym przez dokumentacj\u0119 techniczn\u0105."
    ],
    faq: [
      { q: "Do czego s\u0142u\u017Cy kszta\u0142tka U w systemie \u015Bciennym?", a: "Do wykonywania wie\u0144c\xF3w, nadpro\u017Cy i innych element\xF3w \u017Celbetowych w spos\xF3b zintegrowany z murem." },
      { q: "Czy kszta\u0142tka U zast\u0119puje deskowanie?", a: "W wielu rozwi\u0105zaniach pe\u0142ni funkcj\u0119 deskowania traconego, ale spos\xF3b u\u017Cycia zawsze powinien wynika\u0107 z projektu." }
    ],
    seoDescription: "Kszta\u0142tka wie\u0144cowa Ytong U 24 cm to systemowy element do wykonywania wie\u0144c\xF3w, belek i nadpro\u017Cy w \u015Bcianach z betonu kom\xF3rkowego. Je\u015Bli szukasz kszta\u0142tek U 24 cm do budowy domu, rozwi\u0105zanie Ytong u\u0142atwia prace konstrukcyjne i porz\u0105dkuje monta\u017C element\xF3w \u017Celbetowych."
  },
  {
    id: "p160",
    slug: "strop-teriva-panel-34-4-0",
    name: "Strop Teriva Panel 3,0/4,0",
    categorySlug: "stropy-systemowe",
    brand: "Teriva",
    sku: "TER-PANEL-3-0-4-0",
    unit: "kpl.",
    shortDescription: "Systemowy strop g\u0119sto\u017Cebrowy do budownictwa jednorodzinnego i ma\u0142ych obiekt\xF3w inwestycyjnych.",
    description: "Strop Teriva Panel 3,0/4,0 to systemowe rozwi\u0105zanie stropowe przeznaczone do budownictwa mieszkaniowego. Prefabrykowane elementy i powtarzalna technologia u\u0142atwiaj\u0105 organizacj\u0119 rob\xF3t, ograniczaj\u0105 ilo\u015B\u0107 deskowania i przyspieszaj\u0105 wykonanie kondygnacji. Rozwi\u0105zanie stosowane jest w domach jednorodzinnych, bli\u017Aniakach i mniejszych obiektach u\u017Cytkowych.",
    application: "Do wykonywania strop\xF3w mi\u0119dzykondygnacyjnych zgodnie z projektem konstrukcyjnym. Dob\xF3r wariantu no\u015Bno\u015Bci, rozpi\u0119to\u015Bci i uk\u0142adu element\xF3w musi by\u0107 zgodny z dokumentacj\u0105 techniczn\u0105 inwestycji.",
    technicalSpec: [
      { label: "Typ", value: "Strop systemowy g\u0119sto\u017Cebrowy" },
      { label: "Zastosowanie", value: "Stropy mi\u0119dzykondygnacyjne" },
      { label: "Monta\u017C", value: "Prefabrykowane elementy systemowe" },
      { label: "Obiekty", value: "Domy i ma\u0142e inwestycje" }
    ],
    images: [],
    tags: ["strop teriva", "strop systemowy", "g\u0119sto\u017Cebrowy", "kondygnacja", "budowa domu", "teriva"],
    related: ["p158", "p159", "p151"],
    isFeatured: true,
    advantages: [
      "Przyspiesza wykonanie stropu w por\xF3wnaniu z rozwi\u0105zaniami monolitycznymi.",
      "Powtarzalna technologia u\u0142atwia logistyk\u0119 i organizacj\u0119 rob\xF3t.",
      "Popularne rozwi\u0105zanie w budownictwie jednorodzinnym."
    ],
    warnings: [
      "Dob\xF3r systemu i wariantu no\u015Bno\u015Bci musi wynika\u0107 z projektu konstrukcyjnego.",
      "Monta\u017C stropu wymaga tymczasowego podparcia i prowadzenia rob\xF3t zgodnie z instrukcj\u0105 systemow\u0105."
    ],
    faq: [
      { q: "Gdzie stosuje si\u0119 stropy systemowe Teriva?", a: "Najcz\u0119\u015Bciej w domach jednorodzinnych, zabudowie bli\u017Aniaczej i ma\u0142ych obiektach, gdzie liczy si\u0119 sprawny monta\u017C kondygnacji." },
      { q: "Czy strop Teriva dobiera si\u0119 z katalogu bez projektu?", a: "Nie, wariant systemu, rozpi\u0119to\u015B\u0107 i parametry no\u015Bno\u015Bci musz\u0105 by\u0107 zgodne z projektem konstrukcyjnym." }
    ],
    seoDescription: "Strop Teriva Panel 3,0/4,0 to systemowe rozwi\u0105zanie g\u0119sto\u017Cebrowe do wykonywania strop\xF3w mi\u0119dzykondygnacyjnych w budownictwie mieszkaniowym. Je\u015Bli szukasz stropu Teriva do domu jednorodzinnego, system przyspiesza monta\u017C, porz\u0105dkuje organizacj\u0119 rob\xF3t i dobrze sprawdza si\u0119 na typowych budowach."
  },
  {
    id: "p161",
    slug: "silikat-white-plus-25x12x6-5",
    name: "Silikat Silka White Plus 25x12x6,5 cm",
    categorySlug: "silikaty",
    brand: "Silka",
    sku: "SIL-WP-25-12-65",
    unit: "szt.",
    shortDescription: "Bloczek silikatowy do \u015Bcian dzia\u0142owych i no\u015Bnych wewn\u0119trznych w budownictwie jednorodzinnym.",
    description: "Silka White Plus 25x12x6,5 cm to element murowy z betonu wapienno-piaskowego stosowany do wznoszenia \u015Bcian wewn\u0119trznych no\u015Bnych i dzia\u0142owych. Cechuje go dobra akumulacyjno\u015B\u0107 cieplna, wysoka masa pozwalaj\u0105ca na t\u0142umienie ha\u0142asu oraz g\u0142adka powierzchnia u\u0142atwiaj\u0105ca wyko\u0144czenie. Materia\u0142 ch\u0119tnie wybierany przy budowie dom\xF3w jednorodzinnych i inwestycjach wielorodzinnych.",
    application: "Do \u015Bcian no\u015Bnych i dzia\u0142owych wewn\u0119trznych. Murowanie na cienkiej spoinie lub zaprawie systemowej; element stosowa\u0107 zgodnie z projektem i wymaganiami izolacyjno\u015Bci akustycznej.",
    technicalSpec: [
      { label: "Wymiar", value: "25 \xD7 12 \xD7 6,5 cm" },
      { label: "Materia\u0142", value: "Beton wapienno-piaskowy" },
      { label: "Zastosowanie", value: "\u015Aciany no\u015Bne i dzia\u0142owe" },
      { label: "W\u0142a\u015Bciwo\u015Bci", value: "Akumulacja ciep\u0142a, izolacja akustyczna" }
    ],
    images: [],
    tags: ["silikat", "silka", "\u015Bciana dzia\u0142owa", "\u015Bciana no\u015Bna", "beton wapienno-piaskowy", "murowanie"],
    related: ["p158", "p039", "p150"],
    advantages: [
      "Dobra akumulacyjno\u015B\u0107 cieplna wspomagaj\u0105ca stabilno\u015B\u0107 temperatury.",
      "Wysoka masa wspieraj\u0105ca izolacj\u0119 akustyczn\u0105 przegr\xF3d.",
      "G\u0142adka powierzchnia u\u0142atwiaj\u0105ca wyko\u0144czenie i tynkowanie."
    ],
    warnings: [
      "Chroni\u0107 przed zawilgoceniem podczas sk\u0142adowania na budowie.",
      "Stosowa\u0107 z zapraw\u0105 dobran\u0105 do wymaga\u0144 systemowych i cieplnych."
    ],
    faq: [
      { q: "Do czego stosuje si\u0119 bloczki silikatowe?", a: "G\u0142\xF3wnie do \u015Bcian no\u015Bnych i dzia\u0142owych wewn\u0119trznych, gdzie wa\u017Cna jest akumulacja ciep\u0142a i izolacja akustyczna." },
      { q: "Jaka jest r\xF3\u017Cnica mi\u0119dzy silikatem a ceramik\u0105?", a: "Silikat jest ci\u0119\u017Cszy i lepiej izoluje akustycznie, ceramika jest l\u017Cejsza i lepiej izoluje termicznie w typowych grubo\u015Bciach." }
    ],
    seoDescription: "Silikat Silka White Plus 25x12x6,5 cm to bloczek wapienno-piaskowy do \u015Bcian no\u015Bnych i dzia\u0142owych. Je\u015Bli szukasz silikat\xF3w do budowy \u015Bcian wewn\u0119trznych, model Silka White Plus zapewnia dobr\u0105 akumulacj\u0119 ciepln\u0105 i izolacj\u0119 akustyczn\u0105."
  },
  {
    id: "p162",
    slug: "klej-do-plytek-atlas-plus-25kg",
    name: "Klej do p\u0142ytek Atlas Plus C2T 25 kg",
    categorySlug: "kleje-plytek",
    brand: "Atlas",
    sku: "ATL-PLUS-C2T-25",
    unit: "worek 25 kg",
    shortDescription: "Elastyczny klej do p\u0142ytek ceramicznych, gresowych i kamienia naturalnego do stosowania wewn\u0105trz i na zewn\u0105trz.",
    description: "Atlas Plus C2T to klej o podwy\u017Cszonej przyczepno\u015Bci i zwi\u0119kszonej elastyczno\u015Bci, przeznaczony do przyklejania p\u0142ytek ceramicznych, gresu i kamienia na pod\u0142o\u017Cach wewn\u0119trznych i zewn\u0119trznych. Klasyfikacja C2T oznacza ulepszone wi\u0105zanie i zmniejszony po\u015Blizg, co u\u0142atwia prac\u0119 z du\u017Cymi formatami. Klej stosowany jest przy pod\u0142ogach, \u015Bcianach, tarasach i basenach.",
    application: "Do p\u0142ytek ceramicznych, gresu, kamienia naturalnego i sztucznego na pod\u0142o\u017Cach cementowych i anhydrytowych. Zar\xF3wno do zastosowa\u0144 wewn\u0119trznych, jak i zewn\u0119trznych z zachowaniem odpowiedniej klasy ekspozycji.",
    technicalSpec: [
      { label: "Klasa", value: "C2T" },
      { label: "Spoiwo", value: "Cementowe" },
      { label: "Opakowanie", value: "25 kg" },
      { label: "Zastosowanie", value: "Wewn\u0119trzne i zewn\u0119trzne" },
      { label: "Elastyczno\u015B\u0107", value: "Podwy\u017Cszona" }
    ],
    images: [],
    tags: ["klej do p\u0142ytek", "atlas", "c2t", "gres", "ceramika", "taras", "basen"],
    related: ["p152", "p153", "p156"],
    isFeatured: true,
    advantages: [
      "Klasa C2T zapewnia lepsze wi\u0105zanie i zmniejszony po\u015Blizg.",
      "Nadaje si\u0119 do du\u017Cych format\xF3w p\u0142ytek i gresu.",
      "Wszechstronne zastosowanie wewn\u0105trz i na zewn\u0105trz."
    ],
    warnings: [
      "Zachowa\u0107 wymagany czas otwarty i czas wi\u0105zania zgodny z kart\u0105 techniczn\u0105.",
      "Na zewn\u0105trz stosowa\u0107 z odpowiednim zabezpieczeniem przed mrozem w czasie twardnienia."
    ],
    faq: [
      { q: "Co oznacza klasa C2T?", a: "C2 to klej o ulepszonym wi\u0105zaniu, T oznacza zmniejszony po\u015Blizg (thixotropic), co u\u0142atwia prac\u0119 ze \u015Bcianami i du\u017Cymi formatami." },
      { q: "Czy klej Atlas Plus nadaje si\u0119 na taras?", a: "Tak, pod warunkiem w\u0142a\u015Bciwej klasyfikacji zastosowania zewn\u0119trznego i odpowiedniego zabezpieczenia spoin fug\u0105 mrozoodporn\u0105." }
    ],
    seoDescription: "Klej do p\u0142ytek Atlas Plus C2T 25 kg to elastyczny klej cementowy do ceramiki, gresu i kamienia. Je\u015Bli szukasz kleju do p\u0142ytek klasy C2T do pod\u0142\xF3g, \u015Bcian i taras\xF3w, model Atlas Plus sprawdzi si\u0119 w szerokim zakresie zastosowa\u0144 wewn\u0119trznych i zewn\u0119trznych."
  },
  {
    id: "p163",
    slug: "fuga-ceramiczna-atlas-2-3mm-szara-2kg",
    name: "Fuga ceramiczna Atlas Fuga Nanotech 2\u20133 mm szara 2 kg",
    categorySlug: "fugi",
    brand: "Atlas",
    sku: "ATL-FUGNANO-23-SZ-2",
    unit: "opak. 2 kg",
    shortDescription: "Fuga cementowa do spoin 2\u20133 mm do p\u0142ytek ceramicznych i gresowych wewn\u0105trz i na zewn\u0105trz.",
    description: "Atlas Fuga Nanotech to zaawansowana fuga cementowa z technologi\u0105 nanocz\u0105stek, zapewniaj\u0105ca odporno\u015B\u0107 na zabrudzenia i u\u0142atwiaj\u0105ca utrzymanie czysto\u015Bci spoin. Przeznaczona do p\u0142ytek ceramicznych, gresowych i mozaik na pod\u0142ogach i \u015Bcianach. Szeroka paleta kolor\xF3w pozwala estetycznie dopasowa\u0107 fug\u0119 do ka\u017Cdej ok\u0142adziny.",
    application: "Do fugowania spoin 2\u20133 mm w p\u0142ytkach ceramicznych, gresie i mozaice. Stosowa\u0107 wewn\u0105trz i na zewn\u0105trz zgodnie z kart\u0105 techniczn\u0105, z zachowaniem odpowiedniej temperatury aplikacji.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107 spoiny", value: "2\u20133 mm" },
      { label: "Technologia", value: "Nanocz\u0105stki" },
      { label: "Kolor", value: "Szara" },
      { label: "Opakowanie", value: "2 kg" },
      { label: "Zastosowanie", value: "Wewn\u0105trz i zewn\u0105trz" }
    ],
    images: [],
    tags: ["fuga", "atlas", "nanotech", "spoina", "p\u0142ytki", "gres", "ceramika"],
    related: ["p162", "p152", "p156"],
    advantages: [
      "Technologia nanocz\u0105stek u\u0142atwia utrzymanie czysto\u015Bci spoin.",
      "Dobra odporno\u015B\u0107 na zabrudzenia i \u015Bcieranie.",
      "Szeroka paleta kolor\xF3w do dopasowania do ka\u017Cdej ok\u0142adziny."
    ],
    warnings: [
      "Po na\u0142o\u017Ceniu fug\u0119 nale\u017Cy starannie usun\u0105\u0107 z powierzchni p\u0142ytek przed zaschni\u0119ciem.",
      "Spoiny w strefach nara\u017Conych na ruch nale\u017Cy wyci\u0105\u0107 i uzupe\u0142ni\u0107 uszczelniaczem silikonowym."
    ],
    faq: [
      { q: "Czy fuga Nanotech nadaje si\u0119 na zewn\u0105trz?", a: "Tak, zgodnie z kart\u0105 techniczn\u0105 mo\u017Cna j\u0105 stosowa\u0107 na zewn\u0105trz z zachowaniem wymog\xF3w dotycz\u0105cych temperatury i wilgotno\u015Bci." },
      { q: "Na czym polega technologia Nanotech?", a: "Nanocz\u0105stki w sk\u0142adzie fugi zmniejszaj\u0105 przyczepno\u015B\u0107 zabrudze\u0144 do powierzchni spoiny, u\u0142atwiaj\u0105c jej czyszczenie." }
    ],
    seoDescription: "Fuga ceramiczna Atlas Nanotech 2\u20133 mm szara 2 kg to nowoczesna fuga cementowa do p\u0142ytek i gresu. Je\u015Bli szukasz fugi 2\u20133 mm do p\u0142ytek ceramicznych z \u0142atwym utrzymaniem czysto\u015Bci, Atlas Nanotech zapewnia odporno\u015B\u0107 na zabrudzenia i estetyczne wyko\u0144czenie spoin."
  },
  {
    id: "p164",
    slug: "rura-spustowa-galeco-pvc-90-3m-grafit",
    name: "Rura spustowa PVC Galeco 90 mm 3 mb grafit",
    categorySlug: "rury-spustowe",
    brand: "Galeco",
    sku: "GAL-RS90-3-GRA",
    unit: "szt. 3 m",
    shortDescription: "Rura spustowa PVC Galeco 90 mm do odprowadzania wody z systemu rynnowego.",
    description: "Rura spustowa PVC Galeco 90 mm to element pionowego odprowadzenia wody z rynny do gruntu lub kanalizacji deszczowej. Wykonana z odpornego na UV tworzywa sztucznego, stanowi uzupe\u0142nienie systemu rynnowego Galeco PVC. Produkt stosowany w budownictwie jednorodzinnym i ma\u0142ych obiektach.",
    application: "Do system\xF3w rynnowych Galeco PVC jako pionowe odprowadzenie wody. Montowa\u0107 z zachowaniem odpowiedniego mocowania do \u015Bciany i prawid\u0142owego ukierunkowania odp\u0142ywu.",
    technicalSpec: [
      { label: "\u015Arednica", value: "90 mm" },
      { label: "D\u0142ugo\u015B\u0107", value: "3 m" },
      { label: "Materia\u0142", value: "PVC" },
      { label: "Kolor", value: "Grafit" },
      { label: "System", value: "Galeco PVC" }
    ],
    images: [],
    tags: ["rura spustowa", "galeco", "pvc", "90 mm", "system rynnowy", "grafit"],
    related: ["p147", "p148", "p083"],
    advantages: [
      "Odporno\u015B\u0107 na UV i warunki atmosferyczne.",
      "Systemowa kompatybilno\u015B\u0107 z rynnami Galeco PVC 135.",
      "Lekka i \u0142atwa w monta\u017Cu konstrukcja."
    ],
    warnings: [
      "Rura musi by\u0107 mocowana do \u015Bciany w odpowiednich odst\u0119pach.",
      "Stosowa\u0107 wy\u0142\u0105cznie z akcesoriami z systemu Galeco PVC."
    ],
    faq: [
      { q: "Czy rura spustowa 90 mm pasuje do rynny 135?", a: "Tak, w systemie Galeco PVC rura 90 mm jest standardowym dopasowaniem do rynny 135." },
      { q: "Jak przebiega monta\u017C rury spustowej?", a: "Rura jest mocowana do \u015Bciany uchwytami i \u0142\u0105czona z lejkiem rynnowym przy po\u0142aci dachowej." }
    ],
    seoDescription: "Rura spustowa PVC Galeco 90 mm 3 mb grafit to element systemu rynnowego do pionowego odprowadzenia wody z dachu. Je\u015Bli kompletujesz system rynnowy Galeco PVC, rura spustowa 90 mm dopasowuje si\u0119 do rynny 135 i zapewnia trwa\u0142e odprowadzenie wody."
  },
  {
    id: "p165",
    slug: "wietrznik-dachowy-fakro-dwz-125",
    name: "Wietrznik dachowy Fakro DWZ 125",
    categorySlug: "komunikacja-dachowa",
    brand: "Fakro",
    sku: "FAK-DWZ-125",
    unit: "szt.",
    shortDescription: "Kalenicowy wietrznik dachowy do wentylacji przestrzeni dachowej pod pokryciem.",
    description: "Fakro DWZ 125 to wietrznik kalenicowy s\u0142u\u017C\u0105cy do wentylacji przestrzeni pod pokryciem dachowym. Poprawia cyrkulacj\u0119 powietrza w warstwie wentylacyjnej dachu, zapobiegaj\u0105c kondensacji pary wodnej i niszczeniu drewnianej konstrukcji. Stosowany jest w nowych budowach i przy modernizacji wentylacji dachowej.",
    application: "Do monta\u017Cu wzd\u0142u\u017C kalenicy na dachach sko\u015Bnych z pokryciem blachodach\xF3wkowym, dach\xF3wk\u0105 ceramiczn\u0105 lub betonow\u0105. Wymagany dob\xF3r modelu do rodzaju pokrycia.",
    technicalSpec: [
      { label: "Typ", value: "Wietrznik kalenicowy" },
      { label: "\u015Arednica", value: "125 mm" },
      { label: "Zastosowanie", value: "Wentylacja przestrzeni dachowej" },
      { label: "Monta\u017C", value: "Wzd\u0142u\u017C kalenicy" }
    ],
    images: [],
    tags: ["wietrznik dachowy", "fakro", "kalenicowy", "wentylacja dachu", "dach\xF3wka", "blachodach\xF3wka"],
    related: ["p145", "p149", "p082"],
    advantages: [
      "Poprawia wentylacj\u0119 przestrzeni dachowej i zapobiega kondensacji.",
      "Chroni drewnian\u0105 konstrukcj\u0119 dachow\u0105 przed wilgoci\u0105.",
      "Dopasowany do popularnych pokry\u0107 dachowych."
    ],
    warnings: [
      "Model nale\u017Cy dobra\u0107 odpowiednio do rodzaju i profilu pokrycia dachowego.",
      "Monta\u017C nale\u017Cy prowadzi\u0107 zgodnie z instrukcj\u0105 producenta, zachowuj\u0105c szczelno\u015B\u0107 na styku z pokryciem."
    ],
    faq: [
      { q: "Do czego s\u0142u\u017Cy wietrznik kalenicowy?", a: "Do wentylowania przestrzeni mi\u0119dzy pokryciem a membran\u0105 dachow\u0105, zapobiegaj\u0105c gromadzeniu si\u0119 wilgoci i parze wodnej." },
      { q: "Czy wietrznik mo\u017Cna zamontowa\u0107 na ka\u017Cdym dachu?", a: "Dob\xF3r modelu zale\u017Cy od rodzaju pokrycia, dlatego wa\u017Cne jest dobranie odpowiedniego wariantu zgodnie z instalowanym systemem." }
    ],
    seoDescription: "Wietrznik dachowy Fakro DWZ 125 to kalenicowy element wentylacyjny do przestrzeni dachowej. Je\u015Bli szukasz wietrznika dachowego do dachu z blachodach\xF3wk\u0105 lub dach\xF3wk\u0105, model Fakro DWZ 125 poprawia wentylacj\u0119 i chroni konstrukcj\u0119 dachow\u0105 przed wilgoci\u0105."
  },
  {
    id: "p166",
    slug: "grunt-gleboko-penetrujacy-atlas-uniflexatt-10l",
    name: "Grunt g\u0142\u0119boko penetruj\u0105cy Atlas Uni-Grunt 10 l",
    categorySlug: "grunty-tynki",
    brand: "Atlas",
    sku: "ATL-UNIGR-10",
    unit: "op. 10 l",
    shortDescription: "Preparat gruntuj\u0105cy do wyr\xF3wnania ch\u0142onno\u015Bci pod\u0142o\u017Ca przed tynkowaniem i klejeniem.",
    description: "Atlas Uni-Grunt to \u015Brodek gruntuj\u0105cy o dzia\u0142aniu g\u0142\u0119boko penetruj\u0105cym, stosowany przed nak\u0142adaniem tynk\xF3w, klej\xF3w do p\u0142ytek i mas wyr\xF3wnuj\u0105cych. Wyr\xF3wnuje ch\u0142onno\u015B\u0107 pod\u0142o\u017Ca, poprawia przyczepno\u015B\u0107 kolejnych warstw i redukuje ryzyko zbyt szybkiego odci\u0105gania wody z zapraw. Produkt nadaje si\u0119 do pod\u0142o\u017Cy porowatych, gazobetonowych, ceglanych i mineralnych.",
    application: "Nanosi\u0107 na oczyszczone i stabilne pod\u0142o\u017Ce wa\u0142kiem, p\u0119dzlem lub przez natrysk. Czas schni\u0119cia przed na\u0142o\u017Ceniem kolejnej warstwy zgodny z kart\u0105 techniczn\u0105 \u2014 zazwyczaj 2\u20134 godziny.",
    technicalSpec: [
      { label: "Typ", value: "Grunt penetruj\u0105cy" },
      { label: "Opakowanie", value: "10 l" },
      { label: "Pod\u0142o\u017Ce", value: "Beton, gazobeton, ceg\u0142a, tynk mineralny" },
      { label: "Rozcie\u0144czenie", value: "Woda (zale\u017Cnie od ch\u0142onno\u015Bci)" }
    ],
    images: [],
    tags: ["grunt", "atlas", "gruntowanie", "przyczepno\u015B\u0107", "tynk", "pod\u0142o\u017Ce"],
    related: ["p162", "p158", "p039"],
    advantages: [
      "Wyr\xF3wnuje ch\u0142onno\u015B\u0107 i wzmacnia s\u0142abe pod\u0142o\u017Ca przed kolejnymi warstwami.",
      "Poszerza adhezj\u0119 klej\xF3w i tynk\xF3w.",
      "Nadaje si\u0119 do wielu typowych pod\u0142o\u017Cy w budownictwie."
    ],
    warnings: [
      "Nie stosowa\u0107 w temperaturach poni\u017Cej +5\xB0C.",
      "Pod\u0142o\u017Ce musi by\u0107 czyste, stabilne i wolne od kurzu i olej\xF3w."
    ],
    faq: [
      { q: "Czy gruntowanie jest konieczne przed tynkiem?", a: "W wielu przypadkach tak \u2014 szczeg\xF3lnie na ch\u0142onnych lub s\u0142abych pod\u0142o\u017Cach gruntowanie znacz\u0105co poprawia przyczepno\u015B\u0107 tynku." },
      { q: "Do jakich pod\u0142o\u017Cy nadaje si\u0119 Atlas Uni-Grunt?", a: "Do betonu, gazobetonu, ceg\u0142y, pustak\xF3w ceramicznych, starych tynk\xF3w mineralnych i podobnych pod\u0142o\u017Cy mineralnych." }
    ],
    seoDescription: "Grunt g\u0142\u0119boko penetruj\u0105cy Atlas Uni-Grunt 10 l to preparat gruntuj\u0105cy do betonu, gazobetonu i ceg\u0142y. Je\u015Bli szukasz gruntu wyr\xF3wnuj\u0105cego ch\u0142onno\u015B\u0107 pod\u0142o\u017Ca przed tynkowaniem lub klejeniem p\u0142ytek, Atlas Uni-Grunt poprawi przyczepno\u015B\u0107 i przygotuje pod\u0142o\u017Ce do dalszych prac."
  },
  {
    id: "p167",
    slug: "tynk-cementowo-wapienny-baumit-rk39-30kg",
    name: "Tynk cementowo-wapienny Baumit RK 39 30 kg",
    categorySlug: "tynki-wewnetrzne",
    brand: "Baumit",
    sku: "BAU-RK39-30",
    unit: "worek 30 kg",
    shortDescription: "Tynk cementowo-wapienny do stosowania r\u0119cznego i maszynowego na \u015Bcianach wewn\u0119trznych.",
    description: "Baumit RK 39 to tynk cementowo-wapienny przeznaczony do tynkowania r\u0119cznego i maszynowego wewn\u0105trz budynk\xF3w. Dobrze przylega do ceg\u0142y, bloczk\xF3w ceramicznych, silikatowych i betonowych. Mo\u017Ce by\u0107 stosowany jako warstwa podk\u0142adowa (obrzutka, narzut) w tradycyjnym systemie tynkarskim.",
    application: "Do tynkowania \u015Bcian wewn\u0119trznych z ceramiki, silikat\xF3w, betonu kom\xF3rkowego i podobnych pod\u0142o\u017Cy. Stosowa\u0107 metod\u0105 r\u0119czn\u0105 lub maszynow\u0105 zgodnie z instrukcj\u0105 producenta.",
    technicalSpec: [
      { label: "Typ", value: "Cementowo-wapienny" },
      { label: "Opakowanie", value: "30 kg" },
      { label: "Metoda nak\u0142adania", value: "R\u0119czna i maszynowa" },
      { label: "Zastosowanie", value: "Wewn\u0119trzne" }
    ],
    images: [],
    tags: ["tynk", "baumit", "cementowo-wapienny", "maszynowy", "\u015Bciany", "wewn\u0119trzny"],
    related: ["p166", "p158", "p150"],
    advantages: [
      "Mo\u017Cliwo\u015B\u0107 nak\u0142adania r\u0119cznego i maszynowego.",
      "Dobra przyczepno\u015B\u0107 do typowych pod\u0142o\u017Cy mineralnych.",
      "Sprawdzony tynk do tradycyjnych system\xF3w tynkarskich."
    ],
    warnings: [
      "Stosowa\u0107 w temperaturach powy\u017Cej +5\xB0C i chroni\u0107 przed zbyt szybkim wysychaniem.",
      "Pod\u0142o\u017Ce powinno by\u0107 zagruntowane odpowiednim preparatem gruntuj\u0105cym."
    ],
    faq: [
      { q: "Czym r\xF3\u017Cni si\u0119 tynk maszynowy od r\u0119cznego?", a: "Tynk maszynowy jest zoptymalizowany pod k\u0105tem retencji wody i czasu otwarcia do pracy agregatem tynkarskim, cho\u0107 wiele produkt\xF3w nadaje si\u0119 do obu metod." },
      { q: "Czy tynk RK 39 nadaje si\u0119 na gazobeton?", a: "Tak, do gazobetonu mo\u017Cna go stosowa\u0107 po uprzednim zagruntowaniu pod\u0142o\u017Ca odpowiednim gruntem." }
    ],
    seoDescription: "Tynk cementowo-wapienny Baumit RK 39 30 kg to materia\u0142 do tynkowania wewn\u0119trznego r\u0119cznego i maszynowego. Je\u015Bli szukasz tynku cementowo-wapiennego do \u015Bcian wewn\u0119trznych z ceramiki lub silikat\xF3w, Baumit RK 39 zapewnia dobr\u0105 przyczepno\u015B\u0107 i sprawne prowadzenie rob\xF3t tynkarskich."
  },
  {
    id: "p168",
    slug: "membrana-dachowa-pro-fi-150-50m2",
    name: "Membrana dachowa Foliarex PRO FI 150 rolka 50 m\xB2",
    categorySlug: "membrany-dachowe",
    brand: "Foliarex",
    sku: "FOL-PROFI150-50",
    unit: "rolka 50 m\xB2",
    shortDescription: "Tr\xF3jwarstwowa membrana wysokoparoprzepuszczalna do stosowania na krokwiach bez kontr\u0142aty wentylacyjnej.",
    description: "Foliarex PRO FI 150 to tr\xF3jwarstwowa membrana wst\u0119pnego krycia o podwy\u017Cszonej paroprzepuszczalno\u015Bci, przeznaczona do stosowania bezpo\u015Brednio na pe\u0142nym deskowaniu lub krokwiach. Membrana chroni dach przed wod\u0105 i wiatrem, jednocze\u015Bnie pozwalaj\u0105c na odprowadzenie pary wodnej z izolacji. Popularny wyb\xF3r przy budowie dom\xF3w jednorodzinnych z drewnian\u0105 wi\u0119\u017Ab\u0105 dachow\u0105.",
    application: "Na krokwiach lub pe\u0142nym deskowaniu jako folia podk\u0142adowa pod pokrycie dachowe. Szczeliny wentylacyjne i metoda uk\u0142adania zgodnie z instrukcj\u0105 producenta oraz wymaganiami projektowymi.",
    technicalSpec: [
      { label: "Typ", value: "Membrana wst\u0119pnego krycia" },
      { label: "Warstwy", value: "3" },
      { label: "Paroprzepuszczalno\u015B\u0107", value: "Sd \u2264 0,02 m" },
      { label: "Powierzchnia", value: "50 m\xB2" },
      { label: "Zastosowanie", value: "Bezpo\u015Brednio na krokwiach" }
    ],
    images: [],
    tags: ["membrana dachowa", "foliarex", "wst\u0119pne krycie", "paroprzepuszczalna", "dach", "wi\u0119\u017Aba"],
    related: ["p145", "p149", "p165"],
    advantages: [
      "Wysoka paroprzepuszczalno\u015B\u0107 chroni\u0105ca izolacj\u0119 przed zawilgoceniem.",
      "Dopuszcza monta\u017C bezpo\u015Brednio na krokwiach bez kontr\u0142aty.",
      "Tr\xF3jwarstwowa budowa zapewnia trwa\u0142o\u015B\u0107 i wytrzyma\u0142o\u015B\u0107 mechaniczn\u0105."
    ],
    warnings: [
      "Paski zak\u0142adki \u0142\u0105czy\u0107 ta\u015Bm\u0105 klej\u0105c\u0105 zgodn\u0105 z systemem producenta.",
      "Przechowywa\u0107 z dala od bezpo\u015Bredniego nas\u0142onecznienia do czasu monta\u017Cu."
    ],
    faq: [
      { q: "Czy membrana zast\u0119puje pap\u0119 podk\u0142adow\u0105?", a: "W nowoczesnym budownictwie membrana wst\u0119pnego krycia zast\u0105pi\u0142a tradycyjn\u0105 pap\u0119 jako warstwa wiatroizolacyjna i wst\u0119pnego krycia pod pokryciem." },
      { q: "Czy membrany wysokoparoprzepuszczalne wymagaj\u0105 szczeliny wentylacyjnej?", a: "Wymagania dotycz\u0105ce szczeliny zale\u017C\u0105 od projektu; membrany Sd \u2264 0,02 m cz\u0119sto umo\u017Cliwiaj\u0105 uk\u0142adanie bezpo\u015Brednio na krokwi, ale zawsze nale\u017Cy sprawdzi\u0107 projekt." }
    ],
    seoDescription: "Membrana dachowa Foliarex PRO FI 150 50 m\xB2 to tr\xF3jwarstwowa membrana wst\u0119pnego krycia do dach\xF3w sko\u015Bnych. Je\u015Bli szukasz membrany wysokoparoprzepuszczalnej do monta\u017Cu na krokwiach, Foliarex PRO FI 150 zapewnia ochron\u0119 przed wod\u0105 i wiatrem oraz swobodne odprowadzenie pary z izolacji."
  },
  {
    id: "p169",
    slug: "zaprawa-murarska-atlas-uni-25kg",
    name: "Zaprawa murarska Atlas UNI 25 kg",
    categorySlug: "zaprawy-murarskie",
    brand: "Atlas",
    sku: "ATL-UNI-MUR-25",
    unit: "worek 25 kg",
    shortDescription: "Uniwersalna zaprawa cementowo-wapienna do murowania bloczk\xF3w ceramicznych, silikatowych i betonowych.",
    description: "Atlas UNI to cementowo-wapienna zaprawa murarska przeznaczona do wznoszenia \u015Bcian z bloczk\xF3w ceramicznych, silikatowych, z betonu kom\xF3rkowego oraz ceg\u0142y pe\u0142nej. Dzi\u0119ki zr\xF3wnowa\u017Conemu sk\u0142adowi dobrze przylega do typowych materia\u0142\xF3w \u015Bciennych i zachowuje odpowiedni\u0105 urabialno\u015B\u0107. Produkt sprawdza si\u0119 zar\xF3wno przy pracach r\u0119cznych, jak i przy u\u017Cyciu mieszarki.",
    application: "Do murowania \u015Bcian no\u015Bnych i dzia\u0142owych z ceramiki, silikat\xF3w, betonu kom\xF3rkowego i ceg\u0142y. Grubo\u015B\u0107 spoiny: 10\u201315 mm. Stosowa\u0107 w temperaturach powy\u017Cej +5\xB0C, chroni\u0107 \u015Bwie\u017Co wymurowan\u0105 \u015Bcian\u0119 przed deszczem i mrozem.",
    technicalSpec: [
      { label: "Typ", value: "Cementowo-wapienna" },
      { label: "Opakowanie", value: "25 kg" },
      { label: "Grubo\u015B\u0107 spoiny", value: "10\u201315 mm" },
      { label: "Zu\u017Cycie", value: "ok. 16 kg/m\xB2 przy grubo\u015Bci 10 mm" },
      { label: "Zastosowanie", value: "\u015Aciany no\u015Bne i dzia\u0142owe" }
    ],
    images: [],
    tags: ["zaprawa murarska", "atlas", "uni", "murowanie", "ceramika", "silikat", "gazobeton"],
    related: ["p150", "p158", "p161"],
    advantages: [
      "Dobra urabialno\u015B\u0107 u\u0142atwiaj\u0105ca prac\u0119 przy r\xF3\u017Cnych metodach murowania.",
      "Kompatybilno\u015B\u0107 z szerokim zakresem typowych materia\u0142\xF3w \u015Bciennych.",
      "Prosta aplikacja bez potrzeby dodawania wapna."
    ],
    warnings: [
      "Stosowa\u0107 wy\u0142\u0105cznie w temperaturach powy\u017Cej +5\xB0C.",
      "\u015Awie\u017Co wymurowan\u0105 \u015Bcian\u0119 chroni\u0107 przed zbyt szybkim wysychaniem."
    ],
    faq: [
      { q: "Czy zaprawa Atlas UNI nadaje si\u0119 do betonu kom\xF3rkowego?", a: "Tak, mo\u017Cna j\u0105 stosowa\u0107 do betonu kom\xF3rkowego na standardowej spoinie 10\u201315 mm. Do cienkich spoin konieczna jest zaprawa cienkowarstwowa." },
      { q: "Jakie jest zu\u017Cycie zaprawy murarskiej?", a: "Przy standardowej grubo\u015Bci spoiny 10 mm wynosi ok. 16 kg/m\xB2 \u015Bciany." }
    ],
    seoDescription: "Zaprawa murarska Atlas UNI 25 kg to cementowo-wapienny materia\u0142 do murowania \u015Bcian z ceramiki, silikat\xF3w i betonu kom\xF3rkowego. Je\u015Bli szukasz zaprawy murarskiej do budowy domu, Atlas UNI zapewnia dobr\u0105 urabialno\u015B\u0107 i szerok\u0105 kompatybilno\u015B\u0107 z typowymi materia\u0142ami \u015Bciennymi."
  },
  {
    id: "p170",
    slug: "zaprawa-posadzkowa-baumit-nivello-25kg",
    name: "Zaprawa posadzkowa samopoziomuj\u0105ca Baumit Nivello 25 kg",
    categorySlug: "zaprawy-posadzkowe",
    brand: "Baumit",
    sku: "BAU-NIVELLO-25",
    unit: "worek 25 kg",
    shortDescription: "Szybkoschn\u0105ca zaprawa samopoziomuj\u0105ca do wyr\xF3wnywania pod\u0142\xF3g betonowych przed uk\u0142adaniem ok\u0142adzin.",
    description: "Baumit Nivello to zaprawa samopoziomuj\u0105ca przeznaczona do wyr\xF3wnywania i niwelowania pod\u0142o\u017Cy betonowych, anhydrytowych i starych warstw ceramicznych przed u\u0142o\u017Ceniem p\u0142ytek, parkietu, paneli lub wyk\u0142adzin. Samoczynne rozprowadzanie masy upraszcza prace przygotowawcze i pozwala na precyzyjne wype\u0142nienie nier\xF3wno\u015Bci bez klasycznego zacierania. Wytrzyma\u0142o\u015B\u0107 mechaniczna po wyschni\u0119ciu umo\u017Cliwia szybkie kontynuowanie rob\xF3t.",
    application: "Do wyr\xF3wnywania pod\u0142\xF3g wewn\u0119trznych przed wyk\u0142adaniem p\u0142ytkami, panelami, parkietem lub wyk\u0142adzin\u0105. Warstwa 2\u201330 mm. Pod\u0142o\u017Ce zagruntowa\u0107 przed aplikacj\u0105. Nie stosowa\u0107 na zewn\u0105trz ani w strefach permanentnego zawilgocenia.",
    technicalSpec: [
      { label: "Typ", value: "Samopoziomuj\u0105ca" },
      { label: "Opakowanie", value: "25 kg" },
      { label: "Grubo\u015B\u0107 warstwy", value: "2\u201330 mm" },
      { label: "Czas schni\u0119cia", value: "Ok. 2\u20133 h (obci\u0105\u017Cenie); 24 h (ok\u0142adzina)" },
      { label: "Zastosowanie", value: "Wewn\u0119trzne" }
    ],
    images: [],
    tags: ["zaprawa posadzkowa", "baumit", "nivello", "samopoziomuj\u0105ca", "wyr\xF3wnywanie pod\u0142ogi", "posadzka"],
    related: ["p166", "p162", "p158"],
    advantages: [
      "Samoczynne rozprowadzanie eliminuje \u017Cmudne zacieranie.",
      "Szybkie schni\u0119cie przyspiesza harmonogram rob\xF3t.",
      "Mo\u017Cliwo\u015B\u0107 nak\u0142adania warstw 2\u201330 mm."
    ],
    warnings: [
      "Pod\u0142o\u017Ce bezwzgl\u0119dnie zagruntowa\u0107 przed aplikacj\u0105.",
      "Nie stosowa\u0107 na zewn\u0105trz i w strefach trwa\u0142ego zawilgocenia."
    ],
    faq: [
      { q: "Po jakim czasie mo\u017Cna uk\u0142ada\u0107 p\u0142ytki na zaprawie Nivello?", a: "Po ok. 24 h od na\u0142o\u017Cenia warstwy wyr\xF3wnuj\u0105cej, w zale\u017Cno\u015Bci od temperatury i grubo\u015Bci." },
      { q: "Czy Nivello zast\u0119puje wylewk\u0119?", a: "Nie \u2014 to zaprawa wyr\xF3wnuj\u0105ca stosowana jako warstwa wyg\u0142adzaj\u0105ca przed ok\u0142adzin\u0105, nie jako no\u015Bna warstwa konstrukcyjna." }
    ],
    seoDescription: "Zaprawa posadzkowa samopoziomuj\u0105ca Baumit Nivello 25 kg to szybki spos\xF3b na wyr\xF3wnanie nier\xF3wno\u015Bci przed uk\u0142adaniem p\u0142ytek i pod\u0142\xF3g. Je\u015Bli szukasz masy samopoziomuj\u0105cej do pod\u0142\xF3g wewn\u0119trznych, Baumit Nivello zapewnia g\u0142adk\u0105 powierzchni\u0119 i kr\xF3tki czas oczekiwania na kolejne prace."
  },
  {
    id: "p171",
    slug: "zaprawa-uszczelniajaca-atlas-woder-d-5kg",
    name: "Zaprawa uszczelniaj\u0105ca Atlas Woder D 5 kg",
    categorySlug: "zaprawy-uszczelniajace",
    brand: "Atlas",
    sku: "ATL-WODER-D-5",
    unit: "op. 5 kg",
    shortDescription: "Dwusk\u0142adnikowa elastyczna zaprawa do uszczelniania \u0142azienek, taras\xF3w i basen\xF3w pod p\u0142ytkami.",
    description: "Atlas Woder D to dwusk\u0142adnikowa, elastyczna zaprawa uszczelniaj\u0105ca przeznaczona do tworzenia szczelnych pow\u0142ok izolacyjnych w \u0142azienkach, strefach prysznicowych, tarasach i basenach. Po\u0142\u0105czenie sk\u0142adnika proszkowego i dyspersji polimerowej zapewnia wysok\u0105 elastyczno\u015B\u0107 oraz odporno\u015B\u0107 na wod\u0119 w sta\u0142ym kontakcie. Po wyschni\u0119ciu mo\u017Cna bezpo\u015Brednio klei\u0107 p\u0142ytki.",
    application: "Do uszczelniania \u015Bcian i pod\u0142\xF3g w strefach mokrych: \u0142azienki, prysznice, tarasy, balkony, baseny. Nanosi\u0107 p\u0119dzlem lub wa\u0142kiem w 2 warstwach; przy naro\u017Cach i dylatacjach wklei\u0107 ta\u015Bm\u0119 uszczelniaj\u0105c\u0105. Klei\u0107 p\u0142ytki po minimum 12 h.",
    technicalSpec: [
      { label: "Typ", value: "Dwusk\u0142adnikowa elastyczna" },
      { label: "Opakowanie", value: "5 kg (proszek + dyspersja)" },
      { label: "Liczba warstw", value: "Minimum 2" },
      { label: "Czas do klejenia", value: "Min. 12 h" },
      { label: "Zastosowanie", value: "Strefy mokre, tarasy, baseny" }
    ],
    images: [],
    tags: ["zaprawa uszczelniaj\u0105ca", "atlas", "woder", "strefa mokra", "\u0142azienka", "taras", "basen"],
    related: ["p162", "p163", "p152"],
    advantages: [
      "Wysoka elastyczno\u015B\u0107 znosi mikrodrgania i odkszta\u0142cenia pod\u0142o\u017Ca.",
      "Bezpo\u015Brednie klejenie p\u0142ytek po wyschni\u0119ciu pow\u0142oki.",
      "Skuteczna ochrona przed wod\u0105 w sta\u0142ym kontakcie."
    ],
    warnings: [
      "W naro\u017Cach i przy przej\u015Bciach instalacyjnych bezwzgl\u0119dnie stosowa\u0107 ta\u015Bm\u0119 uszczelniaj\u0105c\u0105.",
      "Nie stosowa\u0107 na pod\u0142o\u017Cach niestabilnych lub odspajaj\u0105cych si\u0119."
    ],
    faq: [
      { q: "Czy Woder D nadaje si\u0119 do strefy prysznica?", a: "Tak, to jedno z podstawowych zastosowa\u0144 \u2014 pod\u0142oga i \u015Bciany kabiny prysznicowej to typowa strefa mokra wymagaj\u0105ca uszczelnienia pod p\u0142ytkami." },
      { q: "Po jakim czasie mo\u017Cna klei\u0107 p\u0142ytki?", a: "Po minimum 12 godzinach od na\u0142o\u017Cenia ostatniej warstwy uszczelniaj\u0105cej." }
    ],
    seoDescription: "Zaprawa uszczelniaj\u0105ca Atlas Woder D 5 kg to dwusk\u0142adnikowa izolacja do stref mokrych pod p\u0142ytkami. Je\u015Bli szukasz elastycznej zaprawy uszczelniaj\u0105cej do \u0142azienki, prysznica lub tarasu, Atlas Woder D zapewnia szczeln\u0105 pow\u0142ok\u0119 i bezpieczne klejenie ok\u0142adzin ceramicznych."
  },
  {
    id: "p172",
    slug: "wylewka-cementowa-atlas-zw310-25kg",
    name: "Wylewka cementowa Atlas ZW 310 25 kg",
    categorySlug: "wylewki-cementowe",
    brand: "Atlas",
    sku: "ATL-ZW310-25",
    unit: "worek 25 kg",
    shortDescription: "Cementowa masa wylewkowa do wykonywania podk\u0142ad\xF3w pod\u0142ogowych krycia i ogrzewania pod\u0142ogowego.",
    description: "Atlas ZW 310 to sucha mieszanka cementowa do przygotowywania wylewek pod\u0142ogowych. Stosowana jako warstwa podk\u0142adowa pod p\u0142ytki, parkiet, panele i wyk\u0142adziny w pomieszczeniach wewn\u0119trznych. Mo\u017Ce by\u0107 stosowana na ogrzewaniu pod\u0142ogowym. Wytrzyma\u0142o\u015B\u0107 po stwardnieniu pozwala na obci\u0105\u017Cenia typowe dla zastosowa\u0144 mieszkalnych i komercyjnych.",
    application: "Do wykonywania podk\u0142ad\xF3w pod\u0142ogowych wewn\u0105trz budynk\xF3w. Grubo\u015B\u0107 warstwy: 25\u201380 mm. Pod\u0142o\u017Ce oddzieli\u0107 od \u015Bcian foli\u0105 lub ta\u015Bm\u0105 obwodow\u0105. Na ogrzewaniu pod\u0142ogowym instalacj\u0119 uruchamia\u0107 po pe\u0142nym wyschni\u0119ciu podk\u0142adu.",
    technicalSpec: [
      { label: "Typ", value: "Cementowa wylewka podk\u0142adowa" },
      { label: "Opakowanie", value: "25 kg" },
      { label: "Grubo\u015B\u0107 warstwy", value: "25\u201380 mm" },
      { label: "Ogrzewanie pod\u0142ogowe", value: "Tak" },
      { label: "Zastosowanie", value: "Wewn\u0119trzne" }
    ],
    images: [],
    tags: ["wylewka", "atlas", "cementowa", "podk\u0142ad pod\u0142ogowy", "ogrzewanie pod\u0142ogowe", "posadzka"],
    related: ["p170", "p166", "p162"],
    advantages: [
      "Kompatybilno\u015B\u0107 z ogrzewaniem pod\u0142ogowym.",
      "Szeroki zakres grubo\u015Bci 25\u201380 mm dla r\xF3\u017Cnych potrzeb.",
      "Prosta technologia: wymiesza\u0107 z wod\u0105 i wyla\u0107."
    ],
    warnings: [
      "Wylewka musi by\u0107 oddzielona od \u015Bcian ta\u015Bm\u0105 dylatacyjn\u0105.",
      "Pe\u0142ne wyschni\u0119cie przed u\u0142o\u017Ceniem ok\u0142adziny mo\u017Ce trwa\u0107 kilka tygodni zale\u017Cnie od grubo\u015Bci."
    ],
    faq: [
      { q: "Czy wylewk\u0119 ZW 310 mo\u017Cna stosowa\u0107 pod ogrzewanie pod\u0142ogowe?", a: "Tak, produkt jest przystosowany do uk\u0142adania na instalacjach ogrzewania pod\u0142ogowego." },
      { q: "Jak grub\u0105 wylewk\u0119 mo\u017Cna wykona\u0107 z Atlas ZW 310?", a: "Wylewk\u0119 o grubo\u015Bci od 25 do 80 mm w jednym etapie." }
    ],
    seoDescription: "Wylewka cementowa Atlas ZW 310 25 kg to materia\u0142 do podk\u0142ad\xF3w pod\u0142ogowych w budownictwie mieszkalnym i komercyjnym. Je\u015Bli szukasz wylewki cementowej pod p\u0142ytki lub ogrzewanie pod\u0142ogowe, Atlas ZW 310 zapewnia odpowiedni\u0105 wytrzyma\u0142o\u015B\u0107 i kompatybilno\u015B\u0107 z systemami grzewczymi."
  },
  {
    id: "p173",
    slug: "klej-do-plytek-elastyczny-mapei-keraflex-25kg",
    name: "Klej do p\u0142ytek Mapei Keraflex 25 kg",
    categorySlug: "kleje-plytek",
    brand: "Mapei",
    sku: "MAP-KERAFLEX-25",
    unit: "worek 25 kg",
    shortDescription: "Elastyczny klej cementowy C2TE do du\u017Cych format\xF3w p\u0142ytek na pod\u0142o\u017Cach wewn\u0119trznych i zewn\u0119trznych.",
    description: "Mapei Keraflex to klej cementowy klasy C2TE przeznaczony do przyklejania du\u017Cych i ci\u0119\u017Ckich p\u0142ytek ceramicznych i gresowych na pod\u0142o\u017Cach wewn\u0119trznych i zewn\u0119trznych. Klasa TE oznacza wyd\u0142u\u017Cony czas otwarty, zmniejszony po\u015Blizg i elastyczno\u015B\u0107 \u2014 cechy niezb\u0119dne przy monta\u017Cu format\xF3w powy\u017Cej 30\xD730 cm. Produkt szeroko stosowany na pod\u0142ogach i \u015Bcianach, tarasach i balkonach.",
    application: "Do p\u0142ytek ceramicznych, gresu porcelanowego i kamienia naturalnego na pod\u0142o\u017Cach mineralnych. Zar\xF3wno do pod\u0142\xF3g, jak i \u015Bcian. Na zewn\u0105trz \u0142\u0105czy\u0107 z fug\u0105 i uszczelnieniem odpornym na mr\xF3z. Nie stosowa\u0107 na elastycznych pod\u0142o\u017Cach drewnianych bez warstwy wyr\xF3wnuj\u0105cej.",
    technicalSpec: [
      { label: "Klasa", value: "C2TE" },
      { label: "Opakowanie", value: "25 kg" },
      { label: "Czas otwarty", value: "Wyd\u0142u\u017Cony (E)" },
      { label: "Elastyczno\u015B\u0107", value: "Tak (T)" },
      { label: "Zastosowanie", value: "Wewn\u0119trzne i zewn\u0119trzne" }
    ],
    images: [],
    tags: ["klej do p\u0142ytek", "mapei", "keraflex", "c2te", "du\u017Ce formaty", "gres", "taras"],
    related: ["p162", "p152", "p163"],
    isFeatured: true,
    advantages: [
      "Wyd\u0142u\u017Cony czas otwarty u\u0142atwia uk\u0142adanie du\u017Cych i ci\u0119\u017Ckich p\u0142ytek.",
      "Zmniejszony po\u015Blizg (T) zapobiega osuwaniu si\u0119 p\u0142ytek na \u015Bcianach.",
      "Klasa C2 zapewnia wysok\u0105 przyczepno\u015B\u0107 do wymagaj\u0105cych pod\u0142o\u017Cy."
    ],
    warnings: [
      "Na tarasach stosowa\u0107 \u0142\u0105cznie z w\u0142a\u015Bciwym systemem uszczelniaj\u0105cym.",
      "Pod\u0142o\u017Ce musi by\u0107 no\u015Bne, stabilne i wolne od kurzu."
    ],
    faq: [
      { q: "Co oznacza klasa C2TE kleju do p\u0142ytek?", a: "C2 \u2014 ulepszony klej; T \u2014 zmniejszony po\u015Blizg; E \u2014 wyd\u0142u\u017Cony czas otwarty. \u0141\u0105cznie idealne dla du\u017Cych format\xF3w i pracy na \u015Bcianach." },
      { q: "Czy Mapei Keraflex nadaje si\u0119 na taras?", a: "Tak, do zastosowa\u0144 zewn\u0119trznych pod warunkiem w\u0142a\u015Bciwego uszczelnienia podk\u0142adu i spoin." }
    ],
    seoDescription: "Klej do p\u0142ytek Mapei Keraflex 25 kg klasy C2TE to elastyczny klej cementowy do du\u017Cych format\xF3w ceramiki i gresu. Je\u015Bli szukasz kleju do p\u0142ytek o wyd\u0142u\u017Conym czasie otwartym do pod\u0142\xF3g, \u015Bcian i taras\xF3w, Mapei Keraflex zapewnia bezpieczny monta\u017C nawet ci\u0119\u017Ckich ok\u0142adzin."
  },
  {
    id: "p174",
    slug: "fuga-mapei-ultracolor-plus-5mm-antracyt-2kg",
    name: "Fuga Mapei Ultracolor Plus 3\u201320 mm antracyt 2 kg",
    categorySlug: "fugi",
    brand: "Mapei",
    sku: "MAP-ULCOL-ANTR-2",
    unit: "opak. 2 kg",
    shortDescription: "Szybkoschn\u0105ca fuga cementowa do spoin 3\u201320 mm odporna na zabrudzenia i odbarwianie.",
    description: "Mapei Ultracolor Plus to zaawansowana fuga cementowa do szerokich spoin 3\u201320 mm. Formu\u0142a DropEffect chroni spoin\u0119 przed wnikaniem wody i zanieczyszcze\u0144, zmniejszaj\u0105c konieczno\u015B\u0107 intensywnego czyszczenia. Produkt nadaje si\u0119 do pomieszcze\u0144 mieszkalnych, us\u0142ugowych i zewn\u0119trznych, w tym do pod\u0142\xF3g w strefach intensywnego u\u017Cytkowania.",
    application: "Do fugowania spoin 3\u201320 mm w p\u0142ytkach ceramicznych, gresie i mozaikach. Do stosowania wewn\u0105trz i na zewn\u0105trz z wyj\u0105tkiem sta\u0142ego zanurzenia w wodzie. Temperatura aplikacji +5\xB0C do +35\xB0C.",
    technicalSpec: [
      { label: "Szeroko\u015B\u0107 spoiny", value: "3\u201320 mm" },
      { label: "Technologia", value: "DropEffect" },
      { label: "Kolor", value: "Antracyt" },
      { label: "Opakowanie", value: "2 kg" },
      { label: "Szybkoschn\u0105ca", value: "Tak" }
    ],
    images: [],
    tags: ["fuga", "mapei", "ultracolor", "spoina", "3-20 mm", "antracyt", "odporna na zabrudzenia"],
    related: ["p163", "p162", "p173"],
    advantages: [
      "Technologia DropEffect chroni spoin\u0119 przed wod\u0105 i zabrudzeniami.",
      "Szeroki zakres spoin 3\u201320 mm do p\u0142ytek pod\u0142ogowych i \u015Bciennych.",
      "Szybkoschn\u0105ca formu\u0142a przyspiesza odbi\xF3r pomieszczenia."
    ],
    warnings: [
      "Nie stosowa\u0107 do spoin w sta\u0142ym kontakcie z wod\u0105 bez dodatkowego uszczelnienia.",
      "Po aplikacji pozosta\u0142o\u015Bci z powierzchni p\u0142ytek usun\u0105\u0107 przed stwardnieniem."
    ],
    faq: [
      { q: "Co to jest technologia DropEffect?", a: "Formu\u0142a zmniejszaj\u0105ca nasi\u0105kliwo\u015B\u0107 spoiny \u2014 woda i zabrudzenia nie wnikaj\u0105 w struktur\u0119, lecz sp\u0142ywaj\u0105 z powierzchni, u\u0142atwiaj\u0105c utrzymanie czysto\u015Bci." },
      { q: "Czy Ultracolor Plus nadaje si\u0119 na taras?", a: "Tak, produkt jest dopuszczony do zastosowa\u0144 zewn\u0119trznych, z wyj\u0105tkiem sta\u0142ego zanurzenia w wodzie." }
    ],
    seoDescription: "Fuga Mapei Ultracolor Plus 3\u201320 mm antracyt 2 kg to szybkoschn\u0105ca fuga z technologi\u0105 DropEffect do szerokich spoin. Je\u015Bli szukasz fugi 3\u201320 mm do pod\u0142\xF3g i \u015Bcian ceramicznych odpornej na zabrudzenia, Mapei Ultracolor Plus zapewnia estetyczn\u0105 spoin\u0119 i \u0142atwe utrzymanie czysto\u015Bci."
  },
  {
    id: "p175",
    slug: "wiertarko-wkretarka-makita-dhp484-18v",
    name: "Wiertarko-wkr\u0119tarka Makita DHP484 18V",
    categorySlug: "wiertarko-wkretarki",
    brand: "Makita",
    sku: "MAK-DHP484-18V",
    unit: "szt.",
    shortDescription: "Akumulatorowa wiertarko-wkr\u0119tarka udarowa 18V do prac monta\u017Cowych i wiercenia w r\xF3\u017Cnych materia\u0142ach.",
    description: "Makita DHP484 to akumulatorowa wiertarko-wkr\u0119tarka udarowa 18V z bezszczotkowym silnikiem. Przeznaczona do wiercenia w drewnie, metalu i murze oraz wkr\u0119cania \u015Brub i wkr\u0119t\xF3w. Lekka konstrukcja i kompaktowe wymiary czyni\u0105 z niej wygodne narz\u0119dzie na budowie i przy pracach wyko\u0144czeniowych. Kompatybilna z systemem akumulator\xF3w Makita 18V LXT.",
    application: "Do wiercenia w drewnie, metalu, tworzywach sztucznych i murze. Wkr\u0119canie \u015Brub i wkr\u0119t\xF3w w r\xF3\u017Cnych materia\u0142ach. Praca na rusztowaniu, w instalacjach i przy wyko\u0144czeniach.",
    technicalSpec: [
      { label: "Napi\u0119cie", value: "18V (akumulator Li-Ion)" },
      { label: "Silnik", value: "Bezszczotkowy" },
      { label: "Udar", value: "Tak" },
      { label: "Zakres momentu", value: "13 poziom\xF3w + wiercenie" },
      { label: "System", value: "Makita 18V LXT" }
    ],
    images: [],
    tags: ["wiertarko-wkr\u0119tarka", "makita", "dhp484", "18v", "akumulatorowa", "udarowa", "bezszczotkowa"],
    related: ["p154", "p155", "p156"],
    isFeatured: true,
    advantages: [
      "Bezszczotkowy silnik wyd\u0142u\u017Ca \u017Cywotno\u015B\u0107 narz\u0119dzia i zwi\u0119ksza wydajno\u015B\u0107.",
      "Kompatybilno\u015B\u0107 z szerok\u0105 gam\u0105 akumulator\xF3w Makita 18V LXT.",
      "Kompaktowa i lekka \u2014 wygodna przy pracy na budowie."
    ],
    warnings: [
      "Nie stosowa\u0107 bez odpowiednich wierte\u0142 lub grot\xF3w dopasowanych do obrabianego materia\u0142u.",
      "Akumulator \u0142adowa\u0107 i przechowywa\u0107 zgodnie z zaleceniami producenta."
    ],
    faq: [
      { q: "Czy Makita DHP484 jest kompatybilna z innymi narz\u0119dziami Makita 18V?", a: "Tak, akumulatory systemu LXT 18V pasuj\u0105 do szerokiej gamy narz\u0119dzi Makita, co u\u0142atwia zarz\u0105dzanie parkiem narz\u0119dzi na budowie." },
      { q: "Czy wiertarko-wkr\u0119tarka udarowa nadaje si\u0119 do \u015Bciany?", a: "Tak, w trybie udarowym mo\u017Cna wierci\u0107 w murze i betonie, cho\u0107 do twardego betonu lepiej wybra\u0107 obrotowo-udarowe m\u0142otowiertarki." }
    ],
    seoDescription: "Wiertarko-wkr\u0119tarka Makita DHP484 18V to akumulatorowe narz\u0119dzie udarowe do prac monta\u017Cowych i wiercenia na budowie. Je\u015Bli szukasz wydajnej wiertarko-wkr\u0119tarki 18V do wyko\u0144cze\u0144 i prac konstruktywnych, model Makita DHP484 z silnikiem bezszczotkowym to sprawdzony wyb\xF3r dla wykonawc\xF3w."
  },
  {
    id: "p176",
    slug: "poziomica-aluminiowa-stanley-fatmax-100cm",
    name: "Poziomica aluminiowa Stanley FatMax 100 cm",
    categorySlug: "poziomice-laty",
    brand: "Stanley",
    sku: "STA-FM-POZ-100",
    unit: "szt.",
    shortDescription: "Precyzyjna poziomica aluminiowa 100 cm do sprawdzania poziom\xF3w i pion\xF3w na budowie.",
    description: "Stanley FatMax 100 cm to poziomica z profilu aluminiowego z wzmocnieniem w postaci grubo\u015Bciennego korpusu, przeznaczona do sprawdzania poziom\xF3w i pion\xF3w podczas prac murarskich, tynkarskich, monta\u017Cowych i wyko\u0144czeniowych. Trzy libelle (poziom, pion, 45\xB0) oraz czytelna skala u\u0142atwiaj\u0105 szybk\u0105 ocen\u0119 ustawienia element\xF3w. Model popularny na placu budowy dzi\u0119ki trwa\u0142o\u015Bci i ergonomii.",
    application: "Do sprawdzania poziom\xF3w i pion\xF3w przy murowaniu, tynkowaniu, monta\u017Cu okien, drzwi, szafek oraz innych pracach wyko\u0144czeniowych wymagaj\u0105cych precyzji.",
    technicalSpec: [
      { label: "D\u0142ugo\u015B\u0107", value: "100 cm" },
      { label: "Materia\u0142", value: "Aluminium wzmocnione" },
      { label: "Liczba libelli", value: "3 (poziom, pion, 45\xB0)" },
      { label: "Dok\u0142adno\u015B\u0107", value: "0,5 mm/m" }
    ],
    images: [],
    tags: ["poziomica", "stanley", "fatmax", "100 cm", "aluminium", "libella", "narz\u0119dzie budowlane"],
    related: ["p175", "p156", "p154"],
    advantages: [
      "Wzmocniony profil aluminiowy odporny na uszkodzenia mechaniczne.",
      "Trzy libelle do pe\u0142nej kontroli poziomowania na budowie.",
      "Popularna i sprawdzona w warunkach codziennej pracy wykonawcy."
    ],
    warnings: [
      "Chroni\u0107 libelle przed uderzeniami \u2014 uszkodzenie p\u0119cherzyka mo\u017Ce wp\u0142yn\u0105\u0107 na dok\u0142adno\u015B\u0107.",
      "Regularne sprawdzanie kalibracji przy precyzyjnych zastosowaniach."
    ],
    faq: [
      { q: "Do czego s\u0142u\u017Cy poziomica 100 cm?", a: "Do sprawdzania poziom\xF3w i pion\xF3w przy murowaniu, tynkowaniu, monta\u017Cu stolarki i element\xF3w wyko\u0144czeniowych." },
      { q: "Co to znaczy dok\u0142adno\u015B\u0107 0,5 mm/m?", a: "Oznacza, \u017Ce maksymalne odchylenie od pionu lub poziomu na 1 m d\u0142ugo\u015Bci nie przekracza 0,5 mm." }
    ],
    seoDescription: "Poziomica aluminiowa Stanley FatMax 100 cm to trwa\u0142e narz\u0119dzie do kontroli poziom\xF3w i pion\xF3w na budowie. Je\u015Bli szukasz precyzyjnej poziomicy 100 cm do prac murarskich, tynkarskich i monta\u017Cowych, Stanley FatMax zapewnia dok\u0142adno\u015B\u0107, wytrzyma\u0142o\u015B\u0107 i ergonomi\u0119 pracy."
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllBrands,
  getFeaturedProducts,
  getNewProducts,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
  products
});
