export interface Category {
  id: string;
  slug: string;
  name: string;
  icon?: string;
  description?: string;
  metaTitle?: string;
  metaDesc?: string;
  children?: Category[];
}

export const categories: Category[] = [
  {
    id: "chemia",
    slug: "chemia-budowlana",
    name: "Chemia budowlana",
    icon: "flask",
    description: "Kompletna oferta chemii budowlanej: tynki, kleje, gipsy, grunty, zaprawy i więcej.",
    metaTitle: "Chemia budowlana Lublin | Kleje, tynki, zaprawy | Media Bud",
    metaDesc: "Szeroki wybór chemii budowlanej w hurtowni Media Bud w Lublinie. Oferujemy tynki, kleje, grunty, gipsy i zaprawy. Profesjonalne doradztwo i konkurencyjne ceny.",
    children: [
      {
        id: "tynki", slug: "tynki", name: "Tynki", icon: "layers",
        children: [
          {
            id: "tynki-elewacyjne", slug: "tynki-elewacyjne", name: "Tynki elewacyjne",
            children: [
              { id: "tynki-silikatowe", slug: "tynki-silikatowe", name: "Tynki elewacyjne silikatowe" },
              { id: "tynki-silikonowe", slug: "tynki-silikonowe", name: "Tynki elewacyjne silikonowe" },
              { id: "tynki-silikonowo-silikatowe", slug: "tynki-silikonowo-silikatowe", name: "Tynki elewacyjne silikonowo-silikatowe" },
              { id: "tynki-akrylowe", slug: "tynki-akrylowe", name: "Tynki elewacyjne akrylowe" },
              { id: "tynki-ozdobne", slug: "tynki-ozdobne", name: "Tynki elewacyjne ozdobne" },
              { id: "tynki-mineralne", slug: "tynki-mineralne", name: "Tynki elewacyjne mineralne" },
              { id: "tynki-mozaikowe", slug: "tynki-mozaikowe", name: "Tynki mozaikowe" },
            ]
          },
          { id: "tynki-cementowo-wapienne", slug: "tynki-cementowo-wapienne", name: "Tynki cementowo-wapienne" },
          { id: "tynki-gipsowe", slug: "tynki-gipsowe", name: "Tynki gipsowe" },
          { id: "tynki-wapienne", slug: "tynki-wapienne", name: "Tynki wapienne" },
          { id: "tynki-specjalne", slug: "tynki-specjalne", name: "Tynki specjalne" },
          { id: "kruszywa-tynki", slug: "kruszywa-tynki", name: "Kruszywa do tynków mozaikowych" },
          { id: "dodatki-tynki", slug: "dodatki-tynki", name: "Dodatki do tynków" },
        ]
      },
      {
        id: "kleje", slug: "kleje", name: "Kleje", icon: "droplets",
        children: [
          { id: "kleje-montazowe", slug: "kleje-montazowe", name: "Kleje montażowe" },
          { id: "kleje-glazura", slug: "kleje-glazura", name: "Kleje do glazury" },
          { id: "kleje-drewno", slug: "kleje-drewno", name: "Kleje do drewna" },
          { id: "kleje-styropian", slug: "kleje-styropian", name: "Kleje do styropianu i styroduru" },
          { id: "kleje-welna", slug: "kleje-welna", name: "Kleje do wełen" },
          { id: "kleje-gkb", slug: "kleje-gkb", name: "Kleje do gips karton" },
          { id: "kleje-tapety", slug: "kleje-tapety", name: "Kleje do tapet" },
          { id: "kleje-pozostale", slug: "kleje-pozostale", name: "Kleje pozostałe" },
        ]
      },
      {
        id: "gipsy-gladzie", slug: "gipsy-gladzie", name: "Gipsy i gładzie", icon: "square",
        children: [
          { id: "gladzie-proszek", slug: "gladzie-proszek", name: "Gładzie gipsowe w proszku" },
          { id: "gipsy-szpachlowe", slug: "gipsy-szpachlowe", name: "Gipsy szpachlowe" },
          { id: "gladzie-gotowe", slug: "gladzie-gotowe", name: "Gładzie masy gotowe" },
          { id: "kleje-gipsowe", slug: "kleje-gipsowe", name: "Kleje gipsowe" },
          { id: "gipsy-budowlane", slug: "gipsy-budowlane", name: "Gipsy budowlane" },
          { id: "masy-szpachlowe", slug: "masy-szpachlowe", name: "Masy szpachlowe gotowe" },
          { id: "gipsy-wapienne", slug: "gipsy-wapienne", name: "Gipsy wapienne" },
        ]
      },
      {
        id: "grunty", slug: "grunty", name: "Grunty", icon: "layers",
        children: [
          { id: "grunty-uniwersalne", slug: "grunty-uniwersalne", name: "Grunty uniwersalne" },
          { id: "masy-bitumiczne", slug: "masy-bitumiczne", name: "Masy bitumiczne gruntujące" },
          { id: "grunty-specjalistyczne", slug: "grunty-specjalistyczne", name: "Grunty specjalistyczne" },
          { id: "grunty-posadzki", slug: "grunty-posadzki", name: "Grunty do posadzek" },
          { id: "grunty-pod-tynki", slug: "grunty-pod-tynki", name: "Grunty pod tynki" },
          { id: "grunty-pod-farby", slug: "grunty-pod-farby", name: "Grunty pod farby" },
        ]
      },
      {
        id: "piany", slug: "piany-montazowe", name: "Piany montażowe",
        children: [
          { id: "piany-pistoletowe", slug: "piany-pistoletowe", name: "Piany montażowe pistoletowe" },
          { id: "piany-wezyk", slug: "piany-wezyk", name: "Piany montażowe wężykowe" },
          { id: "czysciki", slug: "czysciki-pian", name: "Czyściki do pian montażowych" },
        ]
      },
      {
        id: "uszczelniacze", slug: "uszczelniacze-silikony", name: "Uszczelniacze i silikony",
        children: [
          { id: "silikony-sanitarne", slug: "silikony-sanitarne", name: "Silikony sanitarne" },
          { id: "silikony-uniwersalne", slug: "silikony-uniwersalne", name: "Silikony uniwersalne" },
          { id: "silikony-wysokotemp", slug: "silikony-wysokotemp", name: "Silikony wysokotemperaturowe" },
          { id: "silikony-dekarskie", slug: "silikony-dekarskie", name: "Silikony dekarskie" },
          { id: "silikony-szklarskie", slug: "silikony-szklarskie", name: "Silikony szklarskie" },
          { id: "uszcz-poliuretanowe", slug: "uszcz-poliuretanowe", name: "Uszczelniacze poliuretanowe" },
          { id: "uszcz-dekarskie", slug: "uszcz-dekarskie", name: "Uszczelniacze dekarskie" },
          { id: "uszcz-akrylowe", slug: "uszcz-akrylowe", name: "Uszczelniacze akrylowe" },
        ]
      },
      {
        id: "zaprawy", slug: "zaprawy", name: "Zaprawy",
        children: [
          { id: "zaprawy-specjalistyczne", slug: "zaprawy-specjalistyczne", name: "Zaprawy specjalistyczne" },
          { id: "zaprawy-naprawcze", slug: "zaprawy-naprawcze", name: "Zaprawy naprawcze" },
          { id: "zaprawy-uszczelniajace", slug: "zaprawy-uszczelniajace", name: "Zaprawy uszczelniające" },
          { id: "zaprawy-posadzkowe", slug: "zaprawy-posadzkowe", name: "Zaprawy posadzkowe masy samopoziomujące" },
          { id: "zaprawy-murarskie", slug: "zaprawy-murarskie", name: "Zaprawy murarskie ogólnego zastosowania" },
          { id: "zaprawy-montazowe", slug: "zaprawy-montazowe", name: "Zaprawy montażowe" },
          { id: "zaprawy-tynkarskie", slug: "zaprawy-tynkarskie", name: "Zaprawy tynkarskie" },
          { id: "jastrych", slug: "zaprawy-jastrych", name: "Zaprawy posadzkowe jastrych" },
          { id: "wylewki", slug: "wylewki-betonowe", name: "Wylewki betonowe" },
        ]
      },
      { id: "spoiny", slug: "spoiny", name: "Spoiny" },
      { id: "powloki-epoksydowe", slug: "powloki-epoksydowe", name: "Powłoki epoksydowe" },
      { id: "kotwy-chemiczne", slug: "kotwy-chemiczne", name: "Kotwy chemiczne" },
      { id: "srodki-grzybobojcze", slug: "srodki-grzybobojcze", name: "Środki grzybobójcze" },
      { id: "srodki-czyszczace", slug: "srodki-czyszczace", name: "Środki czyszcząco-pielęgnacyjne" },
      { id: "dodatki-zaprawy", slug: "dodatki-zaprawy", name: "Dodatki do zapraw i betonu" },
    ]
  },
  {
    id: "dachy",
    slug: "dachy",
    name: "Dachy",
    icon: "home",
    description: "Materiały dachowe, okna dachowe, rynny i systemy rynnowe.",
    metaTitle: "Materiały dachowe Lublin | Pokrycia, rynny, okna | Media Bud",
    metaDesc: "Kompleksowa oferta materiałów dachowych w hurtowni Media Bud Lublin. Dachówki, papy, rynny, okna dachowe. Doradztwo i transport.",
    children: [
      {
        id: "pokrycia-dachowe", slug: "pokrycia-dachowe", name: "Pokrycia dachowe",
        children: [
          { id: "dachowki-ceramiczne", slug: "dachowki-ceramiczne", name: "Dachówki ceramiczne" },
          { id: "dachowki-betonowe", slug: "dachowki-betonowe", name: "Dachówki betonowe" },
          { id: "pokrycia-blacha", slug: "pokrycia-blacha", name: "Pokrycia dachowe z blachy" },
          { id: "gonty-bitumiczne", slug: "gonty-bitumiczne", name: "Gonty bitumiczne" },
          { id: "papy", slug: "papy-dachowe", name: "Papy" },
          { id: "podbitki", slug: "podbitki-dachowe", name: "Podbitki dachowe" },
        ]
      },
      {
        id: "okna-dachowe", slug: "okna-dachowe", name: "Okna dachowe i akcesoria",
        children: [
          { id: "okna-dachowe-std", slug: "okna-dachowe-std", name: "Okna dachowe" },
          { id: "okna-wylazowe", slug: "okna-wylazowe", name: "Okna wyłazowe" },
          { id: "balkony-dachowe", slug: "balkony-dachowe", name: "Balkony dachowe" },
          { id: "swietliki", slug: "swietliki-dachowe", name: "Świetliki dachowe" },
          { id: "rolety-wewn", slug: "rolety-wewnetrzne", name: "Rolety wewnętrzne" },
          { id: "rolety-zewn", slug: "rolety-zewnetrzne", name: "Rolety zewnętrzne" },
        ]
      },
      {
        id: "rynny", slug: "rynny", name: "Rynny",
        children: [
          { id: "rynny-blacha", slug: "rynny-blacha", name: "Systemy rynnowe z blachy powlekanej" },
          { id: "rynny-pvc", slug: "rynny-pvc", name: "Systemy rynnowe PVC" },
          { id: "rynny-ocynkowane", slug: "rynny-ocynkowane", name: "Systemy rynnowe ocynkowane" },
          { id: "akcesoria-rynny", slug: "akcesoria-rynny", name: "Akcesoria do systemów rynnowych" },
        ]
      },
      { id: "zamocowania-dachowe", slug: "zamocowania-dachowe", name: "Zamocowania dachowe" },
      { id: "komunikacja-dachowa", slug: "komunikacja-dachowa", name: "Komunikacja dachowa" },
      { id: "dachy-zielone", slug: "dachy-zielone", name: "Dachy zielone" },
      { id: "zabezpieczenia-sniegu", slug: "zabezpieczenia-sniegu", name: "Zabezpieczenia przeciwśniegowe" },
    ]
  },
  {
    id: "farby",
    slug: "farby-rozpuszczalniki",
    name: "Farby i rozpuszczalniki",
    icon: "paintbrush",
    description: "Szeroki wybór farb wewnętrznych, elewacyjnych, do drewna i metalu oraz rozpuszczalników.",
    metaTitle: "Farby elewacyjne Lublin | Farby wewnętrzne, do drewna | Media Bud",
    metaDesc: "Duży wybór farb w hurtowni Media Bud Lublin. Farby elewacyjne silikonowe, wewnętrzne, do drewna i metalu. Profesjonalne doradztwo kolorystyczne.",
    children: [
      {
        id: "farby-wewnetrzne", slug: "farby-wewnetrzne", name: "Farby wewnętrzne",
        children: [
          { id: "farby-biale", slug: "farby-biale", name: "Farby wewnętrzne białe" },
          { id: "farby-kolorowe", slug: "farby-kolorowe", name: "Farby wewnętrzne kolorowe" },
        ]
      },
      {
        id: "farby-elewacyjne", slug: "farby-elewacyjne", name: "Farby elewacyjne",
        children: [
          { id: "farby-elaw-silikonowe", slug: "farby-elaw-silikonowe", name: "Farby elewacyjne silikonowe" },
          { id: "farby-elaw-emulsyjne", slug: "farby-elaw-emulsyjne", name: "Farby elewacyjne emulsyjne" },
          { id: "farby-elaw-silikatowo-akrylowe", slug: "farby-elaw-silikatowo-akrylowe", name: "Farby elewacyjne silikatowo-akrylowe" },
          { id: "farby-elaw-silikatowo-silikonowe", slug: "farby-elaw-silikatowo-silikonowe", name: "Farby elewacyjne silikatowo-silikonowe" },
          { id: "farby-elaw-akrylowe", slug: "farby-elaw-akrylowe", name: "Farby elewacyjne akrylowe" },
          { id: "farby-elaw-silikatowe", slug: "farby-elaw-silikatowe", name: "Farby elewacyjne silikatowe" },
        ]
      },
      {
        id: "farby-drewno", slug: "farby-drewno", name: "Farby do drewna",
        children: [
          { id: "lakiery-drewno", slug: "lakiery-drewno", name: "Lakiery do drewna" },
          { id: "lakierobejce", slug: "lakierobejce", name: "Lakierobejce" },
          { id: "impregnaty", slug: "impregnaty-drewno", name: "Impregnaty" },
          { id: "oleje-drewno", slug: "oleje-drewno", name: "Oleje" },
        ]
      },
      {
        id: "farby-metal", slug: "farby-metal", name: "Farby do metalu",
        children: [
          { id: "emalie-chlorokauczukowe", slug: "emalie-chlorokauczukowe", name: "Emalie chlorokauczukowe" },
          { id: "emalie-ftalowe", slug: "emalie-ftalowe", name: "Emalie ftalowe" },
          { id: "emalie-poliuretanowe", slug: "emalie-poliuretanowe", name: "Emalie poliuretanowe" },
          { id: "emalie-akrylowe", slug: "emalie-akrylowe", name: "Emalie akrylowe" },
        ]
      },
      { id: "bazy-koloranty", slug: "bazy-koloranty", name: "Bazy i koloranty" },
      { id: "farby-specjalistyczne", slug: "farby-specjalistyczne", name: "Farby specjalistyczne" },
      { id: "rozpuszczalniki", slug: "rozpuszczalniki", name: "Rozpuszczalniki" },
    ]
  },
  {
    id: "izolacje",
    slug: "izolacje",
    name: "Izolacje",
    icon: "shield",
    description: "Kompleksowa oferta materiałów izolacyjnych: styropian, wełna mineralna, hydroizolacje, folie.",
    metaTitle: "Materiały izolacyjne Lublin | Styropian, wełna, hydroizolacje | Media Bud",
    metaDesc: "Kompleksowa oferta materiałów izolacyjnych w hurtowni Media Bud. Styropiany fasadowe, wełny, hydroizolacje i folie. Doradztwo techniczne i transport na terenie Lublina.",
    children: [
      {
        id: "styropiany", slug: "styropiany", name: "Styropiany",
        children: [
          { id: "styropian-fasadowy", slug: "styropian-fasadowy-eps", name: "Styropiany fasadowe EPS" },
          { id: "styropian-dach", slug: "styropian-dach-podloga", name: "Styropian dach/podłoga EPS" },
          { id: "styropian-akustyczny", slug: "styropian-akustyczny", name: "Styropiany akustyczne" },
          { id: "styropian-fundamenty", slug: "styropian-fundamenty", name: "Styropiany do fundamentów" },
        ]
      },
      { id: "plyty-xps", slug: "plyty-xps", name: "Płyty XPS" },
      {
        id: "welny", slug: "welny", name: "Wełny",
        children: [
          { id: "welna-sucha-zabudowa", slug: "welna-sucha-zabudowa", name: "Wełny do suchej zabudowy i ścian działowych" },
          { id: "welna-fasadowa", slug: "welna-fasadowa", name: "Wełny fasadowe" },
          { id: "welna-stropy", slug: "welna-stropy", name: "Wełny do stropów i podłóg" },
          { id: "welna-dachy-plaskie", slug: "welna-dachy-plaskie", name: "Wełny do dachów płaskich" },
          { id: "welna-poddasza", slug: "welna-poddasza", name: "Wełny do poddaszy" },
          { id: "welna-akustyczna", slug: "welna-akustyczna", name: "Wełny budowlane do izolacji akustycznych" },
          { id: "welna-kominkowa", slug: "welna-kominkowa", name: "Wełny kominkowe" },
        ]
      },
      {
        id: "hydroizolacje", slug: "hydroizolacje", name: "Hydroizolacje",
        children: [
          { id: "papy-hydroizolacyjne", slug: "papy-hydroizolacyjne", name: "Papy hydroizolacyjne" },
          { id: "hydroizolacje-bitumiczne", slug: "hydroizolacje-bitumiczne", name: "Hydroizolacje bitumiczne" },
          { id: "tasmy-uszczelniajace", slug: "tasmy-uszczelniajace", name: "Taśmy uszczelniające do hydroizolacji" },
          { id: "membrany-dachowe", slug: "membrany-dachowe", name: "Membrany dachowe" },
          { id: "hydroizolacje-mineralne", slug: "hydroizolacje-mineralne", name: "Hydroizolacje mineralne" },
          { id: "folie-w-plynie", slug: "folie-w-plynie", name: "Folie w płynie" },
          { id: "masy-uszczelniajace", slug: "masy-uszczelniajace", name: "Masy uszczelniające" },
        ]
      },
      {
        id: "folie", slug: "folie", name: "Folie",
        children: [
          { id: "folie-paroprzepuszczalne", slug: "folie-paroprzepuszczalne", name: "Folie paroprzepuszczalne" },
          { id: "folie-paroizolacyjne", slug: "folie-paroizolacyjne", name: "Folie paroizolacyjne" },
          { id: "folie-fundamentowe", slug: "folie-fundamentowe", name: "Folie fundamentowe" },
          { id: "folie-budowlane", slug: "folie-budowlane", name: "Folie budowlane" },
        ]
      },
      { id: "akcesoria-izolacji", slug: "akcesoria-izolacji", name: "Akcesoria do izolacji" },
    ]
  },
  {
    id: "narzedzia",
    slug: "narzedzia-mocowania",
    name: "Narzędzia i mocowania",
    icon: "wrench",
    description: "Narzędzia ręczne, elektryczne, pomiarowe i elementy mocujące dla profesjonalistów.",
    metaTitle: "Narzędzia budowlane Lublin | Elektronarzędzia, mocowania | Media Bud",
    metaDesc: "Szeroki wybór narzędzi budowlanych i elementów mocujących w hurtowni Media Bud Lublin. Narzędzia ręczne, elektronarzędzia, kołki, wkręty i śruby.",
    children: [
      {
        id: "elementy-mocujace", slug: "elementy-mocujace", name: "Elementy mocujące uniwersalne",
        children: [
          { id: "kolki-wkrety", slug: "kolki-wkrety-uniwersalne", name: "Kołki i wkręty uniwersalne" },
          { id: "kolki-beton", slug: "kolki-beton", name: "Kołki i wkręty do betonu" },
          { id: "kolki-rozpozowe", slug: "kolki-rozpozowe", name: "Kołki rozporowe" },
          { id: "wkrety-drewno", slug: "wkrety-drewno", name: "Wkręty i łączniki do drewna" },
          { id: "sruby-podkladki", slug: "sruby-podkladki", name: "Śruby i podkładki do śrub" },
          { id: "gwozdzie", slug: "gwozdzie-budowlane", name: "Gwoździe budowlane" },
          { id: "nity", slug: "nity-zrywalne", name: "Nity zrywalne" },
        ]
      },
      {
        id: "akcesoria-malarskie", slug: "akcesoria-malarskie", name: "Akcesoria malarskie i tynkarskie",
        children: [
          { id: "tasmy-malarskie", slug: "tasmy-malarskie", name: "Taśmy malarskie" },
          { id: "wiadra-pojemniki", slug: "wiadra-pojemniki", name: "Wiadra i pojemniki budowlane" },
          { id: "mieszadla", slug: "mieszadla", name: "Mieszadła" },
        ]
      },
      {
        id: "narzedzia-reczne", slug: "narzedzia-reczne", name: "Narzędzia ręczne",
        children: [
          { id: "opalarki", slug: "opalarki-palniki", name: "Opalarki i palniki" },
          { id: "klucze", slug: "klucze-narzedzia", name: "Klucze" },
          { id: "wkretaki", slug: "wkretaki", name: "Wkrętaki" },
          { id: "szczypce", slug: "szczypce", name: "Szczypce" },
        ]
      },
      {
        id: "narzedzia-budowlane", slug: "narzedzia-budowlane", name: "Narzędzia budowlane",
        children: [
          { id: "pace", slug: "pace-budowlane", name: "Pace" },
          { id: "szpachle", slug: "szpachle", name: "Szpachle i szpachelki" },
          { id: "kielnie", slug: "kielnie", name: "Kielnie" },
          { id: "mlotki", slug: "mlotki-budowlane", name: "Młotki budowlane" },
          { id: "pistolety", slug: "pistolety-budowlane", name: "Pistolety" },
        ]
      },
      {
        id: "narzedzia-malarskie", slug: "narzedzia-malarskie", name: "Narzędzia malarskie",
        children: [
          { id: "walki", slug: "walki-malarskie", name: "Wałki malarskie" },
          { id: "pedzle", slug: "pedzle", name: "Pędzle" },
          { id: "zestawy-malarskie", slug: "zestawy-malarskie", name: "Zestawy malarskie" },
        ]
      },
      {
        id: "elektronarzedzia", slug: "elektronarzedzia", name: "Elektronarzędzia",
        children: [
          { id: "wiertarko-wkretarki", slug: "wiertarko-wkretarki", name: "Wiertarko-wkrętarki" },
          { id: "szlifierki", slug: "szlifierki", name: "Szlifierki" },
          { id: "pilarki", slug: "pilarki", name: "Piły i pilarki" },
          { id: "wiertarki-mloty", slug: "wiertarki-mloty", name: "Wiertarki i młoty udarowe" },
        ]
      },
      {
        id: "narzedzia-pomiarowe", slug: "narzedzia-pomiarowe", name: "Narzędzia pomiarowe",
        children: [
          { id: "poziomnice", slug: "poziomnice", name: "Poziomnice" },
          { id: "miary", slug: "miary", name: "Miary" },
          { id: "katowniki", slug: "katowniki", name: "Kątowniki i kątomierze" },
        ]
      },
    ]
  },
  {
    id: "pozostale",
    slug: "pozostale",
    name: "Pozostałe",
    icon: "package",
    description: "Galanteria betonowa, stolarka otworowa, nawadnianie, BHP i inne materiały budowlane.",
    metaTitle: "Materiały budowlane pozostałe Lublin | Kostka, stolarka | Media Bud",
    metaDesc: "Uzupełnij swoje zamówienie o galanterię betonową, stolarkę otworową i artykuły BHP w hurtowni Media Bud w Lublinie.",
    children: [
      {
        id: "galanteria-betonowa", slug: "galanteria-betonowa", name: "Galanteria betonowa",
        children: [
          { id: "kostka-brukowa", slug: "kostka-brukowa", name: "Kostka brukowa" },
          { id: "palisady", slug: "palisady-krawezniki", name: "Palisady, krawężniki i obrzeża" },
          { id: "plyty-chodnikowe", slug: "plyty-chodnikowe", name: "Płyty chodnikowe i tarasowe" },
          { id: "elementy-ogrodzenia", slug: "elementy-ogrodzenia", name: "Elementy ogrodzenia" },
          { id: "architektura-ogrodowa", slug: "architektura-ogrodowa", name: "Architektura ogrodowa betonowa" },
        ]
      },
      { id: "nawadnianie", slug: "nawadnianie", name: "Nawadnianie" },
      {
        id: "stolarka", slug: "stolarka-otworowa", name: "Stolarka otworowa",
        children: [
          { id: "okna", slug: "okna-akcesoria", name: "Okna i akcesoria do okien" },
          { id: "drzwi", slug: "drzwi-akcesoria", name: "Drzwi i akcesoria do drzwi" },
        ]
      },
      {
        id: "bhp", slug: "bhp", name: "BHP",
        children: [
          { id: "odziez-ochronna", slug: "odziez-ochronna", name: "Odzież ochronna" },
          { id: "drabiny", slug: "drabiny", name: "Drabiny" },
          { id: "ochrona-wysokosc", slug: "ochrona-wysokosc", name: "Ochrona do prac na wysokościach" },
        ]
      },
    ]
  },
  {
    id: "plytki",
    slug: "plytki",
    name: "Płytki",
    icon: "grid",
    description: "Płytki ceramiczne, dekoracyjne, listwy i akcesoria montażowe.",
    metaTitle: "Płytki ceramiczne Lublin | Ścienne, podłogowe, elewacyjne | Media Bud",
    metaDesc: "Szeroki wybór płytek ceramicznych w hurtowni Media Bud Lublin. Płytki ścienne, podłogowe, tarasowe i elewacyjne. Kleje, spoiny i akcesoria montażowe.",
    children: [
      {
        id: "plytki-ceramiczne", slug: "plytki-ceramiczne", name: "Płytki ceramiczne",
        children: [
          { id: "plytki-scienne", slug: "plytki-scienne", name: "Płytki ścienne" },
          { id: "plytki-scienno-podlogowe", slug: "plytki-scienno-podlogowe", name: "Płytki ścienno-podłogowe" },
          { id: "plytki-tarasowe", slug: "plytki-tarasowe", name: "Płytki tarasowe" },
          { id: "plytki-elewacyjne", slug: "plytki-elewacyjne", name: "Płytki elewacyjne" },
          { id: "stopnice", slug: "stopnice", name: "Stopnice" },
          { id: "cokoly", slug: "cokoly", name: "Cokoły" },
        ]
      },
      {
        id: "plytki-dekoracyjne", slug: "plytki-dekoracyjne", name: "Płytki dekoracyjne",
        children: [
          { id: "lamele", slug: "lamele-dekoracyjne", name: "Lamele dekoracyjne" },
          { id: "panele-dekory", slug: "panele-dekory", name: "Panele i dekory ścienne" },
          { id: "mozaiki", slug: "mozaiki", name: "Mozaiki" },
        ]
      },
      { id: "listwy-akcesoria", slug: "listwy-akcesoria", name: "Listwy i akcesoria" },
    ]
  },
  {
    id: "stropy-sciany",
    slug: "stropy-sciany",
    name: "Stropy i ściany",
    icon: "columns",
    description: "Materiały konstrukcyjne: bloczki, pustaki, belki stropowe, cegły, cement i stal zbrojeniowa.",
    metaTitle: "Materiały konstrukcyjne Lublin | Bloczki, belki, cement | Media Bud",
    metaDesc: "Kompleksowa oferta materiałów konstrukcyjnych w hurtowni Media Bud Lublin. Bloczki, belki stropowe, cegły, cement i stal zbrojeniowa.",
    children: [
      {
        id: "mat-konstrukcyjne", slug: "materialy-konstrukcyjne", name: "Materiały konstrukcyjne",
        children: [
          {
            id: "bloczki", slug: "bloczki", name: "Bloczki",
            children: [
              { id: "bloczki-beton-komorkowy", slug: "bloczki-beton-komorkowy", name: "Bloczki beton komórkowy" },
              { id: "bloczki-silikatowe", slug: "bloczki-silikatowe", name: "Bloczki silikatowe" },
              { id: "bloczki-betonowe", slug: "bloczki-betonowe", name: "Bloczki betonowe i fundamentowe" },
            ]
          },
          {
            id: "pustaki", slug: "pustaki", name: "Pustaki",
            children: [
              { id: "pustaki-ceramiczne", slug: "pustaki-ceramiczne", name: "Pustaki ceramiczne" },
              { id: "pustaki-betonowe", slug: "pustaki-betonowe", name: "Pustaki betonowe" },
              { id: "pustaki-wentylacyjne", slug: "pustaki-wentylacyjne", name: "Pustaki wentylacyjne i dymne" },
            ]
          },
          { id: "belki-betonowe", slug: "belki-stropowe-betonowe", name: "Belki stropowe betonowe" },
          { id: "belki-ceramiczne", slug: "belki-stropowe-ceramiczne", name: "Belki stropowe ceramiczne" },
          { id: "nadproza", slug: "nadproza", name: "Nadproża" },
          { id: "cegly", slug: "cegly", name: "Cegły" },
          { id: "stal-zbrojeniowa", slug: "stal-zbrojeniowa", name: "Stal zbrojeniowa" },
          { id: "cement", slug: "cement", name: "Cement" },
          { id: "wapno", slug: "wapno", name: "Wapno" },
        ]
      },
      { id: "panele-scianne", slug: "panele-scienne-tapety", name: "Panele ścienne i tapety" },
      {
        id: "schody", slug: "schody-akcesoria", name: "Schody i akcesoria strychowe",
        children: [
          { id: "schody-strychowe", slug: "schody-strychowe", name: "Schody strychowe" },
        ]
      },
      {
        id: "kominy", slug: "systemy-kominowe", name: "Systemy kominowe",
        children: [
          { id: "kominy-ceramiczne", slug: "kominy-ceramiczne", name: "Kominy ceramiczne" },
          { id: "kominy-stalowe", slug: "kominy-stalowe", name: "Kominy stalowe" },
          { id: "akcesoria-kominy", slug: "akcesoria-kominy", name: "Akcesoria do kominów" },
        ]
      },
    ]
  },
  {
    id: "sucha-zabudowa",
    slug: "sucha-zabudowa",
    name: "Sucha zabudowa",
    icon: "layout",
    description: "Płyty gipsowo-kartonowe, profile, wieszaki, mocowania i akcesoria do suchej zabudowy.",
    metaTitle: "Sucha zabudowa Lublin | Płyty GK, profile, akcesoria | Media Bud",
    metaDesc: "Kompleksowa oferta suchej zabudowy w Media Bud Lublin. Płyty gipsowo-kartonowe, profile do suchej zabudowy, wieszaki i mocowania. Doradztwo techniczne.",
    children: [
      {
        id: "plyty-sucha", slug: "plyty-sucha-zabudowa", name: "Płyty",
        children: [
          { id: "plyty-cementowe", slug: "plyty-cementowe", name: "Płyty cementowe" },
          { id: "plyty-gk", slug: "plyty-gipsowo-kartonowe", name: "Płyty gipsowo-kartonowe" },
          { id: "plyty-gw", slug: "plyty-gipsowo-wloknowe", name: "Płyty gipsowo-włóknowe" },
          { id: "plyty-cw", slug: "plyty-cementowo-wloknowe", name: "Płyty cementowo-włóknowe" },
          { id: "plyty-specjalistyczne", slug: "plyty-specjalistyczne-gk", name: "Płyty specjalistyczne" },
        ]
      },
      {
        id: "profile-sucha", slug: "profile-sucha-zabudowa", name: "Profile do suchej zabudowy",
        children: [
          { id: "profile-sciana", slug: "profile-sciana", name: "Profile do suchej zabudowy – konstrukcja ścienna" },
          { id: "profile-oscieznicowe", slug: "profile-oscieznicowe", name: "Profile ościeżnicowe" },
          { id: "profile-sufit", slug: "profile-sufit", name: "Profile do suchej zabudowy – konstrukcja sufitowa" },
        ]
      },
      {
        id: "wieszaki-sucha", slug: "wieszaki-sucha-zabudowa", name: "Wieszaki do suchej zabudowy",
        children: [
          { id: "wieszaki-noniusz", slug: "wieszaki-noniusz", name: "Wieszaki do suchej zabudowy z noniuszem" },
          { id: "wieszaki-es", slug: "wieszaki-es", name: "Wieszaki ES" },
          { id: "wieszaki-poddasze", slug: "wieszaki-poddasze", name: "Wieszaki do suchej zabudowy poddaszy" },
          { id: "wieszaki-bezposrednie", slug: "wieszaki-bezposrednie", name: "Wieszaki bezpośrednie" },
        ]
      },
      {
        id: "narozniki-listwy", slug: "narozniki-listwy", name: "Narożniki i listwy",
        children: [
          { id: "narozniki-alu", slug: "narozniki-aluminiowe", name: "Narożniki aluminiowe" },
          { id: "narozniki-pvc", slug: "narozniki-pvc", name: "Narożniki PVC" },
          { id: "narozniki-tynki-mokre", slug: "narozniki-tynki-mokre", name: "Narożniki do tynków mokrych" },
          { id: "listwy-podtynkowe", slug: "listwy-podtynkowe", name: "Listwy podtynkowe" },
        ]
      },
      { id: "tasmy-sucha", slug: "tasmy-sucha-zabudowa", name: "Taśmy do suchej zabudowy" },
      { id: "rewizje", slug: "rewizje", name: "Rewizje" },
    ]
  },
  {
    id: "sufity",
    slug: "sufity-podwieszane",
    name: "Sufity podwieszane",
    icon: "minus-square",
    description: "Płyty sufitowe, profile nośne, mocowania i akcesoria do sufitów podwieszanych.",
    metaTitle: "Sufity podwieszane Lublin | Płyty sufitowe, profile | Media Bud",
    metaDesc: "Kompleksowa oferta sufitów podwieszanych w hurtowni Media Bud Lublin. Płyty sufitowe, profile nośne i mocowania. Profesjonalne doradztwo techniczne.",
    children: [
      {
        id: "plyty-sufitowe", slug: "plyty-sufitowe", name: "Płyty sufitowe",
        children: [
          { id: "sufity-rastrowe", slug: "sufity-rastrowe", name: "Sufity rastrowe" },
          { id: "plyty-welna-mineralna", slug: "plyty-welna-mineralna", name: "Płyty sufitowe z wełny mineralnej" },
          { id: "plyty-welna-szklana", slug: "plyty-welna-szklana", name: "Płyty sufitowe z wełny szklanej" },
          { id: "plyty-drewniane", slug: "plyty-drewniane-sufitowe", name: "Płyty sufitowe drewniane" },
          { id: "plyty-metalowe", slug: "plyty-metalowe-sufitowe", name: "Płyty sufitowe metalowe" },
          { id: "plyty-higieniczne", slug: "plyty-higieniczne", name: "Płyty sufitowe higieniczne" },
          { id: "plyty-gipsowe-suf", slug: "plyty-gipsowe-sufitowe", name: "Płyty sufitowe gipsowe" },
          { id: "plyty-listwowe", slug: "plyty-listwowe", name: "Płyty sufitowe listwowe" },
        ]
      },
      {
        id: "profile-sufity", slug: "profile-sufity-podwieszane", name: "Profile do sufitów podwieszanych",
        children: [
          { id: "profile-nosne", slug: "profile-nosne-glowne", name: "Profile nośne/główne" },
          { id: "profile-poprzeczne", slug: "profile-poprzeczne", name: "Profile poprzeczne" },
          { id: "profile-przysc", slug: "profile-przysc-sufity", name: "Profile przyścienne" },
          { id: "profile-specjalne-suf", slug: "profile-specjalne-suf", name: "Profile specjalne" },
        ]
      },
      {
        id: "mocowania-sufity", slug: "mocowania-sufity", name: "Mocowania do sufitów podwieszanych",
        children: [
          { id: "wieszaki-dwuhakowe", slug: "wieszaki-dwuhakowe", name: "Wieszaki dwuhakowe" },
          { id: "klipsy-mocujace", slug: "klipsy-mocujace-sufity", name: "Klipsy mocujące" },
          { id: "druty-hakiem", slug: "druty-hakiem", name: "Druty z hakiem" },
        ]
      },
    ]
  },
];

export const getCategoryBySlug = (slug: string): Category | null => {
  const findInTree = (cats: Category[]): Category | null => {
    for (const cat of cats) {
      if (cat.slug === slug) return cat;
      if (cat.children) {
        const found = findInTree(cat.children);
        if (found) return found;
      }
    }
    return null;
  };
  return findInTree(categories);
};

export const getParentCategory = (slug: string): Category | null => {
  const findParent = (cats: Category[], parent: Category | null): Category | null => {
    for (const cat of cats) {
      if (cat.slug === slug) return parent;
      if (cat.children) {
        const found = findParent(cat.children, cat);
        if (found !== undefined) return found;
      }
    }
    return undefined as unknown as Category | null;
  };
  return findParent(categories, null);
};

export const getBreadcrumbs = (slug: string): Category[] => {
  const path: Category[] = [];
  const findPath = (cats: Category[], target: string): boolean => {
    for (const cat of cats) {
      if (cat.slug === target) { path.push(cat); return true; }
      if (cat.children && findPath(cat.children, target)) {
        path.unshift(cat);
        return true;
      }
    }
    return false;
  };
  findPath(categories, slug);
  return path;
};
