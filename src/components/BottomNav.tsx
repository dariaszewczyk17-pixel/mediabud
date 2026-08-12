import { useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, MapPin, Phone } from "lucide-react";
import { trackPhoneClick } from "@/hooks/useConversionTracking";

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const items4 = [
    {
      label: "Home",
      icon: <Home className="h-5 w-5" />,
      action: () => navigate("/"),
      isActive: pathname === "/",
    },
    {
      label: "Wycena",
      icon: <FileText className="h-5 w-5" />,
      action: () => navigate("/kontakt"),
      isActive: pathname === "/kontakt",
    },
    {
      label: "Dojazd",
      icon: <MapPin className="h-5 w-5" />,
      action: () => window.open("https://www.google.com/maps/search/?api=1&query=Media+Bud+Chemiczna+8d+Lublin", "_blank", "noopener,noreferrer"),
      isActive: false,
    },
    {
      label: "Zadzwoń",
      icon: <Phone className="h-5 w-5" />,
      action: () => { trackPhoneClick(); window.location.href = "tel:+48533553344"; },
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
