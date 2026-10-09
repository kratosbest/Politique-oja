"""Places the ElevenLabs lines of the sketch on the timeline -> assets/arbre/dialogue.wav (40.5 s).
Each line: (file, slice in, slice out, output time of the slice start, gain)."""
import os, subprocess
FF = os.environ.get('FFMPEG', 'ffmpeg'); D = 'assets/arbre/'
C, K1, K3, M = D + 'voix_client.mp3', D + 'voix_commercant_prise1.mp3', D + 'voix_commercant_prise3.mp3', D + 'voix_mascotte.mp3'
LINES = [(C, .05, 2.62, .19, 1.0),          # Allô ? Oui, je suis devant le gros arbre !
         (K3, .09, 1.20, 3.28, 1.0),        # Quel gros arbre ?
         (K1, 1.37, 2.75, 4.55, 1.0),       # Il y en a cinq ici !
         (C, 3.00, 4.80, 6.39, 1.0),        # Celui à côté de la vendeuse de pain !
         (K1, 3.06, 5.68, 8.93, 1.0),       # Des vendeuses de pain aussi, il y en a cinq !
         (C, 5.05, 7.20, 11.71, 1.0),       # Bon… je tourne à gauche ?
         (K1, 5.85, 7.22, 14.19, 1.0),      # Ma gauche ou ta gauche ?!
         (M, .12, 3.22, 17.45, 1.0),        # Ou bien… on met simplement le commerce sur OJA ?
         (M, 3.48, 6.39, 20.65, 1.0),       # Le commerçant enregistre sa boutique…
         (M, 6.58, 11.06, 23.65, 1.0),      # Le client la retrouve… arrive tout droit !
         (C, 7.40, 8.80, 28.55, 1.0),       # Ah ! Je vous vois !
         (K1, 7.80, 9.75, 30.15, 1.0),      # Bienvenue, bienvenue !
         (M, 11.41, 13.91, 33.05, 1.0),     # Fini les « après le manguier, tourne à gauche » !
         (M, 14.20, 16.59, 36.30, 1.0)]     # OJA. Le local devient visible.
ins, fl = [], []
for k, (f, a, b, s, g) in enumerate(LINES):
    ins += ['-i', f]; d = b - a
    fl.append(f"[{k}:a]atrim={a}:{b},asetpts=PTS-STARTPTS,aresample=44100,aformat=channel_layouts=stereo,volume={g},"
              f"afade=t=in:d=0.02,afade=t=out:st={d - .06:.3f}:d=0.06,adelay={int(round(s * 1000))}|{int(round(s * 1000))}[a{k}]")
fl.append(''.join(f'[a{k}]' for k in range(len(LINES))) + f"amix=inputs={len(LINES)}:normalize=0,apad=whole_dur=40.5,atrim=0:40.5[o]")
subprocess.run([FF, '-v', 'error', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[o]', D + 'dialogue.wav'], check=True)
print('ok')
