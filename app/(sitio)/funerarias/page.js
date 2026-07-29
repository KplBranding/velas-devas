import CatalogoCategoria from '../../../components/CatalogoCategoria';
import { CATEGORIAS } from '../../../lib/categorias';
import { buildMeta } from '../../../lib/seo';
import productos from '../../../data/productos.json';

const categoria = CATEGORIAS.funerarias;

export const metadata = buildMeta({
  title: 'Funerarias — Velas que acompañan cada ceremonia',
  description: categoria.descripcion,
  path: '/funerarias',
});

export default function FunerariasPage() {
  const items = productos.filter((p) => p.categoria === 'funerarias');
  return <CatalogoCategoria categoria={categoria} productos={items} />;
}
