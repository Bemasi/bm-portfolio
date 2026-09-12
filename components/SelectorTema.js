"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const sinCambios = () => () => {};

// El orden de los botones; las etiquetas vienen del diccionario del idioma.
const VALORES = ["system", "light", "dark", "terminal"];

export function SelectorTema({ etiquetas }) {
  const { theme, setTheme } = useTheme();

  // En el servidor no sabemos qué tema tiene el visitante, así que hasta que
  // hidrata no se marca ningún botón como activo. El valor cambia de false a
  // true en la hidratación, sin tocar estado dentro de un efecto.
  const hidratado = useSyncExternalStore(
    sinCambios,
    () => true,
    () => false,
  );

  return (
    <div
      role="group"
      aria-label={etiquetas.grupo}
      className="flex flex-wrap gap-1.5 font-mono text-xs"
    >
      {VALORES.map((valor) => {
        const activo = hidratado && theme === valor;
        return (
          <button
            key={valor}
            type="button"
            onClick={() => setTheme(valor)}
            aria-pressed={activo}
            className={`cursor-pointer rounded-sm border px-2.5 py-1.5 transition-colors ${
              activo
                ? "border-accent text-accent"
                : "border-line text-muted hover:border-accent"
            }`}
          >
            {etiquetas[valor]}
          </button>
        );
      })}
    </div>
  );
}
