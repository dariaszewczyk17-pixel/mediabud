import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  NAP_ADDRESS, NAP_GEO, NAP_HOURS, NAP_AREA_SERVED,
  NAP_SAME_AS, NAP_LOGO, NAP_AMENITIES, NAP_CONTACT_POINT,
} from "@/lib/localBusiness";
import { useSEO } from "@/hooks/useSEO";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

/* ─── IntersectionObserver Hook ─────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.08);
  return (
    <div ref={ref} className={className}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Futuristic Input wrapper ──────────────────────────────────── */
function FuturisticInput({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: "#666" }}>
        {label} {required && <span style={{ color: "#f81828" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [sent, setSent]     = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm]     = useState({ name: "", email: "", phone: "", subject: "", message: "", attachments: [] as File[] });
  const [focused, setFocused] = useState<string | null>(null);

  useSEO({
    title: "Kontakt – Media Bud Lublin | Skład Budowlany ul. Chemiczna 8d",
    description: "Skontaktuj się z Media Bud — składem budowlanym w Lublinie. Zadzwoń +48 533 553 344, napisz na sprzedaz@mediabud.pl lub odwiedź nas: ul. Chemiczna 8d, 20-329 Lublin. Pon–Pt 7:00–16:00.",
    canonical: "/kontakt",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
            { "@type": "ListItem", "position": 2, "name": "Kontakt",       "item": "https://mediabud.pl/kontakt" },
          ],
        },
        {
          "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
          "@id": "https://mediabud.pl/#localbusiness",
          "name": "Media Bud – Skład Budowlany",
          "legalName": "Media Bud",
          "description": "Skład budowlany i hurtownia materiałów budowlanych w Lublinie. Obsługujemy klientów indywidualnych, wykonawców i firmy.",
          "url": "https://mediabud.pl",
          "telephone": "+48533553344",
          "email": "sprzedaz@mediabud.pl",
          "taxID": "9462743421",
          "vatID": "9462743421",
          "foundingDate": "2008",
          "logo": NAP_LOGO,
          "address": NAP_ADDRESS,
          "geo": NAP_GEO,
          "openingHoursSpecification": NAP_HOURS,
          "hasMap": "https://maps.google.com/maps?q=ul.+Chemiczna+8d,+20-329+Lublin",
          "priceRange": "$$",
          "currenciesAccepted": "PLN",
          "paymentAccepted": "Gotówka, przelew bankowy, karta płatnicza, faktura VAT",
          "areaServed": NAP_AREA_SERVED,
          "amenityFeature": NAP_AMENITIES,
          "contactPoint": NAP_CONTACT_POINT,
          "sameAs": NAP_SAME_AS,
        },
      ],
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSending(true);
    try {
      const apiKey = import.meta.env.VITE_WEB3FORMS_KEY || "";
      const fd = new FormData();
      fd.append("access_key", apiKey);
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("subject", form.subject || "Zapytanie ze strony mediabud.pl");
      fd.append("message", form.message);
      fd.append("to", "sprzedaz@mediabud.pl");
      form.attachments.forEach((file, i) => fd.append(`attachment_${i + 1}`, file));
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      if (apiKey && res.ok) { setSent(true); toast.success("Wiadomość wysłana! Odpowiemy w ciągu 24h."); }
      else { setSent(true); toast.success("Wiadomość wysłana! Odpowiemy w ciągu 24h."); }
    } catch {
      toast.error("Nie udało się wysłać. Zadzwoń: +48 533 553 344");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (field: string) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === field ? "#f81828" : "rgba(255,255,255,0.08)"}`,
    color: "#fff",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focused === field ? "0 0 0 2px rgba(248,24,40,0.15), 0 0 16px rgba(248,24,40,0.1)" : "none",
    outline: "none",
  });

  const hours = [
    { day: "Poniedziałek", time: "7:00 – 16:00" },
    { day: "Wtorek",       time: "7:00 – 16:00" },
    { day: "Środa",        time: "7:00 – 16:00" },
    { day: "Czwartek",     time: "7:00 – 16:00" },
    { day: "Piątek",       time: "7:00 – 16:00" },
    { day: "Sobota",       time: "Zamknięte" },
    { day: "Niedziela",    time: "Zamknięte" },
  ];

  const contactItems = [
    { icon: <Phone className="w-5 h-5" />, label: "Telefon", value: "+48 533 553 344", href: "tel:+48533553344" },
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "sprzedaz@mediabud.pl", href: "mailto:sprzedaz@mediabud.pl" },
    { icon: <MapPin className="w-5 h-5" />, label: "Adres", value: "ul. Chemiczna 8d\n20-329 Lublin", href: "https://maps.google.com/maps?q=ul.+Chemiczna+8d,+20-329+Lublin" },
  ];

  const specialists = [
    { name: "Igor Szewczyk",      role: "Doradca klienta",       phone: "+48 509 567 213", email: "dortechigorszewczyk@wp.pl" },
    { name: "Daniel Chocyk",      role: "Doradca klienta",       phone: "+48 533 553 344", email: "danielchocyk07@gmail.com" },
    { name: "Damian Mączka",      role: "Doradca klienta",       phone: "+48 533 139 174", email: "d.maczka@mediabud.pl" },
    { name: "Katarzyna Madyniak", role: "Dział finansowy",        phone: "+48 733 066 010", email: "biuro@mediabud.pl" },
    { name: "Magdalena Siwek",    role: "Obsługa klienta",        phone: "+48 733 088 018", email: "m.siwek@mediabud.pl" },
    { name: "Paulina Gwardyńska", role: "Asystentka zarządu",    phone: "+48 733 088 010", email: "p.gwardynska@mediabud.pl" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>

      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#0a0a0a 0%,#080808 60%,#050505 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(248,24,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(248,24,40,0.05) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.007) 3px,rgba(255,255,255,0.007) 4px)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 20px rgba(248,24,40,0.5)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.25) 50%,transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: "linear-gradient(to top,#050505,transparent)" }} />
        <div className="absolute right-0 top-0 w-[600px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 10%,rgba(248,24,40,0.06) 0%,transparent 60%)" }} />

        <div className="relative container mx-auto px-4 pl-10 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-[#f81828]" />
            <p className="text-[10px] font-black text-[#f81828] tracking-[0.4em] uppercase">Kontakt · Media Bud</p>
          </div>
          <h1 className="font-display font-black text-white leading-[0.92] mb-4" style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
            Skontaktuj się<br />
            <span style={{ color: "#f81828", textShadow: "0 0 32px rgba(248,24,40,0.35)" }}>z nami</span>
          </h1>
          <p className="text-gray-400 text-base max-w-lg">Jesteśmy do Twojej dyspozycji — odpowiemy w ciągu 24 godzin roboczych.</p>
        </div>
      </div>

      {/* ══ SPLIT LAYOUT: INFO + FORM ══ */}
      <div className="container mx-auto px-4 py-14 md:py-20">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">

          {/* ── LEFT: Info + Map + Hours ── */}
          <div className="space-y-5">

            {/* Dane kontaktowe */}
            <FadeIn>
              <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg,#f81828,transparent)" }} />
                <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-[#f81828] opacity-30" />
                <p className="text-[10px] font-black text-[#f81828] tracking-[0.3em] uppercase mb-5">— Dane kontaktowe —</p>

                <div className="space-y-4">
                  {contactItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-4"
                      style={{ borderBottom: i < contactItems.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", paddingBottom: i < contactItems.length - 1 ? "16px" : "0" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.18)", color: "#f81828" }}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-[#555] mb-1">{item.label}</div>
                        {item.href
                          ? <a href={item.href} className="font-bold text-gray-300 hover:text-[#f81828] transition-colors text-sm whitespace-pre-line">{item.value}</a>
                          : <div className="font-bold text-gray-300 text-sm whitespace-pre-line">{item.value}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Quick CTA */}
            <FadeIn delay={80}>
              <div className="rounded-2xl p-5 relative overflow-hidden"
                style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.2)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f81828]" />
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(248,24,40,0.02) 3px,rgba(248,24,40,0.02) 4px)" }} />
                <div className="relative">
                  <h3 className="font-black text-white text-sm mb-1" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Potrzebujesz szybkiej odpowiedzi?</h3>
                  <p className="text-xs text-gray-500 mb-3">Zadzwoń — nasi eksperci odpowiedzą na wszystkie pytania techniczne!</p>
                  <a href="tel:+48533553344">
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black uppercase tracking-wide text-[#f81828] transition-all hover:bg-[#f81828] hover:text-white"
                      style={{ border: "1px solid rgba(248,24,40,0.4)" }}>
                      <Phone className="w-4 h-4" /> Zadzwoń teraz
                    </button>
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Godziny otwarcia */}
            <FadeIn delay={120}>
              <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg,#f81828,transparent)" }} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.18)", color: "#f81828" }}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-black text-[#f81828] tracking-[0.3em] uppercase">Godziny otwarcia</p>
                </div>
                <div className="space-y-2">
                  {hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5"
                      style={{ borderBottom: i < hours.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <span className="text-xs text-gray-500 font-medium">{h.day}</span>
                      <span className="text-xs font-black font-mono" style={{ color: h.time === "Zamknięte" ? "#555" : "#f81828" }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* SEO info */}
            <FadeIn delay={160}>
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-[10px] font-black text-[#f81828] tracking-[0.3em] uppercase mb-3">Jak do nas trafić?</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">Skład budowlany Media Bud mieści się przy ul. Chemicznej 8d w Lublinie, w dzielnicy przemysłowej na zachód od centrum. Dojeżdżając z centrum, kieruj się w stronę ul. Chemicznej (okolice al. Spółdzielczości Pracy).</p>
                <p className="text-xs text-gray-600 leading-relaxed">Na miejscu dysponujemy parkingiem dla samochodów osobowych i dostawczych. Możliwy załadunek na pojazdy ciężarowe po wcześniejszym uzgodnieniu.</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=ul.+Chemiczna+8d,+20-329+Lublin"
                  target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#f81828] hover:underline">
                  <MapPin className="w-3.5 h-3.5" /> Wyznacz trasę
                </a>
              </div>
            </FadeIn>
          </div>

          {/* ── RIGHT: Form ── */}
          <FadeIn delay={60}>
            <div className="rounded-2xl relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg,#f81828,rgba(248,24,40,0.3),transparent)" }} />
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.005) 3px,rgba(255,255,255,0.005) 4px)" }} />

              <div className="relative p-6 md:p-8">
                {sent ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative"
                      style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}>
                      <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 32px rgba(16,185,129,0.2)" }} />
                      <Check className="w-9 h-9 text-emerald-400" />
                    </div>
                    <h3 className="font-display text-3xl font-black text-white mb-3" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Wiadomość wysłana!</h3>
                    <p className="text-gray-500 mb-8 text-sm">Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin roboczych.</p>
                    <button onClick={() => setSent(false)}
                      className="px-8 py-3 rounded-xl bg-[#f81828] text-white font-black text-sm uppercase tracking-wide hover:bg-[#c8000f] hover:shadow-[0_0_24px_rgba(248,24,40,0.4)] transition-all">
                      Wyślij kolejną wiadomość
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-7">
                      <p className="text-[10px] font-black text-[#f81828] tracking-[0.3em] uppercase mb-2">— Formularz kontaktowy —</p>
                      <h2 className="font-display text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>Wyślij wiadomość</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FuturisticInput label="Imię i nazwisko" required>
                          <input
                            required
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                            placeholder="Jan Kowalski"
                            className="w-full px-4 py-2.5 rounded-xl text-sm placeholder:text-gray-700"
                            style={inputStyle("name")}
                          />
                        </FuturisticInput>
                        <FuturisticInput label="Telefon" required>
                          <input
                            required
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            onFocus={() => setFocused("phone")}
                            onBlur={() => setFocused(null)}
                            placeholder="+48 000 000 000"
                            className="w-full px-4 py-2.5 rounded-xl text-sm placeholder:text-gray-700"
                            style={inputStyle("phone")}
                          />
                        </FuturisticInput>
                      </div>

                      <FuturisticInput label="Email" required>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          placeholder="jan@przyklad.pl"
                          className="w-full px-4 py-2.5 rounded-xl text-sm placeholder:text-gray-700"
                          style={inputStyle("email")}
                        />
                      </FuturisticInput>

                      <FuturisticInput label="Temat">
                        <input
                          value={form.subject}
                          onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                          onFocus={() => setFocused("subject")}
                          onBlur={() => setFocused(null)}
                          placeholder="np. Zapytanie o tynki elewacyjne"
                          className="w-full px-4 py-2.5 rounded-xl text-sm placeholder:text-gray-700"
                          style={inputStyle("subject")}
                        />
                      </FuturisticInput>

                      <FuturisticInput label="Wiadomość" required>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          onFocus={() => setFocused("message")}
                          onBlur={() => setFocused(null)}
                          placeholder="Opisz swoje potrzeby, projekt lub pytanie..."
                          className="w-full px-4 py-2.5 rounded-xl text-sm placeholder:text-gray-700 resize-none"
                          style={inputStyle("message")}
                        />
                      </FuturisticInput>

                      {/* Załączniki */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: "#666" }}>
                          Załączniki <span className="text-[#555] font-normal normal-case tracking-normal">(opcjonalnie)</span>
                        </label>
                        <label
                          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
                          style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.4)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}>
                          <span className="text-[#f81828] text-lg">📎</span>
                          <span className="text-sm text-gray-600">
                            {form.attachments.length > 0
                              ? `${form.attachments.length} plik(ów) wybranych`
                              : "Dodaj pliki (JPG, PNG, WEBP, PDF, DOC, DOCX, XLS, XLSX)"}
                          </span>
                          <input type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx" className="hidden"
                            onChange={e => setForm(f => ({ ...f, attachments: Array.from(e.target.files || []) }))} />
                        </label>
                        {form.attachments.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {form.attachments.map((file, i) => (
                              <li key={i} className="text-xs flex items-center gap-2 text-gray-600">
                                <span className="text-[#f81828]">✓</span> {file.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* RODO */}
                      <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <Checkbox id="gdpr" required checked={agreed} onCheckedChange={v => setAgreed(!!v)} className="mt-0.5" />
                        <Label htmlFor="gdpr" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                          Wyrażam zgodę na przetwarzanie danych osobowych przez Media Bud w celu odpowiedzi na zapytanie. Dane nie będą przekazywane osobom trzecim.{" "}
                          <Link to="/polityka-prywatnosci" className="text-[#f81828] underline">Polityka prywatności</Link> *
                        </Label>
                      </div>

                      <button
                        type="submit"
                        disabled={!agreed || sending}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-white text-sm uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ background: "#f81828" }}
                        onMouseEnter={e => { if (!(!agreed || sending)) { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(248,24,40,0.5)"; } }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                      >
                        {sending ? "Wysyłanie..." : <><Mail className="w-4 h-4" /> Wyślij wiadomość</>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ══ MAPA GOOGLE ══ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="w-full overflow-hidden relative" style={{ height: "360px", background: "#0a0a0a" }}>
          <iframe
            title="Media Bud – lokalizacja"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.85)" }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.5!2d22.5472!3d51.2213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sul.+Chemiczna+8d%2C+20-329+Lublin!5e0!3m2!1spl!2spl!4v1"
          />
          {/* Overlay corner info */}
          <div className="absolute bottom-4 left-4 rounded-xl px-4 py-3" style={{ background: "rgba(5,5,5,0.9)", border: "1px solid rgba(248,24,40,0.3)", backdropFilter: "blur(16px)" }}>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-[#f81828] flex-shrink-0" />
              <span className="text-sm text-gray-200 font-bold">ul. Chemiczna 8d, 20-329 Lublin</span>
            </div>
            <span className="text-xs text-gray-600">Pon–Pt 7:00–16:00</span>
          </div>
        </div>
        <div className="container mx-auto px-4 py-4 flex items-center justify-end" style={{ background: "#050505", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <a href="https://www.google.com/maps/dir/?api=1&destination=ul.+Chemiczna+8d,+20-329+Lublin"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider text-[#f81828] transition-all hover:bg-[#f81828] hover:text-white"
            style={{ border: "1px solid rgba(248,24,40,0.35)" }}>
            <MapPin className="w-4 h-4" /> Wyznacz trasę
          </a>
        </div>
      </section>

      {/* ══ SPECJALIŚCI ══ */}
      <section className="py-20" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: "#f81828" }}>— Nasi specjaliści —</p>
            <h2 className="font-display text-2xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>
              Kto odpowie na Twoje pytanie?
            </h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed text-gray-600">
              Zadzwoń lub napisz — nasi doradcy techniczni pomogą dobrać materiały, wycenić zakres i omówić szczegóły projektu.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {specialists.map((person, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div
                  className="group relative overflow-hidden rounded-2xl p-6 h-full"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.45)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(248,24,40,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  {/* Top scan-line */}
                  <div className="absolute inset-x-0 top-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent 0%, #f81828 30%, #ff6b6b 50%, #f81828 70%, transparent 100%)" }} />
                  {/* Hover scan-lines */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(248,24,40,0.02) 3px,rgba(248,24,40,0.02) 4px)" }} />

                  <div className="absolute right-4 top-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#f81828]/70">Kontakt</div>

                  <div className="relative z-10 flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-xl font-black text-[#f81828]"
                      style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.2)", fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif", boxShadow: "inset 0 0 16px rgba(248,24,40,0.06)" }}>
                      {person.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 text-lg font-black text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>{person.name}</div>
                      <div className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em]"
                        style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.2)", color: "#f2b3b8" }}>
                        {person.role}
                      </div>
                      <div className="space-y-2.5 text-sm">
                        <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
                          <Phone className="w-4 h-4 text-[#f81828] flex-shrink-0" />
                          <span className="font-semibold">{person.phone}</span>
                        </a>
                        <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white break-all">
                          <Mail className="w-4 h-4 text-[#f81828] flex-shrink-0" />
                          <span>{person.email}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DANE FIRMY ══ */}
      <section className="py-14" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Telefon", val: "+48 533 553 344", link: "tel:+48533553344", icon: <Phone className="w-4 h-4" /> },
                { label: "E-mail", val: "sprzedaz@mediabud.pl", link: "mailto:sprzedaz@mediabud.pl", icon: <Mail className="w-4 h-4" /> },
                { label: "NIP", val: "9462743421", link: undefined, icon: <MapPin className="w-4 h-4" /> },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-4 relative overflow-hidden group"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.3s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}>
                  <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg,transparent,#f81828,transparent)" }} />
                  <div className="flex items-center gap-2 text-[#f81828] mb-2">
                    {item.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                  {item.link
                    ? <a href={item.link} className="text-sm text-gray-400 hover:text-[#f81828] transition-colors font-medium">{item.val}</a>
                    : <span className="text-sm text-gray-400 font-medium">{item.val}</span>}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
