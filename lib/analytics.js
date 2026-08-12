// Analítica GA4. TODO está gateado por `NEXT_PUBLIC_GA_ID`: sin esa variable de
// entorno no se carga GA ni se envía nada (seguro en local/preview). El montaje
// del script vive en app/layout.js; aquí solo el helper de eventos de negocio.
//
// Eventos instrumentados (embudo B2B):
//   add_to_pedido      → al agregar un producto (context/CotizacionContext.js)
//   enviar_pedido      → al enviar por WhatsApp/correo (CotizadorDrawer.js)
//   descargar_pdf      → al descargar el catálogo (DescargarCatalogo.js)
//   enviar_formulario  → al enviar el formulario de contacto (ContactForm.js)
import { sendGAEvent } from '@next/third-parties/google';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Envía un evento GA4. `action` = nombre del evento; `params` = propiedades.
export function track(action, params = {}) {
  if (!GA_ID || typeof window === 'undefined') return;
  try {
    sendGAEvent('event', action, params);
  } catch (_) {
    /* silencioso: la analítica nunca debe romper la UX */
  }
}
