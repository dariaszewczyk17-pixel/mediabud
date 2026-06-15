import { useState, useMemo, useEffect, useCallback } from "react";
import {
  BarChart2, Package, Tag, Settings, LogOut, Menu, X, Plus, Pencil,
  Trash2, Mail, Search, Bell, ChevronRight, Star, Eye, Image,
  FileText, Home, Users, Megaphone, HardHat, CheckCircle2,
  Clock, AlertCircle, TrendingUp, ShoppingBag, Phone, Globe,
  ChevronDown, Filter, ArrowUpRight, MoreHorizontal, RefreshCw,
  ArrowUp, ArrowDown, ChevronUp, Upload, GripVertical, Award,
  AlertTriangle, Layers, ImageOff, SlidersHorizontal,
  Download, Check, Square, CheckSquare, FolderTree, Type,
  ExternalLink, Copy,
} from "lucide-react";
import { products } from "@/data/products";
import { sanityClient } from "@/lib/sanity";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";

/* ─── Types ─────────────────────────────────────────────────────── */
type Tab = "dashboard"|"inquiries"|"products"|"categories"|"blog"|"realizacje"|"opinie"|"promocje"|"pracownicy"|"settings";

/* ─── Mock data ─────────────────────────────────────────────────── */
const INITIAL_INQUIRIES = [
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user:"", pass:"" });
  const [loginErr, setLoginErr]   = useState("");
  const [search, setSearch]       = useState("");
  const [prodPage, setProdPage]   = useState(1);
  const [inqFilter, setInqFilter] = useState("Wszystkie");
  const [selectedInq, setSelectedInq] = useState<typeof INITIAL_INQUIRIES[0]|null>(null);
  const [inquiries, setInquiries] = useState<typeof INITIAL_INQUIRIES>(() => {
    const saved = localStorage.getItem("mb_admin_inquiries");
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });
  const [inqNotes, setInqNotes] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem("mb_admin_inq_notes");
    return saved ? JSON.parse(saved) : {};
  });

  
  useEffect(() => {
    if (tab === "realizacje" && sanityRealizacje.length === 0) {
      setSanityRealizacjeLoading(true);
      sanityClient.fetch(`*[_type == "realizacja"] | order(year desc) {
        _id, title, year, category, client, status
      }`).then(data => {
        setSanityRealizacje(data);
      }).catch(err => {
        console.error("Błąd pobierania realizacji:", err);
      }).finally(() => {
        setSanityRealizacjeLoading(false);
      });
    }
  }, [tab]);

  useEffect(() => {
    localStorage.setItem("mb_admin_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem("mb_admin_inq_notes", JSON.stringify(inqNotes));
  }, [inqNotes]);

  const updateInqStatus = (id: number, newStatus: string) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    if (selectedInq && selectedInq.id === id) {
      setSelectedInq(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };
  const PROD_PAGE = 25;

  const CHART_DATA = [
    { name: "01.06", zapytania: 4, wizyty: 120 },
    { name: "02.06", zapytania: 7, wizyty: 150 },
    { name: "03.06", zapytania: 5, wizyty: 180 },
    { name: "04.06", zapytania: 12, wizyty: 250 },
    { name: "05.06", zapytania: 8, wizyty: 210 },
    { name: "06.06", zapytania: 3, wizyty: 140 },
    { name: "07.06", zapytania: 2, wizyty: 110 },
    { name: "08.06", zapytania: 9, wizyty: 280 },
    { name: "09.06", zapytania: 15, wizyty: 320 },
  ];

  const PIE_DATA = [
    { name: "Chemia budowlana", value: 45, color: "#f81828" },
    { name: "Izolacje", value: 30, color: "#3b82f6" },
    { name: "Sucha zabudowa", value: 15, color: "#10b981" },
    { name: "Narzędzia", value: 10, color: "#8b5cf6" },
  ];

  /* ── Products filter (hook must be before early return) ── */
  const filteredProds = useMemo(()=>
    search.trim().length>1
      ? products.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.brand?.toLowerCase().includes(search.toLowerCase()))
      : products
  ,[search]);
  const totalPages = Math.ceil(filteredProds.length/PROD_PAGE);
  const pagedProds = filteredProds.slice((prodPage-1)*PROD_PAGE, prodPage*PROD_PAGE);

  /* ── Inquiries filter (also before early return) ── */
  const filteredInq = inqFilter==="Wszystkie" ? inquiries : inquiries.filter(i=>i.status===inqFilter);

  /* ── Sanity products (real data) ── */
  const [sanityProds,    setSanityProds]    = useState<any[]>([]);
  const [sanityTotal,    setSanityTotal]    = useState(0);
  const [sanityPages,    setSanityPages]    = useState(1);
  const [sanityLoading,  setSanityLoading]  = useState(false);
  const [sanityError,    setSanityError]    = useState("");

  /* ── P1.1 Filtry i sortowanie ── */
  const [filterCat,   setFilterCat]   = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [sortCol,     setSortCol]     = useState<"name"|"brand"|"category">("name");
  const [sortDir,     setSortDir]     = useState<"asc"|"desc">("asc");
  const [showFilters, setShowFilters] = useState(false);

  /* ── P1.1 Meta danych (kategorie, marki, quality) ── */
  const [metaCats,    setMetaCats]    = useState<{slug:string;name:string;count:number}[]>([]);
  const [metaBrands,  setMetaBrands]  = useState<{name:string;count:number}[]>([]);
  const [quality,     setQuality]     = useState<{total:number;noImage:number;noDesc:number;noShort:number;noEan:number;noCat:number}|null>(null);
  const [metaLoaded,  setMetaLoaded]  = useState(false);

  /* ── P1.2 Edycja (slide-over) ── */
  const [editProd,   setEditProd]   = useState<any>(null);
  const [editTab,    setEditTab]    = useState<"basic"|"images"|"specs"|"seo">("basic");
  const [editFields, setEditFields] = useState({ name:"", brand:"", unit:"", ean:"", shortDescription:"", description:"" });
  const [editSaving, setEditSaving] = useState(false);
  const [editMsg,    setEditMsg]    = useState<{type:"ok"|"err"; text:string}|null>(null);

  /* ── P1.4 Parametry techniczne ── */
  const [specs, setSpecs] = useState<{key:string;value:string}[]>([]);

  /* ── P1.3 Upload zdjęć ── */
  const [imgUploading, setImgUploading] = useState(false);
  const [imgMsg,       setImgMsg]       = useState<{type:"ok"|"err";text:string}|null>(null);

  /* ── P2.1 Bulk actions ── */
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const allSelected = sanityProds.length > 0 && sanityProds.every(p => selectedIds.has(p._id));
  const someSelected = selectedIds.size > 0;

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);
  const toggleAll = useCallback(() => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(sanityProds.map(p => p._id)));
  }, [allSelected, sanityProds]);

  /* ── P2.4 Eksport CSV ── */
  const exportCSV = useCallback((items: any[]) => {
    const headers = ["Nazwa","Marka","Kategoria","Jednostka","EAN","Opis krótki","Opis"];
    const rows = items.map(p => [
      p.name||"", p.brand||"", p.category?.name||"", p.unit||"", p.ean||"",
      (p.shortDescription||"").replace(/[\n\r]+/g," "), (p.description||"").replace(/[\n\r]+/g," "),
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF"+csv], { type:"text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `mediabud-produkty-${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }, []);

  /* ── P2.6 Inline edit ── */
  const [inlineEdit, setInlineEdit] = useState<{id:string;field:string;value:string}|null>(null);
  const saveInline = useCallback(async () => {
    if (!inlineEdit) return;
    try {
      const res = await fetch(`/api/product/${inlineEdit.id}`, {
        method:"PATCH", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ [inlineEdit.field]: inlineEdit.value }),
      });
      const data = await res.json();
      if (data.success) {
        setSanityProds(prev => prev.map(p => p._id===inlineEdit.id ? {...p, [inlineEdit.field]:inlineEdit.value} : p));
      }
    } catch {}
    setInlineEdit(null);
  }, [inlineEdit]);

  /* ── Ładuj meta (kategorie, marki, quality) raz po zalogowaniu ── */
  useEffect(() => {
    if (!loggedIn || metaLoaded) return;
    fetch("/api/products-meta")
      .then(r => r.json())
      .then(data => {
        if (!data.error) {
          setMetaCats(data.categories || []);
          setMetaBrands(data.brands || []);
          setQuality(data.quality || null);
          setMetaLoaded(true);
        }
      })
      .catch(() => {});
  }, [loggedIn, metaLoaded]);

  /* ── Ładuj produkty z Sanity gdy tab=products ── */
  useEffect(() => {
    if (!loggedIn || tab !== "products") return;
    setSanityLoading(true);
    setSanityError("");
    const params = new URLSearchParams({
      page: String(prodPage), limit:"25",
      search: search.trim(),
      category: filterCat,
      brand: filterBrand,
      sort: sortCol,
      dir: sortDir,
    });
    fetch(`/api/products?${params}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setSanityError(data.error); return; }
        setSanityProds(data.products  ?? []);
        setSanityTotal(data.pagination?.total ?? 0);
        setSanityPages(data.pagination?.pages ?? 1);
      })
      .catch(e => setSanityError("Błąd połączenia: " + e.message))
      .finally(() => setSanityLoading(false));
  }, [loggedIn, tab, prodPage, search, filterCat, filterBrand, sortCol, sortDir]);

  /* ── Otwórz slide-over edycji ── */
  const openEdit = useCallback((p: any) => {
    setEditProd(p);
    setEditTab("basic");
    setEditFields({ name:p.name||"", brand:p.brand||"", unit:p.unit||"", ean:p.ean||"", shortDescription:p.shortDescription||"", description:p.description||"" });
    setEditMsg(null);
    setImgMsg(null);
    /* Wczytaj specs: zakładamy format {key:string, value:string}[] lub Record<string,string> */
    const rawSpecs = p.specs;
    if (Array.isArray(rawSpecs)) {
      setSpecs(rawSpecs.map((s:any) => ({ key: s.key||s.name||"", value: s.value||"" })));
    } else if (rawSpecs && typeof rawSpecs === "object") {
      setSpecs(Object.entries(rawSpecs).map(([k,v]) => ({ key:k, value:String(v) })));
    } else {
      setSpecs([]);
    }
  }, []);

  /* ── Zapisz edytowany produkt do Sanity ── */
  const saveProduct = useCallback(async () => {
    if (!editProd) return;
    setEditSaving(true);
    setEditMsg(null);
    try {
      const res  = await fetch(`/api/product/${editProd._id}`, {
        method:"PATCH",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(editFields),
      });
      const data = await res.json();
      if (data.success) {
        setEditMsg({ type:"ok", text:"✅ Zapisano pomyślnie w Sanity!" });
        setSanityProds(prev => prev.map(p => p._id===editProd._id ? {...p, ...editFields} : p));
        setTimeout(() => setEditMsg(null), 2500);
      } else {
        setEditMsg({ type:"err", text: data.error || "Błąd zapisu" });
      }
    } catch(e:any) {
      setEditMsg({ type:"err", text:"Błąd sieci: " + e.message });
    }
    setEditSaving(false);
  }, [editProd, editFields]);

  /* ── Zapisz parametry techniczne do Sanity ── */
  const saveSpecs = useCallback(async () => {
    if (!editProd) return;
    setEditSaving(true);
    setEditMsg(null);
    try {
      const specsObj: Record<string,string> = {};
      specs.filter(s => s.key.trim()).forEach(s => { specsObj[s.key.trim()] = s.value; });
      const res = await fetch(`/api/product/${editProd._id}`, {
        method:"PATCH",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ specs: specsObj }),
      });
      const data = await res.json();
      if (data.success) {
        setEditMsg({ type:"ok", text:"✅ Parametry zapisane w Sanity!" });
        setSanityProds(prev => prev.map(p => p._id===editProd._id ? {...p, specs: specsObj} : p));
        setTimeout(() => setEditMsg(null), 2500);
      } else {
        setEditMsg({ type:"err", text: data.error || "Błąd zapisu parametrów" });
      }
    } catch(e:any) {
      setEditMsg({ type:"err", text:"Błąd sieci: " + e.message });
    }
    setEditSaving(false);
  }, [editProd, specs]);

  /* ── Sortowanie ── */
  const toggleSort = useCallback((col: "name"|"brand"|"category") => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
    setProdPage(1);
  }, [sortCol]);

  /* ── Reset filtrów ── */
  const resetFilters = useCallback(() => {
    setFilterCat(""); setFilterBrand(""); setSearch(""); setSortCol("name"); setSortDir("asc"); setProdPage(1);
  }, []);

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
    { id:"inquiries",   icon:<Mail className="w-4 h-4"/>,        label:"Zapytania",    badge: inquiries.filter(i=>i.status==="Nowe").length },
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

  return (
    <div className="min-h-screen flex" style={{background:"#060606",fontFamily:"Inter,sans-serif"}}>

      {/* ── MOBILE OVERLAY BACKDROP ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{background:"rgba(0,0,0,0.65)",backdropFilter:"blur(3px)"}}
          onClick={()=>setMobileOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`flex-shrink-0 flex flex-col transition-all duration-200
          md:static md:translate-x-0
          fixed inset-y-0 left-0 z-50
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${sidebar ? "w-56" : "w-56 md:w-14"}
        `}
        style={{background:"#0a0a0a",borderRight:"1px solid rgba(255,255,255,0.07)",height:"100vh",overflowY:"auto"}}
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
              <button key={it.id} onClick={()=>{setTab(it.id);setMobileOpen(false);}}
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
        <header className="flex items-center gap-3 px-4 md:px-6 py-3.5 flex-shrink-0" style={{background:"#0a0a0a",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          {/* Hamburger — tylko mobile */}
          <button
            className="md:hidden flex-shrink-0 text-gray-500 hover:text-white transition-colors"
            onClick={()=>setMobileOpen(s=>!s)}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5"/>
          </button>
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
                  { label:"Zapytania",     value:inquiries.length,                         icon:<Mail className="w-5 h-5"/>,     color:"#f81828", sub:`${inquiries.filter(i=>i.status==="Nowe").length} nowych` },
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

              
              {/* Wykresy */}
              <div className="grid lg:grid-cols-3 gap-4 mb-6">
                <Card className="p-5 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Ruch i zapytania (ostatnie 9 dni)</h3>
                  </div>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorWizyty" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorZapytania" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f81828" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f81828" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="wizyty" name="Wizyty" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorWizyty)" />
                        <Area type="monotone" dataKey="zapytania" name="Zapytania" stroke="#f81828" strokeWidth={2} fillOpacity={1} fill="url(#colorZapytania)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Popularne kategorie</h3>
                  </div>
                  <div className="h-[200px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={PIE_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {PIE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {PIE_DATA.map(item => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] text-gray-400 truncate">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </Card>
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
                    {inquiries.slice(0,5).map(inq=>(
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
              <SectionHeader title="Zapytania" count={inquiries.length}/>
              {/* Detail modal */}
              {selectedInq && (
                <Card className="mb-5 p-5">
                  
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#f81828] mb-1">Szczegóły zapytania #{selectedInq.id}</p>
                      <h2 className="text-lg font-black text-white">{selectedInq.name}</h2>
                      <p className="text-xs text-gray-500">{selectedInq.company} · {selectedInq.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <select 
                        value={selectedInq.status}
                        onChange={(e) => updateInqStatus(selectedInq.id, e.target.value)}
                        className="bg-[#111] text-xs font-bold text-white px-3 py-1.5 rounded-lg outline-none cursor-pointer"
                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        <option value="Nowe">Nowe</option>
                        <option value="W trakcie">W trakcie</option>
                        <option value="Odpowiedziano">Odpowiedziano</option>
                        <option value="Zamknięte">Zamknięte</option>
                      </select>
                      <button onClick={()=>setSelectedInq(null)} className="text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5"/></button>
                    </div>
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
                  
                  {/* Notatki wewnętrzne */}
                  <div className="rounded-lg px-4 py-3 mb-4" style={{background:"rgba(255,255,255,0.02)",border:"1px dashed rgba(255,255,255,0.1)"}}>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 flex items-center gap-1"><Pencil className="w-3 h-3"/> Notatki wewnętrzne (tylko dla Ciebie)</p>
                    <textarea 
                      value={inqNotes[selectedInq.id] || ""}
                      onChange={(e) => setInqNotes(prev => ({ ...prev, [selectedInq.id]: e.target.value }))}
                      placeholder="Dodaj notatkę do tego zapytania..."
                      className="w-full bg-transparent text-sm text-white outline-none resize-none min-h-[60px] placeholder-gray-700"
                    />
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
                    {f} {f==="Wszystkie" ? `(${inquiries.length})` : `(${inquiries.filter(i=>i.status===f).length})`}
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
              <SectionHeader title="Produkty" count={sanityTotal} addLabel="Dodaj w Sanity" onAdd={()=>window.open("https://mediabud-studio.pages.dev","_blank")}/>

              {/* ── P1.5 Quality Score Dashboard ── */}
              {quality && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                  {[
                    { icon:<ImageOff className="w-4 h-4"/>, label:"Bez zdjęć",    val:quality.noImage, color:"#f81828",   pct: Math.round(quality.noImage/quality.total*100) },
                    { icon:<FileText className="w-4 h-4"/>, label:"Bez opisu",    val:quality.noDesc,  color:"#f59e0b",   pct: Math.round(quality.noDesc/quality.total*100)  },
                    { icon:<AlertTriangle className="w-4 h-4"/>, label:"Bez EAN", val:quality.noEan,   color:"#8b5cf6",   pct: Math.round(quality.noEan/quality.total*100)   },
                    { icon:<Layers className="w-4 h-4"/>,   label:"Bez kategorii",val:quality.noCat,   color:"#06b6d4",   pct: Math.round(quality.noCat/quality.total*100)   },
                  ].map(w=>(
                    <Card key={w.label} className="p-4 flex items-center gap-3 cursor-pointer hover:border-white/15 transition-all" style={{borderColor:"rgba(255,255,255,0.06)"}}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:`${w.color}18`,color:w.color}}>{w.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{w.label}</div>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-xl font-black text-white">{w.val.toLocaleString("pl-PL")}</span>
                          <span className="text-[10px] font-bold" style={{color:w.color}}>{w.pct}%</span>
                        </div>
                        <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.06)"}}>
                          <div className="h-full rounded-full transition-all" style={{width:`${w.pct}%`,background:w.color}}/>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* ── P1.1 Toolbar — wyszukiwanie + filtry ── */}
              <div className="flex gap-2 mb-3 flex-wrap items-center">
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
                <button onClick={()=>setShowFilters(f=>!f)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${showFilters||filterCat||filterBrand?"bg-[#f81828]/15 text-[#f81828] border-[#f81828]/30":"text-gray-400 hover:text-white"}`}
                  style={{border:"1px solid rgba(255,255,255,0.08)"}}>
                  <SlidersHorizontal className="w-3.5 h-3.5"/>
                  Filtry {(filterCat||filterBrand) ? <span className="ml-0.5 w-4 h-4 rounded-full bg-[#f81828] text-white text-[9px] flex items-center justify-center font-black">{[filterCat,filterBrand].filter(Boolean).length}</span> : null}
                </button>
                <button onClick={()=>exportCSV(sanityProds)} title="Eksportuj bieżącą stronę do CSV"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-all"
                  style={{border:"1px solid rgba(255,255,255,0.08)"}}>
                  <Download className="w-3.5 h-3.5"/> CSV
                </button>
                {(filterCat||filterBrand||search) && (
                  <button onClick={resetFilters} className="text-[10px] text-gray-600 hover:text-[#f81828] transition-colors font-bold">✕ Resetuj</button>
                )}
                <div className="ml-auto text-xs text-gray-600 font-bold">
                  {sanityLoading ? "Ładowanie…" : sanityTotal > 0 ? `${sanityTotal.toLocaleString("pl-PL")} produktów` : ""}
                </div>
              </div>

              {/* P2.1 Bulk action bar */}
              {someSelected && (
                <div className="flex items-center gap-3 mb-3 px-4 py-2.5 rounded-xl" style={{background:"rgba(248,24,40,0.08)",border:"1px solid rgba(248,24,40,0.2)"}}>
                  <span className="text-xs font-bold text-white">{selectedIds.size} zaznaczonych</span>
                  <button onClick={()=>{ const items = sanityProds.filter(p=>selectedIds.has(p._id)); exportCSV(items); }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-[#f81828] hover:bg-[#f81828]/15 transition-colors"
                    style={{border:"1px solid rgba(248,24,40,0.3)"}}>
                    <Download className="w-3 h-3"/> Eksportuj zaznaczone
                  </button>
                  <button onClick={()=>setSelectedIds(new Set())} className="ml-auto text-[10px] text-gray-500 hover:text-white font-bold">Odznacz wszystko</button>
                </div>
              )}

              {/* Rozwijane filtry */}
              {showFilters && (
                <div className="flex gap-2 mb-3 flex-wrap p-3 rounded-xl" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)"}}>
                  <div className="flex flex-col gap-1 min-w-[180px]">
                    <label className="text-[9px] text-gray-600 font-black uppercase tracking-wider">Kategoria</label>
                    <select value={filterCat} onChange={e=>{setFilterCat(e.target.value);setProdPage(1);}}
                      className="px-2.5 py-1.5 rounded-lg text-xs text-white outline-none cursor-pointer"
                      style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)"}}>
                      <option value="">Wszystkie kategorie</option>
                      {metaCats.map(c=>(
                        <option key={c.slug} value={c.slug}>{c.name} ({c.count})</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 min-w-[180px]">
                    <label className="text-[9px] text-gray-600 font-black uppercase tracking-wider">Marka</label>
                    <select value={filterBrand} onChange={e=>{setFilterBrand(e.target.value);setProdPage(1);}}
                      className="px-2.5 py-1.5 rounded-lg text-xs text-white outline-none cursor-pointer"
                      style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)"}}>
                      <option value="">Wszystkie marki</option>
                      {metaBrands.filter(b=>b.count>0).map(b=>(
                        <option key={b.name} value={b.name}>{b.name} ({b.count})</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Error */}
              {sanityError && (
                <div className="mb-4 px-4 py-3 rounded-xl text-xs font-bold text-[#f81828]" style={{background:"rgba(248,24,40,0.08)",border:"1px solid rgba(248,24,40,0.2)"}}>
                  ⚠️ {sanityError}
                </div>
              )}

              {/* ── Tabela produktów ── */}
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                      {/* P2.1 Checkbox select-all */}
                      <th className="px-3 py-3 w-8">
                        <button onClick={toggleAll} className="w-4 h-4 flex items-center justify-center rounded text-gray-500 hover:text-white transition-colors">
                          {allSelected ? <CheckSquare className="w-4 h-4 text-[#f81828]"/> : <Square className="w-4 h-4"/>}
                        </button>
                      </th>
                      {/* Sortowalne nagłówki */}
                      {([
                        ["Produkt","name"],["Marka","brand"],["Kategoria","category"],
                      ] as [string,"name"|"brand"|"category"][]).map(([label,col])=>(
                        <th key={col} className="px-4 py-3 text-left">
                          <button onClick={()=>toggleSort(col)} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider transition-colors hover:text-white"
                            style={{color: sortCol===col?"rgba(248,24,40,0.9)":"rgba(156,163,175,1)"}}>
                            {label}
                            {sortCol===col
                              ? (sortDir==="asc" ? <ArrowUp className="w-3 h-3"/> : <ArrowDown className="w-3 h-3"/>)
                              : <span className="w-3 h-3 opacity-20"><ArrowUp className="w-3 h-3"/></span>}
                          </button>
                        </th>
                      ))}
                      <th className="px-4 py-3 text-left text-[10px] font-black text-gray-500 uppercase tracking-wider">Jednostka</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black text-gray-500 uppercase tracking-wider">Jakość</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black text-gray-500 uppercase tracking-wider">Akcje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{borderColor:"rgba(255,255,255,0.04)"}}>
                    {sanityLoading && Array.from({length:8}).map((_,i)=>(
                      <tr key={i}>
                        {[20,200,80,100,50,60,50].map((w,j)=>(
                          <td key={j} className="px-4 py-3">
                            <div className="h-3 rounded animate-pulse" style={{width:`${w}px`,background:"rgba(255,255,255,0.06)"}}/>
                          </td>
                        ))}
                      </tr>
                    ))}
                    {!sanityLoading && sanityProds.map(p=>{
                      const hasImg  = p.images?.length > 0;
                      const hasDesc = p.description?.trim().length > 0;
                      const hasEan  = !!p.ean;
                      const score   = [hasImg, hasDesc, hasEan].filter(Boolean).length;
                      const scoreColor = score===3?"#10b981":score===2?"#f59e0b":"#f81828";
                      const isSelected = selectedIds.has(p._id);
                      return (
                        <tr key={p._id} className={`transition-colors ${isSelected?"bg-[#f81828]/[0.04]":"hover:bg-white/[0.02]"}`}>
                          {/* P2.1 Checkbox */}
                          <td className="px-3 py-2.5 w-8">
                            <button onClick={()=>toggleSelect(p._id)} className="w-4 h-4 flex items-center justify-center rounded transition-colors">
                              {isSelected ? <CheckSquare className="w-4 h-4 text-[#f81828]"/> : <Square className="w-4 h-4 text-gray-600 hover:text-gray-400"/>}
                            </button>
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden" style={{border:"1px solid rgba(255,255,255,0.1)"}}>
                                {hasImg
                                  ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-0.5" onError={e=>{(e.currentTarget as HTMLImageElement).style.display="none";}} loading="lazy"/>
                                  : <Package className="w-4 h-4 text-gray-400"/>}
                              </div>
                              {/* P2.6 Inline edit na nazwie */}
                              {inlineEdit?.id===p._id && inlineEdit.field==="name" ? (
                                <input autoFocus value={inlineEdit.value}
                                  onChange={e=>setInlineEdit({...inlineEdit,value:e.target.value})}
                                  onBlur={saveInline}
                                  onKeyDown={e=>{ if(e.key==="Enter") saveInline(); if(e.key==="Escape") setInlineEdit(null); }}
                                  className="text-xs font-bold text-white bg-transparent outline-none border-b border-[#f81828]/50 max-w-[200px] py-0.5"
                                />
                              ) : (
                                <span className="text-xs font-bold text-gray-300 line-clamp-2 max-w-[200px] cursor-pointer hover:text-white transition-colors"
                                  onDoubleClick={()=>setInlineEdit({id:p._id,field:"name",value:p.name||""})}
                                  title="Kliknij 2× aby edytować">
                                  {p.name}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2.5 text-xs text-gray-500">{p.brand || "—"}</td>
                          <td className="px-4 py-2.5 text-xs text-gray-500">{p.category?.name || "—"}</td>
                          <td className="px-4 py-2.5 text-xs text-gray-500">{p.unit || "—"}</td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-1">
                              {!hasImg  && <span title="Brak zdjęcia" className="text-[#f81828] opacity-70"><ImageOff className="w-3 h-3"/></span>}
                              {!hasDesc && <span title="Brak opisu"   className="text-amber-500 opacity-70"><FileText className="w-3 h-3"/></span>}
                              {!hasEan  && <span title="Brak EAN"     className="text-purple-400 opacity-70"><AlertTriangle className="w-3 h-3"/></span>}
                              <div className="ml-1 flex gap-0.5">
                                {[0,1,2].map(i=>(
                                  <div key={i} className="w-1.5 h-4 rounded-sm" style={{background: i<score ? scoreColor : "rgba(255,255,255,0.08)"}}/>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex gap-1">
                              <button onClick={()=>openEdit(p)}
                                className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors" title="Edytuj">
                                <Pencil className="w-3.5 h-3.5"/>
                              </button>
                              <a href={`/produkt/${p.slug?.current||p.slug}`} target="_blank" rel="noreferrer"
                                className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 transition-colors" title="Podgląd">
                                <Eye className="w-3.5 h-3.5"/>
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {!sanityLoading && sanityProds.length===0 && !sanityError && (
                      <tr><td colSpan={7} className="px-4 py-10 text-center text-xs text-gray-600">Brak produktów spełniających kryteria</td></tr>
                    )}
                  </tbody>
                </table>
                </div>
                <div className="flex items-center justify-between px-5 py-3" style={{borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                  <span className="text-xs text-gray-600">
                    {sanityTotal > 0 ? `${((prodPage-1)*25)+1}–${Math.min(prodPage*25, sanityTotal)} z ${sanityTotal.toLocaleString("pl-PL")}` : ""}
                  </span>
                  <div className="flex gap-1">
                    <button disabled={prodPage<=1||sanityLoading} onClick={()=>setProdPage(p=>p-1)} className="px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-30 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">← Poprzednia</button>
                    <span className="px-3 py-1.5 text-xs text-gray-600 font-bold">{prodPage}/{sanityPages}</span>
                    <button disabled={prodPage>=sanityPages||sanityLoading} onClick={()=>setProdPage(p=>p+1)} className="px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-30 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Następna →</button>
                  </div>
                </div>
              </Card>

              {/* ── P1.2 SLIDE-OVER EDYCJI PRODUKTU ── */}
              {editProd && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-40" style={{background:"rgba(0,0,0,0.6)"}} onClick={()=>setEditProd(null)}/>
                  {/* Panel */}
                  <div className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full max-w-xl" style={{background:"#0c0c0c",borderLeft:"1px solid rgba(255,255,255,0.1)"}}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {editProd.images?.[0]
                            ? <img src={editProd.images[0]} alt={editProd.name} className="w-full h-full object-contain p-0.5"/>
                            : <Package className="w-4 h-4 text-gray-400"/>}
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-sm font-black text-white truncate" style={{fontFamily:"'Rajdhani',sans-serif"}}>EDYTUJ PRODUKT</h2>
                          <p className="text-[11px] text-gray-500 truncate">{editProd.name}</p>
                        </div>
                      </div>
                      <button onClick={()=>setEditProd(null)} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0 ml-3">
                        <X className="w-4 h-4"/>
                      </button>
                    </div>

                    {/* Zakładki */}
                    <div className="flex gap-0.5 px-6 pt-3 flex-shrink-0">
                      {([["basic","Podstawowe"],["images","Zdjęcia"],["specs","Parametry"],["seo","SEO"]] as const).map(([id,label])=>(
                        <button key={id} onClick={()=>setEditTab(id)}
                          className={`px-4 py-2 rounded-t-lg text-xs font-bold transition-all ${editTab===id?"text-white":"text-gray-500 hover:text-gray-300"}`}
                          style={editTab===id?{background:"rgba(255,255,255,0.06)",borderBottom:"2px solid #f81828"}:{borderBottom:"2px solid transparent"}}>
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Komunikat */}
                    {editMsg && (
                      <div className={`mx-6 mt-3 px-4 py-2.5 rounded-lg text-xs font-bold flex-shrink-0 ${editMsg.type==="ok"?"bg-emerald-500/15 text-emerald-400 border border-emerald-500/20":"bg-[#f81828]/10 text-[#f81828] border border-[#f81828]/20"}`}>
                        {editMsg.text}
                      </div>
                    )}

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">

                      {/* ── Zakładka: Podstawowe ── */}
                      {editTab==="basic" && (
                        <div className="space-y-4">
                          {([
                            ["Nazwa produktu","name","text"],["Marka","brand","text"],
                            ["Jednostka (szt / kg / mb / m²)","unit","text"],["EAN / kod kreskowy","ean","text"],
                          ] as const).map(([label,field,type])=>(
                            <div key={field}>
                              <label className="text-[10px] text-gray-500 mb-1.5 block font-bold uppercase tracking-wider">{label}</label>
                              <input type={type} value={(editFields as any)[field]}
                                onChange={e=>setEditFields(f=>({...f,[field]:e.target.value}))}
                                className="w-full px-3 py-2.5 rounded-lg text-xs text-white placeholder-gray-600 outline-none transition-all"
                                style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.10)"}}
                                onFocus={e=>{e.target.style.borderColor="rgba(248,24,40,0.5)";}}
                                onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.10)";}}
                              />
                            </div>
                          ))}
                          <div>
                            <label className="text-[10px] text-gray-500 mb-1.5 block font-bold uppercase tracking-wider">Krótki opis</label>
                            <textarea value={editFields.shortDescription} rows={2}
                              onChange={e=>setEditFields(f=>({...f,shortDescription:e.target.value}))}
                              className="w-full px-3 py-2.5 rounded-lg text-xs text-white placeholder-gray-600 outline-none transition-all resize-none"
                              style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.10)"}}
                              onFocus={e=>{e.target.style.borderColor="rgba(248,24,40,0.5)";}}
                              onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.10)";}}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 mb-1.5 block font-bold uppercase tracking-wider">Długi opis</label>
                            <textarea value={editFields.description} rows={8}
                              onChange={e=>setEditFields(f=>({...f,description:e.target.value}))}
                              className="w-full px-3 py-2.5 rounded-lg text-xs text-white placeholder-gray-600 outline-none transition-all resize-none"
                              style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.10)"}}
                              onFocus={e=>{e.target.style.borderColor="rgba(248,24,40,0.5)";}}
                              onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.10)";}}
                            />
                          </div>
                        </div>
                      )}

                      {/* ── P1.3 Zakładka: Zdjęcia ── */}
                      {editTab==="images" && (
                        <div className="space-y-4">
                          <p className="text-xs text-gray-500">Bieżące zdjęcia produktu. Zarządzanie zdjęciami w pełni przez <a href="https://mediabud-studio.pages.dev" target="_blank" rel="noreferrer" className="text-[#f81828] hover:underline font-bold">Studio Sanity ↗</a></p>
                          {editProd.images && editProd.images.length > 0 ? (
                            <div className="grid grid-cols-3 gap-3">
                              {editProd.images.map((url:string, i:number)=>(
                                <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-white" style={{border:"1px solid rgba(255,255,255,0.08)"}}>
                                  <img src={url} alt={`Zdjęcie ${i+1}`} className="w-full h-full object-contain p-1.5" loading="lazy"/>
                                  <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black text-white" style={{background:"rgba(0,0,0,0.65)"}}>
                                    {i+1}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-12 rounded-xl gap-3" style={{border:"2px dashed rgba(255,255,255,0.1)"}}>
                              <ImageOff className="w-8 h-8 text-gray-700"/>
                              <p className="text-xs text-gray-600 font-bold">Brak zdjęć dla tego produktu</p>
                            </div>
                          )}
                          {imgMsg && (
                            <div className={`px-4 py-2.5 rounded-lg text-xs font-bold ${imgMsg.type==="ok"?"bg-emerald-500/15 text-emerald-400 border border-emerald-500/20":"bg-[#f81828]/10 text-[#f81828] border border-[#f81828]/20"}`}>
                              {imgMsg.text}
                            </div>
                          )}
                          <a href={`https://mediabud-studio.pages.dev/desk/product;${editProd._id}`} target="_blank" rel="noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            style={{border:"1px solid rgba(255,255,255,0.1)"}}>
                            <Upload className="w-3.5 h-3.5"/> Zarządzaj zdjęciami w Sanity Studio
                          </a>
                        </div>
                      )}

                      {/* ── P1.4 Zakładka: Parametry techniczne ── */}
                      {editTab==="specs" && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-gray-500">Parametry techniczne (klucz → wartość)</p>
                            <button onClick={()=>setSpecs(s=>[...s,{key:"",value:""}])}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-[#f81828] hover:bg-[#f81828]/10 transition-colors"
                              style={{border:"1px solid rgba(248,24,40,0.3)"}}>
                              <Plus className="w-3 h-3"/> Dodaj parametr
                            </button>
                          </div>
                          {specs.length === 0 && (
                            <div className="text-center py-8 text-xs text-gray-600">Brak parametrów. Dodaj pierwszy klawiszem powyżej.</div>
                          )}
                          {specs.map((spec,i)=>(
                            <div key={i} className="flex gap-2 items-center">
                              <GripVertical className="w-3.5 h-3.5 text-gray-700 flex-shrink-0"/>
                              <input value={spec.key} placeholder="Parametr (np. Grubość)"
                                onChange={e=>setSpecs(s=>s.map((x,j)=>j===i?{...x,key:e.target.value}:x))}
                                className="flex-1 px-2.5 py-2 rounded-lg text-xs text-white placeholder-gray-700 outline-none"
                                style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)"}}
                                onFocus={e=>e.target.style.borderColor="rgba(248,24,40,0.4)"}
                                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"}
                              />
                              <input value={spec.value} placeholder="Wartość (np. 10 cm)"
                                onChange={e=>setSpecs(s=>s.map((x,j)=>j===i?{...x,value:e.target.value}:x))}
                                className="flex-1 px-2.5 py-2 rounded-lg text-xs text-white placeholder-gray-700 outline-none"
                                style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)"}}
                                onFocus={e=>e.target.style.borderColor="rgba(248,24,40,0.4)"}
                                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"}
                              />
                              <button onClick={()=>setSpecs(s=>s.filter((_,j)=>j!==i))}
                                className="w-7 h-7 flex items-center justify-center rounded text-gray-600 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors flex-shrink-0">
                                <Trash2 className="w-3.5 h-3.5"/>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* ── P2.3 Zakładka: SEO Preview ── */}
                      {editTab==="seo" && editProd && (
                        <div className="space-y-5">
                          <p className="text-xs text-gray-500">Podgląd jak produkt wygląda w wynikach Google</p>
                          {/* Google snippet preview */}
                          <div className="rounded-xl p-5 space-y-1" style={{background:"#fff"}}>
                            <p className="text-[13px] text-[#1a0dab] font-medium truncate" style={{fontFamily:"Arial,sans-serif"}}>
                              {editFields.name || editProd.name || "Nazwa produktu"} — Media Bud
                            </p>
                            <p className="text-[11px] text-[#006621] truncate" style={{fontFamily:"Arial,sans-serif"}}>
                              mediabud.pl › produkt › {editProd.slug?.current || editProd.slug || "slug"}
                            </p>
                            <p className="text-[12px] text-[#545454] line-clamp-2" style={{fontFamily:"Arial,sans-serif"}}>
                              {editFields.shortDescription || editProd.shortDescription || editFields.description?.slice(0,160) || "Brak opisu — dodaj krótki opis produktu aby poprawić SEO."}
                            </p>
                          </div>

                          {/* Analiza SEO */}
                          <div className="space-y-2">
                            <p className="text-[10px] text-gray-600 font-black uppercase tracking-wider">Analiza SEO</p>
                            {[
                              { ok: (editFields.name||"").length >= 10 && (editFields.name||"").length <= 70, label:"Tytuł", hint: `${(editFields.name||"").length}/70 znaków — optymalnie 30–70` },
                              { ok: (editFields.shortDescription||"").length >= 50, label:"Krótki opis (meta description)", hint: `${(editFields.shortDescription||"").length}/160 znaków — min. 50` },
                              { ok: (editFields.description||"").length >= 100, label:"Długi opis", hint: `${(editFields.description||"").length} znaków — min. 100 dla SEO` },
                              { ok: !!editFields.ean, label:"EAN / kod kreskowy", hint: editFields.ean ? "✓ Wypełniony" : "Brak — ważny dla Google Shopping" },
                              { ok: editProd.images?.length > 0, label:"Zdjęcia", hint: editProd.images?.length > 0 ? `${editProd.images.length} zdjęć` : "Brak — krytyczne dla konwersji" },
                            ].map(item=>(
                              <div key={item.label} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)"}}>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.ok?"bg-emerald-500/20 text-emerald-400":"bg-amber-500/20 text-amber-400"}`}>
                                  {item.ok ? <Check className="w-3 h-3"/> : <AlertTriangle className="w-3 h-3"/>}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs font-bold text-white">{item.label}</span>
                                  <span className="text-[10px] text-gray-500 ml-2">{item.hint}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* URL */}
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
                            <ExternalLink className="w-3.5 h-3.5 text-gray-600 flex-shrink-0"/>
                            <span className="text-[11px] text-gray-400 truncate">mediabud.pl/produkt/{editProd.slug?.current || editProd.slug || "—"}</span>
                            <button onClick={()=>navigator.clipboard.writeText(`https://mediabud.pl/produkt/${editProd.slug?.current||editProd.slug||""}`)}
                              className="ml-auto text-gray-600 hover:text-white transition-colors flex-shrink-0" title="Kopiuj URL">
                              <Copy className="w-3 h-3"/>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 px-6 py-4 justify-end flex-shrink-0" style={{borderTop:"1px solid rgba(255,255,255,0.07)"}}>
                      <button onClick={()=>setEditProd(null)} className="px-4 py-2 rounded-lg text-xs font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-colors">Zamknij</button>
                      {editTab === "specs" ? (
                        <button onClick={saveSpecs} disabled={editSaving}
                          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#f81828] text-white text-xs font-bold hover:bg-[#c8000f] disabled:opacity-50 transition-colors">
                          {editSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin"/> : <CheckCircle2 className="w-3.5 h-3.5"/>}
                          {editSaving ? "Zapisuję…" : "Zapisz parametry"}
                        </button>
                      ) : editTab === "basic" ? (
                        <button onClick={saveProduct} disabled={editSaving}
                          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#f81828] text-white text-xs font-bold hover:bg-[#c8000f] disabled:opacity-50 transition-colors">
                          {editSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin"/> : <CheckCircle2 className="w-3.5 h-3.5"/>}
                          {editSaving ? "Zapisuję…" : "Zapisz w Sanity"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ════ KATEGORIE ════ */}
          {tab==="categories" && (
            <div>
              <SectionHeader title="Kategorie" count={metaCats.length > 0 ? metaCats.length : categories.length} addLabel="Dodaj kategorię" onAdd={()=>window.open("https://mediabud-studio.pages.dev","_blank")}/>
              {/* P2.5 Drzewo kategorii z Sanity z liczbą produktów */}
              {metaCats.length > 0 ? (
                <div className="space-y-2">
                  {metaCats.map(cat=>(
                    <Card key={cat.slug} className="p-4 flex items-center gap-3 hover:border-white/10 transition-all cursor-pointer"
                      onClick={()=>{setTab("products" as Tab);setFilterCat(cat.slug);setShowFilters(true);setProdPage(1);}}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:"rgba(248,24,40,0.1)",border:"1px solid rgba(248,24,40,0.2)"}}>
                        <FolderTree className="w-4 h-4 text-[#f81828]"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white truncate">{cat.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{cat.count.toLocaleString("pl-PL")} produktów</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{background:"rgba(248,24,40,0.1)",color:"#f81828"}}>{cat.count}</span>
                        <a href={`/kategoria/${cat.slug}`} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-[#f81828] transition-colors"
                          onClick={e=>e.stopPropagation()}>
                          <Eye className="w-4 h-4"/>
                        </a>
                      </div>
                    </Card>
                  ))}
                  <div className="mt-3 text-center">
                    <p className="text-[10px] text-gray-600">Kliknij kategorię aby zobaczyć jej produkty w zakładce Produkty</p>
                  </div>
                </div>
              ) : (
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
              )}
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
              <SectionHeader title="Realizacje" count={sanityRealizacje.length > 0 ? sanityRealizacje.length : REALIZACJE_MOCK.length} addLabel="Dodaj realizację" onAdd={()=>window.open("https://mediabud-studio.pages.dev","_blank")}/>
              <div className="space-y-3">
                {sanityRealizacjeLoading ? (
                  Array.from({length: 3}).map((_, i) => (
                    <Card key={i} className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 animate-pulse flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-4 w-1/3 bg-white/5 rounded animate-pulse mb-2" />
                        <div className="h-3 w-1/4 bg-white/5 rounded animate-pulse" />
                      </div>
                    </Card>
                  ))
                ) : sanityRealizacje.length > 0 ? (
                  sanityRealizacje.map(r=>(
                    <Card key={r._id} className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-[#f81828]" style={{background:"rgba(248,24,40,0.1)",border:"1px solid rgba(248,24,40,0.2)"}}>
                        <HardHat className="w-5 h-5"/>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{r.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{r.client || "Brak klienta"} · {r.year || "Brak roku"} · <span className="capitalize">{r.category || "Brak kategorii"}</span></p>
                      </div>
                      <Badge s={r.status === "published" ? "Opublikowana" : "Szkic"}/>
                      <a href={`https://mediabud-studio.pages.dev/desk/realizacja;${r._id}`} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors ml-2"><Pencil className="w-3.5 h-3.5"/></a>
                    </Card>
                  ))
                ) : (
                  REALIZACJE_MOCK.map(r=>(
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
                  ))
                )}
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
