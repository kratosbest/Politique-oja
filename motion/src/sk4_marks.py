"""Sketch 3 in 2D cartoon (« Monsieur Je-connais-tout », oja_sketch_jct2d.html): timing. Reuses the voices made for the
Google Flow version (assets/sketch3/dub/dXX.mp3, Tonton = « Martinez », Grâce = « Alimata », whole sentences), places
them with their pauses, the awkward silence and the map insert, measures the mouth opening per video frame and keeps
the words for the subtitles. Writes assets/sketch4/marks.js (window.SK4) and marks.json.
  python3 src/sk4_marks.py"""
import json, subprocess, numpy as np
FPS = 30
SRC = 'assets/sketch3/dub/'
# id, who, gap before (s)
LINES = [('d01', 'tonton', .6), ('d02', 'grace', .3), ('d03', 'grace', .45),
         ('d04', 'tonton', .9), ('d05', 'grace', .35), ('d06', 'tonton', .25),
         ('d07', 'tonton', 3.9),                      # the awkward silence (crickets, « wah-wah »)
         ('d08', 'grace', .7), ('d09', 'tonton', 3.0),  # the map insert sits in this gap
         ('d10', 'tonton', 1.0), ('d11', 'grace', .3)]

def pcm(path, sr=16000):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(sr), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768, sr

def words(tm):
    out, cur, a, b, tag = [], '', None, None, False
    for ch, s, e in zip(tm['characters'], tm['character_start_times_seconds'], tm['character_end_times_seconds']):
        if ch == '[': tag = True
        if tag:
            if ch == ']': tag = False
            continue
        if ch.isspace():
            if cur: out.append([cur, a, b]); cur = ''
            continue
        if not cur: a = s
        cur += ch; b = e
    if cur: out.append([cur, a, b])
    return out

t = 0.0; lines = []
for n, who, gap in LINES:
    t += gap
    y, sr = pcm(SRC + n + '.mp3'); dur = len(y) / sr; hop = sr // FPS
    rms = np.array([np.sqrt(np.mean(y[i:i + hop * 2] ** 2) + 1e-9) for i in range(0, len(y), hop)])
    lev = np.convolve(np.clip((rms / (np.percentile(rms, 92) + 1e-6) - 0.08) / 0.75, 0, 1), [.25, .5, .25], 'same')
    ws = [[w.replace('Odja', 'OJA'), round(a, 3), round(b, 3)] for w, a, b in words(json.load(open(SRC + n + '.mp3.json')))]
    lines.append(dict(id=n, who=who, file=n, t=round(t, 3), dur=round(dur, 3), mouth=[round(float(v), 2) for v in lev], words=ws))
    t += dur
L = {l['id']: l for l in lines}
ev = dict(salon=round(L['d04']['t'] - .5, 3), silence=round(L['d06']['t'] + L['d06']['dur'] + .15, 3),
          street2=round(L['d08']['t'] - .35, 3), insert=round(L['d08']['t'] + L['d08']['dur'] + .1, 3),
          back=round(L['d09']['t'] - .25, 3), maquis=round(L['d10']['t'] - .6, 3), end=round(t + .9, 3))
total = round(ev['end'] + 3.4, 2)
SK = dict(fps=FPS, lines=lines, ev=ev, total=total)
json.dump(SK, open('assets/sketch4/marks.json', 'w'), ensure_ascii=False)
open('assets/sketch4/marks.js', 'w').write('window.SK4 = ' + json.dumps(SK, ensure_ascii=False) + ';\n')
for l in lines: print(l['id'], l['who'], l['t'], l['dur'], ' '.join(w[0] for w in l['words']))
print(ev, 'total', total)
