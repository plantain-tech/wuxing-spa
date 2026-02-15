"use client";

import { useState } from "react";

const copy = {
  en: {
    services: "Services",
    experts: "Experts",
    inspiration: "Store Inspiration",
    contact: "Contact",
    gift: "Gift Card",
    book: "Book Now",
    kicker: "AUTHENTIC CHINESE ACUPRESSURE",
    title: "Calm your body. Clear your mind.",
    subtitle: "A clean, breathable, modern spa experience inspired by traditional kung fu acupressure and reflexology techniques.",
  },
  zh: {
    services: "服务",
    experts: "技师",
    inspiration: "门店灵感",
    contact: "联系",
    gift: "礼品卡",
    book: "立即预约",
    kicker: "正宗中式穴位按摩",
    title: "放松身体，清空压力。",
    subtitle: "现代、通透、专业的按摩体验，融合传统功夫推拿与足底反射疗法。",
  },
} as const;

const services = [
  { name: "Reflexology", duration: "60 min", price: "$79" },
  { name: "Acupressure", duration: "60 min", price: "$89" },
  { name: "Chair Acupressure", duration: "30 min", price: "$49" },
  { name: "Detox", duration: "75 min", price: "$109" },
];

const therapists = [
  { nick: "Master Lin", specialty: "Deep pressure recovery" },
  { nick: "May", specialty: "Reflexology & stress relief" },
  { nick: "Chen", specialty: "Shoulder/neck reset" },
];

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const t = copy[lang];

  return (
    <main>
      <header className="nav-shell">
        <div className="container nav">
          <div className="brand">Wuxing Spa</div>
          <nav>
            <a href="#services">{t.services}</a>
            <a href="#experts">{t.experts}</a>
            <a href="#inspire">{t.inspiration}</a>
            <a href="#contact">{t.contact}</a>
          </nav>
          <div className="actions">
            <select value={lang} onChange={(e) => setLang(e.target.value as "en" | "zh")}>
              <option value="en">EN</option>
              <option value="zh">中文</option>
            </select>
            <a className="ghost" href="/gift-cards">{t.gift}</a>
            <a className="ghost" href="/login">Login</a>
            <a className="btn" href="/booking">{t.book}</a>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="kicker">{t.kicker}</p>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <div className="hero-cta">
            <a className="btn" href="/booking">{t.book}</a>
            <a className="ghost light" href="/gift-cards">{t.gift}</a>
          </div>
        </div>
      </section>

      <section id="services" className="container section">
        <h2>Signature Services</h2>
        <div className="grid cards">
          {services.map((s) => (
            <article key={s.name} className="card service-card">
              <div className="img" />
              <div className="pad">
                <h3>{s.name}</h3>
                <p>{s.duration}</p>
                <div className="row">
                  <strong>{s.price}</strong>
                  <a href="/booking">{t.book}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experts" className="container section">
        <h2>Expert Therapists</h2>
        <div className="grid experts">
          {therapists.map((t) => (
            <article key={t.nick} className="card pad">
              <h3>{t.nick}</h3>
              <p>{t.specialty}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="inspire" className="container section">
        <h2>Store Inspiration</h2>
        <div className="scroll-row">
          {[1, 2, 3, 4, 5].map((n) => (
            <figure key={n} className="polaroid">
              <div className="photo" />
              <figcaption>Wuxing Store #{n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact" className="container section card pad contact">
        <h2>Visit Us</h2>
        <p>
          <a href="https://maps.google.com/?q=KungFu+Massage+Spa" target="_blank">123 Serenity Ave, New York, NY</a>
        </p>
        <p><a href="tel:+17344477291">+1 (734) 447-7291</a></p>
        <p><a href="mailto:hello@wuxingspa.com">hello@wuxingspa.com</a></p>
      </section>

      <footer className="container footer">
        <span>© {new Date().getFullYear()} Wuxing Spa</span>
        <a href="/admin/login">Admin Portal</a>
      </footer>
    </main>
  );
}
