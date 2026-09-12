import { Fragment } from "react";

/** La ficha de un proyecto. La comparten el plano y el taller (D5): cambian los
 *  campos y el encabezado, nunca la estructura. El orden de `campos` es el orden
 *  en que se pintan, así que añadir un campo es tocar el diccionario y el dato.
 *
 *  `destacado` es la clave del campo que cierra la sección —el resultado en el
 *  plano, lo aprendido en el taller— y se pinta en la voz del acento.
 *
 *  El enlace de vuelta es un <a> a pelo, no un <Link>: la transición solo salta
 *  en navegaciones entre documentos, y el enrutado de cliente se la saltaría. */
export function Ficha({ proyecto, campos, encabezado, destacado, volver }) {
  return (
    <main className="mx-auto grid max-w-3xl gap-8 px-6 py-12">
      <a
        href={volver.href}
        className="justify-self-start font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-accent"
      >
        ← {volver.texto}
      </a>

      <header
        style={{ viewTransitionName: `ficha-${proyecto.slug}` }}
        className="grid gap-2 rounded-sm border border-line bg-raise p-6 shadow-ficha"
      >
        <p className="font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase">
          {encabezado}
        </p>
        {/* El foco entra aquí: al llegar de la portada, lo primero que anuncia
            un lector de pantalla es de qué proyecto es esta página. */}
        <h1
          tabIndex={-1}
          autoFocus
          className="font-display text-3xl font-semibold tracking-[-0.02em]"
        >
          {proyecto.nombre}
        </h1>
        {proyecto.metrica && (
          <p className="font-mono text-accent tabular-nums">{proyecto.metrica}</p>
        )}
      </header>

      {proyecto.flujo && (
        <p className="flex flex-wrap items-center gap-2.5 rounded-sm border border-dashed border-line px-3.5 py-3 font-mono text-[0.78rem] text-muted">
          {proyecto.flujo.map((paso, i) => (
            <Fragment key={paso}>
              {i > 0 && (
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              )}
              <span>{paso}</span>
            </Fragment>
          ))}
        </p>
      )}

      <dl className="grid gap-4">
        {Object.entries(campos).map(([clave, etiqueta]) => (
          <div
            key={clave}
            className="grid gap-1 sm:grid-cols-[150px_1fr] sm:items-baseline sm:gap-3.5"
          >
            <dt className="font-mono text-[0.72rem] tracking-[0.12em] text-muted uppercase">
              {etiqueta}
            </dt>
            <dd
              className={
                clave === destacado
                  ? "font-mono text-accent tabular-nums"
                  : "max-w-[65ch]"
              }
            >
              {proyecto[clave]}
            </dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
