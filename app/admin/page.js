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
  const sb = getSupabase();
  if (sb) {
    const [l, e] = await Promise.all([
      sb.from('leads').select('*').order('created_at', { ascending: false }).limit(500),
      sb.from('eventos').select('*').order('created_at', { ascending: false }).limit(1000),
    ]);
    leads = l.data || [];
    eventos = e.data || [];
  }

  return (
    <PanelAdmin
      leads={leads}
      eventos={eventos}
      supabaseHabilitado={supabaseHabilitado}
    />
  );
}
