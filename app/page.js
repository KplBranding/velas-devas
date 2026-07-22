'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { CATEGORIAS_LISTA } from '../lib/categorias';
import AnimatedText from '../components/AnimatedText';

export default function Entrada() {
  const [activo, setActivo] = useState(null);

  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-black-graphic grain">
      {/* Nav absoluto — logo centrado, botón Contacto a la derecha */}
      <nav className="absolute top-0 left-0 right-0 z-40 flex items-center px-6 md:px-10 h-[124px]">
        {/* Logo centrado */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center press"
          aria-label="Velas Devas — inicio"
        >
          <Image
            src="/logos/devas-blanco.png"
            alt="Velas Devas — expertos en velas"
            width={996}
            height={627}
            priority
            className="h-20 lg:h-24 w-auto object-contain"
          />
        </Link>

        <a
          href="https://wa.me/56998846164"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacto por WhatsApp — Hablemos"
          className="group ml-auto relative overflow-hidden rounded-[3px] px-5 py-2.5 press bg-transparent border border-[#F5F5EE]/45 hover:border-[#F5F5EE] hover:bg-[#F5F5EE]/[0.08] transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
          <span className="grid font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[#F5F5EE]">
            {/* Estado por defecto: CONTACTO */}
            <span className="[grid-area:1/1] flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-2">
              Contacto
            </span>
            {/* Estado hover: ícono WhatsApp + HABLEMOS */}
            <span className="[grid-area:1/1] flex items-center justify-center gap-1.5 opacity-0 translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100 group-hover:translate-y-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablemos
            </span>
          </span>
        </a>
      </nav>

      {/* Halo cálido central */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 warm-glow transition-opacity duration-700 ${
          activo !== null ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Texto central (desaparece al hover) */}
      <div
        className={`pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          activo !== null ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
        }`}
      >
        <p className="type-eyebrow-light eyebrow-rule mx-auto">
          Fabricantes mayoristas · Desde 2000
        </p>
        <AnimatedText
          as="h1"
          animation="maskReveal"
          duration={1.1}
          className="font-display text-[#F5F5EE] text-[clamp(32px,5.5vw,64px)] font-normal leading-[1.04] mt-6 max-w-3xl"
        >
          ¿Qué tipo de vela
          <br />
          estás <span className="italic text-[#C8D0A8]">buscando?</span>
        </AnimatedText>
        <p className="font-sans text-[12px] font-light tracking-[0.2em] uppercase text-[#F5F5EE]/50 mt-7">
          elige una categoría
        </p>
      </div>

      {/* Paneles */}
      <div className="flex h-full w-full flex-col md:flex-row">
        {CATEGORIAS_LISTA.map((cat, i) => {
          const abierto = activo === i;
          const atenuado = activo !== null && !abierto;
          return (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              onMouseEnter={() => setActivo(i)}
              onMouseLeave={() => setActivo(null)}
              onFocus={() => setActivo(i)}
              onBlur={() => setActivo(null)}
              aria-label={`${cat.nombre} — ${cat.descripcionCorta}`}
              className="group relative flex items-end overflow-hidden border-b md:border-b-0 md:border-r border-black/40 transition-[flex-grow] duration-[650ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                backgroundColor: cat.heroBg,
                flexGrow: abierto ? 2 : 1,
                flexBasis: 0,
              }}
            >
              {/* Fotografía de fondo */}
              <Image
                src={cat.imagenPanel}
                alt=""
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectPosition: cat.panelPos || '50% 50%' }}
                className={`object-cover transition-all duration-[900ms] ease-out ${
                  abierto ? 'scale-105 opacity-95' : 'scale-100 opacity-70'
                } ${atenuado ? 'opacity-40' : ''}`}
              />

              {/* Velos */}
              <div className="pointer-events-none absolute inset-0 veil-full" />
              <div
                className={`pointer-events-none absolute inset-0 veil-gold transition-opacity duration-700 ${
                  abierto ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div className="pointer-events-none absolute inset-0 grain" />

              {/* Línea dorada borde derecho */}
              <div
                className={`pointer-events-none absolute top-0 right-0 h-full w-[3px] bg-gradient-to-b from-transparent via-gold to-transparent transition-opacity duration-700 ${
                  abierto ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Contenido */}
              <div className="relative z-10 p-8 md:p-11 w-full">
                {/* Número + flecha de acción (arriba de la categoría, siempre visible) */}
                <div className="flex items-center gap-3 mb-4 text-[#F5F5EE]/80">
                  <span className="font-sans text-[12px] font-bold tracking-[0.22em]">
                    {cat.superindice}
                  </span>
                  <span className="h-px w-6 bg-current opacity-40" />
                  <span
                    aria-hidden
                    className={`text-[15px] leading-none transition-transform duration-300 ${
                      abierto ? 'translate-x-1' : ''
                    }`}
                  >
                    →
                  </span>
                </div>
                <p
                  className={`type-eyebrow-light transition-all duration-500 ${
                    abierto ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  {cat.eyebrow}
                </p>
                <h2 className="font-display text-[#F5F5EE] text-[clamp(28px,3.2vw,44px)] font-normal mt-3 leading-[1.02]">
                  {cat.nombre}
                </h2>
                <p
                  className={`font-sans text-[13px] font-light text-[#F5F5EE]/75 mt-4 max-w-[300px] leading-relaxed transition-all duration-500 delay-75 ${
                    abierto ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}
                >
                  {cat.descripcion}
                </p>
                <span
                  className={`inline-flex items-center gap-2.5 mt-7 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[#C8D0A8] transition-all duration-500 delay-100 ${
                    abierto ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}
                >
                  {cat.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
