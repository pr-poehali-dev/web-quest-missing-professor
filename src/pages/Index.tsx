import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PROFESSOR_IMG = "https://cdn.poehali.dev/projects/a6ea734c-7411-4000-bbce-ea7b99553345/files/65c5e760-2c88-4699-a61d-d75d3970e2ae.jpg";
const MAP_IMG = "https://cdn.poehali.dev/projects/a6ea734c-7411-4000-bbce-ea7b99553345/files/166937b0-4e3c-4b24-b85d-e4a94c178822.jpg";

const mapMarkers = [
  { color: "#cc1a1a", emoji: "🔴", label: "Последний сигнал телефона", time: "11:30", x: "28%", y: "38%" },
  { color: "#2563eb", emoji: "🔵", label: "Место находки очков", time: "12:00", x: "55%", y: "57%" },
  { color: "#ca8a04", emoji: "🟡", label: "Подозрительная активность", time: "13:15", x: "72%", y: "30%" },
];

const witnesses = [
  {
    img: "https://cdn.poehali.dev/projects/a6ea734c-7411-4000-bbce-ea7b99553345/files/82a257fc-7fa0-4e56-90a1-e53f677d9d18.jpg",
    name: "Мария Петровна",
    age: "68 лет",
    role: "Пенсионерка, жительница района",
    time: "11:15",
    testimony: "Видела мужчину в синей куртке и красном шарфе у фонтана. Он нервно оглядывался и говорил по телефону.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a6ea734c-7411-4000-bbce-ea7b99553345/files/6e0f6c4d-d9e5-405d-b368-a19d70ec2176.jpg",
    name: "Иван Соколов",
    age: "31 год",
    role: "Охранник парка",
    time: "12:00",
    testimony: "Обнаружил очки в траве у дорожки. Никого рядом не было. Стёкла треснуты, будто наступили.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a6ea734c-7411-4000-bbce-ea7b99553345/files/add20634-a9ff-448e-bce3-04a84a003258.jpg",
    name: "Аня Лебедева",
    age: "22 года",
    role: "Студентка, проходила мимо",
    time: "11:45",
    testimony: "Слышала странные звуки из кустов — приглушённые голоса. Один голос был явно взволнован.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a6ea734c-7411-4000-bbce-ea7b99553345/files/3434526a-efb3-4592-9fd9-5e73b00fceec.jpg",
    name: "Сергей Катков",
    age: "45 лет",
    role: "Водитель такси",
    time: "09:50",
    testimony: "Подвёз профессора до парка. Тот казался крайне взволнованным, всё время смотрел в зеркало заднего вида.",
  },
];

const news = [
  { date: "15 мая, 18:30", text: "Полиция прочесала весь парк — новых улик не обнаружено. Поиски продолжаются." },
  { date: "15 мая, 20:00", text: "Назначена награда в 100 000 рублей за информацию о местонахождении профессора Кода." },
  { date: "16 мая, 09:00", text: "К расследованию подключились федеральные эксперты по киберпреступлениям." },
];

const clues = [
  {
    img: "https://cdn.poehali.dev/projects/a6ea734c-7411-4000-bbce-ea7b99553345/files/35afe493-5585-4006-9215-c0be55d2967b.jpg",
    label: "Улика №1",
    title: "Очки в траве",
    desc: "Обнаружены охранником парка в 12:00. Стекло треснуто. Находятся на экспертизе.",
    tag: "ВЕЩДОК А-01",
  },
  {
    img: "https://cdn.poehali.dev/projects/a6ea734c-7411-4000-bbce-ea7b99553345/files/b8bea04a-a4fc-47b3-ba54-35161eae8ded.jpg",
    label: "Улика №2",
    title: "Странная записка",
    desc: "Найдена в кармане пиджака профессора, обнаруженного на скамейке. Содержит зашифрованный текст.",
    tag: "ВЕЩДОК Б-02",
  },
  {
    img: "https://cdn.poehali.dev/projects/a6ea734c-7411-4000-bbce-ea7b99553345/files/13d0b3f1-8c1d-4680-84e8-f65b86c29769.jpg",
    label: "Улика №3",
    title: "Карта с отметкой",
    desc: "Распечатка карты района с красным крестом в секторе B-7. Найдена рядом с очками.",
    tag: "ВЕЩДОК В-03",
  },
];

const versions = [
  {
    num: "01",
    title: "Похищение",
    prob: "Высокая",
    probColor: "#cc1a1a",
    detective: "Детектив Громов",
    desc: "Профессора могли похитить конкуренты за его последнее изобретение — алгоритм взлома любой криптографической системы. Угрозы в последние недели подтверждают версию.",
  },
  {
    num: "02",
    title: "Инсценировка",
    prob: "Средняя",
    probColor: "#c8830a",
    detective: "Детектив Лунина",
    desc: "Профессор мог инсценировать исчезновение, чтобы скрыться от давних врагов или передать разработки третьей стороне. Финансовые операции последних дней вызывают вопросы.",
  },
  {
    num: "03",
    title: "Провал памяти",
    prob: "Низкая",
    probColor: "#4a7c59",
    detective: "Детектив Чен",
    desc: "Из-за хронического переутомления профессор мог потерять ориентацию и уйти, не осознавая своих действий. Коллеги отмечали признаки стресса.",
  },
];

const timeline = [
  { time: "09:50", event: "Профессор сел в такси у своего дома. По словам водителя, выглядел взволнованным и нервно оглядывался." },
  { time: "10:15", event: "Замечен у входа в университет. Коллеги отмечают, что он торопился и уклонился от разговора." },
  { time: "11:30", event: "Последний зафиксированный сигнал мобильного телефона. Вышка в районе Центрального парка." },
  { time: "12:00", event: "Охранник парка обнаружил очки профессора в траве у фонтана. Следов борьбы не найдено." },
  { time: "13:15", event: "Камера видеонаблюдения зафиксировала подозрительный автомобиль без номеров рядом с парком." },
  { time: "15:00", event: "Профессор не явился на защиту дипломных работ. Коллеги подняли тревогу." },
  { time: "17:30", event: "Заявление о пропаже подано в полицию. Начато официальное расследование." },
];

const features = [
  { label: "Имя", value: "Код Алексей Владимирович" },
  { label: "Возраст", value: "52 года" },
  { label: "Рост", value: "180 см" },
  { label: "Телосложение", value: "Худощавое, сутулится" },
  { label: "Одежда", value: "Тёмно-синяя куртка, красный шарф" },
  { label: "Особые приметы", value: "Роговые очки, чёрный ноутбук в чёрном чехле" },
];

const navLinks = [
  { href: "#dosie", label: "Досье дела" },
  { href: "#uliki", label: "Улики" },
  { href: "#karta", label: "Карта поиска" },
  { href: "#kontakty", label: "Контакты" },
];

function useTypewriter(text: string, speed = 40, start = false) {
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
          position: "relative",
          color: glitch ? "transparent" : "white",
          textShadow: glitch
            ? "2px 0 #ff1a1a, -2px 0 #0ff"
            : "0 0 40px rgba(255,50,50,0.25)",
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

export default function Index() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const typed = useTypewriter(
    "Дело №КОД-2024 открыто. Расследование ведётся.",
    45,
    heroVisible
  );

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0a0a0a",
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: "#c8c8c8",
      }}
    >
      {/* ─── NOISE OVERLAY ─── */}
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

      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(8,8,8,0.97)" : "rgba(8,8,8,0.7)",
          borderBottom: scrolled ? "1px solid #1f1f1f" : "1px solid transparent",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("#dosie")}>
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

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-xs tracking-widest uppercase transition-colors duration-200 hover:text-white"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#888",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {l.label}
              </button>
            ))}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-mono font-medium tracking-widest uppercase border"
              style={{ color: "#cc1a1a", borderColor: "#cc1a1a", background: "rgba(204,26,26,0.08)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#cc1a1a" }} />
              Дело открыто
            </span>
          </div>

          <button className="md:hidden text-gray-400" onClick={() => setNavOpen(!navOpen)}>
            <Icon name={navOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ background: "rgba(8,8,8,0.97)" }}>
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-sm tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
                style={{ fontFamily: "'IBM Plex Mono', monospace", background: "none", border: "none", cursor: "pointer" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO / ДОСЬЕ ─── */}
      <section
        id="dosie"
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0e0e0e 0%, #111 50%, #0a0a0a 100%)" }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #cc1a1a 30%, #cc1a1a 70%, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 70% 40%, rgba(180,20,20,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div className="max-w-6xl mx-auto px-6 py-20 w-full">
          <div
            className="mb-8 flex items-center gap-4"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}
          >
            <div
              className="px-3 py-1 text-xs font-mono tracking-widest uppercase border"
              style={{ borderColor: "#cc1a1a", color: "#cc1a1a", background: "rgba(204,26,26,0.08)" }}
            >
              ◉ АКТИВНОЕ РАССЛЕДОВАНИЕ
            </div>
            <div className="text-xs font-mono tracking-wider" style={{ color: "#555" }}>
              ДЕЛО №КОД-2024 / 15 МАЯ 2024
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.15s" }}
            >
              <GlitchTitle />

              <p className="mt-6 text-sm font-mono min-h-6" style={{ color: "#cc1a1a", letterSpacing: "0.05em", fontFamily: "'IBM Plex Mono', monospace" }}>
                {typed}
                <span className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse" style={{ background: "#cc1a1a" }} />
              </p>

              <p className="mt-6 leading-relaxed" style={{ color: "#909090", fontSize: "0.95rem", maxWidth: "520px" }}>
                15 мая 2024 года профессор Алексей Владимирович Код исчез при невыясненных обстоятельствах.
                Последний раз его видели в Центральном парке. Детективное агентство{" "}
                <strong style={{ color: "#d0d0d0" }}>WebSleuth</strong> ведёт официальное расследование.
                Каждый ваш звонок может стать ключом к разгадке.
              </p>

              {/* Features */}
              <div className="mt-8">
                <div
                  className="text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-2"
                  style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  <span style={{ color: "#cc1a1a" }}>▸</span> ПРИМЕТЫ ПРОПАВШЕГО
                </div>
                <div className="grid grid-cols-1 gap-0">
                  {features.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-start gap-3 py-2.5 border-b"
                      style={{ borderColor: "#1a1a1a" }}
                    >
                      <span
                        className="text-xs font-mono tracking-wider uppercase mt-0.5 flex-shrink-0"
                        style={{ color: "#555", width: "140px", fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {f.label}
                      </span>
                      <span className="text-sm" style={{ color: "#c8c8c8" }}>
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollTo("#karta")}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-200 hover:gap-4"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  background: "#cc1a1a",
                  color: "#fff",
                  letterSpacing: "0.15em",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Присоединиться к поискам
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>

            {/* Right: Photo */}
            <div
              className="relative"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease 0.3s" }}
            >
              <div className="relative mx-auto" style={{ maxWidth: "380px" }}>
                <div
                  className="relative overflow-hidden"
                  style={{
                    border: "2px solid #2a2a2a",
                    boxShadow: "0 0 60px rgba(0,0,0,0.8), 0 0 0 1px #1a1a1a",
                    transform: "rotate(-1.5deg)",
                  }}
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

                {/* ПРОПАЛ stamp */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "-20px",
                    transform: "rotate(15deg)",
                    border: "3px solid #cc1a1a",
                    padding: "6px 14px",
                    color: "#cc1a1a",
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    opacity: 0.85,
                    background: "rgba(10,10,10,0.5)",
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
            <div
              className="text-xs font-mono tracking-widest uppercase mb-6 flex items-center gap-3"
              style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <span style={{ color: "#cc1a1a" }}>▸</span>
              ХРОНОЛОГИЯ СОБЫТИЙ
              <span style={{ flex: 1, height: "1px", background: "#1f1f1f", display: "block" }} />
            </div>

            <div className="relative">
              <div
                className="absolute top-0 bottom-0 w-px"
                style={{ left: "56px", background: "linear-gradient(180deg, #cc1a1a 0%, #2a1010 100%)" }}
              />
              <div className="flex flex-col gap-0">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-6 py-4 group"
                    style={{
                      opacity: heroVisible ? 1 : 0,
                      transform: heroVisible ? "translateX(0)" : "translateX(-20px)",
                      transition: `all 0.6s ease ${0.5 + i * 0.08}s`,
                    }}
                  >
                    <span
                      className="text-right text-xs font-mono flex-shrink-0 pt-1"
                      style={{ color: "#cc1a1a", letterSpacing: "0.05em", width: "40px", fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {item.time}
                    </span>
                    <div
                      className="flex-shrink-0 w-3 h-3 rounded-full border-2 mt-1 relative z-10 transition-colors group-hover:bg-red-900"
                      style={{ borderColor: "#cc1a1a", background: "#0a0a0a" }}
                    />
                    <p
                      className="text-sm leading-relaxed transition-colors group-hover:text-gray-200"
                      style={{ color: "#888" }}
                    >
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #1f1f1f 20%, #cc1a1a 50%, #1f1f1f 80%, transparent)" }} />

      {/* ─── УЛИКИ ─── */}
      <section id="uliki" className="py-24" style={{ background: "#0c0c0c" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
            <span style={{ color: "#cc1a1a" }}>▸</span> РАЗДЕЛ 2 / МАТЕРИАЛЫ ДЕЛА
          </div>
          <h2 className="font-bold text-white mb-12" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.06em" }}>
            НАЙДЕННЫЕ УЛИКИ
          </h2>

          {/* 3 фото-улики */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {clues.map((c) => (
              <div
                key={c.tag}
                className="group relative overflow-hidden"
                style={{ border: "1px solid #222", background: "#0e0e0e" }}
              >
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
            style={{ background: "#111", border: "1px solid #2a1a1a", borderLeft: "3px solid #cc1a1a" }}
          >
            <div className="text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "#cc1a1a", fontFamily: "'IBM Plex Mono', monospace" }}>
              <Icon name="FileText" size={14} />
              РАСШИФРОВКА ЗАПИСКИ / ЛАБОРАТОРИЯ ФБР · 16.05.2024
            </div>
            <div
              className="font-mono text-sm leading-relaxed p-4"
              style={{ background: "#0a0a0a", color: "#a0a0a0", fontFamily: "'IBM Plex Mono', monospace", border: "1px solid #1f1f1f" }}
            >
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
          <div>
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
                  <div
                    className="absolute top-0 right-0 text-6xl font-bold opacity-5 select-none"
                    style={{ fontFamily: "'Oswald', sans-serif", color: v.probColor, lineHeight: 1 }}
                  >
                    {v.num}
                  </div>
                  <div className="mb-3">
                    <span
                      className="text-xs font-mono px-2 py-0.5 tracking-widest uppercase"
                      style={{ background: `${v.probColor}20`, color: v.probColor, fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {v.prob} вероятность
                    </span>
                  </div>
                  <h3
                    className="text-white font-bold mb-1"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em" }}
                  >
                    Версия {v.num}: {v.title}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
                    {v.detective}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#777" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #1f1f1f 20%, #cc1a1a 50%, #1f1f1f 80%, transparent)" }} />

      {/* ─── КАРТА ПОИСКА И СВИДЕТЕЛИ ─── */}
      <section id="karta" className="py-24" style={{ background: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
            <span style={{ color: "#cc1a1a" }}>▸</span> РАЗДЕЛ 3 / ОПЕРАТИВНЫЕ ДАННЫЕ
          </div>
          <h2 className="font-bold text-white mb-10" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.06em" }}>
            КАРТА ПОИСКА И ПОКАЗАНИЯ СВИДЕТЕЛЕЙ
          </h2>

          {/* Карта */}
          <div className="mb-6 relative overflow-hidden" style={{ border: "1px solid #222", background: "#0e0e0e" }}>
            <div className="relative" style={{ aspectRatio: "16/7" }}>
              <img
                src={MAP_IMG}
                alt="Карта поиска"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(50%) brightness(0.7) contrast(1.1)" }}
              />
              {/* Оверлей */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.35)" }} />
              {/* Метки на карте */}
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

          {/* Легенда меток */}
          <div className="flex flex-wrap gap-4 mb-14">
            {mapMarkers.map((m) => (
              <div key={m.label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }}
                />
                <span className="text-sm" style={{ color: "#888" }}>
                  <span style={{ color: m.color, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem" }}>{m.time}</span>
                  {" — "}{m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Свидетели */}
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
                    <img
                      src={w.img}
                      alt={w.name}
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(60%) contrast(1.1)" }}
                    />
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
      </section>

      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #1f1f1f 20%, #cc1a1a 50%, #1f1f1f 80%, transparent)" }} />

      {/* ─── ПРЕСС-ЦЕНТР И КОНТАКТЫ ─── */}
      <section id="kontakty" className="py-24" style={{ background: "#0c0c0c" }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Логотип */}
          <div className="flex items-center gap-4 mb-10">
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{ border: "2px solid #cc1a1a", background: "rgba(204,26,26,0.06)" }}
            >
              <div className="w-10 h-10 flex items-center justify-center" style={{ background: "#cc1a1a" }}>
                <span className="text-white font-bold text-lg" style={{ fontFamily: "'Oswald', sans-serif" }}>WS</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>WEB-SLEUTH</div>
                <div className="text-xs tracking-widest" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>DETECTIVE AGENCY · EST. 2019</div>
              </div>
            </div>
          </div>

          <div className="text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-3" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
            <span style={{ color: "#cc1a1a" }}>▸</span> РАЗДЕЛ 4 / ОФИЦИАЛЬНАЯ ИНФОРМАЦИЯ
          </div>
          <h2 className="font-bold text-white mb-10" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.06em" }}>
            ОФИЦИАЛЬНЫЙ ПРЕСС-ЦЕНТР
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Лево: новости + заявление */}
            <div>
              <div className="text-xs font-mono tracking-widest uppercase mb-5 flex items-center gap-2" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
                <span style={{ color: "#cc1a1a" }}>▸</span> ОПЕРАТИВНЫЕ СВОДКИ
              </div>
              <div className="flex flex-col gap-3 mb-8">
                {news.map((n, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4"
                    style={{ background: "#0e0e0e", border: "1px solid #1f1f1f", borderLeft: "2px solid #333" }}
                  >
                    <span className="text-xs font-mono flex-shrink-0 pt-0.5" style={{ color: "#cc1a1a", fontFamily: "'IBM Plex Mono', monospace", minWidth: "110px" }}>{n.date}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{n.text}</p>
                  </div>
                ))}
              </div>

              {/* Официальное заявление */}
              <div
                className="p-5"
                style={{ border: "1px solid #2a2a2a", borderLeft: "3px solid #888", background: "#0e0e0e" }}
              >
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
            <div>
              <div className="text-xs font-mono tracking-widest uppercase mb-5 flex items-center gap-2" style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>
                <span style={{ color: "#cc1a1a" }}>▸</span> СВЯЗАТЬСЯ С АГЕНТСТВОМ
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {[
                  { icon: "Phone", label: "Телефон горячей линии", value: "8-800-555-КОД (563)", sub: "Бесплатно, круглосуточно" },
                  { icon: "Mail", label: "Email спецотдела", value: "findprofessor@websleuth.ru", sub: "Ответ в течение 2 часов" },
                  { icon: "MapPin", label: "Адрес штаба поисков", value: "ул. Детективная, 13, офис 404", sub: "Пн–Вс, 08:00–22:00" },
                  { icon: "Send", label: "Телеграм-канал", value: "@find_professor_kod", sub: "Обновления в реальном времени" },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="flex items-start gap-4 p-4 transition-colors duration-200 hover:border-gray-700"
                    style={{ background: "#0e0e0e", border: "1px solid #1f1f1f" }}
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(204,26,26,0.12)", border: "1px solid rgba(204,26,26,0.3)" }}
                    >
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

              {/* Красное предупреждение */}
              <div
                className="p-4"
                style={{ border: "1px solid rgba(204,26,26,0.5)", borderLeft: "3px solid #cc1a1a", background: "rgba(204,26,26,0.06)" }}
              >
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" size={16} style={{ color: "#cc1a1a", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <div className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: "#cc1a1a", fontFamily: "'IBM Plex Mono', monospace" }}>
                      ВНИМАНИЕ
                    </div>
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

      {/* ─── FOOTER ─── */}
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
          <span className="text-xs font-mono animate-pulse" style={{ color: "#cc1a1a", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace" }}>
            Расследование продолжается...
          </span>
        </div>
      </footer>
    </div>
  );
}