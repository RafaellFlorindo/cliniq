/* global React, Icon, Reveal, GlowCard */

/* ─── Three.js animated dot-wave background ──────────────────────────────── */
function DottedSurface() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const container = ref.current;
    if (!container || !window.THREE) return;
    const THREE = window.THREE;

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 0);
    container.appendChild(renderer.domElement);

    const positions = [];
    const colors = [];
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        positions.push(x, 0, z);
        // Navy-800 normalizado (#0F2E4A → 0.059, 0.180, 0.290)
        colors.push(0.059, 0.180, 0.290);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);
      const posAttr = geometry.attributes.position;
      const arr = posAttr.array;
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          arr[index + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.1;
    }

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onResize);
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} className="dotted-hero-canvas" />;
}

/* ─── Fake macOS window wrapper ──────────────────────────────────────────── */
function MacWindow({ title, children }) {
  const [hovered, setHovered] = React.useState(false);

  const dots = [
    { color: '#FF5F57', hoverColor: '#e0443e', symbol: '×' },
    { color: '#FFBD2E', hoverColor: '#dea123', symbol: '–' },
    { color: '#28C840', hoverColor: '#1faa34', symbol: '+' },
  ];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderRadius: 14,
      boxShadow:
        '0 2px 0 rgba(255,255,255,0.8) inset,' +
        '0 50px 130px rgba(15,46,74,0.20),' +
        '0 0 0 1px rgba(0,0,0,0.07)',
      overflow: 'hidden',
      width: '100%',
      maxWidth: 920,
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
      transform: 'perspective(1200px) rotateX(1deg)',
      transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Title bar ── */}
      <div style={{
        background: 'linear-gradient(180deg, #f5f5f5 0%, #ebebeb 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.12)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
        gap: 12,
      }}>
        {/* Traffic lights */}
        <div
          style={{ display: 'flex', gap: 7 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {dots.map((d, i) => (
            <div
              key={i}
              style={{
                width: 13, height: 13,
                borderRadius: '50%',
                background: d.color,
                boxShadow: `inset 0 0 0 0.5px rgba(0,0,0,0.18)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                fontWeight: 900,
                color: 'rgba(0,0,0,0.50)',
                transition: 'transform 150ms, filter 150ms',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                filter: hovered ? 'brightness(0.88)' : 'brightness(1)',
                cursor: 'default',
                lineHeight: 1,
                fontFamily: 'system-ui',
              }}
            >
              {hovered ? d.symbol : ''}
            </div>
          ))}
        </div>

        {/* Window title */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{
            fontSize: 11.5,
            fontWeight: 600,
            color: '#5a5a5a',
            letterSpacing: '-0.01em',
          }}>
            {title}
          </span>
        </div>

        {/* Spacer to balance title */}
        <div style={{ width: 47 }} />
      </div>

      {/* ── Content ── */}
      <div style={{ padding: 18 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Animated SVG Underline ──────────────────────────────────────────────── */
function AnimatedUnderlineText({ children }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', paddingBottom: '0.12em' }}>
      {children}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          bottom: '-0.04em',
          width: '100%',
          height: '0.14em',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
        viewBox="0 0 300 16"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
          stroke="var(--accent)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 350,
            strokeDashoffset: 350,
            animation: 'drawLine 1.8s cubic-bezier(0.22,1,0.36,1) 0.5s forwards',
          }}
        />
      </svg>
    </span>
  );
}

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const heroStyles = {
  section: {
    background: '#fafbfc',
    position: 'relative',
    paddingTop: 100,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  innerWrap: { position: 'relative', zIndex: 1 },
  textCol: { textAlign: 'center', maxWidth: 880, margin: '0 auto' },
  announce: {
    display: 'inline-flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.80)',
    border: '1px solid var(--line)',
    borderRadius: 999,
    padding: 4,
    fontSize: 12.5,
    boxShadow: '0 1px 2px rgba(15,46,74,0.04)',
    gap: 10, marginBottom: 28,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  announceTag: {
    background: 'var(--accent-soft)', color: 'var(--accent-text)',
    fontWeight: 700, padding: '5px 12px', borderRadius: 999,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    fontSize: 10.5, whiteSpace: 'nowrap',
    display: 'inline-flex', alignItems: 'center', gap: 5,
  },
  announceText: {
    color: 'var(--ink-700)', paddingRight: 12,
    letterSpacing: '-0.005em', fontWeight: 500, whiteSpace: 'nowrap',
  },
  lede: {
    fontSize: 'clamp(15px, 1.15vw, 17.5px)',
    lineHeight: 1.72,
    color: 'var(--ink-600)',
    maxWidth: 560,
    margin: '24px auto 0',
    textWrap: 'pretty',
    fontWeight: 400,
  },
  ctaRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 16, flexWrap: 'wrap', marginTop: 32,
  },
  microproof: {
    marginTop: 20,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    fontSize: 12.5, color: 'var(--ink-500)',
  },
  microDots: { display: 'flex' },
  microDot: {
    width: 26, height: 26, borderRadius: 999,
    border: '2px solid #fff', marginLeft: -8,
    display: 'grid', placeItems: 'center',
    fontWeight: 600, fontSize: 9.5, color: '#fff',
  },
  visual: { position: 'relative', marginTop: 44, paddingBottom: 0 },

  /* Stat grid inside Mac window */
  statGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 10, marginBottom: 14,
  },
  stat: {
    background: 'var(--surface)', borderRadius: 12,
    padding: '12px 14px',
    display: 'flex', flexDirection: 'column', gap: 3,
    transition: 'background 180ms, box-shadow 180ms, transform 180ms',
    cursor: 'default',
  },
  statLabel: { fontSize: 10, color: 'var(--ink-500)', fontWeight: 500 },
  statValue: { fontSize: 20, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '-0.02em', fontFeatureSettings: '"tnum"' },
  statDelta: { fontSize: 10, fontWeight: 600, color: 'var(--success)' },

  feedRow: { display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 10 },
  feedCol: { background: 'var(--surface)', borderRadius: 12, padding: '12px 14px', minHeight: 180 },
  feedHeader: { fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 },
  feedItem: { display: 'flex', alignItems: 'center', gap: 9, padding: '7px 0', borderTop: '1px dashed var(--line)', fontSize: 12 },
  feedItemFirst: { borderTop: 'none' },
  feedAva: {
    width: 26, height: 26, borderRadius: 999,
    display: 'grid', placeItems: 'center',
    fontSize: 10, fontWeight: 600, color: '#fff', flexShrink: 0,
  },
  feedText: { flex: 1, minWidth: 0 },
  feedName: { color: 'var(--ink-900)', fontWeight: 600, fontSize: 12 },
  feedSub: { color: 'var(--ink-500)', fontSize: 10 },
  feedTime: { color: 'var(--ink-400)', fontSize: 10, fontFeatureSettings: '"tnum"' },

  cardLiveDot: {
    width: 7, height: 7, borderRadius: 999,
    background: 'var(--success)',
    boxShadow: '0 0 0 3px rgba(47,163,122,0.20)',
    animation: 'pulse 2s ease-in-out infinite',
    display: 'inline-block',
    flexShrink: 0,
  },

  floatBase: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.94)',
    border: '1px solid var(--line)',
    borderRadius: 12,
    padding: '9px 13px',
    boxShadow: '0 12px 36px rgba(15,46,74,0.16)',
    display: 'flex', alignItems: 'center', gap: 9, zIndex: 3,
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
  },
};

/* ─── Stat card with hover glow ──────────────────────────────────────────── */
function StatCard({ label, value, delta, color }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      style={{
        ...heroStyles.stat,
        background: hov ? 'var(--paper)' : 'var(--surface)',
        boxShadow: hov ? '0 4px 16px rgba(15,46,74,0.08)' : 'none',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={heroStyles.statLabel}>{label}</span>
      <span style={{ ...heroStyles.statValue, color: color || 'var(--ink-900)' }} className="tnum">
        {value}
      </span>
      <span style={heroStyles.statDelta}>{delta}</span>
    </div>
  );
}

/* ─── Feed item with staggered fade-in ───────────────────────────────────── */
function FeedItem({ n, t, time, c, delay, isFirst }) {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(id);
  }, [delay]);
  return (
    <div style={{
      ...heroStyles.feedItem,
      ...(isFirst ? heroStyles.feedItemFirst : {}),
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateX(0)' : 'translateX(-8px)',
      transition: 'opacity 320ms, transform 320ms',
    }}>
      <span style={{ ...heroStyles.feedAva, background: c }}>{n[0]}</span>
      <div style={heroStyles.feedText}>
        <div style={heroStyles.feedName}>{n}</div>
        <div style={heroStyles.feedSub}>{t}</div>
      </div>
      <span style={heroStyles.feedTime}>{time}</span>
    </div>
  );
}

/* ─── Typing chat bubble ─────────────────────────────────────────────────── */
function TypingDot() {
  return (
    <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: 'var(--ink-400)', margin: '0 2px', animation: 'typingBounce 1.2s ease-in-out infinite' }} />
  );
}

function ChatMock() {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const delays = [800, 1600, 2600, 3400];
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, []);

  const bubble = (from, text, sub) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: from === 'ai' ? 'flex-start' : 'flex-end', marginBottom: 7 }}>
      <div style={{
        background: from === 'ai' ? '#fff' : 'var(--accent-soft)',
        color: from === 'ai' ? 'var(--ink-900)' : 'var(--accent-text)',
        border: from === 'ai' ? '1px solid var(--line)' : 'none',
        borderRadius: 12, padding: '7px 10px',
        fontSize: 12, maxWidth: '88%',
        boxShadow: from === 'ai' ? '0 1px 2px rgba(15,46,74,0.04)' : 'none',
        lineHeight: 1.4,
      }}>{text}</div>
      {sub && <div style={{ fontSize: 9.5, color: 'var(--ink-400)', marginTop: 2 }}>{sub}</div>}
    </div>
  );

  return (
    <div>
      {step >= 1 && bubble('ai', 'Oi Mariana! Vi que você se interessou pelo microagulhamento. Posso te encaixar quinta 14h?')}
      {step >= 2 && bubble('lead', 'Pode sim! Quanto fica?')}
      {step === 3 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: '#fff', border: '1px solid var(--line)', borderRadius: 12, width: 'fit-content', marginBottom: 7 }}>
          <TypingDot /><TypingDot /><TypingDot />
        </div>
      )}
      {step >= 4 && bubble('ai', 'R$ 280 a sessão. Reservo quinta 14h pra você?', 'IA · 2s pra responder')}
      {step >= 4 && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: 'var(--success-bg)', color: 'var(--success)',
          padding: '5px 9px', borderRadius: 999,
          fontSize: 10, fontWeight: 600, marginTop: 3,
        }}>
          <Icon name="check-circle-2" size={11} />
          Agendamento criado · 0 intervenção humana
        </div>
      )}
    </div>
  );
}

/* ─── Hero dashboard inside Mac window ───────────────────────────────────── */
function HeroDashboard() {
  return (
    <MacWindow title="Painel CLINIQ · Bella Vita Estética">
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--ink-900)' }}>
          <span style={heroStyles.cardLiveDot} />
          Painel ao vivo
        </div>
        <div style={{ fontSize: 11, color: 'var(--ink-500)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <Icon name="calendar" size={11} />
          Hoje · Maio 2026
        </div>
      </div>

      {/* Stats */}
      <div style={heroStyles.statGrid} className="hero-stats">
        <StatCard label="Leads no mês" value="142" delta="+38% vs abril" />
        <StatCard label="Agendados" value="89" delta="62,7% conversão" />
        <StatCard label="No-show" value="6%" delta="−24 pp em 60d" color="var(--success)" />
        <StatCard label="Nota Google" value="4,9 ★" delta="+34 reviews" />
      </div>

      {/* Feed */}
      <div style={heroStyles.feedRow} className="hero-feeds">
        <div style={heroStyles.feedCol}>
          <div style={heroStyles.feedHeader}>Confirmações automáticas</div>
          {[
            { n: 'Renata Lima', t: 'Quinta 14h · Microagulhamento', time: 'agora', c: '#E08B7E' },
            { n: 'Júlia M.',    t: 'Hoje 18h · Limpeza de pele',   time: '2min',  c: '#7E9AE0' },
            { n: 'Carol R.',   t: 'Sexta 10h · Drenagem',          time: '14min', c: '#7AB89A' },
            { n: 'Bia S.',     t: 'Sáb 09h · Botox',               time: '1h',    c: '#A87EE0' },
          ].map((f, i) => (
            <FeedItem key={i} {...f} delay={300 + i * 200} isFirst={i === 0} />
          ))}
        </div>
        <div style={heroStyles.feedCol}>
          <div style={heroStyles.feedHeader}>IA em ação · WhatsApp</div>
          <ChatMock />
        </div>
      </div>
    </MacWindow>
  );
}

/* ─── Floating chips ─────────────────────────────────────────────────────── */
function FloatLead() {
  return (
    <div className="float-lead" style={{ ...heroStyles.floatBase, left: '-1%', top: 24, animation: 'floatY 4s ease-in-out infinite' }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--accent-soft)', color: 'var(--accent-text)', display: 'grid', placeItems: 'center' }}>
        <Icon name="user-plus" size={15} />
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'var(--ink-500)' }}>Novo lead</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-900)' }}>Instagram · @bellavita</div>
      </div>
    </div>
  );
}
function FloatReview() {
  return (
    <div className="float-review" style={{ ...heroStyles.floatBase, right: '-1%', top: 290, animation: 'floatY 5s ease-in-out 0.7s infinite' }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: '#FFF3D6', color: '#B17D0A', display: 'grid', placeItems: 'center' }}>
        <Icon name="star" size={15} />
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'var(--ink-500)' }}>Google · há 1min</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-900)' }}>★★★★★ Júlia M.</div>
      </div>
    </div>
  );
}
function FloatNoShow() {
  return (
    <div className="float-noshow" style={{ ...heroStyles.floatBase, left: '4%', bottom: -22, animation: 'floatY 6s ease-in-out 1.3s infinite' }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--success-bg)', color: 'var(--success)', display: 'grid', placeItems: 'center' }}>
        <Icon name="trending-down" size={15} />
      </div>
      <div>
        <div style={{ fontSize: 10, color: 'var(--ink-500)' }}>No-show mensal</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-900)' }}>30% → 6% em 60 dias</div>
      </div>
    </div>
  );
}

/* ─── Rotating word cycler for hero headline ────────────────────────────── */
function WordCycler({ words }) {
  const [idx, setIdx] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [entering, setEntering] = React.useState(false);

  React.useEffect(() => {
    const tick = setInterval(() => {
      setExiting(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % words.length);
        setExiting(false);
        setEntering(true);
        setTimeout(() => setEntering(false), 400);
      }, 260);
    }, 2600);
    return () => clearInterval(tick);
  }, []);

  return (
    <span style={{
      display: 'inline-block',
      color: 'var(--teal-500)',
      opacity: exiting ? 0 : 1,
      transform: exiting
        ? 'translateY(-12px) skewX(-3deg)'
        : entering
          ? 'translateY(10px) skewX(3deg)'
          : 'translateY(0) skewX(0)',
      transition: exiting
        ? 'opacity 200ms ease-in, transform 220ms cubic-bezier(0.55,0,1,0.45)'
        : 'opacity 360ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1)',
      willChange: 'transform, opacity',
    }}>
      {words[idx]}
    </span>
  );
}

/* ─── Hero badge (21st.dev hero-badge pattern) ───────────────────────────── */
function HeroBadge({ tag, text, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: 'rgba(255,255,255,0.88)',
        border: '1px solid ' + (hov ? 'rgba(77,182,172,0.30)' : 'rgba(15,46,74,0.10)'),
        borderRadius: 999,
        padding: '5px 14px 5px 5px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: hov ? '0 4px 16px rgba(15,46,74,0.10)' : '0 1px 4px rgba(15,46,74,0.05)',
        transition: 'border-color 220ms, box-shadow 220ms',
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: 'var(--accent-soft)', color: 'var(--accent-text)',
        borderRadius: 999, padding: '5px 10px',
        fontSize: 10.5, fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0,
      }}>
        <Icon name="sparkles" size={10} />
        {tag}
      </span>
      <span style={{
        fontSize: 13, color: 'var(--ink-700)', fontWeight: 500,
        letterSpacing: '-0.01em', whiteSpace: 'nowrap',
      }}>
        {text}
      </span>
      <span style={{
        display: 'inline-flex', color: 'var(--ink-400)', flexShrink: 0,
        transform: hov ? 'translateX(2px)' : 'translateX(0)',
        transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1)',
      }}>
        <Icon name="chevron-right" size={14} />
      </span>
    </div>
  );
}

/* ─── Hero section ───────────────────────────────────────────────────────── */
function Hero({ onCtaClick }) {
  return (
    <section style={{
      background: 'radial-gradient(ellipse 110% 70% at 50% -5%, #eef6f5 0%, #fafbfc 55%)',
      position: 'relative',
      padding: 0,
    }}>
      {/* ── Full-viewport: dots contained here only ── */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
      }}>
        <DottedSurface />
        <div className="container-wide" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={heroStyles.textCol}>
              <HeroBadge
                tag="IA NATIVA"
                text="Construído sobre GoHighLevel"
                onClick={onCtaClick}
              />

              <h1
                className="display"
                style={{
                  fontSize: 'clamp(40px, 5.6vw, 82px)',
                  margin: '28px 0 0',
                  lineHeight: 1.0,
                }}
              >
                <WordCycler words={['Agenda cheia.', 'No-show zero.', '5★ no Google.']} /><br />
                <span className="display-italic-line">
                  <AnimatedUnderlineText>no piloto automático.</AnimatedUnderlineText>
                </span>
              </h1>

              <p style={heroStyles.lede}>
                Sistema completo de captação, conversão e reputação para clínicas de estética —
                <strong style={{ color: 'var(--ink-900)' }}> no piloto automático</strong>, enquanto você atende.
                Sem contratar mais ninguém. Sem depender de planilha.
              </p>

              <div style={heroStyles.ctaRow}>
                <button className="btn btn-primary btn-lg" onClick={onCtaClick}>
                  Quero o diagnóstico gratuito
                  <Icon name="arrow-right" size={16} />
                </button>
                <a
                  href="#solucao"
                  className="btn btn-ghost btn-lg"
                  onClick={(e) => { e.preventDefault(); document.getElementById('solucao')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  Ver como funciona
                </a>
              </div>

              <div style={heroStyles.microproof}>
                <div style={heroStyles.microDots}>
                  {['#E08B7E', '#7E9AE0', '#7AB89A', '#E0B87E'].map((c, i) => (
                    <span key={i} style={{ ...heroStyles.microDot, background: c }}>
                      {['R', 'J', 'C', 'M'][i]}
                    </span>
                  ))}
                </div>
                <span>
                  <strong style={{ color: 'var(--ink-900)' }}>Sem fidelidade.</strong>{' '}
                  Cancele quando quiser. 30 dias de garantia.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Below fold: Mac dashboard ── */}
      <div style={{ paddingBottom: 80, position: 'relative', zIndex: 1 }}>
        <div className="container-wide">
          <Reveal delay={180}>
            <div style={heroStyles.visual}>
              <HeroDashboard />
              <FloatLead />
              <FloatReview />
              <FloatNoShow />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(47,163,122,0.20); }
          50%       { box-shadow: 0 0 0 7px rgba(47,163,122,0.06); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @media (max-width: 760px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-feeds { grid-template-columns: 1fr !important; }
          .float-lead, .float-review, .float-noshow { display: none !important; }
        }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
