import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Velas Devas — Fabricación mayorista de velas · Chile';

export default function Image() {
  return ogImage({
    eyebrow: 'Velas Devas',
    titulo: 'Fabricación mayorista de velas',
    subtitulo: 'Banquetería · Iglesias · Funerarias · Todo Chile',
  });
}
