import { Link } from "react-router-dom";
import { useAllBrands } from "@/hooks/useSanityData";
import { useSEO } from "@/hooks/useSEO";
import { ExternalLink } from "lucide-react";

type Brand = {
  _id: string;
  slug: string;
  name: string;
  logo?: string;
  featured?: boolean;
  website?: string;
  country?: string;
};

export default function BrandsPage() {
  const { data, loading } = useAllBrands();
  const brands = (data as Brand[] | null) ?? [];
  const featured = brands.filter(b => b.featured);
  const rest     = brands.filter(b => !b.featured);

  useSEO({
    title: "Marki | Media Bud – Skład Budowlany Lublin",
    description: "Oferujemy produkty czołowych marek budowlanych: KNAUF, Weber, Atlas, Baumit, Rigips, Rockwool i wielu innych. Sklep Media Bud Lublin.",
    canonical: "/marki",
  });

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(248,24,40,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.06) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]"
          style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2) 60%,transparent)" }} />
        <div className="container mx-auto px-6 py-14 pl-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-black text-[#f81828] tracking-widest uppercase">Nasz asortyment</span>
            <span className="h-px w-10 bg-[#f81828]/40" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            Marki w ofercie
          </h1>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            Współpracujemy z czołowymi producentami materiałów budowlanych.
            Gwarantujemy oryginalne produkty z pełną dokumentacją techniczną.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="rounded-xl animate-pulse aspect-[3/2]"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }} />
            ))}
          </div>
        )}

        {!loading && brands.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <div className="text-4xl mb-4">🏗️</div>
            <p>Baza marek w przygotowaniu. Zadzwoń — na pewno mamy to, czego szukasz.</p>
            <a href="tel:+48533553344" className="mt-4 inline-block text-[#f81828] font-bold hover:underline">
              +48 533 553 344
            </a>
          </div>
        )}

        {/* Polecane marki */}
        {featured.length > 0 && (
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-sm font-bold text-white mb-5 uppercase tracking-widest">
              <span className="w-[3px] h-4 bg-[#f81828] rounded-full" />
              Partnerzy Premium
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featured.map(brand => (
                <BrandCard key={brand._id} brand={brand} featured />
              ))}
            </div>
          </section>
        )}

        {/* Pozostałe marki */}
        {rest.length > 0 && (
          <section>
            {featured.length > 0 && (
              <h2 className="flex items-center gap-2 text-sm font-bold text-white mb-5 uppercase tracking-widest">
                <span className="w-[3px] h-4 bg-[#f81828]/40 rounded-full" />
                Wszystkie marki
              </h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {rest.map(brand => (
                <BrandCard key={brand._id} brand={brand} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.1),rgba(248,24,40,0.04))", border: "1px solid rgba(248,24,40,0.2)" }}>
          <div>
            <p className="text-white font-bold mb-1">Nie widzisz swojej marki?</p>
            <p className="text-gray-500 text-sm">Zadzwoń — współpracujemy z setkami producentów i możemy zamówić praktycznie wszystko.</p>
          </div>
          <a href="tel:+48533553344"
            className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:shadow-[0_0_20px_rgba(248,24,40,0.4)]"
            style={{ background: "#f81828" }}>
            +48 533 553 344
          </a>
        </div>
      </div>
    </div>
  );
}

function BrandCard({ brand, featured = false }: { brand: Brand; featured?: boolean }) {
  const inner = (
    <div
      className="group rounded-xl overflow-hidden transition-all duration-300 flex flex-col items-center justify-center gap-3 p-5 cursor-pointer"
      style={{
        background: featured ? "rgba(248,24,40,0.04)" : "#0f0f0f",
        border: featured
          ? "1px solid rgba(248,24,40,0.2)"
          : "1px solid rgba(255,255,255,0.06)",
        aspectRatio: "3/2",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.4)";
        (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.07)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = featured
          ? "rgba(248,24,40,0.2)" : "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.background = featured
          ? "rgba(248,24,40,0.04)" : "#0f0f0f";
      }}
    >
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="max-h-12 max-w-full object-contain transition-all duration-300 group-hover:scale-105"
          style={{ filter: "brightness(0) invert(1) opacity(0.75)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0) invert(1)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0) invert(1) opacity(0.75)"; }}
        />
      ) : (
        <span className="font-display font-black text-white/60 group-hover:text-white text-sm text-center leading-tight transition-colors">
          {brand.name}
        </span>
      )}
      {brand.website && (
        <ExternalLink className="w-3 h-3 text-gray-700 group-hover:text-[#f81828] transition-colors opacity-0 group-hover:opacity-100 absolute bottom-2 right-2" />
      )}
    </div>
  );

  if (brand.website) {
    return (
      <a href={brand.website} target="_blank" rel="noopener noreferrer" className="relative block">
        {inner}
      </a>
    );
  }
  return (
    <Link to={`/szukaj?q=${encodeURIComponent(brand.name)}`} className="relative block">
      {inner}
    </Link>
  );
}
