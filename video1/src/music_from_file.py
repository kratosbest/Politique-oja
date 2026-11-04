"""Background music from an audio file supplied by Derrick (work/fond_sonore.wav): looped with a 3 s crossfade to 96 s.
Written at its final level for src/mix.sh: about 21 dB under the voice (-37 LUFS), softer during the story, a little
louder for the call, then loud on its own (about -15 LUFS) once Derrick has said « Merci », until a 2 s fade out.
usage: python3 src/music_from_file.py work/fond_sonore.wav work/music.wav"""
import subprocess, sys, wave
import numpy as np
SR, DUR, XF = 48000, 96.0, 3.0
MERCI = 89.6   # end of « Merci » on the edit timeline
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[1], '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
n, xf = int(DUR * SR), int(XF * SR)
out = x.copy()
while len(out) < n:                                    # loop with an equal-power crossfade
    k = np.linspace(0, 1, xf)[:, None]
    out = np.concatenate([out[:-xf], out[-xf:] * np.cos(k * np.pi / 2) + x[:xf] * np.sin(k * np.pi / 2), x[xf:]])
out = out[:n]
def lufs(a):
    tmp = sys.argv[2] + '.tmp.wav'
    with wave.open(tmp, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes())
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', tmp, '-af', 'ebur128=framelog=quiet', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(r.split('I:')[-1].split('LUFS')[0])
out = out / np.abs(out).max() * .5
out = out * 10 ** ((-37 - lufs(out)) / 20)               # bed level: -37 LUFS, about 21 dB under the voice
t = np.arange(n) / SR
env = np.interp(t, [0, 14.3, 15.5, 36.5, 37.5, 52.4, 53.0, 74.6, 75.4, MERCI, MERCI + 1.2, DUR], [1, 1, .45, .45, .75, .75, 1, 1, 1.5, 1.5, 12, 12])
fade = np.clip((DUR - t) / 2.0, 0, 1) ** 1.5
out = out * (env * fade)[:, None]
out = np.tanh(out / .95) * .95                           # soft limit for the loud ending
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print('ok', len(out) / SR)
