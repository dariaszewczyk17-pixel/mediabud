import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import NotFoundPage from "@/pages/NotFoundPage";

/* ─── Lazy-loaded pages ─────────────────────────────────
   Każda strona ładuje się osobnym chunk-em — Vite rozbija
   dynamiczne importy na pliki .js ładowane na żądanie.    */
const CategoryPage      = lazy(() => import("@/pages/CategoryPage"));
const ProductDetail     = lazy(() => import("@/pages/ProductDetail"));
const SearchResultsPage = lazy(() => import("@/pages/SearchResultsPage"));
const Blog              = lazy(() => import("@/pages/Blog"));
const BlogPost          = lazy(() => import("@/pages/BlogPost"));
const KalkulatorPage    = lazy(() => import("@/pages/Kalkulator"));
const BrandsPage        = lazy(() => import("@/pages/BrandsPage"));
const BrandDetailPage   = lazy(() => import("@/pages/BrandDetailPage"));
const BestsellerPage    = lazy(() => import("@/pages/BestsellerPage"));

/* Pages.tsx eksportuje wiele named exports — lazy() wymaga
   default export, więc mapujemy każdy komponent osobno.    */
const AllCategoriesPage = lazy(() =>
  import("@/pages/Pages").then(m => ({ default: m.AllCategoriesPage }))
);
const ContactPage = lazy(() =>
  import("@/pages/Pages").then(m => ({ default: m.ContactPage }))
);
const AboutPage = lazy(() =>
  import("@/pages/Pages").then(m => ({ default: m.AboutPage }))
);
const ServicesPage = lazy(() =>
  import("@/pages/Pages").then(m => ({ default: m.ServicesPage }))
);
const AdminPanel = lazy(() =>
  import("@/pages/Pages").then(m => ({ default: m.AdminPanel }))
);
const PolicyPage = lazy(() =>
  import("@/pages/Pages").then(m => ({ default: m.PolicyPage }))
);

/* ─── Fallback spinner ──────────────────────────────────
   Widoczny tylko przy pierwszym wejściu na podstronę
   (zwykle < 200 ms przy łączu broadband).                 */
function PageLoader() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      style={{ background: "#080808" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{
            borderColor: "rgba(248,24,40,0.2)",
            borderTopColor: "#f81828",
          }}
        />
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">
          Ładowanie…
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route element={<Layout />}>
            <Route path="/"                     element={<Home />} />
            <Route path="/kategoria"            element={<AllCategoriesPage />} />
            <Route path="/kategoria/:slug"      element={<CategoryPage />} />
            <Route path="/produkt/:slug"        element={<ProductDetail />} />
            <Route path="/produkty"             element={<AllCategoriesPage />} />
            <Route path="/blog"                 element={<Blog />} />
            <Route path="/blog/:slug"           element={<BlogPost />} />
            <Route path="/kontakt"              element={<ContactPage />} />
            <Route path="/o-firmie"             element={<AboutPage />} />
            <Route path="/uslugi"               element={<ServicesPage />} />
            <Route path="/uslugi/:slug"         element={<ServicesPage />} />
            <Route path="/realizacje"           element={<AboutPage />} />
            <Route path="/szukaj"               element={<SearchResultsPage />} />
            <Route path="/polityka-prywatnosci" element={<PolicyPage />} />
            <Route path="/rodo"                 element={<PolicyPage />} />
            <Route path="/regulamin"            element={<PolicyPage />} />
            <Route path="/sitemap"              element={<AllCategoriesPage />} />
            <Route path="/kalkulator"           element={<KalkulatorPage />} />
            <Route path="/kalkulator/:calcId"   element={<KalkulatorPage />} />
            <Route path="/marki"                element={<BrandsPage />} />
            <Route path="/marki/:slug"          element={<BrandDetailPage />} />
            <Route path="/bestsellery"          element={<BestsellerPage />} />
            <Route path="*"                     element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
