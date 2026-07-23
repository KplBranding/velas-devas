// Ilustración SVG de una vela. La altura del cuerpo se escala según proporción
// alto/diámetro para diferenciar visualmente cada formato.
export default function VelaSVG({
  alto = 25,
  diametro = 2.5,
  color = 'blanca',
  className = '',
  animada = false, // llama en parpadeo constante (para velas destacadas/hero)
}) {
  // Blindaje: si llega un valor no numérico (NaN/undefined) usamos defaults,
  // así el SVG nunca recibe NaN en sus atributos (y1, cy, etc.).
  const altoN = Number.isFinite(alto) ? alto : 25;
  const diamN = Number.isFinite(diametro) ? diametro : 2.5;

  // Escala normalizada dentro del área de dibujo (viewBox 100 x 160)
  const maxAlto = 80;
  const bodyH = Math.max(40, Math.min(120, (altoN / maxAlto) * 110));
  const bodyW = Math.max(14, Math.min(46, diamN * 7));
  const cx = 50;
  const bottom = 150;
  const top = bottom - bodyH;
  const x = cx - bodyW / 2;

  const cera = color === 'marfil' ? '#F1EBDD' : '#FBFAF7';
  const ceraBorde = color === 'marfil' ? '#D9CFB8' : '#E4DFD6';

  return (
    <svg
      viewBox="0 0 100 160"
      className={className}
      role="img"
      aria-label={`Vela ${color} de ${altoN} cm de alto`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cuerpo de la vela */}
      <rect
        x={x}
        y={top}
        width={bodyW}
        height={bodyH}
        rx={bodyW * 0.12}
        fill={cera}
        stroke={ceraBorde}
        strokeWidth="1"
      />
      {/* Reflejo lateral */}
      <rect
        x={x + 2}
        y={top + 3}
        width={Math.max(2, bodyW * 0.14)}
        height={bodyH - 8}
        rx="1.5"
        fill="#FFFFFF"
        opacity="0.55"
      />
      {/* Mecha */}
      <line
        x1={cx}
        y1={top}
        x2={cx}
        y2={top - 6}
        stroke="#2E2A24"
        strokeWidth="1.4"
      />
      {/* Halo cálido detrás de la llama */}
      <circle
        className={`flame-glow-el ${animada ? 'flame-glow' : ''}`}
        cx={cx}
        cy={top - 16}
        r="13"
        fill="#F0E6CE"
        opacity="0.45"
        style={{ transformOrigin: `${cx}px ${top - 16}px`, filter: 'blur(3px)' }}
      />
      {/* Llama viva */}
      <g
        className={`flame-el ${animada ? 'flame' : ''}`}
        style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
      >
        <path
          d={`M ${cx} ${top - 6}
              C ${cx - 5} ${top - 12}, ${cx - 4} ${top - 20}, ${cx} ${top - 26}
              C ${cx + 4} ${top - 20}, ${cx + 5} ${top - 12}, ${cx} ${top - 6} Z`}
          fill="#A67C2E"
        />
        <path
          d={`M ${cx} ${top - 8}
              C ${cx - 2.5} ${top - 12}, ${cx - 2} ${top - 17}, ${cx} ${top - 21}
              C ${cx + 2} ${top - 17}, ${cx + 2.5} ${top - 12}, ${cx} ${top - 8} Z`}
          fill="#F0E6CE"
        />
      </g>
    </svg>
  );
}
