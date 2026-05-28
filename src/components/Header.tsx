import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search, Phone, Mail, Menu, X, ChevronDown, Calculator,
  ShoppingBag, MapPin, Clock, ArrowRight, Zap, FlaskConical,
  Home, Paintbrush, Shield, Wrench, LayoutGrid, Layers,
  Package, Facebook, Instagram, CheckCircle2,
} from "lucide-react";
import { categories } from "@/data/categories";
import { useWycena } from "@/hooks/useWycena";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";

/* ── Category icon map ───────────────────────────────────────────── */
const CAT_ICONS: Record<string, React.ReactNode> = {
  "chemia-budowlana":    <FlaskConical  className="w-6 h-6" />,
  "dachy":               <Home          className="w-6 h-6" />,
  "farby-rozpuszczalniki": <Paintbrush  className="w-6 h-6" />,
  "izolacje":            <Shield        className="w-6 h-6" />,
  "narzedzia-mocowania": <Wrench        className="w-6 h-6" />,
  "plytki":              <LayoutGrid    className="w-6 h-6" />,
  "stropy-sciany":       <Layers        className="w-6 h-6" />,
  "sucha-zabudowa":      <Package       className="w-6 h-6" />,
};

const CAT_IMAGES: Record<string, string> = {
  "chemia-budowlana":    "/images/cat-chemia_2.png",
  "dachy":               "/images/cat-dachy_2.png",
  "farby-rozpuszczalniki": "/images/cat-farby_2.png",
  "izolacje":            "/images/cat-ocieplenia_2.png",
  "narzedzia-mocowania": "/images/cat-narzedzia_2.png",
  "plytki":              "/images/cat-plytki_2.png",
  "stropy-sciany":       "/images/cat-sciany_2.png",
  "sucha-zabudowa":      "/images/cat-sucha-zabudowa_2.png",
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { items, openDrawer } = useWycena();
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const navigate  = useNavigate();
  const location  = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const q = searchQuery.toLowerCase();
      setSearchResults(
        products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q))
        ).slice(0, 6)
      );
    } else setSearchResults([]);
  }, [searchQuery]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setSearchResults([]);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) setMobileOpen(false);
  }, [location.pathname]);

  const menuEnter = (id: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(id);
  };
  const menuLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 120);
  };

  return (
    <header className="sticky top-0 z-50" style={{ filter: scrolled ? "drop-shadow(0 8px 32px rgba(0,0,0,0.9))" : "none", transition: "filter .3s" }}>

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
          background: scrolled ? "rgba(8,8,8,0.97)" : "#0a0a0a",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className={`container mx-auto px-4 flex items-center gap-4 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img
              src="/images/logo-mediabud-main.png"
              alt="Media Bud – Skład Budowlany"
              className={`object-contain transition-all duration-300 group-hover:brightness-110 ${scrolled ? "h-12" : "h-14"}`}
              style={{ maxWidth: "200px", minWidth: "120px" }}
            />
          </Link>

          {/* Search bar — centered, full width */}
          <div className="flex-1 relative" ref={searchRef}>
            <div className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Szukaj produktów, marek, kategorii..."
                  className="pl-10 rounded-r-none border-r-0 text-white placeholder:text-gray-600 focus-visible:ring-0 text-sm h-11 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRight: "none",
                  }}
                  onFocus={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(248,24,40,0.5)"; }}
                  onBlur={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}
                  onKeyDown={e => {
                    if (e.key === "Enter" && searchQuery) {
                      navigate(`/szukaj?q=${encodeURIComponent(searchQuery)}`);
                      setSearchResults([]);
                    }
                  }}
                />
              </div>
              <button
                className="h-11 px-6 flex items-center justify-center gap-2 font-bold text-sm text-white flex-shrink-0 transition-all"
                style={{ background: "#f81828", borderRadius: "0 8px 8px 0" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(248,24,40,0.5)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                onClick={() => { if (searchQuery) { navigate(`/szukaj?q=${encodeURIComponent(searchQuery)}`); setSearchResults([]); } }}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Szukaj</span>
              </button>
            </div>

            {/* Autocomplete */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 rounded-b-xl overflow-hidden shadow-2xl"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)", borderTop: "2px solid #f81828" }}>
                {searchResults.map(p => (
                  <Link key={p.id} to={`/produkt/${p.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-[#f81828]/10 transition-colors group/sr last:border-0"
                    onClick={() => { setSearchResults([]); setSearchQuery(""); }}>
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-200 group-hover/sr:text-[#f81828] transition-colors truncate">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.brand} · {p.unit}</div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-gray-600 opacity-0 group-hover/sr:opacity-100 transition-opacity" />
                  </Link>
                ))}
                <div className="px-4 py-2 text-[10px] text-center text-gray-600 font-medium" style={{ background: "rgba(255,255,255,0.03)" }}>
                  Naciśnij Enter, aby zobaczyć wszystkie wyniki
                </div>
              </div>
            )}
          </div>

          {/* ── CTA buttons ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Phone — prominent red button */}
            <a href="tel:+48509567213"
              className="hidden lg:flex items-center gap-2 h-11 px-5 rounded-lg font-bold text-sm text-white transition-all duration-200 flex-shrink-0"
              style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.3)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(248,24,40,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.12)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
              <div className="w-6 h-6 rounded-full bg-[#f81828] flex items-center justify-center flex-shrink-0">
                <Phone className="w-3 h-3 text-white" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[9px] text-gray-400 font-normal">Zadzwoń teraz</div>
                <div className="text-xs font-black text-white">509 567 213</div>
              </div>
            </a>

            {/* Wycena counter */}
            <button onClick={openDrawer}
              className="relative flex items-center gap-2 h-11 px-4 rounded-lg font-bold text-sm transition-all duration-200 flex-shrink-0"
              style={{ background: "#f81828", color: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(248,24,40,0.5)"; }}
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
            <button className="lg:hidden p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}>
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

          <div className="relative container mx-auto px-4">
            <div className="flex items-center">
              {/* Category icon items */}
              {categories.map(cat => (
                <div key={cat.id} className="relative group/icon flex-1"
                  onMouseEnter={() => menuEnter(cat.id)}
                  onMouseLeave={menuLeave}>
                  <Link to={`/kategoria/${cat.slug}`}
                    className="flex flex-col items-center gap-1.5 py-3 px-2 transition-all duration-200 relative overflow-hidden"
                    style={{ color: activeMenu === cat.id ? "#f81828" : "#9ca3af" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f81828"; }}
                    onMouseLeave={e => { if (activeMenu !== cat.id) (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}>
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

                  {/* ── Mega dropdown ── */}
                  {cat.children && activeMenu === cat.id && (
                    <div className="fixed left-0 right-0 z-50 animate-fade-in"
                      style={{
                        top: "calc(var(--header-h, 140px))",
                        background: "#0c0c0c",
                        borderTop: "2px solid #f81828",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 24px 80px rgba(0,0,0,0.9)",
                      }}
                      onMouseEnter={() => menuEnter(cat.id)}
                      onMouseLeave={menuLeave}>
                      {/* Grid overlay */}
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
                      <div className="relative container mx-auto px-4 py-6">
                        <div className="flex gap-8">
                          {/* Category image + title */}
                          <div className="w-56 flex-shrink-0">
                            <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3">
                              {CAT_IMAGES[cat.slug]
                                ? <img src={CAT_IMAGES[cat.slug]} alt={cat.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.58)" }} />
                                : <div className="w-full h-full bg-[#1a1a1a]" />}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#f81828]" />
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <div className="font-display font-black text-white text-sm leading-tight">{cat.name}</div>
                                <div className="text-[10px] text-gray-400 mt-0.5">{cat.children.length} podkategorii</div>
                              </div>
                            </div>
                            <Link to={`/kategoria/${cat.slug}`}
                              className="flex items-center gap-1.5 text-xs text-[#f81828] font-bold hover:underline">
                              <ShoppingBag className="w-3 h-3" />Wszystkie produkty
                            </Link>
                          </div>

                          {/* Subcategory grid */}
                          <div className="flex-1">
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                              <span className="w-3 h-px bg-[#f81828]" />Podkategorie
                            </div>
                            <div className="grid grid-cols-3 xl:grid-cols-4 gap-0.5">
                              {cat.children.slice(0, 16).map(sub => (
                                <Link key={sub.id} to={`/kategoria/${sub.slug}`}
                                  className="group/sub flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-gray-400 hover:text-white hover:bg-[#f81828]/10 transition-all duration-150 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#f81828]/50 group-hover/sub:bg-[#f81828] transition-colors flex-shrink-0" />
                                  <span className="truncate">{sub.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* CTA panel */}
                          <div className="w-48 flex-shrink-0 flex flex-col gap-3">
                            <div className="rounded-xl p-4 flex-1"
                              style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.14),rgba(248,24,40,0.07))", border: "1px solid rgba(248,24,40,0.22)" }}>
                              <div className="text-xs text-[#f88090] font-bold uppercase tracking-wider mb-2">Szybka wycena</div>
                              <p className="text-xs text-gray-500 leading-relaxed mb-3">Potrzebujesz materiałów? Przygotujemy ofertę dla Twojego projektu.</p>
                              <Link to="/kontakt"
                                className="flex items-center justify-center gap-1.5 w-full bg-[#f81828] hover:bg-[#c8000f] text-white text-xs font-bold py-2 rounded-lg transition-all hover:shadow-[0_0_12px_rgba(248,24,40,0.4)]">
                                Zapytaj o ofertę <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                            <div className="rounded-xl p-3"
                              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                              <div className="flex items-center gap-2 mb-1.5">
                                <Phone className="w-3.5 h-3.5 text-[#f81828]" />
                                <span className="text-xs text-gray-400 font-semibold">Zadzwoń teraz</span>
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
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          Mobile nav drawer
      ════════════════════════════════════════════════ */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[85vh]" : "max-h-0"}`}>
        <div className="overflow-y-auto max-h-[85vh]"
          style={{ background: "#0d0d0d", borderTop: "2px solid #f81828" }}>

          {/* Contact strip */}
          <div className="flex items-center justify-around py-3 px-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#090909" }}>
            <a href="tel:+48509567213" className="flex items-center gap-2 text-xs font-bold text-[#f81828]">
              <Phone className="w-4 h-4" />+48 509 567 213
            </a>
            <a href="mailto:sprzedaz@mediabud.pl" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />Email
            </a>
            <span className="flex items-center gap-1.5 text-[10px] text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Pon–Pt 7–17
            </span>
          </div>

          {/* Category icon grid (mobile) */}
          <div className="grid grid-cols-4 gap-px p-3" style={{ background: "#0a0a0a" }}>
            {categories.map(cat => (
              <Link key={cat.id} to={`/kategoria/${cat.slug}`}
                className="flex flex-col items-center gap-1 py-3 px-1 rounded-xl transition-all active:bg-[#f81828]/20"
                style={{ color: "#9ca3af" }}
                onClick={() => setMobileOpen(false)}>
                {CAT_ICONS[cat.slug] ?? <Package className="w-5 h-5" />}
                <span className="text-[9px] font-bold text-center leading-tight line-clamp-2">{cat.name}</span>
              </Link>
            ))}
          </div>

          <div className="p-4 space-y-1.5">
            <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.06)" }} />
            {[
              { to: "/blog", label: "Blog techniczny" },
              { to: "/o-firmie", label: "O firmie" },
              { to: "/uslugi", label: "Nasze usługi" },
            ].map(link => (
              <Link key={link.to} to={link.to}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(false)}>
                {link.label}<ArrowRight className="w-4 h-4 text-gray-600" />
              </Link>
            ))}
            <div className="h-px my-3" style={{ background: "rgba(255,255,255,0.06)" }} />
            <Link to="/kontakt"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f81828] text-white text-sm font-black hover:bg-[#c8000f] transition-colors"
              onClick={() => setMobileOpen(false)}>
              <Mail className="w-4 h-4" />Zapytaj o ofertę
            </Link>
            <a href="tel:+48509567213"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-gray-300 transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              onClick={() => setMobileOpen(false)}>
              <Phone className="w-4 h-4" />+48 509 567 213
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
