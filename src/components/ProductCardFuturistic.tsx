import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Check, Mail, Eye, Zap } from "lucide-react";
import { useWycena } from "@/hooks/useWycena";
import type { Product } from "@/data/products";
import { toast } from "sonner";
import { extractProductSpecs, getCategorySlugFromProduct } from "@/lib/extractProductSpecs";

const PRODUCT_PLACEHOLDER = "/images/placeholder-product.png";

/* ================================================================
   FUTURISTIC PRODUCT CARD — Industrial Pulse 2026
   
   Features:
   - Intersection Observer lazy loading
   - 3D tilt effect on hover
   - Glowing scan-line animation
   - Corner brackets with glow
   - Quick-view modal trigger
   - Optimized image loading with blur-up
================================================================ */

interface ProductCardFuturisticProps {
  product: Product;
  showBrand?: boolean;
  priority?: boolean;
  index?: number;
  onQuickView?: (product: Product) => void;
  categorySlug?: string; // Override category for spec extraction
}

export const ProductCardFuturistic = React.memo(function ProductCardFuturistic({
  product,
  showBrand = true,
  priority = false,
  index = 0,
  onQuickView,
  categorySlug: categorySlugProp,
}: ProductCardFuturisticProps) {
  const { addItem } = useWycena();
  const [added, setAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const mainImage = product.images?.[0] || PRODUCT_PLACEHOLDER;
  const inStock = product.inStock !== false;

  // Extract technical specs based on product category
  const techSpecs = useMemo(() => {
    const categorySlug = categorySlugProp || getCategorySlugFromProduct(product);
    return extractProductSpecs(product.name, product.shortDescription, categorySlug);
  }, [product.name, product.shortDescription, product, categorySlugProp]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isVisible) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.01 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [priority, isVisible]);

  // 3D tilt effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-6px) scale(1.02)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    const el = cardRef.current;
    if (el) {
      el.style.transform = "translateY(-6px) scale(1.02)";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    const el = cardRef.current;
    if (el) {
      el.style.transform = "translateY(0) scale(1)";
    }
  }, []);

  const handleAdd = useCallback(() => {
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} dodano do wyceny`);
    setTimeout(() => setAdded(false), 2200);
  }, [addItem, product]);

  // Skeleton placeholder when not visible
  if (!isVisible) {
    return (
      <div
        ref={cardRef}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#0c0c0c",
          border: "1px solid rgba(255,255,255,0.04)",
          aspectRatio: "3/4",
          animation: `pulse 2s ease-in-out ${index * 0.05}s infinite`,
        }}
      >
        <div className="aspect-[4/3] w-full" style={{ background: "#111" }} />
        <div className="p-4 space-y-3">
          <div className="h-2 w-1/3 rounded" style={{ background: "rgba(248,24,40,0.1)" }} />
          <div className="h-4 w-4/5 rounded" style={{ background: "#1a1a1a" }} />
          <div className="h-3 w-2/3 rounded" style={{ background: "#151515" }} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(145deg, #0f0f0f 0%, #0a0a0a 100%)",
        border: hovered ? "1px solid rgba(248,24,40,0.5)" : "1px solid rgba(255,255,255,0.06)",
        boxShadow: hovered
          ? "0 0 30px rgba(248,24,40,0.25), 0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)"
          : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform, box-shadow",
        contain: "layout style paint",
      }}
    >
      {/* ── Glowing corner brackets ── */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#f81828] rounded-tl-lg z-10 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, boxShadow: "0 0 10px rgba(248,24,40,0.6)" }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#f81828] rounded-tr-lg z-10 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, boxShadow: "0 0 10px rgba(248,24,40,0.6)" }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#f81828] rounded-bl-lg z-10 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, boxShadow: "0 0 10px rgba(248,24,40,0.6)" }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#f81828] rounded-br-lg z-10 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, boxShadow: "0 0 10px rgba(248,24,40,0.6)" }} />

      {/* ── Scan-line effect ── */}
      {hovered && (
        <div
          className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #f81828 30%, rgba(255,150,150,0.9) 50%, #f81828 70%, transparent 100%)",
            boxShadow: "0 0 12px rgba(248,24,40,0.8)",
            animation: "scanline 2.5s ease-in-out infinite",
          }}
        />
      )}

      {/* ── Image area ── */}
      <Link to={`/produkt/${product.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {/* Background gradient */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, #1a1a1a 0%, #0d0d0d 100%)",
        }} />

        {/* Image with blur-up loading */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#f81828]/20 border-t-[#f81828] animate-spin" />
            </div>
          )}
          <img
            ref={imageRef}
            src={mainImage}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={`relative z-[1] max-w-full max-h-full object-contain transition-all duration-500 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } ${hovered ? "scale-110" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              (e.target as HTMLImageElement).src = PRODUCT_PLACEHOLDER;
              setImageLoaded(true);
            }}
          />
        </div>

        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-16 z-[2] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)" }} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-[3]">
          {product.isNew && (
            <span className="px-2.5 py-1 text-[9px] font-black rounded-lg text-white tracking-wider uppercase"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 12px rgba(16,185,129,0.5)" }}>
              Nowość
            </span>
          )}
          {product.featured && (
            <span className="px-2.5 py-1 text-[9px] font-black rounded-lg text-white tracking-wider uppercase"
              style={{ background: "linear-gradient(135deg, #f81828, #c8000f)", boxShadow: "0 0 12px rgba(248,24,40,0.5)" }}>
              <Zap className="w-3 h-3 inline mr-1" />Polecane
            </span>
          )}
        </div>

        {/* Stock indicator */}
        <div className="absolute top-3 right-3 z-[3]">
          <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold ${
            inStock
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${inStock ? "bg-emerald-400" : "bg-amber-400"}`}
              style={{ boxShadow: inStock ? "0 0 6px rgba(52,211,153,0.8)" : "0 0 6px rgba(251,191,36,0.8)" }} />
            {inStock ? "Dostępny" : "Na zamówienie"}
          </span>
        </div>

        {/* Quick view button */}
        {onQuickView && (
          <button
            onClick={(e) => { e.preventDefault(); onQuickView(product); }}
            className="absolute bottom-3 right-3 z-[3] w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <Eye className="w-4 h-4 text-white" />
          </button>
        )}
      </Link>

      {/* ── Content ── */}
      <div className="p-4 relative">
        {/* Subtle top border glow */}
        <div className="absolute top-0 left-4 right-4 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(248,24,40,0.2), transparent)" }} />

        {/* Brand & SKU */}
        {showBrand && product.brand && /^[A-Za-zÀ-ÿ]/.test(product.brand) && (
          <div className="flex items-center justify-between gap-2 mb-2">
            <Link
              to={`/szukaj?brand=${encodeURIComponent(product.brand)}`}
              className="text-[10px] font-black tracking-[0.15em] uppercase text-[#f81828] hover:text-[#ff6b6b] transition-colors"
            >
              {product.brand}
            </Link>
            {product.unit && (
              <span className="text-[9px] font-mono text-gray-600 px-2 py-0.5 rounded"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                {product.unit}
              </span>
            )}
          </div>
        )}

        {/* Product name */}
        <Link to={`/produkt/${product.slug}`} className="block group/title">
          <h3 className="text-sm font-bold text-gray-200 leading-snug mb-2 line-clamp-2 min-h-[2.6rem] transition-colors group-hover/title:text-white"
            style={{ fontFamily: "'Rajdhani', 'Inter', sans-serif" }}>
            {product.name}
          </h3>
        </Link>

        {/* Technical specs - clean grid layout */}
        {techSpecs.length > 0 && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-3 py-2 px-2.5 rounded-lg"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {techSpecs.map((spec) => (
              <div key={spec.key} className="flex items-baseline justify-between gap-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-wide">{spec.label}</span>
                <span className={`text-[11px] font-bold tabular-nums ${spec.highlight ? "text-[#f81828]" : "text-gray-200"}`}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Short description */}
        {product.shortDescription && (
          <p className="text-[11px] text-gray-500 mb-3 line-clamp-2 leading-relaxed min-h-[2.4rem]">
            {product.shortDescription}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[9px] font-medium text-gray-400"
                style={{ background: "rgba(248,24,40,0.06)", border: "1px solid rgba(248,24,40,0.12)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          {/* Primary CTA */}
          <Link
            to={`/produkt/${product.slug}`}
            className="flex-1 h-10 rounded-xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider transition-all duration-300"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #ff2a3a 0%, #f81828 100%)"
                : "linear-gradient(135deg, #f81828 0%, #c8000f 100%)",
              boxShadow: hovered
                ? "0 0 24px rgba(248,24,40,0.5), 0 4px 16px rgba(248,24,40,0.3)"
                : "0 0 12px rgba(248,24,40,0.2)",
              color: "white",
            }}
          >
            <Mail className="w-3.5 h-3.5" /> Zapytaj
          </Link>

          {/* Add to quote */}
          <button
            onClick={handleAdd}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: added ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.03)",
              border: added ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(255,255,255,0.08)",
              color: added ? "#4ade80" : "#6b7280",
            }}
            title="Dodaj do wyceny"
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
});

export default ProductCardFuturistic;
