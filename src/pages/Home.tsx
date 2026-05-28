import { Link } from "react-router-dom";
import { Phone, Mail, ChevronRight, ArrowRight, Calendar, TrendingUp, Users, Award, Clock } from "lucide-react";
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
    <span ref={ref as React.RefObject<HTMLSpanElement>} className="stat-number text-4xl font-black text-white font-display">
      {val}{suffix}
    </span>
  );
}

/* ─── Data ─────────────────────────────────────────────────────── */
const catIcons: Record<string, string> = {
  "chemia-budowlana": "🧪", "dachy": "🏠", "farby-rozpuszczalniki": "🎨",
  "izolacje": "🛡️", "narzedzia-mocowania": "🔧", "pozostale": "📦",
  "plytki": "⬜", "stropy-sciany": "🧱", "sucha-zabudowa": "🔲", "sufity-podwieszane": "⬛",
};

const stats = [
  { icon: TrendingUp, num: 1000, suffix: "+", label: "produktów w ofercie" },
  { icon: Users,     num: 500,  suffix: "+", label: "zadowolonych klientów" },
  { icon: Award,     num: 15,   suffix: "+", label: "lat doświadczenia" },
  { icon: Clock,     num: 24,   suffix: "h", label: "czas odpowiedzi" },
];

const features = [
  { emoji: "🔧", title: "Doradztwo techniczne", desc: "Bezpłatne konsultacje z ekspertami budowlanymi dla każdego projektu, bez zobowiązań." },
  { emoji: "📋", title: "Obsługa krok po kroku", desc: "Kompleksowe wsparcie od wyboru materiałów aż po odbiór gotowej budowy." },
  { emoji: "🚚", title: "Szybka dostawa", desc: "Transport materiałów na teren Lublina i całego województwa lubelskiego." },
  { emoji: "⭐", title: "Renomowane marki", desc: "Weber, Ceresit, Atlas, Knauf, Rockwool, Swisspor i wiele innych marek premium." },
  { emoji: "🏅", title: "Gwarancja jakości", desc: "Wszystkie produkty z oryginalnymi certyfikatami i atestami budowlanymi." },
  { emoji: "🏗️", title: "Dla deweloperów", desc: "Indywidualne warunki, dedykowany opiekun handlowy, faktury zbiorcze, rabaty." },
];

const steps = [
  { n: "01", title: "Skontaktuj się", desc: "Zadzwoń lub napisz — omówimy Twój projekt i potrzeby materiałowe." },
  { n: "02", title: "Bezpłatna wycena", desc: "Nasi eksperci dobiorą materiały i przygotują szczegółową wycenę." },
  { n: "03", title: "Złóż zamówienie", desc: "Zamawiaj online, telefonicznie lub osobiście — jak wolisz." },
  { n: "04", title: "Odbiór lub dostawa", desc: "Odbierz ze składu lub zamów dostawę bezpośrednio na budowę." },
];

/* ─── Hero floating card ──────────────────────────────────────── */
const heroCards = [
  { emoji: "🏗️", text: "Tynki elewacyjne" },
  { emoji: "🏠", text: "Systemy ociepleń" },
  { emoji: "🧱", text: "Styropian EPS" },
  { emoji: "🛡️", text: "Wełna mineralna" },
  { emoji: "🎨", text: "Farby elewacyjne" },
  { emoji: "💧", text: "Hydroizolacje" },
];

/* ================================================================
   COMPONENT
================================================================ */
export default function Home() {
  /* ── Sanity data z fallbackiem na dane statyczne ─────────────── */
  const { data: sanityCats }      = useAllCategories()
  const { data: sanityFeatured }  = useSanityFeatured()

  const categories = useMemo(
    () => sanityCats && (sanityCats as any[]).length > 0
      ? (sanityCats as any[]).map(sanityCategoryToLegacy)
      : staticCategories,
    [sanityCats],
  )

  const featured = useMemo(
    () => sanityFeatured && (sanityFeatured as any[]).length > 0
      ? (sanityFeatured as any[]).map(sanityProductToLegacy)
      : getFeaturedProducts(),
    [sanityFeatured],
  )

  const recentPosts = getRecentBlogPosts(3);
  const [quoteOpen, setQuoteOpen] = useState(false);

  /* section reveals */
  const r1 = useReveal(); // categories
  const r2 = useReveal(); // featured
  const r3 = useReveal(); // stats
  const r4 = useReveal(); // features
  const r5 = useReveal(); // steps
  const r6 = useReveal(); // blog

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
        "address": { "@type": "PostalAddress", "streetAddress": "ul. Budowlana 1", "addressLocality": "Lublin", "postalCode": "20-001", "addressCountry": "PL" },
        "url": "https://mediabud.pl",
        "openingHours": ["Mo-Fr 07:00-17:00", "Sa 08:00-14:00"],
        "priceRange": "$$",
        "areaServed": "Lublin, województwo lubelskie"
      })}} />

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0a0a0a] min-h-[580px] flex items-center overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-white opacity-60" />
        {/* Gradient masks */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Red accent line top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#f81828] to-transparent" />

        <div className="relative container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <div>
            <div className="animate-fade-up">
              <Badge className="bg-[#f81828]/20 text-[#f88090] border border-[#f81828]/30 mb-5 px-3 py-1 text-xs font-semibold tracking-widest uppercase">
                Hurtownia budowlana · Lublin
              </Badge>
            </div>
            <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.05] mb-5 animate-fade-up delay-100">
              Media Bud –<br />
              <span className="text-gradient-animate">profesjonalna</span><br />
              hurtownia<br />
              budowlana
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-7 max-w-md leading-relaxed animate-fade-up delay-200">
              Kompleksowe wsparcie dla Twojego projektu budowlanego. Tynki, ocieplenia, chemia budowlana, farby i więcej — doradztwo techniczne w cenie.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-300">
              <Button
                size="lg"
                className="bg-[#f81828] hover:bg-[#c8000f] font-bold px-7 btn-glow text-base h-12"
                onClick={() => setQuoteOpen(true)}
              >
                <Mail className="w-4 h-4 mr-2" /> Zapytaj o ofertę
              </Button>
              <a href="tel:+48509567213">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white hover:text-black font-bold px-7 w-full sm:w-auto text-base h-12 transition-all"
                >
                  <Phone className="w-4 h-4 mr-2" /> +48 509 567 213
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-5 mt-6 animate-fade-up delay-400">
              {["Ponad 1000 produktów", "Bezpłatne doradztwo", "Dostawa do Lublina"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: floating product cards */}
          <div className="hidden md:grid grid-cols-3 gap-3 animate-slide-right delay-200">
            {heroCards.map((card, i) => (
              <div
                key={i}
                className="glass rounded-xl p-4 text-center cursor-default transition-all duration-300 hover:bg-white/15 hover:scale-[1.04]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-2">{card.emoji}</div>
                <div className="text-white text-xs font-semibold leading-snug">{card.text}</div>
              </div>
            ))}
          </div>
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
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon className="w-5 h-5 text-white/70" />
                  <CountUp to={num} suffix={suffix} />
                </div>
                <p className="text-red-100 text-sm font-medium">{label}</p>
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
            <p className="text-xs font-bold tracking-widest uppercase text-[#f81828] mb-1">Asortyment</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900">Nasze kategorie produktów</h2>
          </div>
          <Link
            to="/produkty"
            className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#f81828] hover:underline"
          >
            Wszystkie <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/kategoria/${cat.slug}`}
              className="group bg-white rounded-xl border border-gray-100 p-5 text-center card-hover card-shine shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="text-4xl mb-3 transition-transform group-hover:scale-110 duration-300 inline-block">
                {catIcons[cat.slug] || "📦"}
              </div>
              <div className="font-bold text-sm text-gray-900 group-hover:text-[#f81828] transition-colors leading-snug">
                {cat.name}
              </div>
              {cat.children && (
                <div className="text-xs text-gray-400 mt-1">{cat.children.length} podkategorii</div>
              )}
              <div className="mt-2 text-xs text-[#f81828] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1">
                Przeglądaj <ChevronRight className="w-3 h-3" />
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
              <p className="text-xs font-bold tracking-widest uppercase text-[#f81828] mb-1">Oferta</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900">Polecane produkty</h2>
              <p className="text-gray-500 mt-1">Bestsellery i nowości w naszej ofercie</p>
            </div>
            <Link
              to="/produkty"
              className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#f81828] hover:underline"
            >
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
          WHY MEDIABUD
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r4.ref as React.RefObject<HTMLElement>}
        className={`container mx-auto px-4 py-14 transition-all duration-700 ${r4.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[#f81828] mb-1">Dlaczego my?</p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900 mb-3">Dlaczego Media Bud?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Łączymy profesjonalną wiedzę techniczną z indywidualnym podejściem — zarówno dla deweloperów, jak i klientów budujących własny dom.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl border border-gray-100 p-6 card-hover shadow-[0_1px_6px_rgba(0,0,0,0.05)] transition-all duration-500 ${r4.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="w-12 h-12 bg-[#fff0f0] rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform hover:scale-110 duration-300 cursor-default">
                {f.emoji}
              </div>
              <h3 className="font-display font-bold text-gray-900 mb-2 text-base">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={r5.ref as React.RefObject<HTMLElement>}
        className={`bg-[#0a0a0a] text-white py-16 relative overflow-hidden transition-all duration-700 ${r5.visible ? "opacity-100" : "opacity-0"}`}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-white opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f81828] to-transparent" />

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase text-[#f81828] mb-2">Jak działamy?</p>
            <h2 className="font-display text-3xl md:text-4xl font-black mb-3">Program „Dom od podstaw"</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Kompleksowa obsługa Twojego projektu budowlanego — od fundamentów po wykończenie
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#f81828]/80 via-[#f81828]/40 to-[#f81828]/80 pointer-events-none" />

            {steps.map((s, i) => (
              <div
                key={i}
                className={`relative text-center transition-all duration-600 ${r5.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative inline-flex items-center justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-[#f81828]/10 border border-[#f81828]/30 flex items-center justify-center">
                    <span className="font-display font-black text-xl text-[#f81828]">{s.n}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-white mb-2 text-base">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/uslugi/dom-od-podstaw">
              <Button size="lg" className="bg-[#f81828] hover:bg-[#c8000f] px-10 font-bold text-base h-12 btn-glow">
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
            <p className="text-xs font-bold tracking-widest uppercase text-[#f81828] mb-1">Wiedza</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900">Blog techniczny</h2>
            <p className="text-gray-500 mt-1">Ekspercka wiedza dla budowniczych i inwestorów</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#f81828] hover:underline">
            Wszystkie artykuły <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`group bg-white rounded-xl border border-gray-100 overflow-hidden card-hover card-shine shadow-[0_1px_6px_rgba(0,0,0,0.06)] transition-all duration-500 ${r6.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <Badge variant="secondary" className="text-xs font-medium">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("pl-PL")}
                  </span>
                </div>
                <h3 className="font-display font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#f81828] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-[#f81828] font-semibold">
                  Czytaj więcej <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA CONTACT
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#f81828] py-16 overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-grid opacity-30" style={{ "--grid-color": "rgba(0,0,0,0.08)" } as React.CSSProperties} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f81828] via-[#e00015] to-[#c8000f]" />

        <div className="relative container mx-auto px-4 text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-red-200 mb-3">Gotowy na współpracę?</p>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Zróbmy to razem
          </h2>
          <p className="text-red-100 mb-9 max-w-xl mx-auto text-base leading-relaxed">
            Skontaktuj się z nami już dziś. Przygotujemy bezpłatną wycenę materiałów dla Twojego projektu w ciągu 24 godzin.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+48509567213">
              <Button
                size="lg"
                className="bg-white text-[#f81828] hover:bg-gray-100 font-bold px-10 w-full sm:w-auto text-base h-12 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Phone className="w-4 h-4 mr-2" /> Zadzwoń: +48 509 567 213
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="border-white/60 text-white hover:bg-white/10 font-bold px-10 text-base h-12 transition-all"
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
