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

export function obtenerContenido(lang) {
  const contenido = CONTENIDO[lang];
  if (!contenido) throw new Error(`Idioma desconocido: ${lang}`);
  return contenido;
}
