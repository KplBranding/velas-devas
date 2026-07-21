'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';
import LeyendaColores from './LeyendaColores';
import NuestroProceso from './NuestroProceso';
import MarcasCarrusel from './MarcasCarrusel';
import Testimonios from './Testimonios';
import FAQ from './FAQ';

const ORDENES = [
  { key: 'alto-desc', label: 'Mayor diámetro' },
  { key: 'alto-asc', label: 'Menor diámetro' },
  { key: 'nombre', label: 'Nombre' },
];

export default function CatalogoCategoria({ categoria, productos }) {
  const [orden, setOrden] = useState('alto-desc');

  const hayGrupos = productos.some((p) => Array.isArray(p.alturas));

  const lista = useMemo(() => {
    return [...productos].sort((a, b) => {
      const da = a.diametro_cm ?? a.alto_cm ?? 0;
      const db = b.diametro_cm ?? b.alto_cm ?? 0;
      switch (orden) {
        case 'alto-asc':
          return da - db;
        case 'nombre':
          return a.nombre.localeCompare(b.nombre, 'es');
        case 'alto-desc':
        default:
          return db - da;
      }
    });
  }, [productos, orden]);

  return (
    <section>
      {/* ── Cabecera fotográfica full-width ── */}
      <div className="relative h-[340px] md:h-[420px] flex items-end overflow-hidden grain">
        <Image
          src={categoria.imagen}
          alt={`Velas de ${categoria.nombre}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: categoria.heroPos || '50% 50%',
            animation: 'slow-zoom 16s ease-out forwards',
          }}
        />
        <div className="absolute inset-0 veil-bottom" />
        <div className="absolute inset-0 veil-gold opacity-70" />

        <div className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-8 pb-10">
          <p className="type-eyebrow-light eyebrow-rule reveal">
            {categoria.eyebrow}
          </p>
          <h1 className="font-display text-[#F5F5EE] text-[clamp(40px,7vw,72px)] font-normal mt-4 leading-[0.98] reveal reveal-delay-1">
            {categoria.nombre}
            <sup className="text-[0.32em] text-[#C8D0A8] ml-2 align-top font-sans font-bold tracking-normal">
              {categoria.superindice}
            </sup>
          </h1>
        </div>
      </div>

      {/* ── Intro editorial ── */}
      <div className="border-b border-border-default bg-bg-base">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-[1fr_auto] gap-6 md:items-end">
          <p className="type-body text-[15px] leading-[1.9] max-w-xl">
            {categoria.descripcion}
          </p>
          <p className="type-label md:text-right whitespace-nowrap">
            {lista.length} formatos
          </p>
        </div>
      </div>

      {/* ── Barra de filtros sticky ── */}
      <div className="border-b border-border-default chrome-glass sticky top-[112px] z-30">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-[54px] flex items-center justify-between gap-6">
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
            <label className="flex items-center gap-2 shrink-0">
              <span className="type-label whitespace-nowrap hidden sm:inline">
                Ordenar por
              </span>
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="font-sans text-nav text-text-primary bg-transparent border-none focus:outline-none cursor-pointer pr-1"
              >
                {ORDENES.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {hayGrupos && <LeyendaColores className="hidden md:flex shrink-0" />}
        </div>
      </div>

      {/* ── Grilla de productos ── */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-10 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {lista.map((p, i) => (
            <ProductCard key={p.id} producto={p} index={i} />
          ))}
        </div>

        {lista.length === 0 && (
          <p className="type-body py-16 text-center">
            No hay formatos para este filtro.
          </p>
        )}
      </div>

      {/* ── Nuestro proceso ── */}
      <NuestroProceso categoria={categoria.slug} />

      {/* ── Prueba social ── */}
      <MarcasCarrusel categoria={categoria.slug} />
      <Testimonios />
      <FAQ />

      {/* ── CTA cotización ── */}
      <div className="relative overflow-hidden bg-black-graphic grain">
        <Image
          src="/images/editorial/llama.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 veil-full" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-20 text-center">
          <p className="type-eyebrow-light eyebrow-rule mx-auto">
            ¿No encuentras la medida?
          </p>
          <h2 className="font-display text-[#F5F5EE] text-[clamp(28px,4vw,44px)] font-normal mt-5 mb-8 leading-tight">
            Fabricamos formatos a pedido
          </h2>
          <Link href="/contacto" className="btn-light">
            Solicitar cotización
          </Link>
        </div>
      </div>
    </section>
  );
}
