# Coming soon concept 4 « OJA, c'est pour nous »: score + Flow dialogue + chorus + Isac voice, 25 s
import numpy as np, wave, sys, subprocess
SR=44100; DUR=25.0; N=int(SR*DUR); FF=sys.argv[3]; MOT=sys.argv[4]
L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(1717)
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

# ---------- afro-pop groove, A major (I vi IV V) ----------
BPM=108; st=60/BPM/4
kn=int(.3*SR); tt=np.arange(kn)/SR; KICK=np.sin(2*np.pi*np.cumsum(45+75*np.exp(-tt*28))/SR)*env(kn,.002,.11)
nz=rng.standard_normal(int(.22*SR)); CLAP=hp(nz,.3)*env(len(nz),.001,.05)*.55
sh=rng.standard_normal(int(.05*SR)); SHK=hp(sh,.6)*env(len(sh),.003,.015)*.3
def logdrum(m,d=.3):
    n=int(d*SR); t=np.arange(n)/SR; fr=mf(m)*(1+.5*np.exp(-t*40))
    return np.tanh(2*np.sin(2*np.pi*np.cumsum(fr)/SR))*env(n,.003,.12)*.45
def pluck(ms,d=.25):
    n=int(d*SR); t=np.arange(n)/SR; s=np.zeros(n)
    for m in ms:
        for h in (1,2,3): s+=np.sin(2*np.pi*mf(m)*h*t)/(h*1.6)
    return s*env(n,.004,.08)*.12
def stab(ms,d=.35):
    n=int(d*SR); t=np.arange(n)/SR; s=np.zeros(n)
    for m in ms:
        ph=np.cumsum(np.full(n,mf(m)))/SR; s+=lp(2*(ph%1)-1,.25)
    return s*env(n,.01,.12)*.09
roots=[45,42,38,40]; chords=[[69,73,76],[66,69,73],[62,66,69],[64,68,71]]
def section(t0,t1,full=False,clap=True):
    step=0; t=t0
    while t<t1:
        b=step%16; bar=(step//16)%4
        if b in (0,6,10) or (full and b==14): add(KICK,t,g=.6 if full else .45)
        if clap and b in (4,12): add(CLAP,t,pan=.1,g=.5)
        add(SHK,t,pan=(-.35 if step%2 else .35),g=(.8 if b%4==2 else .35))
        if b in (0,3,7,10,13): add(logdrum(roots[bar]+(12 if b in (7,13) else 0)),t,g=.6)
        if b in (2,6,11,14): add(pluck(chords[bar]),t,pan=(.3 if b%4==2 else -.3),g=.9)
        if full and b in (0,8): add(stab(chords[bar]),t,g=.8)
        step+=1; t=t0+step*st
section(.1,11.07,clap=False)
section(11.07,16.85,clap=True)
# breakdown on the 2x2 grid: drums out, riser
whoosh(16.55,.4,.2,rev=True); glitch(16.85,.1,.16)
n=int(1.73*SR); tt=np.arange(n)/SR; u=tt/1.73
add(hp(rng.standard_normal(n),.15)*u**2.2*.45,16.87,g=.4); add(sweep(200,1200,1.73,2)*u**2*.3,16.87,g=.3)
pad(16.87,18.55,[57,61,64,69],g=.06,a=.3,rel=.05)
# the mascot: drop
glitch(18.57,.2,.3); boom(18.6,1.0,95,32,2.0); chime(18.62,g=.14)
n=int(1.4*SR); add(lp(rng.standard_normal(n),.12)*env(n,.003,.35),18.6,g=.35)
section(18.6,21.6,full=True)
# end card
glitch(21.57,.25,.4); boom(21.6,1.1,88,30,2.2)
n=int(.6*SR); tt=np.arange(n)/SR; mt=sum(np.sin(2*np.pi*1760*r*tt+k)*np.exp(-tt*(12+5*k)) for k,r in enumerate((1,1.53,2.17)))
add(mt*.4,21.6,g=.35)
section(21.6,24.9,full=True)
pad(21.6,24.8,[45,57,61,64,69],g=.05,a=.4,rel=.3)
for j in range(10): blip(22.12+j*.045,1700+600*rng.random())
for j in range(12): blip(22.47+j*.04,1900+600*rng.random(),.035)
glitch(23.19,.07,.16)
# ---------- reverb ----------
irn=int(1.6*SR); ir=rng.standard_normal(irn)*np.exp(-np.arange(irn)/SR/0.45); ir=lp(ir,.25); ir/=np.abs(ir).sum()**.5*12
def conv(x,irx=ir):
    m=len(x)+len(irx); F=1<<(m-1).bit_length()
    return np.fft.irfft(np.fft.rfft(x,F)*np.fft.rfft(irx,F),F)[:len(x)]
L=L+conv(L)*.3; R=R+conv(R)*.3
def load(path,a=None,d=None):
    cmd=[FF,'-v','error']+(['-ss',f'{a:.3f}','-t',f'{d:.3f}'] if a is not None else [])+['-i',path,'-ac','1','-ar',str(SR),'-f','f32le','-']
    return np.frombuffer(subprocess.run(cmd,capture_output=True).stdout,np.float32).astype(float)
def load(path,a=None,d=None):
    cmd=[FF,'-v','error']+(['-ss',f'{a:.3f}','-t',f'{d:.3f}'] if a is not None else [])+['-i',path,'-ac','1','-ar',str(SR),'-f','f32le','-']
    return np.frombuffer(subprocess.run(cmd,capture_output=True).stdout,np.float32).astype(float)
def fadeit(s,k=.015):
    k=int(k*SR); s=s.copy(); s[:k]*=np.linspace(0,1,k); s[-k:]*=np.linspace(1,0,k); return s
# ---------- the four people (Flow dialogue), same cuts as the picture ----------
DIA=np.zeros(N)
EDL=[(0.00,'cs4_p1',0.35,2.12),(1.77,'cs4_p1',4.35,5.90),(3.32,'cs4_p2',0.30,3.50),(6.52,'cs4_p3',0.40,2.40),(8.52,'cs4_p4',0.40,2.95),
     (11.07,'cs4_p1',6.20,7.60),(12.47,'cs4_p2',4.05,5.75),(14.17,'cs4_p3',5.85,7.35),(15.67,'cs4_p4',3.45,4.65)]
for t0,c,a,b in EDL:
    s=fadeit(load(f'{MOT}/clips_cs/{c}.mp4',a,b-a)); i=int(t0*SR); DIA[i:i+len(s)]+=s
# chorus: the four « C'est pour nous » together on the grid
CH=np.zeros(N)
for (c,a,b,on),pan in zip([('cs4_p1',6.20,7.60,.18),('cs4_p2',4.05,5.75,.11),('cs4_p3',5.85,7.35,.18),('cs4_p4',3.45,4.65,.17)],(-.5,-.2,.2,.5)):
    s=fadeit(load(f'{MOT}/clips_cs/{c}.mp4',a,b-a)); i=int((16.95-on)*SR); CH[i:i+len(s)]+=s*.55
DIA/=max(1e-6,np.abs(DIA).max()); CH/=max(1e-6,np.abs(CH).max())
# ---------- Isac (lines taken from the concept 2 voice) ----------
v=load(sys.argv[2]); VO=np.zeros(N)
for a,b,t0 in [(11.85,14.38,18.80),(14.55,15.88,21.90)]:
    seg=fadeit(v[int(a*SR):int(b*SR)],.02); i=int(t0*SR); VO[i:i+len(seg)]+=seg
VO=VO/np.abs(VO).max()*.9; VO=VO+conv(VO,ir[:int(.8*SR)])*.1
SPEECH=np.abs(DIA)+np.abs(VO)+np.abs(CH)*.6
e=SPEECH; k=int(.03*SR); e=np.convolve(e,np.ones(k)/k,'same'); e=lp(e,.0015)
duck=1-.6*np.clip(e/.08,0,1)
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk; R/=pk
fade=np.ones(N); k=int(.45*SR); fade[-k:]=np.linspace(1,0,k)**1.5
L=(L*.5*duck+DIA*.9+CH*.7+VO*.85)*fade; R=(R*.5*duck+DIA*.9+CH*.7+VO*.85)*fade
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk/.95; R/=pk/.95
st=(np.stack([L,R],1)*32767).astype(np.int16)
with wave.open(sys.argv[1],'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
