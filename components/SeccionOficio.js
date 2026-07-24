import Link from 'next/link';
import Image from 'next/image';

// "Nuestro compromiso" (¿Por qué confiar?). La FOTOGRAFÍA queda fija (sticky)
// ocupando la pantalla; el panel de texto —con fondo sólido— sube por encima y
// la va TAPANDO a medida que se hace scroll, hasta cubrirla por completo, y
// entonces la navegación continúa normal.
//
// Efecto CSS puro: sticky + z-index + fondo opaco. Sin pin de GSAP → sin jank y
// funciona igual en móvil. Los textos entran con el reveal global
// [data-reveal-up], que va vinculado al scroll (se revierte al subir).
export default function SeccionOficio({
  foto,
  fotoPos,
  fotoColor = false, // true → foto a color (sin filtro B&N)
  eyebrow = 'El oficio',
  titulo,
  texto,
  beneficios = [],
  cta,
}) {
  return (
    <section className="relative bg-bg-base">
      {/* Fotografía protagonista: fija mientras el texto sube y la cubre.
          min-h del panel de texto = 100svh → la foto queda fijada hasta que el
          texto la tapa por completo. */}
      <div className="sticky top-0 h-[100svh] overflow-hidden grain">
        <Image
          src={foto}
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover"
          style={{
            objectPosition: fotoPos || '50% 50%',
            filter: fotoColor
              ? 'contrast(1.02)'
              : 'grayscale(100%) contrast(1.06) brightness(0.98)',
          }}
        />
        {/* Velo inferior sutil: da profundidad y funde el borde con el texto */}
        <div className="pointer-events-none absolute inset-0 veil-bottom opacity-40" />
      </div>

      {/* Panel de texto: sube por encima de la foto (fondo sólido → la tapa) */}
      <div className="relative z-10 bg-bg-base min-h-[100svh] flex items-center">
        <div className="max-w-3xl mx-auto w-full px-5 md:px-8 py-20 md:py-28">
          <p data-reveal-up className="type-eyebrow eyebrow-rule">
            {eyebrow}
          </p>
          <h2
            data-reveal-up
            className="font-display text-[clamp(26px,3.6vw,40px)] text-text-primary leading-[1.2] mt-4"
          >
            {titulo}
          </h2>
          <p
            data-reveal-up
            className="type-body text-[15px] leading-[1.9] mt-5 max-w-xl"
          >
            {texto}
          </p>

          <ul className="mt-9 max-w-xl">
            {beneficios.map((b, i) => (
              <li
                data-reveal-up
                key={b.t}
                className={`group flex items-baseline gap-4 py-3.5 border-b border-border-default cursor-default ${
                  i === 0 ? 'border-t border-border-default' : ''
                }`}
              >
                <span className="font-display text-gold text-[14px] leading-none w-6 shrink-0 transition-colors duration-[var(--dur-base)] group-hover:text-accent-mid">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative font-sans text-[14px] md:text-[15px] text-text-body leading-snug transition-colors duration-[var(--dur-base)] group-hover:text-text-primary">
                  {b.t}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 -bottom-1 h-px w-full bg-accent-mid origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-entrance)] group-hover:scale-x-100"
                  />
                </span>
              </li>
            ))}
          </ul>

          {cta && (
            <div data-reveal-up>
              <Link href="/contacto" className="btn-primary mt-9 inline-block">
                {cta}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
