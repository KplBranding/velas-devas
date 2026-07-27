'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scheduleRefresh } from '../lib/scrollRefresh';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scrollytelling con ESCENARIO FIJO (CSS sticky): el video y el texto quedan
 * quietos y los conceptos aparecen CENTRADOS EN EL MISMO LUGAR (crossfade). El
 * fotograma del video avanza con el progreso y termina en su frame final. Luego
 * el banner de cierre (children) SUBE por encima del escenario y lo tapa
 * (panel opaco, z superior) — mismo patrón robusto que "Nuestro compromiso".
 * Respeta prefers-reduced-motion (versión estática, en flujo).
 */
export default function HistoriaScroll({ video, poster, beats, children }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const durationRef = useRef(0);
  const [reduce, setReduce] = useState(false);

  const BEATS_VH = beats.length * 72; // recorrido del crossfade (stage sticky)

  // --- Suavizado del video: currentTime se acerca al target (progreso) ---
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

  // --- Crossfade de conceptos (scrub, sin pin: el stage es sticky por CSS) ---
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
      gsap.set(beatEls, { autoAlpha: 0, yPercent: 10 });
      gsap.set(beatEls[0], { autoAlpha: 1, yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=' + n * 72 + '%',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            targetRef.current = self.progress;
          },
        },
      });

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
    }, sectionRef);

    scheduleRefresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-bg-hero">
      {/* Escenario fijo (sticky) mientras se hace scroll */}
      <div
        ref={stageRef}
        className={
          reduce
            ? 'relative'
            : 'sticky top-0 h-[100svh] overflow-hidden'
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
          </div>
        </div>
      </div>

      {/* Espaciador: da recorrido al crossfade mientras el escenario está fijo */}
      {!reduce && (
        <div aria-hidden style={{ height: BEATS_VH + 'vh' }} />
      )}

      {/* Banner de cierre: SUBE por encima del escenario fijo y lo tapa
         (panel opaco, z superior). En reduce va en flujo normal. */}
      {children && <div className="relative z-10">{children}</div>}
    </section>
  );
}
