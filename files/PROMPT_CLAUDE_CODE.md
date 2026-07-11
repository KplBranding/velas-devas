# Prompt para Claude Code — Velas Devas

Copia y pega esto completo en Claude Code para iniciar el proyecto.

---

## INSTRUCCIÓN PRINCIPAL

Crea un sitio web completo para **Velas Devas** usando Next.js 14 con App Router y Tailwind CSS. El sitio es un catálogo mayorista B2B de velas para Chile. Sigue estrictamente el diseño, paleta, tipografía y estructura definidos abajo. No improvises colores ni fuentes.

---

## STACK TÉCNICO

- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS + CSS variables globales
- **Fuentes:** Google Fonts (Playfair Display + Lato)
- **Hosting:** Vercel
- **Dominio:** velasdevas.cl

---

## TIPOGRAFÍA

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700;900&display=swap');
```

| Rol | Fuente | Peso | Tamaño |
|---|---|---|---|
| Hero / títulos grandes | Playfair Display | 400 | 52–64px |
| Títulos italic | Playfair Display | 400 italic | 52–64px |
| Títulos de sección | Playfair Display | 700 | 36–44px |
| Nombre producto (card) | Playfair Display | 400 | 15px |
| Eyebrow | Lato | 700 | 10px, uppercase, letter-spacing 0.18em |
| Navegación | Lato | 400 | 12px |
| Cuerpo / párrafos | Lato | 300 | 13–14px |
| Medidas / labels | Lato | 300 | 11px |
| Botones | Lato | 700 | 12px, uppercase, letter-spacing 0.06em |
| Logo en navbar | Playfair Display | 400 | 20px |

---

## PALETA DE COLORES

```css
:root {
  /* FONDOS */
  --bg-base:    #FAFAF8;  /* nav · body · catálogo */
  --bg-hero:    #F4F2EE;  /* hero · secciones alternas */
  --bg-card-1:  #ECEAE5;  /* fondo imagen cards (impar) */
  --bg-card-2:  #E2DED8;  /* fondo imagen cards (par) */
  --bg-footer:  #1C1C1A;  /* footer */

  /* TEXTOS */
  --text-primary: #111110; /* títulos · logo */
  --text-body:    #666662; /* párrafos */
  --text-muted:   #AAAAAA; /* labels · sort */
  --text-footer:  #777773; /* links footer */

  /* BORDES */
  --border:       #DEDAD4; /* divisores generales */
  --border-dark:  #2E2E2C; /* divisor footer */

  /* ACENTOS */
  --gold:         #A67C2E; /* oro llama · eyebrows · CTA secundario */
  --gold-light:   #F0E6CE; /* fondo badge dorado */
  --graphite:     #2E2A24; /* botón CTA principal */
  --black-graphic:#111110; /* negro gráfico · badges */
}
```

---

## COMPONENTES BASE

### Botón primario
```css
background: #2E2A24; color: #FAFAF8;
font: Lato 700, uppercase, letter-spacing 0.06em;
padding: 10px 20px; border-radius: 4px;
```

### Botón secundario
```css
background: transparent; color: #A67C2E;
border: 1px solid #A67C2E;
font: Lato 700, uppercase, letter-spacing 0.06em;
padding: 10px 20px; border-radius: 4px;
```

### Badge oscuro (estado)
```css
background: #111110; color: #FAFAF8;
font: Lato 700, 9px, uppercase, letter-spacing 0.08em;
padding: 3px 7px; border-radius: 0;
```

### Badge dorado (destacado)
```css
background: #F0E6CE; color: #A67C2E;
font: Lato 700, 9px, uppercase;
padding: 3px 7px;
```

### Eyebrow
```css
font: Lato 700, 10px; color: #A67C2E;
text-transform: uppercase; letter-spacing: 0.18em;
```

---

## ESTRUCTURA DE PÁGINAS

### Rutas
```
/              → Página de entrada (split screen)
/banqueteria   → Catálogo banquetería
/religiosas    → Catálogo religiosas
/funerarias    → Catálogo funerarias
/nosotros      → Quiénes somos
/contacto      → Formulario de cotización
```

---

## PÁGINA 1: ENTRADA (ruta `/`)

**Concepto:** Split screen de 3 paneles verticales que ocupan 100vh. Cada panel representa una categoría. Al hacer hover, el panel se expande (flex: 1.7) y revela descripción + CTA. Al hacer click, navega a esa categoría.

**Estructura:**
```
┌─────────────────────────────────────────────────┐
│  Logo "Velas Devas" (izq)    Nosotros · Contacto│  ← nav absoluto, texto blanco
├──────────────┬──────────────┬───────────────────┤
│              │              │                   │
│  BANQUETERÍA │  RELIGIOSAS  │    FUNERARIAS     │  ← 100vh, expand on hover
│              │              │                   │
│  bg #1C1C1A  │  bg #2E2A24  │    bg #111110     │
│              │              │                   │
│  [título]    │  [título]    │    [título]       │
│  [desc]      │  [desc]      │    [desc]         │
│  [cta →]     │  [cta →]     │    [cta →]        │
└──────────────┴──────────────┴───────────────────┘
```

**Comportamiento hover por panel:**
- `flex` transiciona de 1 a 1.7 (cubic-bezier 0.4, 0, 0.2, 1, 500ms)
- Aparecen: eyebrow, descripción, CTA (con fade + translateY)
- Línea dorada `#A67C2E` aparece en borde derecho del panel
- Overlay dorado sutil en gradiente inferior

**Texto central (desaparece al hover):**
```
Eyebrow: Bienvenido · Desde 2000
Título:  ¿Qué tipo de vela
         estás buscando?
Subtítulo: ← elige una categoría →
```

**Contenido de cada panel:**
```
Panel 1 — Banquetería
  Eyebrow: Para eventos
  Título:  Banquetería
  Desc:    Velas para matrimonios y eventos.
           Más de 30 medidas en blanco e marfil.
  CTA:     Ver colección →

Panel 2 — Religiosas
  Eyebrow: Para iglesias
  Título:  Religiosas
  Desc:    Cirios y velones para iglesias.
           Formatos tradicionales en todos los tamaños.
  CTA:     Ver colección →

Panel 3 — Funerarias
  Eyebrow: Para funerarias
  Título:  Funerarias
  Desc:    Velas de uso profesional.
           Stock permanente y pedidos especiales.
  CTA:     Ver colección →
```

---

## PÁGINAS 2–4: CATÁLOGO DE CATEGORÍA

**Layout base (igual para las 3 categorías):**
```
┌─────────────────────────────────────────┐
│ Logo (izq) ············· iconos (der)   │ ← nav-top bg #FAFAF8, h 52px
├─────────────────────────────────────────┤
│ Inicio · Catálogo · Nosotros · Contacto │ ← nav-sub, border-bottom #DEDAD4
├─────────────────────────────────────────┤
│ [imagen cabecera full width, h 240px]   │ ← bg #2E2A24 con SVG velas
├─────────────────────────────────────────┤
│ Todos · Banquetería · ... ··· Sort by ▾ │ ← filters bar
├─────────────────────────────────────────┤
│ Nombre categoríaⁿ  (Playfair 52px)     │ ← cat title block
├─────────────────────────────────────────┤
│ [card][card][card][card]                │ ← grid 4 columnas
│ [card][card][card][card]                │
└─────────────────────────────────────────┘
```

**Cards de producto:**
- Imagen: fondo alternado #ECEAE5 / #E2DED8, ilustración SVG de vela
- Cuerpo: nombre (Playfair 400 15px) + color + medida (Lato 300 11px)
- Sin borde redondeado en cards
- Grilla separada por líneas de 1px #DEDAD4

---

## PÁGINA 5: NOSOTROS (`/nosotros`)

```
Eyebrow: Quiénes somos
Título:  Más de 25 años
         fabricando velas

Párrafo 1:
Desde el año 2000, Velas Devas fabrica velas
para los mercados más exigentes de Chile.
Trabajamos exclusivamente con clientes mayoristas:
banquetería, iglesias y funerarias de todo el país.

Párrafo 2:
Nuestro catálogo supera los 100 formatos,
todos disponibles en blanco e marfil.
Cada vela se fabrica con los mismos
estándares de siempre: sin atajos.
```

---

## PÁGINA 6: CONTACTO (`/contacto`)

```
Eyebrow: Cotizaciones mayoristas
Título:  Hablemos de
         tu proyecto

Campos del formulario:
- Nombre completo
- Empresa
- Rubro (select: Banquetería / Religiosas / Funerarias)
- Teléfono
- Mensaje / cantidad estimada
- Botón: Enviar solicitud

Datos de contacto:
  Dirección: Av. Santa Rosa N° 6435, Bodega 11, Santiago
  Teléfono:  (2) 2526 3491
```

---

## FOOTER (todas las páginas excepto entrada)

```
bg: #1C1C1A

Logo: Velas Devas (Playfair, blanco)
Tagline: Proveedor mayorista de velas artesanales · Chile

Columnas:
  Catálogo        Empresa         Contacto
  Banquetería     Nosotros        (2) 2526 3491
  Religiosas      Contacto        Av. Santa Rosa 6435
  Funerarias

Línea inferior:
  © 2026 Velas Devas · velasdevas.cl
```

---

## LOGOS

Coloca los logos en `/public/`:
- `logo-horizontal.png` — logo completo con texto
- `logo-icono.png` — solo el monograma D

Usa `logo-horizontal.png` en navbar claro.
En la página de entrada (fondo oscuro), usa texto blanco "Velas Devas" en Playfair Display 400.

---

## DATOS DE PRODUCTOS

Crea `/data/productos.json` con esta estructura:

```json
[
  {
    "id": "vel-ban-001",
    "categoria": "banqueteria",
    "nombre": "Vela nº 1",
    "color": "blanca",
    "alto_cm": 15,
    "diametro_cm": 1.5
  },
  {
    "id": "vel-ban-002",
    "categoria": "banqueteria",
    "nombre": "Vela nº 2",
    "color": "marfil",
    "alto_cm": 20,
    "diametro_cm": 2
  }
]
```

Crea al menos 6 productos por categoría (18 en total) con medidas variadas para poblar el catálogo inicial.

---

## REFERENCIA VISUAL

- Estructura de catálogo inspirada en: myafterglo.com/collections/candles
- Página de entrada: split screen tipo publicrecords.nyc
- Paleta y tipografía: definidas arriba, no usar otras

