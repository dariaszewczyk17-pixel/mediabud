import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Check, Mail } from "lucide-react";
import { useWycena } from "@/hooks/useWycena";
import type { Product } from "@/data/products";
import { toast } from "sonner";
import { extractProductSpecs, getCategorySlugFromProduct } from "@/lib/extractProductSpecs";

const PRODUCT_PLACEHOLDER = "/images/placeholder-product_2.png";

interface ProductCardFuturisticProps {
  product: Product;
  showBrand?: boolean;
  priority?: boolean;
  index?: number;
  onQuickView?: (product: Product) => void;
  categorySlug?: string;
}

export const ProductCardFuturistic = React.memo(function ProductCardFuturistic({
  product,
  showBrand = true,
  priority = false,
  index = 0,
  categorySlug: categorySlugProp,
}: ProductCardFuturisticProps) {
  const { addItem } = useWycena();
  const [added, setAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mainImage = product.images?.[0] || PRODUCT_PLACEHOLDER;

  // ── Parametry techniczne — do 6, grid 2-kolumnowy ──
  const techSpecs = useMemo(() => {
    const categorySlug = categorySlugProp || getCategorySlugFromProduct(product);
    const searchableText = [
      product.shortDescription,
      product.description,
      product.application,
      product.unit,
      ...(product.technicalSpec || []).flatMap((s) => [s.label, s.value]),
    ].filter(Boolean).join(" ");

    const extracted = extractProductSpecs(product.name, searchableText, categorySlug);

    const fromProductSpecs = (product.technicalSpec || [])
      .filter((s) => s.label && s.value)
      .slice(0, 6)
      .map((s, i) => ({ key: `ps-${i}-${s.label}`, label: s.label, value: s.value, highlight: i === 0 }));

    const fallback = [
      product.unit ? { key: "unit", label: "Opakowanie", value: product.unit, highlight: false } : null,
    ].filter(Boolean) as typeof extracted;

    const merged = [...extracted, ...fromProductSpecs, ...fallback];
    const seen = new Set<string>();
    return merged.filter((s) => {
      const id = `${s.label.toLowerCase()}::${s.value.toLowerCase()}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    }).slice(0, 6);
  }, [product, categorySlugProp]);

  // ── Intersection Observer lazy load ──
  useEffect(() => {
    if (priority || isVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: "150px", threshold: 0.01 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [priority, isVisible]);

  const handleAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} dodano do wyceny`);
    setTimeout(() => setAdded(false), 2200);
  }, [addItem, product]);

  // ── Skeleton ──
  if (!isVisible) {
    return (
      <div
        ref={cardRef}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#141414",
          border: "1px solid rgba(255,255,255,0.06)",
          animation: `pcf-pulse 1.8s ease-in-out ${(index % 6) * 0.08}s infinite`,
        }}
      >
        <div className="h-52 w-full" style={{ background: "#e8e8e8" }} />
        <div className="p-4 space-y-3">
          <div className="h-2.5 w-1/4 rounded" style={{ background: "#222" }} />
          <div className="h-4 w-3/4 rounded" style={{ background: "#1c1c1c" }} />
          <div className="h-3 w-full rounded" style={{ background: "#181818" }} />
          <div className="h-3 w-2/3 rounded" style={{ background: "#181818" }} />
          <div className="h-20 rounded-xl mt-2" style={{ background: "#1a1a1a" }} />
          <div className="h-10 rounded-xl mt-1" style={{ background: "#280008" }} />
        </div>
      </div>
    );
  }

  const skuSlug = product.slug
    ? product.slug.split("-").slice(-3).join("-").toUpperCase().slice(0, 14)
    : "";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "#141414",
        border: hovered ? "1px solid rgba(248,24,40,0.5)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 0 28px rgba(248,24,40,0.18), 0 16px 40px rgba(0,0,0,0.55)"
          : "0 2px 12px rgba(0,0,0,0.4)",
        transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      {/* ── ZDJĘCIE — białe tło ── */}
      <Link to={`/produkt/${product.slug}`} className="block relative overflow-hidden flex-shrink-0" style={{ height: 210, background: "#fff" }}>
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#f5f5f5" }}>
            <div className="w-8 h-8 rounded-full border-2 border-[#f81828]/20 border-t-[#f81828] animate-spin" />
          </div>
        )}
        <img
          src={mainImage}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-contain p-5 transition-all duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"} ${hovered ? "scale-105" : "scale-100"}`}
          style={{ transitionProperty: "opacity, transform" }}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => { (e.target as HTMLImageElement).src = PRODUCT_PLACEHOLDER; setImageLoaded(true); }}
        />
        {/* Czerwona linia na dole zdjęcia */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "#f81828" }} />
      </Link>

      {/* ── TREŚĆ ── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">

        {/* Marka + SKU */}
        {showBrand && (
          <div className="flex items-center justify-between gap-2">
            <Link
              to={`/szukaj?brand=${encodeURIComponent(product.brand || "")}`}
              className="text-[11px] font-black tracking-[0.14em] uppercase text-[#f81828] hover:brightness-125 transition-all"
            >
              {product.brand || ""}
            </Link>
            {skuSlug && (
              <span className="text-[9px] font-mono text-gray-600 tracking-wide truncate max-w-[90px]">
                {skuSlug}
              </span>
            )}
          </div>
        )}

        {/* Nazwa produktu */}
        <Link to={`/produkt/${product.slug}`}>
          <h3
            className="font-bold text-white leading-snug line-clamp-2 hover:text-[#f5f5f5] transition-colors"
            style={{ fontSize: "0.95rem", fontFamily: "'Rajdhani', 'Inter', sans-serif", minHeight: "2.7rem" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Krótki opis */}
        {product.shortDescription && (
          <p className="text-[12px] leading-relaxed text-gray-400 line-clamp-2" style={{ minHeight: "2.4rem" }}>
            {product.shortDescription}
          </p>
        )}

        {/* Tagi — chipy */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-medium text-gray-400"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── PARAMETRY TECHNICZNE ── */}
        <div
          className="rounded-xl overflow-hidden mt-auto"
          style={{ background: "#1c1c1c", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* nagłówek */}
          <div
            className="px-3 py-1.5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-500">
              Parametry techniczne
            </span>
          </div>

          {/* grid 2 kolumny */}
          {techSpecs.length > 0 ? (
            <div className="grid grid-cols-2 px-2 py-1.5" style={{ gap: "1px", background: "rgba(255,255,255,0.04)" }}>
              {techSpecs.map((spec) => (
                <div
                  key={spec.key}
                  className="flex flex-col px-2 py-2"
                  style={{ background: "#1c1c1c" }}
                >
                  <span className="text-[9px] uppercase tracking-[0.1em] text-gray-500 font-medium truncate">
                    {spec.label}
                  </span>
                  <span
                    className="text-[12px] font-black text-white leading-tight mt-0.5 truncate"
                    title={spec.value}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-3 py-3 text-[11px] text-gray-600 leading-relaxed">
              Specyfikacja dostępna w szczegółach produktu.
            </div>
          )}
        </div>

        {/* ── CTA ZAPYTAJ O OFERTĘ ── */}
        <Link
          to={`/produkt/${product.slug}`}
          className="flex items-center justify-center gap-2 w-full rounded-xl text-[12px] font-black uppercase tracking-wider text-white transition-all duration-200 mt-1"
          style={{
            height: 44,
            background: hovered ? "#ff2030" : "#f81828",
            boxShadow: hovered ? "0 0 20px rgba(248,24,40,0.45)" : "0 0 10px rgba(248,24,40,0.2)",
          }}
        >
          <Mail className="w-4 h-4 flex-shrink-0" />
          Zapytaj o ofertę
        </Link>

        {/* ── Dodaj do wyceny ── */}
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 w-full text-[11px] font-medium transition-all duration-200"
          style={{
            height: 36,
            color: added ? "#4ade80" : "#9ca3af",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
          {added ? "Dodano do wyceny" : "Dodaj do wyceny"}
        </button>
      </div>

      <style>{`
        @keyframes pcf-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </div>
  );
});

export default ProductCardFuturistic;
