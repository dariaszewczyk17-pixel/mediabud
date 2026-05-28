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

type ServiceDetail = {
  id: string;
  icon: React.ReactNode;
  title: string;
  badge: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  faq: { q: string; a: string }[];
};

type FaqItem = { q: string; a: string };

function ServiceCard({ svc, isOpen, onToggle }: { svc: ServiceDetail; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-300 ${cardHover}`} style={card}>
      {/* Card header – always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex items-start gap-4 focus:outline-none group"
        aria-expanded={isOpen}
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
          style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.22)" }}>
          {svc.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-black text-[#f81828] tracking-widest uppercase">{svc.badge}</span>
          </div>
          <h2 className="font-display font-black text-white text-base leading-tight mb-1">{svc.title}</h2>
          <p className="text-xs text-gray-500 leading-relaxed">{svc.shortDesc}</p>
        </div>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${isOpen ? "bg-[#f81828] rotate-90" : "bg-white/5"}`}>
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div className="px-6 pb-6 space-y-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm text-gray-400 leading-relaxed pt-5">{svc.longDesc}</p>

          {/* Features */}
          <div>
            <div className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-3">Co obejmuje usługa</div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {svc.features.map((f, fi) => (
                <li key={fi} className="flex items-start gap-2 text-xs text-gray-300">
                  <Check className="w-3.5 h-3.5 text-[#f81828] flex-shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ per service */}
          <div>
            <div className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-3">Najczęstsze pytania</div>
            <div className="space-y-2">
              {svc.faq.map((item, fi) => (
                <div key={fi} className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="font-semibold text-white text-xs mb-1.5 flex items-start gap-2">
                    <span className="text-[#f81828] font-black flex-shrink-0">Q:</span>{item.q}
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed pl-4">{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/kontakt">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#f81828] text-white text-xs font-bold hover:bg-[#c8000f] transition-all hover:shadow-[0_0_16px_rgba(248,24,40,0.35)] mt-2">
              <Phone className="w-3.5 h-3.5" /> Zapytaj o wycenę
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className={`rounded-xl overflow-hidden transition-all duration-300 ${cardHover}`} style={card}>
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center gap-3 focus:outline-none"
            aria-expanded={openIdx === i}
          >
            <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black text-white"
              style={{ background: openIdx === i ? "#f81828" : "rgba(248,24,40,0.15)" }}>
              {i + 1}
            </span>
            <span className="flex-1 font-semibold text-white text-sm">{item.q}</span>
            <ChevronRight className={`w-4 h-4 text-[#f81828] transition-transform duration-200 ${openIdx === i ? "rotate-90" : ""}`} />
          </button>
          {openIdx === i && (
            <div className="px-5 pb-4 pl-14 text-sm text-gray-400 leading-relaxed" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="pt-3">{item.a}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ServicesPage() {
  const [openService, setOpenService] = useState<string | null>(null);

  const services: ServiceDetail[] = [
    {
      id: "dom-od-podstaw",
      icon: <Shield className="w-6 h-6 text-[#f81828]" />,
      badge: "Kompleksowa realizacja",
      title: 'Dom od podstaw — etapy budowy i materiały',
      shortDesc: "Wsparcie na każdym etapie budowy domu — od fundamentów, przez stan surowy, aż po wykończenie wnętrz. Dobieramy materiały odpowiednie do każdego kroku.",
      longDesc: "Budowa domu krok po kroku to złożony proces, który wymaga precyzyjnego planowania i doboru właściwych materiałów na każdy etap. W Media Bud oferujemy kompleksowe wsparcie: zaczynając od fundamentów i izolacji poziomej, poprzez bloczki i cegły na stan surowy, systemy ociepleń ETICS, tynki wewnętrzne i zewnętrzne, aż po wylewki, płyty GK i materiały wykończeniowe. Nasi doradcy pomagają zoptymalizować koszty zakupu materiałów bez uszczerbku na jakości — dla budynków jednorodzinnych, bliźniaków i szeregówek. Obsługujemy zarówno inwestorów indywidualnych, jak i deweloperów budujących osiedla w Lublinie i okolicach.",
      features: [
        "Kompleksowy dobór materiałów do każdego etapu",
        "Fundamenty: styropian XPS, masy KMB, dysperbit",
        "Stan surowy: bloczki, pustaki, cegła ceramiczna",
        "Ocieplenie: styropian EPS 100/031, wełna fasadowa",
        "Tynki wewnętrzne: gips maszynowy, tynk cementowo-wapienny",
        "Wylewki: anhydryt, jastrych cementowy, beton",
        "Wykończenie: tynki silikonowe, farby, płyty GK",
        "Koordynacja dostaw zgodna z harmonogramem budowy",
      ],
      faq: [
        { q: "Jakie materiały są potrzebne do budowy domu krok po kroku?", a: "Na budowę domu potrzebne są materiały podzielone na etapy: fundamenty (beton, styropian XPS, masa KMB), stan surowy otwarty (bloczki, pustaki, stropy), stan surowy zamknięty (okna, dach), ocieplenie ETICS (styropian EPS 100 lub 031, tynk silikonowy), instalacje, wylewki (anhydryt lub cement) i wykończenie (płyty GK, farby, tynki)." },
        { q: "Ile kosztują materiały budowlane na dom 150 m²?", a: "Szacunkowy koszt materiałów na dom 150 m² to od 180 000 do 350 000 zł w zależności od standardu. Największe pozycje to: fundamenty i stan surowy (ok. 40%), ocieplenie i elewacja (15–20%), wylewki i posadzki (10%), dach (15–20%). Skontaktuj się z nami — wycenimy materiały na podstawie projektu." },
        { q: "Czy Media Bud oferuje doradztwo techniczne przy wyborze materiałów?", a: "Tak, nasze bezpłatne doradztwo techniczne obejmuje dobór materiałów do projektu, optymalizację kosztów, przeliczenie ilości i dobór systemu ociepleń. Zapraszamy do oddziału przy ul. Chemicznej 8d w Lublinie lub na konsultację telefoniczną." },
      ],
    },
    {
      id: "ocieplenie-etics",
      icon: <Zap className="w-6 h-6 text-[#f81828]" />,
      badge: "Energooszczędność",
      title: "Ocieplenie ETICS — styropian, wełna, tynki",
      shortDesc: "Kompleksowe systemy ociepleń ETICS: dobór grubości styropianu lub wełny, parametry lambda, instrukcja montażu i wybór tynku końcowego.",
      longDesc: "System ociepleń ETICS (External Thermal Insulation Composite System) to najskuteczniejsza metoda termoizolacji budynków w Polsce. W Media Bud oferujemy pełen zakres materiałów do ociepleń: styropian EPS 100 o lambdzie 0,031–0,040 W/mK w grubościach 15–20 cm, wełnę fasadową Rockwool/Isover λ 0,035–0,040, kleje i masy szpachlowe Weber/Atlas/Ceresit, siatki z włókna szklanego, profile startowe i narożnikowe oraz tynki końcowe: silikonowe, silikatowe, akrylowe i mineralne. Dobieramy system do klasy energetycznej budynku — dla domów pasywnych rekomendujemy styropian graphite EPS 031 o grubości 20–25 cm.",
      features: [
        "Styropian EPS 100 λ=0,038 W/mK — grubości 15, 18, 20 cm",
        "Styropian grafitowy EPS 031 — najlepsze parametry izolacyjne",
        "Wełna fasadowa lamelowa i płytowa λ=0,035–0,040",
        "Kleje i masy zbrojące: Weber, Atlas, Ceresit, Caparol",
        "Siatki z włókna szklanego 145–160 g/m²",
        "Profile startowe, narożne, okapnikowe ze stali nierdzewnej",
        "Tynki końcowe: silikonowy, silikatowy, akrylowy, mineralny",
        "Farby elewacyjne — cała paleta kolorów RAL i NCS",
      ],
      faq: [
        { q: "Jaki styropian na elewację — 15 cm czy 20 cm?", a: "Zgodnie z wymogami Warunków Technicznych 2021 minimalny współczynnik U ściany to 0,20 W/m²K. Dla standardowego muru 25 cm (bloczek PP2) wystarczy 15 cm styropianu EPS 100 λ=0,038. Dla domów energooszczędnych (klasa A) zalecamy 20 cm EPS 031 λ=0,031. Grubość 20 cm jest dziś standardem przy nowych inwestycjach, bo zwrot z inwestycji nastąpi w 6–8 lat przez niższe rachunki za ogrzewanie." },
        { q: "Czym różni się styropian EPS od grafitowego (EPS 031)?", a: "Styropian grafitowy (szary, np. Swisspor Lambda, Styropmin Platinum) ma współczynnik λ=0,030–0,033 W/mK — nawet 20% lepszy niż biały EPS (λ=0,038–0,040). Oznacza to, że 15 cm EPS 031 izoluje tak samo jak 18–19 cm białego EPS. Cena styropianu grafitowego jest o ok. 15–25% wyższa, ale przy tej samej grubości ściany uzyska lepszą izolację." },
        { q: "Jak przebiega montaż systemu ociepleń ETICS krok po kroku?", a: "Montaż ETICS obejmuje: 1) Gruntowanie podłoża, 2) Klejenie płyt styropianu (metoda obwodowo-punktowa lub grzebieniowa), 3) Łączniki mechaniczne (6–8 szt./m²), 4) Nakładanie masy zbrojącej + wtapianie siatki, 5) Gruntowanie głębokopenetrujące, 6) Nanoszenie tynku końcowego (faktura baranek lub kornik), 7) Malowanie farbą elewacyjną. Każdy etap wymaga odpowiednich przerw technologicznych (24–72h)." },
      ],
    },
    {
      id: "elewacje-tynkowanie",
      icon: <Award className="w-6 h-6 text-[#f81828]" />,
      badge: "Wykończenie zewnętrzne",
      title: "Elewacje i tynkowanie — tynki silikonowe vs silikatowe",
      shortDesc: "Dobór tynku elewacyjnego: silikonowy czy silikatowy? Porównanie parametrów, kolorystyka RAL/NCS i rekomendacje dla konkretnych podłoży.",
      longDesc: "Wybór tynku elewacyjnego to kluczowa decyzja wpływająca na trwałość i estetykę budynku. W Media Bud oferujemy wszystkie rodzaje tynków zewnętrznych: silikonowe (najodporniejsze na brudzenie, elastyczne, paroprzepuszczalne), silikatowe (mineralne, odporne biologicznie, idealne na budynki przy drogach), akrylowe (tanie, szeroka kolorystyka, gorsza paroprzepuszczalność) i mineralne (kamyczek, mozaikowe, trwałe). W ofercie posiadamy systemy Weber, Ceresit, Atlas, Caparol i Bolix — z pełną paletą kolorów NCS i RAL. Wykonujemy tynkowanie maszynowe agregatem tynkarskim oraz ręczne — ściany, sufity, podcienia i elementy architektoniczne.",
      features: [
        "Tynki silikonowe: elastyczne, samoczyszczące, paroprzepuszczalne",
        "Tynki silikatowe: odporne biologicznie, mrozoodporne",
        "Tynki akrylowe: tanie, szeroka kolorystyka, łatwe w aplikacji",
        "Tynki mozaikowe i kamyczkowe: do cokołów i akcentów",
        "Tynkowanie maszynowe agregatem — szybko i ekonomicznie",
        "Pełna paleta kolorów NCS i RAL — dobór online",
        "Systemy: Weber, Ceresit, Atlas, Caparol, Bolix",
        "Grunty sczepne i podkłady kwarcowe pod tynki",
      ],
      faq: [
        { q: "Tynk silikonowy czy silikatowy — który wybrać?", a: "Tynk silikonowy jest lepszy dla domów w miejscach narażonych na zabrudzenia (kurz, spaliny) — dzięki właściwościom hydrofobowym brud zmywa deszcz. Tynk silikatowy (krzemianowy) jest bardziej paroprzepuszczalny i odporny biologicznie — polecany na budynki stare, remontowane lub w wilgotnych lokalizacjach. Oba mają zbliżoną cenę (ok. 30–45 zł/m²). Tynk silikonowo-silikatowy łączy zalety obu — to dziś najczęściej wybierany kompromis." },
        { q: "Ile kosztuje tynkowanie elewacji w Lublinie 2026?", a: "Koszt tynku elewacyjnego silikonowego to ok. 25–45 zł/m² materiału + robocizna ok. 25–40 zł/m². Całościowo elewacja (ociepleenie + tynk) to 120–200 zł/m² przy domu 150 m² (ok. 400 m² elewacji). W Media Bud oferujemy materiały w cenach hurtowych — zapraszamy po bezpłatną wycenę." },
        { q: "Jaka faktura tynku jest najtrwalsza — baranek czy kornik?", a: "Faktura kornik (deska, rowkowana) gromadzi nieco mniej brudu niż baranek — linie rowków odprowadzają wodę kierunkowo. Baranek (ziarnistość 1,5–3 mm) jest klasyczny i łatwiejszy do naprawy punktowej. Trwałość obu faktur przy tynku silikonowym jest porównywalna i wynosi 15–25 lat. Wybór to kwestia estetyki i projektu architektonicznego." },
      ],
    },
    {
      id: "wylewki-jastrychy",
      icon: <Truck className="w-6 h-6 text-[#f81828]" />,
      badge: "Podłogi i posadzki",
      title: "Wylewki i jastrychy — anhydryt vs cement pod ogrzewanie",
      shortDesc: "Porównanie wylewek anhydrytowych i cementowych pod ogrzewanie podłogowe. Grubości, przerwy technologiczne, dobór materiału do systemu grzewczego.",
      longDesc: "Wybór między wylewką anhydrytową a cementową ma kluczowe znaczenie dla systemu ogrzewania podłogowego. Jastrych anhydrytowy (samonieczący, płynny) idealnie otula rury grzewcze, zapewniając przewodność cieplną λ=2,0 W/mK przy grubości zaledwie 35–45 mm nad rurą. Wylewka cementowa jest tańsza, bardziej odporna na wilgoć i sprawdza się w łazienkach, garażach i pomieszczeniach bez ogrzewania podłogowego. W Media Bud oferujemy gotowe mieszanki anhydrytowe Anhyment, Knauf/Weber, cementy portlandzkie i posypki uszczelniające, a także dodatki przyspieszające wiązanie i preparaty do pielęgnacji. Doradzamy w doborze grubości i składu mieszanki do konkretnego projektu.",
      features: [
        "Anhydryt płynny: samonieczący, grubość min. 35 mm nad rurą",
        "Jastrych cementowy: odporny na wilgoć, garaże i łazienki",
        "Masy wyrównujące: szybkoschnące, grubości 3–50 mm",
        "Zbrojenie z siatki lub włókna polipropylenowego",
        "Preparaty do pielęgnacji i dylatacji wylewek",
        "Posypki utwardzające do posadzek przemysłowych",
        "Dobór grubości do systemu ogrzewania podłogowego",
        "Przeliczenie ilości i dobór składu mieszanki cementowej",
      ],
      faq: [
        { q: "Wylewka anhydrytowa czy cementowa pod ogrzewanie podłogowe?", a: "Pod ogrzewanie podłogowe zaleca się anhydryt: przewodność cieplna λ=2,0 W/mK (vs 1,2–1,6 W/mK dla cementu), idealne wypełnienie wokół rur, minimalny skurcz, grubość zaledwie 35–40 mm nad rurą. Wada: anhydryt jest wrażliwy na wilgoć — nie nadaje się do łazienek bez dodatkowego uszczelnienia. Wylewka cementowa jest wszechstronniejsza i tańsza, ale wymaga grubości 45–65 mm nad rurą i dłuższego czasu schnięcia (1 mm/dobę)." },
        { q: "Ile schnięca wylewka anhydrytowa przed układaniem podłogi?", a: "Wylewka anhydrytowa schnie ok. 1 mm na dzień w warunkach standardowych (20°C, wilgotność 65%). Wylewka 50 mm jest gotowa po ok. 4–5 tygodniach. Przed układaniem paneli wilgotność resztkowa musi wynosić ≤0,5% CM. Można przyspieszyć suszenie wentylacją mechaniczną i uruchomieniem ogrzewania podłogowego (po 7 dniach, stopniowo od 25°C do 45°C)." },
        { q: "Jaka minimalna grubość wylewki anhydrytowej nad rurą grzewczą?", a: "Norma PN-EN 1264 zaleca min. 30 mm przykrycia rury anhydrytem (ok. 35 mm nad systemem 17×2 mm). W praktyce stosuje się 40–50 mm nad rurą dla lepszej akumulacji ciepła. Zbyt mała grubość grozi pęknięciem i widocznym efektem cętkowania temperatury na podłodze." },
      ],
    },
    {
      id: "sucha-zabudowa",
      icon: <Package className="w-6 h-6 text-[#f81828]" />,
      badge: "Ściany i sufity",
      title: "Sucha zabudowa — płyty GK, profile, ściany działowe",
      shortDesc: "Montaż płyt GK na stelażu metalowym: sufity podwieszane, ściany działowe, obudowy instalacji i poddasza. Dobór profili CW/UW i płyt do zastosowania.",
      longDesc: "Sucha zabudowa z płyt gipsowo-kartonowych to szybka i czysta metoda aranżacji wnętrz. W Media Bud oferujemy pełen asortyment Knauf, Rigips i Siniat: płyty GKB (standardowe), GKBI (impregowane, łazienki), GKF (ognioodporne) i GKFI (impregowane ognioodporne), profile metalowe CW/UW (ściany), CD/UD (sufity), kształtowniki narożne, złącza i wkręty TN/TB. Doradzamy w doborze rodzaju płyty i profilu do konkretnego zastosowania: ścianki działowe, obudowy instalacji (piony kanalizacyjne), sufity podwieszane, skosach dachowych i zabudowy poddaszy. Oferujemy także izolacje akustyczne (wełna, Isover Aku) montowane między profilami.",
      features: [
        "Płyty GKB 12,5 mm — standardowe do ścian i sufitów",
        "Płyty GKBI — impregnowane do łazienek i kuchni",
        "Płyty GKF — ognioodporne do klatek schodowych",
        "Profile CW/UW do ścianek działowych 75/100 mm",
        "Profile CD/UD do sufitów podwieszanych",
        "Łączniki, kołki rozporowe, wkręty TN 25/35/45 mm",
        "Wełna akustyczna Isover Aku do wypełnienia ścianek",
        "Szpachlówki, taśmy perforowane i narożniki do GK",
      ],
      faq: [
        { q: "Jak zamontować płyty GK na stelażu sufitowym krok po kroku?", a: "Montaż sufitu GK: 1) Wyznaczenie poziomu i montaż profili UD pod sufitem i na ścianach, 2) Montaż wieszaków bezpośrednich lub noniuszy co 90–100 cm, 3) Osadzenie profili CD 60×27 co 50 cm, 4) Przykręcenie płyt GK wkrętami TN 25 mm co 15–17 cm, 5) Spoinowanie taśmą i szpachlówką (3 warstwy), 6) Szlifowanie i malowanie. Między płytami zachowaj szczelinę 2–3 mm." },
        { q: "Jaka grubość ścianki działowej GK zapewnia dobrą izolację akustyczną?", a: "Ścianka C75/GKB 12,5 + wełna akustyczna 75 mm + GKB 12,5 (łącznie ok. 100 mm) osiąga izolacyjność Rw=43–48 dB — wystarczającą dla pokoi mieszkalnych. Dla lepszej izolacji (Rw≥50 dB) stosuje się podwójne poszycie GKF 15 mm i wełnę min. 60 mm: razem ok. 125 mm grubości. W Media Bud dobierzemy optymalny system do Twojego projektu." },
        { q: "Ile płyt GK i profili potrzebuję na ściankę 10 m²?", a: "Na 10 m² ścianki działowej potrzebujesz: ok. 5 płyt GKB 120×260 cm (strona), profile UW 2×10,5 mb (górny + dolny), profile CW ok. 20 mb (co 60 cm), wieszaki narożne i wkręty. Razem ok. 20–25% materiału zapasowego. Skorzystaj z naszego kalkulatora w sklepie lub zadzwoń — przeliczymy ilości do Twojego projektu." },
      ],
    },
    {
      id: "transport-logistyka",
      icon: <Truck className="w-6 h-6 text-[#f81828]" />,
      badge: "Dostawa Lublin i region",
      title: "Transport i logistyka — dostawa materiałów budowlanych Lublin",
      shortDesc: "Szybka dostawa materiałów budowlanych na plac budowy w Lublinie i województwie lubelskim. Samochody HDS, palety, rozładunek przy budynku.",
      longDesc: "Media Bud oferuje kompleksową logistykę dostaw materiałów budowlanych na terenie Lublina i całego województwa lubelskiego. Dysponujemy flotą samochodów z dźwigiem HDS (HIAB), co pozwala na precyzyjne rozłożenie materiałów bezpośrednio na placu budowy — nawet na wyższe kondygnacje lub do trudnodostępnych miejsc. Dostarczamy palety ze styropianem, worki z cementem i gipsem, paczki z płytami GK, systemy ociepleń i drobnicę. Harmonogramujemy dostawy zgodnie z etapami budowy, co eliminuje konieczność magazynowania dużych ilości materiałów na placu. Możliwa jest dostawa ekspresowa (tego samego dnia dla zamówień do godz. 10:00) w promieniu 30 km od Lublina.",
      features: [
        "Dostawa HDS — rozładunek na plac budowy, wyższe kondygnacje",
        "Zasięg: Lublin + 80 km (całe woj. lubelskie)",
        "Dostawy etapowe zgodnie z harmonogramem budowy",
        "Ekspresowa dostawa tego samego dnia (dla zam. do 10:00)",
        "Transport palet, worków, płyt i drobnych materiałów",
        "Dostawa do trudnodostępnych lokalizacji i wąskich działek",
        "Powiadomienia SMS/email o statusie dostawy",
        "Możliwość odbioru własnego ze składu ul. Chemiczna 8d",
      ],
      faq: [
        { q: "Na jaki teren Media Bud realizuje dostawy materiałów budowlanych?", a: "Dostarczamy na terenie Lublina i całego województwa lubelskiego — m.in. do Świdnika, Chełma, Zamościa, Biłgoraja, Puław, Kraśnika i Hrubieszowa. Koszt dostawy zależy od odległości i wagi zamówienia. Dla zamówień powyżej określonej wartości dostawa gratis — szczegóły przy składaniu zamówienia lub pod numerem +48 509 567 213." },
        { q: "Czy możliwa jest dostawa materiałów budowlanych tego samego dnia?", a: "Tak — dla zamówień złożonych do godziny 10:00 realizujemy dostawę ekspresową tego samego dnia w promieniu 30 km od Lublina (w miarę dostępności floty). Dla dalszych lokalizacji czas dostawy to 1–2 dni robocze. Skontaktuj się z nami, aby potwierdzić termin." },
        { q: "Czy przy dostawie możliwy jest rozładunek HDS na wyższe piętra?", a: "Tak — nasz samochód z dźwigiem HDS pozwala na precyzyjne umieszczenie materiałów na balkonach, stropach lub w pobliżu budynku. Wymagana jest dostępność terenu dla pojazdu ciężarowego (min. 3,5 m szerokości przejazdu). Przy zamówieniu prosimy poinformować o specyfice placu budowy." },
      ],
    },
  ];

  const generalFaq: FaqItem[] = [
    { q: "Czym jest hurtownia Media Bud i jaki jest jej zakres działalności?", a: "Media Bud to profesjonalna hurtownia i skład materiałów budowlanych w Lublinie przy ul. Chemicznej 8d. Oferujemy pełen asortyment materiałów do budowy i remontu: systemy ociepleń ETICS, tynki, wylewki, płyty GK, farby elewacyjne, cement, gips, styropian, wełna mineralna, kleje i chemia budowlana. Obsługujemy klientów indywidualnych, firmy wykonawcze i deweloperów." },
    { q: "Czy Media Bud oferuje bezpłatne doradztwo techniczne?", a: "Tak — doradztwo techniczne jest bezpłatne. Nasi specjaliści pomogą dobrać system ociepleń, rodzaj tynku, skład wylewki i optymalne materiały do Twojego projektu. Konsultacja możliwa telefonicznie (+48 509 567 213), mailowo (sprzedaz@mediabud.pl) lub osobiście w hurtowni w Lublinie." },
    { q: "Jakie systemy ociepleń ETICS są dostępne w Media Bud?", a: "Oferujemy systemy ociepleń czołowych producentów: Weber (Webertherm), Ceresit (CT), Atlas (Stopter), Caparol (Capatect) i Bolix. Dostępne są systemy ze styropianem EPS 100, EPS 031 (grafitowy) oraz wełną mineralną fasadową. Do każdego systemu oferujemy kompletny zestaw materiałów: klej, łączniki, siatkę, grunt i tynk końcowy." },
    { q: "Czy Media Bud realizuje zamówienia dla firm budowlanych i deweloperów?", a: "Tak — posiadamy dedykowaną ofertę B2B dla firm wykonawczych i deweloperów: indywidualne cenniki wolumenowe, faktury z odroczonym terminem płatności, priorytetowe terminy dostaw i dedykowany opiekun handlowy. Skontaktuj się z nami, aby omówić warunki współpracy dla Twojej firmy." },
    { q: "Jakie są godziny otwarcia hurtowni przy ul. Chemicznej 8d w Lublinie?", a: "Hurtownia jest otwarta od poniedziałku do piątku w godzinach 7:00–17:00 oraz w soboty od 8:00 do 14:00. W niedzielę i święta nieczynne. Zamówienia z dostawą można składać telefonicznie lub przez formularz kontaktowy na stronie — odpowiadamy w ciągu 2 godzin w dni robocze." },
    { q: "Czy materiały budowlane w Media Bud posiadają certyfikaty i atesty?", a: "Tak — wszystkie produkty w naszej ofercie posiadają wymagane certyfikaty, aprobaty techniczne i deklaracje zgodności (CE, ITB). Oferujemy wyłącznie materiały renomowanych producentów: Rockwool, Swisspor, Weber, Knauf, Ceresit, Atlas, Caparol, Isover — co gwarantuje jakość i bezpieczeństwo stosowania." },
    { q: "Jak zamówić materiały budowlane z dostawą do Lublina?", a: "Zamówienie z dostawą możesz złożyć: telefonicznie (+48 509 567 213), mailowo (sprzedaz@mediabud.pl) lub przez formularz kontaktowy na naszej stronie. Podaj listę materiałów, adres budowy i preferowany termin — wycenimy zamówienie i uzgodnimy logistykę. Dostawy realizujemy na terenie Lublina i całego województwa lubelskiego." },
    { q: "Czy Media Bud poleca sprawdzonych wykonawców i ekipy budowlane?", a: "Tak — współpracujemy z siecią sprawdzonych ekip wykonawczych: tynkarzy maszynowych, specjalistów ETICS, układaczy wylewek i ekip remontowych. Na życzenie klienta możemy polecić zweryfikowanego wykonawcę z doświadczeniem w montażu materiałów z naszej oferty." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Media Bud — Hurtownia Materiałów Budowlanych",
    "description": "Kompleksowe usługi budowlane Lublin: systemy ociepleń ETICS, tynki elewacyjne, wylewki, płyty GK, transport materiałów budowlanych.",
    "url": "https://mediabud.pl",
    "telephone": "+48509567213",
    "email": "sprzedaz@mediabud.pl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Chemiczna 8d",
      "addressLocality": "Lublin",
      "postalCode": "20-145",
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.2463",
      "longitude": "22.5745"
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "17:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "14:00" }
    ],
    "sameAs": ["https://www.google.com/maps/search/Media+Bud+Lublin"],
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Usługi budowlane Lublin",
      "itemListElement": services.map(s => ({ "@type": "Offer", "name": s.title }))
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.2) 60%,transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top,#080808,transparent)" }} />
        <div className="relative container mx-auto px-4 pl-10 py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase mb-3">Hurtownia budowlana Lublin</p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Kompleksowe<br />
                <span style={{ color: "#f81828" }}>usługi budowlane</span><br />
                Lublin
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg">
                Hurtownia materiałów budowlanych Media Bud w Lublinie oferuje kompleksowe wsparcie przy każdym projekcie budowlanym — od systemu ociepleń ETICS, przez wylewki i suchą zabudowę, po transport materiałów na plac budowy. Obsługujemy klientów indywidualnych, wykonawców i deweloperów na terenie Lublina i województwa lubelskiego.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="tel:+48509567213">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f81828] text-white text-sm font-bold hover:bg-[#c8000f] transition-all hover:shadow-[0_0_20px_rgba(248,24,40,0.5)]">
                    <Phone className="w-4 h-4" /> +48 509 567 213
                  </button>
                </a>
                <Link to="/kontakt">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-gray-300 hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                    Wyślij zapytanie <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "15+", label: "Lat doświadczenia" },
                { value: "50+", label: "Marek w ofercie" },
                { value: "6", label: "Obszarów usług" },
                { value: "24h", label: "Czas reakcji" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="font-display font-black text-3xl text-[#f81828] mb-1">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-14">

        {/* ── Intro text (SEO) ── */}
        <div className="rounded-xl p-7" style={card}>
          <h2 className="font-display text-xl font-black text-white mb-3 flex items-center gap-2">
            <span className="w-[3px] h-5 bg-[#f81828] rounded-full" /> Dlaczego warto wybrać Media Bud?
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Media Bud to hurtownia i skład materiałów budowlanych w Lublinie przy ul. Chemicznej 8d, specjalizująca się w kompleksowej obsłudze projektów budowlanych i remontowych. Oferujemy nie tylko sprzedaż materiałów — zapewniamy bezpłatne doradztwo techniczne przy doborze systemu ociepleń ETICS, wyborze tynku elewacyjnego (silikonowy vs silikatowy), rodzaju wylewki pod ogrzewanie podłogowe i montażu suchej zabudowy GK. Nasi klienci to zarówno osoby budujące domy jednorodzinne, jak i firmy wykonawcze oraz deweloperzy realizujący inwestycje wielorodzinne na terenie Lublina i całego województwa lubelskiego. Gwarantujemy materiały od renomowanych producentów z certyfikatami (Rockwool, Swisspor, Weber, Knauf, Ceresit, Atlas) oraz transport z rozładunkiem HDS bezpośrednio na plac budowy.
          </p>
        </div>

        {/* ── 6 Service Cards ── */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-[3px] h-7 bg-[#f81828] rounded-full" />
            <div>
              <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase">Zakres usług</p>
              <h2 className="font-display text-2xl font-black text-white">Co oferuje Media Bud?</h2>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-2xl">Kliknij kartę usługi, aby zobaczyć szczegółowy opis, listę funkcji i najczęstsze pytania. Każda usługa obejmuje bezpłatne doradztwo techniczne.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map(svc => (
              <ServiceCard
                key={svc.id}
                svc={svc}
                isOpen={openService === svc.id}
                onToggle={() => setOpenService(openService === svc.id ? null : svc.id)}
              />
            ))}
          </div>
        </div>

        {/* ── General FAQ ── */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-[3px] h-7 bg-[#f81828] rounded-full" />
            <div>
              <p className="text-[10px] font-black text-[#f81828] tracking-widest uppercase">People Also Ask</p>
              <h2 className="font-display text-2xl font-black text-white">Najczęstsze pytania — usługi budowlane Lublin</h2>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-2xl">Odpowiadamy na najczęściej zadawane pytania dotyczące naszej oferty, dostaw i doradztwa technicznego.</p>
          <FaqAccordion items={generalFaq} />
        </div>

        {/* ── Process strip ── */}
        <div className="rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(248,24,40,0.08),rgba(248,24,40,0.03))", border: "1px solid rgba(248,24,40,0.15)" }}>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f81828]" style={{ position: "relative" }} />
          <div className="p-7">
            <h2 className="font-display text-xl font-black text-white mb-6 text-center">Jak wygląda współpraca z Media Bud?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { step: "01", title: "Kontakt i wstępna wycena", desc: "Zadzwoń lub napisz — przedstaw projekt lub listę potrzeb. Bezpłatna konsultacja techniczna." },
                { step: "02", title: "Dobór materiałów", desc: "Nasi doradcy dobierają optymalne materiały do budżetu, projektu i etapu budowy." },
                { step: "03", title: "Realizacja zamówienia", desc: "Kompletujemy zamówienie ze stanu magazynowego lub zamawiamy u producenta w ciągu 24–48h." },
                { step: "04", title: "Dostawa HDS", desc: "Dowozimy materiały na plac budowy w Lublinie i regionie — z rozładunkiem dźwigiem." },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 font-black text-[#f81828] text-lg" style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.25)" }}>
                    {item.step}
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Final CTA ── */}
        <div className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden" style={{ background: "#0f0f0f", border: "1px solid rgba(248,24,40,0.2)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 0%,rgba(248,24,40,0.12),transparent 60%)" }} />
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,transparent,#f81828 50%,transparent)" }} />
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.25)" }}>
              <Phone className="w-7 h-7 text-[#f81828]" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-3">
              Gotowy na realizację projektu?
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mb-7 leading-relaxed">
              Skontaktuj się z nami — bezpłatnie doradzimy, jakie materiały i w jakiej ilości potrzebujesz. Obsługujemy Lublin i całe województwo lubelskie. Odpowiadamy w ciągu 2 godzin roboczych.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a href="tel:+48509567213">
                <button className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#f81828] text-white font-bold text-base hover:bg-[#c8000f] transition-all hover:shadow-[0_0_24px_rgba(248,24,40,0.5)] hover:-translate-y-0.5">
                  <Phone className="w-5 h-5" /> +48 509 567 213
                </button>
              </a>
              <a href="mailto:sprzedaz@mediabud.pl">
                <button className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base text-gray-300 hover:text-white transition-all hover:-translate-y-0.5" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                  <Mail className="w-5 h-5" /> sprzedaz@mediabud.pl
                </button>
              </a>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-[#f81828]" />
              ul. Chemiczna 8d, 20-145 Lublin &nbsp;·&nbsp; Pon–Pt 7:00–17:00 &nbsp;·&nbsp; Sob 8:00–14:00
            </div>
          </div>
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
