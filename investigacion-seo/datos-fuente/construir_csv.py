"""Genera ../keyword-research.csv y ../preguntas-frecuentes.csv a partir de la lista curada de abajo
y de los datos crudos (autocompletado-google.json, trends-google.json). Imprime el largo de los metas propuestos.
Regla de prioridad v1 (sin Keyword Planner):
  NO PERSEGUIR = ruido / fuera de la regla de marca · BAJA = relevancia <= 2
  ALTA = relevancia >= 4, intención comercial o transaccional y señal en el autocompletado
         (Google la sugiere textualmente desde otra consulta, o genera 3 o más sugerencias derivadas)
  MEDIA = el resto."""
import csv, json, os, unicodedata
D = os.path.dirname(os.path.abspath(__file__))
ac = json.load(open(os.path.join(D, 'autocompletado-google.json'), encoding='utf-8'))
tr = json.load(open(os.path.join(D, 'trends-google.json'), encoding='utf-8'))
FECHA = ac['fecha_consulta']
norm = lambda s: ''.join(c for c in unicodedata.normalize('NFD', s.lower()) if unicodedata.category(c) != 'Mn').strip()
# Se descarta la sugerencia que solo repite la semilla consultada: no es evidencia de demanda.
SUG = {norm(x) for c in ac['consultas'] for x in c['sugerencias'] if norm(x) != norm(c['semilla'])}
derivadas = lambda kw: sum(1 for x in SUG if x.startswith(norm(kw) + ' '))
TR = {}
for g in tr['grupos']:
    for k, v in g.items():
        if isinstance(v, dict) and 'promedio' in v: TR[norm(k)] = v

# keyword, categoría, unidad, página sugerida, intención, relevancia(1-5), conversión, notas
K = [
 ('velas por mayor', 'mayorista', 'General', '/', 'comercial', 5, 'alta', 'Término principal del negocio.'),
 ('velas al por mayor', 'mayorista', 'General', '/', 'comercial', 5, 'alta', 'Variante de la principal.'),
 ('velas por mayor santiago', 'mayorista', 'General', '/', 'comercial', 5, 'alta', 'Devas fabrica en Santiago.'),
 ('velas al por mayor chile', 'mayorista', 'General', '/', 'comercial', 5, 'alta', ''),
 ('velas por mayor chile', 'mayorista', 'General', '/', 'comercial', 5, 'alta', ''),
 ('venta de velas por mayor en santiago', 'mayorista', 'General', '/', 'transaccional', 5, 'alta', ''),
 ('fabrica de velas', 'mayorista', 'General', '/', 'comercial', 5, 'alta', 'Compite con el dominio fabricadevelas.cl (coincidencia exacta).'),
 ('fabrica de velas en santiago', 'mayorista', 'General', '/', 'comercial', 5, 'alta', ''),
 ('fabrica de velas en chile', 'mayorista', 'General', '/', 'comercial', 5, 'alta', ''),
 ('fabrica de velas y velones', 'mayorista', 'General', '/', 'comercial', 5, 'alta', ''),
 ('donde comprar velas por mayor', 'mayorista', 'General', '/', 'comercial', 5, 'alta', 'Sirve también como pregunta frecuente.'),
 ('velas blancas por mayor', 'mayorista', 'General', '/', 'comercial', 5, 'alta', 'Coincide con el producto (blanco nieve).'),
 ('velones por mayor', 'mayorista', 'General', '/', 'comercial', 5, 'alta', ''),
 ('velones blancos por mayor', 'mayorista', 'General', '/', 'comercial', 5, 'alta', ''),
 ('velas blancas por caja', 'mayorista', 'General', '/', 'transaccional', 4, 'alta', 'Confirmar con el cliente si se vende por caja.'),
 ('proveedor de velas', 'mayorista', 'General', '/', 'comercial', 4, 'media', 'Autocompletado dominado por México y Colombia.'),
 ('distribuidora de velas y velones', 'mayorista', 'General', '/', 'comercial', 3, 'media', 'Devas es fabricante, no distribuidora.'),
 ('velas por mayor meiggs', 'mayorista', 'General', '-', 'navegacional', 2, 'baja', 'Busca el barrio Meiggs; Devas no está ahí. No prometer ubicación.'),
 ('velas devas', 'marca', 'Marca', '/', 'navegacional', 5, 'alta', 'Aparece en el autocompletado: ya hay búsqueda de marca.'),
 ('velas para eventos por mayor', 'banqueteria', 'Banquetería', '/banqueteria', 'comercial', 5, 'alta', ''),
 ('velas para eventos', 'banqueteria', 'Banquetería', '/banqueteria', 'comercial', 4, 'media', ''),
 ('velas para matrimonio', 'banqueteria', 'Banquetería', '/banqueteria', 'comercial', 4, 'media', 'Mezcla B2C (recuerdos, decoradas).'),
 ('velas para matrimonios', 'banqueteria', 'Banquetería', '/banqueteria', 'comercial', 4, 'media', ''),
 ('velas blancas para matrimonio', 'banqueteria', 'Banquetería', '/banqueteria', 'comercial', 5, 'alta', ''),
 ('velones para matrimonio', 'banqueteria', 'Banquetería', '/banqueteria', 'comercial', 5, 'alta', ''),
 ('velas para bodas', 'banqueteria', 'Banquetería', '/banqueteria', 'comercial', 3, 'media', 'En Chile se dice más "matrimonio".'),
 ('velas para centros de mesa', 'banqueteria', 'Banquetería', '/banqueteria', 'comercial', 4, 'media', ''),
 ('velas para centros de mesa por mayor', 'banqueteria', 'Banquetería', '/banqueteria', 'comercial', 5, 'alta', ''),
 ('velas flotantes', 'banqueteria', 'Vela flotante', '/banqueteria (o página nueva)', 'comercial', 4, 'media', 'Mucho ruido: LED, piscina, Harry Potter.'),
 ('velas flotantes por mayor', 'banqueteria', 'Vela flotante', '/banqueteria (o página nueva)', 'comercial', 5, 'alta', ''),
 ('velas flotantes chile', 'banqueteria', 'Vela flotante', '/banqueteria (o página nueva)', 'comercial', 4, 'media', ''),
 ('velas flotantes para centros de mesa', 'banqueteria', 'Vela flotante', '/banqueteria (o página nueva)', 'comercial', 5, 'alta', ''),
 ('velas para restaurantes', 'banqueteria', 'Banquetería', '/banqueteria', 'comercial', 4, 'media', 'Segmento B2B cercano: confirmar con el cliente si interesa.'),
 ('velas cilindricas blancas', 'banqueteria', 'Velones', '/banqueteria', 'comercial', 4, 'media', ''),
 ('velas cilindricas al por mayor', 'banqueteria', 'Velones', '/banqueteria', 'comercial', 5, 'alta', ''),
 ('velas largas por mayor', 'banqueteria', 'Vela 2,2 cm', '/banqueteria', 'comercial', 4, 'media', ''),
 ('velas largas para candelabros', 'banqueteria', 'Vela 2,2 cm', '/banqueteria', 'comercial', 4, 'media', ''),
 ('velas color marfil', 'banqueteria', 'Color', '/banqueteria', 'comercial', 4, 'media', 'Color propio de la marca.'),
 ('velones blancos grandes', 'banqueteria', 'Velones', '/banqueteria', 'comercial', 4, 'media', ''),
 ('cirio pascual', 'religiosas', 'Cirio pascual', '/religiosas (o página nueva)', 'informativa', 4, 'media', 'Muy estacional: peak en marzo (Semana Santa).'),
 ('cirio pascual precio', 'religiosas', 'Cirio pascual', '/religiosas (o página nueva)', 'transaccional', 5, 'alta', ''),
 ('cirio pascual precio chile', 'religiosas', 'Cirio pascual', '/religiosas (o página nueva)', 'transaccional', 5, 'alta', ''),
 ('cirio pascual chile', 'religiosas', 'Cirio pascual', '/religiosas (o página nueva)', 'comercial', 5, 'alta', ''),
 ('venta de cirio pascual en santiago', 'religiosas', 'Cirio pascual', '/religiosas (o página nueva)', 'transaccional', 5, 'alta', ''),
 ('cirio pascual donde comprar', 'religiosas', 'Cirio pascual', '/religiosas (o página nueva)', 'transaccional', 5, 'alta', ''),
 ('cirios pascuales precios en chile', 'religiosas', 'Cirio pascual', '/religiosas (o página nueva)', 'transaccional', 5, 'alta', ''),
 ('cirios para iglesia', 'religiosas', 'Cirios y velones', '/religiosas', 'comercial', 5, 'alta', ''),
 ('venta de cirios para iglesia', 'religiosas', 'Cirios y velones', '/religiosas', 'transaccional', 5, 'alta', ''),
 ('cirios por mayor', 'religiosas', 'Cirios y velones', '/religiosas', 'comercial', 5, 'alta', ''),
 ('velas para iglesia', 'religiosas', 'Cirios y velones', '/religiosas', 'comercial', 5, 'alta', ''),
 ('venta de velas para iglesias', 'religiosas', 'Cirios y velones', '/religiosas', 'transaccional', 5, 'alta', ''),
 ('velas liturgicas', 'religiosas', 'Cirios y velones', '/religiosas', 'comercial', 5, 'alta', ''),
 ('velas liturgicas al por mayor', 'religiosas', 'Cirios y velones', '/religiosas', 'comercial', 5, 'alta', ''),
 ('fabrica de velas liturgicas', 'religiosas', 'Cirios y velones', '/religiosas', 'comercial', 5, 'alta', ''),
 ('velas religiosas al por mayor', 'religiosas', 'Cirios y velones', '/religiosas', 'comercial', 5, 'alta', ''),
 ('velas de altar', 'religiosas', 'Cirios y velones', '/religiosas', 'informativa', 3, 'baja', 'Ruido: altar de muertos (México).'),
 ('velas para misa', 'religiosas', 'Cirios y velones', '/religiosas', 'comercial', 4, 'media', ''),
 ('velon de iglesia', 'religiosas', 'Cirios y velones', '/religiosas', 'comercial', 4, 'media', ''),
 ('velones decorados', 'religiosas', 'Decorados', '/religiosas', 'comercial', 4, 'media', ''),
 ('velones decorados para primera comunion', 'religiosas', 'Decorados', '/religiosas', 'comercial', 4, 'media', ''),
 ('velas de bautizo', 'religiosas', 'Vela de bautizo', '/religiosas (o página nueva)', 'comercial', 4, 'media', 'Mayormente B2C y personalizadas; peak en diciembre.'),
 ('velas de bautizo por mayor', 'religiosas', 'Vela de bautizo', '/religiosas (o página nueva)', 'comercial', 5, 'alta', ''),
 ('velas bautizo chile', 'religiosas', 'Vela de bautizo', '/religiosas (o página nueva)', 'comercial', 4, 'media', ''),
 ('velon de bautizo', 'religiosas', 'Vela de bautizo', '/religiosas (o página nueva)', 'comercial', 4, 'media', ''),
 ('vela primera comunion', 'religiosas', 'Primera comunión', '/religiosas (o página nueva)', 'comercial', 4, 'media', 'Mayormente B2C.'),
 ('velas de confirmacion', 'religiosas', 'Decorados', '/religiosas', 'comercial', 3, 'media', 'Ruido: "velas de confirmación" en trading.'),
 ('velas de adviento', 'religiosas', 'Adviento', '/religiosas (o página nueva)', 'comercial', 4, 'media', 'Confirmado por el cliente el 17-11-2026: Devas fabrica velas de Adviento moradas. No están en el catálogo del sitio. Estacional: noviembre y diciembre.'),
 ('velas de adviento precio', 'religiosas', 'Adviento', '/religiosas (o página nueva)', 'transaccional', 5, 'alta', ''),
 ('velas de adviento donde comprar', 'religiosas', 'Adviento', '/religiosas (o página nueva)', 'transaccional', 5, 'alta', ''),
 ('velas de adviento por mayor', 'religiosas', 'Adviento', '/religiosas (o página nueva)', 'comercial', 5, 'alta', ''),
 ('velas de adviento chile', 'religiosas', 'Adviento', '/religiosas (o página nueva)', 'comercial', 5, 'alta', ''),
 ('velas para corona de adviento', 'religiosas', 'Adviento', '/religiosas (o página nueva)', 'comercial', 5, 'alta', 'La corona lleva 3 moradas y 1 rosada: confirmar si Devas fabrica la rosada.'),
 ('velas moradas para corona de adviento', 'religiosas', 'Adviento', '/religiosas (o página nueva)', 'comercial', 5, 'alta', ''),
 ('velas para funeral', 'funerarias', 'Funerarias', '/funerarias', 'comercial', 4, 'media', ''),
 ('velas para velorio', 'funerarias', 'Funerarias', '/funerarias', 'comercial', 5, 'alta', ''),
 ('velones para velorios', 'funerarias', 'Funerarias', '/funerarias', 'comercial', 5, 'alta', ''),
 ('velas funerarias', 'funerarias', 'Funerarias', '/funerarias', 'comercial', 5, 'alta', ''),
 ('velas grandes para velorio', 'funerarias', 'Funerarias', '/funerarias', 'comercial', 5, 'alta', ''),
 ('cirios funerarios', 'funerarias', 'Funerarias', '/funerarias', 'comercial', 5, 'alta', ''),
 ('insumos para funerarias', 'funerarias', 'Funerarias', '/funerarias', 'comercial', 4, 'media', 'El comprador es exactamente el cliente de Devas.'),
 ('proveedores para funerarias', 'funerarias', 'Funerarias', '/funerarias', 'comercial', 4, 'media', ''),
 ('insumos funerarios chile', 'funerarias', 'Funerarias', '/funerarias', 'comercial', 4, 'media', ''),
 ('velas para difuntos', 'funerarias', 'Funerarias', '/funerarias', 'informativa', 3, 'baja', 'Mayormente B2C y recuerdos.'),
 ('velas para cementerio', 'funerarias', 'Funerarias', '-', 'comercial', 2, 'baja', 'Autocompletado: LED, solares, a pilas.'),
 # Ruido verificado en el autocompletado: no se persigue
 ('velas aromaticas', 'ruido', '-', '-', 'comercial', 1, 'nula', 'Excluido por el cliente. Es el término con más interés en Trends: ~6 veces "velas por mayor".'),
 ('velas de soya', 'ruido', '-', '-', 'comercial', 1, 'nula', 'Otro producto.'),
 ('velas esotericas', 'ruido', '-', '-', 'comercial', 1, 'nula', 'Otro rubro (rituales, santería).'),
 ('velas de cumpleaños', 'ruido', '-', '-', 'comercial', 1, 'nula', 'Otro producto.'),
 ('velas led', 'ruido', '-', '-', 'comercial', 1, 'nula', 'Otro producto.'),
 ('insumos para velas', 'ruido', '-', '-', 'comercial', 1, 'nula', 'Lo busca quien fabrica velas, no quien las compra.'),
 ('curso de velas', 'ruido', '-', '-', 'informativa', 1, 'nula', 'Excluido por el cliente.'),
 ('como hacer velas', 'ruido', '-', '-', 'informativa', 1, 'nula', 'Hazlo tú mismo.'),
 ('velas de colores', 'ruido', '-', '-', 'comercial', 1, 'nula', 'Excluido por el cliente.'),
 ('velas decorativas', 'ruido', '-', '-', 'comercial', 2, 'baja', 'Retail y hogar (Casa Ideas, Sodimac, Falabella).'),
]

def prioridad(cat, inten, rel, en_ac):
    if cat == 'ruido': return 'NO PERSEGUIR', 'Ruido: otra intención u otro producto (verificado en autocompletado).'
    if rel <= 2: return 'BAJA', 'Relevancia 2 o menos.'
    if rel >= 4 and inten in ('comercial', 'transaccional') and en_ac: return 'ALTA', 'Relevancia %d, intención %s y presente en el autocompletado.' % (rel, inten)
    if cat == 'marca': return 'ALTA', 'Búsqueda de marca.'
    return 'MEDIA', 'Relevancia %d; %s.' % (rel, 'sin señal en el autocompletado' if not en_ac else 'intención ' + inten)

cols = ['keyword', 'categoria', 'unidad_o_servicio', 'pagina_sugerida', 'volumen_mensual', 'competencia_ads', 'puja', 'trends_indice_promedio',
        'trends_tendencia', 'senal_demanda', 'intencion', 'relevancia', 'conversion', 'dificultad', 'prioridad_v1', 'prioridad',
        'motivo_prioridad', 'tipo_dato', 'fuentes', 'fecha_consulta', 'notas']
rows = []
for kw, cat, uni, pag, inten, rel, conv, nota in K:
    textual = norm(kw) in SUG; nder = derivadas(kw)
    en_ac = textual or nder >= 3
    t = TR.get(norm(kw))
    if t:
        ind = str(t['promedio']).replace('.', ',')
        tend = 'no concluyente (%d de %d semanas en cero); mes peak %s' % (t['semanas_en_cero'], t['semanas'], t['mes_peak']) if t['semanas_en_cero'] > t['semanas'] / 2 else 'estable (%s -> %s)' % (t['primera_mitad'], t['segunda_mitad'])
    else:
        ind, tend = 'no consultado', 'no consultado'
    p, mot = prioridad(cat, inten, rel, en_ac)
    senal = ('Sugerencia textual de Google' if textual else 'Semilla propia') + '; %d sugerencias derivadas' % nder
    tipo = 'dato real (autocompletado%s) + criterio profesional (relevancia, intención)' % (' y Trends' if t else '')
    rows.append([kw, cat, uni, pag, 'PENDIENTE (Keyword Planner)', 'PENDIENTE (Keyword Planner)', 'PENDIENTE (Keyword Planner)', ind, tend, senal,
                 inten, rel, conv, 'PENDIENTE (Semrush/Ahrefs)', p, p, mot, tipo,
                 'Google Autocomplete hl=es-419 gl=cl' + ('; Google Trends CL 12 meses, ancla "velas aromaticas"' if t else ''), FECHA, nota])
with open(os.path.join(D, '..', 'keyword-research.csv'), 'w', encoding='utf-8-sig', newline='') as f:
    w = csv.writer(f, delimiter=';'); w.writerow(cols); w.writerows(rows)
with open(os.path.join(D, 'keywords-para-keyword-planner.txt'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(r[0] for r in rows) + '\n')
from collections import Counter
print(len(rows), 'keywords ·', Counter(r[15] for r in rows))
print('Semillas propias:', [(r[0], r[9], r[15]) for r in rows if r[9].startswith('Semilla')])

# pregunta, consulta original, categoría, página, intención, prioridad
P = [
 ('¿Dónde comprar velas por mayor en Santiago?', 'donde comprar velas por mayor', 'mayorista', '/', 'comercial', 'ALTA'),
 ('¿Cuánto cuesta un cirio pascual?', 'cuanto cuesta un cirio pascual', 'religiosas', '/religiosas', 'transaccional', 'ALTA'),
 ('¿Dónde comprar un cirio pascual?', 'donde comprar cirio pascual', 'religiosas', '/religiosas', 'transaccional', 'ALTA'),
 ('¿Cuánto mide un cirio pascual?', 'cuanto mide un cirio pascual', 'religiosas', '/religiosas', 'informativa', 'MEDIA'),
 ('¿Qué es y qué significa el cirio pascual?', 'que significa el cirio pascual', 'religiosas', '/religiosas', 'informativa', 'MEDIA'),
 ('¿Cuál es la diferencia entre una vela y un cirio?', 'diferencia entre vela y cirio', 'religiosas', '/religiosas', 'informativa', 'MEDIA'),
 ('¿Cuál es la diferencia entre una vela y un velón?', 'diferencia entre vela y velon', 'banqueteria', '/banqueteria', 'informativa', 'MEDIA'),
 ('¿Qué velas se usan en la iglesia?', 'velas que se usan en la iglesia', 'religiosas', '/religiosas', 'informativa', 'MEDIA'),
 ('¿Qué velas se usan para un bautizo?', 'que velas se usan para bautizo', 'religiosas', '/religiosas', 'comercial', 'MEDIA'),
 ('¿Dónde comprar velas de Adviento?', 'donde comprar velas de adviento', 'religiosas', '/religiosas', 'transaccional', 'ALTA'),
 ('¿Qué colores llevan las velas de la corona de Adviento y en qué orden se encienden?', 'velas de adviento colores orden', 'religiosas', '/religiosas', 'informativa', 'MEDIA'),
 ('¿Cuánto dura un velón encendido?', 'cuanto dura un velon encendido', 'banqueteria', '/banqueteria y /funerarias', 'informativa', 'ALTA'),
 ('¿Cuánto duran las velas flotantes?', 'cuanto duran las velas flotantes', 'banqueteria', '/banqueteria', 'informativa', 'ALTA'),
 ('¿Cuánto dura una vela blanca?', 'cuanto dura una vela blanca', 'banqueteria', '/banqueteria', 'informativa', 'MEDIA'),
 ('¿De qué están hechas las velas?', 'de que estan hechas las velas', 'general', '/nosotros', 'informativa', 'MEDIA'),
 ('¿De qué están hechas las velas flotantes?', 'de que estan hechas las velas flotantes', 'banqueteria', '/banqueteria', 'informativa', 'BAJA'),
 ('¿Por qué las velas echan humo negro y cómo evitarlo?', 'como evitar que las velas expidan humo negro', 'general', '/banqueteria y /funerarias', 'informativa', 'MEDIA'),
 ('¿Por qué las velas se consumen rápido?', 'por que las velas se consumen rapido', 'general', '/funerarias', 'informativa', 'MEDIA'),
 ('¿Cómo evitar que se apaguen las velas?', 'como evitar que se apaguen las velas', 'banqueteria', '/banqueteria', 'informativa', 'MEDIA'),
 ('¿Por qué las velas chispean?', 'por que las velas chispean', 'general', '/nosotros', 'informativa', 'BAJA'),
]
with open(os.path.join(D, '..', 'preguntas-frecuentes.csv'), 'w', encoding='utf-8-sig', newline='') as f:
    w = csv.writer(f, delimiter=';')
    w.writerow(['pregunta', 'consulta_original_google', 'categoria', 'pagina_sugerida', 'intencion', 'prioridad', 'fuente', 'dato_cuantitativo', 'respuesta'])
    for q, o, c, pg, i, pr in P:
        nd = derivadas(o); ok = norm(o) in SUG or nd >= 1
        w.writerow([q, o, c, pg, i, pr, ('Google Autocomplete hl=es-419 gl=cl (%s); %s' % (FECHA, 'sugerencia textual' if norm(o) in SUG else '%d sugerencias derivadas' % nd)) if ok else 'HIPÓTESIS: semilla propia sin sugerencias de Google', 'Sin volumen: PENDIENTE (Keyword Planner)', 'PENDIENTE: dato del cliente'])
        if not ok: print('PREGUNTA SIN RESPALDO (queda como hipótesis):', o)

METAS = {
 '/ title': 'Fábrica de velas por mayor en Chile | Velas Devas',
 '/ desc': 'Fabricantes mayoristas de velas desde 1992. Velas, velones y cirios en blanco y marfil para banquetería, iglesias y funerarias. Despacho a todo Chile.',
 '/banqueteria title': 'Velas para matrimonios y eventos por mayor | Velas Devas',
 '/banqueteria desc': 'Velas, velones y velas flotantes para banquetería, matrimonios y eventos. Más de 30 medidas en blanco y marfil, stock permanente y despacho a todo Chile.',
 '/religiosas title': 'Cirios y velas para iglesias: cirio pascual | Velas Devas',
 '/religiosas desc': 'Cirios, velones y cirio pascual de fabricación propia para parroquias y capillas. Lisos, decorados e impresos, en blanco nieve o marfil. Cotiza por mayor.',
 '/funerarias title': 'Velas para funerarias y velatorios por mayor | Velas Devas',
 '/funerarias desc': 'Velas y velones para funerarias y salas velatorias. Stock permanente, precios mayoristas y despacho a todo Chile, con formatos especiales a pedido.',
 '/nosotros title': 'Fabricantes de velas desde 1992 | Velas Devas',
 '/nosotros desc': 'Más de 30 años fabricando velas para banqueterías, funerarias, parroquias y distribuidores de todo Chile. Calidad, consistencia y fabricación nacional.',
 '/contacto title': 'Cotiza velas por mayor: contacto | Velas Devas',
 '/contacto desc': 'Solicita una cotización mayorista de velas para banquetería, iglesias o funerarias. Fabricación propia en Santiago y despacho a todo Chile.',
}
for k, v in METAS.items(): print(len(v), ('OK ' if len(v) <= (60 if 'title' in k else 155) else 'LARGO '), k, '|', v)
