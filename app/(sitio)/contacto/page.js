import ContactForm from '../../../components/ContactForm';
import AnimatedText from '../../../components/AnimatedText';
import { EMPRESA } from '../../../lib/categorias';

export const metadata = {
  title: 'Contacto — Cotizaciones mayoristas',
  description:
    'Solicita una cotización mayorista de velas para banquetería, iglesias o funerarias. Fabricación artesanal en Santiago, Chile.',
};

export default function ContactoPage() {
  return (
    <section className="bg-bg-base">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        {/* Encabezado */}
        <div className="mb-12 max-w-2xl">
          <p className="type-eyebrow eyebrow-rule">Cotizaciones mayoristas</p>
          <AnimatedText as="h1" animation="maskReveal" className="type-hero mt-5">
            Hablemos de
            <br />
            <span className="type-hero-italic text-gold">tu proyecto</span>
          </AnimatedText>
          <p className="type-body text-[15px] mt-6 max-w-lg">
            Cuéntanos qué formatos y cantidades necesitas y te prepararemos una
            cotización a medida. Fabricamos principalmente para mayoristas, con
            stock permanente en velas color Blanco Nieve y Marfil, y despacho a
            todo Chile vía Starken.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.25fr_1fr] gap-12 md:gap-16 items-start">
          {/* Formulario */}
          <div className="order-2 md:order-1">
            <ContactForm />
          </div>

          {/* Canales directos */}
          <aside className="order-1 md:order-2 space-y-8">
            <div
              data-reveal-up
              className="border border-border-default rounded-[6px] p-6 md:p-7"
            >
              <p className="type-eyebrow eyebrow-rule">Escríbenos directo</p>

              {/* WhatsApp destacado */}
              <a
                href={`https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(
                  'Hola Velas Devas, quisiera cotizar velas.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 flex items-center justify-between gap-3 rounded-[4px] bg-graphite text-blanco-calido px-4 py-3.5 transition-shadow duration-500 hover:shadow-lift press"
              >
                <span className="flex items-center gap-2.5 font-sans text-[13px] font-medium">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Escribir por WhatsApp
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              {/* Correo + teléfono */}
              <div className="mt-5 space-y-4 border-t border-border-default pt-5">
                <Canal
                  label="Correo"
                  valor={EMPRESA.email}
                  href={`mailto:${EMPRESA.email}`}
                  icon={
                    <>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </>
                  }
                />
                <Canal
                  label="Teléfono"
                  valor={EMPRESA.telefono}
                  href={`tel:${EMPRESA.telefonoLink}`}
                  icon={
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                  }
                />
              </div>
            </div>

            {/* Datos secundarios */}
            <div
              data-reveal-up
              className="space-y-7 border-t border-border-default pt-8"
            >
              <Dato label="Dirección" valor={EMPRESA.direccion} />
              <Dato label="Horario" valor="Lunes a viernes · 9:00 – 18:00" />
              <p className="type-body pt-1">
                Atendemos únicamente pedidos mayoristas para banquetería,
                iglesias y funerarias.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Canal({ label, valor, href, icon }) {
  return (
    <a href={href} className="group flex items-center gap-3.5">
      <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full border border-border-default text-text-body group-hover:text-gold group-hover:border-gold transition-colors">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {icon}
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block type-label">{label}</span>
        <span className="block font-sans text-[13.5px] text-text-primary group-hover:text-gold transition-colors truncate">
          {valor}
        </span>
      </span>
    </a>
  );
}

function Dato({ label, valor, href }) {
  return (
    <div>
      <p className="type-eyebrow mb-2">{label}</p>
      {href ? (
        <a
          href={href}
          className="type-body text-text-primary hover:text-gold link-underline transition-colors"
        >
          {valor}
        </a>
      ) : (
        <p className="type-body text-text-primary">{valor}</p>
      )}
    </div>
  );
}
