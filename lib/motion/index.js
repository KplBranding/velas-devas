// Motion System · punto de entrada único.
// Importa desde aquí: import { MotionSection, useParallax, useReveal } from '@/lib/motion'
export { default as SmoothScroll } from './SmoothScroll';
export { default as MotionSection } from './MotionSection';
export { default as useParallax } from './useParallax';
export { default as useReveal } from './useReveal';
export { parallaxLayer, revealGroup, crossfadeOut } from './presets';
export { getLenis } from './engine';
export * as motionConfig from './config';
