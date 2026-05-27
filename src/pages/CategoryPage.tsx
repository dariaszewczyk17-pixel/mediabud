import { useParams, Link } from "react-router-dom";
import { ChevronRight, Grid, List, Filter } from "lucide-react";
import { getCategoryBySlug, getBreadcrumbs, categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductCard } from "@/components/Commerce";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [view, setView] = useState<"grid" | "list">("grid");
  const cat = slug ? getCategoryBySlug(slug) : null;
  const breadcrumbs = slug ? getBreadcrumbs(slug) : [];

  if (!cat) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Kategoria nie znaleziona</h1>
        <Link to="/produkty"><Button className="bg-primary">Przeglądaj wszystkie produkty</Button></Link>
      </div>
    );
  }

  const catProducts = products.filter(p => p.categorySlug === cat.slug || (cat.children?.some(c => c.slug === p.categorySlug)));
  const allSubSlugs = (cat.children || []).flatMap(c => [c.slug, ...(c.children || []).map(cc => cc.slug)]);
  const filteredProducts = products.filter(p => p.categorySlug === cat.slug || allSubSlugs.includes(p.categorySlug));

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
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 bg-primary text-white font-bold text-sm flex items-center gap-2">
                <Filter className="w-4 h-4" /> Kategorie
              </div>
              <div className="p-3 space-y-1">
                {/* Top level cats */}
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
          </aside>

          {/* Main content */}
          <div className="flex-1">
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
                      <ChevronRight className="w-3 h-3 text-primary mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Products */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900">Produkty w kategorii</h2>
                  <Badge variant="secondary">{filteredProducts.length > 0 ? filteredProducts.length : "Zapytaj"}</Badge>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setView("grid")} className={`p-2 rounded border ${view === "grid" ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-500 hover:border-primary"}`}><Grid className="w-4 h-4" /></button>
                  <button onClick={() => setView("list")} className={`p-2 rounded border ${view === "list" ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-500 hover:border-primary"}`}><List className="w-4 h-4" /></button>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-3"}>
                  {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="text-5xl mb-4">🏗️</div>
                  <h3 className="font-bold text-gray-900 mb-2">Baza produktów w rozbudowie</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">Aktywnie uzupełniamy naszą bazę produktów. Zadzwoń lub napisz – z pewnością mamy to, czego szukasz!</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="tel:+48509567213"><Button className="bg-primary hover:bg-red-700">📞 Zadzwoń: +48 509 567 213</Button></a>
                    <Link to="/kontakt"><Button variant="outline" className="border-primary text-primary">✉️ Wyślij zapytanie</Button></Link>
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
