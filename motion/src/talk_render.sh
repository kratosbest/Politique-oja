#!/bin/bash
# Render a talking-head ad of the campaign (oja_talk.html?v=<name>, 9:16) at 30 fps in 4 parallel chunks, with its sound.
# Needs work/talk_<name>/src.mp4 (the take, not in git) and work/talk_<name>/stt.json (its speech-to-text with word
# timings), src/talks/<name>.json (what to keep, the words to fix) and assets/talk_<name>/design.js (the design).
# usage (from motion/): PY=<python with numpy, scipy, pillow> src/talk_render.sh <name>
set -e
NAME=$1; WK=work/talk_$NAME; PY=${PY:-python3}
python3 src/tk_edl.py $NAME > /dev/null
if [ ! -f $WK/mt/f0001.png ] || [ assets/talk_$NAME/marks.json -nt $WK/cut.mov ]; then
  python3 - "$NAME" <<'PYEOF'
import json, subprocess, sys
name = sys.argv[1]; TK = json.load(open(f'assets/talk_{name}/marks.json')); f = []; n = len(TK['segs'])
for k, s in enumerate(TK['segs']):
    a, b = s['src']; d = b - a
    f.append(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS,fps=30,scale=1080:1920[v{k}]")
    f.append(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.012,afade=t=out:st={d - 0.015:.3f}:d=0.015[a{k}]")
f.append(''.join(f"[v{k}][a{k}]" for k in range(n)) + f"concat=n={n}:v=1:a=1[v][a]")
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'work/talk_{name}/src.mp4', '-filter_complex', ';'.join(f), '-map', '[v]', '-map', '[a]',
                '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', '-c:a', 'pcm_s16le', f'work/talk_{name}/cut.mov'], check=True)
PYEOF
  rm -rf $WK/fr $WK/mt; mkdir -p $WK/fr && ffmpeg -v error -y -i $WK/cut.mov -q:v 3 $WK/fr/f%04d.jpg
  $PY src/tk_matte.py $NAME
fi
ffmpeg -v error -y -i $WK/cut.mov -vn -ac 1 -ar 44100 -af "highpass=f=75,lowpass=f=13000,afftdn=nr=12:nf=-34:tn=1,equalizer=f=220:t=q:w=1.2:g=-2,equalizer=f=3200:t=q:w=1.5:g=2,acompressor=threshold=-22dB:ratio=3:attack=8:release=120:makeup=4dB,alimiter=limit=0.9" $WK/voice.wav
node src/sfx_dump.js "oja_talk.html?v=$NAME" $WK/sfx.json
python3 src/tk_audio.py $NAME
ffmpeg -v error -y -i $WK/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 44100 -c:a aac -b:a 192k assets/soundtrack_talk_$NAME.m4a
RD=/tmp/render_talk_$NAME; mkdir -p "$RD"; : > "$RD/list.txt"
N=$(python3 -c "import json; print(round((json.load(open('assets/talk_$NAME/marks.json'))['speech'] + .12 + 3.6) * 30))"); Q=$(( (N + 3) / 4 ))
for i in 0 1 2 3; do b=$(((i+1)*Q)); [ $b -gt $N ] && b=$N
  PAGE="oja_talk.html?v=$NAME" VW=1080 VH=1920 node render.js 30 $((i*Q)) $b "$RD/p$i.mp4" ffmpeg > "$RD/log$i.txt" 2>&1 &
  echo "file 'p$i.mp4'" >> "$RD/list.txt"; done
wait
OUT=$(python3 -c "import json; print(json.load(open('src/talks/$NAME.json'))['out'])")
ffmpeg -v error -y -f concat -safe 0 -i "$RD/list.txt" -c copy "$RD/v.mp4"
ffmpeg -v error -y -i "$RD/v.mp4" -i assets/soundtrack_talk_$NAME.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 19 -maxrate 8M -bufsize 16M -pix_fmt yuv420p -r 30 -c:a copy -shortest -movflags +faststart "$OUT"
grep -h ERR "$RD"/log*.txt | head -5 || true
echo "rendered $OUT ($N frames)"
