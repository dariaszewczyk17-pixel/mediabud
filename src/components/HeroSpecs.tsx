/**
 * HeroSpecs — wyświetla kluczowe parametry techniczne produktu
 * Zaprojektowany na podstawie analizy Baymard Institute i ASOS
 */

import { getHeroSpecs, formatSpecValue, type HeroSpecConfig } from "@/lib/categoryConfig";

type TechSpecs = Record<string, string | number | undefined>;

interface HeroSpecsProps {
  categorySlug: string;
  techSpecs: TechSpecs;
  className?: string;
}

export function HeroSpecs({ categorySlug, techSpecs, className = "" }: HeroSpecsProps) {
  const heroSpecsConfig = getHeroSpecs(categorySlug);
  
  if (!heroSpecsConfig.length || !techSpecs) {
    return null;
  }

  // Filtruj tylko te specs, które mają wartość
  const visibleSpecs = heroSpecsConfig.filter(spec => {
    const value = techSpecs[spec.key];
    return value !== undefined && value !== null && value !== "";
  });

  if (!visibleSpecs.length) {
    return null;
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${className}`}>
      {visibleSpecs.map((spec) => (
        <HeroSpecCard
          key={spec.key}
          spec={spec}
          value={techSpecs[spec.key]!}
        />
      ))}
    </div>
  );
}

interface HeroSpecCardProps {
  spec: HeroSpecConfig;
  value: string | number;
}

function HeroSpecCard({ spec, value }: HeroSpecCardProps) {
  const formattedValue = formatSpecValue(value, spec.unit);
  
  return (
    <div
      className={`
        relative overflow-hidden rounded-lg p-3
        ${spec.highlight 
          ? "bg-gradient-to-br from-[#f81828]/10 to-[#f81828]/5 border border-[#f81828]/20" 
          : "bg-white/5 border border-white/10"
        }
        transition-all duration-200 hover:scale-[1.02]
      `}
    >
      {/* Ikona */}
      {spec.icon && (
        <span className="text-lg mb-1 block">{spec.icon}</span>
      )}
      
      {/* Etykieta */}
      <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
        {spec.label}
      </span>
      
      {/* Wartość */}
      <span 
        className={`
          text-lg font-bold block
          ${spec.highlight ? "text-[#f81828]" : "text-white"}
        `}
      >
        {formattedValue}
      </span>
      
      {/* Highlight glow */}
      {spec.highlight && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 100%, rgba(248,24,40,0.1) 0%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

export default HeroSpecs;
