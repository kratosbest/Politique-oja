"""Sketch 3 in 2D cartoon (« Monsieur Je-connais-tout », oja_sketch_jct2d.html): timing. Voices: lines from the Google
Flow version (assets/sketch3/dub/dXX.mp3) and the new ones of version 2 (assets/sketch4/voix/nX.mp3), Tonton =
« Martinez », Grâce = « Alimata ». Places them with their pauses and the map insert, measures the mouth opening per video frame and keeps
the words for the subtitles. Writes assets/sketch4/marks.js (window.SK4) and marks.json.
  python3 src/sk4_marks.py"""
import json, subprocess, numpy as np
FPS = 30
S3, S4 = 'assets/sketch3/dub/', 'assets/sketch4/voix/'
# id, who, gap before (s), folder. Version 2 (Derrick's script): they walk, arrive at a hair salon, Tonton is the one who
# is surprised, Grâce asks the name and finds the maquis on the map OJA.
LINES = [('d01', 'tonton', .6, S3), ('d02', 'grace', .3, S3), ('d03', 'grace', .45, S3),
         ('n1', 'tonton', 1.5, S4),                   # they arrive in front of the salon
         ('n2', 'grace', .4, S4), ('n3', 'tonton', .3, S4),
         ('n4a', 'grace', 1.55, S4),                  # the map OJA insert starts before this line
         ('n4b', 'grace', .45, S4),
         ('d10', 'tonton', 2.3, S3),          # after « Allons-y »: a short walk to the maquis
         ('d11', 'grace', .3, S3)]

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
for n, who, gap, SRC in LINES:
    t += gap
    y, sr = pcm(SRC + n + '.mp3'); dur = len(y) / sr; hop = sr // FPS
    rms = np.array([np.sqrt(np.mean(y[i:i + hop * 2] ** 2) + 1e-9) for i in range(0, len(y), hop)])
    lev = np.convolve(np.clip((rms / (np.percentile(rms, 92) + 1e-6) - 0.08) / 0.75, 0, 1), [.25, .5, .25], 'same')
    ws = [[w.replace('Odja', 'OJA'), round(a, 3), round(b, 3)] for w, a, b in words(json.load(open(SRC + n + '.mp3.json')))]
    lines.append(dict(id=n, who=who, file=SRC + n + '.mp3', t=round(t, 3), dur=round(dur, 3), mouth=[round(float(v), 2) for v in lev], words=ws))
    t += dur
L = {l['id']: l for l in lines}
ev = dict(walk2=round(L['d03']['t'] - .1, 3), arrive=round(L['d03']['t'] + L['d03']['dur'] + .3, 3),
          insert=round(L['n3']['t'] + L['n3']['dur'] + .25, 3), back=round(L['n4b']['t'] - .2, 3),
          walk3=round(L['n4b']['t'] + L['n4b']['dur'] + .2, 3), maquis=round(L['d10']['t'] - .7, 3), end=round(t + .9, 3))
total = round(ev['end'] + 3.4, 2)
SK = dict(fps=FPS, lines=lines, ev=ev, total=total)
json.dump(SK, open('assets/sketch4/marks.json', 'w'), ensure_ascii=False)
open('assets/sketch4/marks.js', 'w').write('window.SK4 = ' + json.dumps(SK, ensure_ascii=False) + ';\n')
for l in lines: print(l['id'], l['who'], l['t'], l['dur'], ' '.join(w[0] for w in l['words']))
print(ev, 'total', total)
