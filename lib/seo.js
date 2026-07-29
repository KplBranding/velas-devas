// Constructor de metadata SEO por página (App Router). Devuelve un objeto de
// metadata COMPLETO: título, descripción, canonical, Open Graph y Twitter Card.
// La og:image / twitter:image las aporta el opengraph-image.js de cada ruta.
export const SITE_URL = 'https://velasdevas.cl';

export function buildMeta({ title, description, path = '/', absoluteTitle = false }) {
  const url = SITE_URL + (path === '/' ? '' : path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Velas Devas',
      locale: 'es_CL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
