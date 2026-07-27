import Link from 'next/link';
import Image from 'next/image';
import { IMAGENES } from '../../../lib/categorias';
import HistoriaScroll from '../../../components/HistoriaScroll';
import AnimatedText from '../../../components/AnimatedText';

export const metadata = {
  title: 'Nosotros — Más de 30 años fabricando confianza',
  description:
    'Más de 30 años fabricando velas para banqueterías, funerarias, parroquias, distribuidores y empresas de todo Chile. Calidad, consistencia y fabricación nacional.',
};

// Relato editorial que acompaña a la vela mientras rota al hacer scroll.
const BEATS = [
  {
    kicker: 'Nuestra historia',
    titulo: 'Un oficio construido con experiencia.',
    texto:
      'Durante más de tres décadas hemos acompañado a banqueterías, funerarias, parroquias, distribuidores y empresas de todo Chile, desarrollando productos que combinan calidad, consistencia y fabricación nacional.',
  },
  {
    kicker: 'Nuestra forma de trabajar',
    titulo: 'Cada detalle importa.',
    texto:
      'Seleccionamos cuidadosamente nuestras materias primas, controlamos cada etapa del proceso y cuidamos cada terminación para entregar productos de calidad constante y un servicio en el que nuestros clientes pueden confiar.',
  },
  {
    kicker: 'Nuestro compromiso',
    titulo: 'Más que un proveedor.',
    texto:
      'Sabemos que nuestros productos acompañan momentos importantes. Por eso trabajamos con responsabilidad, cumplimiento y un compromiso permanente con quienes confían en nosotros.',
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* ── Hero fotográfico ── */}
      <section className="relative h-[440px] md:h-[540px] flex items-end overflow-hidden grain">
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
            className="font-display text-[#F5F5EE] text-[clamp(36px,6.2vw,64px)] font-normal mt-4 leading-[1.02]"
          >
            Más de 30 años
            <br />
            <span className="italic text-[#C8D0A8]">fabricando confianza.</span>
          </AnimatedText>
          <p className="reveal reveal-delay-2 mt-5 max-w-xl font-sans text-[#EDEFE6] text-[15px] md:text-[17px] leading-[1.6]">
            No solo fabricamos velas. Fabricamos la tranquilidad de contar con un
            proveedor que responde con calidad, compromiso y experiencia en cada
            pedido.
          </p>
        </div>
      </section>

      {/* ── Scrollytelling: el video avanza al ritmo del scroll. El banner de
             cierre (children) sube al final y tapa el video sticky. ── */}
      <HistoriaScroll
        video="/video/video_scrolling.mp4"
        poster={IMAGENES.velaOscura}
        beats={BEATS}
      >
        {/* ── Cierre: banner que sube y tapa el video ── */}
        <section className="relative overflow-hidden bg-black-graphic grain flex items-center md:min-h-[100svh]">
          <Image
            src="/images/fotos_web/cta_footer_nosotros.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 veil-full" />
          <div className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-8 py-24 md:py-20 text-center">
            <p className="type-eyebrow-light eyebrow-rule mx-auto" data-reveal-up>
              Trabajemos juntos
            </p>
            <AnimatedText
              as="h2"
              animation="maskReveal"
              className="font-display text-[#F5F5EE] text-[clamp(28px,4vw,44px)] font-normal mt-5"
            >
              La confianza se construye con el tiempo.
            </AnimatedText>
            <p
              data-reveal-up
              className="font-sans text-[#EDEFE6] text-[15px] md:text-[16px] leading-[1.7] max-w-xl mx-auto mt-5 mb-8"
            >
              Más de 30 años de experiencia, productos de calidad y un equipo
              comprometido nos permiten seguir siendo el proveedor de confianza
              de cientos de clientes en todo Chile.
            </p>
            <Link href="/contacto" className="btn-light" data-reveal-up>
              Conversemos sobre tu próximo proyecto
            </Link>
          </div>
        </section>
      </HistoriaScroll>
    </>
  );
}
