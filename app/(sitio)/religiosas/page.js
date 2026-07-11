import CatalogoCategoria from '../../../components/CatalogoCategoria';
import { CATEGORIAS } from '../../../lib/categorias';
import productos from '../../../data/productos.json';

const categoria = CATEGORIAS.religiosas;

export const metadata = {
  title: 'Religiosas — Cirios y velones para iglesias',
  description: categoria.descripcion,
};

export default function ReligiosasPage() {
  const items = productos.filter((p) => p.categoria === 'religiosas');
  return <CatalogoCategoria categoria={categoria} productos={items} />;
}
