// Artículo 4 · WiMAX en Bolivia (cronología verificada con prensa de 2008, informes de la ATT y notas sectoriales)
import { Article, photos } from "./types";

export const bolivia: Article = {
  slug: "wimax-bolivia",
  title: "WiMAX en Bolivia",
  kicker: "De las antenas de 2008 al 5G en 3,5 GHz",
  excerpt:
    "Entel, Viva, COTAS y Tigo lanzaron WiMAX en 2008 bajo el eco de la nacionalización. Esta es la crónica de la banda ancha inalámbrica que cruzó el altiplano, el valle y el oriente.",
  hero: photos.laPaz1,
  blocks: [
    {
      t: "p",
      text: "En 2008, Bolivia era un país de marcada desigualdad digital. El acceso fijo a Internet dependía del cobre en las grandes ciudades y de los cibercafés en casi todas las demás. En ese contexto, WiMAX apareció como promesa de democratización: antenas capaces de cubrir barrios enteros sin abrir zanjas, de llegar a El Alto y a las laderas de La Paz, al valle cochabambino y a las llanuras de Santa Cruz. Esta crónica reconstruye cómo llegó, qué prometió y qué dejó.",
    },
    { t: "h2", text: "Cronología de un año decisivo" },
    {
      t: "table",
      caption: "WiMAX en Bolivia: hitos verificados",
      head: ["Fecha", "Hecho", "Fuente"],
      rows: [
        ["1 abril 2008", "Alcatel-Lucent anuncia contrato con Entel para «la primera red comercial de WiMAX en Bolivia»", "EFE / Telecombol, Emol"],
        ["25 abril 2008", "Entel presenta WiMAX en la Feria Internacional de Cochabamba, con alcance anunciado de hasta 50 km desde la torre", "Opinión (Cochabamba)"],
        ["16 mayo 2008", "Viva lanza V-Net: La Paz, El Alto, Cochabamba y Santa Cruz, desde 190 Bs al mes", "HoyBolivia"],
        ["Oct. 2008", "Entel anuncia WiMAX con tarifas promocionales en La Paz, Cochabamba, Santa Cruz, Sucre, Tarija, Oruro, Potosí, Trinidad y Cobija", "OSIPTEL (reproduce noticia)"],
        ["2013–2015", "Los tres operadores móviles lanzan LTE (Entel y Tigo primero; Viva, en 2015)", "Notas sectoriales"],
        ["2017", "Informe sobre infraestructura: Entel aún es el principal proveedor de WiMAX, con servicio «algo inestable» por propagación", "Campero, Internet Bolivia"],
        ["2023", "La ATT registra 432 conexiones WIMAX-WIPLL (0,03 %) del acceso fijo a Internet", "ATT, Estado de Situación 2023"],
        ["2025", "La ATT prevé asignar 3,5 GHz a Entel para 5G, la misma banda del WiMAX", "Telesemana / BNamericas"],
      ],
    },
    {
      t: "p",
      text: "El 1 de abril de 2008 el fabricante franco-estadounidense Alcatel-Lucent informó de que había firmado con Entel un contrato para desplegar la primera red comercial WiMAX del país, que ofrecería voz sobre IP, banda ancha, vídeo y datos. El gerente de tecnologías de Entel, Mauricio Cáceres, contó a La Razón que la empresa ya había instalado antenas en las capitales de los nueve departamentos. Menos de un mes después, el 25 de abril, Entel presentó el servicio en la Feria Internacional de Cochabamba.",
    },
    {
      t: "quote",
      text: "Con el WiMAX, el acceso podrá ser desde cualquier lugar de la ciudad.",
      by: "Mauricio Cáceres, gerente de Tecnologías de Entel, abril de 2008",
    },
    { t: "h2", text: "El marco regulatorio y las frecuencias" },
    {
      t: "p",
      text: "El espectro es el recurso escaso de toda red inalámbrica. En Bolivia, la banda de 3,5 GHz fue la protagonista del WiMAX: COTAS, por ejemplo, anunció que su red de Airspan operaría en 3,5 GHz. La regulación estaba entonces en manos de la Superintendencia de Telecomunicaciones (SITTEL), y desde 2009 la asumió la ATT, la autoridad regulatoria y fiscalizadora del sector de telecomunicaciones y transportes.",
    },
    {
      t: "note",
      title: "Sobre las resoluciones de frecuencia",
      text: "Las resoluciones administrativas exactas que asignaron cada porción de espectro a cada operador no aparecen en las fuentes abiertas que consulté, y no voy a inventar números de resolución. Si necesitas el dato oficial, el registro público está en el portal de la ATT (att.gob.bo).",
    },
    { t: "h2", text: "Cobertura departamental" },
    {
      t: "p",
      text: "Las fuentes de 2008 dibujan un mapa desigual. Viva concentró su V-Net en el eje troncal (La Paz, El Alto, Cochabamba y Santa Cruz) y aseguraba antenas con más de 30 km de radio. Entel, en cambio, prometió cobertura en las nueve capitales, incluidas ciudades que ningún otro operador atendía con banda ancha inalámbrica, como Cobija, Trinidad y Tarija. COTAS diseñó una red con estaciones HiperMAX para Santa Cruz, La Paz y Cochabamba, y MicroMAX para Sucre, Tarija, Trinidad, Oruro y Potosí.",
    },
    {
      t: "table",
      caption: "Departamentos y operadores documentados",
      head: ["Departamento", "Capital", "Operadores con WiMAX lanzado o anunciado en 2008"],
      rows: [
        ["La Paz", "La Paz / El Alto", "Entel, Viva, COTAS"],
        ["Cochabamba", "Cochabamba", "Entel, Viva, COTAS"],
        ["Santa Cruz", "Santa Cruz de la Sierra", "Entel, Viva, COTAS"],
        ["Chuquisaca", "Sucre", "Entel, COTAS"],
        ["Tarija", "Tarija", "Entel, COTAS"],
        ["Oruro", "Oruro", "Entel, COTAS"],
        ["Potosí", "Potosí", "Entel, COTAS"],
        ["Beni", "Trinidad", "Entel, COTAS"],
        ["Pando", "Cobija", "Entel"],
      ],
    },
    { t: "gallery", items: [photos.laPaz2, photos.laPaz4, photos.rural2] },
    { t: "h2", text: "Impacto social en zonas rurales" },
    {
      t: "p",
      text: "La gran promesa de WiMAX era rural. Un solo nodo podía cubrir decenas de kilómetros de radio (en la práctica, mucho menos, con terreno accidentado). COTAS lo expresó con claridad al elegir a su proveedor: buscaba equipos que superaran los desafíos del relieve y llegaran a clientes urbanos y rurales, con la esperanza de reducir la brecha digital. En un país de montañas, valles y llanos extensos, la lógica de reemplazar kilómetros de fibra por una torre era seductora.",
    },
    {
      t: "p",
      text: "En la práctica, la realidad fue más matizada. El informe de 2017 sobre infraestructura de telecomunicaciones observó que, aunque WiMAX puede alcanzar altas velocidades, «el servicio es algo inestable por las condiciones de propagación inalámbrica». Los planes eran caros para el ingreso medio y la cobertura efectiva se concentró en ciudades. El acceso rural real llegó después, con la red móvil 3G/4G y el satélite Túpac Katari, puesto en órbita en diciembre de 2013.",
    },
    { t: "h2", text: "Estado actual: migración a LTE y 5G" },
    {
      t: "p",
      text: "Entre 2013 y 2015, Entel, Tigo y Viva desplegaron LTE en sus redes móviles. WiMAX quedó como servicio residual: en 2023 la ATT contabilizaba solo 432 conexiones de acceso fijo por WIMAX-WIPLL, apenas el 0,03 % del total. Las conexiones Wi-Fi/LTE fijo eran 16.218 (1,19 %) y las satelitales 2.481 (0,18 %). Los operadores llevan años empujando la fibra al hogar, y la banda de 3,5 GHz, aquella que hizo posible WiMAX, se prepara para el 5G: en 2025 la prensa especializada informó de que la ATT planeaba asignársela directamente a Entel.",
    },
    {
      t: "dato",
      text: "El Alto, sede del INCOS donde estudia el autor de este blog, está a unos 4.100 metros de altitud, entre las ciudades más altas del mundo. Que WiMAX prometiera cubrir sus laderas desde una sola antena era, más que marketing, una pequeña proeza de propagación.",
    },
    {
      t: "quote",
      text: "La historia de WiMAX en Bolivia es la de un país que quiso conectarse antes de tener el mapa completo de sus cables.",
      by: "Cruz Muños Luis Vidal",
    },
    { t: "gallery", items: [photos.laPaz3, photos.rural1, photos.sucre] },
  ],
  sources: [
    { label: "Telecombol — Entel ofrecerá la tecnología WiMAX para todo el país (02/04/2008)", url: "https://www.telecombol.com/2008/04/entel-ofrecer-la-tecnologa-wimax-para.html" },
    { label: "Emol — Entel encarga a Alcatel-Lucent la primera red WiMAX en Bolivia", url: "https://www.emol.com/noticias/tecnologia/2008/04/01/298765/entel-encarga-a-alcatel-lucent-la-primera-red-de-tecnologia-wimax-en-bolivia.html" },
    { label: "Opinión — Llega la tecnología WiMAX (26/04/2008)", url: "https://www.opinion.com.bo/articulo/el-pais/llega-tecnologia-wimax/20080426192014307241.html" },
    { label: "HoyBolivia — VIVA lanza internet inalámbrico de banda ancha (16/05/2008)", url: "https://www.hoybolivia.com/Noticia.php?IdNoticia=1927&tit=viva_lanza_internet_inalambrico_de_banda_ancha_de_mayor_cobertura_en_bolivia" },
    { label: "OSIPTEL — Entel lanza WiMAX a tarifas promocionales (02/10/2008)", url: "https://www.gob.pe/institucion/osiptel/noticias/177600-entel-lanza-wimax-a-tarifas-promocionales" },
    { label: "Developing Telecoms — Airspan selected by COTAS", url: "https://developingtelecoms.com/telecom-technology/wireless-networks/2306-airspan-selected-by-cotas-for-multi-city-wimax-network-in-bolivia.html" },
    { label: "Campero — Infraestructura de telecomunicaciones y TIC en Bolivia (2017)", url: "https://internetbolivia.org/wp-content/uploads/2017/05/Campero-merged.pdf" },
    { label: "ATT — Estado de situación de las telecomunicaciones en Bolivia, gestión 2023", url: "https://www.att.gob.bo/sites/default/files/archivos_portada/2024-08/Estado%20de%20Situaci%C3%B3n%20de%20las%20Telecomunicaciones%20en%20Bolivia%20de%20la%20Gesti%C3%B3n%202023%20(anual%20auditado).pdf" },
    { label: "Telesemana — Entel Bolivia se haría de una asignación directa de espectro 5G (2025)", url: "https://www.telesemana.com/blog/2025/03/18/entel-bolivia-se-haria-de-una-asignacion-directa-de-espectro-5g/" },
    { label: "BNamericas — Bolivia to assign 3.5GHz spectrum to state operator Entel", url: "https://www.bnamericas.com/en/news/bolivia-to-assign-35ghz-spectrum-to-state-operator-entel" },
  ],
};
