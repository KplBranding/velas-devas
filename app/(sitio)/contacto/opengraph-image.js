import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Contacto — Velas Devas';

export default function Image() {
  return ogImage({
    eyebrow: 'Cotizaciones mayoristas',
    titulo: 'Hablemos de tu proyecto',
    subtitulo: 'Cotización a medida · Despacho a todo Chile',
  });
}
