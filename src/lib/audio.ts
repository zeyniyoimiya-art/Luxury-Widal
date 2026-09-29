// ───────────────────────────────────────────────────────────
// Motor de sonido "boutique de lujo" con Web Audio API
//  · Ambiente minimalista (acorde suave, volumen muy bajo)
//  · Campanita de oro rosa al pasar sobre elementos importantes
//  · Silenciado por defecto (las políticas de autoplay lo exigen) + botón visible
//  · Respeta prefers-reduced-motion: sin campanitas ni ambiente automático
// ───────────────────────────────────────────────────────────
import { useSyncExternalStore } from "react";

let ctx: AudioContext | null = null;
let ambientGain: GainNode | null = null;
let chimeBus: GainNode | null = null;
let oscillators: OscillatorNode[] = [];
let enabled = false;
let lastChime = 0;
const listeners = new Set<() => void>();

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const emit = () => listeners.forEach((l) => l());

/** Suscripción para React (useSyncExternalStore) */
export const useSoundEnabled = (): boolean =>
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => enabled,
    () => false,
  );

/** Crea el contexto de audio y el ambiente la primera vez */
function ensureContext(): AudioContext | null {
  if (ctx) return ctx;
  const Ctor: typeof AudioContext | undefined =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();

  chimeBus = ctx.createGain();
  chimeBus.gain.value = 0.32;
  chimeBus.connect(ctx.destination);

  // Ambiente: acorde La mayor add9 con filtro paso-bajo y respiración lenta (LFO)
  ambientGain = ctx.createGain();
  ambientGain.gain.value = 0;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1100;
  filter.connect(ambientGain);
  ambientGain.connect(ctx.destination);

  const freqs = [110, 164.81, 220, 277.18, 493.88];
  freqs.forEach((f, i) => {
    const osc = ctx!.createOscillator();
    const g = ctx!.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    osc.detune.value = (i - 2) * 4;
    g.gain.value = i === 4 ? 0.05 : 0.2;
    // LFO muy lento que hace "respirar" cada voz
    const lfo = ctx!.createOscillator();
    const lfoGain = ctx!.createGain();
    lfo.frequency.value = 0.05 + i * 0.017;
    lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    lfo.start();
    osc.connect(g);
    g.connect(filter);
    osc.start();
    oscillators.push(osc, lfo);
  });
  return ctx;
}

/** Activa o silencia el sonido (debe llamarse desde un gesto del usuario) */
export async function setSound(on: boolean): Promise<void> {
  if (on) {
    const c = ensureContext();
    if (!c || !ambientGain) return;
    await c.resume();
    ambientGain.gain.cancelScheduledValues(c.currentTime);
    ambientGain.gain.linearRampToValueAtTime(prefersReducedMotion() ? 0 : 0.045, c.currentTime + 2.5);
    enabled = true;
  } else if (ctx && ambientGain) {
    ambientGain.gain.cancelScheduledValues(ctx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    enabled = false;
    const c = ctx;
    window.setTimeout(() => {
      if (!enabled) void c.suspend();
    }, 700);
  }
  emit();
}

/** Campanita de oro rosa: tres parciales inarmónicos con decaimiento exponencial */
export function chime(): void {
  if (!enabled || !ctx || !chimeBus || prefersReducedMotion()) return;
  const now = performance.now();
  if (now - lastChime < 140) return;
  lastChime = now;

  const base = [1046.5, 1174.66, 1318.51, 1567.98, 1760][Math.floor(Math.random() * 5)] ?? 1046.5;
  const t = ctx.currentTime;
  [
    { r: 1, g: 0.16, d: 1.6 },
    { r: 2.76, g: 0.06, d: 1.0 },
    { r: 5.4, g: 0.025, d: 0.6 },
  ].forEach((p) => {
    const osc = ctx!.createOscillator();
    const g = ctx!.createGain();
    osc.type = "sine";
    osc.frequency.value = base * p.r;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(p.g, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + p.d);
    osc.connect(g);
    g.connect(chimeBus!);
    osc.start(t);
    osc.stop(t + p.d + 0.05);
  });
}

/** Delegación global: campanita al entrar en enlaces, botones y elementos marcados con data-chime */
export function installChimeListener(): () => void {
  let last: Element | null = null;
  const over = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.("[data-chime], a, button");
    if (el && el !== last) {
      last = el;
      chime();
    } else if (!el) {
      last = null;
    }
  };
  document.addEventListener("pointerover", over, { passive: true });
  return () => {
    document.removeEventListener("pointerover", over);
    oscillators.forEach((o) => o.disconnect());
  };
}
