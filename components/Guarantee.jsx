/* global React, Icon, Reveal */

const gtStyles = {
  section: { background: 'var(--paper)' },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 20,
  },
  guaranteeCard: {
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 24,
    padding: 40,
    display: 'flex',
    gap: 28,
    alignItems: 'flex-start',
  },
  shield: {
    flexShrink: 0,
    width: 80, height: 80, borderRadius: 20,
    background: 'var(--accent-soft)',
    color: 'var(--accent-text)',
    display: 'grid', placeItems: 'center',
  },
  gTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 28, fontWeight: 700,
    color: 'var(--ink-900)',
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    margin: 0,
  },
  gText: {
    marginTop: 12, fontSize: 16, lineHeight: 1.55,
    color: 'var(--ink-600)',
  },
  gFoot: {
    marginTop: 16,
    fontSize: 13, color: 'var(--ink-500)',
    fontStyle: 'italic',
  },

  scarcityCard: {
    background: 'var(--navy-900)',
    color: '#fff',
    border: '1px solid var(--navy-900)',
    borderRadius: 24,
    padding: 32,
    display: 'flex', flexDirection: 'column', gap: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  scarcityDecor: {
    position: 'absolute', bottom: -40, right: -40,
    width: 220, height: 220, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(77,182,172,0.20), transparent 70%)',
  },
  pulseDot: {
    width: 8, height: 8, borderRadius: 999,
    background: 'var(--accent)',
    animation: 'scarcityPulse 1.6s ease-in-out infinite',
    flexShrink: 0,
  },
  scarcityTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 22, fontWeight: 700,
    color: '#fff',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    margin: 0,
  },
  scarcityText: {
    fontSize: 14, lineHeight: 1.55,
    color: 'rgba(255,255,255,0.75)',
  },
  spots: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 12,
    fontSize: 13,
  },
  spotsNumber: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700, fontSize: 22,
    color: 'var(--teal-200)',
    fontFeatureSettings: '"tnum"',
  },
};

function Guarantee() {
  return (
    <section style={gtStyles.section}>
      <div className="container-wide">
        <div style={gtStyles.grid} className="gt-grid">
          {/* Garantia (real) */}
          <Reveal>
            <div style={gtStyles.guaranteeCard}>
              <div style={gtStyles.shield}>
                <Icon name="shield-check" size={40} strokeWidth={1.8} />
              </div>
              <div>
                <h3 style={gtStyles.gTitle}>30 dias. O risco é nosso.</h3>
                <p style={gtStyles.gText}>
                  Se nas primeiras 4 semanas o sistema não fizer sentido pra sua clínica,
                  <strong style={{ color: 'var(--ink-900)' }}> devolvemos o setup integral.</strong>{' '}
                  Sem burocracia. Sem pergunta. Sem letra miúda.
                </p>
                <p style={gtStyles.gFoot}>
                  Quem assume o risco é quem confia no produto. Esse é o nosso jeito.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Escassez suave */}
          <Reveal delay={100}>
            <div style={gtStyles.scarcityCard}>
              <div style={gtStyles.scarcityDecor} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={gtStyles.pulseDot} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--teal-200)' }}>
                  Vagas limitadas
                </span>
              </div>
              <h3 style={gtStyles.scarcityTitle}>
                Onboarding prioritário<br/>nas próximas vagas do mês.
              </h3>
              <p style={gtStyles.scarcityText}>
                Cada novo cliente entra numa janela de onboarding guiado. Pra manter a qualidade da configuração, abrimos um número limitado de slots por mês.
              </p>
              <div style={gtStyles.spots}>
                <span style={gtStyles.spotsNumber}>4</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                  vagas restantes em maio · próximas em junho
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes scarcityPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(77,182,172,0.6); }
          70% { box-shadow: 0 0 0 10px rgba(77,182,172,0); }
        }
        @media (max-width: 900px) {
          .gt-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.Guarantee = Guarantee;
