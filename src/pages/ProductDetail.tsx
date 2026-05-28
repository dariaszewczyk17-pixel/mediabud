import { useParams, Link } from "react-router-dom";
import {
  ChevronRight, ShoppingCart, Phone, Mail, Download, Check,
  ZoomIn, ChevronLeft, ChevronRight as ChevronNext,
  Info, Wrench, BarChart2, Star, ArrowRight, Shield
} from "lucide-react";
import { getProductBySlug, products as staticProducts } from "@/data/products";
import { getCategoryBySlug, getBreadcrumbs } from "@/data/categories";
import { useProductBySlug, useRelatedProducts } from "@/hooks/useSanityData";
import { sanityProductToLegacy } from "@/lib/adapters";
import { ProductCard, QuoteModal } from "@/components/Commerce";
import { useWycena } from "@/hooks/useWycena";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";

/* ---------- tiny reveal hook ---------- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

type Tab = "opis" | "specyfikacja" | "zastosowanie";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();

  // ── Sanity hooks – muszą być przed każdym early return ──────────
  const { data: sanityProduct, loading: productLoading } = useProductBySlug(slug ?? '')

  const product = useMemo(
    () => sanityProduct
      ? sanityProductToLegacy(sanityProduct as SanityProduct)
      : (slug ? getProductBySlug(slug) : null),
    [sanityProduct, slug],
  )

  const categorySlug = (sanityProduct as any)?.categorySlug ?? product?.categorySlug ?? ''
  const { data: sanityRelated } = useRelatedProducts(categorySlug, slug ?? '')

  const related = useMemo(
    () => sanityRelated && (sanityRelated as any[]).length > 0
      ? (sanityRelated as any[]).map((p: SanityProduct) => sanityProductToLegacy(p))
      : staticProducts.filter(p => (product?.related ?? []).includes(p.id)).slice(0, 4),
    [sanityRelated, product],
  )
  // ─────────────────────────────────────────────────────────────────

  const [quoteOpen, setQuoteOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("opis");
  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const { addItem } = useWycena();

  const heroReveal   = useReveal();
  const tabsReveal   = useReveal();
  const relReveal    = useReveal();

  if (!product && !productLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-2">Produkt nie znaleziony</h1>
        <p className="text-gray-500 mb-6">Sprawdź adres URL lub wróć do katalogu.</p>
        <Link to="/produkty"><Button className="bg-primary shadow-sm">Przeglądaj produkty</Button></Link>
      </div>
    );
  }

  // loading – Sanity jeszcze ładuje, czekamy na dane
  if (!product) return null;

  const cat = getCategoryBySlug(product.categorySlug);
  const breadcrumbs = getBreadcrumbs(product.categorySlug);
  const images = product.images?.length ? product.images : ["/placeholder.svg"];

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    toast.success(`${product.name} dodano do wyceny`);
    setTimeout(() => setAdded(false), 2500);
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "opis",         label: "Opis produktu",         icon: <Info className="w-4 h-4" /> },
    { id: "specyfikacja", label: "Specyfikacja techniczna", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "zastosowanie", label: "Zastosowanie",            icon: <Wrench className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        "name": product.name, "description": product.description,
        "brand": { "@type": "Brand", "name": product.brand },
        "sku": product.sku, "image": images,
        "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "PLN",
          "seller": { "@type": "Organization", "name": "Media Bud" } }
      })}} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Strona główna</Link>
            {breadcrumbs.map((bc) => (
              <span key={bc.id} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                <Link to={`/kategoria/${bc.slug}`} className="hover:text-primary transition-colors">{bc.name}</Link>
              </span>
            ))}
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* ── Main section: Gallery + Details ── */}
        <div
          ref={heroReveal.ref as React.RefObject<HTMLDivElement>}
          className={`grid lg:grid-cols-2 gap-10 mb-10 transition-all duration-700 ease-out ${heroReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >

          {/* ── Gallery ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div
              className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden aspect-square group cursor-zoom-in"
              onClick={() => setZoomed(true)}
            >
              <img
                src={images[activeImg]}
                alt={product.name}
                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
              />
              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white rounded-lg px-2 py-1 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3 h-3" /> Powiększ
              </div>
              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  ><ChevronLeft className="w-4 h-4" /></button>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  ><ChevronNext className="w-4 h-4" /></button>
                </>
              )}
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isNew && <Badge className="bg-emerald-500 text-white text-xs shadow">Nowość</Badge>}
                {product.isFeatured && <Badge className="bg-primary text-white text-xs shadow">Polecany</Badge>}
              </div>
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl border-2 overflow-hidden bg-white transition-all ${
                      activeImg === i ? "border-primary shadow-md shadow-primary/20" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div>
            {/* Brand + category */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="secondary" className="font-semibold">{product.brand}</Badge>
              {cat && (
                <Link to={`/kategoria/${cat.slug}`} className="flex items-center gap-1 text-xs text-primary hover:underline font-medium">
                  {cat.name} <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg">
                SKU: {product.sku}
              </span>
              <span className="text-xs text-gray-500">
                Jednostka: <strong className="text-gray-700">{product.unit}</strong>
              </span>
            </div>

            {/* Stars placeholder */}
            <div className="flex items-center gap-1.5 mb-4">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              <span className="text-xs text-gray-500 ml-1">Produkt profesjonalny</span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 text-sm">{product.shortDescription}</p>

            {/* Quick Specs strip */}
            {product.technicalSpec.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-6">
                {product.technicalSpec.slice(0, 4).map((spec, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                    <div className="text-xs text-gray-500">{spec.label}</div>
                    <div className="text-sm font-bold text-gray-900 mt-0.5 truncate">{spec.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA box */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              {/* Qty */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">Ilość:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q-1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 font-bold text-gray-700 transition-colors"
                  >−</button>
                  <span className="w-12 text-center font-bold text-gray-900 text-sm">{qty}</span>
                  <button
                    onClick={() => setQty(q => q+1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 font-bold text-gray-700 transition-colors"
                  >+</button>
                </div>
                <span className="text-sm text-gray-500">{product.unit}</span>
              </div>

              <Button
                className="w-full bg-primary hover:bg-red-700 font-bold text-base py-3 shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                onClick={() => setQuoteOpen(true)}
              >
                <Mail className="w-4 h-4 mr-2" /> Zapytaj o ofertę
              </Button>

              <Button
                variant="outline"
                className={`w-full font-bold py-3 transition-all ${
                  added
                    ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                }`}
                onClick={handleAdd}
              >
                {added
                  ? <><Check className="w-4 h-4 mr-2" /> Dodano do wyceny!</>
                  : <><ShoppingCart className="w-4 h-4 mr-2" /> Dodaj do wyceny</>
                }
              </Button>

              <div className="flex items-center justify-between pt-1">
                <a
                  href="tel:+48509567213"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors font-medium"
                >
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  +48 509 567 213
                </a>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  Dostawa Lublin 24h
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Spec / Application ── */}
        <div
          ref={tabsReveal.ref as React.RefObject<HTMLDivElement>}
          className={`bg-white rounded-2xl border border-gray-100 shadow-sm mb-10 overflow-hidden transition-all duration-700 ease-out ${tabsReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Tab header */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-primary text-primary bg-primary/3"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <div className="flex-1" />
            <a href="#" className="hidden sm:flex items-center gap-1.5 px-4 text-xs text-gray-400 hover:text-primary transition-colors">
              <Download className="w-3.5 h-3.5" /> Karta techniczna
            </a>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === "opis" && (
              <div className="max-w-3xl">
                <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-full font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specyfikacja" && (
              <div className="max-w-2xl">
                {product.technicalSpec.length > 0 ? (
                  <div className="overflow-hidden rounded-xl border border-gray-100">
                    {product.technicalSpec.map((spec, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                      >
                        <span className="text-gray-600 font-medium">{spec.label}</span>
                        <span className="font-bold text-gray-900 text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Specyfikacja techniczna w przygotowaniu. Zapytaj naszych doradców.</p>
                )}
              </div>
            )}

            {activeTab === "zastosowanie" && (
              <div className="max-w-3xl">
                <p className="text-gray-700 leading-relaxed">{product.application}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 bg-primary/5 border border-primary/15 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm text-gray-900">Doradztwo techniczne</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Pomożemy dobrać produkt do Twojego projektu.</p>
                    <a href="tel:+48509567213" className="text-sm font-bold text-primary hover:underline">
                      +48 509 567 213
                    </a>
                  </div>
                  <Button variant="outline" className="sm:self-end border-gray-200 text-gray-600 hover:border-primary hover:text-primary text-sm">
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Karta techniczna (PDF)
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div ref={relReveal.ref as React.RefObject<HTMLDivElement>}>
            <div className={`flex items-center justify-between mb-5 transition-all duration-700 ease-out ${relReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Produkty powiązane
              </h2>
              {cat && (
                <Link to={`/kategoria/${cat.slug}`} className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                  Więcej z kategorii <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <div
                  key={p.id}
                  className={`transition-all duration-500 ease-out ${relReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none">×</button>
          <img
            src={images[activeImg]}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setActiveImg(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${activeImg === i ? "bg-white w-5" : "bg-white/40"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} productName={product.name} />
    </div>
  );
}
