// ───────────────────────────────────────────────────────────
// Tipos y utilidades de contenido del blog widal te informa
// ───────────────────────────────────────────────────────────

/** Fotografía con crédito (todas provienen de Pexels, licencia libre) */
export interface Photo {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
}

/** Tarjeta de personaje (retrato tipográfico en marco dorado) */
export interface Person {
  name: string;
  role: string;
  note: string;
  initials: string;
  tag?: string;
}

/** Tarjeta de empresa (logo monocromático en oro rosa) */
export interface Company {
  name: string;
  initials: string;
  type: string;
  years: string;
  area: string;
  speed: string;
  status: string;
  detail: string;
  confidence: "Documentado" | "Parcial";
}

/** Bloques que componen un artículo */
export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "list"; items: string[] }
  | { t: "quote"; text: string; by: string }
  | { t: "dato"; text: string }
  | { t: "note"; title: string; text: string }
  | { t: "table"; caption: string; head: string[]; rows: string[][] }
  | { t: "gallery"; items: Photo[] }
  | { t: "people"; items: Person[] }
  | { t: "companies"; items: Company[] }
  | { t: "map" }
  | { t: "orn" };

export interface Article {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  hero: Photo;
  blocks: Block[];
  sources: { label: string; url: string }[];
}

/** Construye la URL optimizada de Pexels */
const px = (id: number, w = 1200, h = 720) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${h}&w=${w}`;

const mk = (id: number, alt: string, credit: string, handle: string, w = 1200, h = 720): Photo => ({
  src: px(id, w, h),
  alt,
  credit,
  creditUrl: `https://www.pexels.com/@${handle}`,
});

/** Catálogo de fotografías reales (Pexels) */
export const photos = {
  towers1: mk(9290878, "Torres de telecomunicaciones con antenas bajo un cielo nublado", "Barnabas Davoti", "barnabas-davoti-31615494"),
  towers2: mk(15104403, "Torre de comunicación recortada contra un cielo luminoso", "Wallace Chuck", "chuck"),
  towers3: mk(9290873, "Torre con antenas parabólicas y de radioenlace", "Barnabas Davoti", "barnabas-davoti-31615494"),
  towers4: mk(14356121, "Torre de telecomunicaciones sobre el follaje", "Sami Aksu", "sami-aksu-48867324"),
  laPaz1: mk(5198849, "Vista panorámica de La Paz, Bolivia", "Julia Volk", "julia-volk"),
  laPaz2: mk(17756468, "Casas en las laderas de La Paz", "Gabriel Ramos", "gabrieluizramos"),
  laPaz3: mk(36303147, "Mercado en La Paz, Bolivia", "Shiwa Yachachin", "shiwa"),
  laPaz4: mk(36303148, "La Paz y su teleférico al atardecer", "Shiwa Yachachin", "shiwa"),
  globe1: mk(7236028, "Globo terráqueo con marcadores", "Nataliya Vaitkevich", "n-voitkevich"),
  globe2: mk(15942034, "Mano sosteniendo un globo frente al mar", "Nothing Ahead", "ian-panelo"),
  rural1: mk(19783220, "Mujer con una mula en la cordillera Condoriri, Bolivia", "Gabriel Ramos", "gabrieluizramos"),
  rural2: mk(5199982, "Valle altiplánico de Bolivia", "Julia Volk", "julia-volk"),
  rural3: mk(30566991, "Llama con adornos festivos en Oruro, Bolivia", "Alex Cruz", "alex-cruz-463684392"),
  sucre: mk(39266261, "Cruz de piedra en Sucre, Bolivia", "Augusto Calle", "augusto-calle-435417747"),
  lab1: mk(11679113, "Técnico revisando una placa electrónica", "Willquezada", "willquezada-904402"),
  lab2: mk(37426135, "Soldadura de una placa de circuito en laboratorio", "Maikol Herrera", "maiksax"),
  lab3: mk(35155421, "Ingeniero electrónico reparando una placa", "Multitech Institute", "multitech-institute-2155033298"),
};

/** Palabras aproximadas de un artículo (para tiempo de lectura) */
export const wordCount = (a: Article): number =>
  a.blocks.reduce((n, b) => {
    if ("text" in b) return n + b.text.split(/\s+/).length;
    if (b.t === "list") return n + b.items.join(" ").split(/\s+/).length;
    if (b.t === "people") return n + b.items.reduce((m, p) => m + p.note.split(/\s+/).length, 0);
    if (b.t === "companies") return n + b.items.reduce((m, c) => m + c.detail.split(/\s+/).length, 0);
    return n;
  }, 0);
