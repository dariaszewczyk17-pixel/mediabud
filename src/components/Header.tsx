import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Phone, Mail, Menu, X, ChevronDown, Calculator, ShoppingBag, MapPin, Clock, ArrowRight, Zap } from "lucide-react";
import { categories } from "@/data/categories";
import { useWycena } from "@/hooks/useWycena";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";

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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { items, openDrawer } = useWycena();
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMenuEnter = (id: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(id);
  };
  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 100);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-[0_4px_40px_rgba(0,0,0,0.7)]" : ""}`}>

      {/* ── Top info bar ── */}
      <div className={`bg-[#0d0d0d] border-b border-[#f81828]/10 overflow-hidden transition-all duration-300 ${scrolled ? "max-h-0 py-0" : "max-h-9 py-1.5"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <div className="ticker-wrap flex-1">
              <div className="ticker-content flex items-center gap-8">
                {[
                  <span key="t1" className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#f81828]" /> Lublin, woj. lubelskie
                  </span>,
                  <span key="t2" className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#f81828]" /> Pon–Pt 7:00–17:00 · Sob 8:00–14:00
                  </span>,
                  <span key="t3" className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-[#f81828]" /> Dostawa na teren Lublina i okolic</span>,
                  <span key="t4">🔧 Bezpłatne doradztwo techniczne</span>,
                  <span key="t5">⭐ Weber · Ceresit · Atlas · Knauf · Rockwool · Swisspor</span>,
                  <span key="t6">🏗️ Kompleksowa obsługa deweloperów i firm budowlanych</span>,
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-1 whitespace-nowrap">
                    {item}<span className="mx-3 text-gray-800">·</span>
                  </span>
                ))}
                {/* duplicate for seamless loop */}
                {[
                  <span key="d1" className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#f81828]" /> Lublin, woj. lubelskie</span>,
                  <span key="d2" className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-[#f81828]" /> Pon–Pt 7:00–17:00 · Sob 8:00–14:00</span>,
                  <span key="d3" className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-[#f81828]" /> Dostawa na teren Lublina i okolic</span>,
                  <span key="d4">🔧 Bezpłatne doradztwo techniczne</span>,
                  <span key="d5">⭐ Weber · Ceresit · Atlas · Knauf · Rockwool · Swisspor</span>,
                  <span key="d6">🏗️ Kompleksowa obsługa deweloperów i firm budowlanych</span>,
                ].map((item, i) => (
                  <span key={`d-${i}`} className="flex items-center gap-1 whitespace-nowrap">
                    {item}<span className="mx-3 text-gray-800">·</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0 ml-6">
              <a href="tel:+48509567213" className="flex items-center gap-1.5 hover:text-[#f81828] transition-colors">
                <Phone className="w-3 h-3 text-[#f81828]" />+48 509 567 213
              </a>
              <a href="mailto:sprzedaz@mediabud.pl" className="flex items-center gap-1.5 hover:text-[#f81828] transition-colors">
                <Mail className="w-3 h-3 text-[#f81828]" />sprzedaz@mediabud.pl
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#080808]/95 backdrop-blur-xl"
            : "bg-[#0a0a0a]"
        }`}
        style={scrolled ? { borderBottom: "1px solid rgba(248,24,40,0.12)" } : {}}
      >
        <div className={`container mx-auto px-4 flex items-center gap-4 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <div className="flex items-center gap-2">
              <div className="relative overflow-hidden rounded-md transition-all duration-300 group-hover:brightness-110">
                <img
                  src="/images/logo-mediabud-main.png"
                  alt="Media Bud – Skład Budowlany"
                  className={`object-contain transition-all duration-300 ${scrolled ? "h-9" : "h-10"}`}
                  style={{ maxWidth: "140px" }}
                />
              </div>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <div className="flex group">
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Szukaj produktów, marek, kategorii..."
                className="rounded-r-none border-r-0 text-white placeholder:text-gray-600 focus-visible:ring-0 text-sm h-10 transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRight: "none",
                }}
                onFocus={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(248,24,40,0.45)"; }}
                onBlur={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                onKeyDown={e => {
                  if (e.key === "Enter" && searchQuery) {
                    navigate(`/szukaj?q=${encodeURIComponent(searchQuery)}`);
                    setSearchResults([]);
                  }
                }}
              />
              <button
                className="h-10 px-5 bg-[#f81828] hover:bg-[#d4000e] rounded-r-md flex items-center justify-center transition-all duration-200 flex-shrink-0 hover:shadow-[0_0_16px_rgba(248,24,40,0.4)]"
                onClick={() => { if (searchQuery) navigate(`/szukaj?q=${encodeURIComponent(searchQuery)}`); }}
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Autocomplete dropdown */}
            {searchResults.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 z-50 overflow-hidden rounded-b-xl shadow-2xl"
                style={{
                  background: "#0f0f0f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderTop: "2px solid #f81828",
                }}
              >
                {searchResults.map(p => (
                  <Link
                    key={p.id}
                    to={`/produkt/${p.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-[#f81828]/10 transition-colors group/item last:border-0"
                    onClick={() => { setSearchResults([]); setSearchQuery(""); }}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-200 group-hover/item:text-[#f81828] transition-colors truncate">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.brand} · {p.unit}</div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-gray-600 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </Link>
                ))}
                <div className="px-4 py-2 text-xs text-center text-gray-600 font-medium" style={{ background: "rgba(255,255,255,0.03)" }}>
                  Naciśnij Enter, aby zobaczyć wszystkie wyniki
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <a
              href="tel:+48509567213"
              className="hidden xl:flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(248,24,40,0.15)" }}>
                <Phone className="w-3.5 h-3.5 text-[#f81828]" />
              </div>
              <span>+48 509 567 213</span>
            </a>

            <button
              onClick={openDrawer}
              className="relative flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-[#f81828] text-[#f81828] hover:bg-[#f81828] hover:text-white transition-all duration-200 text-sm font-bold hover:shadow-[0_0_16px_rgba(248,24,40,0.35)]"
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Wycena</span>
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[#f81828] text-white rounded-full text-[10px] font-black flex items-center justify-center leading-none px-0.5 animate-pulse-ring">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/8 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden md:block" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container mx-auto px-4">
            <ul className="flex items-center">
              {categories.map(cat => (
                <li
                  key={cat.id}
                  className="relative group/nav"
                  onMouseEnter={() => handleMenuEnter(cat.id)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    to={`/kategoria/${cat.slug}`}
                    className="flex items-center gap-1 px-3 py-3 text-[13px] font-semibold text-gray-400 hover:text-white transition-colors whitespace-nowrap relative"
                  >
                    {cat.name}
                    {cat.children && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === cat.id ? "rotate-180 text-[#f81828]" : ""}`} />
                    )}
                    {/* red underline */}
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#f81828] transition-transform duration-200 origin-left ${activeMenu === cat.id ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"}`} />
                  </Link>

                  {/* ── Full-width Mega Dropdown ── */}
                  {cat.children && activeMenu === cat.id && (
                    <div
                      className="fixed left-0 right-0 z-50 animate-fade-in"
                      style={{
                        top: scrolled ? "calc(var(--header-h, 100px) - 4px)" : "calc(var(--header-h, 110px) - 4px)",
                        background: "#0c0c0c",
                        borderTop: "2px solid #f81828",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                      }}
                      onMouseEnter={() => handleMenuEnter(cat.id)}
                      onMouseLeave={handleMenuLeave}
                    >
                      {/* Grid bg overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: "linear-gradient(rgba(248,24,40,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(248,24,40,0.03) 1px, transparent 1px)",
                          backgroundSize: "40px 40px",
                        }}
                      />
                      <div className="relative container mx-auto px-4 py-6">
                        <div className="flex gap-8">
                          {/* Category header + image */}
                          <div className="w-56 flex-shrink-0">
                            <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3">
                              {catImages[cat.slug] ? (
                                <img
                                  src={catImages[cat.slug]}
                                  alt={cat.name}
                                  className="w-full h-full object-cover"
                                  style={{ filter: "brightness(0.6)" }}
                                />
                              ) : (
                                <div className="w-full h-full bg-[#1a1a1a]" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <div className="font-display font-black text-white text-sm leading-tight">{cat.name}</div>
                                {cat.children && (
                                  <div className="text-[10px] text-gray-400 mt-0.5">{cat.children.length} podkategorii</div>
                                )}
                              </div>
                              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#f81828]" />
                            </div>
                            <Link
                              to={`/kategoria/${cat.slug}`}
                              className="flex items-center gap-1.5 text-xs text-[#f81828] font-bold hover:underline"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              Wszystkie produkty
                            </Link>
                          </div>

                          {/* Subcategories grid */}
                          <div className="flex-1">
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                              <span className="w-3 h-px bg-[#f81828]" />Podkategorie
                            </div>
                            <div className="grid grid-cols-3 xl:grid-cols-4 gap-0.5">
                              {cat.children.slice(0, 16).map(sub => (
                                <Link
                                  key={sub.id}
                                  to={`/kategoria/${sub.slug}`}
                                  className="group/sub flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-gray-400 hover:text-white hover:bg-[#f81828]/10 transition-all duration-150 font-medium"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#f81828]/50 group-hover/sub:bg-[#f81828] transition-colors flex-shrink-0" />
                                  <span className="truncate">{sub.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* CTA panel */}
                          <div className="w-48 flex-shrink-0 flex flex-col gap-3">
                            <div
                              className="rounded-xl p-4 flex-1"
                              style={{
                                background: "linear-gradient(135deg, rgba(248,24,40,0.12), rgba(248,24,40,0.06))",
                                border: "1px solid rgba(248,24,40,0.20)",
                              }}
                            >
                              <div className="text-xs text-[#f88090] font-bold uppercase tracking-wider mb-2">Szybka wycena</div>
                              <p className="text-xs text-gray-500 leading-relaxed mb-3">Potrzebujesz materiałów? Przygotujemy wycenę dla Twojego projektu.</p>
                              <Link
                                to="/kontakt"
                                className="flex items-center justify-center gap-1.5 w-full bg-[#f81828] hover:bg-[#c8000f] text-white text-xs font-bold py-2 rounded-lg transition-all hover:shadow-[0_0_12px_rgba(248,24,40,0.4)]"
                              >
                                Zapytaj o ofertę <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                            <div
                              className="rounded-xl p-3"
                              style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                              }}
                            >
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
                </li>
              ))}

              <li className="ml-auto">
                <Link to="/blog" className="flex items-center px-3 py-3 text-gray-500 hover:text-white text-[13px] font-semibold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/o-firmie" className="flex items-center px-3 py-3 text-gray-500 hover:text-white text-[13px] font-semibold transition-colors">
                  O firmie
                </Link>
              </li>
              <li>
                <Link to="/uslugi" className="flex items-center px-3 py-3 text-gray-500 hover:text-white text-[13px] font-semibold transition-colors">
                  Usługi
                </Link>
              </li>
              <li className="ml-1">
                <Link
                  to="/kontakt"
                  className="flex items-center gap-1.5 mx-1 my-1.5 px-4 py-1.5 bg-[#f81828] text-white text-[13px] font-black rounded-md hover:bg-[#d4000e] transition-all hover:shadow-[0_0_16px_rgba(248,24,40,0.4)]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Zapytaj o ofertę
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* ── Mobile nav ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[80vh]" : "max-h-0"}`}>
        <div className="overflow-y-auto max-h-[80vh]" style={{ background: "#0d0d0d", borderTop: "2px solid #f81828" }}>
          <div className="p-4 space-y-0.5">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/kategoria/${cat.slug}`}
                className="flex items-center justify-between px-3 py-2.5 text-gray-300 text-sm font-semibold rounded-lg hover:bg-[#f81828]/10 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
                <ChevronDown className="w-4 h-4 text-gray-600 -rotate-90" />
              </Link>
            ))}
            <div className="h-px my-2" style={{ background: "rgba(255,255,255,0.06)" }} />
            <Link to="/blog" className="block px-3 py-2.5 text-gray-500 text-sm font-medium rounded-lg hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Blog techniczny</Link>
            <Link to="/o-firmie" className="block px-3 py-2.5 text-gray-500 text-sm font-medium rounded-lg hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>O firmie</Link>
            <Link to="/uslugi" className="block px-3 py-2.5 text-gray-500 text-sm font-medium rounded-lg hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Usługi</Link>
            <div className="h-px my-2" style={{ background: "rgba(255,255,255,0.06)" }} />
            <Link to="/kontakt" className="flex items-center justify-center gap-2 px-3 py-3 bg-[#f81828] text-white text-sm font-black rounded-lg hover:bg-[#d4000e] transition-colors" onClick={() => setMobileOpen(false)}>
              <Mail className="w-4 h-4" /> Zapytaj o ofertę
            </Link>
            <a href="tel:+48509567213" className="flex items-center justify-center gap-2 px-3 py-3 text-gray-300 text-sm font-semibold rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.1)" }} onClick={() => setMobileOpen(false)}>
              <Phone className="w-4 h-4" /> +48 509 567 213
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
