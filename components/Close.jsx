/* global React, Icon, Reveal, FlowEyebrow */
const { useState } = React;

/* ─── FAQ única (funde Objections + Faq) ─────────────────────────────────── */
const FAQS = [
  { q: 'Não entendo de tecnologia. Vou conseguir usar?', a: <>Você não precisa entender. A gente configura <strong>tudo do zero</strong>: fluxos, IA, site e dashboard. Você recebe pronto, com treinamento e suporte contínuo. Sua função é atender os clientes que o sistema traz.</> },
  { q: 'É caro pra minha realidade agora.', a: <>Uma clínica média com 20% de no-show perde de <strong>R$ 2.000 a R$ 5.000/mês</strong> em horários vagos. O sistema custa R$ 1.497/mês e a conta fecha no primeiro mês — às vezes na primeira semana. Use a calculadora lá em cima.</> },
  { q: 'Quanto tempo até estar tudo funcionando?', a: <>Em média <strong>7 a 14 dias</strong> após o onboarding. A configuração é nossa; você não faz nada técnico. Recebe o sistema pronto e o treinamento de uso.</> },
  { q: 'Preciso já ter site ou começo do zero?', a: <>Pode começar do zero. O site two-step <strong>já está incluso</strong> — criamos e otimizamos pra sua cidade, com SEO local e formulário integrado à agenda.</> },
  { q: 'Já tentei automação barata e WhatsApp Business. Não funcionou.', a: <>WhatsApp Business não tem IA, não rastreia lead, não reagenda e não filtra avaliação. Aquilo era uma <strong>ferramenta isolada</strong>. Isso aqui é um sistema integrado, do primeiro contato à estrela no Google.</> },
  { q: 'E se eu não gostar?', a: <>Você tem <strong>30 dias de garantia</strong>. Se não fizer sentido pra sua clínica, devolvemos o setup integral. Sem burocracia, sem letra miúda.</> },
  { q: 'Preciso contratar outra ferramenta além desse plano?', a: <>Não. Tudo roda dentro do GoHighLevel, <strong>já incluso</strong>. Você não contrata plataforma separada, ferramenta de e-mail nem agendador externo.</> },
  { q: 'Tem suporte depois que o sistema estiver rodando?', a: <>Sim. Dúvidas operacionais, ajustes de texto nos fluxos e atualização dos prompts da IA estão <strong>inclusos na mensalidade</strong>.</> },
];

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderRadius: 16, border: '1px solid', borderColor: open ? 'var(--navy-900)' : 'var(--line)', background: open ? 'var(--paper)' : 'var(--paper-2)', boxShadow: open ? '0 18px 40px -26px rgba(11,31,51,0.4)' : 'none', transition: 'border-color 200ms, box-shadow 200ms, background 200ms', overflow: 'hidden' }}>
      <button onClick={onToggle} aria-expanded={open} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 22px', background: 'none', border: 0, cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink-900)', letterSpacing: '-0.005em', lineHeight: 1.4 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 999, background: open ? 'var(--navy-900)' : 'var(--surface)', color: open ? '#fff' : 'var(--ink-700)', display: 'grid', placeItems: 'center', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 220ms, background 220ms' }}><Icon name="plus" size={15} /></span>
      </button>
      <div style={{ maxHeight: open ? 320 : 0, opacity: open ? 1 : 0, overflow: 'hidden', transition: 'max-height 320ms var(--ease-out), opacity 260ms, padding 260ms', padding: open ? '0 22px 20px' : '0 22px' }}>
        <div style={{ fontSize: 15, lineHeight: 1.62, color: 'var(--ink-600)' }}>{a}</div>
      </div>
    </div>
  );
}

function Close({ onCtaClick }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" style={{ background: 'transparent' }}>
      <div className="container-wide">
        {/* FAQ */}
        <div className="close-faq" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 'clamp(36px,5vw,64px)', alignItems: 'start', marginBottom: 'clamp(56px,8vw,96px)' }}>
          <Reveal style={{ position: 'sticky', top: 100 }}>
            <FlowEyebrow>Antes de fechar</FlowEyebrow>
            <h2 className="display display-lg" style={{ marginTop: 18 }}>
              As perguntas que <span className="accent-underline">toda dona de clínica faz.</span>
            </h2>
            <p style={{ marginTop: 18, fontSize: 16, color: 'var(--ink-600)', lineHeight: 1.6, maxWidth: 380 }}>
              Respondidas direto, sem rodeio. Ainda com dúvida? Fale com um especialista no WhatsApp.
            </p>
            <a href="https://wa.me/5500000000000?text=Tenho%20uma%20d%C3%BAvida%20sobre%20a%20CliniQ" target="_blank" rel="noopener" className="btn btn-secondary" style={{ marginTop: 22 }}>
              <Icon name="message-circle" size={16} /> Falar no WhatsApp
            </a>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FAQS.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
              ))}
            </div>
          </Reveal>
        </div>

        {/* CTA final — painel navy, o fechamento */}
        <Reveal>
          <div className="navy-panel" style={{ padding: 'clamp(40px,6vw,80px) clamp(28px,5vw,72px)', textAlign: 'center' }}>
            <FlowEyebrow onNavy style={{ justifyContent: 'center' }}>Agora é hora</FlowEyebrow>
            <h2 className="display" style={{ color: '#fff', fontSize: 'clamp(34px,5.2vw,68px)', lineHeight: 1.02, marginTop: 18, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
              Sua concorrente vai automatizar.<br />A questão é se <span style={{ color: 'var(--teal-300)', fontStyle: 'italic' }}>você chega primeiro.</span>
            </h2>
            <p style={{ marginTop: 22, fontSize: 18, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, maxWidth: 660, marginLeft: 'auto', marginRight: 'auto' }}>
              O sistema está pronto. A configuração é nossa. O risco é zero nos primeiros 30 dias. Comece pelo diagnóstico — 4 perguntas, 90 segundos.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginTop: 34 }}>
              <MagneticButton strength={0.35}>
                <button className="btn btn-teal btn-lg" onClick={onCtaClick} style={{ fontSize: 17, padding: '20px 36px' }}>
                  Fazer o diagnóstico gratuito <Icon name="arrow-right" size={18} />
                </button>
              </MagneticButton>
              <a href="https://wa.me/5500000000000?text=Quero%20saber%20mais%20sobre%20a%20CliniQ" target="_blank" rel="noopener" className="btn btn-link-light btn-lg" style={{ color: '#fff' }}>
                <Icon name="message-circle" size={18} /> Falar com especialista
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 48, textAlign: 'left', maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }} className="close-ps">
              {[
                ['PS.', 'Cada semana sem sistema é lead que não fechou, cliente que não voltou e avaliação que não chegou ao Google. O setup leva 14 dias — quanto antes começar, antes o resultado aparece.'],
                ['PSS.', 'As vagas de onboarding prioritário do mês são limitadas. Se a sua ainda está aberta, não espere o concorrente fechar primeiro.'],
              ].map(([l, t], i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '18px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16 }}>
                  <span style={{ flexShrink: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--teal-200)', letterSpacing: '0.04em' }}>{l}</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.55 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .close-faq { grid-template-columns: 1fr !important; }
          .close-faq > div:first-child { position: static !important; }
          .close-ps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.Close = Close;
