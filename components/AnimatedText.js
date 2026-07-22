'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, TextPlugin);
}

/**
 * <AnimatedText> — texto animado reutilizable con GSAP + SplitText, todo
 * disparado por ScrollTrigger al entrar en viewport.
 *
 * Props:
 *   animation  nombre del efecto (ver ANIMS). Default: "fadeUp".
 *   as         etiqueta a renderizar (p, h1, h2, span, div...). Default: "div".
 *   delay      retardo en segundos.
 *   duration   duración en segundos (cada efecto tiene un default sensato).
 *   stagger    separación entre chars/words/lines (default por efecto).
 *   once       true = anima una sola vez; false = re-anima al volver a entrar.
 *   start      punto de disparo ScrollTrigger. Default "top 85%".
 *   className  clases del contenedor.
 *
 * Efectos: fadeUp · maskReveal · chars · words · blur · letterRotate ·
 *          slideLeft · slideRight · scaleIn · opacity · scramble ·
 *          typewriter · scrollReveal · paragraph · editorial
 */
export default function AnimatedText({
  as: Tag = 'div',
  animation = 'fadeUp',
  delay = 0,
  duration,
  stagger,
  once = true,
  scrub = false,
  start = 'top 85%',
  end,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Accesibilidad: sin movimiento → mostrar texto tal cual.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Oculta hasta que el split esté armado (evita flash de texto sin animar).
    el.style.visibility = 'hidden';

    let split;
    let ctx;

    const build = () => {
      ctx = gsap.context(() => {
        const scrubOn = scrub !== false && scrub != null;
        const st = scrubOn
          ? {
              trigger: el,
              start,
              end: end ?? 'top 35%',
              scrub: scrub === true ? 0.6 : scrub,
            }
          : {
              trigger: el,
              start,
              once,
              toggleActions: once
                ? 'play none none none'
                : 'play none none reverse',
            };
        const D = duration;
        const S = stagger;

        switch (animation) {
          // Líneas que emergen desde detrás de una máscara, con leve skew que
          // se asienta. Sin fade: el clip hace todo el trabajo (look premium).
          case 'maskReveal': {
            split = new SplitText(el, { type: 'lines', mask: 'lines' });
            gsap.from(split.lines, {
              yPercent: 120,
              skewY: 6,
              duration: D ?? 1.1,
              delay,
              stagger: S ?? 0.14,
              ease: 'expo.out',
              scrollTrigger: st,
            });
            break;
          }
          // Reveal editorial dramático: máscara + basculación 3D por línea.
          case 'editorial': {
            split = new SplitText(el, { type: 'lines', mask: 'lines' });
            gsap.set(el, { perspective: 900 });
            gsap.from(split.lines, {
              yPercent: 130,
              rotationX: -55,
              transformOrigin: '50% 100% -60',
              duration: D ?? 1.3,
              delay,
              stagger: S ?? 0.18,
              ease: 'expo.out',
              scrollTrigger: st,
            });
            break;
          }
          // Cascada 3D por caracter (flip hacia arriba).
          case 'chars': {
            split = new SplitText(el, { type: 'chars,words' });
            gsap.set(el, { perspective: 600 });
            gsap.from(split.chars, {
              opacity: 0,
              yPercent: 120,
              rotationX: -90,
              transformOrigin: '50% 50% -30',
              duration: D ?? 0.9,
              delay,
              stagger: { each: S ?? 0.022, from: 'start' },
              ease: 'back.out(1.7)',
              scrollTrigger: st,
            });
            break;
          }
          // Palabras que suben desde máscara con skew, orden aleatorio.
          case 'words': {
            split = new SplitText(el, { type: 'words', mask: 'words' });
            gsap.from(split.words, {
              yPercent: 120,
              skewY: 5,
              duration: D ?? 0.9,
              delay,
              stagger: { each: S ?? 0.05, from: 'random' },
              ease: 'power4.out',
              scrollTrigger: st,
            });
            break;
          }
          // Focus-pull: caracteres desenfocados y agrandados que enfocan,
          // apareciendo en orden aleatorio.
          case 'blur': {
            split = new SplitText(el, { type: 'chars,words' });
            gsap.from(split.chars, {
              opacity: 0,
              filter: 'blur(16px)',
              scale: 1.35,
              duration: D ?? 0.9,
              delay,
              stagger: { each: S ?? 0.03, from: 'random' },
              ease: 'power2.out',
              scrollTrigger: st,
            });
            break;
          }
          // Giro 3D en Y por caracter.
          case 'letterRotate': {
            split = new SplitText(el, { type: 'chars' });
            gsap.set(el, { perspective: 600 });
            gsap.from(split.chars, {
              opacity: 0,
              rotationY: 100,
              yPercent: 20,
              transformOrigin: '50% 50%',
              duration: D ?? 0.85,
              delay,
              stagger: { each: S ?? 0.03, from: 'start' },
              ease: 'back.out(1.6)',
              scrollTrigger: st,
            });
            break;
          }
          // Entrada horizontal enmascarada (clip) con skewX que se asienta.
          case 'slideLeft': {
            split = new SplitText(el, { type: 'words', mask: 'words' });
            gsap.from(split.words, {
              xPercent: -120,
              skewX: 14,
              duration: D ?? 0.9,
              delay,
              stagger: S ?? 0.05,
              ease: 'expo.out',
              scrollTrigger: st,
            });
            break;
          }
          case 'slideRight': {
            split = new SplitText(el, { type: 'words', mask: 'words' });
            gsap.from(split.words, {
              xPercent: 120,
              skewX: -14,
              duration: D ?? 0.9,
              delay,
              stagger: S ?? 0.05,
              ease: 'expo.out',
              scrollTrigger: st,
            });
            break;
          }
          // Caracteres que crecen desde 0 en orden desde el centro (rebote).
          case 'scaleIn': {
            split = new SplitText(el, { type: 'chars,words' });
            gsap.from(split.chars, {
              scale: 0,
              opacity: 0,
              transformOrigin: '50% 50%',
              duration: D ?? 0.7,
              delay,
              stagger: { each: S ?? 0.02, from: 'center' },
              ease: 'back.out(2)',
              scrollTrigger: st,
            });
            break;
          }
          // Materializar: opacidad + desenfoque + micro-escala.
          case 'opacity': {
            gsap.from(el, {
              opacity: 0,
              filter: 'blur(10px)',
              scale: 1.05,
              duration: D ?? 1,
              delay,
              ease: 'power2.out',
              scrollTrigger: st,
            });
            break;
          }
          case 'scramble': {
            const orig = el.textContent;
            gsap.set(el, { text: orig.replace(/\S/g, ' ') });
            gsap.to(el, {
              duration: D ?? 1.4,
              delay,
              scrambleText: {
                text: orig,
                chars: 'upperCase',
                speed: 0.5,
                revealDelay: 0.2,
              },
              ease: 'none',
              scrollTrigger: st,
            });
            break;
          }
          case 'typewriter': {
            const orig = el.textContent;
            gsap.set(el, { text: '' });
            gsap.to(el, {
              duration: D ?? Math.min(2.4, orig.length * 0.035),
              delay,
              text: { value: orig },
              ease: 'none',
              scrollTrigger: st,
            });
            break;
          }
          // Scrubbeado: las palabras pasan de tenues/bajas a nítidas siguiendo
          // el scroll (efecto "texto que se enciende", tipo Linear/Apple).
          case 'scrollReveal': {
            split = new SplitText(el, { type: 'words' });
            gsap.from(split.words, {
              opacity: 0,
              yPercent: 40,
              stagger: S ?? 0.08,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start,
                end: end ?? 'top 42%',
                scrub: scrub === true || scrub == null || scrub === false ? 0.6 : scrub,
              },
            });
            break;
          }
          // Párrafo: líneas que emergen desde máscara, encadenadas.
          case 'paragraph': {
            split = new SplitText(el, { type: 'lines', mask: 'lines' });
            gsap.from(split.lines, {
              yPercent: 110,
              duration: D ?? 0.9,
              delay,
              stagger: S ?? 0.1,
              ease: 'power4.out',
              scrollTrigger: st,
            });
            break;
          }
          // Fade Up reinterpretado: subida enmascarada con skew (sin fade plano).
          case 'fadeUp':
          default: {
            split = new SplitText(el, { type: 'lines', mask: 'lines' });
            gsap.from(split.lines, {
              yPercent: 115,
              skewY: 4,
              duration: D ?? 1,
              delay,
              stagger: S ?? 0.1,
              ease: 'expo.out',
              scrollTrigger: st,
            });
            break;
          }
        }
      }, el);
    };

    // Esperar a que las fuentes carguen para partir líneas correctamente.
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      build();
      el.style.visibility = '';
      ScrollTrigger.refresh();
    };
    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      if (el) el.style.visibility = '';
      if (split && split.revert) split.revert();
      if (ctx) ctx.revert();
    };
  }, [animation, delay, duration, stagger, once, scrub, start, end]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
