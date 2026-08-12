import { guardarEvento } from '../../../lib/supabase';

// Registro de eventos de actividad disparados desde el cliente. Whitelist para
// evitar abuso (solo eventos de negocio conocidos). Los eventos server-side
// (descargar_pdf, enviar_formulario) se registran en sus propias rutas.
const PERMITIDOS = new Set(['enviar_pedido']);

export async function POST(request) {
  try {
    const { tipo, params } = await request.json();
    if (!PERMITIDOS.has(tipo)) {
      return Response.json({ ok: false }, { status: 400 });
    }
    await guardarEvento(tipo, params && typeof params === 'object' ? params : {});
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
