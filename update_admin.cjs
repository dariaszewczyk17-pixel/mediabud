const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminPanel.tsx', 'utf8');

// 1. Dodanie importów dla Recharts
content = content.replace(
  'import { products } from "@/data/products";',
  'import { products } from "@/data/products";\nimport { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";'
);

// 2. Zmiana INQUIRIES na stan z localStorage
content = content.replace(
  'const INQUIRIES = [',
  'const INITIAL_INQUIRIES = ['
);

content = content.replace(
  'const [selectedInq, setSelectedInq] = useState<typeof INQUIRIES[0]|null>(null);',
  `const [selectedInq, setSelectedInq] = useState<typeof INITIAL_INQUIRIES[0]|null>(null);
  const [inquiries, setInquiries] = useState<typeof INITIAL_INQUIRIES>(() => {
    const saved = localStorage.getItem("mb_admin_inquiries");
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });
  const [inqNotes, setInqNotes] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem("mb_admin_inq_notes");
    return saved ? JSON.parse(saved) : {};
  });

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
  };`
);

// 3. Zastąpienie INQUIRIES przez inquiries w kodzie
content = content.replace(/INQUIRIES\.length/g, 'inquiries.length');
content = content.replace(/INQUIRIES\.filter/g, 'inquiries.filter');
content = content.replace(/INQUIRIES\.slice/g, 'inquiries.slice');
content = content.replace(/INQUIRIES\.map/g, 'inquiries.map');

// 4. Dodanie danych do wykresów
content = content.replace(
  'const PROD_PAGE = 25;',
  `const PROD_PAGE = 25;

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
  ];`
);

// 5. Dodanie wykresów do Dashboardu
const dashboardCharts = `
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
                            <Cell key={\`cell-\${index}\`} fill={entry.color} />
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
`;

content = content.replace(
  '<div className="grid lg:grid-cols-[1fr_340px] gap-4">',
  dashboardCharts + '\n              <div className="grid lg:grid-cols-[1fr_340px] gap-4">'
);

// 6. Rozbudowa modala zapytań (Mini-CRM)
const inqModalUpdate = `
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
                      <a href={\`tel:\${selectedInq.phone}\`} className="text-sm font-bold text-[#f81828] hover:underline">{selectedInq.phone}</a>
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
`;

content = content.replace(
  /<div className="flex items-start justify-between mb-4">[\s\S]*?<div className="rounded-lg px-4 py-3 mb-4" style={{background:"rgba\(255,255,255,0\.03\)",border:"1px solid rgba\(255,255,255,0\.06\)"}}>\s*<p className="text-\[10px\] text-gray-600 font-bold uppercase mb-1">Treść wiadomości<\/p>\s*<p className="text-sm text-gray-300 leading-relaxed">{selectedInq\.msg}<\/p>\s*<\/div>/,
  inqModalUpdate
);

fs.writeFileSync('src/pages/AdminPanel.tsx', content);
console.log("AdminPanel.tsx updated successfully.");
