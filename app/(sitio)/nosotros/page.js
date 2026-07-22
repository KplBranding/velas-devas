import Link from 'next/link';
import Image from 'next/image';
import { IMAGENES } from '../../../lib/categorias';
import HistoriaScroll from '../../../components/HistoriaScroll';
import AnimatedText from '../../../components/AnimatedText';

export const metadata = {
  title: 'Nosotros — Más de 25 años fabricando velas',
  description:
    'Desde el año 2000, Velas Devas fabrica velas para los mercados más exigentes de Chile: banquetería, iglesias y funerarias.',
};

const CIFRAS = [
  { valor: '2000', label: 'Fabricando desde' },
  { valor: '100+', label: 'Formatos en catálogo' },
  { valor: '3', label: 'Rubros que abastecemos' },
];

// Relato editorial que acompaña a la vela mientras rota al hacer scroll.
const BEATS = [
  {
    kicker: 'El origen',
    titulo: 'Un oficio de familia',
    texto:
      'Desde el año 2000 fabricamos velas para los rubros más exigentes de Chile. Lo que empezó como un taller familiar hoy abastece a empresas de banquetería, parroquias y funerarias de todo el país.',
  },
  {
    kicker: 'El estándar',
    titulo: 'Sin atajos',
    texto:
      'Más de 100 formatos, todos en blanco e marfil. Cada vela se fabrica con la misma receta de siempre: cera de calidad, mecha pareja y una combustión limpia que se nota al encenderla.',
  },
  {
    kicker: 'El compromiso',
    titulo: 'Pensado para mayoristas',
    texto:
      'Trabajamos exclusivamente con clientes mayoristas. Stock permanente para lo habitual, fabricación a pedido para lo especial y despacho a todo Chile: para que nunca te quedes sin velas.',
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* ── Hero fotográfico ── */}
      <section className="relative h-[380px] md:h-[480px] flex items-end overflow-hidden grain">
        <Image
          src={IMAGENES.banqueteria}
          alt="Velas artesanales Velas Devas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ animation: 'slow-zoom 16s ease-out forwards' }}
        />
        <div className="absolute inset-0 veil-bottom" />
        <div className="absolute inset-0 veil-gold opacity-70" />
        <div className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-8 pb-12">
          <p className="type-eyebrow-light eyebrow-rule reveal">Quiénes somos</p>
          <AnimatedText
            as="h1"
            animation="maskReveal"
            className="font-display text-[#F5F5EE] text-[clamp(38px,6.5vw,68px)] font-normal mt-4 leading-[1.0]"
          >
            Más de 25 años
            <br />
            <span className="italic text-[#C8D0A8]">fabricando velas</span>
          </AnimatedText>
        </div>
      </section>

      {/* ── Scrollytelling: el video avanza al ritmo del scroll ── */}
      <HistoriaScroll
        video="/video/video_scrolling.mp4"
        poster={IMAGENES.velaOscura}
        beats={BEATS}
      />

      {/* ── Cifras ── */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="grid grid-cols-3 gap-6 pt-2">
          {CIFRAS.map((c) => (
            <div key={c.label} data-reveal-up>
              <p className="font-display text-[clamp(30px,5vw,48px)] text-text-primary leading-none">
                {c.valor}
              </p>
              <p className="type-label mt-2.5 uppercase tracking-[0.12em]">
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA con imagen ── */}
      <section className="relative overflow-hidden bg-black-graphic grain">
        <Image
          src={IMAGENES.religiosas}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 veil-full" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-20 text-center">
          <p className="type-eyebrow-light eyebrow-rule mx-auto" data-reveal-up>
            Cotizaciones mayoristas
          </p>
          <AnimatedText
            as="h2"
            animation="maskReveal"
            className="font-display text-[#F5F5EE] text-[clamp(28px,4vw,44px)] font-normal mt-5 mb-8"
          >
            Aseguremos tu abastecimiento
          </AnimatedText>
          <Link href="/contacto" className="btn-light" data-reveal-up>
            Solicitar cotización
          </Link>
        </div>
      </section>
    </>
  );
}
