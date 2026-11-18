'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { EVENTO_ABRIR, guardarDecision, leerDecision } from '../lib/consentimiento';

// Aviso de cookies: tarjeta discreta abajo a la izquierda (en móvil, a todo el
// ancho). No bloquea la navegación. Los dos botones pesan lo mismo. Se vuelve
// a abrir desde "Preferencias de cookies" en el pie de página.
//
// Si el visitante sigue bajando sin decidir, la tarjeta CRECE de a poco con el
// scroll (variable --k, de 0 a 1 entre CRECE_DESDE y CRECE_HASTA px) para que no
// pase inadvertida. Nunca tapa el sitio ni impide navegar. En móvil (--m: 0) crece
// solo hacia arriba, para que los dos botones sigan cabiendo en una fila.
const CRECE_DESDE = 150;
const CRECE_HASTA = 1100;
const ESTILO_BOTON = {
  paddingTop: 'calc(11px + 5px * var(--k, 0))',
  paddingBottom: 'calc(11px + 5px * var(--k, 0))',
  fontSize: 'calc(11px + 1px * var(--m) + 1.5px * var(--k, 0) * var(--m))',
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
        paddingBlock: 'calc(20px + 10px * var(--k, 0))',
        paddingInline: 'calc(16px + 4px * var(--m) + 10px * var(--k, 0) * var(--m))',
        boxShadow:
          '0 2px 4px rgba(40,48,40,0.06), 0 22px 48px -18px rgba(40,48,40,calc(0.30 + 0.35 * var(--k, 0)))',
      }}
      className={`cursor-native [--m:0] sm:[--m:1] fixed z-[70] left-3 right-3 sm:left-6 sm:right-auto sm:w-[calc(400px+110px*var(--k,0))] bg-bg-base border border-border-default rounded-[6px] transition-[opacity,transform] duration-500 motion-reduce:transition-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <p className="type-eyebrow">Cookies</p>
      <p className="type-body mt-2.5" style={{ fontSize: 'calc(13px + 2px * var(--k, 0) + 1px * var(--k, 0) * var(--m))' }}>
        Además de lo necesario para que el sitio funcione, usamos cookies de medición para
        entender cómo se usa y mejorarlo. Tú eliges.{' '}
        <Link
          href="/privacidad"
          className="text-text-primary underline underline-offset-2 hover:text-accent-mid transition-colors"
        >
          Política de privacidad
        </Link>
      </p>
      {/* En una fila si caben; si no, uno bajo el otro. El texto nunca se parte. */}
      <div className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={() => decidir('rechazado')}
          className="btn-secondary !px-2 sm:!px-3 max-sm:tracking-[0.03em] text-center flex-auto whitespace-nowrap"
          style={ESTILO_BOTON}
        >
          Solo las necesarias
        </button>
        <button
          type="button"
          onClick={() => decidir('aceptado')}
          className="btn-primary !px-2 sm:!px-3 max-sm:tracking-[0.03em] text-center flex-auto whitespace-nowrap"
          style={ESTILO_BOTON}
        >
          Aceptar todas
        </button>
      </div>
    </section>
  );
}
