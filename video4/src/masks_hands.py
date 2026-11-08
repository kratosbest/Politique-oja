"""Completes the person masks of video 4 (src/masks.py, rembg) where Derrick's hands move.
rembg often leaves out a hand that moves (it is blurred), so the new background showed through his hand. Here:
- MediaPipe finds his hands on the frame (hand_landmarker, image mode); each hand (the shape around its 21 points, widened a little) is added to the mask;
- holes inside the mask are filled (the badge of his shirt was sometimes left out), and below his shoulders each row is filled from edge to edge.
The rembg masks are kept in work/v3/masks_raw/ the first time.
usage: python src/masks_hands.py work/v3/frames MODELS_DIR N1 N2 ...   (frame numbers, 1-based) or  ... @list.json"""
import json, pathlib, shutil, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage
import mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions
folder, models = pathlib.Path(sys.argv[1]), sys.argv[2]
nums = json.load(open(sys.argv[3][1:])) if sys.argv[3].startswith('@') else [int(x) for x in sys.argv[3:]]
raw = folder.parent / 'masks_raw'; raw.mkdir(exist_ok=True)
det = vision.HandLandmarker.create_from_options(vision.HandLandmarkerOptions(base_options=BaseOptions(model_asset_path=f'{models}/hand_landmarker.task'),
      running_mode=vision.RunningMode.IMAGE, num_hands=2, min_hand_detection_confidence=.3, min_hand_presence_confidence=.3))
W, H = 540, 960
fixed = 0
for n in nums:
    mpath = folder / f'm{n:04d}.png'
    if not mpath.exists(): continue
    if not (raw / mpath.name).exists(): shutil.copyfile(mpath, raw / mpath.name)
    a = np.asarray(Image.open(raw / mpath.name))[..., 3].astype(np.float32) / 255
    im = Image.open(folder / f'f{n:04d}.jpg').convert('RGB').resize((W, H), Image.LANCZOS)
    res = det.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.asarray(im)))
    hand = Image.new('L', (W, H), 0); d = ImageDraw.Draw(hand); missed = False
    for lm in res.hand_landmarks:
        P = np.array([[p.x * W, p.y * H] for p in lm])
        size = np.linalg.norm(P[0] - P[9]) + 1e-3                      # wrist to the base of the middle finger
        # each finger as a thick line, the palm as a filled shape, the wrist a little longer toward the arm
        for ch in ([0, 1, 2, 3, 4], [0, 5, 6, 7, 8], [5, 9, 10, 11, 12], [9, 13, 14, 15, 16], [13, 17, 18, 19, 20], [0, 17]):
            d.line([tuple(P[i]) for i in ch], fill=255, width=max(6, int(size * .38)), joint='curve')
        d.polygon([tuple(P[i]) for i in (0, 1, 5, 9, 13, 17)], fill=255)
        arm = P[0] + (P[0] - P[9]) * .9; d.line([tuple(P[0]), tuple(arm)], fill=255, width=max(8, int(size * .7)))
        for p in P: d.ellipse([p[0] - size * .16, p[1] - size * .16, p[0] + size * .16, p[1] + size * .16], fill=255)
        xi, yi = np.clip(P[:, 0].astype(int), 0, W - 1), np.clip(P[:, 1].astype(int), 0, H - 1)
        if (a[yi, xi] < .5).mean() > .2: missed = True
    h = np.asarray(hand.filter(ImageFilter.GaussianBlur(2)), dtype=np.float32) / 255
    out = np.maximum(a, h)
    solid = ndimage.binary_fill_holes(out > .5); out = np.where(solid & (out < .5), 1., out)
    # below his shoulders his body fills the whole width: fill each row from edge to edge of the mask there
    # (holes that touch the bottom of the frame are not closed by the fill above; the map showed through his shirt)
    on = out > .5; wide = np.where(on.sum(axis=1) > .85 * W)[0]
    if len(wide):
        for y in range(wide[0], H):
            xs = np.where(on[y])[0]
            if len(xs): out[y, xs[0]:xs[-1] + 1] = np.maximum(out[y, xs[0]:xs[-1] + 1], 1.)
    if missed: fixed += 1
    rgba = np.zeros((H, W, 4), np.uint8); rgba[..., :3] = 255; rgba[..., 3] = np.clip(out * 255, 0, 255).astype(np.uint8)
    Image.fromarray(rgba, 'RGBA').save(mpath, optimize=True)
print('ok', len(nums), 'frames, hands added where rembg had missed them:', fixed)
