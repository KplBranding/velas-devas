'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(false);
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (r.ok) {
        window.location.reload();
        return;
      }
      setError(true);
    } catch {
      setError(true);
    }
    setCargando(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base px-5">
      <form onSubmit={submit} className="w-full max-w-sm">
        <p className="type-eyebrow eyebrow-rule">Velas Devas · Panel</p>
        <h1 className="type-section text-[clamp(24px,5vw,32px)] mt-3 mb-6">
          Acceso al panel
        </h1>
        <label className="type-label" htmlFor="admin-pass">
          Contraseña
        </label>
        <input
          id="admin-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-1.5 w-full bg-bg-hero border border-border-default rounded-[4px] px-3 py-2.5 font-sans text-[14px] text-text-primary focus:outline-none focus:border-accent-mid transition-colors"
        />
        {error && (
          <p className="mt-2 text-[12px] text-red-500">Contraseña incorrecta.</p>
        )}
        <button
          type="submit"
          disabled={cargando || !password}
          className="btn-primary w-full text-center mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
