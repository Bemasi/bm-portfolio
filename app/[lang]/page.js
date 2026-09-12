import { Plano } from "@/components/plano/Plano";
import { obtenerContenido } from "@/lib/content";

/** Texto en crudo a propósito: es lo que queda del Sprint 1. El taller lo
 *  cambia por su línea de tiempo en el Sprint 4. */
function Campos({ campos, proyecto }) {
  return (
    <dl className="grid gap-2">
      {Object.entries(campos).map(([clave, etiqueta]) => (
        <div key={clave} className="grid gap-0.5">
          <dt className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
            {etiqueta}
          </dt>
          <dd className="max-w-[70ch]">{proyecto[clave]}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function Portada({ params }) {
  const { lang } = await params;
  const { plano, taller, ui } = obtenerContenido(lang);

  return (
    <main className="mx-auto grid max-w-5xl gap-16 px-6 py-16">
      <section className="grid gap-8">
        <header className="grid gap-2">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.03em]">
            {ui.plano.titulo}
          </h1>
          <p className="text-muted">{ui.plano.entradilla}</p>
        </header>
        <Plano lang={lang} proyectos={plano} ui={ui.plano} />
      </section>

      <section className="grid gap-8 border-t border-line pt-16">
        <header className="grid gap-2">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em]">
            {ui.taller.titulo}
          </h2>
          <p className="text-muted">{ui.taller.entradilla}</p>
        </header>
        {taller.map((pieza) => (
          <article
            key={pieza.slug}
            className="grid gap-4 border border-line bg-raise p-6"
          >
            <header className="grid gap-1">
              <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                {pieza.anio} · {ui.taller.estados[pieza.estado]}
              </p>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                {pieza.nombre}
              </h3>
            </header>
            <Campos campos={ui.taller.campos} proyecto={pieza} />
          </article>
        ))}
      </section>

      <footer className="border-t border-line pt-8 font-mono text-xs text-muted">
        {ui.pie}
      </footer>
    </main>
  );
}
