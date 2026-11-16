# Talking-head ad « Ton enseigne » (oja_talk_enseigne.html, 9:16): sound. Derrick's voice (cut by src/tk1_edl.py, cleaned:
# work/talk1/voice.wav), a modern minimal beat (sub kick, soft snap, hats, warm electric-piano chords) ducked under the
# voice, cut dead on « tu n'existes pas » (a low boom, one second of room), back fuller after; small sounds on the
# animated words from the page (window.SFX dumped by src/sfx_dump.js): soft ticks, low hits on the big words, a thud on
# the « C'EST GRATUIT » stamp, a tap and a pop in the app; a chime and a last chord on the end card. No whoosh.
# usage (from motion/): python3 src/tk1_audio.py work/talk1/sfx.json work/talk1/mix.wav
import json, subprocess, sys, wave
import numpy as np
SFX = json.load(open(sys.argv[1])); TK = json.load(open('assets/talk1/marks.json'))
SR = 44100
END = next(t for t, k in SFX if k == 'end'); DUR = END + 3.6; N = int(SR * DUR)
T_DROP = next(t for t, k in SFX if k == 'drop'); T_BACK = TK['segs'][11]['t']
rng = np.random.default_rng(1180)
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

# ---------- the beat ----------
MU = buf(); BPM = 94; b = 60 / BPM
KN = int(.42 * SR); tk = np.arange(KN) / SR
KICK = np.sin(2 * np.pi * np.cumsum(46 + 90 * np.exp(-tk * 28)) / SR) * env(KN, .002, .18)
SN = int(.22 * SR); SNAP = hp1(rng.standard_normal(SN), .35) * env(SN, .001, .045) + np.sin(2 * np.pi * 190 * np.arange(SN) / SR) * env(SN, .001, .03) * .4
def epiano(m, d, g):                      # soft electric piano: sine + a little bell overtone, slow decay
    n = int(d * SR); tt = np.arange(n) / SR; f = mf(m)
    return (np.sin(2 * np.pi * f * tt) + .22 * np.sin(2 * np.pi * 2 * f * tt) * np.exp(-tt * 3) + .1 * np.sin(2 * np.pi * 7.01 * f * tt) * np.exp(-tt * 14)) * env(n, .006, .9) * g
CHORDS = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59]]   # Fmaj7 Em7 Dm7 Cmaj7
BASS = [41, 40, 38, 36]
t = 0.0; st = 0
while t < END + 2.6:
    bar = int(t / (4 * b)); s16 = st % 16; full = t >= T_BACK
    silent = T_DROP - .05 <= t < T_BACK - .02
    if not silent:
        if s16 == 0: [add(MU, epiano(m, 4 * b, .05), t, (-.3, -.1, .1, .3)[k]) for k, m in enumerate(CHORDS[bar % 4])]
        if s16 in (0, 10) or (full and s16 == 7): add(MU, KICK, t, 0, .55)
        if s16 in (4, 12): add(MU, SNAP, t, .1, .22 if full else .14)
        if s16 % 2 == 0: n = int(.04 * SR); add(MU, hp1(rng.standard_normal(n), .7) * env(n, .001, .012), t, .35 if s16 % 4 else -.25, .05 if full else .03)
        if s16 in (0, 6, 8) and full:
            n = int(.5 * SR); tt = np.arange(n) / SR; add(MU, np.tanh(1.5 * np.sin(2 * np.pi * mf(BASS[bar % 4]) * tt)) * env(n, .005, .25), t, 0, .12)
    st += 1; t += b / 4
# the voice is almost continuous: keep the music low under it and let it breathe on the end card
VO = pcm('work/talk1/voice.wav'); VO = VO / (np.abs(VO).max() + 1e-9) * .85
duck = np.full(N, .38); duck[int((TK['speech'] + .1) * SR):] = 1.0
k = int(.3 * SR); duck = np.convolve(duck, np.ones(k) / k, 'same')
MU = [MU[0] * duck, MU[1] * duck]

# ---------- small sounds ----------
FX = buf()
def tick(t0, g=.05):
    n = int(.03 * SR); tt = np.arange(n) / SR; add(FX, np.sin(2 * np.pi * 2300 * tt) * np.exp(-tt * 160) + hp1(rng.standard_normal(n), .5) * np.exp(-tt * 400) * .3, t0, .15, g)
def hit(t0, g=.22):
    n = int(.5 * SR); tt = np.arange(n) / SR
    add(FX, np.sin(2 * np.pi * np.cumsum(55 + 70 * np.exp(-tt * 20)) / SR) * env(n, .002, .16) + hp1(rng.standard_normal(n), .3) * np.exp(-tt * 90) * .25, t0, 0, g)
def stamp(t0):
    hit(t0, .3); n = int(.12 * SR); add(FX, lp1(rng.standard_normal(n), .25) * env(n, .001, .03), t0 + .005, 0, .25)
def boom(t0):
    n = int(2.2 * SR); tt = np.arange(n) / SR; add(FX, np.sin(2 * np.pi * np.cumsum(38 + 30 * np.exp(-tt * 4)) / SR) * env(n, .004, .7), t0, 0, .5)
def pop(t0, f=620, g=.14):
    m = int(.12 * SR); t2 = np.arange(m) / SR; add(FX, np.sin(2 * np.pi * np.cumsum(f + 900 * np.exp(-t2 * 40)) / SR) * env(m, .002, .04), t0, .1, g)
def chime(t0, fs, g):
    for k2, f in enumerate(fs):
        n = int(1.6 * SR); tt = np.arange(n) / SR; add(FX, np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3.0), t0 + k2 * .07, .3 - .3 * k2, g)
for t0, kd in SFX:
    if kd == 'tick': tick(t0)
    elif kd == 'hit': hit(t0, .16)
    elif kd == 'stamp': stamp(t0)
    elif kd == 'drop': boom(t0 - .02)
    elif kd == 'tap': tick(t0, .1)
    elif kd == 'pop': pop(t0)
    elif kd == 'end':
        chime(t0 + .05, (1318.5, 1760.0, 2349.3), .07)
        for kk, m in enumerate([60, 64, 67, 71, 74]): add(FX, epiano(m, 3.2, .06), t0 + .05, (-.3, -.15, 0, .15, .3)[kk])

# ---------- mix ----------
irn = int(.8 * SR); ir = rng.standard_normal(irn) * np.exp(-np.arange(irn) / SR / .15); ir = lp1(ir, .3); ir /= np.abs(ir).sum() ** .5 * 16
def conv(x):
    m = len(x) + len(ir); F = 1 << (m - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, F) * np.fft.rfft(ir, F), F)[:len(x)]
OUT = [MU[c] + FX[c] for c in range(2)]
V = np.zeros(N); V[:min(N, len(VO))] = VO[:N]
for c in range(2): OUT[c] += V + conv(V) * .04
fade = np.ones(N); k = int(1.2 * SR); fade[-k:] = np.linspace(1, 0, k) ** 1.5
pk = max(np.abs(OUT[0]).max(), np.abs(OUT[1]).max())
out = np.stack([OUT[0] * fade / (pk * 1.05), OUT[1] * fade / (pk * 1.05)], 1)
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print('wrote', sys.argv[2], round(DUR, 2), 's')
