import { Link, useSearchParams } from "react-router-dom";
import { Search, ChevronRight, ArrowRight, SlidersHorizontal, Sparkles, Star } from "lucide-react";
import { useMemo } from "react";
import { products as staticProducts } from "@/data/products";
import { useAllProducts } from "@/hooks/useSanityData";
import { sanityProductToLegacy, type SanityProduct } from "@/lib/adapters";
import { mergeProductCollections } from "@/lib/productMerge";
import { searchProducts, scoreProductAgainstQuery } from "@/lib/productSearch";
import { ProductCard } from "@/components/Commerce";
import { Button } from "@/components/ui/button";

type SortOption = "relevance" | "name-asc" | "name-desc" | "brand-asc" | "featured";

const RESULTS_PER_PAGE = 12;
const ALL_BRANDS = "__all_brands__";
const ALL_CATEGORIES = "__all_categories__";
const DEFAULT_SORT: SortOption = "relevance";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const selectedBrand = searchParams.get("brand") || ALL_BRANDS;
  const selectedCategory = searchParams.get("category") || ALL_CATEGORIES;
  const featuredOnly = searchParams.get("featured") === "1";
  const sortBy = (searchParams.get("sort") as SortOption) || DEFAULT_SORT;
  const { data: sanityProducts } = useAllProducts();

  const mergedProducts = useMemo(() => {
    const sanityLegacyProducts = ((sanityProducts as SanityProduct[] | undefined) ?? []).map(sanityProductToLegacy);
    return mergeProductCollections(sanityLegacyProducts, staticProducts);
  }, [sanityProducts]);

  const results = useMemo(
    () => (query ? searchProducts(mergedProducts, query) : []),
    [mergedProducts, query],
  );

  const availableBrands = useMemo(
    () => Array.from(new Set(results.map((product) => product.brand).filter(Boolean))).sort((a, b) => a.localeCompare(b, "pl")),
    [results],
  );

  const availableCategories = useMemo(
    () => Array.from(new Set(results.map((product) => product.categorySlug).filter(Boolean))).sort((a, b) => a.localeCompare(b, "pl")),
    [results],
  );

  const filteredResults = useMemo(() => {
    const next = results.filter((product) => {
      if (selectedBrand !== ALL_BRANDS && product.brand !== selectedBrand) return false;
      if (selectedCategory !== ALL_CATEGORIES && product.categorySlug !== selectedCategory) return false;
      if (featuredOnly && !product.isFeatured) return false;
      return true;
    });

    const sorted = [...next];

    switch (sortBy) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "pl"));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name, "pl"));
        break;
      case "brand-asc":
        sorted.sort((a, b) => a.brand.localeCompare(b.brand, "pl") || a.name.localeCompare(b.name, "pl"));
        break;
      case "featured":
        sorted.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)) || a.name.localeCompare(b.name, "pl"));
        break;
      case "relevance":
      default:
        sorted.sort(
          (a, b) =>
            scoreProductAgainstQuery(b, query) - scoreProductAgainstQuery(a, query) ||
            a.name.localeCompare(b.name, "pl"),
        );
        break;
    }

    return sorted;
  }, [featuredOnly, query, results, selectedBrand, selectedCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / RESULTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedResults = filteredResults.slice((safePage - 1) * RESULTS_PER_PAGE, safePage * RESULTS_PER_PAGE);

  const createSearchLink = (updates: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === ALL_BRANDS || value === ALL_CATEGORIES || (key === "sort" && value === DEFAULT_SORT)) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });
    nextParams.delete("page");
    return `/szukaj?${nextParams.toString()}`;
  };

  const createPaginationLink = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(page));
    return `/szukaj?${nextParams.toString()}`;
  };

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
              <p className="text-gray-400 text-sm md:text-base">Znaleziono <strong className="text-white">{results.length}</strong> dopasowań w produktach z Sanity i lokalnej bazy, a po filtrach pozostało <strong className="text-white">{filteredResults.length}</strong>.</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-5 md:p-6 mb-8" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-lg font-display mb-1">
                <SlidersHorizontal className="w-5 h-5 text-[#f81828]" /> Filtry i sortowanie
              </div>
              <p className="text-sm text-gray-500">Zawęź wyniki po marce i kategorii albo zmień kolejność wyświetlania produktów.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {featuredOnly && (
                <Link
                  to={createSearchLink({ featured: null })}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-white"
                  style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.28)" }}
                >
                  <Star className="w-3.5 h-3.5 text-[#f81828]" /> Tylko polecane
                </Link>
              )}
              {(selectedBrand !== ALL_BRANDS || selectedCategory !== ALL_CATEGORIES || featuredOnly || sortBy !== DEFAULT_SORT) && (
                <Link
                  to={createSearchLink({ brand: null, category: null, featured: null, sort: null })}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  Wyczyść ustawienia
                </Link>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500 font-semibold mb-2 block">Marka</span>
              <select
                value={selectedBrand}
                onChange={(e) => { window.location.hash = createSearchLink({ brand: e.target.value }); }}
                className="w-full rounded-2xl px-4 py-3 text-sm text-white outline-none"
                style={{ background: "#151515", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <option value={ALL_BRANDS}>Wszystkie marki</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500 font-semibold mb-2 block">Kategoria</span>
              <select
                value={selectedCategory}
                onChange={(e) => { window.location.hash = createSearchLink({ category: e.target.value }); }}
                className="w-full rounded-2xl px-4 py-3 text-sm text-white outline-none"
                style={{ background: "#151515", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <option value={ALL_CATEGORIES}>Wszystkie kategorie</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>{category.replace(/-/g, " ")}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500 font-semibold mb-2 block">Sortowanie</span>
              <select
                value={sortBy}
                onChange={(e) => { window.location.hash = createSearchLink({ sort: e.target.value }); }}
                className="w-full rounded-2xl px-4 py-3 text-sm text-white outline-none"
                style={{ background: "#151515", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <option value="relevance">Najtrafniejsze</option>
                <option value="featured">Najpierw polecane</option>
                <option value="name-asc">Nazwa A–Z</option>
                <option value="name-desc">Nazwa Z–A</option>
                <option value="brand-asc">Marka A–Z</option>
              </select>
            </label>

            <div className="rounded-2xl px-4 py-3 flex items-center justify-between gap-3" style={{ background: "#151515", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-gray-500 font-semibold mb-1">Wyróżnienie</div>
                <div className="text-sm text-white font-medium">Pokaż tylko polecane</div>
              </div>
              <Link
                to={createSearchLink({ featured: featuredOnly ? null : "1" })}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold text-white"
                style={featuredOnly
                  ? { background: "#f81828", boxShadow: "0 0 16px rgba(248,24,40,0.35)" }
                  : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Sparkles className="w-3.5 h-3.5" /> {featuredOnly ? "Aktywne" : "Włącz"}
              </Link>
            </div>
          </div>
        </div>

        {filteredResults.length === 0 ? (
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
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <p className="text-sm text-gray-500">Strona <span className="text-white font-semibold">{safePage}</span> z <span className="text-white font-semibold">{totalPages}</span> · pokazuję <span className="text-white font-semibold">{paginatedResults.length}</span> produktów na tej stronie.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {paginatedResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    to={createPaginationLink(page)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${page === safePage ? "text-white" : "text-gray-400 hover:text-white"}`}
                    style={page === safePage
                      ? { background: "#f81828", boxShadow: "0 0 16px rgba(248,24,40,0.35)" }
                      : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {page}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
