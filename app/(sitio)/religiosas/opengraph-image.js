import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';
import { CATEGORIAS } from '../../../lib/categorias';

const categoria = CATEGORIAS.religiosas;

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = categoria.nombre + ' — Velas Devas';

export default function Image() {
  return ogImage({
    eyebrow: categoria.eyebrow,
    titulo: categoria.nombre,
    subtitulo: categoria.descripcionCorta,
  });
}
