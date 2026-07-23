'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

// Frase de CTA por rubro (el botón "Contáctanos" lleva a /contacto).
const CTA_POR_CATEGORIA = {
  funerarias:
    'Porque tu servicio es de calidad, tus velas también deben serlo.',
  banqueteria:
    '¿Buscas velas que estén al nivel de tus eventos y un proveedor que responda?',
  religiosas:
    'Tenemos las velas, cirios y decorados religiosos que necesitas.',
};

const PASOS = [
  {
    num: '01',
    icon: 'materias',
    titulo: 'Materias primas de primera calidad',
    texto:
      'Seleccionamos cuidadosamente nuestros insumos desde el origen. Importamos parafina sólida de alta calidad y utilizamos colorantes y pabilos de primer nivel, incorporándolos directamente al proceso de fabricación para obtener velas compactas, resistentes y de combustión uniforme.',
  },
  {
    num: '02',
    icon: 'procesos',
    titulo: 'Procesos controlados',
    texto:
      'Toda nuestra producción se desarrolla bajo procesos limpios, seguros y controlados, asegurando que cada vela mantenga la misma calidad y desempeño en cada lote, además de permitirnos cumplir responsablemente los tiempos de entrega comprometidos.',
  },
  {
    num: '03',
    icon: 'fabricacion',
    titulo: 'Fabricación con oficio',
    texto:
      'Nuestra producción combina maquinaria especializada con el oficio de quienes fabrican nuestras velas desde hace años. La tecnología aporta precisión y el trabajo humano el cuidado de cada detalle para lograr terminaciones consistentes en cada producción.',
  },
  {
    num: '04',
    icon: 'despacho',
    titulo: 'Preparación y despacho',
    texto:
      'Cada pedido es revisado, embalado y preparado cuidadosamente antes de salir de nuestra fábrica. Despachamos a todo Chile mediante Starken, con opción de pago contra entrega, ofreciendo un servicio rápido, seguro y confiable.',
  },
];

// Íconos lineales propios con micro-animación en loop (tipo gif, sutil).
// Los trazos estructurales se dibujan al entrar (pathLength); los acentos animan.
function Icono({ tipo }) {
  const p = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  const STAR =
    'M0 -3 L0.8 -0.8 3 0 0.8 0.8 0 3 -0.8 0.8 -3 0 -0.8 -0.8 Z';

  switch (tipo) {
    // ── Paso 1: Calidad — sello de aprobación + estrellas titilantes ──
    case 'materias':
      return (
        <svg viewBox="0 0 32 32" className="proc-icon w-7 h-7" {...p}>
          <circle pathLength={1} cx="15" cy="17" r="7.4" />
          <path pathLength={1} d="M11.4 17.2 14 19.8 18.8 14.6" />
          <g fill="currentColor" stroke="none">
            <g transform="translate(24 6.5) scale(1.2)">
              <path className="picon-spark a" d={STAR} />
            </g>
            <g transform="translate(6.5 8.5) scale(0.8)">
              <path className="picon-spark b" d={STAR} />
            </g>
            <g transform="translate(24.5 25) scale(0.72)">
              <path className="picon-spark c" d={STAR} />
            </g>
          </g>
        </svg>
      );

    // ── Paso 2: Procesos — línea de producción llenando un molde ──
    case 'procesos':
      return (
        <svg viewBox="0 0 32 32" className="proc-icon w-7 h-7" {...p}>
          {/* boquilla + gota que cae */}
          <path pathLength={1} d="M16 5.5V8" />
          <circle className="picon-drip" cx="16" cy="9.4" r="1.1" fill="currentColor" stroke="none" />
          {/* molde + relleno que sube */}
          <path pathLength={1} d="M12.8 11.5v6.2a1.1 1.1 0 0 0 1.1 1.1h4.2a1.1 1.1 0 0 0 1.1-1.1v-6.2" />
          <rect className="picon-fill" x="13.4" y="12.2" width="5.2" height="6.3" rx="0.4" fill="currentColor" stroke="none" opacity="0.85" />
          {/* cinta transportadora + rodillos */}
          <path pathLength={1} d="M5 24h22" />
          <circle pathLength={1} cx="8.5" cy="26.4" r="1.3" />
          <circle pathLength={1} cx="23.5" cy="26.4" r="1.3" />
          {/* elemento que avanza en la cinta */}
          <rect className="picon-item" x="6" y="21.6" width="2.4" height="2" rx="0.3" fill="currentColor" stroke="none" />
        </svg>
      );

    // ── Paso 3: Fabricación con oficio — "hecho a mano" (mano + llama) ──
    case 'fabricacion':
      return (
        <svg
          viewBox="0 0 418.5 495.9"
          className="proc-icon w-8 h-8"
          fill="currentColor"
          stroke="none"
          aria-hidden="true"
        >
          <g className="picon-hand">
            <path d="M313,145c-8.3-7.2-17.9,2.2-22.5,9.9-5.3,9-14.2,44.2-23.8,49.2-11.8,6.1-7.8-8.7-7.2-17.6.9-14,14.2-83.3-5.4-88.9-29.1-8.3-21.7,102.5-34.9,98.8-8-2.2-9-42.4-9.6-47.3-2.2-17.5-1.1-52.7-14.1-66.7-3.5-3.7-6.4-4.2-8.9-3.9-3.3.4-5.8,2.5-7.7,5.2-9.4,13.7-2.6,65.6-2.2,70.9.7,10.9,6.4,53.4-9.5,31.8-9.1-12.4-30.9-62-38.4-70.7-4.1-4.8-9.2-8.2-12.9-8.3-3.8,0-8.7,2.7-10.2,12.3-2.6,15.9,15.4,48,21.7,65.6,6.3,17.5,21.3,45,19,64.1-3.9,32.1-35.8-6.6-47.5-13.1-14.9-8.3-48.4-3.9-35.7,19.7,6.7,12.3,28.1,20.3,38.1,29.9,30.9,29.4,50.1,72.8,96.9,79.6-6.8,7-20.3,4.7-28.7,2.6,1.9,9.9,1.5,28.4,6.9,36.7,8.6,13.1,51.5,10.4,66.7,9.7,7.3-.3,27.4.5,30.4-5.3,3.8-7.3-6-34.2-7.4-42.6-3.7-21.1-1.7-17.6,10.6-35.3,15.8-22.8,18.6-51.4,18.4-78.3-.2-28.8,7.5-50.3,16.4-77.3,2.6-7.8,9.4-23.4,1.4-30.4ZM241.3,282c-6.5,14.6-27.9,20.5-12.5,43.2,3.7,5.9-4.6,2.2-4.6,2.2-16.3-9.5-39.5-27.1-31.1-46.4,7-14.6,27.9-20.5,13-43.5-4.2-5.9,4.2-1.8,4.2-1.8,16.3,9.5,39.9,26.7,31.1,46.4Z" />
          </g>
        </svg>
      );

    // ── Paso 4: Despacho — caja en movimiento (delivery) ──
    case 'despacho':
      return (
        <svg viewBox="0 0 32 32" className="proc-icon w-7 h-7" {...p}>
          <g className="picon-box">
            <path pathLength={1} d="M17 7 25 11.2v9L17 24.4 9 20.2v-9Z" />
            <path pathLength={1} d="M9 11.2 17 15.4l8-4.2" />
            <path pathLength={1} d="M17 15.4V24.4" />
          </g>
          <path className="picon-speed a" d="M7 13H4" />
          <path className="picon-speed b" d="M7 17H3" />
          <path className="picon-speed c" d="M7 21H4.5" />
        </svg>
      );

    default:
      return null;
  }
}

export default function NuestroProceso({ categoria }) {
  const ref = useRef(null);
  const cta = CTA_POR_CATEGORIA[categoria];

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = root.querySelectorAll('[data-step]');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      steps.forEach((s) => s.classList.add('revealed'));
      return;
    }

    // Reveal ligado al scroll: aparece al entrar; al subir (sale por abajo)
    // se oculta de nuevo. Si sale por arriba (scroll hacia abajo) se mantiene.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
          } else if (e.boundingClientRect.top > 0) {
            e.target.classList.remove('revealed');
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -12% 0px' }
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#FCFCFB] border-t border-border-default">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
        {/* Encabezado */}
        <div data-step className="proc-step max-w-2xl mb-16 md:mb-24">
          <p data-reveal className="type-eyebrow eyebrow-rule">
            Nuestro proceso
          </p>
          <h2
            data-reveal
            className="pd1 type-section text-[clamp(28px,4vw,44px)] mt-4"
          >
            Calidad en cada etapa.
          </h2>
          <p data-reveal className="pd2 type-body text-[15px] leading-[1.9] mt-6">
            Desde la selección de las materias primas hasta el despacho final,
            cuidamos cada detalle para entregar velas con altos estándares de
            calidad, terminaciones consistentes y entregas confiables.
          </p>
        </div>

        {/* Pasos */}
        <div className="max-w-3xl">
          {PASOS.map((paso, i) => (
            <div
              key={paso.num}
              data-step
              className="proc-step grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-8"
            >
              {/* Riel: nodo + conector */}
              <div className="flex flex-col items-center">
                <div
                  data-reveal
                  className="proc-ring w-14 h-14 md:w-16 md:h-16 rounded-full border border-border-default bg-bg-base text-text-muted flex items-center justify-center shrink-0 shadow-soft"
                >
                  <Icono tipo={paso.icon} />
                </div>
                {i < PASOS.length - 1 && (
                  <div className="relative w-px flex-1 my-3">
                    <div className="absolute inset-0 bg-border-default" />
                    <div className="proc-connector absolute inset-0 bg-gold" />
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="pb-14 md:pb-20 pt-1.5 md:pt-2.5">
                <p data-reveal className="type-eyebrow">
                  Paso {paso.num}
                </p>
                <h3
                  data-reveal
                  className="pd1 font-display text-[clamp(19px,2.4vw,26px)] text-text-primary mt-2 leading-snug"
                >
                  {paso.titulo}
                </h3>
                <p
                  data-reveal
                  className="pd2 type-body text-[15px] leading-[1.9] mt-3 max-w-xl"
                >
                  {paso.texto}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cierre — pilares + CTA por categoría */}
        <div
          data-step
          className="proc-step max-w-3xl mx-auto text-center mt-8 md:mt-14"
        >
          <div data-reveal className="w-10 h-px bg-gold/50 mx-auto mb-8" />
          <p
            data-reveal
            className="pd1 font-display italic text-[clamp(22px,3.2vw,32px)] text-text-primary leading-[1.34]"
          >
            Oficio, calidad y responsabilidad: los pilares claves que, desde
            hace más de 30 años, respaldan la confianza con nuestros clientes.
          </p>

          {cta && (
            <div className="mt-12 pt-10 border-t border-border-default max-w-xl mx-auto">
              <p data-reveal className="pd1 type-body text-[16px] leading-[1.75]">
                {cta}
              </p>
              <Link
                data-reveal
                href="/contacto"
                className="pd2 btn-primary mt-7"
              >
                Contáctanos
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
