"""Background plate of coming-soon concept 6 « Ils ne savent pas encore » (9:16, 24 fps, 1080x1920), re-cut from
the concept 2 clips: one JPEG per output frame in assets/cs6f/ for the three hassles, plus assets/cs6f/triptych.jpg,
the three faces frozen before their phones light up. Run from motion/:  python3 cs6_frames.py"""
import os, subprocess, numpy as np, cv2
FF = os.environ.get('FFMPEG', 'ffmpeg'); FPS = 24; W, H = 1080, 1920
# output start, clip, in, out
EDL = [(0.00, 'cs2_p1', 1.00, 4.60), (3.60, 'cs2_p2', 0.30, 3.90), (7.20, 'cs2_p3', 0.50, 4.30)]
TRIPTYCH = [('cs2_p4', 0.30, 530), ('cs2_p5', 0.30, 545), ('cs2_p6', 0.30, 535)]   # clip, time, face x
def frames(clip, a, n):
    p = subprocess.Popen([FF, '-v', 'error', '-ss', f'{a:.3f}', '-i', f'clips_cs/{clip}.mp4', '-frames:v', str(n), '-vf',
                          f'scale={W}:{H}:flags=lanczos', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'], stdout=subprocess.PIPE)
    last = None
    for _ in range(n):
        b = p.stdout.read(W * H * 3)
        if len(b) == W * H * 3: last = np.frombuffer(b, np.uint8).reshape(H, W, 3)
        yield last
    p.wait()
os.makedirs('assets/cs6f', exist_ok=True)
for s, clip, a, b in EDL:
    n0, n1 = round(s * FPS), round((s + b - a) * FPS)
    for i, f in enumerate(frames(clip, a, n1 - n0)):
        cv2.imwrite(f'assets/cs6f/f{n0 + i:04d}.jpg', f, [cv2.IMWRITE_JPEG_QUALITY, 92])
    print(clip, n0, n1, flush=True)
out = np.zeros((H, W, 3), np.uint8); cw = W // 3
for k, (clip, a, fx) in enumerate(TRIPTYCH):
    f = next(frames(clip, a, 1)); x0 = int(np.clip(fx - cw // 2, 0, W - cw)); out[:, k * cw:(k + 1) * cw] = f[:, x0:x0 + cw]
cv2.imwrite('assets/cs6f/triptych.jpg', out, [cv2.IMWRITE_JPEG_QUALITY, 94])
print('triptych ok')
