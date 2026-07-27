import Link from 'next/link';
import Image from 'next/image';

// "Nuestro compromiso" (¿Por qué elegir Velas Devas?). Split editorial: la
// página se divide en dos → IZQUIERDA la fotografía, DERECHA el texto. En móvil
// se apila (imagen arriba, texto abajo). Las columnas se estiran a la misma
// altura (grid items-stretch), así la foto acompaña al texto sin recortes raros.
// Los textos entran con el reveal global [data-reveal-up] (vinculado al scroll).
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
      <div className="md:grid md:grid-cols-2 md:items-stretch">
        {/* IZQUIERDA · Fotografía protagonista */}
        <div className="relative h-[54vh] min-h-[340px] md:h-auto overflow-hidden grain">
          <Image
            src={foto}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
            className="object-cover"
            style={{
              objectPosition: fotoPos || '50% 50%',
              filter: fotoColor
                ? 'contrast(1.02)'
                : 'grayscale(100%) contrast(1.06) brightness(0.98)',
            }}
          />
          {/* Velo inferior sutil solo en móvil, para fundir con el texto de abajo */}
          <div className="pointer-events-none absolute inset-0 veil-bottom opacity-40 md:hidden" />
        </div>

        {/* DERECHA · Texto */}
        <div className="flex flex-col justify-center px-5 md:px-10 lg:px-16 py-14 md:py-20">
          <div className="w-full max-w-xl">
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
              className="type-body text-[15px] leading-[1.9] mt-5"
            >
              {texto}
            </p>

            <ul className="mt-9">
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
      </div>
    </section>
  );
}
