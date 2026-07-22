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
// Efecto PARALLAX: el fondo y el texto se desplazan a distinto ritmo al hacer
// scroll. El vídeo reproduce sólo en viewport. Respeta reduce-motion.
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

    let ctx;
    if (!reduce) {
      ctx = gsap.context(() => {
        const st = {
          trigger: secRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        };
        // Fondo: baja lento (parallax). Texto: sube más (contra-parallax).
        gsap.fromTo(
          mediaRef.current,
          { yPercent: -8 },
          { yPercent: 10, ease: 'none', scrollTrigger: st }
        );
        gsap.fromTo(
          textRef.current,
          { yPercent: 18 },
          { yPercent: -18, ease: 'none', scrollTrigger: st }
        );
        // Aparición del texto al entrar
        gsap.from(textRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: secRef.current, start: 'top 65%' },
        });
      }, secRef);
    }

    return () => {
      io && io.disconnect();
      ctx && ctx.revert();
    };
  }, []);

  return (
    <section
      ref={secRef}
      className="relative h-screen min-h-[520px] overflow-hidden grain"
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
            <Link href={ctaHref} className="btn-light mt-9 inline-block">
              {cta}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
