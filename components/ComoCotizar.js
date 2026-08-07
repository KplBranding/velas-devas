// Banda destacada con ícono de bolsa (misma metáfora que el navbar) + los 4
// pasos para hacer el pedido.
const PASOS = [
  'Revisa el catálogo',
  'Selecciona formato y cantidad',
  'Agrégalo al pedido',
  'Envía tu pedido',
];

// Bolsa — mismo pictograma y trazo (1.5) que el navbar, para un solo lenguaje.
function IconoBolsa() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function ComoCotizar() {
  return (
    <div
      data-reveal-up
      className="mt-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-7 bg-bg-hero border border-border-default rounded-[8px] px-5 md:px-7 py-4 md:py-5"
    >
      <div className="flex items-center gap-3 shrink-0 text-gold">
        <IconoBolsa />
        <span className="font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-text-primary">
          Cómo pedir
        </span>
      </div>

      <ol className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5 sm:gap-x-5 sm:gap-y-2">
        {PASOS.map((p, i) => (
          <li key={i} className="flex items-center gap-2 font-sans text-[13px] md:text-[13.5px] text-text-body">
            <span className="w-[18px] h-[18px] shrink-0 rounded-full bg-graphite text-bg-base text-[10px] font-bold flex items-center justify-center">
              {i + 1}
            </span>
            {p}
          </li>
        ))}
      </ol>
    </div>
  );
}
