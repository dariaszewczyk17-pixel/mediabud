/**
 * StickyCTA — sticky przycisk "Zapytaj o cenę" na mobile
 * Pojawia się gdy główny CTA znika z widoku
 */

import { useState, useEffect, useRef } from "react";
import { Phone, MessageSquare, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyCTAProps {
  productName: string;
  onQuoteClick: () => void;
  className?: string;
}

export function StickyCTA({ productName, onQuoteClick, className = "" }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Znajdź główny przycisk CTA na stronie
    const mainCTA = document.querySelector('[data-main-cta="true"]');
    
    if (!mainCTA) {
      // Jeśli nie ma głównego CTA, pokaż sticky po scrollu
      const handleScroll = () => {
        setIsVisible(window.scrollY > 400);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    // Obserwuj główny CTA
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Pokaż sticky gdy główny CTA znika z widoku
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" } // Uwzględnij sticky header
    );

    observerRef.current.observe(mainCTA);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Ukryj na desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Backdrop gdy rozwinięte */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sticky bar — siedzi PONAD BottomNav (offset = 56px + safe-area) */}
      <div
        className={`
          fixed left-0 right-0 z-50
          transform transition-transform duration-300 ease-out
          ${isVisible ? "translate-y-0" : "translate-y-full"}
          ${className}
        `}
        style={{ bottom: "calc(56px + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* Rozwinięty panel */}
        {isExpanded && (
          <div 
            className="bg-[#0f0f0f] border-t border-white/10 p-4 space-y-3"
            style={{
              boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
            }}
          >
            {/* Nazwa produktu */}
            <div className="text-sm text-white/70 line-clamp-1">
              {productName}
            </div>

            {/* Przyciski */}
            <div className="grid grid-cols-2 gap-3">
              {/* Zadzwoń */}
              <a
                href="tel:+48533553344"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/10 text-white font-medium transition-colors hover:bg-white/20"
              >
                <Phone className="w-4 h-4" />
                <span>Zadzwoń</span>
              </a>

              {/* Zapytaj o cenę */}
              <Button
                onClick={() => {
                  setIsExpanded(false);
                  onQuoteClick();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#f81828] text-white font-medium hover:bg-[#d91424]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Zapytaj</span>
              </Button>
            </div>

            {/* Info */}
            <div className="text-[10px] text-white/40 text-center">
              Odpowiadamy w ciągu 24h · Pon–Pt 7:00–16:00
            </div>
          </div>
        )}

        {/* Główny bar */}
        <div 
          className="bg-[#080808] border-t border-white/10 px-4 py-3 flex items-center gap-3"
          style={{
            boxShadow: "0 -4px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* Expand button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
            aria-label={isExpanded ? "Zwiń" : "Rozwiń opcje"}
          >
            <ChevronUp 
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} 
            />
          </button>

          {/* Główny CTA */}
          <Button
            onClick={onQuoteClick}
            className="flex-1 py-3 bg-[#f81828] hover:bg-[#d91424] text-white font-bold text-sm rounded-lg transition-colors"
            data-sticky-cta="true"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Zapytaj o cenę
          </Button>

          {/* Quick call */}
          <a
            href="tel:+48533553344"
            className="p-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Zadzwoń"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

      </div>
    </>
  );
}

export default StickyCTA;
