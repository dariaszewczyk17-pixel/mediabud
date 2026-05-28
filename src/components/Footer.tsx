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
  const year = new Date().getFullYear();
  const topCats = categories.slice(0, 8);
  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setSent(true);
  };

  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* ── Newsletter CTA bar ── */}
      <div className="bg-[#f81828] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 10% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 90% 50%, #fff 0%, transparent 50%)" }} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display font-black text-white text-xl mb-1">Bądź na bieżąco z naszą ofertą</h3>
              <p className="text-red-100 text-sm">Promocje, nowe produkty i porady techniczne — prosto na Twoją skrzynkę.</p>
            </div>
            {sent ? (
              <div className="flex items-center gap-2 text-white font-bold text-sm bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl py-3 px-5 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
                Dziękujemy za zapis!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto md:min-w-[360px] flex-shrink-0">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Twój adres e-mail..."
                  required
                  className="flex-1 h-10 px-4 rounded-l-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder:text-red-200 text-sm focus:outline-none focus:bg-white/25 transition-all"
                />
                <button
                  type="submit"
                  className="h-10 px-5 bg-black/30 hover:bg-black/50 text-white font-bold rounded-r-xl flex items-center gap-2 transition-colors text-sm flex-shrink-0 border border-white/10"
                >
                  Zapisz <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Trust badges bar ── */}
      <div className="border-b border-gray-800/60">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map((b, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {b.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white leading-tight">{b.label}</div>
                  <div className="text-xs text-gray-500">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer content ── */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div className="space-y-5">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-white font-black text-lg">MB</span>
              </div>
              <div>
                <div className="font-black text-xl leading-none text-white tracking-tight">MEDIA BUD</div>
                <div className="text-xs text-gray-500 leading-none mt-0.5">Skład Budowlany Lublin</div>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed">
              Profesjonalny skład budowlany w Lublinie. Oferujemy szeroki asortyment materiałów budowlanych,
              chemii budowlanej, izolacji, dachówek i systemów elewacyjnych dla firm i klientów indywidualnych.
            </p>

            {/* Social */}
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2.5">Śledź nas</div>
              <div className="flex items-center gap-2">
                {[
                  { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com/mediabud", label: "Facebook" },
                  { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com/mediabud", label: "Instagram" },
                  { icon: <Youtube className="w-4 h-4" />, href: "https://youtube.com", label: "YouTube" },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-primary flex items-center justify-center transition-all duration-200 hover:scale-105"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-3 h-0.5 bg-primary" />
              Kategorie
            </h3>
            <ul className="space-y-1.5">
              {topCats.map(cat => (
                <li key={cat.id}>
                  <Link
                    to={`/kategoria/${cat.slug}`}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/produkty"
                  className="flex items-center gap-1 text-sm text-primary hover:text-red-400 transition-colors font-semibold mt-1"
                >
                  Wszystkie kategorie <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick links + Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-3 h-0.5 bg-primary" />
              Informacje
            </h3>
            <ul className="space-y-1.5 mb-6">
              {QUICK_LINKS.map(l => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Nasze usługi</h4>
              <ul className="space-y-1">
                {SERVICES.map(s => (
                  <li key={s} className="text-xs text-gray-500 flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0 mt-1.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-3 h-0.5 bg-primary" />
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+48509567213" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Telefon</div>
                    <div className="text-white font-semibold text-sm group-hover:text-primary transition-colors">+48 509 567 213</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:sprzedaz@mediabud.pl" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">E-mail</div>
                    <div className="text-white font-semibold text-sm group-hover:text-primary transition-colors">sprzedaz@mediabud.pl</div>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Adres</div>
                  <div className="text-white font-semibold text-sm">Lublin</div>
                  <div className="text-xs text-gray-500">woj. lubelskie</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Godziny otwarcia</div>
                  <div className="text-white font-semibold text-sm">Pon–Pt: 7:00–17:00</div>
                  <div className="text-xs text-gray-400">Sob: 7:00–13:00</div>
                </div>
              </li>
            </ul>

            {/* CTA */}
            <a
              href="/kontakt"
              className="mt-5 flex items-center justify-center gap-2 w-full bg-primary hover:bg-red-700 text-white text-sm font-bold py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Zapytaj o ofertę <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800/60">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <span>© {year} Media Bud – Skład Budowlany Lublin.</span>
              <span>Wszelkie prawa zastrzeżone.</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/polityka-prywatnosci" className="hover:text-gray-400 transition-colors">Polityka prywatności</Link>
              <Link to="/regulamin" className="hover:text-gray-400 transition-colors">Regulamin</Link>
              <Link to="/sitemap" className="hover:text-gray-400 transition-colors">Mapa strony</Link>
            </div>
            <div className="font-mono text-gray-700 text-xs">
              mediabud.pl · Lublin
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
