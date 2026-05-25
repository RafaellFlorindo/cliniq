/* global React, Container, Button, Icon */
const { useState, useEffect } = React;

/* ─── Cliniq logo mark with interactive + ───────────────────────────────── */
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
        width: 34, height: 34, borderRadius: 9,
        background: 'var(--navy-900)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', position: 'relative', overflow: 'hidden', flexShrink: 0,
        transition: 'transform 200ms cubic-bezier(0.22,1,0.36,1), box-shadow 200ms',
        transform: hov ? 'scale(1.10)' : 'scale(1)',
        boxShadow: hov ? '0 4px 14px rgba(15,46,74,0.35)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
        width="18" height="18"
        style={{
          transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1)',
          transform: clicked ? 'rotate(45deg) scale(1.15)' : hov ? 'rotate(14deg)' : 'rotate(0deg)',
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

const navStyles = {
  wrap: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    transition: 'background 220ms var(--ease-out), backdrop-filter 220ms var(--ease-out), border-color 220ms var(--ease-out), padding 220ms var(--ease-out)',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
  },
  brand: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    color: 'var(--ink-900)',
    fontFamily: 'var(--font-display)',
    fontSize: 21,
    fontWeight: 800,
    letterSpacing: '0.04em',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  brandMark: {
    width: 32, height: 32, borderRadius: 10,
    background: 'var(--navy-900)', color: '#fff',
    display: 'grid', placeItems: 'center',
    fontWeight: 700, fontSize: 14,
    letterSpacing: '-0.01em',
  },
  links: {
    display: 'flex', alignItems: 'center', gap: 32,
    fontSize: 14, fontWeight: 400, letterSpacing: '0.01em',
  },
  link: {
    color: 'var(--ink-600)',
    textDecoration: 'none',
    transition: 'color 140ms var(--ease-out)',
    cursor: 'pointer',
    fontStyle: 'italic',
  },
  right: {
    display: 'flex', alignItems: 'center', gap: 12,
  },
};

function Nav({ onCtaClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const wrapStyle = {
    ...navStyles.wrap,
    background: scrolled ? 'rgba(255,255,255,0.78)' : 'transparent',
    backdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
  };

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header style={wrapStyle}>
      <div className="container-wide" style={navStyles.inner}>
        <a href="#" style={navStyles.brand} onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'});}}>
          <LogoMark />
          <span>CLINI<span style={{ color: 'var(--teal-500)' }}>Q</span></span>
        </a>
        <nav style={navStyles.links} className="nav-links">
          <a href="#problema" style={navStyles.link} onClick={scrollTo('problema')}>Problema</a>
          <a href="#solucao" style={navStyles.link} onClick={scrollTo('solucao')}>Como funciona</a>
          <a href="#oferta" style={navStyles.link} onClick={scrollTo('oferta')}>Plano</a>
          <a href="#faq" style={navStyles.link} onClick={scrollTo('faq')}>Perguntas</a>
        </nav>
        <div style={navStyles.right}>
          <button className="btn btn-primary btn-sm" onClick={onCtaClick} style={{borderRadius: 999}}>
            Fazer diagnóstico
            <Icon name="arrow-right" size={14} />
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .nav-links { display: none !important; }
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
