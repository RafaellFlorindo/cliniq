/* global React, Container, Button, Icon */
const { useState, useEffect } = React;

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
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: '-0.025em',
    textDecoration: 'none',
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
    fontSize: 14, fontWeight: 500,
  },
  link: {
    color: 'var(--ink-700)',
    textDecoration: 'none',
    transition: 'color 140ms var(--ease-out)',
    cursor: 'pointer',
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
          <span style={navStyles.brandMark}>C</span>
          <span>CLINIQ</span>
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
      `}</style>
    </header>
  );
}

window.Nav = Nav;
