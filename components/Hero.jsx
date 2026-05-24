/* global React, Container, Icon, Reveal */
const heroStyles = {
  section: {
    background: '#fff',
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  /* Soft warm yellow radial glow — background layer */
  bgGlow: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, #FFF991 0%, transparent 70%)',
    opacity: 0.55,
    mixBlendMode: 'multiply',
  },
  /* Second glow: soft amber at bottom-center to add warmth depth */
  bgGlow2: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,220,100,0.30) 0%, transparent 70%)',
  },
  innerWrap: {
    position: 'relative',
    zIndex: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 64,
    paddingBottom: 96,
    position: 'relative',
  },
  textCol: { textAlign: 'center', maxWidth: 1000, margin: '0 auto' },
  announce: {
    display: 'inline-flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.75)',
    border: '1px solid var(--line)',
    borderRadius: 999,
    padding: 4,
    fontSize: 13,
    boxShadow: '0 1px 2px rgba(15,46,74,0.04)',
    gap: 10,
    marginBottom: 32,
  },
  announceTag: {
    background: 'var(--accent-soft)',
    color: 'var(--accent-text)',
    fontWeight: 700,
    padding: '6px 14px',
    borderRadius: 999,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    fontSize: 11,
    whiteSpace: 'nowrap',
    display: 'inline-flex', alignItems: 'center', gap: 6,
  },
  announceText: {
    color: 'var(--ink-700)',
    paddingRight: 14,
    letterSpacing: '-0.005em',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  /* MASSIVE display headline */
  display: {
    /* sized via .display-xxl on element */
  },
  lede: {
    fontSize: 'clamp(17px, 1.5vw, 21px)',
    lineHeight: 1.45,
    color: 'var(--ink-600)',
    maxWidth: 640,
    margin: '24px auto 0',
    textWrap: 'pretty',
  },
  ctaRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 20, flexWrap: 'wrap',
    marginTop: 40,
  },
  microproof: {
    marginTop: 24,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    fontSize: 13, color: 'var(--ink-500)',
  },
  microDots: { display: 'flex' },
  microDot: {
    width: 28, height: 28, borderRadius: 999,
    border: '2px solid #fff', marginLeft: -8,
    display: 'grid', placeItems: 'center',
    fontWeight: 600, fontSize: 10, color: '#fff',
  },

  /* Visual stack — right side / below */
  visual: {
    position: 'relative',
    marginTop: 56,
    paddingBottom: 0,
  },

  /* Hero dashboard card */
  hero_card: {
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    borderRadius: 24,
    boxShadow: '0 40px 100px rgba(15,46,74,0.15), 0 4px 12px rgba(15,46,74,0.06)',
    padding: 24,
    width: '100%',
    maxWidth: 980,
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  cardHead: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 15, fontWeight: 600, color: 'var(--ink-900)',
    letterSpacing: '-0.01em',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  cardLiveDot: {
    width: 8, height: 8, borderRadius: 999,
    background: 'var(--success)',
    boxShadow: '0 0 0 4px rgba(47,163,122,0.18)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
    marginBottom: 18,
  },
  stat: {
    background: 'var(--surface)',
    borderRadius: 14,
    padding: '14px 16px',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  statLabel: { fontSize: 11, color: 'var(--ink-500)', fontWeight: 500 },
  statValue: { fontSize: 22, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '-0.02em', fontFeatureSettings: '"tnum"' },
  statDelta: { fontSize: 11, fontWeight: 600, color: 'var(--success)' },

  feedRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gap: 12,
  },
  feedCol: {
    background: 'var(--surface)',
    borderRadius: 14,
    padding: '14px 16px',
    minHeight: 200,
  },
  feedHeader: { fontSize: 11, fontWeight: 600, color: 'var(--ink-500)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 },
  feedItem: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 0',
    borderTop: '1px dashed var(--line)',
    fontSize: 13,
  },
  feedItemFirst: { borderTop: 'none' },
  feedAva: {
    width: 28, height: 28, borderRadius: 999,
    display: 'grid', placeItems: 'center',
    fontSize: 11, fontWeight: 600, color: '#fff',
    flexShrink: 0,
  },
  feedText: { flex: 1, minWidth: 0 },
  feedName: { color: 'var(--ink-900)', fontWeight: 600, fontSize: 13 },
  feedSub: { color: 'var(--ink-500)', fontSize: 11 },
  feedTime: { color: 'var(--ink-400)', fontSize: 11, fontFeatureSettings: '"tnum"' },

  /* Floating chips around card */
  floatBase: {
    position: 'absolute',
    background: '#fff',
    border: '1px solid var(--line)',
    borderRadius: 14,
    padding: '10px 14px',
    boxShadow: '0 18px 48px rgba(15,46,74,0.18)',
    display: 'flex', alignItems: 'center', gap: 10,
    zIndex: 3,
  },
};

function Hero({ onCtaClick }) {
  return (
    <section style={heroStyles.section}>
      {/* Warm yellow radial glow backgrounds */}
      <div style={heroStyles.bgGlow} />
      <div style={heroStyles.bgGlow2} />

      {/* Glass filter SVG — hidden, used by LiquidCtaButton */}
      <GlassFilterSvg />

      <div className="container-wide" style={heroStyles.innerWrap}>
        <Reveal>
          <div style={heroStyles.textCol}>
            <span style={heroStyles.announce}>
              <span style={heroStyles.announceTag}>
                <Icon name="sparkles" size={11} />
                IA NATIVA
              </span>
              <span style={heroStyles.announceText}>Construído em cima do GoHighLevel</span>
            </span>

            <h1 className="display display-xxl" style={{ marginBottom: 24, paddingBottom: 8 }}>
              Agenda cheia,<br />
              no-show zerado e<br />
              <span className="accent-chip">5&#9733;&nbsp;no&nbsp;Google.</span>
            </h1>

            <p style={heroStyles.lede}>
              Sistema completo de captação, conversão e reputação para clínicas de estética —
              <strong style={{color:'var(--ink-900)'}}> no piloto automático</strong>, enquanto você atende.
              Sem contratar mais ninguém. Sem depender de planilha.
            </p>

            <div style={heroStyles.ctaRow}>
              <LiquidCtaButton onClick={onCtaClick}>
                Quero o diagnóstico gratuito
              </LiquidCtaButton>
              <a href="#solucao" className="btn btn-ghost btn-lg" onClick={(e)=>{e.preventDefault(); document.getElementById('solucao')?.scrollIntoView({behavior:'smooth'});}}>
                Ver como funciona
              </a>
            </div>

            <div style={heroStyles.microproof}>
              <div style={heroStyles.microDots}>
                {['#E08B7E','#7E9AE0','#7AB89A','#E0B87E'].map((c,i)=>(
                  <span key={i} style={{...heroStyles.microDot, background:c}}>
                    {['R','J','C','M'][i]}
                  </span>
                ))}
              </div>
              <span>
                <strong style={{color:'var(--ink-900)'}}>Sem fidelidade.</strong>{' '}
                Cancele quando quiser. 30 dias de garantia.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div style={heroStyles.visual}>
            <HeroDashboard />
            <FloatLead />
            <FloatReview />
            <FloatNoShow />
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(47,163,122,0.18); }
          50% { box-shadow: 0 0 0 8px rgba(47,163,122,0.06); }
        }
        @media (max-width: 760px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-feeds { grid-template-columns: 1fr !important; }
          .float-lead, .float-review, .float-noshow { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div style={heroStyles.hero_card}>
      <div style={heroStyles.cardHead}>
        <div style={heroStyles.cardTitle}>
          <span style={heroStyles.cardLiveDot} />
          <span>Painel CLINIQ · Bella Vita Estética</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-500)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="calendar" size={12} />
          Hoje · Maio 2026
        </div>
      </div>

      <div style={heroStyles.statGrid} className="hero-stats">
        <div style={heroStyles.stat}>
          <span style={heroStyles.statLabel}>Leads no mês</span>
          <span style={heroStyles.statValue} className="tnum">142</span>
          <span style={heroStyles.statDelta}>+38% vs abril</span>
        </div>
        <div style={heroStyles.stat}>
          <span style={heroStyles.statLabel}>Agendados</span>
          <span style={heroStyles.statValue} className="tnum">89</span>
          <span style={heroStyles.statDelta}>62,7% conversão</span>
        </div>
        <div style={heroStyles.stat}>
          <span style={heroStyles.statLabel}>No-show</span>
          <span style={{...heroStyles.statValue, color:'var(--success)'}} className="tnum">6%</span>
          <span style={heroStyles.statDelta}>−24 pp em 60d</span>
        </div>
        <div style={heroStyles.stat}>
          <span style={heroStyles.statLabel}>Nota Google</span>
          <span style={heroStyles.statValue} className="tnum">4,9 ★</span>
          <span style={heroStyles.statDelta}>+34 reviews</span>
        </div>
      </div>

      <div style={heroStyles.feedRow} className="hero-feeds">
        <div style={heroStyles.feedCol}>
          <div style={heroStyles.feedHeader}>Confirmações automáticas</div>
          {[
            { n:'Renata Lima', t:'Quinta 14h · Microagulhamento', time:'agora', c:'#E08B7E' },
            { n:'Júlia M.',    t:'Hoje 18h · Limpeza de pele',   time:'2min', c:'#7E9AE0' },
            { n:'Carol R.',    t:'Sexta 10h · Drenagem',          time:'14min', c:'#7AB89A' },
            { n:'Bia S.',      t:'Sáb 09h · Botox',                time:'1h',   c:'#A87EE0' },
          ].map((f,i)=>(
            <div key={i} style={{...heroStyles.feedItem, ...(i===0?heroStyles.feedItemFirst:{})}}>
              <span style={{...heroStyles.feedAva, background: f.c}}>{f.n[0]}</span>
              <div style={heroStyles.feedText}>
                <div style={heroStyles.feedName}>{f.n}</div>
                <div style={heroStyles.feedSub}>{f.t}</div>
              </div>
              <span style={heroStyles.feedTime}>{f.time}</span>
            </div>
          ))}
        </div>
        <div style={heroStyles.feedCol}>
          <div style={heroStyles.feedHeader}>IA em ação · WhatsApp</div>
          <ChatMock />
        </div>
      </div>
    </div>
  );
}

function ChatMock() {
  const bubble = (from, text, sub) => (
    <div style={{ display:'flex', flexDirection:'column', alignItems: from==='ai' ? 'flex-start':'flex-end', marginBottom: 8 }}>
      <div style={{
        background: from==='ai' ? '#fff' : 'var(--accent-soft)',
        color: from==='ai' ? 'var(--ink-900)' : 'var(--accent-text)',
        border: from==='ai' ? '1px solid var(--line)' : 'none',
        borderRadius: 14,
        padding: '8px 12px',
        fontSize: 13,
        maxWidth: '85%',
        boxShadow: from==='ai' ? '0 1px 2px rgba(15,46,74,0.04)' : 'none',
        lineHeight: 1.4,
      }}>{text}</div>
      {sub && <div style={{ fontSize: 10, color: 'var(--ink-400)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
  return (
    <div>
      {bubble('ai', 'Oi Mariana! Vi que você se interessou pelo microagulhamento. Posso te encaixar quinta 14h?')}
      {bubble('lead', 'Pode sim! Quanto fica?')}
      {bubble('ai', 'R$ 280 a sessão. Reservo quinta 14h pra você?', 'IA · 2s pra responder')}
      <div style={{
        display:'inline-flex', alignItems:'center', gap:6,
        background: 'var(--success-bg)', color: 'var(--success)',
        padding: '6px 10px', borderRadius: 999,
        fontSize: 11, fontWeight: 600, marginTop: 4,
      }}>
        <Icon name="check-circle-2" size={12} />
        Agendamento criado · 0 intervenção humana
      </div>
    </div>
  );
}

function FloatLead() {
  return (
    <div className="float-lead" style={{...heroStyles.floatBase, left: '-2%', top: 30 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--accent-soft)', color: 'var(--accent-text)', display: 'grid', placeItems: 'center' }}>
        <Icon name="user-plus" size={16} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Novo lead</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)' }}>Instagram · @bellavita</div>
      </div>
    </div>
  );
}
function FloatReview() {
  return (
    <div className="float-review" style={{...heroStyles.floatBase, right: '-2%', top: 320 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FFF3D6', color: '#B17D0A', display: 'grid', placeItems: 'center' }}>
        <Icon name="star" size={16} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Google · há 1min</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)' }}>★★★★★ Júlia M.</div>
      </div>
    </div>
  );
}
function FloatNoShow() {
  return (
    <div className="float-noshow" style={{...heroStyles.floatBase, left: '4%', bottom: -28 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--success-bg)', color: 'var(--success)', display: 'grid', placeItems: 'center' }}>
        <Icon name="trending-down" size={16} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>No-show mensal</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)' }}>30% → 6% em 60 dias</div>
      </div>
    </div>
  );
}

/* ─── Liquid Glass Button ─────────────────────────────────────────── */

/** Hidden SVG that defines the glass distortion filter */
function GlassFilterSvg() {
  return (
    <svg style={{ display: 'none' }}>
      <defs>
        <filter
          id="hero-glass"
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="2" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="60" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="3.5" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

function LiquidCtaButton({ children, onClick }) {
  const { useState: useS } = React;
  const [hovered, setHovered] = useS(false);
  const [pressed, setPressed] = useS(false);

  const scale = pressed ? 'scale(0.975)' : hovered ? 'scale(1.03)' : 'scale(1)';
  const brightness = pressed ? 'brightness(0.92)' : hovered ? 'brightness(1.06)' : 'brightness(1)';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '18px 32px',
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'inherit',
        letterSpacing: '-0.01em',
        color: 'var(--navy-900)',
        background: 'transparent',
        transform: scale,
        filter: brightness,
        transition: 'transform 250ms cubic-bezier(0.1,0.4,0.2,1), filter 250ms cubic-bezier(0.1,0.4,0.2,1)',
        outline: 'none',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        zIndex: 0,
      }}
    >
      {/* Backdrop — glass distortion layer */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 999,
        backdropFilter: 'url("#hero-glass")',
        WebkitBackdropFilter: 'url("#hero-glass")',
        zIndex: -1,
        overflow: 'hidden',
      }} />
      {/* Glass rim — box-shadow rings */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 999,
        zIndex: -1,
        boxShadow: [
          '0 0 6px rgba(0,0,0,0.03)',
          '0 2px 8px rgba(0,0,0,0.10)',
          'inset 3px 3px 0.5px -3px rgba(0,0,0,0.8)',
          'inset -3px -3px 0.5px -3px rgba(0,0,0,0.75)',
          'inset 1px 1px 1px -0.5px rgba(0,0,0,0.5)',
          'inset -1px -1px 1px -0.5px rgba(0,0,0,0.5)',
          'inset 0 0 6px 6px rgba(0,0,0,0.10)',
          'inset 0 0 2px 2px rgba(0,0,0,0.05)',
          '0 0 14px rgba(255,255,255,0.20)',
        ].join(','),
        transition: 'box-shadow 250ms',
      }} />
      {/* Label + arrow */}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex' }}>
        <Icon name="arrow-right" size={18} />
      </span>
    </button>
  );
}

window.Hero = Hero;
