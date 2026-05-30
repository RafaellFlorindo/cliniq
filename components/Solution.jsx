/* global React, Icon, Reveal, FlowEyebrow */
const { useState, useEffect, useRef } = React;

/* ─── Scroll reveal (entrada 3D do painel) ───────────────────────────────── */
function useScrollReveal(ref) {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    function tick() {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh + 80;
      const end = vh * 0.24;
      setProg(Math.max(0, Math.min(1, (start - r.top) / (start - end))));
    }
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);
  return prog;
}

/* ─── Painel CRM: entrada 3D épica no scroll, IMAGEM PARADA (sem tilt no hover) ─ */
function CRMWindow() {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const outerRef = useRef(null);
  const prog = useScrollReveal(outerRef);

  const lerp = (a, b, t) => a + (b - a) * t;
  const ep = 1 - Math.pow(1 - Math.min(prog, 1), 4);
  const ready = prog >= 0.96;

  const transform = ready
    ? 'perspective(1600px) rotateX(1.5deg)'
    : `perspective(2400px) rotateX(${lerp(72, 1.5, ep)}deg) translateY(${lerp(170, 0, ep)}px) scale(${lerp(0.62, 1, ep)})`;
  const opacity = ready ? 1 : Math.pow(ep, 0.35);

  return (
    <div ref={outerRef} style={{ position: 'relative', transformStyle: 'preserve-3d', opacity }}>
      {/* Glow de profundidade — elevação forte sobre o canvas */}
      <div style={{
        position: 'absolute', bottom: lerp(-14, -64, ep), left: '8%', right: '8%',
        height: lerp(54, 110, ep), background: 'var(--teal-500)', borderRadius: '50%',
        filter: `blur(${lerp(32, 60, ep)}px)`, opacity: ready ? 0.20 : lerp(0, 0.4, ep),
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        background: '#fff', borderRadius: 18, overflow: 'hidden', position: 'relative', zIndex: 1,
        boxShadow: `0 ${lerp(16, 50, ep)}px ${lerp(48, 140, ep)}px -20px rgba(11,31,51,${lerp(0.1, 0.42, ep).toFixed(2)}), 0 0 0 1px rgba(11,31,51,0.06)`,
        transform,
        transition: ready ? 'transform 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 600ms' : 'none',
      }}>
        {/* macOS title bar */}
        <div style={{ background: 'linear-gradient(180deg,#f9f9f9,#efefef)', borderBottom: '1px solid rgba(0,0,0,0.10)', padding: '11px 16px', display: 'flex', alignItems: 'center', userSelect: 'none' }}>
          <div style={{ display: 'flex', gap: 7 }}>
            {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.18)' }} />
            ))}
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#888' }}>CLINIQ · Painel de Controle</div>
          <div style={{ width: 53 }} />
        </div>

        {!ready && ep > 0.05 && (
          <div style={{ position: 'absolute', top: `${Math.min(ep * 112, 100)}%`, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, transparent, rgba(77,182,172,0.45) 15%, rgba(180,255,245,1) 50%, rgba(77,182,172,0.45) 85%, transparent)', boxShadow: '0 0 28px 10px rgba(77,182,172,0.5)', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }} />
        )}

        {!err && (
          <img src="./images/crm-dashboard.png" alt="Painel CLINIQ — leads, conversas, funil e reputação" style={{ width: '100%', height: 'auto', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 600ms' }} onLoad={() => setLoaded(true)} onError={() => setErr(true)} />
        )}
        {!loaded && !err && <div style={{ aspectRatio: '16/9', background: 'linear-gradient(90deg,#f0f4f8 25%,#e6ecf2 50%,#f0f4f8 75%)', backgroundSize: '200% 100%', animation: 's2shimmer 1.6s ease-in-out infinite' }} />}
        {err && <div style={{ aspectRatio: '16/9', display: 'grid', placeItems: 'center', background: '#f7fafc', color: '#94a3b8', fontSize: 12 }}>cliniq/images/crm-dashboard.png</div>}
      </div>
    </div>
  );
}

/* ─── Chips de notificação flutuantes (métricas reais, específicas) ───────── */
function FloatChip({ icon, iconBg, iconClr, label, sub, posStyle, enterDelay, floatDur, floatDelay }) {
  const [vis, setVis] = useState(false);
  const [float, setFloat] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setVis(true), enterDelay);
    const t2 = setTimeout(() => setFloat(true), enterDelay + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div style={{ position: 'absolute', zIndex: 10, ...posStyle, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: 'opacity 580ms cubic-bezier(0.22,1,0.36,1), transform 580ms cubic-bezier(0.22,1,0.36,1)' }}>
      <div style={{ animation: float ? `s2floatY ${floatDur} ease-in-out ${floatDelay} infinite` : 'none', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', borderRadius: 14, padding: '11px 16px', boxShadow: '0 14px 40px -12px rgba(11,31,51,0.28), 0 0 0 1px rgba(11,31,51,0.05)', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, color: iconClr, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={icon} size={17} /></div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.25 }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{sub}</div>}
        </div>
      </div>
    </div>
  );
}

/* ─── 5 etapas (antiga Flow) ─────────────────────────────────────────────── */
const STEPS = [
  { icon: 'globe', num: '01', title: 'Te encontram & agendam.', sub: 'Site com SEO local + formulário de 2 passos. Quem entra, agenda na hora.', visual: 'site' },
  { icon: 'message-circle', num: '02', title: 'IA puxa quem não fechou.', sub: 'Lead esfriou? A IA entra no WhatsApp em segundos e conduz até a marcação.', visual: 'chat' },
  { icon: 'calendar-check', num: '03', title: 'Confirma sozinha.', sub: 'Lembretes em 48h, 24h e 2h. O no-show cai sem você ligar pra ninguém.', visual: 'confirm' },
  { icon: 'refresh-cw', num: '04', title: 'Reagenda sozinha.', sub: 'Precisou remarcar? A IA checa a agenda e remarca. Sem atendente.', visual: 'reschedule' },
  { icon: 'star', num: '05', title: '5★ no Google.', sub: 'Cliente avalia em privado. Gostou vai pro Google; não gostou, você resolve antes.', visual: 'review' },
];

function VisualMini({ kind, active }) {
  const zone = { flex: 1, background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: 11, display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12, marginTop: 'auto' };
  switch (kind) {
    case 'site': return (<div style={zone}><div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, color: 'var(--ink-400)' }}><span style={{ width: 7, height: 7, borderRadius: 99, background: '#FF5F57' }} /><span style={{ width: 7, height: 7, borderRadius: 99, background: '#FEBC2E' }} /><span style={{ width: 7, height: 7, borderRadius: 99, background: '#28C840' }} /><span style={{ marginLeft: 5 }}>bellavita.com.br</span></div><div style={{ background: 'var(--accent-soft)', height: 11, borderRadius: 4, width: '80%' }} /><div style={{ background: 'var(--line)', height: 7, borderRadius: 4 }} /><div style={{ background: 'var(--navy-900)', color: '#fff', textAlign: 'center', padding: '6px 0', borderRadius: 8, fontSize: 10, fontWeight: 600 }}>Agendar agora</div></div>);
    case 'chat': return (<div style={zone}><div style={{ background: '#fff', padding: '6px 8px', borderRadius: 10, fontSize: 11, alignSelf: 'flex-start', border: '1px solid var(--line)' }}>Vi seu interesse no microagulhamento. Te encaixo?</div><div style={{ background: 'var(--accent-soft)', color: 'var(--accent-text)', padding: '6px 8px', borderRadius: 10, fontSize: 11, alignSelf: 'flex-end' }}>Pode ser quinta?</div><div style={{ background: '#fff', padding: '6px 8px', borderRadius: 10, fontSize: 11, alignSelf: 'flex-start', border: '1px solid var(--line)' }}>Reservei quinta 14h ✓</div></div>);
    case 'confirm': return (<div style={zone}>{['48h antes', '24h antes', '2h antes'].map((t, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', borderTop: i ? '1px dashed var(--line)' : 'none' }}><span style={{ width: 18, height: 18, borderRadius: 99, background: 'var(--success)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 10 }}>✓</span><span style={{ fontSize: 11, color: 'var(--ink-700)' }}>Lembrete {t}</span></div>))}<div style={{ marginTop: 'auto', fontSize: 10, color: 'var(--success)', fontWeight: 700 }}>No-show 30% → 6%</div></div>);
    case 'reschedule': return (<div style={zone}><div style={{ background: 'var(--warning-bg)', color: '#B17D0A', padding: '6px 8px', borderRadius: 10, fontSize: 11, alignSelf: 'flex-start' }}>"Não vou conseguir terça"</div><div style={{ background: '#fff', padding: '6px 8px', borderRadius: 10, fontSize: 11, border: '1px solid var(--line)' }}>IA: Te remarco pra sexta 11h?</div><div style={{ background: 'var(--accent-soft)', color: 'var(--accent-text)', padding: '6px 8px', borderRadius: 10, fontSize: 11, alignSelf: 'flex-end' }}>Perfeito!</div><div style={{ marginTop: 'auto', fontSize: 10, color: 'var(--success)', fontWeight: 700 }}>✓ Reagendado em 12s</div></div>);
    case 'review': return (<div style={zone}><div style={{ fontSize: 11, color: 'var(--ink-700)' }}>Como foi o atendimento?</div><div style={{ fontSize: 18, color: '#F5B400' }}>★★★★★</div><div style={{ display: 'flex', gap: 6, marginTop: 2 }}><div style={{ flex: 1, background: 'var(--success-bg)', color: 'var(--success)', padding: '6px 8px', borderRadius: 8, fontSize: 10, fontWeight: 700, textAlign: 'center' }}>→ Google</div><div style={{ flex: 1, background: 'var(--line-soft)', color: 'var(--ink-500)', padding: '6px 8px', borderRadius: 8, fontSize: 10, fontWeight: 600, textAlign: 'center' }}>Privado</div></div><div style={{ marginTop: 'auto', fontSize: 10, color: 'var(--success)', fontWeight: 700 }}>Só 5★ vai pro Google</div></div>);
    default: return null;
  }
}

function FlowCard({ step, active }) {
  return (
    <div className="flow-card" style={{
      background: active ? 'var(--paper)' : 'var(--paper-2)',
      border: '1px solid', borderColor: active ? 'var(--navy-900)' : 'var(--line)',
      borderRadius: 18, padding: 18, display: 'flex', flexDirection: 'column', gap: 12,
      minHeight: 340, position: 'relative', zIndex: 1,
      boxShadow: active ? '0 24px 50px -22px rgba(11,31,51,0.32)' : '0 2px 6px rgba(11,31,51,0.04)',
      transform: active ? 'translateY(-4px)' : 'none',
      transition: 'border-color 260ms, background 260ms, box-shadow 260ms, transform 260ms',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: active ? 'var(--accent-text)' : 'var(--ink-400)', letterSpacing: '0.05em' }}>{step.num}</span>
        <span style={{ width: 44, height: 44, borderRadius: 13, display: 'grid', placeItems: 'center', background: active ? 'var(--navy-900)' : 'var(--accent-soft)', color: active ? '#fff' : 'var(--accent-text)', transition: 'background 260ms, color 260ms' }}><Icon name={step.icon} size={21} /></span>
      </div>
      <div style={{ fontSize: 16.5, fontWeight: 600, color: 'var(--ink-900)', letterSpacing: '-0.01em', lineHeight: 1.28 }}>{step.title}</div>
      <div style={{ fontSize: 13, color: 'var(--ink-500)', lineHeight: 1.5 }}>{step.sub}</div>
      <VisualMini kind={step.visual} active={active} />
    </div>
  );
}

const OUTCOMES = [
  { icon: 'eye', t: 'Visibilidade total', s: 'De onde veio cada cliente e em que etapa cada lead está.' },
  { icon: 'calendar-check', t: 'Agenda previsível', s: 'Confirmações automáticas derrubam o no-show.' },
  { icon: 'star', t: 'Reputação que sobe', s: 'Só avaliação positiva vai pro Google. A nota cresce.' },
];

function Solution() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);
  const trackRef = useRef(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => setRunning(e.isIntersecting)), { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 2800);
    return () => clearInterval(intervalRef.current);
  }, [running]);
  const select = (i) => { setActive(i); if (intervalRef.current) clearInterval(intervalRef.current); if (running) intervalRef.current = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 2800); };

  return (
    <section id="solucao" style={{ background: 'transparent' }}>
      <div className="container-wide">
        <Reveal style={{ maxWidth: 860, marginBottom: 'clamp(40px,5vw,64px)' }}>
          <FlowEyebrow>A solução</FlowEyebrow>
          <h2 className="display display-xl" style={{ marginTop: 18 }}>
            Um sistema que trabalha <span className="accent-underline">enquanto você atende.</span>
          </h2>
          <p style={{ marginTop: 20, fontSize: 18, color: 'var(--ink-600)', lineHeight: 1.6 }}>
            Você acompanha tudo de um painel só. O sistema faz o operacional — captação, follow-up, confirmação e reputação — no piloto automático.
          </p>
        </Reveal>

        {/* Painel CRM + chips */}
        <div style={{ position: 'relative', maxWidth: 980, margin: '0 auto clamp(56px,8vw,104px)' }}>
          <CRMWindow />
          <FloatChip icon="zap" iconBg="var(--accent-soft)" iconClr="var(--accent-text)" label="Lead respondido em 45s" sub="IA · WhatsApp automático" posStyle={{ left: '-5%', top: '12%' }} enterDelay={1200} floatDur="4.2s" floatDelay="0s" />
          <FloatChip icon="star" iconBg="#FFF3D6" iconClr="#B17D0A" label="+1 avaliação 5★ no Google" sub="Júlia M. · agora" posStyle={{ right: '-5%', top: '38%' }} enterDelay={1600} floatDur="5.2s" floatDelay="0.6s" />
          <FloatChip icon="calendar-check" iconBg="var(--success-bg)" iconClr="var(--success)" label="Agenda: 0 buracos esta semana" sub="No-show 28% → 4%" posStyle={{ left: '2%', bottom: '-5%' }} enterDelay={2000} floatDur="6s" floatDelay="1.2s" />
        </div>

        {/* 5 etapas */}
        <Reveal style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-500)' }}>Como funciona · 5 etapas</span>
        </Reveal>

        <div ref={trackRef} className="flow-track" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {/* Linha conectora — ATRÁS dos cards (z-index 0) */}
          <div className="flow-line" style={{ position: 'absolute', top: 40, left: '10%', right: '10%', height: 2, background: 'var(--line)', zIndex: 0 }} />
          <div className="flow-line" style={{ position: 'absolute', top: 40, left: '10%', height: 2, background: 'var(--navy-900)', zIndex: 0, width: `calc(${(active / (STEPS.length - 1)) * 80}%)`, transition: 'width 900ms var(--ease-out)' }} />
          {STEPS.map((s, i) => <FlowCard key={i} step={s} active={i === active} />)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
          {STEPS.map((_, i) => (
            <button key={i} aria-label={`Passo ${i + 1}`} onClick={() => select(i)} style={{ width: i === active ? 28 : 10, height: 10, borderRadius: 99, background: i === active ? 'var(--navy-900)' : 'var(--line)', border: 0, cursor: 'pointer', transition: 'all 200ms' }} />
          ))}
        </div>

        {/* Outcomes (absorve Benefits) */}
        <div className="outcome-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 'clamp(56px,7vw,88px)' }}>
          {OUTCOMES.map((o, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '22px 24px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, boxShadow: 'var(--shadow-xs)', height: '100%' }}>
                <span style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--accent-soft)', color: 'var(--accent-text)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={o.icon} size={20} /></span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, color: 'var(--ink-900)', letterSpacing: '-0.01em' }}>{o.t}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-600)', lineHeight: 1.5, marginTop: 5 }}>{o.s}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes s2shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes s2floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @media (max-width: 980px) {
          .flow-track { grid-template-columns: repeat(2,1fr) !important; }
          .flow-track .flow-line { display: none; }
          .outcome-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .flow-track { grid-template-columns: 1fr !important; }
          #solucao [style*="left:-5%"], #solucao [style*="right:-5%"] { display: none !important; }
        }
      `}</style>
    </section>
  );
}

window.Solution = Solution;
