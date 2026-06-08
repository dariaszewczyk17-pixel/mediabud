import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import { Toaster } from "sonner";
import { LOCAL_BUSINESS_JSONLD } from "@/lib/localBusiness";

/* WycenaDrawer lazy — wyciąga Commerce.tsx (~40 kB) z critical path */
const WycenaDrawer = lazy(() =>
  import("./Commerce").then((m) => ({ default: m.WycenaDrawer }))
);

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
      <main id="main" className="flex-1 pb-16 lg:pb-0">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center" style={{ background: "#080808" }}>
            <div className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(248,24,40,0.2)", borderTopColor: "#f81828" }} />
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}><WycenaDrawer /></Suspense>
      <BottomNav />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
