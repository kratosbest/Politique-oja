"""Sketch 3 « Monsieur Je-connais-tout » (Google Flow clips in clips_sk3/): new voices on the Veo clips.
Veo moved the lips but said other words in places (« Richard », « T'entends ? », « Ah formidable… »). Each line below is
voiced once with ElevenLabs (eleven_v4, speed 1.15, so the sentence keeps its intonation), cut into pieces at word boundaries, and
each piece is fitted into the window where the character's lips move in the clip (windows measured with a Scribe
transcription of the Veo sound). Writes assets/sketch3/dub/*.wav and assets/sketch3/dub.json.
  python3 src/sk3_dub.py            (needs the ElevenLabs key in the environment, like src/tts.py)"""
import json, os, subprocess, sys, time
import numpy as np
OUT = 'assets/sketch3/dub/'; os.makedirs(OUT, exist_ok=True)
SR = 44100
V = {'tonton': 'pKlgdyvlCIm3TVoJ5Bqx',   # « Martinez », deep and warm French-African voice
     'grace': '4SFJvuIUvxaPLgk8FoK3'}    # « Alimata », confident French-African woman
# id, who, text for the voice ([tags] guide the delivery), pieces: (number of words, clip, window start, window end)
DUB = [
    ('d01', 'tonton', "[fier] Suis-moi ! Cotonou, je connais par cœur. Le meilleur poulet braisé, c'est par ici.", [(2, 'p1', .10, .50), (5, 'p1', 1.50, 2.80), (7, 'p1', 3.96, 6.12)]),
    ('d02', 'grace', "[sceptique] D'accord…", [(1, 'p1', 6.46, 6.98)]),
    ('d03', 'grace', "[fatiguée] Tonton… on a déjà fait trois fois le tour.", [(1, 'p2', 1.04, 1.44), (8, 'p2', 3.06, 4.62)]),
    ('d04', 'tonton', "[très fier] Fais-moi confiance… Voilà ! Hein, ma chérie ?", [(2, 'p4', .35, 1.75), (2, 'p4', 2.06, 2.94), (4, 'p4', 3.60, 4.24)]),
    ('d05', 'grace', "[blasée] C'est un salon de coiffure.", [(5, 'p4', 5.00, 6.16)]),
    ('d06', 'tonton', "[surpris] Quoi ?!", [(2, 'p4', 6.90, 7.16)]),
    ('d07', 'tonton', "[très sérieux] … Ils ont changé le menu.", [(6, 'p5', 5.72, 6.62)]),
    ('d08', 'grace', "[taquine] Le maquis a déménagé. Il est à deux rues, c'est sur la map Odja.", [(4, 'p6', .10, 1.36), (5, 'p6', 2.52, 3.36), (5, 'p6', 3.60, 4.58)]),
    ('d09', 'tonton', "[sûr de lui] Oui… c'est exactement ce que j'allais dire. Allons-y !", [(7, 'p6', 5.20, 7.50), (2, None, 0, 0)]),   # plan 6 shot on the sidewalk: Tonton answers at the end; « Allons-y ! » is not used
    ('d10', 'tonton', "[la bouche pleine, content] Tu vois ? Je connais Cotonou.", [(3, 'p8', .12, .60), (3, 'p8', 1.88, 2.80)]),
    ('d11', 'grace', "[ironique] Ah oui, bien sûr.", [(4, 'p8', 3.06, 3.88)]),
]
SHOW = lambda s: s.replace('Odja', 'OJA')

def pcm(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

def words_of(tm):
    """spoken words (tags in brackets skipped) with their start/end, from the character timings"""
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

plan = []
for did, who, text, pieces in DUB:
    mp3 = OUT + did + '.mp3'
    if not os.path.exists(mp3):
        open('/tmp/sk3_line.txt', 'w').write(text)
        for k in range(5):
            r = subprocess.run([sys.executable, 'src/tts.py', '--voice', V[who], '--text-file', '/tmp/sk3_line.txt', '--out', mp3, '--max-credits', '200', '--speed', '1.15'], capture_output=True, text=True)
            if os.path.exists(mp3): break
            time.sleep(15)
        time.sleep(3)
    y = pcm(mp3); ws = words_of(json.load(open(mp3 + '.json')))
    assert sum(p[0] for p in pieces) == len(ws), (did, [w[0] for w in ws])
    k = 0
    for j, (n, clip, w0, w1) in enumerate(pieces):
        grp = ws[k:k + n]; k += n
        if clip is None: continue
        a = grp[0][1] - .04 if j == 0 else (ws[k - n - 1][2] + grp[0][1]) / 2
        b = grp[-1][2] + .12 if k == len(ws) else (grp[-1][2] + ws[k][1]) / 2
        seg = y[int(max(0, a) * SR):int(b * SR)]
        d, w = len(seg) / SR, w1 - w0 + .08
        r = min(1.15, max(.92, d / w))                  # speed so the piece fits the moving lips (natural range only)
        f = OUT + f'{did}_{j}.wav'
        tmp = f'/tmp/{did}_{j}.f32'; seg.astype('<f4').tofile(tmp)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', tmp,
                        '-af', f'atempo={r:.4f},afade=t=in:d=0.01,areverse,afade=t=in:d=0.04,areverse', f], check=True)
        os.remove(tmp)
        nd = d / r
        start = w0 - .03 if nd >= w1 - w0 else w0 - .03 + (w1 - w0 - nd) * .25
        prev = [q for q in plan if q['clip'] == clip]
        if prev: start = max(start, prev[-1]['start'] + prev[-1]['dur'] + .05)   # never two lines at once
        plan.append(dict(id=f'{did}_{j}', who=who, clip=clip, start=round(start, 3), dur=round(nd, 3), speed=round(r, 3),
                         text=SHOW(' '.join(x[0] for x in grp)),
                         words=[[SHOW(x[0]), round((x[1] - a) / r, 3), round((x[2] - a) / r, 3)] for x in grp]))
        print(f'{did}_{j} {who:6s} {clip} [{w0:.2f}-{w1:.2f}] natural {d:.2f}s x{r:.2f} -> {nd:.2f}s  {plan[-1]["text"]}')
json.dump(plan, open('assets/sketch3/dub.json', 'w'), ensure_ascii=False, indent=1)
