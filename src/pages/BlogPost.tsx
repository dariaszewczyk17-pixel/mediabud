import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Phone, Tag } from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuoteModal } from "@/components/Commerce";
import { useState } from "react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : null;
  const [quoteOpen, setQuoteOpen] = useState(false);
  const related = blogPosts.filter(p => p.id !== post?.id && p.category === post?.category).slice(0, 3);

  if (!post) return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Artykuł nie znaleziony</h1>
      <Link to="/blog"><Button className="bg-primary">Wróć do bloga</Button></Link>
    </div>
  );

  const sections = post.content.split("\n\n");

  return (
    <div className="bg-gray-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        "headline": post.title, "description": post.excerpt,
        "image": post.image, "datePublished": post.date,
        "author": { "@type": "Organization", "name": post.author },
        "publisher": { "@type": "Organization", "name": "Media Bud", "logo": { "@type": "ImageObject", "url": "https://mediabud.pl/logo.png" } }
      })}} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Wróć do bloga
        </Link>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="aspect-video overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="flex items-center gap-1 text-sm text-gray-500"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString("pl-PL", { day:"numeric", month:"long", year:"numeric" })}</span>
              <span className="flex items-center gap-1 text-sm text-gray-500"><Clock className="w-4 h-4" />{post.readTime} min czytania</span>
              <span className="text-sm text-gray-500 ml-auto">Autor: <strong>{post.author}</strong></span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">{post.title}</h1>
            <p className="text-lg text-gray-600 border-l-4 border-primary pl-4 mb-8 italic">{post.excerpt}</p>
            <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
              {sections.map((section, i) => {
                if (section.startsWith("## ")) return <h2 key={i} className="text-xl font-black text-gray-900 mt-8 mb-3 border-b-2 border-primary/20 pb-2">{section.slice(3)}</h2>;
                if (section.startsWith("### ")) return <h3 key={i} className="text-lg font-bold text-gray-800 mt-6 mb-2">{section.slice(4)}</h3>;
                if (section.startsWith("| ")) return (
                  <div key={i} className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                      <tbody>
                        {section.split("\n").filter(r => !r.startsWith("|---")).map((row, ri) => (
                          <tr key={ri} className={ri === 0 ? "bg-gray-800 text-white" : ri % 2 === 0 ? "bg-gray-50" : ""}>
                            {row.split("|").filter(c => c.trim()).map((cell, ci) => (
                              ri === 0 ? <th key={ci} className="px-4 py-2 text-left font-bold text-xs uppercase">{cell.trim()}</th>
                                       : <td key={ci} className="px-4 py-2 text-gray-700">{cell.trim()}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
                if (section.startsWith("**")) return <p key={i} className="font-semibold text-gray-800">{section.replace(/\*\*/g, "")}</p>;
                if (section.startsWith("- ")) return (
                  <ul key={i} className="space-y-1 pl-4">
                    {section.split("\n").map((line, li) => line.startsWith("- ") && <li key={li} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-primary font-bold mt-0.5">•</span>{line.slice(2)}</li>)}
                  </ul>
                );
                return section.trim() ? <p key={i} className="leading-relaxed">{section}</p> : null;
              })}
            </div>
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
              <Tag className="w-4 h-4 text-gray-400" />
              {post.tags.map(tag => <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">#{tag}</span>)}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-primary rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-black mb-2">Masz pytania? Skontaktuj się z naszym ekspertem!</h3>
          <p className="text-red-100 mb-6">Bezpłatne doradztwo techniczne dla każdego klienta Media Bud</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="tel:+48509567213"><Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold"><Phone className="w-4 h-4 mr-2" />+48 509 567 213</Button></a>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold" onClick={() => setQuoteOpen(true)}>Wyślij zapytanie</Button>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-black text-gray-900 mb-5">Podobne artykuły</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="aspect-video overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" /></div>
                  <div className="p-4"><h3 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3></div>
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
