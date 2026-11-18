"""Ficha técnica de la home de cada competidor (solo títulos y estructura; no se copian textos).
Uso: python3 competencia.py -> competencia-tecnica.json"""
import json, os, re, html, datetime, urllib.request
SITIOS = ['fabricadevelas.cl', 'velas.cl', 'vishv.cl', 'distribuidorajuanpabloii.cl', 'velaslopez.cl', 'kerigma.cl', 'benedic.cl',
          'panem.cl', 'delfinazul.cl', 'secha.cl', 'lacandela.cl', 'artevelas.cl', 'velassantiago.com', 'beato.cl']
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'}
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=25).read().decode('utf-8', 'replace')
strip = lambda s: re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s))).strip()
out = {'fecha_consulta': datetime.date.today().isoformat(), 'sitios': {}}
for s in SITIOS:
    f = {}
    try:
        h = get('https://' + s)
    except Exception as e:
        try: h = get('https://www.' + s)
        except Exception as e2: out['sitios'][s] = {'error': str(e2)}; print(s, 'ERROR', e2); continue
    m = lambda rx: (lambda r: strip(r.group(1)) if r else None)(re.search(rx, h, re.S | re.I))
    f['title'] = m(r'<title[^>]*>(.*?)</title>')
    f['description'] = m(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']')
    for n in '12':
        f['h' + n] = [strip(x) for x in re.findall(r'<h%s[^>]*>(.*?)</h%s>' % (n, n), h, re.S | re.I)][:10]
    f['schema'] = sorted(set(re.findall(r'"@type"\s*:\s*"([A-Za-z]+)"', h)))
    f['plataforma'] = [k for k, rx in {'Shopify': 'cdn.shopify', 'WooCommerce': 'woocommerce', 'WordPress': 'wp-content', 'Jumpseller': 'jumpseller', 'Wix': 'wixstatic', 'Bsale': 'bsale', 'Tiendanube': 'tiendanube|nuvemshop', 'PrestaShop': 'prestashop'}.items() if re.search(rx, h, re.I)]
    f['canonical'] = m(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\'](.*?)["\']')
    f['og_image'] = bool(re.search(r'og:image', h))
    n = None
    for sm in ['/sitemap.xml', '/sitemap_index.xml', '/wp-sitemap.xml']:
        try:
            x = get('https://' + s + sm); n = len(re.findall(r'<loc>', x)); f['sitemap'] = sm + ' (' + str(n) + ' loc)'; break
        except Exception: pass
    out['sitios'][s] = f
    print('\n###', s, f['plataforma'], f.get('sitemap'))
    print(' title:', f['title']); print(' desc:', (f['description'] or '')[:170]); print(' h1:', f['h1'][:4]); print(' h2:', f['h2'][:8]); print(' schema:', f['schema'], 'canonical:', f['canonical'])
json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'competencia-tecnica.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
