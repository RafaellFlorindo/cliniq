/* global React, Icon, Reveal */

const offerStyles = {
  section: { background: 'var(--surface)' },
  header: { maxWidth: 820, marginBottom: 56 },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: 32,
    alignItems: 'stretch',
  },
  stack: {
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    borderRadius: 24,
    padding: 32,
    display: 'flex', flexDirection: 'column',
  },
  stackHead: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    paddingBottom: 20,
    borderBottom: '1px solid var(--line)',
    marginBottom: 8,
  },
  stackTitle: { fontSize: 17, fontWeight: 600, color: 'var(--ink-900)', letterSpacing: '-0.01em' },
  stackTag: {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
    color: 'var(--accent-text)',
    background: 'var(--accent-soft)',
    padding: '4px 10px', borderRadius: 999,
  },
  row: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '14px 0',
    borderBottom: '1px solid var(--line-soft)',
  },
  rowLast: { borderBottom: 'none' },
  rowCheck: {
    width: 22, height: 22, borderRadius: 999,
    background: 'var(--success-bg)', color: 'var(--success)',
    display: 'grid', placeItems: 'center', flexShrink: 0,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15, color: 'var(--ink-700)',
  },
  rowEmph: { color: 'var(--ink-900)', fontWeight: 600 },
  rowPrice: {
    fontSize: 13, color: 'var(--ink-400)',
    textDecoration: 'line-through',
    fontFeatureSettings: '"tnum"',
  },
  totalRow: {
    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
    paddingTop: 18, marginTop: 8,
    borderTop: '2px solid var(--line)',
  },
  totalLabel: { fontSize: 14, color: 'var(--ink-500)', fontWeight: 500 },
  totalValue: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700, fontSize: 28,
    color: 'var(--ink-400)',
    textDecoration: 'line-through',
    fontFeatureSettings: '"tnum"',
  },

  priceCard: {
    background: 'var(--navy-900)',
    color: '#fff',
    borderRadius: 24,
    padding: 32,
    display: 'flex', flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  priceDecor: {
    position: 'absolute', top: -80, right: -80,
    width: 280, height: 280, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(77,182,172,0.18), transparent 70%)',
    pointerEvents: 'none',
  },
  priceTag: {
    display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 6,
    background: 'rgba(77,182,172,0.16)',
    color: 'var(--teal-200)',
    border: '1px solid rgba(168,219,214,0.20)',
    padding: '6px 12px', borderRadius: 999,
    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
    marginBottom: 20,
  },
  planName: {
    fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8,
  },
  bigPrice: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(48px, 6vw, 72px)',
    fontWeight: 700, letterSpacing: '-0.03em',
    color: '#fff',
    fontFeatureSettings: '"tnum"',
    lineHeight: 1,
    display: 'flex', alignItems: 'baseline', gap: 8,
  },
  priceUnit: {
    fontSize: 16, fontWeight: 500,
    color: 'rgba(255,255,255,0.5)',
  },
  setupRow: {
    marginTop: 16, padding: '14px 18px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 14,
    fontSize: 13, color: 'rgba(255,255,255,0.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  setupAmount: {
    fontWeight: 700, color: '#fff',
    fontFeatureSettings: '"tnum"',
  },
  bullets: {
    display: 'flex', flexDirection: 'column', gap: 10,
    margin: '24px 0',
  },
  bullet: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 13, color: 'rgba(255,255,255,0.85)',
  },
  fineprint: {
    fontSize: 12, color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.5, marginTop: 4,
  },
};

const STACK = [
  { name: 'Site two-step com SEO local',          value: 1200 },
  { name: 'IA de follow-up no WhatsApp',           value: 800, emph: true },
  { name: 'IA listener de reagendamento',          value: 800, emph: true },
  { name: 'Confirmação automática (48h/24h/2h)',   value: 400 },
  { name: 'Filtro de avaliação Google',            value: 600 },
  { name: 'IA respondendo avaliações',             value: 600 },
  { name: 'Evento Meta CAPI server-side',          value: 500 },
  { name: 'Dashboard mensal de conversão',         value: 400 },
  { name: 'Onboarding & configuração completa',    value: 2500 },
];
const TOTAL_VALUE = STACK.reduce((s, r) => s + r.value, 0);
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function Offer({ onCtaClick }) {
  return (
    <section id="oferta" style={offerStyles.section}>
      <div className="container-wide">
        <Reveal style={offerStyles.header}>
          <span className="eyebrow">A oferta</span>
          <h2 className="display display-xl" style={{ marginTop: 12 }}>
            Plano Crescimento. <span className="accent-underline">Tudo incluso.</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 18, color: 'var(--ink-600)' }}>
            Um único plano. Tudo configurado por nós. Você opera — não constrói.
          </p>
        </Reveal>

        <div style={offerStyles.grid} className="offer-grid">
          <Reveal>
            <div style={offerStyles.stack}>
              <div style={offerStyles.stackHead}>
                <span style={offerStyles.stackTitle}>O que está incluso</span>
                <span style={offerStyles.stackTag}>9 módulos</span>
              </div>
              {STACK.map((r, i) => (
                <div key={i} style={{...offerStyles.row, ...(i===STACK.length-1?offerStyles.rowLast:{})}}>
                  <span style={offerStyles.rowCheck}>
                    <Icon name="check" size={14} strokeWidth={2.5} />
                  </span>
                  <span style={{...offerStyles.rowLabel, ...(r.emph ? offerStyles.rowEmph : {})}}>{r.name}</span>
                  <span style={offerStyles.rowPrice}>{brl(r.value)}</span>
                </div>
              ))}
              <div style={offerStyles.totalRow}>
                <span style={offerStyles.totalLabel}>Valor total se contratado em separado</span>
                <span style={offerStyles.totalValue} className="tnum">{brl(TOTAL_VALUE)}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={offerStyles.priceCard}>
              <div style={offerStyles.priceDecor} />
              <span style={offerStyles.priceTag}>
                <Icon name="zap" size={12} />
                Seu investimento
              </span>
              <div style={offerStyles.planName}>Plano Crescimento</div>
              <div style={offerStyles.bigPrice}>
                <span>R$ 1.497</span>
                <span style={offerStyles.priceUnit}>/mês</span>
              </div>

              <div style={offerStyles.setupRow}>
                <span>Setup único <span style={{opacity:0.6}}>(pago uma vez)</span></span>
                <span style={offerStyles.setupAmount}>R$ 2.500</span>
              </div>

              <div style={offerStyles.bullets}>
                <span style={offerStyles.bullets.bullet || offerStyles.bullet}>
                  <Icon name="check" size={14} strokeWidth={2.5} color="var(--teal-200)" />
                  Sem fidelidade. Cancele quando quiser.
                </span>
                <span style={offerStyles.bullet}>
                  <Icon name="check" size={14} strokeWidth={2.5} color="var(--teal-200)" />
                  Configuração completa por nós (7–14 dias).
                </span>
                <span style={offerStyles.bullet}>
                  <Icon name="check" size={14} strokeWidth={2.5} color="var(--teal-200)" />
                  Suporte contínuo na mensalidade.
                </span>
                <span style={offerStyles.bullet}>
                  <Icon name="check" size={14} strokeWidth={2.5} color="var(--teal-200)" />
                  GoHighLevel incluso (sem plataforma extra).
                </span>
              </div>

              <button className="btn btn-onnavy btn-lg" onClick={onCtaClick} style={{ width: '100%' }}>
                Quero o diagnóstico gratuito
                <Icon name="arrow-right" size={18} />
              </button>

              <p style={offerStyles.fineprint}>
                Cartão, Pix ou boleto. Mensalidade recorrente sem multa rescisória. 30 dias de garantia.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          .offer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.Offer = Offer;
