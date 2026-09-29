// Cursor personalizado: gota de perfume dorada con estela de pétalos.
//  · Magnify sobre enlaces, morph a cápsula sobre botones premium
//  · Pointer Events API · solo con puntero fino y SIN prefers-reduced-motion
import { useEffect, useRef, useState } from "react";

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  life: number;
  size: number;
  color: string;
}

const COLORS = ["#e8b4b8", "#f4d9d0", "#b76e79", "#d9a86c", "#c9a4c7"];

export default function Cursor() {
  const dropRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!enabled) return;
    const drop = dropRef.current;
    const canvas = canvasRef.current;
    const c = canvas?.getContext("2d");
    if (!drop || !canvas || !c) return;

    document.documentElement.classList.add("custom-cursor");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const petals: Petal[] = [];
    let mx = -100, my = -100, dx = -100, dy = -100, acc = 0, raf = 0;
    let mode = "drop";

    // Al mover el puntero: actualiza posición y suelta pétalos cada cierta distancia
    const onMove = (e: PointerEvent) => {
      acc += Math.hypot(e.clientX - mx, e.clientY - my);
      mx = e.clientX;
      my = e.clientY;
      drop.style.opacity = "1";
      if (acc > 36) {
        acc = 0;
        petals.push({
          x: mx, y: my,
          vx: (Math.random() - 0.5) * 0.9,
          vy: 0.35 + Math.random() * 0.7,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.09,
          life: 1,
          size: 5 + Math.random() * 5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#e8b4b8",
        });
      }
    };
    // Morph según el elemento bajo el cursor
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.(".btn-premium, [data-morph]")) mode = "button";
      else if (t?.closest?.("a, button, [role=button], input, textarea, select, label, [data-magnify]")) mode = "link";
      else mode = "drop";
      drop.dataset.mode = mode;
    };
    const onLeave = () => (drop.style.opacity = "0");

    const tick = () => {
      dx += (mx - dx) * 0.3;
      dy += (my - dy) * 0.3;
      drop.style.transform = `translate3d(${dx}px,${dy}px,0) rotate(${mode === "drop" ? 135 : 0}deg)`;

      c.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i]!;
        p.x += p.vx + Math.sin(p.life * 9) * 0.35;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.012;
        if (p.life <= 0) {
          petals.splice(i, 1);
          continue;
        }
        c.save();
        c.translate(p.x, p.y);
        c.rotate(p.rot);
        c.globalAlpha = Math.min(1, p.life * 1.4) * 0.85;
        c.fillStyle = p.color;
        const s = p.size;
        c.beginPath();
        c.moveTo(0, -s);
        c.bezierCurveTo(s * 0.9, -s * 0.5, s * 0.7, s * 0.6, 0, s);
        c.bezierCurveTo(-s * 0.7, s * 0.6, -s * 0.9, -s * 0.5, 0, -s);
        c.fill();
        c.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9999] h-full w-full" aria-hidden="true" />
      <div ref={dropRef} className="cursor-drop" data-mode="drop" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
}
