#!/bin/bash
# Render the mascot tutorial « Ajouter un lieu » (oja_ajout_lieu_mascotte.html) at 30 fps in 4 parallel chunks and mux it
# with its soundtrack (assets/soundtrack_ajout_lieu_mascotte.m4a). The length comes from assets/lieu2/voix_marks.json.
# usage (from motion/): src/ajout_lieu_mascotte_render.sh [workdir]
set -e
WD=${1:-/tmp/render_lieu2}; mkdir -p "$WD"; : > "$WD/list.txt"
N=$(python3 -c "import json; print(round(json.load(open('assets/lieu2/voix_marks.json'))['total'] * 30))"); Q=$(( (N + 3) / 4 ))
for i in 0 1 2 3; do b=$(((i+1)*Q)); [ $b -gt $N ] && b=$N
  PAGE=oja_ajout_lieu_mascotte.html VW=1080 VH=1920 node render.js 30 $((i*Q)) $b "$WD/p$i.mp4" ffmpeg > "$WD/log$i.txt" 2>&1 &
  echo "file 'p$i.mp4'" >> "$WD/list.txt"; done
wait
ffmpeg -v error -y -f concat -safe 0 -i "$WD/list.txt" -c copy "$WD/v.mp4"
ffmpeg -v error -y -i "$WD/v.mp4" -i assets/soundtrack_ajout_lieu_mascotte.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 20 -maxrate 8M -bufsize 16M -pix_fmt yuv420p -r 30 -c:a copy -shortest -movflags +faststart OJA_Mascotte_AjouterUnLieu_v2_9x16.mp4
grep -h ERR "$WD"/log*.txt | head -5 || true
echo "rendered OJA_Mascotte_AjouterUnLieu_v2_9x16.mp4 ($N frames)"
