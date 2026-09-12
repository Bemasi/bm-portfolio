import { plano as planoEs } from "@/content/es/plano";
import { taller as tallerEs } from "@/content/es/taller";
import { ui as uiEs } from "@/content/es/ui";
import { plano as planoEn } from "@/content/en/plano";
import { taller as tallerEn } from "@/content/en/taller";
import { ui as uiEn } from "@/content/en/ui";

export const IDIOMAS = ["es", "en"];

/** El endónimo no se traduce: «Español» se escribe igual desde el inglés, así
 *  que vive aquí una sola vez y no en los dos diccionarios. */
export const NOMBRE_IDIOMA = { es: "Español", en: "English" };

// ponytail: cada idioma repite los campos que no se traducen (slug, flujo,
// posición, año). Si empiezan a divergir, sacar una base común indexada por slug.
const CONTENIDO = {
  es: { plano: planoEs, taller: tallerEs, ui: uiEs },
  en: { plano: planoEn, taller: tallerEn, ui: uiEn },
};

/** D12: el slug es el mismo en los dos idiomas, porque el selector de idioma
 *  cambia solo el primer segmento de la ruta. Si divergen, cada ficha traducida
 *  manda a un 404 — así que rompe la build, que es donde se ve, y no el sitio
 *  ya desplegado, que es donde no se ve.
 *
 *  Compara también el orden: es el del DOM, y por tanto el del recorrido con
 *  teclado. No hay razón para que cambie de un idioma a otro. */
for (const seccion of ["plano", "taller"]) {
  const porIdioma = IDIOMAS.map((lang) =>
    CONTENIDO[lang][seccion].map((proyecto) => proyecto.slug).join(" "),
  );
  if (new Set(porIdioma).size > 1) {
    const detalle = IDIOMAS.map((lang, i) => `${lang}: ${porIdioma[i]}`).join(" | ");
    throw new Error(`D12: los slugs de «${seccion}» divergen entre idiomas. ${detalle}`);
  }
}

/** El slug es común a los dos idiomas, así que la lista sale de cualquiera. */
export function obtenerSlugs(seccion) {
  return CONTENIDO[IDIOMAS[0]][seccion].map((proyecto) => proyecto.slug);
}

export function obtenerContenido(lang) {
  const contenido = CONTENIDO[lang];
  if (!contenido) throw new Error(`Idioma desconocido: ${lang}`);
  return contenido;
}
