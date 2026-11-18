// Constructor de metadata SEO por página (App Router). Devuelve un objeto de
// metadata COMPLETO: título, descripción, canonical, Open Graph y Twitter Card.
// La og:image / twitter:image las aporta el opengraph-image.js de cada ruta.
// Dominio definitivo: con www (el dominio sin www redirige aquí).
export const SITE_URL = 'https://www.velasdevas.cl';
export const SITE_NAME = 'Velas Devas';

// title: va SIN la marca; aquí se le agrega " | Velas Devas" (máx. 60 en total).
export function buildMeta({ title, description, path = '/' }) {
  const url = SITE_URL + (path === '/' ? '' : path);
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'es_CL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}

// Migas de pan (JSON-LD BreadcrumbList) para páginas interiores.
export function breadcrumbLd(nombre, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: nombre, item: SITE_URL + path },
    ],
  };
}

// Preguntas frecuentes (JSON-LD FAQPage). Debe recibir EXACTAMENTE las mismas
// preguntas y respuestas que se muestran en pantalla (lib/contenido.js → FAQS).
export function faqLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// Serializa JSON-LD para incrustarlo en <script>: escapa "<" para que ningún
// texto pueda cerrar la etiqueta.
export function ldJson(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}
