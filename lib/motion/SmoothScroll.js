'use client';

// ─────────────────────────────────────────────────────────────────────────────
// Motion System · Provider global
// Monta el motor de movimiento una sola vez para todo el sitio y refresca las
// mediciones de ScrollTrigger en cada cambio de ruta. Se coloca en app/layout.
// No renderiza nada visible.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initMotionEngine, getLenis } from './engine';
import { scheduleRefresh } from '../scrollRefresh';

export default function SmoothScroll() {
  // Motor: se inicializa una vez.
  useEffect(() => {
    const cleanup = initMotionEngine();
    return cleanup;
  }, []);

  // En cada cambio de ruta: subir al inicio sin animar y recalcular triggers una
  // vez que el nuevo DOM montó.
  const pathname = usePathname();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    scheduleRefresh();
    // Un refresh extra tras el paint por si hay imágenes/fonts que cambian alturas.
    const t = setTimeout(() => ScrollTrigger.refresh(), 320);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
