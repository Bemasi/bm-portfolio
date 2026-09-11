# Decisiones de diseño

La más reciente arriba. Cada entrada: qué se decide, por qué, y qué se descartó.

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
