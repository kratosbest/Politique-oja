"""Talking-head ads (oja_talk.html): a matte of the speaker on every frame (work/talk_<name>/fr/fNNNN.jpg →
work/talk_<name>/mt/fNNNN.png, half size, white with the matte as alpha), so words can pass behind his head. The phone did
not move and the wall is a warm cream: a pixel is wall when it is both light and yellow ((R+G)/2 − B high), which keeps
his lit face (cooler, pinker) and his dark clothes; then holes filled, the largest piece kept, edges feathered.
Inside `zone` only (x range in half-size pixels above the shoulders, everything below `shoulders`).
  <python with numpy, scipy, pillow> src/tk_matte.py <name>"""
import os, sys, glob, json, numpy as np
from PIL import Image
from scipy import ndimage as ndi
name = sys.argv[1]; cfg = json.load(open(f'src/talks/{name}.json')).get('matte', {})
x0, x1, sh = cfg.get('zone', [70, 470, 540]); yel, lum = cfg.get('yellow', 26), cfg.get('light', 100)
src = sorted(glob.glob(f'work/talk_{name}/fr/f*.jpg')); os.makedirs(f'work/talk_{name}/mt', exist_ok=True)
W, H = 540, 960
yy, xx = np.mgrid[0:H, 0:W]
zone = ((xx > x0) & (xx < x1)) | (yy > sh)
for f in src:
    a = np.asarray(Image.open(f).convert('RGB').resize((W, H), Image.BILINEAR)).astype(np.float32)
    L = a.mean(axis=2); Y = (a[..., 0] + a[..., 1]) / 2 - a[..., 2]
    bg = np.clip((Y - yel) / 16, 0, 1) * np.clip((L - lum) / 30, 0, 1)
    m = (1 - bg) * zone
    core = ndi.binary_fill_holes(ndi.binary_closing(m > .5, iterations=4))
    core = ndi.binary_opening(core, iterations=3)
    lab, n = ndi.label(core)
    if n > 1: core = lab == 1 + int(np.argmax(ndi.sum(core, lab, range(1, n + 1))))
    core = ndi.binary_fill_holes(core)
    m = np.maximum(m * ndi.binary_dilation(core, iterations=2), core.astype(np.float32))
    al = (np.clip(ndi.gaussian_filter(m, 1.2), 0, 1) * 255).astype(np.uint8)
    Image.fromarray(np.dstack([np.full_like(al, 255)] * 3 + [al]), 'RGBA').save(f.replace('/fr/', '/mt/').replace('.jpg', '.png'))
print(name, len(src), 'mattes')
