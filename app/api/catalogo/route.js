import { guardarLead, guardarEvento } from '../../../lib/supabase';
import { CATEGORIAS } from '../../../lib/categorias';
import {
  CAMPO_TRAMPA,
  texto,
  emailValido,
  ipDe,
  limitePorIp,
  superaTopeGlobal,
  respuestaLimite,
} from '../../../lib/antiabuso';

// Descarga del catálogo con precios (lead-gated). Recibe { empresa, rut, email,
// categoria } tras validar el formulario en el cliente. Guarda el lead + un
// evento de actividad en Supabase (si está configurado; si no, responde ok igual
// para no romper la entrega del PDF).
export async function POST(request) {
  try {
    const body = await request.json();

    if (body?.[CAMPO_TRAMPA]) {
      return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
    }

    const empresa = texto(body.empresa, 160);
    const rut = texto(body.rut, 14);
    const email = texto(body.email, 254);
    // Solo categorías que existen en el sitio.
    const categoria = Object.hasOwn(CATEGORIAS, body.categoria) ? body.categoria : null;

    if (!empresa || !rut || !email) {
      return Response.json({ ok: false, error: 'Faltan datos.' }, { status: 400 });
    }
    // El formulario envía el RUT ya formateado (76.123.456-7).
    if (!/^[0-9.]{1,11}-[0-9kK]$/.test(rut) || !emailValido(email)) {
      return Response.json({ ok: false, error: 'Datos inválidos.' }, { status: 400 });
    }

    // 5 descargas por IP cada 10 minutos; 60 en total cada 10 minutos.
    if (!limitePorIp('catalogo:' + ipDe(request), 5, 10 * 60 * 1000)) return respuestaLimite();
    if (await superaTopeGlobal('pdf', 60, 10)) return respuestaLimite();

    await guardarLead({ tipo: 'pdf', empresa, rut, email, categoria });
    await guardarEvento('descargar_pdf', { categoria });

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }
}
