/** @type {import('next').NextConfig} */

// Cabeceras de seguridad para todas las rutas. No se incluye una
// Content-Security-Policy: el sitio usa scripts en línea (consentimiento, GA4,
// datos estructurados) y una CSP mal ajustada los rompería; requiere su propia
// prueba antes de activarse.
const CABECERAS_SEGURIDAD = [
  // El navegador no adivina el tipo de un archivo distinto del declarado.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Otros sitios no pueden incrustar este dentro de un marco (clickjacking).
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // A otros sitios solo se les envía el dominio de origen, no la URL completa.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // El sitio no usa cámara, micrófono ni ubicación.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: '/:path*', headers: CABECERAS_SEGURIDAD }];
  },
};

module.exports = nextConfig;
