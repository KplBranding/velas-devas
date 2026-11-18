# Fase 5 · Medición y analítica

17-11-2026. Guía de pasos para dejar lista la medición antes de activar campañas de búsqueda.

## Estado

| Tarea | Estado | Quién |
|---|---|---|
| Eventos de GA4 en el sitio | Publicados el 18-11-2026 | Claude |
| Marcar eventos clave en GA4 | Pendiente | Javier |
| Search Console | Pendiente | Javier |
| Cuenta de Google Ads y enlace con GA4 | Pendiente | Javier |
| Google Business Profile | Pendiente | Javier |
| Redirecciones 301 | Bloqueado: faltan las URLs del sitio Wix | — |
| Aviso de cookies | Publicado el 18-11-2026, en modo estricto (ver punto 6) | Claude |

## 1. Eventos de GA4

Cuenta: `G-4KN0J41YV1`. Solo se registran en `velasdevas.cl`; en local y en vistas previas no se envía nada.

| Evento | Cuándo se dispara | Parámetros | Estado |
|---|---|---|---|
| `add_to_pedido` | Agregar un producto al pedido | producto | Ya existía |
| `enviar_pedido` | Enviar el pedido por WhatsApp o correo | `metodo`, `items`, `value` | Ya existía |
| `descargar_pdf` | Descargar la lista de precios | `categoria` | Ya existía |
| `enviar_formulario` | Intento de envío del formulario de contacto | `rubro` | Ya existía |
| **`generate_lead`** | Junto a `enviar_pedido` y `descargar_pdf`, y cuando el formulario se envía con éxito | `lead_type` (`pedido`, `descarga_pdf`, `formulario_contacto`) | Nuevo |
| **`click_whatsapp`** | Clic en cualquier enlace a WhatsApp | `pagina`, `texto` | Nuevo |
| **`click_phone`** | Clic en un teléfono | `pagina`, `texto` | Nuevo |
| **`click_email`** | Clic en un correo | `pagina`, `texto` | Nuevo |
| **`click_social`** | Clic en Instagram | `pagina`, `red` | Nuevo |
| **`select_content`** | Clic en un enlace a Contacto | `pagina`, `texto`, `zona` (`menu` o `boton`) | Nuevo |

Los eventos anteriores no se renombraron, para no cortar el historial.

**Verificado en local**, con las peticiones a Google bloqueadas: `click_whatsapp`, `click_email`, `click_phone` y `select_content` se disparan. **No verificado**: `generate_lead`, porque exige enviar un formulario real; hay que comprobarlo en producción con la vista en tiempo real de GA4.

### Después de publicar: marcar los eventos clave

En GA4 → Administrar → Eventos, marcar como **evento clave**:

1. `generate_lead` (el principal: es el que se importa a Google Ads).
2. `click_whatsapp` (secundario: muchos clientes B2B escriben directo).

No marcar `enviar_formulario`, `enviar_pedido` ni `descargar_pdf`: ya están contados dentro de `generate_lead` y se duplicarían. Un evento nuevo tarda hasta 24 horas en aparecer en esa lista.

## 2. Search Console

1. Entrar a https://search.google.com/search-console con la cuenta de Google de Devas (la misma de GA4).
2. Agregar propiedad → tipo **Dominio** → escribir `velasdevas.cl`.
3. Google entrega un registro TXT que empieza con `google-site-verification=`. Copiarlo.
4. En el panel de DNS de **Wix** (ahí se administra el dominio), agregar un registro **TXT** nuevo: host `@`, valor el texto copiado.
   - **No modificar ni borrar** los registros MX ni los TXT que ya existen: de ellos depende el correo de Google Workspace.
5. Volver a Search Console y presionar Verificar. Puede tardar desde minutos hasta unas horas.
6. En Sitemaps, enviar `https://www.velasdevas.cl/sitemap.xml`.
7. En Configuración → Asociaciones, enlazar con la propiedad de GA4.

Qué obtenemos: posiciones reales en Google, velocidad medida en visitantes reales y las URLs antiguas de Wix que todavía reciben clics, necesarias para las redirecciones. Exportar *Rendimiento → Consultas y Páginas* a los 30 y a los 90 días.

## 3. Google Ads

1. Crear la cuenta en https://ads.google.com con el mismo correo de Google que administra GA4. Al crearla, elegir **modo experto** y "crear una cuenta sin campaña", para que Google no arme una campaña automática.
2. En Google Ads → Herramientas → Administrador de datos, enlazar **Google Analytics (GA4)** y **Search Console**.
3. En Objetivos → Conversiones, **importar desde GA4** el evento `generate_lead`. Opcional: `click_whatsapp` como conversión secundaria.
4. Recién entonces crear las campañas de búsqueda.

Insumos ya listos:

- Palabras clave con volumen, competencia y puja: `keyword-research.csv`.
- Negativas para pegar desde el primer día: `palabras-negativas.md`.
- Segmentar solo a Chile y solo a la red de búsqueda (sin socios ni display).

## 4. Google Business Profile

Crear o reclamar la ficha en https://business.google.com con estos datos, **idénticos** a los del sitio:

| Campo | Valor |
|---|---|
| Nombre | Velas Devas |
| Categoría principal | Fábrica de velas (o "Tienda de velas" si la primera no aparece) |
| Dirección | Av. Santa Rosa N° 6435, Bodega 11, Santiago |
| Teléfono | +56 2 2526 3491 |
| Sitio web | https://www.velasdevas.cl |
| Año de apertura | 1992 |

⚠️ Confirmar con Devas antes de publicar la ficha: horario de atención, y si la bodega recibe público. Si no atiende público, se configura como negocio con área de servicio y se oculta la dirección.

Google verifica la ficha por video, teléfono o carta; puede tardar varios días.

## 5. Redirecciones 301

Plantilla lista en `redirecciones-301.csv`. Se llena cuando Search Console muestre las URLs antiguas con clics o impresiones, o con la lista de páginas del panel de Wix. En Vercel se configuran en `next.config.js`.

## 6. Aviso de cookies: por decidir

El sitio tiene política de privacidad y cookies, pero **no tiene un aviso ni un botón para aceptar o rechazar**. Google Analytics se carga para todos los visitantes desde el primer momento.

Por qué importa ahora:

- Con campañas de Google Ads se suman cookies de publicidad, más sensibles que las de estadística.
- La nueva ley chilena de protección de datos personales (Ley 21.719) eleva las exigencias de consentimiento. ⚠️ Su fecha de entrada en vigencia y su alcance para este sitio deben confirmarse con un asesor legal: no es un dato que yo haya verificado.

Opciones:

| Opción | Qué implica |
|---|---|
| A. Dejarlo como está | Sin trabajo. Mayor exposición legal al sumar publicidad |
| B. Aviso con aceptar y rechazar, conectado al "modo de consentimiento" de Google | Un componente nuevo y discreto. GA4 y Ads respetan la elección; se pierde parte de la medición de quienes rechazan |

Recomendación: opción B antes de activar campañas. Es un elemento visual nuevo, así que requiere aprobar su diseño.

**18-11-2026:** opción B publicada (`components/AvisoCookies.js`, `lib/consentimiento.js`). Sin decisión del visitante, todo parte denegado; la constante `DEFECTO` de `lib/consentimiento.js` cambia ese comportamiento. Efecto esperado: GA4 dejará de contar con detalle a quienes rechacen o ignoren el aviso.

## 7. Tablero mensual

| Qué mirar | Dónde |
|---|---|
| Clics e impresiones por página y consulta | Search Console |
| Posición media de las 20 palabras prioritarias | Search Console |
| `generate_lead` por página de entrada y por `lead_type` | GA4 |
| Clics a WhatsApp, teléfono y correo | GA4 |
| Velocidad en visitantes reales (Core Web Vitals) | Search Console |
| Costo por conversión | Google Ads |

Cada trimestre: volver a exportar Keyword Planner y Search Console y ejecutar `datos-fuente/kp_merge.py`.
