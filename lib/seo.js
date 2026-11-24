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

// Tipo de página (JSON-LD AboutPage / ContactPage) enlazado al sitio y a la
// organización declarados en app/layout.js.
export function paginaLd(tipo, { nombre, descripcion, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': tipo,
    '@id': SITE_URL + path + '#pagina',
    url: SITE_URL + path,
    name: nombre,
    description: descripcion,
    inLanguage: 'es-CL',
    isPartOf: { '@id': SITE_URL + '/#sitio' },
    about: { '@id': SITE_URL + '/#organizacion' },
  };
}

// Catálogo de una categoría (JSON-LD ItemList de Product con sus precios).
// Sale de data/productos.json, la misma fuente que muestra la página, así que
// nunca publica algo distinto de lo visible. Los precios son netos mayoristas:
// se declaran con `valueAddedTaxIncluded: false`. No se informa disponibilidad
// por medida porque el sitio no la publica.
export function catalogoLd(categoria, productos) {
  const url = SITE_URL + '/' + categoria.slug;
  // Página y vendedor: van una vez por producto (no en cada medida, para no
  // inflar el HTML con el mismo dato repetido decenas de veces).
  const origen = { url, seller: { '@id': SITE_URL + '/#organizacion' } };
  const oferta = (precio, sku, nombre) => ({
    '@type': 'Offer',
    ...(nombre ? { name: nombre } : {}),
    ...(sku ? { sku } : {}),
    price: precio,
    priceCurrency: 'CLP',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: precio,
      priceCurrency: 'CLP',
      valueAddedTaxIncluded: false,
    },
  });

  const items = productos.map((p) => {
    const diam = p.diametro_cm ? String(p.diametro_cm).replace('.', ',') : null;
    // Variantes con precio. `alto` puede ser un número ("15"), una medida
    // completa ("8 × 8") o un nombre ("Clásica").
    const variantes = (p.alturas || [])
      .filter((a) => a.neto != null)
      .map((a) => {
        const esNumero = /^[0-9]+(,[0-9]+)?$/.test(a.alto);
        const medida = esNumero && diam ? `Ø ${diam} × ${a.alto} cm` : a.alto;
        return oferta(a.neto, a.sku, medida);
      });

    let offers;
    if (variantes.length > 1) {
      const precios = variantes.map((v) => v.price);
      offers = {
        '@type': 'AggregateOffer',
        priceCurrency: 'CLP',
        lowPrice: Math.min(...precios),
        highPrice: Math.max(...precios),
        offerCount: variantes.length,
        ...origen,
        offers: variantes,
      };
    } else if (variantes.length === 1) {
      offers = { ...variantes[0], ...origen };
    } else if (p.neto != null) {
      offers = { ...oferta(p.neto, p.sku), ...origen };
    }

    return {
      '@type': 'Product',
      name: p.nombre,
      category: categoria.nombre,
      brand: { '@type': 'Brand', name: SITE_NAME },
      ...(p.imagenes?.length ? { image: p.imagenes.map((i) => SITE_URL + i) } : {}),
      ...(offers ? { offers } : {}),
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: categoria.h1 || categoria.nombre,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item,
    })),
  };
}

// Serializa JSON-LD para incrustarlo en <script>: escapa "<" para que ningún
// texto pueda cerrar la etiqueta.
export function ldJson(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}
