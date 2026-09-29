# widal te informa

Blog editorial de lujo sobre **WiMAX** (IEEE 802.16). Estética «alta costura + joyería fina + arte geométrico azteca estilizado»:
oro rosa `#b76e79`, rosa polvo `#e8b4b8`, crema marfil `#faf3e7`, burdeos `#4a0e1f`. Modo claro por defecto y modo oscuro opcional.

**Desarrollado por Cruz Muños Luis Vidal** — Estudiante de Sistemas Informáticos, INCOS El Alto.
*Infórmate aquí*

## Stack real de esta entrega
El entorno de construcción fijaba React + Vite + Tailwind CSS v4 y un único `dist/index.html`, así que esta versión NO usa SvelteKit,
tRPC, Supabase ni Rust/WASM.

| Requisito original | Implementación en esta entrega |
| --- | --- |
| SvelteKit | React 19 + Vite + `react-router-dom` (router de hash, View Transitions) |
| GSAP + ScrollTrigger + SplitText | GSAP + ScrollTrigger; el efecto SplitText se hizo con spans manuales |
| Three.js + Threlte | Three.js (WebGL) con material metálico PBR; sin WebGPU/TypeGPU |
| Barba.js / Lottie | Transiciones con View Transitions API + CSS; ornamentos en SVG |
| CSS Houdini `paint()` | Patrón de greca en SVG (`.greca-bg`) |
| Web Audio API | `src/lib/audio.ts` (campanita + ambiente, silenciado por defecto) |
| Superforms + Zod | Formulario con Zod (`src/pages/Contact.tsx`) |
| PWA | `manifest.webmanifest` (sin service worker) |
| tRPC / Supabase / WASM | No incluidos: el contenido vive en `src/data/*.ts` |

## Scripts
```bash
npm install
npm run dev      # desarrollo
npm run build    # genera dist/index.html (archivo único)
```

## Estructura
- `src/data/` — artículos, mapa de cobertura y fuentes citadas
- `src/components/` — Cursor, RoseHero (Three.js), WorldMap, ArticleView, Header, Footer…
- `src/pages/` — Home, Blog, Artículo, Autor, Contacto
- `src/lib/` — audio (Web Audio) y animación (GSAP)

## Accesibilidad y movimiento
`prefers-reduced-motion` desactiva pétalos, cursor personalizado, campanitas, bucle 3D y transiciones. Foco visible en oro rosa,
enlace «Saltar al contenido» y marcadores del mapa operables con teclado.

## Créditos
Fotografías de [Pexels](https://www.pexels.com) con crédito en cada galería. Mapa: `world-atlas` (Natural Earth, dominio público).
