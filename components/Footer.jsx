/* global React, Icon */

function Footer() {
  const link = {
    display: 'block', fontSize: 13, color: 'var(--ink-500)',
    textDecoration: 'none', padding: '5px 0',
    transition: 'color 140ms',
  };

  return (
    <footer style={{ background: 'var(--navy-900)', paddingTop: 64, paddingBottom: 36 }}>
      <div className="container-wide">

        {/* Top grid */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
          gap: 48,
          paddingBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>

          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              {/* Logo mark */}
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: 'var(--teal-500)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg viewBox="0 0 28 28" fill="none" width="16" height="16">
                  <rect x="12" y="3" width="4" height="22" rx="2" fill="white"/>
                  <rect x="3" y="12" width="22" height="4" rx="2" fill="white" opacity="0.85"/>
                  <circle cx="14" cy="14" r="3" fill="var(--navy-900)"/>
                </svg>
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20, fontWeight: 800,
                color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                CLINI<span style={{ color: 'var(--teal-400, #4DB6AC)' }}>Q</span>
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 280 }}>
              Sistema de vendas automatizado para clínicas de estética. Captação, conversão e reputação no piloto automático.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['instagram', 'facebook', 'linkedin'].map(n => (
                <a key={n} href="#" style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'grid', placeItems: 'center',
                  color: 'rgba(255,255,255,0.45)',
                  transition: 'background 160ms, color 160ms',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(77,182,172,0.18)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                >
                  <Icon name={n} size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {[
            { title: 'Produto', links: [{ label: 'Problema', href: '#problema' }, { label: 'Como funciona', href: '#solucao' }, { label: 'Plano', href: '#oferta' }, { label: 'FAQ', href: '#faq' }] },
            { title: 'Empresa', links: [{ label: 'Sobre', href: '#' }, { label: 'Contato', href: '#' }, { label: 'Privacidade', href: '#' }, { label: 'Termos de uso', href: '#' }] },
            { title: 'Contato', links: [{ label: 'contato@cliniq.com.br', href: 'mailto:contato@cliniq.com.br' }, { label: 'WhatsApp comercial', href: 'https://wa.me/5500000000000' }] },
          ].map(col => (
            <div key={col.title}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)',
                marginBottom: 18,
              }}>{col.title}</div>
              {col.links.map(l => (
                <a key={l.label} href={l.href} style={{ ...link, color: 'rgba(255,255,255,0.50)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.50)'}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
          fontSize: 12, color: 'rgba(255,255,255,0.25)',
        }}>
          <span>© 2026 CLINIQ · Todos os direitos reservados.</span>
          <span>CNPJ 00.000.000/0001-00 · Atendemos em todo o Brasil</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

window.Footer = Footer;
