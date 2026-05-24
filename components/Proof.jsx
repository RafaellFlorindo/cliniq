/* global React, Icon, Reveal, GlowCard */

const proofStyles = {
  section: { background: 'var(--paper)' },
  header: { maxWidth: 820, marginBottom: 56 },

  statBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 0,
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 56,
  },
  statCell: {
    padding: '32px 24px',
    borderRight: '1px solid var(--line)',
    display: 'flex', flexDirection: 'column', gap: 8,
    transition: 'background 200ms',
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(36px, 4vw, 56px)',
    fontWeight: 700,
    color: 'var(--ink-900)',
    letterSpacing: '-0.025em',
    fontFeatureSettings: '"tnum"',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 13, color: 'var(--ink-500)', lineHeight: 1.4,
  },
  ghlBar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 6,
    padding: '14px 22px',
    marginBottom: 64,
    gap: 16,
    flexWrap: 'wrap',
  },
};

const ALL_TESTIMONIALS = [
  {
    name: 'Marina Costa',
    role: 'Clínica Beleza Viva · São Paulo, SP',
    image: 'https://randomuser.me/api/portraits/women/11.jpg',
    text: 'Em 45 dias a agenda ficou 100% preenchível. A IA responde no WhatsApp em segundos e nunca mais perdi um lead por demora no retorno.',
    metric: 'Conversão lead→cliente: 19% → 54%',
  },
  {
    name: 'Fernanda Oliveira',
    role: 'Espaço Pristine · Rio de Janeiro, RJ',
    image: 'https://randomuser.me/api/portraits/women/21.jpg',
    text: 'O no-show era meu maior pesadelo — perdia quase R$8 mil por mês. Hoje está em 4% e os lembretes automáticos fazem todo o trabalho.',
    metric: 'No-show: 28% → 4% em 60 dias',
  },
  {
    name: 'Juliana Santos',
    role: 'Studio Lumière · Belo Horizonte, MG',
    image: 'https://randomuser.me/api/portraits/women/31.jpg',
    text: 'Saímos de 8 para 61 avaliações 5★ no Google em 3 meses. Hoje minha clínica aparece no mapa antes de qualquer concorrente da região.',
    metric: 'Google Reviews: 8 → 61 · 3 meses',
  },
  {
    name: 'Amanda Ferreira',
    role: 'Clínica Aura · Curitiba, PR',
    image: 'https://randomuser.me/api/portraits/women/41.jpg',
    text: 'O follow-up automático trouxe de volta clientes que eu achava perdidos. Recuperei 12 clientes inativos no primeiro mês sem fazer nada.',
    metric: '12 clientes inativos recuperados',
  },
  {
    name: 'Priscila Mendes',
    role: 'Arte & Estética · Porto Alegre, RS',
    image: 'https://randomuser.me/api/portraits/women/51.jpg',
    text: 'Antes passava 3 horas por dia no WhatsApp fazendo confirmações. Agora dedico esse tempo aos procedimentos. A automação é impressionante.',
    metric: '3h/dia economizadas na operação',
  },
  {
    name: 'Camila Rocha',
    role: 'Studio Glow · Florianópolis, SC',
    image: 'https://randomuser.me/api/portraits/women/61.jpg',
    text: 'Faturamento cresceu 38% em 90 dias sem contratar ninguém. O CRM me mostra exatamente de onde vem cada cliente e qual campanha converte.',
    metric: 'Faturamento: +38% em 90 dias',
  },
  {
    name: 'Beatriz Lima',
    role: 'Clínica Vitalité · Brasília, DF',
    image: 'https://randomuser.me/api/portraits/women/71.jpg',
    text: 'Qualquer lead que clica vira uma conversa automática no WhatsApp em menos de 1 minuto. A integração com site e Instagram foi perfeita.',
    metric: 'Resposta ao lead: 4h → 45 segundos',
  },
  {
    name: 'Tatiana Carvalho',
    role: 'Essência Estética · Salvador, BA',
    image: 'https://randomuser.me/api/portraits/women/81.jpg',
    text: 'Minha nota no Google foi de 3.8 para 4.9 estrelas em 4 meses. Hoje sou referência na cidade e a agenda tem lista de espera.',
    metric: 'Google: 3.8★ → 4.9★ em 4 meses',
  },
  {
    name: 'Larissa Souza',
    role: 'Clínica Renova · Fortaleza, CE',
    image: 'https://randomuser.me/api/portraits/women/91.jpg',
    text: 'Implementei em uma semana e os resultados apareceram no primeiro mês. Nunca imaginei que seria tão simples ter um sistema profissional de captação.',
    metric: 'ROI positivo no primeiro mês',
  },
];

/* ─── Single scrolling column ──────────────────────────────────────────────── */
function TestimonialsColumn({ testimonials, duration, className }) {
  /* Duplicate the list so the loop is seamless */
  const doubled = [...testimonials, ...testimonials];

  return (
    <div
      className={className || ''}
      style={{ overflow: 'hidden', flex: 1, minWidth: 0 }}
    >
      <div
        className="testimonials-track"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          animation: `scrollUp ${duration || 15}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((t, i) => (
          <GlowCard
            key={i}
            style={{
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              flexShrink: 0,
            }}
          >
            <p style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: 'var(--ink-600)',
              margin: 0,
            }}>
              "{t.text}"
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              paddingTop: 12,
              borderTop: '1px solid var(--line)',
            }}>
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{t.role}</div>
              </div>
            </div>
            {t.metric && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 600,
                color: 'var(--success)',
              }}>
                <Icon name="trending-up" size={12} color="var(--success)" />
                {t.metric}
              </div>
            )}
          </GlowCard>
        ))}
      </div>
    </div>
  );
}

/* ─── Proof section ────────────────────────────────────────────────────────── */
function Proof() {
  return (
    <section style={proofStyles.section}>
      <div className="container-wide">
        <Reveal style={proofStyles.header}>
          <span className="eyebrow">Prova</span>
          <h2 className="display display-xl" style={{ marginTop: 12 }}>
            Clínicas que pararam de <span className="accent-underline">apagar incêndio.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div style={proofStyles.statBar} className="stat-bar">
            {[
              { value: '60k+',  label: 'negócios no mundo usam GoHighLevel' },
              { value: '−80%',  label: 'de no-show em média nas clínicas piloto' },
              { value: '3,2×',  label: 'mais avaliações 5★ no Google em 90 dias' },
              { value: '7–14d', label: 'pra tudo estar rodando após o onboarding', last: true },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  ...proofStyles.statCell,
                  borderRight: s.last ? 'none' : '1px solid var(--line)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
              >
                <span style={proofStyles.statValue}>{s.value}</span>
                <span style={proofStyles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div style={proofStyles.ghlBar}>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <span style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'var(--navy-900)', color: '#fff',
                display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14,
              }}>GHL</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)' }}>
                  Construído sobre GoHighLevel
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>
                  Plataforma global de automação. Você não contrata nada à parte.
                </div>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--ink-500)' }}>
              <Icon name="shield-check" size={14} color="var(--success)" />
              Uptime &gt; 99,9%
              <span style={{ margin: '0 6px', opacity: 0.3 }}>·</span>
              <Icon name="lock" size={14} color="var(--success)" />
              LGPD compliant
            </div>
          </div>
        </Reveal>

        {/* ── Testimonials heading ── */}
        <Reveal>
          <div style={{ marginBottom: 32 }}>
            <span className="eyebrow" style={{ marginBottom: 8, display: 'block' }}>Depoimentos</span>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              fontWeight: 700,
              color: 'var(--ink-900)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              O que dizem as clínicas
            </h3>
          </div>
        </Reveal>

        {/* ── 3-column infinite scroll ── */}
        <Reveal>
          <div style={{
            display: 'flex',
            gap: 20,
            maxHeight: 680,
            overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
          }}>
            <TestimonialsColumn
              testimonials={ALL_TESTIMONIALS.slice(0, 3)}
              duration={15}
            />
            <TestimonialsColumn
              testimonials={ALL_TESTIMONIALS.slice(3, 6)}
              duration={19}
              className="tsm-hide"
            />
            <TestimonialsColumn
              testimonials={ALL_TESTIMONIALS.slice(6, 9)}
              duration={17}
              className="tmd-hide"
            />
          </div>
        </Reveal>

        <p style={{ marginTop: 24, fontSize: 12, color: 'var(--ink-400)', textAlign: 'center' }}>
          Casos ilustrativos. Resultados variam por cidade, ticket e mix de procedimentos.
        </p>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .stat-bar { grid-template-columns: 1fr 1fr !important; }
          .stat-bar > div:nth-child(2) { border-right: none !important; }
          .stat-bar > div { border-bottom: 1px solid var(--line); }
          .stat-bar > div:nth-last-child(-n+2) { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}

window.Proof = Proof;
