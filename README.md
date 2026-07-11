# Velas Devas

Catálogo mayorista B2B de velas — Next.js 14 (App Router) + Tailwind CSS.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build de producción

```bash
npm run build
npm run start
```

## Estructura

```
app/
  layout.js              → layout raíz (fuentes + metadata)
  page.js                → página de entrada (split screen 3 paneles)
  (sitio)/
    layout.js            → navbar + footer compartidos
    banqueteria/         → catálogo banquetería
    religiosas/          → catálogo religiosas
    funerarias/          → catálogo funerarias
    nosotros/            → quiénes somos
    contacto/            → formulario de cotización
components/              → Navbar, Footer, ProductCard, VelaSVG, CatalogoCategoria, ContactForm
data/productos.json     → catálogo de productos (18 formatos, 3 categorías)
lib/categorias.js       → metadata de categorías y datos de empresa
```

## Diseño

Paleta, tipografía y componentes definidos en `app/globals.css` y `tailwind.config.js`.
Fuentes: Playfair Display (títulos) + Lato (UI/cuerpo), cargadas con `next/font`.

## Contenido

- Productos: editar `data/productos.json`.
- Datos de empresa (dirección, teléfono): `lib/categorias.js` → `EMPRESA`.
- El formulario de contacto abre el cliente de correo (`mailto:`). Para envío real,
  conectar un endpoint/servicio (p. ej. Formspree, Resend) en `components/ContactForm.js`.

## Deploy

Preparado para Vercel. Dominio objetivo: velasdevas.cl
