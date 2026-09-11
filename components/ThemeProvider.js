"use client";

import { ThemeProvider as NextThemes } from "next-themes";

/** Los tres juegos de tokens se gestionan con un solo mecanismo: "terminal" es
 *  un tema más para next-themes, no un segundo interruptor. Decisión D7. */
export function ThemeProvider({ children }) {
  return (
    <NextThemes
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      themes={["light", "dark", "terminal"]}
      disableTransitionOnChange
    >
      {children}
    </NextThemes>
  );
}
