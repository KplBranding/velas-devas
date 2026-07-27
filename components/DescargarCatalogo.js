'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Utilidades RUT (Chile) ──
function limpiarRut(rut) {
  return (rut || '').replace(/[^0-9kK]/g, '').toUpperCase();
}
function validarRut(rut) {
  const c = limpiarRut(rut);
  if (c.length < 2) return false;
  const cuerpo = c.slice(0, -1);
  const dv = c.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;
  let suma = 0;
  let mul = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const res = 11 - (suma % 11);
  const dvEsperado = res === 11 ? '0' : res === 10 ? 'K' : String(res);
  return dv === dvEsperado;
}
function formatRut(rut) {
  const c = limpiarRut(rut);
  if (c.length < 2) return rut;
  const cuerpo = c.slice(0, -1);
  const dv = c.slice(-1);
  return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
}

const EASE = [0.23, 1, 0.32, 1];

// Chip "Descargar catálogo PDF" + modal de captura (empresa, RUT, correo).
// Al enviar, se registra el lead y se descarga el PDF de precios de la categoría.
// Si la categoría no tiene `pdf`, el chip no se muestra.
export default function DescargarCatalogo({ className = '', pdf, categoria }) {
  const [abierto, setAbierto] = useState(false);
  const [datos, setDatos] = useState({ empresa: '', rut: '', email: '' });
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);

  const set = (k) => (e) => {
    const v = e.target.value;
    setDatos((d) => ({ ...d, [k]: v }));
    if (errores[k]) setErrores((er) => ({ ...er, [k]: null }));
  };

  const cerrar = useCallback(() => {
    setAbierto(false);
    // Reset tras la animación de salida.
    window.setTimeout(() => {
      setListo(false);
      setEnviando(false);
      setDatos({ empresa: '', rut: '', email: '' });
      setErrores({});
    }, 320);
  }, []);

  // Bloqueo de scroll + cierre con Escape mientras el modal está abierto.
  useEffect(() => {
    if (!abierto) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && cerrar();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [abierto, cerrar]);

  const validar = () => {
    const err = {};
    if (!datos.empresa.trim()) err.empresa = 'Ingresa el nombre de tu empresa.';
    if (!validarRut(datos.rut)) err.rut = 'RUT inválido. Ej: 76.123.456-7';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email))
      err.email = 'Ingresa un correo válido.';
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  // Dispara la descarga del PDF de la categoría (usa el nombre del archivo).
  const descargarPdf = useCallback(() => {
    if (!pdf) return;
    const a = document.createElement('a');
    a.href = pdf;
    a.download = pdf.split('/').pop() || 'catalogo.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [pdf]);

  const enviar = async (e) => {
    e.preventDefault();
    if (!validar()) return;
    setEnviando(true);
    try {
      await fetch('/api/catalogo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datos, rut: formatRut(datos.rut), categoria }),
      });
    } catch (_) {
      /* silencioso: igual entregamos el PDF (el lead se reintenta luego) */
    }
    setEnviando(false);
    setListo(true);
    // Entrega inmediata del PDF una vez capturado el lead.
    descargarPdf();
  };

  // Sin PDF definido para la categoría → no mostramos la opción de descarga.
  if (!pdf) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className={`group inline-flex items-center gap-2 rounded-full border border-border-default hover:border-text-muted bg-bg-base/60 hover:bg-bg-base px-3.5 py-2 font-sans text-[12px] font-medium text-text-primary transition-colors press whitespace-nowrap ${className}`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold transition-transform duration-[var(--dur-base)] group-hover:translate-y-0.5"
          aria-hidden
        >
          <path d="M12 3v12" />
          <path d="M7 11l5 4 5-4" />
          <path d="M5 20h14" />
        </svg>
        Descargar catálogo PDF
      </button>

      <AnimatePresence>
        {abierto && (
          <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Fondo */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={cerrar}
            />

            {/* Tarjeta */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Descargar catálogo en PDF"
              className="relative w-full sm:max-w-md bg-bg-base rounded-t-[16px] sm:rounded-[12px] shadow-lift border border-border-default overflow-hidden"
              style={{
                paddingBottom: 'env(safe-area-inset-bottom)',
              }}
              initial={{ opacity: 0, y: 40, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.99 }}
              transition={{ duration: 0.34, ease: EASE }}
            >
              {/* Cerrar */}
              <button
                type="button"
                onClick={cerrar}
                aria-label="Cerrar"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border border-border-default text-text-body hover:text-text-primary hover:bg-bg-hero transition-colors press"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {listo ? (
                // ── Confirmación ──
                <div className="px-6 sm:px-8 py-12 text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-gold-light flex items-center justify-center">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12.5l4.2 4.2L19 7"
                        stroke="#485848"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-[22px] text-text-primary mt-5">
                    ¡Listo!
                  </h3>
                  <p className="type-body text-[14px] mt-2 max-w-[320px] mx-auto">
                    Tu catálogo con precios se está descargando. Si no comenzó
                    automáticamente,{' '}
                    <button
                      type="button"
                      onClick={descargarPdf}
                      className="text-text-primary font-medium underline underline-offset-2 hover:text-accent-mid transition-colors"
                    >
                      descárgalo aquí
                    </button>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={cerrar}
                    className="btn-primary mt-7 inline-block"
                  >
                    Entendido
                  </button>
                </div>
              ) : (
                // ── Formulario ──
                <form onSubmit={enviar} className="px-6 sm:px-8 pt-8 pb-7" noValidate>
                  <p className="type-eyebrow eyebrow-rule">Catálogo con precios</p>
                  <h3 className="font-display text-[clamp(21px,4vw,26px)] text-text-primary leading-tight mt-3">
                    Descarga la lista completa en PDF
                  </h3>
                  <p className="type-body text-[13.5px] mt-2.5">
                    Déjanos tus datos y descarga al instante el catálogo con
                    precios en PDF.
                  </p>

                  <div className="mt-6 space-y-4">
                    <Campo
                      label="Empresa"
                      value={datos.empresa}
                      onChange={set('empresa')}
                      placeholder="Nombre de tu empresa"
                      autoComplete="organization"
                      error={errores.empresa}
                    />
                    <Campo
                      label="RUT empresa"
                      value={datos.rut}
                      onChange={set('rut')}
                      placeholder="76.123.456-7"
                      inputMode="text"
                      error={errores.rut}
                    />
                    <Campo
                      label="Correo"
                      type="email"
                      value={datos.email}
                      onChange={set('email')}
                      placeholder="tucorreo@empresa.cl"
                      inputMode="email"
                      autoComplete="email"
                      error={errores.email}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enviando}
                    className="btn-primary w-full text-center mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enviando ? 'Preparando…' : 'Descargar catálogo'}
                  </button>
                  <p className="type-label text-center mt-3">
                    Usaremos tus datos solo para enviarte el catálogo.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function Campo({ label, error, type = 'text', ...props }) {
  return (
    <label className="block">
      <span className="type-label">{label}</span>
      <input
        type={type}
        {...props}
        className={`mt-1.5 w-full bg-bg-hero border rounded-[4px] px-3 py-2.5 font-sans text-[14px] text-text-primary focus:outline-none transition-colors ${
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-border-default focus:border-accent-mid'
        }`}
      />
      {error && (
        <span className="block mt-1 text-[11px] text-red-500">{error}</span>
      )}
    </label>
  );
}
