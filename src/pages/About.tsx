// Página "Sobre el autor": Cruz Muños Luis Vidal
import { Link } from "react-router-dom";
import { useReveal } from "../lib/motion";
import { AUTHOR, TAGLINE } from "../data";
import { Flower, Greca, OrnamentDivider, Sun } from "../components/Ornaments";

const TIMELINE = [
  { when: "Hoy", what: "Estudiante de Sistemas Informáticos en el INCOS El Alto, a más de 4.000 metros de altura y a un enlace de radio de La Paz." },
  { when: "Este proyecto", what: "widal te informa: una investigación editorial sobre WiMAX (historia, personajes, cobertura mundial, Bolivia y empresas), con fuentes citadas." },
  { when: "Lo que viene", what: "Nuevos capítulos sobre LTE, fibra al hogar y el 5G en la banda de 3,5 GHz que heredó el espectro de WiMAX." },
];

export default function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="relative isolate overflow-hidden pb-6 pt-36">
      <div className="greca-bg greca-veil -z-10" />
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
          {/* Retrato: arco dorado con monograma (el retrato fotográfico lo aporta el autor) */}
          <div data-reveal className="mx-auto w-full max-w-sm">
            <div className="gold-frame" style={{ borderRadius: "999px 999px 6px 6px" }}>
              <div
                className="grid aspect-[3/4] place-items-center bg-gradient-to-b from-champagne via-dusty-rose/70 to-rose-gold/70"
                style={{ borderRadius: "999px 999px 2px 2px" }}
              >
                <div className="text-center">
                  <Sun size={44} className="mx-auto text-burgundy/70" />
                  <p className="mt-3 font-display text-7xl font-semibold text-burgundy">CM</p>
                  <p className="mt-2 font-script text-3xl text-burgundy/80">Luis Vidal</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm italic text-ink/70">Retrato ornamental · la fotografía oficial llegará pronto</p>
          </div>

          <div data-reveal>
            <p className="eyebrow">Sobre el autor</p>
            <h1 className="mt-2 text-5xl sm:text-6xl">{AUTHOR}</h1>
            <p className="mt-2 font-display text-sm uppercase tracking-[0.22em] text-gold">Estudiante de Sistemas Informáticos · INCOS El Alto</p>
            <p className="dropcap mt-6 text-[1.2rem]">
              Soy Cruz Muños Luis Vidal y creo que la tecnología también se cuenta con estilo. Estudio Sistemas Informáticos en El Alto, la ciudad
              desde la que se ve la cordillera y desde la que cada antena parece una promesa. Este blog nació de una pregunta simple: ¿qué fue
              de WiMAX, esa red inalámbrica que prometió conectar a todos y que en 2008 llegó a Bolivia?
            </p>
            <p className="mt-4 text-[1.2rem]">
              Investigo, contrasto fuentes y escribo con una regla: no inventar. Cuando un dato no está documentado, lo digo. Y cuando la
              tecnología se vuelve demasiado seria, la devuelvo al terreno de la belleza: tipografía fina, oro rosa y una mirada curiosa.
            </p>
          </div>
        </div>

        <OrnamentDivider className="my-16" />

        {/* Trayectoria */}
        <section data-reveal aria-labelledby="trayectoria">
          <h2 id="trayectoria" className="text-center text-4xl">Trayectoria</h2>
          <ol className="relative mx-auto mt-10 max-w-3xl border-l border-rose-gold/60 pl-8">
            {TIMELINE.map((t) => (
              <li key={t.when} className="relative mb-9">
                <span className="absolute -left-[2.85rem] top-0 grid h-9 w-9 place-items-center rounded-full border border-rose-gold bg-paper text-rose-gold">
                  <Greca size={18} />
                </span>
                <p className="font-display text-xs uppercase tracking-[0.26em] text-gold">{t.when}</p>
                <p className="mt-1 text-[1.15rem]">{t.what}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Filosofía */}
        <section data-reveal className="card-gem mx-auto mt-14 max-w-3xl p-10 text-center" aria-labelledby="filosofia">
          <Flower size={40} className="mx-auto text-rose-gold" />
          <h2 id="filosofia" className="mt-3 text-3xl">Mi filosofía</h2>
          <p className="gold-text mt-4 font-script text-5xl leading-tight sm:text-6xl">{TAGLINE}</p>
          <p className="mx-auto mt-5 max-w-xl text-[1.15rem] italic">
            Aprender es un sorbo a la vez: constante, con humor, sin solemnidad y con la fuerza tranquila de quien no tiene prisa. Esa es la
            firma con la que cierro cada artículo.
          </p>
        </section>

        <div data-reveal className="mt-14 text-center">
          <Link to="/contact" viewTransition className="btn-premium">Escribirme</Link>
        </div>
      </div>
    </div>
  );
}
