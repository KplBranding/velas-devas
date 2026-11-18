import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Política de privacidad — Velas Devas';

export default function Image() {
  return ogImage({
    eyebrow: 'Velas Devas',
    titulo: 'Política de privacidad y cookies',
    subtitulo: 'Cómo cuidamos tus datos',
  });
}
