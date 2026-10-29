# Coming soon concept 5 « Le téléphone qui change tout »: sound design + Isac voice, 15 s
import numpy as np, wave, sys, subprocess
SR=44100; DUR=15.0; N=int(SR*DUR); FF=sys.argv[3]; MOT=sys.argv[4]
L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(1818)
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

# ---------- intro: hum, the phone buzzes and lights up ----------
n=int(10.0*SR); tt=np.arange(n)/SR
add((np.sin(2*np.pi*55*tt)+.5*np.sin(2*np.pi*82.4*tt)+lp(rng.standard_normal(n),.006)*2)*np.interp(tt,[0,.8,8.4,9.9,10],[0,.18,.24,.4,0]),0,g=.5)
whoosh(.1,.8,.18)
for v0,d in ((0.85,.38),(1.33,.3)):
    m=int(d*SR); t2=np.arange(m)/SR
    bz=lp(np.sign(np.sin(2*np.pi*157*t2))*(.6+.4*np.sin(2*np.pi*31*t2)),.18)*np.minimum(1,np.minimum(t2,d-t2)/.02)
    add(bz,v0,g=.2)
add(sweep(200,1600,.5,1.6)*env(int(.5*SR),.02,.35)*.4,0.9,g=.3); boom(0.88,.45,f0=70,d=1.2); chime(1.0,(1318,1976,2637),.08)
# ---------- tech arpeggio, A minor -> C, building ----------
BPM=120; st=60/BPM/4
kn=int(.3*SR); tt=np.arange(kn)/SR; KICK=np.sin(2*np.pi*np.cumsum(45+75*np.exp(-tt*28))/SR)*env(kn,.002,.11)
def arp(m,d=.16,g=.1):
    n=int(d*SR); t=np.arange(n)/SR; f=mf(m)
    return (np.sin(2*np.pi*f*t)+.35*np.sin(2*np.pi*2*f*t))*env(n,.003,.06)*g
seq=[[57,60,64,69],[57,60,64,69],[53,57,60,65],[55,59,62,67]]
step=0; t=1.3
while t<9.9:
    b=step%16; bar=(step//16)%4
    sp=1 if t<8.4 else 1+((t-8.4)/1.5)*1.0          # speeds up in the spiral
    if t>=3.0 and b in (0,4,8,12): add(KICK,t,g=.45 if t<8.4 else .55)
    up=12 if t>8.4 and step%2 else 0
    add(arp(seq[bar][b%4]+12+up,g=.09 if t<3 else .11),t,pan=(-.3 if step%2 else .3))
    step+=1; t+=st/sp
# each service pops out of the screen; each new word ticks
for ti in (3.0,3.35,3.7,4.4,5.2,6.0,6.8,7.6):
    whoosh(ti-.15,.35,.14,pan=rng.uniform(-.6,.6))
    m=int(.12*SR); t2=np.arange(m)/SR; add(np.sin(2*np.pi*np.cumsum(500+900*np.exp(-t2*40))/SR)*env(m,.002,.04),ti+.05,g=.18,pan=rng.uniform(-.4,.4))
for tw in (3.0,4.4,5.2,6.0,6.8,7.6): glitch(tw-.02,.05,.08); [blip(tw+.03+j*.035,1800+500*rng.random(),.03) for j in range(6)]
# ---------- spiral + flash ----------
n=int(1.55*SR); tt=np.arange(n)/SR; u=tt/1.55
add(hp(rng.standard_normal(n),.15)*u**2.3*.55,8.4,g=.45); add(sweep(220,1500,1.55,2)*u**2*.3,8.4,g=.35)
for k in range(5): whoosh(8.45+k*.28,.5,.1,pan=(-.7 if k%2 else .7))
glitch(9.93,.22,.4); boom(9.95,1.15,90,30,2.3)
n=int(1.6*SR); add(lp(rng.standard_normal(n),.12)*env(n,.003,.42),9.95,g=.42)
n=int(.6*SR); tt=np.arange(n)/SR; mt=sum(np.sin(2*np.pi*1760*r*tt+k)*np.exp(-tt*(12+5*k)) for k,r in enumerate((1,1.53,2.17)))
add(mt*.4,9.95,g=.35); chime(10.0,g=.12)
pad(9.95,14.7,[45,57,61,64,69],g=.07,a=.35,rel=.3)
for j in range(10): blip(10.62+j*.045,1700+600*rng.random())
for j in range(12): blip(10.97+j*.04,1900+600*rng.random(),.035)
glitch(12.04,.07,.16); glitch(14.19,.07,.16)
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
v=load(sys.argv[2]); VO=np.zeros(N)
for a,b,t0 in [(11.85,14.38,10.70),(14.55,15.88,13.35)]:
    seg=v[int(a*SR):int(b*SR)].copy(); k=int(.02*SR); seg[:k]*=np.linspace(0,1,k); seg[-k:]*=np.linspace(1,0,k)
    i=int(t0*SR); VO[i:i+len(seg)]+=seg
VO=VO/np.abs(VO).max()*.9; VO=VO+conv(VO,ir[:int(.8*SR)])*.1
e=np.abs(VO); k=int(.03*SR); e=np.convolve(e,np.ones(k)/k,'same'); e=lp(e,.0015)
duck=1-.55*np.clip(e/.08,0,1)
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk; R/=pk
fade=np.ones(N); k=int(.35*SR); fade[-k:]=np.linspace(1,0,k)**1.5
L=(L*.6*duck+VO*.85)*fade; R=(R*.6*duck+VO*.85)*fade
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk/.95; R/=pk/.95
st=(np.stack([L,R],1)*32767).astype(np.int16)
with wave.open(sys.argv[1],'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
