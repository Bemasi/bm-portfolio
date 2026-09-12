"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IDIOMAS, NOMBRE_IDIOMA } from "@/lib/content";

/** Conserva la página: solo cambia el primer segmento de la ruta. Funciona
 *  porque los slugs de ficha son los mismos en los dos idiomas (D12). */
export function SelectorIdioma({ lang, etiqueta }) {
  const ruta = usePathname();

  return (
    <nav aria-label={etiqueta} className="flex gap-1.5 font-mono text-xs">
      {IDIOMAS.map((idioma) => {
        const activo = idioma === lang;
        return (
          <Link
            key={idioma}
            href={ruta.replace(/^\/[^/]*/, `/${idioma}`)}
            hrefLang={idioma}
            aria-current={activo ? "true" : undefined}
            className={`rounded-sm border px-2.5 py-1.5 transition-colors ${
              activo
                ? "border-accent text-accent"
                : "border-line text-muted hover:border-accent"
            }`}
          >
            {NOMBRE_IDIOMA[idioma]}
          </Link>
        );
      })}
    </nav>
  );
}
