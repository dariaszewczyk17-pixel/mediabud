import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, ClipboardList, Phone } from "lucide-react";
import { useWycena } from "@/hooks/useWycena";

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { items, openDrawer } = useWycena();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const active = (path: string) => pathname === path || pathname.startsWith(path + "/");

  const items4 = [
    {
      label: "Home",
      icon: <Home className="h-5 w-5" />,
      action: () => navigate("/"),
      isActive: pathname === "/",
    },
    {
      label: "Szukaj",
      icon: <Search className="h-5 w-5" />,
      action: () => navigate("/szukaj"),
      isActive: active("/szukaj"),
    },
    {
      label: "Wycena",
      icon: (
        <span className="relative inline-flex">
          <ClipboardList className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-2.5 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#f81828] px-0.5 text-[9px] font-black text-white shadow">
              {count}
            </span>
          )}
        </span>
      ),
      action: openDrawer,
      isActive: false,
    },
    {
      label: "Zadzwoń",
      icon: <Phone className="h-5 w-5" />,
      action: () => { window.location.href = "tel:+48533553344"; },
      isActive: false,
    },
  ];

  return (
    <nav
      aria-label="Nawigacja mobilna"
      className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden"
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(248,24,40,0.18)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.6)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {items4.map(({ label, icon, action, isActive }) => (
        <button
          key={label}
          onClick={action}
          aria-label={label}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors"
          style={{ color: isActive ? "#f81828" : "#666" }}
        >
          <span style={{ color: isActive ? "#f81828" : "#666" }}>{icon}</span>
          {label}
        </button>
      ))}
    </nav>
  );
}
