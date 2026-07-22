import Reveal from './Reveal';

// Cita editorial aislada: puro espacio negativo + tipografía grande, sobre
// fondo oscuro. Se revela línea por línea (nunca letra por letra). Un beat
// distinto a cualquier otra sección — respiración pura, estilo revista.
export default function CitaEditorial({ lineas = [] }) {
  return (
    <section className="bg-black-graphic grain">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-28 md:py-44 text-center">
        <Reveal as="div" y={0} className="w-8 h-px bg-accent-light/50 mx-auto mb-10 md:mb-14" />
        <h2 className="font-display italic text-[#F5F5EE] text-[clamp(30px,6vw,66px)] leading-[1.14]">
          {lineas.map((l, i) => (
            <Reveal
              as="span"
              key={i}
              delay={i * 0.14}
              y={24}
              className="block"
            >
              {l}
            </Reveal>
          ))}
        </h2>
      </div>
    </section>
  );
}
