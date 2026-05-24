/* global React, Icon, Reveal */
const { useState, useMemo } = React;

const calcStyles = {
  section: {
    background: 'var(--navy-900)',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  decor: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `radial-gradient(circle at 15% 20%, rgba(77,182,172,0.10), transparent 40%),
                     radial-gradient(circle at 85% 70%, rgba(77,182,172,0.08), transparent 40%)`,
    pointerEvents: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 80,
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  header: { maxWidth: 520 },
  panel: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 8,
    padding: 28,
    backdropFilter: 'blur(8px)',
  },
  controlBlock: { marginBottom: 24 },
  controlLabel: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: 500,
    marginBottom: 10,
  },
  controlValue: {
    color: '#fff', fontWeight: 700, fontSize: 18,
    fontFeatureSettings: '"tnum"',
  },
  slider: {
    width: '100%',
    height: 6,
    background: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    appearance: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  resultBlock: {
    marginTop: 28,
    paddingTop: 28,
    borderTop: '1px solid rgba(255,255,255,0.10)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
  },
  resultLabel: {
    fontSize: 11, fontWeight: 600,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    marginBottom: 8,
  },
  resultValue: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'clamp(28px, 3vw, 40px)',
    letterSpacing: '-0.025em',
    color: '#fff',
    fontFeatureSettings: '"tnum"',
  },
  savedHighlight: {
    background: 'var(--accent-soft)',
    color: 'var(--accent-text)',
    padding: '0.06em 0.24em',
    borderRadius: '0.4em',
    display: 'inline-block',
  },
  footnote: {
    marginTop: 18, fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.5,
  },
};

function brl(n) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

function Calculator({ onCtaClick }) {
  const [clientsDay, setClientsDay] = useState(20);
  const [ticket, setTicket] = useState(220);
  const [noShow, setNoShow] = useState(25);

  const { lostMonth, recoveredMonth, withSystemMonth } = useMemo(() => {
    const workingDays = 24;
    const total = clientsDay * workingDays;
    const lost = Math.round(total * (noShow / 100) * ticket);
    // Sistema reduz no-show de X% → 6% (claim)
    const lostAfter = Math.round(total * 0.06 * ticket);
    const saved = Math.max(0, lost - lostAfter);
    return { lostMonth: lost, recoveredMonth: saved, withSystemMonth: lostAfter };
  }, [clientsDay, ticket, noShow]);

  return (
    <section style={calcStyles.section}>
      <div style={calcStyles.decor} />
      <div className="container-wide">
        <div style={calcStyles.grid} className="calc-grid">
          <Reveal style={calcStyles.header}>
            <span className="eyebrow eyebrow-onnavy">Calculadora honesta</span>
            <h2 className="display display-xl" style={{ marginTop: 12, color: '#fff', lineHeight: 1.05 }}>
              Quanto o no-show{' '}
              <span style={{ color: 'var(--teal-500)' }}>tira da sua conta</span>
              {' '}todo mês?
            </h2>
            <p style={{ marginTop: 18, fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>
              Mexa nos números do seu mês. A conta é simples: cliente que não aparece é horário pago, profissional ocioso e prejuízo direto.
            </p>
            <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
              O sistema reduz no-show para uma média de <strong style={{ color: 'var(--teal-200)' }}>6%</strong> em 60 dias com confirmações automáticas + IA listener.
            </p>
            <div style={{ marginTop: 28 }}>
              <button className="btn btn-teal btn-lg" onClick={onCtaClick}>
                Recuperar essa perda
                <Icon name="arrow-right" size={18} />
              </button>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div style={calcStyles.panel}>
              <SliderRow
                label="Atendimentos por dia"
                value={clientsDay}
                min={3} max={60} step={1}
                fmt={(v)=>`${v}`}
                onChange={setClientsDay}
              />
              <SliderRow
                label="Ticket médio"
                value={ticket}
                min={80} max={1200} step={10}
                fmt={brl}
                onChange={setTicket}
              />
              <SliderRow
                label="No-show atual"
                value={noShow}
                min={5} max={45} step={1}
                fmt={(v)=>`${v}%`}
                onChange={setNoShow}
              />

              <div style={calcStyles.resultBlock} className="calc-results">
                <div>
                  <div style={calcStyles.resultLabel}>Hoje, você perde</div>
                  <div style={{...calcStyles.resultValue, color:'#FFB4B4'}} className="tnum">{brl(lostMonth)}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>por mês com no-show de {noShow}%</div>
                </div>
                <div>
                  <div style={calcStyles.resultLabel}>Com o sistema</div>
                  <div style={calcStyles.resultValue} className="tnum">
                    <span style={{ ...calcStyles.savedHighlight, whiteSpace: 'nowrap' }}>+ {brl(recoveredMonth)}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>recuperados / mês</div>
                </div>
              </div>

              <div style={calcStyles.footnote}>
                Mensalidade do sistema: R$ 1.497/mês. Conta fecha quando você recupera só <strong style={{color:'#fff'}}>{Math.ceil(1497 / Math.max(ticket,80))} atendimento{Math.ceil(1497/Math.max(ticket,80)) > 1 ? 's' : ''}</strong> que iam virar no-show.
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .calc-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .calc-results { grid-template-columns: 1fr !important; gap: 18px !important; }
        }
        .calc-slider {
          -webkit-appearance: none; appearance: none;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px; height: 22px;
          background: var(--teal-500); border-radius: 999px;
          box-shadow: 0 0 0 6px rgba(77,182,172,0.18), 0 4px 8px rgba(0,0,0,0.3);
          cursor: pointer; border: 0;
          transition: box-shadow 140ms;
        }
        .calc-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 10px rgba(77,182,172,0.22), 0 4px 8px rgba(0,0,0,0.3);
        }
        .calc-slider::-moz-range-thumb {
          width: 22px; height: 22px;
          background: var(--teal-500); border-radius: 999px;
          border: 0; cursor: pointer;
          box-shadow: 0 0 0 6px rgba(77,182,172,0.18);
        }
      `}</style>
    </section>
  );
}

function SliderRow({ label, value, min, max, step, fmt, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={calcStyles.controlBlock}>
      <div style={calcStyles.controlLabel}>
        <span>{label}</span>
        <span style={calcStyles.controlValue}>{fmt(value)}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-slider"
        style={{
          ...calcStyles.slider,
          background: `linear-gradient(to right, var(--teal-500) 0%, var(--teal-500) ${pct}%, rgba(255,255,255,0.12) ${pct}%, rgba(255,255,255,0.12) 100%)`,
        }}
      />
    </div>
  );
}

window.Calculator = Calculator;
