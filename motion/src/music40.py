# OJA « Une journée avec OJA », motion design in collage style (oja_journee_collage.html, 53 s, 9:16): music and small sounds, no voice.
# - 0 to 4.5 s: dark, a low pad and a clock that ticks (the hourglass), a hit on « ÇA FILE. »;
# - 4.5 to 46.5 s: a light Afro-house groove (104 BPM: kick, clap, shaker, log drum, plucks), stripped down on the dark NOVOJA scene;
# - 46.5 s: end card, a low hit and a chime, the groove thins out, fade out in the last 1.5 s.
# Small sounds on the animations come from the page (window.SFX, saved by src/sfx_dump.js). No whoosh: each cut is a short
# reversed chord that grows into it.
# usage (from motion/): node src/sfx_dump.js oja_journee_collage.html work/jcol/sfx.json && python3 src/music40.py work/jcol/sfx.json work/jcol/music.wav
import json, sys, wave
import numpy as np
SR = 44100; DUR = 53.0; N = int(SR * DUR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(4040)
SFX = json.load(open(sys.argv[1]))

def add(sig, t, pan=0.0, g=1.0):
    i = int(t * SR)
    if i >= N: return
    if i < 0: sig = sig[-i:]; i = 0
    j = min(N, i + len(sig)); s = sig[:j - i] * g
    L[i:j] += s * (1 - max(0, pan)); R[i:j] += s * (1 + min(0, pan))
def env(n, a, d):
    t = np.arange(n) / SR; e = np.exp(-t / d); k = int(a * SR)
    if k > 0: e[:k] *= np.linspace(0, 1, k)
    return e
def lp(x, c):
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc += c * (x[i] - acc); y[i] = acc
    return y
def hp(x, c): return x - lp(x, c)
mf = lambda m: 440 * 2 ** ((m - 69) / 12)

def boom(t0, g=1.0, f0=100, f1=34, d=1.4):
    n = int(d * SR); tt = np.arange(n) / SR; fr = f1 + (f0 - f1) * np.exp(-tt * 9)
    add(np.tanh(1.5 * np.sin(2 * np.pi * np.cumsum(fr) / SR)) * env(n, .003, d * .33), t0, g=g)
def pad(t0, t1, notes, g=.06, a=.8, rel=.8):
    n = int((t1 - t0 + rel) * SR); tt = np.arange(n) / SR; s = np.zeros(n)
    for m in notes:
        f = mf(m); s += np.sin(2 * np.pi * f * tt) + .22 * np.sin(2 * np.pi * 2 * f * tt) + .08 * np.sin(2 * np.pi * 3 * f * tt)
    e = np.minimum(1, tt / a) * np.clip((t1 - t0 + rel - tt) / rel, 0, 1)
    add(lp(s, .07) * e / len(notes) ** .5, t0, g=g)
def chime(t0, fs=(1760, 2637, 3520), g=.12):
    for k, f in enumerate(fs):
        n = int(1.4 * SR); tt = np.arange(n) / SR; add(np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3.2), t0 + k * .06, pan=.3 - .3 * k, g=g)
def pluck(m, d=.5, g=.1):
    n = int(d * SR); t = np.arange(n) / SR; f = mf(m)
    return (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 18) + .2 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * 30)) * env(n, .002, .14) * g
def logd(m, d=.45, g=.3):
    n = int(d * SR); t = np.arange(n) / SR; f = mf(m) * (1 + .6 * np.exp(-t * 40))
    return np.tanh(1.8 * np.sin(2 * np.pi * np.cumsum(f) / SR)) * env(n, .003, .16) * g
kn = int(.3 * SR); tt = np.arange(kn) / SR; KICK = np.sin(2 * np.pi * np.cumsum(45 + 80 * np.exp(-tt * 28)) / SR) * env(kn, .002, .12)
def clap(t0, g=.18):
    n = int(.18 * SR); x = hp(rng.standard_normal(n), .35); e = np.zeros(n)
    for k, o in enumerate((0, .011, .022)): i = int(o * SR); e[i:] += np.exp(-np.arange(n - i) / SR / (.012 if k < 2 else .06))
    add(x * e * .6, t0, g=g, pan=.05)
def shaker(t0, g=.05, pan=0):
    n = int(.06 * SR); add(hp(rng.standard_normal(n), .6) * env(n, .004, .018), t0, g=g, pan=pan)
def click(t0, g=.12):
    n = int(.03 * SR); t = np.arange(n) / SR; add((hp(rng.standard_normal(n), .5) * .6 + np.sin(2 * np.pi * 2400 * t)) * env(n, .0005, .006), t0, g=g, pan=rng.uniform(-.2, .2))
def pop(t0, f=600, g=.16):
    m = int(.12 * SR); t2 = np.arange(m) / SR; add(np.sin(2 * np.pi * np.cumsum(f + 900 * np.exp(-t2 * 40)) / SR) * env(m, .002, .04), t0, g=g, pan=rng.uniform(-.5, .5))
def tick(t0, g=.07, f=3200):
    n = int(.025 * SR); t2 = np.arange(n) / SR; add(np.sin(2 * np.pi * f * t2) * np.exp(-t2 * 260), t0, g=g)
def tock(t0, g=.09, f=1800):                     # the lower half of a clock tick
    n = int(.04 * SR); t2 = np.arange(n) / SR; add((np.sin(2 * np.pi * f * t2) + .5 * hp(rng.standard_normal(n), .4)) * np.exp(-t2 * 180), t0, g=g)
def knock(t0, g=.2):                             # a pin landing on the map / two pieces fitting together
    n = int(.12 * SR); t2 = np.arange(n) / SR; f = 210 + 160 * np.exp(-t2 * 50)
    add(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t2 * 38) + lp(rng.standard_normal(n), .3) * np.exp(-t2 * 120) * .5, t0, g=g)
def success(t0, g=.12):
    for k, f in enumerate((1318.5, 1975.5)):
        n = int(.9 * SR); t2 = np.arange(n) / SR; add((np.sin(2 * np.pi * f * t2) + .3 * np.sin(2 * np.pi * 2 * f * t2)) * np.exp(-t2 * 5), t0 + k * .1, g=g, pan=-.2 + .4 * k)
def ping(t0, g=.1):
    for k, f in enumerate((1046.5, 1568.0)):
        n = int(.7 * SR); t2 = np.arange(n) / SR; add((np.sin(2 * np.pi * f * t2) + .25 * np.sin(2 * np.pi * 2 * f * t2)) * np.exp(-t2 * 6), t0 + k * .09, g=g, pan=-.2 + .4 * k)
def typing(t0, d, step=.055, g=.05):
    tk = t0
    while tk < t0 + d: click(tk, g * (.8 + .4 * rng.random())); tk += step * (.8 + .4 * rng.random())
def swell(tc, notes, d=.42, g=.1):
    """reversed pluck chord that grows into the cut at tc and stops on it (instead of a whoosh)"""
    n = int(d * SR); s = np.zeros(n)
    for m in notes: s += pluck(m, d, 1.0)[:n]
    s = lp(s[::-1], .25) / len(notes) ** .5; k = int(.008 * SR); s[-k:] *= np.linspace(1, 0, k)
    add(s, tc - d, g=g)
def engine(t0, d, g=.03, pan=0, f0=62):
    """a moped passing far away"""
    n = int(d * SR); t2 = np.arange(n) / SR; u = t2 / d; f = f0 * (1 + .35 * np.sin(np.pi * u)) + 5 * np.sin(2 * np.pi * 9 * t2); ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sign(np.sin(ph)) * .5 + np.sin(2 * ph) * .35 + np.sin(3 * ph) * .15; add(lp(s, .1) * np.sin(np.pi * u) ** 1.4, t0, g=g, pan=pan)

BPM = 104; b = 60 / BPM
PROG = [[45, 57, 60, 64], [41, 53, 57, 60], [43, 55, 59, 62], [40, 52, 55, 59]]     # Am F G Em
def groove(T0, END, bright=1.0, full=True, gain=1.0, bar0=0):
    t = T0; step = 0
    while t < END - .02:
        bar = (bar0 + int((t - T0) / (4 * b))) % 4; s16 = step % 16; ch = PROG[bar]
        if s16 % 4 == 0: add(KICK, t, g=.34 * gain)
        if full and s16 in (4, 12): clap(t, .1 * gain)
        shaker(t, (.026 if s16 % 2 else .04) * gain, pan=.35 if s16 % 2 else -.35)
        if s16 in (0, 6, 10): add(logd(ch[0]), t, g=.55 * gain)
        if full and s16 in (2, 5, 8, 11, 14): add(pluck(ch[1 + (s16 // 3) % 3] + 12, g=.05 * bright * gain), t, pan=(-.3 if s16 % 2 else .3))
        step += 1; t += b / 4
    for k in range(int((END - T0) / (4 * b)) + 1):
        t0 = T0 + k * 4 * b; ch = PROG[(bar0 + k) % 4]
        if t0 < END: pad(t0, min(t0 + 4 * b, END) - .05, [m + 12 for m in ch[1:]], g=.026 * gain, a=.2, rel=.3)
def bars(t0, t1): return int((t1 - t0) / (4 * b) + .5)

# ---------- 1. the hook: dark, time ticking ----------
pad(0, 4.5, [33, 45, 52, 57], g=.09, a=1.2, rel=.4)
for k in range(8): (tick if k % 2 == 0 else tock)(.25 + k * .25, .08)
for k in range(5): (tick if k % 2 == 0 else tock)(2.55 + k * .38, .05)
# ---------- 2-7: the groove, scene by scene ----------
groove(4.5, 25.5, bright=1.1, full=True, gain=1.5)
groove(25.5, 32.5, bright=.8, full=False, gain=1.2, bar0=bars(4.5, 25.5))           # NOVOJA (dark): no clap, no pluck
pad(25.5, 32.4, [45, 52, 57, 60], g=.05, a=.6, rel=.3)
groove(32.5, 46.5, bright=1.25, full=True, gain=1.55, bar0=bars(4.5, 32.5))
engine(5.2, 1.8, .03, pan=-.3)                                                       # the ride
# ---------- 8. the end card ----------
groove(46.5, 50.2, bright=.9, full=False, gain=1.1)
pad(46.5, 52.0, [33, 45, 52, 57, 60, 64, 69], g=.07, a=.15, rel=1.0)
chime(46.55, (1175, 1760, 2349, 2960), .1)

# ---------- small sounds from the page ----------
CUT_CH = [[57, 64, 69], [55, 62, 67], [53, 60, 65], [52, 59, 64]]
cuts = 0
for t, k in SFX:
    if k == 'hit': boom(t, .5, 95, 32, 1.4); click(t, .12)
    elif k == 'pop': pop(t, 560 + rng.integers(0, 4) * 90, .12)
    elif k == 'tick': tick(t, .09, 2600); click(t + .01, .06)
    elif k == 'done': tick(t, .09, 2600); success(t + .05, .09)
    elif k == 'stamp': boom(t + .05, .42, 80, 30, .9); click(t + .05, .18); knock(t + .05, .14)
    elif k == 'snap': knock(t, .26); chime(t + .03, (1567.98, 2093.0, 2637.0), .06)
    elif k == 'split': boom(t, .38, 70, 30, 1.2); knock(t + .1, .12)
    elif k == 'tac': knock(t, .22); ping(t + .04, .07)
    elif k == 'type': typing(t, 1.25, .05, .05)
    elif k == 'cut':
        swell(t, CUT_CH[cuts % 4], .42, .14); boom(t, .22, 70, 34, .6); cuts += 1

# ---------- reverb + master ----------
irn = int(1.6 * SR); ir = rng.standard_normal(irn) * np.exp(-np.arange(irn) / SR / 0.45); ir = lp(ir, .25); ir /= np.abs(ir).sum() ** .5 * 12
def conv(x, irx=ir):
    m = len(x) + len(irx); F = 1 << (m - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, F) * np.fft.rfft(irx, F), F)[:len(x)]
L = L + conv(L) * .38; R = R + conv(R) * .38
fade = np.ones(N); k = int(1.5 * SR); fade[-k:] = np.linspace(1, 0, k) ** 1.5
fin = np.ones(N); k = int(.3 * SR); fin[:k] = np.linspace(0, 1, k)
L *= fade * fin; R *= fade * fin
pk = max(np.abs(L).max(), np.abs(R).max()); L = np.tanh(1.6 * L / pk) / np.tanh(1.6); R = np.tanh(1.6 * R / pk) / np.tanh(1.6)
pk = max(np.abs(L).max(), np.abs(R).max()); L /= pk / .95; R /= pk / .95
st = (np.stack([L, R], 1) * 32767).astype(np.int16)
with wave.open(sys.argv[2], 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', DUR, 's,', len(SFX), 'sounds,', cuts, 'cuts')
