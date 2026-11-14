#!/bin/bash
# Render the sketch « L'adresse à la béninoise » (oja_sketch_adresse.html, 9:16) at 30 fps in 4 parallel chunks and mux it with its soundtrack
# (assets/soundtrack_sketch_adresse.m4a, built by src/sk2_audio.py). The length comes from assets/sketch2/marks.json.
# usage (from motion/): src/sketch_adresse_render.sh [workdir]
set -e
WD=${1:-/tmp/render_sketch2}; mkdir -p "$WD"; : > "$WD/list.txt"
N=$(python3 -c "import json; print(round(json.load(open('assets/sketch2/marks.json'))['total'] * 30))"); Q=$(( (N + 3) / 4 ))
for i in 0 1 2 3; do b=$(((i+1)*Q)); [ $b -gt $N ] && b=$N
  PAGE=oja_sketch_adresse.html VW=1080 VH=1920 node render.js 30 $((i*Q)) $b "$WD/p$i.mp4" ffmpeg > "$WD/log$i.txt" 2>&1 &
  echo "file 'p$i.mp4'" >> "$WD/list.txt"; done
wait
ffmpeg -v error -y -f concat -safe 0 -i "$WD/list.txt" -c copy "$WD/v.mp4"
ffmpeg -v error -y -i "$WD/v.mp4" -i assets/soundtrack_sketch_adresse.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 19 -maxrate 8M -bufsize 16M -pix_fmt yuv420p -r 30 -c:a copy -shortest -movflags +faststart OJA_Sketch_LAdresse_9x16.mp4
grep -h ERR "$WD"/log*.txt | head -5 || true
echo "rendered OJA_Sketch_LAdresse_9x16.mp4 ($N frames)"
