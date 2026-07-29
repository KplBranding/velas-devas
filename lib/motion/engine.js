// ─────────────────────────────────────────────────────────────────────────────
// Motion System · Motor
// Un único bucle de animación (rAF) para TODO el sitio: Lenis (scroll suavizado)
// conducido por el ticker de GSAP, y ScrollTrigger sincronizado a Lenis. Esto es
// lo que hace que todo el movimiento comparta la misma cadencia y se sienta como
// un solo flujo continuo (en vez de bloques independientes).
// ─────────────────────────────────────────────────────────────────────────────
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LENIS, prefersReduced } from './config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenis = null;

// Acceso al Lenis activo (por si un componente necesita scrollTo suave, etc.).
export const getLenis = () => lenis;

// Inicializa el motor. Devuelve una función de limpieza. Se llama UNA vez desde
// el provider global <SmoothScroll>.
export function initMotionEngine() {
  if (typeof window === 'undefined') return () => {};

  // Con reduce-motion no suavizamos el scroll (accesibilidad): el navegador
  // scrollea nativo y ScrollTrigger sigue funcionando con su listener propio.
  const reduce = prefersReduced();

  if (reduce) {
    ScrollTrigger.refresh();
    return () => {};
  }

  lenis = new Lenis({
    lerp: LENIS.lerp,
    wheelMultiplier: LENIS.wheelMultiplier,
    touchMultiplier: LENIS.touchMultiplier,
    // En táctil dejamos el scroll nativo (mejor rendimiento en móvil); el
    // parallax y los scrubs igual se sienten fluidos. syncTouch off por defecto.
    smoothWheel: true,
  });

  // Cada scroll de Lenis actualiza ScrollTrigger → todas las animaciones scrub
  // interpolan contra la posición suavizada.
  lenis.on('scroll', ScrollTrigger.update);

  // Un solo rAF: el ticker de GSAP conduce Lenis (evita dos loops compitiendo).
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // ScrollTrigger debe medir con el scroll de Lenis.
  ScrollTrigger.refresh();

  return () => {
    gsap.ticker.remove(raf);
    lenis && lenis.destroy();
    lenis = null;
  };
}
