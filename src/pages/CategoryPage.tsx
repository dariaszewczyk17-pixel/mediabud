import { useParams, Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight, Grid, List, Filter, SlidersHorizontal, X,
  ChevronLeft, ChevronRight as ChevronNext, Tag, Zap, ArrowRight, Phone, Mail
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

/* ---------- tiny reveal hook ---------- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

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

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  const heroReveal = useReveal();
  const subReveal  = useReveal();
  const gridReveal = useReveal();

  if (!cat) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080808" }}>
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🏗️</div>
          <h1 className="text-2xl font-bold text-white mb-4">Kategoria nie znaleziona</h1>
          <Link to="/produkty">
            <Button className="bg-[#f81828] hover:bg-[#c8000f]">Przeglądaj wszystkie produkty</Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ── Filter panel component ── */
  const FilterPanel = () => (
    <div className="space-y-6">
      {availableBrands.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-600 uppercase tracking-widest mb-3">
            <Tag className="w-3 h-3 text-[#f81828]" /> Marka
          </h3>
          <div className="space-y-0.5">
            <button
              onClick={() => updateParam("brand", "")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                !selectedBrand
                  ? "bg-[#f81828] text-white"
                  : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"
              }`}
            >
              Wszystkie marki
            </button>
            {availableBrands.map(brand => (
              <button
                key={brand}
                onClick={() => updateParam("brand", brand === selectedBrand ? "" : brand)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedBrand === brand
                    ? "bg-[#f81828] text-white"
                    : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-600 uppercase tracking-widest mb-3">
          <Zap className="w-3 h-3 text-[#f81828]" /> Sortowanie
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
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === val
                  ? "bg-[#f81828] text-white"
                  : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 text-xs text-[#f81828] font-semibold py-2 rounded-lg transition-all hover:bg-[#f81828]/10"
          style={{ border: "1px solid rgba(248,24,40,0.25)" }}
        >
          <X className="w-3 h-3" /> Wyczyść filtry
        </button>
      )}
    </div>
  );

  const pageNums = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 4) return [1,2,3,4,5,"…",totalPages];
    if (safePage >= totalPages - 3) return [1,"…",totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [1,"…",safePage-1,safePage,safePage+1,"…",totalPages];
  })();

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* ── Breadcrumb ── */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-xs text-gray-600 flex-wrap">
            <Link to="/" className="hover:text-[#f81828] transition-colors">Strona główna</Link>
            {breadcrumbs.map((bc, i) => (
              <span key={bc.id} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                {i === breadcrumbs.length - 1
                  ? <span className="text-gray-300 font-medium">{bc.name}</span>
                  : <Link to={`/kategoria/${bc.slug}`} className="hover:text-[#f81828] transition-colors">{bc.name}</Link>
                }
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div
        ref={heroReveal.ref as React.RefObject<HTMLDivElement>}
        className="relative overflow-hidden"
        style={{ minHeight: "200px", background: "#0a0a0a" }}
      >
        {/* Category image bg */}
        {catImages[cat.slug] && (
          <div className="absolute inset-0">
            <img
              src={catImages[cat.slug]}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.18) saturate(0.6)" }}
            />
          </div>
        )}
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(248,24,40,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(248,24,40,0.07) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient left-to-right */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.5) 100%)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, #080808, transparent)" }} />
        {/* Left red accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #f81828, rgba(248,24,40,0.2) 60%, transparent)" }} />

        <div className={`relative container mx-auto px-6 py-12 pl-10 transition-all duration-700 ease-out ${heroReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black text-[#f81828] tracking-widest uppercase">Kategoria</span>
                <span className="h-px flex-1 max-w-12" style={{ background: "rgba(248,24,40,0.4)" }} />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-3">
                {cat.metaTitle ? cat.metaTitle.split("|")[0].trim() : cat.name}
              </h1>
              {cat.description && (
                <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">{cat.description}</p>
              )}
            </div>
            <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
              <span className="font-display font-black text-[#f81828]/15 leading-none select-none" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                {String(catProducts.length).padStart(3, "0")}
              </span>
              <span className="text-xs text-gray-600 uppercase tracking-widest">produktów</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar ── */}
          <aside className="lg:w-60 flex-shrink-0 space-y-4">

            {/* Categories tree */}
            <div
              className="rounded-xl overflow-hidden sticky top-24"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ background: "#f81828", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Filter className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm tracking-wide">Kategorie</span>
              </div>
              <div className="p-2 max-h-[380px] overflow-y-auto">
                {categories.map(topCat => (
                  <div key={topCat.id}>
                    <Link
                      to={`/kategoria/${topCat.slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all my-0.5 ${
                        topCat.id === cat.id || breadcrumbs.some(b => b.id === topCat.id)
                          ? "bg-[#f81828] text-white"
                          : "text-gray-400 hover:bg-[#f81828]/10 hover:text-white"
                      }`}
                    >
                      {topCat.name}
                    </Link>
                    {(topCat.id === cat.id || breadcrumbs.some(b => b.id === topCat.id)) && topCat.children && (
                      <div className="ml-4 pl-3 mb-1 space-y-0.5" style={{ borderLeft: "2px solid rgba(248,24,40,0.25)" }}>
                        {topCat.children.slice(0, 14).map(sub => (
                          <Link
                            key={sub.id}
                            to={`/kategoria/${sub.slug}`}
                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all ${
                              sub.id === cat.id
                                ? "text-[#f81828] font-bold bg-[#f81828]/10"
                                : "text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/8"
                            }`}
                          >
                            {sub.id === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] flex-shrink-0" />}
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
              <div
                className="rounded-xl p-4 sticky top-[calc(24rem+1rem)]"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-white mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <SlidersHorizontal className="w-4 h-4 text-[#f81828]" />
                  Filtry i sortowanie
                  {hasActiveFilters && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-[#f81828] animate-pulse" />
                  )}
                </div>
                <FilterPanel />
              </div>
            )}

            {/* Contact CTA */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "linear-gradient(135deg, rgba(248,24,40,0.12) 0%, rgba(248,24,40,0.05) 100%)",
                border: "1px solid rgba(248,24,40,0.2)",
              }}
            >
              <p className="text-xs font-bold text-[#f88090] uppercase tracking-wider mb-1.5">Doradztwo</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">Pomożemy dobrać właściwe materiały dla Twojego projektu.</p>
              <a
                href="tel:+48509567213"
                className="flex items-center gap-2 w-full bg-[#f81828] hover:bg-[#c8000f] text-white text-xs font-bold py-2.5 px-3 rounded-lg transition-all hover:shadow-[0_0_12px_rgba(248,24,40,0.4)]"
              >
                <Phone className="w-3.5 h-3.5" /> +48 509 567 213
              </a>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Subcategories */}
            {cat.children && cat.children.length > 0 && (
              <div ref={subReveal.ref as React.RefObject<HTMLDivElement>} className="mb-8">
                <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-[3px] h-4 bg-[#f81828] rounded-full inline-block" />
                  Podkategorie
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {cat.children.map((sub, i) => (
                    <Link
                      key={sub.id}
                      to={`/kategoria/${sub.slug}`}
                      className={`group rounded-xl p-3.5 transition-all duration-300 ${subReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{
                        background: "#0f0f0f",
                        border: "1px solid rgba(255,255,255,0.06)",
                        transitionDelay: `${i * 50}ms`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.35)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.06)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLElement).style.background = "#0f0f0f";
                      }}
                    >
                      <div className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors leading-snug mb-1">
                        {sub.name}
                      </div>
                      {sub.children && (
                        <div className="text-xs text-gray-600">{sub.children.length} kat.</div>
                      )}
                      <div className="mt-2 flex items-center gap-1 text-xs text-[#f81828] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                        Przejdź <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Toolbar */}
            <div
              className="flex items-center justify-between mb-4 gap-3 flex-wrap rounded-xl px-4 py-3"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-bold text-white">Produkty</h2>
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(248,24,40,0.12)", color: "#f88090", border: "1px solid rgba(248,24,40,0.2)" }}
                >
                  {filtered.length > 0 ? `${filtered.length} szt.` : "Zapytaj o ofertę"}
                </span>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-[#f81828] font-medium hover:underline">
                    <X className="w-3 h-3" /> wyczyść
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <button
                  className="lg:hidden flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors text-gray-400 hover:text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filtry
                  {hasActiveFilters && <span className="w-2 h-2 bg-[#f81828] rounded-full" />}
                </button>
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => updateParam("sort", e.target.value)}
                  className="hidden sm:block text-xs font-medium px-3 py-1.5 rounded-lg transition-all text-gray-400 focus:outline-none focus:border-[#f81828] appearance-none cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <option value="default">Sortuj: domyślne</option>
                  <option value="name-asc">Nazwa A–Z</option>
                  <option value="name-desc">Nazwa Z–A</option>
                  <option value="brand">Marka A–Z</option>
                  <option value="new">Nowości</option>
                </select>
                {/* View toggle */}
                <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 transition-colors ${view === "grid" ? "bg-[#f81828] text-white" : "text-gray-500 hover:text-white"}`}
                    style={{ background: view === "grid" ? "#f81828" : "transparent" }}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 transition-colors ${view === "list" ? "bg-[#f81828] text-white" : "text-gray-500 hover:text-white"}`}
                    style={{ background: view === "list" ? "#f81828" : "transparent" }}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile filter panel */}
            {mobileFiltersOpen && (
              <div
                className="lg:hidden rounded-xl p-4 mb-4"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <FilterPanel />
              </div>
            )}

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBrand && (
                  <span
                    className="flex items-center gap-1.5 text-[#f81828] text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.22)" }}
                  >
                    <Tag className="w-3 h-3" /> {selectedBrand}
                    <button onClick={() => updateParam("brand", "")} className="hover:text-red-300 transition-colors"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {sortBy !== "default" && (
                  <span
                    className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Sortowanie aktywne
                    <button onClick={() => updateParam("sort", "")} className="hover:text-[#f81828] transition-colors"><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Product grid */}
            {paginated.length > 0 ? (
              <>
                <div
                  ref={gridReveal.ref as React.RefObject<HTMLDivElement>}
                  className={view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"}
                >
                  {paginated.map((p, i) => (
                    <div
                      key={p.id}
                      className={`transition-all duration-500 ease-out ${gridReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                      style={{ transitionDelay: `${(i % 6) * 65}ms` }}
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
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:text-white"
                      style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {pageNums.map((page, idx) =>
                      page === "…"
                        ? <span key={`e${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-600 text-sm">…</span>
                        : (
                          <button
                            key={page}
                            onClick={() => updateParam("page", String(page))}
                            className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                              page === safePage
                                ? "bg-[#f81828] text-white shadow-[0_0_12px_rgba(248,24,40,0.4)]"
                                : "text-gray-500 hover:text-white"
                            }`}
                            style={page !== safePage ? { background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)" } : {}}
                          >
                            {page}
                          </button>
                        )
                    )}
                    <button
                      disabled={safePage >= totalPages}
                      onClick={() => updateParam("page", String(safePage + 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:text-white"
                      style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <ChevronNext className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-gray-600 ml-2 font-mono">
                      {safePage}/{totalPages} · {filtered.length} szt.
                    </span>
                  </div>
                )}
              </>
            ) : (
              /* Empty state */
              <div
                className="rounded-2xl p-12 text-center"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl"
                  style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.15)" }}
                >
                  🏗️
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">
                  {hasActiveFilters ? "Brak wyników dla wybranych filtrów" : "Baza produktów w rozbudowie"}
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm leading-relaxed">
                  {hasActiveFilters
                    ? "Zmień lub wyczyść filtry, aby zobaczyć dostępne produkty."
                    : "Aktywnie uzupełniamy naszą bazę. Zadzwoń — z pewnością mamy to, czego szukasz!"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {hasActiveFilters
                    ? <Button onClick={clearFilters} className="bg-[#f81828] hover:bg-[#c8000f]">Wyczyść filtry</Button>
                    : <>
                        <a href="tel:+48509567213">
                          <Button className="bg-[#f81828] hover:bg-[#c8000f]"><Phone className="w-4 h-4 mr-2" /> +48 509 567 213</Button>
                        </a>
                        <Link to="/kontakt">
                          <Button variant="outline" className="border-[#f81828]/40 text-[#f81828] hover:bg-[#f81828] hover:text-white"><Mail className="w-4 h-4 mr-2" /> Wyślij zapytanie</Button>
                        </Link>
                      </>
                  }
                </div>
              </div>
            )}

            {/* SEO Description */}
            {cat.metaDesc && (
              <div
                className="mt-10 rounded-2xl p-6"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
                  <span className="w-[3px] h-4 bg-[#f81828] rounded-full" />
                  O kategorii: {cat.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cat.metaDesc}</p>
                <div
                  className="mt-5 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3"
                  style={{ background: "rgba(248,24,40,0.06)", border: "1px solid rgba(248,24,40,0.15)" }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Potrzebujesz fachowej porady?</p>
                    <p className="text-xs text-gray-500 mt-0.5">Nasi eksperci pomogą dobrać właściwe produkty.</p>
                  </div>
                  <a href="tel:+48509567213">
                    <Button size="sm" className="bg-[#f81828] hover:bg-[#c8000f] text-xs font-bold whitespace-nowrap shadow-sm hover:shadow-[0_0_12px_rgba(248,24,40,0.4)] transition-all">
                      <Phone className="w-3.5 h-3.5 mr-1.5" /> +48 509 567 213
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
