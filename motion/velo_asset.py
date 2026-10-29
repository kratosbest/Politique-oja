"""Real OJA delivery bicycle for the Marchand video (assets/mch/velo.png).
Source: an ElevenLabs image (model bytedance-seedream-5-pro, prompt in assets/mch/velo_prompt.txt): plain orange box, white studio background.
This script cuts the bike out (difference matte against the estimated background, so the spokes stay see-through)
and prints the OJA logo in white ink on the box's flat face.
Run from motion/:  python3 velo_asset.py <generated image.png>"""
import numpy as np, cv2, sys
from PIL import Image
I = cv2.imread(sys.argv[1])[..., ::-1].astype(np.float32)
# background: normalized blur of the light grey pixels, refined twice
mn, mx = I.min(-1), I.max(-1)
m = cv2.erode(((mn > 195) & (mx - mn < 25)).astype(np.float32), np.ones((9, 9), np.uint8))
def nblur(m, s=25):
    return cv2.GaussianBlur(I * m[..., None], (0, 0), s) / np.maximum(cv2.GaussianBlur(m, (0, 0), s), 1e-4)[..., None]
bg = nblur(m)
for it in range(2):
    bg = nblur(((m > 0) & (np.linalg.norm(bg - I, axis=-1) < 8)).astype(np.float32))
d = np.linalg.norm(bg - I, axis=-1)
a = np.clip((d - 10) / 45, 0, 1)
# drop isolated specks: keep components of the solid mask that are big, plus soft edges next to them
n, lab, st, _ = cv2.connectedComponentsWithStats((a > .35).astype(np.uint8), 8)
keep = np.isin(lab, [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] > 400])
near = cv2.dilate(keep.astype(np.uint8), np.ones((7, 7), np.uint8)) > 0
a *= near
col = (I - (1 - a[..., None]) * bg) / np.maximum(a[..., None], 1e-3)
col = np.where(a[..., None] > .02, col, 0).clip(0, 255)
# grey, semi-transparent pixels are spoke fringes or floor shadow: darken them like the metal, drop the floor
sat = col.max(-1) - col.min(-1); grey = sat < 40
col = np.where((grey & (a < .6))[..., None], np.minimum(col, 105), col)
tyre = (a > .8) & (col.mean(-1) < 80); yb = np.where(tyre.any(1))[0].max()
a[yb + 2:] = 0; a[yb - 40:yb + 2][grey[yb - 40:yb + 2] & (a[yb - 40:yb + 2] < .6)] = 0
# ---- OJA logo printed in white ink on the box's flat face ----
lg = np.array(Image.open('assets/mk_logo.png').convert('RGBA')).astype(np.float32)
ink = lg[..., 3] / 255 * np.clip((lg[..., 0] - lg[..., 2] - 60) / 80, 0, 1)   # orange -> white ink, black -> hole
ys, xs = np.where(ink > .05); ink = ink[ys.min():ys.max() + 1, xs.min():xs.max() + 1]; h, w = ink.shape
quad = np.float32([[1362, 190], [1685, 170], [1700, 472], [1375, 492]])
L = lambda p, q, t: p + (q - p) * t
fp = lambda u, v: L(L(quad[0], quad[1], u), L(quad[3], quad[2], u), v)
v0, v1 = .14, .86; fw = (v1 - v0) * 300 * w / h / 325; u0, u1 = .5 - fw / 2, .5 + fw / 2
M = cv2.getPerspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]), np.float32([fp(u0, v0), fp(u1, v0), fp(u1, v1), fp(u0, v1)]))
out = cv2.warpPerspective(ink, M, (I.shape[1], I.shape[0]), flags=cv2.INTER_AREA) * .93
lum = I.mean(-1); face = cv2.fillConvexPoly(np.zeros(lum.shape, np.uint8), quad.astype(np.int32), 1) > 0
shade = np.clip(lum / np.median(lum[face]), .75, 1.08)
inkc = np.dstack([250 * shade] * 3)
col = col * (1 - out[..., None]) + inkc * out[..., None]
rgba = np.dstack([col, a * 255]).clip(0, 255).astype(np.uint8)
ys, xs = np.where(a > .05); m = 12
rgba = rgba[max(ys.min() - m, 0):ys.max() + m, max(xs.min() - m, 0):xs.max() + m]
im = Image.fromarray(rgba, 'RGBA'); im = im.resize((1000, round(im.height * 1000 / im.width)), Image.LANCZOS)
im.save('assets/mch/velo.png'); print(im.size)
