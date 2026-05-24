/* global React, Icon, Reveal */
const { useState } = React;

const objStyles = {
  section: { background: 'var(--surface)' },
  header: { maxWidth: 820, marginBottom: 48 },
  list: {
    maxWidth: 880,
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  item: {
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    borderRadius: 18,
    padding: '24px 28px',
    cursor: 'pointer',
    transition: 'border-color 200ms, background 200ms, box-shadow 200ms',
  },
  itemOpen: {
    borderColor: 'var(--navy-900)',
    boxShadow: '0 12px 32px rgba(15,46,74,0.12)',
  },
  itemHead: {
    display: 'flex', alignItems: 'flex-start', gap: 16,
  },
  bubble: {
    fontFamily: 'var(--font-display)',
    flexShrink: 0,
    background: 'var(--accent-soft)',
    color: 'var(--accent-text)',
    width: 36, height: 36, borderRadius: 12,
    display: 'grid', placeItems: 'center',
    fontWeight: 700, fontSize: 18,
    fontStyle: 'italic',
  },
  q: {
    flex: 1,
    fontSize: 17, fontWeight: 600,
    color: 'var(--ink-900)',
    letterSpacing: '-0.005em',
    lineHeight: 1.4,
  },
  iconBtn: {
    flexShrink: 0,
    width: 32, height: 32, borderRadius: 10,
    background: 'var(--surface)',
    color: 'var(--ink-700)',
    border: 0,
    display: 'grid', placeItems: 'center',
    cursor: 'pointer',
    transition: 'transform 220ms',
  },
  a: {
    paddingLeft: 52,
    fontSize: 15, lineHeight: 1.6,
    color: 'var(--ink-600)',
    marginTop: 14,
  },
};

const OBJECTIONS = [
  {
    q: '"Não entendo de tecnologia. Tenho medo de não conseguir usar."',
    a: <>Você não precisa entender. A gente configura <strong>tudo do zero</strong> — fluxos, IA, site, dashboard. Você recebe o sistema pronto, treinamento de uso e suporte contínuo. Sua função é atender os clientes que o sistema vai trazer.</>,
  },
  {
    q: '"É caro pra minha realidade agora."',
    a: <>Uma clínica média com 20% de no-show perde de <strong>R$ 2.000 a R$ 5.000/mês</strong> em horários vagos. O sistema custa R$ 1.497/mês. A conta fecha no primeiro mês — às vezes na primeira semana. Use a calculadora acima.</>,
  },
  {
    q: '"Já tentei automação barata e WhatsApp Business — não funcionou."',
    a: <>WhatsApp Business não tem IA. Não rastreia lead. Não reagenda. Não filtra avaliação. O que você usou antes era uma <strong>ferramenta isolada</strong> — isso aqui é um sistema integrado, do primeiro contato até a estrela no Google.</>,
  },
  {
    q: '"Não tenho controle da minha clínica. Não sei se vai resolver."',
    a: <>Esse é exatamente o problema que o sistema resolve. O dashboard mostra cada etapa — de onde o lead veio, o que fez, se agendou, se compareceu, se avaliou. <strong>Você vai ter mais controle do que qualquer planilha já deu.</strong></>,
  },
  {
    q: '"E se a tecnologia parar de funcionar?"',
    a: <>O sistema roda no <strong>GoHighLevel</strong> — plataforma usada por mais de 60.000 negócios no mundo, com uptime &gt;99,9%. Suporte está incluso na mensalidade — se algo precisa de ajuste, a gente entra.</>,
  },
  {
    q: '"Minha agenda eu mesma gerencio. Dá pra integrar?"',
    a: <>Sim. O calendário do sistema se encaixa na sua rotina — você define horários, bloqueios e regras. <strong>A IA trabalha dentro da sua agenda</strong>, não no lugar dela.</>,
  },
];

function Objections() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section style={objStyles.section}>
      <div className="container-wide">
        <Reveal style={objStyles.header}>
          <span className="eyebrow">Antes de você perguntar</span>
          <h2 className="display display-xl" style={{ marginTop: 12 }}>
            "Mas e <span className="accent-underline">se acontecer</span>...?"
          </h2>
          <p style={{ marginTop: 18, fontSize: 18, color: 'var(--ink-600)' }}>
            As perguntas que todas as donas de clínica fazem antes de fechar. Respondidas direto.
          </p>
        </Reveal>

        <div style={objStyles.list}>
          {OBJECTIONS.map((o, i) => {
            const open = i === openIdx;
            return (
              <Reveal key={i} delay={i * 40}>
                <div
                  style={{ ...objStyles.item, ...(open ? objStyles.itemOpen : {}) }}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  role="button"
                  aria-expanded={open}
                >
                  <div style={objStyles.itemHead}>
                    <span style={objStyles.bubble}>"</span>
                    <div style={objStyles.q}>{o.q}</div>
                    <span style={{ ...objStyles.iconBtn, transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>
                      <Icon name="plus" size={16} />
                    </span>
                  </div>
                  {open && <div style={objStyles.a}>{o.a}</div>}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.Objections = Objections;
