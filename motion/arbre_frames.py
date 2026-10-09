"""Background plate of the sketch « Je suis devant le gros arbre ! » (9:16, 24 fps, 1080x1920) in assets/arf/,
from the Flow clips in clips_arbre/. Split-screen and freeze frames included. Run from motion/: python3 arbre_frames.py"""
import os, subprocess, numpy as np, cv2
FF = os.environ.get('FFMPEG', 'ffmpeg'); FPS = 24; W, H = 1080, 1920
# (output start, output end, clip, clip in)  — freeze when clip in is negative: -(time to hold)
EDL = [(0.00, 3.00, 'ar1', 1.5), (3.00, 6.20, 'ar2', 3.1), (6.20, 8.90, 'ar3', 2.2), (8.90, 11.50, 'ar4', 1.4),
       (11.50, 14.10, 'ar5', 3.85), (14.10, 15.85, 'ar4', 4.0), (28.30, 32.90, 'ar6', 2.3)]
SPLIT = (15.85, 17.25, ('ar5', 6.6), ('ar4', 6.3))       # client on top, shopkeeper below
FREEZE = [(17.25, 20.50, 'split'), (32.90, 36.20, ('ar6', 6.85))]
def frames(clip, a, n):
    p = subprocess.Popen([FF, '-v', 'error', '-ss', f'{a:.3f}', '-i', f'clips_arbre/{clip}.mp4', '-frames:v', str(n), '-vf',
                          f'scale={W}:{H}:flags=lanczos,unsharp=5:5:0.5', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    last = None
    for _ in range(n):
        b = p.stdout.read(W * H * 3)
        if len(b) == W * H * 3: last = np.frombuffer(b, np.uint8).reshape(H, W, 3)
        yield last
    p.wait()
def save(n, f): cv2.imwrite(f'assets/arf/f{n:04d}.jpg', cv2.cvtColor(f, cv2.COLOR_RGB2BGR), [cv2.IMWRITE_JPEG_QUALITY, 92])
def split(top, bot):
    out = np.empty_like(top); out[:956] = top[180:1136]; out[964:] = bot[180:1136]; out[956:964] = (255, 107, 0); return out
os.makedirs('assets/arf', exist_ok=True)
for s, e, clip, a in EDL:
    n0, n1 = round(s * FPS), round(e * FPS)
    for i, f in enumerate(frames(clip, a, n1 - n0)): save(n0 + i, f)
    print(clip, n0, n1, flush=True)
s, e, (c1, a1), (c2, a2) = SPLIT; n0, n1 = round(s * FPS), round(e * FPS); last = None
for i, (ft, fb) in enumerate(zip(frames(c1, a1, n1 - n0), frames(c2, a2, n1 - n0))): last = split(ft, fb); save(n0 + i, last)
for s, e, src in FREEZE:
    f = last if src == 'split' else next(frames(src[0], src[1], 1))
    for n in range(round(s * FPS), round(e * FPS)): save(n, f)
print('done')
