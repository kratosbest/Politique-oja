#!/bin/bash
# Render sketch 3 « Monsieur Je-connais-tout » (oja_sketch_flow3.html, 9:16): the Google Flow clips in clips_sk3/ with new
# voices, subtitles, the map OJA insert and the end card, at 30 fps in 4 parallel chunks, muxed with
# assets/soundtrack_sketch_flow3.m4a (src/sk3_audio.py). Frames and the app screen are rebuilt when missing.
# usage (from motion/): src/sketch_flow3_render.sh [workdir]
set -e
WD=${1:-/tmp/render_sketch3}; mkdir -p "$WD"; : > "$WD/list.txt"
for p in p1 p2 p4 p5 p6 p8; do
  [ -f assets/sketch3/frames/$p/f0190.jpg ] || { mkdir -p assets/sketch3/frames/$p; ffmpeg -v error -y -i clips_sk3/$p.mp4 -qscale:v 3 assets/sketch3/frames/$p/f%04d.jpg; }
done
[ -f assets/sketch3/scr/s160.jpg ] || node src/sk_screen.js assets/sketch3/scr '{"texts":{"Chez Maman Rose":"Maquis Le Braisé","Atassi, aloko et poisson braisé.":"Poulet braisé et alloco, tous les soirs."},"photo":"assets/sketch3/maquis_photo.jpg"}'
N=$(python3 -c "import json; print(round(json.load(open('assets/sketch3/marks.json'))['total'] * 30))"); Q=$(( (N + 3) / 4 ))
for i in 0 1 2 3; do b=$(((i+1)*Q)); [ $b -gt $N ] && b=$N
  PAGE=oja_sketch_flow3.html VW=1080 VH=1920 node render.js 30 $((i*Q)) $b "$WD/p$i.mp4" ffmpeg > "$WD/log$i.txt" 2>&1 &
  echo "file 'p$i.mp4'" >> "$WD/list.txt"; done
wait
ffmpeg -v error -y -f concat -safe 0 -i "$WD/list.txt" -c copy "$WD/v.mp4"
ffmpeg -v error -y -i "$WD/v.mp4" -i assets/soundtrack_sketch_flow3.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 19 -maxrate 8M -bufsize 16M -pix_fmt yuv420p -r 30 -c:a copy -shortest -movflags +faststart OJA_Sketch_JeConnaisTout_9x16.mp4
grep -h ERR "$WD"/log*.txt | head -5 || true
echo "rendered OJA_Sketch_JeConnaisTout_9x16.mp4 ($N frames)"
