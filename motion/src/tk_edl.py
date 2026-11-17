"""Talking-head ads of the campaign « Avant, on demandait. Aujourd'hui, on cherche. » (oja_talk.html?v=<name>): the edit.
Reads the take (work/talk_<name>/src.mp4, not in git) and its speech-to-text with word timings (work/talk_<name>/stt.json,
ElevenLabs Scribe), keeps every stretch of speech between `from` and `to` (src/talks/<name>.json), cuts the pauses longer
than `gap`, snaps each cut to the quietest point of the voice nearby, and fixes the words the speech-to-text heard wrong
because of the accent (`fix`, word by word: « aînés » → « zem, »). Writes assets/talk_<name>/marks.js (window.TK): the
segments, every word on the output timeline, and the total speech time.
  python3 src/tk_edl.py <name>"""
import json, subprocess, sys, numpy as np
name = sys.argv[1]; cfg = json.load(open(f'src/talks/{name}.json')); W = f'work/talk_{name}/'
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', W + 'src.mp4', '-vn', '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
y = np.frombuffer(raw, np.int16).astype(np.float32) / 32768; hop = 160
rms = np.array([np.sqrt(np.mean(y[i:i + hop * 2] ** 2) + 1e-12) for i in range(0, len(y), hop)])
def quiet(a, b):
    i0, i1 = int(a * 100), max(int(a * 100) + 1, int(b * 100)); return (i0 + int(np.argmin(rms[i0:i1]))) / 100
words = [w for w in json.load(open(W + 'stt.json'))['words'] if w['type'] == 'word' and cfg['from'] <= w['start'] <= cfg['to']]
if 'keep' in cfg:                          # only these stretches (s): e.g. the Goun parts, without the French cue lines
    words = [w for w in words if any(a <= w['start'] < b for a, b in cfg['keep'])]
    for w in words:                         # a word that runs past the end of its stretch is cut there
        for a, b in cfg['keep']:
            if a <= w['start'] < b: w['end'] = min(w['end'], b)
blocks, cur = [], [words[0]]
for w in words[1:]:
    if w['start'] - cur[-1]['end'] > cfg['gap']: blocks.append(cur); cur = []
    cur.append(w)
blocks.append(cur)
blocks = [b for b in blocks if any(ch.isalpha() for w in b for ch in w['text'])]   # a lone « ? » is not speech
# a long silence inside a block (a word the speech-to-text stretched over a pause) is cut too
lvl = 10 * np.log10(np.convolve(rms ** 2, np.ones(15) / 15, 'same') + 1e-12)   # level smoothed over 0.15 s
quiet_db = np.percentile(lvl, 10) + 6                                          # just above the room noise
def split_silences(b):
    out, cur = [], [b[0]]
    for w in b[1:] + [None]:
        last = cur[-1]; i0, i1 = int(last['start'] * 100), int(last['end'] * 100)
        quiet_run, best = 0, None
        for i in range(i0, i1):
            if lvl[i] < quiet_db: quiet_run += 1
            else: quiet_run = 0
            if quiet_run == 50: best = (i - 49) / 100
        if best is not None:                # end the word at the start of the silence
            last['end'] = best + .05
        if w is None: break
        if best is not None: out.append(cur); cur = []
        cur.append(w)
    out.append(cur); return out
blocks = [nb for b in blocks for nb in split_silences(b)]
segs, t, prev_end = [], 0.0, 0.0
for k, b in enumerate(blocks):
    s0 = max(prev_end, quiet(b[0]['start'] - .18, b[0]['start'] - .02))
    nxt = blocks[k + 1][0]['start'] if k + 1 < len(blocks) else b[-1]['end'] + .4
    s1 = quiet(b[-1]['end'] + .04, min(b[-1]['end'] + .22, nxt - .02)); prev_end = s1
    ws = [[cfg['fix'].get(w['text'], w['text']), round(t + w['start'] - s0, 3), round(t + w['end'] - s0, 3)] for w in b]
    ws = [w for w in ws if w[0]]
    segs.append(dict(src=[s0, s1], t=round(t, 3), dur=round(s1 - s0, 3), words=ws)); t += s1 - s0
TK = dict(fps=30, segs=segs, speech=round(t, 3), words=[w for s in segs for w in s['words']])
import os; os.makedirs(f'assets/talk_{name}', exist_ok=True)
json.dump(TK, open(f'assets/talk_{name}/marks.json', 'w'), ensure_ascii=False)
open(f'assets/talk_{name}/marks.js', 'w').write('window.TK = ' + json.dumps(TK, ensure_ascii=False) + ';\n')
for i, s in enumerate(segs): print(f"{i:2d} {s['t']:6.2f} {s['dur']:5.2f}", ' '.join(f"{w[0]}@{w[1]:.2f}" for w in s['words']))
print(name, 'speech', TK['speech'], 's in', len(segs), 'cuts')
