'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scheduleRefresh } from '../lib/scrollRefresh';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scrollytelling con ESCENARIO FIJADO (pin): el video y el área de texto quedan
 * quietos mientras se hace scroll, y los conceptos aparecen CENTRADOS EN EL
 * MISMO LUGAR, uno reemplazando al anterior con crossfade (no en posiciones
 * distintas). El fotograma del video avanza suave con el progreso.
 * El banner de cierre (children) va después del escenario.
 * Respeta prefers-reduced-motion (versión estática, sin pin).
 */
export default function HistoriaScroll({ video, poster, beats, children }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const durationRef = useRef(0);
  const [reduce, setReduce] = useState(false);

  // --- Suavizado del video: currentTime se acerca al target (progreso del pin) ---
  useEffect(() => {
    const r = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const vid = videoRef.current;
    if (!vid) return;

    const onMeta = () => {
      durationRef.current = vid.duration || 0;
      const pr = vid.play();
      if (pr && typeof pr.then === 'function') {
        pr.then(() => vid.pause()).catch(() => {});
      }
    };
    vid.addEventListener('loadedmetadata', onMeta);
    if (vid.readyState >= 1) onMeta();

    if (r) {
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
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    if (stageRef.current) io.observe(stageRef.current);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      vid.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  // --- Pin del escenario + crossfade de conceptos (mismo lugar) ---
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduce(true);
      return;
    }
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const beatEls = gsap.utils.toArray(stage.querySelectorAll('[data-beat]'));
    const n = beatEls.length;
    if (!n) return;

    const ctx = gsap.context(() => {
      // Todos apilados en el mismo punto; solo el primero visible al inicio.
      gsap.set(beatEls, { autoAlpha: 0, yPercent: 10 });
      gsap.set(beatEls[0], { autoAlpha: 1, yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=' + n * 92 + '%',
          pin: stage,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            targetRef.current = self.progress;
          },
        },
      });

      // Crossfade: el concepto sale hacia arriba y el siguiente entra desde abajo,
      // en el MISMO lugar. Pequeño solape para continuidad.
      for (let i = 1; i < n; i++) {
        tl.to(
          beatEls[i - 1],
          { autoAlpha: 0, yPercent: -10, duration: 0.4, ease: 'power2.in' },
          i
        ).fromTo(
          beatEls[i],
          { autoAlpha: 0, yPercent: 10 },
          { autoAlpha: 1, yPercent: 0, duration: 0.45, ease: 'power2.out' },
          i + 0.12
        );
      }
      // Sostener el último concepto un tramo antes de soltar el pin.
      tl.to({}, { duration: 0.5 });
    }, sectionRef);

    scheduleRefresh();
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative bg-bg-hero">
        <div
          ref={stageRef}
          className={
            reduce
              ? 'relative'
              : 'relative h-[100svh] overflow-hidden'
          }
        >
          <div className="grid h-full md:grid-cols-2">
            {/* Texto (izq. desktop / abajo móvil): conceptos en el MISMO lugar */}
            <div className="relative order-2 md:order-1 flex items-center px-5 md:pl-8 lg:pl-16 md:pr-14 py-12 md:py-0">
              <div className="relative w-full max-w-xl min-h-[240px] md:min-h-[300px]">
                {beats.map((b, i) => (
                  <div
                    key={i}
                    data-beat
                    className={
                      reduce
                        ? 'mb-14 last:mb-0'
                        : 'absolute inset-0 flex flex-col justify-center'
                    }
                  >
                    <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-gold">
                      {String(i + 1).padStart(2, '0')} — {b.kicker}
                    </span>
                    {b.titulo && (
                      <h3 className="type-section text-[clamp(26px,3.4vw,40px)] mt-4">
                        {b.titulo}
                      </h3>
                    )}
                    <p className="type-body text-[15px] leading-[1.95] mt-5 max-w-md">
                      {b.texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Video (der. desktop / arriba móvil) */}
            <div className="order-1 md:order-2 h-[42svh] md:h-full relative overflow-hidden bg-black-graphic">
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
              {/* Difuminado hacia el fondo crema para fundir la costura */}
              <div
                className="pointer-events-none absolute inset-0 hidden md:block"
                style={{
                  background:
                    'linear-gradient(to right, #ECEEE1 0%, rgba(244,242,238,0.6) 9%, rgba(244,242,238,0) 26%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 md:hidden"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(244,242,238,0) 74%, #ECEEE1 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cierre (banner): después del escenario. */}
      {children}
    </>
  );
}
