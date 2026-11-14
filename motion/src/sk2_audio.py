# Sketch « L'adresse à la béninoise » (oja_sketch_adresse.html, 9:16): sound. Lines and events come from
# assets/sketch2/marks.json (src/sk2_marks.py), the small sounds and the scene changes from the page (window.SFX, saved by
# src/sfx_dump.js). A phone ring to open; crickets, air and the zem idling in the street; a bar's music heard from
# outside at Boni's; the real dog bark (assets/sketch2/chien.mp3, ElevenLabs sound effects) with the music cut for the
# gag; the moped leaving and arriving; pop and tap on the phone; a bell on the last bounce; a playful marimba bed under
# the dialogue. No whoosh.
# usage (from motion/): node src/sfx_dump.js oja_sketch_adresse.html work/sketch2/sfx.json
#   python3 src/sk2_audio.py work/sketch2/sfx.json work/sketch2/mix.wav
import json, subprocess, sys, wave
import numpy as np
SK = json.load(open('assets/sketch2/marks.json')); EV = SK['ev']
SFX = json.load(open(sys.argv[1]))
SR = 44100; DUR = SK['total']; N = int(SR * DUR)
rng = np.random.default_rng(2202)
def buf(): return [np.zeros(N), np.zeros(N)]
def add(B, sig, t, pan=0.0, g=1.0):
    i = int(t * SR)
    if i >= N: return
    if i < 0: sig = sig[-i:]; i = 0
    j = min(N, i + len(sig)); s = sig[:j - i] * g
    B[0][i:j] += s * (1 - max(0, pan)); B[1][i:j] += s * (1 + min(0, pan))
def env(n, a, d):
    t = np.arange(n) / SR; e = np.exp(-t / d); k = int(a * SR)
    if k > 0: e[:k] *= np.linspace(0, 1, k)
    return e
def lp1(x, c):
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += c * (x[i] - acc); y[i] = acc
    return y
def hp1(x, c): return x - lp1(x, c)
mf = lambda m: 440 * 2 ** ((m - 69) / 12)
def pcm(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float64) / 32768
T_END = next(t for t, k in SFX if k == 'end'); T_ARR = next(t for t, k in SFX if k == 'arrive')

# ---------- where we are: street (Sèna) or bar (Boni), from the page's shot list, with short crossfades ----------
place = np.zeros(N)                                    # 1 = street, 0 = bar
marks = sorted((t, k) for t, k in SFX if k in ('street', 'barplace'))
for (t0, k), nxt in zip(marks, marks[1:] + [(DUR, None)]):
    place[int(t0 * SR):int(nxt[0] * SR)] = 1.0 if k == 'street' else 0.0
sm = int(.08 * SR); place = np.convolve(place, np.ones(sm) / sm, 'same')

# ---------- street: crickets, air, the zem idling ----------
ST = buf()
def cricket(f, period, pulses, pan, g, t0=0.0):
    n = int(.016 * SR); tt = np.arange(n) / SR; p = np.sin(2 * np.pi * f * tt) * np.sin(np.pi * tt / .016) ** 2
    t = t0
    while t < DUR:
        for k in range(pulses): add(ST, p, t + k * .032, pan, g * (.85 + .3 * rng.random()))
        t += period * (.92 + .16 * rng.random())
cricket(4650, .78, 3, -.55, .02, .1); cricket(5200, 1.13, 4, .6, .014, .45)
air = lp1(rng.standard_normal(N), .02) * .05; ST[0] += air; ST[1] += np.roll(air, 900)
def engine_sig(d, f0=38, f1=None, g=1.0):
    n = int(d * SR); t2 = np.arange(n) / SR; f1 = f0 if f1 is None else f1
    f = f0 + (f1 - f0) * (t2 / d) + 2.5 * np.sin(2 * np.pi * 6 * t2); ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sign(np.sin(ph)) * .45 + np.sin(2 * ph) * .35 + np.sin(3 * ph) * .2 + .15 * hp1(rng.standard_normal(n), .3)
    return lp1(s, .06) * g
idle = engine_sig(DUR, 34)
zem_here = np.zeros(N); zem_here[:int((EV['ride1'] + 1.2) * SR)] = 1; zem_here[int((EV['ride1'] + 1.2) * SR):int(T_ARR * SR)] = 1
add(ST, idle * zem_here * .035, 0, -.3)
STREET_G = place; BAR_G = 1 - place

# ---------- bar: its music heard from outside (muffled), a few crickets ----------
BA = buf(); BPM2 = 112; b2 = 60 / BPM2; t = 0; st = 0
KN = int(.25 * SR); tk = np.arange(KN) / SR; KICK = np.sin(2 * np.pi * np.cumsum(50 + 70 * np.exp(-tk * 30)) / SR) * env(KN, .002, .1)
while t < DUR:
    s16 = st % 16
    if s16 % 4 == 0: add(BA, KICK, t, 0, .5)
    if s16 in (2, 6, 10, 14): n = int(.05 * SR); add(BA, hp1(rng.standard_normal(n), .5) * env(n, .002, .02), t, .2, .12)
    if s16 in (0, 3, 6, 10, 12): n = int(.3 * SR); tt = np.arange(n) / SR; m = [57, 60, 64, 62, 59][(st // 16) % 5]
    if s16 in (0, 3, 6, 10, 12): add(BA, np.sin(2 * np.pi * mf(m) * tt) * env(n, .003, .1), t, -.2, .18)
    st += 1; t += b2 / 4
BA = [lp1(BA[0], .05) * .55, lp1(BA[1], .05) * .55]          # through the wall
# the zem arrives at the bar
add(BA, engine_sig(1.2, 70, 36) * np.linspace(0, 1, int(1.2 * SR)) ** .5 * .1, T_ARR - .4, .4)
add(BA, engine_sig(DUR - T_ARR - .8, 34) * .03, T_ARR + .8, .1)

# ---------- music: playful marimba and bass under the dialogue, cut for the bark, a lift on the end card ----------
MU = buf(); BPM = 104; b = 60 / BPM
def marimba(m, g):
    n = int(.6 * SR); tt = np.arange(n) / SR; f = mf(m)
    return (np.sin(2 * np.pi * f * tt) + .35 * np.sin(2 * np.pi * 4 * f * tt) * np.exp(-tt * 30)) * env(n, .002, .16) * g
def bass(m, g, d=.32):
    n = int(d * SR); tt = np.arange(n) / SR
    return np.tanh(1.4 * np.sin(2 * np.pi * mf(m) * tt)) * env(n, .004, .12) * g
PROG = [(45, [69, 72, 76]), (41, [69, 72, 77]), (43, [67, 71, 74]), (40, [67, 71, 76])]
PAT = [0, None, 2, 1, None, 2, 0, None, 1, None, 2, None, 0, 1, None, 2]
t = .9; st = 0
while t < DUR - 1.0:
    bar = int((t - .9) / (4 * b)) % 4; root, ch = PROG[bar]; s16 = st % 16; lift = 1.6 if t > T_END else 1.0
    if not (EV['bark'] - .05 < t < EV['ride1']):
        if PAT[s16] is not None: add(MU, marimba(ch[PAT[s16]], .045 * lift), t, .25 if s16 % 2 else -.25)
        if s16 in (0, 7, 10): add(MU, bass(root, .1 * lift), t, 0)
        if s16 % 2 == 0: n = int(.05 * SR); add(MU, hp1(rng.standard_normal(n), .6) * env(n, .003, .015), t, .3, .016 * lift)
    st += 1; t += b / 4
duck = np.ones(N)
for l in SK['lines']:
    a, z = int((l['t'] - .12) * SR), int((l['t'] + l['dur'] + .12) * SR); duck[max(0, a):min(N, z)] = .42
k = int(.15 * SR); duck = np.convolve(duck, np.ones(k) / k, 'same')
MU = [MU[0] * duck, MU[1] * duck]

# ---------- small sounds ----------
FX = buf()
def ring(t0):
    for r in range(2):
        n = int(.42 * SR); tt = np.arange(n) / SR
        s = (np.sin(2 * np.pi * 440 * tt) + np.sin(2 * np.pi * 480 * tt)) * (np.sin(2 * np.pi * 20 * tt) > 0) * env(n, .005, 1)
        s[-int(.02 * SR):] *= np.linspace(1, 0, int(.02 * SR)); add(FX, s * .5, t0 + r * .55, .25, .07)
def softclick(t0, g=.12):
    n = int(.05 * SR); tt = np.arange(n) / SR
    add(FX, np.sin(2 * np.pi * 1700 * tt) * np.exp(-tt * 90) + hp1(rng.standard_normal(n), .45) * np.exp(-tt * 300) * .4, t0, 0, g)
def pop(t0, f=620, g=.16):
    m = int(.12 * SR); t2 = np.arange(m) / SR; add(FX, np.sin(2 * np.pi * np.cumsum(f + 900 * np.exp(-t2 * 40)) / SR) * env(m, .002, .04), t0, .1, g)
def chime(t0, fs, g):
    for k2, f in enumerate(fs):
        n = int(1.3 * SR); tt = np.arange(n) / SR; add(FX, np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3.4), t0 + k2 * .06, .3 - .3 * k2, g)
def spring(t0, g=.09):
    n = int(.32 * SR); t2 = np.arange(n) / SR; f = 260 + 220 * t2 / .32 + 60 * np.sin(2 * np.pi * 22 * t2)
    add(FX, np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .004, .12), t0, -.2, g)
def bell(t0, g=.1):
    for k2, f in enumerate((2093.0, 2637.0)):
        n = int(1.0 * SR); tt = np.arange(n) / SR; add(FX, (np.sin(2 * np.pi * f * tt) + .4 * np.sin(2 * np.pi * 2.76 * f * tt) * np.exp(-tt * 9)) * np.exp(-tt * 4), t0 + k2 * .09, .2, g)
bark = pcm('assets/sketch2/chien.mp3'); bark = bark / (np.abs(bark).max() + 1e-9)
for t0, kind in SFX:
    if kind == 'ring': ring(t0)
    elif kind == 'bark': add(FX, bark, t0, .35, .55)
    elif kind == 'boing': spring(t0)
    elif kind == 'ride': add(FX, engine_sig(1.3, 36, 82) * np.r_[np.linspace(.4, 1, int(.9 * SR)), np.linspace(1, 0, int(1.3 * SR) - int(.9 * SR))] * .12, t0, -.2)
    elif kind == 'pop': pop(t0); chime(t0 + .05, (1568.0, 2093.0, 2637.0), .045)
    elif kind == 'tap': softclick(t0)
    elif kind == 'ding': bell(t0)
    elif kind == 'end': chime(t0, (1318.5, 1760.0, 2349.3), .08)

# ---------- mix ----------
irn = int(1.0 * SR); ir = rng.standard_normal(irn) * np.exp(-np.arange(irn) / SR / .22); ir = lp1(ir, .3); ir /= np.abs(ir).sum() ** .5 * 14
def conv(x):
    m = len(x) + len(ir); F = 1 << (m - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, F) * np.fft.rfft(ir, F), F)[:len(x)]
endfade = np.ones(N); i0 = int((T_END - .2) * SR); endfade[i0:] = np.linspace(1, .15, N - i0)
OUT = [np.zeros(N), np.zeros(N)]
for c in range(2):
    amb = ST[c] * STREET_G + BA[c] * BAR_G
    OUT[c] = amb * endfade + MU[c] + FX[c]
    OUT[c] = OUT[c] + conv(OUT[c]) * .28
VO = buf()
for l in SK['lines']:
    v = pcm('assets/sketch2/' + l['file'] + '.mp3'); v = v / (np.abs(v).max() + 1e-9) * .8
    add(VO, v, l['t'], -.1 if l['who'] == 'boni' else .1)
for c in range(2): OUT[c] += VO[c] + conv(VO[c]) * .1
fade = np.ones(N); k = int(1.2 * SR); fade[-k:] = np.linspace(1, 0, k) ** 1.5
fin = np.ones(N); k = int(.2 * SR); fin[:k] = np.linspace(0, 1, k)
pk = max(np.abs(OUT[0]).max(), np.abs(OUT[1]).max())
out = np.stack([OUT[0] * fade * fin / (pk * 1.05), OUT[1] * fade * fin / (pk * 1.05)], 1)
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print('wrote', sys.argv[2], round(DUR, 2), 's')
