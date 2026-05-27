import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Phone, Mail, Plus, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useWycena } from "@/hooks/useWycena";
import type { Product } from "@/data/products";
import { toast } from "sonner";

/* ================================================================
   PRODUCT CARD
================================================================ */
interface ProductCardProps {
  product: Product;
  showBrand?: boolean;
}

export function ProductCard({ product, showBrand = true }: ProductCardProps) {
  const { addItem } = useWycena();
  const [added, setAdded] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* 3D tilt on mouse move */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
    el.style.boxShadow = "0 14px 40px rgba(248,24,40,0.13), 0 4px 16px rgba(0,0,0,0.10)";
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.07)";
  };

  const handleAddToWycena = () => {
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} dodano do wyceny`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer"
        style={{
          transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease",
          boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
          willChange: "transform",
        }}
      >
        {/* Image area */}
        <Link to={`/produkt/${product.slug}`} className="block relative overflow-hidden aspect-square bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            style={{ transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
          />
          {/* Shine overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
              transform: "translateX(-100%)",
              transition: "transform 0.55s ease",
            }}
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges on image */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full shadow">
                NOWOŚĆ
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2 py-0.5 bg-[#f81828] text-white text-[10px] font-bold rounded-full shadow">
                POLECANY
              </span>
            )}
          </div>

          {/* Quick view button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="glass text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <ExternalLink className="w-3 h-3" /> Szczegóły
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          {showBrand && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400">{product.brand}</span>
              <span className="text-[10px] font-mono text-gray-300">{product.sku}</span>
            </div>
          )}

          <Link to={`/produkt/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-[#f81828] transition-colors duration-200 line-clamp-2 font-display">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-400 mb-1 font-medium">{product.unit}</p>
          <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{product.shortDescription}</p>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              className="w-full h-9 bg-[#f81828] hover:bg-[#c8000f] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors duration-200"
              onClick={() => setQuoteOpen(true)}
            >
              <Mail className="w-3.5 h-3.5" /> Zapytaj o ofertę
            </button>
            <button
              className={`w-full h-8 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 border transition-all duration-200 ${
                added
                  ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                  : "border-gray-200 text-gray-600 hover:border-[#f81828] hover:text-[#f81828] hover:bg-[#fff0f0]"
              }`}
              onClick={handleAddToWycena}
            >
              {added ? (
                <><Check className="w-3.5 h-3.5" /> Dodano do wyceny!</>
              ) : (
                <><ShoppingCart className="w-3.5 h-3.5" /> Dodaj do wyceny</>
              )}
            </button>
          </div>
        </div>
      </div>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} productName={product.name} />
    </>
  );
}

/* ================================================================
   QUOTE MODAL
================================================================ */
interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
}

export function QuoteModal({ open, onClose, productName }: QuoteModalProps) {
  const [mode, setMode] = useState<"choose" | "form" | "sent">("choose");
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", quantity: "", message: "" });

  const handleClose = () => {
    onClose();
    setTimeout(() => { setMode("choose"); setAgreed(false); }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMode("sent");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-black font-display">
            {mode === "choose" ? "Zapytaj o ofertę" : mode === "form" ? "Wyślij zapytanie" : "Dziękujemy! 🎉"}
          </DialogTitle>
        </DialogHeader>

        {/* ── Choose mode ── */}
        {mode === "choose" && (
          <div className="space-y-4">
            {productName && (
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-sm text-gray-600">
                Produkt: <strong className="text-gray-900">{productName}</strong>
              </div>
            )}
            <p className="text-sm text-gray-500">Jak chcesz się z nami skontaktować?</p>

            <a
              href="tel:+48509567213"
              className="flex items-center gap-4 p-4 border-2 border-emerald-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
              onClick={handleClose}
            >
              <div className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition-colors flex-shrink-0">
                <Phone className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Zadzwoń teraz</div>
                <div className="text-sm text-emerald-600 font-medium">+48 509 567 213</div>
                <div className="text-xs text-gray-400 mt-0.5">Pon–Pt 7:00–17:00 · Sob 8:00–14:00</div>
              </div>
            </a>

            <button
              className="w-full flex items-center gap-4 p-4 border-2 border-blue-200 rounded-xl hover:border-[#f81828] hover:bg-[#fff8f8] transition-all group text-left"
              onClick={() => setMode("form")}
            >
              <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-[#f81828] transition-colors flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Wyślij wiadomość</div>
                <div className="text-sm text-blue-600 font-medium">sprzedaz@mediabud.pl</div>
                <div className="text-xs text-gray-400 mt-0.5">Odpowiedź w ciągu 24 godzin</div>
              </div>
            </button>
          </div>
        )}

        {/* ── Form mode ── */}
        {mode === "form" && (
          <form onSubmit={handleSubmit} className="space-y-3">
            {productName && (
              <div className="bg-gray-50 rounded-xl p-2.5 text-xs text-gray-600 border border-gray-100">
                Produkt: <strong>{productName}</strong>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold text-gray-600 mb-1">Imię i nazwisko *</Label>
                <Input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jan Kowalski" className="text-sm" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-600 mb-1">Telefon *</Label>
                <Input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+48..." className="text-sm" />
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1">Email *</Label>
              <Input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="email@firma.pl" className="text-sm" />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1">Ilość / zakres</Label>
              <Input value={form.quantity} onChange={e => setForm(f => ({...f, quantity: e.target.value}))} placeholder="np. 100 m², 50 worków" className="text-sm" />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600 mb-1">Opis zapotrzebowania</Label>
              <Textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Opisz swoje potrzeby..." rows={3} className="text-sm resize-none" />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="rodo" checked={agreed} onCheckedChange={v => setAgreed(!!v)} required />
              <Label htmlFor="rodo" className="text-xs text-gray-400 leading-relaxed">
                Wyrażam zgodę na przetwarzanie danych osobowych przez Media Bud Sp. z o.o. zgodnie z{" "}
                <Link to="/polityka-prywatnosci" className="text-[#f81828] underline">polityką prywatności</Link>. *
              </Label>
            </div>
            <div className="flex gap-2 pt-1">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setMode("choose")}>← Wróć</Button>
              <Button type="submit" className="flex-1 bg-[#f81828] hover:bg-[#c8000f]" disabled={!agreed}>Wyślij zapytanie</Button>
            </div>
          </form>
        )}

        {/* ── Sent confirmation ── */}
        {mode === "sent" && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="font-display text-lg font-black text-gray-900 mb-2">Zapytanie wysłane!</h3>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Odpowiemy na Twoje zapytanie w ciągu 24 godzin roboczych. Możesz też zadzwonić bezpośrednio.
            </p>
            <a href="tel:+48509567213" className="inline-flex items-center gap-2 text-[#f81828] font-bold hover:underline text-sm">
              <Phone className="w-4 h-4" /> +48 509 567 213
            </a>
            <Button className="w-full mt-4 bg-[#f81828] hover:bg-[#c8000f]" onClick={handleClose}>Zamknij</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ================================================================
   WYCENA DRAWER
================================================================ */
export function WycenaDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQty, updateNote, clearWycena } = useWycena();
  const [sendOpen, setSendOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeDrawer}
        style={{ animation: "fadeIn 0.2s ease" }}
      />

      {/* Panel */}
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
        style={{ animation: "slideInRight 0.3s cubic-bezier(0.22,1,0.36,1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#0a0a0a] text-white flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-[#f81828]" />
            <span className="font-display font-black text-base">Koszyk wyceny</span>
            <span className="w-5 h-5 bg-[#f81828] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {items.length}
            </span>
          </div>
          <button onClick={closeDrawer} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <Plus className="w-5 h-5 rotate-45" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-200" />
              <p className="font-bold text-gray-600 mb-1">Koszyk wyceny jest pusty</p>
              <p className="text-sm">Dodaj produkty klikając „Dodaj do wyceny"</p>
            </div>
          ) : (
            <>
              {!sendOpen && items.map((item) => (
                <div key={item.product.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-gray-100">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 font-display">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.product.brand} · {item.product.unit}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:border-[#f81828] hover:text-[#f81828] text-gray-600 font-bold text-sm transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:border-[#f81828] hover:text-[#f81828] text-gray-600 font-bold text-sm transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
                        >
                          Usuń
                        </button>
                      </div>
                      <Input
                        value={item.note}
                        onChange={(e) => updateNote(item.product.id, e.target.value)}
                        placeholder="Uwaga do produktu..."
                        className="mt-2 text-xs h-7"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Send form */}
              {sendOpen && !sent && (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
                  <div className="bg-[#fff0f0] border border-[#f81828]/20 rounded-xl p-3 text-sm text-[#f81828] font-medium">
                    Masz {items.length} produkt(ów) w koszyku wyceny
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Imię i nazwisko *</Label>
                    <Input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jan Kowalski" className="text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Email *</Label>
                    <Input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className="text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Telefon *</Label>
                    <Input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+48..." className="text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Dodatkowe informacje</Label>
                    <Textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} rows={3} className="text-sm mt-1 resize-none" />
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox id="rodo2" checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} />
                    <Label htmlFor="rodo2" className="text-xs text-gray-400">Zgoda na przetwarzanie danych osobowych *</Label>
                  </div>
                  <Button type="submit" className="w-full bg-[#f81828] hover:bg-[#c8000f] font-bold" disabled={!agreed}>
                    <Mail className="w-4 h-4 mr-2" /> Wyślij wycenę
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => setSendOpen(false)}>
                    ← Wróć do koszyka
                  </Button>
                </form>
              )}

              {/* Sent confirmation */}
              {sent && (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h3 className="font-display font-black text-gray-900 mb-2">Zapytanie wysłane!</h3>
                  <p className="text-sm text-gray-500 mb-3">Odpowiemy w ciągu 24h roboczych.</p>
                  <a href="tel:+48509567213" className="block text-[#f81828] font-bold hover:underline text-sm">
                    +48 509 567 213
                  </a>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && !sendOpen && !sent && (
          <div className="p-4 border-t space-y-2 bg-white flex-shrink-0">
            <Button
              className="w-full bg-[#f81828] hover:bg-[#c8000f] font-bold h-11"
              onClick={() => setSendOpen(true)}
            >
              <Mail className="w-4 h-4 mr-2" /> Wyślij zapytanie ({items.length} prod.)
            </Button>
            <div className="flex gap-2">
              <a
                href="tel:+48509567213"
                className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-sm font-semibold hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Zadzwoń
              </a>
              <button
                onClick={clearWycena}
                className="flex-1 text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 rounded-lg py-2 transition-colors"
              >
                Wyczyść
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
