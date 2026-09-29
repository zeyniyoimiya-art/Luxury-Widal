// Tarjeta de artículo: borde de oro rosa de 1px, elevación, brillo dorado y pétalos que salen al pasar el puntero.
import { useState } from "react";
import { Link } from "react-router-dom";
import { Article, wordCount } from "../data/types";
import { AUTHOR } from "../data";

export default function ArticleCard({ a, index }: { a: Article; index: number }) {
  const [burst, setBurst] = useState(0);
  const mins = Math.max(4, Math.round(wordCount(a) / 210));

  return (
    <Link
      to={`/blog/${a.slug}`}
      viewTransition
      onPointerEnter={() => setBurst((n) => n + 1)}
      data-chime
      className="card-gem group relative block overflow-hidden"
    >
      {/* Pétalos que salen de la tarjeta (se ocultan con reduced-motion) */}
      {burst > 0 && (
        <span key={burst} className="motion-only pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="petal-shape absolute"
              style={{
                left: `${10 + i * 11}%`,
                top: i % 2 ? "8%" : "88%",
                animation: `petal-burst ${1.1 + (i % 3) * 0.25}s ease-out ${i * 0.04}s both`,
                ["--bx" as string]: `${(i - 3.5) * 16}px`,
                ["--by" as string]: `${i % 2 ? 90 : -90}px`,
                ["--br" as string]: `${(i - 4) * 70}deg`,
              }}
            />
          ))}
        </span>
      )}
      <div className="gold-frame m-3 aspect-[16/10] overflow-hidden">
        <img src={a.hero.src} alt={a.hero.alt} loading="lazy" decoding="async" width={1200} height={720} />
      </div>
      <div className="px-6 pb-7 pt-3">
        <p className="eyebrow">
          № {String(index).padStart(2, "0")} · {a.kicker}
        </p>
        <h3 className="mt-2 text-[1.7rem]">{a.title}</h3>
        <p className="mt-3 text-[1.05rem] leading-snug text-ink/85">{a.excerpt}</p>
        <div className="mt-5 flex items-center justify-between font-display text-[0.65rem] uppercase tracking-[0.22em] text-gold">
          <span>Por: {AUTHOR}</span>
          <span>{mins} min</span>
        </div>
      </div>
    </Link>
  );
}
