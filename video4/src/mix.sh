#!/bin/bash
# Derrick's voice (work/edit.mp4) at -14 LUFS + work/music.wav as it is (src/music.py) -> work/mix.m4a (AAC 48 kHz)
set -e; cd "$(dirname "$0")/.."
D=$(python3 -c "import json;print(json.load(open('data/edit_data.json'))['dur'] + 5)")   # + 5 s end card
ffmpeg -v error -y -i work/edit.mp4 -i work/music.wav -filter_complex \
 "[0:a]aresample=48000,highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,loudnorm=I=-14:TP=-1.2:LRA=9,apad=whole_dur=$D[v];[1:a]aresample=48000[m];[v][m]amix=inputs=2:duration=first:normalize=0,atrim=0:$D[a]" \
 -map "[a]" -c:a aac -b:a 192k -ar 48000 work/mix.m4a
echo "work/mix.m4a ($D s)"
