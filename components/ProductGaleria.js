'use client';

import { useRef, useState } from 'react';

// Carrusel de imágenes de un producto (estilo catálogo de zapatillas):
// crossfade entre tomas, flechas al hover, puntos y swipe táctil.
export default function ProductGaleria({ imagenes, alt }) {
  const [i, setI] = useState(0);
  const startX = useRef(null);
  const n = imagenes.length;

  const go = (d) => setI((p) => (p + d + n) % n);

  const onDown = (e) => {
    startX.current = e.clientX;
  };
  const onUp = (e) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (dx > 40) go(-1);
    else if (dx < -40) go(1);
  };

  return (
    <div
      className="group/gal relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#F3EFEA] select-none touch-pan-y"
      onPointerDown={onDown}
      onPointerUp={onUp}
    >
      {imagenes.map((src, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={idx}
          src={src}
          alt={`${alt} — vista ${idx + 1}`}
          draggable={false}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            idx === i ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {n > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-bg-base/80 backdrop-blur-sm text-text-primary flex items-center justify-center opacity-0 group-hover/gal:opacity-100 hover:bg-bg-base transition-all duration-200 press"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M6.5 1 1.5 6l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-bg-base/80 backdrop-blur-sm text-text-primary flex items-center justify-center opacity-0 group-hover/gal:opacity-100 hover:bg-bg-base transition-all duration-200 press"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M1.5 1 6.5 6l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
            {imagenes.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Ver vista ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === i ? 'w-4 bg-text-primary' : 'w-1.5 bg-text-primary/30 hover:bg-text-primary/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
