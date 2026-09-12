import Link from "next/link";

/** Un proyecto en el plano. En escritorio se posiciona en porcentaje sobre el
 *  lienzo; por debajo de 760px cae en el flujo del documento y el recorrido se
 *  vuelve vertical. El orden del DOM es el de los datos, así que el recorrido
 *  con teclado y el de lectura en móvil coinciden.
 *
 *  La ruta de ficha llega en el Sprint 3 (D8): el enlace ya apunta ahí. */
export function Nodo({ lang, proyecto, etiqueta }) {
  return (
    <Link
      href={`/${lang}/plano/${proyecto.slug}`}
      style={{ left: `${proyecto.posicion.x}%`, top: `${proyecto.posicion.y}%` }}
      className="absolute grid w-[clamp(190px,21vw,238px)] -translate-x-1/2 -translate-y-1/2 gap-1.5 rounded-sm border border-line bg-raise px-4 pt-3.5 pb-4 text-left transition-colors hover:border-accent max-[760px]:static max-[760px]:w-auto max-[760px]:translate-none"
    >
      <span className="font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase">
        {etiqueta} {proyecto.id}
      </span>
      <span className="font-display text-base leading-tight font-semibold tracking-[-0.01em]">
        {proyecto.nombre}
      </span>
      <span className="font-mono text-[0.78rem] text-accent tabular-nums">
        {proyecto.metrica}
      </span>
    </Link>
  );
}
