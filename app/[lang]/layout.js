import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SelectorIdioma } from "@/components/SelectorIdioma";
import { SelectorTema } from "@/components/SelectorTema";
import { IDIOMAS, obtenerContenido } from "@/lib/content";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Solo existen /es y /en: cualquier otro idioma es un 404, no una página vacía.
export const dynamicParams = false;

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return obtenerContenido(lang).ui.meta;
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const { ui } = obtenerContenido(lang);

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${archivo.variable} ${newsreader.variable} ${plexMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-5">
            <p className="font-mono text-xs tracking-[0.2em] text-ink uppercase">BM</p>
            <div className="flex flex-wrap items-center gap-4">
              <SelectorIdioma lang={lang} etiqueta={ui.idioma} />
              <SelectorTema etiquetas={ui.tema} />
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
