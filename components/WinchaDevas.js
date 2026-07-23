// Wincha divisoria: "Velas Devas" repetido en Playfair Display Black, sin fondo
// (texto en alfa/transparencia), desplazándose de izquierda a derecha en loop.
// La opacidad ALTERNA entre repeticiones para marcar el ritmo del nombre.
// Puramente CSS (keyframe wincha-ltr), respeta reduce-motion.
const ALFA = [0.14, 0.06]; // alterna: una un poco más tenue que la otra

function Bloque() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="font-display font-black not-italic uppercase text-[clamp(34px,6vw,82px)] leading-none tracking-[-0.01em] px-1 md:px-1.5 whitespace-nowrap"
          style={{ color: `rgba(30, 37, 30, ${ALFA[i % 2]})` }}
        >
          Velas Devas
        </span>
      ))}
    </>
  );
}

export default function WinchaDevas() {
  return (
    <div aria-hidden className="relative overflow-hidden pt-8 pb-3 md:pt-12 md:pb-5">
      <div className="wincha-track flex w-max flex-nowrap items-center whitespace-nowrap">
        <Bloque />
        <Bloque />
      </div>
    </div>
  );
}
