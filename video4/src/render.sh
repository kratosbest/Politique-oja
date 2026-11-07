#!/bin/bash
# Render the montage page (PAGE, default montage2.html) at 30 fps (1080 x 1920) in 4 parallel chunks, then add work/mix.m4a (AAC 48 kHz).
# usage (from video4/): src/render.sh [out.mp4]
set -e; cd "$(dirname "$0")/.."
SEC=$(python3 -c "import json;print(json.load(open('data/edit_data.json'))['dur'] + 5)")   # + 5 s end card
OUT=${1:-exports/OJA-video4-du-champ-au-marche.mp4}; WD=work/render; mkdir -p $WD exports
N=$(python3 -c "print(round($SEC*30))"); Q=$(( (N + 3) / 4 )); : > $WD/list.txt
for i in 0 1 2 3; do a=$(( i * Q )); b=$(( (i + 1) * Q )); [ $b -gt $N ] && b=$N
  PAGE=../video4/${PAGE:-montage2.html} VW=1080 VH=1920 node ../motion/render.js 30 $a $b "$PWD/$WD/p$i.mp4" ffmpeg > $WD/log$i.txt 2>&1 &
  echo "file 'p$i.mp4'" >> $WD/list.txt; done
wait
ffmpeg -v error -y -f concat -safe 0 -i $WD/list.txt -c copy $WD/v.mp4
ffmpeg -v error -y -i $WD/v.mp4 -i work/mix.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 23 -maxrate 3500k -bufsize 7M -r 30 -pix_fmt yuv420p -c:a copy -shortest -movflags +faststart "$OUT"
grep -hv ERR_FILE $WD/log*.txt | head -5 || true
echo "rendered $OUT ($N frames)"
