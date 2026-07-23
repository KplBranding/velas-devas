'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EMPRESA } from '../lib/categorias';

// Floating "Hablemos" — botón de contacto editorial premium (Apple / Aesop / B&O).
// No es el típico botón verde: pill en verde-negro con tipografía en versalitas.
//
// Comportamiento (todo con GSAP quickTo → transform/opacity/width, 60 FPS):
//   • aparece tras 400px de scroll, entrando suave desde la derecha
//   • al hacer scroll rápido se contrae a un círculo (solo el ícono)
//   • al detenerse el scroll vuelve a expandirse a la pill
//   • hover con microinteracciones (ring dorado + tracking + ícono)
//   • respeta safe-area-insets en móvil y prefers-reduced-motion
export default function WhatsAppFAB() {
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const labelInnerRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const label = labelRef.current;
    const inner = labelInnerRef.current;
    if (!root || !label || !inner) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let expandedW = inner.offsetWidth;
    gsap.set(root, { x: 148, opacity: 0 });
    gsap.set(label, { width: expandedW });
    root.style.pointerEvents = 'none';

    // Re-medir cuando la fuente termina de cargar (evita saltos de ancho)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        expandedW = inner.offsetWidth;
        if (state.shown && !state.collapsed) gsap.set(label, { width: expandedW });
      });
    }

    const state = { shown: false, collapsed: false };

    // --- Animadores rápidos (reutilizan una sola instancia → sin GC en scroll) ---
    const xTo = gsap.quickTo(root, 'x', { duration: 0.85, ease: 'power4.out' });
    const opTo = gsap.quickTo(root, 'opacity', { duration: 0.5, ease: 'power2.out' });
    const wTo = gsap.quickTo(label, 'width', { duration: 0.6, ease: 'power3.out' });
    const labelOpTo = gsap.quickTo(inner, 'opacity', { duration: 0.45, ease: 'power2.out' });

    const show = () => {
      state.shown = true;
      root.style.pointerEvents = 'auto';
      xTo(0);
      opTo(1);
    };
    const hide = () => {
      state.shown = false;
      root.style.pointerEvents = 'none';
      xTo(148);
      opTo(0);
    };
    const collapse = () => {
      if (state.collapsed) return;
      state.collapsed = true;
      wTo(0);
      labelOpTo(0);
    };
    const expand = () => {
      if (!state.collapsed) return;
      state.collapsed = false;
      wTo(expandedW);
      labelOpTo(1);
    };

    // reduce-motion: aparición simple por opacidad, sin colapso ni parallax
    if (reduce) {
      const onScrollR = () => {
        const y = window.scrollY;
        if (y > 400 && !state.shown) show();
        else if (y <= 400 && state.shown) hide();
      };
      window.addEventListener('scroll', onScrollR, { passive: true });
      onScrollR();
      return () => window.removeEventListener('scroll', onScrollR);
    }

    let lastY = window.scrollY;
    let lastT = performance.now();
    let stopTimer;
    const V_FAST = 1.15; // px/ms — umbral de "scroll rápido"

    const onScroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      const v = Math.abs(y - lastY) / Math.max(t - lastT, 1);
      lastY = y;
      lastT = t;

      if (y > 400 && !state.shown) show();
      else if (y <= 400 && state.shown) hide();

      if (state.shown) {
        if (v > V_FAST) collapse();
        clearTimeout(stopTimer);
        stopTimer = setTimeout(expand, 260); // al detenerse, re-expande
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      expandedW = inner.offsetWidth;
      if (state.shown && !state.collapsed) gsap.set(label, { width: expandedW });
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(stopTimer);
    };
  }, []);

  const msg = encodeURIComponent('Hola Velas Devas, quisiera hacer una consulta.');

  return (
    <a
      ref={rootRef}
      href={`https://wa.me/${EMPRESA.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablemos por WhatsApp"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)',
        right: 'calc(env(safe-area-inset-right, 0px) + 1.25rem)',
        willChange: 'transform, opacity',
      }}
      className="group fixed z-[60] flex items-center h-14 rounded-full bg-graphite text-blanco-calido overflow-hidden ring-1 ring-white/10 shadow-lift backdrop-saturate-150 transition-shadow duration-500 hover:shadow-[0_6px_16px_rgba(40,48,40,0.18),0_28px_60px_-20px_rgba(40,48,40,0.45)]"
    >
      {/* Etiqueta (se contrae a 0 en scroll rápido) */}
      <span ref={labelRef} className="overflow-hidden">
        <span
          ref={labelInnerRef}
          className="flex items-center gap-4 pl-6 pr-4 whitespace-nowrap"
        >
          <span className="text-[12px] font-light uppercase tracking-[0.22em] leading-none transition-[letter-spacing] duration-500 group-hover:tracking-[0.28em]">
            Hablemos
          </span>
          <span aria-hidden className="w-px h-4 bg-white/15" />
        </span>
      </span>

      {/* Ícono en círculo — es lo único que queda al colapsar */}
      <span className="relative grid place-items-center w-14 h-14 shrink-0">
        {/* ring dorado sutil en hover */}
        <span
          aria-hidden
          className="absolute inset-[7px] rounded-full ring-1 ring-gold/0 transition-all duration-500 group-hover:inset-[5px] group-hover:ring-gold/70"
        />
        <span className="transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
      </span>
    </a>
  );
}
