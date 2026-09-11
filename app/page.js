import { SelectorTema } from "@/components/SelectorTema";

const COLORES = [
  { token: "ground", uso: "el fondo de la página" },
  { token: "surface", uso: "bloques hundidos" },
  { token: "raise", uso: "fichas y nodos" },
  { token: "line", uso: "bordes y conexiones" },
  { token: "muted", uso: "texto secundario" },
  { token: "ink", uso: "texto principal" },
  { token: "accent", uso: "flujos, métricas, foco" },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-5">
        <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
          <span className="font-medium tracking-[0.2em] text-ink">BM</span>{" "}
          sprint 0 · cimientos
        </p>
        <SelectorTema />
      </header>

      <section className="grid gap-6 py-16">
        <p className="flex flex-wrap items-center gap-2.5 font-mono text-xs tracking-[0.16em] text-muted uppercase before:block before:h-px before:w-6 before:bg-accent">
          Referencia viva de tokens
        </p>
        <h1 className="font-display text-5xl leading-none font-semibold tracking-[-0.035em] text-balance sm:text-7xl">
          El sistema, antes que el sitio
        </h1>
        <p className="max-w-[60ch] text-xl leading-snug text-muted">
          Esta página no es el porfolio: es el banco de pruebas de los tokens. Cambia el tema
          ahí arriba y comprueba que todo sigue legible en los tres.{" "}
          <span className="text-ink">
            Lo que no aguante aquí, no llega al plano.
          </span>
        </p>
      </section>

      <section className="grid gap-6 border-t border-line pt-10">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">Color</h2>
        <ul className="grid gap-3">
          {COLORES.map(({ token, uso }) => (
            <li
              key={token}
              className="flex items-center gap-4 border border-line bg-raise px-4 py-3"
            >
              <span
                className="size-10 shrink-0 border border-line"
                style={{ backgroundColor: `var(--${token})` }}
                aria-hidden="true"
              />
              <code className="w-28 shrink-0 font-mono text-xs tracking-[0.1em] text-accent">
                --{token}
              </code>
              <span className="text-sm text-muted">{uso}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 border-t border-line pt-10 mt-16">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">Tipografía</h2>
        <div className="grid gap-6 border border-line bg-raise p-6">
          <div className="grid gap-1">
            <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
              Display · Archivo
            </span>
            <p className="font-display text-4xl font-semibold tracking-[-0.03em]">
              Cierre de facturación nocturno
            </p>
          </div>
          <div className="grid gap-1">
            <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
              Texto · Newsreader
            </span>
            <p className="max-w-[60ch]">
              El cierre de facturación ya no cabía en la ventana nocturna y retrasaba el
              arranque del almacén cada mañana.
            </p>
          </div>
          <div className="grid gap-1">
            <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
              Datos · IBM Plex Mono
            </span>
            <p className="font-mono text-accent tabular-nums">3 h 40 min → 38 min</p>
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-line pt-8 font-mono text-xs leading-relaxed text-muted">
        Sprint 0 de{" "}
        <span className="text-ink">docs/plan-desarrollo.md</span>. El contenido de esta página
        es de ejemplo: desaparece en el Sprint 2.
      </footer>
    </main>
  );
}
