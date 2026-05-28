import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import CategoryPage from "@/pages/CategoryPage";
import ProductDetail from "@/pages/ProductDetail";
import SearchResultsPage from "@/pages/SearchResultsPage";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import { ContactPage, AboutPage, ServicesPage, AdminPanel } from "@/pages/Pages";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/kategoria/:slug" element={<CategoryPage />} />
          <Route path="/produkt/:slug" element={<ProductDetail />} />
          <Route path="/produkty" element={<CategoryPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/o-firmie" element={<AboutPage />} />
          <Route path="/uslugi" element={<ServicesPage />} />
          <Route path="/uslugi/:slug" element={<ServicesPage />} />
          <Route path="/realizacje" element={<AboutPage />} />
          <Route path="/szukaj" element={<SearchResultsPage />} />
          <Route path="/polityka-prywatnosci" element={<ContactPage />} />
          <Route path="/rodo" element={<ContactPage />} />
          <Route path="/regulamin" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
