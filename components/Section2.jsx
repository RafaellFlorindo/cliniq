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
        /* Fade zone largo: 18% em cada lado — sem corte abrupto */
        WebkitMaskImage:'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 8%, #000 18%, #000 82%, rgba(0,0,0,0.6) 92%, transparent 100%)',
        maskImage:'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 8%, #000 18%, #000 82%, rgba(0,0,0,0.6) 92%, transparent 100%)',
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
  { name:'WhatsApp',   clr:'#25D366', icon:'whatsapp'        },
  { name:'Instagram',  clr:'#E1306C', icon:'instagram'       },
  { name:'Facebook',   clr:'#1877F2', icon:'facebook'        },
  { name:'Google',     clr:'#4285F4', icon:'google'          },
  { name:'Meta',       clr:'#0866FF', icon:'meta'            },
  { name:'TikTok',     clr:'#FF0050', icon:'tiktok'          },
  { name:'LinkedIn',   clr:'#0A66C2', icon:'linkedin',   svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
  { name:'Slack',      clr:'#4A154B', icon:'slack',       svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>' },
  { name:'Google Ads', clr:'#4285F4', icon:'googleads'       },
  { name:'Calendly',   clr:'#006BFF', icon:'calendly'        },
  { name:'Zapier',     clr:'#FF4A00', icon:'zapier'          },
  { name:'HubSpot',    clr:'#FF7A59', icon:'hubspot'         },
  { name:'Notion',     clr:'#191919', icon:'notion'          },
  { name:'ClickUp',    clr:'#7B68EE', icon:'clickup'         },
  { name:'Shopify',    clr:'#96BF48', icon:'shopify'         },
  { name:'Canva',      clr:'#00C4CC', icon:'canva',       svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.885 15.42a4.998 4.998 0 0 1-3.891 1.902A5 5 0 0 1 7 12.327a5 5 0 0 1 8.885-3.127l-1.415 1.414a3 3 0 1 0 0 4.242l1.415 1.564z"/></svg>' },
  { name:'Claude',     clr:'#CC785C', icon:'anthropic'       },
  { name:'Airtable',   clr:'#18BFFF', icon:'airtable'        },
  { name:'Typeform',   clr:'#262627', icon:'typeform'        },
  { name:'Cal.com',    clr:'#292929', icon:'caldotcom'       },
];

/* ─── Logo item grande, escala de cinza → cor no hover ───────────────────── */
function S2Logo({ name, clr, icon, svg }) {
  const [hov, setHov]     = React.useState(false);
  const [imgOk, setImgOk] = React.useState(true);

  const iconFilter = hov ? 'none' : 'grayscale(1) brightness(0.28) opacity(0.55)';
  const iconTrans  = 'filter 380ms cubic-bezier(0.22,1,0.36,1)';

  function renderIcon() {
    /* 1) SVG inline (LinkedIn, Slack, Canva) */
    if (svg) {
      return (
        <div
          style={{
            width:38, height:38, flexShrink:0,
            color: clr,
            filter: iconFilter, transition: iconTrans,
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      );
    }
    /* 2) CDN img */
    if (icon && imgOk) {
      return (
        <img
          src={`https://cdn.simpleicons.org/${icon}`}
          alt={name}
          onError={() => setImgOk(false)}
          style={{
            width:38, height:38, objectFit:'contain', display:'block',
            filter: iconFilter, transition: iconTrans,
          }}
        />
      );
    }
    /* 3) Fallback: initials badge */
    return (
      <div style={{
        width:38, height:38, borderRadius:10,
        background: clr, color:'#fff',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:10, fontWeight:800, fontFamily:'var(--font-sans)',
        filter: hov ? 'none' : 'grayscale(1) opacity(0.45)',
        transition:'all 380ms cubic-bezier(0.22,1,0.36,1)',
      }}>{name.slice(0,2).toUpperCase()}</div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:'flex', flexDirection:'column', alignItems:'center', gap:9,
        padding:'0 4px', cursor:'default', userSelect:'none', minWidth:64,
      }}
    >
      {renderIcon()}
      <span style={{
        fontSize:11.5, fontWeight:600, letterSpacing:'-0.01em',
        color: hov ? '#111' : 'rgba(0,0,0,0.35)',
        transition:'color 380ms ease',
        fontFamily:'var(--font-sans)',
        whiteSpace:'nowrap',
      }}>{name}</span>
    </div>
  );
}

/* ─── Sparkles canvas ─────────────────────────────────────────────────────── */
function SparklesCanvas({ color='#4DB6AC', density=80, speed=0.22 }) {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, particles = [];

    function init() {
      canvas.width  = canvas.offsetWidth  || 900;
      canvas.height = canvas.offsetHeight || 280;
      particles = Array.from({ length: density }, () => ({
        x:   Math.random() * canvas.width,
        y:   Math.random() * canvas.height,
        r:   Math.random() * 1.5 + 0.3,
        op:  Math.random() * 0.7 + 0.05,
        dop: (Math.random() * 0.007 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
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
        if (p.op > 0.78 || p.op < 0.02) p.dop *= -1;
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
   LOGO CLOUD — fundo branco, logos reais, arco teal que mergulha na Section 2
══════════════════════════════════════════════════════════════════════════════ */
function LogoCloud() {
  return (
    <div style={{
      background:'#fff',
      position:'relative',
      overflow:'hidden',
      paddingTop:52,
      paddingBottom:64,
    }}>

      {/* Sparkles voando atrás de tudo */}
      <SparklesCanvas color="#4DB6AC" density={70} speed={0.20} />

      {/* Conteúdo acima das sparkles */}
      <div style={{ position:'relative', zIndex:1 }}>
        <p style={{
          textAlign:'center',
          fontSize:11, fontWeight:700,
          letterSpacing:'0.12em', textTransform:'uppercase',
          color:'rgba(77,182,172,0.6)',
          margin:'0 0 30px',
          fontFamily:'var(--font-sans)',
        }}>
          Integra com o que você já usa
        </p>

        <S2Slider gap={40} speed={42} speedOnHover={16}>
          {S2_INTEGRATIONS.map(p => <S2Logo key={p.name} {...p} />)}
        </S2Slider>
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
      /* Começa 80px ANTES de entrar no viewport; termina quando top = 22% do vh
         → range total ≈ vh*0.78 + 80px = bastante tempo de scroll              */
      const start = vh + 80;
      const end   = vh * 0.22;
      setProg(Math.max(0, Math.min(1, (start - r.top) / (start - end))));
    }
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);
  return prog;
}

/* ─── CRM Window: reveal 3D épico no scroll + hover tilt ─────────────────── */
function S2CRMWindow() {
  const [hov, setHov]       = React.useState(false);
  const [tilt, setTilt]     = React.useState({ x:0, y:0 });
  const [loaded, setLoaded] = React.useState(false);
  const [err, setErr]       = React.useState(false);
  const outerRef             = React.useRef(null);
  const innerRef             = React.useRef(null);
  const prog                 = useScrollReveal(outerRef);

  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ease-out-quart: movimento rápido no início, suave no fim */
  const ep    = 1 - Math.pow(1 - Math.min(prog, 1), 4);
  const ready = prog >= 0.96;

  function onMove(e) {
    if (!innerRef.current || !ready) return;
    const r = innerRef.current.getBoundingClientRect();
    setTilt({
      x:  ((e.clientY - r.top)  / r.height - 0.5) * 4,
      y: -((e.clientX - r.left) / r.width  - 0.5) * 6,
    });
  }

  /* Estado inicial bem dramático: janela quase deitada no chão, pequena, longe */
  const transform = ready
    ? (hov
        ? `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-10px) scale(1.012)`
        : 'perspective(1400px) rotateX(1.8deg) rotateY(-0.4deg)')
    : `perspective(2400px) rotateX(${lerp(74, 1.8, ep)}deg) translateY(${lerp(180, 0, ep)}px) scale(${lerp(0.60, 1, ep)})`;

  /* Opacidade: aparece rápido (pow 0.35 = curva muito suave no início) */
  const opacity = ready ? 1 : Math.pow(ep, 0.35);

  return (
    <div
      ref={outerRef}
      style={{ position:'relative', transformStyle:'preserve-3d', opacity }}
      onMouseEnter={() => ready && setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x:0, y:0 }); }}
      onMouseMove={onMove}
    >
      {/* Glow teal — pulsa durante o reveal */}
      <div style={{
        position:'absolute',
        bottom: lerp(-10, -56, ep),
        left:'10%', right:'10%',
        height: lerp(50, 90, ep),
        background:'var(--teal-500,#4DB6AC)',
        borderRadius:'50%',
        filter:`blur(${lerp(30, 52, ep)}px)`,
        opacity: ready ? (hov ? 0.28 : 0.12) : lerp(0, 0.36, ep),
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
            ? '0 60px 180px rgba(15,46,74,0.24), 0 0 0 1.5px rgba(0,0,0,0.06)'
            : `0 ${lerp(12, 32, ep)}px ${lerp(40, 100, ep)}px rgba(15,46,74,${lerp(0.06, 0.15, ep).toFixed(2)}), 0 0 0 1px rgba(0,0,0,0.05)`,
          transform,
          transition: ready
            ? (hov
                ? 'transform 80ms linear, box-shadow 350ms'
                : 'transform 600ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms')
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
                filter: ready && hov ? 'brightness(0.88)' : 'brightness(1)',
              }}>{ready && hov ? ['×','–','+'][i] : ''}</div>
            ))}
          </div>
          <div style={{ flex:1, textAlign:'center', fontSize:12, fontWeight:600, color:'#888', letterSpacing:'-0.01em' }}>
            CLINIQ · Painel de Controle
          </div>
          <div style={{ width:53 }} />
        </div>

        {/* Scan line holograma durante o reveal */}
        {!ready && ep > 0.05 && (
          <div style={{
            position:'absolute',
            top: `${Math.min(ep * 112, 100)}%`,
            left:0, right:0, height:4,
            background:'linear-gradient(90deg, transparent 0%, rgba(77,182,172,0.45) 15%, rgba(180,255,245,1.0) 50%, rgba(77,182,172,0.45) 85%, transparent 100%)',
            boxShadow:'0 0 28px 10px rgba(77,182,172,0.50), 0 0 60px 20px rgba(77,182,172,0.20)',
            transform:'translateY(-50%)',
            zIndex:10, pointerEvents:'none',
          }} />
        )}

        {!err && (
          <img
            src="./images/crm-dashboard.png"
            alt="Painel CLINIQ"
            style={{ width:'100%', height:'auto', display:'block', opacity: loaded ? 1 : 0, transition:'opacity 600ms' }}
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

/* ─── Floating chips ─────────────────────────────────────────────────────── */
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

        {/* CRM Window + chips — sem Reveal wrapper; S2CRMWindow controla a própria visibilidade */}
        <div style={{ position:'relative', maxWidth:980, margin:'0 auto' }}>
          <S2CRMWindow />

          <S2Float
            icon="user-plus"
            label="Novo lead captado"
            sub="Instagram · @clinicabeleza"
            iconBg="var(--accent-soft)"
            iconClr="var(--accent-text)"
            posStyle={{ left:'-5%', top:'10%' }}
            enterDelay={1200}
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
            enterDelay={1600}
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
            enterDelay={2000}
            floatDur="6s"
            floatDelay="1.2s"
          />
        </div>

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
