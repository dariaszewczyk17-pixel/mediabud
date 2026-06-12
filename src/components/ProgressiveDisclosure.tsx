import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/* ================================================================
   PROGRESSIVE DISCLOSURE — Industrial Pulse 2026
   
   Zwijanie długich list filtrów z przyciskiem "Pokaż wszystkie X".
   Zmniejsza cognitive load wg Baymard Institute.
   
   Features:
   - Pokazuje pierwsze N elementów
   - Animowane rozwijanie
   - Licznik ukrytych elementów
================================================================ */

interface ProgressiveDisclosureProps<T> {
  items: T[];
  initialCount?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  showAllLabel?: string;
  showLessLabel?: string;
  className?: string;
}

export function ProgressiveDisclosure<T>({
  items,
  initialCount = 8,
  renderItem,
  showAllLabel = "Pokaż wszystkie",
  showLessLabel = "Pokaż mniej",
  className = "",
}: ProgressiveDisclosureProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldCollapse = items.length > initialCount;
  const visibleItems = useMemo(
    () => (isExpanded || !shouldCollapse ? items : items.slice(0, initialCount)),
    [items, isExpanded, shouldCollapse, initialCount]
  );
  const hiddenCount = items.length - initialCount;

  if (items.length === 0) return null;

  return (
    <div className={className}>
      {/* Items */}
      <div className="space-y-0.5">
        {visibleItems.map((item, index) => renderItem(item, index))}
      </div>

      {/* Show more/less button */}
      {shouldCollapse && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all group"
          style={{
            background: "rgba(248,24,40,0.05)",
            border: "1px solid rgba(248,24,40,0.15)",
            color: "#f81828",
          }}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              {showLessLabel}
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
              {showAllLabel} ({hiddenCount} więcej)
            </>
          )}
        </button>
      )}
    </div>
  );
}

/* ================================================================
   FILTER LIST WITH DISCLOSURE — gotowy komponent dla list filtrów
================================================================ */

interface FilterOption {
  value: string;
  count?: number;
}

interface FilterListWithDisclosureProps {
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  initialCount?: number;
  allLabel?: string;
}

export function FilterListWithDisclosure({
  options,
  selected,
  onChange,
  initialCount = 8,
  allLabel = "Wszystkie",
}: FilterListWithDisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldCollapse = options.length > initialCount;
  const visibleOptions = useMemo(
    () => (isExpanded || !shouldCollapse ? options : options.slice(0, initialCount)),
    [options, isExpanded, shouldCollapse, initialCount]
  );
  const hiddenCount = options.length - initialCount;

  return (
    <div className="space-y-0.5">
      {/* "All" option */}
      <button
        onClick={() => onChange("")}
        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
          !selected ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"
        }`}
      >
        <span>{allLabel}</span>
        {!selected && <span className="text-[10px] font-black opacity-70">✓</span>}
      </button>

      {/* Visible options */}
      {visibleOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value === selected ? "" : opt.value)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
            selected === opt.value
              ? "bg-[#f81828] text-white"
              : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"
          }`}
        >
          <span className="truncate">{opt.value}</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            {opt.count !== undefined && (
              <span className={`text-[9px] font-mono ${selected === opt.value ? "text-white/70" : "text-gray-600"}`}>
                {opt.count}
              </span>
            )}
            {selected === opt.value && <span className="text-[10px] font-black opacity-70">✓</span>}
          </div>
        </button>
      ))}

      {/* Show more/less button */}
      {shouldCollapse && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all group"
          style={{
            background: "rgba(248,24,40,0.05)",
            border: "1px solid rgba(248,24,40,0.15)",
            color: "#f81828",
          }}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              Pokaż mniej
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              Pokaż wszystkie {options.length} opcji
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default ProgressiveDisclosure;
