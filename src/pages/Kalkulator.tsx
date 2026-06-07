import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Calculator, Phone, ArrowRight, ChevronRight, Info } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

type CalcId = "tynk" | "farba" | "styropian" | "klej" | "plytki" | "izolacja";

interface CalcDef {
  id: CalcId;
  label: string;
  icon: string;
  desc: string;
  slug: string;
}

const calcs: CalcDef[] = [
  { id: "tynk",      icon: "🪣", label: "Tynk elewacyjny",      desc: "Ile kg tynku potrzebujesz na elewację?",           slug: "tynk-elewacyjny" },
  { id: "farba",     icon: "🎨", label: "Farba elewacyjna",      desc: "Ile litrów farby na ścianę zewnętrzną?",          slug: "farba-elewacyjna" },
  { id: "styropian", icon: "🧊", label: "Styropian / wełna",     desc: "Ile m² izolacji na ocieplenie budynku?",          slug: "styropian-welna" },
  { id: "klej",      icon: "🔧", label: "Klej do płytek",        desc: "Ile kg kleju potrzebujesz do glazury?",           slug: "klej-do-plytek" },
  { id: "plytki",    icon: "⬜", label: "Płytki ceramiczne",     desc: "Ile m² płytek z uwzględnieniem odpadów?",        slug: "plytki-ceramiczne" },
  { id: "izolacja",  icon: "🏗️", label: "Izolacja fundamentów", desc: "Ile m³ XPS do izolacji fundamentów i cokołu?",    slug: "izolacja-fundamentow" },
];

const SLUG_TO_ID: Record<string, CalcId> = Object.fromEntries(calcs.map(c => [c.slug, c.id]));

/* ─── HowTo JSON-LD per kalkulator ─────────────────────────────── */
const HOWTO_SCHEMAS: Partial<Record<CalcId, object>> = {
  klej: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Jak obliczyć ilość kleju do płytek ceramicznych",
    "description": "Krok po kroku: oblicz ile kleju do płytek potrzebujesz na podstawie powierzchni, formatu i stanu podłoża.",
    "totalTime": "PT3M",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "PLN", "value": "0" },
    "tool": [{ "@type": "HowToTool", "name": "Kalkulator kleju do płytek Media Bud" }],
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Zmierz powierzchnię do wyłożenia", "text": "Oblicz m² podłogi lub ściany (długość × szerokość). Wpisz wynik do kalkulatora." },
      { "@type": "HowToStep", "position": 2, "name": "Wybierz format płytki", "text": "Mały format (do 20×20 cm) wymaga ~3 kg/m², średni 30×60 cm ~4,5 kg/m², duży 60×60 cm ~6 kg/m², wielki 80×80+ cm ~8 kg/m²." },
      { "@type": "HowToStep", "position": 3, "name": "Oceń stan podłoża", "text": "Gładkie poziome podłoże nie wymaga korekty. Nierówne podłoże +20%, układanie na ścianie +40%." },
      { "@type": "HowToStep", "position": 4, "name": "Odczytaj wynik i zamów worki 25 kg", "text": "Kalkulator podaje łączne zużycie kleju w kg i liczbę worków 25 kg. Do płytek wielkoformatowych i ogrzewania podłogowego użyj kleju C2TE S1/S2." },
    ],
  },
  izolacja: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Jak obliczyć ilość XPS do izolacji fundamentów",
    "description": "Krok po kroku: oblicz ile płyt XPS lub styropianu fundamentowego potrzebujesz do izolacji pionowej fundamentów i cokołu.",
    "totalTime": "PT3M",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "PLN", "value": "0" },
    "tool": [{ "@type": "HowToTool", "name": "Kalkulator izolacji fundamentów Media Bud" }],
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Zmierz obwód budynku", "text": "Zsumuj długości wszystkich ścian zewnętrznych styku z gruntem. Wynik w metrach bieżących." },
      { "@type": "HowToStep", "position": 2, "name": "Zmierz głębokość izolacji", "text": "Mierz od górnej krawędzi izolacji (ok. 30 cm nad terenem) do ławy fundamentowej. Typowo 1,5–2,5 m." },
      { "@type": "HowToStep", "position": 3, "name": "Wybierz grubość płyty XPS", "text": "Standard to 8–10 cm XPS (λ=0,034 W/mK). Przy pasywnym lub energooszczędnym standardzie warto użyć 12–16 cm." },
      { "@type": "HowToStep", "position": 4, "name": "Dodaj bufor i odczytaj wynik", "text": "Kalkulator podaje m² izolacji (z buforem 10%) i orientacyjną liczbę płyt 60×125 cm. Zamów też primer i taśmę uszczelniającą." },
    ],
  },
  farba: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Jak obliczyć ilość farby elewacyjnej",
    "description": "Krok po kroku: oblicz ile litrów farby elewacyjnej (silikonowej, akrylowej, silikatowej) potrzebujesz na malowanie elewacji.",
    "totalTime": "PT3M",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "PLN", "value": "0" },
    "tool": [{ "@type": "HowToTool", "name": "Kalkulator farby elewacyjnej Media Bud" }],
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Zmierz całkowitą powierzchnię ścian", "text": "Oblicz sumę pow. wszystkich ścian zewnętrznych (wys. × obwód). Wynik w m²." },
      { "@type": "HowToStep", "position": 2, "name": "Odejmij okna i drzwi", "text": "Zmierz i zsumuj pow. wszystkich otworów okiennych i drzwiowych. Odejmij od całości." },
      { "@type": "HowToStep", "position": 3, "name": "Wybierz rodzaj farby i liczbę warstw", "text": "Farba silikonowa ~0,18 l/m²/warstwę, akrylowa ~0,20 l/m², silikatowa ~0,22 l/m². Standardowo 2 warstwy, ciemne kolory 3 warstwy." },
      { "@type": "HowToStep", "position": 4, "name": "Odczytaj wynik i zamów opakowania", "text": "Kalkulator podaje łączne zużycie farby w litrach i liczbę pojemników 10 l. Zawsze zamów minimum 10% zapas." },
    ],
  },
};

function round2(v: number) { return Math.round(v * 100) / 100; }

/* ─── TYNK ──────────────────────────────────────────── */
function TynkCalc() {
  const [pow, setPow] = useState("100");
  const [okna, setOkna] = useState("15");
  const [ziarno, setZiarno] = useState("1.5");
  const [bufor, setBufor] = useState("10");
  const result = useMemo(() => {
    const netto = Math.max(0, parseFloat(pow) - parseFloat(okna));
    const zuzycie = parseFloat(ziarno) === 1.0 ? 2.0 : parseFloat(ziarno) === 1.5 ? 2.5 : parseFloat(ziarno) === 2.0 ? 3.0 : 4.0;
    const kgBrutto = netto * zuzycie * (1 + parseFloat(bufor) / 100);
    return { netto: round2(netto), kgNetto: round2(netto * zuzycie), kgBrutto: round2(kgBrutto), worki25: Math.ceil(kgBrutto / 25) };
  }, [pow, okna, ziarno, bufor]);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Całkowita pow. ścian (m²)" value={pow} onChange={setPow} min={1} />
        <Field label="Odejmij okna i drzwi (m²)" value={okna} onChange={setOkna} min={0} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField label="Wielkość ziarna tynku" value={ziarno} onChange={setZiarno} options={[
          { v: "1.0", l: "1,0 mm — zużycie ok. 2,0 kg/m²" },
          { v: "1.5", l: "1,5 mm — zużycie ok. 2,5 kg/m² (popularne)" },
          { v: "2.0", l: "2,0 mm — zużycie ok. 3,0 kg/m²" },
          { v: "3.0", l: "3,0 mm — zużycie ok. 4,0 kg/m²" },
        ]} />
        <SelectField label="Bufor na odpady (%)" value={bufor} onChange={setBufor} options={[
          { v: "5",  l: "5% — minimalne odpady" },
          { v: "10", l: "10% — standardowy bufor" },
          { v: "15", l: "15% — skomplikowana geometria" },
        ]} />
      </div>
      <Result rows={[
        { label: "Netto pow. do tynkowania", val: `${result.netto} m²` },
        { label: "Zużycie tynku (bez bufora)", val: `${result.kgNetto} kg` },
        { label: "Zużycie z buforem", val: `${result.kgBrutto} kg`, accent: true },
        { label: "Worki 25 kg do zamówienia", val: `${result.worki25} szt.` },
      ]} />
      <Note text="Zużycia orientacyjne wg kart technicznych Weber, Ceresit, Atlas. Sprawdź kartę techniczną wybranego produktu." />
    </div>
  );
}

/* ─── FARBA ──────────────────────────────────────────── */
function FarbaCalc() {
  const [pow, setPow] = useState("100");
  const [okna, setOkna] = useState("15");
  const [warstwy, setWarstwy] = useState("2");
  const [rodzaj, setRodzaj] = useState("silikonowa");
  const result = useMemo(() => {
    const netto = Math.max(0, parseFloat(pow) - parseFloat(okna));
    const zuzycie = rodzaj === "akrylowa" ? 0.20 : rodzaj === "silikonowa" ? 0.18 : rodzaj === "silikatowa" ? 0.22 : 0.25;
    const lTotal = netto * zuzycie * parseFloat(warstwy);
    return { netto: round2(netto), lWarstwa: round2(netto * zuzycie), lTotal: round2(lTotal), puszki10: Math.ceil(lTotal / 10) };
  }, [pow, okna, warstwy, rodzaj]);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Całkowita pow. ścian (m²)" value={pow} onChange={setPow} min={1} />
        <Field label="Odejmij okna i drzwi (m²)" value={okna} onChange={setOkna} min={0} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField label="Rodzaj farby" value={rodzaj} onChange={setRodzaj} options={[
          { v: "silikonowa",  l: "Silikonowa (~0,18 l/m²/warstwę)" },
          { v: "akrylowa",    l: "Akrylowa (~0,20 l/m²/warstwę)" },
          { v: "silikatowa",  l: "Silikatowa (~0,22 l/m²/warstwę)" },
          { v: "mineralna",   l: "Mineralna (~0,25 l/m²/warstwę)" },
        ]} />
        <SelectField label="Liczba warstw" value={warstwy} onChange={setWarstwy} options={[
          { v: "1", l: "1 warstwa (renowacja)" },
          { v: "2", l: "2 warstwy (standard)" },
          { v: "3", l: "3 warstwy (ciemne kolory)" },
        ]} />
      </div>
      <Result rows={[
        { label: "Netto pow. do malowania", val: `${result.netto} m²` },
        { label: "Zużycie na 1 warstwę", val: `${result.lWarstwa} l` },
        { label: "Łączne zużycie farby", val: `${result.lTotal} l`, accent: true },
        { label: "Pojemniki 10 l do zamówienia", val: `${result.puszki10} szt.` },
      ]} />
      <Note text="Faktyczne zużycie może różnić się zależnie od chłonności podłoża i techniki nanoszenia." />
    </div>
  );
}

/* ─── STYROPIAN ──────────────────────────────────────── */
function StyropianCalc() {
  const [pow, setPow] = useState("150");
  const [okna, setOkna] = useState("20");
  const [bufor, setBufor] = useState("10");
  const result = useMemo(() => {
    const netto = Math.max(0, parseFloat(pow) - parseFloat(okna));
    const brutto = netto * (1 + parseFloat(bufor) / 100);
    return { netto: round2(netto), brutto: round2(brutto), plyty: Math.ceil(brutto / 0.5) };
  }, [pow, okna, bufor]);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Całkowita pow. ścian (m²)" value={pow} onChange={setPow} min={1} />
        <Field label="Odejmij okna i drzwi (m²)" value={okna} onChange={setOkna} min={0} />
      </div>
      <SelectField label="Bufor na cięcia i odpady (%)" value={bufor} onChange={setBufor} options={[
        { v: "5",  l: "5% — prosta, regularna elewacja" },
        { v: "10", l: "10% — standardowy bufor" },
        { v: "15", l: "15% — elewacja z niszami i detalami" },
      ]} />
      <Result rows={[
        { label: "Netto pow. do ocieplenia", val: `${result.netto} m²` },
        { label: "Do zamówienia (z buforem)", val: `${result.brutto} m²`, accent: true },
        { label: "Płyty 50×100 cm (orientacyjnie)", val: `${result.plyty} szt.` },
      ]} />
      <Note text="Przy zamówieniu uwzględnij też klej do styropianu, siatkę zbrojącą i grunt." />
    </div>
  );
}

/* ─── KLEJ DO PŁYTEK ─────────────────────────────────── */
function KlejCalc() {
  const [pow, setPow] = useState("20");
  const [format, setFormat] = useState("sredni");
  const [podloze, setPodloze] = useState("gladkie");
  const result = useMemo(() => {
    const base = format === "maly" ? 3.0 : format === "sredni" ? 4.5 : format === "duzy" ? 6.0 : 8.0;
    const mult = podloze === "gladkie" ? 1.0 : podloze === "nierówne" ? 1.2 : 1.4;
    const kg = parseFloat(pow) * base * mult;
    return { kg: round2(kg), worki25: Math.ceil(kg / 25) };
  }, [pow, format, podloze]);
  return (
    <div className="space-y-5">
      <Field label="Powierzchnia płytek (m²)" value={pow} onChange={setPow} min={1} />
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField label="Format płytki" value={format} onChange={setFormat} options={[
          { v: "maly",   l: "Mały do 20×20 cm (~3 kg/m²)" },
          { v: "sredni", l: "Średni 30×60 cm (~4,5 kg/m²)" },
          { v: "duzy",   l: "Duży 60×60 cm (~6 kg/m²)" },
          { v: "wielki", l: "Wielki 80×80+ cm (~8 kg/m²)" },
        ]} />
        <SelectField label="Stan podłoża" value={podloze} onChange={setPodloze} options={[
          { v: "gladkie",    l: "Gładkie, poziome (+0%)" },
          { v: "nierówne",   l: "Lekko nierówne (+20%)" },
          { v: "wymagające", l: "Wymagające, ściana (+40%)" },
        ]} />
      </div>
      <Result rows={[
        { label: "Łączne zużycie kleju", val: `${result.kg} kg`, accent: true },
        { label: "Worki 25 kg do zamówienia", val: `${result.worki25} szt.` },
      ]} />
      <Note text="Przy okładzinach wielkoformatowych (80×80+) i ogrzewaniu podłogowym stosuj klej odkształcalny C2TE S1 lub S2." />
    </div>
  );
}

/* ─── PŁYTKI ─────────────────────────────────────────── */
function PlytkiCalc() {
  const [szer, setSzer] = useState("4");
  const [wys, setWys] = useState("5");
  const [odpad, setOdpad] = useState("10");
  const result = useMemo(() => {
    const pow = parseFloat(szer) * parseFloat(wys);
    return { pow: round2(pow), brutto: round2(pow * (1 + parseFloat(odpad) / 100)) };
  }, [szer, wys, odpad]);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Szerokość pomieszczenia (m)" value={szer} onChange={setSzer} min={0.1} step="0.1" />
        <Field label="Wysokość / długość (m)" value={wys} onChange={setWys} min={0.1} step="0.1" />
      </div>
      <SelectField label="Naddatek na cięcia i odpady" value={odpad} onChange={setOdpad} options={[
        { v: "5",  l: "5% — układ prosty, brak cięć" },
        { v: "10", l: "10% — standardowe pomieszczenie" },
        { v: "15", l: "15% — układ skośny / mozaika" },
        { v: "20", l: "20% — skomplikowany układ" },
      ]} />
      <Result rows={[
        { label: "Netto pow. do wyłożenia", val: `${result.pow} m²` },
        { label: "Do zamówienia (z naddatkiem)", val: `${result.brutto} m²`, accent: true },
      ]} />
      <Note text="Zawsze zamawiaj z jednej partii produkcji — różne partie mogą różnić się odcieniem." />
    </div>
  );
}

/* ─── IZOLACJA FUNDAMENTÓW ───────────────────────────── */
function IzolacjaCalc() {
  const [obwod, setObwod] = useState("40");
  const [glebokos, setGlebokos] = useState("2.0");
  const [grubosc, setGrubosc] = useState("10");
  const [bufor, setBufor] = useState("10");
  const result = useMemo(() => {
    const pow = parseFloat(obwod) * parseFloat(glebokos);
    const brutto = round2(pow * (1 + parseFloat(bufor) / 100));
    // Płyta XPS 60×125 cm = 0,75 m²
    const plyty = Math.ceil(brutto / 0.75);
    // m³ = m² × grubość [m]
    const m3 = round2(brutto * parseFloat(grubosc) / 100);
    return { pow: round2(pow), brutto, plyty, m3 };
  }, [obwod, glebokos, grubosc, bufor]);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Obwód budynku do izolacji (mb)" value={obwod} onChange={setObwod} min={4} />
        <Field label="Głębokość izolacji (m)" value={glebokos} onChange={setGlebokos} min={0.5} step="0.1" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField label="Grubość płyty XPS (cm)" value={grubosc} onChange={setGrubosc} options={[
          { v: "6",  l: "6 cm — renowacja, ciepły klimat" },
          { v: "8",  l: "8 cm — standard WT2021" },
          { v: "10", l: "10 cm — energooszczędny (rekomendowane)" },
          { v: "12", l: "12 cm — dom pasywny / NF40" },
          { v: "16", l: "16 cm — standard pasywny NF15" },
        ]} />
        <SelectField label="Bufor na cięcia (%)" value={bufor} onChange={setBufor} options={[
          { v: "5",  l: "5% — regularny rzut" },
          { v: "10", l: "10% — standardowy bufor" },
          { v: "15", l: "15% — nieregularny kształt" },
        ]} />
      </div>
      <Result rows={[
        { label: "Netto pow. izolacji", val: `${result.pow} m²` },
        { label: "Do zamówienia (z buforem)", val: `${result.brutto} m²`, accent: true },
        { label: "Objętość materiału", val: `${result.m3} m³` },
        { label: "Płyty 60×125 cm (orientacyjnie)", val: `${result.plyty} szt.` },
      ]} />
      <Note text="Do izolacji pionowej fundamentów stosuj XPS (np. Ravatherm, Synthos XPS) odporny na wilgoć. Pamiętaj o primerze bitumicznym i folii kubełkowej." />
    </div>
  );
}

/* ─── HELPERS ─────────────────────────────────────────── */
function Field({ label, value, onChange, min = 0, step = "1" }: { label: string; value: string; onChange: (v: string) => void; min?: number; step?: string }) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
      <input
        type="number" min={min} step={step} value={value}
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
        className="w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white focus:outline-none transition-colors"
        style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );
}

function Result({ rows }: { rows: { label: string; val: string; accent?: boolean }[] }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#0a0a0a", border: "1px solid rgba(248,24,40,0.2)" }}>
      <div className="px-5 py-2.5 flex items-center gap-2" style={{ background: "rgba(248,24,40,0.08)", borderBottom: "1px solid rgba(248,24,40,0.15)" }}>
        <Calculator className="w-3.5 h-3.5 text-[#f81828]" />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#f81828]">Wynik obliczeń</span>
      </div>
      <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm text-gray-500">{r.label}</span>
            <span className={`text-sm font-black ${r.accent ? "text-[#f81828] text-base" : "text-gray-200"}`}>{r.val}</span>
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

/* ─── SEO meta per kalkulator ────────────────────────── */
const CALC_SEO: Record<CalcId, { title: string; description: string }> = {
  tynk:      { title: "Kalkulator tynku elewacyjnego — ile kg potrzebujesz? | Media Bud Lublin",       description: "Oblicz ilość tynku elewacyjnego (Weber, Ceresit, Atlas) na m². Wpisz pow. ścian, ziarno i bufor — wynik w kg i workach 25 kg." },
  farba:     { title: "Kalkulator farby elewacyjnej — ile litrów? | Media Bud Lublin",                 description: "Oblicz zużycie farby elewacyjnej silikonowej, akrylowej lub silikatowej. Wpisz pow. ścian i liczbę warstw — wynik w litrach i pojemnikach 10 l." },
  styropian: { title: "Kalkulator styropianu i wełny mineralnej — ile m²? | Media Bud Lublin",        description: "Oblicz ile m² styropianu fasadowego EPS lub wełny mineralnej potrzebujesz na ocieplenie budynku. Szybki kalkulator ETICS." },
  klej:      { title: "Kalkulator kleju do płytek ceramicznych — ile worków? | Media Bud Lublin",      description: "Oblicz ilość kleju do płytek na podstawie m², formatu płytki i stanu podłoża. Wynik w kg i workach 25 kg. Kalkulator glazury." },
  plytki:    { title: "Kalkulator płytek ceramicznych — ile m² zamówić? | Media Bud Lublin",          description: "Oblicz ile m² płytek ceramicznych, gresu lub mozaiki potrzebujesz z uwzględnieniem odpadów i cięć. Podaj wymiary pomieszczenia." },
  izolacja:  { title: "Kalkulator izolacji fundamentów XPS — ile m³? | Media Bud Lublin",             description: "Oblicz ile płyt XPS potrzebujesz do pionowej izolacji fundamentów i cokołu. Wpisz obwód budynku i głębokość — wynik w m² i m³." },
};

/* ─── CTA i linki ────────────────────────────────────── */
function CalcCTA() {
  return (
    <div className="mt-8 rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.10),rgba(248,24,40,0.04))", border: "1px solid rgba(248,24,40,0.2)" }}>
      <div className="grid md:grid-cols-[1fr_auto] gap-5 items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-2">Masz wyniki?</p>
          <h3 className="font-display text-xl font-black text-white mb-2">Wyślij zapytanie — wycenimy dostawę</h3>
          <p className="text-sm text-gray-400 leading-relaxed">Podaj obliczone ilości, a przygotujemy ofertę z dostawą na budowę w Lublinie i woj. lubelskim.</p>
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

  // Jeśli URL zawiera slug — używamy go jako aktywnej zakładki
  const active: CalcId = calcSlug ? activeId : tabActive;
  const activeDef = calcs.find(c => c.id === active)!;

  const seo = calcSlug ? CALC_SEO[active] : {
    title: "Kalkulator zużycia materiałów budowlanych — Media Bud Lublin",
    description: "Oblicz ile tynku, farby elewacyjnej, styropianu, kleju do płytek lub XPS na fundamenty potrzebujesz. Bezpłatny kalkulator budowlany.",
  };

  const howto = calcSlug ? HOWTO_SCHEMAS[active] : undefined;

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": calcSlug ? activeDef.label + " — kalkulator budowlany" : "Kalkulator zużycia materiałów budowlanych",
      "description": seo.description,
      "url": `https://mediabud.pl/kalkulator${calcSlug ? "/" + calcSlug : ""}`,
      "applicationCategory": "UtilitiesApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PLN" },
    },
    ...(howto ? [howto] : []),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
        { "@type": "ListItem", "position": 2, "name": "Kalkulator materiałów", "item": "https://mediabud.pl/kalkulator" },
        ...(calcSlug ? [{ "@type": "ListItem", "position": 3, "name": activeDef.label, "item": `https://mediabud.pl/kalkulator/${calcSlug}` }] : []),
      ],
    },
  ];

  useSEO({
    title: seo.title,
    description: seo.description,
    canonical: `/kalkulator${calcSlug ? "/" + calcSlug : ""}`,
    schema: schemas,
  });

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      {/* Hero */}
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
        {/* Zakładki / linki do sub-stron */}
        <div className="flex flex-wrap gap-2 mb-8">
          {calcs.map(c => (
            calcSlug
              ? (
                <Link
                  key={c.id}
                  to={`/kalkulator/${c.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    background: active === c.id ? "#f81828" : "rgba(255,255,255,0.04)",
                    color: active === c.id ? "#fff" : "#888",
                    border: `1px solid ${active === c.id ? "#f81828" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: active === c.id ? "0 4px 16px rgba(248,24,40,0.3)" : "none",
                  }}
                >
                  <span className="text-base leading-none">{c.icon}</span>
                  <span>{c.label}</span>
                </Link>
              )
              : (
                <button
                  key={c.id}
                  onClick={() => setTabActive(c.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    background: active === c.id ? "#f81828" : "rgba(255,255,255,0.04)",
                    color: active === c.id ? "#fff" : "#888",
                    border: `1px solid ${active === c.id ? "#f81828" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: active === c.id ? "0 4px 16px rgba(248,24,40,0.3)" : "none",
                  }}
                >
                  <span className="text-base leading-none">{c.icon}</span>
                  <span>{c.label}</span>
                </button>
              )
          ))}
        </div>

        {/* Kalkulator */}
        <div className="rounded-2xl p-6 md:p-8" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="mb-6">
            <h2 className="font-display text-xl font-black text-white flex items-center gap-2 mb-1">
              <span className="text-2xl">{activeDef.icon}</span>
              {activeDef.label}
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

        <CalcCTA />

        {/* Linki do powiązanych kategorii */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {[
            { href: "/kategoria/tynki",                        l: "Tynki elewacyjne →" },
            { href: "/kategoria/farby-i-rozpuszczalniki",      l: "Farby →" },
            { href: "/kategoria/izolacje",                     l: "Izolacje →" },
            { href: "/kategoria/kleje-i-zaprawy",              l: "Kleje →" },
          ].map(item => (
            <Link key={item.href} to={item.href} className="text-xs font-bold text-gray-500 hover:text-[#f81828] transition-colors flex items-center gap-1">
              <ChevronRight className="w-3 h-3" /> {item.l}
            </Link>
          ))}
        </div>

        {/* Linki do indywidualnych kalkulatorów (SEO internal linking) */}
        {!calcSlug && (
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4">Kalkulatory szczegółowe</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {calcs.map(c => (
                <Link
                  key={c.id}
                  to={`/kalkulator/${c.slug}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-500 hover:text-white transition-all group"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
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
