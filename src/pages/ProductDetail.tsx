import { useParams, Link } from "react-router-dom";
import { ChevronRight, ShoppingCart, Phone, Mail, Download, Check } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { getCategoryBySlug, getBreadcrumbs } from "@/data/categories";
import { ProductCard, QuoteModal } from "@/components/Commerce";
import { useWycena } from "@/hooks/useWycena";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : null;
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const { addItem } = useWycena();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produkt nie znaleziony</h1>
        <Link to="/produkty"><Button className="bg-primary">Przeglądaj produkty</Button></Link>
      </div>
    );
  }

  const cat = getCategoryBySlug(product.categorySlug);
  const breadcrumbs = getBreadcrumbs(product.categorySlug);
  const related = products.filter(p => product.related.includes(p.id) && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    toast.success(`${product.name} dodano do wyceny`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* JSON-LD Product Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        "name": product.name, "description": product.description,
        "brand": { "@type": "Brand", "name": product.brand },
        "sku": product.sku, "image": product.images,
        "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "PLN", "seller": { "@type": "Organization", "name": "Media Bud" } }
      })}} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500 flex-wrap">
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
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden aspect-square flex items-center justify-center p-8">
              <img src={product.images[0]} alt={product.name} className="max-w-full max-h-full object-contain" />
            </div>
            {product.isNew && <Badge className="mt-3 bg-green-500 text-white">Nowość</Badge>}
            {product.isFeatured && <Badge className="mt-3 ml-2 bg-primary text-white">Polecany</Badge>}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.brand}</Badge>
              {cat && <Link to={`/kategoria/${cat.slug}`} className="text-xs text-primary hover:underline">{cat.name}</Link>}
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-snug">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-4">SKU: <span className="font-mono">{product.sku}</span> · Jednostka: <strong>{product.unit}</strong></p>
            <p className="text-gray-700 leading-relaxed mb-6">{product.shortDescription}</p>

            {/* Qty & Actions */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Ilość:</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-200 font-bold">-</button>
                  <span className="w-10 text-center font-bold">{qty}</span>
                  <button onClick={() => setQty(q => q+1)} className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-200 font-bold">+</button>
                  <span className="text-sm text-gray-500">{product.unit}</span>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-red-700 font-bold text-base py-3" onClick={() => setQuoteOpen(true)}>
                <Mail className="w-4 h-4 mr-2" /> Zapytaj o ofertę
              </Button>
              <Button variant="outline" className={`w-full border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 transition-all ${added ? "bg-green-50 border-green-500 text-green-700" : ""}`} onClick={handleAdd}>
                {added ? <><Check className="w-4 h-4 mr-2" /> Dodano do wyceny!</> : <><ShoppingCart className="w-4 h-4 mr-2" /> Dodaj do wyceny</>}
              </Button>
              <a href="tel:+48509567213" className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors font-medium py-2">
                <Phone className="w-4 h-4" /> Zamów telefonicznie: +48 509 567 213
              </a>
            </div>

            {/* Quick Specs */}
            {product.technicalSpec.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Podstawowe parametry</h3>
                <div className="space-y-2">
                  {product.technicalSpec.slice(0, 4).map((spec, i) => (
                    <div key={i} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0">
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs: Description / Spec / Application */}
        <div className="bg-white rounded-xl border border-gray-200 mb-12">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-b">
            {[["Opis produktu","📋"],["Specyfikacja techniczna","📐"],["Zastosowanie","🔨"]].map(([label, icon]) => (
              <div key={label} className="p-5">
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-sm">{icon} {label}</h3>
              </div>
            ))}
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-1">
                {product.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">#{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="space-y-2">
                {product.technicalSpec.map((spec, i) => (
                  <div key={i} className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-0">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-medium text-gray-900 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">{product.application}</p>
              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-xs font-medium text-primary">💡 Potrzebujesz więcej informacji?</p>
                <a href="tel:+48509567213" className="text-xs text-gray-600 mt-1 block hover:text-primary">Zadzwoń: +48 509 567 213</a>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full text-xs border-gray-200">
                <Download className="w-3 h-3 mr-1" /> Karta techniczna (PDF)
              </Button>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-5">Produkty powiązane</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} productName={product.name} />
    </div>
  );
}
