/* global React, Icon, Reveal */

const proofStyles = {
  section: { background: 'var(--paper)' },
  header: { maxWidth: 820, marginBottom: 56 },

  statBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 0,
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 56,
  },
  statCell: {
    padding: '32px 24px',
    borderRight: '1px solid var(--line)',
    display: 'flex', flexDirection: 'column', gap: 8,
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(36px, 4vw, 56px)',
    fontWeight: 700,
    color: 'var(--ink-900)',
    letterSpacing: '-0.025em',
    fontFeatureSettings: '"tnum"',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 13, color: 'var(--ink-500)', lineHeight: 1.4,
  },
  ghlBar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 14,
    padding: '14px 22px',
    marginBottom: 64,
    gap: 16,
    flexWrap: 'wrap',
  },

  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
  },
  card: {
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    borderRadius: 20,
    padding: 28,
    display: 'flex', flexDirection: 'column', gap: 16,
  },
  cardHead: {
    display: 'flex', alignItems: 'center', gap: 12,
  },
  cardAva: {
    width: 44, height: 44, borderRadius: 999,
    display: 'grid', placeItems: 'center',
    fontWeight: 600, color: '#fff', fontSize: 16,
  },
  cardName: { fontSize: 14, fontWeight: 600, color: 'var(--ink-900)' },
  cardSub: { fontSize: 12, color: 'var(--ink-500)' },
  quote: {
    fontSize: 15, lineHeight: 1.55,
    color: 'var(--ink-700)',
  },
  highlight: {
    background: 'var(--accent-soft)',
    color: 'var(--accent-text)',
    padding: '0.05em 0.3em',
    borderRadius: '0.3em',
    fontWeight: 600,
  },
  numberStrip: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 11, color: 'var(--ink-500)',
    paddingTop: 12,
    borderTop: '1px solid var(--line)',
  },
  exampleTag: {
    position: 'absolute', top: 12, right: 12,
    fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
    color: 'var(--ink-400)',
    background: 'var(--surface)',
    padding: '4px 8px',
    borderRadius: 999,
  },
};

const TESTIMONIALS = [
  {
    avaColor: '#E08B7E', initial: 'R',
    name: 'Renata Albuquerque', sub: 'Bella Vita Estética · Campinas',
    quote: ['Em 60 dias, ', { hl: 'no-show caiu de 30% pra 5%' }, '. Pela primeira vez minha agenda fecha previsível — e eu não precisei contratar mais ninguém.'],
    metric: 'No-show: 30% → 5% · 60 dias',
  },
  {
    avaColor: '#7E9AE0', initial: 'J',
    name: 'Júlia Mendonça', sub: 'Estúdio Pristín · Belo Horizonte',
    quote: ['Saímos de ', { hl: '12 para 47 avaliações 5★ no Google em 3 meses' }, '. Hoje aparece gente que nunca tinha ouvido falar da clínica.'],
    metric: 'Reviews Google: 12 → 47 · 3 meses',
  },
  {
    avaColor: '#7AB89A', initial: 'C',
    name: 'Carolina Vieira', sub: 'Aura Clinic · Curitiba',
    quote: ['Pela primeira vez eu ', { hl: 'sei quantos leads entram e quantos fecham' }, '. Pareço dona de empresa, não recepcionista de mim mesma.'],
    metric: 'Conversão lead→cliente: 18% → 41%',
  },
];

function Proof() {
  return (
    <section style={proofStyles.section}>
      <div className="container-wide">
        <Reveal style={proofStyles.header}>
          <span className="eyebrow">Prova</span>
          <h2 className="display display-xl" style={{ marginTop: 12 }}>
            Clínicas que pararam de <span className="accent-underline">apagar incêndio.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div style={proofStyles.statBar} className="stat-bar">
            <div style={proofStyles.statCell}>
              <span style={proofStyles.statValue}>60k+</span>
              <span style={proofStyles.statLabel}>negócios no mundo usam GoHighLevel</span>
            </div>
            <div style={proofStyles.statCell}>
              <span style={proofStyles.statValue}>−80%</span>
              <span style={proofStyles.statLabel}>de no-show em média nas clínicas pilotos</span>
            </div>
            <div style={proofStyles.statCell}>
              <span style={proofStyles.statValue}>3,2×</span>
              <span style={proofStyles.statLabel}>mais avaliações 5★ no Google em 90 dias</span>
            </div>
            <div style={{ ...proofStyles.statCell, borderRight: 'none' }}>
              <span style={proofStyles.statValue}>7–14d</span>
              <span style={proofStyles.statLabel}>pra tudo estar rodando após o onboarding</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={proofStyles.ghlBar}>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <span style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'var(--navy-900)', color: '#fff',
                display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14,
              }}>GHL</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)' }}>
                  Construído sobre GoHighLevel
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>
                  Plataforma global de automação. Você não contrata nada à parte.
                </div>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--ink-500)' }}>
              <Icon name="shield-check" size={14} color="var(--success)" />
              Uptime &gt; 99,9%
              <span style={{ margin: '0 6px', opacity: 0.3 }}>·</span>
              <Icon name="lock" size={14} color="var(--success)" />
              LGPD compliant
            </div>
          </div>
        </Reveal>

        <div style={proofStyles.testimonialsGrid} className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ ...proofStyles.card, position: 'relative' }}>
                <span style={proofStyles.exampleTag}>Exemplo</span>
                <div style={proofStyles.cardHead}>
                  <span style={{ ...proofStyles.cardAva, background: t.avaColor }}>{t.initial}</span>
                  <div>
                    <div style={proofStyles.cardName}>{t.name}</div>
                    <div style={proofStyles.cardSub}>{t.sub}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 2, color: '#F5B400', fontSize: 14 }}>
                  ★★★★★
                </div>
                <div style={proofStyles.quote}>
                  "{t.quote.map((p, j) => typeof p === 'string'
                    ? <span key={j}>{p}</span>
                    : <span key={j} style={proofStyles.highlight}>{p.hl}</span>)}"
                </div>
                <div style={proofStyles.numberStrip}>
                  <Icon name="trending-up" size={14} color="var(--success)" />
                  <strong style={{ color: 'var(--ink-700)' }}>{t.metric}</strong>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p style={{ marginTop: 24, fontSize: 12, color: 'var(--ink-400)', textAlign: 'center' }}>
          Casos ilustrativos. Resultados variam por cidade, ticket e mix de procedimentos.
        </p>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .stat-bar { grid-template-columns: 1fr 1fr !important; }
          .stat-bar > div:nth-child(2) { border-right: none !important; }
          .stat-bar > div { border-bottom: 1px solid var(--line); }
          .stat-bar > div:nth-last-child(-n+2) { border-bottom: none; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.Proof = Proof;
