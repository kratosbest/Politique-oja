"""Background plate of the coming-soon trailer (concept 1): one JPEG per output frame (24 fps, 1920x1080)
in assets/csf/, cut from the Google Flow clips in clips_cs/. The letterbox, captions, light trails and the
end card are drawn by comingsoon_trailer.html. Run from motion/:  python3 cs1_frames.py"""
import os, subprocess, numpy as np, cv2
FF = os.environ.get('FFMPEG', 'ffmpeg'); FPS = 24; W, H = 1920, 1080
# output start, clip, in, out
EDL = [(0.00, 'cs1_p1', 0.50, 3.70), (3.20, 'cs1_p2', 0.20, 2.00), (5.00, 'cs1_p3', 3.20, 4.80),
       (6.60, 'cs1_p4a', 3.80, 5.20), (8.00, 'cs1_p4b', 5.20, 6.60), (9.40, 'cs1_p4c', 4.60, 6.00),
       (10.80, 'cs1_p5', 2.60, 5.80), (14.00, 'cs1_p6', 3.00, 6.00)]
def unbrand(f):
    # cs1_p4b: Veo printed a made-up brand ("MUBUO") on the front of the helmet -> inpaint it
    y0, y1, x0, x1 = 0, 100, 820, 1100
    roi = f[y0:y1, x0:x1]; g = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    m = cv2.dilate((g > 70).astype(np.uint8) * 255, np.ones((9, 9), np.uint8))
    fix = cv2.GaussianBlur(cv2.inpaint(np.ascontiguousarray(roi), m, 9, cv2.INPAINT_TELEA), (0, 0), 2.5)
    w = np.zeros(roi.shape[:2], np.float32); w[0:-12, 12:-12] = 1; w = cv2.GaussianBlur(w, (0, 0), 6)[..., None]
    out = f.copy(); out[y0:y1, x0:x1] = (fix * w + roi * (1 - w)).astype(np.uint8)
    return out
def frames(clip, a, n):
    p = subprocess.Popen([FF, '-v', 'error', '-ss', f'{a:.3f}', '-i', f'clips_cs/{clip}.mp4', '-frames:v', str(n), '-vf',
                          f'scale={W}:{H}:flags=lanczos,unsharp=5:5:0.5', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'], stdout=subprocess.PIPE)
    last = None
    for _ in range(n):
        b = p.stdout.read(W * H * 3)
        if len(b) == W * H * 3: last = np.frombuffer(b, np.uint8).reshape(H, W, 3)
        yield last
    p.wait()
os.makedirs('assets/csf', exist_ok=True)
ONLY = os.environ.get('ONLY')  # e.g. ONLY=cs1_p5
for s, clip, a, b in EDL:
    if ONLY and clip not in ONLY.split(','): continue
    n0, n1 = round(s * FPS), round((s + b - a) * FPS)
    for i, f in enumerate(frames(clip, a, n1 - n0)):
        if clip == 'cs1_p4b': f = unbrand(f)
        cv2.imwrite(f'assets/csf/f{n0 + i:04d}.jpg', f, [cv2.IMWRITE_JPEG_QUALITY, 92])
    print(clip, n0, n1, flush=True)
