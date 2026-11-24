import { contarLeadsRecientes } from './supabase';

// Protección básica de los formularios públicos (contacto, descarga de PDF,
// eventos). Sin dependencias ni tablas nuevas, y sin guardar la IP en ninguna
// parte: solo vive en memoria mientras dura la instancia del servidor.

export { CAMPO_TRAMPA } from './campoTrampa';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Texto recortado a un largo máximo. Cualquier cosa que no sea texto → ''.
export function texto(v, max) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export function emailValido(v) {
  return typeof v === 'string' && v.length <= 254 && EMAIL_RE.test(v);
}

export function ipDe(request) {
  const xff = request.headers.get('x-forwarded-for') || '';
  return xff.split(',')[0].trim() || request.headers.get('x-real-ip') || 'desconocida';
}

// Límite por IP en memoria. En Vercel cada instancia tiene su propia memoria,
// así que frena ráfagas desde un mismo origen pero no es un límite exacto; el
// tope global de `superaTopeGlobal` cubre el resto.
const intentos = new Map();

export function limitePorIp(clave, max, ventanaMs) {
  const ahora = Date.now();
  const previos = (intentos.get(clave) || []).filter((t) => ahora - t < ventanaMs);
  if (previos.length >= max) {
    intentos.set(clave, previos);
    return false;
  }
  previos.push(ahora);
  intentos.set(clave, previos);
  // Evita que el mapa crezca sin fin si llegan muchas IP distintas.
  if (intentos.size > 5000) {
    for (const [k, v] of intentos) {
      if (!v.some((t) => ahora - t < ventanaMs)) intentos.delete(k);
    }
  }
  return true;
}

// Tope global: si en los últimos `minutos` ya entraron `max` leads de este
// tipo, se rechazan los siguientes. Protege la casilla del equipo y la cuota
// de correo ante un envío masivo. Si la base no responde, no bloquea.
export async function superaTopeGlobal(tipo, max, minutos) {
  const n = await contarLeadsRecientes(tipo, minutos);
  return n != null && n >= max;
}

export const respuestaLimite = () =>
  Response.json(
    { ok: false, error: 'Demasiadas solicitudes. Inténtalo en unos minutos.' },
    { status: 429, headers: { 'Retry-After': '600' } }
  );
