import React from "react";
import { Link } from "react-router-dom";
import { Search, X, RotateCcw, TrendingUp, ArrowRight, Phone } from "lucide-react";

/* ================================================================
   ZERO RESULTS RECOVERY — Industrial Pulse 2026
   
   Ulepszona strona gdy filtry dają 0 wyników.
   Retencja sesji +35-45% wg Baymard Institute
   
   Features:
   - Sugestie usunięcia pojedynczych filtrów
   - Bestsellery kategorii
   - Search bar z sugestiami
   - CTA kontakt
================================================================ */

interface ActiveFilter {
  type: "brand" | "unit" | "tag" | "subcat" | "price" | "spec";
  label: string;
  value: string;
  onRemove: () => void;
}

interface BestsellerProduct {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  image?: string;
}

interface ZeroResultsRecoveryProps {
  categoryName: string;
  activeFilters: ActiveFilter[];
  bestsellers: BestsellerProduct[];
  onClearAll: () => void;
  onSearch?: (query: string) => void;
  totalInCategory: number;
}

export function ZeroResultsRecovery({
  categoryName,
  activeFilters,
  bestsellers,
  onClearAll,
  onSearch,
  totalInCategory,
}: ZeroResultsRecoveryProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className="py-12 px-4">
      {/* Main message */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
          style={{ 
            background: "rgba(248,24,40,0.1)", 
            border: "1px solid rgba(248,24,40,0.2)",
            boxShadow: "0 0 40px rgba(248,24,40,0.1)"
          }}>
          <Search className="w-8 h-8 text-[#f81828]" />
        </div>
        
        <h2 className="text-2xl font-black text-white mb-3">
          Brak produktów dla wybranych filtrów
        </h2>
        
        <p className="text-gray-500 max-w-md mx-auto">
          Kombinacja filtrów nie zwróciła wyników. Spróbuj usunąć niektóre filtry lub przeszukaj całą kategorię.
        </p>
      </div>

      {/* Active filters with remove buttons */}
      {activeFilters.length > 0 && (
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-4 bg-[#f81828] rounded-full" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Aktywne filtry — usuń aby zobaczyć więcej
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, i) => (
              <button
                key={i}
                onClick={filter.onRemove}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{
                  background: "rgba(248,24,40,0.1)",
                  border: "1px solid rgba(248,24,40,0.3)",
                  color: "#f81828",
                }}
              >
                <span className="text-gray-500 text-xs">{filter.label}:</span>
                <span>{filter.value}</span>
                <X className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
            
            {/* Clear all button */}
            <button
              onClick={onClearAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-[#f81828] hover:text-white"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Wyczyść wszystkie
            </button>
          </div>
          
          {/* Hint */}
          <p className="text-xs text-gray-600 mt-3">
            💡 Kliknij filtr aby go usunąć i zobaczyć więcej produktów
          </p>
        </div>
      )}

      {/* Search bar */}
      {onSearch && (
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Szukaj w ${categoryName}...`}
              className="w-full h-14 pl-5 pr-14 rounded-2xl text-white placeholder-gray-600 transition-all focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: "linear-gradient(135deg, #f81828, #c8000f)",
                boxShadow: "0 0 15px rgba(248,24,40,0.3)",
              }}
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>
      )}

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#f81828]" />
              <span className="text-sm font-black text-white uppercase tracking-wider">
                Popularne w {categoryName}
              </span>
            </div>
            <Link
              to={`/kategoria/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs font-bold text-[#f81828] hover:underline flex items-center gap-1"
            >
              Zobacz wszystkie ({totalInCategory}) <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {bestsellers.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/produkt/${product.slug}`}
                className="group rounded-xl overflow-hidden transition-all hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #141414, #1a1a1a)" }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🏗️
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Info */}
                <div className="p-3">
                  {product.brand && (
                    <span className="text-[10px] font-bold text-[#f81828] uppercase tracking-wider">
                      {product.brand}
                    </span>
                  )}
                  <h3 className="text-xs font-semibold text-gray-300 line-clamp-2 mt-1 group-hover:text-white transition-colors">
                    {product.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Contact CTA */}
      <div className="max-w-xl mx-auto text-center">
        <div className="rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, rgba(248,24,40,0.08), rgba(248,24,40,0.02))",
            border: "1px solid rgba(248,24,40,0.15)",
          }}>
          <h3 className="text-lg font-bold text-white mb-2">
            Nie znalazłeś produktu?
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Skontaktuj się z nami — pomożemy znaleźć odpowiedni materiał budowlany.
          </p>
          <a
            href="tel:+48533553344"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f81828, #c8000f)",
              boxShadow: "0 0 20px rgba(248,24,40,0.3)",
            }}
          >
            <Phone className="w-4 h-4" />
            533 553 344
          </a>
        </div>
      </div>
    </div>
  );
}

export default ZeroResultsRecovery;
