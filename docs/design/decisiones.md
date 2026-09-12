# Decisiones de diseño

La más reciente arriba. Cada entrada: qué se decide, por qué, y qué se descartó.

---

## 2026-09-12 · D14 · Entre el plano y la ficha se navega con `<a>`, no con `<Link>`

Los enlaces del nodo a su ficha y el de vuelta son anclas nativas. `next/link` se queda para
el selector de idioma y para lo que no cruce esta frontera.

**Por qué:** `@view-transition { navigation: auto }` solo actúa en navegaciones **entre
documentos**. `<Link>` las intercepta y hace enrutado de cliente, que nunca pasa por esa
regla: la transición sencillamente no ocurriría. D8 ya decía «entre documentos»; esto es lo
que hace falta para que sea verdad.

De paso resuelve el foco sin una línea de JavaScript. Al entrar, `autofocus` en el `<h1>`
—que es navegación de documento, así que el navegador lo respeta—. Al volver, el enlace
apunta a `/es#<slug>`: el navegador deja el foco en el nodo del que salimos, que es
justo lo que pedía el sprint.

**Descartado:** `experimental.viewTransition` de Next con el `<ViewTransition>` de React.
Mete un flag experimental y una API de React para conseguir lo que el navegador ya hace
solo, y ata el efecto a una versión concreta del framework.

**Coste asumido:** en esos enlaces se pierden el prefetch y el enrutado de cliente. Son diez
páginas estáticas: la navegación completa es un GET de HTML ya generado.

**Comprobado:** `e2e/humo.spec.js` corre en Chromium —que tiene transición entre documentos—
y en Firefox —que no la tiene—. Las dieciséis pruebas pasan en los dos: donde no hay
transición hay navegación normal, sin salto ni hueco.

---

## 2026-09-12 · D13 · La raíz redirige a español, sin negociar por cabecera

`/` devuelve un 307 a `/es`. No se mira `Accept-Language`.

**Por qué:** negociar el idioma obliga a middleware, y el middleware convierte una página
estática en una petición con lógica en cada visita. El sitio son ocho páginas: el selector
está siempre visible y un enlace compartido ya trae el idioma en la ruta.

**Descartado:** middleware de negociación, y una raíz que muestre el selector antes de entrar.

---

## 2026-09-12 · D12 · El slug de cada ficha es el mismo en los dos idiomas

`/es/plano/cierre-nocturno` y `/en/plano/cierre-nocturno`. Se traduce el contenido, no la URL.

**Por qué:** el selector de idioma conserva la página cambiando solo el primer segmento de la
ruta. Con slugs traducidos haría falta una tabla de correspondencias por sección y por idioma
para que cada enlace siga apuntando a su gemelo.

**Coste asumido:** el slug va en español para un lector inglés. Pesa poco: casi todos son
nombres propios o términos técnicos, y es texto que no se lee, se pega.

**Se comprueba en el Sprint 3**, cuando existan las rutas de ficha: si los slugs divergen
entre idiomas, `generateStaticParams` debe romper la build en vez de dejar enlaces rotos.

---

## 2026-09-12 · D11 · Next.js 16, no 15 · supera parcialmente a D6

Al montar el Sprint 0, la versión publicada era Next 16.3.5. Como el proyecto arrancaba de
cero, se va con ella en vez de con la 15 que decía D6.

**Por qué:** empezar en la versión anterior solo compra una migración pendiente. El App
Router no cambia, y Turbopack ya es el empaquetador por defecto.

**Efecto colateral:** `next lint` desapareció en la 16, así que el script de lint llama a
`eslint` directamente. Y ESLint 10 todavía no funciona con el parser que trae
`eslint-config-next` 16 — `scopeManager.addGlobals is not a function` — así que se queda en
ESLint 9 hasta que lo arreglen.

**Lo demás de D6 sigue en pie:** Tailwind v4, `next-themes`, y ninguna librería de animación.

---

## 2026-09-12 · D10 · Contacto por enlaces, sin formulario

Email y LinkedIn como enlaces. Nada de formulario.

**Por qué:** un formulario obliga a una función serverless, protección antispam y un sitio
donde caigan los mensajes, a cambio de nada que un `mailto:` no haga ya. Cero backend en
todo el proyecto.

---

## 2026-09-12 · D9 · Bilingüe español e inglés desde el primer día

Rutas `/[lang]` con `es` y `en` generadas estáticamente, y todo el texto fuera de los
componentes, en archivos de contenido por idioma.

**Por qué:** el mercado SAP es internacional y muchas búsquedas llegan en inglés. Y añadir
un segundo idioma a un sitio que no lo previó cuesta mucho más que preverlo: obliga a sacar
a mano cada cadena incrustada en un componente.

**Coste asumido:** cada ficha se escribe dos veces. La traducción va la última, cuando el
texto en español ya no se mueva.

---

## 2026-09-12 · D8 · La ficha de proyecto es una ruta, no un modal

En el prototipo el detalle se abre como diálogo. En el sitio real cada proyecto tendrá su
propia URL: `/es/plano/cierre-nocturno`.

**Por qué:** un recruiter comparte el enlace de un proyecto concreto, no el de la portada, y
Google indexa cada ficha por separado. Un modal no tiene URL que compartir.

**No se pierde la transición:** las View Transitions también funcionan entre documentos
(`@view-transition { navigation: auto }`), así que el zoom del nodo a la ficha se mantiene, y
donde el navegador no las soporta simplemente navega sin animación.

---

## 2026-09-12 · D7 · La variante «terminal» es un juego de tokens, no un diseño aparte

El brutalismo de terminal (ámbar sobre negro, todo monoespaciado) se mantiene vivo como
skin alternativo, no como dirección rival: son los mismos componentes con otros valores de
`--ground`, `--ink`, `--accent` y las dos familias tipográficas.

**Por qué:** probar la alternativa cuesta veinte líneas de CSS en vez de un segundo diseño.
Si acaba gustando más, se promociona a principal cambiando qué bloque de tokens va en `:root`.

**Pendiente:** decidir si se queda como interruptor visible para el visitante o si solo
existió para elegir dirección.

---

## 2026-09-12 · D6 · Stack: Next.js 15 (App Router) + Tailwind v4, sin librería de animación

Se retoma el stack que ya tenía el repo antes del reinicio: Next.js 15 en JavaScript,
Tailwind v4 vía `@tailwindcss/postcss`, `next-themes` para claro/oscuro. `motion` entra solo
si alguna interacción concreta no sale con CSS.

**Por qué:** casi todo lo que la gente instala GSAP, Lenis o Locomotive para conseguir ya es
nativo: `animation-timeline: scroll()` para lo ligado al scroll, View Transitions para las
transiciones entre vistas, `stroke-dasharray` para los flujos. Menos peso, menos
dependencias que envejecen, y más fluido, no menos.

**Descartado:** una SPA con librería de scroll suave; WebGL para el plano.

---

## 2026-09-12 · D5 · El plano y el taller comparten lenguaje pero no estructura

Dos secciones, dos organizaciones distintas:

- **El plano** (profesional): topología. Nodos alrededor de un sistema central, unidos por
  flujos. El eje es *qué habla con qué*.
- **El taller** (personal): tiempo. Una línea con las piezas colgando y su estado —
  vivo / en pausa / aparcado.

**Por qué:** repetir el mismo plano dos veces hace el sitio predecible a la segunda sección.
Y las dos clases de proyecto no se parecen: los de cliente tienen arquitectura y restricción;
los personales tienen fecha, estado y la posibilidad de haber sido abandonados.

**El taller admite el fracaso a propósito.** Enseñar un proyecto aparcado y decir por qué se
aparcó es más creíble que una fila de cosas todas «terminadas».

---

## 2026-09-12 · D4 · Todos los proyectos se cuentan con los mismos seis campos

Seis campos fijos por proyecto, distintos en cada sección. Ver `contenido-proyectos.md`.

**Por qué:** una estructura repetida deja comparar proyectos entre sí y evita que unos se
cuenten largo y otros de pasada. El campo de **restricción** es el que más pesa: es lo que
separa un trabajo de senior de uno de junior, y casi ningún porfolio lo cuenta.

**Regla dura:** si un proyecto profesional no da un número, no entra en el porfolio — es una
línea del CV.

---

## 2026-09-12 · D3 · Ni una sola captura de pantalla

El sitio no lleva pantallazos de sistemas de cliente. Los proyectos se ilustran con diagramas
abstractos de flujo que dibujamos nosotros.

**Por qué:** el trabajo es SAP bajo contrato, así que no hay casi nada enseñable. En vez de
pelear con esa limitación, se convierte en el estilo: el diagrama sustituye al pantallazo y
el NDA deja de ser un problema.

**Efecto lateral bueno:** la página carga muy rápido y no envejece con las capturas.

---

## 2026-09-12 · D2 · Riesgo visual alto, asumido

Se elige una dirección claramente experimental sabiendo que filtra: encantará a unos y
desconcertará a otros.

**Descartado:** la versión sobria con personalidad solo en los detalles, y el doble modo
«recruiter / explorer» con interruptor. El doble modo sigue siendo la red de seguridad si
más adelante la versión experimental resulta demasiado hostil para un primer contacto.

---

## 2026-09-12 · D1 · Concepto: el porfolio es un landscape de sistemas

La web no es una página con secciones, es un plano. Cada proyecto es un nodo; al abrirlo, la
vista entra dentro de él y aparece su flujo.

**Por qué:** es el lenguaje visual del propio oficio —nodos, flujos, ventanas de proceso— y
no necesita material que no podemos enseñar.

**Descartado:** el brutalismo de terminal como concepto completo (sobrevive como skin, ver D7)
y la dirección «los datos como material», más sobria pero menos memorable.
