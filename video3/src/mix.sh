#!/bin/bash
# Derrick's voice (work/edit.mp4) at -14 LUFS (louder, asked by Derrick) + the five questions (assets/q/qN.mp3, Alimata) at -15 LUFS, each 0.3 s after its card opens,
# + work/music.wav as it is (src/music.py) -> work/mix.m4a (AAC 48 kHz)
set -e; cd "$(dirname "$0")/.."
read D Q <<< $(python3 -c "
import json;d=json.load(open('data/edit_data.json'));print(d['dur'], ' '.join(str(int((q[0]+.3)*1000)) for q in d['questions']))")
QS=($Q)
ffmpeg -v error -y -i work/edit.mp4 -i work/music.wav -i assets/q/q1.mp3 -i assets/q/q2.mp3 -i assets/q/q3.mp3 -i assets/q/q4.mp3 -i assets/q/q5.mp3 -filter_complex \
 "[0:a]aresample=48000,highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,loudnorm=I=-14:TP=-1.2:LRA=9,apad=whole_dur=$D[v];
  [2:a]aresample=48000,loudnorm=I=-15:TP=-1.5,adelay=${QS[0]}:all=1[q1];[3:a]aresample=48000,loudnorm=I=-15:TP=-1.5,adelay=${QS[1]}:all=1[q2];
  [4:a]aresample=48000,loudnorm=I=-15:TP=-1.5,adelay=${QS[2]}:all=1[q3];[5:a]aresample=48000,loudnorm=I=-15:TP=-1.5,adelay=${QS[3]}:all=1[q4];
  [6:a]aresample=48000,loudnorm=I=-15:TP=-1.5,adelay=${QS[4]}:all=1[q5];
  [1:a]aresample=48000[m];[v][q1][q2][q3][q4][q5][m]amix=inputs=7:duration=first:normalize=0,atrim=0:$D[a]" \
 -map "[a]" -c:a aac -b:a 192k -ar 48000 work/mix.m4a
echo "work/mix.m4a ($D s)"
