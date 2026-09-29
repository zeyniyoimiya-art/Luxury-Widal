// Header minimalista con glassmorphism crema translúcido.
//  · Logo "widal te informa" en Bodoni Moda; triple-click = easter egg de pétalos
//  · Toggle de modo oscuro y botón de sonido (mute) siempre visibles
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { setSound, useSoundEnabled } from "../lib/audio";
import { PETAL_EVENT } from "./PetalRain";

const NAV = [
  { to: "/blog/historia", label: "Historia" },
  { to: "/blog/personajes", label: "Personajes" },
  { to: "/blog/cobertura-mundial", label: "Cobertura" },
  { to: "/blog/wimax-bolivia", label: "Bolivia" },
  { to: "/blog/empresas-bolivia", label: "Empresas" },
  { to: "/about", label: "Autor" },
  { to: "/contact", label: "Contacto" },
];

export default function Header() {
  const [dark, setDark] = useState(() => localStorage.getItem("widal-theme") === "dark");
  const [open, setOpen] = useState(false);
  const sound = useSoundEnabled();
  const { pathname } = useLocation();

  // Aplica el tema (claro por defecto) a <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("widal-theme", dark ? "dark" : "light");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0a0807" : "#faf3e7");
  }, [dark]);

  // Cierra el menú móvil al navegar
  useEffect(() => setOpen(false), [pathname]);

  const iconBtn =
    "grid h-10 w-10 place-items-center rounded-full border border-rose-gold/40 text-head transition hover:bg-dusty-rose/30";

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-rose-gold/30">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          to="/"
          viewTransition
          aria-label="widal te informa — inicio (triple clic para una sorpresa)"
          onClick={(e) => {
            if (e.detail === 3) window.dispatchEvent(new Event(PETAL_EVENT));
          }}
          className="select-none font-display text-[1.35rem] font-semibold tracking-tight text-head"
          data-chime
        >
          widal te <span className="gold-text">informa</span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              viewTransition
              className={({ isActive }) =>
                `font-display text-[0.68rem] uppercase tracking-[0.24em] transition ${
                  isActive ? "text-rose-deep dark:text-dusty-rose border-b border-rose-gold" : "text-head/80 hover:text-rose-deep dark:hover:text-dusty-rose"
                } pb-0.5`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={iconBtn}
            aria-pressed={sound}
            aria-label={sound ? "Silenciar sonido ambiente" : "Activar sonido ambiente"}
            title={sound ? "Silenciar" : "Activar sonido"}
            onClick={() => void setSound(!sound)}
          >
            {sound ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4z" />
                <path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4z" />
                <path d="M17 9l5 6M22 9l-5 6" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className={iconBtn}
            aria-pressed={dark}
            aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            onClick={() => setDark((d) => !d)}
          >
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className={`${iconBtn} lg:hidden`}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label="Abrir menú"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Menú móvil" className="glass border-t border-rose-gold/30 px-6 py-5 lg:hidden">
          <ul className="grid gap-3">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} className="font-display text-sm uppercase tracking-[0.22em] text-head">
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
