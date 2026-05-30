/* global React, Icon, Reveal, FlowEyebrow */
const { useState, useMemo } = React;

/* ─── Sintomas (antiga Problem) ──────────────────────────────────────────── */
const SYMPTOMS = [
  { t: 'Você não sabe quantos leads chegaram esse mês.', s: 'Nem quantos viraram cliente. Tudo no "achismo".' },
  { t: 'Sua agenda tem buracos toda semana.',            s: 'No-show avisado em cima da hora. Horário pago, vazio.' },
  { t: 'Cliente some depois do atendimento.',            s: 'Sem um jeito sistemático de trazer de volta.' },
  { t: 'Seu Google está parado.',                        s: 'Poucas avaliações — e as que chegam, ninguém responde.' },
  { t: 'Seu site não converte (ou nem existe).',         s: 'Quem te encontra não agenda em 2 cliques.' },
  { t: 'Seu WhatsApp é uma bagunça.',                    s: 'Mensagens espalhadas, sem etiqueta, sem rastreio.' },
];

function SymptomRow({ i, t, s, last }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid', gridTemplateColumns: '26px 1fr', gap: 16,
        padding: '16px 18px',
        borderBottom: last ? 'none' : '1px solid var(--line-soft)',
        background: hov ? 'rgba(201,72,91,0.035)' : 'transparent',
        transition: 'background 180ms',
      }}
    >
      <span style={{
        width: 22, height: 22, borderRadius: 6, marginTop: 1,
        border: '1.5px solid', borderColor: hov ? 'var(--danger)' : 'rgba(201,72,91,0.45)',
        color: 'var(--danger)', background: hov ? 'var(--danger-bg)' : 'transparent',
        display: 'grid', placeItems: 'center', flexShrink: 0,
        transition: 'all 180ms',
      }}>
        <Icon name="x" size={13} strokeWidth={3} />
      </span>
      <div>
        <div style={{ fontSize: 15.5, fontWeight: 600, color: 'var(--ink-900)', letterSpacing: '-0.01em', lineHeight: 1.35 }}>{t}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-500)', lineHeight: 1.5, marginTop: 3 }}>{s}</div>
      </div>
    </div>
  );
}

function Chart() {
  return (
    <div style={{
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      borderRadius: 22,
      boxShadow: '0 30px 60px -34px rgba(11,31,51,0.30), 0 2px 6px rgba(11,31,51,0.04)',
      overflow: 'hidden',
    }}>
      {/* Cabeçalho do prontuário */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid var(--line)',
        background: 'linear-gradient(180deg, var(--paper-2), var(--paper))',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--navy-900)', color: '#fff', display: 'grid', placeItems: 'center' }}>
            <Icon name="clipboard-list" size={16} />
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-700)' }}>
            Prontuário · sua clínica hoje
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)' }}>6 sintomas</span>
      </div>

      {SYMPTOMS.map((p, i) => (
        <SymptomRow key={i} i={i} {...p} last={i === SYMPTOMS.length - 1} />
      ))}

      {/* Diagnóstico (rodapé) */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '16px 20px',
        background: 'var(--navy-900)', color: '#fff',
      }}>
        <span style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(77,182,172,0.18)', color: 'var(--teal-200)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <Icon name="stethoscope" size={15} />
        </span>
        <span style={{ fontSize: 13.5, lineHeight: 1.45, color: 'rgba(255,255,255,0.88)' }}>
          <strong style={{ color: '#fff' }}>Diagnóstico:</strong> não falta esforço — falta um <strong style={{ color: 'var(--teal-200)' }}>sistema rodando 24h</strong> por trás.
        </span>
      </div>
    </div>
  );
}

/* ─── Calculadora de custo (antiga Calculator) ───────────────────────────── */
function brl(n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }); }

function SliderRow({ label, value, min, max, step, fmt, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 14, color: 'rgba(255,255,255,0.78)', fontWeight: 500, marginBottom: 9 }}>
        <span>{label}</span>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 18, fontFeatureSettings: '"tnum"' }}>{fmt(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-slider"
        style={{
          width: '100%', height: 6, borderRadius: 999, appearance: 'none', outline: 'none', cursor: 'pointer',
          background: `linear-gradient(to right, var(--teal-500) 0%, var(--teal-500) ${pct}%, rgba(255,255,255,0.13) ${pct}%, rgba(255,255,255,0.13) 100%)`,
        }}
      />
    </div>
  );
}

function CostPanel({ onCtaClick }) {
  const [clientsDay, setClientsDay] = useState(20);
  const [ticket, setTicket] = useState(220);
  const [noShow, setNoShow] = useState(25);
  const REDUCTION = 0.30;

  const { lostMonth, recoveredMonth, breakeven } = useMemo(() => {
    const workingDays = 24;
    const total = clientsDay * workingDays;
    const lost = Math.round(total * (noShow / 100) * ticket);
    const saved = Math.round(lost * REDUCTION);
    return { lostMonth: lost, recoveredMonth: saved, breakeven: Math.ceil(1497 / Math.max(ticket, 80)) };
  }, [clientsDay, ticket, noShow]);

  return (
    <div className="navy-panel cost-panel" style={{ padding: 'clamp(28px, 4vw, 52px)' }}>
      <div className="cost-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'center' }}>
        <div>
          <FlowEyebrow onNavy>Calculadora honesta</FlowEyebrow>
          <h3 className="display" style={{ color: '#fff', fontSize: 'clamp(30px, 3.6vw, 50px)', lineHeight: 1.04, marginTop: 16 }}>
            E quanto isso<br />custa <span style={{ color: 'var(--teal-300)' }}>todo mês?</span>
          </h3>
          <p style={{ marginTop: 18, fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, maxWidth: 440 }}>
            Cliente que não aparece é horário pago, profissional ocioso e prejuízo direto. Mexa nos seus números:
          </p>

          {/* Resultado destacado */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 26 }}>
            <div style={{ flex: '1 1 180px', padding: '18px 20px', borderRadius: 16, background: 'rgba(201,72,91,0.14)', border: '1px solid rgba(255,180,180,0.22)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FFB4B4' }}>
                <Icon name="trending-down" size={14} /> Hoje você perde
              </div>
              <div className="tnum" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px,3.4vw,42px)', color: '#FFC2C2', letterSpacing: '-0.03em', marginTop: 8, lineHeight: 1 }}>{brl(lostMonth)}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 5 }}>por mês · no-show de {noShow}%</div>
            </div>
            <div style={{ flex: '1 1 180px', padding: '18px 20px', borderRadius: 16, background: 'rgba(77,182,172,0.16)', border: '1px solid rgba(143,211,203,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--teal-200)' }}>
                <Icon name="trending-up" size={14} /> A CliniQ recupera
              </div>
              <div className="tnum" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px,3.4vw,42px)', color: '#A9E8DF', letterSpacing: '-0.03em', marginTop: 8, lineHeight: 1 }}>+ {brl(recoveredMonth)}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 5 }}>recuperados / mês (~30%)</div>
            </div>
          </div>

          <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <button className="btn btn-teal btn-lg" onClick={onCtaClick}>
              Recuperar essa perda <Icon name="arrow-right" size={18} />
            </button>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', maxWidth: 260, lineHeight: 1.45 }}>
              A conta fecha recuperando só <strong style={{ color: '#fff' }}>{breakeven} atendimento{breakeven > 1 ? 's' : ''}</strong> que iam virar falta.
            </span>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 'clamp(22px, 2.4vw, 30px)', backdropFilter: 'blur(8px)' }}>
          <SliderRow label="Atendimentos por dia" value={clientsDay} min={3} max={60} step={1} fmt={(v) => `${v}`} onChange={setClientsDay} />
          <SliderRow label="Ticket médio" value={ticket} min={80} max={1200} step={10} fmt={brl} onChange={setTicket} />
          <SliderRow label="No-show atual" value={noShow} min={5} max={45} step={1} fmt={(v) => `${v}%`} onChange={setNoShow} />
          <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
            Lembretes automáticos reduzem faltas em ~30%.{' '}
            <a href="https://getweave.com/reducing-missed-appointments/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.55)', borderBottom: '1px dotted rgba(255,255,255,0.4)' }}>Fonte: Weave/Curogram</a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Seção ──────────────────────────────────────────────────────────────── */
function Diagnosis({ onCtaClick }) {
  return (
    <section id="problema" style={{ background: 'transparent' }}>
      <div className="container-wide">
        <div className="diag-top" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 'clamp(36px, 5vw, 72px)', alignItems: 'center', marginBottom: 'clamp(48px, 7vw, 88px)' }}>
          <Reveal>
            <FlowEyebrow>Diagnóstico honesto</FlowEyebrow>
            <h2 className="display display-xl" style={{ marginTop: 18 }}>
              Você reconhece alguma <span className="accent-underline">dessas situações?</span>
            </h2>
            <p style={{ marginTop: 20, fontSize: 18, color: 'var(--ink-600)', lineHeight: 1.6, maxWidth: 440 }}>
              Marque mentalmente cada sintoma que a sua clínica tem hoje. Quanto mais marcar, mais dinheiro está escapando todo mês.
            </p>
            <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 999, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-xs)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--danger)', letterSpacing: '-0.02em' }}>23%</span>
              <span style={{ fontSize: 13, color: 'var(--ink-600)', lineHeight: 1.35 }}>é o no-show médio em saúde — agenda furada<br />todo mês. <span style={{ color: 'var(--ink-400)' }}>Fonte: MGMA</span></span>
            </div>
          </Reveal>
          <Reveal delay={120}><Chart /></Reveal>
        </div>

        <Reveal><CostPanel onCtaClick={onCtaClick} /></Reveal>
      </div>

      <style>{`
        .calc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; background: var(--teal-500); border-radius: 999px; box-shadow: 0 0 0 6px rgba(77,182,172,0.18), 0 4px 8px rgba(0,0,0,0.3); cursor: pointer; border: 0; transition: box-shadow 140ms; }
        .calc-slider::-webkit-slider-thumb:hover { box-shadow: 0 0 0 10px rgba(77,182,172,0.22), 0 4px 8px rgba(0,0,0,0.3); }
        .calc-slider::-moz-range-thumb { width: 22px; height: 22px; background: var(--teal-500); border-radius: 999px; border: 0; cursor: pointer; box-shadow: 0 0 0 6px rgba(77,182,172,0.18); }
        @media (max-width: 900px) {
          .diag-top { grid-template-columns: 1fr !important; }
          .cost-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.Diagnosis = Diagnosis;
