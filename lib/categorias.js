// Metadata central de las 3 categorías del sitio
export const CATEGORIAS = {
  banqueteria: {
    slug: 'banqueteria',
    nombre: 'Banquetería',
    eyebrow: 'Matrimonios y eventos',
    superindice: '01',
    descripcion:
      'Velas para banquetería, matrimonios y producción de eventos. Más de 30 medidas en blanco e marfil, con stock permanente para pedidos por volumen y despacho a todo Chile.',
    descripcionCorta: 'Velas para matrimonios y eventos.',
    heroBg: '#283028',
    imagen: '/images/categorias/banqueteria-hero.jpg',
    imagenPanel: '/images/categorias/banqueteria-panel.jpg',
    cta: 'Ver colección',
  },
  religiosas: {
    slug: 'religiosas',
    nombre: 'Religiosas',
    eyebrow: 'Parroquias e iglesias',
    superindice: '02',
    descripcion:
      'Cirios y velones de fabricación propia para parroquias, capillas y casas religiosas. Formatos tradicionales disponibles todo el año, más pedidos especiales a medida.',
    descripcionCorta: 'Cirios y velones para iglesias.',
    heroBg: '#323C32',
    imagen: '/images/categorias/religiosas.jpg',
    imagenPanel: '/images/categorias/religiosas.jpg',
    // Encuadre hacia arriba: incluye la cruz y las llamas de los cirios
    heroPos: '50% 12%',
    panelPos: '60% 30%',
    cta: 'Ver colección',
  },
  funerarias: {
    slug: 'funerarias',
    nombre: 'Funerarias',
    eyebrow: 'Servicios funerarios',
    superindice: '03',
    descripcion:
      'Velas y velones para funerarias y salas velatorias. Stock permanente, precios mayoristas y despacho a todo Chile, con formatos especiales a pedido.',
    descripcionCorta: 'Velas de uso profesional.',
    heroBg: '#1F261F',
    imagen: '/images/categorias/funerarias.jpg',
    imagenPanel: '/images/categorias/funerarias.jpg',
    // Encuadre para mostrar los velones encendidos y la rosa blanca
    heroPos: '50% 32%',
    panelPos: '55% 42%',
    cta: 'Ver colección',
  },
};

// Rutas de imágenes reutilizables (fotos reales de Devas).
// Estructura: /images/categorias/ (portadas) · /images/editorial/ (nosotros, contacto, CTA)
export const IMAGENES = {
  velaOscura: '/images/editorial/vela-oscura.jpg', // poster del video en Nosotros
  religiosas: '/images/categorias/religiosas.jpg', // fondo CTA Nosotros
  llama: '/images/editorial/llama.jpg', // detalle llama (CTA catálogo)
  banqueteria: '/images/categorias/banqueteria-hero.jpg', // hero Nosotros
  bodasRosas: '/images/editorial/bodas-rosas.jpg', // contacto + imagen lateral Nosotros
};

export const CATEGORIAS_LISTA = Object.values(CATEGORIAS);

export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/banqueteria', label: 'Banquetería' },
  { href: '/religiosas', label: 'Religiosas' },
  { href: '/funerarias', label: 'Funerarias' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export const EMPRESA = {
  nombre: 'Velas Devas',
  desde: 2000,
  direccion: 'Av. Santa Rosa N° 6435, Bodega 11, Santiago',
  telefono: '(2) 2526 3491',
  telefonoLink: '+56225263491',
  web: 'velasdevas.cl',
  tagline:
    'Fabricantes de velas para banquetería, iglesias y funerarias. Mayorista en todo Chile desde el año 2000.',
};
