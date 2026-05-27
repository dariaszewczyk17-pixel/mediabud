import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useReveal(options: UseRevealOptions = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -40px 0px", once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}

/** Utility: staggered children reveal classes */
export function staggerClass(index: number, base = 80): string {
  return `transition-all duration-700 ease-out`
    + ` [transition-delay:${index * base}ms]`;
}

/** Returns Tailwind-compatible reveal classes */
export function revealClass(visible: boolean, variant: "fade" | "up" | "left" | "right" | "scale" = "up"): string {
  const base = "transition-all duration-700 ease-out";
  const variants = {
    fade:  visible ? "opacity-100" : "opacity-0",
    up:    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    left:  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
    right: visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
    scale: visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
  };
  return `${base} ${variants[variant]}`;
}
