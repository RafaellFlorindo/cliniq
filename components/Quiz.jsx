/* global React, Icon */
const { useState, useEffect, useRef } = React;

const quizStyles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(8, 26, 44, 0.65)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 1000,
    display: 'grid', placeItems: 'center',
    padding: 24,
    animation: 'fadeIn 280ms var(--ease-out)',
  },
  panel: {
    width: '100%',
    maxWidth: 640,
    background: 'var(--paper)',
    borderRadius: 24,
    boxShadow: '0 40px 100px rgba(0,0,0,0.32)',
    overflow: 'hidden',
    position: 'relative',
    animation: 'slideIn 360ms var(--ease-out)',
    maxHeight: 'calc(100vh - 48px)',
    display: 'flex', flexDirection: 'column',
  },
  closeBtn: {
    position: 'absolute', top: 16, right: 16,
    width: 36, height: 36, borderRadius: 999,
    background: 'var(--surface)', color: 'var(--ink-700)',
    border: 0, cursor: 'pointer',
    display: 'grid', placeItems: 'center',
    zIndex: 2,
    transition: 'background 140ms',
  },
  progressTrack: {
    height: 4,
    background: 'var(--line)',
    position: 'relative',
  },
  progressFill: {
    position: 'absolute', left: 0, top: 0, bottom: 0,
    background: 'var(--accent)',
    transition: 'width 420ms var(--ease-out)',
  },
  body: {
    padding: '40px 36px 32px',
    overflowY: 'auto',
    flex: 1,
  },
  step: {
    fontSize: 12, fontWeight: 700,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: 'var(--accent-text)',
    marginBottom: 12,
  },
  question: {
    fontFamily: 'var(--font-display)',
    fontSize: 28, fontWeight: 700,
    color: 'var(--ink-900)',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    margin: 0,
    textWrap: 'balance',
  },
  hint: {
    marginTop: 12, fontSize: 14,
    color: 'var(--ink-500)',
    lineHeight: 1.5,
  },
  options: {
    marginTop: 32,
    display: 'flex', flexDirection: 'column',
    gap: 10,
  },
  option: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '16px 20px',
    background: 'var(--paper)',
    border: '1.5px solid var(--line)',
    borderRadius: 14,
    cursor: 'pointer',
    transition: 'border-color 160ms, background 160ms, transform 80ms',
    textAlign: 'left',
    fontFamily: 'inherit',
    fontSize: 15, color: 'var(--ink-700)',
    fontWeight: 500,
    width: '100%',
  },
  optionSelected: {
    borderColor: 'var(--navy-900)',
    background: 'var(--accent-soft)',
    color: 'var(--ink-900)',
    fontWeight: 600,
  },
  optionRadio: {
    flexShrink: 0,
    width: 22, height: 22,
    borderRadius: 999,
    border: '2px solid var(--line)',
    background: 'var(--paper)',
    transition: 'border-color 160ms, background 160ms',
    display: 'grid', placeItems: 'center',
  },
  optionRadioSelected: {
    borderColor: 'var(--navy-900)',
    background: 'var(--navy-900)',
  },
  optionRadioDot: {
    width: 8, height: 8, borderRadius: 999,
    background: '#fff',
  },
  footer: {
    padding: '20px 36px 28px',
    borderTop: '1px solid var(--line)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: 'var(--paper)',
    gap: 12,
  },

  /* Thank-you */
  doneWrap: {
    padding: '52px 40px 44px',
    textAlign: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
  },
  doneIcon: {
    width: 76, height: 76, borderRadius: 999,
    background: 'var(--success-bg)', color: 'var(--success)',
    display: 'grid', placeItems: 'center',
    marginBottom: 24,
  },
  doneTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 30, fontWeight: 700,
    color: 'var(--ink-900)', letterSpacing: '-0.02em',
    margin: 0, lineHeight: 1.15,
  },
  doneText: {
    marginTop: 16, fontSize: 16, color: 'var(--ink-600)',
    maxWidth: 460, lineHeight: 1.55,
  },
  doneSummary: {
    marginTop: 28, padding: 18,
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 14,
    fontSize: 13, color: 'var(--ink-500)',
    width: '100%',
    textAlign: 'left',
  },
  doneCtaRow: {
    marginTop: 28,
    display: 'flex', gap: 12, flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

const QUESTIONS = [
  {
    step: 'Pergunta 1 de 4',
    q: 'Como anda sua agenda hoje?',
    hint: 'Sem julgamento, todas as respostas são válidas.',
    options: [
      'Tem horário vago toda semana',
      'Lota algumas semanas, outras não',
      'Lota mas com bastante no-show',
      'Lota e quase não tem furo',
    ],
  },
  {
    step: 'Pergunta 2 de 4',
    q: 'De onde vem a maior parte dos seus clientes?',
    hint: 'Marque a fonte principal.',
    options: [
      'Indicação boca a boca',
      'Instagram orgânico',
      'Anúncios no Meta (Facebook/Instagram)',
      'Google / busca local',
      'Não sei dizer com certeza',
    ],
  },
  {
    step: 'Pergunta 3 de 4',
    q: 'Quantos atendimentos sua clínica faz por dia?',
    hint: 'Média geral, incluindo todos os profissionais.',
    options: [
      'Até 10',
      '11 a 25',
      '26 a 50',
      'Mais de 50',
    ],
  },
  {
    step: 'Pergunta 4 de 4',
    q: 'Quando você gostaria de começar?',
    hint: 'Ajuda a gente a reservar onboarding.',
    options: [
      'Imediato, quero ontem',
      'Próximas 2 semanas',
      'Próximo mês',
      'Ainda estou pesquisando',
    ],
  },
];

function Quiz({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add('no-scroll');
      setStep(0);
      setAnswers({});
      setDone(false);
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const total = QUESTIONS.length;
  const progress = done ? 100 : ((step) / total) * 100;
  const current = QUESTIONS[step];
  const selected = answers[step];

  const next = () => {
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const back = () => { if (step > 0) setStep(step - 1); };

  const pick = (opt) => {
    setAnswers({ ...answers, [step]: opt });
    setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setDone(true);
    }, 280);
  };

  return (
    <div style={quizStyles.overlay} onClick={onClose}>
      <div
        style={quizStyles.panel}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          style={quizStyles.closeBtn}
          onClick={onClose}
          aria-label="Fechar"
          onMouseEnter={(e)=>{e.currentTarget.style.background='var(--line)';}}
          onMouseLeave={(e)=>{e.currentTarget.style.background='var(--surface)';}}
        >
          <Icon name="x" size={18} />
        </button>

        <div style={quizStyles.progressTrack}>
          <div style={{ ...quizStyles.progressFill, width: `${progress}%` }} />
        </div>

        {!done ? (
          <>
            <div style={quizStyles.body}>
              <div style={quizStyles.step}>{current.step}</div>
              <h3 style={quizStyles.question}>{current.q}</h3>
              <p style={quizStyles.hint}>{current.hint}</p>

              <div style={quizStyles.options}>
                {current.options.map((opt, i) => {
                  const isSel = selected === opt;
                  return (
                    <button
                      key={i}
                      type="button"
                      style={{ ...quizStyles.option, ...(isSel ? quizStyles.optionSelected : {}) }}
                      onClick={() => pick(opt)}
                      onMouseEnter={(e)=>{ if(!isSel) { e.currentTarget.style.borderColor='var(--ink-500)'; } }}
                      onMouseLeave={(e)=>{ if(!isSel) { e.currentTarget.style.borderColor='var(--line)'; } }}
                    >
                      <span style={{ ...quizStyles.optionRadio, ...(isSel ? quizStyles.optionRadioSelected : {}) }}>
                        {isSel && <span style={quizStyles.optionRadioDot} />}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={quizStyles.footer}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={back}
                disabled={step === 0}
                style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
              >
                <Icon name="arrow-left" size={14} />
                Voltar
              </button>
              <div style={{ fontSize: 12, color: 'var(--ink-400)' }}>
                {step + 1} / {total}
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={next}
                disabled={!selected}
              >
                {step === total - 1 ? 'Finalizar' : 'Próxima'}
                <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </>
        ) : (
          <div style={quizStyles.doneWrap}>
            <div style={quizStyles.doneIcon}>
              <Icon name="check" size={36} strokeWidth={2.5} />
            </div>
            <h3 style={quizStyles.doneTitle}>
              Pronto. Diagnóstico recebido.
            </h3>
            <p style={quizStyles.doneText}>
              A gente analisa suas respostas e te chama no WhatsApp em até <strong style={{ color: 'var(--ink-900)' }}>24h úteis</strong> com um plano sob medida pra sua clínica.
            </p>

            <div style={quizStyles.doneSummary}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-700)', marginBottom: 10 }}>
                Suas respostas
              </div>
              {QUESTIONS.map((q, i) => (
                <div key={i} style={{ paddingTop: i === 0 ? 0 : 8 }}>
                  <span style={{ color: 'var(--ink-400)' }}>{i+1}.</span>{' '}
                  <span style={{ color: 'var(--ink-700)' }}>{answers[i] || '—'}</span>
                </div>
              ))}
            </div>

            <div style={quizStyles.doneCtaRow}>
              <a
                href="https://wa.me/5500000000000?text=Acabei%20de%20fazer%20o%20diagn%C3%B3stico%20no%20site"
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-lg"
              >
                <Icon name="message-circle" size={18} />
                Adiantar pelo WhatsApp
              </a>
              <button className="btn btn-ghost" onClick={onClose}>
                Voltar ao site
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

window.Quiz = Quiz;
