"""Talking-head ad « Ton enseigne » (oja_talk_enseigne.html, 9:16): the edit. Derrick films himself (work/talk1/src.mp4, not
in git); his words come from the speech-to-text (work/talk1/stt.json, ElevenLabs Scribe with word timings). Keeps the
phrases below, cuts the cough, the « euh » and the long pauses (jump cuts, hidden by a new framing at every cut), snaps
every cut to the quietest point of the voice nearby, and writes assets/talk1/marks.js (window.TK) with the segments, the
words on the output timeline (for the animated words) and the mouth-free timing of each phrase.
  python3 src/tk1_edl.py"""
import json, subprocess, numpy as np
FPS = 30
# source phrases (s): start of the first word, end of the last word, as heard; one entry = one cut
PHRASES = [(4.12, 5.20), (6.60, 7.72), (9.60, 10.38), (11.30, 12.22), (13.66, 15.18), (16.92, 17.50), (18.00, 19.34),
           (20.46, 21.98), (24.34, 24.90), (25.38, 26.32), (29.00, 29.84), (31.32, 35.38), (36.00, 37.86),
           (39.46, 40.58), (42.42, 44.02), (44.92, 45.48)]
FIX = {'insigne,': 'enseigne,', 'insigne.': 'enseigne.', 'Maps.': 'la map.', 'Odia,': 'OJA,', 'gratuit': 'gratuit.'}

raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', 'work/talk1/src.mp4', '-vn', '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
y = np.frombuffer(raw, np.int16).astype(np.float32) / 32768; SR = 16000; hop = 160
rms = np.array([np.sqrt(np.mean(y[i:i + hop * 2] ** 2) + 1e-12) for i in range(0, len(y), hop)])   # 100 per second
def quiet(a, b):                       # quietest 10 ms step between a and b (s)
    i0, i1 = int(a * 100), max(int(a * 100) + 1, int(b * 100)); return (i0 + int(np.argmin(rms[i0:i1]))) / 100
words = [w for w in json.load(open('work/talk1/stt.json'))['words'] if w['type'] == 'word']
segs, t = [], 0.0
for a, b in PHRASES:
    s0 = quiet(a - .22, a - .03); s1 = quiet(b + .06, b + .3)
    ws = [[FIX.get(w['text'], w['text']), round(t + w['start'] - s0, 3), round(t + w['end'] - s0, 3)] for w in words if a - .01 <= w['start'] <= b]
    segs.append(dict(src=[s0, s1], t=round(t, 3), dur=round(s1 - s0, 3), words=ws)); t += s1 - s0
total = round(t, 3)
TK = dict(fps=FPS, segs=segs, speech=total)
json.dump(TK, open('assets/talk1/marks.json', 'w'), ensure_ascii=False)
open('assets/talk1/marks.js', 'w').write('window.TK = ' + json.dumps(TK, ensure_ascii=False) + ';\n')
for s in segs: print(f"{s['t']:6.2f} {s['dur']:5.2f} src {s['src'][0]:6.2f}-{s['src'][1]:6.2f}", ' '.join(w[0] for w in s['words']))
print('speech', total, 's')
