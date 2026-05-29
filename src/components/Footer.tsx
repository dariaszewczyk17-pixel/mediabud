import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube,
  ChevronRight, ArrowUpRight, Shield, Truck, Wrench, Award,
  Send, CheckCircle2
} from "lucide-react";
import { categories } from "@/data/categories";

const QUICK_LINKS = [
  { label: "Strona główna",      to: "/" },
  { label: "Produkty",           to: "/produkty" },
  { label: "Blog techniczny",    to: "/blog" },
  { label: "O firmie",           to: "/o-firmie" },
  { label: "Usługi",             to: "/uslugi" },
  { label: "Kontakt",            to: "/kontakt" },
  { label: "Zapytaj o ofertę",   to: "/kontakt" },
  { label: "Wycena projektu",    to: "/kontakt" },
];

const SERVICES = [
  "Dostawa materiałów budowlanych",
  "Doradztwo techniczne i projektowe",
  "Sprzedaż hurtowa i detaliczna",
  "Obsługa firm budowlanych",
  "Zamówienia indywidualne",
  "Realizacje na terenie Lublina",
];

const TRUST_BADGES = [
  { icon: <Truck className="w-5 h-5" />,   label: "Szybka dostawa",    desc: "Na terenie Lublina" },
  { icon: <Shield className="w-5 h-5" />,  label: "Gwarancja jakości", desc: "Sprawdzone produkty" },
  { icon: <Wrench className="w-5 h-5" />,  label: "Doradztwo",         desc: "Eksperci budowlani" },
  { icon: <Award className="w-5 h-5" />,   label: "Lata doświadczenia", desc: "Zaufana marka" },
];

export default function Footer() {
  const topCats = categories.slice(0, 8);
  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setSent(true);
  };

  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com/mediabud", label: "Facebook" },
    { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com/mediabud", label: "Instagram" },
    { icon: <Youtube className="w-4 h-4" />, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }} className="pt-16 pb-8 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src="https://skyagent-artifacts.skywork.ai/router/agent/2026-05-29/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/5j1eO4lOb5MqPjlHF7RIP1%20%E2%80%93%20ze%20zmianami_b734361ec694486192383a2f765df266.png"
                alt="Media Bud – Skład Budowlany"
                className="h-12 w-auto object-contain"
                style={{ maxWidth: "180px" }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#888" }}>
              Profesjonalna hurtownia materiałów budowlanych w Lublinie. Kompleksowe wsparcie od projektu po realizację.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: "1px solid #2d2d2d", color: "#888", background: "#111" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#f81828";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#f81828";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2d2d2d";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#888";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#f81828" }}>
              Produkty
            </h4>
            <ul className="space-y-3">
              {topCats.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/kategoria/${cat.slug}`}
                    className="text-sm transition-colors duration-200 inline-flex items-center gap-2"
                    style={{ color: "#888" }}
                    onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "#fff"; }}
                    onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "#888"; }}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#f81828" }}>
              Informacje
            </h4>
            <ul className="space-y-3 mb-6">
              {QUICK_LINKS.slice(0, 6).map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors duration-200 inline-flex items-center gap-2"
                    style={{ color: "#888" }}
                    onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "#fff"; }}
                    onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "#888"; }}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#f81828" }}>
                Usługi
              </h4>
              <ul className="space-y-2">
                {SERVICES.slice(0, 4).map((service) => (
                  <li key={service} className="text-sm" style={{ color: "#888" }}>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#f81828" }}>
              Kontakt
            </h4>
            <div className="space-y-3 mb-6 text-sm" style={{ color: "#888" }}>
              <a
                href="tel:+48509567213"
                className="block transition-colors duration-200"
                style={{ color: "#888" }}
                onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "#888"; }}
              >
                +48 509 567 213
              </a>
              <a
                href="mailto:sprzedaz@mediabud.pl"
                className="block transition-colors duration-200"
                style={{ color: "#888" }}
                onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "#888"; }}
              >
                sprzedaz@mediabud.pl
              </a>
              <p>Lublin, ul. Chemiczna 8d</p>
            </div>

            {sent ? (
              <div className="rounded-lg px-4 py-3 text-sm font-semibold flex items-center gap-2"
                style={{ background: "rgba(248,24,40,0.12)", border: "1px solid rgba(248,24,40,0.25)", color: "#fff" }}>
                <CheckCircle2 className="w-4 h-4" /> Dziękujemy za zapis!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Twój email"
                    required
                    className="flex-1 px-4 py-2 text-sm rounded-lg text-white placeholder-[#888] outline-none transition-all duration-200"
                    style={{ background: "#1a1a1a", border: "1px solid #2d2d2d" }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "#f81828"; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "#2d2d2d"; }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-bold uppercase rounded-lg text-white"
                    style={{ background: "#f81828", whiteSpace: "nowrap" }}
                  >
                    Zapisz się
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1a1a1a" }} className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#888" }}>© 2026 Media Bud. Wszelkie prawa zastrzeżone.</p>
          <p className="text-xs" style={{ color: "#444" }}>Lublin, ul. Chemiczna 8d | +48 509 567 213 | sprzedaz@mediabud.pl</p>
        </div>
      </div>
    </footer>
  );
}
