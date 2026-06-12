import { useParams, Link } from "react-router-dom";
import {
  ChevronRight, ShoppingCart, Phone, Mail, Download, Check,
  ZoomIn, ChevronLeft, ChevronRight as ChevronNext,
  Info, Wrench, BarChart2, Star, ArrowRight, Shield, X,
  ThumbsUp, HelpCircle, AlertTriangle, FileText, Zap
} from "lucide-react";
import { getProductBySlug, products as staticProducts, type Product } from "@/data/products";
import { getCategoryBySlug, getBreadcrumbs } from "@/data/categories";
import { useProductBySlug, useRelatedProducts } from "@/hooks/useSanityData";
import { sanityProductToLegacy, buildBreadcrumbs, type SanityProduct } from "@/lib/adapters";
import { useSEO } from "@/hooks/useSEO";
import { mergeProductCollections, mergeProductSources } from "@/lib/productMerge";
import { ProductCard, QuoteModal } from "@/components/Commerce";
import { useWycena } from "@/hooks/useWycena";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo, useCallback, useEffect } from "react";
import { toast } from "sonner";

/* ---------- tiny reveal hook ---------- */
function useReveal() {
  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [vis, setVis] = useState(prefersReduced);
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node || vis) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(node);
  }, [vis]);
  return { ref, vis };
}

type Tab = "opis" | "specyfikacja" | "zastosowanie" | "zalety" | "faq";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: sanityProduct, loading: productLoading, error: productError } = useProductBySlug(slug ?? '');

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
            (p) => p.slug === sanityLegacy.slug || (p.sku && sanityLegacy.sku && p.sku === sanityLegacy.sku)
          ) ?? null;
          return mergeProductSources(sanityLegacy, staticMatch);
        })
        .filter(Boolean) as Product[];

    const staticRelated = staticProducts.filter((p) => (product?.related ?? []).includes(p.id));
    return mergeProductCollections(sanityRelatedMerged, staticRelated)
      .filter((item) => item.slug !== product?.slug)
      .slice(0, 4);
  }, [sanityRelated, product]);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return staticProducts
      .filter(p => p.slug !== product.slug && (p.categorySlug === product.categorySlug || p.brand === product.brand))
      .sort((a, b) => {
        const scoreA = (a.categorySlug === product.categorySlug ? 2 : 0) + (a.brand === product.brand ? 1 : 0);
        const scoreB = (b.categorySlug === product.categorySlug ? 2 : 0) + (b.brand === product.brand ? 1 : 0);
        return scoreB - scoreA;
      })
      .slice(0, 6);
  }, [product]);

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

  if (!product && !productLoading && !productError) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050505" }}>
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.2)" }}>
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Produkt nie znaleziony</h1>
          <p className="text-gray-500 mb-6">Sprawdź adres URL lub wróć do katalogu.</p>
          <Link to="/produkty"><Button className="bg-[#f81828] hover:bg-[#c8000f]">Przeglądaj produkty</Button></Link>
        </div>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050505" }}>
        <div className="text-center px-4">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-white mb-2">Nie udało się załadować produktu</h1>
          <p className="text-gray-500 mb-6 text-sm">Sprawdź połączenie z internetem i spróbuj ponownie.</p>
          <button onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl font-bold text-white text-sm"
            style={{ background: "#f81828" }}>
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (!product && productLoading) {
    return (
      <div className="min-h-screen animate-pulse" style={{ background: "#050505" }}>
        <div style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="container mx-auto px-4 py-3">
            <div className="h-3 w-48 rounded" style={{ background: "#1a1a1a" }} />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-3">
              <div className="aspect-square rounded-2xl" style={{ background: "#0f0f0f", border: "1px solid rgba(248,24,40,0.1)" }} />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => <div key={i} className="w-16 h-16 rounded-xl" style={{ background: "#111" }} />)}
              </div>
            </div>
            <div className="space-y-4 pt-2">
              <div className="h-3 w-1/4 rounded" style={{ background: "#1a1a1a" }} />
              <div className="h-8 w-3/4 rounded" style={{ background: "#1a1a1a" }} />
              <div className="h-4 w-1/2 rounded" style={{ background: "#1a1a1a" }} />
              <div className="h-20 w-full rounded-xl mt-4" style={{ background: "#0f0f0f" }} />
              <div className="h-14 w-full rounded-xl mt-4" style={{ background: "#1a1a1a" }} />
              <div className="h-14 w-full rounded-xl" style={{ background: "#0f0f0f" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sanityChain = (sanityProduct as any)?.categoryChain;
  const cat         = product ? getCategoryBySlug(product.categorySlug) : null;
  const breadcrumbs = sanityChain ? buildBreadcrumbs(sanityChain) : (product ? getBreadcrumbs(product.categorySlug) : []);
  const images     = product?.images?.length ? product.images : ["/images/placeholder-product_2.png"];

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
    <div className="min-h-screen" style={{ background: "#050505" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        "@id": `https://mediabud.pl/produkt/${slug}`, "url": `https://mediabud.pl/produkt/${slug}`,
        "name": product.name, "description": product.shortDescription || product.description || undefined,
        "brand": product.brand ? { "@type": "Brand", "name": product.brand } : undefined,
        "sku": product.sku || undefined, "image": images.filter(i => i && !i.includes("placeholder")),
        "category": cat?.name || undefined,
        ...(product.technicalSpec?.length > 0 && {
          "additionalProperty": product.technicalSpec.map(s => ({ "@type": "PropertyValue", "name": s.label, "value": s.value })),
        }),
        ...(related.length > 0 && {
          "isRelatedTo": related.map(r => ({ "@type": "Product", "url": `https://mediabud.pl/produkt/${r.slug}`, "name": r.name }))
        }),
        ...(similarProducts.length > 0 && {
          "isSimilarTo": similarProducts.map(s => ({ "@type": "Product", "url": `https://mediabud.pl/produkt/${s.slug}`, "name": s.name }))
        }),
        "offers": {
          "@type": "Offer", "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition", "priceCurrency": "PLN",
          "url": `https://mediabud.pl/produkt/${slug}`,
          "areaServed": { "@type": "AdministrativeArea", "name": "Lublin i województwo lubelskie" },
          "seller": { "@type": "Organization", "@id": "https://mediabud.pl/#organization", "name": "Media Bud" },
        },
      })}} />

      {breadcrumbs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
            ...breadcrumbs.map((bc, i) => ({ "@type": "ListItem", "position": i + 2, "name": bc.name, "item": `https://mediabud.pl/kategoria/${bc.slug}` })),
            { "@type": "ListItem", "position": breadcrumbs.length + 2, "name": product.name },
          ],
        })}} />
      )}

      {product.faq && product.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": product.faq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        })}} />
      )}

      {/* ── Breadcrumbs — futurystyczny pasek ── */}
      <div style={{ background: "#08080a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto px-4 py-2.5">
          <nav className="flex items-center gap-1 text-[11px] text-gray-600 flex-wrap">
            <Link to="/" className="hover:text-[#f81828] transition-colors font-medium px-1.5 py-0.5 rounded">
              Strona główna
            </Link>
            {breadcrumbs.map((bc) => (
              <span key={bc.id} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-gray-700" />
                <Link to={`/kategoria/${bc.slug}`} className="hover:text-[#f81828] transition-colors font-medium px-1.5 py-0.5 rounded">
                  {bc.name}
                </Link>
              </span>
            ))}
            <ChevronRight className="w-3 h-3 text-gray-700" />
            <span
              className="text-gray-300 font-semibold truncate max-w-xs px-2 py-0.5 rounded text-[11px]"
              style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.18)" }}
            >
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* ── HERO split layout ── */}
        <div
          ref={heroReveal.ref}
          className={`grid lg:grid-cols-2 gap-10 mb-10 transition-all duration-700 ease-out ${heroReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >

          {/* ── Galeria ── */}
          <div className="space-y-3">
            <div
              className="relative overflow-hidden rounded-2xl group cursor-zoom-in"
              style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "1/1" }}
              onClick={() => setZoomed(true)}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2))" }} />

              <img
                src={images[activeImg]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
                style={{ transition: "transform 0.6s ease" }}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                onError={e => { (e.currentTarget as HTMLImageElement).src = "/images/placeholder-product_2.png"; e.currentTarget.onerror = null; }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />

              <div
                className="absolute bottom-3 right-3 text-white rounded-xl px-3 py-2 text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <ZoomIn className="w-3 h-3 text-[#f81828]" /> Powiększ
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.7)"; }}
                  ><ChevronLeft className="w-4 h-4" /></button>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.7)"; }}
                  ><ChevronNext className="w-4 h-4" /></button>
                </>
              )}

              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isNew && (
                  <span className="text-white text-[10px] font-black px-2.5 py-1 rounded-full"
                    style={{ background: "#10b981", boxShadow: "0 0 12px rgba(16,185,129,0.4)" }}>Nowość</span>
                )}
                {product.isFeatured && (
                  <span className="text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ background: "#f81828", boxShadow: "0 0 12px rgba(248,24,40,0.4)" }}>
                    <Zap className="w-2.5 h-2.5" /> Polecany
                  </span>
                )}
              </div>
            </div>

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
                      boxShadow: activeImg === i ? "0 0 14px rgba(248,24,40,0.45)" : "none",
                      transform: activeImg === i ? "scale(1.06)" : "scale(1)",
                    }}
                  >
                    <img src={img} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" className="w-full h-full object-contain p-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Szczegóły ── */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Link
                to={`/szukaj?brand=${encodeURIComponent(product.brand)}`}
                className="text-xs font-black px-3 py-1 rounded-full transition-all"
                style={{ background: "rgba(248,24,40,0.12)", color: "#ff9aa3", border: "1px solid rgba(248,24,40,0.35)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.12)"; (e.currentTarget as HTMLElement).style.color = "#ff9aa3"; }}
              >
                {product.brand}
              </Link>
              {cat && (
                <Link to={`/kategoria/${cat.slug}`}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#f81828] transition-colors font-medium">
                  {cat.name} <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            <h1 className="font-display font-black text-white leading-tight mb-3"
              style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)" }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs px-2.5 py-1 rounded-lg"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#6b7280" }}>
                SKU: {product.sku}
              </span>
              <span className="text-xs text-gray-600">
                Jedn.: <strong className="text-gray-400">{product.unit}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 mb-4">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              <span className="text-xs text-gray-600 ml-1 font-mono">Produkt profesjonalny</span>
            </div>

            {product.shortDescription ? (
              <p className="text-gray-400 leading-relaxed mb-5 text-sm">{product.shortDescription}</p>
            ) : (
              <p className="text-gray-600 leading-relaxed mb-5 text-sm italic">
                Profesjonalny produkt budowlany. Skontaktuj się z nami po szczegóły techniczne i wycenę.
              </p>
            )}

            {product.technicalSpec.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-5">
                {product.technicalSpec.slice(0, 6).map((spec, i) => (
                  <div key={i} className="rounded-xl px-3 py-2.5 transition-all duration-200"
                    style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.25)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                  >
                    <div className="text-[10px] text-gray-600 uppercase tracking-wide">{spec.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5 truncate font-mono">{spec.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── CTA BOX premium ── */}
            <div className="rounded-2xl p-5 space-y-3 relative overflow-hidden"
              style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: "linear-gradient(90deg,transparent,rgba(248,24,40,0.4) 50%,transparent)" }} />

              <div className="flex items-center gap-2 pb-3 mb-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs text-gray-400 font-medium">Dostawa Lublin i okolice · 24h</span>
                <span className="ml-auto text-[10px] text-gray-700 font-mono">W magazynie</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-400">Ilość:</span>
                <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-gray-400 hover:text-white hover:bg-[#f81828]/20 transition-all text-lg">−</button>
                  <span className="w-12 text-center font-black text-white text-sm font-mono"
                    style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", borderRight: "1px solid rgba(255,255,255,0.07)" }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-gray-400 hover:text-white hover:bg-[#f81828]/20 transition-all text-lg">+</button>
                </div>
                <span className="text-sm text-gray-600 font-mono">{product.unit}</span>
              </div>

              {/* Primary CTA — pulsujący glow */}
              <button
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-black text-base text-white transition-all"
                style={{ background: "linear-gradient(135deg,#f81828 0%,#c8000f 100%)", animation: "ctaPulse 3s ease-in-out infinite" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 8px 32px rgba(248,24,40,0.6), 0 0 64px rgba(248,24,40,0.2)";
                  el.style.animation = "none";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.boxShadow = "";
                  el.style.animation = "ctaPulse 3s ease-in-out infinite";
                }}
                onClick={() => setQuoteOpen(true)}
              >
                <Mail className="w-5 h-5" />
                <span>Zapytaj o ofertę</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all ${
                  added ? "text-emerald-400" : "text-[#f81828]"
                }`}
                style={{
                  border: `1px solid ${added ? "rgba(16,185,129,0.4)" : "rgba(248,24,40,0.35)"}`,
                  background: added ? "rgba(16,185,129,0.08)" : "rgba(248,24,40,0.04)",
                }}
                onClick={handleAdd}
                onMouseEnter={e => { if (!added) { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}}
                onMouseLeave={e => { if (!added) { (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.04)"; (e.currentTarget as HTMLElement).style.color = "#f81828"; }}}
              >
                {added ? <><Check className="w-4 h-4" /> Dodano do wyceny!</> : <><ShoppingCart className="w-4 h-4" /> Dodaj do wyceny</>}
              </button>

              <a href="tel:+48533553344"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#f81828] transition-colors pt-1">
                <Phone className="w-4 h-4" /> +48 533 553 344
              </a>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div
          ref={tabsReveal.ref}
          className={`rounded-2xl overflow-hidden mb-10 transition-all duration-700 ease-out ${tabsReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex overflow-x-auto" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#080808" }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px ${
                  activeTab === tab.id ? "border-[#f81828] text-[#f81828]" : "border-transparent text-gray-600 hover:text-gray-300"
                }`}
                style={{ background: activeTab === tab.id ? "rgba(248,24,40,0.06)" : "transparent" }}>
                {tab.icon} {tab.label}
              </button>
            ))}
            <div className="flex-1" />
            <a href="#" className="hidden sm:flex items-center gap-1.5 px-4 text-xs text-gray-600 hover:text-[#f81828] transition-colors">
              <Download className="w-3.5 h-3.5" /> Karta techniczna
            </a>
          </div>

          <div className="p-6">
            <div className={activeTab === "opis" ? "block" : "hidden"}>
              <div className="max-w-3xl">
                {!(product.description || product.shortDescription) && (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <span className="text-2xl">📋</span>
                    </div>
                    <p className="text-gray-500 text-sm">Opis produktu jest w przygotowaniu.</p>
                    <p className="text-gray-600 text-xs">Zadzwoń lub napisz — doradzimy i odpowiemy na wszystkie pytania.</p>
                  </div>
                )}
                <div className="space-y-3 mb-4">
                  {(product.description || product.shortDescription || "").split(/\n\n+/).filter(Boolean).map((para, i) => {
                    const isList = /^[\-•]\s/.test(para.trim());
                    if (isList) {
                      const items = para.split('\n').filter(l => /^[\-•]\s/.test(l.trim()));
                      return (
                        <ul key={i} className="space-y-1 pl-4">
                          {items.map((item, j) => (
                            <li key={j} className="text-gray-400 text-sm leading-relaxed flex gap-2">
                              <span style={{ color: "#f81828" }} className="mt-0.5 shrink-0">▸</span>
                              <span dangerouslySetInnerHTML={{ __html: item.replace(/^[\-•]\s/, '').replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.startsWith('#')) return <h3 key={i} className="text-white font-bold text-sm mt-4">{para.replace(/^#+\s*/, '')}</h3>;
                    return (
                      <p key={i} className="text-gray-400 leading-relaxed text-sm"
                        dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 text-gray-500 text-xs rounded-full font-medium"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SPECYFIKACJA — futurystyczna tabela glowing rows ── */}
            <div className={activeTab === "specyfikacja" ? "block" : "hidden"}>
              <div className="max-w-2xl">
                {product.technicalSpec.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between px-4 py-2.5 text-[10px] font-black tracking-[0.25em] uppercase mb-2"
                      style={{ color: "rgba(248,24,40,0.5)", borderBottom: "1px solid rgba(248,24,40,0.15)" }}>
                      <span>Parametr techniczny</span>
                      <span>Wartość</span>
                    </div>
                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                      {product.technicalSpec.map((spec, i) => {
                        const isNumeric = /^[\d.,\-–+]+\s*[a-zA-Zł°%/²³]*$/.test(spec.value?.trim() ?? '');
                        const numMatch = spec.value?.match(/^([\d.,\-–+\s]+)\s*([a-zA-Zł°%/²³]+)$/);
                        return (
                          <div key={i}
                            className="flex items-center justify-between px-5 py-3.5 text-sm group transition-all duration-150"
                            style={{
                              background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                              borderBottom: i < product.technicalSpec.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.05)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"; }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-[3px] h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                style={{ background: "#f81828", boxShadow: "0 0 6px rgba(248,24,40,0.6)" }} />
                              <span className="text-gray-400 font-medium leading-snug">{spec.label}</span>
                            </div>
                            {isNumeric && numMatch ? (
                              <span className="font-mono font-black text-white text-right whitespace-nowrap">
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
                    <p className="text-[11px] text-gray-700 px-1 pt-2">
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
            </div>

            <div className={activeTab === "zastosowanie" ? "block" : "hidden"}>
              <div className="max-w-3xl">
                <p className="text-gray-400 leading-relaxed text-sm">{product.application}</p>
                {product.seoDescription && <p className="text-gray-500 leading-relaxed text-sm mt-4">{product.seoDescription}</p>}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 rounded-xl p-4" style={{ background: "rgba(248,24,40,0.07)", border: "1px solid rgba(248,24,40,0.16)" }}>
                    <div className="flex items-center gap-2 mb-1"><Phone className="w-4 h-4 text-[#f81828]" /><span className="font-semibold text-sm text-white">Doradztwo techniczne</span></div>
                    <p className="text-xs text-gray-500 mb-2">Pomożemy dobrać produkt do Twojego projektu.</p>
                    <a href="tel:+48533553344" className="text-sm font-bold text-[#f81828] hover:underline">+48 533 553 344</a>
                  </div>
                  <button className="sm:self-end flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl text-gray-400 hover:text-white transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                    <FileText className="w-3.5 h-3.5" /> Karta techniczna (PDF)
                  </button>
                </div>
              </div>
            </div>

            <div className={activeTab === "zalety" ? "block" : "hidden"}>
              {product.advantages && (
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
                      <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-amber-400" /><span className="text-sm font-bold text-amber-400">Ważne informacje i ostrzeżenia</span></div>
                      <ul className="space-y-2">
                        {product.warnings.map((w, i) => (
                          <li key={i} className="text-sm text-gray-400 flex items-start gap-2"><span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={activeTab === "faq" ? "block" : "hidden"}>
              {product.faq && (
                <div className="max-w-3xl space-y-3">
                  <p className="text-xs text-gray-600 mb-4">Najczęściej zadawane pytania dotyczące tego produktu</p>
                  {product.faq.map((item, i) => (
                    <details key={i} className="rounded-xl overflow-hidden group" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none transition-colors"
                        style={{ background: "rgba(255,255,255,0.02)" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.05)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
                      >
                        <span className="text-sm font-semibold text-gray-200 pr-4">{item.q}</span>
                        <ChevronNext className="w-4 h-4 text-gray-500 flex-shrink-0 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#080808" }}>
                        <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Produkty powiązane ── */}
        {related.length > 0 && (
          <div ref={relReveal.ref}>
            <div className={`flex items-center justify-between mb-5 transition-all duration-700 ease-out ${relReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <h2 className="text-xl font-black text-white flex items-center gap-2 font-display">
                <span className="w-[3px] h-5 bg-[#f81828] rounded-full" style={{ boxShadow: "0 0 8px rgba(248,24,40,0.6)" }} />
                Produkty powiązane
              </h2>
              {cat && <Link to={`/kategoria/${cat.slug}`} className="text-sm text-[#f81828] hover:underline flex items-center gap-1 font-medium">Więcej z kategorii <ArrowRight className="w-3.5 h-3.5" /></Link>}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <div key={p.id} className={`transition-all duration-500 ease-out ${relReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Podobne produkty ── */}
        {similarProducts.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-white flex items-center gap-2 font-display">
                <span className="w-[3px] h-5 bg-[#f81828] rounded-full" style={{ boxShadow: "0 0 8px rgba(248,24,40,0.6)" }} />
                {related.length > 0 ? "Inne produkty z tej kategorii" : "Podobne produkty"}
              </h2>
              {cat && <Link to={`/kategoria/${cat.slug}`} className="text-sm text-[#f81828] hover:underline flex items-center gap-1 font-medium">Więcej <ArrowRight className="w-3.5 h-3.5" /></Link>}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              {similarProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* ── Zoom lightbox ── */}
      {zoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(6px)" }}
          onClick={() => setZoomed(false)}>
          <button
            className="absolute top-4 right-4 w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
          >
            <X className="w-5 h-5" />
          </button>
          <img src={images[activeImg]} alt={product.name}
            className="max-w-full max-h-full object-contain rounded-2xl"
            style={{ boxShadow: "0 0 80px rgba(248,24,40,0.1)" }}
            onClick={e => e.stopPropagation()} />
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setActiveImg(i); }}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: activeImg === i ? "20px" : "8px",
                    background: activeImg === i ? "#f81828" : "rgba(255,255,255,0.25)",
                    boxShadow: activeImg === i ? "0 0 8px rgba(248,24,40,0.6)" : "none",
                  }} />
              ))}
            </div>
          )}
        </div>
      )}

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} productName={product.name} />

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(248,24,40,0); }
          50% { box-shadow: 0 0 24px 4px rgba(248,24,40,0.25), 0 0 48px 8px rgba(248,24,40,0.08); }
        }
      `}</style>
    </div>
  );
}
