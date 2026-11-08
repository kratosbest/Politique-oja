"""Music and small sounds for video 4, version 3 (montage3.html). Same song as version 2 (work/fond2.wav, a song about Benin).
- the clean part of the song (0-59.2 s), then 16.0-59.2 s looped with a 1.5 s crossfade; the TikTok jingle is never used;
- under the voice at -31 LUFS with a dip around 2.5 kHz;
- block 1: the music stops during the silence before « Avec OJA, plus besoin »;
- block 8: softer at the start, then rising up to « Donnez-moi la force »;
- after « Merci »: « Le Bénin est beau » (48.4 s of the song), loud, until a 2 s fade out;
- small sounds made here, no sample and no whoosh: a click when a box is ticked, a knock when a pin lands, a soft pop when a card sticks,
  a thump for the GRATUIT stamp. Their times come from montage3.html (window.SFX), saved in data/v3/sfx.json by src/sfx3.js.
usage (from video4/): node src/sfx3.js && python3 src/music3.py work/fond2.wav work/v3/music.wav"""
import json, subprocess, sys, wave
import numpy as np
D = json.load(open('data/v3/edit_data.json')); SFX = json.load(open('data/v3/sfx.json'))
SR, DUR, XF = 48000, D['dur'] + 4.0, 1.5
CLEAN_END, LOOP_FROM, BEAU = 59.2, 16.0, 48.4
W = D['words']; B = {b[2]: b for b in D['blocks']}
word = lambda b, w, n=0: [x for x in W if x[4] == b and x[0].lower().startswith(w)][n]
MERCI = word(8, 'merci')[1]; FORCE = word(8, 'donnez-moi')[1]; QQ3 = word(1, "quelqu'un", 2)[2]; AVEC = word(1, 'avec')[1]
def load(src, af=None):
    cmd = ['ffmpeg', '-v', 'error', '-i', src] + (['-af', af] if af else []) + ['-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).astype(float)
raw, bed_src = load(sys.argv[1]), load(sys.argv[1], 'equalizer=f=2500:t=q:w=1.2:g=-3')
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
bed = looped(bed_src); bed = bed / np.abs(bed).max() * .5; bed = bed * 10 ** ((-31 - lufs(bed)) / 20)
e0 = int((MERCI - .2) * SR); end = np.zeros_like(bed); seg = raw[int(BEAU * SR):int(BEAU * SR) + n - e0]; end[e0:e0 + len(seg)] = seg
end = end / np.abs(end).max() * .5; end = end * 10 ** ((-13 - lufs(end[e0:])) / 20)
t = np.arange(n) / SR; i8 = B[8][0]
env = np.interp(t, [0, 1.0, QQ3 + .02, QQ3 + .1, AVEC - .08, AVEC + .05, i8 - .5, i8 + .5, FORCE - 4, FORCE, MERCI - .3, MERCI + .3, DUR],
                   [1.2, 1, 1, 0, 0, 1, 1, .65, .65, 1.2, 1.2, 0, 0])
envE = np.interp(t, [0, MERCI - .3, MERCI + .5, DUR], [0, 0, 1, 1])
fade = np.clip((DUR - t) / 2.0, 0, 1) ** 1.5
out = (bed * env[:, None] + end * envE[:, None]) * fade[:, None]
# ---- small sounds
rng = np.random.default_rng(7)
def tone(f0, f1, d, decay, amp):
    tt = np.arange(int(d * SR)) / SR; f = np.linspace(f0, f1, len(tt)); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-tt / decay) * amp
def noise(d, decay, amp, smooth=1):
    x = rng.standard_normal(int(d * SR)); x = np.convolve(x, np.ones(smooth) / smooth, 'same'); tt = np.arange(len(x)) / SR
    return x * np.exp(-tt / decay) * amp
def add(*xs):
    m = max(len(x) for x in xs); out = np.zeros(m)
    for x in xs: out[:len(x)] += x
    return out
KIND = {
    'tick': lambda: add(tone(2100, 1900, .05, .012, .16), noise(.01, .002, .05)),
    'tac': lambda: add(tone(520, 380, .09, .025, .22), noise(.02, .004, .10, 6)),
    'pop': lambda: tone(480, 900, .08, .03, .12),
    'stamp': lambda: add(tone(110, 60, .25, .07, .42), noise(.06, .015, .25, 20)),
}
sfx = np.zeros(n)
for tm, k in SFX:
    s = KIND[k](); i = int(tm * SR)
    if 0 <= i < n: sfx[i:i + len(s)] += s[:n - i]
out = out + sfx[:, None] * np.array([1, 1])[None, :]
out = np.tanh(out / .95) * .95
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print('ok', round(len(out) / SR, 2), 'merci', MERCI, 'sounds', len(SFX))
