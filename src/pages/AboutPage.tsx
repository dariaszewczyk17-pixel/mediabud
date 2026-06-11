import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useHeaderAwareReveal } from "@/hooks/useHeaderAwareReveal";
import { NAP_ADDRESS, NAP_GEO, NAP_HOURS, NAP_AREA_SERVED, NAP_SAME_AS, NAP_LOGO, NAP_AMENITIES, NAP_CONTACT_POINT } from "@/lib/localBusiness";
import { Phone, ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { IconOnePartner, IconRuler, IconScaffold, IconCompass, IconScale, IconPin } from "@/components/FuturisticIcons";

/* ─── Animated Counter Hook ──────────────────────────────────────── */
function useAnimatedCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─── IntersectionObserver Hook ─────────────────────────────────── */
function useInView(threshold = 0.2) {
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

/* ─── Stat Counter Card ──────────────────────────────────────────── */
function StatCard({ value, numericValue, suffix, label, delay = 0 }: { value: string; numericValue: number; suffix: string; label: string; delay?: number }) {
  const { ref, visible: inView } = useHeaderAwareReveal({ threshold: 0.3 });
  const [started, setStarted] = useState(false);
  useEffect(() => { if (inView) { const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t); } }, [inView, delay]);
  const count = useAnimatedCounter(numericValue, 1600, started);
  return (
    <div ref={ref} className="relative rounded-2xl p-6 text-center overflow-hidden group"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", transition: "border-color 0.3s, box-shadow 0.3s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.4)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(248,24,40,0.12), inset 0 0 32px rgba(248,24,40,0.03)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
      {/* Scan-line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(248,24,40,0.025) 2px, rgba(248,24,40,0.025) 4px)" }} />
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg,transparent,rgba(248,24,40,0.6),transparent)", opacity: started ? 1 : 0, transition: "opacity 0.5s" }} />
      <div className="font-display font-black text-4xl md:text-5xl mb-1 tabular-nums" style={{ color: "#f81828", textShadow: "0 0 24px rgba(248,24,40,0.4)" }}>
        {started ? count : 0}{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest font-bold" style={{ color: "#666" }}>{label}</div>
    </div>
  );
}

/* ─── Fade-in wrapper ────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible: inView } = useHeaderAwareReveal({ threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function AboutPage() {
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
            { "@type": "ListItem", "position": 2, "name": "O firmie", "item": "https://mediabud.pl/o-firmie" },
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

  const timelineItems = [
    { year: "2008", title: "Założenie firmy", desc: "Media Bud otwiera skład budowlany przy ul. Chemicznej w Lublinie." },
    { year: "2011", title: "Rozszerzenie oferty", desc: "Dołączamy systemy ETICS i tynki Weber, Ceresit, Atlas do stałej oferty." },
    { year: "2014", title: "Obsługa B2B", desc: "Nawiązujemy współpracę z pierwszymi deweloperami i generalnymi wykonawcami." },
    { year: "2017", title: "Ponad 10 000 produktów", desc: "Magazyn przekracza 10 tys. pozycji — pełna oferta dla budownictwa." },
    { year: "2020", title: "Sieć fachowców", desc: "Uruchamiamy program koordynacji ekip — jeden partner dla materiałów i wykonawstwa." },
    { year: "2023+", title: "Dziś: 15 000+ produktów", desc: "50+ partnerów-producentów, 500+ zrealizowanych projektów, Lublin i region." },
  ];

  const values = [
    { icon: <IconOnePartner size={24} style={{ color:"#f81828" }} />, title: "Jeden partner", desc: "Materiały, doradztwo i koordynacja wykonawców — wszystko w jednym miejscu. Budujesz z jednym punktem kontaktu, nie z dziesiątką podwykonawców." },
    { icon: <IconRuler size={24} style={{ color:"#f81828" }} />, title: "Konkretna wycena", desc: "Nie operujemy ogólnikami. Przygotowujemy wycenę opartą na Twoim projekcie, wybranej technologii i harmonogramie — bez ukrytych kosztów." },
    { icon: <IconScaffold size={24} style={{ color:"#f81828" }} />, title: "Sprawdzone ekipy", desc: "Współpracujemy z tynkarzami, murarzami, dekarzami i specjalistami wykończenia, których znamy z realizacji. Polecamy sprawdzonych, nie losowych." },
    { icon: <IconCompass size={24} style={{ color:"#f81828" }} />, title: "Doradztwo techniczne", desc: "Mamy materiały wiodących marek: Weber, Ceresit, Atlas, Knauf, Rockwool i innych. Doradzamy, który system sprawdzi się w Twoich warunkach." },
    { icon: <IconScale size={24} style={{ color:"#f81828" }} />, title: "Duże i małe projekty", desc: "Obsługujemy zarówno domy jednorodzinne, jak i galerie handlowe, szkoły i budynki użyteczności publicznej. Dostosowujemy logistykę do skali inwestycji." },
    { icon: <IconPin size={24} style={{ color:"#f81828" }} />, title: "Lublin i region", desc: "Działamy w Lublinie i województwie lubelskim. Znamy lokalny rynek, ceny materiałów i realia budowy w naszym regionie." },
  ];

  const brands = [
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
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>

      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#0a0a0a 0%,#080808 50%,#050505 100%)", minHeight: "520px" }}>
        {/* Hero video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.22, zIndex: 0 }}
          src="https://skyagent-artifacts.skywork.ai/router/agent/2026-06-09/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/hero_about_afc26861af544880b0796d59046a352e.mp4"
        />
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Scan-lines */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.008) 3px,rgba(255,255,255,0.008) 4px)" }} />
        {/* Red accent left */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ zIndex: 2, boxShadow: "2px 0 20px rgba(248,24,40,0.5)" }} />
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ zIndex: 2, background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.3) 50%,transparent)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ zIndex: 2, background: "linear-gradient(to top,#050505,transparent)" }} />
        {/* Radial glow */}
        <div className="absolute right-0 top-0 w-[600px] h-[600px] pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 80% 20%,rgba(248,24,40,0.07) 0%,transparent 65%)" }} />

        <div className="relative container mx-auto px-4 md:pl-10 py-14 md:py-28" style={{ zIndex: 3 }}>
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center max-w-6xl">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-[1px] w-8 bg-[#f81828]" />
                <p className="text-[10px] font-black text-[#f81828] tracking-[0.4em] uppercase">O firmie · Media Bud</p>
              </div>
              <h1 className="font-display font-black text-white leading-[0.92] mb-6" style={{ fontSize: "clamp(2rem,7vw,5.5rem)", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
                Skład budowlany<br />
                <span style={{ color: "#f81828", textShadow: "0 0 32px rgba(248,24,40,0.35)" }}>Lublin</span><br />
                od 2008 roku
              </h1>
              <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg">
                Profesjonalna hurtownia materiałów budowlanych. Obsługujemy deweloperów, wykonawców i klientów indywidualnych, oferując kompleksowe wsparcie techniczne i najwyższą jakość produktów.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="tel:+48533553344">
                  <button className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f81828] text-white text-sm font-black uppercase tracking-wide transition-all hover:bg-[#c8000f] hover:shadow-[0_0_28px_rgba(248,24,40,0.5)]">
                    <Phone className="w-4 h-4" /> Zadzwoń teraz
                  </button>
                </a>
                <Link to="/kontakt">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wide text-gray-300 hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                    Napisz do nas <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard value="15+" numericValue={15} suffix="+" label="lat doświadczenia" delay={0} />
              <StatCard value="15 tys.+" numericValue={15000} suffix="+" label="produktów w ofercie" delay={150} />
              <StatCard value="500+" numericValue={500} suffix="+" label="zrealizowanych projektów" delay={300} />
              <StatCard value="50+" numericValue={50} suffix="+" label="partnerów-producentów" delay={450} />
            </div>
          </div>
        </div>
      </div>

      {/* ══ MISJA ══ */}
      <section className="py-16" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn>
            <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
              <div className="absolute top-0 left-0 w-[3px] h-full bg-[#f81828]" style={{ boxShadow: "2px 0 16px rgba(248,24,40,0.3)" }} />
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg,#f81828,transparent)" }} />
              <p className="text-[10px] font-black text-[#f81828] tracking-[0.4em] uppercase mb-4">— Nasza misja —</p>
              <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-5" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
                Więcej niż skład budowlany
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <p className="text-gray-400 leading-relaxed text-sm">Media Bud to więcej niż skład budowlany. Jesteśmy lokalnym partnerem w realizacji projektów budowlanych na terenie Lublina i województwa lubelskiego — od małych remontów domowych po duże inwestycje deweloperskie i obiekty użyteczności publicznej.</p>
                <p className="text-gray-400 leading-relaxed text-sm">Nasza misja to dostarczanie sprawdzonych materiałów budowlanych połączone z praktycznym doradztwem technicznym. Pomagamy inwestorom, wykonawcom i firmom budować lepiej, szybciej i efektywniej — z jednego miejsca, bez zbędnych pośredników.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ MEDIA BUD W AKCJI — VIDEO ══ */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        {/* Grid tło */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Neon glow */}
        <div className="absolute pointer-events-none" style={{ left: "50%", top: "30%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(248,24,40,0.07) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-[10px] font-black text-[#f81828] tracking-[0.4em] uppercase mb-3">— Media Bud w akcji —</p>
            <h2 className="font-display text-2xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
              15 lat budujemy Lublin
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Skład budowlany, doradztwo techniczne i ekipy wykonawcze — wszystko w jednym miejscu, od 2008 roku.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden relative" style={{ border: "1px solid rgba(248,24,40,0.25)", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(248,24,40,0.08)" }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full aspect-video"
                style={{ display: "block", background: "#050505" }}
                src="https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260609/text2video-d8k5liv80j2drgd1uh10.mp4"
              />
              <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: "linear-gradient(to top, rgba(5,5,5,0.92), transparent)" }} />
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(248,24,40,0.15)", border: "1px solid rgba(248,24,40,0.4)", backdropFilter: "blur(8px)" }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "#f81828" }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#f81828" }} />
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#f81828]">Live showreel</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
              {[
                { value: "2008", label: "Rok założenia" },
                { value: "15+", label: "Lat na rynku" },
                { value: "500+", label: "Projektów" },
                { value: "268", label: "Marek w ofercie" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-5 text-center group transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(248,24,40,0.18)", backdropFilter: "blur(8px)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.5)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(248,24,40,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.18)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <div className="font-display font-black text-2xl md:text-3xl mb-1" style={{ color: "#f81828", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", textShadow: "0 0 20px rgba(248,24,40,0.4)" }}>{item.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ WARTOŚCI ══ */}
      <section className="py-20" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <p className="text-[10px] font-black text-[#f81828] tracking-[0.4em] uppercase mb-3">— Co nas wyróżnia —</p>
            <h2 className="font-display text-2xl md:text-4xl font-black text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
              Kilka słów o tym, jak pracujemy
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {values.map((item, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="group rounded-2xl p-6 h-full relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.4)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(248,24,40,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  {/* Scan-lines on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(248,24,40,0.02) 3px,rgba(248,24,40,0.02) 4px)" }} />
                  {/* Top glow line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg,transparent,rgba(248,24,40,0.5),transparent)" }} />

                  <div className="relative z-10">
                    <div className="mb-4 w-10 h-10 flex items-center justify-center"
                      style={{ border: "1px solid rgba(248,24,40,0.3)", background: "rgba(248,24,40,0.07)" }}>
                      {item.icon}
                    </div>
                    <h3 className="font-black text-white text-sm uppercase tracking-widest mb-3" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PARTNERZY ══ */}
      <section className="py-20" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container mx-auto px-4">
          <FadeIn className="mb-10">
            <p className="text-[10px] font-black text-[#f81828] tracking-[0.4em] uppercase mb-3">— Zaufane marki —</p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Nasi partnerzy i dostawcy</h2>
            <p className="text-gray-600 text-sm">Współpracujemy z wiodącymi producentami materiałów budowlanych, gwarantując oryginalność i jakość każdego produktu.</p>
          </FadeIn>

          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            {brands.map((brand, i) => (
              <FadeIn key={brand.name} delay={i * 40}>
                <div className="flex flex-col items-center rounded-xl overflow-hidden group"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}>
                  <div className="w-full flex items-center justify-center p-2" style={{ background: "#fff", minHeight: "48px" }}>
                    <img src={brand.url} alt={`Logo ${brand.name}`} loading="lazy" className="max-h-[32px] max-w-[70px] w-auto object-contain" />
                  </div>
                  <div className="w-full h-[2px]" style={{ background: "linear-gradient(90deg,#f81828 12px,rgba(255,255,255,0.04) 12px)" }} />
                  <span className="text-[9px] font-semibold text-gray-600 py-1.5 px-1 text-center truncate w-full">{brand.name}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-gray-600">
              Ponad <span className="text-white font-bold">268 marek</span> w naszej ofercie — od renomowanych producentów materiałów budowlanych.
            </p>
            <Link
              to="/marki"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider text-white flex-shrink-0 transition-all hover:brightness-110"
              style={{ background: "#f81828", boxShadow: "0 6px 20px rgba(248,24,40,0.25)" }}
            >
              Wszystkie marki <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ REALIZACJE ══ */}
      <section className="py-20" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container mx-auto px-4">
          <FadeIn className="mb-10">
            <p className="text-[10px] font-black text-[#f81828] tracking-[0.4em] uppercase mb-3">— Portfolio —</p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Nasze realizacje</h2>
            <p className="text-gray-600 text-sm">Projekty zrealizowane przy wsparciu materiałowym i wykonawczym Media Bud.</p>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-5">
            {realizacje.map((r, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="rounded-2xl overflow-hidden flex flex-col group h-full"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.4)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(248,24,40,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  {r.image && (
                    <div className="h-48 overflow-hidden relative">
                      <img src={r.image} alt={r.client} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(5,5,5,0.7),transparent)" }} />
                      <div className="absolute top-3 right-3 font-mono text-[10px] font-black text-white px-2 py-1 rounded" style={{ background: "rgba(248,24,40,0.9)" }}>{r.year}</div>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-2">{r.category}</span>
                    {r.client && <div className="text-sm font-black text-white mb-1" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>{r.client}</div>}
                    <div className="text-xs text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0 text-[#f81828]" /> {r.location}
                    </div>
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#f81828] hover:underline">
                        Strona inwestycji <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-20" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn>
            <div className="rounded-2xl p-10 md:p-14 relative overflow-hidden text-center" style={{ background: "rgba(248,24,40,0.06)", border: "1px solid rgba(248,24,40,0.2)" }}>
              {/* Scan-lines */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(248,24,40,0.015) 3px,rgba(248,24,40,0.015) 4px)" }} />
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,transparent,#f81828,transparent)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,transparent,rgba(248,24,40,0.4),transparent)" }} />

              <div className="relative z-10">
                <p className="text-[10px] font-black text-[#f81828] tracking-[0.4em] uppercase mb-4">— Zaczynamy? —</p>
                <h2 className="font-display text-2xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
                  Kompleksowe wsparcie<br />dla Twojego projektu
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                  Niezależnie czy planujesz budowę domu, remont, ocieplenie czy kompleksowe wykończenie — skontaktuj się z nami. Przygotujemy wycenę, dobierzemy materiały i zaproponujemy ścieżkę realizacji.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a href="tel:+48533553344">
                    <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#f81828] text-white text-sm font-black uppercase tracking-wide transition-all hover:bg-[#c8000f] hover:shadow-[0_0_32px_rgba(248,24,40,0.5)]">
                      <Phone className="w-4 h-4" /> +48 533 553 344
                    </button>
                  </a>
                  <Link to="/kontakt">
                    <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-black uppercase tracking-wide text-gray-300 hover:text-white transition-all" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                      Napisz do nas
                    </button>
                  </Link>
                  <Link to="/uslugi">
                    <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-black uppercase tracking-wide text-[#f81828] hover:text-white transition-all" style={{ border: "1px solid rgba(248,24,40,0.35)" }}>
                      <ArrowRight className="w-4 h-4" /> Nasze usługi
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
