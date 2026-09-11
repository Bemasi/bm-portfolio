# Plan de desarrollo

Ocho sprints ordenados por dependencia, sin fechas. Cada uno acaba con algo desplegado y
mirable en la URL pública — nada de ramas largas que no se ven hasta el final.

**Diseño y decisiones:** [`docs/design/`](design/) · **Prototipo:** [`docs/design/bocetos/2026-09-12-landscape.html`](design/bocetos/2026-09-12-landscape.html)

## Restricciones globales

Aplican a todos los sprints:

- **Next.js 15** (App Router, JavaScript, no TypeScript) · **Tailwind v4** vía `@tailwindcss/postcss` · **`next-themes`**.
- **Sin librería de animación.** Scroll ligado a la vista con `animation-timeline`, transiciones con View Transitions, flujos con `stroke-dasharray`. `motion` solo entra si una interacción concreta no sale con CSS, y se anota en `decisiones.md` cuando pase.
- **Bilingüe es/en** desde el principio. Ningún texto vive dentro de un componente.
- **Ni una captura de pantalla** de sistemas de cliente. Ningún nombre de cliente en ningún sitio.
- **Sin backend.** El contacto son enlaces. Nada de formularios ni funciones serverless.
- Todo lo animado degrada con `prefers-reduced-motion`, y todo lo interactivo se usa con teclado.

## Decisiones que este plan cierra

**La ficha de proyecto es una ruta, no un modal.** En el prototipo el detalle se abre como
diálogo; en el sitio real cada proyecto tendrá su propia URL (`/es/plano/cierre-nocturno`).
Un recruiter comparte el enlace de un proyecto concreto, y Google lo indexa. La transición de
zoom se mantiene: las View Transitions también funcionan entre documentos, y donde el
navegador no las soporta simplemente navega sin animación.

**Pendiente, no bloquea:** si la variante «terminal» se queda como interruptor visible o si
solo existió para elegir dirección (D7). Se decide en el Sprint 6.

---

## Sprint 0 · Cimientos y primer despliegue

**Por qué va primero:** hasta que no haya una URL pública, cada sprint siguiente se revisa a ciegas.

- Scaffold de Next.js 15 en JavaScript, App Router, con Tailwind v4 y ESLint.
- Traducir los tokens del prototipo a `@theme` de Tailwind: los tres juegos (claro, oscuro, terminal), fuentes Archivo / Newsreader / IBM Plex Mono con `next/font`.
- `next-themes` con el interruptor claro/oscuro, respetando el ajuste del sistema.
- Desplegar en Vercel desde `dev` con previews automáticas por rama.

**Hecho cuando:** hay una URL pública que enseña una página con los tres juegos de tokens
aplicados y el interruptor de tema funcionando.

**Archivos clave:** `app/layout.js`, `app/globals.css`, `next.config.mjs`, `package.json`

---

## Sprint 1 · Modelo de contenido e idiomas

**Por qué va aquí:** todo lo demás pinta estos datos. Cambiar la forma del dato después obliga
a rehacer las dos secciones.

- Estructura de datos de proyecto, siguiendo [`contenido-proyectos.md`](design/contenido-proyectos.md): los seis campos del plano y los seis del taller, más `id`, `slug`, `flujo` y posición.
- Contenido en `content/es/` y `content/en/`, un archivo por sección. Nada de texto en componentes.
- Rutas `app/[lang]/`, con `generateStaticParams` para `es` y `en`.
- Diccionario de textos de interfaz (navegación, etiquetas de campo, pies) por idioma.
- Selector de idioma que conserva la página en la que estás.

**Hecho cuando:** `/es` y `/en` existen, se leen desde los archivos de contenido y el selector
salta entre ellas sin volver a la portada. Sin diseño todavía: texto en crudo vale.

**Archivos clave:** `content/{es,en}/plano.js`, `content/{es,en}/taller.js`, `content/{es,en}/ui.js`, `app/[lang]/layout.js`, `lib/content.js`

---

## Sprint 2 · El plano

**Depende de:** S1 (los datos) y S0 (los tokens).

- Componente del plano: SVG de fondo con las conexiones, nodos posicionados en porcentaje.
- Flujos animados con `stroke-dasharray`, con `pathLength="100"` para que la velocidad no dependa del largo real de cada curva.
- Adaptación a móvil: por debajo de 760px el plano se convierte en recorrido vertical y el SVG desaparece.
- Fallback de `prefers-reduced-motion`: sin pulsos, contenido intacto.

**Hecho cuando:** el plano se ve con los proyectos reales en los dos idiomas, en escritorio y
en móvil, y sigue siendo legible con las animaciones desactivadas.

**Archivos clave:** `app/[lang]/page.js`, `components/plano/Plano.js`, `components/plano/Nodo.js`

---

## Sprint 3 · La ficha de proyecto y la transición

**Depende de:** S2. Es el sprint con más riesgo técnico — conviene que llegue pronto.

- Ruta `app/[lang]/plano/[slug]/page.js`, generada estáticamente desde el contenido.
- View Transitions entre documentos: `@view-transition { navigation: auto }` más `view-transition-name` compartido entre el nodo y la cabecera de la ficha.
- Comprobar la degradación en un navegador sin soporte: debe navegar normal, sin salto ni hueco.
- Navegación con teclado y foco: al entrar en la ficha el foco va al encabezado; al volver, al nodo del que salimos.
- Una prueba de humo con Playwright: la portada carga en ambos idiomas, un proyecto abre su ruta y la ficha muestra los seis campos.

**Hecho cuando:** cada proyecto tiene URL propia compartible, la transición se ve continua
donde hay soporte y correcta donde no, y la prueba de humo pasa.

**Archivos clave:** `app/[lang]/plano/[slug]/page.js`, `components/Ficha.js`, `e2e/humo.spec.js`

---

## Sprint 4 · El taller

**Depende de:** S3 — reutiliza la ficha y la transición enteras, solo cambian los campos.

- Línea de tiempo en grid: las piezas alternan arriba y abajo, con su línea de conexión a la línea central.
- Estados `vivo` / `pausa` / `aparcado` codificados en el color de la conexión y en la opacidad de la ficha, no solo en la etiqueta.
- Misma adaptación a móvil que el plano: la línea se vuelve vertical.
- Rutas `app/[lang]/taller/[slug]/page.js`.

**Hecho cuando:** las dos secciones conviven, se distinguen a simple vista y comparten ficha
y transición.

**Archivos clave:** `components/taller/Taller.js`, `app/[lang]/taller/[slug]/page.js`

---

## Sprint 5 · Entrada, cierre y contacto

**Depende de:** S4 — el hero se escribe mejor cuando ya ves lo que presenta.

- Hero con la tipografía cinética: el eje de anchura de Archivo abriéndose al cargar, partiendo de un estado ya visible.
- Cabecera con navegación entre las dos secciones y el selector de idioma.
- Bloque de contacto: email y LinkedIn como enlaces, y el CV en PDF si decides incluirlo.
- Pie y página 404 con el mismo lenguaje visual.

**Hecho cuando:** el sitio se recorre entero de principio a fin sin huecos ni texto provisional.

**Archivos clave:** `components/Hero.js`, `components/Cabecera.js`, `components/Contacto.js`, `app/[lang]/not-found.js`

---

## Sprint 6 · Acabado

**Depende de:** contenido real terminado. Este sprint es el que no se puede hacer con relleno.

- Metadatos por página e idioma, `hreflang` entre las dos versiones, `sitemap.xml`, `robots.txt`.
- Imágenes Open Graph generadas con `next/og` — el diagrama del proyecto, no una plantilla.
- Pasada de accesibilidad: recorrido completo con teclado, contraste de los tres temas, prueba con lector de pantalla en una ficha.
- Lighthouse en las cuatro categorías, en móvil.
- Decidir D7: si el interruptor «terminal» se queda visible o desaparece.

**Hecho cuando:** Lighthouse ≥ 95 en las cuatro categorías en móvil, `hreflang` validado y el
sitio recorrible entero sin ratón.

---

## Sprint 7 · Dominio y lanzamiento

- Dominio propio apuntando a Vercel, con HTTPS y redirección de `www`.
- Analítica ligera y sin cookies, o ninguna.
- Última lectura del contenido en los dos idiomas, en voz alta, buscando frases de relleno.
- Fusionar `dev` en `master`.

**Hecho cuando:** el sitio está en su dominio y lo puedes enviar sin explicar nada.

---

## Vía paralela · El contenido

No es un sprint: es trabajo tuyo que avanza en paralelo desde hoy y que **bloquea el Sprint 6**.

1. Elegir los cuatro o cinco proyectos profesionales que entran.
2. Rellenar cada uno con la plantilla de [`contenido-proyectos.md`](design/contenido-proyectos.md). El campo de restricción es el que cuesta y el que más vale.
3. Comprobar que cada uno tiene un número real. El que no lo tenga, fuera.
4. Elegir las piezas del taller, incluida al menos una aparcada.
5. Traducir al inglés — lo último, cuando el texto en español ya no se mueva.

## Cómo se ejecuta cada sprint

Este documento es el mapa, no las instrucciones. Al empezar cada sprint lo desglosamos en
tareas con su detalle, y se trabaja en `dev` con commits pequeños. `master` solo recibe
código en el Sprint 7.
