import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { NAP_ADDRESS, NAP_GEO, NAP_HOURS, NAP_AREA_SERVED, NAP_CONTACT_POINT, NAP_SAME_AS } from "@/lib/localBusiness";
import { ChevronRight, ArrowRight, Phone, Check, Mail } from "lucide-react";
import { IconHouse, IconDeveloper, IconFinish, IconRoof, IconFacade, IconBuilding } from "@/components/FuturisticIcons";

/* ─── Types ─────────────────────────────────────────────────────── */
type ServiceDetail = {
  slug: string;
  segment: "B2C" | "B2B" | "Oba";
  title: string;
  icon: ReactNode;
  code: string;
  badge: string;
  krotkiOpis: string;
  co_robimy: string[];
  zalety: string[];
  korzysci: string[];
  ostrzezenia?: string[];
};

/* ─── IntersectionObserver Hook ─────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Dane usług ────────────────────────────────────────────────── */
const services: ServiceDetail[] = [
  {
    slug: "dom-od-podstaw",
    segment: "B2C",
    title: "Dom od podstaw",
    icon: <IconHouse size={28} style={{ color: "#f81828" }} />,
    code: "01",
    badge: "Program kompleksowy · Od projektu po klucze · Lublin i woj. lubelskie",
    krotkiOpis: "Budujesz pierwszy dom i nie wiesz, od czego zacząć? Media Bud to jedyny partner, którego potrzebujesz — jeden opiekun, jeden kosztorys, materiały z własnego składu. Prowadzimy Cię przez każdy etap budowy bez zbędnych formalności i niespodzianek w rachunku.",
    co_robimy: [
      "Projekt architektoniczny i uzyskanie pozwolenia na budowę",
      "Stan surowy otwarty i zamknięty — własna ekipa, materiały bezpośrednio z magazynu",
      "Kompletne instalacje: elektryczne, wod-kan, gazowe i wentylacyjne",
      "Wykończenie wnętrz w wybranym standardzie: ekonomiczny, standard, premium",
      "Elewacja, dach i zagospodarowanie terenu wokół budynku",
      "Odbiory techniczne, dokumentacja powykonawcza i kosztorys otwarty na każdym etapie",
    ],
    zalety: [
      "Jeden opiekun inwestycji odpowiada za całość — koniec z przepychaniem odpowiedzialności między firmami",
      "Materiały z własnego składu Media Bud — realnie taniej niż kupując u kilku dostawców",
      "Kosztorys otwarty: widzisz każdą złotówkę na bieżąco, bez ukrytych marż",
      "15 lat w branży, ponad 500 zrealizowanych inwestycji na terenie Lubelszczyzny",
      "Stała ekipa — te same osoby od fundamentów do kluczy, zero rotacji",
      "Harmonogram z buforami — realny termin, który dotrzymujemy",
    ],
    korzysci: [
      "Nie musisz koordynować wielu firm — zajmujemy się tym za Ciebie od pierwszego dnia",
      "Jeden rachunek zbiorczy zamiast stosu faktur od kilkunastu wykonawców",
      "Pełna dokumentacja powykonawcza i kosztorys otwarty — zero ukrytych kosztów",
      "Materiały zawsze na stanie — bez opóźnień z powodu braków u dostawcy",
      "Spokój psychiczny: wiesz, kto za co odpowiada i do kogo zadzwonić",
    ],
  },
  {
    slug: "kompleksowa-wspolpraca-z-deweloperami",
    segment: "B2B",
    title: "Kompleksowa współpraca z deweloperami",
    icon: <IconDeveloper size={28} style={{ color: "#f81828" }} />,
    code: "02",
    badge: "Deweloperzy · Inwestorzy · Wielolokalowe realizacje",
    krotkiOpis: "Realizujesz osiedle, blok lub inwestycję wielorodzinną? Media Bud to partner wykonawczy i dostawca materiałów w jednym — stały opiekun B2B, rabaty wolumenowe, harmonogram dopasowany do Twoich etapów. Jeden kontrakt zamiast dziesięciu umów z podwykonawcami.",
    co_robimy: [
      "Kompleksowe wykończenia mieszkań pod klucz w standardzie deweloperskim i podwyższonym",
      "Dostawy materiałów budowlanych bezpośrednio na plac budowy — tynki, izolacje, chemia budowlana",
      "Wykonawstwo elewacji i dachów dla budynków wielorodzinnych i komercyjnych",
      "Instalacje elektryczne i sanitarne w lokalach — seryjne wdrożenie na całym obiekcie",
      "Posadzki przemysłowe i wykończeniowe w częściach wspólnych i garażach podziemnych",
      "Harmonogramowanie etapowe dopasowane do postępu sprzedaży lokali",
      "Obsługa przetargów i zamówień publicznych — doświadczenie w procedurach PZP",
    ],
    zalety: [
      "Dedykowany opiekun B2B — jedna osoba kontaktowa dla całego projektu, dostępna 7 dni w tygodniu",
      "Rabaty wolumenowe na materiały budowlane — im większa skala, tym korzystniejsza cena",
      "Faktura VAT z 30–60-dniowym terminem płatności, możliwość faktur zbiorczych etapowych",
      "Jeden wykonawca na wiele zakresów — oszczędzasz czas i eliminujesz ryzyko niekoordynacji",
      "Własny magazyn w Lublinie — ciągłość dostaw bez przestojów na budowie",
      "Dokumentacja techniczna i powykonawcza zgodna z wymogami bankowego nadzoru inwestorskiego",
    ],
    korzysci: [
      "Szybsza realizacja inwestycji — jedna ekipa obsługuje wiele lokali równolegle",
      "Przewidywalny kosztorys i terminy — transparentna wycena etapowa bez ukrytych kosztów",
      "Jeden punkt kontaktowy dla całego projektu — koniec z telefonami do dziesięciu podwykonawców",
      "Możliwość długoterminowej umowy ramowej na kolejne inwestycje — korzystne warunki stałego partnera",
      "Doświadczenie przy obiektach wielorodzinnych, komercyjnych i użyteczności publicznej",
    ],
  },
  {
    slug: "wykonczenia-pod-klucz",
    segment: "B2C",
    title: "Wykończenia pod klucz",
    icon: <IconFinish size={28} style={{ color: "#f81828" }} />,
    code: "03",
    badge: "Stan deweloperski → gotowy dom do życia",
    krotkiOpis: "Masz stan surowy lub deweloperski i chcesz się wprowadzić? Oddajemy gotowy dom — tynki, podłogi, glazura, łazienki, kuchnia. Jedna ekipa, jeden kosztorys, bez chaosu.",
    co_robimy: [
      "Tynki maszynowe, gładzie, malowanie",
      "Posadzki — jastrych, panele, parkiet, płytki",
      "Łazienki i kuchnie — instalacje, glazura, armatura",
      "Zabudowy G-K, sufity podwieszane, ościeżnice",
    ],
    zalety: [
      "Jeden wykonawca od pierwszej do ostatniej ściany — zero chaosu koordynacyjnego",
      "Materiały z własnego magazynu — bez opóźnień, bo zawsze mamy je na stanie",
      "Projekt wykończenia z wizualizacją w cenie usługi",
    ],
    korzysci: [
      "Dom gotowy do zamieszkania bez Twojego nadzoru na budowie każdego dnia",
      "Trzy standardy do wyboru: ekonomiczny, standard i premium",
      "Pełna dokumentacja powykonawcza po zakończeniu prac",
    ],
  },
  {
    slug: "dachy",
    segment: "Oba",
    title: "Dachy",
    icon: <IconRoof size={28} style={{ color: "#f81828" }} />,
    code: "04",
    badge: "Nowe dachy · Naprawy · Własna ekipa dekarska",
    krotkiOpis: "Nowy dach lub aktywny przeciek? Własna ekipa dekarska, materiały z magazynu. Działamy dla domów, hal i obiektów użyteczności publicznej.",
    co_robimy: [
      "Nowe pokrycia — dachówka ceramiczna i betonowa, blachodachówka, blacha płaska",
      "Diagnostyka i naprawa aktywnych przecieków",
      "Stropodachy — papa termozgrzewalna dwuwarstwowa",
      "Orynnowanie PVC i tytan-cynk, pełna obróbka blacharska",
    ],
    zalety: [
      "Własna ekipa dekarska — żadnych przypadkowych podwykonawców",
      "Materiały renomowanych marek: Creaton, Ruukki, Fakro — z naszego magazynu",
      "Jeden kontrakt: pokrycie, obróbki i orynnowanie",
    ],
    korzysci: [
      "Szybka naprawa przecieków — działamy bez zbędnych formalności",
      "Solidne wykonanie potwierdzone referencjami z całego woj. lubelskiego",
      "Ten sam standard dla domu prywatnego i dużego obiektu",
    ],
    ostrzezenia: [
      "Prace dachowe wyłącznie w temperaturach powyżej +5°C",
      "Papa termozgrzewalna: nie stosować przy silnym wietrze powyżej 10 m/s",
    ],
  },
  {
    slug: "elewacje",
    segment: "Oba",
    title: "Elewacje",
    icon: <IconFacade size={28} style={{ color: "#f81828" }} />,
    code: "05",
    badge: "Tynk · Klinkier · Ocieplenie ETICS",
    krotkiOpis: "Ocieplamy i wykańczamy wizualnie w jednym projekcie — tynk cienkowarstwowy, klinkier lub elewacja wentylowana. Efekt estetyczny na 20 lat, możliwa dotacja z Czystego Powietrza.",
    co_robimy: [
      "System ETICS — styropian lub wełna + tynk cienkowarstwowy",
      "Tynki silikonowe, akrylowe, silikatowe i mozaikowe",
      "Elewacja klinkierowa i wentylowana",
      "Renowacja zniszczonych elewacji — pęknięcia, grzyb, odpryski, zacieki",
    ],
    zalety: [
      "Ocieplenie, wykończenie i cokół w jednym kontrakcie i jednej cenie",
      "Dobieramy system do orientacji budynku i lokalnego klimatu",
      "Tynki silikonowe utrzymują efekt estetyczny nawet 20 lat",
    ],
    korzysci: [
      "Lepsza izolacja termiczna i nowy wygląd domu w jednej inwestycji",
      "Możliwość dofinansowania z programu Czyste Powietrze",
      "Elewacja samooczyszczająca — brud spływa z deszczem",
    ],
  },
  {
    slug: "galerie-obiekty",
    segment: "B2B",
    title: "Galerie, szkoły i obiekty użytkowe",
    icon: <IconBuilding size={28} style={{ color: "#f81828" }} />,
    code: "06",
    badge: "Obiekty publiczne · Galerie handlowe · Szkoły · Instytucje",
    krotkiOpis: "Remontujemy galerie handlowe, szkoły, urzędy i obiekty przemysłowe — w nocy i w weekendy, bez zakłócania działalności. Media Bud to wykonawca z doświadczeniem w obiektach użyteczności publicznej: pełna dokumentacja powykonawcza, faktura VAT, obsługa przetargów PZP.",
    co_robimy: [
      "Modernizacje i remonty generalne galerii handlowych, centrów usługowych i obiektów handlowych",
      "Remonty szkół, przedszkoli, urzędów i instytucji publicznych — zgodnie z wymogami PZP",
      "Posadzki przemysłowe, epoksydowe i wykończeniowe w obiektach komercyjnych i halach",
      "Instalacje elektryczne, sanitarne i wentylacyjne w obiektach wielkopowierzchniowych",
      "Sufity podwieszane, ścianki działowe, zabudowy GK w przestrzeniach komercyjnych",
      "Elewacje i dachy obiektów wielorodzinnych i użyteczności publicznej",
      "Obsługa przetargów publicznych PZP — doświadczenie w dokumentacji i realizacji zamówień",
    ],
    zalety: [
      "Prace w nocy, weekendy i święta — obiekt działa normalnie, my remontujemy w tle",
      "Dedykowany kierownik budowy z doświadczeniem w obiektach użyteczności publicznej",
      "Pełna dokumentacja powykonawcza i techniczna dla służb technicznych i audytorów",
      "Faktura VAT z 30–60-dniowym terminem płatności — standard B2B bez negocjacji",
      "Doświadczenie w realizacji zamówień publicznych i przetargów PZP",
      "Materiały z własnego magazynu w Lublinie — ciągłość dostaw i brak przestojów",
    ],
    korzysci: [
      "Obiekt lub instytucja działa bez przerwy — harmonogram pod Twój kalendarz",
      "Jeden wykonawca na wszystkie zakresy — mniej umów, mniej ryzyka, lepsza koordynacja",
      "Referencje z obiektów publicznych — audyt służb technicznych nie będzie problemem",
      "Możliwość ramowej umowy rocznej na bieżące utrzymanie i remonty obiektu",
      "Kompleksowa obsługa od wyceny, przez realizację, po odbiory techniczne",
    ],
  },
];

/* ─── VIDEO map ─────────────────────────────────────────────────── */
const SERVICE_VIDEOS: Record<string, string> = {
  "dom-od-podstaw":                        "https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260608/text2video-d8jjkp780j2drgd1t600.mp4",
  "galerie-obiekty":                       "https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260608/text2video-d8jjkrv80j2drgd1t60g.mp4",
  "kompleksowa-wspolpraca-z-deweloperami": "https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260608/text2video-d8jjkun80j2drgd1t610.mp4",
};

/* ─── CheckList ─────────────────────────────────────────────────── */
function CheckList({ title, items, accent = "#f81828" }: { title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl p-5 md:p-6 relative overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg,${accent},transparent)` }} />
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: accent, boxShadow: `0 0 12px ${accent}88` }} />
        <h3 className="text-sm font-black uppercase tracking-widest text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-gray-400">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Service Tile ──────────────────────────────────────────────── */
function ServiceTile({ svc }: { svc: ServiceDetail }) {
  return (
    <Link
      to={`/uslugi/${svc.slug}`}
      className="group rounded-2xl p-5 md:p-6 flex flex-col min-h-[260px] relative overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.45)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(248,24,40,0.14)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
      {/* Scan-lines on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(248,24,40,0.02) 3px,rgba(248,24,40,0.02) 4px)" }} />
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg,transparent,#f81828,transparent)" }} />

        <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(248,24,40,0.25)]"
            style={{ border: "1px solid rgba(248,24,40,0.3)", background: "rgba(248,24,40,0.07)" }}>
            {svc.icon}
          </div>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#555] mb-2">{svc.badge}</p>
        <h2 className="font-display text-xl font-black text-white mb-3 group-hover:text-[#f81828] transition-colors duration-200" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
          {svc.title}
        </h2>
        <p className="text-sm leading-relaxed text-gray-500 flex-1">{svc.krotkiOpis}</p>
        <div className="mt-5 pt-4 flex items-center justify-end" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#f81828]">
            Dowiedz się więcej <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Process Steps ─────────────────────────────────────────────── */
const processSteps = [
  { num: "01", title: "Kontakt", desc: "Zadzwoń lub wyślij zapytanie — opisz projekt lub zakres robót." },
  { num: "02", title: "Analiza", desc: "Przyjeżdżamy na oględziny lub analizujemy dokumentację." },
  { num: "03", title: "Wycena", desc: "Wycena w 24h — otwarty kosztorys bez ukrytych kosztów." },
  { num: "04", title: "Realizacja", desc: "Własna ekipa + materiały z magazynu. Jeden punkt kontaktu." },
];

/* ─── ServiceDetailPage ─────────────────────────────────────────── */
function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  const heroVideo = SERVICE_VIDEOS[service.slug];
  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#0a0a0a 0%,#050505 100%)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.006) 3px,rgba(255,255,255,0.006) 4px)" }} />
        <div className="absolute inset-y-0 left-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 20px rgba(248,24,40,0.5)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.25) 55%,transparent)" }} />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%,rgba(248,24,40,0.06) 0%,transparent 65%)" }} />

        <div className="relative container mx-auto px-4 pl-9 py-14 md:py-20">
          <Link to="/uslugi" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#555] hover:text-white transition-colors mb-8">
            <ChevronRight className="w-4 h-4 rotate-180" /> Wszystkie usługi
          </Link>
          <div className="max-w-5xl grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#555]">Media Bud · Lublin i woj. lubelskie</span>
              </div>
              <h1 className="font-display font-black text-white leading-[0.92] mb-5" style={{ fontSize: "clamp(2.2rem,5.5vw,4.2rem)", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
                {service.title}
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-gray-400 max-w-2xl">{service.krotkiOpis}</p>
            </div>
            {/* CTA Card */}
            <div className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", boxShadow: "0 20px 44px rgba(0,0,0,0.4)" }}>
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg,#f81828,transparent)" }} />
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-3 flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#f81828]" />Zapytaj o wycenę
              </p>
              <h3 className="font-display text-xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
                Wycenę wstępną przygotujemy w 24 h
              </h3>
              <ul className="space-y-2 mb-5">
                {["Bezpłatna konsultacja techniczna", "Kosztorys otwarty — bez ukrytych kosztów", "Lublin i woj. lubelskie"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <Check className="w-3.5 h-3.5 text-[#f81828] flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <a href="tel:+48533553344" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white transition-all hover:brightness-110 hover:shadow-[0_0_24px_rgba(248,24,40,0.35)]" style={{ background: "#f81828" }}>
                  <Phone className="w-4 h-4" /> +48 533 553 344
                </a>
                <Link to="/kontakt" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white transition-colors hover:border-[#f81828]/40" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "transparent" }}>
                  <Mail className="w-4 h-4 text-[#f81828]" /> Wyślij zapytanie
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video sekcja */}
      {heroVideo && (
        <section className="py-14 relative overflow-hidden" style={{ background: "#000" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative z-10 container mx-auto px-4">
            <p className="text-xs font-black uppercase tracking-widest text-[#f81828] mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Realizacja w praktyce
            </p>
            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(248,24,40,0.22)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}>
                <video src={heroVideo} autoPlay muted loop playsInline preload="metadata" className="w-full aspect-video" style={{ display: "block", background: "#050505" }} />
              </div>
              <div className="space-y-5">
                <h2 className="font-display text-2xl md:text-3xl font-black text-white leading-tight" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>{service.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{service.krotkiOpis}</p>
                <div className="space-y-3">
                  <a href="tel:+48533553344" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white transition-all hover:brightness-110 hover:shadow-[0_0_24px_rgba(248,24,40,0.35)]" style={{ background: "#f81828" }}>
                    <Phone className="w-4 h-4" /> Zadzwoń po wycenę
                  </a>
                  <Link to="/kontakt" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "transparent" }}>
                    <Mail className="w-4 h-4 text-[#f81828]" /> Wyślij zapytanie
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Treść */}
      <div className="container mx-auto px-4 py-12 md:py-16 space-y-5">
        <div className="grid lg:grid-cols-2 gap-5">
          <CheckList title="Co robimy" items={service.co_robimy} />
          <CheckList title="Dlaczego Media Bud" items={service.zalety} accent="#ff6b35" />
        </div>
        <CheckList title="Co zyskujesz" items={service.korzysci} />
        {service.ostrzezenia && service.ostrzezenia.length > 0 && (
          <CheckList title="Ważne informacje" items={service.ostrzezenia} accent="#888" />
        )}

        {/* CTA */}
        <div className="rounded-2xl p-8 md:p-10 relative overflow-hidden" style={{ background: "rgba(248,24,40,0.06)", border: "1px solid rgba(248,24,40,0.2)" }}>
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.15) 60%,transparent)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(248,24,40,0.015) 3px,rgba(248,24,40,0.015) 4px)" }} />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-2">Zapytaj o wycenę</p>
              <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
                Media Bud — ul. Chemiczna 8d, Lublin
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">Zadzwoń, wyślij zakres prac lub odwiedź skład. Wycenę wstępną przygotujemy w 24 h.</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[220px]">
              <a href="tel:+48533553344" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white hover:shadow-[0_0_24px_rgba(248,24,40,0.4)] transition-all" style={{ background: "#f81828" }}>
                <Phone className="w-4 h-4" /> Zadzwoń
              </a>
              <a href="mailto:sprzedaz@mediabud.pl" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white border border-[rgba(255,255,255,0.1)]" style={{ background: "transparent" }}>
                <Mail className="w-4 h-4 text-[#f81828]" /> sprzedaz@mediabud.pl
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────────────── */
export default function ServicesPage() {
  const { slug } = useParams<{ slug?: string }>();
  const service = slug ? services.find((s) => s.slug === slug) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://mediabud.pl/" },
          { "@type": "ListItem", position: 2, name: "Usługi", item: "https://mediabud.pl/uslugi" },
          ...(service ? [{ "@type": "ListItem", position: 3, name: service.title, item: `https://mediabud.pl/uslugi/${service.slug}` }] : []),
        ],
      },
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": "https://mediabud.pl/#localbusiness",
        name: "Media Bud — skład budowlany i usługi wykonawcze",
        description: "Usługi wykonawcze Media Bud w Lublinie: budowa domów, remont łazienki, wykończenia pod klucz, dachy, elewacje, remonty B2B.",
        url: "https://mediabud.pl",
        telephone: "+48533553344",
        email: "sprzedaz@mediabud.pl",
        address: NAP_ADDRESS,
        geo: NAP_GEO,
        openingHoursSpecification: NAP_HOURS,
        areaServed: NAP_AREA_SERVED,
        contactPoint: NAP_CONTACT_POINT,
        sameAs: NAP_SAME_AS,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Usługi wykonawcze Media Bud",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            name: s.title,
            category: s.segment,
            areaServed: "Lublin i województwo lubelskie",
          })),
        },
      },
    ],
  };

  if (slug && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#050505" }}>
        <div className="max-w-xl w-full rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-3">404 · usługa nie znaleziona</p>
          <h1 className="font-display text-4xl font-black text-white mb-4" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Nie znaleźliśmy tej podstrony</h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">Sprawdź pełną listę usług Media Bud lub skontaktuj się z nami.</p>
          <Link to="/uslugi" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white" style={{ background: "#f81828" }}>
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

  /* ── LISTA USŁUG ──────────────────────────────────────────────── */
  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#0a0a0a 0%,#080808 50%,#050505 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.007) 3px,rgba(255,255,255,0.007) 4px)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.25) 55%,transparent)" }} />
        <div className="absolute inset-y-0 left-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 20px rgba(248,24,40,0.5)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top,#050505,transparent)" }} />
        <div className="absolute right-0 top-0 w-[700px] h-[700px] pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 10%,rgba(248,24,40,0.07) 0%,transparent 60%)" }} />

        <div className="relative container mx-auto px-4 pl-9 py-16 md:py-24">
          <div className="max-w-5xl grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-[#f81828]" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#f81828]">Media Bud · Lublin i woj. lubelskie</p>
              </div>
              <h1 className="font-display font-black text-white leading-[0.92] mb-5" style={{ fontSize: "clamp(2.4rem,6vw,4.8rem)", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
                Budujesz lub<br />
                <span style={{ color: "#f81828" }}>remontujesz?</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-gray-400 max-w-2xl">
                Media Bud to skład budowlany i firma wykonawcza w jednym — kupujesz materiały w korzystnej cenie i budujesz z naszą ekipą. Jeden partner, jeden rachunek, bez szukania podwykonawców.
              </p>
            </div>

            {/* Stats */}
            <div className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg,#f81828,transparent)" }} />
              <p className="text-[10px] font-black uppercase tracking-widest text-[#555] mb-4">Media Bud w liczbach</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "15+",     label: "lat na rynku" },
                  { value: "500+",    label: "projektów wykonanych" },
                  { value: "50+",     label: "marek w ofercie" },
                  { value: "16 000+", label: "produktów w magazynie" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4 relative overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: "2px solid #f81828" }}>
                    <div className="font-display font-black mb-0.5 text-2xl" style={{ color: "#f81828", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", textShadow: "0 0 16px rgba(248,24,40,0.3)" }}>{item.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-[#666]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SPOT VIDEO ══ */}
      <div style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container mx-auto px-4 py-10 md:py-14">
          <FadeIn className="flex items-center gap-3 mb-6">
            <span className="w-[3px] h-8 bg-[#f81828] rounded-full" style={{ boxShadow: "0 0 12px rgba(248,24,40,0.4)" }} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828]">Spot brandowy · Media Bud</p>
              <h2 className="font-display text-2xl font-black text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Budujesz. Remontujesz. Media Bud.</h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="rounded-2xl overflow-hidden relative w-full" style={{ border: "1px solid rgba(248,24,40,0.22)", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
              <video
                src="https://skyagent-artifacts.skywork.ai/router/agent/2026-06-09/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/spot_mediabud_0029d1ffab6547489b85ca6540e5215a.mp4"
                autoPlay muted loop playsInline preload="metadata"
                className="w-full aspect-video"
                style={{ display: "block", background: "#050505" }}
              />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ══ LISTA USŁUG ══ */}
      <div className="container mx-auto px-4 py-14 md:py-20">
        <FadeIn className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[1px] w-8 bg-[#f81828]" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#f81828]">Lublin i woj. lubelskie</p>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-black text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Nasze usługi</h2>
          <p className="text-sm text-gray-600 mt-2 max-w-2xl">Budowa, remont, wykończenie — jeden partner dla klientów indywidualnych i firm.</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((svc, i) => (
            <FadeIn key={svc.slug} delay={i * 60}>
              <ServiceTile svc={svc} />
            </FadeIn>
          ))}
        </div>

        {/* ── PROCESS STEPS ── */}
        <FadeIn className="mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[1px] w-8 bg-[#f81828]" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#f81828]">Jak pracujemy</p>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-8" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Proces realizacji</h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {processSteps.map((step, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="rounded-2xl p-6 relative overflow-hidden group"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", transition: "border-color 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.4)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(248,24,40,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg,transparent,#f81828,transparent)" }} />
                <div className="font-mono font-black text-5xl mb-4 leading-none" style={{ color: "rgba(248,24,40,0.15)", WebkitTextStroke: "1px rgba(248,24,40,0.25)" }}>{step.num}</div>
                <h3 className="font-black text-white text-sm uppercase tracking-widest mb-2" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── KALKULATOR CTA ── */}
        <FadeIn>
          <div className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.08),rgba(255,107,53,0.04))", border: "1px solid rgba(248,24,40,0.22)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(248,24,40,0.015) 3px,rgba(248,24,40,0.015) 4px)" }} />
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.15) 60%,transparent)" }} />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-7">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.28)", boxShadow: "0 0 24px rgba(248,24,40,0.1)" }}>
                  <Check className="w-7 h-7 text-[#f81828]" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-2">Bezpłatne narzędzie</p>
                  <h2 className="font-display text-xl md:text-2xl font-black text-white mb-2" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Oblicz zużycie materiałów</h2>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
                    Tynk, styropian, klej do płytek, farba elewacyjna — kalkulator budowlany oblicza ilości i szacunkowy koszt. Zero arkuszy Excel.
                  </p>
                </div>
              </div>
              <Link to="/kalkulator"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-black uppercase tracking-wider text-white flex-shrink-0 transition-all hover:brightness-110 hover:scale-[1.02]"
                style={{ background: "#f81828", boxShadow: "0 8px 28px rgba(248,24,40,0.35)" }}>
                Przejdź do kalkulatora <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
