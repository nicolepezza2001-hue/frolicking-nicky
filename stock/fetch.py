import json, re, requests, io, os
from PIL import Image, ImageOps
H = {'User-Agent': 'FrolickingNicky/1.0 (https://frolickingnicky.com)'}
OK = re.compile(r'^(CC0|Public domain|PD|CC BY(-SA)? [0-9.]+)', re.I)
qs = json.load(open('stock/queries.json'))
out = {}
os.makedirs('stock/cand', exist_ok=True)
for slug, q in qs.items():
    r = requests.get('https://commons.wikimedia.org/w/api.php', headers=H, params={
        'action': 'query', 'format': 'json', 'generator': 'search', 'gsrnamespace': 6,
        'gsrsearch': q + ' filetype:bitmap', 'gsrlimit': 20, 'prop': 'imageinfo',
        'iiprop': 'url|size|extmetadata', 'iiurlwidth': 1400}).json()
    pages = sorted(r.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 99))
    n = 0
    for p in pages:
        ii = p['imageinfo'][0]; md = ii.get('extmetadata', {})
        lic = md.get('LicenseShortName', {}).get('value', '')
        if not OK.match(lic) or ii['width'] < 1200: continue
        try:
            img = Image.open(io.BytesIO(requests.get(ii['thumburl'], headers=H, timeout=60).content))
            img = ImageOps.exif_transpose(img).convert('RGB'); img.thumbnail((1400, 1400))
        except Exception as e:
            print('skip', p['title'], e); continue
        fn = f'stock/cand/{slug}-{n}.jpg'; img.save(fn, quality=76, optimize=True)
        artist = re.sub('<[^>]+>', '', md.get('Artist', {}).get('value', '')).strip()
        out[f'{slug}-{n}'] = {'title': p['title'], 'page': ii['descriptionurl'], 'license': lic, 'artist': artist, 'size': img.size}
        n += 1
        if n == 4: break
    print(slug, n)
json.dump(out, open('stock/credits.json', 'w'), indent=1, ensure_ascii=False)
