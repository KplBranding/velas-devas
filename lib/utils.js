// Formato peso chileno: 1420 -> $1.420
export function clp(n) {
  return '$' + Number(n || 0).toLocaleString('es-CL');
}
