import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Phone, Tag, ArrowRight } from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { QuoteModal } from "@/components/Commerce";
import { useState } from "react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : null;
  const [quoteOpen, setQuoteOpen] = useState(false);
  const related = blogPosts.filter(p => p.id !== post?.id && p.category === post?.category).slice(0, 3);

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#080808" }}>
      <div className="text-center px-4">
        <h1 className="text-2xl font-bold text-white mb-4">Artykuł nie znaleziony</h1>
        <Link to="/blog"><Button className="bg-[#f81828] hover:bg-[#c8000f]">Wróć do bloga</Button></Link>
      </div>
    </div>
  );

  const sections = post.content.split("\n\n");

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        "headline": post.title, "description": post.excerpt,
        "image": post.image, "datePublished": post.date,
        "author": { "@type": "Organization", "name": post.author },
        "publisher": { "@type": "Organization", "name": "Media Bud", "logo": { "@type": "ImageObject", "url": "https://mediabud.pl/logo.png" } }
      })}} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#f81828] mb-6 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Wróć do bloga
        </Link>

        {/* Article card */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
          {/* Hero image */}
          <div className="aspect-video overflow-hidden relative">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,15,0.8) 0%, transparent 60%)" }} />
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.3) 60%,transparent)" }} />
          </div>

          <div className="p-8">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(248,24,40,0.12)", color: "#f88090", border: "1px solid rgba(248,24,40,0.22)" }}>{post.category}</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><Calendar className="w-3.5 h-3.5" />{new Date(post.date).toLocaleDateString("pl-PL", { day:"numeric", month:"long", year:"numeric" })}</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><Clock className="w-3.5 h-3.5" />{post.readTime} min czytania</span>
              <span className="text-xs text-gray-600 ml-auto">Autor: <strong className="text-gray-400">{post.author}</strong></span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-6 leading-tight">{post.title}</h1>

            {/* Lead */}
            <p className="text-base text-gray-400 leading-relaxed mb-8 pl-4 italic" style={{ borderLeft: "3px solid #f81828" }}>{post.excerpt}</p>

            {/* Content */}
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              {sections.map((section, i) => {
                if (section.startsWith("## ")) return (
                  <h2 key={i} className="font-display text-xl font-black text-white mt-8 mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(248,24,40,0.2)" }}>
                    <span className="w-[3px] h-5 bg-[#f81828] rounded-full flex-shrink-0" />
                    {section.slice(3)}
                  </h2>
                );
                if (section.startsWith("### ")) return <h3 key={i} className="font-display text-lg font-bold text-gray-200 mt-6 mb-2">{section.slice(4)}</h3>;
                if (section.startsWith("| ")) return (
                  <div key={i} className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    <table className="w-full text-sm">
                      <tbody>
                        {section.split("\n").filter(r => !r.startsWith("|---")).map((row, ri) => (
                          <tr key={ri} style={{ background: ri === 0 ? "#1a1a1a" : ri % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                            {row.split("|").filter(c => c.trim()).map((cell, ci) => (
                              ri === 0
                                ? <th key={ci} className="px-4 py-2.5 text-left text-xs uppercase font-bold text-gray-300">{cell.trim()}</th>
                                : <td key={ci} className="px-4 py-2.5 text-gray-400 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>{cell.trim()}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
                if (section.startsWith("**")) return <p key={i} className="font-semibold text-gray-300">{section.replace(/\*\*/g, "")}</p>;
                if (section.startsWith("- ")) return (
                  <ul key={i} className="space-y-1.5 pl-1">
                    {section.split("\n").map((line, li) => line.startsWith("- ") && (
                      <li key={li} className="flex items-start gap-2.5 text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] flex-shrink-0 mt-1.5" />
                        {line.slice(2)}
                      </li>
                    ))}
                  </ul>
                );
                return section.trim() ? <p key={i} className="leading-relaxed text-gray-400">{section}</p> : null;
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <Tag className="w-4 h-4 text-gray-600" />
              {post.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 text-xs rounded-full text-gray-500 transition-all cursor-pointer hover:text-[#f81828]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>#{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl p-8 text-center relative overflow-hidden" style={{ background: "#0f0f0f", border: "1px solid rgba(248,24,40,0.2)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(248,24,40,0.12) 0%, transparent 70%)" }} />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f81828]" />
          <div className="relative">
            <h3 className="font-display text-2xl font-black text-white mb-2">Masz pytania? Skontaktuj się z ekspertem!</h3>
            <p className="text-gray-400 mb-6 text-sm">Bezpłatne doradztwo techniczne dla każdego klienta Media Bud.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href="tel:+48509567213">
                <Button size="lg" className="bg-[#f81828] hover:bg-[#c8000f] font-bold hover:shadow-[0_0_20px_rgba(248,24,40,0.4)] transition-all">
                  <Phone className="w-4 h-4 mr-2" />+48 509 567 213
                </Button>
              </a>
              <Button size="lg" variant="outline" className="border-[#f81828]/40 text-[#f81828] hover:bg-[#f81828] hover:text-white font-bold transition-all" onClick={() => setQuoteOpen(true)}>
                Wyślij zapytanie
              </Button>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl font-black text-white mb-5 flex items-center gap-2">
              <span className="w-[3px] h-5 bg-[#f81828] rounded-full" />
              Podobne artykuły
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(p => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group rounded-xl overflow-hidden transition-all duration-300"
                  style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.28)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" style={{ filter: "brightness(0.6)" }} loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-gray-300 group-hover:text-[#f88090] transition-colors line-clamp-2 leading-snug">{p.title}</h3>
                    <div className="mt-2 flex items-center gap-1 text-[11px] text-[#f81828] font-bold">Czytaj <ArrowRight className="w-3 h-3" /></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
