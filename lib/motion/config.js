// ─────────────────────────────────────────────────────────────────────────────
// Motion System · Configuración central
// Todos los valores del sistema de movimiento viven aquí. Ningún componente
// debería definir duraciones, easings o velocidades propias: consumen estos
// tokens para que el comportamiento sea consistente y fácil de mantener.
// Filosofía: editorial, calmo, sin overshoot ni rebotes. Todo atado al scroll.
// ─────────────────────────────────────────────────────────────────────────────

// Easings editoriales (curvas suaves, sin back/bounce). Se usan en los pocos
// tweens de UI que no dependen del scroll; el resto interpola linealmente con el
// progreso del scroll (el "suavizado" lo aporta Lenis + el scrub).
export const EASE = {
  // entrada suave y precisa (cubic-bezier equivalente a power3.out)
  out: 'power3.out',
  inOut: 'power2.inOut',
  // curva CSS para transiciones puntuales de UI
  cssOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

// Suavizado del scrub de ScrollTrigger (lag entre scroll y animación). Más alto
// = más "pausado"/pesado. Se reduce en móvil para no arrastrar en táctil.
export const SCRUB = {
  base: 1.1,
  mobile: 0.6,
};

// Velocidades de parallax por capa de profundidad. 1 = a la par del scroll.
// <1 se mueve más lento (fondo, se percibe "lejos"); >1 más rápido (detalles,
// se percibe "cerca"). El efecto debe ser EXTREMADAMENTE sutil.
export const PARALLAX = {
  background: 0.75,
  decor: 0.85,
  content: 1.0,
  detail: 1.08,
};

// Desplazamiento máximo (px) que puede aplicar una capa de parallax. Acota el
// efecto para que nunca sea exagerado ni maree. Reducido en móvil.
export const PARALLAX_RANGE = {
  desktop: 90,
  mobile: 44,
};

// Crossfade de la sección saliente cuando entra la siguiente (semi-sticky):
// pierde protagonismo bajando opacidad y escala muy levemente.
export const CROSSFADE = {
  opacity: 0.55, // opacidad mínima al perder protagonismo
  scale: 0.975, // escala mínima (sutil, sin colapsar)
};

// Revelado escalonado de contenido (imagen → título → texto → CTA). Valores en
// "unidades de progreso" del scroll, no en segundos. El desfase crea el ritmo.
export const REVEAL = {
  stagger: 0.08, // separación entre elementos del grupo
  shift: 28, // px de subida desde los que entra cada elemento
  shiftMobile: 18,
};

// Solapamiento entre secciones: cuánto empieza a entrar la nueva antes de que
// termine la anterior (fracción de viewport). Da continuidad sin cortes.
export const OVERLAP = 0.18;

// Configuración de Lenis (scroll suavizado). lerp bajo = más inercia/suavidad.
export const LENIS = {
  lerp: 0.1, // suavizado del scroll (0–1); 0.1 = fluido y controlable
  wheelMultiplier: 1,
  touchMultiplier: 1.1,
};

// Breakpoint único de referencia para el sistema (coincide con Tailwind md).
export const MOBILE_QUERY = '(max-width: 767px)';
export const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

// Helpers de entorno (se evalúan en cliente).
export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia(REDUCE_QUERY).matches;

// Devuelve el scrub adecuado según dispositivo.
export const scrub = () => (isMobile() ? SCRUB.mobile : SCRUB.base);

// Devuelve el rango de parallax según dispositivo.
export const parallaxRange = () =>
  isMobile() ? PARALLAX_RANGE.mobile : PARALLAX_RANGE.desktop;
