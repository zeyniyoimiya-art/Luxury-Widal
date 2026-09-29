// Artículo 3 · Cobertura mundial (con mapa interactivo)
import { Article, photos } from "./types";

export const cobertura: Article = {
  slug: "cobertura-mundial",
  title: "Cobertura Mundial",
  kicker: "Un atlas de antenas sobre cinco continentes",
  excerpt:
    "Diez países, un mismo sueño: internet sin cables. Explora el mapa cartográfico, toca cada territorio y descubre dónde brilló —y dónde se apagó— WiMAX.",
  hero: photos.globe2,
  blocks: [
    {
      t: "p",
      text: "Pocas tecnologías de telecomunicaciones se desplegaron tan rápido y en tantos lugares tan distintos como WiMAX. En octubre de 2008, el propio WiMAX Forum comunicaba que más de 260 operadores habían puesto en marcha redes fijas, portátiles o móviles en 110 países, con una cobertura potencial cercana a los 430 millones de personas. Para 2010–2012 el Foro hablaba ya de más de seiscientas redes en unos 150 países. La geografía de WiMAX era, literalmente, mundial.",
    },
    {
      t: "p",
      text: "Este mapa reúne diez territorios representativos. Toca cualquier marcador dorado —o navega con el teclado por la lista inferior— para ver operadores, año de lanzamiento, estado actual y una estimación del pico de usuarios. Bolivia aparece resaltada en burdeos.",
    },
    { t: "map" },
    {
      t: "note",
      title: "Cómo leer las cifras",
      text: "El pico de abonados de cada país es un orden de magnitud a partir de informes de operadores y prensa sectorial, mezclando en algunos casos clientes minoristas y mayoristas. Las cifras marcadas «Documentado» provienen de una fuente concreta (por ejemplo, la ATT en el caso boliviano). Donde no encontré un dato público fiable, lo indico en lugar de inventarlo.",
    },
    { t: "h2", text: "Estados Unidos: la apuesta más grande" },
    {
      t: "p",
      text: "El mayor despliegue lo protagonizaron Sprint y Clearwire. Tras la alianza de 2007 y la fusión de negocios WiMAX de 2008, la marca «Clear» llegó a decenas de ciudades. Clearwire llegó a reunir en torno a ocho o diez millones de abonados entre clientes propios y mayoristas (como los teléfonos de Sprint), pero la deuda por construir la red y la llegada de LTE la dejaron en una situación insostenible. Sprint absorbió el control de Clearwire en 2013 y apagó la red entre 2015 y 2016.",
    },
    { t: "h2", text: "Asia: el laboratorio de la movilidad" },
    {
      t: "p",
      text: "En Corea del Sur, WiBro llegó al mercado comercial en 2006 con KT y SK Telecom y sirvió de banco de pruebas del WiMAX móvil. En Japón, UQ Communications lanzó su servicio en 2009 y logró varios millones de clientes gracias a su integración con el grupo KDDI y a una estrategia de terminales propios. Lo más curioso: su evolución, «WiMAX 2+», acabó siendo compatible con TD-LTE, una convergencia que resume la historia de la tecnología.",
    },
    {
      t: "p",
      text: "India y Pakistán vieron en WiMAX una solución a su enorme déficit de infraestructura fija. Operadores como BSNL y Tata Communications en India, o Wateen Telecom en Pakistán, desplegaron redes con la esperanza de saltarse el cobre. Indonesia otorgó licencias de banda ancha inalámbrica en 2,3 GHz en 2009, aunque la mayoría de los concesionarios terminó apostando por LTE-TDD.",
    },
    { t: "h2", text: "Rusia, África y América Latina" },
    {
      t: "p",
      text: "En Rusia, Yota (Scartel) se convirtió en emblema del WiMAX móvil europeo-asiático a partir de 2008, con una promesa de internet ilimitado en ciudades como Moscú. Su decisión de migrar a LTE hacia 2011–2012 fue una de las primeras señales de que el vendaval cambiaba de dirección. En Sudáfrica, operadores como Sentech y proveedores regionales lo probaron como solución rural y suburbana.",
    },
    {
      t: "p",
      text: "En América Latina, Chile y Bolivia fueron destacados por la prensa de 2008 como los primeros países de la región con redes WiMAX comerciales de operadores relevantes. Chile concesionó la banda de 3,5 GHz entre 2001 y 2007 a empresas como Claro, GTD y Entel; hoy, la Fiscalía Nacional Económica respalda reutilizarla para 5G. Bolivia, con sus nueve capitales departamentales cubiertas por Entel en 2008, tiene una historia tan rica que merece su propio capítulo.",
    },
    {
      t: "table",
      caption: "Fechas de referencia del despliegue mundial",
      head: ["Año", "Hito", "Dato"],
      rows: [
        ["2001", "Nace el WiMAX Forum", "Junio; certificar interoperabilidad de 802.16"],
        ["2006", "WiBro en Corea del Sur", "Servicio comercial de KT y SK Telecom"],
        ["2008", "Auge global", "260 operadores, 110 países, 430 M de personas potenciales (Foro, oct.)"],
        ["2009", "UQ WiMAX en Japón", "Gran despliegue urbano del grupo KDDI"],
        ["2010", "HTC EVO 4G", "Primer smartphone WiMAX en EE. UU. (Sprint)"],
        ["2015–2016", "Apagón de Sprint/Clear", "Cierre completo citado en marzo de 2016"],
        ["2023", "Bolivia", "432 conexiones WIMAX-WIPLL registradas por la ATT"],
      ],
    },
    {
      t: "quote",
      text: "Un mapa no solo muestra dónde llegó una tecnología: muestra dónde una idea todavía es recordada.",
      by: "Cruz Muños Luis Vidal",
    },
    {
      t: "dato",
      text: "El antiguo enlace de WiMAX con el 5G es geográfico: la banda n78 (3,3–3,8 GHz) del 5G coincide con las mismas bandas de 3,5 GHz que se licitaron para WiMAX en Chile, Bolivia y decenas de países.",
    },
    { t: "gallery", items: [photos.globe1, photos.towers1, photos.towers2] },
  ],
  sources: [
    { label: "History and Evaluation of Mobile WiMAX (Arel University) — cifras de octubre de 2008", url: "https://gcris.arel.edu.tr/bitstreams/f7119680-e712-4055-839f-fb1d8944c05b/download" },
    { label: "Wikipedia — WiMAX", url: "https://en.wikipedia.org/wiki/WiMAX" },
    { label: "EBSCO Research Starters — WiMAX", url: "https://www.ebsco.com/research-starters/communication-and-mass-media/wimax-worldwide-interoperability-microwave-access" },
    { label: "La Tercera — FNE respalda a Entel para usar antigua banda de WiMAX en 5G", url: "https://www.latercera.com/pulso/noticia/fne-respalda-a-entel-para-utilizar-antigua-banda-de-wimax-para-5g/TVRYVM53KJCQDK735BBWBZM4EE/" },
    { label: "HoyBolivia — VIVA lanza internet inalámbrico (2008)", url: "https://www.hoybolivia.com/Noticia.php?IdNoticia=1927&tit=viva_lanza_internet_inalambrico_de_banda_ancha_de_mayor_cobertura_en_bolivia" },
    { label: "ATT Bolivia — Estado de situación de las telecomunicaciones, gestión 2023", url: "https://www.att.gob.bo/sites/default/files/archivos_portada/2024-08/Estado%20de%20Situaci%C3%B3n%20de%20las%20Telecomunicaciones%20en%20Bolivia%20de%20la%20Gesti%C3%B3n%202023%20(anual%20auditado).pdf" },
  ],
};
