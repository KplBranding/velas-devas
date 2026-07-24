'use client';

import Image from 'next/image';
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
        <Image
          key={idx}
          src={src}
          alt={`${alt} — vista ${idx + 1}`}
          fill
          draggable={false}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-opacity duration-500 ease-[var(--ease-entrance)] ${
            idx === i ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {n > 1 && (
        <>
          {/* Flechas: visibles siempre en móvil (sin hover); en desktop aparecen
              al pasar el cursor. Área de toque 36px. */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg-base/85 backdrop-blur-sm text-text-primary flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/gal:opacity-100 hover:bg-bg-base transition-[opacity,background-color] duration-[var(--dur-fast)] press"
          >
            <svg width="9" height="14" viewBox="0 0 8 12" fill="none">
              <path d="M6.5 1 1.5 6l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg-base/85 backdrop-blur-sm text-text-primary flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/gal:opacity-100 hover:bg-bg-base transition-[opacity,background-color] duration-[var(--dur-fast)] press"
          >
            <svg width="9" height="14" viewBox="0 0 8 12" fill="none">
              <path d="M1.5 1 6.5 6l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1 z-10">
            {imagenes.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Ver vista ${idx + 1}`}
                className="group/dot flex items-center justify-center py-2.5 px-1"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-[var(--dur-base)] ${
                    idx === i
                      ? 'w-4 bg-text-primary'
                      : 'w-1.5 bg-text-primary/30 group-hover/dot:bg-text-primary/50'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
