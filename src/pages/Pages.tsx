import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Check, Users, Award, Truck, Star, ChevronRight, BarChart2, Package, Tag, Settings, LogOut, Menu, X, Plus, Pencil, Trash2, Zap, Shield, ArrowRight, Home, PaintBucket, Ruler, Hammer, Building2, HousePlus } from "lucide-react";
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
  const [form, setForm]   = useState({ name: "", email: "", phone: "", subject: "", message: "", attachments: [] as File[] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Wiadomość wysłana! Odpowiemy w ciągu 24h.");
  };

  const contactItems = [
    { icon: <Phone className="w-5 h-5 text-[#f81828]" />, label: "Telefon", value: "+48 509 567 213", href: "tel:+48509567213" },
    { icon: <Mail className="w-5 h-5 text-[#f81828]" />, label: "Email", value: "sprzedaz@mediabud.pl", href: "mailto:sprzedaz@mediabud.pl" },
    { icon: <MapPin className="w-5 h-5 text-[#f81828]" />, label: "Adres", value: "ul. Chemiczna 8d, 20-329 Lublin", href: undefined },
    { icon: <Clock className="w-5 h-5 text-[#f81828]" />, label: "Godziny otwarcia", value: "Pon–Pt: 7:00–16:00", href: undefined },
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
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "#888" }}>
                    Załączniki <span className="text-[#666] font-normal normal-case tracking-normal">(opcjonalnie)</span>
                  </label>
                  <label
                    className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200"
                    style={{ background: "#111", border: "1px dashed #2d2d2d" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.5)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#2d2d2d"; }}
                  >
                    <span className="text-[#f81828]">📎</span>
                    <span className="text-sm" style={{ color: "#888" }}>
                      {form.attachments.length > 0
                        ? `${form.attachments.length} plik(ów) wybranych`
                        : "Dodaj pliki (JPG, PNG, WEBP, PDF, DOC, DOCX, XLS, XLSX)"}
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx"
                      className="hidden"
                      onChange={e => setForm(f => ({ ...f, attachments: Array.from(e.target.files || []) }))}
                    />
                  </label>
                  {form.attachments.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {form.attachments.map((file, i) => (
                        <li key={i} className="text-xs flex items-center gap-2" style={{ color: "#888" }}>
                          <span className="text-[#f81828]">✓</span> {file.name}
                        </li>
                      ))}
                    </ul>
                  )}
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

      {/* ── ZESPÓŁ — Nasi doradcy ── */}
      <section className="py-16" style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: "#f81828" }}>— NASZ ZESPÓŁ —</p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-3">Nasi doradcy</h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: "#888" }}>
              Jesteśmy do dyspozycji — skontaktuj się bezpośrednio z naszym specjalistą.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { initials: "MB", name: "Imię Nazwisko", role: "Doradca techniczny", phone: "+48 509 567 213", email: "sprzedaz@mediabud.pl" },
              { initials: "MB", name: "Imię Nazwisko", role: "Specjalista ds. materiałów", phone: "+48 509 567 213", email: "sprzedaz@mediabud.pl" },
              { initials: "MB", name: "Imię Nazwisko", role: "Obsługa klienta B2B", phone: "+48 509 567 213", email: "sprzedaz@mediabud.pl" },
              { initials: "MB", name: "Imię Nazwisko", role: "Doradca wykonawczy", phone: "+48 509 567 213", email: "sprzedaz@mediabud.pl" },
              { initials: "MB", name: "Imię Nazwisko", role: "Logistyka i dostawy", phone: "+48 509 567 213", email: "sprzedaz@mediabud.pl" },
              { initials: "MB", name: "Imię Nazwisko", role: "Koordynator projektów", phone: "+48 509 567 213", email: "sprzedaz@mediabud.pl" },
            ].map((person, i) => (
              <div
                key={i}
                className="rounded-xl p-5 flex items-start gap-4 transition-all duration-300"
                style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.35)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(248,24,40,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black text-white" style={{ background: "linear-gradient(135deg, #f81828, #c8000f)" }}>
                  {person.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white text-sm mb-0.5">{person.name}</div>
                  <div className="text-xs mb-3" style={{ color: "#f81828" }}>{person.role}</div>
                  <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-xs mb-1 transition-colors hover:text-white" style={{ color: "#888" }}>
                    📞 {person.phone}
                  </a>
                  <a href={`mailto:${person.email}`} className="flex items-center gap-1.5 text-xs transition-colors hover:text-white" style={{ color: "#888" }}>
                    ✉ {person.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
      </div>

      {/* ── Nasze wartości ── */}
      <section className="py-16" style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: "#f81828" }}>— CO NAS WYRÓŻNIA —</p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-3">Kilka słów o tym, jak pracujemy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🤝", title: "Jeden partner", desc: "Materiały, doradztwo i koordynacja wykonawców — wszystko w jednym miejscu. Budujesz z jednym punktem kontaktu, nie z dziesiątką podwykonawców." },
              { icon: "📐", title: "Konkretna wycena", desc: "Nie operujemy ogólnikami. Przygotowujemy wycenę opartą na Twoim projekcie, wybranej technologii i harmonogramie — bez ukrytych kosztów." },
              { icon: "🏗️", title: "Sprawdzone ekipy", desc: "Współpracujemy z tynkarzami, murarzami, dekarzami i specjalistami wykończenia, których znamy z realizacji. Polecamy sprawdzonych, nie losowych." },
              { icon: "🔧", title: "Doradztwo techniczne", desc: "Mamy materiały wiodących marek: Weber, Ceresit, Atlas, Knauf, Rockwool i innych. Doradzamy, który system sprawdzi się w Twoich warunkach." },
              { icon: "🏢", title: "Duże i małe projekty", desc: "Obsługujemy zarówno domy jednorodzinne, jak i galerie handlowe, szkoły i budynki użyteczności publicznej. Dostosowujemy logistykę do skali inwestycji." },
              { icon: "📍", title: "Lublin i region", desc: "Działamy w Lublinie i województwie lubelskim. Znamy lokalny rynek, ceny materiałów i realia budowy w naszym regionie." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-6 transition-all duration-300"
                style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.35)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a"; }}>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">

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

type ServiceSegment = "B2C" | "B2B" | "Oba";

type ServiceDetail = {
  slug: string;
  title: string;
  segment: ServiceSegment;
  icon: React.ReactNode;
  badge: string;
  krotkiOpis: string;
  dlugiOpis: string;
  parametry: string[];
  zastosowanie: string[];
  zalety: string[];
  korzysci: string[];
  ostrzezenia: string[];
  frazySEO: string[];
  cta: string;
};

type FaqItem = { q: string; a: string };

const services: ServiceDetail[] = [
  {
    slug: "dom-od-podstaw",
    title: "Dom od podstaw",
    segment: "B2C",
    icon: <Shield className="w-6 h-6 text-[#f81828]" />,
    badge: "Program parasolowy B2C",
    krotkiOpis: "Program MediaBud dla inwestorów z Lublina i województwa lubelskiego, który łączy wycenę, dobór materiałów, koordynację ekip i realizację domu od pierwszego kontaktu po etap wykończeniowy.",
    dlugiOpis: `Budowa domu to złożony proces, który wymaga dziesiątek decyzji — od wyboru materiałów, przez koordynację ekip, aż po logistykę dostaw. Program 'Dom od podstaw" powstał po to, żeby inwestor miał jeden punkt kontaktu zamiast kilkunastu. Zaczynamy od analizy projektu i rozmowy o budżecie, ustalamy harmonogram etapów i dobieramy materiały z naszego składu — Weber, Ceresit, Atlas, Knauf, Rockwool, Swisspor, Bolix, Baumit, Rigips i inne. Następnie koordynujemy prace ekip i dbamy o to, żeby każdy etap — od fundamentów, przez ściany i dach, po wykończenie — przebiegał bez przestojów. Jesteśmy z Tobą od pierwszego spotkania do odbioru kluczy.`,
    parametry: [
      "Zakres: od wyceny i doboru materiałów po realizację wybranych etapów lub całości inwestycji.",
      "Obsługa lokalna: Lublin i województwo lubelskie.",
      "Model współpracy: konsultacja, kosztorys, harmonogram dostaw, rekomendacja lub koordynacja ekip.",
      "Materiały systemowe: Weber, Ceresit, Atlas, Knauf, Rockwool, Swisspor, Bolix, Termo Organika, Baumit, Rigips, Ursa.",
      "Kontakt operacyjny: ul. Chemiczna 8, 20-329 Lublin, +48 509 567 213, sprzedaz@mediabud.pl.",
      "Koszt realizacji programu: [do potwierdzenia] — zależny od zakresu i etapu inwestycji."
    ],
    zastosowanie: [
      "Budowa domu jednorodzinnego od stanu zero do wykończenia.",
      "Prowadzenie inwestycji etapami z kontrolą budżetu i dostaw.",
      "Dobór materiałów oraz wykonawców dla inwestora bez własnego zaplecza technicznego.",
      "Koordynacja prac ociepleniowych, dekarskich, elewacyjnych i wykończeniowych.",
      "Współpraca z klientem, który chce jeden punkt kontaktu zamiast wielu podwykonawców."
    ],
    zalety: [
      "Jedna ścieżka obsługi od wyceny po realizację.",
      "Połączenie składu budowlanego z praktycznym doradztwem wykonawczym.",
      "Lepsza kontrola harmonogramu dostaw i etapowania robót.",
      "Dostęp do sprawdzonej sieci fachowców z regionu.",
      "Treść zoptymalizowana pod lokalne zapytania typu budowa domu Lublin i dom od podstaw lubelskie."
    ],
    korzysci: [
      "Mniej czasu poświęconego na samodzielne szukanie ekip i materiałów.",
      "Mniejsze ryzyko nietrafionych zamówień oraz przestojów na budowie.",
      "Spójność systemów materiałowych od stanu surowego po wykończenie.",
      "Łatwiejsza komunikacja między inwestorem, składem i wykonawcą."
    ],
    ostrzezenia: [
      "Zakres programu i odpowiedzialność za poszczególne etapy trzeba każdorazowo potwierdzić w wycenie.",
      "Nie każda technologia lub termin jest dostępny od ręki — zależy to od obłożenia ekip i producentów.",
      "Dane budżetowe i terminy wstępne należy traktować jako orientacyjne do czasu analizy projektu.",
      "Formalności projektowe, administracyjne i odbiorowe wymagają odrębnego potwierdzenia zakresu po stronie inwestora lub partnerów."
    ],
    frazySEO: ["dom od podstaw Lublin", "budowa domu od wyceny po realizację", "skład budowlany z wykonawstwem Lublin", "budowa domu lubelskie"],
    cta: "Umów konsultację programu Dom od podstaw"
  },
  {
    slug: "budowa-domow-lublin",
    title: "Budowa domów Lublin",
    segment: "B2C",
    icon: <Home className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C · stan surowy do pod klucz",
    krotkiOpis: "Kompleksowa budowa domów jednorodzinnych w Lublinie i województwie lubelskim z naciskiem na logistykę materiałów, dobór technologii i sprawdzone ekipy wykonawcze.",
    dlugiOpis: `Oferujemy kompleksową budowę domów jednorodzinnych w Lublinie i okolicach, łącząc materiały z własnego składu z ekipami wykonawczymi, które znamy i którym ufamy. Każda realizacja zaczyna się od analizy projektu i przygotowania szczegółowej wyceny. Następnie prowadzimy budowę etapami — fundamenty, ściany, strop, dach — pilnując harmonogramu i jakości. Orientacyjne koszty budowy w naszym regionie to ok. 4 500–6 000 zł netto za m² w stanie deweloperskim; finalną wycenę zawsze opieramy na konkretnym projekcie, technologii i zakresie robót. Nie deklarujemy gotowych pakietów — zamiast tego przygotowujemy ofertę skrojoną na miarę Twojej inwestycji.`,
    parametry: [
      "Segment: B2C, domy jednorodzinne i inwestycje prywatne.",
      "Zasięg: Lublin i województwo lubelskie.",
      "Etapy: fundamenty, stan surowy, dach, elewacja, wybrane etapy pod klucz.",
      "Koszt stanu deweloperskiego wg researchu: 4500–6000 zł netto/m².",
      "Koszt domu pod klucz premium wg researchu regionalnego: 6800–9000 zł/m².",
      "Technologie i systemy dobierane indywidualnie do projektu oraz budżetu inwestora."
    ],
    zastosowanie: [
      "Budowa domu jednorodzinnego od podstaw.",
      "Realizacja domu z dostawą materiałów z jednego składu budowlanego.",
      "Etapowanie inwestycji na stan surowy, deweloperski lub rozszerzony zakres wykonawczy.",
      "Obsługa inwestorów z Lublina, Świdnika, Puław i innych miejscowości województwa lubelskiego.",
      "Optymalizacja projektu pod koszty wykonawcze i logistykę placu budowy."
    ],
    zalety: [
      "Jedna oferta łącząca materiały, doradztwo i wykonawstwo.",
      "Silne dopasowanie do lokalnych zapytań: budowa domów Lublin, budowa domu lubelskie.",
      "Możliwość etapowania prac zgodnie z budżetem inwestora.",
      "Dobór sprawdzonych marek i systemów budowlanych.",
      "Przejrzysta komunikacja kosztowa bez sztucznego obiecywania stawek bez projektu."
    ],
    korzysci: [
      "Łatwiejsze porównanie technologii i kosztów na starcie inwestycji.",
      "Lepsza kontrola nad terminami oraz dostawami materiałów.",
      "Mniejsze ryzyko zakupów niespójnych systemowo.",
      "Wsparcie inwestora na etapie decyzji technicznych i organizacyjnych."
    ],
    ostrzezenia: [
      "Finalna wycena zależy od projektu, gruntu, bryły budynku i standardu wykończenia.",
      "Podane w researchu widełki kosztowe są orientacyjne i nie stanowią oferty handlowej.",
      "Terminy realizacji trzeba potwierdzić po określeniu zakresu i dostępności ekip.",
      "Roboty dodatkowe oraz zmiany projektowe w trakcie budowy wpływają na koszt i harmonogram."
    ],
    frazySEO: ["budowa domów Lublin", "budowa domu Lublin", "budowa domu lubelskie", "dom pod klucz Lublin"],
    cta: "Poproś o wycenę budowy domu w Lublinie"
  },
  {
    slug: "termomodernizacja-ocieplenia",
    title: "Termomodernizacja i ocieplenia",
    segment: "B2C",
    icon: <Zap className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C · oszczędność energii",
    krotkiOpis: "Kompleksowa termomodernizacja domu w Lublinie: ocieplenie ścian, dobór systemu ETICS, wsparcie w doborze materiałów i przygotowaniu inwestycji pod programy dotacyjne.",
    dlugiOpis: `Ocieplenie domu to inwestycja, która zwraca się przez lata niższych rachunków za ogrzewanie. Pomagamy dobrać odpowiedni system — ETICS ze styropianem grafitowym, białym EPS lub wełną mineralną — w zależności od budynku, jego podłoża i oczekiwanej efektywności energetycznej. Współpracujemy z systemami marek Weber, Ceresit, Atlas, Rockwool, Swisspor, Termo Organika i Baumit. Jeśli planujesz skorzystać z programu Czyste Powietrze (dofinansowanie może sięgać do 136 200 zł), pomagamy ułożyć inwestycję pod wymagania programu — dobieramy materiały, omawiamy zakres robót i wspieramy w przygotowaniu dokumentacji. Szczegóły dofinansowania zależą od indywidualnej sytuacji i aktualnych przepisów, dlatego zawsze omawiamy je konkretnie dla danego projektu.`,
    parametry: [
      "Zakres: ocena potrzeb budynku, dobór systemu ocieplenia, materiały, wykonawstwo i logistyka.",
      "Dofinansowanie wg researchu: do 136 200 zł w programie Czyste Powietrze.",
      "Prefinansowanie wg WFOŚiGW Lublin: do 35% przy spełnieniu warunków programu.",
      "Materiały: styropian, wełna mineralna, kleje, siatki, grunty, tynki, farby elewacyjne.",
      "Marki: Weber, Ceresit, Atlas, Rockwool, Swisspor, Bolix, Termo Organika, Baumit.",
      "Powiązanie z OZE i dodatkowymi programami: Mój Prąd — zakres i aktualność [do potwierdzenia] przed wdrożeniem do oferty."
    ],
    zastosowanie: [
      "Ocieplenie starszego domu jednorodzinnego.",
      "Termomodernizacja budynku przed sezonem grzewczym.",
      "Modernizacja elewacji połączona z poprawą efektywności energetycznej.",
      "Przygotowanie inwestycji do wniosku lub rozliczenia programu Czyste Powietrze.",
      "Połączenie ocieplenia z wymianą wybranych warstw wykończeniowych elewacji."
    ],
    zalety: [
      "Lokalne dopasowanie do potrzeb inwestorów z Lublina i lubelskiego.",
      "Łączenie wiedzy materiałowej ze wsparciem wykonawczym.",
      "Realna komunikacja korzyści energetycznych i formalnych bez nadużyć sprzedażowych.",
      "Możliwość pracy na kompletnych systemach renomowanych marek.",
      "Treść odpowiada na pytania SEO/AEO: ile można dostać, jak zacząć, jakie materiały wybrać."
    ],
    korzysci: [
      "Niższe straty ciepła i większy komfort użytkowania budynku.",
      "Lepsze uporządkowanie kosztów inwestycji i dokumentacji wykonawczej.",
      "Spójność materiałów i wykonania w jednym procesie.",
      "Większa przewidywalność harmonogramu robót ociepleniowych."
    ],
    ostrzezenia: [
      "Warunki programu Czyste Powietrze mogą się zmieniać, dlatego każdy przypadek trzeba potwierdzić przed podpisaniem umowy.",
      "MediaBud nie gwarantuje przyznania dotacji — decyzja zależy od programu i sytuacji beneficjenta.",
      "Zakres programu Mój Prąd należy potwierdzić na dzień zapytania; nie wolno komunikować nieistniejących edycji lub gwarantowanych dopłat.",
      "Dobór grubości izolacji i systemu powinien wynikać z parametrów budynku, a nie wyłącznie z ceny materiału."
    ],
    frazySEO: ["termomodernizacja Lublin", "ocieplenie domu Lublin", "Czyste Powietrze Lublin", "ocieplenia lubelskie"],
    cta: "Zapytaj o wycenę termomodernizacji domu"
  },
  {
    slug: "wykonczenia-wnetrz-pod-klucz",
    title: "Wykończenia wnętrz pod klucz",
    segment: "B2C",
    icon: <PaintBucket className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C · gotowe do zamieszkania",
    krotkiOpis: "Kompleksowe wykończenia wnętrz pod klucz dla domów i mieszkań w Lublinie — od materiałów i suchej zabudowy po finalne warstwy dekoracyjne.",
    dlugiOpis: `Usługa wykończenia wnętrz pod klucz odpowiada na lokalne zapotrzebowanie na realizacje ‚całej przestrzeni', a nie pojedynczych pomieszczeń — dokładnie taki model podkreślają analizowane strony konkurencji z Lublina. MediaBud rozwija tę ofertę w oparciu o przewagę składu budowlanego: łatwy dostęp do materiałów, wsparcie w doborze systemów Knauf, Rigips, Atlas, Weber i Baumit oraz koordynację ekip od suchej zabudowy, gładzi, malowania, podłóg i zabudów poddaszy. Usługa jest kierowana do inwestorów, którzy chcą odebrać wnętrze gotowe do użytkowania lub gotowe do wyposażenia, bez samodzielnego zarządzania wieloma wykonawcami. W treści podkreślamy spójność projektu, ograniczenie ryzyka nieprzewidzianych kosztów i sensowne etapowanie materiałów — zgodnie z tym, czego szukają użytkownicy wpisujący w Google frazy typu wykończenia wnętrz pod klucz Lublin czy mieszkanie pod klucz Lublin.`,
    parametry: [
      "Zakres: od konsultacji materiałowej po koordynację prac wykończeniowych.",
      "Obsługiwane przestrzenie: domy, mieszkania, biura i lokale usługowe.",
      "Materiały: suche zabudowy, gładzie, farby, kleje, systemy podłogowe, izolacje akustyczne.",
      "Marki: Knauf, Rigips, Atlas, Weber, Baumit, Ursa.",
      "Model rozliczenia: wg zakresu robót i standardu wykończenia [do potwierdzenia].",
      "Obszar działania: Lublin i najbliższe okolice oraz województwo lubelskie po ustaleniu logistyki."
    ],
    zastosowanie: [
      "Wykończenie nowego domu jednorodzinnego.",
      "Przygotowanie mieszkania deweloperskiego do zamieszkania.",
      "Realizacja biura lub lokalu usługowego w standardzie gotowym do użytkowania.",
      "Koordynacja wielu etapów wykończeniowych przez jednego partnera.",
      "Prace wymagające spójności materiałów i harmonogramu dostaw."
    ],
    zalety: [
      "Jedno miejsce zakupu materiałów i organizacji wykonawstwa.",
      "Lepsza kontrola nad spójnością estetyczną oraz techniczną wnętrza.",
      "Wsparcie przy wyborze rozwiązań do suchej zabudowy, poddaszy i malowania.",
      "Treść odpowiada na lokalne frazy transakcyjne i informacyjne związane z pod klucz.",
      "Możliwość pracy w modelu etapowym lub kompleksowym."
    ],
    korzysci: [
      "Oszczędność czasu inwestora przy organizacji wykończenia.",
      "Mniejsza liczba błędów wynikających z rozdzielenia materiałów i wykonawstwa.",
      "Jasny punkt kontaktu w sprawach technicznych i logistycznych.",
      "Lepsze dopasowanie standardu wykończenia do budżetu i oczekiwań."
    ],
    ostrzezenia: [
      "Bez projektu lub szczegółowego zakresu nie da się rzetelnie oszacować pełnego budżetu.",
      "Wykończenie pod klucz może obejmować różne poziomy standardu — trzeba je zapisać w ofercie.",
      "Prace specjalistyczne i meble na wymiar mogą wymagać osobnego harmonogramu.",
      "Nie każda realizacja obejmuje pojedyncze pomieszczenia; zakres należy potwierdzić na starcie."
    ],
    frazySEO: ["wykończenia wnętrz pod klucz Lublin", "mieszkanie pod klucz Lublin", "wykończenia wnętrz Lublin", "remont pod klucz lubelskie"],
    cta: "Zapytaj o wykończenie wnętrz pod klucz"
  },
  {
    slug: "budowa-domow-do-70m2",
    title: "Budowa domów do 70 m²",
    segment: "B2C",
    icon: <Ruler className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C · kompaktowe realizacje",
    krotkiOpis: "Usługa dla inwestorów planujących budowę małego domu do 70 m² w okolicach Lublina — z naciskiem na prostą logistykę, efektywną technologię i etapowanie kosztów.",
    dlugiOpis: `Małe domy do 70 m² cieszą się rosnącym zainteresowaniem — są tańsze w budowie, prostsze w utrzymaniu i często nie wymagają pozwolenia na budowę (zależy od aktualnych przepisów i przeznaczenia). Pomagamy inwestorom przejść przez cały proces: od doboru technologii i materiałów, przez etapowanie kosztów, aż po koordynację wykonawców. Skupiamy się na prostych bryłach, dobrej izolacyjności i materiałach sprawdzonych w naszym klimacie. Nie narzucamy jednego rozwiązania — każdą realizację dopasowujemy do działki, projektu i celu użytkowania.`,
    parametry: [
      "Powierzchnia referencyjna usługi: do 70 m².",
      "Typ realizacji: dom całoroczny lub rekreacyjny [do potwierdzenia w projekcie].",
      "Kluczowe cechy: prosta bryła, dobra izolacyjność, efektywna logistyka materiałowa.",
      "Zakres: wycena, dobór materiałów, wykonawstwo etapowe lub kompleksowe.",
      "Technologia wykonania: dobierana indywidualnie do projektu.",
      "Budżet realizacji: [do potwierdzenia] po analizie dokumentacji i standardu."
    ],
    zastosowanie: [
      "Budowa pierwszego niewielkiego domu dla rodziny lub pary.",
      "Realizacja domu rekreacyjnego lub weekendowego.",
      "Inwestycja na małej działce z ograniczoną powierzchnią zabudowy.",
      "Projekt wymagający zwartej bryły i ograniczenia kosztów eksploatacyjnych.",
      "Budowa domu, który można rozliczać etapami."
    ],
    zalety: [
      "Usługa dopasowana do realnych lokalnych zapytań o domy do 70 m².",
      "Łatwiejsza kontrola budżetu niż przy dużej inwestycji.",
      "Możliwość połączenia budowy z energooszczędnymi rozwiązaniami materiałowymi.",
      "Wsparcie składu budowlanego i wykonawców w jednym procesie.",
      "Dobrze nadaje się do komunikacji SEO/AEO dla użytkowników szukających małych domów w regionie."
    ],
    korzysci: [
      "Sprawniejsza organizacja budowy przy kompaktowym metrażu.",
      "Mniejsze koszty utrzymania budynku przy dobrym doborze izolacji.",
      "Czytelniejsze decyzje projektowe i materiałowe.",
      "Mniej ryzyka zakupów ponad realne potrzeby inwestycji."
    ],
    ostrzezenia: [
      "Warunki formalne dla budowy małych domów wymagają każdorazowego sprawdzenia w aktualnych przepisach i dokumentacji.",
      "Mały metraż nie oznacza automatycznie niskiego kosztu za m² — wiele zależy od standardu i technologii.",
      "Zakres pod klucz musi być opisany szczegółowo, by uniknąć rozbieżności oczekiwań.",
      "Dostępność konkretnych rozwiązań prefabrykowanych lub modułowych wymaga oddzielnego potwierdzenia."
    ],
    frazySEO: ["budowa domów do 70m2 Lublin", "dom do 70 m2 Lublin", "mały dom całoroczny lubelskie", "dom 70m2 pod klucz"],
    cta: "Poproś o konsultację dla domu do 70 m²"
  },
  {
    slug: "uslugi-dekarskie-lublin",
    title: "Usługi dekarskie Lublin",
    segment: "Oba",
    icon: <Hammer className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C / B2B · dachy i pokrycia",
    krotkiOpis: "Usługi dekarskie dla inwestorów indywidualnych i firm: dachy skośne, wybrane prace naprawcze, wymiany pokrycia oraz koordynacja materiałów dachowych.",
    dlugiOpis: `Dach to jeden z kluczowych etapów budowy — i jeden z tych, gdzie błędy wykonawcze są najbardziej kosztowne. Współpracujemy ze sprawdzonymi ekipami dekarskimi i pomagamy dobrać materiały pokryciowe, izolacje i akcesoria do konkretnego projektu. Obsługujemy zarówno nowe dachy skośne, jak i wymiany pokrycia czy prace naprawcze. Zakres każdej realizacji ustalamy po oględzinach i analizie dokumentacji — bez schematycznych ofert cenowych.`,
    parametry: [
      "Segment: B2C i B2B.",
      "Zakres: nowe dachy, wymiany pokryć, wybrane naprawy i prace towarzyszące.",
      "Powiązane materiały: pokrycia, folie, membrany, izolacje, akcesoria dachowe.",
      "Dobór rozwiązań materiałowych i logistyki dostaw na budowę.",
      "Obsługa lokalna: Lublin i województwo lubelskie.",
      "Koszt usługi: [do potwierdzenia] po oględzinach lub analizie projektu."
    ],
    zastosowanie: [
      "Dach w nowo budowanym domu jednorodzinnym.",
      "Wymiana pokrycia lub modernizacja dachu istniejącego budynku.",
      "Prace dekarskie przy obiektach usługowych i małych inwestycjach firmowych.",
      "Koordynacja dostaw materiałów dekarskich i ekip montażowych.",
      "Roboty uzupełniające przy budowie, termomodernizacji lub remoncie."
    ],
    zalety: [
      "Spójna obsługa materiałów i wykonawstwa.",
      "Oferta ważna zarówno dla klientów prywatnych, jak i firm.",
      "Dopasowanie do lokalnych zapytań typu usługi dekarskie Lublin.",
      "Możliwość łączenia prac dachowych z elewacją lub budową domu.",
      "Wsparcie logistyczne składu budowlanego przy dostawach na inwestycję."
    ],
    korzysci: [
      "Krótsza ścieżka od zapytania do realizacji prac dekarskich.",
      "Lepsza kontrola jakości materiałów użytych na dachu.",
      "Mniejsze ryzyko niedopasowania akcesoriów i warstw systemowych.",
      "Wygodniejsza organizacja prac przy większych inwestycjach etapowych."
    ],
    ostrzezenia: [
      "Stan więźby, konstrukcji i podłoża trzeba potwierdzić przed wyceną.",
      "Prace dekarskie są silnie zależne od pogody i sezonu.",
      "Nie każda usługa obejmuje pełny zakres remontu dachu — wymaga to zapisu w ofercie.",
      "Materiały i terminy mogą się różnić zależnie od typu pokrycia oraz dostępności."
    ],
    frazySEO: ["usługi dekarskie Lublin", "dekarz Lublin", "pokrycia dachowe Lublin", "remont dachu lubelskie"],
    cta: "Wyceń dach lub prace dekarskie"
  },
  {
    slug: "elewacje-tynki-lublin",
    title: "Elewacje i tynki Lublin",
    segment: "Oba",
    icon: <Award className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C / B2B · elewacje systemowe",
    krotkiOpis: "Wykonanie elewacji i tynków zewnętrznych w Lublinie dla domów, lokali i obiektów usługowych z wykorzystaniem systemów renomowanych marek.",
    dlugiOpis: `Elewacja to wizytówka budynku i jednocześnie ochrona ścian przed wilgocią i temperaturą. Pracujemy na systemach Weber, Ceresit, Atlas, Bolix i Baumit — tynki silikonowe, silikatowe, mineralne i akrylowe — dobierając rodzaj wykończenia do podłoża, stylu architektonicznego i warunków eksploatacyjnych. Usługę realizujemy zarówno dla domów jednorodzinnych, jak i obiektów usługowych czy modernizowanych budynków. Zakres typowo obejmuje: przygotowanie podłoża, wykonanie warstw systemowych i finalne wykończenie elewacji. Dokładny zakres i dobór kolorów ustalamy razem z inwestorem przed startem prac.`,
    parametry: [
      "Segment: B2C i B2B.",
      "Zakres: przygotowanie podłoża, warstwy systemowe, tynki i wykończenie elewacji.",
      "Marki: Weber, Ceresit, Atlas, Bolix, Baumit.",
      "Typy tynków: silikonowe, silikatowe, mineralne i inne dobierane do projektu.",
      "Kolorystyka i rozwiązania estetyczne dobierane indywidualnie.",
      "Koszt realizacji: [do potwierdzenia] po pomiarach i określeniu zakresu."
    ],
    zastosowanie: [
      "Nowa elewacja domu jednorodzinnego.",
      "Odświeżenie lub modernizacja istniejącej elewacji.",
      "Wykończenie budynku usługowego lub małego obiektu komercyjnego.",
      "Połączenie elewacji z ociepleniem lub termomodernizacją.",
      "Tynkowanie zewnętrzne w inwestycjach etapowych."
    ],
    zalety: [
      "Praca na kompletnych systemach elewacyjnych.",
      "Wsparcie przy doborze koloru, struktury i typu tynku.",
      "Oferta dla klientów prywatnych i biznesowych.",
      "Silne dopasowanie do lokalnych zapytań elewacje Lublin i tynki Lublin.",
      "Możliwość połączenia z ociepleniem, dachem lub budową domu."
    ],
    korzysci: [
      "Trwalsza i bardziej estetyczna powłoka zewnętrzna budynku.",
      "Mniejsze ryzyko przypadkowego łączenia niespójnych materiałów.",
      "Łatwiejsze planowanie całości inwestycji dzięki jednemu partnerowi.",
      "Lepsze dopasowanie elewacji do warunków lokalnych i stylu obiektu."
    ],
    ostrzezenia: [
      "Rodzaj tynku i technologia muszą być dopasowane do podłoża oraz warunków wilgotnościowych.",
      "Prace elewacyjne wymagają odpowiednich warunków pogodowych.",
      "Ostateczna kolorystyka powinna być potwierdzona próbą lub wzornikiem.",
      "Brak przygotowania podłoża może obniżyć trwałość całego systemu."
    ],
    frazySEO: ["elewacje Lublin", "tynki elewacyjne Lublin", "tynki Lublin", "elewacje lubelskie"],
    cta: "Zapytaj o elewację lub tynki w Lublinie"
  },
  {
    slug: "remonty-b2b-lublin",
    title: "Remonty B2B Lublin",
    segment: "B2B",
    icon: <Building2 className="w-6 h-6 text-[#f81828]" />,
    badge: "B2B · galerie, szkoły, obiekty publiczne",
    krotkiOpis: "Oferta remontów i modernizacji dla firm oraz instytucji: galerie handlowe, szkoły, obiekty użyteczności publicznej i inne realizacje wymagające logistyki materiałowej oraz koordynacji wykonawczej.",
    dlugiOpis: `Obsługujemy remonty i modernizacje dla firm, instytucji i zarządców obiektów. Galerie handlowe, szkoły, budynki użyteczności publicznej, biurowce — realizacje obiektowe wymagają innego podejścia niż prace przy domu prywatnym: ścisłego harmonogramu, logistyki materiałowej bez przestojów i koordynacji ekip pracujących etapami. MediaBud łączy rolę partnera materiałowego z organizacją wykonawstwa — jeden kontakt, przejrzysta wycena, terminowość. Zakres może obejmować odświeżenie wnętrz, przebudowy, prace wykończeniowe i modernizacje — realizowane również w czynnych obiektach.`,
    parametry: [
      "Segment: B2B.",
      "Obsługiwane obiekty: galerie, szkoły, biura, lokale usługowe, obiekty użyteczności publicznej.",
      "Zakres: remonty, modernizacje, wykończenia, dostawy materiałów, koordynacja ekip.",
      "Model współpracy: wycena po zakresie, harmonogram etapów, uzgodnienia logistyczne.",
      "Materiały dobierane do wymogów obiektu i specyfiki użytkowania.",
      "Koszty i terminy: [do potwierdzenia] po analizie inwestycji."
    ],
    zastosowanie: [
      "Modernizacja lokali handlowych i usługowych.",
      "Prace remontowe w szkołach i placówkach edukacyjnych.",
      "Odświeżenie lub przebudowa obiektów biurowych.",
      "Roboty w obiektach użyteczności publicznej wymagających etapowania.",
      "Projekty, w których ważne są dostawy i prace poza standardowym rytmem funkcjonowania obiektu."
    ],
    zalety: [
      "Oferta zaprojektowana pod realne potrzeby klientów B2B w Lublinie.",
      "Połączenie logistyki materiałowej i wykonawstwa.",
      "Lepsza przewidywalność organizacyjna przy większych obiektach.",
      "Możliwość etapowania prac oraz dopasowania ich do działania obiektu.",
      "Treść lokalnie wspiera widoczność fraz związanych z remontami dla firm w Lublinie."
    ],
    korzysci: [
      "Mniej obciążenia po stronie inwestora lub administratora obiektu.",
      "Spójniejsza organizacja prac i dostaw.",
      "Łatwiejsze planowanie budżetu i harmonogramu inwestycji.",
      "Dostęp do jednego punktu kontaktu dla materiałów i wykonawstwa."
    ],
    ostrzezenia: [
      "Zakres prac w obiektach publicznych lub komercyjnych może wymagać dodatkowych uzgodnień formalnych.",
      "Nie wszystkie roboty można prowadzić bez wpływu na bieżące funkcjonowanie obiektu.",
      "Harmonogram musi uwzględniać dostępność przestrzeni, odbiory i warunki użytkownika końcowego.",
      "Wymagania materiałowe i bezpieczeństwa należy każdorazowo potwierdzić dla konkretnego obiektu."
    ],
    frazySEO: ["remonty B2B Lublin", "remonty dla firm Lublin", "modernizacja obiektów Lublin", "wykonawca remontów obiektów użyteczności publicznej"],
    cta: "Porozmawiaj o remoncie obiektu B2B"
  },
  {
    slug: "adaptacja-poddaszy-lublin",
    title: "Adaptacja poddaszy Lublin",
    segment: "B2C",
    icon: <HousePlus className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C · dodatkowa przestrzeń",
    krotkiOpis: "Adaptacja poddaszy i skosów w Lublinie z wykorzystaniem suchej zabudowy, izolacji i rozwiązań wykończeniowych dopasowanych do domu inwestora.",
    dlugiOpis: `Poddasze to przestrzeń, która często czeka na swój czas. Adaptacja na cele mieszkalne, gabinet czy pokój rekreacyjny wymaga dobrego projektu, właściwej izolacji akustycznej i termicznej oraz przemyślanej suchej zabudowy skosów. Pracujemy na systemach Knauf i Rigips, izolacjach Rockwool i Ursa, dobierając rozwiązania do kształtu dachu i planowanego przeznaczenia pomieszczenia. Prowadzimy prace od konsultacji przez projekt po realizację — łącząc dostawę materiałów z koordynacją ekip.`,
    parametry: [
      "Zakres: ocena poddasza, dobór materiałów, zabudowy, izolacje i wykończenie.",
      "Materiały: płyty GK, profile, wełna mineralna, folie, akcesoria montażowe.",
      "Marki: Knauf, Rigips, Rockwool, Ursa.",
      "Obsługa: Lublin i województwo lubelskie po potwierdzeniu zakresu.",
      "Możliwość połączenia z pracami dekarskimi lub wykończeniowymi.",
      "Koszt usługi: [do potwierdzenia] po oględzinach i ustaleniu standardu."
    ],
    zastosowanie: [
      "Zmiana nieużytkowego poddasza w przestrzeń mieszkalną.",
      "Wydzielenie gabinetu, sypialni lub pokoju dziecięcego na poddaszu.",
      "Wykończenie skosów po budowie domu lub remoncie dachu.",
      "Poprawa izolacyjności i komfortu termicznego na poddaszu.",
      "Połączenie adaptacji z pełnym wykończeniem wnętrz."
    ],
    zalety: [
      "Lepsze wykorzystanie istniejącej kubatury domu.",
      "Połączenie materiałów i wykonawstwa w jednym miejscu.",
      "Dopasowanie do lokalnych zapytań o adaptację poddaszy w Lublinie.",
      "Współpraca z markami rozpoznawalnymi w suchej zabudowie i izolacji.",
      "Możliwość łączenia usługi z innymi etapami wykończenia domu."
    ],
    korzysci: [
      "Więcej użytecznej przestrzeni bez rozbudowy bryły budynku.",
      "Lepszy komfort cieplny i akustyczny na poddaszu.",
      "Prostsza organizacja prac dzięki jednej ścieżce materiałowo-wykonawczej.",
      "Mniejsze ryzyko błędów przy doborze zabudowy i izolacji."
    ],
    ostrzezenia: [
      "Stan konstrukcji dachu i możliwość adaptacji trzeba potwierdzić przed rozpoczęciem prac.",
      "Nie każda przestrzeń poddasza nadaje się do pełnej funkcji mieszkalnej bez dodatkowych działań.",
      "Prace wymagają precyzyjnej koordynacji izolacji, paroizolacji i zabudowy.",
      "Koszt zależy od wysokości, geometrii skosów i standardu wykończenia."
    ],
    frazySEO: ["adaptacja poddaszy Lublin", "zabudowa poddasza Lublin", "wykończenie poddasza lubelskie", "skosy GK Lublin"],
    cta: "Zapytaj o adaptację poddasza"
  },
  {
    slug: "duze-projekty-b2b",
    title: "Duże projekty B2B",
    segment: "B2B",
    icon: <Building2 className="w-6 h-6 text-[#f81828]" />,
    badge: "B2B · inwestycje komercyjne i instytucjonalne",
    krotkiOpis: "Kompleksowa obsługa inwestycji komercyjnych i instytucjonalnych — galerie handlowe, szkoły, obiekty użyteczności publicznej. Materiały w dużych wolumenach, logistyka na czas, jeden punkt kontaktu.",
    dlugiOpis: `Obsługujemy inwestycje o każdej skali — od pojedynczych lokali usługowych, przez budynki wielorodzinne, aż po galerie handlowe, obiekty szkolne i hale produkcyjne. W przypadku dużych projektów kluczowym wyzwaniem jest logistyka: właściwa ilość materiałów we właściwym miejscu i czasie, bez przestojów na budowie. Nasz skład budowlany w Lublinie działa jako zaplecze magazynowe dla generalnych wykonawców i deweloperów — możemy zaplanować harmonogram dostaw etapami, dopasowany do postępu robót. Współpracujemy z systemami wiodących producentów: Weber, Ceresit, Atlas, Knauf, Rockwool, Rigips, Baumit i innymi — co pozwala zrealizować całą inwestycję w oparciu o jednego dostawcę materiałów. Warunki współpracy B2B, w tym ceny hurtowe i odroczony termin płatności, ustalamy indywidualnie po analizie projektu i harmonogramu.`,
    parametry: [
      "Dostawy etapowe dopasowane do harmonogramu budowy.",
      "Materiały od Weber, Knauf, Atlas, Rockwool, Rigips i innych.",
      "Obsługa generalnych wykonawców i deweloperów.",
      "Wycena indywidualna — ceny hurtowe dla dużych wolumenów.",
      "Koordynacja logistyki z jednego miejsca.",
      "Doświadczenie w obsłudze galerii handlowych, szkół i obiektów publicznych."
    ],
    zastosowanie: [
      "Obsługa budynków wielorodzinnych, biurowych, szkół, obiektów sportowych, galerii handlowych i hal produkcyjnych.",
      "Dostawy materiałów na teren Lublina i całego województwa lubelskiego.",
      "Projekty wymagające etapowania zamówień zgodnie z postępem robót.",
      "Współpraca z generalnymi wykonawcami, deweloperami i inwestorami instytucjonalnymi.",
      "Realizacje, w których potrzebny jest jeden dostawca dla wielu systemów materiałowych."
    ],
    zalety: [
      "Jedno centrum logistyczne i zakupowe dla dużej inwestycji.",
      "Spójna obsługa materiałów od renomowanych producentów.",
      "Elastyczne warunki handlowe ustalane indywidualnie dla skali projektu.",
      "Treść dopasowana do zapytań B2B związanych z obsługą inwestycji w Lublinie i regionie.",
      "Możliwość koordynacji dostaw bezpośrednio pod harmonogram budowy."
    ],
    korzysci: [
      "Mniej przestojów wynikających z braków materiałowych na budowie.",
      "Łatwiejsza kontrola zamówień i logistyki przy wielu etapach realizacji.",
      "Jedna ścieżka komunikacji zamiast wielu rozproszonych dostawców.",
      "Lepsze dopasowanie cen i warunków płatności do skali inwestycji."
    ],
    ostrzezenia: [
      "Każdy projekt B2B wymaga indywidualnej analizy dokumentacji i harmonogramu przed przygotowaniem oferty.",
      "Warunki płatności, w tym przedpłata etapami lub odroczony termin, ustalamy indywidualnie w umowie.",
      "Dostępność materiałów i terminy dostaw zależą od skali zamówienia oraz harmonogramu producentów.",
      "Zakres logistyki i koszt transportu trzeba potwierdzić na etapie wyceny inwestycji."
    ],
    frazySEO: ["B2B materiały budowlane Lublin", "duże projekty budowlane Lublin", "obsługa inwestycji komercyjnych Lublin", "dostawy materiałów dla deweloperów lubelskie"],
    cta: "Wyślij zapytanie o projekt B2B"
  },
  {
    slug: "siec-fachowcow",
    title: "Sieć fachowców",
    segment: "Oba",
    icon: <Users className="w-6 h-6 text-[#f81828]" />,
    badge: "B2C / B2B · wykonawcy i koordynacja",
    krotkiOpis: "Tynkarze, murarze, dekarze, glazurnicy i specjaliści wykończenia — sprawdzone ekipy z realizacji. Koordynujemy wykonawców, żebyś miał jeden kontakt zamiast kilkunastu.",
    dlugiOpis: `Znalezienie sprawdzonego wykonawcy to często największy problem przy budowie lub remoncie. MediaBud od lat współpracuje z ekipami budowlanymi w Lublinie i okolicach — tynkarzami, murarzami, dekarzami, glazurnikami, malarzami i specjalistami od suchej zabudowy. Znamy ich z realizacji: wiemy, jak pracują, jaką jakość dostarczają i czy dotrzymują terminów. Kiedy potrzebujesz wykonawcy do konkretnego etapu — tynkowania, murowania, ocieplenia, wykończenia łazienki czy montażu podłóg — możemy wskazać sprawdzoną ekipę i pomóc zaplanować kolejność prac. Nie pobieramy prowizji od wykonawców — po prostu rekomendujemy tych, z którymi zrealizowaliśmy wspólne projekty i którym ufamy. Materiały do wykonania zapewniamy z naszego składu, co skraca czas realizacji i upraszcza logistykę. Całość koordynujemy z jednego miejsca — zamiast szukać każdego specjalisty osobno, dzwonisz do nas.`,
    parametry: [
      "Sprawdzone ekipy tynkarzy, murarzy i dekarzy.",
      "Specjaliści wykończenia: glazurnicy, malarze, podłogi.",
      "Koordynacja kolejności robót i harmonogramu.",
      "Materiały do wykonania z naszego składu — wszystko w jednym miejscu.",
      "Brak prowizji — rekomendujemy ekipy z realizacji.",
      "Jeden kontakt dla inwestora zamiast kilkunastu wykonawców."
    ],
    zastosowanie: [
      "Dobór wykonawców do tynkowania, murowania, ocieplenia i prac dekarskich.",
      "Koordynacja etapów: tynki, wylewki, sucha zabudowa, glazura i malarstwo.",
      "Obsługa inwestorów z Lublina i okolic do około 50 km.",
      "Wsparcie przy budowie, remoncie i wykończeniu wnętrz.",
      "Łączenie materiałów z naszego składu z pracą ekip znających dane systemy."
    ],
    zalety: [
      "Rekomendacje oparte na realnych wspólnych realizacjach, a nie przypadkowych kontaktach.",
      "Brak prowizji od wykonawców i przejrzysty model współpracy.",
      "Lepsza koordynacja kolejności robót i dostępności ekip.",
      "Jeden punkt kontaktu dla inwestora przy wielu specjalizacjach.",
      "Oferta dobrze odpowiada na lokalne zapytania o sprawdzonych fachowców w Lublinie."
    ],
    korzysci: [
      "Mniej czasu na samodzielne szukanie i weryfikowanie wykonawców.",
      "Większa szansa na terminową realizację kolejnych etapów prac.",
      "Sprawniejsza logistyka dzięki połączeniu ekip i materiałów w jednym miejscu.",
      "Mniejsze ryzyko błędów wykonawczych przy pracy na znanych systemach materiałowych."
    ],
    ostrzezenia: [
      "Dostępność konkretnych ekip zależy od terminu i zakresu robót.",
      "Rekomendacja wykonawcy nie zastępuje indywidualnych ustaleń zakresu, terminu i odpowiedzialności między stronami.",
      "Przy większych projektach poza Lublinem i okolicami zasięg ekip wymaga osobnego potwierdzenia.",
      "Zakup materiałów w MediaBud nie jest obowiązkowy, ale może uprościć realizację i ograniczyć błędy."
    ],
    frazySEO: ["fachowcy budowlani Lublin", "sprawdzone ekipy budowlane Lublin", "tynkarze murarze dekarze Lublin", "koordynacja wykonawców Lublin"],
    cta: "Skontaktuj się w sprawie wykonawców"
  }
];


function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{ background: "#0f0f0f", border: open === i ? "1px solid rgba(248,24,40,0.4)" : "1px solid #1a1a1a" }}
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-bold text-white leading-snug">{item.q}</span>
            <ChevronRight
              className="w-4 h-4 text-[#f81828] flex-shrink-0 transition-transform duration-200"
              style={{ transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-[#aaa] leading-relaxed border-t border-white/5 pt-3">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const generalFaq: FaqItem[] = [
  { q: "Czy MediaBud łączy sprzedaż materiałów z usługami wykonawczymi?", a: "Tak. To główny wyróżnik tej sekcji — MediaBud łączy rolę składu budowlanego, doradcy technicznego i organizatora wykonawstwa dla inwestycji B2C oraz B2B w Lublinie i województwie lubelskim." },
  { q: "Czy w ofercie są usługi dla klientów indywidualnych i firm?", a: "Tak. Oferta została podzielona na segmenty B2C, B2B i usługi wspólne. Klienci indywidualni mogą skorzystać m.in. z programu Dom od podstaw, budowy domu, termomodernizacji i wykończeń pod klucz, a firmy z remontów B2B i usług wspólnych, takich jak dachy czy elewacje." },
  { q: "Czy MediaBud pomaga przy termomodernizacji z programem Czyste Powietrze?", a: "MediaBud wspiera przygotowanie inwestycji materiałowo i wykonawczo, ale nie deklaruje automatycznego uzyskania dotacji. W researchu wskazano dofinansowanie do 136 200 zł oraz możliwość prefinansowania do 35% w określonych przypadkach, jednak każdy wniosek i zakres prac trzeba potwierdzić indywidualnie." },
  { q: "Czy można zamówić samą usługę albo same materiały?", a: "Zakres współpracy jest elastyczny. W zależności od usługi MediaBud może przygotować wycenę materiałów, wskazać sprawdzonych fachowców albo przeprowadzić klienta przez szerszy proces realizacji." },
  { q: "Jak zgłosić zapytanie o usługę w Lublinie?", a: "Najprościej zadzwonić pod +48 509 567 213, napisać na sprzedaz@mediabud.pl albo odwiedzić MediaBud przy ul. Chemicznej 8, 20-329 Lublin. W zapytaniu warto podać lokalizację, typ obiektu, zakres robót i oczekiwany termin." }
];

function ServiceSection({ title, items, accent = "#f81828" }: { title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl p-5 md:p-6" style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", boxShadow: "0 16px 40px rgba(0,0,0,0.28)" }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: accent, boxShadow: `0 0 16px ${accent}66` }} />
        <h3 className="text-[0.95rem] md:text-[1rem] font-black uppercase tracking-[0.22em] text-white break-words" style={{ overflowWrap: "anywhere" }}>{title}</h3>
      </div>
      <ul className="grid gap-3">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="flex items-start gap-3 text-sm leading-relaxed text-[#d7d7d7]">
            <Check className="w-4 h-4 text-[#f81828] flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceTile({ svc }: { svc: ServiceDetail }) {
  return (
    <Link
      to={`/uslugi/${svc.slug}`}
      className="group rounded-2xl p-5 md:p-6 flex flex-col min-h-[260px] transition-all duration-300"
      style={{ background: "#0f0f0f", border: "1px solid #2d2d2d", boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.24)" }}>
          {svc.icon}
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1.5 rounded-full text-white border" style={{ borderColor: svc.segment === "B2B" ? "rgba(255,107,53,0.35)" : "rgba(248,24,40,0.35)", color: svc.segment === "B2B" ? "#ff6b35" : "#f81828", background: svc.segment === "B2B" ? "rgba(255,107,53,0.08)" : "rgba(248,24,40,0.08)" }}>
          {svc.segment}
        </div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#888] mb-2 break-words" style={{ overflowWrap: "anywhere" }}>{svc.badge}</p>
      <h2 className="font-display text-[1.25rem] md:text-[1.45rem] font-black uppercase leading-[1.05] tracking-[0.01em] text-white mb-3 break-words" style={{ overflowWrap: "anywhere" }}>
        {svc.title}
      </h2>
      <p className="text-sm leading-relaxed text-[#b7b7b7] flex-1">{svc.krotkiOpis}</p>
      <div className="mt-5 pt-5 border-t border-[#1f1f1f] flex items-center justify-between gap-4">
        <span className="text-[11px] uppercase tracking-[0.22em] text-[#888]">/uslugi/{svc.slug}</span>
        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#f81828]">Zobacz usługę <ArrowRight className="w-4 h-4" /></span>
      </div>
    </Link>
  );
}

function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      <div className="relative overflow-hidden border-b border-[#1a1a1a]" style={{ background: "linear-gradient(180deg,#0a0a0a 0%,#050505 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "42px 42px" }} />
        <div className="absolute inset-y-0 left-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 18px rgba(248,24,40,0.45)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.22) 55%,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-9 py-12 md:py-16">
          <Link to="/uslugi" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.26em] text-[#888] hover:text-white transition-colors mb-5">
            <ChevronRight className="w-4 h-4 rotate-180" /> Wszystkie usługi
          </Link>
          <div className="max-w-5xl grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.28em] px-3 py-1.5 rounded-full border text-[#f81828] border-[#f81828]/30 bg-[#f81828]/10">{service.segment}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#888]">MediaBud · Lublin / lubelskie</span>
              </div>
              <h1 className="font-display font-black uppercase text-white leading-[0.92] break-words mb-5" style={{ fontSize: "clamp(2.25rem,6vw,4.5rem)", overflowWrap: "anywhere" }}>
                {service.title}
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#d7d7d7] max-w-3xl">
                {service.krotkiOpis}
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", boxShadow: "0 20px 44px rgba(0,0,0,0.35)" }}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.22)" }}>
                  {service.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#888]">Frazy lokalne</p>
                  <p className="text-sm text-white font-semibold">Lublin · woj. lubelskie</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {service.frazySEO.map((phrase) => (
                  <div key={phrase} className="px-3 py-2 rounded-xl text-sm text-[#d7d7d7] border border-[#222] bg-[#0a0a0a] break-words" style={{ overflowWrap: "anywhere" }}>
                    {phrase}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <a href="tel:+48509567213" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-[0.2em] text-white transition-colors" style={{ background: "#f81828", boxShadow: "0 14px 32px rgba(248,24,40,0.22)" }}>
                  <Phone className="w-4 h-4" /> Zadzwoń
                </a>
                <Link to="/kontakt" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-[0.2em] text-white border border-[#2d2d2d] bg-[#050505]">
                  <Mail className="w-4 h-4 text-[#ff6b35]" /> {service.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-14 space-y-8">
        <div className="rounded-2xl p-6 md:p-8" style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", boxShadow: "0 18px 40px rgba(0,0,0,0.28)" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f81828]" style={{ boxShadow: "0 0 14px rgba(248,24,40,0.55)" }} />
            <h2 className="text-[0.95rem] font-black uppercase tracking-[0.24em] text-white">Długi opis</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-[#d7d7d7]">{service.dlugiOpis}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ServiceSection title="Parametry techniczne" items={service.parametry} />
          <ServiceSection title="Zastosowanie" items={service.zastosowanie} accent="#ff6b35" />
          <ServiceSection title="Zalety" items={service.zalety} />
          <ServiceSection title="Korzyści" items={service.korzysci} accent="#ff6b35" />
          <div className="lg:col-span-2">
            <ServiceSection title="Ostrzeżenia" items={service.ostrzezenia} accent="#f81828" />
          </div>
        </div>

        <div className="rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.10),rgba(255,107,53,0.07))", border: "1px solid rgba(248,24,40,0.18)", boxShadow: "0 18px 44px rgba(0,0,0,0.32)" }}>
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-2">Kontakt wykonawczy</p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black uppercase leading-[0.94] text-white break-words mb-3" style={{ overflowWrap: "anywhere" }}>
                MediaBud — ul. Chemiczna 8d, 20-329 Lublin
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[#e6e6e6]">Zadzwoń, wyślij zakres prac lub odwiedź skład. Przygotujemy wycenę, dobierzemy system materiałowy i zaproponujemy ścieżkę realizacji dopasowaną do segmentu {service.segment}.</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[240px]">
              <a href="tel:+48509567213" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-[0.18em] text-white" style={{ background: "#f81828", boxShadow: "0 12px 30px rgba(248,24,40,0.25)" }}>
                <Phone className="w-4 h-4" /> +48 509 567 213
              </a>
              <a href="mailto:sprzedaz@mediabud.pl" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-[0.18em] text-white border border-[#2d2d2d] bg-[#0a0a0a]">
                <Mail className="w-4 h-4 text-[#ff6b35]" /> sprzedaz@mediabud.pl
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesPage() {
  const { slug } = useParams<{ slug?: string }>();

  const service = slug ? services.find((item) => item.slug === slug) : null;
  const b2cServices = services.filter((item) => item.segment === "B2C" && item.slug !== "dom-od-podstaw");
  const mixedServices = services.filter((item) => item.segment === "Oba");
  const b2bServices = services.filter((item) => item.segment === "B2B");
  const umbrellaService = services.find((item) => item.slug === "dom-od-podstaw");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MediaBud — usługi wykonawcze i materiały budowlane",
    description: "Usługi wykonawcze MediaBud w Lublinie: budowa domów, termomodernizacja, wykończenia pod klucz, dachy, elewacje, remonty B2B i adaptacja poddaszy.",
    url: "https://mediabud.pl",
    telephone: "+48509567213",
    email: "sprzedaz@mediabud.pl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Chemiczna 8d",
      addressLocality: "Lublin",
      postalCode: "20-329",
      addressCountry: "PL"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usługi wykonawcze MediaBud",
      itemListElement: services.map((item) => ({ "@type": "Offer", name: item.title, category: item.segment }))
    }
  };

  if (slug && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#050505" }}>
        <div className="max-w-xl w-full rounded-2xl p-8 text-center" style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-3">404 · usługa</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase text-white leading-[0.95] break-words mb-4" style={{ overflowWrap: "anywhere" }}>Nie znaleźliśmy tej podstrony</h1>
          <p className="text-sm leading-relaxed text-[#b7b7b7] mb-6">Sprawdź listę usług wykonawczych MediaBud lub skontaktuj się z nami, jeśli chcesz wycenić niestandardowy zakres prac w Lublinie i województwie lubelskim.</p>
          <Link to="/uslugi" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-[0.2em] text-white" style={{ background: "#f81828" }}>
            <ArrowRight className="w-4 h-4" /> Zobacz wszystkie usługi
          </Link>
        </div>
      </div>
    );
  }

  if (service) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ServiceDetailPage service={service} />
      </>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative overflow-hidden border-b border-[#1a1a1a]" style={{ background: "linear-gradient(180deg,#0a0a0a 0%,#050505 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "42px 42px" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.22) 55%,transparent)" }} />
        <div className="absolute inset-y-0 left-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 18px rgba(248,24,40,0.45)" }} />
        <div className="relative container mx-auto px-4 pl-9 py-12 md:py-16">
          <div className="max-w-5xl grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-4">Industrial Pulse · usługi wykonawcze</p>
              <h1 className="font-display font-black uppercase text-white leading-[0.9] break-words mb-5" style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", overflowWrap: "anywhere" }}>
                Usługi wykonawcze MediaBud
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#d7d7d7] max-w-3xl">MediaBud rozwija ofertę dla klientów indywidualnych i biznesowych: budowa domu, termomodernizacja, wykończenia pod klucz, dachy, elewacje, adaptacje poddaszy oraz remonty B2B dla galerii, szkół i obiektów użyteczności publicznej w Lublinie i województwie lubelskim.</p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", boxShadow: "0 20px 44px rgba(0,0,0,0.35)" }}>
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#888] mb-3">W skrócie</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "8", label: "podstron usług" },
                  { value: "B2C", label: "dom od podstaw" },
                  { value: "B2B", label: "remonty obiektowe" },
                  { value: "Lublin", label: "obszar lokalny" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4 border border-[#1f1f1f] bg-[#0a0a0a]">
                    <div className="text-[1.6rem] font-black text-white font-display">{item.value}</div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#888] mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-14 space-y-10">
        {umbrellaService ? (
          <div className="rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.12),rgba(255,107,53,0.05))", border: "1px solid rgba(248,24,40,0.18)", boxShadow: "0 18px 44px rgba(0,0,0,0.32)" }}>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-3">Parasol B2C</p>
                <h2 className="font-display text-[clamp(1.9rem,4vw,3.4rem)] font-black uppercase leading-[0.94] text-white break-words mb-4" style={{ overflowWrap: "anywhere" }}>{umbrellaService.title}</h2>
                <p className="text-sm md:text-base leading-relaxed text-[#e6e6e6] mb-5">{umbrellaService.krotkiOpis}</p>
                <div className="flex flex-wrap gap-2">
                  {umbrellaService.frazySEO.map((phrase) => (
                    <span key={phrase} className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] text-white border border-[#2d2d2d] bg-[#0a0a0a]">{phrase}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-[0.18em] text-white border border-[#2d2d2d] bg-[#0a0a0a]">
                  <ArrowRight className="w-4 h-4 text-[#ff6b35]" /> Sekcja #dom-od-podstaw na stronie głównej
                </Link>
                <Link to={`/uslugi/${umbrellaService.slug}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-[0.18em] text-white" style={{ background: "#f81828" }}>
                  <Phone className="w-4 h-4" /> Zobacz podstronę programu
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828] mb-2">B2C</p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Usługi dla inwestorów indywidualnych</h2>
            </div>
            <p className="text-sm text-[#888] max-w-2xl">Budowa domu, termomodernizacja, wykończenie, małe domy i adaptacje poddaszy — wszystko w modelu lokalnym Lublin / woj. lubelskie.</p>
          </div>
          <div className="grid xl:grid-cols-2 gap-5">
            {b2cServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ff6b35] mb-2">B2C / B2B</p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Usługi wspólne dla domów i obiektów</h2>
            </div>
            <p className="text-sm text-[#888] max-w-2xl">Dachy i elewacje, które naturalnie łączą inwestycje prywatne oraz mniejsze realizacje firmowe.</p>
          </div>
          <div className="grid xl:grid-cols-2 gap-5">
            {mixedServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ff6b35] mb-2">B2B</p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Usługi dla firm i instytucji</h2>
            </div>
            <p className="text-sm text-[#888] max-w-2xl">Remonty i modernizacje dla galerii, szkół, lokali usługowych i obiektów użyteczności publicznej.</p>
          </div>
          <div className="grid xl:grid-cols-2 gap-5">
            {b2bServices.map((svc) => <ServiceTile key={svc.slug} svc={svc} />)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-[3px] h-8 bg-[#f81828] rounded-full" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#f81828]">FAQ</p>
              <h2 className="font-display text-[clamp(1.7rem,3vw,2.8rem)] font-black uppercase text-white break-words" style={{ overflowWrap: "anywhere" }}>Najczęstsze pytania o usługi wykonawcze</h2>
            </div>
          </div>
          <FaqAccordion items={generalFaq} />
        </section>
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
                      <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={p.images?.[0] || "/placeholder.svg"} alt={p.name} className="w-9 h-9 object-cover rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.07)" }} onError={e => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }} /><div className="font-medium text-gray-300 text-xs line-clamp-1">{p.name}</div></div></td>
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

// ─── ALL CATEGORIES PAGE ──────────────────────────────────────────
export function AllCategoriesPage() {
  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" />
        <div className="relative container mx-auto px-4 pl-10 py-12">
          <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-2">Katalog produktów</p>
          <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">Wszystkie kategorie</h1>
          <p className="text-gray-400 text-sm">Pełna oferta materiałów budowlanych dla firm i klientów indywidualnych.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link key={cat.id} to={`/kategoria/${cat.slug}`}
              className="group rounded-xl p-5 transition-all duration-300 hover:border-[#f81828]/40 hover:shadow-[0_8px_32px_rgba(248,24,40,0.12)] hover:-translate-y-0.5"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110"
                style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.2)", color: "#f81828" }}>
                <Package className="w-5 h-5" />
              </div>
              <h2 className="font-display font-black text-white text-base mb-1 group-hover:text-[#f81828] transition-colors">{cat.name}</h2>
              {cat.description && <p className="text-xs text-gray-500 line-clamp-2">{cat.description}</p>}
              {cat.children && <p className="text-[10px] text-[#f81828]/70 font-bold mt-2 uppercase tracking-wider">{cat.children.length} podkategorii →</p>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── POLICY PAGE ──────────────────────────────────────────────────
export function PolicyPage() {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const isPolicy   = path.includes("polityka");
  const isRegulamin = path.includes("regulamin");

  const title = isRegulamin ? "Regulamin sklepu" : "Polityka prywatności i RODO";
  const subtitle = isRegulamin
    ? "Regulamin korzystania z serwisu mediabud.pl"
    : "Zasady przetwarzania danych osobowych";

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" />
        <div className="relative container mx-auto px-4 pl-10 py-10">
          <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-2">Dokumenty prawne</p>
          <h1 className="font-display text-2xl md:text-3xl font-black text-white mb-1">{title}</h1>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="rounded-xl p-8 space-y-6" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}>
          {isRegulamin ? (
            <>
              <Section t="§1 Postanowienia ogólne" c="Regulamin określa zasady korzystania z serwisu internetowego mediabud.pl prowadzonego przez Media Bud z siedzibą przy ul. Chemicznej 8d, 20-329 Lublin. Korzystanie z serwisu oznacza akceptację niniejszego regulaminu." />
              <Section t="§2 Składanie zamówień" c="Zamówienia przyjmowane są telefonicznie (+48 509 567 213), mailowo (sprzedaz@mediabud.pl) oraz przez formularz kontaktowy. Po złożeniu zamówienia klient otrzymuje potwierdzenie w ciągu 2 godzin roboczych." />
              <Section t="§3 Ceny i płatności" c="Wszystkie ceny podawane są w złotych polskich (PLN) i nie zawierają podatku VAT (ceny netto). Media Bud wystawia faktury VAT. Dostępne formy płatności: przelew bankowy, gotówka przy odbiorze, płatność kartą w hurtowni." />
              <Section t="§4 Dostawa" c="Dostawy realizowane są na terenie Lublina i województwa lubelskiego. Termin dostawy: 1–3 dni robocze dla zamówień standardowych, dostawa ekspresowa (tego samego dnia) dla zamówień złożonych do godziny 10:00 w promieniu 30 km od Lublina." />
              <Section t="§5 Reklamacje" c="Reklamacje dotyczące jakości produktów należy zgłaszać w ciągu 7 dni od daty zakupu. Reklamacje przyjmujemy telefonicznie lub mailowo. Rozpatrujemy je w ciągu 14 dni roboczych." />
              <Section t="§6 Kontakt" c="W sprawach dotyczących regulaminu prosimy o kontakt: Media Bud, ul. Chemiczna 8d, 20-329 Lublin, tel. +48 509 567 213, e-mail: sprzedaz@mediabud.pl." />
            </>
          ) : (
            <>
              <Section t="1. Administrator danych" c="Administratorem danych osobowych jest Media Bud z siedzibą przy ul. Chemicznej 8d, 20-329 Lublin. Kontakt w sprawach ochrony danych: sprzedaz@mediabud.pl." />
              <Section t="2. Zakres i cel przetwarzania" c="Przetwarzamy dane osobowe podane w formularzach kontaktowych (imię, nazwisko, adres e-mail, telefon) wyłącznie w celu odpowiedzi na zapytania ofertowe i realizacji zamówień. Podstawa prawna: art. 6 ust. 1 lit. b i f RODO." />
              <Section t="3. Okres przechowywania" c="Dane osobowe przechowujemy przez okres niezbędny do realizacji celu, nie dłużej niż 5 lat od ostatniego kontaktu, chyba że przepisy prawa wymagają dłuższego okresu." />
              <Section t="4. Prawa osób" c="Przysługuje Ci prawo: dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz sprzeciwu. Wnioski prosimy kierować na adres: sprzedaz@mediabud.pl." />
              <Section t="5. Pliki cookies" c="Serwis wykorzystuje pliki cookies do analizy ruchu (Google Analytics 4) i poprawy działania strony. Możesz wyłączyć cookies w ustawieniach przeglądarki." />
              <Section t="6. Skargi" c="Masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa, jeśli sądzisz, że przetwarzamy Twoje dane niezgodnie z prawem." />
            </>
          )}
          <div className="pt-4 border-t border-white/5 text-xs text-gray-600">
            Ostatnia aktualizacja: styczeń 2026 · Media Bud, ul. Chemiczna 8d, 20-329 Lublin
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link to="/kontakt" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f81828] text-white font-bold text-sm hover:bg-[#c8000f] transition-all">
            Pytania? Napisz do nas
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ t, c }: { t: string; c: string }) {
  return (
    <div>
      <h2 className="font-display font-bold text-white text-base mb-2 flex items-center gap-2">
        <span className="w-[3px] h-4 bg-[#f81828] rounded-full flex-shrink-0" />{t}
      </h2>
      <p className="text-sm text-gray-400 leading-relaxed pl-3">{c}</p>
    </div>
  );
}
