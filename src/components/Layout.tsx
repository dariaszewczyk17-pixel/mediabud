import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { WycenaDrawer } from "./Commerce";
import { Toaster } from "sonner";
import { LOCAL_BUSINESS_JSONLD } from "@/lib/localBusiness";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ── LocalBusiness JSON-LD — globalny na każdej podstronie ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSONLD) }}
      />
      {/* ── Skip-link — Lighthouse accessibility ── */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:text-sm focus:font-bold focus:outline-none"
        style={{ background: "#f81828", boxShadow: "0 0 0 3px rgba(248,24,40,0.4)" }}
      >
        Pomiń do treści
      </a>

      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WycenaDrawer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
