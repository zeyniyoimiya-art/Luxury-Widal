// Artículo 2 · Personajes clave (solo afirmaciones verificables; se aclara qué figuras NO tienen vínculo documentado)
import { Article, photos } from "./types";

export const personajes: Article = {
  slug: "personajes",
  title: "Personajes Clave",
  kicker: "Las manos detrás del espectro",
  excerpt:
    "WiMAX no tuvo un único padre: lo levantaron comités, consorcios y ejecutivos audaces. Un retrato de quienes lo impulsaron —y una aclaración honesta sobre los nombres que la leyenda le atribuye.",
  hero: photos.lab3,
  blocks: [
    {
      t: "p",
      text: "Las tecnologías de masas rara vez tienen un inventor solitario, y WiMAX es el ejemplo perfecto. Su historia se escribió en reuniones de grupos de trabajo, en cartas de enlace entre organizaciones y en salas de juntas donde se decidían inversiones de miles de millones. Por eso este retrato de personajes mezcla ingenieros, presidentes de consorcios y ejecutivos: cada uno cumplió una función distinta en la cadena que va de una ecuación a una antena.",
    },
    {
      t: "note",
      title: "Nota editorial de rigor",
      text: "Al investigar encontré tres nombres que suelen asociarse a WiMAX: Andrew Viterbi, David J. Farber y Steve Jobs. Ninguno figura como creador o directivo del estándar ni del WiMAX Forum. Aquí los presento por lo que sí está documentado: su relación indirecta con las ideas, la regulación o el mercado de WiMAX. No atribuyo citas que no pude verificar.",
    },
    { t: "h2", text: "Los arquitectos del estándar y del Foro" },
    {
      t: "people",
      items: [
        {
          name: "Roger B. Marks",
          initials: "RM",
          role: "Presidente del grupo de trabajo IEEE 802.16",
          tag: "IEEE",
          note: "Participa en IEEE 802 desde 1998 y presidió el grupo 802.16 (WirelessMAN) durante los años decisivos. Trabajaba en el NIST estadounidense y en 2008 firmaba cartas oficiales desde la industria. En 2008 declaró que una milla era un alcance razonable para WiMAX móvil en entorno urbano.",
        },
        {
          name: "Ron Resnick",
          initials: "RR",
          role: "Presidente del WiMAX Forum (2008)",
          tag: "WiMAX Forum",
          note: "Así figura en la correspondencia oficial del IEEE con el Foro en marzo de 2008, cuando ambas organizaciones coordinaban su respuesta a la UIT sobre las tecnologías IMT-Advanced.",
        },
      ],
    },
    { t: "h2", text: "Los apostadores: Sprint y Clearwire" },
    {
      t: "p",
      text: "Si el IEEE escribió el manual, Sprint y Clearwire pusieron el dinero. La pareja anunció en 2007 su alianza para levantar la primera red WiMAX móvil nacional de Estados Unidos, y en 2008 sumó a Intel, Google, Comcast, Time Warner Cable y Bright House como inversionistas. Fue la mayor apuesta comercial jamás hecha por WiMAX.",
    },
    {
      t: "people",
      items: [
        {
          name: "Craig McCaw",
          initials: "CM",
          role: "Fundador de Clearwire",
          tag: "Clearwire",
          note: "Pionero de la telefonía celular estadounidense: su McCaw Cellular fue vendida a AT&T en los noventa. Con Clearwire apostó a que el espectro de 2,5 GHz y una red propia darían internet inalámbrico de gran escala.",
        },
        {
          name: "Barry West",
          initials: "BW",
          role: "CTO de Sprint y presidente de Xohm",
          tag: "Sprint",
          note: "En 2008 defendía que los puntos de acceso de WiMAX serían «del tamaño de una ciudad», frente a los hotspots Wi-Fi. Lideró el despliegue técnico de la marca Xohm.",
        },
        {
          name: "Gary Forsee y Dan Hesse",
          initials: "FH",
          role: "Consejeros delegados de Sprint",
          tag: "Sprint",
          note: "Bajo Forsee, Sprint anunció en 2006 su estrategia WiMAX; bajo Hesse (desde fines de 2007) se consumó la alianza con Clearwire y, después, la transición a LTE.",
        },
      ],
    },
    { t: "h2", text: "Los nombres que la leyenda asocia" },
    {
      t: "people",
      items: [
        {
          name: "Andrew J. Viterbi",
          initials: "AV",
          role: "Matemático e ingeniero; cofundador de Qualcomm",
          tag: "Fundamentos",
          note: "Su algoritmo de 1967 para decodificar códigos convolucionales es piedra angular de las comunicaciones digitales, y los códigos convolucionales figuran en la capa física de 802.16. Fue cofundador de Linkabit (1968) y Qualcomm (1985) y pieza clave de CDMA. Su vínculo con WiMAX es matemático, no institucional.",
        },
        {
          name: "David J. Farber",
          initials: "DF",
          role: "Pionero de Internet; exjefe tecnológico de la FCC",
          tag: "Contexto",
          note: "Figura histórica de las redes académicas y de la política de banda ancha estadounidense. No hallé un cargo documentado suyo en WiMAX; lo incluyo por el contexto regulatorio en que la banda ancha inalámbrica se debatía.",
        },
        {
          name: "Steve Jobs",
          initials: "SJ",
          role: "Cofundador de Apple",
          tag: "Mercado",
          note: "No pude verificar ninguna declaración suya sobre WiMAX. Sí consta que ningún iPhone incluyó WiMAX y que, según el inversor John Stanton, Jobs exploró antes de 2007 la idea de una red basada en espectro libre para eludir a los operadores.",
        },
      ],
    },
    {
      t: "quote",
      text: "Los ausentes también cuentan la historia: sin Apple en el bando de WiMAX, el ecosistema de terminales nunca alcanzó la masa crítica.",
      by: "Lectura editorial · widal te informa",
    },
    { t: "h2", text: "Los rostros bolivianos" },
    {
      t: "p",
      text: "WiMAX en Bolivia tiene sus propios protagonistas, documentados por la prensa de 2008. Ellos son la razón por la que este blog existe: la historia global se volvió local cuando estas personas hablaron ante los micrófonos.",
    },
    {
      t: "people",
      items: [
        {
          name: "Mauricio Cáceres",
          initials: "MC",
          role: "Gerente de Tecnologías de Entel (2008)",
          tag: "Entel",
          note: "Explicó a La Razón que Wi-Fi tenía un alcance de 100 a 200 metros y exigía línea de vista limpia, mientras WiMAX permitiría el acceso desde cualquier punto de la ciudad. Afirmó que Entel ya había instalado antenas en las nueve capitales.",
        },
        {
          name: "Eddy Franco Nogales",
          initials: "EF",
          role: "Gerente de Comunicación Institucional de Entel",
          tag: "Entel",
          note: "Presentó el servicio en la Feria Internacional de Cochabamba en abril de 2008 y anunció la expansión al resto del país.",
        },
        {
          name: "Kurt Klein",
          initials: "KK",
          role: "Planificación e Ingeniería de COTAS",
          tag: "COTAS",
          note: "Al elegir los equipos de Airspan, valoró que pudieran «superar los desafíos del terreno accidentado» de Bolivia y llegar a clientes urbanos y rurales.",
        },
        {
          name: "Víctor Agnellini",
          initials: "VA",
          role: "Presidente de Alcatel-Lucent para América Latina y el Caribe",
          tag: "Proveedor",
          note: "Firmó con Entel el contrato para «la primera red comercial de tecnología WiMAX en Bolivia» en abril de 2008.",
        },
      ],
    },
    {
      t: "dato",
      text: "El grupo IEEE 802.16 se bautizó a sí mismo «WirelessMAN». El nombre «WiMAX» —más fácil de pronunciar y de vender— lo inventó el WiMAX Forum para emular el éxito comercial de «Wi-Fi».",
    },
    { t: "gallery", items: [photos.lab2, photos.lab1, photos.towers4] },
  ],
  sources: [
    { label: "IEEE Xplore — Roger B. Marks (biografía)", url: "https://ieeexplore.ieee.org/author/37289170100" },
    { label: "IEEE 802.16 — Carta a Ron Resnick, presidente del WiMAX Forum (2008)", url: "https://www.ieee802.org/16/liaison/docs/L80216-08_016.pdf" },
    { label: "Computerworld — Six Reasons to Start Considering WiMax Today (2008)", url: "https://www.computerworld.com/article/1395138/six-reasons-to-start-considering-wimax-today.html" },
    { label: "Franklin Institute — Andrew J. Viterbi", url: "https://fi.edu/en/awards/laureates/andrew-j-viterbi" },
    { label: "MacRumors — Steve Jobs y el espectro Wi-Fi (John Stanton, 2011)", url: "https://www.macrumors.com/2011/11/15/steve-jobs-envisioned-using-unlicensed-wi-fi-spectrum-for-apple-mobile-phone-network/" },
    { label: "Telecombol — Entel ofrecerá la tecnología WiMAX para todo el país (2008)", url: "https://www.telecombol.com/2008/04/entel-ofrecer-la-tecnologa-wimax-para.html" },
    { label: "Opinión — Llega la tecnología WiMAX (26/04/2008)", url: "https://www.opinion.com.bo/articulo/el-pais/llega-tecnologia-wimax/20080426192014307241.html" },
    { label: "Developing Telecoms — Airspan selected by COTAS", url: "https://developingtelecoms.com/telecom-technology/wireless-networks/2306-airspan-selected-by-cotas-for-multi-city-wimax-network-in-bolivia.html" },
  ],
};
