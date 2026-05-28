import { useParams, Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight, Grid, List, Filter, SlidersHorizontal, X,
  ChevronLeft, ChevronRight as ChevronNext, Tag, Zap, ArrowRight
} from "lucide-react";
import { getCategoryBySlug, getBreadcrumbs, categories as staticCategories } from "@/data/categories";
import { products as staticProducts } from "@/data/products";
import { useCategoryBySlug, useAllCategories, useProductsByCategorySlugs } from "@/hooks/useSanityData";
import {
  sanityCategoryToLegacy, sanityProductToLegacy,
  buildBreadcrumbs as buildSanityBreadcrumbs, collectAllSlugs,
  type SanityCategory,
} from "@/lib/adapters";
import { ProductCard } from "@/components/Commerce";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo, useRef, useEffect } from "react";

const PRODUCTS_PER_PAGE = 12;

/* ---------- tiny reveal hook (inline, no external dep) ---------- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // ── Sanity data (z fallbackiem na dane statyczne) ─────────────
  const { data: sanityCategory } = useCategoryBySlug(slug ?? '');
  const { data: sanityTopCats }  = useAllCategories();

  const cat = useMemo(
    () => sanityCategory
      ? sanityCategoryToLegacy(sanityCategory as SanityCategory)
      : (slug ? getCategoryBySlug(slug) : null),
    [sanityCategory, slug],
  );

  const breadcrumbs = useMemo(
    () => sanityCategory
      ? buildSanityBreadcrumbs(sanityCategory as SanityCategory).slice(0, -1)
      : (slug ? getBreadcrumbs(slug) : []),
    [sanityCategory, slug],
  );

  const categories = useMemo(
    () => sanityTopCats && (sanityTopCats as any[]).length > 0
      ? (sanityTopCats as any[]).map(sanityCategoryToLegacy)
      : staticCategories,
    [sanityTopCats],
  );
  // ──────────────────────────────────────────────────────────────

  const selectedBrand = searchParams.get("brand") || "";
  const sortBy = searchParams.get("sort") || "default";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const allSubSlugs = useMemo(() => {
    if (!cat) return [];
    const collect = (c: typeof cat): string[] => [
      c.slug, ...(c.children?.flatMap(child => collect(child)) || []),
    ];
    return collect(cat);
  }, [cat]);

  const { data: sanityProducts } = useProductsByCategorySlugs(allSubSlugs);

  const catProducts = useMemo(
    () => sanityProducts && (sanityProducts as any[]).length > 0
      ? (sanityProducts as any[]).map(sanityProductToLegacy)
      : staticProducts.filter(p => allSubSlugs.includes(p.categorySlug)),
    [sanityProducts, allSubSlugs],
  );

  const availableBrands = useMemo(
    () => [...new Set(catProducts.map(p => p.brand))].sort(),
    [catProducts]
  );

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PRODUCTS_PER_PAGE, safePage * PRODUCTS_PER_PAGE);

  const updateParam = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    if (key !== "page") p.delete("page");
    setSearchParams(p);
  };

  const clearFilters = () => setSearchParams(new URLSearchParams());
  const hasActiveFilters = !!(selectedBrand || sortBy !== "default");

  /* reveal refs */
  const heroReveal   = useReveal();
  const subReveal    = useReveal();
  const gridReveal   = useReveal();

  if (!cat) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🏗️</div>
        <h1 className="text-2xl font-bold mb-4">Kategoria nie znaleziona</h1>
        <Link to="/produkty"><Button className="bg-primary">Przeglądaj wszystkie produkty</Button></Link>
      </div>
    );
  }

  const FilterPanel = () => (
    <div className="space-y-6">
      {availableBrands.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 font-bold text-xs text-gray-500 uppercase tracking-widest mb-3">
            <Tag className="w-3.5 h-3.5 text-primary" /> Marka
          </h3>
          <div className="space-y-0.5">
            <button
              onClick={() => updateParam("brand", "")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${!selectedBrand ? "bg-primary text-white font-semibold shadow-sm" : "text-gray-600 hover:bg-red-50 hover:text-primary"}`}
            >
              Wszystkie marki
            </button>
            {availableBrands.map(brand => (
              <button
                key={brand}
                onClick={() => updateParam("brand", brand === selectedBrand ? "" : brand)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedBrand === brand ? "bg-primary text-white font-semibold shadow-sm" : "text-gray-600 hover:bg-red-50 hover:text-primary"}`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="flex items-center gap-2 font-bold text-xs text-gray-500 uppercase tracking-widest mb-3">
          <Zap className="w-3.5 h-3.5 text-primary" /> Sortowanie
        </h3>
        <div className="space-y-0.5">
          {[
            ["default",   "Domyślne"],
            ["name-asc",  "Nazwa A–Z"],
            ["name-desc", "Nazwa Z–A"],
            ["brand",     "Marka A–Z"],
            ["new",       "Nowości najpierw"],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => updateParam("sort", val)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${sortBy === val ? "bg-primary text-white font-semibold shadow-sm" : "text-gray-600 hover:bg-red-50 hover:text-primary"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 text-xs text-red-600 hover:text-red-700 font-semibold py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
        >
          <X className="w-3 h-3" /> Wyczyść filtry
        </button>
      )}
    </div>
  );

  /* pages array for pagination */
  const pageNums = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 4) return [1,2,3,4,5,"…",totalPages];
    if (safePage >= totalPages - 3) return [1,"…",totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [1,"…",safePage-1,safePage,safePage+1,"…",totalPages];
  })();

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100">
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

      {/* ── Hero banner ── */}
      <div
        ref={heroReveal.ref as React.RefObject<HTMLDivElement>}
        className="relative overflow-hidden bg-black text-white"
        style={{ minHeight: "180px" }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(248,24,40,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(248,24,40,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Red accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
        {/* Diagonal */}
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-primary/10 to-transparent" />

        <div
          className={`relative container mx-auto px-6 py-12 transition-all duration-700 ease-out ${heroReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary font-mono text-xs tracking-widest uppercase">
                  Kategoria
                </span>
                <span className="h-px flex-1 max-w-16 bg-primary/40" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight mb-2">
                {cat.metaTitle ? cat.metaTitle.split("|")[0].trim() : cat.name}
              </h1>
              {cat.description && (
                <p className="text-gray-300 max-w-2xl text-sm leading-relaxed">{cat.description}</p>
              )}
            </div>
            <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
              <span className="font-mono text-4xl font-black text-primary/20 leading-none select-none">
                {String(catProducts.length).padStart(3, "0")}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">produktów</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar ── */}
          <aside className="lg:w-64 flex-shrink-0 space-y-4">

            {/* Categories tree */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
              <div className="px-4 py-3 bg-primary flex items-center gap-2">
                <Filter className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm tracking-wide">Kategorie</span>
              </div>
              <div className="p-2 max-h-[400px] overflow-y-auto">
                {categories.map(topCat => (
                  <div key={topCat.id}>
                    <Link
                      to={`/kategoria/${topCat.slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all my-0.5 ${
                        topCat.id === cat.id || breadcrumbs.some(b => b.id === topCat.id)
                          ? "bg-primary text-white"
                          : "hover:bg-red-50 hover:text-primary text-gray-700"
                      }`}
                    >
                      <span>{topCat.name}</span>
                    </Link>
                    {(topCat.id === cat.id || breadcrumbs.some(b => b.id === topCat.id)) && topCat.children && (
                      <div className="ml-4 border-l-2 border-primary/20 pl-3 mb-1 space-y-0.5">
                        {topCat.children.slice(0, 14).map(sub => (
                          <Link
                            key={sub.id}
                            to={`/kategoria/${sub.slug}`}
                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all ${
                              sub.id === cat.id
                                ? "text-primary font-bold bg-red-50"
                                : "hover:text-primary hover:bg-red-50 text-gray-600"
                            }`}
                          >
                            {sub.id === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
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
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sticky top-[calc(24rem+1rem)]">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  Filtry i sortowanie
                  {hasActiveFilters && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                <FilterPanel />
              </div>
            )}
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Subcategories */}
            {cat.children && cat.children.length > 0 && (
              <div
                ref={subReveal.ref as React.RefObject<HTMLDivElement>}
                className="mb-8"
              >
                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full inline-block" />
                  Podkategorie
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {cat.children.map((sub, i) => (
                    <Link
                      key={sub.id}
                      to={`/kategoria/${sub.slug}`}
                      className={`group bg-white border border-gray-100 rounded-xl p-4 hover:border-primary hover:shadow-md transition-all duration-300 ${subReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      <div className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors leading-snug mb-1">
                        {sub.name}
                      </div>
                      {sub.children && (
                        <div className="text-xs text-gray-400">{sub.children.length} kat.</div>
                      )}
                      <div className="mt-2 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                        Przejdź <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-bold text-gray-900">Produkty</h2>
                <Badge className="bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-100">
                  {filtered.length > 0 ? `${filtered.length} szt.` : "Zapytaj o ofertę"}
                </Badge>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-primary hover:text-red-700 font-medium bg-red-50 px-2 py-1 rounded-full transition-colors">
                    <X className="w-3 h-3" /> wyczyść
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <button
                  className="lg:hidden flex items-center gap-1.5 text-sm border border-gray-200 rounded-xl px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filtry
                  {hasActiveFilters && <span className="w-2 h-2 bg-primary rounded-full" />}
                </button>
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => updateParam("sort", e.target.value)}
                  className="hidden sm:block text-sm border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary bg-white"
                >
                  <option value="default">Sortuj: domyślne</option>
                  <option value="name-asc">Nazwa A–Z</option>
                  <option value="name-desc">Nazwa Z–A</option>
                  <option value="brand">Marka A–Z</option>
                  <option value="new">Nowości</option>
                </select>
                {/* View toggle */}
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 transition-colors ${view === "grid" ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 transition-colors ${view === "list" ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile filter panel */}
            {mobileFiltersOpen && (
              <div className="lg:hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
                <FilterPanel />
              </div>
            )}

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBrand && (
                  <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
                    <Tag className="w-3 h-3" /> {selectedBrand}
                    <button onClick={() => updateParam("brand", "")} className="hover:text-red-600 transition-colors"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {sortBy !== "default" && (
                  <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                    Sortowanie aktywne
                    <button onClick={() => updateParam("sort", "")} className="hover:text-red-600 transition-colors"><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Product grid / list */}
            {paginated.length > 0 ? (
              <>
                <div
                  ref={gridReveal.ref as React.RefObject<HTMLDivElement>}
                  className={view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    : "space-y-3"}
                >
                  {paginated.map((p, i) => (
                    <div
                      key={p.id}
                      className={`transition-all duration-500 ease-out ${gridReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                      style={{ transitionDelay: `${(i % 6) * 70}ms` }}
                    >
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-1.5 flex-wrap">
                    <button
                      disabled={safePage <= 1}
                      onClick={() => updateParam("page", String(safePage - 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {pageNums.map((page, idx) =>
                      page === "…"
                        ? <span key={`e${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">…</span>
                        : (
                          <button
                            key={page}
                            onClick={() => updateParam("page", String(page))}
                            className={`w-9 h-9 rounded-xl border text-sm font-semibold transition-all ${
                              page === safePage
                                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                            }`}
                          >
                            {page}
                          </button>
                        )
                    )}
                    <button
                      disabled={safePage >= totalPages}
                      onClick={() => updateParam("page", String(safePage + 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronNext className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-gray-400 ml-2 font-mono">
                      {safePage}/{totalPages} · {filtered.length} szt.
                    </span>
                  </div>
                )}
              </>
            ) : (
              /* Empty state */
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4 text-4xl">
                  🏗️
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  {hasActiveFilters ? "Brak wyników dla wybranych filtrów" : "Baza produktów w rozbudowie"}
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm leading-relaxed">
                  {hasActiveFilters
                    ? "Zmień lub wyczyść filtry, aby zobaczyć dostępne produkty."
                    : "Aktywnie uzupełniamy naszą bazę. Zadzwoń – z pewnością mamy to, czego szukasz!"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {hasActiveFilters
                    ? <Button onClick={clearFilters} className="bg-primary hover:bg-red-700 shadow-sm">Wyczyść filtry</Button>
                    : <>
                        <a href="tel:+48509567213">
                          <Button className="bg-primary hover:bg-red-700 shadow-sm">📞 +48 509 567 213</Button>
                        </a>
                        <Link to="/kontakt">
                          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">✉️ Wyślij zapytanie</Button>
                        </Link>
                      </>
                  }
                </div>
              </div>
            )}

            {/* SEO Description */}
            {cat.metaDesc && (
              <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full" />
                  O kategorii: {cat.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{cat.metaDesc}</p>
                <div className="mt-5 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-xl border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Potrzebujesz fachowej porady?</p>
                    <p className="text-xs text-gray-500 mt-0.5">Nasi eksperci pomogą dobrać właściwe produkty.</p>
                  </div>
                  <a href="tel:+48509567213">
                    <Button size="sm" className="bg-primary hover:bg-red-700 text-xs font-bold whitespace-nowrap shadow-sm">
                      📞 +48 509 567 213
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
