#!/usr/bin/env bash
# Versions « Bientôt au Bénin » des 12 films : on garde le film d'origine jusqu'à l'écran de fin,
# puis on refait le rendu de l'écran de fin avec PAGE=page.html?soon. Le son d'origine est conservé.
# Usage (depuis motion/) : ./bientot.sh [nom...]   (les films à clips demandent d'abord key_clips.py / *_frames.py)
set -e
cd "$(dirname "$0")"
# nom | page | i/s | début de l'écran de fin (s) | largeur | hauteur | film d'origine
FILMS='
motion|index|60|60.62|1920|1080|OJA_Motion_Benin
chauffeur|chauffeur|60|58.88|1920|1080|OJA_Chauffeur_Benin
market|market|60|47.82|1920|1080|OJA_Market_Benin
novoja|novoja|60|50.48|1920|1080|NOVOJA_Benin
merchant|merchant|60|51.8|1920|1080|OJA_Merchant_Benin
places|places|60|54.26|1920|1080|OJA_Commerces_Benin
cotonou|cotonou|24|55|1920|1080|OJA_Mascotte_Cotonou
benin|benin|24|54.5|1920|1080|OJA_Mascotte_TourDuBenin
lieu|mascot|30|50.5|1080|1920|OJA_Mascotte_AjouterUnLieu_9x16
compte|chauffeur_tuto|30|58.5|1080|1920|OJA_Mascotte_CompteChauffeur_9x16
course|passager_tuto|30|78|1080|1920|OJA_Mascotte_CommanderUneCourse_9x16
arbre|arbre|24|35.5|1080|1920|OJA_Sketch_GrosArbre_9x16
'
mkdir -p bientot _tmp
echo "$FILMS" | while IFS='|' read -r name page fps start vw vh src; do
  [ -z "$name" ] && continue
  if [ $# -gt 0 ] && [[ ! " $* " =~ " $name " ]]; then continue; fi
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src.mp4" </dev/null)
  f0=$(python3 -c "print(round($start*$fps))"); f1=$(python3 -c "print(round($dur*$fps))")
  echo "== $name : images $f0 → $f1"
  VW=$vw VH=$vh PAGE="$page.html?soon" node render.js "$fps" "$f0" "$f1" "_tmp/$name.mp4" ffmpeg </dev/null
  ffmpeg -nostdin -hide_banner -loglevel error -y -i "$src.mp4" -i "_tmp/$name.mp4" -filter_complex \
    "[0:v]trim=end_frame=$f0,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0[v]" \
    -map '[v]' -map 0:a -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p -r "$fps" -c:a copy -movflags +faststart \
    "bientot/${src}_Bientot.mp4"
  if [ "$name" = motion ]; then
    # La voix off finit sur « Téléchargez OJA… » : fondu à 60,3 s, puis impact grave sur l'écran de fin.
    ffmpeg -nostdin -loglevel error -y -i "$src.mp4" \
      -f lavfi -i "sine=f=48:d=4.75:sample_rate=44100" -f lavfi -i "anoisesrc=d=4.75:c=pink:a=0.5:sample_rate=44100" \
      -filter_complex "[0:a]atrim=0:60.75,afade=t=out:st=60.3:d=0.45,asetpts=PTS-STARTPTS,aformat=sample_fmts=fltp:channel_layouts=stereo[h];\
[1:a]afade=t=out:st=0.05:d=3.6:curve=exp[sub];\
[2:a]lowpass=f=900,highpass=f=120,volume=0.4,afade=t=in:d=0.02,afade=t=out:st=0.05:d=1.6:curve=exp[nz];\
[sub][nz]amix=inputs=2:normalize=0,aecho=0.8:0.6:180|420:0.35|0.2,volume=14dB,alimiter=limit=0.6,aformat=sample_fmts=fltp:channel_layouts=stereo[t];\
[h][t]concat=n=2:v=0:a=1,atrim=0:65.5,afade=t=out:st=64.9:d=0.6[o]" -map "[o]" -c:a aac -b:a 192k -ar 44100 _tmp/motion_audio.m4a
    ffmpeg -nostdin -loglevel error -y -i "bientot/${src}_Bientot.mp4" -i _tmp/motion_audio.m4a -map 0:v -map 1:a -c copy -movflags +faststart _tmp/motion_mux.mp4
    mv _tmp/motion_mux.mp4 "bientot/${src}_Bientot.mp4"
  fi
done
