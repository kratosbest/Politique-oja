"""Sketch 2 « L'adresse à la béninoise » timing: places the 13 dialogue lines (work/sketch2/lines.json, voices in
assets/sketch2/lXX.mp3), the dog bark, the zem rides and the phone insert, measures the mouth opening per video frame
and keeps the spoken words for the subtitles. Writes assets/sketch2/marks.js (window.SK2) and marks.json.
  python3 src/sk2_marks.py"""
import json, subprocess, numpy as np
D = 'assets/sketch2/'
FPS = 30
LINES = json.load(open('work/sketch2/lines.json'))           # [id, who, text with [tags]]
GAP = {'01': 1.1, '02': .3, '03': .25, '04': .3, '05': .3, '06': .3, '08': 1.45, '09': .3, '10': 1.3, '11': .3,
       '12': .35, '13': .3, '16': 4.6}
# subtitles show the words as the user wrote them (the voice files use spellings that help the pronunciation)
SHOW = {'kékénon': 'kêkênon', 'kékénon.': 'kêkênon.', 'Odja': 'Oja', 'Mahou': 'Mahou'}

def pcm(path, sr=16000):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(sr), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768, sr

def words(txt, st, en):
    out, cur, a, b, tag = [], '', None, None, False
    for ch, s, e in zip(txt, st, en):
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

t = 0.0; lines = []; ev = {}
for n, who, _ in LINES:
    t += GAP[n]
    if n == '08': ev['bark'] = round(t - 1.3, 3)               # the dog barks just before Sèna panics
    if n == '10': ev['ride1'] = round(t - 1.2, 3)              # the zem takes him back to the pharmacy
    if n == '16': ev['insert_end'] = round(t - 1.6, 3); ev['ride2'] = round(t - 1.5, 3)   # map, then arrival at the bar
    tm = json.load(open(D + f'l{n}.mp3.json'))
    y, sr = pcm(D + f'l{n}.mp3'); dur = len(y) / sr; hop = sr // FPS
    rms = np.array([np.sqrt(np.mean(y[i:i + hop * 2] ** 2) + 1e-9) for i in range(0, len(y), hop)])
    lev = np.clip((rms / (np.percentile(rms, 92) + 1e-6) - 0.08) / 0.75, 0, 1)
    lev = np.convolve(lev, [.25, .5, .25], 'same')
    ws = words(''.join(tm['characters']), tm['character_start_times_seconds'], tm['character_end_times_seconds'])
    for w in ws: w[0] = ' '.join(SHOW.get(x, x) for x in w[0].split())
    lines.append(dict(id=n, who=who, file=f'l{n}', t=round(t, 3), dur=round(dur, 3), mouth=[round(float(v), 2) for v in lev],
                      words=[[w[0], round(w[1], 3), round(w[2], 3)] for w in ws]))
    t += dur
ev['end'] = round(t + 1.6, 3)
total = round(ev['end'] + 3.4, 2)
SK = dict(fps=FPS, lines=lines, ev=ev, total=total)
json.dump(SK, open(D + 'marks.json', 'w'))
open(D + 'marks.js', 'w').write('window.SK2 = ' + json.dumps(SK) + ';\n')
for L in lines: print(L['id'], L['who'], L['t'], L['dur'], ' '.join(w[0] for w in L['words'])[:70])
print(ev, 'total', total)
