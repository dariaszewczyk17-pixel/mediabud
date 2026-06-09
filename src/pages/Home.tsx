import { Link } from "react-router-dom";
import { Phone, Mail, ChevronRight, ArrowRight, Calendar, TrendingUp, Users, Award, Clock, ChevronLeft, Star, CheckCircle2, Send, Building2, HardHat, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories as staticCategories } from "@/data/categories";
import { getFeaturedProducts, products as allStaticProducts } from "@/data/products";
import { getRecentBlogPosts } from "@/data/blog";
import { useAllCategories, useFeaturedProducts as useSanityFeatured } from "@/hooks/useSanityData";
import { sanityCategoryToLegacy, sanityProductToLegacy } from "@/lib/adapters";
import { sanityFetch } from "@/lib/sanity";
import { BESTSELLER_SLUGS } from "@/lib/bestsellers";
import { ProductCard, QuoteModal } from "@/components/Commerce";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ─── Reveal hook ─────────────────────────────────────────────── */
function useReveal(threshold = 0.05) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [visible, setVisible] = useState(prefersReduced);
  useEffect(() => {
    if (prefersReduced) return; // animacje wyłączone systemowo
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px 80px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, prefersReduced]);
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
    label: "Skład budowlany · Lublin",
    title: "15 000+ produktów.\nDostawa na budowę.",
    subtitle: "Odbierasz od ręki lub zamawiasz z dostawą na plac budowy. Materiały renomowanych marek, doradztwo techniczne gratis.",
    cta: "Przeglądaj produkty",
    ctaLink: "/produkty",
  },
  {
    image: "/images/hero-etics_2.png",
    label: "Ocieplenia i OZE",
    title: "Ocieplenie i elewacja.\nMateriały + ekipa w jednym.",
    subtitle: "Ocieplamy ściany, dachy i elewacje. Materiały renomowanych marek z naszego składu — nasza ekipa wbudowuje je pod klucz.",
    cta: "Sprawdź usługi",
    ctaLink: "/uslugi/elewacje",
  },
  {
    image: "/images/hero-chemia_2.png",
    label: "Budujesz lub remontujesz?",
    title: "Materiały i ekipa.\nJeden partner.",
    subtitle: "Media Bud to skład budowlany i firma wykonawcza w jednym. Kupujesz materiały i zamawiasz ekipę u jednego sprawdzonego partnera w Lublinie.",
    cta: "Zobacz usługi",
    ctaLink: "/uslugi",
  },
];

/* ─── Category icons / images ─────────────────────────────────── */
const catIcons: Record<string, string> = {
  "chemia-budowlana": "🧪", "dachy": "🏠", "farby-i-rozpuszczalniki": "🎨",
  "izolacje": "🛡️", "narzedzia-i-mocowania": "🔧", "pozostale": "📦",
  "plytki": "⬜", "stropy-i-sciany": "🧱", "sucha-zabudowa": "🔲", "sufity-podwieszane": "⬛",
};
const catImages: Record<string, string> = {
  "chemia-budowlana": "/images/cat-chemia_2.png",
  "dachy": "/images/cat-dachy_2.png",
  "farby-i-rozpuszczalniki": "/images/cat-farby_2.png",
  "izolacje": "/images/cat-ocieplenia_2.png",
  "narzedzia-i-mocowania": "/images/cat-narzedzia_2.png",
  "plytki": "/images/cat-plytki_2.png",
  "stropy-i-sciany": "/images/cat-sciany_2.png",
  "sucha-zabudowa": "/images/cat-sucha-zabudowa_2.png",
  "sufity-podwieszane": "/images/cat-sufity_2.png",
  "pozostale": "https://skyagent-artifacts.skywork.ai/router/agent/2026-06-08/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/pozostale_kategoria_2_8a82cc38d2a44d9b884d891b1745b7b2.png",
};

const stats = [
  { icon: TrendingUp, num: 15900, suffix: "+", label: "produktów w ofercie" },
  { icon: Users,     num: 500,  suffix: "+", label: "zadowolonych klientów" },
  { icon: Award,     num: 15,   suffix: "+", label: "lat doświadczenia" },
  { icon: Clock,     num: 24,   suffix: "h", label: "czas odpowiedzi" },
];

const features = [
  { Icon: HardHat,   code: "01", title: "Doradztwo gratis",       desc: "Nie wiesz jakich materiałów potrzebujesz? Nasi eksperci dobiorą system i policzą ilości — bez opłat i zobowiązań." },
  { Icon: Building2, code: "02", title: "Od materiałów po klucze", desc: "Możesz kupić same materiały albo zamówić kompleksową usługę. Wszystko u jednego partnera, bez szukania ekip po całym mieście." },
  { Icon: ArrowRight,code: "03", title: "Dostawa na plac budowy",  desc: "Dowozimy materiały na teren Lublina i całego woj. lubelskiego. Prosto na budowę, we wskazanym terminie." },
  { Icon: Star,      code: "04", title: "Tylko renomowane marki",  desc: "Weber, Ceresit, Atlas, Knauf, Rockwool, Swisspor — oryginalne produkty renomowanych marek, bez podróbek." },
  { Icon: Award,     code: "05", title: "Certyfikaty i atesty",    desc: "Każdy produkt posiada pełną dokumentację techniczną, deklaracje właściwości użytkowych i certyfikaty zgodności." },
  { Icon: Users,     code: "06", title: "Deweloperzy i firmy B2B", desc: "Indywidualne ceny, dedykowany opiekun, faktury zbiorcze i rabaty dla firm budowlanych oraz deweloperów." },
];

const serviceCards = [
  { segment: "B2C", tag: "PROGRAM", title: "Dom od podstaw", desc: "Budujesz pierwszy dom? Jeden opiekun, jeden kosztorys, zero koordynowania wielu firm. Od projektu po klucze.", href: "/uslugi/dom-od-podstaw" },
  { segment: "B2B", tag: "DEWELOPERZY", title: "Współpraca z deweloperami", desc: "Realizujesz osiedle lub inwestycję wielorodzinną? Jeden partner — materiały i wykonawstwo w jednym kontrakcie.", href: "/uslugi/kompleksowa-wspolpraca-z-deweloperami" },
  { segment: "Oba", tag: "DACHY", title: "Dachy", desc: "Nowy dach lub przeciek? Własna ekipa dekarska, szybka diagnoza i naprawa. Dachówka, blacha, papa.", href: "/uslugi/dachy" },
  { segment: "Oba", tag: "ELEWACJE", title: "Elewacje", desc: "Ocieplamy i wykańczamy dom w jednym projekcie. Tynk, klinkier lub elewacja wentylowana. Efekt na 20 lat.", href: "/uslugi/elewacje" },
  { segment: "B2B", tag: "FIRMY", title: "Remonty dla firm", desc: "Remont sklepu, biura lub hali w nocy i w weekendy. Twoja firma działa normalnie, my remontujemy w tle.", href: "/uslugi/remonty-b2b" },
  { segment: "B2C", tag: "POD KLUCZ", title: "Wykończenia pod klucz", desc: "Stan surowy → gotowy dom do życia. Tynki, podłogi, glazura, łazienki. Jedna ekipa, jeden kosztorys.", href: "/uslugi/wykonczenia-pod-klucz" },
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
  { name: "Weber",    url: "https://static.www.bechcicki.pl/cms/1c6a19bca34f4da99131e0736ea4af9d-weber.png" },
  { name: "Knauf",   url: "https://static.www.bechcicki.pl/cms/189dc43be7ae469eacd2a1eae4ef0c03-knauf-nowy.png" },
  { name: "Atlas",   url: "https://static.www.bechcicki.pl/cms/ae397a1ebebc4e3083ff5765cff0ea4c-atlas.png" },
  { name: "Baumit",  url: "https://static.www.bechcicki.pl/cms/e4952888b3504ee78cbb6685f844b4cf-baumit-new.png" },
  { name: "Rockwool",url: "https://static.www.bechcicki.pl/cms/c742dfc82d1c42bb9fe0bc086f8ba822-rockwool.png" },
  { name: "Rigips",  url: "https://static.www.bechcicki.pl/cms/101a8b40f4e6454483f7cc7f6cb25cd7-rigips.png" },
  { name: "URSA",    url: "https://static.www.bechcicki.pl/cms/c6adf9efc58b4309bca4ca1642741842-ursa-etex.png" },
  { name: "Velux",   url: "https://static.www.bechcicki.pl/cms/f6736747f0f74f23bcf4900e60598c9d-velux.png" },
  { name: "Ceresit", url: "https://static.www.bechcicki.pl/cms/0dd0ae5703cd43b1afdcfca87416fd05-ceresit.png" },
  { name: "Sika",    url: "https://static.www.bechcicki.pl/cms/e2212f996bef427797215b970fcc6af1-sika.png" },
  { name: "Mapei",   url: "https://static.www.bechcicki.pl/cms/581c437c6b7a42b89a3151f944e3ed4e-mapei.png" },
  { name: "Isover",  url: "https://static.www.bechcicki.pl/cms/a3c64554fcd842aeb7b189bd43b82852-isover.png" },
  { name: "Fakro",   url: "https://static.www.bechcicki.pl/cms/34b06a260cdd46d295f0be4e762a2580-fakro.png" },
  { name: "Soudal",  url: "https://static.www.bechcicki.pl/cms/ef053138ca514d15bd8300581a7ba3e6-soudal.png" },
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
    title: "Budynek mieszkalno-usługowy w sercu Czub",
    projectName: "Onyksowa Design — Lublin, ul. Onyksowa",
    client: "Inwestor prywatny, Lublin",
    scope: "Kompleksowa dostawa materiałów: systemy ETICS, tynki elewacyjne, chemia budowlana, materiały wykończeniowe — 7-kondygnacyjny budynek mieszkalno-usługowy",
    value: "",
    year: "2024",
    tags: ["ETICS", "Tynki elewacyjne", "Lublin Czuby"],
    image: "/images/real-onyksowa.jpg",
    icon: Building2,
  },
  {
    title: "Nowoczesne osiedle mieszkaniowe przy parku",
    projectName: "Polesie Park — Łęczna, ul. Wierzbowa",
    client: "TBV Deweloper, Lublin",
    scope: "Dostawa materiałów konstrukcyjnych i wykończeniowych: bloczki, zaprawy, systemy elewacyjne, materiały izolacyjne — 5 budynków wielorodzinnych",
    value: "",
    year: "2025",
    tags: ["Konstrukcja", "Izolacje", "5 budynków"],
    image: "/images/real-polesie-park.jpg",
    icon: HardHat,
  },
  {
    title: "Kameralne osiedle w Lublinie",
    projectName: "Lubelska Osada — Lublin",
    client: "Lubelska Osada Sp. z o.o.",
    scope: "Kompleksowa dostawa materiałów budowlanych: chemia budowlana, materiały elewacyjne, izolacje, tynki — deweloperski standard wykończenia",
    value: "",
    year: "2025",
    tags: ["Chemia budowlana", "Elewacje", "Lublin"],
    image: "/images/real-lubelska-osada.jpg",
    icon: HomeIcon,
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
  const [activeTab, setActiveTab] = useState("bestsellery");

  const featured = useMemo(() => {
    if (activeTab === "bestsellery") {
      const slugSet = new Set(BESTSELLER_SLUGS);
      const found = allStaticProducts.filter(p => slugSet.has(p.slug));
      return (BESTSELLER_SLUGS as readonly string[])
        .map(slug => found.find(p => p.slug === slug))
        .filter(Boolean) as typeof found;
    }
    if (activeTab === "nowosci") {
      const newProds = allStaticProducts.filter(p => p.isNew);
      if (newProds.length > 0) return newProds.slice(0, 12);
    }
    if (sanityFeatured && (sanityFeatured as any[]).length > 0) {
      return (sanityFeatured as any[]).map(sanityProductToLegacy);
    }
    return getFeaturedProducts();
  }, [sanityFeatured, activeTab]);

  const recentPosts = getRecentBlogPosts(3);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent]   = useState(false);
  const [productCount, setProductCount]       = useState<number>(15921); // fallback: stan na 2026-05-29

  /* ── Dynamiczny licznik produktów z Sanity ── */
  useEffect(() => {
    sanityFetch<number>('count(*[_type=="product"])')
      .then(n => { if (n && n > 0) setProductCount(n); })
      .catch(() => { /* fallback na 15921 */ });
  }, []);

  /* ── Prefetch najczęściej odwiedzanych stron po załadowaniu Home ── */
  useEffect(() => {
    const t = setTimeout(() => {
      import("@/pages/Blog");
      import("@/pages/Kalkulator");
    }, 2000);
    return () => clearTimeout(t);
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
        "telephone": "+48533553344",
        "email": "sprzedaz@mediabud.pl",
        "address": { "@type": "PostalAddress", "streetAddress": "ul. Chemiczna 8d", "addressLocality": "Lublin", "postalCode": "20-329", "addressCountry": "PL" },
        "url": "https://mediabud.pl",
        "openingHours": ["Mo-Fr 07:00-16:00"],
        "priceRange": "$$",
        "areaServed": "Lublin, województwo lubelskie"
      })}} />

      {/* ═══════════════════════════════════════════════════════
          HERO — COMMAND CENTER
      ═══════════════════════════════════════════════════════ */}
      {/* ── Hero Section ── */}
      <section className="relative min-h-[58vh] md:min-h-[65vh] flex flex-col justify-center overflow-hidden" style={{ background: "#000" }}>
        {/* CSS animations */}
        <style>{`
          @keyframes hud-scan { 0%{top:0%;opacity:.7} 80%{opacity:.2} 100%{top:100%;opacity:0} }
          @keyframes hud-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
          @keyframes hud-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
          @keyframes cf-a { 0%,42%{opacity:1} 50%,92%{opacity:0} 100%{opacity:1} }
          @keyframes cf-b { 0%,42%{opacity:0} 50%,92%{opacity:1} 100%{opacity:0} }
          .hud-scan-v { position:absolute; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(248,24,40,0.5),transparent); animation:hud-scan 4s linear infinite; pointer-events:none; z-index:5; }
        `}</style>

        {/* Wideo A — Industrial Command */}
        <div className="absolute inset-0 hidden md:block" style={{ zIndex: 1, animation: "cf-a 30s linear infinite" }}>
          <video autoPlay muted loop playsInline className="w-full h-full object-cover" style={{ filter: "brightness(0.60) saturate(0.75)" }}>
            <source src="https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260609/text2video-d8k06h780j2drgd1u0r0.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Wideo B — Material Intelligence */}
        <div className="absolute inset-0 hidden md:block" style={{ zIndex: 1, animation: "cf-b 30s linear infinite" }}>
          <video autoPlay muted loop playsInline className="w-full h-full object-cover" style={{ filter: "brightness(0.60) saturate(0.75)" }}>
            <source src="https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260609/text2video-d8k06k780j2drgd1u0rg.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Mobile fallback */}
        <div className="absolute inset-0 block md:hidden" style={{ zIndex: 1, backgroundImage: "url('/images/hero-materialy_2.png')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.50)" }} />

        {/* HUD Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.055) 1px,transparent 1px)", backgroundSize: "32px 32px", zIndex: 2 }} />
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 35% 50%, transparent 25%, rgba(0,0,0,0.75) 100%)", zIndex: 2 }} />
        {/* Gradient dolny */}
        <div className="absolute bottom-0 left-0 right-0 h-52 pointer-events-none" style={{ background: "linear-gradient(to top, #050505, transparent)", zIndex: 2 }} />
        {/* Gradient lewy */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.15) 100%)", zIndex: 2 }} />

        {/* HUD border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.35) 60%,transparent)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] z-20 bg-[#f81828]" style={{ boxShadow: "2px 0 18px rgba(248,24,40,0.55)" }} />
        <div className="hud-scan-v" />

        {/* HUD corners */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none" style={{ width: 32, height: 32, borderTop: "2px solid #f81828", borderLeft: "2px solid #f81828" }} />
        <div className="absolute top-4 right-4 z-10 pointer-events-none" style={{ width: 22, height: 22, borderTop: "1px solid rgba(248,24,40,0.45)", borderRight: "1px solid rgba(248,24,40,0.45)" }} />
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none" style={{ width: 22, height: 22, borderBottom: "1px solid rgba(248,24,40,0.45)", borderLeft: "1px solid rgba(248,24,40,0.45)" }} />
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none" style={{ width: 14, height: 14, borderBottom: "1px solid rgba(248,24,40,0.2)", borderRight: "1px solid rgba(248,24,40,0.2)" }} />

        {/* GPS coords */}
        <div className="absolute bottom-6 right-8 z-10 pointer-events-none hidden lg:block" style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(248,24,40,0.45)", letterSpacing: "0.1em", lineHeight: 1.8, textAlign: "right" }}>
          <div>51.2465°N / 22.5684°E</div>
          <div>LUBLIN // PL-06</div>
          <div style={{ animation: "hud-pulse 2s ease-in-out infinite" }}>● SYS_ACTIVE</div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-6 lg:gap-10 items-start">

            {/* Left: Copy */}
            <div>
              {/* Terminal eyebrow */}
              <div className="inline-flex flex-col gap-0.5 mb-5" style={{ border: "1px solid rgba(248,24,40,0.42)", background: "rgba(248,24,40,0.05)", padding: "6px 12px" }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: "#f81828", letterSpacing: "0.2em", display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ animation: "hud-blink 1s step-end infinite" }}>&#9632;</span>
                  &#9658; SYSTEM_READY :: LUBLIN_OPERATIONAL_BASE
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(248,24,40,0.5)", letterSpacing: "0.14em" }}>
                  51.2465°N / 22.5684°E // PL-06 // AKTYWNY
                </div>
              </div>

              {/* H1 */}
              <h1 className="font-black uppercase leading-[1.0] tracking-tight mb-5" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
                <span className="block text-white" style={{ fontSize: "clamp(1.9rem, 5vw, 4.5rem)", letterSpacing: "-0.01em" }}>SKŁAD BUDOWLANY</span>
                <span className="block" style={{ fontSize: "clamp(2.3rem, 6vw, 5.5rem)", letterSpacing: "-0.02em", background: "linear-gradient(135deg,#f81828 20%,#ff6b35 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MATERIAŁY + EKIPA</span>
                <span className="block text-white/60" style={{ fontSize: "clamp(1.3rem, 3.2vw, 3rem)", fontWeight: 700, letterSpacing: "0.02em" }}>LUBLIN &amp; REGION</span>
              </h1>

              {/* Subtitle */}
              <p className="mb-7 max-w-lg leading-relaxed" style={{ color: "#777", fontFamily: "Inter,sans-serif", fontSize: "clamp(0.875rem,1.4vw,1rem)" }}>
                Jeden sprawdzony partner od materiałów po realizację. 15&nbsp;000+ produktów w magazynie i ekipa wykonawcza pod klucz.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-7">
                <Link
                  to="/produkty"
                  className="inline-flex items-center gap-2 font-black uppercase tracking-wider text-white relative overflow-hidden group"
                  style={{ background: "#f81828", fontSize: "0.8rem", letterSpacing: "0.12em", padding: "13px 26px", boxShadow: "0 10px 28px rgba(248,24,40,0.30), inset 0 1px 0 rgba(255,255,255,0.1)" }}
                >
                  <span className="relative z-10">Przeglądaj ofertę →</span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.18),transparent)" }} />
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-white"
                  style={{ border: "1px solid rgba(248,24,40,0.5)", fontSize: "0.8rem", letterSpacing: "0.12em", padding: "13px 26px", background: "rgba(248,24,40,0.05)" }}
                  onClick={() => setQuoteOpen(true)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#f81828"; e.currentTarget.style.background = "rgba(248,24,40,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(248,24,40,0.5)"; e.currentTarget.style.background = "rgba(248,24,40,0.05)"; }}
                >
                  <span style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(248,24,40,0.7)", marginRight: 3 }}>[B2B]</span>
                  Zapytaj o wycenę
                </button>
              </div>

              {/* Trust */}
              <div className="flex flex-wrap items-center gap-5">
                {["Ponad 15 900 produktów", "Bezpłatne doradztwo", "Dostawa Lublin"].map((t) => (
                  <span key={t} style={{ fontFamily: "monospace", fontSize: 9, color: "#555", letterSpacing: "0.14em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "#f81828" }}>&#9672;</span> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: STATUS PANEL */}
            <div className="hidden lg:block" style={{ paddingTop: 4 }}>
              <div style={{ background: "rgba(4,4,4,0.78)", backdropFilter: "blur(22px)", border: "1px solid rgba(248,24,40,0.2)", position: "relative" }}>
                <div style={{ position: "absolute", top: -1, left: -1, width: 18, height: 18, borderTop: "2px solid #f81828", borderLeft: "2px solid #f81828" }} />
                <div style={{ position: "absolute", bottom: -1, right: -1, width: 14, height: 14, borderBottom: "1px solid rgba(248,24,40,0.35)", borderRight: "1px solid rgba(248,24,40,0.35)" }} />
                <div style={{ borderBottom: "1px solid rgba(248,24,40,0.18)", background: "rgba(248,24,40,0.05)", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(248,24,40,0.75)", letterSpacing: "0.18em", display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ animation: "hud-blink 1.3s step-end infinite", color: "#f81828" }}>&#9632;</span> SYSTEM STATUS
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 8, color: "#f81828", animation: "hud-pulse 2s ease-in-out infinite", letterSpacing: "0.12em" }}>&#9679; ONLINE</div>
                </div>
                <div style={{ padding: "14px 16px 10px", display: "flex", flexDirection: "column", gap: 11 }}>
                  {[
                    { code: "INV", val: `${productCount.toLocaleString("pl-PL")}+`, label: "Produktów w ofercie", pct: 95 },
                    { code: "EXP", val: "15 lat", label: "Doświadczenia", pct: 75 },
                    { code: "CLI", val: "500+", label: "Firm klientów B2B", pct: 80 },
                    { code: "ETA", val: "<24h", label: "Realizacja zamówień", pct: 92 },
                  ].map((m) => (
                    <div key={m.code}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                        <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(248,24,40,0.45)", letterSpacing: "0.14em" }}>[{m.code}] {m.label}</div>
                        <div style={{ fontFamily: "monospace", fontSize: 14, color: "#f81828", fontWeight: 900, textShadow: "0 0 10px rgba(248,24,40,0.65)" }}>{m.val}</div>
                      </div>
                      <div style={{ height: 1.5, background: "rgba(248,24,40,0.09)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${m.pct}%`, background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.25))", boxShadow: "0 0 4px rgba(248,24,40,0.5)" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(248,24,40,0.1)", padding: "10px 16px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(248,24,40,0.38)", letterSpacing: "0.12em", marginBottom: 6 }}>// AKTYWNE USŁUGI</div>
                  {["Ocieplenia & elewacje", "Dachy", "Wykończenia pod klucz", "Deweloperzy B2B"].map((s) => (
                    <div key={s} style={{ fontFamily: "monospace", fontSize: 8, color: "#4a4a4a", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ color: "#f81828", fontSize: 6 }}>&#9685;</span> {s.toUpperCase()}
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(248,24,40,0.08)", padding: "7px 16px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(248,24,40,0.28)", letterSpacing: "0.1em" }}>51.2465°N / 22.5684°E // LUBLIN // PL-06</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ StatBar — SYSTEM DATA TERMINAL ═══ */}
      <div
        ref={r3.ref as React.RefObject<HTMLDivElement>}
        className="relative overflow-hidden"
        style={{ background: "#050505", borderTop: "2px solid #f81828", borderBottom: "1px solid rgba(248,24,40,0.15)" }}
      >
        {/* BG grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(248,24,40,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.025) 1px,transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
        {/* red glow top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to bottom,rgba(248,24,40,0.08),transparent)", pointerEvents: "none" }} />

        {/* ─── Terminal header bar ─── */}
        <div style={{ borderBottom: "1px solid rgba(248,24,40,0.2)", background: "rgba(248,24,40,0.04)", padding: "6px 0" }}>
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(248,24,40,0.7)", letterSpacing: "0.15em", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#f81828" }}>▶</span>
              <span>SYS_STATUS</span>
              <span style={{ color: "rgba(248,24,40,0.3)" }}>::</span>
              <span>MEDIA_BUD_LUBLIN</span>
              <span style={{ color: "rgba(248,24,40,0.3)" }}>::</span>
              <span style={{ color: "#f81828", animation: "hud-pulse 2s ease-in-out infinite" }}>● ONLINE</span>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(248,24,40,0.3)", letterSpacing: "0.1em", display: "flex", gap: 12 }}>
              <span>VER 2025.06</span>
              <span style={{ color: "rgba(248,24,40,0.15)" }}>|</span>
              <span>LUBLIN // PL</span>
            </div>
          </div>
        </div>

        {/* ─── Stats grid ─── */}
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { code: "INV_COUNT", num: `${productCount.toLocaleString("pl-PL").replace(/\s/g, "\u00a0")}+`, label: "Produktów w ofercie", bar: 95 },
              { code: "EXP_YEARS", num: "15 lat",  label: "Doświadczenia",        bar: 75 },
              { code: "CLI_TOTAL", num: "500+",    label: "Firm klientów",         bar: 80 },
              { code: "ETA_HOURS", num: "<24h",    label: "Czas realizacji",       bar: 90 },
            ].map((s, i) => (
              <div
                key={i}
                className={`relative group cursor-default transition-all duration-300 hover:bg-[#f81828]/[0.04]
                  ${i % 2 === 0 ? "border-r border-[#f81828]/10" : "border-r-0 md:border-r md:border-[#f81828]/10"}
                  ${i >= 2 ? "border-t border-[#f81828]/10 md:border-t-0" : ""}
                  ${i === 3 ? "md:border-r-0" : ""}`}
                style={{ padding: "20px 24px 18px 20px" }}
              >
                {/* left red accent bar */}
                <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 2, background: "linear-gradient(to bottom,transparent,#f81828,transparent)", opacity: 0.6 }} />

                {/* top-left corner bracket */}
                <div style={{ position: "absolute", top: 8, left: 8, width: 12, height: 12, borderTop: "1px solid rgba(248,24,40,0.6)", borderLeft: "1px solid rgba(248,24,40,0.6)" }} />
                {/* bottom-right corner bracket */}
                <div style={{ position: "absolute", bottom: 8, right: 8, width: 8, height: 8, borderBottom: "1px solid rgba(248,24,40,0.25)", borderRight: "1px solid rgba(248,24,40,0.25)" }} />

                {/* code identifier */}
                <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(248,24,40,0.45)", letterSpacing: "0.2em", marginBottom: 6 }}>
                  {`// ${s.code}`}
                </div>

                {/* big number */}
                <div
                  className="font-black leading-none mb-1"
                  style={{
                    fontFamily: "'Share Tech Mono',monospace",
                    fontSize: "clamp(28px,3.5vw,44px)",
                    color: "#f81828",
                    textShadow: "0 0 20px rgba(248,24,40,0.8), 0 0 40px rgba(248,24,40,0.3), 0 0 60px rgba(248,24,40,0.1)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.num}
                </div>

                {/* label */}
                <div style={{ fontFamily: "monospace", fontSize: 9, color: "#555", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                  {s.label}
                </div>

                {/* progress bar */}
                <div style={{ height: 2, background: "rgba(248,24,40,0.1)", borderRadius: 1, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${s.bar}%`,
                      background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.4))",
                      boxShadow: "0 0 6px rgba(248,24,40,0.6)",
                      borderRadius: 1,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom status bar */}
        <div style={{ borderTop: "1px solid rgba(248,24,40,0.08)", padding: "5px 0" }}>
          <div className="container mx-auto px-4 flex items-center gap-6">
            {["MAGAZYN: AKTYWNY", "DOSTAWA: LUBLIN + REGION", "DORADZTWO: GRATIS"].map((t, i) => (
              <div key={i} style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(248,24,40,0.35)", letterSpacing: "0.12em", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: "rgba(248,24,40,0.5)" }}>●</span> {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BRANDS BAR
      ═══════════════════════════════════════════════════════ */}
      {/* ── Nasi producenci — Brand Logo Scroller ── */}
      <section
        ref={r7.ref as React.RefObject<HTMLElement>}
        className="py-10 overflow-hidden relative"
        style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}
      >
        {/* górna linia akcentu */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,transparent,#f81828 30%,rgba(248,24,40,0.3) 70%,transparent)" }} />

        <div className="container mx-auto px-4 mb-6 flex items-center gap-4">
          <span className="w-[3px] h-5 rounded-full bg-[#f81828]" style={{ boxShadow: "0 0 8px rgba(248,24,40,0.6)" }} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Nasi producenci
          </p>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(248,24,40,0.25),transparent)" }} />
        </div>

        <div className="relative overflow-hidden">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />

          <style>{`
            @keyframes brand-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .brand-track { animation: brand-scroll 28s linear infinite; }
            .brand-track:hover { animation-play-state: paused; }
            .brand-card { transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; }
            .brand-card:hover { border-color: rgba(248,24,40,0.6) !important; box-shadow: 0 4px 20px rgba(248,24,40,0.18); transform: translateY(-2px); }
            .brand-card img { opacity: 1; transition: opacity 0.3s; }
            .brand-card:hover img { opacity: 0.85; }
          `}</style>

          <div className="brand-track flex items-center gap-8 whitespace-nowrap" style={{ width: "max-content" }}>
            {[...brandLogos, ...brandLogos].map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="inline-flex items-center justify-center flex-shrink-0">
                <div
                  className="brand-card flex items-center justify-center"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "10px",
                    padding: "14px 24px",
                    minWidth: "130px",
                    minHeight: "64px",
                  }}
                >
                  <img
                    src={brand.url}
                    alt={brand.name}
                    loading="lazy"
                    className="h-9 w-auto object-contain"
                    style={{ maxWidth: "120px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CATEGORIES GRID — Industrial Pulse
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r1.ref as React.RefObject<HTMLElement>}
        className="py-16"
        style={{ background: "#050505", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}
      >
        <style>{`
          @keyframes cat-scan { 0%{top:0%;opacity:.75} 75%{opacity:.35} 100%{top:100%;opacity:0} }
          .cat-card:hover .cat-scan-line { animation: cat-scan 0.9s ease-in forwards; }
          .cat-card img { filter: brightness(0.38) saturate(0.5); transition: filter 0.5s; }
          .cat-card:hover img { filter: brightness(0.55) saturate(0.85); }
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
              <p className="text-sm mt-2" style={{ color: "#999999" }}>
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
                  className={`cat-card group relative overflow-hidden rounded-xl ${isWide ? "col-span-2 aspect-[21/6] lg:aspect-[21/5]" : "col-span-1 aspect-[4/3] lg:aspect-[4/3]"}`}
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
                          style={{ background: "#1e0304", border: "1px solid rgba(248,24,40,0.35)", color: "#ff9aa3" }}
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

      {/* JSON-LD – ItemList dla sekcji featured/bestsellery */}
      {activeTab === "bestsellery" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Bestsellery budowlane 2025 – Media Bud Lublin",
            "description": "Najchętniej wybierane materiały budowlane w Lublinie: izolacje, kleje, tynki, farby, cement.",
            "url": "https://mediabud.pl/#bestsellery",
            "numberOfItems": BESTSELLER_SLUGS.length,
            "itemListElement": BESTSELLER_SLUGS.map((slug, idx) => {
              const p = allStaticProducts.find(x => x.slug === slug);
              return {
                "@type": "ListItem",
                "position": idx + 1,
                "url": `https://mediabud.pl/produkty/${slug}`,
                ...(p ? {
                  "name": p.name,
                  "item": {
                    "@type": "Product",
                    "name": p.name,
                    "url": `https://mediabud.pl/produkty/${slug}`,
                    "brand": { "@type": "Brand", "name": p.brand },
                    "offers": {
                      "@type": "Offer",
                      "availability": "https://schema.org/InStock",
                      "priceCurrency": "PLN",
                    },
                  },
                } : {}),
              };
            }),
          }) }}
        />
      )}

      {/* ═══════════════════════════════════════════════════════
          FEATURED PRODUCTS  (z tabami)
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r2.ref as React.RefObject<HTMLElement>}
        className="py-14"
        style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="container mx-auto px-4">
          {/* Header + tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#f81828]" />Oferta
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-white">
                {activeTab === "bestsellery"
                  ? "Bestsellery budowlane 2025"
                  : activeTab === "nowosci"
                  ? "Nowości w ofercie"
                  : "Katalog produktów"}
              </h2>
              <p className="text-gray-400 mt-1 text-sm">
                {activeTab === "bestsellery"
                  ? "Najchętniej wybierane materiały budowlane w Lublinie"
                  : activeTab === "nowosci"
                  ? "Najnowsze produkty w naszej ofercie"
                  : "Bestsellery i nowości w naszej ofercie"}
              </p>
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
                className={`transition-[opacity,transform] duration-500 ${r2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms`, willChange: r2.visible ? "auto" : "transform, opacity" }}
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
          WHY MEDIABUD
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r4.ref as React.RefObject<HTMLElement>}
        className="py-20 relative overflow-hidden"
        style={{ background: "#050505" }}
      >
        {/* ── Video background ── */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.22 }}
          src="https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260608/text2video-d8ji72v80j2drgd1t2kg.mp4"
        />
        {/* ── Dark gradient overlay ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,rgba(5,5,5,0.80) 0%,rgba(5,5,5,0.55) 50%,rgba(5,5,5,0.85) 100%)" }} />
        {/* ── Scanline texture ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)", zIndex: 1 }} />
        {/* ── Corner accent lines ── */}
        <div className="absolute top-0 left-0 w-32 h-px pointer-events-none" style={{ background: "linear-gradient(to right,#f81828,transparent)", zIndex: 2, opacity: 0.7 }} />
        <div className="absolute top-0 right-0 w-32 h-px pointer-events-none" style={{ background: "linear-gradient(to left,#f81828,transparent)", zIndex: 2, opacity: 0.7 }} />
        <div className="absolute bottom-0 left-0 w-32 h-px pointer-events-none" style={{ background: "linear-gradient(to right,#f81828,transparent)", zIndex: 2, opacity: 0.4 }} />
        <div className="absolute bottom-0 right-0 w-32 h-px pointer-events-none" style={{ background: "linear-gradient(to left,#f81828,transparent)", zIndex: 2, opacity: 0.4 }} />

        <div className="container mx-auto px-4 relative" style={{ zIndex: 3 }}>
          {/* ── Header ── */}
          <div className="mb-12">
            <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />DLACZEGO MY?
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Dlaczego <span className="text-[#f81828]">Media Bud</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
              Łączymy profesjonalną wiedzę techniczną z indywidualnym podejściem — zarówno dla deweloperów, jak i klientów budujących własny dom.
            </p>
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.Icon;
              return (
                <div
                  key={i}
                  className={`group relative rounded-lg p-6 transition-all duration-300 cursor-default ${r4.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transitionDelay: `${Math.min(i * 80, 320)}ms`,
                    willChange: r4.visible ? "auto" : "transform, opacity",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(248,24,40,0.45)";
                    el.style.boxShadow = "0 0 32px rgba(248,24,40,0.16), inset 0 0 24px rgba(248,24,40,0.04)";
                    el.style.background = "rgba(248,24,40,0.06)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.boxShadow = "none";
                    el.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  {/* Numer porządkowy */}
                  <span className="absolute top-4 right-5 text-[10px] font-mono tracking-widest" style={{ color: "rgba(248,24,40,0.4)" }}>{f.code}</span>
                  {/* Narożny akcent – pojawia się na hover */}
                  <div className="absolute top-0 left-0 w-8 h-px bg-[#f81828] opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute top-0 left-0 w-px h-8 bg-[#f81828] opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                  {/* Ikona */}
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(248,24,40,0.10)", border: "1px solid rgba(248,24,40,0.22)" }}
                  >
                    <Icon className="w-5 h-5 text-[#f81828]" />
                  </div>
                  <h3 className="font-display font-black text-white mb-2 text-base group-hover:text-[#f81828] transition-colors duration-200">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-200">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          REALIZACJE
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r9.ref as React.RefObject<HTMLElement>}
        className="py-16"
        style={{ background: "#050505", borderTop: "2px solid #1a1a1a", borderBottom: "2px solid #1a1a1a" }}
      >
        <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Doświadczenie
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">Nasze realizacje</h2>
            <p className="text-gray-400 mt-1 text-sm">Wybrane projekty, przy których dostarczyliśmy materiały</p>
          </div>
          <Link to="/realizacje" className="hidden md:flex items-center gap-1 text-sm font-bold text-[#f81828] hover:underline">
            Wszystkie realizacje <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {realizacje.map((r, i) => {
            const Icon = r.icon;
            return (
              <article
                key={i}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${r9.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  background: "linear-gradient(180deg, rgba(15,15,15,0.98), rgba(6,6,6,0.98))",
                  borderColor: "rgba(255,255,255,0.08)",
                  boxShadow: "0 18px 42px rgba(0,0,0,0.28)",
                }}
              >
                <div className="relative h-48 overflow-hidden border-b border-white/10">
                  <img
                    src={r.image}
                    alt={r.projectName}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.62) saturate(0.82)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #f81828, #ff6b6b, #f81828, transparent)", boxShadow: "0 0 14px rgba(248,24,40,0.45)" }} />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#f81828]/30 bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#f4b3b8] backdrop-blur-sm">
                    <Icon className="h-3.5 w-3.5 text-[#f81828]" /> Realizacja
                  </div>
                  <div className="absolute right-4 top-4 rounded-full border border-[#f81828]/35 bg-[#120607]/90 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#f81828]">
                    {r.year}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#f81828]">Projekt</div>
                    <h3 className="font-display text-2xl font-black leading-tight text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]">{r.projectName}</h3>
                  </div>
                </div>

                <div className="space-y-5 p-5">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-[#f4f4f4]">{r.title}</div>
                    <div className="text-xs font-medium uppercase tracking-[0.14em] text-gray-400">{r.client}</div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#f81828]">
                      <span className="text-base">🔧</span>
                      Zakres prac
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">{r.scope}</p>
                  </div>

                  {r.value && (
                  <div className="rounded-2xl border border-[#f81828]/25 bg-[#f81828]/[0.07] p-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f4b3b8]">Wartość zamówień</div>
                    <div className="mt-1 font-display text-3xl font-black text-[#f81828]" style={{ textShadow: "0 0 14px rgba(248,24,40,0.22)" }}>{r.value}</div>
                  </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {r.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r8.ref as React.RefObject<HTMLElement>}
        className="py-20"
        style={{ background: "#080808", borderTop: "2px solid rgba(248,24,40,0.15)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Opinie klientów<span className="w-4 h-0.5 bg-[#f81828]" />
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-2">Co mówią nasi klienci?</h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">Zaufali nam dewelopierzy, architekci i tysiące prywatnych inwestorów z regionu lubelskiego.</p>
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
                    <div className="text-xs text-gray-400">{t.role} · {t.company}</div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dom od podstaw ── */}
      <section id="dom-od-podstaw" className="py-14 md:py-20 relative overflow-hidden" style={{ background: "#000" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(248,24,40,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative z-10 container mx-auto px-4">

          {/* ── Nagłówek ── */}
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-[#f81828] mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />PROGRAM SPECJALNY
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Dom od <span className="text-[#f81828]">Podstaw</span>
            </h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
              Kompleksowe wsparcie dla tych, którzy budują dom po raz pierwszy. Od projektu do odbioru — jeden opiekun, jeden kosztorys, zero chaosu.
            </p>
          </div>

          {/* ── Wideo + Etapy ── */}
          <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-8 mb-12">
            {/* Wideo */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(248,24,40,0.22)", boxShadow: "0 24px 60px rgba(0,0,0,0.55)" }}>
              <video
                src="https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260608/text2video-d8jir6n80j2drgd1t400.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full aspect-video"
                style={{ display: "block", background: "#050505" }}
              />
            </div>

            {/* Etapy programu */}
            <div className="flex flex-col justify-center space-y-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-1 flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#f81828]" />5 etapów realizacji
              </p>
              {[
                { num: "01", title: "Projekt i pozwolenie",  desc: "Analizujemy projekt, dobieramy materiały, pomagamy w formalnościach." },
                { num: "02", title: "Stan surowy",           desc: "Fundamenty, ściany, strop, dach — własna ekipa i materiały z magazynu." },
                { num: "03", title: "Instalacje",            desc: "Elektryka, wod-kan, ogrzewanie — zaplanowane i wykonane razem." },
                { num: "04", title: "Wykończenia",           desc: "Tynki, podłogi, łazienki, kuchnia — jeden kosztorys, jeden wykonawca." },
                { num: "05", title: "Odbiór i klucze",       desc: "Odbierasz gotowy dom z dokumentacją. Jeden telefon był początkiem." },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <span className="text-lg font-mono font-black flex-shrink-0 w-9 transition-colors duration-200" style={{ color: "rgba(248,24,40,0.45)" }}>{step.num}</span>
                  <div className="border-l border-[#2a2a2a] pl-4 group-hover:border-[#f81828]/30 transition-colors duration-200">
                    <h3 className="font-black text-white text-sm mb-0.5">{step.title}</h3>
                    <p className="text-xs text-[#777] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Slogan ── */}
          <div className="text-center py-8 mb-8" style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
            <p className="font-display text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Jeden opiekun. Jeden dom.
            </p>
            <p className="font-display text-2xl md:text-4xl font-black tracking-tight leading-tight mt-1" style={{ color: "#f81828" }}>
              Od fundamentów do kluczy.
            </p>
          </div>

          {/* ── CTA ── */}
          <div className="text-center">
            <Link to="/uslugi/dom-od-podstaw"
              className="inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-wider text-white rounded-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
              style={{ background: "#f81828", fontSize: "0.875rem", letterSpacing: "0.1em", boxShadow: "0 16px 36px rgba(248,24,40,0.22)" }}
            >
              Zapytaj o wycenę <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── Grafiki — skład i budowa ── */}
      <section className="py-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <img src="/images/section-warehouse_2_2.png" alt="Skład budowlany Media Bud — asortyment materiałów" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)" }} />
            <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: "#f81828", boxShadow: "2px 0 10px rgba(248,24,40,0.5)" }} />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: "#f81828" }}>— ASORTYMENT —</p>
              <h3 className="font-display text-xl md:text-2xl font-black text-white leading-tight">15 000+ produktów<br/>w jednym miejscu</h3>
            </div>
          </div>
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <img src="/images/section-construction_2_2.png" alt="Realizacje budowlane Media Bud — Lublin i region" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-[3px]" style={{ background: "#f81828", boxShadow: "-2px 0 10px rgba(248,24,40,0.5)" }} />
            <div className="absolute inset-0 flex flex-col justify-end p-8 items-end text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: "#f81828" }}>— REALIZACJE —</p>
              <h3 className="font-display text-xl md:text-2xl font-black text-white leading-tight">Lublin i województwo<br/>lubelskie</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Jak działamy ── */}
      <section className="py-14 md:py-24" style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }}>
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
          <p className="text-center max-w-xl mx-auto mb-8 md:mb-16 leading-relaxed" style={{ color: "#888" }}>
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
                  aria-hidden="true"
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
      <section className="py-14 md:py-24 relative overflow-hidden" style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }}>
        {/* Video tło sekcji usług */}
        <video autoPlay muted loop playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden md:block"
          style={{ opacity: 0.12, zIndex: 0 }} aria-hidden="true">
          <source src="https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260529/text2video-d8d2bs780j2drgd1i7q0.mp4" type="video/mp4" />
        </video>
        <div className="relative" style={{ zIndex: 1 }}>
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

          <div className="rounded-2xl p-6 md:p-7 mb-8" style={{ background: "#0f0f0f", border: "1px solid #2d2d2d", boxShadow: "0 16px 40px rgba(0,0,0,0.28)" }}>
            <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase text-white leading-[0.95] break-words mb-3" style={{ overflowWrap: "anywhere" }}>
              Galerie, szkoły i obiekty użytkowe
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
              Realizujemy remonty i modernizacje dla firm oraz instytucji — usługi dekarskie i elewacyjne obsługują zarówno inwestycje prywatne, jak i obiektowe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {serviceCards.map((service, i) => {
              return (
                <Link
                  key={`${service.title}-${i}`}
                  to={service.href}
                  className="group rounded-2xl p-6 flex flex-col transition-all duration-300"
                  style={{ background: "#0f0f0f", border: "1px solid #2d2d2d", boxShadow: "0 16px 40px rgba(0,0,0,0.24)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 18px 42px rgba(0,0,0,0.38), 0 0 20px rgba(248,24,40,0.12)"; el.style.borderColor = "rgba(248,24,40,0.42)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.24)"; el.style.borderColor = "#2d2d2d"; }}
                >
                  <div className="flex items-center justify-end gap-4 mb-5">
                    <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "#888" }}>{service.tag}</span>
                  </div>
                  <h3 className="font-display font-black uppercase text-white mb-3 leading-[1] break-words" style={{ fontSize: "clamp(1.25rem,2.4vw,2rem)", overflowWrap: "anywhere" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#888" }}>{service.desc}</p>
                  <div className="mt-5 pt-5 border-t border-[#1f1f1f] flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "#888" }}>{service.href === "#dom-od-podstaw" ? "sekcja programu" : "podstrona usługi"}</span>
                    <span className="text-xs font-black uppercase tracking-[0.22em] inline-flex items-center gap-2" style={{ color: "#f81828" }}>
                      Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
              </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NEWSLETTER STRIP
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r10.ref as React.RefObject<HTMLElement>}
        className="bg-[#0a0a0a] py-12 relative overflow-hidden"
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
        className="container mx-auto px-4 py-14"
        style={{ background: "#080808" }}
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Wiedza
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">Blog techniczny</h2>
            <p className="text-gray-400 mt-1 text-sm">Ekspercka wiedza dla budowniczych i inwestorów</p>
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
                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{post.excerpt}</p>
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
            filter: "brightness(0.38) saturate(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f81828]/90 via-[#c8000f]/80 to-[#0a0a0a]/90" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative container mx-auto px-4 py-20 text-center">
          <p className="text-xs font-black tracking-widest uppercase text-red-200 mb-3 flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 bg-red-200" />— SKONTAKTUJ SIĘ —<span className="w-4 h-0.5 bg-red-200" />
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Gotowy na współpracę?
          </h2>
          <p className="text-red-100 mb-9 max-w-xl mx-auto text-base leading-relaxed">
            Skontaktuj się z nami — bezpłatna wycena i profesjonalne doradztwo techniczne.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+48533553344">
              <Button size="lg" className="bg-white text-[#f81828] hover:bg-gray-100 font-black px-10 w-full sm:w-auto text-base h-12 shadow-2xl hover:shadow-white/20 transition-all">
                <Phone className="w-4 h-4 mr-2" /> +48 533 553 344
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
