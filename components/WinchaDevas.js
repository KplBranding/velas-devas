'use client';

// Wincha divisoria: "Velas Devas" en Playfair Display Black, desplazándose en
// loop. Estilo de fluidez tipo "THE FEED" (sitio de referencia): el marquee está
// LIGADO A LA VELOCIDAD DEL SCROLL — acelera al hacer scroll, sigue su dirección
// y deriva suave al soltar. Motor: GSAP (timeScale) + velocidad de ScrollTrigger
// (sincronizada a Lenis). Respeta reduce-motion (queda estático).
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobile } from '../lib/motion/config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ALFA = [0.14, 0.06]; // alterna: una un poco más tenue que la otra

function Bloque() {
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <span
          key={i}
          className="font-display font-black not-italic uppercase text-[clamp(54px,10vw,150px)] leading-[0.9] tracking-[-0.02em] px-2 md:px-3 whitespace-nowrap"
          style={{ color: `rgba(30, 37, 30, ${ALFA[i % 2]})` }}
        >
          Velas Devas
        </span>
      ))}
    </>
  );
}

export default function WinchaDevas() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Deriva base continua (loop sin costura: dos mitades idénticas → -50%).
      const base = isMobile() ? 0.6 : 0.8; // velocidad de reposo (más lenta)
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: isMobile() ? 60 : 48, // más lento el traslado base
        ease: 'none',
        repeat: -1,
      });
      tween.timeScale(base);

      // La velocidad del scroll modula el timeScale y la dirección lo orienta.
      let relax;
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = Math.abs(self.getVelocity());
          const boost = gsap.utils.clamp(base, 5, base + v / 650);
          tween.timeScale(self.direction * boost);
          // Al soltar el scroll, relaja suave hacia la deriva base (misma dirección).
          clearTimeout(relax);
          relax = setTimeout(
            () => tween.timeScale(self.direction * base),
            200
          );
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="relative overflow-hidden py-3 md:py-6"
    >
      <div
        ref={trackRef}
        className="flex w-max flex-nowrap items-center whitespace-nowrap will-change-transform"
      >
        <Bloque />
        <Bloque />
      </div>
    </div>
  );
}
