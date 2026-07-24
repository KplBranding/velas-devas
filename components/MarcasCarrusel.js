'use client';

import { useEffect, useRef } from 'react';
import { MARCAS } from '../lib/contenido';
import AnimatedText from './AnimatedText';

// Título del carrusel según el rubro.
const TITULOS = {
  funerarias: 'Funerarias que han confiado en Devas',
  banqueteria: 'Empresas que han confiado en Devas',
  religiosas: 'Instituciones que han confiado en Devas',
};

const BASE_SPEED = 66; // px/s al 100% (~20% más rápido)
const HOVER_FACTOR = 0.2; // al hover: 20% (baja 80%)

// Carrusel infinito de marcas en estilo "fantasma" (monocromo/tenue).
// Movimiento controlado por rAF con velocidad suavizada: al acercarse baja de
// a poco hasta el 20%, sin saltos. Cada item: { img, alt } o { nombre }.
export default function MarcasCarrusel({ categoria }) {
  const lista = MARCAS[categoria] || [];
  const trackRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let pos = 0;
    let speed = BASE_SPEED;
    let half = track.scrollWidth / 2;
    let last = null;
    let raf = 0;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(track); // re-mide cuando cargan las imágenes / cambia el ancho

    const step = (t) => {
      if (last == null) last = t;
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;

      const target = BASE_SPEED * (hoverRef.current ? HOVER_FACTOR : 1);
      // Suavizado exponencial independiente del framerate (~0.35s de respuesta)
      speed += (target - speed) * (1 - Math.pow(0.006, dt));

      pos -= speed * dt;
      if (half > 0 && -pos >= half) pos += half; // loop continuo y sin costura

      track.style.transform = `translate3d(${pos}px,0,0)`;
      raf = requestAnimationFrame(step);
    };

    // Solo animamos mientras el carrusel está en viewport: fuera de pantalla el
    // rAF se detiene (no gasta frames de scroll en algo invisible).
    let visible = false;
    const start = () => {
      if (visible) return;
      visible = true;
      last = null; // evita un salto por el dt acumulado tras la pausa
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      visible = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(track);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [categoria]);

  if (lista.length === 0) return null;
  const items = [...lista, ...lista];
  const titulo = TITULOS[categoria] || 'Marcas que han confiado en Devas';

  return (
    <section
      className="border-t border-border-default bg-bg-base py-16 overflow-hidden"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <p className="type-eyebrow eyebrow-rule" data-reveal-up>
          Confían en nosotros
        </p>
        <AnimatedText
          as="h2"
          animation="maskReveal"
          className="type-section text-[clamp(22px,3vw,32px)] mt-3 mb-10"
        >
          {titulo}
        </AnimatedText>
      </div>

      {/* Pista con desvanecido en los bordes */}
      <div
        className="relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-14 md:gap-20 pr-14 md:pr-20 will-change-transform"
        >
          {items.map((m, i) => (
            <div key={i} className="shrink-0" aria-hidden={i >= lista.length}>
              {m.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.img}
                  alt={m.alt || ''}
                  loading="lazy"
                  className="h-20 md:h-24 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <span className="font-display text-[20px] md:text-[24px] text-text-muted/70 whitespace-nowrap">
                  {m.nombre}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
