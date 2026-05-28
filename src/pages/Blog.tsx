import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function Blog() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2) 60%,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-10 py-12">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-[#f81828]" />
            <span className="text-[10px] font-black text-[#f81828] tracking-widest uppercase">Wiedza ekspercka</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">Blog techniczny</h1>
          <p className="text-gray-400 text-sm max-w-xl">Ekspercka wiedza dla budowniczych, inwestorów i deweloperów z regionu lubelskiego.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">

        {/* Featured post */}
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group block mb-10 rounded-2xl overflow-hidden transition-all duration-300"
            style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.3)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(248,24,40,0.12)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ filter: "brightness(0.75)" }} />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: "rgba(248,24,40,0.12)", color: "#f88090", border: "1px solid rgba(248,24,40,0.22)" }}>{featured.category}</span>
                  <span className="text-[10px] font-black text-[#f81828] uppercase tracking-widest">Polecany</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-black text-white leading-tight mb-3 group-hover:text-[#f88090] transition-colors">{featured.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{new Date(featured.date).toLocaleDateString("pl-PL")}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{featured.readTime} min</span>
                  <span className="ml-auto flex items-center gap-1 text-[#f81828] font-bold text-xs">Czytaj <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group rounded-xl overflow-hidden transition-all duration-300"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.28)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(248,24,40,0.10)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ filter: "brightness(0.65)" }} loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f81828] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-gray-500" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>{post.category}</span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-600 ml-auto"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString("pl-PL")}</span>
                </div>
                <h2 className="font-display font-black text-white leading-snug mb-2 text-sm group-hover:text-[#f88090] transition-colors line-clamp-2">{post.title}</h2>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] text-gray-600"><Clock className="w-3 h-3" />{post.readTime} min czytania</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#f81828] font-bold">Czytaj <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
