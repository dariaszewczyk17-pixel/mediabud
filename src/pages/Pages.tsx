import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Check, Users, Award, Truck, Star, ChevronRight, BarChart2, Package, Tag, Settings, LogOut, Menu, X, Plus, Pencil, Trash2, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";
import { toast } from "sonner";

/* ── shared styles ── */
const card = { background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" } as const;
const cardHover = "hover:border-[#f81828]/30 hover:shadow-[0_8px_32px_rgba(248,24,40,0.10)] transition-all duration-300";

// ─── CONTACT PAGE ──────────────────────────────────────────────────
export function ContactPage() {
  const [sent, setSent]   = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm]   = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Wiadomość wysłana! Odpowiemy w ciągu 24h.");
  };

  const contactItems = [
    { icon: <Phone className="w-5 h-5 text-[#f81828]" />, label: "Telefon", value: "+48 509 567 213", href: "tel:+48509567213" },
    { icon: <Mail className="w-5 h-5 text-[#f81828]" />, label: "Email", value: "sprzedaz@mediabud.pl", href: "mailto:sprzedaz@mediabud.pl" },
    { icon: <MapPin className="w-5 h-5 text-[#f81828]" />, label: "Adres", value: "ul. Budowlana 1, 20-001 Lublin", href: undefined },
    { icon: <Clock className="w-5 h-5 text-[#f81828]" />, label: "Godziny otwarcia", value: "Pon–Pt: 7:00–17:00\nSob: 8:00–14:00", href: undefined },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2) 60%,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-10 py-12">
          <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-2">Kontakt</p>
          <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">Skontaktuj się z nami</h1>
          <p className="text-gray-400 text-sm">Jesteśmy do Twojej dyspozycji — odpowiemy w ciągu 24 godzin roboczych.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">

        {/* Info column */}
        <div className="space-y-5">
          <div className="rounded-xl p-6" style={card}>
            <h2 className="font-display font-black text-white text-lg mb-5 flex items-center gap-2">
              <span className="w-[3px] h-5 bg-[#f81828] rounded-full" /> Dane kontaktowe
            </h2>
            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3" style={{ borderBottom: i < contactItems.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.18)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-600 mb-0.5">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="font-semibold text-gray-200 hover:text-[#f81828] transition-colors text-sm whitespace-pre-line">{item.value}</a>
                      : <div className="font-semibold text-gray-300 text-sm whitespace-pre-line">{item.value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick call CTA */}
          <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.16),rgba(248,24,40,0.07))", border: "1px solid rgba(248,24,40,0.22)" }}>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f81828]" />
            <h3 className="font-bold text-white mb-1 text-sm">Potrzebujesz szybkiej odpowiedzi?</h3>
            <p className="text-xs text-gray-400 mb-3">Zadzwoń — nasi eksperci odpowiedzą na wszystkie pytania techniczne!</p>
            <a href="tel:+48509567213">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-[#f81828] transition-all hover:bg-[#f81828] hover:text-white" style={{ border: "1px solid rgba(248,24,40,0.4)" }}>
                <Phone className="w-4 h-4" /> Zadzwoń teraz
              </button>
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 rounded-xl p-8" style={card}>
          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>
                <Check className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-display text-2xl font-black text-white mb-2">Wiadomość wysłana!</h3>
              <p className="text-gray-500 mb-6 text-sm">Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin roboczych.</p>
              <button onClick={() => setSent(false)} className="px-6 py-2.5 rounded-lg bg-[#f81828] text-white font-bold text-sm hover:bg-[#c8000f] transition-colors">Wyślij kolejną wiadomość</button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-black text-white mb-6 flex items-center gap-2">
                <span className="w-[3px] h-6 bg-[#f81828] rounded-full" /> Wyślij wiadomość
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500 mb-1.5 block">Imię i nazwisko *</Label>
                    <Input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jan Kowalski"
                      className="text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] text-sm h-10"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1.5 block">Telefon *</Label>
                    <Input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+48..."
                      className="text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] text-sm h-10"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1.5 block">Email *</Label>
                  <Input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="jan@przyklad.pl"
                    className="text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] text-sm h-10"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1.5 block">Temat</Label>
                  <Input value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} placeholder="np. Zapytanie o tynki elewacyjne"
                    className="text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] text-sm h-10"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1.5 block">Wiadomość *</Label>
                  <Textarea required rows={5} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Opisz swoje potrzeby, projekt lub pytanie..."
                    className="text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] resize-none text-sm"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
                <div className="flex items-start gap-2.5">
                  <Checkbox id="gdpr" required checked={agreed} onCheckedChange={v => setAgreed(!!v)} className="mt-0.5" />
                  <Label htmlFor="gdpr" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                    Wyrażam zgodę na przetwarzanie danych osobowych przez Media Bud w celu odpowiedzi na zapytanie. Dane nie będą przekazywane osobom trzecim.{" "}
                    <Link to="/polityka-prywatnosci" className="text-[#f81828] underline">Polityka prywatności</Link> *
                  </Label>
                </div>
                <button type="submit" disabled={!agreed}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  style={{ background: "#f81828" }}
                  onMouseEnter={e => { if (!(!agreed)) { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(248,24,40,0.4)"; } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <Mail className="w-4 h-4" /> Wyślij wiadomość
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ────────────────────────────────────────────────────
export function AboutPage() {
  const stats = [
    { value: "15+", label: "Lat na rynku" },
    { value: "1000+", label: "Produktów w ofercie" },
    { value: "500+", label: "Zadowolonych klientów" },
    { value: "50+", label: "Partnerów-producentów" },
  ];
  const values = [
    { icon: <Award className="w-6 h-6 text-[#f81828]" />, title: "Jakość", desc: "Oferujemy wyłącznie produkty od renomowanych producentów z certyfikatami i atestami." },
    { icon: <Users className="w-6 h-6 text-[#f81828]" />, title: "Fachowość", desc: "Nasz zespół to doświadczeni specjaliści z wieloletnią praktyką w budownictwie." },
    { icon: <Star className="w-6 h-6 text-[#f81828]" />, title: "Zaufanie", desc: "Długoletnie relacje z klientami i partnerami budowane na rzetelności i uczciwości." },
    { icon: <Truck className="w-6 h-6 text-[#f81828]" />, title: "Kompleksowość", desc: "Od zakupu materiałów po doradztwo techniczne i transport – wszystko w jednym miejscu." },
  ];
  const timeline = [
    { year: "2008", title: "Założenie firmy", desc: "Media Bud otwiera pierwszy skład budowlany w Lublinie." },
    { year: "2012", title: "Rozszerzenie oferty", desc: "Wprowadzamy pełną gamę systemów ociepleń ETICS i chemii budowlanej." },
    { year: "2016", title: "Partnerstwa premium", desc: "Zostajemy autoryzowanym dystrybutorem Weber, Rockwool i Swisspor." },
    { year: "2020", title: "Obsługa B2B", desc: "Uruchamiamy dedykowane programy dla deweloperów i firm budowlanych." },
    { year: "2024", title: "Nowy sklep online", desc: "Uruchamiamy nową platformę e-commerce z pełnym katalogiem produktów." },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2) 60%,transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top,#080808,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-10 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-3">O firmie</p>
              <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-4 leading-tight">O firmie Media Bud</h1>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Profesjonalna hurtownia materiałów budowlanych w Lublinie. Obsługujemy deweloperów, wykonawców i klientów indywidualnych, oferując kompleksowe wsparcie techniczne i najwyższą jakość produktów.</p>
              <div className="flex gap-3 flex-wrap">
                <a href="tel:+48509567213">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f81828] text-white text-sm font-bold hover:bg-[#c8000f] transition-all hover:shadow-[0_0_16px_rgba(248,24,40,0.4)]">
                    <Phone className="w-4 h-4" /> Zadzwoń
                  </button>
                </a>
                <Link to="/kontakt">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-gray-300 hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                    Napisz do nas
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <div key={i} className="rounded-xl p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="font-display font-black text-3xl text-[#f81828] mb-1">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">

        {/* Misja */}
        <div className="rounded-xl p-8" style={card}>
          <h2 className="font-display text-2xl font-black text-white mb-4 flex items-center gap-2">
            <span className="w-[3px] h-6 bg-[#f81828] rounded-full" /> Nasza misja
          </h2>
          <p className="text-gray-400 leading-relaxed">Media Bud to więcej niż hurtownia budowlana. Jesteśmy partnerem w realizacji projektów budowlanych — od małych remontów domowych po duże inwestycje deweloperskie. Naszą misją jest dostarczanie wysokiej jakości materiałów budowlanych połączone z profesjonalnym doradztwem technicznym, które pomaga naszym klientom budować lepiej, szybciej i efektywniej kosztowo.</p>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="font-display text-2xl font-black text-white mb-8 flex items-center gap-2">
            <span className="w-[3px] h-6 bg-[#f81828] rounded-full" /> Historia firmy
          </h2>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: "rgba(248,24,40,0.25)" }} />
            {timeline.map((item, i) => (
              <div key={i} className="relative mb-8 last:mb-0">
                <div className="absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#f81828", boxShadow: "0 0 12px rgba(248,24,40,0.4)" }}>
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="rounded-xl p-5 ml-2" style={card}>
                  <div className="font-mono text-xs font-bold text-[#f81828] mb-1">{item.year}</div>
                  <div className="font-display font-black text-white text-base mb-1">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wartości */}
        <div>
          <h2 className="font-display text-2xl font-black text-white mb-6 text-center">Nasze wartości</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={i} className={`rounded-xl p-6 text-center ${cardHover}`} style={card}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.18)" }}>
                  {v.icon}
                </div>
                <h3 className="font-display font-bold text-white mb-2">{v.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnerzy */}
        <div className="rounded-xl p-8" style={card}>
          <h2 className="font-display text-2xl font-black text-white mb-2 flex items-center gap-2">
            <span className="w-[3px] h-6 bg-[#f81828] rounded-full" /> Nasi partnerzy i dostawcy
          </h2>
          <p className="text-gray-500 text-sm mb-6">Współpracujemy z wiodącymi producentami materiałów budowlanych, gwarantując oryginalność i jakość każdego produktu.</p>
          <div className="flex flex-wrap gap-2">
            {["Weber","Ceresit","Atlas","Knauf","Rockwool","Swisspor","Styropmin","Caparol","Alpol","Termo Organika","Hilti","Tytan","Mapei","Isomat","Bolix"].map(brand => (
              <span key={brand} className="px-3.5 py-1.5 text-sm font-medium text-gray-400 rounded-full transition-all cursor-default hover:text-white hover:bg-[#f81828]" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES PAGE ─────────────────────────────────────────────────
export function ServicesPage() {
  const services = [
    { icon: "🏗️", title: 'Program "Dom od podstaw"', slug: "dom-od-podstaw", desc: "Kompleksowe wsparcie przez cały proces budowy – od fundamentów po wykończenie.", features: ["Dobór materiałów do każdego etapu budowy","Koordynacja dostaw na harmonogram","Optymalizacja kosztów materiałowych","Wsparcie techniczne na każdym kroku"] },
    { icon: "🔧", title: "Doradztwo techniczne", slug: "doradztwo-techniczne", desc: "Bezpłatne konsultacje z ekspertami – telefonicznie, online lub w naszym składzie.", features: ["Dobór systemu ociepleń ETICS","Analiza projektów budowlanych","Optymalizacja specyfikacji materiałowej","Doradztwo w zakresie energooszczędności"] },
    { icon: "🚚", title: "Transport materiałów", slug: "transport", desc: "Szybka dostawa materiałów na teren Lublina i województwa lubelskiego.", features: ["Dostawy na plac budowy","Elastyczne terminy dostaw","Rozładunek przy budynku","Koordynacja wielu dostaw"] },
    { icon: "👷", title: "Podwykonawstwo", slug: "podwykonawstwo", desc: "Realizacja prac tynkarskich i ociepleniowych przez naszych wykwalifikowanych specjalistów.", features: ["Tynkowanie maszynowe i ręczne","Wykonanie systemów ociepleń ETICS","Doświadczone ekipy wykonawcze","Gwarancja na wykonane prace"] },
    { icon: "🤝", title: "Sieć specjalistów", slug: "siec-specjalistow", desc: "Polecamy sprawdzonych wykonawców – tynkarzy, układaczy, ekipy budowlane.", features: ["Zweryfikowani i polecani fachowcy","Tynkarze i specjaliści ETICS","Ekipy do kompleksowych remontów","Koordynacja z dostawą materiałów"] },
    { icon: "🏢", title: "Obsługa deweloperów B2B", slug: "deweloperzy", desc: "Dedykowane warunki dla firm deweloperskich realizujących inwestycje wielorodzinne.", features: ["Indywidualne cenniki wolumenowe","Dedykowany opiekun handlowy","Faktury zbiorcze i odroczona płatność","Dokumentacja techniczna dla inwestorów"] },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2) 60%,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-10 py-12">
          <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-2">Usługi</p>
          <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">Nasze usługi</h1>
          <p className="text-gray-400 text-sm">Kompleksowa obsługa Twojego projektu budowlanego — od doradztwa po realizację.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={i} className={`rounded-xl p-6 ${cardHover}`} style={card}>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h2 className="font-display font-black text-white text-base mb-2">{s.title}</h2>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{s.desc}</p>
              <ul className="space-y-2 mb-6">
                {s.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link to="/kontakt">
                <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#f81828] text-white text-xs font-bold hover:bg-[#c8000f] transition-all hover:shadow-[0_0_12px_rgba(248,24,40,0.3)]">
                  Zapytaj o usługę <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ───────────────────────────────────────────────────
type AdminTab = "dashboard" | "products" | "categories" | "blog" | "inquiries" | "settings";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: "", pass: "" });

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#080808" }}>
        <div className="rounded-2xl w-full max-w-sm p-8" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#f81828] rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(248,24,40,0.4)]">
              <span className="text-white font-black text-sm">MB</span>
            </div>
            <div>
              <div className="font-black text-white text-sm">Media Bud Admin</div>
              <div className="text-xs text-gray-600">Panel zarządzania</div>
            </div>
          </div>
          <form onSubmit={e => { e.preventDefault(); if (loginForm.user === "admin" && loginForm.pass === "admin123") { setLoggedIn(true); } else { toast.error("Błędne dane logowania (admin / admin123)"); } }} className="space-y-4">
            <div>
              <Label className="text-xs text-gray-500 mb-1.5 block">Login</Label>
              <Input value={loginForm.user} onChange={e => setLoginForm(f => ({...f, user: e.target.value}))} placeholder="admin"
                className="text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] text-sm h-10"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1.5 block">Hasło</Label>
              <Input type="password" value={loginForm.pass} onChange={e => setLoginForm(f => ({...f, pass: e.target.value}))} placeholder="••••••••"
                className="text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-[#f81828] text-sm h-10"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
            </div>
            <button type="submit" className="w-full py-2.5 rounded-lg bg-[#f81828] text-white font-bold text-sm hover:bg-[#c8000f] transition-colors">Zaloguj się</button>
            <p className="text-xs text-center text-gray-600">Demo: login <strong className="text-gray-400">admin</strong> / hasło <strong className="text-gray-400">admin123</strong></p>
          </form>
        </div>
      </div>
    );
  }

  const navItems: { id: AdminTab; icon: React.ReactNode; label: string; count?: number }[] = [
    { id: "dashboard", icon: <BarChart2 className="w-4 h-4" />, label: "Dashboard" },
    { id: "products", icon: <Package className="w-4 h-4" />, label: "Produkty", count: products.length },
    { id: "categories", icon: <Tag className="w-4 h-4" />, label: "Kategorie", count: categories.length },
    { id: "blog", icon: <Menu className="w-4 h-4" />, label: "Blog", count: blogPosts.length },
    { id: "inquiries", icon: <Mail className="w-4 h-4" />, label: "Zapytania", count: 5 },
    { id: "settings", icon: <Settings className="w-4 h-4" />, label: "Ustawienia" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#080808" }}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-14"} flex-shrink-0 transition-all duration-200 flex flex-col`} style={{ background: "#0a0a0a", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="p-4 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {sidebarOpen && <><div className="w-7 h-7 bg-[#f81828] rounded flex items-center justify-center"><span className="text-white font-black text-xs">MB</span></div><span className="font-bold text-sm text-white">Admin</span></>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-gray-500 hover:text-[#f81828] transition-colors">
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeTab === item.id ? "bg-[#f81828] text-white" : "text-gray-500 hover:text-white hover:bg-white/5"}`}>
              {item.icon}
              {sidebarOpen && <><span className="flex-1 text-left">{item.label}</span>{item.count !== undefined && <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "#9ca3af" }}>{item.count}</span>}</>}
            </button>
          ))}
        </nav>
        <div className="p-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={() => setLoggedIn(false)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors">
            <LogOut className="w-4 h-4" />{sidebarOpen && "Wyloguj"}
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-6">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-black text-white mb-6 font-display">Dashboard</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Produkty", value: products.length, color: "#3b82f6" },
                { label: "Kategorie", value: categories.length, color: "#10b981" },
                { label: "Artykuły", value: blogPosts.length, color: "#8b5cf6" },
                { label: "Zapytania", value: 5, color: "#f81828" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-5 flex items-center gap-4" style={card}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "22", border: `1px solid ${s.color}44` }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-display">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden" style={card}>
              <div className="px-5 py-3.5 text-sm font-bold text-white" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>Ostatnie zapytania</div>
              <table className="w-full text-sm">
                <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}><th className="px-4 py-2.5 text-left text-xs text-gray-500 font-medium">Klient</th><th className="px-4 py-2.5 text-left text-xs text-gray-500 font-medium hidden sm:table-cell">Produkt</th><th className="px-4 py-2.5 text-left text-xs text-gray-500 font-medium hidden md:table-cell">Data</th><th className="px-4 py-2.5 text-left text-xs text-gray-500 font-medium">Status</th></tr></thead>
                <tbody>
                  {[["Jan Kowalski","Tynk silikonowy Weber","2026-05-27","Nowe"],["Anna Nowak","Styropian EPS 100","2026-05-26","W trakcie"],["Piotr Wiśniewski","Wełna Rockwool","2026-05-25","Odpowiedziano"],["Budex Sp. z o.o.","Farby Caparol","2026-05-24","Nowe"],["Marek Zając","Klej Atlas","2026-05-23","Zamknięte"]].map(([name,prod,date,status],i) => (
                    <tr key={i} style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <td className="px-4 py-2.5 font-medium text-gray-300 text-xs">{name}</td>
                      <td className="px-4 py-2.5 text-gray-500 text-xs hidden sm:table-cell">{prod}</td>
                      <td className="px-4 py-2.5 text-gray-600 text-xs hidden md:table-cell">{date}</td>
                      <td className="px-4 py-2.5"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status==="Nowe"?"bg-[#f81828] text-white":status==="W trakcie"?"bg-amber-500/20 text-amber-400":status==="Odpowiedziano"?"bg-emerald-500/20 text-emerald-400":"bg-white/8 text-gray-500"}`}>{status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black text-white font-display">Produkty ({products.length})</h1>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f81828] text-white text-sm font-bold hover:bg-[#c8000f] transition-colors"><Plus className="w-4 h-4" />Dodaj produkt</button>
            </div>
            <div className="rounded-xl overflow-hidden" style={card}>
              <table className="w-full text-sm">
                <thead><tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}><th className="px-4 py-3 text-left text-xs text-gray-500 font-medium">Produkt</th><th className="px-4 py-3 text-left text-xs text-gray-500 font-medium hidden md:table-cell">Marka</th><th className="px-4 py-3 text-left text-xs text-gray-500 font-medium hidden sm:table-cell">Jednostka</th><th className="px-4 py-3 text-left text-xs text-gray-500 font-medium">Akcje</th></tr></thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={p.id} className="hover:bg-white/3 transition-colors" style={{ borderBottom: i < products.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={p.images[0]} alt={p.name} className="w-9 h-9 object-cover rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.07)" }} /><div className="font-medium text-gray-300 text-xs line-clamp-1">{p.name}</div></div></td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{p.brand}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{p.unit}</td>
                      <td className="px-4 py-3"><div className="flex gap-1"><button className="w-7 h-7 flex items-center justify-center rounded text-blue-400 hover:bg-blue-400/10 transition-colors"><Pencil className="w-3 h-3" /></button><button className="w-7 h-7 flex items-center justify-center rounded text-red-400 hover:bg-red-400/10 transition-colors"><Trash2 className="w-3 h-3" /></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h1 className="text-2xl font-black text-white mb-6 font-display">Ustawienia</h1>
            <div className="grid gap-4">
              {[["Dane firmy","Nazwa, adres, kontakt, godziny otwarcia"],["SEO","Meta tytuły, opisy, słowa kluczowe"],["Integracje","Google Analytics 4, Google My Business, Facebook Pixel"],["Użytkownicy admin","Zarządzaj dostępami do panelu"],["Wygląd sklepu","Kolory, logo, banery"]].map(([title, desc], i) => (
                <div key={i} className="rounded-xl p-5 flex items-center justify-between" style={card}>
                  <div><div className="font-bold text-white text-sm">{title}</div><div className="text-xs text-gray-500 mt-0.5">{desc}</div></div>
                  <button className="px-3.5 py-1.5 rounded-lg text-[#f81828] text-xs font-bold transition-all hover:bg-[#f81828] hover:text-white" style={{ border: "1px solid rgba(248,24,40,0.3)" }}>Edytuj</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "categories" || activeTab === "blog" || activeTab === "inquiries") && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-4xl mb-3">🏗️</div>
              <p className="text-gray-500 text-sm">Sekcja w budowie</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
