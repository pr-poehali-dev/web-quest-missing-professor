import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { navLinks } from "@/data/caseData";

export default function NavBar() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,8,8,0.97)" : "rgba(8,8,8,0.85)",
        borderBottom: scrolled ? "1px solid #1f1f1f" : "1px solid transparent",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div
            className="w-8 h-8 flex items-center justify-center rounded-sm"
            style={{ background: "#cc1a1a" }}
          >
            <span className="text-white text-sm font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>WS</span>
          </div>
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: "0.12em",
              fontSize: "0.85rem",
              color: "#e0e0e0",
            }}
          >
            WEB-SLEUTH
          </span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={({ isActive }) => ({
                fontFamily: "'IBM Plex Mono', monospace",
                color: isActive ? "#cc1a1a" : "#888",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                borderBottom: isActive ? "1px solid #cc1a1a" : "1px solid transparent",
                paddingBottom: "2px",
              })}
            >
              {l.label}
            </NavLink>
          ))}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-mono font-medium tracking-widest uppercase border"
            style={{ color: "#cc1a1a", borderColor: "#cc1a1a", background: "rgba(204,26,26,0.08)", fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#cc1a1a" }} />
            Дело открыто
          </span>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden text-gray-400" onClick={() => setNavOpen(!navOpen)}>
          <Icon name={navOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {navOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ background: "rgba(8,8,8,0.97)" }}>
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setNavOpen(false)}
              className="text-left text-sm tracking-widest uppercase transition-colors"
              style={({ isActive }) => ({
                fontFamily: "'IBM Plex Mono', monospace",
                color: isActive ? "#cc1a1a" : "#666",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
