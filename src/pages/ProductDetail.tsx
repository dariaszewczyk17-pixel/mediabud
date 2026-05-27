import { useParams, Link } from "react-router-dom";
import { ChevronRight, ShoppingCart, Phone, Mail, Check, ChevronDown, Star, Truck, ShieldCheck, Clock } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { getCategoryBySlug, getBreadcrumbs } from "@/data/categories";
import { ProductCard, QuoteModal } from "@/components/Commerce";
import { useWycena } from "@/hooks/useWycena";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const TABS = ["Opis", "Specyfikacja", "Zastosowanie", "FAQ"] as const;
type Tab = typeof TABS[number];

const FAQ_GENERIC = [
  { q: "Jak zamówić produkt?", a: "Dodaj do wyceny lub zadzwoń na +48 509 567 213. Możesz też napisać przez formularz kontaktowy. Przygotujemy indywidualną ofertę z terminem dostawy." },
  { q: "Czy dostawa na plac budowy jest możliwa?", a: "Tak – dowozimy na terenie Lublina i województwa lubelskiego. Transport ciężarowy z rozładunkiem przy budynku. Termin dostawy ustalamy telefonicznie." },
  { q: "Czy możliwy jest zakup na fakturę VAT?", a: "Oczywiście. Sprzedajemy zarówno osobom prywatnym (paragon), jak i firmom (FV). Dane do faktury podaj przy zamówieniu." },
  { q: "Ile produktów mam zamówić? Jak obliczyć zużycie?", a: "W karcie technicznej i opisie podajemy zużycie na m². Nasi eksperci chętnie pomogą wyliczyć zapotrzebowanie – zadzwoń lub napisz z wymiarami." },
];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : null;
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("Opis");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addItem } = useWycena();

  const cat = product ? getCategoryBySlug(product.categorySlug) : null;
  const breadcrumbs = product ? getBreadcrumbs(product.categorySlug) : [];
  const related = product ? products.filter(p => product.related.includes(p.id) && p.id !== product.id).slice(0, 4) : [];

  // ─── SEO per page ────────────────────────────────────────────────────────────
  useSEO({
    title: product
      ? `${product.name} – ${product.brand} | Media Bud Skład Budowlany Lublin`
      : "Produkt nie znaleziony | Media Bud",
    description: product
      ? `${product.shortDescription} Dostępny w Media Bud – skład budowlany Lublin. SKU: ${product.sku}. Zamów z dostawą 24h.`
      : "Skład budowlany Media Bud Lublin – materiały budowlane, tynki, izolacje, narzędzia.",
    canonical: product ? `/produkt/${product.slug}` : "/produkty",
    ogType: "product",
    schema: product ? [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "sku": product.sku,
        "brand": { "@type": "Brand", "name": product.brand },
        "image": product.images.map(img => `https://mediabud.pl${img}`),
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "PLN",
          "seller": {
            "@type": "LocalBusiness",
            "name": "Media Bud – Skład Budowlany",
            "address": { "@type": "PostalAddress", "addressLocality": "Lublin", "addressCountry": "PL" }
          }
        },
        "additionalProperty": product.technicalSpec.map(s => ({
          "@type": "PropertyValue",
          "name": s.label,
          "value": s.value
        }))
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
          ...breadcrumbs.map((bc, i) => ({
            "@type": "ListItem",
            "position": i + 2,
            "name": bc.name,
            "item": `https://mediabud.pl/kategoria/${bc.slug}`
          })),
          { "@type": "ListItem", "position": breadcrumbs.length + 2, "name": product.name }
        ]
      }
    ] : undefined
  });

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produkt nie znaleziony</h1>
        <Link to="/produkty"><Button className="bg-primary">Przeglądaj produkty</Button></Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    toast.success(`${product.name} dodano do wyceny`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Strona główna</Link>
            {breadcrumbs.map((bc) => (
              <span key={bc.id} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                <Link to={`/kategoria/${bc.slug}`} className="hover:text-primary">{bc.name}</Link>
              </span>
            ))}
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* ── Main grid ──────────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Image gallery */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden aspect-video flex items-center justify-center p-8 shadow-sm">
              <img
                src={product.images[0]}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </div>
            <div className="flex gap-2 mt-3">
              {product.isNew && <Badge className="bg-green-500 text-white">Nowość</Badge>}
              {product.isFeatured && <Badge className="bg-primary text-white">⭐ Polecany</Badge>}
              <Badge variant="outline" className="border-gray-300 text-gray-500 text-xs">
                SKU: {product.sku}
              </Badge>
            </div>
            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: <Truck className="w-4 h-4 text-primary" />, text: "Dostawa 24h" },
                { icon: <ShieldCheck className="w-4 h-4 text-primary" />, text: "Oryginał" },
                { icon: <Clock className="w-4 h-4 text-primary" />, text: "Pn–Sob 7–17" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1 bg-white rounded-lg border border-gray-200 p-3 text-center">
                  {icon}
                  <span className="text-xs font-medium text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details panel */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="secondary">{product.brand}</Badge>
              {cat && (
                <Link to={`/kategoria/${cat.slug}`} className="text-xs text-primary hover:underline">
                  {cat.name}
                </Link>
              )}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-gray-500 ml-1">(Zapytaj o opinię)</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-snug">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-4">
              Jednostka: <strong>{product.unit}</strong>
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">{product.shortDescription}</p>

            {/* Quick specs */}
            {product.technicalSpec.length > 0 && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Kluczowe parametry</h3>
                <div className="space-y-1.5">
                  {product.technicalSpec.slice(0, 4).map((spec, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-500">{spec.label}</span>
                      <span className="font-semibold text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA block */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
              <p className="text-sm font-semibold text-gray-700">Zapytaj o dostępność i cenę:</p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Ilość:</span>
                <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold transition-colors"
                    aria-label="Zmniejsz ilość"
                  >−</button>
                  <span className="w-10 text-center font-bold text-sm">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold transition-colors"
                    aria-label="Zwiększ ilość"
                  >+</button>
                </div>
                <span className="text-sm text-gray-500">{product.unit}</span>
              </div>

              <Button
                className="w-full bg-primary hover:bg-red-700 font-bold text-base py-3 transition-colors"
                onClick={() => setQuoteOpen(true)}
              >
                <Mail className="w-4 h-4 mr-2" /> Zapytaj o ofertę
              </Button>

              <Button
                variant="outline"
                className={`w-full border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 transition-all ${added ? "bg-green-50 border-green-500 text-green-700 hover:bg-green-50 hover:text-green-700" : ""}`}
                onClick={handleAdd}
              >
                {added
                  ? <><Check className="w-4 h-4 mr-2" /> Dodano do wyceny!</>
                  : <><ShoppingCart className="w-4 h-4 mr-2" /> Dodaj do wyceny</>
                }
              </Button>

              <a
                href="tel:+48509567213"
                className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors font-medium py-2 border border-dashed border-gray-200 rounded-lg"
              >
                <Phone className="w-4 h-4" /> <strong>+48 509 567 213</strong> – zamów telefonicznie
              </a>
            </div>
          </div>
        </div>

        {/* ── Tabs ───────────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-200 mb-12 overflow-hidden shadow-sm">
          {/* Tab bar */}
          <div className="flex border-b overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                  tab === t
                    ? "border-primary text-primary bg-red-50"
                    : "border-transparent text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 md:p-8">
            {tab === "Opis" && (
              <div className="max-w-3xl">
                <p className="text-gray-700 leading-relaxed text-[15px] mb-5">{product.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tab === "Specyfikacja" && (
              <div className="max-w-2xl">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-100">
                    {product.technicalSpec.map((spec, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 pr-6 text-sm text-gray-500 font-medium w-1/2">{spec.label}</td>
                        <td className="py-3 text-sm font-bold text-gray-900">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-xs text-gray-400">* Parametry podane przez producenta. Szczegółowe dane w karcie technicznej produktu.</p>
              </div>
            )}

            {tab === "Zastosowanie" && (
              <div className="max-w-3xl space-y-4">
                <p className="text-gray-700 leading-relaxed text-[15px]">{product.application}</p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h4 className="font-bold text-amber-900 mb-2">💡 Porada eksperta</h4>
                  <p className="text-sm text-amber-800">Nie jesteś pewien, czy ten produkt jest odpowiedni do Twojego projektu? Nasi specjaliści budowlani doradzą bezpłatnie – zadzwoń lub napisz.</p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <a href="tel:+48509567213">
                      <Button size="sm" className="bg-primary hover:bg-red-700">
                        <Phone className="w-3 h-3 mr-1" /> +48 509 567 213
                      </Button>
                    </a>
                    <Link to="/kontakt">
                      <Button size="sm" variant="outline" className="border-amber-400 text-amber-800 hover:bg-amber-100">
                        <Mail className="w-3 h-3 mr-1" /> Wyślij zapytanie
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {tab === "FAQ" && (
              <div className="max-w-3xl space-y-3">
                {FAQ_GENERIC.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-semibold text-gray-900 text-sm pr-4">{item.q}</span>
                      <ChevronDown className={`w-4 h-4 text-primary flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-2">Masz inne pytanie? <a href="tel:+48509567213" className="text-primary hover:underline">Zadzwoń: +48 509 567 213</a></p>
              </div>
            )}
          </div>
        </div>

        {/* ── Related products ────────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full inline-block"></span>
              Produkty powiązane
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} productName={product.name} />
    </div>
  );
}
