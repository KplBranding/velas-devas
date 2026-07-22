'use client';

import { useEffect, useState } from 'react';

// Sub-navegación sticky (estilo Apple): queda fija bajo el navbar al hacer
// scroll y resalta la sección activa. Persiste durante todo el recorrido.
const LINKS = [
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'proceso', label: 'Nuestro proceso' },
  { id: 'testimonios', label: 'Opiniones' },
  { id: 'faq', label: 'Preguntas frecuentes' },
];

export default function SubNav() {
  const [active, setActive] = useState('catalogo');

  useEffect(() => {
    const secs = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!secs.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      // "activo" cuando la sección cruza la franja superior (bajo el navbar)
      { rootMargin: '-150px 0px -55% 0px', threshold: 0 }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sticky top-[112px] z-40 chrome-glass border-b border-border-default">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-[50px] flex items-center justify-between gap-6">
        <nav
          aria-label="Secciones"
          className="flex items-center gap-5 md:gap-7 overflow-x-auto no-scrollbar"
        >
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`shrink-0 font-sans text-nav whitespace-nowrap pb-[2px] transition-colors ${
                active === l.id
                  ? 'text-text-primary border-b-active border-gold'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/contacto"
          className="shrink-0 hidden sm:inline-block font-sans text-[11px] font-bold uppercase tracking-[0.06em] text-text-primary border border-border-default rounded-full px-4 py-2 leading-none hover:border-text-muted transition-colors press"
        >
          Cotizar
        </a>
      </div>
    </div>
  );
}
