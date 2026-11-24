import CatalogoCategoria from '../../../components/CatalogoCategoria';
import { CATEGORIAS } from '../../../lib/categorias';
import { buildMeta, breadcrumbLd, faqLd, catalogoLd } from '../../../lib/seo';
import { FAQS } from '../../../lib/contenido';
import JsonLd from '../../../components/JsonLd';
import productos from '../../../data/productos.json';

const categoria = CATEGORIAS.funerarias;

export const metadata = buildMeta({
  title: categoria.metaTitle,
  description: categoria.metaDescripcion || categoria.descripcion,
  path: '/funerarias',
});

export default function FunerariasPage() {
  const items = productos.filter((p) => p.categoria === 'funerarias');
  return (
    <>
      <JsonLd data={breadcrumbLd(categoria.nombre, '/funerarias')} />
      <JsonLd data={faqLd(FAQS)} />
      <JsonLd data={catalogoLd(categoria, items)} />
      <CatalogoCategoria categoria={categoria} productos={items} />
    </>
  );
}
