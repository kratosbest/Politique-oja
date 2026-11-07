"""Video 4, second edit: cut driven by the words AND by MediaPipe tracking (work/track_IMG_10xx.json, src/track.py).

usage (from video4/): python3 src/cut2.py
- removed: « Bloc N », the first try of « Tu veux un cultivateur à la source ? » (IMG_1074), and every moment where Derrick leans to the phone
  (shoulders wider than 1.12 x the take's median while he is not speaking: he is reaching the camera or the prompter);
- kept: every word, and every gesture of the script found in the tracking (CUES, detect()) with a 0.45 s hold; the other waits are cut;
- the answers play 8 % faster; each segment is encoded on its own, the timeline is rebuilt from the real frame counts;
- writes work/edit.mp4, data/edit_data.json (words, cuts, blocks), data/track.json (both hands and the nose on every frame of the edit)
  and data/events.json (each gesture of the script, found in the tracking: type, time on the edit, hand positions)."""
import json, os, subprocess, concurrent.futures as cf
import numpy as np
SPEED = 1.08
PLAN = [('IMG_1073', 1, {0, 1}), ('IMG_1074', 2, {0, 1} | set(range(11, 24))), ('IMG_1075', 3, {0, 1}), ('IMG_1076', 4, {0, 1}),
        ('IMG_1077', 5, {0, 1, 2}), ('IMG_1078', 6, {0, 1}), ('IMG_1079', 7, {0, 1}), ('IMG_1080', 8, {0, 1})]

def words(take):
    d = json.load(open(f'work/stt/{take}.json')); return [w for w in d['words'] if w['type'] == 'word']

def features(take):
    """per frame (24 fps): hands sorted by x on screen ([x, y, size] of the palm, index tip), nose, shoulder ratio"""
    T = json.load(open(f'work/track_{take}.json')); n = len(T)
    A = np.full((n, 2, 5), np.nan)                  # 2 hands (left, right on screen) x [palm x, palm y, size, index x, index y]
    nose = np.full((n, 2), np.nan); sw = np.full(n, np.nan)
    for i, f in enumerate(T):
        hs = []
        for h in f['hands']:
            P = np.array(h['pts']); palm = P[[0, 5, 9, 13, 17]].mean(0); hs.append([palm[0], palm[1], P[:, 0].max() - P[:, 0].min(), P[8, 0], P[8, 1]])
        hs.sort(key=lambda v: v[0])
        if len(hs) == 1: A[i, 0 if hs[0][0] < .5 else 1] = hs[0]
        elif len(hs) >= 2: A[i, 0], A[i, 1] = hs[0], hs[-1]
        if f['pose']: nose[i] = f['pose']['nose']; sw[i] = f['pose']['sw']
    # fill holes of up to 5 frames, then smooth over 5 frames
    def fill(x):
        x = x.copy(); ok = ~np.isnan(x); idx = np.arange(len(x))
        if ok.sum() < 2: return x
        y = np.interp(idx, idx[ok], x[ok]); gap = np.zeros(len(x), int); run = 0
        for i in range(len(x)):
            run = run + 1 if not ok[i] else 0; gap[i] = run
        for i in range(len(x) - 2, -1, -1):
            if not ok[i] and gap[i + 1] > gap[i]: gap[i] = gap[i + 1]
        y[(~ok) & (gap > 5)] = np.nan; return y
    def smooth(x, k=5):
        out = x.copy(); ok = ~np.isnan(x)
        for i in range(len(x)):
            if not ok[i]: continue
            a, b = max(0, i - k // 2), min(len(x), i + k // 2 + 1); out[i] = np.nanmean(x[a:b])
        return out
    for h in range(2):
        for c in range(5): A[:, h, c] = smooth(fill(A[:, h, c]))
    for c in range(2): nose[:, c] = smooth(fill(nose[:, c]), 7)
    sw = smooth(fill(sw), 7)
    return A, nose, sw / np.nanmedian(sw)

def speed(A):
    v = np.zeros(len(A))
    for h in range(2):
        d = np.sqrt(np.nansum(np.diff(A[:, h, :2], axis=0) ** 2, axis=1)); d = np.nan_to_num(d); v[1:] = np.maximum(v[1:], d)
    return np.convolve(v, np.ones(3) / 3, 'same')


# the gestures of the script: (take, word index of the anchor, type, label). Found in the tracking around the anchor word.
CUES = {
 'IMG_1073': [(12, 'open', 'p1'), (15, 'open', 'p2'), (19, 'chain', ''), (21, 'swipe', 'chain'), (23, 'behind', 'PLUS\nBESOIN')],
 'IMG_1074': [(5, 'point_cam', ''), (8, 'tap', 'grossiste'), (27, 'pull', 'farmer'), (38, 'open', 'farmer'), (41, 'talk', '')],
 'IMG_1075': [(5, 'present', 'seller'), (8, 'behind', 'TOKPA'), (10, 'spread', 'map'), (14, 'tap', 'ananas'), (22, 'arm_side', 'allada'), (24, 'ear', 'c1'),
              (28, 'thumbs', 'c2'), (35, 'open', 'c3'), (40, 'swipe', 'choose'), (48, 'join', 'route')],
 'IMG_1076': [(3, 'point_cam', ''), (7, 'rain', ''), (14, 'tap', 'form'), (19, 'count', 'Ton nom'), (23, 'count', 'Ce que tu produis'), (25, 'count', 'Tes photos'),
              (27, 'count', 'Ton numéro'), (29, 'count', 'Ton WhatsApp'), (34, 'point_down', 'pin'), (40, 'behind', 'VILLAGE'), (43, 'clap', 'gratuit')],
 'IMG_1077': [(4, 'count', 'Un mariage'), (6, 'count', 'Une fête'), (8, 'count', 'Un baptême'), (11, 'pull', 'breeder')],
 'IMG_1078': [(2, 'swipe', 'chain6'), (8, 'open', 'field'), (13, 'open', 'market'), (19, 'join', 'line'), (22, 'behind', 'DU CHAMP\nAU MARCHÉ')],
 'IMG_1079': [(2, 'count', 'Cultivateur'), (3, 'count', 'Éleveur'), (4, 'count', 'Grossiste'), (5, 'point_cam', ''), (9, 'open', 'app'), (13, 'push', 'share')],
 'IMG_1080': [(4, 'point_cam', ''), (13, 'world', ''), (14, 'city', 'Paris'), (15, 'city', 'Montréal'), (16, 'city', 'Bruxelles'), (17, 'city', 'Abidjan'), (18, 'join', 'world'),
              (26, 'heart', 'JEUNE\nFRÈRE'), (46, 'count', 'Le livreur'), (52, 'count', 'La maman'), (58, 'count', 'Le touriste'), (64, 'count', 'Et vous'), (79, 'clap', 'flash'),
              (87, 'open', 'like'), (95, 'open', 'share'), (102, 'pull', 'comment'), (110, 'push', 'send'), (115, 'count', 'À une maman'), (118, 'count', 'À votre oncle'),
              (121, 'count', 'À votre ami qui a une boutique'), (126, 'clap', 'benin'), (135, 'fist', 'LA FORCE'), (139, 'end', '')],
}
def detect(take, W, A, nose, kind, i, fps=24):
    """time window of the gesture (rush seconds) and the hand used: {t0, t, t1, hand}"""
    w = W[i]['start']; n = len(A); f = lambda s: int(cl(s * fps, 0, n - 1))
    ny = np.nanmedian(nose[:, 1]); v = speed(A)
    dist = np.sqrt(np.nansum((A[:, 0, :2] - A[:, 1, :2]) ** 2, axis=1)); both = ~np.isnan(A[:, 0, 0]) & ~np.isnan(A[:, 1, 0]); dist[~both] = np.nan
    ev = {'t0': w - .1, 't': w, 't1': w + 1.2, 'hand': None}
    if kind == 'pull':
        a, b = f(w - 1.6), f(w + 1.6); best = None
        for h in range(2):
            y = A[a:b, h, 1]
            if np.all(np.isnan(y)): continue
            k = int(np.nanargmin(y)); 
            if y[k] < ny - .03 and (best is None or y[k] < best[0]): best = (y[k], a + k, h)
        if best:
            _, k, h = best; e = k
            while e < min(n - 1, k + 30) and not (A[e, h, 1] > ny + .15): e += 1
            ev = {'t0': k / fps - .3, 't': k / fps, 't1': e / fps, 'hand': h}
    elif kind in ('open', 'present'):
        a, b = f(w - .5), f(w + 1.5); h0 = None
        for k in range(a, b):
            for h in range(2):
                if np.isnan(A[k, h, 0]) or A[k, h, 1] < ny + .05: continue
                if v[k:k + 4].max() < .006 and v[max(0, k - 8):k].max() > .006: h0 = (k, h); break
            if h0: break
        if not h0:
            for h in range(2):
                if not np.isnan(A[f(w + .3), h, 0]): h0 = (f(w + .3), h); break
        if h0:
            k, h = h0; e = k
            while e < min(n - 1, k + int(2.6 * fps)) and not np.isnan(A[e, h, 0]) and v[e] < .02: e += 1
            ev = {'t0': k / fps - .15, 't': k / fps, 't1': max(e, k + 24) / fps, 'hand': h}
    elif kind == 'swipe':
        a, b = f(w - .8), f(w + .9); vx = np.zeros(n)
        for h in range(2):
            d = np.abs(np.diff(A[:, h, 0], prepend=np.nan)); vx = np.fmax(vx, np.nan_to_num(d))
        k = a + int(np.argmax(vx[a:b])) if b > a else f(w)
        h = int(np.nanargmax([abs(np.nan_to_num(A[min(n - 1, k + 2), q, 0] - A[max(0, k - 2), q, 0])) for q in range(2)]))
        sgn = float(np.sign(np.nan_to_num(A[min(n - 1, k + 3), h, 0] - A[max(0, k - 3), h, 0])) or 1)
        ev = {'t0': k / fps - .35, 't': k / fps, 't1': k / fps + .45, 'hand': h, 'dir': sgn}
    elif kind == 'clap':
        a, b = f(w - 1.0), f(w + .7); best = None          # a clap: the hands come together FAST (clasped hands at rest are not a clap)
        for k in range(a + 4, b):
            if np.isnan(dist[k]) or np.isnan(dist[k - 4]) or dist[k] > .14: continue
            drop = dist[k - 4] - dist[k]
            if best is None or drop > best[0]: best = (drop, k)
        if best and best[0] > .05: k = best[1]; ev = {'t0': k / fps - .35, 't': k / fps, 't1': k / fps + .5, 'hand': None}
    elif kind in ('spread', 'join'):
        a, b = f(w - 1.3), f(w + .7); d = dist[a:b]
        if not np.all(np.isnan(d)):
            k = a + int(np.nanargmin(d) if kind == 'spread' else np.nanargmax(d)); d2 = dist[k:f(k / fps + 2.2)]
            e = k + int((np.nanargmax(d2) if kind == 'spread' else np.nanargmin(d2))) if not np.all(np.isnan(d2)) else k + 24
            ev = {'t0': k / fps - .1, 't': k / fps, 't1': max(e, k + 12) / fps, 'hand': None}
    return {k: (round(float(x), 3) if isinstance(x, (float, np.floating)) else x) for k, x in ev.items()}
cl = lambda x, a, b: max(a, min(b, x))

segs, TRK, EV = [], [], []
for take, blk, drop in PLAN:
    W = words(take); A, nose, r = features(take); n = len(A); fps = 24
    kept = [i for i in range(len(W)) if i not in drop]
    speaking = np.zeros(n, bool)
    for i in kept: speaking[max(0, int((W[i]['start'] - .15) * fps)):int((W[i]['end'] + .15) * fps)] = True
    lean = (r > 1.12) & ~speaking
    for i in range(n):                              # a margin of 0.3 s around every lean
        if lean[i]: pass
    bad = np.convolve(lean.astype(float), np.ones(15), 'same') > 0
    dropped = np.zeros(n, bool)
    for i in drop: dropped[max(0, int((W[i]['start'] - .1) * fps)):int((W[i]['end'] + .1) * fps)] = True
    if drop - {0, 1, 2}: dropped[int(W[min(drop - {0, 1, 2})]['start'] * fps):int((W[max(drop - {0, 1, 2}) + 1]['start'] - .9) * fps)] = True   # the whole first try, up to 0.9 s before the retake (its gesture starts there)
    keep = np.zeros(n, bool)
    for k, i in enumerate(kept): keep[max(0, int((W[i]['start'] - (.2 if k == 0 else .06)) * fps)):int((W[i]['end'] + .06) * fps)] = True
    evs = []
    for (i, kind, lab) in CUES[take]:
        e = detect(take, W, A, nose, kind, i); e.update(kind=kind, label=lab, blk=blk, take=take, word=i); evs.append(e)
        if kind in ('pull', 'open', 'present', 'swipe', 'clap', 'spread', 'join'):
            keep[max(0, int((e['t0'] - .1) * fps)):int((e['t1'] + .45) * fps)] = True
    EV.extend(evs)
    keep[int((W[kept[-1]]['end'] + .06) * fps):int((W[kept[-1]]['end'] + .6) * fps)] = True
    keep &= ~bad & ~dropped
    # intervals; tiny holes (< 0.12 s) are closed, tiny pieces (< 0.2 s) dropped unless they hold a word
    iv, i = [], 0
    while i < n:
        if keep[i]:
            j = i
            while j < n and (keep[j] or (j + 3 < n and keep[j:j + 3].all() and False)): j += 1
            iv.append([i, j]); i = j
        else: i += 1
    merged = []
    for a, b in iv:
        if merged and a - merged[-1][1] <= 3: merged[-1][1] = b
        else: merged.append([a, b])
    merged = [m for m in merged if m[1] - m[0] >= 5 or any(m[0] <= int(W[i]['start'] * fps) < m[1] for i in kept)]
    for k, (a, b) in enumerate(merged):
        fr = max(1, round((b - a) / fps / SPEED * 24))
        segs.append({'take': take, 'blk': blk, 'a': round(a / fps, 4), 'b': round(b / fps, 4), 'frames': fr, 'big': 1 if (a - merged[k - 1][1] if k else 99) > 14 else 0,
                     'words': [[W[i]['text'], W[i]['start'], W[i]['end'], i] for i in kept if a / fps <= W[i]['start'] < b / fps]})
    TRK.append((take, A, nose))

# ---------- encode each segment, then concatenate ----------
os.makedirs('work/segs2', exist_ok=True)
def one(k):
    s = segs[k]; d = s['b'] - s['a'] + .2; out = f'work/segs2/s{k:03d}.mp4'; L = s['frames'] / 24
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f"{s['a']:.3f}", '-t', f'{d:.3f}', '-i', f"rushes/{s['take']}.mp4",
                    '-vf', f'setpts=PTS/{SPEED},fps=24,format=yuv420p,trim=end_frame={s["frames"]}', '-af', f'aresample=48000,atempo={SPEED},atrim=0:{L:.5f},afade=t=in:d=0.008,afade=t=out:st={L - .008:.4f}:d=0.008',
                    '-c:v', 'libx264', '-crf', '16', '-preset', 'fast', '-r', '24', '-ac', '1', '-c:a', 'aac', '-ar', '48000', '-b:a', '192k', out], check=True)
    return out
with cf.ThreadPoolExecutor(3) as ex: files = list(ex.map(one, range(len(segs))))
for k, f in enumerate(files):
    segs[k]['frames'] = int(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-count_packets', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip())
open('work/segs2/list.txt', 'w').write(''.join(f"file '{os.path.basename(f)}'\n" for f in files))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'work/segs2/list.txt', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-r', '24', '-c:a', 'aac', '-ar', '48000', '-b:a', '192k', 'work/edit.mp4'], check=True)

# ---------- timeline: words, cuts, blocks, and the tracking on every edit frame ----------
feat = {take: (A, nose) for take, A, nose in TRK}
out_words, cuts, blocks, track, starts, t = [], [], [], [], [], 0.0
for k, sg in enumerate(segs):
    if not blocks or blocks[-1][2] != sg['blk']: blocks.append([round(t, 3), None, sg['blk']])
    if k: cuts.append([round(t, 3), sg['big']])
    starts.append(t)
    for txt, s0, s1, i in sg['words']: out_words.append([txt, round(t + (s0 - sg['a']) / SPEED, 3), round(t + (min(s1, sg['b']) - sg['a']) / SPEED, 3), sg['take'], i, sg['blk']])
    A, nose = feat[sg['take']]
    for f in range(sg['frames']):
        ri = min(len(A) - 1, int(round((sg['a'] + f / 24 * SPEED) * 24)))
        row = []
        for h in range(2): row += [None if np.isnan(A[ri, h, 0]) else round(float(A[ri, h, c]), 3) for c in range(5)]
        row += [None if np.isnan(nose[ri, 0]) else round(float(nose[ri, c]), 3) for c in range(2)]
        track.append(row)
    t += sg['frames'] / 24; blocks[-1][1] = round(t, 3)
def to_edit(take, rt):
    """rush time -> edit time (or None if that moment was cut)"""
    for k, sg in enumerate(segs):
        if sg['take'] == take and sg['a'] <= rt < sg['b']: return round(starts[k] + (rt - sg['a']) / SPEED, 3)
    return None
def near_edit(take, rt):
    e = to_edit(take, rt)
    if e is not None: return e
    best = None
    for k, sg in enumerate(segs):
        if sg['take'] != take: continue
        for edge, et in ((sg['a'], starts[k]), (sg['b'] - .01, starts[k] + sg['frames'] / 24 - .01)):
            if best is None or abs(edge - rt) < best[0]: best = (abs(edge - rt), et)
    return round(best[1], 3) if best else None
events = []
for e in EV:
    W = words(e['take']); wt_e = near_edit(e['take'], W[e['word']]['start'])
    out = {'kind': e['kind'], 'label': e['label'], 'blk': e['blk'], 'w': wt_e, 'hand': e.get('hand'), 'dir': e.get('dir')}
    for k in ('t0', 't', 't1'): out[k] = near_edit(e['take'], e[k])
    if out['t1'] is not None and out['t'] is not None and out['t1'] < out['t']: out['t1'] = out['t'] + .4
    events.append(out)
json.dump(events, open('data/events.json', 'w'), ensure_ascii=False, indent=0)
json.dump({'words': out_words, 'cuts': cuts, 'blocks': blocks, 'dur': round(t, 3)}, open('data/edit_data.json', 'w'), ensure_ascii=False)
json.dump(track, open('data/track.json', 'w'), separators=(',', ':'))
json.dump([{k: v for k, v in sg.items() if k != 'words'} for sg in segs], open('work/edl2.json', 'w'))
print(f'{len(segs)} segments, {t:.2f} s, blocks {[(b[2], round(b[1] - b[0], 1)) for b in blocks]}')
