// Formato peso chileno: 1420 -> $1.420
export function clp(n) {
  return '$' + Number(n || 0).toLocaleString('es-CL');
}

// Texto de la medida de una variante de producto, tal como se nombra en el
// sitio. `alto` puede ser un número ("15" → "Ø 4,9 × 15 cm"), una medida
// completa ("8 × 8" → "8 × 8 cm") o un nombre ("Clásica"). Sin variante
// (vela flotante) se usa solo el diámetro.
export function medidaDe(producto, variante) {
  const diam = producto.diametro_cm
    ? String(producto.diametro_cm).replace('.', ',')
    : null;
  const alto = variante?.alto;
  if (alto == null) return diam ? `Ø ${diam} cm aprox.` : '';
  if (/^[0-9]+(,[0-9]+)?$/.test(alto)) return diam ? `Ø ${diam} × ${alto} cm` : `${alto} cm`;
  if (/^[0-9]/.test(alto)) return `${alto} cm`;
  return alto;
}
