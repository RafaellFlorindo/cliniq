/* global React, Icon, Reveal */

const benefitsStyles = {
  section: { background: 'var(--surface)' },
  header: { maxWidth: 820, marginBottom: 56 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 16,
  },
  card: {
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    borderRadius: 20,
    padding: '28px 24px',
    display: 'flex', flexDirection: 'column', gap: 14,
    transition: 'transform 220ms, box-shadow 220ms',
  },
  iconWrap: {
    width: 44, height: 44, borderRadius: 12,
    background: 'var(--accent-soft)', color: 'var(--accent-text)',
    display: 'grid', placeItems: 'center',
  },
  title: {
    fontSize: 18, fontWeight: 600, color: 'var(--ink-900)',
    letterSpacing: '-0.01em', lineHeight: 1.3,
  },
  text: {
    fontSize: 14, color: 'var(--ink-500)', lineHeight: 1.55,
  },
  emph: { color: 'var(--ink-900)', fontWeight: 600 },
};

const BENEFITS = [
  { icon: 'eye', title: 'Visibilidade total.', text: 'Você sabe de onde veio cada cliente e em que etapa cada lead está. Acabou o "achismo".' },
  { icon: 'calendar-check', title: 'Agenda previsível.', text: 'Confirmações automáticas reduzem no-show — sem você ligar pra ninguém.' },
  { icon: 'message-circle', title: 'Lead que sumiu, volta.', text: 'A IA retoma o contato no WhatsApp em segundos enquanto você está atendendo.' },
  { icon: 'star', title: 'Nota Google sobe.', text: 'Só avaliação positiva vai pro Google. A negativa fica em privado pra você resolver.' },
  { icon: 'trending-up', title: 'Buscas locais.', text: 'Mais reviews respondidas = mais relevância no algoritmo. Sua clínica aparece mais.' },
  { icon: 'globe', title: 'Site que vende.', text: 'Não uma vitrine parada. Formulário de 2 passos, agenda integrada, conversão real.' },
  { icon: 'users-round', title: 'Cresce sem contratar.', text: 'O sistema faz o trabalho operacional. Você foca em atender, não em apagar incêndio.' },
  { icon: 'shield-check', title: 'Conformidade LGPD.', text: 'Consentimento, política de privacidade e tratamento de dados — tudo dentro da lei.' },
];

function Benefits() {
  return (
    <section style={benefitsStyles.section}>
      <div className="container-wide">
        <Reveal style={benefitsStyles.header}>
          <span className="eyebrow">O que você ganha</span>
          <h2 className="display display-xl" style={{ marginTop: 12 }}>
            Controle, previsibilidade e <span className="accent-underline">reputação</span> — sem esforço operacional.
          </h2>
        </Reveal>

        <div style={benefitsStyles.grid}>
          {BENEFITS.map((b, i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                style={benefitsStyles.card}
                onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='var(--shadow-md)';}}
                onMouseLeave={(e)=>{e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='';}}
              >
                <span style={benefitsStyles.iconWrap}>
                  <Icon name={b.icon} size={22} />
                </span>
                <div style={benefitsStyles.title}>{b.title}</div>
                <div style={benefitsStyles.text}>{b.text}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Benefits = Benefits;
