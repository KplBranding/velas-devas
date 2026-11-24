import { SITE_URL } from '../lib/seo';

// SEO: sitemap.xml generado por Next a partir de las rutas del sitio.
// Al agregar una página pública, sumarla aquí.
//
// `modificado` es la fecha del último cambio REAL de contenido de cada página.
// Hay que actualizarla a mano al cambiar textos, productos o precios: una fecha
// que se mueve en cada publicación (como antes, con la fecha del despliegue)
// hace que los buscadores dejen de confiar en ella.
const RUTAS = [
  { path: '', priority: 1, modificado: '2026-11-17' },
  { path: '/banqueteria', priority: 0.9, modificado: '2026-11-23' },
  { path: '/religiosas', priority: 0.9, modificado: '2026-11-23' },
  { path: '/funerarias', priority: 0.9, modificado: '2026-11-23' },
  { path: '/nosotros', priority: 0.6, modificado: '2026-11-17' },
  { path: '/contacto', priority: 0.6, modificado: '2026-11-17' },
  { path: '/privacidad', priority: 0.3, modificado: '2026-11-18' },
];

export default function sitemap() {
  return RUTAS.map((r) => ({
    url: SITE_URL + r.path,
    lastModified: r.modificado,
    changeFrequency: 'monthly',
    priority: r.priority,
  }));
}
