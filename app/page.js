import HomeCategorias from '../components/HomeCategorias';
import { buildMeta } from '../lib/seo';

// Metadata propia del Home (no hereda el default del layout). OG image = la
// tarjeta de marca de app/opengraph-image.js.
export const metadata = buildMeta({
  title: 'Fábrica de velas por mayor en Chile',
  description:
    'Fabricantes mayoristas de velas desde 1992. Velas, velones y cirios en blanco y marfil para banquetería, iglesias y funerarias. Despacho a todo Chile.',
  path: '/',
});

export default function Home() {
  return <HomeCategorias />;
}
