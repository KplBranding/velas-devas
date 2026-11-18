# Estrategia SEO · Velas Devas

Consulta de todos los datos: 17-11-2026. Dominio definitivo: `https://www.velasdevas.cl`.

## Datos del proyecto

| Dato | Valor |
|---|---|
| Cliente | Velas Devas |
| Dominio final | https://www.velasdevas.cl (con www, confirmado por el cliente) |
| País e idioma | Chile, español (`hl=es-419`, `gl=cl`) |
| Tipo de negocio | B2B: fabricante mayorista de velas, desde 1992 |
| Qué no es | Venta al detalle, velas aromáticas, de colores, de cera de abeja, de sabor, comestibles, de gel, líquidas; cursos o clases |
| Productos confirmados | Velas, velones y velas flotantes para banquetería; cirios y velones lisos, decorados e impresos para iglesias; velones para funerarias. Fuente: catálogo del sitio (`lib/categorias.js`, `data/productos.json`). Velas de Adviento moradas: confirmadas por el cliente el 17-11-2026; no están en el catálogo del sitio |
| Sitio anterior | Wix, ya sin dominio. Sus URLs están `PENDIENTE` |
| Sitio nuevo | Next.js 14 en Vercel; se publica con cada push a `main` |
| Herramientas | GA4 activo. Search Console, Keyword Planner y Semrush/Ahrefs: sin acceso todavía |

## Método y fuentes

| Fuente | Qué se hizo | Tipo de dato |
|---|---|---|
| Autocompletado de Google | 218 consultas con 109 semillas; 1.259 sugerencias únicas | Dato real, sin volumen |
| Google Trends | 12 términos contra el ancla "velas aromaticas", Chile, 12 meses | Dato real, interés relativo |
| DuckDuckGo región Chile | 15 búsquedas, 10 resultados cada una | Aproximación: no es Google |
| Sitios de competidores | Ficha de la home de 14 sitios | Dato real |
| Keyword Planner | 92 palabras, Chile, 12 meses | Dato real, en rangos |
| Search Console | No consultado | `PENDIENTE` |
| Semrush / Ahrefs | Sin acceso | `PENDIENTE` |

La relevancia (1 a 5), la intención y la conversión esperada de cada palabra son **criterio profesional**, no datos.

## Actualización con Keyword Planner (17-11-2026)

Fuente: `datos-fuente/keyword-planner-2026-11-17.csv`, Chile, 1 de noviembre de 2025 a 31 de octubre de 2026. Cruce hecho con `datos-fuente/kp_merge.py`; la versión anterior quedó en `keyword-research.respaldo-2026-11-17.csv`.

**Qué tipo de dato es.** La cuenta no tiene inversión activa, así que Keyword Planner entregó **rangos**, no cifras exactas: 10–100, 100–1 mil y 1 mil–10 mil búsquedas al mes. La exportación no trae el detalle mes a mes, por lo que la estacionalidad sigue apoyándose solo en Trends. La dificultad orgánica sigue `PENDIENTE`.

**Cobertura.** De 94 palabras: 76 con rango, 14 sin dato, 2 con cero y 2 sin fila propia ("velas al por mayor" y "velas por mayor chile", que Keyword Planner agrupa con una variante cercana).

| Rango mensual | Palabras del negocio |
|---|---|
| 1 mil – 10 mil | velas por mayor |
| 100 – 1 mil | fábrica de velas, velas blancas por mayor, velas flotantes, cirio pascual, velas de bautizo, vela primera comunión, velas de adviento, velas de confirmación |
| 10 – 100 | 53 palabras, entre ellas todas las de funerarias que tienen dato y casi todas las que llevan "chile" o "santiago" |

**Qué cambia respecto de la primera versión**

1. **"Velas por mayor" es mucho más grande de lo que sugería Trends.** Está en el mismo rango que "velas aromáticas" (1 mil–10 mil). Ambos datos son compatibles, porque el rango es ancho, pero el hallazgo 1 de más abajo ("el mercado es chico") vale para los términos específicos, no para el término principal.
2. **El término principal es caro y disputado en anuncios**: competencia alta (100 de 100). "Fábrica de velas" tiene la puja más alta de la lista, entre CLP 140 y 1.072 por clic.
3. **Cirio pascual sube a prioridad ALTA**: 100–1 mil búsquedas y competencia publicitaria media (47), la más baja entre las palabras con ese volumen.
4. **Adviento se confirma**: "velas de adviento" tiene 100–1 mil búsquedas.
5. **Funerarias se confirma como nicho pequeño**: ninguna palabra supera el rango 10–100 y varias no tienen dato. La competencia publicitaria es baja (4 a 20), así que anunciar ahí sería barato.
6. **Catorce palabras largas no tienen dato** (por ejemplo "velones blancos por mayor" o "velas para centros de mesa por mayor"). Las que eran ALTA bajaron a MEDIA: 9 en total. Siguen sirviendo como variantes dentro de los textos.
7. **El ruido es grande**: aromáticas, cumpleaños, LED y decorativas están en 1 mil–10 mil. Confirma la utilidad de la lista de negativas.

Los datos estructurales del Top 20 no cambian: las siete primeras posiciones ya eran las de mayor volumen. "Cirio pascual" y "velas de adviento" pasan a ser las dos páginas nuevas con mejor respaldo.

## Hallazgos

1. **El mercado es chico y de nicho.** En Trends, "velas aromaticas" promedia 34,8 y "velas por mayor" 5,5: unas seis veces menos. El resto de los términos del negocio tiene más de la mitad de las semanas en cero, así que su tendencia es **no concluyente**. *(Dato: Trends.)*
2. **Eso favorece a Devas.** Con poca demanda y competidores técnicamente débiles, un sitio bien etiquetado puede ganar las búsquedas del nicho. *(Hipótesis.)*
3. **El autocompletado de `gl=cl` mezcla países.** Gran parte de las sugerencias mayoristas son de México, Colombia y Argentina. Las que nombran Chile, Santiago, Meiggs o Patronato confirman demanda local. *(Dato.)*
4. **"Fábrica de velas" y "velas por mayor" arrastran intención de insumos.** Quien busca parafina, moldes o frascos quiere fabricar, no comprar. *(Dato.)*
5. **Cirio pascual es la mayor oportunidad sin cubrir.** Es el término con más variantes (49) y con intención de precio y compra; Devas no aparece en la muestra. Es estacional: en Trends su mes más alto fue marzo de 2026. *(Dato; el volumen está PENDIENTE.)*
6. **Funerarias no tiene competencia B2B, pero tampoco demanda comprobada.** Ninguna de sus búsquedas B2B generó sugerencias. *(Dato.)*
7. **Ya existe búsqueda de marca.** Google sugiere "velas devas". *(Dato.)*
8. **Adviento tiene demanda y el sitio no lo menciona.** Google entrega 90 sugerencias, varias de compra ("precio", "donde comprar", "por mayor", "chile"). Devas fabrica velas de Adviento moradas, pero no figuran en el catálogo. El Adviento de 2026 empieza el 29 de noviembre. *(Dato de autocompletado; el volumen está PENDIENTE.)*
9. **El sitio dice dos fechas de fundación.** "Desde el año 2000" y "más de 30 años". El cliente confirmó 1992.

## Recomendaciones

1. Corregir el dominio canónico a `www` en todo el sitio. Es el arreglo de mayor efecto y menor esfuerzo.
2. Llevar las palabras clave a H1, títulos y descripciones según `mapa-keywords-sitio.md`, sin cambiar el diseño.
3. Completar los datos estructurados (Organization, WebSite, FAQPage) y agregar las preguntas con búsqueda real.
4. Crear la página de cirio pascual antes de febrero de 2027.
5. No perseguir aromáticas, insumos, esotéricas ni decoración de hogar, aunque tengan más búsquedas. Ver `palabras-negativas.md`.
6. Abrir Search Console y un perfil de Google Business Profile para la bodega de Av. Santa Rosa. Para un negocio con sede en Santiago, es donde más rápido se gana visibilidad local. *(Criterio profesional.)*

## Top 20

Orden por criterio profesional (relevancia, intención y señal en el autocompletado). **No es un ranking por volumen**: el volumen está `PENDIENTE`.

| # | Palabra clave | Página | Señal |
|---|---|---|---|
| 1 | velas por mayor | / | Sugerida; 16 derivadas |
| 2 | fábrica de velas | / | 20 derivadas |
| 3 | velas al por mayor chile | / | Sugerida |
| 4 | velas por mayor santiago | / | Sugerida |
| 5 | fábrica de velas en santiago | / | Sugerida |
| 6 | velas blancas por mayor | / | Sugerida |
| 7 | velones por mayor | / | Sugerida |
| 8 | cirio pascual precio | /religiosas | Sugerida; 14 derivadas |
| 9 | cirio pascual precio chile | /religiosas | Sugerida |
| 10 | venta de cirio pascual en santiago | /religiosas | Sugerida |
| 11 | velas litúrgicas | /religiosas | 7 derivadas |
| 12 | cirios por mayor | /religiosas | Sugerida |
| 13 | venta de velas para iglesias | /religiosas | Sugerida |
| 14 | velas para eventos por mayor | /banqueteria | Sugerida |
| 15 | velas para matrimonio | /banqueteria | 4 derivadas |
| 16 | velas flotantes por mayor | /banqueteria | Sin señal propia; "velas flotantes" tiene 20 derivadas |
| 17 | velas para centros de mesa por mayor | /banqueteria | Sugerida |
| 18 | velas para velorio | /funerarias | Sugerida |
| 19 | velones para velorios | /funerarias | Sugerida |
| 20 | velas para funerarias | /funerarias | Hipótesis: sin señal en autocompletado; es la descripción exacta del servicio |

La lista completa (94 palabras) está en `keyword-research.csv`.

## Hoja de ruta

| Cuándo | Qué |
|---|---|
| Ahora | Aprobar esta investigación. Fase 2: propuesta de cambios con "hoy" y "propuesta" |
| Fase 3 | Dominio canónico, H1, títulos, descripciones, datos estructurados, preguntas frecuentes |
| Lo antes posible | Mencionar las velas de Adviento en `/religiosas` (necesita datos y fotos del cliente). Para 2027, página propia publicada en octubre |
| Antes de febrero de 2027 | Página de cirio pascual publicada |
| Fase 4 | Performance: imágenes pesadas y medición con PageSpeed |
| Fase 5 | Search Console, eventos de GA4 y Google Business Profile |
| Cada trimestre | Volver a exportar Keyword Planner y Search Console y recalcular prioridades |

## Accesos pendientes

| Acceso | Para qué | Cómo |
|---|---|---|
| Keyword Planner | Volumen, competencia y puja | Sirve la cuenta de Google Ads que ya existe: los datos son de todo el mercado, no de la cuenta. No hace falta crear campañas ni la cuenta de Devas. La lista está lista en `datos-fuente/keywords-para-keyword-planner.txt`. Si la cuenta no tiene inversión activa, entregará rangos en vez de cifras |
| Search Console | Posiciones reales en Google y URLs antiguas de Wix que aún reciben visitas | Verificar el dominio por DNS en el panel de Wix, con un registro TXT. No toca los registros de correo |
| URLs del sitio Wix | Mapa de redirecciones 301 | Panel de Wix (lista de páginas) o Search Console |
| Semrush o Ahrefs | Dificultad orgánica | Opcional |

## Limitaciones

- El volumen de búsqueda está en rangos anchos, no en cifras exactas, y sin detalle mensual.
- Las posiciones provienen de DuckDuckGo y pueden diferir de Google.
- El autocompletado se consultó sin sesión ni ubicación precisa; no refleja diferencias entre regiones de Chile.
- Trends no distingue intención: "cirios" incluye búsquedas ajenas al producto.
- La ficha de competidores cubre solo la página de inicio.
- No se midió PageSpeed del sitio.
