#!/bin/bash
# Render « Une journée avec OJA » (motion design, collage style) at 30 fps in 4 parallel chunks, then mux two versions:
# with Isac's voice (OJA_UneJourneeAvecOJA_Collage_9x16.mp4) and music only (OJA_UneJourneeAvecOJA_Collage_SansVoix_9x16.mp4).
# The length comes from the voice (assets/jcol/voix_marks.json, src/jcol_marks.py).
# usage (from motion/): src/journee_collage_render.sh [workdir]
set -e
WD=${1:-/tmp/render_jcol}; mkdir -p "$WD"; : > "$WD/list.txt"
N=$(python3 -c "import json; print(round(json.load(open('assets/jcol/voix_marks.json'))['total'] * 30))"); Q=$(( (N + 3) / 4 ))
for i in 0 1 2 3; do b=$(((i+1)*Q)); [ $b -gt $N ] && b=$N
  PAGE=oja_journee_collage.html VW=1080 VH=1920 node render.js 30 $((i*Q)) $b "$WD/p$i.mp4" ffmpeg > "$WD/log$i.txt" 2>&1 &
  echo "file 'p$i.mp4'" >> "$WD/list.txt"; done
wait
ffmpeg -v error -y -f concat -safe 0 -i "$WD/list.txt" -c copy "$WD/v.mp4"
for pair in "soundtrack_journee_collage.m4a OJA_UneJourneeAvecOJA_Collage_9x16.mp4" "soundtrack_journee_collage_musique.m4a OJA_UneJourneeAvecOJA_Collage_SansVoix_9x16.mp4"; do
  set -- $pair
  ffmpeg -v error -y -i "$WD/v.mp4" -i "assets/$1" -map 0:v -map 1:a -c:v libx264 -preset slow -crf 20 -maxrate 8M -bufsize 16M -pix_fmt yuv420p -r 30 -c:a copy -shortest -movflags +faststart "$2"
  echo "rendered $2"
done
grep -h ERR "$WD"/log*.txt | head -5 || true
