import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Calculator, Phone, ArrowRight, ChevronRight, Info, Copy, Check } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

type CalcId = "tynk" | "farba" | "styropian" | "klej" | "plytki" | "izolacja";

interface CalcDef {
  id: CalcId;
  label: string;
  icon: string;
  desc: string;
  slug: string;
  categoryHref: string;
  categoryLabel: string;
}

const calcs: CalcDef[] = [
  { id: "tynk",      icon: "🪣", label: "Tynk elewacyjny",      desc: "Ile kg tynku potrzebujesz na elewację?",         slug: "tynk-elewacyjny",       categoryHref: "/kategoria/tynki",                    categoryLabel: "Tynki elewacyjne →" },
  { id: "farba",     icon: "🎨", label: "Farba elewacyjna",      desc: "Ile litrów farby na ścianę zewnętrzną?",        slug: "farba-elewacyjna",      categoryHref: "/kategoria/farby-i-rozpuszczalniki",  categoryLabel: "Farby elewacyjne →" },
  { id: "styropian", icon: "🧊", label: "Styropian / wełna",     desc: "Ile m² izolacji na ocieplenie budynku?",        slug: "styropian-welna",       categoryHref: "/kategoria/izolacje",                 categoryLabel: "Izolacje ETICS →" },
  { id: "klej",      icon: "🔧", label: "Klej do płytek",        desc: "Ile kg kleju potrzebujesz do glazury?",         slug: "klej-do-plytek",        categoryHref: "/kategoria/chemia-budowlana",         categoryLabel: "Kleje do płytek →" },
  { id: "plytki",    icon: "⬜", label: "Płytki ceramiczne",     desc: "Ile m² płytek z uwzględnieniem odpadów?",      slug: "plytki-ceramiczne",     categoryHref: "/kategoria/plytki",                   categoryLabel: "Płytki ceramiczne →" },
  { id: "izolacja",  icon: "🏗️", label: "Izolacja fundamentów", desc: "Ile m³ XPS do izolacji fundamentów i cokołu?",  slug: "izolacja-fundamentow",  categoryHref: "/kategoria/izolacje",                 categoryLabel: "Izolacje XPS →" },
];

const SLUG_TO_ID: Record<string, CalcId> = Object.fromEntries(calcs.map(c => [c.slug, c.id]));

/* ─── HowTo JSON-LD ──────────────────────────────────── */
const HOWTO_SCHEMAS: Partial<Record<CalcId, object>> = {
  klej: {
    "@context": "https://schema.org", "@type": "HowTo",
    "name": "Jak obliczyć ilość kleju do płytek ceramicznych",
    "description": "Krok po kroku: oblicz ile kleju do płytek potrzebujesz na podstawie powierzchni, formatu i stanu podłoża.",
    "totalTime": "PT3M",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "PLN", "value": "0" },
    "tool": [{ "@type": "HowToTool", "name": "Kalkulator kleju do płytek Media Bud" }],
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Zmierz powierzchnię", "text": "Oblicz m² podłogi lub ściany (długość × szerokość)." },
      { "@type": "HowToStep", "position": 2, "name": "Wybierz format płytki", "text": "Mały <20×20 cm: ~3 kg/m². Średni 30×60 cm: ~4,5 kg/m². Duży 60×60 cm: ~7 kg/m². Wielki 80×80+: ~12 kg/m² (back-buttering)." },
      { "@type": "HowToStep", "position": 3, "name": "Oceń podłoże", "text": "Gładkie +0%, nierówne +20%, ściana +40%." },
      { "@type": "HowToStep", "position": 4, "name": "Zamów worki 25 kg", "text": "Kalkulator podaje łączne zużycie w kg i liczbę worków 25 kg." },
    ],
  },
  izolacja: {
    "@context": "https://schema.org", "@type": "HowTo",
    "name": "Jak obliczyć ilość XPS do izolacji fundamentów",
    "description": "Krok po kroku: oblicz ile płyt XPS potrzebujesz do izolacji pionowej fundamentów.",
    "totalTime": "PT3M",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "PLN", "value": "0" },
    "tool": [{ "@type": "HowToTool", "name": "Kalkulator izolacji fundamentów Media Bud" }],
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Zmierz obwód budynku", "text": "Zsumuj długości wszystkich ścian stykających się z gruntem." },
      { "@type": "HowToStep", "position": 2, "name": "Zmierz wysokość izolowanej ściany", "text": "Od górnej krawędzi tynku cokołowego (~30 cm nad terenem) do ławy fundamentowej." },
      { "@type": "HowToStep", "position": 3, "name": "Wybierz grubość XPS", "text": "Standard WT2021: 10 cm. Dom pasywny NF15: 16 cm." },
      { "@type": "HowToStep", "position": 4, "name": "Odczytaj wynik", "text": "Kalkulator podaje m² brutto (z buforem), m³ i liczbę płyt 60×125 cm." },
    ],
  },
  farba: {
    "@context": "https://schema.org", "@type": "HowTo",
    "name": "Jak obliczyć ilość farby elewacyjnej",
    "description": "Krok po kroku: oblicz ile litrów farby elewacyjnej potrzebujesz na malowanie elewacji.",
    "totalTime": "PT3M",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "PLN", "value": "0" },
    "tool": [{ "@type": "HowToTool", "name": "Kalkulator farby elewacyjnej Media Bud" }],
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Zmierz pow. ścian", "text": "Oblicz sumę pow. wszystkich ścian zewnętrznych." },
      { "@type": "HowToStep", "position": 2, "name": "Odejmij otwory", "text": "Zsumuj pow. okien i drzwi i odejmij od całości." },
      { "@type": "HowToStep", "position": 3, "name": "Wybierz rodzaj farby i warstwy", "text": "Silikonowa 0,22 l/m²/warstwę, akrylowa 0,22 l/m², silikatowa 0,25 l/m²." },
      { "@type": "HowToStep", "position": 4, "name": "Zamów opakowania", "text": "Kalkulator podaje litry z buforem 10% i liczbę opakowań." },
    ],
  },
};

/* ─── Helpers ────────────────────────────────────────── */
function round2(v: number) { return Math.round(v * 100) / 100; }
function safeFloat(v: string, fallback = 0): number {
  const n = parseFloat(v);
  return isNaN(n) || !isFinite(n) ? fallback : n;
}
function fmt(v: number | null | undefined): string {
  if (v === null || v === undefined || isNaN(v)) return "—";
  return String(round2(v));
}

/* ─── TYNK ──────────────────────────────────────────── */
const TYNK_ZUZYCIE: Record<string, number> = { "1.0": 2.0, "1.5": 2.5, "2.0": 3.0, "3.0": 4.0 };

function TynkCalc() {
  const [pow, setPow] = useState("100");
  const [okna, setOkna] = useState("15");
  const [ziarno, setZiarno] = useState("1.5");
  const [bufor, setBufor] = useState("10");
  const result = useMemo(() => {
    const p = safeFloat(pow); const o = safeFloat(okna);
    if (p <= 0) return null;
    const netto = Math.max(0, p - o);
    const zuzycie = TYNK_ZUZYCIE[ziarno] ?? 2.5;
    const kgNetto = netto * zuzycie;
    const kgBrutto = kgNetto * (1 + safeFloat(bufor) / 100);
    return { netto, kgNetto, kgBrutto, worki25: Math.ceil(kgBrutto / 25) };
  }, [pow, okna, ziarno, bufor]);
  const warn = safeFloat(pow) > 0 && safeFloat(okna) >= safeFloat(pow);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Całkowita pow. ścian (m²)" value={pow} onChange={setPow} />
        <Field label="Odejmij okna i drzwi (m²)" value={okna} onChange={setOkna} min={0} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField label="Wielkość ziarna tynku" value={ziarno} onChange={setZiarno} options={[
          { v: "1.0", l: "1,0 mm — zużycie ~2,0 kg/m²" },
          { v: "1.5", l: "1,5 mm — zużycie ~2,5 kg/m² (popularne)" },
          { v: "2.0", l: "2,0 mm — zużycie ~3,0 kg/m²" },
          { v: "3.0", l: "3,0 mm — zużycie ~4,0 kg/m²" },
        ]} />
        <SelectField label="Bufor na odpady (%)" value={bufor} onChange={setBufor} options={[
          { v: "5", l: "5% — minimalne odpady" },
          { v: "10", l: "10% — standardowy bufor" },
          { v: "15", l: "15% — skomplikowana geometria" },
        ]} />
      </div>
      {warn && <Warn text="Pow. okien i drzwi ≥ pow. ścian — sprawdź dane." />}
      <Result rows={[
        { label: "Netto pow. do tynkowania", val: `${fmt(result?.netto)} m²` },
        { label: "Zużycie tynku (bez bufora)", val: `${fmt(result?.kgNetto)} kg` },
        { label: "Zużycie z buforem", val: `${fmt(result?.kgBrutto)} kg`, accent: true },
        { label: "Worki 25 kg do zamówienia", val: result ? `${result.worki25} szt.` : "—" },
      ]} copyText={result ? `Tynk: ${fmt(result.kgBrutto)} kg / ${result.worki25} worków 25 kg` : ""} />
      <Note text="Zużycia wg kart technicznych Weber, Ceresit, Atlas. Sprawdź kartę techniczną wybranego produktu." />
    </div>
  );
}

/* ─── FARBA ─────────────────────────────────────────── */
const FARBA_ZUZYCIE: Record<string, number> = {
  silikonowa: 0.22, akrylowa: 0.22, silikatowa: 0.25, mineralna: 0.28,
};

function FarbaCalc() {
  const [pow, setPow] = useState("100");
  const [okna, setOkna] = useState("15");
  const [warstwy, setWarstwy] = useState("2");
  const [rodzaj, setRodzaj] = useState("silikonowa");
  const [pojemnosc, setPojemnosc] = useState("10");
  const result = useMemo(() => {
    const p = safeFloat(pow); const o = safeFloat(okna);
    if (p <= 0) return null;
    const netto = Math.max(0, p - o);
    const zuzycie = FARBA_ZUZYCIE[rodzaj] ?? 0.22;
    const lWarstwa = netto * zuzycie;
    const lNetto = lWarstwa * safeFloat(warstwy, 2);
    const lBrutto = lNetto * 1.10; // zawsze 10% bufor
    const pojL = safeFloat(pojemnosc, 10);
    return { netto, lWarstwa, lNetto, lBrutto, opak: Math.ceil(lBrutto / pojL) };
  }, [pow, okna, warstwy, rodzaj, pojemnosc]);
  const warn = safeFloat(pow) > 0 && safeFloat(okna) >= safeFloat(pow);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Całkowita pow. ścian (m²)" value={pow} onChange={setPow} />
        <Field label="Odejmij okna i drzwi (m²)" value={okna} onChange={setOkna} min={0} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField label="Rodzaj farby elewacyjnej" value={rodzaj} onChange={setRodzaj} options={[
          { v: "silikonowa",  l: "Silikonowa (~0,22 l/m²/warstwę)" },
          { v: "akrylowa",    l: "Akrylowa (~0,22 l/m²/warstwę)" },
          { v: "silikatowa",  l: "Silikatowa (~0,25 l/m²/warstwę)" },
          { v: "mineralna",   l: "Mineralna (~0,28 l/m²/warstwę)" },
        ]} />
        <SelectField label="Liczba warstw" value={warstwy} onChange={setWarstwy} options={[
          { v: "1", l: "1 warstwa (renowacja)" },
          { v: "2", l: "2 warstwy (standard)" },
          { v: "3", l: "3 warstwy (ciemne kolory)" },
        ]} />
      </div>
      <SelectField label="Pojemność opakowania" value={pojemnosc} onChange={setPojemnosc} options={[
        { v: "5",  l: "5 l (mała puszka)" },
        { v: "10", l: "10 l (standardowa puszka)" },
        { v: "15", l: "15 l (duże wiaderko, Weber/Caparol)" },
      ]} />
      {warn && <Warn text="Pow. okien i drzwi ≥ pow. ścian — sprawdź dane." />}
      <Result rows={[
        { label: "Netto pow. do malowania", val: `${fmt(result?.netto)} m²` },
        { label: "Zużycie na 1 warstwę", val: `${fmt(result?.lWarstwa)} l` },
        { label: "Łącznie (netto, bez bufora)", val: `${fmt(result?.lNetto)} l` },
        { label: "Z buforem 10%", val: `${fmt(result?.lBrutto)} l`, accent: true },
        { label: `Opakowania ${pojemnosc} l do zamówienia`, val: result ? `${result.opak} szt.` : "—" },
      ]} copyText={result ? `Farba: ${fmt(result.lBrutto)} l / ${result.opak} opakowań ${pojemnosc} l` : ""} />
      <Note text="Zużycia wg kart technicznych producentów (Ceresit CT 42, Weber.ton). Przy chłonnym podłożu zużycie może wzrosnąć o 20–30%. Uwzględniono 10% bufor." />
    </div>
  );
}

/* ─── STYROPIAN / WEŁNA ─────────────────────────────── */
const PLATE_SIZES: Record<string, { area: number; label: string }> = {
  eps_50x100:  { area: 0.50, label: "EPS styropian 50×100 cm (0,50 m²/płyta)" },
  eps_60x120:  { area: 0.72, label: "EPS styropian 60×120 cm (0,72 m²/płyta)" },
  welna_60x100:{ area: 0.60, label: "Wełna mineralna 60×100 cm (0,60 m²/płyta)" },
  welna_60x120:{ area: 0.72, label: "Wełna mineralna 60×120 cm (0,72 m²/płyta)" },
  xps_60x125:  { area: 0.75, label: "XPS Ravatherm/Synthos 60×125 cm (0,75 m²/płyta)" },
};

function StyropianCalc() {
  const [pow, setPow] = useState("150");
  const [okna, setOkna] = useState("20");
  const [bufor, setBufor] = useState("10");
  const [material, setMaterial] = useState("eps_50x100");
  const result = useMemo(() => {
    const p = safeFloat(pow); const o = safeFloat(okna);
    if (p <= 0) return null;
    const netto = Math.max(0, p - o);
    const brutto = netto * (1 + safeFloat(bufor) / 100);
    const plate = PLATE_SIZES[material]?.area ?? 0.5;
    return { netto, brutto, plyty: Math.ceil(brutto / plate) };
  }, [pow, okna, bufor, material]);
  const warn = safeFloat(pow) > 0 && safeFloat(okna) >= safeFloat(pow);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Całkowita pow. ścian (m²)" value={pow} onChange={setPow} />
        <Field label="Odejmij okna i drzwi (m²)" value={okna} onChange={setOkna} min={0} />
      </div>
      <SelectField label="Rodzaj i format materiału izolacyjnego" value={material} onChange={setMaterial}
        options={Object.entries(PLATE_SIZES).map(([v, d]) => ({ v, l: d.label }))}
      />
      <SelectField label="Bufor na cięcia i odpady (%)" value={bufor} onChange={setBufor} options={[
        { v: "5",  l: "5% — prosta, regularna elewacja" },
        { v: "10", l: "10% — standardowy bufor" },
        { v: "15", l: "15% — elewacja z niszami i detalami" },
      ]} />
      {warn && <Warn text="Pow. okien i drzwi ≥ pow. ścian — sprawdź dane." />}
      <Result rows={[
        { label: "Netto pow. do ocieplenia", val: `${fmt(result?.netto)} m²` },
        { label: "Do zamówienia (z buforem)", val: `${fmt(result?.brutto)} m²`, accent: true },
        { label: "Liczba płyt (wg wybranego formatu)", val: result ? `${result.plyty} szt.` : "—" },
      ]} copyText={result ? `Izolacja: ${fmt(result.brutto)} m² / ${result.plyty} płyt` : ""} />
      <Note text="Przy zamówieniu uwzględnij też klej do styropianu, siatkę zbrojącą i grunt. Dla wełny mineralnej dobierz klej odpowiedni do wełny (nie EPS)." />
    </div>
  );
}

/* ─── KLEJ DO PŁYTEK ─────────────────────────────────── */
function KlejCalc() {
  const [pow, setPow] = useState("20");
  const [format, setFormat] = useState("sredni");
  const [podloze, setPodloze] = useState("gladkie");
  const [heating, setHeating] = useState(false);
  const result = useMemo(() => {
    const p = safeFloat(pow);
    if (p <= 0) return null;
    // Zużycie wg formatu (z uwzględnieniem back-buttering dla wielkoformatów)
    const base = format === "maly" ? 3.0 : format === "sredni" ? 4.5 : format === "duzy" ? 7.0 : 12.0;
    const mult = podloze === "gladkie" ? 1.0 : podloze === "nierówne" ? 1.2 : 1.4;
    const heatMult = heating ? 1.10 : 1.0;
    const kg = p * base * mult * heatMult;
    return { kg, worki25: Math.ceil(kg / 25), backButtering: format === "duzy" || format === "wielki" };
  }, [pow, format, podloze, heating]);
  return (
    <div className="space-y-5">
      <Field label="Powierzchnia płytek (m²)" value={pow} onChange={setPow} />
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField label="Format płytki" value={format} onChange={setFormat} options={[
          { v: "maly",   l: "Mały do 20×20 cm (~3,0 kg/m²)" },
          { v: "sredni", l: "Średni 30×60 cm (~4,5 kg/m²)" },
          { v: "duzy",   l: "Duży 60×60 cm (~7,0 kg/m², back-buttering)" },
          { v: "wielki", l: "Wielki 80×80+ cm (~12 kg/m², full-contact)" },
        ]} />
        <SelectField label="Stan podłoża" value={podloze} onChange={setPodloze} options={[
          { v: "gladkie",    l: "Gładkie, poziome (+0%)" },
          { v: "nierówne",   l: "Lekko nierówne (+20%)" },
          { v: "wymagające", l: "Wymagające / ściana (+40%)" },
        ]} />
      </div>
      {/* Ogrzewanie podłogowe checkbox */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div
          onClick={() => setHeating(!heating)}
          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: heating ? "#f81828" : "rgba(255,255,255,0.06)", border: `1px solid ${heating ? "#f81828" : "rgba(255,255,255,0.15)"}` }}
        >
          {heating && <Check className="w-3 h-3 text-white" />}
        </div>
        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          Ogrzewanie podłogowe UFH (+10% — wymaga kleju C2TE S1/S2)
        </span>
      </label>
      {result?.backButtering && (
        <div className="flex items-start gap-2 px-4 py-3 rounded-lg text-sm text-amber-400" style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}>
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>Format ≥60×60 cm wymaga metody <strong>back-buttering</strong> — klej nakładany na podłoże ORAZ tylną stronę płytki. Minimalne pokrycie: 95% (norma EN 12004). Użyj kleju C2S1 (np. Ceresit CM 17, Weber.set speed).</span>
        </div>
      )}
      <Result rows={[
        { label: "Łączne zużycie kleju", val: `${fmt(result?.kg)} kg`, accent: true },
        { label: "Worki 25 kg do zamówienia", val: result ? `${result.worki25} szt.` : "—" },
      ]} copyText={result ? `Klej do płytek: ${fmt(result.kg)} kg / ${result.worki25} worków 25 kg` : ""} />
      <Note text="Zużycia wg norm EN 12004. Dla ogrzewania podłogowego: klej C2TE (odkształcalny, szybkowiążący). Nie zapomnij o fudze i profilu dylatacyjnym." />
    </div>
  );
}

/* ─── PŁYTKI ──────────────────────────────────────────── */
function PlytkiCalc() {
  const [szer, setSzer] = useState("4");
  const [dlugosc, setDlugosc] = useState("5");
  const [odpad, setOdpad] = useState("10");
  const [otw, setOtw] = useState("0");
  const result = useMemo(() => {
    const pow = safeFloat(szer) * safeFloat(dlugosc);
    const netto = Math.max(0, pow - safeFloat(otw));
    if (netto <= 0) return null;
    return { pow: round2(pow), netto, brutto: round2(netto * (1 + safeFloat(odpad) / 100)) };
  }, [szer, dlugosc, odpad, otw]);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Szerokość pomieszczenia (m)" value={szer} onChange={setSzer} min={0.1} step="0.1" />
        <Field label="Długość pomieszczenia (m)" value={dlugosc} onChange={setDlugosc} min={0.1} step="0.1" />
      </div>
      <Field label="Odejmij otwory: wanna, kabina, okno (m²)" value={otw} onChange={setOtw} min={0} step="0.1" />
      <SelectField label="Naddatek na cięcia i odpady" value={odpad} onChange={setOdpad} options={[
        { v: "5",  l: "5% — układ prosty, brak cięć" },
        { v: "10", l: "10% — standardowe pomieszczenie" },
        { v: "15", l: "15% — układ skośny 45° / mozaika" },
        { v: "20", l: "20% — skomplikowany układ" },
      ]} />
      <Result rows={[
        { label: "Pow. pomieszczenia", val: `${fmt(result?.pow)} m²` },
        { label: "Netto (po odejściu otworów)", val: `${fmt(result?.netto)} m²` },
        { label: "Do zamówienia (z naddatkiem)", val: `${fmt(result?.brutto)} m²`, accent: true },
      ]} copyText={result ? `Płytki: ${fmt(result.brutto)} m² do zamówienia` : ""} />
      <Note text="Zamawiaj zawsze z jednej partii produkcji (ten sam numer barwny na kartonie). Różne partie mogą różnić się odcieniem koloru." />
    </div>
  );
}

/* ─── IZOLACJA FUNDAMENTÓW ───────────────────────────── */
const XPS_PLATE_SIZES: Record<string, { area: number; label: string }> = {
  xps_60x125: { area: 0.750, label: "Synthos XPS Prime / Austrotherm 60×125 cm (0,75 m²)" },
  xps_60x120: { area: 0.720, label: "Ravatherm XPS 300 / Finnfoam 60×120 cm (0,72 m²)" },
  xps_60x125b:{ area: 0.750, label: "Swisspor XPS 300-F 60×125 cm (0,75 m²)" },
  xps_60x81:  { area: 0.486, label: "Małe formaty / docinki 60×81 cm (0,486 m²)" },
};

function IzolacjaCalc() {
  const [obwod, setObwod]     = useState("40");
  const [wys, setWys]         = useState("2.0");
  const [grubosc, setGrubosc] = useState("10");
  const [bufor, setBufor]     = useState("10");
  const [format, setFormat]   = useState("xps_60x125");
  const result = useMemo(() => {
    const o = safeFloat(obwod); const h = safeFloat(wys);
    if (o <= 0 || h <= 0) return null;
    const pow     = round2(o * h);
    const brutto  = round2(pow * (1 + safeFloat(bufor) / 100));
    const m3      = round2(brutto * safeFloat(grubosc) / 100);
    const plateArea = XPS_PLATE_SIZES[format]?.area ?? 0.75;
    const plyty   = Math.ceil(brutto / plateArea);
    return { pow, brutto, m3, plyty };
  }, [obwod, wys, grubosc, bufor, format]);

  const warnWys   = safeFloat(wys) > 4.5;
  const warnObwod = safeFloat(obwod) > 0 && safeFloat(obwod) < 8;

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Obwód budynku do izolacji (m)" value={obwod} onChange={setObwod} min={4} />
        <Field label="Wys. izolowanej ściany fundamentowej (m)" value={wys} onChange={setWys} min={0.5} step="0.1" />
      </div>
      <Note text="Obwód = suma długości wszystkich ścian zewnętrznych (np. dom 10×12 m → obwód = 44 m). Wysokość mierz od górnej krawędzi tynku cokołowego (~30 cm nad terenem) do górnej powierzchni ławy fundamentowej — typowo 1,5–2,5 m. Nie jest to głębokość kopania." />
      {warnObwod && <Warn text="Obwód < 8 m to bardzo mały budynek — sprawdź czy dane są poprawne." />}
      {warnWys   && <Warn text="Wysokość > 4,5 m jest niestandardowa dla domu jednorodzinnego — sprawdź pomiar." />}
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField label="Grubość płyty XPS (cm)" value={grubosc} onChange={setGrubosc} options={[
          { v: "6",  l: "6 cm — renowacja istniejących fundamentów" },
          { v: "8",  l: "8 cm — minimum WT2021 (nowe budynki)" },
          { v: "10", l: "10 cm — energooszczędny (rekomendowane)" },
          { v: "12", l: "12 cm — dom pasywny NF40" },
          { v: "14", l: "14 cm — standard NF25 (BGK/dofinansowania)" },
          { v: "16", l: "16 cm — standard pasywny NF15" },
        ]} />
        <SelectField label="Bufor na cięcia (%)" value={bufor} onChange={setBufor} options={[
          { v: "5",  l: "5% — regularny rzut prostokątny" },
          { v: "10", l: "10% — standardowy bufor" },
          { v: "15", l: "15% — nieregularny kształt / wykusze" },
        ]} />
      </div>
      <SelectField label="Format płyty XPS (producent)" value={format} onChange={setFormat}
        options={Object.entries(XPS_PLATE_SIZES).map(([v, d]) => ({ v, l: d.label }))}
      />
      <Result rows={[
        { label: "Netto pow. izolacji", val: `${fmt(result?.pow)} m²` },
        { label: "Do zamówienia (z buforem)", val: `${fmt(result?.brutto)} m²`, accent: true },
        { label: "Objętość materiału (m³)", val: `${fmt(result?.m3)} m³` },
        { label: `Płyty ${XPS_PLATE_SIZES[format]?.label.split(" ")[3] ?? "60×125"} cm do zamówienia`, val: result ? `${result.plyty} szt.` : "—" },
      ]} copyText={result ? `Izolacja fundamentów: ${fmt(result.brutto)} m² / ${fmt(result.m3)} m³ / ${result.plyty} płyt XPS` : ""} />
      <Note text="Stosuj XPS odporny na wilgoć (Ravatherm, Synthos XPS Prime). Pamiętaj o primerze bitumicznym, masie uszczelniającej i folii kubełkowej drenażowej." />
    </div>
  );
}

/* ─── HELPERS ─────────────────────────────────────────── */
function Field({ label, value, onChange, min = 0.1, step = "1" }: { label: string; value: string; onChange: (v: string) => void; min?: number; step?: string }) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
      <input
        type="number" min={min} step={step} value={value}
        inputMode="decimal"
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white focus:outline-none transition-colors"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        onFocus={e => { e.currentTarget.style.borderColor = "#f81828"; }}
        onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { v: string; l: string }[] }) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white focus:outline-none"
        style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );
}

function Result({ rows, copyText }: { rows: { label: string; val: string; accent?: boolean }[]; copyText?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!copyText) return;
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#0a0a0a", border: "1px solid rgba(248,24,40,0.2)" }}>
      <div className="px-5 py-2.5 flex items-center gap-2" style={{ background: "rgba(248,24,40,0.08)", borderBottom: "1px solid rgba(248,24,40,0.15)" }}>
        <Calculator className="w-3.5 h-3.5 text-[#f81828]" />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#f81828]">Wynik obliczeń</span>
        {copyText && (
          <button onClick={handleCopy} className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors">
            {copied ? <><Check className="w-3 h-3 text-green-400" /><span className="text-green-400">Skopiowano</span></> : <><Copy className="w-3 h-3" />Kopiuj</>}
          </button>
        )}
      </div>
      <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm text-gray-500">{r.label}</span>
            <span className={`text-sm font-black ${r.accent ? "text-[#f81828] text-base" : r.val === "—" ? "text-gray-600" : "text-gray-200"}`}>{r.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Note({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
      <Info className="w-3.5 h-3.5 text-gray-700 flex-shrink-0 mt-0.5" />
      <span>{text}</span>
    </div>
  );
}

function Warn({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-amber-400" style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}>
      <Info className="w-3.5 h-3.5 flex-shrink-0" />{text}
    </div>
  );
}

/* ─── SEO meta per kalkulator ────────────────────────── */
const CALC_SEO: Record<CalcId, { title: string; description: string }> = {
  tynk:      { title: "Kalkulator tynku elewacyjnego — ile kg potrzebujesz? | Media Bud Lublin",     description: "Oblicz ilość tynku elewacyjnego (Weber, Ceresit, Atlas) na m². Wpisz pow. ścian, ziarno i bufor — wynik w kg i workach 25 kg." },
  farba:     { title: "Kalkulator farby elewacyjnej — ile litrów? | Media Bud Lublin",               description: "Oblicz zużycie farby elewacyjnej z buforem 10%. Wybierz rodzaj farby i liczbę warstw — wynik w litrach i opakowaniach 5/10/15 l." },
  styropian: { title: "Kalkulator styropianu i wełny mineralnej — ile m²? | Media Bud Lublin",      description: "Oblicz ile m² styropianu EPS lub wełny mineralnej fasadowej potrzebujesz. Uwzględnia różne formaty płyt ETICS." },
  klej:      { title: "Kalkulator kleju do płytek ceramicznych — ile worków? | Media Bud Lublin",    description: "Oblicz ilość kleju do płytek z uwzględnieniem formatu, podłoża i ogrzewania podłogowego. Back-buttering dla wielkoformatów." },
  plytki:    { title: "Kalkulator płytek ceramicznych — ile m² zamówić? | Media Bud Lublin",        description: "Oblicz ile m² płytek ceramicznych potrzebujesz z naddatkiem na odpady. Odejmij wannę, kabinę i okno od powierzchni." },
  izolacja:  { title: "Kalkulator izolacji fundamentów XPS — ile m³? | Media Bud Lublin",           description: "Oblicz ile płyt XPS potrzebujesz do pionowej izolacji fundamentów. Wpisz obwód i wys. ściany fundamentowej — wynik w m², m³ i płytach." },
};

/* ─── CTA ────────────────────────────────────────────── */
function CalcCTA({ categoryHref, categoryLabel }: { categoryHref: string; categoryLabel: string }) {
  return (
    <div className="mt-8 rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.10),rgba(248,24,40,0.04))", border: "1px solid rgba(248,24,40,0.2)" }}>
      <div className="grid md:grid-cols-[1fr_auto] gap-5 items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-2">Masz wyniki?</p>
          <h3 className="font-display text-xl font-black text-white mb-2">Wyślij zapytanie — wycenimy dostawę</h3>
          <p className="text-sm text-gray-400 leading-relaxed">Podaj obliczone ilości — przygotujemy ofertę z dostawą na budowę w Lublinie i woj. lubelskim.</p>
          <Link to={categoryHref} className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-[#f81828] hover:underline">
            <ChevronRight className="w-3.5 h-3.5" />{categoryLabel}
          </Link>
        </div>
        <div className="flex flex-col gap-3 min-w-[200px]">
          <a href="tel:+48533553344" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wide text-white" style={{ background: "#f81828" }}>
            <Phone className="w-4 h-4" /> Zadzwoń: 533 553 344
          </a>
          <Link to="/kontakt" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wide text-white border border-white/10">
            <ArrowRight className="w-4 h-4 text-[#f81828]" /> Wyślij zapytanie
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────── */
export default function KalkulatorPage() {
  const { calcId: calcSlug } = useParams<{ calcId?: string }>();
  const activeId: CalcId = (calcSlug && SLUG_TO_ID[calcSlug]) ? SLUG_TO_ID[calcSlug] : "tynk";
  const [tabActive, setTabActive] = useState<CalcId>(activeId);
  const active: CalcId = calcSlug ? activeId : tabActive;
  const activeDef = calcs.find(c => c.id === active)!;

  const seo = calcSlug ? CALC_SEO[active] : {
    title: "Kalkulator zużycia materiałów budowlanych — Media Bud Lublin",
    description: "Oblicz ile tynku, farby elewacyjnej, styropianu, kleju do płytek lub XPS na fundamenty potrzebujesz. Bezpłatny kalkulator budowlany z walidacją i normami EN.",
  };
  const howto = calcSlug ? HOWTO_SCHEMAS[active] : undefined;
  const schemas: object[] = [
    {
      "@context": "https://schema.org", "@type": "WebApplication",
      "name": calcSlug ? activeDef.label + " — kalkulator budowlany" : "Kalkulator zużycia materiałów budowlanych",
      "description": seo.description,
      "url": `https://mediabud.pl/kalkulator${calcSlug ? "/" + calcSlug : ""}`,
      "applicationCategory": "UtilitiesApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PLN" },
    },
    ...(howto ? [howto] : []),
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
        { "@type": "ListItem", "position": 2, "name": "Kalkulator materiałów", "item": "https://mediabud.pl/kalkulator" },
        ...(calcSlug ? [{ "@type": "ListItem", "position": 3, "name": activeDef.label, "item": `https://mediabud.pl/kalkulator/${calcSlug}` }] : []),
      ],
    },
  ];

  useSEO({ title: seo.title, description: seo.description, canonical: `/kalkulator${calcSlug ? "/" + calcSlug : ""}`, schema: schemas });

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2) 60%,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-10 py-10">
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-4 h-4 text-[#f81828]" />
            <span className="text-[10px] font-black text-[#f81828] tracking-widest uppercase">
              {calcSlug
                ? <><Link to="/kalkulator" className="hover:underline opacity-70">Kalkulator</Link> / {activeDef.label}</>
                : "Narzędzie"}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">
            {calcSlug ? activeDef.label : "Kalkulator materiałów"}
          </h1>
          <p className="text-gray-400 text-sm max-w-xl">{activeDef.desc}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex flex-wrap gap-2 mb-8">
          {calcs.map(c => (
            calcSlug
              ? (
                <Link key={c.id} to={`/kalkulator/${c.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{ background: active === c.id ? "#f81828" : "rgba(255,255,255,0.04)", color: active === c.id ? "#fff" : "#888", border: `1px solid ${active === c.id ? "#f81828" : "rgba(255,255,255,0.08)"}`, boxShadow: active === c.id ? "0 4px 16px rgba(248,24,40,0.3)" : "none" }}
                >
                  <span className="text-base leading-none">{c.icon}</span><span>{c.label}</span>
                </Link>
              )
              : (
                <button key={c.id} onClick={() => setTabActive(c.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{ background: active === c.id ? "#f81828" : "rgba(255,255,255,0.04)", color: active === c.id ? "#fff" : "#888", border: `1px solid ${active === c.id ? "#f81828" : "rgba(255,255,255,0.08)"}`, boxShadow: active === c.id ? "0 4px 16px rgba(248,24,40,0.3)" : "none" }}
                >
                  <span className="text-base leading-none">{c.icon}</span><span>{c.label}</span>
                </button>
              )
          ))}
        </div>

        <div className="rounded-2xl p-6 md:p-8" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="mb-6">
            <h2 className="font-display text-xl font-black text-white flex items-center gap-2 mb-1">
              <span className="text-2xl">{activeDef.icon}</span>{activeDef.label}
            </h2>
            <p className="text-sm text-gray-500">{activeDef.desc}</p>
          </div>
          {active === "tynk"      && <TynkCalc />}
          {active === "farba"     && <FarbaCalc />}
          {active === "styropian" && <StyropianCalc />}
          {active === "klej"      && <KlejCalc />}
          {active === "plytki"    && <PlytkiCalc />}
          {active === "izolacja"  && <IzolacjaCalc />}
        </div>

        <CalcCTA categoryHref={activeDef.categoryHref} categoryLabel={activeDef.categoryLabel} />

        {!calcSlug && (
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4">Kalkulatory szczegółowe</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {calcs.map(c => (
                <Link key={c.id} to={`/kalkulator/${c.slug}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-500 hover:text-white transition-all group"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <span>{c.icon}</span><span>{c.label}</span>
                  <ChevronRight className="w-3 h-3 ml-auto text-[#f81828] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
