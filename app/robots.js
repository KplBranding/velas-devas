import { SITE_URL } from '../lib/seo';

// SEO: robots.txt generado por Next. Permite todo salvo el panel y las APIs.
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    sitemap: SITE_URL + '/sitemap.xml',
  };
}
