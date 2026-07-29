// ─────────────────────────────────────────────────────────────────────────────
// Motion System · Presets
// Constructores de animación reutilizables (scroll-driven). Centralizan el
// comportamiento para que TODAS las secciones se muevan igual. Cada preset
// devuelve/aplica un tween de GSAP atado a ScrollTrigger (scrub → progreso del
// scroll, nunca por tiempo). Solo transform/opacity (GPU).
// ─────────────────────────────────────────────────────────────────────────────
import gsap from 'gsap';
import {
  PARALLAX,
  CROSSFADE,
  REVEAL,
  scrub,
  parallaxRange,
  isMobile,
} from './config';

// ── Parallax de una capa ──────────────────────────────────────────────────────
// `speed` < 1 → se mueve más lento (fondo, "lejos"); > 1 → más rápido (detalle,
// "cerca"). El desplazamiento se acota por parallaxRange() y se atenúa en móvil.
export function parallaxLayer(el, speed = PARALLAX.content) {
  const off = (speed - 1) * parallaxRange(); // px; content (1) → 0 (sin mover)
  if (!off) return null;
  return gsap.fromTo(
    el,
    { y: -off },
    {
      y: off,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: scrub(),
        invalidateOnRefresh: true,
      },
    }
  );
}

// ── Revelado escalonado ligado al scroll ─────────────────────────────────────
// Los elementos (imagen → título → texto → CTA, en orden del DOM) emergen uno a
// uno según avanza el scroll, con desfase. Al subir se revierte solo (scrub).
export function revealGroup(scope, items) {
  if (!items.length) return null;
  const shift = isMobile() ? REVEAL.shiftMobile : REVEAL.shift;
  gsap.set(items, { opacity: 0, y: shift, force3D: true });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 82%',
      end: 'top 42%',
      scrub: scrub(),
      invalidateOnRefresh: true,
    },
  });
  items.forEach((it, i) => {
    tl.fromTo(
      it,
      { opacity: 0, y: shift },
      { opacity: 1, y: 0, ease: 'none' },
      i * REVEAL.stagger
    );
  });
  return tl;
}

// ── Crossfade de salida (semi-sticky) ────────────────────────────────────────
// Cuando la sección empieza a salir por arriba, pierde protagonismo: baja opacidad
// y escala muy levemente, mientras la siguiente entra con solapamiento.
export function crossfadeOut(el) {
  return gsap.fromTo(
    el,
    { opacity: 1, scale: 1 },
    {
      opacity: CROSSFADE.opacity,
      scale: CROSSFADE.scale,
      ease: 'none',
      force3D: true,
      transformOrigin: '50% 20%',
      scrollTrigger: {
        trigger: el,
        start: 'bottom 85%',
        end: 'bottom 20%',
        scrub: scrub(),
        invalidateOnRefresh: true,
      },
    }
  );
}
