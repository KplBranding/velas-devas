'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import useParallax from '../lib/motion/useParallax';
import { PARALLAX } from '../lib/motion/config';
import { getLenis } from '../lib/motion/engine';
import ProductCard from './ProductCard';
import ConfiguradorVelones from './ConfiguradorVelones';
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
  const sobria = landing?.variante === 'sobria';
  const hayGrupos = productos.some((p) => Array.isArray(p.alturas));
  const procesoRef = useRef(null);
  const catHeaderRef = useRef(null);
  // Parallax (Motion System) para las imágenes full-bleed. Aplica en todas las
  // categorías con narrativa (landing): franja y CTA final.
  const franjaParallax = useParallax(landing ? PARALLAX.background : PARALLAX.content);
  const ctaParallax = useParallax(landing ? PARALLAX.decor : PARALLAX.content);
  // Cadena sobria: la capa 1 (compromiso+wincha) NUNCA se fija. Solo sube MÁS
  // LENTO que el scroll (lag), de modo que la capa 2 (catálogo), que sube a
  // velocidad normal, la va alcanzando y pasando por encima. Diferencial puro.
  const capa1Ref = useRef(null);
  useEffect(() => {
    if (!landing) return; // efecto de capas en todas las categorías con narrativa
    const el = capa1Ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const tw = gsap.fromTo(
        el,
        { y: 0 },
        {
          // Se desplaza hacia abajo respecto al scroll → sube más lento. Más
          // alto = capa 1 más lenta y el catálogo alcanza a cubrirla más.
          y: () => window.innerHeight * 0.9,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            // Se extiende más allá de 'bottom top' porque el transform hace que
            // la posición real de la capa 1 quede por debajo de su posición de
            // flujo; así el diferencial sigue activo hasta que queda cubierta y
            // no se frena a mitad de camino.
            end: 'bottom top-=75%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
      return () => tw.scrollTrigger && tw.scrollTrigger.kill();
    });
    return () => mm.revert();
  }, [landing]);

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

  // "Imán suave" (soft settle) al catálogo: NO congela el scroll. Solo cuando el
  // usuario se DETIENE cerca del encabezado del catálogo, la página se acomoda
  // sola con un ease suave hasta encuadrarlo bajo la barra de menú. Así no se
  // pasa de largo de la sección importante, sin la sensación de "freeze".
  useEffect(() => {
    if (!landing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let settleTimer;
    let lastTarget = -1;

    const settle = () => {
      if (window.matchMedia('(max-width: 767px)').matches) return;
      const el = catHeaderRef.current;
      if (!el) return;
      const targetY = el.getBoundingClientRect().top + window.scrollY - 112;
      const delta = targetY - window.scrollY;
      const captura = window.innerHeight * 0.6; // zona de "arrastre" (amplia)
      // Fuera de la zona: reseteo para que el imán vuelva a funcionar al reingresar.
      if (Math.abs(delta) >= captura) {
        lastTarget = -1;
        return;
      }
      // Solo acomoda si te detuviste CERCA (no si estás lejos navegando la grilla).
      if (Math.abs(delta) > 12) {
        if (Math.abs(targetY - lastTarget) < 4) return; // evita re-imantar al mismo punto
        lastTarget = targetY;
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(targetY, {
            duration: 0.9,
            easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
          });
        } else {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }
    };

    // Escucha el scroll de la ventana (Lenis desplaza el documento → dispara
    // 'scroll'); al detenerse (debounce), intenta acomodar.
    const onScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 110);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(settleTimer);
    };
  }, [landing]);

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

  // Modo configurador: los velones (grupos con diámetro y alturas) se muestran en
  // un solo módulo con selector de diámetro/alto + silueta a escala. Los sueltos
  // (p. ej. Vela de Bautizo) siguen como tarjeta normal. El orden manual no aplica
  // a los velones (el configurador los ordena por diámetro internamente).
  const usarConfigurador = !!categoria.configurador;
  const esVelon = (p) => p.diametro_cm != null && Array.isArray(p.alturas);
  const velones = usarConfigurador ? lista.filter(esVelon) : [];
  const sueltos = usarConfigurador ? lista.filter((p) => !esVelon(p)) : lista;

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

  // Bloque del catálogo, extraído para poder ubicarlo en su lugar normal (otras
  // categorías) o DENTRO de la cadena apilada del flujo sobrio (Funerarias),
  // donde es la "capa 2" que se monta sobre "Nuestro compromiso + wincha".
  const catalogo = (
    <div id="catalogo" className="scroll-mt-[128px] cursor-native">
      {landing && (
        <div ref={catHeaderRef} className="bg-bg-base">
          <div className="max-w-6xl mx-auto px-5 md:px-8 pt-8 md:pt-12">
            <p className="type-eyebrow eyebrow-rule" data-reveal-up>
              Catálogo
            </p>
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

      {/* Barra de orden + leyenda de colores */}
      <div
        className={`border-b border-border-default chrome-glass mt-8 ${
          landing ? '' : 'sticky top-[112px] z-30'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-[54px] flex items-center justify-between gap-6">
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
            {usarConfigurador ? (
              <span className="type-label whitespace-nowrap">
                Selecciona diámetro y alto abajo
              </span>
            ) : (
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
            )}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {hayGrupos && <LeyendaColores className="hidden md:flex" />}
            <DescargarCatalogo pdf={categoria.pdf} categoria={categoria.slug} />
          </div>
        </div>
      </div>

      {/* Productos: configurador (velones) + tarjetas (sueltos), o grilla simple */}
      {usarConfigurador ? (
        <>
          {velones.length > 0 && (
            <ConfiguradorVelones
              productos={velones}
              titulo={categoria.configuradorTitulo}
              lead={categoria.configuradorLead}
            />
          )}
          {sueltos.length > 0 && (
            <div className="max-w-6xl mx-auto px-5 md:px-8 pt-2 pb-20">
              <p className="type-eyebrow eyebrow-rule mb-6">
                También en {categoria.nombre}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {sueltos.map((p, i) => (
                  <ProductCard key={p.id} producto={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
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
      )}
    </div>
  );

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
                {landing.ctaVerCatalogo || 'Ver catálogo'}
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
        sobria ? (
          /* ── Flujo SOBRIO (Funerarias): CADENA DE CAPAS APILADAS ──
             Capa 0: Pausa → Capa 1: [Compromiso COMPACTO + wincha] (caben juntos
             en pantalla) → Capa 2: Catálogo. Cada capa (opaca, z mayor) sube y se
             monta sobre la anterior semi-sticky. El catálogo tapa primero la
             wincha y luego el texto de "Nuestro compromiso". ── */
          <>
            <DolorScrolly
              simple
              lineas={landing.dolorLineas}
              parrafo={landing.dolor}
            />

            <div className="relative">
              {/* Capa 0 · Pausa (queda fija) */}
              {landing.pausa && (
                <PausaFotografica
                  modoSticky
                  src={landing.pausa.imagen}
                  video={landing.pausa.video}
                  frase={landing.pausa.frase}
                  posicion={landing.pausa.pos}
                  cta={landing.pausa.cta}
                />
              )}

              {/* Capa 1 · Compromiso (compacto) + wincha, como una sola capa.
                 NUNCA se fija: solo sube más lento (lag) para que la capa 2 la
                 pase por encima. */}
              <div
                ref={capa1Ref}
                className="relative z-10 bg-white will-change-transform"
              >
                {landing.oficio && (
                  <SeccionOficio
                    compacto
                    foto={landing.oficio.foto}
                    fotoPos={landing.oficio.fotoPos}
                    fotoColor={landing.oficio.fotoColor}
                    eyebrow={landing.oficio.eyebrow}
                    titulo={landing.oficio.titulo}
                    texto={landing.oficio.texto}
                    beneficios={landing.beneficios}
                    cta={landing.oficio.cta}
                    bgClass="bg-white"
                  />
                )}
                <div className="bg-white h-[13vh] md:h-[15vh] flex items-center overflow-hidden">
                  <WinchaDevas />
                </div>
              </div>

              {/* Aire (blanco) entre la wincha y el catálogo: NO va dentro de la
                 capa 1, así la wincha (que baja con el lag) queda visible sobre
                 blanco antes de que el catálogo la alcance. También retrasa el
                 inicio de la capa 2. */}
              <div
                aria-hidden
                className="hidden md:block relative z-[5] h-[64vh] bg-white"
              />

              {/* Capa 2 · Catálogo. Sube como capa superior y se monta sobre la
                 capa 1 (primero la wincha, luego el compromiso), con sombra. */}
              <div className="relative z-20 bg-bg-base shadow-[0_-16px_38px_-16px_rgba(30,37,30,0.20)]">
                {catalogo}
              </div>
            </div>
          </>
        ) : (
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
            {/* Espacio para que los conceptos (sticky) tengan recorrido de scroll
               para su animación. Solo en desktop (en móvil DolorScrolly es estático). */}
            <div aria-hidden className="hidden md:block h-[160vh]" />
          </div>

          {/* ── Cadena de capas (opción A): el VIDEO queda fijo (sticky), la
                 capa 1 (compromiso compacto + wincha) sube y lo tapa, y el
                 catálogo (capa 2) se monta sobre la capa 1. Los conceptos quedan
                 arriba, intactos. ── */}
          <div className="relative">
            {/* Capa 0 · Video (queda fijo, como la pausa de funerarias) */}
            {landing.pausa && (
              <PausaFotografica
                modoSticky
                src={landing.pausa.imagen}
                video={landing.pausa.video}
                frase={landing.pausa.frase}
                posicion={landing.pausa.pos}
                cta={landing.pausa.cta}
              />
            )}

            {/* Capa 1 · Compromiso (compacto) + wincha (sube más lento) */}
            <div
              ref={capa1Ref}
              className="relative z-10 bg-white will-change-transform"
            >
              {landing.oficio && (
                <SeccionOficio
                  compacto
                  foto={landing.oficio.foto}
                  fotoPos={landing.oficio.fotoPos}
                  fotoColor={landing.oficio.fotoColor}
                  eyebrow={landing.oficio.eyebrow}
                  titulo={landing.oficio.titulo}
                  texto={landing.oficio.texto}
                  beneficios={landing.beneficios}
                  cta={landing.oficio.cta}
                  bgClass="bg-white"
                />
              )}
              <div className="bg-white h-[13vh] md:h-[15vh] flex items-center overflow-hidden">
                <WinchaDevas />
              </div>
            </div>

            <div
              aria-hidden
              className="hidden md:block relative z-[5] h-[64vh] bg-white"
            />

            <div className="relative z-20 bg-bg-base shadow-[0_-16px_38px_-16px_rgba(30,37,30,0.20)]">
              {catalogo}
            </div>
          </div>
        </>
        )
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

      {/* En las categorías con narrativa (landing) el catálogo va DENTRO de la
         cadena de capas (capa 2). Solo las categorías SIN narrativa lo muestran
         aquí, en su lugar normal. */}
      {!landing && catalogo}

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
              <div
                ref={franjaParallax}
                className="absolute -top-[12%] left-0 right-0 h-[124%] will-change-transform"
              >
                <Image
                  src={landing.fotoFranja}
                  alt="Velas Devas"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </section>
          )}

          {/* Prueba social */}
          <MarcasCarrusel categoria={categoria.slug} />
          {/* ── TESTIMONIOS: oculto hasta tener testimonios reales. Para
             reactivar, descomentar este bloque (el import de Testimonios se
             mantiene arriba). ──
          <div id="testimonios" className="scroll-mt-[128px]">
            <Testimonios />
          </div>
          */}
          <div id="faq" className="scroll-mt-[128px]">
            <FAQ />
          </div>
        </div>
      </div>

      {/* ── CTA final: cerrar la historia e invitar a conversar ── */}
      <div className="relative overflow-hidden bg-black-graphic grain">
        <div
          ref={ctaParallax}
          className="absolute -top-[12%] left-0 right-0 h-[124%] will-change-transform"
        >
          <Image
            src={landing?.ctaFinal?.imagen || '/images/editorial/llama.jpg'}
            alt=""
            fill
            sizes="100vw"
            className={landing?.ctaFinal?.imagenClase || 'object-cover opacity-40'}
          />
        </div>
        {/* Velo: más suave si la imagen ya es oscura (evita apagarla del todo) */}
        <div
          className={`absolute inset-0 veil-full ${
            landing?.ctaFinal?.imagenClase ? 'opacity-60' : ''
          }`}
        />
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
