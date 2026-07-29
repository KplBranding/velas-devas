'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scheduleRefresh } from '../lib/scrollRefresh';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// "Nuestro compromiso" (¿Por qué elegir Velas Devas?). Split editorial: la
// página se divide en dos → IZQUIERDA la fotografía, DERECHA el texto. En móvil
// se apila (imagen arriba, texto abajo). Las columnas se estiran a la misma
// altura (grid items-stretch), así la foto acompaña al texto sin recortes raros.
//
// Reveal propio y scoped (no depende del batch global, que aquí mide mal por
// estar entre secciones con pin): los textos [data-oficio-reveal] aparecen con
// fade + subida al ENTRAR y se revierten al SUBIR (vinculado al sentido del
// scroll). Escalonado. Respeta prefers-reduced-motion.
export default function SeccionOficio({
  foto,
  fotoPos,
  fotoColor = false, // true → foto a color (sin filtro B&N)
  eyebrow = 'El oficio',
  titulo,
  texto,
  beneficios = [],
  cta,
  bgClass = 'bg-bg-base', // fondo del panel (flujo sobrio lo pone blanco)
  compacto = false, // reduce altura (para caber junto a la wincha en la cadena)
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray(
        section.querySelectorAll('[data-oficio-reveal]')
      );
      if (!els.length) return;

      gsap.set(els, { opacity: 0, y: 26 });

      const triggers = ScrollTrigger.batch(els, {
        start: 'top 88%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
          }),
        // Al subir (scroll inverso) el efecto se revierte.
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            opacity: 0,
            y: 26,
            duration: 0.5,
            ease: 'power2.in',
            stagger: 0.05,
            overwrite: true,
          }),
      });

      scheduleRefresh();
      return () => triggers.forEach((t) => t.kill());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative ${bgClass}`}>
      <div className="md:grid md:grid-cols-2 md:items-stretch">
        {/* IZQUIERDA · Fotografía protagonista */}
        <div
          className={`relative overflow-hidden grain ${
            compacto ? 'h-[38vh] min-h-[260px] md:h-auto' : 'h-[54vh] min-h-[340px] md:h-auto'
          }`}
        >
          <Image
            src={foto}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
            className="object-cover"
            style={{
              objectPosition: fotoPos || '50% 50%',
              filter: fotoColor
                ? 'contrast(1.02)'
                : 'grayscale(100%) contrast(1.06) brightness(0.98)',
            }}
          />
          {/* Velo inferior sutil solo en móvil, para fundir con el texto de abajo */}
          <div className="pointer-events-none absolute inset-0 veil-bottom opacity-40 md:hidden" />
        </div>

        {/* DERECHA · Texto */}
        <div
          className={`flex flex-col justify-center px-5 md:px-10 lg:px-16 ${
            compacto ? 'py-8 md:py-10' : 'py-14 md:py-20'
          }`}
        >
          <div className="w-full max-w-xl">
            <p data-oficio-reveal className="type-eyebrow eyebrow-rule">
              {eyebrow}
            </p>
            <h2
              data-oficio-reveal
              className={`font-display text-text-primary leading-[1.2] mt-4 ${
                compacto
                  ? 'text-[clamp(23px,3vw,32px)]'
                  : 'text-[clamp(26px,3.6vw,40px)]'
              }`}
            >
              {titulo}
            </h2>
            <p
              data-oficio-reveal
              className={`type-body leading-[1.75] ${
                compacto ? 'text-[14px] mt-3' : 'text-[15px] leading-[1.9] mt-5'
              }`}
            >
              {texto}
            </p>

            <ul className={compacto ? 'mt-5' : 'mt-9'}>
              {beneficios.map((b, i) => (
                <li
                  data-oficio-reveal
                  key={b.titulo || b.t}
                  className={`group flex items-baseline gap-4 border-b border-border-default cursor-default ${
                    compacto ? 'py-2.5' : 'py-3.5'
                  } ${i === 0 ? 'border-t border-border-default' : ''}`}
                >
                  <span className="font-display text-gold text-[14px] leading-none w-6 shrink-0 pt-0.5 transition-colors duration-[var(--dur-base)] group-hover:text-accent-mid">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {b.titulo ? (
                    // Formato con título + descripción
                    <span className="font-sans leading-snug">
                      <span className="block text-[14px] md:text-[15px] font-semibold text-text-primary">
                        {b.titulo}
                      </span>
                      <span className="block text-[13px] md:text-[13.5px] text-text-body mt-0.5">
                        {b.desc}
                      </span>
                    </span>
                  ) : (
                    // Formato de una sola línea (otras categorías)
                    <span className="relative font-sans text-[14px] md:text-[15px] text-text-body leading-snug transition-colors duration-[var(--dur-base)] group-hover:text-text-primary">
                      {b.t}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-0 -bottom-1 h-px w-full bg-accent-mid origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-entrance)] group-hover:scale-x-100"
                      />
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {cta && (
              <div data-oficio-reveal>
                <Link
                  href="/contacto"
                  className={`btn-primary inline-block ${compacto ? 'mt-6' : 'mt-9'}`}
                >
                  {cta}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
