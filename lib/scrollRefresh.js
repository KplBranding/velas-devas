import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Refresh de ScrollTrigger centralizado y "debounced".
//
// Problema: cada <AnimatedText> y ScrollReveal llamaba a ScrollTrigger.refresh()
// al montarse. refresh() recalcula la posición de TODOS los triggers de la
// página, así que con ~6 títulos en una landing se disparaban ~6 refreshes
// globales en cascada al cargar → layout thrash y micro-saltos.
//
// Solución: coalescer todas las peticiones de una ráfaga (montaje inicial,
// SplitText, fonts.ready…) en un único refresh tras que la ráfaga se asiente.
let timer = null;

export function scheduleRefresh(delay = 160) {
  if (typeof window === 'undefined') return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    ScrollTrigger.refresh();
  }, delay);
}
