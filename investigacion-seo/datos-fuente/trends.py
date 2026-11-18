"""Google Trends (Chile, 12 meses), interés RELATIVO contra el ancla 'velas aromaticas'.
Uso: python3 trends.py -> trends-google.json. Endpoint no oficial: puede fallar con 429."""
import json, os, time, datetime, urllib.parse, urllib.request, http.cookiejar
ANCLA = 'velas aromaticas'
GRUPOS = [['velas por mayor', 'fabrica de velas', 'velas para matrimonio', 'velas flotantes'],
          ['cirio pascual', 'velas de bautizo', 'cirios', 'velones'],
          ['velas para eventos', 'velas funerarias', 'velas liturgicas', 'velas blancas']]
cj = http.cookiejar.CookieJar()
op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
op.addheaders = [('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'), ('Accept-Language', 'es-CL,es;q=0.9')]
def js(u):
    t = op.open(u, timeout=30).read().decode('utf-8')
    return json.loads(t[t.index('{'):])
out = {'fecha_consulta': datetime.date.today().isoformat(), 'geo': 'CL', 'periodo': 'today 12-m', 'ancla': ANCLA, 'grupos': []}
try: op.open('https://trends.google.com/trends/?geo=CL', timeout=30).read()
except Exception as e: print('cookie', e)
for g in GRUPOS:
    kws = [ANCLA] + g
    reqj = {'comparisonItem': [{'keyword': k, 'geo': 'CL', 'time': 'today 12-m'} for k in kws], 'category': 0, 'property': ''}
    try:
        ex = js('https://trends.google.com/trends/api/explore?hl=es-419&tz=180&req=' + urllib.parse.quote(json.dumps(reqj)))
        w = [x for x in ex['widgets'] if x['id'] == 'TIMESERIES'][0]
        time.sleep(2)
        d = js('https://trends.google.com/trends/api/widgetdata/multiline?hl=es-419&tz=180&req=' + urllib.parse.quote(json.dumps(w['request'])) + '&token=' + w['token'])
        tl = d['default']['timelineData']
        r = {}
        for i, k in enumerate(kws):
            v = [p['value'][i] for p in tl]
            mes = {}
            for p in tl:
                m = datetime.datetime.utcfromtimestamp(int(p['time'])).strftime('%Y-%m')
                mes.setdefault(m, []).append(p['value'][i])
            r[k] = {'promedio': round(sum(v) / len(v), 1), 'semanas': len(v), 'semanas_en_cero': sum(1 for x in v if x == 0),
                    'max': max(v), 'mes_peak': max(mes, key=lambda m: sum(mes[m]) / len(mes[m])),
                    'primera_mitad': round(sum(v[:len(v)//2]) / (len(v)//2), 1), 'segunda_mitad': round(sum(v[len(v)//2:]) / (len(v) - len(v)//2), 1)}
        out['grupos'].append(r); print(json.dumps(r, ensure_ascii=False))
    except Exception as e:
        print('ERROR', g, e); out['grupos'].append({'error': str(e), 'keywords': kws})
    time.sleep(6)
json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'trends-google.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
