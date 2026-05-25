/* global React, Icon, Reveal */
const { useState } = React;

const faqStyles = {
  section: { background: 'var(--paper)' },
  header: { maxWidth: 820, marginBottom: 48 },
  list: {
    maxWidth: 880,
    margin: '0 auto',
    border: '1px solid var(--line)',
    borderRadius: 20,
    background: 'var(--paper)',
    overflow: 'hidden',
  },
  row: {
    borderBottom: '1px solid var(--line)',
    transition: 'background 160ms',
  },
  rowLast: { borderBottom: 'none' },
  rowOpen: { background: 'var(--surface)' },
  head: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '22px 26px',
    cursor: 'pointer',
    gap: 18,
  },
  q: {
    fontSize: 16, fontWeight: 600,
    color: 'var(--ink-900)',
    letterSpacing: '-0.005em',
    lineHeight: 1.4,
  },
  iconWrap: {
    flexShrink: 0,
    width: 28, height: 28, borderRadius: 999,
    background: 'var(--surface)', color: 'var(--ink-700)',
    display: 'grid', placeItems: 'center',
    transition: 'transform 200ms, background 200ms',
  },
  iconWrapOpen: { transform: 'rotate(45deg)', background: 'var(--navy-900)', color: '#fff' },
  body: {
    padding: '0 26px 22px',
    fontSize: 15, lineHeight: 1.6,
    color: 'var(--ink-600)',
  },
};

const FAQS = [
  { q: 'O sistema funciona pra qualquer tipo de clínica de estética?',
    a: <>Foi construído especificamente pra clínicas de estética: procedimentos típicos, calendário de agenda, avaliação pós-atendimento. Não é genérico. Atende desde clínica de procedimentos não-invasivos até clínicas com ticket alto de estética avançada.</> },
  { q: 'Quanto tempo leva pra estar tudo funcionando?',
    a: <>Em média <strong>7 a 14 dias</strong> após o onboarding. A configuração é nossa e você não precisa fazer nada técnico. Recebe o sistema pronto e o treinamento.</> },
  { q: 'Preciso já ter site ou posso começar do zero?',
    a: <>Pode começar do zero. O site two-step <strong>já está incluso</strong>. Criamos e otimizamos pra sua cidade, com SEO local e formulário integrado à agenda.</> },
  { q: 'E se eu não gostar?',
    a: <>Você tem 30 dias de garantia. Se não fizer sentido, devolvemos o setup integral sem perguntas.</> },
  { q: 'Tem suporte depois que o sistema estiver rodando?',
    a: <>Sim. Suporte a dúvidas operacionais, ajustes de texto nos fluxos e atualização de prompts da IA estão inclusos na mensalidade.</> },
  { q: 'Quais as formas de pagamento?',
    a: <>Cartão de crédito, Pix ou boleto. Setup pago uma vez. Mensalidade recorrente <strong>sem fidelidade mínima</strong>.</> },
  { q: 'Preciso contratar algum outro serviço além desse?',
    a: <>Não. Tudo roda dentro do GoHighLevel, que já está incluso. Você não precisa contratar plataforma separada, ferramenta de e-mail, agendador externo, nada.</> },
  { q: 'E o tráfego pago? Vocês cuidam?',
    a: <>Gestão de tráfego não está inclusa, mas o sistema já vem preparado pro dia que você quiser rodar anúncios, com <strong>Pixel Meta CAPI server-side</strong> configurado.</> },
];

function Faq() {
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <section id="faq" style={faqStyles.section}>
      <div className="container-wide">
        <Reveal style={faqStyles.header}>
          <span className="eyebrow">FAQ</span>
          <h2 className="display display-xl" style={{ marginTop: 12 }}>
            O que você quer <span className="accent-underline">saber.</span>
          </h2>
        </Reveal>

        <div style={faqStyles.list}>
          {FAQS.map((f, i) => {
            const open = i === openIdx;
            const isLast = i === FAQS.length - 1;
            return (
              <div
                key={i}
                style={{ ...faqStyles.row, ...(isLast ? faqStyles.rowLast : {}), ...(open ? faqStyles.rowOpen : {}) }}
              >
                <div
                  style={faqStyles.head}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  role="button"
                  aria-expanded={open}
                >
                  <span style={faqStyles.q}>{f.q}</span>
                  <span style={{ ...faqStyles.iconWrap, ...(open ? faqStyles.iconWrapOpen : {}) }}>
                    <Icon name="plus" size={16} />
                  </span>
                </div>
                {open && (
                  <div style={faqStyles.body}>{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.Faq = Faq;
