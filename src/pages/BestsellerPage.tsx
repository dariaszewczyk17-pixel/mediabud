import { Link } from "react-router-dom";
import { ChevronRight, TrendingUp, ArrowRight, Phone } from "lucide-react";
import { products as allStaticProducts } from "@/data/products";
import { ProductCard } from "@/components/Commerce";
import { useSEO } from "@/hooks/useSEO";
import { BESTSELLER_SLUGS, BESTSELLER_CATEGORY_FILTERS, type BestsellerCategoryId } from "@/lib/bestsellers";
import { useState, useMemo } from "react";

/* ─── Dane SEO ────────────────────────────────────────────────── */
const SEO_TITLE    = "Bestsellery Materiałów Budowlanych 2026 – Sklep Media Bud Lublin";
const SEO_DESC     = "Najchętniej kupowane materiały budowlane w Lublinie: kleje do styropianu, styropian fasadowy, wełna mineralna, tynki silikonowe, kleje do płytek, farby elewacyjne. Skład budowlany Media Bud, ul. Chemiczna 8d Lublin. Dostawa 24h.";
const CANONICAL    = "/bestsellery";
const PAGE_URL     = "https://mediabud.pl/bestsellery";
const ORG_ID       = "https://mediabud.pl/#organization";
const SITE_ID      = "https://mediabud.pl/#website";

/* ─── Produkty w rankingowej kolejności ──────────────────────── */
const slugSet    = new Set(BESTSELLER_SLUGS);
const ORDERED_BESTSELLERS = (() => {
  const found = allStaticProducts.filter(p => slugSet.has(p.slug));
  return (BESTSELLER_SLUGS as readonly string[])
    .map(slug => found.find(p => p.slug === slug))
    .filter(Boolean) as typeof found;
})();

/* ─── Component ───────────────────────────────────────────────── */
export default function BestsellerPage() {
  const [activeCategory, setActiveCategory] = useState<BestsellerCategoryId>("wszystkie");

  useSEO({ title: SEO_TITLE, description: SEO_DESC, canonical: CANONICAL });

  /* Filtrowanie po kategorii */
  const displayed = useMemo(() => {
    if (activeCategory === "wszystkie") return ORDERED_BESTSELLERS;
    const filter = BESTSELLER_CATEGORY_FILTERS.find(f => f.id === activeCategory);
    if (!filter || !("slugs" in filter)) return ORDERED_BESTSELLERS;
    const catSet = new Set(filter.slugs);
    return ORDERED_BESTSELLERS.filter(p => catSet.has(p.categorySlug));
  }, [activeCategory]);

  /* JSON-LD CollectionPage jako inter-connected graph */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        "name": "Media Bud – Skład Budowlany Lublin",
        "url": "https://mediabud.pl",
      },
      {
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Media Bud – Skład Budowlany",
        "url": "https://mediabud.pl",
        "telephone": "+48533553344",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ul. Chemiczna 8d",
          "addressLocality": "Lublin",
          "postalCode": "20-329",
          "addressCountry": "PL",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#collection`,
        "name": "Bestsellery materiałów budowlanych – Media Bud Lublin 2026",
        "description": SEO_DESC,
        "url": PAGE_URL,
        "isPartOf": { "@id": SITE_ID },
        "publisher": { "@id": ORG_ID },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl" },
            { "@type": "ListItem", "position": 2, "name": "Bestsellery", "item": PAGE_URL },
          ],
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Bestsellery materiałów budowlanych – ranking Media Bud 2026",
          "description": "Najchętniej kupowane produkty w składzie budowlanym Media Bud w Lublinie",
          "numberOfItems": ORDERED_BESTSELLERS.length,
          "itemListElement": ORDERED_BESTSELLERS.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": `https://mediabud.pl/produkty/${p.slug}`,
            "name": p.name,
            "item": {
              "@type": "Product",
              "name": p.name,
              "url": `https://mediabud.pl/produkty/${p.slug}`,
              "brand": { "@type": "Brand", "name": p.brand },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "PLN",
                "seller": { "@id": ORG_ID },
              },
            },
          })),
        },
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* JSON-LD CollectionPage graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Breadcrumb ── */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto px-4 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-gray-600 flex-wrap">
            <Link to="/" className="hover:text-[#f81828] transition-colors">Strona główna</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-300 font-medium">Bestsellery</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(248,24,40,0.12)" }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(248,24,40,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(248,24,40,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]"
          style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, #f81828, rgba(248,24,40,0.2) 60%, transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to top, #080808, transparent)" }} />

        <div className="relative container mx-auto px-6 py-12 pl-10">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[#f81828]" />
                <span className="text-[10px] font-black text-[#f81828] tracking-widest uppercase">
                  Ranking popularności 2026
                </span>
                <span className="h-px flex-1 max-w-12" style={{ background: "rgba(248,24,40,0.4)" }} />
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-4">
                Bestsellery<br className="sm:hidden" />{" "}
                <span className="text-[#f81828]">Materiałów Budowlanych</span>
              </h1>

              <p className="text-gray-400 max-w-2xl text-sm leading-relaxed mb-2">
                Najchętniej kupowane materiały budowlane w składzie{" "}
                <strong className="text-gray-300">Media Bud Lublin</strong> –
                izolacje termiczne, chemia budowlana, tynki, farby elewacyjne.
                Ranking oparty na danych sprzedażowych i analizie rynku budowlanego PL 2026
                (ASM Research · Budowlana Marka Roku).
              </p>
              <p className="text-gray-600 text-xs">
                ul. Chemiczna 8d, Lublin · pon–pt 7:00–16:00, sob 7:00–13:00 · tel. 533 553 344
              </p>
            </div>

            {/* Licznik */}
            <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
              <span
                className="font-display font-black text-[#f81828]/15 leading-none select-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                {String(ORDERED_BESTSELLERS.length).padStart(2, "0")}
              </span>
              <span className="text-xs text-gray-600 uppercase tracking-widest">produktów</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Treść SEO + filtry ── */}
      <div className="container mx-auto px-4 py-8">

        {/* Paragraph SEO — widoczny dla Google, naturalnie wplecione keywords */}
        <div
          className="rounded-xl p-5 mb-6 text-sm leading-relaxed text-gray-500"
          style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p>
            W naszym składzie budowlanym w Lublinie najlepiej sprzedają się produkty
            do <strong className="text-gray-400">ocieplenia budynków</strong> (styropian fasadowy EPS 100,
            wełna mineralna Rockwool), <strong className="text-gray-400">chemia budowlana ETICS</strong>{" "}
            (kleje do styropianu Atlas i Weber, siatka elewacyjna),{" "}
            <strong className="text-gray-400">tynki zewnętrzne i wewnętrzne</strong>{" "}
            (tynk silikonowy Weber, tynk gipsowy Knauf Goldband) oraz{" "}
            <strong className="text-gray-400">farby elewacyjne</strong>{" "}
            (Caparol SiliconColor, Dulux Weathershield).
            Poniżej prezentujemy aktualny ranking – produkty dostępne od ręki,
            z <strong className="text-gray-400">dostawą na terenie Lublina i okolic</strong>.
          </p>
        </div>

        {/* Filtry kategorii */}
        <div className="flex flex-wrap gap-2 mb-6">
          {BESTSELLER_CATEGORY_FILTERS.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveCategory(filter.id as BestsellerCategoryId)}
              aria-pressed={activeCategory === filter.id}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeCategory === filter.id
                  ? "bg-[#f81828] text-white shadow-[0_0_12px_rgba(248,24,40,0.35)]"
                  : "text-gray-400 hover:text-white hover:border-[#f81828]/40"
              }`}
              style={{
                background: activeCategory === filter.id ? "#f81828" : "#0f0f0f",
                border: activeCategory === filter.id
                  ? "1px solid #f81828"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {filter.label}
              {activeCategory === filter.id && displayed.length > 0 && (
                <span className="ml-1.5 text-[10px] opacity-75">({displayed.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Grid produktów z badge BESTSELLER */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayed.map((product, i) => (
              <div key={product.id} className="relative group">
                {/* Badge BESTSELLER */}
                <div
                  className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase text-white select-none pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, #f81828 0%, #c8000f 100%)",
                    boxShadow: "0 2px 8px rgba(248,24,40,0.45)",
                  }}
                >
                  <TrendingUp className="w-2.5 h-2.5" />
                  #{i + 1} Bestseller
                </div>

                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-gray-500 text-sm">Brak produktów w tej kategorii.</p>
            <button
              onClick={() => setActiveCategory("wszystkie")}
              className="mt-4 text-[#f81828] text-sm font-semibold hover:underline"
            >
              Pokaż wszystkie bestsellery
            </button>
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(248,24,40,0.1) 0%, rgba(248,24,40,0.04) 100%)",
            border: "1px solid rgba(248,24,40,0.2)",
          }}
        >
          <div>
            <p className="text-xs font-black text-[#f88090] uppercase tracking-widest mb-1">
              Pełna oferta
            </p>
            <h2 className="text-xl font-black text-white mb-1">
              Ponad 15 000 materiałów budowlanych
            </h2>
            <p className="text-gray-500 text-sm">
              Skład budowlany Media Bud Lublin – wszystkie kategorie, marki premium
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/produkty"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all hover:shadow-[0_0_16px_rgba(248,24,40,0.4)]"
              style={{ background: "#f81828" }}
            >
              Przeglądaj katalog <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+48533553344"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-gray-300 transition-all hover:text-white"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Phone className="w-4 h-4 text-[#f81828]" /> 533 553 344
            </a>
          </div>
        </div>

        {/* Sekcja SEO — więcej treści dla Google */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Bestsellery izolacji termicznych",
              desc: "Styropian fasadowy EPS 100 i wełna mineralna fasadowa Rockwool Frontrock MAX E to podstawa każdego systemu ocieplenia ETICS. Dostępne w atrakcyjnych cenach hurtowych.",
              link: "/kategoria/izolacje",
              label: "Izolacje →",
            },
            {
              title: "Chemia budowlana — hity sprzedaży",
              desc: "Klej do styropianu Atlas Stopter K-20, klej do płytek Ceresit CM 11, zaprawa murarska Baumit — sprawdzone produkty do każdego etapu budowy i remontu.",
              link: "/kategoria/chemia-budowlana",
              label: "Chemia budowlana →",
            },
            {
              title: "Tynki i farby elewacyjne",
              desc: "Tynk silikonowy Weber.pas DR1, tynk gipsowy Knauf Goldband, farba elewacyjna Caparol SiliconColor — najczęściej wybierane wykończenia elewacji w Lublinie.",
              link: "/kategoria/farby-i-rozpuszczalniki",
              label: "Farby i tynki →",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.desc}</p>
              <Link
                to={item.link}
                className="text-[#f81828] text-xs font-semibold hover:underline flex items-center gap-1"
              >
                {item.label} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
