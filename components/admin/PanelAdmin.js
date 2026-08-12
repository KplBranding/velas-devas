import { clp } from '../../lib/utils';
import LogoutButton from './LogoutButton';

const fmtFecha = (iso) =>
  new Date(iso).toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

const TIPO_LABEL = {
  enviar_pedido: 'Pedido enviado',
  descargar_pdf: 'Descarga PDF',
  enviar_formulario: 'Formulario',
};

function detalleEvento(ev) {
  const p = ev.params || {};
  if (ev.tipo === 'enviar_pedido') {
    return [
      p.metodo === 'whatsapp' ? 'WhatsApp' : p.metodo === 'correo' ? 'Correo' : p.metodo,
      p.items != null ? `${p.items} ítems` : null,
      p.value ? clp(p.value) : null,
    ]
      .filter(Boolean)
      .join(' · ');
  }
  if (ev.tipo === 'descargar_pdf') return p.categoria || '—';
  if (ev.tipo === 'enviar_formulario') return p.rubro || '—';
  return '—';
}

function Kpi({ label, valor, sub }) {
  return (
    <div className="border border-border-default rounded-[6px] bg-bg-base p-5">
      <p className="type-label">{label}</p>
      <p className="font-display text-[34px] leading-none text-text-primary mt-2 tabular-nums">
        {valor}
      </p>
      <p className="type-label mt-1.5 text-accent-mid">{sub}</p>
    </div>
  );
}

export default function PanelAdmin({ leads = [], eventos = [], supabaseHabilitado }) {
  const ahora = Date.now();
  const hace7 = ahora - 7 * 24 * 60 * 60 * 1000;
  const en7 = (arr) => arr.filter((x) => new Date(x.created_at).getTime() >= hace7).length;

  const pdf = leads.filter((l) => l.tipo === 'pdf');
  const contacto = leads.filter((l) => l.tipo === 'contacto');
  const pedidos = eventos.filter((e) => e.tipo === 'enviar_pedido');

  return (
    <div className="min-h-screen bg-bg-hero">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="type-eyebrow eyebrow-rule">Velas Devas · Panel</p>
            <h1 className="type-section text-[clamp(24px,4vw,34px)] mt-2">
              Actividad y leads
            </h1>
          </div>
          <LogoutButton />
        </div>

        {!supabaseHabilitado && (
          <div className="mt-6 border border-amber-300 bg-amber-50 text-amber-900 rounded-[6px] px-4 py-3 text-[13px]">
            La base de datos aún no está conectada. Agrega las variables{' '}
            <code>SUPABASE_URL</code> y <code>SUPABASE_SERVICE_ROLE_KEY</code> en Vercel
            para empezar a registrar leads y actividad.
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Kpi label="Leads totales" valor={leads.length} sub={`${en7(leads)} en 7 días`} />
          <Kpi label="Pedidos enviados" valor={pedidos.length} sub={`${en7(pedidos)} en 7 días`} />
          <Kpi label="Descargas de PDF" valor={pdf.length} sub={`${en7(pdf)} en 7 días`} />
          <Kpi label="Formularios" valor={contacto.length} sub={`${en7(contacto)} en 7 días`} />
        </div>

        {/* Leads */}
        <h2 className="type-section text-[20px] mt-12 mb-4">Leads recientes</h2>
        <div className="overflow-x-auto border border-border-default rounded-[6px] bg-bg-base">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="text-left">
                {['Fecha', 'Tipo', 'Empresa / Nombre', 'Contacto', 'Interés'].map((h) => (
                  <th
                    key={h}
                    className="font-sans font-bold text-[10px] uppercase tracking-[0.08em] text-text-primary bg-bg-card-1 px-3 py-2.5 border-b border-border-default whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center type-label">
                    Aún no hay leads registrados.
                  </td>
                </tr>
              )}
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-bg-hero/60 align-top">
                  <td className="px-3 py-2.5 border-b border-border-default whitespace-nowrap tabular-nums text-text-muted">
                    {fmtFecha(l.created_at)}
                  </td>
                  <td className="px-3 py-2.5 border-b border-border-default whitespace-nowrap">
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-[0.06em] rounded-full px-2 py-0.5 ${
                        l.tipo === 'pdf'
                          ? 'bg-gold-light text-graphite'
                          : 'bg-bg-card-2 text-text-primary'
                      }`}
                    >
                      {l.tipo === 'pdf' ? 'PDF' : 'Contacto'}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 border-b border-border-default text-text-primary">
                    <div className="font-medium">{l.empresa || l.nombre || '—'}</div>
                    {l.empresa && l.nombre && (
                      <div className="type-label">{l.nombre}</div>
                    )}
                    {l.rut && <div className="type-label">RUT {l.rut}</div>}
                  </td>
                  <td className="px-3 py-2.5 border-b border-border-default text-text-body">
                    {l.email && <div>{l.email}</div>}
                    {l.telefono && <div>{l.telefono}</div>}
                    {!l.email && !l.telefono && <span className="text-border-default">—</span>}
                  </td>
                  <td className="px-3 py-2.5 border-b border-border-default text-text-body">
                    {l.categoria || l.rubro || '—'}
                    {l.mensaje && (
                      <div className="type-label mt-1 max-w-[240px]">{l.mensaje}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actividad */}
        <h2 className="type-section text-[20px] mt-12 mb-4">Actividad reciente</h2>
        <div className="overflow-x-auto border border-border-default rounded-[6px] bg-bg-base">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="text-left">
                {['Fecha', 'Acción', 'Detalle'].map((h) => (
                  <th
                    key={h}
                    className="font-sans font-bold text-[10px] uppercase tracking-[0.08em] text-text-primary bg-bg-card-1 px-3 py-2.5 border-b border-border-default whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventos.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-8 text-center type-label">
                    Aún no hay actividad registrada.
                  </td>
                </tr>
              )}
              {eventos.map((ev) => (
                <tr key={ev.id} className="hover:bg-bg-hero/60">
                  <td className="px-3 py-2.5 border-b border-border-default whitespace-nowrap tabular-nums text-text-muted">
                    {fmtFecha(ev.created_at)}
                  </td>
                  <td className="px-3 py-2.5 border-b border-border-default text-text-primary whitespace-nowrap">
                    {TIPO_LABEL[ev.tipo] || ev.tipo}
                  </td>
                  <td className="px-3 py-2.5 border-b border-border-default text-text-body">
                    {detalleEvento(ev)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="type-label mt-8">
          Tráfico, orígenes y tendencias detalladas → Google Analytics (GA4).
        </p>
      </div>
    </div>
  );
}
