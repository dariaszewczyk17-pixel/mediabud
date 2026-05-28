import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import CategoryPage from "@/pages/CategoryPage";
import ProductDetail from "@/pages/ProductDetail";
import SearchResultsPage from "@/pages/SearchResultsPage";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import { ContactPage, AboutPage, ServicesPage, AdminPanel, AllCategoriesPage, PolicyPage } from "@/pages/Pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/kategoria" element={<AllCategoriesPage />} />
          <Route path="/kategoria/:slug" element={<CategoryPage />} />
          <Route path="/produkt/:slug" element={<ProductDetail />} />
          <Route path="/produkty" element={<AllCategoriesPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
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
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
