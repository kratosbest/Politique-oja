"""Sketch 3 « Monsieur Je-connais-tout » (Google Flow clips): the edit. Places the clip segments one after the other,
the map OJA insert and the end card, then puts each dubbed piece (assets/sketch3/dub.json, src/sk3_dub.py) at its time
in the edit. Writes assets/sketch3/marks.js (window.SK3) and marks.json, read by oja_sketch_flow3.html and
src/sk3_audio.py.
  python3 src/sk3_marks.py"""
import json
FPS_SRC = 24
# clip, in, out (seconds in the clip); INSERT = the phone with the map OJA
EDL = [('p1', 0.0, 7.6), ('p2', .75, 5.3), ('p4', 0.0, 7.7), ('p5', 1.6, 7.4), ('p6', 0.0, 4.95), ('INSERT', 0.0, 2.6),
       ('p6', 4.95, 7.9), ('p8', 0.0, 7.9)]
END_IN_P8 = 5.0          # the end card comes in at this point of the last shot
HOLD = .5                # the last frame stays a little under the end card
segs, t = [], 0.0
for clip, a, b in EDL:
    segs.append(dict(clip=clip, a=a, b=b, t=round(t, 3))); t += b - a
total = round(t + HOLD, 3)
dub = json.load(open('assets/sketch3/dub.json'))
pieces = []
for p in dub:
    for s in segs:
        if s['clip'] == p['clip'] and s['a'] - .05 <= p['start'] < s['b']:
            g = s['t'] + p['start'] - s['a']
            pieces.append(dict(id=p['id'], who=p['who'], t=round(g, 3), dur=p['dur'], text=p['text']))
            break
    else:
        raise SystemExit(f'piece {p["id"]} at {p["start"]} in {p["clip"]} falls outside the edit')
pieces.sort(key=lambda x: x['t'])
subs = []
for i, p in enumerate(pieces):
    nxt = pieces[i + 1]['t'] if i + 1 < len(pieces) else 1e9
    subs.append(dict(t0=p['t'], t1=round(min(p['t'] + p['dur'] + .3, nxt), 3), text=p['text']))
seg = {s['clip'] + ('b' if s['clip'] == 'p6' and s['a'] > 0 else ''): s for s in segs}
ev = dict(insert=seg['INSERT']['t'], end=round(seg['p8']['t'] + END_IN_P8, 3), silence=seg['p5']['t'],
          silence_end=round(seg['p5']['t'] + 5.72 - 1.6, 3), maquis=seg['p8']['t'])
SK = dict(fps_src=FPS_SRC, segs=segs, pieces=pieces, subs=subs, ev=ev, total=total)
json.dump(SK, open('assets/sketch3/marks.json', 'w'), ensure_ascii=False, indent=1)
open('assets/sketch3/marks.js', 'w').write('window.SK3 = ' + json.dumps(SK, ensure_ascii=False) + ';\n')
for s in segs: print(f"{s['t']:6.2f}  {s['clip']:6s} {s['a']:.2f}-{s['b']:.2f}")
for p in pieces: print(f"   {p['t']:6.2f} {p['who']:6s} {p['text']}")
print(ev, 'total', total)
