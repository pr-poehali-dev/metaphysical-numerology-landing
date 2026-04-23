import { useState } from "react";
import Icon from "@/components/ui/icon";

const MASTER_PHOTO = "https://cdn.poehali.dev/projects/ff1b248f-5bab-4930-b495-cc6d5b490a92/bucket/6f2c63e3-49d0-422b-bfb4-f9bf2086a17f.jpg";

const NAV_ITEMS = [
  { label: "О мастере", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const FAQ_ITEMS = [
  { q: "Это бесплатно?", a: "Да, тест НЕЙРО ID — бесплатный. Расшифровка результата и полные разборы — платные." },
  { q: "Что я узнаю о себе?", a: "Ведущий гормон, тип мозга (рептильный/лимбический/неокортекс), уровень энергии и буквенно-числовой код вашего потока." },
  { q: "Как я получу расшифровку?", a: "Я напишу вам в Telegram после теста. Вы оплачиваете 1500 руб. — и я присылаю PDF на 5 страниц." },
  { q: "Что такое «Инструкция к человеку»?", a: "Это моя авторская система, которая соединяет нумерологию, нейрофизиологию и ритмологию в один экшн-план под ваш тип." },
  { q: "Сколько стоит полный разбор?", a: "Базовый — 25 000 руб., премиум — 50 000 руб., VIP-сопровождение на год — от 150 000 руб." },
  { q: "Есть ли гарантия?", a: "Да. Вы получаете чёткий письменный план. Если после разбора у вас не появится ясность — я верну деньги." },
];

const SERVICES_DATA = [
  {
    title: "Расшифровка NEURO ID",
    desc: "PDF 5 страниц: ваш код, гормон, тип мозга, 3 шага",
    price: "1 500 руб.",
    premium: false,
    icon: "Brain",
  },
  {
    title: "«Инструкция к человеку». Базовый разбор",
    desc: "PDF 15 стр. + 1 созвон 60 мин: квадрат Пифагора — программа на воплощение, творческий потенциал, темперамент, поддержка извне, денежный канал, миссия, экшн-план на 3 месяца",
    price: "25 000 руб.",
    premium: false,
    icon: "BookOpen",
  },
  {
    title: "«Инструкция к человеку». Премиум",
    desc: "Всё из базового + мандала ФИО + персональный числовой код + полная матрица судьбы + экшн-план на год",
    price: "50 000 руб.",
    premium: true,
    icon: "Sparkles",
    details: [
      "Задачи и сценарии из прошлого, которые повторяются у вас сейчас",
      "Через какие энергии к вам приходят деньги (и почему сейчас они не идут)",
      "Какие энергии нужно включить, чтобы доход вырос",
      "Что именно блокирует ваши финансы прямо сейчас и как убрать блок",
      "Зону родительско-детских отношений (если это ваш запрос)",
    ],
  },
  {
    title: "VIP «Год под ключ»",
    desc: "Премиум + 12 ежемесячных созвонов + чат",
    price: "150 000 руб.",
    premium: false,
    icon: "Crown",
  },
  {
    title: "Клуб «Инструкция к человеку»",
    desc: "Вебинары 1 раз в неделю + закрытый чат",
    price: "3 500 руб./мес",
    premium: false,
    icon: "Users",
  },
];

const CASES = [
  {
    name: "Елена, 42 года",
    before: "Доход 80 000 руб., чувство, что «стою на месте»",
    got: "НЕЙРО ID (2С) + полную «Инструкцию к человеку»",
    after: "Через 2 месяца запустила онлайн-курс, доход 150 000 руб.",
  },
  {
    name: "Олег, 38 лет",
    before: "Кризис в бизнесе, не понимал, куда двигаться",
    got: "Экшн-план на год с учётом задач на воплощение и ведущего гормона",
    after: "Выручка выросла на 40% за 3 месяца",
  },
  {
    name: "Кристина, 36 лет",
    before: "Развод после 12 лет брака, не понимала, как жить дальше",
    got: "НЕЙРО ID (4С) + полную «Инструкцию к человеку» + экшн-план на 2 года",
    after: "Новые отношения, увеличила доход в 2 раза, запустила онлайн-проект",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="card-soft p-5 cursor-pointer select-none"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-golos text-sm font-medium" style={{ color: "var(--warm-dark)" }}>{q}</span>
        <span
          className="flex-shrink-0"
          style={{ color: "var(--blush)", transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}
        >
          <Icon name="Plus" size={18} />
        </span>
      </div>
      {open && (
        <p className="font-golos leading-relaxed mt-3 fade-in" style={{ color: "var(--warm-mid)", fontSize: "0.875rem" }}>
          {a}
        </p>
      )}
    </div>
  );
}

function ServiceCard({ s }: { s: typeof SERVICES_DATA[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card-soft p-7 flex flex-col gap-3" style={s.premium ? { border: "2px solid var(--blush)" } : {}}>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--blush-light)" }}>
          <Icon name={s.icon} fallback="Star" size={20} style={{ color: "var(--blush)" }} />
        </div>
        {s.premium && (
          <span className="font-golos text-xs px-3 py-1 rounded-full" style={{ background: "var(--blush)", color: "white", letterSpacing: "0.05em" }}>
            Хит
          </span>
        )}
      </div>
      <h3 className="font-cormorant" style={{ color: "var(--warm-dark)", fontSize: "1.25rem" }}>{s.title}</h3>
      <p className="font-golos leading-relaxed" style={{ color: "var(--warm-mid)", fontSize: "0.875rem" }}>{s.desc}</p>
      {s.details && (
        <div>
          <button
            className="font-golos text-xs underline cursor-pointer"
            style={{ color: "var(--blush)", background: "none", border: "none" }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Скрыть подробности ▲" : "Подробнее о пакете ▼"}
          </button>
          {expanded && (
            <ul className="mt-3 flex flex-col gap-2 fade-in">
              {s.details.map((d, i) => (
                <li key={i} className="font-golos flex gap-2" style={{ color: "var(--warm-mid)", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--blush)", flexShrink: 0 }}>•</span>
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid var(--sand)" }}>
        <span className="font-cormorant" style={{ color: "var(--blush)", fontSize: "1.4rem" }}>{s.price}</span>
        <a href="#contacts" className="btn-outline" style={{ padding: "0.4rem 1rem", fontSize: "0.72rem" }}>
          Записаться
        </a>
      </div>
    </div>
  );
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <a
            href="https://t.me/NadezhdaElka"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block btn-primary"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.7rem" }}
          >
            Пройти тест
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
              <a key={item.href} href={item.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="https://t.me/NadezhdaElka" target="_blank" rel="noopener noreferrer" className="btn-primary text-center mt-2">
              Пройти тест
            </a>
          </div>
        )}
      </nav>

      {/* 1. HERO */}
      <section
        className="pt-32 pb-20 px-6"
        style={{ background: "linear-gradient(155deg, var(--cream) 45%, var(--blush-light) 100%)" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="fade-in">
            <h1
              className="font-cormorant mb-5 leading-tight"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", fontWeight: 400, color: "var(--warm-dark)" }}
            >
              Узнайте свой{" "}
              <em style={{ color: "var(--blush)", fontStyle: "italic" }}>НЕЙРО-ID</em>
              {" "}за 5 минут
            </h1>
            <p className="font-golos leading-relaxed mb-2" style={{ color: "var(--warm-mid)", fontSize: "1rem" }}>
              Ведущий гормон + тип мозга + уровень энергии
            </p>
            <p className="font-golos mb-8" style={{ color: "var(--warm-mid)", fontSize: "0.95rem" }}>
              Бесплатно. Без регистрации. Результат сразу.
            </p>
            <a
              href="https://t.me/NadezhdaElka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
              style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}
            >
              Бесплатно пройти тест НЕЙРО-ID
            </a>
            <p className="font-golos mt-4 max-w-sm" style={{ color: "var(--warm-mid)", fontSize: "0.78rem", lineHeight: 1.6 }}>
              После прохождения я пришлю вам в Telegram личную расшифровку результата — что ваш код значит для денег, энергии и целей.
            </p>
            <p className="font-golos mt-4 font-medium" style={{ color: "var(--blush)", fontSize: "0.85rem" }}>
              Уже прошли: более 9 000 человек
            </p>
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
                  <p className="font-cormorant" style={{ color: "var(--warm-dark)", fontSize: "0.9rem", fontWeight: 500 }}>5 лет практики</p>
                  <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.7rem" }}>более 200 консультаций</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ЧТО ВЫ УЗНАЕТЕ */}
      <section className="py-20 px-6" style={{ background: "var(--blush-light)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">За 5 минут и 5 вопросов вы получите:</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { emoji: "🧠", text: "Ваш ведущий тип мозга — рептильный, лимбический или неокортекс" },
              { emoji: "⚡️", text: "Ваш ведущий гормон — то, что управляет вашей энергией и деньгами" },
              { emoji: "📊", text: "Уровень энергии прямо сейчас — точка отсчёта" },
              { emoji: "🔑", text: "Буквенно-числовой код вашего потока — ключ к расшифровке миссии" },
            ].map((item, i) => (
              <div key={i} className={`card-soft p-6 text-center fade-in stagger-${i + 1}`}>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <p className="font-golos leading-relaxed" style={{ color: "var(--warm-dark)", fontSize: "0.875rem" }}>{item.text}</p>
              </div>
            ))}
          </div>
          <p className="font-golos text-center mb-8" style={{ color: "var(--warm-mid)", fontSize: "0.82rem" }}>
            Почему вы устаёте и куда уходит ваша энергия — вы узнаете в личной расшифровке результата (1500 руб.) или на бесплатном созвоне со мной.
          </p>
          <div className="text-center">
            <a
              href="https://t.me/NadezhdaElka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Пройти тест бесплатно
            </a>
          </div>
        </div>
      </section>

      {/* 3. О МАСТЕРЕ */}
      <section id="about" className="py-20 px-6" style={{ scrollMarginTop: "5rem" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <p className="section-subtitle mb-3">О мастере</p>
              <h2 className="section-title mb-6">
                Меня зовут Надежда Ельчина.<br />
                Я создала «Инструкцию к человеку»
              </h2>
              <div className="font-golos leading-relaxed flex flex-col gap-4" style={{ color: "var(--warm-mid)", fontSize: "0.92rem" }}>
                <p>
                  5 лет я искала ответ: почему даже глубокие разборы не дают долгосрочного результата?
                </p>
                <p>
                  Потому что любой метод — это только один срез. А человек — это система.
                </p>
                <p>Я соединила 4 разрозненные системы в единую живую методологию:</p>
                <ul className="flex flex-col gap-2 pl-1">
                  {[
                    "Нумерологию и Матрицу судьбы — кармические задачи, предназначение, денежный код",
                    "Нейрофизиологию личности (NEURO ID) — ваш ведущий гормон и тип мозга",
                    "Ритмологию — расшифровку вашего ФИО через индивидуальную мандалу. Вы узнаете свои сильные стороны, есть ли родовая поддержка, что в имени помогает влиять на пространство, а что мешает достигать целей, и какие уроки вы будете проходить, пока не смените ФИО.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color: "var(--blush)", flexShrink: 0 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Результат — не разрозненные факты о вас. А «Инструкция к человеку»: чёткий экшн-план, привязанный к вашему нейротипу, и понимание законов мироздания, которые вы нарушаете.
                </p>
                <p style={{ color: "var(--warm-dark)", fontWeight: 500 }}>
                  Я не даю волшебную таблетку. Я даю карту, компас и знание, как не заблудиться снова.
                </p>
              </div>
              <a
                href="https://t.me/NadezhdaElka"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block mt-8"
              >
                Узнать свой НЕЙРО-ID
              </a>
            </div>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-3 gap-4 mb-2">
                {[
                  { num: "200+", label: "Консультаций проведено" },
                  { num: "5", label: "Лет в работе" },
                  { num: "98%", label: "Довольных клиентов" },
                ].map((s, i) => (
                  <div key={i} className="card-soft p-5 text-center">
                    <p className="font-cormorant" style={{ color: "var(--blush)", fontSize: "2.2rem" }}>{s.num}</p>
                    <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.72rem" }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="card-soft p-6">
                <p className="font-golos font-medium mb-3" style={{ color: "var(--warm-dark)", fontSize: "0.9rem" }}>
                  Методологии в системе:
                </p>
                {["Нумерология", "Матрица судьбы", "NEURO ID", "Ритмология"].map((t, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-xl mb-2 font-golos text-sm"
                    style={{ background: "var(--blush-light)", color: "var(--warm-dark)", border: "1px solid var(--sand)" }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ДЛЯ КОГО */}
      <section className="py-20 px-6" style={{ background: "var(--sand)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Этот тест — для вас, если:</h2>
          </div>
          <div className="card-soft p-8 flex flex-col gap-5 mb-8">
            {[
              "Вам 35+ и вы чувствуете, что живёте не свою жизнь",
              "У вас есть доход, но вы не понимаете, почему не растёте",
              "Вы в кризисе, карьерной трансформации или на перепутье",
              "Вы хотите не «просто узнать о себе», а получить чёткий план действий",
              "Вы пробовали психологов и коучей, но результата хватало на месяц",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="font-cormorant font-bold flex-shrink-0" style={{ color: "var(--blush)", fontSize: "1.1rem" }}>✓</span>
                <p className="font-golos" style={{ color: "var(--warm-dark)", fontSize: "0.92rem" }}>{item}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://t.me/NadezhdaElka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Пройти тест
            </a>
          </div>
        </div>
      </section>

      {/* 5. ЧТО ДАЛЬШЕ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Что вы получите после теста?</h2>
          </div>
          <div className="flex flex-col gap-6 mb-10">
            {[
              {
                step: "1",
                title: "Результат НЕЙРО ID",
                desc: "Вы узнаете свой код (например, 3Н), ведущий гормон и тип мозга",
              },
              {
                step: "2",
                title: "Расшифровка в Telegram",
                desc: "Я пришлю вам личную расшифровку на 5 страниц — что ваш код значит для денег, энергии и целей. Стоимость: 1 500 руб.",
              },
              {
                step: "3",
                title: "Полная «Инструкция к человеку»",
                desc: "Хотите экшн-план на год, расшифровку ФИО через мандалу и персональный числовой код? Запишитесь на бесплатный 15-минутный созвон — я покажу, как это работает на примере других клиентов.",
              },
            ].map((item, i) => (
              <div key={i} className="card-soft p-7 flex gap-5 items-start">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-cormorant flex-shrink-0"
                  style={{ background: "var(--blush)", color: "white", fontSize: "1.4rem" }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="font-cormorant mb-2" style={{ color: "var(--warm-dark)", fontSize: "1.2rem" }}>{item.title}</h3>
                  <p className="font-golos leading-relaxed" style={{ color: "var(--warm-mid)", fontSize: "0.88rem" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://t.me/NadezhdaElka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Начать с бесплатного теста
            </a>
          </div>
        </div>
      </section>

      {/* 6. КЕЙСЫ */}
      <section id="reviews" className="py-20 px-6" style={{ background: "var(--blush-light)", scrollMarginTop: "5rem" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Результаты клиентов</p>
            <h2 className="section-title">Уже работают со мной</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {CASES.map((c, i) => (
              <div key={i} className={`card-soft p-7 flex flex-col gap-4 fade-in stagger-${i + 1}`}>
                <p className="font-cormorant" style={{ color: "var(--warm-dark)", fontSize: "1.2rem", fontWeight: 500 }}>{c.name}</p>
                <div>
                  <p className="font-golos text-xs mb-1" style={{ color: "var(--blush)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Было</p>
                  <p className="font-golos text-sm leading-relaxed" style={{ color: "var(--warm-mid)" }}>{c.before}</p>
                </div>
                <div>
                  <p className="font-golos text-xs mb-1" style={{ color: "var(--blush)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Получила / получил</p>
                  <p className="font-golos text-sm leading-relaxed" style={{ color: "var(--warm-mid)" }}>{c.got}</p>
                </div>
                <div className="pt-3" style={{ borderTop: "1px solid var(--sand)" }}>
                  <p className="font-golos text-xs mb-1" style={{ color: "var(--blush)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Стало</p>
                  <p className="font-golos text-sm font-medium leading-relaxed" style={{ color: "var(--warm-dark)" }}>{c.after}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://t.me/NadezhdaElka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Хочу так же — пройти тест
            </a>
          </div>
        </div>
      </section>

      {/* 7. УСЛУГИ И ЦЕНЫ */}
      <section id="services" className="py-20 px-6" style={{ scrollMarginTop: "5rem" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Услуги и цены</p>
            <h2 className="section-title">Выберите свой формат</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {SERVICES_DATA.map((s, i) => (
              <ServiceCard key={i} s={s} />
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://t.me/NadezhdaElka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Начать с НЕЙРО-ID теста — бесплатно
            </a>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section id="faq" className="py-20 px-6" style={{ background: "var(--sand)", scrollMarginTop: "5rem" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">FAQ</p>
            <h2 className="section-title">Коротко о главном</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. ОТЗЫВЫ (скриншоты) */}
      <section className="py-20 px-6" style={{ background: "var(--blush-light)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Отзывы</p>
            <h2 className="section-title">Что говорят клиенты</h2>
          </div>
          <div className="card-soft p-10 text-center mb-8">
            <p className="font-golos" style={{ color: "var(--warm-mid)", fontSize: "0.9rem" }}>
              Скриншоты переписок появятся здесь — они сейчас готовятся.
            </p>
          </div>
          <div className="text-center">
            <a
              href="https://t.me/NadezhdaElka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Пройти тест как Анна и Михаил
            </a>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer
        id="contacts"
        className="py-14 px-6"
        style={{ borderTop: "1px solid var(--sand)", background: "var(--cream)", scrollMarginTop: "5rem" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <p className="font-cormorant text-xl mb-2" style={{ color: "var(--warm-dark)" }}>Надежда Ельчина</p>
              <p className="font-golos text-xs mb-4" style={{ color: "var(--warm-mid)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Система «Инструкция к человеку»
              </p>
              <a
                href="https://t.me/NadezhdaElka"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
                style={{ fontSize: "0.78rem", padding: "0.55rem 1.1rem" }}
              >
                Бесплатный НЕЙРО-ID тест
              </a>
            </div>
            <div>
              <p className="font-golos font-medium mb-4 text-sm" style={{ color: "var(--warm-dark)" }}>Навигация</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "О мастере", href: "#about" },
                  { label: "Услуги и цены", href: "#services" },
                  { label: "FAQ", href: "#faq" },
                  { label: "Отзывы", href: "#reviews" },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="nav-link" style={{ fontSize: "0.85rem" }}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-golos font-medium mb-4 text-sm" style={{ color: "var(--warm-dark)" }}>Контакты</p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://t.me/NadezhdaElka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-golos text-sm"
                  style={{ color: "var(--warm-mid)" }}
                >
                  <Icon name="Send" size={16} style={{ color: "var(--blush)" }} />
                  Telegram: @NadezhdaElka
                </a>
                <a
                  href="https://vk.com/nadyaelchina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-golos text-sm"
                  style={{ color: "var(--warm-mid)" }}
                >
                  <Icon name="Users" size={16} style={{ color: "var(--blush)" }} />
                  ВКонтакте: nadyaelchina
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6" style={{ borderTop: "1px solid var(--sand)" }}>
            <p className="font-golos text-center" style={{ color: "var(--warm-mid)", fontSize: "0.75rem" }}>
              © Надежда Ельчина, 2026. Система «Инструкция к человеку»
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
