# Motion System — Velas Devas

Sistema de movimiento centralizado. Objetivo: que todo el sitio se sienta como
**una sola historia continua** (revista editorial premium), con el **scroll como
director**. Todo el movimiento está atado al **progreso del scroll** (nunca por
tiempo), usa solo `transform`/`opacity` (GPU) y respeta `prefers-reduced-motion`.

## Piezas

| Archivo | Rol |
|---|---|
| `config.js` | **Único lugar** con tokens: easings, velocidades de parallax, crossfade, reveal, scrub, Lenis, breakpoints. Ajustar la sensación global = tocar aquí. |
| `engine.js` | Motor: crea **Lenis** (scroll suavizado) y lo conduce con el ticker de GSAP; sincroniza `ScrollTrigger`. Un solo `requestAnimationFrame` para todo el sitio. |
| `SmoothScroll.js` | Provider global. Se monta una vez en `app/layout.js`. Inicializa el motor y refresca ScrollTrigger en cada cambio de ruta. |
| `presets.js` | Constructores de animación reutilizables: `parallaxLayer`, `revealGroup`, `crossfadeOut`. Aquí vive el **comportamiento** compartido. |
| `useParallax.js` | Hook: aplica parallax a un elemento. Devuelve un `ref`. |
| `useReveal.js` | Hook: revelado escalonado de los `[data-reveal]` dentro de un contenedor. |
| `MotionSection.js` | Wrapper declarativo con el que una sección se **registra** en el sistema. |
| `index.js` | Barrel de importación. |

## Cómo funciona la continuidad

1. **Lenis** suaviza el scroll (inercia editorial). Es la base de la sensación de
   flujo: todo interpola contra la misma posición suavizada.
2. Cada sección expone su ciclo de vida vía ScrollTrigger `scrub` (entrada →
   activo → salida), interpolando estado según el scroll.
3. **Semi-sticky + crossfade + solapamiento**: la sección saliente pierde
   protagonismo (opacity/scale) mientras la siguiente entra con overlap → sin
   cortes.
4. **Parallax multicapa** (fondo 0.75× · decor 0.85× · contenido 1× · detalle
   1.08×) → profundidad. Muy sutil.

## Cómo agregar una sección nueva al sistema

**Opción A — declarativa (recomendada):** envuelve la sección en `MotionSection`
y marca los hijos con atributos:

```jsx
import { MotionSection } from '@/lib/motion';

<MotionSection className="…" sticky overlap>
  <div data-parallax="background"> {/* imagen de fondo */} </div>
  <h2 data-reveal>Título</h2>
  <p  data-reveal>Texto</p>
  <a  data-reveal>CTA</a>
</MotionSection>
```

- `data-reveal` → entra escalonado en orden del DOM (imagen → título → texto → CTA).
- `data-parallax="background|decor|content|detail"` → capa de profundidad.
- `sticky` → semi-sticky (permanece mientras la siguiente sube).
- `overlap` → empieza a entrar antes de que la anterior termine.
- `crossfade` (default `true`) → pierde protagonismo al salir.

**Opción B — hooks sueltos** (para componentes existentes):

```jsx
import { useParallax } from '@/lib/motion';
const bgRef = useParallax(0.75);   // velocidad de capa
return <div ref={bgRef}>…</div>;
```

o consumir los presets directamente (`parallaxLayer`, `revealGroup`,
`crossfadeOut`) dentro de un `gsap.context`, como ya hacen `DolorScrolly`,
`PausaFotografica` y `CatalogoCategoria` en el flujo de Funerarias (piloto).

## Ajustar la sensación

Todo se calibra en `config.js`:
- Más pausado → sube `SCRUB.base` y baja `LENIS.lerp`.
- Parallax más/menos marcado → `PARALLAX_RANGE`.
- Crossfade más/menos → `CROSSFADE`.
- Ritmo del reveal → `REVEAL.stagger`.

## Responsive / performance

- En móvil se reducen scrub y rango de parallax (`config.scrub()`,
  `config.parallaxRange()`); Lenis deja el táctil nativo.
- Solo `transform`/`opacity` + `will-change` en las capas animadas.
- `prefers-reduced-motion`: Lenis se desactiva (scroll nativo) y los reveals se
  muestran sin animar.

## Estado del rollout

- **Núcleo + Lenis**: activo en todo el sitio.
- **Piloto**: Funerarias (parallax en franja/CTA/pausa, crossfade en la intro,
  reveals ligados al scroll).
- **Pendiente**: extender `MotionSection` al resto de páginas (banquetería,
  religiosas, nosotros, home, contacto) y consolidar `ScrollReveal`/`AnimatedText`
  en los hooks del sistema.
