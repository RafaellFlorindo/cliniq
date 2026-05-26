/* global React, Icon, Reveal */

const BENEFITS = [
  { icon: 'eye',           title: 'Visibilidade total.',         text: 'Você sabe de onde veio cada cliente e em que etapa cada lead está. Acabou o achismo.', featured: true },
  { icon: 'calendar-check',title: 'Agenda previsível.',          text: 'Confirmações automáticas reduzem no-show. Sem você ligar pra ninguém.', featured: true },
  { icon: 'message-circle',title: 'Lead que sumiu, volta.',      text: 'A IA retoma o contato no WhatsApp em segundos enquanto você atende.' },
  { icon: 'star',          title: 'Nota Google sobe.',           text: 'Só avaliação positiva vai pro Google. A negativa fica em privado pra você resolver.' },
  { icon: 'trending-up',   title: 'Buscas locais.',              text: 'Mais reviews respondidas = mais relevância no algoritmo. Sua clínica aparece mais.' },
  { icon: 'globe',         title: 'Site que vende.',             text: 'Não uma vitrine parada. Formulário de 2 passos, agenda integrada, conversão real.' },
  { icon: 'users-round',   title: 'Cresce sem contratar.',       text: 'O sistema faz o trabalho operacional. Você foca em atender, não em apagar incêndio.' },
  { icon: 'shield-check',  title: 'Conformidade LGPD.',          text: 'Consentimento, política de privacidade e tratamento de dados, tudo dentro da lei.' },
];

function BentoCard({ b, featured }) {
  const [hov, setHov] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: featured ? 'var(--navy-900)' : 'var(--paper)',
        border: featured ? 'none' : '1px solid var(--line)',
        borderRadius: 22,
        padding: featured ? '36px 32px' : '26px 24px',
        display: 'flex', flexDirection: 'column',
        gap: featured ? 20 : 14,
        height: '100%',
        position: 'relative', overflow: 'hidden',
        transition: 'transform 220ms var(--ease-out), box-shadow 220ms',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov
          ? (featured ? '0 20px 56px rgba(15,46,74,0.30)' : '0 10px 32px rgba(15,46,74,0.09)')
          : (featured ? '0 8px 32px rgba(15,46,74,0.18)' : 'none'),
      }}
    >
      {/* Radial glow for featured */}
      {featured && (
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,182,172,0.22), transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Icon */}
      <span style={{
        width: featured ? 52 : 44, height: featured ? 52 : 44,
        borderRadius: featured ? 16 : 12,
        background: featured ? 'rgba(77,182,172,0.16)' : 'var(--accent-soft)',
        color: featured ? 'var(--teal-300, #81d8d0)' : 'var(--accent-text)',
        display: 'grid', placeItems: 'center',
        flexShrink: 0,
        position: 'relative', zIndex: 1,
      }}>
        <Icon name={b.icon} size={featured ? 24 : 20} />
      </span>

      {/* Text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: featured ? 21 : 16, fontWeight: 700,
          color: featured ? '#fff' : 'var(--ink-900)',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          marginBottom: featured ? 10 : 8,
          fontFamily: 'var(--font-display)',
        }}>
          {b.title}
        </div>
        <div style={{
          fontSize: featured ? 15 : 13.5,
          color: featured ? 'rgba(255,255,255,0.68)' : 'var(--ink-500)',
          lineHeight: 1.6,
        }}>
          {b.text}
        </div>
      </div>
    </div>
  );
}

function Benefits() {
  const featured = BENEFITS.filter(b => b.featured);
  const rest     = BENEFITS.filter(b => !b.featured);

  return (
    <section style={{ background: 'var(--surface)' }}>
      <div className="container-wide">
        <Reveal style={{ maxWidth: 820, marginBottom: 56 }}>
          <span className="eyebrow">O que você ganha</span>
          <h2 className="display display-xl" style={{ marginTop: 12 }}>
            Controle, previsibilidade e <span className="accent-underline">reputação</span> sem esforço operacional.
          </h2>
        </Reveal>

        {/* Featured row — 2 large cards */}
        <div className="benefits-featured" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 16,
        }}>
          {featured.map((b, i) => (
            <Reveal key={i} delay={i * 80}>
              <BentoCard b={b} featured />
            </Reveal>
          ))}
        </div>

        {/* Small grid — 6 cards */}
        <div className="benefits-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {rest.map((b, i) => (
            <Reveal key={i} delay={80 + i * 50}>
              <BentoCard b={b} />
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .benefits-featured { grid-template-columns: 1fr !important; }
          .benefits-grid     { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .benefits-grid     { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.Benefits = Benefits;
