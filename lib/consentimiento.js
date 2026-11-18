// Consentimiento de cookies (modo de consentimiento v2 de Google).
//
// Flujo:
//   1. CONSENT_SCRIPT corre en línea en el <body>, ANTES de que cargue gtag: fija
//      el estado por defecto según la decisión guardada (o DEFECTO si no hay).
//   2. components/AvisoCookies.js muestra el aviso si no hay decisión y llama a
//      guardarDecision() al aceptar o rechazar.
//   3. "Preferencias de cookies" (pie de página) vuelve a abrir el aviso.
//
// La decisión se guarda en localStorage (no es una cookie ni sale del navegador).

export const CLAVE = 'devas_cookies';
export const EVENTO_ABRIR = 'devas:cookies-abrir';

// Estado mientras el visitante no ha decidido. 'denied' = no se guardan cookies
// de medición ni de publicidad hasta que acepte.
const DEFECTO = 'denied';

const SENALES = ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage'];

function estado(valor) {
  const o = {};
  SENALES.forEach((s) => { o[s] = valor; });
  return o;
}

export const CONSENT_SCRIPT =
  'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}' +
  "var d=null;try{d=localStorage.getItem('" + CLAVE + "')}catch(e){}" +
  "var v=d==='aceptado'?'granted':d==='rechazado'?'denied':'" + DEFECTO + "';" +
  "gtag('consent','default'," + JSON.stringify(estado('__V__')).replace(/"__V__"/g, 'v') + ');';

export function leerDecision() {
  try {
    const d = window.localStorage.getItem(CLAVE);
    return d === 'aceptado' || d === 'rechazado' ? d : null;
  } catch (_) {
    return null;
  }
}

export function guardarDecision(decision) {
  try {
    window.localStorage.setItem(CLAVE, decision);
  } catch (_) {
    /* navegación privada: la decisión vale solo para esta visita */
  }
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', estado(decision === 'aceptado' ? 'granted' : 'denied'));
  }
}
