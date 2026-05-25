/* global React, Container, Icon, Reveal */
const { useState, useEffect, useRef } = React;

const flowStyles = {
  section: { background: 'var(--paper)', overflow: 'hidden' },
  header: { maxWidth: 840, marginBottom: 64 },

  track: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 16,
    marginTop: 32,
  },
  trackMobile: {
    display: 'flex',
    gap: 16,
    overflowX: 'auto',
    paddingBottom: 16,
    scrollSnapType: 'x mandatory',
  },

  card: {
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 20,
    padding: 20,
    display: 'flex', flexDirection: 'column', gap: 14,
    minHeight: 360,
    position: 'relative',
    transition: 'border-color 220ms, background 220ms, box-shadow 220ms',
  },
  cardActive: {
    background: 'var(--paper)',
    borderColor: 'var(--navy-900)',
    boxShadow: '0 18px 48px rgba(15,46,74,0.18)',
  },
  num: {
    fontFamily: 'var(--font-display)',
    fontSize: 14, fontWeight: 700, color: 'var(--ink-400)',
    letterSpacing: '0.05em',
  },
  numActive: { color: 'var(--accent)' },

  iconBig: {
    width: 48, height: 48, borderRadius: 14,
    background: 'var(--accent-soft)',
    color: 'var(--accent-text)',
    display: 'grid', placeItems: 'center',
    transition: 'background 220ms, color 220ms',
  },
  iconBigActive: { background: 'var(--navy-900)', color: '#fff' },

  cardTitle: {
    fontSize: 17, fontWeight: 600,
    color: 'var(--ink-900)',
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  cardSub: {
    fontSize: 13, color: 'var(--ink-500)',
    lineHeight: 1.5,
  },

  visualZone: {
    flex: 1,
    background: '#fff',
    border: '1px solid var(--line)',
    borderRadius: 14,
    padding: 12,
    display: 'flex', flexDirection: 'column', gap: 8,
    fontSize: 12,
    marginTop: 'auto',
  },

  line: {
    position: 'absolute',
    top: 44,
    left: '10%',
    right: '10%',
    height: 2,
    background: 'var(--line)',
    zIndex: 0,
  },
  lineFill: {
    position: 'absolute',
    top: 44,
    left: '10%',
    height: 2,
    background: 'var(--navy-900)',
    zIndex: 1,
    transition: 'width 1200ms var(--ease-out)',
  },

  controls: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginTop: 32,
  },
  dot: {
    width: 10, height: 10, borderRadius: 999,
    background: 'var(--line)',
    border: 0, cursor: 'pointer',
    transition: 'background 140ms',
  },
  dotActive: { background: 'var(--navy-900)', width: 28 },
};

const STEPS = [
  {
    icon: 'globe',
    num: '01',
    title: 'Te encontram & agendam.',
    sub: 'Site otimizado pra SEO local. Formulário de 2 passos. Quem entra, agenda na hora, sem fricção.',
    visual: 'site',
  },
  {
    icon: 'message-circle',
    num: '02',
    title: 'IA puxa quem não fechou.',
    sub: 'Lead que entrou e não agendou? A IA entra no WhatsApp em segundos e conduz até a marcação.',
    visual: 'chat',
  },
  {
    icon: 'calendar-check',
    num: '03',
    title: 'Confirmação automática.',
    sub: 'Lembretes em 48h, 24h e 2h antes. No-show cai sem você ligar pra ninguém.',
    visual: 'confirm',
  },
  {
    icon: 'refresh-cw',
    num: '04',
    title: 'Reagenda sozinha.',
    sub: 'Precisou remarcar? A IA detecta, checa sua agenda e remarca. Sem atendente, sem burocracia.',
    visual: 'reschedule',
  },
  {
    icon: 'star',
    num: '05',
    title: '5★ no Google.',
    sub: 'Cliente avalia em privado. Gostou: vai pro Google. Não gostou: você resolve antes da estrela negativa.',
    visual: 'review',
  },
];

function Flow() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => setRunning(e.isIntersecting));
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, 2800);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const select = (i) => {
    setActive(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (running) {
      intervalRef.current = setInterval(() => {
        setActive((a) => (a + 1) % STEPS.length);
      }, 2800);
    }
  };

  return (
    <section id="solucao" ref={sectionRef} style={flowStyles.section}>
      <div className="container-wide">
        <Reveal style={flowStyles.header}>
          <span className="eyebrow">A solução</span>
          <h2 className="display display-xl" style={{ marginTop: 12 }}>
            Um sistema que trabalha <span className="accent-underline">enquanto você atende.</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: 18, color: 'var(--ink-600)' }}>
            Cinco etapas. Tudo automático. Tudo rastreado.
          </p>
        </Reveal>

        <div style={flowStyles.track} className="flow-track">
          <div style={flowStyles.line} />
          <div style={{ ...flowStyles.lineFill, width: `calc(${(active / (STEPS.length - 1)) * 80}% )` }} />
          {STEPS.map((s, i) => (
            <FlowCard key={i} step={s} active={i === active} index={i} />
          ))}
        </div>

        <div style={flowStyles.controls}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              aria-label={`Passo ${i+1}`}
              onClick={() => select(i)}
              style={{ ...flowStyles.dot, ...(i === active ? flowStyles.dotActive : {}) }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .flow-track { grid-template-columns: 1fr 1fr 1fr !important; }
          .flow-track .flow-line { display: none; }
        }
        @media (max-width: 680px) {
          .flow-track { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FlowCard({ step, active, index }) {
  return (
    <div style={{ ...flowStyles.card, ...(active ? flowStyles.cardActive : {}) }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ ...flowStyles.num, ...(active ? flowStyles.numActive : {}) }}>{step.num}</span>
        <span style={{ ...flowStyles.iconBig, ...(active ? flowStyles.iconBigActive : {}) }}>
          <Icon name={step.icon} size={22} />
        </span>
      </div>
      <div style={flowStyles.cardTitle}>{step.title}</div>
      <div style={flowStyles.cardSub}>{step.sub}</div>
      <VisualMini kind={step.visual} active={active} />
    </div>
  );
}

function VisualMini({ kind, active }) {
  const baseRow = { display: 'flex', alignItems: 'center', gap: 6 };
  switch (kind) {
    case 'site':
      return (
        <div style={flowStyles.visualZone}>
          <div style={{ ...baseRow, fontSize: 10, color: 'var(--ink-400)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#FF5F57' }} />
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#FEBC2E' }} />
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#28C840' }} />
            <span style={{ marginLeft: 6 }}>bellavita.com.br</span>
          </div>
          <div style={{ background: 'var(--accent-soft)', height: 12, borderRadius: 4, width: '80%' }} />
          <div style={{ background: 'var(--line)', height: 8, borderRadius: 4 }} />
          <div style={{ background: 'var(--line)', height: 8, borderRadius: 4, width: '70%' }} />
          <div style={{ background: 'var(--navy-900)', color:'#fff', textAlign:'center', padding: '6px 0', borderRadius: 8, fontSize: 10, fontWeight: 600 }}>
            Agendar agora
          </div>
        </div>
      );
    case 'chat':
      return (
        <div style={flowStyles.visualZone}>
          <div style={{ background: '#fff', padding: '6px 8px', borderRadius: 10, fontSize: 11, alignSelf: 'flex-start', border: '1px solid var(--line)' }}>
            Oi! Vi seu interesse no microagulhamento. Quer eu te encaixar?
          </div>
          <div style={{ background: 'var(--accent-soft)', color:'var(--accent-text)', padding: '6px 8px', borderRadius: 10, fontSize: 11, alignSelf: 'flex-end' }}>
            Pode ser quinta?
          </div>
          <div style={{ background: '#fff', padding: '6px 8px', borderRadius: 10, fontSize: 11, alignSelf: 'flex-start', border: '1px solid var(--line)' }}>
            Reservei quinta 14h ✓
          </div>
        </div>
      );
    case 'confirm':
      return (
        <div style={flowStyles.visualZone}>
          {['48h antes', '24h antes', '2h antes'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', borderTop: i ? '1px dashed var(--line)' : 'none' }}>
              <span style={{ width: 18, height: 18, borderRadius: 999, background: i <= (active ? 2 : 0) ? 'var(--success)' : 'var(--line)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 10, transition: 'background 600ms' }}>
                ✓
              </span>
              <span style={{ fontSize: 11, color: 'var(--ink-700)' }}>Lembrete {t}</span>
            </div>
          ))}
          <div style={{ marginTop: 'auto', fontSize: 10, color: 'var(--success)', fontWeight: 600 }}>
            No-show 30% → 6%
          </div>
        </div>
      );
    case 'reschedule':
      return (
        <div style={flowStyles.visualZone}>
          <div style={{ background: 'var(--warning-bg)', color:'#B17D0A', padding: '6px 8px', borderRadius: 10, fontSize: 11, alignSelf: 'flex-start' }}>
            "Não vou conseguir terça"
          </div>
          <div style={{ background: '#fff', padding: '6px 8px', borderRadius: 10, fontSize: 11, border: '1px solid var(--line)' }}>
            IA: Posso te remarcar pra sexta 11h?
          </div>
          <div style={{ background: 'var(--accent-soft)', color:'var(--accent-text)', padding: '6px 8px', borderRadius: 10, fontSize: 11, alignSelf:'flex-end' }}>
            Perfeito!
          </div>
          <div style={{ marginTop: 'auto', fontSize: 10, color: 'var(--success)', fontWeight: 600 }}>
            ✓ Reagendado em 12s
          </div>
        </div>
      );
    case 'review':
      return (
        <div style={flowStyles.visualZone}>
          <div style={{ fontSize: 11, color: 'var(--ink-700)' }}>Como foi o atendimento?</div>
          <div style={{ display: 'flex', gap: 4, fontSize: 18 }}>
            <span style={{ color: '#F5B400' }}>★★★★★</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <div style={{ flex: 1, background: 'var(--success-bg)', color:'var(--success)', padding: '6px 8px', borderRadius: 8, fontSize: 10, fontWeight: 600, textAlign: 'center' }}>
              → Google
            </div>
            <div style={{ flex: 1, background: 'var(--line-soft)', color:'var(--ink-500)', padding: '6px 8px', borderRadius: 8, fontSize: 10, fontWeight: 600, textAlign: 'center' }}>
              Privado
            </div>
          </div>
          <div style={{ marginTop: 'auto', fontSize: 10, color: 'var(--success)', fontWeight: 600 }}>
            Só ★★★★★ vai pro Google
          </div>
        </div>
      );
    default:
      return null;
  }
}

window.Flow = Flow;
