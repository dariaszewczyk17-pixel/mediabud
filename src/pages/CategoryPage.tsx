import { useParams, Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight, Grid, List, Filter, SlidersHorizontal, X,
  ChevronLeft, ChevronRight as ChevronNext, Tag, Zap, ArrowRight, Phone, Mail
} from "lucide-react";
import { getCategoryBySlug, getBreadcrumbs, categories as staticCategories } from "@/data/categories";
import { products as staticProducts } from "@/data/products";
import { useCategoryBySlug, useAllCategories, useProductMetaByCategorySlugs, type ProductMeta } from "@/hooks/useSanityData";
import { useSEO } from "@/hooks/useSEO";
import {
  sanityCategoryToLegacy,
  buildBreadcrumbs as buildSanityBreadcrumbs, collectAllSlugs,
  type SanityCategory,
} from "@/lib/adapters";
import { mergeProductCollections } from "@/lib/productMerge";
import { prefetchSanity } from "@/lib/sanity";
import { PRODUCT_META_BY_CATEGORY_SLUGS_QUERY } from "@/lib/queries";
import { ProductCard } from "@/components/Commerce";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo, useCallback, useEffect } from "react";

const PRODUCTS_PER_PAGE = 12;

/* Callback-ref reveal — działa nawet gdy element pojawia się po załadowaniu danych */
function useReveal() {
  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [vis, setVis] = useState(prefersReduced);
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node || vis) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(node);
  }, [vis]);
  return { ref, vis };
}

/* ── FAQ per kategoria (JSON-LD FAQPage + widoczna sekcja) ─────────────────── */
const CATEGORY_FAQS: Record<string, { q: string; a: string }[]> = {
  "chemia-budowlana": [
    { q: "Jaka jest różnica między tynkiem silikonowym a akrylowym?", a: "Tynk silikonowy jest bardziej paroprzepuszczalny, elastyczny i odporny na zabrudzenia — idealny na elewacje. Tynk akrylowy jest tańszy i łatwiejszy w aplikacji, ale mniej odporny na UV i glony. W Lublinie przy wilgotnym klimacie rekomendujemy silikonowy." },
    { q: "Ile kleju do styropianu potrzebuję na 1 m²?", a: "Standardowe zużycie kleju do styropianu EPS (np. Weber.therm Extra, Ceresit CT 85) wynosi 4–6 kg/m² przy metodzie obwodowo-punktowej lub 5–8 kg/m² przy aplikacji grzebykowej. Dokładne zużycie podaje producent na etykiecie opakowania." },
    { q: "Czym różni się grunt głęboko penetrujący od universalnego?", a: "Grunt głęboko penetrujący wnika w porowate i pylące podłoża (beton komórkowy, cegła), wzmacnia i wiąże luźne cząstki. Grunt universalny poprawia przyczepność na gładkich podłożach. Wybór zależy od chłonności i rodzaju podłoża." },
    { q: "Jak dobrać fugę do płytek — cementową czy epoksydową?", a: "Fuga cementowa (np. Ceresit CE 33, Mapei Ultracolor) wystarczy do większości zastosowań w domu. Fuga epoksydowa polecana jest do miejsc narażonych na chemikalia, tłuszcze i zabrudzenia (basen, garaż, kuchnia przemysłowa) — jest droższa, ale praktycznie nieporowata." },
    { q: "Czy zaprawę murarską można stosować w zimie?", a: "Standardowe zaprawy murarskie wymagają temperatury powyżej +5°C podczas aplikacji i przez 24h po. Do prac zimowych stosuje się specjalne zaprawy mrozoodporne (np. Atlas Mur AM 50 zimowy) lub dodaje plastyfikatory. Poniżej 0°C prace murarskie są niezalecane." },
  ],
  "dachy": [
    { q: "Jaka papa jest najlepsza na dach płaski?", a: "Na dachy płaskie polecamy papy termozgrzewalne podkładowe i wierzchniego krycia (np. Icopal Polbit, Sopro, Sika). Papa SBS (elastomerobitumiczna) jest bardziej elastyczna i mrozoodporna niż APP. Dla pełnej szczelności stosuje się system dwuwarstwowy: papa podkładowa + papa nawierzchniowa." },
    { q: "Ile kosztuje wymiana pokrycia dachowego na 100 m²?", a: "Sam materiał do wymiany pokrycia na 100 m² to koszt od 3 000 zł (papa podwójna) przez 8 000–15 000 zł (blachodachówka, dachówka betonowa) do 20 000–30 000 zł+ (dachówka ceramiczna, blacha na rąbek). W Media Bud dobieramy materiały do budżetu i pomożemy wyliczyć ilości." },
    { q: "Jaka folia dachowa jest potrzebna pod blachodachówkę?", a: "Pod blachodachówkę stosuje się folię dachową niskoopojemnościową (wstępne krycie, MSD) lub membrany dachowe wysokodyfuzyjne (Nexler, Fakro). Membrana wysokodyfuzyjna umożliwia układanie bezpośrednio na krokwiach bez szczeliny wentylacyjnej poniżej." },
    { q: "Jak wybrać okno dachowe — Fakro czy Velux?", a: "Oba producentów oferują porównywalną jakość. Fakro (polska marka) często jest nieco tańsze przy zbliżonych parametrach. Velux ma bogatszy wybór dodatków i rolet. Ważne: dobieramy rozmiar do kąta nachylenia dachu — minimalne nachylenie to zazwyczaj 15°." },
    { q: "Co to jest dyfuzja wodna w membranie dachowej i dlaczego jest ważna?", a: "Dyfuzja wodna (Sd — ekwiwalentna grubość powietrza) określa jak łatwo para wodna przenika przez membranę. Niskie Sd (< 0,02 m) oznacza membranę wysoce paroprzepuszczalną, która odprowadza wilgoć z warstwy ocieplenia — kluczowe dla trwałości izolacji i drewnianych elementów dachu." },
  ],
  "farby-i-rozpuszczalniki": [
    { q: "Jaka farba elewacyjna jest najlepsza na styropian?", a: "Na styropian (system ETICS) stosuje się wyłącznie farby silikonowe (np. Baumit SilikonTop, Weber.ton Sil), silikatowe lub akrylowe niepęczniejące — bez agresywnych rozpuszczalników. Farby silikonowe mają najlepszą paroprzepuszczalność i samooczyszczanie. Przed malowaniem obowiązkowo grunt." },
    { q: "Ile farby lateksowej potrzebuję na pokrycie 30 m² ściany?", a: "Wydajność farby lateksowej wynosi zazwyczaj 8–12 m²/l na jedno krycie. Ściany wymagają 2 warstw: pierwsza cieńsza (z rozcieńczeniem 10%), druga kryjąca. Na 30 m² potrzeba ok. 5–8 litrów farby. Ciemne kolory mogą wymagać 3 warstw." },
    { q: "Czym się różni farba lateksowa od akrylowej?", a: "Farba lateksowa to podtyp farby akrylowej — obie zawierają spoiwa akrylowe w dyspersji wodnej. Potocznie 'lateksowa' oznacza farby do wnętrz (zmywalne, elastyczne), 'akrylowa elewacyjna' to fabryczna dyspersja do zewnętrz z dodatkami odporności na warunki atmosferyczne." },
    { q: "Jak prawidłowo rozcieńczyć farbę i czy zawsze trzeba to robić?", a: "Pierwsza warstwa (gruntująca) rozcieńczana jest o 10–20% wodą lub dedykowanym rozcieńczalnikiem. Kolejne warstwy kryjące stosuje się zazwyczaj bez rozcieńczania. Nadmierne rozcieńczanie obniża krycie i trwałość powłoki. Zawsze sprawdź kartę techniczną produktu." },
  ],
  "izolacje": [
    { q: "Jaki styropian wybrać do ocieplenia ścian zewnętrznych?", a: "Do ocieplenia ścian metodą ETICS (lekka mokra) stosuje się styropian fasadowy EPS 70 lub EPS 80 (np. Swisspor Lambda, Yetico, Styropmin). Grubość minimum 15 cm dla nowych budynków zgodnie z WT 2021. Współczynnik lambda ≤ 0,036 W/(m·K) gwarantuje lepszy efekt cieplny." },
    { q: "Wełna mineralna czy styropian — co lepsze do ocieplenia domu?", a: "Styropian EPS jest tańszy i łatwiejszy w montażu, wystarczy do większości ścian. Wełna mineralna (Rockwool, Isover, URSA) jest paroprzepuszczalna, niepalna (klasa A1/A2) i ma lepszą izolację akustyczną — polecana na ściany piwnic, stropy, dachy i budynki wyższe niż 25m (warunek p-poż)." },
    { q: "Jak ocieplić poddasze — styropian między krokwiami czy wełna?", a: "Na poddasze użytkowe stosuje się wełnę mineralną (np. Rockwool Rockmin Plus) układaną w 2 warstwach: między krokwiami + pod krokwiami (eliminacja mostków). Łączna grubość minimum 25–30 cm. Pod wełną od strony ciepłej obowiązkowo folia paroizolacyjna." },
    { q: "Ile cm izolacji potrzebuję na podłogę na gruncie?", a: "Zgodnie z WT 2021 izolacja podłogi na gruncie powinna mieć U ≤ 0,30 W/(m²·K). Osiąga to styropian EPS 100 o grubości minimum 12–15 cm lub XPS 10–12 cm. Pod ogrzewanie podłogowe rekomendujemy styropian o odporności na ściskanie min. CS(10)100 (EPS 100)." },
    { q: "Co to jest XPS i kiedy stosować go zamiast EPS?", a: "XPS (polistyren ekstrudowany, np. Ravatherm, Nexler, URSA XPS) ma zamkniętą strukturę komórek — nie nasiąka wodą (chłonność < 0,3%). Stosuj XPS wszędzie tam, gdzie izolacja kontaktuje się z wilgocią: ławy fundamentowe, ściana zewnętrzna poniżej terenu, dach odwrócony, taras." },
  ],
  "narzedzia-i-mocowania": [
    { q: "Jakie kołki rozporowe wybrać do styropianu EPS?", a: "Do mocowania styropianu w systemach ETICS stosuje się kołki teleskopowe z tworzywowymi talerzami lub kołki z wbijanym trzpieniem stalowym. Zalecana liczba kołków to 6 szt./m² (naroża i krawędzie 8 szt./m²). Odpowiednie kołki to np. Ejot STR, Rawplug R-TK, Fischer Etics." },
    { q: "Czym wiercić w betonie i jakie narzędzia są potrzebne?", a: "Do wiercenia w betonie i żelbecie potrzebna jest wiertarka udarowa lub młotowiertarka (SDS-plus/SDS-max) z wiertłem do betonu. Do mocowań konstrukcyjnych (belki, schody) stosuje się młotowiertarki SDS-max z wiertłami od 16mm. Kołki rozporowe chemiczne (np. Hilti HIT, Fischer FIS) do obciążonych punktów." },
    { q: "Jakie są rodzaje taśm budowlanych i do czego służą?", a: "Taśmy paroizolacyjne uszczelniają złącza folii na poddaszach. Taśmy rozprężne (kompribandy) uszczelniają przylgnie okienne. Taśmy klejące jednostronne/dwustronne służą do montażu. Siatka zbrojąca na taśmie używana jest w krawędziach tynków. Każda ma inny zakres temperatur i klejenia." },
  ],
  "plytki": [
    { q: "Jak obliczyć ile płytek ceramicznych potrzebuję na łazienkę 8 m²?", a: "Do obliczenia: zmierz osobno powierzchnię podłogi i ścian, dodaj 10–15% zapas na docinki i ewentualne stłuczenia. Na 8 m² podłogi potrzebujesz ok. 9–9,5 m² płytek. Duże formaty (60×60, 80×80) generują więcej odpadów — dodaj 15–20%. Zamów całą partię naraz (ten sam numer produkcyjny = jednolity kolor)." },
    { q: "Jaki klej wybrać do płytek wielkoformatowych (60×120 i większe)?", a: "Płytki wielkoformatowe wymagają kleju odkształcalnego klasy C2 lub C2S1/C2S2 (np. Ceresit CM 17, Mapei Ultraflex, Weber.set speed). Aplikacja metodą back-buttering (klejenie obu stron: podłoże + płytka). Minimalne pokrycie powierzchni: 95% w mokrych pomieszczeniach, 80% w suchych." },
    { q: "Jak wybrać grubość fugi do płytek podłogowych?", a: "Grubość spoiny zależy od formatu płytki i rektyfikacji. Płytki rektyfikowane: 1,5–2 mm. Płytki nierektyfikowane: 3–5 mm. Podłogi: minimum 3 mm dla lepszego rozkładu obciążeń. Nigdy nie fuguj wcześniej niż 24h po układaniu płytek (klej musi wyschnąć)." },
    { q: "Czy płytki gresowe nadają się na zewnątrz i jak je wybrać?", a: "Na zewnątrz stosuje się gres mrozoodporny o nasiąkliwości < 0,5% (norma PN-EN 14411, klasa E ≤ 0,5%). Sprawdź klasę antypoślizgowości: R10 (pochylnie, tarasy) lub R11 (schody zewnętrzne). Format: mniejsze płytki (30×30, 40×40) z większą ilością fug mają lepszą przyczepność w deszczu." },
  ],
  "stropy-i-sciany": [
    { q: "Jakie bloczki z betonu komórkowego wybrać do budowy ściany nośnej?", a: "Do ścian nośnych stosuje się beton komórkowy klasy min. 600 (np. Solbet S600, Ytong PP4/0,6, Xella YTONG). Do ścian dwuwarstwowych i partycji wystarczy klasa 400–500. Grubość ściany nośnej zależy od projektu — zazwyczaj 24–36 cm. Dla lepszej izolacji wybierz bloczki grubości 36–48 cm z lambda ≤ 0,12." },
    { q: "Czym się różni strop Teriva od Filigran?", a: "Strop Teriva (belkowo-pustakowy) montuje się na budowie z belek prefabrykowanych i pustaków ceramicznych lub styropianowych, a następnie zalewa beton. Filigran to płyta sprężona z żelbetu prefabrykowana w zakładzie, transportowana i układana dźwigiem. Filigran ma wyższą nośność i krótszy czas montażu." },
    { q: "Jak dobrać grubość ściany murowej dla dobrej izolacji termicznej?", a: "Zgodnie z WT 2021 ściana zewnętrzna musi mieć U ≤ 0,20 W/(m²·K). Ściana z bloczków silikatowych 24 cm sama w sobie nie spełnia tego wymogu — wymaga ocieplenia. Beton komórkowy 36 cm (lambda 0,09) osiąga U ≈ 0,24 — wymaga dodatkowej izolacji. Zawsze projektuj system: mur + ocieplenie." },
  ],
  "sucha-zabudowa": [
    { q: "Jaka grubość płyty GK do ścianki działowej?", a: "Do standardowych ścianek działowych stosuje się płytę GK 12,5 mm (Knauf, Rigips) na profilach metalowych CW/UW 75 lub 100 mm. Jedna warstwa na każdej stronie to minimum, dwie warstwy płyt (25 mm łącznie) poprawiają izolację akustyczną i odporność ogniową (EI 60). Do łazienek — płyta impregnowana GKB (zielona)." },
    { q: "Ile profili metalowych potrzebuję na 10 m² ścianki GK?", a: "Na 10 m² ścianki: profile pionowe CW co 60 cm = ok. 4–5 szt. po 2,6–3 m. Profile poziome UW pod sufit i podłogę: 2× długość ścianki (np. 4 m = 2×4 = 8 mb UW). Krawędziaki, kliny i wkręty dobierane wg liczby profili. Dokładny materiał wylicza Media Bud po podaniu wymiarów." },
    { q: "Knauf czy Rigips — która płyta GK jest lepsza?", a: "Obie marki oferują porównywalną jakość i spełniają normy EN 520. Knauf ma nieco bogatszą ofertę grubości i specjalnych płyt (akustyczne, ogniochronne). Rigips (Saint-Gobain) jest liderem w segmencie profesjonalnym w Polsce. Wybór często zależy od dostępności i preferencji ekipy. W Media Bud dostępne są obie marki." },
    { q: "Jak zamontować konstrukcję pod sufit podwieszany GK?", a: "System sufitu GK: profil przyścienny (UA 30) wokół obrysu + wieszaki bezpośrednie lub na drutach do stropu co 60–80 cm + profile nośne CD 60 co 50 cm w jednej osi + profile poprzeczne CD 60 co 50 cm prostopadle. Płyty GK 12,5 mm mocowane wkrętami TN 3,5×25 co 17 cm." },
  ],
  "sufity-podwieszane": [
    { q: "Jaka jest różnica między sufitem podwieszanym systemowym a GK?", a: "Sufit systemowy (np. Ecophon, Rockfon, OWA) to demontowalne płyty mineralne lub metalowe na widocznej/ukrytej konstrukcji — idealny do biur, hal i obiektów użyteczności publicznej (łatwy dostęp do instalacji). Sufit GK (karton-gips) jest trwały, gładki, bezspoinowy i malowany — dominuje w budownictwie mieszkaniowym." },
    { q: "Jak poprawić akustykę w pokoju sufitem podwieszanym?", a: "Sufit podwieszany z płyt akustycznych pochłaniających (np. Ecophon Master Ds, Rockfon Sonar) redukuje pogłos (alpha w = 0,7–1,0). Między stropem a sufitem warto ułożyć wełnę mineralną gr. 5 cm. W połączeniu z podwójną płytą GK na ścianach możliwe są bardzo niskie poziomy głośności w pomieszczeniu." },
    { q: "Ile kosztuje sufit podwieszany GK na 15 m²?", a: "Koszt sufitu GK na 15 m²: profil CD + UW ≈ 150–250 zł, płyty GK 12,5 mm ≈ 100–180 zł, wkręty/wieszaki ≈ 50–80 zł, masa szpachlowa + taśma ≈ 50–100 zł. Łącznie materiały: ok. 350–600 zł. Robocizna (montaż + szpachlowanie) dodaje 40–70 zł/m², czyli 600–1050 zł. Łączny koszt: ok. 1000–1600 zł." },
  ],
};

const catImages: Record<string, string> = {
  "chemia-budowlana": "/images/cat-chemia_2.png",
  "dachy": "/images/cat-dachy_2.png",
  "farby-i-rozpuszczalniki": "/images/cat-farby_2.png",
  "izolacje": "/images/cat-ocieplenia_2.png",
  "narzedzia-i-mocowania": "/images/cat-narzedzia_2.png",
  "plytki": "/images/cat-plytki_2.png",
  "stropy-i-sciany": "/images/cat-sciany_2.png",
  "sucha-zabudowa": "/images/cat-sucha-zabudowa_2.png",
  "sufity-podwieszane": "/images/cat-sufity_2.png",
  "pozostale": "https://skyagent-artifacts.skywork.ai/router/agent/2026-06-08/prod_agent_919fac5a-210e-47ca-8b62-27ddea343c50/pozostale_kategoria_2_8a82cc38d2a44d9b884d891b1745b7b2.png",
};

/* ── FAQ Accordion ─────────────────────────────────────────────────────────── */
function FaqAccordion({ items, catName }: { items: { q: string; a: string }[]; catName: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-10 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="px-6 py-4 flex items-center gap-2" style={{ background: "#0f0f0f", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="w-[3px] h-4 bg-[#f81828] rounded-full" />
        <h3 className="font-bold text-white text-sm">FAQ — {catName}</h3>
        <span className="ml-2 text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: "#1e0304", color: "#ff9aa3" }}>
          {items.length} pytań
        </span>
      </div>
      <div style={{ background: "#0a0a0a" }}>
        {items.map(({ q, a }, i) => (
          <div key={i} style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-6 py-4 flex items-start justify-between gap-3 group transition-colors"
              style={{ background: open === i ? "rgba(248,24,40,0.04)" : "transparent" }}
            >
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors leading-snug">{q}</span>
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all text-xs font-black mt-0.5"
                style={{
                  background: open === i ? "#f81828" : "rgba(255,255,255,0.07)",
                  color: open === i ? "#fff" : "#888",
                  transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >▼</span>
            </button>
            {open === i && (
              <div className="px-6 pb-5">
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);

  const { data: sanityCategory } = useCategoryBySlug(slug ?? '');
  const { data: sanityTopCats }  = useAllCategories();

  const cat = useMemo(
    () => sanityCategory
      ? sanityCategoryToLegacy(sanityCategory as SanityCategory)
      : (slug ? getCategoryBySlug(slug) : null),
    [sanityCategory, slug],
  );

  const breadcrumbs = useMemo(
    () => sanityCategory
      ? buildSanityBreadcrumbs(sanityCategory as SanityCategory).slice(0, -1)
      : (slug ? getBreadcrumbs(slug) : []),
    [sanityCategory, slug],
  );

  const categories = useMemo(
    () => sanityTopCats && (sanityTopCats as any[]).length > 0
      ? (sanityTopCats as any[]).map(sanityCategoryToLegacy)
      : staticCategories,
    [sanityTopCats],
  );

  const selectedBrand = searchParams.get("brand") || "";
  const selectedUnit  = searchParams.get("unit")  || "";
  const selectedTag   = searchParams.get("tag")   || "";
  const sortBy = searchParams.get("sort") || "default";
  // techSpec filters: "Label::Value" zakodowane w URL jako spec=Label%3A%3AValue
  const selectedSpecs: string[] = useMemo(
    () => searchParams.getAll("spec"),
    [searchParams]
  );
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  /* Reset filtrów i strony gdy zmienia się kategoria */
  useEffect(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  /* Prefetch metadanych produktów gdy user najeżdża na link kategorii */
  const prefetchForSlug = useCallback((targetSlug: string) => {
    const staticCat = getCategoryBySlug(targetSlug);
    if (!staticCat) return;
    const collect = (c: typeof staticCat): string[] => [
      c.slug, ...(c.children?.flatMap(ch => collect(ch)) || []),
    ];
    const slugs = collect(staticCat).sort();
    if (slugs.length) prefetchSanity(PRODUCT_META_BY_CATEGORY_SLUGS_QUERY, { slugs });
  }, []);

  // Slugi ze statycznych danych — dostępne NATYCHMIAST, bez czekania na Sanity
  const staticSubSlugs = useMemo(() => {
    const staticCat = slug ? getCategoryBySlug(slug) : null;
    if (!staticCat) return [] as string[];
    const collect = (c: typeof staticCat): string[] => [
      c.slug, ...(c.children?.flatMap(child => collect(child)) || []),
    ];
    return collect(staticCat).sort();
  }, [slug]);

  // Slugi z Sanity — dokładniejsze, dostępne po ~200-400ms
  const sanitySubSlugs = useMemo(() => {
    if (!sanityCategory) return null; // null = jeszcze się ładuje
    const legacyCat = sanityCategoryToLegacy(sanityCategory as SanityCategory);
    const collect = (c: typeof legacyCat): string[] => [
      c.slug, ...(c.children?.flatMap(child => collect(child)) || []),
    ];
    return collect(legacyCat).sort();
  }, [sanityCategory]);

  // Używaj static slugs NATYCHMIAST (fetch startuje równolegle z Sanity category).
  // Gdy Sanity category załaduje → przełącz na Sanity slugs.
  // Cache w sanityFetch sprawia, że jeśli slugi są identyczne → zero dodatkowych requestów.
  const allSubSlugs = useMemo(
    () => sanitySubSlugs ?? staticSubSlugs,
    [sanitySubSlugs, staticSubSlugs],
  );

  const { data: sanityMeta, loading: productsLoading, error: productsError } = useProductMetaByCategorySlugs(allSubSlugs);

  // Ładowanie = dopóki metadane nie dotarły (nie czekamy już na kategorię)
  const isLoadingProducts = productsLoading && !sanityMeta;

  const catProducts = useMemo(() => {
    const slugSet = new Set(allSubSlugs);                                          // O(m) raz
    const staticCategoryProducts = staticProducts.filter(p => slugSet.has(p.categorySlug)); // O(n)

    // ⚡ Two-query: Sanity dostarcza tylko meta (brand/unit/tags/featured/inStock),
    // pełne dane (obrazy, opisy, sku) pobierane ze staticProducts przez lookup by slug.
    const staticBySlug = new Map(staticCategoryProducts.map(p => [p.slug, p]));
    const sanityMapped = ((sanityMeta as ProductMeta[] | null) ?? []).map((meta: ProductMeta) => {
      const base = staticBySlug.get(meta.slug);
      if (base) {
        // Merge: Sanity meta nadpisuje pola filtrów (świeższe), static dostarcza obrazy/opisy.
        // Jeśli static nie ma obrazów (inne slugi bechcicki vs Sanity), użyj obrazu z Sanity.
        const mergedImages = base.images?.length
          ? base.images
          : (meta.images?.filter(Boolean) ?? []);
        return {
          ...base,
          brand:            meta.brand    || base.brand,
          unit:             meta.unit     || base.unit,
          tags:             meta.tags?.length ? meta.tags : base.tags,
          featured:         meta.featured ?? base.featured,
          inStock:          meta.inStock  ?? base.inStock,
          images:           mergedImages,
          shortDescription: base.shortDescription || meta.shortDescription || '',
        };
      }
      // Fallback: produkt tylko w Sanity (jeszcze nie ma w static data)
      return {
        id: meta._id, _id: meta._id,
        slug: meta.slug, name: meta.name,
        brand: meta.brand || '', unit: meta.unit || '',
        tags: meta.tags || [], featured: !!meta.featured, inStock: meta.inStock !== false,
        categorySlug: meta.categorySlug, categoryName: '',
        sku: '',
        shortDescription: meta.shortDescription || '',
        description: '', application: '',
        images: meta.images?.filter(Boolean) ?? [],
        technicalSpec: [], faq: [], advantages: [], warnings: [],
        isNew: false,
      };
    });

    return mergeProductCollections(sanityMapped as any, staticCategoryProducts);
  }, [sanityMeta, allSubSlugs]);

  /** Filtruje śmieciowe wartości brand (jednostki, znaki specjalne, puste) */
  const isValidBrand = (b: string) => {
    if (!b || b.length < 2) return false;
    if (!/^[A-Za-zÀ-ÿĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(b)) return false;
    if (/^\d/.test(b)) return false;
    return true;
  };

  /** Filtruje jednostki — akceptuje pojemności/gramaturę, odrzuca śmieci */
  const isValidUnit = (u: string) => {
    if (!u || u.length < 1) return false;
    return /^\d/.test(u) && u.length <= 10;
  };

  const availableBrands = useMemo(
    () => [...new Set(catProducts.map(p => p.brand).filter(isValidBrand))].sort(),
    [catProducts]
  );

  const availableUnits = useMemo(
    () => [...new Set(catProducts.map(p => p.unit).filter(isValidUnit))].sort(
      (a, b) => parseFloat(a) - parseFloat(b)
    ),
    [catProducts]
  );

  const availableTags = useMemo(
    () => [...new Set(catProducts.flatMap(p => p.tags ?? []).filter(t => t && t.length > 1))].sort(),
    [catProducts]
  );

  // techSpec: top 4 najczęstsze label-y (min. 10% produktów z danym labelem)
  const availableSpecFilters = useMemo(() => {
    const total = catProducts.length;
    if (total < 5) return [];
    const labelCount: Record<string, Map<string, number>> = {};
    for (const p of catProducts) {
      for (const s of (p as any).technicalSpec ?? []) {
        if (!s?.label || !s?.value) continue;
        if (!labelCount[s.label]) labelCount[s.label] = new Map();
        labelCount[s.label].set(s.value, (labelCount[s.label].get(s.value) ?? 0) + 1);
      }
    }
    return Object.entries(labelCount)
      .filter(([, vals]) => {
        const cnt = [...vals.values()].reduce((a, b) => a + b, 0);
        return cnt / total >= 0.1 && vals.size >= 2 && vals.size <= 20;
      })
      .sort((a, b) => {
        const cntA = [...a[1].values()].reduce((x, y) => x + y, 0);
        const cntB = [...b[1].values()].reduce((x, y) => x + y, 0);
        return cntB - cntA;
      })
      .slice(0, 4)
      .map(([label, valMap]) => ({
        label,
        values: [...valMap.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 12)
          .map(([v]) => v),
      }));
  }, [catProducts]);

  const filtered = useMemo(() => {
    let result = [...catProducts];
    if (selectedBrand) result = result.filter(p => p.brand === selectedBrand);
    if (selectedUnit)  result = result.filter(p => p.unit  === selectedUnit);
    if (selectedTag)   result = result.filter(p => (p.tags ?? []).includes(selectedTag));
    if (selectedSpecs.length > 0) {
      result = result.filter(p => {
        const specs = (p as any).technicalSpec ?? [];
        return selectedSpecs.every(sel => {
          const [label, value] = sel.split("::");
          return specs.some((s: any) => s.label === label && s.value === value);
        });
      });
    }
    switch (sortBy) {
      case "name-asc":  result.sort((a, b) => a.name.localeCompare(b.name, "pl")); break;
      case "name-desc": result.sort((a, b) => b.name.localeCompare(a.name, "pl")); break;
      case "brand":     result.sort((a, b) => a.brand.localeCompare(b.brand, "pl")); break;
      case "new":       result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return result;
  }, [catProducts, selectedBrand, selectedUnit, selectedTag, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PRODUCTS_PER_PAGE, safePage * PRODUCTS_PER_PAGE);

  const updateParam = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    if (key !== "page") p.delete("page");
    setSearchParams(p);
  };

  const clearFilters = () => setSearchParams(new URLSearchParams());
  const hasActiveFilters = !!(selectedBrand || selectedUnit || selectedTag || selectedSpecs.length > 0 || sortBy !== "default");

  const toggleSpec = (specKey: string) => {
    const p = new URLSearchParams(searchParams);
    const all = p.getAll("spec");
    if (all.includes(specKey)) {
      p.delete("spec");
      all.filter(s => s !== specKey).forEach(s => p.append("spec", s));
    } else {
      p.append("spec", specKey);
    }
    p.delete("page");
    setSearchParams(p);
  };

  const heroReveal = useReveal();
  const subReveal  = useReveal();
  const gridReveal = useReveal();

  /* FAQ — szukamy po bieżącym slugu lub po korzeniu breadcrumbów */
  const faqItems = useMemo(() => {
    if (slug && CATEGORY_FAQS[slug]) return CATEGORY_FAQS[slug];
    const rootSlug = breadcrumbs[0]?.slug;
    if (rootSlug && CATEGORY_FAQS[rootSlug]) return CATEGORY_FAQS[rootSlug];
    return null;
  }, [slug, breadcrumbs]);

  /* ── SEO meta tagi ── */
  useSEO({
    title: cat
      ? `${cat.name} – Media Bud | Materiały Budowlane Lublin`
      : "Kategoria | Media Bud",
    description: cat
      ? ((cat as any).metaDesc || cat.description || `Materiały budowlane – ${cat.name}. Sklep Media Bud Lublin, dostawa 24h.`).slice(0, 160)
      : undefined,
    canonical: slug ? `/kategoria/${slug}` : undefined,
  });

  if (!cat) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080808" }}>
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🏗️</div>
          <h1 className="text-2xl font-bold text-white mb-4">Kategoria nie znaleziona</h1>
          <Link to="/produkty">
            <Button className="bg-[#f81828] hover:bg-[#c8000f]">Przeglądaj wszystkie produkty</Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ── Filter panel component ── */
  const FilterPanel = () => (
    <div className="space-y-6">
      {availableBrands.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-600 uppercase tracking-widest mb-3">
            <Tag className="w-3 h-3 text-[#f81828]" /> Marka
          </h3>
          <div className="space-y-0.5">
            <button onClick={() => updateParam("brand", "")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${!selectedBrand ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"}`}>
              Wszystkie marki
            </button>
            {availableBrands.map(brand => (
              <button key={brand} onClick={() => updateParam("brand", brand === selectedBrand ? "" : brand)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedBrand === brand ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"}`}>
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableUnits.length > 1 && (
        <div>
          <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-600 uppercase tracking-widest mb-3">
            <Zap className="w-3 h-3 text-[#f81828]" /> Pojemność / gramatura
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => updateParam("unit", "")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${!selectedUnit ? "bg-[#f81828] text-white" : "text-gray-500 border border-white/10 hover:border-[#f81828]/50 hover:text-[#f81828]"}`}>
              Wszystkie
            </button>
            {availableUnits.map(u => (
              <button key={u} onClick={() => updateParam("unit", u === selectedUnit ? "" : u)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${selectedUnit === u ? "bg-[#f81828] text-white" : "text-gray-500 border border-white/10 hover:border-[#f81828]/50 hover:text-[#f81828]"}`}>
                {u}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableTags.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-600 uppercase tracking-widest mb-3">
            <Tag className="w-3 h-3 text-[#f81828]" /> Typ produktu
          </h3>
          <div className="space-y-0.5">
            <button onClick={() => updateParam("tag", "")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${!selectedTag ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"}`}>
              Wszystkie typy
            </button>
            {availableTags.map(tag => (
              <button key={tag} onClick={() => updateParam("tag", tag === selectedTag ? "" : tag)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize ${selectedTag === tag ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"}`}>
                {tag.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Filtry techSpec — dynamiczne per-kategoria ── */}
      {availableSpecFilters.map(({ label, values }) => (
        <div key={label}>
          <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-600 uppercase tracking-widest mb-3">
            <Zap className="w-3 h-3 text-[#f81828]" /> {label}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {values.map(val => {
              const key = `${label}::${val}`;
              const active = selectedSpecs.includes(key);
              return (
                <button key={key} onClick={() => toggleSpec(key)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${active ? "bg-[#f81828] text-white" : "text-gray-500 border border-white/10 hover:border-[#f81828]/50 hover:text-[#f81828]"}`}>
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div>
        <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-600 uppercase tracking-widest mb-3">
          <Zap className="w-3 h-3 text-[#f81828]" /> Sortowanie
        </h3>
        <div className="space-y-0.5">
          {[
            ["default",   "Domyślne"],
            ["name-asc",  "Nazwa A–Z"],
            ["name-desc", "Nazwa Z–A"],
            ["brand",     "Marka A–Z"],
            ["new",       "Nowości najpierw"],
          ].map(([val, label]) => (
            <button key={val} onClick={() => updateParam("sort", val)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${sortBy === val ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 text-xs text-[#f81828] font-semibold py-2 rounded-lg transition-all hover:bg-[#f81828]/10"
          style={{ border: "1px solid rgba(248,24,40,0.25)" }}>
          <X className="w-3 h-3" /> Wyczyść filtry
        </button>
      )}
    </div>
  );

  const pageNums = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 4) return [1,2,3,4,5,"…",totalPages];
    if (safePage >= totalPages - 3) return [1,"…",totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [1,"…",safePage-1,safePage,safePage+1,"…",totalPages];
  })();

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* JSON-LD BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://mediabud.pl/" },
          { "@type": "ListItem", "position": 2, "name": "Kategorie", "item": "https://mediabud.pl/kategoria" },
          { "@type": "ListItem", "position": 3, "name": cat.name, "item": `https://mediabud.pl/kategoria/${slug}` },
        ],
      })}} />

      {/* JSON-LD CollectionPage + ItemList — strona kategorii z listą produktów */}
      {paginated.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `https://mediabud.pl/kategoria/${slug}`,
          "name": cat.name,
          "description": (cat as any).metaDesc || cat.description || `Materiały budowlane – ${cat.name}. Sklep Media Bud Lublin.`,
          "url": `https://mediabud.pl/kategoria/${slug}`,
          "provider": {
            "@type": "Organization",
            "@id": "https://mediabud.pl/#organization",
            "name": "Media Bud",
          },
          "mainEntity": {
            "@type": "ItemList",
            "name": `${cat.name} — lista produktów`,
            "numberOfItems": filtered.length,
            "itemListElement": paginated.slice(0, 10).map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "url": `https://mediabud.pl/produkt/${p.slug}`,
              "name": p.name,
            })),
          },
        })}} />
      )}

      {/* JSON-LD FAQPage — pytania i odpowiedzi per kategoria */}
      {faqItems && faqItems.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map(({ q, a }) => ({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": { "@type": "Answer", "text": a },
          })),
        })}} />
      )}

      {/* ── Breadcrumb ── */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-xs text-gray-600 flex-wrap">
            <Link to="/" className="hover:text-[#f81828] transition-colors">Strona główna</Link>
            {breadcrumbs.map((bc, i) => (
              <span key={bc.id} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                {i === breadcrumbs.length - 1
                  ? <span className="text-gray-300 font-medium">{bc.name}</span>
                  : <Link to={`/kategoria/${bc.slug}`} className="hover:text-[#f81828] transition-colors">{bc.name}</Link>
                }
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div
        ref={heroReveal.ref}
        className="relative overflow-hidden"
        style={{ minHeight: "200px", background: "#0a0a0a" }}
      >
        {/* Category image bg */}
        {catImages[cat.slug] && (
          <div className="absolute inset-0">
            <img
              src={catImages[cat.slug]}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.18) saturate(0.6)" }}
            />
          </div>
        )}
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(248,24,40,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(248,24,40,0.07) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient left-to-right */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.5) 100%)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, #080808, transparent)" }} />
        {/* Left red accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828]" style={{ boxShadow: "2px 0 12px rgba(248,24,40,0.4)" }} />
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #f81828, rgba(248,24,40,0.2) 60%, transparent)" }} />

        <div className={`relative container mx-auto px-6 py-12 pl-10 transition-all duration-700 ease-out ${heroReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black text-[#f81828] tracking-widest uppercase">Kategoria</span>
                <span className="h-px flex-1 max-w-12" style={{ background: "rgba(248,24,40,0.4)" }} />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-3">
                {cat.metaTitle ? cat.metaTitle.split("|")[0].trim() : cat.name}
              </h1>
              {cat.description && (
                <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">{cat.description}</p>
              )}
            </div>
            <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
              <span className="font-display font-black text-[#f81828]/15 leading-none select-none" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                {String(catProducts.length).padStart(3, "0")}
              </span>
              <span className="text-xs text-gray-600 uppercase tracking-widest">produktów</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar — widoczny tylko ≥ lg ── */}
          <aside
            className="hidden lg:flex lg:flex-col lg:w-60 flex-shrink-0 gap-4 lg:sticky lg:top-[calc(var(--header-h,96px)+8px)] lg:self-start"
            style={{ maxHeight: "calc(100vh - 7rem)", overflowY: "auto", scrollbarWidth: "none" }}
          >

            {/* Categories tree */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ background: "#f81828", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Filter className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm tracking-wide">Kategorie</span>
              </div>
              <div className="p-2 max-h-[380px] overflow-y-auto">
                {categories.map(topCat => (
                  <div key={topCat.id}>
                    <Link
                      to={`/kategoria/${topCat.slug}`}
                      onMouseEnter={() => prefetchForSlug(topCat.slug)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all my-0.5 ${
                        topCat.id === cat.id || breadcrumbs.some(b => b.id === topCat.id)
                          ? "bg-[#f81828] text-white"
                          : "text-gray-400 hover:bg-[#f81828]/10 hover:text-white"
                      }`}
                    >
                      {topCat.name}
                    </Link>
                    {(topCat.id === cat.id || breadcrumbs.some(b => b.id === topCat.id)) && topCat.children && (
                      <div className="ml-4 pl-3 mb-1 space-y-0.5" style={{ borderLeft: "2px solid rgba(248,24,40,0.25)" }}>
                        {topCat.children.slice(0, 14).map(sub => (
                          <Link
                            key={sub.id}
                            to={`/kategoria/${sub.slug}`}
                            onMouseEnter={() => prefetchForSlug(sub.slug)}
                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all ${
                              sub.id === cat.id
                                ? "text-[#f81828] font-bold bg-[#f81828]/10"
                                : "text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/8"
                            }`}
                          >
                            {sub.id === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] flex-shrink-0" />}
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Filter panel - desktop */}
            {catProducts.length > 0 && (
              <div
                className="rounded-xl p-4"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-white mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <SlidersHorizontal className="w-4 h-4 text-[#f81828]" />
                  Filtry i sortowanie
                  {hasActiveFilters && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-[#f81828] animate-pulse" />
                  )}
                </div>
                <FilterPanel />
              </div>
            )}

            {/* Brand cross-links */}
            {availableBrands.length > 0 && (
              <div
                className="rounded-xl p-4"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h3 className="flex items-center gap-1.5 font-bold text-[10px] text-gray-600 uppercase tracking-widest mb-3">
                  <Tag className="w-3 h-3 text-[#f81828]" /> Marki w tej kategorii
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {availableBrands.slice(0, 18).map(brand => (
                    <Link
                      key={brand}
                      to={`/szukaj?brand=${encodeURIComponent(brand)}`}
                      className="text-[10px] font-semibold px-2 py-1 rounded-md transition-all text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/08"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {brand}
                    </Link>
                  ))}
                  {availableBrands.length > 18 && (
                    <span className="text-[10px] text-gray-700 px-2 py-1">+{availableBrands.length - 18}</span>
                  )}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "linear-gradient(135deg, rgba(248,24,40,0.12) 0%, rgba(248,24,40,0.05) 100%)",
                border: "1px solid rgba(248,24,40,0.2)",
              }}
            >
              <p className="text-xs font-bold text-[#f88090] uppercase tracking-wider mb-1.5">Doradztwo</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">Pomożemy dobrać właściwe materiały dla Twojego projektu.</p>
              <a
                href="tel:+48533553344"
                className="flex items-center gap-2 w-full bg-[#f81828] hover:bg-[#c8000f] text-white text-xs font-bold py-2.5 px-3 rounded-lg transition-all hover:shadow-[0_0_12px_rgba(248,24,40,0.4)]"
              >
                <Phone className="w-3.5 h-3.5" /> +48 533 553 344
              </a>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Subcategories */}
            {cat.children && cat.children.length > 0 && (
              <div ref={subReveal.ref} className="mb-8">
                <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-[3px] h-4 bg-[#f81828] rounded-full inline-block" />
                  Podkategorie
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {Array.from(new Map(cat.children.map(s => [s.slug, s])).values()).map((sub, i) => (
                    <Link
                      key={sub.id}
                      to={`/kategoria/${sub.slug}`}
                      className={`group rounded-xl p-3 transition-all duration-300 ${subReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{
                        background: "#0f0f0f",
                        border: "1px solid rgba(255,255,255,0.06)",
                        transitionDelay: `${i * 50}ms`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,24,40,0.35)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(248,24,40,0.06)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLElement).style.background = "#0f0f0f";
                      }}
                    >
                      <div className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors leading-snug mb-1">
                        {sub.name}
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-[#f81828] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                        Przejdź <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Toolbar */}
            <div
              className="flex items-center justify-between mb-4 gap-3 flex-wrap rounded-xl px-4 py-3"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-bold text-white">Produkty</h2>
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "#1e0304", color: "#ff9aa3", border: "1px solid rgba(248,24,40,0.35)" }}
                >
                  {isLoadingProducts
                    ? "Ładowanie…"
                    : filtered.length > 0 ? `${filtered.length} szt.` : "Zapytaj o ofertę"}
                </span>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-[#f81828] font-medium hover:underline">
                    <X className="w-3 h-3" /> wyczyść
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <button
                  className="lg:hidden flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors text-gray-400 hover:text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filtry
                  {hasActiveFilters && <span className="w-2 h-2 bg-[#f81828] rounded-full" />}
                </button>
                {/* Mobile categories toggle */}
                <button
                  className="lg:hidden flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    border: mobileCatsOpen ? "1px solid rgba(248,24,40,0.5)" : "1px solid rgba(255,255,255,0.1)",
                    color: mobileCatsOpen ? "#f81828" : "#9ca3af",
                  }}
                  onClick={() => setMobileCatsOpen(!mobileCatsOpen)}
                >
                  <Filter className="w-3.5 h-3.5" /> Kategorie
                </button>
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => updateParam("sort", e.target.value)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all text-gray-400 focus:outline-none focus:border-[#f81828] appearance-none cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <option value="default">Sortuj: domyślne</option>
                  <option value="name-asc">Nazwa A–Z</option>
                  <option value="name-desc">Nazwa Z–A</option>
                  <option value="brand">Marka A–Z</option>
                  <option value="new">Nowości</option>
                </select>
                {/* View toggle */}
                <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 transition-colors ${view === "grid" ? "bg-[#f81828] text-white" : "text-gray-500 hover:text-white"}`}
                    style={{ background: view === "grid" ? "#f81828" : "transparent" }}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 transition-colors ${view === "list" ? "bg-[#f81828] text-white" : "text-gray-500 hover:text-white"}`}
                    style={{ background: view === "list" ? "#f81828" : "transparent" }}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile filter panel */}
            {mobileFiltersOpen && (
              <div
                className="lg:hidden rounded-xl p-4 mb-4"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <FilterPanel />
              </div>
            )}

            {/* Mobile categories panel */}
            {mobileCatsOpen && (
              <div
                className="lg:hidden rounded-xl overflow-hidden mb-4"
                style={{ background: "#0f0f0f", border: "1px solid rgba(248,24,40,0.2)" }}
              >
                <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: "rgba(248,24,40,0.08)", borderBottom: "1px solid rgba(248,24,40,0.15)" }}>
                  <Filter className="w-3.5 h-3.5 text-[#f81828]" />
                  <span className="text-[#f81828] font-bold text-xs tracking-wide uppercase">Kategorie</span>
                </div>
                <div className="p-2">
                  {categories.map(topCat => (
                    <div key={topCat.id}>
                      <Link
                        to={`/kategoria/${topCat.slug}`}
                        onClick={() => setMobileCatsOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all my-0.5 ${
                          topCat.id === cat.id || breadcrumbs.some(b => b.id === topCat.id)
                            ? "bg-[#f81828] text-white"
                            : "text-gray-400 hover:bg-[#f81828]/10 hover:text-white"
                        }`}
                      >
                        {topCat.name}
                      </Link>
                      {(topCat.id === cat.id || breadcrumbs.some(b => b.id === topCat.id)) && topCat.children && (
                        <div className="ml-4 pl-3 mb-1 space-y-0.5" style={{ borderLeft: "2px solid rgba(248,24,40,0.25)" }}>
                          {topCat.children.slice(0, 14).map(sub => (
                            <Link
                              key={sub.id}
                              to={`/kategoria/${sub.slug}`}
                              onClick={() => setMobileCatsOpen(false)}
                              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all ${
                                sub.id === cat.id
                                  ? "text-[#f81828] font-bold bg-[#f81828]/10"
                                  : "text-gray-500 hover:text-[#f81828] hover:bg-[#f81828]/8"
                              }`}
                            >
                              {sub.id === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] flex-shrink-0" />}
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBrand && (
                  <span
                    className="flex items-center gap-1.5 text-[#f81828] text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "rgba(248,24,40,0.1)", border: "1px solid rgba(248,24,40,0.22)" }}
                  >
                    <Tag className="w-3 h-3" /> {selectedBrand}
                    <button onClick={() => updateParam("brand", "")} className="hover:text-red-300 transition-colors"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {sortBy !== "default" && (
                  <span
                    className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Sortowanie aktywne
                    <button onClick={() => updateParam("sort", "")} className="hover:text-[#f81828] transition-colors"><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Product grid */}
            {isLoadingProducts ? (
              /* Skeleton — 12 kart zastępują pusty stan podczas ładowania */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden animate-pulse"
                    style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="aspect-[4/3] w-full" style={{ background: "#1a1a1a" }} />
                    <div className="p-4 space-y-2">
                      <div className="h-2.5 w-1/3 rounded" style={{ background: "#1e1e1e" }} />
                      <div className="h-4 w-4/5 rounded" style={{ background: "#1e1e1e" }} />
                      <div className="h-3 w-2/3 rounded" style={{ background: "#1e1e1e" }} />
                      <div className="h-9 w-full rounded-lg mt-3" style={{ background: "#1e1e1e" }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : productsError ? (
              /* Error state */
              <div className="rounded-2xl p-12 text-center" style={{ background: "#0f0f0f", border: "1px solid rgba(248,24,40,0.15)" }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
                  style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.2)" }}>⚠️</div>
                <h3 className="font-bold text-white mb-2">Nie udało się załadować produktów</h3>
                <p className="text-gray-500 text-sm mb-5">Sprawdź połączenie z internetem i spróbuj ponownie.</p>
                <button onClick={() => window.location.reload()}
                  className="px-5 py-2 rounded-lg text-sm font-bold text-white transition-all hover:shadow-[0_0_16px_rgba(248,24,40,0.4)]"
                  style={{ background: "#f81828" }}>
                  Spróbuj ponownie
                </button>
              </div>
            ) : paginated.length > 0 ? (
              <>
                <div
                  ref={gridReveal.ref}
                  className={view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"}
                >
                  {paginated.map((p, i) => (
                    <div
                      key={p.id}
                      className={`transition-all duration-500 ease-out ${gridReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                      style={{ transitionDelay: `${(i % 6) * 65}ms` }}
                    >
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-1.5 flex-wrap">
                    <button
                      disabled={safePage <= 1}
                      onClick={() => updateParam("page", String(safePage - 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:text-white"
                      style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {pageNums.map((page, idx) =>
                      page === "…"
                        ? <span key={`e${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-600 text-sm">…</span>
                        : (
                          <button
                            key={page}
                            onClick={() => updateParam("page", String(page))}
                            className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                              page === safePage
                                ? "bg-[#f81828] text-white shadow-[0_0_12px_rgba(248,24,40,0.4)]"
                                : "text-gray-500 hover:text-white"
                            }`}
                            style={page !== safePage ? { background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)" } : {}}
                          >
                            {page}
                          </button>
                        )
                    )}
                    <button
                      disabled={safePage >= totalPages}
                      onClick={() => updateParam("page", String(safePage + 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:text-white"
                      style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <ChevronNext className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-gray-600 ml-2 font-mono">
                      {safePage}/{totalPages} · {filtered.length} szt.
                    </span>
                  </div>
                )}
              </>
            ) : (
              /* Empty state */
              <div
                className="rounded-2xl p-12 text-center"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl"
                  style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.15)" }}
                >
                  🏗️
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">
                  {hasActiveFilters ? "Brak wyników dla wybranych filtrów" : "Baza produktów w rozbudowie"}
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm leading-relaxed">
                  {hasActiveFilters
                    ? "Zmień lub wyczyść filtry, aby zobaczyć dostępne produkty."
                    : "Aktywnie uzupełniamy naszą bazę. Zadzwoń — z pewnością mamy to, czego szukasz!"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {hasActiveFilters
                    ? <Button onClick={clearFilters} className="bg-[#f81828] hover:bg-[#c8000f]">Wyczyść filtry</Button>
                    : <>
                        <a href="tel:+48533553344">
                          <Button className="bg-[#f81828] hover:bg-[#c8000f]"><Phone className="w-4 h-4 mr-2" /> +48 533 553 344</Button>
                        </a>
                        <Link to="/kontakt">
                          <Button variant="outline" className="border-[#f81828]/40 text-[#f81828] hover:bg-[#f81828] hover:text-white"><Mail className="w-4 h-4 mr-2" /> Wyślij zapytanie</Button>
                        </Link>
                      </>
                  }
                </div>
              </div>
            )}

            {/* SEO Description */}
            {cat.metaDesc && (
              <div
                className="mt-10 rounded-2xl p-6"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
                  <span className="w-[3px] h-4 bg-[#f81828] rounded-full" />
                  O kategorii: {cat.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cat.metaDesc}</p>
                <div
                  className="mt-5 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3"
                  style={{ background: "rgba(248,24,40,0.06)", border: "1px solid rgba(248,24,40,0.15)" }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Potrzebujesz fachowej porady?</p>
                    <p className="text-xs text-gray-500 mt-0.5">Nasi eksperci pomogą dobrać właściwe produkty.</p>
                  </div>
                  <a href="tel:+48533553344">
                    <Button size="sm" className="bg-[#f81828] hover:bg-[#c8000f] text-xs font-bold whitespace-nowrap shadow-sm hover:shadow-[0_0_12px_rgba(248,24,40,0.4)] transition-all">
                      <Phone className="w-3.5 h-3.5 mr-1.5" /> +48 533 553 344
                    </Button>
                  </a>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {faqItems && faqItems.length > 0 && (
              <FaqAccordion items={faqItems} catName={cat.name} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
