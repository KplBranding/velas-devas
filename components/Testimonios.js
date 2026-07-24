'use client';

import { useRef } from 'react';
import { TESTIMONIOS } from '../lib/contenido';
import AnimatedText from './AnimatedText';

// Carrusel de testimonios: scroll-snap horizontal (swipe en móvil, flechas en
// desktop). En vez de apilarse, las tarjetas se recorren de lado.
export default function Testimonios() {
  const trackRef = useRef(null);

  const desplazar = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const paso = card ? card.offsetWidth + 24 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * paso, behavior: 'smooth' });
  };

  return (
    <section className="border-t border-border-default bg-bg-hero overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-20 pb-8 md:pb-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="type-eyebrow eyebrow-rule" data-reveal-up>
              Testimonios
            </p>
            <AnimatedText
              as="h2"
              animation="maskReveal"
              className="type-section text-[clamp(24px,3.4vw,38px)] mt-3"
            >
              Lo que dicen nuestros clientes
            </AnimatedText>
          </div>

          {/* Controles (desktop) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => desplazar(-1)}
              aria-label="Testimonio anterior"
              className="w-10 h-10 rounded-full border border-border-default text-text-body hover:text-text-primary hover:border-text-muted transition-colors press flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => desplazar(1)}
              aria-label="Siguiente testimonio"
              className="w-10 h-10 rounded-full border border-border-default text-text-body hover:text-text-primary hover:border-text-muted transition-colors press flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Pista deslizable */}
      <div
        ref={trackRef}
        className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 md:px-8 pb-16 md:pb-20 scroll-pl-5 md:scroll-pl-8"
      >
        {TESTIMONIOS.map((t, i) => (
          <figure
            data-card
            key={i}
            className="snap-start shrink-0 w-[82%] sm:w-[48%] lg:w-[31.5%] bg-bg-base border border-border-default rounded-[6px] p-7 shadow-soft flex flex-col"
          >
            <span
              className="font-display text-gold text-[44px] leading-none mb-2 select-none"
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote className="type-body text-[15px] leading-[1.8] flex-1">
              {t.texto}
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-border-default">
              <p className="font-sans text-[13px] font-bold text-text-primary">
                {t.nombre}
              </p>
              <p className="type-label mt-0.5">{t.cargo}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
