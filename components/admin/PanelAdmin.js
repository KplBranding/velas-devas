import { clp } from '../../lib/utils';
import LogoutButton from './LogoutButton';

const fmtFecha = (iso) =>
  new Date(iso).toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

/* ── Tarjetas ─────────────────────────────────────────────────────────────── */

function Chip({ children }) {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.05em] rounded-full px-2 py-0.5 bg-bg-card-2 text-text-primary">
      {children}
    </span>
  );
}

function LeadCard({ lead }) {
  const titulo = lead.empresa || lead.nombre || 'Sin nombre';
  return (
    <div className="rounded-[6px] border border-border-default bg-bg-base p-3.5 shadow-sm hover:shadow-lift transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-[15px] text-text-primary leading-tight">
          {titulo}
        </p>
        <span className="type-label tabular-nums whitespace-nowrap shrink-0">
          {fmtFecha(lead.created_at)}
        </span>
      </div>
      {lead.empresa && lead.nombre && (
        <p className="type-label mt-0.5">{lead.nombre}</p>
      )}
      <div className="mt-2 space-y-0.5 text-[13px] text-text-body">
        {lead.email && (
          <a href={`mailto:${lead.email}`} className="block text-accent-mid hover:underline break-all">
            {lead.email}
          </a>
        )}
        {lead.telefono && lead.telefono !== '—' && (
          <a href={`tel:${lead.telefono}`} className="block hover:underline">
            {lead.telefono}
          </a>
        )}
        {lead.rut && <p className="type-label">RUT {lead.rut}</p>}
      </div>
      {(lead.categoria || lead.rubro) && (
        <div className="mt-2.5">
          <Chip>{lead.categoria || lead.rubro}</Chip>
        </div>
      )}
      {lead.mensaje && (
        <p className="mt-2.5 text-[12.5px] text-text-muted leading-relaxed whitespace-pre-line line-clamp-4">
          {lead.mensaje}
        </p>
      )}
    </div>
  );
}

function PedidoCard({ ev }) {
  const p = ev.params || {};
  const metodo =
    p.metodo === 'whatsapp' ? 'WhatsApp' : p.metodo === 'correo' ? 'Correo' : p.metodo || 'Pedido';
  return (
    <div className="rounded-[6px] border border-border-default bg-bg-base p-3.5 shadow-sm hover:shadow-lift transition-shadow">
      <div className="flex items-center justify-between gap-2">
        <Chip>{metodo}</Chip>
        <span className="type-label tabular-nums whitespace-nowrap">
          {fmtFecha(ev.created_at)}
        </span>
      </div>
      <div className="mt-2.5 flex items-baseline gap-2">
        {p.value ? (
          <span className="font-display text-[19px] text-text-primary">{clp(p.value)}</span>
        ) : (
          <span className="type-label">Sin monto</span>
        )}
        {p.items != null && <span className="type-label">· {p.items} ítems</span>}
      </div>
    </div>
  );
}

/* ── Columna Kanban ───────────────────────────────────────────────────────── */

function Columna({ titulo, color, items, sub7, render, vacio }) {
  return (
    <div className="flex flex-col min-w-0">
      <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b-2" style={{ borderColor: color }}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
          <h3 className="font-sans font-bold text-[12px] uppercase tracking-[0.08em] text-text-primary truncate">
            {titulo}
          </h3>
        </div>
        <span className="shrink-0 text-[11px] font-bold tabular-nums text-text-muted">
          {items.length}
          {sub7 != null && <span className="text-accent-mid"> · {sub7}/7d</span>}
        </span>
      </div>
      <div className="flex flex-col gap-2.5 md:max-h-[70vh] md:overflow-y-auto md:pr-1">
        {items.length === 0 ? (
          <p className="type-label py-6 text-center">{vacio}</p>
        ) : (
          items.map(render)
        )}
      </div>
    </div>
  );
}

/* ── Panel ────────────────────────────────────────────────────────────────── */

function Kpi({ label, valor, sub }) {
  return (
    <div className="border border-border-default rounded-[6px] bg-bg-base px-4 py-3.5">
      <p className="type-label">{label}</p>
      <p className="font-display text-[28px] leading-none text-text-primary mt-1.5 tabular-nums">
        {valor}
      </p>
      <p className="type-label mt-1 text-accent-mid">{sub}</p>
    </div>
  );
}

export default function PanelAdmin({ leads = [], eventos = [], supabaseHabilitado, diag }) {
  const hace7 = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const en7 = (arr) => arr.filter((x) => new Date(x.created_at).getTime() >= hace7).length;

  const pdf = leads.filter((l) => l.tipo === 'pdf');
  const contacto = leads.filter((l) => l.tipo === 'contacto');
  const pedidos = eventos.filter((e) => e.tipo === 'enviar_pedido');
  const problemas = diag?.problemas || [];

  return (
    <div className="min-h-screen bg-bg-hero">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 py-9">
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

        {/* Diagnóstico / conexión */}
        {(problemas.length > 0 || !supabaseHabilitado) && (
          <div className="mt-6 border border-amber-300 bg-amber-50 rounded-[6px] px-4 py-3.5 text-[13px] text-amber-900">
            <p className="font-bold mb-1">No se están leyendo datos de la base. Revisa:</p>
            {!supabaseHabilitado && !problemas.length ? (
              <p>
                Faltan <code>SUPABASE_URL</code> y <code>SUPABASE_SERVICE_ROLE_KEY</code> en Vercel.
              </p>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {problemas.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-7">
          <Kpi label="Leads totales" valor={leads.length} sub={`${en7(leads)} en 7 días`} />
          <Kpi label="Pedidos enviados" valor={pedidos.length} sub={`${en7(pedidos)} en 7 días`} />
          <Kpi label="Descargas de PDF" valor={pdf.length} sub={`${en7(pdf)} en 7 días`} />
          <Kpi label="Formularios" valor={contacto.length} sub={`${en7(contacto)} en 7 días`} />
        </div>

        {/* Kanban */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-9">
          <Columna
            titulo="Pedidos enviados"
            color="#485848"
            items={pedidos}
            sub7={en7(pedidos)}
            render={(ev) => <PedidoCard key={ev.id} ev={ev} />}
            vacio="Sin pedidos aún."
          />
          <Columna
            titulo="Contactos"
            color="#607860"
            items={contacto}
            sub7={en7(contacto)}
            render={(l) => <LeadCard key={l.id} lead={l} />}
            vacio="Sin contactos aún."
          />
          <Columna
            titulo="Descargas de PDF"
            color="#708870"
            items={pdf}
            sub7={en7(pdf)}
            render={(l) => <LeadCard key={l.id} lead={l} />}
            vacio="Sin descargas aún."
          />
        </div>

        <p className="type-label mt-10">
          Tráfico, orígenes y tendencias detalladas → Google Analytics (GA4).
        </p>
      </div>
    </div>
  );
}
