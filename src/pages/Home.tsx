// Home: hero con rosa 3D, últimas 3 publicaciones y "WiMAX en números"
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, reducedMotion, useReveal } from "../lib/motion";
import RoseHero from "../components/RoseHero";
import ArticleCard from "../components/ArticleCard";
import CountUp from "../components/CountUp";
import { Flower, OrnamentDivider } from "../components/Ornaments";
import { articles, latest, TAGLINE } from "../data";

const TITLE = "widal te informa";

const STATS = [
  { to: 260, suffix: "+", label: "Operadores con WiMAX", note: "en octubre de 2008, según el WiMAX Forum" },
  { to: 110, suffix: "", label: "Países con redes", note: "fijas, portátiles y móviles (2008)" },
  { to: 430, suffix: " M", label: "Personas con cobertura potencial", note: "puntos de presencia declarados por el Foro" },
  { to: 432, suffix: "", label: "Conexiones WiMAX en Bolivia", note: "registradas por la ATT en 2023 (0,03 %)" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pageRef = useReveal<HTMLDivElement>();

  // Título letra por letra + entrada de tagline y CTA (revelado editorial con GSAP)
  useEffect(() => {
    const root = heroRef.current;
    if (!root || reducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });
      tl.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.8, ease: "power2.out" })
        .from(".hero-letter", { yPercent: 110, opacity: 0, rotateX: -70, duration: 1, ease: "power4.out", stagger: 0.05 }, "-=0.4")
        .from(".hero-tagline", { opacity: 0, y: 16, duration: 1.1, ease: "power2.out" }, "-=0.35")
        .from(".hero-copy, .hero-cta", { opacity: 0, y: 18, duration: 0.9, stagger: 0.15, ease: "power2.out" }, "-=0.6");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* ───────── HERO ───────── */}
      <section ref={heroRef} className="relative isolate overflow-hidden pt-[68px]">
        <div className="greca-bg greca-veil -z-10" />
        <div className="pointer-events-none absolute -right-40 top-10 -z-10 h-[38rem] w-[38rem] rounded-full bg-dusty-rose/30 blur-3xl" />
        <div className="mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl items-center gap-4 px-6 py-12 sm:px-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="hero-eyebrow eyebrow">Blog editorial · WiMAX · IEEE 802.16</p>
            <h1 className="mt-5 font-display text-[clamp(2.7rem,7.4vw,6rem)] font-semibold leading-none tracking-tight" aria-label={TITLE}>
              {/* Letras en spans para la animación GSAP (.hero-letter) y letras de "informa" en oro rosa.
                  Cada palabra va en un contenedor whitespace-nowrap: sin eso, el navegador puede
                  cortar a mitad de palabra porque cada letra es un inline-block. */}
              {TITLE.split(" ").map((word, w, words) => (
                <span key={w}>
                  {w > 0 && " "}
                  <span className="inline-block whitespace-nowrap" aria-hidden="true">
                    {word.split("").map((ch, i) => {
                      const idx = words.slice(0, w).reduce((n, x) => n + x.length + 1, 0) + i;
                      return (
                        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ perspective: 600 }}>
                          <span className={`hero-letter inline-block ${idx >= 9 ? "gold-text" : "text-head"}`}>{ch}</span>
                        </span>
                      );
                    })}
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero-tagline mt-5 font-script text-[2.1rem] text-gold sm:text-[2.6rem]" style={{ color: "var(--gold-text)" }}>
              {TAGLINE}
            </p>
            <p className="hero-copy mt-6 max-w-xl text-[1.3rem] leading-snug text-ink/90">
              La tecnología que soñó llevar internet sin cables a todo el planeta, contada con rigor y elegancia: su historia, sus
              protagonistas, su mapa mundial y su paso por Bolivia.
            </p>
            <div className="hero-cta mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="btn-premium"
                onClick={() => document.getElementById("ultimas")?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" })}
              >
                Explorar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <Link to="/about" className="btn-ghost" viewTransition>
                Sobre el autor
              </Link>
            </div>
            <p className="mt-8 font-script text-2xl text-ink/70">Por: Cruz Muños Luis Vidal</p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[640px]">
            <RoseHero className="h-full w-full" />
          </div>
        </div>
      </section>

      {/* ───────── WiMAX EN NÚMEROS ───────── */}
      <section className="relative bg-burgundy py-20 text-ivory" aria-labelledby="numeros">
        <div className="greca-bg greca-veil !opacity-[0.12]" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <div data-reveal className="text-center">
            <p className="eyebrow !text-dusty-rose">Cifras verificadas</p>
            <h2 id="numeros" className="mt-2 text-4xl sm:text-5xl" style={{ color: "#faf3e7" }}>
              WiMAX en números
            </h2>
          </div>
          <dl className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} data-reveal className="border-t border-dusty-rose/40 pt-6 text-center">
                <dd className="gold-text font-display text-6xl font-semibold" style={{ backgroundImage: "linear-gradient(100deg,#e8b4b8,#f4d9d0 45%,#d9a86c 75%,#e8b4b8)" }}>
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
                <dt className="mt-3 font-display text-xs uppercase tracking-[0.24em] text-champagne">{s.label}</dt>
                <p className="mt-2 text-sm italic text-ivory/80">{s.note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── ÚLTIMAS PUBLICACIONES ───────── */}
      <section id="ultimas" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 sm:px-10" aria-labelledby="ultimas-h">
        <div data-reveal className="mb-12 text-center">
          <p className="eyebrow">Novedades de la edición</p>
          <h2 id="ultimas-h" className="mt-2 text-4xl sm:text-5xl">Últimas publicaciones</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latest().map((a) => (
            <div key={a.slug} data-reveal>
              <ArticleCard a={a} index={articles.indexOf(a) + 1} />
            </div>
          ))}
        </div>
      </section>

      {/* ───────── ÍNDICE + FILOSOFÍA ───────── */}
      <section className="mx-auto max-w-5xl px-6 pb-8 sm:px-10">
        <OrnamentDivider className="mb-14" />
        <div data-reveal className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">Índice completo</p>
            <ol className="mt-4 divide-y divide-rose-gold/30 border-y border-rose-gold/30">
              {articles.map((a, i) => (
                <li key={a.slug}>
                  <Link to={`/blog/${a.slug}`} viewTransition className="flex items-baseline gap-4 py-3 transition hover:pl-2">
                    <span className="font-display text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-xl text-head">{a.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="text-center">
            <Flower size={44} className="mx-auto text-rose-gold" />
            <p className="pull-quote mt-4">{TAGLINE}</p>
            <p className="mt-4 text-lg italic text-ink/80">Un sorbo de conocimiento a la vez: la filosofía de este blog.</p>
            <Link to="/about" viewTransition className="btn-ghost mt-6">Conocer al autor</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
