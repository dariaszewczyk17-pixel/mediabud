import { useState, useRef, useEffect } from "react";

/**
 * Odczytuje aktualną wysokość sticky headera z CSS custom property --header-h.
 * Fallback: 140px (pełna wysokość headera Media Bud gdy niezescrollowany).
 */
const getHeaderH = (): number => {
  if (typeof window === "undefined") return 140;
  const val = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-h")
    .trim();
  return parseInt(val, 10) || 140;
};

interface UseHeaderAwareRevealOptions {
  /** Procent elementu widoczny w viewport zanim trigger odpali. Default: 0.06 */
  threshold?: number;
  /** Ile px poniżej viewport preloadować (pozytywna wartość). Default: 0 */
  bottomMargin?: number;
}

/**
 * IntersectionObserver hook uwzględniający wysokość sticky headera.
 *
 * Problem który rozwiązuje:
 * Standardowy rootMargin "0px 0px 0px 0px" triggeruje animacje/countery gdy
 * element wchodzi w viewport od y=0 — ale sticky header zajmuje 44–172px
 * od góry, więc element jest faktycznie ZASŁONIĘTY headerem w momencie trigger.
 *
 * Rozwiązanie:
 * rootMargin: `-${headerH + 8}px 0px ${bottomMargin}px 0px`
 * Ujemna wartość top = element musi być o tyle px WEWNĄTRZ viewport od góry
 * (czyli poniżej dolnej krawędzi sticky headera) żeby trigger odpalił.
 *
 * Użycie:
 *   const { ref, visible } = useHeaderAwareReveal({ threshold: 0.25 });
 *   <span ref={ref as React.RefObject<HTMLSpanElement>}>...</span>
 *
 *   // z destrukturyzacją dla zgodności z useInView:
 *   const { ref, visible: inView } = useHeaderAwareReveal({ threshold: 0.1 });
 */
export function useHeaderAwareReveal(options?: UseHeaderAwareRevealOptions) {
  const { threshold = 0.06, bottomMargin = 0 } = options ?? {};

  const ref = useRef<HTMLElement>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [visible, setVisible] = useState(prefersReduced);

  useEffect(() => {
    // Jeśli użytkownik preferuje brak animacji — od razu widoczny
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const headerH = getHeaderH(); // odczyt w momencie montowania (przed scrollem)
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect(); // jednorazowy trigger — brak powtórzeń
        }
      },
      {
        threshold,
        rootMargin: `-${headerH + 8}px 0px ${bottomMargin}px 0px`,
        //           ↑ top offset: element musi być PONIŻEJ sticky headera
        //                               ↑ bottom: opcjonalny preload od dołu
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, bottomMargin, prefersReduced]);

  return { ref, visible };
}
