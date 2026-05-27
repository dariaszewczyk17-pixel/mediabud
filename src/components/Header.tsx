import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Phone, Mail, Menu, X, ChevronDown, Calculator, ShoppingBag } from "lucide-react";
import { categories } from "@/data/categories";
import { useWycena } from "@/hooks/useWycena";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";

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

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Search ── */
  useEffect(() => {
    if (searchQuery.length > 1) {
      const q = searchQuery.toLowerCase();
      setSearchResults(
        products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.tags.some((t) => t.includes(q))
          )
          .slice(0, 6)
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

  /* ── Close mobile on resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.12)]"
          : "bg-white shadow-sm"
      }`}
    >
      {/* ── Top info bar ── */}
      <div
        className={`bg-[#0a0a0a] text-white overflow-hidden transition-all duration-300 ${
          scrolled ? "max-h-0 py-0" : "max-h-10 py-1.5"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="ticker-wrap">
            <div className="ticker-content text-xs flex items-center gap-8 text-gray-300">
              {[
                <span key="tel" className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#f81828]" />
                  <a href="tel:+48509567213" className="hover:text-white transition-colors font-medium">
                    +48 509 567 213
                  </a>
                </span>,
                <span key="mail" className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#f81828]" />
                  <a href="mailto:sprzedaz@mediabud.pl" className="hover:text-white transition-colors">
                    sprzedaz@mediabud.pl
                  </a>
                </span>,
                <span key="t1">🚚 Dostawa na terenie Lublina i woj. lubelskiego</span>,
                <span key="t2">🔧 Bezpłatne doradztwo techniczne</span>,
                <span key="t3">⭐ Weber · Ceresit · Atlas · Knauf · Rockwool</span>,
                <span key="t4">🏗️ Kompleksowa obsługa deweloperów</span>,
                <span key="t5">📋 Pon–Pt 7:00–17:00 · Sob 8:00–14:00</span>,
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-1 whitespace-nowrap">
                  {item}
                  <span className="mx-3 text-gray-600">·</span>
                </span>
              ))}
              {/* duplicate for seamless loop */}
              {[
                <span key="tel2" className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#f81828]" />
                  <a href="tel:+48509567213" className="hover:text-white transition-colors font-medium">
                    +48 509 567 213
                  </a>
                </span>,
                <span key="mail2" className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#f81828]" />
                  <a href="mailto:sprzedaz@mediabud.pl" className="hover:text-white transition-colors">
                    sprzedaz@mediabud.pl
                  </a>
                </span>,
                <span key="d1">🚚 Dostawa na terenie Lublina i woj. lubelskiego</span>,
                <span key="d2">🔧 Bezpłatne doradztwo techniczne</span>,
                <span key="d3">⭐ Weber · Ceresit · Atlas · Knauf · Rockwool</span>,
                <span key="d4">🏗️ Kompleksowa obsługa deweloperów</span>,
                <span key="d5">📋 Pon–Pt 7:00–17:00 · Sob 8:00–14:00</span>,
              ].map((item, i) => (
                <span key={`dup-${i}`} className="flex items-center gap-1 whitespace-nowrap">
                  {item}
                  <span className="mx-3 text-gray-600">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <div
        className={`container mx-auto px-4 flex items-center gap-4 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 group">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 bg-[#f81828] rounded-lg flex items-center justify-center overflow-hidden shadow-[0_2px_8px_rgba(248,24,40,0.35)] transition-shadow group-hover:shadow-[0_4px_16px_rgba(248,24,40,0.5)]">
              <span className="text-white font-black text-base font-display tracking-tight leading-none">MB</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="leading-none">
              <div className="font-black text-[#0a0a0a] text-base tracking-tight font-display leading-tight">
                MEDIA BUD
              </div>
              <div className="text-[10px] text-gray-500 font-medium leading-tight tracking-wider uppercase">
                Skład Budowlany · Lublin
              </div>
            </div>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <div className="flex group">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj produktów, marek, kategorii..."
              className="rounded-r-none border-r-0 focus-visible:ring-0 border-gray-200 focus-visible:border-[#f81828] transition-colors text-sm h-10"
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery) {
                  navigate(`/szukaj?q=${encodeURIComponent(searchQuery)}`);
                  setSearchResults([]);
                }
              }}
            />
            <button
              className="h-10 px-4 bg-[#f81828] hover:bg-[#d4000e] rounded-r-md flex items-center justify-center transition-colors"
              onClick={() => {
                if (searchQuery) navigate(`/szukaj?q=${encodeURIComponent(searchQuery)}`);
              }}
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Autocomplete */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-xl shadow-2xl z-50 overflow-hidden border-t-0">
              {searchResults.map((p) => (
                <Link
                  key={p.id}
                  to={`/produkt/${p.slug}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 border-b last:border-0 transition-colors group/item"
                  onClick={() => { setSearchResults([]); setSearchQuery(""); }}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 group-hover/item:text-[#f81828] transition-colors truncate">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500">{p.brand} · {p.unit}</div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-gray-400 -rotate-90 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </Link>
              ))}
              <div className="px-4 py-2 bg-gray-50 text-xs text-center text-gray-400 font-medium">
                Naciśnij Enter, aby zobaczyć wszystkie wyniki
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <a
            href="tel:+48509567213"
            className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#f81828] transition-colors"
          >
            <div className="w-7 h-7 bg-[#f81828]/10 rounded-full flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-[#f81828]" />
            </div>
            <span>+48 509 567 213</span>
          </a>

          <button
            onClick={openDrawer}
            className="relative flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#f81828] text-[#f81828] hover:bg-[#f81828] hover:text-white transition-all duration-200 text-sm font-semibold"
          >
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Wycena</span>
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-[#f81828] text-white rounded-full text-[10px] font-bold flex items-center justify-center leading-none p-0.5">
                {totalCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="sr-only">Menu</span>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Desktop Navigation ── */}
      <nav className="bg-[#f81828] hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="relative group/nav"
                onMouseEnter={() => setActiveMenu(cat.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={`/kategoria/${cat.slug}`}
                  className="flex items-center gap-1 px-3 py-2.5 text-white text-[13px] font-semibold hover:bg-[#c8000f] transition-colors whitespace-nowrap"
                >
                  {cat.name}
                  {cat.children && (
                    <ChevronDown className="w-3 h-3 transition-transform group-hover/nav:rotate-180 duration-200" />
                  )}
                </Link>

                {/* Mega dropdown */}
                {cat.children && activeMenu === cat.id && (
                  <div className="absolute top-full left-0 bg-white shadow-2xl rounded-b-xl z-50 min-w-[300px] border-t-2 border-[#f81828] animate-scale-in origin-top">
                    <div className="p-4 grid grid-cols-2 gap-0.5">
                      {cat.children.slice(0, 16).map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/kategoria/${sub.slug}`}
                          className="block px-3 py-2 text-[13px] text-gray-700 hover:bg-[#fff0f0] hover:text-[#f81828] rounded-lg transition-colors truncate font-medium"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t px-4 py-2.5 bg-gray-50 rounded-b-xl">
                      <Link
                        to={`/kategoria/${cat.slug}`}
                        className="text-xs text-[#f81828] font-semibold hover:underline flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Wszystkie produkty w kategorii {cat.name}
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li className="ml-auto">
              <Link
                to="/blog"
                className="flex items-center px-3 py-2.5 text-white/90 hover:text-white text-[13px] font-semibold hover:bg-[#c8000f] transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/o-firmie"
                className="flex items-center px-3 py-2.5 text-white/90 hover:text-white text-[13px] font-semibold hover:bg-[#c8000f] transition-colors"
              >
                O firmie
              </Link>
            </li>
            <li>
              <Link
                to="/kontakt"
                className="flex items-center gap-1.5 mx-2 my-1 px-4 py-1.5 bg-white text-[#f81828] text-[13px] font-bold rounded-md hover:bg-yellow-50 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Zapytaj o ofertę
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Mobile nav ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[75vh]" : "max-h-0"
        }`}
      >
        <div className="bg-white border-t shadow-lg overflow-y-auto max-h-[75vh]">
          <div className="p-4 space-y-0.5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/kategoria/${cat.slug}`}
                className="flex items-center justify-between px-3 py-2.5 text-gray-800 text-sm font-semibold rounded-lg hover:bg-[#fff0f0] hover:text-[#f81828] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
                <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Link
              to="/blog"
              className="block px-3 py-2.5 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Blog techniczny
            </Link>
            <Link
              to="/o-firmie"
              className="block px-3 py-2.5 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              O firmie
            </Link>
            <Link
              to="/uslugi"
              className="block px-3 py-2.5 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Usługi
            </Link>
            <div className="h-px bg-gray-100 my-2" />
            <Link
              to="/kontakt"
              className="block px-3 py-3 bg-[#f81828] text-white text-sm font-bold rounded-lg text-center"
              onClick={() => setMobileOpen(false)}
            >
              📧 Zapytaj o ofertę
            </Link>
            <a
              href="tel:+48509567213"
              className="block px-3 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg text-center"
              onClick={() => setMobileOpen(false)}
            >
              📞 +48 509 567 213
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
