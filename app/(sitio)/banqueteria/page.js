import CatalogoCategoria from '../../../components/CatalogoCategoria';
import { CATEGORIAS } from '../../../lib/categorias';
import { buildMeta, breadcrumbLd, faqLd } from '../../../lib/seo';
import { FAQS } from '../../../lib/contenido';
import JsonLd from '../../../components/JsonLd';
import productos from '../../../data/productos.json';

const categoria = CATEGORIAS.banqueteria;

export const metadata = buildMeta({
  title: categoria.metaTitle,
  description: categoria.metaDescripcion || categoria.descripcion,
  path: '/banqueteria',
});

export default function BanqueteriaPage() {
  const items = productos.filter((p) => p.categoria === 'banqueteria');
  return (
    <>
      <JsonLd data={breadcrumbLd(categoria.nombre, '/banqueteria')} />
      <JsonLd data={faqLd(FAQS)} />
      <CatalogoCategoria categoria={categoria} productos={items} />
    </>
  );
}
