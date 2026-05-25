/* global React, Icon, Reveal */

const ctaStyles = {
  section: {
    background: 'var(--navy-900)',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  decor: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `radial-gradient(circle at 20% 100%, rgba(77,182,172,0.18), transparent 50%),
                     radial-gradient(circle at 90% 0%, rgba(77,182,172,0.10), transparent 40%)`,
    pointerEvents: 'none',
  },
  inner: {
    position: 'relative', zIndex: 1,
    textAlign: 'center',
    maxWidth: 880, margin: '0 auto',
  },
  display: {
    color: '#fff',
    margin: 0,
  },
  lede: {
    marginTop: 24, fontSize: 19, color: 'rgba(255,255,255,0.78)',
    lineHeight: 1.5,
    maxWidth: 720, marginLeft: 'auto', marginRight: 'auto',
  },
  ctaRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 16, flexWrap: 'wrap',
    marginTop: 40,
  },
  ps: {
    marginTop: 64,
    padding: 28,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 20,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column', gap: 16,
  },
  psRow: { display: 'flex', alignItems: 'flex-start', gap: 14, color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.55 },
  psLabel: {
    flexShrink: 0,
    fontFamily: 'var(--font-display)',
    fontWeight: 700, fontSize: 14,
    color: 'var(--teal-200)',
    width: 38, paddingTop: 2,
    letterSpacing: '0.04em',
  },
};

function CtaFinal({ onCtaClick }) {
  return (
    <section style={ctaStyles.section}>
      <div style={ctaStyles.decor} />
      <div className="container-wide">
        <Reveal style={ctaStyles.inner}>
          <span className="eyebrow eyebrow-onnavy">Agora é hora</span>
          <h2 className="display display-xl" style={{...ctaStyles.display, marginTop: 14}}>
            Sua concorrente vai automatizar.<br/>
            A questão é se <span className="accent-chip">você chega primeiro.</span>
          </h2>
          <p style={ctaStyles.lede}>
            O sistema está pronto. A configuração é nossa. O risco é zero nos primeiros 30 dias.
            Comece pelo diagnóstico: 4 perguntas, 90 segundos.
          </p>

          <div style={ctaStyles.ctaRow}>
            <button className="btn btn-teal btn-lg" onClick={onCtaClick}>
              Fazer o diagnóstico agora
              <Icon name="arrow-right" size={18} />
            </button>
            <a
              href="https://wa.me/5500000000000?text=Quero%20saber%20mais%20sobre%20o%20CLINIQ"
              target="_blank"
              rel="noopener"
              className="btn btn-link-light btn-lg"
              style={{ color: '#fff' }}
            >
              <Icon name="message-circle" size={18} />
              Falar com especialista no WhatsApp
            </a>
          </div>

          <div style={ctaStyles.ps}>
            <div style={ctaStyles.psRow}>
              <span style={ctaStyles.psLabel}>PS.</span>
              <span>
                Cada semana sem sistema é mais uma semana perdendo lead que não fechou, cliente que não voltou e avaliação que não chegou ao Google. O setup demora 14 dias. Quanto antes começar, antes o resultado aparece.
              </span>
            </div>
            <div style={ctaStyles.psRow}>
              <span style={ctaStyles.psLabel}>PSS.</span>
              <span>
                As vagas de onboarding prioritário do mês são limitadas. Se a sua ainda está aberta, não espere o seu concorrente fechar primeiro.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.CtaFinal = CtaFinal;
