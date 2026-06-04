import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { ExternalLink, ChevronRight, Phone, Search } from "lucide-react";

// ── Logotypy z knowledge base (uploaded CDN) ─────────────────────────
const CDN = "https://skyagent-artifacts.skywork.ai/router/agent/2026-06-04/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50";

type FeaturedBrand = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  category: string;
  desc: string;
  website: string;
  country: string;
};

const FEATURED: FeaturedBrand[] = [
  {
    id: "weber", name: "Weber", slug: "weber",
    logo: `${CDN}/images_046cf8927dc94832a3c86369a3e84e6d.png`,
    category: "Chemia budowlana",
    desc: "Lider systemów ociepleń ETICS, tynków silikonowych, klejów do glazury i farb elewacyjnych grupy Saint-Gobain.",
    website: "https://www.weber.pl",
    country: "Francja",
  },
  {
    id: "knauf", name: "Knauf", slug: "knauf",
    logo: `${CDN}/images%20%281%29_83146d9fbf90466783f713e1b8a72759.png`,
    category: "Sucha zabudowa",
    desc: "Globalny lider systemów suchej zabudowy — płyty GK, gipsy maszynowe i ręczne, profile metalowe i systemy sufitowe.",
    website: "https://www.knauf.pl",
    country: "Niemcy",
  },
  {
    id: "atlas", name: "Atlas", slug: "atlas",
    logo: `${CDN}/images%20%282%29_3ea6014321944b67b37a49db4b12195b.png`,
    category: "Chemia budowlana",
    desc: "Polska marka z szeroką ofertą chemii budowlanej — kleje do glazury i styropianu, tynki, grunty i systemy ETICS.",
    website: "https://www.grupyatlas.pl",
    country: "Polska",
  },
  {
    id: "baumit", name: "Baumit", slug: "baumit",
    logo: `${CDN}/logo_maleB_rgb_8726973d41974f91a4496ceee89f05ba.jpg`,
    category: "Chemia budowlana",
    desc: "Austriacki producent tynków, klejów, farb elewacyjnych i kompletnych systemów ociepleń ETICS. Wysoka jakość i innowacyjność.",
    website: "https://www.baumit.pl",
    country: "Austria",
  },
  {
    id: "rockwool", name: "Rockwool", slug: "rockwool",
    logo: `${CDN}/RGB%20ROCKWOOL%C2%AE%20logo%20-%20Primary%20Colour%20RGB_c2581e815d3b441abf93e5c51247010d.jpg`,
    category: "Izolacje",
    desc: "Światowy lider wełny skalnej. Produkty Rockwool zapewniają izolację termiczną, akustyczną i ognioochronę budynków.",
    website: "https://www.rockwool.pl",
    country: "Dania",
  },
  {
    id: "ursa", name: "URSA", slug: "ursa",
    logo: `${CDN}/Ursa-Logo_051ff91cd6ed4a7f827a262cd3ca9b33.png`,
    category: "Izolacje",
    desc: "Producent izolacji z wełny szklanej i polistyrenu XPS do poddaszy, ścian, podłóg i dachów płaskich.",
    website: "https://www.ursa.pl",
    country: "Niemcy",
  },
  {
    id: "rigips", name: "Rigips", slug: "rigips",
    logo: `${CDN}/rigips-saint-gobain-logo-png_seeklogo-259520_4093c076fbf94210aba9218a3cc7fd7f.png`,
    category: "Sucha zabudowa",
    desc: "Marka grupy Saint-Gobain — płyty gipsowo-kartonowe, profile do suchej zabudowy i systemy budowy ścian wewnętrznych.",
    website: "https://www.rigips.pl",
    country: "Francja",
  },
];

// ── Pełna lista marek (źródło: bechcicki.pl – platforma produktów MB) ─
const ALL_BRANDS = [
  "Acryl Putz","Alpol","Altax","Atlas","Austrotherm","Axalta",
  "Bauder","Baumit","Blachotrapez","BMI Braas","Bolix","Bruk-Bet","Budmat",
  "Caparol","Cekol","Cemex","Ceresit","Cersanit","Creaton",
  "Dakea","Dekoral","Dekoral Professional","Den Braven","Dulux",
  "Ecophon","Ejot","Etex",
  "Fakro",
  "Galeco","Germa Flex",
  "H+H","Hammerite","Hilti","Holcim",
  "Icopal","Isover",
  "Jawar","Jedynka","Jotun","Jurga",
  "Kabe","Kerakoll","Klimas","Knauf","Knauf Ceiling Solutions","Koelner","Koramic","Kreisel","Kronospan",
  "Magnat","Mapei","Masterplast",
  "Nexler","Nobiles","Novol",
  "OWA",
  "Paradyż","Paroc","Porotherm","Pruszyński",
  "Quick-mix",
  "Rawlplug","Rigips","Rockfon","Rockwool","Roto","Röben",
  "Sadolin","Schiedel","Selena","Sika","Silka","Siniat","Solbet","Sopro","Soudal","Styropmin","Swisspor","Śnieżka",
  "Termo Organika","Tikkurila","Tubądzin","Tytan",
  "URSA",
  "Velux",
  "Weber","Wienerberger",
  "Xella","Ytong",
].filter((v, i, a) => a.indexOf(v) === i).sort();

export default function BrandsPage() {
  const [query, setQuery] = useState("");

  const filtered = query.length >= 2
    ? ALL_BRANDS.filter(b => b.toLowerCase().includes(query.toLowerCase()))
    : ALL_BRANDS;

  const byLetter: Record<string, string[]> = {};
  filtered.forEach(b => {
    const letter = b[0].toUpperCase();
    if (!byLetter[letter]) byLetter[letter] = [];
    byLetter[letter].push(b);
  });
  const letters = Object.keys(byLetter).sort();

  useSEO({
    title: "Marki budowlane – Weber, Knauf, Atlas, Baumit, Rockwool | Media Bud Lublin",
    description: "Oferujemy produkty czołowych marek budowlanych: Weber, Knauf, Atlas, Baumit, Rockwool, URSA, Rigips, Ceresit i ponad 80 innych. Skład budowlany Media Bud Lublin — tel. +48 533 553 344.",
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
          "numberOfItems": ALL_BRANDS.length,
          "itemListElement": FEATURED.map((b, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": b.name,
            "url": b.website,
            "item": { "@type": "Brand", "name": b.name, "url": b.website }
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
            Współpracujemy z ponad <strong className="text-gray-300">80 producentami</strong> materiałów budowlanych.
            Gwarantujemy oryginalne produkty z pełną dokumentacją techniczną i certyfikatami jakości.
          </p>
          <div className="flex flex-wrap gap-8 mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { val: `${FEATURED.length}`, label: "partnerów premium" },
              { val: `${ALL_BRANDS.length}+`, label: "marek w katalogu" },
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

      {/* ── PARTNERZY PREMIUM ── */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="flex items-center gap-2 text-sm font-black text-white mb-6 uppercase tracking-[0.2em]">
          <span className="w-[3px] h-4 bg-[#f81828] rounded-full" />
          Partnerzy Premium
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FEATURED.map(brand => (
            <a
              key={brand.id}
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#f81828";
                el.style.boxShadow = "0 0 0 1px #f81828, 0 12px 40px rgba(248,24,40,0.15)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f81828] opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Logo */}
              <div className="flex items-center justify-center h-28 px-8 pt-6 pb-2" style={{ background: "rgba(255,255,255,0.02)" }}>
                <img
                  src={brand.logo}
                  alt={`Logo ${brand.name} – materiały budowlane`}
                  loading="lazy"
                  className="max-h-14 max-w-full object-contain transition-all duration-300 group-hover:scale-105"
                  style={{ filter: "brightness(0) invert(1) opacity(0.75)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0) invert(1)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0) invert(1) opacity(0.75)"; }}
                />
              </div>
              {/* Info */}
              <div className="px-5 pb-5 pt-3 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display font-black text-white text-lg leading-none">{brand.name}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide flex-shrink-0 ml-2"
                    style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.22)", color: "#f2b3b8" }}>
                    {brand.category}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed mb-3 flex-1 group-hover:text-gray-500 transition-colors">
                  {brand.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-700">{brand.country}</span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-[#f81828] opacity-0 group-hover:opacity-100 transition-opacity">
                    Strona marki <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── WSZYSTKIE MARKI ── */}
      <section className="py-12" style={{ background: "#050505", borderTop: "1px solid #141414" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-[0.2em]">
              <span className="w-[3px] h-4 rounded-full" style={{ background: "rgba(248,24,40,0.6)" }} />
              Wszystkie marki ({ALL_BRANDS.length})
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
            <div className="space-y-6">
              {letters.map(letter => (
                <div key={letter}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display font-black text-[#f81828] text-xl w-6 leading-none">{letter}</span>
                    <div className="flex-1 h-px" style={{ background: "rgba(248,24,40,0.12)" }} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {byLetter[letter].map(brand => (
                      <Link
                        key={brand}
                        to={`/szukaj?q=${encodeURIComponent(brand)}`}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 transition-all"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "rgba(248,24,40,0.1)";
                          el.style.borderColor = "rgba(248,24,40,0.28)";
                          el.style.color = "#fff";
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "rgba(255,255,255,0.04)";
                          el.style.borderColor = "rgba(255,255,255,0.07)";
                          el.style.color = "";
                        }}
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
              Współpracujemy z markami takimi jak <strong className="text-gray-300">Weber, Knauf, Atlas, Baumit, Rockwool, URSA, Rigips</strong> i dziesiątkami innych.
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
