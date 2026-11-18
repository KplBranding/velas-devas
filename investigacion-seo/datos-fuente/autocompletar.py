"""Recolecta sugerencias del autocompletado de Google (Chile, español).
Uso: python3 autocompletar.py  -> escribe autocompletado-google.json junto al script.
Fuente: suggestqueries.google.com (client=chrome, hl=es-419, gl=cl). Sin volumen."""
import json, os, time, datetime, urllib.parse, urllib.request

SEMILLAS = {
 'mayorista': ['velas por mayor', 'velas al por mayor', 'venta de velas por mayor', 'fabrica de velas', 'fabrica de velas santiago',
               'velas mayoristas', 'proveedor de velas', 'distribuidora de velas', 'velas al por mayor santiago', 'velas por mayor chile',
               'velas por caja', 'velas blancas por mayor', 'velones por mayor', 'comprar velas por mayor', 'velas devas', 'fabrica de velas chile',
               'velas precio mayorista', 'donde comprar velas por mayor'],
 'banqueteria': ['velas para eventos', 'velas para matrimonio', 'velas para banqueteria', 'velas flotantes', 'velas flotantes por mayor',
                 'velas para centros de mesa', 'velas para bodas', 'velones para matrimonio', 'velas pantalla', 'velas para decoracion de eventos',
                 'velas marfil', 'velas blancas', 'velones blancos', 'velas cilindricas', 'velas para fanales', 'velas para candelabros',
                 'velas largas', 'velas tea light por mayor', 'velon', 'velones'],
 'religiosas': ['cirio pascual', 'cirios', 'cirio pascual precio', 'cirio pascual comprar', 'velas para iglesia', 'velas liturgicas',
                'velas de bautizo', 'vela de bautismo', 'vela primera comunion', 'velas para primera comunion', 'cirios para iglesia',
                'velas de altar', 'velon de bautizo', 'velas religiosas', 'velas para misa', 'cirio de bautismo', 'velas personalizadas bautizo',
                'velones decorados', 'cirio pascual 2026', 'velas de confirmacion'],
 'funerarias': ['velas funerarias', 'velas para velorio', 'velas para funeral', 'velones para velorio', 'velas para difuntos',
                'velas para cementerio', 'insumos para funerarias', 'proveedores para funerarias', 'cirios funerarios', 'velas para velatorio'],
 'adviento': ['velas de adviento', 'velas adviento', 'corona de adviento velas', 'velas moradas adviento', 'velas de adviento chile',
              'velas de adviento por mayor', 'comprar velas de adviento', 'velas para corona de adviento'],
 'preguntas': ['cuanto cuesta un cirio pascual', 'cuanto dura un velon', 'cuanto duran las velas', 'que es un cirio pascual', 'que velas se usan en',
               'como elegir velas para', 'cuantas velas para matrimonio', 'diferencia entre vela y cirio', 'diferencia entre vela y velon',
               'donde comprar velas en santiago', 'donde comprar cirio pascual', 'donde venden velas', 'por que las velas', 'de que estan hechas las velas',
               'que significa el cirio pascual', 'cuanto mide un cirio pascual', 'velas de parafina o', 'como evitar que las velas'],
 'ruido': ['velas', 'velas de', 'velas aromaticas', 'velas de soya', 'curso de velas', 'velas de cumpleaños', 'velas decorativas', 'velas artesanales',
           'como hacer velas', 'insumos para velas', 'parafina para velas', 'velas led', 'velas de colores', 'velas esotericas', 'velas de miel'],
}

def sugerir(q):
    url = 'https://suggestqueries.google.com/complete/search?client=chrome&hl=es-419&gl=cl&q=' + urllib.parse.quote(q)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=20) as r:
        raw = r.read()
        cs = r.headers.get_content_charset() or 'utf-8'
    try:
        txt = raw.decode(cs)
    except UnicodeDecodeError:
        txt = raw.decode('latin-1')
    return json.loads(txt)[1]

res = {'fecha_consulta': datetime.date.today().isoformat(), 'parametros': 'client=chrome hl=es-419 gl=cl', 'consultas': []}
for cat, lista in SEMILLAS.items():
    for s in lista:
        for q in (s, s + ' '):
            try:
                sug = sugerir(q)
            except Exception as e:
                sug = []; print('ERROR', q, e)
            res['consultas'].append({'categoria': cat, 'semilla': q, 'sugerencias': sug})
            time.sleep(0.35)
dest = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'autocompletado-google.json')
json.dump(res, open(dest, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
todas = sorted({x for c in res['consultas'] for x in c['sugerencias']})
print(len(res['consultas']), 'consultas ·', len(todas), 'sugerencias únicas')
