# OJA mascot tutorial « Ajouter un lieu » (oja_ajout_lieu_mascotte.html, 9:16): music, small sounds and the mascot's voice.
# Scene lengths and voice lines come from assets/lieu2/voix_marks.json (src/lieu2_marks.py).
# A light, friendly Afro-house groove (100 BPM: kick, shaker, log drum, soft plucks; no clap under the voice), a chime on
# the intro, a lift on the final map, and a soft end. Small sounds on the animations come from the page (window.SFX, saved
# by src/sfx_dump.js): a soft click on every tap, typing, a success sound when the place is published or checked, a pop
# when the pin drops. No whoosh. Each voice line starts in its scene (marks 'lead') and the music dips under it.
# usage (from motion/): node src/sfx_dump.js oja_ajout_lieu_mascotte.html work/lieu2/sfx.json
#   python3 src/music41.py work/lieu2/sfx.json work/lieu2/mix.wav assets/lieu2/voix_ajout_lieu.mp3
import json, subprocess, sys, wave
import numpy as np
MK = json.load(open('assets/lieu2/voix_marks.json'))
ST = [0.0]
for d in MK['dur']: ST.append(ST[-1] + d)
SR = 44100; DUR = ST[-1]; N = int(SR * DUR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(4141)
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

BPM = 100; b = 60 / BPM
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

# ---------- the music ----------
pad(0, 1.2, [45, 52, 57, 60], g=.07, a=.6, rel=.6)
chime(.95, (1175, 1760, 2349, 2960), .09)                                            # the mascot lands
groove(1.0, ST[8], bright=.9, full=False, gain=1.25)
pad(ST[8], DUR - .6, [41, 53, 57, 60, 64], g=.05, a=.8, rel=.8)
groove(ST[8], DUR - 2.0, bright=1.1, full=True, gain=1.35, bar0=bars(1.0, ST[8]))     # the final map: a little lift

# ---------- small sounds from the page ----------
def softclick(t0, g=.10):
    n = int(.05 * SR); tt = np.arange(n) / SR
    add((np.sin(2 * np.pi * 1700 * tt) * np.exp(-tt * 90) + hp(rng.standard_normal(n), .45) * np.exp(-tt * 300) * .4), t0, g=g)
for t, k, d in SFX:
    if k == 'tap': softclick(t, .11)
    elif k == 'type': typing(t, d or 1.0, .07, .045)
    elif k == 'done': success(t, .09)
    elif k == 'tick': tick(t, .08, 2600); success(t + .04, .06)
    elif k == 'pop': pop(t, 620, .13); chime(t + .05, (1567.98, 2093.0, 2637.0), .05)
    elif k == 'land': boom(t, .25, 90, 40, .7)
    elif k == 'end': chime(t, (1318.5, 1760.0, 2349.3), .08)

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
# ---------- the voice: each line in its scene, the music dips under it ----------
if len(sys.argv) > 3:
    v = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[3], '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout, np.float32).astype(float)
    VOc = np.zeros(N); lines = MK['line']
    for i, (a, b) in enumerate(lines):
        a0 = a - .04; b0 = min(b + .25, lines[i + 1][0] - .05) if i + 1 < len(lines) else b + .5
        seg = v[int(a0 * SR):int(b0 * SR)].copy(); k = int(.01 * SR); seg[:k] *= np.linspace(0, 1, k); seg[-k:] *= np.linspace(1, 0, k)
        j = int((ST[i] + MK['lead'][i] - .04) * SR); VOc[j:j + len(seg)] += seg[:N - j]
    VOc = VOc / np.abs(VOc).max() * .9; VOc = VOc + conv(VOc, ir[:int(.6 * SR)]) * .05
    e = np.abs(VOc); k = int(.03 * SR); e = np.convolve(e, np.ones(k) / k, 'same'); e = lp(e, .0015)
    duck = 1 - .55 * np.clip(e / .06, 0, 1)
    L = L * .5 * duck + VOc * .95; R = R * .5 * duck + VOc * .95
pk = max(np.abs(L).max(), np.abs(R).max()); L /= pk / .95; R /= pk / .95
st = (np.stack([L, R], 1) * 32767).astype(np.int16)
with wave.open(sys.argv[2], 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', round(DUR, 2), 's,', len(SFX), 'sounds', 'with voice' if len(sys.argv) > 3 else 'music only')
