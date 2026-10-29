# Coming soon trailer (concept 1): score + sound design + Isac voice, 21 s
import numpy as np, wave, sys, subprocess
SR=44100; DUR=21.0; N=int(SR*DUR)
L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(1414)
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
def thump(t0,g=.3):
    n=int(.35*SR); tt=np.arange(n)/SR; fr=42+30*np.exp(-tt*25)
    add(np.sin(2*np.pi*np.cumsum(fr)/SR)*env(n,.004,.09),t0,g=g)
def whoosh(t0,d=.6,g=.4,rev=False,pan=0):
    n=int(d*SR); x=rng.standard_normal(n); c=np.linspace(.02,.4,n) if not rev else np.linspace(.02,.35,n)
    y=np.zeros(n); acc=0
    for i in range(n): acc+=c[i]*(x[i]-acc); y[i]=acc
    e=np.linspace(0,1,n)**3 if rev else np.sin(np.linspace(0,np.pi,n))**2
    add(y*e*2,t0,g=g,pan=pan)
def glitch(t0,d=.16,g=.3):
    n=int(d*SR); x=rng.standard_normal(n); hold=rng.integers(8,60); x=np.repeat(x[::hold],hold)[:n]
    gate=np.repeat(rng.random(n//400+1)>.35,400)[:n]; tone=np.sign(np.sin(2*np.pi*rng.uniform(300,1400)*np.arange(n)/SR))*.4
    s=np.round((x*.6+tone)*gate*np.linspace(1,.3,n)*6)/6
    add(s,t0,pan=rng.uniform(-.5,.5),g=g)
def blip(t0,f,g=.05):
    n=int(.07*SR); tt=np.arange(n)/SR; add(np.sin(2*np.pi*f*tt)*env(n,.002,.025),t0,pan=rng.uniform(-.4,.4),g=g)
def piano(t0,ms,g=.16,d=2.6,pan=0):
    n=int(d*SR); tt=np.arange(n)/SR; s=np.zeros(n)
    for m in ms:
        f=mf(m)
        for h,a in ((1,1),(2,.45),(3,.22),(4,.12),(5,.06)):
            s+=a*np.sin(2*np.pi*f*h*(1+.0004*h*h)*tt)*np.exp(-tt*(1.1+.9*h))
    s*=np.minimum(1,tt/.004)
    add(s/len(ms)**.5,t0,g=g,pan=pan)
def pad(t0,t1,notes,g=.06,a=.8,rel=.8):
    n=int((t1-t0+rel)*SR); tt=np.arange(n)/SR; s=np.zeros(n)
    for m in notes:
        for det in (-.08,.08):
            f=mf(m+det*.1); s+=np.sin(2*np.pi*f*tt)+.22*np.sin(2*np.pi*2*f*tt)+.08*np.sin(2*np.pi*3*f*tt)
    e=np.minimum(1,tt/a)*np.clip((t1-t0+rel-tt)/rel,0,1)
    add(lp(s,.07)*e/len(notes)**.5,t0,g=g)
def moto(t0,d=1.6,f=88,g=.22,p0=-.8,p1=.8):
    n=int(d*SR); tt=np.arange(n)/SR; u=tt/d
    fr=f*(1+.12*np.cos(np.pi*u))*(1+.02*np.sin(2*np.pi*9*tt))          # doppler + wobble
    ph=np.cumsum(fr)/SR; saw=2*(ph%1)-1
    s=lp(saw+.3*rng.standard_normal(n),.12)*np.sin(np.pi*u)**1.5
    for k in range(6):
        a,b=int(k*n/6),int((k+1)*n/6); pk=p0+(p1-p0)*(k+.5)/6; add(s[a:b],t0+a/SR,pan=pk,g=g)

# ---------- drone 0 -> 16.95 ----------
n=int(16.95*SR); tt=np.arange(n)/SR
dr=np.sin(2*np.pi*49*tt)+.55*np.sin(2*np.pi*49.3*tt)+.4*np.sin(2*np.pi*73.4*tt)+.2*np.sin(2*np.pi*98*tt)+lp(rng.standard_normal(n),.008)*3
amp=np.interp(tt,[0,1.5,10.8,14,16.85,16.95],[0,.25,.3,.36,.5,0])
add(dr*amp,0,g=.5)
# ---------- heartbeat pulse ----------
t=.6
while t<16.85:
    thump(t,.22 if t<10.8 else .28); t+= .75 if t<10.8 else (.5 if t<14 else max(.12,.5-(t-14)*.14))
# ---------- piano: minor, then a lift on the phone ----------
for t0,ms in [(.6,[55]),(2.1,[62]),(3.2,[58]),(4.6,[57]),(6.6,[55,62]),(8.0,[58]),(9.4,[60]),
              (10.8,[51,55,58]),(12.4,[53,57,60]),(14.0,[55,58,62,67])]:
    piano(t0,ms,g=.17,pan=rng.uniform(-.2,.2))
pad(10.8,16.9,[51,58,63],g=.035,a=1.5,rel=.05)
# ---------- cuts ----------
boom(.55,.55,f0=80,d=1.8)
for c,gb in [(6.6,.7),(10.8,.8),(14.0,.7)]:
    whoosh(c-.5,.5,.22,rev=True); boom(c,gb)
glitch(6.58,.12,.2); glitch(10.78,.14,.25); glitch(3.18,.06,.12)
# ---------- street 3.2 -> 5.0 ----------
n=int(1.9*SR); amb=lp(rng.standard_normal(n),.05)*np.minimum(1,np.minimum(np.arange(n),n-np.arange(n))/(.15*SR))
add(amb,3.15,g=.18); moto(3.15,1.5,92,.2,-.9,.6); moto(3.9,1.3,104,.16,.8,-.5)
# ---------- phone vibration ----------
for v0 in (11.2,11.75):
    n=int(.38*SR); tt=np.arange(n)/SR
    bz=np.sign(np.sin(2*np.pi*157*tt))*(.6+.4*np.sin(2*np.pi*31*tt)); bz=lp(bz,.18)*np.minimum(1,np.minimum(tt,.38-tt)/.02)
    add(bz,v0,g=.16)
# ---------- trails + riser into the end card ----------
for k in range(7):
    whoosh(14.3+k*.33,.7,.1,pan=rng.uniform(-.8,.8))
n=int(2.9*SR); tt=np.arange(n)/SR; u=tt/2.9
add(hp(rng.standard_normal(n),.15)*u**2.4*.5,14.0,g=.45)
add(sweep(180,1500,2.9,2.2)*u**2*.3,14.0,g=.35)
for f,dl in ((1760,0),(2637,.06),(3520,.12)):
    n=int(1.2*SR); tt=np.arange(n)/SR; add(np.sin(2*np.pi*f*tt)*np.exp(-tt*3.5)*.2,16.15+dl,pan=.2-dl*3,g=.5)
# ---------- impact + end card ----------
glitch(16.97,.25,.4); boom(17.0,1.2,90,30,2.4)
n=int(2.0*SR); add(lp(rng.standard_normal(n),.12)*env(n,.003,.5)*1.2,17.0,g=.45)
n=int(.6*SR); tt=np.arange(n)/SR; mt=sum(np.sin(2*np.pi*1760*r*tt+k)*np.exp(-tt*(12+5*k)) for k,r in enumerate((1,1.53,2.17)))
add(mt*.4,17.0,g=.4)
pad(17.0,20.6,[43,55,59,62,67],g=.07,a=.4,rel=.4)
for j in range(10): blip(17.38+j*.045,1700+600*rng.random())
for j in range(12): blip(17.78+j*.04,1900+600*rng.random(),.035)
glitch(18.61,.07,.18); glitch(19.69,.07,.2)
for k in range(5): thump(17.6+k*.6,.14)
# ---------- reverb ----------
irn=int(1.8*SR); ir=rng.standard_normal(irn)*np.exp(-np.arange(irn)/SR/0.5); ir=lp(ir,.25); ir/=np.abs(ir).sum()**.5*12
def conv(x,irx=ir):
    m=len(x)+len(irx); F=1<<(m-1).bit_length()
    return np.fft.irfft(np.fft.rfft(x,F)*np.fft.rfft(irx,F),F)[:len(x)]
L=L+conv(L)*.35; R=R+conv(R)*.35
# ---------- voice: Isac, phrases placed on the picture ----------
vf=sys.argv[2]
raw=subprocess.run([sys.argv[3],'-v','error','-i',vf,'-ac','1','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout
v=np.frombuffer(raw,np.float32).astype(float)
# (file in, file out, timeline start)
PH=[(0.05,1.50,1.00),(1.78,3.28,6.85),(3.66,4.56,11.10),(4.70,6.88,12.35),(7.12,8.38,17.55)]
VO=np.zeros(N)
for a,b,t0 in PH:
    seg=v[int(a*SR):int(b*SR)].copy(); k=int(.02*SR); seg[:k]*=np.linspace(0,1,k); seg[-k:]*=np.linspace(1,0,k)
    i=int(t0*SR); VO[i:i+len(seg)]+=seg
VO=VO/np.abs(VO).max()*.9
VO=VO+conv(VO,ir[:int(.9*SR)])*.12
# duck the score under the voice
e=np.abs(VO); k=int(.03*SR); e=np.convolve(e,np.ones(k)/k,'same'); e=lp(e,.0015)
duck=1-.55*np.clip(e/ .08,0,1)
L*=duck; R*=duck
fade=np.ones(N); k=int(.5*SR); fade[-k:]=np.linspace(1,0,k)**1.5
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk; R/=pk
L=(L*.62+VO*.85)*fade; R=(R*.62+VO*.85)*fade
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk/.95; R/=pk/.95
st=(np.stack([L,R],1)*32767).astype(np.int16)
with wave.open(sys.argv[1],'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
