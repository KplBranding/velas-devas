'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scheduleRefresh } from '../lib/scrollRefresh';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Evita refreshes (y micro-saltos) por el resize de la barra de URL en móvil.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// Reveal global editorial: cualquier elemento con [data-reveal-up] aparece con
// un fade + subida sutil al entrar en viewport, escalonado por grupos.
// Usa ScrollTrigger.batch (un solo observer, performante). Se re-inicializa en
// cada cambio de ruta. Respeta prefers-reduced-motion.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = gsap.utils.toArray('[data-reveal-up]');
    if (!els.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(els, { clearProps: 'all' });
      return;
    }

    els.forEach((el) => gsap.set(el, { opacity: 0, y: 26 }));

    const triggers = ScrollTrigger.batch('[data-reveal-up]', {
      start: 'top 90%',
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.09,
          overwrite: true,
        }),
      // Al subir (scroll inverso) el efecto se revierte: el texto vuelve a
      // desvanecerse y bajar, quedando "vinculado" al sentido del scroll.
      onLeaveBack: (batch) =>
        gsap.to(batch, {
          opacity: 0,
          y: 26,
          duration: 0.5,
          ease: 'power2.in',
          stagger: 0.05,
          overwrite: true,
        }),
    });

    scheduleRefresh();

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.set(els, { clearProps: 'all' });
    };
  }, [pathname]);

  return null;
}
