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
import { useSEO } from "@/hooks/useSEO";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { IconTarget, IconStack, IconRoute, IconGem, IconShield, IconNetwork, IconPrecision, IconChain, IconLogistics, IconPartnership } from "@/components/FuturisticIcons";

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
function CountUp({ to, suffix = "", prefix = "", duration = 1800, neon = false }: { to: number; suffix?: string; prefix?: string; duration?: number; neon?: boolean }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal(0.25);
  const started = useRef(false);
  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setVal(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, to, duration]);
  const formatted = val >= 1000 ? val.toLocaleString("pl-PL") : String(val);
  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className="stat-number font-black font-display"
      style={neon ? {
        color: "#f81828",
        textShadow: "0 0 18px rgba(248,24,40,0.75), 0 0 38px rgba(248,24,40,0.45), 0 0 60px rgba(248,24,40,0.22)",
        fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif",
        letterSpacing: "-0.045em",
        fontSize: "clamp(2.4rem,3.6vw,3.8rem)",
        lineHeight: 0.9,
      } : {
        color: "#ffffff",
        fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif",
        fontSize: "clamp(2.4rem,3.6vw,3.8rem)",
        lineHeight: 0.9,
        letterSpacing: "-0.045em",
      }}
    >
      {prefix}{formatted}{suffix}
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
  { Icon: IconTarget,  code: "01", title: "Doradztwo gratis",       desc: "Nie wiesz jakich materiałów potrzebujesz? Nasi eksperci dobiorą system i policzą ilości — bez opłat i zobowiązań." },
  { Icon: IconStack,   code: "02", title: "Od materiałów po klucze", desc: "Możesz kupić same materiały albo zamówić kompleksową usługę. Wszystko u jednego partnera, bez szukania ekip po całym mieście." },
  { Icon: IconRoute,   code: "03", title: "Dostawa na plac budowy",  desc: "Dowozimy materiały na teren Lublina i całego woj. lubelskiego. Prosto na budowę, we wskazanym terminie." },
  { Icon: IconGem,     code: "04", title: "Tylko renomowane marki",  desc: "Weber, Ceresit, Atlas, Knauf, Rockwool, Swisspor — oryginalne produkty renomowanych marek, bez podróbek." },
  { Icon: IconShield,  code: "05", title: "Certyfikaty i atesty",    desc: "Każdy produkt posiada pełną dokumentację techniczną, deklaracje właściwości użytkowych i certyfikaty zgodności." },
  { Icon: IconNetwork, code: "06", title: "Deweloperzy i firmy B2B", desc: "Indywidualne ceny, dedykowany opiekun, faktury zbiorcze i rabaty dla firm budowlanych oraz deweloperów." },
];

const serviceCards = [
  { segment: "B2C", tag: "PROGRAM", title: "Dom od podstaw", desc: "Budujesz pierwszy dom? Jeden opiekun, jeden kosztorys, zero koordynowania wielu firm. Od projektu po klucze.", href: "/uslugi/dom-od-podstaw" },
  { segment: "B2B", tag: "DEWELOPERZY", title: "Współpraca z deweloperami", desc: "Realizujesz osiedle lub inwestycję wielorodzinną? Jeden partner — materiały i wykonawstwo w jednym kontrakcie.", href: "/uslugi/kompleksowa-wspolpraca-z-deweloperami" },
  { segment: "Oba", tag: "DACHY", title: "Dachy", desc: "Nowy dach lub przeciek? Własna ekipa dekarska, szybka diagnoza i naprawa. Dachówka, blacha, papa.", href: "/uslugi/dachy" },
  { segment: "Oba", tag: "ELEWACJE", title: "Elewacje", desc: "Ocieplamy i wykańczamy dom w jednym projekcie. Tynk, klinkier lub elewacja wentylowana. Efekt na 20 lat.", href: "/uslugi/elewacje" },
  { segment: "B2B", tag: "FIRMY", title: "Remonty dla firm", desc: "Remont sklepu, biura lub hali w nocy i w weekendy. Twoja firma działa normalnie, my remontujemy w tle.", href: "/uslugi/galerie-obiekty" },
  { segment: "B2B", tag: "B2B", title: "Galerie i obiekty", desc: "Modernizacje galerii, szkół i instytucji — w nocy i w weekendy, bez zakłócania działalności.", href: "/uslugi/galerie-obiekty" },
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

  /* ── SEO meta tagi ── */
  useSEO({
    title: "Skład Budowlany Lublin – Materiały Budowlane, Dostawa 24h | Media Bud",
    description: "Media Bud – profesjonalny skład budowlany w Lublinie (ul. Chemiczna 8d). Ponad 15 000 materiałów: tynki, styropian, wełna, chemia budowlana, dachy. Dostawa na teren woj. lubelskiego. Bezpłatna wycena.",
    canonical: "/",
  });

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
          HERO — INDUSTRIAL PREMIUM / EDITORIAL LUXURY
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[76vh] md:min-h-[88vh] overflow-hidden" style={{ background: "#050505" }}>
        <style>{`
          @keyframes premiumFloat {
            0%,100% { transform: translate3d(0,0,0) scale(1); }
            50% { transform: translate3d(0,-10px,0) scale(1.01); }
          }
          @keyframes premiumShimmer {
            0% { transform: translateX(-130%); opacity: 0; }
            18% { opacity: .28; }
            55% { opacity: .18; }
            100% { transform: translateX(130%); opacity: 0; }
          }
          @keyframes premiumFadeUp {
            from { opacity: 0; transform: translate3d(0, 18px, 0); filter: blur(10px); }
            to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
          }
          @keyframes premiumLineReveal {
            from { transform: scaleX(0.15); opacity: 0; }
            to { transform: scaleX(1); opacity: 1; }
          }
          @keyframes premiumFadeSoft {
            from { opacity: 0; transform: translate3d(0, 26px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }
          @keyframes premiumWordLift {
            from { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(12px); }
            to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
          }
          @keyframes premiumSectionRise {
            from { opacity: 0; transform: translate3d(0, 42px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }
          .premium-fade-up {
            opacity: 0;
            animation: premiumFadeUp 0.9s cubic-bezier(.22,1,.36,1) forwards;
          }
          .premium-fade-soft {
            opacity: 0;
            animation: premiumFadeSoft 1.05s cubic-bezier(.22,1,.36,1) forwards;
          }
          .premium-editorial-word {
            opacity: 0;
            display: inline-block;
            animation: premiumWordLift 1s cubic-bezier(.22,1,.36,1) forwards;
          }
          .premium-section-rise {
            opacity: 0;
            animation: premiumSectionRise 1.05s cubic-bezier(.22,1,.36,1) forwards;
          }
          .premium-hero-video {
            transform-origin: center center;
            animation: premiumFloat 18s ease-in-out infinite;
            will-change: transform;
          }
          .premium-shimmer::after {
            content: "";
            position: absolute;
            inset: -1px;
            background: linear-gradient(110deg, transparent 0%, transparent 38%, rgba(255,255,255,0.16) 49%, transparent 58%, transparent 100%);
            transform: translateX(-130%);
            pointer-events: none;
          }
          .premium-shimmer:hover::after {
            animation: premiumShimmer 1.45s cubic-bezier(.22,1,.36,1) 1;
          }
          .premium-line-reveal {
            transform-origin: left center;
            animation: premiumLineReveal 0.95s cubic-bezier(.22,1,.36,1) forwards;
          }
          .premium-card-soft {
            transition: transform 420ms cubic-bezier(.22,1,.36,1), box-shadow 420ms cubic-bezier(.22,1,.36,1), border-color 420ms cubic-bezier(.22,1,.36,1), background 420ms cubic-bezier(.22,1,.36,1);
          }
          .premium-card-soft:hover {
            transform: translate3d(0,-4px,0);
          }
          .premium-stat-value {
            transition: transform 360ms cubic-bezier(.22,1,.36,1), text-shadow 360ms cubic-bezier(.22,1,.36,1), color 360ms cubic-bezier(.22,1,.36,1);
          }
          .premium-stat-card:hover .premium-stat-value {
            transform: translate3d(0,-2px,0);
            text-shadow: 0 0 24px rgba(248,24,40,0.18);
          }
          .premium-editorial-rule {
            position: relative;
          }
          .premium-editorial-rule::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            width: 64px;
            height: 1px;
            background: linear-gradient(90deg, rgba(248,24,40,0.75), rgba(248,24,40,0));
            transform: translateY(-50%);
          }
          .premium-editorial-rule span {
            display: inline-block;
            padding-left: 84px;
          }
          @media (prefers-reduced-motion: reduce) {
            .premium-fade-up,
            .premium-fade-soft,
            .premium-editorial-word,
            .premium-section-rise,
            .premium-hero-video,
            .premium-shimmer:hover::after,
            .premium-line-reveal,
            .premium-card-soft,
            .premium-stat-value {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>
        <div className="absolute inset-0 hidden md:block" style={{ zIndex: 1 }}>
          <video autoPlay muted loop playsInline className="w-full h-full object-cover premium-hero-video" style={{ filter: "brightness(0.44) saturate(0.78) contrast(1.1)" }}>
            <source src="https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260609/text2video-d8k2ve780j2drgd1u7pg.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          className="absolute inset-0 block md:hidden"
          style={{
            zIndex: 1,
            backgroundImage: "url('/images/hero-materialy_2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4) saturate(0.8)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(94deg, rgba(5,5,5,0.93) 0%, rgba(5,5,5,0.84) 26%, rgba(5,5,5,0.52) 56%, rgba(5,5,5,0.80) 100%)", zIndex: 2 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 42%, rgba(248,24,40,0.13), transparent 42%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.07), transparent 28%), radial-gradient(circle at 70% 55%, rgba(255,255,255,0.05), transparent 22%)", zIndex: 2 }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20 premium-line-reveal" style={{ background: "linear-gradient(90deg, #f81828 0%, rgba(248,24,40,0.22) 28%, rgba(255,255,255,0.08) 62%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to top, #050505, transparent)", zIndex: 2 }} />

        <div className="relative z-10 container mx-auto px-4 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_360px] gap-12 xl:gap-16 items-end">
            <div className="max-w-[980px]">
              <div className="premium-fade-soft premium-editorial-rule mb-8 flex items-center gap-3" style={{ animationDelay: "40ms" }}>
                <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#f81828", boxShadow: "0 0 12px rgba(248,24,40,0.8)" }} />
                <span style={{ fontFamily: "Inter,sans-serif", fontSize: "11px", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)", fontWeight: 800 }}>
                  Lublin · skład budowlany &amp; wykonawstwo
                </span>
              </div>

              <div className="mb-10 max-w-4xl">
                <div className="premium-fade-soft mb-6 text-[11px] font-black uppercase tracking-[0.34em] text-[#f3b0b5]" style={{ animationDelay: "120ms" }}>Materiały budowlane najwyższej jakości · Lublin</div>
                <h1 className="text-white mb-7" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.045em", fontSize: "clamp(3rem, 6.6vw, 6.8rem)" }}>
                  <span className="block overflow-hidden">
                    <span className="premium-editorial-word" style={{ animationDelay: "180ms" }}>Budujesz.</span>
                  </span>
                  <span className="block overflow-hidden mt-1">
                    <span className="premium-editorial-word" style={{ animationDelay: "260ms" }}>Remontujesz.</span>
                  </span>
                  <span className="block overflow-hidden mt-1">
                    <span className="premium-editorial-word" style={{ animationDelay: "340ms", background: "linear-gradient(135deg,#ffffff 0%, #ffd7db 32%, #f81828 88%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Wszystko</span>
                    <span className="premium-editorial-word ml-[0.18em]" style={{ animationDelay: "420ms" }}>w jednym</span>
                  </span>
                  <span className="block overflow-hidden mt-1">
                    <span className="premium-editorial-word" style={{ animationDelay: "500ms" }}>miejscu.</span>
                  </span>
                </h1>
                <p className="premium-fade-soft max-w-2xl" style={{ animationDelay: "660ms", color: "rgba(255,255,255,0.78)", fontFamily: "Inter,sans-serif", fontSize: "clamp(1.02rem, 1.36vw, 1.18rem)", lineHeight: 1.92 }}>
                  Znajdziesz u nas wszystko, czego potrzebujesz do budowy i remontu — tynki, systemy ociepleń, styropiany, wełnę i akcesoria od <span className="text-white font-semibold">renomowanych producentów</span>. Sprawdzona trwałość, efektywność energetyczna i terminowa dostawa, a nasi specjaliści pomogą dobrać rozwiązania do Twoich potrzeb.
                </p>
              </div>

              <div className="premium-fade-soft flex flex-wrap gap-4 mb-12" style={{ animationDelay: "760ms" }}>
                <Link
                  to="/produkty"
                  className="premium-shimmer relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-[0.16em] text-white rounded-full transition-all duration-500 hover:-translate-y-[2px]"
                  style={{ background: "linear-gradient(135deg, #f81828 0%, #d10f1e 100%)", boxShadow: "0 16px 40px rgba(248,24,40,0.30)", fontSize: "0.82rem" }}
                >
                  <span className="relative z-10">Zobacz ofertę</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                </Link>
                <button
                  type="button"
                  className="premium-shimmer relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-[0.16em] rounded-full transition-all duration-500 text-white hover:-translate-y-[2px]"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.05)", fontSize: "0.82rem", backdropFilter: "blur(10px)" }}
                  onClick={() => setQuoteOpen(true)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(248,24,40,0.55)"; e.currentTarget.style.background = "rgba(248,24,40,0.10)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(248,24,40,0.10)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <span className="relative z-10">Bezpłatna wycena</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 max-w-4xl">
                {[
                  { over: "Obsługa inwestycji", title: "Materiały i wykonanie", text: "Zakup, logistyka i ekipa pod jednym dachem — mniej ryzyka organizacyjnego na budowie." },
                  { over: "Doradztwo techniczne", title: "Dobór systemów", text: "Dobieramy sprawdzone rozwiązania do budżetu, zakresu prac i realnych terminów." },
                  { over: "B2B i klienci prywatni", title: "Skala i elastyczność", text: "Od pojedynczego domu po inwestycje deweloperskie — jeden standard obsługi." },
                ].map((item, idx) => (
                  <div key={item.title} className="premium-fade-soft premium-card-soft rounded-[24px] p-5 md:p-6" style={{ animationDelay: `${880 + idx * 90}ms`, background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 18px 34px rgba(0,0,0,0.24)" }}>
                    <div className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-[#f3b0b5]">{item.over}</div>
                    <div className="mb-3 text-[1.08rem] font-black text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {item.title}
                    </div>
                    <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.62)" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="premium-fade-soft premium-card-soft rounded-[30px] p-7" style={{ animationDelay: "1080ms", background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(16px)", boxShadow: "0 24px 70px rgba(0,0,0,0.32)" }}>
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#f3b0b5]">Media Bud · panel inwestora</div>
                    <div className="mt-2 text-[2rem] font-black text-white leading-none" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Twoja budowa</div>
                  </div>
                  <div className="h-11 w-11 rounded-full border border-[#f81828]/35 flex items-center justify-center" style={{ background: "rgba(248,24,40,0.08)" }}>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: "#f81828" }} />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#f81828" }} />
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    ["Ponad 15 000 produktów", "Stała dostępność materiałów z wielu kategorii i sprawdzonych systemów."],
                    ["15 lat doświadczenia", "Domy, inwestycje i klienci biznesowi obsługiwani w jednym standardzie."],
                    ["Wycena i kontakt do 24h", "Szybki start rozmowy o inwestycji, zakupach i logistyce dostaw."],
                  ].map(([title, desc], idx) => (
                    <div key={title} className="premium-card-soft rounded-[22px] p-4" style={{ transitionDelay: `${idx * 40}ms`, background: "rgba(0,0,0,0.24)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="mb-1 text-sm font-black text-white">{title}</div>
                      <div className="text-sm leading-6" style={{ color: "rgba(255,255,255,0.62)" }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BAR — NEON COUNTERS ═══ */}
      <div
        ref={r3.ref as React.RefObject<HTMLDivElement>}
        className={`relative overflow-hidden ${r3.visible ? "premium-section-rise" : "opacity-0 translate-y-10"}`}
        style={{
          background: "linear-gradient(180deg, #05050a 0%, #08080e 50%, #050508 100%)",
          borderTop: "1px solid rgba(248,24,40,0.18)",
          borderBottom: "1px solid rgba(248,24,40,0.12)",
          animationDelay: "120ms",
        }}
      >
        {/* Cyberpunk scan line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] premium-line-reveal" style={{ background: "linear-gradient(90deg, transparent 0%, #f81828 30%, rgba(255,80,100,0.8) 50%, #f81828 70%, transparent 100%)", boxShadow: "0 0 16px rgba(248,24,40,0.55)" }} />
        {/* Neon background glow blobs */}
        <div className="absolute pointer-events-none" style={{ left: "10%", top: "-40%", width: 320, height: 320, background: "radial-gradient(circle, rgba(248,24,40,0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
        <div className="absolute pointer-events-none" style={{ right: "8%", bottom: "-40%", width: 280, height: 280, background: "radial-gradient(circle, rgba(248,24,40,0.06) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />

        <style>{`
          @keyframes neonPulse {
            0%, 100% { box-shadow: 0 0 6px rgba(248,24,40,0.25), inset 0 0 6px rgba(248,24,40,0.06); }
            50% { box-shadow: 0 0 18px rgba(248,24,40,0.40), inset 0 0 10px rgba(248,24,40,0.10); }
          }
          @keyframes scanLine {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.3; }
            100% { transform: translateY(300%); opacity: 0; }
          }
          .neon-stat-card {
            position: relative;
            transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.35s cubic-bezier(.22,1,.36,1);
          }
          .neon-stat-card:hover {
            transform: translateY(-5px);
            border-color: rgba(248,24,40,0.45) !important;
            box-shadow: 0 20px 50px rgba(248,24,40,0.15), 0 0 0 1px rgba(248,24,40,0.12) !important;
          }
          .neon-stat-sep {
            width: 1px;
            background: linear-gradient(180deg, transparent 0%, rgba(248,24,40,0.35) 30%, rgba(248,24,40,0.55) 50%, rgba(248,24,40,0.35) 70%, transparent 100%);
          }
          .neon-stat-card::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(248,24,40,0.6), transparent);
            opacity: 0;
            animation: scanLine 4s ease-in-out infinite;
          }
          .neon-stat-card:hover::after { opacity: 1; }
          @keyframes cornerGlow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.9; }
          }
          .neon-corner {
            animation: cornerGlow 2.5s ease-in-out infinite;
          }
        `}</style>

        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="mb-6 flex items-center gap-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#f81828", boxShadow: "0 0 12px rgba(248,24,40,0.9)" }} />
            <div className="text-[10px] font-black uppercase tracking-[0.32em]" style={{ color: "rgba(248,100,100,0.9)", letterSpacing: "0.32em" }}>Media Bud w liczbach</div>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(248,24,40,0.4), rgba(248,24,40,0.1), transparent)" }} />
            <div className="text-[9px] font-mono uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.22)" }}>LIVE DATA</div>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "#f81828" }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#f81828" }} />
            </span>
          </div>

          {/* Desktop: horizontal row with separators */}
          <div className="hidden xl:flex items-stretch gap-0 rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { to: 15000, suffix: "+", label: "Produktów w ofercie",   note: "szeroki asortyment od ręki" },
              { to: 15,    suffix: " lat", label: "Doświadczenia",     note: "w obsłudze inwestycji" },
              { to: 500,   suffix: "+", label: "Firm klientów",         note: "deweloperzy i wykonawcy" },
              { to: 24,    suffix: "h", prefix: "<", label: "Czas odpowiedzi",  note: "pierwsza wycena" },
            ].map((s, i) => (
              <div key={i} className="flex items-stretch flex-1">
                {i > 0 && <div className="neon-stat-sep flex-shrink-0 my-6" />}
                <div
                  className="neon-stat-card flex-1 px-8 py-7 overflow-hidden"
                  style={{ background: "transparent" }}
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none neon-corner" style={{ borderTop: "1px solid rgba(248,24,40,0.7)", borderLeft: "1px solid rgba(248,24,40,0.7)" }} />
                  <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none neon-corner" style={{ borderBottom: "1px solid rgba(248,24,40,0.4)", borderRight: "1px solid rgba(248,24,40,0.4)", animationDelay: "1.2s" }} />

                  <div className="mb-1 text-[9px] font-black uppercase tracking-[0.28em]" style={{ color: "rgba(248,100,100,0.65)", fontFamily: "'Share Tech Mono',monospace" }}>SYS_{String(i + 1).padStart(2, "0")}</div>
                  <div className="mb-3">
                    <CountUp to={s.to} suffix={s.suffix} prefix={s.prefix ?? ""} neon duration={1800 + i * 200} />
                  </div>
                  <div className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-white">{s.label}</div>
                  <div className="mb-3 h-px w-8 transition-all duration-700 group-hover:w-16" style={{ background: "linear-gradient(90deg, rgba(248,24,40,0.85), rgba(248,24,40,0.15))" }} />
                  <p className="text-xs leading-6" style={{ color: "rgba(255,255,255,0.48)" }}>{s.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / tablet: 2×2 grid */}
          <div className="xl:hidden grid grid-cols-2 gap-3">
            {[
              { to: 15000, suffix: "+",    label: "Produktów w ofercie",   note: "szeroki asortyment od ręki" },
              { to: 15,    suffix: " lat", label: "Doświadczenia",          note: "w obsłudze inwestycji" },
              { to: 500,   suffix: "+",    label: "Firm klientów",          note: "deweloperzy i wykonawcy" },
              { to: 24,    suffix: "h", prefix: "<", label: "Czas odpowiedzi",    note: "pierwsza wycena" },
            ].map((s, i) => (
              <div
                key={i}
                className="neon-stat-card group relative overflow-hidden rounded-[20px] px-5 py-6"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: "linear-gradient(90deg, rgba(248,24,40,0), rgba(248,24,40,0.9), rgba(248,24,40,0))" }} />
                <div className="absolute top-0 left-0 w-3 h-3 neon-corner" style={{ borderTop: "1px solid rgba(248,24,40,0.7)", borderLeft: "1px solid rgba(248,24,40,0.7)" }} />
                <div className="mb-1 text-[9px] font-mono font-black uppercase tracking-[0.22em]" style={{ color: "rgba(248,100,100,0.6)" }}>SYS_{String(i + 1).padStart(2, "0")}</div>
                <div className="mb-2">
                  <CountUp to={s.to} suffix={s.suffix} prefix={s.prefix ?? ""} neon duration={1800 + i * 200} />
                </div>
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white mb-2">{s.label}</div>
                <div className="h-px w-8" style={{ background: "linear-gradient(90deg, rgba(248,24,40,0.85), transparent)" }} />
                <p className="mt-2 text-xs leading-5" style={{ color: "rgba(255,255,255,0.45)" }}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(248,24,40,0.3), transparent)" }} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          BRANDS BAR — EDITORIAL LUXURY
      ═══════════════════════════════════════════════════════ */}
      {/* ── Nasi producenci — Brand Logo Scroller ── */}
      <section
        ref={r7.ref as React.RefObject<HTMLElement>}
        className={`py-14 overflow-hidden relative ${r7.visible ? "premium-section-rise" : "opacity-0 translate-y-10"}`}
        style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", animationDelay: "220ms" }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,transparent,#f81828 30%,rgba(248,24,40,0.3) 70%,transparent)" }} />

        <div className="container mx-auto px-4 mb-8 md:mb-10 flex items-end gap-4">
          <div>
            <div className="premium-editorial-rule mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Nasi producenci</span>
            </div>
            <p className="text-sm md:text-[15px] max-w-xl" style={{ color: "rgba(255,255,255,0.58)", lineHeight: 1.8 }}>
              Pracujemy na markach, które budują jakość, przewidywalność i trwałość całego procesu realizacji.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />

        <style>{`
            @keyframes brand-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .brand-track { animation: brand-scroll 32s linear infinite; }
            .brand-track:hover { animation-play-state: paused; }
            .brand-card {
              transition: border-color 0.42s cubic-bezier(.22,1,.36,1), box-shadow 0.42s cubic-bezier(.22,1,.36,1), transform 0.42s cubic-bezier(.22,1,.36,1), background 0.42s cubic-bezier(.22,1,.36,1);
              position: relative;
              overflow: hidden;
            }
            .brand-card::after {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(135deg, rgba(248,24,40,0.08) 0%, transparent 60%);
              opacity: 0;
              transition: opacity 0.42s ease;
              pointer-events: none;
            }
            .brand-card:hover::after { opacity: 1; }
            .brand-card:hover {
              border-color: rgba(248,24,40,0.5) !important;
              box-shadow: 0 12px 32px rgba(248,24,40,0.14), 0 0 0 1px rgba(248,24,40,0.10);
              transform: translateY(-4px) scale(1.02);
              background: linear-gradient(180deg, #ffffff 0%, #f8f6f6 100%) !important;
            }
            .brand-card img {
              filter: brightness(1) contrast(1);
              transition: filter 0.5s cubic-bezier(.22,1,.36,1), transform 0.45s cubic-bezier(.22,1,.36,1);
            }
            .brand-card:hover img {
              filter: brightness(1);
              transform: scale(1.04);
            }
            .brand-card-glow {
              position: absolute;
              inset: -2px;
              border-radius: inherit;
              background: linear-gradient(135deg, rgba(248,24,40,0.35), transparent 60%);
              opacity: 0;
              transition: opacity 0.4s ease;
              pointer-events: none;
              z-index: -1;
            }
            .brand-card:hover .brand-card-glow { opacity: 1; }
          `}</style>

          <div className="brand-track flex items-center gap-8 whitespace-nowrap" style={{ width: "max-content" }}>
            {[...brandLogos, ...brandLogos].map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="inline-flex items-center justify-center flex-shrink-0">
                <div
                  className="brand-card flex items-center justify-center rounded-[18px] px-7 py-4"
                  style={{
                    background: "linear-gradient(180deg, #ffffff 0%, #fbfbfb 100%)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    minWidth: "146px",
                    minHeight: "72px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  <img
                    src={brand.url}
                    alt={brand.name}
                    loading="lazy"
                    className="h-9 w-auto object-contain"
                    style={{ maxWidth: "124px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CATEGORIES GRID — EDITORIAL LUXURY
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r1.ref as React.RefObject<HTMLElement>}
        className={`py-20 md:py-24 relative overflow-hidden ${r1.visible ? "premium-section-rise" : "opacity-0 translate-y-10"}`}
        style={{ background: "#050505", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", animationDelay: "280ms" }}
      >
        <style>{`
          @keyframes cat-scan { 0%{top:0%;opacity:.78} 75%{opacity:.34} 100%{top:100%;opacity:0} }
          .cat-card:hover .cat-scan-line { animation: cat-scan 0.95s ease-in forwards; }
          .cat-card img { filter: brightness(0.34) saturate(0.46); transition: filter 0.55s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1); }
          .cat-card:hover img { filter: brightness(0.56) saturate(0.84); transform: scale(1.05); }
          .cat-card-title,
          .cat-card-kicker,
          .cat-card-cta { transition: transform 0.38s cubic-bezier(.22,1,.36,1), opacity 0.38s cubic-bezier(.22,1,.36,1), color 0.38s cubic-bezier(.22,1,.36,1); }
          .cat-card:hover .cat-card-title { transform: translateY(-2px); }
          .cat-card:hover .cat-card-kicker { opacity: 0.75; }
          .cat-card:hover .cat-card-cta { opacity: 1; transform: translateY(0); }
        `}</style>

        <div className="container mx-auto px-4 relative z-[2]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-14 gap-6">
            <div className="max-w-2xl">
              <div className="premium-editorial-rule mb-4">
                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#f3b0b5]">Asortyment</span>
              </div>
              <h2
                className="font-black text-white break-words max-w-full"
                style={{
                  fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif",
                  fontSize: "clamp(2.1rem, 4.7vw, 4.8rem)",
                  letterSpacing: "-0.035em",
                  lineHeight: 0.92,
                  overflowWrap: "anywhere",
                }}
              >
                Nasze
                <span className="block" style={{ background: "linear-gradient(135deg,#ffffff 0%, #ffd9dd 32%, #f81828 88%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  kategorie
                </span>
              </h2>
              <p className="text-sm md:text-[15px] mt-4 max-w-xl" style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.85 }}>
                Kompleksowy asortyment materiałów dla każdej budowy — od systemów elewacyjnych po chemię, izolacje i rozwiązania wykończeniowe.
              </p>
            </div>
            <Link
              to="/produkty"
              className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300 hover:text-white hover:-translate-y-[2px]"
              style={{ color: "#f81828", letterSpacing: "0.15em" }}
            >
              Pełny katalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {categories.map((cat, i) => {
              const isWide = i < 2;
              return (
                <Link
                  key={cat.id}
                  to={`/kategoria/${cat.slug}`}
                  className={`cat-card group relative overflow-hidden rounded-[20px] md:rounded-[24px] ${isWide ? "col-span-2 aspect-[21/7] lg:aspect-[21/5.4]" : "col-span-1 aspect-[4/3] lg:aspect-[4/3.2]"} ${r1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    background: "#0f0f0f",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transition: "border-color 0.38s cubic-bezier(.22,1,.36,1), box-shadow 0.38s cubic-bezier(.22,1,.36,1), transform 0.38s cubic-bezier(.22,1,.36,1), opacity 0.8s cubic-bezier(.22,1,.36,1)",
                    transitionDelay: `${i * 55}ms`,
                    boxShadow: "0 16px 34px rgba(0,0,0,0.22)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.42)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 18px 40px rgba(248,24,40,0.10), inset 0 0 0 1px rgba(248,24,40,0.08)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 34px rgba(0,0,0,0.22)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div className="cat-scan-line absolute left-0 right-0 h-px z-20 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(248,24,40,0.85), transparent)", top: 0 }} />

                  {catImages[cat.slug] ? (
                    <img
                      src={catImages[cat.slug]}
                      alt={cat.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#111,#0a0a0a)" }} />
                  )}

                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.58) 46%, rgba(0,0,0,0.12) 100%)" }} />

                  <div className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(248,24,40,0.9), rgba(248,24,40,0.18), transparent)", boxShadow: "0 0 10px rgba(248,24,40,0.55)" }} />

                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
                    <div className="flex items-start justify-between">
                      <span className="cat-card-kicker text-[9px] font-black text-white/30 group-hover:text-white/55" style={{ fontFamily: "'Share Tech Mono',monospace", letterSpacing: "0.2em" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {cat.children && cat.children.length > 0 && (
                        <span className="cat-card-kicker text-[9px] font-bold px-2 py-1 rounded-full opacity-80 group-hover:opacity-100" style={{ background: "rgba(30,3,4,0.88)", border: "1px solid rgba(248,24,40,0.28)", color: "#ffb5bc" }}>
                          {cat.children.length} kat.
                        </span>
                      )}
                    </div>

                    <div>
                      <h3
                        className="cat-card-title font-black text-white leading-[0.98] mb-2"
                        style={{
                          fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif",
                          fontSize: isWide ? "clamp(1.15rem, 2.3vw, 1.65rem)" : "clamp(0.88rem, 1.6vw, 1.05rem)",
                          letterSpacing: "-0.01em",
                          textTransform: "uppercase",
                        }}
                      >
                        {cat.name}
                      </h3>
                      <div className="cat-card-cta flex items-center gap-1 opacity-0 translate-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f3b0b5]">Przeglądaj</span>
                        <ChevronRight className="w-3 h-3 text-[#f3b0b5]" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex md:hidden justify-center">
            <Link
              to="/produkty"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest text-white rounded-full"
              style={{ background: "linear-gradient(135deg, #f81828 0%, #d10f1e 100%)", letterSpacing: "0.12em", boxShadow: "0 14px 30px rgba(248,24,40,0.24)" }}
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
          FEATURED PRODUCTS — EDITORIAL LUXURY
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r2.ref as React.RefObject<HTMLElement>}
        className={`py-20 md:py-24 relative overflow-hidden ${r2.visible ? "premium-section-rise" : "opacity-0 translate-y-10"}`}
        style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)", animationDelay: "340ms" }}
      >
        <div className="container mx-auto px-4 relative z-[2]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="premium-editorial-rule mb-4">
                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#f3b0b5]">Oferta</span>
              </div>
              <h2 className="text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", fontSize: "clamp(2.15rem, 4.8vw, 4.8rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em" }}>
                {activeTab === "bestsellery"
                  ? "Bestsellery budowlane 2025"
                  : activeTab === "nowosci"
                  ? "Nowości w ofercie"
                  : "Katalog produktów"}
              </h2>
              <p className="mt-4 text-sm md:text-[15px] max-w-xl" style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.85 }}>
                {activeTab === "bestsellery"
                  ? "Najchętniej wybierane materiały budowlane w Lublinie, uporządkowane w bardziej premium i czytelnej prezentacji." 
                  : activeTab === "nowosci"
                  ? "Najnowsze produkty w naszej ofercie — wybrane tak, by szybciej znaleźć świeże i ważne pozycje." 
                  : "Bestsellery i nowości w naszej ofercie, pokazane w spokojniejszym, bardziej editorialowym układzie."}
              </p>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full p-1.5 self-start md:self-auto"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
            >
              {PRODUCT_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-black uppercase tracking-[0.14em] transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-gray-500 hover:text-white"
                  }`}
                  style={activeTab === tab.id ? { background: "linear-gradient(135deg, #f81828 0%, #d10f1e 100%)", boxShadow: "0 12px 28px rgba(248,24,40,0.22)" } : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {featured.map((p, i) => (
              <div
                key={p.id}
                className={`${r2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transition: "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)", transitionDelay: `${i * 90}ms`, willChange: r2.visible ? "auto" : "transform, opacity" }}
              >
                <div className="premium-card-soft rounded-[26px] overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 18px 40px rgba(0,0,0,0.22)" }}>
                  <ProductCard product={p} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link to="/produkty">
              <Button className="bg-[#f81828] hover:bg-[#c8000f] font-bold px-8 rounded-full shadow-[0_14px_30px_rgba(248,24,40,0.22)]">
                Zobacz pełny katalog <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/kontakt">
              <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white font-semibold px-8 hover:border-[#f81828] hover:text-white hover:bg-[#f81828]/10">
                Zapytaj o produkt
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHY MEDIABUD — GLASSMORPHISM + NEON COUNTERS
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r4.ref as React.RefObject<HTMLElement>}
        className={`py-24 md:py-28 relative overflow-hidden ${r4.visible ? "premium-section-rise" : "opacity-0 translate-y-10"}`}
        style={{ background: "#050505", animationDelay: "180ms" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 hidden md:block w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.15, filter: "brightness(0.42) saturate(0.62) hue-rotate(-5deg)" }}
          src="https://us-tiangong-data.oss-accelerate.aliyuncs.com/skywork_assets/20260608/text2video-d8ji72v80j2drgd1t2kg.mp4"
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.97) 0%, rgba(5,5,8,0.88) 45%, rgba(5,5,5,0.98) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(248,24,40,0.5), transparent)" }} />

        {/* Cyberpunk grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(248,24,40,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <style>{`
          @keyframes iconPulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(248,24,40,0.4); }
            50% { transform: scale(1.08); box-shadow: 0 0 0 8px rgba(248,24,40,0); }
          }
          .feature-card-glass {
            background: linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
            backdrop-filter: blur(18px) saturate(1.2);
            -webkit-backdrop-filter: blur(18px) saturate(1.2);
            border: 1px solid rgba(255,255,255,0.09);
            transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.38s cubic-bezier(.22,1,.36,1);
          }
          .feature-card-glass:hover {
            border-color: rgba(248,24,40,0.35) !important;
            box-shadow: 0 24px 52px rgba(248,24,40,0.12), 0 0 0 1px rgba(248,24,40,0.08) !important;
            transform: translateY(-4px) !important;
          }
          .feature-card-glass:hover .feature-icon-wrap {
            animation: iconPulse 1.2s ease-in-out infinite;
            border-color: rgba(248,24,40,0.5) !important;
            background: rgba(248,24,40,0.18) !important;
          }
          .why-stat-row {
            background: linear-gradient(135deg, rgba(248,24,40,0.08) 0%, rgba(255,255,255,0.04) 100%);
            border: 1px solid rgba(248,24,40,0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
        `}</style>

        <div className="container mx-auto px-4 relative" style={{ zIndex: 3 }}>
          {/* Header */}
          <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-12 xl:gap-16 items-start mb-14">
            <div>
              <div className="premium-editorial-rule mb-5">
                <span className="text-[11px] font-black uppercase tracking-[0.28em] text-[#f3b0b5]">Dlaczego Media Bud</span>
              </div>
              <h2 className="text-white mb-6" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", fontSize: "clamp(2.25rem, 4.8vw, 4.8rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em" }}>
                Know-how techniczne.
                <span className="block" style={{ background: "linear-gradient(135deg,#ffffff 0%, #ffd9dd 32%, #f81828 88%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Obsługa, która dowozi.
                </span>
              </h2>
              <p className="max-w-xl text-sm md:text-[15px] leading-8 mb-8" style={{ color: "rgba(255,255,255,0.70)" }}>
                Łączymy wiedzę materiałową, doświadczenie wykonawcze i realne tempo działania. Dzięki temu inwestor nie kupuje tylko produktów — kupuje spokój, przewidywalność i partnera, który rozumie budowę od praktycznej strony.
              </p>

              {/* ── Animowane liczniki stat row ── */}
              <div className="why-stat-row rounded-[24px] p-5 md:p-6">
                <div className="text-[9px] font-mono font-black uppercase tracking-[0.28em] mb-5" style={{ color: "rgba(248,100,100,0.7)" }}>// Nasze osiągnięcia</div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { to: 15000, suffix: "+", label: "produktów" },
                    { to: 500,   suffix: "+", label: "klientów" },
                    { to: 15,    suffix: " lat", label: "doświadczenia" },
                  ].map((st, idx) => (
                    <div key={idx} className="text-center">
                      <div>
                        <CountUp to={st.to} suffix={st.suffix} neon duration={1600 + idx * 250} />
                      </div>
                      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.52)" }}>{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {[
                { title: "Doradztwo techniczne", text: "Dobieramy systemy i rozwiązania do zakresu prac, budżetu i harmonogramu inwestycji.", icon: <IconPrecision size={22} style={{ color:"#f81828" }} /> },
                { title: "Kompleksowa obsługa", text: "Możesz zamówić same materiały albo połączyć zakupy z wykonawstwem w jednym procesie.", icon: <IconChain size={22} style={{ color:"#f81828" }} /> },
                { title: "Sprawdzona logistyka", text: "Dostarczamy materiały na budowę i porządkujemy proces zakupowy tak, by ograniczyć przestoje.", icon: <IconLogistics size={22} style={{ color:"#f81828" }} /> },
                { title: "Partner dla B2B i klientów prywatnych", text: "Obsługujemy zarówno firmy i deweloperów, jak i inwestorów budujących własny dom.", icon: <IconPartnership size={22} style={{ color:"#f81828" }} /> },
              ].map((item, idx) => (
                <div key={item.title} className="feature-card-glass rounded-[24px] p-5 md:p-6" style={{ transitionDelay: `${idx * 50}ms` }}>
                  <div className="mb-3">{item.icon}</div>
                  <div className="mb-1 text-[9px] font-mono font-black uppercase tracking-[0.22em]" style={{ color: "rgba(248,100,100,0.65)" }}>MOD_{String(idx + 1).padStart(2, "0")}</div>
                  <div className="mb-3 text-[1.02rem] font-black text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{item.title}</div>
                  <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.60)" }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {features.map((f, i) => {
              const Icon = f.Icon;
              return (
                <div
                  key={i}
                  className={`feature-card-glass group relative overflow-hidden rounded-[26px] p-6 md:p-7 cursor-default ${r4.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    boxShadow: "0 18px 42px rgba(0,0,0,0.22)",
                    transitionDelay: `${Math.min(i * 80, 320)}ms`,
                    willChange: r4.visible ? "auto" : "transform, opacity",
                    transition: "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1), border-color 0.4s ease, box-shadow 0.4s ease",
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] opacity-80" style={{ background: "linear-gradient(90deg, rgba(248,24,40,0), rgba(248,24,40,0.8), rgba(248,24,40,0))" }} />
                  <span className="absolute top-5 right-5 text-[10px] font-mono font-black tracking-[0.22em] uppercase" style={{ color: "rgba(248,24,40,0.48)" }}>{f.code}</span>

                  <div className="feature-icon-wrap relative flex items-center justify-center flex-shrink-0 mb-5 transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(248,24,40,0.4)]"
                    style={{ width:44, height:44, border:"1px solid rgba(248,24,40,0.4)", background:"rgba(248,24,40,0.06)" }}>
                    <Icon className="w-5 h-5" style={{ color:"#f81828" }} />
                  </div>

                  <h3 className="mb-3 text-xl font-black text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", letterSpacing: "-0.02em" }}>{f.title}</h3>
                  <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.62)" }}>{f.desc}</p>
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
      <section id="dom-od-podstaw" className="py-14 md:py-24 relative overflow-hidden" style={{ background: "#000" }}>
        {/* Cyberpunk grid bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(248,24,40,0.6) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(248,24,40,0.6), rgba(255,80,100,0.5), rgba(248,24,40,0.6), transparent)" }} />
        {/* Red glow bottom-right */}
        <div className="absolute pointer-events-none" style={{ right: "-10%", bottom: "-20%", width: 500, height: 500, background: "radial-gradient(circle, rgba(248,24,40,0.09) 0%, transparent 65%)", borderRadius: "50%", filter: "blur(60px)" }} />

        <style>{`
          @keyframes pulseCTA {
            0%, 100% { box-shadow: 0 0 0 0 rgba(248,24,40,0.6), 0 16px 36px rgba(248,24,40,0.28); }
            50% { box-shadow: 0 0 0 14px rgba(248,24,40,0), 0 20px 48px rgba(248,24,40,0.42); }
          }
          .cta-pulse {
            animation: pulseCTA 2.4s ease-in-out infinite;
          }
          .cta-pulse:hover { animation-duration: 0.8s; }
          @keyframes stepReveal {
            from { opacity: 0; transform: translateX(-16px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .step-item {
            opacity: 0;
            animation: stepReveal 0.7s cubic-bezier(.22,1,.36,1) forwards;
          }
          .step-num-line {
            position: relative;
          }
          .step-num-line::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 100%;
            width: 1px;
            height: 100%;
            background: linear-gradient(180deg, rgba(248,24,40,0.35), transparent);
            transform: translateX(-50%);
          }
          .step-item:last-child .step-num-line::after { display: none; }
        `}</style>

        <div className="relative z-10 container mx-auto px-4">
          {/* ── Split layout: nagłówek + lista po lewej, CTA box po prawej ── */}
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 xl:gap-16 items-start mb-10">

            {/* LEWA KOLUMNA: nagłówek + etapy */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-3" style={{ color: "#f81828" }}>
                <span className="w-8 h-px" style={{ background: "linear-gradient(90deg, #f81828, rgba(248,24,40,0.2))" }} />
                PROGRAM SPECJALNY
                <span className="relative flex h-1.5 w-1.5 ml-1">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "#f81828" }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#f81828" }} />
                </span>
              </p>
              <h2 style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em", fontSize: "clamp(2.6rem,5.2vw,5.5rem)" }}>
                <span className="text-white block">Dom od</span>
                <span className="block" style={{ background: "linear-gradient(135deg, #ffffff 0%, #ffd9dd 28%, #f81828 88%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Podstaw</span>
              </h2>
              <p className="mt-5 mb-10 max-w-lg text-sm md:text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                Kompleksowe wsparcie dla tych, którzy budują dom po raz pierwszy. Od projektu do odbioru — jeden opiekun, jeden kosztorys, zero chaosu.
              </p>

              {/* Etapy — pionowa lista */}
              <div className="space-y-0">
                {[
                  { num: "01", title: "Projekt i pozwolenie",  desc: "Analizujemy projekt, dobieramy materiały, pomagamy w formalnościach." },
                  { num: "02", title: "Stan surowy",           desc: "Fundamenty, ściany, strop, dach — własna ekipa i materiały z magazynu." },
                  { num: "03", title: "Instalacje",            desc: "Elektryka, wod-kan, ogrzewanie — zaplanowane i wykonane razem." },
                  { num: "04", title: "Wykończenia",           desc: "Tynki, podłogi, łazienki, kuchnia — jeden kosztorys, jeden wykonawca." },
                  { num: "05", title: "Odbiór i klucze",       desc: "Odbierasz gotowy dom z dokumentacją. Jeden telefon był początkiem." },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="step-item flex items-start gap-5 py-5 group"
                    style={{ animationDelay: `${i * 100 + 200}ms`, borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                  >
                    <div className="step-num-line flex-shrink-0 w-9 flex flex-col items-center pt-0.5">
                      <span
                        className="text-[11px] font-mono font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ background: "rgba(248,24,40,0.10)", border: "1px solid rgba(248,24,40,0.32)", color: "#f81828" }}
                      >
                        {step.num}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-white text-sm mb-1 group-hover:text-[#ff4d5d] transition-colors duration-200" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", letterSpacing: "-0.01em" }}>{step.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>{step.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-0.5" style={{ color: "#f81828" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* PRAWA KOLUMNA: wideo + CTA box */}
            <div className="flex flex-col gap-6">
              {/* Wideo */}
              <div className="rounded-[24px] overflow-hidden" style={{ border: "1px solid rgba(248,24,40,0.25)", boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(248,24,40,0.06)" }}>
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

              {/* CTA Premium Card */}
              <div
                className="rounded-[24px] p-6 md:p-8 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(248,24,40,0.12) 0%, rgba(10,0,2,0.95) 60%, rgba(5,0,1,0.98) 100%)",
                  border: "1px solid rgba(248,24,40,0.28)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                }}
              >
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: "linear-gradient(90deg, rgba(248,24,40,0), #f81828 30%, rgba(255,80,100,0.8) 50%, #f81828 70%, rgba(248,24,40,0))" }} />

                <div className="text-[9px] font-mono font-black uppercase tracking-[0.32em] mb-4" style={{ color: "rgba(248,100,100,0.75)" }}>// JEDEN OPIEKUN. JEDEN DOM.</div>
                <p className="text-white font-black mb-2" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Od fundamentów
                </p>
                <p className="mb-6" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 900, background: "linear-gradient(135deg, #f81828, #ff6b6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  do kluczy.
                </p>

                <ul className="space-y-2.5 mb-7">
                  {[
                    "Jeden opiekun przez cały projekt",
                    "Materiały z naszego magazynu",
                    "Własna ekipa wykonawcza",
                    "Jeden kosztorys — zero niespodzianek",
                  ].map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                      <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5" style={{ background: "rgba(248,24,40,0.18)", border: "1px solid rgba(248,24,40,0.4)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#f81828" }} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/uslugi/dom-od-podstaw"
                  className="cta-pulse inline-flex items-center gap-3 w-full justify-center px-6 py-4 font-black uppercase tracking-[0.16em] text-white rounded-[16px] transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #f81828 0%, #c50018 100%)", fontSize: "0.82rem" }}
                >
                  Zapytaj o wycenę
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="mt-3 text-center text-[10px]" style={{ color: "rgba(255,255,255,0.38)" }}>Bezpłatna wycena · Odpowiedź do 24h</p>
              </div>
            </div>
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
