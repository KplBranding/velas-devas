'use client';

import { useState } from 'react';

// Formato peso chileno: 1420 -> $1.420
export const clp = (n) => '$' + Number(n).toLocaleString('es-CL');

// Chips de altura seleccionables. Al elegir un alto, muestra el valor neto
// unitario correspondiente. Si el grupo no tiene precios -> "Consultar precios".
export default function SelectorAltura({
  alturas,
  consultar = false,
  label = 'Alto disponible (cm)',
}) {
  const [sel, setSel] = useState(0);
  const activo = alturas[sel] || alturas[0];
  const sinPrecio = consultar || activo?.neto == null;

  return (
    <div className="mt-2.5">
      <p className="type-label mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {alturas.map((a, i) => (
          <button
            key={a.alto}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={i === sel}
            className={`font-sans text-[11px] leading-none rounded-full px-2.5 py-[4px] border press transition-colors ${
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
    </div>
  );
}
