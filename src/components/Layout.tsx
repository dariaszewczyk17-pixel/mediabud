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
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WycenaDrawer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
