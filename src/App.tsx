import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component, type ReactNode } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import CategoryPage from "@/pages/CategoryPage";
import ProductDetail from "@/pages/ProductDetail";
import SearchResultsPage from "@/pages/SearchResultsPage";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

class BlogErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <div style={{ background: "#080808", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
          <div style={{ maxWidth: 700, color: "#fff", fontFamily: "monospace" }}>
            <div style={{ color: "#f81828", fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>⛔ Blog — błąd renderowania</div>
            <div style={{ color: "#ff9999", marginBottom: 8 }}>{err.message}</div>
            <pre style={{ color: "#aaa", fontSize: 11, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{err.stack}</pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
import { ContactPage, AboutPage, ServicesPage, AdminPanel, AllCategoriesPage, PolicyPage } from "@/pages/Pages";
import KalkulatorPage from "@/pages/Kalkulator";
import BrandsPage from "@/pages/BrandsPage";
import BrandDetailPage from "@/pages/BrandDetailPage";
import BestsellerPage from "@/pages/BestsellerPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/kategoria" element={<AllCategoriesPage />} />
          <Route path="/kategoria/:slug" element={<CategoryPage />} />
          <Route path="/produkt/:slug" element={<ProductDetail />} />
          <Route path="/produkty" element={<AllCategoriesPage />} />
          <Route path="/blog" element={<BlogErrorBoundary><Blog /></BlogErrorBoundary>} />
          <Route path="/blog/:slug" element={<BlogErrorBoundary><BlogPost /></BlogErrorBoundary>} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/o-firmie" element={<AboutPage />} />
          <Route path="/uslugi" element={<ServicesPage />} />
          <Route path="/uslugi/:slug" element={<ServicesPage />} />
          <Route path="/realizacje" element={<AboutPage />} />
          <Route path="/szukaj" element={<SearchResultsPage />} />
          <Route path="/polityka-prywatnosci" element={<PolicyPage />} />
          <Route path="/rodo" element={<PolicyPage />} />
          <Route path="/regulamin" element={<PolicyPage />} />
          <Route path="/sitemap" element={<AllCategoriesPage />} />
          <Route path="/kalkulator" element={<KalkulatorPage />} />
          <Route path="/marki" element={<BrandsPage />} />
          <Route path="/marki/:slug" element={<BrandDetailPage />} />
          <Route path="/bestsellery" element={<BestsellerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
