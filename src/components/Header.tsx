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
  "chemia-budowlana":      <FlaskConical  className="w-5 h-5" />,
  "dachy":                 <Home          className="w-5 h-5" />,
  "farby-i-rozpuszczalniki": <Paintbrush    className="w-5 h-5" />,
  "izolacje":              <Shield        className="w-5 h-5" />,
  "narzedzia-i-mocowania":   <Wrench        className="w-5 h-5" />,
  "plytki":                <LayoutGrid    className="w-5 h-5" />,
  "stropy-i-sciany":         <Layers        className="w-5 h-5" />,
  "sucha-zabudowa":        <Package       className="w-5 h-5" />,
  "sufity-podwieszane":    <Grid2X2       className="w-5 h-5" />,
  "posadzki":              <Minus         className="w-5 h-5" />,
};

const CAT_IMAGES: Record<string, string> = {
  "chemia-budowlana":    "/images/cat-chemia_2.png",
  "dachy":               "/images/cat-dachy_2.png",
  "farby-i-rozpuszczalniki": "/images/cat-farby_2.png",
  "izolacje":            "/images/cat-ocieplenia_2.png",
  "narzedzia-i-mocowania": "/images/cat-narzedzia_2.png",
  "plytki":              "/images/cat-plytki_2.png",
  "stropy-i-sciany":       "/images/cat-sciany_2.png",
  "sucha-zabudowa":      "/images/cat-sucha-zabudowa_2.png",
};

/* ── GA4 helper ── */
declare global { interface Window { gtag?: (...a: unknown[]) => void } }
const trackNav = (label: string, level: string, slug?: string) =>
  window.gtag?.('event', 'navigation_click', { nav_label: label, nav_level: level, nav_slug: slug });

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaSearch, setMegaSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<{name: string; slug: string; image?: string}[]>([]);
  const { items, openDrawer } = useWycena();
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const navigate  = useNavigate();
  const location  = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartY = useRef<number>(0);
  const touchCurrentY = useRef<number>(0);
  const { data: sanityProducts } = useAllProducts();
  const { data: sanityTopCats }  = useAllCategories();

  /* Kategorie: Sanity (z dziećmi) lub static jako fallback */
  const categories = useMemo(
    () => sanityTopCats && (sanityTopCats as any[]).length > 0
      ? (sanityTopCats as any[]).map(c => sanityCategoryToLegacy(c as SanityCategory))
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
      mergedProducts.map(p => p.brand).filter(isValidBrand)
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
    const fn = () => setScrolled(window.scrollY > 48);
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
    <header ref={headerRef} className="sticky top-0 z-50" style={{ boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.85)" : "none", transition: "box-shadow .3s" }}>

      {/* ════════════════════════════════════════════════
          ROW 1 — Top info bar (collapses on scroll)
      ════════════════════════════════════════════════ */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          background: "#060606",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          maxHeight: scrolled ? "0" : "40px",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-[11px]">
            {/* Left — contact triplet */}
            <div className="hidden lg:flex items-center gap-5 text-gray-500">
              <a href="tel:+48509567213"
                className="flex items-center gap-1.5 hover:text-[#f81828] transition-colors group">
                <Phone className="w-3 h-3 text-[#f81828]" />
                <span className="group-hover:text-white">+48 509 567 213</span>
              </a>
              <span className="w-px h-3 bg-white/10" />
              <a href="mailto:sprzedaz@mediabud.pl"
                className="flex items-center gap-1.5 hover:text-[#f81828] transition-colors group">
                <Mail className="w-3 h-3 text-[#f81828]" />
                <span className="group-hover:text-white">sprzedaz@mediabud.pl</span>
              </a>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#f81828]" />ul. Chemiczna 8d, 20-329 Lublin
              </span>
            </div>
            {/* Ticker (mobile + tablet) */}
            <div className="lg:hidden ticker-wrap flex-1 overflow-hidden">
              <div className="ticker-content flex items-center gap-8 whitespace-nowrap">
                {["📞 +48 509 567 213","✉ sprzedaz@mediabud.pl","📍 Chemiczna 8d, Lublin","🕐 Pon–Pt 7–17, Sob 8–14","🚚 Dostawa na teren Lublina i okolic"].map((t,i) => (
                  <span key={i} className="text-gray-500 flex items-center">{t}<span className="mx-4 text-gray-800">·</span></span>
                ))}
              </div>
            </div>
            {/* Right — hours + social */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-gray-500">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
                </span>
                <span>Pon–Pt <strong className="text-gray-400">7:00–17:00</strong> · Sob <strong className="text-gray-400">8:00–14:00</strong></span>
              </div>
              <span className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-2.5 text-gray-600">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="hover:text-[#f81828] transition-colors p-0.5 rounded">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="hover:text-[#f81828] transition-colors p-0.5 rounded">
                  <Instagram className="w-3.5 h-3.5" />
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
        className="transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className={`container mx-auto px-4 flex items-center gap-4 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img
              src="/images/logo-mediabud-main.png"
              alt="Media Bud – Skład Budowlany"
              className={`object-contain transition-all duration-300 group-hover:brightness-90 ${scrolled ? "h-12" : "h-14"}`}
              style={{ maxWidth: "200px", minWidth: "120px" }}
            />
          </Link>

          {/* Search bar — centered, full width */}
          <div className="flex-1 relative" ref={searchRef}>
            <div className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Szukaj produktów, marek, kategorii..."
                  className="pl-10 rounded-r-none border-r-0 text-white placeholder:text-gray-500 focus-visible:ring-0 text-sm h-11 transition-all"
                  style={{
                    background: "#f5f5f5",
                    border: "1px solid rgba(0,0,0,0.12)",
                    borderRight: "none",
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter" && searchQuery) {
                      submitSearch(searchQuery);
                    }
                  }}
                />
              </div>
              <button
                className="h-11 px-6 flex items-center justify-center gap-2 font-bold text-sm text-white flex-shrink-0 transition-all"
                style={{ background: "#f81828", borderRadius: "0 8px 8px 0" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(248,24,40,0.4)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                onClick={() => submitSearch(searchQuery)}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Szukaj</span>
              </button>
            </div>

            {/* Autocomplete */}
            {(searchFocused || searchResults.length > 0) && (
              <div
                className="absolute top-full left-0 right-0 z-50 mt-2 rounded-2xl overflow-hidden shadow-2xl"
                style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 18px 50px rgba(0,0,0,0.18)" }}
              >
                {searchResults.length > 0 ? (
                  <>
                    <div className="px-4 py-2.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500" style={{ background: "rgba(0,0,0,0.025)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <span>Najlepsze dopasowania</span>
                      <span>{searchResults.length} / 6</span>
                    </div>
                    {searchResults.map(p => (
                      <Link
                        key={p.id}
                        to={`/produkt/${p.slug}`}
                        className="flex items-center gap-3 px-4 py-3 border-b border-black/5 hover:bg-[#f81828]/5 transition-colors group/sr last:border-0"
                        onClick={() => { setSearchResults([]); setSearchQuery(""); setSearchFocused(false); }}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#1a1a1a] border border-white/10">
                          <img src={p.images?.[0] || "/placeholder.svg"} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <div className="text-sm font-semibold text-gray-800 group-hover/sr:text-[#f81828] transition-colors truncate max-w-[320px]">{p.name}</div>
                            {p.isFeatured && (
                              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: "#f81828" }}>
                                <Sparkles className="w-3 h-3" /> Polecany
                              </span>
                            )}
                            {p.isNew && (
                              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: "#10b981" }}>
                                <Star className="w-3 h-3" /> Nowość
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mb-1">{p.brand} · {p.unit} · {p.sku}</div>
                          <div className="text-[11px] text-gray-500 line-clamp-1">{p.shortDescription}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover/sr:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                    <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3" style={{ background: "rgba(0,0,0,0.02)" }}>
                      <div className="text-[11px] text-gray-500 font-medium">Naciśnij Enter, aby zobaczyć wszystkie wyniki</div>
                      <button
                        className="text-[11px] font-bold text-[#f81828] hover:underline"
                        onClick={() => submitSearch(searchQuery)}
                      >
                        Zobacz pełną listę
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-gray-500 font-semibold mb-3">Popularne skróty wyszukiwania</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {quickSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-white transition-colors"
                          style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" }}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            submitSearch(suggestion);
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-gray-500 font-semibold mb-2">Najczęstsze marki</div>
                    <div className="flex flex-wrap gap-2">
                      {topBrands.map((brand) => (
                        <button
                          key={brand}
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#f81828] hover:text-white transition-colors"
                          style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.14)" }}
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
                )}
              </div>
            )}
          </div>

          {/* ── CTA buttons ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Phone — ghost red button */}
            <a href="tel:+48509567213"
              className="hidden lg:flex items-center gap-2 h-11 px-5 rounded-lg font-bold text-sm transition-all duration-200 flex-shrink-0"
              style={{ background: "rgba(248,24,40,0.07)", border: "1px solid rgba(248,24,40,0.25)", color: "#1a1a1a" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.color = "#ffffff"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(248,24,40,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.07)"; (e.currentTarget as HTMLElement).style.color = "#1a1a1a"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
              <div className="w-6 h-6 rounded-full bg-[#f81828] flex items-center justify-center flex-shrink-0">
                <Phone className="w-3 h-3 text-white" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[9px] text-gray-500 font-normal">Zadzwoń teraz</div>
                <div className="text-xs font-black">509 567 213</div>
              </div>
            </a>

            {/* Wycena counter */}
            <button onClick={openDrawer}
              className="relative flex items-center gap-2 h-11 px-4 rounded-lg font-bold text-sm transition-all duration-200 flex-shrink-0"
              style={{ background: "#f81828", color: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(248,24,40,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
              <Calculator className="w-4 h-4" />
              <div className="text-left leading-none hidden sm:block">
                <div className="text-[9px] font-normal opacity-80">koszyk</div>
                <div className="text-xs font-black">Moja Wycena</div>
              </div>
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-white text-[#f81828] rounded-full text-[10px] font-black flex items-center justify-center px-1 shadow-lg animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          ROW 3 — Category icon bar  (desktop only)
          Inspired by the reference — dark industrial version
      ════════════════════════════════════════════════ */}
      <div className="hidden lg:block" style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {/* subtle grid bg */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

          <nav className="relative container mx-auto px-4" role="navigation" aria-label="Kategorie produktów">
            <div className="flex items-center">
              {/* Category icon items */}
              {categories.map(cat => (
                <div key={cat.id} className="relative group/icon flex-1"
                  onMouseEnter={() => { menuEnter(cat.id); setMegaSearch(""); }}
                  onMouseLeave={menuLeave}>
                  <Link to={`/kategoria/${cat.slug}`}
                    className="flex flex-col items-center gap-1.5 py-3 px-2 transition-all duration-200 relative overflow-hidden"
                    style={{ color: activeMenu === cat.id ? "#f81828" : "#9ca3af" }}
                    aria-expanded={cat.children ? activeMenu === cat.id : undefined}
                    aria-haspopup={cat.children ? "true" : undefined}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f81828"; }}
                    onMouseLeave={e => { if (activeMenu !== cat.id) (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
                    onClick={() => trackNav(cat.name, 'desktop_L1', cat.slug)}>
                    {/* bg flash on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 transition-opacity"
                      style={{ background: "rgba(248,24,40,0.07)" }} />
                    {/* top indicator */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-[#f81828] transition-transform duration-200 origin-left ${activeMenu === cat.id ? "scale-x-100" : "scale-x-0 group-hover/icon:scale-x-100"}`} />
                    <div className="relative z-10">
                      {CAT_ICONS[cat.slug] ?? <Package className="w-6 h-6" />}
                    </div>
                    <span className="relative z-10 text-[10px] font-bold leading-tight text-center break-words hyphens-auto" style={{ maxWidth: "80px", wordBreak: "break-word" }}>
                      {cat.name}
                    </span>
                    {cat.children && (
                      <ChevronDown className={`relative z-10 w-2.5 h-2.5 transition-transform duration-200 -mt-0.5 ${activeMenu === cat.id ? "rotate-180" : ""}`} />
                    )}
                  </Link>

                  {/* ── Mega dropdown 2-poziomowy ── */}
                  {cat.children && activeMenu === cat.id && (
                    <div className="fixed left-0 right-0 z-50"
                      style={{
                        top: "calc(var(--header-h, 140px))",
                        background: "#0c0c0c",
                        borderTop: "2px solid #f81828",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 24px 80px rgba(0,0,0,0.9)",
                      }}
                      onMouseEnter={() => menuEnter(cat.id)}
                      onMouseLeave={() => { menuLeave(); setActiveSubMenu(null); }}>
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
                      <div className="relative container mx-auto px-4 py-5">
                        <div className="flex gap-6">

                          {/* Col 1: Obraz + link kategorii */}
                          <div className="w-44 flex-shrink-0">
                            <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3">
                              {CAT_IMAGES[cat.slug]
                                ? <img src={CAT_IMAGES[cat.slug]} alt={cat.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.55)" }} />
                                : <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(248,24,40,0.1)" }}>{CAT_ICONS[cat.slug] ?? <Package className="w-10 h-10 text-[#f81828]" />}</div>}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#f81828]" />
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <div className="font-display font-black text-white text-sm leading-tight">{cat.name}</div>
                                <div className="text-[10px] text-gray-400 mt-0.5">{cat.children.length} kategorii</div>
                              </div>
                            </div>
                            <Link to={`/kategoria/${cat.slug}`} onClick={() => setActiveMenu(null)}
                              className="flex items-center gap-1.5 text-xs text-[#f81828] font-bold hover:underline mb-1">
                              <ShoppingBag className="w-3 h-3" />Wszystkie produkty
                            </Link>
                          </div>

                          {/* Col 2: Lista podkategorii (L1) — z wyszukiwarką */}
                          <div className="w-52 flex-shrink-0 border-r border-white/5 pr-4">
                            <div className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                              <span className="w-2 h-px bg-[#f81828]" />Podkategorie
                            </div>
                            {/* Mini search in mega-menu */}
                            <div className="relative mb-2">
                              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-600 pointer-events-none" />
                              <input
                                type="text"
                                placeholder="Szukaj kategorii..."
                                value={megaSearch}
                                onChange={e => setMegaSearch(e.target.value)}
                                className="w-full pl-6 pr-2 py-1.5 text-[11px] rounded-lg outline-none text-gray-300 placeholder-gray-600"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                              />
                            </div>
                            <div className="space-y-0.5 overflow-y-auto" style={{ maxHeight: "260px" }}>
                              {cat.children
                                .filter(sub => !megaSearch || sub.name.toLowerCase().includes(megaSearch.toLowerCase()))
                                .map(sub => (
                                <div key={sub.id}
                                  onMouseEnter={() => setActiveSubMenu(sub.id)}
                                  className={`group/sub flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-150 ${
                                    activeSubMenu === sub.id
                                      ? "bg-[#f81828]/15 text-white"
                                      : "text-gray-400 hover:bg-[#f81828]/10 hover:text-white"
                                  }`}>
                                  <Link to={`/kategoria/${sub.slug}`} onClick={() => { setActiveMenu(null); trackNav(sub.name, 'desktop_L2', sub.slug); }}
                                    className="flex items-center gap-2 flex-1 min-w-0 text-[12px] font-medium">
                                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${activeSubMenu === sub.id ? "bg-[#f81828]" : "bg-[#f81828]/40 group-hover/sub:bg-[#f81828]"}`} />
                                    <span className="truncate">{sub.name}</span>
                                  </Link>
                                  {sub.children && sub.children.length > 0 && (
                                    <ChevronRight className={`w-3 h-3 flex-shrink-0 transition-colors ${activeSubMenu === sub.id ? "text-[#f81828]" : "text-gray-700"}`} />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Col 3: Pod-podkategorie (L2) — pokazuje się gdy hovujesz na L1 */}
                          <div className="flex-1">
                            {activeSubMenu ? (
                              (() => {
                                const activeSub = cat.children.find(s => s.id === activeSubMenu);
                                return activeSub ? (
                                  <div>
                                    <div className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                                      <span className="w-2 h-px bg-[#f81828]" />{activeSub.name}
                                    </div>
                                    {activeSub.children && activeSub.children.length > 0 ? (
                                      <div className="grid grid-cols-2 xl:grid-cols-3 gap-0.5">
                                        {activeSub.children.map(sub2 => (
                                          <Link key={sub2.id} to={`/kategoria/${sub2.slug}`} onClick={() => setActiveMenu(null)}
                                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] text-gray-400 hover:text-white hover:bg-[#f81828]/10 transition-all font-medium">
                                            <span className="w-1 h-1 rounded-full bg-[#f81828]/30 flex-shrink-0" />
                                            <span className="truncate">{sub2.name}</span>
                                          </Link>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center justify-center h-24 text-center">
                                        <Link to={`/kategoria/${activeSub.slug}`} onClick={() => setActiveMenu(null)}
                                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f81828]/10 text-[#f81828] text-sm font-bold hover:bg-[#f81828] hover:text-white transition-all">
                                          <ShoppingBag className="w-4 h-4" /> Przeglądaj produkty
                                        </Link>
                                      </div>
                                    )}
                                  </div>
                                ) : null;
                              })()
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-700 text-xs text-center p-4">
                                <div>
                                  <div className="text-2xl mb-1">←</div>
                                  Najedź na podkategorię<br />aby zobaczyć więcej
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Col 4: CTA */}
                          <div className="w-44 flex-shrink-0 flex flex-col gap-3">
                            <div className="rounded-xl p-4 flex-1"
                              style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.14),rgba(248,24,40,0.07))", border: "1px solid rgba(248,24,40,0.22)" }}>
                              <div className="text-xs text-[#f88090] font-bold uppercase tracking-wider mb-2">Szybka wycena</div>
                              <p className="text-xs text-gray-500 leading-relaxed mb-3">Potrzebujesz materiałów? Wycenimy projekt.</p>
                              <Link to="/kontakt" onClick={() => setActiveMenu(null)}
                                className="flex items-center justify-center gap-1.5 w-full bg-[#f81828] hover:bg-[#c8000f] text-white text-xs font-bold py-2 rounded-lg transition-all">
                                Zapytaj o ofertę <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                            <div className="rounded-xl p-3"
                              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                              <div className="flex items-center gap-2 mb-1.5">
                                <Phone className="w-3.5 h-3.5 text-[#f81828]" />
                                <span className="text-xs text-gray-400 font-semibold">Zadzwoń</span>
                              </div>
                              <a href="tel:+48509567213" className="text-sm font-black text-white hover:text-[#f81828] transition-colors">
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
              <div className="w-px h-10 flex-shrink-0 mx-2" style={{ background: "rgba(255,255,255,0.08)" }} />

              {/* "Wszystkie" red CTA — like the reference */}
              <Link to="/kategoria"
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white transition-all duration-200 ml-1"
                style={{ background: "#f81828" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(248,24,40,0.5)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <LayoutGrid className="w-4 h-4" />
                Wszystkie
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Secondary nav links */}
              <div className="flex items-center ml-3 gap-1 flex-shrink-0">
                {[
                  { to: "/blog", label: "Blog" },
                  { to: "/o-firmie", label: "O firmie" },
                  { to: "/uslugi", label: "Usługi" },
                ].map(link => (
                  <Link key={link.to} to={link.to}
                    className="px-3 py-2 text-[11px] font-semibold text-gray-500 hover:text-white transition-colors whitespace-nowrap">
                    {link.label}
                  </Link>
                ))}
                <Link to="/kontakt"
                  className="flex items-center gap-1 ml-1 px-3 py-1.5 rounded-md text-[11px] font-black text-white transition-all"
                  style={{ background: "rgba(248,24,40,0.15)", border: "1px solid rgba(248,24,40,0.3)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.15)"; }}>
                  <Mail className="w-3 h-3" />Kontakt
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          Mobile nav — BOTTOM SHEET (slide from bottom)
          Trend 2026: thumb-friendly, native-feel
      ════════════════════════════════════════════════ */}

      {/* Backdrop overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[55] transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Bottom Sheet Panel */}
      <nav
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobilne"
        className={`lg:hidden fixed left-0 right-0 bottom-0 z-[60] transition-transform duration-300 ease-out ${mobileOpen ? "translate-y-0" : "translate-y-full"}`}
        style={{
          background: "#0d0d0d",
          borderTop: "2px solid #f81828",
          borderRadius: "20px 20px 0 0",
          maxHeight: "72vh",
          display: "flex",
          flexDirection: "column",
          willChange: "transform",
        }}
        onTouchStart={e => { touchStartY.current = e.touches[0].clientY; touchCurrentY.current = e.touches[0].clientY; }}
        onTouchMove={e => { touchCurrentY.current = e.touches[0].clientY; }}
        onTouchEnd={() => { if (touchCurrentY.current - touchStartY.current > 80) setMobileOpen(false); }}
      >
        {/* Drag handle — wskazówka wizualna do swipe */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0 cursor-grab active:cursor-grabbing">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }} />
        </div>

        {/* Header strip */}
        <div className="flex items-center justify-between px-5 py-2 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f81828] animate-pulse" />
            <span className="text-sm font-black text-white tracking-wide">Media Bud</span>
            <span className="text-xs text-gray-600 font-medium">Skład budowlany</span>
          </div>
          <button
            ref={closeBtnRef}
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Zamknij menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {/* Contact strip */}
          <div className="flex items-center justify-around py-3 px-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "#090909" }}>
            <a href="tel:+48509567213"
              className="flex items-center gap-2 text-xs font-bold text-[#f81828] active:opacity-70"
              onClick={() => trackNav('phone', 'mobile_contact')}>
              <Phone className="w-4 h-4" />509 567 213
            </a>
            <a href="mailto:sprzedaz@mediabud.pl"
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors active:opacity-70">
              <Mail className="w-4 h-4" />Email
            </a>
            <span className="flex items-center gap-1.5 text-[10px] text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Pon–Pt 7–17
            </span>
          </div>

          {/* Category label */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Kategorie produktów</p>
          </div>

          {/* Category icon grid (mobile) — 4 columns, thumb-sized targets */}
          <div className="grid grid-cols-4 gap-1 px-3 pb-2">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/kategoria/${cat.slug}`}
                className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl transition-all active:scale-95"
                style={{ color: "#9ca3af", minHeight: "72px" }}
                onClick={() => { setMobileOpen(false); trackNav(cat.name, 'mobile_L1', cat.slug); }}
              >
                {CAT_ICONS[cat.slug] ?? <Package className="w-5 h-5" />}
                <span className="text-[8px] font-bold text-center leading-tight line-clamp-2">{cat.name}</span>
              </Link>
            ))}
          </div>

          {/* Ostatnio oglądane (localStorage) */}
          {recentlyViewed.length > 0 && (
            <div className="px-4 pt-3 pb-2">
              <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.06)" }} />
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Ostatnio oglądane</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {recentlyViewed.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/produkt/${item.slug}`}
                    className="flex-shrink-0 flex flex-col items-center gap-1 p-2 rounded-xl transition-all active:scale-95"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", minWidth: "72px", maxWidth: "80px" }}
                    onClick={() => { setMobileOpen(false); trackNav(item.name, 'mobile_recent', item.slug); }}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(248,24,40,0.12)" }}>
                        <Package className="w-5 h-5 text-[#f81828]" />
                      </div>
                    )}
                    <span className="text-[8px] text-gray-400 font-medium text-center line-clamp-2 leading-tight">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick links */}
          <div className="px-4 py-2 space-y-1">
            <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.06)" }} />
            {[
              { to: "/blog", label: "Blog techniczny" },
              { to: "/o-firmie", label: "O firmie" },
              { to: "/uslugi", label: "Nasze usługi" },
              { to: "/realizacje", label: "Realizacje" },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white active:bg-white/10 transition-colors"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                onClick={() => { setMobileOpen(false); trackNav(link.label, 'mobile_secondary', link.to); }}
              >
                {link.label}<ArrowRight className="w-4 h-4 text-gray-600" />
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="px-4 pt-2 pb-6 space-y-2">
            <div className="h-px mb-2" style={{ background: "rgba(255,255,255,0.06)" }} />
            <Link
              to="/kontakt"
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#f81828] text-white text-sm font-black hover:bg-[#c8000f] transition-colors active:scale-95"
              onClick={() => { setMobileOpen(false); trackNav('Zapytaj o ofertę', 'mobile_cta'); }}
            >
              <Mail className="w-4 h-4" />Zapytaj o ofertę
            </Link>
            <a
              href="tel:+48509567213"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-gray-300 transition-colors active:scale-95"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
              onClick={() => setMobileOpen(false)}
            >
              <Phone className="w-4 h-4" />+48 509 567 213
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
