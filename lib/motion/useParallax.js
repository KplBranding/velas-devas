'use client';

// Aplica parallax a un elemento (una capa de profundidad). Consume el preset
// central `parallaxLayer`. `speed` viene de config.PARALLAX (o un número).
// Se desactiva con reduce-motion. Devuelve el ref a asignar al elemento.
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { parallaxLayer } from './presets';
import { PARALLAX, prefersReduced } from './config';

export default function useParallax(speed = PARALLAX.content) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => parallaxLayer(el, speed));
    return () => ctx.revert();
  }, [speed]);
  return ref;
}
