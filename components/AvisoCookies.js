'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { EVENTO_ABRIR, guardarDecision, leerDecision } from '../lib/consentimiento';

// Aviso de cookies: tarjeta discreta abajo a la izquierda (en móvil, a todo el
// ancho). No bloquea la navegación. Aceptar y rechazar pesan lo mismo. Se vuelve
// a abrir desde "Preferencias de cookies" en el pie de página.
export default function AvisoCookies() {
  const [montado, setMontado] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let t;
    if (!leerDecision()) t = setTimeout(() => setMontado(true), 1200);
    const abrir = () => setMontado(true);
    window.addEventListener(EVENTO_ABRIR, abrir);
    return () => {
      clearTimeout(t);
      window.removeEventListener(EVENTO_ABRIR, abrir);
    };
  }, []);

  // Entrada suave, y en móvil sube el botón de WhatsApp para que no quede tapado.
  useEffect(() => {
    const raiz = document.documentElement;
    if (!montado) {
      raiz.style.removeProperty('--aviso-cookies');
      return undefined;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    const medir = () => {
      const alto = ref.current ? ref.current.offsetHeight : 0;
      const movil = window.innerWidth < 640;
      raiz.style.setProperty('--aviso-cookies', movil ? alto + 12 + 'px' : '0px');
    };
    medir();
    window.addEventListener('resize', medir);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', medir);
      raiz.style.removeProperty('--aviso-cookies');
    };
  }, [montado]);

  const decidir = (decision) => {
    guardarDecision(decision);
    setVisible(false);
    setTimeout(() => setMontado(false), 350);
  };

  if (!montado) return null;

  return (
    <section
      ref={ref}
      aria-label="Aviso de cookies"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)',
        transitionTimingFunction: 'var(--ease-entrance)',
      }}
      className={`cursor-native fixed z-[70] left-3 right-3 sm:left-6 sm:right-auto sm:w-[360px] bg-bg-base border border-border-default rounded-[6px] shadow-lift p-5 transition-[opacity,transform] duration-500 motion-reduce:transition-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <p className="type-eyebrow">Cookies</p>
      <p className="type-body mt-2.5">
        Usamos cookies de medición para entender cómo se usa el sitio y mejorarlo. Puedes
        aceptarlas o rechazarlas: el sitio funciona igual.{' '}
        <Link
          href="/privacidad"
          className="text-text-primary underline underline-offset-2 hover:text-accent-mid transition-colors"
        >
          Política de privacidad
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => decidir('rechazado')}
          className="btn-secondary !px-3 text-center"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => decidir('aceptado')}
          className="btn-primary !px-3 text-center"
        >
          Aceptar
        </button>
      </div>
    </section>
  );
}
