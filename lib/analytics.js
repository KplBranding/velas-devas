// Analítica GA4. El script <GoogleAnalytics> se monta en app/layout.js, gateado
// server-side por VERCEL_ENV === 'production' (así el gtag va en el HTML solo en
// el deploy de producción). Aquí viven el ID y el helper de eventos de negocio.
//
// Los eventos (track) además se gatean por dominio (velasdevas.cl) → no ensucian
// las métricas con tráfico de local (localhost) ni de previews (*.vercel.app).
//
// Eventos instrumentados (embudo B2B):
//   add_to_pedido      → al agregar un producto (context/CotizacionContext.js)
//   enviar_pedido      → al enviar por WhatsApp/correo (CotizadorDrawer.js)
//   descargar_pdf      → al descargar el catálogo (DescargarCatalogo.js)
//   enviar_formulario  → al enviar el formulario de contacto (ContactForm.js)
import { sendGAEvent } from '@next/third-parties/google';

// ID de medición GA4. Es público (aparece en el HTML), no es secreto. Se puede
// sobreescribir por entorno con la variable NEXT_PUBLIC_GA_ID.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-4KN0J41YV1';

// Solo en el dominio real: evita registrar tráfico de desarrollo/preview.
export function analyticsHabilitado() {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.endsWith('velasdevas.cl');
}

// Envía un evento GA4. `action` = nombre del evento; `params` = propiedades.
export function track(action, params = {}) {
  if (!GA_ID || !analyticsHabilitado()) return;
  try {
    sendGAEvent('event', action, params);
  } catch (_) {
    /* silencioso: la analítica nunca debe romper la UX */
  }
}
