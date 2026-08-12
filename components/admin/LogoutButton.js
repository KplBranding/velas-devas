'use client';

export default function LogoutButton() {
  const salir = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {}
    window.location.reload();
  };
  return (
    <button
      type="button"
      onClick={salir}
      className="type-label hover:text-text-primary underline underline-offset-2 press"
    >
      Cerrar sesión
    </button>
  );
}
