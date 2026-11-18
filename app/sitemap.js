import { SITE_URL } from '../lib/seo';

// SEO: sitemap.xml generado por Next a partir de las rutas del sitio.
// Al agregar una página pública, sumarla aquí.
const RUTAS = [
  { path: '', priority: 1 },
  { path: '/banqueteria', priority: 0.9 },
  { path: '/religiosas', priority: 0.9 },
  { path: '/funerarias', priority: 0.9 },
  { path: '/nosotros', priority: 0.6 },
  { path: '/contacto', priority: 0.6 },
  { path: '/privacidad', priority: 0.3 },
];

export default function sitemap() {
  const now = new Date();
  return RUTAS.map((r) => ({
    url: SITE_URL + r.path,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r.priority,
  }));
}
