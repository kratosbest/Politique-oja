"""Background plate of the Benin tour film: one JPEG per output frame (24 fps, 1920x1080) in assets/bjf/
for the time ranges covered by the Flow clips (clips_bj/), green phone screens replaced by OJA screens.
The map / graphic scenes in between are drawn by benin.html. Run from motion/:  python3 bj_frames.py"""
import os, subprocess, numpy as np, cv2
from cot_phone import replace
FF = os.environ.get('FFMPEG', 'ffmpeg'); FPS = 24; W, H = 1920, 1080
# output start, clip, in, out
EDL = [(0.0, 'bj1', 0.0, 7.6), (7.6, 'bj2', 0.4, 5.8), (14.6, 'bj3', 2.0, 8.0), (28.2, 'bj5', 1.0, 7.6), (36.4, 'bj6', 0.8, 7.4)]
rgba = lambda p: cv2.cvtColor(cv2.imread(p, cv2.IMREAD_UNCHANGED), cv2.COLOR_BGRA2RGBA)
rb = cv2.cvtColor(cv2.imread('assets/ride.jpg'), cv2.COLOR_BGR2RGB); RIDE = np.dstack([rb, np.full(rb.shape[:2], 255, np.uint8)])
UI = {'bj3': ((2.0, 4.8), RIDE), 'bj5': ((2.6, 6.6), rgba('assets/bj/ui_search.png')), 'bj6': ((1.6, 8.0), rgba('assets/bj/ui_artisan.png'))}
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
for s, clip, a, b in EDL:
    n0, n1 = round(s * FPS), round((s + b - a) * FPS); prev = None
    for i, f in enumerate(frames(clip, a, n1 - n0)):
        st = a + i / FPS
        if clip in UI and UI[clip][0][0] <= st <= UI[clip][0][1]: f, prev = replace(f, UI[clip][1], prev)
        cv2.imwrite(f'assets/bjf/f{n0 + i:04d}.jpg', cv2.cvtColor(f, cv2.COLOR_RGB2BGR), [cv2.IMWRITE_JPEG_QUALITY, 92])
    print(clip, n0, n1, flush=True)
