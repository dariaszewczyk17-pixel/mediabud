import { Link, useSearchParams } from "react-router-dom";
import { Search, ChevronRight, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { products as staticProducts } from "@/data/products";
import { useAllProducts } from "@/hooks/useSanityData";
import { sanityProductToLegacy, type SanityProduct } from "@/lib/adapters";
import { mergeProductCollections } from "@/lib/productMerge";
import { searchProducts } from "@/lib/productSearch";
import { ProductCard } from "@/components/Commerce";
import { Button } from "@/components/ui/button";

const RESULTS_PER_PAGE = 12;

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const { data: sanityProducts } = useAllProducts();

  const mergedProducts = useMemo(() => {
    const sanityLegacyProducts = ((sanityProducts as SanityProduct[] | undefined) ?? []).map(sanityProductToLegacy);
    return mergeProductCollections(sanityLegacyProducts, staticProducts);
  }, [sanityProducts]);

  const results = useMemo(
    () => (query ? searchProducts(mergedProducts, query) : []),
    [mergedProducts, query],
  );

  const totalPages = Math.max(1, Math.ceil(results.length / RESULTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedResults = results.slice((safePage - 1) * RESULTS_PER_PAGE, safePage * RESULTS_PER_PAGE);

  if (!query) {
    return (
      <div className="min-h-screen" style={{ background: "#080808" }}>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mx-auto max-w-2xl rounded-3xl p-8" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
            <Search className="w-10 h-10 text-[#f81828] mx-auto mb-4" />
            <h1 className="text-3xl font-black text-white mb-3 font-display">Wyszukaj produkty</h1>
            <p className="text-gray-400 mb-6">Wpisz nazwę produktu, markę, kod SKU albo frazę techniczną w górnym polu wyszukiwania, aby zobaczyć wyniki.</p>
            <Link to="/produkty">
              <Button className="bg-[#f81828] hover:bg-[#c8000f]">Przeglądaj wszystkie produkty</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-xs text-gray-600 flex-wrap">
            <Link to="/" className="hover:text-[#f81828] transition-colors">Strona główna</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-300 font-medium">Wyniki wyszukiwania</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="rounded-3xl p-8 mb-8" style={{ background: "linear-gradient(135deg, rgba(248,24,40,0.12), rgba(248,24,40,0.03))", border: "1px solid rgba(248,24,40,0.15)" }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.18)" }}>
              <Search className="w-6 h-6 text-[#f81828]" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#f88090] font-bold mb-2">Wyszukiwanie w katalogu</div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight font-display mb-2">Wyniki dla: „{query}”</h1>
              <p className="text-gray-400 text-sm md:text-base">Znaleziono <strong className="text-white">{results.length}</strong> dopasowań w produktach z Sanity i lokalnej bazy.</p>
            </div>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="rounded-3xl p-8 text-center" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="text-2xl font-black text-white mb-3 font-display">Brak wyników dla: „{query}”</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">Spróbuj innej nazwy produktu, marki, frazy technicznej albo kodu SKU. Możesz też przejść do wszystkich produktów i skorzystać z filtrów kategorii.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/produkty">
                <Button className="bg-[#f81828] hover:bg-[#c8000f]">Przeglądaj wszystkie produkty</Button>
              </Link>
              <Link to="/kontakt" className="text-sm text-[#f81828] hover:underline flex items-center gap-1 font-medium">
                Zapytaj o pomoc doradcy <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {paginatedResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const nextParams = new URLSearchParams(searchParams);
                  nextParams.set("page", String(page));
                  return (
                    <Link
                      key={page}
                      to={`/szukaj?${nextParams.toString()}`}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${page === safePage ? "text-white" : "text-gray-400 hover:text-white"}`}
                      style={page === safePage
                        ? { background: "#f81828", boxShadow: "0 0 16px rgba(248,24,40,0.35)" }
                        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {page}
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
