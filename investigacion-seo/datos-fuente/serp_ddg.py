"""SERP aproximado vía DuckDuckGo (región cl-es). NO es Google: sirve solo para identificar competidores.
Uso: python3 serp_ddg.py -> serp-duckduckgo.json"""
import json, os, re, time, html, datetime, urllib.parse, urllib.request
QS = ['velas por mayor santiago', 'fabrica de velas santiago', 'fabrica de velas chile', 'velas al por mayor chile',
      'velas para matrimonio por mayor chile', 'velas para eventos por mayor', 'velas flotantes por mayor chile',
      'cirio pascual precio chile', 'venta de cirio pascual en santiago', 'velas liturgicas chile', 'cirios para iglesia chile',
      'velas de bautizo chile', 'velas para funerarias chile', 'insumos funerarios chile velas', 'velones blancos por mayor chile']
out = {'fecha_consulta': datetime.date.today().isoformat(), 'fuente': 'html.duckduckgo.com kl=cl-es (aproximación, no Google)', 'resultados': {}}
for q in QS:
    url = 'https://html.duckduckgo.com/html/?kl=cl-es&q=' + urllib.parse.quote(q)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'})
    try:
        h = urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'replace')
    except Exception as e:
        print('ERROR', q, e); out['resultados'][q] = []; continue
    res = []
    for m in re.finditer(r'<a rel="nofollow" class="result__a" href="(.*?)">(.*?)</a>', h, re.S):
        href = html.unescape(m.group(1))
        u = re.search(r'uddg=([^&]+)', href)
        link = urllib.parse.unquote(u.group(1)) if u else href
        if 'duckduckgo.com/y.js' in link: continue
        res.append({'pos': len(res) + 1, 'url': link, 'titulo': html.unescape(re.sub(r'<[^>]+>', '', m.group(2)))})
    out['resultados'][q] = res[:10]
    print(q, '->', len(res)); time.sleep(2.5)
json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'serp-duckduckgo.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
from collections import Counter
c = Counter(urllib.parse.urlparse(r['url']).netloc.replace('www.', '') for v in out['resultados'].values() for r in v)
print(c.most_common(40))
