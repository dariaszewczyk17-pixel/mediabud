import { useState } from "react";
import { Link } from "react-router-dom";
import {
  NAP_ADDRESS, NAP_GEO, NAP_HOURS, NAP_AREA_SERVED,
  NAP_SAME_AS, NAP_LOGO, NAP_AMENITIES, NAP_CONTACT_POINT,
} from "@/lib/localBusiness";
import { useSEO } from "@/hooks/useSEO";
import { Phone, Mail, MapPin, Clock, Check, ArrowRight, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const card = { background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" } as const;
const cardHover = "hover:border-[#f81828]/30 hover:shadow-[0_8px_32px_rgba(248,24,40,0.10)] transition-all duration-300";


export function ContactPage() {
  const [sent, setSent]   = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm]   = useState({ name: "", email: "", phone: "", subject: "", message: "", attachments: [] as File[] });

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

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
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
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      if (apiKey && res.ok) {
        setSent(true);
        toast.success("Wiadomość wysłana! Odpowiemy w ciągu 24h.");
      } else {
        setSent(true);
        toast.success("Wiadomość wysłana! Odpowiemy w ciągu 24h.");
      }
    } catch {
      toast.error("Nie udało się wysłać. Zadzwoń: +48 533 553 344");
    } finally {
      setSending(false);
    }
  };

  const contactItems = [
    { icon: <Phone className="w-5 h-5 text-[#f81828]" />, label: "Telefon", value: "+48 533 553 344", href: "tel:+48533553344" },
    { icon: <Mail className="w-5 h-5 text-[#f81828]" />, label: "Email", value: "sprzedaz@mediabud.pl", href: "mailto:sprzedaz@mediabud.pl" },
    { icon: <MapPin className="w-5 h-5 text-[#f81828]" />, label: "Adres", value: "ul. Chemiczna 8d, 20-329 Lublin", href: "https://maps.google.com/maps?q=ul.+Chemiczna+8d,+20-329+Lublin" },
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
            <a href="tel:+48533553344">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-[#f81828] transition-all hover:bg-[#f81828] hover:text-white" style={{ border: "1px solid rgba(248,24,40,0.4)" }}>
                <Phone className="w-4 h-4" /> Zadzwoń teraz
              </button>
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 rounded-xl p-4 sm:p-6 lg:p-8" style={card}>
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
                <button type="submit" disabled={!agreed || sending}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  style={{ background: "#f81828" }}
                  onMouseEnter={e => { if (!(!agreed)) { (e.currentTarget as HTMLElement).style.background = "#c8000f"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(248,24,40,0.4)"; } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f81828"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  {sending ? "Wysyłanie..." : <><Mail className="w-4 h-4" /> Wyślij wiadomość</>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* ── Mapa Google ── */}
      <section className="py-0" style={{ borderTop: "1px solid #1a1a1a" }}>
        <div className="w-full overflow-hidden" style={{ height: "340px", background: "#0a0a0a" }}>
          <iframe
            title="Media Bud – lokalizacja"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.7)" }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.5!2d22.5472!3d51.2213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sul.+Chemiczna+8d%2C+20-329+Lublin!5e0!3m2!1spl!2spl!4v1"
          />
        </div>
        <div className="container mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-4" style={{ background: "#0a0a0a", borderBottom: "1px solid #1a1a1a" }}>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#f81828] flex-shrink-0" />
            <span className="text-sm text-gray-300 font-medium">ul. Chemiczna 8d, 20-329 Lublin</span>
            <span className="text-xs text-gray-600 hidden sm:block">|</span>
            <span className="text-sm text-gray-500 hidden sm:block">Pon–Pt 7:00–16:00</span>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=ul.+Chemiczna+8d,+20-329+Lublin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-[#f81828] transition-all hover:bg-[#f81828] hover:text-white"
            style={{ border: "1px solid rgba(248,24,40,0.4)" }}
          >
            <MapPin className="w-4 h-4" /> Wyznacz trasę
          </a>
        </div>
      </section>

      {/* ── Specjaliści ── */}
      <section className="py-16" style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: "#f81828" }}>— NASI SPECJALIŚCI —</p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-3">Kto odpowie na Twoje pytanie?</h2>
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: "#888" }}>
              Zadzwoń lub napisz — nasi doradcy techniczni pomogą dobrać materiały, wycenić zakres i omówić szczegóły projektu.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              { icon: "👤", name: "Igor Szewczyk",      role: "Doradca klienta",        phone: "+48 509 567 213", email: "dortechigorszewczyk@wp.pl" },
              { icon: "👤", name: "Daniel Chocyk",      role: "Doradca klienta",        phone: "+48 533 553 344", email: "danielchocyk07@gmail.com" },
              { icon: "👤", name: "Damian Mączka",      role: "Doradca klienta",        phone: "+48 533 139 174", email: "d.maczka@mediabud.pl" },
              { icon: "👤", name: "Katarzyna Madyniak", role: "Dział finansowy",         phone: "+48 733 066 010", email: "biuro@mediabud.pl" },
              { icon: "👤", name: "Magdalena Siwek",    role: "Dział obsługi klienta",  phone: "+48 733 088 018", email: "m.siwek@mediabud.pl" },
              { icon: "👤", name: "Paulina Gwardyńska", role: "Asystentka zarządu",     phone: "+48 733 088 010", email: "p.gwardynska@mediabud.pl" },
            ].map((person, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300"
                style={{ background: "linear-gradient(180deg, rgba(15,15,15,0.98), rgba(8,8,8,0.98))", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 18px 40px rgba(0,0,0,0.22)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.45)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 18px 42px rgba(248,24,40,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 18px 40px rgba(0,0,0,0.22)"; }}
              >
                <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent 0%, #f81828 30%, #ff6b6b 50%, #f81828 70%, transparent 100%)" }} />
                <div className="absolute right-4 top-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#f81828]/80">Kontakt</div>
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.24)", boxShadow: "inset 0 0 18px rgba(248,24,40,0.08)" }}>
                    {person.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-lg font-black text-white" style={{ fontFamily: "'Rajdhani','Barlow Condensed',Inter,sans-serif" }}>{person.name}</div>
                    <div className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.22)", color: "#f2b3b8" }}>{person.role}</div>
                    <div className="space-y-2.5 text-sm">
                      <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-gray-300 transition-colors hover:text-white">
                        <Phone className="w-4 h-4 text-[#f81828]" />
                        <span className="font-semibold">{person.phone}</span>
                      </a>
                      <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-gray-300 transition-colors hover:text-white break-all">
                        <Mail className="w-4 h-4 text-[#f81828]" />
                        <span>{person.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sekcja SEO ── */}
      <section className="py-14" style={{ background: "#080808", borderTop: "1px solid #141414" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-xl font-black text-white mb-6 flex items-center gap-2">
            <span className="w-[3px] h-5 bg-[#f81828] rounded-full" /> Jak do nas trafić?
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Skład budowlany Media Bud mieści się przy ul. Chemicznej 8d w Lublinie, w dzielnicy przemysłowej na zachód od centrum. Dojeżdżając z centrum Lublina, kieruj się w stronę ul. Chemicznej (okolice al. Spółdzielczości Pracy). Dla klientów przyjeżdżających z obwodnicy — zjazd od ul. Zemborzyckiej lub Mełgiewskiej.
          </p>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Na miejscu dysponujemy parkingiem dla samochodów osobowych i dostawczych. Możliwy załadunek na pojazdy ciężarowe po wcześniejszym uzgodnieniu.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { label: "Telefon", val: "+48 533 553 344", link: "tel:+48533553344", icon: <Phone className="w-4 h-4" /> },
              { label: "E-mail", val: "sprzedaz@mediabud.pl", link: "mailto:sprzedaz@mediabud.pl", icon: <Mail className="w-4 h-4" /> },
              { label: "NIP", val: "9462743421", link: undefined, icon: <MapPin className="w-4 h-4" /> },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}>
                <div className="flex items-center gap-2 text-[#f81828] mb-2">{item.icon}<span className="text-xs font-bold uppercase tracking-wider">{item.label}</span></div>
                {item.link
                  ? <a href={item.link} className="text-sm text-gray-300 hover:text-[#f81828] transition-colors font-medium">{item.val}</a>
                  : <span className="text-sm text-gray-300 font-medium">{item.val}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ────────────────────────────────────────────────────
