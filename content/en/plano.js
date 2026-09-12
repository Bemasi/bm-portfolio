/** The map · professional projects. Same six fields as the Spanish file and
 *  the same slugs (D12). Placeholder content until Sprint 6. */
export const plano = [
  {
    id: "01",
    slug: "cierre-nocturno",
    nombre: "Overnight billing close",
    metrica: "3 h 40 min → 38 min",
    flujo: ["ECC 6.0", "batch job", "IDoc", "middleware", "WMS"],
    posicion: { x: 21.4, y: 22 },
    sector: "Food distribution · 12 countries · 4 company codes",
    problema:
      "The billing close no longer fitted in the nightly window and pushed back the warehouse start every morning.",
    restriccion:
      "ECC 6.0 with no room to upgrade, and a window that could not grow by a single minute.",
    arquitectura:
      "The closing report fed the middleware over IDoc, which in turn woke up the warehouse system.",
    intervencion:
      "Rewritten with package-level parallel processing and pre-aggregation in CDS views, instead of nested loops.",
    resultado: "3 h 40 min → 38 min. The nightly window had slack again.",
  },
  {
    id: "02",
    slug: "migracion-s4hana",
    nombre: "Move to S/4HANA",
    metrica: "48 h downtime · 0 P1 incidents",
    flujo: ["ECC", "SUM / DMO", "S/4HANA 2022"],
    posicion: { x: 77.2, y: 31.3 },
    sector: "Chemical industry · 3 plants · 900 users",
    problema: "1,400 custom objects without HANA compatibility blocked the conversion.",
    restriccion:
      "Production downtime could not exceed 48 hours, weekend included.",
    arquitectura:
      "In-place conversion with SUM/DMO on the same landscape, with no bridge system.",
    intervencion:
      "Mass remediation guided by ATC, plus hand refactoring of the 210 objects on the critical path.",
    resultado: "A 48 h window and zero critical incidents the week after.",
  },
  {
    id: "03",
    slug: "canal-online",
    nombre: "Online channel integration",
    metrica: "4 h → 90 s latency",
    flujo: ["Shop", "REST", "SAP PO", "BAPI", "SD"],
    posicion: { x: 29.6, y: 75.3 },
    sector: "Retail · 1.2 M orders a year",
    problema:
      "Web orders came in on an overnight load, so stock figures lied all day long.",
    restriccion:
      "The shop API was fixed: we had to fit its contract, not the other way round.",
    arquitectura:
      "The shop publishes over REST, the bus translates and calls sales through BAPI.",
    intervencion:
      "A custom OData layer and a queue with idempotent retries, so a reprocess never duplicates an order.",
    resultado: "4 h → 90 s average latency, with 0.02 % of orders reprocessed.",
  },
  {
    id: "04",
    slug: "observabilidad-interfaces",
    nombre: "Interface observability",
    metrica: "6 h → 4 min to detect",
    flujo: ["RFC queues", "CDS", "Fiori Elements"],
    posicion: { x: 72.8, y: 77 },
    sector: "Logistics · 40 live interfaces",
    problema:
      "Broken interfaces were found out when the customer called, not before.",
    restriccion: "No budget for an external monitoring tool.",
    arquitectura:
      "Process queues and message logs are exposed through CDS views and drawn in Fiori.",
    intervencion:
      "A status model per interface, thresholds by time of day, and an alert to each owner.",
    resultado: "Average detection from 6 h down to 4 min, with a searchable history.",
  },
];
