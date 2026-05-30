import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calculator, Phone, ArrowRight, ChevronRight, Info } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

type CalcId = "tynk" | "farba" | "styropian" | "klej" | "plytki";

interface CalcDef {
  id: CalcId;
  label: string;
  icon: string;
  desc: string;
}

const calcs: CalcDef[] = [
  { id: "tynk",      icon: "🪣", label: "Tynk elewacyjny",      desc: "Ile kg tynku potrzebujesz na elewację?" },
  { id: "farba",     icon: "🎨", label: "Farba elewacyjna",      desc: "Ile litrów farby na ścianę zewnętrzną?" },
  { id: "styropian", icon: "🧊", label: "Styropian / wełna",     desc: "Ile m² izolacji na ocieplenie budynku?" },
  { id: "klej",      icon: "🔧", label: "Klej do płytek",        desc: "Ile kg kleju potrzebujesz do glazury?" },
  { id: "plytki",    icon: "⬜", label: "Płytki ceramiczne",     desc: "Ile m² płytek z uwzględnieniem odpadów?" },
];

function round2(v: number) { return Math.round(v * 100) / 100; }
function ceil5(v: number) { return Math.ceil(v / 5) * 5; }

/* ─── TYNK ─────────────────────────────────────────── */
function TynkCalc() {
  const [pow, setPow] = useState("100");
  const [okna, setOkna] = useState("15");
  const [ziarno, setZiarno] = useState("1.5");
  const [bufor, setBufor] = useState("10");

  const result = useMemo(() => {
    const netto = Math.max(0, parseFloat(pow) - parseFloat(okna));
    const zuzycie = parseFloat(ziarno) === 1.0 ? 2.0 : parseFloat(ziarno) === 1.5 ? 2.5 : parseFloat(ziarno) === 2.0 ? 3.0 : 4.0;
    const kgNetto = netto * zuzycie;
    const kgBrutto = kgNetto * (1 + parseFloat(bufor) / 100);
    const worki25 = Math.ceil(kgBrutto / 25);
    return { netto: round2(netto), kgNetto: round2(kgNetto), kgBrutto: round2(kgBrutto), worki25 };
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
        { label: "Netto powierzchnia do tynkowania", val: `${result.netto} m²` },
        { label: "Zużycie tynku (bez bufora)", val: `${result.kgNetto} kg` },
        { label: "Zużycie z buforem", val: `${result.kgBrutto} kg`, accent: true },
        { label: "Worki 25 kg do zamówienia", val: `${result.worki25} szt.` },
      ]} />
      <Note text="Zużycia orientacyjne wg kart technicznych Weber, Ceresit, Atlas. Różnią się zależnie od podłoża — sprawdź kartę techniczną wybranego produktu." />
    </div>
  );
}

/* ─── FARBA ─────────────────────────────────────────── */
function FarbaCalc() {
  const [pow, setPow] = useState("100");
  const [okna, setOkna] = useState("15");
  const [warstwy, setWarstwy] = useState("2");
  const [rodzaj, setRodzaj] = useState("silikonowa");

  const result = useMemo(() => {
    const netto = Math.max(0, parseFloat(pow) - parseFloat(okna));
    const zuzycie = rodzaj === "akrylowa" ? 0.20 : rodzaj === "silikonowa" ? 0.18 : rodzaj === "silikatowa" ? 0.22 : 0.25;
    const lWarstwa = netto * zuzycie;
    const lTotal = lWarstwa * parseFloat(warstwy);
    const puszki10 = Math.ceil(lTotal / 10);
    return { netto: round2(netto), lWarstwa: round2(lWarstwa), lTotal: round2(lTotal), puszki10 };
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
        { label: "Netto powierzchnia do malowania", val: `${result.netto} m²` },
        { label: "Zużycie na 1 warstwę", val: `${result.lWarstwa} l` },
        { label: "Łączne zużycie farby", val: `${result.lTotal} l`, accent: true },
        { label: "Pojemniki 10 l do zamówienia", val: `${result.puszki10} szt.` },
      ]} />
      <Note text="Zużycia orientacyjne. Faktyczne zużycie może się różnić zależnie od chłonności podłoża i techniki nanoszenia." />
    </div>
  );
}

/* ─── STYROPIAN ─────────────────────────────────────── */
function StyropianCalc() {
  const [pow, setPow] = useState("150");
  const [okna, setOkna] = useState("20");
  const [bufor, setBufor] = useState("10");

  const result = useMemo(() => {
    const netto = Math.max(0, parseFloat(pow) - parseFloat(okna));
    const brutto = netto * (1 + parseFloat(bufor) / 100);
    const plyty = Math.ceil(brutto / 0.5); // 50x100cm = 0,5m² / płyta
    return { netto: round2(netto), brutto: round2(brutto), plyty };
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
        { label: "Netto powierzchnia do ocieplenia", val: `${result.netto} m²` },
        { label: "Do zamówienia (z buforem)", val: `${result.brutto} m²`, accent: true },
        { label: "Orientacyjna liczba płyt 50×100 cm", val: `${result.plyty} szt.` },
      ]} />
      <Note text="Standardowe płyty styropianu/wełny mają wymiar 50×100 cm (0,5 m²). Przy zamówieniu uwzględnij też klej, siatkę zbrojącą i grunt." />
    </div>
  );
}

/* ─── KLEJ DO PŁYTEK ────────────────────────────────── */
function KlejCalc() {
  const [pow, setPow] = useState("20");
  const [format, setFormat] = useState("sredni");
  const [podloze, setPodloze] = useState("gladkie");

  const result = useMemo(() => {
    const base = format === "maly" ? 3.0 : format === "sredni" ? 4.5 : format === "duzy" ? 6.0 : 8.0;
    const mult = podloze === "gladkie" ? 1.0 : podloze === "nierówne" ? 1.2 : 1.4;
    const kg = parseFloat(pow) * base * mult;
    const worki25 = Math.ceil(kg / 25);
    return { kg: round2(kg), worki25 };
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
      <Note text="Przy okładzinach wielkogabarytowych (80×80+) stosuj klej S1 lub S2 z elastyfikatorem." />
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
    const brutto = pow * (1 + parseFloat(odpad) / 100);
    return { pow: round2(pow), brutto: round2(brutto) };
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
        { label: "Netto powierzchnia do wyłożenia", val: `${result.pow} m²` },
        { label: "Do zamówienia (z naddatkiem)", val: `${result.brutto} m²`, accent: true },
      ]} />
      <Note text="Zawsze zamów trochę więcej niż potrzebujesz — różne partie produkcji mogą się różnić odcieniem." />
    </div>
  );
}

/* ─── HELPERS ─────────────────────────────────────────── */
function Field({ label, value, onChange, min = 0, step = "1" }: { label: string; value: string; onChange: (v: string) => void; min?: number; step?: string }) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
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
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
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

/* ─── MAIN PAGE ─────────────────────────────────────── */
export default function KalkulatorPage() {
  const [active, setActive] = useState<CalcId>("tynk");

  useSEO({
    title: "Kalkulator zużycia materiałów budowlanych — Media Bud Lublin",
    description: "Oblicz ile tynku, farby elewacyjnej, styropianu, kleju do płytek potrzebujesz na swój projekt. Bezpłatny kalkulator budowlany od Media Bud w Lublinie.",
    canonical: "/kalkulator",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Kalkulator zużycia materiałów budowlanych",
      "description": "Oblicz potrzebne ilości tynku, farby, styropianu i kleju do swojej inwestycji.",
      "url": "https://mediabud.pl/kalkulator",
      "applicationCategory": "UtilitiesApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PLN" }
    }
  });

  const activeCalc = calcs.find(c => c.id === active)!;

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2) 60%,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-10 py-12">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-[#f81828]" />
            <span className="text-[10px] font-black text-[#f81828] tracking-widest uppercase">Narzędzie</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">Kalkulator materiałów</h1>
          <p className="text-gray-400 text-sm max-w-xl">Oblicz ile tynku, farby, styropianu lub kleju do płytek potrzebujesz. Wyniki są orientacyjne — zawsze sprawdź kartę techniczną producenta.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">

        {/* Zakładki */}
        <div className="flex flex-wrap gap-2 mb-8">
          {calcs.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
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
          ))}
        </div>

        {/* Kalkulator */}
        <div className="rounded-2xl p-6 md:p-8" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="mb-6">
            <h2 className="font-display text-xl font-black text-white flex items-center gap-2 mb-1">
              <span className="text-2xl">{activeCalc.icon}</span>
              {activeCalc.label}
            </h2>
            <p className="text-sm text-gray-500">{activeCalc.desc}</p>
          </div>

          {active === "tynk"      && <TynkCalc />}
          {active === "farba"     && <FarbaCalc />}
          {active === "styropian" && <StyropianCalc />}
          {active === "klej"      && <KlejCalc />}
          {active === "plytki"    && <PlytkiCalc />}
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.10),rgba(248,24,40,0.04))", border: "1px solid rgba(248,24,40,0.2)" }}>
          <div className="grid md:grid-cols-[1fr_auto] gap-5 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f81828] mb-2">Masz wyniki?</p>
              <h3 className="font-display text-xl font-black text-white mb-2">Wyślij zapytanie — wycenimy dostawę</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Skontaktuj się z naszym doradcą — podaj obliczone ilości, a przygotujemy ofertę z dostawą na budowę w Lublinie i województwie lubelskim.</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              <a href="tel:+48509567213" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wide text-white" style={{ background: "#f81828" }}>
                <Phone className="w-4 h-4" /> Zadzwoń
              </a>
              <Link to="/kontakt" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wide text-white border border-white/10">
                <ArrowRight className="w-4 h-4 text-[#f81828]" /> Wyślij zapytanie
              </Link>
            </div>
          </div>
        </div>

        {/* Linki do kategorii */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {[
            { href: "/kategoria/tynki", l: "Tynki elewacyjne →" },
            { href: "/kategoria/farby-i-rozpuszczalniki", l: "Farby →" },
            { href: "/kategoria/styropian-wełna-mineralna-piana", l: "Izolacje →" },
            { href: "/kategoria/kleje-i-zaprawy", l: "Kleje →" },
          ].map(item => (
            <Link key={item.href} to={item.href} className="text-xs font-bold text-gray-500 hover:text-[#f81828] transition-colors flex items-center gap-1">
              <ChevronRight className="w-3 h-3" /> {item.l}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
