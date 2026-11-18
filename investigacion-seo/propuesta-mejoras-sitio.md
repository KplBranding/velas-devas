# Fase 2 · Propuesta de mejoras al sitio

17-11-2026. Nada de esto está aplicado. Cada punto tiene un código (A1, B2…) para que indiques cuáles se aplican.

**Estado al 17-11-2026:** aplicados A1, A2, A3, A4, A6 y B1 a B7, además del año de fundación (2000 → 1992). Pendientes: A5 (faltan respuestas del cliente), redirecciones 301 y bloque C.

En A1, tres líneas se acortaron respecto de esta propuesta para que quepan en un renglón en móvil. Quedaron así: "Fábrica de velas por mayor · Chile", "Velas para matrimonios y eventos" y "Velas para funerarias". "Cirios y velas para iglesias" quedó igual.

Los largos de title y description están contados; el máximo es 60 y 155.

## A. Textos, sin tocar el diseño

### A1. H1 con palabra clave

Hoy el H1 es el nombre grande de la categoría o el lema. La propuesta es que el H1 pase a la **línea pequeña en mayúsculas** que ya existe sobre el título, y que el título grande siga viéndose igual pero como párrafo. Lo único que cambia a la vista es el texto de esa línea pequeña.

| Página | Hoy (línea pequeña · título grande, que es el H1) | Propuesta (línea pequeña, que pasa a ser el H1 · título grande) |
|---|---|---|
| Home | "Fabricación nacional · Todo Chile" · **"Más de 30 años respaldando a quienes no pueden improvisar."** | **"Fábrica de velas por mayor · Todo Chile"** · lema igual |
| Banquetería | "Matrimonios y eventos" · **"Banquetería 01"** | **"Velas para matrimonios y eventos por mayor"** · "Banquetería 01" igual |
| Religiosas | "Parroquias e iglesias" · **"Religiosas 02"** | **"Cirios y velas para iglesias"** · "Religiosas 02" igual |
| Funerarias | "Servicios funerarios" · **"Funerarias 03"** | **"Velas para funerarias y velatorios"** · "Funerarias 03" igual |

- La línea pequeña crece de unos 21 caracteres a entre 28 y 42. Hay que revisarla en móvil: puede ocupar dos líneas.
- En el Home el bloque existe dos veces en el HTML (escritorio y móvil). Seguirán siendo dos H1 con el mismo texto; unificarlos obligaría a rehacer la estructura del Home y no lo recomiendo.
- Nosotros, Contacto y Privacidad no cambian.

### A2. Títulos de página

| Página | Hoy | Propuesta |
|---|---|---|
| Home | Velas Devas — Fabricación mayorista de velas · Chile (52) | Fábrica de velas por mayor en Chile \| Velas Devas (49) |
| Banquetería | Banquetería — Velas para matrimonios y eventos · Velas Devas (60) | Velas para matrimonios y eventos por mayor \| Velas Devas (56) |
| Religiosas | Religiosas — Cirios y velones para iglesias · Velas Devas (57) | Cirios y velas para iglesias: cirio pascual \| Velas Devas (57) |
| Funerarias | Funerarias — Velas que acompañan cada ceremonia · Velas Devas (61) | Velas para funerarias y velatorios por mayor \| Velas Devas (58) |
| Nosotros | Nosotros — Más de 30 años fabricando confianza · Velas Devas (60) | Fabricantes de velas desde 1992 \| Velas Devas (45) |
| Contacto | Contacto — Cotizaciones mayoristas · Velas Devas (48) | Cotiza velas por mayor: contacto \| Velas Devas (46) |

El cambio de fondo: la palabra que la gente busca va al inicio y la marca al final.

### A3. Descripciones

| Página | Hoy | Propuesta |
|---|---|---|
| Home | 154 caracteres; no nombra "por mayor" | Fabricantes mayoristas de velas desde 1992. Velas, velones y cirios en blanco y marfil para banquetería, iglesias y funerarias. Despacho a todo Chile. (150) |
| Banquetería | 169, con "blanco e marfil" | Velas, velones y velas flotantes para banquetería, matrimonios y eventos. Más de 30 medidas en blanco y marfil, stock permanente y despacho a todo Chile. (153) |
| Religiosas | 316: Google la corta | Cirios, velones y cirio pascual de fabricación propia para parroquias y capillas. Lisos, decorados e impresos, en blanco nieve o marfil. Cotiza por mayor. (154) |
| Funerarias | 147 | Se mantiene |
| Nosotros | 161 | Más de 30 años fabricando velas para banqueterías, funerarias, parroquias y distribuidores de todo Chile. Calidad, consistencia y fabricación nacional. (151) |
| Contacto | 125 | Solicita una cotización mayorista de velas para banquetería, iglesias o funerarias. Fabricación propia en Santiago y despacho a todo Chile. (139) |

Hoy la descripción de cada categoría es el mismo texto que se muestra en la página. Para acortarla sin cambiar lo que se ve, se agrega un campo aparte solo para buscadores; el texto visible queda igual.

### A4. Correcciones de redacción

| Hoy | Propuesta |
|---|---|
| "blanco e marfil" en la descripción general, la de Banquetería y la respuesta "¿En qué colores fabrican?" | "blanco y marfil" |

Esta sí cambia un texto visible: la respuesta de la pregunta frecuente.

### A5. Preguntas frecuentes

Hoy las tres categorías muestran las mismas 5 preguntas. La propuesta es mantenerlas y sumar, por categoría, las que Google sugiere.

| Categoría | Preguntas nuevas |
|---|---|
| Banquetería | ¿Cuánto dura un velón encendido? · ¿Cuánto duran las velas flotantes? |
| Religiosas | ¿Cuánto cuesta un cirio pascual? · ¿Dónde comprar velas de Adviento? · ¿Cuál es la diferencia entre una vela y un cirio? |
| Funerarias | ¿Cuánto dura un velón encendido? · ¿Por qué las velas echan humo negro y cómo evitarlo? |

**Bloqueado:** todas las respuestas necesitan datos del cliente. No se publica ninguna hasta tenerlos.

### A6. Texto alternativo de imágenes

| Hoy | Propuesta |
|---|---|
| Hero de categoría: "Velas de Banquetería", "Velas de Religiosas", "Velas de Funerarias" | "Velas y velones blancos para matrimonios y eventos", "Cirios y velones para iglesias", "Velones para funerarias y velatorios" |
| Carrusel de Religiosas: las 5 fotos de cada línea con texto alternativo vacío | "Velones y cirios decorados Velas Devas, foto 1", y así por línea |

No cambia nada a la vista.

## B. Técnico invisible

| Código | Hoy | Propuesta |
|---|---|---|
| B1 | Canonical, `og:url`, sitemap, robots y datos estructurados apuntan a `velasdevas.cl`, que redirige a `www` | Todo apunta a `https://www.velasdevas.cl` |
| B2 | Datos estructurados: solo `LocalBusiness`, sin teléfono fijo ni logo | Un solo bloque con `Organization` (logo, teléfono, correo, año 1992, Instagram), `LocalBusiness` (dirección de Av. Santa Rosa) y `WebSite` |
| B3 | Las preguntas frecuentes no tienen datos estructurados | `FAQPage` en cada categoría, con el mismo texto que se ve |
| B4 | Sin migas de pan estructuradas | `BreadcrumbList` en categorías, Nosotros y Contacto |
| B5 | `/favicon.ico` responde 404 | Agregar el archivo `.ico` |
| B6 | Privacidad sin imagen para compartir y con prioridad 0,8 en el sitemap | Hereda la imagen general; prioridad 0,3 |
| B7 | Etiqueta `keywords` con 6 términos | Eliminarla: Google no la usa |

Sobre B3: desde 2023 Google casi no muestra el desplegable de preguntas en los resultados. Ayuda a que entienda la página, pero no hay que esperar que aparezca.

**Redirecciones 301: bloqueadas.** Faltan las URLs del sitio antiguo de Wix. En Vercel se configuran en `next.config.js` cuando exista la lista.

## C. Estructura: páginas nuevas

Cada una necesita textos nuevos, fotos y datos confirmados por el cliente.

| Código | Página | Urgencia | Qué falta |
|---|---|---|---|
| C1 | `/religiosas/velas-de-adviento` | El Adviento de 2026 empieza el 29 de noviembre. Una página nueva no alcanza a posicionarse en 12 días; sirve para 2027 si se publica en octubre | Medidas, si hay rosada además de morada, venta por set, precios, fotos |
| C2 | `/religiosas/cirio-pascual` | Publicar antes de febrero de 2027 | Medidas, precios o rango, plazo de pedido para Semana Santa, fotos |
| C3 | `/banqueteria/velas-flotantes` | Sin fecha | Medidas, duración, unidades por caja |
| C4 | `/religiosas/velas-de-bautizo` | Sin fecha | Confirmar si se atienden pedidos chicos |

**Alternativa rápida para Adviento (C1b):** agregar las velas de Adviento como una línea más dentro de `/religiosas`, igual que "decorados" o "impresos". Es lo único que puede estar publicado esta temporada. Necesita al menos una foto, las medidas y el color.

Las páginas nuevas requieren un diseño nuevo. Siguiendo el manifiesto de Devas, propondría el enfoque antes de construirlas.

## D. Lo que no conviene hacer

| Qué | Por qué |
|---|---|
| Perseguir "velas aromáticas", "insumos para velas" o "velas esotéricas" | Tienen más búsquedas, pero no son clientes de Devas |
| Crear páginas por ciudad o por barrio (Meiggs, Patronato) | Devas no tiene sede ahí; sería contenido engañoso |
| Abrir un blog ahora | La demanda informativa del nicho es baja; rinde más una página por producto |
| Reactivar los testimonios actuales | En el código están desactivados y marcados como texto de ejemplo. No deben publicarse ni marcarse con datos estructurados hasta tener testimonios reales |
| Repetir palabras clave en los textos | No ayuda y empeora la lectura |
| Agregar "precio" en títulos sin mostrar precios | Genera visitas que se van de inmediato |

## Orden sugerido

1. **B1** primero: es el de mayor efecto.
2. **A1 a A4, A6, B2, B4 a B7**: se pueden aplicar y publicar juntos.
3. **A5 y B3** cuando lleguen las respuestas del cliente.
4. **C1b** si el cliente envía foto y medidas esta semana.
5. **C2** en enero.
