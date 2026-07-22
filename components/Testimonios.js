import { TESTIMONIOS } from '../lib/contenido';
import AnimatedText from './AnimatedText';

export default function Testimonios() {
  return (
    <section className="border-t border-border-default bg-bg-hero">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <p className="type-eyebrow eyebrow-rule" data-reveal-up>Testimonios</p>
        <AnimatedText
          as="h2"
          animation="maskReveal"
          className="type-section text-[clamp(24px,3.4vw,38px)] mt-3 mb-12"
        >
          Lo que dicen nuestros clientes
        </AnimatedText>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIOS.map((t, i) => (
            <figure
              key={i}
              data-reveal-up
              className="bg-bg-base border border-border-default rounded-[6px] p-7 shadow-soft flex flex-col"
            >
              <span
                className="font-display text-gold text-[44px] leading-none mb-2 select-none"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="type-body text-[15px] leading-[1.8] flex-1">
                {t.texto}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border-default">
                <p className="font-sans text-[13px] font-bold text-text-primary">
                  {t.nombre}
                </p>
                <p className="type-label mt-0.5">{t.cargo}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
