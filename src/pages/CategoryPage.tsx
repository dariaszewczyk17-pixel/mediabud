import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  ChevronRight, Grid, List, Filter, SlidersHorizontal, X,
  ChevronLeft, ChevronRight as ChevronNext, Tag, Zap, ArrowRight, Phone, Mail, ChevronDown,
  Droplets, Layers, Home, Paintbrush, Thermometer, Wrench, Package, Building2, LayoutGrid, FlaskConical
} from "lucide-react";
import { getCategoryBySlug, getBreadcrumbs, categories as staticCategories } from "@/data/categories";
import { products as staticProducts } from "@/data/products";
import { getBrandBySlug, slugifyBrand } from "@/data/brands";
import { useCategoryBySlug, useAllCategories, useProductMetaByCatSlug, useProductMetaByCatSlugFast, type ProductMeta } from "@/hooks/useSanityData";
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
import { ProductCardFuturistic } from "@/components/ProductCardFuturistic";
import { FilterBarFuturistic } from "@/components/FilterBarFuturistic";
import { ZeroResultsRecovery } from "@/components/ZeroResultsRecovery";
import { FilterListWithDisclosure, ProgressiveDisclosure } from "@/components/ProgressiveDisclosure";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CategoryFilters, type ActiveFilters } from "@/components/CategoryFilters";
import { getCategoryFilters } from "@/lib/categoryConfig";

const PRODUCTS_PER_PAGE = 24;

/* ── Ikony dla kategorii głównych ── */
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "chemia-budowlana": <FlaskConical className="w-3.5 h-3.5" />,
  "plytki": <LayoutGrid className="w-3.5 h-3.5" />,
  "izolacje": <Thermometer className="w-3.5 h-3.5" />,
  "farby-i-rozpuszczalniki": <Paintbrush className="w-3.5 h-3.5" />,
  "sucha-zabudowa": <Layers className="w-3.5 h-3.5" />,
  "dachy": <Home className="w-3.5 h-3.5" />,
  "narzedzia-i-mocowania": <Wrench className="w-3.5 h-3.5" />,
  "stropy-i-sciany": <Building2 className="w-3.5 h-3.5" />,
  "sufity-podwieszane": <Layers className="w-3.5 h-3.5" />,
  "pozostale": <Package className="w-3.5 h-3.5" />,
};

/* ── Helper: znajdź ścieżkę do kategorii w drzewie ── */
function findPathToSlug(nodes: TreeNode[], targetSlug: string, path: string[] = []): string[] | null {
  for (const node of nodes) {
    const newPath = [...path, node.id];
    if (node.slug === targetSlug) return newPath;
    if (node.children) {
      const found = findPathToSlug(node.children, targetSlug, newPath);
      if (found) return found;
    }
  }
  return null;
}

/* ── Węzeł drzewa kategorii ─────────────────────────────────────────────── */
interface TreeNode { id: string; slug: string; name: string; children?: TreeNode[] }

/* ── Pełne drzewko WSZYSTKICH kategorii z linkami ── */
interface FullTreeNodeProps {
  node: TreeNode;
  depth: number;
  currentSlug: string;
  expanded: Set<string>;
  toggle: (id: string) => void;
  pathToActive: Set<string>; // ID węzłów na ścieżce do aktywnej kategorii
}
function FullCategoryTreeNode({ node, depth, currentSlug, expanded, toggle, pathToActive }: FullTreeNodeProps) {
  const hasKids = !!(node.children && node.children.length > 0);
  const isOpen = expanded.has(node.id);
  const isActive = currentSlug === node.slug;
  const isOnPath = pathToActive.has(node.id); // Czy węzeł jest na ścieżce do aktywnej kategorii
  const icon = depth === 0 ? CATEGORY_ICONS[node.slug] : null;

  return (
    <div>
      <div className="flex items-center gap-0.5 min-h-[28px]">
        {/* Expand / collapse */}
        {hasKids ? (
          <button
            onClick={() => toggle(node.id)}
            className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-colors rounded ${
              isOnPath ? "text-[#f81828]" : "text-gray-500 hover:text-[#f81828]"
            }`}
          >
            <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
          </button>
        ) : (
          <span className="flex-shrink-0 w-5" />
        )}

        {/* Link do kategorii */}
        <Link
          to={`/kategoria/${node.slug}`}
          className={`flex-1 flex items-center gap-1.5 text-left rounded-lg px-2 py-1 text-xs font-medium transition-all truncate ${
            isActive
              ? "bg-[#f81828] text-white"
              : isOnPath
                ? "text-[#f81828] bg-[#f81828]/5"
                : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"
          }`}
          style={{ paddingLeft: `${4 + depth * 8}px` }}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="truncate">{node.name}</span>
        </Link>
      </div>

      {hasKids && isOpen && (
        <div className="ml-2 pl-2" style={{ borderLeft: `1px solid ${isOnPath ? "rgba(248,24,40,0.4)" : "rgba(248,24,40,0.15)"}` }}>
          {node.children!.map(child => (
            <FullCategoryTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              currentSlug={currentSlug}
              expanded={expanded}
              toggle={toggle}
              pathToActive={pathToActive}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface TreeNodeProps {
  node: TreeNode;
  depth: number;
  selectedSubcat: string;
  onSelect: (slug: string) => void;
  counts: Record<string, number>;
  expanded: Set<string>;
  toggle: (id: string) => void;
}
function CategoryTreeNode({ node, depth, selectedSubcat, onSelect, counts, expanded, toggle }: TreeNodeProps) {
  const hasKids = !!(node.children && node.children.length > 0);
  const isOpen  = expanded.has(node.id);
  const isActive = selectedSubcat === node.slug;
  const count    = counts[node.slug] ?? 0;

  return (
    <div>
      <div className="flex items-center gap-0.5 min-h-[28px]">
        {/* Expand / collapse */}
        {hasKids ? (
          <button
            onClick={() => toggle(node.id)}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-[#f81828] transition-colors rounded"
          >
            <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
          </button>
        ) : (
          <span className="flex-shrink-0 w-5" />
        )}

        {/* Node button */}
        <button
          onClick={() => onSelect(isActive ? "" : node.slug)}
          className={`flex-1 text-left rounded-lg px-2 py-1 text-xs font-medium transition-all flex items-center justify-between gap-1 min-w-0 ${
            isActive
              ? "bg-[#f81828] text-white"
              : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"
          }`}
          style={{ paddingLeft: `${4 + depth * 8}px` }}
        >
          <span className="truncate">{node.name}</span>
          {count > 0 && (
            <span className={`flex-shrink-0 text-[9px] font-mono rounded px-1 ${isActive ? "bg-white/20" : "text-gray-600"}`}>
              {count}
            </span>
          )}
        </button>
      </div>

      {hasKids && isOpen && (
        <div className="ml-2 pl-2" style={{ borderLeft: "1px solid rgba(248,24,40,0.2)" }}>
          {node.children!.map(child => (
            <CategoryTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedSubcat={selectedSubcat}
              onSelect={onSelect}
              counts={counts}
              expanded={expanded}
              toggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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

/* ── Opisy SEO per kategoria ────────────────────────────────────────────────── */
const CATEGORY_SEO_TEXTS: Record<string, { title: string; content: React.ReactNode }> = {
  "chemia-budowlana": {
    title: "Chemia budowlana Lublin — kleje, grunty, zaprawy",
    content: (
      <>
        <p className="mb-3">Wybór odpowiedniej chemii budowlanej to fundament trwałości każdego remontu i budowy. W hurtowni <strong>Media Bud Lublin</strong> oferujemy pełen przekrój profesjonalnych produktów: od gruntów głęboko penetrujących, przez elastyczne kleje do płytek (klasy C2TE, C2TES1), aż po specjalistyczne zaprawy naprawcze i hydroizolacje.</p>
        <p>Współpracujemy z wiodącymi producentami takimi jak <strong>Ceresit, Weber, Mapei czy Atlas</strong>. Niezależnie czy planujesz układanie gresu wielkoformatowego, ocieplenie elewacji, czy wylewkę samopoziomującą — nasi doradcy pomogą dobrać system chemii dopasowany do Twojego podłoża i warunków eksploatacji. Zapewniamy dostępność od ręki i szybką dostawę na terenie województwa lubelskiego. Przeczytaj również nasz poradnik: <a href="/blog/jaki-klej-do-plytek-wielkoformatowych" className="text-[#f81828] hover:underline">Jaki klej do płytek wielkoformatowych wybrać?</a></p>
      </>
    )
  },
  "izolacje": {
    title: "Materiały izolacyjne — styropian, wełna, XPS",
    content: (
      <>
        <p className="mb-3">Skuteczna termoizolacja to klucz do niższych rachunków za ogrzewanie i komfortu cieplnego. W naszej ofercie znajdziesz kompletne systemy ociepleń (ETICS): <strong>styropian fasadowy (EPS), styrodur (XPS) na fundamenty, wełnę mineralną i szklaną</strong> do poddaszy oraz piany poliuretanowe (PIR).</p>
        <p>Oferujemy materiały o najlepszych współczynnikach przewodzenia ciepła (lambda λ) od sprawdzonych marek: <strong>Swisspor, Termo Organika, Rockwool, Isover</strong>. Szukasz styropianu grafitowego na elewację w Lublinie? Potrzebujesz wyliczyć zapotrzebowanie? Skorzystaj z naszego <a href="/kalkulator/styropian-welna" className="text-[#f81828] hover:underline">kalkulatora izolacji</a> lub skontaktuj się z naszym działem sprzedaży B2B. Dowiedz się więcej z naszego artykułu: <a href="/blog/koszt-ocieplenia-domu-150m2" className="text-[#f81828] hover:underline">Ile kosztuje ocieplenie domu 150m2 w 2026 roku?</a></p>
      </>
    )
  },
  "farby-i-rozpuszczalniki": {
    title: "Farby elewacyjne i wewnętrzne — mieszalnia farb Lublin",
    content: (
      <>
        <p className="mb-3">Szukasz trwałej farby na lata? W Media Bud znajdziesz szeroki wybór <strong>farb elewacyjnych (silikonowych, silikatowych, akrylowych)</strong> oraz farb do wnętrz (lateksowych, ceramicznych). Posiadamy własną mieszalnię farb i tynków, co pozwala nam uzyskać tysiące kolorów od ręki, zgodnie ze wzornikami NCS, RAL czy paletami producentów.</p>
        <p>Polecamy produkty odporne na zabrudzenia, promieniowanie UV i rozwój grzybów od marek takich jak <strong>Caparol, Weber, Ceresit czy Kabe</strong>. Dobierzemy odpowiedni grunt i farbę do Twojego podłoża. Sprawdź nasz <a href="/kalkulator/farba-elewacyjna" className="text-[#f81828] hover:underline">kalkulator farb</a>, aby dokładnie oszacować potrzebną ilość materiału. Zobacz także: <a href="/blog/farba-elewacyjna-silikonowa-czy-akrylowa" className="text-[#f81828] hover:underline">Farba elewacyjna – silikonowa czy akrylowa?</a></p>
      </>
    )
  },
  "sucha-zabudowa": {
    title: "Sucha zabudowa — płyty G-K, profile, akcesoria",
    content: (
      <>
        <p className="mb-3">Systemy suchej zabudowy to najszybszy sposób na aranżację wnętrz, budowę ścianek działowych i sufitów podwieszanych. W naszym składzie w Lublinie kupisz <strong>płyty gipsowo-kartonowe (zwykłe, wodoodporne, ogniochronne, akustyczne)</strong>, profile stalowe (CD, UD, CW, UW) oraz pełen asortyment akcesoriów montażowych.</p>
        <p>Dostarczamy kompletne systemy od liderów rynku: <strong>Rigips, Knauf, Siniat, Nida</strong>. Oferujemy również masy szpachlowe, taśmy zbrojące i wkręty. Dzięki własnej flocie transportowej, bezpiecznie dostarczymy wielkogabarytowe płyty G-K bezpośrednio na Twój plac budowy. Sprawdź nasze porównanie: <a href="/blog/knauf-czy-rigips" className="text-[#f81828] hover:underline">Knauf czy Rigips – który system suchej zabudowy wybrać?</a></p>
      </>
    )
  },
  "plytki": {
    title: "Płytki ceramiczne, gres i chemia do glazury",
    content: (
      <>
        <p className="mb-3">Oferujemy szeroki wybór płytek ceramicznych, gresu technicznego i szkliwionego, idealnych do łazienek, kuchni, na tarasy i do obiektów komercyjnych. W Media Bud znajdziesz płytki w różnych formatach, od klasycznych po wielkoformatowe slaby, imitujące drewno, beton czy marmur.</p>
        <p>Pamiętaj, że trwałość posadzki zależy od chemii. Dlatego do płytek od razu dobierzesz u nas <strong>elastyczne kleje (C2TE S1), fugi (cementowe i epoksydowe), hydroizolacje podpłytkowe (folie w płynie) oraz listwy wykończeniowe</strong>. Skorzystaj z <a href="/kalkulator/plytki-ceramiczne" className="text-[#f81828] hover:underline">kalkulatora płytek</a> i <a href="/kalkulator/klej-do-plytek" className="text-[#f81828] hover:underline">kalkulatora kleju</a>, aby zoptymalizować zakupy. Przeczytaj nasz poradnik: <a href="/blog/jaki-klej-do-plytek-wielkoformatowych" className="text-[#f81828] hover:underline">Jaki klej do płytek wielkoformatowych?</a></p>
      </>
    )
  },
  "dachy": {
    title: "Pokrycia dachowe i akcesoria Lublin — papy, blachodachówki",
    content: (
      <>
        <p className="mb-3">Solidny dach to bezpieczeństwo na lata. W hurtowni <strong>Media Bud Lublin</strong> oferujemy kompleksowe rozwiązania dla dachów płaskich i skośnych. Znajdziesz u nas najwyższej jakości <strong>papy termozgrzewalne, gonty bitumiczne, blachodachówki oraz dachówki ceramiczne i betonowe</strong>. Dostarczamy również membrany dachowe, rynny i okna połaciowe.</p>
        <p>Współpracujemy z renomowanymi producentami, takimi jak <strong>Icopal, Swisspor, Fakro czy Pruszyński</strong>. Nasi eksperci pomogą w wyliczeniu zapotrzebowania na materiał i dobiorą optymalny system izolacji dachu. Zapewniamy transport HDS bezpośrednio na plac budowy w całym województwie lubelskim. Zobacz również: <a href="/blog/co-jest-trwalsze-dachowka-ceramiczna-czy-blachodachowka" className="text-[#f81828] hover:underline">Co jest trwalsze: dachówka ceramiczna czy blachodachówka?</a></p>
      </>
    )
  },
  "narzedzia-i-mocowania": {
    title: "Narzędzia budowlane i zamocowania Lublin — profesjonalny sprzęt",
    content: (
      <>
        <p className="mb-3">Niezawodny sprzęt to podstawa szybkiej i precyzyjnej pracy. W <strong>Media Bud</strong> zaopatrzysz się w profesjonalne <strong>narzędzia ręczne, elektronarzędzia, tarcze tnące, wiertła oraz systemy zamocowań</strong>. Oferujemy kołki rozporowe, kotwy chemiczne, wkręty do drewna i metalu oraz gwoździe niezbędne na każdym etapie budowy i remontu.</p>
        <p>Stawiamy na sprawdzony asortyment od liderów branży, takich jak <strong>Wkręt-met, Koelner, Rawlplug czy Stanley</strong>. Niezależnie czy jesteś profesjonalnym wykonawcą, czy majsterkowiczem, w naszym składzie w Lublinie znajdziesz narzędzia i mocowania, które sprostają najtrudniejszym zadaniom. Przeczytaj nasz poradnik: <a href="/blog/jak-obliczyc-ilosc-tynku-na-elewacje" className="text-[#f81828] hover:underline">Jak obliczyć ilość tynku na elewację?</a></p>
      </>
    )
  },
  "stropy-i-sciany": {
    title: "Materiały ścienne i stropy Lublin — pustaki, gazobeton, cegły",
    content: (
      <>
        <p className="mb-3">Budowa solidnych ścian i stropów wymaga materiałów najwyższej klasy. W ofercie <strong>Media Bud Lublin</strong> posiadamy szeroki wybór materiałów ściennych: <strong>beton komórkowy (gazobeton), pustaki ceramiczne, silikaty, cegły klinkierowe oraz systemy stropowe (np. Teriva)</strong>. Zapewniamy materiały do wznoszenia ścian nośnych, działowych i fundamentowych.</p>
        <p>Dostarczamy produkty od uznanych producentów: <strong>H+H, Solbet, Wienerberger, Porotherm czy Ytong</strong>. Gwarantujemy konkurencyjne ceny hurtowe, fachowe doradztwo techniczne przy wyborze technologii murowania oraz sprawną logistykę z rozładunkiem HDS na terenie Lublina i okolic. Dowiedz się więcej: <a href="/blog/od-czego-zaczac-remont-starej-kamienicy" className="text-[#f81828] hover:underline">Od czego zacząć remont starej kamienicy?</a></p>
      </>
    )
  },
  "sufity-podwieszane": {
    title: "Sufity podwieszane i kasetonowe Lublin — profile, płyty, systemy",
    content: (
      <>
        <p className="mb-3">Nowoczesne sufity podwieszane to idealne rozwiązanie do ukrycia instalacji, poprawy akustyki i estetyki wnętrz. W hurtowni <strong>Media Bud</strong> oferujemy kompletne systemy sufitowe: <strong>sufity kasetonowe (mineralne, metalowe), sufity z płyt G-K, profile nośne, wieszaki oraz wełnę akustyczną</strong>.</p>
        <p>W naszym asortymencie znajdziesz rozwiązania wiodących marek, takich jak <strong>Rockfon, AMF, Armstrong czy Rigips</strong>. Oferujemy systemy dedykowane do biur, szkół, szpitali oraz domów prywatnych. Nasi doradcy w Lublinie pomogą skompletować cały zestaw montażowy, zapewniając szybką realizację zamówienia. Zobacz także: <a href="/blog/ile-warstw-gk-dla-dobrej-izolacji-akustycznej" className="text-[#f81828] hover:underline">Ile warstw płyt G-K dla dobrej izolacji akustycznej?</a></p>
      </>
    )
  },
};

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

/* ── Komponent FAQAccordion ─────────────────────────────────────────────────── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-[rgba(255,255,255,0.05)]"
          >
            <span className="font-bold text-white text-sm pr-4">{item.q}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${openIndex === idx ? "rotate-180" : ""}`} />
          </button>
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: openIndex === idx ? "500px" : "0", opacity: openIndex === idx ? 1 : 0 }}
          >
            <div className="p-4 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5 mt-2">
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set<string>());
  const [techFilters, setTechFilters] = useState<ActiveFilters>({});
  const toggleExpand = useCallback((id: string) => setExpandedNodes(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next;
  }), []);

  // Oblicz ścieżkę do aktywnej kategorii (dla podświetlenia i auto-rozwijania)
  const pathToActive = useMemo(() => {
    if (!slug) return new Set<string>();
    const path = findPathToSlug(staticCategories as TreeNode[], slug);
    return new Set(path || []);
  }, [slug]);

  // Auto-rozwijanie drzewka do aktywnej kategorii przy zmianie slug
  useEffect(() => {
    if (pathToActive.size > 0) {
      setExpandedNodes(prev => {
        const next = new Set(prev);
        pathToActive.forEach(id => next.add(id));
        return next;
      });
    }
  }, [pathToActive]);

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
  const selectedSubcat = searchParams.get("subcat") || "";
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
    setTechFilters({});
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

  // ⚡ TWO-PHASE LOADING
  // Phase 1 (fast ~200-400ms): pierwsze 48 produktów — użytkownik widzi treść natychmiast
  const { data: firstBatch, loading: firstLoading } = useProductMetaByCatSlugFast(slug);
  // Phase 2 (background ~1-3s): wszystkie produkty — pełne filtry i paginacja
  const { data: allMeta, loading: allLoading } = useProductMetaByCatSlug(slug);

  // Pokaż firstBatch natychmiast; przełącz na allMeta gdy gotowe
  const sanityMeta = allMeta ?? firstBatch;
  const productsLoading = allMeta ? false : firstLoading;
  const isLoadingAll = allLoading && !!firstBatch; // true gdy Phase 1 ready, Phase 2 w toku

  // Ładowanie = dopóki metadane nie dotarły (nie czekamy już na kategorię)
  // Pokazuj skeleton TYLKO gdy kategoria nie ma żadnych danych statycznych.
  // Gdy static ma produkty → pokaż od razu; gdy brak → czekaj na Sanity.
  const hasStaticFallback = useMemo(() => {
    const slugSet = new Set(allSubSlugs);
    return staticProducts.some((p: any) => slugSet.has(p.categorySlug));
  }, [allSubSlugs]);
  const isLoadingProducts = firstLoading && !firstBatch;

  const catProducts = useMemo(() => {
    // Dopóki Phase 1 nie wróci — skeleton zamiast statycznego fallbacku (eliminuje flash "2 produkty")
    if (!sanityMeta) return [] as ReturnType<typeof mergeProductCollections>;

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
    if (selectedSubcat) {
      // Zbierz wszystkie slugi poddrzewa wybranej podkategorii
      const collectSlugs = (nodes: TreeNode[]): string[] =>
        nodes.flatMap(n => [n.slug, ...(n.children ? collectSlugs(n.children) : [])]);
      const subcatTree = (cat?.children as TreeNode[] | undefined) ?? [];
      const findNode = (nodes: TreeNode[], s: string): TreeNode | null => {
        for (const n of nodes) {
          if (n.slug === s) return n;
          const found = n.children ? findNode(n.children, s) : null;
          if (found) return found;
        }
        return null;
      };
      const node = findNode(subcatTree, selectedSubcat);
      const slugSet = new Set(node ? collectSlugs([node]) : [selectedSubcat]);
      result = result.filter(p => slugSet.has(p.categorySlug));
    }
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
    // Filtrowanie po techFilters (nowe filtry parametrów technicznych)
    const techFilterKeys = Object.keys(techFilters);
    if (techFilterKeys.length > 0) {
      result = result.filter(p => {
        const specs = (p as any).technicalSpec ?? [];
        const specMap: Record<string, string> = {};
        specs.forEach((s: any) => {
          specMap[s.label.toLowerCase().replace(/\s+/g, '_')] = String(s.value).toLowerCase();
        });
        return techFilterKeys.every(key => {
          const filterValues = techFilters[key];
          if (!filterValues || filterValues.length === 0) return true;
          const productValue = specMap[key] || '';
          return filterValues.some(fv => productValue.includes(fv.toLowerCase().replace(/\s+/g, '')));
        });
      });
    }
    switch (sortBy) {
      case "inStock":    result.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0)); break;
      case "featured":   result.sort((a, b) => (b.featured || (b as any).isFeatured ? 1 : 0) - (a.featured || (a as any).isFeatured ? 1 : 0)); break;
      case "name-asc":  result.sort((a, b) => a.name.localeCompare(b.name, "pl")); break;
      case "name-desc": result.sort((a, b) => b.name.localeCompare(a.name, "pl")); break;
      case "brand":     result.sort((a, b) => a.brand.localeCompare(b.brand, "pl")); break;
      case "new":       result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return result;
  }, [catProducts, selectedBrand, selectedUnit, selectedTag, selectedSubcat, selectedSpecs, sortBy, techFilters]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE)), [filtered.length]);
  const safePage = useMemo(() => Math.min(currentPage, totalPages), [currentPage, totalPages]);
  const paginated = useMemo(() => filtered.slice((safePage - 1) * PRODUCTS_PER_PAGE, safePage * PRODUCTS_PER_PAGE), [filtered, safePage]);

  const updateParam = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    if (key !== "page") p.delete("page");
    setSearchParams(p);
  };

  const clearFilters = () => setSearchParams(new URLSearchParams());
  const hasActiveFilters = !!(selectedBrand || selectedUnit || selectedTag || selectedSubcat || selectedSpecs.length > 0 || sortBy !== "default");

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

  /* ── Liczba aktywnych filtrów (bez sortowania) ── */
  /* Liczba produktów per categorySlug — dla liczników w drzewie */
  const subcatCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of catProducts) counts[p.categorySlug] = (counts[p.categorySlug] ?? 0) + 1;
    return counts;
  }, [catProducts]);

  const activeFilterCount = [selectedBrand, selectedUnit, selectedTag, selectedSubcat].filter(Boolean).length + selectedSpecs.length;

  /* ── SEO meta tagi ── */
  useSEO({
    title: cat
      ? `${cat.name} Lublin – Ceny, Dostawa 24h | Media Bud Skład Budowlany`
      : "Kategoria | Media Bud",
    description: cat
      ? `Kup ${cat.name.toLowerCase()} w Lublinie. ${cat.description ? cat.description.slice(0, 100) + '...' : ''} Dostawa na plac budowy, doradztwo techniczne gratis. Media Bud – ul. Chemiczna 8d Lublin.`
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

  /* ── Mobile Filter Panel — sekcje z checkboxowymi przyciskami ── */
  const MobileFilterPanel = () => (
    <div className="space-y-6">
      {/* PEŁNE DRZEWKO KATEGORII */}
      <div>
        <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-2">
          <ChevronRight className="w-3 h-3 text-[#f81828]" /> Wszystkie kategorie
        </h3>
        <div className="space-y-0 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
          {staticCategories.map(rootCat => (
            <FullCategoryTreeNode
              key={rootCat.id}
              node={rootCat as TreeNode}
              depth={0}
              currentSlug={slug || ""}
              expanded={expandedNodes}
              toggle={toggleExpand}
              pathToActive={pathToActive}
            />
          ))}
        </div>
      </div>

      {/* MARKA z Progressive Disclosure */}
      {availableBrands.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            <Tag className="w-3 h-3 text-[#f81828]" /> Marka
          </h3>
          <FilterListWithDisclosure
            options={availableBrands.map(b => ({ value: b }))}
            selected={selectedBrand}
            onChange={(brand) => updateParam("brand", brand)}
            allLabel="Wszystkie marki"
            initialCount={8}
          />
        </div>
      )}

      {/* JEDNOSTKA (zamiast "TYP PRODUKTU") */}
      {availableUnits.length > 1 && (
        <div>
          <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            <Zap className="w-3 h-3 text-[#f81828]" /> Jednostka / pojemność
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => updateParam("unit", "")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!selectedUnit ? "bg-[#f81828] text-white" : "text-gray-500 hover:border-[#f81828]/50 hover:text-[#f81828]"}`}
              style={!selectedUnit ? {} : { border: "1px solid rgba(255,255,255,0.12)" }}>
              Wszystkie
            </button>
            {availableUnits.map(u => (
              <button key={u} onClick={() => updateParam("unit", u === selectedUnit ? "" : u)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedUnit === u ? "bg-[#f81828] text-white" : "text-gray-500 hover:border-[#f81828]/50 hover:text-[#f81828]"}`}
                style={selectedUnit === u ? {} : { border: "1px solid rgba(255,255,255,0.12)" }}>
                {u}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PODKATEGORIE — drzewo rozwijane z Progressive Disclosure */}
      {cat?.children && (cat.children as TreeNode[]).length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-2">
            <ChevronRight className="w-3 h-3 text-[#f81828]" /> Podkategorie
          </h3>
          <div className="space-y-0">
            <div className="flex items-center gap-0.5 min-h-[28px]">
              <span className="flex-shrink-0 w-5" />
              <button
                onClick={() => updateParam("subcat", "")}
                className={`flex-1 text-left rounded-lg px-2 py-1 text-xs font-medium transition-all ${
                  !selectedSubcat ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"
                }`}
              >
                Wszystkie podkategorie
              </button>
            </div>
            <ProgressiveDisclosure
              items={cat.children as TreeNode[]}
              initialCount={6}
              showAllLabel="Pokaż wszystkie podkategorie"
              renderItem={(child) => (
                <CategoryTreeNode
                  key={child.id}
                  node={child}
                  depth={0}
                  selectedSubcat={selectedSubcat}
                  onSelect={slug => updateParam("subcat", slug)}
                  counts={subcatCounts}
                  expanded={expandedNodes}
                  toggle={toggleExpand}
                />
              )}
            />
          </div>
        </div>
      )}

      {/* TAGI — tylko gdy brak podkategorii LUB jako dodatkowy filtr */}
      {availableTags.length > 0 && !(cat?.children && (cat.children as TreeNode[]).length > 0) && (
        <div>
          <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            <Tag className="w-3 h-3 text-[#f81828]" /> Typ produktu
          </h3>
          <FilterListWithDisclosure
            options={availableTags.map(t => ({ value: t }))}
            selected={selectedTag}
            onChange={(tag) => updateParam("tag", tag)}
            allLabel="Wszystkie"
            initialCount={8}
          />
        </div>
      )}

      {/* ── Filtry techSpec — dynamiczne per-kategoria ── */}
      {availableSpecFilters.map(({ label, values }) => (
        <div key={label}>
          <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            <Zap className="w-3 h-3 text-[#f81828]" /> {label}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {values.map(val => {
              const key = `${label}::${val}`;
              const active = selectedSpecs.includes(key);
              return (
                <button key={key} onClick={() => toggleSpec(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${active ? "bg-[#f81828] text-white" : "text-gray-500 hover:border-[#f81828]/50 hover:text-[#f81828]"}`}
                  style={active ? {} : { border: "1px solid rgba(255,255,255,0.12)" }}>
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* SORTOWANIE */}
      <div>
        <h3 className="flex items-center gap-2 font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-3">
          <Zap className="w-3 h-3 text-[#f81828]" /> Sortowanie
        </h3>
        <div className="space-y-0.5">
          {[
            ["default",   "Domyślne"],
            ["inStock",   "Dostępne od ręki"],
            ["featured",  "Polecane"],
            ["name-asc",  "Nazwa A–Z"],
            ["name-desc", "Nazwa Z–A"],
            ["brand",     "Marka A–Z"],
            ["new",       "Nowości najpierw"],
          ].map(([val, label]) => (
            <button key={val} onClick={() => updateParam("sort", val)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${sortBy === val ? "bg-[#f81828] text-white" : "text-gray-400 hover:bg-[#f81828]/10 hover:text-[#f81828]"}`}>
              <span>{label}</span>
              {sortBy === val && val !== "default" && <span className="text-[10px] font-black opacity-70">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* WYCZYŚĆ */}
      {hasActiveFilters && (
        <button onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 text-xs text-[#f81828] font-bold py-2.5 rounded-lg transition-all hover:bg-[#f81828]/10"
          style={{ border: "1px solid rgba(248,24,40,0.3)" }}>
          <X className="w-3 h-3" /> Wyczyść wszystkie filtry
        </button>
      )}
    </div>
  );

  /* ── Desktop Filter Panel (sidebar) — zachowany dla kompatybilności ── */
  const FilterPanel = MobileFilterPanel;

  const pageNums = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 4) return [1,2,3,4,5,"…",totalPages];
    if (safePage >= totalPages - 3) return [1,"…",totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [1,"…",safePage-1,safePage,safePage+1,"…",totalPages];
  }, [totalPages, safePage]);

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

      {/* ── Glassmorphism Breadcrumb bar ── */}
      <div style={{
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(248,24,40,0.12)",
      }}>
        <div className="container mx-auto px-4 py-2.5">
          <nav className="flex items-center gap-1 text-xs text-gray-600 flex-wrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] mr-1" style={{ boxShadow: "0 0 4px rgba(248,24,40,0.8)" }} />
            <Link to="/" className="hover:text-[#f81828] transition-colors font-mono tracking-wide">ROOT</Link>
            {breadcrumbs.map((bc, i) => (
              <span key={bc.id} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#f81828]/40" />
                {i === breadcrumbs.length - 1
                  ? <span className="text-gray-200 font-bold tracking-wide font-mono">{bc.name.toUpperCase()}</span>
                  : <Link to={`/kategoria/${bc.slug}`} className="hover:text-[#f81828] transition-colors font-mono">{bc.name.toUpperCase()}</Link>
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
        style={{
          minHeight: "280px",
          background: "#0a0a0a",
        }}
      >
        {/* Noise texture overlay */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: 0.03,
          mixBlendMode: "overlay",
        }} />

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

        {/* Gradient left-to-right */}
        <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.97) 35%, rgba(0,0,0,0.55) 100%)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 z-[2]" style={{ background: "linear-gradient(to top, #080808, transparent)" }} />
        {/* Left red accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f81828] z-[3]" style={{ boxShadow: "2px 0 16px rgba(248,24,40,0.6)" }} />
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-[3]" style={{ background: "linear-gradient(90deg, #f81828, rgba(248,24,40,0.2) 60%, transparent)" }} />
        {/* Cyberpunk scan line */}
        <div className="absolute left-0 right-0 h-[1px] z-[3]" style={{
          top: "50%",
          background: "linear-gradient(90deg, transparent 0%, rgba(248,24,40,0.15) 30%, rgba(248,24,40,0.4) 50%, rgba(248,24,40,0.15) 70%, transparent 100%)",
        }} />

        <div className={`relative z-[4] container mx-auto px-6 py-12 pl-10 transition-all duration-700 ease-out ${heroReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-black text-[#f81828] tracking-[0.25em] uppercase font-mono">// KATEGORIA</span>
                <span className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(90deg, rgba(248,24,40,0.6), transparent)" }} />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-3">
                {cat.metaTitle ? cat.metaTitle.split("|")[0].trim() : cat.name}
              </h1>
              {cat.description && (
                <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">{cat.description}</p>
              )}
            </div>
            {/* Animated product counter */}
            <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
              <div className="relative">
                <span
                  className="font-display font-black leading-none select-none tabular-nums"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 5.5rem)",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(248,24,40,0.25)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {isLoadingAll ? "···" : String(catProducts.length).padStart(3, "0")}
                </span>
                {/* Glowing copy behind */}
                <span
                  className="absolute inset-0 font-display font-black leading-none select-none tabular-nums"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 5.5rem)",
                    color: "rgba(248,24,40,0.07)",
                    filter: "blur(8px)",
                    letterSpacing: "-0.03em",
                  }}
                  aria-hidden
                >
                  {isLoadingAll ? "···" : String(catProducts.length).padStart(3, "0")}
                </span>
              </div>
              <span className="text-[9px] text-gray-600 uppercase tracking-[0.2em] font-mono">PRODUKTÓW</span>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f81828]" style={{ boxShadow: "0 0 4px rgba(248,24,40,0.8)" }} />
                <span className="text-[9px] text-gray-600 font-mono tracking-wide">{(isLoadingProducts || isLoadingAll) ? "ŁADOWANIE…" : `${filtered.length} WYNIKÓW`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar — widoczny tylko ≥ lg ── */}
          <aside
            className="hidden lg:flex lg:flex-col lg:w-60 flex-shrink-0 gap-4 lg:sticky lg:top-[calc(var(--header-h,140px)+8px)] lg:self-start"
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
                
                {/* Nowe filtry parametrów technicznych */}
                {slug && getCategoryFilters(slug).length > 0 && (
                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <CategoryFilters
                      categorySlug={slug}
                      activeFilters={techFilters}
                      onFiltersChange={setTechFilters}
                      productCount={filtered.length}
                    />
                  </div>
                )}
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
          <div className="flex-1 min-w-0" style={{ contain: "layout style" }}>

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

            {/* ── Futurystyczny Sticky Toolbar NAD gridem ── */}
            <div
              className="sticky z-20 rounded-xl mb-4"
              style={{
                top: "calc(var(--header-h, 140px) + 8px)",
                background: "rgba(8,8,8,0.9)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(248,24,40,0.18)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(248,24,40,0.05) inset",
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-xl"
                style={{ background: "linear-gradient(90deg, #f81828, rgba(248,24,40,0.3) 50%, transparent)" }} />

              <div className="flex items-center justify-between px-4 py-2.5 gap-3 flex-wrap">
                {/* Lewa: licznik + label + DESKTOP inline filtry */}
                <div className="flex items-center gap-3 flex-wrap flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="w-1 h-4 bg-[#f81828] rounded-full" style={{ boxShadow: "0 0 6px rgba(248,24,40,0.8)" }} />
                    <span className="text-xs font-black text-white uppercase tracking-widest font-mono">Produkty</span>
                  </div>
                  <span
                    className="text-[11px] font-black px-2.5 py-0.5 rounded-full font-mono tabular-nums flex-shrink-0"
                    style={{
                      background: "rgba(248,24,40,0.12)",
                      border: "1px solid rgba(248,24,40,0.35)",
                      color: "#ff9aa3",
                      boxShadow: "0 0 8px rgba(248,24,40,0.15)",
                    }}
                  >
                    {(isLoadingProducts || isLoadingAll) ? "…" : `${filtered.length}`}
                  </span>

                  {/* ── Desktop inline filter dropdowns (lg:) ── */}
                  {availableBrands.length > 0 && (
                    <select
                      value={selectedBrand}
                      onChange={e => updateParam("brand", e.target.value)}
                      className="hidden lg:block text-[11px] font-bold px-3 py-1.5 rounded-lg focus:outline-none appearance-none cursor-pointer font-mono"
                      style={{
                        background: selectedBrand ? "rgba(248,24,40,0.18)" : "rgba(255,255,255,0.04)",
                        border: selectedBrand ? "1px solid rgba(248,24,40,0.55)" : "1px solid rgba(255,255,255,0.1)",
                        color: selectedBrand ? "#f81828" : "#6b7280",
                      }}
                    >
                      <option value="">MARKA ▾</option>
                      {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  )}

                  {availableUnits.length > 1 && (
                    <select
                      value={selectedUnit}
                      onChange={e => updateParam("unit", e.target.value)}
                      className="hidden lg:block text-[11px] font-bold px-3 py-1.5 rounded-lg focus:outline-none appearance-none cursor-pointer font-mono"
                      style={{
                        background: selectedUnit ? "rgba(248,24,40,0.18)" : "rgba(255,255,255,0.04)",
                        border: selectedUnit ? "1px solid rgba(248,24,40,0.55)" : "1px solid rgba(255,255,255,0.1)",
                        color: selectedUnit ? "#f81828" : "#6b7280",
                      }}
                    >
                      <option value="">JEDNOSTKA ▾</option>
                      {availableUnits.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  )}

                  {availableTags.length > 0 && (
                    <select
                      value={selectedTag}
                      onChange={e => updateParam("tag", e.target.value)}
                      className="hidden lg:block text-[11px] font-bold px-3 py-1.5 rounded-lg focus:outline-none appearance-none cursor-pointer font-mono"
                      style={{
                        background: selectedTag ? "rgba(248,24,40,0.18)" : "rgba(255,255,255,0.04)",
                        border: selectedTag ? "1px solid rgba(248,24,40,0.55)" : "1px solid rgba(255,255,255,0.1)",
                        color: selectedTag ? "#f81828" : "#6b7280",
                      }}
                    >
                      <option value="">TAGI ▾</option>
                      {availableTags.map(t => <option key={t} value={t}>{t.replace(/-/g, " ")}</option>)}
                    </select>
                  )}

                  {/* Wyczyść — desktop, widoczny tylko gdy aktywny filtr */}
                  {(selectedBrand || selectedUnit || selectedTag || selectedSpecs.length > 0) && (
                    <button
                      onClick={clearFilters}
                      className="hidden lg:flex items-center gap-1 text-[10px] text-[#f81828] font-black px-2.5 py-1.5 rounded-lg transition-all hover:bg-[#f81828]/10 font-mono uppercase tracking-wide"
                      style={{ border: "1px solid rgba(248,24,40,0.3)" }}
                    >
                      <X className="w-2.5 h-2.5" /> Wyczyść
                    </button>
                  )}
                </div>

                {/* Prawa: mobile filtry + sort + view toggle */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Mobile: przycisk Filtry z licznikiem aktywnych filtrów — otwiera drawer */}
                  <button
                    className="lg:hidden flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-lg transition-all uppercase tracking-wide font-mono"
                    style={mobileFilterOpen
                      ? { background: "rgba(248,24,40,0.15)", border: "1px solid rgba(248,24,40,0.5)", color: "#f81828" }
                      : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#9ca3af" }
                    }
                    onClick={() => setMobileFilterOpen(true)}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    {activeFilterCount > 0 ? `Filtry (${activeFilterCount})` : "Filtry"}
                    {activeFilterCount > 0 && (
                      <span className="w-1.5 h-1.5 bg-[#f81828] rounded-full" style={{ boxShadow: "0 0 4px rgba(248,24,40,0.8)" }} />
                    )}
                  </button>

                  {/* Dropdown sortowania */}
                  <select
                    value={sortBy}
                    onChange={e => updateParam("sort", e.target.value)}
                    className="text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all focus:outline-none appearance-none cursor-pointer font-mono"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: sortBy !== "default" ? "#f81828" : "#6b7280",
                    }}
                  >
                    <option value="default">SORTUJ ▾</option>
                    <option value="inStock">Dostępne od ręki</option>
                    <option value="featured">Polecane</option>
                    <option value="name-asc">Nazwa A–Z</option>
                    <option value="name-desc">Nazwa Z–A</option>
                    <option value="brand">Marka A–Z</option>
                    <option value="new">Nowości</option>
                  </select>

                  {/* Grid / List toggle */}
                  <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                    <button
                      onClick={() => setView("grid")}
                      className="p-1.5 transition-colors"
                      style={{ background: view === "grid" ? "#f81828" : "transparent", color: view === "grid" ? "#fff" : "#6b7280" }}
                      title="Widok siatki"
                    >
                      <Grid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className="p-1.5 transition-colors"
                      style={{ background: view === "list" ? "#f81828" : "transparent", color: view === "list" ? "#fff" : "#6b7280" }}
                      title="Widok listy"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Stary toolbar (zachowany dla breakpointów lg: mobilne kategorie) ── */}
            <div
              className="hidden"
              aria-hidden="true"
            />

            {/* Mobile filter panel (stary, zachowany dla kompatybilności) */}
            {mobileFiltersOpen && (
              <div
                className="lg:hidden rounded-xl p-4 mb-4"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <FilterPanel />
              </div>
            )}

            {/* ── Mobile Filter Drawer (nowy — wysuwa z lewej) ── */}
            {mobileFilterOpen && (
              <div className="lg:hidden fixed inset-0 z-50">
                {/* Backdrop */}
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
                  onClick={() => setMobileFilterOpen(false)}
                />
                {/* Drawer panel */}
                <div
                  className="absolute left-0 top-0 h-full w-[85vw] max-w-[320px] flex flex-col overflow-hidden"
                  style={{
                    background: "#0d0d0d",
                    borderRight: "1px solid rgba(248,24,40,0.2)",
                    boxShadow: "4px 0 32px rgba(0,0,0,0.7), 0 0 60px rgba(248,24,40,0.05)",
                    animation: "slideInLeft 0.3s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {/* Drawer header */}
                  <div
                    className="flex items-center justify-between px-4 py-3 flex-shrink-0 relative"
                    style={{ background: "#080808", borderBottom: "1px solid rgba(248,24,40,0.15)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: "linear-gradient(90deg, #f81828, transparent)" }} />
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#f81828]" />
                      <span className="font-black text-sm text-white tracking-widest font-mono uppercase">Filtry</span>
                      {hasActiveFilters && (
                        <span className="w-2 h-2 bg-[#f81828] rounded-full" style={{ boxShadow: "0 0 6px rgba(248,24,40,0.8)" }} />
                      )}
                    </div>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Drawer content */}
                  <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: "none" }}>
                    <FilterPanel />
                  </div>

                  {/* Drawer footer */}
                  <div className="p-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#080808" }}>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-full h-10 rounded-xl text-sm font-black text-white transition-all"
                      style={{
                        background: "linear-gradient(135deg, #f81828, #c8000f)",
                        boxShadow: "0 0 16px rgba(248,24,40,0.3)",
                      }}
                    >
                      Pokaż {isLoadingAll ? "···" : filtered.length} produktów
                    </button>
                  </div>
                </div>
                <style>{`@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
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
              /* ── Skeleton — 8 ciemnych pulse kart ── */
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden"
                    style={{
                      background: "#0f0f0f",
                      border: "1px solid rgba(255,255,255,0.06)",
                      animation: `pulse 1.8s ease-in-out ${i * 0.1}s infinite`,
                    }}
                  >
                    <div className="aspect-[4/3] w-full relative overflow-hidden" style={{ background: "#141414" }}>
                      {/* Skeleton shimmer */}
                      <div className="absolute inset-0 -translate-x-full animate-shimmer"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(248,24,40,0.04), transparent)",
                          animation: "shimmer 2s infinite",
                        }}
                      />
                    </div>
                    <div className="p-4 space-y-2.5">
                      <div className="h-2 w-1/4 rounded" style={{ background: "rgba(248,24,40,0.08)" }} />
                      <div className="h-4 w-5/6 rounded" style={{ background: "#1a1a1a" }} />
                      <div className="h-3 w-3/4 rounded" style={{ background: "#161616" }} />
                      <div className="h-3 w-1/2 rounded" style={{ background: "#161616" }} />
                      <div className="h-11 w-full rounded-lg mt-3" style={{ background: "rgba(248,24,40,0.07)", border: "1px solid rgba(248,24,40,0.12)" }} />
                    </div>
                  </div>
                ))}
                <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.55} }`}</style>
              </div>
            ) : paginated.length > 0 ? (
              <>

                {/* ── Popularne marki w tej kategorii (Wizualny Silos) ── */}
                {availableBrands.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#f81828] rounded-full inline-block"></span>
                      Popularne marki w tej kategorii
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {availableBrands.slice(0, 12).map(brandName => {
                        const brandData = getBrandBySlug(slugifyBrand(brandName));
                        if (!brandData || !brandData.logo) return null;
                        
                        const isSelected = selectedBrand === brandName;
                        
                        return (
                          <button
                            key={brandName}
                            onClick={() => updateParam("brand", isSelected ? "" : brandName)}
                            className={`group relative flex items-center justify-center w-24 h-12 rounded-xl transition-all duration-300 overflow-hidden ${isSelected ? 'ring-2 ring-[#f81828] bg-white/10' : 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10'}`}
                            title={`Filtruj po marce: ${brandName}`}
                          >
                            <img 
                              src={brandData.logo} 
                              alt={`Logo ${brandName}`} 
                              className={`max-w-[70%] max-h-[60%] object-contain transition-all duration-300 ${isSelected ? 'opacity-100 scale-110' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'}`}
                              loading="lazy"
                            />
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-2 h-2 bg-[#f81828] rounded-full shadow-[0_0_8px_rgba(248,24,40,0.8)]"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ⚡ Banner Two-Phase: widoczny podczas ładowania reszty produktów w tle */}
                {isLoadingAll && (
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg text-xs font-mono"
                    style={{ background: "rgba(248,24,40,0.06)", border: "1px solid rgba(248,24,40,0.18)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f81828] animate-pulse flex-shrink-0" />
                    <span className="text-gray-400">Ładowanie wszystkich produktów… filtry będą pełne za chwilę</span>
                  </div>
                )}
                <div
                  ref={gridReveal.ref}
                  className={view === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                    : "space-y-4"}
                >
                  {paginated.map((p, i) => (
                    <div
                      key={p.id}
                      className={`transition-all duration-500 ease-out ${gridReveal.vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                      style={{ transitionDelay: `${(i % 8) * 40}ms` }}
                    >
                      <ProductCardFuturistic product={p} priority={i < 4} index={i} categorySlug={slug} />
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
                      {safePage}/{totalPages} · {isLoadingAll ? "···" : filtered.length} szt.
                    </span>
                  </div>
                )}
              </>
            ) : (
              /* Empty state - ZeroResultsRecovery */
              <ZeroResultsRecovery
                categoryName={cat?.name || "tej kategorii"}
                activeFilters={[
                  ...(selectedBrand ? [{ type: "brand" as const, label: "Marka", value: selectedBrand, onRemove: () => updateParam("brand", "") }] : []),
                  ...(selectedUnit ? [{ type: "unit" as const, label: "Jednostka", value: selectedUnit, onRemove: () => updateParam("unit", "") }] : []),
                  ...(selectedTag ? [{ type: "tag" as const, label: "Typ", value: selectedTag, onRemove: () => updateParam("tag", "") }] : []),
                  ...(selectedSubcat ? [{ type: "subcat" as const, label: "Podkategoria", value: selectedSubcat, onRemove: () => updateParam("subcat", "") }] : []),
                ]}
                bestsellers={catProducts.slice(0, 4).map(p => ({
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  brand: p.brand,
                  image: p.images?.[0],
                }))}
                onClearAll={clearFilters}
                totalInCategory={catProducts.length}
              />
            )}
          </div>
        </div>

        {/* ── Sekcja SEO i FAQ (na dole strony) ── */}
        {((slug && CATEGORY_SEO_TEXTS[slug]) || (faqItems && faqItems.length > 0)) && (
          <div className="mt-16 pt-12 border-t border-white/5">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Lewa kolumna: Tekst SEO */}
              <div>
                {slug && CATEGORY_SEO_TEXTS[slug] ? (
                  <>
                    <h2 className="text-2xl font-black text-white font-display mb-6">
                      {CATEGORY_SEO_TEXTS[slug].title}
                    </h2>
                    <div className="text-gray-400 text-sm leading-relaxed">
                      {CATEGORY_SEO_TEXTS[slug].content}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-white font-display mb-6">
                      {cat?.name} — materiały budowlane Lublin
                    </h2>
                    <div className="text-gray-400 text-sm leading-relaxed">
                      <p className="mb-3">Wybierając materiały z kategorii <strong>{cat?.name}</strong> w hurtowni Media Bud, zyskujesz gwarancję najwyższej jakości i profesjonalnego doradztwa. Oferujemy szeroki asortyment produktów od sprawdzonych producentów, dostępnych od ręki w naszym magazynie w Lublinie.</p>
                      <p>Zapewniamy konkurencyjne ceny dla wykonawców i inwestorów indywidualnych oraz szybką dostawę na terenie całego województwa lubelskiego. Skontaktuj się z naszym działem handlowym, aby uzyskać indywidualną wycenę.</p>
                    </div>
                  </>
                )}
              </div>

              {/* Prawa kolumna: FAQ */}
              {faqItems && faqItems.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black text-white font-display mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#f81828]/10 flex items-center justify-center text-[#f81828] text-sm">?</span>
                    Często zadawane pytania
                  </h2>
                  <FAQAccordion items={faqItems} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
