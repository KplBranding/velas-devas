'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

const CotizacionContext = createContext(null);
const STORAGE_KEY = 'devas_cotizacion_v1';
const IVA_RATE = 0.19;

export function CotizacionProvider({ children }) {
  const [items, setItems] = useState([]);
  const [abierto, setAbierto] = useState(false);
  const [cargado, setCargado] = useState(false);

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setCargado(true);
  }, []);

  // Persistir
  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, cargado]);

  // linea: { id, productId, nombre, medida, medidaLabel, sku, neto, color, cantidad }
  const agregar = useCallback((linea) => {
    setItems((prev) => {
      const i = prev.findIndex((it) => it.id === linea.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], cantidad: copy[i].cantidad + linea.cantidad };
        return copy;
      }
      return [...prev, linea];
    });
    setAbierto(true);
  }, []);

  const actualizarCantidad = useCallback((id, cantidad) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, cantidad: Math.max(1, cantidad) } : it
      )
    );
  }, []);

  const quitar = useCallback(
    (id) => setItems((prev) => prev.filter((it) => it.id !== id)),
    []
  );

  const vaciar = useCallback(() => setItems([]), []);

  const count = items.reduce((a, it) => a + it.cantidad, 0);
  const subtotalNeto = items.reduce(
    (a, it) => a + (it.neto || 0) * it.cantidad,
    0
  );
  const iva = Math.round(subtotalNeto * IVA_RATE);
  const total = subtotalNeto + iva;
  const hayAConfirmar = items.some((it) => it.neto == null);

  const value = {
    items,
    count,
    subtotalNeto,
    iva,
    total,
    hayAConfirmar,
    agregar,
    actualizarCantidad,
    quitar,
    vaciar,
    abierto,
    setAbierto,
    cargado,
  };

  return (
    <CotizacionContext.Provider value={value}>
      {children}
    </CotizacionContext.Provider>
  );
}

export function useCotizacion() {
  const ctx = useContext(CotizacionContext);
  if (!ctx) throw new Error('useCotizacion debe usarse dentro de CotizacionProvider');
  return ctx;
}
