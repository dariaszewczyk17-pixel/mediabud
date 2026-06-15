import { useEffect, useRef } from "react";

interface LoadMoreButtonProps {
  hasMore: boolean;
  loading: boolean;
  loadMore: () => void;
  total: number | null;
  loaded: number;
  /** Automatyczny infinite scroll (IntersectionObserver) — domyślnie true */
  auto?: boolean;
}

/**
 * Przycisk "Załaduj więcej" z opcjonalnym auto-load (infinite scroll).
 * Gdy `auto=true`, ładuje kolejną stronę gdy przycisk wejdzie w viewport.
 */
export function LoadMoreButton({
  hasMore,
  loading,
  loadMore,
  total,
  loaded,
  auto = true,
}: LoadMoreButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Auto-load via IntersectionObserver
  useEffect(() => {
    if (!auto || !hasMore || loading) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { rootMargin: "400px" } // Ładuj 400px przed widocznością
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [auto, hasMore, loading, loadMore]);

  if (!hasMore && !loading) return null;

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 py-8">
      {loading && (
        <div className="flex items-center gap-2 text-sm text-[#888]">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#f81828] border-t-transparent" />
          <span>Ładowanie produktów...</span>
        </div>
      )}

      {!loading && hasMore && !auto && (
        <button
          onClick={loadMore}
          className="group relative overflow-hidden rounded-lg border border-[#f81828]/30 bg-[#141414] px-8 py-3 font-mono text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-[#f81828] hover:shadow-[0_0_20px_rgba(248,24,40,0.2)]"
        >
          <span className="relative z-10">
            Załaduj więcej ({loaded} z {total})
          </span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#f81828]/10 to-transparent transition-transform group-hover:translate-x-full" />
        </button>
      )}

      {!loading && hasMore && auto && (
        <p className="text-xs text-[#666] font-mono">
          {loaded} z {total} produktów
        </p>
      )}
    </div>
  );
}
