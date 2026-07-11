import ContactForm from '../../../components/ContactForm';
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
        <div className="mb-12">
          <p className="type-eyebrow">Cotizaciones mayoristas</p>
          <h1 className="type-hero mt-4">
            Hablemos de
            <br />
            <span className="type-hero-italic">tu proyecto</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-14 md:gap-20">
          {/* Formulario */}
          <div>
            <ContactForm />
          </div>

          {/* Datos de contacto */}
          <aside className="md:border-l md:border-border-default md:pl-14">
            <div className="space-y-8">
              <div>
                <p className="type-eyebrow mb-2">Dirección</p>
                <p className="type-body text-text-primary">{EMPRESA.direccion}</p>
              </div>
              <div>
                <p className="type-eyebrow mb-2">Teléfono</p>
                <a
                  href={`tel:${EMPRESA.telefonoLink}`}
                  className="type-body text-text-primary hover:text-gold transition-colors"
                >
                  {EMPRESA.telefono}
                </a>
              </div>
              <div>
                <p className="type-eyebrow mb-2">Horario</p>
                <p className="type-body text-text-primary">
                  Lunes a viernes · 9:00 – 18:00
                </p>
              </div>
              <div className="pt-6 border-t border-border-default">
                <p className="type-body">
                  Atendemos únicamente pedidos mayoristas para banquetería,
                  iglesias y funerarias.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
