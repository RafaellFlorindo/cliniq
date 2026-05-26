/* global React, Icon */
const { useState, useEffect, useRef } = React;

/* ─── Logo mark ──────────────────────────────────────────────────────────── */
function LogoMark() {
  const [hov, setHov] = useState(false);
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 32, height: 32, borderRadius: 8,
        background: 'var(--navy-900)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', position: 'relative', overflow: 'hidden', flexShrink: 0,
        transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms',
        transform: hov ? 'scale(1.08)' : 'scale(1)',
        boxShadow: hov ? '0 4px 16px rgba(15,46,74,0.30)' : 'none',
      }}
    >
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        style={{
          transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1)',
          transform: clicked ? 'rotate(45deg) scale(1.15)' : hov ? 'rotate(12deg)' : 'rotate(0deg)',
        }}
      >
        <rect x="12" y="3" width="4" height="22" rx="2" fill="#4DB6AC"/>
        <rect x="3" y="12" width="22" height="4" rx="2" fill="white" opacity="0.9"/>
        <circle cx="14" cy="14" r="3" fill="white"/>
      </svg>
      {clicked && (
        <span style={{
          position: 'absolute', inset: 0,
          background: 'rgba(77,182,172,0.35)',
          borderRadius: 'inherit',
          animation: 'logoRipple 500ms ease-out forwards',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
}

/* ─── Nav link with animated underline ──────────────────────────────────── */
function NavLink({ href, children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        color: hov ? 'var(--ink-900)' : 'var(--ink-500)',
        textDecoration: 'none',
        fontSize: 13.5,
        fontWeight: 500,
        letterSpacing: '0.01em',
        transition: 'color 160ms ease',
        paddingBottom: 2,
      }}
    >
      {children}
      <span style={{
        position: 'absolute',
        bottom: -1, left: 0,
        height: 1.5,
        width: hov ? '100%' : '0%',
        background: 'var(--accent)',
        borderRadius: 99,
        transition: 'width 220ms cubic-bezier(0.22,1,0.36,1)',
      }} />
    </a>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
function Nav({ onCtaClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setScrolled(y > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      /* fade-in the glass layer */
      background: scrolled ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0)',
      backdropFilter: scrolled ? 'saturate(160%) blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'saturate(160%) blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(15,46,74,0.07)' : '1px solid transparent',
      boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 24px rgba(15,46,74,0.05)' : 'none',
      transition: 'background 280ms ease, backdrop-filter 280ms ease, border-color 280ms ease, box-shadow 280ms ease',
    }}>
      <div className="container-wide" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: scrolled ? 60 : 68,
        transition: 'height 280ms ease',
      }}>

        {/* Brand */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
            fontSize: 18, fontWeight: 800,
            letterSpacing: '0.05em',
            color: 'var(--ink-900)',
            textTransform: 'uppercase',
          }}
        >
          <LogoMark />
          CLINI<span style={{ color: 'var(--teal-500)' }}>Q</span>
        </a>

        {/* Center links */}
        <nav className="nav-links" style={{
          display: 'flex', alignItems: 'center', gap: 28,
        }}>
          <NavLink href="#problema" onClick={scrollTo('problema')}>Problema</NavLink>
          <NavLink href="#solucao"  onClick={scrollTo('solucao')}>Como funciona</NavLink>
          <NavLink href="#oferta"   onClick={scrollTo('oferta')}>Plano</NavLink>
          <NavLink href="#faq"      onClick={scrollTo('faq')}>Perguntas</NavLink>
        </nav>

        {/* Right: CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Ghost secondary */}
          <button
            className="nav-ghost"
            onClick={onCtaClick}
            style={{
              background: 'none', border: 'none',
              fontSize: 13, fontWeight: 500,
              color: 'var(--ink-500)',
              cursor: 'pointer', padding: '0 4px',
              fontFamily: 'var(--font-sans)',
              transition: 'color 160ms',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--ink-900)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-500)'}
          >
            Entrar
          </button>

          {/* Primary CTA */}
          <button
            onClick={onCtaClick}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--navy-900)',
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              padding: '9px 18px',
              fontSize: 13, fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              letterSpacing: '0.01em',
              transition: 'background 180ms, transform 140ms, box-shadow 180ms',
              boxShadow: '0 2px 8px rgba(15,46,74,0.18)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--teal-500)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(77,182,172,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--navy-900)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(15,46,74,0.18)';
            }}
          >
            Fazer diagnóstico
            <Icon name="arrow-right" size={13} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-ghost  { display: none !important; }
        }
        @keyframes logoRipple {
          from { opacity: 1; transform: scale(0.4); }
          to   { opacity: 0; transform: scale(2.2); }
        }
      `}</style>
    </header>
  );
}

window.Nav = Nav;
