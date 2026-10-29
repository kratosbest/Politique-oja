"""ElevenLabs image generation straight into the repo (same key and network setup as tts.py).
The /v1/flows/image endpoint needs an ElevenLabs Pro plan or above (a Creator plan gets a 402).

  python3 img.py --prompt-file p.txt --out ../assets/x.png [--model gpt-image-2.5-sunburst] [--ref ../assets/moto.png ...]
                 [--aspect 3:2] [--resolution 2K] [--quality high] [--min-left 3000]

The generation is refused when fewer than --min-left credits are left on the subscription (no overage allowed),
and the credits it actually used are printed afterwards."""
import argparse, base64, json, os, sys, time, urllib.request
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tts import call, credits

MIME = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp'}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--prompt-file', required=True); ap.add_argument('--out', required=True)
    ap.add_argument('--model', default='gpt-image-2.5-sunburst'); ap.add_argument('--ref', action='append', default=[])
    ap.add_argument('--aspect'); ap.add_argument('--resolution'); ap.add_argument('--quality'); ap.add_argument('--background')
    ap.add_argument('--min-left', type=int, default=3000)
    a = ap.parse_args()
    used, limit, left, tier = credits()
    print(f'plan {tier}: {left} credits left')
    if left < a.min_left:
        sys.exit(f'Refused: fewer than {a.min_left} credits left.')
    body = {'model_id': a.model, 'prompt': open(a.prompt_file, encoding='utf-8').read().strip()}
    if a.ref:
        body['images'] = [{'type': 'inline_base64', 'mime_type': MIME[os.path.splitext(r)[1].lower()],
                           'content_base64': base64.b64encode(open(r, 'rb').read()).decode()} for r in a.ref]
    for k in ('aspect', 'resolution', 'quality', 'background'):
        v = getattr(a, k)
        if v:
            body['aspect_ratio' if k == 'aspect' else k] = v
    gid = call('POST', '/v1/flows/image', body)['id']
    print('generation', gid)
    for _ in range(150):
        time.sleep(4)
        r = call('GET', f'/v1/flows/image/{gid}')
        if r['status'] == 'completed':
            data = urllib.request.urlopen(r['content_url'], timeout=120).read()
            os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
            open(a.out, 'wb').write(data)
            used2, _, left2, _ = credits()
            print(f'wrote {a.out} ({r["content_mime_type"]}, {len(data)} bytes); {used2 - used} credits used, {left2} left')
            return
        if r['status'] == 'failed':
            sys.exit(f'Generation failed: {json.dumps(r)[:400]}')
    sys.exit('Timed out waiting for the generation.')


if __name__ == '__main__':
    main()
