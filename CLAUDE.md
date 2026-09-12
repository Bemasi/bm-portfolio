# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint    # eslint . — `next lint` ya no existe en Next 16
```

No hay pruebas todavía. La primera llega en el Sprint 3: una prueba de humo con Playwright en
`e2e/humo.spec.js`.

## Dónde está la verdad

Antes de cambiar nada visual o estructural, lee estos dos:

- **`docs/design/decisiones.md`** — el registro de decisiones (D1–D11), la más reciente arriba.
  Cada entrada dice qué se decidió, por qué, y qué se descartó. Si vas a contradecir una
  decisión, añade una entrada nueva que la supere; no reescribas la vieja.
- **`docs/plan-desarrollo.md`** — ocho sprints ordenados por dependencia. Dice qué toca ahora
  y qué queda fuera de alcance todavía.

`docs/design/contenido-proyectos.md` define los seis campos con los que se cuenta cada
proyecto. La forma de los datos del Sprint 1 sale de ahí, no de la imaginación.

`docs/design/bocetos/*.html` son prototipos desechables de una sola página: sirven de
referencia visual, **no** son código del proyecto. No importes de ahí ni los tomes por la
implementación real — el prototipo abre las fichas como modal y el sitio real usa rutas (D8).

## El sistema de tokens

Es la pieza que hay que entender antes de tocar estilos, y está repartida entre tres archivos.

`app/globals.css` declara los tokens como propiedades CSS en cuatro bloques: `:root` (claro),
una media query de `prefers-color-scheme` para quien no tiene JavaScript, `:root[data-theme="dark"]`
y `:root[data-theme="terminal"]`. Después, `@theme inline` los expone a Tailwind. **`inline` es
obligatorio aquí**: hace que las utilidades apunten a `var(--ground)` en lugar de al valor
resuelto, que es lo único que permite que `bg-ground` cambie con el tema.

Dos trampas:

- Los bloques de tema usan `:root[data-theme="…"]`, no `[data-theme="…"]` a secas. Tailwind
  emite su `@theme` sobre `:root`, así que hace falta la especificidad extra para ganarle.
- Ningún color se define solo dentro de una media query o de un `[data-theme]`. Todo token
  existe primero en el `:root` claro.

`components/ThemeProvider.js` registra los tres temas en `next-themes` con
`attribute="data-theme"`. **«terminal» es un tema más, no un segundo interruptor** (D7): un
solo mecanismo, con persistencia y anti-parpadeo ya resueltos. No añadas un `data-skin` aparte.

Para el patrón «aún no ha hidratado» usa `useSyncExternalStore`, como en
`components/SelectorTema.js`. El clásico `useState(false)` + `useEffect(() => setMontado(true))`
lo rechaza la regla `react-hooks/set-state-in-effect`.

## Restricciones que no se negocian

Salen del diseño, no del gusto. Están razonadas en `decisiones.md`:

- **Sin librería de animación.** Scroll ligado a la vista con `animation-timeline`, transiciones
  con View Transitions, flujos con `stroke-dasharray`. Si algo no sale con CSS, `motion` es la
  única salida permitida — y se anota en `decisiones.md` al usarla.
- **Sin backend.** El contacto son enlaces. Nada de formularios ni funciones serverless.
- **Ni una captura de pantalla** de sistemas de cliente, ni un nombre de cliente en ningún sitio.
  Los proyectos se ilustran con diagramas abstractos.
- **Bilingüe es/en.** Ningún texto literal dentro de un componente: todo vive en `content/<lang>/`.
- Todo lo animado degrada con `prefers-reduced-motion`; todo lo interactivo se usa con teclado.

## Convenciones

- **Código y contenido en español** (`SelectorTema`, `hidratado`, `OPCIONES`). Se conserva el
  nombre en inglés cuando es el de la librería que se envuelve, como `ThemeProvider`.
- **Mensajes de commit en inglés**, siguiendo lo que ya había en el repo.
- **Se trabaja en `dev`.** `master` no recibe código hasta el Sprint 7.
- ESLint se queda en 9: la 10 rompe con el parser de `eslint-config-next` 16
  (`scopeManager.addGlobals is not a function`).

## El contenido y los idiomas

Todo el texto vive en `content/es/` y `content/en/`, un archivo por sección más `ui.js` con
los textos de interfaz. `lib/content.js` es la única puerta: `obtenerContenido(lang)` devuelve
`{ plano, taller, ui }`. Ningún componente escribe un literal, ni siquiera una etiqueta de
campo o el `aria-label` de un selector — se pasan como prop desde el layout.

Las etiquetas de los seis campos están en `ui.<sección>.campos`, y sus claves son las del
objeto de proyecto: el orden del diccionario es el orden en que se pintan. Para añadir un
campo se toca el diccionario y el dato, nunca el componente.

`app/[lang]/layout.js` **es el layout raíz** — no hay `app/layout.js`. Ahí van `<html>`, las
fuentes, el `ThemeProvider` y la cabecera. `dynamicParams = false` deja fuera cualquier idioma
que no sea `es` o `en`, y `/` redirige a `/es` desde `next.config.mjs` (D13).

El slug de cada ficha es el mismo en los dos idiomas (D12): el selector de idioma solo cambia
el primer segmento de la ruta. Cuando el Sprint 3 cree las rutas de ficha, su
`generateStaticParams` debe romper la build si los slugs divergen.

## Estado actual

Sprint 1 terminado. `/es` y `/en` se generan desde los archivos de contenido y la portada
lista los proyectos en crudo: es una comprobación del modelo de datos, no diseño — el plano
la sustituye en el Sprint 2. Los nueve proyectos son contenido de ejemplo hasta el Sprint 6.
Sigue pendiente desplegar en Vercel.
