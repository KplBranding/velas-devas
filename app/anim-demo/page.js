'use client';

import AnimatedText from '../../components/AnimatedText';

export const dynamicParams = false;

const DEMOS = [
  { a: 'fadeUp', t: 'Fade Up' },
  { a: 'maskReveal', t: 'Mask Reveal' },
  { a: 'chars', t: 'Character Stagger' },
  { a: 'words', t: 'Word Stagger' },
  { a: 'blur', t: 'Blur Reveal' },
  { a: 'letterRotate', t: 'Letter Rotate' },
  { a: 'slideLeft', t: 'Slide Left' },
  { a: 'slideRight', t: 'Slide Right' },
  { a: 'scaleIn', t: 'Scale In' },
  { a: 'opacity', t: 'Opacity Reveal' },
  { a: 'scramble', t: 'Scramble Text' },
  { a: 'typewriter', t: 'Typewriter' },
  { a: 'scrollReveal', t: 'Scroll Reveal' },
];

export default function AnimDemo() {
  return (
    <main className="bg-bg-hero">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-text-muted">
          Demo · componente AnimatedText (GSAP + SplitText)
        </p>
        <h1 className="font-display text-[clamp(30px,6vw,60px)] text-text-primary mt-3 mb-4">
          Baja lento para dispararlas
        </h1>
        <p className="type-body text-[15px] max-w-xl">
          Cada bloque usa <code>&lt;AnimatedText animation=&quot;...&quot;&gt;</code> y se
          activa con ScrollTrigger al entrar en pantalla.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-40">
        {DEMOS.map((d) => (
          <div
            key={d.a}
            className="min-h-[70vh] flex flex-col justify-center border-t border-border-default"
          >
            <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-text-muted mb-5">
              {d.t} · <span className="text-gold">animation=&quot;{d.a}&quot;</span>
            </p>
            <AnimatedText
              as="h2"
              animation={d.a}
              className="font-display text-[clamp(28px,5vw,52px)] text-text-primary leading-[1.1]"
            >
              La confianza también se fabrica.
            </AnimatedText>
          </div>
        ))}

        {/* Paragraph + Editorial (multilínea) */}
        <div className="min-h-[70vh] flex flex-col justify-center border-t border-border-default">
          <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-text-muted mb-5">
            Paragraph Reveal · <span className="text-gold">animation=&quot;paragraph&quot;</span>
          </p>
          <AnimatedText
            as="p"
            animation="paragraph"
            className="type-body text-[clamp(16px,2vw,20px)] leading-[1.8] max-w-2xl"
          >
            Coordinar un evento son meses de trabajo, cientos de detalles y
            clientes que confían en que todo salga perfecto. Fabricamos con
            stock, calidad pareja y entregas que puedes comprometer con tus
            clientes.
          </AnimatedText>
        </div>

        <div className="min-h-[70vh] flex flex-col justify-center border-t border-border-default">
          <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-text-muted mb-5">
            Editorial Line Reveal · <span className="text-gold">animation=&quot;editorial&quot;</span>
          </p>
          <AnimatedText
            as="h2"
            animation="editorial"
            className="font-display text-[clamp(26px,4.5vw,46px)] text-text-primary leading-[1.2] max-w-2xl"
          >
            Treinta años haciendo la misma vela con el mismo estándar, pedido
            tras pedido.
          </AnimatedText>
        </div>
      </div>
    </main>
  );
}
