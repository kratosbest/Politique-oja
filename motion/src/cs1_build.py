import pathlib
B=pathlib.Path(__file__).parent
body=(B/'cs1_body.js').read_text()
html=f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>OJA — Coming soon : quelque chose arrive au Bénin</title>
<link rel="stylesheet" href="fonts/local.css">
<style>
*{{margin:0;padding:0}}
html,body{{width:1920px;height:1080px;overflow:hidden;background:#000}}
canvas{{display:block}}
.pre{{position:absolute;left:-9999px;top:0;width:10px;height:10px}}
</style>
</head>
<body>
<canvas id="cv" width="1920" height="1080"></canvas>
<img class="pre" id="bg" src="assets/csf/f0000.jpg"><img class="pre" id="logo" src="assets/mk_logo.png">
<audio id="aud" src="assets/soundtrack_comingsoon_trailer.m4a" preload="auto"></audio>
<span style="font:900 20px Poppins;position:absolute;left:-999px">A</span><span style="font:700 20px Inter;position:absolute;left:-999px">A</span><span style="font:500 20px Inter;position:absolute;left:-999px">A</span>
<script>
{body}
</script>
</body>
</html>
'''
(pathlib.Path(__file__).resolve().parents[1] / 'comingsoon_trailer.html').write_text(html)
print('ok')
