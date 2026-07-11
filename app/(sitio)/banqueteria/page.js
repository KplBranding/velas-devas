import CatalogoCategoria from '../../../components/CatalogoCategoria';
import { CATEGORIAS } from '../../../lib/categorias';
import productos from '../../../data/productos.json';

const categoria = CATEGORIAS.banqueteria;

export const metadata = {
  title: 'Banquetería — Velas para matrimonios y eventos',
  description: categoria.descripcion,
};

export default function BanqueteriaPage() {
  const items = productos.filter((p) => p.categoria === 'banqueteria');
  return <CatalogoCategoria categoria={categoria} productos={items} />;
}
