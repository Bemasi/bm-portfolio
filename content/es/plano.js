/** El plano · proyectos profesionales. Seis campos fijos, ver
 *  docs/design/contenido-proyectos.md. Contenido de ejemplo hasta el Sprint 6.
 *  El slug es el mismo en los dos idiomas (D12): no se traduce. */
export const plano = [
  {
    id: "01",
    slug: "cierre-nocturno",
    nombre: "Cierre de facturación nocturno",
    metrica: "3 h 40 min → 38 min",
    flujo: ["ECC 6.0", "job batch", "IDoc", "middleware", "WMS"],
    posicion: { x: 21.4, y: 22 },
    sector: "Distribución alimentaria · 12 países · 4 sociedades",
    problema:
      "El cierre de facturación ya no cabía en la ventana nocturna y retrasaba el arranque del almacén cada mañana.",
    restriccion:
      "ECC 6.0 sin margen para actualizar, y una ventana que no se podía ampliar ni un minuto.",
    arquitectura:
      "El report de cierre alimentaba por IDoc al middleware, que despertaba al sistema de almacén.",
    intervencion:
      "Reescritura con proceso paralelo por paquetes y preagregado en vistas CDS, en lugar de bucles anidados.",
    resultado: "3 h 40 min → 38 min. La ventana nocturna volvió a tener holgura.",
  },
  {
    id: "02",
    slug: "migracion-s4hana",
    nombre: "Migración a S/4HANA",
    metrica: "48 h de parada · 0 incidencias P1",
    flujo: ["ECC", "SUM / DMO", "S/4HANA 2022"],
    posicion: { x: 77.2, y: 31.3 },
    sector: "Industria química · 3 plantas · 900 usuarios",
    problema: "1.400 objetos Z sin compatibilidad HANA bloqueaban la conversión.",
    restriccion:
      "La parada de producción no podía pasar de 48 horas, fin de semana incluido.",
    arquitectura:
      "Conversión en sitio con SUM/DMO sobre el mismo landscape, sin sistema puente.",
    intervencion:
      "Remediación masiva guiada por ATC y refactor a mano de los 210 objetos del camino crítico.",
    resultado: "48 h de ventana y cero incidencias críticas la semana siguiente.",
  },
  {
    id: "03",
    slug: "canal-online",
    nombre: "Integración con el canal online",
    metrica: "4 h → 90 s de latencia",
    flujo: ["Shop", "REST", "SAP PO", "BAPI", "SD"],
    posicion: { x: 29.6, y: 75.3 },
    sector: "Retail · 1,2 M de pedidos al año",
    problema:
      "Los pedidos de la web entraban en una carga de madrugada, así que el stock mentía durante todo el día.",
    restriccion:
      "La API de la tienda era inamovible: había que adaptarse a su contrato, no al revés.",
    arquitectura:
      "La tienda publica en REST, el bus traduce y llama a ventas mediante BAPI.",
    intervencion:
      "Capa OData propia y cola con reintentos idempotentes, para que un reproceso nunca duplique un pedido.",
    resultado: "4 h → 90 s de latencia media, con 0,02 % de pedidos en reproceso.",
  },
  {
    id: "04",
    slug: "observabilidad-interfaces",
    nombre: "Observabilidad de interfaces",
    metrica: "6 h → 4 min de detección",
    flujo: ["colas RFC", "CDS", "Fiori Elements"],
    posicion: { x: 72.8, y: 77 },
    sector: "Logística · 40 interfaces activas",
    problema:
      "Las interfaces caídas se descubrían cuando llamaba el cliente, no antes.",
    restriccion: "Sin presupuesto para una herramienta de monitorización externa.",
    arquitectura:
      "Las colas de proceso y los logs de mensajes se exponen en vistas CDS y se pintan en Fiori.",
    intervencion:
      "Modelo de estado por interfaz, umbrales por horario y aviso al responsable de cada una.",
    resultado: "Detección media de 6 h a 4 min, con el histórico consultable.",
  },
];
