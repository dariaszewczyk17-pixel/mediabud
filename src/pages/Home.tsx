import { Link } from "react-router-dom";
import { Phone, Mail, ChevronRight, ArrowRight, Calendar, TrendingUp, Users, Award, Clock, ChevronLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories as staticCategories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { getRecentBlogPosts } from "@/data/blog";
import { useAllCategories, useFeaturedProducts as useSanityFeatured } from "@/hooks/useSanityData";
import { sanityCategoryToLegacy, sanityProductToLegacy } from "@/lib/adapters";
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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85&auto=format&fit=crop",
    label: "Materiały budowlane",
    title: "Kompleksowe materiały dla\nkażdej budowy",
    subtitle: "Ponad 1000 produktów od wiodących marek. Tynki, ocieplenia, chemia budowlana, farby — wszystko w jednym miejscu.",
    cta: "Przeglądaj ofertę",
    ctaLink: "/produkty",
  },
  {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=85&auto=format&fit=crop",
    label: "Systemy ociepleń",
    title: "Systemy ETICS i\nocieplenia dla profesjonalistów",
    subtitle: "Rockwool, Swisspor, Weber, Knauf — renomowane marki i bezpłatne doradztwo techniczne dla Twojego projektu.",
    cta: "Zapytaj o wycenę",
    ctaLink: "/kontakt",
  },
  {
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=1600&q=85&auto=format&fit=crop",
    label: "Chemia budowlana",
    title: "Profesjonalna chemia\nbudowlana Ceresit, Atlas, Weber",
    subtitle: "Dostawa materiałów na teren Lublina i województwa lubelskiego. Obsługa deweloperów, firm budowlanych i klientów indywidualnych.",
    cta: "Skontaktuj się",
    ctaLink: "/kontakt",
  },
];

/* ─── Category icons ──────────────────────────────────────────── */
const catIcons: Record<string, string> = {
  "chemia-budowlana": "🧪", "dachy": "🏠", "farby-rozpuszczalniki": "🎨",
  "izolacje": "🛡️", "narzedzia-mocowania": "🔧", "pozostale": "📦",
  "plytki": "⬜", "stropy-sciany": "🧱", "sucha-zabudowa": "🔲", "sufity-podwieszane": "⬛",
};
const catImages: Record<string, string> = {
  "chemia-budowlana": "https://images.unsplash.com/photo-1517646458010-ea6bd7ff5f34?w=400&q=70",
  "dachy": "https://images.unsplash.com/photo-1632323469474-f59d89f03d37?w=400&q=70",
  "farby-rozpuszczalniki": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=70",
  "izolacje": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=70",
  "narzedzia-mocowania": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&q=70",
  "plytki": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=70",
  "stropy-sciany": "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&q=70",
  "sucha-zabudowa": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=70",
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

const steps = [
  { n: "01", title: "Skontaktuj się z nami", desc: "Zadzwoń lub napisz — omówimy Twój projekt i potrzeby materiałowe bez zobowiązań." },
  { n: "02", title: "Bezpłatna wycena", desc: "Nasi eksperci dobiorą optymalne materiały i przygotują szczegółową wycenę dla Twojego projektu." },
  { n: "03", title: "Złóż zamówienie", desc: "Zamawiaj online, telefonicznie lub osobiście w składzie — tak jak wolisz." },
  { n: "04", title: "Odbiór lub dostawa", desc: "Odbierz ze składu lub zamów dostawę bezpośrednio na budowę — szybko i sprawnie." },
];

const brands = [
  { name: "Weber", color: "#0072CE" },
  { name: "Ceresit", color: "#E30613" },
  { name: "Atlas", color: "#003087" },
  { name: "Knauf", color: "#009640" },
  { name: "Rockwool", color: "#C8102E" },
  { name: "Swisspor", color: "#E2001A" },
  { name: "Bolix", color: "#004A97" },
  { name: "Termo Organika", color: "#F39200" },
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
  const [quoteOpen, setQuoteOpen] = useState(false);

  /* ── Hero slider ── */
  const [slide, setSlide] = useState(0);
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
  const r5 = useReveal(); // steps
  const r6 = useReveal(); // blog
  const r7 = useReveal(); // brands

  const current = heroSlides[slide];

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
        "address": { "@type": "PostalAddress", "addressLocality": "Lublin", "postalCode": "20-001", "addressCountry": "PL" },
        "url": "https://mediabud.pl",
        "openingHours": ["Mo-Fr 07:00-17:00", "Sa 08:00-14:00"],
        "priceRange": "$$",
        "areaServed": "Lublin, województwo lubelskie"
      })}} />

      {/* ═══════════════════════════════════════════════════════
          HERO SLIDER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0a0a0a] h-[600px] md:h-[680px] overflow-hidden">

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
              style={{ filter: "brightness(0.38) saturate(0.9)" }}
            />
          </div>
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.1) 100%)" }} />
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.65) 0%, transparent 50%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[3px] z-20 bg-gradient-to-r from-[#f81828] via-[#ff4455] to-[#f81828]" />

        {/* Red vertical accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 z-20 bg-[#f81828]" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4 pl-8 md:pl-10">
            <div className="max-w-2xl">
              {/* Label */}
              <div key={`label-${slide}`} className="animate-fade-up mb-4">
                <span className="inline-flex items-center gap-2 bg-[#f81828]/20 border border-[#f81828]/40 text-[#f88090] px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] animate-pulse" />
                  {current.label}
                </span>
              </div>

              {/* Title */}
              <h1
                key={`title-${slide}`}
                className="font-display text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.06] mb-5 animate-fade-up delay-100"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
              >
                {current.title.split("\n").map((line, i) => (
                  <span key={i} className={`block ${i === 1 ? "text-gradient-animate" : ""}`}>{line}</span>
                ))}
              </h1>

              {/* Subtitle */}
              <p key={`sub-${slide}`} className="text-gray-300 text-base md:text-lg mb-8 max-w-xl leading-relaxed animate-fade-up delay-200">
                {current.subtitle}
              </p>

              {/* CTAs */}
              <div key={`cta-${slide}`} className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-300">
                <Link to={current.ctaLink}>
                  <Button size="lg" className="bg-[#f81828] hover:bg-[#c8000f] font-bold px-8 btn-glow text-base h-12 w-full sm:w-auto">
                    {current.cta} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white hover:text-black font-bold px-8 text-base h-12 transition-all"
                  onClick={() => setQuoteOpen(true)}
                >
                  <Mail className="w-4 h-4 mr-2" /> Zapytaj o ofertę
                </Button>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center gap-4 mt-6 animate-fade-up delay-400">
                {["Ponad 1000 produktów", "Bezpłatne doradztwo", "Dostawa Lublin"].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] flex-shrink-0" />{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Slide nav – prev/next */}
        <button
          onClick={() => goTo((slide - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#f81828] border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => goTo((slide + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#f81828] border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide dots */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${i === slide ? "w-8 h-2 bg-[#f81828]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-6 left-8 z-30 font-display text-xs text-gray-500 font-bold">
          <span className="text-white">{String(slide + 1).padStart(2, "0")}</span> / {String(heroSlides.length).padStart(2, "0")}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r3.ref as React.RefObject<HTMLElement>}
        className={`bg-[#f81828] py-10 transition-all duration-700 ${r3.visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, num, suffix, label }, i) => (
              <div key={i} className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                  <CountUp to={num} suffix={suffix} />
                </div>
                <p className="text-red-100 text-sm font-medium tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CATEGORIES GRID
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r1.ref as React.RefObject<HTMLElement>}
        className={`container mx-auto px-4 py-14 transition-all duration-700 ${r1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Asortyment
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900">Nasze kategorie produktów</h2>
          </div>
          <Link to="/produkty" className="hidden md:flex items-center gap-1 text-sm font-bold text-[#f81828] hover:underline">
            Wszystkie <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/kategoria/${cat.slug}`}
              className="group relative bg-[#0a0a0a] rounded-xl overflow-hidden aspect-[4/3] shadow-lg hover:shadow-[0_8px_32px_rgba(248,24,40,0.25)] transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {/* Background image */}
              {catImages[cat.slug] && (
                <img
                  src={catImages[cat.slug]}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              {/* Red accent bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f81828] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                <div className="text-3xl mb-2 transition-transform group-hover:scale-110 duration-300 inline-block">
                  {catIcons[cat.slug] || "📦"}
                </div>
                <div className="font-display font-black text-sm text-white leading-snug">
                  {cat.name}
                </div>
                {cat.children && (
                  <div className="text-[10px] text-gray-400 mt-0.5">{cat.children.length} podkategorii</div>
                )}
                <div className="mt-1.5 text-[10px] text-[#f88090] font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1">
                  Przeglądaj <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r2.ref as React.RefObject<HTMLElement>}
        className={`py-14 bg-gray-50/80 transition-all duration-700 ${r2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-1.5 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#f81828]" />Oferta
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900">Polecane produkty</h2>
              <p className="text-gray-500 mt-1 text-sm">Bestsellery i nowości w naszej ofercie</p>
            </div>
            <Link to="/produkty" className="hidden md:flex items-center gap-1 text-sm font-bold text-[#f81828] hover:underline">
              Wszystkie produkty <ArrowRight className="w-4 h-4" />
            </Link>
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
          <div className="mt-7 text-center md:hidden">
            <Link to="/produkty">
              <Button variant="outline" className="border-[#f81828] text-[#f81828] font-semibold">
                Wszystkie produkty
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BRANDS BAR
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r7.ref as React.RefObject<HTMLElement>}
        className={`border-y border-gray-100 bg-white py-8 transition-all duration-700 ${r7.visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-black tracking-widest uppercase text-gray-300 mb-6">Autoryzowany dystrybutor marek</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {brands.map(b => (
              <div key={b.name} className="group cursor-default">
                <span
                  className="font-display font-black text-lg tracking-tight transition-all duration-200 group-hover:scale-110 inline-block"
                  style={{ color: b.color, opacity: 0.7 }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
                >
                  {b.name}
                </span>
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
          <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900 mb-3">Dlaczego Media Bud?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm">
            Łączymy profesjonalną wiedzę techniczną z indywidualnym podejściem — zarówno dla deweloperów, jak i klientów budujących własny dom.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group bg-white rounded-xl border border-gray-100 p-6 hover:border-[#f81828]/30 hover:shadow-[0_8px_32px_rgba(248,24,40,0.10)] hover:-translate-y-1 transition-all duration-300 ${r4.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="w-12 h-12 bg-[#0a0a0a] group-hover:bg-[#f81828] rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="font-display font-black text-gray-900 mb-2 text-base">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS – dark section
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r5.ref as React.RefObject<HTMLElement>}
        className={`bg-[#0a0a0a] text-white py-16 relative overflow-hidden transition-all duration-700 ${r5.visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-grid-white" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#f81828] to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f81828]" />

        <div className="relative container mx-auto px-4 pl-8 md:pl-10">
          <div className="text-center mb-12">
            <p className="text-xs font-black tracking-widest uppercase text-[#f81828] mb-2 flex items-center justify-center gap-2">
              <span className="w-4 h-0.5 bg-[#f81828]" />Jak działamy?<span className="w-4 h-0.5 bg-[#f81828]" />
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black mb-3">Program „Dom od podstaw"</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Kompleksowa obsługa Twojego projektu budowlanego — od fundamentów po wykończenie
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#f81828]/80 via-[#f81828]/30 to-[#f81828]/80 pointer-events-none" />
            {steps.map((s, i) => (
              <div
                key={i}
                className={`relative text-center transition-all duration-600 ${r5.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative inline-flex items-center justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-[#f81828]/10 border-2 border-[#f81828]/40 flex items-center justify-center hover:bg-[#f81828] hover:border-[#f81828] transition-all duration-300 cursor-default">
                    <span className="font-display font-black text-xl text-[#f81828] group-hover:text-white">{s.n}</span>
                  </div>
                </div>
                <h3 className="font-display font-black text-white mb-2 text-base">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/uslugi/dom-od-podstaw">
              <Button size="lg" className="bg-[#f81828] hover:bg-[#c8000f] px-10 font-black text-base h-12 btn-glow">
                Dowiedz się więcej <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
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
            <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900">Blog techniczny</h2>
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
              className={`group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-[#f81828]/30 hover:shadow-[0_8px_32px_rgba(248,24,40,0.10)] hover:-translate-y-1 transition-all duration-300 ${r6.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
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
                <h3 className="font-display font-black text-gray-900 leading-snug mb-2 group-hover:text-[#f81828] transition-colors line-clamp-2">
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
        {/* Background */}
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
