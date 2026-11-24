import { CATEGORIAS, EMPRESA } from '../../lib/categorias';
import { FAQS } from '../../lib/contenido';
import { SITE_URL } from '../../lib/seo';
import { clp } from '../../lib/utils';
import productos from '../../data/productos.json';

// /llms.txt: índice del sitio en Markdown para asistentes de IA.
// Es una propuesta de la comunidad (llmstxt.org), NO un estándar, y ningún
// buscador garantiza leerla: es un complemento barato, no un requisito.
// Todo sale de las mismas fuentes que las páginas (categorías, productos,
// preguntas frecuentes), así que no puede decir algo distinto del sitio.
export const dynamic = 'force-static';

// Precios netos de un producto (todas sus medidas con valor publicado).
function precios(p) {
  const lista = (p.alturas || []).filter((a) => a.neto != null).map((a) => a.neto);
  if (!lista.length && p.neto != null) lista.push(p.neto);
  return lista;
}

function rango(lista) {
  const min = Math.min(...lista);
  const max = Math.max(...lista);
  return min === max ? clp(min) : `${clp(min)} a ${clp(max)}`;
}

function seccionCategoria(cat) {
  const items = productos.filter((p) => p.categoria === cat.slug);
  const lineas = items.map((p) => {
    const lista = precios(p);
    const medidas = (p.alturas || []).length || 1;
    const detalle = lista.length
      ? `${medidas} ${medidas === 1 ? 'variante' : 'variantes'}, ${rango(lista)} c/u neto`
      : 'precio a consultar';
    return `- ${p.nombre}: ${detalle}`;
  });
  return [
    `### ${cat.nombre}`,
    '',
    cat.descripcion,
    '',
    `Página: ${SITE_URL}/${cat.slug}`,
    '',
    ...lineas,
  ].join('\n');
}

export function GET() {
  const cats = Object.values(CATEGORIAS);
  const cuerpo = [
    `# ${EMPRESA.nombre}`,
    '',
    `> Fábrica chilena de velas, velones y cirios que vende solo por mayor a banqueterías, iglesias y funerarias. Fabricación propia en Santiago desde ${EMPRESA.desde} y despacho a todo Chile.`,
    '',
    '## Datos de la empresa',
    '',
    `- Dirección: ${EMPRESA.direccion}, Chile`,
    `- Teléfono: ${EMPRESA.telefonoLink}`,
    `- WhatsApp de ventas: +${EMPRESA.whatsapp}`,
    `- Correo: ${EMPRESA.email}`,
    `- Horario de atención: ${EMPRESA.horario.texto}`,
    '- Venta: únicamente pedidos mayoristas; no hay venta al detalle ni pago en línea. Los pedidos se arman en el sitio y se envían como solicitud de cotización.',
    '- Colores de la cera: blanco nieve y marfil; la línea religiosa suma el amarillo pascual, un tono más dorado. Los diseños a color son impresiones o adhesivos sobre la vela.',
    '',
    '## Páginas',
    '',
    ...cats.map((c) => `- [${c.h1 || c.nombre}](${SITE_URL}/${c.slug}): ${c.metaDescripcion || c.descripcion}`),
    `- [Nosotros](${SITE_URL}/nosotros): historia y forma de trabajo de la fábrica.`,
    `- [Contacto](${SITE_URL}/contacto): formulario de cotización, teléfono, dirección y horario.`,
    `- [Política de privacidad y cookies](${SITE_URL}/privacidad)`,
    '',
    '## Catálogo y precios',
    '',
    'Precios unitarios netos en pesos chilenos (CLP), sin IVA, según el catálogo publicado. El detalle por medida y SKU está en cada página de categoría.',
    '',
    cats.map(seccionCategoria).join('\n\n'),
    '',
    '## Preguntas frecuentes',
    '',
    ...FAQS.map((f) => `**${f.q}**\n${f.a}\n`),
  ].join('\n');

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
