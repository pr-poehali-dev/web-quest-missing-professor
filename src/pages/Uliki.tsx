import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import PageShell from "@/components/PageShell";
import { clues, versions } from "@/data/caseData";

export default function Uliki() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageShell>
      <section className="pt-28 pb-24" style={{ background: "linear-gradient(160deg, #0e0e0e 0%, #0c0c0c 100%)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #cc1a1a 30%, #cc1a1a 70%, transparent)" }} />

        <div className="max-w-6xl mx-auto px-6">
          <div
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}
          >
            <div className="text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
              <span style={{ color: "#cc1a1a" }}>▸</span> РАЗДЕЛ 2 / МАТЕРИАЛЫ ДЕЛА
            </div>
            <h1 className="font-bold text-white mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.06em" }}>
              НАЙДЕННЫЕ УЛИКИ
            </h1>
            <div style={{ height: "2px", width: "80px", background: "#cc1a1a", marginBottom: "3rem" }} />
          </div>

          {/* 3 фото-улики */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.15s" }}
          >
            {clues.map((c) => (
              <div key={c.tag} className="group relative overflow-hidden" style={{ border: "1px solid #222", background: "#0e0e0e" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "grayscale(40%) contrast(1.1)" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)" }} />
                  <div
                    className="absolute top-3 left-3 px-2 py-1 text-xs font-mono tracking-widest"
                    style={{ background: "rgba(204,26,26,0.9)", color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {c.tag}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-mono mb-1" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>{c.label}</div>
                  <h3 className="text-white font-bold mb-2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", letterSpacing: "0.06em" }}>{c.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#777" }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Расшифровка записки */}
          <div
            className="mb-16 p-6 md:p-8"
            style={{ background: "#111", border: "1px solid #2a1a1a", borderLeft: "3px solid #cc1a1a", opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.3s" }}
          >
            <div className="text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "#cc1a1a", fontFamily: "'IBM Plex Mono', monospace" }}>
              <Icon name="FileText" size={14} />
              РАСШИФРОВКА ЗАПИСКИ / ЛАБОРАТОРИЯ ФБР · 16.05.2024
            </div>
            <div className="font-mono text-sm leading-relaxed p-4" style={{ background: "#0a0a0a", color: "#a0a0a0", fontFamily: "'IBM Plex Mono', monospace", border: "1px solid #1f1f1f" }}>
              <p style={{ color: "#cc1a1a", marginBottom: "8px" }}>[ОРИГИНАЛ — зашифрован]</p>
              <p style={{ marginBottom: "12px", color: "#555" }}>«7-Б · Σ≠∅ · когда часы пробьют полночь · сектор Омега · ключ у того, кто не спит»</p>
              <p style={{ color: "#cc1a1a", marginBottom: "8px" }}>[РАСШИФРОВКА — частичная]</p>
              <p>Предположительно указывает на место встречи в секторе B-7 парка в полночь. «Ключ» может означать USB-накопитель с разработками профессора. Личность получателя устанавливается.</p>
            </div>
            <p className="text-xs mt-3" style={{ color: "#444", fontFamily: "'IBM Plex Mono', monospace" }}>
              Эксперт-криптограф: Д.В. Назаров · Степень достоверности расшифровки: 73%
            </p>
          </div>

          {/* Версии следствия */}
          <div style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.45s" }}>
            <div className="text-xs font-mono tracking-widest uppercase mb-6 flex items-center gap-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
              <span style={{ color: "#cc1a1a" }}>▸</span>
              ОСНОВНЫЕ ВЕРСИИ СЛЕДСТВИЯ
              <span style={{ flex: 1, height: "1px", background: "#1f1f1f", display: "block" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {versions.map((v) => (
                <div
                  key={v.num}
                  className="p-6 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#0e0e0e", border: "1px solid #1f1f1f", borderTop: `2px solid ${v.probColor}` }}
                >
                  <div className="absolute top-0 right-0 text-6xl font-bold opacity-5 select-none" style={{ fontFamily: "'Oswald', sans-serif", color: v.probColor, lineHeight: 1 }}>
                    {v.num}
                  </div>
                  <div className="mb-3">
                    <span className="text-xs font-mono px-2 py-0.5 tracking-widest uppercase" style={{ background: `${v.probColor}20`, color: v.probColor, fontFamily: "'IBM Plex Mono', monospace" }}>
                      {v.prob} вероятность
                    </span>
                  </div>
                  <h3 className="text-white font-bold mb-1" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em" }}>
                    Версия {v.num}: {v.title}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>{v.detective}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#777" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
