import React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Phone, Mail, Check, X, ArrowLeft, Trash2, Package, Layers3, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useWycena } from "@/hooks/useWycena";
import { trackFormSubmit, trackPhoneClick } from "@/hooks/useConversionTracking";
import type { Product } from "@/data/products";
import { toast } from "sonner";
import { CONTACT_FILE_ACCEPT, prepareContactAttachments } from "@/lib/contactAttachments";


const PRODUCT_PLACEHOLDER = "/images/placeholder-product_2.png";

const getProductImage = (product: Pick<Product, "images">) => product.images?.[0] || PRODUCT_PLACEHOLDER;

/* ================================================================
   GLOBAL CSS — przenoszone poza komponent, by nie re-kreować przy renderze
================================================================ */
const _cardStylesEl = (() => {
  if (typeof document === "undefined") return null;
  const id = "__commerce_card_styles__";
  if (document.getElementById(id)) return null;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .img-shimmer { animation: shimmer 1.8s infinite; }
    @keyframes spark-tl {
      0%   { transform: translate(0,0) scale(1.3); opacity: 0.95; }
      100% { transform: translate(-8px,-11px) scale(0); opacity: 0; }
    }
    @keyframes spark-tr {
      0%   { transform: translate(0,0) scale(1.3); opacity: 0.95; }
      100% { transform: translate(8px,-11px) scale(0); opacity: 0; }
    }
    @keyframes spark-bl {
      0%   { transform: translate(0,0) scale(1); opacity: 0.7; }
      100% { transform: translate(-6px,8px) scale(0); opacity: 0; }
    }
    .group:hover .card-spark-tl { animation: spark-tl 0.45s ease-out; }
    .group:hover .card-spark-tr { animation: spark-tr 0.45s ease-out 0.08s; }
    .group:hover .card-spark-bl { animation: spark-bl 0.4s ease-out 0.16s; }
    @keyframes scanline {
      0%   { top: 0%; opacity: 0.85; }
      80%  { opacity: 0.85; }
      100% { top: 100%; opacity: 0; }
    }
    .card-scanline {
      animation: scanline 3s ease-in-out infinite;
    }
    @keyframes corner-pulse {
      0%,100% { opacity: 0.7; }
      50%      { opacity: 1; }
    }
    .card-corner { animation: corner-pulse 2s ease-in-out infinite; }
  `;
  document.head.appendChild(el);
  return el;
})();
void _cardStylesEl;

/* ================================================================
   PRODUCT CARD  – dark industrial cyberpunk
================================================================ */
interface ProductCardProps {
  product: Product;
  showBrand?: boolean;
  priority?: boolean;
}



export const ProductCard = React.memo(function ProductCardComponent({ product, showBrand = true, priority = false }: ProductCardProps) {
  const { addItem } = useWycena();
  const [added, setAdded]     = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mainImage = getProductImage(product);

  // Filtrowanie parametrów: używa key/priority z Sanity (po migracji)
  // Fallback na regex dla starych danych bez key
  const topSpecs = (() => {
    const PALLET_LABEL  = /paleta|palet|na\s+pal[ei]|ilo[sś][cć]\s+na/i;
    const GPSR_LABEL    = /^GPSR/i;
    const BOOL_VALUE    = /^(true|false)$/i;
    const THERMAL_LABEL = /lambda|λ|przewodno[sś][cć]|wsp[oó][łl]czynnik\s*ciep/i;
    // Blacklist: bezużyteczne parametry na kartach produktów
    const BLACKLIST_KEYS = ['seria_produktu', 'rodzaj_welny', 'typ_produktu', 'numer_katalogowy', 'kod_producenta', 'index', 'indeks', 'symbol'];
    const BLACKLIST_RX   = /seria\s+produkt|rodzaj\s+we[łl]n|typ\s+produkt|numer\s+katalog|kod\s+produc|index|indeks|symbol|ref\s*\./i;

    const catSlug     = product.categorySlug || '';
    const isIsolation = /izolac|styropian|we[łl]n[ay]|xps|eps|pianka|ociepleni/i.test(catSlug);

    // Filtruj
    const filtered = (product.technicalSpec || [])
      .filter(s => s.label && s.value)
      .filter(s => !PALLET_LABEL.test(s.label))
      .filter(s => !GPSR_LABEL.test(s.label))
      .filter(s => !BOOL_VALUE.test(s.value))
      .filter(s => (s as any).key ? !BLACKLIST_KEYS.includes((s as any).key) : !BLACKLIST_RX.test(s.label))
      .filter(s => s.label.length <= 35)
      .filter(s => isIsolation || !THERMAL_LABEL.test(s.label));

    // Sortuj: używaj priority z Sanity (1=najwyższy), fallback na 99
    return filtered
      .sort((a, b) => ((a as any).priority ?? 99) - ((b as any).priority ?? 99))
      .slice(0, 2);
  })();

  const brandLabel = (product.brand || "").trim();
  const skuLabel = (product.sku || "").trim();
  const hasMeta = Boolean(brandLabel || skuLabel);
  const shortDesc = (product.shortDescription || "").trim();

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "translateY(0)";
    el.style.boxShadow = "0 12px 30px rgba(0,0,0,0.18)";
    el.style.borderColor = "#2d2d2d";
    setHovered(false);
  };
  const handleMouseEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "translateY(-4px)";
    el.style.boxShadow = "0 16px 36px rgba(0,0,0,0.34)";
    el.style.borderColor = "rgba(248,24,40,0.5)";
    setHovered(true);
  };

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} dodano do wyceny`);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group rounded-xl overflow-hidden h-full flex flex-col"
        style={{
          background: "#0f0f0f",
          border: "1px solid #2d2d2d",
          borderRadius: "0.75rem",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
          position: "relative",
          boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
        }}
      >
        {/* ── Image area ── */}
        <Link
          to={`/produkt/${product.slug}`}
          className="block relative overflow-hidden"
          style={{
            background: "#141414",
            aspectRatio: "4/3",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* inner frame (mockup-like) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          />

          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f81828] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: "0 0 8px rgba(248,24,40,0.6)" }} />

          <div className="absolute inset-0 rounded-lg" style={{ background: "#141414" }}>
            {/* Jasna ramka jak w bestsellerach */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                border: "1px solid rgba(255,255,255,0.55)",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.35)",
              }}
            />

            {/* Shimmer skeleton */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div
                className="img-shimmer absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
              />
            </div>

            <img
              src={mainImage}
              alt={product.brand ? product.name + " \u2013 " + product.brand : product.name}
              width={400}
              height={300}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding={priority ? "sync" : "async"}
              className="relative z-[1] w-full h-full object-contain p-3 transition-all duration-500 group-hover:scale-105"
              onError={e => { (e.target as HTMLImageElement).src = PRODUCT_PLACEHOLDER; }}
            />
          </div>


        </Link>

        {/* ── Content ── */}
        <div className="p-4 flex flex-col flex-1">
          <Link to={`/produkt/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-gray-200 leading-snug mb-1.5 group-hover:text-[#f88090] transition-colors line-clamp-2 font-display min-h-[2.7rem]">
              {product.name}
            </h3>
          </Link>

          {/* Meta: brand + SKU (mockup) */}
          {showBrand && hasMeta && (
            <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-2">
              {brandLabel && (
                <span className="font-semibold tracking-wide text-gray-400">{brandLabel}</span>
              )}
              {brandLabel && skuLabel && <span className="text-gray-600">•</span>}
              {skuLabel && (
                <span className="font-mono text-gray-500 truncate">SKU: {skuLabel}</span>
              )}
            </div>
          )}

          {/* Short description (mockup) */}
          {shortDesc ? (
            <p className="text-[11px] text-gray-400 mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">{shortDesc}</p>
          ) : (
            <div className="mb-3 min-h-[2.5rem]" />
          )}

          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span
              className="inline-flex items-center rounded-full px-2 py-1 text-[10px] font-medium text-gray-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {product.categorySlug.replace(/-/g, " ")}
            </span>
          </div>

          <div
            className="mb-3 rounded-xl p-3"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-500 mb-2">
              PARAMETRY TECHNICZNE
            </div>
            {topSpecs.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 min-h-[38px]">
                {topSpecs.map((spec) => (
                  <div key={spec.label} className="min-w-0 overflow-hidden">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-gray-500 leading-tight mb-0.5 truncate">
                      {spec.label}
                    </div>
                    <div className="text-[11px] font-semibold text-gray-200 leading-tight truncate">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[11px] text-gray-600">
                Specyfikacja dostępna w szczegółach produktu.
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 mb-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300">
              <Package className="w-3.5 h-3.5" /> Zapytaj o dostępność
            </span>
            <span className="inline-flex items-center gap-1.5 text-gray-500">
              <Truck className="w-3.5 h-3.5" /> Odbiór lub dostawa
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-auto">
            {/* Primary CTA — glowing red, większy */}
            <button
              className="w-full h-11 text-white text-[13px] font-black rounded-lg flex items-center justify-center gap-2 transition-all duration-200 tracking-wide uppercase"
              style={{
                background: "linear-gradient(135deg, #f81828 0%, #c8000f 100%)",
                boxShadow: hovered ? "0 0 20px rgba(248,24,40,0.55), 0 4px 16px rgba(248,24,40,0.3)" : "0 0 10px rgba(248,24,40,0.2)",
                border: "1px solid rgba(248,24,40,0.5)",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #ff2a3a 0%, #e0000e 100%)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(248,24,40,0.6), 0 4px 20px rgba(248,24,40,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #f81828 0%, #c8000f 100%)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 10px rgba(248,24,40,0.2)"; }}
              onClick={handleAdd}
            >
              {added
                ? <><Check className="w-4 h-4" /> Dodano do wyceny</>
                : <><ShoppingCart className="w-4 h-4" /> Dodaj do wyceny</>}
            </button>

            <div className="grid grid-cols-[1fr_auto] gap-2">
              <Link to={`/produkt/${product.slug}`} className="h-9 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 text-gray-300 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                Szczegóły <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a href="tel:+48533553344" aria-label={`Zadzwoń w sprawie: ${product.name}`} onClick={trackPhoneClick} className="h-9 w-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#f81828] transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </>
  );
});

/* ================================================================
   QUOTE MODAL  – dark industrial
================================================================ */
interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
}

export function QuoteModal({ open, onClose, productName }: QuoteModalProps) {
  const [mode, setMode]     = useState<"choose" | "form" | "sent">("choose");
  const [agreed, setAgreed] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm]     = useState({ name: "", email: "", phone: "", quantity: "", message: "", file: null as File | null });

  const handleClose = () => {
    onClose();
    setTimeout(() => { setMode("choose"); setAgreed(false); setSending(false); }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSending(true);
    try {
      const attachments = await prepareContactAttachments(form.file ? [form.file] : []);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Zapytanie o ofertę${productName ? `: ${productName}` : ""} – mediabud.pl`,
          message: `Produkt: ${productName || "—"}\nIlość/zakres: ${form.quantity || "—"}\n\n${form.message}`,
          attachments,
        }),
      });
      if (res.ok) {
        setMode("sent");
        trackFormSubmit();
      } else {
        toast.error("Nie udało się wysłać. Zadzwoń: +48 533 553 344");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nie udało się wysłać. Zadzwoń: +48 533 553 344");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e5e7eb",
  } as const;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-[calc(100vw-24px)] rounded-2xl p-0 gap-0 flex flex-col max-h-[92dvh] overflow-hidden"
        style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.09)" }}>

        {/* Modal header — fixed */}
        <div className="relative px-6 pt-6 pb-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.3) 60%,transparent)" }} />
          <DialogHeader>
            <DialogTitle className="text-base font-black font-display text-white">
              {mode === "choose" ? "Zapytaj o ofertę"
               : mode === "form" ? "Wyślij zapytanie"
               : "Dziękujemy!"}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-1">

          {/* ── Choose mode ── */}
          {mode === "choose" && (
            <div className="space-y-4">
              {productName && (
                <div className="rounded-xl px-3.5 py-2.5 text-xs"
                  style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.18)", color: "#f88090" }}>
                  Produkt: <strong className="text-white">{productName}</strong>
                </div>
              )}
              <p className="text-xs text-gray-500">Jak chcesz się z nami skontaktować?</p>

              <a href="tel:+48533553344"
                className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.4)"; (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                onClick={() => { handleClose(); trackPhoneClick(); }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.22)" }}>
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Zadzwoń teraz</div>
                  <div className="text-sm font-medium text-emerald-400">+48 533 553 344</div>
                  <div className="text-[10px] text-gray-600 mt-0.5">Pon–Pt 7:00–16:00</div>
                </div>
              </a>

              <button
                className="w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.4)"; (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                onClick={() => setMode("form")}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.22)" }}>
                  <Mail className="w-5 h-5 text-[#f88090]" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Wyślij wiadomość</div>
                  <div className="text-sm font-medium text-[#f88090]">sprzedaz@mediabud.pl</div>
                  <div className="text-[10px] text-gray-600 mt-0.5">Odpowiedź w ciągu 24 godzin</div>
                </div>
              </button>
            </div>
          )}

          {/* ── Form mode ── */}
          {mode === "form" && (
            <form onSubmit={handleSubmit} className="space-y-3">
              {productName && (
                <div className="rounded-xl px-3.5 py-2.5 text-xs"
                  style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.18)", color: "#f88090" }}>
                  Produkt: <strong className="text-white">{productName}</strong>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-[10px] text-gray-500 mb-1 block">Imię i nazwisko *</Label>
                  <Input id="quote-name" name="name" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jan Kowalski"
                    className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828]"
                    style={inputStyle} />
                </div>
                <div>
                  <Label className="text-[10px] text-gray-500 mb-1 block">Telefon *</Label>
                  <Input id="quote-phone" name="phone" required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+48..."
                    className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828]"
                    style={inputStyle} />
                </div>
              </div>
              <div>
                <Label className="text-[10px] text-gray-500 mb-1 block">Email *</Label>
                <Input id="quote-email" name="email" required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="email@firma.pl"
                  className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828]"
                  style={inputStyle} />
              </div>
              <div>
                <Label className="text-[10px] text-gray-500 mb-1 block">Ilość / zakres</Label>
                <Input value={form.quantity} onChange={e => setForm(f => ({...f, quantity: e.target.value}))} placeholder="np. 100 m², 50 worków"
                  className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828]"
                  style={inputStyle} />
              </div>
              <div>
                <Label className="text-[10px] text-gray-500 mb-1 block">Opis zapotrzebowania</Label>
                <Textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Opisz swoje potrzeby..." rows={3}
                  className="text-sm text-gray-200 placeholder:text-gray-600 resize-none focus-visible:ring-0 focus-visible:border-[#f81828]"
                  style={inputStyle} />
              </div>
              <div>
                <Label className="text-[10px] text-gray-500 mb-1 block">Załącznik <span className="text-gray-700 font-normal">(opcjonalnie)</span></Label>
                <label className="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-xs transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLLabelElement).style.borderColor = "rgba(248,24,40,0.5)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLLabelElement).style.borderColor = "rgba(255,255,255,0.15)"; }}>
                  <span className="text-[#f81828]">📎</span>
                  <span className="text-gray-500">{form.file ? form.file.name : "Dodaj plik (PDF, JPG, PNG, DOCX — max 5 MB)"}</span>
                  <input type="file" className="hidden" accept={CONTACT_FILE_ACCEPT}
                    onChange={e => setForm(f => ({...f, file: e.target.files?.[0] ?? null}))} />
                </label>
                {form.file && (
                  <button type="button" onClick={() => setForm(f => ({...f, file: null}))}
                    className="text-[10px] text-gray-600 hover:text-red-400 mt-1 transition-colors">
                    ✕ usuń załącznik
                  </button>
                )}
              </div>
              <div className="flex items-start gap-2.5">
                <Checkbox id="rodo" checked={agreed} onCheckedChange={v => setAgreed(!!v)} required className="mt-0.5" />
                <Label htmlFor="rodo" className="text-[10px] text-gray-500 leading-relaxed cursor-pointer">
                  Wyrażam zgodę na przetwarzanie danych osobowych przez Media Bud zgodnie z{" "}
                  <Link to="/polityka-prywatnosci" className="text-[#f81828] underline">polityką prywatności</Link>. *
                </Label>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setMode("choose")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Wróć
                </button>
                <button type="submit" disabled={!agreed || sending}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "#f81828" }}
                  onMouseEnter={e => { if (agreed && !sending) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(248,24,40,0.4)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  <Mail className="w-3.5 h-3.5" /> {sending ? "Wysyłanie…" : "Wyślij zapytanie"}
                </button>
              </div>
            </form>
          )}

          {/* ── Sent ── */}
          {mode === "sent" && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>
                <Check className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-display text-lg font-black text-white mb-2">Dziękujemy za przesłanie zapytania!</h3>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                Twoje zapytanie zostało przyjęte. Skontaktujemy się z Tobą<br />w ciągu 24 godzin roboczych. Możesz też zadzwonić bezpośrednio.
              </p>
              <a href="tel:+48533553344"
                onClick={trackPhoneClick}
                className="inline-flex items-center gap-1.5 font-bold text-sm text-[#f81828] hover:underline mb-4 block">
                <Phone className="w-4 h-4" /> +48 533 553 344
              </a>
              <button onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-[#f81828] text-white text-sm font-bold hover:bg-[#c8000f] transition-colors">
                Zamknij
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ================================================================
   WYCENA DRAWER  – dark industrial
================================================================ */
export function WycenaDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQty, updateNote, clearWycena } = useWycena();
  const [sendOpen, setSendOpen] = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const [form, setForm]         = useState({
    name: "", email: "", phone: "", message: "",
    customerType: "Klient indywidualny",
    fulfillment: "Odbiór osobisty",
    address: "",
    preferredContact: "Telefon",
    file: null as File | null,
  });
  const [sent, setSent]         = useState(false);
  const [sending, setSending]   = useState(false);
  const [requestId, setRequestId] = useState("");

  if (!isOpen) return null;

  const handleWycenaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSending(true);
    try {
      const generatedRequestId = `MB-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      const attachments = await prepareContactAttachments(form.file ? [form.file] : []);
      const productList = items
        .map(i => `• ${i.product.name} (${i.product.brand}) × ${i.quantity}${i.note ? ` — ${i.note}` : ""}`)
        .join("\n");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `[${generatedRequestId}] Zapytanie o wycenę (${items.length} produktów)`,
          message: `Numer zapytania: ${generatedRequestId}\nTyp klienta: ${form.customerType}\nRealizacja: ${form.fulfillment}${form.fulfillment === "Dostawa na budowę" ? `\nAdres dostawy: ${form.address}` : ""}\nPreferowany kontakt: ${form.preferredContact}\n\nProdukty:\n${productList}\n\nDodatkowe informacje:\n${form.message || "—"}`,
          attachments,
        }),
      });
      if (res.ok) {
        setRequestId(generatedRequestId);
        setSent(true);
        trackFormSubmit();
        clearWycena();
      } else {
        toast.error("Nie udało się wysłać. Zadzwoń: +48 533 553 344");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nie udało się wysłać. Zadzwoń: +48 533 553 344");
    } finally {
      setSending(false);
    }
  };

  const drawerInput = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e5e7eb",
  } as const;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeDrawer}
        style={{ animation: "fadeIn 0.2s ease" }} />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-xl flex flex-col"
        style={{ background: "#0d0d0d", borderLeft: "1px solid rgba(255,255,255,0.08)", animation: "slideInRight 0.3s cubic-bezier(0.22,1,0.36,1)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-[#f81828]" />
            <span className="font-display font-black text-base text-white">Koszyk wyceny</span>
            <span className="w-5 h-5 text-[10px] font-black rounded-full flex items-center justify-center text-white"
              style={{ background: "#f81828", boxShadow: "0 0 8px rgba(248,24,40,0.5)" }}>
              {items.length}
            </span>
          </div>
          <button onClick={closeDrawer}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Package className="w-7 h-7 text-gray-600" />
              </div>
              <p className="font-bold text-gray-400 text-sm mb-1">Koszyk wyceny jest pusty</p>
              <p className="text-xs text-gray-600">Dodaj produkty klikając „Dodaj do wyceny"</p>
            </div>
          ) : (
            <>
              {!sendOpen && items.map(item => (
                <div key={item.product.id} className="rounded-xl p-3"
                  style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex gap-3">
                    {/* Thumb */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                      <img src={getProductImage(item.product)} alt={item.product.name}
                        className="w-full h-full object-cover" style={{ filter: "brightness(0.85)" }} onError={e => { (e.target as HTMLImageElement).src = PRODUCT_PLACEHOLDER; }} />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-200 leading-snug line-clamp-2 font-display">
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-gray-600 mt-0.5">{item.product.brand} · {item.product.unit}</p>

                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <button onClick={() => updateQty(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md text-sm font-bold text-gray-400 hover:text-[#f81828] hover:border-[#f81828]/40 transition-colors"
                          style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                          −
                        </button>
                        <span className="text-xs font-bold text-white w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md text-sm font-bold text-gray-400 hover:text-[#f81828] hover:border-[#f81828]/40 transition-colors"
                          style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                          +
                        </button>
                        <button onClick={() => removeItem(item.product.id)}
                          className="ml-auto flex items-center gap-1 text-[10px] text-gray-600 hover:text-[#f81828] transition-colors">
                          <Trash2 className="w-3 h-3" /> Usuń
                        </button>
                      </div>

                      {/* Note input */}
                      <input
                        value={item.note}
                        onChange={e => updateNote(item.product.id, e.target.value)}
                        placeholder="Uwaga do produktu..."
                        className="mt-2 w-full text-[10px] px-2.5 py-1.5 rounded-lg text-gray-400 placeholder:text-gray-700 outline-none focus:border-[#f81828]/50 transition-colors"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Send form */}
              {sendOpen && !sent && (
                <form onSubmit={handleWycenaSubmit} className="space-y-3">
                  <div className="rounded-xl px-3.5 py-2.5 text-xs"
                    style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.18)", color: "#f88090" }}>
                    {items.length} produkt(ów) w koszyku wyceny
                  </div>
                  <fieldset>
                    <legend className="text-[10px] text-gray-500 mb-1.5">Sposób realizacji *</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {["Odbiór osobisty", "Dostawa na budowę"].map(option => (
                        <button key={option} type="button" onClick={() => setForm(f => ({ ...f, fulfillment: option }))}
                          aria-pressed={form.fulfillment === option}
                          className="rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors"
                          style={{
                            background: form.fulfillment === option ? "rgba(248,24,40,0.12)" : "rgba(255,255,255,0.04)",
                            border: `1px solid ${form.fulfillment === option ? "rgba(248,24,40,0.55)" : "rgba(255,255,255,0.1)"}`,
                            color: form.fulfillment === option ? "#fff" : "#9ca3af",
                          }}>
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  {form.fulfillment === "Dostawa na budowę" && (
                    <div>
                      <Label className="text-[10px] text-gray-500 mb-1 block">Adres dostawy *</Label>
                      <Input required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                        placeholder="Ulica, kod pocztowy, miejscowość"
                        className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] mt-1"
                        style={drawerInput} />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="drawer-customer-type" className="text-[10px] text-gray-500 mb-1 block">Kupuję jako</Label>
                      <select id="drawer-customer-type" value={form.customerType} onChange={e => setForm(f => ({ ...f, customerType: e.target.value }))}
                        className="w-full h-9 rounded-md px-3 text-xs outline-none focus:border-[#f81828]" style={drawerInput}>
                        <option>Klient indywidualny</option>
                        <option>Firma / wykonawca</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="drawer-contact-method" className="text-[10px] text-gray-500 mb-1 block">Preferowany kontakt</Label>
                      <select id="drawer-contact-method" value={form.preferredContact} onChange={e => setForm(f => ({ ...f, preferredContact: e.target.value }))}
                        className="w-full h-9 rounded-md px-3 text-xs outline-none focus:border-[#f81828]" style={drawerInput}>
                        <option>Telefon</option>
                        <option>Email</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-[10px] text-gray-500 mb-1 block">Imię i nazwisko *</Label>
                    <Input id="drawer-name" name="name" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jan Kowalski"
                      className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] mt-1"
                      style={drawerInput} />
                  </div>
                  <div>
                    <Label className="text-[10px] text-gray-500 mb-1 block">Email *</Label>
                    <Input id="drawer-email" name="email" required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                      className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] mt-1"
                      style={drawerInput} />
                  </div>
                  <div>
                    <Label className="text-[10px] text-gray-500 mb-1 block">Telefon *</Label>
                    <Input id="drawer-phone" name="phone" required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+48..."
                      className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] mt-1"
                      style={drawerInput} />
                  </div>
                  <div>
                    <Label className="text-[10px] text-gray-500 mb-1 block">Dodatkowe informacje</Label>
                    <Textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} rows={3}
                      className="text-sm text-gray-200 placeholder:text-gray-600 resize-none focus-visible:ring-0 focus-visible:border-[#f81828] mt-1"
                      style={drawerInput} />
                  </div>
                  <div>
                    <Label className="text-[10px] text-gray-500 mb-1 block">Projekt lub zestawienie <span className="text-gray-700 font-normal">(opcjonalnie)</span></Label>
                    <label className="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-xs"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)" }}>
                      <span className="text-[#f81828]">📎</span>
                      <span className="text-gray-500 truncate">{form.file ? form.file.name : "PDF, zdjęcie lub dokument — maks. 5 MB"}</span>
                      <input type="file" className="hidden" accept={CONTACT_FILE_ACCEPT}
                        onChange={e => setForm(f => ({ ...f, file: e.target.files?.[0] ?? null }))} />
                    </label>
                    {form.file && (
                      <button type="button" onClick={() => setForm(f => ({ ...f, file: null }))}
                        className="text-[10px] text-gray-600 hover:text-red-400 mt-1">✕ usuń załącznik</button>
                    )}
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Checkbox id="rodo2" checked={agreed} onCheckedChange={v => setAgreed(!!v)} className="mt-0.5" />
                    <Label htmlFor="rodo2" className="text-[10px] text-gray-500 leading-relaxed cursor-pointer">
                      Wyrażam zgodę na przetwarzanie danych osobowych przez Media Bud. *
                    </Label>
                  </div>
                  <button type="submit" disabled={!agreed || sending}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "#f81828" }}
                    onMouseEnter={e => { if (agreed && !sending) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(248,24,40,0.4)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                    <Mail className="w-4 h-4" /> {sending ? "Wysyłanie…" : "Wyślij wycenę"}
                  </button>
                  <button type="button" onClick={() => setSendOpen(false)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-white transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                    <ArrowLeft className="w-3.5 h-3.5" /> Wróć do koszyka
                  </button>
                </form>
              )}

              {/* Sent */}
              {sent && (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>
                    <Check className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="font-display font-black text-white mb-2">Dziękujemy za przesłanie zapytania!</h3>
                  <p className="text-xs text-gray-500 mb-2">Twoje zapytanie zostało przyjęte. Odpowiemy w ciągu 24 godzin roboczych.</p>
                  <p className="text-xs text-gray-400 mb-4">Numer zapytania: <strong className="text-white">{requestId}</strong></p>
                  <a href="tel:+48533553344"
                    onClick={trackPhoneClick}
                    className="block font-bold text-sm text-[#f81828] hover:underline">
                    <Phone className="w-4 h-4 inline mr-1" />+48 533 553 344
                  </a>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !sendOpen && !sent && (
          <div className="p-4 space-y-2 flex-shrink-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#080808" }}>
            <button onClick={() => setSendOpen(true)}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: "#f81828" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(248,24,40,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
              <Mail className="w-4 h-4" /> Wyślij zapytanie ({items.length} prod.)
            </button>
            <div className="flex gap-2">
              <a href="tel:+48533553344"
                onClick={trackPhoneClick}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <Phone className="w-3.5 h-3.5" /> Zadzwoń
              </a>
              <button onClick={clearWycena}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-gray-600 hover:text-[#f81828] hover:border-[#f81828]/30 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <Trash2 className="w-3.5 h-3.5" /> Wyczyść
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
