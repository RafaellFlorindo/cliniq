/* global React */
/* ══════════════════════════════════════════════════════════════════════════
   PAGE CANVAS — fundo único e contínuo que integra a seção 2 até a última.
   Grid blueprint + spine pontilhada (a jornada do lead) + washes ambientes
   com parallax. As seções ficam transparentes por cima; os momentos "navy"
   viram painéis elevados (.navy-panel) flutuando sobre este canvas.
   ══════════════════════════════════════════════════════════════════════════ */

/* Wash ambiente parallax — bleed de cor entre as seções */
function FlowOrb({ top, left, right, size, tint, parallax }) {
  return (
    <div
      className="flow-orb"
      data-parallax={parallax}
      style={{
        top, left, right, width: size, height: size,
        background: `radial-gradient(circle at 50% 50%, ${tint}, transparent 68%)`,
      }}
    />
  );
}

function FlowBackdrop() {
  return (
    <div className="flow-backdrop" aria-hidden="true">
      <div className="flow-grid" />
      <div className="flow-spine" />

      {/* Washes — distribuídos ao longo de toda a altura do flow */}
      <FlowOrb top="2%"  right="-6%"  size="min(48vw,640px)" tint="rgba(77,182,172,0.16)"  parallax="0.16" />
      <FlowOrb top="20%" left="-10%"  size="min(42vw,520px)" tint="rgba(16,48,73,0.07)"     parallax="-0.12" />
      <FlowOrb top="42%" right="-12%" size="min(40vw,560px)" tint="rgba(195,168,110,0.10)"  parallax="0.10" />
      <FlowOrb top="62%" left="-8%"   size="min(44vw,580px)" tint="rgba(77,182,172,0.12)"   parallax="-0.14" />
      <FlowOrb top="84%" right="-6%"  size="min(40vw,520px)" tint="rgba(16,48,73,0.06)"      parallax="0.12" />
    </div>
  );
}

/* Eyebrow que pousa na spine — nó luminoso da jornada */
function FlowEyebrow({ children, onNavy = false, style }) {
  return (
    <span
      className="eyebrow flow-node"
      style={{ color: onNavy ? 'var(--teal-200)' : 'var(--accent-text)', ...(style || {}) }}
    >
      {children}
    </span>
  );
}

window.FlowBackdrop = FlowBackdrop;
window.FlowEyebrow = FlowEyebrow;
