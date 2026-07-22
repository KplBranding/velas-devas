'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Sección de impacto. Es STICKY (se queda fija) mientras la sección siguiente
// (el video) sube por encima → "quiebre" en la navegación.
// Sus animaciones se scrubbean al scroll del contenedor padre:
//   1. Título (4 líneas) emerge desde máscara.
//   2. Bajada aparece.
//   3. Las frases se retiran y entran los 6 conceptos uno por uno (WOW:
//      máscara + desenfoque + overshoot), sin solaparse con el título.
// Fondo oscuro + glow que sigue el cursor. Respeta reduce-motion.
export default function DolorScrolly({ lineas = [], parrafo, bullets = [] }) {
  const secRef = useRef(null);
  const phrasesRef = useRef(null);
  const paraRef = useRef(null);
  const bulletsRef = useRef(null);
  const arrowRef = useRef(null);
  const underlineRef = useRef(null);
  const [reduce, setReduce] = useState(false);
  const [hover, setHover] = useState(false);

  const onMove = (e) => {
    const el = secRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduce(true);
      return;
    }
    const ctx = gsap.context(() => {
      const container = secRef.current.parentElement;
      const titleLines = secRef.current.querySelectorAll('[data-line]');
      const bulletItems = secRef.current.querySelectorAll('[data-bullet]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          // Relativo al viewport. Más largo = scroll más "denso" (no pasa tan
          // rápido). El scrub alto agrega lag, sensación más pausada.
          end: '+=150%',
          scrub: 1.4,
        },
      });

      tl.from(titleLines, {
        yPercent: 120,
        duration: 1,
        stagger: 0.12,
        ease: 'expo.out',
      }, 0)
        .fromTo(
          paraRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.9
        )
        // Subrayado dibujado a mano bajo "marca la diferencia"
        .to(
          underlineRef.current,
          { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' },
          1.5
        )
        // Las frases se retiran hacia arriba (deja el escenario limpio)
        .to(
          phrasesRef.current,
          { opacity: 0, y: -48, duration: 0.7, ease: 'power2.in' },
          2.9
        )
        // Los conceptos entran uno por uno — máscara + blur + overshoot
        .from(
          bulletItems,
          {
            yPercent: 130,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 0.7,
            stagger: 0.34,
            ease: 'back.out(1.5)',
          },
          3.3
        )
        .fromTo(
          arrowRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          '>-0.1'
        );
    }, secRef);

    return () => ctx.revert();
  }, []);

  const GLOW =
    'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(242, 221, 166, 0.16), rgba(242, 221, 166, 0.05) 30%, transparent 62%)';

  const Dot = () => (
    <span className="w-1.5 h-1.5 rounded-full bg-[#C8D0A8] shrink-0" aria-hidden />
  );

  // ── Fallback estático ──
  if (reduce) {
    return (
      <section className="relative bg-[#20261F] grain border-b border-black/40">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <h2 className="font-display text-[#F5F5EE] text-[clamp(30px,5.8vw,68px)] leading-[1.08] tracking-[-0.01em]">
            {lineas.join(' ')}
          </h2>
          <p className="text-[#C9CFBE] text-[17px] leading-[1.8] mt-7 max-w-2xl mx-auto">
            {parrafo}
          </p>
          <ul className="mt-12 flex flex-col items-center gap-4">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-3">
                <Dot />
                <span className="font-display text-[#F5F5EE] text-[clamp(20px,3vw,30px)]">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={secRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="sticky top-0 h-screen overflow-hidden bg-[#20261F] grain z-0"
    >
      {/* Glow que sigue al cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500"
        style={{ opacity: hover ? 1 : 0, background: GLOW }}
      />

      {/* Capa 1 — frases (título 4 líneas + bajada) */}
      <div
        ref={phrasesRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <h2 className="font-display text-[#F5F5EE] text-[clamp(30px,6.4vw,80px)] leading-[1.08] tracking-[-0.015em]">
          {lineas.map((l, i) => {
            const last = i === lineas.length - 1;
            return (
              <span key={i} className="block overflow-hidden">
                <span data-line className="block">
                  {last ? (
                    <span className="relative inline-block">
                      {l}
                      {/* Subrayado dibujado a mano (se traza con el scroll) */}
                      <svg
                        aria-hidden
                        viewBox="0 0 300 22"
                        preserveAspectRatio="none"
                        className="absolute left-0 right-0 -bottom-[0.14em] w-full h-[0.36em] overflow-visible text-[#F2DDA6]"
                      >
                        <path
                          ref={underlineRef}
                          d="M4 13 C 62 5, 118 19, 178 11 S 262 6, 296 13"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          pathLength="1"
                          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                        />
                      </svg>
                    </span>
                  ) : (
                    l
                  )}
                </span>
              </span>
            );
          })}
        </h2>
        <p
          ref={paraRef}
          className="text-[#C9CFBE] text-[clamp(16px,1.9vw,20px)] leading-[1.7] mt-8 max-w-2xl"
        >
          {parrafo}
        </p>
      </div>

      {/* Capa 2 — conceptos (entran uno por uno) */}
      <ul
        ref={bulletsRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 md:gap-5 px-6 text-center"
      >
        {bullets.map((b, i) => (
          <li key={i} className="overflow-hidden py-1">
            <span
              data-bullet
              className="flex items-center justify-center gap-3"
            >
              <Dot />
              <span className="font-display text-[#F5F5EE] text-[clamp(21px,3.2vw,34px)] leading-none">
                {b}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* Flecha de scroll (invita a continuar) */}
      <div
        ref={arrowRef}
        aria-hidden
        className="scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[#F5F5EE]/70"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
