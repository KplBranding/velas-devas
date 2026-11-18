'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { EVENTO_ABRIR, guardarDecision, leerDecision } from '../lib/consentimiento';

// Aviso de cookies: tarjeta discreta abajo a la izquierda (en móvil, a todo el
// ancho). No bloquea la navegación. Aceptar y rechazar pesan lo mismo. Se vuelve
// a abrir desde "Preferencias de cookies" en el pie de página.
//
// Si el visitante sigue bajando sin decidir, la tarjeta CRECE de a poco con el
// scroll (variable --k, de 0 a 1 entre CRECE_DESDE y CRECE_HASTA px) para que no
// pase inadvertida. Nunca tapa el sitio ni impide navegar.
const CRECE_DESDE = 150;
const CRECE_HASTA = 1100;
const ESTILO_BOTON = {
  paddingTop: 'calc(11px + 5px * var(--k, 0))',
  paddingBottom: 'calc(11px + 5px * var(--k, 0))',
  fontSize: 'calc(12px + 1.5px * var(--k, 0))',
};
export default function AvisoCookies() {
  const [montado, setMontado] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const manual = useRef(false);

  useEffect(() => {
    let t;
    if (!leerDecision()) t = setTimeout(() => setMontado(true), 1200);
    const abrir = () => {
      manual.current = true; // abierto a propósito desde el pie: tamaño normal
      setMontado(true);
    };
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
    // Crecimiento ligado al scroll (solo si el aviso apareció por sí solo).
    let cuadro = 0;
    const crecer = () => {
      cuadro = 0;
      if (!ref.current) return;
      const k = manual.current
        ? 0
        : Math.min(1, Math.max(0, (window.scrollY - CRECE_DESDE) / (CRECE_HASTA - CRECE_DESDE)));
      ref.current.style.setProperty('--k', k.toFixed(3));
    };
    const alScroll = () => {
      if (!cuadro) cuadro = requestAnimationFrame(crecer);
    };
    crecer();
    medir();
    const ro = new ResizeObserver(medir);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener('resize', medir);
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(cuadro);
      ro.disconnect();
      window.removeEventListener('resize', medir);
      window.removeEventListener('scroll', alScroll);
      raiz.style.removeProperty('--aviso-cookies');
    };
  }, [montado]);

  const decidir = (decision) => {
    guardarDecision(decision);
    setVisible(false);
    setTimeout(() => {
      manual.current = false;
      setMontado(false);
    }, 350);
  };

  if (!montado) return null;

  return (
    <section
      ref={ref}
      aria-label="Aviso de cookies"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)',
        transitionTimingFunction: 'var(--ease-entrance)',
        padding: 'calc(20px + 10px * var(--k, 0))',
        boxShadow:
          '0 2px 4px rgba(40,48,40,0.06), 0 22px 48px -18px rgba(40,48,40,calc(0.30 + 0.35 * var(--k, 0)))',
      }}
      className={`cursor-native fixed z-[70] left-3 right-3 sm:left-6 sm:right-auto sm:w-[calc(360px+110px*var(--k,0))] bg-bg-base border border-border-default rounded-[6px] transition-[opacity,transform] duration-500 motion-reduce:transition-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <p className="type-eyebrow">Cookies</p>
      <p className="type-body mt-2.5" style={{ fontSize: 'calc(13px + 3px * var(--k, 0))' }}>
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
          style={ESTILO_BOTON}
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => decidir('aceptado')}
          className="btn-primary !px-3 text-center"
          style={ESTILO_BOTON}
        >
          Aceptar
        </button>
      </div>
    </section>
  );
}
