import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Check, Users, Award, Truck, Star, ChevronRight, BarChart2, Package, Tag, Settings, LogOut, Menu, X, Plus, Pencil, Trash2 } from "lucide-react";
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

// ─── CONTACT PAGE ─────────────────────────────────────────────────
export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Wiadomość wysłana! Odpowiemy w ciągu 24h.");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-2">Kontakt</h1>
          <p className="text-gray-300">Jesteśmy do Twojej dyspozycji – skontaktuj się z nami!</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-10">
        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-black text-xl text-gray-900 mb-5">Dane kontaktowe</h2>
            <div className="space-y-4">
              {[
                { icon: <Phone className="w-5 h-5 text-primary" />, label: "Telefon", value: "+48 509 567 213", href: "tel:+48509567213" },
                { icon: <Mail className="w-5 h-5 text-primary" />, label: "Email", value: "sprzedaz@mediabud.pl", href: "mailto:sprzedaz@mediabud.pl" },
                { icon: <MapPin className="w-5 h-5 text-primary" />, label: "Adres", value: "ul. Budowlana 1, 20-001 Lublin", href: undefined },
                { icon: <Clock className="w-5 h-5 text-primary" />, label: "Godziny otwarcia", value: "Pon–Pt: 7:00–17:00\nSob: 8:00–14:00", href: undefined },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="font-medium text-gray-900 hover:text-primary transition-colors">{item.value}</a>
                      : <div className="font-medium text-gray-900 whitespace-pre-line">{item.value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary rounded-xl p-5 text-white">
            <h3 className="font-bold mb-2">Potrzebujesz szybkiej odpowiedzi?</h3>
            <p className="text-sm text-red-100 mb-3">Zadzwoń – nasi eksperci odpowiedzą na wszystkie pytania techniczne!</p>
            <a href="tel:+48509567213"><Button className="w-full bg-white text-primary hover:bg-gray-100 font-bold"><Phone className="w-4 h-4 mr-2" />Zadzwoń teraz</Button></a>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-8">
          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-green-600" /></div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Wiadomość wysłana!</h3>
              <p className="text-gray-600 mb-6">Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin roboczych.</p>
              <Button className="bg-primary" onClick={() => setSent(false)}>Wyślij kolejną wiadomość</Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Wyślij wiadomość</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label className="text-sm mb-1 block">Imię i nazwisko *</Label><Input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jan Kowalski" /></div>
                  <div><Label className="text-sm mb-1 block">Telefon *</Label><Input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+48..." /></div>
                </div>
                <div><Label className="text-sm mb-1 block">Email *</Label><Input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="jan@przyklad.pl" /></div>
                <div><Label className="text-sm mb-1 block">Temat</Label><Input value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} placeholder="np. Zapytanie o tynki elewacyjne" /></div>
                <div><Label className="text-sm mb-1 block">Wiadomość *</Label><Textarea required rows={5} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Opisz swoje potrzeby, projekt lub pytanie..." className="resize-none" /></div>
                <div className="flex items-start gap-2">
                  <Checkbox id="gdpr" required checked={agreed} onCheckedChange={v => setAgreed(!!v)} />
                  <Label htmlFor="gdpr" className="text-xs text-gray-500 leading-relaxed">Wyrażam zgodę na przetwarzanie danych osobowych przez Media Bud w celu odpowiedzi na zapytanie. Dane nie będą przekazywane osobom trzecim. <Link to="/polityka-prywatnosci" className="text-primary underline">Polityka prywatności</Link> *</Label>
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-red-700 font-bold" disabled={!agreed}>
                  <Mail className="w-4 h-4 mr-2" /> Wyślij wiadomość
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────
export function AboutPage() {
  const stats = [
    { value: "15+", label: "Lat na rynku" }, { value: "1000+", label: "Produktów w ofercie" },
    { value: "500+", label: "Zadowolonych klientów" }, { value: "50+", label: "Partnerów-producentów" },
  ];
  const values = [
    { icon: <Award className="w-6 h-6" />, title: "Jakość", desc: "Oferujemy wyłącznie produkty od renomowanych producentów z certyfikatami i atestami." },
    { icon: <Users className="w-6 h-6" />, title: "Fachowość", desc: "Nasz zespół to doświadczeni specjaliści z wieloletnią praktyką w budownictwie." },
    { icon: <Star className="w-6 h-6" />, title: "Zaufanie", desc: "Długoletnie relacje z klientami i partnerami budowane na rzetelności i uczciwości." },
    { icon: <Truck className="w-6 h-6" />, title: "Kompleksowość", desc: "Od zakupu materiałów po doradztwo techniczne i transport – wszystko w jednym miejscu." },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-black mb-4">O firmie Media Bud</h1>
            <p className="text-gray-300 text-lg leading-relaxed">Profesjonalna hurtownia materiałów budowlanych w Lublinie. Obsługujemy deweloperów, wykonawców i klientów indywidualnych, oferując kompleksowe wsparcie techniczne i najwyższą jakość produktów.</p>
            <div className="flex gap-3 mt-6">
              <a href="tel:+48509567213"><Button className="bg-primary hover:bg-red-700"><Phone className="w-4 h-4 mr-2" />Zadzwoń</Button></a>
              <Link to="/kontakt"><Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">Napisz do nas</Button></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-5 text-center">
                <div className="text-4xl font-black text-primary">{s.value}</div>
                <div className="text-sm text-gray-300 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Nasza misja</h2>
          <p className="text-gray-700 leading-relaxed text-lg">Media Bud to więcej niż hurtownia budowlana. Jesteśmy partnerem w realizacji projektów budowlanych – od małych remontów domowych po duże inwestycje deweloperskie. Naszą misją jest dostarczanie wysokiej jakości materiałów budowlanych połączone z profesjonalnym doradztwem technicznym, które pomaga naszym klientom budować lepiej, szybciej i efektywniej kosztowo.</p>
        </div>

        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Nasze wartości</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:border-primary hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Nasi partnerzy i dostawcy</h2>
          <p className="text-gray-600 mb-6">Współpracujemy z wiodącymi producentami materiałów budowlanych, gwarantując oryginalność i jakość każdego produktu.</p>
          <div className="flex flex-wrap gap-3">
            {["Weber","Ceresit","Atlas","Knauf","Rockwool","Swisspor","Styropmin","Caparol","Alpol","Termo Organika","Hilti","Tytan","Mapei","Isomat","Bolix"].map(brand => (
              <span key={brand} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────
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
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-2">Nasze usługi</h1>
          <p className="text-gray-300">Kompleksowa obsługa Twojego projektu budowlanego – od doradztwa po realizację</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary/30 transition-all">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h2 className="text-lg font-black text-gray-900 mb-2">{s.title}</h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{s.desc}</p>
              <ul className="space-y-2 mb-6">
                {s.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link to="/kontakt">
                <Button className="w-full bg-primary hover:bg-red-700 font-medium text-sm">
                  Zapytaj o usługę <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────
type AdminTab = "dashboard" | "products" | "categories" | "blog" | "inquiries" | "settings";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: "", pass: "" });

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center"><span className="text-white font-black">MB</span></div>
            <div><div className="font-black text-gray-900">Media Bud Admin</div><div className="text-xs text-gray-500">Panel zarządzania</div></div>
          </div>
          <form onSubmit={e => { e.preventDefault(); if (loginForm.user === "admin" && loginForm.pass === "admin123") { setLoggedIn(true); } else { toast.error("Błędne dane logowania (admin / admin123)"); } }} className="space-y-4">
            <div><Label className="text-sm mb-1 block">Login</Label><Input value={loginForm.user} onChange={e => setLoginForm(f => ({...f, user: e.target.value}))} placeholder="admin" /></div>
            <div><Label className="text-sm mb-1 block">Hasło</Label><Input type="password" value={loginForm.pass} onChange={e => setLoginForm(f => ({...f, pass: e.target.value}))} placeholder="••••••••" /></div>
            <Button type="submit" className="w-full bg-primary hover:bg-red-700 font-bold">Zaloguj się</Button>
            <p className="text-xs text-center text-gray-400">Demo: login <strong>admin</strong> / hasło <strong>admin123</strong></p>
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-14"} bg-gray-900 text-white flex-shrink-0 transition-all duration-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-700 flex items-center gap-2">
          {sidebarOpen && <><div className="w-8 h-8 bg-primary rounded flex items-center justify-center"><span className="text-white font-black text-sm">MB</span></div><span className="font-bold text-sm">Media Bud Admin</span></>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto hover:text-primary transition-colors">{sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}</button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeTab === item.id ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
              {item.icon}
              {sidebarOpen && <><span className="flex-1 text-left">{item.label}</span>{item.count !== undefined && <Badge className="bg-gray-700 text-gray-300 text-xs px-1.5 py-0">{item.count}</Badge>}</>}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-gray-700">
          <button onClick={() => setLoggedIn(false)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />{sidebarOpen && "Wyloguj"}
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-2xl font-black text-gray-900 mb-6">Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Produkty", value: products.length, color: "bg-blue-500", icon: <Package className="w-5 h-5 text-white" /> },
                  { label: "Kategorie", value: categories.length, color: "bg-green-500", icon: <Tag className="w-5 h-5 text-white" /> },
                  { label: "Artykuły bloga", value: blogPosts.length, color: "bg-purple-500", icon: <Menu className="w-5 h-5 text-white" /> },
                  { label: "Zapytania (tydzień)", value: 5, color: "bg-primary", icon: <Mail className="w-5 h-5 text-white" /> },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center`}>{s.icon}</div>
                    <div><div className="text-2xl font-black text-gray-900">{s.value}</div><div className="text-sm text-gray-500">{s.label}</div></div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-gray-900 mb-4">Ostatnie zapytania</h2>
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-left text-gray-500"><th className="pb-2">Klient</th><th className="pb-2">Produkt</th><th className="pb-2">Data</th><th className="pb-2">Status</th></tr></thead>
                  <tbody>
                    {[["Jan Kowalski","Tynk silikonowy Weber","2026-05-27","Nowe"],["Anna Nowak","Styropian EPS 100","2026-05-26","W trakcie"],["Piotr Wiśniewski","Wełna Rockwool","2026-05-25","Odpowiedziano"],["Budex Sp. z o.o.","Farby Caparol (hurtownia)","2026-05-24","Nowe"],["Marek Zając","Klej do styropianu Atlas","2026-05-23","Zamknięte"]].map(([name,prod,date,status],i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2 font-medium">{name}</td>
                        <td className="py-2 text-gray-600 hidden sm:table-cell">{prod}</td>
                        <td className="py-2 text-gray-500 hidden md:table-cell">{date}</td>
                        <td className="py-2"><Badge className={`text-xs ${status==="Nowe"?"bg-primary text-white":status==="W trakcie"?"bg-yellow-100 text-yellow-700 border-yellow-200":status==="Odpowiedziano"?"bg-green-100 text-green-700 border-green-200":"bg-gray-100 text-gray-500"}`}>{status}</Badge></td>
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
                <h1 className="text-2xl font-black text-gray-900">Produkty ({products.length})</h1>
                <Button className="bg-primary hover:bg-red-700 text-sm"><Plus className="w-4 h-4 mr-1" />Dodaj produkt</Button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b"><tr className="text-left"><th className="px-4 py-3 text-gray-600 font-medium">Produkt</th><th className="px-4 py-3 text-gray-600 font-medium hidden md:table-cell">Marka</th><th className="px-4 py-3 text-gray-600 font-medium hidden lg:table-cell">SKU</th><th className="px-4 py-3 text-gray-600 font-medium hidden sm:table-cell">Jednostka</th><th className="px-4 py-3 text-gray-600 font-medium">Akcje</th></tr></thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded border" /><div className="font-medium text-gray-900 line-clamp-1">{p.name}</div></div></td>
                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{p.brand}</td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs hidden lg:table-cell">{p.sku}</td>
                        <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{p.unit}</td>
                        <td className="px-4 py-3"><div className="flex gap-1"><Button size="sm" variant="ghost" className="text-blue-500 hover:text-blue-700 h-8 w-8 p-0"><Pencil className="w-3 h-3" /></Button><Button size="sm" variant="ghost" className="text-red-400 hover:text-red-600 h-8 w-8 p-0"><Trash2 className="w-3 h-3" /></Button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-gray-900">Kategorie ({categories.length})</h1>
                <Button className="bg-primary hover:bg-red-700 text-sm"><Plus className="w-4 h-4 mr-1" />Dodaj kategorię</Button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b"><tr className="text-left"><th className="px-4 py-3 text-gray-600 font-medium">Nazwa</th><th className="px-4 py-3 text-gray-600 font-medium">Slug</th><th className="px-4 py-3 text-gray-600 font-medium hidden sm:table-cell">Podkategorie</th><th className="px-4 py-3 text-gray-600 font-medium">Akcje</th></tr></thead>
                  <tbody>
                    {categories.map(c => (
                      <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">{c.slug}</td>
                        <td className="px-4 py-3 hidden sm:table-cell"><Badge variant="secondary">{c.children?.length || 0}</Badge></td>
                        <td className="px-4 py-3"><div className="flex gap-1"><Button size="sm" variant="ghost" className="text-blue-500 h-8 w-8 p-0"><Pencil className="w-3 h-3" /></Button><Button size="sm" variant="ghost" className="text-red-400 h-8 w-8 p-0"><Trash2 className="w-3 h-3" /></Button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-gray-900">Blog ({blogPosts.length})</h1>
                <Button className="bg-primary hover:bg-red-700 text-sm"><Plus className="w-4 h-4 mr-1" />Nowy artykuł</Button>
              </div>
              <div className="grid gap-4">
                {blogPosts.map(p => (
                  <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                    <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 line-clamp-1">{p.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{p.category} · {p.date} · {p.readTime} min</div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button size="sm" variant="ghost" className="text-blue-500 h-8 w-8 p-0"><Pencil className="w-3 h-3" /></Button>
                      <Button size="sm" variant="ghost" className="text-red-400 h-8 w-8 p-0"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "inquiries" && (
            <div>
              <h1 className="text-2xl font-black text-gray-900 mb-6">Zapytania ofertowe</h1>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b"><tr className="text-left"><th className="px-4 py-3 font-medium text-gray-600">Klient</th><th className="px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Kontakt</th><th className="px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Produkt / Opis</th><th className="px-4 py-3 font-medium text-gray-600">Status</th></tr></thead>
                  <tbody>
                    {[["Jan Kowalski","jan@email.pl · 509 xxx xxx","Tynk silikonowy Weber – 50 worków","Nowe"],["Anna Nowak","anna@email.pl · 600 xxx xxx","Styropian EPS fasadowy 15cm – 200 m²","W trakcie"],["Piotr Wiśniewski","p.w@firma.pl · 510 xxx xxx","Wełna fasadowa Rockwool 15cm","Odpowiedziano"],["Budex Sp. z o.o.","biuro@budex.pl · 511 xxx xxx","Zapytanie hurtowe – Farby Caparol","Nowe"],["Marek Zając","m.z@email.pl · 512 xxx xxx","Klej Atlas Stopter K-20 x50 worków","Zamknięte"]].map(([name,contact,desc,status],i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{name}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{contact}</td>
                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{desc}</td>
                        <td className="px-4 py-3"><Badge className={`text-xs ${status==="Nowe"?"bg-primary text-white":status==="W trakcie"?"bg-yellow-100 text-yellow-700":status==="Odpowiedziano"?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>{status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-2xl font-black text-gray-900 mb-6">Ustawienia</h1>
              <div className="grid gap-6">
                {[["Dane firmy","Nazwa, adres, kontakt, godziny otwarcia","Edytuj"],["SEO","Meta tytuły, opisy, słowa kluczowe dla stron","Edytuj"],["Integracje","Google Analytics 4, Google My Business, Facebook Pixel","Konfiguruj"],["Użytkownicy admin","Zarządzaj dostępami do panelu","Zarządzaj"],["Wygląd sklepu","Kolory, logo, banery","Edytuj"]].map(([title, desc, action], i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
                    <div><div className="font-bold text-gray-900">{title}</div><div className="text-sm text-gray-500">{desc}</div></div>
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">{action}</Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
