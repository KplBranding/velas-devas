'use client';

import { useState } from 'react';
import { clp, medidaDe } from '../lib/utils';

// Tabla completa de medidas y precios para los catálogos en tarjetas
// (Banquetería, Funerarias). Mismo patrón que la tabla del configurador de
// Religiosas: cerrada por defecto, pero SIEMPRE presente en el HTML (`hidden`),
// para que buscadores y asistentes lean todos los precios y no solo el de la
// medida seleccionada en cada tarjeta.
export default function TablaPrecios({ productos }) {
  const [abierta, setAbierta] = useState(false);

  // Una fila por medida. Los productos sin medidas (vela flotante) van como
  // una sola fila con su precio propio.
  const grupos = productos
    .map((p) => ({
      id: p.id,
      nombre: p.nombre,
      filas: (p.alturas?.length ? p.alturas : [{ sku: p.sku, neto: p.neto }]).map((a) => ({
        medida: medidaDe(p, a),
        sku: a.sku,
        neto: p.consultarPrecio ? null : a.neto,
      })),
    }))
    .filter((g) => g.filas.length);

  if (!grupos.length) return null;

  const TH =
    'bg-bg-card-1 font-sans font-bold text-[10px] uppercase tracking-[0.08em] text-text-primary px-3 py-2.5 border-b border-border-default whitespace-nowrap';
  const TD = 'px-3 py-2.5 border-b border-border-default whitespace-nowrap';

  return (
    <div className="mt-14">
      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        className="font-sans text-[13px] font-bold text-accent-mid underline underline-offset-4 hover:text-text-primary transition-colors"
      >
        {abierta
          ? 'Ocultar tabla de medidas y precios'
          : 'Ver tabla completa de medidas y precios'}
      </button>

      <div hidden={!abierta} className="mt-8 pt-8 border-t border-border-default">
        <h3 className="type-section text-[clamp(20px,2.4vw,26px)]">
          Tabla de medidas y precios
        </h3>
        <p className="type-label mt-1.5">Valor unitario neto (+ IVA).</p>
        <div className="mt-5 overflow-x-auto border border-border-default rounded-[4px]">
          <table className="w-full border-collapse text-[13px] tabular-nums">
            <thead>
              <tr>
                <th scope="col" className={`${TH} text-left`}>Producto</th>
                <th scope="col" className={`${TH} text-left`}>Medida</th>
                {/* SKU: se omite en móvil para que el precio quepa sin desplazar. */}
                <th scope="col" className={`${TH} text-left hidden sm:table-cell`}>SKU</th>
                <th scope="col" className={`${TH} text-right`}>Valor neto</th>
              </tr>
            </thead>
            <tbody>
              {grupos.map((g) =>
                g.filas.map((f, i) => (
                  <tr key={`${g.id}-${i}`} className="hover:bg-bg-hero/60">
                    {/* El nombre va una vez por producto y abarca sus filas. */}
                    {i === 0 && (
                      <th
                        scope="rowgroup"
                        rowSpan={g.filas.length}
                        className={`${TD} !whitespace-normal bg-bg-base text-left align-top font-sans font-bold text-text-primary`}
                      >
                        {g.nombre}
                      </th>
                    )}
                    <td className={`${TD} text-text-body`}>{f.medida}</td>
                    <td className={`${TD} text-text-muted hidden sm:table-cell`}>{f.sku || '·'}</td>
                    <td className={`${TD} text-right text-text-body`}>
                      {f.neto != null ? clp(f.neto) : 'Consultar'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
