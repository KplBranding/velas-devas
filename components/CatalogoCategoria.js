'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import VelaSVG from './VelaSVG';

const FILTROS = [
  { key: 'todos', label: 'Todos' },
  { key: 'blanca', label: 'Blanca' },
  { key: 'marfil', label: 'Marfil' },
];

const ORDENES = [
  { key: 'destacado', label: 'Destacados' },
  { key: 'alto-asc', label: 'Menor tamaño' },
  { key: 'alto-desc', label: 'Mayor tamaño' },
  { key: 'nombre', label: 'Nombre' },
];

export default function CatalogoCategoria({ categoria, productos }) {
  const [filtro, setFiltro] = useState('todos');
  const [orden, setOrden] = useState('destacado');

  const lista = useMemo(() => {
    let out = productos.filter((p) =>
      filtro === 'todos' ? true : p.color === filtro
    );
    out = [...out].sort((a, b) => {
      switch (orden) {
        case 'alto-asc':
          return a.alto_cm - b.alto_cm;
        case 'alto-desc':
          return b.alto_cm - a.alto_cm;
        case 'nombre':
          return a.nombre.localeCompare(b.nombre, 'es');
        default:
          return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
      }
    });
    return out;
  }, [productos, filtro, orden]);

  return (
    <section>
      {/* Cabecera de categoría full-width */}
      <div
        className="relative h-[240px] flex items-center overflow-hidden"
        style={{ backgroundColor: categoria.heroBg }}
      >
        {/* Velas decorativas de fondo */}
        <div className="absolute inset-0 flex items-end justify-end gap-6 pr-10 opacity-20 pointer-events-none">
          {[70, 45, 60, 35].map((h, i) => (
            <VelaSVG
              key={i}
              alto={h}
              diametro={3}
              color="marfil"
              className="h-[85%] w-auto"
            />
          ))}
        </div>
        <div className="relative max-w-6xl mx-auto w-full px-5 md:px-8">
          <p className="type-eyebrow" style={{ color: '#C9A55C' }}>
            {categoria.eyebrow}
          </p>
          <h1 className="font-display text-[#FAFAF8] text-[clamp(32px,5vw,52px)] font-normal mt-2 leading-none">
            {categoria.nombre}
            <sup className="text-[0.4em] text-gold ml-1 align-top">
              {categoria.superindice}
            </sup>
          </h1>
        </div>
      </div>

      {/* Barra de filtros */}
      <div className="border-b border-border-default bg-bg-base sticky top-[52px] md:top-[94px] z-30">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-[52px] flex items-center justify-between">
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
            {FILTROS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFiltro(f.key)}
                className={`font-sans text-nav whitespace-nowrap transition-colors ${
                  filtro === f.key
                    ? 'text-text-primary'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 shrink-0">
            <span className="type-label whitespace-nowrap hidden sm:inline">
              Ordenar
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
      </div>

      {/* Descripción + conteo */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-10 pb-6">
        <p className="type-body max-w-xl">{categoria.descripcion}</p>
        <p className="type-label mt-3">{lista.length} formatos disponibles</p>
      </div>

      {/* Grilla de productos */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-border-default">
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

      {/* CTA cotización */}
      <div className="bg-bg-hero border-t border-border-default">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 text-center">
          <p className="type-eyebrow">¿No encuentras la medida?</p>
          <h2 className="type-section mt-3 mb-6">
            Fabricamos formatos a pedido
          </h2>
          <Link href="/contacto" className="btn-primary">
            Solicitar cotización
          </Link>
        </div>
      </div>
    </section>
  );
}
