import { ImageResponse } from 'next/og';

// Generador de imágenes OpenGraph/Twitter (tarjeta de marca) reutilizable por
// cada ruta. Texto específico por página → og:image propio para redes.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export function ogImage({ eyebrow = 'Velas Devas', titulo, subtitulo }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#283028',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 80,
          color: '#F5F5EE',
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#C8D0A8',
          }}
        >
          {eyebrow}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 22, lineHeight: 1.1 }}>
          {titulo}
        </div>
        {subtitulo ? (
          <div style={{ fontSize: 32, marginTop: 26, color: '#EDEFE6' }}>
            {subtitulo}
          </div>
        ) : null}
      </div>
    ),
    { ...OG_SIZE }
  );
}
