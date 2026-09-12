import { notFound } from "next/navigation";
import { Ficha } from "@/components/Ficha";
import { obtenerContenido, obtenerSlugs } from "@/lib/content";

// El slug sale del contenido, así que cualquier otro es un 404 de verdad.
export const dynamicParams = false;

/** Next llama a esto una vez por idioma del layout padre y combina los params.
 *  Los slugs son comunes a los dos (D12), comprobado al importar `lib/content`. */
export function generateStaticParams() {
  return obtenerSlugs("plano").map((slug) => ({ slug }));
}

function buscar(lang, slug) {
  const { plano, ui } = obtenerContenido(lang);
  return { proyecto: plano.find((p) => p.slug === slug), ui };
}

/** El motivo de que la ficha sea ruta y no modal (D8) es que se comparta: un
 *  enlace sin su propio título no se comparte. El resto de metadatos —hreflang,
 *  sitemap, Open Graph— son del Sprint 6. */
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const { proyecto, ui } = buscar(lang, slug);
  if (!proyecto) return {};
  return {
    title: `${proyecto.nombre} — ${ui.meta.title}`,
    description: proyecto.problema,
  };
}

export default async function FichaDelPlano({ params }) {
  const { lang, slug } = await params;
  const { proyecto, ui } = buscar(lang, slug);
  if (!proyecto) notFound();

  return (
    <Ficha
      proyecto={proyecto}
      campos={ui.plano.campos}
      encabezado={`${ui.plano.proyecto} ${proyecto.id}`}
      destacado="resultado"
      volver={{ href: `/${lang}#${proyecto.slug}`, texto: ui.plano.volver }}
    />
  );
}
