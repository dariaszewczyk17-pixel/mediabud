import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen, Filter, Zap } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { useSEO } from "@/hooks/useSEO";

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-pulse"
      style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="aspect-video" style={{ background: "#181818" }} />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-4 w-16 rounded-full" style={{ background: "#1e1e1e" }} />
          <div className="h-4 w-20 rounded-full ml-auto" style={{ background: "#1e1e1e" }} />
        </div>
        <div className="h-4 w-full rounded" style={{ background: "#1e1e1e" }} />
        <div className="h-4 w-3/4 rounded" style={{ background: "#1e1e1e" }} />
        <div className="h-3 w-full rounded" style={{ background: "#1a1a1a" }} />
        <div className="h-3 w-5/6 rounded" style={{ background: "#1a1a1a" }} />
      </div>
    </div>
  );
}

/* ── Kategoria → kolor neonowy ── */
const NEON: Record<string, { bg: string; text: string; border: string }> = {
  "Izolacje":          { bg: "rgba(14,165,233,0.12)",  text: "#38bdf8", border: "rgba(14,165,233,0.35)" },
  "Chemia budowlana":  { bg: "rgba(168,85,247,0.12)",  text: "#c084fc", border: "rgba(168,85,247,0.35)" },
  "Elewacje":          { bg: "rgba(34,197,94,0.12)",   text: "#4ade80", border: "rgba(34,197,94,0.35)"  },
  "Tynki":             { bg: "rgba(249,115,22,0.12)",  text: "#fb923c", border: "rgba(249,115,22,0.35)" },
  "Dachy":             { bg: "rgba(248,24,40,0.12)",   text: "#ff9aa3", border: "rgba(248,24,40,0.35)"  },
  "Narzędzia":         { bg: "rgba(234,179,8,0.12)",   text: "#facc15", border: "rgba(234,179,8,0.35)"  },
};
const defaultNeon = { bg: "rgba(248,24,40,0.10)", text: "#ff9aa3", border: "rgba(248,24,40,0.30)" };
function neon(cat: string) { return NEON[cat] ?? defaultNeon; }

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("Wszystkie");
  const [loading] = useState(false); // symulacja — w realu z hooków

  useSEO({
    title: "Blog techniczny – Media Bud Lublin | Poradniki budowlane i izolacje",
    description: "Ekspercka wiedza o materiałach budowlanych, izolacjach, tynkach i systemach ociepleń. Poradniki dla inwestorów, wykonawców i deweloperów z Lublina i województwa lubelskiego.",
    canonical: "/blog",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Blog techniczny Media Bud",
      "description": "Poradniki i artykuły eksperckie dla budowniczych z Lublina i regionu lubelskiego.",
      "url": "https://mediabud.pl/blog",
      "publisher": { "@type": "Organization", "name": "Media Bud", "url": "https://mediabud.pl" }
    }
  });

  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map(p => p.category)));
    return ["Wszystkie", ...cats];
  }, []);

  const filtered = useMemo(() =>
    activeCategory === "Wszystkie"
      ? blogPosts
      : blogPosts.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>

      {/* ── HERO z animowanym gradientem ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "#08080a", borderBottom: "1px solid rgba(248,24,40,0.15)" }}
      >
        {/* Animowany gradient siatki */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(248,24,40,0.07) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(248,24,40,0.07) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
            animation: "gridScroll 20s linear infinite",
          }}
        />
        {/* Świecące plamy tła */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(248,24,40,0.12) 0%,transparent 70%)" }} />
        <div className="absolute -bottom-12 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(248,24,40,0.07) 0%,transparent 70%)" }} />

        {/* Lewa czerwona belka */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]"
          style={{ boxShadow: "2px 0 16px rgba(248,24,40,0.55)" }} />
        {/* Górna linia */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.18) 55%,transparent)" }} />

        <div className="relative container mx-auto px-4 pl-10 py-16">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(248,24,40,0.15)", border: "1px solid rgba(248,24,40,0.4)" }}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#f81828]" />
            </div>
            <span className="text-[10px] font-black text-[#f81828] tracking-[0.3em] uppercase">
              Wiedza ekspercka
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: "rgba(248,24,40,0.35)" }} />
          </div>

          <h1
            className="font-display font-black text-white leading-none mb-4 uppercase"
            style={{
              fontSize: "clamp(2.2rem,6vw,4rem)",
              letterSpacing: "-0.02em",
              textShadow: "0 0 60px rgba(248,24,40,0.15)",
            }}
          >
            AKTUALNOŚCI<br />
            <span style={{ color: "#f81828" }}>&amp; PORADY</span>
          </h1>

          <p className="text-gray-400 text-sm max-w-xl leading-relaxed mb-6">
            Ekspercka wiedza dla budowniczych, inwestorów i deweloperów z regionu lubelskiego.
            Poradniki techniczne, testy produktów, aktualności branżowe.
          </p>

          {/* Statystyki */}
          <div className="flex flex-wrap gap-6">
            {[
              { val: blogPosts.length, label: "artykułów" },
              { val: categories.length - 1, label: "kategorii" },
            ].map((s, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span className="font-display font-black text-2xl text-[#f81828]">{s.val}</span>
                <span className="text-xs text-gray-600 uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* ── Filtr kategorii ── */}
        <div
          className="flex flex-wrap items-center gap-2 mb-8 pb-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <Filter className="w-3.5 h-3.5 text-gray-500" />
          </div>

          {categories.map(cat => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full transition-all duration-200"
                style={{
                  background: active ? "#f81828" : "rgba(255,255,255,0.04)",
                  color: active ? "#fff" : "#777",
                  border: `1px solid ${active ? "#f81828" : "rgba(255,255,255,0.09)"}`,
                  boxShadow: active ? "0 0 16px rgba(248,24,40,0.4), 0 0 40px rgba(248,24,40,0.15)" : "none",
                  transform: active ? "translateY(-1px)" : "",
                }}
              >
                {cat}
                {cat !== "Wszystkie" && (
                  <span className="ml-1.5 opacity-60">
                    ({blogPosts.filter(p => p.category === cat).length})
                  </span>
                )}
              </button>
            );
          })}

          <span className="ml-auto text-[10px] font-mono text-gray-600">
            {filtered.length} artykuł{filtered.length === 1 ? "" : filtered.length < 5 ? "y" : "ów"}
          </span>
        </div>

        {/* ── Skeleton loading ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && (
          <>
            {/* ── Featured post — wyróżniony ── */}
            {featured && (
              <Link
                to={`/blog/${featured.slug}`}
                className="group block mb-10 rounded-2xl overflow-hidden transition-all duration-500 relative"
                style={{ background: "#0c0c0c", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(248,24,40,0.45)";
                  el.style.boxShadow = "0 0 0 1px rgba(248,24,40,0.2), 0 16px 60px rgba(248,24,40,0.18)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.boxShadow = "none";
                  el.style.transform = "";
                }}
              >
                {/* Górna krawędź czerwona */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.3))", boxShadow: "0 0 12px rgba(248,24,40,0.6)" }}
                />

                <div className="grid md:grid-cols-2">
                  {/* Obraz */}
                  <div className="aspect-video md:aspect-auto overflow-hidden relative">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      style={{ filter: "brightness(0.7) saturate(0.9)" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(135deg,rgba(8,8,8,0.2) 0%,transparent 50%,rgba(248,24,40,0.08) 100%)" }}
                    />
                    {/* "POLECANY" badge */}
                    <div
                      className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(248,24,40,0.9)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 0 20px rgba(248,24,40,0.5)",
                      }}
                    >
                      <Zap className="w-3 h-3 text-white" />
                      <span className="text-[10px] font-black text-white tracking-widest uppercase">Polecany</span>
                    </div>
                  </div>

                  {/* Treść */}
                  <div className="p-8 flex flex-col justify-center">
                    {/* Neon badge kategorii */}
                    {(() => {
                      const n = neon(featured.category);
                      return (
                        <span
                          className="inline-flex self-start text-[10px] font-black px-2.5 py-1 rounded-full mb-4 uppercase tracking-widest"
                          style={{ background: n.bg, color: n.text, border: `1px solid ${n.border}` }}
                        >
                          {featured.category}
                        </span>
                      );
                    })()}

                    <h2
                      className="font-display font-black text-white leading-tight mb-3 group-hover:text-[#ff9aa3] transition-colors duration-300"
                      style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)" }}
                    >
                      {featured.title}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5 font-mono text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {new Date(featured.date).toLocaleDateString("pl-PL")}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-gray-600">
                        <Clock className="w-3 h-3" />
                        {featured.readTime} min
                      </span>
                      <span
                        className="ml-auto flex items-center gap-1.5 font-black text-xs uppercase tracking-widest text-[#f81828] group-hover:gap-2.5 transition-all duration-300"
                      >
                        Czytaj <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* ── Grid artykułów ── */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map(post => {
                  const n = neon(post.category);
                  return (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
                      style={{ background: "#0c0c0c", border: "1px solid rgba(255,255,255,0.06)" }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(248,24,40,0.38)";
                        el.style.transform = "translateY(-4px)";
                        el.style.boxShadow = "0 12px 40px rgba(248,24,40,0.14), 0 0 0 1px rgba(248,24,40,0.15)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(255,255,255,0.06)";
                        el.style.transform = "";
                        el.style.boxShadow = "none";
                      }}
                    >
                      {/* Obraz */}
                      <div className="aspect-video overflow-hidden relative flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-700"
                          style={{ filter: "brightness(0.62) saturate(0.85)" }}
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 55%)" }}
                        />
                        {/* Górna krawędź — pojawia się na hover */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-all duration-300"
                          style={{
                            background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.4))",
                            boxShadow: "0 0 12px rgba(248,24,40,0.7)",
                          }}
                        />
                      </div>

                      {/* Treść */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Neon badge + data */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                            style={{ background: n.bg, color: n.text, border: `1px solid ${n.border}` }}
                          >
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-mono text-gray-600 ml-auto">
                            <Calendar className="w-2.5 h-2.5" />
                            {new Date(post.date).toLocaleDateString("pl-PL")}
                          </span>
                        </div>

                        <h2
                          className="font-display font-black text-white leading-snug mb-2 text-sm group-hover:text-[#ff9aa3] transition-colors duration-200 line-clamp-2"
                        >
                          {post.title}
                        </h2>

                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4 flex-1">
                          {post.excerpt}
                        </p>

                        <div
                          className="flex items-center justify-between pt-3"
                          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                        >
                          <span className="flex items-center gap-1 text-[10px] font-mono text-gray-600">
                            <Clock className="w-2.5 h-2.5" />{post.readTime} min czytania
                          </span>
                          <span
                            className="flex items-center gap-1 text-[11px] font-black text-[#f81828] uppercase tracking-wider group-hover:gap-2 transition-all duration-200"
                          >
                            Czytaj <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-24">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.2)" }}
                >
                  <BookOpen className="w-7 h-7 text-[#f81828]" />
                </div>
                <p className="text-gray-500 font-semibold mb-1">Brak artykułów w tej kategorii.</p>
                <p className="text-xs text-gray-700">Wybierz inną kategorię lub wróć do wszystkich artykułów.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* CSS animacje */}
      <style>{`
        @keyframes gridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 52px 52px; }
        }
        .group-hover\\:scale-107:hover { transform: scale(1.07); }
      `}</style>
    </div>
  );
}
