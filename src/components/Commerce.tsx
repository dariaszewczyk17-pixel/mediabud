import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Phone, Mail, Plus, Check, ExternalLink, X, ArrowLeft, Trash2, Package, ShieldCheck, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useWycena } from "@/hooks/useWycena";
import type { Product } from "@/data/products";
import { toast } from "sonner";

const PRODUCT_PLACEHOLDER = "/placeholder.svg";

const getProductImage = (product: Pick<Product, "images">) => product.images?.[0] || PRODUCT_PLACEHOLDER;

/* ================================================================
   PRODUCT CARD  – dark industrial
================================================================ */
interface ProductCardProps {
  product: Product;
  showBrand?: boolean;
}

export function ProductCard({ product, showBrand = true }: ProductCardProps) {
  const { addItem } = useWycena();
  const [added, setAdded]     = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mainImage = getProductImage(product);
  const topSpecs = product.technicalSpec.slice(0, 2);
  const topTags = product.tags.slice(0, 3);

  /* 3-D tilt */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform  = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
    el.style.boxShadow  = "0 16px 48px rgba(248,24,40,0.18), 0 4px 16px rgba(0,0,0,0.5)";
    el.style.borderColor = "rgba(248,24,40,0.35)";
  };
  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform  = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    el.style.boxShadow  = "0 2px 12px rgba(0,0,0,0.4)";
    el.style.borderColor = "rgba(255,255,255,0.07)";
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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer rounded-xl overflow-hidden"
        style={{
          background: "#0f0f0f",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
          transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease, border-color 0.25s ease",
          willChange: "transform",
        }}
      >
        {/* ── Image area ── */}
        <Link to={`/produkt/${product.slug}`} className="block relative overflow-hidden aspect-square"
          style={{ background: "#141414" }}>
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            style={{ filter: "brightness(0.88)" }}
            onError={e => { (e.target as HTMLImageElement).src = PRODUCT_PLACEHOLDER; }}
          />

          {/* Vignette overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.12) 58%, transparent 100%)" }} />

          {/* Top accent line on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f81828] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: "0 0 8px rgba(248,24,40,0.6)" }} />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.isNew && (
              <span className="px-2 py-0.5 text-[9px] font-black rounded-full text-white tracking-wider"
                style={{ background: "#10b981", boxShadow: "0 0 8px rgba(16,185,129,0.5)" }}>
                NOWOŚĆ
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2 py-0.5 text-[9px] font-black rounded-full text-white tracking-wider"
                style={{ background: "#f81828", boxShadow: "0 0 8px rgba(248,24,40,0.5)" }}>
                POLECANY
              </span>
            )}
          </div>

          <div className="absolute left-2.5 right-2.5 bottom-2.5 rounded-xl p-2.5"
            style={{ background: "rgba(8,8,8,0.72)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
            <div className="flex items-center justify-between gap-2 text-[10px] text-gray-300">
              <span className="inline-flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> Oferta B2B</span>
              <span className="text-gray-400 font-medium">{product.unit}</span>
            </div>
            {topSpecs.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {topSpecs.map((spec) => (
                  <div key={spec.label} className="rounded-lg px-2 py-1.5" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="text-[9px] uppercase tracking-wide text-gray-500">{spec.label}</div>
                    <div className="text-[10px] font-semibold text-gray-100 line-clamp-1">{spec.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick view pill */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white"
              style={{ background: "rgba(248,24,40,0.82)", backdropFilter: "blur(8px)", border: "1px solid rgba(248,24,40,0.4)", boxShadow: "0 0 16px rgba(248,24,40,0.4)" }}>
              <ExternalLink className="w-3 h-3" /> Szczegóły
            </span>
          </div>
        </Link>

        {/* ── Content ── */}
        <div className="p-4">
          {showBrand && product.brand && /^[A-Za-zÀ-ÿĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(product.brand) && (
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-[9px] font-black tracking-widest uppercase text-[#f81828]">{product.brand}</span>
              <span className="text-[9px] font-mono text-gray-500 truncate">{product.sku}</span>
            </div>
          )}

          <Link to={`/produkt/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-gray-200 leading-snug mb-2 group-hover:text-[#f88090] transition-colors line-clamp-2 font-display min-h-[2.7rem]">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-gray-400 mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">{product.shortDescription}</p>

          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium text-gray-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Layers3 className="w-3 h-3 text-[#f81828]" /> {product.categorySlug.replace(/-/g, " ")}
            </span>
            {topTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2 py-1 text-[10px] text-gray-400"
                style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.14)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {product.advantages && product.advantages.length > 0 && (
            <div className="mb-4 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-2">Najważniejsze atuty</div>
              <ul className="space-y-1.5">
                {product.advantages.slice(0, 2).map((advantage) => (
                  <li key={advantage} className="flex items-start gap-2 text-[11px] text-gray-300 leading-relaxed">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#f81828] flex-shrink-0" />
                    <span className="line-clamp-2">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              className="w-full h-9 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200"
              style={{ background: "#f81828" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(248,24,40,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              onClick={() => setQuoteOpen(true)}
            >
              <Mail className="w-3.5 h-3.5" /> Zapytaj o ofertę
            </button>

            <button
              className="w-full h-8 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200"
              style={added
                ? { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.35)", color: "#4ade80" }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af" }}
              onMouseEnter={e => { if (!added) { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.4)"; (e.currentTarget as HTMLElement).style.color = "#f81828"; (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.07)"; } }}
              onMouseLeave={e => { if (!added) { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "#9ca3af"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; } }}
              onClick={handleAdd}
            >
              {added
                ? <><Check className="w-3.5 h-3.5" /> Dodano!</>
                : <><ShoppingCart className="w-3.5 h-3.5" /> Dodaj do wyceny</>}
            </button>
          </div>
        </div>
      </div>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} productName={product.name} />
    </>
  );
}

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
  const [form, setForm]     = useState({ name: "", email: "", phone: "", quantity: "", message: "" });

  const handleClose = () => {
    onClose();
    setTimeout(() => { setMode("choose"); setAgreed(false); }, 300);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e5e7eb",
  } as const;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden gap-0"
        style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.09)" }}>

        {/* Modal header */}
        <div className="relative px-6 pt-6 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
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

        <div className="px-6 py-5">

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

              <a href="tel:+48509567213"
                className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.4)"; (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                onClick={handleClose}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.22)" }}>
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Zadzwoń teraz</div>
                  <div className="text-sm font-medium text-emerald-400">+48 509 567 213</div>
                  <div className="text-[10px] text-gray-600 mt-0.5">Pon–Pt 7:00–17:00 · Sob 8:00–14:00</div>
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
            <form onSubmit={e => { e.preventDefault(); setMode("sent"); }} className="space-y-3">
              {productName && (
                <div className="rounded-xl px-3.5 py-2.5 text-xs"
                  style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.18)", color: "#f88090" }}>
                  Produkt: <strong className="text-white">{productName}</strong>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[10px] text-gray-500 mb-1 block">Imię i nazwisko *</Label>
                  <Input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jan Kowalski"
                    className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828]"
                    style={inputStyle} />
                </div>
                <div>
                  <Label className="text-[10px] text-gray-500 mb-1 block">Telefon *</Label>
                  <Input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+48..."
                    className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828]"
                    style={inputStyle} />
                </div>
              </div>
              <div>
                <Label className="text-[10px] text-gray-500 mb-1 block">Email *</Label>
                <Input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="email@firma.pl"
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
                <button type="submit" disabled={!agreed}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "#f81828" }}
                  onMouseEnter={e => { if (agreed) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(248,24,40,0.4)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  <Mail className="w-3.5 h-3.5" /> Wyślij zapytanie
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
              <h3 className="font-display text-lg font-black text-white mb-2">Zapytanie wysłane!</h3>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                Odpowiemy w ciągu 24 godzin roboczych.<br />Możesz też zadzwonić bezpośrednio.
              </p>
              <a href="tel:+48509567213"
                className="inline-flex items-center gap-1.5 font-bold text-sm text-[#f81828] hover:underline mb-4 block">
                <Phone className="w-4 h-4" /> +48 509 567 213
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
  const [form, setForm]         = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent]         = useState(false);

  if (!isOpen) return null;

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
      <div className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col"
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
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-3">
                  <div className="rounded-xl px-3.5 py-2.5 text-xs"
                    style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.18)", color: "#f88090" }}>
                    {items.length} produkt(ów) w koszyku wyceny
                  </div>
                  <div>
                    <Label className="text-[10px] text-gray-500 mb-1 block">Imię i nazwisko *</Label>
                    <Input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jan Kowalski"
                      className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] mt-1"
                      style={drawerInput} />
                  </div>
                  <div>
                    <Label className="text-[10px] text-gray-500 mb-1 block">Email *</Label>
                    <Input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                      className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] mt-1"
                      style={drawerInput} />
                  </div>
                  <div>
                    <Label className="text-[10px] text-gray-500 mb-1 block">Telefon *</Label>
                    <Input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+48..."
                      className="text-sm h-9 text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] mt-1"
                      style={drawerInput} />
                  </div>
                  <div>
                    <Label className="text-[10px] text-gray-500 mb-1 block">Dodatkowe informacje</Label>
                    <Textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} rows={3}
                      className="text-sm text-gray-200 placeholder:text-gray-600 resize-none focus-visible:ring-0 focus-visible:border-[#f81828] mt-1"
                      style={drawerInput} />
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Checkbox id="rodo2" checked={agreed} onCheckedChange={v => setAgreed(!!v)} className="mt-0.5" />
                    <Label htmlFor="rodo2" className="text-[10px] text-gray-500 leading-relaxed cursor-pointer">
                      Wyrażam zgodę na przetwarzanie danych osobowych przez Media Bud. *
                    </Label>
                  </div>
                  <button type="submit" disabled={!agreed}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "#f81828" }}
                    onMouseEnter={e => { if (agreed) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(248,24,40,0.4)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                    <Mail className="w-4 h-4" /> Wyślij wycenę
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
                  <h3 className="font-display font-black text-white mb-2">Zapytanie wysłane!</h3>
                  <p className="text-xs text-gray-500 mb-4">Odpowiemy w ciągu 24h roboczych.</p>
                  <a href="tel:+48509567213"
                    className="block font-bold text-sm text-[#f81828] hover:underline">
                    <Phone className="w-4 h-4 inline mr-1" />+48 509 567 213
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
              <a href="tel:+48509567213"
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
