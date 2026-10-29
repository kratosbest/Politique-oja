# OJA Market launch spot: music + sound design, 20.5 s (no voice). Screen changes use tonal reverse swells, no noise whooshes.
import numpy as np, wave, sys
SR=44100; DUR=20.5; N=int(SR*DUR)
L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(1919)
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
# ---------- intro: warm drone + the light ribbon ----------
n=int(3.2*SR); tt=np.arange(n)/SR
add((np.sin(2*np.pi*73.4*tt)+.5*np.sin(2*np.pi*110*tt)+lp(rng.standard_normal(n),.005)*2)*np.interp(tt,[0,.6,2.6,3.2],[0,.22,.22,0]),0,g=.5)
shimmer(.1,1.45,.1)
pad(.2,3.0,[50,57,62,66,69],g=.05,a=1.2,rel=.6)
boom(1.52,.35,f0=80,d=1.2); swell(1.55,chord_at(3.0),.5,.12)
# typing in the search bar
for i in range(13): click(1.95+i*.85/13)
# ---------- groove: D - Bm - G - A, 120 BPM ----------
BPM=120; b=60/BPM; T0=2.95
PROG=[[50,62,66,69],[47,59,62,66],[43,59,62,67],[45,61,64,69]]
t=T0; step=0
while t<14.55:
    bar=int((t-T0)/(4*b))%4; s16=step%16; ch=PROG[bar]
    if s16%4==0: add(KICK,t,g=.5)
    if s16 in (4,12): clap(t)
    shaker(t,.035 if s16%2 else .055,pan=.35 if s16%2 else -.35)
    if s16 in (2,7,10,14): add(logd(ch[0]+12 if s16==7 else ch[0]),t,g=.85)
    if s16 in (0,3,6,8,11,14): add(pluck(ch[1+(s16//3)%3]+12,g=.075),t,pan=(-.3 if s16%2 else .3))
    if t>9.0 and s16 in (1,5,9,13): add(pluck(ch[3]+24,.3,g=.04),t,pan=.5)
    step+=1; t+=b/4
for k,ch in enumerate([PROG[(int((x-T0)/(4*b)))%4] for x in np.arange(T0,14.55,4*b)]):
    t0=T0+k*4*b; pad(t0,min(t0+4*b,14.55)-.05,[m+12 for m in ch[1:]],g=.035,a=.2,rel=.3)
swell(3.0,chord_at(3.0),.45,.12,pan=.15)
# cards pop out
for i in range(4): pop(3.85+i*.07,500+i*140)
# card to camera -> hero
swell(5.38,chord_at(5.38),.6,.12)
add(sweep(300,1800,.6,2)*np.linspace(0,1,int(.6*SR))**2*.3,4.78,g=.3)
boom(5.38,.7,95,32,1.8); chime(5.42,(1175,1760,2349),.09); shimmer(5.75,.8,.06,.5,-.5)
# checkout: whoosh in, tap, payment success
swell(6.75,chord_at(6.75),.4,.11,pan=.15); click(7.42,.2)
for k,f in enumerate((1318.5,1975.5)):
    n=int(.9*SR); t2=np.arange(n)/SR; add((np.sin(2*np.pi*f*t2)+.3*np.sin(2*np.pi*2*f*t2))*np.exp(-t2*5),7.55+k*.1,g=.13,pan=-.2+.4*k)
# streak into the map
shimmer(7.62,.95,.1,.6,-.6,1500,4200); swell(8.7,chord_at(8.7),.5,.1)
boom(8.72,.75,85,30,1.6); n=int(1.0*SR); add(lp(rng.standard_normal(n),.12)*env(n,.003,.3),8.72,g=.3)
# route drawing: soft rising tone
n=int(2.3*SR); u=np.linspace(0,1,n); add(sweep(220,660,2.3,1.2)*np.sin(np.pi*u)*.25,9.15,g=.18)
for k in range(6): pop(9.2+k*.38,1400+k*90,.05)
# the rider passes (engine with doppler)
n=int(1.0*SR); u=np.linspace(0,1,n); f=np.interp(u,[0,.4,.55,1],[150,128,120,82])
eng=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*.5+np.sin(2*np.pi*np.cumsum(f*.5)/SR)*.6+lp(rng.standard_normal(n),.08)*1.5
eng=lp(eng,.12)*np.interp(u,[0,.35,.55,1],[0,1,.9,0])**1.3
add(eng*(1-u),11.5,g=.32,pan=.7); add(eng*u,11.5,g=.32,pan=-.7); swell(11.52,chord_at(11.52),.4,.1)
# landing on the table, ribbon, logo, notification
boom(12.45,.55,75,32,1.0); n=int(.25*SR); add(lp(rng.standard_normal(n),.2)*env(n,.002,.05),12.45,g=.3)
shimmer(12.55,.95,.1,-.6,.6); chime(12.82,(1760,2637),.06)
for k,f in enumerate((1567.98,2093.0)):
    n=int(1.0*SR); t2=np.arange(n)/SR; add(np.sin(2*np.pi*f*t2)*np.exp(-t2*4.2),13.47+k*.13,g=.12)
# ---------- break: slogans ----------
pad(14.55,17.7,[50,57,62,66,69,74],g=.1,a=.4,rel=.4)
swell(14.66,[62+12,66+12,69+12,74+12],.55,.1); shimmer(15.1,.75,.07,-.5,.5)
for k,m in enumerate((62,66,69,74)): add(pluck(m+12,.9,.05),14.75+k*.12,pan=-.3+.2*k)
swell(16.33,[59+12,62+12,66+12,71+12],.5,.1); shimmer(16.75,.7,.07,-.5,.5)
for k,m in enumerate((59,62,66,71)): add(pluck(m+12,.9,.05),16.45+k*.12,pan=.3-.2*k)
# build into the logo
n=int(1.0*SR); u=np.linspace(0,1,n); add(sweep(150,620,1.0,1.4)*u**2.5*.4,16.78,g=.3)
for k in range(12): add(KICK,16.78+k*(1.0/12)*(1-.3*k/12),g=.12+.25*k/12)
boom(17.78,.75,95,30,2.2); shimmer(17.85,.6,.1,-.6,.6)
boom(18.05,.6,70,30,1.6); chime(18.08,(1175,1760,2349,2960),.1)
pad(17.78,20.1,[38,50,57,62,66,69,73],g=.08,a=.15,rel=.5)
for k,m in enumerate((62,66,69,74,78)): add(pluck(m+12,1.0,.05),18.9+k*.09,pan=-.4+.2*k)
# ---------- reverb + master ----------
irn=int(1.8*SR); ir=rng.standard_normal(irn)*np.exp(-np.arange(irn)/SR/0.5); ir=lp(ir,.25); ir/=np.abs(ir).sum()**.5*12
def conv(x,irx=ir):
    m=len(x)+len(irx); F=1<<(m-1).bit_length()
    return np.fft.irfft(np.fft.rfft(x,F)*np.fft.rfft(irx,F),F)[:len(x)]
L=L+conv(L)*.32; R=R+conv(R)*.32
fade=np.ones(N); k=int(.5*SR); fade[-k:]=np.linspace(1,0,k)**1.5; k=int(.05*SR); fade[:k]=np.linspace(0,1,k)
L*=fade; R*=fade
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk/.95; R/=pk/.95
st=(np.stack([L,R],1)*32767).astype(np.int16)
with wave.open(sys.argv[1],'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
