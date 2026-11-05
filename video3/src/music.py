"""Background music for video 3: Derrick's TikTok sound (work/fond2.wav, extracted from reference/fond_tiktok2.mp4: a song about Benin).
- the TikTok jingle (59.75 s) and everything after it are never used: the clean part stops at 59.2 s;
- 0-59.2 s, then the 16.0-59.2 s part looped with a 1.5 s crossfade (the intro has a stop at 15 s);
- under the voice: about 25 dB lower (-41 LUFS) with a dip around 2.5 kHz so the sung words do not fight Derrick's voice;
- after « Merci »: « Le Bénin est beau, c'est beau… » (48.4 s of the song), loud and full, until a 2 s fade out.
usage (from video3/): python3 src/music.py work/fond2.wav work/music.wav"""
import json, subprocess, sys, wave
import numpy as np
D = json.load(open('data/edit_data.json'))
SR, DUR, XF = 48000, D['dur'], 1.5
CLEAN_END, LOOP_FROM, BEAU = 59.2, 16.0, 48.4
MERCI = [w for w in D['words'] if w[0].startswith('Merci')][0][2]
B = {b[2]: b for b in D['blocks']}
def load(src, af=None):
    cmd = ['ffmpeg', '-v', 'error', '-i', src] + (['-af', af] if af else []) + ['-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).astype(float)
raw, bed_src = load(sys.argv[1]), load(sys.argv[1], 'equalizer=f=2500:t=q:w=1.2:g=-6,equalizer=f=900:t=q:w=1:g=-3')
n, xf = int(DUR * SR), int(XF * SR)
def looped(x):
    part = x[int(LOOP_FROM * SR):int(CLEAN_END * SR)]; out = x[:int(CLEAN_END * SR)].copy()
    while len(out) < n:
        k = np.linspace(0, 1, xf)[:, None]
        out = np.concatenate([out[:-xf], out[-xf:] * np.cos(k * np.pi / 2) + part[:xf] * np.sin(k * np.pi / 2), part[xf:]])
    return out[:n]
def lufs(a):
    tmp = sys.argv[2] + '.tmp.wav'
    with wave.open(tmp, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes())
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', tmp, '-af', 'ebur128=framelog=quiet', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(r.split('I:')[-1].split('LUFS')[0])
bed = looped(bed_src); bed = bed / np.abs(bed).max() * .5; bed = bed * 10 ** ((-41 - lufs(bed)) / 20)
# the ending: « Le Bénin est beau » from the clean song, at about -13 LUFS
e0 = int((MERCI - .2) * SR); end = np.zeros_like(bed); seg = raw[int(BEAU * SR):int(BEAU * SR) + n - e0]; end[e0:e0 + len(seg)] = seg
end = end / np.abs(end).max() * .5; end = end * 10 ** ((-13 - lufs(end[e0:])) / 20)
t = np.arange(n) / SR
i6, i7 = B[6][0], B[7][0]
env = np.interp(t, [0, 5.0, 6.0, i6 - .5, i6 + .5, i7 - .5, i7 + .5, MERCI - .3, MERCI + .3, DUR], [1.4, 1.4, 1, 1, .7, .7, 1, 1, 0, 0])
envE = np.interp(t, [0, MERCI - .3, MERCI + .5, DUR], [0, 0, 1, 1])
fade = np.clip((DUR - t) / 2.0, 0, 1) ** 1.5
out = (bed * env[:, None] + end * envE[:, None]) * fade[:, None]
out = np.tanh(out / .95) * .95
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print('ok', round(len(out) / SR, 2), 'merci', MERCI)
