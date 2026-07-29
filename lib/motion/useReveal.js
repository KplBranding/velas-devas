'use client';

// Revelado escalonado ligado al scroll para un grupo. Busca dentro del scope los
// elementos marcados con [data-reveal] y los revela en orden del DOM (imagen →
// título → texto → CTA) según el progreso del scroll, con reverso al subir.
// Con reduce-motion los muestra sin animar. Devuelve el ref del contenedor.
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { revealGroup } from './presets';
import { prefersReduced } from './config';
import { scheduleRefresh } from '../scrollRefresh';

export default function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    const items = gsap.utils.toArray(scope.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    if (prefersReduced()) {
      gsap.set(items, { clearProps: 'all' });
      return;
    }
    const ctx = gsap.context(() => revealGroup(scope, items), ref);
    scheduleRefresh();
    return () => ctx.revert();
  }, []);
  return ref;
}
