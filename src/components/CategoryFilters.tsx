/**
 * CategoryFilters — filtry parametrów technicznych na stronie kategorii
 * Zaprojektowane na podstawie analizy Baymard Institute
 */

import { useState, useMemo, useCallback } from "react";
import { ChevronDown, X, Filter, RotateCcw } from "lucide-react";
import { getCategoryFilters, type FilterConfig } from "@/lib/categoryConfig";
import { Button } from "@/components/ui/button";

export type ActiveFilters = Record<string, string[]>;

interface CategoryFiltersProps {
  categorySlug: string;
  activeFilters: ActiveFilters;
  onFiltersChange: (filters: ActiveFilters) => void;
  productCount?: number;
  className?: string;
}

export function CategoryFilters({
  categorySlug,
  activeFilters,
  onFiltersChange,
  productCount,
  className = "",
}: CategoryFiltersProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const filtersConfig = getCategoryFilters(categorySlug);

  // Liczba aktywnych filtrów
  const activeCount = useMemo(() => {
    return Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0);
  }, [activeFilters]);

  // Toggle wartości filtra
  const toggleFilterValue = useCallback((filterKey: string, value: string) => {
    const current = activeFilters[filterKey] || [];
    const newValues = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    onFiltersChange({
      ...activeFilters,
      [filterKey]: newValues,
    });
  }, [activeFilters, onFiltersChange]);

  // Wyczyść wszystkie filtry
  const clearAllFilters = useCallback(() => {
    onFiltersChange({});
  }, [onFiltersChange]);

  // Wyczyść pojedynczy filtr
  const clearFilter = useCallback((filterKey: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterKey];
    onFiltersChange(newFilters);
  }, [activeFilters, onFiltersChange]);

  if (!filtersConfig.length) {
    return null;
  }

  return (
    <>
      {/* Mobile trigger */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <Filter className="w-4 h-4" />
          <span>Filtry</span>
          {activeCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-[#f81828] rounded-full">
              {activeCount}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] bg-[#0f0f0f] rounded-t-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#f81828]" />
                <span className="font-bold text-white">Filtry</span>
                {activeCount > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-[#f81828] text-white rounded-full">
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh]">
              {filtersConfig.map((filter) => (
                <FilterSection
                  key={filter.key}
                  filter={filter}
                  activeValues={activeFilters[filter.key] || []}
                  onToggle={(value) => toggleFilterValue(filter.key, value)}
                  onClear={() => clearFilter(filter.key)}
                  isExpanded={true}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 flex gap-3">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                disabled={activeCount === 0}
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Wyczyść
              </Button>
              <Button
                onClick={() => setIsMobileOpen(false)}
                className="flex-1 bg-[#f81828] hover:bg-[#d91424] text-white"
              >
                Pokaż {productCount ?? "—"} produktów
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop filters */}
      <div className={`hidden md:block ${className}`}>
        {/* Active filters chips */}
        {activeCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(activeFilters).map(([key, values]) =>
              values.map((value) => (
                <button
                  key={`${key}-${value}`}
                  onClick={() => toggleFilterValue(key, value)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#f81828]/20 text-[#f81828] rounded-full hover:bg-[#f81828]/30 transition-colors"
                >
                  <span>{value}</span>
                  <X className="w-3 h-3" />
                </button>
              ))
            )}
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Wyczyść wszystkie</span>
            </button>
          </div>
        )}

        {/* Filter sections */}
        <div className="space-y-2">
          {filtersConfig.map((filter) => (
            <FilterSection
              key={filter.key}
              filter={filter}
              activeValues={activeFilters[filter.key] || []}
              onToggle={(value) => toggleFilterValue(filter.key, value)}
              onClear={() => clearFilter(filter.key)}
              isExpanded={expandedFilter === filter.key}
              onExpandToggle={() => setExpandedFilter(
                expandedFilter === filter.key ? null : filter.key
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// ─── FILTER SECTION ──────────────────────────────────────────────────────────

interface FilterSectionProps {
  filter: FilterConfig;
  activeValues: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
  isExpanded: boolean;
  onExpandToggle?: () => void;
}

function FilterSection({
  filter,
  activeValues,
  onToggle,
  onClear,
  isExpanded,
  onExpandToggle,
}: FilterSectionProps) {
  const hasActive = activeValues.length > 0;

  if (filter.type === "select" && filter.options) {
    return (
      <div className="border border-white/10 rounded-lg overflow-hidden">
        {/* Header */}
        <button
          onClick={onExpandToggle}
          className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">{filter.label}</span>
            {hasActive && (
              <span className="px-1.5 py-0.5 text-[10px] bg-[#f81828] text-white rounded">
                {activeValues.length}
              </span>
            )}
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-white/60 transition-transform ${isExpanded ? "rotate-180" : ""}`} 
          />
        </button>

        {/* Options */}
        {isExpanded && (
          <div className="p-3 space-y-2 bg-black/20">
            {filter.options.map((option) => {
              const isActive = activeValues.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => onToggle(option)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                    ${isActive 
                      ? "bg-[#f81828] text-white" 
                      : "bg-white/5 text-white/80 hover:bg-white/10"
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (filter.type === "checkbox" && filter.options) {
    return (
      <div className="border border-white/10 rounded-lg overflow-hidden">
        {/* Header */}
        <button
          onClick={onExpandToggle}
          className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">{filter.label}</span>
            {hasActive && (
              <span className="px-1.5 py-0.5 text-[10px] bg-[#f81828] text-white rounded">
                {activeValues.length}
              </span>
            )}
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-white/60 transition-transform ${isExpanded ? "rotate-180" : ""}`} 
          />
        </button>

        {/* Checkboxes */}
        {isExpanded && (
          <div className="p-3 space-y-1 bg-black/20">
            {filter.options.map((option) => {
              const isActive = activeValues.includes(option);
              return (
                <label
                  key={option}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div 
                    className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                      ${isActive 
                        ? "bg-[#f81828] border-[#f81828]" 
                        : "border-white/30 hover:border-white/50"
                      }
                    `}
                  >
                    {isActive && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => onToggle(option)}
                    className="sr-only"
                  />
                  <span className="text-sm text-white/80">{option}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default CategoryFilters;
