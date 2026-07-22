import Image from 'next/image';
import ContactForm from '../../../components/ContactForm';
import AnimatedText from '../../../components/AnimatedText';
import { EMPRESA, IMAGENES } from '../../../lib/categorias';

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
            Cuéntanos qué formatos y cantidades necesitas y te preparamos una
            cotización a medida. Fabricación propia, stock permanente y despacho
            a todo Chile.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.25fr_1fr] gap-12 md:gap-16 items-start">
          {/* Formulario */}
          <div className="order-2 md:order-1">
            <ContactForm />
          </div>

          {/* Datos + imagen */}
          <aside className="order-1 md:order-2 space-y-8">
            <div
              data-reveal-up
              className="relative aspect-[16/10] overflow-hidden rounded-[4px] shadow-soft"
            >
              <Image
                src={IMAGENES.bodasRosas}
                alt="Velas artesanales Velas Devas"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 veil-gold opacity-60" />
            </div>

            <div
              data-reveal-up
              className="space-y-7 border-t border-border-default pt-8"
            >
              <Dato label="Dirección" valor={EMPRESA.direccion} />
              <Dato
                label="Teléfono"
                valor={EMPRESA.telefono}
                href={`tel:${EMPRESA.telefonoLink}`}
              />
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
