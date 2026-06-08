import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { BarChart2, Package, Tag, Settings, LogOut, Menu, X, Plus,
         Pencil, Trash2, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";

const card = { background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" } as const;
const cardHover = "hover:border-[#f81828]/30 hover:shadow-[0_8px_32px_rgba(248,24,40,0.10)] transition-all duration-300";


export default function AdminPanel() {
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
