"""Hook plate of « Arrête de marchander »: frames of the zem clip (clips_cs/cs4_p1.mp4, 0.3 s → 2.8 s) as JPEGs in assets/ammf/.
Run from motion/:  python3 amm_frames.py ffmpeg"""
import os, subprocess, sys
FF = sys.argv[1] if len(sys.argv) > 1 else 'ffmpeg'
os.makedirs('assets/ammf', exist_ok=True)
subprocess.run([FF, '-v', 'error', '-y', '-ss', '0.3', '-t', '2.5', '-i', 'clips_cs/cs4_p1.mp4', '-vf', 'fps=24,scale=1080:1920', '-q:v', '3',
                'assets/ammf/f%04d.jpg'], check=True)
print(len(os.listdir('assets/ammf')), 'frames')
