"""Assets of the OJA Market launch spot (oja_market_pub.html), written to assets/mkp/:
- table.jpg: procedural dark wooden table in a dim room (1080x1920);
- plat_logo.png: OJA logo printed in white ink on the right-hand face of assets/cs/obj_plat.png (same size, overlay);
- food_poulet.jpg: menu photo of the dish.
Run from motion/:  python3 mkp_assets.py"""
import numpy as np, cv2
W, H = 1080, 1920
rng = np.random.default_rng(7)
# flat plank texture (top view), planks run along y (away from camera)
TW, TH = 2400, 3000
y, x = np.mgrid[0:TH, 0:TW].astype(np.float32)
pw = 300
plank = (x // pw).astype(int)
tex = np.zeros((TH, TW, 3), np.float32)
def fbm(shape, scale, oct=4, seed=0):
    r = np.random.default_rng(seed); out = np.zeros(shape, np.float32); amp = 1
    for o in range(oct):
        s = max(2, int(shape[0] / scale * 2 ** o)), max(2, int(shape[1] / scale * 2 ** o))
        n = r.random(s).astype(np.float32)
        out += amp * cv2.resize(n, (shape[1], shape[0]), interpolation=cv2.INTER_CUBIC); amp *= .5
    return out
warp = fbm((TH, TW), 600, 4, 1) * 60
def streaks(seed, sx, sy):
    r = np.random.default_rng(seed); n = r.random((max(2, TH // sy), max(2, TW // sx))).astype(np.float32)
    return cv2.resize(n, (TW, TH), interpolation=cv2.INTER_CUBIC)
st = 0.55 * streaks(11, 3, 260) + 0.3 * streaks(12, 9, 600) + 0.15 * streaks(13, 1, 90)
lw = fbm((TH, TW), 900, 3, 4) * 140
for k in range(TW // pw + 1):
    m = plank == k
    ph = rng.random() * 50; f = .035 + rng.random() * .03
    tone = .7 + rng.random() * .45
    rings = np.sin((x + lw * (0.6 + k % 3 * .4) + ph) * f) * .5 + .5
    g = np.clip(0.55 * st + 0.45 * rings ** 4, 0, 1)
    base = np.array([0.21, 0.115, 0.06]) * tone
    dark = np.array([0.075, 0.038, 0.02]) * tone
    col = base[None, None] * (1 - g[..., None]) + dark[None, None] * g[..., None]
    tex[m] = col[m]
fine = fbm((TH, TW), 40, 3, 3)
tex *= (0.85 + 0.25 * fine[..., None])
seam = (x % pw) < 5
tex[seam] *= 0.25
# perspective: table top seen from a low angle
src = np.float32([[0, 0], [TW, 0], [TW, TH], [0, TH]])
hz = 760  # horizon-ish line where the table ends
dst = np.float32([[W * .5 - 900, hz], [W * .5 + 900, hz], [W * .5 + 3400, H + 900], [W * .5 - 3400, H + 900]])
M = cv2.getPerspectiveTransform(src, dst)
top = cv2.warpPerspective(tex, M, (W, H), flags=cv2.INTER_AREA)
mask = cv2.warpPerspective(np.ones((TH, TW), np.float32), M, (W, H))
# depth blur: far part blurred more
blur1 = cv2.GaussianBlur(top, (0, 0), 6)
blur2 = cv2.GaussianBlur(top, (0, 0), 14)
yy = np.mgrid[0:H, 0:W][0].astype(np.float32)
d = np.clip((yy - hz) / (1250 - hz), 0, 1)[..., None]   # 0 far, 1 at subject line
dn = np.clip((yy - 1500) / 420, 0, 1)[..., None]          # near foreground blur
top = blur2 * (1 - d) + top * d
top = top * (1 - dn) + blur1 * dn
# room behind: dark wall with soft window light, very blurred
wall = np.zeros((H, W, 3), np.float32)
wall[:] = np.array([0.045, 0.035, 0.03])
cx, cy = W * .72, 380
rr = np.sqrt(((np.mgrid[0:H, 0:W][1] - cx) / 420) ** 2 + ((yy - cy) / 520) ** 2)
wall += np.clip(1 - rr, 0, 1)[..., None] ** 2 * np.array([0.16, 0.12, 0.09])
# a door frame / panel line on the wall (soft)
panel = np.zeros((H, W), np.float32); cv2.rectangle(panel, (140, 120), (520, 760), 1, 10); panel = cv2.GaussianBlur(panel, (0, 0), 9)
wall += panel[..., None] * np.array([0.05, 0.04, 0.03])
img = wall * (1 - mask[..., None]) + top * mask[..., None]
# table front edge glow line at horizon
# warm light pool on the table centre
xx = np.mgrid[0:H, 0:W][1].astype(np.float32)
pool = np.exp(-(((xx - W / 2) / 520) ** 2 + ((yy - 1180) / 300) ** 2))
img *= (0.55 + 1.9 * pool[..., None] * np.array([1.0, .85, .7]))
# vignette
v = np.sqrt(((xx - W / 2) / (W * .8)) ** 2 + ((yy - H * .55) / (H * .62)) ** 2)
img *= np.clip(1.25 - v, 0.15, 1)[..., None]
img = np.clip(img, 0, 1) ** (1 / 1.15)
noise = rng.normal(0, .008, img.shape)
out = (np.clip(img + noise, 0, 1) * 255).astype(np.uint8)
cv2.imwrite('assets/mkp/table.jpg', cv2.cvtColor(out, cv2.COLOR_RGB2BGR), [cv2.IMWRITE_JPEG_QUALITY, 92])


# ---------- OJA logo printed on the box ----------
from PIL import Image
lg = np.array(Image.open('assets/mk_logo.png').convert('RGBA')).astype(np.float32)
ink = lg[..., 3] / 255 * np.clip((lg[..., 0] - lg[..., 2] - 60) / 80, 0, 1)   # orange -> white ink, black -> hole
ys, xs = np.where(ink > .05); ink = ink[ys.min():ys.max() + 1, xs.min():xs.max() + 1]; h, w = ink.shape
quad = np.float32([[410, 585], [800, 490], [775, 690], [405, 775]])           # right-hand face of the box
L = lambda p, q, t: p + (q - p) * t
fp = lambda u, v: L(L(quad[0], quad[1], u), L(quad[3], quad[2], u), v)
M = cv2.getPerspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]), np.float32([fp(.24, .07), fp(.76, .07), fp(.76, .93), fp(.24, .93)]))
out = cv2.warpPerspective(ink, M, (900, 785), flags=cv2.INTER_AREA)
box = np.array(Image.open('assets/cs/obj_plat.png').convert('RGBA')); out *= box[..., 3] / 255
lum = box[..., :3].astype(np.float32).mean(-1) / 255
Image.fromarray(np.dstack([np.dstack([255 * (0.86 + .14 * lum)] * 3), out * 235]).clip(0, 255).astype(np.uint8), 'RGBA').save('assets/mkp/plat_logo.png')
# ---------- menu photo ----------
c = Image.open('assets/cs/obj_plat.png').convert('RGBA').crop((60, 120, 860, 760))
bg = Image.new('RGBA', c.size, (255, 231, 209, 255)); bg.alpha_composite(c)
bg.convert('RGB').resize((400, 320), Image.LANCZOS).save('assets/mkp/food_poulet.jpg', quality=90)
print('assets ok')
