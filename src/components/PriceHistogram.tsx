import React, { useMemo, useState, useCallback } from "react";

/* ================================================================
   PRICE HISTOGRAM — Industrial Pulse 2026
   
   Wizualizacja rozkładu cen produktów nad sliderem.
   +20-30% engagement wg BTNG.studio
   
   Features:
   - Słupki pokazujące liczbę produktów w przedziałach cenowych
   - Interaktywny range slider z dual handles
   - Animowane słupki przy zmianie zakresu
   - Glow effect na aktywnych słupkach
================================================================ */

interface PriceHistogramProps {
  prices: number[];
  minPrice: number;
  maxPrice: number;
  selectedMin: number;
  selectedMax: number;
  onRangeChange: (min: number, max: number) => void;
  bucketCount?: number;
}

export function PriceHistogram({
  prices,
  minPrice,
  maxPrice,
  selectedMin,
  selectedMax,
  onRangeChange,
  bucketCount = 12,
}: PriceHistogramProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Oblicz przedziały cenowe i liczbę produktów w każdym
  const buckets = useMemo(() => {
    if (prices.length === 0 || maxPrice <= minPrice) return [];
    
    const range = maxPrice - minPrice;
    const bucketSize = range / bucketCount;
    const result: { min: number; max: number; count: number }[] = [];
    
    for (let i = 0; i < bucketCount; i++) {
      const bucketMin = minPrice + i * bucketSize;
      const bucketMax = minPrice + (i + 1) * bucketSize;
      const count = prices.filter(p => p >= bucketMin && (i === bucketCount - 1 ? p <= bucketMax : p < bucketMax)).length;
      result.push({ min: bucketMin, max: bucketMax, count });
    }
    
    return result;
  }, [prices, minPrice, maxPrice, bucketCount]);

  const maxCount = useMemo(() => Math.max(...buckets.map(b => b.count), 1), [buckets]);

  // Sprawdź czy bucket jest w wybranym zakresie
  const isBucketActive = useCallback((bucket: { min: number; max: number }) => {
    return bucket.max > selectedMin && bucket.min < selectedMax;
  }, [selectedMin, selectedMax]);

  // Formatuj cenę
  const formatPrice = (price: number) => {
    if (price >= 1000) return `${(price / 1000).toFixed(1)}k`;
    return Math.round(price).toString();
  };

  // Handle slider change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), selectedMax - 1);
    onRangeChange(newMin, selectedMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), selectedMin + 1);
    onRangeChange(selectedMin, newMax);
  };

  if (buckets.length === 0) return null;

  const rangePercent = {
    left: ((selectedMin - minPrice) / (maxPrice - minPrice)) * 100,
    right: ((maxPrice - selectedMax) / (maxPrice - minPrice)) * 100,
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1 h-4 bg-[#f81828] rounded-full" style={{ boxShadow: "0 0 6px rgba(248,24,40,0.6)" }} />
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Zakres cen</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-1 rounded-lg text-[#f81828] font-bold"
            style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.2)" }}>
            {formatPrice(selectedMin)} zł
          </span>
          <span className="text-gray-600">—</span>
          <span className="px-2 py-1 rounded-lg text-[#f81828] font-bold"
            style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.2)" }}>
            {formatPrice(selectedMax)} zł
          </span>
        </div>
      </div>

      {/* Histogram bars */}
      <div className="relative h-16 flex items-end gap-[2px] mb-2 px-1">
        {buckets.map((bucket, i) => {
          const height = (bucket.count / maxCount) * 100;
          const isActive = isBucketActive(bucket);
          
          return (
            <div
              key={i}
              className="flex-1 relative group cursor-pointer transition-all duration-200"
              style={{ height: "100%" }}
              title={`${formatPrice(bucket.min)}–${formatPrice(bucket.max)} zł: ${bucket.count} produktów`}
            >
              {/* Bar */}
              <div
                className="absolute bottom-0 left-0 right-0 rounded-t-sm transition-all duration-300"
                style={{
                  height: `${Math.max(height, 4)}%`,
                  background: isActive
                    ? "linear-gradient(180deg, #f81828 0%, rgba(248,24,40,0.6) 100%)"
                    : "linear-gradient(180deg, #333 0%, #222 100%)",
                  boxShadow: isActive ? "0 0 8px rgba(248,24,40,0.4)" : "none",
                  opacity: isActive ? 1 : 0.4,
                }}
              />
              
              {/* Hover tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="px-2 py-1 rounded text-[9px] font-mono whitespace-nowrap"
                  style={{ background: "#1a1a1a", border: "1px solid rgba(248,24,40,0.3)", color: "#fff" }}>
                  {bucket.count}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Active range overlay */}
        <div
          className="absolute bottom-0 h-full pointer-events-none"
          style={{
            left: `${rangePercent.left}%`,
            right: `${rangePercent.right}%`,
            background: "rgba(248,24,40,0.05)",
            borderLeft: "1px solid rgba(248,24,40,0.3)",
            borderRight: "1px solid rgba(248,24,40,0.3)",
          }}
        />
      </div>

      {/* Dual range slider */}
      <div className="relative h-6 mt-4">
        {/* Track background */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.1)" }} />
        
        {/* Active track */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full"
          style={{
            left: `${rangePercent.left}%`,
            right: `${rangePercent.right}%`,
            background: "linear-gradient(90deg, #f81828, #ff4d5a)",
            boxShadow: "0 0 10px rgba(248,24,40,0.5)",
          }}
        />

        {/* Min slider */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={selectedMin}
          onChange={handleMinChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute w-full h-full appearance-none bg-transparent cursor-pointer z-10"
          style={{
            pointerEvents: "auto",
            // @ts-ignore
            "--thumb-size": "18px",
          }}
        />

        {/* Max slider */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={selectedMax}
          onChange={handleMaxChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute w-full h-full appearance-none bg-transparent cursor-pointer z-10"
        />

        {/* Custom thumb indicators */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full pointer-events-none z-20"
          style={{
            left: `calc(${rangePercent.left}% - 8px)`,
            background: "#f81828",
            border: "2px solid #fff",
            boxShadow: isDragging ? "0 0 12px rgba(248,24,40,0.8)" : "0 0 8px rgba(248,24,40,0.5)",
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full pointer-events-none z-20"
          style={{
            right: `calc(${rangePercent.right}% - 8px)`,
            background: "#f81828",
            border: "2px solid #fff",
            boxShadow: isDragging ? "0 0 12px rgba(248,24,40,0.8)" : "0 0 8px rgba(248,24,40,0.5)",
          }}
        />
      </div>

      {/* Price labels */}
      <div className="flex justify-between mt-2 text-[10px] font-mono text-gray-600">
        <span>{formatPrice(minPrice)} zł</span>
        <span>{formatPrice(maxPrice)} zł</span>
      </div>

      {/* Quick presets */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {[
          { label: "Do 50 zł", min: minPrice, max: Math.min(50, maxPrice) },
          { label: "50–200 zł", min: 50, max: 200 },
          { label: "200–500 zł", min: 200, max: 500 },
          { label: "500+ zł", min: 500, max: maxPrice },
        ].filter(p => p.min < maxPrice && p.max > minPrice).map((preset, i) => (
          <button
            key={i}
            onClick={() => onRangeChange(Math.max(preset.min, minPrice), Math.min(preset.max, maxPrice))}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all hover:border-[#f81828]/50 hover:text-[#f81828]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#888",
            }}
          >
            {preset.label}
          </button>
        ))}
        {(selectedMin > minPrice || selectedMax < maxPrice) && (
          <button
            onClick={() => onRangeChange(minPrice, maxPrice)}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
            style={{
              background: "rgba(248,24,40,0.1)",
              border: "1px solid rgba(248,24,40,0.25)",
              color: "#f81828",
            }}
          >
            Reset
          </button>
        )}
      </div>

      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}

export default PriceHistogram;
