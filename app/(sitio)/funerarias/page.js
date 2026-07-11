import CatalogoCategoria from '../../../components/CatalogoCategoria';
import { CATEGORIAS } from '../../../lib/categorias';
import productos from '../../../data/productos.json';

const categoria = CATEGORIAS.funerarias;

export const metadata = {
  title: 'Funerarias — Velas de uso profesional',
  description: categoria.descripcion,
};

export default function FunerariasPage() {
  const items = productos.filter((p) => p.categoria === 'funerarias');
  return <CatalogoCategoria categoria={categoria} productos={items} />;
}
