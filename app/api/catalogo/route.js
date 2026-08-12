import { guardarLead, guardarEvento } from '../../../lib/supabase';

// Descarga del catálogo con precios (lead-gated). Recibe { empresa, rut, email,
// categoria } tras validar el formulario en el cliente. Guarda el lead + un
// evento de actividad en Supabase (si está configurado; si no, responde ok igual
// para no romper la entrega del PDF).
export async function POST(request) {
  try {
    const { empresa, rut, email, categoria } = await request.json();

    if (!empresa || !rut || !email) {
      return Response.json({ ok: false, error: 'Faltan datos.' }, { status: 400 });
    }

    await guardarLead({ tipo: 'pdf', empresa, rut, email, categoria });
    await guardarEvento('descargar_pdf', { categoria });

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }
}
