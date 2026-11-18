'use client';

import { useEffect } from 'react';
import { track } from '../lib/analytics';

// Medición de clics de contacto (GA4), con un único listener delegado: cubre
// todos los enlaces del sitio sin tocar cada componente.
//   click_whatsapp  → enlaces a wa.me (botón flotante, home, contacto)
//   click_phone     → enlaces tel:
//   click_email     → enlaces mailto:
//   click_social    → enlaces a Instagram
//   select_content  → enlaces internos a /contacto (botones "Solicitar cotización")
// No registra nada en /admin. No guarda datos personales: solo la página de
// origen y el texto visible del enlace.
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const pagina = window.location.pathname;
      if (pagina.startsWith('/admin')) return;
      const href = a.getAttribute('href') || '';
      const texto = (a.getAttribute('aria-label') || a.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 60);
      const base = { pagina, texto };
      if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) {
        track('click_whatsapp', base);
      } else if (href.startsWith('tel:')) {
        track('click_phone', base);
      } else if (href.startsWith('mailto:')) {
        track('click_email', base);
      } else if (href.includes('instagram.com')) {
        track('click_social', { ...base, red: 'instagram' });
      } else if (href === '/contacto' || href.startsWith('/contacto?') || href.startsWith('/contacto#')) {
        // zona distingue el enlace del menú o del pie del botón dentro de la página.
        const zona = a.closest('nav, header, footer') ? 'menu' : 'boton';
        track('select_content', { ...base, content_type: 'cta_cotizar', zona });
      }
    };
    document.addEventListener('click', onClick, { capture: true, passive: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
