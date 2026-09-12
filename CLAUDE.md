# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint    # eslint . — `next lint` ya no existe en Next 16
```

```bash
npm run test:e2e   # playwright test — construye y arranca el sitio él solo
```

`e2e/humo.spec.js` es humo, no cobertura. Corre en **Chromium y Firefox a propósito**: el
primero tiene View Transitions entre documentos y el segundo no, así que la suite es también
la comprobación de que sin ellas se navega igual de bien (D14). Los textos esperados los
importa de `lib/content.js`, así que reescribir contenido no obliga a tocar la prueba.

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

## El plano

`components/plano/Plano.js` dibuja un `viewBox` de 1000×600 dentro de un contenedor con
`aspect-[5/3]`: el mismo aspecto. Por eso la `posicion` en porcentaje de cada proyecto cae
directa en coordenadas del SVG y las curvas acaban exactamente donde está su nodo. **La
geometría sale del dato, no de rutas dibujadas a mano** — el prototipo las tiene fijas, aquí
las calcula `cable()`. Para mover un proyecto se toca `posicion` en `content/<lang>/plano.js`
y nada más.

`pathLength="100"` en cada pulso reescala la curva a 100 unidades, así que el `stroke-dasharray`
tarda lo mismo en la línea corta que en la larga. Los cuatro se reparten el mismo ciclo con
`animation-delay` negativo, calculado por índice.

El corte de móvil es **760px**, que no es un breakpoint de Tailwind: se escribe como variante
arbitraria `max-[760px]:`. Por debajo, el SVG desaparece y los nodos vuelven al flujo del
documento (`static`, `translate-none`, `rotate-none`) como recorrido vertical. El orden del
DOM es el de los datos, así que el recorrido con teclado y el de lectura coinciden.

`.hilo` y `.flujo` viven en `globals.css`, no en utilidades: son propiedades SVG que Tailwind
solo expresa con valores arbitrarios. Con `prefers-reduced-motion` el pulso se oculta entero
— congelarlo dejaría un trazo suelto sobre el hilo.

## La ficha y la transición

La ruta es `app/[lang]/plano/[slug]/page.js` y el componente `components/Ficha.js`, que el
taller reutilizará entero en el Sprint 4 (D5): cambian `campos`, `encabezado` y `destacado`
—la clave del campo que se pinta en la voz del acento—, nunca la estructura.

**El nodo y el enlace de vuelta son `<a>`, no `<Link>` (D14).** No es un descuido: la regla
`@view-transition { navigation: auto }` solo actúa entre documentos, y el enrutado de cliente
de Next se la salta. Si alguien los «arregla» pasándolos a `<Link>`, la transición desaparece
sin que falle nada — y con ella el foco, que depende de la navegación de documento:
`autofocus` en el `<h1>` al entrar, y el ancla `/es#<slug>` al volver.

El emparejamiento lo hace `view-transition-name: ficha-<slug>`, que comparten el nodo de la
portada y la cabecera de la ficha. El slug es un identificador CSS válido, así que va directo.

`obtenerSlugs(seccion)` alimenta `generateStaticParams`. Y `lib/content.js` comprueba **al
importarse** que los slugs no divergen entre idiomas (D12): si lo hacen, revienta la build
entera, no solo la ruta de ficha.

## Estado actual

Sprint 3 terminado. El plano y las ocho fichas se generan estáticamente, la transición se ve
en Chromium y se degrada limpia en Firefox, y las dieciséis pruebas de humo pasan en los dos.
El taller de la portada sigue siendo la lista en crudo del Sprint 1 hasta el Sprint 4, y los
nueve proyectos son contenido de ejemplo hasta el Sprint 6.

**Pendiente conocido:** un 404 (`/fr`, `/favicon.ico`, un slug inventado) devuelve el código
correcto pero deja un `NoFallbackError` en el log del servidor. Viene de que no hay
`app/layout.js` donde colgar un 404 global — `app/[lang]/layout.js` es la raíz. Lo resuelve
el Sprint 5 con `app/[lang]/not-found.js`; no es nuevo del Sprint 3. Sigue pendiente desplegar
en Vercel.
