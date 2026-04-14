import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import PageShell from "@/components/PageShell";
import { PROFESSOR_IMG, timeline, features } from "@/data/caseData";

function useTypewriter(text: string, speed = 45, start = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);
  return displayed;
}

function GlitchTitle() {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <h1
      className="relative font-bold leading-tight"
      style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "0.04em" }}
    >
      <span
        style={{
          display: "block",
          color: glitch ? "transparent" : "white",
          textShadow: glitch ? "2px 0 #ff1a1a, -2px 0 #0ff" : "0 0 40px rgba(255,50,50,0.25)",
          transition: "text-shadow 0.1s",
        }}
      >
        ПРОФЕССОР КОД
      </span>
      <span
        className="block"
        style={{
          color: "#cc1a1a",
          fontSize: "0.45em",
          letterSpacing: "0.25em",
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 400,
          marginTop: "0.3em",
        }}
      >
        ▸ ПРОПАЛ БЕЗ ВЕСТИ
      </span>
    </h1>
  );
}

export default function Dosie() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const typed = useTypewriter("Дело №КОД-2024 открыто. Расследование ведётся.", 45, visible);

  return (
    <PageShell>
      <section
        className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0e0e0e 0%, #111 50%, #0a0a0a 100%)" }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #cc1a1a 30%, #cc1a1a 70%, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 70% 40%, rgba(180,20,20,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div className="max-w-6xl mx-auto px-6 py-20 w-full">
          <div
            className="mb-8 flex items-center gap-4"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}
          >
            <div
              className="px-3 py-1 text-xs font-mono tracking-widest uppercase border"
              style={{ borderColor: "#cc1a1a", color: "#cc1a1a", background: "rgba(204,26,26,0.08)", fontFamily: "'IBM Plex Mono', monospace" }}
            >
              ◉ АКТИВНОЕ РАССЛЕДОВАНИЕ
            </div>
            <div className="text-xs font-mono tracking-wider" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
              ДЕЛО №КОД-2024 / 15 МАЯ 2024
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.15s" }}>
              <GlitchTitle />
              <p className="mt-6 text-sm font-mono min-h-6" style={{ color: "#cc1a1a", letterSpacing: "0.05em", fontFamily: "'IBM Plex Mono', monospace" }}>
                {typed}
                <span className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse" style={{ background: "#cc1a1a" }} />
              </p>
              <p className="mt-6 leading-relaxed" style={{ color: "#909090", fontSize: "0.95rem", maxWidth: "520px" }}>
                15 мая 2024 года профессор Алексей Владимирович Код исчез при невыясненных обстоятельствах.
                Последний раз его видели в Центральном парке. Детективное агентство{" "}
                <strong style={{ color: "#d0d0d0" }}>WebSleuth</strong> ведёт официальное расследование.
              </p>

              <div className="mt-8">
                <div className="text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
                  <span style={{ color: "#cc1a1a" }}>▸</span> ПРИМЕТЫ ПРОПАВШЕГО
                </div>
                {features.map((f) => (
                  <div key={f.label} className="flex items-start gap-3 py-2.5 border-b" style={{ borderColor: "#1a1a1a" }}>
                    <span className="text-xs font-mono tracking-wider uppercase mt-0.5 flex-shrink-0" style={{ color: "#555", width: "140px", fontFamily: "'IBM Plex Mono', monospace" }}>
                      {f.label}
                    </span>
                    <span className="text-sm" style={{ color: "#c8c8c8" }}>{f.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/karta")}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-200 hover:gap-4"
                style={{ fontFamily: "'Oswald', sans-serif", background: "#cc1a1a", color: "#fff", letterSpacing: "0.15em", border: "none", cursor: "pointer" }}
              >
                Присоединиться к поискам
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>

            <div
              className="relative"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease 0.3s" }}
            >
              <div className="relative mx-auto" style={{ maxWidth: "380px" }}>
                <div
                  className="relative overflow-hidden"
                  style={{ border: "2px solid #2a2a2a", boxShadow: "0 0 60px rgba(0,0,0,0.8)", transform: "rotate(-1.5deg)" }}
                >
                  <img
                    src={PROFESSOR_IMG}
                    alt="Профессор А.В. Код"
                    className="w-full object-cover"
                    style={{ filter: "grayscale(60%) contrast(1.1)", aspectRatio: "4/5" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: "rgba(0,0,0,0.6)" }}>
                    <p className="text-white text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Код А.В. — последнее фото</p>
                    <p className="text-gray-400 text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>14 мая 2024 / Университет</p>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute", top: "20px", right: "-20px", transform: "rotate(15deg)",
                    border: "3px solid #cc1a1a", padding: "6px 14px", color: "#cc1a1a",
                    fontFamily: "'Oswald', sans-serif", fontSize: "1.8rem", fontWeight: 700,
                    letterSpacing: "0.15em", opacity: 0.85, background: "rgba(10,10,10,0.5)",
                  }}
                >
                  ПРОПАЛ
                </div>
              </div>
              <div className="mt-4 text-center font-mono text-xs tracking-widest" style={{ color: "#444", fontFamily: "'IBM Plex Mono', monospace" }}>
                ИД ДЕЛА: КОД-2024-0515 · СОВЕРШЕННО СЕКРЕТНО
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-16">
            <div className="text-xs font-mono tracking-widest uppercase mb-6 flex items-center gap-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
              <span style={{ color: "#cc1a1a" }}>▸</span>
              ХРОНОЛОГИЯ СОБЫТИЙ
              <span style={{ flex: 1, height: "1px", background: "#1f1f1f", display: "block" }} />
            </div>
            <div className="relative">
              <div className="absolute top-0 bottom-0 w-px" style={{ left: "56px", background: "linear-gradient(180deg, #cc1a1a 0%, #2a1010 100%)" }} />
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 py-4 group"
                  style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: `all 0.6s ease ${0.5 + i * 0.08}s` }}
                >
                  <span className="text-right text-xs font-mono flex-shrink-0 pt-1" style={{ color: "#cc1a1a", width: "40px", fontFamily: "'IBM Plex Mono', monospace" }}>
                    {item.time}
                  </span>
                  <div className="flex-shrink-0 w-3 h-3 rounded-full border-2 mt-1 relative z-10 group-hover:bg-red-900" style={{ borderColor: "#cc1a1a", background: "#0a0a0a" }} />
                  <p className="text-sm leading-relaxed group-hover:text-gray-200 transition-colors" style={{ color: "#888" }}>{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
