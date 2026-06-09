import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Consent = { necessary: true; analytics: boolean; marketing: boolean };

const STORAGE_KEY = "mb_cookie_consent";

function loadConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function saveConsent(c: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {
    /* ignore */
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!loadConsent()) {
      /* Małe opóźnienie — nie blokuj First Paint */
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  const accept = (all: boolean) => {
    saveConsent({ necessary: true, analytics: all || analytics, marketing: all || marketing });
    setVisible(false);
  };

  return (
    <>
      {/* Backdrop — tylko gdy details otwarte */}
      {details && (
        <div
          className="fixed inset-0 z-[9997]"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setDetails(false)}
        />
      )}

      {/* Baner dolny */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9998] px-4 py-4 md:px-6 md:py-5"
        style={{
          background: "#0c0c0c",
          borderTop: "1px solid rgba(248,24,40,0.25)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.7)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform .35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Czerwona kreska top */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828 0%,rgba(248,24,40,0.2) 60%,transparent 100%)" }} />

        {!details ? (
          /* ── Widok prosty ───────────────────────────────── */
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Ikona */}
            <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.2)" }}>
              🍪
            </div>

            {/* Tekst */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm mb-0.5">Ta strona używa plików cookies</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Stosujemy cookies niezbędne do działania strony oraz (opcjonalnie) analityczne do analizy ruchu.
                Szczegóły w{" "}
                <Link to="/polityka-prywatnosci" className="text-[#f81828] hover:underline">
                  Polityce prywatności
                </Link>.
              </p>
            </div>

            {/* Przyciski */}
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              <button
                onClick={() => setDetails(true)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                Dostosuj
              </button>
              <button
                onClick={() => accept(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}
              >
                Tylko niezbędne
              </button>
              <button
                onClick={() => accept(true)}
                className="px-5 py-2 rounded-lg text-xs font-bold text-white transition-all hover:brightness-90"
                style={{ background: "#f81828" }}
              >
                Akceptuję wszystkie
              </button>
            </div>
          </div>
        ) : (
          /* ── Widok szczegółowy ──────────────────────────── */
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-base">Ustawienia cookies</h2>
              <button onClick={() => setDetails(false)} className="text-gray-500 hover:text-white transition-colors text-xl leading-none">×</button>
            </div>

            <div className="space-y-3 mb-5">
              {/* Niezbędne — zawsze włączone */}
              <CookieRow
                title="Niezbędne"
                desc="Zapewniają podstawowe działanie strony (sesja, nawigacja). Nie można ich wyłączyć."
                checked={true}
                disabled={true}
                onChange={() => {}}
              />
              {/* Analityczne */}
              <CookieRow
                title="Analityczne (Google Analytics 4)"
                desc="Pozwalają nam mierzyć ruch i poprawiać stronę. Dane są anonimizowane."
                checked={analytics}
                disabled={false}
                onChange={setAnalytics}
              />
              {/* Marketingowe */}
              <CookieRow
                title="Marketingowe"
                desc="Służą do wyświetlania spersonalizowanych reklam. Aktualnie nie są stosowane."
                checked={marketing}
                disabled={false}
                onChange={setMarketing}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => accept(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Tylko niezbędne
              </button>
              <button
                onClick={() => accept(true)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Akceptuję zaznaczone
              </button>
              <button
                onClick={() => accept(true)}
                className="px-5 py-2 rounded-lg text-xs font-bold text-white transition-all hover:brightness-90"
                style={{ background: "#f81828" }}
              >
                Akceptuję wszystkie
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Toggle row ──────────────────────────────────────────────── */
function CookieRow({
  title, desc, checked, disabled, onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className="flex items-start gap-4 px-4 py-3 rounded-xl"
      style={{ background: "#151515", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-bold mb-0.5">{title}</p>
        <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
      </div>
      {/* Toggle switch */}
      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`flex-shrink-0 relative w-11 h-6 rounded-full transition-all ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        style={{ background: checked ? "#f81828" : "rgba(255,255,255,0.12)" }}
        aria-checked={checked}
        role="switch"
      >
        <span
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
          style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}

/* ─── Hook eksportowany dla innych komponentów ──────────────── */
export function useCookieConsent(): Consent | null {
  return loadConsent();
}
