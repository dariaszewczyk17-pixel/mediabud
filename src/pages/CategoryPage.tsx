import { useParams, Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Grid, List, Filter, SlidersHorizontal, X, ChevronLeft, ChevronRight as ChevronNext } from "lucide-react";
import { getCategoryBySlug, getBreadcrumbs, categories } from "@/data/categories";
import { products, getAllBrands } from "@/data/products";
import { ProductCard } from "@/components/Commerce";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";

const PRODUCTS_PER_PAGE = 12;

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const cat = slug ? getCategoryBySlug(slug) : null;
  const breadcrumbs = slug ? getBreadcrumbs(slug) : [];

  // Filter/sort state from URL params
  const selectedBrand = searchParams.get("brand") || "";
  const sortBy = searchParams.get("sort") || "default";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Gather all sub-slugs
  const allSubSlugs = useMemo(() => {
    if (!cat) return [];
    const collect = (c: typeof cat): string[] => [
      c.slug,
      ...(c.children?.flatMap(child => collect(child)) || []),
    ];
    return collect(cat);
  }, [cat]);

  // All products in this category tree
  const catProducts = useMemo(
    () => products.filter(p => allSubSlugs.includes(p.categorySlug)),
    [allSubSlugs]
  );

  // Available brands in this category
  const availableBrands = useMemo(
    () => [...new Set(catProducts.map(p => p.brand))].sort(),
    [catProducts]
  );

  // Filter
  const filtered = useMemo(() => {
    let result = [...catProducts];
    if (selectedBrand) result = result.filter(p => p.brand === selectedBrand);
    switch (sortBy) {
      case "name-asc":  result.sort((a, b) => a.name.localeCompare(b.name, "pl")); break;
      case "name-desc": result.sort((a, b) => b.name.localeCompare(a.name, "pl")); break;
      case "brand":     result.sort((a, b) => a.brand.localeCompare(b.brand, "pl")); break;
      case "new":       result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return result;
  }, [catProducts, selectedBrand, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PRODUCTS_PER_PAGE, safePage * PRODUCTS_PER_PAGE);

  const updateParam = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    if (key !== "page") p.delete("page");
    setSearchParams(p);
  };

  const clearFilters = () => {
    const p = new URLSearchParams();
    setSearchParams(p);
  };

  const hasActiveFilters = selectedBrand || sortBy !== "default";

  if (!cat) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Kategoria nie znaleziona</h1>
        <Link to="/produkty"><Button className="bg-primary">Przeglądaj wszystkie produkty</Button></Link>
      </div>
    );
  }

  const FilterPanel = () => (
    <div className="space-y-5">
      {/* Brand filter */}
      {availableBrands.length > 0 && (
        <div>
          <h3 className="font-bold text-sm text-gray-900 mb-2 uppercase tracking-wide">Marka</h3>
          <div className="space-y-1">
            <button
              onClick={() => updateParam("brand", "")}
              className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${!selectedBrand ? "bg-primary text-white font-medium" : "text-gray-600 hover:bg-red-50 hover:text-primary"}`}
            >
              Wszystkie marki
            </button>
            {availableBrands.map(brand => (
              <button
                key={brand}
                onClick={() => updateParam("brand", brand === selectedBrand ? "" : brand)}
                className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${selectedBrand === brand ? "bg-primary text-white font-medium" : "text-gray-600 hover:bg-red-50 hover:text-primary"}`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sort */}
      <div>
        <h3 className="font-bold text-sm text-gray-900 mb-2 uppercase tracking-wide">Sortowanie</h3>
        <select
          value={sortBy}
          onChange={e => updateParam("sort", e.target.value)}
          className="w-full text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-primary"
        >
          <option value="default">Domyślne</option>
          <option value="name-asc">Nazwa A–Z</option>
          <option value="name-desc">Nazwa Z–A</option>
          <option value="brand">Marka A–Z</option>
          <option value="new">Nowości najpierw</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="w-full flex items-center justify-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium py-1.5 border border-red-200 rounded hover:bg-red-50 transition-colors">
          <X className="w-3 h-3" /> Wyczyść filtry
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Strona główna</Link>
            {breadcrumbs.map((bc, i) => (
              <span key={bc.id} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                {i === breadcrumbs.length - 1
                  ? <span className="text-gray-900 font-medium">{bc.name}</span>
                  : <Link to={`/kategoria/${bc.slug}`} className="hover:text-primary transition-colors">{bc.name}</Link>
                }
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-black mb-2">{cat.metaTitle ? cat.metaTitle.split("|")[0].trim() : cat.name}</h1>
          {cat.description && <p className="text-gray-300 max-w-2xl">{cat.description}</p>}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar – desktop */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 bg-primary text-white font-bold text-sm flex items-center gap-2">
                <Filter className="w-4 h-4" /> Kategorie
              </div>
              <div className="p-3 space-y-1">
                {categories.map(topCat => (
                  <div key={topCat.id}>
                    <Link
                      to={`/kategoria/${topCat.slug}`}
                      className={`block px-3 py-2 rounded text-sm font-medium transition-colors ${topCat.id === cat.id || breadcrumbs.some(b => b.id === topCat.id) ? "bg-primary text-white" : "hover:bg-red-50 hover:text-primary text-gray-700"}`}
                    >
                      {topCat.name}
                    </Link>
                    {(topCat.id === cat.id || breadcrumbs.some(b => b.id === topCat.id)) && topCat.children && (
                      <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-primary/20 pl-3">
                        {topCat.children.slice(0, 12).map(sub => (
                          <Link
                            key={sub.id}
                            to={`/kategoria/${sub.slug}`}
                            className={`block px-2 py-1.5 rounded text-xs transition-colors ${sub.id === cat.id ? "text-primary font-bold" : "hover:text-primary text-gray-600"}`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Filter panel - desktop */}
            {catProducts.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-4 mt-4">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-4">
                  <SlidersHorizontal className="w-4 h-4 text-primary" /> Filtry i sortowanie
                </div>
                <FilterPanel />
              </div>
            )}
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Subcategories tiles */}
            {cat.children && cat.children.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Podkategorie</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cat.children.map(sub => (
                    <Link
                      key={sub.id}
                      to={`/kategoria/${sub.slug}`}
                      className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all text-center"
                    >
                      <div className="font-medium text-sm text-gray-800 group-hover:text-primary transition-colors leading-snug">{sub.name}</div>
                      {sub.children && <div className="text-xs text-gray-400 mt-1">{sub.children.length} kat.</div>}
                      <ChevronNext className="w-3 h-3 text-primary mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Products toolbar */}
            <div>
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-gray-900">Produkty</h2>
                  <Badge variant="secondary" className="text-xs">
                    {filtered.length > 0 ? `${filtered.length} produktów` : "Zapytaj o ofertę"}
                  </Badge>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium">
                      <X className="w-3 h-3" /> Wyczyść
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {/* Mobile filter toggle */}
                  <button
                    className="lg:hidden flex items-center gap-1.5 text-sm border border-gray-200 rounded px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" /> Filtry
                    {hasActiveFilters && <span className="w-2 h-2 bg-primary rounded-full" />}
                  </button>
                  {/* Sort inline (desktop) */}
                  <select
                    value={sortBy}
                    onChange={e => updateParam("sort", e.target.value)}
                    className="hidden sm:block text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:border-primary"
                  >
                    <option value="default">Sortuj: domyślne</option>
                    <option value="name-asc">Nazwa A–Z</option>
                    <option value="name-desc">Nazwa Z–A</option>
                    <option value="brand">Marka A–Z</option>
                    <option value="new">Nowości</option>
                  </select>
                  <button onClick={() => setView("grid")} className={`p-2 rounded border ${view === "grid" ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-500 hover:border-primary"}`}><Grid className="w-4 h-4" /></button>
                  <button onClick={() => setView("list")} className={`p-2 rounded border ${view === "list" ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-500 hover:border-primary"}`}><List className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Mobile filter panel */}
              {mobileFiltersOpen && (
                <div className="lg:hidden bg-white rounded-xl border border-gray-200 p-4 mb-4">
                  <FilterPanel />
                </div>
              )}

              {/* Active filter chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedBrand && (
                    <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                      Marka: {selectedBrand}
                      <button onClick={() => updateParam("brand", "")}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {sortBy !== "default" && (
                    <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      Sortowanie aktywne
                      <button onClick={() => updateParam("sort", "")}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                </div>
              )}

              {/* Product grid */}
              {paginated.length > 0 ? (
                <>
                  <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-3"}>
                    {paginated.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <button
                        disabled={safePage <= 1}
                        onClick={() => updateParam("page", String(safePage - 1))}
                        className="p-2 rounded border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => updateParam("page", String(page))}
                          className={`w-9 h-9 rounded border text-sm font-medium transition-colors ${page === safePage ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary"}`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        disabled={safePage >= totalPages}
                        onClick={() => updateParam("page", String(safePage + 1))}
                        className="p-2 rounded border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronNext className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-gray-500 ml-2">
                        Strona {safePage} z {totalPages} ({filtered.length} produktów)
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="text-5xl mb-4">🏗️</div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {hasActiveFilters ? "Brak wyników dla wybranych filtrów" : "Baza produktów w rozbudowie"}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {hasActiveFilters
                      ? "Zmień lub wyczyść filtry, aby zobaczyć dostępne produkty."
                      : "Aktywnie uzupełniamy naszą bazę produktów. Zadzwoń lub napisz – z pewnością mamy to, czego szukasz!"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {hasActiveFilters
                      ? <Button onClick={clearFilters} className="bg-primary hover:bg-red-700">Wyczyść filtry</Button>
                      : <>
                          <a href="tel:+48509567213"><Button className="bg-primary hover:bg-red-700">📞 Zadzwoń: +48 509 567 213</Button></a>
                          <Link to="/kontakt"><Button variant="outline" className="border-primary text-primary">✉️ Wyślij zapytanie</Button></Link>
                        </>
                    }
                  </div>
                </div>
              )}
            </div>

            {/* SEO Description */}
            {cat.metaDesc && (
              <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">O kategorii: {cat.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{cat.metaDesc}</p>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-primary">💡 Potrzebujesz fachowej porady?</p>
                  <p className="text-xs text-gray-600 mt-1">Nasi eksperci budowlani pomogą dobrać odpowiednie produkty dla Twojego projektu.</p>
                  <a href="tel:+48509567213" className="inline-block mt-2 text-sm font-bold text-primary hover:underline">📞 +48 509 567 213</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
