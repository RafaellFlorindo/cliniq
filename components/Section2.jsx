/* global React, Icon, Reveal */

/* ─── Grid forte visível no fundo branco ─────────────────────────────────── */
function S2GridPattern() {
  const id = React.useRef('s2gp-' + Math.random().toString(36).substr(2,9)).current;
  const W = 44, H = 44;
  return (
    <svg aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
      <defs>
        <pattern id={id} width={W} height={H} patternUnits="userSpaceOnUse">
          <path d={`M ${W} 0 L 0 0 0 ${H}`} fill="none" stroke="rgba(15,46,74,0.11)" strokeWidth="1"/>
          <circle cx="0" cy="0" r="1.8" fill="rgba(15,46,74,0.16)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ─── Infinite Slider ─────────────────────────────────────────────────────── */
function S2Slider({ children, gap=10, speed=44, speedOnHover=18 }) {
  const [dur, setDur] = React.useState(speed);
  const kids = React.Children.toArray(children);
  return (
    <div
      style={{
        overflow:'hidden',
        WebkitMaskImage:'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
        maskImage:'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
      }}
      onMouseEnter={() => setDur(speedOnHover)}
      onMouseLeave={() => setDur(speed)}
    >
      <div style={{
        display:'flex', alignItems:'center', gap: gap+'px',
        width:'max-content',
        animation:`s2slide ${dur}s linear infinite`,
        willChange:'transform',
      }}>
        {kids}{kids}
      </div>
    </div>
  );
}

const S2_INTEGRATIONS = [
  { name:'WhatsApp',   clr:'#25D366', icon:'whatsapp',  lbl:'WA' },
  { name:'Instagram',  clr:'#E1306C', icon:'instagram', lbl:'IG' },
  { name:'Google',     clr:'#4285F4', icon:'google',    lbl:'G'  },
  { name:'Meta',       clr:'#0866FF', icon:'meta',      lbl:'M'  },
  { name:'Asaas',      clr:'#00B0C5', icon:'asaas',     lbl:'As' },
  { name:'RD Station', clr:'#00BFB3', icon:'rdstation', lbl:'RD' },
  { name:'Google Ads', clr:'#EA4335', icon:'googleads', lbl:'GA' },
  { name:'Calendly',   clr:'#006BFF', icon:'calendly',  lbl:'Ca' },
  { name:'Pagar.me',   clr:'#4F46E5', icon:'pagarme',   lbl:'Pg' },
  { name:'Zapier',     clr:'#FF4A00', icon:'zapier',    lbl:'Z'  },
];

/* ─── Logo item grande, preto/branco com cor no hover ────────────────────── */
function S2Logo({ name, clr, icon, lbl }) {
  const [hov, setHov]   = React.useState(false);
  const [imgOk, setImgOk] = React.useState(true);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:'flex', flexDirection:'column', alignItems:'center', gap:10,
        padding:'0 6px',
        cursor:'default', userSelect:'none',
      }}
    >
      {icon && imgOk ? (
        <img
          src={`https://cdn.simpleicons.org/${icon}/${clr.replace('#','')}`}
          alt={name}
          onError={() => setImgOk(false)}
          style={{
            width:40, height:40, objectFit:'contain', display:'block',
            filter: hov ? 'none' : 'grayscale(1) brightness(0.25) opacity(0.55)',
            transition:'filter 320ms ease',
          }}
        />
      ) : (
        <div style={{
          width:40, height:40, borderRadius:10,
          background: hov ? clr : '#1a1a1a',
          color:'#fff', opacity: hov ? 1 : 0.5,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:10, fontWeight:800, letterSpacing:'-0.02em',
          transition:'background 320ms, opacity 320ms',
          fontFamily:'var(--font-sans)',
        }}>{lbl}</div>
      )}
      <span style={{
        fontSize:12, fontWeight:600, letterSpacing:'-0.01em',
        color: hov ? '#111' : 'rgba(0,0,0,0.38)',
        transition:'color 320ms ease',
        fontFamily:'var(--font-sans)',
      }}>{name}</span>
    </div>
  );
}

/* ─── Sparkles canvas ─────────────────────────────────────────────────────── */
function SparklesCanvas({ color='#4DB6AC', density=110, speed=0.28 }) {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, particles = [];

    function init() {
      canvas.width  = canvas.offsetWidth  || 800;
      canvas.height = canvas.offsetHeight || 200;
      particles = Array.from({ length: density }, () => ({
        x:   Math.random() * canvas.width,
        y:   Math.random() * canvas.height,
        r:   Math.random() * 1.4 + 0.2,
        op:  Math.random() * 0.75 + 0.05,
        dop: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        vx:  (Math.random() - 0.5) * speed,
        vy:  (Math.random() - 0.5) * speed,
      }));
    }

    init();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(init) : null;
    if (ro) ro.observe(canvas);
    else window.addEventListener('resize', init);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.op += p.dop;
        if (p.op > 0.82 || p.op < 0.02) p.dop *= -1;
        p.x = (p.x + p.vx + canvas.width)  % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.globalAlpha = p.op;
        ctx.fillStyle   = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO CLOUD — fundo branco, logos reais, arco teal entrando na Section 2
══════════════════════════════════════════════════════════════════════════════ */
function LogoCloud() {
  return (
    <div style={{ background:'#fff', position:'relative', overflow:'hidden' }}>

      {/* Label topo */}
      <div style={{ paddingTop:52, paddingBottom:0 }}>
        <p style={{
          textAlign:'center',
          fontSize:11, fontWeight:700,
          letterSpacing:'0.12em', textTransform:'uppercase',
          color:'rgba(77,182,172,0.65)',
          margin:'0 0 28px',
        }}>
          Integra com o que você já usa
        </p>

        {/* Logos marquee */}
        <S2Slider gap={44} speed={38} speedOnHover={14}>
          {S2_INTEGRATIONS.map(p => <S2Logo key={p.name} {...p} />)}
        </S2Slider>
      </div>

      {/* Zona do arco: sparkles + SVG dome */}
      <div style={{ position:'relative', height:220, marginTop:28 }}>
        <SparklesCanvas color="#4DB6AC" density={55} speed={0.16} />

        {/* SVG arco — curva de cima pra baixo nas bordas, alto no centro */}
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            position:'absolute', bottom:0, left:0,
            width:'100%', height:'100%', pointerEvents:'none',
          }}
        >
          <defs>
            <radialGradient id="lc-arc-fill" gradientUnits="userSpaceOnUse" cx="720" cy="220" r="860">
              <stop offset="0%"   stopColor="rgba(77,182,172,0.18)" />
              <stop offset="45%"  stopColor="rgba(77,182,172,0.07)" />
              <stop offset="100%" stopColor="rgba(77,182,172,0.00)" />
            </radialGradient>
          </defs>
          {/* Fill area */}
          <path d="M -20 220 Q 720 18 1460 220 Z" fill="url(#lc-arc-fill)" />
          {/* Arc border line */}
          <path
            d="M -20 220 Q 720 18 1460 220"
            fill="none"
            stroke="rgba(77,182,172,0.28)"
            strokeWidth="1.2"
          />
        </svg>

        {/* Bottom fade → white, blends with Section 2 */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:36,
          background:'linear-gradient(to bottom, transparent, #ffffff)',
          zIndex:2, pointerEvents:'none',
        }} />
      </div>

      <style>{`
        @keyframes s2slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ─── Scroll reveal hook ──────────────────────────────────────────────────── */
function useScrollReveal(ref) {
  const [prog, setProg] = React.useState(0);
  React.useEffect(() => {
    function tick() {
      if (!ref.current) return;
      const r  = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      setProg(Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.62))));
    }
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);
  return prog;
}

/* ─── CRM Window com scroll reveal 3D + hover tilt ───────────────────────── */
function S2CRMWindow() {
  const [hov, setHov]       = React.useState(false);
  const [tilt, setTilt]     = React.useState({ x:0, y:0 });
  const [loaded, setLoaded] = React.useState(false);
  const [err, setErr]       = React.useState(false);
  const outerRef             = React.useRef(null);
  const innerRef             = React.useRef(null);
  const prog                 = useScrollReveal(outerRef);

  function lerp(a, b, t) { return a + (b - a) * t; }
  const ep    = 1 - Math.pow(1 - Math.min(prog, 1), 3);
  const ready = prog >= 0.97;

  function onMove(e) {
    if (!innerRef.current || !ready) return;
    const r = innerRef.current.getBoundingClientRect();
    setTilt({
      x:  ((e.clientY - r.top)  / r.height - 0.5) * 3.5,
      y: -((e.clientX - r.left) / r.width  - 0.5) * 5.5,
    });
  }

  const transform = ready
    ? (hov
        ? `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.009)`
        : 'perspective(1400px) rotateX(1.8deg) rotateY(-0.4deg)')
    : `perspective(2200px) rotateX(${lerp(58, 1.8, ep)}deg) translateY(${lerp(110, 0, ep)}px) scale(${lerp(0.70, 1, ep)})`;

  return (
    <div
      ref={outerRef}
      style={{ position:'relative', transformStyle:'preserve-3d', opacity: Math.min(ep * 2.2, 1) }}
      onMouseEnter={() => ready && setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x:0, y:0 }); }}
      onMouseMove={onMove}
    >
      {/* glow teal */}
      <div style={{
        position:'absolute', bottom:-56, left:'14%', right:'14%', height:90,
        background:'var(--teal-500,#4DB6AC)',
        borderRadius:'50%',
        filter:'blur(52px)',
        opacity: ready ? (hov ? 0.24 : 0.10) : lerp(0, 0.28, ep),
        transition: ready ? 'opacity 700ms' : 'none',
        pointerEvents:'none', zIndex:0,
      }} />

      <div
        ref={innerRef}
        style={{
          background:'#fff',
          borderRadius:18,
          overflow:'hidden',
          position:'relative', zIndex:1,
          boxShadow: ready && hov
            ? '0 60px 170px rgba(15,46,74,0.22), 0 0 0 1.5px rgba(0,0,0,0.06)'
            : '0 32px 100px rgba(15,46,74,0.14), 0 0 0 1px rgba(0,0,0,0.05)',
          transform,
          transition: ready
            ? (hov
                ? 'transform 90ms linear, box-shadow 400ms'
                : 'transform 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms')
            : 'none',
        }}
      >
        {/* macOS title bar */}
        <div style={{
          background:'linear-gradient(180deg,#f9f9f9 0%,#efefef 100%)',
          borderBottom:'1px solid rgba(0,0,0,0.10)',
          padding:'11px 16px',
          display:'flex', alignItems:'center', userSelect:'none',
        }}>
          <div style={{ display:'flex', gap:7 }}>
            {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
              <div key={i} style={{
                width:13, height:13, borderRadius:'50%', background:c,
                boxShadow:'inset 0 0 0 0.5px rgba(0,0,0,0.18)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:8.5, fontWeight:900, color:'rgba(0,0,0,0.38)',
                fontFamily:'system-ui', lineHeight:1, cursor:'default',
                transition:'filter 200ms',
                filter: hov ? 'brightness(0.88)' : 'brightness(1)',
              }}>{ready && hov ? ['×','–','+'][i] : ''}</div>
            ))}
          </div>
          <div style={{ flex:1, textAlign:'center', fontSize:12, fontWeight:600, color:'#888', letterSpacing:'-0.01em' }}>
            CLINIQ · Painel de Controle
          </div>
          <div style={{ width:53 }} />
        </div>

        {/* scan line durante o reveal */}
        {!ready && ep > 0.04 && (
          <div style={{
            position:'absolute',
            top:`${Math.min(ep * 108, 100)}%`,
            left:0, right:0, height:3,
            background:'linear-gradient(90deg,transparent,rgba(77,182,172,0.5) 20%,rgba(210,255,250,0.92) 50%,rgba(77,182,172,0.5) 80%,transparent)',
            boxShadow:'0 0 24px 8px rgba(77,182,172,0.42)',
            transform:'translateY(-50%)',
            zIndex:10, pointerEvents:'none',
          }} />
        )}

        {!err && (
          <img
            src="./images/crm-dashboard.png"
            alt="Painel CLINIQ"
            style={{ width:'100%', height:'auto', display:'block', opacity: loaded ? 1 : 0, transition:'opacity 500ms' }}
            onLoad={() => setLoaded(true)}
            onError={() => setErr(true)}
          />
        )}

        {!loaded && !err && (
          <div style={{
            aspectRatio:'16/9',
            background:'linear-gradient(90deg,#f0f4f8 25%,#e6ecf2 50%,#f0f4f8 75%)',
            backgroundSize:'200% 100%',
            animation:'s2shimmer 1.6s ease-in-out infinite',
          }} />
        )}

        {err && (
          <div style={{
            aspectRatio:'16/9', display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', background:'#f7fafc', gap:12,
          }}>
            <Icon name="monitor" size={40} style={{ opacity:0.15 }} />
            <code style={{ fontSize:12, color:'#94a3b8' }}>cliniq/images/crm-dashboard.png</code>
          </div>
        )}

        {loaded && (
          <div style={{
            position:'absolute', bottom:0, left:0, right:0, height:80,
            background:'linear-gradient(to bottom, transparent, rgba(255,255,255,0.55))',
            pointerEvents:'none',
          }} />
        )}
      </div>
    </div>
  );
}

/* ─── Floating chips (light mode) ───────────────────────────────────────── */
function S2Float({ icon, label, sub, iconBg, iconClr, posStyle, enterDelay=0, floatDur='4s', floatDelay='0s' }) {
  const [vis, setVis]     = React.useState(false);
  const [float, setFloat] = React.useState(false);

  React.useEffect(() => {
    const t1 = setTimeout(() => setVis(true),  enterDelay);
    const t2 = setTimeout(() => setFloat(true), enterDelay + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      position:'absolute', zIndex:10, ...posStyle,
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(16px)',
      transition:'opacity 580ms cubic-bezier(0.22,1,0.36,1), transform 580ms cubic-bezier(0.22,1,0.36,1)',
    }}>
      <div style={{
        animation: float ? `s2floatY ${floatDur} ease-in-out ${floatDelay} infinite` : 'none',
        background:'rgba(255,255,255,0.96)',
        backdropFilter:'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',
        border:'1px solid rgba(255,255,255,0.9)',
        borderRadius:14,
        padding:'10px 15px',
        boxShadow:'0 10px 36px rgba(15,46,74,0.13), 0 0 0 1px rgba(15,46,74,0.05)',
        display:'flex', alignItems:'center', gap:10,
      }}>
        <div style={{
          width:34, height:34, borderRadius:10,
          background: iconBg || 'var(--accent-soft)',
          color: iconClr || 'var(--accent-text)',
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
        }}>
          <Icon name={icon} size={16} />
        </div>
        <div>
          <div style={{ fontSize:12.5, fontWeight:700, color:'var(--ink-900)', lineHeight:1.25 }}>{label}</div>
          {sub && <div style={{ fontSize:11, color:'var(--ink-500)', marginTop:2 }}>{sub}</div>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — fundo branco, grid forte, janela CRM
══════════════════════════════════════════════════════════════════════════════ */
function Section2() {
  return (
    <section id="plataforma" style={{ background:'#fff', position:'relative', overflow:'hidden' }}>

      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0 }}>
        <S2GridPattern />
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(ellipse 60% 50% at 50% 38%, rgba(255,255,255,0.45) 0%, transparent 100%)',
        }} />
      </div>

      <div className="container-wide" style={{ position:'relative', zIndex:1 }}>

        <Reveal>
          <p style={{
            textAlign:'center',
            fontSize:48,
            fontWeight:500,
            color:'rgb(77, 182, 172)',
            letterSpacing:'-0.01em',
            margin:'0 0 20px',
          }}>
            O painel que sua clínica merece
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ position:'relative', maxWidth:980, margin:'0 auto' }}>
            <S2CRMWindow />

            <S2Float
              icon="user-plus"
              label="Novo lead captado"
              sub="Instagram · @clinicabeleza"
              iconBg="var(--accent-soft)"
              iconClr="var(--accent-text)"
              posStyle={{ left:'-5%', top:'10%' }}
              enterDelay={500}
              floatDur="4.2s"
              floatDelay="0s"
            />
            <S2Float
              icon="star"
              label="★★★★★  Júlia M."
              sub="Google · há 1min"
              iconBg="#FFF3D6"
              iconClr="#B17D0A"
              posStyle={{ right:'-5%', top:'36%' }}
              enterDelay={750}
              floatDur="5.2s"
              floatDelay="0.6s"
            />
            <S2Float
              icon="trending-down"
              label="No-show 28% → 4%"
              sub="Em 60 dias de uso"
              iconBg="var(--success-bg,#e6faf2)"
              iconClr="var(--success,#2fa37a)"
              posStyle={{ left:'3%', bottom:'-4%' }}
              enterDelay={1000}
              floatDur="6s"
              floatDelay="1.2s"
            />
          </div>
        </Reveal>

      </div>

      <style>{`
        @keyframes s2shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes s2floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @media (max-width: 640px) {
          #plataforma [style*="left:-5%"],
          #plataforma [style*="right:-5%"] { display: none !important; }
        }
      `}</style>
    </section>
  );
}

window.LogoCloud = LogoCloud;
window.Section2  = Section2;