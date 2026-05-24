/* global React, Icon */

const footerStyles = {
  wrap: {
    background: 'var(--paper)',
    borderTop: '1px solid var(--line)',
    padding: '48px 0 32px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
    gap: 40,
    paddingBottom: 36,
    borderBottom: '1px solid var(--line)',
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 10,
    fontFamily: 'var(--font-display)',
    fontSize: 22, fontWeight: 700,
    color: 'var(--ink-900)',
    letterSpacing: '-0.025em',
    marginBottom: 12,
  },
  brandMark: {
    width: 32, height: 32, borderRadius: 10,
    background: 'var(--navy-900)', color: '#fff',
    display: 'grid', placeItems: 'center',
    fontWeight: 700, fontSize: 14,
  },
  blurb: {
    fontSize: 13, color: 'var(--ink-500)', maxWidth: 320, lineHeight: 1.55,
  },
  colTitle: {
    fontSize: 11, fontWeight: 700,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: 'var(--ink-700)',
    marginBottom: 14,
  },
  link: {
    display: 'block',
    fontSize: 13, color: 'var(--ink-500)', textDecoration: 'none',
    padding: '6px 0',
    transition: 'color 140ms',
  },
  bottom: {
    paddingTop: 24,
    display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
    fontSize: 12, color: 'var(--ink-400)',
  },
};

function Footer() {
  return (
    <footer style={footerStyles.wrap}>
      <div className="container-wide">
        <div style={footerStyles.grid} className="footer-grid">
          <div>
            <div style={footerStyles.brand}>
              <span style={footerStyles.brandMark}>C</span>
              <span>CLINIQ</span>
            </div>
            <p style={footerStyles.blurb}>
              Sistema de vendas automatizado para clínicas de estética. Construído sobre GoHighLevel com IA nativa.
            </p>
          </div>
          <div>
            <div style={footerStyles.colTitle}>Produto</div>
            <a href="#problema" style={footerStyles.link}>Problema</a>
            <a href="#solucao" style={footerStyles.link}>Como funciona</a>
            <a href="#oferta" style={footerStyles.link}>Plano</a>
            <a href="#faq" style={footerStyles.link}>FAQ</a>
          </div>
          <div>
            <div style={footerStyles.colTitle}>Empresa</div>
            <a href="#" style={footerStyles.link}>Sobre</a>
            <a href="#" style={footerStyles.link}>Contato</a>
            <a href="#" style={footerStyles.link}>Política de Privacidade</a>
            <a href="#" style={footerStyles.link}>Termos de uso</a>
          </div>
          <div>
            <div style={footerStyles.colTitle}>Contato</div>
            <a href="mailto:contato@cliniq.com.br" style={footerStyles.link}>contato@cliniq.com.br</a>
            <a href="https://wa.me/5500000000000" style={footerStyles.link}>WhatsApp comercial</a>
          </div>
        </div>
        <div style={footerStyles.bottom}>
          <span>© 2026 CLINIQ · Todos os direitos reservados.</span>
          <span>CNPJ 00.000.000/0001-00 · Atendemos em todo o Brasil</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

window.Footer = Footer;
