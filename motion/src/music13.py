# Sound design: OJA coming soon, countdown (10 s)
import numpy as np, wave, sys
SR=44100; DUR=10.0; N=int(SR*DUR)
L=np.zeros(N); R=np.zeros(N)
rng=np.random.default_rng(1310)
def add(sig,t,pan=0.0,g=1.0):
    i=int(t*SR)
    if i>=N: return
    if i<0: sig=sig[-i:]; i=0
    j=min(N,i+len(sig)); s=sig[:j-i]*g
    L[i:j]+=s*(1-max(0,pan)); R[i:j]+=s*(1+min(0,pan))
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
def boom(t0,g=1.0,f0=110,f1=36,d=1.1):
    n=int(d*SR); tt=np.arange(n)/SR; fr=f1+(f0-f1)*np.exp(-tt*10)
    s=np.tanh(1.6*np.sin(2*np.pi*np.cumsum(fr)/SR))*env(n,.002,d*.35)
    add(s,t0,g=g)
def click(t0,g=.5):
    n=int(.012*SR); add(hp(rng.standard_normal(n),.5)*env(n,0,.002),t0,g=g)
def metal(t0,g=.25,base=2400):
    n=int(.5*SR); tt=np.arange(n)/SR; s=np.zeros(n)
    for k,r in enumerate((1,1.53,2.17,2.89)): s+=np.sin(2*np.pi*base*r*tt+k)*np.exp(-tt*(14+6*k))
    add(s*.5,t0,pan=.15,g=g); add(s*.5,t0+.011,pan=-.15,g=g*.7)
def glitch(t0,d=.16,g=.35):
    n=int(d*SR); x=rng.standard_normal(n)
    hold=rng.integers(8,60); x=np.repeat(x[::hold],hold)[:n]           # sample-and-hold
    gate=np.repeat(rng.random(n//400+1)>.35,400)[:n]
    tone=np.sign(np.sin(2*np.pi*rng.uniform(300,1400)*np.arange(n)/SR))*.4
    s=(x*.6+tone)*gate*np.linspace(1,.3,n)
    s=np.round(s*6)/6                                                     # bitcrush
    add(s,t0,pan=rng.uniform(-.5,.5),g=g)
def tick(t0,g=.18):
    n=int(.05*SR); tt=np.arange(n)/SR
    add((np.sin(2*np.pi*3200*tt)+.5*hp(rng.standard_normal(n),.6))*np.exp(-tt*120),t0,g=g)
def blip(t0,f,g=.12):
    n=int(.07*SR); tt=np.arange(n)/SR; add(np.sin(2*np.pi*f*tt)*env(n,.002,.025),t0,pan=rng.uniform(-.4,.4),g=g)
def whoosh(t0,d=.6,g=.4,rev=False):
    n=int(d*SR); x=rng.standard_normal(n); c=np.linspace(.02,.4,n)
    y=np.zeros(n); acc=0
    for i in range(n): acc+=c[i]*(x[i]-acc); y[i]=acc
    e=np.linspace(0,1,n)**3 if rev else np.sin(np.linspace(0,np.pi,n))**2
    add(y*e*2,t0,g=g)
def pad(t0,t1,notes,g=.08,a=.6,rel=.6):
    n=int((t1-t0+rel)*SR); tt=np.arange(n)/SR; s=np.zeros(n)
    for m in notes:
        for det in (-.07,.07):
            f=mf(m+det*.1); s+=np.sin(2*np.pi*f*tt)+.25*np.sin(2*np.pi*2*f*tt)
    e=np.minimum(1,tt/a); e*=np.clip((t1-t0+rel-tt)/rel,0,1)
    add(lp(s,.08)*e,t0,g=g)

# --- drone 0.15 -> 8.0 ---
n=int(7.85*SR); tt=np.arange(n)/SR
dr=np.sin(2*np.pi*55*tt)+.6*np.sin(2*np.pi*55.4*tt)+.35*np.sin(2*np.pi*82.6*tt)+.15*np.sin(2*np.pi*110*tt)
dr+=lp(rng.standard_normal(n),.01)*3
amp=np.interp(tt,[0,1,6,7.75,7.85],[0,.22,.3,.42,0])
add(dr*amp,.15,g=.55)
# --- CRT power-on ---
add(sweep(180,2600,.3,2)*env(int(.3*SR),.01,.25)*.5,.17,g=.25)
n=int(.32*SR); tt=np.arange(n)/SR
add(np.sign(np.sin(2*np.pi*50*tt))*.3*np.linspace(1,0,n)*lp(np.ones(n),.5),.18,g=.12)
# --- numbers ---
HITS=[.5,1.7,2.9,4.1,5.3]
for k,h in enumerate(HITS):
    glitch(h-.05,.15,.32)
    boom(h,g=.95,f0=100+8*k)
    click(h,.45); metal(h,g=.22,base=2200+180*k)
    whoosh(h-.35,.38,.18,rev=True)
    if k<4: tick(h+.6,.2)
    for j in range(5): blip(h+.07+j*.055,1400+300*rng.random(),.04)   # city decode chatter
# --- map ---
glitch(6.05,.22,.4); boom(6.1,g=.8,f0=80,f1=40,d=1.3); whoosh(6.1,.7,.3)
add(sweep(300,900,.5,1.5)*env(int(.5*SR),.05,.3)*.4,6.1,g=.25)
for i in range(5): blip(6.35+i*.09,[1318,1568,1760,1976,2349][i],.16)
pad(6.15,8.0,[45,52,57,60],g=.05,a=.8,rel=.15)
# --- tagline ---
glitch(6.93,.14,.3); boom(6.95,g=.45,f0=70,f1=40,d=.9)
for j in range(14): blip(6.97+j*.03,1600+800*rng.random(),.035)
glitch(7.42,.07,.18)
# riser into the logo
n=int(1.0*SR); tt=np.arange(n)/SR; u=tt/1.0
add(hp(rng.standard_normal(n),.15)*u**2.5*.5,7.0,g=.5)
add(sweep(180,1400,1.0,2.2)*u**2*.35,7.0,g=.4)
whoosh(7.45,.5,.35,rev=True)
# --- impact + end card ---
glitch(7.97,.25,.45)
boom(8.0,g=1.2,f0=90,f1=30,d=2.2)
n=int(1.8*SR); add(lp(rng.standard_normal(n),.12)*env(n,.003,.45)*1.2,8.0,g=.5)
metal(8.0,g=.3,base=1760)
pad(8.0,9.95,[45,57,61,64,69],g=.07,a=.35,rel=.05)
for j in range(10): blip(8.36+j*.045,1700+600*rng.random(),.04)
for j in range(14): blip(8.72+j*.035,1900+600*rng.random(),.03)
glitch(9.17,.08,.22); glitch(9.65,.06,.18)
# light pulse on the end card
for k in range(4): boom(8.4+k*.4,g=.18,f0=60,f1=45,d=.4)

# --- reverb ---
irn=int(1.6*SR); ir=rng.standard_normal(irn)*np.exp(-np.arange(irn)/SR/0.45); ir=lp(ir,.25); ir/=np.abs(ir).sum()**.5*12
def conv(x):
    m=len(x)+irn; F=1<<(m-1).bit_length()
    return np.fft.irfft(np.fft.rfft(x,F)*np.fft.rfft(ir,F),F)[:len(x)]
L=L+conv(L)*.35; R=R+conv(R)*.35
fade=np.ones(N); k=int(.45*SR); fade[-k:]=np.linspace(1,0,k)**1.5
L*=fade; R*=fade
pk=max(np.abs(L).max(),np.abs(R).max()); L/=pk/.9; R/=pk/.9
st=(np.stack([L,R],1)*32767).astype(np.int16)
with wave.open(sys.argv[1],'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')
