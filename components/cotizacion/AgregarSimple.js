'use client';

import { useState } from 'react';
import { useCotizacion } from '../../context/CotizacionContext';

// Cantidad + "Agregar a cotización" para productos de precio único (sin medidas).
export default function AgregarSimple({ producto }) {
  const [cant, setCant] = useState(1);
  const { agregar } = useCotizacion();

  const add = () => {
    const color = producto.color_nombre || 'Blanco nieve';
    agregar({
      id: `${producto.id}__unico__${color}`,
      productId: producto.id,
      nombre: producto.nombre,
      medida: null,
      medidaLabel: null,
      sku: producto.sku || null,
      neto: producto.neto ?? null,
      color,
      cantidad: cant,
    });
    setCant(1);
  };

  return (
    <div className="mt-3 flex items-center gap-2">
      <div className="inline-flex items-center border border-border-default rounded-full shrink-0">
        <button
          type="button"
          onClick={() => setCant((q) => Math.max(1, q - 1))}
          aria-label="Menos"
          className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary press"
        >
          –
        </button>
        <span className="w-7 text-center font-sans text-[13px] text-text-primary">
          {cant}
        </span>
        <button
          type="button"
          onClick={() => setCant((q) => q + 1)}
          aria-label="Más"
          className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary press"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={add}
        className="flex-1 font-sans text-[11px] font-bold uppercase tracking-[0.05em] text-bg-base bg-graphite hover:bg-[#1F261F] rounded-[4px] py-2 px-2 press transition-colors"
      >
        Agregar
      </button>
    </div>
  );
}
