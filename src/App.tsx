import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import NotFoundPage from "@/pages/NotFoundPage";

/* ─── Lazy-loaded pages ─────────────────────────────────
   Każda strona ładuje się osobnym chunk-em — Vite rozbija
   dynamiczne importy na pliki .js ładowane na żądanie.    */
const Home              = lazy(() => import("@/pages/Home"));
const CategoryPage      = lazy(() => import("@/pages/CategoryPage"));
const ProductDetail     = lazy(() => import("@/pages/ProductDetail"));
const SearchResultsPage = lazy(() => import("@/pages/SearchResultsPage"));
const Blog              = lazy(() => import("@/pages/Blog"));
const BlogPost          = lazy(() => import("@/pages/BlogPost"));
const KalkulatorPage    = lazy(() => import("@/pages/Kalkulator"));
const BrandsPage        = lazy(() => import("@/pages/BrandsPage"));
const BrandDetailPage   = lazy(() => import("@/pages/BrandDetailPage"));
const BestsellerPage    = lazy(() => import("@/pages/BestsellerPage"));

/* Osobne pliki — każdy ma własny chunk, bez wspólnego 119 KB Pages.js */
const AllCategoriesPage = lazy(() => import("@/pages/AllCategoriesPage"));
const ContactPage       = lazy(() => import("@/pages/ContactPage"));
const AboutPage         = lazy(() => import("@/pages/AboutPage"));
const ServicesPage      = lazy(() => import("@/pages/ServicesPage"));
const AdminPanel        = lazy(() => import("@/pages/AdminPanel"));
const PolicyPage        = lazy(() => import("@/pages/PolicyPage"));

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
