import { Link } from "react-router-dom";
import { Phone, Mail, ChevronRight, ArrowRight, Calendar, TrendingUp, Users, Award, Clock, ChevronLeft, Star, CheckCircle2, Send, Building2, HardHat, Home as HomeIcon, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories as staticCategories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { getRecentBlogPosts } from "@/data/blog";
import { useAllCategories, useFeaturedProducts as useSanityFeatured } from "@/hooks/useSanityData";
import { sanityCategoryToLegacy, sanityProductToLegacy } from "@/lib/adapters";
import { sanityFetch } from "@/lib/sanity";
import { ProductCard, QuoteModal } from "@/components/Commerce";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ─── Reveal hook ─────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Counter animation ───────────────────────────────────────── */
function CountUp({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal(0.3);
  const started = useRef(false);
  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, to, duration]);
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className="stat-number text-4xl md:text-5xl font-black text-white font-display">
      {val}{suffix}
    </span>
  );
}

/* ─── Hero Slides ─────────────────────────────────────────────── */
const heroSlides = [
  {
    image: "/images/hero-materialy_2.png",
    label: "Materiały budowlane",
    title: "Kompleksowe materiały dla\nkażdej budowy",
    subtitle: "Ponad 15 900 produktów od wiodących marek. Tynki, ocieplenia, chemia budowlana, farby — wszystko w jednym miejscu.",
    cta: "Przeglądaj ofertę",
    ctaLink: "/produkty",
  },
  {
    image: "/images/hero-etics_2.png",
    label: "Systemy ociepleń",
    title: "Systemy ETICS i\nocieplenia dla profesjonalistów",
    subtitle: "Rockwool, Swisspor, Weber, Knauf — renomowane marki i bezpłatne doradztwo techniczne dla Twojego projektu.",
    cta: "Zapytaj o wycenę",
    ctaLink: "/kontakt",
  },
  {
    image: "/images/hero-chemia_2.png",
    label: "Chemia budowlana",
    title: "Profesjonalna chemia\nbudowlana Ceresit, Atlas, Weber",
    subtitle: "Dostawa materiałów na teren Lublina i województwa lubelskiego. Obsługa deweloperów, firm budowlanych i klientów indywidualnych.",
    cta: "Skontaktuj się",
    ctaLink: "/kontakt",
  },
];

/* ─── Category icons / images ─────────────────────────────────── */
const catIcons: Record<string, string> = {
  "chemia-budowlana": "🧪", "dachy": "🏠", "farby-rozpuszczalniki": "🎨",
  "izolacje": "🛡️", "narzedzia-mocowania": "🔧", "pozostale": "📦",
  "plytki": "⬜", "stropy-sciany": "🧱", "sucha-zabudowa": "🔲", "sufity-podwieszane": "⬛",
};
const catImages: Record<string, string> = {
  "chemia-budowlana": "/images/cat-chemia_2.png",
  "dachy": "/images/cat-dachy_2.png",
  "farby-rozpuszczalniki": "/images/cat-farby_2.png",
  "izolacje": "/images/cat-ocieplenia_2.png",
  "narzedzia-mocowania": "/images/cat-narzedzia_2.png",
  "plytki": "/images/cat-plytki_2.png",
  "stropy-sciany": "/images/cat-sciany_2.png",
  "sucha-zabudowa": "/images/cat-sucha-zabudowa_2.png",
};

const stats = [
  { icon: TrendingUp, num: 1000, suffix: "+", label: "produktów w ofercie" },
  { icon: Users,     num: 500,  suffix: "+", label: "zadowolonych klientów" },
  { icon: Award,     num: 15,   suffix: "+", label: "lat doświadczenia" },
  { icon: Clock,     num: 24,   suffix: "h", label: "czas odpowiedzi" },
];

const features = [
  { icon: "🔧", title: "Doradztwo techniczne", desc: "Bezpłatne konsultacje z ekspertami budowlanymi dla każdego projektu budowlanego, bez zobowiązań." },
  { icon: "📋", title: "Obsługa krok po kroku", desc: "Kompleksowe wsparcie od wyboru materiałów aż po odbiór gotowej budowy — jesteśmy z Tobą na każdym etapie." },
  { icon: "🚚", title: "Szybka dostawa", desc: "Transport materiałów na teren Lublina i całego województwa lubelskiego bezpośrednio na plac budowy." },
  { icon: "⭐", title: "Renomowane marki", desc: "Weber, Ceresit, Atlas, Knauf, Rockwool, Swisspor i wiele innych marek premium z oficjalną gwarancją." },
  { icon: "🏅", title: "Gwarancja jakości", desc: "Wszystkie produkty posiadają oryginalne certyfikaty, atesty budowlane i deklaracje właściwości użytkowych." },
  { icon: "🏗️", title: "Obsługa deweloperów", desc: "Indywidualne warunki handlowe, dedykowany opiekun, faktury zbiorcze i rabaty ilościowe dla firm." },
];

const serviceCards = [
  { segment: "B2C", tag: "PROGRAM", title: "Dom od podstaw", desc: "Parasolowy program MediaBud: od wyceny i harmonogramu po materiały, fachowców i realizację.", href: "#dom-od-podstaw" },
  { segment: "B2C", tag: "BUDOWA", title: "Budowa domów Lublin", desc: "Kompleksowa budowa domu z lokalnym zapleczem materiałowym i wykonawczym.", href: "/uslugi/budowa-domow-lublin" },
  { segment: "B2C", tag: "TERMO", title: "Termomodernizacja i ocieplenia", desc: "Ocieplenia, systemy ETICS i przygotowanie inwestycji pod lokalne programy wsparcia.", href: "/uslugi/termomodernizacja-ocieplenia" },
  { segment: "B2C", tag: "POD KLUCZ", title: "Wykończenia wnętrz pod klucz", desc: "Koordynacja materiałów i ekip wykończeniowych dla domów, mieszkań i lokali.", href: "/uslugi/wykonczenia-wnetrz-pod-klucz" },
  { segment: "B2C", tag: "70 M²", title: "Budowa domów do 70 m²", desc: "Małe domy z naciskiem na prostą logistykę, energooszczędność i przewidywalny proces.", href: "/uslugi/budowa-domow-do-70m2" },
  { segment: "Oba", tag: "DACHY", title: "Usługi dekarskie Lublin", desc: "Pokrycia dachowe, wymiany i prace dekarskie dla klientów prywatnych i firm.", href: "/uslugi/uslugi-dekarskie-lublin" },
  { segment: "Oba", tag: "ELEWACJE", title: "Elewacje i tynki Lublin", desc: "Systemowe elewacje i tynki zewnętrzne dla domów oraz obiektów użytkowych.", href: "/uslugi/elewacje-tynki-lublin" },
  { segment: "B2B", tag: "OBIEKTY", title: "Remonty B2B Lublin", desc: "Remonty dla galerii, szkół i obiektów użyteczności publicznej z logistyką MediaBud.", href: "/uslugi/remonty-b2b-lublin" },
  { segment: "B2C", tag: "PODDASZA", title: "Adaptacja poddaszy Lublin", desc: "Suche zabudowy, izolacje i wykończenie skosów z wykorzystaniem sprawdzonych systemów.", href: "/uslugi/adaptacja-poddaszy-lublin" },
];

const brands = [
  { name: "Weber",         color: "#0072CE", short: "We" },
  { name: "Ceresit",       color: "#E30613", short: "Ce" },
  { name: "Atlas",         color: "#003087", short: "At" },
  { name: "Knauf",         color: "#009640", short: "Kn" },
  { name: "Rockwool",      color: "#C8102E", short: "Ro" },
  { name: "Swisspor",      color: "#E2001A", short: "Sw" },
  { name: "Bolix",         color: "#004A97", short: "Bo" },
  { name: "Termo Organika",color: "#F39200", short: "TO" },
];

const brandLogos = [
  { name: "Weber", url: "https://skyagent-artifacts.skywork.ai/router/agent/2026-05-29/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/images_4cda83606a6d42658ace1a422cdb2bdd.png" },
  { name: "Knauf", url: "https://skyagent-artifacts.skywork.ai/router/agent/2026-05-29/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/images%20%281%29_a580c754733a435c8d80ed98f55a2c48.png" },
  { name: "Atlas", url: "https://skyagent-artifacts.skywork.ai/router/agent/2026-05-29/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/images%20%282%29_745c7971373b4fe0944f92114b3561b0.png" },
  { name: "Baumit", url: "https://skyagent-artifacts.skywork.ai/router/agent/2026-05-29/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/logo_maleB_rgb_5224c955269f4d609eec1a776c56b0b1.jpg" },
  { name: "Rockwool", url: "https://skyagent-artifacts.skywork.ai/router/agent/2026-05-29/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/RGB%20ROCKWOOL%C2%AE%20logo%20-%20Primary%20Colour%20RGB_196a37e190f64344a8f547b638c05f16.jpg" },
  { name: "Rigips", url: "https://skyagent-artifacts.skywork.ai/router/agent/2026-05-29/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/rigips-saint-gobain-logo-png_seeklogo-259520_74ca93fb5ba4404cb962e4582baa88e2.png" },
  { name: "Ursa", url: "https://skyagent-artifacts.skywork.ai/router/agent/2026-05-29/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/Ursa-Logo_4062e70ef71e422eb154bdfd0fcdff14.png" },
];

/* ─── Testimonials ────────────────────────────────────────────── */
const testimonials = [
  {
    name: "Krzysztof Nowak",
    role: "Kierownik budowy",
    company: "Deweloper, Lublin",
    avatar: "KN",
    avatarImg: "/images/avatar-1_2.png",
    rating: 5,
    text: "Współpracujemy z Media Bud od ponad 3 lat. Zawsze terminowa dostawa, świetne doradztwo techniczne i uczciwe ceny. Polecam każdej firmie budowlanej w regionie.",
    tag: "Firma budowlana",
  },
  {
    name: "Agnieszka Kowalska",
    role: "Architekt wnętrz",
    company: "Studio A+K, Lublin",
    avatar: "AK",
    avatarImg: "/images/avatar-2_2.png",
    rating: 5,
    text: "Profesjonalne podejście, bogaty asortyment i sprawna obsługa. Zawsze pomogą w doborze odpowiednich materiałów. Doceniam szczególnie bezpłatne doradztwo techniczne.",
    tag: "Architekt",
  },
  {
    name: "Marek Wiśniewski",
    role: "Właściciel domu",
    company: "Klient indywidualny",
    avatar: "MW",
    avatarImg: "/images/avatar-3_2.png",
    rating: 5,
    text: "Budowałem dom i Media Bud towarzyszył mi przez cały czas budowy. Doskonała obsługa, rzetelne ceny i szybka dostawa na plac budowy. Gorąco polecam!",
    tag: "Dom jednorodzinny",
  },
];

/* ─── Realizacje ──────────────────────────────────────────────── */
const realizacje = [
  {
    title: "Ocieplenie budynku wielorodzinnego",
    category: "System ETICS",
    location: "Lublin, ul. Zana",
    image: "/images/real-ocieplenie_2.png",
    tags: ["Rockwool", "Weber", "Tynk silikonowy"],
    icon: Building2,
  },
  {
    title: "Kompleksowe materiały dla dewelopera",
    category: "Budownictwo mieszkaniowe",
    location: "Lublin, Sławin",
    image: "/images/real-deweloper_2.png",
    tags: ["Knauf", "Ceresit", "Chemia budowlana"],
    icon: HomeIcon,
  },
  {
    title: "Izolacja fundamentów — dom jednorodzinny",
    category: "Izolacje termiczne",
    location: "Świdnik k. Lublina",
    image: "/images/real-hydroizolacja_2.png",
    tags: ["Swisspor EPS", "Masy uszczelniające"],
    icon: Layers,
  },
  {
    title: "Kompleksowe wykończenie hal magazynowych",
    category: "Budownictwo przemysłowe",
    location: "Lublin, Strefa Przemysłowa",
    image: "/images/real-hala_2.png",
    tags: ["Sucha zabudowa", "Knauf", "Atlas"],
    icon: HardHat,
  },
];

/* ─── Product tabs data ───────────────────────────────────────── */
const PRODUCT_TABS = [
  { id: "polecane",     label: "Polecane" },
  { id: "nowosci",      label: "Nowości" },
  { id: "bestsellery",  label: "Bestsellery" },
];

/* ================================================================
   COMPONENT
================================================================ */
export default function Home() {
  /* ── Sanity data z fallbackiem na dane statyczne ─────────────── */
  const { data: sanityCats }     = useAllCategories();
  const { data: sanityFeatured } = useSanityFeatured();

  const categories = useMemo(
    () => sanityCats && (sanityCats as any[]).length > 0
      ? (sanityCats as any[]).map(sanityCategoryToLegacy)
      : staticCategories,
    [sanityCats],
  );
  const featured = useMemo(
    () => sanityFeatured && (sanityFeatured as any[]).length > 0
      ? (sanityFeatured as any[]).map(sanityProductToLegacy)
      : getFeaturedProducts(),
    [sanityFeatured],
  );

  const recentPosts = getRecentBlogPosts(3);
  const [quoteOpen, setQuoteOpen]             = useState(false);
  const [activeTab, setActiveTab]             = useState("polecane");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent]   = useState(false);
  const [productCount, setProductCount]       = useState<number>(15921); // fallback: stan na 2026-05-29

  /* ── Dynamiczny licznik produktów z Sanity ── */
  useEffect(() => {
    sanityFetch<number>('count(*[_type=="product"])')
      .then(n => { if (n && n > 0) setProductCount(n); })
      .catch(() => { /* fallback na 15921 */ });
  }, []);

  /* ── Hero slider ── */
  const [slide, setSlide]   = useState(0);
  const [sliding, setSliding] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number) => {
    if (sliding) return;
    setSliding(true);
    setSlide(idx);
    setTimeout(() => setSliding(false), 700);
  }, [sliding]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((slide + 1) % heroSlides.length);
    }, 6000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [slide, goTo]);

  /* ── Section reveals ── */
  const r1 = useReveal(); // categories
  const r2 = useReveal(); // featured
  const r3 = useReveal(); // stats
  const r4 = useReveal(); // features
  const r6 = useReveal(); // blog
  const r7 = useReveal(); // brands
  const r8 = useReveal(); // testimonials
  const r9 = useReveal(); // realizacje
  const r10 = useReveal(); // newsletter

  const current = heroSlides[slide];

  /* ── Newsletter submit ── */
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes("@")) {
      setNewsletterSent(true);
    }
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Media Bud – Skład Budowlany",
        "description": "Profesjonalna hurtownia materiałów budowlanych w Lublinie",
        "telephone": "+48509567213",
        "email": "sprzedaz@mediabud.pl",
        "address": { "@type": "PostalAddress", "streetAddress": "ul. Chemiczna 8", "addressLocality": "Lublin", "postalCode": "20-329", "addressCountry": "PL" },
        "url": "https://mediabud.pl",
        "openingHours": ["Mo-Fr 07:00-17:00", "Sa 08:00-14:00"],
        "priceRange": "$$",
        "areaServed": "Lublin, województwo lubelskie"
      })}} />

      {/* ═══════════════════════════════════════════════════════
          HERO SLIDER
      ═══════════════════════════════════════════════════════ */}
      {/* ── Hero Section ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ background: "#000" }}>
        {/* Slides */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.label}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.22) saturate(0.72)" }}
            />
          </div>
        ))}

        {/* Warstwa 1: Siatka techniczna CSS */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(248,24,40,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(248,24,40,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.4,
        }} />
        {/* Warstwa 2: Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(248,24,40,0.15), transparent)",
        }} />
        {/* Warstwa 3: Gradient dolny */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{
          background: "linear-gradient(to top, #000, transparent)",
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.68) 42%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0.2) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20" style={{ background: "linear-gradient(90deg, #f81828, #ff6b35 50%, #f81828)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] z-20 bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.45)" }} />

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            {/* Eyebrow badge */}
            <div
              key={`label-${slide}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full text-xs font-bold uppercase tracking-widest animate-fade-up"
              style={{ border: "1px solid rgba(248,24,40,0.4)", color: "#f81828" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#f81828] animate-pulse" />
              {current.label} — Lublin
            </div>

            {/* Główny tytuł */}
            <h1
              key={`title-${slide}`}
              className="font-black uppercase leading-[1.05] tracking-tight mb-4 text-white animate-fade-up delay-100 break-words max-w-full"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.02em", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", overflowWrap: "anywhere", hyphens: "auto" }}
            >
              {current.title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span style={{ background: "linear-gradient(135deg, #f81828, #ff6b35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            {/* Podtytuł */}
            <p
              key={`sub-${slide}`}
              className="text-lg mb-8 max-w-xl leading-relaxed animate-fade-up delay-200"
              style={{ color: "#888", fontFamily: "Inter,sans-serif" }}
            >
              {current.subtitle}
            </p>

            {/* CTA buttons */}
            <div key={`cta-${slide}`} className="flex flex-wrap gap-4 mb-10 animate-fade-up delay-300">
              <Link
                to={current.ctaLink}
                className="inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-wider text-white rounded-lg relative overflow-hidden group"
                style={{ background: "#f81828", fontSize: "0.875rem", letterSpacing: "0.1em", boxShadow: "0 16px 36px rgba(248,24,40,0.22)" }}
              >
                <span className="relative z-10">{current.cta} →</span>
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)", transform: "skewX(-12deg)" }}
                />
              </Link>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold uppercase tracking-wider rounded-lg transition-all duration-300 text-white hover:text-white"
                style={{ border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.875rem", letterSpacing: "0.1em" }}
                onClick={() => setQuoteOpen(true)}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(248,24,40,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
              >
                Zapytaj o wycenę B2B
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 animate-fade-up delay-400">
              {["Ponad 15 900 produktów", "Bezpłatne doradztwo", "Dostawa Lublin"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-bold" style={{ color: "#888" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Prev/next */}
        <button
          onClick={() => goTo((slide - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex w-11 h-11 rounded-full border border-white/15 bg-black/55 items-center justify-center text-white transition-all duration-200"
          onMouseEnter={e => {
            e.currentTarget.style.background = "#f81828";
            e.currentTarget.style.boxShadow = "0 0 18px rgba(248,24,40,0.25)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(0,0,0,0.55)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => goTo((slide + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex w-11 h-11 rounded-full border border-white/15 bg-black/55 items-center justify-center text-white transition-all duration-200"
          onMouseEnter={e => {
            e.currentTarget.style.background = "#f81828";
            e.currentTarget.style.boxShadow = "0 0 18px rgba(248,24,40,0.25)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(0,0,0,0.55)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${i === slide ? "w-8 h-2 bg-[#f81828]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
        <div className="absolute bottom-6 left-6 z-30 text-xs font-black uppercase tracking-[0.25em]" style={{ color: "#888", fontFamily: "'Share Tech Mono',monospace" }}>
          <span className="text-white">{String(slide + 1).padStart(2, "0")}</span> / {String(heroSlides.length).padStart(2, "0")}
        </div>
      </section>

      {/* StatBar LED */}
      <div
        ref={r3.ref as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-700 ${r3.visible ? "opacity-100" : "opacity-0"}`}
        style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: `${productCount.toLocaleString("pl-PL").replace(/\s/g, " ")}+`, label: "Produktów w ofercie" },
              { num: "15 lat", label: "Doświadczenia" },
              { num: "500+", label: "Firm klientów" },
              { num: "<24h", label: "Czas realizacji" },
            ].map((s, i) => (
              <div
                key={i}
                className="px-6 py-5 text-center group cursor-default transition-colors duration-200 hover:bg-[#f81828]/5"
                style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
              >
                <div
                  className="font-black text-2xl text-[#f81828] mb-1"
                  style={{ fontFamily: "'Share Tech Mono',monospace", textShadow: "0 0 7px rgba(248,24,40,0.6), 0 0 15px rgba(248,24,40,0.3)" }}
                >
                  {s.num}
                </div>
                <div className="text-xs uppercase tracking-widest font-bold" style={{ color: "#888" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CATEGORIES GRID — Industrial Pulse
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r1.ref as React.RefObject<HTMLElement>}
        className={`py-16 transition-all duration-700 ${r1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "#050505", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}
      >
        <style>{`
          @keyframes cat-scan { 0%{top:0%;opacity:.75} 75%{opacity:.35} 100%{top:100%;opacity:0} }
          .cat-card:hover .cat-scan-line { animation: cat-scan 0.9s ease-in forwards; }
          .cat-card img { filter: brightness(0.22) saturate(0.5); transition: filter 0.5s; }
          .cat-card:hover img { filter: brightness(0.38) saturate(0.85); }
        `}</style>

        <div className="container mx-auto px-4">

          {/* ── Header ── */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="text-[10px] font-black tracking-[0.3em] uppercase text-[#f81828]"
                  style={{ fontFamily: "'Share Tech Mono',monospace" }}
                >01 /</span>
                <span className="h-px w-8 bg-[#f81828]" />
                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#f81828]">Asortyment</span>
              </div>
              <h2
                className="font-black text-white uppercase break-words max-w-full"
                style={{
                  fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.05,
                  overflowWrap: "anywhere",
                }}
              >
                Nasze<br />
                <span style={{ color: "#f81828" }}>kategorie</span>
              </h2>
              <p className="text-sm mt-2" style={{ color: "#4a4a4a" }}>
                Kompleksowy asortyment materiałów dla każdej budowy
              </p>
            </div>
            <Link
              to="/produkty"
              className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors hover:text-white"
              style={{ color: "#f81828", letterSpacing: "0.15em" }}
            >
              Pełny katalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* ── Bento Grid ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {categories.map((cat, i) => {
              const isWide = i < 2;
              return (
                <Link
                  key={cat.id}
                  to={`/kategoria/${cat.slug}`}
                  className={`cat-card group relative overflow-hidden rounded-xl ${isWide ? "col-span-2 aspect-[16/7] lg:aspect-[16/6]" : "col-span-1 aspect-square lg:aspect-[4/5]"}`}
                  style={{
                    background: "#0f0f0f",
                    border: "1px solid #1a1a1a",
                    transition: "border-color 0.28s, box-shadow 0.28s",
                    transitionDelay: `${i * 35}ms`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.55)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(248,24,40,0.13), inset 0 0 0 1px rgba(248,24,40,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Scan line */}
                  <div
                    className="cat-scan-line absolute left-0 right-0 h-px z-20 pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(248,24,40,0.85), transparent)", top: 0 }}
                  />

                  {/* Image */}
                  {catImages[cat.slug] ? (
                    <img
                      src={catImages[cat.slug]}
                      alt={cat.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#111,#0a0a0a)" }} />
                  )}

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.08) 100%)" }}
                  />

                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none"
                    style={{ background: "#f81828", boxShadow: "0 0 8px rgba(248,24,40,0.7)" }}
                  />

                  {/* Corner L-brackets */}
                  <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M0 10 L0 0 L10 0" stroke="#f81828" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M10 0 L10 10 L0 10" stroke="#f81828" strokeWidth="1.5"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    {/* Top row: index + subcats badge */}
                    <div className="flex items-start justify-between">
                      <span
                        className="text-[9px] font-black text-white/25 group-hover:text-white/55 transition-colors"
                        style={{ fontFamily: "'Share Tech Mono',monospace" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {cat.children && cat.children.length > 0 && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.28)", color: "#f88090" }}
                        >
                          {cat.children.length} kat.
                        </span>
                      )}
                    </div>

                    {/* Bottom: name + CTA */}
                    <div>
                      <h3
                        className="font-black text-white uppercase leading-tight mb-2"
                        style={{
                          fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif",
                          fontSize: isWide ? "clamp(1rem, 2.2vw, 1.4rem)" : "clamp(0.8rem, 1.5vw, 1rem)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {cat.name}
                      </h3>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#f81828]">Przeglądaj</span>
                        <ChevronRight className="w-3 h-3 text-[#f81828]" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="mt-6 flex md:hidden justify-center">
            <Link
              to="/produkty"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest text-white rounded-lg"
              style={{ background: "#f81828", letterSpacing: "0.12em" }}
            >
              Pełny katalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED PRODUCTS  (z tabami)
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r2.ref as React.RefObject<HTMLElement>}
        className={`py-14 transition-all duration-700 ${r2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="container mx-auto px-4">
          {/* Header + tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#f81828]" />Oferta
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-white">Katalog produktów</h2>
              <p className="text-gray-500 mt-1 text-sm">Bestsellery i nowości w naszej ofercie</p>
            </div>
            {/* Tabs */}
            <div className="flex items-center gap-1 rounded-xl p-1 self-start md:self-auto"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)" }}>
              {PRODUCT_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-[#f81828] text-white"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <div
                key={p.id}
                className={`transition-all duration-500 ${r2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/produkty">
              <Button className="bg-[#f81828] hover:bg-[#c8000f] font-bold px-8">
                Zobacz pełny katalog <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/kontakt">
              <Button variant="outline" className="border-gray-300 text-gray-700 font-semibold px-8 hover:border-[#f81828] hover:text-[#f81828]">
                Zapytaj o produkt
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BRANDS BAR
      ═══════════════════════════════════════════════════════ */}
      {/* ── Nasi producenci — Brand Logo Scroller ── */}
      <section
        ref={r7.ref as React.RefObject<HTMLElement>}
        className={`py-10 overflow-hidden transition-all duration-700 ${r7.visible ? "opacity-100" : "opacity-0"}`}
        style={{ background: "#050505", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}
      >
        <div className="container mx-auto px-4 mb-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#888" }}>
            Nasi producenci
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #050505, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #050505, transparent)" }}
          />

          <style>{`
            @keyframes brand-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .brand-track { animation: brand-scroll 30s linear infinite; }
            .brand-track:hover { animation-play-state: paused; }
          `}</style>

          <div className="brand-track flex items-center gap-16 whitespace-nowrap" style={{ width: "max-content" }}>
            {[...brandLogos, ...brandLogos].map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="inline-flex items-center justify-center px-6 group flex-shrink-0">
                <img
                  src={brand.url}
                  alt={brand.name}
                  loading="lazy"
                  className="h-10 w-auto object-contain transition-all duration-300"
                  style={{ filter: "grayscale(100%) brightness(0.5)", maxWidth: "120px" }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.filter = "grayscale(0%) brightness(1)"; }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.filter = "grayscale(100%) brightness(0.5)"; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHY MEDIABUD
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r4.ref as React.RefObject<HTMLElement>}
        className={`container mx-auto px-4 py-14 transition-all duration-700 ${r4.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="text-center mb-10">
          <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 bg-[#f81828]" />Dlaczego my?<span className="w-4 h-0.5 bg-[#f81828]" />
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-3">Dlaczego Media Bud?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm">
            Łączymy profesjonalną wiedzę techniczną z indywidualnym podejściem — zarówno dla deweloperów, jak i klientów budujących własny dom.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${r4.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                background: "#0f0f0f",
                border: "1px solid rgba(255,255,255,0.07)",
                transitionDelay: `${i * 70}ms`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.35)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(248,24,40,0.10)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div className="w-12 h-12 bg-[#1a1a1a] group-hover:bg-[#f81828] rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="font-display font-black text-white mb-2 text-base">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          REALIZACJE
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r9.ref as React.RefObject<HTMLElement>}
        className={`container mx-auto px-4 py-14 transition-all duration-700 ${r9.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Doświadczenie
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">Nasze realizacje</h2>
            <p className="text-gray-500 mt-1 text-sm">Wybrane projekty, przy których dostarczyliśmy materiały</p>
          </div>
          <Link to="/realizacje" className="hidden md:flex items-center gap-1 text-sm font-bold text-[#f81828] hover:underline">
            Wszystkie realizacje <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {realizacje.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className={`group relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg hover:shadow-[0_8px_32px_rgba(248,24,40,0.2)] transition-all duration-300 hover:-translate-y-1 cursor-pointer ${r9.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <img
                  src={r.image}
                  alt={r.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: "brightness(0.55)" }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#f81828]/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Always visible overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Top badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/10">
                    <Icon className="w-3 h-3 text-[#f81828]" />
                    {r.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display font-black text-white text-sm leading-snug mb-1.5">{r.title}</h3>
                  <p className="text-gray-300 text-[11px] mb-2 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#f81828]" />
                    {r.location}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {r.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold bg-white/10 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r8.ref as React.RefObject<HTMLElement>}
        className={`py-14 transition-all duration-700 ${r8.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Opinie klientów<span className="w-4 h-0.5 bg-[#f81828]" />
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-2">Co mówią nasi klienci?</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">Zaufali nam dewelopierzy, architekci i tysiące prywatnych inwestorów z regionu lubelskiego.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${r8.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  background: "#0f0f0f",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transitionDelay: `${i * 100}ms`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.25)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(248,24,40,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-[#f81828] text-[#f81828]" />
                  ))}
                  <span className="ml-2 text-xs text-gray-500 font-medium">{t.tag}</span>
                </div>

                {/* Quote */}
                <div className="text-[#f81828]/25 font-black text-5xl leading-none mb-2 font-display select-none">"</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 -mt-4">{t.text}</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-10 h-10 rounded-full bg-[#f81828] flex items-center justify-center text-white text-xs font-black flex-shrink-0 overflow-hidden">
                    {t.avatarImg
                      ? <img src={t.avatarImg} alt={t.name} className="w-full h-full object-cover" />
                      : t.avatar
                    }
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role} · {t.company}</div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dom od podstaw ── */}
      <section id="dom-od-podstaw" className="py-24 relative overflow-hidden" style={{ background: "#000" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(248,24,40,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative z-10 container mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "#f81828" }}>
            — PROGRAM SPECJALNY —
          </p>
          <h2
            className="text-center font-black uppercase text-white mb-4"
            style={{ fontSize: "clamp(1.75rem,4vw,3.5rem)", letterSpacing: "-0.02em", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}
          >
            Dom od podstaw
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-16 leading-relaxed" style={{ color: "#888", fontSize: "1.05rem" }}>
            Kompleksowe wsparcie dla tych, którzy budują dom po raz pierwszy. Prowadzimy Cię od projektu do odbioru — krok po kroku, z pełnym doradztwem technicznym i dostępem do sprawdzonej sieci wykonawców.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: "📐", title: "Bezpłatna analiza projektu", desc: "Analizujemy Twój projekt i dobieramy optymalne materiały." },
              { icon: "📋", title: "Kosztorys etapami", desc: "Szczegółowy kosztorys materiałów do każdego etapu budowy." },
              { icon: "👷", title: "Sieć wykonawców", desc: "Sprawdzeni tynkarze, montażyści i specjaliści budowlani." },
              { icon: "🔧", title: "Wsparcie techniczne", desc: "Jesteśmy z Tobą przez cały czas realizacji budowy." },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-xl p-6 transition-all duration-300"
                style={{ background: "#0f0f0f", border: "1px solid #2d2d2d" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(248,24,40,0.4)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(248,24,40,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#2d2d2d"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/kontakt" className="inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-wider text-white rounded-lg"
              style={{ background: "#f81828", fontSize: "0.875rem", letterSpacing: "0.1em", boxShadow: "0 16px 36px rgba(248,24,40,0.22)" }}>
              Dowiedz się więcej →
            </a>
          </div>
        </div>
      </section>

      {/* ── Jak działamy ── */}
      <section className="py-24" style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }}>
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "#f81828" }}>
            — JAK DZIAŁAMY —
          </p>
          <h2
            className="text-center font-black uppercase text-white mb-4"
            style={{ fontSize: "clamp(1.75rem,4vw,3.5rem)", letterSpacing: "-0.02em", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}
          >
            Prosty proces współpracy
          </h2>
          <p className="text-center max-w-xl mx-auto mb-16 leading-relaxed" style={{ color: "#888" }}>
            Od pierwszego kontaktu do realizacji — prowadzimy Cię krok po kroku
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: "01", title: "Skontaktuj się", desc: "Zadzwoń, napisz lub wypełnij formularz. Opowiedz nam o swoim projekcie." },
              { num: "02", title: "Dobierzemy rozwiązania", desc: "Nasi eksperci dobiorą optymalne materiały i przygotują szczegółową ofertę." },
              { num: "03", title: "Realizujemy zamówienie", desc: "Dostarczamy materiały na budowę i wspieramy na każdym etapie realizacji." },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div
                  className="font-black text-6xl mb-4 leading-none select-none"
                  style={{ fontFamily: "'Share Tech Mono',monospace", color: "rgba(248,24,40,0.12)", letterSpacing: "-0.04em" }}
                >
                  {step.num}
                </div>
                <div className="w-12 h-[2px] mx-auto mb-4" style={{ background: "#f81828" }} />
                <h3 className="font-bold text-white uppercase tracking-wide mb-2 text-sm">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider rounded-lg transition-all duration-300 text-white"
              style={{ border: "1px solid rgba(248,24,40,0.4)", color: "#f81828" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(248,24,40,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              Porozmawiajmy o Twoim projekcie →
            </a>
          </div>
        </div>
      </section>

      {/* ── Nasze usługi ── */}
      <section className="py-24" style={{ background: "#000", borderTop: "1px solid #1a1a1a" }}>
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-black uppercase tracking-[0.28em] mb-3" style={{ color: "#f81828" }}>
            — NASZE USŁUGI WYKONAWCZE —
          </p>
          <h2
            className="text-center font-black uppercase text-white mb-4 break-words"
            style={{ fontSize: "clamp(1.9rem,4vw,4.5rem)", letterSpacing: "-0.03em", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", overflowWrap: "anywhere" }}
          >
            Budujemy, wykańczamy i modernizujemy
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-14 leading-relaxed text-sm md:text-base" style={{ color: "#888" }}>
            MediaBud łączy skład budowlany, doradztwo techniczne i usługi wykonawcze dla klientów indywidualnych oraz biznesowych w Lublinie i województwie lubelskim.
          </p>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 mb-8">
            <div className="rounded-2xl p-6 md:p-7" style={{ background: "#0f0f0f", border: "1px solid #2d2d2d", boxShadow: "0 16px 40px rgba(0,0,0,0.28)" }}>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] mb-2" style={{ color: "#f81828" }}>B2C</p>
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase text-white leading-[0.95] break-words mb-3" style={{ overflowWrap: "anywhere" }}>
                Dom od podstaw i realizacje prywatne
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
                Budowa domu, domy do 70 m², termomodernizacja, wykończenia pod klucz i adaptacje poddaszy — wszystko oparte o lokalną logistykę MediaBud oraz sprawdzone marki Weber, Ceresit, Atlas, Knauf, Rockwool, Swisspor, Bolix, Termo Organika, Baumit, Rigips i Ursa.
              </p>
            </div>
            <div className="rounded-2xl p-6 md:p-7" style={{ background: "#0f0f0f", border: "1px solid rgba(255,107,53,0.28)", boxShadow: "0 16px 40px rgba(0,0,0,0.28)" }}>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] mb-2" style={{ color: "#ff6b35" }}>B2B</p>
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase text-white leading-[0.95] break-words mb-3" style={{ overflowWrap: "anywhere" }}>
                Galerie, szkoły i obiekty użytkowe
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
                Realizujemy także remonty i modernizacje dla firm oraz instytucji, a wspólne usługi dekarskie i elewacyjne obsługują zarówno inwestycje prywatne, jak i obiektowe.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {serviceCards.map((service, i) => {
              const isB2B = service.segment === "B2B";
              return (
                <Link
                  key={`${service.title}-${i}`}
                  to={service.href}
                  className="group rounded-2xl p-6 flex flex-col transition-all duration-300"
                  style={{ background: "#0f0f0f", border: `1px solid ${isB2B ? "rgba(255,107,53,0.24)" : "#2d2d2d"}`, boxShadow: "0 16px 40px rgba(0,0,0,0.24)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = isB2B ? "0 18px 42px rgba(0,0,0,0.38), 0 0 20px rgba(255,107,53,0.12)" : "0 18px 42px rgba(0,0,0,0.38), 0 0 20px rgba(248,24,40,0.12)"; el.style.borderColor = isB2B ? "rgba(255,107,53,0.46)" : "rgba(248,24,40,0.42)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.24)"; el.style.borderColor = isB2B ? "rgba(255,107,53,0.24)" : "#2d2d2d"; }}
                >
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="text-[10px] font-black uppercase tracking-[0.28em] px-3 py-1.5 rounded-full"
                      style={{ color: isB2B ? "#ff6b35" : "#f81828", background: isB2B ? "rgba(255,107,53,0.10)" : "rgba(248,24,40,0.10)", border: `1px solid ${isB2B ? "rgba(255,107,53,0.24)" : "rgba(248,24,40,0.24)"}` }}>
                      {service.segment}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "#888" }}>{service.tag}</span>
                  </div>
                  <h3 className="font-display font-black uppercase text-white mb-3 leading-[1] break-words" style={{ fontSize: "clamp(1.25rem,2.4vw,2rem)", overflowWrap: "anywhere" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#888" }}>{service.desc}</p>
                  <div className="mt-5 pt-5 border-t border-[#1f1f1f] flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "#888" }}>{service.href === "#dom-od-podstaw" ? "sekcja programu" : "podstrona usługi"}</span>
                    <span className="text-xs font-black uppercase tracking-[0.22em] inline-flex items-center gap-2" style={{ color: isB2B ? "#ff6b35" : "#f81828" }}>
                      Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NEWSLETTER STRIP
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r10.ref as React.RefObject<HTMLElement>}
        className={`bg-[#0a0a0a] py-12 relative overflow-hidden transition-all duration-700 ${r10.visible ? "opacity-100" : "opacity-0"}`}
      >
        {/* Decorative bg */}
        <div className="absolute inset-0">
          <img src="/images/newsletter-bg_2.png" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f81828 0%, transparent 60%), radial-gradient(circle at 80% 50%, #f81828 0%, transparent 60%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f81828]/60 to-transparent" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-2 flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Newsletter<span className="w-4 h-0.5 bg-[#f81828]" />
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-2">
              Bądź na bieżąco z naszą ofertą
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Promocje, nowe produkty, porady techniczne — bezpośrednio na Twoją skrzynkę.
            </p>

            {newsletterSent ? (
              <div className="flex items-center justify-center gap-2 text-green-400 font-bold text-sm bg-green-500/10 border border-green-500/20 rounded-xl py-3 px-6">
                <CheckCircle2 className="w-5 h-5" />
                Dziękujemy za zapis! Sprawdź swoją skrzynkę mailową.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Twój adres e-mail..."
                  required
                  className="flex-1 h-11 px-4 rounded-l-xl bg-white/8 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#f81828] focus:bg-white/12 transition-all"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
                <button
                  type="submit"
                  className="h-11 px-5 bg-[#f81828] hover:bg-[#c8000f] text-white font-bold rounded-r-xl flex items-center gap-2 transition-colors text-sm flex-shrink-0"
                >
                  Zapisz się <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-gray-600 text-xs mt-3">Możesz zrezygnować w każdej chwili. Nie wysyłamy spamu.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BLOG
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r6.ref as React.RefObject<HTMLElement>}
        className={`container mx-auto px-4 py-14 transition-all duration-700 ${r6.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Wiedza
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">Blog techniczny</h2>
            <p className="text-gray-500 mt-1 text-sm">Ekspercka wiedza dla budowniczych i inwestorów</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-1 text-sm font-bold text-[#f81828] hover:underline">
            Wszystkie artykuły <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`group rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 ${r6.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                background: "#0f0f0f",
                border: "1px solid rgba(255,255,255,0.07)",
                transitionDelay: `${i * 100}ms`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.3)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(248,24,40,0.10)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <Badge variant="secondary" className="text-xs font-medium">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("pl-PL")}
                  </span>
                </div>
                <h3 className="font-display font-black text-white leading-snug mb-2 group-hover:text-[#f81828] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-[#f81828] font-bold">
                  Czytaj więcej <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=60')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.2) saturate(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f81828]/90 via-[#c8000f]/80 to-[#0a0a0a]/90" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative container mx-auto px-4 py-20 text-center">
          <p className="text-xs font-black tracking-widest uppercase text-red-200 mb-3 flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 bg-red-200" />Gotowy na współpracę?<span className="w-4 h-0.5 bg-red-200" />
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Zróbmy to razem
          </h2>
          <p className="text-red-100 mb-9 max-w-xl mx-auto text-base leading-relaxed">
            Skontaktuj się z nami już dziś. Przygotujemy bezpłatną wycenę materiałów dla Twojego projektu w ciągu 24 godzin.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+48509567213">
              <Button size="lg" className="bg-white text-[#f81828] hover:bg-gray-100 font-black px-10 w-full sm:w-auto text-base h-12 shadow-2xl hover:shadow-white/20 transition-all">
                <Phone className="w-4 h-4 mr-2" /> +48 509 567 213
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/15 font-black px-10 text-base h-12"
              onClick={() => setQuoteOpen(true)}
            >
              <Mail className="w-4 h-4 mr-2" /> Wyślij zapytanie
            </Button>
          </div>
        </div>
      </section>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
