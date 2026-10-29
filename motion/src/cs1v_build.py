import pathlib
B = pathlib.Path(__file__).parent
s = (B / 'cs1_body.js').read_text()
# keep the 16:9 scene code (shots, phone glow, light trails drawn on the 1920x1080 canvas 'off'),
# then add the vertical layout: 4:5 picture band, labels, captions, end card and post
head = s.split('/* ---------- end card: partial logo through a slit ---------- */', 1)[0]
head = head[:head.index('function label(t) {')]
head = head.replace("const W = 1920, H = 1080, DUR = 21, FPS = 24;",
                    "const W = 1920, H = 1080, DUR = 21, FPS = 24;\nconst OW = 1080, OH = 1920, BY = 285, BH = 1350;     // vertical output, 4:5 picture band")
head = head.replace("const cv = document.getElementById('cv'), X = cv.getContext('2d');",
                    "const cv = document.getElementById('cv'), X = cv.getContext('2d');\n"
                    "const vc = document.createElement('canvas'); vc.width = OW; vc.height = OH; const V = vc.getContext('2d');")
body = head + (B / 'cs1v_tail.js').read_text()
html = f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>OJA — Coming soon : quelque chose arrive au Bénin (9:16)</title>
<link rel="stylesheet" href="fonts/local.css">
<style>
*{{margin:0;padding:0}}
html,body{{width:1080px;height:1920px;overflow:hidden;background:#000}}
canvas{{display:block}}
.pre{{position:absolute;left:-9999px;top:0;width:10px;height:10px}}
</style>
</head>
<body>
<canvas id="cv" width="1080" height="1920"></canvas>
<img class="pre" id="bg" src="assets/csf/f0000.jpg"><img class="pre" id="logo" src="assets/mk_logo.png">
<audio id="aud" src="assets/soundtrack_comingsoon_trailer.m4a" preload="auto"></audio>
<span style="font:900 20px Poppins;position:absolute;left:-999px">A</span><span style="font:700 20px Inter;position:absolute;left:-999px">A</span><span style="font:500 20px Inter;position:absolute;left:-999px">A</span>
<script>
{body}
</script>
</body>
</html>
'''
(pathlib.Path(__file__).resolve().parents[1] / 'comingsoon_trailer_9x16.html').write_text(html)
print('ok')
