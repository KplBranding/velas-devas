'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// "El oficio" (¿Por qué confiar?). Al llegar desde la sección oscura del video,
// la sección se ACLARA (un velo oscuro se desvanece) y SE FIJA (pin): los
// textos van apareciendo uno a uno a medida que se hace scroll. Fotografía B&N
// editorial + lista con hover subrayado + CTA.
// Desktop: pin + reveal scrubbeado. Móvil: reveal simple al entrar.
export default function SeccionOficio({
  foto,
  fotoPos,
  eyebrow = 'El oficio',
  titulo,
  texto,
  beneficios = [],
  cta,
}) {
  const secRef = useRef(null);
  const brightRef = useRef(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    // Desktop: aclarado durante la ENTRADA + pin con revelado progresivo
    mm.add('(min-width: 768px)', () => {
      const els = sec.querySelectorAll('[data-oficio]');
      gsap.set(els, { opacity: 0, y: 28 });
      gsap.set(brightRef.current, { opacity: 1 });

      // Aclarado (oscuro → claro) mientras la sección sube a su lugar, así no
      // queda una pantalla negra prolongada antes de fijarse.
      gsap.to(brightRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top bottom',
          end: 'top 25%',
          scrub: true,
        },
      });

      // Pin + los textos aparecen uno a uno con el scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        },
      });
      tl.to(
        els,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.5, ease: 'power3.out' },
        0.1
      );
    });

    // Móvil: sin pin, reveal simple al entrar
    mm.add('(max-width: 767px)', () => {
      const els = sec.querySelectorAll('[data-oficio]');
      gsap.set(brightRef.current, { opacity: 0 });
      gsap.from(els, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sec, start: 'top 72%' },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={secRef}
      className="relative bg-bg-base overflow-hidden md:min-h-screen"
    >
      {/* Velo de aclarado (oscuro → se desvanece) */}
      <div
        ref={brightRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 bg-[#20261F] opacity-0"
      />

      <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:items-stretch md:min-h-screen">
        {/* Fotografía protagonista — B&N editorial */}
        <div className="relative h-[360px] md:h-auto md:min-h-screen grain">
          <Image
            src={foto}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{
              objectPosition: fotoPos || '50% 50%',
              filter: 'grayscale(100%) contrast(1.06) brightness(0.98)',
            }}
          />
        </div>

        {/* Texto + lista */}
        <div className="px-5 md:px-14 py-14 md:py-20 flex flex-col justify-center">
          <p data-oficio className="type-eyebrow eyebrow-rule">
            {eyebrow}
          </p>
          <h2
            data-oficio
            className="font-display text-[clamp(26px,3.6vw,40px)] text-text-primary leading-[1.2] mt-4"
          >
            {titulo}
          </h2>
          <p
            data-oficio
            className="type-body text-[15px] leading-[1.9] mt-5 max-w-md"
          >
            {texto}
          </p>

          <ul className="mt-9">
            {beneficios.map((b, i) => (
              <li
                data-oficio
                key={b.t}
                className={`group flex items-baseline gap-4 py-3.5 border-b border-border-default cursor-default ${
                  i === 0 ? 'border-t border-border-default' : ''
                }`}
              >
                <span className="font-display text-gold text-[14px] leading-none w-6 shrink-0 transition-colors duration-300 group-hover:text-accent-mid">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative font-sans text-[14px] md:text-[15px] text-text-body leading-snug transition-colors duration-300 group-hover:text-text-primary">
                  {b.t}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 -bottom-1 h-px w-full bg-accent-mid origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
                  />
                </span>
              </li>
            ))}
          </ul>

          {cta && (
            <div data-oficio>
              <Link href="/contacto" className="btn-primary mt-9 inline-block">
                {cta}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
