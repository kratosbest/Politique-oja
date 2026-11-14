"""Sketch « L'adresse à la béninoise » with the real voices: Derrick recorded the 13 lines himself (one voice note per
line, in order). This script prepares them for the animation:
  - trims the silence before and after each line and shortens the long pauses inside it (> 0.7 s -> 0.45 s), using the
    word timings of an ElevenLabs Scribe transcription of each note;
  - gives each character its own voice without touching the pronunciation: Boni 3 semitones lower (formants lowered
    with it: a bigger man), Sèna 1 semitone higher (formants kept); ffmpeg rubberband, no credits;
  - cleans up (high-pass, gentle compression, same loudness for every line);
  - writes assets/sketch2/voix/lXX.mp3 and lXX.words.json: the line as written in the doc, each word timed by aligning
    it with the transcription (words the transcription heard differently take the time of their neighbours).
  python3 src/sk2_voix.py <dir with v02.wav … v14.wav> <dir with v02.json … v14.json (Scribe, word timestamps)>"""
import sys, json, re, subprocess, difflib, os
import numpy as np
WAV, STT = sys.argv[1], sys.argv[2]
OUT = 'assets/sketch2/voix/'; os.makedirs(OUT, exist_ok=True)
SR = 44100
# note number -> line id, character, text as shown in the subtitles
LINES = [
    (2, '01', 'sena', "Allô Boni, je suis au carrefour. Ton nouveau maquis, c'est où ?"),
    (3, '02', 'boni', "Facile ! Tu prends la von après la pharmacie, à gauche. Tu comptes trois maisons, puis tu demandes la von de Kissè. Je suis là, tu verras les lumières de mon bar."),
    (4, '03', 'sena', "Azalou ! Moi, je connaissais le quartier avec toi avant ? Comment s'appelle la pharmacie, déjà ?!"),
    (5, '04', 'boni', "C'est la pharmacie Saint-Martin, en allant vers l'échangeur, là où les kêkênon restent."),
    (6, '05', 'sena', "Atassa ! Donc c'était vers là-bas ? Le kêkênon m'a amené à l'opposé. Tchooo ! En plus, on est devant une maison où c'est marqué chien méchant."),
    (7, '06', 'boni', "Ohhh ! Celui-là, il ne rigole pas, hein."),
    (8, '08', 'sena', "Boni, Mahou ! Je vais repartir chez moi !"),
    (9, '09', 'boni', "Non, fais pas ça ! Demande au kêkênon de revenir à la pharmacie."),
    (10, '10', 'sena', "Allô, on est là."),
    (11, '11', 'boni', "Très bien. Rentre dans la von."),
    (12, '12', 'sena', "C'est pour se perdre encore ? Non merci ! Ton bar n'est pas sur la map OJA ?"),
    (13, '13', 'boni', "Si, si ! Je l'ai ajouté hier !"),
    (14, '16', 'sena', "Tonton, azalou ! Au lieu de commencer par là, tu vas payer tout le surplus au kêkênon."),
]
PITCH = {'boni': 'rubberband=pitch=0.8409:formant=shifted:pitchq=quality',
         'sena': 'rubberband=pitch=1.0595:formant=preserved:pitchq=quality'}
norm = lambda w: re.sub(r"[^a-zàâäçéèêëîïôöùûüœ']", '', w.lower())

def read(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

for note, lid, who, text in LINES:
    x = read(f'{WAV}/v{note:02d}.wav')
    sw = [w for w in json.load(open(f'{STT}/v{note:02d}.json'))['words'] if w.get('type') == 'word']
    # keep [first word - 0.12 s, last word + 0.25 s]; inside, pauses longer than 0.7 s become 0.45 s
    segs, a = [], max(0.0, sw[0]['start'] - .12)
    for w0, w1 in zip(sw, sw[1:]):
        if w1['start'] - w0['end'] > .7:
            segs.append((a, w0['end'] + .22)); a = w1['start'] - .23
    segs.append((a, min(len(x) / SR, sw[-1]['end'] + .25)))
    # time map from the original note to the cut line, for the word timings
    def remap(t, segs=segs):
        acc = 0.0
        for s0, s1 in segs:
            if t <= s1: return acc + max(0.0, t - s0)
            acc += s1 - s0
        return acc
    pieces = []
    for s0, s1 in segs:
        p = x[int(s0 * SR):int(s1 * SR)].copy(); f = int(.012 * SR)
        p[:f] *= np.linspace(0, 1, f); p[-f:] *= np.linspace(1, 0, f); pieces.append(p)
    y = np.concatenate(pieces)
    tmp = f'/tmp/sk2v_{lid}.raw'; y.astype('<f4').tofile(tmp)
    af = f"highpass=f=70,{PITCH[who]},acompressor=threshold=-22dB:ratio=2.5:attack=8:release=120,loudnorm=I=-18:TP=-2:LRA=9"
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', tmp, '-af', af, '-ar', str(SR),
                    '-c:a', 'libmp3lame', '-q:a', '2', f'{OUT}l{lid}.mp3'], check=True)
    os.remove(tmp)
    # align the written words with the heard words
    dw = text.split(); hw = [(norm(w['text']), remap(w['start']), remap(w['end'])) for w in sw]
    times = [None] * len(dw)
    sm = difflib.SequenceMatcher(a=[norm(w) for w in dw], b=[h[0] for h in hw], autojunk=False)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size): times[blk.a + k] = hw[blk.b + k][1:]
    t0, t1 = hw[0][1], hw[-1][2]
    if times[0] is None: times[0] = (t0, t0 + .2)
    if times[-1] is None: times[-1] = (max(t1 - .3, times[0][1]), t1)
    i = 0
    while i < len(dw):                       # unmatched runs: spread between the known neighbours, by length
        if times[i] is None:
            j = i
            while times[j] is None: j += 1
            a, b = times[i - 1][1], times[j][0]; L = sum(len(w) for w in dw[i:j]) or 1; acc = 0
            for k in range(i, j):
                s = a + (b - a) * acc / L; acc += len(dw[k]); times[k] = (s, a + (b - a) * acc / L)
            i = j
        i += 1
    json.dump(dict(who=who, text=text, words=[[w, round(s, 3), round(e, 3)] for w, (s, e) in zip(dw, times)]),
              open(f'{OUT}l{lid}.words.json', 'w'), ensure_ascii=False)
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{OUT}l{lid}.mp3'], capture_output=True, text=True).stdout)
    print(lid, who, f'{len(x) / SR:.2f}s -> {d:.2f}s', f'{sum(1 for t in times if t)}/{len(dw)} words timed', f'{len(segs)} pieces')
