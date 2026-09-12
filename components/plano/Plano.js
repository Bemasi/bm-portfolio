import { Nodo } from "./Nodo";

/** El lienzo es un viewBox de 1000×600 y el aspecto del contenedor es el mismo
 *  (5/3), así que la posición en porcentaje de cada proyecto cae directa en
 *  coordenadas del SVG y las líneas acaban exactamente en su nodo. */
const LIENZO = { ancho: 1000, alto: 600 };
const CENTRO = { x: LIENZO.ancho / 2, y: LIENZO.alto / 2 };

// Ciclo del pulso; los cuatro flujos se reparten el mismo ciclo con retardo
// negativo para que arranquen ya escalonados, no todos a la vez.
const CICLO = 4.2;

/** Una S suave del centro al nodo: el tirante sale casi horizontal y entra
 *  casi horizontal, que es como se dibuja un flujo en un plano. */
function cable({ x, y }) {
  const destino = { x: (x / 100) * LIENZO.ancho, y: (y / 100) * LIENZO.alto };
  const dx = (destino.x - CENTRO.x) * 0.42;
  const dy = (destino.y - CENTRO.y) * 0.12;
  return `M${CENTRO.x},${CENTRO.y} C${CENTRO.x + dx},${CENTRO.y + dy} ${destino.x - dx},${destino.y - dy} ${destino.x},${destino.y}`;
}

export function Plano({ lang, proyectos, ui }) {
  const cables = proyectos.map((proyecto) => cable(proyecto.posicion));

  return (
    <div className="relative aspect-[5/3] max-[760px]:grid max-[760px]:aspect-auto max-[760px]:gap-3.5 max-[760px]:border-l max-[760px]:border-line max-[760px]:pl-6">
      {/* Decorativo: los flujos también se leen en el campo «arquitectura» de
          cada ficha, así que repetirlos aquí para un lector de pantalla sobra. */}
      <svg
        viewBox={`0 0 ${LIENZO.ancho} ${LIENZO.alto}`}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full max-[760px]:hidden"
      >
        {cables.map((d, i) => (
          <path key={`hilo-${i}`} className="hilo" d={d} />
        ))}
        {cables.map((d, i) => (
          <path
            key={`flujo-${i}`}
            className="flujo"
            d={d}
            pathLength="100"
            style={{ animationDelay: `${(-CICLO * i) / cables.length}s` }}
          />
        ))}
      </svg>

      <p className="absolute top-1/2 left-1/2 grid w-[clamp(88px,11vw,124px)] aspect-square -translate-x-1/2 -translate-y-1/2 rotate-45 place-items-center border border-accent bg-surface text-center font-mono text-xs max-[760px]:static max-[760px]:aspect-auto max-[760px]:w-auto max-[760px]:translate-none max-[760px]:rotate-none max-[760px]:justify-items-start max-[760px]:p-3 max-[760px]:text-left">
        <span className="-rotate-45 max-[760px]:rotate-none">
          <span className="block font-medium tracking-[0.1em]">
            {ui.centro.sistema}
          </span>
          <span className="block text-[0.7rem] tracking-[0.08em] text-muted">
            {ui.centro.nota}
          </span>
        </span>
      </p>

      {proyectos.map((proyecto) => (
        <Nodo
          key={proyecto.slug}
          lang={lang}
          proyecto={proyecto}
          etiqueta={ui.proyecto}
        />
      ))}
    </div>
  );
}
