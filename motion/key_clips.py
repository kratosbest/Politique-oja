# Détoure les clips Flow (fond vert) en WebP avec alpha pour mascot.html.
# Usage (depuis motion/) : python3 key_clips.py   → crée assets/mc/c{1..6}_{001..192}.webp
import numpy as np, glob, os, subprocess
from PIL import Image
from scipy import ndimage
os.makedirs('assets/mc', exist_ok=True)
for c in range(1, 7):
    os.makedirs(f'_raw/c{c}', exist_ok=True)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'clips/c{c}.mp4', f'_raw/c{c}/%04d.png'], check=True)
    for f in sorted(glob.glob(f'_raw/c{c}/*.png')):
        a = np.array(Image.open(f).convert('RGB')).astype(np.int16); r, g, b = a[..., 0], a[..., 1], a[..., 2]
        al = np.clip(1 - ((g - np.maximum(r, b)) - 10) / 34, 0, 1)
        lab, n = ndimage.label(al > .5)
        if n:
            sz = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
            al = al * ndimage.binary_dilation(np.isin(lab, [i + 1 for i in range(n) if sz[i] > 1500]), iterations=3)
        g2 = np.minimum(g, np.maximum(r, b) + 6)
        out = np.dstack([r, g2, b, al * 255]).clip(0, 255).astype(np.uint8)
        k = int(os.path.basename(f)[:4])
        Image.fromarray(out, 'RGBA').crop((0, 0, 720, 1130)).resize((612, 960), Image.LANCZOS).save(f'assets/mc/c{c}_{k:03d}.webp', quality=86)
