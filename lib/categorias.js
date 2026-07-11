// Metadata central de las 3 categorías del sitio
export const CATEGORIAS = {
  banqueteria: {
    slug: 'banqueteria',
    nombre: 'Banquetería',
    eyebrow: 'Para eventos',
    superindice: '01',
    descripcion:
      'Velas para matrimonios y eventos. Disponibles en todos los formatos y medidas para mesas y ambientes.',
    descripcionCorta: 'Velas para matrimonios y eventos.',
    heroBg: '#1C1C1A',
    cta: 'Ver colección',
  },
  religiosas: {
    slug: 'religiosas',
    nombre: 'Religiosas',
    eyebrow: 'Para iglesias',
    superindice: '02',
    descripcion:
      'Cirios y velones para iglesias. Fabricados con los estándares tradicionales de cada formato, en todos los tamaños.',
    descripcionCorta: 'Cirios y velones para iglesias.',
    heroBg: '#2E2A24',
    cta: 'Ver colección',
  },
  funerarias: {
    slug: 'funerarias',
    nombre: 'Funerarias',
    eyebrow: 'Para funerarias',
    superindice: '03',
    descripcion:
      'Velas específicas para funerarias. Disponibles en medidas estándar y pedidos especiales, con stock permanente.',
    descripcionCorta: 'Velas de uso profesional.',
    heroBg: '#111110',
    cta: 'Ver colección',
  },
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
  tagline: 'Proveedor mayorista de velas artesanales · Chile',
};
