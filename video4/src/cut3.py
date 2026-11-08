"""Video 4, version 3 (seated, no gestures): cut of the takes, one take per block (TAKES below).
- follows the words (Scribe, work/v3/stt_NNNN.json): « Bloc N » and the retakes are dropped,
  the silences are brought down to 0.3 s, and the pauses where an effect lands keep about 0.8 s;
- each take ends just after its last word, before Derrick leans in to stop the phone;
- the answers play 6 % faster.
Writes work/v3/edit.mp4, data/v3/edit_data.json and data/v3/montage_data.js (EDIT + the outline of Benin).
usage (from video4/): python3 src/cut3.py"""
import concurrent.futures as cf, json, os, re, subprocess

SPEED = 1.06
GAP = .30          # silence kept between two phrases (rush seconds)
# takes of 8 Nov 2026 (closer framing, the wall with the frames behind him). The first seated series (IMG_1082 to 1089) is in the git history.
# IMG_1095 is silent and IMG_1099 is an aborted take: not used. Block 4 was filmed again (IMG_1102), a little further from the camera.
TAKES = [('IMG_1092', 1), ('IMG_1093', 2), ('IMG_1094', 3), ('IMG_1102', 4), ('IMG_1096', 5), ('IMG_1097', 6), ('IMG_1098', 7), ('IMG_1100', 8)]
# words dropped: [from, to) in rush seconds. Before the first value: « Bloc N ».
DROP = {
    'IMG_1092': [(0, 2.6), (4.25, 5.35)],                       # « quand tu te lances, », said again just after
    'IMG_1093': [(0, 1.6)], 'IMG_1094': [(0, 8.5)], 'IMG_1102': [(0, 3.6)], 'IMG_1096': [(0, 1.5)], 'IMG_1097': [(0, 1.4)],
    'IMG_1098': [(0, 4.5)],                                     # « Télécha- » is removed from the transcript (work/v3/stt_1098.json)
    'IMG_1100': [(0, .6)],
}
# longer pauses (rush seconds) before the word starting at that time: the effect lands there
PAUSE = {('IMG_1092', 16.12): 1.0, ('IMG_1093', 15.64): .9, ('IMG_1094', 49.12): .8, ('IMG_1094', 55.44): .5, ('IMG_1102', 34.44): .7,
         ('IMG_1100', 6.60): .8, ('IMG_1100', 91.18): .8, ('IMG_1100', 94.04): .6}
TAIL = {'IMG_1092': .9, 'IMG_1093': .6, 'IMG_1094': .7, 'IMG_1102': .8, 'IMG_1096': .5, 'IMG_1097': .9, 'IMG_1098': .6, 'IMG_1100': 1.0}

def words(take):
    d = json.load(open(f'work/v3/stt_{take[4:]}.json'))
    return [w for w in d['words'] if w['type'] == 'word']

segs = []
for take, blk in TAKES:
    W = words(take); drop = DROP[take]
    kept = [i for i, w in enumerate(W) if not any(a <= w['start'] < b for a, b in drop)]
    # phrases: runs of kept words with less than 0.35 s between them and no dropped word in between
    runs, cur = [], [kept[0]]
    for i in kept[1:]:
        if i == cur[-1] + 1 and W[i]['start'] - W[cur[-1]]['end'] <= .35: cur.append(i)
        else: runs.append(cur); cur = [i]
    runs.append(cur)
    for k, r in enumerate(runs):
        first, last = W[r[0]], W[r[-1]]
        nxt = W[runs[k + 1][0]] if k + 1 < len(runs) else None
        lead = .35 if k == 0 else .10
        gap = PAUSE.get((take, round(nxt['start'], 2)), GAP) if nxt else TAIL[take]
        a = max(0, first['start'] - lead); b = last['end'] + max(.15, gap - .10)
        if nxt: b = min(b, nxt['start'] - .10)
        prev_b = segs[-1]['b'] if segs and segs[-1]['take'] == take else None
        segs.append({'take': take, 'blk': blk, 'a': round(a, 3), 'b': round(b, 3), 'big': 1 if prev_b is None or a - prev_b > 1.0 else 0,
                     'words': [[W[i]['text'], W[i]['start'], W[i]['end']] for i in r]})

# ---------- encode each segment, then concatenate ----------
os.makedirs('work/v3/segs', exist_ok=True); os.makedirs('data/v3', exist_ok=True)
def one(k):
    s = segs[k]; out = f'work/v3/segs/s{k:03d}.mp4'; fr = max(1, round((s['b'] - s['a']) / SPEED * 24)); L = fr / 24
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f"{s['a']:.3f}", '-t', f"{s['b'] - s['a'] + .2:.3f}", '-i', f"rushes/{s['take']}.mp4",
                    '-vf', f'setpts=PTS/{SPEED},fps=24,format=yuv420p,trim=end_frame={fr}',
                    '-af', f'aresample=48000,atempo={SPEED},atrim=0:{L:.5f},afade=t=in:d=0.01,afade=t=out:st={L - .01:.4f}:d=0.01',
                    '-c:v', 'libx264', '-crf', '16', '-preset', 'fast', '-r', '24', '-ac', '1', '-c:a', 'aac', '-ar', '48000', '-b:a', '192k', out], check=True)
    return out
with cf.ThreadPoolExecutor(3) as ex: files = list(ex.map(one, range(len(segs))))
for k, f in enumerate(files):
    segs[k]['frames'] = int(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-count_packets', '-show_entries', 'stream=nb_read_packets',
                                            '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip())
open('work/v3/segs/list.txt', 'w').write(''.join(f"file '{os.path.basename(f)}'\n" for f in files))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'work/v3/segs/list.txt', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium',
                '-r', '24', '-c:a', 'aac', '-ar', '48000', '-b:a', '192k', 'work/v3/edit.mp4'], check=True)

# ---------- timeline from the real frame counts ----------
out_words, cuts, blocks, t = [], [], [], 0.0
for k, sg in enumerate(segs):
    if not blocks or blocks[-1][2] != sg['blk']: blocks.append([round(t, 3), None, sg['blk']])
    if k: cuts.append([round(t, 3), sg['big']])
    for txt, s0, s1 in sg['words']: out_words.append([txt, round(t + (s0 - sg['a']) / SPEED, 3), round(t + (min(s1, sg['b']) - sg['a']) / SPEED, 3), sg['take'], sg['blk']])
    t += sg['frames'] / 24; blocks[-1][1] = round(t, 3)
edit = {'words': out_words, 'cuts': cuts, 'blocks': blocks, 'dur': round(t, 3)}
json.dump(edit, open('data/v3/edit_data.json', 'w'), ensure_ascii=False)
benin = re.search(r'const BENIN = .*', open('data/montage_data.js').read()).group(0)
open('data/v3/montage_data.js', 'w').write('// generated by src/cut3.py: words (edit seconds), cuts, blocks, and the outline of Benin\nconst EDIT = '
                                            + json.dumps(edit, ensure_ascii=False) + ';\n' + benin + '\n')
json.dump([{k: v for k, v in sg.items() if k != 'words'} for sg in segs], open('work/v3/edl.json', 'w'))
print(f'{len(segs)} segments, {t:.2f} s, frames {round(t * 24)}, blocks {[(b[2], round(b[1] - b[0], 1)) for b in blocks]}')
