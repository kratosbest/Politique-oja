# Sketch 3 in 2D (oja_sketch_jct2d.html, 9:16): sound, built like src/sk3_audio.py for the Google Flow version: a modern
# city street (soft traffic, birds), loud crickets in the awkward silence with a comic « wah-wah », the maquis terrace,
# a playful marimba bed under the dialogue (cut for the silence), a spring when Tonton opens his arms, pop and tap on the
# phone, a chime on the end card, and the voices (assets/sketch3/dub/dXX.mp3, whole lines) at their places in
# assets/sketch4/marks.json (src/sk4_marks.py).
# usage (from motion/): python3 src/sk4_audio.py work/sketch4/mix.wav
import json, subprocess, sys, wave
import numpy as np
SK = json.load(open('assets/sketch4/marks.json')); EV = SK['ev']
for l in SK['lines']: l['tt'] = l['t']
SK['pieces'] = [dict(id=l['id'], who=l['who'], t=l['t'], dur=l['dur']) for l in SK['lines']]
SR = 44100; DUR = SK['total']; N = int(SR * DUR)
rng = np.random.default_rng(3303)
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
def gate(t0, t1, fade=.12):
    g = np.zeros(N); a, b = int(t0 * SR), int(min(t1, DUR) * SR); g[a:b] = 1
    k = int(fade * SR); return np.convolve(g, np.ones(k) / k, 'same')

T_SIL0 = EV['silence']; T_SIL1 = next(l['t'] for l in SK['lines'] if l['id'] == 'd07')
T_MAQ = EV['maquis']

# ---------- street: soft traffic, birds, a far horn ----------
ST = buf()
traffic = lp1(rng.standard_normal(N), .012) * .55 + lp1(rng.standard_normal(N), .05) * .08
ST[0] += traffic; ST[1] += np.roll(traffic, 1500)
def bird(t0, pan):
    n = int(.09 * SR); tt = np.arange(n) / SR; f = 3200 + 1400 * np.sin(np.pi * tt / .09) + 300 * np.sin(2 * np.pi * 40 * tt)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / .09) ** 2
    for k in range(rng.integers(2, 4)): add(ST, s, t0 + k * .12, pan, .02)
t = .8
while t < DUR: bird(t, rng.uniform(-.7, .7)); t += rng.uniform(1.6, 3.4)
for th in (5.2, 27.5):
    n = int(.35 * SR); tt = np.arange(n) / SR; add(ST, lp1(np.sign(np.sin(2 * np.pi * 410 * tt)) * env(n, .01, .3), .2), th, .6, .012)
street = gate(0, T_MAQ) * (1 - .55 * gate(T_SIL0, T_SIL1))

# ---------- the awkward silence: loud crickets ----------
CR = buf()
def cricket(f, period, pulses, pan, g, t0, t1):
    n = int(.016 * SR); tt = np.arange(n) / SR; p = np.sin(2 * np.pi * f * tt) * np.sin(np.pi * tt / .016) ** 2
    t = t0
    while t < t1:
        for k in range(pulses): add(CR, p, t + k * .032, pan, g * (.85 + .3 * rng.random()))
        t += period * (.92 + .16 * rng.random())
cricket(4650, .62, 3, -.4, .07, T_SIL0 + .5, T_SIL1 + .2); cricket(5200, .91, 4, .45, .05, T_SIL0 + .8, T_SIL1 + .2)

# ---------- the maquis terrace: people talking, music from inside ----------
MQ = buf()
mur = lp1(rng.standard_normal(N), .08); am = lp1(np.abs(rng.standard_normal(N)), .0004) * 3
MQ[0] += hp1(mur, .02) * am * .25; MQ[1] += np.roll(hp1(mur, .02) * am * .25, 2000)
BPM2 = 112; b2 = 60 / BPM2; t = T_MAQ; st = 0
KN = int(.25 * SR); tk = np.arange(KN) / SR; KICK = np.sin(2 * np.pi * np.cumsum(50 + 70 * np.exp(-tk * 30)) / SR) * env(KN, .002, .1)
while t < DUR:
    s16 = st % 16
    if s16 % 4 == 0: add(MQ, KICK, t, 0, .3)
    if s16 in (0, 3, 6, 10, 12):
        n = int(.3 * SR); tt = np.arange(n) / SR; m = [57, 60, 64, 62, 59][(st // 16) % 5]
        add(MQ, np.sin(2 * np.pi * mf(m) * tt) * env(n, .003, .1), t, -.2, .12)
    st += 1; t += b2 / 4
MQ = [lp1(MQ[0], .08), lp1(MQ[1], .08)]
maquis = gate(T_MAQ, DUR)

# ---------- music: playful marimba bed, silent during the awkward pause, a lift on the end card ----------
MU = buf(); BPM = 104; b = 60 / BPM
def marimba(m, g):
    n = int(.6 * SR); tt = np.arange(n) / SR; f = mf(m)
    return (np.sin(2 * np.pi * f * tt) + .35 * np.sin(2 * np.pi * 4 * f * tt) * np.exp(-tt * 30)) * env(n, .002, .16) * g
def bass(m, g, d=.32):
    n = int(d * SR); tt = np.arange(n) / SR
    return np.tanh(1.4 * np.sin(2 * np.pi * mf(m) * tt)) * env(n, .004, .12) * g
PROG = [(45, [69, 72, 76]), (41, [69, 72, 77]), (43, [67, 71, 74]), (40, [67, 71, 76])]
PAT = [0, None, 2, 1, None, 2, 0, None, 1, None, 2, None, 0, 1, None, 2]
t = .3; st = 0
while t < DUR - .8:
    bar = int((t - .3) / (4 * b)) % 4; root, ch = PROG[bar]; s16 = st % 16; lift = 1.6 if t > EV['end'] else 1.0
    if not (T_SIL0 - .05 < t < T_SIL1 + 1.6):
        if PAT[s16] is not None: add(MU, marimba(ch[PAT[s16]], .045 * lift), t, .25 if s16 % 2 else -.25)
        if s16 in (0, 7, 10): add(MU, bass(root, .1 * lift), t, 0)
        if s16 % 2 == 0: n = int(.05 * SR); add(MU, hp1(rng.standard_normal(n), .6) * env(n, .003, .015), t, .3, .016 * lift)
    st += 1; t += b / 4
duck = np.ones(N)
for p in SK['pieces']:
    a, z = int((p['t'] - .12) * SR), int((p['t'] + p['dur'] + .12) * SR); duck[max(0, a):min(N, z)] = .42
k = int(.15 * SR); duck = np.convolve(duck, np.ones(k) / k, 'same')
MU = [MU[0] * duck, MU[1] * duck]

# ---------- small sounds ----------
FX = buf()
def wahwah(t0, g=.09):
    """muted-trumpet « wah wah wah waaah » (sawtooth through a moving low-pass), the classic comic letdown"""
    for k, (m, d) in enumerate(((62, .32), (61, .32), (60, .32), (59, 1.1))):
        n = int(d * SR); tt = np.arange(n) / SR; f = mf(m) * (1 + (.012 * np.sin(2 * np.pi * 6 * tt) if k == 3 else 0 * tt))
        ph = np.cumsum(f) / SR; saw = 2 * (ph % 1) - 1
        e = np.minimum(1, tt / .03) * np.clip((d - tt) / .08, 0, 1)
        wah = .5 - .5 * np.cos(2 * np.pi * np.minimum(tt / .28, 1))
        y = np.zeros(n); acc = 0.0; cs = .03 + .12 * wah
        for i in range(n): acc += cs[i] * (saw[i] - acc); y[i] = acc
        add(FX, y * e, t0 + sum(x[1] for x in ((62, .32), (61, .32), (60, .32))[:k]) * 1.0, -.1, g)
def softclick(t0, g=.12):
    n = int(.05 * SR); tt = np.arange(n) / SR
    add(FX, np.sin(2 * np.pi * 1700 * tt) * np.exp(-tt * 90) + hp1(rng.standard_normal(n), .45) * np.exp(-tt * 300) * .4, t0, 0, g)
def pop(t0, f=620, g=.16):
    m = int(.12 * SR); t2 = np.arange(m) / SR; add(FX, np.sin(2 * np.pi * np.cumsum(f + 900 * np.exp(-t2 * 40)) / SR) * env(m, .002, .04), t0, .1, g)
def chime(t0, fs, g):
    for k2, f in enumerate(fs):
        n = int(1.3 * SR); tt = np.arange(n) / SR; add(FX, np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3.4), t0 + k2 * .06, .3 - .3 * k2, g)
wahwah(T_SIL0 - .05)
pop(EV['insert'] + .45); chime(EV['insert'] + .5, (1568.0, 2093.0, 2637.0), .045)
softclick(EV['insert'] + 1.85)
chime(EV['end'], (1318.5, 1760.0, 2349.3), .08)
def spring(t0, g=.08):
    n = int(.32 * SR); t2 = np.arange(n) / SR; f = 260 + 220 * t2 / .32 + 60 * np.sin(2 * np.pi * 22 * t2)
    add(FX, np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .004, .12), t0, -.2, g)
d04 = next(l for l in SK['lines'] if l['id'] == 'd04')
spring(d04['t'] + next(w[1] for w in d04['words'] if w[0].startswith('Voil')) - .05)

# ---------- mix ----------
irn = int(1.0 * SR); ir = rng.standard_normal(irn) * np.exp(-np.arange(irn) / SR / .2); ir = lp1(ir, .3); ir /= np.abs(ir).sum() ** .5 * 14
def conv(x):
    m = len(x) + len(ir); F = 1 << (m - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, F) * np.fft.rfft(ir, F), F)[:len(x)]
endfade = np.ones(N); i0 = int((EV['end'] - .2) * SR); endfade[i0:] = np.linspace(1, .2, N - i0)
OUT = [np.zeros(N), np.zeros(N)]
for c in range(2):
    OUT[c] = (ST[c] * street * .9 + CR[c] + MQ[c] * maquis) * endfade + MU[c] + FX[c]
VO = buf()
for p in SK['pieces']:
    v = pcm(f"assets/sketch3/dub/{p['id']}.mp3"); v = v / (np.abs(v).max() + 1e-9) * .8
    add(VO, v, p['t'], -.08 if p['who'] == 'tonton' else .08)
for c in range(2): OUT[c] += VO[c] + conv(VO[c]) * .08
fade = np.ones(N); k = int(1.0 * SR); fade[-k:] = np.linspace(1, 0, k) ** 1.5
fin = np.ones(N); k = int(.15 * SR); fin[:k] = np.linspace(0, 1, k)
pk = max(np.abs(OUT[0]).max(), np.abs(OUT[1]).max())
out = np.stack([OUT[0] * fade * fin / (pk * 1.05), OUT[1] * fade * fin / (pk * 1.05)], 1)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print('wrote', sys.argv[1], round(DUR, 2), 's')
