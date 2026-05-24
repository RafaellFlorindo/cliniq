/* global React, ReactDOM, lucide,
   Nav, Hero, Problem, Flow, Calculator, Benefits, Proof, Offer, Guarantee, Objections, Faq, CtaFinal, Footer, Quiz,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#4DB6AC",
  "density": "regular",
  "showCalculator": true,
  "showStoryboard": true,
  "showProofStrip": true
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  '#4DB6AC': { accent: '#4DB6AC', soft: '#E0F4F2', text: '#2F8B82' },
  '#7AE582': { accent: '#7AE582', soft: '#E8FBE9', text: '#1F8A3D' }, // verde neon Revex
  '#F4B400': { accent: '#F4B400', soft: '#FBF1DC', text: '#8A6A0A' },
  '#7A5AE0': { accent: '#7A5AE0', soft: '#EFE9FC', text: '#4A2EA8' },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [quizOpen, setQuizOpen] = useState(false);

  // Apply accent color tokens to root
  useEffect(() => {
    const preset = ACCENT_PRESETS[t.accentColor] || ACCENT_PRESETS['#4DB6AC'];
    const root = document.documentElement;
    root.style.setProperty('--accent', preset.accent);
    root.style.setProperty('--accent-soft', preset.soft);
    root.style.setProperty('--accent-text', preset.text);
  }, [t.accentColor]);

  // Apply density (controls section padding)
  useEffect(() => {
    const root = document.documentElement;
    if (t.density === 'compact') root.style.setProperty('--section-pad', '64px');
    else if (t.density === 'comfy') root.style.setProperty('--section-pad', '140px');
    else root.style.setProperty('--section-pad', '112px');
    const css = document.getElementById('density-css');
    if (css) css.remove();
    const style = document.createElement('style');
    style.id = 'density-css';
    const pad = t.density === 'compact' ? 64 : t.density === 'comfy' ? 140 : 112;
    const padMobile = t.density === 'compact' ? 48 : t.density === 'comfy' ? 96 : 80;
    style.innerHTML = `
      section { padding: ${padMobile}px 0; }
      @media (min-width: 900px) { section { padding: ${pad}px 0; } }
    `;
    document.head.appendChild(style);
  }, [t.density]);

  // Lucide icons after each render
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  const openQuiz = () => setQuizOpen(true);
  const closeQuiz = () => setQuizOpen(false);

  return (
    <>
      <Nav onCtaClick={openQuiz} />
      <Hero onCtaClick={openQuiz} />
      <Problem />
      {t.showStoryboard && <Flow />}
      {t.showCalculator && <Calculator onCtaClick={openQuiz} />}
      <Benefits />
      {t.showProofStrip && <Proof />}
      <Offer onCtaClick={openQuiz} />
      <Guarantee />
      <Objections />
      <Faq />
      <CtaFinal onCtaClick={openQuiz} />
      <Footer />

      <Quiz open={quizOpen} onClose={closeQuiz} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Estética" />
        <TweakColor
          label="Cor de destaque"
          value={t.accentColor}
          options={['#4DB6AC', '#7AE582', '#F4B400', '#7A5AE0']}
          onChange={(v) => setTweak('accentColor', v)}
        />
        <TweakRadio
          label="Densidade"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakSection label="Seções" />
        <TweakToggle
          label="Storyboard do fluxo"
          value={t.showStoryboard}
          onChange={(v) => setTweak('showStoryboard', v)}
        />
        <TweakToggle
          label="Calculadora de no-show"
          value={t.showCalculator}
          onChange={(v) => setTweak('showCalculator', v)}
        />
        <TweakToggle
          label="Prova social"
          value={t.showProofStrip}
          onChange={(v) => setTweak('showProofStrip', v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
