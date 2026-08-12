import { Resend } from 'resend';

// Notificación por correo (Resend) al recibir un formulario de contacto.
// Gateado por env: sin RESEND_API_KEY + RESEND_FROM no se envía nada (el lead
// igual queda guardado en Supabase / panel).
//
// RESEND_FROM debe ser de un dominio VERIFICADO en Resend (ej. velasdevas.cl):
//   "Velas Devas <web@velasdevas.cl>"
// RESEND_TO puede sobrescribir los destinatarios (coma-separados); si no, usa
// los tres confirmados.
const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM;
const TO = (
  process.env.RESEND_TO ||
  'contacto@velasdevas.cl,silvana@velasdevas.cl,javier.garcia@velasdevas.cl'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export const emailHabilitado = Boolean(apiKey && FROM);

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export async function enviarCorreoContacto(d) {
  if (!emailHabilitado) return { ok: false, motivo: 'sin-config' };

  const filas = [
    ['Nombre', d.nombre],
    ['Empresa', d.empresa],
    ['Correo', d.email, true],
    ['Rubro', d.rubro],
    ['Teléfono', d.telefono],
  ]
    .filter(([, v]) => v)
    .map(([k, v, esCorreo]) => {
      const val = esCorreo
        ? `<a href="mailto:${esc(v)}" style="color:#485848;font-weight:600">${esc(v)}</a>`
        : `<span style="color:#1E251E;font-weight:600">${esc(v)}</span>`;
      return `<tr><td style="padding:6px 12px;color:#525E4B;font-size:13px;white-space:nowrap">${k}</td><td style="padding:6px 12px;font-size:14px">${val}</td></tr>`;
    })
    .join('');

  const mensaje = d.mensaje
    ? `<p style="margin:18px 0 0;padding:14px 16px;background:#F5F5EE;border-radius:6px;color:#2C352C;font-size:14px;line-height:1.6;white-space:pre-line">${esc(d.mensaje)}</p>`
    : '';

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || '');
  const notaResponder = emailValido
    ? `<p style="margin:16px 0 0;color:#2C352C;font-size:13px">💬 Puedes <strong>responder este correo</strong> para contestarle directamente a ${esc(d.nombre || 'la persona')} (${esc(d.email)}).</p>`
    : '';

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto">
    <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#607860;font-weight:700;margin:0 0 4px">Velas Devas · Sitio web</p>
    <h1 style="font-size:20px;color:#1E251E;margin:0 0 16px">Nueva solicitud de contacto</h1>
    <table style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #D7DBC6;border-radius:6px">${filas}</table>
    ${mensaje}
    ${notaResponder}
    <p style="margin:20px 0 0;color:#7A8471;font-size:12px">Enviado desde el formulario de velasdevas.cl · también guardado en el panel /admin.</p>
  </div>`;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: TO,
      replyTo: emailValido ? d.email : undefined,
      subject: `Nueva solicitud web — ${d.empresa || d.nombre || 'contacto'}${d.rubro ? ` (${d.rubro})` : ''}`,
      html,
    });
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
