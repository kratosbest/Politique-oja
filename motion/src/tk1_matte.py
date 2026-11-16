"""Talking-head ad « Ton enseigne »: a matte of Derrick on every frame (work/talk1/fr/fNNNN.jpg → work/talk1/mt/fNNNN.png,
half size), so words can pass behind him and the wall can be graded apart. The phone did not move and the wall is light
while he wears dark clothes, so a soft brightness key inside the zone where he sits is enough (no model): dark = him,
holes (the white cords of the hoodie, highlights) filled, edges feathered.
  <python with numpy, scipy, pillow> src/tk1_matte.py"""
import os, glob, numpy as np
from PIL import Image
from scipy import ndimage as ndi
src = sorted(glob.glob('work/talk1/fr/f*.jpg')); os.makedirs('work/talk1/mt', exist_ok=True)
W, H = 540, 960
yy, xx = np.mgrid[0:H, 0:W]
zone = (xx > 70) & (xx < 405)                    # him, not the coats hanging on the right
zone |= yy > 670                                 # the bottom (hands, table) is all his
for f in src:
    a = np.asarray(Image.open(f).convert('RGB').resize((W, H), Image.BILINEAR)).astype(np.float32)
    L = a.mean(axis=2)
    m = np.clip((138 - L) / 30, 0, 1) * zone
    core = ndi.binary_fill_holes(ndi.binary_closing(m > .5, iterations=4))
    core = ndi.binary_opening(core, iterations=3)       # drops thin dark lines (the door frame)
    lab, n = ndi.label(core)
    if n > 1: core = lab == 1 + int(np.argmax(ndi.sum(core, lab, range(1, n + 1))))
    m = np.maximum(m * ndi.binary_dilation(core, iterations=2), core.astype(np.float32))
    m = ndi.gaussian_filter(m, 1.2)
    al = (np.clip(m, 0, 1) * 255).astype(np.uint8)     # stored as the alpha of a white image (canvas « destination-in » reads alpha)
    Image.fromarray(np.dstack([np.full_like(al, 255)] * 3 + [al]), 'RGBA').save(f.replace('/fr/', '/mt/').replace('.jpg', '.png'))
print(len(src), 'mattes')
