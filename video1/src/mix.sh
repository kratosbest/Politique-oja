#!/bin/bash
# Voice (from work/edit.mp4) at -16 LUFS + music about 21 dB lower (-37 LUFS), AAC 48 kHz -> work/mix.m4a
set -e; cd "$(dirname "$0")/.."
ffmpeg -v error -y -i work/edit.mp4 -i work/music.wav -filter_complex \
 "[0:a]aresample=48000,highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,loudnorm=I=-16:TP=-1.5:LRA=9,apad=whole_dur=92[v];[1:a]aresample=48000,loudnorm=I=-37:TP=-9:LRA=12[m];[v][m]amix=inputs=2:duration=first:normalize=0,atrim=0:92[a]" \
 -map "[a]" -c:a aac -b:a 192k -ar 48000 work/mix.m4a
echo "work/mix.m4a"
