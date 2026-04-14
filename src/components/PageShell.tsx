import NavBar from "@/components/NavBar";

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0a0a0a",
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: "#c8c8c8",
      }}
    >
      {/* Noise overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 999,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.35,
        }}
      />
      <NavBar />
      {children}

      {/* Footer */}
      <footer className="py-8" style={{ background: "#080808", borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-sm" style={{ background: "#cc1a1a" }}>
              <span className="text-white text-xs font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>WS</span>
            </div>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#444" }}
            >
              © 2023 Детективное агентство WebSleuth. Все права защищены.
            </span>
          </div>
          <span
            className="text-xs font-mono animate-pulse"
            style={{ color: "#cc1a1a", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Расследование продолжается...
          </span>
        </div>
      </footer>
    </div>
  );
}
