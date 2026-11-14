"""Sketch 1 puppets: cut the characters out of their white background (un-matted edge), build the talking mouth
(open-mouth edit aligned with SIFT and colour-matched, plus a mouth-less skin plate for the half-open mouth) and the
closed eyes (eye inpainted with the surrounding skin, lid line drawn on top). Writes assets/sketch1/*.png + puppets.json.
  fx_venv/bin/python src/sk1_prep.py analyse   -> prints the white blobs inside each character (eyes)
  fx_venv/bin/python src/sk1_prep.py build"""
import sys, json, numpy as np, cv2
from PIL import Image
from scipy import ndimage as ndi
D = 'assets/sketch1/'
SP = '/tmp/claude-0/-home-user-Politique-oja/3a34f9da-5946-5b2b-80af-fa8542fac0f6/scratchpad/'

def cutout(img):
    a = np.asarray(img.convert('RGB')).astype(np.int16)
    white = (a.min(axis=2) > 236) & ((a.max(axis=2) - a.min(axis=2)) < 18)
    lab, n = ndi.label(white)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = np.isin(lab, list(border))
    # soft edge: distance-based alpha over 1.5 px
    fg = ~bg
    fg = ndi.binary_opening(fg, iterations=1)
    lab2, n2 = ndi.label(fg)
    if n2 > 1:
        sizes = ndi.sum(fg, lab2, range(1, n2 + 1)); keep = 1 + int(np.argmax(sizes)); fg = lab2 == keep
    fg = ndi.binary_fill_holes(fg) | (fg)
    d_in = ndi.distance_transform_edt(fg); d_out = ndi.distance_transform_edt(~fg)
    alpha = np.clip(0.5 + (d_in - d_out) / 1.6, 0, 1)
    return fg, alpha, white & ~bg

if sys.argv[1] == 'analyse':
    for name in ('boni', 'sena'):
        im = Image.open(D + name + '_src.jpg')
        fg, alpha, inner_white = cutout(im)
        lab, n = ndi.label(inner_white)
        objs = ndi.find_objects(lab)
        out = []
        for i, sl in enumerate(objs):
            sz = int((lab[sl] == i + 1).sum())
            if sz > 40:
                out.append((sz, sl[1].start, sl[0].start, sl[1].stop, sl[0].stop))
        out.sort(reverse=True)
        print(name, im.size, 'inner white blobs (size, x0,y0,x1,y1):', out[:8])

# ---- per character data: eyes (x0,y0,x1,y1) and mouth ellipse (cx, cy, rx, ry) in source pixels
CH = {
    'boni': dict(eyes=[(424, 285, 461, 321), (505, 286, 535, 319)], mouth=(491, 377, 52, 27), face=(380, 240, 600, 440)),
    'sena': dict(eyes=[(413, 266, 451, 297), (347, 267, 376, 295)], mouth=(394, 350, 46, 24), face=(320, 220, 520, 400)),
}

def align(src, opn, face):
    """Similarity transform mapping the open-mouth image onto the source, from SIFT matches around the face."""
    g1 = cv2.cvtColor(np.asarray(src), cv2.COLOR_RGB2GRAY); g2 = cv2.cvtColor(np.asarray(opn), cv2.COLOR_RGB2GRAY)
    m1 = np.zeros_like(g1); x0, y0, x1, y1 = face; m1[y0 - 60:y1 + 40, x0 - 60:x1 + 60] = 255
    s = cv2.SIFT_create(4000)
    k1, d1 = s.detectAndCompute(g1, m1); k2, d2 = s.detectAndCompute(g2, None)
    mt = cv2.BFMatcher().knnMatch(d1, d2, k=2)
    good = [m for m, n in mt if m.distance < 0.75 * n.distance]
    p1 = np.float32([k1[m.queryIdx].pt for m in good]); p2 = np.float32([k2[m.trainIdx].pt for m in good])
    M, inl = cv2.estimateAffinePartial2D(p2, p1, method=cv2.RANSAC, ransacReprojThreshold=2.0)
    return M, int(inl.sum()), len(good)

def skin_at(a, pts):
    return np.median(np.array([a[y, x] for x, y in pts]), axis=0)

if sys.argv[1] == 'build':
    meta = {}
    for name in ('boni', 'sena'):
        src = Image.open(D + name + '_src.jpg').convert('RGB'); opn = Image.open(D + name + '_open_src.jpg').convert('RGB')
        a = np.asarray(src).astype(np.float32)
        fg, alpha, inner_white = cutout(src)
        # big enclosed white areas (gap between arm and body) are background too
        lab, n = ndi.label(inner_white)
        for i in range(1, n + 1):
            if (lab == i).sum() > 800:
                gap = ndi.binary_dilation(lab == i, iterations=1); fg[gap] = False
        # un-matte against the white paper: inside the core alpha is 1; in the edge band alpha is the
        # projection of (white - pixel) on (white - nearest core colour), and the colour is that core colour
        core = ndi.binary_erosion(fg, iterations=2)
        band = ndi.binary_dilation(fg, iterations=2) & ~core
        _, (iy, ix) = ndi.distance_transform_edt(~core, return_indices=True)
        cn = a[iy, ix]
        dv = 255.0 - cn; di = 255.0 - a
        al = np.clip((dv * di).sum(axis=2) / np.maximum((dv * dv).sum(axis=2), 1.0), 0, 1)
        alpha = np.where(core, 1.0, np.where(band, al, 0.0))
        col = np.where(core[..., None], a, cn)
        rgba = np.dstack([col, alpha * 255]).astype(np.uint8)
        Image.fromarray(rgba).save(D + name + '.png')
        c = CH[name]
        # open mouth: warp, then keep an elliptical feathered patch
        M, ninl, ng = align(src, opn, c['face'])
        sc = float(np.hypot(M[0, 0], M[1, 0]))
        warped = cv2.warpAffine(np.asarray(opn), M, src.size, flags=cv2.INTER_LANCZOS4, borderValue=(255, 255, 255)).astype(np.float32)
        cx, cy, rx, ry = c['mouth']
        yy, xx = np.mgrid[0:src.size[1], 0:src.size[0]]
        r = np.sqrt(((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2)
        m = np.clip((1.18 - r) / 0.3, 0, 1)
        # colour-match the warped patch to the source skin around the mouth ring
        ring = (r > 1.0) & (r < 1.25)
        gain = (a[ring].mean(axis=0) + 1) / (warped[ring].mean(axis=0) + 1)
        warped = np.clip(warped * gain, 0, 255)
        bx0, by0, bx1, by1 = int(cx - rx * 1.25), int(cy - ry * 1.25), int(cx + rx * 1.25) + 1, int(cy + ry * 1.25) + 1
        patch = np.dstack([warped[by0:by1, bx0:bx1], m[by0:by1, bx0:bx1] * 255]).astype(np.uint8)
        Image.fromarray(patch).save(D + name + '_mouth_open.png')
        # mouth-less skin plate (closed lips inpainted away), drawn under a half-open mouth
        reg = np.asarray(src)[by0:by1, bx0:bx1].copy()
        hole = (r[by0:by1, bx0:bx1] < 0.95).astype(np.uint8) * 255
        plate = cv2.inpaint(reg, hole, 9, cv2.INPAINT_TELEA)
        Image.fromarray(np.dstack([plate, m[by0:by1, bx0:bx1] * 255]).astype(np.uint8)).save(D + name + '_mouth_plate.png')
        # closed eyes patches: skin fill + lid line
        eyes = []
        for k, (x0, y0, x1, y1) in enumerate(c['eyes']):
            pad = 4; X0, Y0, X1, Y1 = x0 - pad, y0 - pad, x1 + pad, y1 + pad
            w, h = X1 - X0, Y1 - Y0
            P = 10
            reg = np.asarray(src)[Y0 - P:Y1 + P, X0 - P:X1 + P].copy()
            hsv = cv2.cvtColor(reg, cv2.COLOR_RGB2HSV).astype(np.int16)
            skinlike = (hsv[..., 2] > 120) & (hsv[..., 2] < 235) & (hsv[..., 1] > 60)
            yy2, xx2 = np.mgrid[0:reg.shape[0], 0:reg.shape[1]]
            ell = (((xx2 - (P + w / 2)) / (w / 2)) ** 2 + ((yy2 - (P + h / 2)) / (h / 2)) ** 2) <= 1.0
            mk = (ell & ~skinlike).astype(np.uint8)
            mk = cv2.dilate(mk, np.ones((3, 3), np.uint8), iterations=2) & ell.astype(np.uint8)
            inp = cv2.inpaint(reg, mk * 255, 6, cv2.INPAINT_TELEA)
            from PIL import ImageDraw
            big = Image.fromarray(inp).resize((reg.shape[1] * 4, reg.shape[0] * 4), Image.LANCZOS).convert('RGBA')
            dr = ImageDraw.Draw(big); lc = (48, 24, 16, 255)
            cxp, cyp = (P + w / 2) * 4, (P + h * 0.52) * 4
            dr.arc([cxp - w * 0.46 * 4, cyp - h * 0.55 * 4, cxp + w * 0.46 * 4, cyp + h * 0.28 * 4], 15, 165, fill=lc, width=int(3.4 * 4))
            img = big.resize((reg.shape[1], reg.shape[0]), Image.LANCZOS)
            am = cv2.GaussianBlur(cv2.dilate(mk, np.ones((3, 3), np.uint8), iterations=2).astype(np.float32), (0, 0), 1.6)
            al = np.asarray(img).copy(); al[..., 3] = np.clip(np.maximum(am * 1.6, 0) * 255, 0, 255).astype(np.uint8)
            img = Image.fromarray(al); X0, Y0 = X0 - P, Y0 - P; w, h = reg.shape[1], reg.shape[0]
            img.save(D + f'{name}_eye{k}_closed.png'); eyes.append([X0, Y0, w, h])
        meta[name] = dict(size=src.size, mouth_box=[bx0, by0, bx1 - bx0, by1 - by0], mouth_center=[cx, cy], eyes=eyes,
                          align=dict(scale=round(sc, 3), inliers=ninl, matches=ng))
        print(name, meta[name])
    json.dump(meta, open(D + 'puppets.json', 'w'), indent=1)
    open(D + 'puppets.js', 'w').write('window.PUP = ' + json.dumps(meta) + ';\n')
