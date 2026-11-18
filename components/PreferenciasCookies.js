'use client';

import { EVENTO_ABRIR } from '../lib/consentimiento';

// Enlace del pie de página que vuelve a abrir el aviso de cookies, para que el
// visitante pueda cambiar su decisión cuando quiera.
export default function PreferenciasCookies({ className = '' }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR))}
      className={`font-sans text-[11px] font-light text-text-footer hover:text-[#F5F5EE] transition-colors text-left ${className}`}
    >
      Preferencias de cookies
    </button>
  );
}
