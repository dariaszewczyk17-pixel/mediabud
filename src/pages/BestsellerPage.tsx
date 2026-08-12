import { Link } from "react-router-dom";
import { ChevronRight, TrendingUp, ArrowRight, Phone, Award, Shield, Star, Zap } from "lucide-react";
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

/* ─── TOP-3 badge config ──────────────────────────────────────── */
const RANK_BADGE = [
  {
    label: "#1",
    bg: "linear-gradient(135deg,#FFD700 0%,#FFA500 100%)",
    shadow: "0 0 20px rgba(255,215,0,0.6), 0 2px 8px rgba(0,0,0,0.5)",
    text: "#1a1000",
    icon: "🥇",
  },
  {
    label: "#2",
    bg: "linear-gradient(135deg,#C0C0C0 0%,#A8A8A8 100%)",
    shadow: "0 0 16px rgba(192,192,192,0.45), 0 2px 8px rgba(0,0,0,0.5)",
    text: "#111",
    icon: "🥈",
  },
  {
    label: "#3",
    bg: "linear-gradient(135deg,#CD7F32 0%,#A0522D 100%)",
    shadow: "0 0 16px rgba(205,127,50,0.45), 0 2px 8px rgba(0,0,0,0.5)",
    text: "#1a0a00",
    icon: "🥉",
  },
];

/* ─── Produkty w rankingowej kolejności ──────────────────────── */
const slugSet    = new Set<string>(BESTSELLER_SLUGS as readonly string[]);
const ORDERED_BESTSELLERS = (() => {
  const found = allStaticProducts.filter(p => (slugSet as Set<string>).has(p.slug));
  return (BESTSELLER_SLUGS as readonly string[])
    .map(slug => found.find(p => p.slug === slug))
    .filter(Boolean) as typeof found;
})();

/* ─── Component ───────────────────────────────────────────────── */
export default function BestsellerPage() {
  const [activeCategory, setActiveCategory] = useState<BestsellerCategoryId>("wszystkie");

  useSEO({ title: SEO_TITLE, description: SEO_DESC, canonical: CANONICAL });

  const displayed = useMemo(() => {
    if (activeCategory === "wszystkie") return ORDERED_BESTSELLERS;
    const filter = BESTSELLER_CATEGORY_FILTERS.find(f => f.id === activeCategory);
    if (!filter || !("slugs" in filter)) return ORDERED_BESTSELLERS;
    const catSet = new Set<string>(filter.slugs as readonly string[]);
    return ORDERED_BESTSELLERS.filter(p => catSet.has(p.categorySlug));
  }, [activeCategory]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": SITE_ID, "name": "Media Bud – Skład Budowlany Lublin", "url": "https://mediabud.pl" },
      { "@type": "Organization", "@id": ORG_ID, "name": "Media Bud – Skład Budowlany", "url": "https://mediabud.pl", "telephone": "+48533553344",
        "address": { "@type": "PostalAddress", "streetAddress": "ul. Chemiczna 8d", "addressLocality": "Lublin", "postalCode": "20-329", "addressCountry": "PL" } },
      { "@type": "CollectionPage", "@id": `${PAGE_URL}#collection`, "name": "Bestsellery materiałów budowlanych – Media Bud Lublin 2026", "description": SEO_DESC, "url": PAGE_URL,
        "isPartOf": { "@id": SITE_ID }, "publisher": { "@id": ORG_ID },
        "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl" },
          { "@type": "ListItem", "position": 2, "name": "Bestsellery", "item": PAGE_URL },
        ]},
        "mainEntity": { "@type": "ItemList", "name": "Bestsellery materiałów budowlanych – ranking Media Bud 2026",
          "numberOfItems": ORDERED_BESTSELLERS.length,
          "itemListElement": ORDERED_BESTSELLERS.map((p, i) => ({
            "@type": "ListItem", "position": i + 1, "url": `https://mediabud.pl/produkt/${p.slug}`, "name": p.name,
            "item": { "@type": "Product", "name": p.name, "sku": p.sku || undefined, "image": p.images?.[0] ? `https://mediabud.pl${p.images[0]}` : undefined,
              "brand": { "@type": "Brand", "name": p.brand } },
          })),
        },
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "#08080a", borderBottom: "1px solid rgba(248,24,40,0.15)" }}
      >
        {/* Siatka tła */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(248,24,40,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.07) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }} />
        {/* Glowy */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(248,24,40,0.1) 0%,transparent 65%)" }} />

        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]"
          style={{ boxShadow: "2px 0 16px rgba(248,24,40,0.55)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.18) 55%,transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to top, #050505, transparent)" }} />

        <div className="relative container mx-auto px-6 py-14 pl-10">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              {/* Badge #1 animowany */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="relative flex items-center justify-center w-12 h-12 rounded-xl font-black text-lg"
                  style={{
                    background: "linear-gradient(135deg,#FFD700,#FFA500)",
                    boxShadow: "0 0 30px rgba(255,215,0,0.55), 0 0 60px rgba(255,165,0,0.2)",
                    animation: "pulse1 2.5s ease-in-out infinite",
                    color: "#1a1000",
                  }}
                >
                  #1
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#f81828]" />
                    <span className="text-[10px] font-black text-[#f81828] tracking-[0.3em] uppercase">
                      Ranking popularności 2026
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-600 mt-0.5">
                    Oparty na danych sprzedażowych Media Bud
                  </div>
                </div>
              </div>

              <h1
                className="font-display font-black leading-tight tracking-tight text-white mb-4 uppercase"
                style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
              >
                TOP{" "}
                <span style={{ color: "#f81828", textShadow: "0 0 40px rgba(248,24,40,0.4)" }}>
                  BESTSELLERY
                </span>
              </h1>

              <p className="text-gray-400 max-w-2xl text-sm leading-relaxed mb-2">
                Najchętniej kupowane materiały budowlane w składzie{" "}
                <strong className="text-gray-300">Media Bud Lublin</strong> —
                izolacje termiczne, chemia budowlana, tynki, farby elewacyjne.
              </p>
              <p className="text-gray-600 text-xs font-mono">
                ul. Chemiczna 8d, Lublin · pon–pt 7:00–16:00 · tel. 533&nbsp;553&nbsp;344
              </p>
            </div>

            {/* Duży licznik */}
            <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
              <span
                className="font-display font-black leading-none select-none"
                style={{
                  fontSize: "clamp(4rem,7vw,6rem)",
                  color: "rgba(248,24,40,0.1)",
                  textShadow: "0 0 40px rgba(248,24,40,0.05)",
                }}
              >
                {String(ORDERED_BESTSELLERS.length).padStart(2, "0")}
              </span>
              <span className="text-xs text-gray-700 uppercase tracking-widest">produktów</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* ── SEO paragraph ── */}
        <div
          className="rounded-2xl p-5 mb-6 text-sm leading-relaxed text-gray-500 relative overflow-hidden"
          style={{ background: "#0c0c0c", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828] rounded-l-2xl"
            style={{ boxShadow: "2px 0 8px rgba(248,24,40,0.35)" }} />
          <p className="pl-3">
            W naszym składzie budowlanym w Lublinie najlepiej sprzedają się produkty
            do <strong className="text-gray-400">ocieplenia budynków</strong> (styropian fasadowy EPS 100,
            wełna mineralna Rockwool), <strong className="text-gray-400">chemia budowlana ETICS</strong>{" "}
            (kleje do styropianu Atlas i Weber, siatka elewacyjna),{" "}
            <strong className="text-gray-400">tynki zewnętrzne i wewnętrzne</strong>{" "}
            (tynk silikonowy Weber, tynk gipsowy Knauf Goldband) oraz{" "}
            <strong className="text-gray-400">farby elewacyjne</strong>{" "}
            (Caparol SiliconColor, Dulux Weathershield).
          </p>
        </div>

        {/* ── Filtry kategorii ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {BESTSELLER_CATEGORY_FILTERS.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveCategory(filter.id as BestsellerCategoryId)}
              aria-pressed={activeCategory === filter.id}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: activeCategory === filter.id ? "#f81828" : "#0f0f0f",
                color: activeCategory === filter.id ? "#fff" : "#888",
                border: activeCategory === filter.id ? "1px solid #f81828" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: activeCategory === filter.id ? "0 0 16px rgba(248,24,40,0.4), 0 0 40px rgba(248,24,40,0.12)" : "none",
                transform: activeCategory === filter.id ? "translateY(-1px)" : "",
              }}
            >
              {filter.label}
              {activeCategory === filter.id && displayed.length > 0 && (
                <span className="ml-1.5 text-[10px] opacity-75">({displayed.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Grid produktów ── */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayed.map((product, i) => {
              const badge = i < 3 ? RANK_BADGE[i] : null;
              return (
                <div key={product.id} className="relative group">
                  {/* Ranking badge */}
                  {badge ? (
                    <div
                      className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-black tracking-wide select-none pointer-events-none"
                      style={{
                        background: badge.bg,
                        boxShadow: badge.shadow,
                        color: badge.text,
                      }}
                    >
                      <span>{badge.icon}</span>
                      <span>{badge.label} Bestseller</span>
                    </div>
                  ) : (
                    <div
                      className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase text-white select-none pointer-events-none"
                      style={{
                        background: "linear-gradient(135deg,#f81828 0%,#c8000f 100%)",
                        boxShadow: "0 2px 8px rgba(248,24,40,0.45)",
                      }}
                    >
                      <TrendingUp className="w-2.5 h-2.5" />
                      #{i + 1} Bestseller
                    </div>
                  )}
                  <ProductCard product={product} />
                </div>
              );
            })}
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

        {/* ── Sekcja "Dlaczego bestsellery?" ── */}
        <div className="mt-12">
          {/* Nagłówek sekcji */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-[3px] h-7 bg-[#f81828] rounded-full" style={{ boxShadow: "0 0 8px rgba(248,24,40,0.6)" }} />
            <h2 className="font-display font-black text-white text-xl uppercase tracking-wide">
              Dlaczego bestsellery?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <Award className="w-6 h-6" />,
                title: "Sprawdzone przez tysiące budowlańców",
                desc: "Każdy produkt w rankingu przeszedł test tysięcy realizacji budowlanych. Wybierając bestsellery, wybierasz produkty, które naprawdę działają.",
                color: "#FFD700",
                glow: "rgba(255,215,0,0.12)",
                border: "rgba(255,215,0,0.2)",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Gwarancja jakości i dostępności",
                desc: "Bestsellery są zawsze na stanie. Szybka dostawa, pełna dostępność i pewność, że produkt spełni normy budowlane.",
                color: "#4ade80",
                glow: "rgba(74,222,128,0.10)",
                border: "rgba(74,222,128,0.18)",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Optymalna relacja jakości do ceny",
                desc: "Ranking bazuje na danych sprzedażowych i opiniach wykonawców. To produkty, które łączą premium jakość z rozsądną ceną.",
                color: "#f81828",
                glow: "rgba(248,24,40,0.10)",
                border: "rgba(248,24,40,0.2)",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 transition-all duration-300 group"
                style={{
                  background: "#0c0c0c",
                  border: `1px solid ${item.border}`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${item.glow}, 0 0 0 1px ${item.border}`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: item.glow, border: `1px solid ${item.border}`, color: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="font-display font-black text-white text-sm mb-2 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className="mt-10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg,rgba(248,24,40,0.1) 0%,rgba(248,24,40,0.04) 100%)",
            border: "1px solid rgba(248,24,40,0.22)",
          }}
        >
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(248,24,40,0.1) 0%,transparent 70%)" }} />
          <div>
            <p className="text-xs font-black text-[#f88090] uppercase tracking-widest mb-1">Pełna oferta</p>
            <h2 className="text-xl font-black text-white mb-1">Ponad 15&nbsp;000 materiałów budowlanych</h2>
            <p className="text-gray-500 text-sm">Skład budowlany Media Bud Lublin – wszystkie kategorie, marki premium</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/produkty"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "#f81828" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(248,24,40,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              Przeglądaj katalog <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+48533553344"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-300 transition-all hover:text-white"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Phone className="w-4 h-4 text-[#f81828]" /> 533&nbsp;553&nbsp;344
            </a>
          </div>
        </div>

        {/* ── Sekcja SEO ── */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Bestsellery izolacji termicznych", desc: "Styropian fasadowy EPS 100 i wełna mineralna fasadowa Rockwool Frontrock MAX E to podstawa każdego systemu ocieplenia ETICS. Dostępne w atrakcyjnych cenach hurtowych.", link: "/kategoria/izolacje", label: "Izolacje →" },
            { title: "Chemia budowlana — hity sprzedaży", desc: "Klej do styropianu Atlas Stopter K-20, klej do płytek Ceresit CM 11, zaprawa murarska Baumit — sprawdzone produkty do każdego etapu budowy i remontu.", link: "/kategoria/chemia-budowlana", label: "Chemia budowlana →" },
            { title: "Tynki i farby elewacyjne", desc: "Tynk silikonowy Weber.pas DR1, tynk gipsowy Knauf Goldband, farba elewacyjna Caparol SiliconColor — najczęściej wybierane wykończenia elewacji w Lublinie.", link: "/kategoria/farby-i-rozpuszczalniki", label: "Farby i tynki →" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5 transition-all duration-200"
              style={{ background: "#0c0c0c", border: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Star className="w-3 h-3 text-[#f81828]" />
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.desc}</p>
              <Link to={item.link} className="text-[#f81828] text-xs font-semibold hover:underline flex items-center gap-1">
                {item.label} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse1 {
          0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,165,0,0.15); }
          50% { box-shadow: 0 0 35px rgba(255,215,0,0.8), 0 0 70px rgba(255,165,0,0.3); }
        }
      `}</style>
    </div>
  );
}
