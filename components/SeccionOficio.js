import Link from 'next/link';
import Image from 'next/image';
import Reveal from './Reveal';

// "El oficio": rompe el ritmo con un split editorial (fotografía protagonista +
// texto). Los beneficios van como lista numerada refinada (no íconos corporativos).
export default function SeccionOficio({
  foto,
  fotoPos,
  eyebrow = 'El oficio',
  titulo,
  texto,
  beneficios = [],
  cta,
}) {
  return (
    <section className="bg-bg-base border-b border-border-default overflow-hidden">
      <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:items-stretch">
        {/* Fotografía protagonista — filtro editorial B&N (no destructivo).
            Para volver a COLOR: quitar la propiedad `filter` del style. */}
        <div className="relative h-[360px] md:h-auto md:min-h-[580px] grain">
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
          <Reveal as="p" className="type-eyebrow eyebrow-rule">
            {eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="font-display text-[clamp(26px,3.6vw,40px)] text-text-primary leading-[1.2] mt-4"
          >
            {titulo}
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="type-body text-[15px] leading-[1.9] mt-5 max-w-md"
          >
            {texto}
          </Reveal>

          <ul className="mt-9 border-t border-border-default">
            {beneficios.map((b, i) => (
              <Reveal
                as="li"
                key={b.t}
                delay={0.16 + i * 0.05}
                className="group flex items-baseline gap-4 py-3.5 border-b border-border-default cursor-default"
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
              </Reveal>
            ))}
          </ul>

          {cta && (
            <Reveal as="div" delay={0.16 + beneficios.length * 0.05}>
              <Link href="/contacto" className="btn-primary mt-9 inline-block">
                {cta}
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
