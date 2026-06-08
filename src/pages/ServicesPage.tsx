import { type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { NAP_ADDRESS, NAP_GEO, NAP_HOURS, NAP_AREA_SERVED, NAP_CONTACT_POINT, NAP_SAME_AS } from "@/lib/localBusiness";
import { ChevronRight, ArrowRight, Phone, Check, Mail, Zap, Hammer, Building2, Layers, HardHat, Home } from "lucide-react";

/* ─── Typy ─────────────────────────────────────────────────────── */
type ServiceDetail = {
  slug: string;
  segment: "B2C" | "B2B" | "Oba";
  title: string;
  icon: ReactNode;
  badge: string;
  krotkiOpis: string;
  co_robimy: string[];
  zalety: string[];
  korzysci: string[];
  ostrzezenia?: string[];
};

/* ─── Dane usług ────────────────────────────────────────────────── */
const services: ServiceDetail[] = [
  {
    slug: "dom-od-podstaw",
    segment: "B2C",
    title: "Dom od podstaw",
    icon: <Home className="w-7 h-7 text-[#f81828]" />,
    badge: "Kompleksowa realizacja · Lublin i woj. lubelskie",
    krotkiOpis:
      "Budujesz pierwszy dom i nie wiesz, od czego zacząć? Jeden opiekun prowadzi Cię od projektu po klucze — bez koordynowania kilku firm i bez niespodzianek w rachunku końcowym.",
    co_robimy: [
      "Projekt architektoniczny i uzyskanie pozwolenia na budowę",
      "Stan surowy otwarty i zamknięty — własna ekipa, materiały z magazynu",
      "Instalacje elektryczne, wod-kan i gazowe",
      "Wykończenie wnętrz według wybranego standardu",
    ],
    zalety: [
      "Jeden człowiek odpowiada za całość — koniec z przepychaniem odpowiedzialności",
      "Materiały z własnego składu — realnie taniej niż kupując u różnych dostawców",
      "Kosztorys otwarty — widzisz każdą złotówkę, bez ukrytych kosztów",
      "15 lat doświadczenia, ponad 500 realizacji w regionie",
    ],
    korzysci: [
      "Nie musisz koordynować wielu firm — zajmujemy się tym za Ciebie",
      "Jeden rachunek zamiast stosu faktur od różnych wykonawców",
      "Pełna dokumentacja powykonawcza i kosztorys otwarty — bez ukrytych kosztów",
    ],
  },
  {
    slug: "remont-lazienki",
    segment: "B2C",
    title: "Remont łazienki",
    icon: <HardHat className="w-7 h-7 text-[#f81828]" />,
    badge: "Najpopularniejsza usługa · Pod klucz · 2–3 tygodnie",
    krotkiOpis:
      "Stara glazura, cieknący prysznic albo za ciasna przestrzeń? Robimy łazienki od A do Z — skucie, instalacje, płytki, armatura. Wchodzisz po kluczu, wszystko gotowe.",
    co_robimy: [
      "Skucie starej glazury i posadzki",
      "Nowe instalacje wod-kan — hydraulik z naszej ekipy",
      "Układanie płytek, glazura, fugi",
      "Montaż armatury, oświetlenia i akcesoriów",
    ],
    zalety: [
      "Jeden wykonawca od skucia do armatury — nie szukasz kaflarza i hydraulika osobno",
      "Płytki, kleje, fugi z własnego składu Media Bud — wszystko dostępne od ręki",
      "Projekt wizualizacji 2D w cenie — widzisz efekt zanim zaczniemy",
    ],
    korzysci: [
      "Łazienka gotowa w 2–3 tygodnie, bez Twojego codziennego nadzoru",
      "Płacisz etapowo — za wykonaną robotę, nie z góry",
      "Pełna dokumentacja powykonawcza po zakończeniu prac",
    ],
  },
  {
    slug: "wykonczenia-pod-klucz",
    segment: "B2C",
    title: "Wykończenia pod klucz",
    icon: <Hammer className="w-7 h-7 text-[#f81828]" />,
    badge: "Stan deweloperski → gotowy dom do życia",
    krotkiOpis:
      "Masz stan surowy lub deweloperski i chcesz się wprowadzić? Oddajemy gotowy dom — tynki, podłogi, glazura, łazienki, kuchnia. Jedna ekipa, jeden kosztorys, bez chaosu.",
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
    icon: <Layers className="w-7 h-7 text-[#f81828]" />,
    badge: "Nowe dachy · Naprawy · Własna ekipa dekarska",
    krotkiOpis:
      "Nowy dach lub aktywny przeciek? Własna ekipa dekarska, materiały z magazynu. Działamy dla domów, hal i obiektów użyteczności publicznej.",
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
    icon: <Building2 className="w-7 h-7 text-[#f81828]" />,
    badge: "Tynk · Klinkier · Ocieplenie ETICS",
    krotkiOpis:
      "Ocieplamy i wykańczamy wizualnie w jednym projekcie — tynk cienkowarstwowy, klinkier lub elewacja wentylowana. Efekt estetyczny na 20 lat, możliwa dotacja z Czystego Powietrza.",
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
    slug: "remonty-b2b",
    segment: "B2B",
    title: "Remonty dla firm",
    icon: <Building2 className="w-7 h-7 text-[#f81828]" />,
    badge: "Firmy · Instytucje · Bez przestojów w działalności",
    krotkiOpis:
      "Remontujesz sklep, biuro lub halę? Pracujemy w nocy i w weekendy — Twoja firma działa normalnie, my remontujemy w tle. Pełna dokumentacja, faktura VAT, 30-dniowy termin płatności.",
    co_robimy: [
      "Posadzki przemysłowe, ściany, sufity podwieszane",
      "Instalacje elektryczne i sanitarne w obiektach komercyjnych",
      "Remonty lokali handlowych, biur, szkół i obiektów publicznych",
      "Przetargi PZP — doświadczenie w zamówieniach publicznych",
    ],
    zalety: [
      "Harmonogram dopasowany do Twoich godzin pracy — zero przestojów w działalności",
      "Pełna dokumentacja powykonawcza i gwarancyjna dla działu technicznego",
      "Faktura VAT z 30-dniowym terminem płatności — standard, bez negocjacji",
    ],
    korzysci: [
      "Twoja firma działa normalnie, my remontujemy w tle",
      "Jeden wykonawca na wiele zakresów — mniej umów, mniej problemów",
      "Referencje z obiektów publicznych — audyt nie będzie problemem",
    ],
  },
];

/* ─── Komponenty pomocnicze ─────────────────────────────────────── */
function CheckList({ title, items, accent = "#f81828" }: { title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl p-5 md:p-6" style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: accent, boxShadow: `0 0 12px ${accent}66` }} />
        <h3 className="text-sm font-black uppercase tracking-widest text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#d7d7d7]">
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
      className="group rounded-2xl p-5 md:p-6 flex flex-col min-h-[240px] transition-all duration-300 hover:border-[#f81828]/40 hover:shadow-[0_8px_32px_rgba(248,24,40,0.10)]"
      style={{ background: "#0f0f0f", border: "1px solid #2a2a2a" }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(248,24,40,0.10)", border: "1px solid rgba(248,24,40,0.22)" }}>
          {svc.icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border"
          style={{
            borderColor: svc.segment === "B2B" ? "rgba(255,107,53,0.35)" : "rgba(248,24,40,0.35)",
            color: svc.segment === "B2B" ? "#ff6b35" : "#f81828",
            background: svc.segment === "B2B" ? "rgba(255,107,53,0.08)" : "rgba(248,24,40,0.08)",
          }}
        >
          {svc.segment}
        </span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#666] mb-2">{svc.badge}</p>
      <h2 className="font-display text-xl font-black text-white mb-3 group-hover:text-[#f81828] transition-colors duration-200">
        {svc.title}
      </h2>
      <p className="text-sm leading-relaxed text-[#b7b7b7] flex-1">{svc.krotkiOpis}</p>
      <div className="mt-5 pt-4 border-t border-[#1f1f1f] flex items-center justify-end">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#f81828]">
          Dowiedz się więcej <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

/* ─── Podstrona szczegółowa usługi ──────────────────────────────── */
function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[#1a1a1a]" style={{ background: "linear-gradient(180deg,#0a0a0a 0%,#050505 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "42px 42px" }} />
        <div className="absolute inset-y-0 left-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 18px rgba(248,24,40,0.45)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.22) 55%,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-9 py-12 md:py-16">
          <Link to="/uslugi" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#888] hover:text-white transition-colors mb-6">
            <ChevronRight className="w-4 h-4 rotate-180" /> Wszystkie usługi
          </Link>
          <div className="max-w-5xl grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border text-[#f81828] border-[#f81828]/30 bg-[#f81828]/10">{service.segment}</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#666]">Media Bud · Lublin i woj. lubelskie</span>
              </div>
              <h1 className="font-display font-black text-white leading-[0.95] mb-5" style={{ fontSize: "clamp(2.2rem,5.5vw,4.2rem)" }}>
                {service.title}
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#d7d7d7] max-w-2xl">
                {service.krotkiOpis}
              </p>
            </div>
            {/* CTA karta */}
            <div className="rounded-2xl p-6" style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", boxShadow: "0 20px 44px rgba(0,0,0,0.35)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.22)" }}>
                {service.icon}
              </div>
              <p className="text-xs text-[#888] mb-4 leading-relaxed">Zadzwoń lub napisz — wycenę wstępną przygotujemy w 24 h.</p>
              <div className="space-y-3">
                <a href="tel:+48533553344" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white transition-all hover:brightness-110" style={{ background: "#f81828", boxShadow: "0 12px 30px rgba(248,24,40,0.22)" }}>
                  <Phone className="w-4 h-4" /> +48 533 553 344
                </a>
                <Link to="/kontakt" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white border border-[#2a2a2a] bg-[#050505] hover:border-[#f81828]/30 transition-colors">
                  <Mail className="w-4 h-4 text-[#f81828]" /> Wyślij zapytanie
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treść */}
      <div className="container mx-auto px-4 py-10 md:py-14 space-y-6">
        <div className="grid lg:grid-cols-2 gap-5">
          <CheckList title="Co robimy" items={service.co_robimy} />
          <CheckList title="Dlaczego Media Bud" items={service.zalety} accent="#ff6b35" />
        </div>
        <CheckList title="Co zyskujesz" items={service.korzysci} />
        {service.ostrzezenia && service.ostrzezenia.length > 0 && (
          <CheckList title="Ważne informacje" items={service.ostrzezenia} accent="#888" />
        )}

        {/* CTA kontakt */}
        <div className="rounded-2xl p-7 md:p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.10),rgba(255,107,53,0.06))", border: "1px solid rgba(248,24,40,0.18)" }}>
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.15) 60%,transparent)" }} />
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-2">Zapytaj o wycenę</p>
              <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-2">
                Media Bud — ul. Chemiczna 8d, Lublin
              </h2>
              <p className="text-sm text-[#bbb] leading-relaxed">
                Zadzwoń, wyślij zakres prac lub odwiedź skład. Wycenę wstępną przygotujemy w 24 h.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-w-[220px]">
              <a href="tel:+48533553344" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white" style={{ background: "#f81828", boxShadow: "0 12px 28px rgba(248,24,40,0.25)" }}>
                <Phone className="w-4 h-4" /> Zadzwoń
              </a>
              <a href="mailto:sprzedaz@mediabud.pl" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white border border-[#2a2a2a] bg-[#0a0a0a]">
                <Mail className="w-4 h-4 text-[#f81828]" /> sprzedaz@mediabud.pl
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Główny komponent ──────────────────────────────────────────── */
export default function ServicesPage() {
  const { slug } = useParams<{ slug?: string }>();

  const service = slug ? services.find((s) => s.slug === slug) : null;
  const b2cServices = services.filter((s) => s.segment === "B2C");
  const obaServices = services.filter((s) => s.segment === "Oba");
  const b2bServices = services.filter((s) => s.segment === "B2B");

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

  /* 404 dla nieznanego sluga */
  if (slug && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#050505" }}>
        <div className="max-w-xl w-full rounded-2xl p-8 text-center" style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-3">404 · usługa nie znaleziona</p>
          <h1 className="font-display text-4xl font-black text-white mb-4">Nie znaleźliśmy tej podstrony</h1>
          <p className="text-sm text-[#b7b7b7] mb-6 leading-relaxed">Sprawdź pełną listę usług Media Bud lub skontaktuj się z nami.</p>
          <Link to="/uslugi" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white" style={{ background: "#f81828" }}>
            <ArrowRight className="w-4 h-4" /> Zobacz wszystkie usługi
          </Link>
        </div>
      </div>
    );
  }

  /* Podstrona szczegółowa */
  if (service) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ServiceDetailPage service={service} />
      </>
    );
  }

  /* Lista usług — /uslugi */
  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[#1a1a1a]" style={{ background: "linear-gradient(180deg,#0a0a0a 0%,#050505 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "42px 42px" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.22) 55%,transparent)" }} />
        <div className="absolute inset-y-0 left-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 18px rgba(248,24,40,0.45)" }} />
        <div className="relative container mx-auto px-4 pl-9 py-12 md:py-16">
          <div className="max-w-5xl grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-4">Media Bud · Lublin i woj. lubelskie</p>
              <h1 className="font-display font-black text-white leading-[0.92] mb-5" style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)" }}>
                Budujesz lub remontujesz?
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#d7d7d7] max-w-2xl">
                Media Bud to skład budowlany i firma wykonawcza w jednym — kupujesz materiały w korzystnej cenie i budujesz z naszą ekipą. Jeden partner, jeden rachunek, bez szukania podwykonawców.
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", boxShadow: "0 20px 44px rgba(0,0,0,0.35)" }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#888] mb-3">Media Bud w liczbach</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "15+",     label: "lat na rynku",           accent: "#f81828" },
                  { value: "500+",    label: "projektów wykonanych",    accent: "#f81828" },
                  { value: "50+",     label: "marek w ofercie",         accent: "#ff6b35" },
                  { value: "16 000+", label: "produktów w magazynie",   accent: "#ff6b35" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4 border border-[#1f1f1f] bg-[#0a0a0a]" style={{ borderLeft: `2px solid ${item.accent}` }}>
                    <div className="font-display font-black mb-0.5 text-2xl" style={{ color: item.accent }}>{item.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-[#888]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spot wideo */}
      <div className="border-b border-[#1a1a1a]" style={{ background: "#050505" }}>
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-[3px] h-8 bg-[#f81828] rounded-full" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828]">Spot brandowy · Media Bud</p>
                <h2 className="font-display text-2xl font-black text-white">Budujesz. Remontujesz. Media Bud.</h2>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(248,24,40,0.22)", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
              <video
                src="https://skyagent-artifacts.skywork.ai/router/agent/2026-06-08/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/spot_mediabud_logo_v2_b0620ee3b8a848d5b0d2f5e505d8cb1a.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-video"
                style={{ display: "block", background: "#050505" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lista usług */}
      <div className="container mx-auto px-4 py-10 md:py-14 space-y-12">

        {/* B2C */}
        <section className="space-y-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-2 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Klienci indywidualni · B2C
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white">Budujesz lub remontujesz prywatnie?</h2>
            <p className="text-sm text-[#888] mt-1 max-w-2xl">Dom od zera, remont łazienki, wykończenia pod klucz — wszystko w Lublinie i woj. lubelskim.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {b2cServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        {/* Oba */}
        <section className="space-y-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#ff6b35] mb-2 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#ff6b35]" />Dla domu i firm · B2C / B2B
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white">Dach i elewacja — jeden standard dla każdego</h2>
            <p className="text-sm text-[#888] mt-1 max-w-2xl">Dachy i elewacje dla prywatnych inwestorów i firm. Ten sam poziom wykonania, niezależnie od skali.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {obaServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        {/* B2B */}
        <section className="space-y-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#ff6b35] mb-2 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#ff6b35]" />Firmy i instytucje · B2B
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white">Remonty bez przestojów w Twojej działalności</h2>
            <p className="text-sm text-[#888] mt-1 max-w-2xl">Sklepy, biura, hale, szkoły — remontujemy nocą i w weekendy. Pełna dokumentacja, faktura VAT, 30-dniowy termin.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {b2bServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        {/* Kalkulator CTA */}
        <div className="rounded-2xl p-7 md:p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0f0f0f 0%,#0a0a0a 100%)", border: "1px solid rgba(248,24,40,0.22)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "38px 38px" }} />
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.15) 60%,transparent)" }} />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-7">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.28)" }}>
                <Check className="w-7 h-7 text-[#f81828]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-2">Bezpłatne narzędzie</p>
                <h2 className="font-display text-xl md:text-2xl font-black text-white mb-2">Oblicz zużycie materiałów</h2>
                <p className="text-sm text-[#b7b7b7] leading-relaxed max-w-xl">
                  Tynk, styropian, klej do płytek, farba elewacyjna — kalkulator budowlany oblicza ilości i szacunkowy koszt. Zero arkuszy Excel.
                </p>
              </div>
            </div>
            <Link
              to="/kalkulator"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-black uppercase tracking-wider text-white flex-shrink-0 transition-all hover:brightness-110 hover:scale-[1.02]"
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
