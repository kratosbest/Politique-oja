"""Background plate of coming-soon concept 2 « Et si tout était plus simple ? » (9:16, 24 fps, 1080x1920):
one JPEG per output frame in assets/cs2f/, cut from the Google Flow clips in clips_cs/. From 20.4 s the three
close-ups play side by side (triptych). Captions, orange glow, silhouette and end card are drawn by
comingsoon_simple.html. Run from motion/:  python3 cs2_frames.py"""
import os, subprocess, numpy as np, cv2
FF = os.environ.get('FFMPEG', 'ffmpeg'); FPS = 24; W, H = 1080, 1920
# output start, clip, in, out
EDL = [(0.00, 'cs2_p1', 1.00, 7.00), (6.00, 'cs2_p2', 2.60, 7.90), (11.30, 'cs2_p3', 0.80, 6.30),
       (16.80, 'cs2_p4', 2.00, 3.20), (18.00, 'cs2_p5', 2.20, 3.40), (19.20, 'cs2_p6', 2.20, 3.40)]
TRIPTYCH = (20.40, 23.40, 4.60, [('cs2_p4', 530), ('cs2_p5', 545), ('cs2_p6', 535)])   # start, end, clip in, (clip, face x)
def frames(clip, a, n):
    p = subprocess.Popen([FF, '-v', 'error', '-ss', f'{a:.3f}', '-i', f'clips_cs/{clip}.mp4', '-frames:v', str(n), '-vf',
                          f'scale={W}:{H}:flags=lanczos', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'], stdout=subprocess.PIPE)
    last = None
    for _ in range(n):
        b = p.stdout.read(W * H * 3)
        if len(b) == W * H * 3: last = np.frombuffer(b, np.uint8).reshape(H, W, 3)
        yield last
    p.wait()
os.makedirs('assets/cs2f', exist_ok=True)
save = lambda i, f: cv2.imwrite(f'assets/cs2f/f{i:04d}.jpg', f, [cv2.IMWRITE_JPEG_QUALITY, 92])
for s, clip, a, b in EDL:
    n0, n1 = round(s * FPS), round((s + b - a) * FPS)
    for i, f in enumerate(frames(clip, a, n1 - n0)): save(n0 + i, f)
    print(clip, n0, n1, flush=True)
s, e, a, cols = TRIPTYCH
n0, n1 = round(s * FPS), round(e * FPS); cw = W // 3
gens = [frames(c, a, n1 - n0) for c, _ in cols]
for i in range(n1 - n0):
    out = np.zeros((H, W, 3), np.uint8)
    for k, (g, (_, fx)) in enumerate(zip(gens, cols)):
        f = next(g); x0 = int(np.clip(fx - cw // 2, 0, W - cw)); out[:, k * cw:(k + 1) * cw] = f[:, x0:x0 + cw]
    save(n0 + i, out)
print('triptych', n0, n1)
