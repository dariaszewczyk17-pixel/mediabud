import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Badge } from "@/components/ui/badge";

export default function Blog() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-2">Blog techniczny</h1>
          <p className="text-gray-300">Wiedza ekspercka dla budowniczych, inwestorów i deweloperów</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-gray-500"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString("pl-PL")}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 ml-auto"><Clock className="w-3 h-3" />{post.readTime} min</span>
                </div>
                <h2 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-1 text-xs text-primary font-medium">Czytaj więcej <ArrowRight className="w-3 h-3" /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
