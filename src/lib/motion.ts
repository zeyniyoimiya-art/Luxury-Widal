// ───────────────────────────────────────────────────────────
// Utilidades de animación: GSAP + ScrollTrigger con "revelado editorial"
// Siempre respeta prefers-reduced-motion (sin animación: contenido estático).
// ───────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Revela con un deslizamiento suave todo elemento [data-reveal] al entrar en pantalla */
export function useReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", root).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 38,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    }, root);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

export { gsap };
