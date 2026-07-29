import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Nosotros — Velas Devas';

export default function Image() {
  return ogImage({
    eyebrow: 'Quiénes somos',
    titulo: 'Más de 30 años fabricando confianza',
    subtitulo: 'Fabricación nacional · Todo Chile',
  });
}
