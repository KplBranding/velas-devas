import { guardarLead, guardarEvento } from '../../../lib/supabase';

// Formulario de contacto. Guarda el lead (antes se perdía: solo abría mailto) +
// un evento de actividad. Responde ok siempre para no romper la UX del cliente.
export async function POST(request) {
  try {
    const { nombre, empresa, rubro, telefono, mensaje } = await request.json();

    if (!nombre) {
      return Response.json({ ok: false, error: 'Falta el nombre.' }, { status: 400 });
    }

    await guardarLead({
      tipo: 'contacto',
      nombre,
      empresa,
      rubro,
      telefono,
      mensaje,
    });
    await guardarEvento('enviar_formulario', { rubro });

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }
}
