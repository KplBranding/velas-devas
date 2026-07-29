import './globals.css';
import { Playfair_Display, Lato } from 'next/font/google';
import CustomCursor from '../components/CustomCursor';
import ScrollReveal from '../components/ScrollReveal';
import SmoothScroll from '../lib/motion/SmoothScroll';
import { EMPRESA } from '../lib/categorias';
import { CotizacionProvider } from '../context/CotizacionContext';
import CotizadorDrawer from '../components/cotizacion/CotizadorDrawer';
import WhatsAppFAB from '../components/WhatsAppFAB';

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

export const metadata = {
  metadataBase: new URL('https://velasdevas.cl'),
  title: {
    default: 'Velas Devas — Fabricación mayorista de velas · Chile',
    template: '%s · Velas Devas',
  },
  description:
    'Proveedor mayorista de velas artesanales desde el año 2000. Más de 100 formatos en blanco e marfil para banquetería, iglesias y funerarias en todo Chile.',
  keywords: [
    'velas mayoristas',
    'velas banquetería',
    'cirios iglesia',
    'velas funerarias',
    'fábrica de velas Chile',
    'Velas Devas',
  ],
  openGraph: {
    title: 'Velas Devas — Fabricación mayorista de velas',
    description:
      'Más de 100 formatos de velas en blanco e marfil para banquetería, iglesias y funerarias.',
    url: 'https://velasdevas.cl',
    siteName: 'Velas Devas',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velas Devas — Fabricación mayorista de velas',
    description:
      'Más de 100 formatos de velas para banquetería, iglesias y funerarias en todo Chile.',
  },
  robots: { index: true, follow: true },
};

// Datos estructurados (SEO): negocio local chileno. Datos desde EMPRESA (fuente
// única): al confirmar teléfono/dirección se actualizan aquí automáticamente.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: EMPRESA.nombre,
  url: 'https://velasdevas.cl',
  image: 'https://velasdevas.cl/opengraph-image',
  description:
    'Fabricante mayorista de velas para banquetería, iglesias y funerarias en Chile desde el año 2000.',
  telephone: '+' + EMPRESA.whatsapp,
  email: EMPRESA.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: EMPRESA.direccion,
    addressLocality: 'Santiago',
    addressCountry: 'CL',
  },
  areaServed: 'CL',
  sameAs: ['https://www.instagram.com/velasdevas'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CotizacionProvider>
          <SmoothScroll />
          <CustomCursor />
          <ScrollReveal />
          {children}
          <CotizadorDrawer />
          <WhatsAppFAB />
        </CotizacionProvider>
      </body>
    </html>
  );
}
