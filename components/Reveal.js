'use client';

import { useEffect, useRef, useState } from 'react';

// Microinteracción base del manifiesto: aparición suave (fade + subida sutil)
// cuando el elemento entra en viewport. Reutilizable en todas las secciones.
// Respeta prefers-reduced-motion.
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  y = 18,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVis(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : `translateY(${y}px)`,
        transition: `opacity 0.8s var(--ease-out) ${delay}s, transform 0.8s var(--ease-out) ${delay}s`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
