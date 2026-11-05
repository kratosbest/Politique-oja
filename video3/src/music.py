"""Background music for video 3: the same clean part of Derrick's TikTok sound as video 1 (video1/work/fond_sonore.wav: no song ending,
no TikTok jingle), looped with a 1.5 s crossfade. About 21 dB under the voice (-37 LUFS), a little softer during « Imagine »,
then loud on its own once Derrick has said « Merci », until a 2 s fade out.
usage (from video3/): python3 src/music.py ../video1/work/fond_sonore.wav work/music.wav"""
import json, subprocess, sys, wave
import numpy as np
D = json.load(open('data/edit_data.json'))
SR, DUR, XF = 48000, D['dur'], 1.5
CLEAN_END, LOOP_FROM = 58.2, 12.0
MERCI = [w for w in D['words'] if w[0].startswith('Merci')][0][2]
B = {b[2]: b for b in D['blocks']}
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[1], '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
n, xf = int(DUR * SR), int(XF * SR)
part = x[int(LOOP_FROM * SR):int(CLEAN_END * SR)]
out = x[:int(CLEAN_END * SR)].copy()
while len(out) < n:
    k = np.linspace(0, 1, xf)[:, None]
    out = np.concatenate([out[:-xf], out[-xf:] * np.cos(k * np.pi / 2) + part[:xf] * np.sin(k * np.pi / 2), part[xf:]])
out = out[:n]
def lufs(a):
    tmp = sys.argv[2] + '.tmp.wav'
    with wave.open(tmp, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes())
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', tmp, '-af', 'ebur128=framelog=quiet', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(r.split('I:')[-1].split('LUFS')[0])
out = out / np.abs(out).max() * .5
out = out * 10 ** ((-37 - lufs(out)) / 20)
t = np.arange(n) / SR
i6, i7 = B[6][0], B[7][0]
env = np.interp(t, [0, 5.0, 6.0, i6 - .5, i6 + .5, i7 - .5, i7 + .5, MERCI, MERCI + 1.2, DUR], [1.3, 1.3, 1, 1, .6, .6, 1.1, 1.1, 12, 12])
fade = np.clip((DUR - t) / 2.0, 0, 1) ** 1.5
out = np.tanh(out * (env * fade)[:, None] / .95) * .95
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print('ok', round(len(out) / SR, 2), 'merci', MERCI)
