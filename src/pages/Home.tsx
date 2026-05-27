import { Link } from "react-router-dom";
import { Phone, Mail, ChevronRight, Star, Truck, Wrench, Users, Shield, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { getRecentBlogPosts } from "@/data/blog";
import { ProductCard, QuoteModal } from "@/components/Commerce";
import { useState } from "react";

const catIcons: Record<string, string> = {
  "chemia-budowlana": "🧪", "dachy": "🏠", "farby-rozpuszczalniki": "🎨",
  "izolacje": "🛡️", "narzedzia-mocowania": "🔧", "pozostale": "📦",
  "plytki": "⬜", "stropy-sciany": "🧱", "sucha-zabudowa": "🔲", "sufity-podwieszane": "⬛",
};

const features = [
  { icon: <Wrench className="w-6 h-6" />, title: "Doradztwo techniczne", desc: "Bezpłatne konsultacje z ekspertami budowlanymi dla każdego projektu" },
  { icon: <Users className="w-6 h-6" />, title: "Obsługa krok po kroku", desc: "Kompleksowe wsparcie od wyboru materiałów po odbiór budowy" },
  { icon: <Truck className="w-6 h-6" />, title: "Szybka dostawa", desc: "Transport materiałów na teren Lublina i województwa lubelskiego" },
  { icon: <Star className="w-6 h-6" />, title: "Renomowane marki", desc: "Weber, Ceresit, Atlas, Knauf, Rockwool, Swisspor i wiele więcej" },
  { icon: <Shield className="w-6 h-6" />, title: "Gwarancja jakości", desc: "Wszystkie produkty z certyfikatami i atestami budowlanymi" },
  { icon: <Phone className="w-6 h-6" />, title: "Dla deweloperów", desc: "Indywidualne warunki, dedykowany opiekun, faktury zbiorcze" },
];

const steps = [
  { n: "01", title: "Skontaktuj się z nami", desc: "Zadzwoń lub napisz – omówimy Twój projekt budowlany" },
  { n: "02", title: "Otrzymaj doradztwo", desc: "Nasi eksperci dobiorą materiały i przygotują wycenę" },
  { n: "03", title: "Złóż zamówienie", desc: "Zamawiaj bezpośrednio – online, telefonicznie lub osobiście" },
  { n: "04", title: "Odbiór lub dostawa", desc: "Odbierz materiały ze składu lub zamów dostawę na budowę" },
];

export default function Home() {
  const featured = getFeaturedProducts();
  const recentPosts = getRecentBlogPosts(3);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Media Bud – Skład Budowlany",
        "description": "Profesjonalna hurtownia materiałów budowlanych w Lublinie",
        "telephone": "+48509567213",
        "email": "sprzedaz@mediabud.pl",
        "address": { "@type": "PostalAddress", "streetAddress": "ul. Budowlana 1", "addressLocality": "Lublin", "postalCode": "20-001", "addressCountry": "PL" },
        "url": "https://mediabud.pl",
        "openingHours": ["Mo-Fr 07:00-17:00", "Sa 08:00-14:00"],
        "priceRange": "$$",
        "areaServed": "Lublin, województwo lubelskie"
      })}} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:`url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')`, backgroundSize:'cover', backgroundPosition:'center'}} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="relative container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-primary text-white mb-4 px-3 py-1">Hurtownia budowlana · Lublin</Badge>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Media Bud –<br />
              <span className="text-primary">profesjonalna</span><br />
              hurtownia budowlana<br />
              w Lublinie
            </h1>
            <p className="text-gray-300 text-lg mb-6 max-w-md">
              Kompleksowe wsparcie dla Twojego projektu budowlanego. Tynki, ocieplenia, chemia budowlana, farby i więcej – doradztwo techniczne w cenie.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-primary hover:bg-red-700 font-bold px-8" onClick={() => setQuoteOpen(true)}>
                <Mail className="w-4 h-4 mr-2" /> Zapytaj o ofertę
              </Button>
              <a href="tel:+48509567213">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold px-8 w-full sm:w-auto">
                  <Phone className="w-4 h-4 mr-2" /> +48 509 567 213
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-6 mt-6 text-sm text-gray-400">
              <span className="flex items-center gap-1">✅ Ponad 1000 produktów</span>
              <span className="flex items-center gap-1">✅ Bezpłatne doradztwo</span>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3">
            {["Tynki elewacyjne","Systemy ociepleń","Styropian EPS","Wełna mineralna","Farby elewacyjne","Hydroizolacje"].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer">
                <div className="text-2xl mb-1">{["🏗️","🏠","🧱","🛡️","🎨","💧"][i]}</div>
                <div className="text-white text-sm font-medium">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP Bar */}
      <div className="bg-primary text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 text-sm font-medium">
            <span>🚚 Dostawa na terenie Lublina</span>
            <span>📞 Doradztwo techniczne gratis</span>
            <span>🏗️ Obsługa deweloperów</span>
            <span>⭐ Renomowane marki budowlane</span>
            <span>📋 Kompleksowa obsługa „krok po kroku"</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Nasze kategorie produktów</h2>
          <p className="text-gray-600">Pełen asortyment materiałów budowlanych dla profesjonalistów i klientów indywidualnych</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/kategoria/${cat.slug}`}
              className="group bg-white rounded-xl border border-gray-200 p-5 text-center hover:border-primary hover:shadow-lg transition-all duration-200"
            >
              <div className="text-4xl mb-3">{catIcons[cat.slug] || "📦"}</div>
              <div className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors leading-snug">{cat.name}</div>
              {cat.children && (
                <div className="text-xs text-gray-400 mt-1">{cat.children.length} podkategorii</div>
              )}
              <div className="mt-2 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                Przeglądaj <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-1">Polecane produkty</h2>
              <p className="text-gray-600">Bestsellery i nowości w naszej ofercie</p>
            </div>
            <Link to="/produkty" className="hidden md:flex items-center gap-1 text-primary font-medium hover:underline">
              Wszystkie produkty <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link to="/produkty"><Button variant="outline" className="border-primary text-primary">Wszystkie produkty</Button></Link>
          </div>
        </div>
      </section>

      {/* Why MediaBud */}
      <section className="container mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Dlaczego Media Bud?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Łączymy profesjonalną wiedzę techniczną z indywidualnym podejściem do każdego klienta – zarówno dewelopera, jak i osoby budującej własny dom.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-black text-white py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-2">Program „Dom od podstaw"</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Kompleksowa obsługa Twojego projektu budowlanego – od fundamentów po wykończenie</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-black text-primary/30 mb-2">{s.n}</div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 text-gray-700">→</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/uslugi/dom-od-podstaw">
              <Button size="lg" className="bg-primary hover:bg-red-700 px-10 font-bold">
                Dowiedz się więcej <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="container mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-1">Blog techniczny</h2>
            <p className="text-gray-600">Wiedza ekspercka dla budowniczych i inwestorów</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-1 text-primary font-medium hover:underline">
            Wszystkie artykuły <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map(post => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-gray-500"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString("pl-PL")}</span>
                </div>
                <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium">Czytaj więcej <ChevronRight className="w-3 h-3" /></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Contact */}
      <section className="bg-primary py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Gotowy na współpracę?</h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">Skontaktuj się z nami już dziś. Przygotujemy bezpłatną wycenę materiałów dla Twojego projektu w ciągu 24 godzin.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+48509567213">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-10 w-full sm:w-auto">
                <Phone className="w-4 h-4 mr-2" /> Zadzwoń: +48 509 567 213
              </Button>
            </a>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold px-10" onClick={() => setQuoteOpen(true)}>
              <Mail className="w-4 h-4 mr-2" /> Wyślij zapytanie
            </Button>
          </div>
        </div>
      </section>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
