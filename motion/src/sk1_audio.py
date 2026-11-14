# Sketch 1 « la cour » (oja_sketch_cour.html, 9:16): night ambience, a light playful music bed, small sounds and the
# two voices. Lines and their places come from assets/sketch1/marks.json (src/sk1_marks.py); the small sounds come from
# the page (window.SFX, saved by src/sfx_dump.js): pop when the pin drops, soft taps, a tick when the sheet slides up,
# a cartoon spring on Boni's two hops, a chime on the end card. No whoosh.
# usage (from motion/): node src/sfx_dump.js oja_sketch_cour.html work/sketch1/sfx.json
#   python3 src/sk1_audio.py work/sketch1/sfx.json work/sketch1/mix.wav
import json, subprocess, sys, wave
import numpy as np
SK = json.load(open('assets/sketch1/marks.json'))
SFX = json.load(open(sys.argv[1]))
SR = 44100; DUR = SK['total']; N = int(SR * DUR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(1101)

def add(sig, t, pan=0.0, g=1.0, buf=None):
    BL, BR = buf if buf else (L, R)
    i = int(t * SR)
    if i >= N: return
    if i < 0: sig = sig[-i:]; i = 0
    j = min(N, i + len(sig)); s = sig[:j - i] * g
    BL[i:j] += s * (1 - max(0, pan)); BR[i:j] += s * (1 + min(0, pan))
def env(n, a, d):
    t = np.arange(n) / SR; e = np.exp(-t / d); k = int(a * SR)
    if k > 0: e[:k] *= np.linspace(0, 1, k)
    return e
def lp1(x, c):                                   # one-pole low-pass
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += c * (x[i] - acc); y[i] = acc
    return y
def hp1(x, c): return x - lp1(x, c)
mf = lambda m: 440 * 2 ** ((m - 69) / 12)
T_END = next(t for t, k in SFX if k == 'end')

# ---------- night ambience: two crickets, a soft air bed, a moped far away ----------
amb_L = np.zeros(N); amb_R = np.zeros(N)
def cricket(f, period, pulses, pan, g, t0=0.0):
    n = int(.016 * SR); tt = np.arange(n) / SR; p = np.sin(2 * np.pi * f * tt) * np.sin(np.pi * tt / .016) ** 2
    t = t0
    while t < DUR:
        for k in range(pulses): add(p, t + k * .032, pan, g * (.85 + .3 * rng.random()), (amb_L, amb_R))
        t += period * (.92 + .16 * rng.random())
cricket(4650, .78, 3, -.55, .022, .1); cricket(5200, 1.13, 4, .6, .016, .45)
air = lp1(rng.standard_normal(N), .02) * .05
amb_L += air; amb_R += np.roll(air, 900)
def engine(t0, d, g=.03, pan=0, f0=62):
    n = int(d * SR); t2 = np.arange(n) / SR; u = t2 / d; f = f0 * (1 + .35 * np.sin(np.pi * u)) + 5 * np.sin(2 * np.pi * 9 * t2); ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sign(np.sin(ph)) * .5 + np.sin(2 * ph) * .35 + np.sin(3 * ph) * .15
    add(lp1(s, .1) * np.sin(np.pi * u) ** 1.4, t0, pan, g, (amb_L, amb_R))
engine(1.2, 5.0, .05, -.4)
# the ambience gets quieter on the phone close-ups and goes away under the end card
k = np.ones(N); i0 = int((T_END - .2) * SR); k[i0:] = np.linspace(1, 0, N - i0) ** 2
amb_L *= k; amb_R *= k

# ---------- music: soft marimba and bass, playful, under the dialogue; a little lift on the end card ----------
mus_L = np.zeros(N); mus_R = np.zeros(N)
BPM = 104; b = 60 / BPM
def marimba(m, g):
    n = int(.6 * SR); t = np.arange(n) / SR; f = mf(m)
    return (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * 30)) * env(n, .002, .16) * g
def bass(m, g, d=.32):
    n = int(d * SR); t = np.arange(n) / SR; f = mf(m)
    return np.tanh(1.4 * np.sin(2 * np.pi * f * t)) * env(n, .004, .12) * g
PROG = [(45, [69, 72, 76]), (41, [69, 72, 77]), (43, [67, 71, 74]), (40, [67, 71, 76])]   # Am F G Em
PAT = [0, None, 2, 1, None, 2, 0, None, 1, None, 2, None, 0, 1, None, 2]
t = .6; st = 0
while t < DUR - 1.2:
    bar = int((t - .6) / (4 * b)) % 4; root, ch = PROG[bar]; s16 = st % 16
    lift = 1.6 if t > T_END else 1.0
    if PAT[s16] is not None: add(marimba(ch[PAT[s16]], .05 * lift), t, .25 if s16 % 2 else -.25, 1, (mus_L, mus_R))
    if s16 in (0, 7, 10): add(bass(root, .11 * lift), t, 0, 1, (mus_L, mus_R))
    if s16 % 2 == 0:
        n = int(.05 * SR); add(hp1(rng.standard_normal(n), .6) * env(n, .003, .015), t, .3, .018 * lift, (mus_L, mus_R))
    st += 1; t += b / 4
# ducking: the music dips under each voice line
duck = np.ones(N)
for l in SK['lines']:
    a, z = int((l['t'] - .12) * SR), int((l['t'] + l['dur'] + .12) * SR)
    duck[max(0, a):min(N, z)] = .45
duck = np.convolve(duck, np.ones(int(.15 * SR)) / int(.15 * SR), 'same')
mus_L *= duck; mus_R *= duck

# ---------- small sounds ----------
def softclick(t0, g=.12):
    n = int(.05 * SR); tt = np.arange(n) / SR
    add(np.sin(2 * np.pi * 1700 * tt) * np.exp(-tt * 90) + hp1(rng.standard_normal(n), .45) * np.exp(-tt * 300) * .4, t0, 0, g)
def pop(t0, f=620, g=.16):
    m = int(.12 * SR); t2 = np.arange(m) / SR; add(np.sin(2 * np.pi * np.cumsum(f + 900 * np.exp(-t2 * 40)) / SR) * env(m, .002, .04), t0, .1, g)
def chime(t0, fs, g):
    for k2, f in enumerate(fs):
        n = int(1.3 * SR); tt = np.arange(n) / SR; add(np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3.4), t0 + k2 * .06, .3 - .3 * k2, g)
def tick(t0, g=.06, f=2600):
    n = int(.025 * SR); t2 = np.arange(n) / SR; add(np.sin(2 * np.pi * f * t2) * np.exp(-t2 * 260), t0, 0, g)
def spring(t0, g=.08):
    n = int(.32 * SR); t2 = np.arange(n) / SR; f = 260 + 220 * t2 / .32 + 60 * np.sin(2 * np.pi * 22 * t2)
    add(np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .004, .12), t0, -.2, g)
for t0, kind in SFX:
    if kind == 'pop': pop(t0); chime(t0 + .05, (1568.0, 2093.0, 2637.0), .045)
    elif kind == 'tap': softclick(t0)
    elif kind == 'slide': tick(t0); tick(t0 + .07, .04, 3100)
    elif kind == 'hop': spring(t0)
    elif kind == 'end': chime(t0, (1318.5, 1760.0, 2349.3), .08)

# ---------- mix: music + ambience + sounds, short outdoor reverb, then the voices ----------
irn = int(1.0 * SR); ir = rng.standard_normal(irn) * np.exp(-np.arange(irn) / SR / .22); ir = lp1(ir, .3); ir /= np.abs(ir).sum() ** .5 * 14
def conv(x):
    m = len(x) + len(ir); F = 1 << (m - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, F) * np.fft.rfft(ir, F), F)[:len(x)]
L = L + mus_L + amb_L; R = R + mus_R + amb_R
L = L + conv(L) * .3; R = R + conv(R) * .3
def pcm(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float64) / 32768
VL = np.zeros(N); VR = np.zeros(N)
for l in SK['lines']:
    v = pcm('assets/sketch1/' + l['file'] + '.mp3'); v = v / (np.abs(v).max() + 1e-9) * .8
    pan = -.12 if l['who'] == 'boni' else .12
    add(v, l['t'], pan, 1.0, (VL, VR))
VL = VL + conv(VL) * .12; VR = VR + conv(VR) * .12
L = L + VL; R = R + VR
fade = np.ones(N); k2 = int(1.2 * SR); fade[-k2:] = np.linspace(1, 0, k2) ** 1.5
fin = np.ones(N); k2 = int(.25 * SR); fin[:k2] = np.linspace(0, 1, k2)
L *= fade * fin; R *= fade * fin
pk = max(np.abs(L).max(), np.abs(R).max()); L /= pk * 1.05; R /= pk * 1.05
out = np.stack([L, R], 1)
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print('wrote', sys.argv[2], round(DUR, 2), 's')
