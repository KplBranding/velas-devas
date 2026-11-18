import CatalogoCategoria from '../../../components/CatalogoCategoria';
import { CATEGORIAS } from '../../../lib/categorias';
import { buildMeta, breadcrumbLd, faqLd } from '../../../lib/seo';
import { FAQS } from '../../../lib/contenido';
import JsonLd from '../../../components/JsonLd';
import productos from '../../../data/productos.json';

const categoria = CATEGORIAS.religiosas;

export const metadata = buildMeta({
  title: categoria.metaTitle,
  description: categoria.metaDescripcion || categoria.descripcion,
  path: '/religiosas',
});

export default function ReligiosasPage() {
  const items = productos.filter((p) => p.categoria === 'religiosas');
  return (
    <>
      <JsonLd data={breadcrumbLd(categoria.nombre, '/religiosas')} />
      <JsonLd data={faqLd(FAQS)} />
      <CatalogoCategoria categoria={categoria} productos={items} />
    </>
  );
}
