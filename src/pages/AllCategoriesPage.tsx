import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { ChevronRight, Package, Tag } from "lucide-react";
import { categories } from "@/data/categories";

const card = { background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" } as const;
const cardHover = "hover:border-[#f81828]/30 hover:shadow-[0_8px_32px_rgba(248,24,40,0.10)] transition-all duration-300";


export function AllCategoriesPage() {
  const catImages: Record<string, string> = {
    "chemia-budowlana":       "https://images.unsplash.com/photo-1612428177037-c6f2d48ce357?auto=format&fit=crop&w=800&q=80",
    "dachy":                  "https://images.unsplash.com/photo-1726589004565-bedfba94d3a2?auto=format&fit=crop&w=800&q=80",
    "farby-i-rozpuszczalniki":"https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=800&q=80",
    "izolacje":               "https://images.unsplash.com/photo-1625577815636-d7a61b583799?auto=format&fit=crop&w=800&q=80",
    "narzedzia-i-mocowania":  "https://images.unsplash.com/photo-1683115098516-9b8d5c643b5b?auto=format&fit=crop&w=800&q=80",
    "plytki":                 "https://images.unsplash.com/photo-1523413307857-ef24c53571ae?auto=format&fit=crop&w=800&q=80",
    "stropy-i-sciany":        "https://images.unsplash.com/photo-1701850009190-2859ba2aeea6?auto=format&fit=crop&w=800&q=80",
    "sucha-zabudowa":         "https://images.unsplash.com/photo-1763593125291-a46ef2b784e5?auto=format&fit=crop&w=800&q=80",
    "sufity-podwieszane":     "https://images.unsplash.com/photo-1769008302212-816b6a07e10c?auto=format&fit=crop&w=800&q=80",
    "pozostale":              "https://images.unsplash.com/photo-1763926062529-1edf8664c366?auto=format&fit=crop&w=800&q=80",
  };

  useSEO({
    title: "Katalog produktów – Materiały budowlane Lublin | Media Bud",
    description: "Ponad 15 000 materiałów budowlanych w jednym miejscu. Chemia budowlana, izolacje, farby, dachy, płytki, narzędzia i więcej. Skład budowlany Media Bud Lublin — tel. +48 533 553 344.",
    canonical: "/produkty",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
            { "@type": "ListItem", "position": 2, "name": "Katalog produktów", "item": "https://mediabud.pl/produkty" }
          ]
        },
        {
          "@type": "ItemList",
          "name": "Katalog kategorii materiałów budowlanych – Media Bud Lublin",
          "description": "Wszystkie kategorie materiałów budowlanych dostępnych w składzie Media Bud w Lublinie",
          "numberOfItems": categories.length,
          "itemListElement": categories.map((cat, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": cat.name,
            "url": `https://mediabud.pl/kategoria/${cat.slug}`
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
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-4 text-[11px] text-gray-600">
            <Link to="/" className="hover:text-[#f81828] transition-colors font-medium">Strona główna</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 font-medium">Produkty</span>
          </nav>
          <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-2">— Katalog produktów —</p>
          <h1 className="font-display text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
            Materiały budowlane Lublin<br />
            <span style={{ color: "#f81828" }}>pełny katalog</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            Ponad 15&nbsp;000 produktów od czołowych producentów — Weber, Ceresit, Atlas, Knauf, Rockwool i wielu innych.
            Wszystko w jednym miejscu, z doradztwem technicznym i dostawą w Lublinie.
          </p>
          {/* Stats bar */}
          <div className="flex flex-wrap gap-8 mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
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

      {/* ── CATEGORY GRID ── */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const img = catImages[cat.slug];
            const num = String(idx + 1).padStart(2, "0");
            return (
              <Link
                key={cat.id}
                to={`/kategoria/${cat.slug}`}
                className="group relative overflow-hidden rounded-xl transition-all duration-300"
                style={{ minHeight: 220, background: "#0c0c0c", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#f81828";
                  el.style.boxShadow = "0 0 0 1px #f81828, 0 12px 40px rgba(248,24,40,0.18)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Background photo + overlay */}
                {img && (
                  <div className="absolute inset-0">
                    <img
                      src={img}
                      alt={`${cat.name} – materiały budowlane Lublin`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(0.65) brightness(0.3)" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(8,8,8,0.25) 0%,rgba(8,8,8,0.82) 65%,rgba(8,8,8,0.97) 100%)" }} />
                  </div>
                )}
                {/* Red left bar (hover) */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828] opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ boxShadow: "2px 0 8px rgba(248,24,40,0.5)" }} />

                {/* Content */}
                <div className="relative z-10 p-5 flex flex-col" style={{ minHeight: 220 }}>
                  {/* Top: number + badge */}
                  <div className="flex items-start justify-between mb-auto">
                    <span className="font-mono text-[11px] font-bold text-gray-700 group-hover:text-[#f81828]/50 transition-colors">{num}</span>
                    {cat.children && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.22)", color: "#f2b3b8" }}>
                        {cat.children.length} kat.
                      </span>
                    )}
                  </div>
                  {/* Bottom: name + desc + CTA */}
                  <div className="mt-10">
                    <h2 className="font-display font-black text-white text-lg uppercase tracking-wide leading-tight mb-1 group-hover:text-[#f81828] transition-colors duration-200">
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed mb-2 group-hover:text-gray-500 transition-colors">
                        {cat.description}
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.15em] text-[#f81828] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                      Przeglądaj <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── BRANDS STRIP ── */}
      <section className="py-10" style={{ background: "#050505", borderTop: "1px solid #141414", borderBottom: "1px solid #141414" }}>
        <div className="container mx-auto px-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center mb-6 text-[#f81828]">— Nasze marki —</p>
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
              <div key={brand.name}
                className="flex flex-col items-center rounded-lg overflow-hidden transition-all duration-200"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(248,24,40,0.4)"; el.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.transform = "translateY(0)"; }}
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
      <section className="py-12" style={{ background: "#050505", borderTop: "1px solid #141414" }}>
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-[#f81828]">— Potrzebujesz pomocy? —</p>
          <h3 className="font-display text-2xl font-black text-white mb-3">Doradzimy i wycenimy projekt</h3>
          <p className="text-sm text-gray-500 mb-6">
            Zadzwoń lub napisz — nasi specjaliści dobiorą właściwe materiały i przygotują szczegółową wycenę.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:+48533553344">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f81828] text-white text-sm font-bold hover:bg-[#c8000f] transition-all hover:shadow-[0_0_20px_rgba(248,24,40,0.4)]">
                <Phone className="w-4 h-4" /> +48 533 553 344
              </button>
            </a>
            <Link to="/kontakt">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                Formularz kontaktowy
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── POLICY PAGE ──────────────────────────────────────────────────
