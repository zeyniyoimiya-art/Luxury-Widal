// Artículo 1 · Historia de WiMAX (investigado con fuentes públicas: IEEE, WiMAX Forum, FCC, prensa técnica)
import { Article, photos } from "./types";

export const historia: Article = {
  slug: "historia",
  title: "Historia de WiMAX",
  kicker: "Del comité 802.16 a la era del 4G",
  excerpt:
    "De un grupo de trabajo del IEEE en 1998 a redes en más de cien países: así nació, brilló y se retiró la tecnología que quiso llevar internet sin cables a todo el planeta.",
  hero: photos.towers1,
  blocks: [
    {
      t: "p",
      text: "Antes de que los teléfonos inteligentes dictaran el ritmo de la conectividad, existió una promesa distinta: banda ancha sin cables, con antenas capaces de cubrir una ciudad entera. Esa promesa tuvo nombre de sigla: WiMAX, Worldwide Interoperability for Microwave Access. Esta es la crónica de cómo nació en un comité de ingenieros, cómo conquistó cinco continentes y por qué terminó cediendo el escenario a LTE.",
    },
    { t: "h2", text: "Los orígenes: un grupo de trabajo (1998–2001)" },
    {
      t: "p",
      text: "En 1998 el IEEE (Institute of Electrical and Electronics Engineers) puso en marcha el grupo de trabajo 802.16, dedicado al acceso inalámbrico de banda ancha en redes metropolitanas, conocido como «WirelessMAN». Lo presidió desde el principio Roger B. Marks, entonces investigador del instituto estadounidense NIST. El objetivo era competir con las redes fijas —DSL y cable— justo donde tender cobre o fibra resultaba más caro: la llamada «última milla».",
    },
    {
      t: "p",
      text: "El estándar original se completó en diciembre de 2001 y se publicó en 2002. Operaba entre los 10 y los 66 GHz, exigía línea de vista entre la antena y el abonado y funcionaba como enlace fijo punto-multipunto, con velocidades brutas de entre 32 y 134 Mbps por canal según la configuración. Era ingeniería de enlaces troncales más que de usuarios domésticos, pero la semilla estaba plantada.",
    },
    {
      t: "p",
      text: "En paralelo, en junio de 2001, un grupo de fabricantes y operadores fundó el WiMAX Forum: una organización sin fines de lucro para promover y certificar equipos basados en IEEE 802.16 y en el estándar europeo HiperMAN del ETSI. Wi-Fi ya tenía su alianza comercial; WiMAX copió la fórmula: un estándar técnico más un sello de interoperabilidad. El nombre comercial «WiMAX» nació en el Foro, no en el IEEE.",
    },
    {
      t: "quote",
      text: "Wi-Fi nació de un espectro concreto; WiMAX fue un estándar en busca de espectro.",
      by: "Paráfrasis de la FCC, «WiMAX Applications for Public Safety»",
    },
    { t: "h2", text: "De fijo a móvil (2003–2006)" },
    {
      t: "p",
      text: "El salto tecnológico llegó al bajar de frecuencia. La enmienda 802.16a (2003) llevó el estándar a la banda de 2 a 11 GHz, donde la señal rodea obstáculos y ya no exige línea de vista. En junio de 2004, la revisión IEEE 802.16-2004 consolidó todo el trabajo previo y se convirtió en la base del llamado «WiMAX fijo», con modulación OFDM de 256 subportadoras y anchos de canal desde 1,75 hasta 20 MHz.",
    },
    {
      t: "p",
      text: "El segundo salto fue la movilidad. En diciembre de 2005 el IEEE aprobó 802.16e-2005, que introdujo OFDMA escalable (SOFDMA), traspaso entre celdas y soporte MIMO. Nació así el «WiMAX móvil». En enero de 2006 el Foro anunció los primeros productos con la certificación «WiMAX Forum Certified», basados todavía en 802.16-2004; la certificación de los equipos móviles 802.16e comenzó en 2008.",
    },
    {
      t: "table",
      caption: "Las versiones del estándar IEEE 802.16",
      head: ["Versión", "Aprobación", "Banda", "Uso", "Notas"],
      rows: [
        ["802.16", "Dic. 2001", "10–66 GHz", "Fijo, con línea de vista", "Portadora única; 32–134 Mbps brutos"],
        ["802.16-2004", "Jun. 2004", "2–11 GHz", "Fijo, sin línea de vista", "Base del «WiMAX fijo», OFDM-256"],
        ["802.16e-2005", "Dic. 2005", "2–6 GHz (móvil)", "Fijo y móvil", "SOFDMA, MIMO; «WiMAX móvil»"],
        ["802.16m", "2011", "Bandas IMT", "Móvil avanzado", "WirelessMAN-Advanced, aspirante a IMT-Advanced"],
      ],
    },
    {
      t: "p",
      text: "Mientras tanto, en Corea del Sur, KT y SK Telecom lanzaban en 2006 WiBro, un servicio de banda ancha móvil cuyo diseño influyó en el WiMAX móvil. En 2007 la Unión Internacional de Telecomunicaciones (UIT-R) aprobó WiMAX móvil como una de las tecnologías IMT-2000. El estándar ya no era una promesa de laboratorio: tenía aval internacional.",
    },
    { t: "h2", text: "La edad de oro (2007–2010)" },
    {
      t: "p",
      text: "El 19 de julio de 2007, Sprint Nextel y Clearwire anunciaron que construirían juntas la primera gran red WiMAX móvil de Estados Unidos. En mayo de 2008 formalizaron la fusión de sus negocios WiMAX con una inyección de unos 3.200 millones de dólares de Intel, Google, Comcast, Time Warner Cable y Bright House. La marca comercial de Sprint fue Xohm, más tarde absorbida por «Clear».",
    },
    {
      t: "p",
      text: "En octubre de 2008 el WiMAX Forum informaba de más de 260 operadores desplegando redes fijas, portátiles y móviles en 110 países, con una cobertura potencial de unos 430 millones de personas. El 4G parecía tener dueño. Ese mismo año, en Bolivia, Entel y Viva lanzaban sus primeras redes WiMAX comerciales, un capítulo que narramos en la entrada dedicada a nuestro país. En 2010, Sprint presentó el HTC EVO 4G, el primer teléfono WiMAX del mercado estadounidense.",
    },
    {
      t: "dato",
      text: "La banda de 3,5 GHz que WiMAX popularizó en muchos países —incluida Bolivia— es hoy una de las bandas centrales del 5G. El espectro sobrevivió a la tecnología que lo estrenó.",
    },
    { t: "h2", text: "La guerra con LTE" },
    {
      t: "p",
      text: "La derrota no fue técnica, sino de ecosistema. Los grandes operadores móviles —los que venían de GSM y UMTS— optaron por LTE, evolución natural de sus redes y de sus proveedores. Una tecnología con más fabricantes de chips, más terminales y costos por escala más bajos ganó, como suele ocurrir, a la técnicamente elegante. Como resumió un analista en la prensa británica, la versión móvil avanzada de WiMAX «llegó demasiado tarde».",
    },
    {
      t: "p",
      text: "Verizon lanzó en 2010 la primera red LTE de alcance nacional en EE. UU.; ese mismo año la UIT reconoció como IMT-Advanced tanto LTE-Advanced como WirelessMAN-Advanced (802.16m). Pero el mercado ya había decidido. Ningún iPhone incluyó WiMAX, y sin terminales masivos las redes perdieron tracción. En 2011 la propia Sprint empezó a migrar hacia LTE; los primeros clientes cambiaron en 2012.",
    },
    { t: "h3", text: "Qué heredó LTE de WiMAX" },
    {
      t: "list",
      items: [
        "OFDMA como técnica de acceso múltiple en el enlace descendente.",
        "Antenas MIMO como pieza central del rendimiento.",
        "Calidad de servicio por flujo de datos y duplexación TDD.",
        "La idea de un núcleo de red totalmente IP.",
      ],
    },
    { t: "h2", text: "Declive y estado actual" },
    {
      t: "p",
      text: "Sprint fue apagando su red WiMAX entre 2015 y 2016 (las fuentes citan marzo de 2016 como cierre total). Yota, en Rusia, migró a LTE hacia 2011–2012. En Japón, UQ Communications evolucionó hacia «WiMAX 2+», una variante compatible con TD-LTE. WiMAX pasó de ser el 4G del futuro a servicio de nicho: redes privadas, enlaces rurales y proveedores locales de internet.",
    },
    {
      t: "p",
      text: "El último capítulo llegó con el 5G. En Chile, la Fiscalía Nacional Económica respaldó que Entel usara la antigua banda de 3,5 GHz licitada para WiMAX en servicios 5G. En Bolivia, el informe anual de la ATT (gestión 2023) todavía contabilizaba 432 conexiones de acceso fijo a Internet bajo la categoría WIMAX-WIPLL, apenas un 0,03 % del total. Una tecnología que quiso conquistar el mundo termina, como las flores más finas, en un jardín pequeño y bien cuidado.",
    },
    {
      t: "gallery",
      items: [photos.towers2, photos.towers3, photos.lab1],
    },
  ],
  sources: [
    { label: "Wikipedia — WiMAX", url: "https://en.wikipedia.org/wiki/WiMAX" },
    { label: "Keysight — WiMAX Overview (IEEE 802.16)", url: "https://helpfiles.keysight.com/csg/n7615/Content/Main/WiMAX_Overview.htm" },
    { label: "FCC — WiMAX Applications for Public Safety", url: "https://www.fcc.gov/general/wimax-applications-public-safety" },
    { label: "WiMAX Forum FAQ (Internet Archive, 2008)", url: "https://web.archive.org/web/20080306033728/http://www.wimaxforum.org/technology/faq/" },
    { label: "EBSCO Research Starters — WiMAX", url: "https://www.ebsco.com/research-starters/communication-and-mass-media/wimax-worldwide-interoperability-microwave-access" },
    { label: "Silicon UK — Tales in Tech History: WiMax", url: "https://www.silicon.co.uk/networks/tales-tech-history-wimax-227889" },
    { label: "La Tercera — FNE respalda a Entel para usar antigua banda de WiMAX en 5G", url: "https://www.latercera.com/pulso/noticia/fne-respalda-a-entel-para-utilizar-antigua-banda-de-wimax-para-5g/TVRYVM53KJCQDK735BBWBZM4EE/" },
    { label: "ATT Bolivia — Estado de situación de las telecomunicaciones, gestión 2023", url: "https://www.att.gob.bo/sites/default/files/archivos_portada/2024-08/Estado%20de%20Situaci%C3%B3n%20de%20las%20Telecomunicaciones%20en%20Bolivia%20de%20la%20Gesti%C3%B3n%202023%20(anual%20auditado).pdf" },
  ],
};
