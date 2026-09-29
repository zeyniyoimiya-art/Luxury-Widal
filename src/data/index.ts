// Índice de artículos del blog (orden editorial). Los 3 más recientes se muestran en el Home.
import { Article } from "./types";
import { historia } from "./historia";
import { personajes } from "./personajes";
import { cobertura } from "./cobertura";
import { bolivia } from "./bolivia";
import { empresas } from "./empresas";

export const articles: Article[] = [historia, personajes, cobertura, bolivia, empresas];

export const bySlug = (slug: string): Article | undefined => articles.find((a) => a.slug === slug);

/** Las tres publicaciones más recientes (las últimas del índice editorial) */
export const latest = (): Article[] => articles.slice(-3).reverse();

/** Firma del autor y frase característica */
export const AUTHOR = "Cruz Muños Luis Vidal";
export const TAGLINE = "Infórmate aquí";
