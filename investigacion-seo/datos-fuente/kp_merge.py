"""Cruza la exportación de Keyword Planner con keyword-research.csv.
Uso: python3 -I kp_merge.py keyword-planner-AAAA-MM-DD.csv
- Respalda keyword-research.csv como keyword-research.respaldo-<fecha>.csv antes de escribir.
- Conserva prioridad_v1 y recalcula `prioridad` y `motivo_prioridad` con esta regla:
    NO PERSEGUIR (ruido) y relevancia <= 2 -> no cambian
    Sin volumen informado: ALTA baja a MEDIA
    Sin fila en la exportación (Keyword Planner agrupa variantes cercanas): se mantiene
    10-100 búsquedas: se mantiene
    100-1 mil con relevancia >= 4: sube un nivel
    Más de 1 mil con relevancia >= 4: ALTA
Las cuentas sin inversión entregan RANGOS: 50 = 10-100, 500 = 100-1 mil, 5000 = 1 mil-10 mil."""
import csv, io, os, shutil, sys, unicodedata
D = os.path.dirname(os.path.abspath(__file__))
src = sys.argv[1] if os.path.isabs(sys.argv[1]) else os.path.join(D, sys.argv[1])
fecha = os.path.basename(src).replace('keyword-planner-', '').replace('.csv', '')
norm = lambda s: ''.join(c for c in unicodedata.normalize('NFD', s.lower()) if unicodedata.category(c) != 'Mn').strip()
txt = open(src, 'rb').read().decode('utf-16')
lines = txt.splitlines()
h = next(i for i, l in enumerate(lines) if l.startswith('Keyword\t'))
periodo = lines[h - 1].strip()
kp = {}
for r in csv.DictReader(io.StringIO('\n'.join(lines[h:])), delimiter='\t'):
    if r['Keyword'].strip(): kp[norm(r['Keyword'])] = r
RANGO = {'50.0': '10 – 100', '500.0': '100 – 1 mil', '5000.0': '1 mil – 10 mil', '50000.0': '10 mil – 100 mil', '0.0': '0'}
NIV = ['BAJA', 'MEDIA', 'ALTA']
main = os.path.join(D, '..', 'keyword-research.csv')
rows = list(csv.DictReader(open(main, encoding='utf-8-sig'), delimiter=';'))
cols = list(rows[0].keys())
shutil.copy(main, os.path.join(D, '..', 'keyword-research.respaldo-%s.csv' % fecha))
sin_fila, cambios = [], []
for r in rows:
    k = kp.get(norm(r['keyword']))
    v = (k or {}).get('Avg. monthly searches', '').strip()
    if k is None: sin_fila.append(r['keyword'])
    tiene = v not in ('', '0.0')
    rango_exacto = v in RANGO
    r['volumen_mensual'] = (RANGO.get(v, v) if v else 'Sin dato de Keyword Planner')
    r['competencia_ads'] = ((k or {}).get('Competition', '').strip() + (' (%s)' % k['Competition (indexed value)'].strip() if k and k['Competition (indexed value)'].strip() else '')) or 'Sin dato'
    lo, hi = (k or {}).get('Top of page bid (low range)', '').strip(), (k or {}).get('Top of page bid (high range)', '').strip()
    r['puja'] = ('CLP %s – %s' % (lo, hi)) if lo and hi else 'Sin dato'
    v1, rel = r['prioridad_v1'], int(r['relevancia'])
    p, mot = v1, r['motivo_prioridad']
    if k is None and v1 != 'NO PERSEGUIR':
        r['volumen_mensual'] = 'Sin fila propia: Keyword Planner la agrupa con una variante cercana'
        mot = 'Keyword Planner no la lista por separado (variante cercana de otra palabra): se mantiene la prioridad v1.'
    elif v1 != 'NO PERSEGUIR' and rel > 2:
        if not tiene:
            if v1 == 'ALTA': p, mot = 'MEDIA', 'Keyword Planner no informa volumen: baja de ALTA a MEDIA.'
            else: mot = 'Keyword Planner no informa volumen; se mantiene.'
        elif v == '50.0': mot = '10–100 búsquedas al mes: se mantiene la prioridad v1.'
        elif v == '500.0':
            if rel >= 4:
                p = NIV[min(2, NIV.index(v1) + 1)]; mot = '100–1 mil búsquedas al mes y relevancia %d: %s.' % (rel, 'sube un nivel' if p != v1 else 'ya era ALTA')
            else: mot = '100–1 mil búsquedas al mes, pero relevancia %d: se mantiene.' % rel
        else:
            if rel >= 4: p, mot = 'ALTA', 'Más de 1 mil búsquedas al mes y relevancia %d.' % rel
            else: mot = 'Más de 1 mil búsquedas al mes, pero relevancia %d: se mantiene.' % rel
    elif v1 == 'NO PERSEGUIR':
        mot = 'Ruido: otra intención u otro producto. Volumen %s: no se persigue.' % r['volumen_mensual']
    if p != v1: cambios.append((r['keyword'], v1, p, r['volumen_mensual']))
    r['prioridad'], r['motivo_prioridad'] = p, mot
    r['tipo_dato'] = r['tipo_dato'].split(' + ')[0].replace(')', ', Keyword Planner en rangos)') + ' + criterio profesional (relevancia, intención)' if k else r['tipo_dato']
    if k and 'Keyword Planner' not in r['fuentes']: r['fuentes'] += '; Google Keyword Planner CL, %s (consulta %s)' % (periodo, fecha)
with open(main, 'w', encoding='utf-8-sig', newline='') as f:
    w = csv.DictWriter(f, fieldnames=cols, delimiter=';'); w.writeheader(); w.writerows(rows)
from collections import Counter
print('Período:', periodo, '· filas KP:', len(kp), '· keywords propias:', len(rows))
print('Sin fila en la exportación:', sin_fila)
print('Volumen:', Counter(r['volumen_mensual'] for r in rows))
print('Prioridad v1:', Counter(r['prioridad_v1'] for r in rows), '\nPrioridad nueva:', Counter(r['prioridad'] for r in rows))
print('Cambios:'); [print('  ', c) for c in cambios]
print('Ordenadas (no ruido):')
for r in sorted([r for r in rows if r['prioridad_v1'] != 'NO PERSEGUIR'], key=lambda r: (-{'1 mil – 10 mil': 3, '100 – 1 mil': 2, '10 – 100': 1}.get(r['volumen_mensual'], 0), -int(r['relevancia']))):
    if r['volumen_mensual'] in ('1 mil – 10 mil', '100 – 1 mil'): print('  ', r['volumen_mensual'], '|', r['keyword'], '| rel', r['relevancia'], '|', r['competencia_ads'], '|', r['puja'], '|', r['prioridad'])
