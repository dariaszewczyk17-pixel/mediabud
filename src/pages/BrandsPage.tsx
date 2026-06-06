import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { ChevronRight, Phone, Search } from "lucide-react";
import { BRANDS, slugifyBrand, type BrandItem } from "@/data/brands";

const PAGE_SIZE = 48;

export default function BrandsPage() {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (query.length < 2) return BRANDS;
    const q = query.toLowerCase();
    return BRANDS.filter(b => b.name.toLowerCase().includes(q));
  }, [query]);

  // Przy każdej zmianie filtra resetuj liczbę widocznych kart
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query]);

  const visibleBrands = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visibleCount;

  useSEO({
    title: "Marki budowlane – Weber, Knauf, Atlas, Baumit i 260+ producentów | Media Bud Lublin",
    description: "Oferujemy produkty 268 marek budowlanych: Weber, Knauf, Atlas, Baumit, Rockwool, URSA, Velux, Ceresit, Mapei, Sika i wielu innych. Skład budowlany Media Bud Lublin — tel. +48 533 553 344.",
    canonical: "/marki",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
            { "@type": "ListItem", "position": 2, "name": "Marki", "item": "https://mediabud.pl/marki" }
          ]
        },
        {
          "@type": "ItemList",
          "name": "Marki materiałów budowlanych – Media Bud Lublin",
          "numberOfItems": BRANDS.length,
          "itemListElement": BRANDS.slice(0, 10).map((b, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": b.name,
            "item": { "@type": "Brand", "name": b.name }
          }))
        }
      ]
    }
  });

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2) 60%,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-10 py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-4 text-[11px] text-gray-600">
            <Link to="/" className="hover:text-[#f81828] transition-colors font-medium">Strona główna</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 font-medium">Marki</span>
          </nav>
          <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-2">— Nasi producenci —</p>
          <h1 className="font-display text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
            Marki materiałów budowlanych<br />
            <span style={{ color: "#f81828" }}>w ofercie Media Bud</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            Współpracujemy z ponad <strong className="text-gray-300">260 producentami</strong> materiałów budowlanych.
            Gwarantujemy oryginalne produkty z pełną dokumentacją techniczną i certyfikatami jakości.
          </p>
          <div className="flex flex-wrap gap-8 mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { val: `${BRANDS.length}+`, label: "marek w katalogu" },
              { val: "15 000+", label: "produktów" },
            ].map((s, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="font-display font-black text-2xl text-[#f81828]">{s.val}</span>
                <span className="text-xs text-gray-600 uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WSZYSTKIE MARKI — siatka logo ── */}
      <section className="py-12" style={{ background: "#050505", borderTop: "1px solid #141414" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-[0.2em]">
              <span className="w-[3px] h-4 rounded-full" style={{ background: "rgba(248,24,40,0.6)" }} />
              Wszystkie marki ({BRANDS.length})
            </h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="Szukaj marki…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(248,24,40,0.5)"; }}
                onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-gray-600 text-sm py-8 text-center">Nie znaleziono marki „{query}"</p>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {visibleBrands.map((brand, idx) => (
                  <Link
                    key={brand.name}
                    to={`/marki/${slugifyBrand(brand.name)}`}
                    className="group flex flex-col items-center rounded-xl overflow-hidden transition-all duration-200"
                    style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)" }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(248,24,40,0.4)";
                      el.style.boxShadow = "0 4px 16px rgba(248,24,40,0.12)";
                      el.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(255,255,255,0.07)";
                      el.style.boxShadow = "none";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <div className="w-full flex items-center justify-center p-3" style={{ background: "#fff", minHeight: "64px" }}>
                      <img
                        src={brand.logo}
                        alt={`Logo ${brand.name}`}
                        loading={idx < PAGE_SIZE ? "eager" : "lazy"}
                        className="max-h-[40px] max-w-[90px] w-auto object-contain"
                      />
                    </div>
                    <div className="w-full h-[2px]" style={{ background: "linear-gradient(90deg,#f81828 16px,rgba(255,255,255,0.05) 16px)" }} />
                    <div className="w-full px-2 py-2 text-center">
                      <span className="text-[10px] font-semibold text-gray-400 group-hover:text-white transition-colors leading-tight block truncate">
                        {brand.name}
                      </span>
                      <span className="text-[9px] text-[#f88090] leading-none block mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                        → produkty
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {remaining > 0 && (
                <div className="mt-8 flex flex-col items-center gap-2">
                  <p className="text-xs text-gray-600">
                    Wyświetlono <span className="text-gray-400 font-semibold">{visibleBrands.length}</span> z <span className="text-gray-400 font-semibold">{filtered.length}</span> marek
                  </p>
                  <button
                    onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(248,24,40,0.3)] hover:bg-[#c8000f] active:scale-95"
                    style={{ background: "#f81828" }}
                  >
                    Pokaż więcej
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-black/20">
                      +{Math.min(remaining, PAGE_SIZE)}
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── SEO TEXT ── */}
      <section className="py-14" style={{ background: "#080808" }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-xl font-black text-white mb-5 flex items-center gap-2">
            <span className="w-[3px] h-5 bg-[#f81828] rounded-full" />
            Dlaczego warto kupować markowe materiały budowlane?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <p className="text-sm text-gray-400 leading-relaxed">
              W składzie <strong className="text-gray-300">Media Bud</strong> w Lublinie oferujemy wyłącznie oryginalne produkty
              od renomowanych producentów — z pełną dokumentacją techniczną, kartami danych bezpieczeństwa
              i atestami budowlanymi. Wszystkie produkty spełniają polskie i europejskie normy jakości.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Współpracujemy z markami takimi jak <strong className="text-gray-300">Weber, Knauf, Atlas, Baumit, Rockwool, URSA, Velux, Ceresit, Mapei, Sika</strong> i ponad 250 innymi.
              Jeśli szukasz konkretnego producenta, zadzwoń:
              <a href="tel:+48533553344" className="text-[#f81828] font-semibold hover:underline ml-1">+48&nbsp;533&nbsp;553&nbsp;344</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12" style={{ background: "#050505", borderTop: "1px solid #141414" }}>
        <div className="container mx-auto px-4">
          <div className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.1),rgba(248,24,40,0.04))", border: "1px solid rgba(248,24,40,0.2)" }}>
            <div>
              <p className="text-white font-bold text-lg mb-1">Nie widzisz swojej marki?</p>
              <p className="text-gray-500 text-sm max-w-md">
                Współpracujemy z setkami producentów. Zadzwoń — możemy zamówić praktycznie każdy produkt budowlany.
              </p>
            </div>
            <a href="tel:+48533553344"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:shadow-[0_0_20px_rgba(248,24,40,0.4)] hover:bg-[#c8000f]"
              style={{ background: "#f81828" }}>
              <Phone className="w-4 h-4" /> +48 533 553 344
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
