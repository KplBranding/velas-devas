# Próximos pasos · Velas Devas

18-11-2026. Lista para retomar el trabajo de SEO, medición y campañas. Punto de respaldo: etiqueta de git `respaldo-11`.

## Dónde quedamos

| Fase | Estado |
|---|---|
| 0 a 2. Diagnóstico, investigación y propuesta | Entregadas y aprobadas |
| 3. SEO en el sitio (dominio www, H1, títulos, datos estructurados) | Publicada |
| 4. Velocidad | Publicada. Móvil entre 88 y 93; la carga principal tarda 3,0 a 3,7 s, sobre la meta de 2,5 s |
| 5. Medición | Eventos de GA4 y aviso de cookies publicados. Faltan los pasos en las cuentas de Google |
| 6. Vista previa para el cliente | No iniciada |

## 1. Lo que depende de Javier (cuentas de Google)

Detalle paso a paso en `fase-5-medicion.md`. En este orden:

1. **Revisar el aviso de cookies en un teléfono real**, en ventana privada. No está probado en Safari.
2. **Comprobar `generate_lead`:** elegir "Aceptar todas", enviar el formulario de contacto y ver el evento en la vista en tiempo real de GA4.
3. **Marcar eventos clave en GA4:** `generate_lead` y `click_whatsapp`. Aparecen en la lista hasta 24 horas después del primer registro.
4. **Search Console:** agregar el dominio `velasdevas.cl` con un registro TXT en el DNS de Wix, sin tocar los registros MX ni TXT existentes; enviar el sitemap.
5. **Google Ads:** crear la cuenta en modo experto y sin campaña automática; enlazar GA4 y Search Console; importar `generate_lead` como conversión.
6. **Google Business Profile:** crear la ficha con los datos de `fase-5-medicion.md`.
7. **Consulta legal:** confirmar con un asesor qué exige la ley chilena de datos personales (Ley 21.719) para el aviso de cookies y para la política de privacidad, que hoy es un texto base.

## 2. Lo que falta pedirle a Devas

| Dato | Para qué |
|---|---|
| Horario de atención y si la bodega recibe público | Ficha de Google Business Profile |
| Duración de un velón y de las velas flotantes | Preguntas frecuentes nuevas |
| Medidas, precios o rango y plazo de pedido del cirio pascual | Página de cirio pascual |
| Si se vende por caja y si se atienden pedidos chicos de bautizo | Preguntas frecuentes y página de bautizo |
| Lista de páginas del sitio antiguo de Wix | Redirecciones 301 |
| Testimonios reales | Hoy están desactivados por ser texto de ejemplo |

## 3. Lo que puede hacer Claude al retomar

| Tarea | Requisito | Urgencia |
|---|---|---|
| Corregir en la política de privacidad la frase "al pie de cada página" (el Home no tiene pie) | Visto bueno de Javier | Baja, es rápido |
| Página `/religiosas/cirio-pascual` | Datos y fotos de Devas; aprobar el diseño | **Publicar antes de febrero de 2027** |
| Preguntas frecuentes nuevas por categoría | Respuestas de Devas | Media |
| Redirecciones 301 | URLs antiguas (Wix o Search Console) | Media |
| Campañas de búsqueda: estructura, anuncios y palabras clave | Cuenta de Google Ads creada y conversión importada | Cuando esté la cuenta |
| Páginas de velas flotantes y de bautizo | Datos de Devas | Sin fecha |
| Fase 6: vista previa para el cliente | — | Sin fecha |
| Bajar la carga en móvil de 3 s a 2,5 s | Implica tocar animaciones o Google Analytics; decidir si vale la pena | Baja |

En pausa por decisión de Javier: velas de Adviento.

## 4. Revisiones periódicas

- **A los 30 y 90 días de activar Search Console:** exportar Rendimiento (consultas y páginas) y revisar posiciones.
- **Cada mes:** el tablero del punto 7 de `fase-5-medicion.md`.
- **Cada trimestre:** volver a exportar Keyword Planner y ejecutar `datos-fuente/kp_merge.py`.

## Qué esperar en los datos

Desde el 18-11-2026 el aviso de cookies funciona en modo estricto: GA4 solo mide con detalle a quienes eligen "Aceptar todas". Las visitas y conversiones en GA4 van a verse más bajas que antes de esa fecha, sin que haya bajado el tráfico real. Los pedidos y contactos siguen llegando completos al panel `/admin` y al correo; ese es el número real de leads.
