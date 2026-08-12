import { guardarLead, guardarEvento } from '../../../lib/supabase';
import { enviarCorreoContacto } from '../../../lib/email';

// Formulario de contacto. Guarda el lead (antes se perdía: solo abría mailto),
// registra un evento y notifica por correo al equipo. Responde ok si al menos se
// pudo procesar; el correo o la base pueden estar sin configurar sin romper la UX.
export async function POST(request) {
  try {
    const { nombre, empresa, email, rubro, telefono, mensaje } = await request.json();

    if (!nombre) {
      return Response.json({ ok: false, error: 'Falta el nombre.' }, { status: 400 });
    }

    const datos = { nombre, empresa, email, rubro, telefono, mensaje };
    await guardarLead({ tipo: 'contacto', ...datos });
    await guardarEvento('enviar_formulario', { rubro });
    await enviarCorreoContacto(datos);

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }
}
