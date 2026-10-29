# Coming soon concept 6 « Ils ne savent pas encore »: score + clip ambience + Isac voice, 20 s
import numpy as np, wave, sys, subprocess
SR=44100; DUR=20.0; N=int(SR*DUR); FF=sys.argv[3]; MOT=sys.argv[4]
L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(1616)
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

# ---------- mysterious bed: drone, heartbeat, a clock that ticks (0 -> 15.5) ----------
n=int(15.45*SR); tt=np.arange(n)/SR
dr=np.sin(2*np.pi*49*tt)+.5*np.sin(2*np.pi*49.25*tt)+.35*np.sin(2*np.pi*73.4*tt)+lp(rng.standard_normal(n),.006)*3
add(dr*np.interp(tt,[0,1.2,11,14.1,15.3,15.45],[0,.24,.3,.42,.5,0]),0,g=.5)
def thump(t0,g=.25):
    m=int(.35*SR); t2=np.arange(m)/SR; add(np.sin(2*np.pi*np.cumsum(42+30*np.exp(-t2*25))/SR)*env(m,.004,.09),t0,g=g)
def tick(t0,g=.1,f=2900):
    m=int(.04*SR); t2=np.arange(m)/SR; add((np.sin(2*np.pi*f*t2)+.4*hp(rng.standard_normal(m),.6))*np.exp(-t2*140),t0,pan=.2,g=g)
t=.6
while t<11.0: thump(t,.22); thump(t+.28,.12); t+=1.0
t=.6; k=0
while t<14.1: tick(t,.08,2900 if k%2 else 2400); t+=.5; k+=1
# soft low piano, minor
def piano(t0,ms,g=.15,d=2.6):
    m=int(d*SR); t2=np.arange(m)/SR; s=np.zeros(m)
    for mm in ms:
        f=mf(mm)
        for h,a in ((1,1),(2,.45),(3,.2),(4,.1)): s+=a*np.sin(2*np.pi*f*h*t2)*np.exp(-t2*(1.1+.9*h))
    add(s*np.minimum(1,t2/.004)/len(ms)**.5,t0,g=g)
for t0,ms in [(.6,[57]),(3.6,[60]),(7.2,[59]),(11.0,[57,64])]: piano(t0,ms)
for c in (3.6,7.2): whoosh(c-.35,.4,.13,rev=True); glitch(c-.02,.05,.1)
# the triptych: the world holds its breath
boom(11.0,.5,f0=70,d=1.4); glitch(10.98,.08,.14)
n=int(3.1*SR); tt=np.arange(n)/SR; add(sweep(300,900,3.1,1.8)*(tt/3.1)**2*.18,11.05,g=.4)
add(hp(rng.standard_normal(n),.15)*(tt/3.1)**2.4*.35,11.05,g=.35)
# the orange sweep on « changer »
whoosh(13.85,.6,.35,rev=True); glitch(14.13,.12,.25); chime(14.2,g=.14)
pad(14.2,15.45,[57,61,64,69],g=.07,a=.25,rel=.05)
# end card
glitch(15.47,.25,.4); boom(15.5,1.15,88,30,2.3)
n=int(1.6*SR); add(lp(rng.standard_normal(n),.1)*env(n,.003,.4),15.5,g=.4)
n=int(.6*SR); tt=np.arange(n)/SR; mt=sum(np.sin(2*np.pi*1760*r*tt+k)*np.exp(-tt*(12+5*k)) for k,r in enumerate((1,1.53,2.17)))
add(mt*.4,15.5,g=.35)
pad(15.5,19.6,[45,57,61,64,69],g=.065,a=.4,rel=.4)
for j in range(10): blip(15.88+j*.045,1700+600*rng.random())
for j in range(12): blip(16.25+j*.04,1900+600*rng.random(),.035)
glitch(17.04,.07,.16); glitch(18.59,.07,.16)
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
EDL=[(0.0,'cs2_p1',1.0,3.6,.8),(3.6,'cs2_p2',.3,3.6,1.4),(7.2,'cs2_p3',.5,3.8,.8)]
for t0,c,a,d,gn in EDL:
    s=load(f'{MOT}/clips_cs/{c}.mp4',a,d); k=int(.05*SR); s[:k]*=np.linspace(0,1,k); s[-k:]*=np.linspace(1,0,k)
    i=int(t0*SR); AMB[i:i+len(s)]+=s*gn
AMB/=max(1e-6,np.abs(AMB).max())
# ---------- voice: Isac, phrases placed on the picture ----------
v=load(sys.argv[2])
PH=[(0.02,0.95,1.00),(1.12,2.05,4.40),(2.28,3.55,7.90),(3.92,5.25,11.50),(5.25,6.70,13.75),(6.92,8.20,16.30)]
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
L=(L*.6*duck+AMB*.22*(.6+.4*duck)+VO*.85)*fade; R=(R*.6*duck+AMB*.22*(.6+.4*duck)+VO*.85)*fade
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk/.95; R/=pk/.95
st=(np.stack([L,R],1)*32767).astype(np.int16)
with wave.open(sys.argv[1],'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
