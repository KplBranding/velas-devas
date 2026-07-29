import CatalogoCategoria from '../../../components/CatalogoCategoria';
import { CATEGORIAS } from '../../../lib/categorias';
import { buildMeta } from '../../../lib/seo';
import productos from '../../../data/productos.json';

const categoria = CATEGORIAS.banqueteria;

export const metadata = buildMeta({
  title: 'Banquetería — Velas para matrimonios y eventos',
  description: categoria.descripcion,
  path: '/banqueteria',
});

export default function BanqueteriaPage() {
  const items = productos.filter((p) => p.categoria === 'banqueteria');
  return <CatalogoCategoria categoria={categoria} productos={items} />;
}
