import HomeCategorias from '../components/HomeCategorias';
import { buildMeta } from '../lib/seo';

// Metadata propia del Home (no hereda el default del layout). OG image = la
// tarjeta de marca de app/opengraph-image.js.
export const metadata = buildMeta({
  title: 'Velas Devas — Fabricación mayorista de velas · Chile',
  description:
    'Fabricante mayorista de velas desde el año 2000. Más de 100 formatos en Blanco Nieve y Marfil para banquetería, iglesias y funerarias, con despacho a todo Chile.',
  path: '/',
  absoluteTitle: true,
});

export default function Home() {
  return <HomeCategorias />;
}
