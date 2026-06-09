import { useState, useMemo } from "react";
import {
  BarChart2, Package, Tag, Settings, LogOut, Menu, X, Plus, Pencil,
  Trash2, Mail, Search, Bell, ChevronRight, Star, Eye, Image,
  FileText, Home, Users, Megaphone, HardHat, CheckCircle2,
  Clock, AlertCircle, TrendingUp, ShoppingBag, Phone, Globe,
  ChevronDown, Filter, ArrowUpRight, MoreHorizontal, RefreshCw,
} from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";

/* ─── Types ─────────────────────────────────────────────────────── */
type Tab = "dashboard"|"inquiries"|"products"|"categories"|"blog"|"realizacje"|"opinie"|"promocje"|"pracownicy"|"settings";

/* ─── Mock data ─────────────────────────────────────────────────── */
const INQUIRIES = [
  { id:1, name:"Jan Kowalski",     company:"Budex Sp. z o.o.", product:"Tynk silikonowy Weber 25kg", phone:"601 234 567", date:"2026-06-09", status:"Nowe",          msg:"Proszę o wycenę 500 worków tynku silikonowego Weber DR1 na inwestycję wielorodzinną." },
  { id:2, name:"Anna Nowak",       company:"Dom prywatny",     product:"Styropian EPS 100 – 5cm",   phone:"512 345 678", date:"2026-06-08", status:"W trakcie",     msg:"Potrzebuję ok. 200m² styropianu EPS 100 5cm. Czy możliwa dostawa na Lublin?" },
  { id:3, name:"Piotr Wiśniewski", company:"Rembud s.c.",       product:"Wełna Rockwool 15cm",       phone:"698 765 432", date:"2026-06-07", status:"Odpowiedziano", msg:"Zapytanie o dostępność i cenę wełny Rockwool Frontrock MAX E 15cm." },
  { id:4, name:"Marek Zając",      company:"Dom prywatny",     product:"Klej Atlas Stopter K-20",   phone:"503 111 222", date:"2026-06-06", status:"Zamknięte",     msg:"Chciałem zapytać o dostępność kleju Atlas Stopter K-20 w ilości 20 worków." },
  { id:5, name:"Ewa Dąbrowska",    company:"Studio Arch",      product:"Płytki ceramiczne matowe",  phone:"789 012 345", date:"2026-06-05", status:"Nowe",          msg:"Szukam płytek ceramicznych matowych 60x60 do projektu biurowego. Proszę o ofertę." },
  { id:6, name:"TBV Deweloper",    company:"TBV Sp. z o.o.",   product:"System ETICS kompletny",    phone:"81 444 55 66", date:"2026-06-04", status:"W trakcie",    msg:"Zapytanie o system ETICS dla 5 budynków wielorodzinnych — 3200m² fasady łącznie." },
];
const REALIZACJE_MOCK = [
  { id:1, title:"Budynek Onyksowa", year:"2024", category:"elewacje",    client:"Inwestor prywatny",  status:"Opublikowana" },
  { id:2, title:"Polesie Park",     year:"2025", category:"budownictwo", client:"TBV Deweloper",      status:"Opublikowana" },
  { id:3, title:"Lubelska Osada",   year:"2025", category:"elewacje",    client:"Lubelska Osada Sp.", status:"Szkic" },
];
const OPINIE_MOCK = [
  { id:1, name:"Krzysztof Nowak", role:"Kierownik budowy", company:"Lublin",       rating:5, status:"Opublikowana", featured:true  },
  { id:2, name:"Agnieszka Kowalska", role:"Architekt",     company:"Studio A+K",   rating:5, status:"Opublikowana", featured:false },
  { id:3, name:"Marek Wiśniewski",   role:"Właściciel",    company:"Dom własny",   rating:5, status:"Oczekuje",     featured:false },
];
const PROMOCJE_MOCK = [
  { id:1, title:"Rabat 10% Weber — czerwiec",  dates:"01.06–30.06.2026", active:true,  target:"Strona główna" },
  { id:2, title:"Darmowa dostawa od 2000 zł",  dates:"Stała",             active:true,  target:"Cały sklep" },
  { id:3, title:"Tynki -15% — wyprzedaż",      dates:"15.06–22.06.2026", active:false, target:"Kategoria Tynki" },
];
const PRACOWNICY_MOCK = [
  { id:1, name:"Igor Szewczyk",        role:"Kierownik sprzedaży",  dept:"Sprzedaż" },
  { id:2, name:"Daniel Chocyk",        role:"Doradca techniczny",   dept:"Sprzedaż" },
  { id:3, name:"Damian Mączka",        role:"Logistyka i magazyn",  dept:"Magazyn" },
  { id:4, name:"Katarzyna Madyniak",   role:"Obsługa klienta",      dept:"Sprzedaż" },
  { id:5, name:"Magdalena Siwek",      role:"Koordynator projektów",dept:"Realizacje" },
  { id:6, name:"Paulina Gwardyńska",   role:"Administracja",        dept:"Biuro" },
];

/* ─── Helpers ───────────────────────────────────────────────────── */
const S_COLOR: Record<string,string> = {
  "Nowe":          "bg-[#f81828] text-white",
  "W trakcie":     "bg-amber-500/20 text-amber-400",
  "Odpowiedziano": "bg-emerald-500/20 text-emerald-400",
  "Zamknięte":     "bg-white/8 text-gray-500",
  "Opublikowana":  "bg-emerald-500/20 text-emerald-400",
  "Szkic":         "bg-white/8 text-gray-500",
  "Oczekuje":      "bg-amber-500/20 text-amber-400",
};
const Badge = ({ s }: { s: string }) => (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${S_COLOR[s] ?? "bg-white/8 text-gray-400"}`}>{s}</span>
);
const Card = ({ children, className="" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl ${className}`} style={{ background:"#0f0f0f", border:"1px solid rgba(255,255,255,0.07)" }}>{children}</div>
);
const SectionHeader = ({ title, count, onAdd, addLabel="Dodaj nowy" }: { title:string; count?:number; onAdd?:()=>void; addLabel?:string }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-2xl font-black text-white" style={{fontFamily:"'Rajdhani','Barlow Condensed',Inter,sans-serif"}}>{title}</h1>
      {count !== undefined && <p className="text-xs text-gray-500 mt-0.5">{count.toLocaleString("pl-PL")} rekordów</p>}
    </div>
    {onAdd && (
      <button onClick={onAdd} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f81828] text-white text-sm font-bold hover:bg-[#c8000f] transition-colors">
        <Plus className="w-4 h-4"/>{addLabel}
      </button>
    )}
  </div>
);

/* ─── Main Component ─────────────────────────────────────────────── */
export default function AdminPanel() {
  const [tab, setTab]           = useState<Tab>("dashboard");
  const [sidebar, setSidebar]   = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user:"", pass:"" });
  const [loginErr, setLoginErr]   = useState("");
  const [search, setSearch]       = useState("");
  const [prodPage, setProdPage]   = useState(1);
  const [inqFilter, setInqFilter] = useState("Wszystkie");
  const [selectedInq, setSelectedInq] = useState<typeof INQUIRIES[0]|null>(null);
  const PROD_PAGE = 25;

  /* ── Login ── */
  if (!loggedIn) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:"#060606"}}>
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-[#f81828] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(248,24,40,0.45)]">
            <span className="text-white font-black text-sm">MB</span>
          </div>
          <div>
            <div className="font-black text-white text-lg" style={{fontFamily:"'Rajdhani',sans-serif"}}>MEDIA BUD</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Panel administracyjny</div>
          </div>
        </div>
        <Card className="p-7">
          <p className="text-sm font-bold text-white mb-5">Zaloguj się</p>
          {loginErr && <div className="mb-4 px-3 py-2 rounded-lg bg-[#f81828]/10 border border-[#f81828]/30 text-[#f81828] text-xs font-bold">{loginErr}</div>}
          <form onSubmit={e => { e.preventDefault(); if(loginForm.user==="admin"&&loginForm.pass==="admin123"){setLoggedIn(true);setLoginErr("");}else setLoginErr("Błędny login lub hasło."); }} className="space-y-4">
            {([["Login","text","admin",loginForm.user,(v:string)=>setLoginForm(f=>({...f,user:v}))],["Hasło","password","••••••••",loginForm.pass,(v:string)=>setLoginForm(f=>({...f,pass:v}))]] as const).map(([label,type,ph,val,fn])=>(
              <div key={label as string}>
                <label className="text-xs text-gray-500 mb-1.5 block font-bold uppercase tracking-wider">{label as string}</label>
                <input type={type as string} value={val as string} placeholder={ph as string}
                  onChange={e => (fn as (v:string)=>void)(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-all"
                  style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.10)"}}
                  onFocus={e=>{e.target.style.borderColor="rgba(248,24,40,0.5)";}}
                  onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.10)";}}
                />
              </div>
            ))}
            <button type="submit" className="w-full py-2.5 rounded-lg bg-[#f81828] text-white font-bold text-sm hover:bg-[#c8000f] transition-colors mt-2">
              Zaloguj się
            </button>
          </form>
          <p className="text-[11px] text-center text-gray-600 mt-4">Demo: <strong className="text-gray-400">admin</strong> / <strong className="text-gray-400">admin123</strong></p>
        </Card>
      </div>
    </div>
  );

  /* ── Nav items ── */
  const NAV = [
    { section: null },
    { id:"dashboard",   icon:<BarChart2 className="w-4 h-4"/>,   label:"Dashboard",    badge: null },
    { section: "Sprzedaż" },
    { id:"inquiries",   icon:<Mail className="w-4 h-4"/>,        label:"Zapytania",    badge: INQUIRIES.filter(i=>i.status==="Nowe").length },
    { section: "Asortyment" },
    { id:"products",    icon:<Package className="w-4 h-4"/>,     label:"Produkty",     badge: null },
    { id:"categories",  icon:<Tag className="w-4 h-4"/>,         label:"Kategorie",    badge: null },
    { section: "Treści" },
    { id:"blog",        icon:<FileText className="w-4 h-4"/>,    label:"Blog",         badge: null },
    { id:"realizacje",  icon:<HardHat className="w-4 h-4"/>,     label:"Realizacje",   badge: null },
    { id:"opinie",      icon:<Star className="w-4 h-4"/>,        label:"Opinie",       badge: OPINIE_MOCK.filter(o=>o.status==="Oczekuje").length },
    { section: "Marketing" },
    { id:"promocje",    icon:<Megaphone className="w-4 h-4"/>,   label:"Promocje",     badge: null },
    { section: "Firma" },
    { id:"pracownicy",  icon:<Users className="w-4 h-4"/>,       label:"Pracownicy",   badge: null },
    { id:"settings",    icon:<Settings className="w-4 h-4"/>,    label:"Ustawienia",   badge: null },
  ];

  /* ── Products filter ── */
  const filteredProds = useMemo(()=>
    search.trim().length>1
      ? products.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.brand?.toLowerCase().includes(search.toLowerCase()))
      : products
  ,[search]);
  const totalPages = Math.ceil(filteredProds.length/PROD_PAGE);
  const pagedProds = filteredProds.slice((prodPage-1)*PROD_PAGE, prodPage*PROD_PAGE);

  /* ── Inquiries filter ── */
  const filteredInq = inqFilter==="Wszystkie" ? INQUIRIES : INQUIRIES.filter(i=>i.status===inqFilter);

  return (
    <div className="min-h-screen flex" style={{background:"#060606",fontFamily:"Inter,sans-serif"}}>

      {/* ── SIDEBAR ── */}
      <aside
        className={`flex-shrink-0 flex flex-col transition-all duration-200 ${sidebar?"w-56":"w-14"}`}
        style={{background:"#0a0a0a",borderRight:"1px solid rgba(255,255,255,0.07)",position:"sticky",top:0,height:"100vh"}}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4" style={{borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div className="w-8 h-8 bg-[#f81828] rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(248,24,40,0.4)]">
            <span className="text-white font-black text-xs">MB</span>
          </div>
          {sidebar && <span className="font-black text-white text-sm" style={{fontFamily:"'Rajdhani',sans-serif"}}>Media Bud</span>}
          <button onClick={()=>setSidebar(s=>!s)} className="ml-auto text-gray-600 hover:text-[#f81828] transition-colors flex-shrink-0">
            {sidebar ? <X className="w-3.5 h-3.5"/> : <Menu className="w-3.5 h-3.5"/>}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV.map((item,i) => {
            if ("section" in item && item.section !== null) return sidebar ? (
              <p key={i} className="px-3 pt-4 pb-1 text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">{item.section}</p>
            ) : <div key={i} className="my-1 mx-2 h-px" style={{background:"rgba(255,255,255,0.05)"}}/>;
            if ("section" in item && item.section === null) return null;
            const it = item as {id:Tab;icon:React.ReactNode;label:string;badge:number|null};
            const active = tab === it.id;
            return (
              <button key={it.id} onClick={()=>setTab(it.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all relative ${active?"bg-[#f81828] text-white shadow-[0_0_14px_rgba(248,24,40,0.3)]":"text-gray-500 hover:text-white hover:bg-white/5"}`}
              >
                <span className="flex-shrink-0">{it.icon}</span>
                {sidebar && <span className="flex-1 text-left font-medium">{it.label}</span>}
                {sidebar && it.badge != null && it.badge > 0 && (
                  <span className="text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full" style={{background:active?"rgba(255,255,255,0.25)":"#f81828",color:"white"}}>{it.badge}</span>
                )}
                {!sidebar && it.badge != null && it.badge > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#f81828]"/>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-2" style={{borderTop:"1px solid rgba(255,255,255,0.07)"}}>
          <a href="https://mediabud.pages.dev" target="_blank" rel="noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
            <Globe className="w-4 h-4 flex-shrink-0"/>
            {sidebar && <span className="font-medium">Otwórz stronę</span>}
          </a>
          <button onClick={()=>setLoggedIn(false)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors">
            <LogOut className="w-4 h-4 flex-shrink-0"/>
            {sidebar && <span className="font-medium">Wyloguj</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-3.5 flex-shrink-0" style={{background:"#0a0a0a",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none"/>
            <input value={search} onChange={e=>{setSearch(e.target.value);if(tab!=="products")setTab("products");}}
              placeholder="Szukaj produktów..." className="w-full pl-9 pr-3 py-2 rounded-lg text-xs text-white placeholder-gray-600 outline-none transition-all"
              style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}
              onFocus={e=>e.target.style.borderColor="rgba(248,24,40,0.45)"}
              onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"}
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
              <Bell className="w-4 h-4"/>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#f81828]"/>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#f81828] flex items-center justify-center text-white text-xs font-black">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">

          {/* ════ DASHBOARD ════ */}
          {tab==="dashboard" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-black text-white" style={{fontFamily:"'Rajdhani',sans-serif"}}>Dashboard</h1>
                  <p className="text-xs text-gray-500 mt-0.5">Media Bud — Panel zarządzania · {new Date().toLocaleDateString("pl-PL",{day:"numeric",month:"long",year:"numeric"})}</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-500 hover:text-white text-xs font-bold transition-colors" style={{border:"1px solid rgba(255,255,255,0.08)"}}>
                  <RefreshCw className="w-3.5 h-3.5"/> Odśwież
                </button>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label:"Produkty",      value:products.length.toLocaleString("pl-PL"), icon:<Package className="w-5 h-5"/>,  color:"#3b82f6", sub:"+3 nowe" },
                  { label:"Zapytania",     value:INQUIRIES.length,                         icon:<Mail className="w-5 h-5"/>,     color:"#f81828", sub:`${INQUIRIES.filter(i=>i.status==="Nowe").length} nowych` },
                  { label:"Artykuły",      value:blogPosts.length,                          icon:<FileText className="w-5 h-5"/>, color:"#8b5cf6", sub:"aktywne" },
                  { label:"Realizacje",    value:REALIZACJE_MOCK.length,                    icon:<HardHat className="w-5 h-5"/>,  color:"#10b981", sub:"opublikowane" },
                ].map((s,i)=>(
                  <Card key={i} className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:s.color+"18",color:s.color}}>
                        {s.icon}
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-600"/>
                    </div>
                    <div className="mt-3">
                      <div className="text-2xl font-black text-white" style={{fontFamily:"'Rajdhani',sans-serif"}}>{s.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                      <div className="text-[10px] mt-1 font-bold" style={{color:s.color}}>{s.sub}</div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-[1fr_340px] gap-4">
                {/* Recent inquiries */}
                <Card>
                  <div className="flex items-center justify-between px-5 py-3.5" style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                    <span className="text-sm font-bold text-white">Ostatnie zapytania</span>
                    <button onClick={()=>setTab("inquiries")} className="text-[11px] text-[#f81828] font-bold hover:underline flex items-center gap-1">
                      Zobacz wszystkie <ChevronRight className="w-3 h-3"/>
                    </button>
                  </div>
                  <div className="divide-y" style={{borderColor:"rgba(255,255,255,0.04)"}}>
                    {INQUIRIES.slice(0,5).map(inq=>(
                      <div key={inq.id} className="px-5 py-3 flex items-center gap-3 hover:bg-white/2 transition-colors cursor-pointer" onClick={()=>{setSelectedInq(inq);setTab("inquiries");}}>
                        <div className="w-8 h-8 rounded-full bg-[#f81828]/15 flex items-center justify-center text-[#f81828] text-xs font-black flex-shrink-0">
                          {inq.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white truncate">{inq.name}</div>
                          <div className="text-[11px] text-gray-500 truncate">{inq.product}</div>
                        </div>
                        <Badge s={inq.status}/>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick actions */}
                <div className="space-y-3">
                  <Card className="p-4">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Szybkie akcje</p>
                    <div className="space-y-2">
                      {[
                        ["Dodaj artykuł blogowy",  "blog",      <Plus className="w-3.5 h-3.5"/>],
                        ["Dodaj realizację",       "realizacje",<Plus className="w-3.5 h-3.5"/>],
                        ["Nowa promocja",          "promocje",  <Plus className="w-3.5 h-3.5"/>],
                        ["Otwórz Sanity Studio",   null,        <Globe className="w-3.5 h-3.5"/>],
                      ].map(([label,target,icon])=>(
                        target
                          ? <button key={label as string} onClick={()=>setTab(target as Tab)}
                              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left">
                              <span className="text-[#f81828] flex-shrink-0">{icon}</span>{label}
                            </button>
                          : <a key={label as string} href="https://mediabud-studio.pages.dev" target="_blank" rel="noreferrer"
                              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                              <span className="text-[#f81828] flex-shrink-0">{icon}</span>{label} <ArrowUpRight className="w-3 h-3 ml-auto text-gray-600"/>
                            </a>
                      ))}
                    </div>
                  </Card>
                  <Card className="p-4">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Aktywne promocje</p>
                    <div className="space-y-2">
                      {PROMOCJE_MOCK.filter(p=>p.active).map(p=>(
                        <div key={p.id} className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"/>
                          <span className="text-xs text-gray-300 flex-1 truncate">{p.title}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* ════ ZAPYTANIA ════ */}
          {tab==="inquiries" && (
            <div>
              <SectionHeader title="Zapytania" count={INQUIRIES.length}/>
              {/* Detail modal */}
              {selectedInq && (
                <Card className="mb-5 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#f81828] mb-1">Szczegóły zapytania #{selectedInq.id}</p>
                      <h2 className="text-lg font-black text-white">{selectedInq.name}</h2>
                      <p className="text-xs text-gray-500">{selectedInq.company} · {selectedInq.date}</p>
                    </div>
                    <button onClick={()=>setSelectedInq(null)} className="text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5"/></button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg px-4 py-3" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
                      <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Telefon</p>
                      <a href={`tel:${selectedInq.phone}`} className="text-sm font-bold text-[#f81828] hover:underline">{selectedInq.phone}</a>
                    </div>
                    <div className="rounded-lg px-4 py-3" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
                      <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Produkt / zapytanie</p>
                      <p className="text-sm font-bold text-white">{selectedInq.product}</p>
                    </div>
                  </div>
                  <div className="rounded-lg px-4 py-3 mb-4" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
                    <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Treść wiadomości</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedInq.msg}</p>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${selectedInq.phone}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f81828] text-white text-xs font-bold hover:bg-[#c8000f] transition-colors">
                      <Phone className="w-3.5 h-3.5"/> Zadzwoń
                    </a>
                    <a href={`mailto:sprzedaz@mediabud.pl?subject=Odpowiedź na zapytanie – ${selectedInq.name}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-colors" style={{border:"1px solid rgba(255,255,255,0.1)"}}>
                      <Mail className="w-3.5 h-3.5"/> Wyślij email
                    </a>
                  </div>
                </Card>
              )}
              {/* Filter pills */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {["Wszystkie","Nowe","W trakcie","Odpowiedziano","Zamknięte"].map(f=>(
                  <button key={f} onClick={()=>setInqFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${inqFilter===f?"bg-[#f81828] text-white":"text-gray-500 hover:text-white"}`}
                    style={inqFilter===f?{}:{border:"1px solid rgba(255,255,255,0.08)"}}>
                    {f} {f==="Wszystkie" ? `(${INQUIRIES.length})` : `(${INQUIRIES.filter(i=>i.status===f).length})`}
                  </button>
                ))}
              </div>
              <Card>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                      {["Klient","Firma","Produkt","Telefon","Data","Status",""].map(h=>(
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-black text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{borderColor:"rgba(255,255,255,0.04)"}}>
                    {filteredInq.map(inq=>(
                      <tr key={inq.id} className="hover:bg-white/2 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#f81828]/15 flex items-center justify-center text-[#f81828] text-xs font-black flex-shrink-0">{inq.name.charAt(0)}</div>
                            <span className="text-xs font-bold text-white">{inq.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">{inq.company}</td>
                        <td className="px-4 py-3 text-xs text-gray-400 max-w-[180px] truncate">{inq.product}</td>
                        <td className="px-4 py-3"><a href={`tel:${inq.phone}`} className="text-xs text-[#f81828] hover:underline font-bold">{inq.phone}</a></td>
                        <td className="px-4 py-3 text-xs text-gray-600">{inq.date}</td>
                        <td className="px-4 py-3"><Badge s={inq.status}/></td>
                        <td className="px-4 py-3">
                          <button onClick={()=>setSelectedInq(inq)} className="text-xs text-gray-500 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors font-bold">Szczegóły</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* ════ PRODUKTY ════ */}
          {tab==="products" && (
            <div>
              <SectionHeader title="Produkty" count={filteredProds.length} addLabel="Dodaj produkt" onAdd={()=>window.open("https://mediabud-studio.pages.dev","_blank")}/>
              <div className="flex gap-3 mb-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px] max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none"/>
                  <input value={search} onChange={e=>{setSearch(e.target.value);setProdPage(1);}}
                    placeholder="Szukaj po nazwie lub marce…"
                    className="w-full pl-9 pr-3 py-2 rounded-lg text-xs text-white placeholder-gray-600 outline-none"
                    style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}
                    onFocus={e=>e.target.style.borderColor="rgba(248,24,40,0.45)"}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"}
                  />
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1 font-bold px-3 py-2 rounded-lg" style={{border:"1px solid rgba(255,255,255,0.08)"}}>
                  <Filter className="w-3.5 h-3.5"/> Strona {prodPage}/{totalPages}
                </div>
              </div>
              <Card className="overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                      {["Produkt","Marka","Jednostka","SKU","Akcje"].map(h=>(
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-black text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{borderColor:"rgba(255,255,255,0.04)"}}>
                    {pagedProds.map(p=>(
                      <tr key={p.id} className="hover:bg-white/2 transition-colors">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden" style={{border:"1px solid rgba(255,255,255,0.1)"}}>
                              {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-0.5" onError={e=>{(e.currentTarget as HTMLImageElement).style.display="none";}} loading="lazy"/> : <Package className="w-4 h-4 text-gray-400"/>}
                            </div>
                            <span className="text-xs font-bold text-gray-300 line-clamp-1 max-w-[200px]">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-gray-500">{p.brand || "—"}</td>
                        <td className="px-4 py-2.5 text-xs text-gray-500">{p.unit || "—"}</td>
                        <td className="px-4 py-2.5 text-xs text-gray-600 font-mono">{p.sku || "—"}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex gap-1">
                            <button className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors" title="Edytuj w Sanity">
                              <Pencil className="w-3.5 h-3.5"/>
                            </button>
                            <a href={`/produkty/${p.slug}`} target="_blank" rel="noreferrer" className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 transition-colors" title="Podgląd">
                              <Eye className="w-3.5 h-3.5"/>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between px-5 py-3" style={{borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                  <span className="text-xs text-gray-600">Wyświetlono {((prodPage-1)*PROD_PAGE)+1}–{Math.min(prodPage*PROD_PAGE, filteredProds.length)} z {filteredProds.length.toLocaleString("pl-PL")}</span>
                  <div className="flex gap-1">
                    <button disabled={prodPage<=1} onClick={()=>setProdPage(p=>p-1)} className="px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-30 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">← Poprzednia</button>
                    <button disabled={prodPage>=totalPages} onClick={()=>setProdPage(p=>p+1)} className="px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-30 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Następna →</button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ════ KATEGORIE ════ */}
          {tab==="categories" && (
            <div>
              <SectionHeader title="Kategorie" count={categories.length} addLabel="Dodaj kategorię" onAdd={()=>window.open("https://mediabud-studio.pages.dev","_blank")}/>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map(cat=>(
                  <Card key={cat.id} className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl" style={{background:"rgba(248,24,40,0.1)",border:"1px solid rgba(248,24,40,0.2)"}}>
                      {(cat as any).icon || "📦"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white truncate">{cat.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{(cat as any).children?.length ?? 0} podkategorii</div>
                    </div>
                    <a href={`/kategoria/${cat.slug}`} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-[#f81828] transition-colors flex-shrink-0"><Eye className="w-4 h-4"/></a>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ════ BLOG ════ */}
          {tab==="blog" && (
            <div>
              <SectionHeader title="Artykuły bloga" count={blogPosts.length} addLabel="Nowy artykuł" onAdd={()=>window.open("https://mediabud-studio.pages.dev","_blank")}/>
              <div className="space-y-3">
                {blogPosts.map((post)=>(
                  <Card key={(post as any).id} className="p-5 flex items-center gap-4">
                    <div className="w-16 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#1a1a1a]">
                      {(post as any).image && <img src={(post as any).image} alt={(post as any).title} className="w-full h-full object-cover"/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{(post as any).title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{(post as any).excerpt}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] text-gray-600">{(post as any).date || (post as any).publishedAt || "—"}</span>
                        <span className="text-[10px] font-bold text-gray-500">{(post as any).readingTime || 5} min czytania</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a href={`/blog/${(post as any).slug}`} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"><Eye className="w-3.5 h-3.5"/></a>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ════ REALIZACJE ════ */}
          {tab==="realizacje" && (
            <div>
              <SectionHeader title="Realizacje" count={REALIZACJE_MOCK.length} addLabel="Dodaj realizację" onAdd={()=>window.open("https://mediabud-studio.pages.dev","_blank")}/>
              <div className="space-y-3">
                {REALIZACJE_MOCK.map(r=>(
                  <Card key={r.id} className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-[#f81828]" style={{background:"rgba(248,24,40,0.1)",border:"1px solid rgba(248,24,40,0.2)"}}>
                      <HardHat className="w-5 h-5"/>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">{r.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{r.client} · {r.year} · <span className="capitalize">{r.category}</span></p>
                    </div>
                    <Badge s={r.status}/>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors ml-2"><Pencil className="w-3.5 h-3.5"/></button>
                  </Card>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-xl text-center" style={{border:"1px dashed rgba(248,24,40,0.3)"}}>
                <p className="text-xs text-gray-500 mb-2">Zarządzaj realizacjami w Sanity Studio</p>
                <a href="https://mediabud-studio.pages.dev" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f81828] hover:underline">
                  Otwórz Sanity Studio <ArrowUpRight className="w-3.5 h-3.5"/>
                </a>
              </div>
            </div>
          )}

          {/* ════ OPINIE ════ */}
          {tab==="opinie" && (
            <div>
              <SectionHeader title="Opinie klientów" count={OPINIE_MOCK.length} addLabel="Dodaj opinię" onAdd={()=>window.open("https://mediabud-studio.pages.dev","_blank")}/>
              <div className="space-y-3">
                {OPINIE_MOCK.map(o=>(
                  <Card key={o.id} className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#f81828]/15 flex items-center justify-center text-[#f81828] font-black text-sm flex-shrink-0">{o.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-bold text-white">{o.name}</p>
                          <p className="text-xs text-gray-500">{o.role} · {o.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {o.featured && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400">Wyróżniona</span>}
                        <Badge s={o.status}/>
                      </div>
                    </div>
                    <div className="flex mt-2 gap-0.5">
                      {Array.from({length:5}).map((_,i)=>(
                        <Star key={i} className={`w-3.5 h-3.5 ${i<o.rating?"text-amber-400":"text-gray-700"}`} fill={i<o.rating?"currentColor":"none"}/>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ════ PROMOCJE ════ */}
          {tab==="promocje" && (
            <div>
              <SectionHeader title="Promocje" count={PROMOCJE_MOCK.length} addLabel="Nowa promocja"/>
              <div className="space-y-3">
                {PROMOCJE_MOCK.map(p=>(
                  <Card key={p.id} className="p-5 flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${p.active?"bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]":"bg-gray-600"}`}/>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">{p.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.dates} · {p.target}</p>
                    </div>
                    <Badge s={p.active?"Aktywna":"Nieaktywna"}/>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
                  </Card>
                ))}
              </div>
              <div className="mt-4 p-6 rounded-xl text-center" style={{border:"1px dashed rgba(255,255,255,0.08)"}}>
                <Megaphone className="w-8 h-8 text-gray-600 mx-auto mb-2"/>
                <p className="text-sm font-bold text-white mb-1">Dodaj nową promocję</p>
                <p className="text-xs text-gray-500 mb-3">Ustaw rabat, baner lub specjalną ofertę widoczną na stronie</p>
                <button className="px-4 py-2 rounded-lg bg-[#f81828] text-white text-xs font-bold hover:bg-[#c8000f] transition-colors">
                  <Plus className="w-3.5 h-3.5 inline mr-1.5"/>Utwórz promocję
                </button>
              </div>
            </div>
          )}

          {/* ════ PRACOWNICY ════ */}
          {tab==="pracownicy" && (
            <div>
              <SectionHeader title="Zespół" count={PRACOWNICY_MOCK.length} addLabel="Dodaj pracownika"/>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PRACOWNICY_MOCK.map(p=>(
                  <Card key={p.id} className="p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#f81828]/15 flex items-center justify-center text-[#f81828] font-black text-sm flex-shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{p.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.role}</p>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded mt-1 inline-block" style={{background:"rgba(248,24,40,0.1)",color:"rgba(248,24,40,0.8)"}}>{p.dept}</span>
                    </div>
                    <button className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors flex-shrink-0"><Pencil className="w-3.5 h-3.5"/></button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ════ USTAWIENIA ════ */}
          {tab==="settings" && (
            <div>
              <SectionHeader title="Ustawienia"/>
              <div className="grid lg:grid-cols-2 gap-4">
                {/* Dane firmy */}
                <Card className="p-6">
                  <p className="text-xs font-black uppercase tracking-wider text-[#f81828] mb-4">Dane firmy</p>
                  <div className="space-y-3">
                    {[["Nazwa firmy","Media Bud – Skład Budowlany"],["NIP","9462743421"],["Adres","ul. Chemiczna 8d, 20-329 Lublin"],].map(([label,val])=>(
                      <div key={label}>
                        <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 mb-1 block">{label}</label>
                        <input defaultValue={val} className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}/>
                      </div>
                    ))}
                    <button className="px-4 py-2 rounded-lg bg-[#f81828] text-white text-xs font-bold hover:bg-[#c8000f] transition-colors mt-2">Zapisz zmiany</button>
                  </div>
                </Card>
                {/* Kontakt */}
                <Card className="p-6">
                  <p className="text-xs font-black uppercase tracking-wider text-[#f81828] mb-4">Kontakt i godziny</p>
                  <div className="space-y-3">
                    {[["Telefon","+48 533 553 344"],["E-mail","sprzedaz@mediabud.pl"],["Pon–Pt","7:00–16:00"],["Sobota","7:00–13:00"],].map(([label,val])=>(
                      <div key={label}>
                        <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 mb-1 block">{label}</label>
                        <input defaultValue={val} className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}/>
                      </div>
                    ))}
                    <button className="px-4 py-2 rounded-lg bg-[#f81828] text-white text-xs font-bold hover:bg-[#c8000f] transition-colors mt-2">Zapisz zmiany</button>
                  </div>
                </Card>
                {/* Integracje */}
                <Card className="p-6 lg:col-span-2">
                  <p className="text-xs font-black uppercase tracking-wider text-[#f81828] mb-4">Integracje i linki zewnętrzne</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      ["Google Analytics 4","Measurement ID","G-XXXXXXXXXX"],
                      ["Web3Forms","Klucz API formularza","xxxxxxxxxxxxxxxx"],
                      ["Facebook Pixel","Pixel ID","000000000000000"],
                      ["Google Business","Link do profilu","https://business.google.com/..."],
                    ].map(([title,label,ph])=>(
                      <div key={title} className="rounded-lg p-4" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)"}}>
                        <p className="text-xs font-bold text-white mb-1">{title}</p>
                        <label className="text-[10px] text-gray-600 mb-1 block">{label}</label>
                        <input placeholder={ph} className="w-full px-3 py-2 rounded-lg text-xs text-white placeholder-gray-700 outline-none" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}/>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 px-4 py-2 rounded-lg bg-[#f81828] text-white text-xs font-bold hover:bg-[#c8000f] transition-colors">Zapisz integracje</button>
                </Card>
                {/* Sanity Studio link */}
                <Card className="p-6 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Sanity Studio — pełny CMS</p>
                      <p className="text-xs text-gray-500 mt-0.5">Zarządzaj produktami, blogiem, realizacjami i ustawieniami przez Sanity</p>
                    </div>
                    <a href="https://mediabud-studio.pages.dev" target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-white/5 transition-colors"
                      style={{border:"1px solid rgba(255,255,255,0.1)"}}>
                      Otwórz Studio <ArrowUpRight className="w-4 h-4 text-[#f81828]"/>
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
