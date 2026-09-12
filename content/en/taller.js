/** The workshop · personal projects. Chronological by `anio`; `estado` is
 *  vivo | pausa | aparcado and is encoded in the design too (D5).
 *  Placeholder content until Sprint 6. */
export const taller = [
  {
    slug: "abapfmt",
    anio: 2021,
    nombre: "abapfmt",
    estado: "vivo",
    que: "An ABAP code formatter that runs outside SAP, on the pre-commit hook.",
    origen: "From arguing about indentation in a code review one more time.",
    aprendido:
      "That writing a real parser teaches you more about a language than ten years of using it.",
    estadoTexto: "Alive. I use it every week.",
    stack: "Rust · WebAssembly",
    donde: "github.com/…/abapfmt",
  },
  {
    slug: "riego-huerto",
    anio: 2022,
    nombre: "Vegetable garden irrigation",
    estado: "vivo",
    que: "Four valves, three moisture sensors and a panel I open from my phone.",
    origen: "From coming back from holiday to dried-out tomatoes.",
    aprendido:
      "That the physical world does not behave like the spreadsheet: sensors drift and need calibrating by hand.",
    estadoTexto: "Alive, third season.",
    stack: "ESP32 · MicroPython · MQTT",
    donde: "github.com/…/riego",
  },
  {
    slug: "facturas-asiento",
    anio: 2023,
    nombre: "Invoices into journal entries",
    estado: "pausa",
    que: "Drop in an invoice PDF and out comes the journal line, ready to post.",
    origen: "From doing it by hand forty times during a month-end close.",
    aprendido:
      "That 90 % of the problem is easy and the remaining 10 % is every supplier in the world.",
    estadoTexto: "Paused. It nails six layouts and chokes on the seventh.",
    stack: "Python · Tesseract",
    donde: "github.com/…/facturas",
  },
  {
    slug: "solver-sudokus",
    anio: 2024,
    nombre: "Sudoku solver",
    estado: "aparcado",
    que: "A constraint-propagation solver that draws its own backtracking while it thinks.",
    origen: "From a rainy weekend.",
    aprendido:
      "That watching the algorithm hesitate on screen explains backtracking better than any text.",
    estadoTexto:
      "Shelved on the third weekend, and that is fine. Not everything has to reach production.",
    stack: "TypeScript · Canvas",
    donde: "github.com/…/sudoku",
  },
  {
    slug: "este-porfolio",
    anio: 2026,
    nombre: "This portfolio",
    estado: "vivo",
    que: "The page you are looking at right now.",
    origen:
      "From not finding a single portfolio in my trade that did not look like a template.",
    aprendido:
      "That the browser already ships almost everything people install a library for.",
    estadoTexto: "Alive, and under construction.",
    stack: "Next.js · native CSS",
    donde: "github.com/…/bm-portfolio",
  },
];
