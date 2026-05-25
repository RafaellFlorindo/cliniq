/* global React, Container, Icon, Reveal, Eyebrow */

const problemStyles = {
  section: {
    background: 'var(--surface)',
    borderRadius: '28px 28px 0 0',
    boxShadow: '0 -32px 80px rgba(15,46,74,0.09)',
    position: 'relative',
    zIndex: 3,
    marginTop: -28,
  },
  header: { maxWidth: 820, marginBottom: 64 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    alignItems: 'stretch',
  },
  item: {
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    borderRadius: 20,
    padding: '24px 24px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    height: '100%',
    transition: 'transform 220ms var(--ease-out), box-shadow 220ms var(--ease-out)',
  },
  itemIconWrap: {
    width: 44, height: 44,
    borderRadius: 12,
    background: 'var(--danger-bg)',
    color: 'var(--danger)',
    display: 'grid', placeItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 17, fontWeight: 600,
    color: 'var(--ink-900)',
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  itemText: {
    fontSize: 14,
    color: 'var(--ink-500)',
    lineHeight: 1.5,
  },
  footnote: {
    margin: '40px auto 0',
    padding: '20px 28px',
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    borderLeft: '4px solid var(--accent)',
    borderRadius: 14,
    fontSize: 15,
    color: 'var(--ink-700)',
    lineHeight: 1.5,
    textAlign: 'center',
  },
};

const PAINS = [
  { icon: 'eye-off',      title: 'Você não sabe quantos leads chegaram esse mês.',           sub: 'Nem quantos viraram cliente. Tudo no "achismo".' },
  { icon: 'calendar-x',   title: 'Sua agenda tem buracos toda semana.',                       sub: 'No-show avisado em cima da hora, horário vago, prejuízo na conta.' },
  { icon: 'message-circle-off', title: 'Cliente some depois do atendimento.',                 sub: 'Você não tem como trazer de volta de forma sistemática.' },
  { icon: 'star-off',     title: 'Seu Google está parado.',                                    sub: 'Poucas avaliações. As que chegam, ninguém responde.' },
  { icon: 'globe',        title: 'Seu site não converte, ou nem existe.',                    sub: 'Quem te encontra não consegue agendar em 2 cliques.' },
  { icon: 'messages-square', title: 'Seu WhatsApp é uma bagunça.',                            sub: 'Mensagens espalhadas, sem etiqueta, sem rastreio.' },
];

function Problem() {
  return (
    <section id="problema" style={problemStyles.section}>
      <div className="container-wide">
        <Reveal style={problemStyles.header}>
          <span className="eyebrow">Diagnóstico honesto</span>
          <h2 className="display display-xl" style={{ marginTop: 12 }}>
            Você reconhece alguma <span className="accent-underline">dessas situações?</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 18, color: 'var(--ink-600)', maxWidth: 720 }}>
            Não é falta de esforço. É falta de um sistema que trabalhe por você enquanto você atende.
            Se se identificou com pelo menos uma, sua clínica está deixando dinheiro na mesa todo dia.
          </p>
        </Reveal>

        <div style={problemStyles.grid} className="pain-grid">
          {PAINS.map((p, i) => (
            <Reveal key={i} delay={i * 60} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={problemStyles.item}
                onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
                onMouseLeave={(e)=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
              >
                <span style={problemStyles.itemIconWrap}>
                  <Icon name={p.icon} size={22} />
                </span>
                <div style={problemStyles.itemTitle}>{p.title}</div>
                <div style={problemStyles.itemText}>{p.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={problemStyles.footnote}>
            <strong style={{ color: 'var(--ink-900)' }}>A causa é a mesma:</strong>{' '}
            sua clínica tem esforço, tem vontade, mas não tem um <strong style={{color:'var(--ink-900)'}}>sistema</strong> rodando 24h.
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 900px) {
          #problema .pain-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          #problema .pain-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.Problem = Problem;
