"""Video 1: first cut of Derrick's rush (rushes/IMG_1012.mp4) from the word timings (scribe).

usage: python3 src/cut.py work/rush_stt.json
- silences longer than 0.55 s are shortened to 0.3 s; the real pause before « mais invisible » is kept (1.4 s);
- the stumble « que naît, que est né » becomes « C'est de là que naît OJA »;
- writes work/edl.json (kept intervals), work/words.json (words on the edit timeline), work/edit.mp4 (24 fps, AAC 48 kHz).
"""
import json, subprocess, sys
d = json.load(open(sys.argv[1]))
W = [w for w in d['words'] if w.get('type') == 'word']
DROP = set(range(111, 114))          # « que est né » (after « naît, »)
KEEP_PAUSE = {88: 1.4}               # word index -> silence kept before it
PAD = .12
words = [(i, w) for i, w in enumerate(W) if i not in DROP]
segs = []                            # [start, end] in the rush
for k, (i, w) in enumerate(words):
    s, e = w['start'], w['end']
    if not segs:
        segs.append([max(0, s - .25), e]); continue
    gap = s - segs[-1][1]
    want = KEEP_PAUSE.get(i, .3 if gap > .55 else None)
    if want is None:
        segs[-1][1] = e              # natural gap: keep it as is
    else:
        half = min(want, gap) / 2
        segs[-1][1] = segs[-1][1] + half
        segs.append([s - half, e])
segs[-1][1] += .5
out_words, t, j = [], 0.0, 0
for a, b in segs:
    for i, w in words:
        if a <= w['start'] < b:
            out_words.append([w['text'], round(t + w['start'] - a, 3), round(t + min(w['end'], b) - a, 3), i])
    t += b - a
json.dump(segs, open('work/edl.json', 'w'))
json.dump(out_words, open('work/words.json', 'w'), ensure_ascii=False)
# build the edit: trim + concat, 8 ms audio fades at every cut
fc, n = [], len(segs)
for k, (a, b) in enumerate(segs):
    fc.append(f"[0:v]trim={a:.3f}:{b:.3f},setpts=PTS-STARTPTS[v{k}]")
    fc.append(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.008,afade=t=out:st={b - a - .008:.3f}:d=0.008[a{k}]")
fc.append(''.join(f"[v{k}][a{k}]" for k in range(n)) + f"concat=n={n}:v=1:a=1[v][a]")
open('work/cut_filter.txt', 'w').write(';\n'.join(fc))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'rushes/IMG_1012.mp4', '-filter_complex_script', 'work/cut_filter.txt', '-map', '[v]', '-map', '[a]',
                '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-r', '24', '-c:a', 'aac', '-ar', '48000', '-b:a', '192k', 'work/edit.mp4'], check=True)
print(f'{n} segments, {t:.2f} s')
