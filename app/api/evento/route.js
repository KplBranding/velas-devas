import { guardarEvento } from '../../../lib/supabase';
import { texto, ipDe, limitePorIp } from '../../../lib/antiabuso';

// Registro de eventos de actividad disparados desde el cliente. Whitelist para
// evitar abuso (solo eventos de negocio conocidos). Los eventos server-side
// (descargar_pdf, enviar_formulario) se registran en sus propias rutas.
const PERMITIDOS = new Set(['enviar_pedido']);

const numero = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

export async function POST(request) {
  try {
    const { tipo, params } = await request.json();
    if (!PERMITIDOS.has(tipo)) {
      return Response.json({ ok: false }, { status: 400 });
    }
    // 20 eventos por IP cada 10 minutos.
    if (!limitePorIp('evento:' + ipDe(request), 20, 10 * 60 * 1000)) {
      return Response.json({ ok: false }, { status: 429 });
    }
    // Solo se guardan los campos que envía el sitio (CotizadorDrawer), acotados:
    // así nadie puede llenar la tabla con datos arbitrarios.
    const p = params && typeof params === 'object' ? params : {};
    await guardarEvento(tipo, {
      metodo: texto(p.metodo, 20),
      items: numero(p.items),
      value: numero(p.value),
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
