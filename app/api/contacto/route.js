import { guardarLead, guardarEvento } from '../../../lib/supabase';
import { enviarCorreoContacto } from '../../../lib/email';
import {
  CAMPO_TRAMPA,
  texto,
  emailValido,
  ipDe,
  limitePorIp,
  superaTopeGlobal,
  respuestaLimite,
} from '../../../lib/antiabuso';

const RUBROS = ['Banquetería', 'Religiosas', 'Funerarias', 'Otro'];

// Formulario de contacto. Guarda el lead (antes se perdía: solo abría mailto),
// registra un evento y notifica por correo al equipo. Responde ok si al menos se
// pudo procesar; el correo o la base pueden estar sin configurar sin romper la UX.
export async function POST(request) {
  try {
    const body = await request.json();

    // Campo trampa relleno → es un bot. Responde error (no ok) para que, si
    // alguna vez lo rellena un navegador real, la persona vea el aviso con el
    // correo alternativo en vez de creer que su mensaje llegó.
    if (body?.[CAMPO_TRAMPA]) {
      return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
    }

    // Mismos campos obligatorios que el formulario: nombre, correo y mensaje.
    const datos = {
      nombre: texto(body.nombre, 120),
      empresa: texto(body.empresa, 160),
      email: texto(body.email, 254),
      rubro: RUBROS.includes(body.rubro) ? body.rubro : 'Otro',
      telefono: texto(body.telefono, 40),
      mensaje: texto(body.mensaje, 4000),
    };
    if (!datos.nombre) {
      return Response.json({ ok: false, error: 'Falta el nombre.' }, { status: 400 });
    }
    if (!emailValido(datos.email)) {
      return Response.json({ ok: false, error: 'Correo inválido.' }, { status: 400 });
    }
    if (!datos.mensaje) {
      return Response.json({ ok: false, error: 'Falta el mensaje.' }, { status: 400 });
    }

    // 5 envíos por IP cada 10 minutos; 30 en total cada 10 minutos.
    if (!limitePorIp('contacto:' + ipDe(request), 5, 10 * 60 * 1000)) return respuestaLimite();
    if (await superaTopeGlobal('contacto', 30, 10)) return respuestaLimite();

    await guardarLead({ tipo: 'contacto', ...datos });
    await guardarEvento('enviar_formulario', { rubro: datos.rubro });
    await enviarCorreoContacto(datos);

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }
}
