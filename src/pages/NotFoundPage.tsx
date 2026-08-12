import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Home, Layers, Phone, ArrowRight, Construction } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { slugifyBrand } from "@/data/brands";

const POPULAR_CATEGORIES = [
  { name: "Chemia budowlana", slug: "chemia-budowlana" },
  { name: "Tynki i elewacje", slug: "tynki-i-elewacje" },
  { name: "Izolacje", slug: "izolacje" },
  { name: "Farby", slug: "farby-i-rozpuszczalniki" },
  { name: "Sucha zabudowa", slug: "sucha-zabudowa" },
  { name: "Dachy", slug: "dachy" },
];

const POPULAR_BRANDS = ["Weber", "Knauf", "Atlas", "Baumit", "Rockwool", "Ceresit"];

export default function NotFoundPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useSEO({
    title: "404 – Strona nie znaleziona | Media Bud Lublin",
    description: "Nie znaleziono strony. Wróć na stronę główną lub skorzystaj z wyszukiwarki produktów Media Bud Lublin.",
    noIndex: true,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/szukaj?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20" style={{ background: "#080808" }}>
      <div className="w-full max-w-2xl text-center">

        {/* Ikona + numer */}
        <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-3xl mb-8"
          style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.15)" }}>
          <Construction className="w-14 h-14 text-[#f81828] opacity-80" />
          <span className="absolute -top-3 -right-3 bg-[#f81828] text-white text-xs font-black px-2 py-1 rounded-full">
            404
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
          Strony nie&nbsp;ma na&nbsp;budowie
        </h1>
        <p className="text-gray-500 text-base mb-10 max-w-md mx-auto leading-relaxed">
          Ta strona nie istnieje lub została przeniesiona. Skorzystaj z wyszukiwarki albo wybierz kategorię.
        </p>

        {/* Wyszukiwarka */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-10 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Szukaj produktów, marek..."
              className="w-full h-12 pl-10 pr-4 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 focus:outline-none focus:border-[#f81828] focus:bg-white/8 transition-all placeholder:text-gray-600"
            />
          </div>
          <button
            type="submit"
            className="h-12 px-5 rounded-xl text-sm font-bold text-white transition-all hover:bg-[#c8000f] flex-shrink-0"
            style={{ background: "#f81828" }}
          >
            Szukaj
          </button>
        </form>

        {/* Szybkie linki */}
        <div className="grid grid-cols-2 gap-3 mb-10 max-w-sm mx-auto">
          <Link to="/"
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-all border border-white/10 hover:border-white/25 hover:bg-white/5">
            <Home className="w-4 h-4 text-[#f81828]" /> Strona główna
          </Link>
          <Link to="/produkty"
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-all border border-white/10 hover:border-white/25 hover:bg-white/5">
            <Layers className="w-4 h-4 text-[#f81828]" /> Wszystkie produkty
          </Link>
        </div>

        {/* Popularne kategorie */}
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Popularne kategorie</p>
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR_CATEGORIES.map(c => (
              <Link key={c.slug} to={`/kategoria/${c.slug}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-white/5 hover:bg-[#f81828]/10 hover:text-white border border-white/10 hover:border-[#f81828]/30 px-3 py-1.5 rounded-full transition-all">
                {c.name} <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Popularne marki */}
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Popularne marki</p>
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR_BRANDS.map(b => (
              <Link key={b} to={`/marki/${slugifyBrand(b)}`}
                className="text-xs font-bold text-[#f81828] bg-[#f81828]/8 hover:bg-[#f81828] hover:text-white border border-[#f81828]/20 hover:border-[#f81828] px-3 py-1.5 rounded-full transition-all">
                {b}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA telefon */}
        <a href="tel:+48533553344"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:bg-[#c8000f]"
          style={{ background: "#f81828" }}>
          <Phone className="w-4 h-4" /> Zadzwoń — doradzimy +48 533 553 344
        </a>
      </div>
    </div>
  );
}
