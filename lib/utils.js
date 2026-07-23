import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge de clases Tailwind (patrón Aceternity UI).
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Formato peso chileno: 1420 -> $1.420
export function clp(n) {
  return '$' + Number(n || 0).toLocaleString('es-CL');
}
