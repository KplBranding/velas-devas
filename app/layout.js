import './globals.css';
import { Playfair_Display, Lato } from 'next/font/google';
import CustomCursor from '../components/CustomCursor';
import ScrollReveal from '../components/ScrollReveal';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <CustomCursor />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
