// SEO: robots.txt generado por Next. Permite todo salvo el panel y las APIs.
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    sitemap: 'https://velasdevas.cl/sitemap.xml',
  };
}
