// Contenido editable de las secciones de prueba social y FAQ.
// ⚠️ PLACEHOLDER: reemplazar por marcas, testimonios y respuestas reales de Devas.

// ── Marcas que confían (carrusel fantasma), por categoría ──
// Logos ya procesados con `npm run logos` (ver scripts/procesar-logos.py).
// Para banquetería/religiosas: dejar sus logos en public/marcas/, correr
// `npm run logos logos_banqueteria` (o logos_religiosas) y registrar aquí.
export const MARCAS = {
  funerarias: [
    { img: '/marcas/logos_funerarias/funeraria-arechavala.png', alt: 'Funeraria Arechavala' },
    { img: '/marcas/logos_funerarias/funeraria-azocar.png', alt: 'Funeraria Azócar' },
    { img: '/marcas/logos_funerarias/funeraria-brazos-de-cristo.png', alt: 'Funeraria Brazos de Cristo' },
    { img: '/marcas/logos_funerarias/funeraria-claudio-aguero.png', alt: 'Funeraria Claudio Agüero' },
    { img: '/marcas/logos_funerarias/funeraria-copelec.png', alt: 'Copelec Servicios Funerarios' },
    { img: '/marcas/logos_funerarias/funeraria-corpuschristi.png', alt: 'Funeraria Corpus Christi' },
    { img: '/marcas/logos_funerarias/funeraria-diaz-mora.png', alt: 'Funeraria Díaz y Mora' },
    { img: '/marcas/logos_funerarias/funeraria-eden.png', alt: 'Funeraria Edén' },
    { img: '/marcas/logos_funerarias/funeraria-forlivesi.png', alt: 'Forlivesi Funerales' },
    { img: '/marcas/logos_funerarias/funeraria-hogar-de-cristo.png', alt: 'Funeraria Hogar de Cristo' },
    { img: '/marcas/logos_funerarias/funeraria-maria-ayuda.png', alt: 'María Ayuda Servicios Funerarios' },
    { img: '/marcas/logos_funerarias/funeraria-rene-parra.png', alt: 'Funeraria René Parra' },
    { img: '/marcas/logos_funerarias/funeraria-san-jose.png', alt: 'Funeraria San José' },
    { img: '/marcas/logos_funerarias/funeraria-santa-fe.png', alt: 'Funeraria Santa Fé' },
  ],
  // Vacías por ahora: la sección "Confían en nosotros" se OCULTA en estos
  // rubros hasta cargar sus logos. Flujo por categoría:
  //   1) dejar logos crudos en public/marcas/origen/banqueteria/ (o religiosas/)
  //   2) correr  npm run logos banqueteria   (o religiosas)
  //   3) pegar aquí los { img, alt } de public/marcas/logos_banqueteria/
  banqueteria: [],
  religiosas: [],
};

// ── Testimonios ──
// ⚠️ PENDIENTE: son de ejemplo (provisorios). Reemplazar por citas reales de
// clientes de banquetería antes de publicar (texto, nombre y empresa verdaderos).
export const TESTIMONIOS = [
  {
    texto:
      'Hacemos pedidos grandes para matrimonios y siempre llegan a tiempo y parejos entre sí. Saber que esa parte está resuelta nos deja concentrarnos en el resto del evento.',
    nombre: 'María Fernanda Rojas',
    cargo: 'Coordinadora de eventos',
  },
  {
    texto:
      'Los cirios mantienen la calidad de siempre. Hacemos pedidos todos los meses y siempre llegan a tiempo.',
    nombre: 'Padre Antonio Herrera',
    cargo: 'Parroquia San José',
  },
  {
    texto:
      'Stock permanente y despacho rápido: justo lo que un servicio funerario necesita para no detenerse nunca.',
    nombre: 'Jorge Muñoz',
    cargo: 'Funeraria Belén',
  },
];

// ── Preguntas frecuentes (máx. 5) ──
export const FAQS = [
  {
    q: '¿Cuál es el pedido mínimo mayorista?',
    a: 'Trabajamos por volumen según formato. Escríbenos con las cantidades que necesitas y te confirmamos el mínimo y el precio mayorista para tu caso.',
  },
  {
    q: '¿Despachan a todo Chile?',
    a: 'Sí. Coordinamos despacho a Santiago y regiones. Los plazos y el costo dependen del destino y del volumen del pedido.',
  },
  {
    q: '¿Puedo pedir medidas o formatos especiales?',
    a: 'Sí. Además de las más de 100 medidas de catálogo, fabricamos formatos a pedido. Cuéntanos alto, diámetro y cantidad y lo cotizamos.',
  },
  {
    q: '¿En qué colores fabrican?',
    a: 'Todo nuestro catálogo está disponible en blanco e marfil, los dos tonos que exigen banquetería, iglesias y funerarias.',
  },
  {
    q: '¿Cuánto demora la entrega?',
    a: 'Los formatos de stock salen a los pocos días. Para pedidos a medida coordinamos un plazo de fabricación al momento de la cotización.',
  },
];
