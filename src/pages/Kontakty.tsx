import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import PageShell from "@/components/PageShell";
import { news } from "@/data/caseData";

export default function Kontakty() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageShell>
      <section className="pt-28 pb-24" style={{ background: "linear-gradient(160deg, #0c0c0c 0%, #0e0e0e 100%)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #cc1a1a 30%, #cc1a1a 70%, transparent)" }} />

        <div className="max-w-6xl mx-auto px-6">
          {/* Логотип */}
          <div
            className="flex items-center gap-4 mb-10"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}
          >
            <div className="flex items-center gap-3 px-5 py-3" style={{ border: "2px solid #cc1a1a", background: "rgba(204,26,26,0.06)" }}>
              <div className="w-10 h-10 flex items-center justify-center" style={{ background: "#cc1a1a" }}>
                <span className="text-white font-bold text-lg" style={{ fontFamily: "'Oswald', sans-serif" }}>WS</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>WEB-SLEUTH</div>
                <div className="text-xs tracking-widest" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>DETECTIVE AGENCY · EST. 2019</div>
              </div>
            </div>
          </div>

          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.1s" }}>
            <div className="text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
              <span style={{ color: "#cc1a1a" }}>▸</span> РАЗДЕЛ 4 / ОФИЦИАЛЬНАЯ ИНФОРМАЦИЯ
            </div>
            <h1 className="font-bold text-white mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.06em" }}>
              ОФИЦИАЛЬНЫЙ ПРЕСС-ЦЕНТР
            </h1>
            <div style={{ height: "2px", width: "80px", background: "#cc1a1a", marginBottom: "3rem" }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Лево: новости + заявление */}
            <div style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.2s" }}>
              <div className="text-xs font-mono tracking-widest uppercase mb-5 flex items-center gap-2" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
                <span style={{ color: "#cc1a1a" }}>▸</span> ОПЕРАТИВНЫЕ СВОДКИ
              </div>
              <div className="flex flex-col gap-3 mb-8">
                {news.map((n, i) => (
                  <div key={i} className="flex gap-4 p-4" style={{ background: "#0e0e0e", border: "1px solid #1f1f1f", borderLeft: "2px solid #333" }}>
                    <span className="text-xs font-mono flex-shrink-0 pt-0.5" style={{ color: "#cc1a1a", fontFamily: "'IBM Plex Mono', monospace", minWidth: "110px" }}>{n.date}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{n.text}</p>
                  </div>
                ))}
              </div>
              <div className="p-5" style={{ border: "1px solid #2a2a2a", borderLeft: "3px solid #888", background: "#0e0e0e" }}>
                <div className="text-xs font-mono tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: "#888", fontFamily: "'IBM Plex Mono', monospace" }}>
                  <Icon name="Shield" size={12} />
                  ОФИЦИАЛЬНОЕ ЗАЯВЛЕНИЕ ПОЛИЦИИ
                </div>
                <p className="text-sm leading-relaxed italic" style={{ color: "#aaa" }}>
                  «Уважаемые граждане! Ведутся активные поиски. Просим всех, кто обладает какой-либо информацией,
                  немедленно связаться по указанным ниже контактам. Не пытайтесь задерживать подозреваемых самостоятельно!»
                </p>
                <p className="text-xs mt-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
                  — Пресс-служба УМВД, 16 мая 2024
                </p>
              </div>
            </div>

            {/* Право: контакты */}
            <div style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.3s" }}>
              <div className="text-xs font-mono tracking-widest uppercase mb-5 flex items-center gap-2" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
                <span style={{ color: "#cc1a1a" }}>▸</span> СВЯЗАТЬСЯ С АГЕНТСТВОМ
              </div>
              <div className="flex flex-col gap-3 mb-6">
                {[
                  { icon: "Phone", label: "Телефон горячей линии", value: "8-800-555-КОД (563)", sub: "Бесплатно, круглосуточно" },
                  { icon: "Mail", label: "Email спецотдела", value: "findprofessor@websleuth.ru", sub: "Ответ в течение 2 часов" },
                  { icon: "MapPin", label: "Адрес штаба поисков", value: "ул. Пушкина, дом Колотушкина", sub: "Пн–Вс, 08:00–22:00" },
                  { icon: "Send", label: "Телеграм-канал", value: "@find_professor_kod", sub: "Обновления в реальном времени" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4 p-4 transition-colors duration-200 hover:border-gray-700" style={{ background: "#0e0e0e", border: "1px solid #1f1f1f" }}>
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(204,26,26,0.12)", border: "1px solid rgba(204,26,26,0.3)" }}>
                      <Icon name={c.icon} size={15} style={{ color: "#cc1a1a" }} />
                    </div>
                    <div>
                      <div className="text-xs font-mono mb-0.5" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>{c.label}</div>
                      <div className="text-white font-medium" style={{ fontSize: "0.9rem" }}>{c.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#555" }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4" style={{ border: "1px solid rgba(204,26,26,0.5)", borderLeft: "3px solid #cc1a1a", background: "rgba(204,26,26,0.06)" }}>
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" size={16} style={{ color: "#cc1a1a", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <div className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: "#cc1a1a", fontFamily: "'IBM Plex Mono', monospace" }}>ВНИМАНИЕ</div>
                    <p className="text-sm leading-relaxed" style={{ color: "#c8c8c8" }}>
                      Распространяется ложная информация о похитителях. Доверяйте только официальным источникам агентства WebSleuth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
