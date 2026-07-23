'use client';

import { useEffect, useRef, useState } from 'react';

// Cursor personalizado: un punto que sigue el mouse al instante + un anillo
// que lo persigue con lerp (deslizamiento elegante). Crece sobre elementos
// interactivos. Sólo en desktop (puntero fino); en touch no se renderiza.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add('cursor-none');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let raf = 0;
    let started = false;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      started = true;
      // Ocultar el cursor custom sobre zonas de puntero tradicional (catálogo)
      const nativo =
        e.target && e.target.closest && e.target.closest('.cursor-native');
      const op = nativo ? '0' : '1';
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = op;
      }
      if (ringRef.current) ringRef.current.style.opacity = op;
    };

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const isInteractive = (t) =>
      t && t.closest && t.closest('a, button, [role="button"], input, select, textarea, label, summary');

    const onOver = (e) => {
      if (isInteractive(e.target)) {
        ringRef.current?.classList.add('is-hover');
        dotRef.current?.classList.add('is-hover');
      }
    };
    const onOut = (e) => {
      if (isInteractive(e.target)) {
        ringRef.current?.classList.remove('is-hover');
        dotRef.current?.classList.remove('is-hover');
      }
    };
    const onDown = () => ringRef.current?.classList.add('is-down');
    const onUp = () => ringRef.current?.classList.remove('is-down');
    const onLeave = () => {
      dotRef.current && (dotRef.current.style.opacity = '0');
      ringRef.current && (ringRef.current.style.opacity = '0');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseout', onOut, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('cursor-none');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden style={{ opacity: 0 }} />
      <div ref={dotRef} className="cursor-dot" aria-hidden style={{ opacity: 0 }} />
    </>
  );
}
