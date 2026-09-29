// Renderizador de artículos con maquetación tipo revista de moda:
//  · Hero con overlay rosa polvo · 2 columnas (container queries) · drop cap dorado · pull quotes caligráficas
//  · Tablas con bordes de oro rosa · galerías con marco dorado · "Dato Azteca" · retratos y tarjetas de empresa
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Article, Block, wordCount } from "../data/types";
import { articles, AUTHOR, TAGLINE } from "../data";
import { useReveal } from "../lib/motion";
import { Flower, OrnamentDivider, Sun } from "./Ornaments";
import WorldMap from "./WorldMap";

/** Un bloque se considera "de columna" si fluye dentro del texto a dos columnas */
const inColumns = (b: Block) => b.t === "p" || b.t === "h3" || b.t === "list";

function renderBlock(b: Block, key: string, isFirstP: boolean) {
  switch (b.t) {
    case "p":
      return <p key={key} className={isFirstP ? "dropcap" : ""}>{b.text}</p>;
    case "h3":
      return <h3 key={key}>{b.text}</h3>;
    case "list":
      return (
        <ul key={key}>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "h2":
      return (
        <h2 key={key} data-reveal className="mb-5 mt-14 text-3xl sm:text-[2.6rem]">
          {b.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote key={key} data-reveal className="my-12 text-center">
          <Flower size={30} className="mx-auto mb-3 text-rose-gold" />
          <p className="pull-quote mx-auto max-w-3xl">«{b.text}»</p>
          <footer className="eyebrow mt-4">— {b.by}</footer>
        </blockquote>
      );
    case "dato":
      return (
        <aside key={key} data-reveal className="card-gem my-10 flex gap-5 p-6 sm:p-8" aria-label="Dato Azteca">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-rose-gold/60 bg-champagne/60 text-rose-deep dark:bg-white/5 dark:text-dusty-rose">
            <Flower size={34} />
          </div>
          <div>
            <p className="eyebrow">Dato Azteca</p>
            <p className="mt-1 text-[1.15rem] leading-snug">{b.text}</p>
          </div>
        </aside>
      );
    case "note":
      return (
        <aside key={key} data-reveal className="my-8 border-l-2 border-rose-gold bg-champagne/40 p-5 dark:bg-white/5">
          <p className="eyebrow">{b.title}</p>
          <p className="mt-1 text-[1.05rem] leading-snug">{b.text}</p>
        </aside>
      );
    case "table":
      return (
        <figure key={key} data-reveal className="my-10 overflow-x-auto">
          <table className="table-gold">
            <caption className="mb-3 text-left font-display text-lg text-head">{b.caption}</caption>
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r.join("|")}>
                  {r.map((c, i) => (
                    <td key={i} className={i === 0 ? "font-semibold text-head" : ""}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    case "gallery":
      return (
        <div key={key} data-reveal className="my-12 grid gap-6 sm:grid-cols-3">
          {b.items.map((p, i) => (
            <figure key={p.src} className={i === 0 ? "sm:col-span-2 sm:row-span-1" : ""}>
              <div className="gold-frame aspect-[4/3] overflow-hidden">
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" width={1200} height={720} />
              </div>
              <figcaption className="mt-3 text-center text-sm italic text-ink/75">
                {p.alt} · Foto:{" "}
                <a href={p.creditUrl} target="_blank" rel="noreferrer" className="underline decoration-rose-gold/60 underline-offset-4">
                  {p.credit} / Pexels
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      );
    case "people":
      return (
        <div key={key} className="my-10 grid gap-6 sm:grid-cols-2">
          {b.items.map((p) => (
            <article key={p.name} data-reveal className="card-gem flex gap-5 p-5">
              {/* Retrato tipográfico: monograma en marco dorado fino (sin fotos no verificadas de personas reales) */}
              <div className="gold-frame grid h-32 w-24 shrink-0 place-items-center bg-gradient-to-b from-champagne to-dusty-rose/70">
                <span className="font-display text-3xl font-semibold text-burgundy">{p.initials}</span>
              </div>
              <div>
                {p.tag && <p className="eyebrow">{p.tag}</p>}
                <h3 className="mt-0.5 text-xl">{p.name}</h3>
                <p className="mt-0.5 text-sm italic text-gold">{p.role}</p>
                <p className="mt-2 text-[1rem] leading-snug">{p.note}</p>
              </div>
            </article>
          ))}
        </div>
      );
    case "companies":
      return (
        <div key={key} className="my-10 grid gap-7 md:grid-cols-2">
          {b.items.map((c) => (
            <article key={c.name} data-reveal className="card-gem flex flex-col p-6">
              <div className="flex items-center gap-4">
                {/* Logo monocromático en oro rosa (monograma, no marca registrada) */}
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-rose-gold bg-gradient-to-br from-champagne to-dusty-rose/60 font-display text-xl font-semibold text-burgundy">
                  {c.initials}
                </div>
                <div>
                  <h3 className="text-2xl">{c.name}</h3>
                  <p className="text-sm italic text-gold">{c.type}</p>
                </div>
              </div>
              <span
                className={`mt-4 w-fit rounded-full border px-3 py-0.5 font-display text-[0.58rem] uppercase tracking-[0.2em] ${
                  c.confidence === "Documentado" ? "border-burgundy/50 text-burgundy dark:border-dusty-rose dark:text-dusty-rose" : "border-rose-gold/60 text-gold"
                }`}
              >
                WiMAX: {c.confidence}
              </span>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.98rem] leading-snug">
                {[
                  ["Años", c.years],
                  ["Cobertura", c.area],
                  ["Velocidades", c.speed],
                  ["Hoy", c.status],
                ].map(([k, v]) => (
                  <Fragment key={k}>
                    <dt className="font-display text-[0.6rem] uppercase tracking-[0.2em] text-gold">{k}</dt>
                    <dd>{v}</dd>
                  </Fragment>
                ))}
              </dl>
              <p className="mt-4 border-t border-rose-gold/30 pt-3 text-[1rem] leading-snug">{c.detail}</p>
            </article>
          ))}
        </div>
      );
    case "map":
      return (
        <div key={key} data-reveal className="my-10">
          <WorldMap />
        </div>
      );
    case "orn":
      return <OrnamentDivider key={key} className="my-10" />;
  }
}

export default function ArticleView({ article }: { article: Article }) {
  const ref = useReveal<HTMLDivElement>([article.slug]);
  const idx = articles.findIndex((a) => a.slug === article.slug);
  const next = articles[(idx + 1) % articles.length]!;
  const mins = Math.max(4, Math.round(wordCount(article) / 210));

  // Agrupa bloques consecutivos "de columna" para fluirlos a dos columnas
  const groups: Block[][] = [];
  article.blocks.forEach((b) => {
    const last = groups[groups.length - 1];
    if (inColumns(b) && last && inColumns(last[0]!)) last.push(b);
    else groups.push([b]);
  });
  let firstP = true;

  return (
    <article ref={ref}>
      {/* HERO con overlay rosa polvo */}
      <header className="relative isolate flex min-h-[70vh] items-end overflow-hidden">
        <img
          src={article.hero.src.replace("w=1200", "w=1800").replace("h=720", "h=1000")}
          alt={article.hero.alt}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ filter: "sepia(0.2) saturate(0.9)" }}
          fetchPriority="high"
        />
        <div className="rose-overlay absolute inset-0 -z-10" />
        <div className="greca-bg greca-veil -z-10 !opacity-20" />
        <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-40 sm:px-10">
          <nav aria-label="Migas de pan" className="mb-5 font-display text-[0.65rem] uppercase tracking-[0.28em] text-ivory/85">
            <Link to="/" className="hover:text-champagne">Inicio</Link> · Blog WiMAX
          </nav>
          <p className="eyebrow !text-champagne">{article.kicker}</p>
          <h1 className="mt-2 max-w-4xl text-5xl text-ivory sm:text-7xl" style={{ color: "#faf3e7", textShadow: "0 2px 30px rgba(74,14,31,.5)" }}>
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-xl italic text-ivory/95">{article.excerpt}</p>
          <p className="mt-6 font-script text-3xl text-champagne">Por: {AUTHOR}</p>
          <p className="mt-1 font-display text-[0.62rem] uppercase tracking-[0.26em] text-ivory/80">
            {mins} min de lectura · Foto: {article.hero.credit} / Pexels
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <OrnamentDivider className="my-10" />
        <div className="mag-columns">
          {groups.map((g, gi) => {
            if (inColumns(g[0]!)) {
              return (
                <div key={gi} className="mag-body">
                  {g.map((b, bi) => {
                    const isFirst = b.t === "p" && firstP;
                    if (isFirst) firstP = false;
                    return renderBlock(b, `${gi}-${bi}`, isFirst);
                  })}
                </div>
              );
            }
            const b = g[0]!;
            // Iconos decorativos entre secciones: un sol antes de cada H2
            return (
              <Fragment key={gi}>
                {b.t === "h2" && gi > 0 && <div className="mt-12 flex justify-center text-rose-gold"><Sun size={30} /></div>}
                {renderBlock(b, `${gi}`, false)}
              </Fragment>
            );
          })}
        </div>

        {/* Fuentes */}
        <section data-reveal className="mt-16" aria-labelledby="fuentes">
          <h2 id="fuentes" className="text-2xl">Fuentes consultadas</h2>
          <ol className="mt-4 list-decimal space-y-1.5 pl-6 text-[0.98rem]">
            {article.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="underline decoration-rose-gold/60 underline-offset-4 hover:text-gold">
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-14 text-center">
          <p className="font-script text-4xl text-gold">{AUTHOR}</p>
          <p className="mt-1 font-script text-xl text-ink/70">{TAGLINE}</p>
        </div>

        <Link to={`/blog/${next.slug}`} viewTransition className="card-gem mt-14 flex items-center justify-between gap-4 p-6" data-chime>
          <div>
            <p className="eyebrow">Siguiente lectura</p>
            <p className="mt-1 font-display text-2xl text-head">{next.title}</p>
          </div>
          <span className="btn-premium shrink-0">Leer</span>
        </Link>
      </div>
    </article>
  );
}
