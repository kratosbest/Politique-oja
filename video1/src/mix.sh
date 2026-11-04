#!/bin/bash
# Voice (from work/edit.mp4) at -16 LUFS + work/music.wav as it is (already at its final level, see src/music_from_file.py), AAC 48 kHz -> work/mix.m4a
# usage: src/mix.sh [seconds]
set -e; cd "$(dirname "$0")/.."; D=${1:-96}
ffmpeg -v error -y -i work/edit.mp4 -i work/music.wav -filter_complex \
 "[0:a]aresample=48000,highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,loudnorm=I=-16:TP=-1.5:LRA=9,apad=whole_dur=$D[v];[1:a]aresample=48000[m];[v][m]amix=inputs=2:duration=first:normalize=0,atrim=0:$D[a]" \
 -map "[a]" -c:a aac -b:a 192k -ar 48000 work/mix.m4a
echo "work/mix.m4a"
