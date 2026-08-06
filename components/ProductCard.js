import VelaSVG from './VelaSVG';
import ProductGaleria from './ProductGaleria';
import SelectorAltura from './SelectorAltura';
import AgregarSimple from './cotizacion/AgregarSimple';
import { clp } from '../lib/utils';

export default function ProductCard({ producto, index = 0 }) {
  const bgImagen = index % 2 === 0 ? 'bg-bg-card-1' : 'bg-bg-card-2';
  const agregable = ['banqueteria', 'religiosas', 'funerarias'].includes(
    producto.categoria
  );
  const colorLabel =
    producto.color_nombre || (producto.color === 'marfil' ? 'Marfil' : 'Blanca');
  const tieneFotos = producto.imagenes && producto.imagenes.length > 0;
  const esGrupo = Array.isArray(producto.alturas);
  // Alto representativo para el placeholder SVG cuando no hay fotos.
  // Las alturas son objetos {alto, sku, neto}; tomamos el `alto` de la última y
  // caemos a 15 si no es numérico (p. ej. Vela de Bautizo: "Clásica"/"Color").
  const ultimaAltura =
    producto.alturas && producto.alturas.length
      ? producto.alturas[producto.alturas.length - 1]
      : null;
  const altoNum = parseFloat(
    String(ultimaAltura?.alto ?? ultimaAltura ?? '').replace(',', '.')
  );
  const repAlto = producto.alto_cm || (Number.isFinite(altoNum) ? altoNum : 15);

  return (
    <article
      className="group cursor-default stagger"
      style={{ animationDelay: `${Math.min(index, 6) * 45}ms` }}
    >
      {tieneFotos ? (
        <div className="relative">
          {producto.destacado && (
            <span className="badge-gold absolute top-3 left-3 z-20">Más pedido</span>
          )}
          <ProductGaleria imagenes={producto.imagenes} alt={producto.nombre} />
        </div>
      ) : (
        <div
          className={`relative ${bgImagen} flex items-end justify-center aspect-[4/5] overflow-hidden rounded-[3px] transition-shadow duration-500 group-hover:shadow-lift`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(240,230,206,0.55),transparent_58%)]" />
          <span className="badge-dark absolute top-3 left-3 z-10 opacity-70">
            Foto próximamente
          </span>
          <VelaSVG
            alto={repAlto}
            diametro={producto.diametro_cm}
            color={producto.color}
            className="relative z-[2] h-[86%] w-auto pb-2 opacity-70 transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[42%] h-[4%] rounded-[50%] bg-black/15 blur-[3px]" />
        </div>
      )}

      {/* Cuerpo */}
      <div className="pt-4">
        <div className="flex items-baseline justify-between gap-2">
          {/* Título: se resalta solo el NÚMERO del diámetro (negrita + 1px). */}
          <h3 className="type-card-title text-[18px] leading-tight">
            {(() => {
              const m = producto.nombre.match(/^(.*?)(\d+(?:,\d+)?)(.*)$/);
              if (!m) return producto.nombre;
              return (
                <>
                  {m[1]}
                  <span className="font-bold text-[19px]">{m[2]}</span>
                  {m[3]}
                </>
              );
            })()}
          </h3>
          {!esGrupo && <span className="type-label">{colorLabel}</span>}
        </div>

        {esGrupo ? (
          producto.alturas.length ? (
            <SelectorAltura
              alturas={producto.alturas}
              consultar={producto.consultarPrecio}
              label={producto.chipLabel}
              producto={producto}
              agregable={agregable}
            />
          ) : producto.flotante ? (
            <div className="mt-1.5">
              <p className="type-label">Ø {producto.diametro_cm} cm aprox.</p>
              {producto.neto != null && (
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-[19px] text-text-primary leading-none">
                    {clp(producto.neto)}
                  </span>
                  <span className="type-label">valor unitario · + IVA</span>
                </div>
              )}
              {agregable && <AgregarSimple producto={producto} />}
            </div>
          ) : (
            <p className="type-label mt-1">Medidas próximamente</p>
          )
        ) : producto.sku ? (
          <p className="type-label mt-1">SKU {producto.sku}</p>
        ) : (
          <p className="type-label mt-1">
            Alto {producto.alto_cm} cm · Ø {producto.diametro_cm} cm
          </p>
        )}

      </div>
    </article>
  );
}
