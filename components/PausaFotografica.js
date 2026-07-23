'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Pausa a pantalla completa (imagen/vídeo) con filtro oscuro y una frase.
// Al llegar, la sección SE FIJA (pin): aparece el video + texto, hay una
// pausa, y luego se revela el CTA. Durante la fijación hay un parallax sutil
// (fondo y texto a distinto ritmo). El vídeo reproduce sólo en viewport.
// Respeta reduce-motion.
export default function PausaFotografica({
  src,
  video,
  frase,
  posicion = '50% 50%',
  cta,
  ctaHref = '/contacto',
}) {
  const secRef = useRef(null);
  const mediaRef = useRef(null);
  const vidRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const v = vidRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let io;
    if (v) {
      if (reduce) {
        v.pause();
      } else {
        io = new IntersectionObserver(
          ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
          { threshold: 0.25 }
        );
        io.observe(v);
      }
    }

    if (reduce) return () => io && io.disconnect();

    const ctx = gsap.context(() => {
      // El texto aparece mientras la sección sube a su lugar
      gsap.from(textRef.current, {
        opacity: 0,
        y: 22,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: secRef.current, start: 'top 75%' },
      });

      // CTA oculto hasta la pausa
      gsap.set(ctaRef.current, { opacity: 0, y: 26 });

      // Pin + timeline: pausa, parallax sutil, y luego aparece el CTA
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top top',
          end: '+=115%',
          pin: true,
          scrub: 1,
        },
      });
      // Parallax durante la fijación (fondo baja lento, texto sube)
      tl.fromTo(mediaRef.current, { yPercent: -5 }, { yPercent: 7, ease: 'none' }, 0);
      tl.fromTo(textRef.current, { yPercent: 4 }, { yPercent: -10, ease: 'none' }, 0);
      // Pausa y recién después el CTA
      tl.to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
        0.5
      );
    }, secRef);

    return () => {
      io && io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={secRef}
      className="relative z-30 h-screen min-h-[520px] overflow-hidden grain"
    >
      {/* Media con overscan para el parallax */}
      <div
        ref={mediaRef}
        className="absolute inset-x-0 -top-[14%] h-[128%] will-change-transform"
      >
        {video ? (
          <video
            ref={vidRef}
            className="w-full h-full object-cover"
            style={{ objectPosition: posicion }}
            muted
            loop
            playsInline
            preload="metadata"
            poster={src}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: posicion }}
          />
        )}
      </div>

      {/* Filtro de oscuridad dramático */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 veil-full" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div ref={textRef} className="text-center max-w-3xl will-change-transform">
          <p className="font-display italic text-[#F5F5EE] text-[clamp(24px,4.4vw,50px)] leading-[1.24]">
            {frase}
          </p>
          {cta && (
            <div ref={ctaRef} className="mt-9">
              <Link href={ctaHref} className="btn-light inline-block">
                {cta}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
