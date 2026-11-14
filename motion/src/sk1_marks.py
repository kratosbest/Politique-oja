"""Sketch 1 timing: places the 4 dialogue lines, measures the mouth opening per video frame from each voice file,
and cuts the subtitles. Writes assets/sketch1/marks.js (window.SK) and marks.json.
  python3 src/sk1_marks.py"""
import json, subprocess, numpy as np
D = 'assets/sketch1/'
FPS = 30
LINES = [  # who, file, gap before, subtitle chunks (split after these characters of the spoken text)
    ('boni', 'l1', 0.8), ('sena', 'l2', 0.35), ('sena', 'l3', 0.45), ('boni', 'l4', 0.3)]
TAIL = 3.9  # WhatsApp tap on the phone, then the end card

def pcm(path, sr=16000):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(sr), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768, sr

def words(txt, st, en):
    """Spoken words with start/end, from the per-character timings (tags like [excité] removed)."""
    out, cur, a = [], '', None
    for ch, s, e in zip(txt, st, en):
        if ch.isspace():
            if cur: out.append([cur, a, b]); cur = ''
            continue
        if not cur: a = s
        cur += ch; b = e
    if cur: out.append([cur, a, b])
    return [w for w in out if not (w[0].startswith('[') or w[0].endswith(']'))]

t = 0.0; lines = []; total = 0
for who, f, gap in LINES:
    t += gap
    tm = json.load(open(D + f + '.mp3.json'))
    y, sr = pcm(D + f + '.mp3'); dur = len(y) / sr
    hop = sr // FPS
    rms = np.array([np.sqrt(np.mean(y[i:i + hop * 2] ** 2) + 1e-9) for i in range(0, len(y), hop)])
    ref = np.percentile(rms, 92) + 1e-6
    lev = np.clip((rms / ref - 0.08) / 0.75, 0, 1)
    lev = np.convolve(lev, [.25, .5, .25], 'same')
    ws = words(''.join(tm['characters']), tm['character_start_times_seconds'], tm['character_end_times_seconds'])
    for w in ws: w[0] = w[0].replace('Odja', 'OJA')
    lines.append(dict(who=who, file=f, t=round(t, 3), dur=round(dur, 3), mouth=[round(float(v), 2) for v in lev],
                      words=[[w[0], round(w[1], 3), round(w[2], 3)] for w in ws]))
    t += dur
total = round(t + TAIL, 2)
SK = dict(fps=FPS, lines=lines, total=total)
json.dump(SK, open(D + 'marks.json', 'w'))
open(D + 'marks.js', 'w').write('window.SK = ' + json.dumps(SK) + ';\n')
for L in lines: print(L['who'], L['t'], L['dur'], ' '.join(w[0] for w in L['words']))
print('total', total)
