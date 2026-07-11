# Velas Devas — Design Setup
> Documento base para Claude Code. Todos los valores de diseño están aquí.

---

## Stack técnico
- Framework: Next.js 14 (App Router)
- Estilos: Tailwind CSS
- Fuentes: Google Fonts
- Hosting: Vercel
- Dominio: velasdevas.cl

---

## Tipografía

### Fuentes
```
Display / Títulos: Playfair Display
Cuerpo / UI:      Lato
```

### Escala tipográfica

| Rol              | Fuente           | Peso | Tamaño  | Uso                          |
|------------------|------------------|------|---------|------------------------------|
| Hero title       | Playfair Display | 400  | 52–64px | Título principal de página   |
| Hero italic      | Playfair Display | 400i | 52–64px | Palabra en cursiva del hero  |
| Section title    | Playfair Display | 700  | 36–44px | Título de sección interior   |
| Card title       | Playfair Display | 400  | 15px    | Nombre de producto en cards  |
| Eyebrow          | Lato             | 700  | 10px    | Uppercase + letter-spacing   |
| Nav / menú       | Lato             | 400  | 12–13px | Links de navegación          |
| Cuerpo           | Lato             | 300  | 13–14px | Párrafos descriptivos        |
| Label / datos    | Lato             | 300  | 11px    | Medidas, subtítulos de cards |
| Botón            | Lato             | 700  | 12–13px | CTAs, uppercase              |
| Logo             | Playfair Display | 400  | 20px    | Nombre marca en navbar       |

### Reglas tipográficas
- Eyebrows siempre en uppercase + letter-spacing: 0.16em
- Títulos hero pueden combinar peso 400 regular + 400 italic
- Cuerpo siempre Lato Light (300) para máximo contraste con títulos
- Botones en Lato Bold (700) + uppercase + letter-spacing: 0.06em

### Import Google Fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700;900&display=swap');
```

---

## Paleta de colores

### Fondos
| Token             | Hex       | Uso                                      |
|-------------------|-----------|------------------------------------------|
| `bg-base`         | `#FAFAF8` | Fondo principal · nav · catálogo         |
| `bg-hero`         | `#F4F2EE` | Hero de página · secciones alternas      |
| `bg-card-1`       | `#ECEAE5` | Fondo imagen cards (primario)            |
| `bg-card-2`       | `#E2DED8` | Fondo imagen cards (alternado)           |
| `bg-footer`       | `#1C1C1A` | Footer                                   |

### Textos
| Token             | Hex       | Uso                                      |
|-------------------|-----------|------------------------------------------|
| `text-primary`    | `#111110` | Títulos · logo · nav activo              |
| `text-body`       | `#666662` | Párrafos · descripciones                 |
| `text-muted`      | `#AAAAAA` | Subtítulos · sort · labels secundarios   |
| `text-footer`     | `#777773` | Links de footer                          |

### Bordes
| Token             | Hex       | Uso                                      |
|-------------------|-----------|------------------------------------------|
| `border-default`  | `#DEDAD4` | Divisores · bordes de nav · separadores  |
| `border-dark`     | `#2E2E2C` | Divisor en footer                        |

### Acentos — destacado y acción
| Token             | Hex       | Uso                                      |
|-------------------|-----------|------------------------------------------|
| `accent-gold`     | `#A67C2E` | Eyebrows · links activos · llama · badge |
| `accent-gold-bg`  | `#F0E6CE` | Fondo suave para badges en oro           |
| `graphite`        | `#2E2A24` | Botón principal CTA                      |
| `black-graphic`   | `#111110` | Negro gráfico · texto fuerte · badges    |

### Uso del negro gráfico
- Badges de estado: `bg #111110` + `text #FAFAF8`
- Nav underline activo
- Bordes de botón secundario

### Uso del oro
- Eyebrows de sección (texto uppercase)
- Link activo en submenú
- Llama de las velas en íconos SVG
- Borde + texto de botón secundario
- Acento en footer (títulos de columna)

---

## Componentes UI base

### Botón primario
```
bg: #2E2A24  |  text: #FAFAF8  |  font: Lato 700  |  uppercase
padding: 10px 20px  |  border-radius: 4px  |  letter-spacing: 0.06em
```

### Botón secundario
```
bg: transparent  |  text: #A67C2E  |  border: 1px solid #A67C2E
font: Lato 700  |  uppercase  |  padding: 10px 20px  |  border-radius: 4px
```

### Badge de estado
```
bg: #111110  |  text: #FAFAF8  |  font: Lato 700  |  font-size: 9px
padding: 3px 7px  |  uppercase  |  letter-spacing: 0.08em  |  border-radius: 0
```

### Badge oro (destacado positivo)
```
bg: #F0E6CE  |  text: #A67C2E  |  font: Lato 700  |  font-size: 9px
padding: 3px 7px  |  uppercase  |  letter-spacing: 0.08em
```

### Eyebrow
```
font: Lato 700  |  font-size: 10px  |  color: #A67C2E
uppercase  |  letter-spacing: 0.18em
```

### Nav underline activo
```
border-bottom: 1.5px solid #111110  |  color: #111110
```

---

## Estructura de páginas

### Layout base (todas las páginas)
```
┌─────────────────────────────────────────┐
│  Logo (izq) ·········· Iconos (der)     │  ← nav-top · bg #FAFAF8
├─────────────────────────────────────────┤
│  Inicio · Catálogo · Nosotros · Contacto │  ← nav-sub · border-bottom
├─────────────────────────────────────────┤
│                                         │
│         CONTENIDO DE PÁGINA             │
│                                         │
├─────────────────────────────────────────┤
│  Footer oscuro #1C1C1A                  │
└─────────────────────────────────────────┘
```

### Página interior de categoría
```
┌─────────────────────────────────────────┐
│  [Nav top + submenú]                    │
├─────────────────────────────────────────┤
│  [Imagen cabecera categoría — full width│
│   height: 240px · bg: foto o gradiente] │
├─────────────────────────────────────────┤
│  Filtros subcategoría ··· Sort by ▾    │
├─────────────────────────────────────────┤
│  Nombre categoríaⁿ  (Playfair 52px)    │
├─────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ img  │ │ img  │ │ img  │ │ img  │  │  ← grid 4 col
│  │─────│ │──────│ │──────│ │──────│  │
│  │nombre│ │nombre│ │nombre│ │nombre│  │
│  │medida│ │medida│ │medida│ │medida│  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
└─────────────────────────────────────────┘
```

---

## Páginas del sitio

| Página      | Ruta           | Descripción                              |
|-------------|----------------|------------------------------------------|
| Inicio      | `/`            | Hero + 3 categorías + CTA contacto       |
| Banquetería | `/banqueteria` | Catálogo matrimonios y eventos           |
| Religiosas  | `/religiosas`  | Catálogo iglesias y velones              |
| Funerarias  | `/funerarias`  | Catálogo uso funerario                   |
| Nosotros    | `/nosotros`    | Historia y valores de la marca           |
| Contacto    | `/contacto`    | Formulario de cotización mayorista       |

---

## Archivos de contenido (sin código)

Los productos se guardan en `/data/productos.json`:
```json
{
  "categoria": "banqueteria",
  "nombre": "Vela nº 1 Blanca",
  "color": "Blanca",
  "alto_cm": 15,
  "diametro_cm": 1.5
}
```

---

## Logos disponibles
- `/public/logo-horizontal.png` — para uso en fondos claros
- `/public/logo-icono.png` — ícono solo (monograma D)

---

## Referencia visual
Estructura inspirada en myafterglo.com:
- Nav doble (logo + submenú separados)
- Imagen cabecera full-width por categoría
- Título de categoría grande post-filtros
- Grilla de 4 columnas sin bordes redondeados
- Fondos de cards en grises cálidos alternados

---

## Contenido real del sitio (velasdevas.cl)

### Datos de la empresa
- **Nombre:** Velas Devas
- **Desde:** año 2000
- **Rubro:** Fabricación y venta mayorista de velas
- **Dirección:** Av. Santa Rosa N° 6435, Bodega 11, Santiago
- **Teléfono:** (2) 2526 3491
- **Web actual:** www.velasdevas.cl

### Qué eliminar del sitio actual
El sitio actual menciona líneas que NO forman parte del nuevo enfoque:
- ~~Velas decorativas~~
- ~~Velas impresas / con imágenes~~
- ~~Marketing para empresas~~
- ~~Bautizos~~

### Categorías del nuevo sitio (solo estas 3)
1. **Banquetería** — matrimonios y eventos
2. **Religiosas** — cirios y velones para iglesias
3. **Funerarias** — velas específicas para funerarias

### Copy recomendado por página

#### Inicio — Hero
```
Eyebrow: Proveedor mayorista · Desde 2000
Título:  Velas para cada
         ocasión especial
Subtítulo: Más de 100 medidas en blanco e marfil.
           Fabricación artesanal para banquetería,
           iglesias y funerarias.
CTA 1: Solicitar cotización
CTA 2: Ver catálogo
```

#### Inicio — Sección categorías
```
Eyebrow: Nuestras líneas
Título: Tres rubros,
        un solo proveedor

Card 1:
  Categoría: Banquetería
  Descripción: Velas para matrimonios y eventos.
               Disponibles en todos los formatos
               y medidas para mesas y ambientes.

Card 2:
  Categoría: Religiosas
  Descripción: Cirios y velones para iglesias.
               Fabricados con los estándares
               tradicionales de cada formato.

Card 3:
  Categoría: Funerarias
  Descripción: Velas específicas para funerarias.
               Disponibles en medidas estándar
               y pedidos especiales.
```

#### Nosotros
```
Eyebrow: Quiénes somos
Título: Más de 25 años
        fabricando velas

Párrafo 1:
Desde el año 2000, Velas Devas fabrica velas
para los mercados más exigentes de Chile.
Trabajamos exclusivamente con clientes mayoristas:
empresas de banquetería, iglesias y funerarias
de todo el país.

Párrafo 2:
Nuestro catálogo supera los 100 formatos,
todos disponibles en blanco e marfil.
Cada vela se fabrica con los mismos
estándares de siempre: sin atajos.
```

#### Contacto
```
Eyebrow: Cotizaciones
Título: Hablemos de
        tu proyecto

Formulario:
  - Nombre
  - Empresa
  - Rubro (Banquetería / Religiosas / Funerarias)
  - Teléfono
  - Mensaje / cantidad estimada

Datos de contacto:
  Dirección: Av. Santa Rosa N° 6435, Bodega 11, Santiago
  Teléfono:  (2) 2526 3491
  Email:     [por definir]
```

### Productos (estructura de datos)
Todos los productos son variantes de medida de una misma vela.
Los atributos son:
- Categoría: banqueteria | religiosas | funerarias
- Nombre: "Vela nº X" o "Velón nº X"
- Color: blanca | marfil
- Alto (cm)
- Diámetro (cm)

