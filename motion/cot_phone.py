"""Replace the solid-green phone screens of the Flow clips with real OJA screens.
Used by cot_frames.py. Works on 1920x1080 RGB uint8 frames."""
import cv2, numpy as np

def green_score(f):
    f = f.astype(np.int16); r, g, b = f[..., 0], f[..., 1], f[..., 2]
    return np.clip((g - np.maximum(r, b) - 25) / 45.0, 0, 1)

def order(pts):
    pts = pts.reshape(-1, 2).astype(np.float32); s = pts.sum(1); d = np.diff(pts, axis=1).ravel()
    return np.array([pts[s.argmin()], pts[d.argmin()], pts[s.argmax()], pts[d.argmax()]], np.float32)  # TL TR BR BL

def find_quad(score, min_area=900):
    m = (score > .35).astype(np.uint8) * 255
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not cs: return None
    c = max(cs, key=cv2.contourArea)
    if cv2.contourArea(c) < min_area: return None
    hull = cv2.convexHull(c)
    for eps in np.linspace(.01, .08, 15):
        ap = cv2.approxPolyDP(hull, eps * cv2.arcLength(hull, True), True)
        if len(ap) == 4: return order(ap)
    return order(cv2.boxPoints(cv2.minAreaRect(hull)))

def grow(q, k):
    c = q.mean(0); return (q - c) * k + c

def replace(frame, ui, prev=None, smooth=.5):
    """frame: HxWx3 RGB, ui: hxwx4 RGBA screen. Returns (frame, quad)."""
    sc = green_score(frame); q = find_quad(sc)
    if q is None: return frame, prev
    if prev is not None and np.abs(q - prev).max() < 25: q = prev * smooth + q * (1 - smooth)
    H, W = frame.shape[:2]; h, w = ui.shape[:2]
    src = np.array([[0, 0], [w, 0], [w, h], [0, h]], np.float32)
    M = cv2.getPerspectiveTransform(src, grow(q, 1.05))
    warped = cv2.warpPerspective(ui, M, (W, H), flags=cv2.INTER_AREA if w > 300 else cv2.INTER_LINEAR, borderValue=(0, 0, 0, 0)).astype(np.float32) / 255
    # alpha: UI shows where it is green (fingers in front stay), feathered
    a = cv2.GaussianBlur(np.clip(sc * 1.6, 0, 1).astype(np.float32), (5, 5), 0)
    region = cv2.dilate((warped[..., 3] > 0).astype(np.uint8), np.ones((7, 7), np.uint8)).astype(bool)
    a = a * warped[..., 3]
    out = frame.astype(np.float32) / 255
    # despill green fringe around the screen
    zone = cv2.dilate(region.astype(np.uint8), np.ones((15, 15), np.uint8)).astype(bool)
    mx = np.maximum(out[..., 0], out[..., 2]); gg = out[..., 1]
    out[..., 1] = np.where(zone & (gg > mx), mx + (gg - mx) * .05, gg)
    rgb = warped[..., :3] * 1.0
    out = out * (1 - a[..., None]) + rgb * a[..., None]
    return (np.clip(out, 0, 1) * 255).astype(np.uint8), q
