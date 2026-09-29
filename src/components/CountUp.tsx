// Contador en oro rosa: cuenta hasta el valor cuando entra en pantalla (sin animación si hay reduced-motion)
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "../lib/motion";

export default function CountUp({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(() => (reducedMotion() ? to : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1800;
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} aria-label={`${prefix}${to.toLocaleString("es-BO")}${suffix}`}>
      {prefix}
      {val.toLocaleString("es-BO")}
      {suffix}
    </span>
  );
}
