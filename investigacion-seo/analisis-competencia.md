# Análisis de competencia · Velas Devas

Consulta: 17-11-2026.

**Fuentes y límites**

- Posiciones: DuckDuckGo región Chile (`datos-fuente/serp-duckduckgo.json`), 15 búsquedas. **No es Google**: sirve para saber quién compite, no para afirmar posiciones en Google. Las posiciones reales quedan `PENDIENTE` hasta tener Search Console.
- Ficha técnica: lectura de la home de cada sitio (`datos-fuente/competencia-tecnica.json`). Solo se registraron títulos y estructura; no se copió ningún texto.
- Tamaño del sitemap: cantidad de entradas del archivo principal. En tiendas Shopify y WordPress ese archivo es un índice, así que **no** equivale al número de páginas.

## Mapa por línea de negocio

| Línea | Quién aparece (de mayor a menor presencia) | Qué son |
|---|---|---|
| Mayorista general | fabricadevelas.cl, vishv.cl, velas.cl, portalzenmayorista.cl, MercadoLibre | Tienda de insumos y velas; importadora esotérica; tienda de cirios y fanales; mayorista zen; marketplace |
| Banquetería y eventos | velas.cl, fabricadevelas.cl, kumediseno.cl, auristal.cl, belina.cl | Tiendas online con sección "mayoristas" o "empresas"; cotillón |
| Religiosas | kerigma.cl, benedic.cl, distribuidorajuanpabloii.cl, panem.cl, beato.cl, MercadoLibre | Librerías y distribuidoras de artículos religiosos; tienda de un monasterio |
| Bautizo | Falabella, velaslopez.cl, MercadoLibre, beato.cl | Retail y tiendas al detalle con personalización |
| Funerarias | velaslopez.cl, lacandela.cl, fabricadevelas.cl | Tiendas al detalle (velas de condolencias). Ningún proveedor B2B para funerarias |

En esta muestra, velasdevas.cl aparece en 13 resultados: primero en "velas para matrimonio por mayor chile", "velas para eventos por mayor", "cirios para iglesia chile" y "velas para funerarias chile", y entre el tercer y sexto lugar en las búsquedas mayoristas generales. No aparece en ninguna búsqueda de cirio pascual, velas flotantes ni bautizo.

## Qué hace bien y mal cada competidor

| Sitio | Hace bien | Hace mal |
|---|---|---|
| **fabricadevelas.cl** (Shopify) | El dominio coincide con la búsqueda "fábrica de velas". Tiene una colección por tipo: `/collections/velas`, `/collections/cirios-y-velones`. Es el más presente en la muestra (24 resultados). | Title de la home de solo 16 caracteres, H1 vacío, y su foco real son los insumos, no la vela terminada. |
| **velas.cl** (WordPress) | Dominio de una palabra y página `/mayoristas/` que aparece en casi todas las búsquedas por mayor. | Cuatro H1 en la home; la descripción habla de "tu hogar", no de mayoristas. |
| **vishv.cl** (Jumpseller) | Catálogo enorme (sitemap con 2.916 URLs) y una página por categoría. | Rubro esotérico y aromaterapia; no compite por el mismo cliente. |
| **distribuidorajuanpabloii.cl** (Shopify) | Colección "Cirios y Velas" bien posicionada en lo religioso; reseñas de clientes. | Title de la home sin palabras clave; H1 vacío. |
| **kerigma.cl** (WordPress) | Página `/cirios/` primera en "venta de cirio pascual en santiago". | Sin meta description ni datos estructurados. |
| **benedic.cl** (Wix) | Title cargado de palabras clave y `LocalBusiness`. | H1 duplicado y sin texto útil. |
| **velaslopez.cl** (Shopify) | Una colección por ocasión: bautizos, aniversario de fallecimiento. | Venta al detalle; descripción de 28 caracteres. |
| **delfinazul.cl** | Title "Fabrica de Velas / Velas Esotericas". | Rubro esotérico; sin canonical ni datos estructurados. |

## Tabla técnica comparada (home)

| Sitio | Title (caracteres) | Meta description | H1 | Datos estructurados | Página por tipo de producto |
|---|---|---|---|---|---|
| **velasdevas.cl** | 52 | Sí (161) | 1 texto, repetido 2 veces | LocalBusiness | No (solo por categoría) |
| fabricadevelas.cl | 16 | Sí | Vacío | Organization, WebSite | Sí |
| velas.cl | 36 | Sí | 4 | WebSite, WebPage, BreadcrumbList | Sí |
| vishv.cl | 39 | Sí | Vacío | WebSite, BreadcrumbList | Sí |
| distribuidorajuanpabloii.cl | 26 | Sí | Vacío | Organization, WebSite | Sí |
| velaslopez.cl | 11 | Sí (28) | Vacío | Organization, WebSite | Sí |
| kerigma.cl | 7 | No | 3 | Ninguno | Sí |
| benedic.cl | 77 | Sí | 2 | LocalBusiness, WebSite | Sí |
| panem.cl | 23 | Sí | 1 | Organization, WebSite, BreadcrumbList | Sí |
| lacandela.cl | 58 | Sí | Vacío | Organization, WebSite | Sí |

Lectura: en lo técnico la competencia es débil (títulos cortos o genéricos, H1 vacíos). Su ventaja es de **estructura**: todos tienen una URL propia por tipo de producto y Devas no.

## Oportunidades de contenido

1. **Nadie se presenta como fabricante mayorista para banqueteras, parroquias y funerarias.** Los que aparecen son tiendas online, importadoras o librerías religiosas. El posicionamiento de Devas es único en la muestra. *(Dato: títulos y descripciones de los 14 sitios.)*
2. **Cirio pascual**: es la búsqueda religiosa con más variantes (49 sugerencias) y Devas no aparece. Hoy la ganan MercadoLibre, Kerigma y Benedic con páginas dedicadas. *(Dato.)*
3. **Velas flotantes por mayor**: la ganan sitios de Patronato y Meiggs con fichas de producto básicas. *(Dato.)*
4. **Funerarias**: no hay ningún competidor B2B. Devas ya aparece primero en la muestra; hay que defenderlo, no conquistarlo. *(Dato de DuckDuckGo; en Google está PENDIENTE.)*
5. **Preguntas frecuentes**: ningún competidor de la muestra responde dudas como cuánto dura un velón o cuánto cuesta un cirio pascual, y Google sí las sugiere. *(Dato de autocompletado; la ausencia en competidores se revisó solo en las home.)*
