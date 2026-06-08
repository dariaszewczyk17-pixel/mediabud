import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { Phone, Users, Award, ArrowRight,
         Home, PaintBucket, Hammer, Building2, HousePlus, ExternalLink, Shield,
         MapPin, Zap } from "lucide-react";

const card = { background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" } as const;
const cardHover = "hover:border-[#f81828]/30 hover:shadow-[0_8px_32px_rgba(248,24,40,0.10)] transition-all duration-300";


export function AboutPage() {
  const location = useLocation();
  const isRealizacje = location.pathname.includes("realizacje");

  useSEO(isRealizacje ? {
    title: "Realizacje – Media Bud Lublin | Portfolio budów, remontów i elewacji",
    description: "Przegląd wybranych realizacji Media Bud w Lublinie i województwie lubelskim — budowy domów, ocieplenia, elewacje, remonty B2B i wykończenia wnętrz.",
    canonical: "/realizacje",
  } : {
    title: "O firmie – Media Bud | Skład Budowlany Lublin od ponad 15 lat",
    description: "Media Bud to hurtownia materiałów budowlanych i skład w Lublinie. Obsługujemy deweloperów, wykonawców i klientów indywidualnych. Poznaj naszą historię i wartości.",
    canonical: "/o-firmie",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
            { "@type": "ListItem", "position": 2, "name": "O firmie",       "item": "https://mediabud.pl/o-firmie" },
          ],
        },
        {
          "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
          "@id": "https://mediabud.pl/#localbusiness",
          "name": "Media Bud – Skład Budowlany",
          "legalName": "Media Bud",
          "url": "https://mediabud.pl",
          "description": "Skład budowlany i hurtownia materiałów budowlanych w Lublinie. Ponad 15 000 produktów, 268 marek, dostawa, doradztwo, faktura VAT.",
          "telephone": "+48533553344",
          "email": "sprzedaz@mediabud.pl",
          "taxID": "9462743421",
          "vatID": "9462743421",
          "foundingDate": "2008",
          "logo": NAP_LOGO,
          "image": "https://mediabud.pl/images/hero-materialy_2.png",
          "address": NAP_ADDRESS,
          "geo": NAP_GEO,
          "openingHoursSpecification": NAP_HOURS,
          "hasMap": "https://maps.google.com/maps?q=ul.+Chemiczna+8d,+20-329+Lublin",
          "priceRange": "$$",
          "currenciesAccepted": "PLN",
          "paymentAccepted": "Gotówka, przelew bankowy, karta płatnicza, faktura VAT",
          "areaServed": NAP_AREA_SERVED,
          "amenityFeature": NAP_AMENITIES,
          "contactPoint": NAP_CONTACT_POINT,
          "sameAs": NAP_SAME_AS,
          "offers": {
            "@type": "AggregateOffer",
            "offerCount": 15000,
            "priceCurrency": "PLN",
            "description": "Materiały budowlane: systemy ociepleń, tynki, płyty GK, izolacje, farby, chemia budowlana",
          },
        },
      ],
    }
  });

  const stats = [
    { value: "15+", label: "lat doświadczenia" },
    { value: "15 tys.+", label: "produktów w ofercie" },
    { value: "500+", label: "zrealizowanych projektów" },
    { value: "50+", label: "partnerów-producentów" },
  ];



  const realizacje = [
    {
      category: "Budynek mieszkalno-usługowy",
      location: "Lublin, ul. Onyksowa (Czuby)",
      scope: "Kompleksowa dostawa materiałów budowlanych: systemy ETICS, tynki elewacyjne, chemia budowlana, materiały wykończeniowe — 7-kondygnacyjny budynek mieszkalno-usługowy.",
      year: "2024",
      image: "/images/real-onyksowa.jpg",
      client: "Onyksowa Design",
      url: "https://onyksowadesign.pl/",
    },
    {
      category: "Osiedle wielorodzinne",
      location: "Łęczna, ul. Wierzbowa",
      scope: "Dostawa materiałów konstrukcyjnych i wykończeniowych: bloczki, zaprawy murowe, systemy elewacyjne, materiały izolacyjne — 5 budynków wielorodzinnych.",
      year: "2025",
      image: "/images/real-polesie-park.jpg",
      client: "TBV Deweloper — Polesie Park",
      url: "https://tbv.pl/polesie-park-nowe-mieszkania-leczna-2-2/",
    },
    {
      category: "Kameralne osiedle mieszkaniowe",
      location: "Lublin",
      scope: "Kompleksowa dostawa materiałów budowlanych: chemia budowlana, materiały elewacyjne, izolacje, tynki — deweloperski standard wykończenia.",
      year: "2025",
      image: "/images/real-lubelska-osada.jpg",
      client: "Lubelska Osada Sp. z o.o.",
      url: "https://lubelskaosada.pl/",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2) 60%,transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top,#080808,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-10 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-3">O firmie</p>
              <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-4 leading-tight">O firmie Media Bud</h1>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Profesjonalna hurtownia materiałów budowlanych w Lublinie. Obsługujemy deweloperów, wykonawców i klientów indywidualnych, oferując kompleksowe wsparcie techniczne i najwyższą jakość produktów.</p>
              <div className="flex gap-3 flex-wrap">
                <a href="tel:+48533553344">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f81828] text-white text-sm font-bold hover:bg-[#c8000f] transition-all hover:shadow-[0_0_16px_rgba(248,24,40,0.4)]">
                    <Phone className="w-4 h-4" /> Zadzwoń
                  </button>
                </a>
                <Link to="/kontakt">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-gray-300 hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                    Napisz do nas
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <div key={i} className="rounded-xl p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="font-display font-black text-3xl text-[#f81828] mb-1">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">

        {/* Misja */}
        <div className="rounded-xl p-8" style={card}>
          <h2 className="font-display text-2xl font-black text-white mb-4 flex items-center gap-2">
            <span className="w-[3px] h-6 bg-[#f81828] rounded-full" /> Nasza misja
          </h2>
          <p className="text-gray-400 leading-relaxed mb-3">Media Bud to więcej niż skład budowlany. Jesteśmy lokalnym partnerem w realizacji projektów budowlanych na terenie Lublina i województwa lubelskiego — od małych remontów domowych po duże inwestycje deweloperskie i obiekty użyteczności publicznej.</p>
          <p className="text-gray-400 leading-relaxed">Nasza misja to dostarczanie sprawdzonych materiałów budowlanych połączone z praktycznym doradztwem technicznym. Pomagamy inwestorom, wykonawcom i firmom budować lepiej, szybciej i efektywniej — z jednego miejsca, bez zbędnych pośredników.</p>
        </div>
      </div>

      {/* ── Nasze wartości ── */}
      <section className="py-16" style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: "#f81828" }}>— CO NAS WYRÓŻNIA —</p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-3">Kilka słów o tym, jak pracujemy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🤝", title: "Jeden partner", desc: "Materiały, doradztwo i koordynacja wykonawców — wszystko w jednym miejscu. Budujesz z jednym punktem kontaktu, nie z dziesiątką podwykonawców." },
              { icon: "📐", title: "Konkretna wycena", desc: "Nie operujemy ogólnikami. Przygotowujemy wycenę opartą na Twoim projekcie, wybranej technologii i harmonogramie — bez ukrytych kosztów." },
              { icon: "🏗️", title: "Sprawdzone ekipy", desc: "Współpracujemy z tynkarzami, murarzami, dekarzami i specjalistami wykończenia, których znamy z realizacji. Polecamy sprawdzonych, nie losowych." },
              { icon: "🔧", title: "Doradztwo techniczne", desc: "Mamy materiały wiodących marek: Weber, Ceresit, Atlas, Knauf, Rockwool i innych. Doradzamy, który system sprawdzi się w Twoich warunkach." },
              { icon: "🏢", title: "Duże i małe projekty", desc: "Obsługujemy zarówno domy jednorodzinne, jak i galerie handlowe, szkoły i budynki użyteczności publicznej. Dostosowujemy logistykę do skali inwestycji." },
              { icon: "📍", title: "Lublin i region", desc: "Działamy w Lublinie i województwie lubelskim. Znamy lokalny rynek, ceny materiałów i realia budowy w naszym regionie." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-6 transition-all duration-300"
                style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.35)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a"; }}>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">

        {/* Partnerzy */}
        <div className="rounded-xl p-8" style={card}>
          <h2 className="font-display text-2xl font-black text-white mb-2 flex items-center gap-2">
            <span className="w-[3px] h-6 bg-[#f81828] rounded-full" /> Nasi partnerzy i dostawcy
          </h2>
          <p className="text-gray-500 text-sm mb-6">Współpracujemy z wiodącymi producentami materiałów budowlanych, gwarantując oryginalność i jakość każdego produktu.</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            {[
              { name: "Weber",    url: "https://static.www.bechcicki.pl/cms/1c6a19bca34f4da99131e0736ea4af9d-weber.png" },
              { name: "Ceresit",  url: "https://static.www.bechcicki.pl/cms/0dd0ae5703cd43b1afdcfca87416fd05-ceresit.png" },
              { name: "Atlas",    url: "https://static.www.bechcicki.pl/cms/ae397a1ebebc4e3083ff5765cff0ea4c-atlas.png" },
              { name: "Knauf",    url: "https://static.www.bechcicki.pl/cms/189dc43be7ae469eacd2a1eae4ef0c03-knauf-nowy.png" },
              { name: "Rockwool", url: "https://static.www.bechcicki.pl/cms/c742dfc82d1c42bb9fe0bc086f8ba822-rockwool.png" },
              { name: "Baumit",   url: "https://static.www.bechcicki.pl/cms/e4952888b3504ee78cbb6685f844b4cf-baumit-new.png" },
              { name: "Rigips",   url: "https://static.www.bechcicki.pl/cms/101a8b40f4e6454483f7cc7f6cb25cd7-rigips.png" },
              { name: "URSA",     url: "https://static.www.bechcicki.pl/cms/c6adf9efc58b4309bca4ca1642741842-ursa-etex.png" },
              { name: "Mapei",    url: "https://static.www.bechcicki.pl/cms/581c437c6b7a42b89a3151f944e3ed4e-mapei.png" },
              { name: "Sika",     url: "https://static.www.bechcicki.pl/cms/e2212f996bef427797215b970fcc6af1-sika.png" },
              { name: "Velux",    url: "https://static.www.bechcicki.pl/cms/f6736747f0f74f23bcf4900e60598c9d-velux.png" },
              { name: "Fakro",    url: "https://static.www.bechcicki.pl/cms/34b06a260cdd46d295f0be4e762a2580-fakro.png" },
            ].map(brand => (
              <div key={brand.name}
                className="flex flex-col items-center rounded-lg overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-full flex items-center justify-center p-2" style={{ background: "#fff", minHeight: "48px" }}>
                  <img src={brand.url} alt={`Logo ${brand.name}`} loading="lazy"
                    className="max-h-[32px] max-w-[70px] w-auto object-contain" />
                </div>
                <div className="w-full h-[2px]" style={{ background: "linear-gradient(90deg,#f81828 12px,rgba(255,255,255,0.05) 12px)" }} />
                <span className="text-[9px] font-semibold text-gray-500 py-1.5 px-1 text-center truncate w-full">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Wybrane realizacje ── */}
        <div className="rounded-xl p-8" style={card}>
          <h2 className="font-display text-2xl font-black text-white mb-2 flex items-center gap-2">
            <span className="w-[3px] h-6 bg-[#f81828] rounded-full" /> Nasze realizacje
          </h2>
          <p className="text-gray-500 text-sm mb-6">Projekty zrealizowane przy wsparciu materiałowym i wykonawczym Media Bud — byliśmy głównym wykonawcą i dostawcą materiałów budowlanych.</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {realizacje.map((r, i) => (
              <div key={i} className="rounded-xl overflow-hidden transition-all duration-200 flex flex-col"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.35)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}>
                {/* Zdjęcie */}
                {r.image && (
                  <div className="h-44 overflow-hidden">
                    <img src={r.image} alt={r.client} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#f81828]">{r.category}</span>
                    <span className="text-[10px] text-gray-600 font-mono">{r.year}</span>
                  </div>
                  {r.client && (
                    <div className="text-sm font-bold text-white mb-1">{r.client}</div>
                  )}
                  <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" /> {r.location}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed flex-1">{r.scope}</p>
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#f81828] hover:underline">
                      Strona inwestycji <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="py-14" style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: "#f81828" }}>— ZACZYNAMY? —</p>
          <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-4">Kompleksowe wsparcie dla Twojego projektu</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Niezależnie czy planujesz budowę domu, remont, ocieplenie czy kompleksowe wykończenie — skontaktuj się z nami. Przygotujemy wycenę, dobierzemy materiały i zaproponujemy ścieżkę realizacji.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:+48533553344">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f81828] text-white text-sm font-bold hover:bg-[#c8000f] transition-all hover:shadow-[0_0_20px_rgba(248,24,40,0.4)]">
                <Phone className="w-4 h-4" /> +48 533 553 344
              </button>
            </a>
            <Link to="/kontakt">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                Napisz do nas
              </button>
            </Link>
            <Link to="/uslugi">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#f81828] hover:text-white transition-colors" style={{ border: "1px solid rgba(248,24,40,0.35)" }}>
                <ArrowRight className="w-4 h-4" /> Nasze usługi
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ─────────────────────────────────────────────────

type ServiceSegment = "B2C" | "B2B" | "Oba";

type ServiceDetail = {
  slug: string;
  title: string;
  segment: ServiceSegment;
  icon: React.ReactNode;
  badge: string;
  krotkiOpis: string;
  dlugiOpis: string;
  parametry: string[];
  zastosowanie: string[];
  zalety: string[];
  korzysci: string[];
  ostrzezenia: string[];
  frazySEO: string[];
  cta: string;
};

type FaqItem = { q: string; a: string };

const services: ServiceDetail[] = [
  {
    slug: "dom-od-podstaw",
    title: "Dom od podstaw",
    segment: "B2C",
    icon: <Shield className="w-6 h-6 text-[#f81828]" />,
    badge: "Program parasolowy B2C",
    krotkiOpis: "Program MediaBud dla inwestorów z Lublina i województwa lubelskiego, który łączy wycenę, dobór materiałów, koordynację ekip i realizację domu od pierwszego kontaktu po etap wykończeniowy.",
    dlugiOpis: `Budowa domu to złożony proces, który wymaga dziesiątek decyzji — od wyboru materiałów, przez koordynację ekip, aż po logistykę dostaw. Program 'Dom od podstaw" powstał po to, żeby inwestor miał jeden punkt kontaktu zamiast kilkunastu. Zaczynamy od analizy projektu i rozmowy o budżecie, ustalamy harmonogram etapów i dobieramy materiały z naszego składu — Weber, Ceresit, Atlas, Knauf, Rockwool, Swisspor, Bolix, Baumit, Rigips i inne. Następnie koordynujemy prace ekip i dbamy o to, żeby każdy etap — od fundamentów, przez ściany i dach, po wykończenie — przebiegał bez przestojów. Jesteśmy z Tobą od pierwszego spotkania do odbioru kluczy.`,
    parametry: [
      "Zakres: od wyceny i doboru materiałów po realizację wybranych etapów lub całości inwestycji.",
      "Obsługa lokalna: Lublin i województwo lubelskie.",
      "Model współpracy: konsultacja, kosztorys, harmonogram dostaw, rekomendacja lub koordynacja ekip.",
      "Materiały systemowe: Weber, Ceresit, Atlas, Knauf, Rockwool, Swisspor, Bolix, Termo Organika, Baumit, Rigips, Ursa.",
      "Kontakt operacyjny: ul. Chemiczna 8, 20-329 Lublin, +48 533 553 344, sprzedaz@mediabud.pl.",
      "Koszt realizacji programu: [do potwierdzenia] — zależny od zakresu i etapu inwestycji."
    ],
    zastosowanie: [
      "Budowa domu jednorodzinnego od stanu zero do wykończenia.",
      "Prowadzenie inwestycji etapami z kontrolą budżetu i dostaw.",
      "Dobór materiałów oraz wykonawców dla inwestora bez własnego zaplecza technicznego.",
      "Koordynacja prac ociepleniowych, dekarskich, elewacyjnych i wykończeniowych.",
      "Współpraca z klientem, który chce jeden punkt kontaktu zamiast wielu podwykonawców."
    ],
    zalety: [
      "Jedna ścieżka obsługi od wyceny po realizację.",
      "Połączenie składu budowlanego z praktycznym doradztwem wykonawczym.",
      "Lepsza kontrola harmonogramu dostaw i etapowania robót.",
      "Dostęp do sprawdzonej sieci fachowców z regionu.",
      "Treść zoptymalizowana pod lokalne zapytania typu budowa domu Lublin i dom od podstaw lubelskie."
    ],
    korzysci: [
      "Mniej czasu poświęconego na samodzielne szukanie ekip i materiałów.",
      "Mniejsze ryzyko nietrafionych zamówień oraz przestojów na budowie.",
      "Spójność systemów materiałowych od stanu surowego po wykończenie.",
      "Łatwiejsza komunikacja między inwestorem, składem i wykonawcą."
    ],
    ostrzezenia: [
      "Zakres programu i odpowiedzialność za poszczególne etapy trzeba każdorazowo potwierdzić w wycenie.",
      "Nie każda technologia lub termin jest dostępny od ręki — zależy to od obłożenia ekip i producentów.",
      "Dane budżetowe i terminy wstępne należy traktować jako orientacyjne do czasu analizy projektu.",
      "Formalności projektowe, administracyjne i odbiorowe wymagają odrębnego potwierdzenia zakresu po stronie inwestora lub partnerów."
    ],
    frazySEO: ["dom od podstaw Lublin", "budowa domu od wyceny po realizację", "skład budowlany z wykonawstwem Lublin", "budowa domu lubelskie"],
    cta: "Umów konsultację programu Dom od podstaw"
  },
  {
    slug: "budowa-domow-lublin",
    title: "Budowa domów Lublin",
    segment: "B2C",
    icon: <Home className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C · stan surowy do pod klucz",
    krotkiOpis: "Kompleksowa budowa domów jednorodzinnych w Lublinie i województwie lubelskim z naciskiem na logistykę materiałów, dobór technologii i sprawdzone ekipy wykonawcze.",
    dlugiOpis: `Oferujemy kompleksową budowę domów jednorodzinnych w Lublinie i okolicach, łącząc materiały z własnego składu z ekipami wykonawczymi, które znamy i którym ufamy. Każda realizacja zaczyna się od analizy projektu i przygotowania szczegółowej wyceny. Następnie prowadzimy budowę etapami — fundamenty, ściany, strop, dach — pilnując harmonogramu i jakości. Orientacyjne koszty budowy w naszym regionie to ok. 4 500–6 000 zł netto za m² w stanie deweloperskim; finalną wycenę zawsze opieramy na konkretnym projekcie, technologii i zakresie robót. Nie deklarujemy gotowych pakietów — zamiast tego przygotowujemy ofertę skrojoną na miarę Twojej inwestycji.`,
    parametry: [
      "Segment: B2C, domy jednorodzinne i inwestycje prywatne.",
      "Zasięg: Lublin i województwo lubelskie.",
      "Etapy: fundamenty, stan surowy, dach, elewacja, wybrane etapy pod klucz.",
      "Koszt stanu deweloperskiego wg researchu: 4500–6000 zł netto/m².",
      "Koszt domu pod klucz premium wg researchu regionalnego: 6800–9000 zł/m².",
      "Technologie i systemy dobierane indywidualnie do projektu oraz budżetu inwestora."
    ],
    zastosowanie: [
      "Budowa domu jednorodzinnego od podstaw.",
      "Realizacja domu z dostawą materiałów z jednego składu budowlanego.",
      "Etapowanie inwestycji na stan surowy, deweloperski lub rozszerzony zakres wykonawczy.",
      "Obsługa inwestorów z Lublina, Świdnika, Puław i innych miejscowości województwa lubelskiego.",
      "Optymalizacja projektu pod koszty wykonawcze i logistykę placu budowy."
    ],
    zalety: [
      "Jedna oferta łącząca materiały, doradztwo i wykonawstwo.",
      "Silne dopasowanie do lokalnych zapytań: budowa domów Lublin, budowa domu lubelskie.",
      "Możliwość etapowania prac zgodnie z budżetem inwestora.",
      "Dobór sprawdzonych marek i systemów budowlanych.",
      "Przejrzysta komunikacja kosztowa bez sztucznego obiecywania stawek bez projektu."
    ],
    korzysci: [
      "Łatwiejsze porównanie technologii i kosztów na starcie inwestycji.",
      "Lepsza kontrola nad terminami oraz dostawami materiałów.",
      "Mniejsze ryzyko zakupów niespójnych systemowo.",
      "Wsparcie inwestora na etapie decyzji technicznych i organizacyjnych."
    ],
    ostrzezenia: [
      "Finalna wycena zależy od projektu, gruntu, bryły budynku i standardu wykończenia.",
      "Podane w researchu widełki kosztowe są orientacyjne i nie stanowią oferty handlowej.",
      "Terminy realizacji trzeba potwierdzić po określeniu zakresu i dostępności ekip.",
      "Roboty dodatkowe oraz zmiany projektowe w trakcie budowy wpływają na koszt i harmonogram."
    ],
    frazySEO: ["budowa domów Lublin", "budowa domu Lublin", "budowa domu lubelskie", "dom pod klucz Lublin"],
    cta: "Poproś o wycenę budowy domu w Lublinie"
  },
  {
    slug: "termomodernizacja-ocieplenia",
    title: "Termomodernizacja i ocieplenia",
    segment: "B2C",
    icon: <Zap className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C · oszczędność energii",
    krotkiOpis: "Kompleksowa termomodernizacja domu w Lublinie: ocieplenie ścian, dobór systemu ETICS, wsparcie w doborze materiałów i przygotowaniu inwestycji pod programy dotacyjne.",
    dlugiOpis: `Ocieplenie domu to inwestycja, która zwraca się przez lata niższych rachunków za ogrzewanie. Pomagamy dobrać odpowiedni system — ETICS ze styropianem grafitowym, białym EPS lub wełną mineralną — w zależności od budynku, jego podłoża i oczekiwanej efektywności energetycznej. Współpracujemy z systemami marek Weber, Ceresit, Atlas, Rockwool, Swisspor, Termo Organika i Baumit. Jeśli planujesz skorzystać z programu Czyste Powietrze (dofinansowanie może sięgać do 136 200 zł), pomagamy ułożyć inwestycję pod wymagania programu — dobieramy materiały, omawiamy zakres robót i wspieramy w przygotowaniu dokumentacji. Szczegóły dofinansowania zależą od indywidualnej sytuacji i aktualnych przepisów, dlatego zawsze omawiamy je konkretnie dla danego projektu.`,
    parametry: [
      "Zakres: ocena potrzeb budynku, dobór systemu ocieplenia, materiały, wykonawstwo i logistyka.",
      "Dofinansowanie wg researchu: do 136 200 zł w programie Czyste Powietrze.",
      "Prefinansowanie wg WFOŚiGW Lublin: do 35% przy spełnieniu warunków programu.",
      "Materiały: styropian, wełna mineralna, kleje, siatki, grunty, tynki, farby elewacyjne.",
      "Marki: Weber, Ceresit, Atlas, Rockwool, Swisspor, Bolix, Termo Organika, Baumit.",
      "Powiązanie z OZE i dodatkowymi programami: Mój Prąd — zakres i aktualność [do potwierdzenia] przed wdrożeniem do oferty."
    ],
    zastosowanie: [
      "Ocieplenie starszego domu jednorodzinnego.",
      "Termomodernizacja budynku przed sezonem grzewczym.",
      "Modernizacja elewacji połączona z poprawą efektywności energetycznej.",
      "Przygotowanie inwestycji do wniosku lub rozliczenia programu Czyste Powietrze.",
      "Połączenie ocieplenia z wymianą wybranych warstw wykończeniowych elewacji."
    ],
    zalety: [
      "Lokalne dopasowanie do potrzeb inwestorów z Lublina i lubelskiego.",
      "Łączenie wiedzy materiałowej ze wsparciem wykonawczym.",
      "Realna komunikacja korzyści energetycznych i formalnych bez nadużyć sprzedażowych.",
      "Możliwość pracy na kompletnych systemach renomowanych marek.",
      "Treść odpowiada na pytania SEO/AEO: ile można dostać, jak zacząć, jakie materiały wybrać."
    ],
    korzysci: [
      "Niższe straty ciepła i większy komfort użytkowania budynku.",
      "Lepsze uporządkowanie kosztów inwestycji i dokumentacji wykonawczej.",
      "Spójność materiałów i wykonania w jednym procesie.",
      "Większa przewidywalność harmonogramu robót ociepleniowych."
    ],
    ostrzezenia: [
      "Warunki programu Czyste Powietrze mogą się zmieniać, dlatego każdy przypadek trzeba potwierdzić przed podpisaniem umowy.",
      "MediaBud nie gwarantuje przyznania dotacji — decyzja zależy od programu i sytuacji beneficjenta.",
      "Zakres programu Mój Prąd należy potwierdzić na dzień zapytania; nie wolno komunikować nieistniejących edycji lub gwarantowanych dopłat.",
      "Dobór grubości izolacji i systemu powinien wynikać z parametrów budynku, a nie wyłącznie z ceny materiału."
    ],
    frazySEO: ["termomodernizacja Lublin", "ocieplenie domu Lublin", "Czyste Powietrze Lublin", "ocieplenia lubelskie"],
    cta: "Zapytaj o wycenę termomodernizacji domu"
  },
  {
    slug: "wykonczenia-wnetrz-pod-klucz",
    title: "Wykończenia wnętrz pod klucz",
    segment: "B2C",
    icon: <PaintBucket className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C · gotowe do zamieszkania",
    krotkiOpis: "Kompleksowe wykończenia wnętrz pod klucz dla domów i mieszkań w Lublinie — od materiałów i suchej zabudowy po finalne warstwy dekoracyjne.",
    dlugiOpis: `Usługa wykończenia wnętrz pod klucz odpowiada na lokalne zapotrzebowanie na realizacje ‚całej przestrzeni', a nie pojedynczych pomieszczeń — dokładnie taki model podkreślają analizowane strony konkurencji z Lublina. MediaBud rozwija tę ofertę w oparciu o przewagę składu budowlanego: łatwy dostęp do materiałów, wsparcie w doborze systemów Knauf, Rigips, Atlas, Weber i Baumit oraz koordynację ekip od suchej zabudowy, gładzi, malowania, podłóg i zabudów poddaszy. Usługa jest kierowana do inwestorów, którzy chcą odebrać wnętrze gotowe do użytkowania lub gotowe do wyposażenia, bez samodzielnego zarządzania wieloma wykonawcami. W treści podkreślamy spójność projektu, ograniczenie ryzyka nieprzewidzianych kosztów i sensowne etapowanie materiałów — zgodnie z tym, czego szukają użytkownicy wpisujący w Google frazy typu wykończenia wnętrz pod klucz Lublin czy mieszkanie pod klucz Lublin.`,
    parametry: [
      "Zakres: od konsultacji materiałowej po koordynację prac wykończeniowych.",
      "Obsługiwane przestrzenie: domy, mieszkania, biura i lokale usługowe.",
      "Materiały: suche zabudowy, gładzie, farby, kleje, systemy podłogowe, izolacje akustyczne.",
      "Marki: Knauf, Rigips, Atlas, Weber, Baumit, Ursa.",
      "Model rozliczenia: wg zakresu robót i standardu wykończenia [do potwierdzenia].",
      "Obszar działania: Lublin i najbliższe okolice oraz województwo lubelskie po ustaleniu logistyki."
    ],
    zastosowanie: [
      "Wykończenie nowego domu jednorodzinnego.",
      "Przygotowanie mieszkania deweloperskiego do zamieszkania.",
      "Realizacja biura lub lokalu usługowego w standardzie gotowym do użytkowania.",
      "Koordynacja wielu etapów wykończeniowych przez jednego partnera.",
      "Prace wymagające spójności materiałów i harmonogramu dostaw."
    ],
    zalety: [
      "Jedno miejsce zakupu materiałów i organizacji wykonawstwa.",
      "Lepsza kontrola nad spójnością estetyczną oraz techniczną wnętrza.",
      "Wsparcie przy wyborze rozwiązań do suchej zabudowy, poddaszy i malowania.",
      "Treść odpowiada na lokalne frazy transakcyjne i informacyjne związane z pod klucz.",
      "Możliwość pracy w modelu etapowym lub kompleksowym."
    ],
    korzysci: [
      "Oszczędność czasu inwestora przy organizacji wykończenia.",
      "Mniejsza liczba błędów wynikających z rozdzielenia materiałów i wykonawstwa.",
      "Jasny punkt kontaktu w sprawach technicznych i logistycznych.",
      "Lepsze dopasowanie standardu wykończenia do budżetu i oczekiwań."
    ],
    ostrzezenia: [
      "Bez projektu lub szczegółowego zakresu nie da się rzetelnie oszacować pełnego budżetu.",
      "Wykończenie pod klucz może obejmować różne poziomy standardu — trzeba je zapisać w ofercie.",
      "Prace specjalistyczne i meble na wymiar mogą wymagać osobnego harmonogramu.",
      "Nie każda realizacja obejmuje pojedyncze pomieszczenia; zakres należy potwierdzić na starcie."
    ],
    frazySEO: ["wykończenia wnętrz pod klucz Lublin", "mieszkanie pod klucz Lublin", "wykończenia wnętrz Lublin", "remont pod klucz lubelskie"],
    cta: "Zapytaj o wykończenie wnętrz pod klucz"
  },
  {
    slug: "uslugi-dekarskie-lublin",
    title: "Usługi dekarskie Lublin",
    segment: "Oba",
    icon: <Hammer className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C / B2B · dachy i pokrycia",
    krotkiOpis: "Usługi dekarskie dla inwestorów indywidualnych i firm: dachy skośne, wybrane prace naprawcze, wymiany pokrycia oraz koordynacja materiałów dachowych.",
    dlugiOpis: `Dach to jeden z kluczowych etapów budowy — i jeden z tych, gdzie błędy wykonawcze są najbardziej kosztowne. Współpracujemy ze sprawdzonymi ekipami dekarskimi i pomagamy dobrać materiały pokryciowe, izolacje i akcesoria do konkretnego projektu. Obsługujemy zarówno nowe dachy skośne, jak i wymiany pokrycia czy prace naprawcze. Zakres każdej realizacji ustalamy po oględzinach i analizie dokumentacji — bez schematycznych ofert cenowych.`,
    parametry: [
      "Segment: B2C i B2B.",
      "Zakres: nowe dachy, wymiany pokryć, wybrane naprawy i prace towarzyszące.",
      "Powiązane materiały: pokrycia, folie, membrany, izolacje, akcesoria dachowe.",
      "Dobór rozwiązań materiałowych i logistyki dostaw na budowę.",
      "Obsługa lokalna: Lublin i województwo lubelskie.",
      "Koszt usługi: [do potwierdzenia] po oględzinach lub analizie projektu."
    ],
    zastosowanie: [
      "Dach w nowo budowanym domu jednorodzinnym.",
      "Wymiana pokrycia lub modernizacja dachu istniejącego budynku.",
      "Prace dekarskie przy obiektach usługowych i małych inwestycjach firmowych.",
      "Koordynacja dostaw materiałów dekarskich i ekip montażowych.",
      "Roboty uzupełniające przy budowie, termomodernizacji lub remoncie."
    ],
    zalety: [
      "Spójna obsługa materiałów i wykonawstwa.",
      "Oferta ważna zarówno dla klientów prywatnych, jak i firm.",
      "Dopasowanie do lokalnych zapytań typu usługi dekarskie Lublin.",
      "Możliwość łączenia prac dachowych z elewacją lub budową domu.",
      "Wsparcie logistyczne składu budowlanego przy dostawach na inwestycję."
    ],
    korzysci: [
      "Krótsza ścieżka od zapytania do realizacji prac dekarskich.",
      "Lepsza kontrola jakości materiałów użytych na dachu.",
      "Mniejsze ryzyko niedopasowania akcesoriów i warstw systemowych.",
      "Wygodniejsza organizacja prac przy większych inwestycjach etapowych."
    ],
    ostrzezenia: [
      "Stan więźby, konstrukcji i podłoża trzeba potwierdzić przed wyceną.",
      "Prace dekarskie są silnie zależne od pogody i sezonu.",
      "Nie każda usługa obejmuje pełny zakres remontu dachu — wymaga to zapisu w ofercie.",
      "Materiały i terminy mogą się różnić zależnie od typu pokrycia oraz dostępności."
    ],
    frazySEO: ["usługi dekarskie Lublin", "dekarz Lublin", "pokrycia dachowe Lublin", "remont dachu lubelskie"],
    cta: "Wyceń dach lub prace dekarskie"
  },
  {
    slug: "elewacje-tynki-lublin",
    title: "Elewacje i tynki Lublin",
    segment: "Oba",
    icon: <Award className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C / B2B · elewacje systemowe",
    krotkiOpis: "Wykonanie elewacji i tynków zewnętrznych w Lublinie dla domów, lokali i obiektów usługowych z wykorzystaniem systemów renomowanych marek.",
    dlugiOpis: `Elewacja to wizytówka budynku i jednocześnie ochrona ścian przed wilgocią i temperaturą. Pracujemy na systemach Weber, Ceresit, Atlas, Bolix i Baumit — tynki silikonowe, silikatowe, mineralne i akrylowe — dobierając rodzaj wykończenia do podłoża, stylu architektonicznego i warunków eksploatacyjnych. Usługę realizujemy zarówno dla domów jednorodzinnych, jak i obiektów usługowych czy modernizowanych budynków. Zakres typowo obejmuje: przygotowanie podłoża, wykonanie warstw systemowych i finalne wykończenie elewacji. Dokładny zakres i dobór kolorów ustalamy razem z inwestorem przed startem prac.`,
    parametry: [
      "Segment: B2C i B2B.",
      "Zakres: przygotowanie podłoża, warstwy systemowe, tynki i wykończenie elewacji.",
      "Marki: Weber, Ceresit, Atlas, Bolix, Baumit.",
      "Typy tynków: silikonowe, silikatowe, mineralne i inne dobierane do projektu.",
      "Kolorystyka i rozwiązania estetyczne dobierane indywidualnie.",
      "Koszt realizacji: [do potwierdzenia] po pomiarach i określeniu zakresu."
    ],
    zastosowanie: [
      "Nowa elewacja domu jednorodzinnego.",
      "Odświeżenie lub modernizacja istniejącej elewacji.",
      "Wykończenie budynku usługowego lub małego obiektu komercyjnego.",
      "Połączenie elewacji z ociepleniem lub termomodernizacją.",
      "Tynkowanie zewnętrzne w inwestycjach etapowych."
    ],
    zalety: [
      "Praca na kompletnych systemach elewacyjnych.",
      "Wsparcie przy doborze koloru, struktury i typu tynku.",
      "Oferta dla klientów prywatnych i biznesowych.",
      "Silne dopasowanie do lokalnych zapytań elewacje Lublin i tynki Lublin.",
      "Możliwość połączenia z ociepleniem, dachem lub budową domu."
    ],
    korzysci: [
      "Trwalsza i bardziej estetyczna powłoka zewnętrzna budynku.",
      "Mniejsze ryzyko przypadkowego łączenia niespójnych materiałów.",
      "Łatwiejsze planowanie całości inwestycji dzięki jednemu partnerowi.",
      "Lepsze dopasowanie elewacji do warunków lokalnych i stylu obiektu."
    ],
    ostrzezenia: [
      "Rodzaj tynku i technologia muszą być dopasowane do podłoża oraz warunków wilgotnościowych.",
      "Prace elewacyjne wymagają odpowiednich warunków pogodowych.",
      "Ostateczna kolorystyka powinna być potwierdzona próbą lub wzornikiem.",
      "Brak przygotowania podłoża może obniżyć trwałość całego systemu."
    ],
    frazySEO: ["elewacje Lublin", "tynki elewacyjne Lublin", "tynki Lublin", "elewacje lubelskie"],
    cta: "Zapytaj o elewację lub tynki w Lublinie"
  },
  {
    slug: "remonty-b2b-lublin",
    title: "Remonty B2B Lublin",
    segment: "B2B",
    icon: <Building2 className="w-6 h-6 text-[#f81828]" />,
    badge: "B2B · galerie, szkoły, obiekty publiczne",
    krotkiOpis: "Oferta remontów i modernizacji dla firm oraz instytucji: galerie handlowe, szkoły, obiekty użyteczności publicznej i inne realizacje wymagające logistyki materiałowej oraz koordynacji wykonawczej.",
    dlugiOpis: `Obsługujemy remonty i modernizacje dla firm, instytucji i zarządców obiektów. Galerie handlowe, szkoły, budynki użyteczności publicznej, biurowce — realizacje obiektowe wymagają innego podejścia niż prace przy domu prywatnym: ścisłego harmonogramu, logistyki materiałowej bez przestojów i koordynacji ekip pracujących etapami. MediaBud łączy rolę partnera materiałowego z organizacją wykonawstwa — jeden kontakt, przejrzysta wycena, terminowość. Zakres może obejmować odświeżenie wnętrz, przebudowy, prace wykończeniowe i modernizacje — realizowane również w czynnych obiektach.`,
    parametry: [
      "Segment: B2B.",
      "Obsługiwane obiekty: galerie, szkoły, biura, lokale usługowe, obiekty użyteczności publicznej.",
      "Zakres: remonty, modernizacje, wykończenia, dostawy materiałów, koordynacja ekip.",
      "Model współpracy: wycena po zakresie, harmonogram etapów, uzgodnienia logistyczne.",
      "Materiały dobierane do wymogów obiektu i specyfiki użytkowania.",
      "Koszty i terminy: [do potwierdzenia] po analizie inwestycji."
    ],
    zastosowanie: [
      "Modernizacja lokali handlowych i usługowych.",
      "Prace remontowe w szkołach i placówkach edukacyjnych.",
      "Odświeżenie lub przebudowa obiektów biurowych.",
      "Roboty w obiektach użyteczności publicznej wymagających etapowania.",
      "Projekty, w których ważne są dostawy i prace poza standardowym rytmem funkcjonowania obiektu."
    ],
    zalety: [
      "Oferta zaprojektowana pod realne potrzeby klientów B2B w Lublinie.",
      "Połączenie logistyki materiałowej i wykonawstwa.",
      "Lepsza przewidywalność organizacyjna przy większych obiektach.",
      "Możliwość etapowania prac oraz dopasowania ich do działania obiektu.",
      "Treść lokalnie wspiera widoczność fraz związanych z remontami dla firm w Lublinie."
    ],
    korzysci: [
      "Mniej obciążenia po stronie inwestora lub administratora obiektu.",
      "Spójniejsza organizacja prac i dostaw.",
      "Łatwiejsze planowanie budżetu i harmonogramu inwestycji.",
      "Dostęp do jednego punktu kontaktu dla materiałów i wykonawstwa."
    ],
    ostrzezenia: [
      "Zakres prac w obiektach publicznych lub komercyjnych może wymagać dodatkowych uzgodnień formalnych.",
      "Nie wszystkie roboty można prowadzić bez wpływu na bieżące funkcjonowanie obiektu.",
      "Harmonogram musi uwzględniać dostępność przestrzeni, odbiory i warunki użytkownika końcowego.",
      "Wymagania materiałowe i bezpieczeństwa należy każdorazowo potwierdzić dla konkretnego obiektu."
    ],
    frazySEO: ["remonty B2B Lublin", "remonty dla firm Lublin", "modernizacja obiektów Lublin", "wykonawca remontów obiektów użyteczności publicznej"],
    cta: "Porozmawiaj o remoncie obiektu B2B"
  },
  {
    slug: "adaptacja-poddaszy-lublin",
    title: "Adaptacja poddaszy Lublin",
    segment: "B2C",
    icon: <HousePlus className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C · dodatkowa przestrzeń",
    krotkiOpis: "Adaptacja poddaszy i skosów w Lublinie z wykorzystaniem suchej zabudowy, izolacji i rozwiązań wykończeniowych dopasowanych do domu inwestora.",
    dlugiOpis: `Poddasze to przestrzeń, która często czeka na swój czas. Adaptacja na cele mieszkalne, gabinet czy pokój rekreacyjny wymaga dobrego projektu, właściwej izolacji akustycznej i termicznej oraz przemyślanej suchej zabudowy skosów. Pracujemy na systemach Knauf i Rigips, izolacjach Rockwool i Ursa, dobierając rozwiązania do kształtu dachu i planowanego przeznaczenia pomieszczenia. Prowadzimy prace od konsultacji przez projekt po realizację — łącząc dostawę materiałów z koordynacją ekip.`,
    parametry: [
      "Zakres: ocena poddasza, dobór materiałów, zabudowy, izolacje i wykończenie.",
      "Materiały: płyty GK, profile, wełna mineralna, folie, akcesoria montażowe.",
      "Marki: Knauf, Rigips, Rockwool, Ursa.",
      "Obsługa: Lublin i województwo lubelskie po potwierdzeniu zakresu.",
      "Możliwość połączenia z pracami dekarskimi lub wykończeniowymi.",
      "Koszt usługi: [do potwierdzenia] po oględzinach i ustaleniu standardu."
    ],
    zastosowanie: [
      "Zmiana nieużytkowego poddasza w przestrzeń mieszkalną.",
      "Wydzielenie gabinetu, sypialni lub pokoju dziecięcego na poddaszu.",
      "Wykończenie skosów po budowie domu lub remoncie dachu.",
      "Poprawa izolacyjności i komfortu termicznego na poddaszu.",
      "Połączenie adaptacji z pełnym wykończeniem wnętrz."
    ],
    zalety: [
      "Lepsze wykorzystanie istniejącej kubatury domu.",
      "Połączenie materiałów i wykonawstwa w jednym miejscu.",
      "Dopasowanie do lokalnych zapytań o adaptację poddaszy w Lublinie.",
      "Współpraca z markami rozpoznawalnymi w suchej zabudowie i izolacji.",
      "Możliwość łączenia usługi z innymi etapami wykończenia domu."
    ],
    korzysci: [
      "Więcej użytecznej przestrzeni bez rozbudowy bryły budynku.",
      "Lepszy komfort cieplny i akustyczny na poddaszu.",
      "Prostsza organizacja prac dzięki jednej ścieżce materiałowo-wykonawczej.",
      "Mniejsze ryzyko błędów przy doborze zabudowy i izolacji."
    ],
    ostrzezenia: [
      "Stan konstrukcji dachu i możliwość adaptacji trzeba potwierdzić przed rozpoczęciem prac.",
      "Nie każda przestrzeń poddasza nadaje się do pełnej funkcji mieszkalnej bez dodatkowych działań.",
      "Prace wymagają precyzyjnej koordynacji izolacji, paroizolacji i zabudowy.",
      "Koszt zależy od wysokości, geometrii skosów i standardu wykończenia."
    ],
    frazySEO: ["adaptacja poddaszy Lublin", "zabudowa poddasza Lublin", "wykończenie poddasza lubelskie", "skosy GK Lublin"],
    cta: "Zapytaj o adaptację poddasza"
  },
  {
    slug: "duze-projekty-b2b",
    title: "Duże projekty B2B",
    segment: "B2B",
    icon: <Building2 className="w-6 h-6 text-[#f81828]" />,
    badge: "B2B · inwestycje komercyjne i instytucjonalne",
    krotkiOpis: "Kompleksowa obsługa inwestycji komercyjnych i instytucjonalnych — galerie handlowe, szkoły, obiekty użyteczności publicznej. Materiały w dużych wolumenach, logistyka na czas, jeden punkt kontaktu.",
    dlugiOpis: `Obsługujemy inwestycje o każdej skali — od pojedynczych lokali usługowych, przez budynki wielorodzinne, aż po galerie handlowe, obiekty szkolne i hale produkcyjne. W przypadku dużych projektów kluczowym wyzwaniem jest logistyka: właściwa ilość materiałów we właściwym miejscu i czasie, bez przestojów na budowie. Nasz skład budowlany w Lublinie działa jako zaplecze magazynowe dla generalnych wykonawców i deweloperów — możemy zaplanować harmonogram dostaw etapami, dopasowany do postępu robót. Współpracujemy z systemami wiodących producentów: Weber, Ceresit, Atlas, Knauf, Rockwool, Rigips, Baumit i innymi — co pozwala zrealizować całą inwestycję w oparciu o jednego dostawcę materiałów. Warunki współpracy B2B, w tym ceny hurtowe i odroczony termin płatności, ustalamy indywidualnie po analizie projektu i harmonogramu.`,
    parametry: [
      "Dostawy etapowe dopasowane do harmonogramu budowy.",
      "Materiały od Weber, Knauf, Atlas, Rockwool, Rigips i innych.",
      "Obsługa generalnych wykonawców i deweloperów.",
      "Wycena indywidualna — ceny hurtowe dla dużych wolumenów.",
      "Koordynacja logistyki z jednego miejsca.",
      "Doświadczenie w obsłudze galerii handlowych, szkół i obiektów publicznych."
    ],
    zastosowanie: [
      "Obsługa budynków wielorodzinnych, biurowych, szkół, obiektów sportowych, galerii handlowych i hal produkcyjnych.",
      "Dostawy materiałów na teren Lublina i całego województwa lubelskiego.",
      "Projekty wymagające etapowania zamówień zgodnie z postępem robót.",
      "Współpraca z generalnymi wykonawcami, deweloperami i inwestorami instytucjonalnymi.",
      "Realizacje, w których potrzebny jest jeden dostawca dla wielu systemów materiałowych."
    ],
    zalety: [
      "Jedno centrum logistyczne i zakupowe dla dużej inwestycji.",
      "Spójna obsługa materiałów od renomowanych producentów.",
      "Elastyczne warunki handlowe ustalane indywidualnie dla skali projektu.",
      "Treść dopasowana do zapytań B2B związanych z obsługą inwestycji w Lublinie i regionie.",
      "Możliwość koordynacji dostaw bezpośrednio pod harmonogram budowy."
    ],
    korzysci: [
      "Mniej przestojów wynikających z braków materiałowych na budowie.",
      "Łatwiejsza kontrola zamówień i logistyki przy wielu etapach realizacji.",
      "Jedna ścieżka komunikacji zamiast wielu rozproszonych dostawców.",
      "Lepsze dopasowanie cen i warunków płatności do skali inwestycji."
    ],
    ostrzezenia: [
      "Każdy projekt B2B wymaga indywidualnej analizy dokumentacji i harmonogramu przed przygotowaniem oferty.",
      "Warunki płatności, w tym przedpłata etapami lub odroczony termin, ustalamy indywidualnie w umowie.",
      "Dostępność materiałów i terminy dostaw zależą od skali zamówienia oraz harmonogramu producentów.",
      "Zakres logistyki i koszt transportu trzeba potwierdzić na etapie wyceny inwestycji."
    ],
    frazySEO: ["B2B materiały budowlane Lublin", "duże projekty budowlane Lublin", "obsługa inwestycji komercyjnych Lublin", "dostawy materiałów dla deweloperów lubelskie"],
    cta: "Wyślij zapytanie o projekt B2B"
  },
  {
    slug: "siec-fachowcow",
    title: "Sieć fachowców",
    segment: "Oba",
    icon: <Users className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C / B2B · wykonawcy i koordynacja",
    krotkiOpis: "Tynkarze, murarze, dekarze, glazurnicy i specjaliści wykończenia — sprawdzone ekipy z realizacji. Koordynujemy wykonawców, żebyś miał jeden kontakt zamiast kilkunastu.",
    dlugiOpis: `Znalezienie sprawdzonego wykonawcy to często największy problem przy budowie lub remoncie. MediaBud od lat współpracuje z ekipami budowlanymi w Lublinie i okolicach — tynkarzami, murarzami, dekarzami, glazurnikami, malarzami i specjalistami od suchej zabudowy. Znamy ich z realizacji: wiemy, jak pracują, jaką jakość dostarczają i czy dotrzymują terminów. Kiedy potrzebujesz wykonawcy do konkretnego etapu — tynkowania, murowania, ocieplenia, wykończenia łazienki czy montażu podłóg — możemy wskazać sprawdzoną ekipę i pomóc zaplanować kolejność prac. Nie pobieramy prowizji od wykonawców — po prostu rekomendujemy tych, z którymi zrealizowaliśmy wspólne projekty i którym ufamy. Materiały do wykonania zapewniamy z naszego składu, co skraca czas realizacji i upraszcza logistykę. Całość koordynujemy z jednego miejsca — zamiast szukać każdego specjalisty osobno, dzwonisz do nas.`,
    parametry: [
      "Sprawdzone ekipy tynkarzy, murarzy i dekarzy.",
      "Specjaliści wykończenia: glazurnicy, malarze, podłogi.",
      "Koordynacja kolejności robót i harmonogramu.",
      "Materiały do wykonania z naszego składu — wszystko w jednym miejscu.",
      "Brak prowizji — rekomendujemy ekipy z realizacji.",
      "Jeden kontakt dla inwestora zamiast kilkunastu wykonawców."
    ],
    zastosowanie: [
      "Dobór wykonawców do tynkowania, murowania, ocieplenia i prac dekarskich.",
      "Koordynacja etapów: tynki, wylewki, sucha zabudowa, glazura i malarstwo.",
      "Obsługa inwestorów z Lublina i okolic do około 50 km.",
      "Wsparcie przy budowie, remoncie i wykończeniu wnętrz.",
      "Łączenie materiałów z naszego składu z pracą ekip znających dane systemy."
    ],
    zalety: [
      "Rekomendacje oparte na realnych wspólnych realizacjach, a nie przypadkowych kontaktach.",
      "Brak prowizji od wykonawców i przejrzysty model współpracy.",
      "Lepsza koordynacja kolejności robót i dostępności ekip.",
      "Jeden punkt kontaktu dla inwestora przy wielu specjalizacjach.",
      "Oferta dobrze odpowiada na lokalne zapytania o sprawdzonych fachowców w Lublinie."
    ],
    korzysci: [
      "Mniej czasu na samodzielne szukanie i weryfikowanie wykonawców.",
      "Większa szansa na terminową realizację kolejnych etapów prac.",
      "Sprawniejsza logistyka dzięki połączeniu ekip i materiałów w jednym miejscu.",
      "Mniejsze ryzyko błędów wykonawczych przy pracy na znanych systemach materiałowych."
    ],
    ostrzezenia: [
      "Dostępność konkretnych ekip zależy od terminu i zakresu robót.",
      "Rekomendacja wykonawcy nie zastępuje indywidualnych ustaleń zakresu, terminu i odpowiedzialności między stronami.",
      "Przy większych projektach poza Lublinem i okolicami zasięg ekip wymaga osobnego potwierdzenia.",
      "Zakup materiałów w MediaBud nie jest obowiązkowy, ale może uprościć realizację i ograniczyć błędy."
    ],
    frazySEO: ["fachowcy budowlani Lublin", "sprawdzone ekipy budowlane Lublin", "tynkarze murarze dekarze Lublin", "koordynacja wykonawców Lublin"],
    cta: "Skontaktuj się w sprawie wykonawców"
  }
];


