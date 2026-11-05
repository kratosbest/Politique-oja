"""Video 3 (« Pourquoi télécharger OJA ? »): builds the edit from Derrick's takes (rushes/IMG_10xx.mp4) and the word timings (scribe).

usage (from video3/): python3 src/cut.py
- each answer keeps its words; silences longer than 0.3 s become 0.18 s (0.3 s after a comma or a sentence), a few real pauses are kept;
- the answers play 10 % faster (video and voice together, SPEED), which keeps the voice natural;
- before blocks 1 to 5, a question segment: Derrick's frame just before he speaks, frozen (the question card covers it, the
  question voice assets/q/qN.mp3 plays there);
- block 4 = first sentence of IMG_1044 (« Il cherche un pagne ou un bon atassi. ») + IMG_1038 (the clean take of the rest);
- « comme à Tokpa » is dropped from block 2 (it repeats « maman de Tokpa »);
- a 5 s frozen tail after « Merci » for the end card;
- writes work/edl.json, data/edit_data.json (words, cuts, questions, blocks on the edit timeline) and work/edit.mp4 (24 fps, AAC 48 kHz).
"""
import json, subprocess
Q = {k: float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'assets/q/q{k}.mp3'],
                              capture_output=True, text=True).stdout) for k in range(1, 6)}
def words(take):
    d = json.load(open(f'work/stt/{take}.json')); return [w for w in d['words'] if w['type'] == 'word']
# (kind, ...): ('q', n) question n | ('t', take, first word, last word, block, {word index: kept pause before it})
PLAN = [('q', 1), ('t', 'IMG_1035', 0, 38, 1, {36: .85}),
        ('q', 2), ('t', 'IMG_1037', 0, 60, 2, {1: .45}),   # « comme à Tokpa » (words 11-13) is dropped, see DROP
        ('q', 3), ('t', 'IMG_1043', 0, 39, 3, {2: .4}),
        ('q', 4), ('t', 'IMG_1044', 0, 7, 4, {}), ('t', 'IMG_1038', 0, 32, 4, {}),
        ('q', 5), ('t', 'IMG_1039', 0, 26, 5, {}),
        ('t', 'IMG_1040', 0, 35, 6, {1: .5, 2: .45}),
        ('t', 'IMG_1041', 0, 27, 7, {1: .5, 22: .5, 24: .5}),
        ('t', 'IMG_1042', 0, 18, 8, {12: .6, 18: .7})]
DROP = {'IMG_1037': {11, 12, 13}}
TAIL = 5.0
SPEED = 1.1
segs, out_words, cuts, questions, blocks, t = [], [], [], [], [], 0.0
for item in PLAN:
    if item[0] == 'q':
        n = item[1]; nxt = PLAN[PLAN.index(item) + 1]; W = words(nxt[1])
        d = round(Q[n] + .7, 3); f = max(0, W[nxt[2]]['start'] - .2)
        segs.append({'kind': 'freeze', 'take': nxt[1], 'at': f, 'dur': d}); questions.append([round(t, 3), round(t + d, 3), n]); t += d
        cuts.append([round(t, 3), 1]); continue
    _, take, a, b, blk, keep = item; W = words(take)
    if not blocks or blocks[-1][2] != blk:
        blocks.append([round(t, 3), None, blk])
    parts = []
    for i in range(a, b + 1):
        if i in DROP.get(take, ()): continue
        w = W[i]
        if not parts:
            parts.append([max(0, w['start'] - .22), w['end'], [i]]); continue
        gap = w['start'] - parts[-1][1]
        prev_txt = W[parts[-1][2][-1]]['text']
        want = keep.get(i, (.3 if prev_txt[-1:] in '.?!,' else .18) if gap > .3 else None)
        if want is None:
            parts[-1][1] = w['end']; parts[-1][2].append(i)
        else:
            half = min(want, gap) / 2
            parts[-1][1] += half; parts.append([w['start'] - half, w['end'], [i]])
    parts[-1][1] += .45 if item is not PLAN[-1] else 1.0
    for k, (s, e, idx) in enumerate(parts):
        if k or segs:
            removed = (s - parts[k - 1][1]) if k else 1
            cuts.append([round(t, 3), 1 if removed > .7 else 0])
        for i in idx:
            w = W[i]; out_words.append([w['text'], round(t + (w['start'] - s) / SPEED, 3), round(t + (min(w['end'], e) - s) / SPEED, 3), take, i, blk])
        segs.append({'kind': 'clip', 'take': take, 'a': round(s, 3), 'b': round(e, 3)}); t += (e - s) / SPEED
    blocks[-1][1] = round(t, 3)
last = segs[-1]
segs.append({'kind': 'freeze', 'take': last['take'], 'at': last['b'] - .05, 'dur': TAIL}); end_card = round(t, 3); t += TAIL
cuts = [c for c in cuts if c[0] > 0]
json.dump(segs, open('work/edl.json', 'w'), indent=0)
json.dump({'words': out_words, 'cuts': cuts, 'questions': questions, 'blocks': blocks, 'end_card': end_card, 'dur': round(t, 3)},
          open('data/edit_data.json', 'w'), ensure_ascii=False)
# ffmpeg: one input per take, trim/concat, 8 ms audio fades at every cut, silence under the frozen frames
takes = sorted({s['take'] for s in segs}); ix = {k: i for i, k in enumerate(takes)}
fc = []
for k, s in enumerate(segs):
    i = ix[s['take']]
    if s['kind'] == 'clip':
        fc.append(f"[{i}:v]trim={s['a']:.3f}:{s['b']:.3f},setpts=(PTS-STARTPTS)/{SPEED},fps=24,format=yuv420p[v{k}]")
        fc.append(f"[{i}:a]atrim={s['a']:.3f}:{s['b']:.3f},asetpts=PTS-STARTPTS,aresample=48000,atempo={SPEED},afade=t=in:d=0.008,afade=t=out:st={(s['b'] - s['a']) / SPEED - .008:.3f}:d=0.008[a{k}]")
    else:
        fc.append(f"[{i}:v]trim={s['at']:.3f}:{s['at'] + .05:.3f},setpts=PTS-STARTPTS,fps=24,format=yuv420p,trim=end_frame=1,tpad=stop_mode=clone:stop_duration={s['dur']:.3f}[v{k}]")
        fc.append(f"aevalsrc=0:c=mono:s=48000:d={s['dur']:.3f}[a{k}]")
n = len(segs)
fc.append(''.join(f"[v{k}][a{k}]" for k in range(n)) + f"concat=n={n}:v=1:a=1[v][a]")
open('work/cut_filter.txt', 'w').write(';\n'.join(fc))
cmd = ['ffmpeg', '-v', 'error', '-y']
for tk in takes: cmd += ['-i', f'rushes/{tk}.mp4']
cmd += ['-filter_complex_script', 'work/cut_filter.txt', '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-r', '24',
        '-ac', '1', '-c:a', 'aac', '-ar', '48000', '-b:a', '192k', 'work/edit.mp4']
subprocess.run(cmd, check=True)
print(f'{n} segments, {t:.2f} s, end card at {end_card}, questions {questions}, blocks {blocks}')
