// Endpoint de descarga del catálogo con precios (lead-gated).
// Recibe { empresa, rut, email } tras validar el formulario en el cliente.
//
// TODO (cuando el cliente defina el PDF): enviar el catálogo al correo
// (data.email) con el proveedor de email que se elija, y/o guardar el lead
// (empresa, rut, email, fecha) en una hoja/CRM. Por ahora deja registro en el
// log del servidor y responde ok — la funcionalidad de captura ya queda armada.
export async function POST(request) {
  try {
    const { empresa, rut, email, categoria } = await request.json();

    if (!empresa || !rut || !email) {
      return Response.json(
        { ok: false, error: 'Faltan datos.' },
        { status: 400 }
      );
    }

    // eslint-disable-next-line no-console
    console.log('[catalogo] solicitud de PDF:', { empresa, rut, email, categoria });

    // Aquí irá: enviar el PDF por correo + registrar el lead.
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }
}
