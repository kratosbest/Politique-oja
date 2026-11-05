#!/bin/bash
# Render the « Deux formules » reel at 30 fps in 4 parallel chunks and mux it with its soundtrack.
# usage (from motion/): src/forfaits_render.sh [workdir]
set -e
WD=${1:-/tmp/render_frm}; N=1800; Q=450; mkdir -p "$WD"; : > "$WD/list.txt"
for i in 0 1 2 3; do PAGE=oja_forfaits_reel.html VW=1080 VH=1920 node render.js 30 $((i*Q)) $(((i+1)*Q)) "$WD/p$i.mp4" ffmpeg > "$WD/log$i.txt" 2>&1 &
  echo "file 'p$i.mp4'" >> "$WD/list.txt"; done
wait
ffmpeg -v error -y -f concat -safe 0 -i "$WD/list.txt" -c copy "$WD/v.mp4"
ffmpeg -v error -y -i "$WD/v.mp4" -i assets/soundtrack_forfaits_reel.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 21 -maxrate 5M -bufsize 10M -pix_fmt yuv420p -r 30 -c:a copy -shortest -movflags +faststart OJA_DeuxFormules_9x16.mp4
grep -h ERR "$WD"/log*.txt | head -5 || true
echo "rendered OJA_DeuxFormules_9x16.mp4"
