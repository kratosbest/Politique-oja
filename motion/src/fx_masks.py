"""Person masks for the effects reel: one RGBA PNG per frame (white, alpha = person), 540 x 960.

usage: python fx_masks.py assets/fxf/tranquille [model]
Reads f001.jpg… in the folder and writes m001.png… beside them. Model: u2net_human_seg (rembg).
A light temporal smoothing (70 % current frame, 30 % previous) removes most of the flicker between frames.
"""
import pathlib, sys
import numpy as np
from PIL import Image
from rembg import new_session, remove

folder = pathlib.Path(sys.argv[1])
sess = new_session(sys.argv[2] if len(sys.argv) > 2 else 'u2net_human_seg')
prev = None
for f in sorted(folder.glob('f*.jpg')):
    im = Image.open(f).convert('RGB').resize((540, 960), Image.LANCZOS)
    a = np.asarray(remove(im, session=sess, only_mask=True, post_process_mask=True), dtype=np.float32) / 255
    a = np.clip((a - .22) / .5, 0, 1)   # firmer edges: no see-through sleeves
    if prev is not None:
        a = .7 * a + .3 * prev
    prev = a
    out = np.zeros((960, 540, 4), np.uint8); out[..., :3] = 255; out[..., 3] = np.clip(a * 255, 0, 255).astype(np.uint8)
    Image.fromarray(out, 'RGBA').save(folder / ('m' + f.stem[1:] + '.png'), optimize=True)
print('ok', folder)
