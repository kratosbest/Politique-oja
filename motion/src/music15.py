# Coming soon concept 2 « Et si tout était plus simple ? »: score + clip ambience + Isac voice, 28 s
import numpy as np, wave, sys, subprocess
SR=44100; DUR=28.0; N=int(SR*DUR); FF=sys.argv[3]; MOT=sys.argv[4]
L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(1515)
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

# ---------- light groove under the three daily hassles (0 -> 16.8) ----------
BPM=100; st=60/BPM/4
kn=int(.3*SR); tt=np.arange(kn)/SR; KICK=np.sin(2*np.pi*np.cumsum(45+70*np.exp(-tt*30))/SR)*env(kn,.002,.1)
sh=rng.standard_normal(int(.05*SR)); SHK=hp(sh,.6)*env(len(sh),.003,.015)*.3
def logdrum(m,d=.3):
    n=int(d*SR); t=np.arange(n)/SR; fr=mf(m)*(1+.5*np.exp(-t*40))
    return np.tanh(2*np.sin(2*np.pi*np.cumsum(fr)/SR))*env(n,.003,.12)*.45
def marimba(m,d=.4):
    n=int(d*SR); t=np.arange(n)/SR; f=mf(m)
    return (np.sin(2*np.pi*f*t)+.3*np.sin(2*np.pi*4*f*t)*np.exp(-t*30))*env(n,.002,.12)*.16
roots=[45,43,41,43]; mel=[[69,72,76],[67,71,74],[65,69,72],[67,71,74]]
step=0; t=0.15
while t<16.6:
    b=step%16; bar=(step//16)%4
    if b in (0,7,10): add(KICK,t,g=.55)
    add(SHK,t,pan=(-.35 if step%2 else .35),g=(.8 if b%4==2 else .35))
    if b in (0,3,8,11): add(logdrum(roots[bar]),t,g=.6)
    if b in (2,6,12,14): add(marimba(mel[bar][(b//4)%3]),t,pan=rng.uniform(-.3,.3))
    step+=1; t=.15+step*st
# small accents on the cuts
for c in (6.0,11.3): whoosh(c-.35,.4,.15,rev=True); glitch(c-.02,.06,.12)
# ---------- the phones: the groove stops, tension, then the orange lift ----------
whoosh(16.45,.4,.2,rev=True); boom(16.8,.45,f0=70,d=1.2); glitch(16.78,.08,.15)
n=int(3.6*SR); tt=np.arange(n)/SR
add((np.sin(2*np.pi*55*tt)+.5*np.sin(2*np.pi*82.4*tt))*np.minimum(1,tt/.6)*np.clip((3.6-tt)/.2,0,1)*.18,16.8)
for v0 in (16.95,18.15,19.35):
    m=int(.32*SR); t2=np.arange(m)/SR
    bz=lp(np.sign(np.sin(2*np.pi*157*t2))*(.6+.4*np.sin(2*np.pi*31*t2)),.18)*np.minimum(1,np.minimum(t2,.32-t2)/.02)
    add(bz,v0,g=.12); chime(v0+.5,(1318,1976),.05)
pad(20.4,23.3,[57,61,64,69],g=.07,a=.35,rel=.1); chime(20.42,g=.12); glitch(20.38,.1,.18)
# merge + riser into the silhouette
n=int(1.0*SR); tt=np.arange(n)/SR; u=tt/1.0
add(hp(rng.standard_normal(n),.15)*u**2.4*.5,22.4,g=.4); add(sweep(220,1300,1.0,2)*u**2*.3,22.4,g=.3)
# ---------- silhouette + end card ----------
glitch(23.37,.2,.35); boom(23.4,1.0,90,32,2.0)
n=int(1.6*SR); add(lp(rng.standard_normal(n),.1)*env(n,.003,.4),23.4,g=.4)
pad(23.4,27.6,[45,52,57,61,64],g=.06,a=.5,rel=.4)
glitch(24.67,.25,.4); boom(24.7,1.1,85,30,2.2)
n=int(.6*SR); tt=np.arange(n)/SR; mt=sum(np.sin(2*np.pi*1760*r*tt+k)*np.exp(-tt*(12+5*k)) for k,r in enumerate((1,1.53,2.17)))
add(mt*.4,24.7,g=.35)
for j in range(10): blip(25.08+j*.045,1700+600*rng.random())
for j in range(12): blip(25.45+j*.04,1900+600*rng.random(),.035)
glitch(26.24,.07,.16); glitch(27.29,.07,.16)
# ---------- reverb ----------
irn=int(1.6*SR); ir=rng.standard_normal(irn)*np.exp(-np.arange(irn)/SR/0.45); ir=lp(ir,.25); ir/=np.abs(ir).sum()**.5*12
def conv(x,irx=ir):
    m=len(x)+len(irx); F=1<<(m-1).bit_length()
    return np.fft.irfft(np.fft.rfft(x,F)*np.fft.rfft(irx,F),F)[:len(x)]
L=L+conv(L)*.3; R=R+conv(R)*.3
def load(path,a=None,d=None):
    cmd=[FF,'-v','error']+(['-ss',f'{a:.3f}','-t',f'{d:.3f}'] if a is not None else [])+['-i',path,'-ac','1','-ar',str(SR),'-f','f32le','-']
    return np.frombuffer(subprocess.run(cmd,capture_output=True).stdout,np.float32).astype(float)
# ---------- clip ambience (sighs, door, phone buzz) ----------
AMB=np.zeros(N)
EDL=[(0.0,'cs2_p1',1.0,6.0,1.0),(6.0,'cs2_p2',2.6,5.3,1.6),(11.3,'cs2_p3',.8,5.5,1.0),(16.8,'cs2_p4',2.0,1.2,1.0),(18.0,'cs2_p5',2.2,1.2,1.0),(19.2,'cs2_p6',2.2,1.2,.35)]
for t0,c,a,d,gn in EDL:
    s=load(f'{MOT}/clips_cs/{c}.mp4',a,d); k=int(.05*SR); s[:k]*=np.linspace(0,1,k); s[-k:]*=np.linspace(1,0,k)
    i=int(t0*SR); AMB[i:i+len(s)]+=s*gn
for c,gn in (('cs2_p4',.5),('cs2_p5',.5),('cs2_p6',.2)):
    s=load(f'{MOT}/clips_cs/{c}.mp4',4.6,3.0); k=int(.08*SR); s[:k]*=np.linspace(0,1,k); s[-k:]*=np.linspace(1,0,k)
    i=int(20.4*SR); AMB[i:i+len(s)]+=s*gn
AMB/=max(1e-6,np.abs(AMB).max())
# ---------- voice: Isac, phrases placed on the picture ----------
v=load(sys.argv[2])
PH=[(0.10,1.18,0.60),(1.72,2.98,2.60),(3.65,4.82,6.40),(5.02,6.42,8.40),(6.88,9.45,11.90),(9.93,11.48,20.60),(11.85,15.88,23.50)]
VO=np.zeros(N)
for a,b,t0 in PH:
    seg=v[int(a*SR):int(b*SR)].copy(); k=int(.02*SR); seg[:k]*=np.linspace(0,1,k); seg[-k:]*=np.linspace(1,0,k)
    i=int(t0*SR); VO[i:i+len(seg)]+=seg
VO=VO/np.abs(VO).max()*.9
VO=VO+conv(VO,ir[:int(.8*SR)])*.1
e=np.abs(VO); k=int(.03*SR); e=np.convolve(e,np.ones(k)/k,'same'); e=lp(e,.0015)
duck=1-.55*np.clip(e/.08,0,1)
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk; R/=pk
fade=np.ones(N); k=int(.5*SR); fade[-k:]=np.linspace(1,0,k)**1.5
L=(L*.55*duck+AMB*.32*(.6+.4*duck)+VO*.85)*fade; R=(R*.55*duck+AMB*.32*(.6+.4*duck)+VO*.85)*fade
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk/.95; R/=pk/.95
st=(np.stack([L,R],1)*32767).astype(np.int16)
with wave.open(sys.argv[1],'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
