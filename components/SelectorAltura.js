'use client';

import { useState } from 'react';
import { useCotizacion } from '../context/CotizacionContext';

// Formato peso chileno: 1420 -> $1.420
export const clp = (n) => '$' + Number(n).toLocaleString('es-CL');

// Chips de altura seleccionables. Al elegir un alto, muestra el valor neto
// unitario correspondiente. Si el grupo no tiene precios -> "Consultar precios".
// Si `agregable`, incluye cantidad + "Agregar a cotización".
export default function SelectorAltura({
  alturas,
  consultar = false,
  label = 'Alto disponible (cm)',
  producto,
  agregable = false,
}) {
  const [sel, setSel] = useState(0);
  const [cant, setCant] = useState(1);
  const { agregar } = useCotizacion();
  const activo = alturas[sel] || alturas[0];
  const sinPrecio = consultar || activo?.neto == null;

  const agregarLinea = () => {
    if (!producto || !activo) return;
    const color = producto.color_nombre || 'Blanco nieve';
    agregar({
      id: `${producto.id}__${activo.alto}__${color}`,
      productId: producto.id,
      nombre: producto.nombre,
      medida: activo.alto,
      medidaLabel: label,
      sku: activo.sku || null,
      neto: activo.neto ?? null,
      color,
      cantidad: cant,
    });
    setCant(1);
  };

  return (
    <div className="mt-2.5">
      <p className="type-label mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-2">
        {alturas.map((a, i) => (
          <button
            key={a.alto}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={i === sel}
            className={`font-sans text-[12px] leading-none rounded-full px-3.5 py-2 border press transition-colors duration-[var(--dur-base)] ${
              i === sel
                ? 'border-text-primary bg-text-primary text-bg-base'
                : 'border-border-default text-text-body hover:border-text-muted'
            }`}
          >
            {a.alto}
          </button>
        ))}
      </div>

      <div className="mt-2.5 min-h-[22px] flex items-baseline gap-2">
        {sinPrecio ? (
          <span className="font-sans text-[13px] text-text-primary font-medium">
            Consultar precios
          </span>
        ) : (
          <>
            <span className="font-display text-[19px] text-text-primary leading-none">
              {clp(activo.neto)}
            </span>
            <span className="type-label">c/u + IVA</span>
          </>
        )}
      </div>

      {agregable && (
        <div className="mt-3 flex items-center gap-2">
          <div className="inline-flex items-center border border-border-default rounded-full shrink-0 overflow-hidden">
            <button
              type="button"
              onClick={() => setCant((q) => Math.max(1, q - 1))}
              aria-label="Menos"
              className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-hero transition-colors duration-[var(--dur-fast)] press"
            >
              –
            </button>
            <span className="w-8 text-center font-sans text-[14px] text-text-primary tabular-nums">
              {cant}
            </span>
            <button
              type="button"
              onClick={() => setCant((q) => q + 1)}
              aria-label="Más"
              className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-hero transition-colors duration-[var(--dur-fast)] press"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={agregarLinea}
            className="flex-1 font-sans text-[11px] font-bold uppercase tracking-[0.05em] text-bg-base bg-graphite hover:bg-[#1F261F] rounded-[4px] py-2 px-2 press transition-colors"
          >
            Agregar
          </button>
        </div>
      )}
    </div>
  );
}
