// Easter egg: triple-click en el logo → lluvia elegante de pétalos + 🦍 dorado + frase caligráfica.
// Con prefers-reduced-motion se muestra solo un mensaje estático (sin pétalos cayendo).
import { useEffect, useMemo, useState } from "react";
import { TAGLINE } from "../data";

export const PETAL_EVENT = "widal:petalos";

export default function PetalRain() {
  const [run, setRun] = useState(0); // 0 = inactivo; cada activación incrementa
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer = 0;
    const onEvent = () => {
      setRun((n) => n + 1);
      setVisible(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setVisible(false), 5200);
    };
    window.addEventListener(PETAL_EVENT, onEvent);
    return () => {
      window.removeEventListener(PETAL_EVENT, onEvent);
      window.clearTimeout(timer);
    };
  }, []);

  // Pétalos con parámetros aleatorios estables por activación
  const petals = useMemo(
    () =>
      Array.from({ length: 54 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.8,
        dur: 3.4 + Math.random() * 2.4,
        dx: (Math.random() - 0.5) * 220,
        rot: 360 + Math.random() * 540,
        scale: 0.7 + Math.random() * 0.9,
        hue: Math.random() > 0.55 ? "#e8b4b8" : Math.random() > 0.5 ? "#b76e79" : "#f4d9d0",
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [run],
  );

  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[9000] overflow-hidden" role="status" aria-live="polite">
      <div className="motion-only">
        {petals.map((p) => (
          <span
            key={p.id}
            className="petal-shape absolute top-0"
            style={{
              left: `${p.left}%`,
              background: `linear-gradient(135deg, #f4d9d0, ${p.hue})`,
              transform: `scale(${p.scale})`,
              animation: `petal-fall ${p.dur}s ${p.delay}s linear both`,
              ["--dx" as string]: `${p.dx}px`,
              ["--rot" as string]: `${p.rot}deg`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ animation: "gorilla-in 5s ease both" }}>
        <span
          className="text-[7rem] leading-none sm:text-[9rem]"
          style={{ filter: "drop-shadow(0 0 22px rgba(217,168,108,0.75)) sepia(0.35) saturate(1.4)" }}
        >
          🦍
        </span>
        <span className="gold-text mt-2 font-script text-5xl sm:text-6xl">{TAGLINE}</span>
      </div>
    </div>
  );
}
