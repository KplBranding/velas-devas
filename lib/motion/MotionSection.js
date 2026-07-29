'use client';

// ─────────────────────────────────────────────────────────────────────────────
// Motion System · MotionSection
// Wrapper con el que una sección se "registra" en el sistema. De forma
// declarativa aplica, todo atado al progreso del scroll:
//   • revelado escalonado  → hijos con [data-reveal] (imagen→título→texto→CTA)
//   • parallax por capa     → hijos con [data-parallax="background|decor|content|detail"]
//   • crossfade de salida   → la sección pierde protagonismo al salir (opacity+scale)
//   • semi-sticky           → prop `sticky` (permanece mientras la siguiente entra)
//   • solapamiento          → prop `overlap` (empieza antes de que termine la anterior)
//
// Cómo agregar una sección nueva al Motion System:
//   <MotionSection className="..." sticky overlap>
//     <img data-parallax="background" ... />
//     <h2 data-reveal>…</h2>
//     <p  data-reveal>…</p>
//     <a  data-reveal>…</a>
//   </MotionSection>
// ─────────────────────────────────────────────────────────────────────────────
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { parallaxLayer, revealGroup, crossfadeOut } from './presets';
import { PARALLAX, prefersReduced } from './config';
import { scheduleRefresh } from '../scrollRefresh';

export default function MotionSection({
  as: Tag = 'section',
  className = '',
  sticky = false, // semi-sticky: permanece mientras la siguiente sección sube
  crossfade = true, // pierde protagonismo al salir (se ignora si sticky)
  overlap = false, // empieza a entrar antes de que la anterior termine
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = gsap.utils.toArray(el.querySelectorAll('[data-reveal]'));

    if (prefersReduced()) {
      if (items.length) gsap.set(items, { clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      // 1 · Revelado escalonado del grupo
      if (items.length) revealGroup(el, items);

      // 2 · Parallax por capa (lee la profundidad del atributo)
      el.querySelectorAll('[data-parallax]').forEach((node) => {
        const key = node.getAttribute('data-parallax') || 'content';
        const speed = PARALLAX[key] ?? Number(key) ?? PARALLAX.content;
        parallaxLayer(node, speed);
      });

      // 3 · Crossfade de salida (no en secciones sticky: esas se tapan, no se funden)
      if (crossfade && !sticky) crossfadeOut(el);
    }, ref);

    scheduleRefresh();
    return () => ctx.revert();
  }, [sticky, crossfade]);

  const cls = [
    className,
    sticky ? 'md:sticky md:top-0' : '',
    overlap ? '-mt-[10vh] md:-mt-[14vh]' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={cls} style={style} {...rest}>
      {children}
    </Tag>
  );
}
