'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scheduleRefresh } from '../lib/scrollRefresh';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scrollytelling editorial con SCROLL-SCRUBBING de video.
 * El video queda fijo (sticky) y su fotograma avanza/retrocede según el scroll,
 * como en las páginas de producto de Apple. Rescata el efecto de la referencia
 * y lo hace fluido con interpolación suave (lerp), sin recodificar el archivo:
 *   - target = progreso de scroll dentro de la sección (0..1)
 *   - cada frame, currentTime del video se acerca suavemente al target
 *   - solo se anima video.currentTime (sin re-render); respeta reduced-motion
 */
export default function HistoriaScroll({ video, poster, beats, children }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const durationRef = useRef(0);
  const scrubEndRef = useRef(null);

  // Progreso de scroll → target del video.
  // Cacheamos posición/altura de la sección y en cada frame de scroll SOLO
  // leemos window.scrollY (cero lecturas de layout por frame → sin forced
  // reflow). El video se mueve por ref, sin re-render de React por frame.
  useEffect(() => {
    let raf = 0;
    let top = 0;
    let total = 1;
    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      top = el.getBoundingClientRect().top + window.scrollY;
      // El scrub del video se COMPLETA cuando el último concepto llega al centro
      // (marcador tras los beats), no al final de la sección. Así el video
      // termina antes, se queda en su fotograma final (pausa) y luego sube el
      // banner. Sin marcador (o móvil) cae al comportamiento anterior.
      const mk = scrubEndRef.current;
      if (mk && mk.offsetParent !== null) {
        const mkTop = mk.getBoundingClientRect().top + window.scrollY;
        total = Math.max(mkTop - top - window.innerHeight * 0.5, 1);
      } else {
        total = Math.max(el.offsetHeight - window.innerHeight, 1);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const scrolled = Math.min(Math.max(window.scrollY - top, 0), total);
        targetRef.current = scrolled / total;
      });
    };
    measure();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Bucle de suavizado que mueve el video hacia el target (solo mientras es visible)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const vid = videoRef.current;
    if (!vid) return;

    const onMeta = () => {
      durationRef.current = vid.duration || 0;
      // Prima el decodificador (muted) para que el primer seek sea instantáneo
      const pr = vid.play();
      if (pr && typeof pr.then === 'function') {
        pr.then(() => vid.pause()).catch(() => {});
      }
    };
    vid.addEventListener('loadedmetadata', onMeta);
    if (vid.readyState >= 1) onMeta();

    if (reduce) {
      // Sin scroll-scrubbing: primer fotograma estático
      try {
        vid.currentTime = 0;
      } catch (_) {}
      return () => vid.removeEventListener('loadedmetadata', onMeta);
    }

    let raf = 0;
    let running = false;
    const tick = () => {
      const dur = durationRef.current;
      if (dur > 0) {
        // Interpolación: acerca el frame actual al objetivo (sensación cinematográfica)
        smoothRef.current += (targetRef.current - smoothRef.current) * 0.12;
        const t = Math.min(dur - 0.001, Math.max(0, smoothRef.current * dur));
        if (Math.abs(vid.currentTime - t) > 0.005 && vid.readyState >= 2) {
          try {
            vid.currentTime = t;
          } catch (_) {}
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      vid.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-bg-hero">
      <div className="grid md:grid-cols-2">
        {/* Columna narrativa (izquierda) */}
        <div className="order-2 md:order-1 px-5 md:pl-8 lg:pl-16 md:pr-14">
          <div className="max-w-xl py-12 md:py-[11vh]">
            {beats.map((b, i) => (
              <Beat
                key={i}
                beat={b}
                index={i}
                isLast={i === beats.length - 1}
              />
            ))}
            {/* Marcador: aquí termina el scrub del video (último concepto centrado) */}
            <div ref={scrubEndRef} aria-hidden className="h-px" />
            {/* Pausa + recorrido para que el banner suba por encima (desktop):
               el video queda en su fotograma final y el concepto 3 anclado. */}
            {children && <div aria-hidden className="hidden md:block h-[95vh]" />}
          </div>
        </div>

        {/* Video a tamaño completo (derecha), sin marco — como una sola imagen.
            Se fija justo bajo la barra (112px) y se solapa ~4px con ella, para
            que NO quede escondido detrás pero tampoco muestre una costura/hueco. */}
        <div className="order-1 md:order-2 md:sticky md:top-[108px] h-[62svh] md:h-[calc(100svh-108px)]">
          <div className="relative w-full h-full overflow-hidden bg-black-graphic">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={video}
              poster={poster}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
            />
            {/* Difuminado hacia el fondo crema — funde la costura, un solo paño */}
            {/* Desktop: borde izquierdo se desvanece hacia el texto */}
            <div
              className="pointer-events-none absolute inset-0 hidden md:block"
              style={{
                background:
                  'linear-gradient(to right, #ECEEE1 0%, rgba(244,242,238,0.6) 9%, rgba(244,242,238,0) 26%)',
              }}
            />
            {/* Móvil: borde inferior se funde con el texto de abajo */}
            <div
              className="pointer-events-none absolute inset-0 md:hidden"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(244,242,238,0) 72%, #ECEEE1 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Cierre (banner): SUBE por encima del video + concepto 3 anclados
         (z alto + margen negativo que lo solapa), luego de la pausa. */}
      {children && (
        <div className="relative z-20 md:-mt-[70vh]">{children}</div>
      )}
    </section>
  );
}

function Beat({ beat, index, isLast }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // "Activo" = el beat cruza la banda central del viewport → resalta el kicker
    // en dorado (liga la narrativa con el fotograma del video).
    const ioActive = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
    );
    ioActive.observe(el);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => ioActive.disconnect();
    }

    // Solo transform + opacity (autoAlpha) → 60 FPS, sin reflow.
    const items = el.querySelectorAll('[data-b]');
    const ctx = gsap.context(() => {
      // ENTRADA: revelado escalonado (kicker → título → párrafo), disparado
      // cuando el centro del bloque está algo por debajo de la mitad (más abajo).
      gsap.from(items, {
        autoAlpha: 0,
        y: 34,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: el,
          start: 'center 70%',
          toggleActions: 'play none none reverse',
        },
      });
      // SALIDA: el bloque se desvanece y sube al llegar al tercio superior —
      // mucho antes de alcanzar el giro/menú. Reversible al bajar.
      // El ÚLTIMO concepto NO sale: se queda visible durante la pausa del video.
      if (!isLast) {
        gsap.to(el, {
          autoAlpha: 0,
          y: -28,
          duration: 0.7,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: el,
            start: 'center 42%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, ref);
    scheduleRefresh();

    return () => {
      ioActive.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={
        isLast
          ? // El último concepto se ANCLA (sticky) a la altura del pantallazo y
            // se queda ahí mientras el banner sube por encima.
            'flex flex-col justify-center md:sticky md:top-[24vh] md:z-10'
          : 'min-h-[42vh] md:min-h-[48vh] flex flex-col justify-center'
      }
    >
      <span
        data-b
        className={`font-sans text-[11px] font-bold tracking-[0.2em] transition-colors duration-500 ${
          active ? 'text-gold' : 'text-text-muted'
        }`}
      >
        {String(index + 1).padStart(2, '0')} — {beat.kicker}
      </span>
      {beat.titulo && (
        <h3 data-b className="type-section text-[clamp(26px,3.4vw,40px)] mt-4">
          {beat.titulo}
        </h3>
      )}
      <p data-b className="type-body text-[15px] leading-[1.95] mt-5 max-w-md">
        {beat.texto}
      </p>
    </div>
  );
}
