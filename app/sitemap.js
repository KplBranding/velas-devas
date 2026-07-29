// SEO: sitemap.xml generado por Next a partir de las rutas del sitio.
export default function sitemap() {
  const base = 'https://velasdevas.cl';
  const rutas = [
    '',
    '/banqueteria',
    '/religiosas',
    '/funerarias',
    '/nosotros',
    '/contacto',
    '/privacidad',
  ];
  const now = new Date();
  return rutas.map((r) => ({
    url: base + r,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.8,
  }));
}
