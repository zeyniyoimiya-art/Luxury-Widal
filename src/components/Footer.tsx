// Footer: firma caligráfica del autor, frase-cierre poética, enlaces sociales dorados y créditos.
import { Link } from "react-router-dom";
import { AUTHOR, TAGLINE } from "../data";
import { OrnamentDivider } from "./Ornaments";

const social = [
  { label: "Instagram (próximamente)", path: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-2.5h.01" },
  { label: "TikTok (próximamente)", path: "M14 3v12a3.5 3.5 0 11-3.5-3.5M14 3c.4 2.6 2 4.2 5 4.5" },
  { label: "GitHub (próximamente)", path: "M9 19c-4 1.3-4-2-6-2.5M15 21v-3.2a2.8 2.8 0 00-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 00-1.3-3.2 4.3 4.3 0 00-.1-3.2s-1-.3-3.3 1.3a11.400 11.400 0 00-6 0C6.700 2.900 5.700 3.200 5.700 3.200a4.300 4.300 0 00-.1 3.200A4.600 4.600 0 004.300 9.600c0 4.600 2.800 5.700 5.500 6a2.800 2.800 0 00-.8 2.200V21" },
  { label: "Correo (ir a contacto)", path: "M3 6h18v12H3zM3 7l9 6 9-6" },
];

export default function Footer() {
  return (
    <footer className="relative mt-28 border-t border-rose-gold/40 bg-card/60">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <OrnamentDivider className="mb-12" />
        <p className="eyebrow mb-2">Con cariño y rigor, por</p>
        <p className="gold-text font-script text-6xl leading-tight sm:text-7xl">{AUTHOR}</p>
        <p className="mt-2 font-body text-sm italic text-ink/70">Estudiante de Sistemas Informáticos · INCOS El Alto</p>
        <p className="mt-6 font-script text-2xl text-gold" aria-label="Frase característica del autor">
          {TAGLINE}
        </p>

        <ul className="mt-9 flex justify-center gap-4" aria-label="Redes sociales">
          {social.map((s) => (
            <li key={s.label}>
              <Link
                to="/contact"
                aria-label={s.label}
                title={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-rose-gold/50 text-rose-deep transition hover:bg-dusty-rose/30 dark:text-dusty-rose"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-2 font-display text-[0.65rem] uppercase tracking-[0.24em] text-ink/70">
          <Link to="/blog/historia">Historia</Link>
          <Link to="/blog/wimax-bolivia">Bolivia</Link>
          <Link to="/about">Autor</Link>
          <Link to="/contact">Contacto</Link>
        </div>
        <p className="mt-8 text-sm text-ink/70">
          © {new Date().getFullYear()} widal te informa · {AUTHOR}. Fotografías de{" "}
          <a href="https://www.pexels.com" className="underline decoration-rose-gold/60 underline-offset-4" target="_blank" rel="noreferrer">
            Pexels
          </a>{" "}
          con crédito en cada galería.
        </p>
        <p className="mt-1 font-display text-[0.65rem] uppercase tracking-[0.3em] text-gold">Luxury crafted by widal te informa</p>
      </div>
    </footer>
  );
}
