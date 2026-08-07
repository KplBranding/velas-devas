'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useCotizacion } from '../context/CotizacionContext';
import { clp } from '../lib/utils';

const num = (s) => parseFloat(String(s).replace(',', '.'));

// ── Configurador de velones (un módulo para todos los diámetros) ────────────
export default function ConfiguradorVelones({ productos, galeria = [], titulo, lead }) {
  const { agregar } = useCotizacion();

  // Ordena los diámetros de menor a mayor. El visual es una galería de fotos
  // reales COMPARTIDA (no depende del diámetro): muestra los cirios/velones y su
  // acabado. Las medidas se eligen con los selectores de diámetro y alto.
  const diams = useMemo(
    () =>
      [...productos]
        .sort((a, b) => a.diametro_cm - b.diametro_cm)
        .map((p) => ({ ...p, label: String(p.diametro_cm).replace('.', ',') })),
    [productos]
  );

  // Galería: hasta 6 fotos reales. Cada entrada puede ser un string (ruta) o un
  // objeto { src, color } para mostrar el color (marfil / blanco nieve) por foto.
  const fotos = galeria
    .slice(0, 6)
    .map((f) => (typeof f === 'string' ? { src: f } : f));
  const hayFotos = fotos.length > 0;

  const destacadoIdx = Math.max(
    0,
    diams.findIndex((d) => d.destacado)
  );
  const [di, setDi] = useState(destacadoIdx);
  const [ai, setAi] = useState(0);
  const [imgIdx, setImgIdx] = useState(0); // índice en la galería de fotos
  const [pausado, setPausado] = useState(false); // autoplay en pausa (hover)
  const [cant, setCant] = useState(1);
  const [tablaAbierta, setTablaAbierta] = useState(false);

  const actual = fotos[imgIdx] || fotos[0] || {};
  const navegar = (dir) =>
    setImgIdx((i) => (i + dir + fotos.length) % fotos.length);

  // Autoplay del carrusel: avanza una foto tras otra. Se pausa al pasar el mouse
  // y se desactiva si el usuario prefiere menos movimiento. Se re-arma en cada
  // cambio de imagen (así una navegación manual reinicia el temporizador).
  useEffect(() => {
    if (pausado || fotos.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(
      () => setImgIdx((i) => (i + 1) % fotos.length),
      4200
    );
    return () => clearTimeout(t);
  }, [imgIdx, pausado, fotos.length]);

  const prod = diams[di];
  const alt = prod.alturas[ai] || prod.alturas[0];
  const color = prod.color_nombre || 'Blanco nieve';

  const seleccionarDiametro = (i) => {
    setDi(i);
    setAi(0);
  };

  const agregarLinea = () => {
    if (alt?.neto == null) return;
    agregar({
      id: `${prod.id}__${alt.alto}__${color}`,
      productId: prod.id,
      nombre: prod.nombre,
      medida: alt.alto,
      medidaLabel: 'Alto (cm)',
      sku: alt.sku || null,
      neto: alt.neto ?? null,
      color,
      cantidad: cant,
    });
    setCant(1);
  };

  // Columnas de la tabla: unión de alturas de todos los diámetros, orden numérico.
  const columnas = useMemo(() => {
    const set = new Set();
    diams.forEach((d) => d.alturas.forEach((a) => set.add(a.alto)));
    return [...set].sort((a, b) => num(a) - num(b));
  }, [diams]);

  const chip = (activo) =>
    `font-sans text-[13px] leading-none rounded-full px-4 py-2.5 border press transition-colors duration-[var(--dur-base)] tabular-nums ${
      activo
        ? 'border-text-primary bg-text-primary text-bg-base'
        : 'border-border-default text-text-body hover:border-text-muted'
    }`;

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 pt-10 pb-16">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* ── Galería de fotos reales (carrusel) ── */}
        <div className="md:sticky md:top-[128px]">
          <div
            className="group/gal relative aspect-square rounded-[4px] border border-border-default overflow-hidden bg-bg-hero"
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
          >
            {hayFotos ? (
              <>
                <Image
                  key={actual.src}
                  src={actual.src}
                  alt="Cirios y velones litúrgicos Devas"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover animate-[fadeIn_.5s_ease]"
                />

                {/* Label fijo: imágenes referenciales */}
                <span className="absolute top-3 left-3 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[#EDEFE4] bg-graphite/80 rounded-full px-3 py-1.5 backdrop-blur-sm">
                  Imágenes referenciales
                </span>

                {/* Label de color por foto */}
                {actual.color && (
                  <span className="absolute top-3 right-3 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-text-primary bg-bg-base/85 rounded-full px-3 py-1.5 backdrop-blur-sm">
                    {actual.color}
                  </span>
                )}

                {/* Flechas laterales */}
                {fotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => navegar(-1)}
                      aria-label="Foto anterior"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-bg-base/85 border border-border-default text-text-primary hover:bg-bg-base transition-all press backdrop-blur-sm md:opacity-0 md:group-hover/gal:opacity-100 focus-visible:opacity-100"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => navegar(1)}
                      aria-label="Foto siguiente"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-bg-base/85 border border-border-default text-text-primary hover:bg-bg-base transition-all press backdrop-blur-sm md:opacity-0 md:group-hover/gal:opacity-100 focus-visible:opacity-100"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Contador */}
                    <span className="absolute bottom-3 right-3 font-sans text-[11px] font-bold tabular-nums text-[#EDEFE4] bg-graphite/80 rounded-full px-2.5 py-1 backdrop-blur-sm">
                      {String(imgIdx + 1).padStart(2, '0')} / {String(fotos.length).padStart(2, '0')}
                    </span>
                  </>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="type-label">Galería próximamente</span>
              </div>
            )}
          </div>

          {/* Miniaturas */}
          {fotos.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2.5">
              {fotos.map((f, i) => (
                <button
                  key={f.src}
                  type="button"
                  onClick={() => setImgIdx(i)}
                  aria-pressed={i === imgIdx}
                  aria-label={`Ver foto ${i + 1}`}
                  className={`relative w-16 h-16 rounded-[3px] overflow-hidden border press transition-colors ${
                    i === imgIdx
                      ? 'border-text-primary'
                      : 'border-border-default hover:border-text-muted'
                  }`}
                >
                  <Image src={f.src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Selectores + precio ── */}
        <div>
          <p className="type-eyebrow eyebrow-rule">Velón litúrgico · {color}</p>
          <h3 className="type-section text-[clamp(26px,3.2vw,36px)] mt-3">
            {titulo || 'Velón para uso religioso'}
          </h3>
          <p className="type-body text-[14px] leading-[1.8] mt-4 max-w-md">
            {lead ||
              'Un solo producto, todas sus medidas. Elige el diámetro y el alto que necesitas: el precio se ajusta al instante.'}
          </p>

          {/* Diámetro */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between mb-3">
              <span className="type-eyebrow">Diámetro</span>
              <span className="type-label">del velón, en cm</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {diams.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => seleccionarDiametro(i)}
                  aria-pressed={i === di}
                  className={chip(i === di)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alto */}
          <div className="mt-6">
            <div className="flex items-baseline justify-between mb-3">
              <span className="type-eyebrow">Alto</span>
              <span className="type-label">disponible para este diámetro, en cm</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {prod.alturas.map((a, i) => (
                <button
                  key={a.alto}
                  type="button"
                  onClick={() => setAi(i)}
                  aria-pressed={i === ai}
                  className={chip(i === ai)}
                >
                  {a.alto}
                </button>
              ))}
            </div>
          </div>

          {/* Precio */}
          <div className="mt-7 pt-6 border-t border-border-default flex items-baseline gap-2.5">
            {alt?.neto == null ? (
              <span className="font-sans text-[15px] text-text-primary font-medium">
                Consultar precios
              </span>
            ) : (
              <>
                <span className="font-display text-[30px] text-text-primary leading-none">
                  {clp(alt.neto)}
                </span>
                <span className="type-label">valor unitario · + IVA</span>
              </>
            )}
          </div>
          <p className="type-label mt-1.5">
            Ø {prod.label} × {alt.alto} cm{alt.sku ? ` · SKU ${alt.sku}` : ''}
          </p>

          {/* Cantidad + agregar */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2.5">
            <div className="inline-flex items-center border border-border-default rounded-full shrink-0 overflow-hidden self-start">
              <button
                type="button"
                onClick={() => setCant((q) => Math.max(1, q - 1))}
                aria-label="Menos"
                className="w-11 h-11 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-hero transition-colors duration-[var(--dur-fast)] press"
              >
                –
              </button>
              <span className="w-9 text-center font-sans text-[14px] text-text-primary tabular-nums">
                {cant}
              </span>
              <button
                type="button"
                onClick={() => setCant((q) => q + 1)}
                aria-label="Más"
                className="w-11 h-11 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-hero transition-colors duration-[var(--dur-fast)] press"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={agregarLinea}
              disabled={alt?.neto == null}
              className="w-full sm:flex-1 font-sans text-[12px] font-bold uppercase tracking-[0.05em] text-bg-base bg-graphite hover:bg-[#1F261F] rounded-[4px] py-3 px-4 press transition-colors disabled:opacity-40"
            >
              Agregar a la cotización
            </button>
          </div>

          <button
            type="button"
            onClick={() => setTablaAbierta((v) => !v)}
            aria-expanded={tablaAbierta}
            className="mt-6 font-sans text-[13px] font-bold text-accent-mid underline underline-offset-4 hover:text-text-primary transition-colors"
          >
            {tablaAbierta
              ? 'Ocultar tabla de medidas y precios'
              : 'Ver tabla completa de medidas y precios'}
          </button>
        </div>
      </div>

      {/* ── Tabla matriz (diámetro × alto) ── */}
      {tablaAbierta && (
        <div className="mt-10 pt-8 border-t border-border-default">
          <h4 className="type-section text-[clamp(20px,2.4vw,26px)]">
            Tabla de medidas y precios
          </h4>
          <p className="type-label mt-1.5">
            Valor unitario neto (+ IVA). Filas = diámetro, columnas = alto en cm.
          </p>
          <div className="mt-5 overflow-x-auto border border-border-default rounded-[4px]">
            <table className="w-full border-collapse text-[13px] tabular-nums">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-bg-card-1 text-left font-sans font-bold text-[10px] uppercase tracking-[0.08em] text-text-primary px-3 py-2.5 border-b border-border-default">
                    Ø / alto
                  </th>
                  {columnas.map((c) => (
                    <th
                      key={c}
                      className="bg-bg-card-1 text-right font-sans font-bold text-[10px] uppercase tracking-[0.08em] text-text-primary px-3 py-2.5 border-b border-border-default whitespace-nowrap"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {diams.map((d) => (
                  <tr key={d.id} className="hover:bg-bg-hero/60">
                    <td className="sticky left-0 bg-bg-base text-left font-sans font-bold text-text-primary px-3 py-2.5 border-b border-border-default whitespace-nowrap">
                      Ø {d.label} cm
                    </td>
                    {columnas.map((c) => {
                      const f = d.alturas.find((a) => a.alto === c);
                      return (
                        <td
                          key={c}
                          className={`text-right px-3 py-2.5 border-b border-border-default whitespace-nowrap ${
                            f ? 'text-text-body' : 'text-border-default'
                          }`}
                        >
                          {f ? clp(f.neto) : '·'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
