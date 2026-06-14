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
              { id: "tynki-silikatowe", slug: "tynki-elewacyjne-silikonowo-silikatowe", name: "Tynki elewacyjne silikatowe" },
              { id: "tynki-silikonowe", slug: "tynki-elewacyjne-silikonowe", name: "Tynki elewacyjne silikonowe" },
              { id: "tynki-akrylowe", slug: "tynki-elewacyjne-akrylowe", name: "Tynki elewacyjne akrylowe" },
              { id: "tynki-ozdobne", slug: "tynki-elewacyjne-ozdobne", name: "Tynki elewacyjne ozdobne" },
              { id: "tynki-mineralne", slug: "tynki-elewacyjne-mineralne", name: "Tynki elewacyjne mineralne" },
              { id: "tynki-mozaikowe", slug: "tynki-mozaikowe", name: "Tynki mozaikowe" },
            ]
          },
          { id: "tynki-cementowo-wapienne", slug: "tynki-cementowo-wapienne", name: "Tynki cementowo-wapienne" },
          { id: "tynki-gipsowe", slug: "tynki-gipsowe", name: "Tynki gipsowe" },
          { id: "tynki-wapienne", slug: "tynki-wapienne", name: "Tynki wapienne" },
          { id: "tynki-specjalne", slug: "tynki-specjalne", name: "Tynki specjalne" },
        ]
      },
      {
        id: "kleje", slug: "kleje", name: "Kleje", icon: "droplets",
        children: [
          { id: "kleje-montazowe", slug: "kleje-montazowe", name: "Kleje montażowe" },
          { id: "kleje-glazura", slug: "kleje-do-glazury", name: "Kleje do glazury" },
          { id: "kleje-drewno", slug: "kleje-do-drewna", name: "Kleje do drewna" },
          { id: "kleje-styropian", slug: "kleje-do-styropianu-i-styroduru", name: "Kleje do styropianu i styroduru" },
          { id: "kleje-welna", slug: "kleje-do-welen", name: "Kleje do wełen" },
          { id: "kleje-gkb", slug: "kleje-do-gips-karton", name: "Kleje do gips karton" },
          { id: "kleje-tapety", slug: "kleje-tapety", name: "Kleje do tapet" },
          { id: "kleje-pozostale", slug: "kleje-pozostale", name: "Kleje pozostałe" },
        ]
      },
      {
        id: "gipsy-gladzie", slug: "gipsy-i-gladzie", name: "Gipsy i gładzie", icon: "square",
        children: [
          { id: "gladzie-proszek", slug: "gladzie-gipsowe-w-proszku", name: "Gładzie gipsowe w proszku" },
          { id: "gipsy-szpachlowe", slug: "gipsy-szpachlowe", name: "Gipsy szpachlowe" },
          { id: "gladzie-gotowe", slug: "gladzie-masy-gotowe", name: "Gładzie masy gotowe" },
          { id: "kleje-gipsowe", slug: "kleje-gipsowe", name: "Kleje gipsowe" },
          { id: "gipsy-budowlane", slug: "gipsy-budowlane", name: "Gipsy budowlane" },
          { id: "masy-szpachlowe", slug: "masy-szpachlowe-gotowe", name: "Masy szpachlowe gotowe" },
          { id: "gipsy-wapienne", slug: "gipsy-wapienne", name: "Gipsy wapienne" },
        ]
      },
      {
        id: "grunty", slug: "grunty", name: "Grunty", icon: "layers",
        children: [
          { id: "grunty-uniwersalne", slug: "grunty-uniwersalne", name: "Grunty uniwersalne" },
          { id: "masy-bitumiczne", slug: "masy-bitumiczne-gruntujace", name: "Masy bitumiczne gruntujące" },
          { id: "grunty-specjalistyczne", slug: "grunty-specjalistyczne", name: "Grunty specjalistyczne" },
          { id: "grunty-posadzki", slug: "grunty-do-posadzek", name: "Grunty do posadzek" },
          { id: "grunty-pod-tynki", slug: "grunty-pod-tynki", name: "Grunty pod tynki" },
          { id: "grunty-pod-farby", slug: "grunty-pod-farby", name: "Grunty pod farby" },
        ]
      },
      {
        id: "piany", slug: "piany-montazowe", name: "Piany montażowe",
        children: [
          { id: "piany-pistoletowe", slug: "piany-montazowe-pistoletowe", name: "Piany montażowe pistoletowe" },
          { id: "piany-wezyk", slug: "piany-montazowe-wezykowe", name: "Piany montażowe wężykowe" },
          { id: "czysciki", slug: "czysciki-do-pian-montazowych", name: "Czyściki do pian montażowych" },
        ]
      },
      {
        id: "uszczelniacze", slug: "uszczelniacze-i-silikony", name: "Uszczelniacze i silikony",
        children: [
          { id: "silikony-sanitarne", slug: "silikony-sanitarne", name: "Silikony sanitarne" },
          { id: "silikony-uniwersalne", slug: "silikony-uniwersalne", name: "Silikony uniwersalne" },
          { id: "silikony-wysokotemp", slug: "silikony-wysokotemperaturowe", name: "Silikony wysokotemperaturowe" },
          { id: "silikony-dekarskie", slug: "silikony-dekarskie", name: "Silikony dekarskie" },
          { id: "silikony-szklarskie", slug: "silikony-szklarskie", name: "Silikony szklarskie" },
          { id: "uszcz-poliuretanowe", slug: "uszczelniacze-poliuretanowe", name: "Uszczelniacze poliuretanowe" },
          { id: "uszcz-dekarskie", slug: "uszczelniacze-dekarskie", name: "Uszczelniacze dekarskie" },
        ]
      },
      {
        id: "zaprawy", slug: "zaprawy", name: "Zaprawy",
        children: [
          { id: "zaprawy-specjalistyczne", slug: "zaprawy-specjalistyczne", name: "Zaprawy specjalistyczne" },
          { id: "zaprawy-naprawcze", slug: "zaprawy-naprawcze", name: "Zaprawy naprawcze" },
          { id: "zaprawy-uszczelniajace", slug: "zaprawy-uszczelniajace", name: "Zaprawy uszczelniające" },
          { id: "zaprawy-posadzkowe", slug: "zaprawy-posadzkowe-masy-samopoziomujace", name: "Zaprawy posadzkowe masy samopoziomujące" },
          { id: "zaprawy-murarskie", slug: "zaprawy-murarskie-ogolnego-zastosowania", name: "Zaprawy murarskie ogólnego zastosowania" },
          { id: "zaprawy-montazowe", slug: "kotwy-montazowe", name: "Zaprawy montażowe" },
        ]
      },
      { id: "spoiny", slug: "spoiny", name: "Spoiny" },
      { id: "powloki-epoksydowe", slug: "powloki-epoksydowe", name: "Powłoki epoksydowe" },
      { id: "kotwy-chemiczne", slug: "kotwy-chemiczne", name: "Kotwy chemiczne" },
      { id: "srodki-grzybobojcze", slug: "srodki-grzybobojcze", name: "Środki grzybobójcze" },
      { id: "srodki-czyszczace", slug: "srodki-czyszczaco-pielegnacyjne", name: "Środki czyszcząco-pielęgnacyjne" },
      { id: "dodatki-zaprawy", slug: "dodatki-do-zapraw-i-betonu", name: "Dodatki do zapraw i betonu" },
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
          { id: "pokrycia-blacha", slug: "pokrycia-dachowe-z-blachy", name: "Pokrycia dachowe z blachy" },
          { id: "gonty-bitumiczne", slug: "gonty-bitumiczne", name: "Gonty bitumiczne" },
          { id: "papy", slug: "papy", name: "Papy" },
        ]
      },
      {
        id: "okna-dachowe", slug: "okna-dachowe", name: "Okna dachowe i akcesoria",
        children: [
          { id: "okna-wylazowe", slug: "okna-wylazowe", name: "Okna wyłazowe" },
          { id: "balkony-dachowe", slug: "balkony-dachowe", name: "Balkony dachowe" },
          { id: "rolety-wewn", slug: "rolety-wewnetrzne", name: "Rolety wewnętrzne" },
          { id: "rolety-zewn", slug: "rolety-zewnetrzne", name: "Rolety zewnętrzne" },
        ]
      },
      {
        id: "rynny", slug: "rynny", name: "Rynny",
        children: [
          { id: "rynny-blacha", slug: "systemy-rynnowe-z-blachy-powlekanej", name: "Systemy rynnowe z blachy powlekanej" },
          { id: "rynny-pvc", slug: "systemy-rynnowe-pvc", name: "Systemy rynnowe PVC" },
          { id: "rynny-ocynkowane", slug: "systemy-rynnowe-ocynkowane", name: "Systemy rynnowe ocynkowane" },
          { id: "akcesoria-rynny", slug: "akcesoria-do-systemow-rynnowych", name: "Akcesoria do systemów rynnowych" },
        ]
      },
      { id: "zamocowania-dachowe", slug: "zamocowania-dachowe", name: "Zamocowania dachowe" },
      { id: "komunikacja-dachowa", slug: "komunikacja-dachowa", name: "Komunikacja dachowa" },
      { id: "dachy-zielone", slug: "dachy-zielone", name: "Dachy zielone" },
      { id: "zabezpieczenia-sniegu", slug: "zabezpieczenia-przeciwsniegowe", name: "Zabezpieczenia przeciwśniegowe" },
    ]
  },
  {
    id: "farby",
    slug: "farby-i-rozpuszczalniki",
    name: "Farby i rozpuszczalniki",
    icon: "paintbrush",
    description: "Szeroki wybór farb wewnętrznych, elewacyjnych, do drewna i metalu oraz rozpuszczalników.",
    metaTitle: "Farby elewacyjne Lublin | Farby wewnętrzne, do drewna | Media Bud",
    metaDesc: "Duży wybór farb w hurtowni Media Bud Lublin. Farby elewacyjne silikonowe, wewnętrzne, do drewna i metalu. Profesjonalne doradztwo kolorystyczne.",
    children: [
      {
        id: "farby-wewnetrzne", slug: "farby-wewnetrzne", name: "Farby wewnętrzne",
        children: [
          { id: "farby-biale", slug: "farby-wewnetrzne-biale", name: "Farby wewnętrzne białe" },
          { id: "farby-kolorowe", slug: "farby-wewnetrzne-kolorowe", name: "Farby wewnętrzne kolorowe" },
        ]
      },
      {
        id: "farby-elewacyjne", slug: "farby-elewacyjne", name: "Farby elewacyjne",
        children: [
          { id: "farby-elaw-silikonowe", slug: "farby-elewacyjne-silikonowe", name: "Farby elewacyjne silikonowe" },
          { id: "farby-elaw-emulsyjne", slug: "farby-elewacyjne-emulsyjne", name: "Farby elewacyjne emulsyjne" },
          { id: "farby-elaw-silikatowo-akrylowe", slug: "farby-elewacyjne-akrylowe", name: "Farby elewacyjne silikatowo-akrylowe" },
          { id: "farby-elaw-silikatowe", slug: "farby-elewacyjne-silikatowe", name: "Farby elewacyjne silikatowe" },
        ]
      },
      {
        id: "farby-drewno", slug: "farby-do-drewna", name: "Farby do drewna",
        children: [
          { id: "lakiery-drewno", slug: "lakiery-do-drewna", name: "Lakiery do drewna" },
          { id: "lakierobejce", slug: "lakierobejce", name: "Lakierobejce" },
          { id: "impregnaty", slug: "impregnaty", name: "Impregnaty" },
          { id: "oleje-drewno", slug: "oleje", name: "Oleje" },
        ]
      },
      {
        id: "farby-metal", slug: "farby-do-metalu", name: "Farby do metalu",
        children: [
          { id: "emalie-chlorokauczukowe", slug: "emalie-chlorokauczukowe", name: "Emalie chlorokauczukowe" },
          { id: "emalie-ftalowe", slug: "emalie-ftalowe", name: "Emalie ftalowe" },
          { id: "emalie-poliuretanowe", slug: "emalie-poliuretanowe", name: "Emalie poliuretanowe" },
          { id: "emalie-akrylowe", slug: "emalie-akrylowe", name: "Emalie akrylowe" },
        ]
      },
      { id: "bazy-koloranty", slug: "bazy-i-koloranty", name: "Bazy i koloranty" },
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
          { id: "styropian-fasadowy", slug: "styropiany-fasadowe-eps", name: "Styropiany fasadowe EPS" },
          { id: "styropian-dach", slug: "styropian-dach-podloga-eps", name: "Styropian dach/podłoga EPS" },
          { id: "styropian-akustyczny", slug: "styropiany-akustyczne", name: "Styropiany akustyczne" },
          { id: "styropian-fundamenty", slug: "styropiany-do-fundamentow", name: "Styropiany do fundamentów" },
        ]
      },
      { id: "plyty-xps", slug: "plyty-xps", name: "Płyty XPS" },
      {
        id: "welny", slug: "welny", name: "Wełny",
        children: [
          { id: "welna-sucha-zabudowa", slug: "welny-do-suchej-zabudowy-i-scian-dzialowych", name: "Wełny do suchej zabudowy i ścian działowych" },
          { id: "welna-fasadowa", slug: "welny-fasadowe", name: "Wełny fasadowe" },
          { id: "welna-stropy", slug: "welny-do-stropow-i-podlog", name: "Wełny do stropów i podłóg" },
          { id: "welna-dachy-plaskie", slug: "welny-do-dachow-plaskich", name: "Wełny do dachów płaskich" },
          { id: "welna-poddasza", slug: "welny-do-poddaszy", name: "Wełny do poddaszy" },
          { id: "welna-fasady-niew", slug: "welny-do-izolacji-fasad-niewentylowanych", name: "Wełny do izolacji fasad niewentylowanych" },
          { id: "welna-fasady-went", slug: "welny-do-izolacji-fasad-wentylowanych", name: "Wełny do izolacji fasad wentylowanych" },
        ]
      },
      {
        id: "hydroizolacje", slug: "hydroizolacje", name: "Hydroizolacje",
        children: [
          { id: "papy-hydroizolacyjne", slug: "papy-hydroizolacyjne", name: "Papy hydroizolacyjne" },
          { id: "hydroizolacje-bitumiczne", slug: "hydroizolacje-bitumiczne", name: "Hydroizolacje bitumiczne" },
          { id: "tasmy-uszczelniajace", slug: "tasmy-uszczelniajace-do-hydroizolacji", name: "Taśmy uszczelniające do hydroizolacji" },
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
      { id: "akcesoria-izolacji", slug: "akcesoria-do-izolacji", name: "Akcesoria do izolacji" },
    ]
  },
  {
    id: "narzedzia",
    slug: "narzedzia-i-mocowania",
    name: "Narzędzia i mocowania",
    icon: "wrench",
    description: "Narzędzia ręczne, elektryczne, pomiarowe i elementy mocujące dla profesjonalistów.",
    metaTitle: "Narzędzia budowlane Lublin | Elektronarzędzia, mocowania | Media Bud",
    metaDesc: "Szeroki wybór narzędzi budowlanych i elementów mocujących w hurtowni Media Bud Lublin. Narzędzia ręczne, elektronarzędzia, kołki, wkręty i śruby.",
    children: [
      {
        id: "elementy-mocujace", slug: "elementy-mocujace-uniwersalne", name: "Elementy mocujące uniwersalne",
        children: [
          { id: "kolki-wkrety", slug: "kolki-i-wkrety-uniwersalne", name: "Kołki i wkręty uniwersalne" },
          { id: "kolki-rozpozowe", slug: "kolki-do-suchej-zabudowy", name: "Kołki rozporowe" },
          { id: "wkrety-drewno", slug: "wkrety-drewno", name: "Wkręty i łączniki do drewna" },
          { id: "sruby-podkladki", slug: "sruby-i-podkladki-do-srub", name: "Śruby i podkładki do śrub" },
          { id: "gwozdzie", slug: "gwozdzie-i-podkladki-dociskowe-do-pap", name: "Gwoździe budowlane" },
          { id: "nity", slug: "nity-zrywalne", name: "Nity zrywalne" },
        ]
      },
      {
        id: "akcesoria-malarskie", slug: "akcesoria-malarskie-i-tynkarskie", name: "Akcesoria malarskie i tynkarskie",
        children: [
          { id: "tasmy-malarskie", slug: "tasmy-malarskie", name: "Taśmy malarskie" },
          { id: "wiadra-pojemniki", slug: "wiadra-i-pojemniki-budowlane", name: "Wiadra i pojemniki budowlane" },
          { id: "mieszadla", slug: "mieszadla", name: "Mieszadła" },
        ]
      },
      {
        id: "narzedzia-reczne", slug: "narzedzia-reczne", name: "Narzędzia ręczne",
        children: [
          { id: "opalarki", slug: "opalarki-i-palniki", name: "Opalarki i palniki" },
          { id: "klucze", slug: "klucze", name: "Klucze" },
          { id: "wkretaki", slug: "wkretaki", name: "Wkrętaki" },
          { id: "szczypce", slug: "szczypce", name: "Szczypce" },
        ]
      },
      {
        id: "narzedzia-budowlane", slug: "narzedzia-budowlane", name: "Narzędzia budowlane",
        children: [
          { id: "pace", slug: "pace", name: "Pace" },
          { id: "szpachle", slug: "szpachle-i-szpachelki", name: "Szpachle i szpachelki" },
          { id: "kielnie", slug: "kielnie", name: "Kielnie" },
          { id: "mlotki", slug: "mlotki-budowlane", name: "Młotki budowlane" },
          { id: "pistolety", slug: "pistolety", name: "Pistolety" },
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
          { id: "pilarki", slug: "pily-i-pilarki", name: "Piły i pilarki" },
        ]
      },
      {
        id: "narzedzia-pomiarowe", slug: "narzedzia-pomiarowe", name: "Narzędzia pomiarowe",
        children: [
          { id: "poziomnice", slug: "poziomnice", name: "Poziomnice" },
          { id: "miary", slug: "miary", name: "Miary" },
          { id: "katowniki", slug: "katowniki-i-katomierze", name: "Kątowniki i kątomierze" },
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
          { id: "palisady", slug: "palisady-krawezniki-i-obrzeza", name: "Palisady, krawężniki i obrzeża" },
          { id: "plyty-chodnikowe", slug: "plyty-chodnikowe-i-tarasowe", name: "Płyty chodnikowe i tarasowe" },
          { id: "elementy-ogrodzenia", slug: "elementy-ogrodzenia", name: "Elementy ogrodzenia" },
          { id: "architektura-ogrodowa", slug: "architektura-ogrodowa", name: "Architektura ogrodowa betonowa" },
        ]
      },
      { id: "nawadnianie", slug: "nawadnianie", name: "Nawadnianie" },
      {
        id: "stolarka", slug: "stolarka-otworowa", name: "Stolarka otworowa",
        children: [
          { id: "okna", slug: "okna-dachowe-i-akcesoria", name: "Okna i akcesoria do okien" },
          { id: "drzwi", slug: "drzwi-i-akcesoria-do-drzwi", name: "Drzwi i akcesoria do drzwi" },
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
          { id: "panele-dekory", slug: "panele-i-dekory-scienne", name: "Panele i dekory ścienne" },
          { id: "mozaiki", slug: "mozaiki", name: "Mozaiki" },
        ]
      },
      { id: "listwy-akcesoria", slug: "listwy-i-akcesoria", name: "Listwy i akcesoria" },
    ]
  },
  {
    id: "stropy-i-sciany",
    slug: "stropy-i-sciany",
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
              { id: "bloczki-betonowe", slug: "bloczki-betonowe-i-fundamentowe", name: "Bloczki betonowe i fundamentowe" },
            ]
          },
          {
            id: "pustaki", slug: "pustaki", name: "Pustaki",
            children: [
              { id: "pustaki-ceramiczne", slug: "pustaki-ceramiczne", name: "Pustaki ceramiczne" },
              { id: "pustaki-betonowe", slug: "pustaki-betonowe", name: "Pustaki betonowe" },
              { id: "pustaki-wentylacyjne", slug: "pustaki-wentylacyjne-i-dymne", name: "Pustaki wentylacyjne i dymne" },
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
      { id: "panele-scianne", slug: "panele-scienne-i-tapety", name: "Panele ścienne i tapety" },
      {
        id: "schody", slug: "schody-i-akcesoria-strychowe", name: "Schody i akcesoria strychowe",
        children: [
          { id: "schody-strychowe", slug: "schody-strychowe", name: "Schody strychowe" },
        ]
      },
      {
        id: "kominy", slug: "systemy-kominowe", name: "Systemy kominowe",
        children: [
          { id: "kominy-ceramiczne", slug: "kominy-ceramiczne", name: "Kominy ceramiczne" },
          { id: "kominy-stalowe", slug: "kominy-stalowe", name: "Kominy stalowe" },
          { id: "akcesoria-kominy", slug: "akcesoria-do-kominow", name: "Akcesoria do kominów" },
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
        id: "plyty-sucha", slug: "plyty-do-suchej-zabudowy", name: "Płyty",
        children: [
          { id: "plyty-cementowe", slug: "plyty-cementowe", name: "Płyty cementowe" },
          { id: "plyty-gk", slug: "plyty-gipsowo-kartonowe", name: "Płyty gipsowo-kartonowe" },
          { id: "plyty-gw", slug: "plyty-gipsowo-wloknowe", name: "Płyty gipsowo-włóknowe" },
          { id: "plyty-cw", slug: "plyty-cementowo-wloknowe", name: "Płyty cementowo-włóknowe" },
        ]
      },
      {
        id: "profile-sucha", slug: "profile-do-suchej-zabudowy", name: "Profile do suchej zabudowy",
        children: [
          { id: "profile-sciana", slug: "profile-do-suchej-zabudowy-konstrukcja-scienna", name: "Profile do suchej zabudowy – konstrukcja ścienna" },
          { id: "profile-oscieznicowe", slug: "profile-do-suchej-zabudowy-oscieznicowe", name: "Profile ościeżnicowe" },
          { id: "profile-sufit", slug: "profile-do-suchej-zabudowy-konstrukcja-sufitowa", name: "Profile do suchej zabudowy – konstrukcja sufitowa" },
        ]
      },
      {
        id: "wieszaki-sucha", slug: "wieszaki-do-suchej-zabudowy", name: "Wieszaki do suchej zabudowy",
        children: [
          { id: "wieszaki-noniusz", slug: "wieszaki-do-suchej-zabudowy-z-noniuszem", name: "Wieszaki do suchej zabudowy z noniuszem" },
          { id: "wieszaki-es", slug: "wieszaki-es", name: "Wieszaki ES" },
          { id: "wieszaki-poddasze", slug: "wieszaki-do-suchej-zabudowy-poddaszy", name: "Wieszaki do suchej zabudowy poddaszy" },
          { id: "wieszaki-bezposrednie", slug: "wieszaki-do-suchej-zabudowy-bezposrednie", name: "Wieszaki bezpośrednie" },
        ]
      },
      {
        id: "narozniki-listwy", slug: "narozniki-i-listwy", name: "Narożniki i listwy",
        children: [
          { id: "narozniki-alu", slug: "narozniki-do-suchej-zabudowy-aluminiowe", name: "Narożniki aluminiowe" },
          { id: "narozniki-pvc", slug: "narozniki-do-suchej-zabudowy-pvc", name: "Narożniki PVC" },
          { id: "narozniki-tynki-mokre", slug: "narozniki-do-tynkow-mokrych", name: "Narożniki do tynków mokrych" },
          { id: "listwy-podtynkowe", slug: "listwy-przypodlogowe", name: "Listwy podtynkowe" },
        ]
      },
      { id: "tasmy-sucha", slug: "tasmy-do-suchej-zabudowy", name: "Taśmy do suchej zabudowy" },
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
          { id: "plyty-welna-mineralna", slug: "plyty-sufitowe-z-welny-mineralnej", name: "Płyty sufitowe z wełny mineralnej" },
          { id: "plyty-welna-szklana", slug: "plyty-sufitowe-z-welny-szklanej", name: "Płyty sufitowe z wełny szklanej" },
          { id: "plyty-drewniane", slug: "plyty-sufitowe-drewniane", name: "Płyty sufitowe drewniane" },
          { id: "plyty-metalowe", slug: "plyty-sufitowe-metalowe", name: "Płyty sufitowe metalowe" },
          { id: "plyty-higieniczne", slug: "plyty-higieniczne", name: "Płyty sufitowe higieniczne" },
          { id: "plyty-listwowe", slug: "plyty-listwowe", name: "Płyty sufitowe listwowe" },
        ]
      },
      {
        id: "profile-sufity", slug: "profile-do-sufitow-podwieszanych", name: "Profile do sufitów podwieszanych",
        children: [
          { id: "profile-nosne", slug: "profile-nosne-glowne-do-sufitow-podwieszanych", name: "Profile nośne/główne" },
          { id: "profile-poprzeczne", slug: "profile-poprzeczne-do-sufitow-podwieszanych", name: "Profile poprzeczne" },
          { id: "profile-przysc", slug: "profile-przyscienne-do-sufitow-podwieszanych", name: "Profile przyścienne" },
          { id: "profile-specjalne-suf", slug: "profile-specjalne-do-sufitow-podwieszanych", name: "Profile specjalne" },
        ]
      },
      {
        id: "mocowania-sufity", slug: "mocowania-do-sufitow-podwieszanych", name: "Mocowania do sufitów podwieszanych",
        children: [
          { id: "wieszaki-dwuhakowe", slug: "wieszaki-dwuhakowe", name: "Wieszaki dwuhakowe" },
          { id: "klipsy-mocujace", slug: "klipsy-mocujace-do-sufitow-podwieszanych", name: "Klipsy mocujące" },
          { id: "druty-hakiem", slug: "druty-z-hakiem", name: "Druty z hakiem" },
        ]
      },
    ]
  },
];

export const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  // Historyczne statyczne slugi → aktualne publiczne URL-e.
  "gipsy-gladzie": "gipsy-i-gladzie",
  "gladzie-proszek": "gladzie-gipsowe-w-proszku",
  "gladzie-gotowe": "gladzie-masy-gotowe",
  "masy-szpachlowe": "masy-szpachlowe-gotowe",
<<<<<<< HEAD

  // Sanity po imporcie potrafiło zgubić literę „ł" w slugach (ł → pusty znak).
  "aczniki-do-izolacji-fasadowych": "laczniki-do-izolacji-fasadowych",
  "aczniki-do-profili": "laczniki-do-profili",
  "akcesoria-do-potkow-przeciwsniegowe": "akcesoria-do-plotkow-przeciwsniegowe",
  "artykuy-scierne": "artykuly-scierne",
  "artykuy-scierne-do-suchej-zabudowy": "artykuly-scierne-do-suchej-zabudowy",
  "farby-pozostae": "farby-pozostale",
  "farby-przemysowe": "farby-przemyslowe",
  "farby-wewnetrzne-biae": "farby-wewnetrzne-biale",
  "gadzie-gipsowe-w-proszku": "gladzie-gipsowe-w-proszku",
  "gadzie-masy-gotowe": "gladzie-masy-gotowe",
  "gipsy-i-gadzie": "gipsy-i-gladzie",
  "izolacje-dachow-paskich": "izolacje-dachow-plaskich",
  "izolacje-przemysowe": "izolacje-przemyslowe",
  "izolacje-stropow-i-podog": "izolacje-stropow-i-podlog",
  "kleje-do-ween": "kleje-do-welen",
  "koki-i-wkrety-uniwersalne": "kolki-i-wkrety-uniwersalne",
  "listwy-przypodogowe": "listwy-przypodlogowe",
  "materiay-konstrukcyjne": "materialy-konstrukcyjne",
  "mieszada": "mieszadla",
  "motki-budowlane": "mlotki-budowlane",
  "okadziny-z-wokna-szklanego": "okladziny-z-wlokna-szklanego",
  "oowkikredy-i-markery": "olowki-kredy-i-markery",
  "podkady-wypeniajace": "podklady-wypelniajace",
  "potki-przeciwsniegowe": "plotki-przeciwsniegowe",
  "powoki-epoksydowe": "powloki-epoksydowe",
  "pytki-elewacyjne": "plytki-elewacyjne",
  "pytki-scienne": "plytki-scienne",
  "pytki-tarasowe": "plytki-tarasowe",
  "pyty-cementowe": "plyty-cementowe",
  "pyty-gipsowo-kartonowe": "plyty-gipsowo-kartonowe",
  "pyty-xps": "plyty-xps",
  "spoiny-zwyke": "spoiny-zwykle",
  "styropian-dach-podoga-eps": "styropian-dach-podloga-eps",
  "tasmy-i-folie-pozostae": "tasmy-i-folie-pozostale",
  "waki-malarskie": "walki-malarskie",
  "weny": "welny",
  "weny-do-dachow-paskich": "welny-do-dachow-plaskich",
  "weny-do-poddaszy": "welny-do-poddaszy",
  "weny-fasadowe": "welny-fasadowe",
  // Stare statyczne slugi welna-* → kanoniczne Sanity welny-*
  "welna-fasadowa": "welny-fasadowe",
  "welna-sucha-zabudowa": "welny-do-suchej-zabudowy-i-scian-dzialowych",
  "welna-stropy": "welny-do-stropow-i-podlog",
  "welna-dachy-plaskie": "welny-do-dachow-plaskich",
  "welna-poddasza": "welny-do-poddaszy",
  "welna-akustyczna": "welny-do-suchej-zabudowy-i-scian-dzialowych",
  "welna-kominkowa": "welny",
  // Stare slugi skrócone sufity z wełny
  "plyty-welna-mineralna": "plyty-sufitowe-z-welny-mineralnej",
  "plyty-welna-szklana": "plyty-sufitowe-z-welny-szklanej",
  // Stary skrót kleje-welna
  "kleje-welna": "kleje-do-welen",
  // ── Synchronizacja z Sanity (pełna, czerwiec 2026) ──
  "akcesoria-izolacji": "akcesoria-do-izolacji",
  "akcesoria-kominy": "akcesoria-do-kominow",
  "akcesoria-malarskie": "akcesoria-malarskie-i-tynkarskie",
  "akcesoria-rynny": "akcesoria-do-systemow-rynnowych",
  "bazy-koloranty": "bazy-i-koloranty",
  "bloczki-betonowe": "bloczki-betonowe-i-fundamentowe",
  "czysciki-pian": "czysciki-do-pian-montazowych",
  "dodatki-tynki": "tynki-specjalne",
  "dodatki-zaprawy": "dodatki-do-zapraw-i-betonu",
  "druty-hakiem": "druty-z-hakiem",
  "drzwi-akcesoria": "drzwi-i-akcesoria-do-drzwi",
  "elementy-mocujace": "elementy-mocujace-uniwersalne",
  "farby-biale": "farby-wewnetrzne-biale",
  "farby-drewno": "farby-do-drewna",
  "farby-elaw-akrylowe": "farby-elewacyjne-akrylowe",
  "farby-elaw-emulsyjne": "farby-elewacyjne-emulsyjne",
  "farby-elaw-silikatowe": "farby-elewacyjne-silikatowe",
  "farby-elaw-silikatowo-akrylowe": "farby-elewacyjne-akrylowe",
  "farby-elaw-silikatowo-silikonowe": "farby-elewacyjne-silikonowe",
  "farby-elaw-silikonowe": "farby-elewacyjne-silikonowe",
  "farby-kolorowe": "farby-wewnetrzne-kolorowe",
  "farby-metal": "farby-do-metalu",
  "gipsy-wapienne": "tynki-wapienne",
  "grunty-posadzki": "grunty-do-posadzek",
  "gwozdzie-budowlane": "gwozdzie-i-podkladki-dociskowe-do-pap",
  "impregnaty-drewno": "impregnaty",
  "katowniki": "katowniki-i-katomierze",
  "kleje-drewno": "kleje-do-drewna",
  "kleje-gkb": "kleje-do-gips-karton",
  "kleje-glazura": "kleje-do-glazury",
  "kleje-styropian": "kleje-do-styropianu-i-styroduru",
  "klipsy-mocujace-sufity": "klipsy-mocujace-do-sufitow-podwieszanych",
  "klucze-narzedzia": "klucze",
  "kolki-beton": "kotwy-chemiczne",
  "kolki-rozpozowe": "kolki-do-suchej-zabudowy",
  "kolki-wkrety-uniwersalne": "kolki-i-wkrety-uniwersalne",
  "kruszywa-tynki": "tynki-mozaikowe",
  "lakiery-drewno": "lakiery-do-drewna",
  "lamele-dekoracyjne": "plytki-dekoracyjne",
  "listwy-akcesoria": "listwy-i-akcesoria",
  "listwy-podtynkowe": "listwy-przypodlogowe",
  "masy-bitumiczne": "masy-bitumiczne-gruntujace",
  "mocowania-sufity": "mocowania-do-sufitow-podwieszanych",
  "narozniki-aluminiowe": "narozniki-do-suchej-zabudowy-aluminiowe",
  "narozniki-listwy": "narozniki-i-listwy",
  "narozniki-pvc": "narozniki-do-suchej-zabudowy-pvc",
  "narozniki-tynki-mokre": "narozniki-do-tynkow-mokrych",
  "okna-akcesoria": "okna-dachowe-i-akcesoria",
  "okna-dachowe-std": "okna-dachowe",
  "oleje-drewno": "oleje",
  "opalarki-palniki": "opalarki-i-palniki",
  "pace-budowlane": "pace",
  "palisady-krawezniki": "palisady-krawezniki-i-obrzeza",
  "panele-dekory": "panele-i-dekory-scienne",
  "panele-scienne-tapety": "panele-scienne-i-tapety",
  "papy-dachowe": "papy",
  "piany-pistoletowe": "piany-montazowe-pistoletowe",
  "piany-wezyk": "piany-montazowe-wezykowe",
  "pilarki": "pily-i-pilarki",
  "pistolety-budowlane": "pistolety",
  "plyty-chodnikowe": "plyty-chodnikowe-i-tarasowe",
  "plyty-drewniane-sufitowe": "plyty-sufitowe-drewniane",
  "plyty-gipsowe-sufitowe": "plyty-gipsowo-kartonowe",
  "plyty-metalowe-sufitowe": "plyty-sufitowe-metalowe",
  "plyty-specjalistyczne-gk": "plyty-gipsowo-kartonowe",
  "plyty-sucha-zabudowa": "sucha-zabudowa",
  "podbitki-dachowe": "pokrycia-dachowe",
  "pokrycia-blacha": "pokrycia-dachowe-z-blachy",
  "profile-nosne-glowne": "profile-nosne-glowne-do-sufitow-podwieszanych",
  "profile-oscieznicowe": "profile-do-suchej-zabudowy-oscieznicowe",
  "profile-poprzeczne": "profile-poprzeczne-do-sufitow-podwieszanych",
  "profile-przysc-sufity": "profile-przyscienne-do-sufitow-podwieszanych",
  "profile-sciana": "profile-do-suchej-zabudowy-konstrukcja-scienna",
  "profile-specjalne-suf": "profile-specjalne-do-sufitow-podwieszanych",
  "profile-sucha-zabudowa": "profile-do-suchej-zabudowy",
  "profile-sufit": "profile-do-suchej-zabudowy-konstrukcja-sufitowa",
  "profile-sufity-podwieszane": "profile-do-sufitow-podwieszanych",
  "pustaki-wentylacyjne": "pustaki-wentylacyjne-i-dymne",
  "rynny-blacha": "systemy-rynnowe-z-blachy-powlekanej",
  "rynny-ocynkowane": "systemy-rynnowe-ocynkowane",
  "rynny-pvc": "systemy-rynnowe-pvc",
  "schody-akcesoria": "schody-i-akcesoria-strychowe",
  "silikony-wysokotemp": "silikony-wysokotemperaturowe",
  "srodki-czyszczace": "srodki-czyszczaco-pielegnacyjne",
  "sruby-podkladki": "sruby-i-podkladki-do-srub",
  "styropian-akustyczny": "styropiany-akustyczne",
  "styropian-dach-podloga": "styropian-dach-podloga-eps",
  "styropian-fasadowy-eps": "styropiany-fasadowe-eps",
  "styropian-fundamenty": "styropiany-do-fundamentow",
  "swietliki-dachowe": "balkony-dachowe",
  "szpachle": "szpachle-i-szpachelki",
  "tasmy-sucha-zabudowa": "tasmy-do-suchej-zabudowy",
  "tasmy-uszczelniajace": "tasmy-uszczelniajace-do-hydroizolacji",
  "tynki-akrylowe": "tynki-elewacyjne-akrylowe",
  "tynki-mineralne": "tynki-elewacyjne-mineralne",
  "tynki-ozdobne": "tynki-elewacyjne-ozdobne",
  "tynki-silikatowe": "tynki-elewacyjne-silikonowo-silikatowe",
  "tynki-silikonowe": "tynki-elewacyjne-silikonowe",
  "tynki-silikonowo-silikatowe": "tynki-elewacyjne-silikonowo-silikatowe",
  "uszcz-akrylowe": "uszczelniacze-i-silikony",
  "uszcz-dekarskie": "uszczelniacze-dekarskie",
  "uszcz-poliuretanowe": "uszczelniacze-poliuretanowe",
  "uszczelniacze-silikony": "uszczelniacze-i-silikony",
  "wiadra-pojemniki": "wiadra-i-pojemniki-budowlane",
  "wieszaki-bezposrednie": "wieszaki-do-suchej-zabudowy-bezposrednie",
  "wieszaki-noniusz": "wieszaki-do-suchej-zabudowy-z-noniuszem",
  "wieszaki-poddasze": "wieszaki-do-suchej-zabudowy-poddaszy",
  "wieszaki-sucha-zabudowa": "wieszaki-do-suchej-zabudowy",
  "wiertarki-mloty": "wiertarko-wkretarki",
  "wylewki-betonowe": "zaprawy-posadzkowe-masy-samopoziomujace",
  "zabezpieczenia-sniegu": "zabezpieczenia-przeciwsniegowe",
  "zaprawy-jastrych": "zaprawy-posadzkowe-masy-samopoziomujace",
  "zaprawy-montazowe": "kotwy-montazowe",
  "zaprawy-murarskie": "zaprawy-murarskie-ogolnego-zastosowania",
  "zaprawy-posadzkowe": "zaprawy-posadzkowe-masy-samopoziomujace",
  "zaprawy-tynkarskie": "tynki-cementowo-wapienne",
  "wsporniki-potkow-przeciwsniegowych": "wsporniki-plotkow-przeciwsniegowych",
};

export const resolveCategorySlug = (slug: string) => CATEGORY_SLUG_ALIASES[slug] ?? slug;

export const getCategoryBySlug = (slug: string): Category | null => {
  const targetSlug = resolveCategorySlug(slug);
  const findInTree = (cats: Category[]): Category | null => {
    for (const cat of cats) {
<<<<<<< HEAD
      if (resolveCategorySlug(cat.slug) === targetSlug) return cat;
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
  const targetSlug = resolveCategorySlug(slug);
  const findParent = (cats: Category[], parent: Category | null): Category | null => {
    for (const cat of cats) {
      if (resolveCategorySlug(cat.slug) === targetSlug) return parent;
      if (cat.children) {
        const found = findParent(cat.children, cat);
        if (found) return found;
      }
    }
    return null;
  };
  return findParent(categories, null);
};

export const getBreadcrumbs = (slug: string): { name: string; slug: string }[] => {
  const targetSlug = resolveCategorySlug(slug);
  const path: { name: string; slug: string }[] = [];
  const findPath = (cats: Category[], targetSlug: string): boolean => {
    for (const cat of cats) {
      if (resolveCategorySlug(cat.slug) === targetSlug) {
        path.push({ name: cat.name, slug: cat.slug });
        return true;
      }
      if (cat.children) {
        path.push({ name: cat.name, slug: cat.slug });
        if (findPath(cat.children, targetSlug)) return true;
        path.pop();
      }
    }
    return false;
  };
  findPath(categories, targetSlug);
  return path;
};
