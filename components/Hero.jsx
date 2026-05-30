/* global React, Icon, Reveal */

/* ─── Dot-pattern + mouse-highlight background (Aceternity-style) ─────────── */
function HeroHighlight({ children, style }) {
  const [pos, setPos] = React.useState({ x: -500, y: -500 });
  const [hov, setHov] = React.useState(false);

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', background: 'transparent', ...style }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPos({ x: -9999, y: -9999 }); }}
    >
      {/* Static neutral dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(15,46,74,0.09) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }} />
      {/* Teal dot highlight — revealed around cursor */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle, var(--teal-500) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        WebkitMaskImage: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
        maskImage: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
        opacity: hov ? 0.72 : 0,
        transition: 'opacity 400ms ease',
      }} />
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
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
          position: 'absolute', left: 0, bottom: '-0.04em',
          width: '100%', height: '0.14em',
          overflow: 'visible', pointerEvents: 'none',
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
  textCol: { textAlign: 'center', maxWidth: 880, margin: '0 auto' },
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
    marginTop: 24,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    flexWrap: 'wrap',
    fontSize: 13, color: 'var(--ink-500)',
    maxWidth: 560, marginLeft: 'auto', marginRight: 'auto',
    lineHeight: 1.55,
  },
  microBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    flexShrink: 0,
    padding: '6px 12px', borderRadius: 999,
    background: 'var(--accent-soft)', color: 'var(--accent-text)',
    fontFamily: 'var(--font-sans)',
    fontSize: 12.5, fontWeight: 700, letterSpacing: '-0.01em',
    whiteSpace: 'nowrap',
  },
  microSource: {
    marginLeft: 6, color: 'var(--ink-400)', fontSize: 11,
    borderBottom: '1px dotted var(--ink-400)', textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
};

/* ─── Rotating word cycler ───────────────────────────────────────────────── */
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

/* ─── Hero section ───────────────────────────────────────────────────────── */
function Hero({ onCtaClick }) {
  return (
    <section style={{ padding: 0 }}>

      {/* ── Sticky above-fold: full viewport ── */}
      <div className="hero-sticky-fold" style={{ position: 'relative' }}>

        {/* Ambient parallax orbs — profundidade sutil atrás do conteúdo */}
        <div aria-hidden="true" data-parallax="0.20" style={{
          position: 'absolute', top: '-12%', right: '2%', width: 'min(46vw, 560px)', height: 'min(46vw, 560px)',
          borderRadius: '50%', zIndex: 0, pointerEvents: 'none', filter: 'blur(8px)',
          background: 'radial-gradient(circle at 50% 50%, rgba(77,182,172,0.22), rgba(77,182,172,0.06) 45%, transparent 68%)',
        }} />
        <div aria-hidden="true" data-parallax="-0.14" style={{
          position: 'absolute', bottom: '-6%', left: '-6%', width: 'min(40vw, 480px)', height: 'min(40vw, 480px)',
          borderRadius: '50%', zIndex: 0, pointerEvents: 'none', filter: 'blur(10px)',
          background: 'radial-gradient(circle at 50% 50%, rgba(16,48,73,0.10), transparent 66%)',
        }} />
        <div aria-hidden="true" data-parallax="0.08" style={{
          position: 'absolute', top: '24%', left: '14%', width: 'min(22vw, 280px)', height: 'min(22vw, 280px)',
          borderRadius: '50%', zIndex: 0, pointerEvents: 'none', filter: 'blur(6px)',
          background: 'radial-gradient(circle at 50% 50%, rgba(195,168,110,0.12), transparent 64%)',
        }} />

        <HeroHighlight style={{ height: '100%' }}>
          <div className="container-wide" style={{ width: '100%', paddingTop: 80 }}>
              <div style={heroStyles.textCol} className="hero-stagger">
                <h1
                  className="display"
                  style={{ fontSize: 'clamp(40px, 5.6vw, 82px)', margin: '0', lineHeight: 1.0 }}
                >
                  <WordCycler words={['Agenda cheia', 'No-show zero', '5★ no Google']} /><br />
                  <AnimatedUnderlineText>no piloto automático.</AnimatedUnderlineText>
                </h1>

                <p style={heroStyles.lede}>
                  Sistema completo de captação, conversão e reputação para clínicas de estética,
                  <strong style={{ color: 'var(--ink-900)' }}> no piloto automático</strong>, enquanto você atende.
                  Sem contratar mais ninguém. Sem depender de planilha.
                </p>

                <div style={heroStyles.ctaRow}>
                  <MagneticButton strength={0.4}>
                    <button className="btn btn-primary btn-lg" onClick={onCtaClick}>
                      Quero o diagnóstico gratuito
                      <Icon name="arrow-right" size={16} />
                    </button>
                  </MagneticButton>
                  <MagneticButton strength={0.25}>
                  <a
                    href="#solucao"
                    className="btn btn-ghost btn-lg"
                    onClick={(e) => { e.preventDefault(); document.getElementById('solucao')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    Ver como funciona
                  </a>
                  </MagneticButton>
                </div>

                <div style={heroStyles.microproof}>
                  <span style={heroStyles.microBadge}>
                    <Icon name="zap" size={13} color="var(--accent-text)" />
                    21× mais conversão
                  </span>
                  <span>
                    É a chance a mais de fechar um lead quando você responde em até 5 min.{' '}
                    <strong style={{ color: 'var(--ink-900)', whiteSpace: 'nowrap' }}>A IA faz isso 24h.</strong>{' '}
                    <a href="https://25649.fs1.hubspotusercontent-na2.net/hub/25649/file-13535879-pdf/docs/mit_study.pdf"
                       target="_blank" rel="noopener noreferrer" style={heroStyles.microSource}>Fonte: MIT</a>
                  </span>
                </div>
              </div>
          </div>
        </HeroHighlight>

        {/* Scroll cue */}
        <div className="hero-scroll-cue">
          <span className="hero-scroll-label">Role</span>
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="18" height="30" rx="9" stroke="rgba(15,46,74,0.22)" strokeWidth="1.5"/>
            <circle className="hero-scroll-dot" cx="10" cy="9" r="2.5" fill="rgba(77,182,172,0.7)"/>
          </svg>
        </div>
      </div>

      <style>{`
        .hero-sticky-fold {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        .hero-scroll-cue {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          pointer-events: none;
          z-index: 2;
          animation: heroScrollFloat 2.4s ease-in-out infinite;
        }
        .hero-scroll-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(15,46,74,0.35);
          font-family: var(--font-sans);
        }
        .hero-scroll-dot {
          animation: heroScrollDot 2.4s ease-in-out infinite;
        }
        @keyframes heroScrollFloat {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) translateY(0); }
          50%       { opacity: 0.9; transform: translateX(-50%) translateY(5px); }
        }
        @keyframes heroScrollDot {
          0%, 20%  { transform: translateY(0); opacity: 1; }
          80%, 100% { transform: translateY(14px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
