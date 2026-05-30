/* global React, Icon, Reveal, GlowCard, Stat, CountUp, IllustrativeTag, ImagePlaceholder, FlowEyebrow */

const STATS = [
  { to: 21, suffix: '×', label: 'mais chance de qualificar um lead respondendo em até 5 min', source: 'MIT / Oldroyd', href: 'https://25649.fs1.hubspotusercontent-na2.net/hub/25649/file-13535879-pdf/docs/mit_study.pdf' },
  { to: 23, suffix: '%', label: 'é o no-show médio em saúde — agenda furada todo mês', source: 'MGMA / Curogram', href: 'https://curogram.com/blog/average-patient-no-show-rate' },
  { to: 30, suffix: '%', prefix: '~', label: 'menos faltas com lembretes automáticos de confirmação', source: 'Curogram / Weave', href: 'https://getweave.com/reducing-missed-appointments/' },
  { to: 87, suffix: '%', label: 'leem avaliações do Google antes de escolher onde se tratar', source: 'BrightLocal 2024', href: 'https://www.brightlocal.com/research/local-consumer-review-survey/' },
];

const ALL_TESTIMONIALS = [
  { name: 'Marina Costa', role: 'Clínica Beleza Viva · São Paulo, SP', text: 'Em 45 dias a agenda ficou 100% preenchível. A IA responde no WhatsApp em segundos e nunca mais perdi um lead por demora no retorno.', metric: 'Conversão lead→cliente: 19% → 54%' },
  { name: 'Fernanda Oliveira', role: 'Espaço Pristine · Rio de Janeiro, RJ', text: 'O no-show era meu maior pesadelo. Perdia quase R$8 mil por mês. Hoje está em 4% e os lembretes automáticos fazem todo o trabalho.', metric: 'No-show: 28% → 4% em 60 dias' },
  { name: 'Juliana Santos', role: 'Studio Lumière · Belo Horizonte, MG', text: 'Saímos de 8 para 61 avaliações 5★ no Google em 3 meses. Hoje minha clínica aparece no mapa antes de qualquer concorrente da região.', metric: 'Google Reviews: 8 → 61 · 3 meses' },
  { name: 'Amanda Ferreira', role: 'Clínica Aura · Curitiba, PR', text: 'O follow-up automático trouxe de volta clientes que eu achava perdidos. Recuperei 12 clientes inativos no primeiro mês sem fazer nada.', metric: '12 clientes inativos recuperados' },
  { name: 'Priscila Mendes', role: 'Arte & Estética · Porto Alegre, RS', text: 'Antes passava 3 horas por dia no WhatsApp fazendo confirmações. Agora dedico esse tempo aos procedimentos. A automação é impressionante.', metric: '3h/dia economizadas na operação' },
  { name: 'Camila Rocha', role: 'Studio Glow · Florianópolis, SC', text: 'Faturamento cresceu 38% em 90 dias sem contratar ninguém. O CRM me mostra exatamente de onde vem cada cliente e qual campanha converte.', metric: 'Faturamento: +38% em 90 dias' },
  { name: 'Beatriz Lima', role: 'Clínica Vitalité · Brasília, DF', text: 'Qualquer lead que clica vira uma conversa automática no WhatsApp em menos de 1 minuto. A integração com site e Instagram foi perfeita.', metric: 'Resposta ao lead: 4h → 45 segundos' },
  { name: 'Tatiana Carvalho', role: 'Essência Estética · Salvador, BA', text: 'Minha nota no Google foi de 3.8 para 4.9 estrelas em 4 meses. Hoje sou referência na cidade e a agenda tem lista de espera.', metric: 'Google: 3.8★ → 4.9★ em 4 meses' },
  { name: 'Larissa Souza', role: 'Clínica Renova · Fortaleza, CE', text: 'Implementei em uma semana e os resultados apareceram no primeiro mês. Nunca imaginei que seria tão simples ter um sistema profissional de captação.', metric: 'ROI positivo no primeiro mês' },
];

function TestimonialsColumn({ testimonials, duration, className }) {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div className={className || ''} style={{ overflow: 'hidden', flex: 1, minWidth: 0 }}>
      <div className="testimonials-track" style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: `scrollUp ${duration || 15}s linear infinite`, willChange: 'transform' }}>
        {doubled.map((t, i) => (
          <GlowCard key={i} style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, position: 'relative' }}>
            <IllustrativeTag style={{ position: 'absolute', top: 14, right: 14 }} />
            <Icon name="quote" size={20} color="var(--teal-300)" />
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-700)', margin: 0, paddingRight: 60 }}>{t.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
              <div style={{ width: 36, height: 36, flexShrink: 0 }}><ImagePlaceholder round label={`Foto de ${t.name}`} /></div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{t.role}</div>
              </div>
            </div>
            {t.metric && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: 'var(--success)', background: 'var(--success-bg)', padding: '5px 10px', borderRadius: 999, alignSelf: 'flex-start' }}>
                <Icon name="trending-up" size={12} color="var(--success)" />{t.metric}
              </div>
            )}
          </GlowCard>
        ))}
      </div>
    </div>
  );
}

function Proof() {
  return (
    <section style={{ background: 'transparent' }}>
      <div className="container-wide">
        <Reveal style={{ maxWidth: 860, marginBottom: 40 }}>
          <FlowEyebrow>Prova de mercado</FlowEyebrow>
          <h2 className="display display-xl" style={{ marginTop: 18 }}>
            Clínicas que pararam de <span className="accent-underline">apagar incêndio.</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 16, color: 'var(--ink-500)', maxWidth: 640, lineHeight: 1.6 }}>
            Os números abaixo são <strong style={{ color: 'var(--ink-700)' }}>dados do setor, com fonte</strong> — não promessa vazia. É o tamanho do problema que a CliniQ ataca.
          </p>
        </Reveal>

        {/* Banda editorial de stats — sem cards, fios separando */}
        <Reveal>
          <div className="stat-band" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginBottom: 40 }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-cell" style={{ padding: 'clamp(22px,3vw,32px) clamp(18px,2vw,28px)', borderLeft: i === 0 ? 'none' : '1px solid var(--line)' }}>
                <div className="tnum" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px,5vw,68px)', color: 'var(--ink-900)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
                  <CountUp to={s.to} prefix={s.prefix || ''} suffix={s.suffix} duration={1400 + i * 150} />
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--ink-600)', lineHeight: 1.45, marginTop: 12, maxWidth: '26ch' }}>{s.label}</div>
                <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 10, fontSize: 11, color: 'var(--ink-400)', borderBottom: '1px dotted var(--ink-400)' }}>Fonte: {s.source}</a>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Ribbon GHL */}
        <Reveal>
          <div className="ghl-ribbon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', background: 'var(--navy-900)', borderRadius: 18, padding: '18px 26px', marginBottom: 'clamp(56px,7vw,80px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(77,182,172,0.18)', color: 'var(--teal-200)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 13 }}>GHL</span>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: '#fff' }}>Construído sobre GoHighLevel — <span style={{ color: 'var(--teal-200)' }}>+60 mil negócios</span> no mundo</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>Plataforma global de automação. Você não contrata nada à parte.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              <Icon name="shield-check" size={14} color="var(--teal-300)" /> Uptime &gt; 99,9%
              <span style={{ opacity: 0.3 }}>·</span>
              <Icon name="lock" size={14} color="var(--teal-300)" /> LGPD compliant
            </div>
          </div>
        </Reveal>

        <Reveal style={{ marginBottom: 28 }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-500)', marginBottom: 8 }}>Depoimentos</span>
          <h3 className="display" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>O que dizem as clínicas</h3>
          <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--ink-500)', maxWidth: 640, lineHeight: 1.55 }}>
            Exemplos ilustrativos do tipo de resultado que o sistema busca. Quando você tiver depoimentos reais, eles entram no lugar destes — com foto e autorização.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ display: 'flex', gap: 20, maxHeight: 660, overflow: 'hidden', maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)' }}>
            <TestimonialsColumn testimonials={ALL_TESTIMONIALS.slice(0, 3)} duration={16} />
            <TestimonialsColumn testimonials={ALL_TESTIMONIALS.slice(3, 6)} duration={20} className="tsm-hide" />
            <TestimonialsColumn testimonials={ALL_TESTIMONIALS.slice(6, 9)} duration={18} className="tmd-hide" />
          </div>
        </Reveal>

        <p style={{ marginTop: 22, fontSize: 12, color: 'var(--ink-400)', textAlign: 'center' }}>
          Casos ilustrativos. Resultados variam por cidade, ticket e mix de procedimentos.
        </p>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .stat-band { grid-template-columns: 1fr 1fr !important; }
          .stat-band .stat-cell:nth-child(3) { border-left: none !important; border-top: 1px solid var(--line); }
          .stat-band .stat-cell:nth-child(4) { border-top: 1px solid var(--line); }
        }
        @media (max-width: 480px) {
          .stat-band { grid-template-columns: 1fr !important; }
          .stat-band .stat-cell { border-left: none !important; border-top: 1px solid var(--line); }
          .stat-band .stat-cell:first-child { border-top: none; }
        }
      `}</style>
    </section>
  );
}

window.Proof = Proof;
