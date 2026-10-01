"""Builds the background plate of the Cotonou film: one JPEG per output frame (24 fps, 1920x1080)
in assets/cot/, from the Flow clips in clips_cot/, with the green phone screens replaced by OJA screens.
Run from motion/:  python3 cot_frames.py   (then render cotonou.html)"""
import os, subprocess, numpy as np, cv2
from cot_phone import replace
FF = os.environ.get('FFMPEG', 'ffmpeg'); FPS = 24; W, H = 1920, 1080
# output start, clip, in, out   (freeze = in == out, held until the next segment)
EDL = [(0.00, 'cot1', 0.00, 8.04), (8.04, 'cot2', 1.00, 7.20), (14.24, 'cot3', 1.00, 8.04), (21.28, 'cot4', 0.60, 7.80),
       (28.48, 'cot5', 1.50, 8.04), (35.02, 'cot6', 1.50, 4.30), (37.82, 'cot6', 4.25, 4.25), (41.32, 'cot7', 0.40, 3.40),
       (44.32, 'cot7', 3.35, 3.35), (47.56, 'cot7', 4.00, 5.40), (48.96, 'cot8', 0.00, 8.04), (57.00, 'cot8', 7.90, 7.90)]
END = 60.5
rgba = lambda p: cv2.cvtColor(cv2.imread(p, cv2.IMREAD_UNCHANGED), cv2.COLOR_BGRA2RGBA)
RS = [rgba(f'assets/cot_ui/rs{i}.png') for i in range(8)]
rb = cv2.cvtColor(cv2.imread('assets/ride.jpg'), cv2.COLOR_BGR2RGB); RIDE = np.dstack([rb, np.full(rb.shape[:2], 255, np.uint8)])
def ui_for(clip, st):
    if clip == 'cot2' and st > 3.0:
        if st < 5.2: return RS[0]
        if st < 5.8: return RS[min(6, int((st - 5.2) / .6 * 7))]
        return RS[6] if st < 6.1 else RS[7]
    if clip == 'cot4' and st > 3.5: return RIDE
    return None
def frames(clip, a, n):
    p = subprocess.Popen([FF, '-v', 'error', '-ss', f'{a:.3f}', '-i', f'clips_cot/{clip}.mp4', '-frames:v', str(n), '-vf',
                          f'scale={W}:{H}:flags=lanczos,unsharp=5:5:0.6', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    last = None
    for _ in range(n):
        b = p.stdout.read(W * H * 3)
        if len(b) == W * H * 3: last = np.frombuffer(b, np.uint8).reshape(H, W, 3)
        yield last
    p.wait()
os.makedirs('assets/cot', exist_ok=True)
for k, (s, clip, a, b) in enumerate(EDL):
    e = EDL[k + 1][0] if k + 1 < len(EDL) else END
    n0, n1 = round(s * FPS), round(e * FPS); prev = None
    if a == b:
        f = next(frames(clip, a, 1))
        for n in range(n0, n1): cv2.imwrite(f'assets/cot/f{n:04d}.jpg', cv2.cvtColor(f, cv2.COLOR_RGB2BGR), [cv2.IMWRITE_JPEG_QUALITY, 92])
        continue
    for i, f in enumerate(frames(clip, a, n1 - n0)):
        st = a + i / FPS; u = ui_for(clip, st)
        if u is not None: f, prev = replace(f, u, prev)
        cv2.imwrite(f'assets/cot/f{n0 + i:04d}.jpg', cv2.cvtColor(f, cv2.COLOR_RGB2BGR), [cv2.IMWRITE_JPEG_QUALITY, 92])
    print(clip, n0, n1, flush=True)
