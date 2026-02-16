"use client";

import { useEffect, useState } from "react";

const copy = {
  en: {
    services: "Services",
    experts: "Experts",
    inspiration: "Inspiration",
    contact: "Contact",
    gift: "Gift Card",
    book: "Book Now",
    title: "Where Nature Whispers",
    subtitle:
      "Luxury acupressure and reflexology retreat crafted for deep rest and modern recovery.",
    journey: "Curated Moments of Wonder",
  },
  zh: {
    services: "服务",
    experts: "技师",
    inspiration: "灵感",
    contact: "联系",
    gift: "礼品卡",
    book: "立即预约",
    title: "在自然中慢下来",
    subtitle: "以中式穴位调理与反射疗法打造的高端放松体验。",
    journey: "精选疗愈体验",
  },
} as const;

const photos = {
  hero: "/ai/001-ultra-realistic-high-resolution-photo-tr.jpeg",
  retreat: "/ai/home-retreat.jpeg",
  hotspring: "/ai/home-hotspring.jpeg",
  dining: "/ai/002-ultra-realistic-high-resolution-photogra.jpeg",
  forest: "/ai/001-ultra-realistic-high-resolution-photogra.jpeg",
};

type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
};

const features = [
  {
    kicker: "RESTORE & RENEW",
    title: "Holistic Wellness Sanctuary",
    body: "Traditional pressure techniques, warm herbal touch, and mindful rhythm in one seamless journey.",
    image: photos.hotspring,
  },
  {
    kicker: "NOURISHMENT",
    title: "Farm-to-Forest Cuisine",
    body: "A spa ritual inspired by mountain air, warm earth tones, and restorative breathing space.",
    image: photos.dining,
  },
  {
    kicker: "MINDFUL IMMERSION",
    title: "Shinrin-Yoku Forest Bathing",
    body: "Slow down, breathe deep, and let your nervous system settle into natural balance.",
    image: photos.forest,
  },
];

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [scrolled, setScrolled] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = copy[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => setTestimonials(Array.isArray(data) ? data : []))
      .catch(() => setTestimonials([]));
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <main className="site-shell home-shell">
      <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
        <div className="frame nav-row">
          <div className="logo">Wuxing Spa</div>
          <nav>
            <a href="#services">{t.services}</a>
            <a href="#experts">{t.experts}</a>
            <a href="#inspiration">{t.inspiration}</a>
            <a href="#contact">{t.contact}</a>
          </nav>
          <div className="nav-actions">
            <select value={lang} onChange={(e) => setLang(e.target.value as "en" | "zh")}> 
              <option value="en">EN</option>
              <option value="zh">中文</option>
            </select>
            <a className="btn ghost" href="/gift-cards">{t.gift}</a>
            <a className="btn solid" href="/booking">{t.book}</a>
          </div>
        </div>
      </header>

      <section className="frame hero-panel">
        <div className="hero-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(9,14,24,.35), rgba(9,14,24,.45)), url(${photos.hero})` }} />
        <div className="hero-copy hero-centered">
          <p className="eyebrow">LUXURY WELLNESS RETREAT</p>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
      </section>

      <section id="inspiration" className="frame white-panel section-block testimonials-section">
        <div className="testimonials-head">
          <p className="eyebrow">CLIENT VOICES</p>
          <h2>What Clients Say</h2>
          <p>
            Real feedback from customers using Wuxing Spa for location-based massage booking and wellness services.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <>
            <div className="testimonial-carousel">
              <article key={testimonials[currentSlide]?.id || currentSlide} className="testimonial-card featured animate-in">
                <div className="stars">{"★".repeat(Math.max(1, testimonials[currentSlide]?.rating || 5))}</div>
                <p className="quote">“{testimonials[currentSlide]?.text}”</p>
                <div className="person">
                  <strong>{testimonials[currentSlide]?.name}</strong>
                  <span>{testimonials[currentSlide]?.role}</span>
                </div>
              </article>
            </div>
            <div className="carousel-dots">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`dot ${i === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="testimonials-grid">
            <article className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="quote">“No testimonials yet. Add reviews from admin panel.”</p>
              <div className="person"><strong>Wuxing Spa</strong><span>System</span></div>
            </article>
          </div>
        )}
      </section>

      <section id="services" className="frame white-panel section-block">
        <h2 className="center">{t.journey}</h2>
        <div className="feature-stack">
          {features.map((f, i) => (
            <article key={f.title} className={`feature-row ${i % 2 ? "flip" : ""}`}>
              <div className="feature-photo" style={{ backgroundImage: `url(${f.image})` }} />
              <div className="feature-copy">
                <p className="eyebrow">{f.kicker}</p>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experts" className="frame white-panel section-block">
        <h2 className="center">Expert Therapists</h2>
        <div className="cards-3">
          {["Master Lin", "May", "Chen"].map((n, i) => (
            <article key={n} className="mini-card padded-card">
              <div className="avatar" style={{ backgroundImage: `url(${[photos.forest, photos.hotspring, photos.dining][i]})` }} />
              <h4>{n}</h4>
              <p>Senior Acupressure Specialist</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="frame dark-panel section-block contact-grid">
        <div>
          <h2>Begin Your Journey</h2>
          <p>
            Reserve your place in calm. Our concierge team is available to design a
            complete wellness experience for you.
          </p>
          <a className="btn ghost light" href="/booking">Reserve Your Stay</a>
        </div>
        <div>
          <p className="eyebrow">CONTACT</p>
          <p><a href="mailto:hello@wuxingspa.com">hello@wuxingspa.com</a></p>
          <p><a href="tel:+17344477291">+1 (734) 447-7291</a></p>
        </div>
        <div>
          <p className="eyebrow">LOCATION</p>
          <p><a href="https://maps.google.com/?q=KungFu+Massage+Spa" target="_blank">123 Serenity Ave, New York, NY</a></p>
        </div>
      </section>

      <footer className="frame footer-line">
        <span>© {new Date().getFullYear()} Wuxing Spa. All rights reserved.</span>
        <div>
          <a href="/admin/dashboard">Admin</a>
        </div>
      </footer>
    </main>
  );
}
