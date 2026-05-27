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
  const { items, openDrawer } = useWycena();
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-black text-white text-xs py-2">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /><a href="tel:+48509567213" className="hover:text-red-400 transition-colors">+48 509 567 213</a></span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /><a href="mailto:sprzedaz@mediabud.pl" className="hover:text-red-400 transition-colors">sprzedaz@mediabud.pl</a></span>
          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <span>📦 Dostawa na terenie Lublina</span>
            <span>🔧 Doradztwo techniczne</span>
            <span>⭐ Profesjonalna obsługa</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-black text-lg">MB</span>
            </div>
            <div>
              <div className="font-black text-lg leading-none text-black">MEDIA BUD</div>
              <div className="text-xs text-gray-500 leading-none">Skład Budowlany Lublin</div>
            </div>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <div className="flex">
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Szukaj produktów, marek, kategorii..."
              className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:border-primary"
              onKeyDown={e => { if (e.key === "Enter" && searchQuery) { navigate(`/szukaj?q=${encodeURIComponent(searchQuery)}`); setSearchResults([]); }}}
            />
            <Button
              className="rounded-l-none bg-primary hover:bg-red-700 px-4"
              onClick={() => { if (searchQuery) navigate(`/szukaj?q=${encodeURIComponent(searchQuery)}`); }}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-xl z-50 overflow-hidden">
              {searchResults.map(p => (
                <Link
                  key={p.id}
                  to={`/produkt/${p.slug}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b last:border-0 transition-colors"
                  onClick={() => { setSearchResults([]); setSearchQuery(""); }}
                >
                  <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.brand} · {p.unit}</div>
                  </div>
                </Link>
              ))}
              <div className="px-4 py-2 bg-gray-50 text-xs text-center text-gray-500">
                Naciśnij Enter, aby zobaczyć wszystkie wyniki
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a href="tel:+48509567213" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            <Phone className="w-4 h-4 text-primary" />
            <span>+48 509 567 213</span>
          </a>
          <Button
            variant="outline"
            className="relative flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
            onClick={openDrawer}
          >
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Wycena</span>
            {totalCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                {totalCount}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-primary hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center">
            {categories.map(cat => (
              <li
                key={cat.id}
                className="relative group"
                onMouseEnter={() => setActiveMenu(cat.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={`/kategoria/${cat.slug}`}
                  className="flex items-center gap-1 px-3 py-3 text-white text-sm font-medium hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                  {cat.name}
                  {cat.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {cat.children && activeMenu === cat.id && (
                  <div className="absolute top-full left-0 bg-white shadow-2xl rounded-b-lg z-50 min-w-[280px] border-t-2 border-primary">
                    <div className="p-4 grid grid-cols-2 gap-1">
                      {cat.children.slice(0, 16).map(sub => (
                        <Link
                          key={sub.id}
                          to={`/kategoria/${sub.slug}`}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-primary rounded transition-colors truncate"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t px-4 py-2 bg-gray-50 rounded-b-lg">
                      <Link to={`/kategoria/${cat.slug}`} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3" /> Pokaż wszystkie w {cat.name}
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li className="ml-auto">
              <Link to="/blog" className="flex items-center px-3 py-3 text-white text-sm font-medium hover:bg-red-700 transition-colors">Blog</Link>
            </li>
            <li>
              <Link to="/kontakt" className="flex items-center px-3 py-3 text-yellow-300 text-sm font-bold hover:bg-red-700 transition-colors">Zapytaj o ofertę</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="p-4 space-y-1">
            {categories.map(cat => (
              <div key={cat.id}>
                <Link
                  to={`/kategoria/${cat.slug}`}
                  className="flex items-center justify-between px-3 py-2 text-gray-800 font-medium rounded hover:bg-red-50 hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              </div>
            ))}
            <hr />
            <Link to="/blog" className="block px-3 py-2 text-gray-700 hover:bg-red-50 rounded" onClick={() => setMobileOpen(false)}>Blog techniczny</Link>
            <Link to="/o-firmie" className="block px-3 py-2 text-gray-700 hover:bg-red-50 rounded" onClick={() => setMobileOpen(false)}>O firmie</Link>
            <Link to="/uslugi" className="block px-3 py-2 text-gray-700 hover:bg-red-50 rounded" onClick={() => setMobileOpen(false)}>Usługi</Link>
            <Link to="/kontakt" className="block px-3 py-2 bg-primary text-white rounded font-medium" onClick={() => setMobileOpen(false)}>Kontakt / Zapytaj o ofertę</Link>
          </div>
        </div>
      )}
    </header>
  );
}
