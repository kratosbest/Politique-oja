import pathlib
B=pathlib.Path(__file__).parent
body=(B/'cd_body.js').read_text()
mp=(B/'bj_map.js').read_text()
html=f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>OJA — Coming soon : le compte à rebours</title>
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
<img class="pre" id="cd5" src="assets/cs/cd5.jpg"><img class="pre" id="cd4" src="assets/cs/cd4.jpg"><img class="pre" id="cd3" src="assets/cs/cd3.jpg"><img class="pre" id="cd2" src="assets/cs/cd2.jpg"><img class="pre" id="cd1" src="assets/cs/cd1.jpg"><img class="pre" id="logo" src="assets/mk_logo.png">
<audio id="aud" src="assets/soundtrack_comingsoon_countdown.m4a" preload="auto"></audio>
<span style="font:900 20px Poppins;position:absolute;left:-999px">5</span><span style="font:700 20px Inter;position:absolute;left:-999px">A</span>
<script>
{mp}
{body}
</script>
</body>
</html>
'''
(pathlib.Path(__file__).resolve().parents[1]/'comingsoon_countdown.html').write_text(html)
print('ok')
