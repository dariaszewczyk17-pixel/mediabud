/**
 * Dane SEO dla kategorii — FAQ, definicje, tabele porównawcze, Top 5
 * Optymalizacja pod AI Overviews i Featured Snippets
 */

// ─── Definicje kategorii ("Czym jest X") ────────────────────────────────────

export const CATEGORY_DEFINITIONS: Record<string, string> = {
  "izolacje": `**Izolacje termiczne** to materiały zmniejszające straty ciepła przez przegrody budowlane. Kluczowy parametr to współczynnik przewodzenia ciepła lambda (λ) — im niższy, tym lepsza izolacyjność. Najpopularniejsze materiały to styropian EPS (λ 0,040), styropian grafitowy (λ 0,031), wełna mineralna (λ 0,035) i XPS (λ 0,034). Zgodnie z WT 2021 ściany zewnętrzne muszą mieć U ≤ 0,20 W/(m²·K).`,

  "chemia-budowlana": `**Chemia budowlana** to grupa produktów chemicznych stosowanych w budownictwie: kleje do płytek i styropianu, zaprawy murarskie i tynkarskie, grunty, impregnaty, hydroizolacje i masy uszczelniające. Kluczowe parametry to przyczepność (MPa), czas otwarty, zużycie (kg/m²) i temperatura aplikacji. Wiodące marki: Atlas, Ceresit, Weber, Mapei, Sopro.`,

  "tynki-elewacyjne": `**Tynki elewacyjne** to zewnętrzne wykończenie ścian chroniące przed warunkami atmosferycznymi. Rodzaje: silikonowe (najtrwalsze, hydrofobowe), akrylowe (ekonomiczne, elastyczne), silikatowe (paroprzepuszczalne) i mineralne (naturalne). Kluczowe parametry: granulacja (1,0–3,0 mm), zużycie (2,0–4,0 kg/m²), paroprzepuszczalność i odporność na glony.`,

  "kleje-budowlane": `**Kleje budowlane** to zaprawy klejące do mocowania materiałów budowlanych. Główne typy: kleje do płytek (C1/C2, elastyczne S1/S2), kleje do styropianu (ETICS), kleje do betonu komórkowego i kleje montażowe. Kluczowe parametry: przyczepność (≥0,5 MPa), czas otwarty (10–30 min), zużycie (3–7 kg/m²) i klasa odkształcalności.`,

  "farby-i-rozpuszczalniki": `**Farby budowlane** to powłoki dekoracyjne i ochronne na ściany, sufity i elewacje. Typy: lateksowe (zmywalne), akrylowe (uniwersalne), silikonowe (elewacyjne), ceramiczne (premium). Kluczowe parametry: wydajność (m²/l), krycie (klasa 1–4), odporność na szorowanie i czas schnięcia. Rozpuszczalniki służą do rozcieńczania i czyszczenia.`,

  "plytki": `**Płytki ceramiczne** to materiał wykończeniowy na podłogi i ściany. Typy: gres techniczny (mrozoodporny), gres szkliwiony, terakota i płytki ścienne. Kluczowe parametry: klasa ścieralności PEI (I–V), antypoślizgowość R (R9–R13), nasiąkliwość (<0,5% dla gresu) i format. Popularne formaty: 60×60, 60×120, 80×80 cm.`,

  "dachy": `**Materiały dachowe** obejmują pokrycia (dachówki ceramiczne, betonowe, blachodachówki), membrany dachowe, obróbki blacharskie i akcesoria. Kluczowe parametry: masa (kg/m²), mrozoodporność, trwałość (25–100 lat) i kąt nachylenia dachu. Systemy rynnowe odprowadzają wodę deszczową.`,

  "sucha-zabudowa": `**Sucha zabudowa** to system budowy ścian i sufitów z płyt gipsowo-kartonowych (GK) na konstrukcji metalowej. Typy płyt: standardowe (GKB), wodoodporne (GKBI — zielone), ognioodporne (GKF — różowe) i akustyczne. Kluczowe parametry: grubość (9,5–15 mm), wymiar (120×260 cm), klasa ogniowa (EI 30–120).`,

  "stropy-i-sciany": `**Materiały ścienne i stropowe** to elementy konstrukcyjne budynków. Bloczki: beton komórkowy (Ytong, Solbet), silikaty, ceramika poryzowana. Stropy: Teriva (belkowo-pustakowy), Filigran (prefabrykowany), monolityczne. Kluczowe parametry: wytrzymałość na ściskanie (MPa), lambda (λ), klasa ogniowa.`,

  "sufity-podwieszane": `**Sufity podwieszane** to konstrukcje montowane poniżej stropu właściwego. Typy: systemowe (płyty mineralne Ecophon, Rockfon) i gipsowo-kartonowe (GK). Zastosowanie: maskowanie instalacji, poprawa akustyki, estetyka. Kluczowe parametry: pochłanianie dźwięku (αw), klasa ogniowa, wymiar modułu (60×60 cm).`,

  "narzedzia-i-mocowania": `**Narzędzia i mocowania budowlane** to sprzęt i akcesoria do prac budowlanych. Narzędzia: pace, kielnie, poziomice, mieszadła, szlifierki. Mocowania: kołki rozporowe, wkręty, kotwy chemiczne, taśmy montażowe. Kluczowe parametry: nośność (kN), średnica, długość, materiał podłoża.`,

  // Podkategorie izolacji
  "styropian": `**Styropian EPS** (expanded polystyrene) to spieniony polistyren stosowany jako izolacja termiczna. Typy: biały (λ 0,040), grafitowy/szary (λ 0,031), fasadowy (ETICS), podłogowy, dachowy. Kluczowe parametry: lambda (λ), grubość (2–30 cm), gęstość (15–30 kg/m³), klasa reakcji na ogień (E).`,

  "welna-mineralna": `**Wełna mineralna** to izolacja z włókien skalnych lub szklanych. Typy: wełna skalna (Rockwool, Paroc) i szklana (Isover, Ursa). Zalety: niepalna (A1), paroprzepuszczalna, akustyczna. Kluczowe parametry: lambda (λ 0,033–0,040), grubość, gęstość (30–200 kg/m³), klasa ogniowa A1.`,

  "xps": `**XPS** (extruded polystyrene) to styropian ekstrudowany o zamkniętych komórkach. Zastosowanie: fundamenty, tarasy, dachy odwrócone, posadzki przemysłowe. Zalety: bardzo niska nasiąkliwość (<0,3%), wysoka wytrzymałość na ściskanie (200–700 kPa). Lambda: 0,034 W/(m·K).`,
};

// ─── Rozszerzone FAQ dla wszystkich kategorii ───────────────────────────────

export const CATEGORY_FAQS_EXTENDED: Record<string, { q: string; a: string }[]> = {
  "izolacje": [
    { q: "Jaka grubość styropianu na elewację w 2026 roku?",
      a: "Zgodnie z WT 2021 ściany zewnętrzne muszą mieć U ≤ 0,20 W/(m²·K). Dla styropianu grafitowego (λ 0,031) minimalna grubość to 15 cm, dla białego (λ 0,040) — 20 cm. Dla domów energooszczędnych (NF40) zaleca się 20–25 cm grafitowego. Media Bud oferuje bezpłatne doradztwo w doborze grubości." },
    { q: "Styropian grafitowy czy biały — który wybrać?",
      a: "Styropian grafitowy (szary) ma o 20% lepszą izolacyjność (λ 0,031 vs 0,040), co pozwala użyć cieńszej warstwy. Jest droższy o 30–50%, ale oszczędza miejsce i zmniejsza zużycie kleju. Biały sprawdza się przy ograniczonym budżecie i grubszych warstwach. Do elewacji premium — grafitowy." },
    { q: "Ile kosztuje ocieplenie domu 150 m² w 2026?",
      a: "Koszt ocieplenia elewacji 150 m² (materiały + robocizna): styropian biały 20 cm — 35 000–45 000 zł, grafitowy 15 cm — 40 000–55 000 zł, wełna mineralna 15 cm — 50 000–65 000 zł. Ceny obejmują klej, siatkę, tynk i robociznę. Zapytaj Media Bud o wycenę dla Twojego projektu." },
    { q: "Wełna mineralna czy styropian — co lepsze na elewację?",
      a: "Styropian: tańszy, lżejszy, łatwiejszy w montażu, ale palny (klasa E). Wełna: niepalna (A1), paroprzepuszczalna, lepsza akustyka, ale droższa i cięższa. Do budynków wysokich (>25 m) i stref pożarowych — wełna obowiązkowa. Do domów jednorodzinnych — styropian grafitowy to optymalny wybór." },
    { q: "Co to jest lambda (λ) i dlaczego jest ważna?",
      a: "Lambda (λ) to współczynnik przewodzenia ciepła w W/(m·K). Im niższa wartość, tym lepszy izolator. Styropian biały: λ 0,040, grafitowy: λ 0,031, wełna: λ 0,035, XPS: λ 0,034. Różnica 0,01 w lambda oznacza ~25% różnicy w wymaganej grubości izolacji." },
    { q: "Jaki styropian pod podłogę na gruncie?",
      a: "Pod podłogę na gruncie stosuje się styropian podłogowy EPS 100 lub EPS 200 (wytrzymałość 100–200 kPa). Grubość: min. 10 cm dla WT 2021, zalecane 15–20 cm. Alternatywnie XPS przy wysokim poziomie wód gruntowych. Układać na folii PE, zakładki min. 15 cm." },
  ],

  "chemia-budowlana": [
    { q: "Jaki klej do styropianu na elewację?",
      a: "Do styropianu na elewację najlepszy jest klej cementowy z dodatkiem polimerów, np. Atlas Stopter K-20, Ceresit CT 83, Weber.therm S100. Zużycie: 4–5 kg/m² metodą obwodowo-punktową. Klej musi mieć certyfikat ETICS i być odporny na warunki atmosferyczne. Temperatura aplikacji: +5°C do +25°C." },
    { q: "Ile schnie klej do płytek przed fugowaniem?",
      a: "Standardowy klej do płytek schnie 24–48 godzin przed fugowaniem. Kleje szybkoschnące (np. Atlas Plus Express): 4–6 godzin. Czas zależy od grubości warstwy, temperatury (min. +5°C) i wilgotności. Pełna wytrzymałość mechaniczna po 7–14 dniach. Nie obciążać płytek przed upływem tego czasu." },
    { q: "Jaki klej do płytek wielkoformatowych 60×120?",
      a: "Do płytek wielkoformatowych (≥60×60 cm) stosuje się kleje klasy C2 S1 lub C2 S2 (elastyczne), np. Mapei Keraflex Maxi S1, Sopro No.1, Atlas Plus Mega. Nakładać grzebieniem 10–12 mm, metodą podwójnego klejenia (na podłoże i płytkę). Zużycie: 5–7 kg/m²." },
    { q: "Czym zagruntować ścianę przed tynkowaniem?",
      a: "Przed tynkowaniem stosuje się grunt głęboko penetrujący (np. Ceresit CT 17, Atlas Uni-Grunt) na podłoża chłonne lub grunt kontaktowy z piaskiem (Ceresit CT 16, Baumit BetonKontakt) na gładkie podłoża betonowe. Zużycie: 0,1–0,2 l/m². Schnięcie: 2–4 godziny." },
    { q: "Jaka zaprawa do murowania bloczków z betonu komórkowego?",
      a: "Do betonu komórkowego stosuje się zaprawę cienkowarstwową (spoina 1–3 mm), np. Atlas KB, Ceresit Aero, Baumit ThermoMörtel. Zużycie: 2–3 kg/m² muru. Alternatywnie klej poliuretanowy w piance (Tytan, Soudal) — szybszy montaż, spoina 2 mm. Nie stosować tradycyjnej zaprawy cementowej." },
    { q: "Jak uszczelnić taras przed wodą?",
      a: "Taras uszczelnia się dwuskładnikową masą hydroizolacyjną (np. Mapei Mapelastic, Weber.tec Superflex D2) w dwóch warstwach z siatką wzmacniającą. Grubość: min. 2 mm. Na narożniki i dylatacje — taśma uszczelniająca. Alternatywnie: folia w płynie (Ceresit CL 51). Płytki kleić klejem C2 S2." },
  ],

  "tynki-elewacyjne": [
    { q: "Tynk silikonowy czy akrylowy — który wybrać?",
      a: "Tynk silikonowy: najtrwalszy (25+ lat), hydrofobowy, paroprzepuszczalny, odporny na glony, ale droższy (40–60 zł/m²). Akrylowy: tańszy (25–40 zł/m²), elastyczny, ale mniej paroprzepuszczalny i szybciej brudzi się. Na elewacje z wełną — tylko silikonowy lub silikatowy. Na styropian — oba." },
    { q: "Ile tynku elewacyjnego potrzebuję na 100 m²?",
      a: "Zużycie tynku zależy od granulacji: 1,0 mm — 2,0 kg/m², 1,5 mm — 2,5 kg/m², 2,0 mm — 3,0 kg/m², 3,0 mm — 4,0 kg/m². Na 100 m² przy granulacji 1,5 mm: 250 kg = 10 wiader po 25 kg. Dodaj 10% zapasu. Użyj kalkulatora Media Bud dla dokładnych obliczeń." },
    { q: "Jak nakładać tynk silikonowy krok po kroku?",
      a: "1) Zagruntuj podłoże gruntem pod tynk (schnięcie 24h). 2) Wymieszaj tynk wolnoobrotowym mieszadłem. 3) Nałóż pacą ze stali nierdzewnej warstwę równą granulacji. 4) Po 10–15 min (gdy matowieje) zatarcie pacą plastikową ruchem kolistym lub pionowym. 5) Pracuj metodą mokre-w-mokre, bez przerw." },
    { q: "Jaka granulacja tynku elewacyjnego jest najlepsza?",
      a: "Granulacja 1,5 mm — uniwersalna, dobra równowaga między estetyką a trwałością. 1,0 mm — gładka, elegancka, ale trudniejsza w aplikacji. 2,0 mm — bardziej odporna na uszkodzenia, ukrywa nierówności. 3,0 mm — rustykalna, do dużych powierzchni. Na cokół: 2,0–3,0 mm (odporność na uderzenia)." },
    { q: "Kiedy można nakładać tynk elewacyjny?",
      a: "Tynk elewacyjny nakłada się przy temperaturze +5°C do +25°C, wilgotności powietrza <80%, bez deszczu i silnego wiatru. Nie tynkować w pełnym słońcu (zbyt szybkie schnięcie). Podłoże musi być suche, dojrzałe (min. 7 dni dla kleju zbrojącego) i zagruntowane." },
  ],

  "kleje-budowlane": [
    { q: "Jaki klej do płytek w łazience?",
      a: "Do łazienki stosuje się klej elastyczny klasy C2 TE S1 (np. Ceresit CM 17, Atlas Plus, Mapei Keraflex). 'TE' oznacza wydłużony czas otwarty, 'S1' — elastyczność. Na ogrzewanie podłogowe — obowiązkowo S1 lub S2. Przed klejeniem — hydroizolacja (folia w płynie lub mata)." },
    { q: "Ile kleju do płytek na 1 m²?",
      a: "Zużycie kleju zależy od rozmiaru płytek i grzebienia: płytki <20×20 cm (grzebień 6 mm) — 2,5–3,0 kg/m², 30×60 cm (grzebień 10 mm) — 4,0–4,5 kg/m², 60×60 cm (grzebień 12 mm) — 5,5–6,5 kg/m², 60×120 cm (podwójne klejenie) — 7–8 kg/m². Worek 25 kg wystarcza na 4–10 m²." },
    { q: "Czym się różni klej C1 od C2?",
      a: "C1 — klej standardowy, przyczepność ≥0,5 MPa, do płytek małych i średnich na stabilne podłoża. C2 — klej ulepszony, przyczepność ≥1,0 MPa, do płytek wielkoformatowych, na tarasy, ogrzewanie podłogowe. Dodatki: T — tiksotropowy (nie spływa), E — wydłużony czas otwarty, S1/S2 — elastyczny." },
    { q: "Jaki klej do gresu na taras?",
      a: "Na taras zewnętrzny stosuje się klej mrozoodporny klasy C2 TE S1 lub C2 TE S2 (np. Sopro No.1 Flexible, Mapei Kerabond T + Isolastic, Atlas Plus Mega). Obowiązkowa hydroizolacja pod płytkami. Fugi — elastyczne, mrozoodporne (np. Sopro Saphir). Spadek: min. 1,5–2%." },
    { q: "Jak długo można korygować położenie płytki?",
      a: "Czas otwarty kleju (możliwość korekty): standardowy klej — 10–20 min, klej z oznaczeniem 'E' (extended) — 30–40 min. Po tym czasie klej tworzy skórkę i traci przyczepność. W upalne dni czas skraca się o 30–50%. Pracuj małymi partiami (1–2 m²)." },
  ],

  "farby-i-rozpuszczalniki": [
    { q: "Jaka farba do ścian w salonie?",
      a: "Do salonu najlepsza jest farba lateksowa lub ceramiczna klasy 1–2 (najwyższa odporność na szorowanie). Polecane: Dulux EasyCare, Śnieżka Nature, Beckers Designer Kitchen & Bathroom. Wydajność: 10–14 m²/l. Matowe wykończenie ukrywa nierówności, satynowe — łatwiejsze w czyszczeniu." },
    { q: "Ile farby potrzebuję na pokój 20 m²?",
      a: "Na pokój 20 m² (ściany ~50 m² + sufit 20 m² = 70 m²) przy dwóch warstwach: 70 m² × 2 ÷ 12 m²/l = ~12 litrów. Kup 2 wiadra po 5 l + 1 wiadro 2,5 l. Przy zmianie koloru z ciemnego na jasny — 3 warstwy, czyli ~18 litrów. Grunt zmniejsza zużycie o 10–15%." },
    { q: "Farba lateksowa czy akrylowa — różnice?",
      a: "Farba lateksowa: zawiera kauczuk syntetyczny, bardziej elastyczna, odporna na szorowanie (klasa 1–2), droższa, idealna do kuchni i łazienek. Akrylowa: na bazie żywic akrylowych, tańsza, dobra do sypialni i salonów (klasa 2–3). Obie są wodorozcieńczalne i bezwonne po wyschnięciu." },
    { q: "Jak przygotować ścianę do malowania?",
      a: "1) Usuń starą farbę łuszczącą się lub tapetę. 2) Wyrównaj ubytki masą szpachlową, przeszlifuj (P120–P180). 3) Odpyl i odtłuść ścianę. 4) Nałóż grunt głęboko penetrujący (na chłonne) lub pod farbę (na gładkie). 5) Po wyschnięciu (2–4h) maluj pierwszą warstwą rozcieńczoną 10%." },
    { q: "Jaka farba na elewację zewnętrzną?",
      a: "Na elewację: farba silikonowa (najtrwalsza, hydrofobowa, paroprzepuszczalna) lub akrylowa (tańsza, ale mniej trwała). Polecane: Caparol Amphisilan, Ceresit CT 48, Weber.ton Sil. Wydajność: 0,15–0,25 l/m². Nakładać w 2 warstwach. Nie malować w pełnym słońcu ani przy temperaturze <+5°C." },
  ],

  "plytki": [
    { q: "Gres czy terakota — co wybrać na podłogę?",
      a: "Gres: twardszy (PEI IV–V), mrozoodporny, nasiąkliwość <0,5%, idealny do przedpokojów, kuchni, tarasów. Terakota: cieplejsza w dotyku, tańsza, ale mniej odporna (PEI II–III), tylko do wnętrz. Na ogrzewanie podłogowe — gres (lepsza przewodność ciepła)." },
    { q: "Jaki rozmiar płytek do małej łazienki?",
      a: "Do małej łazienki (<6 m²) najlepsze są płytki średnie: 30×60 cm lub 60×60 cm — optycznie powiększają przestrzeń. Unikaj bardzo małych (mozaika) i bardzo dużych (60×120) — trudne w montażu i dużo docinania. Jasne kolory i duże formaty = wrażenie większej przestrzeni." },
    { q: "Co oznacza klasa antypoślizgowości R?",
      a: "Klasa R określa antypoślizgowość płytek: R9 — minimalna (wnętrza suche), R10 — łazienki, kuchnie, R11 — tarasy, baseny, R12–R13 — przemysł, rampy. Do prysznica bez brodzika: min. R10, zalecane R11. Klasa A/B/C dotyczy stref mokrych (baseny): A — suche, C — bardzo mokre." },
    { q: "Ile płytek 60×60 na 10 m²?",
      a: "Płytka 60×60 cm = 0,36 m². Na 10 m²: 10 ÷ 0,36 = 28 płytek. Dodaj 10% zapasu na docięcia i uszkodzenia = 31 płytek. Przy układaniu diagonalnym (pod kątem 45°) — zapas 15% = 33 płytki. Sprawdź ile płytek w opakowaniu (zwykle 3–4 szt. = 1,08–1,44 m²)." },
    { q: "Jak układać płytki wielkoformatowe 60×120?",
      a: "1) Podłoże idealnie równe (odchyłka <2 mm/2 m). 2) Klej C2 S1/S2, grzebień 10–12 mm. 3) Podwójne klejenie (na podłoże i płytkę). 4) Układać z przesunięciem max 1/3 długości (nie 1/2 — ryzyko pęknięć). 5) System poziomujący (klipsy + kliny). 6) Fuga min. 2 mm. 7) Dylatacje co 5–6 m." },
  ],

  "dachy": [
    { q: "Dachówka ceramiczna czy betonowa — porównanie?",
      a: "Ceramiczna: lżejsza (40–50 kg/m²), trwalsza (100+ lat), droższa (80–150 zł/m²), lepsza estetyka. Betonowa: cięższa (45–55 kg/m²), tańsza (40–80 zł/m²), trwałość 50–70 lat, większy wybór kolorów. Obie mrozoodporne. Na lekkie konstrukcje — ceramika lub blachodachówka." },
    { q: "Jaki kąt nachylenia dachu pod dachówkę?",
      a: "Dachówka ceramiczna/betonowa: min. 22° (zalecane 30–45°). Dachówka płaska (Creaton Domino): min. 16°. Blachodachówka: min. 9–14°. Papa: min. 3°. Przy niższych kątach — dodatkowe uszczelnienie (membrana, podwójna papa). Sprawdź kartę techniczną producenta." },
    { q: "Ile waży dach z dachówki na 100 m²?",
      a: "Dachówka ceramiczna: 40–50 kg/m² × 100 m² = 4000–5000 kg. Betonowa: 45–55 kg/m² = 4500–5500 kg. Blachodachówka: 4–6 kg/m² = 400–600 kg. Do masy pokrycia dodaj konstrukcję więźby (30–50 kg/m²), izolację i wykończenie. Lekkie pokrycia na słabsze konstrukcje." },
    { q: "Jaka membrana dachowa pod dachówkę?",
      a: "Pod dachówkę stosuje się membranę wysokoparoprzepuszczalną (Sd <0,3 m), np. Dorken Delta-Vent N, Fakro Eurotop N35. Gramatura: min. 130 g/m², zalecane 150–180 g/m². Membrana chroni przed wodą z nawiewu i kondensatem, jednocześnie odprowadzając parę z poddasza." },
    { q: "Jak dobrać rynny do dachu?",
      a: "Średnica rynny zależy od powierzchni dachu: do 50 m² — rynna 100 mm, 50–100 m² — 125 mm, 100–150 m² — 150 mm. Rura spustowa: 75–100 mm. Materiały: PVC (tani, 15–20 lat), stal ocynkowana (25–30 lat), tytan-cynk (50+ lat), miedź (100+ lat). Spadek rynny: 3–5 mm/m." },
  ],

  "sucha-zabudowa": [
    { q: "Jaka grubość płyty GK do ścianki działowej?",
      a: "Do standardowych ścianek działowych: płyta GK 12,5 mm na profilach CW/UW 75 lub 100 mm. Jedna warstwa na stronę = minimum. Dwie warstwy (2×12,5 mm) = lepsza izolacja akustyczna i ogniowa (EI 60). Do łazienek — płyta impregnowana GKBI (zielona). Do stref pożarowych — GKF (różowa)." },
    { q: "Knauf czy Rigips — która płyta GK lepsza?",
      a: "Obie marki oferują porównywalną jakość (norma EN 520). Knauf: bogatsza oferta specjalnych płyt (akustyczne Silentboard, ogniochronne Fireboard). Rigips (Saint-Gobain): lider w segmencie profesjonalnym, szeroka dystrybucja. Wybór zależy od dostępności i preferencji ekipy. Media Bud ma obie marki." },
    { q: "Ile profili metalowych na ściankę GK 10 m²?",
      a: "Na ściankę 10 m² (np. 4 m × 2,5 m): profile pionowe CW co 60 cm = 7 szt. × 2,6 m. Profile poziome UW (góra + dół) = 2 × 4 m = 8 mb. Łączniki, wkręty TN 3,5×25 (25 szt./m²), taśma akustyczna pod UW. Płyty GK: 10 m² × 2 strony = 20 m² + 10% zapas = 22 m² = 8 płyt 120×260." },
    { q: "Jak zamontować sufit podwieszany GK?",
      a: "1) Profil przyścienny UD 30 wokół obrysu. 2) Wieszaki ES co 80–100 cm do stropu. 3) Profile nośne CD 60 co 50 cm. 4) Profile poprzeczne CD 60 co 50 cm (łączniki krzyżowe). 5) Płyty GK 12,5 mm mocowane wkrętami TN 3,5×25 co 17 cm. 6) Szpachlowanie styków z taśą papierową." },
    { q: "Jaka izolacja akustyczna w ściance GK?",
      a: "Dla dobrej izolacji akustycznej: podwójna płyta GK (2×12,5 mm) po obu stronach + wełna mineralna 5–10 cm w środku (np. Rockwool Acoustic, Isover Aku). Wynik: Rw 50–55 dB. Dla maksymalnej izolacji: podwójna konstrukcja (dwa rzędy profili) + wełna 10 cm = Rw 60+ dB." },
  ],

  "stropy-i-sciany": [
    { q: "Jakie bloczki do ściany nośnej?",
      a: "Do ścian nośnych: beton komórkowy klasy min. 600 (Ytong PP4/0,6, Solbet S600), silikaty (Silka E24), ceramika poryzowana (Porotherm 25). Grubość: 24–36 cm wg projektu. Dla lepszej izolacji: bloczki 36–48 cm z lambda ≤0,12. Zawsze zgodnie z projektem konstrukcyjnym." },
    { q: "Strop Teriva czy Filigran — różnice?",
      a: "Teriva (belkowo-pustakowy): montaż na budowie z belek i pustaków, zalanie betonem, tańszy, dłuższy montaż (3–5 dni). Filigran (prefabrykowany): płyty żelbetowe z zakładu, montaż dźwigiem w 1 dzień, wyższa nośność, droższy. Teriva do domów jednorodzinnych, Filigran do większych obiektów." },
    { q: "Jaka grubość ściany dla WT 2021?",
      a: "WT 2021 wymaga U ≤0,20 W/(m²·K) dla ścian zewnętrznych. Sama ściana murowa tego nie spełnia — wymaga ocieplenia. Beton komórkowy 36 cm (λ 0,09) + styropian 15 cm = U ≈0,15. Silikaty 24 cm + styropian 20 cm = U ≈0,16. Zawsze projektuj system: mur + izolacja." },
    { q: "Ile bloczków z betonu komórkowego na 1 m² muru?",
      a: "Zużycie bloczków zależy od wymiaru: 24×24×59 cm = 6,9 szt./m², 24×24×49 cm = 8,3 szt./m², 36×24×59 cm = 6,9 szt./m². Zaprawa cienkowarstwowa: 2–3 kg/m². Przy zakupie dodaj 3–5% zapasu na docięcia i uszkodzenia. Media Bud doradzi w doborze." },
  ],

  "sufity-podwieszane": [
    { q: "Sufit systemowy czy GK — co wybrać?",
      a: "Sufit systemowy (Ecophon, Rockfon): demontowalne płyty, łatwy dostęp do instalacji, lepsza akustyka, idealny do biur i hal. Sufit GK: trwały, gładki, bezspoinowy, malowany, dominuje w mieszkaniach. Systemowy droższy w materiale, tańszy w montażu. GK wymaga szpachlowania i malowania." },
    { q: "Jak poprawić akustykę sufitem podwieszanym?",
      a: "Dla dobrej akustyki: płyty pochłaniające z αw 0,7–1,0 (Ecophon Master, Rockfon Sonar) + wełna mineralna 5 cm nad sufitem. Sufit GK sam w sobie słabo pochłania dźwięk — dodaj płyty akustyczne perforowane lub panele absorpcyjne. Obniżenie sufitu o 10–15 cm poprawia efekt." },
    { q: "Ile kosztuje sufit podwieszany GK na 15 m²?",
      a: "Materiały na 15 m² sufitu GK: profile CD+UD ≈200–300 zł, płyty GK 12,5 mm ≈150–220 zł, wieszaki/wkręty ≈80–120 zł, masa szpachlowa+taśma ≈60–100 zł. Razem: 500–750 zł. Robocizna: 50–80 zł/m² = 750–1200 zł. Łącznie: 1250–1950 zł za 15 m²." },
    { q: "Jaka minimalna wysokość sufitu podwieszanego?",
      a: "Minimalne obniżenie sufitu GK: 4–5 cm (profil CD 60 + płyta). Sufit systemowy: 10–15 cm (konstrukcja + płyta). Dla instalacji (oświetlenie LED, wentylacja): 15–25 cm. Dla klimatyzacji kanałowej: 25–40 cm. Wysokość pomieszczenia po obniżeniu: min. 2,5 m (mieszkania), 2,7 m (biura)." },
  ],

  "narzedzia-i-mocowania": [
    { q: "Jaki kołek rozporowy do betonu?",
      a: "Do betonu: kołki rozporowe plastikowe (lekkie obciążenia do 20 kg) lub metalowe (średnie 20–100 kg). Do ciężkich obciążeń: kotwy mechaniczne (100–500 kg) lub chemiczne (500+ kg). Średnica: 6 mm (lekkie), 8–10 mm (średnie), 12–16 mm (ciężkie). Głębokość zakotwienia: min. 4× średnica." },
    { q: "Jak dobrać wkręty do regipsu?",
      a: "Do płyt GK: wkręty TN (drobny gwint) do profili metalowych, TB (gruby gwint) do drewna. Długość: grubość płyty + 10 mm wkręcenia w profil. Dla 12,5 mm GK: wkręty TN 3,5×25 mm. Dla podwójnej płyty: TN 3,5×35 mm. Rozstaw: co 17 cm na obwodzie, co 25 cm w polu." },
    { q: "Jaka paca do tynku silikonowego?",
      a: "Do nakładania tynku: paca ze stali nierdzewnej 280×130 mm lub 350×130 mm. Do zacierania: paca plastikowa (styropianowa) lub z gąbką. Do tynku baranek — paca plastikowa z ruchem kolistym. Do tynku kornik — paca plastikowa z ruchem pionowym lub poziomym. Czyść pacę co kilka minut." },
    { q: "Ile wkrętów na 1 m² płyty GK?",
      a: "Zużycie wkrętów na 1 m² płyty GK: ~25 sztuk (rozstaw co 17 cm na profilach co 60 cm). Na 10 m² ścianki (2 strony): 10 × 2 × 25 = 500 wkrętów. Kup opakowanie 1000 szt. z zapasem. Wkręty TN 3,5×25 do pojedynczej płyty, TN 3,5×35 do podwójnej." },
  ],
};

// ─── Tabele porównawcze produktów ───────────────────────────────────────────

export interface ComparisonRow {
  parameter: string;
  values: Record<string, string>;
  winner?: string;
}

export interface ComparisonTable {
  title: string;
  description: string;
  products: string[];
  rows: ComparisonRow[];
  recommendation: string;
}

export const CATEGORY_COMPARISONS: Record<string, ComparisonTable> = {
  "izolacje": {
    title: "Porównanie materiałów izolacyjnych",
    description: "Zestawienie najpopularniejszych izolacji termicznych — styropian, wełna, XPS",
    products: ["Styropian EPS biały", "Styropian grafitowy", "Wełna mineralna", "XPS"],
    rows: [
      { parameter: "Lambda λ [W/(m·K)]", values: { "Styropian EPS biały": "0,040", "Styropian grafitowy": "0,031", "Wełna mineralna": "0,035", "XPS": "0,034" }, winner: "Styropian grafitowy" },
      { parameter: "Cena za m² (10 cm)", values: { "Styropian EPS biały": "15–25 zł", "Styropian grafitowy": "25–40 zł", "Wełna mineralna": "35–55 zł", "XPS": "45–70 zł" }, winner: "Styropian EPS biały" },
      { parameter: "Klasa ogniowa", values: { "Styropian EPS biały": "E (palny)", "Styropian grafitowy": "E (palny)", "Wełna mineralna": "A1 (niepalna)", "XPS": "E (palny)" }, winner: "Wełna mineralna" },
      { parameter: "Paroprzepuszczalność", values: { "Styropian EPS biały": "Niska", "Styropian grafitowy": "Niska", "Wełna mineralna": "Wysoka", "XPS": "Bardzo niska" }, winner: "Wełna mineralna" },
      { parameter: "Nasiąkliwość", values: { "Styropian EPS biały": "1–3%", "Styropian grafitowy": "1–3%", "Wełna mineralna": "Do 1%*", "XPS": "<0,3%" }, winner: "XPS" },
      { parameter: "Wytrzymałość na ściskanie", values: { "Styropian EPS biały": "70–100 kPa", "Styropian grafitowy": "70–100 kPa", "Wełna mineralna": "40–80 kPa", "XPS": "200–700 kPa" }, winner: "XPS" },
      { parameter: "Zastosowanie główne", values: { "Styropian EPS biały": "Elewacje (ETICS)", "Styropian grafitowy": "Elewacje premium", "Wełna mineralna": "Poddasza, ściany", "XPS": "Fundamenty, tarasy" } },
    ],
    recommendation: "**Styropian grafitowy** — najlepszy stosunek izolacyjności do ceny na elewacje. **Wełna mineralna** — obowiązkowa przy wymaganiach ppoż. i na poddasza. **XPS** — fundamenty i miejsca narażone na wodę.",
  },

  "tynki-elewacyjne": {
    title: "Porównanie tynków elewacyjnych",
    description: "Zestawienie typów tynków zewnętrznych — silikonowy, akrylowy, silikatowy, mineralny",
    products: ["Silikonowy", "Akrylowy", "Silikatowy", "Mineralny"],
    rows: [
      { parameter: "Cena za m²", values: { "Silikonowy": "40–60 zł", "Akrylowy": "25–40 zł", "Silikatowy": "35–50 zł", "Mineralny": "20–35 zł" }, winner: "Mineralny" },
      { parameter: "Trwałość", values: { "Silikonowy": "25+ lat", "Akrylowy": "15–20 lat", "Silikatowy": "20–25 lat", "Mineralny": "15–20 lat" }, winner: "Silikonowy" },
      { parameter: "Paroprzepuszczalność", values: { "Silikonowy": "Wysoka", "Akrylowy": "Niska", "Silikatowy": "Bardzo wysoka", "Mineralny": "Wysoka" }, winner: "Silikatowy" },
      { parameter: "Hydrofobowość", values: { "Silikonowy": "Bardzo wysoka", "Akrylowy": "Średnia", "Silikatowy": "Średnia", "Mineralny": "Niska" }, winner: "Silikonowy" },
      { parameter: "Odporność na glony", values: { "Silikonowy": "Bardzo wysoka", "Akrylowy": "Niska", "Silikatowy": "Wysoka", "Mineralny": "Średnia" }, winner: "Silikonowy" },
      { parameter: "Elastyczność", values: { "Silikonowy": "Wysoka", "Akrylowy": "Bardzo wysoka", "Silikatowy": "Niska", "Mineralny": "Niska" }, winner: "Akrylowy" },
      { parameter: "Na wełnę mineralną", values: { "Silikonowy": "✓ Tak", "Akrylowy": "✗ Nie", "Silikatowy": "✓ Tak", "Mineralny": "✓ Tak" } },
    ],
    recommendation: "**Tynk silikonowy** — najlepszy wybór na elewacje (trwałość + hydrofobowość). **Akrylowy** — ekonomiczna opcja na styropian. **Silikatowy** — na wełnę mineralną i budynki zabytkowe.",
  },

  "kleje-budowlane": {
    title: "Porównanie klejów do płytek",
    description: "Zestawienie klas klejów ceramicznych — C1, C2, C2 S1, C2 S2",
    products: ["C1 (standardowy)", "C2 (ulepszony)", "C2 S1 (elastyczny)", "C2 S2 (wysokoelastyczny)"],
    rows: [
      { parameter: "Przyczepność [MPa]", values: { "C1 (standardowy)": "≥0,5", "C2 (ulepszony)": "≥1,0", "C2 S1 (elastyczny)": "≥1,0", "C2 S2 (wysokoelastyczny)": "≥1,0" } },
      { parameter: "Odkształcalność [mm]", values: { "C1 (standardowy)": "—", "C2 (ulepszony)": "—", "C2 S1 (elastyczny)": "2,5–5", "C2 S2 (wysokoelastyczny)": ">5" }, winner: "C2 S2 (wysokoelastyczny)" },
      { parameter: "Cena za 25 kg", values: { "C1 (standardowy)": "25–35 zł", "C2 (ulepszony)": "40–55 zł", "C2 S1 (elastyczny)": "55–75 zł", "C2 S2 (wysokoelastyczny)": "70–100 zł" }, winner: "C1 (standardowy)" },
      { parameter: "Płytki wielkoformatowe", values: { "C1 (standardowy)": "✗ Nie", "C2 (ulepszony)": "✓ Do 60×60", "C2 S1 (elastyczny)": "✓ Do 120×120", "C2 S2 (wysokoelastyczny)": "✓ Bez limitu" } },
      { parameter: "Ogrzewanie podłogowe", values: { "C1 (standardowy)": "✗ Nie", "C2 (ulepszony)": "✗ Nie", "C2 S1 (elastyczny)": "✓ Tak", "C2 S2 (wysokoelastyczny)": "✓ Tak" } },
      { parameter: "Tarasy zewnętrzne", values: { "C1 (standardowy)": "✗ Nie", "C2 (ulepszony)": "✗ Nie", "C2 S1 (elastyczny)": "✓ Tak", "C2 S2 (wysokoelastyczny)": "✓ Tak" } },
    ],
    recommendation: "**C1** — małe płytki na stabilne podłoża wewnętrzne. **C2** — płytki średnie i duże. **C2 S1** — ogrzewanie podłogowe, wielkoformaty. **C2 S2** — tarasy, baseny, ekstremalnie duże płyty.",
  },

  "sucha-zabudowa": {
    title: "Porównanie płyt gipsowo-kartonowych",
    description: "Zestawienie typów płyt GK — standardowe, wodoodporne, ognioodporne",
    products: ["GKB (standardowa)", "GKBI (wodoodporna)", "GKF (ognioodporna)", "GKFI (wodo-ognioodporna)"],
    rows: [
      { parameter: "Kolor", values: { "GKB (standardowa)": "Szara", "GKBI (wodoodporna)": "Zielona", "GKF (ognioodporna)": "Różowa", "GKFI (wodo-ognioodporna)": "Zielono-różowa" } },
      { parameter: "Cena za m²", values: { "GKB (standardowa)": "12–18 zł", "GKBI (wodoodporna)": "18–25 zł", "GKF (ognioodporna)": "20–28 zł", "GKFI (wodo-ognioodporna)": "28–38 zł" }, winner: "GKB (standardowa)" },
      { parameter: "Nasiąkliwość", values: { "GKB (standardowa)": ">10%", "GKBI (wodoodporna)": "<10%", "GKF (ognioodporna)": ">10%", "GKFI (wodo-ognioodporna)": "<10%" }, winner: "GKBI (wodoodporna)" },
      { parameter: "Odporność ogniowa", values: { "GKB (standardowa)": "EI 15", "GKBI (wodoodporna)": "EI 15", "GKF (ognioodporna)": "EI 30–60", "GKFI (wodo-ognioodporna)": "EI 30–60" }, winner: "GKF (ognioodporna)" },
      { parameter: "Łazienki", values: { "GKB (standardowa)": "✗ Nie", "GKBI (wodoodporna)": "✓ Tak", "GKF (ognioodporna)": "✗ Nie", "GKFI (wodo-ognioodporna)": "✓ Tak" } },
      { parameter: "Klatki schodowe", values: { "GKB (standardowa)": "✗ Nie", "GKBI (wodoodporna)": "✗ Nie", "GKF (ognioodporna)": "✓ Tak", "GKFI (wodo-ognioodporna)": "✓ Tak" } },
    ],
    recommendation: "**GKB** — pokoje suche (sypialnie, salony). **GKBI** — łazienki, kuchnie. **GKF** — strefy pożarowe, klatki schodowe. **GKFI** — łazienki w strefach pożarowych.",
  },
};

// ─── Top 5 produktów per kategoria ──────────────────────────────────────────

export interface TopProduct {
  name: string;
  brand: string;
  slug: string;
  highlight: string;
}

export const CATEGORY_TOP_PRODUCTS: Record<string, TopProduct[]> = {
  "izolacje": [
    { name: "Swisspor Lambda White", brand: "Swisspor", slug: "swisspor-lambda-white-15cm", highlight: "Lambda 0,031 — najlepsza izolacyjność" },
    { name: "Rockwool Frontrock MAX E", brand: "Rockwool", slug: "rockwool-frontrock-max-e-15cm", highlight: "Niepalna wełna fasadowa A1" },
    { name: "Styropian Termonium Plus", brand: "Termonium", slug: "termonium-plus-grafitowy-15cm", highlight: "Grafitowy w dobrej cenie" },
    { name: "Austrotherm XPS TOP P GK", brand: "Austrotherm", slug: "austrotherm-xps-top-p-gk-10cm", highlight: "XPS na fundamenty" },
    { name: "Isover Super Mata", brand: "Isover", slug: "isover-super-mata-20cm", highlight: "Wełna szklana na poddasze" },
  ],
  "chemia-budowlana": [
    { name: "Atlas Stopter K-20", brand: "Atlas", slug: "atlas-stopter-k20-25kg", highlight: "Klej do styropianu #1 w Polsce" },
    { name: "Ceresit CM 17", brand: "Ceresit", slug: "ceresit-cm17-25kg", highlight: "Elastyczny klej do płytek" },
    { name: "Weber.therm S100", brand: "Weber", slug: "weber-therm-s100-25kg", highlight: "Klej ETICS premium" },
    { name: "Mapei Keraflex Maxi S1", brand: "Mapei", slug: "mapei-keraflex-maxi-s1-25kg", highlight: "Do płytek wielkoformatowych" },
    { name: "Sopro No.1 Flexible", brand: "Sopro", slug: "sopro-no1-flexible-25kg", highlight: "Klej na tarasy zewnętrzne" },
  ],
  "tynki-elewacyjne": [
    { name: "Caparol Amphisilan", brand: "Caparol", slug: "caparol-amphisilan-25kg", highlight: "Tynk silikonowy premium" },
    { name: "Weber.pas Silikon", brand: "Weber", slug: "weber-pas-silikon-25kg", highlight: "Najtrwalszy na rynku" },
    { name: "Ceresit CT 174", brand: "Ceresit", slug: "ceresit-ct174-25kg", highlight: "Silikatowo-silikonowy" },
    { name: "Baumit SilikonTop", brand: "Baumit", slug: "baumit-silikontop-25kg", highlight: "Hydrofobowy, odporny na glony" },
    { name: "Atlas Cermit SN", brand: "Atlas", slug: "atlas-cermit-sn-25kg", highlight: "Ekonomiczny silikonowy" },
  ],
  "sucha-zabudowa": [
    { name: "Knauf GKB 12,5 mm", brand: "Knauf", slug: "knauf-gkb-125mm", highlight: "Standardowa płyta #1" },
    { name: "Rigips PRO 12,5 mm", brand: "Rigips", slug: "rigips-pro-125mm", highlight: "Profesjonalna jakość" },
    { name: "Knauf Silentboard", brand: "Knauf", slug: "knauf-silentboard-125mm", highlight: "Najlepsza akustyka" },
    { name: "Rigips Glasroc H", brand: "Rigips", slug: "rigips-glasroc-h-125mm", highlight: "Wodoodporna do łazienek" },
    { name: "Knauf Fireboard", brand: "Knauf", slug: "knauf-fireboard-15mm", highlight: "Ognioodporna EI 90" },
  ],
  "plytki": [
    { name: "Paradyż Optimal Grafit", brand: "Paradyż", slug: "paradyz-optimal-grafit-60x60", highlight: "Gres techniczny #1" },
    { name: "Tubądzin Korzilius Wood", brand: "Tubądzin", slug: "tubadzin-korzilius-wood-20x120", highlight: "Imitacja drewna premium" },
    { name: "Cerrad Tassero", brand: "Cerrad", slug: "cerrad-tassero-60x120", highlight: "Wielkoformat w dobrej cenie" },
    { name: "Opoczno Quenos", brand: "Opoczno", slug: "opoczno-quenos-60x60", highlight: "Gres na taras R11" },
    { name: "Cersanit Livi", brand: "Cersanit", slug: "cersanit-livi-30x60", highlight: "Płytki łazienkowe bestseller" },
  ],
};

// ─── Eksport funkcji pomocniczych ───────────────────────────────────────────

/**
 * Pobiera definicję kategorii (lub rodzica jeśli podkategoria)
 */
export function getCategoryDefinition(slug: string, parentSlug?: string): string | null {
  return CATEGORY_DEFINITIONS[slug] || (parentSlug ? CATEGORY_DEFINITIONS[parentSlug] : null) || null;
}

/**
 * Pobiera FAQ dla kategorii (lub rodzica jeśli podkategoria)
 */
export function getCategoryFaqs(slug: string, parentSlug?: string): { q: string; a: string }[] {
  return CATEGORY_FAQS_EXTENDED[slug] || (parentSlug ? CATEGORY_FAQS_EXTENDED[parentSlug] : null) || [];
}

/**
 * Pobiera tabelę porównawczą dla kategorii
 */
export function getCategoryComparison(slug: string, parentSlug?: string): ComparisonTable | null {
  return CATEGORY_COMPARISONS[slug] || (parentSlug ? CATEGORY_COMPARISONS[parentSlug] : null) || null;
}

/**
 * Pobiera Top 5 produktów dla kategorii
 */
export function getCategoryTopProducts(slug: string, parentSlug?: string): TopProduct[] {
  return CATEGORY_TOP_PRODUCTS[slug] || (parentSlug ? CATEGORY_TOP_PRODUCTS[parentSlug] : null) || [];
}
// cache-bust 1781567980
