import { createClient } from '@supabase/supabase-js';

// Cliente Supabase SERVER-SIDE (service_role → bypasea RLS). Nunca exponer al
// cliente. Todo gateado por env: sin SUPABASE_URL/KEY, las funciones no rompen la
// UX (devuelven { ok:false, motivo:'sin-config' }).
// Normaliza la URL: sin barra final ni sufijo /rest/v1 (una barra de más produce
// "//rest/v1" → error "Invalid path specified in request URL").
const url = (process.env.SUPABASE_URL || '')
  .trim()
  .replace(/\/+$/, '')
  .replace(/\/rest\/v1$/, '');
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseHabilitado = Boolean(url && serviceKey);

export function getSupabase() {
  if (!supabaseHabilitado) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Inserta un lead (tipo 'pdf' | 'contacto'). La captura nunca debe romper la UX.
export async function guardarLead(lead) {
  const sb = getSupabase();
  if (!sb) return { ok: false, motivo: 'sin-config' };
  const { error } = await sb.from('leads').insert(lead);
  return error ? { ok: false, error: error.message } : { ok: true };
}

// Cuántos leads de un tipo entraron en los últimos N minutos (para el tope
// anti-abuso de los formularios). Devuelve null si no se puede saber.
export async function contarLeadsRecientes(tipo, minutos) {
  const sb = getSupabase();
  if (!sb) return null;
  const desde = new Date(Date.now() - minutos * 60 * 1000).toISOString();
  const { count, error } = await sb
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('tipo', tipo)
    .gte('created_at', desde);
  return error ? null : count;
}

// Cuántos eventos de un tipo hubo en los últimos N minutos (p. ej. intentos
// fallidos de acceso al panel). Devuelve null si no se puede saber.
export async function contarEventosRecientes(tipo, minutos) {
  const sb = getSupabase();
  if (!sb) return null;
  const desde = new Date(Date.now() - minutos * 60 * 1000).toISOString();
  const { count, error } = await sb
    .from('eventos')
    .select('id', { count: 'exact', head: true })
    .eq('tipo', tipo)
    .gte('created_at', desde);
  return error ? null : count;
}

// Registra un evento de actividad (enviar_pedido, descargar_pdf, enviar_formulario).
export async function guardarEvento(tipo, params = {}) {
  const sb = getSupabase();
  if (!sb) return { ok: false, motivo: 'sin-config' };
  const { error } = await sb.from('eventos').insert({ tipo, params });
  return error ? { ok: false, error: error.message } : { ok: true };
}
