import './globals.css';
import { Playfair_Display, Lato } from 'next/font/google';
import SiteChrome from '../components/SiteChrome';
import ClickTracker from '../components/ClickTracker';
import ScrollReveal from '../components/ScrollReveal';
import SmoothScroll from '../lib/motion/SmoothScroll';
import { EMPRESA } from '../lib/categorias';
import { CotizacionProvider } from '../context/CotizacionContext';
import CotizadorDrawer from '../components/cotizacion/CotizadorDrawer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GA_ID } from '../lib/analytics';
import { SITE_URL } from '../lib/seo';
import JsonLd from '../components/JsonLd';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
  variable: '--font-sans',
});

// viewport-fit=cover expone env(safe-area-inset-*) en iOS (notch / barra de
// gestos). Sin esto, todo el código de safe-area del sitio resuelve a 0.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#283028',
};

const DESCRIPCION =
  'Fabricantes mayoristas de velas desde 1992. Velas, velones y cirios en blanco y marfil para banquetería, iglesias y funerarias. Despacho a todo Chile.';

// Metadata por defecto. Cada página define la suya con buildMeta (lib/seo.js).
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Fábrica de velas por mayor en Chile | Velas Devas',
  description: DESCRIPCION,
  openGraph: {
    title: 'Fábrica de velas por mayor en Chile | Velas Devas',
    description: DESCRIPCION,
    url: SITE_URL,
    siteName: 'Velas Devas',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fábrica de velas por mayor en Chile | Velas Devas',
    description: DESCRIPCION,
  },
  robots: { index: true, follow: true },
};

// Datos estructurados (SEO) en un solo @graph: organización, negocio local y
// sitio. Datos desde EMPRESA (fuente única): al cambiar teléfono o dirección se
// actualizan aquí automáticamente.
const ORG_ID = SITE_URL + '/#organizacion';
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: EMPRESA.nombre,
      url: SITE_URL,
      logo: SITE_URL + '/logos/devas-verde.png',
      email: EMPRESA.email,
      telephone: EMPRESA.telefonoLink,
      foundingDate: String(EMPRESA.desde),
      areaServed: 'CL',
      sameAs: ['https://www.instagram.com/velasdevas'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: '+' + EMPRESA.whatsapp,
        email: EMPRESA.email,
        areaServed: 'CL',
        availableLanguage: 'es',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': SITE_URL + '/#negocio',
      name: EMPRESA.nombre,
      url: SITE_URL,
      image: SITE_URL + '/opengraph-image',
      description:
        'Fabricante mayorista de velas para banquetería, iglesias y funerarias en Chile desde 1992.',
      telephone: EMPRESA.telefonoLink,
      email: EMPRESA.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: EMPRESA.direccion.replace(/, Santiago$/, ''),
        addressLocality: 'Santiago',
        addressRegion: 'Región Metropolitana',
        addressCountry: 'CL',
      },
      areaServed: 'CL',
      parentOrganization: { '@id': ORG_ID },
    },
    {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#sitio',
      url: SITE_URL,
      name: EMPRESA.nombre,
      inLanguage: 'es-CL',
      publisher: { '@id': ORG_ID },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <JsonLd data={jsonLd} />
        <CotizacionProvider>
          <SmoothScroll />
          <ScrollReveal />
          {children}
          <CotizadorDrawer />
          <SiteChrome />
          <ClickTracker />
        </CotizacionProvider>
        {/* GA4: se renderiza (server-side) SOLO en el deploy de producción de
           Vercel → el gtag va en el HTML (detección rápida) y local/preview no
           ensucian los datos. Los eventos (track) además se gatean por dominio. */}
        {process.env.VERCEL_ENV === 'production' && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
