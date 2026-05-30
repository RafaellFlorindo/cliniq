/* global React, Icon, Reveal, FlowEyebrow */

const STACK = [
  { name: 'Site two-step com SEO local', value: 1200 },
  { name: 'IA de follow-up no WhatsApp', value: 800, emph: true },
  { name: 'IA listener de reagendamento', value: 800, emph: true },
  { name: 'Confirmação automática (48h/24h/2h)', value: 400 },
  { name: 'Filtro + IA respondendo avaliações', value: 700 },
  { name: 'Evento Meta CAPI server-side', value: 500 },
  { name: 'Dashboard mensal de conversão', value: 400 },
  { name: 'CRM GoHighLevel incluso', value: 500 },
];
const MONTHLY_VALUE = STACK.reduce((s, r) => s + r.value, 0); // 5300
const PRICE = 1497;
const SAVE = MONTHLY_VALUE - PRICE; // 3803
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function Offer({ onCtaClick }) {
  return (
    <section id="oferta" style={{ background: 'transparent' }}>
      <div className="container-wide">
        <Reveal style={{ maxWidth: 860, marginBottom: 'clamp(40px,5vw,60px)' }}>
          <FlowEyebrow>A oferta</FlowEyebrow>
          <h2 className="display display-xl" style={{ marginTop: 18 }}>
            Plano Crescimento. <span className="accent-underline">Tudo incluso.</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 18, color: 'var(--ink-600)', lineHeight: 1.6 }}>
            Um único plano. Tudo configurado por nós. Você opera, não constrói — e paga uma fração do que custaria montar cada peça em separado.
          </p>
        </Reveal>

        <div className="offer-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 28, alignItems: 'stretch' }}>
          {/* Stack — o que está incluso */}
          <Reveal style={{ height: '100%' }}>
            <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: 'clamp(24px,3vw,34px)', height: '100%', boxSizing: 'border-box', boxShadow: '0 30px 60px -38px rgba(11,31,51,0.28)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 18, borderBottom: '1px solid var(--line)', marginBottom: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink-900)' }}>O que está incluso</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent-text)', background: 'var(--accent-soft)', padding: '5px 11px', borderRadius: 999 }}>8 módulos</span>
              </div>
              {STACK.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: i === STACK.length - 1 ? 'none' : '1px solid var(--line-soft)' }}>
                  <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--success-bg)', color: 'var(--success)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name="check" size={13} strokeWidth={3} /></span>
                  <span style={{ flex: 1, fontSize: 15, color: r.emph ? 'var(--ink-900)' : 'var(--ink-700)', fontWeight: r.emph ? 600 : 400 }}>{r.name}</span>
                  <span className="tnum" style={{ fontSize: 13, color: 'var(--ink-400)', textDecoration: 'line-through' }}>{brl(r.value)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingTop: 18, marginTop: 6, borderTop: '2px solid var(--line)' }}>
                <span style={{ fontSize: 14, color: 'var(--ink-600)', fontWeight: 500 }}>Montado em separado custaria</span>
                <span className="tnum" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--danger)', textDecoration: 'line-through' }}>{brl(MONTHLY_VALUE)}<span style={{ fontSize: 14, color: 'var(--ink-400)', WebkitTextDecorationLine: 'none', textDecoration: 'none' }}>/mês</span></span>
              </div>
            </div>
          </Reveal>

          {/* Price panel (navy) — investimento + garantia + escassez + CTA forte */}
          <Reveal delay={120} style={{ height: '100%' }}>
            <div className="navy-panel" style={{ padding: 'clamp(26px,3vw,36px)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
              <span style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 6, background: 'rgba(77,182,172,0.16)', color: 'var(--teal-200)', border: '1px solid rgba(168,219,214,0.25)', padding: '6px 13px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>
                <Icon name="zap" size={12} /> Seu investimento
              </span>

              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>Plano Crescimento</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
                <span className="tnum" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(46px,6vw,68px)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>{brl(PRICE)}</span>
                <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>/mês</span>
                <span className="tnum" style={{ fontSize: 18, color: 'rgba(255,180,180,0.85)', textDecoration: 'line-through' }}>{brl(MONTHLY_VALUE)}</span>
              </div>

              {/* Economia (verde) */}
              <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', background: 'rgba(77,182,172,0.18)', border: '1px solid rgba(143,211,203,0.32)', borderRadius: 12, padding: '10px 14px' }}>
                <Icon name="trending-down" size={16} color="#A9E8DF" />
                <span style={{ fontSize: 13.5, color: '#fff' }}>Você economiza <strong className="tnum" style={{ color: '#A9E8DF' }}>{brl(SAVE)}/mês</strong> vs. montar peça por peça.</span>
              </div>

              <div style={{ marginTop: 16, padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 13, color: 'rgba(255,255,255,0.78)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Setup único <span style={{ opacity: 0.6 }}>(pago uma vez)</span></span>
                <span className="tnum" style={{ fontWeight: 700, color: '#fff' }}>{brl(2500)}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, margin: '20px 0' }}>
                {['Sem fidelidade. Cancele quando quiser.', 'Configuração 100% por nós (7–14 dias).', 'Suporte contínuo incluso na mensalidade.'].map((b, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}><Icon name="check" size={14} strokeWidth={2.5} color="var(--teal-200)" />{b}</span>
                ))}
              </div>

              {/* Garantia + escassez */}
              <div style={{ display: 'flex', gap: 10, marginTop: 'auto', marginBottom: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 150px', display: 'flex', alignItems: 'center', gap: 9, padding: '11px 13px', background: 'rgba(77,182,172,0.1)', border: '1px solid rgba(143,211,203,0.2)', borderRadius: 12 }}>
                  <Icon name="shield-check" size={18} color="var(--teal-200)" />
                  <span style={{ fontSize: 12, lineHeight: 1.35, color: 'rgba(255,255,255,0.85)' }}><strong style={{ color: '#fff' }}>30 dias.</strong> Não fez sentido? Devolvemos o setup.</span>
                </div>
                <div style={{ flex: '1 1 150px', display: 'flex', alignItems: 'center', gap: 9, padding: '11px 13px', background: 'rgba(201,138,43,0.14)', border: '1px solid rgba(201,138,43,0.3)', borderRadius: 12 }}>
                  <span className="offer-pulse" style={{ width: 8, height: 8, borderRadius: 99, background: '#F4B400', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, lineHeight: 1.35, color: 'rgba(255,255,255,0.85)' }}><strong style={{ color: '#F7C95B' }}>Vagas limitadas</strong> de onboarding este mês.</span>
                </div>
              </div>

              <button className="btn btn-teal btn-lg" onClick={onCtaClick} style={{ width: '100%', fontSize: 17, padding: '19px 32px' }}>
                Quero garantir minha vaga <Icon name="arrow-right" size={18} />
              </button>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginTop: 12, textAlign: 'center' }}>
                Cartão, Pix ou boleto · Sem multa rescisória · Diagnóstico gratuito, sem compromisso
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes offerPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(244,180,0,0.6);} 70% { box-shadow: 0 0 0 8px rgba(244,180,0,0);} }
        .offer-pulse { animation: offerPulse 1.6s ease-in-out infinite; }
        @media (max-width: 920px) { .offer-grid { grid-template-columns: 1fr !important; } }
        @media (prefers-reduced-motion: reduce) { .offer-pulse { animation: none !important; } }
      `}</style>
    </section>
  );
}

window.Offer = Offer;
