"""Cut-out cartoon puppets for the OJA sketches (generic version of src/sk1_prep.py).

From a character drawn on a plain white background (and, optionally, the same drawing with the mouth open) it writes:
  <name>.png               the character cut out, edge un-matted against the white paper
  <name>_mouth_open.png    the open mouth (edit aligned on the source with SIFT, colour-matched), feathered patch
  <name>_mouth_plate.png   the same box with the closed lips inpainted away (drawn under a half-open mouth)
  <name>_eye<k>_closed.png each eye inpainted with the surrounding skin, a lid line drawn on top
and adds the numbers to <outdir>/puppets.js (window.PUP) and puppets.json.

  fx_venv/bin/python src/puppet.py <config.json>
config: {"outdir": "assets/sketch2/", "chars": {"bonitel": {"src": "...jpg", "open": "...jpg" | null,
         "eyes": [[x0,y0,x1,y1], ...], "mouth": [cx, cy, rx, ry] | null, "face": [x0,y0,x1,y1]}}}"""
import sys, json, os
import numpy as np, cv2
from PIL import Image, ImageDraw
from scipy import ndimage as ndi


def cutout(img):
    a = np.asarray(img.convert('RGB')).astype(np.float32)
    ai = a.astype(np.int16)
    white = (ai.min(axis=2) > 236) & ((ai.max(axis=2) - ai.min(axis=2)) < 18)
    lab, n = ndi.label(white)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    fg = ~np.isin(lab, list(border))
    fg = ndi.binary_opening(fg, iterations=1)
    lab2, n2 = ndi.label(fg)
    if n2 > 1:
        sizes = ndi.sum(fg, lab2, range(1, n2 + 1)); fg = lab2 == 1 + int(np.argmax(sizes))
    fg = ndi.binary_fill_holes(fg)
    inner_white = white & fg
    lab3, n3 = ndi.label(inner_white)          # large enclosed white areas (gap between an arm and the body) are paper
    for i in range(1, n3 + 1):
        if (lab3 == i).sum() > 800: fg[ndi.binary_dilation(lab3 == i, iterations=1)] = False
    core = ndi.binary_erosion(fg, iterations=2)
    band = ndi.binary_dilation(fg, iterations=2) & ~core
    _, (iy, ix) = ndi.distance_transform_edt(~core, return_indices=True)
    cn = a[iy, ix]; dv = 255.0 - cn; di = 255.0 - a
    al = np.clip((dv * di).sum(axis=2) / np.maximum((dv * dv).sum(axis=2), 1.0), 0, 1)
    alpha = np.where(core, 1.0, np.where(band, al, 0.0))
    col = np.where(core[..., None], a, cn)
    return np.dstack([col, alpha * 255]).astype(np.uint8), inner_white


def align(src, opn, face):
    g1 = cv2.cvtColor(np.asarray(src), cv2.COLOR_RGB2GRAY); g2 = cv2.cvtColor(np.asarray(opn), cv2.COLOR_RGB2GRAY)
    m1 = np.zeros_like(g1); x0, y0, x1, y1 = face; m1[max(0, y0 - 60):y1 + 40, max(0, x0 - 60):x1 + 60] = 255
    s = cv2.SIFT_create(4000)
    k1, d1 = s.detectAndCompute(g1, m1); k2, d2 = s.detectAndCompute(g2, None)
    good = [m for m, n in cv2.BFMatcher().knnMatch(d1, d2, k=2) if m.distance < 0.75 * n.distance]
    p1 = np.float32([k1[m.queryIdx].pt for m in good]); p2 = np.float32([k2[m.trainIdx].pt for m in good])
    M, inl = cv2.estimateAffinePartial2D(p2, p1, method=cv2.RANSAC, ransacReprojThreshold=2.0)
    return M, int(inl.sum()), len(good)


def mouth(src, opn, face, cx, cy, rx, ry, out, name):
    a = np.asarray(src).astype(np.float32)
    M, ninl, ng = align(src, opn, face)
    warped = cv2.warpAffine(np.asarray(opn), M, src.size, flags=cv2.INTER_LANCZOS4, borderValue=(255, 255, 255)).astype(np.float32)
    yy, xx = np.mgrid[0:src.size[1], 0:src.size[0]]
    r = np.sqrt(((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2)
    m = np.clip((1.18 - r) / 0.3, 0, 1)
    ring = (r > 1.0) & (r < 1.25)
    warped = np.clip(warped * (a[ring].mean(axis=0) + 1) / (warped[ring].mean(axis=0) + 1), 0, 255)
    bx0, by0 = int(cx - rx * 1.25), int(cy - ry * 1.25); bx1, by1 = int(cx + rx * 1.25) + 1, int(cy + ry * 1.25) + 1
    Image.fromarray(np.dstack([warped[by0:by1, bx0:bx1], m[by0:by1, bx0:bx1] * 255]).astype(np.uint8)).save(out + name + '_mouth_open.png')
    reg = np.asarray(src)[by0:by1, bx0:bx1].copy()
    plate = cv2.inpaint(reg, (r[by0:by1, bx0:bx1] < 0.95).astype(np.uint8) * 255, 9, cv2.INPAINT_TELEA)
    Image.fromarray(np.dstack([plate, m[by0:by1, bx0:bx1] * 255]).astype(np.uint8)).save(out + name + '_mouth_plate.png')
    return dict(mouth_box=[bx0, by0, bx1 - bx0, by1 - by0], mouth_center=[cx, cy], align=dict(scale=round(float(np.hypot(M[0, 0], M[1, 0])), 3), inliers=ninl, matches=ng))


def eye(src, box, out, fname, lid=3.4):
    x0, y0, x1, y1 = box; pad = 4; X0, Y0, X1, Y1 = x0 - pad, y0 - pad, x1 + pad, y1 + pad
    w, h = X1 - X0, Y1 - Y0; P = 10
    reg = np.asarray(src)[Y0 - P:Y1 + P, X0 - P:X1 + P].copy()
    hsv = cv2.cvtColor(reg, cv2.COLOR_RGB2HSV).astype(np.int16)
    skinlike = (hsv[..., 2] > 120) & (hsv[..., 2] < 235) & (hsv[..., 1] > 60)
    yy, xx = np.mgrid[0:reg.shape[0], 0:reg.shape[1]]
    ell = (((xx - (P + w / 2)) / (w / 2)) ** 2 + ((yy - (P + h / 2)) / (h / 2)) ** 2) <= 1.0
    mk = cv2.dilate((ell & ~skinlike).astype(np.uint8), np.ones((3, 3), np.uint8), iterations=2) & ell.astype(np.uint8)
    inp = cv2.inpaint(reg, mk * 255, 6, cv2.INPAINT_TELEA)
    big = Image.fromarray(inp).resize((reg.shape[1] * 4, reg.shape[0] * 4), Image.LANCZOS).convert('RGBA')
    dr = ImageDraw.Draw(big); cxp, cyp = (P + w / 2) * 4, (P + h * 0.52) * 4
    dr.arc([cxp - w * 0.46 * 4, cyp - h * 0.55 * 4, cxp + w * 0.46 * 4, cyp + h * 0.28 * 4], 15, 165, fill=(48, 24, 16, 255), width=max(4, int(lid * 4 * min(1, w / 30))))
    img = big.resize((reg.shape[1], reg.shape[0]), Image.LANCZOS)
    am = cv2.GaussianBlur(cv2.dilate(mk, np.ones((3, 3), np.uint8), iterations=2).astype(np.float32), (0, 0), 1.6)
    arr = np.asarray(img).copy(); arr[..., 3] = np.clip(am * 1.6 * 255, 0, 255).astype(np.uint8)
    Image.fromarray(arr).save(out + fname)
    return [X0 - P, Y0 - P, reg.shape[1], reg.shape[0]]


if __name__ == '__main__':
    cfg = json.load(open(sys.argv[1])); out = cfg['outdir']
    pj = out + 'puppets.json'; meta = json.load(open(pj)) if os.path.exists(pj) else {}
    for name, c in cfg['chars'].items():
        src = Image.open(c['src']).convert('RGB')
        rgba, _ = cutout(src); Image.fromarray(rgba).save(out + name + '.png')
        m = dict(size=list(src.size))
        if c.get('open') and c.get('mouth'):
            m.update(mouth(src, Image.open(c['open']).convert('RGB'), c['face'], *c['mouth'], out, name))
        m['eyes'] = [eye(src, b, out, f'{name}_eye{k}_closed.png') for k, b in enumerate(c.get('eyes', []))]
        for k, (ex, ey, ew, eh) in enumerate(m['eyes']):   # a closed eye never spills outside the silhouette
            f = out + f'{name}_eye{k}_closed.png'; e = np.asarray(Image.open(f)).copy()
            e[..., 3] = (e[..., 3].astype(np.float32) * rgba[ey:ey + eh, ex:ex + ew, 3] / 255).astype(np.uint8)
            Image.fromarray(e).save(f)
        meta[name] = m; print(name, m)
    json.dump(meta, open(pj, 'w'), indent=1)
    open(out + 'puppets.js', 'w').write('window.' + cfg.get('var', 'PUP') + ' = ' + json.dumps(meta) + ';\n')
