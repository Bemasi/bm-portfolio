/** El taller · proyectos personales. Otros seis campos, orden cronológico
 *  por `anio`. `estado` es vivo | pausa | aparcado y se codifica en el diseño
 *  (D5), no solo en la etiqueta. Contenido de ejemplo hasta el Sprint 6. */
export const taller = [
  {
    slug: "abapfmt",
    anio: 2021,
    nombre: "abapfmt",
    estado: "vivo",
    que: "Un formateador de código ABAP que corre fuera de SAP, en el gancho de pre-commit.",
    origen: "De discutir el sangrado en una revisión de código una vez más.",
    aprendido:
      "Que escribir un parser de verdad enseña más de un lenguaje que diez años usándolo.",
    estadoTexto: "Vivo. Lo uso cada semana.",
    stack: "Rust · WebAssembly",
    donde: "github.com/…/abapfmt",
  },
  {
    slug: "riego-huerto",
    anio: 2022,
    nombre: "Riego del huerto",
    estado: "vivo",
    que: "Cuatro válvulas, tres sensores de humedad y un panel al que entro desde el móvil.",
    origen: "De volver de vacaciones y encontrarme los tomates secos.",
    aprendido:
      "Que el mundo físico no se porta como la hoja de cálculo: los sensores derivan y hay que calibrarlos a mano.",
    estadoTexto: "Vivo, tercera temporada.",
    stack: "ESP32 · MicroPython · MQTT",
    donde: "github.com/…/riego",
  },
  {
    slug: "facturas-asiento",
    anio: 2023,
    nombre: "Facturas a asiento",
    estado: "pausa",
    que: "Arrastras el PDF de una factura y sale la línea de asiento lista para contabilizar.",
    origen: "De hacerlo a mano cuarenta veces durante un cierre.",
    aprendido:
      "Que el 90 % del problema es fácil y el 10 % que queda son todos los proveedores del mundo.",
    estadoTexto: "En pausa. Acierta con seis formatos y se atraganta con el séptimo.",
    stack: "Python · Tesseract",
    donde: "github.com/…/facturas",
  },
  {
    slug: "solver-sudokus",
    anio: 2024,
    nombre: "Solver de sudokus",
    estado: "aparcado",
    que: "Un resolutor por propagación de restricciones que dibuja su propio backtracking mientras piensa.",
    origen: "De un fin de semana de lluvia.",
    aprendido:
      "Que ver al algoritmo dudar en pantalla explica el backtracking mejor que cualquier texto.",
    estadoTexto:
      "Aparcado al tercer fin de semana, y está bien. No todo tiene que llegar a producción.",
    stack: "TypeScript · Canvas",
    donde: "github.com/…/sudoku",
  },
  {
    slug: "este-porfolio",
    anio: 2026,
    nombre: "Este porfolio",
    estado: "vivo",
    que: "La página que estás mirando ahora mismo.",
    origen:
      "De no encontrar un solo porfolio de mi gremio que no pareciera una plantilla.",
    aprendido:
      "Que el navegador ya trae casi todo aquello para lo que la gente instala una librería.",
    estadoTexto: "Vivo, y en obras.",
    stack: "Next.js · CSS nativo",
    donde: "github.com/…/bm-portfolio",
  },
];
