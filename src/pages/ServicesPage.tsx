import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { NAP_ADDRESS, NAP_GEO, NAP_HOURS, NAP_AREA_SERVED, NAP_CONTACT_POINT, NAP_SAME_AS } from "@/lib/localBusiness";
import { ChevronRight, ArrowRight, Phone, Check, Mail, Home, Zap, Hammer, Building2, Layers, HardHat, PenTool } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const card = { background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" } as const;
const cardHover = "hover:border-[#f81828]/30 hover:shadow-[0_8px_32px_rgba(248,24,40,0.10)] transition-all duration-300";

/* ── Typy ── */
type FaqItem = { q: string; a: string };

type ServiceDetail = {
  slug: string;
  segment: "B2C" | "B2B" | "Oba";
  title: string;
  icon: ReactNode;
  badge: string;
  krotkiOpis: string;
  frazySEO: string[];
  parametry: string[];
  zastosowanie: string[];
  zalety: string[];
  korzysci: string[];
  ostrzezenia?: string[];
};

/* ── Dane usług Media Bud ── */
const services: ServiceDetail[] = [
  /* ---- B2C: Parasol ---- */
  {
    slug: "dom-od-podstaw",
    segment: "B2C",
    title: "Dom od podstaw",
    icon: <Home className="w-7 h-7 text-[#f81828]" />,
    badge: "Flagowy program · Lublin i woj. lubelskie",
    krotkiOpis:
      "Powiedz nam, co chcesz zbudować — my zadbamy o resztę. Projekt, pozwolenie, stan surowy, wykończenie. Jeden telefon, jeden opiekun, jedna cena końcowa. Bez niespodzianek.",
    frazySEO: ["budowa domu lublin", "dom pod klucz lublin", "budowa domu od podstaw lublin"],
    parametry: [
      "Zakres: projekt + pozwolenie + stan surowy + instalacje + wykończenie",
      "Obszar obsługi: Lublin i woj. lubelskie (do 60 km od składu)",
      "Rozliczenie: kosztorys etapowy z harmonogramem płatności",
      "Opiekun: dedykowany kierownik budowy przez cały projekt",
    ],
    zastosowanie: [
      "Pierwsza budowa — prowadzimy przez cały proces krok po kroku",
      "Domy jednorodzinne wolnostojące i bliźniacze",
      "Budynki rekreacyjne i letniskowe",
    ],
    zalety: [
      "Jeden człowiek odpowiada za całość — koniec z przepychaniem odpowiedzialności",
      "Materiały z własnego składu — realnie taniej niż u konkurencji",
      "Kosztorys otwarty — widzisz każdą złotówkę, nie ma ukrytych kosztów",
      "15 lat doświadczenia i 500+ zrealizowanych projektów w regionie",
    ],
    korzysci: [
      "Nie musisz koordynować 6 różnych firm — my to robimy",
      "Jeden rachunek zamiast stosu faktur od różnych wykonawców",
      "Gwarancja wykonawcza MediaBud na cały zakres prac",
    ],
  },
  /* ---- B2C ---- */
  {
    slug: "budowa-domu",
    segment: "B2C",
    title: "Budowa domu",
    icon: <HardHat className="w-7 h-7 text-[#f81828]" />,
    badge: "Stan surowy · Instalacje · Lublin",
    krotkiOpis:
      "Stan surowy bez kompromisów — fundamenty, ściany, stropy, dach, okna. Wiesz dokładnie, ile zapłacisz, zanim zaczniemy. Ekipa własna, materiały z naszego magazynu.",
    frazySEO: ["budowa domu lublin", "stan surowy lublin", "ekipa budowlana lublin"],
    parametry: [
      "Etapy: fundamenty → stan surowy otwarty → stan surowy zamknięty",
      "Technologie: mur tradycyjny, pustak ceramiczny, szkielet drewniany",
      "Instalacje: wod-kan, elektryka, gaz (z gwarancją podwykonawcy)",
      "Obszar: Lublin i powiat lubelski",
    ],
    zastosowanie: [
      "Nowe domy jednorodzinne i bliźniaki na działce własnej klienta",
      "Rozbudowy i nadbudowy istniejących budynków",
    ],
    zalety: [
      "Własna ekipa budowlana — żadnych przypadkowych podwykonawców",
      "Materiały renomowanych marek (Ytong, Wienerberger, Lafarge) z magazynu",
      "Przejrzysty kosztorys etapowy — bez zaskoczeń w rachunku końcowym",
    ],
    korzysci: [
      "Ponad 500 ukończonych budów potwierdza naszą terminowość",
      "3 lata gwarancji wykonawczej na stan surowy",
      "Dostawa materiałów bezpośrednio na plac budowy — zero przestojów",
    ],
  },
  {
    slug: "remont-lazienki",
    segment: "B2C",
    title: "Remont łazienki",
    icon: <PenTool className="w-7 h-7 text-[#f81828]" />,
    badge: "Najpopularniejsza usługa · Pod klucz",
    krotkiOpis:
      "Stara glazura, cieknący prysznic, za mała przestrzeń? Robimy łazienki od A do Z — skucie, nowe instalacje, płytki, armatura, oświetlenie. Wchodzisz po kluczu, wszystko gotowe.",
    frazySEO: ["remont łazienki lublin", "łazienka pod klucz lublin", "remont łazienki cena lublin"],
    parametry: [
      "Zakres: skucie + instalacje wod-kan + glazura + malowanie + armatura",
      "Czas realizacji: 10–20 dni roboczych (typowa łazienka 5–8 m²)",
      "Materiały: z magazynu MediaBud lub wg własnego wyboru klienta",
      "Gwarancja: 2 lata na całość + 5 lat na szczelność instalacji",
    ],
    zastosowanie: [
      "Łazienki w domach jednorodzinnych i mieszkaniach",
      "Wykończenie nowego mieszkania deweloperskiego",
      "Modernizacja starej łazienki z lat 80. i 90.",
    ],
    zalety: [
      "Jeden wykonawca od projektu po armaturę — koniec z szukaniem kaflarza i hydraulika z osobna",
      "Płytki, kleje, fugi, farby — wszystko z własnego składu MediaBud",
      "Projekt wizualizacji 2D w cenie usługi — widzisz efekt przed rozpoczęciem",
    ],
    korzysci: [
      "Łazienka gotowa w maks. 3 tygodnie bez angażowania Twojego czasu",
      "Rozliczenie etapowe — płacisz za wykonaną robotę, nie z góry",
      "Szczelność instalacji gwarantowana przez 5 lat",
    ],
  },
  {
    slug: "termomodernizacja",
    segment: "B2C",
    title: "Termomodernizacja",
    icon: <Zap className="w-7 h-7 text-[#f81828]" />,
    badge: "Czyste Powietrze · Do 136 200 zł dotacji",
    krotkiOpis:
      "Dom traci ciepło przez ściany, dach i okna. Zatrzymujemy je raz na 25 lat — i pomagamy dostać dotację z programu Czyste Powietrze. Mniej płacisz za ciepło, dom wart więcej.",
    frazySEO: ["termomodernizacja lublin", "ocieplenie budynku lublin", "czyste powietrze lublin dofinansowanie"],
    parametry: [
      "System ociepleń: ETICS — styropian EPS lub wełna mineralna",
      "Izolacja: 15–25 cm grubości, dobór wg audytu energetycznego",
      "Dofinansowanie: Czyste Powietrze (do 136 200 zł), Mój Prąd, BOCIAN",
      "Obszar: Lublin i całe woj. lubelskie",
    ],
    zastosowanie: [
      "Domy wybudowane przed 2000 r. z wysokimi rachunkami za ogrzewanie",
      "Budynki wielorodzinne (małe wspólnoty do 5 lokali)",
    ],
    zalety: [
      "Kompleksowo: ocieplenie + elewacja + okna w jednym kontrakcie i jednej cenie",
      "Pomagamy złożyć wniosek o dotację i rozliczyć ją — od początku do wypłaty",
      "Audyt energetyczny przed i po modernizacji — masz czarno na białym wynik",
    ],
    korzysci: [
      "Rachunki za ogrzewanie niższe o 30–50% rok do roku",
      "Dom wart więcej na rynku po termomodernizacji",
      "Komfort przez cały rok — ani za gorąco latem, ani za zimno zimą",
    ],
    ostrzezenia: [
      "Prace wymagają wcześniejszego audytu energetycznego budynku",
      "Optymalny termin realizacji: kwiecień–październik (poza sezonem grzewczym)",
    ],
  },
  {
    slug: "pompa-ciepla-fotowoltaika",
    segment: "B2C",
    title: "Pompa ciepła + fotowoltaika",
    icon: <Zap className="w-7 h-7 text-[#f81828]" />,
    badge: "OZE · Niezależność energetyczna",
    krotkiOpis:
      "Ogrzewasz dom prądem, który sam produkujesz. Pompa ciepła + panele fotowoltaiczne to dziś najlepsza inwestycja w dom — pomagamy przeprowadzić ją od A do Z, z dotacją.",
    frazySEO: ["pompa ciepła lublin", "fotowoltaika lublin", "OZE Lublin dofinansowanie"],
    parametry: [
      "Pompy ciepła: powietrzne i gruntowe, moc 6–22 kW",
      "Fotowoltaika: systemy 3–15 kWp, panele premium (Longi, Jinko)",
      "Integracja: PV + pompa ciepła + bufor ciepła + zarządzanie energią",
      "Dofinansowanie: Czyste Powietrze, Mój Prąd 6.0, premia za magazyn energii",
    ],
    zastosowanie: [
      "Nowe domy — montaż podczas budowy lub wykończenia",
      "Istniejące domy po termomodernizacji lub bez",
      "Wymiana starego kotła gazowego lub węglowego",
    ],
    zalety: [
      "Kompletna instalacja z montażem, rozruchem i konfiguracją",
      "Pomagamy uzyskać dotację — wypełniamy wniosek razem z Tobą",
      "Serwis i przeglądy gwarancyjne na terenie Lublina i woj. lubelskiego",
    ],
    korzysci: [
      "Rachunki za ogrzewanie praktycznie do zera — prąd produkujesz sam",
      "Zwrot z inwestycji w 6–10 lat, potem zysk przez kolejne 20 lat",
      "Niezależność od cen gazu i węgla — nieważne co się dzieje na rynku",
    ],
    ostrzezenia: [
      "Pompa gruntowa wymaga wcześniejszego badania geotechnicznego działki",
      "Montaż PV: ocena zacienienia dachu przed zakupem instalacji",
    ],
  },
  {
    slug: "wykonczenia-pod-klucz",
    segment: "B2C",
    title: "Wykończenia pod klucz",
    icon: <Hammer className="w-7 h-7 text-[#f81828]" />,
    badge: "Wnętrza · Stan deweloperski → do życia",
    krotkiOpis:
      "Bierzemy Twój stan surowy lub deweloperski i oddajemy gotowy dom do życia. Tynki, podłogi, glazura, malowanie, łazienki, kuchnia — jedna ekipa, jeden kosztorys, bez chaosu.",
    frazySEO: ["wykończenie wnętrz lublin", "wykończenie pod klucz lublin", "stan deweloperski lublin"],
    parametry: [
      "Zakres: tynki maszynowe, posadzki, glazura, malowanie, zabudowy G-K",
      "Łazienki i kuchnie: instalacje + glazura + armatura w jednym",
      "Materiały: Knauf, Mapei, Atlas — z magazynu MediaBud lub własne",
      "Czas: ok. 4–8 tygodni na 100 m² w zależności od standardu",
    ],
    zastosowanie: [
      "Nowe domy po stanie surowym i zamkniętym",
      "Mieszkania deweloperskie do wykończenia",
      "Generalne remonty starszych nieruchomości",
    ],
    zalety: [
      "Jeden wykonawca od pierwszej do ostatniej ściany — zero chaosu koordynacyjnego",
      "Materiały z naszego magazynu — bez opóźnień, bo mamy je na stanie",
      "Projekt wykończenia z wizualizacją w cenie usługi",
    ],
    korzysci: [
      "Dom gotowy do zamieszkania bez Twojego codziennego nadzoru na budowie",
      "2 lata gwarancji na wszystkie roboty wykończeniowe",
      "Trzy standardy do wyboru: ekonomiczny, standard, premium",
    ],
  },
  {
    slug: "male-domy",
    segment: "B2C",
    title: "Małe domy i domki",
    icon: <Home className="w-7 h-7 text-[#f81828]" />,
    badge: "Do 35 m² bez pozwolenia · Szybka realizacja",
    krotkiOpis:
      "Dom do 35 m² budujesz bez pozwolenia, w 6–10 tygodni, za ułamek ceny tradycyjnej budowy. Rewelacyjny wybór na działkę rekreacyjną, starter dla młodych lub domek letniskowy.",
    frazySEO: ["mały dom lublin", "dom do 35m2 bez pozwolenia", "domek letniskowy lublin"],
    parametry: [
      "Do 35 m²: budowa na zgłoszenie, bez pozwolenia na budowę",
      "Do 70 m²: uproszczona procedura administracyjna",
      "Technologia: szkielet drewniany lub moduły prefabrykowane",
      "Czas realizacji: 4–10 tygodni od decyzji",
    ],
    zastosowanie: [
      "Działki rekreacyjne i ogrodnicze",
      "Starter home — własny kąt bez wieloletnich kredytów",
      "Dodatkowy domek na wynajem krótkoterminowy (AirBnB)",
    ],
    zalety: [
      "Niska cena całości dzięki prefabrykacji i standarda­zacji",
      "Ekspresowy montaż — nie czekasz lat na własne M",
      "Do wyboru: stan surowy lub gotowy do zamieszkania",
    ],
    korzysci: [
      "Zero formalności z pozwoleniem przy domku do 35 m²",
      "Niskie koszty eksploatacji — małe powierzchnie to małe rachunki",
      "Możliwość rozbudowy w przyszłości bez burzenia całości",
    ],
  },
  {
    slug: "adaptacja-poddaszy",
    segment: "B2C",
    title: "Adaptacja poddaszy",
    icon: <Layers className="w-7 h-7 text-[#f81828]" />,
    badge: "Nowe metry bez rozbudowy · B2C",
    krotkiOpis:
      "Masz puste poddasze nad głową? Zamieniamy je w pełnowartościową sypialnię, gabinet lub pokój dla dzieci. Bez kosztownej rozbudowy — zyskujesz metry, które już masz.",
    frazySEO: ["adaptacja poddasza lublin", "poddasze użytkowe lublin", "remont poddasza lublin"],
    parametry: [
      "Izolacja termiczna dachu: wełna mineralna 20–25 cm",
      "Okna dachowe: Velux lub Fakro — montaż z pełną obróbką",
      "Zabudowy G-K: ściany, sufit podwieszany, wykończenie skosów",
      "Formalności: w razie potrzeby obsługujemy zmianę sposobu użytkowania",
    ],
    zastosowanie: [
      "Domy jednorodzinne z dachem dwu- lub wielospadowym",
      "Starsze budynki z nieużytkową przestrzenią na strychu",
    ],
    zalety: [
      "Nowe metry kwadratowe bez kosztów rozbudowy bocznej ani nadbudowy",
      "Projekt wnętrza poddasza z wizualizacją w cenie usługi",
      "Możliwość połączenia z termomodernizacją dachu — jedno rusztowanie, niższy koszt",
    ],
    korzysci: [
      "Dom wart 15–25% więcej po adaptacji poddasza",
      "Nowy pokój dla rodziny bez konieczności przeprowadzki lub dokupowania mieszkania",
    ],
  },
  /* ---- Oba ---- */
  {
    slug: "dachy",
    segment: "Oba",
    title: "Dachy",
    icon: <Layers className="w-7 h-7 text-[#ff6b35]" />,
    badge: "Nowe dachy · Naprawy · 5 lat gwarancji",
    krotkiOpis:
      "Nowy dach lub naprawa przecieku? Działamy w całym woj. lubelskim — dachówka ceramiczna, blacha, papa termozgrzewalna. Robimy dachy dla domów i dużych obiektów. Gwarancja 5 lat na szczelność.",
    frazySEO: ["pokrycia dachowe lublin", "remont dachu lublin", "dekarstwo lublin woj lubelskie"],
    parametry: [
      "Pokrycia: dachówka ceramiczna i betonowa, blachodachówka, blacha płaska",
      "Stropodachy: papa termozgrzewalna dwuwarstwowa",
      "Orynnowanie: PVC, tytan-cynk, ocynk — pełna obróbka blacharska",
      "Izolacja: wełna mineralna, membrana dachowa, folia paroizolacyjna",
    ],
    zastosowanie: [
      "Domy jednorodzinne — nowy dach lub wymiana starego pokrycia",
      "Hale, magazyny i obiekty przemysłowe",
      "Szkoły, urzędy i inne budynki użyteczności publicznej",
    ],
    zalety: [
      "Własna ekipa dekarska — nie oddajemy roboty przypadkowym podwykonawcom",
      "Materiały renomowanych marek z naszego magazynu (Creaton, Ruukki, Fakro)",
      "5 lat gwarancji na szczelność — na piśmie",
    ],
    korzysci: [
      "Jeden kontrakt: pokrycie + obróbki blacharskie + orynnowanie",
      "Szybka diagnoza i naprawa aktywnych przecieków — działamy bez zbędnych formalności",
      "Ten sam standard dla domu i dużego obiektu",
    ],
    ostrzezenia: [
      "Prace dachowe wyłącznie w temperaturach powyżej +5°C",
      "Papa zgrzewalna: nie stosować przy silnym wietrze powyżej 10 m/s",
    ],
  },
  {
    slug: "elewacje",
    segment: "Oba",
    title: "Elewacje",
    icon: <Building2 className="w-7 h-7 text-[#ff6b35]" />,
    badge: "Tynk · Klinkier · Ocieplenie ETICS",
    krotkiOpis:
      "Dom ocieplamy i wykańczamy wizualnie w jednym projekcie — tynk cienkowarstwowy, klinkier lub elewacja wentylowana. Efekt estetyczny na 20 lat, możliwa dotacja z Czystego Powietrza.",
    frazySEO: ["elewacja budynku lublin", "tynk elewacyjny lublin", "ocieplenie elewacji lublin etics"],
    parametry: [
      "Systemy: ETICS ze styropianem lub wełną + tynk cienkowarstwowy",
      "Tynki: akrylowy, silikonowy, silikatowy, mozaikowy (Ceresit, Caparol, Weber)",
      "Elewacja klinkierowa: płytki klinkierowe na siatce zbrojonej",
      "Elewacja wentylowana: okładziny ceramiczne, kompozytowe, HPL",
    ],
    zastosowanie: [
      "Nowe budynki — elewacja podczas trwania budowy",
      "Renowacja zniszczonych elewacji (pęknięcia, odpryski, grzyb, zacieki)",
      "Obiekty komercyjne i usługowe",
    ],
    zalety: [
      "Ocieplenie + wykończenie wizualne + cokół w jednym kontrakcie — taniej i szybciej",
      "Dobieramy system do orientacji budynku i lokalnego klimatu",
      "Powłoki silikonowe i silikatowe trzymają efekt nawet 20 lat",
    ],
    korzysci: [
      "Lepsza izolacja termiczna + nowy wygląd domu w jednej inwestycji",
      "Możliwość dofinansowania z programu Czyste Powietrze",
      "Elewacja samooczyszczająca — brud spływa z deszczem, dom wygląda świeżo",
    ],
  },
  /* ---- B2B ---- */
  {
    slug: "remonty-b2b",
    segment: "B2B",
    title: "Remonty dla firm",
    icon: <Building2 className="w-7 h-7 text-[#ff6b35]" />,
    badge: "Firmy · Instytucje · Bez przestojów",
    krotkiOpis:
      "Prowadzisz firmę lub instytucję? Remontujemy sklepy, szkoły, biura i hale — w godzinach Twojej działalności lub nocą i w weekendy. Minimum przestojów dla Ciebie, pełna dokumentacja dla księgowości.",
    frazySEO: ["remont obiektu lublin", "remonty dla firm lublin", "modernizacja budynku firma lublin"],
    parametry: [
      "Zakres: posadzki przemysłowe, ściany, sufity podwieszane, instalacje",
      "Harmonogram: dopasowany do godzin pracy lub działalności klienta",
      "Przetargi: doświadczenie w postępowaniach PZP i zamówieniach publicznych",
      "Obszar: Lublin i woj. lubelskie",
    ],
    zastosowanie: [
      "Sklepy, galerie handlowe i lokale usługowe",
      "Szkoły, przedszkola i obiekty oświatowe",
      "Urzędy, biura i instytucje publiczne",
      "Hale produkcyjne, magazyny i zakłady przemysłowe",
    ],
    zalety: [
      "Robimy w nocy i w weekendy — Twoja firma nie traci ani jednego dnia pracy",
      "Pełna dokumentacja powykonawcza i gwarancyjna dla działu technicznego",
      "Faktura z 30-dniowym terminem płatności — standard, bez negocjacji",
    ],
    korzysci: [
      "Twoja firma działa normalnie, my remontujemy w tle",
      "Jeden wykonawca na wiele zakresów — mniej umów, mniej problemów",
      "Mamy referencje z obiektów publicznych — audyt nie będzie problemem",
    ],
  },
];


function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{ background: "#0f0f0f", border: open === i ? "1px solid rgba(248,24,40,0.4)" : "1px solid #1a1a1a" }}
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-bold text-white leading-snug">{item.q}</span>
            <ChevronRight
              className="w-4 h-4 text-[#f81828] flex-shrink-0 transition-transform duration-200"
              style={{ transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-[#aaa] leading-relaxed border-t border-white/5 pt-3">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const generalFaq: FaqItem[] = [
  { q: "Czy MediaBud łączy sprzedaż materiałów z usługami wykonawczymi?", a: "Tak. To główny wyróżnik tej sekcji — MediaBud łączy rolę składu budowlanego, doradcy technicznego i organizatora wykonawstwa dla inwestycji B2C oraz B2B w Lublinie i województwie lubelskim." },
  { q: "Czy w ofercie są usługi dla klientów indywidualnych i firm?", a: "Tak. Oferta została podzielona na segmenty B2C, B2B i usługi wspólne. Klienci indywidualni mogą skorzystać m.in. z programu Dom od podstaw, budowy domu, termomodernizacji i wykończeń pod klucz, a firmy z remontów B2B i usług wspólnych, takich jak dachy czy elewacje." },
  { q: "Czy MediaBud pomaga przy termomodernizacji z programem Czyste Powietrze?", a: "MediaBud wspiera przygotowanie inwestycji materiałowo i wykonawczo, ale nie deklaruje automatycznego uzyskania dotacji. W researchu wskazano dofinansowanie do 136 200 zł oraz możliwość prefinansowania do 35% w określonych przypadkach, jednak każdy wniosek i zakres prac trzeba potwierdzić indywidualnie." },
  { q: "Czy można zamówić samą usługę albo same materiały?", a: "Zakres współpracy jest elastyczny. W zależności od usługi MediaBud może przygotować wycenę materiałów, wskazać sprawdzonych fachowców albo przeprowadzić klienta przez szerszy proces realizacji." },
  { q: "Jak zgłosić zapytanie o usługę w Lublinie?", a: "Najprościej zadzwonić pod +48 533 553 344, napisać na sprzedaz@mediabud.pl albo odwiedzić MediaBud przy ul. Chemicznej 8, 20-329 Lublin. W zapytaniu warto podać lokalizację, typ obiektu, zakres robót i oczekiwany termin." }
];

function ServiceSection({ title, items, accent = "#f81828" }: { title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl p-5 md:p-6" style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", boxShadow: "0 16px 40px rgba(0,0,0,0.28)" }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: accent, boxShadow: `0 0 16px ${accent}66` }} />
        <h3 className="text-[0.95rem] md:text-[1rem] font-black uppercase tracking-[0.22em] text-white break-words" style={{ overflowWrap: "anywhere" }}>{title}</h3>
      </div>
      <ul className="grid gap-3">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="flex items-start gap-3 text-sm leading-relaxed text-[#d7d7d7]">
            <Check className="w-4 h-4 text-[#f81828] flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceTile({ svc }: { svc: ServiceDetail }) {
  return (
    <Link
      to={`/uslugi/${svc.slug}`}
      className="group rounded-2xl p-5 md:p-6 flex flex-col min-h-[260px] transition-all duration-300"
      style={{ background: "#0f0f0f", border: "1px solid #2d2d2d", boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.24)" }}>
          {svc.icon}
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1.5 rounded-full text-white border" style={{ borderColor: svc.segment === "B2B" ? "rgba(255,107,53,0.35)" : "rgba(248,24,40,0.35)", color: svc.segment === "B2B" ? "#ff6b35" : "#f81828", background: svc.segment === "B2B" ? "rgba(255,107,53,0.08)" : "rgba(248,24,40,0.08)" }}>
          {svc.segment}
        </div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#888] mb-2 break-words" style={{ overflowWrap: "anywhere" }}>{svc.badge}</p>
      <h2 className="font-display text-[1.25rem] md:text-[1.45rem] font-black uppercase leading-[1.05] tracking-[0.01em] text-white mb-3 break-words" style={{ overflowWrap: "anywhere" }}>
        {svc.title}
      </h2>
      <p className="text-sm leading-relaxed text-[#b7b7b7] flex-1">{svc.krotkiOpis}</p>
      <div className="mt-5 pt-5 border-t border-[#1f1f1f] flex items-center justify-between gap-4">
        <span className="text-[11px] uppercase tracking-[0.22em] text-[#888]">/uslugi/{svc.slug}</span>
        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#f81828]">Zobacz usługę <ArrowRight className="w-4 h-4" /></span>
      </div>
    </Link>
  );
}

function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      <div className="relative overflow-hidden border-b border-[#1a1a1a]" style={{ background: "linear-gradient(180deg,#0a0a0a 0%,#050505 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "42px 42px" }} />
        <div className="absolute inset-y-0 left-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 18px rgba(248,24,40,0.45)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.22) 55%,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-9 py-12 md:py-16">
          <Link to="/uslugi" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.26em] text-[#888] hover:text-white transition-colors mb-5">
            <ChevronRight className="w-4 h-4 rotate-180" /> Wszystkie usługi
          </Link>
          <div className="max-w-5xl grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.28em] px-3 py-1.5 rounded-full border text-[#f81828] border-[#f81828]/30 bg-[#f81828]/10">{service.segment}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#888]">MediaBud · Lublin / lubelskie</span>
              </div>
              <h1 className="font-display font-black uppercase text-white leading-[0.92] break-words mb-5" style={{ fontSize: "clamp(2.25rem,6vw,4.5rem)", overflowWrap: "anywhere" }}>
                {service.title}
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#d7d7d7] max-w-3xl">
                {service.krotkiOpis}
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", boxShadow: "0 20px 44px rgba(0,0,0,0.35)" }}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.22)" }}>
                  {service.icon}
                </div>
                {/* Frazy SEO — ukryte z UI, tylko metadata */}
                <div style={{ display:"none" }}>
                  <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#888]">Frazy lokalne</p>
                  <p className="text-sm text-white font-semibold">Lublin · woj. lubelskie</p>
                </div>
              </div>
              {/* frazySEO hidden */}
              <div className="space-y-3">
                <a href="tel:+48533553344" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-[0.2em] text-white transition-colors" style={{ background: "#f81828", boxShadow: "0 14px 32px rgba(248,24,40,0.22)" }}>
                  <Phone className="w-4 h-4" /> Zadzwoń
                </a>
                <Link to="/kontakt" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-[0.2em] text-white border border-[#2d2d2d] bg-[#050505]">
                  <Mail className="w-4 h-4 text-[#ff6b35]" /> {service.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-14 space-y-8">
        <div className="rounded-2xl p-6 md:p-8" style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", boxShadow: "0 18px 40px rgba(0,0,0,0.28)" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f81828]" style={{ boxShadow: "0 0 14px rgba(248,24,40,0.55)" }} />
            <h2 className="text-[0.95rem] font-black uppercase tracking-[0.24em] text-white">Długi opis</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-[#d7d7d7]">{service.dlugiOpis}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ServiceSection title="Parametry techniczne" items={service.parametry} />
          <ServiceSection title="Zastosowanie" items={service.zastosowanie} accent="#ff6b35" />
          <ServiceSection title="Zalety" items={service.zalety} />
          <ServiceSection title="Korzyści" items={service.korzysci} accent="#ff6b35" />
          <div className="lg:col-span-2">
            <ServiceSection title="Ostrzeżenia" items={service.ostrzezenia} accent="#f81828" />
          </div>
        </div>

        <div className="rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.10),rgba(255,107,53,0.07))", border: "1px solid rgba(248,24,40,0.18)", boxShadow: "0 18px 44px rgba(0,0,0,0.32)" }}>
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-2">Kontakt wykonawczy</p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black uppercase leading-[0.94] text-white break-words mb-3" style={{ overflowWrap: "anywhere" }}>
                MediaBud — ul. Chemiczna 8d, 20-329 Lublin
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[#e6e6e6]">Zadzwoń, wyślij zakres prac lub odwiedź skład. Przygotujemy wycenę, dobierzemy system materiałowy i zaproponujemy ścieżkę realizacji dopasowaną do segmentu {service.segment}.</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[240px]">
              <a href="tel:+48533553344" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-[0.18em] text-white" style={{ background: "#f81828", boxShadow: "0 12px 30px rgba(248,24,40,0.25)" }}>
                <Phone className="w-4 h-4" /> +48 533 553 344
              </a>
              <a href="mailto:sprzedaz@mediabud.pl" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-[0.18em] text-white border border-[#2d2d2d] bg-[#0a0a0a]">
                <Mail className="w-4 h-4 text-[#ff6b35]" /> sprzedaz@mediabud.pl
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const { slug } = useParams<{ slug?: string }>();

  const service = slug ? services.find((item) => item.slug === slug) : null;
  const b2cServices = services.filter((item) => item.segment === "B2C" && item.slug !== "dom-od-podstaw");
  const mixedServices = services.filter((item) => item.segment === "Oba");
  const b2bServices = services.filter((item) => item.segment === "B2B");
  const umbrellaService = services.find((item) => item.slug === "dom-od-podstaw");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
          { "@type": "ListItem", "position": 2, "name": "Usługi",         "item": "https://mediabud.pl/uslugi" },
        ],
      },
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": "https://mediabud.pl/#localbusiness",
        "name": "MediaBud — usługi wykonawcze i materiały budowlane",
        "legalName": "Media Bud",
        "description": "Usługi wykonawcze MediaBud w Lublinie: budowa domów, termomodernizacja, wykończenia pod klucz, dachy, elewacje, remonty B2B i adaptacja poddaszy.",
        "url": "https://mediabud.pl",
        "telephone": "+48533553344",
        "email": "sprzedaz@mediabud.pl",
        "taxID": "9462743421",
        "vatID": "9462743421",
        "address": NAP_ADDRESS,
        "geo": NAP_GEO,
        "openingHoursSpecification": NAP_HOURS,
        "priceRange": "$$",
        "currenciesAccepted": "PLN",
        "paymentAccepted": "Gotówka, przelew bankowy, karta płatnicza, faktura VAT",
        "areaServed": NAP_AREA_SERVED,
        "contactPoint": NAP_CONTACT_POINT,
        "sameAs": NAP_SAME_AS,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Usługi wykonawcze MediaBud",
          "itemListElement": services.map((item) => ({
            "@type": "Offer",
            "name": item.title,
            "category": item.segment,
            "areaServed": "Lublin i województwo lubelskie",
          })),
        },
      },
    ],
  };

  if (slug && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#050505" }}>
        <div className="max-w-xl w-full rounded-2xl p-8 text-center" style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-3">404 · usługa</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase text-white leading-[0.95] break-words mb-4" style={{ overflowWrap: "anywhere" }}>Nie znaleźliśmy tej podstrony</h1>
          <p className="text-sm leading-relaxed text-[#b7b7b7] mb-6">Sprawdź listę usług wykonawczych MediaBud lub skontaktuj się z nami, jeśli chcesz wycenić niestandardowy zakres prac w Lublinie i województwie lubelskim.</p>
          <Link to="/uslugi" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-[0.2em] text-white" style={{ background: "#f81828" }}>
            <ArrowRight className="w-4 h-4" /> Zobacz wszystkie usługi
          </Link>
        </div>
      </div>
    );
  }

  if (service) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ServiceDetailPage service={service} />
      </>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative overflow-hidden border-b border-[#1a1a1a]" style={{ background: "linear-gradient(180deg,#0a0a0a 0%,#050505 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "42px 42px" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.22) 55%,transparent)" }} />
        <div className="absolute inset-y-0 left-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 18px rgba(248,24,40,0.45)" }} />
        <div className="relative container mx-auto px-4 pl-9 py-12 md:py-16">
          <div className="max-w-5xl grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-4">Media Bud · Lublin i woj. lubelskie</p>
              <h1 className="font-display font-black uppercase text-white leading-[0.9] break-words mb-5" style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", overflowWrap: "anywhere" }}>
                Budujesz lub remontujesz?
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#d7d7d7] max-w-3xl">Masz projekt, pomysł lub problem budowlany — my mamy materiały, ekipę i doświadczenie. Media Bud to skład budowlany i firma wykonawcza w jednym: kupujesz i budujesz u jednego sprawdzonego partnera w Lublinie.</p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", boxShadow: "0 20px 44px rgba(0,0,0,0.35)" }}>
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#888] mb-3">Media Bud w liczbach</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "15+",    label: "lat na rynku",          accent: "#f81828" },
                  { value: "500+",   label: "projektów wykonanych",   accent: "#f81828" },
                  { value: "50+",    label: "marek w ofercie",        accent: "#ff6b35" },
                  { value: "16 000+",label: "produktów w magazynie",  accent: "#ff6b35" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4 border border-[#1f1f1f] bg-[#0a0a0a]" style={{ borderLeft: `2px solid ${item.accent}` }}>
                    <div className="font-display font-black text-white mb-0.5" style={{ fontSize: "1.55rem", color: item.accent }}>{item.value}</div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#888]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-14 space-y-10">
        {umbrellaService ? (
          <div className="rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.12),rgba(255,107,53,0.05))", border: "1px solid rgba(248,24,40,0.18)", boxShadow: "0 18px 44px rgba(0,0,0,0.32)" }}>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-3">Parasol B2C</p>
                <h2 className="font-display text-[clamp(1.9rem,4vw,3.4rem)] font-black uppercase leading-[0.94] text-white break-words mb-4" style={{ overflowWrap: "anywhere" }}>{umbrellaService.title}</h2>
                <p className="text-sm md:text-base leading-relaxed text-[#e6e6e6] mb-5">{umbrellaService.krotkiOpis}</p>
                <div className="flex flex-wrap gap-2">
                  {/* frazySEO hidden */ umbrellaService.frazySEO.slice(0,0).map((phrase) => (
                    <span key={phrase} className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] text-white border border-[#2d2d2d] bg-[#0a0a0a]">{phrase}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-[0.18em] text-white border border-[#2d2d2d] bg-[#0a0a0a]">
                  <ArrowRight className="w-4 h-4 text-[#ff6b35]" /> Sekcja #dom-od-podstaw na stronie głównej
                </Link>
                <Link to={`/uslugi/${umbrellaService.slug}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-[0.18em] text-white" style={{ background: "#f81828" }}>
                  <Phone className="w-4 h-4" /> Zobacz podstronę programu
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-2">Dla Ciebie · B2C</p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Budujesz lub remontujesz prywatnie?</h2>
            </div>
            <p className="text-sm text-[#888] max-w-2xl">Dom od zera, remont łazienki, pompa ciepła, małe domy, adaptacja poddasza — wszystko w Lublinie i woj. lubelskim z materiałami z własnego składu.</p>
          </div>
          <div className="grid xl:grid-cols-2 gap-5">
            {b2cServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ff6b35] mb-2">Domy i obiekty · B2C / B2B</p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Dach i elewacja — dla domu i firmy</h2>
            </div>
            <p className="text-sm text-[#888] max-w-2xl">Dachy i elewacje to roboty, które robimy zarówno dla prywatnych inwestorów, jak i dla firm, szkół czy obiektów komercyjnych. Jeden standard jakości, niezależnie od skali.</p>
          </div>
          <div className="grid xl:grid-cols-2 gap-5">
            {mixedServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ff6b35] mb-2">Dla Twojej firmy · B2B</p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Twoja firma potrzebuje remontu?</h2>
            </div>
            <p className="text-sm text-[#888] max-w-2xl">Robimy remonty sklepów, biur, hal i szkół — w nocy i w weekendy, żebyś nie stracił ani jednego dnia pracy. Pełna dokumentacja, FV z 30-dniowym terminem.</p>
          </div>
          <div className="grid xl:grid-cols-2 gap-5">
            {b2bServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-[3px] h-8 bg-[#f81828] rounded-full" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828]">FAQ</p>
              <h2 className="font-display text-[clamp(1.7rem,3vw,2.8rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Najczęstsze pytania o usługi wykonawcze</h2>
            </div>
          </div>
          <FaqAccordion items={generalFaq} />
        </section>

        {/* ── Kalkulator CTA ── */}
        <div className="rounded-2xl p-7 md:p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0f0f0f 0%,#0a0a0a 100%)", border: "1px solid rgba(248,24,40,0.22)", boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}>
          {/* siatka tła */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "38px 38px" }} />
          {/* linia akcentowa */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.15) 60%,transparent)" }} />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-7">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.28)" }}>
                <Check className="w-7 h-7 text-[#f81828]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-2">Bezpłatne narzędzie</p>
                <h2 className="font-display text-[clamp(1.4rem,3vw,2.1rem)] font-black uppercase leading-[1.0] text-white mb-3 break-words" style={{ overflowWrap: "anywhere" }}>
                  Oblicz zużycie materiałów
                </h2>
                <p className="text-sm leading-relaxed text-[#b7b7b7] max-w-xl">
                  Tynk, styropian, klej do płytek, farba elewacyjna — kalkulator budowlany z normami EN oblicza potrzebną ilość materiałów i szacunkowy koszt. Zero arkuszy Excel.
                </p>
              </div>
            </div>
            <Link
              to="/kalkulator"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-black uppercase tracking-[0.18em] text-white flex-shrink-0 transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
              style={{ background: "#f81828", boxShadow: "0 8px 28px rgba(248,24,40,0.35)" }}
            >
              Przejdź do kalkulatora <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── ADMIN PANEL ───────────────────────────────────────────────────
type AdminTab = "dashboard" | "products" | "categories" | "blog" | "inquiries" | "settings";

