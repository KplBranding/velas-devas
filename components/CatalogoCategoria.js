'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import ProductCard from './ProductCard';
import AnimatedText from './AnimatedText';
import ComoCotizar from './ComoCotizar';
import LeyendaColores from './LeyendaColores';
import DescargarCatalogo from './DescargarCatalogo';
import SubNav from './SubNav';
import DolorScrolly from './DolorScrolly';
import PausaFotografica from './PausaFotografica';
import SeccionOficio from './SeccionOficio';
import WinchaDevas from './WinchaDevas';
import NuestroProceso from './NuestroProceso';
import MarcasCarrusel from './MarcasCarrusel';
import Testimonios from './Testimonios';
import FAQ from './FAQ';

const ORDENES = [
  { key: 'alto-desc', label: 'Mayor diámetro' },
  { key: 'alto-asc', label: 'Menor diámetro' },
  { key: 'nombre', label: 'Nombre' },
];

export default function CatalogoCategoria({ categoria, productos }) {
  const [orden, setOrden] = useState('alto-desc');
  const landing = categoria.landing;
  const hayGrupos = productos.some((p) => Array.isArray(p.alturas));
  const procesoRef = useRef(null);

  // Quiebre: "Nuestro proceso" se fija (pin) al llegar a su final y el contenido
  // siguiente (foto + prueba social + FAQ) sube por encima. Solo desktop.
  useEffect(() => {
    const el = procesoRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'bottom bottom',
        end: '+=120%',
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });
      return () => st && st.kill();
    });
    return () => mm.revert();
  }, []);

  const lista = useMemo(() => {
    return [...productos].sort((a, b) => {
      const da = a.diametro_cm ?? a.alto_cm ?? 0;
      const db = b.diametro_cm ?? b.alto_cm ?? 0;
      switch (orden) {
        case 'alto-asc':
          return da - db;
        case 'nombre':
          return a.nombre.localeCompare(b.nombre, 'es');
        case 'alto-desc':
        default:
          return db - da;
      }
    });
  }, [productos, orden]);

  // Scroll suave y controlado hacia el catálogo (más sutil que el smooth nativo,
  // que además choca con las secciones pinned). Easing propio + duración según
  // distancia. Aplica igual en móvil y escritorio.
  const irACatalogo = (e) => {
    e.preventDefault();
    const destino = document.getElementById('catalogo');
    if (!destino) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startY = window.scrollY;
    const targetY = destino.getBoundingClientRect().top + startY - 112; // navbar
    const dist = targetY - startY;
    if (reduce || dist === 0) {
      window.scrollTo(0, targetY);
      return;
    }
    // Desactiva el smooth nativo del CSS durante la animación (evita doble suavizado).
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    const dur = Math.min(1700, Math.max(800, Math.abs(dist) * 0.42));
    const easeInOut = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    let startT = null;
    const step = (now) => {
      if (startT === null) startT = now;
      const p = Math.min(1, (now - startT) / dur);
      window.scrollTo(0, startY + dist * easeInOut(p));
      if (p < 1) requestAnimationFrame(step);
      else html.style.scrollBehavior = prevBehavior;
    };
    requestAnimationFrame(step);
  };

  return (
    <section>
      {/* ── Hero fotográfico full-width ── */}
      <div
        className={`relative flex items-end overflow-hidden grain ${
          landing ? 'h-[420px] md:h-[520px]' : 'h-[360px] md:h-[440px]'
        }`}
      >
        <Image
          src={categoria.imagen}
          alt={`Velas de ${categoria.nombre}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: categoria.heroPos || '50% 50%',
            animation: 'slow-zoom 16s ease-out forwards',
          }}
        />
        {/* Sin degradé en landing: la imagen se ve completa. La legibilidad del
            texto se resuelve con text-shadow. */}
        {!landing && (
          <>
            <div className="absolute inset-0 veil-bottom" />
            <div className="absolute inset-0 veil-gold opacity-70" />
          </>
        )}

        <div
          className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-8 pb-10"
          style={
            landing
              ? {
                  textShadow:
                    '0 1px 3px rgba(0,0,0,0.5), 0 4px 34px rgba(0,0,0,0.6)',
                }
              : undefined
          }
        >
          <p className="type-eyebrow-light eyebrow-rule reveal">
            {categoria.eyebrow}
          </p>
          <AnimatedText
            as="h1"
            animation="maskReveal"
            className="font-display text-[#F5F5EE] text-[clamp(40px,7vw,72px)] font-normal mt-4 leading-[0.98]"
          >
            {categoria.nombre}
            <sup className="text-[0.32em] text-[#C8D0A8] ml-2 align-top font-sans font-bold tracking-normal">
              {categoria.superindice}
            </sup>
          </AnimatedText>
          {categoria.heroLead && (
            <p className="reveal reveal-delay-2 mt-4 max-w-lg font-sans text-[#EDEFE6] text-[clamp(15px,2vw,19px)] leading-snug">
              {categoria.heroLead}
            </p>
          )}

          {landing && (
            <div className="reveal reveal-delay-3 mt-7 flex flex-wrap gap-3">
              <a
                href="#catalogo"
                onClick={irACatalogo}
                className="btn-light"
                style={{ textShadow: 'none' }}
              >
                Ver catálogo
              </a>
              <Link
                href="/contacto"
                className="inline-block font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-[#F5F5EE] border border-[#F5F5EE]/60 rounded px-6 py-[13px] hover:bg-[#F5F5EE]/12 transition-colors press"
              >
                Solicitar cotización
              </Link>
            </div>
          )}
        </div>

        {/* Indicador de scroll (llena el aire y guía hacia la historia) */}
        {landing && (
          <div
            aria-hidden
            className="scroll-cue absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[#F5F5EE]/75"
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
        )}
      </div>

      {/* ── Sub-navegación sticky (OCULTA temporalmente: probando hero → texto) ── */}
      {/* {landing && <SubNav />} */}

      {landing ? (
        <>

          {/* ── Quiebre: la sección 1 (sticky) se queda y el video sube por
                 encima. La sección 1 revela título 4 líneas + bullets. ── */}
          <div className="relative">
            <DolorScrolly
              lineas={landing.dolorLineas}
              parrafo={landing.dolor}
              bullets={landing.bullets}
              marcador={landing.bulletMarcador}
            />
            {/* Espacio para que la sección 1 (sticky) se mantenga ANTES de que el
               video suba por encima. Solo en desktop: en móvil DolorScrolly es
               estático (sin pin), así que el spacer dejaría un hueco enorme. */}
            <div aria-hidden className="hidden md:block h-[160vh]" />
            {landing.pausa && (
              <div className="relative z-20">
                <PausaFotografica
                  src={landing.pausa.imagen}
                  video={landing.pausa.video}
                  frase={landing.pausa.frase}
                  posicion={landing.pausa.pos}
                  cta={landing.pausa.cta}
                />
              </div>
            )}
          </div>

          {/* ── El oficio: split editorial con foto + beneficios refinados ── */}
          {landing.oficio && (
            <SeccionOficio
              foto={landing.oficio.foto}
              fotoPos={landing.oficio.fotoPos}
              fotoColor={landing.oficio.fotoColor}
              eyebrow={landing.oficio.eyebrow}
              titulo={landing.oficio.titulo}
              texto={landing.oficio.texto}
              beneficios={landing.beneficios}
              cta={landing.oficio.cta}
            />
          )}

          {/* ── Wincha divisoria hacia el catálogo ── */}
          <WinchaDevas />
        </>
      ) : (
        /* Layout base para categorías sin narrativa definida */
        <div className="border-b border-border-default bg-bg-base">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-[1fr_auto] gap-6 md:items-end">
            <p className="type-body text-[15px] leading-[1.9] max-w-xl">
              {categoria.descripcion}
            </p>
            <p className="type-label md:text-right whitespace-nowrap">
              {lista.length} formatos
            </p>
          </div>
        </div>
      )}

      {/* ── CATÁLOGO ── (cursor-native: puntero tradicional para facilitar el clic) */}
      <div id="catalogo" className="scroll-mt-[128px] cursor-native">
        {landing && (
          <div className="bg-bg-base">
            <div className="max-w-6xl mx-auto px-5 md:px-8 pt-8 md:pt-12">
              <p className="type-eyebrow eyebrow-rule" data-reveal-up>Catálogo</p>
              <AnimatedText
                as="h2"
                animation="maskReveal"
                className="type-section text-[clamp(24px,3.4vw,38px)] mt-3 max-w-2xl"
              >
                {landing.catalogoTitulo || 'Nuestros formatos'}
              </AnimatedText>
              <p
                data-reveal-up
                className="type-body text-[15px] leading-[1.85] mt-4 max-w-xl"
              >
                {landing.catalogoIntro}
              </p>
              <ComoCotizar />
            </div>
          </div>
        )}

        {/* Barra de orden + leyenda de colores (sticky solo si no hay sub-nav) */}
        <div
          className={`border-b border-border-default chrome-glass mt-8 ${
            landing ? '' : 'sticky top-[112px] z-30'
          }`}
        >
          <div className="max-w-6xl mx-auto px-5 md:px-8 h-[54px] flex items-center justify-between gap-6">
            <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
              <label className="flex items-center gap-2 shrink-0">
                <span className="type-label whitespace-nowrap hidden sm:inline">
                  Ordenar por
                </span>
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  className="font-sans text-nav text-text-primary bg-transparent border-none focus:outline-none cursor-pointer pr-1"
                >
                  {ORDENES.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              {hayGrupos && <LeyendaColores className="hidden md:flex" />}
              <DescargarCatalogo pdf={categoria.pdf} categoria={categoria.slug} />

            </div>
          </div>
        </div>

        {/* Grilla de productos */}
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-10 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {lista.map((p, i) => (
              <ProductCard key={p.id} producto={p} index={i} />
            ))}
          </div>

          {lista.length === 0 && (
            <p className="type-body py-16 text-center">
              No hay formatos para este filtro.
            </p>
          )}
        </div>
      </div>

      {/* ── Quiebre: "Nuestro proceso" queda fijo (sticky) y el contenido
             siguiente (foto + prueba social + FAQ) sube por encima ── */}
      <div className="relative">
        <div
          id="proceso"
          ref={procesoRef}
          className="relative z-0 scroll-mt-[128px]"
        >
          <NuestroProceso categoria={categoria.slug} />
        </div>

        <div className="relative z-20">
          {/* Franja fotográfica */}
          {landing?.fotoFranja && (
            <section className="relative w-full h-[52vh] min-h-[360px] md:h-[60vh] overflow-hidden grain">
              <Image
                src={landing.fotoFranja}
                alt="Mesa de evento con velas Velas Devas"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </section>
          )}

          {/* Prueba social */}
          <MarcasCarrusel categoria={categoria.slug} />
          <div id="testimonios" className="scroll-mt-[128px]">
            <Testimonios />
          </div>
          <div id="faq" className="scroll-mt-[128px]">
            <FAQ />
          </div>
        </div>
      </div>

      {/* ── CTA final: cerrar la historia e invitar a conversar ── */}
      <div className="relative overflow-hidden bg-black-graphic grain">
        <Image
          src={landing?.ctaFinal?.imagen || '/images/editorial/llama.jpg'}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 veil-full" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-20 text-center">
          {landing?.ctaFinal?.eyebrow && (
            <p className="type-eyebrow-light eyebrow-rule mx-auto" data-reveal-up>
              {landing.ctaFinal.eyebrow}
            </p>
          )}
          <AnimatedText
            as="h2"
            animation="maskReveal"
            className="font-display text-[#F5F5EE] text-[clamp(28px,4vw,44px)] font-normal mb-5 leading-tight"
          >
            {landing?.ctaFinal?.titulo || 'Fabricamos formatos a pedido'}
          </AnimatedText>
          {landing?.ctaFinal?.bajada && (
            <p
              data-reveal-up
              className="font-sans text-[#EDEFE6] text-[15px] md:text-[16px] leading-[1.7] max-w-xl mx-auto mb-8"
            >
              {landing.ctaFinal.bajada}
            </p>
          )}
          <Link
            href="/contacto"
            className="btn-light group/cta inline-flex items-center gap-2.5"
            data-reveal-up
          >
            {landing?.ctaFinal?.boton || 'Solicitar cotización'}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="transition-transform duration-[var(--dur-base)] ease-[var(--ease-entrance)] group-hover/cta:translate-x-1"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
