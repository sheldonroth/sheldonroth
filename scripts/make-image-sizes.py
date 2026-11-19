#!/usr/bin/env python3
"""Pre-size the web JPEGs so pages never pull a 3840px file where a small one will do.

For every public/works/<slug>.jpg this writes public/works/w<W>/<slug>.jpg for W in WIDTHS
(only when the original is wider than W). Pixels are resampled in the file's own sRGB encoding
with Lanczos, the embedded sRGB ICC profile is kept, and EXIF/GPS are not written.
src/lib/image-loader.ts maps next/image requests onto these files.

Run after adding or replacing any work:  python3 scripts/make-image-sizes.py  [slug ...]
"""
import os, sys
from PIL import Image

WIDTHS = [640, 1200, 2048]  # keep in sync with src/lib/image-loader.ts
QUALITY = 82
ROOT = os.path.join(os.path.dirname(__file__), '..', 'public', 'works')

def build(slug):
    src = os.path.join(ROOT, f'{slug}.jpg')
    im = Image.open(src); im.load()
    icc = im.info.get('icc_profile')
    im = im.convert('RGB')
    for w in WIDTHS:
        out_dir = os.path.join(ROOT, f'w{w}'); os.makedirs(out_dir, exist_ok=True)
        out = os.path.join(out_dir, f'{slug}.jpg')
        if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src):
            continue
        r = im if im.width <= w else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(out, 'JPEG', quality=QUALITY, subsampling=0, optimize=True, progressive=True, icc_profile=icc)

slugs = sys.argv[1:] or sorted(f[:-4] for f in os.listdir(ROOT) if f.endswith('.jpg'))
for s in slugs:
    build(s)
print(f'sized {len(slugs)} works into w{WIDTHS}')
