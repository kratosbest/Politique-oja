#!/bin/bash
# Render the talking-head ad « Ton enseigne » (oja_talk_enseigne.html, 9:16) at 30 fps in 4 parallel chunks, with its sound.
# Needs work/talk1/src.mp4 (Derrick's video, not in git) and work/talk1/stt.json (its speech-to-text with word timings).
# usage (from motion/): src/talk_enseigne_render.sh [workdir]
set -e
PY=${PY:-python3}                                  # a python with numpy, scipy and pillow for the mattes
python3 src/tk1_edl.py > /dev/null
if [ ! -f work/talk1/mt/f0001.png ]; then
  python3 - <<'PYEOF'
import json, subprocess
TK = json.load(open('assets/talk1/marks.json')); f = []; n = len(TK['segs'])
for k, s in enumerate(TK['segs']):
    a, b = s['src']; d = b - a
    f.append(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS,fps=30[v{k}]")
    f.append(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.012,afade=t=out:st={d - 0.015:.3f}:d=0.015[a{k}]")
f.append(''.join(f"[v{k}][a{k}]" for k in range(n)) + f"concat=n={n}:v=1:a=1[v][a]")
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'work/talk1/src.mp4', '-filter_complex', ';'.join(f), '-map', '[v]', '-map', '[a]',
                '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', '-c:a', 'pcm_s16le', 'work/talk1/cut.mov'], check=True)
PYEOF
  mkdir -p work/talk1/fr && ffmpeg -v error -y -i work/talk1/cut.mov -q:v 3 work/talk1/fr/f%04d.jpg
  $PY src/tk1_matte.py
fi
ffmpeg -v error -y -i work/talk1/cut.mov -vn -ac 1 -ar 44100 -af "highpass=f=75,lowpass=f=13000,afftdn=nr=14:nf=-32:tn=1,equalizer=f=220:t=q:w=1.2:g=-2,equalizer=f=3200:t=q:w=1.5:g=2.5,acompressor=threshold=-22dB:ratio=3:attack=8:release=120:makeup=4dB,alimiter=limit=0.9" work/talk1/voice.wav
node src/sfx_dump.js oja_talk_enseigne.html work/talk1/sfx.json
python3 src/tk1_audio.py work/talk1/sfx.json work/talk1/mix.wav
ffmpeg -v error -y -i work/talk1/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 44100 -c:a aac -b:a 192k assets/soundtrack_talk_enseigne.m4a
WD=${1:-/tmp/render_talk1}; mkdir -p "$WD"; : > "$WD/list.txt"
N=$(python3 -c "import json; print(round((json.load(open('assets/talk1/marks.json'))['speech'] + .12 + 3.6) * 30))"); Q=$(( (N + 3) / 4 ))
for i in 0 1 2 3; do b=$(((i+1)*Q)); [ $b -gt $N ] && b=$N
  PAGE=oja_talk_enseigne.html VW=1080 VH=1920 node render.js 30 $((i*Q)) $b "$WD/p$i.mp4" ffmpeg > "$WD/log$i.txt" 2>&1 &
  echo "file 'p$i.mp4'" >> "$WD/list.txt"; done
wait
ffmpeg -v error -y -f concat -safe 0 -i "$WD/list.txt" -c copy "$WD/v.mp4"
ffmpeg -v error -y -i "$WD/v.mp4" -i assets/soundtrack_talk_enseigne.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 19 -maxrate 8M -bufsize 16M -pix_fmt yuv420p -r 30 -c:a copy -shortest -movflags +faststart OJA_Talk_TonEnseigne_essai_9x16.mp4
grep -h ERR "$WD"/log*.txt | head -5 || true
echo "rendered OJA_Talk_TonEnseigne_essai_9x16.mp4 ($N frames)"
