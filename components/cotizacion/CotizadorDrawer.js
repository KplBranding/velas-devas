'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCotizacion } from '../../context/CotizacionContext';
import { EMPRESA } from '../../lib/categorias';
import { clp } from '../../lib/utils';

// Arma el texto de la cotización para WhatsApp / correo.
function construirMensaje(items, datos, tot) {
  const lineas = items
    .map((it, i) => {
      const med = it.medida ? ` ${it.medida}` : '';
      const precio =
        it.neto != null ? `${clp(it.neto)} c/u` : 'precio a confirmar';
      return `${i + 1}. ${it.nombre}${med} — ${it.color} — x${it.cantidad} — ${precio}`;
    })
    .join('\n');
  const totales =
    tot.subtotalNeto > 0
      ? `\n\nNeto: ${clp(tot.subtotalNeto)}\nIVA (19%): ${clp(tot.iva)}\nTotal: ${clp(tot.total)}`
      : '';
  const cliente = `\n\n— Datos —\n${datos.nombre}${
    datos.empresa ? ` · ${datos.empresa}` : ''
  }${datos.email ? `\n${datos.email}` : ''}${
    datos.telefono ? `\n${datos.telefono}` : ''
  }${datos.comentario ? `\n\n${datos.comentario}` : ''}`;
  return `Hola Velas Devas, quisiera cotizar:\n\n${lineas}${totales}${cliente}`;
}

function Campo({ label, ...props }) {
  return (
    <label className="block">
      <span className="type-label">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full bg-bg-hero border border-border-default rounded-[4px] px-3 py-2.5 font-sans text-[14px] text-text-primary focus:outline-none focus:border-accent-mid transition-colors"
      />
    </label>
  );
}

export default function CotizadorDrawer() {
  const {
    items,
    abierto,
    setAbierto,
    subtotalNeto,
    iva,
    total,
    hayAConfirmar,
    actualizarCantidad,
    quitar,
    vaciar,
  } = useCotizacion();
  const [vista, setVista] = useState('lista');
  const [datos, setDatos] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    comentario: '',
  });

  const cerrar = () => {
    setAbierto(false);
    setTimeout(() => setVista('lista'), 350);
  };
  const set = (k) => (e) => setDatos((d) => ({ ...d, [k]: e.target.value }));

  const puedeEnviar =
    items.length > 0 &&
    datos.nombre.trim() &&
    (datos.email.trim() || datos.telefono.trim());

  const enviarWhatsApp = () => {
    const msg = construirMensaje(items, datos, { subtotalNeto, iva, total });
    window.open(
      `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };
  const enviarCorreo = () => {
    const msg = construirMensaje(items, datos, { subtotalNeto, iva, total });
    const subject = `Cotización — ${datos.nombre || 'Nuevo cliente'}`;
    window.location.href = `mailto:${EMPRESA.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(msg)}`;
  };

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            className="cursor-native fixed inset-0 z-[80] bg-black/40 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrar}
          />
          <motion.aside
            className="cursor-native fixed right-0 top-0 z-[90] h-full w-full max-w-md bg-bg-base shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[68px] border-b border-border-default shrink-0">
              <div className="flex items-baseline gap-2.5">
                <h2 className="font-display text-[20px] text-text-primary">
                  {vista === 'lista' ? 'Mi cotización' : 'Tus datos'}
                </h2>
                {items.length > 0 && vista === 'lista' && (
                  <span className="type-label">
                    {items.length} {items.length === 1 ? 'ítem' : 'ítems'}
                  </span>
                )}
              </div>
              <button
                onClick={cerrar}
                aria-label="Cerrar y seguir comprando"
                className="w-11 h-11 -mr-1.5 flex items-center justify-center rounded-full border border-border-default text-text-body hover:text-text-primary hover:bg-bg-base transition-colors press"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Vacío */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-3">
                <p className="font-display text-[19px] text-text-primary">
                  Tu cotización está vacía
                </p>
                <p className="type-body text-[14px] max-w-[240px]">
                  Elige una medida en el catálogo y agrégala para armar tu
                  pedido.
                </p>
                <button onClick={cerrar} className="btn-primary mt-3">
                  Ver catálogo
                </button>
              </div>
            ) : vista === 'lista' ? (
              <>
                {/* Lista de ítems */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {items.map((it) => (
                      <motion.div
                        key={it.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        transition={{ duration: 0.25 }}
                        className="py-4 border-b border-border-default flex gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-[14px] text-text-primary font-bold leading-snug">
                            {it.nombre}
                          </p>
                          <p className="type-label mt-0.5">
                            {it.medida ? `${it.medida} · ` : ''}
                            {it.color}
                          </p>
                          <p className="font-sans text-[13px] text-text-body mt-1">
                            {it.neto != null ? `${clp(it.neto)} c/u` : 'A confirmar'}
                          </p>
                          {/* Cantidad */}
                          <div className="mt-2.5 inline-flex items-center border border-border-default rounded-full overflow-hidden">
                            <button
                              onClick={() =>
                                actualizarCantidad(it.id, it.cantidad - 1)
                              }
                              className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-base transition-colors duration-[var(--dur-fast)] press"
                              aria-label="Menos"
                            >
                              –
                            </button>
                            <span className="w-9 text-center font-sans text-[14px] text-text-primary tabular-nums">
                              {it.cantidad}
                            </span>
                            <button
                              onClick={() =>
                                actualizarCantidad(it.id, it.cantidad + 1)
                              }
                              className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-base transition-colors duration-[var(--dur-fast)] press"
                              aria-label="Más"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right shrink-0 flex flex-col justify-between">
                          <p className="font-display text-[15px] text-text-primary">
                            {it.neto != null ? clp(it.neto * it.cantidad) : '—'}
                          </p>
                          <button
                            onClick={() => quitar(it.id)}
                            className="type-label hover:text-text-primary self-end press"
                          >
                            Quitar
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Resumen + acciones */}
                <div
                  className="border-t border-border-default px-6 py-5 shrink-0 bg-bg-hero"
                  style={{
                    paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
                  }}
                >
                  <div className="space-y-1.5 mb-4">
                    <Fila label="Neto" valor={clp(subtotalNeto)} />
                    <Fila label="IVA (19%)" valor={clp(iva)} />
                    <div className="flex items-baseline justify-between pt-2 border-t border-border-default">
                      <span className="font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-text-primary">
                        Total
                      </span>
                      <span className="font-display text-[20px] text-text-primary">
                        {clp(total)}
                      </span>
                    </div>
                  </div>
                  {hayAConfirmar && (
                    <p className="type-label mb-3">
                      * Algunos ítems tienen precio a confirmar.
                    </p>
                  )}
                  <button
                    onClick={() => setVista('formulario')}
                    className="btn-primary w-full text-center"
                  >
                    Solicitar cotización
                  </button>
                  <button
                    onClick={vaciar}
                    className="mt-2.5 w-full type-label hover:text-text-primary press"
                  >
                    Vaciar cotización
                  </button>
                </div>
              </>
            ) : (
              /* Formulario */
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                  <p className="type-body text-[14px]">
                    Déjanos tus datos y te preparamos la cotización a tu medida.
                  </p>
                  <Campo
                    label="Nombre *"
                    value={datos.nombre}
                    onChange={set('nombre')}
                    placeholder="Tu nombre"
                  />
                  <Campo
                    label="Empresa"
                    value={datos.empresa}
                    onChange={set('empresa')}
                    placeholder="Nombre de tu empresa"
                  />
                  <Campo
                    label="Email"
                    type="email"
                    value={datos.email}
                    onChange={set('email')}
                    placeholder="tucorreo@empresa.cl"
                  />
                  <Campo
                    label="Teléfono / WhatsApp"
                    value={datos.telefono}
                    onChange={set('telefono')}
                    placeholder="+56 9 ..."
                  />
                  <label className="block">
                    <span className="type-label">Comentario</span>
                    <textarea
                      value={datos.comentario}
                      onChange={set('comentario')}
                      rows={3}
                      placeholder="Fecha del evento, cantidades, detalles…"
                      className="mt-1.5 w-full bg-bg-hero border border-border-default rounded-[4px] px-3 py-2.5 font-sans text-[14px] text-text-primary focus:outline-none focus:border-accent-mid transition-colors resize-none"
                    />
                  </label>
                  <p className="type-label">
                    * Indica al menos un medio de contacto (email o teléfono).
                  </p>
                </div>

                <div
                  className="border-t border-border-default px-6 py-5 shrink-0 bg-bg-hero space-y-2.5"
                  style={{
                    paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
                  }}
                >
                  <button
                    onClick={enviarWhatsApp}
                    disabled={!puedeEnviar}
                    className="w-full flex items-center justify-center gap-2 rounded-[4px] py-3 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white bg-[#25D366] hover:bg-[#1eb955] disabled:opacity-40 disabled:cursor-not-allowed transition-colors press"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Enviar por WhatsApp
                  </button>
                  <button
                    onClick={enviarCorreo}
                    disabled={!puedeEnviar}
                    className="btn-secondary w-full text-center disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Enviar por correo
                  </button>
                  <button
                    onClick={() => setVista('lista')}
                    className="w-full type-label hover:text-text-primary press pt-1"
                  >
                    ← Volver a la lista
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Fila({ label, valor }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="type-label">{label}</span>
      <span className="font-sans text-[14px] text-text-body">{valor}</span>
    </div>
  );
}
