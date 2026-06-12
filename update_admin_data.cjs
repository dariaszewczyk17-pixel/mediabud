const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminPanel.tsx', 'utf8');

// 1. Podpięcie prawdziwych danych dla zakładek Blog i Kategorie
// Zauważyłem, że importy `categories` i `blogPosts` już tam są, ale sprawdzę, czy są używane poprawnie.
// W zakładce "Kategorie" używane jest `categories.map` - to jest OK, bo `categories` pochodzi z `src/data/categories.ts`.
// W zakładce "Blog" używane jest `blogPosts.map` - to też jest OK, bo `blogPosts` pochodzi z `src/data/blog.ts`.

// 2. Dodanie integracji z Sanity dla Realizacji (zamiast mocków)
// Najpierw dodajmy importy i stan dla realizacji z Sanity
content = content.replace(
  'import { products } from "@/data/products";',
  'import { products } from "@/data/products";\nimport { client } from "@/lib/sanity";'
);

content = content.replace(
  'const [sanityProds, setSanityProds] = useState<any[]>([]);',
  `const [sanityProds, setSanityProds] = useState<any[]>([]);
  const [sanityRealizacje, setSanityRealizacje] = useState<any[]>([]);
  const [sanityRealizacjeLoading, setSanityRealizacjeLoading] = useState(false);`
);

// 3. Dodanie useEffect do pobierania realizacji z Sanity
const fetchRealizacjeEffect = `
  useEffect(() => {
    if (tab === "realizacje" && sanityRealizacje.length === 0) {
      setSanityRealizacjeLoading(true);
      client.fetch(\`*[_type == "realizacja"] | order(year desc) {
        _id, title, year, category, client, status
      }\`).then(data => {
        setSanityRealizacje(data);
      }).catch(err => {
        console.error("Błąd pobierania realizacji:", err);
      }).finally(() => {
        setSanityRealizacjeLoading(false);
      });
    }
  }, [tab]);
`;

content = content.replace(
  'useEffect(() => {',
  fetchRealizacjeEffect + '\n  useEffect(() => {'
);

// 4. Zastąpienie REALIZACJE_MOCK przez sanityRealizacje w zakładce "realizacje"
const realizacjeTabUpdate = `
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
                      <a href={\`https://mediabud-studio.pages.dev/desk/realizacja;\${r._id}\`} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/10 transition-colors ml-2"><Pencil className="w-3.5 h-3.5"/></a>
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
`;

content = content.replace(
  /\{\/\* ════ REALIZACJE ════ \*\/\}[\s\S]*?\{\/\* ════ OPINIE ════ \*\/\}/,
  realizacjeTabUpdate + '\n\n          {/* ════ OPINIE ════ */}'
);

fs.writeFileSync('src/pages/AdminPanel.tsx', content);
console.log("AdminPanel.tsx updated with Sanity data integration.");
