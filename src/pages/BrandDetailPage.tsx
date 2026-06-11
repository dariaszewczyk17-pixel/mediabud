import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Phone, Package, ExternalLink, Tag } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useAllProducts } from "@/hooks/useSanityData";
import { sanityProductToLegacy, type SanityProduct } from "@/lib/adapters";
import { mergeProductCollections } from "@/lib/productMerge";
import { products as staticProducts } from "@/data/products";
import { ProductCard } from "@/components/Commerce";
import { getBrandBySlug } from "@/data/brands";

const BASE_URL = "https://mediabud.pl";

export default function BrandDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const brand = getBrandBySlug(slug);
  const { data: sanityProducts, loading } = useAllProducts();

  const mergedProducts = useMemo(() => {
    const legacy = ((sanityProducts as SanityProduct[] | undefined) ?? []).map(sanityProductToLegacy);
    return mergeProductCollections(legacy, staticProducts);
  }, [sanityProducts]);

  const brandProducts = useMemo(
    () => mergedProducts.filter(p => p.brand?.toLowerCase() === brand?.name.toLowerCase()),
    [mergedProducts, brand],
  );

  /* ── SEO ── */
  useSEO({
    title: brand
      ? `${brand.name} — materiały budowlane | Media Bud Lublin`
      : "Marka nieznaleziona | Media Bud",
    description: brand
      ? `Pełny katalog produktów ${brand.name} dostępnych w składzie Media Bud Lublin. ${!loading && brandProducts.length ? `${brandProducts.length} produktów w stock.` : ""} Doradztwo, dostawa, faktura VAT.`
      : "Nie znaleziono takiej marki w katalogu Media Bud.",
    canonical: `/marki/${slug}`,
    noIndex: false,
    schema: brand
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Strona główna", item: `${BASE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Marki", item: `${BASE_URL}/marki` },
              { "@type": "ListItem", position: 3, name: brand.name, item: `${BASE_URL}/marki/${slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Produkty ${brand.name} — Media Bud Lublin`,
            description: `Katalog produktów marki ${brand.name} dostępnych w składzie budowlanym Media Bud w Lublinie.`,
            url: `${BASE_URL}/marki/${slug}`,
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Strona główna", item: `${BASE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Marki", item: `${BASE_URL}/marki` },
                { "@type": "ListItem", position: 3, name: brand.name, item: `${BASE_URL}/marki/${slug}` },
              ],
            },
          },
        ]
      : undefined,
  });

  /* ── Marka nie istnieje ── */
  if (!brand) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4" style={{ background: "#080808" }}>
        <p className="text-gray-400 text-lg">Nie znaleziono marki &ldquo;{slug}&rdquo;</p>
        <Link to="/marki" className="text-[#f81828] font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Wróć do listy marek
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* ── HERO ── */}
      <section className="pt-14 pb-10" style={{ background: "linear-gradient(180deg,#0d0d0d,#080808)" }}>
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-600 mb-8">
            <Link to="/" className="hover:text-[#f81828] transition-colors">Strona główna</Link>
            <span>/</span>
            <Link to="/marki" className="hover:text-[#f81828] transition-colors">Marki</Link>
            <span>/</span>
            <span className="text-gray-400">{brand.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Logo */}
            <div
              className="flex-shrink-0 w-36 h-28 rounded-2xl flex items-center justify-center p-4"
              style={{ background: "#fff", border: "1px solid #222" }}
            >
              <img
                src={brand.logo}
                alt={`Logo ${brand.name}`}
                className="max-w-full max-h-full object-contain"
                loading="eager"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f81828] bg-[#f81828]/10 px-2 py-0.5 rounded-full">
                  Oficjalny dystrybutor
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">
                {brand.name}
              </h1>
              <p className="text-gray-400 text-sm max-w-xl leading-relaxed mb-4">
                {brand.description
                  ? brand.description
                  : <>Oryginalne produkty marki <strong className="text-gray-300">{brand.name}</strong> dostępne w składzie budowlanym <strong className="text-gray-300">Media Bud</strong> w Lublinie. Pełna dokumentacja techniczna, karty danych bezpieczeństwa i atesty budowlane.</>
                }
              </p>
              {brand.categories && brand.categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4 justify-center sm:justify-start">
                  {brand.categories.map(cat => (
                    <span key={cat} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                      <Tag className="w-2.5 h-2.5 text-[#f81828]" />{cat}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                {brandProducts.length > 0 && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <Package className="w-3.5 h-3.5 text-[#f81828]" />
                    {loading ? "···" : brandProducts.length} {brandProducts.length === 1 ? "produkt" : brandProducts.length < 5 ? "produkty" : "produktów"} w katalogu
                  </span>
                )}
                {brand.website && (
                  <a href={brand.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:text-white hover:border-white/30 transition-all">
                    <ExternalLink className="w-3 h-3" /> Strona producenta
                  </a>
                )}
                <a
                  href="tel:+48533553344"
                  className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-full transition-all hover:bg-[#c8000f]"
                  style={{ background: "#f81828" }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  +48 533 553 344
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUKTY ── */}
      <section className="py-10" style={{ background: "#080808" }}>
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="flex items-center gap-3 mb-8">
            <span className="w-[3px] h-6 bg-[#f81828] rounded-full" />
            <h2 className="font-display text-xl font-black text-white">
              Produkty {brand.name}
            </h2>
            {brandProducts.length > 0 && (
              <span className="text-xs font-bold text-gray-500 ml-auto">
                {loading ? "···" : brandProducts.length} pozycji
              </span>
            )}
          </div>

          {loading ? (
            /* Skeleton podczas ładowania — nie pokazuje "brak produktów" */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-[#111] border border-white/5 animate-pulse" style={{ aspectRatio: "3/4" }} />
              ))}
            </div>
          ) : brandProducts.length === 0 ? (
            <div className="rounded-2xl p-12 flex flex-col items-center gap-4 text-center"
              style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}>
              <Package className="w-12 h-12 text-gray-700" />
              <p className="text-gray-500 text-sm max-w-sm">
                Produkty tej marki są dostępne — skontaktuj się z nami telefonicznie lub odwiedź sklep.
              </p>
              <a
                href="tel:+48533553344"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:bg-[#c8000f]"
                style={{ background: "#f81828" }}
              >
                <Phone className="w-4 h-4" /> Zapytaj o dostępność
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {brandProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12" style={{ background: "#050505", borderTop: "1px solid #141414" }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.1),rgba(248,24,40,0.04))", border: "1px solid rgba(248,24,40,0.2)" }}>
            <div>
              <p className="text-white font-bold text-lg mb-1">Nie widzisz produktu {brand.name}?</p>
              <p className="text-gray-500 text-sm max-w-md">
                Nasz katalog jest regularnie aktualizowany. Zadzwoń — sprowadzamy produkty na zamówienie.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => navigate("/marki")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white border border-white/10 hover:border-white/30 transition-all"
                style={{ background: "transparent" }}
              >
                <ArrowLeft className="w-4 h-4" /> Wszystkie marki
              </button>
              <a
                href="tel:+48533553344"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:bg-[#c8000f]"
                style={{ background: "#f81828" }}
              >
                <Phone className="w-4 h-4" /> +48 533 553 344
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
