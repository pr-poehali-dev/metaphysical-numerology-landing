import { useState } from "react";
import Icon from "@/components/ui/icon";

const MASTER_PHOTO = "https://cdn.poehali.dev/projects/ff1b248f-5bab-4930-b495-cc6d5b490a92/files/0d042fd0-31ea-44e7-be00-5ddc0bf8e6f9.jpg";

function reduceNumber(n: number): number {
  while (n > 9) {
    n = String(n).split("").reduce((s, d) => s + parseInt(d), 0);
  }
  return n;
}

function calcPythagorasMatrix(dateStr: string) {
  const [day, month, year] = dateStr.split(".").map(Number);
  if (!day || !month || !year) return null;

  const digits = `${String(day).padStart(2, "0")}${String(month).padStart(2, "0")}${year}`
    .split("").map(Number);

  const sum1 = digits.reduce((a, b) => a + b, 0);
  const sum2 = reduceNumber(sum1);
  const sum3 = sum1 - 2 * digits[0];
  const sum4 = reduceNumber(sum3);

  const allDigits = [...digits, sum1, sum2, sum3, sum4].map(String).join("");

  const counts: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) counts[i] = 0;
  for (const ch of allDigits) {
    const d = parseInt(ch);
    if (d >= 1 && d <= 9) counts[d]++;
  }

  return { counts, sum1, sum2, sum3, sum4 };
}

const INTERPRETATIONS: Record<number, { title: string; desc: string }> = {
  1: { title: "Воля и характер", desc: "Отражает силу характера, уверенность в себе и способность вести за собой." },
  2: { title: "Энергия", desc: "Показывает жизненную силу, здоровье и физическую активность." },
  3: { title: "Познание", desc: "Интеллект, стремление к знаниям и способность к анализу." },
  4: { title: "Здоровье", desc: "Физическое состояние тела, иммунитет и жизненные ресурсы." },
  5: { title: "Логика", desc: "Способность к логическому мышлению и рациональным решениям." },
  6: { title: "Труд", desc: "Трудолюбие, умение работать руками и создавать материальные ценности." },
  7: { title: "Удача", desc: "Везение, интуиция и способность оказываться в нужном месте в нужное время." },
  8: { title: "Долг", desc: "Чувство ответственности, обязательность и социальная роль." },
  9: { title: "Память", desc: "Мудрость, жизненный опыт и связь с прошлым." },
};

const MATRIX_POSITIONS = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

const NAV_ITEMS = [
  { label: "О мастере", href: "#about" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Услуги", href: "#services" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
  { label: "FAQ", href: "#faq" },
];

const SERVICES = [
  {
    icon: "Star",
    title: "Матрица судьбы",
    desc: "Полный расчёт вашей матрицы Пифагора с детальной интерпретацией каждого числа.",
    price: "от 3 500 ₽",
    duration: "60 мин",
  },
  {
    icon: "Heart",
    title: "Совместимость пар",
    desc: "Анализ числовой совместимости двух людей — для отношений, бизнеса, семьи.",
    price: "от 4 500 ₽",
    duration: "75 мин",
  },
  {
    icon: "Sparkles",
    title: "Прогноз на год",
    desc: "Персональный нумерологический прогноз по месяцам с ключевыми датами.",
    price: "от 5 000 ₽",
    duration: "90 мин",
  },
  {
    icon: "Briefcase",
    title: "Нумерология имени",
    desc: "Анализ числового значения имени, фамилии и их влияния на судьбу.",
    price: "от 2 500 ₽",
    duration: "45 мин",
  },
];

const REVIEWS = [
  {
    name: "Анна К.",
    city: "Москва",
    text: "Надежда очень точно описала мой характер и предсказала важные события года. Консультация изменила мой взгляд на многое.",
    stars: 5,
  },
  {
    name: "Мария В.",
    city: "Санкт-Петербург",
    text: "Впервые познакомилась с нумерологией через Надежду. Всё чётко, без воды, с практическими советами. Рекомендую!",
    stars: 5,
  },
  {
    name: "Елена Р.",
    city: "Екатеринбург",
    text: "Заказала прогноз на год — уже три месяца следую рекомендациям. Результаты ощутимы. Спасибо за такую работу!",
    stars: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: "Как проходит консультация?",
    a: "Онлайн через Zoom или Telegram. Вы называете дату рождения, я готовлю матрицу заранее и объясняю каждое число. После — запись консультации.",
  },
  {
    q: "Нужна ли вера в нумерологию?",
    a: "Нет. Матрица Пифагора — это математический метод. Достаточно открытости и желания лучше понять себя.",
  },
  {
    q: "Как быстро вы делаете расчёт?",
    a: "Матрица готовится в течение 24 часов после оплаты. Консультацию назначаем на удобное для вас время.",
  },
  {
    q: "Есть ли гарантия результата?",
    a: "Нумерология — это инструмент самопознания, а не магия. Я гарантирую качественную и честную работу с вашими числами.",
  },
  {
    q: "Можно ли заказать расчёт в подарок?",
    a: "Да! Оформите подарочный сертификат — я пришлю его в красивом цифровом формате.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "var(--gold)", fontSize: "0.9rem" }}>★</span>
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="card-soft p-5 cursor-pointer select-none"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-golos text-sm font-medium text-warm-dark">{q}</span>
        <span
          className="text-blush flex-shrink-0"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}
        >
          <Icon name="Plus" size={18} />
        </span>
      </div>
      {open && (
        <p className="font-golos text-warm-mid mt-3 leading-relaxed fade-in" style={{ fontSize: "0.875rem" }}>
          {a}
        </p>
      )}
    </div>
  );
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [date, setDate] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcPythagorasMatrix>>(null);
  const [calcError, setCalcError] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  function handleCalculate() {
    setCalcError("");
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
      setCalcError("Введите дату в формате ДД.ММ.ГГГГ");
      return;
    }
    const r = calcPythagorasMatrix(date);
    if (!r) {
      setCalcError("Не удалось рассчитать матрицу. Проверьте дату.");
      return;
    }
    setResult(r);
  }

  function handleDateInput(val: string) {
    let v = val.replace(/\D/g, "");
    if (v.length > 2 && v.length <= 4) v = v.slice(0, 2) + "." + v.slice(2);
    else if (v.length > 4) v = v.slice(0, 2) + "." + v.slice(2, 4) + "." + v.slice(4, 8);
    setDate(v);
    setResult(null);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(247,243,238,0.93)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--sand)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-cormorant text-xl tracking-wide" style={{ color: "var(--warm-dark)" }}>
            Надежда Ельчина
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </div>
          <a href="#contacts" className="hidden md:inline-block btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.7rem" }}>
            Записаться
          </a>
          <button
            className="md:hidden"
            style={{ color: "var(--warm-mid)", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div
            className="md:hidden px-6 pb-5 flex flex-col gap-4 fade-in"
            style={{ borderTop: "1px solid var(--sand)", background: "rgba(247,243,238,0.97)" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link py-1"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#contacts" className="btn-primary text-center mt-2">Записаться</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        className="pt-32 pb-20 px-6"
        style={{ background: "linear-gradient(155deg, var(--cream) 45%, var(--blush-light) 100%)" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="fade-in">
            <p className="section-subtitle mb-4">Нумеролог · Матрица Пифагора</p>
            <h1
              className="font-cormorant mb-6 leading-tight"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 300, color: "var(--warm-dark)" }}
            >
              Числа знают{" "}
              <em style={{ color: "var(--blush)", fontStyle: "italic" }}>всё</em>
              <br />о вашей судьбе
            </h1>
            <p className="font-golos leading-relaxed mb-8 max-w-md" style={{ color: "var(--warm-mid)", fontSize: "1rem" }}>
              Я помогаю найти ответы на важные вопросы через язык чисел. Каждая дата рождения — это уникальный код вашей личности.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#calculator" className="btn-primary">Рассчитать матрицу</a>
              <a href="#services" className="btn-outline">Мои услуги</a>
            </div>
          </div>
          <div className="flex justify-center fade-in stagger-2">
            <div className="relative" style={{ width: 320, height: 380 }}>
              <div
                className="absolute"
                style={{
                  inset: 0,
                  borderRadius: "60% 40% 55% 45% / 50% 55% 45% 50%",
                  background: "var(--blush-light)",
                  zIndex: 0,
                }}
              />
              <img
                src={MASTER_PHOTO}
                alt="Надежда Ельчина"
                className="relative z-10 w-full h-full object-cover"
                style={{ borderRadius: "55% 45% 50% 50% / 48% 52% 48% 52%" }}
              />
              <div
                className="absolute z-20 card-soft px-4 py-3 flex items-center gap-3"
                style={{ bottom: 20, left: -16, boxShadow: "0 8px 32px rgba(61,47,40,0.12)" }}
              >
                <span style={{ fontSize: "1.5rem" }}>✨</span>
                <div>
                  <p className="font-cormorant" style={{ color: "var(--warm-dark)", fontSize: "0.9rem", fontWeight: 500 }}>12 лет практики</p>
                  <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.7rem" }}>более 2000 консультаций</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6" style={{ scrollMarginTop: "5rem" }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="section-subtitle mb-3">О мастере</p>
            <h2 className="section-title mb-5">Надежда Ельчина</h2>
            <p className="font-golos leading-relaxed" style={{ color: "var(--warm-mid)", fontSize: "0.95rem" }}>
              Практикующий нумеролог с 12-летним опытом. Специализируюсь на матрице Пифагора —
              древней системе, которая раскрывает потенциал личности через числа даты рождения.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "2 000+", label: "Консультаций проведено" },
              { num: "12", label: "Лет в нумерологии" },
              { num: "98%", label: "Довольных клиентов" },
            ].map((s, i) => (
              <div key={i} className={`card-soft p-8 text-center fade-in stagger-${i + 1}`}>
                <p className="font-cormorant text-blush mb-2" style={{ fontSize: "3rem" }}>{s.num}</p>
                <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.875rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 card-soft p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-cormorant mb-4" style={{ color: "var(--warm-dark)", fontSize: "1.5rem" }}>Мой путь в нумерологии</h3>
                <p className="font-golos leading-relaxed mb-4" style={{ color: "var(--warm-mid)", fontSize: "0.9rem" }}>
                  Я пришла к нумерологии через личный кризис. Цифры помогли мне найти себя и понять
                  своё предназначение. С тех пор я помогаю другим — через честную и точную работу
                  с числами без мистики и туманных предсказаний.
                </p>
                <p className="font-golos leading-relaxed" style={{ color: "var(--warm-mid)", fontSize: "0.9rem" }}>
                  Прошла обучение в Школе нумерологии Москвы, участвовала в международных
                  конференциях по нумерологии и психологии личности.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Матрица Пифагора", "Совместимость", "Нумерология имён", "Годовые прогнозы"].map((t, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl text-center"
                    style={{ background: "var(--blush-light)", border: "1px solid var(--sand)" }}
                  >
                    <p className="font-golos font-medium text-sm" style={{ color: "var(--warm-dark)" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section
        id="calculator"
        className="py-20 px-6"
        style={{ background: "var(--blush-light)", scrollMarginTop: "5rem" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Попробуйте бесплатно</p>
            <h2 className="section-title mb-4">Калькулятор матрицы Пифагора</h2>
            <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.9rem" }}>
              Введите дату рождения и получите свою числовую матрицу с кратким толкованием
            </p>
          </div>

          <div className="card-soft p-8 mb-8 max-w-md mx-auto">
            <label className="font-golos block mb-2" style={{ color: "var(--warm-mid)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Дата рождения
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={date}
                onChange={(e) => handleDateInput(e.target.value)}
                placeholder="ДД.ММ.ГГГГ"
                maxLength={10}
                className="flex-1 px-4 py-3 rounded-xl font-golos text-sm outline-none"
                style={{
                  border: "1px solid var(--sand)",
                  background: "var(--cream)",
                  color: "var(--warm-dark)",
                }}
                onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
              />
              <button className="btn-primary" onClick={handleCalculate} style={{ padding: "0.75rem 1.25rem" }}>
                Рассчитать
              </button>
            </div>
            {calcError && (
              <p className="font-golos text-xs mt-2" style={{ color: "#e05050" }}>{calcError}</p>
            )}
          </div>

          {result && (
            <div className="fade-in">
              <div className="card-soft p-8 mb-6">
                <h3 className="font-cormorant text-center mb-6" style={{ color: "var(--warm-dark)", fontSize: "1.4rem" }}>
                  Ваша матрица
                </h3>
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
                  {MATRIX_POSITIONS.map((row) =>
                    row.map((num) => {
                      const count = result.counts[num];
                      const display = count > 0 ? String(num).repeat(count) : "—";
                      return (
                        <div
                          key={num}
                          className={`matrix-cell ${count > 0 ? "filled" : ""}`}
                          title={INTERPRETATIONS[num].title}
                        >
                          <div className="text-center">
                            <div style={{ fontSize: count > 3 ? "0.9rem" : "1.1rem" }}>{display}</div>
                            <div style={{ fontSize: "0.55rem", opacity: 0.75, marginTop: 2 }}>
                              {INTERPRETATIONS[num].title}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div
                  className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 p-4 rounded-xl text-center"
                  style={{ background: "var(--cream)" }}
                >
                  {[
                    { label: "Число 1", val: result.sum1 },
                    { label: "Число 2", val: result.sum2 },
                    { label: "Число 3", val: result.sum3 },
                    { label: "Число 4", val: result.sum4 },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                      <p className="font-cormorant text-blush" style={{ fontSize: "2rem" }}>{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(INTERPRETATIONS).map(([key, { title, desc }]) => {
                  const num = parseInt(key);
                  const count = result.counts[num];
                  return (
                    <div
                      key={key}
                      className="card-soft p-5 flex gap-4 items-start"
                      style={count > 0 ? { borderColor: "var(--blush)", borderWidth: "1.5px" } : {}}
                    >
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-cormorant"
                        style={{
                          fontSize: "1.2rem",
                          background: count > 0 ? "var(--blush)" : "var(--blush-light)",
                          color: count > 0 ? "white" : "var(--warm-mid)",
                        }}
                      >
                        {num}
                      </div>
                      <div>
                        <p className="font-golos font-medium text-sm mb-1" style={{ color: "var(--warm-dark)" }}>{title}</p>
                        <p className="font-golos leading-relaxed" style={{ color: "var(--warm-mid)", fontSize: "0.8rem" }}>
                          {count > 0
                            ? `У вас ${count} ${count === 1 ? "единица" : "единицы"}: ${desc}`
                            : `Это число отсутствует. ${desc}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-8">
                <p className="font-golos mb-4" style={{ color: "var(--warm-mid)", fontSize: "0.9rem" }}>
                  Хотите узнать глубинный смысл своей матрицы?
                </p>
                <a href="#contacts" className="btn-primary">Записаться на консультацию</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6" style={{ scrollMarginTop: "5rem" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Услуги</p>
            <h2 className="section-title">Чем я могу помочь</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className={`card-soft p-8 fade-in stagger-${i + 1}`}>
                <div className="flex items-start gap-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--blush-light)" }}
                  >
                    <Icon name={s.icon} fallback="Star" size={22} style={{ color: "var(--blush)" }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-cormorant mb-2" style={{ color: "var(--warm-dark)", fontSize: "1.3rem" }}>{s.title}</h3>
                    <p className="font-golos leading-relaxed mb-4" style={{ color: "var(--warm-mid)", fontSize: "0.875rem" }}>
                      {s.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-cormorant text-blush" style={{ fontSize: "1.3rem" }}>{s.price}</span>
                        <span className="font-golos ml-3" style={{ color: "var(--warm-mid)", fontSize: "0.75rem" }}>{s.duration}</span>
                      </div>
                      <a href="#contacts" className="btn-outline" style={{ padding: "0.45rem 1.1rem", fontSize: "0.7rem" }}>
                        Записаться
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        id="reviews"
        className="py-20 px-6"
        style={{ background: "var(--sand)", scrollMarginTop: "5rem" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Отзывы</p>
            <h2 className="section-title">Что говорят клиенты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className={`card-soft p-7 fade-in stagger-${i + 1}`}>
                <StarRating count={r.stars} />
                <p className="font-golos leading-relaxed mb-5" style={{ color: "var(--warm-dark)", fontSize: "0.9rem" }}>
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-cormorant"
                    style={{ background: "var(--blush)", color: "white", fontSize: "1rem" }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-golos font-medium text-sm" style={{ color: "var(--warm-dark)" }}>{r.name}</p>
                    <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.72rem" }}>{r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-6" style={{ scrollMarginTop: "5rem" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Контакты</p>
            <h2 className="section-title">Записаться на консультацию</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="card-soft p-8">
              <h3 className="font-cormorant mb-6" style={{ color: "var(--warm-dark)", fontSize: "1.4rem" }}>Оставьте заявку</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-golos block mb-2" style={{ color: "var(--warm-mid)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Ваше имя</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Как вас зовут?"
                    className="w-full px-4 py-3 rounded-xl font-golos text-sm outline-none"
                    style={{ border: "1px solid var(--sand)", background: "var(--cream)", color: "var(--warm-dark)" }}
                  />
                </div>
                <div>
                  <label className="font-golos block mb-2" style={{ color: "var(--warm-mid)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Телефон или Telegram</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 900 000-00-00"
                    className="w-full px-4 py-3 rounded-xl font-golos text-sm outline-none"
                    style={{ border: "1px solid var(--sand)", background: "var(--cream)", color: "var(--warm-dark)" }}
                  />
                </div>
                <div>
                  <label className="font-golos block mb-2" style={{ color: "var(--warm-mid)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Комментарий</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Какой вопрос вас волнует больше всего?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl font-golos text-sm outline-none resize-none"
                    style={{ border: "1px solid var(--sand)", background: "var(--cream)", color: "var(--warm-dark)" }}
                  />
                </div>
                <button className="btn-primary w-full">
                  Отправить заявку
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-5 justify-center">
              {[
                { icon: "MessageCircle", label: "Telegram", value: "@nadezhda_numerolog", desc: "Напишите в любое время" },
                { icon: "Phone", label: "WhatsApp", value: "+7 900 000-00-00", desc: "Пн–Пт, 10:00–20:00" },
                { icon: "Mail", label: "Email", value: "info@numerolog.ru", desc: "Ответ в течение дня" },
                { icon: "Video", label: "Формат", value: "Онлайн (Zoom / Telegram)", desc: "Удобно из любой точки мира" },
              ].map((c, i) => (
                <div key={i} className="card-soft p-5 flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--blush-light)" }}
                  >
                    <Icon name={c.icon} fallback="Mail" size={20} style={{ color: "var(--blush)" }} />
                  </div>
                  <div>
                    <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{c.label}</p>
                    <p className="font-golos font-medium text-sm" style={{ color: "var(--warm-dark)" }}>{c.value}</p>
                    <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.72rem" }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-20 px-6"
        style={{ background: "var(--blush-light)", scrollMarginTop: "5rem" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">FAQ</p>
            <h2 className="section-title">Частые вопросы</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-10 px-6 text-center"
        style={{ borderTop: "1px solid var(--sand)", background: "var(--cream)" }}
      >
        <p className="font-cormorant text-xl mb-2" style={{ color: "var(--warm-dark)" }}>Надежда Ельчина</p>
        <p className="font-golos mb-4" style={{ color: "var(--warm-mid)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Нумеролог · Матрица Пифагора
        </p>
        <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.75rem" }}>
          © {new Date().getFullYear()} Все права защищены
        </p>
      </footer>
    </div>
  );
};

export default Index;