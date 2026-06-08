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
    badge: "Program parasol B2C · Lublin",
    krotkiOpis:
      "Kompleksowe wsparcie inwestora indywidualnego — od projektu i urzędówki, przez stan surowy, po wykończenie pod klucz. Jeden opiekun, jeden budżet, pełna ścieżka.",
    frazySEO: ["budowa domu lublin", "dom pod klucz lublin", "budowa domu od podstaw"],
    parametry: [
      "Zakres: projekt + pozwolenie + stan surowy + instalacje + wykończenie",
      "Obszar: Lublin i województwo lubelskie (do 60 km)",
      "Finansowanie: kosztorys etapowy z harmonogramem płatności",
      "Opiekun projektu: dedykowany kierownik budowy",
    ],
    zastosowanie: [
      "Domy jednorodzinne wolnostojące i bliźniacze",
      "Budynki rekreacyjne i letniskowe",
      "Pierwsza inwestycja — pełna obsługa bez doświadczenia własnego",
    ],
    zalety: [
      "Jeden punkt kontaktu na cały projekt",
      "Materiały z własnego składu — oszczędność do 15% vs. rynek",
      "Kosztorys otwarty — inwestor widzi każdą pozycję",
      "Doświadczenie 15+ lat i 500+ projektów w regionie",
    ],
    korzysci: [
      "Oszczędność czasu — brak konieczności koordynacji wielu firm",
      "Jedno ubezpieczenie OC na cały zakres",
      "Gwarancja materiałowa producenta + gwarancja wykonawcza MediaBud",
    ],
  },
  /* ---- B2C ---- */
  {
    slug: "budowa-domu",
    segment: "B2C",
    title: "Budowa domu",
    icon: <HardHat className="w-7 h-7 text-[#f81828]" />,
    badge: "Stan surowy · Instalacje · B2C",
    krotkiOpis:
      "Realizacja stanu surowego otwartego i zamkniętego — fundamenty, ściany, stropy, dach, stolarka. Materiały z naszego składu, kosztorys przejrzysty.",
    frazySEO: ["budowa domu lublin", "stan surowy lublin", "ekipa budowlana lublin"],
    parametry: [
      "Etapy: fundamenty, stan surowy otwarty, stan surowy zamknięty",
      "Systemy: tradycja murowana, szkielet drewniany, pustak ceramiczny",
      "Instalacje: wod-kan, elektryka, gaz (podwykonawstwo z gwarancją)",
      "Obszar: Lublin i powiat lubelski",
    ],
    zastosowanie: [
      "Nowe domy jednorodzinne i bliźniaki",
      "Rozbudowy i nadbudowy budynków istniejących",
    ],
    zalety: [
      "Ekipa własna — brak pośredników",
      "Materiały systemowe (Ytong, Wienerberger, Lafarge)",
      "Kosztorys etapowy z harmonogramem",
    ],
    korzysci: [
      "Terminowość potwierdzona 500+ realizacjami",
      "Gwarancja wykonawcza 3 lata na stan surowy",
      "Dostawa materiałów na plac budowy z własnego magazynu",
    ],
  },
  {
    slug: "termomodernizacja",
    segment: "B2C",
    title: "Termomodernizacja",
    icon: <Zap className="w-7 h-7 text-[#f81828]" />,
    badge: "Ocieplenie · Dofinansowania · B2C",
    krotkiOpis:
      "Ocieplenie ścian i dachu, wymiana okien i drzwi, instalacja pomp ciepła i fotowoltaiki. Pomagamy uzyskać dofinansowanie Czyste Powietrze i Mój Prąd.",
    frazySEO: ["termomodernizacja lublin", "ocieplenie budynku lublin", "czyste powietrze lublin"],
    parametry: [
      "Systemy ociepleń: ETICS (styropian, wełna mineralna)",
      "Grubość izolacji: 15–25 cm wg audytu energetycznego",
      "Dofinansowania: Czyste Powietrze, Mój Prąd, BOCIAN",
      "Obszar: Lublin i województwo lubelskie",
    ],
    zastosowanie: [
      "Domy jednorodzinne wybudowane przed 2000 r.",
      "Budynki wielorodzinne (małe wspólnoty)",
    ],
    zalety: [
      "Audyt energetyczny przed i po termomodernizacji",
      "Obsługa wniosków o dofinansowanie — od początku do wypłaty",
      "Kompleksowość: ocieplenie + elewacja + okna w jednym kontrakcie",
    ],
    korzysci: [
      "Redukcja rachunków za ogrzewanie nawet o 50%",
      "Wzrost wartości nieruchomości",
      "Poprawa komfortu termicznego przez cały rok",
    ],
    ostrzezenia: [
      "Wymaga wcześniejszego audytu energetycznego",
      "Termin prac: poza sezonem grzewczym (kwiecień–październik)",
    ],
  },
  {
    slug: "wykonczenia-pod-klucz",
    segment: "B2C",
    title: "Wykończenia pod klucz",
    icon: <PenTool className="w-7 h-7 text-[#f81828]" />,
    badge: "Wnętrza · Pod klucz · B2C",
    krotkiOpis:
      "Kompleksowe wykończenie wnętrz — tynki, posadzki, glazura, malowanie, zabudowy G-K, łazienki. Materiały z własnego składu, jeden wykonawca od ściany do listwy.",
    frazySEO: ["wykończenie wnętrz lublin", "wykończenie pod klucz lublin", "remont mieszkania lublin"],
    parametry: [
      "Zakres: tynki maszynowe, posadzki, glazura, malowanie, zabudowy G-K",
      "Łazienki i kuchnie: kompleksowy montaż instalacji + wykończenie",
      "Materiały: Knauf, Mapei, Atlas, Bosch — z własnego składu",
      "Termin: zależny od metrażu, orientacyjnie 4–8 tyg. / 100 m²",
    ],
    zastosowanie: [
      "Nowe domy po stanie surowym",
      "Mieszkania deweloperskie",
      "Remonty generalne istniejących nieruchomości",
    ],
    zalety: [
      "Jeden wykonawca — zero problemów koordynacyjnych",
      "Materiały z magazynu — brak opóźnień dostaw",
      "Projekt wykończenia uwzględniony w kosztorysie",
    ],
    korzysci: [
      "Gotowe wnętrze bez stresu właściciela",
      "Gwarancja 2 lata na roboty wykończeniowe",
      "Możliwość wyboru standardu: ekonomiczny, premium, luksus",
    ],
  },
  {
    slug: "male-domy",
    segment: "B2C",
    title: "Małe domy i domki",
    icon: <Home className="w-7 h-7 text-[#f81828]" />,
    badge: "Do 35 m² · 70 m² · Letniskowe",
    krotkiOpis:
      "Domy do 35 m² (bez pozwolenia) i mniejsze budynki rekreacyjne. Szybki montaż, systemowe rozwiązania, cena pod kontrolą.",
    frazySEO: ["mały dom lublin", "dom do 35m2 bez pozwolenia", "domek letniskowy lublin"],
    parametry: [
      "Domki do 35 m² — budowa bez pozwolenia (zgłoszenie)",
      "Domki do 70 m² — uproszczona procedura",
      "Systemy: szkielet drewniany, moduły prefabrykowane",
      "Czas realizacji: 4–10 tygodni",
    ],
    zastosowanie: [
      "Działki rekreacyjne i ogrodowe",
      "Dodatkowe zaplecze gospodarcze",
      "Starter home dla młodych inwestorów",
    ],
    zalety: [
      "Niska cena całości dzięki prefabrykacji",
      "Możliwość realizacji w trybie ekspresowym",
      "Pełne wykończenie lub stan surowy — do wyboru",
    ],
    korzysci: [
      "Brak konieczności uzyskania pozwolenia na budowę (do 35 m²)",
      "Niskie koszty eksploatacji",
      "Prosta rozbudowa w przyszłości",
    ],
  },
  {
    slug: "adaptacja-poddaszy",
    segment: "B2C",
    title: "Adaptacja poddaszy",
    icon: <Layers className="w-7 h-7 text-[#f81828]" />,
    badge: "Poddasze użytkowe · B2C",
    krotkiOpis:
      "Pełna adaptacja nieużytkowego poddasza na przestrzeń mieszkalną — projekt, izolacja, ościeżnice dachowe, G-K, wykończenie.",
    frazySEO: ["adaptacja poddasza lublin", "poddasze użytkowe lublin", "remont poddasza lublin"],
    parametry: [
      "Izolacja dachu: wełna mineralna 20–25 cm",
      "Okna dachowe: Velux, Fakro — montaż i obróbka",
      "Zabudowy G-K: ściany, sufit, skosy",
      "Pozwolenie na zmianę sposobu użytkowania (w razie potrzeby)",
    ],
    zastosowanie: [
      "Domy jednorodzinne z dachem dwu- lub czterospadowym",
      "Stare budownictwo z niepełnowymiarową więźbą dachową",
    ],
    zalety: [
      "Zwiększenie powierzchni użytkowej bez rozbudowy",
      "Kompletny projekt wnętrza poddasza w cenie usługi",
      "Możliwość połączenia z termomodernizacją dachu",
    ],
    korzysci: [
      "Wzrost wartości nieruchomości o 15–25%",
      "Nowe pomieszczenia bez kosztów rozbudowy poziomej",
    ],
  },
  /* ---- Oba ---- */
  {
    slug: "dachy",
    segment: "Oba",
    title: "Dachy",
    icon: <Layers className="w-7 h-7 text-[#ff6b35]" />,
    badge: "Budowa · Remont · B2C i B2B",
    krotkiOpis:
      "Budowa nowych dachów i remonty pokryć dachowych — dachówka ceramiczna, blachodachówka, papa termozgrzewalna, blacha płaska. Dla domów i obiektów.",
    frazySEO: ["pokrycia dachowe lublin", "dekarstwo lublin", "remont dachu lublin"],
    parametry: [
      "Pokrycia: dachówka ceramiczna i betonowa, blachodachówka, blacha płaska",
      "Papa termozgrzewalna: dwuwarstwowa na stropodachach płaskich",
      "Orynnowanie: PVC, tytan-cynk, ocynk",
      "Izolacja: wełna mineralna, folia paroizolacyjna, membrana",
    ],
    zastosowanie: [
      "Domy jednorodzinne (nowe + remont)",
      "Hale produkcyjne i magazyny",
      "Szkoły, urzędy, obiekty użyteczności publicznej",
    ],
    zalety: [
      "Ekipa własna, bez podwykonawców na etapie dekarskim",
      "Materiały z własnego składu (Creaton, Ruukki, Fakro)",
      "Gwarancja szczelności 5 lat",
    ],
    korzysci: [
      "Kompleksowość: dachy + obróbki + orynnowanie w jednym kontrakcie",
      "Szybka diagnoza i naprawa przecieków",
      "Realizacje dla B2C i B2B w tym samym standardzie",
    ],
    ostrzezenia: [
      "Prace dachowe: wyłącznie przy temp. powyżej +5°C",
      "Papa termozgrzewalna: nie stosować przy silnym wietrze",
    ],
  },
  {
    slug: "elewacje",
    segment: "Oba",
    title: "Elewacje",
    icon: <Building2 className="w-7 h-7 text-[#ff6b35]" />,
    badge: "Tynk · Klinkier · B2C i B2B",
    krotkiOpis:
      "Elewacje tynkowane (cienkowarstwowy, mozaikowy), klinkierowe i wentylowane. Ocieplenie w systemie ETICS jako element elewacyjny.",
    frazySEO: ["elewacja budynku lublin", "tynk elewacyjny lublin", "ocieplenie elewacji lublin"],
    parametry: [
      "Systemy: ETICS (styropian + tynk), elewacja wentylowana",
      "Tynki: akrylowy, silikonowy, silikatowy, mozaikowy",
      "Elewacja klinkierowa: płytki klinkierowe na siatce zbrojonej",
      "Malowanie elewacji: farby fasadowe Caparol, Ceresit",
    ],
    zastosowanie: [
      "Nowe budynki — elewacja w trakcie budowy",
      "Renowacja starych elewacji (odpryski, zacieki, grzyb)",
      "Obiekty komercyjne i usługowe",
    ],
    zalety: [
      "Kompleksowość: ocieplenie + elewacja + cokół w jednym kontrakcie",
      "Dobór systemu do strefy klimatycznej budynku",
      "Trwałość powłok: 15–20 lat w systemach silikonowych",
    ],
    korzysci: [
      "Estetyka + izolacja termiczna w jednym",
      "Możliwość dofinansowania w ramach Czystego Powietrza",
      "Łatwe czyszczenie i konserwacja po realizacji",
    ],
  },
  /* ---- B2B ---- */
  {
    slug: "remonty-b2b",
    segment: "B2B",
    title: "Remonty B2B",
    icon: <Hammer className="w-7 h-7 text-[#ff6b35]" />,
    badge: "Obiekty · Instytucje · B2B",
    krotkiOpis:
      "Remonty i modernizacje dla firm i instytucji — galerie handlowe, szkoły, urzędy, lokale usługowe, hale i magazyny. Realizacje w terminach uzgodnionych z klientem biznesowym.",
    frazySEO: ["remont obiektu lublin", "remonty dla firm lublin", "modernizacja budynku lublin b2b"],
    parametry: [
      "Zakres: posadzki przemysłowe, ściany, sufity podwieszane, instalacje",
      "Koordynacja prac z harmonogramem działalności klienta",
      "Przetargi publiczne: doświadczenie w postępowaniach PZP",
      "Obszar: Lublin i województwo lubelskie",
    ],
    zastosowanie: [
      "Galerie handlowe i lokale usługowe",
      "Szkoły, przedszkola i obiekty oświatowe",
      "Urzędy i instytucje publiczne",
      "Hale produkcyjne i magazyny",
    ],
    zalety: [
      "Doświadczenie w realizacjach w trybie nocnym i weekendowym",
      "Pełna dokumentacja powykonawcza i gwarancyjna",
      "Rozliczenia FV z 30-dniowym terminem płatności",
    ],
    korzysci: [
      "Minimalizacja przerw w działalności klienta",
      "Jeden wykonawca dla wielu zakresów — brak ryzyka koordynacyjnego",
      "Referencje i doświadczenie z obiektami użyteczności publicznej",
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
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-4">Industrial Pulse · usługi wykonawcze</p>
              <h1 className="font-display font-black uppercase text-white leading-[0.9] break-words mb-5" style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", overflowWrap: "anywhere" }}>
                Usługi wykonawcze MediaBud
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#d7d7d7] max-w-3xl">MediaBud rozwija ofertę dla klientów indywidualnych i biznesowych: budowa domu, termomodernizacja, wykończenia pod klucz, dachy, elewacje, adaptacje poddaszy oraz remonty B2B dla galerii, szkół i obiektów użyteczności publicznej w Lublinie i województwie lubelskim.</p>
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
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-2">B2C</p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Usługi dla inwestorów indywidualnych</h2>
            </div>
            <p className="text-sm text-[#888] max-w-2xl">Budowa domu, termomodernizacja, wykończenie, małe domy i adaptacje poddaszy — wszystko w modelu lokalnym Lublin / woj. lubelskie.</p>
          </div>
          <div className="grid xl:grid-cols-2 gap-5">
            {b2cServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ff6b35] mb-2">B2C / B2B</p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Usługi wspólne dla domów i obiektów</h2>
            </div>
            <p className="text-sm text-[#888] max-w-2xl">Dachy i elewacje, które naturalnie łączą inwestycje prywatne oraz mniejsze realizacje firmowe.</p>
          </div>
          <div className="grid xl:grid-cols-2 gap-5">
            {mixedServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ff6b35] mb-2">B2B</p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Usługi dla firm i instytucji</h2>
            </div>
            <p className="text-sm text-[#888] max-w-2xl">Remonty i modernizacje dla galerii, szkół, lokali usługowych i obiektów użyteczności publicznej.</p>
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

