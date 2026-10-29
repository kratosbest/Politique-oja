#!/bin/bash
# Render a 1080x1920 page to MP4 with its soundtrack, in 4 parallel chunks.
# usage (from motion/): src/render_video.sh page.html seconds soundtrack.m4a out.mp4 ffmpeg [workdir]
set -e
PAGE=$1; SEC=$2; SND=$3; OUT=$4; FF=$5; WD=${6:-/tmp/render_$$}
N=$(python3 -c "print(round($SEC*24))"); Q=$(( (N + 3) / 4 ))
mkdir -p "$WD"; : > "$WD/list.txt"
for i in 0 1 2 3; do a=$(( i * Q )); b=$(( (i + 1) * Q )); [ $b -gt $N ] && b=$N
  PAGE=$PAGE VW=1080 VH=1920 node render.js 24 $a $b "$WD/p$i.mp4" "$FF" > "$WD/log$i.txt" 2>&1 &
  echo "file 'p$i.mp4'" >> "$WD/list.txt"; done
wait
"$FF" -v error -y -f concat -safe 0 -i "$WD/list.txt" -c copy "$WD/v.mp4"
"$FF" -v error -y -i "$WD/v.mp4" -i "$SND" -map 0:v -map 1:a -c:v libx264 -preset slow -crf 20 -maxrate 14M -bufsize 28M -pix_fmt yuv420p -c:a copy -shortest -movflags +faststart "$OUT"
grep -hv ERR_FILE "$WD"/log*.txt | head -5 || true
echo "rendered $OUT ($N frames)"
