// Mapa mundial interactivo con estética cartográfica (proyección Natural Earth, retícula y marcadores dorados).
//  · Territorios de world-atlas (dominio público) renderizados con d3-geo
//  · Accesible: marcadores con teclado + lista de botones equivalente
import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import worldData from "world-atlas/countries-110m.json";
import { coverage, CoverageCountry } from "../data/coverage";
import { Flower } from "./Ornaments";

const W = 960;
const H = 500;

export default function WorldMap() {
  const [selectedId, setSelectedId] = useState<string>("068");
  const selected: CoverageCountry = coverage.find((c) => c.id === selectedId) ?? coverage[0]!;

  // Geometrías y proyección calculadas una sola vez
  const { paths, sphere, graticule, markers } = useMemo(() => {
    const topo = worldData as unknown as { objects: { countries: unknown } };
    const fc = feature(topo as never, topo.objects.countries as never) as unknown as FeatureCollection<Geometry>;
    const projection = geoNaturalEarth1().fitExtent(
      [
        [8, 8],
        [W - 8, H - 8],
      ],
      { type: "Sphere" },
    );
    const gen = geoPath(projection);
    return {
      paths: fc.features.map((f) => ({ id: String(f.id ?? ""), d: gen(f) ?? "" })),
      sphere: gen({ type: "Sphere" }) ?? "",
      graticule: gen(geoGraticule10()) ?? "",
      markers: coverage.map((c) => ({ c, xy: projection(c.lonLat) ?? [0, 0] })),
    };
  }, []);

  const covered = new Set(coverage.map((c) => c.id));

  return (
    <div className="gold-frame">
      <div className="grid gap-6 bg-card p-3 lg:grid-cols-[1.7fr_1fr] lg:p-5">
        {/* Lámina cartográfica */}
        <div className="relative overflow-hidden rounded-sm border border-rose-gold/40 bg-champagne/40 dark:bg-white/[0.03]">
          <div className="pointer-events-none absolute left-4 top-3 z-10 font-display text-xs uppercase tracking-[0.3em] text-gold">
            Orbis WiMAX
          </div>
          <div className="pointer-events-none absolute bottom-3 right-4 z-10 flex items-center gap-2 text-rose-gold">
            <Flower size={30} />
            <span className="font-script text-2xl text-gold">N</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Mapa mundial de despliegues de WiMAX" className="block h-auto w-full">
            <path d={sphere} className="fill-ivory/70 stroke-rose-gold/60 dark:fill-black/40" strokeWidth={1.2} />
            <path d={graticule} fill="none" className="stroke-rose-gold/25" strokeWidth={0.5} />
            {paths.map((p) => {
              const isCov = covered.has(p.id);
              const isSel = p.id === selectedId;
              const isBol = p.id === "068";
              return (
                <path
                  key={p.id + p.d.slice(0, 12)}
                  d={p.d}
                  onClick={isCov ? () => setSelectedId(p.id) : undefined}
                  data-magnify={isCov ? "" : undefined}
                  className={
                    isBol
                      ? "cursor-pointer fill-burgundy stroke-ivory transition-colors"
                      : isCov
                        ? `cursor-pointer stroke-ivory transition-colors hover:fill-rose-gold ${isSel ? "fill-rose-gold" : "fill-dusty-rose"}`
                        : "fill-champagne stroke-ivory/80 dark:fill-white/10 dark:stroke-black/40"
                  }
                  strokeWidth={0.5}
                />
              );
            })}
            {markers.map(({ c, xy }) => {
              const sel = c.id === selectedId;
              return (
                <g
                  key={c.id}
                  transform={`translate(${xy[0]} ${xy[1]})`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${c.name}: ver detalles`}
                  aria-pressed={sel}
                  onClick={() => setSelectedId(c.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedId(c.id);
                    }
                  }}
                  className="cursor-pointer outline-none [&:focus-visible>circle:last-child]:stroke-burgundy"
                >
                  <circle r={3} fill="none" stroke="#d9a86c" strokeWidth={1.2} className="motion-only" style={{ animation: "pulse-ring 2.4s ease-out infinite" }} />
                  <circle r={sel ? 6.5 : 4.5} fill="#d9a86c" stroke="#fff8ec" strokeWidth={1.6} />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Ficha del territorio seleccionado */}
        <aside aria-live="polite" className="card-gem flex flex-col p-6">
          <p className="eyebrow">Territorio</p>
          <h3 className="mt-1 text-3xl">{selected.name}</h3>
          <span
            className={`mt-2 inline-block w-fit rounded-full border px-3 py-0.5 font-display text-[0.6rem] uppercase tracking-[0.2em] ${
              selected.confidence === "Documentado" ? "border-burgundy/50 text-burgundy dark:border-dusty-rose dark:text-dusty-rose" : "border-rose-gold/60 text-gold"
            }`}
          >
            Cifras: {selected.confidence}
          </span>
          <dl className="mt-5 space-y-3 text-[1.02rem] leading-snug">
            {[
              ["Operadores", selected.operators],
              ["Lanzamiento", selected.launch],
              ["Pico de usuarios", selected.peak],
              ["Estado actual", selected.status],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-rose-gold/30 pt-2">
                <dt className="font-display text-[0.62rem] uppercase tracking-[0.24em] text-gold">{k}</dt>
                <dd className="mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      {/* Lista accesible equivalente al mapa */}
      <ul className="flex flex-wrap gap-2 bg-card p-3 pt-0 lg:px-5 lg:pb-5" aria-label="Seleccionar territorio">
        {coverage.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => setSelectedId(c.id)}
              aria-pressed={c.id === selectedId}
              className={`rounded-full border px-4 py-1.5 font-display text-[0.65rem] uppercase tracking-[0.18em] transition ${
                c.id === selectedId
                  ? "border-burgundy bg-burgundy text-ivory"
                  : "border-rose-gold/50 text-head hover:bg-dusty-rose/30"
              }`}
            >
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
