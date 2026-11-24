import crypto from 'crypto';
import { cookies } from 'next/headers';

// Auth simple del panel /admin: una sola contraseña (env ADMIN_PASSWORD).
//
// La cookie de sesión NO contiene la contraseña ni un derivado directo de ella:
// es "<vencimiento>.<firma>", donde la firma es un HMAC del vencimiento con una
// llave derivada de la contraseña mediante scrypt (lento a propósito). Así:
//   - la sesión vence sola (antes era un valor fijo, válido para siempre);
//   - quien robe una cookie no puede adivinar la contraseña probando millones
//     de combinaciones por segundo;
//   - cambiar ADMIN_PASSWORD cierra todas las sesiones abiertas.
const PASSWORD = process.env.ADMIN_PASSWORD;
export const COOKIE = 'devas_admin';
export const SESION_SEG = 60 * 60 * 24 * 7; // 7 días
export const adminHabilitado = Boolean(PASSWORD);

// Se calcula una vez por arranque del servidor (tarda unas decenas de ms).
const LLAVE = PASSWORD ? crypto.scryptSync(PASSWORD, 'devas-admin-sesion-v1', 32) : null;

const sha256 = (s) => crypto.createHash('sha256').update(s).digest();
const firmar = (vence) =>
  crypto.createHmac('sha256', LLAVE).update(String(vence)).digest('hex');

// Token de una sesión nueva, válido por SESION_SEG.
export function crearTokenSesion() {
  if (!LLAVE) return null;
  const vence = Math.floor(Date.now() / 1000) + SESION_SEG;
  return `${vence}.${firmar(vence)}`;
}

// Comparación en tiempo constante. Se comparan los hashes (mismo largo
// siempre), así tampoco se filtra el largo de la contraseña.
export function passwordValido(intento) {
  if (!PASSWORD || typeof intento !== 'string' || intento.length > 200) return false;
  return crypto.timingSafeEqual(sha256(intento), sha256(PASSWORD));
}

// ¿La request actual tiene sesión de admin válida? (server-side)
export function sesionAdminValida() {
  if (!LLAVE) return false;
  const valor = cookies().get(COOKIE)?.value || '';
  const [venceTxt, firma] = valor.split('.');
  const vence = Number(venceTxt);
  if (!firma || !Number.isInteger(vence) || vence < Date.now() / 1000) return false;
  const esperada = Buffer.from(firmar(vence));
  const recibida = Buffer.from(firma);
  return esperada.length === recibida.length && crypto.timingSafeEqual(esperada, recibida);
}
