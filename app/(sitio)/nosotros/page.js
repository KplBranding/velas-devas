import Link from 'next/link';
import VelaSVG from '../../../components/VelaSVG';

export const metadata = {
  title: 'Nosotros — Más de 25 años fabricando velas',
  description:
    'Desde el año 2000, Velas Devas fabrica velas para los mercados más exigentes de Chile: banquetería, iglesias y funerarias.',
};

const CIFRAS = [
  { valor: '2000', label: 'Fabricando desde' },
  { valor: '100+', label: 'Formatos disponibles' },
  { valor: '3', label: 'Rubros especializados' },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-hero border-b border-border-default">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <p className="type-eyebrow">Quiénes somos</p>
            <h1 className="type-hero mt-4">
              Más de 25 años
              <br />
              <span className="type-hero-italic">fabricando velas</span>
            </h1>
          </div>
          <div className="hidden md:flex justify-end items-end gap-4 h-48">
            {[70, 45, 60].map((h, i) => (
              <VelaSVG
                key={i}
                alto={h}
                diametro={3}
                color={i % 2 ? 'marfil' : 'blanca'}
                className="h-full w-auto"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Texto */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-20">
        <div className="space-y-6">
          <p className="type-body text-[15px] leading-[1.9]">
            Desde el año 2000, Velas Devas fabrica velas para los mercados más
            exigentes de Chile. Trabajamos exclusivamente con clientes
            mayoristas: empresas de banquetería, iglesias y funerarias de todo
            el país.
          </p>
          <p className="type-body text-[15px] leading-[1.9]">
            Nuestro catálogo supera los 100 formatos, todos disponibles en
            blanco e marfil. Cada vela se fabrica con los mismos estándares de
            siempre: sin atajos.
          </p>
        </div>

        {/* Cifras */}
        <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-border-default">
          {CIFRAS.map((c) => (
            <div key={c.label}>
              <p className="font-display text-[clamp(28px,4vw,40px)] text-text-primary leading-none">
                {c.valor}
              </p>
              <p className="type-label mt-2">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-hero border-t border-border-default">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 text-center">
          <p className="type-eyebrow">Cotizaciones mayoristas</p>
          <h2 className="type-section mt-3 mb-6">Trabajemos juntos</h2>
          <Link href="/contacto" className="btn-primary">
            Solicitar cotización
          </Link>
        </div>
      </section>
    </>
  );
}
