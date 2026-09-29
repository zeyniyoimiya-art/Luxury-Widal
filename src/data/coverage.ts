// Datos del mapa de cobertura mundial de WiMAX.
// IMPORTANTE: las cifras de "pico" son órdenes de magnitud aproximados; solo los datos marcados
// como "Documentado" provienen de una fuente concreta citada en el artículo.
export interface CoverageCountry {
  id: string; // código numérico ISO 3166-1 (coincide con world-atlas)
  name: string;
  lonLat: [number, number]; // ubicación del marcador
  operators: string;
  launch: string;
  peak: string;
  status: string;
  confidence: "Documentado" | "Aproximado";
  highlight?: boolean;
}

export const coverage: CoverageCountry[] = [
  {
    id: "840",
    name: "Estados Unidos",
    lonLat: [-98, 39],
    operators: "Sprint (Xohm / Clear) y Clearwire",
    launch: "2008 (alianza anunciada en 2007)",
    peak: "≈ 8–10 millones (incluye clientes mayoristas), 2011–2012",
    status: "Apagado entre 2015 y 2016; migración a LTE",
    confidence: "Aproximado",
  },
  {
    id: "392",
    name: "Japón",
    lonLat: [138, 36],
    operators: "UQ Communications (grupo KDDI)",
    launch: "2009",
    peak: "Varios millones de abonados",
    status: "Evolucionó a «WiMAX 2+», compatible con TD-LTE",
    confidence: "Aproximado",
  },
  {
    id: "410",
    name: "Corea del Sur",
    lonLat: [127.8, 36.4],
    operators: "KT y SK Telecom (WiBro)",
    launch: "2006",
    peak: "Cientos de miles de abonados",
    status: "Desplazado por LTE hacia 2012–2013",
    confidence: "Aproximado",
  },
  {
    id: "356",
    name: "India",
    lonLat: [78.5, 22],
    operators: "BSNL, Tata Communications, entre otros",
    launch: "2007–2010",
    peak: "Cientos de miles de abonados",
    status: "Superado por 3G/4G; residual",
    confidence: "Aproximado",
  },
  {
    id: "643",
    name: "Rusia",
    lonLat: [60, 58],
    operators: "Yota (Scartel)",
    launch: "2008",
    peak: "Del orden de cientos de miles a algo más de un millón",
    status: "Migró a LTE hacia 2011–2012",
    confidence: "Aproximado",
  },
  {
    id: "710",
    name: "Sudáfrica",
    lonLat: [24.5, -29],
    operators: "Sentech y proveedores regionales",
    launch: "Segunda mitad de los 2000",
    peak: "Escala menor; sin cifra pública fiable",
    status: "Reemplazado por LTE y fibra",
    confidence: "Aproximado",
  },
  {
    id: "360",
    name: "Indonesia",
    lonLat: [113, -2],
    operators: "Licencias BWA de 2,3 GHz (2009)",
    launch: "2009",
    peak: "Escala menor; sin cifra pública fiable",
    status: "Sustituido por LTE-TDD",
    confidence: "Aproximado",
  },
  {
    id: "586",
    name: "Pakistán",
    lonLat: [69.3, 30],
    operators: "Wateen Telecom",
    launch: "Fines de los 2000",
    peak: "Escala menor; sin cifra pública fiable",
    status: "En retroceso frente a 3G/4G",
    confidence: "Aproximado",
  },
  {
    id: "152",
    name: "Chile",
    lonLat: [-71, -33.5],
    operators: "Entel, Claro, GTD (concesiones de 3,5 GHz de 2001–2007)",
    launch: "Concesiones desde 2001",
    peak: "Escala reducida",
    status: "La banda de 3,5 GHz se reutiliza para 5G",
    confidence: "Documentado",
  },
  {
    id: "068",
    name: "Bolivia",
    lonLat: [-64.7, -16.7],
    operators: "Entel, Viva, Tigo, COTAS",
    launch: "Abril–mayo de 2008",
    peak: "En 2023 la ATT registra 432 conexiones WIMAX-WIPLL (0,03 % del acceso fijo)",
    status: "Residual; el mercado migró a LTE y fibra, y prepara 5G en 3,5 GHz",
    confidence: "Documentado",
    highlight: true,
  },
];
