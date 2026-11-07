"""Video 4 (« Du champ au marché »): builds the edit from Derrick's takes (rushes/IMG_10xx.mp4), the word timings (scribe) and the hand motion
(work/motion_IMG_10xx.npy, 10 values per second), so that the gestures and their holds are kept while the idle waits are removed.

usage (from video4/): python3 src/cut.py
- « Bloc N » is never kept; in IMG_1074 the first try of « Tu veux un cultivateur à la source ? … Voilà. » is dropped;
- kept: every word (± a small margin) and every burst of hand motion in a silence next to it (0.15 s before, 0.3 s after: the hold,
  1 s at most), only if it starts within 1.3 s after a word or ends within 1 s before the next one; the rest of a silence is cut;
- the answers play 10 % faster (SPEED), video and voice together;
- writes data/edit_data.json (words, motion bursts, cuts and blocks on the edit timeline) and work/edit.mp4 (24 fps, AAC 48 kHz).
"""
import json, subprocess
import numpy as np
FPS_M, SPEED, TAIL = 10, 1.1, 0.0
PLAN = [('IMG_1073', 1, set(range(0, 2))), ('IMG_1074', 2, set(range(0, 2)) | set(range(11, 24))), ('IMG_1075', 3, set(range(0, 2))),
        ('IMG_1076', 4, set(range(0, 2))), ('IMG_1077', 5, set(range(0, 3))), ('IMG_1078', 6, set(range(0, 2))),
        ('IMG_1079', 7, set(range(0, 2))), ('IMG_1080', 8, set(range(0, 2)))]
def words(take):
    d = json.load(open(f'work/stt/{take}.json')); return [w for w in d['words'] if w['type'] == 'word']
def bursts(take):
    m = np.load(f'work/motion_{take}.npy'); thr = 1.8 * np.median(m); on = m > thr; out, i = [], 0
    while i < len(on):
        if on[i]:
            j = i
            while j < len(on) and on[j]: j += 1
            if j - i >= 2: out.append([i / FPS_M, j / FPS_M, float(m[i:j].max())])
            i = j
        else: i += 1
    return out
segs, out_words, out_motion, cuts, blocks, t = [], [], [], [], [], 0.0
for take, blk, drop in PLAN:
    W, M = words(take), bursts(take)
    kept = [i for i in range(len(W)) if i not in drop]
    dropped = [(W[i]['start'] - .1, W[i]['end'] + .1) for i in drop]
    def in_drop(a, b): return any(a < d1 and b > d0 for d0, d1 in dropped)
    iv = []                                   # intervals of the rush to keep
    for k, i in enumerate(kept):
        w = W[i]; iv.append([w['start'] - (.22 if k == 0 else .08), w['end'] + .08])
        if k + 1 < len(kept):
            a, b = w['end'], W[kept[k + 1]]['start']
            for m0, m1, _ in M:
                s0, s1 = max(a, m0 - .15), min(b, m1 + .3)
                if s1 <= s0 or in_drop(s0, s1): continue
                if s0 > a + 1.3 and s1 < b - 1.0: continue        # a gesture in the middle of a long wait: not for this line
                s1 = min(s1, s0 + 1.0)                            # a gesture and its hold: 1 s at most
                iv.append([s0, s1])
    iv[-1][1] += .5
    iv.sort(); merged = []
    for a, b in iv:
        if merged and a - merged[-1][1] < .15: merged[-1][1] = max(merged[-1][1], b)
        else: merged.append([a, b])
    for k, (a, b) in enumerate(merged):
        a = max(0, a); fr = max(1, round((b - a) / SPEED * 24))
        segs.append({'take': take, 'blk': blk, 'a': round(a, 3), 'b': round(b, 3), 'frames': fr, 'big': 1 if (a - merged[k - 1][1] if k else 9) > .6 else 0,
                     'words': [[W[i]['text'], W[i]['start'], W[i]['end'], i] for i in kept if a <= W[i]['start'] < b],
                     'motion': [[m0, m1, round(pk, 1)] for m0, m1, pk in M if a <= m0 < b]})
# each segment is cut on its own (one big filter graph over 8 takes runs out of memory), then concatenated
import os, concurrent.futures as cf
os.makedirs('work/segs', exist_ok=True)
def one(k):
    s = segs[k]; d = s['b'] - s['a'] + .2; out = f'work/segs/s{k:03d}.mp4'; L = s['frames'] / 24
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f"{s['a']:.3f}", '-t', f'{d:.3f}', '-i', f"rushes/{s['take']}.mp4",
                    '-vf', f'setpts=PTS/{SPEED},fps=24,format=yuv420p,trim=end_frame={s["frames"]}', '-af', f'aresample=48000,atempo={SPEED},atrim=0:{L:.5f},afade=t=in:d=0.008,afade=t=out:st={L - .008:.4f}:d=0.008',
                    '-c:v', 'libx264', '-crf', '16', '-preset', 'fast', '-r', '24', '-ac', '1', '-c:a', 'aac', '-ar', '48000', '-b:a', '192k', out], check=True)
    return out
with cf.ThreadPoolExecutor(3) as ex: files = list(ex.map(one, range(len(segs))))
open('work/segs/list.txt', 'w').write(''.join(f"file '{os.path.basename(f)}'\n" for f in files))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'work/segs/list.txt', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-r', '24', '-c:a', 'aac', '-ar', '48000', '-b:a', '192k', 'work/edit.mp4'], check=True)
for k, f in enumerate(files):
    segs[k]['frames'] = int(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-count_packets', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip())
for k, sg in enumerate(segs):
    if not blocks or blocks[-1][2] != sg['blk']: blocks.append([round(t, 3), None, sg['blk']])
    if k: cuts.append([round(t, 3), sg['big']])
    for txt, s0, s1, i in sg['words']: out_words.append([txt, round(t + (s0 - sg['a']) / SPEED, 3), round(t + (min(s1, sg['b']) - sg['a']) / SPEED, 3), sg['take'], i, sg['blk']])
    for m0, m1, pk in sg['motion']: out_motion.append([round(t + (m0 - sg['a']) / SPEED, 3), round(t + (min(m1, sg['b']) - sg['a']) / SPEED, 3), pk, sg['blk']])
    t += sg['frames'] / 24; blocks[-1][1] = round(t, 3)
json.dump([{k: v for k, v in sg.items() if k not in ('words', 'motion')} for sg in segs], open('work/edl.json', 'w'), indent=0)
json.dump({'words': out_words, 'motion': out_motion, 'cuts': cuts, 'blocks': blocks, 'dur': round(t, 3)}, open('data/edit_data.json', 'w'), ensure_ascii=False)
n = len(segs)
print(f'{n} segments, {t:.2f} s, blocks {[(b[2], round(b[1] - b[0], 1)) for b in blocks]}')
