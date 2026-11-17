# Sistema de diseño — MANTA Studio

**Fuente de verdad:** el código del sitio publicado (manta.com.ar), en particular `src/index.css` (bloque `@theme` y clases utilitarias), `index.html` (carga de fuentes) y los componentes de `src/components/`.
Este documento describe ese sistema. Si algo del código cambia, se actualizan este archivo y la página «Sistema de Diseño» del espacio MANTA en Anytype.

Última revisión: 17/11/2026, contra `origin/main` (commit `2d82cb6`).

> **Documentos históricos:** `creative_assets/BRAND_GUIDELINES.md` («Notion-Crayon Fusion»: magenta `#FF00FF`, fondo `#F0F0EF`, Outfit + Geist Sans + Geist Mono), `BRAND_COMPLIANCE_REPORT.md` y `VISION_BOARD.md` (carpeta local, fuera del repo) describen la etapa de exploración de febrero de 2026. El sitio se apartó de ellos: el magenta pasó a `#D9026D`, el texto usa Inter y no se carga Geist. Para todo lo visual vale este archivo.

---

## Concepto
**Atelier digital: precisión y alma.** Un cuaderno de taller: papel con grano, trazo de crayón que se vuelve técnico y tinta magenta sobre carbón. Las secciones alternan papel claro y fondo casi negro.

## Stack
- **Frontend:** React 19 + TypeScript + Vite, con Framer Motion.
- **Estilos:** Tailwind CSS v4, tokens en `@theme` de `src/index.css`.
- **Tipografías:** Google Fonts por `<link>` en `index.html` (Inter y Outfit, pesos 400 a 700).
- **Íconos:** Phosphor (principal) y algunos de lucide-react.
- **Despliegue:** contenedor nginx (Dockerfile) y worker de Cloudflare para el formulario de contacto.

---

## Colores

| Token | Hex | Uso |
|---|---|---|
| `--color-primary` / `--color-ink-magenta` | `#D9026D` | **Manta Ink.** Acento de marca: rótulos técnicos, líneas guía, palabras destacadas, estado de éxito del formulario, selección de texto. |
| (sin token) | `#FF00FF` | Magenta eléctrico. Solo la última «A» del hero y el resaltado de `TextReveal`. Es un remanente de la guía de exploración: usarlo solo en esos dos lugares. |
| `--color-deep-charcoal` | `#1A1A1A` | Texto principal sobre fondos claros y letras del hero. |
| `--color-paper-white` | `#F9F9F7` | Fondo del hero y del cuerpo de la página. |
| `.bg-paper-light` | `#F4F1EA` | Papel crema con grano: intro, manifiesto, contacto. |
| `--color-silver-light` (`.bg-paper`) | `#F1F1EF` | Papel gris con grano: servicios y portafolio. |
| `--color-silver-industrial` | `#E5E5E0` | Bordes cálidos. |
| `--color-silver-mid` | `#A3A3A3` | Texto apagado sobre fondos oscuros. |
| `.bg-paper-dark` | `#0A0A0A` | Taller de noche: menú móvil, pie y secciones oscuras. |
| `--color-vellum-alpha` | `rgba(241,241,239,0.4)` | Velo translúcido. |

**Neutros por opacidad:** el sitio escribe casi todo con negro y blanco transparentes: `text-black/60` para cuerpo, `/40` para rótulos, `border-black/5`–`/10` para filetes; en oscuro, `text-white/60`–`/80` y `border-white/10`.

**Contraste:**
- `primary` sobre blanco: 5:1. Sobre papel crema (`#F4F1EA`): 4,45:1, apenas por debajo de AA en texto chico. Sobre `#0A0A0A`: 3,94:1, solo para texto de 24px o más o rótulos en negrita.
- `#FF00FF` sobre `#F9F9F7`: 2,98:1, solo como letra gigante del hero.
- `text-black/40` sobre papel crema: 2,8:1. Los rótulos mono de 10px quedan por debajo de AA.

## Tipografía

| Rol | Familia | Token | Uso |
|---|---|---|---|
| **Display** | **Outfit** | `font-display` (`--font-display`) | h1 a h4 (`line-height: 0.9` global), hero en mayúsculas, títulos de sección gigantes. Peso medio (500), `tracking-tighter`. |
| **Texto** | **Inter** | `font-sans` (`--font-sans`, por defecto en `body`) | Párrafos, campos de formulario, botones. |
| **Rótulos** | Monoespaciada del sistema | `font-mono` (pila por defecto de Tailwind) | Etiquetas técnicas en mayúsculas («Workshop / Atelier», «Fase 01»), 8 a 12px, `tracking-[0.2em]`–`[0.4em]`. |
| Serif | Georgia | `font-serif` | Uso puntual (dos apariciones). |

Geist Sans y Geist Mono **no** se cargan; los nombraba la guía histórica.

### Escala en uso
| Nivel | Mobile | Tablet (`md`, 768px) | Desktop (`lg`, 1024px) |
|---|---|---|---|
| Hero «MANTA» | 72px (`text-7xl`) | 128px (`text-9xl`) | 160px (`text-[10rem]`), `tracking-[-0.06em]` |
| Título de sección | 60px (`text-6xl`) | 96px (`text-8xl`) | 128px (`text-9xl`), `leading-[0.85]` |
| Bajada | 20px (`text-xl`) | 24px (`text-2xl`) | — |
| Cuerpo / campos | 18px (`text-lg`) | — | — |
| Botón | 12px, negrita, mayúsculas, `tracking-widest` | — | — |
| Rótulo mono | 10px (8 a 12px), mayúsculas, `tracking-[0.2em]`–`[0.4em]` | — | — |

## Formas, sombras y texturas
- **Radios:** en la práctica el sitio es de esquinas rectas: tarjetas, botones y campos van sin radio o con `rounded-sm` (2px). `rounded-full` en chips y rótulos; `rounded-xl` (12px) en los íconos sociales; `rounded-[40px]` en el video destacado. `--radius-sharp` (2px) y `--radius-technical` (8px) están definidos en `@theme` pero no se usan.
- **Sombra de trama (`--shadow-hatch`):** `4px 4px 0 rgba(0,0,0,0.8)`, sombra dura de imprenta para hover de botones y velos.
- **Sombra de tinta (`--shadow-ink`):** `0 4px 20px rgba(217,2,109,0.15)`.
- **Grano de papel:** ruido fractal SVG al 5–8% de opacidad en `.bg-paper`, `.bg-paper-light` y `.bg-paper-dark`.
- **Grilla de croquis:** filetes de 1px en `black/5` que cruzan las secciones, y retícula de 40px a baja opacidad.
- **Velo (`.vellum`):** `bg-white/20`, `backdrop-blur-[2px]`, borde `black/5` y sombra de trama en hover.
- **Filtro crayón:** `filter: url(#crayon-filter)` / `#hero-crayon`, la textura de trazo sobre titulares y logo.

**Variables sin definir:** `--shadow-letterpress` y `--color-background-dark` se usan en `index.css` pero no existen en `@theme`. La clase `.input-atelier` está definida y no se usa.

## Componentes base
- **Botón principal (formulario):** `w-full py-6 rounded-none bg-black text-white font-bold uppercase tracking-widest text-[12px]`; hover `bg-black/80` + sombra de trama + `-translate-y-1`. Mientras se envía: `bg-black/20`. Éxito: `bg-primary`.
- **Botón de llamado (CTA «Iniciar proyecto»):** `.btn-atelier` + `bg-black text-white px-8 py-5 rounded-none font-mono font-bold text-[11px] tracking-[0.3em]` (`md:tracking-[0.4em]`), borde negro y sombra de trama fija; hover `bg-neutral-800`.
- **Campo:** solo línea inferior: `bg-transparent border-b-2 border-black/10 px-4 py-4 text-lg`; foco `border-primary bg-black/[0.02]`. Rótulo mono de 10px que pasa a `primary` en foco.
- **Rótulo de sección:** línea de 48×2px en `primary` + texto mono de 12px en `primary`, negrita, `tracking-[0.4em]`.
- **Chip:** `rounded-full px-3 py-1 border border-black/10 font-mono text-[10px] uppercase tracking-widest text-black/60`.

## Movimiento
1. **Revelado del hero («Manta-Dynamic Blur Reveal»):** letra por letra, `blur(12px)` → 0, escala 0,95 → 1, Y 30 → 0, stagger 80 ms, easing `[0.16, 1, 0.3, 1]`, 0,8 s. Sin rebote ni elástico.
2. **Entrada de bloques:** `opacity 0 → 1`, Y 40 → 0, 1 s, mismo easing, `whileInView` una sola vez.
3. **Parallax:** columnas y fondos con `useScroll` + `useTransform` (±15%).
4. **Disipación:** el lema y elementos del hero se desvanecen con desenfoque al hacer scroll.
5. **Trazo:** `.scribble-mountain` dibuja el isotipo con `stroke-dashoffset` en 3 s.
6. **Flotación:** `.floating` (6–8 s, ±10px) para elementos decorativos.
No animar `top`, `left`, `width` ni `height`.

## Logos
| Archivo | Qué es | Dónde va |
|---|---|---|
| `public/logo-white-vector.svg` | Isotipo «The Mountain Scribble» en gris grafito con trazo magenta y la palabra MANTA. **Pese al nombre, no es blanco.** | Fondos claros (lo usa el componente `Logo` con `variant="dark"`). |
| `public/logo-color-vector.svg` | La misma composición en blanco con trazo magenta. **Pese al nombre, es la versión clara.** | Fondos oscuros (`variant="light"`) y página 404. |
| `public/favicon.png` | Isotipo solo, 512×512, fondo transparente. | Favicon. |
| `public/og-image.png` / `.webp` | Imagen para redes, 1200×630. | Metadatos OG. |

El trazo del isotipo tiene su propio magenta violáceo, que no coincide con `primary`: no se recolorea. La textura de crayón es parte de la marca: no se reemplaza por un trazo limpio.

## Voz
Artesanal, precisa y un poco poética. Tuteo («Describe tu visión y tracemos el camino juntos», «Hablemos»). Los rótulos técnicos mezclan español e inglés en mono («Workshop / Atelier», «Digital Atelier — Precision & Soul»). Servicios: Diseño Digital, Desarrollo Web y Dirección de Arte. Base: Mendoza y Santiago del Estero.

---

## Reglas para quien desarrolle (personas o agentes)
1. Usar los tokens de `@theme` (`text-primary`, `bg-paper-light`, `font-display`…). Para grises, negro y blanco con opacidad, como hace el sitio.
2. Titulares en Outfit, texto en Inter, rótulos en mono.
3. El magenta es tinta, no relleno: líneas, palabras, rótulos. Nunca fondos grandes de `primary`.
4. Mobile first; ajustes en `md` (768px) y `lg` (1024px).
5. Si cambia un token o un componente base, actualizar en el mismo cambio este archivo y la página de Anytype.
