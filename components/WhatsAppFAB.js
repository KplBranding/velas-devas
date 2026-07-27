'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EMPRESA } from '../lib/categorias';

// FAB de WhatsApp — SOLO ícono, con un halo/latido muy sutil (verde salvia,
// estilo del sitio) y una sombra leve. Aparece tras 400px de scroll, entra
// suave desde la derecha, y se OCULTA al llegar al footer (no lo tapa: queda
// en zona media-baja durante el recorrido y desaparece antes del cierre).
// Respeta safe-areas y prefers-reduced-motion.
export default function WhatsAppFAB() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const state = { shown: false, footerVisible: false };

    gsap.set(root, { x: reduce ? 0 : 110, opacity: 0, scale: reduce ? 1 : 0.85 });
    root.style.pointerEvents = 'none';

    const xTo = gsap.quickTo(root, 'x', { duration: 0.8, ease: 'power4.out' });
    const opTo = gsap.quickTo(root, 'opacity', { duration: 0.5, ease: 'power2.out' });
    const scTo = gsap.quickTo(root, 'scale', { duration: 0.6, ease: 'power3.out' });

    const show = () => {
      if (state.shown) return;
      state.shown = true;
      root.style.pointerEvents = 'auto';
      if (reduce) return void gsap.set(root, { opacity: 1 });
      xTo(0);
      opTo(1);
      scTo(1);
    };
    const hide = () => {
      if (!state.shown) return;
      state.shown = false;
      root.style.pointerEvents = 'none';
      if (reduce) return void gsap.set(root, { opacity: 0 });
      xTo(110);
      opTo(0);
      scTo(0.85);
    };

    // Aparece tras 400px de scroll y SIEMPRE que no esté el footer a la vista.
    const apply = () => {
      if (window.scrollY > 400 && !state.footerVisible) show();
      else hide();
    };

    window.addEventListener('scroll', apply, { passive: true });

    // Se oculta cuando el footer entra en viewport (un poco antes).
    let io;
    const footer = document.querySelector('footer');
    if (footer) {
      io = new IntersectionObserver(
        ([e]) => {
          state.footerVisible = e.isIntersecting;
          apply();
        },
        { rootMargin: '0px 0px 60px 0px' }
      );
      io.observe(footer);
    }

    apply();

    return () => {
      window.removeEventListener('scroll', apply);
      io && io.disconnect();
    };
  }, []);

  const msg = encodeURIComponent('Hola Velas Devas, quisiera hacer una consulta.');

  return (
    <a
      ref={rootRef}
      href={`https://wa.me/${EMPRESA.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contáctanos por WhatsApp"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)',
        right: 'calc(env(safe-area-inset-right, 0px) + 1.5rem)',
        willChange: 'transform, opacity',
      }}
      className="group fixed z-[60] grid place-items-center w-14 h-14 rounded-full bg-graphite text-blanco-calido ring-1 ring-white/10 shadow-soft transition-shadow duration-500 hover:shadow-lift press"
    >
      {/* Halo/latido muy sutil (verde salvia) */}
      <span
        aria-hidden
        className="fab-halo pointer-events-none absolute inset-0 rounded-full"
      />
      {/* Ícono */}
      <span className="relative transition-transform duration-500 ease-[var(--ease-entrance)] group-hover:scale-110">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>
    </a>
  );
}
