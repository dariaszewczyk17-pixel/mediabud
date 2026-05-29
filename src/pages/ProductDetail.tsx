import { useParams, Link } from "react-router-dom";
import {
  ChevronRight, ShoppingCart, Phone, Mail, Download, Check,
  ZoomIn, ChevronLeft, ChevronRight as ChevronNext,
  Info, Wrench, BarChart2, Star, ArrowRight, Shield, X,
  ThumbsUp, HelpCircle, AlertTriangle, FileText
} from "lucide-react";
import { getProductBySlug, products as staticProducts, type Product } from "@/data/products";
import { getCategoryBySlug, getBreadcrumbs } from "@/data/categories";
import { useProductBySlug, useRelatedProducts } from "@/hooks/useSanityData";
import { sanityProductToLegacy, type SanityProduct } from "@/lib/adapters";
import { useSEO } from "@/hooks/useSEO";
import { mergeProductCollections, mergeProductSources } from "@/lib/productMerge";
import { ProductCard, QuoteModal } from "@/components/Commerce";
import { useWycena } from "@/hooks/useWycena";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo, useCallback, useEffect } from "react";
import { toast } from "sonner";

/* ---------- tiny reveal hook ----------
 * Używa callback ref zamiast useEffect([]) żeby IntersectionObserver
 * był tworzony nawet gdy element pojawia się w DOM po załadowaniu danych.
 */
function useReveal() {
  const [vis, setVis] = useState(false);

  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(node);
  }, []);

  return { ref, vis };
}

type Tab = "opis" | "specyfikacja" | "zastosowanie" | "zalety" | "faq";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: sanityProduct, loading: productLoading } = useProductBySlug(slug ?? '');

  const staticProduct = useMemo(
    () => (slug ? getProductBySlug(slug) : null),
    [slug],
  );

  const legacySanityProduct = useMemo(
    () => sanityProduct ? sanityProductToLegacy(sanityProduct as SanityProduct) : null,
    [sanityProduct],
  );

  const product = useMemo(
    () => mergeProductSources(legacySanityProduct, staticProduct),
    [legacySanityProduct, staticProduct],
  );

  /* ── Zapisz do "Ostatnio oglądane" w localStorage ── */
  useEffect(() => {
    if (!product) return;
    try {
      const KEY = "mediabud_recently_viewed";
      const stored = localStorage.getItem(KEY);
      const prev: {name: string; slug: string; image?: string}[] = stored ? JSON.parse(stored) : [];
      const entry = { name: product.name, slug: product.slug, image: product.images?.[0] };
      const updated = [entry, ...prev.filter(p => p.slug !== product.slug)].slice(0, 8);
      localStorage.setItem(KEY, JSON.stringify(updated));
    } catch { /* ignore */ }
  }, [product?.slug]);

  const categorySlug = (sanityProduct as any)?.categorySlug ?? product?.categorySlug ?? '';
  const { data: sanityRelated } = useRelatedProducts(categorySlug, slug ?? '');

  const related = useMemo(() => {
    const sanityRelatedMerged =
      ((sanityRelated as SanityProduct[] | undefined) ?? [])
        .map((item) => {
          const sanityLegacy = sanityProductToLegacy(item);
          const staticMatch = staticProducts.find(
            (p) =>
              p.slug === sanityLegacy.slug ||
              (p.sku && sanityLegacy.sku && p.sku === sanityLegacy.sku)
          ) ?? null;

          return mergeProductSources(sanityLegacy, staticMatch);
        })
        .filter(Boolean) as Product[];

    const staticRelated = staticProducts.filter((p) =>
      (product?.related ?? []).includes(p.id)
    );

    return mergeProductCollections(sanityRelatedMerged, staticRelated)
      .filter((item) => item.slug !== product?.slug)
      .slice(0, 4);
  }, [sanityRelated, product]);

  const [quoteOpen, setQuoteOpen] = useState(false);
  const [added, setAdded]         = useState(false);
  const [qty, setQty]             = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("opis");
  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed]       = useState(false);
  const { addItem } = useWycena();

  const heroReveal = useReveal();
  const tabsReveal = useReveal();
  const relReveal  = useReveal();

  /* ── SEO meta tagi ── */
  useSEO({
    title: product
      ? `${product.name}${product.brand ? ` – ${product.brand}` : ""} | Media Bud`
      : "Produkt | Media Bud",
    description: product
      ? (product.shortDescription || product.description || "").slice(0, 160)
      : undefined,
    canonical: slug ? `/produkt/${slug}` : undefined,
    ogType: "product",
    ogImage: product?.images?.[0] ?? undefined,
  });

  if (!product && !productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080808" }}>
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white mb-2">Produkt nie znaleziony</h1>
          <p className="text-gray-500 mb-6">Sprawdź adres URL lub wróć do katalogu.</p>
          <Link to="/produkty">
            <Button className="bg-[#f81828] hover:bg-[#c8000f]">Przeglądaj produkty</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const cat        = getCategoryBySlug(product.categorySlug);
  const breadcrumbs = getBreadcrumbs(product.categorySlug);
  const images     = product.images?.length ? product.images : ["/placeholder.svg"];

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    toast.success(`${product.name} dodano do wyceny`);
    setTimeout(() => setAdded(false), 2500);
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "opis",         label: "Opis produktu",          icon: <Info className="w-4 h-4" /> },
    { id: "specyfikacja", label: "Specyfikacja techniczna", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "zastosowanie", label: "Zastosowanie",            icon: <Wrench className="w-4 h-4" /> },
    ...(product.advantages && product.advantages.length > 0 ? [{ id: "zalety" as Tab, label: "Zalety", icon: <ThumbsUp className="w-4 h-4" /> }] : []),
    ...(product.faq && product.faq.length > 0 ? [{ id: "faq" as Tab, label: "FAQ", icon: <HelpCircle className="w-4 h-4" /> }] : []),
  ];

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      {/* JSON-LD Product + FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        "name": product.name, "description": product.description,
        "brand": { "@type": "Brand", "name": product.brand },
        "sku": product.sku, "image": images,
        "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "PLN",
          "seller": { "@type": "Organization", "name": "Media Bud" } }
      })}} />
      {product.faq && product.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": product.faq.map(f => ({
            "@type": "Question", "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}} />
      )}

      {/* ── Breadcrumbs ── */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-xs text-gray-600 flex-wrap">
            <Link to="/" className="hover:text-[#f81828] transition-colors">Strona główna</Link>
            {breadcrumbs.map((bc) => (
              <span key={bc.id} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                <Link to={`/kategoria/${bc.slug}`} className="hover:text-[#f81828] transition-colors">{bc.name}</Link>
              </span>
            ))}
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 font-medium truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* ── Main section: Gallery + Details ── */}
        <div
          ref={heroReveal.ref}
          className={`grid lg:grid-cols-2 gap-8 mb-8 transition-all duration-700 ease-out ${heroReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >

          {/* ── Gallery ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div
              className="relative overflow-hidden rounded-2xl group cursor-zoom-in aspect-square"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}
              onClick={() => setZoomed(true)}
            >
              <img
                src={images[activeImg]}
                alt={product.name}
                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
              />
              {/* Zoom hint */}
              <div
                className="absolute bottom-3 right-3 text-white rounded-lg px-2.5 py-1.5 text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <ZoomIn className="w-3 h-3" /> Powiększ
              </div>
              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:bg-[#f81828]"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
                  ><ChevronLeft className="w-4 h-4" /></button>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:bg-[#f81828]"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
                  ><ChevronNext className="w-4 h-4" /></button>
                </>
              )}
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isNew && (
                  <span className="text-white text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: "#10b981" }}>
                    Nowość
                  </span>
                )}
                {product.isFeatured && (
                  <span className="text-white text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: "#f81828" }}>
                    Polecany
                  </span>
                )}
              </div>
              {/* Top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f81828] opacity-60" />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all"
                    style={{
                      background: "#0f0f0f",
                      border: `2px solid ${activeImg === i ? "#f81828" : "rgba(255,255,255,0.08)"}`,
                      boxShadow: activeImg === i ? "0 0 10px rgba(248,24,40,0.3)" : "none",
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div>
            {/* Brand + category */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(248,24,40,0.12)", color: "#f88090", border: "1px solid rgba(248,24,40,0.22)" }}
              >
                {product.brand}
              </span>
              {cat && (
                <Link
                  to={`/kategoria/${cat.slug}`}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#f81828] transition-colors font-medium"
                >
                  {cat.name} <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-black text-white leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-mono text-xs px-2.5 py-1 rounded-lg"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#6b7280" }}
              >
                SKU: {product.sku}
              </span>
              <span className="text-xs text-gray-600">
                Jedn.: <strong className="text-gray-400">{product.unit}</strong>
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1.5 mb-4">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              <span className="text-xs text-gray-600 ml-1">Produkt profesjonalny</span>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6 text-sm">{product.shortDescription}</p>

            {/* Quick Specs strip */}
            {product.technicalSpec.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-6">
                {product.technicalSpec.slice(0, 6).map((spec, i) => (
                  <div
                    key={i}
                    className="rounded-xl px-3 py-2.5"
                    style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="text-xs text-gray-600">{spec.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5 truncate">{spec.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA box */}
            <div
              className="rounded-2xl p-5 space-y-3"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Top accent line */}
              <div className="flex items-center gap-2 pb-3 mb-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-gray-500 font-medium">Dostawa Lublin i okolice · 24h</span>
                <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Qty selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-400">Ilość:</span>
                <div
                  className="flex items-center rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center font-bold text-gray-400 hover:text-white hover:bg-[#f81828]/15 transition-all"
                  >−</button>
                  <span className="w-12 text-center font-bold text-white text-sm" style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", borderRight: "1px solid rgba(255,255,255,0.07)" }}>{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-9 h-9 flex items-center justify-center font-bold text-gray-400 hover:text-white hover:bg-[#f81828]/15 transition-all"
                  >+</button>
                </div>
                <span className="text-sm text-gray-600">{product.unit}</span>
              </div>

              {/* Primary CTA */}
              <button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-base text-white transition-all hover:-translate-y-0.5"
                style={{ background: "#f81828" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(248,24,40,0.4)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                onClick={() => setQuoteOpen(true)}
              >
                <Mail className="w-4 h-4" /> Zapytaj o ofertę
              </button>

              {/* Secondary CTA */}
              <button
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                  added ? "text-emerald-400" : "text-[#f81828] hover:bg-[#f81828] hover:text-white"
                }`}
                style={{
                  border: `1px solid ${added ? "rgba(16,185,129,0.4)" : "rgba(248,24,40,0.4)"}`,
                  background: added ? "rgba(16,185,129,0.08)" : "transparent",
                }}
                onClick={handleAdd}
              >
                {added
                  ? <><Check className="w-4 h-4" /> Dodano do wyceny!</>
                  : <><ShoppingCart className="w-4 h-4" /> Dodaj do wyceny</>
                }
              </button>

              {/* Phone */}
              <a
                href="tel:+48509567213"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#f81828] transition-colors pt-1"
              >
                <Phone className="w-4 h-4" /> +48 509 567 213
              </a>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div
          ref={tabsReveal.ref}
          className={`rounded-2xl overflow-hidden mb-8 transition-all duration-700 ease-out ${tabsReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Tab header */}
          <div className="flex overflow-x-auto" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-[#f81828] text-[#f81828]"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
                style={{ background: activeTab === tab.id ? "rgba(248,24,40,0.06)" : "transparent" }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <div className="flex-1" />
            <a
              href="#"
              className="hidden sm:flex items-center gap-1.5 px-4 text-xs text-gray-600 hover:text-[#f81828] transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Karta techniczna
            </a>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === "opis" && (
              <div className="max-w-3xl">
                <p className="text-gray-400 leading-relaxed mb-4 text-sm">{product.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-gray-500 text-xs rounded-full font-medium"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specyfikacja" && (
              <div className="max-w-2xl">
                {product.technicalSpec.length > 0 ? (
                  <div className="space-y-0.5">
                    {/* Nagłówek tabeli */}
                    <div className="flex items-center justify-between px-4 py-2 text-xs font-medium tracking-widest uppercase mb-2"
                      style={{ color: "rgba(255,255,255,0.2)" }}>
                      <span>Parametr</span>
                      <span>Wartość</span>
                    </div>
                    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                      {product.technicalSpec.map((spec, i) => {
                        // Wykryj wartości numeryczne do font-mono
                        const isNumeric = /^[\d.,\-–+]+\s*[a-zA-Zł°%/²³]*$/.test(spec.value?.trim() ?? '');
                        // Wykryj jednostkę i podświetl ją
                        const numMatch = spec.value?.match(/^([\d.,\-–+\s]+)\s*([a-zA-Zł°%/²³]+)$/);
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between px-4 py-3 text-sm group"
                            style={{
                              background: i % 2 === 0 ? "rgba(255,255,255,0.025)" : "transparent",
                              borderBottom: i < product.technicalSpec.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none"
                            }}
                          >
                            <span className="text-gray-400 font-medium pr-4 leading-snug">{spec.label}</span>
                            {isNumeric && numMatch ? (
                              <span className="font-mono font-bold text-white text-right whitespace-nowrap">
                                {numMatch[1].trim()}
                                <span className="text-xs font-sans ml-0.5" style={{ color: "#f81828" }}>{numMatch[2]}</span>
                              </span>
                            ) : (
                              <span className={`font-bold text-white text-right ${isNumeric ? "font-mono" : ""}`}>{spec.value}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {/* Podpis */}
                    <p className="text-xs text-gray-700 px-1 pt-2">
                      Dane techniczne podane przez producenta. Pytaj o aktualny cennik i dostępność.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl px-6 py-8 text-center" style={{ border: "1px dashed rgba(255,255,255,0.07)" }}>
                    <p className="text-gray-600 text-sm">Specyfikacja techniczna w przygotowaniu.</p>
                    <p className="text-gray-700 text-xs mt-1">Zapytaj naszych doradców — tel. lub e-mail.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "zastosowanie" && (
              <div className="max-w-3xl">
                <p className="text-gray-400 leading-relaxed text-sm">{product.application}</p>
                {product.seoDescription && (
                  <p className="text-gray-500 leading-relaxed text-sm mt-4">{product.seoDescription}</p>
                )}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 rounded-xl p-4" style={{ background: "rgba(248,24,40,0.07)", border: "1px solid rgba(248,24,40,0.16)" }}>
                    <div className="flex items-center gap-2 mb-1"><Phone className="w-4 h-4 text-[#f81828]" /><span className="font-semibold text-sm text-white">Doradztwo techniczne</span></div>
                    <p className="text-xs text-gray-500 mb-2">Pomożemy dobrać produkt do Twojego projektu.</p>
                    <a href="tel:+48509567213" className="text-sm font-bold text-[#f81828] hover:underline">+48 509 567 213</a>
                  </div>
                  <button className="sm:self-end flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl text-gray-400 hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                    <FileText className="w-3.5 h-3.5" /> Karta techniczna (PDF)
                  </button>
                </div>
              </div>
            )}

            {activeTab === "zalety" && product.advantages && (
              <div className="max-w-3xl space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.advantages.map((adv, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl p-4" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{adv}</span>
                    </div>
                  ))}
                </div>
                {product.warnings && product.warnings.length > 0 && (
                  <div className="rounded-xl p-4 mt-4" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-bold text-amber-400">Ważne informacje i ostrzeżenia</span>
                    </div>
                    <ul className="space-y-2">
                      {product.warnings.map((w, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "faq" && product.faq && (
              <div className="max-w-3xl space-y-3">
                <p className="text-xs text-gray-600 mb-4">Najczęściej zadawane pytania dotyczące tego produktu</p>
                {product.faq.map((item, i) => (
                  <details key={i} className="rounded-xl overflow-hidden group" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-[#f81828]/05 transition-colors" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <span className="text-sm font-semibold text-gray-200 pr-4">{item.q}</span>
                      <ChevronNext className="w-4 h-4 text-gray-500 flex-shrink-0 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0a0a0a" }}>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div ref={relReveal.ref}>
            <div className={`flex items-center justify-between mb-5 transition-all duration-700 ease-out ${relReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <h2 className="text-xl font-black text-white flex items-center gap-2 font-display">
                <span className="w-[3px] h-5 bg-[#f81828] rounded-full" />
                Produkty powiązane
              </h2>
              {cat && (
                <Link
                  to={`/kategoria/${cat.slug}`}
                  className="text-sm text-[#f81828] hover:underline flex items-center gap-1 font-medium"
                >
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

      {/* ── Zoom lightbox ── */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(4px)" }}
          onClick={() => setZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={images[activeImg]}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-2xl"
            onClick={e => e.stopPropagation()}
          />
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setActiveImg(i); }}
                  className={`h-2 rounded-full transition-all ${activeImg === i ? "bg-white w-5" : "bg-white/30 w-2"}`}
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
