// src/components/FuturisticIcons.tsx
// Autorskie ikony geometryczne dla marki Media Bud — nie używają żadnych bibliotek
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 24) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "square" as const, strokeLinejoin: "miter" as const });

/* ── SERVICES ──────────────────────────────────────────────── */

/** Dom od podstaw — dach + ściany + drzwi */
export function IconHouse({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polyline points="2,13 12,3 22,13" />
    <polyline points="5,13 5,22 19,22 19,13" />
    <rect x="9.5" y="16" width="5" height="6" />
  </svg>;
}

/** Deweloperzy B2B — dwa nakładające się kwadraty */
export function IconDeveloper({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <rect x="3" y="3" width="11" height="11" />
    <rect x="10" y="10" width="11" height="11" />
    <line x1="10" y1="10" x2="14" y2="10" />
    <line x1="10" y1="10" x2="10" y2="14" />
  </svg>;
}

/** Wykończenia pod klucz — szpachla/trowel (romb + rękojeść) */
export function IconFinish({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polygon points="12,3 20,10 12,17 4,10" />
    <line x1="12" y1="17" x2="12" y2="22" />
    <line x1="9" y1="22" x2="15" y2="22" />
  </svg>;
}

/** Dachy — ostry szczyt dachu z budynkiem */
export function IconRoof({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polyline points="1,15 12,4 23,15" />
    <polyline points="4,15 4,22 20,22 20,15" />
    <line x1="4" y1="22" x2="20" y2="22" />
    <line x1="8" y1="15" x2="8" y2="22" />
    <line x1="16" y1="15" x2="16" y2="22" />
  </svg>;
}

/** Elewacje — ceglana siatka fasady */
export function IconFacade({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <rect x="3" y="3" width="18" height="18" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="9" />
    <line x1="15" y1="3" x2="15" y2="9" />
    <line x1="6" y1="9" x2="6" y2="15" />
    <line x1="14" y1="9" x2="14" y2="15" />
    <line x1="10" y1="15" x2="10" y2="21" />
    <line x1="18" y1="15" x2="18" y2="21" />
  </svg>;
}

/** Galerie/Obiekty — wielopiętrowy budynek z oknami */
export function IconBuilding({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polyline points="4,22 4,2 20,2 20,22" />
    <line x1="4" y1="22" x2="20" y2="22" />
    <line x1="4" y1="8" x2="20" y2="8" />
    <line x1="4" y1="14" x2="20" y2="14" />
    <line x1="10" y1="2" x2="10" y2="22" />
    <line x1="16" y1="2" x2="16" y2="22" />
  </svg>;
}

/* ── HOME FEATURES ─────────────────────────────────────────── */

/** Doradztwo gratis — celownik z kwadratem */
export function IconTarget({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <line x1="12" y1="2" x2="12" y2="7" />
    <line x1="12" y1="17" x2="12" y2="22" />
    <line x1="2" y1="12" x2="7" y2="12" />
    <line x1="17" y1="12" x2="22" y2="12" />
    <rect x="8" y="8" width="8" height="8" />
    <line x1="12" y1="10" x2="12" y2="14" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>;
}

/** Od materiałów po klucze — warstwy/stack */
export function IconStack({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polygon points="12,4 22,9 12,14 2,9" />
    <polyline points="2,14 12,19 22,14" />
    <polyline points="2,19 12,24 22,19" strokeOpacity="0.4" />
  </svg>;
}

/** Dostawa — trasa L z strzałką */
export function IconRoute({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polyline points="3,7 3,17 17,17" />
    <polygon points="13,13 17,17 13,21" />
    <circle cx="6" cy="7" r="2" />
    <circle cx="20" cy="17" r="2" />
  </svg>;
}

/** Renomowane marki — diament z fasetami */
export function IconGem({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polygon points="12,2 22,8 18,22 6,22 2,8" />
    <polyline points="2,8 7,8 12,2 17,8 22,8" />
    <line x1="7" y1="8" x2="12" y2="22" />
    <line x1="17" y1="8" x2="12" y2="22" />
  </svg>;
}

/** Certyfikaty — tarcza kątowa */
export function IconShield({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polygon points="12,2 21,6 21,13 17,18 12,22 7,18 3,13 3,6" />
    <polyline points="8,12 11,15 16,9" />
  </svg>;
}

/** B2B / Sieć firm — trójkąt węzłów */
export function IconNetwork({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polygon points="12,3 21,18 3,18" />
    <circle cx="12" cy="3" r="1.5" />
    <circle cx="21" cy="18" r="1.5" />
    <circle cx="3" cy="18" r="1.5" />
    <line x1="12" y1="3" x2="12" y2="13" />
    <line x1="12" y1="13" x2="7" y2="18" />
    <line x1="12" y1="13" x2="17" y2="18" />
  </svg>;
}

/* ── HOME "DLACZEGO MB" 4 CARDS ────────────────────────────── */

/** Doradztwo techniczne — koło z promieniami (precyzja) */
export function IconPrecision({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="8" />
    <line x1="12" y1="16" x2="12" y2="22" />
    <line x1="2" y1="12" x2="8" y2="12" />
    <line x1="16" y1="12" x2="22" y2="12" />
    <line x1="4.9" y1="4.9" x2="7.8" y2="7.8" />
    <line x1="16.2" y1="16.2" x2="19.1" y2="19.1" />
    <line x1="19.1" y1="4.9" x2="16.2" y2="7.8" />
    <line x1="7.8" y1="16.2" x2="4.9" y2="19.1" />
  </svg>;
}

/** Kompleksowa obsługa — dwa połączone prostokąty (ogniwa łańcucha) */
export function IconChain({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <rect x="2" y="7" width="9" height="10" rx="0" />
    <rect x="13" y="7" width="9" height="10" rx="0" />
    <line x1="11" y1="10" x2="13" y2="10" />
    <line x1="11" y1="14" x2="13" y2="14" />
  </svg>;
}

/** Sprawdzona logistyka — ścieżka trasy */
export function IconLogistics({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polyline points="3,18 3,6 15,6" />
    <polygon points="11,3 15,6 11,9" />
    <polyline points="13,18 21,18" />
    <polygon points="18,15 21,18 18,21" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="13" cy="18" r="2" />
  </svg>;
}

/** Partner B2B — dwa strzałkowe wsporniki zwrócone ku sobie */
export function IconPartnership({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polyline points="4,6 9,12 4,18" />
    <polyline points="20,6 15,12 20,18" />
    <line x1="9" y1="12" x2="15" y2="12" />
  </svg>;
}

/* ── ABOUT VALUES ──────────────────────────────────────────── */

/** Jeden partner — dwa wsporniki (te same co IconPartnership) */
export { IconPartnership as IconOnePartner };

/** Konkretna wycena — linijka z kreskami miary */
export function IconRuler({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <line x1="3" y1="21" x2="21" y2="3" />
    <line x1="7" y1="17" x2="10" y2="14" />
    <line x1="11" y1="13" x2="14" y2="10" />
    <line x1="15" y1="9" x2="18" y2="6" />
    <line x1="5" y1="19" x2="3" y2="17" />
    <line x1="11" y1="13" x2="9" y2="11" />
    <line x1="17" y1="7" x2="15" y2="5" />
  </svg>;
}

/** Sprawdzone ekipy — rusztowanie (pionowe słupy + poziome belki) */
export function IconScaffold({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <line x1="3" y1="2" x2="3" y2="22" />
    <line x1="21" y1="2" x2="21" y2="22" />
    <line x1="3" y1="2" x2="21" y2="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="3" y1="18" x2="21" y2="18" />
    <line x1="9" y1="2" x2="9" y2="22" />
    <line x1="15" y1="2" x2="15" y2="22" />
    <line x1="3" y1="22" x2="21" y2="22" />
  </svg>;
}

/** Doradztwo tech — cyrkiel (dwie nogi + środek) */
export function IconCompass({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <line x1="12" y1="3" x2="5" y2="21" />
    <line x1="12" y1="3" x2="19" y2="21" />
    <line x1="7" y1="15" x2="17" y2="15" />
    <circle cx="12" cy="3" r="1.5" />
  </svg>;
}

/** Duże i małe projekty — 3 słupki rosnące (skala) */
export function IconScale({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <rect x="2" y="16" width="5" height="6" />
    <rect x="9" y="10" width="6" height="12" />
    <rect x="17" y="4" width="5" height="18" />
    <line x1="1" y1="22" x2="23" y2="22" />
  </svg>;
}

/** Lublin i region — angular pin lokalizacji */
export function IconPin({ size, ...p }: IconProps) {
  return <svg {...base(size)} {...p}>
    <polygon points="12,22 3,10 7,3 17,3 21,10" />
    <rect x="10" y="9" width="4" height="4" />
  </svg>;
}
