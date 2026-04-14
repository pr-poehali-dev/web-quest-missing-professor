import { useState, useEffect } from "react";
import PageShell from "@/components/PageShell";
import { MAP_IMG, mapMarkers, witnesses } from "@/data/caseData";

export default function Karta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageShell>
      <section className="pt-28 pb-24" style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #0e0e0e 100%)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #cc1a1a 30%, #cc1a1a 70%, transparent)" }} />

        <div className="max-w-6xl mx-auto px-6">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
            <div className="text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
              <span style={{ color: "#cc1a1a" }}>▸</span> РАЗДЕЛ 3 / ОПЕРАТИВНЫЕ ДАННЫЕ
            </div>
            <h1 className="font-bold text-white mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.06em" }}>
              КАРТА ПОИСКА И ПОКАЗАНИЯ СВИДЕТЕЛЕЙ
            </h1>
            <div style={{ height: "2px", width: "80px", background: "#cc1a1a", marginBottom: "3rem" }} />
          </div>

          {/* Карта */}
          <div
            className="mb-6 relative overflow-hidden"
            style={{ border: "1px solid #222", background: "#0e0e0e", opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.15s" }}
          >
            <div className="relative" style={{ aspectRatio: "16/7" }}>
              <img src={MAP_IMG} alt="Карта поиска" className="w-full h-full object-cover" style={{ filter: "grayscale(50%) brightness(0.7) contrast(1.1)" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.35)" }} />
              {mapMarkers.map((m) => (
                <div
                  key={m.label}
                  className="absolute flex flex-col items-center group"
                  style={{ left: m.x, top: m.y, transform: "translate(-50%, -50%)" }}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 animate-pulse flex items-center justify-center"
                    style={{ borderColor: m.color, background: `${m.color}55`, boxShadow: `0 0 12px ${m.color}88` }}
                  />
                  <div
                    className="mt-1 px-2 py-0.5 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(0,0,0,0.85)", color: m.color, fontFamily: "'IBM Plex Mono', monospace", border: `1px solid ${m.color}55` }}
                  >
                    {m.time}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 text-xs font-mono" style={{ background: "#0e0e0e", color: "#444", fontFamily: "'IBM Plex Mono', monospace", borderTop: "1px solid #1a1a1a" }}>
              КАРТА РАЙОНА · МАСШТАБ 1:5000 · ОБНОВЛЕНО 16.05.2024
            </div>
          </div>

          {/* Легенда */}
          <div className="flex flex-wrap gap-4 mb-14" style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.25s" }}>
            {mapMarkers.map((m) => (
              <div key={m.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                <span className="text-sm" style={{ color: "#888" }}>
                  <span style={{ color: m.color, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem" }}>{m.time}</span>
                  {" — "}{m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Свидетели */}
          <div style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.35s" }}>
            <div className="text-xs font-mono tracking-widest uppercase mb-6 flex items-center gap-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
              <span style={{ color: "#cc1a1a" }}>▸</span>
              ПОКАЗАНИЯ СВИДЕТЕЛЕЙ
              <span style={{ flex: 1, height: "1px", background: "#1f1f1f", display: "block" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {witnesses.map((w, i) => (
                <div
                  key={w.name}
                  className="flex gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#0e0e0e", border: "1px solid #1f1f1f" }}
                >
                  <div className="flex-shrink-0">
                    <div className="relative overflow-hidden" style={{ width: "72px", height: "72px", border: "2px solid #2a2a2a" }}>
                      <img src={w.img} alt={w.name} className="w-full h-full object-cover" style={{ filter: "grayscale(60%) contrast(1.1)" }} />
                      <div
                        className="absolute bottom-0 left-0 right-0 text-center text-xs font-mono"
                        style={{ background: "rgba(0,0,0,0.8)", color: "#cc1a1a", fontFamily: "'IBM Plex Mono', monospace", padding: "1px" }}
                      >
                        СВ-0{i + 1}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <h4 className="font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.04em" }}>{w.name}</h4>
                      <span className="text-xs font-mono flex-shrink-0" style={{ color: "#cc1a1a", fontFamily: "'IBM Plex Mono', monospace" }}>{w.time}</span>
                    </div>
                    <p className="text-xs mb-2" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>{w.age} · {w.role}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#888" }}>«{w.testimony}»</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
