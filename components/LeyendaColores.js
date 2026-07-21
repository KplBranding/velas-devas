// Leyenda única de colores disponibles (se muestra una sola vez, sobre la grilla).
// Muestra los recuadros de referencia con los colores reales: blanco nieve y marfil.
export default function LeyendaColores({ className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      <span className="type-label">Colores disponibles</span>
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="w-4 h-4 rounded-full border border-border-default"
          style={{ background: '#F0EEE8' }}
        />
        <span className="text-[13px] text-text-body leading-none">Blanco nieve</span>
      </span>
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="w-4 h-4 rounded-full border border-border-default"
          style={{ background: 'linear-gradient(180deg,#F3D3A8,#EFB466)' }}
        />
        <span className="text-[13px] text-text-body leading-none">Marfil</span>
      </span>
    </div>
  );
}
