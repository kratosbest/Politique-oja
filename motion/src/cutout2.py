import sys, numpy as np, cv2
from PIL import Image
from rembg import remove, new_session
sess = new_session('isnet-general-use')
src, dst, maxside = sys.argv[1], sys.argv[2], int(sys.argv[3])
mode = sys.argv[4] if len(sys.argv) > 4 else 'union'; vmin = int(sys.argv[5]) if len(sys.argv) > 5 else 178; smax = int(sys.argv[6]) if len(sys.argv) > 6 else 32
im = Image.open(src).convert('RGB'); rgb8 = np.asarray(im)
a_ai = np.asarray(remove(im, session=sess, post_process_mask=True))[..., 3].astype(np.float32) / 255
# background = light, colourless pixels connected to the image border (studio white / light grey and its shadows)
hsv = cv2.cvtColor(rgb8, cv2.COLOR_RGB2HSV)
cand = ((hsv[..., 1] < smax) & (hsv[..., 2] > vmin)).astype(np.uint8)
n, lab = cv2.connectedComponents(cand, connectivity=4)
border = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
bg = np.isin(lab, border[border > 0])
fg = (~bg).astype(np.uint8)
fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
fg_soft = cv2.GaussianBlur(fg.astype(np.float32), (0, 0), 1.4)
a = np.maximum(a_ai, fg_soft) if mode == 'union' else a_ai.copy()
# fill closed holes (e.g. a white clock face) with the original pixels
hard = (a > .5).astype(np.uint8)
inv = 1 - hard; n2, lab2 = cv2.connectedComponents(inv, connectivity=4)
bl = np.unique(np.concatenate([lab2[0], lab2[-1], lab2[:, 0], lab2[:, -1]]))
holes = (inv == 1) & ~np.isin(lab2, bl)
if mode == 'union': a[holes] = 1.0
rgb = rgb8.astype(np.float32); bgc = np.array([248, 248, 248], np.float32)
m = (a > 0.02) & (a < 0.98)
rgb[m] = np.clip((rgb[m] - (1 - a[m])[:, None] * bgc) / a[m][:, None], 0, 255)
rgba = np.dstack([rgb, a * 255]).astype(np.uint8)
ys, xs = np.where(a > 0.05); pad = 12
y0, y1, x0, x1 = max(0, ys.min() - pad), min(a.shape[0], ys.max() + pad), max(0, xs.min() - pad), min(a.shape[1], xs.max() + pad)
res = Image.fromarray(rgba).crop((x0, y0, x1, y1)); res.thumbnail((maxside, maxside), Image.LANCZOS); res.save(dst)
print(dst, res.size, 'holes filled', int(holes.sum()))
