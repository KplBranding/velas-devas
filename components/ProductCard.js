import VelaSVG from './VelaSVG';

export default function ProductCard({ producto, index = 0 }) {
  const bgImagen = index % 2 === 0 ? 'bg-bg-card-1' : 'bg-bg-card-2';
  const colorLabel = producto.color === 'marfil' ? 'Marfil' : 'Blanca';

  return (
    <article className="group border-r border-b border-border-default">
      {/* Imagen */}
      <div
        className={`relative ${bgImagen} flex items-center justify-center aspect-[4/5] overflow-hidden`}
      >
        {producto.destacado && (
          <span className="badge-gold absolute top-3 left-3 z-10">Más pedido</span>
        )}
        <VelaSVG
          alto={producto.alto_cm}
          diametro={producto.diametro_cm}
          color={producto.color}
          className="h-[78%] w-auto transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Cuerpo */}
      <div className="px-4 py-4 bg-bg-base">
        <h3 className="type-card-title">{producto.nombre}</h3>
        <p className="type-label mt-1">
          {colorLabel} · {producto.alto_cm} × {producto.diametro_cm} cm
        </p>
      </div>
    </article>
  );
}
