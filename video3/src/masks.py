"""Person masks for video 3 (only the frames where a title sits behind Derrick, see montage.html BEHIND): work/frames/fNNNN.jpg -> work/frames/mNNNN.png (white, alpha = Derrick), 540 x 960.
usage: python masks.py work/frames START END   (frame numbers, 1-based, END included). rembg u2net_human_seg.
Temporal smoothing needs the previous frame, so each chunk starts 3 frames early (those are rewritten by the previous chunk)."""
import pathlib, sys
import numpy as np
from PIL import Image
from rembg import new_session, remove
folder, a, b = pathlib.Path(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3])
sess = new_session('u2net_human_seg'); prev = None
for n in range(max(1, a - 3), b + 1):
    f = folder / f'f{n:04d}.jpg'
    if not f.exists(): break
    im = Image.open(f).convert('RGB').resize((540, 960), Image.LANCZOS)
    m = np.asarray(remove(im, session=sess, only_mask=True, post_process_mask=True), dtype=np.float32) / 255
    m = np.clip((m - .22) / .5, 0, 1)
    # smooth with the previous frame, but never across a cut (the two shots would blend into a ghost)
    if prev is not None and ((m > .5) & (prev > .5)).sum() / max(1, ((m > .5) | (prev > .5)).sum()) > .93: m = .7 * m + .3 * prev
    prev = m
    if n >= a:
        out = np.zeros((960, 540, 4), np.uint8); out[..., :3] = 255; out[..., 3] = np.clip(m * 255, 0, 255).astype(np.uint8)
        Image.fromarray(out, 'RGBA').save(folder / f'm{n:04d}.png', optimize=True)
print('ok', a, b)
