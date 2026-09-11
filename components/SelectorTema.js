"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const sinCambios = () => () => {};

const OPCIONES = [
  { valor: "system", etiqueta: "Sistema" },
  { valor: "light", etiqueta: "Claro" },
  { valor: "dark", etiqueta: "Oscuro" },
  { valor: "terminal", etiqueta: "Terminal" },
];

export function SelectorTema() {
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
      aria-label="Tema"
      className="flex flex-wrap gap-1.5 font-mono text-xs"
    >
      {OPCIONES.map(({ valor, etiqueta }) => {
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
            {etiqueta}
          </button>
        );
      })}
    </div>
  );
}
