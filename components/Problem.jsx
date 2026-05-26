/* global React, Icon, Reveal */

const PAINS = [
  { icon: 'eye-off',            title: 'Você não sabe quantos leads chegaram esse mês.',    sub: 'Nem quantos viraram cliente. Tudo no "achismo".' },
  { icon: 'calendar-x',         title: 'Sua agenda tem buracos toda semana.',                sub: 'No-show avisado em cima da hora, horário vago, prejuízo na conta.' },
  { icon: 'message-circle-off', title: 'Cliente some depois do atendimento.',                sub: 'Você não tem como trazer de volta de forma sistemática.' },
  { icon: 'star-off',           title: 'Seu Google está parado.',                            sub: 'Poucas avaliações. As que chegam, ninguém responde.' },
  { icon: 'globe',              title: 'Seu site não converte, ou nem existe.',              sub: 'Quem te encontra não consegue agendar em 2 cliques.' },
  { icon: 'messages-square',    title: 'Seu WhatsApp é uma bagunça.',                        sub: 'Mensagens espalhadas, sem etiqueta, sem rastreio.' },
];

function Problem() {
  return (
    <section id="problema" style={{
      background: 'var(--surface)',
      borderRadius: '28px 28px 0 0',
      boxShadow: '0 -24px 60px rgba(15,46,74,0.07)',
      position: 'relative',
      zIndex: 3,
      marginTop: -28,
    }}>
      <div className="container-wide">
        <Reveal style={{ maxWidth: 820, marginBottom: 64 }}>
          <span className="eyebrow">Diagnóstico honesto</span>
          <h2 className="display display-xl" style={{ marginTop: 12 }}>
            Você reconhece alguma <span className="accent-underline">dessas situações?</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 18, color: 'var(--ink-600)', maxWidth: 620, lineHeight: 1.65 }}>
            Não é falta de esforço. É falta de um sistema que trabalhe por você enquanto você atende.
          </p>
        </Reveal>

        <div className="pain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {PAINS.map((p, i) => (
            <Reveal key={i} delay={i * 55} style={{ display: 'flex' }}>
              <div
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: 20,
                  padding: '28px 26px 32px',
                  display: 'flex', flexDirection: 'column', gap: 14,
                  width: '100%',
                  transition: 'transform 220ms var(--ease-out), box-shadow 220ms var(--ease-out), border-color 220ms',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(15,46,74,0.10)';
                  e.currentTarget.style.borderColor = 'rgba(15,46,74,0.14)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.06em', color: 'var(--ink-300)',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: '#FEF2F2', color: '#EF4444',
                    display: 'grid', placeItems: 'center',
                  }}>
                    <Icon name={p.icon} size={20} />
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink-900)', letterSpacing: '-0.01em', lineHeight: 1.35, marginBottom: 8 }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-500)', lineHeight: 1.55 }}>
                    {p.sub}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{
            margin: '48px auto 0', padding: '20px 32px',
            background: 'var(--paper)', border: '1px solid var(--line)',
            borderLeft: '4px solid var(--accent)', borderRadius: 14,
            fontSize: 15.5, color: 'var(--ink-700)', lineHeight: 1.6,
            textAlign: 'center', maxWidth: 740,
          }}>
            <strong style={{ color: 'var(--ink-900)' }}>A causa é a mesma:</strong>{' '}
            sua clínica tem esforço e vontade, mas não tem um{' '}
            <strong style={{ color: 'var(--ink-900)' }}>sistema</strong> rodando 24 h por trás.
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) { #problema .pain-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { #problema .pain-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

window.Problem = Problem;
