import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSEO } from "@/hooks/useSEO";
import { ChevronRight, ArrowRight, Phone, Grid3x3 } from "lucide-react";
import { categories } from "@/data/categories";
import { products as allProducts } from "@/data/products";

const card = { background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" } as const;
const cardHover = "hover:border-[#f81828]/30 hover:shadow-[0_8px_32px_rgba(248,24,40,0.10)] transition-all duration-300";

const PAGE_SIZE = 24;

function CatalogSection() {
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Lazy load — zainiciuj dopiero gdy sekcja jest widoczna
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLoaded(true); obs.disconnect(); } }, { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const visible = allProducts.slice(0, page * PAGE_SIZE);

  return (
    <section ref={sectionRef} className="py-14" style={{ background: "#050505", borderTop: "1px solid #111" }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-[10px] font-black text-[#f81828] tracking-[0.4em] uppercase mb-1">Pełny katalog</p>
            <h2 className="font-display text-2xl font-black text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
              {allProducts.length.toLocaleString("pl-PL")}+ produktów
            </h2>
          </div>
          <Link to="/produkty" className="text-xs font-black uppercase tracking-widest text-[#f81828] hover:underline flex items-center gap-1">
            Filtruj według kategorii <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loaded ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {visible.map((p) => (
                <Link
                  key={p.id}
                  to={`/produkty/${p.slug}`}
                  className="group rounded-xl overflow-hidden transition-all duration-200"
                  style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(248,24,40,0.4)"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 24px rgba(248,24,40,0.1)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.transform = ""; el.style.boxShadow = "none"; }}
                >
                  {p.images?.[0] ? (
                    <div className="h-28 overflow-hidden bg-white flex items-center justify-center p-2">
                      <img src={p.images[0]} alt={p.name} loading="lazy" className="max-h-full max-w-full object-contain" />
                    </div>
                  ) : (
                    <div className="h-28 flex items-center justify-center" style={{ background: "#1a1a1a" }}>
                      <span className="text-2xl font-black text-[#333]">{p.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="p-2.5">
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#f81828] mb-0.5 truncate">{p.brand}</p>
                    <p className="text-xs text-white font-semibold line-clamp-2 leading-tight" style={{ minHeight: "2.4em" }}>{p.name}</p>
                  </div>
                </Link>
              ))}
            </div>
            {page * PAGE_SIZE < allProducts.length && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-8 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white transition-all hover:brightness-110"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  Załaduj więcej ({Math.min(PAGE_SIZE, allProducts.length - page * PAGE_SIZE)} kolejnych)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden animate-pulse" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="h-28" style={{ background: "#1a1a1a" }} />
                <div className="p-2.5 space-y-1.5">
                  <div className="h-2 rounded w-1/2" style={{ background: "#222" }} />
                  <div className="h-3 rounded w-4/5" style={{ background: "#222" }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


export default function AllCategoriesPage() {
  const catImages: Record<string, string> = {
    "chemia-budowlana":       "/images/cat-chemia_2.png",
    "dachy":                  "/images/cat-dachy_2.png",
    "farby-i-rozpuszczalniki":"/images/cat-farby_2.png",
    "izolacje":               "/images/cat-ocieplenia_2.png",
    "narzedzia-i-mocowania":  "/images/cat-narzedzia_2.png",
    "plytki":                 "/images/cat-plytki_2.png",
    "stropy-i-sciany":        "/images/cat-sciany_2.png",
    "sucha-zabudowa":         "/images/cat-sucha-zabudowa_2.png",
    "sufity-podwieszane":     "/images/cat-sufity_2.png",
    "pozostale":              "https://skyagent-artifacts.skywork.ai/router/agent/2026-06-08/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/pozostale_kategoria_2_8a82cc38d2a44d9b884d891b1745b7b2.png",
  };

  useSEO({
    title: "Katalog produktów – Materiały budowlane Lublin | Media Bud",
    description: "Ponad 15 000 materiałów budowlanych w jednym miejscu. Chemia budowlana, izolacje, farby, dachy, płytki, narzędzia i więcej. Skład budowlany Media Bud Lublin — tel. +48 533 553 344.",
    canonical: "/produkty",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
          { "@type": "ListItem", "position": 2, "name": "Katalog produktów", "item": "https://mediabud.pl/produkty" }
        ]},
        { "@type": "ItemList", "name": "Katalog kategorii materiałów budowlanych – Media Bud Lublin",
          "description": "Wszystkie kategorie materiałów budowlanych dostępnych w składzie Media Bud w Lublinie",
          "numberOfItems": categories.length,
          "itemListElement": categories.map((cat, idx) => ({
            "@type": "ListItem", "position": idx + 1, "name": cat.name,
            "url": `https://mediabud.pl/kategoria/${cat.slug}`
          }))
        }
      ]
    }
  });

  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "#08080a", borderBottom: "1px solid rgba(248,24,40,0.15)" }}
      >
        {/* Siatka animowana */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(248,24,40,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.06) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
          animation: "gridScroll 24s linear infinite",
        }} />

        {/* Glowy tła */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(248,24,40,0.1) 0%,transparent 70%)" }} />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(248,24,40,0.06) 0%,transparent 70%)" }} />

        {/* Belka lewa */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]"
          style={{ boxShadow: "2px 0 16px rgba(248,24,40,0.55)" }} />
        {/* Linia górna */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.18) 55%,transparent)" }} />
        {/* Linia dolna fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12"
          style={{ background: "linear-gradient(to top,#050505,transparent)" }} />

        <div className="relative container mx-auto px-4 md:pl-10 py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-[11px] text-gray-600">
            <Link to="/" className="hover:text-[#f81828] transition-colors font-medium">Strona główna</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 font-medium">Produkty</span>
          </nav>

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(248,24,40,0.15)", border: "1px solid rgba(248,24,40,0.4)" }}>
              <Grid3x3 className="w-3.5 h-3.5 text-[#f81828]" />
            </div>
            <span className="text-[10px] font-black text-[#f81828] tracking-[0.3em] uppercase">
              Katalog produktów
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: "rgba(248,24,40,0.35)" }} />
          </div>

          <h1
            className="font-display font-black text-white leading-none mb-4 uppercase"
            style={{ fontSize: "clamp(2.2rem,6vw,4rem)", letterSpacing: "-0.02em" }}
          >
            WSZYSTKIE{" "}
            <span style={{ color: "#f81828", textShadow: "0 0 40px rgba(248,24,40,0.35)" }}>
              KATEGORIE
            </span>
          </h1>

          <p className="text-gray-400 text-sm max-w-xl leading-relaxed mb-6">
            Ponad 15&nbsp;000 produktów od czołowych producentów — Weber, Ceresit, Atlas, Knauf, Rockwool i wielu innych.
            Wszystko w jednym miejscu, z doradztwem technicznym i dostawą w Lublinie.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { val: `${categories.length}`, label: "kategorii" },
              { val: "60+",      label: "podkategorii" },
              { val: "15 000+", label: "produktów" },
              { val: "50+",      label: "marek" },
            ].map((s, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="font-display font-black text-2xl text-[#f81828]">{s.val}</span>
                <span className="text-xs text-gray-600 uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Podtytuł sekcji ── */}
      <section className="container mx-auto px-4 pt-10 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-[3px] h-6 bg-[#f81828] rounded-full" style={{ boxShadow: "0 0 8px rgba(248,24,40,0.6)" }} />
          <h2 className="font-display font-black text-white text-lg uppercase tracking-widest">
            Przeglądaj według kategorii
          </h2>
        </div>
        <p className="text-xs text-gray-600 pl-4">Kliknij kategorię aby zobaczyć wszystkie produkty</p>
      </section>

      {/* ── CATEGORY GRID ── */}
      <section className="container mx-auto px-4 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const img = catImages[cat.slug];
            const num = String(idx + 1).padStart(2, "0");

            return (
              <Link
                key={cat.id}
                to={`/kategoria/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl transition-all duration-400"
                style={{
                  minHeight: 230,
                  background: "#0f0f0f",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(248,24,40,0.5)";
                  el.style.boxShadow = "0 0 0 1px rgba(248,24,40,0.2), 0 16px 48px rgba(248,24,40,0.2)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.boxShadow = "none";
                  el.style.transform = "";
                }}
              >
                {/* Background photo + overlay */}
                {img && (
                  <div className="absolute inset-0">
                    <img
                      src={img}
                      alt={`${cat.name} – materiały budowlane Lublin`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      style={{ filter: "grayscale(0.3) brightness(0.5)" }}
                    />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(180deg,rgba(6,6,6,0.2) 0%,rgba(6,6,6,0.75) 55%,rgba(6,6,6,0.97) 100%)" }} />
                    {/* Czerwony overlay na hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.07) 0%,transparent 60%)" }} />
                  </div>
                )}

                {/* Animowana lewa belka czerwona */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828] opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.6)", transformOrigin: "top" }}
                />

                {/* Górna krawędź — pojawia się na hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.3))", boxShadow: "0 0 10px rgba(248,24,40,0.5)" }}
                />

                {/* Glassmorphism overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background: "linear-gradient(to top,rgba(248,24,40,0.06) 0%,transparent 100%)",
                    backdropFilter: "blur(1px)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-5 flex flex-col" style={{ minHeight: 230 }}>
                  {/* Top: numer + badge */}
                  <div className="flex items-start justify-between mb-auto">
                    <span
                      className="font-mono text-[11px] font-bold transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      {num}
                    </span>
                  </div>

                  {/* Bottom: name + desc + CTA z animowaną strzałką */}
                  <div className="mt-10">
                    <h2
                      className="font-display font-black text-white text-lg uppercase tracking-wide leading-tight mb-1 group-hover:text-[#ff9aa3] transition-colors duration-200"
                    >
                      {cat.name}
                    </h2>

                    {cat.description && (
                      <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed mb-2 group-hover:text-gray-500 transition-colors">
                        {cat.description}
                      </p>
                    )}

                    {/* Animowana strzałka CTA */}
                    <div
                      className="flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#f81828] opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ transform: "translateX(-8px)" }}
                      ref={el => {
                        if (!el) return;
                        el.addEventListener("transitionend", () => {});
                      }}
                    >
                      <span
                        className="group-hover:translate-x-2 transition-transform duration-300"
                        style={{ display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        Przeglądaj <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── BRANDS STRIP ── */}
      <section className="py-10" style={{ background: "#050505", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(248,24,40,0.25)" }} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f81828]">Nasze marki</p>
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(248,24,40,0.25)" }} />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Weber",    url: "https://static.www.bechcicki.pl/cms/1c6a19bca34f4da99131e0736ea4af9d-weber.png" },
              { name: "Ceresit",  url: "https://static.www.bechcicki.pl/cms/0dd0ae5703cd43b1afdcfca87416fd05-ceresit.png" },
              { name: "Atlas",    url: "https://static.www.bechcicki.pl/cms/ae397a1ebebc4e3083ff5765cff0ea4c-atlas.png" },
              { name: "Knauf",    url: "https://static.www.bechcicki.pl/cms/189dc43be7ae469eacd2a1eae4ef0c03-knauf-nowy.png" },
              { name: "Rockwool", url: "https://static.www.bechcicki.pl/cms/c742dfc82d1c42bb9fe0bc086f8ba822-rockwool.png" },
              { name: "Baumit",   url: "https://static.www.bechcicki.pl/cms/e4952888b3504ee78cbb6685f844b4cf-baumit-new.png" },
              { name: "Rigips",   url: "https://static.www.bechcicki.pl/cms/101a8b40f4e6454483f7cc7f6cb25cd7-rigips.png" },
              { name: "URSA",     url: "https://static.www.bechcicki.pl/cms/c6adf9efc58b4309bca4ca1642741842-ursa-etex.png" },
              { name: "Mapei",    url: "https://static.www.bechcicki.pl/cms/581c437c6b7a42b89a3151f944e3ed4e-mapei.png" },
              { name: "Sika",     url: "https://static.www.bechcicki.pl/cms/e2212f996bef427797215b970fcc6af1-sika.png" },
              { name: "Velux",    url: "https://static.www.bechcicki.pl/cms/f6736747f0f74f23bcf4900e60598c9d-velux.png" },
              { name: "Fakro",    url: "https://static.www.bechcicki.pl/cms/34b06a260cdd46d295f0be4e762a2580-fakro.png" },
            ].map(brand => (
              <div
                key={brand.name}
                className="flex flex-col items-center rounded-xl overflow-hidden transition-all duration-200"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(248,24,40,0.4)";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 6px 20px rgba(248,24,40,0.12)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div className="flex items-center justify-center px-4 py-3" style={{ background: "#fff", minHeight: "56px", minWidth: "100px" }}>
                  <img src={brand.url} alt={`Logo ${brand.name}`} loading="lazy"
                    className="max-h-[36px] max-w-[80px] w-auto object-contain" />
                </div>
                <div className="w-full h-[2px]" style={{ background: "linear-gradient(90deg,#f81828 14px,rgba(255,255,255,0.05) 14px)" }} />
                <span className="text-[9px] font-semibold text-gray-500 py-1.5 px-2 text-center">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WIĘCEJ MAREK CTA ── */}
      <div className="container mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4" style={{ borderBottom: "1px solid #111" }}>
        <p className="text-sm text-gray-500">
          Współpracujemy z <span className="text-white font-bold">268+ markami</span> producentów materiałów budowlanych.
        </p>
        <Link
          to="/marki"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider text-white flex-shrink-0 transition-all hover:brightness-110"
          style={{ background: "#f81828", boxShadow: "0 6px 20px rgba(248,24,40,0.3)" }}
        >
          Wszystkie marki <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* ── PEŁNY KATALOG PRODUKTÓW (lazy) ── */}
      <CatalogSection />

      {/* ── SEO TEXT ── */}
      <section className="py-14" style={{ background: "#080808" }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-xl font-black text-white mb-5 flex items-center gap-2">
            <span className="w-[3px] h-5 bg-[#f81828] rounded-full" />
            Materiały budowlane Lublin — kompleksowa oferta składu Media Bud
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <p className="text-sm text-gray-400 leading-relaxed">
              Skład budowlany <strong className="text-gray-300">Media Bud</strong> w Lublinie (ul.&nbsp;Chemiczna&nbsp;8d) oferuje
              pełny przekrój materiałów budowlanych — od chemii budowlanej (tynki, kleje, zaprawy, gipsy, grunty),
              przez izolacje termiczne (Rockwool, Swisspor, Ursa), aż po farby elewacyjne, płytki ceramiczne
              i systemy suchej zabudowy Knauf i Rigips.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Obsługujemy klientów indywidualnych, wykonawców i firmy deweloperskie.
              Dostarczamy materiały na budowy w Lublinie i województwie lubelskim — z profesjonalnym doradztwem
              technicznym oraz cenami hurtowymi. Czynni <strong className="text-gray-300">Pon–Pt 7:00–16:00</strong>.
              Zadzwoń: <a href="tel:+48533553344" className="text-[#f81828] font-semibold hover:underline">+48&nbsp;533&nbsp;553&nbsp;344</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12" style={{ background: "#050505", borderTop: "1px solid #111" }}>
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="h-px flex-1 max-w-16" style={{ background: "rgba(248,24,40,0.25)" }} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f81828]">Potrzebujesz pomocy?</p>
            <div className="h-px flex-1 max-w-16" style={{ background: "rgba(248,24,40,0.25)" }} />
          </div>
          <h3 className="font-display text-2xl font-black text-white mb-3">Doradzimy i wycenimy projekt</h3>
          <p className="text-sm text-gray-500 mb-6">
            Zadzwoń lub napisz — nasi specjaliści dobiorą właściwe materiały i przygotują szczegółową wycenę.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:+48533553344">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f81828] text-white text-sm font-bold hover:bg-[#c8000f] transition-all"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(248,24,40,0.5)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <Phone className="w-4 h-4" /> +48 533 553 344
              </button>
            </a>
            <Link to="/kontakt">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                Formularz kontaktowy
              </button>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes gridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 44px 44px; }
        }
        .group-hover\\:scale-108:hover { transform: scale(1.08); }
        .duration-400 { transition-duration: 400ms; }
      `}</style>
    </div>
  );
}

// ─── POLICY PAGE ──────────────────────────────────────────────────
