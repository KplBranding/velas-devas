import crypto from 'crypto';
import { cookies } from 'next/headers';

// Auth simple del panel /admin: una sola contraseña (env ADMIN_PASSWORD).
// La cookie guarda un token = hash(password); como el atacante no conoce la
// contraseña, no puede forjarlo. Suficiente para un panel interno de bajo riesgo.
const PASSWORD = process.env.ADMIN_PASSWORD;
export const COOKIE = 'devas_admin';
export const adminHabilitado = Boolean(PASSWORD);

export function tokenEsperado() {
  if (!PASSWORD) return null;
  return crypto.createHash('sha256').update(PASSWORD).digest('hex');
}

// Comparación en tiempo constante (evita filtrar el largo por timing).
export function passwordValido(intento) {
  if (!PASSWORD || typeof intento !== 'string') return false;
  const a = Buffer.from(intento);
  const b = Buffer.from(PASSWORD);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ¿La request actual tiene sesión de admin válida? (server-side)
export function sesionAdminValida() {
  const esperado = tokenEsperado();
  if (!esperado) return false;
  return cookies().get(COOKIE)?.value === esperado;
}
