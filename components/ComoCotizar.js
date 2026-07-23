// Banda destacada con ícono de carrito + los 4 pasos para cotizar.
const PASOS = [
  'Revisa el catálogo',
  'Selecciona formato y cantidad',
  'Agrégalo al carro',
  'Envía tu cotización',
];

function IconoCarrito() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
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
        <IconoCarrito />
        <span className="font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-text-primary">
          Cómo cotizar
        </span>
      </div>

      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
        {PASOS.map((p, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className="flex items-center gap-2 font-sans text-[13px] md:text-[13.5px] text-text-body">
              <span className="w-[18px] h-[18px] shrink-0 rounded-full bg-graphite text-bg-base text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              {p}
            </span>
            {i < PASOS.length - 1 && (
              <span aria-hidden className="text-accent-mid/50">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
