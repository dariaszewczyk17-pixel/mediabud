import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Phone, Mail, Plus, Check } from "lucide-react";
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

// ─── ProductCard ──────────────────────────────────────────────────
interface ProductCardProps {
  product: Product;
  showBrand?: boolean;
}

export function ProductCard({ product, showBrand = true }: ProductCardProps) {
  const { addItem } = useWycena();
  const [added, setAdded] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const handleAddToWycena = () => {
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} dodano do wyceny`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200">
        <Link to={`/produkt/${product.slug}`} className="block overflow-hidden aspect-square bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
        <div className="p-4">
          {showBrand && (
            <div className="flex items-center justify-between mb-1">
              <Badge variant="secondary" className="text-xs">{product.brand}</Badge>
              {product.isNew && <Badge className="bg-green-500 text-white text-xs">Nowość</Badge>}
              {product.isFeatured && <Badge className="bg-primary text-white text-xs">Polecany</Badge>}
            </div>
          )}
          <Link to={`/produkt/${product.slug}`} className="block">
            <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1 hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
          </Link>
          <p className="text-xs text-gray-500 mb-1">SKU: {product.sku} · {product.unit}</p>
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.shortDescription}</p>
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-red-700 text-white text-xs"
              onClick={() => setQuoteOpen(true)}
            >
              <Mail className="w-3 h-3 mr-1" /> Zapytaj o ofertę
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={`w-full text-xs border-primary text-primary hover:bg-primary hover:text-white transition-all ${added ? "bg-green-50 border-green-500 text-green-700" : ""}`}
              onClick={handleAddToWycena}
            >
              {added ? <><Check className="w-3 h-3 mr-1 text-green-600" /> Dodano!</> : <><ShoppingCart className="w-3 h-3 mr-1" /> Dodaj do wyceny</>}
            </Button>
          </div>
        </div>
      </div>
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} productName={product.name} />
    </>
  );
}

// ─── QuoteModal ───────────────────────────────────────────────────
interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
}

export function QuoteModal({ open, onClose, productName }: QuoteModalProps) {
  const [mode, setMode] = useState<"choose" | "form" | "sent">("choose");
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", quantity: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMode("sent");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {mode === "choose" ? "Zapytaj o ofertę" : mode === "form" ? "Wyślij zapytanie" : "Dziękujemy!"}
          </DialogTitle>
        </DialogHeader>
        {mode === "choose" && (
          <div className="space-y-4">
            {productName && <p className="text-sm text-gray-600 bg-gray-50 rounded p-3 border">Produkt: <strong>{productName}</strong></p>}
            <p className="text-sm text-gray-600">Wybierz sposób kontaktu:</p>
            <a href="tel:+48509567213" className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group" onClick={onClose}>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors">
                <Phone className="w-5 h-5 text-green-600 group-hover:text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Zadzwoń teraz</div>
                <div className="text-sm text-green-600">+48 509 567 213</div>
                <div className="text-xs text-gray-500">Pon–Pt 7:00–17:00, Sob 8:00–14:00</div>
              </div>
            </a>
            <button className="w-full flex items-center gap-3 p-4 border-2 border-blue-200 rounded-lg hover:border-primary hover:bg-red-50 transition-all group text-left" onClick={() => setMode("form")}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <Mail className="w-5 h-5 text-blue-600 group-hover:text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Wyślij wiadomość</div>
                <div className="text-sm text-blue-600">sprzedaz@mediabud.pl</div>
                <div className="text-xs text-gray-500">Odpowiedź w ciągu 24 godzin</div>
              </div>
            </button>
          </div>
        )}
        {mode === "form" && (
          <form onSubmit={handleSubmit} className="space-y-3">
            {productName && <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 border">Produkt: <strong>{productName}</strong></div>}
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs mb-1">Imię i nazwisko *</Label><Input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jan Kowalski" className="text-sm" /></div>
              <div><Label className="text-xs mb-1">Telefon *</Label><Input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+48..." className="text-sm" /></div>
            </div>
            <div><Label className="text-xs mb-1">Email *</Label><Input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="email@..." className="text-sm" /></div>
            <div><Label className="text-xs mb-1">Ilość / zakres</Label><Input value={form.quantity} onChange={e => setForm(f => ({...f, quantity: e.target.value}))} placeholder="np. 100 m², 50 worków" className="text-sm" /></div>
            <div><Label className="text-xs mb-1">Dodatkowe informacje</Label><Textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Opisz swoje potrzeby..." rows={3} className="text-sm resize-none" /></div>
            <div className="flex items-start gap-2">
              <Checkbox id="rodo" checked={agreed} onCheckedChange={v => setAgreed(!!v)} required />
              <Label htmlFor="rodo" className="text-xs text-gray-500 leading-relaxed">Wyrażam zgodę na przetwarzanie danych osobowych przez Media Bud Sp. z o.o. w celu obsługi zapytania ofertowego zgodnie z <Link to="/polityka-prywatnosci" className="text-primary underline">polityką prywatności</Link>. *</Label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setMode("choose")}>Wróć</Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-red-700" disabled={!agreed}>Wyślij zapytanie</Button>
            </div>
          </form>
        )}
        {mode === "sent" && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Zapytanie wysłane!</h3>
            <p className="text-sm text-gray-600 mb-4">Odpowiemy na Twoje zapytanie w ciągu 24 godzin roboczych. Możesz też zadzwonić bezpośrednio.</p>
            <a href="tel:+48509567213" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
              <Phone className="w-4 h-4" /> +48 509 567 213
            </a>
            <Button className="w-full mt-4 bg-primary" onClick={onClose}>Zamknij</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── WycenaDrawer ─────────────────────────────────────────────────
export function WycenaDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQty, updateNote, clearWycena } = useWycena();
  const [sendOpen, setSendOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50" onClick={closeDrawer} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-white">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-bold text-lg">Koszyk wyceny</span>
            <Badge className="bg-white text-primary font-bold">{items.length}</Badge>
          </div>
          <button onClick={closeDrawer} className="hover:bg-red-700 rounded p-1 transition-colors"><Plus className="w-5 h-5 rotate-45" /></button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">Koszyk wyceny jest pusty</p>
              <p className="text-sm">Dodaj produkty klikając „Dodaj do wyceny"</p>
            </div>
          ) : (
            <>
              {!sendOpen && items.map(item => (
                <div key={item.product.id} className="bg-gray-50 rounded-lg p-3 border">
                  <div className="flex gap-3">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.product.brand} · {item.product.unit}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-200 text-gray-600 font-bold text-sm">-</button>
                        <span className="text-sm font-bold w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-200 text-gray-600 font-bold text-sm">+</button>
                        <button onClick={() => removeItem(item.product.id)} className="ml-auto text-xs text-red-500 hover:text-red-700 hover:underline">Usuń</button>
                      </div>
                      <Input
                        value={item.note}
                        onChange={e => updateNote(item.product.id, e.target.value)}
                        placeholder="Uwaga do produktu..."
                        className="mt-2 text-xs h-7"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {sendOpen && !sent && (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-3">
                  <h3 className="font-bold text-gray-900">Wyślij zapytanie o wycenę</h3>
                  <p className="text-xs text-gray-500">Masz {items.length} produkt(ów) w koszyku wyceny</p>
                  <div><Label className="text-xs">Imię i nazwisko *</Label><Input required value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} placeholder="Jan Kowalski" className="text-sm mt-1" /></div>
                  <div><Label className="text-xs">Email *</Label><Input required type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} className="text-sm mt-1" /></div>
                  <div><Label className="text-xs">Telefon *</Label><Input required value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} placeholder="+48..." className="text-sm mt-1" /></div>
                  <div><Label className="text-xs">Dodatkowe informacje</Label><Textarea value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} rows={3} className="text-sm mt-1 resize-none" /></div>
                  <div className="flex items-start gap-2">
                    <Checkbox id="rodo2" checked={agreed} onCheckedChange={v => setAgreed(!!v)} />
                    <Label htmlFor="rodo2" className="text-xs text-gray-500">Zgoda na przetwarzanie danych osobowych *</Label>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-red-700" disabled={!agreed}>Wyślij wycenę</Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => setSendOpen(false)}>Wróć</Button>
                </form>
              )}
              {sent && (
                <div className="text-center py-8">
                  <Check className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Zapytanie wysłane!</h3>
                  <p className="text-sm text-gray-600">Odpowiemy w ciągu 24h roboczych.</p>
                  <a href="tel:+48509567213" className="block mt-3 text-primary font-bold hover:underline">+48 509 567 213</a>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !sendOpen && !sent && (
          <div className="p-4 border-t space-y-2 bg-white">
            <Button className="w-full bg-primary hover:bg-red-700 font-bold" onClick={() => setSendOpen(true)}>
              <Mail className="w-4 h-4 mr-2" /> Wyślij zapytanie o wycenę ({items.length} prod.)
            </Button>
            <div className="flex gap-2">
              <a href="tel:+48509567213" className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                <Phone className="w-3 h-3" /> Zadzwoń
              </a>
              <button onClick={clearWycena} className="flex-1 text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-300 rounded-md py-2 transition-colors">Wyczyść</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
