"""ElevenLabs text-to-speech straight into the repo, without the web app.

Needs the environment variable ELEVENLABS_API_KEY (set in the cloud environment settings, never in the chat)
and api.elevenlabs.io allowed by the environment's network policy.

Credits are checked before every generation: the run is refused when its cost would exceed the credits left on
the subscription or the --max-credits budget, so nothing is ever billed beyond the plan.

  python3 tts.py --credits                                   # credits used / left
  python3 tts.py --models                                    # models the account can use
  python3 tts.py --voices                                    # voices in "My voices"
  python3 tts.py --find-shared Isac                          # search the voice library
  python3 tts.py --add-shared PUBLIC_OWNER_ID VOICE_ID NAME  # add a library voice to "My voices"
  python3 tts.py --voice SomyDQQmnE7TsltdiDgp --text-file voix.txt --out ../assets/cs/voix.mp3 [--model eleven_v3]
                 [--max-credits 400] [--dry-run]
The generation also writes <out>.json with per-character timings (to sync captions with the voice)."""
import argparse, base64, json, os, sys, urllib.error, urllib.parse, urllib.request

API = 'https://api.elevenlabs.io'


def call(method, path, body=None):
    key = os.environ.get('ELEVENLABS_API_KEY')
    if not key:
        sys.exit('ELEVENLABS_API_KEY is not set in this environment.')
    req = urllib.request.Request(API + path, method=method, headers={'xi-api-key': key, 'Content-Type': 'application/json', 'Accept': 'application/json'},
                                 data=json.dumps(body).encode() if body is not None else None)
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            return json.loads(r.read() or b'null')
    except urllib.error.HTTPError as e:
        sys.exit(f'ElevenLabs {e.code}: {e.read().decode(errors="replace")[:500]}')
    except urllib.error.URLError as e:
        sys.exit(f'Cannot reach {API} ({e.reason}). Is api.elevenlabs.io allowed by the network policy?')


def credits():
    s = call('GET', '/v1/user/subscription')
    used, limit = s.get('character_count', 0), s.get('character_limit', 0)
    return used, limit, limit - used, s.get('tier', '?')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--credits', action='store_true'); ap.add_argument('--models', action='store_true'); ap.add_argument('--voices', action='store_true')
    ap.add_argument('--find-shared'); ap.add_argument('--add-shared', nargs=3, metavar=('PUBLIC_OWNER_ID', 'VOICE_ID', 'NAME'))
    ap.add_argument('--voice'); ap.add_argument('--text-file'); ap.add_argument('--out')
    ap.add_argument('--model', default='eleven_v3'); ap.add_argument('--language', default='fr')
    ap.add_argument('--max-credits', type=int); ap.add_argument('--cost-per-char', type=float, default=1.0)
    ap.add_argument('--stability', type=float); ap.add_argument('--dry-run', action='store_true')
    a = ap.parse_args()
    if a.credits:
        used, limit, left, tier = credits(); print(f'plan {tier}: {used} / {limit} credits used, {left} left'); return
    if a.models:
        for m in call('GET', '/v1/models'):
            print(m['model_id'], '|', m.get('name'), '| tts' if m.get('can_do_text_to_speech') else '', '| cost x', m.get('model_rates', {}).get('character_cost_multiplier', '?'))
        return
    if a.voices:
        for v in call('GET', '/v1/voices')['voices']:
            print(v['voice_id'], '|', v['name'], '|', v.get('category'), '|', (v.get('labels') or {}).get('accent', ''))
        return
    if a.find_shared:
        q = urllib.parse.quote(a.find_shared)
        for v in call('GET', f'/v1/shared-voices?page_size=20&search={q}')['voices']:
            print(v['voice_id'], '|', v['public_owner_id'], '|', v['name'], '|', v.get('gender'), v.get('accent'), v.get('language'))
        return
    if a.add_shared:
        owner, vid, name = a.add_shared
        print(call('POST', f'/v1/voices/add/{owner}/{vid}', {'new_name': name})); return
    if not (a.voice and a.text_file and a.out):
        ap.error('--voice, --text-file and --out are needed to generate')
    text = open(a.text_file, encoding='utf-8').read().strip()
    cost = int(len(text) * a.cost_per_char + .999)
    used, limit, left, tier = credits()
    print(f'{len(text)} characters, about {cost} credits; plan {tier}: {left} credits left')
    if cost > left:
        sys.exit('Refused: not enough subscription credits left (no overage allowed).')
    if a.max_credits is not None and cost > a.max_credits:
        sys.exit(f'Refused: over the --max-credits budget ({a.max_credits}).')
    if a.dry_run:
        return
    body = {'text': text, 'model_id': a.model, 'language_code': a.language}
    if a.stability is not None:
        body['voice_settings'] = {'stability': a.stability}
    r = call('POST', f'/v1/text-to-speech/{a.voice}/with-timestamps?output_format=mp3_44100_128', body)
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    open(a.out, 'wb').write(base64.b64decode(r['audio_base64']))
    json.dump(r.get('alignment'), open(a.out + '.json', 'w'), ensure_ascii=False)
    used2, _, left2, _ = credits()
    print(f'wrote {a.out} (+ timings); {used2 - used} credits used, {left2} left')


if __name__ == '__main__':
    main()
