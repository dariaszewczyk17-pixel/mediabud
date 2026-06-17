import { useEffect, useState } from "react";

/**
 * SplashScreen — animacja ładowania strony z logiem Media Bud.
 * Wyświetlana tylko raz na sesję (sessionStorage).
 * Czas trwania: ~0.8 s (skrócono z 1.8 s dla lepszego LCP).
 */
export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // in → hold po 200 ms
    const t1 = setTimeout(() => setPhase("hold"), 200);
    // hold → out po 550 ms
    const t2 = setTimeout(() => setPhase("out"), 550);
    // unmount + notify po 800 ms
    const t3 = setTimeout(() => onDone(), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const opacity = phase === "out" ? 0 : 1;
  const logoScale = phase === "in" ? 0.82 : 1;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{
        background: "#080808",
        opacity,
        transition: phase === "out"
          ? "opacity .38s cubic-bezier(.4,0,.2,1)"
          : "opacity .28s ease",
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      {/* Siatka tła — jak na stronie głównej */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glów efekt centralny */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 320, height: 320,
          background: "radial-gradient(circle,rgba(248,24,40,0.12) 0%,transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Logo container */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          transition: "transform .55s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        {/* Czerwona kreska nad tekstem */}
        <div
          className="mx-auto mb-4"
          style={{
            width: phase === "in" ? 0 : 80,
            height: 3,
            background: "#f81828",
            borderRadius: 2,
            transition: "width .45s cubic-bezier(.4,0,.2,1) .1s",
          }}
        />

        {/* Nazwa firmy */}
        <div
          className="text-center"
          style={{
            fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif",
            letterSpacing: "0.18em",
          }}
        >
          <span
            className="block font-black uppercase"
            style={{
              fontSize: "clamp(2.2rem,8vw,3.4rem)",
              color: "#ffffff",
              lineHeight: 1,
              opacity: phase === "in" ? 0 : 1,
              transition: "opacity .3s ease .15s",
            }}
          >
            MEDIA
          </span>
          <span
            className="block font-black uppercase"
            style={{
              fontSize: "clamp(2.2rem,8vw,3.4rem)",
              color: "#f81828",
              lineHeight: 1,
              opacity: phase === "in" ? 0 : 1,
              transition: "opacity .3s ease .25s",
            }}
          >
            BUD
          </span>
        </div>

        {/* Podtytuł */}
        <p
          className="text-center mt-2 uppercase tracking-widest"
          style={{
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.25em",
            opacity: phase === "in" ? 0 : 1,
            transition: "opacity .3s ease .35s",
          }}
        >
          Skład budowlany · Lublin
        </p>
      </div>

      {/* Pasek postępu na dole */}
      <div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          background: "#f81828",
          width: phase === "in" ? "0%" : phase === "hold" ? "80%" : "100%",
          transition:
            phase === "hold"
              ? "width .95s cubic-bezier(.4,0,.6,1)"
              : phase === "out"
              ? "width .38s ease"
              : "none",
          boxShadow: "0 0 8px rgba(248,24,40,0.6)",
        }}
      />
    </div>
  );
}
