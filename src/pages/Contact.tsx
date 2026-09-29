// Contacto: formulario estilo "invitación de lujo" con validación Zod (accesible)
import { FormEvent, useState } from "react";
import { z } from "zod";
import { useReveal } from "../lib/motion";
import { Flower, OrnamentDivider } from "../components/Ornaments";
import { AUTHOR, TAGLINE } from "../data";

// Esquema de validación (Zod)
const schema = z.object({
  name: z.string().trim().min(2, "Cuéntanos tu nombre (mínimo 2 letras)."),
  email: z.string().trim().email("Ingresa un correo válido."),
  topic: z.enum(["Consulta sobre WiMAX", "Corrección o dato nuevo", "Colaboración", "Solo saludar"]),
  message: z.string().trim().min(10, "Tu mensaje necesita al menos 10 caracteres.").max(1200, "Máximo 1200 caracteres."),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field =
  "mt-2 w-full border-0 border-b border-rose-gold/60 bg-transparent px-1 py-2 font-body text-[1.15rem] text-ink placeholder:italic placeholder:text-ink/50 focus:border-rose-deep focus:outline-none focus:ring-0 focus-visible:outline-none";

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Errors = {};
      res.error.issues.forEach((i) => {
        const k = i.path[0] as keyof Errors;
        if (!errs[k]) errs[k] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    // Demo sin backend: el mensaje se guarda solo en el navegador del visitante
    const prev = JSON.parse(localStorage.getItem("widal-mensajes") ?? "[]") as unknown[];
    localStorage.setItem("widal-mensajes", JSON.stringify([...prev, { ...res.data, at: new Date().toISOString() }]));
    setSent(true);
  };

  return (
    <div ref={ref} className="relative isolate px-6 pb-10 pt-36 sm:px-10">
      <div className="greca-bg greca-veil -z-10" />
      <div className="mx-auto max-w-2xl">
        <div data-reveal className="gold-frame">
          <div className="border border-rose-gold/40 bg-card px-7 py-12 text-center sm:px-14">
            <Flower size={44} className="mx-auto text-rose-gold" />
            <p className="eyebrow mt-4">Invitación</p>
            <h1 className="mt-2 text-4xl sm:text-5xl">Tienes el honor de escribirme</h1>
            <p className="mt-3 font-script text-3xl text-gold">{AUTHOR}</p>
            <OrnamentDivider className="my-8" />

            {sent ? (
              <div role="status" className="py-6">
                <p className="gold-text font-script text-5xl">Invitación enviada</p>
                <p className="mt-4 text-lg italic">Gracias por escribir. Tu mensaje quedó guardado en este navegador.</p>
                <p className="mt-2 text-sm text-ink/70">
                  (Esta edición no tiene servidor conectado: el mensaje no sale de tu dispositivo.)
                </p>
                <p className="mt-6 font-script text-2xl text-gold">{TAGLINE}</p>
                <button type="button" className="btn-ghost mt-6" onClick={() => setSent(false)}>Escribir otro</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-7 text-left" aria-label="Formulario de contacto">
                <div>
                  <label htmlFor="name" className="eyebrow">Su nombre</label>
                  <input id="name" name="name" autoComplete="name" className={field} placeholder="Nombre y apellido"
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
                  {errors.name && <p id="err-name" role="alert" className="mt-1 text-sm text-burgundy dark:text-dusty-rose">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow">Su correo</label>
                  <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="nombre@correo.com"
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
                  {errors.email && <p id="err-email" role="alert" className="mt-1 text-sm text-burgundy dark:text-dusty-rose">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="topic" className="eyebrow">Motivo</label>
                  <select id="topic" name="topic" className={`${field} bg-card`} defaultValue="Consulta sobre WiMAX">
                    <option>Consulta sobre WiMAX</option>
                    <option>Corrección o dato nuevo</option>
                    <option>Colaboración</option>
                    <option>Solo saludar</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="eyebrow">Su mensaje</label>
                  <textarea id="message" name="message" rows={5} className={`${field} resize-none`} placeholder="Escriba aquí con toda confianza…"
                    aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
                  {errors.message && <p id="err-message" role="alert" className="mt-1 text-sm text-burgundy dark:text-dusty-rose">{errors.message}</p>}
                </div>
                <div className="pt-2 text-center">
                  <button type="submit" className="btn-premium">Enviar invitación</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
