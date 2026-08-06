'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useCotizacion } from '../context/CotizacionContext';
import { clp } from '../lib/utils';

const num = (s) => parseFloat(String(s).replace(',', '.'));

// ── Silueta a escala real ──────────────────────────────────────────────────
// A diferencia de VelaSVG (que normaliza proporciones para el placeholder), esta
// dibuja el velón a ESCALA sobre una regla en cm: es lo que la foto no puede
// comunicar. El "fantasma" punteado marca el alto máximo del diámetro elegido,
// para leer el alto seleccionado como fracción del rango.
function SiluetaEscala({ diam, diamLabel, alto, altoMax }) {
  // Lienzo 4:5 (vertical): coincide con las fotos del catálogo y da más aire
  // vertical a los velones altos.
  const W = 400,
    H = 500,
    padT = 30,
    padB = 46,
    padL = 62,
    padR = 26;
  const availH = H - padT - padB;
  const availW = W - padL - padR;
  const D = diam;
  const A = num(alto);
  const Amax = Math.max(altoMax, A);

  // Escala: encaja el alto máximo del diámetro; si el cuerpo queda muy ancho,
  // reduce para no invadir la regla.
  let s = availH / Amax;
  if (D * s > availW * 0.7) s = (availW * 0.7) / D;

  const baseY = H - padB;
  const cw = D * s;
  const ch = A * s;
  const ghostH = Amax * s;
  const cx = padL + availW * 0.62;
  const gx = cx - cw / 2;
  const rx = Math.min(cw / 2, 6);

  const step = Amax > 60 ? 20 : Amax > 25 ? 10 : 5;
  const ticks = [];
  for (let cm = 0; cm <= Amax + 0.001; cm += step) {
    const y = baseY - cm * s;
    ticks.push(
      <g key={cm}>
        <line x1={padL - 8} y1={y} x2={padL} y2={y} stroke="#9AA48C" strokeWidth="1" />
        <line
          x1={padL}
          y1={y}
          x2={W - padR}
          y2={y}
          stroke="#CDD3BE"
          strokeWidth="1"
          strokeDasharray="2 5"
        />
        <text
          x={padL - 12}
          y={y + 3.5}
          textAnchor="end"
          fontFamily="var(--font-sans)"
          fontSize="10"
          fill="#7A8471"
        >
          {cm}
        </text>
      </g>
    );
  }

  const flameY = baseY - ch;
  const wick = Math.min(ch * 0.12, 9);

  return (
    <svg
      viewBox="0 0 400 500"
      className="w-full h-full"
      role="img"
      aria-label={`Silueta a escala: velón de ${diamLabel} cm de diámetro por ${alto} cm de alto`}
    >
      <defs>
        <linearGradient id="wax-escala" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FBFBF6" />
          <stop offset="1" stopColor="#E7E9DA" />
        </linearGradient>
      </defs>

      {ticks}
      <text
        x={padL - 42}
        y={padT + 6}
        fontFamily="var(--font-sans)"
        fontSize="9"
        letterSpacing="1"
        fill="#9AA48C"
      >
        CM
      </text>

      {/* Fantasma: alto máximo del diámetro */}
      <rect
        x={gx}
        y={baseY - ghostH}
        width={cw}
        height={ghostH}
        rx={rx}
        fill="none"
        stroke="#B9C0A6"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.8"
      />

      {/* Cuerpo a escala */}
      <rect
        x={gx}
        y={baseY - ch}
        width={cw}
        height={ch}
        rx={rx}
        fill="url(#wax-escala)"
        stroke="#B7BDA2"
        strokeWidth="1"
      />
      <rect
        x={gx}
        y={baseY - ch}
        width={Math.max(cw * 0.26, 3)}
        height={ch}
        rx={rx}
        fill="#ffffff"
        opacity="0.45"
      />

      {/* Mecha + llama */}
      <line x1={cx} y1={flameY} x2={cx} y2={flameY - wick} stroke="#6B5A3A" strokeWidth="1.4" />
      <ellipse cx={cx} cy={flameY - wick - 6} rx="4.5" ry="8" fill="#E9B44C" />
      <ellipse cx={cx} cy={flameY - wick - 5} rx="2" ry="4.5" fill="#F6E27A" />

      {/* Cota de diámetro */}
      <line x1={gx} y1={baseY + 14} x2={gx + cw} y2={baseY + 14} stroke="#607860" strokeWidth="1" />
      <line x1={gx} y1={baseY + 10} x2={gx} y2={baseY + 18} stroke="#607860" strokeWidth="1" />
      <line x1={gx + cw} y1={baseY + 10} x2={gx + cw} y2={baseY + 18} stroke="#607860" strokeWidth="1" />
      <text
        x={cx}
        y={baseY + 30}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="11"
        fontWeight="700"
        fill="#485848"
      >
        Ø {diamLabel} cm
      </text>
    </svg>
  );
}

// ── Configurador de velones (un módulo para todos los diámetros) ────────────
export default function ConfiguradorVelones({ productos, titulo, lead }) {
  const { agregar } = useCotizacion();

  // Ordena por diámetro asc. Precalcula, para cada diámetro sin foto propia, la
  // foto del diámetro más cercano que sí tenga (para la pestaña "Foto").
  const diams = useMemo(() => {
    const orden = [...productos].sort((a, b) => a.diametro_cm - b.diametro_cm);
    const conFoto = orden.filter((p) => p.imagenes?.length);
    return orden.map((p) => {
      const propia = p.imagenes?.length ? p : null;
      const cercano =
        propia ||
        conFoto.reduce(
          (best, c) =>
            best == null ||
            Math.abs(c.diametro_cm - p.diametro_cm) <
              Math.abs(best.diametro_cm - p.diametro_cm)
              ? c
              : best,
          null
        );
      return {
        ...p,
        label: String(p.diametro_cm).replace('.', ','),
        fotos: (propia || cercano)?.imagenes || [],
        fotoReal: !!propia,
      };
    });
  }, [productos]);

  const destacadoIdx = Math.max(
    0,
    diams.findIndex((d) => d.destacado)
  );
  const [di, setDi] = useState(destacadoIdx);
  const [ai, setAi] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [cant, setCant] = useState(1);
  const [vista, setVista] = useState('escala'); // 'escala' | 'foto'
  const [tablaAbierta, setTablaAbierta] = useState(false);

  const prod = diams[di];
  const alt = prod.alturas[ai] || prod.alturas[0];
  const altoMax = Math.max(...prod.alturas.map((a) => num(a.alto)));
  const color = prod.color_nombre || 'Blanco nieve';

  const seleccionarDiametro = (i) => {
    setDi(i);
    setAi(0);
    setImgIdx(0);
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
        {/* ── Visual: escala / foto ── */}
        <div className="md:sticky md:top-[128px]">
          <div className="rounded-[4px] border border-border-default overflow-hidden bg-bg-hero">
            <div className="flex border-b border-border-default">
              {[
                ['escala', 'Tamaño real (a escala)'],
                ['foto', 'Foto'],
              ].map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setVista(k)}
                  aria-pressed={vista === k}
                  className={`flex-1 font-sans text-[11px] font-bold uppercase tracking-[0.06em] py-3 transition-colors press ${
                    vista === k
                      ? 'text-text-primary shadow-[inset_0_-2px_0_var(--accent-mid)]'
                      : 'text-text-muted hover:text-text-body'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="relative aspect-[4/5]">
              {vista === 'escala' ? (
                <>
                  <SiluetaEscala
                    diam={prod.diametro_cm}
                    diamLabel={prod.label}
                    alto={alt.alto}
                    altoMax={altoMax}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 py-3 bg-gradient-to-t from-bg-hero via-bg-hero/85 to-transparent">
                    <span className="type-label">Silueta a escala real · regla en cm</span>
                    <span className="font-display text-[15px] text-text-primary tabular-nums">
                      Ø {prod.label} × {alt.alto} cm
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <Image
                    key={prod.fotos[imgIdx] || prod.id}
                    src={prod.fotos[imgIdx] || '/images/editorial/llama.jpg'}
                    alt={`Velón litúrgico Ø ${prod.label} cm`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 bottom-3 font-sans text-[11px] text-[#EDEFE4] bg-graphite/85 rounded-[3px] px-2.5 py-1.5">
                    {prod.fotoReal
                      ? 'Foto real · el acabado y color son iguales en todas las medidas'
                      : 'Foto referencial · mismo acabado y color'}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Miniaturas (solo cuando el diámetro tiene fotos propias) */}
          {vista === 'foto' && prod.fotoReal && prod.fotos.length > 1 && (
            <div className="mt-3 flex gap-2.5">
              {prod.fotos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setImgIdx(i)}
                  aria-pressed={i === imgIdx}
                  className={`relative w-16 h-16 rounded-[3px] overflow-hidden border press transition-colors ${
                    i === imgIdx ? 'border-text-primary' : 'border-border-default'
                  }`}
                >
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
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
              'Un solo producto, todas sus medidas. Elige el diámetro y el alto que necesitas: el precio y la silueta se ajustan al instante.'}
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
