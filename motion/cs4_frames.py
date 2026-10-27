"""Background plate of coming-soon concept 4 « OJA, c'est pour nous » (9:16, 24 fps, 1080x1920): one JPEG per
output frame in assets/cs4f/, cut from the Google Flow clips in clips_cs/. The zem's line is cut in two (Veo
added made-up words in the middle) and the second half is punched in to hide the jump cut. From 16.87 s the four
faces play in a 2x2 grid. Captions, labels, mascot reveal and end card are drawn by comingsoon_pournous.html.
Run from motion/:  python3 cs4_frames.py"""
import os, subprocess, numpy as np, cv2
FF = os.environ.get('FFMPEG', 'ffmpeg'); FPS = 24; W, H = 1080, 1920
# output start, clip, in, out, punch-in zoom
EDL = [(0.00, 'cs4_p1', 0.35, 2.12, 1.0), (1.77, 'cs4_p1', 4.35, 5.90, 1.12),
       (3.32, 'cs4_p2', 0.30, 3.50, 1.0), (6.52, 'cs4_p3', 0.40, 2.40, 1.0), (8.52, 'cs4_p4', 0.40, 2.95, 1.0),
       (11.07, 'cs4_p1', 6.20, 7.60, 1.0), (12.47, 'cs4_p2', 4.05, 5.75, 1.0), (14.17, 'cs4_p3', 5.85, 7.35, 1.0),
       (15.67, 'cs4_p4', 3.45, 4.65, 1.0)]
QUAD = (16.87, 18.60, [('cs4_p1', 6.25), ('cs4_p2', 5.60), ('cs4_p3', 6.20), ('cs4_p4', 5.00)])
def frames(clip, a, n):
    p = subprocess.Popen([FF, '-v', 'error', '-ss', f'{a:.3f}', '-i', f'clips_cs/{clip}.mp4', '-frames:v', str(n), '-vf',
                          f'scale={W}:{H}:flags=lanczos', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'], stdout=subprocess.PIPE)
    last = None
    for _ in range(n):
        b = p.stdout.read(W * H * 3)
        if len(b) == W * H * 3: last = np.frombuffer(b, np.uint8).reshape(H, W, 3)
        yield last
    p.wait()
def punch(f, z, cx=540, cy=700):
    if z == 1.0: return f
    M = np.float32([[z, 0, cx - z * cx], [0, z, cy - z * cy]])
    return cv2.warpAffine(f, M, (W, H), flags=cv2.INTER_LANCZOS4)
os.makedirs('assets/cs4f', exist_ok=True)
save = lambda i, f: cv2.imwrite(f'assets/cs4f/f{i:04d}.jpg', f, [cv2.IMWRITE_JPEG_QUALITY, 92])
for s, clip, a, b, z in EDL:
    n0, n1 = round(s * FPS), round((s + b - a) * FPS)
    for i, f in enumerate(frames(clip, a, n1 - n0)): save(n0 + i, punch(f, z))
    print(clip, a, n0, n1, flush=True)
s, e, cells = QUAD
n0, n1 = round(s * FPS), round(e * FPS)
gens = [frames(c, a, n1 - n0) for c, a in cells]
for i in range(n1 - n0):
    out = np.zeros((H, W, 3), np.uint8)
    for k, g in enumerate(gens):
        f = cv2.resize(next(g), (W // 2, H // 2), interpolation=cv2.INTER_AREA)
        y, x = (k // 2) * (H // 2), (k % 2) * (W // 2); out[y:y + H // 2, x:x + W // 2] = f
    save(n0 + i, out)
print('quad', n0, n1)
