"""Hand and body tracking of one take with MediaPipe (hand_landmarker + pose_landmarker_lite), every frame (24 fps), at 540 x 960.
usage: python src/track.py rushes/IMG_1073.mp4 work/track_IMG_1073.json MODELS_DIR
Per frame: t, pose (nose, shoulders, wrists, shoulder width) and hands (handedness + 21 points), all in 0-1 image coordinates."""
import json, subprocess, sys
import numpy as np
import mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions
src, out, models = sys.argv[1], sys.argv[2], sys.argv[3]
W, H = 540, 960
hands = vision.HandLandmarker.create_from_options(vision.HandLandmarkerOptions(base_options=BaseOptions(model_asset_path=f'{models}/hand_landmarker.task'),
        running_mode=vision.RunningMode.VIDEO, num_hands=2, min_hand_detection_confidence=.4, min_tracking_confidence=.4))
pose = vision.PoseLandmarker.create_from_options(vision.PoseLandmarkerOptions(base_options=BaseOptions(model_asset_path=f'{models}/pose_landmarker_lite.task'),
        running_mode=vision.RunningMode.VIDEO))
p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-vf', f'fps=24,scale={W}:{H}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
res, i = [], 0
while True:
    buf = p.stdout.read(W * H * 3)
    if len(buf) < W * H * 3: break
    img = mp.Image(image_format=mp.ImageFormat.SRGB, data=np.frombuffer(buf, np.uint8).reshape(H, W, 3).copy())
    ms = int(i * 1000 / 24)
    hr, pr = hands.detect_for_video(img, ms), pose.detect_for_video(img, ms)
    fr = {'t': round(i / 24, 4), 'hands': [], 'pose': None}
    for lm, hd in zip(hr.hand_landmarks, hr.handedness):
        fr['hands'].append({'side': hd[0].category_name, 'pts': [[round(q.x, 4), round(q.y, 4)] for q in lm]})
    if pr.pose_landmarks:
        L = pr.pose_landmarks[0]; g = lambda k: [round(L[k].x, 4), round(L[k].y, 4)]
        fr['pose'] = {'nose': g(0), 'ls': g(11), 'rs': g(12), 'lw': g(15), 'rw': g(16), 'sw': round(abs(L[11].x - L[12].x), 4)}
    res.append(fr); i += 1
json.dump(res, open(out, 'w'))
print('ok', src, i, 'frames')
