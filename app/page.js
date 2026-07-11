'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIAS_LISTA } from '../lib/categorias';

export default function Entrada() {
  const [activo, setActivo] = useState(null);

  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-black-graphic">
      {/* Nav absoluto */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 h-[64px]">
        <Link
          href="/"
          className="font-display text-[20px] text-[#FAFAF8] tracking-wide"
        >
          Velas Devas
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/nosotros"
            className="font-sans text-[12px] text-[#FAFAF8]/80 hover:text-[#FAFAF8] transition-colors"
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            className="font-sans text-[12px] text-[#FAFAF8]/80 hover:text-[#FAFAF8] transition-colors"
          >
            Contacto
          </Link>
        </div>
      </nav>

      {/* Texto central (desaparece al hover) */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-500 ${
          activo !== null ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-gold">
          Bienvenido · Desde 2000
        </p>
        <h1 className="font-display text-[#FAFAF8] text-[clamp(30px,5vw,56px)] font-normal leading-[1.05] mt-4 max-w-2xl">
          ¿Qué tipo de vela
          <br />
          estás <span className="italic">buscando?</span>
        </h1>
        <p className="font-sans text-[12px] font-light text-[#FAFAF8]/60 mt-5 tracking-wide">
          ← elige una categoría →
        </p>
      </div>

      {/* Paneles */}
      <div className="flex h-full w-full flex-col md:flex-row">
        {CATEGORIAS_LISTA.map((cat, i) => {
          const abierto = activo === i;
          return (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              onMouseEnter={() => setActivo(i)}
              onMouseLeave={() => setActivo(null)}
              onFocus={() => setActivo(i)}
              onBlur={() => setActivo(null)}
              className="group relative flex items-end overflow-hidden border-b md:border-b-0 md:border-r border-[#000]/30 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                backgroundColor: cat.heroBg,
                flexGrow: abierto ? 1.7 : 1,
                flexBasis: 0,
              }}
            >
              {/* Overlay dorado inferior */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-gold/25 via-transparent to-transparent transition-opacity duration-500 ${
                  abierto ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {/* Línea dorada borde derecho */}
              <div
                className={`pointer-events-none absolute top-0 right-0 h-full w-[2px] bg-gold transition-opacity duration-500 ${
                  abierto ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Contenido */}
              <div className="relative z-10 p-8 md:p-10 w-full">
                <p
                  className={`font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-gold transition-all duration-500 ${
                    abierto
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 md:opacity-0'
                  }`}
                >
                  {cat.eyebrow}
                </p>
                <h2 className="font-display text-[#FAFAF8] text-[clamp(26px,3vw,40px)] font-normal mt-2 leading-none">
                  {cat.nombre}
                </h2>
                <p
                  className={`font-sans text-[13px] font-light text-[#FAFAF8]/70 mt-4 max-w-[280px] leading-relaxed transition-all duration-500 ${
                    abierto
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2'
                  }`}
                >
                  {cat.descripcion}
                </p>
                <span
                  className={`inline-flex items-center gap-2 mt-6 font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-gold transition-all duration-500 ${
                    abierto
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2'
                  }`}
                >
                  {cat.cta}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
