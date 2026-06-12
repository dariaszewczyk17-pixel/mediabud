import React, { useState, useMemo, useCallback } from "react";
import { X, SlidersHorizontal, ChevronDown, Tag, Zap, Check, RotateCcw } from "lucide-react";

/* ================================================================
   FUTURISTIC FILTER BAR — Industrial Pulse 2026
   
   Features:
   - Glassmorphism sticky toolbar
   - Filter chips with dynamic counts
   - Animated dropdown panels
   - Active filter pills with remove
   - Mobile drawer with slide animation
================================================================ */

interface FilterOption {
  value: string;
  count?: number;
}

interface FilterBarFuturisticProps {
  // Filter data
  brands: string[];
  units: string[];
  tags: string[];
  subcategories?: { slug: string; name: string; count: number }[];
  
  // Selected values
  selectedBrand: string;
  selectedUnit: string;
  selectedTag: string;
  selectedSubcat: string;
  sortBy: string;
  
  // Counts
  totalProducts: number;
  filteredCount: number;
  isLoading?: boolean;
  
  // Callbacks
  onBrandChange: (brand: string) => void;
  onUnitChange: (unit: string) => void;
  onTagChange: (tag: string) => void;
  onSubcatChange: (subcat: string) => void;
  onSortChange: (sort: string) => void;
  onClearAll: () => void;
}

const SORT_OPTIONS = [
  { value: "default", label: "Domyślne" },
  { value: "inStock", label: "Dostępne od ręki" },
  { value: "featured", label: "Polecane" },
  { value: "name-asc", label: "Nazwa A–Z" },
  { value: "name-desc", label: "Nazwa Z–A" },
  { value: "brand", label: "Marka A–Z" },
  { value: "new", label: "Nowości" },
];

export function FilterBarFuturistic({
  brands,
  units,
  tags,
  subcategories,
  selectedBrand,
  selectedUnit,
  selectedTag,
  selectedSubcat,
  sortBy,
  totalProducts,
  filteredCount,
  isLoading,
  onBrandChange,
  onUnitChange,
  onTagChange,
  onSubcatChange,
  onSortChange,
  onClearAll,
}: FilterBarFuturisticProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const hasActiveFilters = !!(selectedBrand || selectedUnit || selectedTag || selectedSubcat);
  const activeFilterCount = [selectedBrand, selectedUnit, selectedTag, selectedSubcat].filter(Boolean).length;

  const toggleDropdown = useCallback((name: string) => {
    setOpenDropdown(prev => prev === name ? null : name);
  }, []);

  // Filter dropdown component
  const FilterDropdown = ({ 
    name, 
    label, 
    icon: Icon, 
    options, 
    selected, 
    onChange 
  }: { 
    name: string;
    label: string;
    icon: React.ElementType;
    options: FilterOption[];
    selected: string;
    onChange: (value: string) => void;
  }) => {
    const isOpen = openDropdown === name;
    
    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(name)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300"
          style={{
            background: selected
              ? "rgba(248,24,40,0.15)"
              : "rgba(255,255,255,0.03)",
            border: selected
              ? "1px solid rgba(248,24,40,0.4)"
              : "1px solid rgba(255,255,255,0.08)",
            color: selected ? "#f81828" : "#9ca3af",
            boxShadow: selected ? "0 0 12px rgba(248,24,40,0.15)" : "none",
          }}
        >
          <Icon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{selected || label}</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          {selected && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#f81828]" style={{ boxShadow: "0 0 6px rgba(248,24,40,0.8)" }} />
          )}
        </button>

        {/* Dropdown panel */}
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
            <div
              className="absolute top-full left-0 mt-2 z-50 min-w-[200px] max-h-[300px] overflow-y-auto rounded-xl p-2"
              style={{
                background: "rgba(15,15,15,0.98)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(248,24,40,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
                animation: "dropdownIn 0.2s ease-out",
              }}
            >
              {/* Clear option */}
              <button
                onClick={() => { onChange(""); setOpenDropdown(null); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                  !selected ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>Wszystkie</span>
                {!selected && <Check className="w-3 h-3" />}
              </button>

              <div className="h-px my-1.5" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Options */}
              {options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpenDropdown(null); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between gap-2 ${
                    selected === opt.value
                      ? "bg-[#f81828] text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="truncate">{opt.value}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {opt.count !== undefined && (
                      <span className={`text-[9px] font-mono ${selected === opt.value ? "text-white/70" : "text-gray-600"}`}>
                        {opt.count}
                      </span>
                    )}
                    {selected === opt.value && <Check className="w-3 h-3" />}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      {/* ── Sticky Toolbar ── */}
      <div
        className="sticky z-30 rounded-2xl mb-6"
        style={{
          top: "calc(var(--header-h, 140px) + 8px)",
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(248,24,40,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.02) inset",
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl overflow-hidden">
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #f81828, rgba(248,24,40,0.3) 50%, transparent)",
          }} />
        </div>

        <div className="flex items-center justify-between px-4 py-3 gap-4 flex-wrap">
          {/* Left: Count + Filters */}
          <div className="flex items-center gap-3 flex-wrap flex-1">
            {/* Product count */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="w-1 h-5 bg-[#f81828] rounded-full" style={{ boxShadow: "0 0 8px rgba(248,24,40,0.6)" }} />
              <span className="text-xs font-black text-white uppercase tracking-widest font-mono">Produkty</span>
              <span
                className="text-[11px] font-black px-2.5 py-1 rounded-lg font-mono tabular-nums"
                style={{
                  background: "rgba(248,24,40,0.1)",
                  border: "1px solid rgba(248,24,40,0.25)",
                  color: "#ff9aa3",
                }}
              >
                {isLoading ? "···" : filteredCount}
              </span>
            </div>

            {/* Desktop filters */}
            <div className="hidden lg:flex items-center gap-2">
              {brands.length > 0 && (
                <FilterDropdown
                  name="brand"
                  label="Marka"
                  icon={Tag}
                  options={brands.map(b => ({ value: b }))}
                  selected={selectedBrand}
                  onChange={onBrandChange}
                />
              )}

              {units.length > 1 && (
                <FilterDropdown
                  name="unit"
                  label="Jednostka"
                  icon={Zap}
                  options={units.map(u => ({ value: u }))}
                  selected={selectedUnit}
                  onChange={onUnitChange}
                />
              )}

              {tags.length > 0 && (
                <FilterDropdown
                  name="tag"
                  label="Typ"
                  icon={Tag}
                  options={tags.map(t => ({ value: t }))}
                  selected={selectedTag}
                  onChange={onTagChange}
                />
              )}

              {/* Clear all */}
              {hasActiveFilters && (
                <button
                  onClick={onClearAll}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all hover:bg-[#f81828]/10"
                  style={{
                    color: "#f81828",
                    border: "1px solid rgba(248,24,40,0.25)",
                  }}
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Right: Mobile filter button + Sort */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all"
              style={{
                background: activeFilterCount > 0 ? "rgba(248,24,40,0.15)" : "rgba(255,255,255,0.03)",
                border: activeFilterCount > 0 ? "1px solid rgba(248,24,40,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color: activeFilterCount > 0 ? "#f81828" : "#9ca3af",
              }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filtry
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#f81828] text-white text-[10px] font-black flex items-center justify-center"
                  style={{ boxShadow: "0 0 8px rgba(248,24,40,0.5)" }}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort dropdown */}
            <FilterDropdown
              name="sort"
              label="Sortuj"
              icon={SlidersHorizontal}
              options={SORT_OPTIONS.map(s => ({ value: s.value }))}
              selected={sortBy !== "default" ? SORT_OPTIONS.find(s => s.value === sortBy)?.label || "" : ""}
              onChange={onSortChange}
            />
          </div>
        </div>
      </div>

      {/* ── Active Filter Pills ── */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedBrand && (
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.2)", color: "#f81828" }}>
              <Tag className="w-3 h-3" /> {selectedBrand}
              <button onClick={() => onBrandChange("")} className="hover:text-white transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedUnit && (
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.2)", color: "#f81828" }}>
              <Zap className="w-3 h-3" /> {selectedUnit}
              <button onClick={() => onUnitChange("")} className="hover:text-white transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedTag && (
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.2)", color: "#f81828" }}>
              {selectedTag}
              <button onClick={() => onTagChange("")} className="hover:text-white transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSubcat && (
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.2)", color: "#f81828" }}>
              {selectedSubcat}
              <button onClick={() => onSubcatChange("")} className="hover:text-white transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* ── Mobile Filter Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div
            className="absolute left-0 top-0 h-full w-[85vw] max-w-[320px] flex flex-col"
            style={{
              background: "linear-gradient(180deg, #0d0d0d 0%, #080808 100%)",
              borderRight: "1px solid rgba(248,24,40,0.2)",
              boxShadow: "4px 0 40px rgba(0,0,0,0.7)",
              animation: "slideInLeft 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(248,24,40,0.15)" }}>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#f81828]" />
                <span className="font-black text-white tracking-widest uppercase">Filtry</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Brands */}
              {brands.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Tag className="w-3 h-3 text-[#f81828]" /> Marka
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => onBrandChange("")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        !selectedBrand ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-white/5"
                      }`}
                    >
                      Wszystkie marki
                    </button>
                    {brands.slice(0, 20).map(brand => (
                      <button
                        key={brand}
                        onClick={() => onBrandChange(brand === selectedBrand ? "" : brand)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                          selectedBrand === brand ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-white/5"
                        }`}
                      >
                        <span>{brand}</span>
                        {selectedBrand === brand && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Units */}
              {units.length > 1 && (
                <div>
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-[#f81828]" /> Jednostka
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onUnitChange("")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        !selectedUnit ? "bg-[#f81828] text-white" : "text-gray-500 border border-white/10 hover:border-[#f81828]/50"
                      }`}
                    >
                      Wszystkie
                    </button>
                    {units.map(unit => (
                      <button
                        key={unit}
                        onClick={() => onUnitChange(unit === selectedUnit ? "" : unit)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedUnit === unit ? "bg-[#f81828] text-white" : "text-gray-500 border border-white/10 hover:border-[#f81828]/50"
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Tag className="w-3 h-3 text-[#f81828]" /> Typ produktu
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => onTagChange("")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        !selectedTag ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-white/5"
                      }`}
                    >
                      Wszystkie
                    </button>
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => onTagChange(tag === selectedTag ? "" : tag)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize flex items-center justify-between ${
                          selectedTag === tag ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-white/5"
                        }`}
                      >
                        <span>{tag.replace(/-/g, " ")}</span>
                        {selectedTag === tag && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sort */}
              <div>
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <SlidersHorizontal className="w-3 h-3 text-[#f81828]" /> Sortowanie
                </h3>
                <div className="space-y-1">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => onSortChange(opt.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                        sortBy === opt.value ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-white/5"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {sortBy === opt.value && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full h-12 rounded-xl text-sm font-black text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #f81828, #c8000f)",
                  boxShadow: "0 0 20px rgba(248,24,40,0.3)",
                }}
              >
                Pokaż {isLoading ? "···" : filteredCount} produktów
              </button>
            </div>
          </div>

          <style>{`
            @keyframes slideInLeft {
              from { transform: translateX(-100%); }
              to { transform: translateX(0); }
            }
            @keyframes dropdownIn {
              from { opacity: 0; transform: translateY(-8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}

export default FilterBarFuturistic;
