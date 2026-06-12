/**
 * VariantSelector — selektor wariantów produktu (grubość, pojemność, granulacja)
 * Wzorowany na ASOS: jeden listing, wiele wariantów
 */

import { useState, useMemo } from "react";
import { Check } from "lucide-react";
import { getVariantKey } from "@/lib/categoryConfig";

export interface ProductVariant {
  id: string;
  slug: string;
  name: string;
  variantValue: string;  // np. "10 cm", "2.5 l", "1.5 mm"
  inStock: boolean;
  sku?: string;
}

interface VariantSelectorProps {
  categorySlug: string;
  variants: ProductVariant[];
  selectedVariantId: string;
  onVariantChange: (variant: ProductVariant) => void;
  className?: string;
}

export function VariantSelector({
  categorySlug,
  variants,
  selectedVariantId,
  onVariantChange,
  className = "",
}: VariantSelectorProps) {
  const variantKey = getVariantKey(categorySlug);
  
  if (!variantKey || variants.length <= 1) {
    return null;
  }

  // Sortuj warianty numerycznie
  const sortedVariants = useMemo(() => {
    return [...variants].sort((a, b) => {
      const numA = parseFloat(a.variantValue.replace(/[^\d.,]/g, "").replace(",", "."));
      const numB = parseFloat(b.variantValue.replace(/[^\d.,]/g, "").replace(",", "."));
      return numA - numB;
    });
  }, [variants]);

  // Etykieta na podstawie klucza wariantu
  const variantLabel = useMemo(() => {
    const labels: Record<string, string> = {
      grubosc: "Wybierz grubość",
      pojemnosc: "Wybierz pojemność",
      granulacja: "Wybierz granulację",
      format: "Wybierz format",
      rozmiar: "Wybierz rozmiar",
    };
    return labels[variantKey] || "Wybierz wariant";
  }, [variantKey]);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Etykieta */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
          {variantLabel}
        </span>
        <span className="text-xs text-white/40">
          {sortedVariants.length} wariantów
        </span>
      </div>

      {/* Siatka wariantów */}
      <div className="flex flex-wrap gap-2">
        {sortedVariants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          const isDisabled = !variant.inStock;

          return (
            <button
              key={variant.id}
              onClick={() => !isDisabled && onVariantChange(variant)}
              disabled={isDisabled}
              className={`
                relative min-w-[60px] px-4 py-2.5 rounded-lg
                text-sm font-semibold
                transition-all duration-200
                ${isSelected
                  ? "bg-[#f81828] text-white border-2 border-[#f81828] shadow-lg shadow-[#f81828]/25"
                  : isDisabled
                    ? "bg-white/5 text-white/30 border border-white/10 cursor-not-allowed line-through"
                    : "bg-white/5 text-white border border-white/20 hover:border-[#f81828]/50 hover:bg-white/10"
                }
              `}
              aria-pressed={isSelected}
              aria-disabled={isDisabled}
            >
              {/* Wartość wariantu */}
              <span>{variant.variantValue}</span>

              {/* Checkmark dla wybranego */}
              {isSelected && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#f81828]" />
                </span>
              )}

              {/* Badge "Brak" dla niedostępnych */}
              {isDisabled && (
                <span className="absolute -top-1 -right-1 text-[8px] bg-white/20 text-white/50 px-1 rounded">
                  Brak
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Info o wybranym wariancie */}
      {selectedVariantId && (
        <div className="text-xs text-white/40">
          SKU: {sortedVariants.find(v => v.id === selectedVariantId)?.sku || "—"}
        </div>
      )}
    </div>
  );
}

// ─── HOOK DO GRUPOWANIA WARIANTÓW ────────────────────────────────────────────

interface Product {
  id: string;
  slug: string;
  name: string;
  techSpecs?: Record<string, string | number>;
  inStock?: boolean;
  sku?: string;
}

/**
 * Hook do grupowania produktów w warianty na podstawie nazwy bazowej
 */
export function useProductVariants(
  products: Product[],
  currentProductId: string,
  categorySlug: string
): ProductVariant[] {
  const variantKey = getVariantKey(categorySlug);
  
  return useMemo(() => {
    if (!variantKey) return [];

    // Znajdź aktualny produkt
    const currentProduct = products.find(p => p.id === currentProductId);
    if (!currentProduct) return [];

    // Wyciągnij bazową nazwę (bez wartości wariantu)
    const baseName = extractBaseName(currentProduct.name, variantKey);

    // Znajdź wszystkie produkty z tą samą bazową nazwą
    const relatedProducts = products.filter(p => {
      const pBaseName = extractBaseName(p.name, variantKey);
      return pBaseName === baseName;
    });

    // Mapuj na warianty
    return relatedProducts.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      variantValue: extractVariantValue(p.name, p.techSpecs?.[variantKey], variantKey),
      inStock: p.inStock !== false,
      sku: p.sku,
    }));
  }, [products, currentProductId, categorySlug, variantKey]);
}

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

/**
 * Wyciąga bazową nazwę produktu (bez wartości wariantu)
 */
function extractBaseName(name: string, variantKey: string): string {
  // Usuń typowe wzorce wariantów z nazwy
  const patterns = [
    /\s*\d+\s*(cm|mm|l|ml|kg|g)\s*$/i,           // "10 cm", "2.5 l"
    /\s*\d+[.,]\d+\s*(cm|mm|l|ml|kg|g)\s*$/i,    // "1.5 mm"
    /\s*\d+x\d+\s*(cm|mm)?\s*$/i,                // "60x60 cm"
    /\s*gr\.\s*\d+[.,]?\d*\s*(mm)?\s*$/i,        // "gr. 1.5 mm"
  ];

  let baseName = name;
  for (const pattern of patterns) {
    baseName = baseName.replace(pattern, "");
  }

  return baseName.trim().toLowerCase();
}

/**
 * Wyciąga wartość wariantu z nazwy lub techSpecs
 */
function extractVariantValue(
  name: string,
  techSpecValue: string | number | undefined,
  variantKey: string
): string {
  // Jeśli mamy wartość w techSpecs, użyj jej
  if (techSpecValue !== undefined) {
    const units: Record<string, string> = {
      grubosc: "cm",
      pojemnosc: "l",
      granulacja: "mm",
      format: "cm",
    };
    const unit = units[variantKey] || "";
    return `${techSpecValue}${unit ? ` ${unit}` : ""}`;
  }

  // Wyciągnij z nazwy
  const patterns = [
    /(\d+[.,]?\d*)\s*(cm|mm|l|ml|kg|g)/i,
    /(\d+x\d+)\s*(cm|mm)?/i,
    /gr\.\s*(\d+[.,]?\d*)\s*(mm)?/i,
  ];

  for (const pattern of patterns) {
    const match = name.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }

  return "—";
}

export default VariantSelector;
