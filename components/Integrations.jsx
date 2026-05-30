/* global React */
/* ══════════════════════════════════════════════════════════════════════════
   INTEGRATIONS — faixa de confiança fina sobre o canvas (transparente).
   Marquee contínuo (sem parar no hover). Só marcas reais e relevantes.
   ══════════════════════════════════════════════════════════════════════════ */

const INTEGRATIONS = [
  { name: 'WhatsApp',   slug: 'whatsapp',  clr: '#25D366' },
  { name: 'Instagram',  slug: 'instagram', clr: '#E1306C' },
  { name: 'Google',     slug: 'google',    clr: '#4285F4' },
  { name: 'Meta',       slug: 'meta',      clr: '#0866FF' },
  { name: 'Google Ads', slug: 'googleads', clr: '#4285F4' },
  { name: 'Calendly',   slug: 'calendly',  clr: '#006BFF' },
  { name: 'Stripe',     slug: 'stripe',    clr: '#635BFF' },
  { name: 'Zapier',     slug: 'zapier',    clr: '#FF4F00' },
  { name: 'HubSpot',    slug: 'hubspot',   clr: '#FF7A59' },
  { name: 'Notion',     slug: 'notion',    clr: '#191919' },
  { name: 'Mailchimp',  slug: 'mailchimp', clr: '#FFE01B' },
  { name: 'Facebook',   slug: 'facebook',  clr: '#1877F2' },
];

function IntegrationLogo({ name, slug, clr }) {
  const [hov, setHov] = React.useState(false);
  const [ok, setOk]   = React.useState(true);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 4px', userSelect: 'none', flexShrink: 0,
      }}
    >
      {ok ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={name}
          onError={() => setOk(false)}
          style={{
            width: 26, height: 26, objectFit: 'contain', display: 'block',
            filter: hov ? 'none' : 'grayscale(1) brightness(0.5) opacity(0.45)',
            transition: 'filter 360ms cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      ) : (
        <span style={{
          width: 26, height: 26, borderRadius: 7, background: clr, color: '#fff',
          display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 800,
          opacity: hov ? 1 : 0.5, transition: 'opacity 360ms',
        }}>{name.slice(0, 2).toUpperCase()}</span>
      )}
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
        letterSpacing: '-0.01em', whiteSpace: 'nowrap',
        color: hov ? 'var(--ink-800)' : 'var(--ink-400)',
        transition: 'color 360ms ease',
      }}>{name}</span>
    </div>
  );
}

function Integrations() {
  const items = INTEGRATIONS.map(p => <IntegrationLogo key={p.name} {...p} />);
  return (
    <div style={{ paddingTop: 56, paddingBottom: 8, position: 'relative' }}>
      <p style={{
        textAlign: 'center', margin: '0 0 26px',
        fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'var(--ink-400)',
      }}>
        Integra com o que você já usa
      </p>
      <div style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
      }}>
        <div className="integ-track" style={{
          display: 'flex', alignItems: 'center', gap: 44,
          width: 'max-content', animation: 'integScroll 46s linear infinite',
        }}>
          {items}{items}
        </div>
      </div>
      <style>{`
        @keyframes integScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .integ-track { animation: none !important; flex-wrap: wrap; justify-content: center; } }
      `}</style>
    </div>
  );
}

window.Integrations = Integrations;
