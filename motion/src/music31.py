# OJA « Le local devient visible » (52 s, 16:9 and 9:16): score + sound design + Isac voice from 0.6 s, music ducked under the voice.
# usage: python3 music31.py out.wav voix_lieux.mp3 ffmpeg
import numpy as np, wave, sys, subprocess
SR=44100; DUR=52.0; N=int(SR*DUR)
L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(3131)
def add(sig,t,pan=0.0,g=1.0,buf=None):
    bl,br=(L,R) if buf is None else buf
    i=int(t*SR)
    if i>=N: return
    if i<0: sig=sig[-i:]; i=0
    j=min(N,i+len(sig)); s=sig[:j-i]*g
    bl[i:j]+=s*(1-max(0,pan)); br[i:j]+=s*(1+min(0,pan))
def env(n,a,d):
    t=np.arange(n)/SR; e=np.exp(-t/d); k=int(a*SR)
    if k>0: e[:k]*=np.linspace(0,1,k)
    return e
def lp(x,c):
    y=np.zeros_like(x); acc=0.0
    for i in range(len(x)): acc+=c*(x[i]-acc); y[i]=acc
    return y
def hp(x,c): return x-lp(x,c)
mf=lambda m:440*2**((m-69)/12)
def sweep(f0,f1,d,curve=1.0):
    n=int(d*SR); u=np.linspace(0,1,n)**curve; f=f0*(f1/f0)**u
    return np.sin(2*np.pi*np.cumsum(f)/SR)
def boom(t0,g=1.0,f0=100,f1=34,d=1.4):
    n=int(d*SR); tt=np.arange(n)/SR; fr=f1+(f0-f1)*np.exp(-tt*9)
    add(np.tanh(1.5*np.sin(2*np.pi*np.cumsum(fr)/SR))*env(n,.003,d*.33),t0,g=g)
def whoosh(t0,d=.6,g=.4,rev=False,pan=0):
    n=int(d*SR); x=rng.standard_normal(n); c=np.linspace(.02,.4,n)
    y=np.zeros(n); acc=0
    for i in range(n): acc+=c[i]*(x[i]-acc); y[i]=acc
    e=np.linspace(0,1,n)**3 if rev else np.sin(np.linspace(0,np.pi,n))**2
    add(y*e*2,t0,g=g,pan=pan)
def glitch(t0,d=.16,g=.3):
    n=int(d*SR); x=rng.standard_normal(n); hold=rng.integers(8,60); x=np.repeat(x[::hold],hold)[:n]
    gate=np.repeat(rng.random(n//400+1)>.35,400)[:n]; tone=np.sign(np.sin(2*np.pi*rng.uniform(300,1400)*np.arange(n)/SR))*.4
    add(np.round((x*.6+tone)*gate*np.linspace(1,.3,n)*6)/6,t0,pan=rng.uniform(-.5,.5),g=g)
def blip(t0,f,g=.05):
    n=int(.07*SR); tt=np.arange(n)/SR; add(np.sin(2*np.pi*f*tt)*env(n,.002,.025),t0,pan=rng.uniform(-.4,.4),g=g)
def pad(t0,t1,notes,g=.06,a=.8,rel=.8):
    n=int((t1-t0+rel)*SR); tt=np.arange(n)/SR; s=np.zeros(n)
    for m in notes:
        for det in (-.08,.08):
            f=mf(m+det*.1); s+=np.sin(2*np.pi*f*tt)+.22*np.sin(2*np.pi*2*f*tt)+.08*np.sin(2*np.pi*3*f*tt)
    e=np.minimum(1,tt/a)*np.clip((t1-t0+rel-tt)/rel,0,1)
    add(lp(s,.07)*e/len(notes)**.5,t0,g=g)
def chime(t0,fs=(1760,2637,3520),g=.12):
    for k,f in enumerate(fs):
        n=int(1.4*SR); tt=np.arange(n)/SR; add(np.sin(2*np.pi*f*tt)*np.exp(-tt*3.2),t0+k*.06,pan=.3-.3*k,g=g)


def pluck(m,d=.5,g=.1):
    n=int(d*SR); t=np.arange(n)/SR; f=mf(m)
    return (np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*2*f*t)*np.exp(-t*18)+.2*np.sin(2*np.pi*4*f*t)*np.exp(-t*30))*env(n,.002,.14)*g
def logd(m,d=.45,g=.3):          # log-drum style bass: sine with a falling pitch blip
    n=int(d*SR); t=np.arange(n)/SR; f=mf(m)*(1+.6*np.exp(-t*40))
    return np.tanh(1.8*np.sin(2*np.pi*np.cumsum(f)/SR))*env(n,.003,.16)*g
kn=int(.3*SR); tt=np.arange(kn)/SR; KICK=np.sin(2*np.pi*np.cumsum(45+80*np.exp(-tt*28))/SR)*env(kn,.002,.12)
def clap(t0,g=.18):
    n=int(.18*SR); x=hp(rng.standard_normal(n),.35)
    e=np.zeros(n)
    for k,o in enumerate((0,.011,.022)): i=int(o*SR); e[i:]+=np.exp(-np.arange(n-i)/SR/(.012 if k<2 else .06))
    add(x*e*.6,t0,g=g,pan=.05)
def shaker(t0,g=.05,pan=0):
    n=int(.06*SR); add(hp(rng.standard_normal(n),.6)*env(n,.004,.018),t0,g=g,pan=pan)
def click(t0,g=.12):
    n=int(.03*SR); t=np.arange(n)/SR; add((hp(rng.standard_normal(n),.5)*.6+np.sin(2*np.pi*2400*t))*env(n,.0005,.006),t0,g=g,pan=rng.uniform(-.2,.2))
def pop(t0,f=600,g=.16):
    m=int(.12*SR); t2=np.arange(m)/SR; add(np.sin(2*np.pi*np.cumsum(f+900*np.exp(-t2*40))/SR)*env(m,.002,.04),t0,g=g,pan=rng.uniform(-.5,.5))
def shimmer(t0,d,g=.1,p0=-.6,p1=.6,f0=2000,f1=5200):
    n=int(d*SR); u=np.linspace(0,1,n); s=np.zeros(n)
    for k in range(5): s+=np.sin(2*np.pi*np.cumsum(f0*(f1/f0)**u*(1+.013*k))/SR+k)
    e=np.sin(np.pi*u)**1.5; x=hp(rng.standard_normal(n),.5)*.5
    sig=(s/5*.75+x*.06)*e
    add(sig*(1-u)*1.0,t0,g=g,pan=p0); add(sig*u,t0,g=g,pan=p1)
def swell(tc,notes,d=.45,g=.1,pan=0):
    """reversed pluck chord that grows into the cut at tc and stops on it"""
    n=int(d*SR); s=np.zeros(n)
    for m in notes: s+=pluck(m,d,1.0)[:n]
    s=lp(s[::-1],.25)/len(notes)**.5; k=int(.008*SR); s[-k:]*=np.linspace(1,0,k)
    add(s,tc-d,g=g,pan=pan)
def chord_at(t):
    ch=PROG[int(max(0,t-2.95)/2.0)%4]; return [m+12 for m in ch[1:]]+[ch[1]+24]
PROG=[[50,62,66,69],[47,59,62,66],[43,59,62,67],[45,61,64,69]]

VO_AT = 0.6
sys.path.insert(0, __import__('os').path.dirname(__import__('os').path.abspath(__file__)))
from vo_marks import marks, LIEUX
W = marks(sys.argv[2] + '.json', LIEUX)
V = lambda k: W[k] + VO_AT
def piano(m, d=2.2, g=.1):
    n=int(d*SR); t2=np.arange(n)/SR; f=440*2**((m-69)/12); s=np.zeros(n)
    for h,(a,dec) in enumerate(((1,1.6),(.45,2.4),(.22,3.4),(.12,4.6)),1): s+=a*np.sin(2*np.pi*f*h*t2*(1+.0004*h*h))*np.exp(-t2*dec)
    return s*np.minimum(1,t2/.004)*g
def tick(t0,g=.07,f=3200):
    n=int(.025*SR); t2=np.arange(n)/SR; add(np.sin(2*np.pi*f*t2)*np.exp(-t2*260),t0,g=g)
def horn(t0,f=440,d=.28,g=.05,pan=0):
    n=int(d*SR); t2=np.arange(n)/SR; s=(np.sign(np.sin(2*np.pi*f*t2))+np.sign(np.sin(2*np.pi*f*1.26*t2)))*.5
    add(lp(s,.2)*np.minimum(1,t2/.01)*np.minimum(1,(d-t2)/.03),t0,g=g,pan=pan)
def success(t0, g=.12):
    for k,f in enumerate((1318.5,1975.5)):
        n=int(.9*SR); t2=np.arange(n)/SR; add((np.sin(2*np.pi*f*t2)+.3*np.sin(2*np.pi*2*f*t2))*np.exp(-t2*5),t0+k*.1,g=g,pan=-.2+.4*k)
def riser(t0,d,f0=110,f1=880,g=.12):
    n=int(d*SR); u=np.linspace(0,1,n); f=f0*(f1/f0)**(u**1.6); ph=2*np.pi*np.cumsum(f)/SR
    s=(np.sin(ph)+.5*np.sin(2*ph+.3)+.25*np.sin(3*ph))*u**2
    add(s,t0,g=g,pan=-.3); add(s*.8,t0+.012,g=g,pan=.3)
def ring(t0,g=.035,pan=.4):
    """soft phone ring: two short dual-tone bursts"""
    for k in range(2):
        n=int(.38*SR); t2=np.arange(n)/SR; s=(np.sin(2*np.pi*440*t2)+np.sin(2*np.pi*480*t2))*(.6+.4*np.sign(np.sin(2*np.pi*20*t2)))
        add(lp(s,.25)*np.minimum(1,t2/.01)*np.minimum(1,(.38-t2)/.03),t0+k*.5,g=g,pan=pan)
def ping(t0,g=.1):
    for k,f in enumerate((1046.5,1568.0)):
        n=int(.7*SR); t2=np.arange(n)/SR; add((np.sin(2*np.pi*f*t2)+.25*np.sin(2*np.pi*2*f*t2))*np.exp(-t2*6),t0+k*.09,g=g,pan=-.2+.4*k)
def typing(t0,d,step=.055,g=.05):
    tk=t0
    while tk<t0+d: click(tk,g*(.8+.4*rng.random())); tk+=step*(.8+.4*rng.random())
# ---------- act 1: her day, each hour with its own chord ----------
DAY=[(0,V('onze'),[45,57,60,64,67]),(V('onze'),V('expl'),[41,53,57,60,64]),(V('expl'),V('quatorze'),[43,55,58,62,67]),
     (V('quatorze'),V('msg'),[43,55,59,62,67]),(V('msg'),V('siAt'),[40,52,55,59,62])]
for a,b,ch in DAY:
    pad(max(0,a-.2),b+.2,ch,g=.045,a=.6,rel=.6)
    for i,m in enumerate(ch[1:]): add(piano(m+12,2.4,.035),a+.1+i*.09,pan=-.3+.15*i)
for a,b,st in ((V('t0'),V('onze'),.5),(V('quatorze'),V('msg'),.7)):
    tk=a; n_=0
    while tk<b-.2: tick(tk,.05 if n_%2 else .04,3300 if n_%2 else 2900); tk+=st; n_+=1
ring(V('appelle')-.25)
for k,key in enumerate(('bleue','laquelle')): pop(V(key)-.1,700+140*k,.08)
# the lost client: soft footsteps along the dotted path, then the question mark
tk=V('expl')+.2
while tk<V('perd')+.4: tick(tk,.035,1800+300*rng.random()); tk+=.26
boom(V('perd')+.15,.3,70,30,1.0); add(piano(40,3,.07),V('perd')+.2)
add(piano(36,3.5,.06),V('personne')); ping(V('ailleurs')-.4,.09)
# ---------- « sur la carte ? »: silence, a rise, the pin lands ----------
pad(V('siAt')-.2,V('ajoute'),[33,45,52],g=.05,a=1.2,rel=.3)
riser(V('siAt')+.2,V('carte')-V('siAt')-.3,98,620,.07)
boom(V('carte')-.05,.5,80,30,1.4); pop(V('carte')-.05,520,.14); chime(V('carte')+.05,(1175,1568,2349),.07)
riser(V('carte')+.4,V('ajoute')-V('carte')-.55,130,880,.06)
boom(V('ajoute')-.15,.7,85,28,2.2); shimmer(V('ajoute')-.15,1.2,.1,-.7,.7); chime(V('ajoute')-.05,(1175,1568,1976,2349),.09)
# ---------- act 2: the features, light afro-house groove ----------
BPM=112; b=60/BPM; T0=V('ajoute')-.1; t=T0; step=0
PROG=[[50,62,66,69],[47,59,62,66],[43,59,62,67],[45,61,64,69]]
def chord_at(tt):
    ch=PROG[int(max(0,tt-T0)/(4*b))%4]; return [m+12 for m in ch[1:]]+[ch[1]+24]
END=V('endA')-.3
while t<END:
    bar=int((t-T0)/(4*b))%4; s16=step%16; ch=PROG[bar]
    if s16%4==0 and t>T0+4*b: add(KICK,t,g=.34)
    if s16 in (4,12) and t>T0+4*b: clap(t,.1)
    shaker(t,.026 if s16%2 else .04,pan=.35 if s16%2 else -.35)
    if s16 in (2,7,10,14): add(logd(ch[0]+12 if s16==7 else ch[0]),t,g=.6)
    if s16 in (0,3,6,8,11,14): add(pluck(ch[1+(s16//3)%3]+12,g=.05),t,pan=(-.3 if s16%2 else .3))
    step+=1; t+=b/4
for k in range(int((END-T0)/(4*b))+1):
    t0=T0+k*4*b; ch=PROG[k%4]; pad(t0,min(t0+4*b,END)-.05,[m+12 for m in ch[1:]],g=.028,a=.2,rel=.3)
typing(V('nom'),.55,.045,.06); pop(V('cat'),760,.1); pop(V('point'),520,.12); boom(V('point')+.25,.18,90,40,.5)
for i in range(3): pop(V('photos')+i*.16,640+i*90,.09)
swell(V('mots')+.3,chord_at(V('mots')+.3),.45,.07); typing(V('derriere')-.05,.95,.06,.055); success(V('derriere')+1.35,.09)
swell(V('publics')-.15,chord_at(V('publics')),.45,.07)
for key in ('listep','marche','arret'): pop(V(key),560,.13)
for i in range(6): blip(V('tous')-.1+i*.13,1400+i*120,.05)
swell(V('deux')-.15,chord_at(V('deux')),.45,.07); pop(V('deux'),700,.09); pop(V('deux')+1.0,820,.09); chime(V('deux')+1.6,(1567.98,2093.0),.06)
click(V('valide')-.1,.08); boom(V('publie')+.35,.34,75,32,.9); success(V('publie')+.38,.12)
swell(V('erreur')-.15,chord_at(V('erreur')),.45,.07); click(V('signale')+.1,.1); success(V('signale')+.3,.09)
# ---------- end ----------
swell(V('endA')-.25,[74,78,81,86],.6,.12); boom(V('endA')-.25,.6,90,30,2.2); chime(V('endA')-.05,(1175,1760,2349,2960),.09)
shimmer(V('endA')-.2,.8,.08,-.6,.6)
pad(V('endA')-.25,51.6,[38,50,57,62,66,69,73],g=.07,a=.2,rel=.6)
for k,mm in enumerate((62,66,69,74,78)): add(pluck(mm+12,1.0,.045),V('endB')+1.7+k*.09,pan=-.4+.2*k)
# ---------- reverb ----------
irn=int(1.8*SR); ir=rng.standard_normal(irn)*np.exp(-np.arange(irn)/SR/0.5); ir=lp(ir,.25); ir/=np.abs(ir).sum()**.5*12
def conv(x,irx=ir):
    m=len(x)+len(irx); F=1<<(m-1).bit_length()
    return np.fft.irfft(np.fft.rfft(x,F)*np.fft.rfft(irx,F),F)[:len(x)]
L=L+conv(L)*.42; R=R+conv(R)*.42
# ---------- voice + ducking ----------
FF=sys.argv[3]
v=np.frombuffer(subprocess.run([FF,'-v','error','-i',sys.argv[2],'-ac','1','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout,np.float32).astype(float)
VOc=np.zeros(N); i=int(VO_AT*SR); VOc[i:i+len(v)]=v[:N-i]
VOc=VOc/np.abs(VOc).max()*.9; VOc=VOc+conv(VOc,ir[:int(.6*SR)])*.06
e=np.abs(VOc); k=int(.03*SR); e=np.convolve(e,np.ones(k)/k,'same'); e=lp(e,.0015)
duck=1-.6*np.clip(e/.06,0,1)
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk; R/=pk
fade=np.ones(N); k=int(.6*SR); fade[-k:]=np.linspace(1,0,k)**1.5
L=(L*.55*duck+VOc*.9)*fade; R=(R*.55*duck+VOc*.9)*fade
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk/.95; R/=pk/.95
st=(np.stack([L,R],1)*32767).astype(np.int16)
with wave.open(sys.argv[1],'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
