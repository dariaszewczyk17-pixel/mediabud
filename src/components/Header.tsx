import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search, Phone, Mail, Menu, X, ChevronDown, Calculator,
  ShoppingBag, MapPin, Clock, ArrowRight, Zap, FlaskConical,
  Home, Paintbrush, Shield, Wrench, LayoutGrid, Layers,
  Package, Facebook, Instagram, CheckCircle2, Star, Sparkles,
  Grid2X2, Minus, ChevronRight,
} from "lucide-react";
import { categories as staticCategories } from "@/data/categories";
import { useWycena } from "@/hooks/useWycena";
import { Input } from "@/components/ui/input";
import { products, type Product } from "@/data/products";
import { useAllProducts, useAllCategories } from "@/hooks/useSanityData";
import { sanityProductToLegacy, sanityCategoryToLegacy, type SanityProduct, type SanityCategory } from "@/lib/adapters";
import { mergeProductCollections } from "@/lib/productMerge";
import { searchProducts } from "@/lib/productSearch";

/* ── Category icon map — wszystkie 10 kategorii ─────────────────── */
const CAT_ICONS: Record<string, React.ReactNode> = {
  "chemia-budowlana":      <FlaskConical className="h-5 w-5" />,
  "dachy":                 <Home className="h-5 w-5" />,
  "farby-i-rozpuszczalniki": <Paintbrush className="h-5 w-5" />,
  "izolacje":              <Shield className="h-5 w-5" />,
  "narzedzia-i-mocowania": <Wrench className="h-5 w-5" />,
  "plytki":                <LayoutGrid className="h-5 w-5" />,
  "stropy-i-sciany":       <Layers className="h-5 w-5" />,
  "sucha-zabudowa":        <Package className="h-5 w-5" />,
  "sufity-podwieszane":    <Grid2X2 className="h-5 w-5" />,
  "posadzki":              <Minus className="h-5 w-5" />,
};

const CAT_IMAGES: Record<string, string> = {
  "chemia-budowlana": "/images/cat-chemia_2.png",
  "dachy": "/images/cat-dachy_2.png",
  "farby-i-rozpuszczalniki": "/images/cat-farby_2.png",
  "izolacje": "/images/cat-ocieplenia_2.png",
  "narzedzia-i-mocowania": "/images/cat-narzedzia_2.png",
  "plytki": "/images/cat-plytki_2.png",
  "stropy-i-sciany": "/images/cat-sciany_2.png",
  "sucha-zabudowa": "/images/cat-sucha-zabudowa_2.png",
};

/* ── GA4 helper ── */
declare global { interface Window { gtag?: (...a: unknown[]) => void } }
const trackNav = (label: string, level: string, slug?: string) =>
  window.gtag?.("event", "navigation_click", { nav_label: label, nav_level: level, nav_slug: slug });

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaSearch, setMegaSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<{ name: string; slug: string; image?: string }[]>([]);
  const { items, openDrawer } = useWycena();
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartY = useRef<number>(0);
  const touchCurrentY = useRef<number>(0);
  const { data: sanityProducts } = useAllProducts();
  const { data: sanityTopCats } = useAllCategories();

  /* Kategorie: Sanity (z dziećmi) lub static jako fallback */
  const categories = useMemo(
    () => sanityTopCats && (sanityTopCats as any[]).length > 0
      ? (sanityTopCats as any[]).map((c) => sanityCategoryToLegacy(c as SanityCategory))
      : staticCategories,
    [sanityTopCats],
  );

  const mergedProducts = useMemo(() => {
    const sanityLegacyProducts = ((sanityProducts as SanityProduct[] | undefined) ?? []).map(sanityProductToLegacy);
    return mergeProductCollections(sanityLegacyProducts, products);
  }, [sanityProducts]);

  const isValidBrand = (b: string) =>
    !!b && b.length >= 2 && /^[A-Za-zÀ-ÿĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(b);

  const topBrands = useMemo(
    () => Array.from(new Set(
      mergedProducts.map((p) => p.brand).filter(isValidBrand),
    )).slice(0, 5),
    [mergedProducts],
  );

  const quickSuggestions = useMemo(
    () => ["tynk", "weber", "styropian", "atlas", "grunt"],
    [],
  );

  const submitSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    navigate(`/szukaj?q=${encodeURIComponent(trimmedValue)}`);
    setSearchResults([]);
    setSearchFocused(false);
  };

  /* ── Mierz wysokość headera → ustaw --header-h + scroll-padding-top ── */
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (!headerRef.current) return;
      const h = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
      document.documentElement.style.setProperty("--scroll-padding", `${h + 8}px`);
      document.documentElement.style.scrollPaddingTop = `${h + 8}px`;
    };
    updateHeaderHeight();
    const ro = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, [scrolled]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setSearchResults(searchProducts(mergedProducts, searchQuery, 6));
    } else setSearchResults([]);
  }, [searchQuery, mergedProducts]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchResults([]);
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    // Zamknij mobile menu po nawigacji lub gdy okno >= lg (1024px)
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Zamknij gdy resize do desktop
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // ESC zamyka menu; lock scroll body gdy menu otwarte
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    // Focus trap — przenieś focus na przycisk X przy otwarciu
    if (mobileOpen) {
      const t = setTimeout(() => closeBtnRef.current?.focus(), 80);
      // Wczytaj ostatnio oglądane z localStorage
      try {
        const stored = localStorage.getItem("mediabud_recently_viewed");
        if (stored) setRecentlyViewed(JSON.parse(stored).slice(0, 4));
      } catch { /* ignore */ }
      return () => { clearTimeout(t); document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const menuEnter = (id: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(id);
  };
  const menuLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 120);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-transparent text-white"
      style={{ boxShadow: scrolled ? "0 10px 36px rgba(0,0,0,0.85)" : "none", transition: "box-shadow .3s" }}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#f81828] focus:text-white focus:font-bold focus:rounded">
        Przejdź do treści
      </a>

      {/* ════════════════════════════════════════════════
          ROW 1 — Top info bar (collapses on scroll)
      ════════════════════════════════════════════════ */}
      <div
        className="overflow-hidden border-b border-white/5 bg-black transition-all duration-300"
        style={{ maxHeight: scrolled ? "0" : "40px" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-[11px]">
            {/* Left — contact triplet */}
            <div className="hidden items-center gap-5 text-[#888888] lg:flex">
              <a
                href="tel:+48509567213"
                className="group flex items-center gap-1.5 font-bold uppercase tracking-[0.12em] text-[#888888] transition-colors hover:text-[#f81828] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
              >
                <Phone className="h-3 w-3 text-[#f81828]" />
                <span className="group-hover:text-white">+48 509 567 213</span>
              </a>
              <span className="h-3 w-px bg-white/10" />
              <a
                href="mailto:sprzedaz@mediabud.pl"
                className="group flex items-center gap-1.5 font-bold uppercase tracking-[0.12em] text-[#888888] transition-colors hover:text-[#f81828] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
              >
                <Mail className="h-3 w-3 text-[#f81828]" />
                <span className="group-hover:text-white">sprzedaz@mediabud.pl</span>
              </a>
              <span className="h-3 w-px bg-white/10" />
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-[0.12em] text-[#888888]">
                <MapPin className="h-3 w-3 text-[#f81828]" />ul. Chemiczna 8d, 20-329 Lublin
              </span>
            </div>
            {/* Ticker (mobile + tablet) */}
            <div className="ticker-wrap flex-1 overflow-hidden lg:hidden">
              <div className="ticker-content flex items-center gap-8 whitespace-nowrap">
                {["📞 +48 509 567 213", "✉ sprzedaz@mediabud.pl", "📍 Chemiczna 8d, Lublin", "🕐 Pon–Pt 7:00–16:00", "🚚 Dostawa na teren Lublina i okolic"].map((t, i) => (
                  <span key={i} className="flex items-center font-bold uppercase tracking-[0.12em] text-[#888888]">{t}<span className="mx-4 text-[#2d2d2d]">·</span></span>
                ))}
              </div>
            </div>
            {/* Right — hours + social */}
            <div className="hidden flex-shrink-0 items-center gap-4 lg:flex">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-[0.12em] text-[#888888]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Pon–Pt <strong className="text-white">7:00–16:00</strong></span>
              </div>
              <span className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-2.5 text-[#888888]">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="rounded p-0.5 transition-colors hover:text-[#f81828] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                >
                  <Facebook className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="rounded p-0.5 transition-colors hover:text-[#f81828] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                >
                  <Instagram className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          ROW 2 — Main bar: Logo + Search + CTAs
      ════════════════════════════════════════════════ */}
      <div
        className={`relative border-b border-white/5 transition-all duration-300 ${scrolled ? "bg-black/80 py-3 backdrop-blur-xl" : "bg-black/60 py-4"}`}
      >
        <div className={`absolute bottom-0 left-0 h-[2px] bg-[#f81828] transition-all duration-500 ${scrolled ? "w-full" : "w-0"}`} />
        <div className="container mx-auto flex items-center gap-4 px-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2">
            <img
              src="https://skyagent-artifacts.skywork.ai/router/agent/2026-05-29/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/5j1eO4lOb5MqPjlHF7RIP1%20%E2%80%93%20ze%20zmianami_b734361ec694486192383a2f765df266.png"
              alt="Media Bud – Skład Budowlany"
              className="h-16 w-auto object-contain transition-opacity duration-200 hover:opacity-80"
              style={{ maxWidth: "220px" }}
            />
          </Link>

          {/* Search bar — centered, full width */}
          <div className="relative flex-1" ref={searchRef}>
            <div className="flex">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888888]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Szukaj produktów, marek, kategorii..."
                  className="h-11 rounded-r-none border border-[#2d2d2d] border-r-0 bg-[#0d0d0d] pl-10 text-sm font-bold uppercase tracking-[0.08em] text-white placeholder:text-[#888] transition-all focus:border-[#f81828] focus:shadow-[0_0_0_2px_rgba(248,24,40,0.2)] focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery) {
                      submitSearch(searchQuery);
                    }
                  }}
                />
              </div>
              <button
                className="flex h-11 flex-shrink-0 items-center justify-center gap-2 rounded-r-lg bg-[#f81828] px-6 text-sm font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-[#c8000f] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                onClick={() => submitSearch(searchQuery)}
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Szukaj</span>
              </button>
            </div>

            {/* Autocomplete */}
            {(searchFocused || searchResults.length > 0) && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-[#2d2d2d] bg-[#0d0d0d]/98 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                {searchResults.length > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-3 border-b border-[#2d2d2d] px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#f81828]">
                      <span>Produkty</span>
                      <span>Kategorie</span>
                      <span>Marki</span>
                    </div>
                    <div className="divide-y divide-[#2d2d2d]">
                      {searchResults.map((p) => (
                        <Link
                          key={p.id}
                          to={`/produkt/${p.slug}`}
                          className="group/sr flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#f81828]/5 focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-[-2px]"
                          onClick={() => { setSearchResults([]); setSearchQuery(""); setSearchFocused(false); }}
                        >
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a]">
                            <img src={p.images?.[0] || "/placeholder.svg"} alt={p.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <div className="max-w-[320px] truncate text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors group-hover/sr:text-[#f81828]">{p.name}</div>
                              {p.isFeatured && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#f81828] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                                  <Sparkles className="h-3 w-3" /> Polecany
                                </span>
                              )}
                              {p.isNew && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                                  <Star className="h-3 w-3" /> Nowość
                                </span>
                              )}
                            </div>
                            <div className="mb-1 text-xs font-bold uppercase tracking-[0.08em] text-[#888888]">{p.brand} · {p.unit} · {p.sku}</div>
                            <div className="line-clamp-1 text-[11px] text-[#888888]">{p.shortDescription}</div>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-[#888888] opacity-0 transition-opacity group-hover/sr:opacity-100" />
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2d2d2d] bg-black/30 px-4 py-3">
                      <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#888888]">Naciśnij Enter, aby zobaczyć wszystkie wyniki</div>
                      <button
                        className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#f81828] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                        onClick={() => submitSearch(searchQuery)}
                      >
                        Zobacz pełną listę
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="divide-y divide-[#2d2d2d]">
                    <div className="p-4">
                      <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#f81828]">Produkty</div>
                      <div className="flex flex-wrap gap-2">
                        {quickSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            className="rounded-full border border-[#2d2d2d] bg-[#1a1a1a] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#888888] transition-colors hover:border-[#f81828] hover:bg-[#f81828]/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                            onClick={() => {
                              setSearchQuery(suggestion);
                              submitSearch(suggestion);
                            }}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#f81828]">Kategorie</div>
                      <div className="flex flex-wrap gap-2">
                        {categories.slice(0, 6).map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/kategoria/${cat.slug}`}
                            className="rounded-full border border-[#2d2d2d] bg-[#1a1a1a] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#888888] transition-colors hover:border-[#f81828] hover:bg-[#f81828]/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                            onClick={() => { setSearchResults([]); setSearchQuery(""); setSearchFocused(false); }}
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#f81828]">Marki</div>
                      <div className="flex flex-wrap gap-2">
                        {topBrands.map((brand) => (
                          <button
                            key={brand}
                            className="rounded-full border border-[#f81828]/20 bg-[#f81828]/8 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#f81828] transition-colors hover:bg-[#f81828] hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                            onClick={() => {
                              setSearchQuery(brand);
                              submitSearch(brand);
                            }}
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── CTA buttons ── */}
          <div className="flex flex-shrink-0 items-center gap-2">
            {/* Phone — ghost red button */}
            <a
              href="tel:+48509567213"
              className="hidden h-11 flex-shrink-0 items-center gap-2 rounded-lg border border-[#2d2d2d] px-5 text-sm font-bold uppercase tracking-[0.1em] text-[#888888] transition-all duration-200 hover:border-[#f81828]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2 lg:flex"
            >
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#1a1a1a]">
                <Phone className="h-3 w-3 text-[#f81828]" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#888888]">Zadzwoń teraz</div>
                <div className="text-xs font-black text-white">509 567 213</div>
              </div>
            </a>

            {/* Wycena counter */}
            <button
              onClick={openDrawer}
              className="relative flex h-11 flex-shrink-0 items-center gap-2 rounded-lg bg-[#f81828] px-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:bg-[#c8000f] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
            >
              <Calculator className="h-4 w-4" />
              <div className="hidden text-left leading-none sm:block">
                <div className="text-[9px] font-bold uppercase tracking-[0.12em] opacity-80">Koszyk</div>
                <div className="text-xs font-black">Moja Wycena</div>
              </div>
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-black text-[#f81828] shadow-lg">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              className="rounded-lg border border-[#2d2d2d] bg-[#111111] p-2.5 text-[#888888] transition-colors hover:border-[#f81828]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          ROW 3 — Category icon bar  (desktop only)
          Inspired by the reference — dark industrial version
      ════════════════════════════════════════════════ */}
      <div className="hidden border-b border-white/5 bg-[#0d0d0d] lg:block">
        {/* subtle grid bg */}
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }}
          />

          <nav className="relative container mx-auto px-4" role="navigation" aria-label="Kategorie produktów">
            <div className="cat-nav flex items-stretch overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {/* Category icon items */}
              <style>{`.cat-nav::-webkit-scrollbar{display:none}`}</style>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="group/icon relative flex-none"
                  onMouseEnter={() => { menuEnter(cat.id); setMegaSearch(""); }}
                  onMouseLeave={menuLeave}
                >
                  <Link
                    to={`/kategoria/${cat.slug}`}
                    className={`relative flex items-center gap-1.5 overflow-hidden px-3 py-3 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2 ${activeMenu === cat.id ? "text-[#f81828]" : "text-[#888888] hover:text-[#f81828]"}`}
                    aria-expanded={cat.children ? activeMenu === cat.id : undefined}
                    aria-haspopup={cat.children ? "true" : undefined}
                    onClick={() => trackNav(cat.name, "desktop_L1", cat.slug)}
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity group-hover/icon:opacity-100" style={{ background: "rgba(248,24,40,0.07)" }} />
                    <div className={`absolute top-0 left-0 right-0 h-[2px] origin-left bg-[#f81828] transition-transform duration-200 ${activeMenu === cat.id ? "scale-x-100" : "scale-x-0 group-hover/icon:scale-x-100"}`} />

                    <span className="relative z-10 whitespace-nowrap text-[10px] font-bold uppercase leading-tight tracking-[0.06em]">
                      {cat.name}
                    </span>
                    {cat.children && (
                      <ChevronDown className={`relative z-10 -mt-0.5 h-2.5 w-2.5 transition-transform duration-200 ${activeMenu === cat.id ? "rotate-180" : ""}`} />
                    )}
                  </Link>

                  {/* ── Mega dropdown 2-poziomowy ── */}
                  {cat.children && activeMenu === cat.id && (
                    <div
                      className="fixed left-0 right-0 z-50 border-t border-[#f81828]/30 bg-[#0d0d0d]/98 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                      style={{
                        top: "calc(var(--header-h, 140px))",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                      onMouseEnter={() => menuEnter(cat.id)}
                      onMouseLeave={() => { menuLeave(); setActiveSubMenu(null); }}
                    >
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px" }}
                      />
                      <div className="relative container mx-auto px-4 py-5">
                        <div className="flex gap-6">
                          {/* Col 1: Obraz + link kategorii */}
                          <div className="w-44 flex-shrink-0">
                            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                              {CAT_IMAGES[cat.slug]
                                ? <img src={CAT_IMAGES[cat.slug]} alt={cat.name} className="h-full w-full object-cover" style={{ filter: "brightness(0.55)" }} />
                                : <div className="flex h-full w-full items-center justify-center bg-[#f81828]/10">{CAT_ICONS[cat.slug] ?? <Package className="h-10 w-10 text-[#f81828]" />}</div>}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                              <div className="absolute left-0 right-0 top-0 h-0.5 bg-[#f81828]" />
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <div className="text-sm font-black uppercase tracking-[0.08em] text-white">{cat.name}</div>
                                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#888888]">{cat.children.length} kategorii</div>
                              </div>
                            </div>
                            <Link
                              to={`/kategoria/${cat.slug}`}
                              onClick={() => setActiveMenu(null)}
                              className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#f81828] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                            >
                              <ShoppingBag className="h-3 w-3" />Wszystkie produkty
                            </Link>
                          </div>

                          {/* Col 2: Lista podkategorii (L1) — z wyszukiwarką */}
                          <div className="w-52 flex-shrink-0 border-r border-white/5 pr-4">
                            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#f81828]">
                              <span className="h-px w-2 bg-[#f81828]" />Podkategorie
                            </div>
                            {/* Mini search in mega-menu */}
                            <div className="relative mb-2">
                              <Search className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#888888]" />
                              <input
                                type="text"
                                placeholder="Szukaj kategorii..."
                                value={megaSearch}
                                onChange={(e) => setMegaSearch(e.target.value)}
                                className="w-full rounded-lg border border-[#2d2d2d] bg-[#111111] py-1.5 pl-6 pr-2 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-300 outline-none placeholder:text-[#888] focus:border-[#f81828] focus:shadow-[0_0_0_2px_rgba(248,24,40,0.2)] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                              />
                            </div>
                            <div className="space-y-0.5 overflow-y-auto" style={{ maxHeight: "260px" }}>
                              {cat.children
                                .filter((sub) => !megaSearch || sub.name.toLowerCase().includes(megaSearch.toLowerCase()))
                                .map((sub) => (
                                  <div
                                    key={sub.id}
                                    onMouseEnter={() => setActiveSubMenu(sub.id)}
                                    className={`group/sub flex cursor-pointer items-center justify-between px-2.5 py-1.5 transition-all duration-150 ${
                                      activeSubMenu === sub.id
                                        ? "border-l-2 border-[#f81828] bg-[#f81828]/5 text-white"
                                        : "border-l-2 border-transparent text-[#888888] hover:border-[#f81828] hover:bg-[#f81828]/10 hover:text-white"
                                    }`}
                                  >
                                    <Link
                                      to={`/kategoria/${sub.slug}`}
                                      onClick={() => { setActiveMenu(null); trackNav(sub.name, "desktop_L2", sub.slug); }}
                                      className="flex min-w-0 flex-1 items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                                    >
                                      <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors ${activeSubMenu === sub.id ? "bg-[#f81828]" : "bg-[#f81828]/40 group-hover/sub:bg-[#f81828]"}`} />
                                      <span className="truncate">{sub.name}</span>
                                    </Link>
                                    {sub.children && sub.children.length > 0 && (
                                      <ChevronRight className={`h-3 w-3 flex-shrink-0 transition-colors ${activeSubMenu === sub.id ? "text-[#f81828]" : "text-[#2d2d2d]"}`} />
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Col 3: Pod-podkategorie (L2) — pokazuje się gdy hovujesz na L1 */}
                          <div className="flex-1">
                            {activeSubMenu ? (
                              (() => {
                                const activeSub = cat.children.find((s) => s.id === activeSubMenu);
                                return activeSub ? (
                                  <div>
                                    <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#f81828]">
                                      <span className="h-px w-2 bg-[#f81828]" />{activeSub.name}
                                    </div>
                                    {activeSub.children && activeSub.children.length > 0 ? (
                                      <div className="grid grid-cols-2 gap-0.5 xl:grid-cols-3">
                                        {activeSub.children.map((sub2) => (
                                          <Link
                                            key={sub2.id}
                                            to={`/kategoria/${sub2.slug}`}
                                            onClick={() => setActiveMenu(null)}
                                            className="flex items-center gap-1.5 border-l-2 border-transparent px-2.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-[#888888] transition-all hover:border-[#f81828] hover:bg-[#f81828]/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                                          >
                                            <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#f81828]/30" />
                                            <span className="truncate">{sub2.name}</span>
                                          </Link>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="flex h-24 flex-col items-center justify-center text-center">
                                        <Link
                                          to={`/kategoria/${activeSub.slug}`}
                                          onClick={() => setActiveMenu(null)}
                                          className="flex items-center gap-2 rounded-lg bg-[#f81828]/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#f81828] transition-all hover:bg-[#f81828] hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                                        >
                                          <ShoppingBag className="h-4 w-4" /> Przeglądaj produkty
                                        </Link>
                                      </div>
                                    )}
                                  </div>
                                ) : null;
                              })()
                            ) : (
                              <div className="flex h-full items-center justify-center p-4 text-center text-xs font-bold uppercase tracking-[0.08em] text-[#888888]">
                                <div>
                                  <div className="mb-1 text-2xl text-[#f81828]">←</div>
                                  Najedź na podkategorię<br />aby zobaczyć więcej
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Col 4: CTA */}
                          <div className="flex w-44 flex-shrink-0 flex-col gap-3">
                            <div className="flex-1 rounded-xl border border-[#f81828]/22 bg-gradient-to-br from-[#f81828]/14 to-[#f81828]/7 p-4">
                              <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f81828]">Szybka wycena</div>
                              <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[#888888]">Potrzebujesz materiałów? Wycenimy projekt.</p>
                              <Link
                                to="/kontakt"
                                onClick={() => setActiveMenu(null)}
                                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#f81828] py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition-all hover:bg-[#c8000f] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                              >
                                Zapytaj o ofertę <ArrowRight className="h-3 w-3" />
                              </Link>
                            </div>
                            <div className="rounded-xl border border-white/6 bg-white/3 p-3">
                              <div className="mb-1.5 flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5 text-[#f81828]" />
                                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#888888]">Zadzwoń</span>
                              </div>
                              <a href="tel:+48509567213" className="text-sm font-black uppercase tracking-[0.08em] text-white transition-colors hover:text-[#f81828] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2">
                                +48 509 567 213
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Separator */}
              <div className="mx-2 h-10 w-px flex-shrink-0 bg-white/8" />

              {/* "Wszystkie" red CTA — like the reference */}
              <Link
                to="/kategoria"
                className="ml-1 flex flex-shrink-0 items-center gap-2 rounded-lg bg-[#f81828] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:bg-[#c8000f] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
              >
                <LayoutGrid className="h-4 w-4" />
                Wszystkie
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {/* Secondary nav links */}
              <div className="ml-3 flex flex-shrink-0 items-center gap-1">
                {[
                  { to: "/blog", label: "Blog" },
                  { to: "/o-firmie", label: "O firmie" },
                  { to: "/uslugi", label: "Usługi" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="whitespace-nowrap px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#888888] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/kontakt"
                  className="ml-1 flex items-center gap-1 rounded-md border border-[#f81828]/30 bg-[#f81828]/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-white transition-all hover:bg-[#f81828] focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                >
                  <Mail className="h-3 w-3" />Kontakt
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          Mobile nav — fullscreen slide-in
      ════════════════════════════════════════════════ */}

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Fullscreen Panel */}
      <nav
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobilne"
        className={`fixed inset-y-0 right-0 z-[60] w-full transition-transform duration-300 ease-out lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          background: "#080808",
          display: "flex",
          flexDirection: "column",
          willChange: "transform",
          maxWidth: "100vw",
        }}
        onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; touchCurrentY.current = e.touches[0].clientY; }}
        onTouchMove={(e) => { touchCurrentY.current = e.touches[0].clientY; }}
        onTouchEnd={() => { if (touchCurrentY.current - touchStartY.current > 80) setMobileOpen(false); }}
      >
        <div className="absolute inset-y-0 left-0 w-[3px] bg-[#f81828]" />

        {/* Header strip */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-white/7 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#f81828] animate-pulse" />
            <div>
              <span
                className="block font-black uppercase tracking-tighter text-xl text-white"
                style={{ fontFamily: "'Rajdhani', 'Barlow Condensed', Inter, sans-serif" }}
              >
                MEDIA<span style={{ color: "#f81828" }}>BUD</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">Skład budowlany</span>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            className="rounded-lg border border-[#2d2d2d] bg-[#111111] p-2 text-[#888888] transition-colors hover:border-[#f81828]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
            onClick={() => setMobileOpen(false)}
            aria-label="Zamknij menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Contact strip */}
          <div className="flex items-center justify-around border-b border-white/5 bg-[#090909] px-4 py-3">
            <a
              href="tel:+48509567213"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#f81828] active:opacity-70 focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
              onClick={() => trackNav("phone", "mobile_contact")}
            >
              <Phone className="h-4 w-4" />509 567 213
            </a>
            <a
              href="mailto:sprzedaz@mediabud.pl"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#888888] transition-colors hover:text-white active:opacity-70 focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
            >
              <Mail className="h-4 w-4" />Email
            </a>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#888888]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Pon–Pt 7–17
            </span>
          </div>

          {/* Category label */}
          <div className="px-4 pb-2 pt-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828]">Kategorie produktów</p>
          </div>

          {/* Category icon grid (mobile) — 4 columns, thumb-sized targets */}
          <div className="grid grid-cols-4 gap-1 px-3 pb-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/kategoria/${cat.slug}`}
                className="flex min-h-[72px] flex-col items-center gap-1.5 rounded-xl border border-transparent px-1 py-3 text-[#888888] transition-all active:scale-95 hover:border-[#f81828]/40 hover:bg-[#f81828]/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                onClick={() => { setMobileOpen(false); trackNav(cat.name, "mobile_L1", cat.slug); }}
              >
                {CAT_ICONS[cat.slug] ?? <Package className="h-5 w-5" />}
                <span className="line-clamp-2 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.08em]">{cat.name}</span>
              </Link>
            ))}
          </div>

          {/* Ostatnio oglądane (localStorage) */}
          {recentlyViewed.length > 0 && (
            <div className="px-4 pb-2 pt-3">
              <div className="mb-3 h-px bg-white/6" />
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#f81828]">Ostatnio oglądane</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {recentlyViewed.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/produkt/${item.slug}`}
                    className="flex flex-shrink-0 flex-col items-center gap-1 rounded-xl border border-white/5 bg-white/4 p-2 transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f81828]/12">
                        <Package className="h-5 w-5 text-[#f81828]" />
                      </div>
                    )}
                    <span className="line-clamp-2 text-center text-[8px] font-medium leading-tight text-[#888888]">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick links */}
          <div className="space-y-1 px-4 py-2">
            <div className="mb-3 h-px bg-white/6" />
            {[
              { to: "/blog", label: "Blog techniczny" },
              { to: "/o-firmie", label: "O firmie" },
              { to: "/uslugi", label: "Nasze usługi" },
              { to: "/realizacje", label: "Realizacje" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between rounded-xl border border-white/4 bg-white/2 px-3 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#888888] transition-colors hover:border-[#f81828]/40 hover:bg-[#f81828]/10 hover:text-white active:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
                onClick={() => { setMobileOpen(false); trackNav(link.label, "mobile_secondary", link.to); }}
              >
                {link.label}<ArrowRight className="h-4 w-4 text-[#f81828]" />
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="space-y-2 px-4 pb-6 pt-2">
            <div className="mb-2 h-px bg-white/6" />
            <Link
              to="/kontakt"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#f81828] py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#c8000f] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
              onClick={() => { setMobileOpen(false); trackNav("Zapytaj o ofertę", "mobile_cta"); }}
            >
              <Mail className="h-4 w-4" />Zapytaj o ofertę
            </Link>
            <a
              href="tel:+48509567213"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#2d2d2d] bg-[#111111] py-3 text-sm font-semibold uppercase tracking-[0.08em] text-gray-300 transition-colors hover:border-[#f81828]/60 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-[#f81828] focus-visible:outline-offset-2"
              onClick={() => setMobileOpen(false)}
            >
              <Phone className="h-4 w-4" />+48 509 567 213
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
