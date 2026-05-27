export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  brand: string;
  sku: string;
  unit: string;
  description: string;
  shortDescription: string;
  application: string;
  technicalSpec: { label: string; value: string }[];
  images: string[];
  tags: string[];
  related: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "p001", slug: "tynk-silikonowy-weber-pas-dr1",
    name: "Tynk silikonowy weber.pas DR1 15kg",
    categorySlug: "tynki-silikonowe", brand: "Weber", sku: "WEB-SIL-DR1-15", unit: "worek 15kg",
    shortDescription: "Gotowy tynk elewacyjny silikonowy o strukturze drapany/kornik, odporny na zabrudzenia.",
    description: "Weber.pas DR1 to gotowy do użycia tynk silikonowy do elewacji. Charakteryzuje się wysoką odpornością na zabrudzenia dzięki właściwościom hydrofobowym oraz elastycznością zapewniającą odporność na mikropęknięcia. Doskonały do systemów ociepleniowych ETICS. Dostępny w szerokiej gamie kolorów z mieszalnika.",
    application: "Elewacje budynków mieszkalnych i komercyjnych. Stosowany jako warstwa wykończeniowa w systemach ociepleń ETICS na styropianie i wełnie mineralnej. Powierzchnie tynkarskie wewnętrzne i zewnętrzne.",
    technicalSpec: [
      { label: "Zużycie", value: "2,5–3,5 kg/m² (ziarno 1,5mm)" },
      { label: "Granulacja", value: "1,5 mm lub 2,0 mm" },
      { label: "Temperatura aplikacji", value: "+5°C do +25°C" },
      { label: "Czas schnięcia", value: "24–48 h (w zależności od warunków)" },
      { label: "Wydajność opakowania", value: "ok. 5–6 m² (ziarno 1,5mm)" },
      { label: "Klasa reakcji na ogień", value: "A2-s1, d0" },
    ],
    images: ["/images/products/p001-tynk_2.png"],
    tags: ["tynk silikonowy", "elewacja", "etics", "weber", "kornik", "drapany"],
    related: ["p002", "p003", "p010"],
    isFeatured: true,
  },
  {
    id: "p002", slug: "klej-do-styropianu-atlas-stopter-k-20",
    name: "Klej do styropianu Atlas Stopter K-20 25kg",
    categorySlug: "kleje-styropian", brand: "Atlas", sku: "ATL-K20-25", unit: "worek 25kg",
    shortDescription: "Zaprawa klejąca do przyklejania styropianu i wykonywania warstwy zbrojonej w systemach ETICS.",
    description: "Atlas Stopter K-20 to specjalistyczna zaprawa klejąca przeznaczona do przyklejania płyt styropianowych i wełny mineralnej oraz do wykonywania warstwy zbrojonej siatką w systemach ETICS. Produkt charakteryzuje się doskonałą przyczepnością i elastycznością, zapewniając trwałość systemu ociepleniowego przez wiele lat.",
    application: "Przyklejanie płyt styropianowych i wełny mineralnej do podłoży mineralnych (beton, cegła, tynk cementowo-wapienny). Wykonywanie warstwy zbrojącej w systemach ETICS.",
    technicalSpec: [
      { label: "Zużycie (klejenie)", value: "4–6 kg/m²" },
      { label: "Zużycie (warstwa zbrojona)", value: "4–5 kg/m²" },
      { label: "Czas schnięcia", value: "min. 3 dni przed dalszymi pracami" },
      { label: "Temperatura aplikacji", value: "+5°C do +25°C" },
      { label: "Mrozoodporność", value: "Tak, po pełnym wiązaniu" },
    ],
    images: ["/images/products/p002-klej_2.png"],
    tags: ["klej styropian", "etics", "atlas", "warstwa zbrojona", "ocieplenie"],
    related: ["p001", "p003", "p004"],
    isFeatured: true,
  },
  {
    id: "p003", slug: "styropian-fasadowy-eps-100-swisspor",
    name: "Styropian fasadowy EPS 100-038 Swisspor 10cm 0,5m³",
    categorySlug: "styropian-fasadowy-eps", brand: "Swisspor", sku: "SWS-EPS100-10", unit: "paczka 0,5m³",
    shortDescription: "Styropian fasadowy EPS 100 o grubości 10cm do izolacji termicznej elewacji.",
    description: "Styropian fasadowy Swisspor EPS 100-038 to produkt do izolacji termicznej elewacji budynków w systemach ociepleń ETICS. Wyróżnia się doskonałym współczynnikiem przewodzenia ciepła λ=0,038 W/(m·K), co zapewnia skuteczną ochronę przed utratą ciepła. Stabilność wymiarowa i odporność mechaniczna gwarantują trwałość izolacji.",
    application: "Izolacja termiczna elewacji budynków w systemach ETICS. Ocieplanie ścian zewnętrznych budynków mieszkalnych, biurowych i przemysłowych.",
    technicalSpec: [
      { label: "Lambda (λ)", value: "0,038 W/(m·K)" },
      { label: "Grubość", value: "10 cm (dostępne: 5-25 cm)" },
      { label: "Wymiar płyty", value: "100 x 50 cm" },
      { label: "Klasa reakcji na ogień", value: "E" },
      { label: "Naprężenie ściskające", value: "CS(10)100 kPa" },
      { label: "Wytrzymałość na zginanie", value: "BS100 kPa" },
    ],
    images: ["/images/products/p003-styropian_2.png"],
    tags: ["styropian", "eps 100", "fasada", "ocieplenie", "swisspor", "etics"],
    related: ["p002", "p004", "p005"],
    isFeatured: true,
  },
  {
    id: "p004", slug: "welna-fasadowa-rockwool-frontrock-max-e",
    name: "Wełna fasadowa Rockwool Frontrock MAX E 15cm m²",
    categorySlug: "welna-fasadowa", brand: "Rockwool", sku: "RCK-FRE-15", unit: "m²",
    shortDescription: "Wełna mineralna do izolacji fasad w systemach ETICS. Klasa reakcji na ogień A1.",
    description: "Rockwool Frontrock MAX E to wełna mineralna skalna do izolacji elewacji w systemach ETICS. Płyty charakteryzują się dwuwarstwową budową – twardszą stroną zewnętrzną (E) i miększą wewnętrzną (M), co ułatwia montaż i zapewnia doskonałe przyleganie kleju. Klasa reakcji na ogień A1 gwarantuje najwyższy poziom bezpieczeństwa pożarowego.",
    application: "Izolacja termiczna i akustyczna elewacji budynków w systemach ETICS. Szczególnie zalecana dla budynków o podwyższonych wymaganiach w zakresie ochrony przeciwpożarowej.",
    technicalSpec: [
      { label: "Lambda (λ)", value: "0,036 W/(m·K)" },
      { label: "Grubość", value: "15 cm (dostępne: 8-25 cm)" },
      { label: "Wymiar płyty", value: "100 x 60 cm" },
      { label: "Klasa reakcji na ogień", value: "A1 (niepalna)" },
      { label: "Naprężenie ściskające", value: "≥ 15 kPa" },
      { label: "Współczynnik oporu dyfuzji", value: "μ = 1" },
    ],
    images: ["/images/products/p004-welna_2.png"],
    tags: ["wełna fasadowa", "rockwool", "frontrock", "etics", "a1", "izolacja"],
    related: ["p002", "p003", "p005"],
    isFeatured: true,
  },
  {
    id: "p005", slug: "grunt-gruntujacy-ceresit-ct-17",
    name: "Grunt głęboko penetrujący Ceresit CT 17 10L",
    categorySlug: "grunty-pod-tynki", brand: "Ceresit", sku: "CRS-CT17-10", unit: "kanister 10L",
    shortDescription: "Grunt głęboko penetrujący pod tynki mineralne, akrylowe, silikonowe i silikatowe.",
    description: "Ceresit CT 17 to grunt głęboko penetrujący przeznaczony do gruntowania chłonnych podłoży przed aplikacją tynków organicznych i mineralnych. Doskonale wyrównuje chłonność podłoża i poprawia przyczepność tynku. Produkt zawiera specjalny polimer zapewniający głęboką penetrację w strukturę podłoża.",
    application: "Gruntowanie podłoży przed aplikacją tynków elewacyjnych: akrylowych, silikonowych, silikatowych i mineralnych. Stosować na beton, tynki cementowo-wapienne, beton komórkowy, cegłę.",
    technicalSpec: [
      { label: "Zużycie", value: "100–200 ml/m²" },
      { label: "Wydajność 10L", value: "50–100 m²" },
      { label: "Czas schnięcia", value: "ok. 4–6 h" },
      { label: "Baza", value: "Wodna dyspersja polimerów" },
      { label: "Temperatura aplikacji", value: "+5°C do +25°C" },
    ],
    images: ["/images/products/p005-grunt_2.png"],
    tags: ["grunt", "ceresit", "ct17", "penetrujący", "podłoże", "tynk"],
    related: ["p001", "p002", "p006"],
  },
  {
    id: "p006", slug: "gladz-gipsowa-knauf-multifinish-20kg",
    name: "Gładź gipsowa Knauf Multifinish 20kg",
    categorySlug: "gladzie-proszek", brand: "Knauf", sku: "KNF-MUL-20", unit: "worek 20kg",
    shortDescription: "Gładź gipsowa do wewnętrznych prac szpachlarskich, doskonale biała.",
    description: "Knauf Multifinish to wysokiej jakości gładź gipsowa do wykonywania cienkich warstw wygładzających na tynkach gipsowych, cementowych i gipsowo-kartonowych. Produkt gwarantuje doskonale gładką, białą powierzchnię, gotową do malowania lub tapetowania.",
    application: "Wygładzanie i szpachlowanie powierzchni wewnętrznych: ścian i sufitów. Wypełnianie nierówności na tynkach gipsowych, cementowych i płytach GK.",
    technicalSpec: [
      { label: "Zużycie", value: "1,2–1,8 kg/m²/mm" },
      { label: "Grubość warstwy", value: "0,5–3 mm" },
      { label: "Czas otwarty", value: "ok. 45 min" },
      { label: "Czas schnięcia", value: "3–5 h" },
      { label: "Spoiwo", value: "Gips" },
    ],
    images: ["/images/products/p006-gladz_2.png"],
    tags: ["gładź gipsowa", "knauf", "multifinish", "szpachlowanie", "wykończenie"],
    related: ["p007", "p008", "p005"],
  },
  {
    id: "p007", slug: "hydroizolacja-bitumiczna-ceresit-cr-65",
    name: "Hydroizolacja mineralna Ceresit CR 65 25kg",
    categorySlug: "hydroizolacje-mineralne", brand: "Ceresit", sku: "CRS-CR65-25", unit: "worek 25kg",
    shortDescription: "Sztywna uszczelniająca zaprawa mineralna do hydroizolacji fundamentów i piwnic.",
    description: "Ceresit CR 65 to mineralna, sztywna zaprawa uszczelniająca do wykonywania hydroizolacji podziemnych części budynków. Zapewnia skuteczną ochronę przed wodą pod ciśnieniem, solami i agresywną wodą gruntową. Stosowana na ścianach fundamentowych, w piwnicach, zbiornikach na wodę i oczyszczalniach.",
    application: "Uszczelnianie fundamentów, ścian piwnic, zbiorników na wodę, basenów, oczyszczalni ścieków. Ochrona przed wodą pod ciśnieniem hydrostatycznym.",
    technicalSpec: [
      { label: "Zużycie", value: "2–4 kg/m² (na 2 warstwy)" },
      { label: "Ciśnienie wody", value: "do 1,5 bar (z pozytywnej strony)" },
      { label: "Grubość warstwy", value: "min. 2 mm (2 warstwy)" },
      { label: "Czas schnięcia", value: "24–48 h" },
      { label: "Klasa wodoodporności", value: "W8" },
    ],
    images: ["/images/products/p007-hydroizolacja_2.png"],
    tags: ["hydroizolacja", "ceresit", "cr65", "fundament", "piwnica", "uszczelnienie"],
    related: ["p005", "p008", "p003"],
  },
  {
    id: "p008", slug: "farba-elewacyjna-caparol-silikoncolor-10l",
    name: "Farba elewacyjna silikonowa Caparol SiliconColor 10L",
    categorySlug: "farby-elaw-silikonowe", brand: "Caparol", sku: "CAP-SIL-10", unit: "wiadro 10L",
    shortDescription: "Silikonowa farba elewacyjna z zabezpieczeniem przed algami i grzybami.",
    description: "Caparol SiliconColor to wysokiej jakości silikonowa farba elewacyjna o doskonałych właściwościach odpychania wody i brudu. Dzięki zawartości żywic silikonowych zapewnia długotrwałą ochronę elewacji przed działaniem czynników atmosferycznych, algami i grzybami. Dostępna w szerokiej gamie kolorów.",
    application: "Malowanie nowych i renowacja starych elewacji budynków. Doskonała na tynki mineralne, cementowe, akrylowe i silikonowe. Stosować na zewnątrz.",
    technicalSpec: [
      { label: "Zużycie", value: "100–150 ml/m² (jedna warstwa)" },
      { label: "Wydajność 10L", value: "60–100 m²" },
      { label: "Czas schnięcia (dotyk)", value: "ok. 30 min" },
      { label: "Czas przeschnięcia", value: "ok. 4 h (ponowne malowanie)" },
      { label: "Odporność na algii i grzyby", value: "Tak" },
      { label: "Klasa paroprzepuszczalności", value: "sd ≤ 0,01 m" },
    ],
    images: ["/images/products/p008-farba_2.png"],
    tags: ["farba elewacyjna", "silikonowa", "caparol", "ochrona", "algi", "elewacja"],
    related: ["p001", "p005", "p009"],
    isFeatured: true,
  },
  {
    id: "p009", slug: "piana-montazowa-hilti-cf-812-825ml",
    name: "Piana montażowa pistoletowa Hilti CF 812 825ml",
    categorySlug: "piany-pistoletowe", brand: "Hilti", sku: "HLT-CF812-825", unit: "pistolet 825ml",
    shortDescription: "Jednoskładnikowa piana poliuretanowa pistoletowa do uszczelniania i montażu.",
    description: "Hilti CF 812 to profesjonalna, jednoskładnikowa piana poliuretanowa do zastosowań pistoletowych. Charakteryzuje się doskonałą przyczepnością do większości materiałów budowlanych, wysoką elastycznością i odpornością na temperaturę. Idealna do uszczelniania i wypełniania szczelin montażowych okien i drzwi.",
    application: "Mocowanie i uszczelnianie okien, drzwi i ościeżnic. Wypełnianie otworów i szczelin. Izolacja termiczna i akustyczna. Montaż profilów i oblistwowań.",
    technicalSpec: [
      { label: "Objętość naczynia", value: "825 ml" },
      { label: "Wydajność", value: "ok. 70 L (po ekspansji)" },
      { label: "Czas schnięcia (powierzchniowe)", value: "ok. 10 min" },
      { label: "Czas pełnego utwardzenia", value: "ok. 4 h" },
      { label: "Temperatura aplikacji", value: "od -10°C do +35°C" },
    ],
    images: ["/images/products/p009-piana_2.png"],
    tags: ["piana montażowa", "hilti", "pistoletowa", "okna", "drzwi", "uszczelnienie"],
    related: ["p010", "p006"],
  },
  {
    id: "p010", slug: "siatka-elewacyjna-vertex-r131",
    name: "Siatka elewacyjna Vertex R131 160g 1x50m",
    categorySlug: "akcesoria-izolacji", brand: "Vertex", sku: "VTX-R131-50", unit: "rolka 50mb",
    shortDescription: "Siatka zbrojąca do systemów ociepleń ETICS, 160g/m², oka 4x4mm.",
    description: "Vertex R131 to siatka z włókna szklanego pokryta alkalioodporną powłoką, stosowana jako zbrojenie warstwy kleju w systemach ociepleń ETICS. Oka 4x4mm i masa 160g/m² zapewniają optymalną wytrzymałość mechaniczną i odporność na spękania.",
    application: "Zbrojenie warstwy kleju w systemach ociepleń ETICS na styropianie i wełnie mineralnej. Wzmacnianie naroży i miejsc szczególnie narażonych na uszkodzenia mechaniczne.",
    technicalSpec: [
      { label: "Masa powierzchniowa", value: "160 g/m²" },
      { label: "Wymiar oka", value: "4 x 4 mm" },
      { label: "Szerokość rolki", value: "1 m" },
      { label: "Długość rolki", value: "50 m" },
      { label: "Wytrzymałość na rozciąganie (wzdłuż)", value: "≥ 40 kN/m" },
      { label: "Odporność na ługi", value: "Tak (AR)" },
    ],
    images: ["/images/products/p010-siatka_2.png"],
    tags: ["siatka elewacyjna", "vertex", "etics", "zbrojenie", "włókno szklane"],
    related: ["p002", "p003", "p004"],
  },
];

export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getProductsByCategory = (slug: string) => products.filter(p => p.categorySlug === slug);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug) || null;
export const getRelatedProducts = (slugs: string[]) => products.filter(p => slugs.includes(p.id));
