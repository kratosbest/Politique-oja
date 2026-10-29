import pathlib
B = pathlib.Path(__file__).parent
body = (B / 'cs2_body.js').read_text()
html = f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>OJA — Coming soon : et si tout était plus simple ?</title>
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
<img class="pre" id="bg" src="assets/cs2f/f0000.jpg"><img class="pre" id="mc" src="assets/mc/c7_048.webp"><img class="pre" id="logo" src="assets/mk_logo.png">
<audio id="aud" src="assets/soundtrack_comingsoon_simple.m4a" preload="auto"></audio>
<span style="font:900 20px Poppins;position:absolute;left:-999px">A</span><span style="font:700 20px Poppins;position:absolute;left:-999px">A</span><span style="font:700 20px Inter;position:absolute;left:-999px">A</span>
<script>
{body}
</script>
</body>
</html>
'''
(pathlib.Path(__file__).resolve().parents[1] / 'comingsoon_simple.html').write_text(html)
print('ok')
