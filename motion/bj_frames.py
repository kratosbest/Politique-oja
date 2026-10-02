"""Background plate of the Benin tour film: one JPEG per output frame (24 fps, 1920x1080) in assets/bjf/
for the time ranges covered by the Flow clips (clips_bj/), green phone screens replaced by OJA screens.
The map / graphic scenes in between are drawn by benin.html. Run from motion/:  python3 bj_frames.py"""
import os, subprocess, numpy as np, cv2
from cot_phone import replace
FF = os.environ.get('FFMPEG', 'ffmpeg'); FPS = 24; W, H = 1920, 1080
# output start, clip, in, out
EDL = [(0.0, 'bj1', 0.0, 7.6), (7.6, 'bj2', 0.4, 5.8), (14.6, 'bj3', 2.0, 8.0), (22.2, 'bj4', 0.55, 3.5), (25.15, 'bj4', 4.55, 6.0), (28.2, 'bj5', 1.0, 7.6), (36.4, 'bj6', 0.8, 7.4)]
rgba = lambda p: cv2.cvtColor(cv2.imread(p, cv2.IMREAD_UNCHANGED), cv2.COLOR_BGRA2RGBA)
rb = cv2.cvtColor(cv2.imread('assets/ride.jpg'), cv2.COLOR_BGR2RGB); RIDE = np.dstack([rb, np.full(rb.shape[:2], 255, np.uint8)])
UI = {'bj4': ((1.4, 4.5), rgba('assets/cot_ui/rs0.png')), 'bj3': ((2.0, 4.8), RIDE), 'bj5': ((2.6, 6.6), rgba('assets/bj/ui_search.png')), 'bj6': ((1.6, 8.0), rgba('assets/bj/ui_artisan.png'))}
def unburn(f):
    # bj4: Veo burned a small "Abomey-Calavi / Benin" caption in the top-left corner -> inpaint + soft blur
    y0, y1, x0, x1 = 60, 185, 60, 450
    roi = f[y0:y1, x0:x1]; r = roi.astype(int); mn = r.min(2); sat = r.max(2) - r.min(2)
    m = cv2.dilate(((mn > 200) & (sat < 34)).astype(np.uint8) * 255, np.ones((9, 9), np.uint8))
    fix = cv2.GaussianBlur(cv2.inpaint(np.ascontiguousarray(roi), m, 11, cv2.INPAINT_TELEA), (0, 0), 2.2)
    w = np.zeros(roi.shape[:2], np.float32); w[10:-10, 10:-10] = 1; w = cv2.GaussianBlur(w, (0, 0), 6)[..., None]
    out = f.copy(); out[y0:y1, x0:x1] = (fix * w + roi * (1 - w)).astype(np.uint8)
    return out
def frames(clip, a, n):
    p = subprocess.Popen([FF, '-v', 'error', '-ss', f'{a:.3f}', '-i', f'clips_bj/{clip}.mp4', '-frames:v', str(n), '-vf',
                          f'scale={W}:{H}:flags=lanczos,unsharp=5:5:0.6', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    last = None
    for _ in range(n):
        b = p.stdout.read(W * H * 3)
        if len(b) == W * H * 3: last = np.frombuffer(b, np.uint8).reshape(H, W, 3)
        yield last
    p.wait()
os.makedirs('assets/bjf', exist_ok=True)
ONLY = os.environ.get('ONLY')  # e.g. ONLY=bj4
for s, clip, a, b in EDL:
    if ONLY and clip not in ONLY.split(','): continue
    n0, n1 = round(s * FPS), round((s + b - a) * FPS); prev = None
    for i, f in enumerate(frames(clip, a, n1 - n0)):
        st = a + i / FPS
        if clip == 'bj4': f = unburn(f)
        if clip in UI and UI[clip][0][0] <= st <= UI[clip][0][1]: f, prev = replace(f, UI[clip][1], prev)
        cv2.imwrite(f'assets/bjf/f{n0 + i:04d}.jpg', cv2.cvtColor(f, cv2.COLOR_RGB2BGR), [cv2.IMWRITE_JPEG_QUALITY, 92])
    print(clip, n0, n1, flush=True)
