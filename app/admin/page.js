import { supabaseHabilitado, getSupabase } from '../../lib/supabase';
import { adminHabilitado, sesionAdminValida } from '../../lib/adminAuth';
import LoginForm from '../../components/admin/LoginForm';
import PanelAdmin from '../../components/admin/PanelAdmin';

// Lee cookies + base de datos en cada request → dinámico, y fuera del índice.
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Panel',
  robots: { index: false, follow: false },
};

// Diagnóstico de conexión (para saber POR QUÉ el panel no trae datos): compara el
// proyecto de la URL vs. el de la llave, y verifica que la llave sea la
// service_role / secret (no la anon / publishable — esas no leen por RLS).
function diagnostico(leadsError, eventosError) {
  const url = process.env.SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const urlRef = (url.match(/https?:\/\/([^.]+)\.supabase\./) || [])[1] || null;

  let keyRole = null;
  let keyRef = null;
  if (key && !key.startsWith('sb_')) {
    try {
      const p = JSON.parse(
        Buffer.from(key.split('.')[1] || '', 'base64').toString()
      );
      keyRole = p.role || null;
      keyRef = p.ref || null;
    } catch {}
  }

  const problemas = [];
  if (!url || !key) {
    problemas.push(
      'Faltan variables SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY en Vercel.'
    );
  }
  if (key.startsWith('sb_publishable_')) {
    problemas.push(
      'La llave configurada es la "publishable" (pública). El panel necesita la llave SECRETA (sb_secret_…) o la service_role — con la pública no se leen ni escriben datos (RLS).'
    );
  }
  if (keyRole && keyRole !== 'service_role') {
    problemas.push(
      `La llave configurada es de tipo "${keyRole}", no "service_role". Con la anon no se leen ni escriben datos (RLS). Copia la llave service_role: Supabase → Settings → API → Project API keys → service_role.`
    );
  }
  if (urlRef && keyRef && urlRef !== keyRef) {
    problemas.push(
      `La URL apunta al proyecto "${urlRef}" pero la llave es del proyecto "${keyRef}": no coinciden. Usa la URL y la llave del MISMO proyecto.`
    );
  }
  if (leadsError) {
    const faltaTabla = /does not exist|relation|schema/i.test(leadsError);
    problemas.push(
      `Error al leer datos: ${leadsError}${
        faltaTabla
          ? ' → parece que faltan las tablas. Corre el SQL de supabase/schema.sql en Supabase → SQL Editor.'
          : ''
      }`
    );
  }
  if (eventosError && eventosError !== leadsError) {
    problemas.push(`Error al leer actividad: ${eventosError}`);
  }
  return { urlRef, keyRole, problemas };
}

export default async function AdminPage() {
  if (!adminHabilitado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-base px-5 text-center">
        <div className="max-w-md">
          <h1 className="type-section text-[24px]">Panel no configurado</h1>
          <p className="type-body mt-3">
            Falta definir la variable <code>ADMIN_PASSWORD</code> en el entorno (Vercel).
          </p>
        </div>
      </div>
    );
  }

  if (!sesionAdminValida()) return <LoginForm />;

  let leads = [];
  let eventos = [];
  let leadsError = null;
  let eventosError = null;
  const sb = getSupabase();
  if (sb) {
    const l = await sb
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
    const e = await sb
      .from('eventos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000);
    leads = l.data || [];
    eventos = e.data || [];
    leadsError = l.error?.message || null;
    eventosError = e.error?.message || null;
  }

  return (
    <PanelAdmin
      leads={leads}
      eventos={eventos}
      supabaseHabilitado={supabaseHabilitado}
      diag={diagnostico(leadsError, eventosError)}
    />
  );
}
