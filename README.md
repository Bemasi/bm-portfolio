# bm-portfolio

Porfolio profesional de Benjamín Mato — desarrollo y arquitectura SAP / ABAP.

## Estado

Sprint 3 de [ocho](docs/plan-desarrollo.md). Están los cimientos —Next.js, los tokens de
diseño y el cambio de tema—, el modelo de contenido bilingüe, el plano y las fichas: los
proyectos se ven como nodos conectados al centro, con los flujos pulsando por las líneas, y
cada uno tiene su propia URL compartible con una transición de zoom desde su nodo. El taller
sigue en crudo hasta el Sprint 4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
npm run test:e2e
```

## El concepto

El porfolio no es una página con secciones, es un **plano de sistemas**. El trabajo que
se cuenta aquí es de cliente y bajo contrato, así que no hay capturas que enseñar: cada
proyecto se ilustra con su flujo en abstracto, y esa limitación pasa a ser el estilo.

Dos territorios con el mismo lenguaje visual y distinta organización:

- **El plano** — proyectos profesionales, ordenados por topología. Cada nodo es un
  proyecto; al abrirlo, la vista entra dentro y aparece su flujo.
- **El taller** — proyectos personales, ordenados por tiempo. Con su estado a la vista:
  vivo, en pausa o aparcado.

Todo proyecto se cuenta con seis campos fijos. Los esquemas y las plantillas están en
[`docs/design/contenido-proyectos.md`](docs/design/contenido-proyectos.md).

## Stack previsto

Next.js 16 (App Router, JavaScript) · Tailwind v4 · `next-themes`.

Sin librería de animación: el scroll ligado a la vista, las transiciones entre vistas y
los flujos animados son nativos del navegador. El motivo está en
[`docs/design/decisiones.md`](docs/design/decisiones.md) (D6).

## Estructura

```
docs/design/
├── decisiones.md            por qué el sitio es como es, y qué se descartó
├── contenido-proyectos.md   los campos con los que se cuenta cada proyecto
└── bocetos/                 prototipos desechables, con fecha en el nombre
```
